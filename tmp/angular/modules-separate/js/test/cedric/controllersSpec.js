/// <reference path="../../lib/jquery/1.8.2/jquery.min.js" />
/// <reference path="../../lib/angular/1.0.6/angular.min.js" />
/// <reference path="../../lib/angular/1.0.6/angular-mocks.js" />
/// <reference path="../../app/cedric.min.js" />

describe('controllers:', function () {

    beforeEach(function () {
        // matcher for $resource responses
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });

        // load our app
        module('cedric');
    });

    describe('CedricSearch', function () {
        // we need to set some things up first;
        // we will build a mock backend service so that we don't have to talk to the server while testing

        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            // mock backend
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('JSON/AuthorizationCases/GetAllCaseReason').
                respond([
                    { name: 'Case Reason 1', id: 1 },
                    { name: 'Case Reason 2', id: 2 }
                ]);
            $httpBackend.expectGET('JSON/AuthorizationCases/GetSpecificCountry').
                respond([
                    { name: 'Country 1', id: 1 },
                    { name: 'Country 2', id: 2 }
                ]);
            $httpBackend.expectGET('JSON/AuthorizationCases/GetCaseStatus').
                respond([
                    { name: 'Case Status 1', id: 1 },
                    { name: 'Case Status 2', id: 2 }
                ]);
            $httpBackend.expectGET('JSON/AuthorizationCases/GetAllAccountType').
                respond([
                    { name: 'Account Type 1', id: 1 },
                    { name: 'Account Type 2', id: 2 }
                ]);
            $httpBackend.whenPOST('JSON/AuthorizationCases/GetSearch', '{}').
                respond([
                    { customerName: "Thomas Anderson", email: "tanderson@matrix.com", caseNumber: 1 },
                    { customerName: "Bilbo Baggins", email: "bbaggins@hobbiton.com", caseNumber: 2 },
                    { customerName: "Clark Kent", email: "ckent@dailyplanet.com", caseNumber: 3 },
                    { customerName: "Tony Stark", email: "tstark@starkindustries.com", caseNumber: 4 },
                    { customerName: "Harry Potter", email: "hpotter@hogwarts.com", caseNumber: 5 },
                    { customerName: "Harry Potter", email: "hpotter@hogwarts.com", caseNumber: 6 }
                ]);
            $httpBackend.whenPOST('JSON/AuthorizationCases/GetSearch', '{"email":"hpotter@hogwarts.com"}').
                respond([
                    { customerName: "Harry Potter", email: "hpotter@hogwarts.com", caseNumber: 5 },
                    { customerName: "Harry Potter", email: "hpotter@hogwarts.com", caseNumber: 6 }
                ]);

            scope = $rootScope.$new();
            ctrl = $controller('CedricSearch', { $scope: scope });
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should retrieve data for the "Case Reason" dropdown', function () {
            expect(scope.ddlCaseReasons).toEqual([]);
            $httpBackend.flush();
            expect(scope.ddlCaseReasons).toEqualData([
                { name: 'Case Reason 1', id: 1 },
                { name: 'Case Reason 2', id: 2 }
            ]);
        });

        it('should retrieve data for the "Country" dropdown', function () {
            expect(scope.ddlCountries).toEqual([]);
            $httpBackend.flush();
            expect(scope.ddlCountries).toEqualData([
                { name: 'Country 1', id: 1 },
                { name: 'Country 2', id: 2 }
            ]);
        });

        it('should retrieve data for the "Case Status" dropdown', function () {
            expect(scope.ddlAllStatus).toEqual([]);
            $httpBackend.flush();
            expect(scope.ddlAllStatus).toEqualData([
                { name: 'Case Status 1', id: 1 },
                { name: 'Case Status 2', id: 2 }
            ]);
        });

        it('should retrieve data for the "Account Type" dropdown', function () {
            expect(scope.ddlAccountTypes).toEqual([]);
            $httpBackend.flush();
            expect(scope.ddlAccountTypes).toEqualData([
                { name: 'Account Type 1', id: 1 },
                { name: 'Account Type 2', id: 2 }
            ]);
        });

        it('should retrieve all cases', function () {
            // no search performed yet, cedricCases should be empty
            expect(scope.cedricCases).toEqual([]);
            // perform a search for all cases
            scope.updateSearch({});
            $httpBackend.flush();
            // all the cases should have been retrieved
            expect(scope.cedricCases.length).toEqual(6);
        });

        it('should retrieve cases matching an email address', function () {
            // no search performed yet, cedricCases should be empty
            expect(scope.cedricCases).toEqual([]);
            // perform a search for Harry Potter
            scope.updateSearch({ email: 'hpotter@hogwarts.com' });
            $httpBackend.flush();
            // two cases should have been retrieved
            expect(scope.cedricCases.length).toEqual(2);
            expect([scope.cedricCases[0].caseNumber, scope.cedricCases[1].caseNumber]).toEqual([5, 6]);
        });

        it('should be able to reset the search parameter', function () {
            $httpBackend.flush();
            scope.searchParameter = { email: 'hpotter@hogwarts.com' };
            scope.reset();
            expect(scope.searchParameter).toEqual({});
        });

        it('should be able to compute the number of pages for navigation', function () {
            scope.updateSearch({});
            $httpBackend.flush();
            // let's set the page size to 2; for the 6 cases we have, it should result in 3 pages
            scope.pageSize = 2;
            expect(scope.numberOfPages()).toEqual(3);
            // let's set the page size to 5; for the 6 cases we have, it should result in 2 pages
            scope.pageSize = 5;
            expect(scope.numberOfPages()).toEqual(2);
        });
    });
});
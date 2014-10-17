angular.module('accountActivities', [])
	.factory('activityList', ['$http', function ($http) {
	    var dataMethod = 'GET',
          dataURL = baseUrl + 'newsfeed.aspx',
          dataType = 'application/json; charset=utf-8',
	        dataItems = {};
	    dataItems.getActivityData = function (pageIndex, selectedCategory) {

	       return $http({
	           method: dataMethod,
	           url: dataURL + '?page=' + pageIndex + '&category=' + selectedCategory + '&v=' + Math.random(),
	           contentType: dataType
	       });
	    };


	    return dataItems;
	}])
	.directive('activities', function () {
	    return {
	        scope: {items: '@', load: '@'},
	        restrict: 'E',
	        controller: ['$scope', '$element', '$window', '$timeout', '$document', '$attrs', 'activityList',
                        function ($scope, $element, $window, $timeout, $document, $attrs, activityList) {
	            var limitNumber = $scope.$eval($attrs.items), 
					itemsToInclude = $scope.$eval($attrs.load);
                            //console.log($scope.$id);                      

	            $scope.$parent.activities = [];
	            $scope.$parent.categories = [];
	            $scope.$parent.selectedCategory = 'All';
	            $scope.$parent.pageIndex = 0;

	            activityList.getActivityData($scope.$parent.pageIndex, $scope.$parent.selectedCategory).success(function (data) {	               
	                $scope.$parent.activities = data.items;
	                $scope.$parent.categories = data.categories;
	            });
	           
	            $scope.$parent.limit = limitNumber;

	            $scope.$parent.showResults = function (category, event) {
	                event.preventDefault();
	                $scope.$parent.selectedCategory = category;
	                $scope.$parent.pageIndex = 0;

	                activityList.getActivityData($scope.$parent.pageIndex, $scope.$parent.selectedCategory).success(function (data) {
	                    $scope.$parent.activities = data.items;

	                    if (!angular.element(event.currentTarget).hasClass('selected')) {
	                        angular.element(event.currentTarget).parent().parent().find('a').removeClass('selected');
	                        angular.element(event.currentTarget).addClass('selected');
	                        $scope.$parent.limit = limitNumber;
	                    }

	                });
	            };

	            $scope.$parent.fillInDescription = function (text, status, type, description, amount, typeValue) {
	                var txt = text;
	                return txt.replace(/\{0}/g, status).replace(/\{1}/g, type).replace(/\{2}/g, description).replace(/\{3}/g, amount).replace(/\{4}/g, typeValue);
	            };

	            // FED NOTE: Use either infinite scrolling or click to load more items.
	            // The main UX issue found with infinite scrolling is when the user has 1000s of transactions.
	            // Since the infinite scroll gets triggered when the user scrolls and hits the bottom of the page, 
	            // accessing the links at the bottom may mean loading ALL transactions and waiting until they are all loaded.
	            // Infinite scrolling may be cumbersome to some users trying to access the bottom links in case they have 1000s of transactions to load.
	            // The proposed alternative is loading the transactions by clicking on the link "Load more items ..." at the bottom of the page 
	            // should users want to see more of their previous activities.
                // The function for the "Load more items ..." click function is provided below.

	            // Infinite Scroll Start
	            angular.element($window).scroll(function () {
	                var windowHeight = angular.element($document)[0].body.scrollHeight - angular.element($window)[0].innerHeight,
	                    verticalScroll = angular.element($window)[0].pageYOffset;

                    // Loads the items when the bottom of the page is reached
	                if (verticalScroll >= windowHeight) {
	                    var filterEl = $element[0].children[0].children,
                            allCategoryTrigger = angular.element(filterEl[0]).find('a'),
	                        allCategory = allCategoryTrigger[0].text;
	                    $scope.$parent.pageIndex++;

	                    angular.forEach(filterEl, function (val) {
	                        var filterTrigger = angular.element(val).find('a');

	                        // Find which category is active
	                        if (filterTrigger.hasClass('selected')) {
	                            var activeCategory = filterTrigger[0].text;

	                            $scope.$parent.status = 'loading';
	                            // Load the items of the selected category
	                            activityList.getActivityData($scope.$parent.pageIndex, $scope.$parent.selectedCategory).success(function (data) {
	                                $scope.$parent.activities = $scope.$parent.activities.concat(data.items);

	                                var allListings = $scope.$parent.activities,
                                      newList = [];

	                                for (var i = 0; i < allListings.length; i++) {
	                                    if ( activeCategory === allListings[i].category ) {
	                                        var listing = allListings[i];
	                                        newList.push(listing);
	                                    }else if( activeCategory === allCategory ){
	                                        newList = allListings;
	                                    }
	                                }

	                                $scope.$parent.activities = newList;
	                                $scope.$parent.limit = $scope.$parent.limit + itemsToInclude;
                                    // make sure the 'load-more' indicator shows... why 500ms? I dunno... it seems sensible enough.
	                                $timeout(function () { $scope.$parent.status = 'loaded'; }, 500);
	                            });
	                        }
	                    });
	                }
	            });

	            angular.element($window).resize(function () {
	                var windowHeight = angular.element($document)[0].body.scrollHeight - angular.element($window)[0].innerHeight,
	                    verticalScroll = angular.element($window)[0].pageYOffset;
	            });
	            // Infinite Scroll End 


                // Load more click function
	            $scope.$parent.loadMore = function (event) {
	                event.preventDefault();
	                $scope.$parent.limit = $scope.$parent.limit + itemsToInclude;
	            };
	        }]
	    };
	});
angular.module('payza.questionnaireCharity', [])
    .directive("questionnaireCharity", function () {
        return {
            restrict: "E",
            templateUrl: "../ng-partials/modules/QuestionnaireCharity.html",
            replace: true,
            transclude: true,
            link: function ($scope) {
                //   angular.element('.span5').accordionForNg({header: 'h5',content: 'fieldset'});
            }
        };
    })
    .controller('AnswersCharityCtrl', ['$scope', '$http', function ($scope, $http) {


        $scope.objInit = function () {
            $scope.info = {};
            $scope.info.id = {};
            $scope.info.urlQuestionnaireTypeId = {};
            $scope.info.url = {};
            $scope.info.urlType = {};
            $scope.info.businessModel = {};
            $scope.info.revenueGenerationMethod = {};
            $scope.info.shippingCountryId = {};
            $scope.info.fraudPrevention = {};
            $scope.info.termsOfService = {};
            $scope.info.termsOfServiceLocation = {};
            $scope.info.refundPolicy = {};
            $scope.info.refundPolicyLocation = {};
            $scope.info.urlFieldMembersAreaTypeId = {};
            $scope.info.membersAreaDetails = {};
            $scope.info.averagePrice = {};

            $scope.info.urlFieldProductDeliveryMethodTypeIdList = {};
            $scope.info.urlFieldProductDeliveryMethodTypeIdList.value = [];
            $scope.info.urlFieldProductDeliveryMethodTypeIdList.online = {};
            $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost = {};
            $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail = {};
            $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson = {};

            $scope.info.urlFieldServiceProvisionMethodTypeIdList = {};
            $scope.info.urlFieldServiceProvisionMethodTypeIdList.value = [];
            $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson = {};
            $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely = {};

            $scope.info.productDeliveryDelayTime = {};
            $scope.info.serviceProvisionDelayTime = {};
            $scope.info.urlFieldProductSourceTypeId = {};
            $scope.info.urlFieldServiceSourceTypeId = {};
            $scope.info.serviceSourceThirdPartyInfo = {};
            $scope.info.urlFieldSupplierTypeId = {};
            $scope.info.customerSupportInfo = {};
            $scope.info.urlFieldDonorContactTypeId = {};
            $scope.info.averageDonationAmount = {};
            $scope.info.urlFieldRecurringDonationTypeId = {};
            $scope.info.monthlyDonationAmount = {};
            $scope.info.urlFieldDiscountTypeId = {};

            $scope.info.urlFieldSaleOriginTypeIdList = {};
            $scope.info.urlFieldSaleOriginTypeIdList.value = [];
            $scope.info.urlFieldSaleOriginTypeIdList.northAmerica = {};
            $scope.info.urlFieldSaleOriginTypeIdList.southAmerica = {};
            $scope.info.urlFieldSaleOriginTypeIdList.westernEurope = {};
            $scope.info.urlFieldSaleOriginTypeIdList.easternEurope = {};
            $scope.info.urlFieldSaleOriginTypeIdList.africa = {};
            $scope.info.urlFieldSaleOriginTypeIdList.asia = {};
            $scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
            $scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

            $scope.info.urlFieldDonationOriginTypeIdList = {};
            $scope.info.urlFieldDonationOriginTypeIdList.value = [];
            $scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
            $scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
            $scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
            $scope.info.urlFieldDonationOriginTypeIdList.easternEurope = {};
            $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
            $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
            $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
            $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};


            $scope.info.urlFieldInvoiceTypeId = {};

            $scope.info.urlFieldInvoiceSendingTypeIdList = {};
            $scope.info.urlFieldInvoiceSendingTypeIdList.value = [];
            $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice = {};
            $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice = {};

            $scope.info.proofOfPaymentInfo = {};
            $scope.info.monthlySaleAmount = {};
            $scope.info.urlFieldRecurringBillingTypeId = {};
        }
        $scope.objInit();



        $http.get('../JSON/FeatureApproval/GetMainQuestionnaireUrl')
            .success(function (data) {
                $scope.info = data;
                $scope.cosoleLog();

                $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely = {};
                for (var i in $scope.info.urlFieldServiceProvisionMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldServiceProvisionMethodTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.checked = 1; break;
                        case 2: $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.checked = 1; break;
                        //case 0: $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.checked = 1; break;
                    }
                }

                //$scope.info.urlFieldProductDeliveryMethodTypeIdList.online = {};
                //$scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost = {};
                //$scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail = {};
                //$scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson = {};

                for (var i in $scope.info.urlFieldProductDeliveryMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldProductDeliveryMethodTypeIdList.value[i]) {
                        case 3: $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.checked = 1; break;
                        case 2: $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.checked = 1; break;
                        case 1: $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.checked = 1; break;
                        case 4: $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.checked = 1; break;
                    }
                }

                //$scope.info.urlFieldSaleOriginTypeIdList.northAmerica = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.southAmerica = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.westernEurope = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.easternEurope = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.africa = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.asia = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
                //$scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

                for (var i in $scope.info.urlFieldSaleOriginTypeIdList.value) {
                    switch ($scope.info.urlFieldSaleOriginTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.checked = 1; break;
                        case 2: $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.checked = 1; break;
                        case 3: $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.checked = 1; break;
                        case 4: $scope.info.urlFieldSaleOriginTypeIdList.easternEurope.checked = 1; break;
                        case 5: $scope.info.urlFieldSaleOriginTypeIdList.africa.checked = 1; break;
                        case 6: $scope.info.urlFieldSaleOriginTypeIdList.asia.checked = 1; break;
                        case 7: $scope.info.urlFieldSaleOriginTypeIdList.middleEast.checked = 1; break;
                        case 8: $scope.info.urlFieldSaleOriginTypeIdList.oceania.checked = 1; break;
                    }
                }

                //$scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.easternEurope = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                //$scope.info.urlFieldDonationOriginTypeIdList.oceania = {};

                for (var i in $scope.info.urlFieldDonationOriginTypeIdList.value) {
                    switch ($scope.info.urlFieldDonationOriginTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.checked = 1; break;
                        case 2: $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.checked = 1; break;
                        case 3: $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.checked = 1; break;
                        case 4: $scope.info.urlFieldDonationOriginTypeIdList.easternEurope.checked = 1; break;
                        case 5: $scope.info.urlFieldDonationOriginTypeIdList.africa.checked = 1; break;
                        case 6: $scope.info.urlFieldDonationOriginTypeIdList.asia.checked = 1; break;
                        case 7: $scope.info.urlFieldDonationOriginTypeIdList.middleEast.checked = 1; break;
                        case 8: $scope.info.urlFieldDonationOriginTypeIdList.oceania.checked = 1; break;
                    }
                }


            })
            .error(function (data) {
                console.log("ERROR LOADING JSON DATA ../JSON/FeatureApproval/GetMainQuestionnaireUrl");
            })

        $http.get('../JSON/FeatureApproval/GetShippingCountryList')
            .success(function (data) {
                //  $scope.info = data;
                //  ../JSON/FeatureApproval/GetShippingCountryList
            })
            .error(function (data) {
                console.log("ERROR LOADING JSON DATA ../JSON/FeatureApproval/GetShippingCountryList")
            })



        //      TODO delete it
        $scope.info.urlQuestionnaireTypeId = {};
        // $scope.info.urlQuestionnaireTypeId.value=2;
        $scope.currentLanguage = 'en-US';
        // $scope.currentLanguage = 'fr-CA' ;
        $scope.$watch('info.urlQuestionnaireTypeId.value', function (newValue, oldValue, $scope) {
            if (newValue) {
                $scope.resourceInit();
            }
        });
        $scope.$watch('currentLanguage', function (newValue, oldValue, $scope) {
            if (newValue) {
                $scope.resourceInit();
            }
        });
        //      TODO delete it^

        $scope.resourceInit = function () {

            switch ($scope.currentLanguage) {
                case 'en-US':
                    //for Checkout
                    $scope.resource = {
                        introductionSection: { title: "Introduction" },
                        donationSection: { title: "Donation Revenue Details" },
                        productInfoSection: { title: "Product Information" },
                        salesInfoSection: { title: "Sales Information" },
                        customerRelationsSection: { title: "Customer Relations" },
                        submitDocumentsSection: { title: "Submit Documents" },

                        isSite: { title: "Do you have a website for this business?" },
                        isSiteCheck1: { title: "Yes" },
                        isSiteCheck2: { title: "No" },
                        url: { title: "Please provide your website address:" },
                        urlForDonation: { title: "Please enter the third-party website URL you want to add buttons to:" },
                        noBusinessModel: { title: "Does this website follow the same business model providing the same product/service as a previously submitted site?" },
                        noBusinessModelCheck1: { title: "Yes" },
                        noBusinessModelCheck2: { title: "No" },
                        businessModel: { title: "Please select one of your previously submitted websites" },
                        revenueGenerationMethod: { title: "What is the purpose of your website?" },
                        revenueGenerationMethodCheck1: { title: "" },
                        revenueGenerationMethodCheck2: { title: "I sell products" },
                        revenueGenerationMethodCheck3: { title: "I offer services" },
                        revenueGenerationMethodCheck4: { title: "I sell products and offer services" },
                        urlType: { title: "Do you own and control the website?" },
                        urlTypeCheck1: { title: "Yes" },
                        urlTypeCheck2: { title: "No" },
                        urlFieldMembersAreaTypeId: { title: "Does your website have a members' area?" },
                        urlFieldMembersAreaTypeIdCheck1: { title: "Yes" },
                        urlFieldMembersAreaTypeIdCheck2: { title: "No" },
                        membersAreaDetails: { title: "Please provide the necessary information to access the members' area:" },
                        //PRODUCT INFO
                        averagePrice: { title: "What is the average product price (USD)?" },
                        shippingCountryId: { title: "Which country is your product shipped from?" },
                        urlFieldProductDeliveryMethodTypeIdList: { title: "How do you deliver the product?" },
                        urlFieldProductDeliveryMethodTypeIdListCheck1: { title: "Online" },
                        urlFieldProductDeliveryMethodTypeIdListCheck2: { title: "Regular Post" },
                        urlFieldProductDeliveryMethodTypeIdListCheck3: { title: "Registered Mail" },
                        urlFieldProductDeliveryMethodTypeIdListCheck4: { title: "In person" },
                        urlFieldServiceProvisionMethodTypeIdList: { title: "How do you provide the service?:" },
                        urlFieldServiceProvisionMethodTypeIdListCheck1: { title: "In person" },
                        urlFieldServiceProvisionMethodTypeIdListCheck2: { title: "Remotely" },
                        productDeliveryDelayTime: { title: "On average, how many days after the transaction is the product received by your customer?" },
                        serviceProvisionDelayTime: { title: "On average, how many days after the transaction is the product received by your customer?" },
                        urlFieldProductSourceTypeId: { title: "The product you are selling is:" },
                        urlFieldProductSourceTypeIdCheck1: { title: "Manufactured by you" },
                        urlFieldProductSourceTypeIdCheck2: { title: "Personal property" },
                        urlFieldServiceSourceTypeId: { title: "The service is provided by:" },
                        urlFieldServiceSourceTypeIdCheck1: { title: "You" },
                        urlFieldServiceSourceTypeIdCheck2: { title: "Third party" },
                        serviceSourceThirdPartyInfo: { title: "Please provide third party description and role in providing service:" },
                        urlFieldSupplierTypeId: { title: "Are you an authorized distributor/supplier?" },
                        urlFieldSupplierTypeIdCheck1: { title: "Yes" },
                        urlFieldSupplierTypeIdCheck2: { title: "No" },
                        //SALES INF@O
                        customerSupportInfo: { title: "How do customers contact you? Please list all methods:" },
                        urlFieldSaleOriginTypeIdList: { title: "Where do most of your sales originate from:" },
                        urlFieldSaleOriginTypeIdListCheck1: { title: "North America" },
                        urlFieldSaleOriginTypeIdListCheck2: { title: "South America" },
                        urlFieldSaleOriginTypeIdListCheck3: { title: "Europe" },
                        urlFieldSaleOriginTypeIdListCheck4: { title: "Eastern Europe" },
                        urlFieldSaleOriginTypeIdListCheck5: { title: "Africa" },
                        urlFieldSaleOriginTypeIdListCheck6: { title: "Asia" },
                        urlFieldSaleOriginTypeIdListCheck7: { title: "Middle East" },
                        urlFieldSaleOriginTypeIdListCheck8: { title: "Oceania" },
                        urlFieldInvoiceTypeId: { title: "Do you provide an invoice for the sale?" },
                        urlFieldInvoiceTypeIdCheck1: { title: "Yes" },
                        urlFieldInvoiceTypeIdCheck2: { title: "No" },
                        urlFieldInvoiceSendingTypeIdList: { title: "How will you send an invoice?" },
                        urlFieldInvoiceSendingTypeIdListCheck1: { title: "Payza email invoice" },
                        urlFieldInvoiceSendingTypeIdListCheck2: { title: "Mail personalized invoice" },
                        proofOfPaymentInfo: { title: "What proof of payment is provided to the customer?" },
                        monthlySaleAmount: { title: "What is the estimated monthly sales amount you want to process through Payza?" },
                        urlFieldRecurringBillingTypeId: { title: "Do you offer recurring billing?" },
                        urlFieldRecurringBillingTypeIdCheck1: { title: "Yes" },
                        urlFieldRecurringBillingTypeIdCheck2: { title: "No" },
                        //CUSTOMER RELATION
                        customerSupportPhoneNumber: { title: "Please provide your business's customer support phone number:" },
                        customerSupportEmailAddress: { title: "Please provide your business's customer support email address:" },
                        returnRefundInfo: { title: "How do you process returns, refunds and disputes?" },
                        termsOfService: { title: "What are your terms of service?" },
                        termsOfServiceLocation: { title: "Where are your terms of service located?" },
                        refundPolicy: { title: "What is your refund policy?" },
                        refundPolicyLocation: { title: "Where is your refund policy located?" },
                        fraudPrevention: { title: "What are your fraud prevention policies?" },

                        //DONATION
                        urlFieldDonorContactTypeId: { title: "Do donors contact you?" },
                        urlFieldDonorContactTypeIdCheck1: { title: "You" },
                        urlFieldDonorContactTypeIdCheck2: { title: "No" },
                        donorContactInfo: { title: "How do donors contact you? Please list all methods:" },
                        averageDonationAmount: { title: "What is the average donation amount (USD)?" },
                        urlFieldRecurringDonationTypeId: { title: "Do you offer recurring donations?" },
                        urlFieldRecurringDonationTypeIdCheck1: { title: "You" },
                        urlFieldRecurringDonationTypeIdCheck2: { title: "No" },
                        monthlyDonationAmount: { title: "What is the estimated monthly donation amount you want to process through Payza?" },
                        urlFieldDonationOriginTypeIdList: { title: "Where do most of your donations originate from?" },
                        urlFieldDonationOriginTypeIdListCheck1: { title: "North America" },
                        urlFieldDonationOriginTypeIdListCheck2: { title: "South America" },
                        urlFieldDonationOriginTypeIdListCheck3: { title: "Europe" },
                        urlFieldDonationOriginTypeIdListCheck4: { title: "Eastern Europe" },
                        urlFieldDonationOriginTypeIdListCheck5: { title: "Africa" },
                        urlFieldDonationOriginTypeIdListCheck6: { title: "Asia" },
                        urlFieldDonationOriginTypeIdListCheck7: { title: "Middle East" },
                        urlFieldDonationOriginTypeIdListCheck8: { title: "Oceania" }

                    };
                    if ($scope.info.urlQuestionnaireTypeId.value == 3) {                           //for Charity
                        $scope.resource.isSite.title = "Do you have a website for this charity?";
                        $scope.resource.noBusinessModel.title = "Does this website provide the same product/service, and/or does it fall under the same charity business model as a previously submitted website?";
                        $scope.resource.revenueGenerationMethod.title = "How do you raise donations for charity?";
                        $scope.resource.revenueGenerationMethodCheck1.title = "Placing 'Donate now' buttons on third-party websites";
                        $scope.resource.revenueGenerationMethodCheck2.title = "Selling Products to generate funds for charity";
                        $scope.resource.revenueGenerationMethodCheck3.title = "Selling/Offering Services to generate funds for charity";
                        $scope.resource.revenueGenerationMethodCheck4.title = "Selling Product/Services to generate funds for charity";

                    }
                    break;
                case 'fr-CA':
                    $scope.resource = {
                        introductionSection: { title: "Introduction" },
                        donationSection: { title: "Renseignements sur la source des dons" },
                        productInfoSection: { title: "Renseignements sur les produits" },
                        salesInfoSection: { title: "Renseignements sur les ventes" },
                        customerRelationsSection: { title: "Relations avec la clientele" },
                        submitDocumentsSection: { title: "Soumission de documents" },

                        isSite: { title: "Avez-vous un site Web?" },
                        isSiteCheck1: { title: "Oui" },
                        isSiteCheck2: { title: "Non" },
                        url: { title: "Veuillez fournir l’adresse de votre site Web :" },
                        urlForDonation: { title: "Veuillez inscrire l’URL du site tiers où vous désirez intégrer des boutons :" },
                        noBusinessModel: { title: "Ce site Web suit-il  le même modèle commercial et offre-t-il les mêmes produits/services qu’un site soumis antérieurement?" },
                        noBusinessModelCheck1: { title: "Oui" },
                        noBusinessModelCheck2: { title: "Non" },
                        businessModel: { title: "Veuillez sélectionner un des sites Web soumis antérieurement :" },
                        revenueGenerationMethod: { title: "Quel est l’objectif de votre site Web?" },
                        revenueGenerationMethodCheck1: { title: "" },
                        revenueGenerationMethodCheck2: { title: "Je vends des produits" },
                        revenueGenerationMethodCheck3: { title: "J’offre des services" },
                        revenueGenerationMethodCheck4: { title: "Je vends des produits et offre des services" },
                        urlType: { title: "Êtes-vous le propriétaire et l’administrateur du site?" },
                        urlTypeCheck1: { title: "Oui" },
                        urlTypeCheck2: { title: "Non" },
                        urlFieldMembersAreaTypeId: { title: "Veuillez fournir tous les renseignements nécessaires pour accéder à la section des membres :" },
                        urlFieldMembersAreaTypeIdCheck1: { title: "Oui" },
                        urlFieldMembersAreaTypeIdCheck2: { title: "Non" },
                        membersAreaDetails: { title: "French version of Please provide the necessary information to access the members' area:" },
                        // PRODUCT INFO
                        averagePrice: { title: "Quel est le prix moyen d’un produit (USD)?" },
                        shippingCountryId: { title: "De quel pays votre produit est-il expédié?" },
                        urlFieldProductDeliveryMethodTypeIdList: { title: "Quel est votre mode de livraison du produit?" },
                        urlFieldProductDeliveryMethodTypeIdListCheck1: { title: "En ligne" },
                        urlFieldProductDeliveryMethodTypeIdListCheck2: { title: "Courrier régulier" },
                        urlFieldProductDeliveryMethodTypeIdListCheck3: { title: "Courrier enregistré" },
                        urlFieldProductDeliveryMethodTypeIdListCheck4: { title: "En personne" },
                        urlFieldServiceProvisionMethodTypeIdList: { title: "Comment fournissez-vous le service?" },
                        urlFieldServiceProvisionMethodTypeIdListCheck1: { title: "En personne" },
                        urlFieldServiceProvisionMethodTypeIdListCheck2: { title: "À distance" },
                        productDeliveryDelayTime: { title: "Après la conclusion de la transaction, votre client reçoit le produit après combien de jours en moyenne?" },
                        serviceProvisionDelayTime: { title: "Vous fournissez le service à votre client après combien de jours en moyenne suite à la conclusion de la transaction?" },
                        urlFieldProductSourceTypeId: { title: "Le produit que vous vendez est :" },
                        urlFieldProductSourceTypeIdCheck1: { title: "Fabriqué par vous" },
                        urlFieldProductSourceTypeIdCheck2: { title: "Propriété personnelle" },
                        urlFieldServiceSourceTypeId: { title: "Le service est fourni par :" },
                        urlFieldServiceSourceTypeIdCheck1: { title: "Vous" },
                        urlFieldServiceSourceTypeIdCheck2: { title: "Un tiers" },
                        serviceSourceThirdPartyInfo: { title: "Veuillez fournir une description du tiers et comment il fournit le service" },
                        urlFieldSupplierTypeId: { title: "Offrez-vous parfois des rabais ou des promotions?" },
                        urlFieldSupplierTypeIdCheck1: { title: "Oui" },
                        urlFieldSupplierTypeIdCheck2: { title: "Non" },

                        //SALES INFO
                        customerSupportInfo: { title: "Comment vos clients vous contactent-ils? Veuillez énumérer toutes les méthodes employées :" },
                        urlFieldSaleOriginTypeIdList: { title: "Où faites-vous le plus de ventes?" },
                        urlFieldSaleOriginTypeIdListCheck1: { title: "Amérique du Nord" },
                        urlFieldSaleOriginTypeIdListCheck2: { title: "Amérique du Sud" },
                        urlFieldSaleOriginTypeIdListCheck3: { title: "Europe" },
                        urlFieldSaleOriginTypeIdListCheck4: { title: "Europe de l’Est" },
                        urlFieldSaleOriginTypeIdListCheck5: { title: "Afrique" },
                        urlFieldSaleOriginTypeIdListCheck6: { title: "Asie" },
                        urlFieldSaleOriginTypeIdListCheck7: { title: "Moyen-Orient" },
                        urlFieldSaleOriginTypeIdListCheck8: { title: "Océanie" },
                        urlFieldInvoiceTypeId: { title: "Fournissez-vous une facture pour la vente?" },
                        urlFieldInvoiceTypeIdCheck1: { title: "Oui" },
                        urlFieldInvoiceTypeIdCheck2: { title: "Non" },
                        urlFieldInvoiceSendingTypeIdList: { title: "Comment enverrez-vous une facture?" },
                        urlFieldInvoiceSendingTypeIdListCheck1: { title: "Facture par courrier électronique Payza" },
                        urlFieldInvoiceSendingTypeIdListCheck2: { title: "Facture personnalisée par voie postale" },
                        proofOfPaymentInfo: { title: "Quelle est la preuve de paiement fournie au client?" },
                        monthlySaleAmount: { title: "Quel montant mensuel en ventes prévoyez-vous traiter avec Payza?" },
                        urlFieldRecurringBillingTypeId: { title: "Offrez-vous l’option des paiements récurrents?" },
                        urlFieldRecurringBillingTypeIdCheck1: { title: "Oui" },
                        urlFieldRecurringBillingTypeIdCheck2: { title: "Non" },
                        //CUSTOMER RELATION
                        customerSupportPhoneNumber: { title: "Veuillez fournir le numéro de téléphone du soutien à la clientèle de votre entreprise :" },
                        customerSupportEmailAddress: { title: "Veuillez fournir le courrier électronique du soutien à la clientèle de votre entreprise :" },
                        returnRefundInfo: { title: "Comment traitez-vous les retours, les remboursements et les contestations?" },
                        termsOfService: { title: "Quels sont vos conditions d’utilisation?" },
                        termsOfServiceLocation: { title: "Où se trouvent vos conditions d’utilisation? " },
                        refundPolicy: { title: "Quel est votre politique de remboursement?" },
                        refundPolicyLocation: { title: "Où se trouve votre politique de remboursement?" },
                        fraudPrevention: { title: "Quelles sont vos politiques relatives à la prévention de la fraude?" },

                        //DONATION
                        urlFieldDonorContactTypeId: { title: "Les donateurs vous contactent-ils?" },
                        urlFieldDonorContactTypeIdCheck1: { title: "Oui" },
                        urlFieldDonorContactTypeIdCheck2: { title: "Non" },
                        donorContactInfo: { title: "Comment les donateurs vous contactent-ils? Veuillez énumérer toutes les méthodes employées :" },
                        averageDonationAmount: { title: "Quel est le montant moyen d’un don (USD)?" },
                        urlFieldRecurringDonationTypeId: { title: "Offrez-vous l’option de dons récurrents?" },
                        urlFieldRecurringDonationTypeIdCheck1: { title: "Oui" },
                        urlFieldRecurringDonationTypeIdCheck2: { title: "Non" },
                        monthlyDonationAmount: { title: "Quel montant en dons prévoyez-vous traiter avec Payza chaque mois?" },
                        urlFieldDonationOriginTypeIdList: { title: "D’où provient la majorité des dons reçus?" },
                        urlFieldDonationOriginTypeIdListCheck1: { title: "Amérique du Nord" },
                        urlFieldDonationOriginTypeIdListCheck2: { title: "Amérique du Sud" },
                        urlFieldDonationOriginTypeIdListCheck3: { title: "Europe" },
                        urlFieldDonationOriginTypeIdListCheck4: { title: "Europe de l’Est" },
                        urlFieldDonationOriginTypeIdListCheck5: { title: "Afrique" },
                        urlFieldDonationOriginTypeIdListCheck6: { title: "Asie" },
                        urlFieldDonationOriginTypeIdListCheck7: { title: "Moyen-Orient" },
                        urlFieldDonationOriginTypeIdListCheck8: { title: "Océanie" }
                    };
                    if ($scope.info.urlQuestionnaireTypeId.value == 3) {                           //for Charity
                        $scope.resource.isSite.title = "Avez-vous un site Web?";
                        $scope.resource.noBusinessModel.title = "Ce site Web offre-t-il les mêmes produits/services et suit-il le même modèle d’organisme de bienfaisance qu’un site soumis antérieurement?";
                        $scope.resource.revenueGenerationMethod.title = "Comment recueillez-vous des dons pour des œuvres de bienfaisance?"
                        $scope.resource.revenueGenerationMethodCheck1.title = "En intégrant des boutons « Faites un don » sur des sites tiers"
                        $scope.resource.revenueGenerationMethodCheck2.title = "En vendant des produits afin de générer des fonds pour des œuvres de bienfaisance"
                        $scope.resource.revenueGenerationMethodCheck3.title = "En vendant ou en offrant des services afin de générer des fonds pour des œuvres de bienfaisance"
                        $scope.resource.revenueGenerationMethodCheck4.title = "En vendant ou en offrant des produits ou des services afin de générer des fonds pour des œuvres de bienfaisance"
                    }
                    break;
            }
        }

        $scope.resourceInit();

        $scope.submitForValidation = function (formName, sectionForShow) {
            console.log("formName>>>", formName);
            console.log("sectionForShow>>>", sectionForShow);
            formName.$serverValid = true;       //$scope.postForValidation()

            if (formName.$serverValid) {
                if (formName.$name !== "customerRelations") {
                    $("#" + formName.$name + "Title+fieldset").slideUp();
                    $("#" + sectionForShow + "+fieldset").slideDown();
                }
            }
        }


        $scope.$watch('introductionSection.$invalid', function (newValue, oldValue, $scope) {
            if (newValue) {
                if ($scope.introductionSection.$invalid) {
                    $scope.introductionSection.$serverValid = false;
                }
                $("#productInformationTitle+fieldset").slideUp();
                $("#salesInformationTitle+fieldset").slideUp();
                $("#customerRelationsTitle+fieldset").slideUp();
                $("#submitDocTitle+fieldset").slideUp();
            }

        });
        $scope.$watch('productInformation.$invalid', function (newValue, oldValue, $scope) {
            if (newValue) {
                if ($scope.productInformation.$invalid) {
                    $scope.productInformation.$serverValid = false;
                }
                $("#salesInformationTitle+fieldset").slideUp();
                $("#customerRelationsTitle+fieldset").slideUp();
            }
        });
        $scope.$watch('salesInformation.$invalid', function (newValue, oldValue, $scope) {
            if (newValue) {
                if ($scope.salesInformation.$invalid) {
                    $scope.salesInformation.$serverValid = false;
                }
                $("#customerRelationsTitle+fieldset").slideUp();
            }
        });
        $scope.$watch('customerRelations.$invalid', function (newValue, oldValue, $scope) {
            if (newValue) {
                if ($scope.customerRelations.$invalid) {
                    $scope.customerRelations.$serverValid = false;
                }
            }
        });


        $scope.openSection = function (formName, sectionIdForShowHide) {
            //$("fieldset:not(:last)").slideUp();

            $("fieldset:not(#" + sectionIdForShowHide + "+fieldset):not(:last)").slideUp();

            //  $("fieldset").slideUp();

            //if (formName.$serverValid) {
            $("#" + sectionIdForShowHide + "+fieldset").slideDown();
            //}
            // style="display: block;"
        }

        $scope.submitForm = function () {
            $scope.changeType();
            $scope.cosoleLog();

            $http({
                method: 'POST',
                url: '../JSON/questionnaireCheckout/postIntroductionSection',
                data: $scope.info
            }).
                success(function () {
                }).
                error(function (status) {
                });
        };

        $scope.postForValidation = function () {

            //                    $scope.isUrlValidated=1;
            //                    $http({
            //                        method: 'POST',
            //                        url: 'JSON/questionnaireCheckout/postForValidation',
            //                        data: variableForValidation
            //                    }).
            //                        success(function () {
            //                           // console.log("success>>>");
            //                        }).
            //                        error(function (status) {
            //                           // console.log("error>>>", status);
            //                        });
            return true;
        };

        $scope.getPreviouslySubmittedWebsites = function () {
            $scope.info.businessModel.source =
                [
                    {
                        name: "Products",
                        id: 2,
                        data:
                            [
                                {
                                    id: 111,
                                    name: "www.example0.com",
                                    isEnabled: true
                                },
                                {
                                    id: 222,
                                    name: "www.example1.com",
                                    isEnabled: true
                                }
                            ]
                    }
                    ,
                    {
                        name: "Services",
                        id: 1,
                        data:
                            [
                                {
                                    id: 333,
                                    name: "www.example2.com",
                                    isEnabled: false
                                },
                                {
                                    id: 444,
                                    name: "www.example3.com",
                                    isEnabled: false
                                }
                            ]

                    }
                    ,
                    {
                        name: "Products and services",
                        id: 4,
                        data:
                            [
                                {
                                    id: 555,
                                    name: "www.example4.com",
                                    isEnabled: false
                                },
                                {
                                    id: 666,
                                    name: "www.example5.com",
                                    isEnabled: false
                                }
                            ]
                    }
                ]

            //            $scope.value=[];
            //            arrayWithKeys=Object.keys($scope.source);
            //            for (var i in arrayWithKeys) {
            //                var obj={};
            //                var keyName=arrayWithKeys[i];
            //                obj.id=keyName;
            //                switch (keyName) {
            //                    case "1":
            //                        obj.name="Services";
            //                        break;
            //                    case "2":
            //                        obj.name="Products";
            //                        break;
            //                    case "4":
            //                        obj.name="Products and services"
            //                        break;
            //                }
            //                obj.data=$scope.source[keyName];
            //                $scope.value.push(obj);

        };



        $scope.changeType = function () {
            if (typeof $scope.info.urlQuestionnaireTypeId.value !== 'undefined') { $scope.info.urlQuestionnaireTypeId.value = parseInt($scope.info.urlQuestionnaireTypeId.value); }
            if (typeof $scope.info.urlType.value !== 'undefined') { $scope.info.urlType.value = parseInt($scope.info.urlType.value); }
            if (typeof $scope.info.revenueGenerationMethod.value !== 'undefined') { $scope.info.revenueGenerationMethod.value = parseInt($scope.info.revenueGenerationMethod.value); }
            if (typeof $scope.info.shippingCountryId.value !== 'undefined') { $scope.info.urlType.value = parseInt($scope.info.shippingCountryId.value); }
            if (typeof $scope.info.urlFieldMembersAreaTypeId.value !== 'undefined') { $scope.info.urlFieldMembersAreaTypeId.value = parseInt($scope.info.urlFieldMembersAreaTypeId.value); }
            if (typeof $scope.info.averagePrice.value !== 'undefined') { $scope.info.averagePrice.value = parseFloat($scope.info.averagePrice.value); }        //.toFixed(2);

            // List<int> urlFieldProductDeliveryMethodTypeIdList
            $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.length = 0;
            if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value)); }
            if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value)); }
            if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value)); }
            if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value)); }

            // List<int> urlFieldServiceProvisionMethodTypeIdList
            $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.length = 0;
            if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value)); }
            if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value !== 'undefined' && ($scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value)) { $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value)); }

            if (typeof $scope.info.productDeliveryDelayTime.value !== 'undefined') { $scope.info.productDeliveryDelayTime.value = parseFloat($scope.info.productDeliveryDelayTime.value); }
            if (typeof $scope.info.serviceProvisionDelayTime.value !== 'undefined') { $scope.info.serviceProvisionDelayTime.value = parseFloat($scope.info.serviceProvisionDelayTime.value); }
            if (typeof $scope.info.urlFieldProductSourceTypeId.value !== 'undefined') { $scope.info.urlFieldProductSourceTypeId.value = parseInt($scope.info.urlFieldProductSourceTypeId.value); }
            if (typeof $scope.info.urlFieldServiceSourceTypeId.value !== 'undefined') { $scope.info.urlFieldServiceSourceTypeId.value = parseInt($scope.info.urlFieldServiceSourceTypeId.value); }

            if (typeof $scope.info.urlFieldSupplierTypeId.value !== 'undefined') { $scope.info.urlFieldSupplierTypeId.value = parseInt($scope.info.urlFieldSupplierTypeId.value); }

            if (typeof $scope.info.urlFieldDonorContactTypeId.value !== 'undefined') { $scope.info.urlFieldDonorContactTypeId.value = parseInt($scope.info.urlFieldDonorContactTypeId.value); }
            if (typeof $scope.info.averageDonationAmount.value !== 'undefined') { $scope.info.averageDonationAmount.value = parseFloat($scope.info.averageDonationAmount.value); }
            if (typeof $scope.info.urlFieldRecurringDonationTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringDonationTypeId.value = parseInt($scope.info.urlFieldRecurringDonationTypeId.value); }
            if (typeof $scope.info.monthlyDonationAmount.value !== 'undefined') { $scope.info.monthlyDonationAmount.value = parseFloat($scope.info.monthlyDonationAmount.value); }
            if (typeof $scope.info.urlFieldDiscountTypeId.value !== 'undefined') { $scope.info.urlFieldDiscountTypeId.value = parseInt($scope.info.urlFieldDiscountTypeId.value); }

            $scope.info.urlFieldSaleOriginTypeIdList.value.length = 0;
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.easternEurope.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.africa.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.africa.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.africa.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.asia.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.asia.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.asia.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.middleEast.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.middleEast.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.middleEast.value)); }
            if (typeof $scope.info.urlFieldSaleOriginTypeIdList.oceania.value !== 'undefined' && ($scope.info.urlFieldSaleOriginTypeIdList.oceania.value)) { $scope.info.urlFieldSaleOriginTypeIdList.value.push(parseInt($scope.info.urlFieldSaleOriginTypeIdList.oceania.value)); }

            $scope.info.urlFieldDonationOriginTypeIdList.value.length = 0;
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.easternEurope.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.africa.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.africa.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.africa.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.asia.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.asia.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.asia.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.middleEast.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.middleEast.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.middleEast.value)); }
            if (typeof $scope.info.urlFieldDonationOriginTypeIdList.oceania.value !== 'undefined' && ($scope.info.urlFieldDonationOriginTypeIdList.oceania.value)) { $scope.info.urlFieldDonationOriginTypeIdList.value.push(parseInt($scope.info.urlFieldDonationOriginTypeIdList.oceania.value)); }

            if (typeof $scope.info.urlFieldInvoiceTypeId.value !== 'undefined') { $scope.info.urlFieldInvoiceTypeId.value = parseInt($scope.info.urlFieldInvoiceTypeId.value); }

            // List<int> urlFieldInvoiceSendingTypeIdList
            $scope.info.urlFieldInvoiceSendingTypeIdList.value.length = 0;
            if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value !== 'undefined' && ($scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value)) { $scope.info.urlFieldInvoiceSendingTypeIdList.value.push(parseInt($scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value)); }
            if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value !== 'undefined' && ($scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value)) { $scope.info.urlFieldInvoiceSendingTypeIdList.value.push(parseInt($scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value)); }

            if (typeof $scope.info.monthlySaleAmount.value !== 'undefined') { $scope.info.monthlySaleAmount.value = parseFloat($scope.info.monthlySaleAmount.value); }
            if (typeof $scope.info.urlFieldRecurringBillingTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringBillingTypeId.value = parseInt($scope.info.urlFieldRecurringBillingTypeId.value); }

        }

        $scope.cosoleLog = function () {

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            var objName;
            for (var key in $scope.info) {
                console.log(key, ":", $scope.info[key])
                objName = "$scope.info." + key;

                for (var key2 in eval(objName)) {
                    valName = objName + '["' + key2 + '"]';
                    console.log("               ", key2, ":", eval(valName))
                }
            }
        }
    }])

;


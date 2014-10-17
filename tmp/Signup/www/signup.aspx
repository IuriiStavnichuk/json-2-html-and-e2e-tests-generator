<%@ Page Inherits="AlertPay.UI.Pages.RegistrationProcessPage" Language="VB" MasterPageFile="~/Site.Master"
    Title="Register" CodeBehind="signup.aspx.vb" %>

<%@ Import Namespace="AlertPay.UI.Helpers" %>
<%@ Import Namespace="AlertPay.Foundation.Entities" %>
<%@ Register TagPrefix="AlertPay" TagName="RegistrationBreadcrumbs" Src="~/signup/RegistrationBreadcrumbs.ascx" %>
<%@ Register TagPrefix="AlertPay" TagName="AddressForm" Src="~/signup/RegistrationAddressForm.ascx" %>
<%@ Register TagPrefix="AlertPay" TagName="SecurityQuestions" Src="~/UserControls/SecurityQuestions.ascx" %>
<%@ Register TagPrefix="AlertPay" TagName="DateSelect" Src="~/UserControls/DateSelect.ascx" %>
<%@ Register TagPrefix="AlertPay" TagName="PhoneNumberTextbox" Src="~/UserControls/PhoneNumberTextbox.ascx" %>
<%@ Register TagPrefix="AlertPay" TagName="UCMessage" Src="~/UserControls/UCMessage.ascx" %>
<asp:Content runat="server" ContentPlaceHolderID="head">
    <%-- using a <%= ... %> blocks results in the error: "The Controls collection cannot be modified because the control contains code blocks (i.e. <% ... %> ).", so use <%# ...%> instead --%>
    <%-- using <%# ...%> requires Page.DataBind in code-behind in Page_Load --%>

    <script type="text/javascript">
        var _gaq = _gaq || [];
        var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
        _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
        _gaq.push(['_setAccount', 'UA-36587799-12']);
        _gaq.push(['_setDomainName', 'payza.com']);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>

	<script type="text/javascript">
		function showCreateAccountPopup() {
			countryListScope = angular.element('.create-account-popup').scope();
			countryListScope.showPopup();
		}
	</script>

</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="bodyTopMost">
    <%
        Dim helper As ValidationDisplayHelper = New ValidationDisplayHelper(Me.Page)
        helper.SetValidationCssClass(Me.Page.ID, "error")
    %>
    <asp:PlaceHolder ID="phReferralWarning" runat="server" Visible="false">
        <div class="referral-warning">
            <%--
            <div id="referralWarning" runat="server" class="ReferralError" visible="false">
            --%>
            <%--
                <asp:Panel ID="panelReferralwarrning" runat="server" Visible="false">
            --%>
            <%=GetLocalResourceObject("key_warning_qualifying").ToString() %>
            <AlertPay:LinkButton ID="linkPersonal" runat="server" OnCommand="Link_Command" CommandName="personal"><%=GetLocalResourceObject("key_account_type_personal").ToString().Trim()%></AlertPay:LinkButton>
            <%=" "%><%=GetLocalResourceObject("key_or_a").ToString()%><%=" "%>
            <AlertPay:LinkButton ID="linkBuisness" runat="server" OnCommand="Link_Command" CommandName="Buisness"><%=GetLocalResourceObject("key_account_type_business").ToString().Trim()%></AlertPay:LinkButton>
            <%--
                </asp:Panel>
            --%>
            <%--
            </div>
            --%>
            <a href="#" class="close" onclick="$('.referral-warning').slideUp();">x</a>
        </div>
    </asp:PlaceHolder>
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="bodyTopBarAfterLogo">
    <asp:PlaceHolder ID="phSponsor" runat="server" Visible="false">
        <div class="referral-info">
            <%=GetLocalResourceObject("key_referred_by_").ToString()%><%=" "%><AlertPay:Literal
                ID="litSponsor" runat="server" />
        </div>
    </asp:PlaceHolder>
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="main">

    <div data-ng-controller="SignupForm" class="create-account-popup">

        <div id="confirm-dialog-overlay" data-ng-show="currentStep=='signupForPersonal'||currentStep=='signupEmailValidation'"></div>

        <div class="complet-profile" data-ng-if="currentStep=='signupForPersonal'||currentStep=='signupEmailValidation'" data-ng-include="'popup-complite-profile.html'" data-ng-cloak></div>

        <script type="text/ng-template" id="popup-complite-profile.html">
            <div class="complet-profile">
                <div class="complet-profile-box">
                    <signup-for-personal></signup-for-personal>
                    <signup-email-validation></signup-email-validation>
                </div>
            </div>
        </script>

<%--        <div style="position:fixed;left:0;top:0;background-color:#999;opacity:0.8;z-index:1000">
            <input type="radio" name="currentStep" ng-click="currentStep='signupForPersonal'">&nbsp;&nbsp;
            <input type="radio" name="currentStep" ng-click="currentStep='signupEmailValidation'">
        </div>--%>


    </div>
    
<%= AntiForgery.GetHtml()%>

<script type="text/javascript" src="../js/app/modules/signup/signup_step1.js"></script>

	<asp:UpdatePanel ID="UpdatePanel2" runat="server">
	<ContentTemplate>


    <div class="container sign-up">
        <AlertPay:UCMessage runat="server" ID="ucSimplySend" Mode="Warning" ProceedBtnVisibility="false"
            DisableBtnVisibility="false" isModifiable="false" Visible="False" />
        <div class="content clearfix">
            <div class="main">
                <asp:PlaceHolder ID="phSignUpHeaderAndAccountTypeSelected" runat="server" EnableViewState="false">
                    <%-- todo_important - localization --%>
                    <h1>
                        <%=GetLocalResourceObject("key_Payza_Account_Signup").ToString()%>
                        <AlertPay:Literal ID="litAccountTypeSelected" runat="server" EnableViewState="false" /></h1>
                </asp:PlaceHolder>
                <AlertPay:RegistrationBreadcrumbs ID="ucRegistrationBreadcrumbs" runat="server" EnableViewState="false" />
                <asp:MultiView runat="server" ActiveViewIndex="0" ID="mvRegistration">
                    <%-- vwStep1 is "Step 0" (the very first step with no actual step number) in the UI --%>
                    <asp:View runat="server" ID="vwStep1">
                        <asp:Panel ID="pnlSelectAccountType" runat="server">
                            <fieldset>
                                <div class="form-group">
                                    <h6><%=GetLocalResourceObject("key_select_your_country").ToString()%></h6>
                                    <div class="country-select">
                                        <asp:DropDownList ID="ddlCountries" runat="server" AppendDataBoundItems="true" name="country">
                                            <asp:ListItem Text='<%$ Resources: Application, key____Choose_Country___ %>' Value="0">
                                            </asp:ListItem>
                                        </asp:DropDownList>
<%--                                        <div class="col-sm-12" data-ng-controller="CountryList" >
                                            <select class="form-control"  data-ng-model="countryId" data-ng-change="refreshCountryId (countryId)" data-ng-options="item.id as item.name for item in countryList" data-ng-change="getRegionName(addressForm.info.citizenshipCountryId.value);getRegionList(addressForm.info.citizenshipCountryId.value)"></select>
                                        </div>--%>
                                    </div>
                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlCountries" Display="None"
                                        InitialValue="0" ErrorMessage='<%$ Resources:key_you_must_choose_a_country %>' />
                                    <asp:CustomValidator ID="vldCustomValidatorCountry" runat="server" ControlToValidate="ddlCountries"
                                        Display="None" />
                                </div>
                                <asp:Panel ID="DivUKMarketing" CssClass="uk-marketing" runat="server" DefaultButton="btnNotifyUKAddress">
                                    <img src="../images/Payza-white.png" />
                                    <p class="not-available">
                                        <strong>Blimey!</strong><br />
                                        Payza is not yet available in the <b>UK</b>.
                                    </p>
                                    <p>
                                        Please accept our sincerest apologies. We will send you an email to let you know as soon as we are up & running in the <b>UK</b>.
                                    </p>
                                    <fieldset>
                                        <div id="divErrorUKEmailAddress" class="alert alert-error" style="display: none"></div>

                                        <div class="field with-button">
                                            <AlertPay:Textbox runat="server" ID="txtUKEmailAddress" placeholder="Email address" />
                                            <AlertPay:Button runat="server" Text="Notify me" ID="btnNotifyUKAddress"
                                                OnClientClick="javascript:if(validateUKEmailAddress()==false){return true;}resetddlCountry();" />
                                        </div>
                                    </fieldset>
                                    <p class="not-from">
                                        Not from the UK? <a class="modal-close" onclick="javascript:resetddlCountry();">Click here</a>
                                    </p>
                                </asp:Panel>
                                <asp:Panel ID="DivUSMarketing" CssClass="cali-marketing" runat="server" DefaultButton="btnNotifyUSAddress">
                                    <img src="../images/Payza-white.png" />
                                    <p class="not-available">
                                        Unfortunately, residents from your state cannot currently sign up for a Payza account.
                                    </p>
                                    <p>
                                        Please accept our sincerest apologies. As soon as we are able to operate in your state, we will email you.
                                    </p>
                                    <fieldset>
                                        <div id="divErrorUSEmail" class="alert alert-error" style="display: none"></div>

                                        <div class="field with-button">
                                            <AlertPay:Textbox runat="server" ID="txtUSEmailAddress" placeholder="Email address" />
                                            <AlertPay:Button runat="server" ID="btnNotifyUSAddress" Text="Notify me" OnClientClick="javascript:if(validateUSEmailAddress()==false){return true;}resetCountryDropdown();" />
                                        </div>
                                    </fieldset>
                                    <p class="not-from">
                                        Not from US? <a class="modal-close" onclick="javascript:resetCountryDropdown();">Click here</a>
                                    </p>
                                </asp:Panel>

                            </fieldset>

                            <hr />

                            <div class="account-select-table">
                                <ul class="account-features">
                                    <li><%=GetLocalResourceObject("key_send_money").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_make_payments").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_shop_securely").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_collect_payments").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_earn_money").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_exchange_currencies").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_sell_online").ToString()%></li>
                                    <%-- <li><%=GetLocalResourceObject("key_accept_credit_cards").ToString()%></li> --%>
                                    <li><%=GetLocalResourceObject("key_invoice_customers").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_use_apis").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_instant_payment_notifications").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_sell_as_a_business").ToString()%></li>
                                    <li><%=GetLocalResourceObject("key_manage_multiple_businesses").ToString()%></li>
                                </ul>

                                <div class="account-option business">
                                    <AlertPay:LinkButton runat="server" Text="<%$ Resources:key_select_account %>" ID="btnChooseAccountTypeBusiness" CssClass="btn-promo" />
                                    <ul>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_send_money").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_make_payments").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_shop_securely").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_collect_payments").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_earn_money").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_exchange_currencies").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_sell_online").ToString()%></span></li>
                                        <%-- <li class="yes hidewhenUK"><span><%=GetLocalResourceObject("key_accept_credit_cards").ToString()%></span></li> --%>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_invoice_customers").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_use_apis").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_instant_payment_notifications").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_sell_as_a_business").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_manage_multiple_businesses").ToString()%></span></li>
                                    </ul>
                                </div>

                                <div class="account-option personal-pro">
                                    <%--<span class="recommended"><%=GetLocalResourceObject("key_recommended").ToString()%></span>--%>
                                    <%--<a  data-ng-click="currentStep='signupForPersonal';scrollTop();" class="btn-promo">Select</a>--%>
                                    <AlertPay:LinkButton runat="server" Text="<%$ Resources:key_select_account %>" ID="btnChooseAccountTypePersonal" CssClass="btn-promo" />
                                    <ul>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_send_money").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_make_payments").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_shop_securely").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_collect_payments").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_earn_money").ToString()%></span></li>
                                        <li class="yes"><span><%=GetLocalResourceObject("key_exchange_currencies").ToString()%></span></li>
                                        <li class="yes hidewhenUK"><span><%=GetLocalResourceObject("key_sell_online").ToString()%></span></li>
                                        <%-- <li class="yes hidewhenUK"><span><%=GetLocalResourceObject("key_accept_credit_cards").ToString()%></span></li> --%>
                                        <li class="yes hidewhenUK"><span><%=GetLocalResourceObject("key_invoice_customers").ToString()%></span></li>
                                        <li class="yes hidewhenUK"><span><%=GetLocalResourceObject("key_use_apis").ToString()%></span></li>
                                        <li class="no hidewhenUK"><span><%=GetLocalResourceObject("key_instant_payment_notifications").ToString()%></span></li>
                                        <li class="no"><span><%=GetLocalResourceObject("key_sell_as_a_business").ToString()%></span></li>
                                        <li class="no"><span><%=GetLocalResourceObject("key_manage_multiple_businesses").ToString()%></span></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="account-option-starter">
                                <label><%=GetLocalResourceObject("key_can_t_decide_which_account_to_open_").ToString()%></label>
                                <AlertPay:LinkButton ID="btnChooseAccountTypeStarter" runat="server" CssClass="" Text="<%$ Resources: key_try_a_starter_account %>" />
                            </div>


                            <%--
                    <AlertPay:RegistrationMessage ID="RegistrationMessage1" Container="pnlSelectAccountType" runat="server" />
                            --%>
                        </asp:Panel>
                    </asp:View>

                    <%-- vwStep2 is "Step 1" in the UI --%>
                    <asp:View runat="server" ID="vwStep2">
                        <fieldset>
                            <asp:Panel runat="server" DefaultButton="btnStep2Next">
                                <input type="hidden" id="QASStoreProceedField" runat="server" />
                                <input type="hidden" id="QASStoreResultField" runat="server" />
                                <input type="hidden" id="QASStoreStatusField" runat="server" />
                                <div class="form-box">
                                    <script type="text/javascript">
                                        <%=RegisterGoogleAnalyticsForAccountType("step1")%>
                                    </script>

                                    <asp:MultiView runat="server" ID="mvBusiness">
                                        <asp:View runat="server" ID="vwNone">
                                        </asp:View>
                                        <asp:View runat="server" ID="vwBusiness">
                                            <h6><%=Resources.Application.key_business_information %></h6>
                                            <asp:Panel runat="server" ID="pnlBusinessInformation">
                                                <div class="form-group">
                                                    <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Business_Type %>' AssociatedControlID="ddlBusinessType" />
                                                    <asp:DropDownList runat="server" ID="ddlBusinessType" AppendDataBoundItems="true">
                                                        <asp:ListItem Text='<%$ Resources: Application, key____Choose_Type___ %>' Value="" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlBusinessType" Display="None"
                                                        ErrorMessage='<%$ Resources:key_your_business_type_is_required %>' />
                                                </div>

                                                <div class="form-group">
                                                    <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Business_Name %>' AssociatedControlID="txtBusinessName" />
                                                    <AlertPay:Textbox runat="server" ID="txtBusinessName" />
                                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtBusinessName" Display="None"
                                                        ErrorMessage='<%$ Resources:key_your_business_name_is_required %>' />
                                                </div>

                                                <div class="form-group">
                                                    <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Category %>' AssociatedControlID="ddlBusinessIndustry" />
                                                    <asp:DropDownList runat="server" ID="ddlBusinessIndustry" AppendDataBoundItems="true" AutoPostBack="true">
                                                        <asp:ListItem Text='<%$ Resources: Application, key____Choose_Category___ %>' Value="" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlBusinessIndustry"
                                                        Display="None" ErrorMessage='<%$ Resources:key_your_business_category_is_requ %>' />
                                                    <asp:CustomValidator runat="server" ID="vldBusinessIndustry" ControlToValidate="ddlBusinessIndustry"
                                                        Display="None" />
                                                </div>

                                                <div class="form-group">
                                                    <AlertPay:Label runat="server" Text='<%$ Resources:key_sub_category %>' AssociatedControlID="ddlBusinessCategory" />
                                                    <asp:DropDownList runat="server" ID="ddlBusinessCategory" AppendDataBoundItems="true">
                                                        <asp:ListItem Text='<%$ Resources:key____choose_sub_category___ %>' Value="" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlBusinessCategory"
                                                        Display="None" ErrorMessage='<%$ Resources:key_your_business_sub_category_is_ %>' />
                                                </div>

                                                <%-- appears to not do anything --%>
                                                <%--
                                        <asp:CustomValidator runat="server" ID="vldBusinessCategory"
                                                ControlToValidate="ddlBusinessCategory" Display="None" />
                                                --%>

                                                <AlertPay:AddressForm runat="server" ID="ctlBusinessAddress" AddressType="Business" />

                                                <div class="form-group">
                                                    <AlertPay:Label Text='<%$ Resources:key_customer_service_email %>' runat="server" AssociatedControlID="txtCustomerSupportEmail" />
                                                    <span class="field-value"><em><%=GetLocalResourceObject("key_email_where_your_customers_can").ToString()%></em></span>
                                                    <AlertPay:Textbox Required="True" ValidationMode="EmailAddress" ErrorMessage='<%$ Resources:key_your_customer_support_email_ad %>'
                                                        RequiredMessage='<%$ Resources:key_you_must_enter_your_customer_support_email_address %>'
                                                        runat="server" ID="txtCustomerSupportEmail" />
                                                </div>

                                                <div class="form-group">
                                                    <AlertPay:Label runat="server" AssociatedControlID="txtSupportPhone" Text='<%$ Resources:key_customer_service_phone__optional_ %>' />
                                                    <AlertPay:PhoneNumberTextbox runat="server" ID="txtSupportPhone" PhoneType="CustomerSupport"
                                                        IsOnSignup="true" IsRequired="false" />
                                                </div>

                                            </asp:Panel>
                                            <%--
                                <AlertPay:RegistrationMessage Container="pnlBusinessInformation" runat="server" ID="msgError">
                                    <p><asp:Literal runat="server" text='<%$ Resources:key_alertpay_is__a_trusted_and_sec %>' /></p>
                                    <p><asp:Literal runat="server" text='<%$ Resources:key_we_need_your_phone_number__occ %>' /></p>
                                </AlertPay:RegistrationMessage>
                                            --%>
                                        </asp:View>
                                    </asp:MultiView>
                                    <h6>
                                        <%--
                            <asp:Label ID="lblReferralsAccountType" runat="server" Visible="false" />
                                        --%>
                                        <asp:Label runat="server" Text='<%$ Resources:Application, key_personal_information %>' />
                                    </h6>

                                    <asp:Panel runat="server" ID="pnlPersonalInformation">

                                        <asp:Panel runat="server" ID="fldSalutations" CssClass="field">
                                            <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Salutation %>' AssociatedControlID="ddlSalutations" />
                                            <asp:DropDownList runat="server" ID="ddlSalutations" DataValueField="SalutationId" DataTextField="Salutation" />
                                            <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlSalutations" ErrorMessage='<%$ Resources: Application, key_Your_salutation_is_required %>'
                                                InitialValue="0" Display="None" />
                                        </asp:Panel>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_First_Name %>' AssociatedControlID="txtFirstName" />
                                            <AlertPay:Textbox ID="txtFirstName" runat="server" MaxLength="50" />
                                            <asp:RequiredFieldValidator runat="server" Display="None" ControlToValidate="txtFirstName"
                                                ErrorMessage='<%$ Resources:key_your_first_name_is_required_ %>' />
                                            <asp:CustomValidator runat="server" ID="vldCustFirstName" ControlToValidate="txtFirstName"
                                                Display="None" ErrorMessage='<%$ Resources:key_first_name_only_accepts_alphab %>' />
                                            <asp:CustomValidator runat="server" ID="vldDuplicateAccount" ControlToValidate="txtFirstName"
                                                Display="None" ErrorMessage='<%$ Resources:key_our_records_show_you_already_have_a_payza_account__at_this_t %>' />
                                        </div>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Last_Name %>' AssociatedControlID="txtLastName" />
                                            <AlertPay:Textbox ID="txtLastName" runat="server" MaxLength="50" />
                                            <asp:RequiredFieldValidator runat="server" Display="None" ControlToValidate="txtLastName"
                                                ErrorMessage='<%$ Resources:key_your_last_name_is_required_ %>' />
                                            <asp:CustomValidator runat="server" ID="vldCustLastName" ControlToValidate="txtLastName"
                                                Display="None" ErrorMessage='<%$ Resources:key_last_name_only_accepts_alphabe %>' />
                                        </div>

                                    <asp:Panel runat="server" ID="fldChooseAddress" Css class="form-group">
                                            <AlertPay:Label runat="server" Text='<%$ Resources:key_contact_address %>' CssClass="field-label" />

                                            <div class="radio-check-item">
                                                <AlertPay:RefinedRadioButton ID="rdbSame" Text='<%$ Resources:key_same_as_my_business_address %>'
                                                    runat="server" GroupName="address" AutoPostBack="true" Checked="true" />
                                            </div>

                                            <div class="radio-check-item">
                                                <AlertPay:RefinedRadioButton ID="rdbDifferent" Text='<%$ Resources:key_enter_a_different_address %>'
                                                    runat="server" GroupName="address" AutoPostBack="true" />
                                            </div>
                                        </asp:Panel>

                                        <AlertPay:AddressForm runat="server" ID="ctlPersonalAddress" AddressType="Contact" />

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" Text='<%$ Resources:key_citizenship %>' AssociatedControlID="ddlCitizenship" />
                                            <asp:DropDownList runat="server" ID="ddlCitizenship" AppendDataBoundItems="true">
                                                <asp:ListItem Text='<%$ Resources: Application, key____Choose_Country___ %>' Value="0" />
                                            </asp:DropDownList>
                                            <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlCitizenship" Display="None"
                                                ErrorMessage='<%$ Resources: Application, key_Your_country_of_citizenship_is %>'
                                                InitialValue="0" />
                                        </div>

                                        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                            <ContentTemplate>
                                            <div class="form-group">
                                                    <AlertPay:Label runat="server" ID="fldPrimaryPhone" Text='<%$ Resources: Application, key_Home_Phone %>' CssClass="field-label" />

                                                    <AlertPay:PhoneNumberTextbox runat="server" ID="txtPrimaryPhone" PhoneType="Home"
                                                        IsOnSignup="true" IsRequired="true" />

                                                    <asp:PlaceHolder ID="phPhoneFormatHelpTextUnitedStatesCanada" runat="server" EnableViewState="false">
                                                        <span class="field-value"><%=GetLocalResourceObject("key_home_phone_example_US_CA").ToString()%></span>
                                                    </asp:PlaceHolder>
                                                </div>

                                            <div runat="server" id="PositionDiv" class="form-group">
                                                    <AlertPay:Label ID="lblPosAss" runat="server" AssociatedControlID="ddlPositionType" Text='<%$ Resources: key_position_associated_with_business %>' />
                                                    <asp:DropDownList runat="server" ID="ddlPositionType">
                                                        <asp:ListItem Text='<%$ Resources: key_choose_position %>' Value="0" />
                                                        <asp:ListItem Text='<%$ Resources: key_director %>' Value="1" />
                                                        <asp:ListItem Text='<%$ Resources: key_shareholder %>' Value="2" />
                                                        <asp:ListItem Text='<%$ Resources: key_signatory %>' Value="3" />
                                                        <asp:ListItem Text='<%$ Resources:key_other %>' Value="4" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ddlPositionType" ErrorMessage='<%$ Resources: Application, key_your_position_is_required %>'
                                                        InitialValue="0" Display="None" />
                                                </div>

                                                <asp:Panel runat="server" ID="fldOccupationCategory" CssClass="field">
                                                    <AlertPay:Label runat="server" AssociatedControlID="ddlOccupationCategory" Text='<%$ Resources:Application, key_occupation_category %>' />
                                                    <asp:DropDownList runat="server" ID="ddlOccupationCategory" AppendDataBoundItems="true"
                                                        AutoPostBack="true">
                                                        <asp:ListItem Text='<%$ Resources:Application, key____choose_category___ %>' Value="0" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="ddlOccupationCategory"
                                                        Display="None" InitialValue="0" ErrorMessage='<%$ Resources:Application, key_your_occupation_category_is_required %>' />
                                                    <asp:CustomValidator runat="server" ID="CustomValidator2" ControlToValidate="ddlOccupationCategory" Display="None" />
                                                </asp:Panel>

                                                <asp:Panel runat="server" ID="fldOccupation" CssClass="field">
                                                    <AlertPay:Label ID="lblOther" runat="server" Text='<%$ Resources: Application, key_other %>'
                                                        AssociatedControlID="ddlOccupation" />
                                                    <asp:DropDownList runat="server" ID="ddlOccupation" AppendDataBoundItems="true">
                                                        <asp:ListItem Text='<%$ Resources:Application, key____choose_occupation___ %>' Value="0" />
                                                    </asp:DropDownList>
                                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="ddlOccupation"
                                                        Display="None" InitialValue="0" ErrorMessage='<%$ Resources:Application, key_your_occupation_is_required %>' />

                                                </asp:Panel>

                                            </ContentTemplate>
                                        </asp:UpdatePanel>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Date_of_Birth %>' CssClass="field-label" />
                                            <AlertPay:DateSelect runat="server" ID="ctlBirthDate" />
                                        </div>

                                    </asp:Panel>
                                    <%--
                        <AlertPay:RegistrationMessage ID="RegistrationMessage2" Container="pnlPersonalInformation" runat="server">
                            <p><asp:Literal runat="server" text='<%$ Resources:key_alertpay_is__a_trusted_and_sec %>'></asp:Literal></p>
                            <p><asp:Literal runat="server" text='<%$ Resources:key_we_need_your_phone_number__occ %>'></asp:Literal></p>
                        </AlertPay:RegistrationMessage>
                                    --%>
                                    <div class="field button-field">
                                        <asp:LinkButton CssClass="btn-link" ID="btnStep2Next" runat="server" OnClientClick="return QASTriggerAction(this.id);">
                                <%=Resources.Application.key_next_step %>
                                        </asp:LinkButton>
                                        &nbsp;<%=GetLocalResourceObject("key_or").ToString()%>&nbsp;
                                    <asp:LinkButton ID="btnStep2Previous" runat="server" CausesValidation="false">
                                <%=GetLocalResourceObject("key_previous_step").ToString() %>
                                    </asp:LinkButton>
                                    </div>
                                </div>
                            </asp:Panel>
                        </fieldset>
                    </asp:View>

                    <%-- vwStep3 is "Step 2" in the UI --%>
                    <asp:View runat="server" ID="vwStep3">
                        <fieldset>

                            <asp:Panel runat="server" DefaultButton="btnStep3FinalStep">
                                <input type="hidden" id="QASStoreProceedField1" runat="server" />
                                <input type="hidden" id="QASStoreResultField1" runat="server" />
                                <input type="hidden" id="QASStoreStatusField1" runat="server" />
                                <div class="form-box">
                                    <h6></h6>

                                    <script type="text/javascript">
                                        <%=RegisterGoogleAnalyticsForAccountType("step2")%>
                                    </script>
                                    <!--contact info fields box-->
                                    <asp:Panel runat="server" ID="pnlAccountLogin">

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" Text='<%$ Resources: Application, key_Email_Address %>' AssociatedControlID="txtEmail" />
                                            <span class="field-value"><em><%=GetLocalResourceObject("key_you_will_login_to_your_account").ToString() %></em></span>
                                            <AlertPay:Textbox ID="txtEmail" Required="true" ValidationMode="EmailAddress" runat="server" MaxLength="50" />

                                            <asp:CustomValidator runat="server" ID="vldDuplicateEmail" ControlToValidate="txtEmail"
                                                Display="None" />
                                            <asp:CustomValidator runat="server" ControlToValidate="txtEmail" ID="vldEmail" Display="None"
                                                ErrorMessage='<%$ Resources: Application, key_The_email_domain_you_provided_ %>' />
                                        </div>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" AssociatedControlID="txtPassword" Text='<%$ Resources: Application, key_Password %>' />
                                            <span class="field-value"><em><%=GetLocalResourceObject("key_please_choose_a_different_pass").ToString() %></em></span>
                                            <AlertPay:Textbox ID="txtPassword" CssClass="user-password" runat="server" ValidationMode="Password" Required="true" TextMode="password" MaxLength="30" />
                                            <div class="field-value field-item-auxiliary">
                                                <div class="password-meter" data-behavior="passwordMeter(monitor: .user-password)">
                                                    <p class="strength weak"><%=GetLocalResourceObject("key_password_weak").ToString()%></p>
                                                    <p class="strength good"><%=GetLocalResourceObject("key_password_good").ToString()%></p>
                                                    <p class="strength strong"><%=GetLocalResourceObject("key_password_strong").ToString() %></p>
                                                    <div class="meter"></div>
                                                </div>
                                            </div>
                                        </div>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" AssociatedControlID="txtPassword2" Text='<%$ Resources:key_re_enter_password %>' />
                                            <AlertPay:Textbox ID="txtPassword2" runat="server" ValidationMode="Password" TextMode="password"
                                                MaxLength="50" />
                                            <asp:RequiredFieldValidator runat="server" Display="None" ControlToValidate="txtPassword2"
                                                ErrorMessage='<%$ Resources:key_you_must_re_enter_your_password %>' />
                                            <asp:CompareValidator runat="server" Display="None" ControlToValidate="txtPassword2"
                                                ErrorMessage='<%$ Resources: Application, key_Your_password_fields_do_not_ma %>'
                                                ControlToCompare="txtPassword" />
                                        </div>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" AssociatedControlID="txtTransactionPIN" Text='<%$ Resources: Application, key_Transaction_PIN %>' />
                                            <span class="field-value"><em><%=GetLocalResourceObject("key_your_transaction_pin_is").ToString()%></em></span>
                                            <AlertPay:Textbox ID="txtTransactionPIN" runat="server" ValidationMode="TransactionPIN"
                                                Required="true" TextMode="password" MaxLength="8" />
                                        </div>

                                    <div class="form-group">
                                            <AlertPay:Label runat="server" AssociatedControlID="txtTransactionPIN2" Text='<%$ Resources: Application, key_Re_enter_Transaction_PIN %>' />
                                            <AlertPay:Textbox ID="txtTransactionPIN2" runat="server" TextMode="password" MaxLength="8" />
                                            <asp:RequiredFieldValidator runat="server" Display="None" ControlToValidate="txtTransactionPIN2"
                                                ErrorMessage='<%$ Resources:key_you_must_re_enter_your_transac %>' />
                                            <asp:CompareValidator runat="server" Display="None" ControlToValidate="txtTransactionPIN2"
                                                ErrorMessage='<%$ Resources:key_your_transaction_pins_fields_d %>' ControlToCompare="txtTransactionPIN" />
                                        </div>
                                    </asp:Panel>
                                    <!--signup fields box End-->
                                    <%--
                        <AlertPay:RegistrationMessage ID="RegistrationMessage3" Container="pnlAccountLogin" runat="server">
                            <p><asp:Literal runat="server" text='<%$ Resources:key_this_information_is_specific_t %>'></asp:Literal></p>
                        </AlertPay:RegistrationMessage>
                                    --%>
                                    <asp:Panel runat="server" ID="pnlPasswordRecovery">
                                        <hr />

                                        <h6><%=GetLocalResourceObject("key_password_recovery").ToString() %></h6>
                                        <AlertPay:SecurityQuestions runat="server" ID="secQuestions" />
                                    </asp:Panel>
                                    <!--signup fields box End-->
                                    <%--
                        <AlertPay:RegistrationMessage ID="RegistrationMessage4" Container="pnlPasswordRecovery" runat="server">
                            <p><asp:Literal runat="server" text='<%$ Resources:key_if_you_forget_your_password__y %>'></asp:Literal></p>  
                        </AlertPay:RegistrationMessage>
                                    --%>

                                    <%--
                        <AlertPay:RegistrationMessage ID="RegistrationMessage5" Container="pnlThirdParty" runat="server" />
                                    --%>
                                    <!--captcha-->
                                    <!--contact info fields box-->
                                    <asp:Panel runat="server" ID="pnlWordandAccept">
                                        <hr />

                                        <asp:Panel runat="server" ID="pnlWordVerification" CssClass="field">
                                            <span class="field-value">
                                                <asp:Literal runat="server" Text='<%$ Resources:key_to_verify_that_you_are_human__ %>' /></span>
                                            <AlertPay:AlertPayRecaptchaControl ID="UCrecaptcha" runat="server" PublicKey="6LcYI7oSAAAAAPWJV1D4Z3aK2uc6JK35ApCTFcSb"
                                                PrivateKey="6LcYI7oSAAAAAMm49cLWDszKG3gBLaHRdA3qF4Xo" Theme="clean" BorderStyle="None" />
                                        </asp:Panel>

                                        <!--signup fields box End-->
                                        <%--
                                <AlertPay:RegistrationMessage Container="pnlWordandAccept" runat="server" ID="RegistrationMessage6">
                                    <p><asp:Literal runat="server" text='<%$ Resources:key_to_verify_that_you_are_human__ %>'></asp:Literal></p>
                                </AlertPay:RegistrationMessage>
                                        --%>
                                        <div class="field radio-check-field agreement-checkbox">
                                            <div class="radio-check-item">
                                                <AlertPay:RefinedCheckBox ID="ChkAgreement" runat="server" Text='<%$ Resources:key_you_acknowledge_that_you_have_read %>' CausesValidation="true" />
                                                <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/en/agreements.aspx" Target="_blank" CssClass="ua-link">
                                                <%=GetLocalResourceObject("key_user_agreement").ToString() %></asp:HyperLink>
                                            </div>

                                            <div class="radio-check-item third-party-ua">
                                                <AlertPay:RefinedCheckBox ID="ChkThirdPartyAgreement" runat="server" Text='<%$ Resources:key_third_party_agreement %>' Visible="false" CausesValidation="true" />
                                            </div>

                                            <asp:CustomValidator ID="vldAgree" runat="server" Display="none" EnableClientScript="false" ErrorMessage='<%$ Resources:key_you_must_agree_to_alertpay_s_u %>' />
                                            <asp:CustomValidator ID="vldThirdPartyAgree" runat="server" Display="none" EnableClientScript="false" ErrorMessage='<%$ Resources:key_you_must_agree_thirdparty_agreement %>' />
                                        </div>
                                    </asp:Panel>
                                    <!-- captcha end -->
                                    <%--<p class="exceptions"><%=GetLocalResourceObject("key___this_information_is_manditor").ToString() %></p>--%>
                                    <div class="field button-field">
                                        <asp:LinkButton CssClass="btn-link" ID="btnStep3FinalStep" runat="server">
                                <%=GetLocalResourceObject("key_final_step").ToString() %>
                                        </asp:LinkButton>
                                        &nbsp;<%=GetLocalResourceObject("key_or").ToString()%>&nbsp;
                                    <asp:LinkButton ID="btnStep3Previous" runat="server" CausesValidation="false">
                                <%=GetLocalResourceObject("key_previous_step").ToString() %>
                                    </asp:LinkButton>
                                    </div>
                                    <!--button  box End-->
                                </div>
                            </asp:Panel>
                        </fieldset>
                    </asp:View>


                    <%-- vwStep4 is "Step 3" in the UI --%>
                    <asp:View runat="server" ID="vwStep4">
                        <h3 class="hero-units">
                            <%=GetLocalResourceObject("key_congratulations__your_account_").ToString()%>
                        </h3>
                        <script type="text/javascript">
                            <%=RegisterGoogleAnalyticsForAccountType("step3")%>
                        </script>
                        <p>
                            <%=GetLocalResourceObject("key_just_complete_the_last_few_steps_and_you_re_done_").ToString()%>
                        </p>
                        <hr />
                        <%-- todo_important - localization --%>
                        <ol class="hero-steps">
                            <li><span><strong>
                                <%=GetLocalResourceObject("key_check_your_email").ToString() %></strong>
                                <%=GetLocalResourceObject("key____we_just_sent_a_validation_e").ToString()%></span>
                                <div class="alert">
                                    <AlertPay:Literal runat="server" ID="litEmailValidationLink" />
                                </div>
                            </li>
                            <li><span><strong>
                                <%=GetLocalResourceObject("key_click_on_the_validation_link").ToString() %></strong>
                                <%=GetLocalResourceObject("key__in_the_email_or_copy_and_past").ToString()%></span></li>
                            <li><span><strong>Enter your password</strong> to login when prompted.</span></li>
                        </ol>
                        <p>
                            Didn't get your validation email?
                            <asp:LinkButton ID="lnkResendEmail" runat="server" Visible="True" CausesValidation="false">
                    <%=GetLocalResourceObject("key_click_here").ToString()%></asp:LinkButton>
                            and we'll send you another one.
                        </p>
                    </asp:View>
                </asp:MultiView>
            </div>
            <%-- end of <div class="main"> --%>
            <div class="sidebar">
                <%If Me.ucMessageErrors.Mode = MessageMode.Error Then%>
                <div id="sidebar-errors" data-behavior="placement(at:center, of:parent, slide)">
                    <%-- disable ViewState so that it does not save error state during previous postbacks --%>
                    <AlertPay:UCMessage ID="ucMessageErrors" runat="server" EnableViewState="false" ValidationSummarySettingTiming="DuringPreRender" />
                </div>
                <%End If%>
                <%-- to avoid the "Name '__o' is not declared." error, which is a Visual Studio IntelliSense bug --%><%=""%>
                <asp:MultiView ID="mvSidebar" runat="server">
                    <asp:View ID="vwSidebarErrors" runat="server">
                    </asp:View>
                    <asp:View ID="vwSidebarInformationDuringSignUp" runat="server">

                        <div class="modal-window how-it-works-dialog" data-behavior="modal(triggeredBy: .quick-look-loupe); placement(at:center, of:window)">
                            <a href="#" class="modal-close" title="close"></a>
                            <div class="how-it-works-dialog-content" data-behavior="accordion(header: .header, content: .section-info)">
                                <h1><%=GetLocalResourceObject("key_how_payza_works").ToString()%></h1>
                                <div class="section">
                                    <div class="account-icons-set">
                                        <span class="personal-pro-icon"></span>
                                    </div>
                                    <div class="header">
                                        <h2><%=GetLocalResourceObject("key_personal_accounts_for_buyers").ToString()%></h2>
                                        <h4><%=GetLocalResourceObject("key_shop_send_and_get_money").ToString()%></h4>
                                    </div>
                                    <div id="buyers" class="section-info clearfix">
                                        <div class="column load-e-wallet">
                                            <h3><%=GetLocalResourceObject("key_load_your_ewallet").ToString()%></h3>
                                            <p><%=GetLocalResourceObject("key_use_a_bank_account_money_order").ToString()%></p>
                                        </div>
                                        <div class="column shop-send-request">
                                            <h3><%=GetLocalResourceObject("key_send_or_request_money_and_shop").ToString()%></h3>
                                            <p><%=GetLocalResourceObject("key_shop_online_request_a_loan").ToString()%></p>
                                        </div>
                                        <div class="column payza-takes-care">
                                            <h3><%=GetLocalResourceObject("key_let_us_do_the_rest").ToString()%></h3>
                                            <p><%=GetLocalResourceObject("key_we_ensure_security").ToString()%></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="section">
                                    <div class="account-icons-set">
                                        <span class="business-icon"></span>
                                    </div>
                                    <div class="header">
                                        <h2><%=GetLocalResourceObject("key_business_accounts_for_sellers").ToString()%></h2>
                                        <h4><%=GetLocalResourceObject("key_get_paid_easily").ToString()%></h4>
                                    </div>
                                    <div id="sellers" class="section-info clearfix">
                                        <div class="column get-paid">
                                            <h3><%=GetLocalResourceObject("key_accept_payments").ToString()%></h3>
                                            <p><%=GetLocalResourceObject("key_shoppers_use_our_platform").ToString()%></p>
                                        </div>
                                        <div class="column widthdraw-your-money">
                                            <h3><%=GetLocalResourceObject("key_claim_your_money").ToString()%></h3>
                                            <p><%=GetLocalResourceObject("key_withdraw_money_to_your_bank_account").ToString()%></p>
                                        </div>
                                        <div class="column payza-takes-care">
                                            <h3><%=GetLocalResourceObject("key_let_us_do_the_rest").ToString()%></h3>
                                            <p><%=GetLocalResourceObject("key_we_fight_fraud_and_ensure").ToString()%></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="how-it-works">
                            <h3><%=GetLocalResourceObject("key_how_payza_works").ToString()%></h3>
                            <p><a class="quick-look-loupe" href="#"><%=GetLocalResourceObject("key_take_a_quick_look").ToString()%></a></p>
                        </div>
                        <div class="which-payza-account">
                            <h3><%=GetLocalResourceObject("key_which_account_is_right").ToString()%></h3>

                            <h6><%=GetLocalResourceObject("key_want_to_manage_your_money_online_").ToString()%></h6>
                            <p><%=GetLocalResourceObject("key_the__strong_personal__strong__account_lets_you_send_and_rece").ToString()%></p>

                            <h6><%=GetLocalResourceObject("key_do_you_have_an_online_business_").ToString()%></h6>
                            <p><%=GetLocalResourceObject("key_the__strong_business__strong__account_is_the_all_in_one_solu").ToString()%></p>

                            <h6><%=GetLocalResourceObject("key_looking_to_learn_more_").ToString()%></h6>
                            <p><%=GetLocalResourceObject("key_opening_a__strong_starter__strong__account_on_a_trial_basis_").ToString()%></p>
                        </div>
                    </asp:View>
                    <asp:View ID="vwSidebarInformationPostSignUp" runat="server">
                        <div class="what-now">
                            <h3>So, what now?</h3>
                            <div>
                                <small>Here are your next steps to get started</small>
                            </div>
                            <ul class="check-list">
                                <li>Verify Your Account
                                    <ol>
                                        <li>Login</li>
                                        <li>Click on <strong>Become verified</strong></li>
                                        <li>Follow the simple instructions</li>
                                    </ol>
                                </li>
                                <li>Send Money Instantly
                                    <ol>
                                        <li>Login</li>
                                        <li>Click on <strong>Send Money</strong></li>
                                        <li>Enter the recipient's email address and the amount you want to send</li>
                                    </ol>
                                </li>
                                <li>Shop Securely Online
                                    <ol>
                                        <li>Login from a merchant's checkout page</li>
                                        <li>Choose you method of payment</li>
                                        <li>Confirm your payment details and click on <strong>Buy Now</strong></li>
                                    </ol>
                                </li>
                            </ul>
                        </div>
                    </asp:View>
                </asp:MultiView>
            </div>
            <%-- end of <div class="sidebar"> --%>
        </div>
    </div>
</ContentTemplate>
</asp:UpdatePanel>

    <script type="text/javascript">
        function setFlag() {

            //pass down countryId to Angular
            countryListScope = angular.element('.create-account-popup').scope();
            countryListScope.refreshCountryId($('.country-select select option:selected').val());


            if ($('.country-select select option:selected').val() != 0) {

                var flagPrefix = $('.country-select select option:selected').attr('data-country-abbr'),
                    country = $('.country-select select option:selected').text();

                $('.country-select .flag-16').remove();
                $('.country-select').append('<span class="flag-16 fl-' + flagPrefix + ' icon-only" title="' + country + '"><span class="icn"></span><span class="icn-txt">' + country + '</span></span>');

            } else {
                $('.country-select .flag-16').remove();
            }
        }

        function resetddlCountry() {
            try {
                $('#<%= txtUKEmailAddress.ClientID%>').val('');
                $("#divErrorUKEmailAddress").css("display", "none");
                $('#<%= ddlCountries.ClientID%>').val(0);
                setFlag();

            } catch (e) {

            }
        }


        function disableUK() {
            try {

                var currentValue = $('.country-select select option:selected').val();
                if (currentValue === '222') {
                    $('.hidewhenUK').hide();
                    $('#<%=DivUKMarketing.ClientId %>').modal({ dismissOnESC: false }).placement({ at: 'center', of: 'window' });
                } else {
                    $('.hidewhenUK').show();
                }
                previousValue = currentValue;
            } catch (e) {
            }
        }


        function validateUKEmailAddress() {
            try {

                var currentEmail = $('#<%=txtUKEmailAddress.ClientId %>').val();
                 var emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                 if (emailReg.test(currentEmail)) {
                     $("#divErrorUKEmailAddress").html("");
                     $("#divErrorUKEmailAddress").css("display", "none");
                     return true;
                 } else {
                     $("#divErrorUKEmailAddress").html("Please enter a valid email address.");
                     $("#divErrorUKEmailAddress").css("display", "block");
                     return false;
                 }
             } catch (e) {

             }
         }






         function resetCountryDropdown() {
             // $('#<%= txtUSEmailAddress.ClientID%>').val('');
            $("#divErrorUSEmail").css("display", "none");
            $('#<%= ddlCountries.ClientId%>').val('');
         }

         function validateUSEmailAddress() {
             try {

                 var currentEmail = $('#<%=txtUSEmailAddress.ClientId %>').val();
                var emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (emailReg.test(currentEmail)) {
                    $("#divErrorUSEmail").html("");
                    $("#divErrorUSEmail").css("display", "none");
                    return true;
                } else {
                    $("#divErrorUSEmail").html("Please enter a valid email address");
                    $("#divErrorUSEmail").css("display", "block");
                    return false;
                }
            } catch (e) {

            }
        }



        function disableUS() {
            try {
                var currentValue = $('#<%= ddlCountries.ClientId%>').val();
                             if (currentValue === '3') {
                                 $('#<%=DivUSMarketing.ClientID%>').modal({ dismissOnESC: false }).placement({ at: 'center', of: 'window' });
                     }

                 } catch (e) {

                 }
             }

             // flag - start 
             $(document).ready(function () {
                 //set the flag when the page loads
                 //setFlag();
                 //change the flag based on the selected country (keypress event needed for FF)
                 $('.country-select select').on('change keypress', setFlag);

            <%If AlertPay.Helpers.ConfigHelper.IsUKAccountFeaturesDisabled Then%>
            disableUK();
            // run it when the country selection changes
            $('.country-select select').on('change', disableUK);
            <%End If%>

            disableUS();
            $('#<%= ddlCountries.ClientId%>').on('change', disableUS);
        });
        // disable UK - end 
    </script>

    <style>
      /* Transitionary Styles */
  .form-group {margin-bottom:10px;}
    .row {margin-left: -10px; margin-right: -10px;}
    .col-sm-3, .col-sm-4, .col-sm-5 {
      float:left;
      position: relative;
      min-height: 1px;
      padding-left: 10px;
      padding-right: 10px;}
    .col-sm-3 {width:25%}
    .col-sm-4 {width:29.7%;}
    .col-sm-5 {width:41.66%}

    fieldset label {margin-bottom:0;}
    
    .field-label {
	cursor: default;
	display: block;
	font-size: 1.3em;
	font-weight: bold;
	margin-bottom: 5px;}

  .flag-icon {
    background-repeat:no-repeat;
    background-position: left 50%;
    padding-left: 20px;
    font-size:13px;
}

  </style>
</asp:Content>

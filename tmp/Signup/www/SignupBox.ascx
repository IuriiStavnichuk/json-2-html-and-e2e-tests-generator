<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="SignupBox.ascx.vb" Inherits=".SignupBox" %>

    <div href="#" class="block complete-profile" data-ng-class="{completed:profileCompleted}" data-ng-controller="SignupBox">
        <a data-ng-click="!profileCompleted&&currentStepVisibilityTurnOn()">Complete profile setup</a>
        <p>Turn on basic Payza functions</p>
        <progress-bar value="percentComplete"></progress-bar>
    </div>
    <div class="block verify-account">
        <a href="#">Verify your account</a>
        <p>Lift your transaction limits</p>
    </div>
    <div href="#" class="block enable-checkout">
        <a>Enable checkout</a>
        <p>Sell online with Payza checkout</p>
    </div>

<script type="text/javascript" src="js/app/modules/progressBar.js"></script>

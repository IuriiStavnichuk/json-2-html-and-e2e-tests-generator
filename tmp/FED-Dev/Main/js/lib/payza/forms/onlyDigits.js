/// <reference path="../util/alias.js" />

(function () {
    function onlyDigits(event) {
        var allowed = '0123456789',                 // allowed characters
            e = event || window.event,              // standard or IE model
            code = e.charCode || e.keyCode,         // the code of the character that was entered
            character = String.fromCharCode(code);  // the character that was entered

        // we don't care about function keys
        if (code < 32 || e.ctrlKey || e.altKey) {
            return true;
        }

        // don't display characters that are not allowed
        if (allowed.indexOf(character) === -1) {
            if (e.preventDefault) { e.preventDefault(); }
            if (e.returnValue) { e.returnValue = false; }
            return false;
        }

        return true;
    }

    // make it available
    payza.util.alias(onlyDigits, 'payza.forms.onlyDigits');
}());
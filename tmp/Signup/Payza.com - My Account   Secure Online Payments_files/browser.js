/// <reference path="../util/alias.js" />

// Documentation: https://payza.sharepoint.com/sites/rd/fed/FrontEnd%20JavaScript%20Guide/API/payza/env/browser.aspx

(function () {
    function Browser() {
        // browser detection utility
        // Adapted from http://www.quirksmode.org/js/detect.html

        var agents = [{ string: navigator.userAgent, subString: 'Chrome', identity: 'chrome', versionSearch: 'Chrome' },
                { string: navigator.vendor, subString: 'Apple', identity: 'safari', versionSearch: 'Version' },
                { prop: window.opera, identity: 'opera', versionSearch: 'Version' },
                { string: navigator.userAgent, subString: 'Firefox', identity: 'firefox', versionSearch: 'Firefox' },
                { string: navigator.userAgent, subString: 'MSIE', identity: 'ie', versionSearch: 'MSIE' }],
            versionSearchString = null;

        function getName() {
            var i,
                dataString,
                dataProp;

            for (i = 0; i < agents.length; i = i + 1) {
                dataString = agents[i].string;
                dataProp = agents[i].prop;

                versionSearchString = agents[i].versionSearch || agents[i].identity;

                if ((dataString && dataString.indexOf(agents[i].subString) !== -1) || dataProp) {
                    return agents[i].identity;
                }
            }
        }

        function getVersion(navigatorInfo) {
            var index = navigatorInfo.indexOf(versionSearchString);

            if (index === -1) { return; }

            return parseFloat(navigatorInfo.substring(index + versionSearchString.length + 1));
        }

        this.name = getName() || 'unknown';
        this.version = getVersion(navigator.userAgent) || getVersion(navigator.appVersion) || 'unknown';

        // is Java available?
        this.javaEnabled = navigator.javaEnabled();

        // is Flash available?
        if (navigator.plugins === undefined || navigator.plugins.length === 0) {
            this.flashEnabled = Boolean(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
        } else {
            this.flashEnabled = Boolean(navigator.plugins["Shockwave Flash"]);
        }
    }

    // make it available
    payza.util.alias(new Browser(), 'payza.env.browser');
}());
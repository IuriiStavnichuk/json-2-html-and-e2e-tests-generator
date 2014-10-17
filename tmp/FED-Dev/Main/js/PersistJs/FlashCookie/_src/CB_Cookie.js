
//set this to name of your flash object/embed
var cookie_id = 'CBCookie';

var CB_Cookie =
{
    init: function(cookie_id) {
        this.cookie_id = cookie_id;
        this.flash_cookie_ready = false;
        this.flash_cookie_able = false;
        this.flash_cookie = null;
        this.flash_alert = false;

        this.flash_is_ready();
    },

    flash_is_ready: function() {
        if (!document.getElementById || !document.getElementById(this.cookie_id)) return;
        if (!this.get_movie(this.cookie_id)) return;

        this.flash_cookie_ready = true;
        this.flash_cookie_able = this.flash_cookie.f_cookie_able();
    },


    is_able: function() {
        if (!this.flash_alert && !(this.flash_cookie_ready && this.flash_cookie_able)) {
            //alert("CB_Cookie not initialized correctly.");
            this.flash_alert = false;
        }
        return (this.flash_cookie_ready && this.flash_cookie_able);
    },

    del: function(key) {
        if (!this.is_able()) return;
        this.flash_cookie.f_delete_cookie(key);
    },

    get: function(key) {
        if (!this.is_able()) return;
        var ret = this.flash_cookie.f_get_cookie(key);
        return ((ret == 'null') ? '' : ret);
    },

    set: function(key, val) {
        if (!this.is_able()) return;
        this.flash_cookie.f_set_cookie(key, val);
    },

    get_movie: function() {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            this.flash_cookie = window[this.cookie_id];
        }
        else {
            this.flash_cookie = document[this.cookie_id];
        }

        return ((this.flash_cookie) ? true : false);
    }

};

function flash_ready() {
    CB_Cookie.init(cookie_id);
}

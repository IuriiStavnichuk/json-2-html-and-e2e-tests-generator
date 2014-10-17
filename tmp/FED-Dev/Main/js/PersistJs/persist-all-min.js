
//==========================Gears==============================
(function() {
    if (window.google && google.gears) { return; }
    var factory = null;
    if (typeof GearsFactory != 'undefined') {
        factory = new GearsFactory();
    } else {
        try {
            factory = new ActiveXObject('Gears.Factory');
            if (factory.getBuildInfo().indexOf('ie_mobile') != -1) { factory.privateSetGlobalObject(this); }
        } catch (e) {
            if ((typeof navigator.mimeTypes != 'undefined') && navigator.mimeTypes["application/x-googlegears"]) {
                factory = document.createElement("object");
                factory.style.display = "none";
                factory.width = 0;
                factory.height = 0;
                factory.type = "application/x-googlegears";
                document.documentElement.appendChild(factory);
            }
        }
    }
    if (!factory) { return; }
    if (!window.google) { google = {}; }
    if (!google.gears) { google.gears = { factory: factory }; }
})();
//==================================================================


if (typeof deconcept == "undefined")
    var deconcept = new Object();
if (typeof deconcept.util == "undefined")
    deconcept.util = new Object();
if (typeof deconcept.SWFObjectUtil == "undefined")
    deconcept.SWFObjectUtil = new Object();

//==========================SWFObject==============================
deconcept.SWFObject = function(swf, id, w, h, ver, c, quality, xiRedirectUrl, redirectUrl, detectKey) {
    if (!document.getElementById) { return; }
    this.DETECT_KEY = detectKey ? detectKey : 'detectflash';
    this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if (swf) { this.setAttribute('swf', swf); }
    if (id) { this.setAttribute('id', id); }
    if (w) { this.setAttribute('width', w); }
    if (h) { this.setAttribute('height', h); }
    if (ver) { this.setAttribute('version', new deconcept.PlayerVersion(ver.toString().split("."))); }
    this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion();
    if (!window.opera && document.all && this.installedVer.major > 7) { deconcept.SWFObject.doPrepUnload = true; }
    if (c) { this.addParam('bgcolor', c); }
    var q = quality ? quality : 'high';
    this.addParam('quality', q);
    this.setAttribute('useExpressInstall', false);
    this.setAttribute('doExpressInstall', false);
    var xir = (xiRedirectUrl) ? xiRedirectUrl : window.location;
    this.setAttribute('xiRedirectUrl', xir);
    this.setAttribute('redirectUrl', '');
    if (redirectUrl) { this.setAttribute('redirectUrl', redirectUrl); }
}

deconcept.SWFObject.prototype = {
    useExpressInstall: function(path) {
        this.xiSWFPath = !path ? "expressinstall.swf" : path;
        this.setAttribute('useExpressInstall', true);
    },
    setAttribute: function(name, value) {
        this.attributes[name] = value;
    },
    getAttribute: function(name) {
        return this.attributes[name];
    },
    addParam: function(name, value) {
        this.params[name] = value;
    },
    getParams: function() {
        return this.params;
    },
    addVariable: function(name, value) {
        this.variables[name] = value;
    },
    getVariable: function(name) {
        return this.variables[name];
    },
    getVariables: function() {
        return this.variables;
    },
    getVariablePairs: function() {
        var variablePairs = new Array();
        var key;
        var variables = this.getVariables();
        for (key in variables) { variablePairs.push(key + "=" + variables[key]); }
        return variablePairs;
    },

    //==================================================================    

    getSWFHTML: function() {
        var swfNode = ""; if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "PlugIn");
                this.setAttribute('swf', this.xiSWFPath);
            }
            swfNode = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute('swf') + '" width="' + this.getAttribute('width') + '" height="' + this.getAttribute('height') + '"';
            swfNode += ' id="' + this.getAttribute('id') + '" name="' + this.getAttribute('id') + '" ';
            var params = this.getParams();
            for (var key in params) {
                swfNode += [key] + '="' + params[key] + '" ';
            }
            var pairs = this.getVariablePairs().join("&");
            if (pairs.length > 0) { swfNode += 'flashvars="' + pairs + '"'; }
            swfNode += '/>';
        } else {
            if (this.getAttribute("doExpressInstall")) {
                this.addVariable("MMplayerType", "ActiveX");
                this.setAttribute('swf', this.xiSWFPath);
            }
            swfNode = '<object id="' + this.getAttribute('id') + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute('width') + '" height="' + this.getAttribute('height') + '">';
            swfNode += '<param name="movie" value="' + this.getAttribute('swf') + '" />';
            var params = this.getParams();
            for (var key in params) {
                swfNode += '<param name="' + key + '" value="' + params[key] + '" />';
            }
            var pairs = this.getVariablePairs().join("&");
            if (pairs.length > 0) {
                swfNode += '<param name="flashvars" value="' + pairs + '" />';
            }
            swfNode += "</object>";
        }
        return swfNode;
    },

    write: function(elementId) {
        if (this.getAttribute('useExpressInstall')) {
            var expressInstallReqVer = new deconcept.PlayerVersion([6, 0, 65]);
            if (this.installedVer.versionIsValid(expressInstallReqVer) && !this.installedVer.versionIsValid(this.getAttribute('version'))) {
                this.setAttribute('doExpressInstall', true);
                this.addVariable("MMredirectURL", escape(this.getAttribute('xiRedirectUrl')));
                document.title = document.title.slice(0, 47) + " - Flash Player Installation";
                this.addVariable("MMdoctitle", document.title);
            }
        }
        if (this.skipDetect || this.getAttribute('doExpressInstall') || this.installedVer.versionIsValid(this.getAttribute('version'))) {
            var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId; n.innerHTML = this.getSWFHTML();
            return true;
        } else {
            if (this.getAttribute('redirectUrl') != "") {
                document.location.replace(this.getAttribute('redirectUrl'));
            }
        }
        return false;
    }
}


deconcept.SWFObjectUtil.getPlayerVersion = function() {
    var PlayerVersion = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var x = navigator.plugins["Shockwave Flash"];
        if (x && x.description) {
            PlayerVersion = new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
        }
    } else {
        try {
            var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        } catch (e) {
            try {
                var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                PlayerVersion = new deconcept.PlayerVersion([6, 0, 21]);
                axo.AllowScriptAccess = "always";
            } catch (e) {
                if (PlayerVersion.major == 6) {
                    return PlayerVersion;
                }
            }
            try { axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); } catch (e) { }
        }
        if (axo != null) {
            PlayerVersion = new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
        }
    }
    return PlayerVersion;
}


deconcept.PlayerVersion = function(arrVersion) {
    this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
    this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
    this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}

deconcept.PlayerVersion.prototype.versionIsValid = function(fv) {
    if (this.major < fv.major) return false;
    if (this.major > fv.major) return true;
    if (this.minor < fv.minor) return false;
    if (this.minor > fv.minor) return true;
    if (this.rev < fv.rev) return false;
    return true;
}

deconcept.util = {
    getRequestParameter: function(param) {
        var q = document.location.search || document.location.hash;
        if (q) {
            var pairs = q.substring(1).split("&");
            for (var i = 0; i < pairs.length; i++) {
                if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
                    return pairs[i].substring((pairs[i].indexOf("=") + 1));
                }
            }
        }
        return "";
    }
}

deconcept.SWFObjectUtil.cleanupSWFs = function() {
    var objects = document.getElementsByTagName("OBJECT");
    for (var i = 0; i < objects.length; i++) {
        objects[i].style.display = 'none';
        for (var x in objects[i]) {
            if (typeof objects[i][x] == 'function') {
                objects[i][x] = function() { };
            }
        }
    }
}

if (deconcept.SWFObject.doPrepUnload) {
    deconcept.SWFObjectUtil.prepUnload = function() {
        __flash_unloadHandler = function() { };
        __flash_savedUnloadHandler = function() { };
        window.attachEvent("onunload", deconcept.SWFObjectUtil.cleanupSWFs);
    }
    window.attachEvent("onbeforeunload", deconcept.SWFObjectUtil.prepUnload);
}

if (Array.prototype.push == null) {
    Array.prototype.push = function(item) {
        this[this.length] = item;
        return this.length;
    }
}


var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject;
var SWFObject = deconcept.SWFObject;

Persist = (function() {
    var VERSION = '0.1.0', P, B, esc, init, empty, ec;
    ec = (function() {
        var EPOCH = 'Thu, 01-Jan-1970 00:00:01 GMT', RATIO = 1000 * 60 * 60 * 24, KEYS = ['expires', 'path', 'domain'], esc = escape, un = unescape, doc = document, me;

        var get_now = function() {
            var r = new Date();
            r.setTime(r.getTime());
            return r;
        }

        var cookify = function(c_key, c_val) {
            var i, key, val, r = [], opt = (arguments.length > 2) ? arguments[2] : {};
            r.push(esc(c_key) + '=' + esc(c_val));
            for (i = 0; i < KEYS.length; i++) {
                key = KEYS[i]; if (val = opt[key])
                    r.push(key + '=' + val);
            }
            if (opt.secure)
                r.push('secure'); return r.join('; ');
        }

        var alive = function() {
            var k = '__EC_TEST__', v = new Date();
            v = v.toGMTString();
            this.set(k, v);
            this.enabled = (this.remove(k) == v);
            return this.enabled;
        }

        me = {
            set: function(key, val) {
                var opt = (arguments.length > 2) ? arguments[2] : {}, now = get_now(), expire_at, cfg = {};
                if (opt.expires) {
                    opt.expires *= RATIO;
                    cfg.expires = new Date(now.getTime() + opt.expires);
                    cfg.expires = cfg.expires.toGMTString();
                }
                var keys = ['path', 'domain', 'secure'];
                for (i = 0; i < keys.length; i++)
                    if (opt[keys[i]])
                    cfg[keys[i]] = opt[keys[i]];
                var r = cookify(key, val, cfg);
                doc.cookie = r;
                return val;
            },

            has: function(key) {
                key = esc(key);
                var c = doc.cookie, ofs = c.indexOf(key + '='), len = ofs + key.length + 1, sub = c.substring(0, key.length);
                return ((!ofs && key != sub) || ofs < 0) ? false : true;
            },

            get: function(key) {
                key = esc(key);
                var c = doc.cookie, ofs = c.indexOf(key + '='), len = ofs + key.length + 1, sub = c.substring(0, key.length), end;
                if ((!ofs && key != sub) || ofs < 0)
                    return null; end = c.indexOf(';', len);
                if (end < 0)
                    end = c.length; return un(c.substring(len, end));
            },

            remove: function(k) {
                var r = me.get(k), opt = { expires: EPOCH }; doc.cookie = cookify(k, '', opt); return r;
            },

            keys: function() {
                var c = doc.cookie, ps = c.split('; '), i, p, r = []; for (i = 0; i < ps.length; i++) { p = ps[i].split('='); r.push(un(p[0])); }
                return r;
            },

            all: function() {
                var c = doc.cookie, ps = c.split('; '), i, p, r = [];
                for (i = 0; i < ps.length; i++) {
                    p = ps[i].split('=');
                    r.push([un(p[0]), un(p[1])]);
                }
                return r;
            },
            version: '0.2.1', enabled: false
        };
        me.enabled = alive.call(me);
        return me;
    } ());

    empty = function() { };

    esc = function(str) {
        return 'PS' + str.replace(/_/g, '__').replace(/ /g, '_s');
    };



    C = {
        /* 
        * Backend search order.
        * 
        * Note that the search order is significant; the backends are
        * listed in order of capacity, and many browsers
        * support multiple backends, so changing the search order could
        * result in a browser choosing a less capable backend.
        * 
        */
        search_order: [
              //'gears',
              'localstorage',
              'whatwg_db',
              'globalstorage',
              'flash',
              'ie',
              'cookie'
         ],

        // valid name regular expression
        name_re: /^[a-z][a-z0-9_ -]+$/i,

        // list of backend methods
        methods: [
            'init',
            'get',
            'set',
            'remove',
            'load',
            'save'
        ],

        // sql for db backends (gears and db)
        sql: {
            version: '1',

            create: "CREATE TABLE IF NOT EXISTS persist_data (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)",
            get: "SELECT v FROM persist_data WHERE k = ?",
            set: "INSERT INTO persist_data(k, v) VALUES (?, ?)",
            remove: "DELETE FROM persist_data WHERE k = ?"
        },

        // default flash configuration

        flash: {
            // ID of wrapper element
            div_id: '_persist_flash_wrap',

            // id of flash object/embed
            id: '_persist_flash',

            // default path to flash object
            path: 'persist.swf',
            size: { w: 1, h: 1 },

            // arguments passed to flash object
            args: {
                autostart: true
            }
        }

    };


    B = {
        // gears db backend (webkit, Safari 3.1+)       
        gears: {
            // no known limit
            size: -1,

            test: function() {
                // test for gears
                return (window.google && window.google.gears) ? true : false;
            },

            methods: {
                transaction: function(fn) {
                    var db = this.db;

                    // begin transaction
                    db.execute('BEGIN').close();

                    // call callback fn
                    fn.call(this, db);

                    // commit changes
                    db.execute('COMMIT').close();
                },

                init: function() {
                    var db;

                    // create database handle (TODO: add schema version?)
                    db = this.db = google.gears.factory.create('beta.database');

                    // open database
                    // from gears ref:
                    //
                    // Currently the name, if supplied and of length greater than
                    // zero, must consist only of visible ASCII characters
                    // excluding the following characters:
                    //
                    //   / \ : * ? " < > | ; ,
                    db.open(esc(this.name));

                    // create table
                    db.execute(C.sql.create).close();
                },

                get: function(key, fn, scope) {
                    var r, sql = C.sql.get;

                    // if callback isn't defined, then return
                    if (!fn)
                        return;

                    // begin transaction
                    this.transaction(function(t) {
                        // exec query
                        r = t.execute(sql, [key]);

                        // call callback
                        if (r.isValidRow())
                            fn.call(scope || this, true, r.field(0));
                        else
                            fn.call(scope || this, false, null);

                        // close result set
                        r.close();
                    });
                },


                set: function(key, val, fn, scope) {
                    var rm_sql = C.sql.remove,
                    sql = C.sql.set, r;

                    // begin set transaction
                    this.transaction(function(t) {
                        // exec remove query
                        t.execute(rm_sql, [key]).close();

                        // exec set query
                        t.execute(sql, [key, val]).close();

                        // run callback
                        if (fn)
                            fn.call(scope || this, true, val);
                    });
                },

                // begin remove transaction
                remove: function(key, fn, scope) {
                    var get_sql = C.sql.get;
                    sql = C.sql.remove,
                    r, val;

                    this.transaction(function(t) {
                        // if a callback was defined, then get the old
                        // value before removing it
                        if (fn) {
                            // exec get query
                            r = t.execute(get_sql, [key]);

                            if (r.isValidRow()) {
                                // key exists, get value 
                                val = r.field(0);

                                // exec remove query
                                t.execute(sql, [key]).close();

                                // exec callback
                                fn.call(scope || this, true, val);
                            } else {
                                // key does not exist, exec callback
                                fn.call(scope || this, false, null);
                            }

                            // close result set
                            r.close();
                        } else {
                            // no callback was defined, so just remove the
                            // data without checking the old value

                            // exec remove query
                            t.execute(sql, [key]).close();
                        }
                    });
                }
            }
        },

        // whatwg db backend (webkit, Safari 3.1+)
        // (src: whatwg and http://webkit.org/misc/DatabaseExample.html)
        whatwg_db: {
            size: 200 * 1024,

            test: function() {
                var name = 'PersistJS Test',
                desc = 'Persistent database test.';

                // test for openDatabase
                if (!window.openDatabase)
                    return false;

                // make sure openDatabase works
                // XXX: will this leak a db handle and/or waste space?
                if (!window.openDatabase(name, C.sql.version, desc, B.whatwg_db.size))
                    return false;

                return true;
            },


            methods: {
                transaction: function(fn) {
                    if (!this.db_created) {
                        var sql = C.sql.create;

                        this.db.transaction(function(t) {
                            // create table
                            t.executeSql(sql, [], function() {
                                this.db_created = true;
                            });
                        }, empty); // trap exception
                    }

                    this.db.transaction(fn);
                },

                init: function() {
                    var desc, size;

                    // init description and size
                    desc = this.o.about || "Persistent storage for " + this.name;
                    size = this.o.size || B.whatwg_db.size;

                    // create database handle
                    this.db = openDatabase(this.name, C.sql.version, desc, size);
                },

                get: function(key, fn, scope) {
                    var sql = C.sql.get;

                    // if callback isn't defined, then return
                    if (!fn)
                        return;

                    // get callback scope
                    scope = scope || this;

                    // begin transaction
                    this.transaction(function(t) {
                        t.executeSql(sql, [key], function(t, r) {
                            if (r.rows.length > 0)
                                fn.call(scope, true, r.rows.item(0)['v']);
                            else
                                fn.call(scope, false, null);
                        });
                    });
                },

                set: function(key, val, fn, scope) {
                    var rm_sql = C.sql.remove,
                    sql = C.sql.set;

                    // begin set transaction
                    this.transaction(function(t) {
                        // exec remove query
                        t.executeSql(rm_sql, [key], function() {
                            // exec set query
                            t.executeSql(sql, [key, val], function(t, r) {
                                // run callback
                                if (fn)
                                    fn.call(scope || this, true, val);
                            });
                        });
                    });

                    return val;
                },

                // begin remove transaction
                remove: function(key, fn, scope) {
                    var get_sql = C.sql.get;
                    sql = C.sql.remove;

                    this.transaction(function(t) {
                        // if a callback was defined, then get the old
                        // value before removing it
                        if (fn) {
                            // exec get query
                            t.executeSql(get_sql, [key], function(t, r) {
                                if (r.rows.length > 0) {
                                    // key exists, get value 
                                    var val = r.rows.item(0)['v'];

                                    // exec remove query
                                    t.executeSql(sql, [key], function(t, r) {
                                        // exec callback
                                        fn.call(scope || this, true, val);
                                    });
                                } else {
                                    // key does not exist, exec callback
                                    fn.call(scope || this, false, null);
                                }
                            });
                        } else {
                            // no callback was defined, so just remove the
                            // data without checking the old value

                            // exec remove query
                            t.executeSql(sql, [key]);
                        }
                    });
                }
            }
        },


        // globalstorage backend (globalStorage, FF2+, IE8+)
        // (src: http://developer.mozilla.org/en/docs/DOM:Storage#globalStorage)
        //
        // TODO: test to see if IE8 uses object literal semantics or
        // getItem/setItem/removeItem semantics
        globalstorage: {
            // (5 meg limit, src: http://ejohn.org/blog/dom-storage-answers/)
            size: 5 * 1024 * 1024,

            test: function() {
                return window.globalStorage ? true : false;
            },

            methods: {
                key: function(key) {
                    return esc(this.name) + esc(key);
                },

                init: function() {
                    this.store = globalStorage[this.o.domain];
                },

                get: function(key, fn, scope) {
                    // expand key
                    key = this.key(key);

                    if (fn)
                        fn.call(scope || this, true, this.store.getItem(key));
                },


                set: function(key, val, fn, scope) {
                    // expand key
                    key = this.key(key);

                    // set value
                    this.store.setItem(key, val);

                    if (fn)
                        fn.call(scope || this, true, val);
                },

                remove: function(key, fn, scope) {
                    var val;

                    // expand key
                    key = this.key(key);

                    // get value
                    val = this.store[key];

                    // delete value
                    this.store.removeItem(key);

                    if (fn)
                        fn.call(scope || this, (val !== null), val);
                }
            }
        },

        // localstorage backend (globalStorage, FF2+, IE8+)
        // (src: http://www.whatwg.org/specs/web-apps/current-work/#the-localstorage)
        localstorage: {
            // (unknown?)
            size: -1,

            test: function() {
                return window.localStorage ? true : false;
            },

            methods: {
                key: function(key) {
                    return esc(this.name) + esc(key);
                },

                init: function() {
                    this.store = localStorage;
                },

                get: function(key, fn, scope) {
                    // expand key
                    key = this.key(key);

                    if (fn)
                        fn.call(scope || this, true, this.store.getItem(key));
                },

                set: function(key, val, fn, scope) {
                    // expand key
                    key = this.key(key);

                    // set value
                    this.store.setItem(key, val);

                    if (fn)
                        fn.call(scope || this, true, val);
                },

                remove: function(key, fn, scope) {
                    var val;

                    // expand key
                    key = this.key(key);

                    // get value
                    val = this.getItem(key);

                    // delete value
                    this.store.removeItem(key);

                    if (fn)
                        fn.call(scope || this, (val !== null), val);
                }
            }
        },

        // IE backend
        ie: {
            prefix: '_persist_data-',
            // style:    'display:none; behavior:url(#default#userdata);',

            // 64k limit
            size: 64 * 1024,

            test: function() {
                // make sure we're dealing with IE
                // (src: http://javariet.dk/shared/browser_dom.htm)
                return window.ActiveXObject ? true : false;
            },

            make_userdata: function(id) {
                var el = document.createElement('div');

                // set element properties
                el.id = id;
                el.style.display = 'none';
                el.addBehavior('#default#userData');

                // append element to body
                document.body.appendChild(el);

                // return element
                return el;
            },

            methods: {
                init: function() {
                    var id = B.ie.prefix + esc(this.name);

                    // save element
                    this.el = B.ie.make_userdata(id);

                    // load data
                    if (this.o.defer)
                        this.load();
                },

                get: function(key, fn, scope) {
                    var val;

                    // expand key
                    key = esc(key);

                    // load data
                    if (!this.o.defer)
                        this.load();

                    // get value
                    val = this.el.getAttribute(key);

                    // call fn
                    if (fn)
                        fn.call(scope || this, val ? true : false, val);
                },

                set: function(key, val, fn, scope) {
                    // expand key
                    key = esc(key);

                    // set attribute
                    this.el.setAttribute(key, val);

                    // save data
                    if (!this.o.defer)
                        this.save();

                    // call fn
                    if (fn)
                        fn.call(scope || this, true, val);
                },

                load: function() {
                    this.el.load(esc(this.name));
                },

                save: function() {
                    this.el.save(esc(this.name));
                }
            }
        },

        // cookie backend
        // uses easycookie: http://pablotron.org/software/easy_cookie/
        cookie: {
            delim: ':',

            // 4k limit (low-ball this limit to handle browser weirdness, and 
            // so we don't hose session cookies)
            size: 4000,

            test: function() {
                // XXX: use easycookie to test if cookies are enabled
                return P.Cookie.enabled ? true : false;
            },

            methods: {
                key: function(key) {
                    return this.name + B.cookie.delim + key;
                },

                get: function(key, val, fn, scope) {
                    // expand key 
                    key = this.key(key);

                    // get value
                    val = ec.get(key);

                    // call fn
                    if (fn)
                        fn.call(scope || this, val != null, val);
                },

                set: function(key, val, fn, scope) {
                    // expand key 
                    key = this.key(key);

                    // save value
                    ec.set(key, val, this.o);

                    // call fn
                    if (fn)
                        fn.call(scope || this, true, val);
                },

                remove: function(key, val, fn, scope) {
                    var val;

                    // expand key 
                    key = this.key(key);

                    // remove cookie
                    val = ec.remove(key)

                    // call fn
                    if (fn)
                        fn.call(scope || this, val != null, val);
                }
            }
        },


        // flash backend (requires flash 8 or newer)
        // http://kb.adobe.com/selfservice/viewContent.do?externalId=tn_16194&sliceId=1
        // http://livedocs.adobe.com/flash/8/main/wwhelp/wwhimpl/common/html/wwhelp.htm?context=LiveDocs_Parts&file=00002200.html
        flash: {
            test: function() {
                // TODO: better flash detection
                if (!window.SWFObject || !deconcept || !deconcept.SWFObjectUtil)
                    return false;

                // get the major version
                var major = deconcept.SWFObjectUtil.getPlayerVersion().major;

                // check flash version (require 8.0 or newer)
                return (major >= 8) ? true : false;
            },

            methods: {
                init: function() {
                    if (!B.flash.el) {
                        var o, key, el, cfg = C.flash;

                        // create wrapper element
                        el = document.createElement('div');
                        el.id = cfg.div_id;

                        // FIXME: hide flash element
                        // el.style.display = 'none';
                        // append element to body
                        document.body.appendChild(el);

                        // create new swf object
                        o = new SWFObject(this.o.swf_path || cfg.path, cfg.id, cfg.size.w, cfg.size.h, '8');

                        // set parameters
                        for (key in cfg.args)
                            o.addVariable(key, cfg.args[key]);

                        // write flash object
                        o.write(el);

                        // save flash element
                        B.flash.el = document.getElementById(cfg.id);
                    }

                    // use singleton flash element
                    this.el = B.flash.el;
                },

                get: function(key, fn, scope) {
                    var val;

                    // escape key
                    key = esc(key);

                    // get value
                    val = this.el.get(this.name, key);

                    // call handler
                    if (fn)
                        fn.call(scope || this, val !== null, val);
                },

                set: function(key, val, fn, scope) {
                    var old_val;

                    // escape key
                    key = esc(key);

                    // set value
                    old_val = this.el.set(this.name, key, val);

                    // call handler
                    if (fn)
                        fn.call(scope || this, true, val);
                },

                remove: function(key, fn, scope) {
                    var val;

                    // get key
                    key = esc(key);

                    // remove old value
                    val = this.el.remove(this.name, key);

                    // call handler
                    if (fn)
                        fn.call(scope || this, true, val);
                }
            }
        }
    };


    // init function
    var init = function() {
        var i, l, b, key, fns = C.methods, keys = C.search_order;

        // set all functions to the empty function
        for (i = 0, l = fns.length; i < l; i++)
            P.Store.prototype[fns[i]] = empty;

        // clear type and size
        P.type = null;
        P.size = -1;

        // loop over all backends and test for each one
        for (i = 0, l = keys.length; !P.type && i < l; i++) {
            b = B[keys[i]];

            // test for backend
            if (b.test()) {
                // found backend, save type and size
                P.type = keys[i];
                P.size = b.size;

                // extend store prototype with backend methods
                for (key in b.methods)
                    P.Store.prototype[key] = b.methods[key];
            }
        }

        // mark library as initialized
        P._init = true;
    };

    // create top-level namespace
    P = {
        // version of persist library
        VERSION: VERSION,

        // backend type and size limit
        type: null,
        size: 0,

        // expose init function
        // init: init,

        add: function(o) {
            // add to backend hash
            B[o.id] = o;

            // add backend to front of search order
            C.search_order = [o.id].concat(C.search_order);

            // re-initialize library
            init();
        },

        remove: function(id) {
            var ofs = C.search_order.indexOf(id);
            if (ofs < 0)
                return;

            // remove from search order
            C.search_order.splice(ofs, 1);

            // delete from lut
            delete B[id];

            // re-initialize library
            init();
        },

        // expose easycookie API
        Cookie: ec,

        // store API
        Store: function(name, o) {
            // verify name
            if (!C.name_re.exec(name))
                throw new Error("Invalid name");

            // XXX: should we lazy-load type?
            // if (!P._init)
            //   init();

            if (!P.type)
                throw new Error("No suitable storage found");

            o = o || {};
            this.name = name;

            // get domain (XXX: does this localdomain fix work?)
            o.domain = o.domain || location.hostname || 'localhost.localdomain';

            this.o = o;

            // expires in 2 years
            o.expires = o.expires || 365 * 2;

            // set path to root
            o.path = o.path || '/';

            // call init function
            this.init();
        }
    };

    // init persist
    init();

    // return top-level namespace
    return P;
})();
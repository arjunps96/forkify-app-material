// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3a45674f9158390511956c9ccd982354":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50628;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "f0dbd6b41149222093d29d0dfbbeb29d";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"46990ab0a946c7e19cfaa46d89046edb":[function(require,module,exports) {
!function () {
  var e = {};

  var t = function (t) {
    var n = e[t];
    if (null == n) throw new Error("Could not resolve bundle with id " + t);
    return n;
  };

  (function (t) {
    for (var n = Object.keys(t), r = 0; r < n.length; r++) e[n[r]] = t[n[r]];
  })(JSON.parse('{"a10455d1fbf72c27":"controller.fd3f414b.js","2c14bf8f7e61d609":"icons.c781f215.svg"}'));

  var n,
      r = null;

  var o,
      i = function () {
    return r || (r = function () {
      try {
        throw new Error();
      } catch (t) {
        var e = ("" + t.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (e) return ("" + e[0]).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, "$1") + "/";
      }

      return "/";
    }()), r;
  },
      a = t;

  function c(e) {
    if ("" === e) return ".";
    var t = "/" === e[e.length - 1] ? e.slice(0, e.length - 1) : e,
        n = t.lastIndexOf("/");
    return -1 === n ? "." : t.slice(0, n);
  }

  function u(e, t) {
    if (e === t) return "";
    var n = e.split("/");
    "." === n[0] && n.shift();
    var r,
        o,
        i = t.split("/");

    for ("." === i[0] && i.shift(), r = 0; (r < i.length || r < n.length) && null == o; r++) n[r] !== i[r] && (o = r);

    var a = [];

    for (r = 0; r < n.length - o; r++) a.push("..");

    return i.length > o && a.push.apply(a, i.slice(o)), a.join("/");
  }

  (o = function (e, t) {
    return u(c(a(e)), a(t));
  })._dirname = c, o._relative = u, n = i() + o("a10455d1fbf72c27", "2c14bf8f7e61d609");

  function s(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
          u = c.value;
    } catch (e) {
      return void n(e);
    }

    c.done ? t(u) : Promise.resolve(u).then(r, o);
  }

  function l(e) {
    return function () {
      var t = this,
          n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);

        function a(e) {
          s(i, r, o, a, c, "next", e);
        }

        function c(e) {
          s(i, r, o, a, c, "throw", e);
        }

        a(void 0);
      });
    };
  }

  var f = function (e) {
    return new Promise(function (t, n) {
      setTimeout(function () {
        n(new Error("Request took too long! Timeout after ".concat(e, " second")));
      }, 1e3 * e);
    });
  },
      p = function () {
    var e = l(regeneratorRuntime.mark(function e(t) {
      var n, r;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, e.next = 3, Promise.race([fetch(t), f(10)]);

          case 3:
            return n = e.sent, e.next = 6, n.json();

          case 6:
            if (r = e.sent, n.ok) {
              e.next = 9;
              break;
            }

            throw new error("Something went wrong");

          case 9:
            return e.abrupt("return", r);

          case 12:
            throw e.prev = 12, e.t0 = e.catch(0), e.t0;

          case 15:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 12]]);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }(),
      d = function () {
    var e = l(regeneratorRuntime.mark(function e(t, n) {
      var r, o, i;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, r = fetch(t, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(n)
            }), e.next = 4, Promise.race([r, f(10)]);

          case 4:
            return o = e.sent, e.next = 7, o.json();

          case 7:
            if (i = e.sent, o.ok) {
              e.next = 10;
              break;
            }

            throw new Error("".concat(i.message));

          case 10:
            return e.abrupt("return", i);

          case 13:
            throw e.prev = 13, e.t0 = e.catch(0), console.log(e.t0.message), e.t0;

          case 17:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 13]]);
    }));
    return function (t, n) {
      return e.apply(this, arguments);
    };
  }();

  function h(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c.return || c.return();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return v(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return v(e, t);
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function v(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  function y(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
          u = c.value;
    } catch (e) {
      return void n(e);
    }

    c.done ? t(u) : Promise.resolve(u).then(r, o);
  }

  function b(e) {
    return function () {
      var t = this,
          n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);

        function a(e) {
          y(i, r, o, a, c, "next", e);
        }

        function c(e) {
          y(i, r, o, a, c, "throw", e);
        }

        a(void 0);
      });
    };
  }

  function m(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function g(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var _,
      w = {
    receipe: {},
    search: {
      query: "",
      page: 1,
      resultsPerPage: 10,
      results: []
    },
    bookmark: []
  },
      k = function (e) {
    var t = e.data.recipe;
    return function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? m(Object(n), !0).forEach(function (t) {
          g(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }({
      id: t.id,
      publisher: t.publisher,
      time: t.cooking_time,
      serving: t.servings,
      sourceURL: t.source_url,
      ingredients: t.ingredients,
      img: t.image_url,
      title: t.title
    }, t.key && {
      key: t.key
    });
  },
      O = function () {
    var e = b(regeneratorRuntime.mark(function e(t) {
      var n, r;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, n = "".concat("https://forkify-api.herokuapp.com/api/v2/recipes/").concat(t, "?key=").concat("bd127bf6-1cab-4391-81fb-c71127e18cb4"), e.next = 4, p(n);

          case 4:
            r = e.sent, w.receipe = k(r), w.bookmark.some(function (e) {
              return e.id === t;
            }) && (w.receipe.bookmarked = !0), e.next = 12;
            break;

          case 9:
            throw e.prev = 9, e.t0 = e.catch(0), e.t0;

          case 12:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 9]]);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }(),
      S = function () {
    var e = b(regeneratorRuntime.mark(function e(t) {
      var n;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, e.next = 3, p("".concat("https://forkify-api.herokuapp.com/api/v2/recipes/", "?search=").concat(t, "&key=").concat("bd127bf6-1cab-4391-81fb-c71127e18cb4"));

          case 3:
            n = e.sent, w.search.results = n.data.recipes.map(function (e) {
              return {
                id: e.id,
                publisher: e.publisher,
                img: e.image_url,
                title: e.title
              };
            }), w.search.page = 1, e.next = 11;
            break;

          case 8:
            throw e.prev = 8, e.t0 = e.catch(0), e.t0;

          case 11:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 8]]);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }(),
      j = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : w.search.page;
    w.search.page = e;
    var t = (e - 1) * w.search.resultsPerPage,
        n = e * w.search.resultsPerPage;
    return w.search.results.slice(t, n);
  },
      P = function () {
    localStorage.setItem("bookmarks", JSON.stringify(w.bookmark));
  },
      E = function (e) {
    w.bookmark.push(e), e.id === w.receipe.id && (w.receipe.bookmarked = !0), P();
  };

  (_ = localStorage.getItem("bookmarks")) && (w.bookmark = JSON.parse(_));

  var R,
      x,
      M = function () {
    var e = b(regeneratorRuntime.mark(function e(t) {
      var n, r, o;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, n = Object.entries(t).filter(function (e) {
              return e[0].startsWith("ingredient") && "" !== e[1];
            }).map(function (e) {
              var t = e[1].split(",").map(function (e) {
                return e.trim();
              });
              if (3 !== t.length) throw new Error("Invalid receipe format!Please use the correct format");
              var n = h(t, 3),
                  r = n[0];
              return {
                quantity: r ? +r : null,
                unit: n[1],
                description: n[2]
              };
            }), r = {
              title: t.title,
              source_url: t.sourceUrl,
              image_url: t.image,
              publisher: t.publisher,
              cooking_time: +t.cookingTime,
              servings: +t.servings,
              ingredients: n
            }, e.next = 5, d("".concat("https://forkify-api.herokuapp.com/api/v2/recipes/", "?key=").concat("bd127bf6-1cab-4391-81fb-c71127e18cb4"), r);

          case 5:
            o = e.sent, w.receipe = k(o), E(w.receipe), e.next = 13;
            break;

          case 10:
            throw e.prev = 10, e.t0 = e.catch(0), e.t0;

          case 13:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 10]]);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }();

  Fraction = function (e, t) {
    if (void 0 !== e && t) "number" == typeof e && "number" == typeof t ? (this.numerator = e, this.denominator = t) : "string" == typeof e && "string" == typeof t && (this.numerator = parseInt(e), this.denominator = parseInt(t));else if (void 0 === t) if (num = e, "number" == typeof num) this.numerator = num, this.denominator = 1;else if ("string" == typeof num) {
      var n,
          r,
          o = num.split(" ");
      if (o[0] && (n = o[0]), o[1] && (r = o[1]), n % 1 == 0 && r && r.match("/")) return new Fraction(n).add(new Fraction(r));
      if (!n || r) return;

      if ("string" == typeof n && n.match("/")) {
        var i = n.split("/");
        this.numerator = i[0], this.denominator = i[1];
      } else {
        if ("string" == typeof n && n.match(".")) return new Fraction(parseFloat(n));
        this.numerator = parseInt(n), this.denominator = 1;
      }
    }
    this.normalize();
  }, Fraction.prototype.clone = function () {
    return new Fraction(this.numerator, this.denominator);
  }, Fraction.prototype.toString = function () {
    if ("NaN" === this.denominator) return "NaN";
    var e = this.numerator / this.denominator > 0 ? Math.floor(this.numerator / this.denominator) : Math.ceil(this.numerator / this.denominator),
        t = this.numerator % this.denominator,
        n = this.denominator,
        r = [];
    return 0 != e && r.push(e), 0 != t && r.push((0 === e ? t : Math.abs(t)) + "/" + n), r.length > 0 ? r.join(" ") : 0;
  }, Fraction.prototype.rescale = function (e) {
    return this.numerator *= e, this.denominator *= e, this;
  }, Fraction.prototype.add = function (e) {
    var t = this.clone();
    return e = e instanceof Fraction ? e.clone() : new Fraction(e), td = t.denominator, t.rescale(e.denominator), e.rescale(td), t.numerator += e.numerator, t.normalize();
  }, Fraction.prototype.subtract = function (e) {
    var t = this.clone();
    return e = e instanceof Fraction ? e.clone() : new Fraction(e), td = t.denominator, t.rescale(e.denominator), e.rescale(td), t.numerator -= e.numerator, t.normalize();
  }, Fraction.prototype.multiply = function (e) {
    var t = this.clone();
    if (e instanceof Fraction) t.numerator *= e.numerator, t.denominator *= e.denominator;else {
      if ("number" != typeof e) return t.multiply(new Fraction(e));
      t.numerator *= e;
    }
    return t.normalize();
  }, Fraction.prototype.divide = function (e) {
    var t = this.clone();
    if (e instanceof Fraction) t.numerator *= e.denominator, t.denominator *= e.numerator;else {
      if ("number" != typeof e) return t.divide(new Fraction(e));
      t.denominator *= e;
    }
    return t.normalize();
  }, Fraction.prototype.equals = function (e) {
    e instanceof Fraction || (e = new Fraction(e));
    var t = this.clone().normalize();
    e = e.clone().normalize();
    return t.numerator === e.numerator && t.denominator === e.denominator;
  }, Fraction.prototype.normalize = (R = function (e) {
    return "number" == typeof e && (e > 0 && e % 1 > 0 && e % 1 < 1 || e < 0 && e % -1 < 0 && e % -1 > -1);
  }, x = function (e, t) {
    if (t) {
      var n = Math.pow(10, t);
      return Math.round(e * n) / n;
    }

    return Math.round(e);
  }, function () {
    if (R(this.denominator)) {
      var e = x(this.denominator, 9),
          t = Math.pow(10, e.toString().split(".")[1].length);
      this.denominator = Math.round(this.denominator * t), this.numerator *= t;
    }

    R(this.numerator) && (e = x(this.numerator, 9), t = Math.pow(10, e.toString().split(".")[1].length), this.numerator = Math.round(this.numerator * t), this.denominator *= t);
    var n = Fraction.gcf(this.numerator, this.denominator);
    return this.numerator /= n, this.denominator /= n, (this.numerator < 0 && this.denominator < 0 || this.numerator > 0 && this.denominator < 0) && (this.numerator *= -1, this.denominator *= -1), this;
  }), Fraction.gcf = function (e, t) {
    var n = [],
        r = Fraction.primeFactors(e),
        o = Fraction.primeFactors(t);
    return r.forEach(function (e) {
      var t = o.indexOf(e);
      t >= 0 && (n.push(e), o.splice(t, 1));
    }), 0 === n.length ? 1 : function () {
      var e,
          t = n[0];

      for (e = 1; e < n.length; e++) t *= n[e];

      return t;
    }();
  }, Fraction.primeFactors = function (e) {
    for (var t = Math.abs(e), n = [], r = 2; r * r <= t;) t % r == 0 ? (n.push(r), t /= r) : r++;

    return 1 != t && n.push(t), n;
  };
  var F = Fraction;

  function A(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function T(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var H,
      q = (H = n) && H.__esModule ? H.default : H,
      L = function () {
    function e() {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), T(this, "_data", void 0), T(this, "_message", "Your Recipe has been added successfully"), T(this, "showSpinner", function () {
        var e = '<div class="spinner">\n    <svg>\n      <use href="'.concat(q, '#icon-loader"></use>\n    </svg>\n  </div>');
        this._parentEl.innerHTML = "", this._parentEl.insertAdjacentHTML("afterbegin", e);
      });
    }

    var t, n, r;
    return t = e, (n = [{
      key: "render",
      value: function (e) {
        if (this._data = e, !e || Array.isArray(e) && 0 === e.length) return this.renderErorrMessage();

        var t = this._generateMarkup();

        this._clear(), this._parentEl.insertAdjacentHTML("afterbegin", t);
      }
    }, {
      key: "update",
      value: function (e) {
        this._data = e;

        var t = this._generateMarkup(),
            n = document.createRange().createContextualFragment(t),
            r = Array.from(n.querySelectorAll("*")),
            o = Array.from(this._parentEl.querySelectorAll("*"));

        r.forEach(function (e, t) {
          var n,
              r = o[t];
          e.isEqualNode(r) || "" === (null === (n = e.firstChild) || void 0 === n ? void 0 : n.nodeValue.trim()) || (r.textContent = e.textContent), e.isEqualNode(r) || Array.from(e.attributes).forEach(function (e) {
            r.setAttribute(e.name, e.value);
          });
        });
      }
    }, {
      key: "renderErorrMessage",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._errorMessage,
            t = '\n    <div class="error">\n            <div>\n              <svg>\n                <use href="'.concat(q, '#icon-alert-triangle"></use>\n              </svg>\n            </div>\n            <p>').concat(e, "</p>\n    </div>\n    ");
        this._clear(), this._parentEl.insertAdjacentHTML("afterbegin", t);
      }
    }, {
      key: "renderMessage",
      value: function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._message,
            t = '\n      <div class="message">\n        <div>\n          <svg>\n            <use href="'.concat(q, '#icon-smile"></use>\n          </svg>\n        </div>\n        <p>').concat(e, "</p>\n      </div>\n    ");
        this._clear(), this._parentEl.insertAdjacentHTML("afterbegin", t);
      }
    }, {
      key: "_clear",
      value: function () {
        this._parentEl.innerHTML = "";
      }
    }]) && A(t.prototype, n), r && A(t, r), e;
  }();

  function D(e) {
    return (D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function C(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function I(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function W(e, t) {
    return (W = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function N(e) {
    var t = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }();

    return function () {
      var n,
          r = B(e);

      if (t) {
        var o = B(this).constructor;
        n = Reflect.construct(r, arguments, o);
      } else n = r.apply(this, arguments);

      return U(this, n);
    };
  }

  function U(e, t) {
    return !t || "object" !== D(t) && "function" != typeof t ? z(e) : t;
  }

  function z(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function B(e) {
    return (B = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function J(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var $ = new (function (e) {
    !function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && W(e, t);
    }(i, e);
    var t,
        n,
        r,
        o = N(i);

    function i() {
      var e;
      C(this, i);

      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];

      return J(z(e = o.call.apply(o, [this].concat(n))), "_parentEl", document.querySelector(".recipe")), J(z(e), "_errorMessage", "We couldnt find any items"), e;
    }

    return t = i, (n = [{
      key: "addHandlerReceipe",
      value: function (e) {
        ["hashchange", "load"].forEach(function (t) {
          return window.addEventListener(t, e);
        });
      }
    }, {
      key: "_generateMarkup",
      value: function () {
        return '<figure class="recipe__fig">\n      <img src="'.concat(this._data.img, '" alt="').concat(this._data.img, '" class="recipe__img" />\n      <h1 class="recipe__title">\n        <span>').concat(this._data.title, '</span>\n      </h1>\n    </figure>\n  \n    <div class="recipe__details">\n      <div class="recipe__info">\n        <svg class="recipe__info-icon">\n          <use href="').concat(q, '#icon-clock"></use>\n        </svg>\n        <span class="recipe__info-data recipe__info-data--minutes">').concat(this._data.time, '</span>\n        <span class="recipe__info-text">minutes</span>\n      </div>\n      <div class="recipe__info">\n        <svg class="recipe__info-icon">\n          <use href="').concat(q, '#icon-users"></use>\n        </svg>\n        <span class="recipe__info-data recipe__info-data--people">').concat(this._data.serving, '</span>\n        <span class="recipe__info-text">servings</span>\n  \n        <div class="recipe__info-buttons">\n          <button class="btn--tiny btn--increase-servings" data-update="').concat(this._data.serving - 1, '">\n            <svg>\n              <use href="').concat(q, '#icon-minus-circle"></use>\n            </svg>\n          </button>\n          <button class="btn--tiny btn--increase-servings" data-update="').concat(this._data.serving + 1, '">\n            <svg>\n              <use href="').concat(q, '#icon-plus-circle"></use>\n            </svg>\n          </button>\n        </div>\n      </div>\n  \n      <div class="recipe__user-generated ').concat(this._data.key ? "" : "hidden", '">\n        <svg>\n          <use href="').concat(q, '#icon-user"></use>\n        </svg>\n      </div>\n      <button class="btn--round btn--bookmark">\n        <svg class="">\n          <use href=\'').concat(q, "#icon-bookmark").concat(this._data.bookmarked ? "-fill" : "", '\'></use>\n        </svg>\n      </button>\n    </div>\n  \n    <div class="recipe__ingredients">\n      <h2 class="heading--2">Recipe ingredients</h2>\n      <ul class="recipe__ingredient-list">\n        ').concat(this._data.ingredients.map(function (e) {
          return '\n          <li class="recipe__ingredient">\n          <svg class="recipe__icon">\n            <use href="'.concat(q, '#icon-check"></use>\n          </svg>\n          <div class="recipe__quantity">').concat(e.quantity ? new F(e.quantity).toString() : "", '</div>\n          <div class="recipe__description">\n            <span class="recipe__unit">').concat(e.unit, "</span>\n            ").concat(e.description, "\n          </div>\n        </li>\n          ");
        }).join(""), '\n        \n  \n        <li class="recipe__ingredient">\n          <svg class="recipe__icon">\n            <use href="').concat(q, '#icon-check"></use>\n          </svg>\n          \n        </li>\n      </ul>\n    </div>\n  \n    <div class="recipe__directions">\n      <h2 class="heading--2">How to cook it</h2>\n      <p class="recipe__directions-text">\n        This recipe was carefully designed and tested by\n        <span class="recipe__publisher">').concat(this._data.publisher, '</span>. Please check out\n        directions at their website.\n      </p>\n      <a\n        class="btn--small recipe__btn"\n        href="').concat(this._data.sourceURL, '"\n        target="_blank"\n      >\n        <span>Directions</span>\n        <svg class="search__icon">\n          <use href="').concat(q, '#icon-arrow-right"></use>\n        </svg>\n      </a>\n    </div> ');
      }
    }, {
      key: "addHandlerUpdateServings",
      value: function (e) {
        this._parentEl.addEventListener("click", function (t) {
          var n = t.target.closest(".btn--increase-servings");

          if (n) {
            var r = +n.dataset.update;
            r > 0 && e(r);
          }
        });
      }
    }, {
      key: "addHandlerBookmark",
      value: function (e) {
        this._parentEl.addEventListener("click", function (t) {
          t.target.closest(".btn--bookmark") && e();
        });
      }
    }]) && I(t.prototype, n), r && I(t, r), i;
  }(L))();

  function Q(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function V(e, t) {
    var n = t.get(e);
    if (!n) throw new TypeError("attempted to get private field on non-instance");
    return n.get ? n.get.call(e) : n.value;
  }

  var Y = new WeakMap(),
      G = new WeakSet(),
      K = function () {
    function e() {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), G.add(this), Y.set(this, {
        writable: !0,
        value: document.querySelector(".search")
      });
    }

    var t, n, r;
    return t = e, (n = [{
      key: "getQuery",
      value: function () {
        var e = V(this, Y).querySelector(".search__field").value;
        return function (e, t, n) {
          if (!t.has(e)) throw new TypeError("attempted to get private field on non-instance");
          return n;
        }(this, G, X).call(this), e;
      }
    }, {
      key: "addHandlerSearch",
      value: function (e) {
        V(this, Y).addEventListener("submit", function (t) {
          t.preventDefault(), e();
        });
      }
    }]) && Q(t.prototype, n), r && Q(t, r), e;
  }(),
      X = function () {
    V(this, Y).querySelector(".search__field").value = "";
  },
      Z = new K();

  function ee(e) {
    return (ee = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function te(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function ne(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function re(e, t) {
    return (re = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function oe(e) {
    var t = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }();

    return function () {
      var n,
          r = ce(e);

      if (t) {
        var o = ce(this).constructor;
        n = Reflect.construct(r, arguments, o);
      } else n = r.apply(this, arguments);

      return ie(this, n);
    };
  }

  function ie(e, t) {
    return !t || "object" !== ee(t) && "function" != typeof t ? ae(e) : t;
  }

  function ae(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function ce(e) {
    return (ce = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function ue(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var se = new (function (e) {
    !function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && re(e, t);
    }(i, e);
    var t,
        n,
        r,
        o = oe(i);

    function i() {
      var e;
      te(this, i);

      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];

      return ue(ae(e = o.call.apply(o, [this].concat(n))), "_parentEl", document.querySelector(".results")), ue(ae(e), "_errorMessage", "Sorry!No receipes found for your search"), e;
    }

    return t = i, (n = [{
      key: "_generateMarkup",
      value: function () {
        var e = this;
        return this._data.map(function (t) {
          return e._generateMarkupPreview(t);
        });
      }
    }, {
      key: "_generateMarkupPreview",
      value: function (e) {
        var t = document.location.hash.slice(1);
        return console.log(t), '<li class="preview">\n      <a class="preview__link" '.concat(e.id === t ? "preview__link--active" : "", " href='#").concat(e.id, '\'>\n        <figure class="preview__fig">\n          <img src="').concat(e.img, '" alt="Test" />\n        </figure>\n        <div class="preview__data">\n          <h4 class="preview__title">').concat(e.title, '</h4>\n          <p class="preview__publisher">').concat(e.publisher, '</p>\n          <div class="preview__user-generated ').concat(this._data.key ? "" : "hidden", '">\n            <svg>\n              <use href="').concat(q, '#icon-user"></use>\n            </svg>\n          </div>\n        </div>\n      </a>\n    </li>');
      }
    }]) && ne(t.prototype, n), r && ne(t, r), i;
  }(L))();

  function le(e) {
    return (le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function fe(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function pe(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function de(e, t) {
    return (de = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function he(e) {
    var t = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }();

    return function () {
      var n,
          r = be(e);

      if (t) {
        var o = be(this).constructor;
        n = Reflect.construct(r, arguments, o);
      } else n = r.apply(this, arguments);

      return ve(this, n);
    };
  }

  function ve(e, t) {
    return !t || "object" !== le(t) && "function" != typeof t ? ye(e) : t;
  }

  function ye(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function be(e) {
    return (be = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function me(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var ge = new (function (e) {
    !function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && de(e, t);
    }(i, e);
    var t,
        n,
        r,
        o = he(i);

    function i() {
      var e;
      fe(this, i);

      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];

      return me(ye(e = o.call.apply(o, [this].concat(n))), "_parentEl", document.querySelector(".pagination")), e;
    }

    return t = i, (n = [{
      key: "_generateMarkup",
      value: function () {
        var e = this._data.page,
            t = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        return 1 === e && t > 1 ? "<button data-goto=".concat(e + 1, ' class="btn--inline pagination__btn--next">\n    <span>Page ').concat(e + 1, '</span>\n    <svg class="search__icon">\n      <use href="').concat(q, '#icon-arrow-right"></use>\n    </svg>\n  </button>') : e === t && t > 1 ? "<button data-goto=".concat(e - 1, ' class="btn--inline pagination__btn--prev">\n    <svg class="search__icon">\n      <use href="').concat(q, '#icon-arrow-left"></use>\n    </svg>\n    <span>Page ').concat(e - 1, "</span>\n  </button>") : e < t ? "\n    <button data-goto=".concat(e + 1, ' class="btn--inline pagination__btn--next">\n      <span>Page ').concat(e + 1, '</span>\n      <svg class="search__icon">\n        <use href="').concat(q, '#icon-arrow-right"></use>\n      </svg>\n    </button>\n      \n  <button data-goto=').concat(e - 1, ' class="btn--inline pagination__btn--prev">\n    <svg class="search__icon">\n      <use href="').concat(q, '#icon-arrow-left"></use>\n    </svg>\n    <span>Page ').concat(e - 1, "</span>\n  </button>") : "";
      }
    }, {
      key: "addHandlerClick",
      value: function (e) {
        this._parentEl.addEventListener("click", function (t) {
          var n = t.target.closest(".btn--inline");

          if (n) {
            var r = +n.dataset.goto;
            e(r);
          }
        });
      }
    }]) && pe(t.prototype, n), r && pe(t, r), i;
  }(L))();

  function _e(e) {
    return (_e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function we(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  function ke(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function Oe(e, t) {
    return (Oe = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function Se(e) {
    var t = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }();

    return function () {
      var n,
          r = Ee(e);

      if (t) {
        var o = Ee(this).constructor;
        n = Reflect.construct(r, arguments, o);
      } else n = r.apply(this, arguments);

      return je(this, n);
    };
  }

  function je(e, t) {
    return !t || "object" !== _e(t) && "function" != typeof t ? Pe(e) : t;
  }

  function Pe(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function Ee(e) {
    return (Ee = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function Re(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var xe = new (function (e) {
    !function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && Oe(e, t);
    }(i, e);
    var t,
        n,
        r,
        o = Se(i);

    function i() {
      var e;
      we(this, i);

      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];

      return Re(Pe(e = o.call.apply(o, [this].concat(n))), "_parentEl", document.querySelector(".bookmarks__list")), Re(Pe(e), "_errorMessage", "No bookmarks yet. Find a nice recipe and bookmark it"), e;
    }

    return t = i, (n = [{
      key: "_generateMarkup",
      value: function () {
        var e = this;
        return this._data.map(function (t) {
          return e._generateMarkupPreview(t);
        });
      }
    }, {
      key: "_generateMarkupPreview",
      value: function (e) {
        var t = document.location.hash.slice(1);
        return '<li class="preview">\n      <a class="preview__link" '.concat(e.id === t ? "preview__link--active" : "", " href='#").concat(e.id, '\'>\n        <figure class="preview__fig">\n          <img src="').concat(e.img, '" alt="Test" />\n        </figure>\n        <div class="preview__data">\n          <h4 class="preview__title">').concat(e.title, '</h4>\n          <p class="preview__publisher">').concat(e.publisher, '</p>\n          <div class="preview__user-generated">\n            <svg>\n              <use href="').concat(q, '#icon-user"></use>\n            </svg>\n          </div>\n        </div>\n      </a>\n    </li>');
      }
    }, {
      key: "addhandlerBookmark",
      value: function (e) {
        window.addEventListener("load", e);
      }
    }]) && ke(t.prototype, n), r && ke(t, r), i;
  }(L))();

  function Me(e) {
    return (Me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }

  function Fe(e) {
    return function (e) {
      if (Array.isArray(e)) return Ae(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
    }(e) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return Ae(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ae(e, t);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function Ae(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];

    return r;
  }

  function Te(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  function He(e, t) {
    return (He = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }

  function qe(e) {
    var t = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }();

    return function () {
      var n,
          r = Ce(e);

      if (t) {
        var o = Ce(this).constructor;
        n = Reflect.construct(r, arguments, o);
      } else n = r.apply(this, arguments);

      return Le(this, n);
    };
  }

  function Le(e, t) {
    return !t || "object" !== Me(t) && "function" != typeof t ? De(e) : t;
  }

  function De(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  function Ce(e) {
    return (Ce = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }

  function Ie(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  var We = new (function (e) {
    !function (e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          writable: !0,
          configurable: !0
        }
      }), t && He(e, t);
    }(i, e);
    var t,
        n,
        r,
        o = qe(i);

    function i() {
      var e;
      return function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, i), Ie(De(e = o.call(this)), "_parentEl", document.querySelector(".upload")), Ie(De(e), "_overlay", document.querySelector(".overlay")), Ie(De(e), "_window", document.querySelector(".add-recipe-window")), Ie(De(e), "_btnclose", document.querySelector(".btn--close-modal")), Ie(De(e), "_addReceipe", document.querySelector(".nav__btn--add-recipe")), e._addHandlerHideWindow(), e._addHandlerShowWindow(), e;
    }

    return t = i, (n = [{
      key: "toggleWindow",
      value: function () {
        this._overlay.classList.toggle("hidden"), this._window.classList.toggle("hidden");
      }
    }, {
      key: "_addHandlerShowWindow",
      value: function () {
        this._addReceipe.addEventListener("click", this.toggleWindow.bind(this));
      }
    }, {
      key: "_addHandlerHideWindow",
      value: function () {
        this._btnclose.addEventListener("click", this.toggleWindow.bind(this)), this._overlay.addEventListener("click", this.toggleWindow.bind(this));
      }
    }, {
      key: "_addHandlerUpload",
      value: function (e) {
        this._parentEl.addEventListener("submit", function (t) {
          t.preventDefault();
          var n = Fe(new FormData(this)),
              r = Object.fromEntries(n);
          e(r);
        });
      }
    }]) && Te(t.prototype, n), r && Te(t, r), i;
  }(L))();

  function Ne(e, t, n, r, o, i, a) {
    try {
      var c = e[i](a),
          u = c.value;
    } catch (e) {
      return void n(e);
    }

    c.done ? t(u) : Promise.resolve(u).then(r, o);
  }

  function Ue(e) {
    return function () {
      var t = this,
          n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);

        function a(e) {
          Ne(i, r, o, a, c, "next", e);
        }

        function c(e) {
          Ne(i, r, o, a, c, "throw", e);
        }

        a(void 0);
      });
    };
  }

  document.querySelector(".recipe");

  var ze = function () {
    var e = Ue(regeneratorRuntime.mark(function e() {
      var t;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (e.prev = 0, t = window.location.hash.slice(1)) {
              e.next = 4;
              break;
            }

            return e.abrupt("return");

          case 4:
            return e.next = 6, O(t);

          case 6:
            $.showSpinner(), se.update(j()), $.render(w.receipe), xe.update(w.bookmark), e.next = 15;
            break;

          case 12:
            e.prev = 12, e.t0 = e.catch(0), $.renderErorrMessage(e.t0.status);

          case 15:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 12]]);
    }));
    return function () {
      return e.apply(this, arguments);
    };
  }(),
      Be = function () {
    var e = Ue(regeneratorRuntime.mark(function e() {
      var t;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return t = Z.getQuery(), e.next = 3, S(t);

          case 3:
            se.showSpinner(), se.render(j()), ge.render(w.search);

          case 6:
          case "end":
            return e.stop();
        }
      }, e);
    }));
    return function () {
      return e.apply(this, arguments);
    };
  }(),
      Je = function (e) {
    console.log(e), se.render(j(e)), ge.render(w.search);
  },
      $e = function (e) {
    !function (e) {
      w.receipe.ingredients.forEach(function (t) {
        t.quantity = t.quantity * e / w.receipe.serving;
      }), w.receipe.serving = e;
    }(e), $.update(w.receipe);
  },
      Qe = function () {
    var e, t;
    w.receipe.bookmarked ? (e = w.receipe.id, t = w.bookmark.findIndex(function (e) {
      e.id;
    }), w.bookmark.splice(t, 1), e === w.receipe.id && (w.receipe.bookmarked = !1), P()) : E(w.receipe), $.update(w.receipe), xe.render(w.bookmark);
  },
      Ve = function () {
    xe.render(w.bookmark);
  },
      Ye = function () {
    var e = Ue(regeneratorRuntime.mark(function e(t) {
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, We.showSpinner(), e.next = 4, M(t);

          case 4:
            $.render(w.receipe), We.renderMessage(), setTimeout(function () {
              We.toggleWindow();
            }, 2500), xe.render(w.bookmark), console.log(w.receipe), window.history.pushState(null, "", "#".concat(w.receipe.id)), e.next = 15;
            break;

          case 12:
            e.prev = 12, e.t0 = e.catch(0), We.renderErorrMessage(e.t0.message);

          case 15:
          case "end":
            return e.stop();
        }
      }, e, null, [[0, 12]]);
    }));
    return function (t) {
      return e.apply(this, arguments);
    };
  }();

  xe.addhandlerBookmark(Ve), $.addHandlerReceipe(ze), $.addHandlerUpdateServings($e), $.addHandlerBookmark(Qe), Z.addHandlerSearch(Be), ge.addHandlerClick(Je), We._addHandlerUpload(Ye);
}();
},{}]},{},["3a45674f9158390511956c9ccd982354","46990ab0a946c7e19cfaa46d89046edb"], null)

//# sourceMappingURL=controller.fd3f414b.f0dbd6b4.js.map

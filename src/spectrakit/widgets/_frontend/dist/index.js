var Ry = { exports: {} }, Eh = {}, Ty = { exports: {} }, Dt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var w1;
function kM() {
  if (w1) return Dt;
  w1 = 1;
  var u = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), m = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), R = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), L = Symbol.iterator;
  function F(z) {
    return z === null || typeof z != "object" ? null : (z = L && z[L] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var V = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, me = Object.assign, ge = {};
  function Se(z, X, He) {
    this.props = z, this.context = X, this.refs = ge, this.updater = He || V;
  }
  Se.prototype.isReactComponent = {}, Se.prototype.setState = function(z, X) {
    if (typeof z != "object" && typeof z != "function" && z != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, z, X, "setState");
  }, Se.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function se() {
  }
  se.prototype = Se.prototype;
  function Pe(z, X, He) {
    this.props = z, this.context = X, this.refs = ge, this.updater = He || V;
  }
  var pe = Pe.prototype = new se();
  pe.constructor = Pe, me(pe, Se.prototype), pe.isPureReactComponent = !0;
  var De = Array.isArray, xe = Object.prototype.hasOwnProperty, Me = { current: null }, Ue = { key: !0, ref: !0, __self: !0, __source: !0 };
  function kt(z, X, He) {
    var Re, Ke = {}, Je = null, Ge = null;
    if (X != null) for (Re in X.ref !== void 0 && (Ge = X.ref), X.key !== void 0 && (Je = "" + X.key), X) xe.call(X, Re) && !Ue.hasOwnProperty(Re) && (Ke[Re] = X[Re]);
    var et = arguments.length - 2;
    if (et === 1) Ke.children = He;
    else if (1 < et) {
      for (var pt = Array(et), Qt = 0; Qt < et; Qt++) pt[Qt] = arguments[Qt + 2];
      Ke.children = pt;
    }
    if (z && z.defaultProps) for (Re in et = z.defaultProps, et) Ke[Re] === void 0 && (Ke[Re] = et[Re]);
    return { $$typeof: u, type: z, key: Je, ref: Ge, props: Ke, _owner: Me.current };
  }
  function Et(z, X) {
    return { $$typeof: u, type: z.type, key: X, ref: z.ref, props: z.props, _owner: z._owner };
  }
  function Mt(z) {
    return typeof z == "object" && z !== null && z.$$typeof === u;
  }
  function Tt(z) {
    var X = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(He) {
      return X[He];
    });
  }
  var _e = /\/+/g;
  function je(z, X) {
    return typeof z == "object" && z !== null && z.key != null ? Tt("" + z.key) : X.toString(36);
  }
  function P(z, X, He, Re, Ke) {
    var Je = typeof z;
    (Je === "undefined" || Je === "boolean") && (z = null);
    var Ge = !1;
    if (z === null) Ge = !0;
    else switch (Je) {
      case "string":
      case "number":
        Ge = !0;
        break;
      case "object":
        switch (z.$$typeof) {
          case u:
          case c:
            Ge = !0;
        }
    }
    if (Ge) return Ge = z, Ke = Ke(Ge), z = Re === "" ? "." + je(Ge, 0) : Re, De(Ke) ? (He = "", z != null && (He = z.replace(_e, "$&/") + "/"), P(Ke, X, He, "", function(Qt) {
      return Qt;
    })) : Ke != null && (Mt(Ke) && (Ke = Et(Ke, He + (!Ke.key || Ge && Ge.key === Ke.key ? "" : ("" + Ke.key).replace(_e, "$&/") + "/") + z)), X.push(Ke)), 1;
    if (Ge = 0, Re = Re === "" ? "." : Re + ":", De(z)) for (var et = 0; et < z.length; et++) {
      Je = z[et];
      var pt = Re + je(Je, et);
      Ge += P(Je, X, He, pt, Ke);
    }
    else if (pt = F(z), typeof pt == "function") for (z = pt.call(z), et = 0; !(Je = z.next()).done; ) Je = Je.value, pt = Re + je(Je, et++), Ge += P(Je, X, He, pt, Ke);
    else if (Je === "object") throw X = String(z), Error("Objects are not valid as a React child (found: " + (X === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : X) + "). If you meant to render a collection of children, use an array instead.");
    return Ge;
  }
  function de(z, X, He) {
    if (z == null) return z;
    var Re = [], Ke = 0;
    return P(z, Re, "", "", function(Je) {
      return X.call(He, Je, Ke++);
    }), Re;
  }
  function J(z) {
    if (z._status === -1) {
      var X = z._result;
      X = X(), X.then(function(He) {
        (z._status === 0 || z._status === -1) && (z._status = 1, z._result = He);
      }, function(He) {
        (z._status === 0 || z._status === -1) && (z._status = 2, z._result = He);
      }), z._status === -1 && (z._status = 0, z._result = X);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var re = { current: null }, K = { transition: null }, ue = { ReactCurrentDispatcher: re, ReactCurrentBatchConfig: K, ReactCurrentOwner: Me };
  function ne() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Dt.Children = { map: de, forEach: function(z, X, He) {
    de(z, function() {
      X.apply(this, arguments);
    }, He);
  }, count: function(z) {
    var X = 0;
    return de(z, function() {
      X++;
    }), X;
  }, toArray: function(z) {
    return de(z, function(X) {
      return X;
    }) || [];
  }, only: function(z) {
    if (!Mt(z)) throw Error("React.Children.only expected to receive a single React element child.");
    return z;
  } }, Dt.Component = Se, Dt.Fragment = d, Dt.Profiler = S, Dt.PureComponent = Pe, Dt.StrictMode = y, Dt.Suspense = k, Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ue, Dt.act = ne, Dt.cloneElement = function(z, X, He) {
    if (z == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + z + ".");
    var Re = me({}, z.props), Ke = z.key, Je = z.ref, Ge = z._owner;
    if (X != null) {
      if (X.ref !== void 0 && (Je = X.ref, Ge = Me.current), X.key !== void 0 && (Ke = "" + X.key), z.type && z.type.defaultProps) var et = z.type.defaultProps;
      for (pt in X) xe.call(X, pt) && !Ue.hasOwnProperty(pt) && (Re[pt] = X[pt] === void 0 && et !== void 0 ? et[pt] : X[pt]);
    }
    var pt = arguments.length - 2;
    if (pt === 1) Re.children = He;
    else if (1 < pt) {
      et = Array(pt);
      for (var Qt = 0; Qt < pt; Qt++) et[Qt] = arguments[Qt + 2];
      Re.children = et;
    }
    return { $$typeof: u, type: z.type, key: Ke, ref: Je, props: Re, _owner: Ge };
  }, Dt.createContext = function(z) {
    return z = { $$typeof: m, _currentValue: z, _currentValue2: z, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, z.Provider = { $$typeof: w, _context: z }, z.Consumer = z;
  }, Dt.createElement = kt, Dt.createFactory = function(z) {
    var X = kt.bind(null, z);
    return X.type = z, X;
  }, Dt.createRef = function() {
    return { current: null };
  }, Dt.forwardRef = function(z) {
    return { $$typeof: b, render: z };
  }, Dt.isValidElement = Mt, Dt.lazy = function(z) {
    return { $$typeof: O, _payload: { _status: -1, _result: z }, _init: J };
  }, Dt.memo = function(z, X) {
    return { $$typeof: R, type: z, compare: X === void 0 ? null : X };
  }, Dt.startTransition = function(z) {
    var X = K.transition;
    K.transition = {};
    try {
      z();
    } finally {
      K.transition = X;
    }
  }, Dt.unstable_act = ne, Dt.useCallback = function(z, X) {
    return re.current.useCallback(z, X);
  }, Dt.useContext = function(z) {
    return re.current.useContext(z);
  }, Dt.useDebugValue = function() {
  }, Dt.useDeferredValue = function(z) {
    return re.current.useDeferredValue(z);
  }, Dt.useEffect = function(z, X) {
    return re.current.useEffect(z, X);
  }, Dt.useId = function() {
    return re.current.useId();
  }, Dt.useImperativeHandle = function(z, X, He) {
    return re.current.useImperativeHandle(z, X, He);
  }, Dt.useInsertionEffect = function(z, X) {
    return re.current.useInsertionEffect(z, X);
  }, Dt.useLayoutEffect = function(z, X) {
    return re.current.useLayoutEffect(z, X);
  }, Dt.useMemo = function(z, X) {
    return re.current.useMemo(z, X);
  }, Dt.useReducer = function(z, X, He) {
    return re.current.useReducer(z, X, He);
  }, Dt.useRef = function(z) {
    return re.current.useRef(z);
  }, Dt.useState = function(z) {
    return re.current.useState(z);
  }, Dt.useSyncExternalStore = function(z, X, He) {
    return re.current.useSyncExternalStore(z, X, He);
  }, Dt.useTransition = function() {
    return re.current.useTransition();
  }, Dt.version = "18.3.1", Dt;
}
var _h = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
_h.exports;
var _1;
function DM() {
  return _1 || (_1 = 1, (function(u, c) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var d = "18.3.1", y = Symbol.for("react.element"), S = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), R = Symbol.for("react.context"), O = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), me = Symbol.for("react.lazy"), ge = Symbol.for("react.offscreen"), Se = Symbol.iterator, se = "@@iterator";
      function Pe(x) {
        if (x === null || typeof x != "object")
          return null;
        var M = Se && x[Se] || x[se];
        return typeof M == "function" ? M : null;
      }
      var pe = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, De = {
        transition: null
      }, xe = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Me = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ue = {}, kt = null;
      function Et(x) {
        kt = x;
      }
      Ue.setExtraStackFrame = function(x) {
        kt = x;
      }, Ue.getCurrentStack = null, Ue.getStackAddendum = function() {
        var x = "";
        kt && (x += kt);
        var M = Ue.getCurrentStack;
        return M && (x += M() || ""), x;
      };
      var Mt = !1, Tt = !1, _e = !1, je = !1, P = !1, de = {
        ReactCurrentDispatcher: pe,
        ReactCurrentBatchConfig: De,
        ReactCurrentOwner: Me
      };
      de.ReactDebugCurrentFrame = Ue, de.ReactCurrentActQueue = xe;
      function J(x) {
        {
          for (var M = arguments.length, Q = new Array(M > 1 ? M - 1 : 0), Z = 1; Z < M; Z++)
            Q[Z - 1] = arguments[Z];
          K("warn", x, Q);
        }
      }
      function re(x) {
        {
          for (var M = arguments.length, Q = new Array(M > 1 ? M - 1 : 0), Z = 1; Z < M; Z++)
            Q[Z - 1] = arguments[Z];
          K("error", x, Q);
        }
      }
      function K(x, M, Q) {
        {
          var Z = de.ReactDebugCurrentFrame, ye = Z.getStackAddendum();
          ye !== "" && (M += "%s", Q = Q.concat([ye]));
          var tt = Q.map(function(we) {
            return String(we);
          });
          tt.unshift("Warning: " + M), Function.prototype.apply.call(console[x], console, tt);
        }
      }
      var ue = {};
      function ne(x, M) {
        {
          var Q = x.constructor, Z = Q && (Q.displayName || Q.name) || "ReactClass", ye = Z + "." + M;
          if (ue[ye])
            return;
          re("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", M, Z), ue[ye] = !0;
        }
      }
      var z = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(x) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(x, M, Q) {
          ne(x, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(x, M, Q, Z) {
          ne(x, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(x, M, Q, Z) {
          ne(x, "setState");
        }
      }, X = Object.assign, He = {};
      Object.freeze(He);
      function Re(x, M, Q) {
        this.props = x, this.context = M, this.refs = He, this.updater = Q || z;
      }
      Re.prototype.isReactComponent = {}, Re.prototype.setState = function(x, M) {
        if (typeof x != "object" && typeof x != "function" && x != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, x, M, "setState");
      }, Re.prototype.forceUpdate = function(x) {
        this.updater.enqueueForceUpdate(this, x, "forceUpdate");
      };
      {
        var Ke = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Je = function(x, M) {
          Object.defineProperty(Re.prototype, x, {
            get: function() {
              J("%s(...) is deprecated in plain JavaScript React classes. %s", M[0], M[1]);
            }
          });
        };
        for (var Ge in Ke)
          Ke.hasOwnProperty(Ge) && Je(Ge, Ke[Ge]);
      }
      function et() {
      }
      et.prototype = Re.prototype;
      function pt(x, M, Q) {
        this.props = x, this.context = M, this.refs = He, this.updater = Q || z;
      }
      var Qt = pt.prototype = new et();
      Qt.constructor = pt, X(Qt, Re.prototype), Qt.isPureReactComponent = !0;
      function On() {
        var x = {
          current: null
        };
        return Object.seal(x), x;
      }
      var Tr = Array.isArray;
      function Cn(x) {
        return Tr(x);
      }
      function rr(x) {
        {
          var M = typeof Symbol == "function" && Symbol.toStringTag, Q = M && x[Symbol.toStringTag] || x.constructor.name || "Object";
          return Q;
        }
      }
      function Bn(x) {
        try {
          return In(x), !1;
        } catch {
          return !0;
        }
      }
      function In(x) {
        return "" + x;
      }
      function Yr(x) {
        if (Bn(x))
          return re("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", rr(x)), In(x);
      }
      function pi(x, M, Q) {
        var Z = x.displayName;
        if (Z)
          return Z;
        var ye = M.displayName || M.name || "";
        return ye !== "" ? Q + "(" + ye + ")" : Q;
      }
      function sa(x) {
        return x.displayName || "Context";
      }
      function qn(x) {
        if (x == null)
          return null;
        if (typeof x.tag == "number" && re("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof x == "function")
          return x.displayName || x.name || null;
        if (typeof x == "string")
          return x;
        switch (x) {
          case w:
            return "Fragment";
          case S:
            return "Portal";
          case b:
            return "Profiler";
          case m:
            return "StrictMode";
          case L:
            return "Suspense";
          case F:
            return "SuspenseList";
        }
        if (typeof x == "object")
          switch (x.$$typeof) {
            case R:
              var M = x;
              return sa(M) + ".Consumer";
            case k:
              var Q = x;
              return sa(Q._context) + ".Provider";
            case O:
              return pi(x, x.render, "ForwardRef");
            case V:
              var Z = x.displayName || null;
              return Z !== null ? Z : qn(x.type) || "Memo";
            case me: {
              var ye = x, tt = ye._payload, we = ye._init;
              try {
                return qn(we(tt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var wn = Object.prototype.hasOwnProperty, $n = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Sr, Qa, Nn;
      Nn = {};
      function Er(x) {
        if (wn.call(x, "ref")) {
          var M = Object.getOwnPropertyDescriptor(x, "ref").get;
          if (M && M.isReactWarning)
            return !1;
        }
        return x.ref !== void 0;
      }
      function ca(x) {
        if (wn.call(x, "key")) {
          var M = Object.getOwnPropertyDescriptor(x, "key").get;
          if (M && M.isReactWarning)
            return !1;
        }
        return x.key !== void 0;
      }
      function Ga(x, M) {
        var Q = function() {
          Sr || (Sr = !0, re("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", M));
        };
        Q.isReactWarning = !0, Object.defineProperty(x, "key", {
          get: Q,
          configurable: !0
        });
      }
      function hi(x, M) {
        var Q = function() {
          Qa || (Qa = !0, re("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", M));
        };
        Q.isReactWarning = !0, Object.defineProperty(x, "ref", {
          get: Q,
          configurable: !0
        });
      }
      function Ee(x) {
        if (typeof x.ref == "string" && Me.current && x.__self && Me.current.stateNode !== x.__self) {
          var M = qn(Me.current.type);
          Nn[M] || (re('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', M, x.ref), Nn[M] = !0);
        }
      }
      var Ye = function(x, M, Q, Z, ye, tt, we) {
        var at = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: y,
          // Built-in properties that belong on the element
          type: x,
          key: M,
          ref: Q,
          props: we,
          // Record the component responsible for creating this element.
          _owner: tt
        };
        return at._store = {}, Object.defineProperty(at._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(at, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Z
        }), Object.defineProperty(at, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: ye
        }), Object.freeze && (Object.freeze(at.props), Object.freeze(at)), at;
      };
      function gt(x, M, Q) {
        var Z, ye = {}, tt = null, we = null, at = null, _t = null;
        if (M != null) {
          Er(M) && (we = M.ref, Ee(M)), ca(M) && (Yr(M.key), tt = "" + M.key), at = M.__self === void 0 ? null : M.__self, _t = M.__source === void 0 ? null : M.__source;
          for (Z in M)
            wn.call(M, Z) && !$n.hasOwnProperty(Z) && (ye[Z] = M[Z]);
        }
        var Ut = arguments.length - 2;
        if (Ut === 1)
          ye.children = Q;
        else if (Ut > 1) {
          for (var un = Array(Ut), Kt = 0; Kt < Ut; Kt++)
            un[Kt] = arguments[Kt + 2];
          Object.freeze && Object.freeze(un), ye.children = un;
        }
        if (x && x.defaultProps) {
          var St = x.defaultProps;
          for (Z in St)
            ye[Z] === void 0 && (ye[Z] = St[Z]);
        }
        if (tt || we) {
          var Zt = typeof x == "function" ? x.displayName || x.name || "Unknown" : x;
          tt && Ga(ye, Zt), we && hi(ye, Zt);
        }
        return Ye(x, tt, we, at, _t, Me.current, ye);
      }
      function $t(x, M) {
        var Q = Ye(x.type, M, x.ref, x._self, x._source, x._owner, x.props);
        return Q;
      }
      function rn(x, M, Q) {
        if (x == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + x + ".");
        var Z, ye = X({}, x.props), tt = x.key, we = x.ref, at = x._self, _t = x._source, Ut = x._owner;
        if (M != null) {
          Er(M) && (we = M.ref, Ut = Me.current), ca(M) && (Yr(M.key), tt = "" + M.key);
          var un;
          x.type && x.type.defaultProps && (un = x.type.defaultProps);
          for (Z in M)
            wn.call(M, Z) && !$n.hasOwnProperty(Z) && (M[Z] === void 0 && un !== void 0 ? ye[Z] = un[Z] : ye[Z] = M[Z]);
        }
        var Kt = arguments.length - 2;
        if (Kt === 1)
          ye.children = Q;
        else if (Kt > 1) {
          for (var St = Array(Kt), Zt = 0; Zt < Kt; Zt++)
            St[Zt] = arguments[Zt + 2];
          ye.children = St;
        }
        return Ye(x.type, tt, we, at, _t, Ut, ye);
      }
      function vn(x) {
        return typeof x == "object" && x !== null && x.$$typeof === y;
      }
      var sn = ".", Kn = ":";
      function an(x) {
        var M = /[=:]/g, Q = {
          "=": "=0",
          ":": "=2"
        }, Z = x.replace(M, function(ye) {
          return Q[ye];
        });
        return "$" + Z;
      }
      var Gt = !1, Xt = /\/+/g;
      function fa(x) {
        return x.replace(Xt, "$&/");
      }
      function xr(x, M) {
        return typeof x == "object" && x !== null && x.key != null ? (Yr(x.key), an("" + x.key)) : M.toString(36);
      }
      function _a(x, M, Q, Z, ye) {
        var tt = typeof x;
        (tt === "undefined" || tt === "boolean") && (x = null);
        var we = !1;
        if (x === null)
          we = !0;
        else
          switch (tt) {
            case "string":
            case "number":
              we = !0;
              break;
            case "object":
              switch (x.$$typeof) {
                case y:
                case S:
                  we = !0;
              }
          }
        if (we) {
          var at = x, _t = ye(at), Ut = Z === "" ? sn + xr(at, 0) : Z;
          if (Cn(_t)) {
            var un = "";
            Ut != null && (un = fa(Ut) + "/"), _a(_t, M, un, "", function(gd) {
              return gd;
            });
          } else _t != null && (vn(_t) && (_t.key && (!at || at.key !== _t.key) && Yr(_t.key), _t = $t(
            _t,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            Q + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (_t.key && (!at || at.key !== _t.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              fa("" + _t.key) + "/"
            ) : "") + Ut
          )), M.push(_t));
          return 1;
        }
        var Kt, St, Zt = 0, mn = Z === "" ? sn : Z + Kn;
        if (Cn(x))
          for (var kl = 0; kl < x.length; kl++)
            Kt = x[kl], St = mn + xr(Kt, kl), Zt += _a(Kt, M, Q, St, ye);
        else {
          var ls = Pe(x);
          if (typeof ls == "function") {
            var Yi = x;
            ls === Yi.entries && (Gt || J("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Gt = !0);
            for (var us = ls.call(Yi), mu, yd = 0; !(mu = us.next()).done; )
              Kt = mu.value, St = mn + xr(Kt, yd++), Zt += _a(Kt, M, Q, St, ye);
          } else if (tt === "object") {
            var _c = String(x);
            throw new Error("Objects are not valid as a React child (found: " + (_c === "[object Object]" ? "object with keys {" + Object.keys(x).join(", ") + "}" : _c) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Zt;
      }
      function Bi(x, M, Q) {
        if (x == null)
          return x;
        var Z = [], ye = 0;
        return _a(x, Z, "", "", function(tt) {
          return M.call(Q, tt, ye++);
        }), Z;
      }
      function uu(x) {
        var M = 0;
        return Bi(x, function() {
          M++;
        }), M;
      }
      function ou(x, M, Q) {
        Bi(x, function() {
          M.apply(this, arguments);
        }, Q);
      }
      function Sl(x) {
        return Bi(x, function(M) {
          return M;
        }) || [];
      }
      function El(x) {
        if (!vn(x))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return x;
      }
      function su(x) {
        var M = {
          $$typeof: R,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: x,
          _currentValue2: x,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        M.Provider = {
          $$typeof: k,
          _context: M
        };
        var Q = !1, Z = !1, ye = !1;
        {
          var tt = {
            $$typeof: R,
            _context: M
          };
          Object.defineProperties(tt, {
            Provider: {
              get: function() {
                return Z || (Z = !0, re("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), M.Provider;
              },
              set: function(we) {
                M.Provider = we;
              }
            },
            _currentValue: {
              get: function() {
                return M._currentValue;
              },
              set: function(we) {
                M._currentValue = we;
              }
            },
            _currentValue2: {
              get: function() {
                return M._currentValue2;
              },
              set: function(we) {
                M._currentValue2 = we;
              }
            },
            _threadCount: {
              get: function() {
                return M._threadCount;
              },
              set: function(we) {
                M._threadCount = we;
              }
            },
            Consumer: {
              get: function() {
                return Q || (Q = !0, re("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), M.Consumer;
              }
            },
            displayName: {
              get: function() {
                return M.displayName;
              },
              set: function(we) {
                ye || (J("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", we), ye = !0);
              }
            }
          }), M.Consumer = tt;
        }
        return M._currentRenderer = null, M._currentRenderer2 = null, M;
      }
      var br = -1, kr = 0, ar = 1, vi = 2;
      function Xa(x) {
        if (x._status === br) {
          var M = x._result, Q = M();
          if (Q.then(function(tt) {
            if (x._status === kr || x._status === br) {
              var we = x;
              we._status = ar, we._result = tt;
            }
          }, function(tt) {
            if (x._status === kr || x._status === br) {
              var we = x;
              we._status = vi, we._result = tt;
            }
          }), x._status === br) {
            var Z = x;
            Z._status = kr, Z._result = Q;
          }
        }
        if (x._status === ar) {
          var ye = x._result;
          return ye === void 0 && re(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ye), "default" in ye || re(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ye), ye.default;
        } else
          throw x._result;
      }
      function mi(x) {
        var M = {
          // We use these fields to store the result.
          _status: br,
          _result: x
        }, Q = {
          $$typeof: me,
          _payload: M,
          _init: Xa
        };
        {
          var Z, ye;
          Object.defineProperties(Q, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Z;
              },
              set: function(tt) {
                re("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Z = tt, Object.defineProperty(Q, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return ye;
              },
              set: function(tt) {
                re("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ye = tt, Object.defineProperty(Q, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return Q;
      }
      function yi(x) {
        x != null && x.$$typeof === V ? re("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof x != "function" ? re("forwardRef requires a render function but was given %s.", x === null ? "null" : typeof x) : x.length !== 0 && x.length !== 2 && re("forwardRef render functions accept exactly two parameters: props and ref. %s", x.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), x != null && (x.defaultProps != null || x.propTypes != null) && re("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var M = {
          $$typeof: O,
          render: x
        };
        {
          var Q;
          Object.defineProperty(M, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Q;
            },
            set: function(Z) {
              Q = Z, !x.name && !x.displayName && (x.displayName = Z);
            }
          });
        }
        return M;
      }
      var N;
      N = Symbol.for("react.module.reference");
      function ie(x) {
        return !!(typeof x == "string" || typeof x == "function" || x === w || x === b || P || x === m || x === L || x === F || je || x === ge || Mt || Tt || _e || typeof x == "object" && x !== null && (x.$$typeof === me || x.$$typeof === V || x.$$typeof === k || x.$$typeof === R || x.$$typeof === O || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        x.$$typeof === N || x.getModuleId !== void 0));
      }
      function Te(x, M) {
        ie(x) || re("memo: The first argument must be a component. Instead received: %s", x === null ? "null" : typeof x);
        var Q = {
          $$typeof: V,
          type: x,
          compare: M === void 0 ? null : M
        };
        {
          var Z;
          Object.defineProperty(Q, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Z;
            },
            set: function(ye) {
              Z = ye, !x.name && !x.displayName && (x.displayName = ye);
            }
          });
        }
        return Q;
      }
      function Fe() {
        var x = pe.current;
        return x === null && re(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), x;
      }
      function ht(x) {
        var M = Fe();
        if (x._context !== void 0) {
          var Q = x._context;
          Q.Consumer === x ? re("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : Q.Provider === x && re("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return M.useContext(x);
      }
      function ct(x) {
        var M = Fe();
        return M.useState(x);
      }
      function wt(x, M, Q) {
        var Z = Fe();
        return Z.useReducer(x, M, Q);
      }
      function xt(x) {
        var M = Fe();
        return M.useRef(x);
      }
      function _n(x, M) {
        var Q = Fe();
        return Q.useEffect(x, M);
      }
      function ln(x, M) {
        var Q = Fe();
        return Q.useInsertionEffect(x, M);
      }
      function cn(x, M) {
        var Q = Fe();
        return Q.useLayoutEffect(x, M);
      }
      function ir(x, M) {
        var Q = Fe();
        return Q.useCallback(x, M);
      }
      function qa(x, M) {
        var Q = Fe();
        return Q.useMemo(x, M);
      }
      function Ka(x, M, Q) {
        var Z = Fe();
        return Z.useImperativeHandle(x, M, Q);
      }
      function vt(x, M) {
        {
          var Q = Fe();
          return Q.useDebugValue(x, M);
        }
      }
      function yt() {
        var x = Fe();
        return x.useTransition();
      }
      function Za(x) {
        var M = Fe();
        return M.useDeferredValue(x);
      }
      function cu() {
        var x = Fe();
        return x.useId();
      }
      function fu(x, M, Q) {
        var Z = Fe();
        return Z.useSyncExternalStore(x, M, Q);
      }
      var xl = 0, ao, Cl, Wr, ns, Dr, Cc, wc;
      function io() {
      }
      io.__reactDisabledLog = !0;
      function wl() {
        {
          if (xl === 0) {
            ao = console.log, Cl = console.info, Wr = console.warn, ns = console.error, Dr = console.group, Cc = console.groupCollapsed, wc = console.groupEnd;
            var x = {
              configurable: !0,
              enumerable: !0,
              value: io,
              writable: !0
            };
            Object.defineProperties(console, {
              info: x,
              log: x,
              warn: x,
              error: x,
              group: x,
              groupCollapsed: x,
              groupEnd: x
            });
          }
          xl++;
        }
      }
      function da() {
        {
          if (xl--, xl === 0) {
            var x = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: X({}, x, {
                value: ao
              }),
              info: X({}, x, {
                value: Cl
              }),
              warn: X({}, x, {
                value: Wr
              }),
              error: X({}, x, {
                value: ns
              }),
              group: X({}, x, {
                value: Dr
              }),
              groupCollapsed: X({}, x, {
                value: Cc
              }),
              groupEnd: X({}, x, {
                value: wc
              })
            });
          }
          xl < 0 && re("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Ja = de.ReactCurrentDispatcher, ei;
      function lo(x, M, Q) {
        {
          if (ei === void 0)
            try {
              throw Error();
            } catch (ye) {
              var Z = ye.stack.trim().match(/\n( *(at )?)/);
              ei = Z && Z[1] || "";
            }
          return `
` + ei + x;
        }
      }
      var du = !1, _l;
      {
        var uo = typeof WeakMap == "function" ? WeakMap : Map;
        _l = new uo();
      }
      function oo(x, M) {
        if (!x || du)
          return "";
        {
          var Q = _l.get(x);
          if (Q !== void 0)
            return Q;
        }
        var Z;
        du = !0;
        var ye = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var tt;
        tt = Ja.current, Ja.current = null, wl();
        try {
          if (M) {
            var we = function() {
              throw Error();
            };
            if (Object.defineProperty(we.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(we, []);
              } catch (mn) {
                Z = mn;
              }
              Reflect.construct(x, [], we);
            } else {
              try {
                we.call();
              } catch (mn) {
                Z = mn;
              }
              x.call(we.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (mn) {
              Z = mn;
            }
            x();
          }
        } catch (mn) {
          if (mn && Z && typeof mn.stack == "string") {
            for (var at = mn.stack.split(`
`), _t = Z.stack.split(`
`), Ut = at.length - 1, un = _t.length - 1; Ut >= 1 && un >= 0 && at[Ut] !== _t[un]; )
              un--;
            for (; Ut >= 1 && un >= 0; Ut--, un--)
              if (at[Ut] !== _t[un]) {
                if (Ut !== 1 || un !== 1)
                  do
                    if (Ut--, un--, un < 0 || at[Ut] !== _t[un]) {
                      var Kt = `
` + at[Ut].replace(" at new ", " at ");
                      return x.displayName && Kt.includes("<anonymous>") && (Kt = Kt.replace("<anonymous>", x.displayName)), typeof x == "function" && _l.set(x, Kt), Kt;
                    }
                  while (Ut >= 1 && un >= 0);
                break;
              }
          }
        } finally {
          du = !1, Ja.current = tt, da(), Error.prepareStackTrace = ye;
        }
        var St = x ? x.displayName || x.name : "", Zt = St ? lo(St) : "";
        return typeof x == "function" && _l.set(x, Zt), Zt;
      }
      function Ii(x, M, Q) {
        return oo(x, !1);
      }
      function vd(x) {
        var M = x.prototype;
        return !!(M && M.isReactComponent);
      }
      function $i(x, M, Q) {
        if (x == null)
          return "";
        if (typeof x == "function")
          return oo(x, vd(x));
        if (typeof x == "string")
          return lo(x);
        switch (x) {
          case L:
            return lo("Suspense");
          case F:
            return lo("SuspenseList");
        }
        if (typeof x == "object")
          switch (x.$$typeof) {
            case O:
              return Ii(x.render);
            case V:
              return $i(x.type, M, Q);
            case me: {
              var Z = x, ye = Z._payload, tt = Z._init;
              try {
                return $i(tt(ye), M, Q);
              } catch {
              }
            }
          }
        return "";
      }
      var jt = {}, so = de.ReactDebugCurrentFrame;
      function At(x) {
        if (x) {
          var M = x._owner, Q = $i(x.type, x._source, M ? M.type : null);
          so.setExtraStackFrame(Q);
        } else
          so.setExtraStackFrame(null);
      }
      function rs(x, M, Q, Z, ye) {
        {
          var tt = Function.call.bind(wn);
          for (var we in x)
            if (tt(x, we)) {
              var at = void 0;
              try {
                if (typeof x[we] != "function") {
                  var _t = Error((Z || "React class") + ": " + Q + " type `" + we + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof x[we] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw _t.name = "Invariant Violation", _t;
                }
                at = x[we](M, we, Z, Q, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Ut) {
                at = Ut;
              }
              at && !(at instanceof Error) && (At(ye), re("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", Q, we, typeof at), At(null)), at instanceof Error && !(at.message in jt) && (jt[at.message] = !0, At(ye), re("Failed %s type: %s", Q, at.message), At(null));
            }
        }
      }
      function gi(x) {
        if (x) {
          var M = x._owner, Q = $i(x.type, x._source, M ? M.type : null);
          Et(Q);
        } else
          Et(null);
      }
      var st;
      st = !1;
      function co() {
        if (Me.current) {
          var x = qn(Me.current.type);
          if (x)
            return `

Check the render method of \`` + x + "`.";
        }
        return "";
      }
      function lr(x) {
        if (x !== void 0) {
          var M = x.fileName.replace(/^.*[\\\/]/, ""), Q = x.lineNumber;
          return `

Check your code at ` + M + ":" + Q + ".";
        }
        return "";
      }
      function Si(x) {
        return x != null ? lr(x.__source) : "";
      }
      var Mr = {};
      function Ei(x) {
        var M = co();
        if (!M) {
          var Q = typeof x == "string" ? x : x.displayName || x.name;
          Q && (M = `

Check the top-level render call using <` + Q + ">.");
        }
        return M;
      }
      function fn(x, M) {
        if (!(!x._store || x._store.validated || x.key != null)) {
          x._store.validated = !0;
          var Q = Ei(M);
          if (!Mr[Q]) {
            Mr[Q] = !0;
            var Z = "";
            x && x._owner && x._owner !== Me.current && (Z = " It was passed a child from " + qn(x._owner.type) + "."), gi(x), re('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Q, Z), gi(null);
          }
        }
      }
      function qt(x, M) {
        if (typeof x == "object") {
          if (Cn(x))
            for (var Q = 0; Q < x.length; Q++) {
              var Z = x[Q];
              vn(Z) && fn(Z, M);
            }
          else if (vn(x))
            x._store && (x._store.validated = !0);
          else if (x) {
            var ye = Pe(x);
            if (typeof ye == "function" && ye !== x.entries)
              for (var tt = ye.call(x), we; !(we = tt.next()).done; )
                vn(we.value) && fn(we.value, M);
          }
        }
      }
      function Rl(x) {
        {
          var M = x.type;
          if (M == null || typeof M == "string")
            return;
          var Q;
          if (typeof M == "function")
            Q = M.propTypes;
          else if (typeof M == "object" && (M.$$typeof === O || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          M.$$typeof === V))
            Q = M.propTypes;
          else
            return;
          if (Q) {
            var Z = qn(M);
            rs(Q, x.props, "prop", Z, x);
          } else if (M.PropTypes !== void 0 && !st) {
            st = !0;
            var ye = qn(M);
            re("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ye || "Unknown");
          }
          typeof M.getDefaultProps == "function" && !M.getDefaultProps.isReactClassApproved && re("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Yn(x) {
        {
          for (var M = Object.keys(x.props), Q = 0; Q < M.length; Q++) {
            var Z = M[Q];
            if (Z !== "children" && Z !== "key") {
              gi(x), re("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Z), gi(null);
              break;
            }
          }
          x.ref !== null && (gi(x), re("Invalid attribute `ref` supplied to `React.Fragment`."), gi(null));
        }
      }
      function Or(x, M, Q) {
        var Z = ie(x);
        if (!Z) {
          var ye = "";
          (x === void 0 || typeof x == "object" && x !== null && Object.keys(x).length === 0) && (ye += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var tt = Si(M);
          tt ? ye += tt : ye += co();
          var we;
          x === null ? we = "null" : Cn(x) ? we = "array" : x !== void 0 && x.$$typeof === y ? (we = "<" + (qn(x.type) || "Unknown") + " />", ye = " Did you accidentally export a JSX literal instead of a component?") : we = typeof x, re("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", we, ye);
        }
        var at = gt.apply(this, arguments);
        if (at == null)
          return at;
        if (Z)
          for (var _t = 2; _t < arguments.length; _t++)
            qt(arguments[_t], x);
        return x === w ? Yn(at) : Rl(at), at;
      }
      var Ra = !1;
      function pu(x) {
        var M = Or.bind(null, x);
        return M.type = x, Ra || (Ra = !0, J("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(M, "type", {
          enumerable: !1,
          get: function() {
            return J("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: x
            }), x;
          }
        }), M;
      }
      function as(x, M, Q) {
        for (var Z = rn.apply(this, arguments), ye = 2; ye < arguments.length; ye++)
          qt(arguments[ye], Z.type);
        return Rl(Z), Z;
      }
      function is(x, M) {
        var Q = De.transition;
        De.transition = {};
        var Z = De.transition;
        De.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          x();
        } finally {
          if (De.transition = Q, Q === null && Z._updatedFibers) {
            var ye = Z._updatedFibers.size;
            ye > 10 && J("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Z._updatedFibers.clear();
          }
        }
      }
      var Tl = !1, hu = null;
      function md(x) {
        if (hu === null)
          try {
            var M = ("require" + Math.random()).slice(0, 7), Q = u && u[M];
            hu = Q.call(u, "timers").setImmediate;
          } catch {
            hu = function(ye) {
              Tl === !1 && (Tl = !0, typeof MessageChannel > "u" && re("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var tt = new MessageChannel();
              tt.port1.onmessage = ye, tt.port2.postMessage(void 0);
            };
          }
        return hu(x);
      }
      var Ta = 0, ti = !1;
      function xi(x) {
        {
          var M = Ta;
          Ta++, xe.current === null && (xe.current = []);
          var Q = xe.isBatchingLegacy, Z;
          try {
            if (xe.isBatchingLegacy = !0, Z = x(), !Q && xe.didScheduleLegacyUpdate) {
              var ye = xe.current;
              ye !== null && (xe.didScheduleLegacyUpdate = !1, bl(ye));
            }
          } catch (St) {
            throw ba(M), St;
          } finally {
            xe.isBatchingLegacy = Q;
          }
          if (Z !== null && typeof Z == "object" && typeof Z.then == "function") {
            var tt = Z, we = !1, at = {
              then: function(St, Zt) {
                we = !0, tt.then(function(mn) {
                  ba(M), Ta === 0 ? fo(mn, St, Zt) : St(mn);
                }, function(mn) {
                  ba(M), Zt(mn);
                });
              }
            };
            return !ti && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              we || (ti = !0, re("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), at;
          } else {
            var _t = Z;
            if (ba(M), Ta === 0) {
              var Ut = xe.current;
              Ut !== null && (bl(Ut), xe.current = null);
              var un = {
                then: function(St, Zt) {
                  xe.current === null ? (xe.current = [], fo(_t, St, Zt)) : St(_t);
                }
              };
              return un;
            } else {
              var Kt = {
                then: function(St, Zt) {
                  St(_t);
                }
              };
              return Kt;
            }
          }
        }
      }
      function ba(x) {
        x !== Ta - 1 && re("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ta = x;
      }
      function fo(x, M, Q) {
        {
          var Z = xe.current;
          if (Z !== null)
            try {
              bl(Z), md(function() {
                Z.length === 0 ? (xe.current = null, M(x)) : fo(x, M, Q);
              });
            } catch (ye) {
              Q(ye);
            }
          else
            M(x);
        }
      }
      var po = !1;
      function bl(x) {
        if (!po) {
          po = !0;
          var M = 0;
          try {
            for (; M < x.length; M++) {
              var Q = x[M];
              do
                Q = Q(!0);
              while (Q !== null);
            }
            x.length = 0;
          } catch (Z) {
            throw x = x.slice(M + 1), Z;
          } finally {
            po = !1;
          }
        }
      }
      var vu = Or, ho = as, vo = pu, ni = {
        map: Bi,
        forEach: ou,
        count: uu,
        toArray: Sl,
        only: El
      };
      c.Children = ni, c.Component = Re, c.Fragment = w, c.Profiler = b, c.PureComponent = pt, c.StrictMode = m, c.Suspense = L, c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = de, c.act = xi, c.cloneElement = ho, c.createContext = su, c.createElement = vu, c.createFactory = vo, c.createRef = On, c.forwardRef = yi, c.isValidElement = vn, c.lazy = mi, c.memo = Te, c.startTransition = is, c.unstable_act = xi, c.useCallback = ir, c.useContext = ht, c.useDebugValue = vt, c.useDeferredValue = Za, c.useEffect = _n, c.useId = cu, c.useImperativeHandle = Ka, c.useInsertionEffect = ln, c.useLayoutEffect = cn, c.useMemo = qa, c.useReducer = wt, c.useRef = xt, c.useState = ct, c.useSyncExternalStore = fu, c.useTransition = yt, c.version = d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(_h, _h.exports)), _h.exports;
}
var R1;
function Oh() {
  return R1 || (R1 = 1, process.env.NODE_ENV === "production" ? Ty.exports = kM() : Ty.exports = DM()), Ty.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var T1;
function MM() {
  if (T1) return Eh;
  T1 = 1;
  var u = Oh(), c = Symbol.for("react.element"), d = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, S = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(b, k, R) {
    var O, L = {}, F = null, V = null;
    R !== void 0 && (F = "" + R), k.key !== void 0 && (F = "" + k.key), k.ref !== void 0 && (V = k.ref);
    for (O in k) y.call(k, O) && !w.hasOwnProperty(O) && (L[O] = k[O]);
    if (b && b.defaultProps) for (O in k = b.defaultProps, k) L[O] === void 0 && (L[O] = k[O]);
    return { $$typeof: c, type: b, key: F, ref: V, props: L, _owner: S.current };
  }
  return Eh.Fragment = d, Eh.jsx = m, Eh.jsxs = m, Eh;
}
var xh = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b1;
function OM() {
  return b1 || (b1 = 1, process.env.NODE_ENV !== "production" && (function() {
    var u = Oh(), c = Symbol.for("react.element"), d = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), b = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), O = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), V = Symbol.for("react.offscreen"), me = Symbol.iterator, ge = "@@iterator";
    function Se(N) {
      if (N === null || typeof N != "object")
        return null;
      var ie = me && N[me] || N[ge];
      return typeof ie == "function" ? ie : null;
    }
    var se = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Pe(N) {
      {
        for (var ie = arguments.length, Te = new Array(ie > 1 ? ie - 1 : 0), Fe = 1; Fe < ie; Fe++)
          Te[Fe - 1] = arguments[Fe];
        pe("error", N, Te);
      }
    }
    function pe(N, ie, Te) {
      {
        var Fe = se.ReactDebugCurrentFrame, ht = Fe.getStackAddendum();
        ht !== "" && (ie += "%s", Te = Te.concat([ht]));
        var ct = Te.map(function(wt) {
          return String(wt);
        });
        ct.unshift("Warning: " + ie), Function.prototype.apply.call(console[N], console, ct);
      }
    }
    var De = !1, xe = !1, Me = !1, Ue = !1, kt = !1, Et;
    Et = Symbol.for("react.module.reference");
    function Mt(N) {
      return !!(typeof N == "string" || typeof N == "function" || N === y || N === w || kt || N === S || N === R || N === O || Ue || N === V || De || xe || Me || typeof N == "object" && N !== null && (N.$$typeof === F || N.$$typeof === L || N.$$typeof === m || N.$$typeof === b || N.$$typeof === k || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      N.$$typeof === Et || N.getModuleId !== void 0));
    }
    function Tt(N, ie, Te) {
      var Fe = N.displayName;
      if (Fe)
        return Fe;
      var ht = ie.displayName || ie.name || "";
      return ht !== "" ? Te + "(" + ht + ")" : Te;
    }
    function _e(N) {
      return N.displayName || "Context";
    }
    function je(N) {
      if (N == null)
        return null;
      if (typeof N.tag == "number" && Pe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof N == "function")
        return N.displayName || N.name || null;
      if (typeof N == "string")
        return N;
      switch (N) {
        case y:
          return "Fragment";
        case d:
          return "Portal";
        case w:
          return "Profiler";
        case S:
          return "StrictMode";
        case R:
          return "Suspense";
        case O:
          return "SuspenseList";
      }
      if (typeof N == "object")
        switch (N.$$typeof) {
          case b:
            var ie = N;
            return _e(ie) + ".Consumer";
          case m:
            var Te = N;
            return _e(Te._context) + ".Provider";
          case k:
            return Tt(N, N.render, "ForwardRef");
          case L:
            var Fe = N.displayName || null;
            return Fe !== null ? Fe : je(N.type) || "Memo";
          case F: {
            var ht = N, ct = ht._payload, wt = ht._init;
            try {
              return je(wt(ct));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, de = 0, J, re, K, ue, ne, z, X;
    function He() {
    }
    He.__reactDisabledLog = !0;
    function Re() {
      {
        if (de === 0) {
          J = console.log, re = console.info, K = console.warn, ue = console.error, ne = console.group, z = console.groupCollapsed, X = console.groupEnd;
          var N = {
            configurable: !0,
            enumerable: !0,
            value: He,
            writable: !0
          };
          Object.defineProperties(console, {
            info: N,
            log: N,
            warn: N,
            error: N,
            group: N,
            groupCollapsed: N,
            groupEnd: N
          });
        }
        de++;
      }
    }
    function Ke() {
      {
        if (de--, de === 0) {
          var N = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, N, {
              value: J
            }),
            info: P({}, N, {
              value: re
            }),
            warn: P({}, N, {
              value: K
            }),
            error: P({}, N, {
              value: ue
            }),
            group: P({}, N, {
              value: ne
            }),
            groupCollapsed: P({}, N, {
              value: z
            }),
            groupEnd: P({}, N, {
              value: X
            })
          });
        }
        de < 0 && Pe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Je = se.ReactCurrentDispatcher, Ge;
    function et(N, ie, Te) {
      {
        if (Ge === void 0)
          try {
            throw Error();
          } catch (ht) {
            var Fe = ht.stack.trim().match(/\n( *(at )?)/);
            Ge = Fe && Fe[1] || "";
          }
        return `
` + Ge + N;
      }
    }
    var pt = !1, Qt;
    {
      var On = typeof WeakMap == "function" ? WeakMap : Map;
      Qt = new On();
    }
    function Tr(N, ie) {
      if (!N || pt)
        return "";
      {
        var Te = Qt.get(N);
        if (Te !== void 0)
          return Te;
      }
      var Fe;
      pt = !0;
      var ht = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ct;
      ct = Je.current, Je.current = null, Re();
      try {
        if (ie) {
          var wt = function() {
            throw Error();
          };
          if (Object.defineProperty(wt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(wt, []);
            } catch (vt) {
              Fe = vt;
            }
            Reflect.construct(N, [], wt);
          } else {
            try {
              wt.call();
            } catch (vt) {
              Fe = vt;
            }
            N.call(wt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (vt) {
            Fe = vt;
          }
          N();
        }
      } catch (vt) {
        if (vt && Fe && typeof vt.stack == "string") {
          for (var xt = vt.stack.split(`
`), _n = Fe.stack.split(`
`), ln = xt.length - 1, cn = _n.length - 1; ln >= 1 && cn >= 0 && xt[ln] !== _n[cn]; )
            cn--;
          for (; ln >= 1 && cn >= 0; ln--, cn--)
            if (xt[ln] !== _n[cn]) {
              if (ln !== 1 || cn !== 1)
                do
                  if (ln--, cn--, cn < 0 || xt[ln] !== _n[cn]) {
                    var ir = `
` + xt[ln].replace(" at new ", " at ");
                    return N.displayName && ir.includes("<anonymous>") && (ir = ir.replace("<anonymous>", N.displayName)), typeof N == "function" && Qt.set(N, ir), ir;
                  }
                while (ln >= 1 && cn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, Je.current = ct, Ke(), Error.prepareStackTrace = ht;
      }
      var qa = N ? N.displayName || N.name : "", Ka = qa ? et(qa) : "";
      return typeof N == "function" && Qt.set(N, Ka), Ka;
    }
    function Cn(N, ie, Te) {
      return Tr(N, !1);
    }
    function rr(N) {
      var ie = N.prototype;
      return !!(ie && ie.isReactComponent);
    }
    function Bn(N, ie, Te) {
      if (N == null)
        return "";
      if (typeof N == "function")
        return Tr(N, rr(N));
      if (typeof N == "string")
        return et(N);
      switch (N) {
        case R:
          return et("Suspense");
        case O:
          return et("SuspenseList");
      }
      if (typeof N == "object")
        switch (N.$$typeof) {
          case k:
            return Cn(N.render);
          case L:
            return Bn(N.type, ie, Te);
          case F: {
            var Fe = N, ht = Fe._payload, ct = Fe._init;
            try {
              return Bn(ct(ht), ie, Te);
            } catch {
            }
          }
        }
      return "";
    }
    var In = Object.prototype.hasOwnProperty, Yr = {}, pi = se.ReactDebugCurrentFrame;
    function sa(N) {
      if (N) {
        var ie = N._owner, Te = Bn(N.type, N._source, ie ? ie.type : null);
        pi.setExtraStackFrame(Te);
      } else
        pi.setExtraStackFrame(null);
    }
    function qn(N, ie, Te, Fe, ht) {
      {
        var ct = Function.call.bind(In);
        for (var wt in N)
          if (ct(N, wt)) {
            var xt = void 0;
            try {
              if (typeof N[wt] != "function") {
                var _n = Error((Fe || "React class") + ": " + Te + " type `" + wt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof N[wt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw _n.name = "Invariant Violation", _n;
              }
              xt = N[wt](ie, wt, Fe, Te, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ln) {
              xt = ln;
            }
            xt && !(xt instanceof Error) && (sa(ht), Pe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Fe || "React class", Te, wt, typeof xt), sa(null)), xt instanceof Error && !(xt.message in Yr) && (Yr[xt.message] = !0, sa(ht), Pe("Failed %s type: %s", Te, xt.message), sa(null));
          }
      }
    }
    var wn = Array.isArray;
    function $n(N) {
      return wn(N);
    }
    function Sr(N) {
      {
        var ie = typeof Symbol == "function" && Symbol.toStringTag, Te = ie && N[Symbol.toStringTag] || N.constructor.name || "Object";
        return Te;
      }
    }
    function Qa(N) {
      try {
        return Nn(N), !1;
      } catch {
        return !0;
      }
    }
    function Nn(N) {
      return "" + N;
    }
    function Er(N) {
      if (Qa(N))
        return Pe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Sr(N)), Nn(N);
    }
    var ca = se.ReactCurrentOwner, Ga = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, hi, Ee;
    function Ye(N) {
      if (In.call(N, "ref")) {
        var ie = Object.getOwnPropertyDescriptor(N, "ref").get;
        if (ie && ie.isReactWarning)
          return !1;
      }
      return N.ref !== void 0;
    }
    function gt(N) {
      if (In.call(N, "key")) {
        var ie = Object.getOwnPropertyDescriptor(N, "key").get;
        if (ie && ie.isReactWarning)
          return !1;
      }
      return N.key !== void 0;
    }
    function $t(N, ie) {
      typeof N.ref == "string" && ca.current;
    }
    function rn(N, ie) {
      {
        var Te = function() {
          hi || (hi = !0, Pe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ie));
        };
        Te.isReactWarning = !0, Object.defineProperty(N, "key", {
          get: Te,
          configurable: !0
        });
      }
    }
    function vn(N, ie) {
      {
        var Te = function() {
          Ee || (Ee = !0, Pe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ie));
        };
        Te.isReactWarning = !0, Object.defineProperty(N, "ref", {
          get: Te,
          configurable: !0
        });
      }
    }
    var sn = function(N, ie, Te, Fe, ht, ct, wt) {
      var xt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: c,
        // Built-in properties that belong on the element
        type: N,
        key: ie,
        ref: Te,
        props: wt,
        // Record the component responsible for creating this element.
        _owner: ct
      };
      return xt._store = {}, Object.defineProperty(xt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(xt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Fe
      }), Object.defineProperty(xt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ht
      }), Object.freeze && (Object.freeze(xt.props), Object.freeze(xt)), xt;
    };
    function Kn(N, ie, Te, Fe, ht) {
      {
        var ct, wt = {}, xt = null, _n = null;
        Te !== void 0 && (Er(Te), xt = "" + Te), gt(ie) && (Er(ie.key), xt = "" + ie.key), Ye(ie) && (_n = ie.ref, $t(ie, ht));
        for (ct in ie)
          In.call(ie, ct) && !Ga.hasOwnProperty(ct) && (wt[ct] = ie[ct]);
        if (N && N.defaultProps) {
          var ln = N.defaultProps;
          for (ct in ln)
            wt[ct] === void 0 && (wt[ct] = ln[ct]);
        }
        if (xt || _n) {
          var cn = typeof N == "function" ? N.displayName || N.name || "Unknown" : N;
          xt && rn(wt, cn), _n && vn(wt, cn);
        }
        return sn(N, xt, _n, ht, Fe, ca.current, wt);
      }
    }
    var an = se.ReactCurrentOwner, Gt = se.ReactDebugCurrentFrame;
    function Xt(N) {
      if (N) {
        var ie = N._owner, Te = Bn(N.type, N._source, ie ? ie.type : null);
        Gt.setExtraStackFrame(Te);
      } else
        Gt.setExtraStackFrame(null);
    }
    var fa;
    fa = !1;
    function xr(N) {
      return typeof N == "object" && N !== null && N.$$typeof === c;
    }
    function _a() {
      {
        if (an.current) {
          var N = je(an.current.type);
          if (N)
            return `

Check the render method of \`` + N + "`.";
        }
        return "";
      }
    }
    function Bi(N) {
      return "";
    }
    var uu = {};
    function ou(N) {
      {
        var ie = _a();
        if (!ie) {
          var Te = typeof N == "string" ? N : N.displayName || N.name;
          Te && (ie = `

Check the top-level render call using <` + Te + ">.");
        }
        return ie;
      }
    }
    function Sl(N, ie) {
      {
        if (!N._store || N._store.validated || N.key != null)
          return;
        N._store.validated = !0;
        var Te = ou(ie);
        if (uu[Te])
          return;
        uu[Te] = !0;
        var Fe = "";
        N && N._owner && N._owner !== an.current && (Fe = " It was passed a child from " + je(N._owner.type) + "."), Xt(N), Pe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Te, Fe), Xt(null);
      }
    }
    function El(N, ie) {
      {
        if (typeof N != "object")
          return;
        if ($n(N))
          for (var Te = 0; Te < N.length; Te++) {
            var Fe = N[Te];
            xr(Fe) && Sl(Fe, ie);
          }
        else if (xr(N))
          N._store && (N._store.validated = !0);
        else if (N) {
          var ht = Se(N);
          if (typeof ht == "function" && ht !== N.entries)
            for (var ct = ht.call(N), wt; !(wt = ct.next()).done; )
              xr(wt.value) && Sl(wt.value, ie);
        }
      }
    }
    function su(N) {
      {
        var ie = N.type;
        if (ie == null || typeof ie == "string")
          return;
        var Te;
        if (typeof ie == "function")
          Te = ie.propTypes;
        else if (typeof ie == "object" && (ie.$$typeof === k || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ie.$$typeof === L))
          Te = ie.propTypes;
        else
          return;
        if (Te) {
          var Fe = je(ie);
          qn(Te, N.props, "prop", Fe, N);
        } else if (ie.PropTypes !== void 0 && !fa) {
          fa = !0;
          var ht = je(ie);
          Pe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ht || "Unknown");
        }
        typeof ie.getDefaultProps == "function" && !ie.getDefaultProps.isReactClassApproved && Pe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function br(N) {
      {
        for (var ie = Object.keys(N.props), Te = 0; Te < ie.length; Te++) {
          var Fe = ie[Te];
          if (Fe !== "children" && Fe !== "key") {
            Xt(N), Pe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Fe), Xt(null);
            break;
          }
        }
        N.ref !== null && (Xt(N), Pe("Invalid attribute `ref` supplied to `React.Fragment`."), Xt(null));
      }
    }
    var kr = {};
    function ar(N, ie, Te, Fe, ht, ct) {
      {
        var wt = Mt(N);
        if (!wt) {
          var xt = "";
          (N === void 0 || typeof N == "object" && N !== null && Object.keys(N).length === 0) && (xt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var _n = Bi();
          _n ? xt += _n : xt += _a();
          var ln;
          N === null ? ln = "null" : $n(N) ? ln = "array" : N !== void 0 && N.$$typeof === c ? (ln = "<" + (je(N.type) || "Unknown") + " />", xt = " Did you accidentally export a JSX literal instead of a component?") : ln = typeof N, Pe("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ln, xt);
        }
        var cn = Kn(N, ie, Te, ht, ct);
        if (cn == null)
          return cn;
        if (wt) {
          var ir = ie.children;
          if (ir !== void 0)
            if (Fe)
              if ($n(ir)) {
                for (var qa = 0; qa < ir.length; qa++)
                  El(ir[qa], N);
                Object.freeze && Object.freeze(ir);
              } else
                Pe("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              El(ir, N);
        }
        if (In.call(ie, "key")) {
          var Ka = je(N), vt = Object.keys(ie).filter(function(cu) {
            return cu !== "key";
          }), yt = vt.length > 0 ? "{key: someKey, " + vt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!kr[Ka + yt]) {
            var Za = vt.length > 0 ? "{" + vt.join(": ..., ") + ": ...}" : "{}";
            Pe(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, yt, Ka, Za, Ka), kr[Ka + yt] = !0;
          }
        }
        return N === y ? br(cn) : su(cn), cn;
      }
    }
    function vi(N, ie, Te) {
      return ar(N, ie, Te, !0);
    }
    function Xa(N, ie, Te) {
      return ar(N, ie, Te, !1);
    }
    var mi = Xa, yi = vi;
    xh.Fragment = y, xh.jsx = mi, xh.jsxs = yi;
  })()), xh;
}
var k1;
function NM() {
  return k1 || (k1 = 1, process.env.NODE_ENV === "production" ? Ry.exports = MM() : Ry.exports = OM()), Ry.exports;
}
var Ze = NM(), Rt = Oh(), od = {}, by = { exports: {} }, Ia = {}, ky = { exports: {} }, vE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D1;
function LM() {
  return D1 || (D1 = 1, (function(u) {
    function c(K, ue) {
      var ne = K.length;
      K.push(ue);
      e: for (; 0 < ne; ) {
        var z = ne - 1 >>> 1, X = K[z];
        if (0 < S(X, ue)) K[z] = ue, K[ne] = X, ne = z;
        else break e;
      }
    }
    function d(K) {
      return K.length === 0 ? null : K[0];
    }
    function y(K) {
      if (K.length === 0) return null;
      var ue = K[0], ne = K.pop();
      if (ne !== ue) {
        K[0] = ne;
        e: for (var z = 0, X = K.length, He = X >>> 1; z < He; ) {
          var Re = 2 * (z + 1) - 1, Ke = K[Re], Je = Re + 1, Ge = K[Je];
          if (0 > S(Ke, ne)) Je < X && 0 > S(Ge, Ke) ? (K[z] = Ge, K[Je] = ne, z = Je) : (K[z] = Ke, K[Re] = ne, z = Re);
          else if (Je < X && 0 > S(Ge, ne)) K[z] = Ge, K[Je] = ne, z = Je;
          else break e;
        }
      }
      return ue;
    }
    function S(K, ue) {
      var ne = K.sortIndex - ue.sortIndex;
      return ne !== 0 ? ne : K.id - ue.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var w = performance;
      u.unstable_now = function() {
        return w.now();
      };
    } else {
      var m = Date, b = m.now();
      u.unstable_now = function() {
        return m.now() - b;
      };
    }
    var k = [], R = [], O = 1, L = null, F = 3, V = !1, me = !1, ge = !1, Se = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, Pe = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function pe(K) {
      for (var ue = d(R); ue !== null; ) {
        if (ue.callback === null) y(R);
        else if (ue.startTime <= K) y(R), ue.sortIndex = ue.expirationTime, c(k, ue);
        else break;
        ue = d(R);
      }
    }
    function De(K) {
      if (ge = !1, pe(K), !me) if (d(k) !== null) me = !0, J(xe);
      else {
        var ue = d(R);
        ue !== null && re(De, ue.startTime - K);
      }
    }
    function xe(K, ue) {
      me = !1, ge && (ge = !1, se(kt), kt = -1), V = !0;
      var ne = F;
      try {
        for (pe(ue), L = d(k); L !== null && (!(L.expirationTime > ue) || K && !Tt()); ) {
          var z = L.callback;
          if (typeof z == "function") {
            L.callback = null, F = L.priorityLevel;
            var X = z(L.expirationTime <= ue);
            ue = u.unstable_now(), typeof X == "function" ? L.callback = X : L === d(k) && y(k), pe(ue);
          } else y(k);
          L = d(k);
        }
        if (L !== null) var He = !0;
        else {
          var Re = d(R);
          Re !== null && re(De, Re.startTime - ue), He = !1;
        }
        return He;
      } finally {
        L = null, F = ne, V = !1;
      }
    }
    var Me = !1, Ue = null, kt = -1, Et = 5, Mt = -1;
    function Tt() {
      return !(u.unstable_now() - Mt < Et);
    }
    function _e() {
      if (Ue !== null) {
        var K = u.unstable_now();
        Mt = K;
        var ue = !0;
        try {
          ue = Ue(!0, K);
        } finally {
          ue ? je() : (Me = !1, Ue = null);
        }
      } else Me = !1;
    }
    var je;
    if (typeof Pe == "function") je = function() {
      Pe(_e);
    };
    else if (typeof MessageChannel < "u") {
      var P = new MessageChannel(), de = P.port2;
      P.port1.onmessage = _e, je = function() {
        de.postMessage(null);
      };
    } else je = function() {
      Se(_e, 0);
    };
    function J(K) {
      Ue = K, Me || (Me = !0, je());
    }
    function re(K, ue) {
      kt = Se(function() {
        K(u.unstable_now());
      }, ue);
    }
    u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(K) {
      K.callback = null;
    }, u.unstable_continueExecution = function() {
      me || V || (me = !0, J(xe));
    }, u.unstable_forceFrameRate = function(K) {
      0 > K || 125 < K ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Et = 0 < K ? Math.floor(1e3 / K) : 5;
    }, u.unstable_getCurrentPriorityLevel = function() {
      return F;
    }, u.unstable_getFirstCallbackNode = function() {
      return d(k);
    }, u.unstable_next = function(K) {
      switch (F) {
        case 1:
        case 2:
        case 3:
          var ue = 3;
          break;
        default:
          ue = F;
      }
      var ne = F;
      F = ue;
      try {
        return K();
      } finally {
        F = ne;
      }
    }, u.unstable_pauseExecution = function() {
    }, u.unstable_requestPaint = function() {
    }, u.unstable_runWithPriority = function(K, ue) {
      switch (K) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          K = 3;
      }
      var ne = F;
      F = K;
      try {
        return ue();
      } finally {
        F = ne;
      }
    }, u.unstable_scheduleCallback = function(K, ue, ne) {
      var z = u.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? z + ne : z) : ne = z, K) {
        case 1:
          var X = -1;
          break;
        case 2:
          X = 250;
          break;
        case 5:
          X = 1073741823;
          break;
        case 4:
          X = 1e4;
          break;
        default:
          X = 5e3;
      }
      return X = ne + X, K = { id: O++, callback: ue, priorityLevel: K, startTime: ne, expirationTime: X, sortIndex: -1 }, ne > z ? (K.sortIndex = ne, c(R, K), d(k) === null && K === d(R) && (ge ? (se(kt), kt = -1) : ge = !0, re(De, ne - z))) : (K.sortIndex = X, c(k, K), me || V || (me = !0, J(xe))), K;
    }, u.unstable_shouldYield = Tt, u.unstable_wrapCallback = function(K) {
      var ue = F;
      return function() {
        var ne = F;
        F = ue;
        try {
          return K.apply(this, arguments);
        } finally {
          F = ne;
        }
      };
    };
  })(vE)), vE;
}
var mE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var M1;
function zM() {
  return M1 || (M1 = 1, (function(u) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var c = !1, d = 5;
      function y(Ee, Ye) {
        var gt = Ee.length;
        Ee.push(Ye), m(Ee, Ye, gt);
      }
      function S(Ee) {
        return Ee.length === 0 ? null : Ee[0];
      }
      function w(Ee) {
        if (Ee.length === 0)
          return null;
        var Ye = Ee[0], gt = Ee.pop();
        return gt !== Ye && (Ee[0] = gt, b(Ee, gt, 0)), Ye;
      }
      function m(Ee, Ye, gt) {
        for (var $t = gt; $t > 0; ) {
          var rn = $t - 1 >>> 1, vn = Ee[rn];
          if (k(vn, Ye) > 0)
            Ee[rn] = Ye, Ee[$t] = vn, $t = rn;
          else
            return;
        }
      }
      function b(Ee, Ye, gt) {
        for (var $t = gt, rn = Ee.length, vn = rn >>> 1; $t < vn; ) {
          var sn = ($t + 1) * 2 - 1, Kn = Ee[sn], an = sn + 1, Gt = Ee[an];
          if (k(Kn, Ye) < 0)
            an < rn && k(Gt, Kn) < 0 ? (Ee[$t] = Gt, Ee[an] = Ye, $t = an) : (Ee[$t] = Kn, Ee[sn] = Ye, $t = sn);
          else if (an < rn && k(Gt, Ye) < 0)
            Ee[$t] = Gt, Ee[an] = Ye, $t = an;
          else
            return;
        }
      }
      function k(Ee, Ye) {
        var gt = Ee.sortIndex - Ye.sortIndex;
        return gt !== 0 ? gt : Ee.id - Ye.id;
      }
      var R = 1, O = 2, L = 3, F = 4, V = 5;
      function me(Ee, Ye) {
      }
      var ge = typeof performance == "object" && typeof performance.now == "function";
      if (ge) {
        var Se = performance;
        u.unstable_now = function() {
          return Se.now();
        };
      } else {
        var se = Date, Pe = se.now();
        u.unstable_now = function() {
          return se.now() - Pe;
        };
      }
      var pe = 1073741823, De = -1, xe = 250, Me = 5e3, Ue = 1e4, kt = pe, Et = [], Mt = [], Tt = 1, _e = null, je = L, P = !1, de = !1, J = !1, re = typeof setTimeout == "function" ? setTimeout : null, K = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ne(Ee) {
        for (var Ye = S(Mt); Ye !== null; ) {
          if (Ye.callback === null)
            w(Mt);
          else if (Ye.startTime <= Ee)
            w(Mt), Ye.sortIndex = Ye.expirationTime, y(Et, Ye);
          else
            return;
          Ye = S(Mt);
        }
      }
      function z(Ee) {
        if (J = !1, ne(Ee), !de)
          if (S(Et) !== null)
            de = !0, Nn(X);
          else {
            var Ye = S(Mt);
            Ye !== null && Er(z, Ye.startTime - Ee);
          }
      }
      function X(Ee, Ye) {
        de = !1, J && (J = !1, ca()), P = !0;
        var gt = je;
        try {
          var $t;
          if (!c) return He(Ee, Ye);
        } finally {
          _e = null, je = gt, P = !1;
        }
      }
      function He(Ee, Ye) {
        var gt = Ye;
        for (ne(gt), _e = S(Et); _e !== null && !(_e.expirationTime > gt && (!Ee || pi())); ) {
          var $t = _e.callback;
          if (typeof $t == "function") {
            _e.callback = null, je = _e.priorityLevel;
            var rn = _e.expirationTime <= gt, vn = $t(rn);
            gt = u.unstable_now(), typeof vn == "function" ? _e.callback = vn : _e === S(Et) && w(Et), ne(gt);
          } else
            w(Et);
          _e = S(Et);
        }
        if (_e !== null)
          return !0;
        var sn = S(Mt);
        return sn !== null && Er(z, sn.startTime - gt), !1;
      }
      function Re(Ee, Ye) {
        switch (Ee) {
          case R:
          case O:
          case L:
          case F:
          case V:
            break;
          default:
            Ee = L;
        }
        var gt = je;
        je = Ee;
        try {
          return Ye();
        } finally {
          je = gt;
        }
      }
      function Ke(Ee) {
        var Ye;
        switch (je) {
          case R:
          case O:
          case L:
            Ye = L;
            break;
          default:
            Ye = je;
            break;
        }
        var gt = je;
        je = Ye;
        try {
          return Ee();
        } finally {
          je = gt;
        }
      }
      function Je(Ee) {
        var Ye = je;
        return function() {
          var gt = je;
          je = Ye;
          try {
            return Ee.apply(this, arguments);
          } finally {
            je = gt;
          }
        };
      }
      function Ge(Ee, Ye, gt) {
        var $t = u.unstable_now(), rn;
        if (typeof gt == "object" && gt !== null) {
          var vn = gt.delay;
          typeof vn == "number" && vn > 0 ? rn = $t + vn : rn = $t;
        } else
          rn = $t;
        var sn;
        switch (Ee) {
          case R:
            sn = De;
            break;
          case O:
            sn = xe;
            break;
          case V:
            sn = kt;
            break;
          case F:
            sn = Ue;
            break;
          case L:
          default:
            sn = Me;
            break;
        }
        var Kn = rn + sn, an = {
          id: Tt++,
          callback: Ye,
          priorityLevel: Ee,
          startTime: rn,
          expirationTime: Kn,
          sortIndex: -1
        };
        return rn > $t ? (an.sortIndex = rn, y(Mt, an), S(Et) === null && an === S(Mt) && (J ? ca() : J = !0, Er(z, rn - $t))) : (an.sortIndex = Kn, y(Et, an), !de && !P && (de = !0, Nn(X))), an;
      }
      function et() {
      }
      function pt() {
        !de && !P && (de = !0, Nn(X));
      }
      function Qt() {
        return S(Et);
      }
      function On(Ee) {
        Ee.callback = null;
      }
      function Tr() {
        return je;
      }
      var Cn = !1, rr = null, Bn = -1, In = d, Yr = -1;
      function pi() {
        var Ee = u.unstable_now() - Yr;
        return !(Ee < In);
      }
      function sa() {
      }
      function qn(Ee) {
        if (Ee < 0 || Ee > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Ee > 0 ? In = Math.floor(1e3 / Ee) : In = d;
      }
      var wn = function() {
        if (rr !== null) {
          var Ee = u.unstable_now();
          Yr = Ee;
          var Ye = !0, gt = !0;
          try {
            gt = rr(Ye, Ee);
          } finally {
            gt ? $n() : (Cn = !1, rr = null);
          }
        } else
          Cn = !1;
      }, $n;
      if (typeof ue == "function")
        $n = function() {
          ue(wn);
        };
      else if (typeof MessageChannel < "u") {
        var Sr = new MessageChannel(), Qa = Sr.port2;
        Sr.port1.onmessage = wn, $n = function() {
          Qa.postMessage(null);
        };
      } else
        $n = function() {
          re(wn, 0);
        };
      function Nn(Ee) {
        rr = Ee, Cn || (Cn = !0, $n());
      }
      function Er(Ee, Ye) {
        Bn = re(function() {
          Ee(u.unstable_now());
        }, Ye);
      }
      function ca() {
        K(Bn), Bn = -1;
      }
      var Ga = sa, hi = null;
      u.unstable_IdlePriority = V, u.unstable_ImmediatePriority = R, u.unstable_LowPriority = F, u.unstable_NormalPriority = L, u.unstable_Profiling = hi, u.unstable_UserBlockingPriority = O, u.unstable_cancelCallback = On, u.unstable_continueExecution = pt, u.unstable_forceFrameRate = qn, u.unstable_getCurrentPriorityLevel = Tr, u.unstable_getFirstCallbackNode = Qt, u.unstable_next = Ke, u.unstable_pauseExecution = et, u.unstable_requestPaint = Ga, u.unstable_runWithPriority = Re, u.unstable_scheduleCallback = Ge, u.unstable_shouldYield = pi, u.unstable_wrapCallback = Je, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(mE)), mE;
}
var O1;
function f_() {
  return O1 || (O1 = 1, process.env.NODE_ENV === "production" ? ky.exports = LM() : ky.exports = zM()), ky.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var N1;
function AM() {
  if (N1) return Ia;
  N1 = 1;
  var u = Oh(), c = f_();
  function d(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var y = /* @__PURE__ */ new Set(), S = {};
  function w(n, r) {
    m(n, r), m(n + "Capture", r);
  }
  function m(n, r) {
    for (S[n] = r, n = 0; n < r.length; n++) y.add(r[n]);
  }
  var b = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), k = Object.prototype.hasOwnProperty, R = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, O = {}, L = {};
  function F(n) {
    return k.call(L, n) ? !0 : k.call(O, n) ? !1 : R.test(n) ? L[n] = !0 : (O[n] = !0, !1);
  }
  function V(n, r, l, s) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return s ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function me(n, r, l, s) {
    if (r === null || typeof r > "u" || V(n, r, l, s)) return !0;
    if (s) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function ge(n, r, l, s, p, v, C) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = s, this.attributeNamespace = p, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = v, this.removeEmptyString = C;
  }
  var Se = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    Se[n] = new ge(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    Se[r] = new ge(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    Se[n] = new ge(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    Se[n] = new ge(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    Se[n] = new ge(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    Se[n] = new ge(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    Se[n] = new ge(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    Se[n] = new ge(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    Se[n] = new ge(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var se = /[\-:]([a-z])/g;
  function Pe(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      se,
      Pe
    );
    Se[r] = new ge(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(se, Pe);
    Se[r] = new ge(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(se, Pe);
    Se[r] = new ge(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    Se[n] = new ge(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), Se.xlinkHref = new ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    Se[n] = new ge(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function pe(n, r, l, s) {
    var p = Se.hasOwnProperty(r) ? Se[r] : null;
    (p !== null ? p.type !== 0 : s || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (me(r, l, p, s) && (l = null), s || p === null ? F(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : p.mustUseProperty ? n[p.propertyName] = l === null ? p.type === 3 ? !1 : "" : l : (r = p.attributeName, s = p.attributeNamespace, l === null ? n.removeAttribute(r) : (p = p.type, l = p === 3 || p === 4 && l === !0 ? "" : "" + l, s ? n.setAttributeNS(s, r, l) : n.setAttribute(r, l))));
  }
  var De = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, xe = Symbol.for("react.element"), Me = Symbol.for("react.portal"), Ue = Symbol.for("react.fragment"), kt = Symbol.for("react.strict_mode"), Et = Symbol.for("react.profiler"), Mt = Symbol.for("react.provider"), Tt = Symbol.for("react.context"), _e = Symbol.for("react.forward_ref"), je = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), de = Symbol.for("react.memo"), J = Symbol.for("react.lazy"), re = Symbol.for("react.offscreen"), K = Symbol.iterator;
  function ue(n) {
    return n === null || typeof n != "object" ? null : (n = K && n[K] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ne = Object.assign, z;
  function X(n) {
    if (z === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      z = r && r[1] || "";
    }
    return `
` + z + n;
  }
  var He = !1;
  function Re(n, r) {
    if (!n || He) return "";
    He = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (G) {
          var s = G;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (G) {
          s = G;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (G) {
          s = G;
        }
        n();
      }
    } catch (G) {
      if (G && s && typeof G.stack == "string") {
        for (var p = G.stack.split(`
`), v = s.stack.split(`
`), C = p.length - 1, D = v.length - 1; 1 <= C && 0 <= D && p[C] !== v[D]; ) D--;
        for (; 1 <= C && 0 <= D; C--, D--) if (p[C] !== v[D]) {
          if (C !== 1 || D !== 1)
            do
              if (C--, D--, 0 > D || p[C] !== v[D]) {
                var A = `
` + p[C].replace(" at new ", " at ");
                return n.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", n.displayName)), A;
              }
            while (1 <= C && 0 <= D);
          break;
        }
      }
    } finally {
      He = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? X(n) : "";
  }
  function Ke(n) {
    switch (n.tag) {
      case 5:
        return X(n.type);
      case 16:
        return X("Lazy");
      case 13:
        return X("Suspense");
      case 19:
        return X("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Re(n.type, !1), n;
      case 11:
        return n = Re(n.type.render, !1), n;
      case 1:
        return n = Re(n.type, !0), n;
      default:
        return "";
    }
  }
  function Je(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Ue:
        return "Fragment";
      case Me:
        return "Portal";
      case Et:
        return "Profiler";
      case kt:
        return "StrictMode";
      case je:
        return "Suspense";
      case P:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Tt:
        return (n.displayName || "Context") + ".Consumer";
      case Mt:
        return (n._context.displayName || "Context") + ".Provider";
      case _e:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case de:
        return r = n.displayName || null, r !== null ? r : Je(n.type) || "Memo";
      case J:
        r = n._payload, n = n._init;
        try {
          return Je(n(r));
        } catch {
        }
    }
    return null;
  }
  function Ge(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Je(r);
      case 8:
        return r === kt ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function et(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function pt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Qt(n) {
    var r = pt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), s = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var p = l.get, v = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return p.call(this);
      }, set: function(C) {
        s = "" + C, v.call(this, C);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return s;
      }, setValue: function(C) {
        s = "" + C;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function On(n) {
    n._valueTracker || (n._valueTracker = Qt(n));
  }
  function Tr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), s = "";
    return n && (s = pt(n) ? n.checked ? "true" : "false" : n.value), n = s, n !== l ? (r.setValue(n), !0) : !1;
  }
  function Cn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function rr(n, r) {
    var l = r.checked;
    return ne({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Bn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, s = r.checked != null ? r.checked : r.defaultChecked;
    l = et(r.value != null ? r.value : l), n._wrapperState = { initialChecked: s, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function In(n, r) {
    r = r.checked, r != null && pe(n, "checked", r, !1);
  }
  function Yr(n, r) {
    In(n, r);
    var l = et(r.value), s = r.type;
    if (l != null) s === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (s === "submit" || s === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? sa(n, r.type, l) : r.hasOwnProperty("defaultValue") && sa(n, r.type, et(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function pi(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var s = r.type;
      if (!(s !== "submit" && s !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function sa(n, r, l) {
    (r !== "number" || Cn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var qn = Array.isArray;
  function wn(n, r, l, s) {
    if (n = n.options, r) {
      r = {};
      for (var p = 0; p < l.length; p++) r["$" + l[p]] = !0;
      for (l = 0; l < n.length; l++) p = r.hasOwnProperty("$" + n[l].value), n[l].selected !== p && (n[l].selected = p), p && s && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + et(l), r = null, p = 0; p < n.length; p++) {
        if (n[p].value === l) {
          n[p].selected = !0, s && (n[p].defaultSelected = !0);
          return;
        }
        r !== null || n[p].disabled || (r = n[p]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function $n(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(d(91));
    return ne({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Sr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(d(92));
        if (qn(l)) {
          if (1 < l.length) throw Error(d(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: et(l) };
  }
  function Qa(n, r) {
    var l = et(r.value), s = et(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), s != null && (n.defaultValue = "" + s);
  }
  function Nn(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Er(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function ca(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Er(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ga, hi = (function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, s, p) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, s, p);
      });
    } : n;
  })(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ga = Ga || document.createElement("div"), Ga.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ga.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Ee(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Ye = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, gt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ye).forEach(function(n) {
    gt.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Ye[r] = Ye[n];
    });
  });
  function $t(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Ye.hasOwnProperty(n) && Ye[n] ? ("" + r).trim() : r + "px";
  }
  function rn(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var s = l.indexOf("--") === 0, p = $t(l, r[l], s);
      l === "float" && (l = "cssFloat"), s ? n.setProperty(l, p) : n[l] = p;
    }
  }
  var vn = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function sn(n, r) {
    if (r) {
      if (vn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(d(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(d(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(d(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(d(62));
    }
  }
  function Kn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var an = null;
  function Gt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Xt = null, fa = null, xr = null;
  function _a(n) {
    if (n = Xe(n)) {
      if (typeof Xt != "function") throw Error(d(280));
      var r = n.stateNode;
      r && (r = yn(r), Xt(n.stateNode, n.type, r));
    }
  }
  function Bi(n) {
    fa ? xr ? xr.push(n) : xr = [n] : fa = n;
  }
  function uu() {
    if (fa) {
      var n = fa, r = xr;
      if (xr = fa = null, _a(n), r) for (n = 0; n < r.length; n++) _a(r[n]);
    }
  }
  function ou(n, r) {
    return n(r);
  }
  function Sl() {
  }
  var El = !1;
  function su(n, r, l) {
    if (El) return n(r, l);
    El = !0;
    try {
      return ou(n, r, l);
    } finally {
      El = !1, (fa !== null || xr !== null) && (Sl(), uu());
    }
  }
  function br(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var s = yn(l);
    if (s === null) return null;
    l = s[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) || (n = n.type, s = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !s;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(d(231, r, typeof l));
    return l;
  }
  var kr = !1;
  if (b) try {
    var ar = {};
    Object.defineProperty(ar, "passive", { get: function() {
      kr = !0;
    } }), window.addEventListener("test", ar, ar), window.removeEventListener("test", ar, ar);
  } catch {
    kr = !1;
  }
  function vi(n, r, l, s, p, v, C, D, A) {
    var G = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, G);
    } catch (ce) {
      this.onError(ce);
    }
  }
  var Xa = !1, mi = null, yi = !1, N = null, ie = { onError: function(n) {
    Xa = !0, mi = n;
  } };
  function Te(n, r, l, s, p, v, C, D, A) {
    Xa = !1, mi = null, vi.apply(ie, arguments);
  }
  function Fe(n, r, l, s, p, v, C, D, A) {
    if (Te.apply(this, arguments), Xa) {
      if (Xa) {
        var G = mi;
        Xa = !1, mi = null;
      } else throw Error(d(198));
      yi || (yi = !0, N = G);
    }
  }
  function ht(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, (r.flags & 4098) !== 0 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function ct(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function wt(n) {
    if (ht(n) !== n) throw Error(d(188));
  }
  function xt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = ht(n), r === null) throw Error(d(188));
      return r !== n ? null : n;
    }
    for (var l = n, s = r; ; ) {
      var p = l.return;
      if (p === null) break;
      var v = p.alternate;
      if (v === null) {
        if (s = p.return, s !== null) {
          l = s;
          continue;
        }
        break;
      }
      if (p.child === v.child) {
        for (v = p.child; v; ) {
          if (v === l) return wt(p), n;
          if (v === s) return wt(p), r;
          v = v.sibling;
        }
        throw Error(d(188));
      }
      if (l.return !== s.return) l = p, s = v;
      else {
        for (var C = !1, D = p.child; D; ) {
          if (D === l) {
            C = !0, l = p, s = v;
            break;
          }
          if (D === s) {
            C = !0, s = p, l = v;
            break;
          }
          D = D.sibling;
        }
        if (!C) {
          for (D = v.child; D; ) {
            if (D === l) {
              C = !0, l = v, s = p;
              break;
            }
            if (D === s) {
              C = !0, s = v, l = p;
              break;
            }
            D = D.sibling;
          }
          if (!C) throw Error(d(189));
        }
      }
      if (l.alternate !== s) throw Error(d(190));
    }
    if (l.tag !== 3) throw Error(d(188));
    return l.stateNode.current === l ? n : r;
  }
  function _n(n) {
    return n = xt(n), n !== null ? ln(n) : null;
  }
  function ln(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = ln(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var cn = c.unstable_scheduleCallback, ir = c.unstable_cancelCallback, qa = c.unstable_shouldYield, Ka = c.unstable_requestPaint, vt = c.unstable_now, yt = c.unstable_getCurrentPriorityLevel, Za = c.unstable_ImmediatePriority, cu = c.unstable_UserBlockingPriority, fu = c.unstable_NormalPriority, xl = c.unstable_LowPriority, ao = c.unstable_IdlePriority, Cl = null, Wr = null;
  function ns(n) {
    if (Wr && typeof Wr.onCommitFiberRoot == "function") try {
      Wr.onCommitFiberRoot(Cl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Dr = Math.clz32 ? Math.clz32 : io, Cc = Math.log, wc = Math.LN2;
  function io(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Cc(n) / wc | 0) | 0;
  }
  var wl = 64, da = 4194304;
  function Ja(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function ei(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var s = 0, p = n.suspendedLanes, v = n.pingedLanes, C = l & 268435455;
    if (C !== 0) {
      var D = C & ~p;
      D !== 0 ? s = Ja(D) : (v &= C, v !== 0 && (s = Ja(v)));
    } else C = l & ~p, C !== 0 ? s = Ja(C) : v !== 0 && (s = Ja(v));
    if (s === 0) return 0;
    if (r !== 0 && r !== s && (r & p) === 0 && (p = s & -s, v = r & -r, p >= v || p === 16 && (v & 4194240) !== 0)) return r;
    if ((s & 4) !== 0 && (s |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= s; 0 < r; ) l = 31 - Dr(r), p = 1 << l, s |= n[l], r &= ~p;
    return s;
  }
  function lo(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function du(n, r) {
    for (var l = n.suspendedLanes, s = n.pingedLanes, p = n.expirationTimes, v = n.pendingLanes; 0 < v; ) {
      var C = 31 - Dr(v), D = 1 << C, A = p[C];
      A === -1 ? ((D & l) === 0 || (D & s) !== 0) && (p[C] = lo(D, r)) : A <= r && (n.expiredLanes |= D), v &= ~D;
    }
  }
  function _l(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function uo() {
    var n = wl;
    return wl <<= 1, (wl & 4194240) === 0 && (wl = 64), n;
  }
  function oo(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Ii(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Dr(r), n[r] = l;
  }
  function vd(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var s = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var p = 31 - Dr(l), v = 1 << p;
      r[p] = 0, s[p] = -1, n[p] = -1, l &= ~v;
    }
  }
  function $i(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var s = 31 - Dr(l), p = 1 << s;
      p & r | n[s] & r && (n[s] |= r), l &= ~p;
    }
  }
  var jt = 0;
  function so(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var At, rs, gi, st, co, lr = !1, Si = [], Mr = null, Ei = null, fn = null, qt = /* @__PURE__ */ new Map(), Rl = /* @__PURE__ */ new Map(), Yn = [], Or = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Ra(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Mr = null;
        break;
      case "dragenter":
      case "dragleave":
        Ei = null;
        break;
      case "mouseover":
      case "mouseout":
        fn = null;
        break;
      case "pointerover":
      case "pointerout":
        qt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Rl.delete(r.pointerId);
    }
  }
  function pu(n, r, l, s, p, v) {
    return n === null || n.nativeEvent !== v ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: s, nativeEvent: v, targetContainers: [p] }, r !== null && (r = Xe(r), r !== null && rs(r)), n) : (n.eventSystemFlags |= s, r = n.targetContainers, p !== null && r.indexOf(p) === -1 && r.push(p), n);
  }
  function as(n, r, l, s, p) {
    switch (r) {
      case "focusin":
        return Mr = pu(Mr, n, r, l, s, p), !0;
      case "dragenter":
        return Ei = pu(Ei, n, r, l, s, p), !0;
      case "mouseover":
        return fn = pu(fn, n, r, l, s, p), !0;
      case "pointerover":
        var v = p.pointerId;
        return qt.set(v, pu(qt.get(v) || null, n, r, l, s, p)), !0;
      case "gotpointercapture":
        return v = p.pointerId, Rl.set(v, pu(Rl.get(v) || null, n, r, l, s, p)), !0;
    }
    return !1;
  }
  function is(n) {
    var r = Cu(n.target);
    if (r !== null) {
      var l = ht(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = ct(l), r !== null) {
            n.blockedOn = r, co(n.priority, function() {
              gi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Tl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = ho(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var s = new l.constructor(l.type, l);
        an = s, l.target.dispatchEvent(s), an = null;
      } else return r = Xe(l), r !== null && rs(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function hu(n, r, l) {
    Tl(n) && l.delete(r);
  }
  function md() {
    lr = !1, Mr !== null && Tl(Mr) && (Mr = null), Ei !== null && Tl(Ei) && (Ei = null), fn !== null && Tl(fn) && (fn = null), qt.forEach(hu), Rl.forEach(hu);
  }
  function Ta(n, r) {
    n.blockedOn === r && (n.blockedOn = null, lr || (lr = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, md)));
  }
  function ti(n) {
    function r(p) {
      return Ta(p, n);
    }
    if (0 < Si.length) {
      Ta(Si[0], n);
      for (var l = 1; l < Si.length; l++) {
        var s = Si[l];
        s.blockedOn === n && (s.blockedOn = null);
      }
    }
    for (Mr !== null && Ta(Mr, n), Ei !== null && Ta(Ei, n), fn !== null && Ta(fn, n), qt.forEach(r), Rl.forEach(r), l = 0; l < Yn.length; l++) s = Yn[l], s.blockedOn === n && (s.blockedOn = null);
    for (; 0 < Yn.length && (l = Yn[0], l.blockedOn === null); ) is(l), l.blockedOn === null && Yn.shift();
  }
  var xi = De.ReactCurrentBatchConfig, ba = !0;
  function fo(n, r, l, s) {
    var p = jt, v = xi.transition;
    xi.transition = null;
    try {
      jt = 1, bl(n, r, l, s);
    } finally {
      jt = p, xi.transition = v;
    }
  }
  function po(n, r, l, s) {
    var p = jt, v = xi.transition;
    xi.transition = null;
    try {
      jt = 4, bl(n, r, l, s);
    } finally {
      jt = p, xi.transition = v;
    }
  }
  function bl(n, r, l, s) {
    if (ba) {
      var p = ho(n, r, l, s);
      if (p === null) Ac(n, r, s, vu, l), Ra(n, s);
      else if (as(p, n, r, l, s)) s.stopPropagation();
      else if (Ra(n, s), r & 4 && -1 < Or.indexOf(n)) {
        for (; p !== null; ) {
          var v = Xe(p);
          if (v !== null && At(v), v = ho(n, r, l, s), v === null && Ac(n, r, s, vu, l), v === p) break;
          p = v;
        }
        p !== null && s.stopPropagation();
      } else Ac(n, r, s, null, l);
    }
  }
  var vu = null;
  function ho(n, r, l, s) {
    if (vu = null, n = Gt(s), n = Cu(n), n !== null) if (r = ht(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = ct(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return vu = n, null;
  }
  function vo(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (yt()) {
          case Za:
            return 1;
          case cu:
            return 4;
          case fu:
          case xl:
            return 16;
          case ao:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ni = null, x = null, M = null;
  function Q() {
    if (M) return M;
    var n, r = x, l = r.length, s, p = "value" in ni ? ni.value : ni.textContent, v = p.length;
    for (n = 0; n < l && r[n] === p[n]; n++) ;
    var C = l - n;
    for (s = 1; s <= C && r[l - s] === p[v - s]; s++) ;
    return M = p.slice(n, 1 < s ? 1 - s : void 0);
  }
  function Z(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function ye() {
    return !0;
  }
  function tt() {
    return !1;
  }
  function we(n) {
    function r(l, s, p, v, C) {
      this._reactName = l, this._targetInst = p, this.type = s, this.nativeEvent = v, this.target = C, this.currentTarget = null;
      for (var D in n) n.hasOwnProperty(D) && (l = n[D], this[D] = l ? l(v) : v[D]);
      return this.isDefaultPrevented = (v.defaultPrevented != null ? v.defaultPrevented : v.returnValue === !1) ? ye : tt, this.isPropagationStopped = tt, this;
    }
    return ne(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ye);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ye);
    }, persist: function() {
    }, isPersistent: ye }), r;
  }
  var at = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, _t = we(at), Ut = ne({}, at, { view: 0, detail: 0 }), un = we(Ut), Kt, St, Zt, mn = ne({}, Ut, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: xd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Zt && (Zt && n.type === "mousemove" ? (Kt = n.screenX - Zt.screenX, St = n.screenY - Zt.screenY) : St = Kt = 0, Zt = n), Kt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : St;
  } }), kl = we(mn), ls = ne({}, mn, { dataTransfer: 0 }), Yi = we(ls), us = ne({}, Ut, { relatedTarget: 0 }), mu = we(us), yd = ne({}, at, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), _c = we(yd), gd = ne({}, at, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), zh = we(gd), Sd = ne({}, at, { data: 0 }), Ed = we(Sd), Ah = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Uh = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Jy = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Wi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Jy[n]) ? !!r[n] : !1;
  }
  function xd() {
    return Wi;
  }
  var Cd = ne({}, Ut, { key: function(n) {
    if (n.key) {
      var r = Ah[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = Z(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Uh[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: xd, charCode: function(n) {
    return n.type === "keypress" ? Z(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Z(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), wd = we(Cd), _d = ne({}, mn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Fh = we(_d), Rc = ne({}, Ut, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: xd }), jh = we(Rc), Qr = ne({}, at, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qi = we(Qr), Ln = ne({}, mn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gi = we(Ln), Rd = [9, 13, 27, 32], mo = b && "CompositionEvent" in window, os = null;
  b && "documentMode" in document && (os = document.documentMode);
  var ss = b && "TextEvent" in window && !os, Hh = b && (!mo || os && 8 < os && 11 >= os), Ph = " ", Tc = !1;
  function Vh(n, r) {
    switch (n) {
      case "keyup":
        return Rd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Bh(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var yo = !1;
  function Ih(n, r) {
    switch (n) {
      case "compositionend":
        return Bh(r);
      case "keypress":
        return r.which !== 32 ? null : (Tc = !0, Ph);
      case "textInput":
        return n = r.data, n === Ph && Tc ? null : n;
      default:
        return null;
    }
  }
  function eg(n, r) {
    if (yo) return n === "compositionend" || !mo && Vh(n, r) ? (n = Q(), M = x = ni = null, yo = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Hh && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var tg = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function $h(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!tg[n.type] : r === "textarea";
  }
  function Td(n, r, l, s) {
    Bi(s), r = vs(r, "onChange"), 0 < r.length && (l = new _t("onChange", "change", null, l, s), n.push({ event: l, listeners: r }));
  }
  var Ci = null, yu = null;
  function Yh(n) {
    Eu(n, 0);
  }
  function cs(n) {
    var r = ai(n);
    if (Tr(r)) return n;
  }
  function ng(n, r) {
    if (n === "change") return r;
  }
  var Wh = !1;
  if (b) {
    var bd;
    if (b) {
      var kd = "oninput" in document;
      if (!kd) {
        var Qh = document.createElement("div");
        Qh.setAttribute("oninput", "return;"), kd = typeof Qh.oninput == "function";
      }
      bd = kd;
    } else bd = !1;
    Wh = bd && (!document.documentMode || 9 < document.documentMode);
  }
  function Gh() {
    Ci && (Ci.detachEvent("onpropertychange", Xh), yu = Ci = null);
  }
  function Xh(n) {
    if (n.propertyName === "value" && cs(yu)) {
      var r = [];
      Td(r, yu, n, Gt(n)), su(Yh, r);
    }
  }
  function rg(n, r, l) {
    n === "focusin" ? (Gh(), Ci = r, yu = l, Ci.attachEvent("onpropertychange", Xh)) : n === "focusout" && Gh();
  }
  function qh(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return cs(yu);
  }
  function ag(n, r) {
    if (n === "click") return cs(r);
  }
  function Kh(n, r) {
    if (n === "input" || n === "change") return cs(r);
  }
  function ig(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ri = typeof Object.is == "function" ? Object.is : ig;
  function fs(n, r) {
    if (ri(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), s = Object.keys(r);
    if (l.length !== s.length) return !1;
    for (s = 0; s < l.length; s++) {
      var p = l[s];
      if (!k.call(r, p) || !ri(n[p], r[p])) return !1;
    }
    return !0;
  }
  function Zh(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function bc(n, r) {
    var l = Zh(n);
    n = 0;
    for (var s; l; ) {
      if (l.nodeType === 3) {
        if (s = n + l.textContent.length, n <= r && s >= r) return { node: l, offset: r - n };
        n = s;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Zh(l);
    }
  }
  function Dl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Dl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function ds() {
    for (var n = window, r = Cn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = Cn(n.document);
    }
    return r;
  }
  function kc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function go(n) {
    var r = ds(), l = n.focusedElem, s = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Dl(l.ownerDocument.documentElement, l)) {
      if (s !== null && kc(l)) {
        if (r = s.start, n = s.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var p = l.textContent.length, v = Math.min(s.start, p);
          s = s.end === void 0 ? v : Math.min(s.end, p), !n.extend && v > s && (p = s, s = v, v = p), p = bc(l, v);
          var C = bc(
            l,
            s
          );
          p && C && (n.rangeCount !== 1 || n.anchorNode !== p.node || n.anchorOffset !== p.offset || n.focusNode !== C.node || n.focusOffset !== C.offset) && (r = r.createRange(), r.setStart(p.node, p.offset), n.removeAllRanges(), v > s ? (n.addRange(r), n.extend(C.node, C.offset)) : (r.setEnd(C.node, C.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var lg = b && "documentMode" in document && 11 >= document.documentMode, So = null, Dd = null, ps = null, Md = !1;
  function Od(n, r, l) {
    var s = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Md || So == null || So !== Cn(s) || (s = So, "selectionStart" in s && kc(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), ps && fs(ps, s) || (ps = s, s = vs(Dd, "onSelect"), 0 < s.length && (r = new _t("onSelect", "select", null, r, l), n.push({ event: r, listeners: s }), r.target = So)));
  }
  function Dc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var gu = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") }, ur = {}, Nd = {};
  b && (Nd = document.createElement("div").style, "AnimationEvent" in window || (delete gu.animationend.animation, delete gu.animationiteration.animation, delete gu.animationstart.animation), "TransitionEvent" in window || delete gu.transitionend.transition);
  function Mc(n) {
    if (ur[n]) return ur[n];
    if (!gu[n]) return n;
    var r = gu[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Nd) return ur[n] = r[l];
    return n;
  }
  var Jh = Mc("animationend"), ev = Mc("animationiteration"), tv = Mc("animationstart"), nv = Mc("transitionend"), Ld = /* @__PURE__ */ new Map(), Oc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ka(n, r) {
    Ld.set(n, r), w(r, [n]);
  }
  for (var zd = 0; zd < Oc.length; zd++) {
    var Su = Oc[zd], ug = Su.toLowerCase(), og = Su[0].toUpperCase() + Su.slice(1);
    ka(ug, "on" + og);
  }
  ka(Jh, "onAnimationEnd"), ka(ev, "onAnimationIteration"), ka(tv, "onAnimationStart"), ka("dblclick", "onDoubleClick"), ka("focusin", "onFocus"), ka("focusout", "onBlur"), ka(nv, "onTransitionEnd"), m("onMouseEnter", ["mouseout", "mouseover"]), m("onMouseLeave", ["mouseout", "mouseover"]), m("onPointerEnter", ["pointerout", "pointerover"]), m("onPointerLeave", ["pointerout", "pointerover"]), w("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), w("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), w("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), w("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), w("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), w("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var hs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ad = new Set("cancel close invalid load scroll toggle".split(" ").concat(hs));
  function Nc(n, r, l) {
    var s = n.type || "unknown-event";
    n.currentTarget = l, Fe(s, r, void 0, n), n.currentTarget = null;
  }
  function Eu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var s = n[l], p = s.event;
      s = s.listeners;
      e: {
        var v = void 0;
        if (r) for (var C = s.length - 1; 0 <= C; C--) {
          var D = s[C], A = D.instance, G = D.currentTarget;
          if (D = D.listener, A !== v && p.isPropagationStopped()) break e;
          Nc(p, D, G), v = A;
        }
        else for (C = 0; C < s.length; C++) {
          if (D = s[C], A = D.instance, G = D.currentTarget, D = D.listener, A !== v && p.isPropagationStopped()) break e;
          Nc(p, D, G), v = A;
        }
      }
    }
    if (yi) throw n = N, yi = !1, N = null, n;
  }
  function Yt(n, r) {
    var l = r[gs];
    l === void 0 && (l = r[gs] = /* @__PURE__ */ new Set());
    var s = n + "__bubble";
    l.has(s) || (rv(r, n, 2, !1), l.add(s));
  }
  function Lc(n, r, l) {
    var s = 0;
    r && (s |= 4), rv(l, n, s, r);
  }
  var zc = "_reactListening" + Math.random().toString(36).slice(2);
  function Eo(n) {
    if (!n[zc]) {
      n[zc] = !0, y.forEach(function(l) {
        l !== "selectionchange" && (Ad.has(l) || Lc(l, !1, n), Lc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[zc] || (r[zc] = !0, Lc("selectionchange", !1, r));
    }
  }
  function rv(n, r, l, s) {
    switch (vo(r)) {
      case 1:
        var p = fo;
        break;
      case 4:
        p = po;
        break;
      default:
        p = bl;
    }
    l = p.bind(null, r, l, n), p = void 0, !kr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (p = !0), s ? p !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: p }) : n.addEventListener(r, l, !0) : p !== void 0 ? n.addEventListener(r, l, { passive: p }) : n.addEventListener(r, l, !1);
  }
  function Ac(n, r, l, s, p) {
    var v = s;
    if ((r & 1) === 0 && (r & 2) === 0 && s !== null) e: for (; ; ) {
      if (s === null) return;
      var C = s.tag;
      if (C === 3 || C === 4) {
        var D = s.stateNode.containerInfo;
        if (D === p || D.nodeType === 8 && D.parentNode === p) break;
        if (C === 4) for (C = s.return; C !== null; ) {
          var A = C.tag;
          if ((A === 3 || A === 4) && (A = C.stateNode.containerInfo, A === p || A.nodeType === 8 && A.parentNode === p)) return;
          C = C.return;
        }
        for (; D !== null; ) {
          if (C = Cu(D), C === null) return;
          if (A = C.tag, A === 5 || A === 6) {
            s = v = C;
            continue e;
          }
          D = D.parentNode;
        }
      }
      s = s.return;
    }
    su(function() {
      var G = v, ce = Gt(l), he = [];
      e: {
        var oe = Ld.get(n);
        if (oe !== void 0) {
          var Ne = _t, Ve = n;
          switch (n) {
            case "keypress":
              if (Z(l) === 0) break e;
            case "keydown":
            case "keyup":
              Ne = wd;
              break;
            case "focusin":
              Ve = "focus", Ne = mu;
              break;
            case "focusout":
              Ve = "blur", Ne = mu;
              break;
            case "beforeblur":
            case "afterblur":
              Ne = mu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Ne = kl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ne = Yi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ne = jh;
              break;
            case Jh:
            case ev:
            case tv:
              Ne = _c;
              break;
            case nv:
              Ne = Qi;
              break;
            case "scroll":
              Ne = un;
              break;
            case "wheel":
              Ne = Gi;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ne = zh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ne = Fh;
          }
          var $e = (r & 4) !== 0, Dn = !$e && n === "scroll", B = $e ? oe !== null ? oe + "Capture" : null : oe;
          $e = [];
          for (var j = G, Y; j !== null; ) {
            Y = j;
            var fe = Y.stateNode;
            if (Y.tag === 5 && fe !== null && (Y = fe, B !== null && (fe = br(j, B), fe != null && $e.push(xo(j, fe, Y)))), Dn) break;
            j = j.return;
          }
          0 < $e.length && (oe = new Ne(oe, Ve, null, l, ce), he.push({ event: oe, listeners: $e }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (oe = n === "mouseover" || n === "pointerover", Ne = n === "mouseout" || n === "pointerout", oe && l !== an && (Ve = l.relatedTarget || l.fromElement) && (Cu(Ve) || Ve[Xi])) break e;
          if ((Ne || oe) && (oe = ce.window === ce ? ce : (oe = ce.ownerDocument) ? oe.defaultView || oe.parentWindow : window, Ne ? (Ve = l.relatedTarget || l.toElement, Ne = G, Ve = Ve ? Cu(Ve) : null, Ve !== null && (Dn = ht(Ve), Ve !== Dn || Ve.tag !== 5 && Ve.tag !== 6) && (Ve = null)) : (Ne = null, Ve = G), Ne !== Ve)) {
            if ($e = kl, fe = "onMouseLeave", B = "onMouseEnter", j = "mouse", (n === "pointerout" || n === "pointerover") && ($e = Fh, fe = "onPointerLeave", B = "onPointerEnter", j = "pointer"), Dn = Ne == null ? oe : ai(Ne), Y = Ve == null ? oe : ai(Ve), oe = new $e(fe, j + "leave", Ne, l, ce), oe.target = Dn, oe.relatedTarget = Y, fe = null, Cu(ce) === G && ($e = new $e(B, j + "enter", Ve, l, ce), $e.target = Y, $e.relatedTarget = Dn, fe = $e), Dn = fe, Ne && Ve) t: {
              for ($e = Ne, B = Ve, j = 0, Y = $e; Y; Y = Ml(Y)) j++;
              for (Y = 0, fe = B; fe; fe = Ml(fe)) Y++;
              for (; 0 < j - Y; ) $e = Ml($e), j--;
              for (; 0 < Y - j; ) B = Ml(B), Y--;
              for (; j--; ) {
                if ($e === B || B !== null && $e === B.alternate) break t;
                $e = Ml($e), B = Ml(B);
              }
              $e = null;
            }
            else $e = null;
            Ne !== null && av(he, oe, Ne, $e, !1), Ve !== null && Dn !== null && av(he, Dn, Ve, $e, !0);
          }
        }
        e: {
          if (oe = G ? ai(G) : window, Ne = oe.nodeName && oe.nodeName.toLowerCase(), Ne === "select" || Ne === "input" && oe.type === "file") var Be = ng;
          else if ($h(oe)) if (Wh) Be = Kh;
          else {
            Be = qh;
            var rt = rg;
          }
          else (Ne = oe.nodeName) && Ne.toLowerCase() === "input" && (oe.type === "checkbox" || oe.type === "radio") && (Be = ag);
          if (Be && (Be = Be(n, G))) {
            Td(he, Be, l, ce);
            break e;
          }
          rt && rt(n, oe, G), n === "focusout" && (rt = oe._wrapperState) && rt.controlled && oe.type === "number" && sa(oe, "number", oe.value);
        }
        switch (rt = G ? ai(G) : window, n) {
          case "focusin":
            ($h(rt) || rt.contentEditable === "true") && (So = rt, Dd = G, ps = null);
            break;
          case "focusout":
            ps = Dd = So = null;
            break;
          case "mousedown":
            Md = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Md = !1, Od(he, l, ce);
            break;
          case "selectionchange":
            if (lg) break;
          case "keydown":
          case "keyup":
            Od(he, l, ce);
        }
        var it;
        if (mo) e: {
          switch (n) {
            case "compositionstart":
              var ot = "onCompositionStart";
              break e;
            case "compositionend":
              ot = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ot = "onCompositionUpdate";
              break e;
          }
          ot = void 0;
        }
        else yo ? Vh(n, l) && (ot = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (ot = "onCompositionStart");
        ot && (Hh && l.locale !== "ko" && (yo || ot !== "onCompositionStart" ? ot === "onCompositionEnd" && yo && (it = Q()) : (ni = ce, x = "value" in ni ? ni.value : ni.textContent, yo = !0)), rt = vs(G, ot), 0 < rt.length && (ot = new Ed(ot, n, null, l, ce), he.push({ event: ot, listeners: rt }), it ? ot.data = it : (it = Bh(l), it !== null && (ot.data = it)))), (it = ss ? Ih(n, l) : eg(n, l)) && (G = vs(G, "onBeforeInput"), 0 < G.length && (ce = new Ed("onBeforeInput", "beforeinput", null, l, ce), he.push({ event: ce, listeners: G }), ce.data = it));
      }
      Eu(he, r);
    });
  }
  function xo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function vs(n, r) {
    for (var l = r + "Capture", s = []; n !== null; ) {
      var p = n, v = p.stateNode;
      p.tag === 5 && v !== null && (p = v, v = br(n, l), v != null && s.unshift(xo(n, v, p)), v = br(n, r), v != null && s.push(xo(n, v, p))), n = n.return;
    }
    return s;
  }
  function Ml(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function av(n, r, l, s, p) {
    for (var v = r._reactName, C = []; l !== null && l !== s; ) {
      var D = l, A = D.alternate, G = D.stateNode;
      if (A !== null && A === s) break;
      D.tag === 5 && G !== null && (D = G, p ? (A = br(l, v), A != null && C.unshift(xo(l, A, D))) : p || (A = br(l, v), A != null && C.push(xo(l, A, D)))), l = l.return;
    }
    C.length !== 0 && n.push({ event: r, listeners: C });
  }
  var iv = /\r\n?/g, sg = /\u0000|\uFFFD/g;
  function lv(n) {
    return (typeof n == "string" ? n : "" + n).replace(iv, `
`).replace(sg, "");
  }
  function Uc(n, r, l) {
    if (r = lv(r), lv(n) !== r && l) throw Error(d(425));
  }
  function Ol() {
  }
  var ms = null, xu = null;
  function Fc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var jc = typeof setTimeout == "function" ? setTimeout : void 0, Ud = typeof clearTimeout == "function" ? clearTimeout : void 0, uv = typeof Promise == "function" ? Promise : void 0, Co = typeof queueMicrotask == "function" ? queueMicrotask : typeof uv < "u" ? function(n) {
    return uv.resolve(null).then(n).catch(Hc);
  } : jc;
  function Hc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function wo(n, r) {
    var l = r, s = 0;
    do {
      var p = l.nextSibling;
      if (n.removeChild(l), p && p.nodeType === 8) if (l = p.data, l === "/$") {
        if (s === 0) {
          n.removeChild(p), ti(r);
          return;
        }
        s--;
      } else l !== "$" && l !== "$?" && l !== "$!" || s++;
      l = p;
    } while (l);
    ti(r);
  }
  function wi(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function ov(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Nl = Math.random().toString(36).slice(2), _i = "__reactFiber$" + Nl, ys = "__reactProps$" + Nl, Xi = "__reactContainer$" + Nl, gs = "__reactEvents$" + Nl, _o = "__reactListeners$" + Nl, cg = "__reactHandles$" + Nl;
  function Cu(n) {
    var r = n[_i];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Xi] || l[_i]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = ov(n); n !== null; ) {
          if (l = n[_i]) return l;
          n = ov(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Xe(n) {
    return n = n[_i] || n[Xi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ai(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(d(33));
  }
  function yn(n) {
    return n[ys] || null;
  }
  var Ot = [], Da = -1;
  function Ma(n) {
    return { current: n };
  }
  function on(n) {
    0 > Da || (n.current = Ot[Da], Ot[Da] = null, Da--);
  }
  function Qe(n, r) {
    Da++, Ot[Da] = n.current, n.current = r;
  }
  var Cr = {}, xn = Ma(Cr), Wn = Ma(!1), Gr = Cr;
  function Xr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Cr;
    var s = n.stateNode;
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === r) return s.__reactInternalMemoizedMaskedChildContext;
    var p = {}, v;
    for (v in l) p[v] = r[v];
    return s && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = p), p;
  }
  function zn(n) {
    return n = n.childContextTypes, n != null;
  }
  function Ro() {
    on(Wn), on(xn);
  }
  function sv(n, r, l) {
    if (xn.current !== Cr) throw Error(d(168));
    Qe(xn, r), Qe(Wn, l);
  }
  function Ss(n, r, l) {
    var s = n.stateNode;
    if (r = r.childContextTypes, typeof s.getChildContext != "function") return l;
    s = s.getChildContext();
    for (var p in s) if (!(p in r)) throw Error(d(108, Ge(n) || "Unknown", p));
    return ne({}, l, s);
  }
  function Zn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Cr, Gr = xn.current, Qe(xn, n), Qe(Wn, Wn.current), !0;
  }
  function Pc(n, r, l) {
    var s = n.stateNode;
    if (!s) throw Error(d(169));
    l ? (n = Ss(n, r, Gr), s.__reactInternalMemoizedMergedChildContext = n, on(Wn), on(xn), Qe(xn, n)) : on(Wn), Qe(Wn, l);
  }
  var Ri = null, To = !1, qi = !1;
  function Vc(n) {
    Ri === null ? Ri = [n] : Ri.push(n);
  }
  function Ll(n) {
    To = !0, Vc(n);
  }
  function Ti() {
    if (!qi && Ri !== null) {
      qi = !0;
      var n = 0, r = jt;
      try {
        var l = Ri;
        for (jt = 1; n < l.length; n++) {
          var s = l[n];
          do
            s = s(!0);
          while (s !== null);
        }
        Ri = null, To = !1;
      } catch (p) {
        throw Ri !== null && (Ri = Ri.slice(n + 1)), cn(Za, Ti), p;
      } finally {
        jt = r, qi = !1;
      }
    }
    return null;
  }
  var zl = [], Al = 0, Ul = null, Ki = 0, An = [], Oa = 0, pa = null, bi = 1, ki = "";
  function wu(n, r) {
    zl[Al++] = Ki, zl[Al++] = Ul, Ul = n, Ki = r;
  }
  function cv(n, r, l) {
    An[Oa++] = bi, An[Oa++] = ki, An[Oa++] = pa, pa = n;
    var s = bi;
    n = ki;
    var p = 32 - Dr(s) - 1;
    s &= ~(1 << p), l += 1;
    var v = 32 - Dr(r) + p;
    if (30 < v) {
      var C = p - p % 5;
      v = (s & (1 << C) - 1).toString(32), s >>= C, p -= C, bi = 1 << 32 - Dr(r) + p | l << p | s, ki = v + n;
    } else bi = 1 << v | l << p | s, ki = n;
  }
  function Bc(n) {
    n.return !== null && (wu(n, 1), cv(n, 1, 0));
  }
  function Ic(n) {
    for (; n === Ul; ) Ul = zl[--Al], zl[Al] = null, Ki = zl[--Al], zl[Al] = null;
    for (; n === pa; ) pa = An[--Oa], An[Oa] = null, ki = An[--Oa], An[Oa] = null, bi = An[--Oa], An[Oa] = null;
  }
  var qr = null, Kr = null, pn = !1, Na = null;
  function Fd(n, r) {
    var l = Fa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function fv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, qr = n, Kr = wi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, qr = n, Kr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = pa !== null ? { id: bi, overflow: ki } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Fa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, qr = n, Kr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function jd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Hd(n) {
    if (pn) {
      var r = Kr;
      if (r) {
        var l = r;
        if (!fv(n, r)) {
          if (jd(n)) throw Error(d(418));
          r = wi(l.nextSibling);
          var s = qr;
          r && fv(n, r) ? Fd(s, l) : (n.flags = n.flags & -4097 | 2, pn = !1, qr = n);
        }
      } else {
        if (jd(n)) throw Error(d(418));
        n.flags = n.flags & -4097 | 2, pn = !1, qr = n;
      }
    }
  }
  function Qn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    qr = n;
  }
  function $c(n) {
    if (n !== qr) return !1;
    if (!pn) return Qn(n), pn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Fc(n.type, n.memoizedProps)), r && (r = Kr)) {
      if (jd(n)) throw Es(), Error(d(418));
      for (; r; ) Fd(n, r), r = wi(r.nextSibling);
    }
    if (Qn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(d(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                Kr = wi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Kr = null;
      }
    } else Kr = qr ? wi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Es() {
    for (var n = Kr; n; ) n = wi(n.nextSibling);
  }
  function Fl() {
    Kr = qr = null, pn = !1;
  }
  function Zi(n) {
    Na === null ? Na = [n] : Na.push(n);
  }
  var fg = De.ReactCurrentBatchConfig;
  function _u(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(d(309));
          var s = l.stateNode;
        }
        if (!s) throw Error(d(147, n));
        var p = s, v = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === v ? r.ref : (r = function(C) {
          var D = p.refs;
          C === null ? delete D[v] : D[v] = C;
        }, r._stringRef = v, r);
      }
      if (typeof n != "string") throw Error(d(284));
      if (!l._owner) throw Error(d(290, n));
    }
    return n;
  }
  function Yc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(d(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function dv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Ru(n) {
    function r(B, j) {
      if (n) {
        var Y = B.deletions;
        Y === null ? (B.deletions = [j], B.flags |= 16) : Y.push(j);
      }
    }
    function l(B, j) {
      if (!n) return null;
      for (; j !== null; ) r(B, j), j = j.sibling;
      return null;
    }
    function s(B, j) {
      for (B = /* @__PURE__ */ new Map(); j !== null; ) j.key !== null ? B.set(j.key, j) : B.set(j.index, j), j = j.sibling;
      return B;
    }
    function p(B, j) {
      return B = Yl(B, j), B.index = 0, B.sibling = null, B;
    }
    function v(B, j, Y) {
      return B.index = Y, n ? (Y = B.alternate, Y !== null ? (Y = Y.index, Y < j ? (B.flags |= 2, j) : Y) : (B.flags |= 2, j)) : (B.flags |= 1048576, j);
    }
    function C(B) {
      return n && B.alternate === null && (B.flags |= 2), B;
    }
    function D(B, j, Y, fe) {
      return j === null || j.tag !== 6 ? (j = mp(Y, B.mode, fe), j.return = B, j) : (j = p(j, Y), j.return = B, j);
    }
    function A(B, j, Y, fe) {
      var Be = Y.type;
      return Be === Ue ? ce(B, j, Y.props.children, fe, Y.key) : j !== null && (j.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === J && dv(Be) === j.type) ? (fe = p(j, Y.props), fe.ref = _u(B, j, Y), fe.return = B, fe) : (fe = qs(Y.type, Y.key, Y.props, null, B.mode, fe), fe.ref = _u(B, j, Y), fe.return = B, fe);
    }
    function G(B, j, Y, fe) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== Y.containerInfo || j.stateNode.implementation !== Y.implementation ? (j = Rf(Y, B.mode, fe), j.return = B, j) : (j = p(j, Y.children || []), j.return = B, j);
    }
    function ce(B, j, Y, fe, Be) {
      return j === null || j.tag !== 7 ? (j = al(Y, B.mode, fe, Be), j.return = B, j) : (j = p(j, Y), j.return = B, j);
    }
    function he(B, j, Y) {
      if (typeof j == "string" && j !== "" || typeof j == "number") return j = mp("" + j, B.mode, Y), j.return = B, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case xe:
            return Y = qs(j.type, j.key, j.props, null, B.mode, Y), Y.ref = _u(B, null, j), Y.return = B, Y;
          case Me:
            return j = Rf(j, B.mode, Y), j.return = B, j;
          case J:
            var fe = j._init;
            return he(B, fe(j._payload), Y);
        }
        if (qn(j) || ue(j)) return j = al(j, B.mode, Y, null), j.return = B, j;
        Yc(B, j);
      }
      return null;
    }
    function oe(B, j, Y, fe) {
      var Be = j !== null ? j.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number") return Be !== null ? null : D(B, j, "" + Y, fe);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case xe:
            return Y.key === Be ? A(B, j, Y, fe) : null;
          case Me:
            return Y.key === Be ? G(B, j, Y, fe) : null;
          case J:
            return Be = Y._init, oe(
              B,
              j,
              Be(Y._payload),
              fe
            );
        }
        if (qn(Y) || ue(Y)) return Be !== null ? null : ce(B, j, Y, fe, null);
        Yc(B, Y);
      }
      return null;
    }
    function Ne(B, j, Y, fe, Be) {
      if (typeof fe == "string" && fe !== "" || typeof fe == "number") return B = B.get(Y) || null, D(j, B, "" + fe, Be);
      if (typeof fe == "object" && fe !== null) {
        switch (fe.$$typeof) {
          case xe:
            return B = B.get(fe.key === null ? Y : fe.key) || null, A(j, B, fe, Be);
          case Me:
            return B = B.get(fe.key === null ? Y : fe.key) || null, G(j, B, fe, Be);
          case J:
            var rt = fe._init;
            return Ne(B, j, Y, rt(fe._payload), Be);
        }
        if (qn(fe) || ue(fe)) return B = B.get(Y) || null, ce(j, B, fe, Be, null);
        Yc(j, fe);
      }
      return null;
    }
    function Ve(B, j, Y, fe) {
      for (var Be = null, rt = null, it = j, ot = j = 0, tr = null; it !== null && ot < Y.length; ot++) {
        it.index > ot ? (tr = it, it = null) : tr = it.sibling;
        var Vt = oe(B, it, Y[ot], fe);
        if (Vt === null) {
          it === null && (it = tr);
          break;
        }
        n && it && Vt.alternate === null && r(B, it), j = v(Vt, j, ot), rt === null ? Be = Vt : rt.sibling = Vt, rt = Vt, it = tr;
      }
      if (ot === Y.length) return l(B, it), pn && wu(B, ot), Be;
      if (it === null) {
        for (; ot < Y.length; ot++) it = he(B, Y[ot], fe), it !== null && (j = v(it, j, ot), rt === null ? Be = it : rt.sibling = it, rt = it);
        return pn && wu(B, ot), Be;
      }
      for (it = s(B, it); ot < Y.length; ot++) tr = Ne(it, B, ot, Y[ot], fe), tr !== null && (n && tr.alternate !== null && it.delete(tr.key === null ? ot : tr.key), j = v(tr, j, ot), rt === null ? Be = tr : rt.sibling = tr, rt = tr);
      return n && it.forEach(function(Gl) {
        return r(B, Gl);
      }), pn && wu(B, ot), Be;
    }
    function $e(B, j, Y, fe) {
      var Be = ue(Y);
      if (typeof Be != "function") throw Error(d(150));
      if (Y = Be.call(Y), Y == null) throw Error(d(151));
      for (var rt = Be = null, it = j, ot = j = 0, tr = null, Vt = Y.next(); it !== null && !Vt.done; ot++, Vt = Y.next()) {
        it.index > ot ? (tr = it, it = null) : tr = it.sibling;
        var Gl = oe(B, it, Vt.value, fe);
        if (Gl === null) {
          it === null && (it = tr);
          break;
        }
        n && it && Gl.alternate === null && r(B, it), j = v(Gl, j, ot), rt === null ? Be = Gl : rt.sibling = Gl, rt = Gl, it = tr;
      }
      if (Vt.done) return l(
        B,
        it
      ), pn && wu(B, ot), Be;
      if (it === null) {
        for (; !Vt.done; ot++, Vt = Y.next()) Vt = he(B, Vt.value, fe), Vt !== null && (j = v(Vt, j, ot), rt === null ? Be = Vt : rt.sibling = Vt, rt = Vt);
        return pn && wu(B, ot), Be;
      }
      for (it = s(B, it); !Vt.done; ot++, Vt = Y.next()) Vt = Ne(it, B, ot, Vt.value, fe), Vt !== null && (n && Vt.alternate !== null && it.delete(Vt.key === null ? ot : Vt.key), j = v(Vt, j, ot), rt === null ? Be = Vt : rt.sibling = Vt, rt = Vt);
      return n && it.forEach(function(Gv) {
        return r(B, Gv);
      }), pn && wu(B, ot), Be;
    }
    function Dn(B, j, Y, fe) {
      if (typeof Y == "object" && Y !== null && Y.type === Ue && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case xe:
            e: {
              for (var Be = Y.key, rt = j; rt !== null; ) {
                if (rt.key === Be) {
                  if (Be = Y.type, Be === Ue) {
                    if (rt.tag === 7) {
                      l(B, rt.sibling), j = p(rt, Y.props.children), j.return = B, B = j;
                      break e;
                    }
                  } else if (rt.elementType === Be || typeof Be == "object" && Be !== null && Be.$$typeof === J && dv(Be) === rt.type) {
                    l(B, rt.sibling), j = p(rt, Y.props), j.ref = _u(B, rt, Y), j.return = B, B = j;
                    break e;
                  }
                  l(B, rt);
                  break;
                } else r(B, rt);
                rt = rt.sibling;
              }
              Y.type === Ue ? (j = al(Y.props.children, B.mode, fe, Y.key), j.return = B, B = j) : (fe = qs(Y.type, Y.key, Y.props, null, B.mode, fe), fe.ref = _u(B, j, Y), fe.return = B, B = fe);
            }
            return C(B);
          case Me:
            e: {
              for (rt = Y.key; j !== null; ) {
                if (j.key === rt) if (j.tag === 4 && j.stateNode.containerInfo === Y.containerInfo && j.stateNode.implementation === Y.implementation) {
                  l(B, j.sibling), j = p(j, Y.children || []), j.return = B, B = j;
                  break e;
                } else {
                  l(B, j);
                  break;
                }
                else r(B, j);
                j = j.sibling;
              }
              j = Rf(Y, B.mode, fe), j.return = B, B = j;
            }
            return C(B);
          case J:
            return rt = Y._init, Dn(B, j, rt(Y._payload), fe);
        }
        if (qn(Y)) return Ve(B, j, Y, fe);
        if (ue(Y)) return $e(B, j, Y, fe);
        Yc(B, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" ? (Y = "" + Y, j !== null && j.tag === 6 ? (l(B, j.sibling), j = p(j, Y), j.return = B, B = j) : (l(B, j), j = mp(Y, B.mode, fe), j.return = B, B = j), C(B)) : l(B, j);
    }
    return Dn;
  }
  var Rn = Ru(!0), be = Ru(!1), ha = Ma(null), Zr = null, bo = null, Pd = null;
  function Vd() {
    Pd = bo = Zr = null;
  }
  function Bd(n) {
    var r = ha.current;
    on(ha), n._currentValue = r;
  }
  function Id(n, r, l) {
    for (; n !== null; ) {
      var s = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, s !== null && (s.childLanes |= r)) : s !== null && (s.childLanes & r) !== r && (s.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function gn(n, r) {
    Zr = n, Pd = bo = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & r) !== 0 && (Fn = !0), n.firstContext = null);
  }
  function La(n) {
    var r = n._currentValue;
    if (Pd !== n) if (n = { context: n, memoizedValue: r, next: null }, bo === null) {
      if (Zr === null) throw Error(d(308));
      bo = n, Zr.dependencies = { lanes: 0, firstContext: n };
    } else bo = bo.next = n;
    return r;
  }
  var Tu = null;
  function $d(n) {
    Tu === null ? Tu = [n] : Tu.push(n);
  }
  function Yd(n, r, l, s) {
    var p = r.interleaved;
    return p === null ? (l.next = l, $d(r)) : (l.next = p.next, p.next = l), r.interleaved = l, va(n, s);
  }
  function va(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ma = !1;
  function Wd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function pv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Ji(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function jl(n, r, l) {
    var s = n.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (Nt & 2) !== 0) {
      var p = s.pending;
      return p === null ? r.next = r : (r.next = p.next, p.next = r), s.pending = r, va(n, l);
    }
    return p = s.interleaved, p === null ? (r.next = r, $d(s)) : (r.next = p.next, p.next = r), s.interleaved = r, va(n, l);
  }
  function Wc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var s = r.lanes;
      s &= n.pendingLanes, l |= s, r.lanes = l, $i(n, l);
    }
  }
  function hv(n, r) {
    var l = n.updateQueue, s = n.alternate;
    if (s !== null && (s = s.updateQueue, l === s)) {
      var p = null, v = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var C = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          v === null ? p = v = C : v = v.next = C, l = l.next;
        } while (l !== null);
        v === null ? p = v = r : v = v.next = r;
      } else p = v = r;
      l = { baseState: s.baseState, firstBaseUpdate: p, lastBaseUpdate: v, shared: s.shared, effects: s.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function xs(n, r, l, s) {
    var p = n.updateQueue;
    ma = !1;
    var v = p.firstBaseUpdate, C = p.lastBaseUpdate, D = p.shared.pending;
    if (D !== null) {
      p.shared.pending = null;
      var A = D, G = A.next;
      A.next = null, C === null ? v = G : C.next = G, C = A;
      var ce = n.alternate;
      ce !== null && (ce = ce.updateQueue, D = ce.lastBaseUpdate, D !== C && (D === null ? ce.firstBaseUpdate = G : D.next = G, ce.lastBaseUpdate = A));
    }
    if (v !== null) {
      var he = p.baseState;
      C = 0, ce = G = A = null, D = v;
      do {
        var oe = D.lane, Ne = D.eventTime;
        if ((s & oe) === oe) {
          ce !== null && (ce = ce.next = {
            eventTime: Ne,
            lane: 0,
            tag: D.tag,
            payload: D.payload,
            callback: D.callback,
            next: null
          });
          e: {
            var Ve = n, $e = D;
            switch (oe = r, Ne = l, $e.tag) {
              case 1:
                if (Ve = $e.payload, typeof Ve == "function") {
                  he = Ve.call(Ne, he, oe);
                  break e;
                }
                he = Ve;
                break e;
              case 3:
                Ve.flags = Ve.flags & -65537 | 128;
              case 0:
                if (Ve = $e.payload, oe = typeof Ve == "function" ? Ve.call(Ne, he, oe) : Ve, oe == null) break e;
                he = ne({}, he, oe);
                break e;
              case 2:
                ma = !0;
            }
          }
          D.callback !== null && D.lane !== 0 && (n.flags |= 64, oe = p.effects, oe === null ? p.effects = [D] : oe.push(D));
        } else Ne = { eventTime: Ne, lane: oe, tag: D.tag, payload: D.payload, callback: D.callback, next: null }, ce === null ? (G = ce = Ne, A = he) : ce = ce.next = Ne, C |= oe;
        if (D = D.next, D === null) {
          if (D = p.shared.pending, D === null) break;
          oe = D, D = oe.next, oe.next = null, p.lastBaseUpdate = oe, p.shared.pending = null;
        }
      } while (!0);
      if (ce === null && (A = he), p.baseState = A, p.firstBaseUpdate = G, p.lastBaseUpdate = ce, r = p.shared.interleaved, r !== null) {
        p = r;
        do
          C |= p.lane, p = p.next;
        while (p !== r);
      } else v === null && (p.shared.lanes = 0);
      Li |= C, n.lanes = C, n.memoizedState = he;
    }
  }
  function Qd(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var s = n[r], p = s.callback;
      if (p !== null) {
        if (s.callback = null, s = l, typeof p != "function") throw Error(d(191, p));
        p.call(s);
      }
    }
  }
  var Cs = {}, Di = Ma(Cs), ws = Ma(Cs), _s = Ma(Cs);
  function bu(n) {
    if (n === Cs) throw Error(d(174));
    return n;
  }
  function Gd(n, r) {
    switch (Qe(_s, r), Qe(ws, n), Qe(Di, Cs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : ca(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = ca(r, n);
    }
    on(Di), Qe(Di, r);
  }
  function ku() {
    on(Di), on(ws), on(_s);
  }
  function vv(n) {
    bu(_s.current);
    var r = bu(Di.current), l = ca(r, n.type);
    r !== l && (Qe(ws, n), Qe(Di, l));
  }
  function Qc(n) {
    ws.current === n && (on(Di), on(ws));
  }
  var Sn = Ma(0);
  function Gc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Rs = [];
  function qe() {
    for (var n = 0; n < Rs.length; n++) Rs[n]._workInProgressVersionPrimary = null;
    Rs.length = 0;
  }
  var Ct = De.ReactCurrentDispatcher, Ht = De.ReactCurrentBatchConfig, Jt = 0, Pt = null, Un = null, Jn = null, Xc = !1, Ts = !1, Du = 0, le = 0;
  function Ft() {
    throw Error(d(321));
  }
  function lt(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ri(n[l], r[l])) return !1;
    return !0;
  }
  function Hl(n, r, l, s, p, v) {
    if (Jt = v, Pt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Ct.current = n === null || n.memoizedState === null ? ff : Ns, n = l(s, p), Ts) {
      v = 0;
      do {
        if (Ts = !1, Du = 0, 25 <= v) throw Error(d(301));
        v += 1, Jn = Un = null, r.updateQueue = null, Ct.current = df, n = l(s, p);
      } while (Ts);
    }
    if (Ct.current = zu, r = Un !== null && Un.next !== null, Jt = 0, Jn = Un = Pt = null, Xc = !1, r) throw Error(d(300));
    return n;
  }
  function ii() {
    var n = Du !== 0;
    return Du = 0, n;
  }
  function wr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Jn === null ? Pt.memoizedState = Jn = n : Jn = Jn.next = n, Jn;
  }
  function Tn() {
    if (Un === null) {
      var n = Pt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = Un.next;
    var r = Jn === null ? Pt.memoizedState : Jn.next;
    if (r !== null) Jn = r, Un = n;
    else {
      if (n === null) throw Error(d(310));
      Un = n, n = { memoizedState: Un.memoizedState, baseState: Un.baseState, baseQueue: Un.baseQueue, queue: Un.queue, next: null }, Jn === null ? Pt.memoizedState = Jn = n : Jn = Jn.next = n;
    }
    return Jn;
  }
  function el(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Pl(n) {
    var r = Tn(), l = r.queue;
    if (l === null) throw Error(d(311));
    l.lastRenderedReducer = n;
    var s = Un, p = s.baseQueue, v = l.pending;
    if (v !== null) {
      if (p !== null) {
        var C = p.next;
        p.next = v.next, v.next = C;
      }
      s.baseQueue = p = v, l.pending = null;
    }
    if (p !== null) {
      v = p.next, s = s.baseState;
      var D = C = null, A = null, G = v;
      do {
        var ce = G.lane;
        if ((Jt & ce) === ce) A !== null && (A = A.next = { lane: 0, action: G.action, hasEagerState: G.hasEagerState, eagerState: G.eagerState, next: null }), s = G.hasEagerState ? G.eagerState : n(s, G.action);
        else {
          var he = {
            lane: ce,
            action: G.action,
            hasEagerState: G.hasEagerState,
            eagerState: G.eagerState,
            next: null
          };
          A === null ? (D = A = he, C = s) : A = A.next = he, Pt.lanes |= ce, Li |= ce;
        }
        G = G.next;
      } while (G !== null && G !== v);
      A === null ? C = s : A.next = D, ri(s, r.memoizedState) || (Fn = !0), r.memoizedState = s, r.baseState = C, r.baseQueue = A, l.lastRenderedState = s;
    }
    if (n = l.interleaved, n !== null) {
      p = n;
      do
        v = p.lane, Pt.lanes |= v, Li |= v, p = p.next;
      while (p !== n);
    } else p === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Mu(n) {
    var r = Tn(), l = r.queue;
    if (l === null) throw Error(d(311));
    l.lastRenderedReducer = n;
    var s = l.dispatch, p = l.pending, v = r.memoizedState;
    if (p !== null) {
      l.pending = null;
      var C = p = p.next;
      do
        v = n(v, C.action), C = C.next;
      while (C !== p);
      ri(v, r.memoizedState) || (Fn = !0), r.memoizedState = v, r.baseQueue === null && (r.baseState = v), l.lastRenderedState = v;
    }
    return [v, s];
  }
  function qc() {
  }
  function Kc(n, r) {
    var l = Pt, s = Tn(), p = r(), v = !ri(s.memoizedState, p);
    if (v && (s.memoizedState = p, Fn = !0), s = s.queue, bs(ef.bind(null, l, s, n), [n]), s.getSnapshot !== r || v || Jn !== null && Jn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ou(9, Jc.bind(null, l, s, p, r), void 0, null), Gn === null) throw Error(d(349));
      (Jt & 30) !== 0 || Zc(l, r, p);
    }
    return p;
  }
  function Zc(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Pt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Pt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Jc(n, r, l, s) {
    r.value = l, r.getSnapshot = s, tf(r) && nf(n);
  }
  function ef(n, r, l) {
    return l(function() {
      tf(r) && nf(n);
    });
  }
  function tf(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !ri(n, l);
    } catch {
      return !0;
    }
  }
  function nf(n) {
    var r = va(n, 1);
    r !== null && Ar(r, n, 1, -1);
  }
  function rf(n) {
    var r = wr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: el, lastRenderedState: n }, r.queue = n, n = n.dispatch = Lu.bind(null, Pt, n), [r.memoizedState, n];
  }
  function Ou(n, r, l, s) {
    return n = { tag: n, create: r, destroy: l, deps: s, next: null }, r = Pt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Pt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (s = l.next, l.next = n, n.next = s, r.lastEffect = n)), n;
  }
  function af() {
    return Tn().memoizedState;
  }
  function ko(n, r, l, s) {
    var p = wr();
    Pt.flags |= n, p.memoizedState = Ou(1 | r, l, void 0, s === void 0 ? null : s);
  }
  function Do(n, r, l, s) {
    var p = Tn();
    s = s === void 0 ? null : s;
    var v = void 0;
    if (Un !== null) {
      var C = Un.memoizedState;
      if (v = C.destroy, s !== null && lt(s, C.deps)) {
        p.memoizedState = Ou(r, l, v, s);
        return;
      }
    }
    Pt.flags |= n, p.memoizedState = Ou(1 | r, l, v, s);
  }
  function lf(n, r) {
    return ko(8390656, 8, n, r);
  }
  function bs(n, r) {
    return Do(2048, 8, n, r);
  }
  function uf(n, r) {
    return Do(4, 2, n, r);
  }
  function ks(n, r) {
    return Do(4, 4, n, r);
  }
  function Nu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function of(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Do(4, 4, Nu.bind(null, r, n), l);
  }
  function Ds() {
  }
  function sf(n, r) {
    var l = Tn();
    r = r === void 0 ? null : r;
    var s = l.memoizedState;
    return s !== null && r !== null && lt(r, s[1]) ? s[0] : (l.memoizedState = [n, r], n);
  }
  function cf(n, r) {
    var l = Tn();
    r = r === void 0 ? null : r;
    var s = l.memoizedState;
    return s !== null && r !== null && lt(r, s[1]) ? s[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Xd(n, r, l) {
    return (Jt & 21) === 0 ? (n.baseState && (n.baseState = !1, Fn = !0), n.memoizedState = l) : (ri(l, r) || (l = uo(), Pt.lanes |= l, Li |= l, n.baseState = !0), r);
  }
  function Ms(n, r) {
    var l = jt;
    jt = l !== 0 && 4 > l ? l : 4, n(!0);
    var s = Ht.transition;
    Ht.transition = {};
    try {
      n(!1), r();
    } finally {
      jt = l, Ht.transition = s;
    }
  }
  function qd() {
    return Tn().memoizedState;
  }
  function Os(n, r, l) {
    var s = zi(n);
    if (l = { lane: s, action: l, hasEagerState: !1, eagerState: null, next: null }, Jr(n)) mv(r, l);
    else if (l = Yd(n, r, l, s), l !== null) {
      var p = Pn();
      Ar(l, n, s, p), nn(l, r, s);
    }
  }
  function Lu(n, r, l) {
    var s = zi(n), p = { lane: s, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Jr(n)) mv(r, p);
    else {
      var v = n.alternate;
      if (n.lanes === 0 && (v === null || v.lanes === 0) && (v = r.lastRenderedReducer, v !== null)) try {
        var C = r.lastRenderedState, D = v(C, l);
        if (p.hasEagerState = !0, p.eagerState = D, ri(D, C)) {
          var A = r.interleaved;
          A === null ? (p.next = p, $d(r)) : (p.next = A.next, A.next = p), r.interleaved = p;
          return;
        }
      } catch {
      } finally {
      }
      l = Yd(n, r, p, s), l !== null && (p = Pn(), Ar(l, n, s, p), nn(l, r, s));
    }
  }
  function Jr(n) {
    var r = n.alternate;
    return n === Pt || r !== null && r === Pt;
  }
  function mv(n, r) {
    Ts = Xc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function nn(n, r, l) {
    if ((l & 4194240) !== 0) {
      var s = r.lanes;
      s &= n.pendingLanes, l |= s, r.lanes = l, $i(n, l);
    }
  }
  var zu = { readContext: La, useCallback: Ft, useContext: Ft, useEffect: Ft, useImperativeHandle: Ft, useInsertionEffect: Ft, useLayoutEffect: Ft, useMemo: Ft, useReducer: Ft, useRef: Ft, useState: Ft, useDebugValue: Ft, useDeferredValue: Ft, useTransition: Ft, useMutableSource: Ft, useSyncExternalStore: Ft, useId: Ft, unstable_isNewReconciler: !1 }, ff = { readContext: La, useCallback: function(n, r) {
    return wr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: La, useEffect: lf, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, ko(
      4194308,
      4,
      Nu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return ko(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return ko(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = wr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var s = wr();
    return r = l !== void 0 ? l(r) : r, s.memoizedState = s.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, s.queue = n, n = n.dispatch = Os.bind(null, Pt, n), [s.memoizedState, n];
  }, useRef: function(n) {
    var r = wr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: rf, useDebugValue: Ds, useDeferredValue: function(n) {
    return wr().memoizedState = n;
  }, useTransition: function() {
    var n = rf(!1), r = n[0];
    return n = Ms.bind(null, n[1]), wr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var s = Pt, p = wr();
    if (pn) {
      if (l === void 0) throw Error(d(407));
      l = l();
    } else {
      if (l = r(), Gn === null) throw Error(d(349));
      (Jt & 30) !== 0 || Zc(s, r, l);
    }
    p.memoizedState = l;
    var v = { value: l, getSnapshot: r };
    return p.queue = v, lf(ef.bind(
      null,
      s,
      v,
      n
    ), [n]), s.flags |= 2048, Ou(9, Jc.bind(null, s, v, l, r), void 0, null), l;
  }, useId: function() {
    var n = wr(), r = Gn.identifierPrefix;
    if (pn) {
      var l = ki, s = bi;
      l = (s & ~(1 << 32 - Dr(s) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Du++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = le++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Ns = {
    readContext: La,
    useCallback: sf,
    useContext: La,
    useEffect: bs,
    useImperativeHandle: of,
    useInsertionEffect: uf,
    useLayoutEffect: ks,
    useMemo: cf,
    useReducer: Pl,
    useRef: af,
    useState: function() {
      return Pl(el);
    },
    useDebugValue: Ds,
    useDeferredValue: function(n) {
      var r = Tn();
      return Xd(r, Un.memoizedState, n);
    },
    useTransition: function() {
      var n = Pl(el)[0], r = Tn().memoizedState;
      return [n, r];
    },
    useMutableSource: qc,
    useSyncExternalStore: Kc,
    useId: qd,
    unstable_isNewReconciler: !1
  }, df = { readContext: La, useCallback: sf, useContext: La, useEffect: bs, useImperativeHandle: of, useInsertionEffect: uf, useLayoutEffect: ks, useMemo: cf, useReducer: Mu, useRef: af, useState: function() {
    return Mu(el);
  }, useDebugValue: Ds, useDeferredValue: function(n) {
    var r = Tn();
    return Un === null ? r.memoizedState = n : Xd(r, Un.memoizedState, n);
  }, useTransition: function() {
    var n = Mu(el)[0], r = Tn().memoizedState;
    return [n, r];
  }, useMutableSource: qc, useSyncExternalStore: Kc, useId: qd, unstable_isNewReconciler: !1 };
  function li(n, r) {
    if (n && n.defaultProps) {
      r = ne({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Kd(n, r, l, s) {
    r = n.memoizedState, l = l(s, r), l = l == null ? r : ne({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var pf = { isMounted: function(n) {
    return (n = n._reactInternals) ? ht(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var s = Pn(), p = zi(n), v = Ji(s, p);
    v.payload = r, l != null && (v.callback = l), r = jl(n, v, p), r !== null && (Ar(r, n, p, s), Wc(r, n, p));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var s = Pn(), p = zi(n), v = Ji(s, p);
    v.tag = 1, v.payload = r, l != null && (v.callback = l), r = jl(n, v, p), r !== null && (Ar(r, n, p, s), Wc(r, n, p));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Pn(), s = zi(n), p = Ji(l, s);
    p.tag = 2, r != null && (p.callback = r), r = jl(n, p, s), r !== null && (Ar(r, n, s, l), Wc(r, n, s));
  } };
  function yv(n, r, l, s, p, v, C) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(s, v, C) : r.prototype && r.prototype.isPureReactComponent ? !fs(l, s) || !fs(p, v) : !0;
  }
  function hf(n, r, l) {
    var s = !1, p = Cr, v = r.contextType;
    return typeof v == "object" && v !== null ? v = La(v) : (p = zn(r) ? Gr : xn.current, s = r.contextTypes, v = (s = s != null) ? Xr(n, p) : Cr), r = new r(l, v), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = pf, n.stateNode = r, r._reactInternals = n, s && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = p, n.__reactInternalMemoizedMaskedChildContext = v), r;
  }
  function gv(n, r, l, s) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, s), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, s), r.state !== n && pf.enqueueReplaceState(r, r.state, null);
  }
  function Ls(n, r, l, s) {
    var p = n.stateNode;
    p.props = l, p.state = n.memoizedState, p.refs = {}, Wd(n);
    var v = r.contextType;
    typeof v == "object" && v !== null ? p.context = La(v) : (v = zn(r) ? Gr : xn.current, p.context = Xr(n, v)), p.state = n.memoizedState, v = r.getDerivedStateFromProps, typeof v == "function" && (Kd(n, r, v, l), p.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function" || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (r = p.state, typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount(), r !== p.state && pf.enqueueReplaceState(p, p.state, null), xs(n, l, p, s), p.state = n.memoizedState), typeof p.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Au(n, r) {
    try {
      var l = "", s = r;
      do
        l += Ke(s), s = s.return;
      while (s);
      var p = l;
    } catch (v) {
      p = `
Error generating stack: ` + v.message + `
` + v.stack;
    }
    return { value: n, source: r, stack: p, digest: null };
  }
  function Zd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Jd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var vf = typeof WeakMap == "function" ? WeakMap : Map;
  function Sv(n, r, l) {
    l = Ji(-1, l), l.tag = 3, l.payload = { element: null };
    var s = r.value;
    return l.callback = function() {
      Ao || (Ao = !0, ju = s), Jd(n, r);
    }, l;
  }
  function ep(n, r, l) {
    l = Ji(-1, l), l.tag = 3;
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var p = r.value;
      l.payload = function() {
        return s(p);
      }, l.callback = function() {
        Jd(n, r);
      };
    }
    var v = n.stateNode;
    return v !== null && typeof v.componentDidCatch == "function" && (l.callback = function() {
      Jd(n, r), typeof s != "function" && (Il === null ? Il = /* @__PURE__ */ new Set([this]) : Il.add(this));
      var C = r.stack;
      this.componentDidCatch(r.value, { componentStack: C !== null ? C : "" });
    }), l;
  }
  function tp(n, r, l) {
    var s = n.pingCache;
    if (s === null) {
      s = n.pingCache = new vf();
      var p = /* @__PURE__ */ new Set();
      s.set(r, p);
    } else p = s.get(r), p === void 0 && (p = /* @__PURE__ */ new Set(), s.set(r, p));
    p.has(l) || (p.add(l), n = gg.bind(null, n, r, l), r.then(n, n));
  }
  function Ev(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Vl(n, r, l, s, p) {
    return (n.mode & 1) === 0 ? (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = Ji(-1, 1), r.tag = 2, jl(l, r, 1))), l.lanes |= 1), n) : (n.flags |= 65536, n.lanes = p, n);
  }
  var zs = De.ReactCurrentOwner, Fn = !1;
  function or(n, r, l, s) {
    r.child = n === null ? be(r, null, l, s) : Rn(r, n.child, l, s);
  }
  function ea(n, r, l, s, p) {
    l = l.render;
    var v = r.ref;
    return gn(r, p), s = Hl(n, r, l, s, v, p), l = ii(), n !== null && !Fn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Aa(n, r, p)) : (pn && l && Bc(r), r.flags |= 1, or(n, r, s, p), r.child);
  }
  function Uu(n, r, l, s, p) {
    if (n === null) {
      var v = l.type;
      return typeof v == "function" && !vp(v) && v.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = v, mt(n, r, v, s, p)) : (n = qs(l.type, null, s, r, r.mode, p), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (v = n.child, (n.lanes & p) === 0) {
      var C = v.memoizedProps;
      if (l = l.compare, l = l !== null ? l : fs, l(C, s) && n.ref === r.ref) return Aa(n, r, p);
    }
    return r.flags |= 1, n = Yl(v, s), n.ref = r.ref, n.return = r, r.child = n;
  }
  function mt(n, r, l, s, p) {
    if (n !== null) {
      var v = n.memoizedProps;
      if (fs(v, s) && n.ref === r.ref) if (Fn = !1, r.pendingProps = s = v, (n.lanes & p) !== 0) (n.flags & 131072) !== 0 && (Fn = !0);
      else return r.lanes = n.lanes, Aa(n, r, p);
    }
    return xv(n, r, l, s, p);
  }
  function As(n, r, l) {
    var s = r.pendingProps, p = s.children, v = n !== null ? n.memoizedState : null;
    if (s.mode === "hidden") if ((r.mode & 1) === 0) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Qe(No, ya), ya |= l;
    else {
      if ((l & 1073741824) === 0) return n = v !== null ? v.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Qe(No, ya), ya |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = v !== null ? v.baseLanes : l, Qe(No, ya), ya |= s;
    }
    else v !== null ? (s = v.baseLanes | l, r.memoizedState = null) : s = l, Qe(No, ya), ya |= s;
    return or(n, r, p, l), r.child;
  }
  function np(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function xv(n, r, l, s, p) {
    var v = zn(l) ? Gr : xn.current;
    return v = Xr(r, v), gn(r, p), l = Hl(n, r, l, s, v, p), s = ii(), n !== null && !Fn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Aa(n, r, p)) : (pn && s && Bc(r), r.flags |= 1, or(n, r, l, p), r.child);
  }
  function Cv(n, r, l, s, p) {
    if (zn(l)) {
      var v = !0;
      Zn(r);
    } else v = !1;
    if (gn(r, p), r.stateNode === null) za(n, r), hf(r, l, s), Ls(r, l, s, p), s = !0;
    else if (n === null) {
      var C = r.stateNode, D = r.memoizedProps;
      C.props = D;
      var A = C.context, G = l.contextType;
      typeof G == "object" && G !== null ? G = La(G) : (G = zn(l) ? Gr : xn.current, G = Xr(r, G));
      var ce = l.getDerivedStateFromProps, he = typeof ce == "function" || typeof C.getSnapshotBeforeUpdate == "function";
      he || typeof C.UNSAFE_componentWillReceiveProps != "function" && typeof C.componentWillReceiveProps != "function" || (D !== s || A !== G) && gv(r, C, s, G), ma = !1;
      var oe = r.memoizedState;
      C.state = oe, xs(r, s, C, p), A = r.memoizedState, D !== s || oe !== A || Wn.current || ma ? (typeof ce == "function" && (Kd(r, l, ce, s), A = r.memoizedState), (D = ma || yv(r, l, D, s, oe, A, G)) ? (he || typeof C.UNSAFE_componentWillMount != "function" && typeof C.componentWillMount != "function" || (typeof C.componentWillMount == "function" && C.componentWillMount(), typeof C.UNSAFE_componentWillMount == "function" && C.UNSAFE_componentWillMount()), typeof C.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof C.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = s, r.memoizedState = A), C.props = s, C.state = A, C.context = G, s = D) : (typeof C.componentDidMount == "function" && (r.flags |= 4194308), s = !1);
    } else {
      C = r.stateNode, pv(n, r), D = r.memoizedProps, G = r.type === r.elementType ? D : li(r.type, D), C.props = G, he = r.pendingProps, oe = C.context, A = l.contextType, typeof A == "object" && A !== null ? A = La(A) : (A = zn(l) ? Gr : xn.current, A = Xr(r, A));
      var Ne = l.getDerivedStateFromProps;
      (ce = typeof Ne == "function" || typeof C.getSnapshotBeforeUpdate == "function") || typeof C.UNSAFE_componentWillReceiveProps != "function" && typeof C.componentWillReceiveProps != "function" || (D !== he || oe !== A) && gv(r, C, s, A), ma = !1, oe = r.memoizedState, C.state = oe, xs(r, s, C, p);
      var Ve = r.memoizedState;
      D !== he || oe !== Ve || Wn.current || ma ? (typeof Ne == "function" && (Kd(r, l, Ne, s), Ve = r.memoizedState), (G = ma || yv(r, l, G, s, oe, Ve, A) || !1) ? (ce || typeof C.UNSAFE_componentWillUpdate != "function" && typeof C.componentWillUpdate != "function" || (typeof C.componentWillUpdate == "function" && C.componentWillUpdate(s, Ve, A), typeof C.UNSAFE_componentWillUpdate == "function" && C.UNSAFE_componentWillUpdate(s, Ve, A)), typeof C.componentDidUpdate == "function" && (r.flags |= 4), typeof C.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof C.componentDidUpdate != "function" || D === n.memoizedProps && oe === n.memoizedState || (r.flags |= 4), typeof C.getSnapshotBeforeUpdate != "function" || D === n.memoizedProps && oe === n.memoizedState || (r.flags |= 1024), r.memoizedProps = s, r.memoizedState = Ve), C.props = s, C.state = Ve, C.context = A, s = G) : (typeof C.componentDidUpdate != "function" || D === n.memoizedProps && oe === n.memoizedState || (r.flags |= 4), typeof C.getSnapshotBeforeUpdate != "function" || D === n.memoizedProps && oe === n.memoizedState || (r.flags |= 1024), s = !1);
    }
    return Us(n, r, l, s, v, p);
  }
  function Us(n, r, l, s, p, v) {
    np(n, r);
    var C = (r.flags & 128) !== 0;
    if (!s && !C) return p && Pc(r, l, !1), Aa(n, r, v);
    s = r.stateNode, zs.current = r;
    var D = C && typeof l.getDerivedStateFromError != "function" ? null : s.render();
    return r.flags |= 1, n !== null && C ? (r.child = Rn(r, n.child, null, v), r.child = Rn(r, null, D, v)) : or(n, r, D, v), r.memoizedState = s.state, p && Pc(r, l, !0), r.child;
  }
  function Mo(n) {
    var r = n.stateNode;
    r.pendingContext ? sv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && sv(n, r.context, !1), Gd(n, r.containerInfo);
  }
  function wv(n, r, l, s, p) {
    return Fl(), Zi(p), r.flags |= 256, or(n, r, l, s), r.child;
  }
  var mf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function rp(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function yf(n, r, l) {
    var s = r.pendingProps, p = Sn.current, v = !1, C = (r.flags & 128) !== 0, D;
    if ((D = C) || (D = n !== null && n.memoizedState === null ? !1 : (p & 2) !== 0), D ? (v = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (p |= 1), Qe(Sn, p & 1), n === null)
      return Hd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((r.mode & 1) === 0 ? r.lanes = 1 : n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824, null) : (C = s.children, n = s.fallback, v ? (s = r.mode, v = r.child, C = { mode: "hidden", children: C }, (s & 1) === 0 && v !== null ? (v.childLanes = 0, v.pendingProps = C) : v = Wl(C, s, 0, null), n = al(n, s, l, null), v.return = r, n.return = r, v.sibling = n, r.child = v, r.child.memoizedState = rp(l), r.memoizedState = mf, n) : ap(r, C));
    if (p = n.memoizedState, p !== null && (D = p.dehydrated, D !== null)) return _v(n, r, C, s, D, p, l);
    if (v) {
      v = s.fallback, C = r.mode, p = n.child, D = p.sibling;
      var A = { mode: "hidden", children: s.children };
      return (C & 1) === 0 && r.child !== p ? (s = r.child, s.childLanes = 0, s.pendingProps = A, r.deletions = null) : (s = Yl(p, A), s.subtreeFlags = p.subtreeFlags & 14680064), D !== null ? v = Yl(D, v) : (v = al(v, C, l, null), v.flags |= 2), v.return = r, s.return = r, s.sibling = v, r.child = s, s = v, v = r.child, C = n.child.memoizedState, C = C === null ? rp(l) : { baseLanes: C.baseLanes | l, cachePool: null, transitions: C.transitions }, v.memoizedState = C, v.childLanes = n.childLanes & ~l, r.memoizedState = mf, s;
    }
    return v = n.child, n = v.sibling, s = Yl(v, { mode: "visible", children: s.children }), (r.mode & 1) === 0 && (s.lanes = l), s.return = r, s.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = s, r.memoizedState = null, s;
  }
  function ap(n, r) {
    return r = Wl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Fs(n, r, l, s) {
    return s !== null && Zi(s), Rn(r, n.child, null, l), n = ap(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function _v(n, r, l, s, p, v, C) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, s = Zd(Error(d(422))), Fs(n, r, C, s)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (v = s.fallback, p = r.mode, s = Wl({ mode: "visible", children: s.children }, p, 0, null), v = al(v, p, C, null), v.flags |= 2, s.return = r, v.return = r, s.sibling = v, r.child = s, (r.mode & 1) !== 0 && Rn(r, n.child, null, C), r.child.memoizedState = rp(C), r.memoizedState = mf, v);
    if ((r.mode & 1) === 0) return Fs(n, r, C, null);
    if (p.data === "$!") {
      if (s = p.nextSibling && p.nextSibling.dataset, s) var D = s.dgst;
      return s = D, v = Error(d(419)), s = Zd(v, s, void 0), Fs(n, r, C, s);
    }
    if (D = (C & n.childLanes) !== 0, Fn || D) {
      if (s = Gn, s !== null) {
        switch (C & -C) {
          case 4:
            p = 2;
            break;
          case 16:
            p = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            p = 32;
            break;
          case 536870912:
            p = 268435456;
            break;
          default:
            p = 0;
        }
        p = (p & (s.suspendedLanes | C)) !== 0 ? 0 : p, p !== 0 && p !== v.retryLane && (v.retryLane = p, va(n, p), Ar(s, n, p, -1));
      }
      return hp(), s = Zd(Error(d(421))), Fs(n, r, C, s);
    }
    return p.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Sg.bind(null, n), p._reactRetry = r, null) : (n = v.treeContext, Kr = wi(p.nextSibling), qr = r, pn = !0, Na = null, n !== null && (An[Oa++] = bi, An[Oa++] = ki, An[Oa++] = pa, bi = n.id, ki = n.overflow, pa = r), r = ap(r, s.children), r.flags |= 4096, r);
  }
  function ip(n, r, l) {
    n.lanes |= r;
    var s = n.alternate;
    s !== null && (s.lanes |= r), Id(n.return, r, l);
  }
  function Nr(n, r, l, s, p) {
    var v = n.memoizedState;
    v === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: s, tail: l, tailMode: p } : (v.isBackwards = r, v.rendering = null, v.renderingStartTime = 0, v.last = s, v.tail = l, v.tailMode = p);
  }
  function Mi(n, r, l) {
    var s = r.pendingProps, p = s.revealOrder, v = s.tail;
    if (or(n, r, s.children, l), s = Sn.current, (s & 2) !== 0) s = s & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && ip(n, l, r);
        else if (n.tag === 19) ip(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      s &= 1;
    }
    if (Qe(Sn, s), (r.mode & 1) === 0) r.memoizedState = null;
    else switch (p) {
      case "forwards":
        for (l = r.child, p = null; l !== null; ) n = l.alternate, n !== null && Gc(n) === null && (p = l), l = l.sibling;
        l = p, l === null ? (p = r.child, r.child = null) : (p = l.sibling, l.sibling = null), Nr(r, !1, p, l, v);
        break;
      case "backwards":
        for (l = null, p = r.child, r.child = null; p !== null; ) {
          if (n = p.alternate, n !== null && Gc(n) === null) {
            r.child = p;
            break;
          }
          n = p.sibling, p.sibling = l, l = p, p = n;
        }
        Nr(r, !0, l, null, v);
        break;
      case "together":
        Nr(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function za(n, r) {
    (r.mode & 1) === 0 && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Aa(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Li |= r.lanes, (l & r.childLanes) === 0) return null;
    if (n !== null && r.child !== n.child) throw Error(d(153));
    if (r.child !== null) {
      for (n = r.child, l = Yl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Yl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function js(n, r, l) {
    switch (r.tag) {
      case 3:
        Mo(r), Fl();
        break;
      case 5:
        vv(r);
        break;
      case 1:
        zn(r.type) && Zn(r);
        break;
      case 4:
        Gd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var s = r.type._context, p = r.memoizedProps.value;
        Qe(ha, s._currentValue), s._currentValue = p;
        break;
      case 13:
        if (s = r.memoizedState, s !== null)
          return s.dehydrated !== null ? (Qe(Sn, Sn.current & 1), r.flags |= 128, null) : (l & r.child.childLanes) !== 0 ? yf(n, r, l) : (Qe(Sn, Sn.current & 1), n = Aa(n, r, l), n !== null ? n.sibling : null);
        Qe(Sn, Sn.current & 1);
        break;
      case 19:
        if (s = (l & r.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (s) return Mi(n, r, l);
          r.flags |= 128;
        }
        if (p = r.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), Qe(Sn, Sn.current), s) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, As(n, r, l);
    }
    return Aa(n, r, l);
  }
  var Ua, jn, Rv, Tv;
  Ua = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, jn = function() {
  }, Rv = function(n, r, l, s) {
    var p = n.memoizedProps;
    if (p !== s) {
      n = r.stateNode, bu(Di.current);
      var v = null;
      switch (l) {
        case "input":
          p = rr(n, p), s = rr(n, s), v = [];
          break;
        case "select":
          p = ne({}, p, { value: void 0 }), s = ne({}, s, { value: void 0 }), v = [];
          break;
        case "textarea":
          p = $n(n, p), s = $n(n, s), v = [];
          break;
        default:
          typeof p.onClick != "function" && typeof s.onClick == "function" && (n.onclick = Ol);
      }
      sn(l, s);
      var C;
      l = null;
      for (G in p) if (!s.hasOwnProperty(G) && p.hasOwnProperty(G) && p[G] != null) if (G === "style") {
        var D = p[G];
        for (C in D) D.hasOwnProperty(C) && (l || (l = {}), l[C] = "");
      } else G !== "dangerouslySetInnerHTML" && G !== "children" && G !== "suppressContentEditableWarning" && G !== "suppressHydrationWarning" && G !== "autoFocus" && (S.hasOwnProperty(G) ? v || (v = []) : (v = v || []).push(G, null));
      for (G in s) {
        var A = s[G];
        if (D = p != null ? p[G] : void 0, s.hasOwnProperty(G) && A !== D && (A != null || D != null)) if (G === "style") if (D) {
          for (C in D) !D.hasOwnProperty(C) || A && A.hasOwnProperty(C) || (l || (l = {}), l[C] = "");
          for (C in A) A.hasOwnProperty(C) && D[C] !== A[C] && (l || (l = {}), l[C] = A[C]);
        } else l || (v || (v = []), v.push(
          G,
          l
        )), l = A;
        else G === "dangerouslySetInnerHTML" ? (A = A ? A.__html : void 0, D = D ? D.__html : void 0, A != null && D !== A && (v = v || []).push(G, A)) : G === "children" ? typeof A != "string" && typeof A != "number" || (v = v || []).push(G, "" + A) : G !== "suppressContentEditableWarning" && G !== "suppressHydrationWarning" && (S.hasOwnProperty(G) ? (A != null && G === "onScroll" && Yt("scroll", n), v || D === A || (v = [])) : (v = v || []).push(G, A));
      }
      l && (v = v || []).push("style", l);
      var G = v;
      (r.updateQueue = G) && (r.flags |= 4);
    }
  }, Tv = function(n, r, l, s) {
    l !== s && (r.flags |= 4);
  };
  function Hs(n, r) {
    if (!pn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var s = null; l !== null; ) l.alternate !== null && (s = l), l = l.sibling;
        s === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : s.sibling = null;
    }
  }
  function er(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, s = 0;
    if (r) for (var p = n.child; p !== null; ) l |= p.lanes | p.childLanes, s |= p.subtreeFlags & 14680064, s |= p.flags & 14680064, p.return = n, p = p.sibling;
    else for (p = n.child; p !== null; ) l |= p.lanes | p.childLanes, s |= p.subtreeFlags, s |= p.flags, p.return = n, p = p.sibling;
    return n.subtreeFlags |= s, n.childLanes = l, r;
  }
  function bv(n, r, l) {
    var s = r.pendingProps;
    switch (Ic(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return er(r), null;
      case 1:
        return zn(r.type) && Ro(), er(r), null;
      case 3:
        return s = r.stateNode, ku(), on(Wn), on(xn), qe(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (n === null || n.child === null) && ($c(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, Na !== null && (Hu(Na), Na = null))), jn(n, r), er(r), null;
      case 5:
        Qc(r);
        var p = bu(_s.current);
        if (l = r.type, n !== null && r.stateNode != null) Rv(n, r, l, s, p), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!s) {
            if (r.stateNode === null) throw Error(d(166));
            return er(r), null;
          }
          if (n = bu(Di.current), $c(r)) {
            s = r.stateNode, l = r.type;
            var v = r.memoizedProps;
            switch (s[_i] = r, s[ys] = v, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Yt("cancel", s), Yt("close", s);
                break;
              case "iframe":
              case "object":
              case "embed":
                Yt("load", s);
                break;
              case "video":
              case "audio":
                for (p = 0; p < hs.length; p++) Yt(hs[p], s);
                break;
              case "source":
                Yt("error", s);
                break;
              case "img":
              case "image":
              case "link":
                Yt(
                  "error",
                  s
                ), Yt("load", s);
                break;
              case "details":
                Yt("toggle", s);
                break;
              case "input":
                Bn(s, v), Yt("invalid", s);
                break;
              case "select":
                s._wrapperState = { wasMultiple: !!v.multiple }, Yt("invalid", s);
                break;
              case "textarea":
                Sr(s, v), Yt("invalid", s);
            }
            sn(l, v), p = null;
            for (var C in v) if (v.hasOwnProperty(C)) {
              var D = v[C];
              C === "children" ? typeof D == "string" ? s.textContent !== D && (v.suppressHydrationWarning !== !0 && Uc(s.textContent, D, n), p = ["children", D]) : typeof D == "number" && s.textContent !== "" + D && (v.suppressHydrationWarning !== !0 && Uc(
                s.textContent,
                D,
                n
              ), p = ["children", "" + D]) : S.hasOwnProperty(C) && D != null && C === "onScroll" && Yt("scroll", s);
            }
            switch (l) {
              case "input":
                On(s), pi(s, v, !0);
                break;
              case "textarea":
                On(s), Nn(s);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof v.onClick == "function" && (s.onclick = Ol);
            }
            s = p, r.updateQueue = s, s !== null && (r.flags |= 4);
          } else {
            C = p.nodeType === 9 ? p : p.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Er(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = C.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof s.is == "string" ? n = C.createElement(l, { is: s.is }) : (n = C.createElement(l), l === "select" && (C = n, s.multiple ? C.multiple = !0 : s.size && (C.size = s.size))) : n = C.createElementNS(n, l), n[_i] = r, n[ys] = s, Ua(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (C = Kn(l, s), l) {
                case "dialog":
                  Yt("cancel", n), Yt("close", n), p = s;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Yt("load", n), p = s;
                  break;
                case "video":
                case "audio":
                  for (p = 0; p < hs.length; p++) Yt(hs[p], n);
                  p = s;
                  break;
                case "source":
                  Yt("error", n), p = s;
                  break;
                case "img":
                case "image":
                case "link":
                  Yt(
                    "error",
                    n
                  ), Yt("load", n), p = s;
                  break;
                case "details":
                  Yt("toggle", n), p = s;
                  break;
                case "input":
                  Bn(n, s), p = rr(n, s), Yt("invalid", n);
                  break;
                case "option":
                  p = s;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!s.multiple }, p = ne({}, s, { value: void 0 }), Yt("invalid", n);
                  break;
                case "textarea":
                  Sr(n, s), p = $n(n, s), Yt("invalid", n);
                  break;
                default:
                  p = s;
              }
              sn(l, p), D = p;
              for (v in D) if (D.hasOwnProperty(v)) {
                var A = D[v];
                v === "style" ? rn(n, A) : v === "dangerouslySetInnerHTML" ? (A = A ? A.__html : void 0, A != null && hi(n, A)) : v === "children" ? typeof A == "string" ? (l !== "textarea" || A !== "") && Ee(n, A) : typeof A == "number" && Ee(n, "" + A) : v !== "suppressContentEditableWarning" && v !== "suppressHydrationWarning" && v !== "autoFocus" && (S.hasOwnProperty(v) ? A != null && v === "onScroll" && Yt("scroll", n) : A != null && pe(n, v, A, C));
              }
              switch (l) {
                case "input":
                  On(n), pi(n, s, !1);
                  break;
                case "textarea":
                  On(n), Nn(n);
                  break;
                case "option":
                  s.value != null && n.setAttribute("value", "" + et(s.value));
                  break;
                case "select":
                  n.multiple = !!s.multiple, v = s.value, v != null ? wn(n, !!s.multiple, v, !1) : s.defaultValue != null && wn(
                    n,
                    !!s.multiple,
                    s.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof p.onClick == "function" && (n.onclick = Ol);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s = !!s.autoFocus;
                  break e;
                case "img":
                  s = !0;
                  break e;
                default:
                  s = !1;
              }
            }
            s && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return er(r), null;
      case 6:
        if (n && r.stateNode != null) Tv(n, r, n.memoizedProps, s);
        else {
          if (typeof s != "string" && r.stateNode === null) throw Error(d(166));
          if (l = bu(_s.current), bu(Di.current), $c(r)) {
            if (s = r.stateNode, l = r.memoizedProps, s[_i] = r, (v = s.nodeValue !== l) && (n = qr, n !== null)) switch (n.tag) {
              case 3:
                Uc(s.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Uc(s.nodeValue, l, (n.mode & 1) !== 0);
            }
            v && (r.flags |= 4);
          } else s = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(s), s[_i] = r, r.stateNode = s;
        }
        return er(r), null;
      case 13:
        if (on(Sn), s = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (pn && Kr !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0) Es(), Fl(), r.flags |= 98560, v = !1;
          else if (v = $c(r), s !== null && s.dehydrated !== null) {
            if (n === null) {
              if (!v) throw Error(d(318));
              if (v = r.memoizedState, v = v !== null ? v.dehydrated : null, !v) throw Error(d(317));
              v[_i] = r;
            } else Fl(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            er(r), v = !1;
          } else Na !== null && (Hu(Na), Na = null), v = !0;
          if (!v) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0 ? (r.lanes = l, r) : (s = s !== null, s !== (n !== null && n.memoizedState !== null) && s && (r.child.flags |= 8192, (r.mode & 1) !== 0 && (n === null || (Sn.current & 1) !== 0 ? kn === 0 && (kn = 3) : hp())), r.updateQueue !== null && (r.flags |= 4), er(r), null);
      case 4:
        return ku(), jn(n, r), n === null && Eo(r.stateNode.containerInfo), er(r), null;
      case 10:
        return Bd(r.type._context), er(r), null;
      case 17:
        return zn(r.type) && Ro(), er(r), null;
      case 19:
        if (on(Sn), v = r.memoizedState, v === null) return er(r), null;
        if (s = (r.flags & 128) !== 0, C = v.rendering, C === null) if (s) Hs(v, !1);
        else {
          if (kn !== 0 || n !== null && (n.flags & 128) !== 0) for (n = r.child; n !== null; ) {
            if (C = Gc(n), C !== null) {
              for (r.flags |= 128, Hs(v, !1), s = C.updateQueue, s !== null && (r.updateQueue = s, r.flags |= 4), r.subtreeFlags = 0, s = l, l = r.child; l !== null; ) v = l, n = s, v.flags &= 14680066, C = v.alternate, C === null ? (v.childLanes = 0, v.lanes = n, v.child = null, v.subtreeFlags = 0, v.memoizedProps = null, v.memoizedState = null, v.updateQueue = null, v.dependencies = null, v.stateNode = null) : (v.childLanes = C.childLanes, v.lanes = C.lanes, v.child = C.child, v.subtreeFlags = 0, v.deletions = null, v.memoizedProps = C.memoizedProps, v.memoizedState = C.memoizedState, v.updateQueue = C.updateQueue, v.type = C.type, n = C.dependencies, v.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Qe(Sn, Sn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          v.tail !== null && vt() > zo && (r.flags |= 128, s = !0, Hs(v, !1), r.lanes = 4194304);
        }
        else {
          if (!s) if (n = Gc(C), n !== null) {
            if (r.flags |= 128, s = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Hs(v, !0), v.tail === null && v.tailMode === "hidden" && !C.alternate && !pn) return er(r), null;
          } else 2 * vt() - v.renderingStartTime > zo && l !== 1073741824 && (r.flags |= 128, s = !0, Hs(v, !1), r.lanes = 4194304);
          v.isBackwards ? (C.sibling = r.child, r.child = C) : (l = v.last, l !== null ? l.sibling = C : r.child = C, v.last = C);
        }
        return v.tail !== null ? (r = v.tail, v.rendering = r, v.tail = r.sibling, v.renderingStartTime = vt(), r.sibling = null, l = Sn.current, Qe(Sn, s ? l & 1 | 2 : l & 1), r) : (er(r), null);
      case 22:
      case 23:
        return pp(), s = r.memoizedState !== null, n !== null && n.memoizedState !== null !== s && (r.flags |= 8192), s && (r.mode & 1) !== 0 ? (ya & 1073741824) !== 0 && (er(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : er(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(d(156, r.tag));
  }
  function gf(n, r) {
    switch (Ic(r), r.tag) {
      case 1:
        return zn(r.type) && Ro(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return ku(), on(Wn), on(xn), qe(), n = r.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Qc(r), null;
      case 13:
        if (on(Sn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(d(340));
          Fl();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return on(Sn), null;
      case 4:
        return ku(), null;
      case 10:
        return Bd(r.type._context), null;
      case 22:
      case 23:
        return pp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ps = !1, _r = !1, dg = typeof WeakSet == "function" ? WeakSet : Set, Ae = null;
  function Oo(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (s) {
      hn(n, r, s);
    }
    else l.current = null;
  }
  function Sf(n, r, l) {
    try {
      l();
    } catch (s) {
      hn(n, r, s);
    }
  }
  var kv = !1;
  function Dv(n, r) {
    if (ms = ba, n = ds(), kc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var s = l.getSelection && l.getSelection();
        if (s && s.rangeCount !== 0) {
          l = s.anchorNode;
          var p = s.anchorOffset, v = s.focusNode;
          s = s.focusOffset;
          try {
            l.nodeType, v.nodeType;
          } catch {
            l = null;
            break e;
          }
          var C = 0, D = -1, A = -1, G = 0, ce = 0, he = n, oe = null;
          t: for (; ; ) {
            for (var Ne; he !== l || p !== 0 && he.nodeType !== 3 || (D = C + p), he !== v || s !== 0 && he.nodeType !== 3 || (A = C + s), he.nodeType === 3 && (C += he.nodeValue.length), (Ne = he.firstChild) !== null; )
              oe = he, he = Ne;
            for (; ; ) {
              if (he === n) break t;
              if (oe === l && ++G === p && (D = C), oe === v && ++ce === s && (A = C), (Ne = he.nextSibling) !== null) break;
              he = oe, oe = he.parentNode;
            }
            he = Ne;
          }
          l = D === -1 || A === -1 ? null : { start: D, end: A };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (xu = { focusedElem: n, selectionRange: l }, ba = !1, Ae = r; Ae !== null; ) if (r = Ae, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, Ae = n;
    else for (; Ae !== null; ) {
      r = Ae;
      try {
        var Ve = r.alternate;
        if ((r.flags & 1024) !== 0) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Ve !== null) {
              var $e = Ve.memoizedProps, Dn = Ve.memoizedState, B = r.stateNode, j = B.getSnapshotBeforeUpdate(r.elementType === r.type ? $e : li(r.type, $e), Dn);
              B.__reactInternalSnapshotBeforeUpdate = j;
            }
            break;
          case 3:
            var Y = r.stateNode.containerInfo;
            Y.nodeType === 1 ? Y.textContent = "" : Y.nodeType === 9 && Y.documentElement && Y.removeChild(Y.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(d(163));
        }
      } catch (fe) {
        hn(r, r.return, fe);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, Ae = n;
        break;
      }
      Ae = r.return;
    }
    return Ve = kv, kv = !1, Ve;
  }
  function Vs(n, r, l) {
    var s = r.updateQueue;
    if (s = s !== null ? s.lastEffect : null, s !== null) {
      var p = s = s.next;
      do {
        if ((p.tag & n) === n) {
          var v = p.destroy;
          p.destroy = void 0, v !== void 0 && Sf(r, l, v);
        }
        p = p.next;
      } while (p !== s);
    }
  }
  function Bs(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var s = l.create;
          l.destroy = s();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function lp(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function Ef(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Ef(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[_i], delete r[ys], delete r[gs], delete r[_o], delete r[cg])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Is(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function tl(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Is(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Oi(n, r, l) {
    var s = n.tag;
    if (s === 5 || s === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Ol));
    else if (s !== 4 && (n = n.child, n !== null)) for (Oi(n, r, l), n = n.sibling; n !== null; ) Oi(n, r, l), n = n.sibling;
  }
  function Ni(n, r, l) {
    var s = n.tag;
    if (s === 5 || s === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (s !== 4 && (n = n.child, n !== null)) for (Ni(n, r, l), n = n.sibling; n !== null; ) Ni(n, r, l), n = n.sibling;
  }
  var bn = null, Lr = !1;
  function zr(n, r, l) {
    for (l = l.child; l !== null; ) Mv(n, r, l), l = l.sibling;
  }
  function Mv(n, r, l) {
    if (Wr && typeof Wr.onCommitFiberUnmount == "function") try {
      Wr.onCommitFiberUnmount(Cl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        _r || Oo(l, r);
      case 6:
        var s = bn, p = Lr;
        bn = null, zr(n, r, l), bn = s, Lr = p, bn !== null && (Lr ? (n = bn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : bn.removeChild(l.stateNode));
        break;
      case 18:
        bn !== null && (Lr ? (n = bn, l = l.stateNode, n.nodeType === 8 ? wo(n.parentNode, l) : n.nodeType === 1 && wo(n, l), ti(n)) : wo(bn, l.stateNode));
        break;
      case 4:
        s = bn, p = Lr, bn = l.stateNode.containerInfo, Lr = !0, zr(n, r, l), bn = s, Lr = p;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!_r && (s = l.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
          p = s = s.next;
          do {
            var v = p, C = v.destroy;
            v = v.tag, C !== void 0 && ((v & 2) !== 0 || (v & 4) !== 0) && Sf(l, r, C), p = p.next;
          } while (p !== s);
        }
        zr(n, r, l);
        break;
      case 1:
        if (!_r && (Oo(l, r), s = l.stateNode, typeof s.componentWillUnmount == "function")) try {
          s.props = l.memoizedProps, s.state = l.memoizedState, s.componentWillUnmount();
        } catch (D) {
          hn(l, r, D);
        }
        zr(n, r, l);
        break;
      case 21:
        zr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (_r = (s = _r) || l.memoizedState !== null, zr(n, r, l), _r = s) : zr(n, r, l);
        break;
      default:
        zr(n, r, l);
    }
  }
  function Ov(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new dg()), r.forEach(function(s) {
        var p = Pv.bind(null, n, s);
        l.has(s) || (l.add(s), s.then(p, p));
      });
    }
  }
  function ui(n, r) {
    var l = r.deletions;
    if (l !== null) for (var s = 0; s < l.length; s++) {
      var p = l[s];
      try {
        var v = n, C = r, D = C;
        e: for (; D !== null; ) {
          switch (D.tag) {
            case 5:
              bn = D.stateNode, Lr = !1;
              break e;
            case 3:
              bn = D.stateNode.containerInfo, Lr = !0;
              break e;
            case 4:
              bn = D.stateNode.containerInfo, Lr = !0;
              break e;
          }
          D = D.return;
        }
        if (bn === null) throw Error(d(160));
        Mv(v, C, p), bn = null, Lr = !1;
        var A = p.alternate;
        A !== null && (A.return = null), p.return = null;
      } catch (G) {
        hn(p, r, G);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) up(r, n), r = r.sibling;
  }
  function up(n, r) {
    var l = n.alternate, s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ui(r, n), ta(n), s & 4) {
          try {
            Vs(3, n, n.return), Bs(3, n);
          } catch ($e) {
            hn(n, n.return, $e);
          }
          try {
            Vs(5, n, n.return);
          } catch ($e) {
            hn(n, n.return, $e);
          }
        }
        break;
      case 1:
        ui(r, n), ta(n), s & 512 && l !== null && Oo(l, l.return);
        break;
      case 5:
        if (ui(r, n), ta(n), s & 512 && l !== null && Oo(l, l.return), n.flags & 32) {
          var p = n.stateNode;
          try {
            Ee(p, "");
          } catch ($e) {
            hn(n, n.return, $e);
          }
        }
        if (s & 4 && (p = n.stateNode, p != null)) {
          var v = n.memoizedProps, C = l !== null ? l.memoizedProps : v, D = n.type, A = n.updateQueue;
          if (n.updateQueue = null, A !== null) try {
            D === "input" && v.type === "radio" && v.name != null && In(p, v), Kn(D, C);
            var G = Kn(D, v);
            for (C = 0; C < A.length; C += 2) {
              var ce = A[C], he = A[C + 1];
              ce === "style" ? rn(p, he) : ce === "dangerouslySetInnerHTML" ? hi(p, he) : ce === "children" ? Ee(p, he) : pe(p, ce, he, G);
            }
            switch (D) {
              case "input":
                Yr(p, v);
                break;
              case "textarea":
                Qa(p, v);
                break;
              case "select":
                var oe = p._wrapperState.wasMultiple;
                p._wrapperState.wasMultiple = !!v.multiple;
                var Ne = v.value;
                Ne != null ? wn(p, !!v.multiple, Ne, !1) : oe !== !!v.multiple && (v.defaultValue != null ? wn(
                  p,
                  !!v.multiple,
                  v.defaultValue,
                  !0
                ) : wn(p, !!v.multiple, v.multiple ? [] : "", !1));
            }
            p[ys] = v;
          } catch ($e) {
            hn(n, n.return, $e);
          }
        }
        break;
      case 6:
        if (ui(r, n), ta(n), s & 4) {
          if (n.stateNode === null) throw Error(d(162));
          p = n.stateNode, v = n.memoizedProps;
          try {
            p.nodeValue = v;
          } catch ($e) {
            hn(n, n.return, $e);
          }
        }
        break;
      case 3:
        if (ui(r, n), ta(n), s & 4 && l !== null && l.memoizedState.isDehydrated) try {
          ti(r.containerInfo);
        } catch ($e) {
          hn(n, n.return, $e);
        }
        break;
      case 4:
        ui(r, n), ta(n);
        break;
      case 13:
        ui(r, n), ta(n), p = n.child, p.flags & 8192 && (v = p.memoizedState !== null, p.stateNode.isHidden = v, !v || p.alternate !== null && p.alternate.memoizedState !== null || (cp = vt())), s & 4 && Ov(n);
        break;
      case 22:
        if (ce = l !== null && l.memoizedState !== null, n.mode & 1 ? (_r = (G = _r) || ce, ui(r, n), _r = G) : ui(r, n), ta(n), s & 8192) {
          if (G = n.memoizedState !== null, (n.stateNode.isHidden = G) && !ce && (n.mode & 1) !== 0) for (Ae = n, ce = n.child; ce !== null; ) {
            for (he = Ae = ce; Ae !== null; ) {
              switch (oe = Ae, Ne = oe.child, oe.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Vs(4, oe, oe.return);
                  break;
                case 1:
                  Oo(oe, oe.return);
                  var Ve = oe.stateNode;
                  if (typeof Ve.componentWillUnmount == "function") {
                    s = oe, l = oe.return;
                    try {
                      r = s, Ve.props = r.memoizedProps, Ve.state = r.memoizedState, Ve.componentWillUnmount();
                    } catch ($e) {
                      hn(s, l, $e);
                    }
                  }
                  break;
                case 5:
                  Oo(oe, oe.return);
                  break;
                case 22:
                  if (oe.memoizedState !== null) {
                    $s(he);
                    continue;
                  }
              }
              Ne !== null ? (Ne.return = oe, Ae = Ne) : $s(he);
            }
            ce = ce.sibling;
          }
          e: for (ce = null, he = n; ; ) {
            if (he.tag === 5) {
              if (ce === null) {
                ce = he;
                try {
                  p = he.stateNode, G ? (v = p.style, typeof v.setProperty == "function" ? v.setProperty("display", "none", "important") : v.display = "none") : (D = he.stateNode, A = he.memoizedProps.style, C = A != null && A.hasOwnProperty("display") ? A.display : null, D.style.display = $t("display", C));
                } catch ($e) {
                  hn(n, n.return, $e);
                }
              }
            } else if (he.tag === 6) {
              if (ce === null) try {
                he.stateNode.nodeValue = G ? "" : he.memoizedProps;
              } catch ($e) {
                hn(n, n.return, $e);
              }
            } else if ((he.tag !== 22 && he.tag !== 23 || he.memoizedState === null || he === n) && he.child !== null) {
              he.child.return = he, he = he.child;
              continue;
            }
            if (he === n) break e;
            for (; he.sibling === null; ) {
              if (he.return === null || he.return === n) break e;
              ce === he && (ce = null), he = he.return;
            }
            ce === he && (ce = null), he.sibling.return = he.return, he = he.sibling;
          }
        }
        break;
      case 19:
        ui(r, n), ta(n), s & 4 && Ov(n);
        break;
      case 21:
        break;
      default:
        ui(
          r,
          n
        ), ta(n);
    }
  }
  function ta(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Is(l)) {
              var s = l;
              break e;
            }
            l = l.return;
          }
          throw Error(d(160));
        }
        switch (s.tag) {
          case 5:
            var p = s.stateNode;
            s.flags & 32 && (Ee(p, ""), s.flags &= -33);
            var v = tl(n);
            Ni(n, v, p);
            break;
          case 3:
          case 4:
            var C = s.stateNode.containerInfo, D = tl(n);
            Oi(n, D, C);
            break;
          default:
            throw Error(d(161));
        }
      } catch (A) {
        hn(n, n.return, A);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function pg(n, r, l) {
    Ae = n, op(n);
  }
  function op(n, r, l) {
    for (var s = (n.mode & 1) !== 0; Ae !== null; ) {
      var p = Ae, v = p.child;
      if (p.tag === 22 && s) {
        var C = p.memoizedState !== null || Ps;
        if (!C) {
          var D = p.alternate, A = D !== null && D.memoizedState !== null || _r;
          D = Ps;
          var G = _r;
          if (Ps = C, (_r = A) && !G) for (Ae = p; Ae !== null; ) C = Ae, A = C.child, C.tag === 22 && C.memoizedState !== null ? sp(p) : A !== null ? (A.return = C, Ae = A) : sp(p);
          for (; v !== null; ) Ae = v, op(v), v = v.sibling;
          Ae = p, Ps = D, _r = G;
        }
        Nv(n);
      } else (p.subtreeFlags & 8772) !== 0 && v !== null ? (v.return = p, Ae = v) : Nv(n);
    }
  }
  function Nv(n) {
    for (; Ae !== null; ) {
      var r = Ae;
      if ((r.flags & 8772) !== 0) {
        var l = r.alternate;
        try {
          if ((r.flags & 8772) !== 0) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              _r || Bs(5, r);
              break;
            case 1:
              var s = r.stateNode;
              if (r.flags & 4 && !_r) if (l === null) s.componentDidMount();
              else {
                var p = r.elementType === r.type ? l.memoizedProps : li(r.type, l.memoizedProps);
                s.componentDidUpdate(p, l.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
              }
              var v = r.updateQueue;
              v !== null && Qd(r, v, s);
              break;
            case 3:
              var C = r.updateQueue;
              if (C !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Qd(r, C, l);
              }
              break;
            case 5:
              var D = r.stateNode;
              if (l === null && r.flags & 4) {
                l = D;
                var A = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    A.autoFocus && l.focus();
                    break;
                  case "img":
                    A.src && (l.src = A.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var G = r.alternate;
                if (G !== null) {
                  var ce = G.memoizedState;
                  if (ce !== null) {
                    var he = ce.dehydrated;
                    he !== null && ti(he);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(d(163));
          }
          _r || r.flags & 512 && lp(r);
        } catch (oe) {
          hn(r, r.return, oe);
        }
      }
      if (r === n) {
        Ae = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, Ae = l;
        break;
      }
      Ae = r.return;
    }
  }
  function $s(n) {
    for (; Ae !== null; ) {
      var r = Ae;
      if (r === n) {
        Ae = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, Ae = l;
        break;
      }
      Ae = r.return;
    }
  }
  function sp(n) {
    for (; Ae !== null; ) {
      var r = Ae;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Bs(4, r);
            } catch (A) {
              hn(r, l, A);
            }
            break;
          case 1:
            var s = r.stateNode;
            if (typeof s.componentDidMount == "function") {
              var p = r.return;
              try {
                s.componentDidMount();
              } catch (A) {
                hn(r, p, A);
              }
            }
            var v = r.return;
            try {
              lp(r);
            } catch (A) {
              hn(r, v, A);
            }
            break;
          case 5:
            var C = r.return;
            try {
              lp(r);
            } catch (A) {
              hn(r, C, A);
            }
        }
      } catch (A) {
        hn(r, r.return, A);
      }
      if (r === n) {
        Ae = null;
        break;
      }
      var D = r.sibling;
      if (D !== null) {
        D.return = r.return, Ae = D;
        break;
      }
      Ae = r.return;
    }
  }
  var hg = Math.ceil, Bl = De.ReactCurrentDispatcher, Fu = De.ReactCurrentOwner, sr = De.ReactCurrentBatchConfig, Nt = 0, Gn = null, Hn = null, cr = 0, ya = 0, No = Ma(0), kn = 0, Ys = null, Li = 0, Lo = 0, xf = 0, Ws = null, na = null, cp = 0, zo = 1 / 0, ga = null, Ao = !1, ju = null, Il = null, Cf = !1, nl = null, Qs = 0, $l = 0, Uo = null, Gs = -1, Rr = 0;
  function Pn() {
    return (Nt & 6) !== 0 ? vt() : Gs !== -1 ? Gs : Gs = vt();
  }
  function zi(n) {
    return (n.mode & 1) === 0 ? 1 : (Nt & 2) !== 0 && cr !== 0 ? cr & -cr : fg.transition !== null ? (Rr === 0 && (Rr = uo()), Rr) : (n = jt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : vo(n.type)), n);
  }
  function Ar(n, r, l, s) {
    if (50 < $l) throw $l = 0, Uo = null, Error(d(185));
    Ii(n, l, s), ((Nt & 2) === 0 || n !== Gn) && (n === Gn && ((Nt & 2) === 0 && (Lo |= l), kn === 4 && oi(n, cr)), ra(n, s), l === 1 && Nt === 0 && (r.mode & 1) === 0 && (zo = vt() + 500, To && Ti()));
  }
  function ra(n, r) {
    var l = n.callbackNode;
    du(n, r);
    var s = ei(n, n === Gn ? cr : 0);
    if (s === 0) l !== null && ir(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = s & -s, n.callbackPriority !== r) {
      if (l != null && ir(l), r === 1) n.tag === 0 ? Ll(fp.bind(null, n)) : Vc(fp.bind(null, n)), Co(function() {
        (Nt & 6) === 0 && Ti();
      }), l = null;
      else {
        switch (so(s)) {
          case 1:
            l = Za;
            break;
          case 4:
            l = cu;
            break;
          case 16:
            l = fu;
            break;
          case 536870912:
            l = ao;
            break;
          default:
            l = fu;
        }
        l = Bv(l, wf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function wf(n, r) {
    if (Gs = -1, Rr = 0, (Nt & 6) !== 0) throw Error(d(327));
    var l = n.callbackNode;
    if (Fo() && n.callbackNode !== l) return null;
    var s = ei(n, n === Gn ? cr : 0);
    if (s === 0) return null;
    if ((s & 30) !== 0 || (s & n.expiredLanes) !== 0 || r) r = _f(n, s);
    else {
      r = s;
      var p = Nt;
      Nt |= 2;
      var v = zv();
      (Gn !== n || cr !== r) && (ga = null, zo = vt() + 500, rl(n, r));
      do
        try {
          Av();
          break;
        } catch (D) {
          Lv(n, D);
        }
      while (!0);
      Vd(), Bl.current = v, Nt = p, Hn !== null ? r = 0 : (Gn = null, cr = 0, r = kn);
    }
    if (r !== 0) {
      if (r === 2 && (p = _l(n), p !== 0 && (s = p, r = Xs(n, p))), r === 1) throw l = Ys, rl(n, 0), oi(n, s), ra(n, vt()), l;
      if (r === 6) oi(n, s);
      else {
        if (p = n.current.alternate, (s & 30) === 0 && !vg(p) && (r = _f(n, s), r === 2 && (v = _l(n), v !== 0 && (s = v, r = Xs(n, v))), r === 1)) throw l = Ys, rl(n, 0), oi(n, s), ra(n, vt()), l;
        switch (n.finishedWork = p, n.finishedLanes = s, r) {
          case 0:
          case 1:
            throw Error(d(345));
          case 2:
            Vu(n, na, ga);
            break;
          case 3:
            if (oi(n, s), (s & 130023424) === s && (r = cp + 500 - vt(), 10 < r)) {
              if (ei(n, 0) !== 0) break;
              if (p = n.suspendedLanes, (p & s) !== s) {
                Pn(), n.pingedLanes |= n.suspendedLanes & p;
                break;
              }
              n.timeoutHandle = jc(Vu.bind(null, n, na, ga), r);
              break;
            }
            Vu(n, na, ga);
            break;
          case 4:
            if (oi(n, s), (s & 4194240) === s) break;
            for (r = n.eventTimes, p = -1; 0 < s; ) {
              var C = 31 - Dr(s);
              v = 1 << C, C = r[C], C > p && (p = C), s &= ~v;
            }
            if (s = p, s = vt() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * hg(s / 1960)) - s, 10 < s) {
              n.timeoutHandle = jc(Vu.bind(null, n, na, ga), s);
              break;
            }
            Vu(n, na, ga);
            break;
          case 5:
            Vu(n, na, ga);
            break;
          default:
            throw Error(d(329));
        }
      }
    }
    return ra(n, vt()), n.callbackNode === l ? wf.bind(null, n) : null;
  }
  function Xs(n, r) {
    var l = Ws;
    return n.current.memoizedState.isDehydrated && (rl(n, r).flags |= 256), n = _f(n, r), n !== 2 && (r = na, na = l, r !== null && Hu(r)), n;
  }
  function Hu(n) {
    na === null ? na = n : na.push.apply(na, n);
  }
  function vg(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var s = 0; s < l.length; s++) {
          var p = l[s], v = p.getSnapshot;
          p = p.value;
          try {
            if (!ri(v(), p)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function oi(n, r) {
    for (r &= ~xf, r &= ~Lo, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Dr(r), s = 1 << l;
      n[l] = -1, r &= ~s;
    }
  }
  function fp(n) {
    if ((Nt & 6) !== 0) throw Error(d(327));
    Fo();
    var r = ei(n, 0);
    if ((r & 1) === 0) return ra(n, vt()), null;
    var l = _f(n, r);
    if (n.tag !== 0 && l === 2) {
      var s = _l(n);
      s !== 0 && (r = s, l = Xs(n, s));
    }
    if (l === 1) throw l = Ys, rl(n, 0), oi(n, r), ra(n, vt()), l;
    if (l === 6) throw Error(d(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Vu(n, na, ga), ra(n, vt()), null;
  }
  function dp(n, r) {
    var l = Nt;
    Nt |= 1;
    try {
      return n(r);
    } finally {
      Nt = l, Nt === 0 && (zo = vt() + 500, To && Ti());
    }
  }
  function Pu(n) {
    nl !== null && nl.tag === 0 && (Nt & 6) === 0 && Fo();
    var r = Nt;
    Nt |= 1;
    var l = sr.transition, s = jt;
    try {
      if (sr.transition = null, jt = 1, n) return n();
    } finally {
      jt = s, sr.transition = l, Nt = r, (Nt & 6) === 0 && Ti();
    }
  }
  function pp() {
    ya = No.current, on(No);
  }
  function rl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Ud(l)), Hn !== null) for (l = Hn.return; l !== null; ) {
      var s = l;
      switch (Ic(s), s.tag) {
        case 1:
          s = s.type.childContextTypes, s != null && Ro();
          break;
        case 3:
          ku(), on(Wn), on(xn), qe();
          break;
        case 5:
          Qc(s);
          break;
        case 4:
          ku();
          break;
        case 13:
          on(Sn);
          break;
        case 19:
          on(Sn);
          break;
        case 10:
          Bd(s.type._context);
          break;
        case 22:
        case 23:
          pp();
      }
      l = l.return;
    }
    if (Gn = n, Hn = n = Yl(n.current, null), cr = ya = r, kn = 0, Ys = null, xf = Lo = Li = 0, na = Ws = null, Tu !== null) {
      for (r = 0; r < Tu.length; r++) if (l = Tu[r], s = l.interleaved, s !== null) {
        l.interleaved = null;
        var p = s.next, v = l.pending;
        if (v !== null) {
          var C = v.next;
          v.next = p, s.next = C;
        }
        l.pending = s;
      }
      Tu = null;
    }
    return n;
  }
  function Lv(n, r) {
    do {
      var l = Hn;
      try {
        if (Vd(), Ct.current = zu, Xc) {
          for (var s = Pt.memoizedState; s !== null; ) {
            var p = s.queue;
            p !== null && (p.pending = null), s = s.next;
          }
          Xc = !1;
        }
        if (Jt = 0, Jn = Un = Pt = null, Ts = !1, Du = 0, Fu.current = null, l === null || l.return === null) {
          kn = 1, Ys = r, Hn = null;
          break;
        }
        e: {
          var v = n, C = l.return, D = l, A = r;
          if (r = cr, D.flags |= 32768, A !== null && typeof A == "object" && typeof A.then == "function") {
            var G = A, ce = D, he = ce.tag;
            if ((ce.mode & 1) === 0 && (he === 0 || he === 11 || he === 15)) {
              var oe = ce.alternate;
              oe ? (ce.updateQueue = oe.updateQueue, ce.memoizedState = oe.memoizedState, ce.lanes = oe.lanes) : (ce.updateQueue = null, ce.memoizedState = null);
            }
            var Ne = Ev(C);
            if (Ne !== null) {
              Ne.flags &= -257, Vl(Ne, C, D, v, r), Ne.mode & 1 && tp(v, G, r), r = Ne, A = G;
              var Ve = r.updateQueue;
              if (Ve === null) {
                var $e = /* @__PURE__ */ new Set();
                $e.add(A), r.updateQueue = $e;
              } else Ve.add(A);
              break e;
            } else {
              if ((r & 1) === 0) {
                tp(v, G, r), hp();
                break e;
              }
              A = Error(d(426));
            }
          } else if (pn && D.mode & 1) {
            var Dn = Ev(C);
            if (Dn !== null) {
              (Dn.flags & 65536) === 0 && (Dn.flags |= 256), Vl(Dn, C, D, v, r), Zi(Au(A, D));
              break e;
            }
          }
          v = A = Au(A, D), kn !== 4 && (kn = 2), Ws === null ? Ws = [v] : Ws.push(v), v = C;
          do {
            switch (v.tag) {
              case 3:
                v.flags |= 65536, r &= -r, v.lanes |= r;
                var B = Sv(v, A, r);
                hv(v, B);
                break e;
              case 1:
                D = A;
                var j = v.type, Y = v.stateNode;
                if ((v.flags & 128) === 0 && (typeof j.getDerivedStateFromError == "function" || Y !== null && typeof Y.componentDidCatch == "function" && (Il === null || !Il.has(Y)))) {
                  v.flags |= 65536, r &= -r, v.lanes |= r;
                  var fe = ep(v, D, r);
                  hv(v, fe);
                  break e;
                }
            }
            v = v.return;
          } while (v !== null);
        }
        Fv(l);
      } catch (Be) {
        r = Be, Hn === l && l !== null && (Hn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function zv() {
    var n = Bl.current;
    return Bl.current = zu, n === null ? zu : n;
  }
  function hp() {
    (kn === 0 || kn === 3 || kn === 2) && (kn = 4), Gn === null || (Li & 268435455) === 0 && (Lo & 268435455) === 0 || oi(Gn, cr);
  }
  function _f(n, r) {
    var l = Nt;
    Nt |= 2;
    var s = zv();
    (Gn !== n || cr !== r) && (ga = null, rl(n, r));
    do
      try {
        mg();
        break;
      } catch (p) {
        Lv(n, p);
      }
    while (!0);
    if (Vd(), Nt = l, Bl.current = s, Hn !== null) throw Error(d(261));
    return Gn = null, cr = 0, kn;
  }
  function mg() {
    for (; Hn !== null; ) Uv(Hn);
  }
  function Av() {
    for (; Hn !== null && !qa(); ) Uv(Hn);
  }
  function Uv(n) {
    var r = Vv(n.alternate, n, ya);
    n.memoizedProps = n.pendingProps, r === null ? Fv(n) : Hn = r, Fu.current = null;
  }
  function Fv(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, (r.flags & 32768) === 0) {
        if (l = bv(l, r, ya), l !== null) {
          Hn = l;
          return;
        }
      } else {
        if (l = gf(l, r), l !== null) {
          l.flags &= 32767, Hn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          kn = 6, Hn = null;
          return;
        }
      }
      if (r = r.sibling, r !== null) {
        Hn = r;
        return;
      }
      Hn = r = n;
    } while (r !== null);
    kn === 0 && (kn = 5);
  }
  function Vu(n, r, l) {
    var s = jt, p = sr.transition;
    try {
      sr.transition = null, jt = 1, yg(n, r, l, s);
    } finally {
      sr.transition = p, jt = s;
    }
    return null;
  }
  function yg(n, r, l, s) {
    do
      Fo();
    while (nl !== null);
    if ((Nt & 6) !== 0) throw Error(d(327));
    l = n.finishedWork;
    var p = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(d(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var v = l.lanes | l.childLanes;
    if (vd(n, v), n === Gn && (Hn = Gn = null, cr = 0), (l.subtreeFlags & 2064) === 0 && (l.flags & 2064) === 0 || Cf || (Cf = !0, Bv(fu, function() {
      return Fo(), null;
    })), v = (l.flags & 15990) !== 0, (l.subtreeFlags & 15990) !== 0 || v) {
      v = sr.transition, sr.transition = null;
      var C = jt;
      jt = 1;
      var D = Nt;
      Nt |= 4, Fu.current = null, Dv(n, l), up(l, n), go(xu), ba = !!ms, xu = ms = null, n.current = l, pg(l), Ka(), Nt = D, jt = C, sr.transition = v;
    } else n.current = l;
    if (Cf && (Cf = !1, nl = n, Qs = p), v = n.pendingLanes, v === 0 && (Il = null), ns(l.stateNode), ra(n, vt()), r !== null) for (s = n.onRecoverableError, l = 0; l < r.length; l++) p = r[l], s(p.value, { componentStack: p.stack, digest: p.digest });
    if (Ao) throw Ao = !1, n = ju, ju = null, n;
    return (Qs & 1) !== 0 && n.tag !== 0 && Fo(), v = n.pendingLanes, (v & 1) !== 0 ? n === Uo ? $l++ : ($l = 0, Uo = n) : $l = 0, Ti(), null;
  }
  function Fo() {
    if (nl !== null) {
      var n = so(Qs), r = sr.transition, l = jt;
      try {
        if (sr.transition = null, jt = 16 > n ? 16 : n, nl === null) var s = !1;
        else {
          if (n = nl, nl = null, Qs = 0, (Nt & 6) !== 0) throw Error(d(331));
          var p = Nt;
          for (Nt |= 4, Ae = n.current; Ae !== null; ) {
            var v = Ae, C = v.child;
            if ((Ae.flags & 16) !== 0) {
              var D = v.deletions;
              if (D !== null) {
                for (var A = 0; A < D.length; A++) {
                  var G = D[A];
                  for (Ae = G; Ae !== null; ) {
                    var ce = Ae;
                    switch (ce.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Vs(8, ce, v);
                    }
                    var he = ce.child;
                    if (he !== null) he.return = ce, Ae = he;
                    else for (; Ae !== null; ) {
                      ce = Ae;
                      var oe = ce.sibling, Ne = ce.return;
                      if (Ef(ce), ce === G) {
                        Ae = null;
                        break;
                      }
                      if (oe !== null) {
                        oe.return = Ne, Ae = oe;
                        break;
                      }
                      Ae = Ne;
                    }
                  }
                }
                var Ve = v.alternate;
                if (Ve !== null) {
                  var $e = Ve.child;
                  if ($e !== null) {
                    Ve.child = null;
                    do {
                      var Dn = $e.sibling;
                      $e.sibling = null, $e = Dn;
                    } while ($e !== null);
                  }
                }
                Ae = v;
              }
            }
            if ((v.subtreeFlags & 2064) !== 0 && C !== null) C.return = v, Ae = C;
            else e: for (; Ae !== null; ) {
              if (v = Ae, (v.flags & 2048) !== 0) switch (v.tag) {
                case 0:
                case 11:
                case 15:
                  Vs(9, v, v.return);
              }
              var B = v.sibling;
              if (B !== null) {
                B.return = v.return, Ae = B;
                break e;
              }
              Ae = v.return;
            }
          }
          var j = n.current;
          for (Ae = j; Ae !== null; ) {
            C = Ae;
            var Y = C.child;
            if ((C.subtreeFlags & 2064) !== 0 && Y !== null) Y.return = C, Ae = Y;
            else e: for (C = j; Ae !== null; ) {
              if (D = Ae, (D.flags & 2048) !== 0) try {
                switch (D.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Bs(9, D);
                }
              } catch (Be) {
                hn(D, D.return, Be);
              }
              if (D === C) {
                Ae = null;
                break e;
              }
              var fe = D.sibling;
              if (fe !== null) {
                fe.return = D.return, Ae = fe;
                break e;
              }
              Ae = D.return;
            }
          }
          if (Nt = p, Ti(), Wr && typeof Wr.onPostCommitFiberRoot == "function") try {
            Wr.onPostCommitFiberRoot(Cl, n);
          } catch {
          }
          s = !0;
        }
        return s;
      } finally {
        jt = l, sr.transition = r;
      }
    }
    return !1;
  }
  function jv(n, r, l) {
    r = Au(l, r), r = Sv(n, r, 1), n = jl(n, r, 1), r = Pn(), n !== null && (Ii(n, 1, r), ra(n, r));
  }
  function hn(n, r, l) {
    if (n.tag === 3) jv(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        jv(r, n, l);
        break;
      } else if (r.tag === 1) {
        var s = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Il === null || !Il.has(s))) {
          n = Au(l, n), n = ep(r, n, 1), r = jl(r, n, 1), n = Pn(), r !== null && (Ii(r, 1, n), ra(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function gg(n, r, l) {
    var s = n.pingCache;
    s !== null && s.delete(r), r = Pn(), n.pingedLanes |= n.suspendedLanes & l, Gn === n && (cr & l) === l && (kn === 4 || kn === 3 && (cr & 130023424) === cr && 500 > vt() - cp ? rl(n, 0) : xf |= l), ra(n, r);
  }
  function Hv(n, r) {
    r === 0 && ((n.mode & 1) === 0 ? r = 1 : (r = da, da <<= 1, (da & 130023424) === 0 && (da = 4194304)));
    var l = Pn();
    n = va(n, r), n !== null && (Ii(n, r, l), ra(n, l));
  }
  function Sg(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Hv(n, l);
  }
  function Pv(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var s = n.stateNode, p = n.memoizedState;
        p !== null && (l = p.retryLane);
        break;
      case 19:
        s = n.stateNode;
        break;
      default:
        throw Error(d(314));
    }
    s !== null && s.delete(r), Hv(n, l);
  }
  var Vv;
  Vv = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Wn.current) Fn = !0;
    else {
      if ((n.lanes & l) === 0 && (r.flags & 128) === 0) return Fn = !1, js(n, r, l);
      Fn = (n.flags & 131072) !== 0;
    }
    else Fn = !1, pn && (r.flags & 1048576) !== 0 && cv(r, Ki, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var s = r.type;
        za(n, r), n = r.pendingProps;
        var p = Xr(r, xn.current);
        gn(r, l), p = Hl(null, r, s, n, p, l);
        var v = ii();
        return r.flags |= 1, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, zn(s) ? (v = !0, Zn(r)) : v = !1, r.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Wd(r), p.updater = pf, r.stateNode = p, p._reactInternals = r, Ls(r, s, n, l), r = Us(null, r, s, !0, v, l)) : (r.tag = 0, pn && v && Bc(r), or(null, r, p, l), r = r.child), r;
      case 16:
        s = r.elementType;
        e: {
          switch (za(n, r), n = r.pendingProps, p = s._init, s = p(s._payload), r.type = s, p = r.tag = xg(s), n = li(s, n), p) {
            case 0:
              r = xv(null, r, s, n, l);
              break e;
            case 1:
              r = Cv(null, r, s, n, l);
              break e;
            case 11:
              r = ea(null, r, s, n, l);
              break e;
            case 14:
              r = Uu(null, r, s, li(s.type, n), l);
              break e;
          }
          throw Error(d(
            306,
            s,
            ""
          ));
        }
        return r;
      case 0:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : li(s, p), xv(n, r, s, p, l);
      case 1:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : li(s, p), Cv(n, r, s, p, l);
      case 3:
        e: {
          if (Mo(r), n === null) throw Error(d(387));
          s = r.pendingProps, v = r.memoizedState, p = v.element, pv(n, r), xs(r, s, null, l);
          var C = r.memoizedState;
          if (s = C.element, v.isDehydrated) if (v = { element: s, isDehydrated: !1, cache: C.cache, pendingSuspenseBoundaries: C.pendingSuspenseBoundaries, transitions: C.transitions }, r.updateQueue.baseState = v, r.memoizedState = v, r.flags & 256) {
            p = Au(Error(d(423)), r), r = wv(n, r, s, l, p);
            break e;
          } else if (s !== p) {
            p = Au(Error(d(424)), r), r = wv(n, r, s, l, p);
            break e;
          } else for (Kr = wi(r.stateNode.containerInfo.firstChild), qr = r, pn = !0, Na = null, l = be(r, null, s, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Fl(), s === p) {
              r = Aa(n, r, l);
              break e;
            }
            or(n, r, s, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return vv(r), n === null && Hd(r), s = r.type, p = r.pendingProps, v = n !== null ? n.memoizedProps : null, C = p.children, Fc(s, p) ? C = null : v !== null && Fc(s, v) && (r.flags |= 32), np(n, r), or(n, r, C, l), r.child;
      case 6:
        return n === null && Hd(r), null;
      case 13:
        return yf(n, r, l);
      case 4:
        return Gd(r, r.stateNode.containerInfo), s = r.pendingProps, n === null ? r.child = Rn(r, null, s, l) : or(n, r, s, l), r.child;
      case 11:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : li(s, p), ea(n, r, s, p, l);
      case 7:
        return or(n, r, r.pendingProps, l), r.child;
      case 8:
        return or(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return or(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (s = r.type._context, p = r.pendingProps, v = r.memoizedProps, C = p.value, Qe(ha, s._currentValue), s._currentValue = C, v !== null) if (ri(v.value, C)) {
            if (v.children === p.children && !Wn.current) {
              r = Aa(n, r, l);
              break e;
            }
          } else for (v = r.child, v !== null && (v.return = r); v !== null; ) {
            var D = v.dependencies;
            if (D !== null) {
              C = v.child;
              for (var A = D.firstContext; A !== null; ) {
                if (A.context === s) {
                  if (v.tag === 1) {
                    A = Ji(-1, l & -l), A.tag = 2;
                    var G = v.updateQueue;
                    if (G !== null) {
                      G = G.shared;
                      var ce = G.pending;
                      ce === null ? A.next = A : (A.next = ce.next, ce.next = A), G.pending = A;
                    }
                  }
                  v.lanes |= l, A = v.alternate, A !== null && (A.lanes |= l), Id(
                    v.return,
                    l,
                    r
                  ), D.lanes |= l;
                  break;
                }
                A = A.next;
              }
            } else if (v.tag === 10) C = v.type === r.type ? null : v.child;
            else if (v.tag === 18) {
              if (C = v.return, C === null) throw Error(d(341));
              C.lanes |= l, D = C.alternate, D !== null && (D.lanes |= l), Id(C, l, r), C = v.sibling;
            } else C = v.child;
            if (C !== null) C.return = v;
            else for (C = v; C !== null; ) {
              if (C === r) {
                C = null;
                break;
              }
              if (v = C.sibling, v !== null) {
                v.return = C.return, C = v;
                break;
              }
              C = C.return;
            }
            v = C;
          }
          or(n, r, p.children, l), r = r.child;
        }
        return r;
      case 9:
        return p = r.type, s = r.pendingProps.children, gn(r, l), p = La(p), s = s(p), r.flags |= 1, or(n, r, s, l), r.child;
      case 14:
        return s = r.type, p = li(s, r.pendingProps), p = li(s.type, p), Uu(n, r, s, p, l);
      case 15:
        return mt(n, r, r.type, r.pendingProps, l);
      case 17:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : li(s, p), za(n, r), r.tag = 1, zn(s) ? (n = !0, Zn(r)) : n = !1, gn(r, l), hf(r, s, p), Ls(r, s, p, l), Us(null, r, s, !0, n, l);
      case 19:
        return Mi(n, r, l);
      case 22:
        return As(n, r, l);
    }
    throw Error(d(156, r.tag));
  };
  function Bv(n, r) {
    return cn(n, r);
  }
  function Eg(n, r, l, s) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Fa(n, r, l, s) {
    return new Eg(n, r, l, s);
  }
  function vp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function xg(n) {
    if (typeof n == "function") return vp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === _e) return 11;
      if (n === de) return 14;
    }
    return 2;
  }
  function Yl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Fa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function qs(n, r, l, s, p, v) {
    var C = 2;
    if (s = n, typeof n == "function") vp(n) && (C = 1);
    else if (typeof n == "string") C = 5;
    else e: switch (n) {
      case Ue:
        return al(l.children, p, v, r);
      case kt:
        C = 8, p |= 8;
        break;
      case Et:
        return n = Fa(12, l, r, p | 2), n.elementType = Et, n.lanes = v, n;
      case je:
        return n = Fa(13, l, r, p), n.elementType = je, n.lanes = v, n;
      case P:
        return n = Fa(19, l, r, p), n.elementType = P, n.lanes = v, n;
      case re:
        return Wl(l, p, v, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Mt:
            C = 10;
            break e;
          case Tt:
            C = 9;
            break e;
          case _e:
            C = 11;
            break e;
          case de:
            C = 14;
            break e;
          case J:
            C = 16, s = null;
            break e;
        }
        throw Error(d(130, n == null ? n : typeof n, ""));
    }
    return r = Fa(C, l, r, p), r.elementType = n, r.type = s, r.lanes = v, r;
  }
  function al(n, r, l, s) {
    return n = Fa(7, n, s, r), n.lanes = l, n;
  }
  function Wl(n, r, l, s) {
    return n = Fa(22, n, s, r), n.elementType = re, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function mp(n, r, l) {
    return n = Fa(6, n, null, r), n.lanes = l, n;
  }
  function Rf(n, r, l) {
    return r = Fa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Iv(n, r, l, s, p) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = oo(0), this.expirationTimes = oo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = oo(0), this.identifierPrefix = s, this.onRecoverableError = p, this.mutableSourceEagerHydrationData = null;
  }
  function Tf(n, r, l, s, p, v, C, D, A) {
    return n = new Iv(n, r, l, D, A), r === 1 ? (r = 1, v === !0 && (r |= 8)) : r = 0, v = Fa(3, null, null, r), n.current = v, v.stateNode = n, v.memoizedState = { element: s, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Wd(v), n;
  }
  function Cg(n, r, l) {
    var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Me, key: s == null ? null : "" + s, children: n, containerInfo: r, implementation: l };
  }
  function yp(n) {
    if (!n) return Cr;
    n = n._reactInternals;
    e: {
      if (ht(n) !== n || n.tag !== 1) throw Error(d(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (zn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(d(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (zn(l)) return Ss(n, l, r);
    }
    return r;
  }
  function $v(n, r, l, s, p, v, C, D, A) {
    return n = Tf(l, s, !0, n, p, v, C, D, A), n.context = yp(null), l = n.current, s = Pn(), p = zi(l), v = Ji(s, p), v.callback = r ?? null, jl(l, v, p), n.current.lanes = p, Ii(n, p, s), ra(n, s), n;
  }
  function bf(n, r, l, s) {
    var p = r.current, v = Pn(), C = zi(p);
    return l = yp(l), r.context === null ? r.context = l : r.pendingContext = l, r = Ji(v, C), r.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (r.callback = s), n = jl(p, r, C), n !== null && (Ar(n, p, C, v), Wc(n, p, C)), C;
  }
  function kf(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function gp(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Df(n, r) {
    gp(n, r), (n = n.alternate) && gp(n, r);
  }
  function Yv() {
    return null;
  }
  var Bu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Sp(n) {
    this._internalRoot = n;
  }
  Mf.prototype.render = Sp.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(d(409));
    bf(n, r, null, null);
  }, Mf.prototype.unmount = Sp.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Pu(function() {
        bf(null, n, null, null);
      }), r[Xi] = null;
    }
  };
  function Mf(n) {
    this._internalRoot = n;
  }
  Mf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = st();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < Yn.length && r !== 0 && r < Yn[l].priority; l++) ;
      Yn.splice(l, 0, n), l === 0 && is(n);
    }
  };
  function Ep(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Of(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Wv() {
  }
  function wg(n, r, l, s, p) {
    if (p) {
      if (typeof s == "function") {
        var v = s;
        s = function() {
          var G = kf(C);
          v.call(G);
        };
      }
      var C = $v(r, s, n, 0, null, !1, !1, "", Wv);
      return n._reactRootContainer = C, n[Xi] = C.current, Eo(n.nodeType === 8 ? n.parentNode : n), Pu(), C;
    }
    for (; p = n.lastChild; ) n.removeChild(p);
    if (typeof s == "function") {
      var D = s;
      s = function() {
        var G = kf(A);
        D.call(G);
      };
    }
    var A = Tf(n, 0, !1, null, null, !1, !1, "", Wv);
    return n._reactRootContainer = A, n[Xi] = A.current, Eo(n.nodeType === 8 ? n.parentNode : n), Pu(function() {
      bf(r, A, l, s);
    }), A;
  }
  function Ks(n, r, l, s, p) {
    var v = l._reactRootContainer;
    if (v) {
      var C = v;
      if (typeof p == "function") {
        var D = p;
        p = function() {
          var A = kf(C);
          D.call(A);
        };
      }
      bf(r, C, n, p);
    } else C = wg(l, r, n, p, s);
    return kf(C);
  }
  At = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Ja(r.pendingLanes);
          l !== 0 && ($i(r, l | 1), ra(r, vt()), (Nt & 6) === 0 && (zo = vt() + 500, Ti()));
        }
        break;
      case 13:
        Pu(function() {
          var s = va(n, 1);
          if (s !== null) {
            var p = Pn();
            Ar(s, n, 1, p);
          }
        }), Df(n, 1);
    }
  }, rs = function(n) {
    if (n.tag === 13) {
      var r = va(n, 134217728);
      if (r !== null) {
        var l = Pn();
        Ar(r, n, 134217728, l);
      }
      Df(n, 134217728);
    }
  }, gi = function(n) {
    if (n.tag === 13) {
      var r = zi(n), l = va(n, r);
      if (l !== null) {
        var s = Pn();
        Ar(l, n, r, s);
      }
      Df(n, r);
    }
  }, st = function() {
    return jt;
  }, co = function(n, r) {
    var l = jt;
    try {
      return jt = n, r();
    } finally {
      jt = l;
    }
  }, Xt = function(n, r, l) {
    switch (r) {
      case "input":
        if (Yr(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var s = l[r];
            if (s !== n && s.form === n.form) {
              var p = yn(s);
              if (!p) throw Error(d(90));
              Tr(s), Yr(s, p);
            }
          }
        }
        break;
      case "textarea":
        Qa(n, l);
        break;
      case "select":
        r = l.value, r != null && wn(n, !!l.multiple, r, !1);
    }
  }, ou = dp, Sl = Pu;
  var _g = { usingClientEntryPoint: !1, Events: [Xe, ai, yn, Bi, uu, dp] }, Zs = { findFiberByHostInstance: Cu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Qv = { bundleType: Zs.bundleType, version: Zs.version, rendererPackageName: Zs.rendererPackageName, rendererConfig: Zs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: De.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = _n(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Zs.findFiberByHostInstance || Yv, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ql = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ql.isDisabled && Ql.supportsFiber) try {
      Cl = Ql.inject(Qv), Wr = Ql;
    } catch {
    }
  }
  return Ia.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _g, Ia.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ep(r)) throw Error(d(200));
    return Cg(n, r, null, l);
  }, Ia.createRoot = function(n, r) {
    if (!Ep(n)) throw Error(d(299));
    var l = !1, s = "", p = Bu;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (s = r.identifierPrefix), r.onRecoverableError !== void 0 && (p = r.onRecoverableError)), r = Tf(n, 1, !1, null, null, l, !1, s, p), n[Xi] = r.current, Eo(n.nodeType === 8 ? n.parentNode : n), new Sp(r);
  }, Ia.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(d(188)) : (n = Object.keys(n).join(","), Error(d(268, n)));
    return n = _n(r), n = n === null ? null : n.stateNode, n;
  }, Ia.flushSync = function(n) {
    return Pu(n);
  }, Ia.hydrate = function(n, r, l) {
    if (!Of(r)) throw Error(d(200));
    return Ks(null, n, r, !0, l);
  }, Ia.hydrateRoot = function(n, r, l) {
    if (!Ep(n)) throw Error(d(405));
    var s = l != null && l.hydratedSources || null, p = !1, v = "", C = Bu;
    if (l != null && (l.unstable_strictMode === !0 && (p = !0), l.identifierPrefix !== void 0 && (v = l.identifierPrefix), l.onRecoverableError !== void 0 && (C = l.onRecoverableError)), r = $v(r, null, n, 1, l ?? null, p, !1, v, C), n[Xi] = r.current, Eo(n), s) for (n = 0; n < s.length; n++) l = s[n], p = l._getVersion, p = p(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, p] : r.mutableSourceEagerHydrationData.push(
      l,
      p
    );
    return new Mf(r);
  }, Ia.render = function(n, r, l) {
    if (!Of(r)) throw Error(d(200));
    return Ks(null, n, r, !1, l);
  }, Ia.unmountComponentAtNode = function(n) {
    if (!Of(n)) throw Error(d(40));
    return n._reactRootContainer ? (Pu(function() {
      Ks(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Xi] = null;
      });
    }), !0) : !1;
  }, Ia.unstable_batchedUpdates = dp, Ia.unstable_renderSubtreeIntoContainer = function(n, r, l, s) {
    if (!Of(l)) throw Error(d(200));
    if (n == null || n._reactInternals === void 0) throw Error(d(38));
    return Ks(n, r, l, !1, s);
  }, Ia.version = "18.3.1-next-f1338f8080-20240426", Ia;
}
var $a = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var L1;
function UM() {
  return L1 || (L1 = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var u = Oh(), c = f_(), d = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, y = !1;
    function S(e) {
      y = e;
    }
    function w(e) {
      if (!y) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        b("warn", e, a);
      }
    }
    function m(e) {
      if (!y) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        b("error", e, a);
      }
    }
    function b(e, t, a) {
      {
        var i = d.ReactDebugCurrentFrame, o = i.getStackAddendum();
        o !== "" && (t += "%s", a = a.concat([o]));
        var f = a.map(function(h) {
          return String(h);
        });
        f.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var k = 0, R = 1, O = 2, L = 3, F = 4, V = 5, me = 6, ge = 7, Se = 8, se = 9, Pe = 10, pe = 11, De = 12, xe = 13, Me = 14, Ue = 15, kt = 16, Et = 17, Mt = 18, Tt = 19, _e = 21, je = 22, P = 23, de = 24, J = 25, re = !0, K = !1, ue = !1, ne = !1, z = !1, X = !0, He = !0, Re = !0, Ke = !0, Je = /* @__PURE__ */ new Set(), Ge = {}, et = {};
    function pt(e, t) {
      Qt(e, t), Qt(e + "Capture", t);
    }
    function Qt(e, t) {
      Ge[e] && m("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Ge[e] = t;
      {
        var a = e.toLowerCase();
        et[a] = e, e === "onDoubleClick" && (et.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Je.add(t[i]);
    }
    var On = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Tr = Object.prototype.hasOwnProperty;
    function Cn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function rr(e) {
      try {
        return Bn(e), !1;
      } catch {
        return !0;
      }
    }
    function Bn(e) {
      return "" + e;
    }
    function In(e, t) {
      if (rr(e))
        return m("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Cn(e)), Bn(e);
    }
    function Yr(e) {
      if (rr(e))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cn(e)), Bn(e);
    }
    function pi(e, t) {
      if (rr(e))
        return m("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Cn(e)), Bn(e);
    }
    function sa(e, t) {
      if (rr(e))
        return m("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Cn(e)), Bn(e);
    }
    function qn(e) {
      if (rr(e))
        return m("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Cn(e)), Bn(e);
    }
    function wn(e) {
      if (rr(e))
        return m("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Cn(e)), Bn(e);
    }
    var $n = 0, Sr = 1, Qa = 2, Nn = 3, Er = 4, ca = 5, Ga = 6, hi = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Ee = hi + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ye = new RegExp("^[" + hi + "][" + Ee + "]*$"), gt = {}, $t = {};
    function rn(e) {
      return Tr.call($t, e) ? !0 : Tr.call(gt, e) ? !1 : Ye.test(e) ? ($t[e] = !0, !0) : (gt[e] = !0, m("Invalid attribute name: `%s`", e), !1);
    }
    function vn(e, t, a) {
      return t !== null ? t.type === $n : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function sn(e, t, a, i) {
      if (a !== null && a.type === $n)
        return !1;
      switch (typeof t) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var o = e.toLowerCase().slice(0, 5);
          return o !== "data-" && o !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Kn(e, t, a, i) {
      if (t === null || typeof t > "u" || sn(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Nn:
            return !t;
          case Er:
            return t === !1;
          case ca:
            return isNaN(t);
          case Ga:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function an(e) {
      return Xt.hasOwnProperty(e) ? Xt[e] : null;
    }
    function Gt(e, t, a, i, o, f, h) {
      this.acceptsBooleans = t === Qa || t === Nn || t === Er, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = f, this.removeEmptyString = h;
    }
    var Xt = {}, fa = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    fa.forEach(function(e) {
      Xt[e] = new Gt(
        e,
        $n,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      Xt[t] = new Gt(
        t,
        Sr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Qa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Qa,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Nn,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Nn,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Er,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Ga,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        ca,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var xr = /[\-\:]([a-z])/g, _a = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(xr, _a);
      Xt[t] = new Gt(
        t,
        Sr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(xr, _a);
      Xt[t] = new Gt(
        t,
        Sr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(xr, _a);
      Xt[t] = new Gt(
        t,
        Sr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Sr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Bi = "xlinkHref";
    Xt[Bi] = new Gt(
      "xlinkHref",
      Sr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Xt[e] = new Gt(
        e,
        Sr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var uu = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, ou = !1;
    function Sl(e) {
      !ou && uu.test(e) && (ou = !0, m("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function El(e, t, a, i) {
      if (i.mustUseProperty) {
        var o = i.propertyName;
        return e[o];
      } else {
        In(a, t), i.sanitizeURL && Sl("" + a);
        var f = i.attributeName, h = null;
        if (i.type === Er) {
          if (e.hasAttribute(f)) {
            var g = e.getAttribute(f);
            return g === "" ? !0 : Kn(t, a, i, !1) ? g : g === "" + a ? a : g;
          }
        } else if (e.hasAttribute(f)) {
          if (Kn(t, a, i, !1))
            return e.getAttribute(f);
          if (i.type === Nn)
            return a;
          h = e.getAttribute(f);
        }
        return Kn(t, a, i, !1) ? h === null ? a : h : h === "" + a ? a : h;
      }
    }
    function su(e, t, a, i) {
      {
        if (!rn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var o = e.getAttribute(t);
        return In(a, t), o === "" + a ? a : o;
      }
    }
    function br(e, t, a, i) {
      var o = an(t);
      if (!vn(t, o, i)) {
        if (Kn(t, a, o, i) && (a = null), i || o === null) {
          if (rn(t)) {
            var f = t;
            a === null ? e.removeAttribute(f) : (In(a, t), e.setAttribute(f, "" + a));
          }
          return;
        }
        var h = o.mustUseProperty;
        if (h) {
          var g = o.propertyName;
          if (a === null) {
            var E = o.type;
            e[g] = E === Nn ? !1 : "";
          } else
            e[g] = a;
          return;
        }
        var _ = o.attributeName, T = o.attributeNamespace;
        if (a === null)
          e.removeAttribute(_);
        else {
          var H = o.type, U;
          H === Nn || H === Er && a === !0 ? U = "" : (In(a, _), U = "" + a, o.sanitizeURL && Sl(U.toString())), T ? e.setAttributeNS(T, _, U) : e.setAttribute(_, U);
        }
      }
    }
    var kr = Symbol.for("react.element"), ar = Symbol.for("react.portal"), vi = Symbol.for("react.fragment"), Xa = Symbol.for("react.strict_mode"), mi = Symbol.for("react.profiler"), yi = Symbol.for("react.provider"), N = Symbol.for("react.context"), ie = Symbol.for("react.forward_ref"), Te = Symbol.for("react.suspense"), Fe = Symbol.for("react.suspense_list"), ht = Symbol.for("react.memo"), ct = Symbol.for("react.lazy"), wt = Symbol.for("react.scope"), xt = Symbol.for("react.debug_trace_mode"), _n = Symbol.for("react.offscreen"), ln = Symbol.for("react.legacy_hidden"), cn = Symbol.for("react.cache"), ir = Symbol.for("react.tracing_marker"), qa = Symbol.iterator, Ka = "@@iterator";
    function vt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = qa && e[qa] || e[Ka];
      return typeof t == "function" ? t : null;
    }
    var yt = Object.assign, Za = 0, cu, fu, xl, ao, Cl, Wr, ns;
    function Dr() {
    }
    Dr.__reactDisabledLog = !0;
    function Cc() {
      {
        if (Za === 0) {
          cu = console.log, fu = console.info, xl = console.warn, ao = console.error, Cl = console.group, Wr = console.groupCollapsed, ns = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Dr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Za++;
      }
    }
    function wc() {
      {
        if (Za--, Za === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: yt({}, e, {
              value: cu
            }),
            info: yt({}, e, {
              value: fu
            }),
            warn: yt({}, e, {
              value: xl
            }),
            error: yt({}, e, {
              value: ao
            }),
            group: yt({}, e, {
              value: Cl
            }),
            groupCollapsed: yt({}, e, {
              value: Wr
            }),
            groupEnd: yt({}, e, {
              value: ns
            })
          });
        }
        Za < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var io = d.ReactCurrentDispatcher, wl;
    function da(e, t, a) {
      {
        if (wl === void 0)
          try {
            throw Error();
          } catch (o) {
            var i = o.stack.trim().match(/\n( *(at )?)/);
            wl = i && i[1] || "";
          }
        return `
` + wl + e;
      }
    }
    var Ja = !1, ei;
    {
      var lo = typeof WeakMap == "function" ? WeakMap : Map;
      ei = new lo();
    }
    function du(e, t) {
      if (!e || Ja)
        return "";
      {
        var a = ei.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Ja = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var f;
      f = io.current, io.current = null, Cc();
      try {
        if (t) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (q) {
              i = q;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (q) {
              i = q;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (q) {
            i = q;
          }
          e();
        }
      } catch (q) {
        if (q && i && typeof q.stack == "string") {
          for (var g = q.stack.split(`
`), E = i.stack.split(`
`), _ = g.length - 1, T = E.length - 1; _ >= 1 && T >= 0 && g[_] !== E[T]; )
            T--;
          for (; _ >= 1 && T >= 0; _--, T--)
            if (g[_] !== E[T]) {
              if (_ !== 1 || T !== 1)
                do
                  if (_--, T--, T < 0 || g[_] !== E[T]) {
                    var H = `
` + g[_].replace(" at new ", " at ");
                    return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), typeof e == "function" && ei.set(e, H), H;
                  }
                while (_ >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        Ja = !1, io.current = f, wc(), Error.prepareStackTrace = o;
      }
      var U = e ? e.displayName || e.name : "", W = U ? da(U) : "";
      return typeof e == "function" && ei.set(e, W), W;
    }
    function _l(e, t, a) {
      return du(e, !0);
    }
    function uo(e, t, a) {
      return du(e, !1);
    }
    function oo(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Ii(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return du(e, oo(e));
      if (typeof e == "string")
        return da(e);
      switch (e) {
        case Te:
          return da("Suspense");
        case Fe:
          return da("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ie:
            return uo(e.render);
          case ht:
            return Ii(e.type, t, a);
          case ct: {
            var i = e, o = i._payload, f = i._init;
            try {
              return Ii(f(o), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function vd(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case V:
          return da(e.type);
        case kt:
          return da("Lazy");
        case xe:
          return da("Suspense");
        case Tt:
          return da("SuspenseList");
        case k:
        case O:
        case Ue:
          return uo(e.type);
        case pe:
          return uo(e.type.render);
        case R:
          return _l(e.type);
        default:
          return "";
      }
    }
    function $i(e) {
      try {
        var t = "", a = e;
        do
          t += vd(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function jt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var o = t.displayName || t.name || "";
      return o !== "" ? a + "(" + o + ")" : a;
    }
    function so(e) {
      return e.displayName || "Context";
    }
    function At(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case vi:
          return "Fragment";
        case ar:
          return "Portal";
        case mi:
          return "Profiler";
        case Xa:
          return "StrictMode";
        case Te:
          return "Suspense";
        case Fe:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case N:
            var t = e;
            return so(t) + ".Consumer";
          case yi:
            var a = e;
            return so(a._context) + ".Provider";
          case ie:
            return jt(e, e.render, "ForwardRef");
          case ht:
            var i = e.displayName || null;
            return i !== null ? i : At(e.type) || "Memo";
          case ct: {
            var o = e, f = o._payload, h = o._init;
            try {
              return At(h(f));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function rs(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function gi(e) {
      return e.displayName || "Context";
    }
    function st(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case de:
          return "Cache";
        case se:
          var i = a;
          return gi(i) + ".Consumer";
        case Pe:
          var o = a;
          return gi(o._context) + ".Provider";
        case Mt:
          return "DehydratedFragment";
        case pe:
          return rs(a, a.render, "ForwardRef");
        case ge:
          return "Fragment";
        case V:
          return a;
        case F:
          return "Portal";
        case L:
          return "Root";
        case me:
          return "Text";
        case kt:
          return At(a);
        case Se:
          return a === Xa ? "StrictMode" : "Mode";
        case je:
          return "Offscreen";
        case De:
          return "Profiler";
        case _e:
          return "Scope";
        case xe:
          return "Suspense";
        case Tt:
          return "SuspenseList";
        case J:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case R:
        case k:
        case Et:
        case O:
        case Me:
        case Ue:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var co = d.ReactDebugCurrentFrame, lr = null, Si = !1;
    function Mr() {
      {
        if (lr === null)
          return null;
        var e = lr._debugOwner;
        if (e !== null && typeof e < "u")
          return st(e);
      }
      return null;
    }
    function Ei() {
      return lr === null ? "" : $i(lr);
    }
    function fn() {
      co.getCurrentStack = null, lr = null, Si = !1;
    }
    function qt(e) {
      co.getCurrentStack = e === null ? null : Ei, lr = e, Si = !1;
    }
    function Rl() {
      return lr;
    }
    function Yn(e) {
      Si = e;
    }
    function Or(e) {
      return "" + e;
    }
    function Ra(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return wn(e), e;
        default:
          return "";
      }
    }
    var pu = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function as(e, t) {
      pu[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || m("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || m("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function is(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Tl(e) {
      return e._valueTracker;
    }
    function hu(e) {
      e._valueTracker = null;
    }
    function md(e) {
      var t = "";
      return e && (is(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ta(e) {
      var t = is(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      wn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var o = a.get, f = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(g) {
            wn(g), i = "" + g, f.call(this, g);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var h = {
          getValue: function() {
            return i;
          },
          setValue: function(g) {
            wn(g), i = "" + g;
          },
          stopTracking: function() {
            hu(e), delete e[t];
          }
        };
        return h;
      }
    }
    function ti(e) {
      Tl(e) || (e._valueTracker = Ta(e));
    }
    function xi(e) {
      if (!e)
        return !1;
      var t = Tl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = md(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function ba(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var fo = !1, po = !1, bl = !1, vu = !1;
    function ho(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function vo(e, t) {
      var a = e, i = t.checked, o = yt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return o;
    }
    function ni(e, t) {
      as("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !po && (m("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), po = !0), t.value !== void 0 && t.defaultValue !== void 0 && !fo && (m("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), fo = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Ra(t.value != null ? t.value : i),
        controlled: ho(t)
      };
    }
    function x(e, t) {
      var a = e, i = t.checked;
      i != null && br(a, "checked", i, !1);
    }
    function M(e, t) {
      var a = e;
      {
        var i = ho(t);
        !a._wrapperState.controlled && i && !vu && (m("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), vu = !0), a._wrapperState.controlled && !i && !bl && (m("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), bl = !0);
      }
      x(e, t);
      var o = Ra(t.value), f = t.type;
      if (o != null)
        f === "number" ? (o === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != o) && (a.value = Or(o)) : a.value !== Or(o) && (a.value = Or(o));
      else if (f === "submit" || f === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? tt(a, t.type, o) : t.hasOwnProperty("defaultValue") && tt(a, t.type, Ra(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function Q(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type, f = o === "submit" || o === "reset";
        if (f && (t.value === void 0 || t.value === null))
          return;
        var h = Or(i._wrapperState.initialValue);
        a || h !== i.value && (i.value = h), i.defaultValue = h;
      }
      var g = i.name;
      g !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, g !== "" && (i.name = g);
    }
    function Z(e, t) {
      var a = e;
      M(a, t), ye(a, t);
    }
    function ye(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        In(a, "name");
        for (var o = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), f = 0; f < o.length; f++) {
          var h = o[f];
          if (!(h === e || h.form !== e.form)) {
            var g = fm(h);
            if (!g)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            xi(h), M(h, g);
          }
        }
      }
    }
    function tt(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || ba(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Or(e._wrapperState.initialValue) : e.defaultValue !== Or(a) && (e.defaultValue = Or(a)));
    }
    var we = !1, at = !1, _t = !1;
    function Ut(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? u.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || at || (at = !0, m("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (_t || (_t = !0, m("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !we && (m("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), we = !0);
    }
    function un(e, t) {
      t.value != null && e.setAttribute("value", Or(Ra(t.value)));
    }
    var Kt = Array.isArray;
    function St(e) {
      return Kt(e);
    }
    var Zt;
    Zt = !1;
    function mn() {
      var e = Mr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var kl = ["value", "defaultValue"];
    function ls(e) {
      {
        as("select", e);
        for (var t = 0; t < kl.length; t++) {
          var a = kl[t];
          if (e[a] != null) {
            var i = St(e[a]);
            e.multiple && !i ? m("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, mn()) : !e.multiple && i && m("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, mn());
          }
        }
      }
    }
    function Yi(e, t, a, i) {
      var o = e.options;
      if (t) {
        for (var f = a, h = {}, g = 0; g < f.length; g++)
          h["$" + f[g]] = !0;
        for (var E = 0; E < o.length; E++) {
          var _ = h.hasOwnProperty("$" + o[E].value);
          o[E].selected !== _ && (o[E].selected = _), _ && i && (o[E].defaultSelected = !0);
        }
      } else {
        for (var T = Or(Ra(a)), H = null, U = 0; U < o.length; U++) {
          if (o[U].value === T) {
            o[U].selected = !0, i && (o[U].defaultSelected = !0);
            return;
          }
          H === null && !o[U].disabled && (H = o[U]);
        }
        H !== null && (H.selected = !0);
      }
    }
    function us(e, t) {
      return yt({}, t, {
        value: void 0
      });
    }
    function mu(e, t) {
      var a = e;
      ls(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Zt && (m("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Zt = !0);
    }
    function yd(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Yi(a, !!t.multiple, i, !1) : t.defaultValue != null && Yi(a, !!t.multiple, t.defaultValue, !0);
    }
    function _c(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var o = t.value;
      o != null ? Yi(a, !!t.multiple, o, !1) : i !== !!t.multiple && (t.defaultValue != null ? Yi(a, !!t.multiple, t.defaultValue, !0) : Yi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function gd(e, t) {
      var a = e, i = t.value;
      i != null && Yi(a, !!t.multiple, i, !1);
    }
    var zh = !1;
    function Sd(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = yt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Or(a._wrapperState.initialValue)
      });
      return i;
    }
    function Ed(e, t) {
      var a = e;
      as("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !zh && (m("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component"), zh = !0);
      var i = t.value;
      if (i == null) {
        var o = t.children, f = t.defaultValue;
        if (o != null) {
          m("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (f != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (St(o)) {
              if (o.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              o = o[0];
            }
            f = o;
          }
        }
        f == null && (f = ""), i = f;
      }
      a._wrapperState = {
        initialValue: Ra(i)
      };
    }
    function Ah(e, t) {
      var a = e, i = Ra(t.value), o = Ra(t.defaultValue);
      if (i != null) {
        var f = Or(i);
        f !== a.value && (a.value = f), t.defaultValue == null && a.defaultValue !== f && (a.defaultValue = f);
      }
      o != null && (a.defaultValue = Or(o));
    }
    function Uh(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Jy(e, t) {
      Ah(e, t);
    }
    var Wi = "http://www.w3.org/1999/xhtml", xd = "http://www.w3.org/1998/Math/MathML", Cd = "http://www.w3.org/2000/svg";
    function wd(e) {
      switch (e) {
        case "svg":
          return Cd;
        case "math":
          return xd;
        default:
          return Wi;
      }
    }
    function _d(e, t) {
      return e == null || e === Wi ? wd(t) : e === Cd && t === "foreignObject" ? Wi : e;
    }
    var Fh = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, o) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, o);
        });
      } : e;
    }, Rc, jh = Fh(function(e, t) {
      if (e.namespaceURI === Cd && !("innerHTML" in e)) {
        Rc = Rc || document.createElement("div"), Rc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Rc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Qr = 1, Qi = 3, Ln = 8, Gi = 9, Rd = 11, mo = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Qi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, os = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, ss = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Hh(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Ph = ["Webkit", "ms", "Moz", "O"];
    Object.keys(ss).forEach(function(e) {
      Ph.forEach(function(t) {
        ss[Hh(t, e)] = ss[e];
      });
    });
    function Tc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(ss.hasOwnProperty(e) && ss[e]) ? t + "px" : (sa(t, e), ("" + t).trim());
    }
    var Vh = /([A-Z])/g, Bh = /^ms-/;
    function yo(e) {
      return e.replace(Vh, "-$1").toLowerCase().replace(Bh, "-ms-");
    }
    var Ih = function() {
    };
    {
      var eg = /^(?:webkit|moz|o)[A-Z]/, tg = /^-ms-/, $h = /-(.)/g, Td = /;\s*$/, Ci = {}, yu = {}, Yh = !1, cs = !1, ng = function(e) {
        return e.replace($h, function(t, a) {
          return a.toUpperCase();
        });
      }, Wh = function(e) {
        Ci.hasOwnProperty(e) && Ci[e] || (Ci[e] = !0, m(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          ng(e.replace(tg, "ms-"))
        ));
      }, bd = function(e) {
        Ci.hasOwnProperty(e) && Ci[e] || (Ci[e] = !0, m("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, kd = function(e, t) {
        yu.hasOwnProperty(t) && yu[t] || (yu[t] = !0, m(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Td, "")));
      }, Qh = function(e, t) {
        Yh || (Yh = !0, m("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Gh = function(e, t) {
        cs || (cs = !0, m("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Ih = function(e, t) {
        e.indexOf("-") > -1 ? Wh(e) : eg.test(e) ? bd(e) : Td.test(t) && kd(e, t), typeof t == "number" && (isNaN(t) ? Qh(e, t) : isFinite(t) || Gh(e, t));
      };
    }
    var Xh = Ih;
    function rg(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var o = e[i];
            if (o != null) {
              var f = i.indexOf("--") === 0;
              t += a + (f ? i : yo(i)) + ":", t += Tc(i, o, f), a = ";";
            }
          }
        return t || null;
      }
    }
    function qh(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var o = i.indexOf("--") === 0;
          o || Xh(i, t[i]);
          var f = Tc(i, t[i], o);
          i === "float" && (i = "cssFloat"), o ? a.setProperty(i, f) : a[i] = f;
        }
    }
    function ag(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Kh(e) {
      var t = {};
      for (var a in e)
        for (var i = os[a] || [a], o = 0; o < i.length; o++)
          t[i[o]] = a;
      return t;
    }
    function ig(e, t) {
      {
        if (!t)
          return;
        var a = Kh(e), i = Kh(t), o = {};
        for (var f in a) {
          var h = a[f], g = i[f];
          if (g && h !== g) {
            var E = h + "," + g;
            if (o[E])
              continue;
            o[E] = !0, m("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", ag(e[h]) ? "Removing" : "Updating", h, g);
          }
        }
      }
    }
    var ri = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, fs = yt({
      menuitem: !0
    }, ri), Zh = "__html";
    function bc(e, t) {
      if (t) {
        if (fs[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Zh in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && m("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Dl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        // These are reserved SVG and MathML elements.
        // We don't mind this list too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var ds = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, kc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, go = {}, lg = new RegExp("^(aria)-[" + Ee + "]*$"), So = new RegExp("^(aria)[A-Z][" + Ee + "]*$");
    function Dd(e, t) {
      {
        if (Tr.call(go, t) && go[t])
          return !0;
        if (So.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = kc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return m("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), go[t] = !0, !0;
          if (t !== i)
            return m("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), go[t] = !0, !0;
        }
        if (lg.test(t)) {
          var o = t.toLowerCase(), f = kc.hasOwnProperty(o) ? o : null;
          if (f == null)
            return go[t] = !0, !1;
          if (t !== f)
            return m("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, f), go[t] = !0, !0;
        }
      }
      return !0;
    }
    function ps(e, t) {
      {
        var a = [];
        for (var i in t) {
          var o = Dd(e, i);
          o || a.push(i);
        }
        var f = a.map(function(h) {
          return "`" + h + "`";
        }).join(", ");
        a.length === 1 ? m("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", f, e) : a.length > 1 && m("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", f, e);
      }
    }
    function Md(e, t) {
      Dl(e, t) || ps(e, t);
    }
    var Od = !1;
    function Dc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Od && (Od = !0, e === "select" && t.multiple ? m("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : m("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var gu = function() {
    };
    {
      var ur = {}, Nd = /^on./, Mc = /^on[^A-Z]/, Jh = new RegExp("^(aria)-[" + Ee + "]*$"), ev = new RegExp("^(aria)[A-Z][" + Ee + "]*$");
      gu = function(e, t, a, i) {
        if (Tr.call(ur, t) && ur[t])
          return !0;
        var o = t.toLowerCase();
        if (o === "onfocusin" || o === "onfocusout")
          return m("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ur[t] = !0, !0;
        if (i != null) {
          var f = i.registrationNameDependencies, h = i.possibleRegistrationNames;
          if (f.hasOwnProperty(t))
            return !0;
          var g = h.hasOwnProperty(o) ? h[o] : null;
          if (g != null)
            return m("Invalid event handler property `%s`. Did you mean `%s`?", t, g), ur[t] = !0, !0;
          if (Nd.test(t))
            return m("Unknown event handler property `%s`. It will be ignored.", t), ur[t] = !0, !0;
        } else if (Nd.test(t))
          return Mc.test(t) && m("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ur[t] = !0, !0;
        if (Jh.test(t) || ev.test(t))
          return !0;
        if (o === "innerhtml")
          return m("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ur[t] = !0, !0;
        if (o === "aria")
          return m("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ur[t] = !0, !0;
        if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
          return m("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ur[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return m("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ur[t] = !0, !0;
        var E = an(t), _ = E !== null && E.type === $n;
        if (ds.hasOwnProperty(o)) {
          var T = ds[o];
          if (T !== t)
            return m("Invalid DOM property `%s`. Did you mean `%s`?", t, T), ur[t] = !0, !0;
        } else if (!_ && t !== o)
          return m("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, o), ur[t] = !0, !0;
        return typeof a == "boolean" && sn(t, a, E, !1) ? (a ? m('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : m('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ur[t] = !0, !0) : _ ? !0 : sn(t, a, E, !1) ? (ur[t] = !0, !1) : ((a === "false" || a === "true") && E !== null && E.type === Nn && (m("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ur[t] = !0), !0);
      };
    }
    var tv = function(e, t, a) {
      {
        var i = [];
        for (var o in t) {
          var f = gu(e, o, t[o], a);
          f || i.push(o);
        }
        var h = i.map(function(g) {
          return "`" + g + "`";
        }).join(", ");
        i.length === 1 ? m("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", h, e) : i.length > 1 && m("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", h, e);
      }
    };
    function nv(e, t, a) {
      Dl(e, t) || tv(e, t, a);
    }
    var Ld = 1, Oc = 2, ka = 4, zd = Ld | Oc | ka, Su = null;
    function ug(e) {
      Su !== null && m("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Su = e;
    }
    function og() {
      Su === null && m("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Su = null;
    }
    function hs(e) {
      return e === Su;
    }
    function Ad(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Qi ? t.parentNode : t;
    }
    var Nc = null, Eu = null, Yt = null;
    function Lc(e) {
      var t = Po(e);
      if (t) {
        if (typeof Nc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = fm(a);
          Nc(t.stateNode, t.type, i);
        }
      }
    }
    function zc(e) {
      Nc = e;
    }
    function Eo(e) {
      Eu ? Yt ? Yt.push(e) : Yt = [e] : Eu = e;
    }
    function rv() {
      return Eu !== null || Yt !== null;
    }
    function Ac() {
      if (Eu) {
        var e = Eu, t = Yt;
        if (Eu = null, Yt = null, Lc(e), t)
          for (var a = 0; a < t.length; a++)
            Lc(t[a]);
      }
    }
    var xo = function(e, t) {
      return e(t);
    }, vs = function() {
    }, Ml = !1;
    function av() {
      var e = rv();
      e && (vs(), Ac());
    }
    function iv(e, t, a) {
      if (Ml)
        return e(t, a);
      Ml = !0;
      try {
        return xo(e, t, a);
      } finally {
        Ml = !1, av();
      }
    }
    function sg(e, t, a) {
      xo = e, vs = a;
    }
    function lv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Uc(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && lv(t));
        default:
          return !1;
      }
    }
    function Ol(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = fm(a);
      if (i === null)
        return null;
      var o = i[t];
      if (Uc(t, e.type, i))
        return null;
      if (o && typeof o != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof o + "` type.");
      return o;
    }
    var ms = !1;
    if (On)
      try {
        var xu = {};
        Object.defineProperty(xu, "passive", {
          get: function() {
            ms = !0;
          }
        }), window.addEventListener("test", xu, xu), window.removeEventListener("test", xu, xu);
      } catch {
        ms = !1;
      }
    function Fc(e, t, a, i, o, f, h, g, E) {
      var _ = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, _);
      } catch (T) {
        this.onError(T);
      }
    }
    var jc = Fc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Ud = document.createElement("react");
      jc = function(t, a, i, o, f, h, g, E, _) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var T = document.createEvent("Event"), H = !1, U = !0, W = window.event, q = Object.getOwnPropertyDescriptor(window, "event");
        function ee() {
          Ud.removeEventListener(te, nt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = W);
        }
        var ke = Array.prototype.slice.call(arguments, 3);
        function nt() {
          H = !0, ee(), a.apply(i, ke), U = !1;
        }
        var We, zt = !1, bt = !1;
        function I($) {
          if (We = $.error, zt = !0, We === null && $.colno === 0 && $.lineno === 0 && (bt = !0), $.defaultPrevented && We != null && typeof We == "object")
            try {
              We._suppressLogging = !0;
            } catch {
            }
        }
        var te = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", I), Ud.addEventListener(te, nt, !1), T.initEvent(te, !1, !1), Ud.dispatchEvent(T), q && Object.defineProperty(window, "event", q), H && U && (zt ? bt && (We = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : We = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(We)), window.removeEventListener("error", I), !H)
          return ee(), Fc.apply(this, arguments);
      };
    }
    var uv = jc, Co = !1, Hc = null, wo = !1, wi = null, ov = {
      onError: function(e) {
        Co = !0, Hc = e;
      }
    };
    function Nl(e, t, a, i, o, f, h, g, E) {
      Co = !1, Hc = null, uv.apply(ov, arguments);
    }
    function _i(e, t, a, i, o, f, h, g, E) {
      if (Nl.apply(this, arguments), Co) {
        var _ = gs();
        wo || (wo = !0, wi = _);
      }
    }
    function ys() {
      if (wo) {
        var e = wi;
        throw wo = !1, wi = null, e;
      }
    }
    function Xi() {
      return Co;
    }
    function gs() {
      if (Co) {
        var e = Hc;
        return Co = !1, Hc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function _o(e) {
      return e._reactInternals;
    }
    function cg(e) {
      return e._reactInternals !== void 0;
    }
    function Cu(e, t) {
      e._reactInternals = t;
    }
    var Xe = (
      /*                      */
      0
    ), ai = (
      /*                */
      1
    ), yn = (
      /*                    */
      2
    ), Ot = (
      /*                       */
      4
    ), Da = (
      /*                */
      16
    ), Ma = (
      /*                 */
      32
    ), on = (
      /*                     */
      64
    ), Qe = (
      /*                   */
      128
    ), Cr = (
      /*            */
      256
    ), xn = (
      /*                          */
      512
    ), Wn = (
      /*                     */
      1024
    ), Gr = (
      /*                      */
      2048
    ), Xr = (
      /*                    */
      4096
    ), zn = (
      /*                   */
      8192
    ), Ro = (
      /*             */
      16384
    ), sv = (
      /*               */
      32767
    ), Ss = (
      /*                   */
      32768
    ), Zn = (
      /*                */
      65536
    ), Pc = (
      /* */
      131072
    ), Ri = (
      /*                       */
      1048576
    ), To = (
      /*                    */
      2097152
    ), qi = (
      /*                 */
      4194304
    ), Vc = (
      /*                */
      8388608
    ), Ll = (
      /*               */
      16777216
    ), Ti = (
      /*              */
      33554432
    ), zl = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Ot | Wn | 0
    ), Al = yn | Ot | Da | Ma | xn | Xr | zn, Ul = Ot | on | xn | zn, Ki = Gr | Da, An = qi | Vc | To, Oa = d.ReactCurrentOwner;
    function pa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (yn | Xr)) !== Xe && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === L ? a : null;
    }
    function bi(e) {
      if (e.tag === xe) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function ki(e) {
      return e.tag === L ? e.stateNode.containerInfo : null;
    }
    function wu(e) {
      return pa(e) === e;
    }
    function cv(e) {
      {
        var t = Oa.current;
        if (t !== null && t.tag === R) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || m("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", st(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var o = _o(e);
      return o ? pa(o) === o : !1;
    }
    function Bc(e) {
      if (pa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Ic(e) {
      var t = e.alternate;
      if (!t) {
        var a = pa(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, o = t; ; ) {
        var f = i.return;
        if (f === null)
          break;
        var h = f.alternate;
        if (h === null) {
          var g = f.return;
          if (g !== null) {
            i = o = g;
            continue;
          }
          break;
        }
        if (f.child === h.child) {
          for (var E = f.child; E; ) {
            if (E === i)
              return Bc(f), e;
            if (E === o)
              return Bc(f), t;
            E = E.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== o.return)
          i = f, o = h;
        else {
          for (var _ = !1, T = f.child; T; ) {
            if (T === i) {
              _ = !0, i = f, o = h;
              break;
            }
            if (T === o) {
              _ = !0, o = f, i = h;
              break;
            }
            T = T.sibling;
          }
          if (!_) {
            for (T = h.child; T; ) {
              if (T === i) {
                _ = !0, i = h, o = f;
                break;
              }
              if (T === o) {
                _ = !0, o = h, i = f;
                break;
              }
              T = T.sibling;
            }
            if (!_)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== o)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== L)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function qr(e) {
      var t = Ic(e);
      return t !== null ? Kr(t) : null;
    }
    function Kr(e) {
      if (e.tag === V || e.tag === me)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Kr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function pn(e) {
      var t = Ic(e);
      return t !== null ? Na(t) : null;
    }
    function Na(e) {
      if (e.tag === V || e.tag === me)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== F) {
          var a = Na(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Fd = c.unstable_scheduleCallback, fv = c.unstable_cancelCallback, jd = c.unstable_shouldYield, Hd = c.unstable_requestPaint, Qn = c.unstable_now, $c = c.unstable_getCurrentPriorityLevel, Es = c.unstable_ImmediatePriority, Fl = c.unstable_UserBlockingPriority, Zi = c.unstable_NormalPriority, fg = c.unstable_LowPriority, _u = c.unstable_IdlePriority, Yc = c.unstable_yieldValue, dv = c.unstable_setDisableYieldValue, Ru = null, Rn = null, be = null, ha = !1, Zr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function bo(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return m("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        He && (e = yt({}, e, {
          getLaneLabelMap: Tu,
          injectProfilingHooks: La
        })), Ru = t.inject(e), Rn = t;
      } catch (a) {
        m("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Pd(e, t) {
      if (Rn && typeof Rn.onScheduleFiberRoot == "function")
        try {
          Rn.onScheduleFiberRoot(Ru, e, t);
        } catch (a) {
          ha || (ha = !0, m("React instrumentation encountered an error: %s", a));
        }
    }
    function Vd(e, t) {
      if (Rn && typeof Rn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Qe) === Qe;
          if (Re) {
            var i;
            switch (t) {
              case Nr:
                i = Es;
                break;
              case Mi:
                i = Fl;
                break;
              case za:
                i = Zi;
                break;
              case Aa:
                i = _u;
                break;
              default:
                i = Zi;
                break;
            }
            Rn.onCommitFiberRoot(Ru, e, i, a);
          }
        } catch (o) {
          ha || (ha = !0, m("React instrumentation encountered an error: %s", o));
        }
    }
    function Bd(e) {
      if (Rn && typeof Rn.onPostCommitFiberRoot == "function")
        try {
          Rn.onPostCommitFiberRoot(Ru, e);
        } catch (t) {
          ha || (ha = !0, m("React instrumentation encountered an error: %s", t));
        }
    }
    function Id(e) {
      if (Rn && typeof Rn.onCommitFiberUnmount == "function")
        try {
          Rn.onCommitFiberUnmount(Ru, e);
        } catch (t) {
          ha || (ha = !0, m("React instrumentation encountered an error: %s", t));
        }
    }
    function gn(e) {
      if (typeof Yc == "function" && (dv(e), S(e)), Rn && typeof Rn.setStrictMode == "function")
        try {
          Rn.setStrictMode(Ru, e);
        } catch (t) {
          ha || (ha = !0, m("React instrumentation encountered an error: %s", t));
        }
    }
    function La(e) {
      be = e;
    }
    function Tu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Du; a++) {
          var i = mv(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function $d(e) {
      be !== null && typeof be.markCommitStarted == "function" && be.markCommitStarted(e);
    }
    function Yd() {
      be !== null && typeof be.markCommitStopped == "function" && be.markCommitStopped();
    }
    function va(e) {
      be !== null && typeof be.markComponentRenderStarted == "function" && be.markComponentRenderStarted(e);
    }
    function ma() {
      be !== null && typeof be.markComponentRenderStopped == "function" && be.markComponentRenderStopped();
    }
    function Wd(e) {
      be !== null && typeof be.markComponentPassiveEffectMountStarted == "function" && be.markComponentPassiveEffectMountStarted(e);
    }
    function pv() {
      be !== null && typeof be.markComponentPassiveEffectMountStopped == "function" && be.markComponentPassiveEffectMountStopped();
    }
    function Ji(e) {
      be !== null && typeof be.markComponentPassiveEffectUnmountStarted == "function" && be.markComponentPassiveEffectUnmountStarted(e);
    }
    function jl() {
      be !== null && typeof be.markComponentPassiveEffectUnmountStopped == "function" && be.markComponentPassiveEffectUnmountStopped();
    }
    function Wc(e) {
      be !== null && typeof be.markComponentLayoutEffectMountStarted == "function" && be.markComponentLayoutEffectMountStarted(e);
    }
    function hv() {
      be !== null && typeof be.markComponentLayoutEffectMountStopped == "function" && be.markComponentLayoutEffectMountStopped();
    }
    function xs(e) {
      be !== null && typeof be.markComponentLayoutEffectUnmountStarted == "function" && be.markComponentLayoutEffectUnmountStarted(e);
    }
    function Qd() {
      be !== null && typeof be.markComponentLayoutEffectUnmountStopped == "function" && be.markComponentLayoutEffectUnmountStopped();
    }
    function Cs(e, t, a) {
      be !== null && typeof be.markComponentErrored == "function" && be.markComponentErrored(e, t, a);
    }
    function Di(e, t, a) {
      be !== null && typeof be.markComponentSuspended == "function" && be.markComponentSuspended(e, t, a);
    }
    function ws(e) {
      be !== null && typeof be.markLayoutEffectsStarted == "function" && be.markLayoutEffectsStarted(e);
    }
    function _s() {
      be !== null && typeof be.markLayoutEffectsStopped == "function" && be.markLayoutEffectsStopped();
    }
    function bu(e) {
      be !== null && typeof be.markPassiveEffectsStarted == "function" && be.markPassiveEffectsStarted(e);
    }
    function Gd() {
      be !== null && typeof be.markPassiveEffectsStopped == "function" && be.markPassiveEffectsStopped();
    }
    function ku(e) {
      be !== null && typeof be.markRenderStarted == "function" && be.markRenderStarted(e);
    }
    function vv() {
      be !== null && typeof be.markRenderYielded == "function" && be.markRenderYielded();
    }
    function Qc() {
      be !== null && typeof be.markRenderStopped == "function" && be.markRenderStopped();
    }
    function Sn(e) {
      be !== null && typeof be.markRenderScheduled == "function" && be.markRenderScheduled(e);
    }
    function Gc(e, t) {
      be !== null && typeof be.markForceUpdateScheduled == "function" && be.markForceUpdateScheduled(e, t);
    }
    function Rs(e, t) {
      be !== null && typeof be.markStateUpdateScheduled == "function" && be.markStateUpdateScheduled(e, t);
    }
    var qe = (
      /*                         */
      0
    ), Ct = (
      /*                 */
      1
    ), Ht = (
      /*                    */
      2
    ), Jt = (
      /*               */
      8
    ), Pt = (
      /*              */
      16
    ), Un = Math.clz32 ? Math.clz32 : Ts, Jn = Math.log, Xc = Math.LN2;
    function Ts(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Jn(t) / Xc | 0) | 0;
    }
    var Du = 31, le = (
      /*                        */
      0
    ), Ft = (
      /*                          */
      0
    ), lt = (
      /*                        */
      1
    ), Hl = (
      /*    */
      2
    ), ii = (
      /*             */
      4
    ), wr = (
      /*            */
      8
    ), Tn = (
      /*                     */
      16
    ), el = (
      /*                */
      32
    ), Pl = (
      /*                       */
      4194240
    ), Mu = (
      /*                        */
      64
    ), qc = (
      /*                        */
      128
    ), Kc = (
      /*                        */
      256
    ), Zc = (
      /*                        */
      512
    ), Jc = (
      /*                        */
      1024
    ), ef = (
      /*                        */
      2048
    ), tf = (
      /*                        */
      4096
    ), nf = (
      /*                        */
      8192
    ), rf = (
      /*                        */
      16384
    ), Ou = (
      /*                       */
      32768
    ), af = (
      /*                       */
      65536
    ), ko = (
      /*                       */
      131072
    ), Do = (
      /*                       */
      262144
    ), lf = (
      /*                       */
      524288
    ), bs = (
      /*                       */
      1048576
    ), uf = (
      /*                       */
      2097152
    ), ks = (
      /*                            */
      130023424
    ), Nu = (
      /*                             */
      4194304
    ), of = (
      /*                             */
      8388608
    ), Ds = (
      /*                             */
      16777216
    ), sf = (
      /*                             */
      33554432
    ), cf = (
      /*                             */
      67108864
    ), Xd = Nu, Ms = (
      /*          */
      134217728
    ), qd = (
      /*                          */
      268435455
    ), Os = (
      /*               */
      268435456
    ), Lu = (
      /*                        */
      536870912
    ), Jr = (
      /*                   */
      1073741824
    );
    function mv(e) {
      {
        if (e & lt)
          return "Sync";
        if (e & Hl)
          return "InputContinuousHydration";
        if (e & ii)
          return "InputContinuous";
        if (e & wr)
          return "DefaultHydration";
        if (e & Tn)
          return "Default";
        if (e & el)
          return "TransitionHydration";
        if (e & Pl)
          return "Transition";
        if (e & ks)
          return "Retry";
        if (e & Ms)
          return "SelectiveHydration";
        if (e & Os)
          return "IdleHydration";
        if (e & Lu)
          return "Idle";
        if (e & Jr)
          return "Offscreen";
      }
    }
    var nn = -1, zu = Mu, ff = Nu;
    function Ns(e) {
      switch (Vl(e)) {
        case lt:
          return lt;
        case Hl:
          return Hl;
        case ii:
          return ii;
        case wr:
          return wr;
        case Tn:
          return Tn;
        case el:
          return el;
        case Mu:
        case qc:
        case Kc:
        case Zc:
        case Jc:
        case ef:
        case tf:
        case nf:
        case rf:
        case Ou:
        case af:
        case ko:
        case Do:
        case lf:
        case bs:
        case uf:
          return e & Pl;
        case Nu:
        case of:
        case Ds:
        case sf:
        case cf:
          return e & ks;
        case Ms:
          return Ms;
        case Os:
          return Os;
        case Lu:
          return Lu;
        case Jr:
          return Jr;
        default:
          return m("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function df(e, t) {
      var a = e.pendingLanes;
      if (a === le)
        return le;
      var i = le, o = e.suspendedLanes, f = e.pingedLanes, h = a & qd;
      if (h !== le) {
        var g = h & ~o;
        if (g !== le)
          i = Ns(g);
        else {
          var E = h & f;
          E !== le && (i = Ns(E));
        }
      } else {
        var _ = a & ~o;
        _ !== le ? i = Ns(_) : f !== le && (i = Ns(f));
      }
      if (i === le)
        return le;
      if (t !== le && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & o) === le) {
        var T = Vl(i), H = Vl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          T >= H || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          T === Tn && (H & Pl) !== le
        )
          return t;
      }
      (i & ii) !== le && (i |= a & Tn);
      var U = e.entangledLanes;
      if (U !== le)
        for (var W = e.entanglements, q = i & U; q > 0; ) {
          var ee = Fn(q), ke = 1 << ee;
          i |= W[ee], q &= ~ke;
        }
      return i;
    }
    function li(e, t) {
      for (var a = e.eventTimes, i = nn; t > 0; ) {
        var o = Fn(t), f = 1 << o, h = a[o];
        h > i && (i = h), t &= ~f;
      }
      return i;
    }
    function Kd(e, t) {
      switch (e) {
        case lt:
        case Hl:
        case ii:
          return t + 250;
        case wr:
        case Tn:
        case el:
        case Mu:
        case qc:
        case Kc:
        case Zc:
        case Jc:
        case ef:
        case tf:
        case nf:
        case rf:
        case Ou:
        case af:
        case ko:
        case Do:
        case lf:
        case bs:
        case uf:
          return t + 5e3;
        case Nu:
        case of:
        case Ds:
        case sf:
        case cf:
          return nn;
        case Ms:
        case Os:
        case Lu:
        case Jr:
          return nn;
        default:
          return m("Should have found matching lanes. This is a bug in React."), nn;
      }
    }
    function pf(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, o = e.pingedLanes, f = e.expirationTimes, h = a; h > 0; ) {
        var g = Fn(h), E = 1 << g, _ = f[g];
        _ === nn ? ((E & i) === le || (E & o) !== le) && (f[g] = Kd(E, t)) : _ <= t && (e.expiredLanes |= E), h &= ~E;
      }
    }
    function yv(e) {
      return Ns(e.pendingLanes);
    }
    function hf(e) {
      var t = e.pendingLanes & ~Jr;
      return t !== le ? t : t & Jr ? Jr : le;
    }
    function gv(e) {
      return (e & lt) !== le;
    }
    function Ls(e) {
      return (e & qd) !== le;
    }
    function Au(e) {
      return (e & ks) === e;
    }
    function Zd(e) {
      var t = lt | ii | Tn;
      return (e & t) === le;
    }
    function Jd(e) {
      return (e & Pl) === e;
    }
    function vf(e, t) {
      var a = Hl | ii | wr | Tn;
      return (t & a) !== le;
    }
    function Sv(e, t) {
      return (t & e.expiredLanes) !== le;
    }
    function ep(e) {
      return (e & Pl) !== le;
    }
    function tp() {
      var e = zu;
      return zu <<= 1, (zu & Pl) === le && (zu = Mu), e;
    }
    function Ev() {
      var e = ff;
      return ff <<= 1, (ff & ks) === le && (ff = Nu), e;
    }
    function Vl(e) {
      return e & -e;
    }
    function zs(e) {
      return Vl(e);
    }
    function Fn(e) {
      return 31 - Un(e);
    }
    function or(e) {
      return Fn(e);
    }
    function ea(e, t) {
      return (e & t) !== le;
    }
    function Uu(e, t) {
      return (e & t) === t;
    }
    function mt(e, t) {
      return e | t;
    }
    function As(e, t) {
      return e & ~t;
    }
    function np(e, t) {
      return e & t;
    }
    function xv(e) {
      return e;
    }
    function Cv(e, t) {
      return e !== Ft && e < t ? e : t;
    }
    function Us(e) {
      for (var t = [], a = 0; a < Du; a++)
        t.push(e);
      return t;
    }
    function Mo(e, t, a) {
      e.pendingLanes |= t, t !== Lu && (e.suspendedLanes = le, e.pingedLanes = le);
      var i = e.eventTimes, o = or(t);
      i[o] = a;
    }
    function wv(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var o = Fn(i), f = 1 << o;
        a[o] = nn, i &= ~f;
      }
    }
    function mf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function rp(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = le, e.pingedLanes = le, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, o = e.eventTimes, f = e.expirationTimes, h = a; h > 0; ) {
        var g = Fn(h), E = 1 << g;
        i[g] = le, o[g] = nn, f[g] = nn, h &= ~E;
      }
    }
    function yf(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, o = a; o; ) {
        var f = Fn(o), h = 1 << f;
        // Is this one of the newly entangled lanes?
        h & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[f] & t && (i[f] |= t), o &= ~h;
      }
    }
    function ap(e, t) {
      var a = Vl(t), i;
      switch (a) {
        case ii:
          i = Hl;
          break;
        case Tn:
          i = wr;
          break;
        case Mu:
        case qc:
        case Kc:
        case Zc:
        case Jc:
        case ef:
        case tf:
        case nf:
        case rf:
        case Ou:
        case af:
        case ko:
        case Do:
        case lf:
        case bs:
        case uf:
        case Nu:
        case of:
        case Ds:
        case sf:
        case cf:
          i = el;
          break;
        case Lu:
          i = Os;
          break;
        default:
          i = Ft;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Ft ? Ft : i;
    }
    function Fs(e, t, a) {
      if (Zr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var o = or(a), f = 1 << o, h = i[o];
          h.add(t), a &= ~f;
        }
    }
    function _v(e, t) {
      if (Zr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var o = or(t), f = 1 << o, h = a[o];
          h.size > 0 && (h.forEach(function(g) {
            var E = g.alternate;
            (E === null || !i.has(E)) && i.add(g);
          }), h.clear()), t &= ~f;
        }
    }
    function ip(e, t) {
      return null;
    }
    var Nr = lt, Mi = ii, za = Tn, Aa = Lu, js = Ft;
    function Ua() {
      return js;
    }
    function jn(e) {
      js = e;
    }
    function Rv(e, t) {
      var a = js;
      try {
        return js = e, t();
      } finally {
        js = a;
      }
    }
    function Tv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Hs(e, t) {
      return e > t ? e : t;
    }
    function er(e, t) {
      return e !== 0 && e < t;
    }
    function bv(e) {
      var t = Vl(e);
      return er(Nr, t) ? er(Mi, t) ? Ls(t) ? za : Aa : Mi : Nr;
    }
    function gf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ps;
    function _r(e) {
      Ps = e;
    }
    function dg(e) {
      Ps(e);
    }
    var Ae;
    function Oo(e) {
      Ae = e;
    }
    var Sf;
    function kv(e) {
      Sf = e;
    }
    var Dv;
    function Vs(e) {
      Dv = e;
    }
    var Bs;
    function lp(e) {
      Bs = e;
    }
    var Ef = !1, Is = [], tl = null, Oi = null, Ni = null, bn = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), zr = [], Mv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Ov(e) {
      return Mv.indexOf(e) > -1;
    }
    function ui(e, t, a, i, o) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: o,
        targetContainers: [i]
      };
    }
    function up(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          tl = null;
          break;
        case "dragenter":
        case "dragleave":
          Oi = null;
          break;
        case "mouseover":
        case "mouseout":
          Ni = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          bn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lr.delete(i);
          break;
        }
      }
    }
    function ta(e, t, a, i, o, f) {
      if (e === null || e.nativeEvent !== f) {
        var h = ui(t, a, i, o, f);
        if (t !== null) {
          var g = Po(t);
          g !== null && Ae(g);
        }
        return h;
      }
      e.eventSystemFlags |= i;
      var E = e.targetContainers;
      return o !== null && E.indexOf(o) === -1 && E.push(o), e;
    }
    function pg(e, t, a, i, o) {
      switch (t) {
        case "focusin": {
          var f = o;
          return tl = ta(tl, e, t, a, i, f), !0;
        }
        case "dragenter": {
          var h = o;
          return Oi = ta(Oi, e, t, a, i, h), !0;
        }
        case "mouseover": {
          var g = o;
          return Ni = ta(Ni, e, t, a, i, g), !0;
        }
        case "pointerover": {
          var E = o, _ = E.pointerId;
          return bn.set(_, ta(bn.get(_) || null, e, t, a, i, E)), !0;
        }
        case "gotpointercapture": {
          var T = o, H = T.pointerId;
          return Lr.set(H, ta(Lr.get(H) || null, e, t, a, i, T)), !0;
        }
      }
      return !1;
    }
    function op(e) {
      var t = tc(e.target);
      if (t !== null) {
        var a = pa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === xe) {
            var o = bi(a);
            if (o !== null) {
              e.blockedOn = o, Bs(e.priority, function() {
                Sf(a);
              });
              return;
            }
          } else if (i === L) {
            var f = a.stateNode;
            if (gf(f)) {
              e.blockedOn = ki(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Nv(e) {
      for (var t = Dv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < zr.length && er(t, zr[i].priority); i++)
        ;
      zr.splice(i, 0, a), i === 0 && op(a);
    }
    function $s(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Lo(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var o = e.nativeEvent, f = new o.constructor(o.type, o);
          ug(f), o.target.dispatchEvent(f), og();
        } else {
          var h = Po(i);
          return h !== null && Ae(h), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function sp(e, t, a) {
      $s(e) && a.delete(t);
    }
    function hg() {
      Ef = !1, tl !== null && $s(tl) && (tl = null), Oi !== null && $s(Oi) && (Oi = null), Ni !== null && $s(Ni) && (Ni = null), bn.forEach(sp), Lr.forEach(sp);
    }
    function Bl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Ef || (Ef = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, hg)));
    }
    function Fu(e) {
      if (Is.length > 0) {
        Bl(Is[0], e);
        for (var t = 1; t < Is.length; t++) {
          var a = Is[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      tl !== null && Bl(tl, e), Oi !== null && Bl(Oi, e), Ni !== null && Bl(Ni, e);
      var i = function(g) {
        return Bl(g, e);
      };
      bn.forEach(i), Lr.forEach(i);
      for (var o = 0; o < zr.length; o++) {
        var f = zr[o];
        f.blockedOn === e && (f.blockedOn = null);
      }
      for (; zr.length > 0; ) {
        var h = zr[0];
        if (h.blockedOn !== null)
          break;
        op(h), h.blockedOn === null && zr.shift();
      }
    }
    var sr = d.ReactCurrentBatchConfig, Nt = !0;
    function Gn(e) {
      Nt = !!e;
    }
    function Hn() {
      return Nt;
    }
    function cr(e, t, a) {
      var i = xf(t), o;
      switch (i) {
        case Nr:
          o = ya;
          break;
        case Mi:
          o = No;
          break;
        case za:
        default:
          o = kn;
          break;
      }
      return o.bind(null, t, a, e);
    }
    function ya(e, t, a, i) {
      var o = Ua(), f = sr.transition;
      sr.transition = null;
      try {
        jn(Nr), kn(e, t, a, i);
      } finally {
        jn(o), sr.transition = f;
      }
    }
    function No(e, t, a, i) {
      var o = Ua(), f = sr.transition;
      sr.transition = null;
      try {
        jn(Mi), kn(e, t, a, i);
      } finally {
        jn(o), sr.transition = f;
      }
    }
    function kn(e, t, a, i) {
      Nt && Ys(e, t, a, i);
    }
    function Ys(e, t, a, i) {
      var o = Lo(e, t, a, i);
      if (o === null) {
        Og(e, t, i, Li, a), up(e, i);
        return;
      }
      if (pg(o, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (up(e, i), t & ka && Ov(e)) {
        for (; o !== null; ) {
          var f = Po(o);
          f !== null && dg(f);
          var h = Lo(e, t, a, i);
          if (h === null && Og(e, t, i, Li, a), h === o)
            break;
          o = h;
        }
        o !== null && i.stopPropagation();
        return;
      }
      Og(e, t, i, null, a);
    }
    var Li = null;
    function Lo(e, t, a, i) {
      Li = null;
      var o = Ad(i), f = tc(o);
      if (f !== null) {
        var h = pa(f);
        if (h === null)
          f = null;
        else {
          var g = h.tag;
          if (g === xe) {
            var E = bi(h);
            if (E !== null)
              return E;
            f = null;
          } else if (g === L) {
            var _ = h.stateNode;
            if (gf(_))
              return ki(h);
            f = null;
          } else h !== f && (f = null);
        }
      }
      return Li = f, null;
    }
    function xf(e) {
      switch (e) {
        // Used by SimpleEventPlugin:
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        // Used by polyfills:
        // eslint-disable-next-line no-fallthrough
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        // Only enableCreateEventHandleAPI:
        // eslint-disable-next-line no-fallthrough
        case "beforeblur":
        case "afterblur":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Nr;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Mi;
        case "message": {
          var t = $c();
          switch (t) {
            case Es:
              return Nr;
            case Fl:
              return Mi;
            case Zi:
            case fg:
              return za;
            case _u:
              return Aa;
            default:
              return za;
          }
        }
        default:
          return za;
      }
    }
    function Ws(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function na(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function cp(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function zo(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ga = null, Ao = null, ju = null;
    function Il(e) {
      return ga = e, Ao = Qs(), !0;
    }
    function Cf() {
      ga = null, Ao = null, ju = null;
    }
    function nl() {
      if (ju)
        return ju;
      var e, t = Ao, a = t.length, i, o = Qs(), f = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++)
        ;
      var h = a - e;
      for (i = 1; i <= h && t[a - i] === o[f - i]; i++)
        ;
      var g = i > 1 ? 1 - i : void 0;
      return ju = o.slice(e, g), ju;
    }
    function Qs() {
      return "value" in ga ? ga.value : ga.textContent;
    }
    function $l(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Uo() {
      return !0;
    }
    function Gs() {
      return !1;
    }
    function Rr(e) {
      function t(a, i, o, f, h) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = h, this.currentTarget = null;
        for (var g in e)
          if (e.hasOwnProperty(g)) {
            var E = e[g];
            E ? this[g] = E(f) : this[g] = f[g];
          }
        var _ = f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1;
        return _ ? this.isDefaultPrevented = Uo : this.isDefaultPrevented = Gs, this.isPropagationStopped = Gs, this;
      }
      return yt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Uo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Uo);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Uo
      }), t;
    }
    var Pn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, zi = Rr(Pn), Ar = yt({}, Pn, {
      view: 0,
      detail: 0
    }), ra = Rr(Ar), wf, Xs, Hu;
    function vg(e) {
      e !== Hu && (Hu && e.type === "mousemove" ? (wf = e.screenX - Hu.screenX, Xs = e.screenY - Hu.screenY) : (wf = 0, Xs = 0), Hu = e);
    }
    var oi = yt({}, Ar, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: hn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (vg(e), wf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Xs;
      }
    }), fp = Rr(oi), dp = yt({}, oi, {
      dataTransfer: 0
    }), Pu = Rr(dp), pp = yt({}, Ar, {
      relatedTarget: 0
    }), rl = Rr(pp), Lv = yt({}, Pn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), zv = Rr(Lv), hp = yt({}, Pn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), _f = Rr(hp), mg = yt({}, Pn, {
      data: 0
    }), Av = Rr(mg), Uv = Av, Fv = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Vu = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function yg(e) {
      if (e.key) {
        var t = Fv[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = $l(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Vu[e.keyCode] || "Unidentified" : "";
    }
    var Fo = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function jv(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Fo[e];
      return i ? !!a[i] : !1;
    }
    function hn(e) {
      return jv;
    }
    var gg = yt({}, Ar, {
      key: yg,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: hn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? $l(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? $l(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Hv = Rr(gg), Sg = yt({}, oi, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Pv = Rr(Sg), Vv = yt({}, Ar, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: hn
    }), Bv = Rr(Vv), Eg = yt({}, Pn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Fa = Rr(Eg), vp = yt({}, oi, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), xg = Rr(vp), Yl = [9, 13, 27, 32], qs = 229, al = On && "CompositionEvent" in window, Wl = null;
    On && "documentMode" in document && (Wl = document.documentMode);
    var mp = On && "TextEvent" in window && !Wl, Rf = On && (!al || Wl && Wl > 8 && Wl <= 11), Iv = 32, Tf = String.fromCharCode(Iv);
    function Cg() {
      pt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), pt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), pt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), pt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var yp = !1;
    function $v(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function bf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function kf(e, t) {
      return e === "keydown" && t.keyCode === qs;
    }
    function gp(e, t) {
      switch (e) {
        case "keyup":
          return Yl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== qs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Df(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Yv(e) {
      return e.locale === "ko";
    }
    var Bu = !1;
    function Sp(e, t, a, i, o) {
      var f, h;
      if (al ? f = bf(t) : Bu ? gp(t, i) && (f = "onCompositionEnd") : kf(t, i) && (f = "onCompositionStart"), !f)
        return null;
      Rf && !Yv(i) && (!Bu && f === "onCompositionStart" ? Bu = Il(o) : f === "onCompositionEnd" && Bu && (h = nl()));
      var g = Zv(a, f);
      if (g.length > 0) {
        var E = new Av(f, t, null, i, o);
        if (e.push({
          event: E,
          listeners: g
        }), h)
          E.data = h;
        else {
          var _ = Df(i);
          _ !== null && (E.data = _);
        }
      }
    }
    function Mf(e, t) {
      switch (e) {
        case "compositionend":
          return Df(t);
        case "keypress":
          var a = t.which;
          return a !== Iv ? null : (yp = !0, Tf);
        case "textInput":
          var i = t.data;
          return i === Tf && yp ? null : i;
        default:
          return null;
      }
    }
    function Ep(e, t) {
      if (Bu) {
        if (e === "compositionend" || !al && gp(e, t)) {
          var a = nl();
          return Cf(), Bu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!$v(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Rf && !Yv(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Of(e, t, a, i, o) {
      var f;
      if (mp ? f = Mf(t, i) : f = Ep(t, i), !f)
        return null;
      var h = Zv(a, "onBeforeInput");
      if (h.length > 0) {
        var g = new Uv("onBeforeInput", "beforeinput", null, i, o);
        e.push({
          event: g,
          listeners: h
        }), g.data = f;
      }
    }
    function Wv(e, t, a, i, o, f, h) {
      Sp(e, t, a, i, o), Of(e, t, a, i, o);
    }
    var wg = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Ks(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!wg[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function _g(e) {
      if (!On)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Zs() {
      pt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Qv(e, t, a, i) {
      Eo(i);
      var o = Zv(t, "onChange");
      if (o.length > 0) {
        var f = new zi("onChange", "change", null, a, i);
        e.push({
          event: f,
          listeners: o
        });
      }
    }
    var Ql = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      Qv(t, n, e, Ad(e)), iv(s, t);
    }
    function s(e) {
      ex(e, 0);
    }
    function p(e) {
      var t = Ff(e);
      if (xi(t))
        return e;
    }
    function v(e, t) {
      if (e === "change")
        return t;
    }
    var C = !1;
    On && (C = _g("input") && (!document.documentMode || document.documentMode > 9));
    function D(e, t) {
      Ql = e, n = t, Ql.attachEvent("onpropertychange", G);
    }
    function A() {
      Ql && (Ql.detachEvent("onpropertychange", G), Ql = null, n = null);
    }
    function G(e) {
      e.propertyName === "value" && p(n) && l(e);
    }
    function ce(e, t, a) {
      e === "focusin" ? (A(), D(t, a)) : e === "focusout" && A();
    }
    function he(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return p(n);
    }
    function oe(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Ne(e, t) {
      if (e === "click")
        return p(t);
    }
    function Ve(e, t) {
      if (e === "input" || e === "change")
        return p(t);
    }
    function $e(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || tt(e, "number", e.value);
    }
    function Dn(e, t, a, i, o, f, h) {
      var g = a ? Ff(a) : window, E, _;
      if (r(g) ? E = v : Ks(g) ? C ? E = Ve : (E = he, _ = ce) : oe(g) && (E = Ne), E) {
        var T = E(t, a);
        if (T) {
          Qv(e, T, i, o);
          return;
        }
      }
      _ && _(t, g, a), t === "focusout" && $e(g);
    }
    function B() {
      Qt("onMouseEnter", ["mouseout", "mouseover"]), Qt("onMouseLeave", ["mouseout", "mouseover"]), Qt("onPointerEnter", ["pointerout", "pointerover"]), Qt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function j(e, t, a, i, o, f, h) {
      var g = t === "mouseover" || t === "pointerover", E = t === "mouseout" || t === "pointerout";
      if (g && !hs(i)) {
        var _ = i.relatedTarget || i.fromElement;
        if (_ && (tc(_) || zp(_)))
          return;
      }
      if (!(!E && !g)) {
        var T;
        if (o.window === o)
          T = o;
        else {
          var H = o.ownerDocument;
          H ? T = H.defaultView || H.parentWindow : T = window;
        }
        var U, W;
        if (E) {
          var q = i.relatedTarget || i.toElement;
          if (U = a, W = q ? tc(q) : null, W !== null) {
            var ee = pa(W);
            (W !== ee || W.tag !== V && W.tag !== me) && (W = null);
          }
        } else
          U = null, W = a;
        if (U !== W) {
          var ke = fp, nt = "onMouseLeave", We = "onMouseEnter", zt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ke = Pv, nt = "onPointerLeave", We = "onPointerEnter", zt = "pointer");
          var bt = U == null ? T : Ff(U), I = W == null ? T : Ff(W), te = new ke(nt, zt + "leave", U, i, o);
          te.target = bt, te.relatedTarget = I;
          var $ = null, ve = tc(o);
          if (ve === a) {
            var ze = new ke(We, zt + "enter", W, i, o);
            ze.target = I, ze.relatedTarget = bt, $ = ze;
          }
          lR(e, te, $, U, W);
        }
      }
    }
    function Y(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var fe = typeof Object.is == "function" ? Object.is : Y;
    function Be(e, t) {
      if (fe(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var o = 0; o < a.length; o++) {
        var f = a[o];
        if (!Tr.call(t, f) || !fe(e[f], t[f]))
          return !1;
      }
      return !0;
    }
    function rt(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function it(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function ot(e, t) {
      for (var a = rt(e), i = 0, o = 0; a; ) {
        if (a.nodeType === Qi) {
          if (o = i + a.textContent.length, i <= t && o >= t)
            return {
              node: a,
              offset: t - i
            };
          i = o;
        }
        a = rt(it(a));
      }
    }
    function tr(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var o = i.anchorNode, f = i.anchorOffset, h = i.focusNode, g = i.focusOffset;
      try {
        o.nodeType, h.nodeType;
      } catch {
        return null;
      }
      return Vt(e, o, f, h, g);
    }
    function Vt(e, t, a, i, o) {
      var f = 0, h = -1, g = -1, E = 0, _ = 0, T = e, H = null;
      e: for (; ; ) {
        for (var U = null; T === t && (a === 0 || T.nodeType === Qi) && (h = f + a), T === i && (o === 0 || T.nodeType === Qi) && (g = f + o), T.nodeType === Qi && (f += T.nodeValue.length), (U = T.firstChild) !== null; )
          H = T, T = U;
        for (; ; ) {
          if (T === e)
            break e;
          if (H === t && ++E === a && (h = f), H === i && ++_ === o && (g = f), (U = T.nextSibling) !== null)
            break;
          T = H, H = T.parentNode;
        }
        T = U;
      }
      return h === -1 || g === -1 ? null : {
        start: h,
        end: g
      };
    }
    function Gl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var o = i.getSelection(), f = e.textContent.length, h = Math.min(t.start, f), g = t.end === void 0 ? h : Math.min(t.end, f);
        if (!o.extend && h > g) {
          var E = g;
          g = h, h = E;
        }
        var _ = ot(e, h), T = ot(e, g);
        if (_ && T) {
          if (o.rangeCount === 1 && o.anchorNode === _.node && o.anchorOffset === _.offset && o.focusNode === T.node && o.focusOffset === T.offset)
            return;
          var H = a.createRange();
          H.setStart(_.node, _.offset), o.removeAllRanges(), h > g ? (o.addRange(H), o.extend(T.node, T.offset)) : (H.setEnd(T.node, T.offset), o.addRange(H));
        }
      }
    }
    function Gv(e) {
      return e && e.nodeType === Qi;
    }
    function IE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : Gv(e) ? !1 : Gv(t) ? IE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function B_(e) {
      return e && e.ownerDocument && IE(e.ownerDocument.documentElement, e);
    }
    function I_(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function $E() {
      for (var e = window, t = ba(); t instanceof e.HTMLIFrameElement; ) {
        if (I_(t))
          e = t.contentWindow;
        else
          return t;
        t = ba(e.document);
      }
      return t;
    }
    function Rg(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function $_() {
      var e = $E();
      return {
        focusedElem: e,
        selectionRange: Rg(e) ? W_(e) : null
      };
    }
    function Y_(e) {
      var t = $E(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && B_(a)) {
        i !== null && Rg(a) && Q_(a, i);
        for (var o = [], f = a; f = f.parentNode; )
          f.nodeType === Qr && o.push({
            element: f,
            left: f.scrollLeft,
            top: f.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var h = 0; h < o.length; h++) {
          var g = o[h];
          g.element.scrollLeft = g.left, g.element.scrollTop = g.top;
        }
      }
    }
    function W_(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = tr(e), t || {
        start: 0,
        end: 0
      };
    }
    function Q_(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Gl(e, t);
    }
    var G_ = On && "documentMode" in document && document.documentMode <= 11;
    function X_() {
      pt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Nf = null, Tg = null, xp = null, bg = !1;
    function q_(e) {
      if ("selectionStart" in e && Rg(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function K_(e) {
      return e.window === e ? e.document : e.nodeType === Gi ? e : e.ownerDocument;
    }
    function YE(e, t, a) {
      var i = K_(a);
      if (!(bg || Nf == null || Nf !== ba(i))) {
        var o = q_(Nf);
        if (!xp || !Be(xp, o)) {
          xp = o;
          var f = Zv(Tg, "onSelect");
          if (f.length > 0) {
            var h = new zi("onSelect", "select", null, t, a);
            e.push({
              event: h,
              listeners: f
            }), h.target = Nf;
          }
        }
      }
    }
    function Z_(e, t, a, i, o, f, h) {
      var g = a ? Ff(a) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (Ks(g) || g.contentEditable === "true") && (Nf = g, Tg = a, xp = null);
          break;
        case "focusout":
          Nf = null, Tg = null, xp = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          bg = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          bg = !1, YE(e, i, o);
          break;
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't). IE's event fires out of order with respect
        // to key and input events on deletion, so we discard it.
        //
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        // This is also our approach for IE handling, for the reason above.
        case "selectionchange":
          if (G_)
            break;
        // falls through
        case "keydown":
        case "keyup":
          YE(e, i, o);
      }
    }
    function Xv(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Lf = {
      animationend: Xv("Animation", "AnimationEnd"),
      animationiteration: Xv("Animation", "AnimationIteration"),
      animationstart: Xv("Animation", "AnimationStart"),
      transitionend: Xv("Transition", "TransitionEnd")
    }, kg = {}, WE = {};
    On && (WE = document.createElement("div").style, "AnimationEvent" in window || (delete Lf.animationend.animation, delete Lf.animationiteration.animation, delete Lf.animationstart.animation), "TransitionEvent" in window || delete Lf.transitionend.transition);
    function qv(e) {
      if (kg[e])
        return kg[e];
      if (!Lf[e])
        return e;
      var t = Lf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in WE)
          return kg[e] = t[a];
      return e;
    }
    var QE = qv("animationend"), GE = qv("animationiteration"), XE = qv("animationstart"), qE = qv("transitionend"), KE = /* @__PURE__ */ new Map(), ZE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function jo(e, t) {
      KE.set(e, t), pt(t, [e]);
    }
    function J_() {
      for (var e = 0; e < ZE.length; e++) {
        var t = ZE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        jo(a, "on" + i);
      }
      jo(QE, "onAnimationEnd"), jo(GE, "onAnimationIteration"), jo(XE, "onAnimationStart"), jo("dblclick", "onDoubleClick"), jo("focusin", "onFocus"), jo("focusout", "onBlur"), jo(qE, "onTransitionEnd");
    }
    function eR(e, t, a, i, o, f, h) {
      var g = KE.get(t);
      if (g !== void 0) {
        var E = zi, _ = t;
        switch (t) {
          case "keypress":
            if ($l(i) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            E = Hv;
            break;
          case "focusin":
            _ = "focus", E = rl;
            break;
          case "focusout":
            _ = "blur", E = rl;
            break;
          case "beforeblur":
          case "afterblur":
            E = rl;
            break;
          case "click":
            if (i.button === 2)
              return;
          /* falls through */
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            E = fp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            E = Pu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            E = Bv;
            break;
          case QE:
          case GE:
          case XE:
            E = zv;
            break;
          case qE:
            E = Fa;
            break;
          case "scroll":
            E = ra;
            break;
          case "wheel":
            E = xg;
            break;
          case "copy":
          case "cut":
          case "paste":
            E = _f;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            E = Pv;
            break;
        }
        var T = (f & ka) !== 0;
        {
          var H = !T && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", U = aR(a, g, i.type, T, H);
          if (U.length > 0) {
            var W = new E(g, _, null, i, o);
            e.push({
              event: W,
              listeners: U
            });
          }
        }
      }
    }
    J_(), B(), Zs(), X_(), Cg();
    function tR(e, t, a, i, o, f, h) {
      eR(e, t, a, i, o, f);
      var g = (f & zd) === 0;
      g && (j(e, t, a, i, o), Dn(e, t, a, i, o), Z_(e, t, a, i, o), Wv(e, t, a, i, o));
    }
    var Cp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Dg = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Cp));
    function JE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, _i(i, t, void 0, e), e.currentTarget = null;
    }
    function nR(e, t, a) {
      var i;
      if (a)
        for (var o = t.length - 1; o >= 0; o--) {
          var f = t[o], h = f.instance, g = f.currentTarget, E = f.listener;
          if (h !== i && e.isPropagationStopped())
            return;
          JE(e, E, g), i = h;
        }
      else
        for (var _ = 0; _ < t.length; _++) {
          var T = t[_], H = T.instance, U = T.currentTarget, W = T.listener;
          if (H !== i && e.isPropagationStopped())
            return;
          JE(e, W, U), i = H;
        }
    }
    function ex(e, t) {
      for (var a = (t & ka) !== 0, i = 0; i < e.length; i++) {
        var o = e[i], f = o.event, h = o.listeners;
        nR(f, h, a);
      }
      ys();
    }
    function rR(e, t, a, i, o) {
      var f = Ad(a), h = [];
      tR(h, e, i, a, f, t), ex(h, t);
    }
    function En(e, t) {
      Dg.has(e) || m('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = LT(t), o = uR(e);
      i.has(o) || (tx(t, e, Oc, a), i.add(o));
    }
    function Mg(e, t, a) {
      Dg.has(e) && !t && m('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= ka), tx(a, e, i, t);
    }
    var Kv = "_reactListening" + Math.random().toString(36).slice(2);
    function wp(e) {
      if (!e[Kv]) {
        e[Kv] = !0, Je.forEach(function(a) {
          a !== "selectionchange" && (Dg.has(a) || Mg(a, !1, e), Mg(a, !0, e));
        });
        var t = e.nodeType === Gi ? e : e.ownerDocument;
        t !== null && (t[Kv] || (t[Kv] = !0, Mg("selectionchange", !1, t)));
      }
    }
    function tx(e, t, a, i, o) {
      var f = cr(e, t, a), h = void 0;
      ms && (t === "touchstart" || t === "touchmove" || t === "wheel") && (h = !0), e = e, i ? h !== void 0 ? cp(e, t, f, h) : na(e, t, f) : h !== void 0 ? zo(e, t, f, h) : Ws(e, t, f);
    }
    function nx(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function Og(e, t, a, i, o) {
      var f = i;
      if ((t & Ld) === 0 && (t & Oc) === 0) {
        var h = o;
        if (i !== null) {
          var g = i;
          e: for (; ; ) {
            if (g === null)
              return;
            var E = g.tag;
            if (E === L || E === F) {
              var _ = g.stateNode.containerInfo;
              if (nx(_, h))
                break;
              if (E === F)
                for (var T = g.return; T !== null; ) {
                  var H = T.tag;
                  if (H === L || H === F) {
                    var U = T.stateNode.containerInfo;
                    if (nx(U, h))
                      return;
                  }
                  T = T.return;
                }
              for (; _ !== null; ) {
                var W = tc(_);
                if (W === null)
                  return;
                var q = W.tag;
                if (q === V || q === me) {
                  g = f = W;
                  continue e;
                }
                _ = _.parentNode;
              }
            }
            g = g.return;
          }
        }
      }
      iv(function() {
        return rR(e, t, a, f);
      });
    }
    function _p(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function aR(e, t, a, i, o, f) {
      for (var h = t !== null ? t + "Capture" : null, g = i ? h : t, E = [], _ = e, T = null; _ !== null; ) {
        var H = _, U = H.stateNode, W = H.tag;
        if (W === V && U !== null && (T = U, g !== null)) {
          var q = Ol(_, g);
          q != null && E.push(_p(_, q, T));
        }
        if (o)
          break;
        _ = _.return;
      }
      return E;
    }
    function Zv(e, t) {
      for (var a = t + "Capture", i = [], o = e; o !== null; ) {
        var f = o, h = f.stateNode, g = f.tag;
        if (g === V && h !== null) {
          var E = h, _ = Ol(o, a);
          _ != null && i.unshift(_p(o, _, E));
          var T = Ol(o, t);
          T != null && i.push(_p(o, T, E));
        }
        o = o.return;
      }
      return i;
    }
    function zf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== V);
      return e || null;
    }
    function iR(e, t) {
      for (var a = e, i = t, o = 0, f = a; f; f = zf(f))
        o++;
      for (var h = 0, g = i; g; g = zf(g))
        h++;
      for (; o - h > 0; )
        a = zf(a), o--;
      for (; h - o > 0; )
        i = zf(i), h--;
      for (var E = o; E--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = zf(a), i = zf(i);
      }
      return null;
    }
    function rx(e, t, a, i, o) {
      for (var f = t._reactName, h = [], g = a; g !== null && g !== i; ) {
        var E = g, _ = E.alternate, T = E.stateNode, H = E.tag;
        if (_ !== null && _ === i)
          break;
        if (H === V && T !== null) {
          var U = T;
          if (o) {
            var W = Ol(g, f);
            W != null && h.unshift(_p(g, W, U));
          } else if (!o) {
            var q = Ol(g, f);
            q != null && h.push(_p(g, q, U));
          }
        }
        g = g.return;
      }
      h.length !== 0 && e.push({
        event: t,
        listeners: h
      });
    }
    function lR(e, t, a, i, o) {
      var f = i && o ? iR(i, o) : null;
      i !== null && rx(e, t, i, f, !1), o !== null && a !== null && rx(e, a, o, f, !0);
    }
    function uR(e, t) {
      return e + "__bubble";
    }
    var ja = !1, Rp = "dangerouslySetInnerHTML", Jv = "suppressContentEditableWarning", Ho = "suppressHydrationWarning", ax = "autoFocus", Js = "children", ec = "style", em = "__html", Ng, tm, Tp, ix, nm, lx, ux;
    Ng = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, tm = function(e, t) {
      Md(e, t), Dc(e, t), nv(e, t, {
        registrationNameDependencies: Ge,
        possibleRegistrationNames: et
      });
    }, lx = On && !document.documentMode, Tp = function(e, t, a) {
      if (!ja) {
        var i = rm(a), o = rm(t);
        o !== i && (ja = !0, m("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(o), JSON.stringify(i)));
      }
    }, ix = function(e) {
      if (!ja) {
        ja = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), m("Extra attributes from the server: %s", t);
      }
    }, nm = function(e, t) {
      t === !1 ? m("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : m("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, ux = function(e, t) {
      var a = e.namespaceURI === Wi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var oR = /\r\n?/g, sR = /\u0000|\uFFFD/g;
    function rm(e) {
      qn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(oR, `
`).replace(sR, "");
    }
    function am(e, t, a, i) {
      var o = rm(t), f = rm(e);
      if (f !== o && (i && (ja || (ja = !0, m('Text content did not match. Server: "%s" Client: "%s"', f, o))), a && re))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function ox(e) {
      return e.nodeType === Gi ? e : e.ownerDocument;
    }
    function cR() {
    }
    function im(e) {
      e.onclick = cR;
    }
    function fR(e, t, a, i, o) {
      for (var f in i)
        if (i.hasOwnProperty(f)) {
          var h = i[f];
          if (f === ec)
            h && Object.freeze(h), qh(t, h);
          else if (f === Rp) {
            var g = h ? h[em] : void 0;
            g != null && jh(t, g);
          } else if (f === Js)
            if (typeof h == "string") {
              var E = e !== "textarea" || h !== "";
              E && mo(t, h);
            } else typeof h == "number" && mo(t, "" + h);
          else f === Jv || f === Ho || f === ax || (Ge.hasOwnProperty(f) ? h != null && (typeof h != "function" && nm(f, h), f === "onScroll" && En("scroll", t)) : h != null && br(t, f, h, o));
        }
    }
    function dR(e, t, a, i) {
      for (var o = 0; o < t.length; o += 2) {
        var f = t[o], h = t[o + 1];
        f === ec ? qh(e, h) : f === Rp ? jh(e, h) : f === Js ? mo(e, h) : br(e, f, h, i);
      }
    }
    function pR(e, t, a, i) {
      var o, f = ox(a), h, g = i;
      if (g === Wi && (g = wd(e)), g === Wi) {
        if (o = Dl(e, t), !o && e !== e.toLowerCase() && m("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var E = f.createElement("div");
          E.innerHTML = "<script><\/script>";
          var _ = E.firstChild;
          h = E.removeChild(_);
        } else if (typeof t.is == "string")
          h = f.createElement(e, {
            is: t.is
          });
        else if (h = f.createElement(e), e === "select") {
          var T = h;
          t.multiple ? T.multiple = !0 : t.size && (T.size = t.size);
        }
      } else
        h = f.createElementNS(g, e);
      return g === Wi && !o && Object.prototype.toString.call(h) === "[object HTMLUnknownElement]" && !Tr.call(Ng, e) && (Ng[e] = !0, m("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), h;
    }
    function hR(e, t) {
      return ox(t).createTextNode(e);
    }
    function vR(e, t, a, i) {
      var o = Dl(t, a);
      tm(t, a);
      var f;
      switch (t) {
        case "dialog":
          En("cancel", e), En("close", e), f = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          En("load", e), f = a;
          break;
        case "video":
        case "audio":
          for (var h = 0; h < Cp.length; h++)
            En(Cp[h], e);
          f = a;
          break;
        case "source":
          En("error", e), f = a;
          break;
        case "img":
        case "image":
        case "link":
          En("error", e), En("load", e), f = a;
          break;
        case "details":
          En("toggle", e), f = a;
          break;
        case "input":
          ni(e, a), f = vo(e, a), En("invalid", e);
          break;
        case "option":
          Ut(e, a), f = a;
          break;
        case "select":
          mu(e, a), f = us(e, a), En("invalid", e);
          break;
        case "textarea":
          Ed(e, a), f = Sd(e, a), En("invalid", e);
          break;
        default:
          f = a;
      }
      switch (bc(t, f), fR(t, e, i, f, o), t) {
        case "input":
          ti(e), Q(e, a, !1);
          break;
        case "textarea":
          ti(e), Uh(e);
          break;
        case "option":
          un(e, a);
          break;
        case "select":
          yd(e, a);
          break;
        default:
          typeof f.onClick == "function" && im(e);
          break;
      }
    }
    function mR(e, t, a, i, o) {
      tm(t, i);
      var f = null, h, g;
      switch (t) {
        case "input":
          h = vo(e, a), g = vo(e, i), f = [];
          break;
        case "select":
          h = us(e, a), g = us(e, i), f = [];
          break;
        case "textarea":
          h = Sd(e, a), g = Sd(e, i), f = [];
          break;
        default:
          h = a, g = i, typeof h.onClick != "function" && typeof g.onClick == "function" && im(e);
          break;
      }
      bc(t, g);
      var E, _, T = null;
      for (E in h)
        if (!(g.hasOwnProperty(E) || !h.hasOwnProperty(E) || h[E] == null))
          if (E === ec) {
            var H = h[E];
            for (_ in H)
              H.hasOwnProperty(_) && (T || (T = {}), T[_] = "");
          } else E === Rp || E === Js || E === Jv || E === Ho || E === ax || (Ge.hasOwnProperty(E) ? f || (f = []) : (f = f || []).push(E, null));
      for (E in g) {
        var U = g[E], W = h != null ? h[E] : void 0;
        if (!(!g.hasOwnProperty(E) || U === W || U == null && W == null))
          if (E === ec)
            if (U && Object.freeze(U), W) {
              for (_ in W)
                W.hasOwnProperty(_) && (!U || !U.hasOwnProperty(_)) && (T || (T = {}), T[_] = "");
              for (_ in U)
                U.hasOwnProperty(_) && W[_] !== U[_] && (T || (T = {}), T[_] = U[_]);
            } else
              T || (f || (f = []), f.push(E, T)), T = U;
          else if (E === Rp) {
            var q = U ? U[em] : void 0, ee = W ? W[em] : void 0;
            q != null && ee !== q && (f = f || []).push(E, q);
          } else E === Js ? (typeof U == "string" || typeof U == "number") && (f = f || []).push(E, "" + U) : E === Jv || E === Ho || (Ge.hasOwnProperty(E) ? (U != null && (typeof U != "function" && nm(E, U), E === "onScroll" && En("scroll", e)), !f && W !== U && (f = [])) : (f = f || []).push(E, U));
      }
      return T && (ig(T, g[ec]), (f = f || []).push(ec, T)), f;
    }
    function yR(e, t, a, i, o) {
      a === "input" && o.type === "radio" && o.name != null && x(e, o);
      var f = Dl(a, i), h = Dl(a, o);
      switch (dR(e, t, f, h), a) {
        case "input":
          M(e, o);
          break;
        case "textarea":
          Ah(e, o);
          break;
        case "select":
          _c(e, o);
          break;
      }
    }
    function gR(e) {
      {
        var t = e.toLowerCase();
        return ds.hasOwnProperty(t) && ds[t] || null;
      }
    }
    function SR(e, t, a, i, o, f, h) {
      var g, E;
      switch (g = Dl(t, a), tm(t, a), t) {
        case "dialog":
          En("cancel", e), En("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          En("load", e);
          break;
        case "video":
        case "audio":
          for (var _ = 0; _ < Cp.length; _++)
            En(Cp[_], e);
          break;
        case "source":
          En("error", e);
          break;
        case "img":
        case "image":
        case "link":
          En("error", e), En("load", e);
          break;
        case "details":
          En("toggle", e);
          break;
        case "input":
          ni(e, a), En("invalid", e);
          break;
        case "option":
          Ut(e, a);
          break;
        case "select":
          mu(e, a), En("invalid", e);
          break;
        case "textarea":
          Ed(e, a), En("invalid", e);
          break;
      }
      bc(t, a);
      {
        E = /* @__PURE__ */ new Set();
        for (var T = e.attributes, H = 0; H < T.length; H++) {
          var U = T[H].name.toLowerCase();
          switch (U) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              E.add(T[H].name);
          }
        }
      }
      var W = null;
      for (var q in a)
        if (a.hasOwnProperty(q)) {
          var ee = a[q];
          if (q === Js)
            typeof ee == "string" ? e.textContent !== ee && (a[Ho] !== !0 && am(e.textContent, ee, f, h), W = [Js, ee]) : typeof ee == "number" && e.textContent !== "" + ee && (a[Ho] !== !0 && am(e.textContent, ee, f, h), W = [Js, "" + ee]);
          else if (Ge.hasOwnProperty(q))
            ee != null && (typeof ee != "function" && nm(q, ee), q === "onScroll" && En("scroll", e));
          else if (h && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof g == "boolean") {
            var ke = void 0, nt = an(q);
            if (a[Ho] !== !0) {
              if (!(q === Jv || q === Ho || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              q === "value" || q === "checked" || q === "selected")) {
                if (q === Rp) {
                  var We = e.innerHTML, zt = ee ? ee[em] : void 0;
                  if (zt != null) {
                    var bt = ux(e, zt);
                    bt !== We && Tp(q, We, bt);
                  }
                } else if (q === ec) {
                  if (E.delete(q), lx) {
                    var I = rg(ee);
                    ke = e.getAttribute("style"), I !== ke && Tp(q, ke, I);
                  }
                } else if (g && !z)
                  E.delete(q.toLowerCase()), ke = su(e, q, ee), ee !== ke && Tp(q, ke, ee);
                else if (!vn(q, nt, g) && !Kn(q, ee, nt, g)) {
                  var te = !1;
                  if (nt !== null)
                    E.delete(nt.attributeName), ke = El(e, q, ee, nt);
                  else {
                    var $ = i;
                    if ($ === Wi && ($ = wd(t)), $ === Wi)
                      E.delete(q.toLowerCase());
                    else {
                      var ve = gR(q);
                      ve !== null && ve !== q && (te = !0, E.delete(ve)), E.delete(q);
                    }
                    ke = su(e, q, ee);
                  }
                  var ze = z;
                  !ze && ee !== ke && !te && Tp(q, ke, ee);
                }
              }
            }
          }
        }
      switch (h && // $FlowFixMe - Should be inferred as not undefined.
      E.size > 0 && a[Ho] !== !0 && ix(E), t) {
        case "input":
          ti(e), Q(e, a, !0);
          break;
        case "textarea":
          ti(e), Uh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && im(e);
          break;
      }
      return W;
    }
    function ER(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Lg(e, t) {
      {
        if (ja)
          return;
        ja = !0, m("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function zg(e, t) {
      {
        if (ja)
          return;
        ja = !0, m('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Ag(e, t, a) {
      {
        if (ja)
          return;
        ja = !0, m("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Ug(e, t) {
      {
        if (t === "" || ja)
          return;
        ja = !0, m('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function xR(e, t, a) {
      switch (t) {
        case "input":
          Z(e, a);
          return;
        case "textarea":
          Jy(e, a);
          return;
        case "select":
          gd(e, a);
          return;
      }
    }
    var bp = function() {
    }, kp = function() {
    };
    {
      var CR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], sx = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], wR = sx.concat(["button"]), _R = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], cx = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      kp = function(e, t) {
        var a = yt({}, e || cx), i = {
          tag: t
        };
        return sx.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), wR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), CR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var RR = function(e, t) {
        switch (t) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case "option":
            return e === "#text";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case "colgroup":
            return e === "col" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return _R.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, TR = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, fx = {};
      bp = function(e, t, a) {
        a = a || cx;
        var i = a.current, o = i && i.tag;
        t != null && (e != null && m("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var f = RR(e, o) ? null : i, h = f ? null : TR(e, a), g = f || h;
        if (g) {
          var E = g.tag, _ = !!f + "|" + e + "|" + E;
          if (!fx[_]) {
            fx[_] = !0;
            var T = e, H = "";
            if (e === "#text" ? /\S/.test(t) ? T = "Text nodes" : (T = "Whitespace text nodes", H = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : T = "<" + e + ">", f) {
              var U = "";
              E === "table" && e === "tr" && (U += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), m("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", T, E, H, U);
            } else
              m("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", T, E);
          }
        }
      };
    }
    var lm = "suppressHydrationWarning", um = "$", om = "/$", Dp = "$?", Mp = "$!", bR = "style", Fg = null, jg = null;
    function kR(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Gi:
        case Rd: {
          t = i === Gi ? "#document" : "#fragment";
          var o = e.documentElement;
          a = o ? o.namespaceURI : _d(null, "");
          break;
        }
        default: {
          var f = i === Ln ? e.parentNode : e, h = f.namespaceURI || null;
          t = f.tagName, a = _d(h, t);
          break;
        }
      }
      {
        var g = t.toLowerCase(), E = kp(null, g);
        return {
          namespace: a,
          ancestorInfo: E
        };
      }
    }
    function DR(e, t, a) {
      {
        var i = e, o = _d(i.namespace, t), f = kp(i.ancestorInfo, t);
        return {
          namespace: o,
          ancestorInfo: f
        };
      }
    }
    function zz(e) {
      return e;
    }
    function MR(e) {
      Fg = Hn(), jg = $_();
      var t = null;
      return Gn(!1), t;
    }
    function OR(e) {
      Y_(jg), Gn(Fg), Fg = null, jg = null;
    }
    function NR(e, t, a, i, o) {
      var f;
      {
        var h = i;
        if (bp(e, null, h.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var g = "" + t.children, E = kp(h.ancestorInfo, e);
          bp(null, g, E);
        }
        f = h.namespace;
      }
      var _ = pR(e, t, a, f);
      return Lp(o, _), Wg(_, t), _;
    }
    function LR(e, t) {
      e.appendChild(t);
    }
    function zR(e, t, a, i, o) {
      switch (vR(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function AR(e, t, a, i, o, f) {
      {
        var h = f;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var g = "" + i.children, E = kp(h.ancestorInfo, t);
          bp(null, g, E);
        }
      }
      return mR(e, t, a, i);
    }
    function Hg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function UR(e, t, a, i) {
      {
        var o = a;
        bp(null, e, o.ancestorInfo);
      }
      var f = hR(e, t);
      return Lp(i, f), f;
    }
    function FR() {
      var e = window.event;
      return e === void 0 ? za : xf(e.type);
    }
    var Pg = typeof setTimeout == "function" ? setTimeout : void 0, jR = typeof clearTimeout == "function" ? clearTimeout : void 0, Vg = -1, dx = typeof Promise == "function" ? Promise : void 0, HR = typeof queueMicrotask == "function" ? queueMicrotask : typeof dx < "u" ? function(e) {
      return dx.resolve(null).then(e).catch(PR);
    } : Pg;
    function PR(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function VR(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function BR(e, t, a, i, o, f) {
      yR(e, t, a, i, o), Wg(e, o);
    }
    function px(e) {
      mo(e, "");
    }
    function IR(e, t, a) {
      e.nodeValue = a;
    }
    function $R(e, t) {
      e.appendChild(t);
    }
    function YR(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && im(a);
    }
    function WR(e, t, a) {
      e.insertBefore(t, a);
    }
    function QR(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function GR(e, t) {
      e.removeChild(t);
    }
    function XR(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Bg(e, t) {
      var a = t, i = 0;
      do {
        var o = a.nextSibling;
        if (e.removeChild(a), o && o.nodeType === Ln) {
          var f = o.data;
          if (f === om)
            if (i === 0) {
              e.removeChild(o), Fu(t);
              return;
            } else
              i--;
          else (f === um || f === Dp || f === Mp) && i++;
        }
        a = o;
      } while (a);
      Fu(t);
    }
    function qR(e, t) {
      e.nodeType === Ln ? Bg(e.parentNode, t) : e.nodeType === Qr && Bg(e, t), Fu(e);
    }
    function KR(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function ZR(e) {
      e.nodeValue = "";
    }
    function JR(e, t) {
      e = e;
      var a = t[bR], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Tc("display", i);
    }
    function eT(e, t) {
      e.nodeValue = t;
    }
    function tT(e) {
      e.nodeType === Qr ? e.textContent = "" : e.nodeType === Gi && e.documentElement && e.removeChild(e.documentElement);
    }
    function nT(e, t, a) {
      return e.nodeType !== Qr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function rT(e, t) {
      return t === "" || e.nodeType !== Qi ? null : e;
    }
    function aT(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function hx(e) {
      return e.data === Dp;
    }
    function Ig(e) {
      return e.data === Mp;
    }
    function iT(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, o;
      return t && (a = t.dgst, i = t.msg, o = t.stck), {
        message: i,
        digest: a,
        stack: o
      };
    }
    function lT(e, t) {
      e._reactRetry = t;
    }
    function sm(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Qr || t === Qi)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === um || a === Mp || a === Dp)
            break;
          if (a === om)
            return null;
        }
      }
      return e;
    }
    function Op(e) {
      return sm(e.nextSibling);
    }
    function uT(e) {
      return sm(e.firstChild);
    }
    function oT(e) {
      return sm(e.firstChild);
    }
    function sT(e) {
      return sm(e.nextSibling);
    }
    function cT(e, t, a, i, o, f, h) {
      Lp(f, e), Wg(e, a);
      var g;
      {
        var E = o;
        g = E.namespace;
      }
      var _ = (f.mode & Ct) !== qe;
      return SR(e, t, a, g, i, _, h);
    }
    function fT(e, t, a, i) {
      return Lp(a, e), a.mode & Ct, ER(e, t);
    }
    function dT(e, t) {
      Lp(t, e);
    }
    function pT(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === om) {
            if (a === 0)
              return Op(t);
            a--;
          } else (i === um || i === Mp || i === Dp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function vx(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === um || i === Mp || i === Dp) {
            if (a === 0)
              return t;
            a--;
          } else i === om && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function hT(e) {
      Fu(e);
    }
    function vT(e) {
      Fu(e);
    }
    function mT(e) {
      return e !== "head" && e !== "body";
    }
    function yT(e, t, a, i) {
      var o = !0;
      am(t.nodeValue, a, i, o);
    }
    function gT(e, t, a, i, o, f) {
      if (t[lm] !== !0) {
        var h = !0;
        am(i.nodeValue, o, f, h);
      }
    }
    function ST(e, t) {
      t.nodeType === Qr ? Lg(e, t) : t.nodeType === Ln || zg(e, t);
    }
    function ET(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Qr ? Lg(a, t) : t.nodeType === Ln || zg(a, t));
      }
    }
    function xT(e, t, a, i, o) {
      (o || t[lm] !== !0) && (i.nodeType === Qr ? Lg(a, i) : i.nodeType === Ln || zg(a, i));
    }
    function CT(e, t, a) {
      Ag(e, t);
    }
    function wT(e, t) {
      Ug(e, t);
    }
    function _T(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Ag(i, t);
      }
    }
    function RT(e, t) {
      {
        var a = e.parentNode;
        a !== null && Ug(a, t);
      }
    }
    function TT(e, t, a, i, o, f) {
      (f || t[lm] !== !0) && Ag(a, i);
    }
    function bT(e, t, a, i, o) {
      (o || t[lm] !== !0) && Ug(a, i);
    }
    function kT(e) {
      m("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function DT(e) {
      wp(e);
    }
    var Af = Math.random().toString(36).slice(2), Uf = "__reactFiber$" + Af, $g = "__reactProps$" + Af, Np = "__reactContainer$" + Af, Yg = "__reactEvents$" + Af, MT = "__reactListeners$" + Af, OT = "__reactHandles$" + Af;
    function NT(e) {
      delete e[Uf], delete e[$g], delete e[Yg], delete e[MT], delete e[OT];
    }
    function Lp(e, t) {
      t[Uf] = e;
    }
    function cm(e, t) {
      t[Np] = e;
    }
    function mx(e) {
      e[Np] = null;
    }
    function zp(e) {
      return !!e[Np];
    }
    function tc(e) {
      var t = e[Uf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Np] || a[Uf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var o = vx(e); o !== null; ) {
              var f = o[Uf];
              if (f)
                return f;
              o = vx(o);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Po(e) {
      var t = e[Uf] || e[Np];
      return t && (t.tag === V || t.tag === me || t.tag === xe || t.tag === L) ? t : null;
    }
    function Ff(e) {
      if (e.tag === V || e.tag === me)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function fm(e) {
      return e[$g] || null;
    }
    function Wg(e, t) {
      e[$g] = t;
    }
    function LT(e) {
      var t = e[Yg];
      return t === void 0 && (t = e[Yg] = /* @__PURE__ */ new Set()), t;
    }
    var yx = {}, gx = d.ReactDebugCurrentFrame;
    function dm(e) {
      if (e) {
        var t = e._owner, a = Ii(e.type, e._source, t ? t.type : null);
        gx.setExtraStackFrame(a);
      } else
        gx.setExtraStackFrame(null);
    }
    function il(e, t, a, i, o) {
      {
        var f = Function.call.bind(Tr);
        for (var h in e)
          if (f(e, h)) {
            var g = void 0;
            try {
              if (typeof e[h] != "function") {
                var E = Error((i || "React class") + ": " + a + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              g = e[h](t, h, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              g = _;
            }
            g && !(g instanceof Error) && (dm(o), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, h, typeof g), dm(null)), g instanceof Error && !(g.message in yx) && (yx[g.message] = !0, dm(o), m("Failed %s type: %s", a, g.message), dm(null));
          }
      }
    }
    var Qg = [], pm;
    pm = [];
    var Iu = -1;
    function Vo(e) {
      return {
        current: e
      };
    }
    function aa(e, t) {
      if (Iu < 0) {
        m("Unexpected pop.");
        return;
      }
      t !== pm[Iu] && m("Unexpected Fiber popped."), e.current = Qg[Iu], Qg[Iu] = null, pm[Iu] = null, Iu--;
    }
    function ia(e, t, a) {
      Iu++, Qg[Iu] = e.current, pm[Iu] = a, e.current = t;
    }
    var Gg;
    Gg = {};
    var si = {};
    Object.freeze(si);
    var $u = Vo(si), Xl = Vo(!1), Xg = si;
    function jf(e, t, a) {
      return a && ql(t) ? Xg : $u.current;
    }
    function Sx(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Hf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return si;
        var o = e.stateNode;
        if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
          return o.__reactInternalMemoizedMaskedChildContext;
        var f = {};
        for (var h in i)
          f[h] = t[h];
        {
          var g = st(e) || "Unknown";
          il(i, f, "context", g);
        }
        return o && Sx(e, t, f), f;
      }
    }
    function hm() {
      return Xl.current;
    }
    function ql(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function vm(e) {
      aa(Xl, e), aa($u, e);
    }
    function qg(e) {
      aa(Xl, e), aa($u, e);
    }
    function Ex(e, t, a) {
      {
        if ($u.current !== si)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ia($u, t, e), ia(Xl, a, e);
      }
    }
    function xx(e, t, a) {
      {
        var i = e.stateNode, o = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var f = st(e) || "Unknown";
            Gg[f] || (Gg[f] = !0, m("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", f, f));
          }
          return a;
        }
        var h = i.getChildContext();
        for (var g in h)
          if (!(g in o))
            throw new Error((st(e) || "Unknown") + '.getChildContext(): key "' + g + '" is not defined in childContextTypes.');
        {
          var E = st(e) || "Unknown";
          il(o, h, "child context", E);
        }
        return yt({}, a, h);
      }
    }
    function mm(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || si;
        return Xg = $u.current, ia($u, a, e), ia(Xl, Xl.current, e), !0;
      }
    }
    function Cx(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var o = xx(e, t, Xg);
          i.__reactInternalMemoizedMergedChildContext = o, aa(Xl, e), aa($u, e), ia($u, o, e), ia(Xl, a, e);
        } else
          aa(Xl, e), ia(Xl, a, e);
      }
    }
    function zT(e) {
      {
        if (!wu(e) || e.tag !== R)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case L:
              return t.stateNode.context;
            case R: {
              var a = t.type;
              if (ql(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Bo = 0, ym = 1, Yu = null, Kg = !1, Zg = !1;
    function wx(e) {
      Yu === null ? Yu = [e] : Yu.push(e);
    }
    function AT(e) {
      Kg = !0, wx(e);
    }
    function _x() {
      Kg && Io();
    }
    function Io() {
      if (!Zg && Yu !== null) {
        Zg = !0;
        var e = 0, t = Ua();
        try {
          var a = !0, i = Yu;
          for (jn(Nr); e < i.length; e++) {
            var o = i[e];
            do
              o = o(a);
            while (o !== null);
          }
          Yu = null, Kg = !1;
        } catch (f) {
          throw Yu !== null && (Yu = Yu.slice(e + 1)), Fd(Es, Io), f;
        } finally {
          jn(t), Zg = !1;
        }
      }
      return null;
    }
    var Pf = [], Vf = 0, gm = null, Sm = 0, Ai = [], Ui = 0, nc = null, Wu = 1, Qu = "";
    function UT(e) {
      return ac(), (e.flags & Ri) !== Xe;
    }
    function FT(e) {
      return ac(), Sm;
    }
    function jT() {
      var e = Qu, t = Wu, a = t & ~HT(t);
      return a.toString(32) + e;
    }
    function rc(e, t) {
      ac(), Pf[Vf++] = Sm, Pf[Vf++] = gm, gm = e, Sm = t;
    }
    function Rx(e, t, a) {
      ac(), Ai[Ui++] = Wu, Ai[Ui++] = Qu, Ai[Ui++] = nc, nc = e;
      var i = Wu, o = Qu, f = Em(i) - 1, h = i & ~(1 << f), g = a + 1, E = Em(t) + f;
      if (E > 30) {
        var _ = f - f % 5, T = (1 << _) - 1, H = (h & T).toString(32), U = h >> _, W = f - _, q = Em(t) + W, ee = g << W, ke = ee | U, nt = H + o;
        Wu = 1 << q | ke, Qu = nt;
      } else {
        var We = g << f, zt = We | h, bt = o;
        Wu = 1 << E | zt, Qu = bt;
      }
    }
    function Jg(e) {
      ac();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        rc(e, a), Rx(e, a, i);
      }
    }
    function Em(e) {
      return 32 - Un(e);
    }
    function HT(e) {
      return 1 << Em(e) - 1;
    }
    function e0(e) {
      for (; e === gm; )
        gm = Pf[--Vf], Pf[Vf] = null, Sm = Pf[--Vf], Pf[Vf] = null;
      for (; e === nc; )
        nc = Ai[--Ui], Ai[Ui] = null, Qu = Ai[--Ui], Ai[Ui] = null, Wu = Ai[--Ui], Ai[Ui] = null;
    }
    function PT() {
      return ac(), nc !== null ? {
        id: Wu,
        overflow: Qu
      } : null;
    }
    function VT(e, t) {
      ac(), Ai[Ui++] = Wu, Ai[Ui++] = Qu, Ai[Ui++] = nc, Wu = t.id, Qu = t.overflow, nc = e;
    }
    function ac() {
      Fr() || m("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Ur = null, Fi = null, ll = !1, ic = !1, $o = null;
    function BT() {
      ll && m("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function Tx() {
      ic = !0;
    }
    function IT() {
      return ic;
    }
    function $T(e) {
      var t = e.stateNode.containerInfo;
      return Fi = oT(t), Ur = e, ll = !0, $o = null, ic = !1, !0;
    }
    function YT(e, t, a) {
      return Fi = sT(t), Ur = e, ll = !0, $o = null, ic = !1, a !== null && VT(e, a), !0;
    }
    function bx(e, t) {
      switch (e.tag) {
        case L: {
          ST(e.stateNode.containerInfo, t);
          break;
        }
        case V: {
          var a = (e.mode & Ct) !== qe;
          xT(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case xe: {
          var i = e.memoizedState;
          i.dehydrated !== null && ET(i.dehydrated, t);
          break;
        }
      }
    }
    function kx(e, t) {
      bx(e, t);
      var a = XD();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Da) : i.push(a);
    }
    function t0(e, t) {
      {
        if (ic)
          return;
        switch (e.tag) {
          case L: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case V:
                var i = t.type;
                t.pendingProps, CT(a, i);
                break;
              case me:
                var o = t.pendingProps;
                wT(a, o);
                break;
            }
            break;
          }
          case V: {
            var f = e.type, h = e.memoizedProps, g = e.stateNode;
            switch (t.tag) {
              case V: {
                var E = t.type, _ = t.pendingProps, T = (e.mode & Ct) !== qe;
                TT(
                  f,
                  h,
                  g,
                  E,
                  _,
                  // TODO: Delete this argument when we remove the legacy root API.
                  T
                );
                break;
              }
              case me: {
                var H = t.pendingProps, U = (e.mode & Ct) !== qe;
                bT(
                  f,
                  h,
                  g,
                  H,
                  // TODO: Delete this argument when we remove the legacy root API.
                  U
                );
                break;
              }
            }
            break;
          }
          case xe: {
            var W = e.memoizedState, q = W.dehydrated;
            if (q !== null) switch (t.tag) {
              case V:
                var ee = t.type;
                t.pendingProps, _T(q, ee);
                break;
              case me:
                var ke = t.pendingProps;
                RT(q, ke);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function Dx(e, t) {
      t.flags = t.flags & ~Xr | yn, t0(e, t);
    }
    function Mx(e, t) {
      switch (e.tag) {
        case V: {
          var a = e.type;
          e.pendingProps;
          var i = nT(t, a);
          return i !== null ? (e.stateNode = i, Ur = e, Fi = uT(i), !0) : !1;
        }
        case me: {
          var o = e.pendingProps, f = rT(t, o);
          return f !== null ? (e.stateNode = f, Ur = e, Fi = null, !0) : !1;
        }
        case xe: {
          var h = aT(t);
          if (h !== null) {
            var g = {
              dehydrated: h,
              treeContext: PT(),
              retryLane: Jr
            };
            e.memoizedState = g;
            var E = qD(h);
            return E.return = e, e.child = E, Ur = e, Fi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function n0(e) {
      return (e.mode & Ct) !== qe && (e.flags & Qe) === Xe;
    }
    function r0(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function a0(e) {
      if (ll) {
        var t = Fi;
        if (!t) {
          n0(e) && (t0(Ur, e), r0()), Dx(Ur, e), ll = !1, Ur = e;
          return;
        }
        var a = t;
        if (!Mx(e, t)) {
          n0(e) && (t0(Ur, e), r0()), t = Op(a);
          var i = Ur;
          if (!t || !Mx(e, t)) {
            Dx(Ur, e), ll = !1, Ur = e;
            return;
          }
          kx(i, a);
        }
      }
    }
    function WT(e, t, a) {
      var i = e.stateNode, o = !ic, f = cT(i, e.type, e.memoizedProps, t, a, e, o);
      return e.updateQueue = f, f !== null;
    }
    function QT(e) {
      var t = e.stateNode, a = e.memoizedProps, i = fT(t, a, e);
      if (i) {
        var o = Ur;
        if (o !== null)
          switch (o.tag) {
            case L: {
              var f = o.stateNode.containerInfo, h = (o.mode & Ct) !== qe;
              yT(
                f,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case V: {
              var g = o.type, E = o.memoizedProps, _ = o.stateNode, T = (o.mode & Ct) !== qe;
              gT(
                g,
                E,
                _,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                T
              );
              break;
            }
          }
      }
      return i;
    }
    function GT(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      dT(a, e);
    }
    function XT(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return pT(a);
    }
    function Ox(e) {
      for (var t = e.return; t !== null && t.tag !== V && t.tag !== L && t.tag !== xe; )
        t = t.return;
      Ur = t;
    }
    function xm(e) {
      if (e !== Ur)
        return !1;
      if (!ll)
        return Ox(e), ll = !0, !1;
      if (e.tag !== L && (e.tag !== V || mT(e.type) && !Hg(e.type, e.memoizedProps))) {
        var t = Fi;
        if (t)
          if (n0(e))
            Nx(e), r0();
          else
            for (; t; )
              kx(e, t), t = Op(t);
      }
      return Ox(e), e.tag === xe ? Fi = XT(e) : Fi = Ur ? Op(e.stateNode) : null, !0;
    }
    function qT() {
      return ll && Fi !== null;
    }
    function Nx(e) {
      for (var t = Fi; t; )
        bx(e, t), t = Op(t);
    }
    function Bf() {
      Ur = null, Fi = null, ll = !1, ic = !1;
    }
    function Lx() {
      $o !== null && (Tw($o), $o = null);
    }
    function Fr() {
      return ll;
    }
    function i0(e) {
      $o === null ? $o = [e] : $o.push(e);
    }
    var KT = d.ReactCurrentBatchConfig, ZT = null;
    function JT() {
      return KT.transition;
    }
    var ul = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var eb = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Jt && (t = a), a = a.return;
        return t;
      }, lc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Ap = [], Up = [], Fp = [], jp = [], Hp = [], Pp = [], uc = /* @__PURE__ */ new Set();
      ul.recordUnsafeLifecycleWarnings = function(e, t) {
        uc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Ap.push(e), e.mode & Jt && typeof t.UNSAFE_componentWillMount == "function" && Up.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Fp.push(e), e.mode & Jt && typeof t.UNSAFE_componentWillReceiveProps == "function" && jp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Hp.push(e), e.mode & Jt && typeof t.UNSAFE_componentWillUpdate == "function" && Pp.push(e));
      }, ul.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Ap.length > 0 && (Ap.forEach(function(U) {
          e.add(st(U) || "Component"), uc.add(U.type);
        }), Ap = []);
        var t = /* @__PURE__ */ new Set();
        Up.length > 0 && (Up.forEach(function(U) {
          t.add(st(U) || "Component"), uc.add(U.type);
        }), Up = []);
        var a = /* @__PURE__ */ new Set();
        Fp.length > 0 && (Fp.forEach(function(U) {
          a.add(st(U) || "Component"), uc.add(U.type);
        }), Fp = []);
        var i = /* @__PURE__ */ new Set();
        jp.length > 0 && (jp.forEach(function(U) {
          i.add(st(U) || "Component"), uc.add(U.type);
        }), jp = []);
        var o = /* @__PURE__ */ new Set();
        Hp.length > 0 && (Hp.forEach(function(U) {
          o.add(st(U) || "Component"), uc.add(U.type);
        }), Hp = []);
        var f = /* @__PURE__ */ new Set();
        if (Pp.length > 0 && (Pp.forEach(function(U) {
          f.add(st(U) || "Component"), uc.add(U.type);
        }), Pp = []), t.size > 0) {
          var h = lc(t);
          m(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, h);
        }
        if (i.size > 0) {
          var g = lc(i);
          m(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, g);
        }
        if (f.size > 0) {
          var E = lc(f);
          m(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, E);
        }
        if (e.size > 0) {
          var _ = lc(e);
          w(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, _);
        }
        if (a.size > 0) {
          var T = lc(a);
          w(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, T);
        }
        if (o.size > 0) {
          var H = lc(o);
          w(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, H);
        }
      };
      var Cm = /* @__PURE__ */ new Map(), zx = /* @__PURE__ */ new Set();
      ul.recordLegacyContextWarning = function(e, t) {
        var a = eb(e);
        if (a === null) {
          m("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!zx.has(e.type)) {
          var i = Cm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Cm.set(a, i)), i.push(e));
        }
      }, ul.flushLegacyContextWarning = function() {
        Cm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(f) {
              i.add(st(f) || "Component"), zx.add(f.type);
            });
            var o = lc(i);
            try {
              qt(a), m(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o);
            } finally {
              fn();
            }
          }
        });
      }, ul.discardPendingWarnings = function() {
        Ap = [], Up = [], Fp = [], jp = [], Hp = [], Pp = [], Cm = /* @__PURE__ */ new Map();
      };
    }
    var l0, u0, o0, s0, c0, Ax = function(e, t) {
    };
    l0 = !1, u0 = !1, o0 = {}, s0 = {}, c0 = {}, Ax = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = st(t) || "Component";
        s0[a] || (s0[a] = !0, m('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function tb(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Vp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Jt || X) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== R) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !tb(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var o = st(e) || "Component";
          o0[o] || (m('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', o, i), o0[o] = !0);
        }
        if (a._owner) {
          var f = a._owner, h;
          if (f) {
            var g = f;
            if (g.tag !== R)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            h = g.stateNode;
          }
          if (!h)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var E = h;
          pi(i, "ref");
          var _ = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === _)
            return t.ref;
          var T = function(H) {
            var U = E.refs;
            H === null ? delete U[_] : U[_] = H;
          };
          return T._stringRef = _, T;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function wm(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function _m(e) {
      {
        var t = st(e) || "Component";
        if (c0[t])
          return;
        c0[t] = !0, m("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function Ux(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function Fx(e) {
      function t(I, te) {
        if (e) {
          var $ = I.deletions;
          $ === null ? (I.deletions = [te], I.flags |= Da) : $.push(te);
        }
      }
      function a(I, te) {
        if (!e)
          return null;
        for (var $ = te; $ !== null; )
          t(I, $), $ = $.sibling;
        return null;
      }
      function i(I, te) {
        for (var $ = /* @__PURE__ */ new Map(), ve = te; ve !== null; )
          ve.key !== null ? $.set(ve.key, ve) : $.set(ve.index, ve), ve = ve.sibling;
        return $;
      }
      function o(I, te) {
        var $ = mc(I, te);
        return $.index = 0, $.sibling = null, $;
      }
      function f(I, te, $) {
        if (I.index = $, !e)
          return I.flags |= Ri, te;
        var ve = I.alternate;
        if (ve !== null) {
          var ze = ve.index;
          return ze < te ? (I.flags |= yn, te) : ze;
        } else
          return I.flags |= yn, te;
      }
      function h(I) {
        return e && I.alternate === null && (I.flags |= yn), I;
      }
      function g(I, te, $, ve) {
        if (te === null || te.tag !== me) {
          var ze = iE($, I.mode, ve);
          return ze.return = I, ze;
        } else {
          var Oe = o(te, $);
          return Oe.return = I, Oe;
        }
      }
      function E(I, te, $, ve) {
        var ze = $.type;
        if (ze === vi)
          return T(I, te, $.props.children, ve, $.key);
        if (te !== null && (te.elementType === ze || // Keep this check inline so it only runs on the false path:
        Bw(te, $) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ze == "object" && ze !== null && ze.$$typeof === ct && Ux(ze) === te.type)) {
          var Oe = o(te, $.props);
          return Oe.ref = Vp(I, te, $), Oe.return = I, Oe._debugSource = $._source, Oe._debugOwner = $._owner, Oe;
        }
        var ut = aE($, I.mode, ve);
        return ut.ref = Vp(I, te, $), ut.return = I, ut;
      }
      function _(I, te, $, ve) {
        if (te === null || te.tag !== F || te.stateNode.containerInfo !== $.containerInfo || te.stateNode.implementation !== $.implementation) {
          var ze = lE($, I.mode, ve);
          return ze.return = I, ze;
        } else {
          var Oe = o(te, $.children || []);
          return Oe.return = I, Oe;
        }
      }
      function T(I, te, $, ve, ze) {
        if (te === null || te.tag !== ge) {
          var Oe = ts($, I.mode, ve, ze);
          return Oe.return = I, Oe;
        } else {
          var ut = o(te, $);
          return ut.return = I, ut;
        }
      }
      function H(I, te, $) {
        if (typeof te == "string" && te !== "" || typeof te == "number") {
          var ve = iE("" + te, I.mode, $);
          return ve.return = I, ve;
        }
        if (typeof te == "object" && te !== null) {
          switch (te.$$typeof) {
            case kr: {
              var ze = aE(te, I.mode, $);
              return ze.ref = Vp(I, null, te), ze.return = I, ze;
            }
            case ar: {
              var Oe = lE(te, I.mode, $);
              return Oe.return = I, Oe;
            }
            case ct: {
              var ut = te._payload, dt = te._init;
              return H(I, dt(ut), $);
            }
          }
          if (St(te) || vt(te)) {
            var tn = ts(te, I.mode, $, null);
            return tn.return = I, tn;
          }
          wm(I, te);
        }
        return typeof te == "function" && _m(I), null;
      }
      function U(I, te, $, ve) {
        var ze = te !== null ? te.key : null;
        if (typeof $ == "string" && $ !== "" || typeof $ == "number")
          return ze !== null ? null : g(I, te, "" + $, ve);
        if (typeof $ == "object" && $ !== null) {
          switch ($.$$typeof) {
            case kr:
              return $.key === ze ? E(I, te, $, ve) : null;
            case ar:
              return $.key === ze ? _(I, te, $, ve) : null;
            case ct: {
              var Oe = $._payload, ut = $._init;
              return U(I, te, ut(Oe), ve);
            }
          }
          if (St($) || vt($))
            return ze !== null ? null : T(I, te, $, ve, null);
          wm(I, $);
        }
        return typeof $ == "function" && _m(I), null;
      }
      function W(I, te, $, ve, ze) {
        if (typeof ve == "string" && ve !== "" || typeof ve == "number") {
          var Oe = I.get($) || null;
          return g(te, Oe, "" + ve, ze);
        }
        if (typeof ve == "object" && ve !== null) {
          switch (ve.$$typeof) {
            case kr: {
              var ut = I.get(ve.key === null ? $ : ve.key) || null;
              return E(te, ut, ve, ze);
            }
            case ar: {
              var dt = I.get(ve.key === null ? $ : ve.key) || null;
              return _(te, dt, ve, ze);
            }
            case ct:
              var tn = ve._payload, Bt = ve._init;
              return W(I, te, $, Bt(tn), ze);
          }
          if (St(ve) || vt(ve)) {
            var Xn = I.get($) || null;
            return T(te, Xn, ve, ze, null);
          }
          wm(te, ve);
        }
        return typeof ve == "function" && _m(te), null;
      }
      function q(I, te, $) {
        {
          if (typeof I != "object" || I === null)
            return te;
          switch (I.$$typeof) {
            case kr:
            case ar:
              Ax(I, $);
              var ve = I.key;
              if (typeof ve != "string")
                break;
              if (te === null) {
                te = /* @__PURE__ */ new Set(), te.add(ve);
                break;
              }
              if (!te.has(ve)) {
                te.add(ve);
                break;
              }
              m("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ve);
              break;
            case ct:
              var ze = I._payload, Oe = I._init;
              q(Oe(ze), te, $);
              break;
          }
        }
        return te;
      }
      function ee(I, te, $, ve) {
        for (var ze = null, Oe = 0; Oe < $.length; Oe++) {
          var ut = $[Oe];
          ze = q(ut, ze, I);
        }
        for (var dt = null, tn = null, Bt = te, Xn = 0, It = 0, Vn = null; Bt !== null && It < $.length; It++) {
          Bt.index > It ? (Vn = Bt, Bt = null) : Vn = Bt.sibling;
          var ua = U(I, Bt, $[It], ve);
          if (ua === null) {
            Bt === null && (Bt = Vn);
            break;
          }
          e && Bt && ua.alternate === null && t(I, Bt), Xn = f(ua, Xn, It), tn === null ? dt = ua : tn.sibling = ua, tn = ua, Bt = Vn;
        }
        if (It === $.length) {
          if (a(I, Bt), Fr()) {
            var $r = It;
            rc(I, $r);
          }
          return dt;
        }
        if (Bt === null) {
          for (; It < $.length; It++) {
            var fi = H(I, $[It], ve);
            fi !== null && (Xn = f(fi, Xn, It), tn === null ? dt = fi : tn.sibling = fi, tn = fi);
          }
          if (Fr()) {
            var Ca = It;
            rc(I, Ca);
          }
          return dt;
        }
        for (var wa = i(I, Bt); It < $.length; It++) {
          var oa = W(wa, I, It, $[It], ve);
          oa !== null && (e && oa.alternate !== null && wa.delete(oa.key === null ? It : oa.key), Xn = f(oa, Xn, It), tn === null ? dt = oa : tn.sibling = oa, tn = oa);
        }
        if (e && wa.forEach(function(ud) {
          return t(I, ud);
        }), Fr()) {
          var eo = It;
          rc(I, eo);
        }
        return dt;
      }
      function ke(I, te, $, ve) {
        var ze = vt($);
        if (typeof ze != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          $[Symbol.toStringTag] === "Generator" && (u0 || m("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), u0 = !0), $.entries === ze && (l0 || m("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), l0 = !0);
          var Oe = ze.call($);
          if (Oe)
            for (var ut = null, dt = Oe.next(); !dt.done; dt = Oe.next()) {
              var tn = dt.value;
              ut = q(tn, ut, I);
            }
        }
        var Bt = ze.call($);
        if (Bt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Xn = null, It = null, Vn = te, ua = 0, $r = 0, fi = null, Ca = Bt.next(); Vn !== null && !Ca.done; $r++, Ca = Bt.next()) {
          Vn.index > $r ? (fi = Vn, Vn = null) : fi = Vn.sibling;
          var wa = U(I, Vn, Ca.value, ve);
          if (wa === null) {
            Vn === null && (Vn = fi);
            break;
          }
          e && Vn && wa.alternate === null && t(I, Vn), ua = f(wa, ua, $r), It === null ? Xn = wa : It.sibling = wa, It = wa, Vn = fi;
        }
        if (Ca.done) {
          if (a(I, Vn), Fr()) {
            var oa = $r;
            rc(I, oa);
          }
          return Xn;
        }
        if (Vn === null) {
          for (; !Ca.done; $r++, Ca = Bt.next()) {
            var eo = H(I, Ca.value, ve);
            eo !== null && (ua = f(eo, ua, $r), It === null ? Xn = eo : It.sibling = eo, It = eo);
          }
          if (Fr()) {
            var ud = $r;
            rc(I, ud);
          }
          return Xn;
        }
        for (var Sh = i(I, Vn); !Ca.done; $r++, Ca = Bt.next()) {
          var au = W(Sh, I, $r, Ca.value, ve);
          au !== null && (e && au.alternate !== null && Sh.delete(au.key === null ? $r : au.key), ua = f(au, ua, $r), It === null ? Xn = au : It.sibling = au, It = au);
        }
        if (e && Sh.forEach(function(bM) {
          return t(I, bM);
        }), Fr()) {
          var TM = $r;
          rc(I, TM);
        }
        return Xn;
      }
      function nt(I, te, $, ve) {
        if (te !== null && te.tag === me) {
          a(I, te.sibling);
          var ze = o(te, $);
          return ze.return = I, ze;
        }
        a(I, te);
        var Oe = iE($, I.mode, ve);
        return Oe.return = I, Oe;
      }
      function We(I, te, $, ve) {
        for (var ze = $.key, Oe = te; Oe !== null; ) {
          if (Oe.key === ze) {
            var ut = $.type;
            if (ut === vi) {
              if (Oe.tag === ge) {
                a(I, Oe.sibling);
                var dt = o(Oe, $.props.children);
                return dt.return = I, dt._debugSource = $._source, dt._debugOwner = $._owner, dt;
              }
            } else if (Oe.elementType === ut || // Keep this check inline so it only runs on the false path:
            Bw(Oe, $) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof ut == "object" && ut !== null && ut.$$typeof === ct && Ux(ut) === Oe.type) {
              a(I, Oe.sibling);
              var tn = o(Oe, $.props);
              return tn.ref = Vp(I, Oe, $), tn.return = I, tn._debugSource = $._source, tn._debugOwner = $._owner, tn;
            }
            a(I, Oe);
            break;
          } else
            t(I, Oe);
          Oe = Oe.sibling;
        }
        if ($.type === vi) {
          var Bt = ts($.props.children, I.mode, ve, $.key);
          return Bt.return = I, Bt;
        } else {
          var Xn = aE($, I.mode, ve);
          return Xn.ref = Vp(I, te, $), Xn.return = I, Xn;
        }
      }
      function zt(I, te, $, ve) {
        for (var ze = $.key, Oe = te; Oe !== null; ) {
          if (Oe.key === ze)
            if (Oe.tag === F && Oe.stateNode.containerInfo === $.containerInfo && Oe.stateNode.implementation === $.implementation) {
              a(I, Oe.sibling);
              var ut = o(Oe, $.children || []);
              return ut.return = I, ut;
            } else {
              a(I, Oe);
              break;
            }
          else
            t(I, Oe);
          Oe = Oe.sibling;
        }
        var dt = lE($, I.mode, ve);
        return dt.return = I, dt;
      }
      function bt(I, te, $, ve) {
        var ze = typeof $ == "object" && $ !== null && $.type === vi && $.key === null;
        if (ze && ($ = $.props.children), typeof $ == "object" && $ !== null) {
          switch ($.$$typeof) {
            case kr:
              return h(We(I, te, $, ve));
            case ar:
              return h(zt(I, te, $, ve));
            case ct:
              var Oe = $._payload, ut = $._init;
              return bt(I, te, ut(Oe), ve);
          }
          if (St($))
            return ee(I, te, $, ve);
          if (vt($))
            return ke(I, te, $, ve);
          wm(I, $);
        }
        return typeof $ == "string" && $ !== "" || typeof $ == "number" ? h(nt(I, te, "" + $, ve)) : (typeof $ == "function" && _m(I), a(I, te));
      }
      return bt;
    }
    var If = Fx(!0), jx = Fx(!1);
    function nb(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = mc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = mc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function rb(e, t) {
      for (var a = e.child; a !== null; )
        $D(a, t), a = a.sibling;
    }
    var f0 = Vo(null), d0;
    d0 = {};
    var Rm = null, $f = null, p0 = null, Tm = !1;
    function bm() {
      Rm = null, $f = null, p0 = null, Tm = !1;
    }
    function Hx() {
      Tm = !0;
    }
    function Px() {
      Tm = !1;
    }
    function Vx(e, t, a) {
      ia(f0, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== d0 && m("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = d0;
    }
    function h0(e, t) {
      var a = f0.current;
      aa(f0, t), e._currentValue = a;
    }
    function v0(e, t, a) {
      for (var i = e; i !== null; ) {
        var o = i.alternate;
        if (Uu(i.childLanes, t) ? o !== null && !Uu(o.childLanes, t) && (o.childLanes = mt(o.childLanes, t)) : (i.childLanes = mt(i.childLanes, t), o !== null && (o.childLanes = mt(o.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && m("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ab(e, t, a) {
      ib(e, t, a);
    }
    function ib(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var o = void 0, f = i.dependencies;
        if (f !== null) {
          o = i.child;
          for (var h = f.firstContext; h !== null; ) {
            if (h.context === t) {
              if (i.tag === R) {
                var g = zs(a), E = Gu(nn, g);
                E.tag = Dm;
                var _ = i.updateQueue;
                if (_ !== null) {
                  var T = _.shared, H = T.pending;
                  H === null ? E.next = E : (E.next = H.next, H.next = E), T.pending = E;
                }
              }
              i.lanes = mt(i.lanes, a);
              var U = i.alternate;
              U !== null && (U.lanes = mt(U.lanes, a)), v0(i.return, a, e), f.lanes = mt(f.lanes, a);
              break;
            }
            h = h.next;
          }
        } else if (i.tag === Pe)
          o = i.type === e.type ? null : i.child;
        else if (i.tag === Mt) {
          var W = i.return;
          if (W === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          W.lanes = mt(W.lanes, a);
          var q = W.alternate;
          q !== null && (q.lanes = mt(q.lanes, a)), v0(W, a, e), o = i.sibling;
        } else
          o = i.child;
        if (o !== null)
          o.return = i;
        else
          for (o = i; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            var ee = o.sibling;
            if (ee !== null) {
              ee.return = o.return, o = ee;
              break;
            }
            o = o.return;
          }
        i = o;
      }
    }
    function Yf(e, t) {
      Rm = e, $f = null, p0 = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (ea(a.lanes, t) && nh(), a.firstContext = null);
      }
    }
    function nr(e) {
      Tm && m("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (p0 !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if ($f === null) {
          if (Rm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          $f = a, Rm.dependencies = {
            lanes: le,
            firstContext: a
          };
        } else
          $f = $f.next = a;
      }
      return t;
    }
    var oc = null;
    function m0(e) {
      oc === null ? oc = [e] : oc.push(e);
    }
    function lb() {
      if (oc !== null) {
        for (var e = 0; e < oc.length; e++) {
          var t = oc[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, o = t.pending;
            if (o !== null) {
              var f = o.next;
              o.next = i, a.next = f;
            }
            t.pending = a;
          }
        }
        oc = null;
      }
    }
    function Bx(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, m0(t)) : (a.next = o.next, o.next = a), t.interleaved = a, km(e, i);
    }
    function ub(e, t, a, i) {
      var o = t.interleaved;
      o === null ? (a.next = a, m0(t)) : (a.next = o.next, o.next = a), t.interleaved = a;
    }
    function ob(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, m0(t)) : (a.next = o.next, o.next = a), t.interleaved = a, km(e, i);
    }
    function Ha(e, t) {
      return km(e, t);
    }
    var sb = km;
    function km(e, t) {
      e.lanes = mt(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = mt(a.lanes, t)), a === null && (e.flags & (yn | Xr)) !== Xe && jw(e);
      for (var i = e, o = e.return; o !== null; )
        o.childLanes = mt(o.childLanes, t), a = o.alternate, a !== null ? a.childLanes = mt(a.childLanes, t) : (o.flags & (yn | Xr)) !== Xe && jw(e), i = o, o = o.return;
      if (i.tag === L) {
        var f = i.stateNode;
        return f;
      } else
        return null;
    }
    var Ix = 0, $x = 1, Dm = 2, y0 = 3, Mm = !1, g0, Om;
    g0 = !1, Om = null;
    function S0(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: le
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function Yx(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var o = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = o;
      }
    }
    function Gu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: Ix,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Yo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var o = i.shared;
      if (Om === o && !g0 && (m("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), g0 = !0), uD()) {
        var f = o.pending;
        return f === null ? t.next = t : (t.next = f.next, f.next = t), o.pending = t, sb(e, a);
      } else
        return ob(e, o, t, a);
    }
    function Nm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var o = i.shared;
        if (ep(a)) {
          var f = o.lanes;
          f = np(f, e.pendingLanes);
          var h = mt(f, a);
          o.lanes = h, yf(e, h);
        }
      }
    }
    function E0(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var o = i.updateQueue;
        if (a === o) {
          var f = null, h = null, g = a.firstBaseUpdate;
          if (g !== null) {
            var E = g;
            do {
              var _ = {
                eventTime: E.eventTime,
                lane: E.lane,
                tag: E.tag,
                payload: E.payload,
                callback: E.callback,
                next: null
              };
              h === null ? f = h = _ : (h.next = _, h = _), E = E.next;
            } while (E !== null);
            h === null ? f = h = t : (h.next = t, h = t);
          } else
            f = h = t;
          a = {
            baseState: o.baseState,
            firstBaseUpdate: f,
            lastBaseUpdate: h,
            shared: o.shared,
            effects: o.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var T = a.lastBaseUpdate;
      T === null ? a.firstBaseUpdate = t : T.next = t, a.lastBaseUpdate = t;
    }
    function cb(e, t, a, i, o, f) {
      switch (a.tag) {
        case $x: {
          var h = a.payload;
          if (typeof h == "function") {
            Hx();
            var g = h.call(f, i, o);
            {
              if (e.mode & Jt) {
                gn(!0);
                try {
                  h.call(f, i, o);
                } finally {
                  gn(!1);
                }
              }
              Px();
            }
            return g;
          }
          return h;
        }
        case y0:
          e.flags = e.flags & ~Zn | Qe;
        // Intentional fallthrough
        case Ix: {
          var E = a.payload, _;
          if (typeof E == "function") {
            Hx(), _ = E.call(f, i, o);
            {
              if (e.mode & Jt) {
                gn(!0);
                try {
                  E.call(f, i, o);
                } finally {
                  gn(!1);
                }
              }
              Px();
            }
          } else
            _ = E;
          return _ == null ? i : yt({}, i, _);
        }
        case Dm:
          return Mm = !0, i;
      }
      return i;
    }
    function Lm(e, t, a, i) {
      var o = e.updateQueue;
      Mm = !1, Om = o.shared;
      var f = o.firstBaseUpdate, h = o.lastBaseUpdate, g = o.shared.pending;
      if (g !== null) {
        o.shared.pending = null;
        var E = g, _ = E.next;
        E.next = null, h === null ? f = _ : h.next = _, h = E;
        var T = e.alternate;
        if (T !== null) {
          var H = T.updateQueue, U = H.lastBaseUpdate;
          U !== h && (U === null ? H.firstBaseUpdate = _ : U.next = _, H.lastBaseUpdate = E);
        }
      }
      if (f !== null) {
        var W = o.baseState, q = le, ee = null, ke = null, nt = null, We = f;
        do {
          var zt = We.lane, bt = We.eventTime;
          if (Uu(i, zt)) {
            if (nt !== null) {
              var te = {
                eventTime: bt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ft,
                tag: We.tag,
                payload: We.payload,
                callback: We.callback,
                next: null
              };
              nt = nt.next = te;
            }
            W = cb(e, o, We, W, t, a);
            var $ = We.callback;
            if ($ !== null && // If the update was already committed, we should not queue its
            // callback again.
            We.lane !== Ft) {
              e.flags |= on;
              var ve = o.effects;
              ve === null ? o.effects = [We] : ve.push(We);
            }
          } else {
            var I = {
              eventTime: bt,
              lane: zt,
              tag: We.tag,
              payload: We.payload,
              callback: We.callback,
              next: null
            };
            nt === null ? (ke = nt = I, ee = W) : nt = nt.next = I, q = mt(q, zt);
          }
          if (We = We.next, We === null) {
            if (g = o.shared.pending, g === null)
              break;
            var ze = g, Oe = ze.next;
            ze.next = null, We = Oe, o.lastBaseUpdate = ze, o.shared.pending = null;
          }
        } while (!0);
        nt === null && (ee = W), o.baseState = ee, o.firstBaseUpdate = ke, o.lastBaseUpdate = nt;
        var ut = o.shared.interleaved;
        if (ut !== null) {
          var dt = ut;
          do
            q = mt(q, dt.lane), dt = dt.next;
          while (dt !== ut);
        } else f === null && (o.shared.lanes = le);
        hh(q), e.lanes = q, e.memoizedState = W;
      }
      Om = null;
    }
    function fb(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function Wx() {
      Mm = !1;
    }
    function zm() {
      return Mm;
    }
    function Qx(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.callback;
          h !== null && (f.callback = null, fb(h, a));
        }
    }
    var Bp = {}, Wo = Vo(Bp), Ip = Vo(Bp), Am = Vo(Bp);
    function Um(e) {
      if (e === Bp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function Gx() {
      var e = Um(Am.current);
      return e;
    }
    function x0(e, t) {
      ia(Am, t, e), ia(Ip, e, e), ia(Wo, Bp, e);
      var a = kR(t);
      aa(Wo, e), ia(Wo, a, e);
    }
    function Wf(e) {
      aa(Wo, e), aa(Ip, e), aa(Am, e);
    }
    function C0() {
      var e = Um(Wo.current);
      return e;
    }
    function Xx(e) {
      Um(Am.current);
      var t = Um(Wo.current), a = DR(t, e.type);
      t !== a && (ia(Ip, e, e), ia(Wo, a, e));
    }
    function w0(e) {
      Ip.current === e && (aa(Wo, e), aa(Ip, e));
    }
    var db = 0, qx = 1, Kx = 1, $p = 2, ol = Vo(db);
    function _0(e, t) {
      return (e & t) !== 0;
    }
    function Qf(e) {
      return e & qx;
    }
    function R0(e, t) {
      return e & qx | t;
    }
    function pb(e, t) {
      return e | t;
    }
    function Qo(e, t) {
      ia(ol, t, e);
    }
    function Gf(e) {
      aa(ol, e);
    }
    function hb(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Fm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === xe) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || hx(i) || Ig(i))
              return t;
          }
        } else if (t.tag === Tt && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var o = (t.flags & Qe) !== Xe;
          if (o)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Pa = (
      /*   */
      0
    ), fr = (
      /* */
      1
    ), Kl = (
      /*  */
      2
    ), dr = (
      /*    */
      4
    ), jr = (
      /*   */
      8
    ), T0 = [];
    function b0() {
      for (var e = 0; e < T0.length; e++) {
        var t = T0[e];
        t._workInProgressVersionPrimary = null;
      }
      T0.length = 0;
    }
    function vb(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Le = d.ReactCurrentDispatcher, Yp = d.ReactCurrentBatchConfig, k0, Xf;
    k0 = /* @__PURE__ */ new Set();
    var sc = le, en = null, pr = null, hr = null, jm = !1, Wp = !1, Qp = 0, mb = 0, yb = 25, ae = null, ji = null, Go = -1, D0 = !1;
    function Wt() {
      {
        var e = ae;
        ji === null ? ji = [e] : ji.push(e);
      }
    }
    function Ce() {
      {
        var e = ae;
        ji !== null && (Go++, ji[Go] !== e && gb(e));
      }
    }
    function qf(e) {
      e != null && !St(e) && m("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ae, typeof e);
    }
    function gb(e) {
      {
        var t = st(en);
        if (!k0.has(t) && (k0.add(t), ji !== null)) {
          for (var a = "", i = 30, o = 0; o <= Go; o++) {
            for (var f = ji[o], h = o === Go ? e : f, g = o + 1 + ". " + f; g.length < i; )
              g += " ";
            g += h + `
`, a += g;
          }
          m(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function la() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function M0(e, t) {
      if (D0)
        return !1;
      if (t === null)
        return m("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", ae), !1;
      e.length !== t.length && m(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, ae, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!fe(e[a], t[a]))
          return !1;
      return !0;
    }
    function Kf(e, t, a, i, o, f) {
      sc = f, en = t, ji = e !== null ? e._debugHookTypes : null, Go = -1, D0 = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = le, e !== null && e.memoizedState !== null ? Le.current = SC : ji !== null ? Le.current = gC : Le.current = yC;
      var h = a(i, o);
      if (Wp) {
        var g = 0;
        do {
          if (Wp = !1, Qp = 0, g >= yb)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          g += 1, D0 = !1, pr = null, hr = null, t.updateQueue = null, Go = -1, Le.current = EC, h = a(i, o);
        } while (Wp);
      }
      Le.current = Km, t._debugHookTypes = ji;
      var E = pr !== null && pr.next !== null;
      if (sc = le, en = null, pr = null, hr = null, ae = null, ji = null, Go = -1, e !== null && (e.flags & An) !== (t.flags & An) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Ct) !== qe && m("Internal React error: Expected static flag was missing. Please notify the React team."), jm = !1, E)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return h;
    }
    function Zf() {
      var e = Qp !== 0;
      return Qp = 0, e;
    }
    function Zx(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Pt) !== qe ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = As(e.lanes, a);
    }
    function Jx() {
      if (Le.current = Km, jm) {
        for (var e = en.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        jm = !1;
      }
      sc = le, en = null, pr = null, hr = null, ji = null, Go = -1, ae = null, dC = !1, Wp = !1, Qp = 0;
    }
    function Zl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return hr === null ? en.memoizedState = hr = e : hr = hr.next = e, hr;
    }
    function Hi() {
      var e;
      if (pr === null) {
        var t = en.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = pr.next;
      var a;
      if (hr === null ? a = en.memoizedState : a = hr.next, a !== null)
        hr = a, a = hr.next, pr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        pr = e;
        var i = {
          memoizedState: pr.memoizedState,
          baseState: pr.baseState,
          baseQueue: pr.baseQueue,
          queue: pr.queue,
          next: null
        };
        hr === null ? en.memoizedState = hr = i : hr = hr.next = i;
      }
      return hr;
    }
    function eC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function O0(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function N0(e, t, a) {
      var i = Zl(), o;
      a !== void 0 ? o = a(t) : o = t, i.memoizedState = i.baseState = o;
      var f = {
        pending: null,
        interleaved: null,
        lanes: le,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      };
      i.queue = f;
      var h = f.dispatch = Cb.bind(null, en, f);
      return [i.memoizedState, h];
    }
    function L0(e, t, a) {
      var i = Hi(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var f = pr, h = f.baseQueue, g = o.pending;
      if (g !== null) {
        if (h !== null) {
          var E = h.next, _ = g.next;
          h.next = _, g.next = E;
        }
        f.baseQueue !== h && m("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), f.baseQueue = h = g, o.pending = null;
      }
      if (h !== null) {
        var T = h.next, H = f.baseState, U = null, W = null, q = null, ee = T;
        do {
          var ke = ee.lane;
          if (Uu(sc, ke)) {
            if (q !== null) {
              var We = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ft,
                action: ee.action,
                hasEagerState: ee.hasEagerState,
                eagerState: ee.eagerState,
                next: null
              };
              q = q.next = We;
            }
            if (ee.hasEagerState)
              H = ee.eagerState;
            else {
              var zt = ee.action;
              H = e(H, zt);
            }
          } else {
            var nt = {
              lane: ke,
              action: ee.action,
              hasEagerState: ee.hasEagerState,
              eagerState: ee.eagerState,
              next: null
            };
            q === null ? (W = q = nt, U = H) : q = q.next = nt, en.lanes = mt(en.lanes, ke), hh(ke);
          }
          ee = ee.next;
        } while (ee !== null && ee !== T);
        q === null ? U = H : q.next = W, fe(H, i.memoizedState) || nh(), i.memoizedState = H, i.baseState = U, i.baseQueue = q, o.lastRenderedState = H;
      }
      var bt = o.interleaved;
      if (bt !== null) {
        var I = bt;
        do {
          var te = I.lane;
          en.lanes = mt(en.lanes, te), hh(te), I = I.next;
        } while (I !== bt);
      } else h === null && (o.lanes = le);
      var $ = o.dispatch;
      return [i.memoizedState, $];
    }
    function z0(e, t, a) {
      var i = Hi(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var f = o.dispatch, h = o.pending, g = i.memoizedState;
      if (h !== null) {
        o.pending = null;
        var E = h.next, _ = E;
        do {
          var T = _.action;
          g = e(g, T), _ = _.next;
        } while (_ !== E);
        fe(g, i.memoizedState) || nh(), i.memoizedState = g, i.baseQueue === null && (i.baseState = g), o.lastRenderedState = g;
      }
      return [g, f];
    }
    function Az(e, t, a) {
    }
    function Uz(e, t, a) {
    }
    function A0(e, t, a) {
      var i = en, o = Zl(), f, h = Fr();
      if (h) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        f = a(), Xf || f !== a() && (m("The result of getServerSnapshot should be cached to avoid an infinite loop"), Xf = !0);
      } else {
        if (f = t(), !Xf) {
          var g = t();
          fe(f, g) || (m("The result of getSnapshot should be cached to avoid an infinite loop"), Xf = !0);
        }
        var E = my();
        if (E === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        vf(E, sc) || tC(i, t, f);
      }
      o.memoizedState = f;
      var _ = {
        value: f,
        getSnapshot: t
      };
      return o.queue = _, Im(rC.bind(null, i, _, e), [e]), i.flags |= Gr, Gp(fr | jr, nC.bind(null, i, _, f, t), void 0, null), f;
    }
    function Hm(e, t, a) {
      var i = en, o = Hi(), f = t();
      if (!Xf) {
        var h = t();
        fe(f, h) || (m("The result of getSnapshot should be cached to avoid an infinite loop"), Xf = !0);
      }
      var g = o.memoizedState, E = !fe(g, f);
      E && (o.memoizedState = f, nh());
      var _ = o.queue;
      if (qp(rC.bind(null, i, _, e), [e]), _.getSnapshot !== t || E || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      hr !== null && hr.memoizedState.tag & fr) {
        i.flags |= Gr, Gp(fr | jr, nC.bind(null, i, _, f, t), void 0, null);
        var T = my();
        if (T === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        vf(T, sc) || tC(i, t, f);
      }
      return f;
    }
    function tC(e, t, a) {
      e.flags |= Ro;
      var i = {
        getSnapshot: t,
        value: a
      }, o = en.updateQueue;
      if (o === null)
        o = eC(), en.updateQueue = o, o.stores = [i];
      else {
        var f = o.stores;
        f === null ? o.stores = [i] : f.push(i);
      }
    }
    function nC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, aC(t) && iC(e);
    }
    function rC(e, t, a) {
      var i = function() {
        aC(t) && iC(e);
      };
      return a(i);
    }
    function aC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !fe(a, i);
      } catch {
        return !0;
      }
    }
    function iC(e) {
      var t = Ha(e, lt);
      t !== null && gr(t, e, lt, nn);
    }
    function Pm(e) {
      var t = Zl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: le,
        dispatch: null,
        lastRenderedReducer: O0,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = wb.bind(null, en, a);
      return [t.memoizedState, i];
    }
    function U0(e) {
      return L0(O0);
    }
    function F0(e) {
      return z0(O0);
    }
    function Gp(e, t, a, i) {
      var o = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, f = en.updateQueue;
      if (f === null)
        f = eC(), en.updateQueue = f, f.lastEffect = o.next = o;
      else {
        var h = f.lastEffect;
        if (h === null)
          f.lastEffect = o.next = o;
        else {
          var g = h.next;
          h.next = o, o.next = g, f.lastEffect = o;
        }
      }
      return o;
    }
    function j0(e) {
      var t = Zl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Vm(e) {
      var t = Hi();
      return t.memoizedState;
    }
    function Xp(e, t, a, i) {
      var o = Zl(), f = i === void 0 ? null : i;
      en.flags |= e, o.memoizedState = Gp(fr | t, a, void 0, f);
    }
    function Bm(e, t, a, i) {
      var o = Hi(), f = i === void 0 ? null : i, h = void 0;
      if (pr !== null) {
        var g = pr.memoizedState;
        if (h = g.destroy, f !== null) {
          var E = g.deps;
          if (M0(f, E)) {
            o.memoizedState = Gp(t, a, h, f);
            return;
          }
        }
      }
      en.flags |= e, o.memoizedState = Gp(fr | t, a, h, f);
    }
    function Im(e, t) {
      return (en.mode & Pt) !== qe ? Xp(Ti | Gr | Vc, jr, e, t) : Xp(Gr | Vc, jr, e, t);
    }
    function qp(e, t) {
      return Bm(Gr, jr, e, t);
    }
    function H0(e, t) {
      return Xp(Ot, Kl, e, t);
    }
    function $m(e, t) {
      return Bm(Ot, Kl, e, t);
    }
    function P0(e, t) {
      var a = Ot;
      return a |= qi, (en.mode & Pt) !== qe && (a |= Ll), Xp(a, dr, e, t);
    }
    function Ym(e, t) {
      return Bm(Ot, dr, e, t);
    }
    function lC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var o = t;
        o.hasOwnProperty("current") || m("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(o).join(", ") + "}");
        var f = e();
        return o.current = f, function() {
          o.current = null;
        };
      }
    }
    function V0(e, t, a) {
      typeof t != "function" && m("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, o = Ot;
      return o |= qi, (en.mode & Pt) !== qe && (o |= Ll), Xp(o, dr, lC.bind(null, t, e), i);
    }
    function Wm(e, t, a) {
      typeof t != "function" && m("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Bm(Ot, dr, lC.bind(null, t, e), i);
    }
    function Sb(e, t) {
    }
    var Qm = Sb;
    function B0(e, t) {
      var a = Zl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function Gm(e, t) {
      var a = Hi(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var f = o[1];
        if (M0(i, f))
          return o[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function I0(e, t) {
      var a = Zl(), i = t === void 0 ? null : t, o = e();
      return a.memoizedState = [o, i], o;
    }
    function Xm(e, t) {
      var a = Hi(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var f = o[1];
        if (M0(i, f))
          return o[0];
      }
      var h = e();
      return a.memoizedState = [h, i], h;
    }
    function $0(e) {
      var t = Zl();
      return t.memoizedState = e, e;
    }
    function uC(e) {
      var t = Hi(), a = pr, i = a.memoizedState;
      return sC(t, i, e);
    }
    function oC(e) {
      var t = Hi();
      if (pr === null)
        return t.memoizedState = e, e;
      var a = pr.memoizedState;
      return sC(t, a, e);
    }
    function sC(e, t, a) {
      var i = !Zd(sc);
      if (i) {
        if (!fe(a, t)) {
          var o = tp();
          en.lanes = mt(en.lanes, o), hh(o), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, nh()), e.memoizedState = a, a;
    }
    function Eb(e, t, a) {
      var i = Ua();
      jn(Tv(i, Mi)), e(!0);
      var o = Yp.transition;
      Yp.transition = {};
      var f = Yp.transition;
      Yp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (jn(i), Yp.transition = o, o === null && f._updatedFibers) {
          var h = f._updatedFibers.size;
          h > 10 && w("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), f._updatedFibers.clear();
        }
      }
    }
    function Y0() {
      var e = Pm(!1), t = e[0], a = e[1], i = Eb.bind(null, a), o = Zl();
      return o.memoizedState = i, [t, i];
    }
    function cC() {
      var e = U0(), t = e[0], a = Hi(), i = a.memoizedState;
      return [t, i];
    }
    function fC() {
      var e = F0(), t = e[0], a = Hi(), i = a.memoizedState;
      return [t, i];
    }
    var dC = !1;
    function xb() {
      return dC;
    }
    function W0() {
      var e = Zl(), t = my(), a = t.identifierPrefix, i;
      if (Fr()) {
        var o = jT();
        i = ":" + a + "R" + o;
        var f = Qp++;
        f > 0 && (i += "H" + f.toString(32)), i += ":";
      } else {
        var h = mb++;
        i = ":" + a + "r" + h.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function qm() {
      var e = Hi(), t = e.memoizedState;
      return t;
    }
    function Cb(e, t, a) {
      typeof arguments[3] == "function" && m("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Jo(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (pC(e))
        hC(t, o);
      else {
        var f = Bx(e, t, o, i);
        if (f !== null) {
          var h = xa();
          gr(f, e, i, h), vC(f, t, i);
        }
      }
      mC(e, i);
    }
    function wb(e, t, a) {
      typeof arguments[3] == "function" && m("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Jo(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (pC(e))
        hC(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === le && (f === null || f.lanes === le)) {
          var h = t.lastRenderedReducer;
          if (h !== null) {
            var g;
            g = Le.current, Le.current = sl;
            try {
              var E = t.lastRenderedState, _ = h(E, a);
              if (o.hasEagerState = !0, o.eagerState = _, fe(_, E)) {
                ub(e, t, o, i);
                return;
              }
            } catch {
            } finally {
              Le.current = g;
            }
          }
        }
        var T = Bx(e, t, o, i);
        if (T !== null) {
          var H = xa();
          gr(T, e, i, H), vC(T, t, i);
        }
      }
      mC(e, i);
    }
    function pC(e) {
      var t = e.alternate;
      return e === en || t !== null && t === en;
    }
    function hC(e, t) {
      Wp = jm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function vC(e, t, a) {
      if (ep(a)) {
        var i = t.lanes;
        i = np(i, e.pendingLanes);
        var o = mt(i, a);
        t.lanes = o, yf(e, o);
      }
    }
    function mC(e, t, a) {
      Rs(e, t);
    }
    var Km = {
      readContext: nr,
      useCallback: la,
      useContext: la,
      useEffect: la,
      useImperativeHandle: la,
      useInsertionEffect: la,
      useLayoutEffect: la,
      useMemo: la,
      useReducer: la,
      useRef: la,
      useState: la,
      useDebugValue: la,
      useDeferredValue: la,
      useTransition: la,
      useMutableSource: la,
      useSyncExternalStore: la,
      useId: la,
      unstable_isNewReconciler: K
    }, yC = null, gC = null, SC = null, EC = null, Jl = null, sl = null, Zm = null;
    {
      var Q0 = function() {
        m("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, ft = function() {
        m("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      yC = {
        readContext: function(e) {
          return nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", Wt(), qf(t), B0(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", Wt(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", Wt(), qf(t), Im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", Wt(), qf(a), V0(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", Wt(), qf(t), H0(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", Wt(), qf(t), P0(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", Wt(), qf(t);
          var a = Le.current;
          Le.current = Jl;
          try {
            return I0(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", Wt();
          var i = Le.current;
          Le.current = Jl;
          try {
            return N0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", Wt(), j0(e);
        },
        useState: function(e) {
          ae = "useState", Wt();
          var t = Le.current;
          Le.current = Jl;
          try {
            return Pm(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", Wt(), $0(e);
        },
        useTransition: function() {
          return ae = "useTransition", Wt(), Y0();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", Wt(), A0(e, t, a);
        },
        useId: function() {
          return ae = "useId", Wt(), W0();
        },
        unstable_isNewReconciler: K
      }, gC = {
        readContext: function(e) {
          return nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", Ce(), B0(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", Ce(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", Ce(), Im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", Ce(), V0(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", Ce(), H0(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", Ce(), P0(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", Ce();
          var a = Le.current;
          Le.current = Jl;
          try {
            return I0(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", Ce();
          var i = Le.current;
          Le.current = Jl;
          try {
            return N0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", Ce(), j0(e);
        },
        useState: function(e) {
          ae = "useState", Ce();
          var t = Le.current;
          Le.current = Jl;
          try {
            return Pm(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", Ce(), void 0;
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", Ce(), $0(e);
        },
        useTransition: function() {
          return ae = "useTransition", Ce(), Y0();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", Ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", Ce(), A0(e, t, a);
        },
        useId: function() {
          return ae = "useId", Ce(), W0();
        },
        unstable_isNewReconciler: K
      }, SC = {
        readContext: function(e) {
          return nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", Ce(), Gm(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", Ce(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", Ce(), qp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", Ce(), Wm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", Ce(), $m(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", Ce(), Ym(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", Ce();
          var a = Le.current;
          Le.current = sl;
          try {
            return Xm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", Ce();
          var i = Le.current;
          Le.current = sl;
          try {
            return L0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", Ce(), Vm();
        },
        useState: function(e) {
          ae = "useState", Ce();
          var t = Le.current;
          Le.current = sl;
          try {
            return U0(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", Ce(), Qm();
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", Ce(), uC(e);
        },
        useTransition: function() {
          return ae = "useTransition", Ce(), cC();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", Ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", Ce(), Hm(e, t);
        },
        useId: function() {
          return ae = "useId", Ce(), qm();
        },
        unstable_isNewReconciler: K
      }, EC = {
        readContext: function(e) {
          return nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", Ce(), Gm(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", Ce(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", Ce(), qp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", Ce(), Wm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", Ce(), $m(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", Ce(), Ym(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", Ce();
          var a = Le.current;
          Le.current = Zm;
          try {
            return Xm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", Ce();
          var i = Le.current;
          Le.current = Zm;
          try {
            return z0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", Ce(), Vm();
        },
        useState: function(e) {
          ae = "useState", Ce();
          var t = Le.current;
          Le.current = Zm;
          try {
            return F0(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", Ce(), Qm();
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", Ce(), oC(e);
        },
        useTransition: function() {
          return ae = "useTransition", Ce(), fC();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", Ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", Ce(), Hm(e, t);
        },
        useId: function() {
          return ae = "useId", Ce(), qm();
        },
        unstable_isNewReconciler: K
      }, Jl = {
        readContext: function(e) {
          return Q0(), nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", ft(), Wt(), B0(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", ft(), Wt(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", ft(), Wt(), Im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", ft(), Wt(), V0(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", ft(), Wt(), H0(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", ft(), Wt(), P0(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", ft(), Wt();
          var a = Le.current;
          Le.current = Jl;
          try {
            return I0(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", ft(), Wt();
          var i = Le.current;
          Le.current = Jl;
          try {
            return N0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", ft(), Wt(), j0(e);
        },
        useState: function(e) {
          ae = "useState", ft(), Wt();
          var t = Le.current;
          Le.current = Jl;
          try {
            return Pm(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", ft(), Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", ft(), Wt(), $0(e);
        },
        useTransition: function() {
          return ae = "useTransition", ft(), Wt(), Y0();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", ft(), Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", ft(), Wt(), A0(e, t, a);
        },
        useId: function() {
          return ae = "useId", ft(), Wt(), W0();
        },
        unstable_isNewReconciler: K
      }, sl = {
        readContext: function(e) {
          return Q0(), nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", ft(), Ce(), Gm(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", ft(), Ce(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", ft(), Ce(), qp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", ft(), Ce(), Wm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", ft(), Ce(), $m(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", ft(), Ce(), Ym(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", ft(), Ce();
          var a = Le.current;
          Le.current = sl;
          try {
            return Xm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", ft(), Ce();
          var i = Le.current;
          Le.current = sl;
          try {
            return L0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", ft(), Ce(), Vm();
        },
        useState: function(e) {
          ae = "useState", ft(), Ce();
          var t = Le.current;
          Le.current = sl;
          try {
            return U0(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", ft(), Ce(), Qm();
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", ft(), Ce(), uC(e);
        },
        useTransition: function() {
          return ae = "useTransition", ft(), Ce(), cC();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", ft(), Ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", ft(), Ce(), Hm(e, t);
        },
        useId: function() {
          return ae = "useId", ft(), Ce(), qm();
        },
        unstable_isNewReconciler: K
      }, Zm = {
        readContext: function(e) {
          return Q0(), nr(e);
        },
        useCallback: function(e, t) {
          return ae = "useCallback", ft(), Ce(), Gm(e, t);
        },
        useContext: function(e) {
          return ae = "useContext", ft(), Ce(), nr(e);
        },
        useEffect: function(e, t) {
          return ae = "useEffect", ft(), Ce(), qp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ae = "useImperativeHandle", ft(), Ce(), Wm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ae = "useInsertionEffect", ft(), Ce(), $m(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ae = "useLayoutEffect", ft(), Ce(), Ym(e, t);
        },
        useMemo: function(e, t) {
          ae = "useMemo", ft(), Ce();
          var a = Le.current;
          Le.current = sl;
          try {
            return Xm(e, t);
          } finally {
            Le.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ae = "useReducer", ft(), Ce();
          var i = Le.current;
          Le.current = sl;
          try {
            return z0(e, t, a);
          } finally {
            Le.current = i;
          }
        },
        useRef: function(e) {
          return ae = "useRef", ft(), Ce(), Vm();
        },
        useState: function(e) {
          ae = "useState", ft(), Ce();
          var t = Le.current;
          Le.current = sl;
          try {
            return F0(e);
          } finally {
            Le.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ae = "useDebugValue", ft(), Ce(), Qm();
        },
        useDeferredValue: function(e) {
          return ae = "useDeferredValue", ft(), Ce(), oC(e);
        },
        useTransition: function() {
          return ae = "useTransition", ft(), Ce(), fC();
        },
        useMutableSource: function(e, t, a) {
          return ae = "useMutableSource", ft(), Ce(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ae = "useSyncExternalStore", ft(), Ce(), Hm(e, t);
        },
        useId: function() {
          return ae = "useId", ft(), Ce(), qm();
        },
        unstable_isNewReconciler: K
      };
    }
    var Xo = c.unstable_now, xC = 0, Jm = -1, Kp = -1, ey = -1, G0 = !1, ty = !1;
    function CC() {
      return G0;
    }
    function _b() {
      ty = !0;
    }
    function Rb() {
      G0 = !1, ty = !1;
    }
    function Tb() {
      G0 = ty, ty = !1;
    }
    function wC() {
      return xC;
    }
    function _C() {
      xC = Xo();
    }
    function X0(e) {
      Kp = Xo(), e.actualStartTime < 0 && (e.actualStartTime = Xo());
    }
    function RC(e) {
      Kp = -1;
    }
    function ny(e, t) {
      if (Kp >= 0) {
        var a = Xo() - Kp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Kp = -1;
      }
    }
    function eu(e) {
      if (Jm >= 0) {
        var t = Xo() - Jm;
        Jm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case L:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case De:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function q0(e) {
      if (ey >= 0) {
        var t = Xo() - ey;
        ey = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case L:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case De:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function tu() {
      Jm = Xo();
    }
    function K0() {
      ey = Xo();
    }
    function Z0(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function cl(e, t) {
      if (e && e.defaultProps) {
        var a = yt({}, t), i = e.defaultProps;
        for (var o in i)
          a[o] === void 0 && (a[o] = i[o]);
        return a;
      }
      return t;
    }
    var J0 = {}, eS, tS, nS, rS, aS, TC, ry, iS, lS, uS, Zp;
    {
      eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), lS = /* @__PURE__ */ new Set(), uS = /* @__PURE__ */ new Set(), Zp = /* @__PURE__ */ new Set();
      var bC = /* @__PURE__ */ new Set();
      ry = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          bC.has(a) || (bC.add(a), m("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, TC = function(e, t) {
        if (t === void 0) {
          var a = At(e) || "Component";
          aS.has(a) || (aS.add(a), m("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(J0, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(J0);
    }
    function oS(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      {
        if (e.mode & Jt) {
          gn(!0);
          try {
            f = a(i, o);
          } finally {
            gn(!1);
          }
        }
        TC(t, f);
      }
      var h = f == null ? o : yt({}, o, f);
      if (e.memoizedState = h, e.lanes === le) {
        var g = e.updateQueue;
        g.baseState = h;
      }
    }
    var sS = {
      isMounted: cv,
      enqueueSetState: function(e, t, a) {
        var i = _o(e), o = xa(), f = Jo(i), h = Gu(o, f);
        h.payload = t, a != null && (ry(a, "setState"), h.callback = a);
        var g = Yo(i, h, f);
        g !== null && (gr(g, i, f, o), Nm(g, i, f)), Rs(i, f);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = _o(e), o = xa(), f = Jo(i), h = Gu(o, f);
        h.tag = $x, h.payload = t, a != null && (ry(a, "replaceState"), h.callback = a);
        var g = Yo(i, h, f);
        g !== null && (gr(g, i, f, o), Nm(g, i, f)), Rs(i, f);
      },
      enqueueForceUpdate: function(e, t) {
        var a = _o(e), i = xa(), o = Jo(a), f = Gu(i, o);
        f.tag = Dm, t != null && (ry(t, "forceUpdate"), f.callback = t);
        var h = Yo(a, f, o);
        h !== null && (gr(h, a, o, i), Nm(h, a, o)), Gc(a, o);
      }
    };
    function kC(e, t, a, i, o, f, h) {
      var g = e.stateNode;
      if (typeof g.shouldComponentUpdate == "function") {
        var E = g.shouldComponentUpdate(i, f, h);
        {
          if (e.mode & Jt) {
            gn(!0);
            try {
              E = g.shouldComponentUpdate(i, f, h);
            } finally {
              gn(!1);
            }
          }
          E === void 0 && m("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", At(t) || "Component");
        }
        return E;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Be(a, i) || !Be(o, f) : !0;
    }
    function bb(e, t, a) {
      var i = e.stateNode;
      {
        var o = At(t) || "Component", f = i.render;
        f || (t.prototype && typeof t.prototype.render == "function" ? m("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", o) : m("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", o)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && m("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && m("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), i.propTypes && m("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", o), i.contextType && m("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), t.childContextTypes && !Zp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Jt) === qe && (Zp.add(t), m(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), t.contextTypes && !Zp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Jt) === qe && (Zp.add(t), m(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), i.contextTypes && m("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", o), t.contextType && t.contextTypes && !lS.has(t) && (lS.add(t), m("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", o)), typeof i.componentShouldUpdate == "function" && m("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && m("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", At(t) || "A pure component"), typeof i.componentDidUnmount == "function" && m("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof i.componentDidReceiveProps == "function" && m("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof i.componentWillRecieveProps == "function" && m("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof i.UNSAFE_componentWillRecieveProps == "function" && m("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o);
        var h = i.props !== a;
        i.props !== void 0 && h && m("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o, o), i.defaultProps && m("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !nS.has(t) && (nS.add(t), m("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", At(t))), typeof i.getDerivedStateFromProps == "function" && m("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof i.getDerivedStateFromError == "function" && m("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof t.getSnapshotBeforeUpdate == "function" && m("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o);
        var g = i.state;
        g && (typeof g != "object" || St(g)) && m("%s.state: must be set to an object or null", o), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && m("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o);
      }
    }
    function DC(e, t) {
      t.updater = sS, e.stateNode = t, Cu(t, e), t._reactInternalInstance = J0;
    }
    function MC(e, t, a) {
      var i = !1, o = si, f = si, h = t.contextType;
      if ("contextType" in t) {
        var g = (
          // Allow null for conditional declaration
          h === null || h !== void 0 && h.$$typeof === N && h._context === void 0
        );
        if (!g && !uS.has(t)) {
          uS.add(t);
          var E = "";
          h === void 0 ? E = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof h != "object" ? E = " However, it is set to a " + typeof h + "." : h.$$typeof === yi ? E = " Did you accidentally pass the Context.Provider instead?" : h._context !== void 0 ? E = " Did you accidentally pass the Context.Consumer instead?" : E = " However, it is set to an object with keys {" + Object.keys(h).join(", ") + "}.", m("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", At(t) || "Component", E);
        }
      }
      if (typeof h == "object" && h !== null)
        f = nr(h);
      else {
        o = jf(e, t, !0);
        var _ = t.contextTypes;
        i = _ != null, f = i ? Hf(e, o) : si;
      }
      var T = new t(a, f);
      if (e.mode & Jt) {
        gn(!0);
        try {
          T = new t(a, f);
        } finally {
          gn(!1);
        }
      }
      var H = e.memoizedState = T.state !== null && T.state !== void 0 ? T.state : null;
      DC(e, T);
      {
        if (typeof t.getDerivedStateFromProps == "function" && H === null) {
          var U = At(t) || "Component";
          tS.has(U) || (tS.add(U), m("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", U, T.state === null ? "null" : "undefined", U));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof T.getSnapshotBeforeUpdate == "function") {
          var W = null, q = null, ee = null;
          if (typeof T.componentWillMount == "function" && T.componentWillMount.__suppressDeprecationWarning !== !0 ? W = "componentWillMount" : typeof T.UNSAFE_componentWillMount == "function" && (W = "UNSAFE_componentWillMount"), typeof T.componentWillReceiveProps == "function" && T.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? q = "componentWillReceiveProps" : typeof T.UNSAFE_componentWillReceiveProps == "function" && (q = "UNSAFE_componentWillReceiveProps"), typeof T.componentWillUpdate == "function" && T.componentWillUpdate.__suppressDeprecationWarning !== !0 ? ee = "componentWillUpdate" : typeof T.UNSAFE_componentWillUpdate == "function" && (ee = "UNSAFE_componentWillUpdate"), W !== null || q !== null || ee !== null) {
            var ke = At(t) || "Component", nt = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            rS.has(ke) || (rS.add(ke), m(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ke, nt, W !== null ? `
  ` + W : "", q !== null ? `
  ` + q : "", ee !== null ? `
  ` + ee : ""));
          }
        }
      }
      return i && Sx(e, o, f), T;
    }
    function kb(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (m("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", st(e) || "Component"), sS.enqueueReplaceState(t, t.state, null));
    }
    function OC(e, t, a, i) {
      var o = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o) {
        {
          var f = st(e) || "Component";
          eS.has(f) || (eS.add(f), m("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", f));
        }
        sS.enqueueReplaceState(t, t.state, null);
      }
    }
    function cS(e, t, a, i) {
      bb(e, t, a);
      var o = e.stateNode;
      o.props = a, o.state = e.memoizedState, o.refs = {}, S0(e);
      var f = t.contextType;
      if (typeof f == "object" && f !== null)
        o.context = nr(f);
      else {
        var h = jf(e, t, !0);
        o.context = Hf(e, h);
      }
      {
        if (o.state === a) {
          var g = At(t) || "Component";
          iS.has(g) || (iS.add(g), m("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", g));
        }
        e.mode & Jt && ul.recordLegacyContextWarning(e, o), ul.recordUnsafeLifecycleWarnings(e, o);
      }
      o.state = e.memoizedState;
      var E = t.getDerivedStateFromProps;
      if (typeof E == "function" && (oS(e, t, E, a), o.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof o.getSnapshotBeforeUpdate != "function" && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (kb(e, o), Lm(e, a, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function") {
        var _ = Ot;
        _ |= qi, (e.mode & Pt) !== qe && (_ |= Ll), e.flags |= _;
      }
    }
    function Db(e, t, a, i) {
      var o = e.stateNode, f = e.memoizedProps;
      o.props = f;
      var h = o.context, g = t.contextType, E = si;
      if (typeof g == "object" && g !== null)
        E = nr(g);
      else {
        var _ = jf(e, t, !0);
        E = Hf(e, _);
      }
      var T = t.getDerivedStateFromProps, H = typeof T == "function" || typeof o.getSnapshotBeforeUpdate == "function";
      !H && (typeof o.UNSAFE_componentWillReceiveProps == "function" || typeof o.componentWillReceiveProps == "function") && (f !== a || h !== E) && OC(e, o, a, E), Wx();
      var U = e.memoizedState, W = o.state = U;
      if (Lm(e, a, o, i), W = e.memoizedState, f === a && U === W && !hm() && !zm()) {
        if (typeof o.componentDidMount == "function") {
          var q = Ot;
          q |= qi, (e.mode & Pt) !== qe && (q |= Ll), e.flags |= q;
        }
        return !1;
      }
      typeof T == "function" && (oS(e, t, T, a), W = e.memoizedState);
      var ee = zm() || kC(e, t, f, a, U, W, E);
      if (ee) {
        if (!H && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function") {
          var ke = Ot;
          ke |= qi, (e.mode & Pt) !== qe && (ke |= Ll), e.flags |= ke;
        }
      } else {
        if (typeof o.componentDidMount == "function") {
          var nt = Ot;
          nt |= qi, (e.mode & Pt) !== qe && (nt |= Ll), e.flags |= nt;
        }
        e.memoizedProps = a, e.memoizedState = W;
      }
      return o.props = a, o.state = W, o.context = E, ee;
    }
    function Mb(e, t, a, i, o) {
      var f = t.stateNode;
      Yx(e, t);
      var h = t.memoizedProps, g = t.type === t.elementType ? h : cl(t.type, h);
      f.props = g;
      var E = t.pendingProps, _ = f.context, T = a.contextType, H = si;
      if (typeof T == "object" && T !== null)
        H = nr(T);
      else {
        var U = jf(t, a, !0);
        H = Hf(t, U);
      }
      var W = a.getDerivedStateFromProps, q = typeof W == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      !q && (typeof f.UNSAFE_componentWillReceiveProps == "function" || typeof f.componentWillReceiveProps == "function") && (h !== E || _ !== H) && OC(t, f, i, H), Wx();
      var ee = t.memoizedState, ke = f.state = ee;
      if (Lm(t, i, f, o), ke = t.memoizedState, h === E && ee === ke && !hm() && !zm() && !ue)
        return typeof f.componentDidUpdate == "function" && (h !== e.memoizedProps || ee !== e.memoizedState) && (t.flags |= Ot), typeof f.getSnapshotBeforeUpdate == "function" && (h !== e.memoizedProps || ee !== e.memoizedState) && (t.flags |= Wn), !1;
      typeof W == "function" && (oS(t, a, W, i), ke = t.memoizedState);
      var nt = zm() || kC(t, a, g, i, ee, ke, H) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ue;
      return nt ? (!q && (typeof f.UNSAFE_componentWillUpdate == "function" || typeof f.componentWillUpdate == "function") && (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, ke, H), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(i, ke, H)), typeof f.componentDidUpdate == "function" && (t.flags |= Ot), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= Wn)) : (typeof f.componentDidUpdate == "function" && (h !== e.memoizedProps || ee !== e.memoizedState) && (t.flags |= Ot), typeof f.getSnapshotBeforeUpdate == "function" && (h !== e.memoizedProps || ee !== e.memoizedState) && (t.flags |= Wn), t.memoizedProps = i, t.memoizedState = ke), f.props = i, f.state = ke, f.context = H, nt;
    }
    function cc(e, t) {
      return {
        value: e,
        source: t,
        stack: $i(t),
        digest: null
      };
    }
    function fS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Ob(e, t) {
      return !0;
    }
    function dS(e, t) {
      try {
        var a = Ob(e, t);
        if (a === !1)
          return;
        var i = t.value, o = t.source, f = t.stack, h = f !== null ? f : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === R)
            return;
          console.error(i);
        }
        var g = o ? st(o) : null, E = g ? "The above error occurred in the <" + g + "> component:" : "The above error occurred in one of your React components:", _;
        if (e.tag === L)
          _ = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var T = st(e) || "Anonymous";
          _ = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + T + ".");
        }
        var H = E + `
` + h + `

` + ("" + _);
        console.error(H);
      } catch (U) {
        setTimeout(function() {
          throw U;
        });
      }
    }
    var Nb = typeof WeakMap == "function" ? WeakMap : Map;
    function NC(e, t, a) {
      var i = Gu(nn, a);
      i.tag = y0, i.payload = {
        element: null
      };
      var o = t.value;
      return i.callback = function() {
        _D(o), dS(e, t);
      }, i;
    }
    function pS(e, t, a) {
      var i = Gu(nn, a);
      i.tag = y0;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = t.value;
        i.payload = function() {
          return o(f);
        }, i.callback = function() {
          Iw(e), dS(e, t);
        };
      }
      var h = e.stateNode;
      return h !== null && typeof h.componentDidCatch == "function" && (i.callback = function() {
        Iw(e), dS(e, t), typeof o != "function" && CD(this);
        var E = t.value, _ = t.stack;
        this.componentDidCatch(E, {
          componentStack: _ !== null ? _ : ""
        }), typeof o != "function" && (ea(e.lanes, lt) || m("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", st(e) || "Unknown"));
      }), i;
    }
    function LC(e, t, a) {
      var i = e.pingCache, o;
      if (i === null ? (i = e.pingCache = new Nb(), o = /* @__PURE__ */ new Set(), i.set(t, o)) : (o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o))), !o.has(a)) {
        o.add(a);
        var f = RD.bind(null, e, t, a);
        Zr && vh(e, a), t.then(f, f);
      }
    }
    function Lb(e, t, a, i) {
      var o = e.updateQueue;
      if (o === null) {
        var f = /* @__PURE__ */ new Set();
        f.add(a), e.updateQueue = f;
      } else
        o.add(a);
    }
    function zb(e, t) {
      var a = e.tag;
      if ((e.mode & Ct) === qe && (a === k || a === pe || a === Ue)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function zC(e) {
      var t = e;
      do {
        if (t.tag === xe && hb(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function AC(e, t, a, i, o) {
      if ((e.mode & Ct) === qe) {
        if (e === t)
          e.flags |= Zn;
        else {
          if (e.flags |= Qe, a.flags |= Pc, a.flags &= -52805, a.tag === R) {
            var f = a.alternate;
            if (f === null)
              a.tag = Et;
            else {
              var h = Gu(nn, lt);
              h.tag = Dm, Yo(a, h, lt);
            }
          }
          a.lanes = mt(a.lanes, lt);
        }
        return e;
      }
      return e.flags |= Zn, e.lanes = o, e;
    }
    function Ab(e, t, a, i, o) {
      if (a.flags |= Ss, Zr && vh(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        var f = i;
        zb(a), Fr() && a.mode & Ct && Tx();
        var h = zC(t);
        if (h !== null) {
          h.flags &= ~Cr, AC(h, t, a, e, o), h.mode & Ct && LC(e, f, o), Lb(h, e, f);
          return;
        } else {
          if (!gv(o)) {
            LC(e, f, o), WS();
            return;
          }
          var g = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = g;
        }
      } else if (Fr() && a.mode & Ct) {
        Tx();
        var E = zC(t);
        if (E !== null) {
          (E.flags & Zn) === Xe && (E.flags |= Cr), AC(E, t, a, e, o), i0(cc(i, a));
          return;
        }
      }
      i = cc(i, a), hD(i);
      var _ = t;
      do {
        switch (_.tag) {
          case L: {
            var T = i;
            _.flags |= Zn;
            var H = zs(o);
            _.lanes = mt(_.lanes, H);
            var U = NC(_, T, H);
            E0(_, U);
            return;
          }
          case R:
            var W = i, q = _.type, ee = _.stateNode;
            if ((_.flags & Qe) === Xe && (typeof q.getDerivedStateFromError == "function" || ee !== null && typeof ee.componentDidCatch == "function" && !zw(ee))) {
              _.flags |= Zn;
              var ke = zs(o);
              _.lanes = mt(_.lanes, ke);
              var nt = pS(_, W, ke);
              E0(_, nt);
              return;
            }
            break;
        }
        _ = _.return;
      } while (_ !== null);
    }
    function Ub() {
      return null;
    }
    var Jp = d.ReactCurrentOwner, fl = !1, hS, eh, vS, mS, yS, fc, gS, ay, th;
    hS = {}, eh = {}, vS = {}, mS = {}, yS = {}, fc = !1, gS = {}, ay = {}, th = {};
    function Sa(e, t, a, i) {
      e === null ? t.child = jx(t, null, a, i) : t.child = If(t, e.child, a, i);
    }
    function Fb(e, t, a, i) {
      t.child = If(t, e.child, null, i), t.child = If(t, null, a, i);
    }
    function UC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var f = a.propTypes;
        f && il(
          f,
          i,
          // Resolved props
          "prop",
          At(a)
        );
      }
      var h = a.render, g = t.ref, E, _;
      Yf(t, o), va(t);
      {
        if (Jp.current = t, Yn(!0), E = Kf(e, t, h, i, g, o), _ = Zf(), t.mode & Jt) {
          gn(!0);
          try {
            E = Kf(e, t, h, i, g, o), _ = Zf();
          } finally {
            gn(!1);
          }
        }
        Yn(!1);
      }
      return ma(), e !== null && !fl ? (Zx(e, t, o), Xu(e, t, o)) : (Fr() && _ && Jg(t), t.flags |= ai, Sa(e, t, E, o), t.child);
    }
    function FC(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        if (BD(f) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var h = f;
          return h = ld(f), t.tag = Ue, t.type = h, xS(t, f), jC(e, t, h, i, o);
        }
        {
          var g = f.propTypes;
          if (g && il(
            g,
            i,
            // Resolved props
            "prop",
            At(f)
          ), a.defaultProps !== void 0) {
            var E = At(f) || "Unknown";
            th[E] || (m("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", E), th[E] = !0);
          }
        }
        var _ = rE(a.type, null, i, t, t.mode, o);
        return _.ref = t.ref, _.return = t, t.child = _, _;
      }
      {
        var T = a.type, H = T.propTypes;
        H && il(
          H,
          i,
          // Resolved props
          "prop",
          At(T)
        );
      }
      var U = e.child, W = bS(e, o);
      if (!W) {
        var q = U.memoizedProps, ee = a.compare;
        if (ee = ee !== null ? ee : Be, ee(q, i) && e.ref === t.ref)
          return Xu(e, t, o);
      }
      t.flags |= ai;
      var ke = mc(U, i);
      return ke.ref = t.ref, ke.return = t, t.child = ke, ke;
    }
    function jC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var f = t.elementType;
        if (f.$$typeof === ct) {
          var h = f, g = h._payload, E = h._init;
          try {
            f = E(g);
          } catch {
            f = null;
          }
          var _ = f && f.propTypes;
          _ && il(
            _,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            At(f)
          );
        }
      }
      if (e !== null) {
        var T = e.memoizedProps;
        if (Be(T, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (fl = !1, t.pendingProps = i = T, bS(e, o))
            (e.flags & Pc) !== Xe && (fl = !0);
          else return t.lanes = e.lanes, Xu(e, t, o);
      }
      return SS(e, t, a, i, o);
    }
    function HC(e, t, a) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ne)
        if ((t.mode & Ct) === qe) {
          var h = {
            baseLanes: le,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = h, yy(t, a);
        } else if (ea(a, Jr)) {
          var H = {
            baseLanes: le,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = H;
          var U = f !== null ? f.baseLanes : a;
          yy(t, U);
        } else {
          var g = null, E;
          if (f !== null) {
            var _ = f.baseLanes;
            E = mt(_, a);
          } else
            E = a;
          t.lanes = t.childLanes = Jr;
          var T = {
            baseLanes: E,
            cachePool: g,
            transitions: null
          };
          return t.memoizedState = T, t.updateQueue = null, yy(t, E), null;
        }
      else {
        var W;
        f !== null ? (W = mt(f.baseLanes, a), t.memoizedState = null) : W = a, yy(t, W);
      }
      return Sa(e, t, o, a), t.child;
    }
    function jb(e, t, a) {
      var i = t.pendingProps;
      return Sa(e, t, i, a), t.child;
    }
    function Hb(e, t, a) {
      var i = t.pendingProps.children;
      return Sa(e, t, i, a), t.child;
    }
    function Pb(e, t, a) {
      {
        t.flags |= Ot;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var o = t.pendingProps, f = o.children;
      return Sa(e, t, f, a), t.child;
    }
    function PC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= xn, t.flags |= To);
    }
    function SS(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var f = a.propTypes;
        f && il(
          f,
          i,
          // Resolved props
          "prop",
          At(a)
        );
      }
      var h;
      {
        var g = jf(t, a, !0);
        h = Hf(t, g);
      }
      var E, _;
      Yf(t, o), va(t);
      {
        if (Jp.current = t, Yn(!0), E = Kf(e, t, a, i, h, o), _ = Zf(), t.mode & Jt) {
          gn(!0);
          try {
            E = Kf(e, t, a, i, h, o), _ = Zf();
          } finally {
            gn(!1);
          }
        }
        Yn(!1);
      }
      return ma(), e !== null && !fl ? (Zx(e, t, o), Xu(e, t, o)) : (Fr() && _ && Jg(t), t.flags |= ai, Sa(e, t, E, o), t.child);
    }
    function VC(e, t, a, i, o) {
      {
        switch (rM(t)) {
          case !1: {
            var f = t.stateNode, h = t.type, g = new h(t.memoizedProps, f.context), E = g.state;
            f.updater.enqueueSetState(f, E, null);
            break;
          }
          case !0: {
            t.flags |= Qe, t.flags |= Zn;
            var _ = new Error("Simulated error coming from DevTools"), T = zs(o);
            t.lanes = mt(t.lanes, T);
            var H = pS(t, cc(_, t), T);
            E0(t, H);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var U = a.propTypes;
          U && il(
            U,
            i,
            // Resolved props
            "prop",
            At(a)
          );
        }
      }
      var W;
      ql(a) ? (W = !0, mm(t)) : W = !1, Yf(t, o);
      var q = t.stateNode, ee;
      q === null ? (ly(e, t), MC(t, a, i), cS(t, a, i, o), ee = !0) : e === null ? ee = Db(t, a, i, o) : ee = Mb(e, t, a, i, o);
      var ke = ES(e, t, a, ee, W, o);
      {
        var nt = t.stateNode;
        ee && nt.props !== i && (fc || m("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", st(t) || "a component"), fc = !0);
      }
      return ke;
    }
    function ES(e, t, a, i, o, f) {
      PC(e, t);
      var h = (t.flags & Qe) !== Xe;
      if (!i && !h)
        return o && Cx(t, a, !1), Xu(e, t, f);
      var g = t.stateNode;
      Jp.current = t;
      var E;
      if (h && typeof a.getDerivedStateFromError != "function")
        E = null, RC();
      else {
        va(t);
        {
          if (Yn(!0), E = g.render(), t.mode & Jt) {
            gn(!0);
            try {
              g.render();
            } finally {
              gn(!1);
            }
          }
          Yn(!1);
        }
        ma();
      }
      return t.flags |= ai, e !== null && h ? Fb(e, t, E, f) : Sa(e, t, E, f), t.memoizedState = g.state, o && Cx(t, a, !0), t.child;
    }
    function BC(e) {
      var t = e.stateNode;
      t.pendingContext ? Ex(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ex(e, t.context, !1), x0(e, t.containerInfo);
    }
    function Vb(e, t, a) {
      if (BC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, o = t.memoizedState, f = o.element;
      Yx(e, t), Lm(t, i, null, a);
      var h = t.memoizedState;
      t.stateNode;
      var g = h.element;
      if (o.isDehydrated) {
        var E = {
          element: g,
          isDehydrated: !1,
          cache: h.cache,
          pendingSuspenseBoundaries: h.pendingSuspenseBoundaries,
          transitions: h.transitions
        }, _ = t.updateQueue;
        if (_.baseState = E, t.memoizedState = E, t.flags & Cr) {
          var T = cc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return IC(e, t, g, a, T);
        } else if (g !== f) {
          var H = cc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return IC(e, t, g, a, H);
        } else {
          $T(t);
          var U = jx(t, null, g, a);
          t.child = U;
          for (var W = U; W; )
            W.flags = W.flags & ~yn | Xr, W = W.sibling;
        }
      } else {
        if (Bf(), g === f)
          return Xu(e, t, a);
        Sa(e, t, g, a);
      }
      return t.child;
    }
    function IC(e, t, a, i, o) {
      return Bf(), i0(o), t.flags |= Cr, Sa(e, t, a, i), t.child;
    }
    function Bb(e, t, a) {
      Xx(t), e === null && a0(t);
      var i = t.type, o = t.pendingProps, f = e !== null ? e.memoizedProps : null, h = o.children, g = Hg(i, o);
      return g ? h = null : f !== null && Hg(i, f) && (t.flags |= Ma), PC(e, t), Sa(e, t, h, a), t.child;
    }
    function Ib(e, t) {
      return e === null && a0(t), null;
    }
    function $b(e, t, a, i) {
      ly(e, t);
      var o = t.pendingProps, f = a, h = f._payload, g = f._init, E = g(h);
      t.type = E;
      var _ = t.tag = ID(E), T = cl(E, o), H;
      switch (_) {
        case k:
          return xS(t, E), t.type = E = ld(E), H = SS(null, t, E, T, i), H;
        case R:
          return t.type = E = KS(E), H = VC(null, t, E, T, i), H;
        case pe:
          return t.type = E = ZS(E), H = UC(null, t, E, T, i), H;
        case Me: {
          if (t.type !== t.elementType) {
            var U = E.propTypes;
            U && il(
              U,
              T,
              // Resolved for outer only
              "prop",
              At(E)
            );
          }
          return H = FC(
            null,
            t,
            E,
            cl(E.type, T),
            // The inner type can have defaults too
            i
          ), H;
        }
      }
      var W = "";
      throw E !== null && typeof E == "object" && E.$$typeof === ct && (W = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + E + ". " + ("Lazy element type must resolve to a class or function." + W));
    }
    function Yb(e, t, a, i, o) {
      ly(e, t), t.tag = R;
      var f;
      return ql(a) ? (f = !0, mm(t)) : f = !1, Yf(t, o), MC(t, a, i), cS(t, a, i, o), ES(null, t, a, !0, f, o);
    }
    function Wb(e, t, a, i) {
      ly(e, t);
      var o = t.pendingProps, f;
      {
        var h = jf(t, a, !1);
        f = Hf(t, h);
      }
      Yf(t, i);
      var g, E;
      va(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var _ = At(a) || "Unknown";
          hS[_] || (m("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _, _), hS[_] = !0);
        }
        t.mode & Jt && ul.recordLegacyContextWarning(t, null), Yn(!0), Jp.current = t, g = Kf(null, t, a, o, f, i), E = Zf(), Yn(!1);
      }
      if (ma(), t.flags |= ai, typeof g == "object" && g !== null && typeof g.render == "function" && g.$$typeof === void 0) {
        var T = At(a) || "Unknown";
        eh[T] || (m("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", T, T, T), eh[T] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof g == "object" && g !== null && typeof g.render == "function" && g.$$typeof === void 0
      ) {
        {
          var H = At(a) || "Unknown";
          eh[H] || (m("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", H, H, H), eh[H] = !0);
        }
        t.tag = R, t.memoizedState = null, t.updateQueue = null;
        var U = !1;
        return ql(a) ? (U = !0, mm(t)) : U = !1, t.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null, S0(t), DC(t, g), cS(t, a, o, i), ES(null, t, a, !0, U, i);
      } else {
        if (t.tag = k, t.mode & Jt) {
          gn(!0);
          try {
            g = Kf(null, t, a, o, f, i), E = Zf();
          } finally {
            gn(!1);
          }
        }
        return Fr() && E && Jg(t), Sa(null, t, g, i), xS(t, a), t.child;
      }
    }
    function xS(e, t) {
      {
        if (t && t.childContextTypes && m("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Mr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var o = i || "", f = e._debugSource;
          f && (o = f.fileName + ":" + f.lineNumber), yS[o] || (yS[o] = !0, m("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var h = At(t) || "Unknown";
          th[h] || (m("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", h), th[h] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var g = At(t) || "Unknown";
          mS[g] || (m("%s: Function components do not support getDerivedStateFromProps.", g), mS[g] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var E = At(t) || "Unknown";
          vS[E] || (m("%s: Function components do not support contextType.", E), vS[E] = !0);
        }
      }
    }
    var CS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Ft
    };
    function wS(e) {
      return {
        baseLanes: e,
        cachePool: Ub(),
        transitions: null
      };
    }
    function Qb(e, t) {
      var a = null;
      return {
        baseLanes: mt(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function Gb(e, t, a, i) {
      if (t !== null) {
        var o = t.memoizedState;
        if (o === null)
          return !1;
      }
      return _0(e, $p);
    }
    function Xb(e, t) {
      return As(e.childLanes, t);
    }
    function $C(e, t, a) {
      var i = t.pendingProps;
      aM(t) && (t.flags |= Qe);
      var o = ol.current, f = !1, h = (t.flags & Qe) !== Xe;
      if (h || Gb(o, e) ? (f = !0, t.flags &= ~Qe) : (e === null || e.memoizedState !== null) && (o = pb(o, Kx)), o = Qf(o), Qo(t, o), e === null) {
        a0(t);
        var g = t.memoizedState;
        if (g !== null) {
          var E = g.dehydrated;
          if (E !== null)
            return ek(t, E);
        }
        var _ = i.children, T = i.fallback;
        if (f) {
          var H = qb(t, _, T, a), U = t.child;
          return U.memoizedState = wS(a), t.memoizedState = CS, H;
        } else
          return _S(t, _);
      } else {
        var W = e.memoizedState;
        if (W !== null) {
          var q = W.dehydrated;
          if (q !== null)
            return tk(e, t, h, i, q, W, a);
        }
        if (f) {
          var ee = i.fallback, ke = i.children, nt = Zb(e, t, ke, ee, a), We = t.child, zt = e.child.memoizedState;
          return We.memoizedState = zt === null ? wS(a) : Qb(zt, a), We.childLanes = Xb(e, a), t.memoizedState = CS, nt;
        } else {
          var bt = i.children, I = Kb(e, t, bt, a);
          return t.memoizedState = null, I;
        }
      }
    }
    function _S(e, t, a) {
      var i = e.mode, o = {
        mode: "visible",
        children: t
      }, f = RS(o, i);
      return f.return = e, e.child = f, f;
    }
    function qb(e, t, a, i) {
      var o = e.mode, f = e.child, h = {
        mode: "hidden",
        children: t
      }, g, E;
      return (o & Ct) === qe && f !== null ? (g = f, g.childLanes = le, g.pendingProps = h, e.mode & Ht && (g.actualDuration = 0, g.actualStartTime = -1, g.selfBaseDuration = 0, g.treeBaseDuration = 0), E = ts(a, o, i, null)) : (g = RS(h, o), E = ts(a, o, i, null)), g.return = e, E.return = e, g.sibling = E, e.child = g, E;
    }
    function RS(e, t, a) {
      return Yw(e, t, le, null);
    }
    function YC(e, t) {
      return mc(e, t);
    }
    function Kb(e, t, a, i) {
      var o = e.child, f = o.sibling, h = YC(o, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Ct) === qe && (h.lanes = i), h.return = t, h.sibling = null, f !== null) {
        var g = t.deletions;
        g === null ? (t.deletions = [f], t.flags |= Da) : g.push(f);
      }
      return t.child = h, h;
    }
    function Zb(e, t, a, i, o) {
      var f = t.mode, h = e.child, g = h.sibling, E = {
        mode: "hidden",
        children: a
      }, _;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (f & Ct) === qe && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== h
      ) {
        var T = t.child;
        _ = T, _.childLanes = le, _.pendingProps = E, t.mode & Ht && (_.actualDuration = 0, _.actualStartTime = -1, _.selfBaseDuration = h.selfBaseDuration, _.treeBaseDuration = h.treeBaseDuration), t.deletions = null;
      } else
        _ = YC(h, E), _.subtreeFlags = h.subtreeFlags & An;
      var H;
      return g !== null ? H = mc(g, i) : (H = ts(i, f, o, null), H.flags |= yn), H.return = t, _.return = t, _.sibling = H, t.child = _, H;
    }
    function iy(e, t, a, i) {
      i !== null && i0(i), If(t, e.child, null, a);
      var o = t.pendingProps, f = o.children, h = _S(t, f);
      return h.flags |= yn, t.memoizedState = null, h;
    }
    function Jb(e, t, a, i, o) {
      var f = t.mode, h = {
        mode: "visible",
        children: a
      }, g = RS(h, f), E = ts(i, f, o, null);
      return E.flags |= yn, g.return = t, E.return = t, g.sibling = E, t.child = g, (t.mode & Ct) !== qe && If(t, e.child, null, o), E;
    }
    function ek(e, t, a) {
      return (e.mode & Ct) === qe ? (m("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = lt) : Ig(t) ? e.lanes = wr : e.lanes = Jr, null;
    }
    function tk(e, t, a, i, o, f, h) {
      if (a)
        if (t.flags & Cr) {
          t.flags &= ~Cr;
          var I = fS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return iy(e, t, h, I);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Qe, null;
          var te = i.children, $ = i.fallback, ve = Jb(e, t, te, $, h), ze = t.child;
          return ze.memoizedState = wS(h), t.memoizedState = CS, ve;
        }
      else {
        if (BT(), (t.mode & Ct) === qe)
          return iy(
            e,
            t,
            h,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Ig(o)) {
          var g, E, _;
          {
            var T = iT(o);
            g = T.digest, E = T.message, _ = T.stack;
          }
          var H;
          E ? H = new Error(E) : H = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var U = fS(H, g, _);
          return iy(e, t, h, U);
        }
        var W = ea(h, e.childLanes);
        if (fl || W) {
          var q = my();
          if (q !== null) {
            var ee = ap(q, h);
            if (ee !== Ft && ee !== f.retryLane) {
              f.retryLane = ee;
              var ke = nn;
              Ha(e, ee), gr(q, e, ee, ke);
            }
          }
          WS();
          var nt = fS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return iy(e, t, h, nt);
        } else if (hx(o)) {
          t.flags |= Qe, t.child = e.child;
          var We = TD.bind(null, e);
          return lT(o, We), null;
        } else {
          YT(t, o, f.treeContext);
          var zt = i.children, bt = _S(t, zt);
          return bt.flags |= Xr, bt;
        }
      }
    }
    function WC(e, t, a) {
      e.lanes = mt(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = mt(i.lanes, t)), v0(e.return, t, a);
    }
    function nk(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === xe) {
          var o = i.memoizedState;
          o !== null && WC(i, a, e);
        } else if (i.tag === Tt)
          WC(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function rk(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Fm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function ak(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !gS[e])
        if (gS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              m('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              m('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              m('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          m('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function ik(e, t) {
      e !== void 0 && !ay[e] && (e !== "collapsed" && e !== "hidden" ? (ay[e] = !0, m('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (ay[e] = !0, m('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function QC(e, t) {
      {
        var a = St(e), i = !a && typeof vt(e) == "function";
        if (a || i) {
          var o = a ? "array" : "iterable";
          return m("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", o, t, o), !1;
        }
      }
      return !0;
    }
    function lk(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (St(e)) {
          for (var a = 0; a < e.length; a++)
            if (!QC(e[a], a))
              return;
        } else {
          var i = vt(e);
          if (typeof i == "function") {
            var o = i.call(e);
            if (o)
              for (var f = o.next(), h = 0; !f.done; f = o.next()) {
                if (!QC(f.value, h))
                  return;
                h++;
              }
          } else
            m('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function TS(e, t, a, i, o) {
      var f = e.memoizedState;
      f === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = a, f.tailMode = o);
    }
    function GC(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail, h = i.children;
      ak(o), ik(f, o), lk(h, o), Sa(e, t, h, a);
      var g = ol.current, E = _0(g, $p);
      if (E)
        g = R0(g, $p), t.flags |= Qe;
      else {
        var _ = e !== null && (e.flags & Qe) !== Xe;
        _ && nk(t, t.child, a), g = Qf(g);
      }
      if (Qo(t, g), (t.mode & Ct) === qe)
        t.memoizedState = null;
      else
        switch (o) {
          case "forwards": {
            var T = rk(t.child), H;
            T === null ? (H = t.child, t.child = null) : (H = T.sibling, T.sibling = null), TS(
              t,
              !1,
              // isBackwards
              H,
              T,
              f
            );
            break;
          }
          case "backwards": {
            var U = null, W = t.child;
            for (t.child = null; W !== null; ) {
              var q = W.alternate;
              if (q !== null && Fm(q) === null) {
                t.child = W;
                break;
              }
              var ee = W.sibling;
              W.sibling = U, U = W, W = ee;
            }
            TS(
              t,
              !0,
              // isBackwards
              U,
              null,
              // last
              f
            );
            break;
          }
          case "together": {
            TS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function uk(e, t, a) {
      x0(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = If(t, null, i, a) : Sa(e, t, i, a), t.child;
    }
    var XC = !1;
    function ok(e, t, a) {
      var i = t.type, o = i._context, f = t.pendingProps, h = t.memoizedProps, g = f.value;
      {
        "value" in f || XC || (XC = !0, m("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var E = t.type.propTypes;
        E && il(E, f, "prop", "Context.Provider");
      }
      if (Vx(t, o, g), h !== null) {
        var _ = h.value;
        if (fe(_, g)) {
          if (h.children === f.children && !hm())
            return Xu(e, t, a);
        } else
          ab(t, o, a);
      }
      var T = f.children;
      return Sa(e, t, T, a), t.child;
    }
    var qC = !1;
    function sk(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (qC || (qC = !0, m("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var o = t.pendingProps, f = o.children;
      typeof f != "function" && m("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Yf(t, a);
      var h = nr(i);
      va(t);
      var g;
      return Jp.current = t, Yn(!0), g = f(h), Yn(!1), ma(), t.flags |= ai, Sa(e, t, g, a), t.child;
    }
    function nh() {
      fl = !0;
    }
    function ly(e, t) {
      (t.mode & Ct) === qe && e !== null && (e.alternate = null, t.alternate = null, t.flags |= yn);
    }
    function Xu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), RC(), hh(t.lanes), ea(a, t.childLanes) ? (nb(e, t), t.child) : null;
    }
    function ck(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw new Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw new Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        var f = i.deletions;
        return f === null ? (i.deletions = [e], i.flags |= Da) : f.push(e), a.flags |= yn, a;
      }
    }
    function bS(e, t) {
      var a = e.lanes;
      return !!ea(a, t);
    }
    function fk(e, t, a) {
      switch (t.tag) {
        case L:
          BC(t), t.stateNode, Bf();
          break;
        case V:
          Xx(t);
          break;
        case R: {
          var i = t.type;
          ql(i) && mm(t);
          break;
        }
        case F:
          x0(t, t.stateNode.containerInfo);
          break;
        case Pe: {
          var o = t.memoizedProps.value, f = t.type._context;
          Vx(t, f, o);
          break;
        }
        case De:
          {
            var h = ea(a, t.childLanes);
            h && (t.flags |= Ot);
            {
              var g = t.stateNode;
              g.effectDuration = 0, g.passiveEffectDuration = 0;
            }
          }
          break;
        case xe: {
          var E = t.memoizedState;
          if (E !== null) {
            if (E.dehydrated !== null)
              return Qo(t, Qf(ol.current)), t.flags |= Qe, null;
            var _ = t.child, T = _.childLanes;
            if (ea(a, T))
              return $C(e, t, a);
            Qo(t, Qf(ol.current));
            var H = Xu(e, t, a);
            return H !== null ? H.sibling : null;
          } else
            Qo(t, Qf(ol.current));
          break;
        }
        case Tt: {
          var U = (e.flags & Qe) !== Xe, W = ea(a, t.childLanes);
          if (U) {
            if (W)
              return GC(e, t, a);
            t.flags |= Qe;
          }
          var q = t.memoizedState;
          if (q !== null && (q.rendering = null, q.tail = null, q.lastEffect = null), Qo(t, ol.current), W)
            break;
          return null;
        }
        case je:
        case P:
          return t.lanes = le, HC(e, t, a);
      }
      return Xu(e, t, a);
    }
    function KC(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return ck(e, t, rE(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, o = t.pendingProps;
        if (i !== o || hm() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          fl = !0;
        else {
          var f = bS(e, a);
          if (!f && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Qe) === Xe)
            return fl = !1, fk(e, t, a);
          (e.flags & Pc) !== Xe ? fl = !0 : fl = !1;
        }
      } else if (fl = !1, Fr() && UT(t)) {
        var h = t.index, g = FT();
        Rx(t, g, h);
      }
      switch (t.lanes = le, t.tag) {
        case O:
          return Wb(e, t, t.type, a);
        case kt: {
          var E = t.elementType;
          return $b(e, t, E, a);
        }
        case k: {
          var _ = t.type, T = t.pendingProps, H = t.elementType === _ ? T : cl(_, T);
          return SS(e, t, _, H, a);
        }
        case R: {
          var U = t.type, W = t.pendingProps, q = t.elementType === U ? W : cl(U, W);
          return VC(e, t, U, q, a);
        }
        case L:
          return Vb(e, t, a);
        case V:
          return Bb(e, t, a);
        case me:
          return Ib(e, t);
        case xe:
          return $C(e, t, a);
        case F:
          return uk(e, t, a);
        case pe: {
          var ee = t.type, ke = t.pendingProps, nt = t.elementType === ee ? ke : cl(ee, ke);
          return UC(e, t, ee, nt, a);
        }
        case ge:
          return jb(e, t, a);
        case Se:
          return Hb(e, t, a);
        case De:
          return Pb(e, t, a);
        case Pe:
          return ok(e, t, a);
        case se:
          return sk(e, t, a);
        case Me: {
          var We = t.type, zt = t.pendingProps, bt = cl(We, zt);
          if (t.type !== t.elementType) {
            var I = We.propTypes;
            I && il(
              I,
              bt,
              // Resolved for outer only
              "prop",
              At(We)
            );
          }
          return bt = cl(We.type, bt), FC(e, t, We, bt, a);
        }
        case Ue:
          return jC(e, t, t.type, t.pendingProps, a);
        case Et: {
          var te = t.type, $ = t.pendingProps, ve = t.elementType === te ? $ : cl(te, $);
          return Yb(e, t, te, ve, a);
        }
        case Tt:
          return GC(e, t, a);
        case _e:
          break;
        case je:
          return HC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Jf(e) {
      e.flags |= Ot;
    }
    function ZC(e) {
      e.flags |= xn, e.flags |= To;
    }
    var JC, kS, ew, tw;
    JC = function(e, t, a, i) {
      for (var o = t.child; o !== null; ) {
        if (o.tag === V || o.tag === me)
          LR(e, o.stateNode);
        else if (o.tag !== F) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === t)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === t)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }, kS = function(e, t) {
    }, ew = function(e, t, a, i, o) {
      var f = e.memoizedProps;
      if (f !== i) {
        var h = t.stateNode, g = C0(), E = AR(h, a, f, i, o, g);
        t.updateQueue = E, E && Jf(t);
      }
    }, tw = function(e, t, a, i) {
      a !== i && Jf(t);
    };
    function rh(e, t) {
      if (!Fr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var o = e.tail, f = null; o !== null; )
              o.alternate !== null && (f = o), o = o.sibling;
            f === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : f.sibling = null;
            break;
          }
        }
    }
    function Hr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = le, i = Xe;
      if (t) {
        if ((e.mode & Ht) !== qe) {
          for (var E = e.selfBaseDuration, _ = e.child; _ !== null; )
            a = mt(a, mt(_.lanes, _.childLanes)), i |= _.subtreeFlags & An, i |= _.flags & An, E += _.treeBaseDuration, _ = _.sibling;
          e.treeBaseDuration = E;
        } else
          for (var T = e.child; T !== null; )
            a = mt(a, mt(T.lanes, T.childLanes)), i |= T.subtreeFlags & An, i |= T.flags & An, T.return = e, T = T.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ht) !== qe) {
          for (var o = e.actualDuration, f = e.selfBaseDuration, h = e.child; h !== null; )
            a = mt(a, mt(h.lanes, h.childLanes)), i |= h.subtreeFlags, i |= h.flags, o += h.actualDuration, f += h.treeBaseDuration, h = h.sibling;
          e.actualDuration = o, e.treeBaseDuration = f;
        } else
          for (var g = e.child; g !== null; )
            a = mt(a, mt(g.lanes, g.childLanes)), i |= g.subtreeFlags, i |= g.flags, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function dk(e, t, a) {
      if (qT() && (t.mode & Ct) !== qe && (t.flags & Qe) === Xe)
        return Nx(t), Bf(), t.flags |= Cr | Ss | Zn, !1;
      var i = xm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (GT(t), Hr(t), (t.mode & Ht) !== qe) {
            var o = a !== null;
            if (o) {
              var f = t.child;
              f !== null && (t.treeBaseDuration -= f.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Bf(), (t.flags & Qe) === Xe && (t.memoizedState = null), t.flags |= Ot, Hr(t), (t.mode & Ht) !== qe) {
            var h = a !== null;
            if (h) {
              var g = t.child;
              g !== null && (t.treeBaseDuration -= g.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return Lx(), !0;
    }
    function nw(e, t, a) {
      var i = t.pendingProps;
      switch (e0(t), t.tag) {
        case O:
        case kt:
        case Ue:
        case k:
        case pe:
        case ge:
        case Se:
        case De:
        case se:
        case Me:
          return Hr(t), null;
        case R: {
          var o = t.type;
          return ql(o) && vm(t), Hr(t), null;
        }
        case L: {
          var f = t.stateNode;
          if (Wf(t), qg(t), b0(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), e === null || e.child === null) {
            var h = xm(t);
            if (h)
              Jf(t);
            else if (e !== null) {
              var g = e.memoizedState;
              // Check if this is a client root
              (!g.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Cr) !== Xe) && (t.flags |= Wn, Lx());
            }
          }
          return kS(e, t), Hr(t), null;
        }
        case V: {
          w0(t);
          var E = Gx(), _ = t.type;
          if (e !== null && t.stateNode != null)
            ew(e, t, _, i, E), e.ref !== t.ref && ZC(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Hr(t), null;
            }
            var T = C0(), H = xm(t);
            if (H)
              WT(t, E, T) && Jf(t);
            else {
              var U = NR(_, i, E, T, t);
              JC(U, t, !1, !1), t.stateNode = U, zR(U, _, i, E) && Jf(t);
            }
            t.ref !== null && ZC(t);
          }
          return Hr(t), null;
        }
        case me: {
          var W = i;
          if (e && t.stateNode != null) {
            var q = e.memoizedProps;
            tw(e, t, q, W);
          } else {
            if (typeof W != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var ee = Gx(), ke = C0(), nt = xm(t);
            nt ? QT(t) && Jf(t) : t.stateNode = UR(W, ee, ke, t);
          }
          return Hr(t), null;
        }
        case xe: {
          Gf(t);
          var We = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var zt = dk(e, t, We);
            if (!zt)
              return t.flags & Zn ? t : null;
          }
          if ((t.flags & Qe) !== Xe)
            return t.lanes = a, (t.mode & Ht) !== qe && Z0(t), t;
          var bt = We !== null, I = e !== null && e.memoizedState !== null;
          if (bt !== I && bt) {
            var te = t.child;
            if (te.flags |= zn, (t.mode & Ct) !== qe) {
              var $ = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              $ || _0(ol.current, Kx) ? pD() : WS();
            }
          }
          var ve = t.updateQueue;
          if (ve !== null && (t.flags |= Ot), Hr(t), (t.mode & Ht) !== qe && bt) {
            var ze = t.child;
            ze !== null && (t.treeBaseDuration -= ze.treeBaseDuration);
          }
          return null;
        }
        case F:
          return Wf(t), kS(e, t), e === null && DT(t.stateNode.containerInfo), Hr(t), null;
        case Pe:
          var Oe = t.type._context;
          return h0(Oe, t), Hr(t), null;
        case Et: {
          var ut = t.type;
          return ql(ut) && vm(t), Hr(t), null;
        }
        case Tt: {
          Gf(t);
          var dt = t.memoizedState;
          if (dt === null)
            return Hr(t), null;
          var tn = (t.flags & Qe) !== Xe, Bt = dt.rendering;
          if (Bt === null)
            if (tn)
              rh(dt, !1);
            else {
              var Xn = vD() && (e === null || (e.flags & Qe) === Xe);
              if (!Xn)
                for (var It = t.child; It !== null; ) {
                  var Vn = Fm(It);
                  if (Vn !== null) {
                    tn = !0, t.flags |= Qe, rh(dt, !1);
                    var ua = Vn.updateQueue;
                    return ua !== null && (t.updateQueue = ua, t.flags |= Ot), t.subtreeFlags = Xe, rb(t, a), Qo(t, R0(ol.current, $p)), t.child;
                  }
                  It = It.sibling;
                }
              dt.tail !== null && Qn() > ww() && (t.flags |= Qe, tn = !0, rh(dt, !1), t.lanes = Xd);
            }
          else {
            if (!tn) {
              var $r = Fm(Bt);
              if ($r !== null) {
                t.flags |= Qe, tn = !0;
                var fi = $r.updateQueue;
                if (fi !== null && (t.updateQueue = fi, t.flags |= Ot), rh(dt, !0), dt.tail === null && dt.tailMode === "hidden" && !Bt.alternate && !Fr())
                  return Hr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Qn() * 2 - dt.renderingStartTime > ww() && a !== Jr && (t.flags |= Qe, tn = !0, rh(dt, !1), t.lanes = Xd);
            }
            if (dt.isBackwards)
              Bt.sibling = t.child, t.child = Bt;
            else {
              var Ca = dt.last;
              Ca !== null ? Ca.sibling = Bt : t.child = Bt, dt.last = Bt;
            }
          }
          if (dt.tail !== null) {
            var wa = dt.tail;
            dt.rendering = wa, dt.tail = wa.sibling, dt.renderingStartTime = Qn(), wa.sibling = null;
            var oa = ol.current;
            return tn ? oa = R0(oa, $p) : oa = Qf(oa), Qo(t, oa), wa;
          }
          return Hr(t), null;
        }
        case _e:
          break;
        case je:
        case P: {
          YS(t);
          var eo = t.memoizedState, ud = eo !== null;
          if (e !== null) {
            var Sh = e.memoizedState, au = Sh !== null;
            au !== ud && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ne && (t.flags |= zn);
          }
          return !ud || (t.mode & Ct) === qe ? Hr(t) : ea(ru, Jr) && (Hr(t), t.subtreeFlags & (yn | Ot) && (t.flags |= zn)), null;
        }
        case de:
          return null;
        case J:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function pk(e, t, a) {
      switch (e0(t), t.tag) {
        case R: {
          var i = t.type;
          ql(i) && vm(t);
          var o = t.flags;
          return o & Zn ? (t.flags = o & ~Zn | Qe, (t.mode & Ht) !== qe && Z0(t), t) : null;
        }
        case L: {
          t.stateNode, Wf(t), qg(t), b0();
          var f = t.flags;
          return (f & Zn) !== Xe && (f & Qe) === Xe ? (t.flags = f & ~Zn | Qe, t) : null;
        }
        case V:
          return w0(t), null;
        case xe: {
          Gf(t);
          var h = t.memoizedState;
          if (h !== null && h.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Bf();
          }
          var g = t.flags;
          return g & Zn ? (t.flags = g & ~Zn | Qe, (t.mode & Ht) !== qe && Z0(t), t) : null;
        }
        case Tt:
          return Gf(t), null;
        case F:
          return Wf(t), null;
        case Pe:
          var E = t.type._context;
          return h0(E, t), null;
        case je:
        case P:
          return YS(t), null;
        case de:
          return null;
        default:
          return null;
      }
    }
    function rw(e, t, a) {
      switch (e0(t), t.tag) {
        case R: {
          var i = t.type.childContextTypes;
          i != null && vm(t);
          break;
        }
        case L: {
          t.stateNode, Wf(t), qg(t), b0();
          break;
        }
        case V: {
          w0(t);
          break;
        }
        case F:
          Wf(t);
          break;
        case xe:
          Gf(t);
          break;
        case Tt:
          Gf(t);
          break;
        case Pe:
          var o = t.type._context;
          h0(o, t);
          break;
        case je:
        case P:
          YS(t);
          break;
      }
    }
    var aw = null;
    aw = /* @__PURE__ */ new Set();
    var uy = !1, Pr = !1, hk = typeof WeakSet == "function" ? WeakSet : Set, Ie = null, ed = null, td = null;
    function vk(e) {
      Nl(null, function() {
        throw e;
      }), gs();
    }
    var mk = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ht)
        try {
          tu(), t.componentWillUnmount();
        } finally {
          eu(e);
        }
      else
        t.componentWillUnmount();
    };
    function iw(e, t) {
      try {
        qo(dr, e);
      } catch (a) {
        dn(e, t, a);
      }
    }
    function DS(e, t, a) {
      try {
        mk(e, a);
      } catch (i) {
        dn(e, t, i);
      }
    }
    function yk(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        dn(e, t, i);
      }
    }
    function lw(e, t) {
      try {
        ow(e);
      } catch (a) {
        dn(e, t, a);
      }
    }
    function nd(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Re && Ke && e.mode & Ht)
              try {
                tu(), i = a(null);
              } finally {
                eu(e);
              }
            else
              i = a(null);
          } catch (o) {
            dn(e, t, o);
          }
          typeof i == "function" && m("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", st(e));
        } else
          a.current = null;
    }
    function oy(e, t, a) {
      try {
        a();
      } catch (i) {
        dn(e, t, i);
      }
    }
    var uw = !1;
    function gk(e, t) {
      MR(e.containerInfo), Ie = t, Sk();
      var a = uw;
      return uw = !1, a;
    }
    function Sk() {
      for (; Ie !== null; ) {
        var e = Ie, t = e.child;
        (e.subtreeFlags & zl) !== Xe && t !== null ? (t.return = e, Ie = t) : Ek();
      }
    }
    function Ek() {
      for (; Ie !== null; ) {
        var e = Ie;
        qt(e);
        try {
          xk(e);
        } catch (a) {
          dn(e, e.return, a);
        }
        fn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ie = t;
          return;
        }
        Ie = e.return;
      }
    }
    function xk(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Wn) !== Xe) {
        switch (qt(e), e.tag) {
          case k:
          case pe:
          case Ue:
            break;
          case R: {
            if (t !== null) {
              var i = t.memoizedProps, o = t.memoizedState, f = e.stateNode;
              e.type === e.elementType && !fc && (f.props !== e.memoizedProps && m("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", st(e) || "instance"), f.state !== e.memoizedState && m("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", st(e) || "instance"));
              var h = f.getSnapshotBeforeUpdate(e.elementType === e.type ? i : cl(e.type, i), o);
              {
                var g = aw;
                h === void 0 && !g.has(e.type) && (g.add(e.type), m("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", st(e)));
              }
              f.__reactInternalSnapshotBeforeUpdate = h;
            }
            break;
          }
          case L: {
            {
              var E = e.stateNode;
              tT(E.containerInfo);
            }
            break;
          }
          case V:
          case me:
          case F:
          case Et:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        fn();
      }
    }
    function dl(e, t, a) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next, h = f;
        do {
          if ((h.tag & e) === e) {
            var g = h.destroy;
            h.destroy = void 0, g !== void 0 && ((e & jr) !== Pa ? Ji(t) : (e & dr) !== Pa && xs(t), (e & Kl) !== Pa && mh(!0), oy(t, a, g), (e & Kl) !== Pa && mh(!1), (e & jr) !== Pa ? jl() : (e & dr) !== Pa && Qd());
          }
          h = h.next;
        } while (h !== f);
      }
    }
    function qo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var o = i.next, f = o;
        do {
          if ((f.tag & e) === e) {
            (e & jr) !== Pa ? Wd(t) : (e & dr) !== Pa && Wc(t);
            var h = f.create;
            (e & Kl) !== Pa && mh(!0), f.destroy = h(), (e & Kl) !== Pa && mh(!1), (e & jr) !== Pa ? pv() : (e & dr) !== Pa && hv();
            {
              var g = f.destroy;
              if (g !== void 0 && typeof g != "function") {
                var E = void 0;
                (f.tag & dr) !== Xe ? E = "useLayoutEffect" : (f.tag & Kl) !== Xe ? E = "useInsertionEffect" : E = "useEffect";
                var _ = void 0;
                g === null ? _ = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof g.then == "function" ? _ = `

It looks like you wrote ` + E + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + E + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : _ = " You returned: " + g, m("%s must not return anything besides a function, which is used for clean-up.%s", E, _);
              }
            }
          }
          f = f.next;
        } while (f !== o);
      }
    }
    function Ck(e, t) {
      if ((t.flags & Ot) !== Xe)
        switch (t.tag) {
          case De: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, o = i.id, f = i.onPostCommit, h = wC(), g = t.alternate === null ? "mount" : "update";
            CC() && (g = "nested-update"), typeof f == "function" && f(o, g, a, h);
            var E = t.return;
            e: for (; E !== null; ) {
              switch (E.tag) {
                case L:
                  var _ = E.stateNode;
                  _.passiveEffectDuration += a;
                  break e;
                case De:
                  var T = E.stateNode;
                  T.passiveEffectDuration += a;
                  break e;
              }
              E = E.return;
            }
            break;
          }
        }
    }
    function wk(e, t, a, i) {
      if ((a.flags & Ul) !== Xe)
        switch (a.tag) {
          case k:
          case pe:
          case Ue: {
            if (!Pr)
              if (a.mode & Ht)
                try {
                  tu(), qo(dr | fr, a);
                } finally {
                  eu(a);
                }
              else
                qo(dr | fr, a);
            break;
          }
          case R: {
            var o = a.stateNode;
            if (a.flags & Ot && !Pr)
              if (t === null)
                if (a.type === a.elementType && !fc && (o.props !== a.memoizedProps && m("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", st(a) || "instance"), o.state !== a.memoizedState && m("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", st(a) || "instance")), a.mode & Ht)
                  try {
                    tu(), o.componentDidMount();
                  } finally {
                    eu(a);
                  }
                else
                  o.componentDidMount();
              else {
                var f = a.elementType === a.type ? t.memoizedProps : cl(a.type, t.memoizedProps), h = t.memoizedState;
                if (a.type === a.elementType && !fc && (o.props !== a.memoizedProps && m("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", st(a) || "instance"), o.state !== a.memoizedState && m("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", st(a) || "instance")), a.mode & Ht)
                  try {
                    tu(), o.componentDidUpdate(f, h, o.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    eu(a);
                  }
                else
                  o.componentDidUpdate(f, h, o.__reactInternalSnapshotBeforeUpdate);
              }
            var g = a.updateQueue;
            g !== null && (a.type === a.elementType && !fc && (o.props !== a.memoizedProps && m("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", st(a) || "instance"), o.state !== a.memoizedState && m("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", st(a) || "instance")), Qx(a, g, o));
            break;
          }
          case L: {
            var E = a.updateQueue;
            if (E !== null) {
              var _ = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case V:
                    _ = a.child.stateNode;
                    break;
                  case R:
                    _ = a.child.stateNode;
                    break;
                }
              Qx(a, E, _);
            }
            break;
          }
          case V: {
            var T = a.stateNode;
            if (t === null && a.flags & Ot) {
              var H = a.type, U = a.memoizedProps;
              VR(T, H, U);
            }
            break;
          }
          case me:
            break;
          case F:
            break;
          case De: {
            {
              var W = a.memoizedProps, q = W.onCommit, ee = W.onRender, ke = a.stateNode.effectDuration, nt = wC(), We = t === null ? "mount" : "update";
              CC() && (We = "nested-update"), typeof ee == "function" && ee(a.memoizedProps.id, We, a.actualDuration, a.treeBaseDuration, a.actualStartTime, nt);
              {
                typeof q == "function" && q(a.memoizedProps.id, We, ke, nt), ED(a);
                var zt = a.return;
                e: for (; zt !== null; ) {
                  switch (zt.tag) {
                    case L:
                      var bt = zt.stateNode;
                      bt.effectDuration += ke;
                      break e;
                    case De:
                      var I = zt.stateNode;
                      I.effectDuration += ke;
                      break e;
                  }
                  zt = zt.return;
                }
              }
            }
            break;
          }
          case xe: {
            Ok(e, a);
            break;
          }
          case Tt:
          case Et:
          case _e:
          case je:
          case P:
          case J:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Pr || a.flags & xn && ow(a);
    }
    function _k(e) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue: {
          if (e.mode & Ht)
            try {
              tu(), iw(e, e.return);
            } finally {
              eu(e);
            }
          else
            iw(e, e.return);
          break;
        }
        case R: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && yk(e, e.return, t), lw(e, e.return);
          break;
        }
        case V: {
          lw(e, e.return);
          break;
        }
      }
    }
    function Rk(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === V) {
          if (a === null) {
            a = i;
            try {
              var o = i.stateNode;
              t ? KR(o) : JR(i.stateNode, i.memoizedProps);
            } catch (h) {
              dn(e, e.return, h);
            }
          }
        } else if (i.tag === me) {
          if (a === null)
            try {
              var f = i.stateNode;
              t ? ZR(f) : eT(f, i.memoizedProps);
            } catch (h) {
              dn(e, e.return, h);
            }
        } else if (!((i.tag === je || i.tag === P) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function ow(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case V:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var o;
          if (e.mode & Ht)
            try {
              tu(), o = t(i);
            } finally {
              eu(e);
            }
          else
            o = t(i);
          typeof o == "function" && m("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", st(e));
        } else
          t.hasOwnProperty("current") || m("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", st(e)), t.current = i;
      }
    }
    function Tk(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function sw(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, sw(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === V) {
          var a = e.stateNode;
          a !== null && NT(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function bk(e) {
      for (var t = e.return; t !== null; ) {
        if (cw(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function cw(e) {
      return e.tag === V || e.tag === L || e.tag === F;
    }
    function fw(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || cw(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== V && t.tag !== me && t.tag !== Mt; ) {
          if (t.flags & yn || t.child === null || t.tag === F)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & yn))
          return t.stateNode;
      }
    }
    function kk(e) {
      var t = bk(e);
      switch (t.tag) {
        case V: {
          var a = t.stateNode;
          t.flags & Ma && (px(a), t.flags &= ~Ma);
          var i = fw(e);
          OS(e, i, a);
          break;
        }
        case L:
        case F: {
          var o = t.stateNode.containerInfo, f = fw(e);
          MS(e, f, o);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function MS(e, t, a) {
      var i = e.tag, o = i === V || i === me;
      if (o) {
        var f = e.stateNode;
        t ? QR(a, f, t) : YR(a, f);
      } else if (i !== F) {
        var h = e.child;
        if (h !== null) {
          MS(h, t, a);
          for (var g = h.sibling; g !== null; )
            MS(g, t, a), g = g.sibling;
        }
      }
    }
    function OS(e, t, a) {
      var i = e.tag, o = i === V || i === me;
      if (o) {
        var f = e.stateNode;
        t ? WR(a, f, t) : $R(a, f);
      } else if (i !== F) {
        var h = e.child;
        if (h !== null) {
          OS(h, t, a);
          for (var g = h.sibling; g !== null; )
            OS(g, t, a), g = g.sibling;
        }
      }
    }
    var Vr = null, pl = !1;
    function Dk(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case V: {
              Vr = i.stateNode, pl = !1;
              break e;
            }
            case L: {
              Vr = i.stateNode.containerInfo, pl = !0;
              break e;
            }
            case F: {
              Vr = i.stateNode.containerInfo, pl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Vr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        dw(e, t, a), Vr = null, pl = !1;
      }
      Tk(a);
    }
    function Ko(e, t, a) {
      for (var i = a.child; i !== null; )
        dw(e, t, i), i = i.sibling;
    }
    function dw(e, t, a) {
      switch (Id(a), a.tag) {
        case V:
          Pr || nd(a, t);
        // eslint-disable-next-line-no-fallthrough
        case me: {
          {
            var i = Vr, o = pl;
            Vr = null, Ko(e, t, a), Vr = i, pl = o, Vr !== null && (pl ? XR(Vr, a.stateNode) : GR(Vr, a.stateNode));
          }
          return;
        }
        case Mt: {
          Vr !== null && (pl ? qR(Vr, a.stateNode) : Bg(Vr, a.stateNode));
          return;
        }
        case F: {
          {
            var f = Vr, h = pl;
            Vr = a.stateNode.containerInfo, pl = !0, Ko(e, t, a), Vr = f, pl = h;
          }
          return;
        }
        case k:
        case pe:
        case Me:
        case Ue: {
          if (!Pr) {
            var g = a.updateQueue;
            if (g !== null) {
              var E = g.lastEffect;
              if (E !== null) {
                var _ = E.next, T = _;
                do {
                  var H = T, U = H.destroy, W = H.tag;
                  U !== void 0 && ((W & Kl) !== Pa ? oy(a, t, U) : (W & dr) !== Pa && (xs(a), a.mode & Ht ? (tu(), oy(a, t, U), eu(a)) : oy(a, t, U), Qd())), T = T.next;
                } while (T !== _);
              }
            }
          }
          Ko(e, t, a);
          return;
        }
        case R: {
          if (!Pr) {
            nd(a, t);
            var q = a.stateNode;
            typeof q.componentWillUnmount == "function" && DS(a, t, q);
          }
          Ko(e, t, a);
          return;
        }
        case _e: {
          Ko(e, t, a);
          return;
        }
        case je: {
          if (
            // TODO: Remove this dead flag
            a.mode & Ct
          ) {
            var ee = Pr;
            Pr = ee || a.memoizedState !== null, Ko(e, t, a), Pr = ee;
          } else
            Ko(e, t, a);
          break;
        }
        default: {
          Ko(e, t, a);
          return;
        }
      }
    }
    function Mk(e) {
      e.memoizedState;
    }
    function Ok(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var o = i.memoizedState;
          if (o !== null) {
            var f = o.dehydrated;
            f !== null && vT(f);
          }
        }
      }
    }
    function pw(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new hk()), t.forEach(function(i) {
          var o = bD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Zr)
              if (ed !== null && td !== null)
                vh(td, ed);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(o, o);
          }
        });
      }
    }
    function Nk(e, t, a) {
      ed = a, td = e, qt(t), hw(t, e), qt(t), ed = null, td = null;
    }
    function hl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var o = 0; o < i.length; o++) {
          var f = i[o];
          try {
            Dk(e, t, f);
          } catch (E) {
            dn(f, t, E);
          }
        }
      var h = Rl();
      if (t.subtreeFlags & Al)
        for (var g = t.child; g !== null; )
          qt(g), hw(g, e), g = g.sibling;
      qt(h);
    }
    function hw(e, t, a) {
      var i = e.alternate, o = e.flags;
      switch (e.tag) {
        case k:
        case pe:
        case Me:
        case Ue: {
          if (hl(t, e), nu(e), o & Ot) {
            try {
              dl(Kl | fr, e, e.return), qo(Kl | fr, e);
            } catch (ut) {
              dn(e, e.return, ut);
            }
            if (e.mode & Ht) {
              try {
                tu(), dl(dr | fr, e, e.return);
              } catch (ut) {
                dn(e, e.return, ut);
              }
              eu(e);
            } else
              try {
                dl(dr | fr, e, e.return);
              } catch (ut) {
                dn(e, e.return, ut);
              }
          }
          return;
        }
        case R: {
          hl(t, e), nu(e), o & xn && i !== null && nd(i, i.return);
          return;
        }
        case V: {
          hl(t, e), nu(e), o & xn && i !== null && nd(i, i.return);
          {
            if (e.flags & Ma) {
              var f = e.stateNode;
              try {
                px(f);
              } catch (ut) {
                dn(e, e.return, ut);
              }
            }
            if (o & Ot) {
              var h = e.stateNode;
              if (h != null) {
                var g = e.memoizedProps, E = i !== null ? i.memoizedProps : g, _ = e.type, T = e.updateQueue;
                if (e.updateQueue = null, T !== null)
                  try {
                    BR(h, T, _, E, g, e);
                  } catch (ut) {
                    dn(e, e.return, ut);
                  }
              }
            }
          }
          return;
        }
        case me: {
          if (hl(t, e), nu(e), o & Ot) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var H = e.stateNode, U = e.memoizedProps, W = i !== null ? i.memoizedProps : U;
            try {
              IR(H, W, U);
            } catch (ut) {
              dn(e, e.return, ut);
            }
          }
          return;
        }
        case L: {
          if (hl(t, e), nu(e), o & Ot && i !== null) {
            var q = i.memoizedState;
            if (q.isDehydrated)
              try {
                hT(t.containerInfo);
              } catch (ut) {
                dn(e, e.return, ut);
              }
          }
          return;
        }
        case F: {
          hl(t, e), nu(e);
          return;
        }
        case xe: {
          hl(t, e), nu(e);
          var ee = e.child;
          if (ee.flags & zn) {
            var ke = ee.stateNode, nt = ee.memoizedState, We = nt !== null;
            if (ke.isHidden = We, We) {
              var zt = ee.alternate !== null && ee.alternate.memoizedState !== null;
              zt || dD();
            }
          }
          if (o & Ot) {
            try {
              Mk(e);
            } catch (ut) {
              dn(e, e.return, ut);
            }
            pw(e);
          }
          return;
        }
        case je: {
          var bt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Ct
          ) {
            var I = Pr;
            Pr = I || bt, hl(t, e), Pr = I;
          } else
            hl(t, e);
          if (nu(e), o & zn) {
            var te = e.stateNode, $ = e.memoizedState, ve = $ !== null, ze = e;
            if (te.isHidden = ve, ve && !bt && (ze.mode & Ct) !== qe) {
              Ie = ze;
              for (var Oe = ze.child; Oe !== null; )
                Ie = Oe, zk(Oe), Oe = Oe.sibling;
            }
            Rk(ze, ve);
          }
          return;
        }
        case Tt: {
          hl(t, e), nu(e), o & Ot && pw(e);
          return;
        }
        case _e:
          return;
        default: {
          hl(t, e), nu(e);
          return;
        }
      }
    }
    function nu(e) {
      var t = e.flags;
      if (t & yn) {
        try {
          kk(e);
        } catch (a) {
          dn(e, e.return, a);
        }
        e.flags &= ~yn;
      }
      t & Xr && (e.flags &= ~Xr);
    }
    function Lk(e, t, a) {
      ed = a, td = t, Ie = e, vw(e, t, a), ed = null, td = null;
    }
    function vw(e, t, a) {
      for (var i = (e.mode & Ct) !== qe; Ie !== null; ) {
        var o = Ie, f = o.child;
        if (o.tag === je && i) {
          var h = o.memoizedState !== null, g = h || uy;
          if (g) {
            NS(e, t, a);
            continue;
          } else {
            var E = o.alternate, _ = E !== null && E.memoizedState !== null, T = _ || Pr, H = uy, U = Pr;
            uy = g, Pr = T, Pr && !U && (Ie = o, Ak(o));
            for (var W = f; W !== null; )
              Ie = W, vw(
                W,
                // New root; bubble back up to here and stop.
                t,
                a
              ), W = W.sibling;
            Ie = o, uy = H, Pr = U, NS(e, t, a);
            continue;
          }
        }
        (o.subtreeFlags & Ul) !== Xe && f !== null ? (f.return = o, Ie = f) : NS(e, t, a);
      }
    }
    function NS(e, t, a) {
      for (; Ie !== null; ) {
        var i = Ie;
        if ((i.flags & Ul) !== Xe) {
          var o = i.alternate;
          qt(i);
          try {
            wk(t, o, i, a);
          } catch (h) {
            dn(i, i.return, h);
          }
          fn();
        }
        if (i === e) {
          Ie = null;
          return;
        }
        var f = i.sibling;
        if (f !== null) {
          f.return = i.return, Ie = f;
          return;
        }
        Ie = i.return;
      }
    }
    function zk(e) {
      for (; Ie !== null; ) {
        var t = Ie, a = t.child;
        switch (t.tag) {
          case k:
          case pe:
          case Me:
          case Ue: {
            if (t.mode & Ht)
              try {
                tu(), dl(dr, t, t.return);
              } finally {
                eu(t);
              }
            else
              dl(dr, t, t.return);
            break;
          }
          case R: {
            nd(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && DS(t, t.return, i);
            break;
          }
          case V: {
            nd(t, t.return);
            break;
          }
          case je: {
            var o = t.memoizedState !== null;
            if (o) {
              mw(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ie = a) : mw(e);
      }
    }
    function mw(e) {
      for (; Ie !== null; ) {
        var t = Ie;
        if (t === e) {
          Ie = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ie = a;
          return;
        }
        Ie = t.return;
      }
    }
    function Ak(e) {
      for (; Ie !== null; ) {
        var t = Ie, a = t.child;
        if (t.tag === je) {
          var i = t.memoizedState !== null;
          if (i) {
            yw(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ie = a) : yw(e);
      }
    }
    function yw(e) {
      for (; Ie !== null; ) {
        var t = Ie;
        qt(t);
        try {
          _k(t);
        } catch (i) {
          dn(t, t.return, i);
        }
        if (fn(), t === e) {
          Ie = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ie = a;
          return;
        }
        Ie = t.return;
      }
    }
    function Uk(e, t, a, i) {
      Ie = t, Fk(t, e, a, i);
    }
    function Fk(e, t, a, i) {
      for (; Ie !== null; ) {
        var o = Ie, f = o.child;
        (o.subtreeFlags & Ki) !== Xe && f !== null ? (f.return = o, Ie = f) : jk(e, t, a, i);
      }
    }
    function jk(e, t, a, i) {
      for (; Ie !== null; ) {
        var o = Ie;
        if ((o.flags & Gr) !== Xe) {
          qt(o);
          try {
            Hk(t, o, a, i);
          } catch (h) {
            dn(o, o.return, h);
          }
          fn();
        }
        if (o === e) {
          Ie = null;
          return;
        }
        var f = o.sibling;
        if (f !== null) {
          f.return = o.return, Ie = f;
          return;
        }
        Ie = o.return;
      }
    }
    function Hk(e, t, a, i) {
      switch (t.tag) {
        case k:
        case pe:
        case Ue: {
          if (t.mode & Ht) {
            K0();
            try {
              qo(jr | fr, t);
            } finally {
              q0(t);
            }
          } else
            qo(jr | fr, t);
          break;
        }
      }
    }
    function Pk(e) {
      Ie = e, Vk();
    }
    function Vk() {
      for (; Ie !== null; ) {
        var e = Ie, t = e.child;
        if ((Ie.flags & Da) !== Xe) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var o = a[i];
              Ie = o, $k(o, e);
            }
            {
              var f = e.alternate;
              if (f !== null) {
                var h = f.child;
                if (h !== null) {
                  f.child = null;
                  do {
                    var g = h.sibling;
                    h.sibling = null, h = g;
                  } while (h !== null);
                }
              }
            }
            Ie = e;
          }
        }
        (e.subtreeFlags & Ki) !== Xe && t !== null ? (t.return = e, Ie = t) : Bk();
      }
    }
    function Bk() {
      for (; Ie !== null; ) {
        var e = Ie;
        (e.flags & Gr) !== Xe && (qt(e), Ik(e), fn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ie = t;
          return;
        }
        Ie = e.return;
      }
    }
    function Ik(e) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue: {
          e.mode & Ht ? (K0(), dl(jr | fr, e, e.return), q0(e)) : dl(jr | fr, e, e.return);
          break;
        }
      }
    }
    function $k(e, t) {
      for (; Ie !== null; ) {
        var a = Ie;
        qt(a), Wk(a, t), fn();
        var i = a.child;
        i !== null ? (i.return = a, Ie = i) : Yk(e);
      }
    }
    function Yk(e) {
      for (; Ie !== null; ) {
        var t = Ie, a = t.sibling, i = t.return;
        if (sw(t), t === e) {
          Ie = null;
          return;
        }
        if (a !== null) {
          a.return = i, Ie = a;
          return;
        }
        Ie = i;
      }
    }
    function Wk(e, t) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue: {
          e.mode & Ht ? (K0(), dl(jr, e, t), q0(e)) : dl(jr, e, t);
          break;
        }
      }
    }
    function Qk(e) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue: {
          try {
            qo(dr | fr, e);
          } catch (a) {
            dn(e, e.return, a);
          }
          break;
        }
        case R: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            dn(e, e.return, a);
          }
          break;
        }
      }
    }
    function Gk(e) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue: {
          try {
            qo(jr | fr, e);
          } catch (t) {
            dn(e, e.return, t);
          }
          break;
        }
      }
    }
    function Xk(e) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue: {
          try {
            dl(dr | fr, e, e.return);
          } catch (a) {
            dn(e, e.return, a);
          }
          break;
        }
        case R: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && DS(e, e.return, t);
          break;
        }
      }
    }
    function qk(e) {
      switch (e.tag) {
        case k:
        case pe:
        case Ue:
          try {
            dl(jr | fr, e, e.return);
          } catch (t) {
            dn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var ah = Symbol.for;
      ah("selector.component"), ah("selector.has_pseudo_class"), ah("selector.role"), ah("selector.test_id"), ah("selector.text");
    }
    var Kk = [];
    function Zk() {
      Kk.forEach(function(e) {
        return e();
      });
    }
    var Jk = d.ReactCurrentActQueue;
    function eD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function gw() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Jk.current !== null && m("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var tD = Math.ceil, LS = d.ReactCurrentDispatcher, zS = d.ReactCurrentOwner, Br = d.ReactCurrentBatchConfig, vl = d.ReactCurrentActQueue, vr = (
      /*             */
      0
    ), Sw = (
      /*               */
      1
    ), Ir = (
      /*                */
      2
    ), Pi = (
      /*                */
      4
    ), qu = 0, ih = 1, dc = 2, sy = 3, lh = 4, Ew = 5, AS = 6, Lt = vr, Ea = null, Mn = null, mr = le, ru = le, US = Vo(le), yr = qu, uh = null, cy = le, oh = le, fy = le, sh = null, Va = null, FS = 0, xw = 500, Cw = 1 / 0, nD = 500, Ku = null;
    function ch() {
      Cw = Qn() + nD;
    }
    function ww() {
      return Cw;
    }
    var dy = !1, jS = null, rd = null, pc = !1, Zo = null, fh = le, HS = [], PS = null, rD = 50, dh = 0, VS = null, BS = !1, py = !1, aD = 50, ad = 0, hy = null, ph = nn, vy = le, _w = !1;
    function my() {
      return Ea;
    }
    function xa() {
      return (Lt & (Ir | Pi)) !== vr ? Qn() : (ph !== nn || (ph = Qn()), ph);
    }
    function Jo(e) {
      var t = e.mode;
      if ((t & Ct) === qe)
        return lt;
      if ((Lt & Ir) !== vr && mr !== le)
        return zs(mr);
      var a = JT() !== ZT;
      if (a) {
        if (Br.transition !== null) {
          var i = Br.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return vy === Ft && (vy = tp()), vy;
      }
      var o = Ua();
      if (o !== Ft)
        return o;
      var f = FR();
      return f;
    }
    function iD(e) {
      var t = e.mode;
      return (t & Ct) === qe ? lt : Ev();
    }
    function gr(e, t, a, i) {
      DD(), _w && m("useInsertionEffect must not schedule updates."), BS && (py = !0), Mo(e, a, i), (Lt & Ir) !== le && e === Ea ? ND(t) : (Zr && Fs(e, t, a), LD(t), e === Ea && ((Lt & Ir) === vr && (oh = mt(oh, a)), yr === lh && es(e, mr)), Ba(e, i), a === lt && Lt === vr && (t.mode & Ct) === qe && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !vl.isBatchingLegacy && (ch(), _x()));
    }
    function lD(e, t, a) {
      var i = e.current;
      i.lanes = t, Mo(e, t, a), Ba(e, a);
    }
    function uD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Lt & Ir) !== vr
      );
    }
    function Ba(e, t) {
      var a = e.callbackNode;
      pf(e, t);
      var i = df(e, e === Ea ? mr : le);
      if (i === le) {
        a !== null && Pw(a), e.callbackNode = null, e.callbackPriority = Ft;
        return;
      }
      var o = Vl(i), f = e.callbackPriority;
      if (f === o && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(vl.current !== null && a !== XS)) {
        a == null && f !== lt && m("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && Pw(a);
      var h;
      if (o === lt)
        e.tag === Bo ? (vl.isBatchingLegacy !== null && (vl.didScheduleLegacyUpdate = !0), AT(bw.bind(null, e))) : wx(bw.bind(null, e)), vl.current !== null ? vl.current.push(Io) : HR(function() {
          (Lt & (Ir | Pi)) === vr && Io();
        }), h = null;
      else {
        var g;
        switch (bv(i)) {
          case Nr:
            g = Es;
            break;
          case Mi:
            g = Fl;
            break;
          case za:
            g = Zi;
            break;
          case Aa:
            g = _u;
            break;
          default:
            g = Zi;
            break;
        }
        h = qS(g, Rw.bind(null, e));
      }
      e.callbackPriority = o, e.callbackNode = h;
    }
    function Rw(e, t) {
      if (Rb(), ph = nn, vy = le, (Lt & (Ir | Pi)) !== vr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Ju();
      if (i && e.callbackNode !== a)
        return null;
      var o = df(e, e === Ea ? mr : le);
      if (o === le)
        return null;
      var f = !vf(e, o) && !Sv(e, o) && !t, h = f ? yD(e, o) : gy(e, o);
      if (h !== qu) {
        if (h === dc) {
          var g = hf(e);
          g !== le && (o = g, h = IS(e, g));
        }
        if (h === ih) {
          var E = uh;
          throw hc(e, le), es(e, o), Ba(e, Qn()), E;
        }
        if (h === AS)
          es(e, o);
        else {
          var _ = !vf(e, o), T = e.current.alternate;
          if (_ && !sD(T)) {
            if (h = gy(e, o), h === dc) {
              var H = hf(e);
              H !== le && (o = H, h = IS(e, H));
            }
            if (h === ih) {
              var U = uh;
              throw hc(e, le), es(e, o), Ba(e, Qn()), U;
            }
          }
          e.finishedWork = T, e.finishedLanes = o, oD(e, h, o);
        }
      }
      return Ba(e, Qn()), e.callbackNode === a ? Rw.bind(null, e) : null;
    }
    function IS(e, t) {
      var a = sh;
      if (gf(e)) {
        var i = hc(e, t);
        i.flags |= Cr, kT(e.containerInfo);
      }
      var o = gy(e, t);
      if (o !== dc) {
        var f = Va;
        Va = a, f !== null && Tw(f);
      }
      return o;
    }
    function Tw(e) {
      Va === null ? Va = e : Va.push.apply(Va, e);
    }
    function oD(e, t, a) {
      switch (t) {
        case qu:
        case ih:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case dc: {
          vc(e, Va, Ku);
          break;
        }
        case sy: {
          if (es(e, a), Au(a) && // do not delay if we're inside an act() scope
          !Vw()) {
            var i = FS + xw - Qn();
            if (i > 10) {
              var o = df(e, le);
              if (o !== le)
                break;
              var f = e.suspendedLanes;
              if (!Uu(f, a)) {
                xa(), mf(e, f);
                break;
              }
              e.timeoutHandle = Pg(vc.bind(null, e, Va, Ku), i);
              break;
            }
          }
          vc(e, Va, Ku);
          break;
        }
        case lh: {
          if (es(e, a), Jd(a))
            break;
          if (!Vw()) {
            var h = li(e, a), g = h, E = Qn() - g, _ = kD(E) - E;
            if (_ > 10) {
              e.timeoutHandle = Pg(vc.bind(null, e, Va, Ku), _);
              break;
            }
          }
          vc(e, Va, Ku);
          break;
        }
        case Ew: {
          vc(e, Va, Ku);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function sD(e) {
      for (var t = e; ; ) {
        if (t.flags & Ro) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var o = 0; o < i.length; o++) {
                var f = i[o], h = f.getSnapshot, g = f.value;
                try {
                  if (!fe(h(), g))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var E = t.child;
        if (t.subtreeFlags & Ro && E !== null) {
          E.return = t, t = E;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function es(e, t) {
      t = As(t, fy), t = As(t, oh), wv(e, t);
    }
    function bw(e) {
      if (Tb(), (Lt & (Ir | Pi)) !== vr)
        throw new Error("Should not already be working.");
      Ju();
      var t = df(e, le);
      if (!ea(t, lt))
        return Ba(e, Qn()), null;
      var a = gy(e, t);
      if (e.tag !== Bo && a === dc) {
        var i = hf(e);
        i !== le && (t = i, a = IS(e, i));
      }
      if (a === ih) {
        var o = uh;
        throw hc(e, le), es(e, t), Ba(e, Qn()), o;
      }
      if (a === AS)
        throw new Error("Root did not complete. This is a bug in React.");
      var f = e.current.alternate;
      return e.finishedWork = f, e.finishedLanes = t, vc(e, Va, Ku), Ba(e, Qn()), null;
    }
    function cD(e, t) {
      t !== le && (yf(e, mt(t, lt)), Ba(e, Qn()), (Lt & (Ir | Pi)) === vr && (ch(), Io()));
    }
    function $S(e, t) {
      var a = Lt;
      Lt |= Sw;
      try {
        return e(t);
      } finally {
        Lt = a, Lt === vr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !vl.isBatchingLegacy && (ch(), _x());
      }
    }
    function fD(e, t, a, i, o) {
      var f = Ua(), h = Br.transition;
      try {
        return Br.transition = null, jn(Nr), e(t, a, i, o);
      } finally {
        jn(f), Br.transition = h, Lt === vr && ch();
      }
    }
    function Zu(e) {
      Zo !== null && Zo.tag === Bo && (Lt & (Ir | Pi)) === vr && Ju();
      var t = Lt;
      Lt |= Sw;
      var a = Br.transition, i = Ua();
      try {
        return Br.transition = null, jn(Nr), e ? e() : void 0;
      } finally {
        jn(i), Br.transition = a, Lt = t, (Lt & (Ir | Pi)) === vr && Io();
      }
    }
    function kw() {
      return (Lt & (Ir | Pi)) !== vr;
    }
    function yy(e, t) {
      ia(US, ru, e), ru = mt(ru, t);
    }
    function YS(e) {
      ru = US.current, aa(US, e);
    }
    function hc(e, t) {
      e.finishedWork = null, e.finishedLanes = le;
      var a = e.timeoutHandle;
      if (a !== Vg && (e.timeoutHandle = Vg, jR(a)), Mn !== null)
        for (var i = Mn.return; i !== null; ) {
          var o = i.alternate;
          rw(o, i), i = i.return;
        }
      Ea = e;
      var f = mc(e.current, null);
      return Mn = f, mr = ru = t, yr = qu, uh = null, cy = le, oh = le, fy = le, sh = null, Va = null, lb(), ul.discardPendingWarnings(), f;
    }
    function Dw(e, t) {
      do {
        var a = Mn;
        try {
          if (bm(), Jx(), fn(), zS.current = null, a === null || a.return === null) {
            yr = ih, uh = t, Mn = null;
            return;
          }
          if (Re && a.mode & Ht && ny(a, !0), He)
            if (ma(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Di(a, i, mr);
            } else
              Cs(a, t, mr);
          Ab(e, a.return, a, t, mr), Lw(a);
        } catch (o) {
          t = o, Mn === a && a !== null ? (a = a.return, Mn = a) : a = Mn;
          continue;
        }
        return;
      } while (!0);
    }
    function Mw() {
      var e = LS.current;
      return LS.current = Km, e === null ? Km : e;
    }
    function Ow(e) {
      LS.current = e;
    }
    function dD() {
      FS = Qn();
    }
    function hh(e) {
      cy = mt(e, cy);
    }
    function pD() {
      yr === qu && (yr = sy);
    }
    function WS() {
      (yr === qu || yr === sy || yr === dc) && (yr = lh), Ea !== null && (Ls(cy) || Ls(oh)) && es(Ea, mr);
    }
    function hD(e) {
      yr !== lh && (yr = dc), sh === null ? sh = [e] : sh.push(e);
    }
    function vD() {
      return yr === qu;
    }
    function gy(e, t) {
      var a = Lt;
      Lt |= Ir;
      var i = Mw();
      if (Ea !== e || mr !== t) {
        if (Zr) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (vh(e, mr), o.clear()), _v(e, t);
        }
        Ku = ip(), hc(e, t);
      }
      ku(t);
      do
        try {
          mD();
          break;
        } catch (f) {
          Dw(e, f);
        }
      while (!0);
      if (bm(), Lt = a, Ow(i), Mn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Qc(), Ea = null, mr = le, yr;
    }
    function mD() {
      for (; Mn !== null; )
        Nw(Mn);
    }
    function yD(e, t) {
      var a = Lt;
      Lt |= Ir;
      var i = Mw();
      if (Ea !== e || mr !== t) {
        if (Zr) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (vh(e, mr), o.clear()), _v(e, t);
        }
        Ku = ip(), ch(), hc(e, t);
      }
      ku(t);
      do
        try {
          gD();
          break;
        } catch (f) {
          Dw(e, f);
        }
      while (!0);
      return bm(), Ow(i), Lt = a, Mn !== null ? (vv(), qu) : (Qc(), Ea = null, mr = le, yr);
    }
    function gD() {
      for (; Mn !== null && !jd(); )
        Nw(Mn);
    }
    function Nw(e) {
      var t = e.alternate;
      qt(e);
      var a;
      (e.mode & Ht) !== qe ? (X0(e), a = QS(t, e, ru), ny(e, !0)) : a = QS(t, e, ru), fn(), e.memoizedProps = e.pendingProps, a === null ? Lw(e) : Mn = a, zS.current = null;
    }
    function Lw(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Ss) === Xe) {
          qt(t);
          var o = void 0;
          if ((t.mode & Ht) === qe ? o = nw(a, t, ru) : (X0(t), o = nw(a, t, ru), ny(t, !1)), fn(), o !== null) {
            Mn = o;
            return;
          }
        } else {
          var f = pk(a, t);
          if (f !== null) {
            f.flags &= sv, Mn = f;
            return;
          }
          if ((t.mode & Ht) !== qe) {
            ny(t, !1);
            for (var h = t.actualDuration, g = t.child; g !== null; )
              h += g.actualDuration, g = g.sibling;
            t.actualDuration = h;
          }
          if (i !== null)
            i.flags |= Ss, i.subtreeFlags = Xe, i.deletions = null;
          else {
            yr = AS, Mn = null;
            return;
          }
        }
        var E = t.sibling;
        if (E !== null) {
          Mn = E;
          return;
        }
        t = i, Mn = t;
      } while (t !== null);
      yr === qu && (yr = Ew);
    }
    function vc(e, t, a) {
      var i = Ua(), o = Br.transition;
      try {
        Br.transition = null, jn(Nr), SD(e, t, a, i);
      } finally {
        Br.transition = o, jn(i);
      }
      return null;
    }
    function SD(e, t, a, i) {
      do
        Ju();
      while (Zo !== null);
      if (MD(), (Lt & (Ir | Pi)) !== vr)
        throw new Error("Should not already be working.");
      var o = e.finishedWork, f = e.finishedLanes;
      if ($d(f), o === null)
        return Yd(), null;
      if (f === le && m("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = le, o === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Ft;
      var h = mt(o.lanes, o.childLanes);
      rp(e, h), e === Ea && (Ea = null, Mn = null, mr = le), ((o.subtreeFlags & Ki) !== Xe || (o.flags & Ki) !== Xe) && (pc || (pc = !0, PS = a, qS(Zi, function() {
        return Ju(), null;
      })));
      var g = (o.subtreeFlags & (zl | Al | Ul | Ki)) !== Xe, E = (o.flags & (zl | Al | Ul | Ki)) !== Xe;
      if (g || E) {
        var _ = Br.transition;
        Br.transition = null;
        var T = Ua();
        jn(Nr);
        var H = Lt;
        Lt |= Pi, zS.current = null, gk(e, o), _C(), Nk(e, o, f), OR(e.containerInfo), e.current = o, ws(f), Lk(o, e, f), _s(), Hd(), Lt = H, jn(T), Br.transition = _;
      } else
        e.current = o, _C();
      var U = pc;
      if (pc ? (pc = !1, Zo = e, fh = f) : (ad = 0, hy = null), h = e.pendingLanes, h === le && (rd = null), U || Fw(e.current, !1), Vd(o.stateNode, i), Zr && e.memoizedUpdaters.clear(), Zk(), Ba(e, Qn()), t !== null)
        for (var W = e.onRecoverableError, q = 0; q < t.length; q++) {
          var ee = t[q], ke = ee.stack, nt = ee.digest;
          W(ee.value, {
            componentStack: ke,
            digest: nt
          });
        }
      if (dy) {
        dy = !1;
        var We = jS;
        throw jS = null, We;
      }
      return ea(fh, lt) && e.tag !== Bo && Ju(), h = e.pendingLanes, ea(h, lt) ? (_b(), e === VS ? dh++ : (dh = 0, VS = e)) : dh = 0, Io(), Yd(), null;
    }
    function Ju() {
      if (Zo !== null) {
        var e = bv(fh), t = Hs(za, e), a = Br.transition, i = Ua();
        try {
          return Br.transition = null, jn(t), xD();
        } finally {
          jn(i), Br.transition = a;
        }
      }
      return !1;
    }
    function ED(e) {
      HS.push(e), pc || (pc = !0, qS(Zi, function() {
        return Ju(), null;
      }));
    }
    function xD() {
      if (Zo === null)
        return !1;
      var e = PS;
      PS = null;
      var t = Zo, a = fh;
      if (Zo = null, fh = le, (Lt & (Ir | Pi)) !== vr)
        throw new Error("Cannot flush passive effects while already rendering.");
      BS = !0, py = !1, bu(a);
      var i = Lt;
      Lt |= Pi, Pk(t.current), Uk(t, t.current, a, e);
      {
        var o = HS;
        HS = [];
        for (var f = 0; f < o.length; f++) {
          var h = o[f];
          Ck(t, h);
        }
      }
      Gd(), Fw(t.current, !0), Lt = i, Io(), py ? t === hy ? ad++ : (ad = 0, hy = t) : ad = 0, BS = !1, py = !1, Bd(t);
      {
        var g = t.current.stateNode;
        g.effectDuration = 0, g.passiveEffectDuration = 0;
      }
      return !0;
    }
    function zw(e) {
      return rd !== null && rd.has(e);
    }
    function CD(e) {
      rd === null ? rd = /* @__PURE__ */ new Set([e]) : rd.add(e);
    }
    function wD(e) {
      dy || (dy = !0, jS = e);
    }
    var _D = wD;
    function Aw(e, t, a) {
      var i = cc(a, t), o = NC(e, i, lt), f = Yo(e, o, lt), h = xa();
      f !== null && (Mo(f, lt, h), Ba(f, h));
    }
    function dn(e, t, a) {
      if (vk(a), mh(!1), e.tag === L) {
        Aw(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === L) {
          Aw(i, e, a);
          return;
        } else if (i.tag === R) {
          var o = i.type, f = i.stateNode;
          if (typeof o.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && !zw(f)) {
            var h = cc(a, e), g = pS(i, h, lt), E = Yo(i, g, lt), _ = xa();
            E !== null && (Mo(E, lt, _), Ba(E, _));
            return;
          }
        }
        i = i.return;
      }
      m(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function RD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var o = xa();
      mf(e, a), zD(e), Ea === e && Uu(mr, a) && (yr === lh || yr === sy && Au(mr) && Qn() - FS < xw ? hc(e, le) : fy = mt(fy, a)), Ba(e, o);
    }
    function Uw(e, t) {
      t === Ft && (t = iD(e));
      var a = xa(), i = Ha(e, t);
      i !== null && (Mo(i, t, a), Ba(i, a));
    }
    function TD(e) {
      var t = e.memoizedState, a = Ft;
      t !== null && (a = t.retryLane), Uw(e, a);
    }
    function bD(e, t) {
      var a = Ft, i;
      switch (e.tag) {
        case xe:
          i = e.stateNode;
          var o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case Tt:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), Uw(e, a);
    }
    function kD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : tD(e / 1960) * 1960;
    }
    function DD() {
      if (dh > rD)
        throw dh = 0, VS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      ad > aD && (ad = 0, hy = null, m("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function MD() {
      ul.flushLegacyContextWarning(), ul.flushPendingUnsafeLifecycleWarnings();
    }
    function Fw(e, t) {
      qt(e), Sy(e, Ll, Xk), t && Sy(e, Ti, qk), Sy(e, Ll, Qk), t && Sy(e, Ti, Gk), fn();
    }
    function Sy(e, t, a) {
      for (var i = e, o = null; i !== null; ) {
        var f = i.subtreeFlags & t;
        i !== o && i.child !== null && f !== Xe ? i = i.child : ((i.flags & t) !== Xe && a(i), i.sibling !== null ? i = i.sibling : i = o = i.return);
      }
    }
    var Ey = null;
    function jw(e) {
      {
        if ((Lt & Ir) !== vr || !(e.mode & Ct))
          return;
        var t = e.tag;
        if (t !== O && t !== L && t !== R && t !== k && t !== pe && t !== Me && t !== Ue)
          return;
        var a = st(e) || "ReactComponent";
        if (Ey !== null) {
          if (Ey.has(a))
            return;
          Ey.add(a);
        } else
          Ey = /* @__PURE__ */ new Set([a]);
        var i = lr;
        try {
          qt(e), m("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? qt(e) : fn();
        }
      }
    }
    var QS;
    {
      var OD = null;
      QS = function(e, t, a) {
        var i = Ww(OD, t);
        try {
          return KC(e, t, a);
        } catch (f) {
          if (IT() || f !== null && typeof f == "object" && typeof f.then == "function")
            throw f;
          if (bm(), Jx(), rw(e, t), Ww(t, i), t.mode & Ht && X0(t), Nl(null, KC, null, e, t, a), Xi()) {
            var o = gs();
            typeof o == "object" && o !== null && o._suppressLogging && typeof f == "object" && f !== null && !f._suppressLogging && (f._suppressLogging = !0);
          }
          throw f;
        }
      };
    }
    var Hw = !1, GS;
    GS = /* @__PURE__ */ new Set();
    function ND(e) {
      if (Si && !xb())
        switch (e.tag) {
          case k:
          case pe:
          case Ue: {
            var t = Mn && st(Mn) || "Unknown", a = t;
            if (!GS.has(a)) {
              GS.add(a);
              var i = st(e) || "Unknown";
              m("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case R: {
            Hw || (m("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Hw = !0);
            break;
          }
        }
    }
    function vh(e, t) {
      if (Zr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Fs(e, i, t);
        });
      }
    }
    var XS = {};
    function qS(e, t) {
      {
        var a = vl.current;
        return a !== null ? (a.push(t), XS) : Fd(e, t);
      }
    }
    function Pw(e) {
      if (e !== XS)
        return fv(e);
    }
    function Vw() {
      return vl.current !== null;
    }
    function LD(e) {
      {
        if (e.mode & Ct) {
          if (!gw())
            return;
        } else if (!eD() || Lt !== vr || e.tag !== k && e.tag !== pe && e.tag !== Ue)
          return;
        if (vl.current === null) {
          var t = lr;
          try {
            qt(e), m(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, st(e));
          } finally {
            t ? qt(e) : fn();
          }
        }
      }
    }
    function zD(e) {
      e.tag !== Bo && gw() && vl.current === null && m(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function mh(e) {
      _w = e;
    }
    var Vi = null, id = null, AD = function(e) {
      Vi = e;
    };
    function ld(e) {
      {
        if (Vi === null)
          return e;
        var t = Vi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function KS(e) {
      return ld(e);
    }
    function ZS(e) {
      {
        if (Vi === null)
          return e;
        var t = Vi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = ld(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: ie,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function Bw(e, t) {
      {
        if (Vi === null)
          return !1;
        var a = e.elementType, i = t.type, o = !1, f = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case R: {
            typeof i == "function" && (o = !0);
            break;
          }
          case k: {
            (typeof i == "function" || f === ct) && (o = !0);
            break;
          }
          case pe: {
            (f === ie || f === ct) && (o = !0);
            break;
          }
          case Me:
          case Ue: {
            (f === ht || f === ct) && (o = !0);
            break;
          }
          default:
            return !1;
        }
        if (o) {
          var h = Vi(a);
          if (h !== void 0 && h === Vi(i))
            return !0;
        }
        return !1;
      }
    }
    function Iw(e) {
      {
        if (Vi === null || typeof WeakSet != "function")
          return;
        id === null && (id = /* @__PURE__ */ new WeakSet()), id.add(e);
      }
    }
    var UD = function(e, t) {
      {
        if (Vi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Ju(), Zu(function() {
          JS(e.current, i, a);
        });
      }
    }, FD = function(e, t) {
      {
        if (e.context !== si)
          return;
        Ju(), Zu(function() {
          yh(t, e, null, null);
        });
      }
    };
    function JS(e, t, a) {
      {
        var i = e.alternate, o = e.child, f = e.sibling, h = e.tag, g = e.type, E = null;
        switch (h) {
          case k:
          case Ue:
          case R:
            E = g;
            break;
          case pe:
            E = g.render;
            break;
        }
        if (Vi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var _ = !1, T = !1;
        if (E !== null) {
          var H = Vi(E);
          H !== void 0 && (a.has(H) ? T = !0 : t.has(H) && (h === R ? T = !0 : _ = !0));
        }
        if (id !== null && (id.has(e) || i !== null && id.has(i)) && (T = !0), T && (e._debugNeedsRemount = !0), T || _) {
          var U = Ha(e, lt);
          U !== null && gr(U, e, lt, nn);
        }
        o !== null && !T && JS(o, t, a), f !== null && JS(f, t, a);
      }
    }
    var jD = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(o) {
          return o.current;
        }));
        return eE(e.current, i, a), a;
      }
    };
    function eE(e, t, a) {
      {
        var i = e.child, o = e.sibling, f = e.tag, h = e.type, g = null;
        switch (f) {
          case k:
          case Ue:
          case R:
            g = h;
            break;
          case pe:
            g = h.render;
            break;
        }
        var E = !1;
        g !== null && t.has(g) && (E = !0), E ? HD(e, a) : i !== null && eE(i, t, a), o !== null && eE(o, t, a);
      }
    }
    function HD(e, t) {
      {
        var a = PD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case V:
              t.add(i.stateNode);
              return;
            case F:
              t.add(i.stateNode.containerInfo);
              return;
            case L:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function PD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === V)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var tE;
    {
      tE = !1;
      try {
        var $w = Object.preventExtensions({});
      } catch {
        tE = !0;
      }
    }
    function VD(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Xe, this.subtreeFlags = Xe, this.deletions = null, this.lanes = le, this.childLanes = le, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !tE && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ci = function(e, t, a, i) {
      return new VD(e, t, a, i);
    };
    function nE(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function BD(e) {
      return typeof e == "function" && !nE(e) && e.defaultProps === void 0;
    }
    function ID(e) {
      if (typeof e == "function")
        return nE(e) ? R : k;
      if (e != null) {
        var t = e.$$typeof;
        if (t === ie)
          return pe;
        if (t === ht)
          return Me;
      }
      return O;
    }
    function mc(e, t) {
      var a = e.alternate;
      a === null ? (a = ci(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Xe, a.subtreeFlags = Xe, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & An, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case O:
        case k:
        case Ue:
          a.type = ld(e.type);
          break;
        case R:
          a.type = KS(e.type);
          break;
        case pe:
          a.type = ZS(e.type);
          break;
      }
      return a;
    }
    function $D(e, t) {
      e.flags &= An | yn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = le, e.lanes = t, e.child = null, e.subtreeFlags = Xe, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Xe, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function YD(e, t, a) {
      var i;
      return e === ym ? (i = Ct, t === !0 && (i |= Jt, i |= Pt)) : i = qe, Zr && (i |= Ht), ci(L, null, null, i);
    }
    function rE(e, t, a, i, o, f) {
      var h = O, g = e;
      if (typeof e == "function")
        nE(e) ? (h = R, g = KS(g)) : g = ld(g);
      else if (typeof e == "string")
        h = V;
      else
        e: switch (e) {
          case vi:
            return ts(a.children, o, f, t);
          case Xa:
            h = Se, o |= Jt, (o & Ct) !== qe && (o |= Pt);
            break;
          case mi:
            return WD(a, o, f, t);
          case Te:
            return QD(a, o, f, t);
          case Fe:
            return GD(a, o, f, t);
          case _n:
            return Yw(a, o, f, t);
          case ln:
          // eslint-disable-next-line no-fallthrough
          case wt:
          // eslint-disable-next-line no-fallthrough
          case cn:
          // eslint-disable-next-line no-fallthrough
          case ir:
          // eslint-disable-next-line no-fallthrough
          case xt:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case yi:
                  h = Pe;
                  break e;
                case N:
                  h = se;
                  break e;
                case ie:
                  h = pe, g = ZS(g);
                  break e;
                case ht:
                  h = Me;
                  break e;
                case ct:
                  h = kt, g = null;
                  break e;
              }
            var E = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (E += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var _ = i ? st(i) : null;
              _ && (E += `

Check the render method of \`` + _ + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + E));
          }
        }
      var T = ci(h, a, t, o);
      return T.elementType = e, T.type = g, T.lanes = f, T._debugOwner = i, T;
    }
    function aE(e, t, a) {
      var i = null;
      i = e._owner;
      var o = e.type, f = e.key, h = e.props, g = rE(o, f, h, i, t, a);
      return g._debugSource = e._source, g._debugOwner = e._owner, g;
    }
    function ts(e, t, a, i) {
      var o = ci(ge, e, i, t);
      return o.lanes = a, o;
    }
    function WD(e, t, a, i) {
      typeof e.id != "string" && m('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var o = ci(De, e, i, t | Ht);
      return o.elementType = mi, o.lanes = a, o.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, o;
    }
    function QD(e, t, a, i) {
      var o = ci(xe, e, i, t);
      return o.elementType = Te, o.lanes = a, o;
    }
    function GD(e, t, a, i) {
      var o = ci(Tt, e, i, t);
      return o.elementType = Fe, o.lanes = a, o;
    }
    function Yw(e, t, a, i) {
      var o = ci(je, e, i, t);
      o.elementType = _n, o.lanes = a;
      var f = {
        isHidden: !1
      };
      return o.stateNode = f, o;
    }
    function iE(e, t, a) {
      var i = ci(me, e, null, t);
      return i.lanes = a, i;
    }
    function XD() {
      var e = ci(V, null, null, qe);
      return e.elementType = "DELETED", e;
    }
    function qD(e) {
      var t = ci(Mt, null, null, qe);
      return t.stateNode = e, t;
    }
    function lE(e, t, a) {
      var i = e.children !== null ? e.children : [], o = ci(F, i, e.key, t);
      return o.lanes = a, o.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, o;
    }
    function Ww(e, t) {
      return e === null && (e = ci(O, null, null, qe)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function KD(e, t, a, i, o) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Vg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Ft, this.eventTimes = Us(le), this.expirationTimes = Us(nn), this.pendingLanes = le, this.suspendedLanes = le, this.pingedLanes = le, this.expiredLanes = le, this.mutableReadLanes = le, this.finishedLanes = le, this.entangledLanes = le, this.entanglements = Us(le), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var f = this.pendingUpdatersLaneMap = [], h = 0; h < Du; h++)
          f.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case ym:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Bo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function Qw(e, t, a, i, o, f, h, g, E, _) {
      var T = new KD(e, t, a, g, E), H = YD(t, f);
      T.current = H, H.stateNode = T;
      {
        var U = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        H.memoizedState = U;
      }
      return S0(H), T;
    }
    var uE = "18.3.1";
    function ZD(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Yr(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: ar,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var oE, sE;
    oE = !1, sE = {};
    function Gw(e) {
      if (!e)
        return si;
      var t = _o(e), a = zT(t);
      if (t.tag === R) {
        var i = t.type;
        if (ql(i))
          return xx(t, i, a);
      }
      return a;
    }
    function JD(e, t) {
      {
        var a = _o(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var o = qr(a);
        if (o === null)
          return null;
        if (o.mode & Jt) {
          var f = st(a) || "Component";
          if (!sE[f]) {
            sE[f] = !0;
            var h = lr;
            try {
              qt(o), a.mode & Jt ? m("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, f) : m("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, f);
            } finally {
              h ? qt(h) : fn();
            }
          }
        }
        return o.stateNode;
      }
    }
    function Xw(e, t, a, i, o, f, h, g) {
      var E = !1, _ = null;
      return Qw(e, t, E, _, a, i, o, f, h);
    }
    function qw(e, t, a, i, o, f, h, g, E, _) {
      var T = !0, H = Qw(a, i, T, e, o, f, h, g, E);
      H.context = Gw(null);
      var U = H.current, W = xa(), q = Jo(U), ee = Gu(W, q);
      return ee.callback = t ?? null, Yo(U, ee, q), lD(H, q, W), H;
    }
    function yh(e, t, a, i) {
      Pd(t, e);
      var o = t.current, f = xa(), h = Jo(o);
      Sn(h);
      var g = Gw(a);
      t.context === null ? t.context = g : t.pendingContext = g, Si && lr !== null && !oE && (oE = !0, m(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, st(lr) || "Unknown"));
      var E = Gu(f, h);
      E.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && m("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), E.callback = i);
      var _ = Yo(o, E, h);
      return _ !== null && (gr(_, o, h, f), Nm(_, o, h)), h;
    }
    function xy(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case V:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function eM(e) {
      switch (e.tag) {
        case L: {
          var t = e.stateNode;
          if (gf(t)) {
            var a = yv(t);
            cD(t, a);
          }
          break;
        }
        case xe: {
          Zu(function() {
            var o = Ha(e, lt);
            if (o !== null) {
              var f = xa();
              gr(o, e, lt, f);
            }
          });
          var i = lt;
          cE(e, i);
          break;
        }
      }
    }
    function Kw(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Cv(a.retryLane, t));
    }
    function cE(e, t) {
      Kw(e, t);
      var a = e.alternate;
      a && Kw(a, t);
    }
    function tM(e) {
      if (e.tag === xe) {
        var t = Ms, a = Ha(e, t);
        if (a !== null) {
          var i = xa();
          gr(a, e, t, i);
        }
        cE(e, t);
      }
    }
    function nM(e) {
      if (e.tag === xe) {
        var t = Jo(e), a = Ha(e, t);
        if (a !== null) {
          var i = xa();
          gr(a, e, t, i);
        }
        cE(e, t);
      }
    }
    function Zw(e) {
      var t = pn(e);
      return t === null ? null : t.stateNode;
    }
    var Jw = function(e) {
      return null;
    };
    function rM(e) {
      return Jw(e);
    }
    var e1 = function(e) {
      return !1;
    };
    function aM(e) {
      return e1(e);
    }
    var t1 = null, n1 = null, r1 = null, a1 = null, i1 = null, l1 = null, u1 = null, o1 = null, s1 = null;
    {
      var c1 = function(e, t, a) {
        var i = t[a], o = St(e) ? e.slice() : yt({}, e);
        return a + 1 === t.length ? (St(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = c1(e[i], t, a + 1), o);
      }, f1 = function(e, t) {
        return c1(e, t, 0);
      }, d1 = function(e, t, a, i) {
        var o = t[i], f = St(e) ? e.slice() : yt({}, e);
        if (i + 1 === t.length) {
          var h = a[i];
          f[h] = f[o], St(f) ? f.splice(o, 1) : delete f[o];
        } else
          f[o] = d1(
            // $FlowFixMe number or string is fine here
            e[o],
            t,
            a,
            i + 1
          );
        return f;
      }, p1 = function(e, t, a) {
        if (t.length !== a.length) {
          w("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              w("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return d1(e, t, a, 0);
      }, h1 = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var o = t[a], f = St(e) ? e.slice() : yt({}, e);
        return f[o] = h1(e[o], t, a + 1, i), f;
      }, v1 = function(e, t, a) {
        return h1(e, t, 0, a);
      }, fE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      t1 = function(e, t, a, i) {
        var o = fE(e, t);
        if (o !== null) {
          var f = v1(o.memoizedState, a, i);
          o.memoizedState = f, o.baseState = f, e.memoizedProps = yt({}, e.memoizedProps);
          var h = Ha(e, lt);
          h !== null && gr(h, e, lt, nn);
        }
      }, n1 = function(e, t, a) {
        var i = fE(e, t);
        if (i !== null) {
          var o = f1(i.memoizedState, a);
          i.memoizedState = o, i.baseState = o, e.memoizedProps = yt({}, e.memoizedProps);
          var f = Ha(e, lt);
          f !== null && gr(f, e, lt, nn);
        }
      }, r1 = function(e, t, a, i) {
        var o = fE(e, t);
        if (o !== null) {
          var f = p1(o.memoizedState, a, i);
          o.memoizedState = f, o.baseState = f, e.memoizedProps = yt({}, e.memoizedProps);
          var h = Ha(e, lt);
          h !== null && gr(h, e, lt, nn);
        }
      }, a1 = function(e, t, a) {
        e.pendingProps = v1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ha(e, lt);
        i !== null && gr(i, e, lt, nn);
      }, i1 = function(e, t) {
        e.pendingProps = f1(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ha(e, lt);
        a !== null && gr(a, e, lt, nn);
      }, l1 = function(e, t, a) {
        e.pendingProps = p1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ha(e, lt);
        i !== null && gr(i, e, lt, nn);
      }, u1 = function(e) {
        var t = Ha(e, lt);
        t !== null && gr(t, e, lt, nn);
      }, o1 = function(e) {
        Jw = e;
      }, s1 = function(e) {
        e1 = e;
      };
    }
    function iM(e) {
      var t = qr(e);
      return t === null ? null : t.stateNode;
    }
    function lM(e) {
      return null;
    }
    function uM() {
      return lr;
    }
    function oM(e) {
      var t = e.findFiberByHostInstance, a = d.ReactCurrentDispatcher;
      return bo({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: t1,
        overrideHookStateDeletePath: n1,
        overrideHookStateRenamePath: r1,
        overrideProps: a1,
        overridePropsDeletePath: i1,
        overridePropsRenamePath: l1,
        setErrorHandler: o1,
        setSuspenseHandler: s1,
        scheduleUpdate: u1,
        currentDispatcherRef: a,
        findHostInstanceByFiber: iM,
        findFiberByHostInstance: t || lM,
        // React Refresh
        findHostInstancesForRefresh: jD,
        scheduleRefresh: UD,
        scheduleRoot: FD,
        setRefreshHandler: AD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: uM,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: uE
      });
    }
    var m1 = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function dE(e) {
      this._internalRoot = e;
    }
    Cy.prototype.render = dE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? m("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : wy(arguments[1]) ? m("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && m("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = Zw(t.current);
          i && i.parentNode !== a && m("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      yh(e, t, null, null);
    }, Cy.prototype.unmount = dE.prototype.unmount = function() {
      typeof arguments[0] == "function" && m("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        kw() && m("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Zu(function() {
          yh(null, e, null, null);
        }), mx(t);
      }
    };
    function sM(e, t) {
      if (!wy(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      y1(e);
      var a = !1, i = !1, o = "", f = m1;
      t != null && (t.hydrate ? w("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === kr && m(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var h = Xw(e, ym, null, a, i, o, f);
      cm(h.current, e);
      var g = e.nodeType === Ln ? e.parentNode : e;
      return wp(g), new dE(h);
    }
    function Cy(e) {
      this._internalRoot = e;
    }
    function cM(e) {
      e && Nv(e);
    }
    Cy.prototype.unstable_scheduleHydration = cM;
    function fM(e, t, a) {
      if (!wy(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      y1(e), t === void 0 && m("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, o = a != null && a.hydratedSources || null, f = !1, h = !1, g = "", E = m1;
      a != null && (a.unstable_strictMode === !0 && (f = !0), a.identifierPrefix !== void 0 && (g = a.identifierPrefix), a.onRecoverableError !== void 0 && (E = a.onRecoverableError));
      var _ = qw(t, null, e, ym, i, f, h, g, E);
      if (cm(_.current, e), wp(e), o)
        for (var T = 0; T < o.length; T++) {
          var H = o[T];
          vb(_, H);
        }
      return new Cy(_);
    }
    function wy(e) {
      return !!(e && (e.nodeType === Qr || e.nodeType === Gi || e.nodeType === Rd));
    }
    function gh(e) {
      return !!(e && (e.nodeType === Qr || e.nodeType === Gi || e.nodeType === Rd || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function y1(e) {
      e.nodeType === Qr && e.tagName && e.tagName.toUpperCase() === "BODY" && m("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), zp(e) && (e._reactRootContainer ? m("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : m("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var dM = d.ReactCurrentOwner, g1;
    g1 = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = Zw(e._reactRootContainer.current);
        t && t.parentNode !== e && m("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = pE(e), o = !!(i && Po(i));
      o && !a && m("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Qr && e.tagName && e.tagName.toUpperCase() === "BODY" && m("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function pE(e) {
      return e ? e.nodeType === Gi ? e.documentElement : e.firstChild : null;
    }
    function S1() {
    }
    function pM(e, t, a, i, o) {
      if (o) {
        if (typeof i == "function") {
          var f = i;
          i = function() {
            var U = xy(h);
            f.call(U);
          };
        }
        var h = qw(
          t,
          i,
          e,
          Bo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          S1
        );
        e._reactRootContainer = h, cm(h.current, e);
        var g = e.nodeType === Ln ? e.parentNode : e;
        return wp(g), Zu(), h;
      } else {
        for (var E; E = e.lastChild; )
          e.removeChild(E);
        if (typeof i == "function") {
          var _ = i;
          i = function() {
            var U = xy(T);
            _.call(U);
          };
        }
        var T = Xw(
          e,
          Bo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          S1
        );
        e._reactRootContainer = T, cm(T.current, e);
        var H = e.nodeType === Ln ? e.parentNode : e;
        return wp(H), Zu(function() {
          yh(t, T, a, i);
        }), T;
      }
    }
    function hM(e, t) {
      e !== null && typeof e != "function" && m("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function _y(e, t, a, i, o) {
      g1(a), hM(o === void 0 ? null : o, "render");
      var f = a._reactRootContainer, h;
      if (!f)
        h = pM(a, t, e, o, i);
      else {
        if (h = f, typeof o == "function") {
          var g = o;
          o = function() {
            var E = xy(h);
            g.call(E);
          };
        }
        yh(t, h, e, o);
      }
      return xy(h);
    }
    var E1 = !1;
    function vM(e) {
      {
        E1 || (E1 = !0, m("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = dM.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || m("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", At(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Qr ? e : JD(e, "findDOMNode");
    }
    function mM(e, t, a) {
      if (m("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !gh(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = zp(t) && t._reactRootContainer === void 0;
        i && m("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return _y(null, e, t, !0, a);
    }
    function yM(e, t, a) {
      if (m("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !gh(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = zp(t) && t._reactRootContainer === void 0;
        i && m("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return _y(null, e, t, !1, a);
    }
    function gM(e, t, a, i) {
      if (m("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !gh(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !cg(e))
        throw new Error("parentComponent must be a valid React Component");
      return _y(e, t, a, !1, i);
    }
    var x1 = !1;
    function SM(e) {
      if (x1 || (x1 = !0, m("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !gh(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = zp(e) && e._reactRootContainer === void 0;
        t && m("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = pE(e), i = a && !Po(a);
          i && m("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Zu(function() {
          _y(null, null, e, !1, function() {
            e._reactRootContainer = null, mx(e);
          });
        }), !0;
      } else {
        {
          var o = pE(e), f = !!(o && Po(o)), h = e.nodeType === Qr && gh(e.parentNode) && !!e.parentNode._reactRootContainer;
          f && m("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", h ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    _r(eM), Oo(tM), kv(nM), Vs(Ua), lp(Rv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && m("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), zc(xR), sg($S, fD, Zu);
    function EM(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!wy(t))
        throw new Error("Target container is not a DOM element.");
      return ZD(e, t, null, a);
    }
    function xM(e, t, a, i) {
      return gM(e, t, a, i);
    }
    var hE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Po, Ff, fm, Eo, Ac, $S]
    };
    function CM(e, t) {
      return hE.usingClientEntryPoint || m('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), sM(e, t);
    }
    function wM(e, t, a) {
      return hE.usingClientEntryPoint || m('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), fM(e, t, a);
    }
    function _M(e) {
      return kw() && m("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Zu(e);
    }
    var RM = oM({
      findFiberByHostInstance: tc,
      bundleType: 1,
      version: uE,
      rendererPackageName: "react-dom"
    });
    if (!RM && On && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var C1 = window.location.protocol;
      /^(https?|file):$/.test(C1) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (C1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = hE, $a.createPortal = EM, $a.createRoot = CM, $a.findDOMNode = vM, $a.flushSync = _M, $a.hydrate = mM, $a.hydrateRoot = wM, $a.render = yM, $a.unmountComponentAtNode = SM, $a.unstable_batchedUpdates = $S, $a.unstable_renderSubtreeIntoContainer = xM, $a.version = uE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), $a;
}
var z1;
function FM() {
  if (z1) return by.exports;
  z1 = 1;
  function u() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u);
      } catch (c) {
        console.error(c);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (u(), by.exports = AM()) : by.exports = UM(), by.exports;
}
var A1;
function jM() {
  if (A1) return od;
  A1 = 1;
  var u = FM();
  if (process.env.NODE_ENV === "production")
    od.createRoot = u.createRoot, od.hydrateRoot = u.hydrateRoot;
  else {
    var c = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    od.createRoot = function(d, y) {
      c.usingClientEntryPoint = !0;
      try {
        return u.createRoot(d, y);
      } finally {
        c.usingClientEntryPoint = !1;
      }
    }, od.hydrateRoot = function(d, y, S) {
      c.usingClientEntryPoint = !0;
      try {
        return u.hydrateRoot(d, y, S);
      } finally {
        c.usingClientEntryPoint = !1;
      }
    };
  }
  return od;
}
var HM = jM();
let d_ = Rt.createContext(
  /** @type {any} */
  null
);
function PM() {
  let u = Rt.useContext(d_);
  if (!u) throw new Error("RenderContext not found");
  return u;
}
function VM() {
  return PM().model;
}
function sd(u) {
  let c = VM(), [d, y] = Rt.useState(c.get(u));
  return Rt.useEffect(() => {
    let S = () => y(c.get(u));
    return c.on(`change:${u}`, S), () => c.off(`change:${u}`, S);
  }, [c, u]), [
    d,
    (S) => {
      c.set(u, S), c.save_changes();
    }
  ];
}
function BM(u) {
  return ({ el: c, model: d, experimental: y }) => {
    let S = HM.createRoot(c);
    return S.render(
      Rt.createElement(
        Rt.StrictMode,
        null,
        Rt.createElement(
          d_.Provider,
          { value: { model: d, experimental: y } },
          Rt.createElement(u)
        )
      )
    ), () => S.unmount();
  };
}
function zy(u, c) {
  return u == null || c == null ? NaN : u < c ? -1 : u > c ? 1 : u >= c ? 0 : NaN;
}
function IM(u, c) {
  return u == null || c == null ? NaN : c < u ? -1 : c > u ? 1 : c >= u ? 0 : NaN;
}
function p_(u) {
  let c, d, y;
  u.length !== 2 ? (c = zy, d = (b, k) => zy(u(b), k), y = (b, k) => u(b) - k) : (c = u === zy || u === IM ? u : $M, d = u, y = u);
  function S(b, k, R = 0, O = b.length) {
    if (R < O) {
      if (c(k, k) !== 0) return O;
      do {
        const L = R + O >>> 1;
        d(b[L], k) < 0 ? R = L + 1 : O = L;
      } while (R < O);
    }
    return R;
  }
  function w(b, k, R = 0, O = b.length) {
    if (R < O) {
      if (c(k, k) !== 0) return O;
      do {
        const L = R + O >>> 1;
        d(b[L], k) <= 0 ? R = L + 1 : O = L;
      } while (R < O);
    }
    return R;
  }
  function m(b, k, R = 0, O = b.length) {
    const L = S(b, k, R, O - 1);
    return L > R && y(b[L - 1], k) > -y(b[L], k) ? L - 1 : L;
  }
  return { left: S, center: m, right: w };
}
function $M() {
  return 0;
}
function YM(u) {
  return u === null ? NaN : +u;
}
const WM = p_(zy), QM = WM.right;
p_(YM).center;
function h_(u, c) {
  let d, y;
  for (const S of u)
    S != null && (d === void 0 ? S >= S && (d = y = S) : (d > S && (d = S), y < S && (y = S)));
  return [d, y];
}
const GM = Math.sqrt(50), XM = Math.sqrt(10), qM = Math.sqrt(2);
function Hy(u, c, d) {
  const y = (c - u) / Math.max(0, d), S = Math.floor(Math.log10(y)), w = y / Math.pow(10, S), m = w >= GM ? 10 : w >= XM ? 5 : w >= qM ? 2 : 1;
  let b, k, R;
  return S < 0 ? (R = Math.pow(10, -S) / m, b = Math.round(u * R), k = Math.round(c * R), b / R < u && ++b, k / R > c && --k, R = -R) : (R = Math.pow(10, S) * m, b = Math.round(u / R), k = Math.round(c / R), b * R < u && ++b, k * R > c && --k), k < b && 0.5 <= d && d < 2 ? Hy(u, c, d * 2) : [b, k, R];
}
function KM(u, c, d) {
  if (c = +c, u = +u, d = +d, !(d > 0)) return [];
  if (u === c) return [u];
  const y = c < u, [S, w, m] = y ? Hy(c, u, d) : Hy(u, c, d);
  if (!(w >= S)) return [];
  const b = w - S + 1, k = new Array(b);
  if (y)
    if (m < 0) for (let R = 0; R < b; ++R) k[R] = (w - R) / -m;
    else for (let R = 0; R < b; ++R) k[R] = (w - R) * m;
  else if (m < 0) for (let R = 0; R < b; ++R) k[R] = (S + R) / -m;
  else for (let R = 0; R < b; ++R) k[R] = (S + R) * m;
  return k;
}
function xE(u, c, d) {
  return c = +c, u = +u, d = +d, Hy(u, c, d)[2];
}
function ZM(u, c, d) {
  c = +c, u = +u, d = +d;
  const y = c < u, S = y ? xE(c, u, d) : xE(u, c, d);
  return (y ? -1 : 1) * (S < 0 ? 1 / -S : S);
}
function JM(u, c) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(u);
      break;
    default:
      this.range(c).domain(u);
      break;
  }
  return this;
}
function NE(u, c, d) {
  u.prototype = c.prototype = d, d.constructor = u;
}
function v_(u, c) {
  var d = Object.create(u.prototype);
  for (var y in c) d[y] = c[y];
  return d;
}
function Nh() {
}
var kh = 0.7, Py = 1 / kh, fd = "\\s*([+-]?\\d+)\\s*", Dh = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", iu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", eO = /^#([0-9a-f]{3,8})$/, tO = new RegExp(`^rgb\\(${fd},${fd},${fd}\\)$`), nO = new RegExp(`^rgb\\(${iu},${iu},${iu}\\)$`), rO = new RegExp(`^rgba\\(${fd},${fd},${fd},${Dh}\\)$`), aO = new RegExp(`^rgba\\(${iu},${iu},${iu},${Dh}\\)$`), iO = new RegExp(`^hsl\\(${Dh},${iu},${iu}\\)$`), lO = new RegExp(`^hsla\\(${Dh},${iu},${iu},${Dh}\\)$`), U1 = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
NE(Nh, Ec, {
  copy(u) {
    return Object.assign(new this.constructor(), this, u);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: F1,
  // Deprecated! Use color.formatHex.
  formatHex: F1,
  formatHex8: uO,
  formatHsl: oO,
  formatRgb: j1,
  toString: j1
});
function F1() {
  return this.rgb().formatHex();
}
function uO() {
  return this.rgb().formatHex8();
}
function oO() {
  return m_(this).formatHsl();
}
function j1() {
  return this.rgb().formatRgb();
}
function Ec(u) {
  var c, d;
  return u = (u + "").trim().toLowerCase(), (c = eO.exec(u)) ? (d = c[1].length, c = parseInt(c[1], 16), d === 6 ? H1(c) : d === 3 ? new Wa(c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, (c & 15) << 4 | c & 15, 1) : d === 8 ? Dy(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, (c & 255) / 255) : d === 4 ? Dy(c >> 12 & 15 | c >> 8 & 240, c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, ((c & 15) << 4 | c & 15) / 255) : null) : (c = tO.exec(u)) ? new Wa(c[1], c[2], c[3], 1) : (c = nO.exec(u)) ? new Wa(c[1] * 255 / 100, c[2] * 255 / 100, c[3] * 255 / 100, 1) : (c = rO.exec(u)) ? Dy(c[1], c[2], c[3], c[4]) : (c = aO.exec(u)) ? Dy(c[1] * 255 / 100, c[2] * 255 / 100, c[3] * 255 / 100, c[4]) : (c = iO.exec(u)) ? B1(c[1], c[2] / 100, c[3] / 100, 1) : (c = lO.exec(u)) ? B1(c[1], c[2] / 100, c[3] / 100, c[4]) : U1.hasOwnProperty(u) ? H1(U1[u]) : u === "transparent" ? new Wa(NaN, NaN, NaN, 0) : null;
}
function H1(u) {
  return new Wa(u >> 16 & 255, u >> 8 & 255, u & 255, 1);
}
function Dy(u, c, d, y) {
  return y <= 0 && (u = c = d = NaN), new Wa(u, c, d, y);
}
function sO(u) {
  return u instanceof Nh || (u = Ec(u)), u ? (u = u.rgb(), new Wa(u.r, u.g, u.b, u.opacity)) : new Wa();
}
function CE(u, c, d, y) {
  return arguments.length === 1 ? sO(u) : new Wa(u, c, d, y ?? 1);
}
function Wa(u, c, d, y) {
  this.r = +u, this.g = +c, this.b = +d, this.opacity = +y;
}
NE(Wa, CE, v_(Nh, {
  brighter(u) {
    return u = u == null ? Py : Math.pow(Py, u), new Wa(this.r * u, this.g * u, this.b * u, this.opacity);
  },
  darker(u) {
    return u = u == null ? kh : Math.pow(kh, u), new Wa(this.r * u, this.g * u, this.b * u, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Wa(Sc(this.r), Sc(this.g), Sc(this.b), Vy(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: P1,
  // Deprecated! Use color.formatHex.
  formatHex: P1,
  formatHex8: cO,
  formatRgb: V1,
  toString: V1
}));
function P1() {
  return `#${gc(this.r)}${gc(this.g)}${gc(this.b)}`;
}
function cO() {
  return `#${gc(this.r)}${gc(this.g)}${gc(this.b)}${gc((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function V1() {
  const u = Vy(this.opacity);
  return `${u === 1 ? "rgb(" : "rgba("}${Sc(this.r)}, ${Sc(this.g)}, ${Sc(this.b)}${u === 1 ? ")" : `, ${u})`}`;
}
function Vy(u) {
  return isNaN(u) ? 1 : Math.max(0, Math.min(1, u));
}
function Sc(u) {
  return Math.max(0, Math.min(255, Math.round(u) || 0));
}
function gc(u) {
  return u = Sc(u), (u < 16 ? "0" : "") + u.toString(16);
}
function B1(u, c, d, y) {
  return y <= 0 ? u = c = d = NaN : d <= 0 || d >= 1 ? u = c = NaN : c <= 0 && (u = NaN), new yl(u, c, d, y);
}
function m_(u) {
  if (u instanceof yl) return new yl(u.h, u.s, u.l, u.opacity);
  if (u instanceof Nh || (u = Ec(u)), !u) return new yl();
  if (u instanceof yl) return u;
  u = u.rgb();
  var c = u.r / 255, d = u.g / 255, y = u.b / 255, S = Math.min(c, d, y), w = Math.max(c, d, y), m = NaN, b = w - S, k = (w + S) / 2;
  return b ? (c === w ? m = (d - y) / b + (d < y) * 6 : d === w ? m = (y - c) / b + 2 : m = (c - d) / b + 4, b /= k < 0.5 ? w + S : 2 - w - S, m *= 60) : b = k > 0 && k < 1 ? 0 : m, new yl(m, b, k, u.opacity);
}
function fO(u, c, d, y) {
  return arguments.length === 1 ? m_(u) : new yl(u, c, d, y ?? 1);
}
function yl(u, c, d, y) {
  this.h = +u, this.s = +c, this.l = +d, this.opacity = +y;
}
NE(yl, fO, v_(Nh, {
  brighter(u) {
    return u = u == null ? Py : Math.pow(Py, u), new yl(this.h, this.s, this.l * u, this.opacity);
  },
  darker(u) {
    return u = u == null ? kh : Math.pow(kh, u), new yl(this.h, this.s, this.l * u, this.opacity);
  },
  rgb() {
    var u = this.h % 360 + (this.h < 0) * 360, c = isNaN(u) || isNaN(this.s) ? 0 : this.s, d = this.l, y = d + (d < 0.5 ? d : 1 - d) * c, S = 2 * d - y;
    return new Wa(
      yE(u >= 240 ? u - 240 : u + 120, S, y),
      yE(u, S, y),
      yE(u < 120 ? u + 240 : u - 120, S, y),
      this.opacity
    );
  },
  clamp() {
    return new yl(I1(this.h), My(this.s), My(this.l), Vy(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const u = Vy(this.opacity);
    return `${u === 1 ? "hsl(" : "hsla("}${I1(this.h)}, ${My(this.s) * 100}%, ${My(this.l) * 100}%${u === 1 ? ")" : `, ${u})`}`;
  }
}));
function I1(u) {
  return u = (u || 0) % 360, u < 0 ? u + 360 : u;
}
function My(u) {
  return Math.max(0, Math.min(1, u || 0));
}
function yE(u, c, d) {
  return (u < 60 ? c + (d - c) * u / 60 : u < 180 ? d : u < 240 ? c + (d - c) * (240 - u) / 60 : c) * 255;
}
const LE = (u) => () => u;
function dO(u, c) {
  return function(d) {
    return u + d * c;
  };
}
function pO(u, c, d) {
  return u = Math.pow(u, d), c = Math.pow(c, d) - u, d = 1 / d, function(y) {
    return Math.pow(u + y * c, d);
  };
}
function hO(u) {
  return (u = +u) == 1 ? y_ : function(c, d) {
    return d - c ? pO(c, d, u) : LE(isNaN(c) ? d : c);
  };
}
function y_(u, c) {
  var d = c - u;
  return d ? dO(u, d) : LE(isNaN(u) ? c : u);
}
const By = (function u(c) {
  var d = hO(c);
  function y(S, w) {
    var m = d((S = CE(S)).r, (w = CE(w)).r), b = d(S.g, w.g), k = d(S.b, w.b), R = y_(S.opacity, w.opacity);
    return function(O) {
      return S.r = m(O), S.g = b(O), S.b = k(O), S.opacity = R(O), S + "";
    };
  }
  return y.gamma = u, y;
})(1);
function vO(u, c) {
  c || (c = []);
  var d = u ? Math.min(c.length, u.length) : 0, y = c.slice(), S;
  return function(w) {
    for (S = 0; S < d; ++S) y[S] = u[S] * (1 - w) + c[S] * w;
    return y;
  };
}
function mO(u) {
  return ArrayBuffer.isView(u) && !(u instanceof DataView);
}
function yO(u, c) {
  var d = c ? c.length : 0, y = u ? Math.min(d, u.length) : 0, S = new Array(y), w = new Array(d), m;
  for (m = 0; m < y; ++m) S[m] = zE(u[m], c[m]);
  for (; m < d; ++m) w[m] = c[m];
  return function(b) {
    for (m = 0; m < y; ++m) w[m] = S[m](b);
    return w;
  };
}
function gO(u, c) {
  var d = /* @__PURE__ */ new Date();
  return u = +u, c = +c, function(y) {
    return d.setTime(u * (1 - y) + c * y), d;
  };
}
function ml(u, c) {
  return u = +u, c = +c, function(d) {
    return u * (1 - d) + c * d;
  };
}
function SO(u, c) {
  var d = {}, y = {}, S;
  (u === null || typeof u != "object") && (u = {}), (c === null || typeof c != "object") && (c = {});
  for (S in c)
    S in u ? d[S] = zE(u[S], c[S]) : y[S] = c[S];
  return function(w) {
    for (S in d) y[S] = d[S](w);
    return y;
  };
}
var wE = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, gE = new RegExp(wE.source, "g");
function EO(u) {
  return function() {
    return u;
  };
}
function xO(u) {
  return function(c) {
    return u(c) + "";
  };
}
function g_(u, c) {
  var d = wE.lastIndex = gE.lastIndex = 0, y, S, w, m = -1, b = [], k = [];
  for (u = u + "", c = c + ""; (y = wE.exec(u)) && (S = gE.exec(c)); )
    (w = S.index) > d && (w = c.slice(d, w), b[m] ? b[m] += w : b[++m] = w), (y = y[0]) === (S = S[0]) ? b[m] ? b[m] += S : b[++m] = S : (b[++m] = null, k.push({ i: m, x: ml(y, S) })), d = gE.lastIndex;
  return d < c.length && (w = c.slice(d), b[m] ? b[m] += w : b[++m] = w), b.length < 2 ? k[0] ? xO(k[0].x) : EO(c) : (c = k.length, function(R) {
    for (var O = 0, L; O < c; ++O) b[(L = k[O]).i] = L.x(R);
    return b.join("");
  });
}
function zE(u, c) {
  var d = typeof c, y;
  return c == null || d === "boolean" ? LE(c) : (d === "number" ? ml : d === "string" ? (y = Ec(c)) ? (c = y, By) : g_ : c instanceof Ec ? By : c instanceof Date ? gO : mO(c) ? vO : Array.isArray(c) ? yO : typeof c.valueOf != "function" && typeof c.toString != "function" || isNaN(c) ? SO : ml)(u, c);
}
function CO(u, c) {
  return u = +u, c = +c, function(d) {
    return Math.round(u * (1 - d) + c * d);
  };
}
var $1 = 180 / Math.PI, _E = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function S_(u, c, d, y, S, w) {
  var m, b, k;
  return (m = Math.sqrt(u * u + c * c)) && (u /= m, c /= m), (k = u * d + c * y) && (d -= u * k, y -= c * k), (b = Math.sqrt(d * d + y * y)) && (d /= b, y /= b, k /= b), u * y < c * d && (u = -u, c = -c, k = -k, m = -m), {
    translateX: S,
    translateY: w,
    rotate: Math.atan2(c, u) * $1,
    skewX: Math.atan(k) * $1,
    scaleX: m,
    scaleY: b
  };
}
var Oy;
function wO(u) {
  const c = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(u + "");
  return c.isIdentity ? _E : S_(c.a, c.b, c.c, c.d, c.e, c.f);
}
function _O(u) {
  return u == null || (Oy || (Oy = document.createElementNS("http://www.w3.org/2000/svg", "g")), Oy.setAttribute("transform", u), !(u = Oy.transform.baseVal.consolidate())) ? _E : (u = u.matrix, S_(u.a, u.b, u.c, u.d, u.e, u.f));
}
function E_(u, c, d, y) {
  function S(R) {
    return R.length ? R.pop() + " " : "";
  }
  function w(R, O, L, F, V, me) {
    if (R !== L || O !== F) {
      var ge = V.push("translate(", null, c, null, d);
      me.push({ i: ge - 4, x: ml(R, L) }, { i: ge - 2, x: ml(O, F) });
    } else (L || F) && V.push("translate(" + L + c + F + d);
  }
  function m(R, O, L, F) {
    R !== O ? (R - O > 180 ? O += 360 : O - R > 180 && (R += 360), F.push({ i: L.push(S(L) + "rotate(", null, y) - 2, x: ml(R, O) })) : O && L.push(S(L) + "rotate(" + O + y);
  }
  function b(R, O, L, F) {
    R !== O ? F.push({ i: L.push(S(L) + "skewX(", null, y) - 2, x: ml(R, O) }) : O && L.push(S(L) + "skewX(" + O + y);
  }
  function k(R, O, L, F, V, me) {
    if (R !== L || O !== F) {
      var ge = V.push(S(V) + "scale(", null, ",", null, ")");
      me.push({ i: ge - 4, x: ml(R, L) }, { i: ge - 2, x: ml(O, F) });
    } else (L !== 1 || F !== 1) && V.push(S(V) + "scale(" + L + "," + F + ")");
  }
  return function(R, O) {
    var L = [], F = [];
    return R = u(R), O = u(O), w(R.translateX, R.translateY, O.translateX, O.translateY, L, F), m(R.rotate, O.rotate, L, F), b(R.skewX, O.skewX, L, F), k(R.scaleX, R.scaleY, O.scaleX, O.scaleY, L, F), R = O = null, function(V) {
      for (var me = -1, ge = F.length, Se; ++me < ge; ) L[(Se = F[me]).i] = Se.x(V);
      return L.join("");
    };
  };
}
var RO = E_(wO, "px, ", "px)", "deg)"), TO = E_(_O, ", ", ")", ")"), bO = 1e-12;
function Y1(u) {
  return ((u = Math.exp(u)) + 1 / u) / 2;
}
function kO(u) {
  return ((u = Math.exp(u)) - 1 / u) / 2;
}
function DO(u) {
  return ((u = Math.exp(2 * u)) - 1) / (u + 1);
}
const MO = (function u(c, d, y) {
  function S(w, m) {
    var b = w[0], k = w[1], R = w[2], O = m[0], L = m[1], F = m[2], V = O - b, me = L - k, ge = V * V + me * me, Se, se;
    if (ge < bO)
      se = Math.log(F / R) / c, Se = function(Ue) {
        return [
          b + Ue * V,
          k + Ue * me,
          R * Math.exp(c * Ue * se)
        ];
      };
    else {
      var Pe = Math.sqrt(ge), pe = (F * F - R * R + y * ge) / (2 * R * d * Pe), De = (F * F - R * R - y * ge) / (2 * F * d * Pe), xe = Math.log(Math.sqrt(pe * pe + 1) - pe), Me = Math.log(Math.sqrt(De * De + 1) - De);
      se = (Me - xe) / c, Se = function(Ue) {
        var kt = Ue * se, Et = Y1(xe), Mt = R / (d * Pe) * (Et * DO(c * kt + xe) - kO(xe));
        return [
          b + Mt * V,
          k + Mt * me,
          R * Et / Y1(c * kt + xe)
        ];
      };
    }
    return Se.duration = se * 1e3 * c / Math.SQRT2, Se;
  }
  return S.rho = function(w) {
    var m = Math.max(1e-3, +w), b = m * m, k = b * b;
    return u(m, b, k);
  }, S;
})(Math.SQRT2, 2, 4);
function OO(u) {
  return function() {
    return u;
  };
}
function NO(u) {
  return +u;
}
var W1 = [0, 1];
function cd(u) {
  return u;
}
function RE(u, c) {
  return (c -= u = +u) ? function(d) {
    return (d - u) / c;
  } : OO(isNaN(c) ? NaN : 0.5);
}
function LO(u, c) {
  var d;
  return u > c && (d = u, u = c, c = d), function(y) {
    return Math.max(u, Math.min(c, y));
  };
}
function zO(u, c, d) {
  var y = u[0], S = u[1], w = c[0], m = c[1];
  return S < y ? (y = RE(S, y), w = d(m, w)) : (y = RE(y, S), w = d(w, m)), function(b) {
    return w(y(b));
  };
}
function AO(u, c, d) {
  var y = Math.min(u.length, c.length) - 1, S = new Array(y), w = new Array(y), m = -1;
  for (u[y] < u[0] && (u = u.slice().reverse(), c = c.slice().reverse()); ++m < y; )
    S[m] = RE(u[m], u[m + 1]), w[m] = d(c[m], c[m + 1]);
  return function(b) {
    var k = QM(u, b, 1, y) - 1;
    return w[k](S[k](b));
  };
}
function UO(u, c) {
  return c.domain(u.domain()).range(u.range()).interpolate(u.interpolate()).clamp(u.clamp()).unknown(u.unknown());
}
function FO() {
  var u = W1, c = W1, d = zE, y, S, w, m = cd, b, k, R;
  function O() {
    var F = Math.min(u.length, c.length);
    return m !== cd && (m = LO(u[0], u[F - 1])), b = F > 2 ? AO : zO, k = R = null, L;
  }
  function L(F) {
    return F == null || isNaN(F = +F) ? w : (k || (k = b(u.map(y), c, d)))(y(m(F)));
  }
  return L.invert = function(F) {
    return m(S((R || (R = b(c, u.map(y), ml)))(F)));
  }, L.domain = function(F) {
    return arguments.length ? (u = Array.from(F, NO), O()) : u.slice();
  }, L.range = function(F) {
    return arguments.length ? (c = Array.from(F), O()) : c.slice();
  }, L.rangeRound = function(F) {
    return c = Array.from(F), d = CO, O();
  }, L.clamp = function(F) {
    return arguments.length ? (m = F ? !0 : cd, O()) : m !== cd;
  }, L.interpolate = function(F) {
    return arguments.length ? (d = F, O()) : d;
  }, L.unknown = function(F) {
    return arguments.length ? (w = F, L) : w;
  }, function(F, V) {
    return y = F, S = V, O();
  };
}
function jO() {
  return FO()(cd, cd);
}
function HO(u) {
  return Math.abs(u = Math.round(u)) >= 1e21 ? u.toLocaleString("en").replace(/,/g, "") : u.toString(10);
}
function Iy(u, c) {
  if (!isFinite(u) || u === 0) return null;
  var d = (u = c ? u.toExponential(c - 1) : u.toExponential()).indexOf("e"), y = u.slice(0, d);
  return [
    y.length > 1 ? y[0] + y.slice(2) : y,
    +u.slice(d + 1)
  ];
}
function dd(u) {
  return u = Iy(Math.abs(u)), u ? u[1] : NaN;
}
function PO(u, c) {
  return function(d, y) {
    for (var S = d.length, w = [], m = 0, b = u[0], k = 0; S > 0 && b > 0 && (k + b + 1 > y && (b = Math.max(1, y - k)), w.push(d.substring(S -= b, S + b)), !((k += b + 1) > y)); )
      b = u[m = (m + 1) % u.length];
    return w.reverse().join(c);
  };
}
function VO(u) {
  return function(c) {
    return c.replace(/[0-9]/g, function(d) {
      return u[+d];
    });
  };
}
var BO = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function $y(u) {
  if (!(c = BO.exec(u))) throw new Error("invalid format: " + u);
  var c;
  return new AE({
    fill: c[1],
    align: c[2],
    sign: c[3],
    symbol: c[4],
    zero: c[5],
    width: c[6],
    comma: c[7],
    precision: c[8] && c[8].slice(1),
    trim: c[9],
    type: c[10]
  });
}
$y.prototype = AE.prototype;
function AE(u) {
  this.fill = u.fill === void 0 ? " " : u.fill + "", this.align = u.align === void 0 ? ">" : u.align + "", this.sign = u.sign === void 0 ? "-" : u.sign + "", this.symbol = u.symbol === void 0 ? "" : u.symbol + "", this.zero = !!u.zero, this.width = u.width === void 0 ? void 0 : +u.width, this.comma = !!u.comma, this.precision = u.precision === void 0 ? void 0 : +u.precision, this.trim = !!u.trim, this.type = u.type === void 0 ? "" : u.type + "";
}
AE.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function IO(u) {
  e: for (var c = u.length, d = 1, y = -1, S; d < c; ++d)
    switch (u[d]) {
      case ".":
        y = S = d;
        break;
      case "0":
        y === 0 && (y = d), S = d;
        break;
      default:
        if (!+u[d]) break e;
        y > 0 && (y = 0);
        break;
    }
  return y > 0 ? u.slice(0, y) + u.slice(S + 1) : u;
}
var Yy;
function $O(u, c) {
  var d = Iy(u, c);
  if (!d) return Yy = void 0, u.toPrecision(c);
  var y = d[0], S = d[1], w = S - (Yy = Math.max(-8, Math.min(8, Math.floor(S / 3))) * 3) + 1, m = y.length;
  return w === m ? y : w > m ? y + new Array(w - m + 1).join("0") : w > 0 ? y.slice(0, w) + "." + y.slice(w) : "0." + new Array(1 - w).join("0") + Iy(u, Math.max(0, c + w - 1))[0];
}
function Q1(u, c) {
  var d = Iy(u, c);
  if (!d) return u + "";
  var y = d[0], S = d[1];
  return S < 0 ? "0." + new Array(-S).join("0") + y : y.length > S + 1 ? y.slice(0, S + 1) + "." + y.slice(S + 1) : y + new Array(S - y.length + 2).join("0");
}
const G1 = {
  "%": (u, c) => (u * 100).toFixed(c),
  b: (u) => Math.round(u).toString(2),
  c: (u) => u + "",
  d: HO,
  e: (u, c) => u.toExponential(c),
  f: (u, c) => u.toFixed(c),
  g: (u, c) => u.toPrecision(c),
  o: (u) => Math.round(u).toString(8),
  p: (u, c) => Q1(u * 100, c),
  r: Q1,
  s: $O,
  X: (u) => Math.round(u).toString(16).toUpperCase(),
  x: (u) => Math.round(u).toString(16)
};
function X1(u) {
  return u;
}
var q1 = Array.prototype.map, K1 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function YO(u) {
  var c = u.grouping === void 0 || u.thousands === void 0 ? X1 : PO(q1.call(u.grouping, Number), u.thousands + ""), d = u.currency === void 0 ? "" : u.currency[0] + "", y = u.currency === void 0 ? "" : u.currency[1] + "", S = u.decimal === void 0 ? "." : u.decimal + "", w = u.numerals === void 0 ? X1 : VO(q1.call(u.numerals, String)), m = u.percent === void 0 ? "%" : u.percent + "", b = u.minus === void 0 ? "−" : u.minus + "", k = u.nan === void 0 ? "NaN" : u.nan + "";
  function R(L, F) {
    L = $y(L);
    var V = L.fill, me = L.align, ge = L.sign, Se = L.symbol, se = L.zero, Pe = L.width, pe = L.comma, De = L.precision, xe = L.trim, Me = L.type;
    Me === "n" ? (pe = !0, Me = "g") : G1[Me] || (De === void 0 && (De = 12), xe = !0, Me = "g"), (se || V === "0" && me === "=") && (se = !0, V = "0", me = "=");
    var Ue = (F && F.prefix !== void 0 ? F.prefix : "") + (Se === "$" ? d : Se === "#" && /[boxX]/.test(Me) ? "0" + Me.toLowerCase() : ""), kt = (Se === "$" ? y : /[%p]/.test(Me) ? m : "") + (F && F.suffix !== void 0 ? F.suffix : ""), Et = G1[Me], Mt = /[defgprs%]/.test(Me);
    De = De === void 0 ? 6 : /[gprs]/.test(Me) ? Math.max(1, Math.min(21, De)) : Math.max(0, Math.min(20, De));
    function Tt(_e) {
      var je = Ue, P = kt, de, J, re;
      if (Me === "c")
        P = Et(_e) + P, _e = "";
      else {
        _e = +_e;
        var K = _e < 0 || 1 / _e < 0;
        if (_e = isNaN(_e) ? k : Et(Math.abs(_e), De), xe && (_e = IO(_e)), K && +_e == 0 && ge !== "+" && (K = !1), je = (K ? ge === "(" ? ge : b : ge === "-" || ge === "(" ? "" : ge) + je, P = (Me === "s" && !isNaN(_e) && Yy !== void 0 ? K1[8 + Yy / 3] : "") + P + (K && ge === "(" ? ")" : ""), Mt) {
          for (de = -1, J = _e.length; ++de < J; )
            if (re = _e.charCodeAt(de), 48 > re || re > 57) {
              P = (re === 46 ? S + _e.slice(de + 1) : _e.slice(de)) + P, _e = _e.slice(0, de);
              break;
            }
        }
      }
      pe && !se && (_e = c(_e, 1 / 0));
      var ue = je.length + _e.length + P.length, ne = ue < Pe ? new Array(Pe - ue + 1).join(V) : "";
      switch (pe && se && (_e = c(ne + _e, ne.length ? Pe - P.length : 1 / 0), ne = ""), me) {
        case "<":
          _e = je + _e + P + ne;
          break;
        case "=":
          _e = je + ne + _e + P;
          break;
        case "^":
          _e = ne.slice(0, ue = ne.length >> 1) + je + _e + P + ne.slice(ue);
          break;
        default:
          _e = ne + je + _e + P;
          break;
      }
      return w(_e);
    }
    return Tt.toString = function() {
      return L + "";
    }, Tt;
  }
  function O(L, F) {
    var V = Math.max(-8, Math.min(8, Math.floor(dd(F) / 3))) * 3, me = Math.pow(10, -V), ge = R((L = $y(L), L.type = "f", L), { suffix: K1[8 + V / 3] });
    return function(Se) {
      return ge(me * Se);
    };
  }
  return {
    format: R,
    formatPrefix: O
  };
}
var Ny, x_, C_;
WO({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function WO(u) {
  return Ny = YO(u), x_ = Ny.format, C_ = Ny.formatPrefix, Ny;
}
function QO(u) {
  return Math.max(0, -dd(Math.abs(u)));
}
function GO(u, c) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(dd(c) / 3))) * 3 - dd(Math.abs(u)));
}
function XO(u, c) {
  return u = Math.abs(u), c = Math.abs(c) - u, Math.max(0, dd(c) - dd(u)) + 1;
}
function qO(u, c, d, y) {
  var S = ZM(u, c, d), w;
  switch (y = $y(y ?? ",f"), y.type) {
    case "s": {
      var m = Math.max(Math.abs(u), Math.abs(c));
      return y.precision == null && !isNaN(w = GO(S, m)) && (y.precision = w), C_(y, m);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      y.precision == null && !isNaN(w = XO(S, Math.max(Math.abs(u), Math.abs(c)))) && (y.precision = w - (y.type === "e"));
      break;
    }
    case "f":
    case "%": {
      y.precision == null && !isNaN(w = QO(S)) && (y.precision = w - (y.type === "%") * 2);
      break;
    }
  }
  return x_(y);
}
function KO(u) {
  var c = u.domain;
  return u.ticks = function(d) {
    var y = c();
    return KM(y[0], y[y.length - 1], d ?? 10);
  }, u.tickFormat = function(d, y) {
    var S = c();
    return qO(S[0], S[S.length - 1], d ?? 10, y);
  }, u.nice = function(d) {
    d == null && (d = 10);
    var y = c(), S = 0, w = y.length - 1, m = y[S], b = y[w], k, R, O = 10;
    for (b < m && (R = m, m = b, b = R, R = S, S = w, w = R); O-- > 0; ) {
      if (R = xE(m, b, d), R === k)
        return y[S] = m, y[w] = b, c(y);
      if (R > 0)
        m = Math.floor(m / R) * R, b = Math.ceil(b / R) * R;
      else if (R < 0)
        m = Math.ceil(m * R) / R, b = Math.floor(b * R) / R;
      else
        break;
      k = R;
    }
    return u;
  }, u;
}
function UE() {
  var u = jO();
  return u.copy = function() {
    return UO(u, UE());
  }, JM.apply(u, arguments), KO(u);
}
var ZO = { value: () => {
} };
function FE() {
  for (var u = 0, c = arguments.length, d = {}, y; u < c; ++u) {
    if (!(y = arguments[u] + "") || y in d || /[\s.]/.test(y)) throw new Error("illegal type: " + y);
    d[y] = [];
  }
  return new Ay(d);
}
function Ay(u) {
  this._ = u;
}
function JO(u, c) {
  return u.trim().split(/^|\s+/).map(function(d) {
    var y = "", S = d.indexOf(".");
    if (S >= 0 && (y = d.slice(S + 1), d = d.slice(0, S)), d && !c.hasOwnProperty(d)) throw new Error("unknown type: " + d);
    return { type: d, name: y };
  });
}
Ay.prototype = FE.prototype = {
  constructor: Ay,
  on: function(u, c) {
    var d = this._, y = JO(u + "", d), S, w = -1, m = y.length;
    if (arguments.length < 2) {
      for (; ++w < m; ) if ((S = (u = y[w]).type) && (S = eN(d[S], u.name))) return S;
      return;
    }
    if (c != null && typeof c != "function") throw new Error("invalid callback: " + c);
    for (; ++w < m; )
      if (S = (u = y[w]).type) d[S] = Z1(d[S], u.name, c);
      else if (c == null) for (S in d) d[S] = Z1(d[S], u.name, null);
    return this;
  },
  copy: function() {
    var u = {}, c = this._;
    for (var d in c) u[d] = c[d].slice();
    return new Ay(u);
  },
  call: function(u, c) {
    if ((S = arguments.length - 2) > 0) for (var d = new Array(S), y = 0, S, w; y < S; ++y) d[y] = arguments[y + 2];
    if (!this._.hasOwnProperty(u)) throw new Error("unknown type: " + u);
    for (w = this._[u], y = 0, S = w.length; y < S; ++y) w[y].value.apply(c, d);
  },
  apply: function(u, c, d) {
    if (!this._.hasOwnProperty(u)) throw new Error("unknown type: " + u);
    for (var y = this._[u], S = 0, w = y.length; S < w; ++S) y[S].value.apply(c, d);
  }
};
function eN(u, c) {
  for (var d = 0, y = u.length, S; d < y; ++d)
    if ((S = u[d]).name === c)
      return S.value;
}
function Z1(u, c, d) {
  for (var y = 0, S = u.length; y < S; ++y)
    if (u[y].name === c) {
      u[y] = ZO, u = u.slice(0, y).concat(u.slice(y + 1));
      break;
    }
  return d != null && u.push({ name: c, value: d }), u;
}
var TE = "http://www.w3.org/1999/xhtml";
const J1 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: TE,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function qy(u) {
  var c = u += "", d = c.indexOf(":");
  return d >= 0 && (c = u.slice(0, d)) !== "xmlns" && (u = u.slice(d + 1)), J1.hasOwnProperty(c) ? { space: J1[c], local: u } : u;
}
function tN(u) {
  return function() {
    var c = this.ownerDocument, d = this.namespaceURI;
    return d === TE && c.documentElement.namespaceURI === TE ? c.createElement(u) : c.createElementNS(d, u);
  };
}
function nN(u) {
  return function() {
    return this.ownerDocument.createElementNS(u.space, u.local);
  };
}
function w_(u) {
  var c = qy(u);
  return (c.local ? nN : tN)(c);
}
function rN() {
}
function jE(u) {
  return u == null ? rN : function() {
    return this.querySelector(u);
  };
}
function aN(u) {
  typeof u != "function" && (u = jE(u));
  for (var c = this._groups, d = c.length, y = new Array(d), S = 0; S < d; ++S)
    for (var w = c[S], m = w.length, b = y[S] = new Array(m), k, R, O = 0; O < m; ++O)
      (k = w[O]) && (R = u.call(k, k.__data__, O, w)) && ("__data__" in k && (R.__data__ = k.__data__), b[O] = R);
  return new di(y, this._parents);
}
function iN(u) {
  return u == null ? [] : Array.isArray(u) ? u : Array.from(u);
}
function lN() {
  return [];
}
function __(u) {
  return u == null ? lN : function() {
    return this.querySelectorAll(u);
  };
}
function uN(u) {
  return function() {
    return iN(u.apply(this, arguments));
  };
}
function oN(u) {
  typeof u == "function" ? u = uN(u) : u = __(u);
  for (var c = this._groups, d = c.length, y = [], S = [], w = 0; w < d; ++w)
    for (var m = c[w], b = m.length, k, R = 0; R < b; ++R)
      (k = m[R]) && (y.push(u.call(k, k.__data__, R, m)), S.push(k));
  return new di(y, S);
}
function R_(u) {
  return function() {
    return this.matches(u);
  };
}
function T_(u) {
  return function(c) {
    return c.matches(u);
  };
}
var sN = Array.prototype.find;
function cN(u) {
  return function() {
    return sN.call(this.children, u);
  };
}
function fN() {
  return this.firstElementChild;
}
function dN(u) {
  return this.select(u == null ? fN : cN(typeof u == "function" ? u : T_(u)));
}
var pN = Array.prototype.filter;
function hN() {
  return Array.from(this.children);
}
function vN(u) {
  return function() {
    return pN.call(this.children, u);
  };
}
function mN(u) {
  return this.selectAll(u == null ? hN : vN(typeof u == "function" ? u : T_(u)));
}
function yN(u) {
  typeof u != "function" && (u = R_(u));
  for (var c = this._groups, d = c.length, y = new Array(d), S = 0; S < d; ++S)
    for (var w = c[S], m = w.length, b = y[S] = [], k, R = 0; R < m; ++R)
      (k = w[R]) && u.call(k, k.__data__, R, w) && b.push(k);
  return new di(y, this._parents);
}
function b_(u) {
  return new Array(u.length);
}
function gN() {
  return new di(this._enter || this._groups.map(b_), this._parents);
}
function Wy(u, c) {
  this.ownerDocument = u.ownerDocument, this.namespaceURI = u.namespaceURI, this._next = null, this._parent = u, this.__data__ = c;
}
Wy.prototype = {
  constructor: Wy,
  appendChild: function(u) {
    return this._parent.insertBefore(u, this._next);
  },
  insertBefore: function(u, c) {
    return this._parent.insertBefore(u, c);
  },
  querySelector: function(u) {
    return this._parent.querySelector(u);
  },
  querySelectorAll: function(u) {
    return this._parent.querySelectorAll(u);
  }
};
function SN(u) {
  return function() {
    return u;
  };
}
function EN(u, c, d, y, S, w) {
  for (var m = 0, b, k = c.length, R = w.length; m < R; ++m)
    (b = c[m]) ? (b.__data__ = w[m], y[m] = b) : d[m] = new Wy(u, w[m]);
  for (; m < k; ++m)
    (b = c[m]) && (S[m] = b);
}
function xN(u, c, d, y, S, w, m) {
  var b, k, R = /* @__PURE__ */ new Map(), O = c.length, L = w.length, F = new Array(O), V;
  for (b = 0; b < O; ++b)
    (k = c[b]) && (F[b] = V = m.call(k, k.__data__, b, c) + "", R.has(V) ? S[b] = k : R.set(V, k));
  for (b = 0; b < L; ++b)
    V = m.call(u, w[b], b, w) + "", (k = R.get(V)) ? (y[b] = k, k.__data__ = w[b], R.delete(V)) : d[b] = new Wy(u, w[b]);
  for (b = 0; b < O; ++b)
    (k = c[b]) && R.get(F[b]) === k && (S[b] = k);
}
function CN(u) {
  return u.__data__;
}
function wN(u, c) {
  if (!arguments.length) return Array.from(this, CN);
  var d = c ? xN : EN, y = this._parents, S = this._groups;
  typeof u != "function" && (u = SN(u));
  for (var w = S.length, m = new Array(w), b = new Array(w), k = new Array(w), R = 0; R < w; ++R) {
    var O = y[R], L = S[R], F = L.length, V = _N(u.call(O, O && O.__data__, R, y)), me = V.length, ge = b[R] = new Array(me), Se = m[R] = new Array(me), se = k[R] = new Array(F);
    d(O, L, ge, Se, se, V, c);
    for (var Pe = 0, pe = 0, De, xe; Pe < me; ++Pe)
      if (De = ge[Pe]) {
        for (Pe >= pe && (pe = Pe + 1); !(xe = Se[pe]) && ++pe < me; ) ;
        De._next = xe || null;
      }
  }
  return m = new di(m, y), m._enter = b, m._exit = k, m;
}
function _N(u) {
  return typeof u == "object" && "length" in u ? u : Array.from(u);
}
function RN() {
  return new di(this._exit || this._groups.map(b_), this._parents);
}
function TN(u, c, d) {
  var y = this.enter(), S = this, w = this.exit();
  return typeof u == "function" ? (y = u(y), y && (y = y.selection())) : y = y.append(u + ""), c != null && (S = c(S), S && (S = S.selection())), d == null ? w.remove() : d(w), y && S ? y.merge(S).order() : S;
}
function bN(u) {
  for (var c = u.selection ? u.selection() : u, d = this._groups, y = c._groups, S = d.length, w = y.length, m = Math.min(S, w), b = new Array(S), k = 0; k < m; ++k)
    for (var R = d[k], O = y[k], L = R.length, F = b[k] = new Array(L), V, me = 0; me < L; ++me)
      (V = R[me] || O[me]) && (F[me] = V);
  for (; k < S; ++k)
    b[k] = d[k];
  return new di(b, this._parents);
}
function kN() {
  for (var u = this._groups, c = -1, d = u.length; ++c < d; )
    for (var y = u[c], S = y.length - 1, w = y[S], m; --S >= 0; )
      (m = y[S]) && (w && m.compareDocumentPosition(w) ^ 4 && w.parentNode.insertBefore(m, w), w = m);
  return this;
}
function DN(u) {
  u || (u = MN);
  function c(L, F) {
    return L && F ? u(L.__data__, F.__data__) : !L - !F;
  }
  for (var d = this._groups, y = d.length, S = new Array(y), w = 0; w < y; ++w) {
    for (var m = d[w], b = m.length, k = S[w] = new Array(b), R, O = 0; O < b; ++O)
      (R = m[O]) && (k[O] = R);
    k.sort(c);
  }
  return new di(S, this._parents).order();
}
function MN(u, c) {
  return u < c ? -1 : u > c ? 1 : u >= c ? 0 : NaN;
}
function ON() {
  var u = arguments[0];
  return arguments[0] = this, u.apply(null, arguments), this;
}
function NN() {
  return Array.from(this);
}
function LN() {
  for (var u = this._groups, c = 0, d = u.length; c < d; ++c)
    for (var y = u[c], S = 0, w = y.length; S < w; ++S) {
      var m = y[S];
      if (m) return m;
    }
  return null;
}
function zN() {
  let u = 0;
  for (const c of this) ++u;
  return u;
}
function AN() {
  return !this.node();
}
function UN(u) {
  for (var c = this._groups, d = 0, y = c.length; d < y; ++d)
    for (var S = c[d], w = 0, m = S.length, b; w < m; ++w)
      (b = S[w]) && u.call(b, b.__data__, w, S);
  return this;
}
function FN(u) {
  return function() {
    this.removeAttribute(u);
  };
}
function jN(u) {
  return function() {
    this.removeAttributeNS(u.space, u.local);
  };
}
function HN(u, c) {
  return function() {
    this.setAttribute(u, c);
  };
}
function PN(u, c) {
  return function() {
    this.setAttributeNS(u.space, u.local, c);
  };
}
function VN(u, c) {
  return function() {
    var d = c.apply(this, arguments);
    d == null ? this.removeAttribute(u) : this.setAttribute(u, d);
  };
}
function BN(u, c) {
  return function() {
    var d = c.apply(this, arguments);
    d == null ? this.removeAttributeNS(u.space, u.local) : this.setAttributeNS(u.space, u.local, d);
  };
}
function IN(u, c) {
  var d = qy(u);
  if (arguments.length < 2) {
    var y = this.node();
    return d.local ? y.getAttributeNS(d.space, d.local) : y.getAttribute(d);
  }
  return this.each((c == null ? d.local ? jN : FN : typeof c == "function" ? d.local ? BN : VN : d.local ? PN : HN)(d, c));
}
function k_(u) {
  return u.ownerDocument && u.ownerDocument.defaultView || u.document && u || u.defaultView;
}
function $N(u) {
  return function() {
    this.style.removeProperty(u);
  };
}
function YN(u, c, d) {
  return function() {
    this.style.setProperty(u, c, d);
  };
}
function WN(u, c, d) {
  return function() {
    var y = c.apply(this, arguments);
    y == null ? this.style.removeProperty(u) : this.style.setProperty(u, y, d);
  };
}
function QN(u, c, d) {
  return arguments.length > 1 ? this.each((c == null ? $N : typeof c == "function" ? WN : YN)(u, c, d ?? "")) : pd(this.node(), u);
}
function pd(u, c) {
  return u.style.getPropertyValue(c) || k_(u).getComputedStyle(u, null).getPropertyValue(c);
}
function GN(u) {
  return function() {
    delete this[u];
  };
}
function XN(u, c) {
  return function() {
    this[u] = c;
  };
}
function qN(u, c) {
  return function() {
    var d = c.apply(this, arguments);
    d == null ? delete this[u] : this[u] = d;
  };
}
function KN(u, c) {
  return arguments.length > 1 ? this.each((c == null ? GN : typeof c == "function" ? qN : XN)(u, c)) : this.node()[u];
}
function D_(u) {
  return u.trim().split(/^|\s+/);
}
function HE(u) {
  return u.classList || new M_(u);
}
function M_(u) {
  this._node = u, this._names = D_(u.getAttribute("class") || "");
}
M_.prototype = {
  add: function(u) {
    var c = this._names.indexOf(u);
    c < 0 && (this._names.push(u), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(u) {
    var c = this._names.indexOf(u);
    c >= 0 && (this._names.splice(c, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(u) {
    return this._names.indexOf(u) >= 0;
  }
};
function O_(u, c) {
  for (var d = HE(u), y = -1, S = c.length; ++y < S; ) d.add(c[y]);
}
function N_(u, c) {
  for (var d = HE(u), y = -1, S = c.length; ++y < S; ) d.remove(c[y]);
}
function ZN(u) {
  return function() {
    O_(this, u);
  };
}
function JN(u) {
  return function() {
    N_(this, u);
  };
}
function eL(u, c) {
  return function() {
    (c.apply(this, arguments) ? O_ : N_)(this, u);
  };
}
function tL(u, c) {
  var d = D_(u + "");
  if (arguments.length < 2) {
    for (var y = HE(this.node()), S = -1, w = d.length; ++S < w; ) if (!y.contains(d[S])) return !1;
    return !0;
  }
  return this.each((typeof c == "function" ? eL : c ? ZN : JN)(d, c));
}
function nL() {
  this.textContent = "";
}
function rL(u) {
  return function() {
    this.textContent = u;
  };
}
function aL(u) {
  return function() {
    var c = u.apply(this, arguments);
    this.textContent = c ?? "";
  };
}
function iL(u) {
  return arguments.length ? this.each(u == null ? nL : (typeof u == "function" ? aL : rL)(u)) : this.node().textContent;
}
function lL() {
  this.innerHTML = "";
}
function uL(u) {
  return function() {
    this.innerHTML = u;
  };
}
function oL(u) {
  return function() {
    var c = u.apply(this, arguments);
    this.innerHTML = c ?? "";
  };
}
function sL(u) {
  return arguments.length ? this.each(u == null ? lL : (typeof u == "function" ? oL : uL)(u)) : this.node().innerHTML;
}
function cL() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function fL() {
  return this.each(cL);
}
function dL() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function pL() {
  return this.each(dL);
}
function hL(u) {
  var c = typeof u == "function" ? u : w_(u);
  return this.select(function() {
    return this.appendChild(c.apply(this, arguments));
  });
}
function vL() {
  return null;
}
function mL(u, c) {
  var d = typeof u == "function" ? u : w_(u), y = c == null ? vL : typeof c == "function" ? c : jE(c);
  return this.select(function() {
    return this.insertBefore(d.apply(this, arguments), y.apply(this, arguments) || null);
  });
}
function yL() {
  var u = this.parentNode;
  u && u.removeChild(this);
}
function gL() {
  return this.each(yL);
}
function SL() {
  var u = this.cloneNode(!1), c = this.parentNode;
  return c ? c.insertBefore(u, this.nextSibling) : u;
}
function EL() {
  var u = this.cloneNode(!0), c = this.parentNode;
  return c ? c.insertBefore(u, this.nextSibling) : u;
}
function xL(u) {
  return this.select(u ? EL : SL);
}
function CL(u) {
  return arguments.length ? this.property("__data__", u) : this.node().__data__;
}
function wL(u) {
  return function(c) {
    u.call(this, c, this.__data__);
  };
}
function _L(u) {
  return u.trim().split(/^|\s+/).map(function(c) {
    var d = "", y = c.indexOf(".");
    return y >= 0 && (d = c.slice(y + 1), c = c.slice(0, y)), { type: c, name: d };
  });
}
function RL(u) {
  return function() {
    var c = this.__on;
    if (c) {
      for (var d = 0, y = -1, S = c.length, w; d < S; ++d)
        w = c[d], (!u.type || w.type === u.type) && w.name === u.name ? this.removeEventListener(w.type, w.listener, w.options) : c[++y] = w;
      ++y ? c.length = y : delete this.__on;
    }
  };
}
function TL(u, c, d) {
  return function() {
    var y = this.__on, S, w = wL(c);
    if (y) {
      for (var m = 0, b = y.length; m < b; ++m)
        if ((S = y[m]).type === u.type && S.name === u.name) {
          this.removeEventListener(S.type, S.listener, S.options), this.addEventListener(S.type, S.listener = w, S.options = d), S.value = c;
          return;
        }
    }
    this.addEventListener(u.type, w, d), S = { type: u.type, name: u.name, value: c, listener: w, options: d }, y ? y.push(S) : this.__on = [S];
  };
}
function bL(u, c, d) {
  var y = _L(u + ""), S, w = y.length, m;
  if (arguments.length < 2) {
    var b = this.node().__on;
    if (b) {
      for (var k = 0, R = b.length, O; k < R; ++k)
        for (S = 0, O = b[k]; S < w; ++S)
          if ((m = y[S]).type === O.type && m.name === O.name)
            return O.value;
    }
    return;
  }
  for (b = c ? TL : RL, S = 0; S < w; ++S) this.each(b(y[S], c, d));
  return this;
}
function L_(u, c, d) {
  var y = k_(u), S = y.CustomEvent;
  typeof S == "function" ? S = new S(c, d) : (S = y.document.createEvent("Event"), d ? (S.initEvent(c, d.bubbles, d.cancelable), S.detail = d.detail) : S.initEvent(c, !1, !1)), u.dispatchEvent(S);
}
function kL(u, c) {
  return function() {
    return L_(this, u, c);
  };
}
function DL(u, c) {
  return function() {
    return L_(this, u, c.apply(this, arguments));
  };
}
function ML(u, c) {
  return this.each((typeof c == "function" ? DL : kL)(u, c));
}
function* OL() {
  for (var u = this._groups, c = 0, d = u.length; c < d; ++c)
    for (var y = u[c], S = 0, w = y.length, m; S < w; ++S)
      (m = y[S]) && (yield m);
}
var z_ = [null];
function di(u, c) {
  this._groups = u, this._parents = c;
}
function Lh() {
  return new di([[document.documentElement]], z_);
}
function NL() {
  return this;
}
di.prototype = Lh.prototype = {
  constructor: di,
  select: aN,
  selectAll: oN,
  selectChild: dN,
  selectChildren: mN,
  filter: yN,
  data: wN,
  enter: gN,
  exit: RN,
  join: TN,
  merge: bN,
  selection: NL,
  order: kN,
  sort: DN,
  call: ON,
  nodes: NN,
  node: LN,
  size: zN,
  empty: AN,
  each: UN,
  attr: IN,
  style: QN,
  property: KN,
  classed: tL,
  text: iL,
  html: sL,
  raise: fL,
  lower: pL,
  append: hL,
  insert: mL,
  remove: gL,
  clone: xL,
  datum: CL,
  on: bL,
  dispatch: ML,
  [Symbol.iterator]: OL
};
function Ya(u) {
  return typeof u == "string" ? new di([[document.querySelector(u)]], [document.documentElement]) : new di([[u]], z_);
}
function LL(u) {
  let c;
  for (; c = u.sourceEvent; ) u = c;
  return u;
}
function yc(u, c) {
  if (u = LL(u), c === void 0 && (c = u.currentTarget), c) {
    var d = c.ownerSVGElement || c;
    if (d.createSVGPoint) {
      var y = d.createSVGPoint();
      return y.x = u.clientX, y.y = u.clientY, y = y.matrixTransform(c.getScreenCTM().inverse()), [y.x, y.y];
    }
    if (c.getBoundingClientRect) {
      var S = c.getBoundingClientRect();
      return [u.clientX - S.left - c.clientLeft, u.clientY - S.top - c.clientTop];
    }
  }
  return [u.pageX, u.pageY];
}
const bE = { capture: !0, passive: !1 };
function kE(u) {
  u.preventDefault(), u.stopImmediatePropagation();
}
function zL(u) {
  var c = u.document.documentElement, d = Ya(u).on("dragstart.drag", kE, bE);
  "onselectstart" in c ? d.on("selectstart.drag", kE, bE) : (c.__noselect = c.style.MozUserSelect, c.style.MozUserSelect = "none");
}
function AL(u, c) {
  var d = u.document.documentElement, y = Ya(u).on("dragstart.drag", null);
  c && (y.on("click.drag", kE, bE), setTimeout(function() {
    y.on("click.drag", null);
  }, 0)), "onselectstart" in d ? y.on("selectstart.drag", null) : (d.style.MozUserSelect = d.__noselect, delete d.__noselect);
}
var hd = 0, Rh = 0, Ch = 0, A_ = 1e3, Qy, Th, Gy = 0, xc = 0, Ky = 0, Mh = typeof performance == "object" && performance.now ? performance : Date, U_ = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(u) {
  setTimeout(u, 17);
};
function PE() {
  return xc || (U_(UL), xc = Mh.now() + Ky);
}
function UL() {
  xc = 0;
}
function Xy() {
  this._call = this._time = this._next = null;
}
Xy.prototype = F_.prototype = {
  constructor: Xy,
  restart: function(u, c, d) {
    if (typeof u != "function") throw new TypeError("callback is not a function");
    d = (d == null ? PE() : +d) + (c == null ? 0 : +c), !this._next && Th !== this && (Th ? Th._next = this : Qy = this, Th = this), this._call = u, this._time = d, DE();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, DE());
  }
};
function F_(u, c, d) {
  var y = new Xy();
  return y.restart(u, c, d), y;
}
function FL() {
  PE(), ++hd;
  for (var u = Qy, c; u; )
    (c = xc - u._time) >= 0 && u._call.call(void 0, c), u = u._next;
  --hd;
}
function e_() {
  xc = (Gy = Mh.now()) + Ky, hd = Rh = 0;
  try {
    FL();
  } finally {
    hd = 0, HL(), xc = 0;
  }
}
function jL() {
  var u = Mh.now(), c = u - Gy;
  c > A_ && (Ky -= c, Gy = u);
}
function HL() {
  for (var u, c = Qy, d, y = 1 / 0; c; )
    c._call ? (y > c._time && (y = c._time), u = c, c = c._next) : (d = c._next, c._next = null, c = u ? u._next = d : Qy = d);
  Th = u, DE(y);
}
function DE(u) {
  if (!hd) {
    Rh && (Rh = clearTimeout(Rh));
    var c = u - xc;
    c > 24 ? (u < 1 / 0 && (Rh = setTimeout(e_, u - Mh.now() - Ky)), Ch && (Ch = clearInterval(Ch))) : (Ch || (Gy = Mh.now(), Ch = setInterval(jL, A_)), hd = 1, U_(e_));
  }
}
function t_(u, c, d) {
  var y = new Xy();
  return c = c == null ? 0 : +c, y.restart((S) => {
    y.stop(), u(S + c);
  }, c, d), y;
}
var PL = FE("start", "end", "cancel", "interrupt"), VL = [], j_ = 0, n_ = 1, ME = 2, Uy = 3, r_ = 4, OE = 5, Fy = 6;
function Zy(u, c, d, y, S, w) {
  var m = u.__transition;
  if (!m) u.__transition = {};
  else if (d in m) return;
  BL(u, d, {
    name: c,
    index: y,
    // For context during callback.
    group: S,
    // For context during callback.
    on: PL,
    tween: VL,
    time: w.time,
    delay: w.delay,
    duration: w.duration,
    ease: w.ease,
    timer: null,
    state: j_
  });
}
function VE(u, c) {
  var d = gl(u, c);
  if (d.state > j_) throw new Error("too late; already scheduled");
  return d;
}
function lu(u, c) {
  var d = gl(u, c);
  if (d.state > Uy) throw new Error("too late; already running");
  return d;
}
function gl(u, c) {
  var d = u.__transition;
  if (!d || !(d = d[c])) throw new Error("transition not found");
  return d;
}
function BL(u, c, d) {
  var y = u.__transition, S;
  y[c] = d, d.timer = F_(w, 0, d.time);
  function w(R) {
    d.state = n_, d.timer.restart(m, d.delay, d.time), d.delay <= R && m(R - d.delay);
  }
  function m(R) {
    var O, L, F, V;
    if (d.state !== n_) return k();
    for (O in y)
      if (V = y[O], V.name === d.name) {
        if (V.state === Uy) return t_(m);
        V.state === r_ ? (V.state = Fy, V.timer.stop(), V.on.call("interrupt", u, u.__data__, V.index, V.group), delete y[O]) : +O < c && (V.state = Fy, V.timer.stop(), V.on.call("cancel", u, u.__data__, V.index, V.group), delete y[O]);
      }
    if (t_(function() {
      d.state === Uy && (d.state = r_, d.timer.restart(b, d.delay, d.time), b(R));
    }), d.state = ME, d.on.call("start", u, u.__data__, d.index, d.group), d.state === ME) {
      for (d.state = Uy, S = new Array(F = d.tween.length), O = 0, L = -1; O < F; ++O)
        (V = d.tween[O].value.call(u, u.__data__, d.index, d.group)) && (S[++L] = V);
      S.length = L + 1;
    }
  }
  function b(R) {
    for (var O = R < d.duration ? d.ease.call(null, R / d.duration) : (d.timer.restart(k), d.state = OE, 1), L = -1, F = S.length; ++L < F; )
      S[L].call(u, O);
    d.state === OE && (d.on.call("end", u, u.__data__, d.index, d.group), k());
  }
  function k() {
    d.state = Fy, d.timer.stop(), delete y[c];
    for (var R in y) return;
    delete u.__transition;
  }
}
function jy(u, c) {
  var d = u.__transition, y, S, w = !0, m;
  if (d) {
    c = c == null ? null : c + "";
    for (m in d) {
      if ((y = d[m]).name !== c) {
        w = !1;
        continue;
      }
      S = y.state > ME && y.state < OE, y.state = Fy, y.timer.stop(), y.on.call(S ? "interrupt" : "cancel", u, u.__data__, y.index, y.group), delete d[m];
    }
    w && delete u.__transition;
  }
}
function IL(u) {
  return this.each(function() {
    jy(this, u);
  });
}
function $L(u, c) {
  var d, y;
  return function() {
    var S = lu(this, u), w = S.tween;
    if (w !== d) {
      y = d = w;
      for (var m = 0, b = y.length; m < b; ++m)
        if (y[m].name === c) {
          y = y.slice(), y.splice(m, 1);
          break;
        }
    }
    S.tween = y;
  };
}
function YL(u, c, d) {
  var y, S;
  if (typeof d != "function") throw new Error();
  return function() {
    var w = lu(this, u), m = w.tween;
    if (m !== y) {
      S = (y = m).slice();
      for (var b = { name: c, value: d }, k = 0, R = S.length; k < R; ++k)
        if (S[k].name === c) {
          S[k] = b;
          break;
        }
      k === R && S.push(b);
    }
    w.tween = S;
  };
}
function WL(u, c) {
  var d = this._id;
  if (u += "", arguments.length < 2) {
    for (var y = gl(this.node(), d).tween, S = 0, w = y.length, m; S < w; ++S)
      if ((m = y[S]).name === u)
        return m.value;
    return null;
  }
  return this.each((c == null ? $L : YL)(d, u, c));
}
function BE(u, c, d) {
  var y = u._id;
  return u.each(function() {
    var S = lu(this, y);
    (S.value || (S.value = {}))[c] = d.apply(this, arguments);
  }), function(S) {
    return gl(S, y).value[c];
  };
}
function H_(u, c) {
  var d;
  return (typeof c == "number" ? ml : c instanceof Ec ? By : (d = Ec(c)) ? (c = d, By) : g_)(u, c);
}
function QL(u) {
  return function() {
    this.removeAttribute(u);
  };
}
function GL(u) {
  return function() {
    this.removeAttributeNS(u.space, u.local);
  };
}
function XL(u, c, d) {
  var y, S = d + "", w;
  return function() {
    var m = this.getAttribute(u);
    return m === S ? null : m === y ? w : w = c(y = m, d);
  };
}
function qL(u, c, d) {
  var y, S = d + "", w;
  return function() {
    var m = this.getAttributeNS(u.space, u.local);
    return m === S ? null : m === y ? w : w = c(y = m, d);
  };
}
function KL(u, c, d) {
  var y, S, w;
  return function() {
    var m, b = d(this), k;
    return b == null ? void this.removeAttribute(u) : (m = this.getAttribute(u), k = b + "", m === k ? null : m === y && k === S ? w : (S = k, w = c(y = m, b)));
  };
}
function ZL(u, c, d) {
  var y, S, w;
  return function() {
    var m, b = d(this), k;
    return b == null ? void this.removeAttributeNS(u.space, u.local) : (m = this.getAttributeNS(u.space, u.local), k = b + "", m === k ? null : m === y && k === S ? w : (S = k, w = c(y = m, b)));
  };
}
function JL(u, c) {
  var d = qy(u), y = d === "transform" ? TO : H_;
  return this.attrTween(u, typeof c == "function" ? (d.local ? ZL : KL)(d, y, BE(this, "attr." + u, c)) : c == null ? (d.local ? GL : QL)(d) : (d.local ? qL : XL)(d, y, c));
}
function e2(u, c) {
  return function(d) {
    this.setAttribute(u, c.call(this, d));
  };
}
function t2(u, c) {
  return function(d) {
    this.setAttributeNS(u.space, u.local, c.call(this, d));
  };
}
function n2(u, c) {
  var d, y;
  function S() {
    var w = c.apply(this, arguments);
    return w !== y && (d = (y = w) && t2(u, w)), d;
  }
  return S._value = c, S;
}
function r2(u, c) {
  var d, y;
  function S() {
    var w = c.apply(this, arguments);
    return w !== y && (d = (y = w) && e2(u, w)), d;
  }
  return S._value = c, S;
}
function a2(u, c) {
  var d = "attr." + u;
  if (arguments.length < 2) return (d = this.tween(d)) && d._value;
  if (c == null) return this.tween(d, null);
  if (typeof c != "function") throw new Error();
  var y = qy(u);
  return this.tween(d, (y.local ? n2 : r2)(y, c));
}
function i2(u, c) {
  return function() {
    VE(this, u).delay = +c.apply(this, arguments);
  };
}
function l2(u, c) {
  return c = +c, function() {
    VE(this, u).delay = c;
  };
}
function u2(u) {
  var c = this._id;
  return arguments.length ? this.each((typeof u == "function" ? i2 : l2)(c, u)) : gl(this.node(), c).delay;
}
function o2(u, c) {
  return function() {
    lu(this, u).duration = +c.apply(this, arguments);
  };
}
function s2(u, c) {
  return c = +c, function() {
    lu(this, u).duration = c;
  };
}
function c2(u) {
  var c = this._id;
  return arguments.length ? this.each((typeof u == "function" ? o2 : s2)(c, u)) : gl(this.node(), c).duration;
}
function f2(u, c) {
  if (typeof c != "function") throw new Error();
  return function() {
    lu(this, u).ease = c;
  };
}
function d2(u) {
  var c = this._id;
  return arguments.length ? this.each(f2(c, u)) : gl(this.node(), c).ease;
}
function p2(u, c) {
  return function() {
    var d = c.apply(this, arguments);
    if (typeof d != "function") throw new Error();
    lu(this, u).ease = d;
  };
}
function h2(u) {
  if (typeof u != "function") throw new Error();
  return this.each(p2(this._id, u));
}
function v2(u) {
  typeof u != "function" && (u = R_(u));
  for (var c = this._groups, d = c.length, y = new Array(d), S = 0; S < d; ++S)
    for (var w = c[S], m = w.length, b = y[S] = [], k, R = 0; R < m; ++R)
      (k = w[R]) && u.call(k, k.__data__, R, w) && b.push(k);
  return new ro(y, this._parents, this._name, this._id);
}
function m2(u) {
  if (u._id !== this._id) throw new Error();
  for (var c = this._groups, d = u._groups, y = c.length, S = d.length, w = Math.min(y, S), m = new Array(y), b = 0; b < w; ++b)
    for (var k = c[b], R = d[b], O = k.length, L = m[b] = new Array(O), F, V = 0; V < O; ++V)
      (F = k[V] || R[V]) && (L[V] = F);
  for (; b < y; ++b)
    m[b] = c[b];
  return new ro(m, this._parents, this._name, this._id);
}
function y2(u) {
  return (u + "").trim().split(/^|\s+/).every(function(c) {
    var d = c.indexOf(".");
    return d >= 0 && (c = c.slice(0, d)), !c || c === "start";
  });
}
function g2(u, c, d) {
  var y, S, w = y2(c) ? VE : lu;
  return function() {
    var m = w(this, u), b = m.on;
    b !== y && (S = (y = b).copy()).on(c, d), m.on = S;
  };
}
function S2(u, c) {
  var d = this._id;
  return arguments.length < 2 ? gl(this.node(), d).on.on(u) : this.each(g2(d, u, c));
}
function E2(u) {
  return function() {
    var c = this.parentNode;
    for (var d in this.__transition) if (+d !== u) return;
    c && c.removeChild(this);
  };
}
function x2() {
  return this.on("end.remove", E2(this._id));
}
function C2(u) {
  var c = this._name, d = this._id;
  typeof u != "function" && (u = jE(u));
  for (var y = this._groups, S = y.length, w = new Array(S), m = 0; m < S; ++m)
    for (var b = y[m], k = b.length, R = w[m] = new Array(k), O, L, F = 0; F < k; ++F)
      (O = b[F]) && (L = u.call(O, O.__data__, F, b)) && ("__data__" in O && (L.__data__ = O.__data__), R[F] = L, Zy(R[F], c, d, F, R, gl(O, d)));
  return new ro(w, this._parents, c, d);
}
function w2(u) {
  var c = this._name, d = this._id;
  typeof u != "function" && (u = __(u));
  for (var y = this._groups, S = y.length, w = [], m = [], b = 0; b < S; ++b)
    for (var k = y[b], R = k.length, O, L = 0; L < R; ++L)
      if (O = k[L]) {
        for (var F = u.call(O, O.__data__, L, k), V, me = gl(O, d), ge = 0, Se = F.length; ge < Se; ++ge)
          (V = F[ge]) && Zy(V, c, d, ge, F, me);
        w.push(F), m.push(O);
      }
  return new ro(w, m, c, d);
}
var _2 = Lh.prototype.constructor;
function R2() {
  return new _2(this._groups, this._parents);
}
function T2(u, c) {
  var d, y, S;
  return function() {
    var w = pd(this, u), m = (this.style.removeProperty(u), pd(this, u));
    return w === m ? null : w === d && m === y ? S : S = c(d = w, y = m);
  };
}
function P_(u) {
  return function() {
    this.style.removeProperty(u);
  };
}
function b2(u, c, d) {
  var y, S = d + "", w;
  return function() {
    var m = pd(this, u);
    return m === S ? null : m === y ? w : w = c(y = m, d);
  };
}
function k2(u, c, d) {
  var y, S, w;
  return function() {
    var m = pd(this, u), b = d(this), k = b + "";
    return b == null && (k = b = (this.style.removeProperty(u), pd(this, u))), m === k ? null : m === y && k === S ? w : (S = k, w = c(y = m, b));
  };
}
function D2(u, c) {
  var d, y, S, w = "style." + c, m = "end." + w, b;
  return function() {
    var k = lu(this, u), R = k.on, O = k.value[w] == null ? b || (b = P_(c)) : void 0;
    (R !== d || S !== O) && (y = (d = R).copy()).on(m, S = O), k.on = y;
  };
}
function M2(u, c, d) {
  var y = (u += "") == "transform" ? RO : H_;
  return c == null ? this.styleTween(u, T2(u, y)).on("end.style." + u, P_(u)) : typeof c == "function" ? this.styleTween(u, k2(u, y, BE(this, "style." + u, c))).each(D2(this._id, u)) : this.styleTween(u, b2(u, y, c), d).on("end.style." + u, null);
}
function O2(u, c, d) {
  return function(y) {
    this.style.setProperty(u, c.call(this, y), d);
  };
}
function N2(u, c, d) {
  var y, S;
  function w() {
    var m = c.apply(this, arguments);
    return m !== S && (y = (S = m) && O2(u, m, d)), y;
  }
  return w._value = c, w;
}
function L2(u, c, d) {
  var y = "style." + (u += "");
  if (arguments.length < 2) return (y = this.tween(y)) && y._value;
  if (c == null) return this.tween(y, null);
  if (typeof c != "function") throw new Error();
  return this.tween(y, N2(u, c, d ?? ""));
}
function z2(u) {
  return function() {
    this.textContent = u;
  };
}
function A2(u) {
  return function() {
    var c = u(this);
    this.textContent = c ?? "";
  };
}
function U2(u) {
  return this.tween("text", typeof u == "function" ? A2(BE(this, "text", u)) : z2(u == null ? "" : u + ""));
}
function F2(u) {
  return function(c) {
    this.textContent = u.call(this, c);
  };
}
function j2(u) {
  var c, d;
  function y() {
    var S = u.apply(this, arguments);
    return S !== d && (c = (d = S) && F2(S)), c;
  }
  return y._value = u, y;
}
function H2(u) {
  var c = "text";
  if (arguments.length < 1) return (c = this.tween(c)) && c._value;
  if (u == null) return this.tween(c, null);
  if (typeof u != "function") throw new Error();
  return this.tween(c, j2(u));
}
function P2() {
  for (var u = this._name, c = this._id, d = V_(), y = this._groups, S = y.length, w = 0; w < S; ++w)
    for (var m = y[w], b = m.length, k, R = 0; R < b; ++R)
      if (k = m[R]) {
        var O = gl(k, c);
        Zy(k, u, d, R, m, {
          time: O.time + O.delay + O.duration,
          delay: 0,
          duration: O.duration,
          ease: O.ease
        });
      }
  return new ro(y, this._parents, u, d);
}
function V2() {
  var u, c, d = this, y = d._id, S = d.size();
  return new Promise(function(w, m) {
    var b = { value: m }, k = { value: function() {
      --S === 0 && w();
    } };
    d.each(function() {
      var R = lu(this, y), O = R.on;
      O !== u && (c = (u = O).copy(), c._.cancel.push(b), c._.interrupt.push(b), c._.end.push(k)), R.on = c;
    }), S === 0 && w();
  });
}
var B2 = 0;
function ro(u, c, d, y) {
  this._groups = u, this._parents = c, this._name = d, this._id = y;
}
function V_() {
  return ++B2;
}
var to = Lh.prototype;
ro.prototype = {
  constructor: ro,
  select: C2,
  selectAll: w2,
  selectChild: to.selectChild,
  selectChildren: to.selectChildren,
  filter: v2,
  merge: m2,
  selection: R2,
  transition: P2,
  call: to.call,
  nodes: to.nodes,
  node: to.node,
  size: to.size,
  empty: to.empty,
  each: to.each,
  on: S2,
  attr: JL,
  attrTween: a2,
  style: M2,
  styleTween: L2,
  text: U2,
  textTween: H2,
  remove: x2,
  tween: WL,
  delay: u2,
  duration: c2,
  ease: d2,
  easeVarying: h2,
  end: V2,
  [Symbol.iterator]: to[Symbol.iterator]
};
function I2(u) {
  return ((u *= 2) <= 1 ? u * u * u : (u -= 2) * u * u + 2) / 2;
}
var $2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: I2
};
function Y2(u, c) {
  for (var d; !(d = u.__transition) || !(d = d[c]); )
    if (!(u = u.parentNode))
      throw new Error(`transition ${c} not found`);
  return d;
}
function W2(u) {
  var c, d;
  u instanceof ro ? (c = u._id, u = u._name) : (c = V_(), (d = $2).time = PE(), u = u == null ? null : u + "");
  for (var y = this._groups, S = y.length, w = 0; w < S; ++w)
    for (var m = y[w], b = m.length, k, R = 0; R < b; ++R)
      (k = m[R]) && Zy(k, u, c, R, m, d || Y2(k, c));
  return new ro(y, this._parents, u, c);
}
Lh.prototype.interrupt = IL;
Lh.prototype.transition = W2;
const Ly = (u) => () => u;
function Q2(u, {
  sourceEvent: c,
  target: d,
  transform: y,
  dispatch: S
}) {
  Object.defineProperties(this, {
    type: { value: u, enumerable: !0, configurable: !0 },
    sourceEvent: { value: c, enumerable: !0, configurable: !0 },
    target: { value: d, enumerable: !0, configurable: !0 },
    transform: { value: y, enumerable: !0, configurable: !0 },
    _: { value: S }
  });
}
function no(u, c, d) {
  this.k = u, this.x = c, this.y = d;
}
no.prototype = {
  constructor: no,
  scale: function(u) {
    return u === 1 ? this : new no(this.k * u, this.x, this.y);
  },
  translate: function(u, c) {
    return u === 0 & c === 0 ? this : new no(this.k, this.x + this.k * u, this.y + this.k * c);
  },
  apply: function(u) {
    return [u[0] * this.k + this.x, u[1] * this.k + this.y];
  },
  applyX: function(u) {
    return u * this.k + this.x;
  },
  applyY: function(u) {
    return u * this.k + this.y;
  },
  invert: function(u) {
    return [(u[0] - this.x) / this.k, (u[1] - this.y) / this.k];
  },
  invertX: function(u) {
    return (u - this.x) / this.k;
  },
  invertY: function(u) {
    return (u - this.y) / this.k;
  },
  rescaleX: function(u) {
    return u.copy().domain(u.range().map(this.invertX, this).map(u.invert, u));
  },
  rescaleY: function(u) {
    return u.copy().domain(u.range().map(this.invertY, this).map(u.invert, u));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var bh = new no(1, 0, 0);
no.prototype;
function SE(u) {
  u.stopImmediatePropagation();
}
function wh(u) {
  u.preventDefault(), u.stopImmediatePropagation();
}
function G2(u) {
  return (!u.ctrlKey || u.type === "wheel") && !u.button;
}
function X2() {
  var u = this;
  return u instanceof SVGElement ? (u = u.ownerSVGElement || u, u.hasAttribute("viewBox") ? (u = u.viewBox.baseVal, [[u.x, u.y], [u.x + u.width, u.y + u.height]]) : [[0, 0], [u.width.baseVal.value, u.height.baseVal.value]]) : [[0, 0], [u.clientWidth, u.clientHeight]];
}
function a_() {
  return this.__zoom || bh;
}
function q2(u) {
  return -u.deltaY * (u.deltaMode === 1 ? 0.05 : u.deltaMode ? 1 : 2e-3) * (u.ctrlKey ? 10 : 1);
}
function K2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Z2(u, c, d) {
  var y = u.invertX(c[0][0]) - d[0][0], S = u.invertX(c[1][0]) - d[1][0], w = u.invertY(c[0][1]) - d[0][1], m = u.invertY(c[1][1]) - d[1][1];
  return u.translate(
    S > y ? (y + S) / 2 : Math.min(0, y) || Math.max(0, S),
    m > w ? (w + m) / 2 : Math.min(0, w) || Math.max(0, m)
  );
}
function J2() {
  var u = G2, c = X2, d = Z2, y = q2, S = K2, w = [0, 1 / 0], m = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], b = 250, k = MO, R = FE("start", "zoom", "end"), O, L, F, V = 500, me = 150, ge = 0, Se = 10;
  function se(P) {
    P.property("__zoom", a_).on("wheel.zoom", kt, { passive: !1 }).on("mousedown.zoom", Et).on("dblclick.zoom", Mt).filter(S).on("touchstart.zoom", Tt).on("touchmove.zoom", _e).on("touchend.zoom touchcancel.zoom", je).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  se.transform = function(P, de, J, re) {
    var K = P.selection ? P.selection() : P;
    K.property("__zoom", a_), P !== K ? xe(P, de, J, re) : K.interrupt().each(function() {
      Me(this, arguments).event(re).start().zoom(null, typeof de == "function" ? de.apply(this, arguments) : de).end();
    });
  }, se.scaleBy = function(P, de, J, re) {
    se.scaleTo(P, function() {
      var K = this.__zoom.k, ue = typeof de == "function" ? de.apply(this, arguments) : de;
      return K * ue;
    }, J, re);
  }, se.scaleTo = function(P, de, J, re) {
    se.transform(P, function() {
      var K = c.apply(this, arguments), ue = this.__zoom, ne = J == null ? De(K) : typeof J == "function" ? J.apply(this, arguments) : J, z = ue.invert(ne), X = typeof de == "function" ? de.apply(this, arguments) : de;
      return d(pe(Pe(ue, X), ne, z), K, m);
    }, J, re);
  }, se.translateBy = function(P, de, J, re) {
    se.transform(P, function() {
      return d(this.__zoom.translate(
        typeof de == "function" ? de.apply(this, arguments) : de,
        typeof J == "function" ? J.apply(this, arguments) : J
      ), c.apply(this, arguments), m);
    }, null, re);
  }, se.translateTo = function(P, de, J, re, K) {
    se.transform(P, function() {
      var ue = c.apply(this, arguments), ne = this.__zoom, z = re == null ? De(ue) : typeof re == "function" ? re.apply(this, arguments) : re;
      return d(bh.translate(z[0], z[1]).scale(ne.k).translate(
        typeof de == "function" ? -de.apply(this, arguments) : -de,
        typeof J == "function" ? -J.apply(this, arguments) : -J
      ), ue, m);
    }, re, K);
  };
  function Pe(P, de) {
    return de = Math.max(w[0], Math.min(w[1], de)), de === P.k ? P : new no(de, P.x, P.y);
  }
  function pe(P, de, J) {
    var re = de[0] - J[0] * P.k, K = de[1] - J[1] * P.k;
    return re === P.x && K === P.y ? P : new no(P.k, re, K);
  }
  function De(P) {
    return [(+P[0][0] + +P[1][0]) / 2, (+P[0][1] + +P[1][1]) / 2];
  }
  function xe(P, de, J, re) {
    P.on("start.zoom", function() {
      Me(this, arguments).event(re).start();
    }).on("interrupt.zoom end.zoom", function() {
      Me(this, arguments).event(re).end();
    }).tween("zoom", function() {
      var K = this, ue = arguments, ne = Me(K, ue).event(re), z = c.apply(K, ue), X = J == null ? De(z) : typeof J == "function" ? J.apply(K, ue) : J, He = Math.max(z[1][0] - z[0][0], z[1][1] - z[0][1]), Re = K.__zoom, Ke = typeof de == "function" ? de.apply(K, ue) : de, Je = k(Re.invert(X).concat(He / Re.k), Ke.invert(X).concat(He / Ke.k));
      return function(Ge) {
        if (Ge === 1) Ge = Ke;
        else {
          var et = Je(Ge), pt = He / et[2];
          Ge = new no(pt, X[0] - et[0] * pt, X[1] - et[1] * pt);
        }
        ne.zoom(null, Ge);
      };
    });
  }
  function Me(P, de, J) {
    return !J && P.__zooming || new Ue(P, de);
  }
  function Ue(P, de) {
    this.that = P, this.args = de, this.active = 0, this.sourceEvent = null, this.extent = c.apply(P, de), this.taps = 0;
  }
  Ue.prototype = {
    event: function(P) {
      return P && (this.sourceEvent = P), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(P, de) {
      return this.mouse && P !== "mouse" && (this.mouse[1] = de.invert(this.mouse[0])), this.touch0 && P !== "touch" && (this.touch0[1] = de.invert(this.touch0[0])), this.touch1 && P !== "touch" && (this.touch1[1] = de.invert(this.touch1[0])), this.that.__zoom = de, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(P) {
      var de = Ya(this.that).datum();
      R.call(
        P,
        this.that,
        new Q2(P, {
          sourceEvent: this.sourceEvent,
          target: se,
          transform: this.that.__zoom,
          dispatch: R
        }),
        de
      );
    }
  };
  function kt(P, ...de) {
    if (!u.apply(this, arguments)) return;
    var J = Me(this, de).event(P), re = this.__zoom, K = Math.max(w[0], Math.min(w[1], re.k * Math.pow(2, y.apply(this, arguments)))), ue = yc(P);
    if (J.wheel)
      (J.mouse[0][0] !== ue[0] || J.mouse[0][1] !== ue[1]) && (J.mouse[1] = re.invert(J.mouse[0] = ue)), clearTimeout(J.wheel);
    else {
      if (re.k === K) return;
      J.mouse = [ue, re.invert(ue)], jy(this), J.start();
    }
    wh(P), J.wheel = setTimeout(ne, me), J.zoom("mouse", d(pe(Pe(re, K), J.mouse[0], J.mouse[1]), J.extent, m));
    function ne() {
      J.wheel = null, J.end();
    }
  }
  function Et(P, ...de) {
    if (F || !u.apply(this, arguments)) return;
    var J = P.currentTarget, re = Me(this, de, !0).event(P), K = Ya(P.view).on("mousemove.zoom", X, !0).on("mouseup.zoom", He, !0), ue = yc(P, J), ne = P.clientX, z = P.clientY;
    zL(P.view), SE(P), re.mouse = [ue, this.__zoom.invert(ue)], jy(this), re.start();
    function X(Re) {
      if (wh(Re), !re.moved) {
        var Ke = Re.clientX - ne, Je = Re.clientY - z;
        re.moved = Ke * Ke + Je * Je > ge;
      }
      re.event(Re).zoom("mouse", d(pe(re.that.__zoom, re.mouse[0] = yc(Re, J), re.mouse[1]), re.extent, m));
    }
    function He(Re) {
      K.on("mousemove.zoom mouseup.zoom", null), AL(Re.view, re.moved), wh(Re), re.event(Re).end();
    }
  }
  function Mt(P, ...de) {
    if (u.apply(this, arguments)) {
      var J = this.__zoom, re = yc(P.changedTouches ? P.changedTouches[0] : P, this), K = J.invert(re), ue = J.k * (P.shiftKey ? 0.5 : 2), ne = d(pe(Pe(J, ue), re, K), c.apply(this, de), m);
      wh(P), b > 0 ? Ya(this).transition().duration(b).call(xe, ne, re, P) : Ya(this).call(se.transform, ne, re, P);
    }
  }
  function Tt(P, ...de) {
    if (u.apply(this, arguments)) {
      var J = P.touches, re = J.length, K = Me(this, de, P.changedTouches.length === re).event(P), ue, ne, z, X;
      for (SE(P), ne = 0; ne < re; ++ne)
        z = J[ne], X = yc(z, this), X = [X, this.__zoom.invert(X), z.identifier], K.touch0 ? !K.touch1 && K.touch0[2] !== X[2] && (K.touch1 = X, K.taps = 0) : (K.touch0 = X, ue = !0, K.taps = 1 + !!O);
      O && (O = clearTimeout(O)), ue && (K.taps < 2 && (L = X[0], O = setTimeout(function() {
        O = null;
      }, V)), jy(this), K.start());
    }
  }
  function _e(P, ...de) {
    if (this.__zooming) {
      var J = Me(this, de).event(P), re = P.changedTouches, K = re.length, ue, ne, z, X;
      for (wh(P), ue = 0; ue < K; ++ue)
        ne = re[ue], z = yc(ne, this), J.touch0 && J.touch0[2] === ne.identifier ? J.touch0[0] = z : J.touch1 && J.touch1[2] === ne.identifier && (J.touch1[0] = z);
      if (ne = J.that.__zoom, J.touch1) {
        var He = J.touch0[0], Re = J.touch0[1], Ke = J.touch1[0], Je = J.touch1[1], Ge = (Ge = Ke[0] - He[0]) * Ge + (Ge = Ke[1] - He[1]) * Ge, et = (et = Je[0] - Re[0]) * et + (et = Je[1] - Re[1]) * et;
        ne = Pe(ne, Math.sqrt(Ge / et)), z = [(He[0] + Ke[0]) / 2, (He[1] + Ke[1]) / 2], X = [(Re[0] + Je[0]) / 2, (Re[1] + Je[1]) / 2];
      } else if (J.touch0) z = J.touch0[0], X = J.touch0[1];
      else return;
      J.zoom("touch", d(pe(ne, z, X), J.extent, m));
    }
  }
  function je(P, ...de) {
    if (this.__zooming) {
      var J = Me(this, de).event(P), re = P.changedTouches, K = re.length, ue, ne;
      for (SE(P), F && clearTimeout(F), F = setTimeout(function() {
        F = null;
      }, V), ue = 0; ue < K; ++ue)
        ne = re[ue], J.touch0 && J.touch0[2] === ne.identifier ? delete J.touch0 : J.touch1 && J.touch1[2] === ne.identifier && delete J.touch1;
      if (J.touch1 && !J.touch0 && (J.touch0 = J.touch1, delete J.touch1), J.touch0) J.touch0[1] = this.__zoom.invert(J.touch0[0]);
      else if (J.end(), J.taps === 2 && (ne = yc(ne, this), Math.hypot(L[0] - ne[0], L[1] - ne[1]) < Se)) {
        var z = Ya(this).on("dblclick.zoom");
        z && z.apply(this, arguments);
      }
    }
  }
  return se.wheelDelta = function(P) {
    return arguments.length ? (y = typeof P == "function" ? P : Ly(+P), se) : y;
  }, se.filter = function(P) {
    return arguments.length ? (u = typeof P == "function" ? P : Ly(!!P), se) : u;
  }, se.touchable = function(P) {
    return arguments.length ? (S = typeof P == "function" ? P : Ly(!!P), se) : S;
  }, se.extent = function(P) {
    return arguments.length ? (c = typeof P == "function" ? P : Ly([[+P[0][0], +P[0][1]], [+P[1][0], +P[1][1]]]), se) : c;
  }, se.scaleExtent = function(P) {
    return arguments.length ? (w[0] = +P[0], w[1] = +P[1], se) : [w[0], w[1]];
  }, se.translateExtent = function(P) {
    return arguments.length ? (m[0][0] = +P[0][0], m[1][0] = +P[1][0], m[0][1] = +P[0][1], m[1][1] = +P[1][1], se) : [[m[0][0], m[0][1]], [m[1][0], m[1][1]]];
  }, se.constrain = function(P) {
    return arguments.length ? (d = P, se) : d;
  }, se.duration = function(P) {
    return arguments.length ? (b = +P, se) : b;
  }, se.interpolate = function(P) {
    return arguments.length ? (k = P, se) : k;
  }, se.on = function() {
    var P = R.on.apply(R, arguments);
    return P === R ? se : P;
  }, se.clickDistance = function(P) {
    return arguments.length ? (ge = (P = +P) * P, se) : Math.sqrt(ge);
  }, se.tapDistance = function(P) {
    return arguments.length ? (Se = +P, se) : Se;
  }, se;
}
var ez = 0.05;
function tz(u) {
  let c = 1 / 0, d = -1 / 0;
  for (let y of u) {
    if (y.visible === !1) continue;
    let [S, w] = h_(y.x);
    S < c && (c = S), w > d && (d = w);
  }
  return isFinite(c) ? [c, d] : [0, 1];
}
function nz(u) {
  let c = 1 / 0, d = -1 / 0;
  for (let S of u) {
    if (S.visible === !1) continue;
    let [w, m] = h_(S.y);
    w < c && (c = w), m > d && (d = m);
  }
  if (!isFinite(c)) return [0, 1];
  let y = (d - c) * ez;
  return [c - y, d + y];
}
function rz(u, c, d, y) {
  let S = c - d.left - d.right, w = y ? [u[1], u[0]] : u;
  return UE().domain(w).range([0, S]);
}
function az(u, c, d) {
  let y = c - d.top - d.bottom;
  return UE().domain(u).range([y, 0]);
}
var i_ = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#be185d", "#854d0e", "#4f46e5", "#65a30d"], iz = { background: "#ffffff", axisColor: "#374151", gridColor: "#e5e7eb", tickColor: "#6b7280", labelColor: "#111827", crosshairColor: "#9ca3af", regionFill: "rgba(37, 99, 235, 0.1)", regionStroke: "rgba(37, 99, 235, 0.4)", tooltipBg: "#ffffff", tooltipBorder: "#d1d5db", tooltipText: "#111827" }, lz = { background: "#111827", axisColor: "#d1d5db", gridColor: "#374151", tickColor: "#9ca3af", labelColor: "#f9fafb", crosshairColor: "#6b7280", regionFill: "rgba(96, 165, 250, 0.15)", regionStroke: "rgba(96, 165, 250, 0.5)", tooltipBg: "#1f2937", tooltipBorder: "#4b5563", tooltipText: "#f9fafb" };
function uz(u) {
  return i_[u % i_.length];
}
function oz(u) {
  return u === "dark" ? lz : iz;
}
var l_ = 1.5;
function sz(u) {
  let { plotWidth: c, plotHeight: d, xScale: y, yScale: S, scaleExtent: w = [1, 50], enabled: m = !0, onViewChange: b } = u, k = Rt.useRef(null), R = Rt.useRef(null), O = Rt.useRef(b);
  O.current = b;
  let L = Rt.useRef(w);
  L.current = w;
  let [F, V] = Rt.useState(bh), me = Rt.useMemo(() => F.rescaleX(y.copy()), [F, y]), ge = Rt.useMemo(() => F.rescaleY(S.copy()), [F, S]);
  Rt.useEffect(() => {
    let pe = k.current;
    if (!pe || !m) return;
    let De = J2().scaleExtent(L.current).extent([[0, 0], [c, d]]).translateExtent([[-1 / 0, -1 / 0], [1 / 0, 1 / 0]]).on("zoom", (xe) => {
      let Me = xe.transform;
      if (V(Me), O.current) {
        let Ue = Me.rescaleX(y.copy()), kt = Me.rescaleY(S.copy());
        O.current(Ue.domain(), kt.domain());
      }
    });
    return R.current = De, Ya(pe).call(De), Ya(pe).on("dblclick.zoom", () => {
      Ya(pe).transition().duration(300).call(De.transform, bh);
    }), () => {
      Ya(pe).on(".zoom", null);
    };
  }, [c, d, m, y, S]);
  let Se = Rt.useCallback(() => {
    !k.current || !R.current || Ya(k.current).transition().duration(300).call(R.current.transform, bh);
  }, []), se = Rt.useCallback(() => {
    !k.current || !R.current || Ya(k.current).transition().duration(200).call(R.current.scaleBy, l_);
  }, []), Pe = Rt.useCallback(() => {
    !k.current || !R.current || Ya(k.current).transition().duration(200).call(R.current.scaleBy, 1 / l_);
  }, []);
  return { zoomRef: k, state: { transform: F, isZoomed: F.k !== 1 || F.x !== 0 || F.y !== 0 }, zoomedXScale: me, zoomedYScale: ge, resetZoom: Se, zoomIn: se, zoomOut: Pe };
}
var cz = 1.5, fz = 2.5, dz = 2e3;
function pz(u, c, d) {
  u.clearRect(0, 0, c, d);
}
function hz(u, c, d, y, S, w, m) {
  let b = Math.max(Math.ceil(m), 1), k = S.range()[0], R = S.range()[1], O = Math.abs(R - k), L = Array.from({ length: b }, () => ({ minY: 1 / 0, maxY: -1 / 0, minYIdx: -1, maxYIdx: -1, firstIdx: -1, lastIdx: -1, count: 0 }));
  for (let V = d; V < y; V++) {
    let me = S(u[V]), ge = Math.min(Math.max(Math.floor((me - Math.min(k, R)) / O * b), 0), b - 1), Se = c[V], se = L[ge];
    se.count === 0 && (se.firstIdx = V), se.lastIdx = V, Se < se.minY && (se.minY = Se, se.minYIdx = V), Se > se.maxY && (se.maxY = Se, se.maxYIdx = V), se.count++;
  }
  let F = [];
  for (let V of L) {
    if (V.count === 0) continue;
    if (V.count === 1) {
      F.push({ px: S(u[V.firstIdx]), py: w(c[V.firstIdx]) });
      continue;
    }
    let me = [V.firstIdx, V.minYIdx, V.maxYIdx, V.lastIdx], ge = [...new Set(me)].sort((Se, se) => Se - se);
    for (let Se of ge) F.push({ px: S(u[Se]), py: w(c[Se]) });
  }
  return F;
}
function vz(u, c, d, y, S, w, m) {
  let { highlighted: b = !1, opacity: k = 1 } = m ?? {}, R = Math.min(c.x.length, c.y.length);
  if (R < 2) return;
  let O = c.color ?? uz(d), L = b ? fz : cz, [F, V] = y.domain(), me = Math.min(F, V), ge = Math.max(F, V), Se = 0, se = R;
  for (let pe = 0; pe < R; pe++) if (c.x[pe] >= me || pe < R - 1 && c.x[pe + 1] >= me) {
    Se = Math.max(0, pe - 1);
    break;
  }
  for (let pe = R - 1; pe >= 0; pe--) if (c.x[pe] <= ge || pe > 0 && c.x[pe - 1] <= ge) {
    se = Math.min(R, pe + 2);
    break;
  }
  let Pe = se - Se;
  if (u.save(), u.beginPath(), u.strokeStyle = O, u.lineWidth = L, u.globalAlpha = k, u.lineJoin = "round", Pe > dz) {
    let pe = hz(c.x, c.y, Se, se, y, S, w);
    if (pe.length > 0) {
      u.moveTo(pe[0].px, pe[0].py);
      for (let De = 1; De < pe.length; De++) u.lineTo(pe[De].px, pe[De].py);
    }
  } else {
    let pe = !1;
    for (let De = Se; De < se; De++) {
      let xe = y(c.x[De]), Me = S(c.y[De]);
      pe ? u.lineTo(xe, Me) : (u.moveTo(xe, Me), pe = !0);
    }
  }
  u.stroke(), u.restore();
}
function mz(u, c, d, y, S, w, m) {
  pz(u, S, w), c.forEach((b, k) => {
    b.visible !== !1 && vz(u, b, k, d, y, S, { highlighted: b.id === m, opacity: m && b.id !== m ? 0.3 : 1 });
  });
}
var yz = Rt.forwardRef(function({ spectra: u, xScale: c, yScale: d, width: y, height: S, highlightedId: w }, m) {
  let b = Rt.useRef(null), k = Rt.useRef(1);
  return Rt.useImperativeHandle(m, () => b.current, []), Rt.useEffect(() => {
    let R = b.current;
    if (!R) return;
    let O = window.devicePixelRatio || 1;
    k.current = O, R.width = y * O, R.height = S * O;
  }, [y, S]), Rt.useEffect(() => {
    let R = b.current;
    if (!R) return;
    let O = R.getContext("2d");
    if (!O) return;
    let L = k.current;
    O.setTransform(L, 0, 0, L, 0, 0), mz(O, u, c, d, y, S, w);
  }, [u, c, d, y, S, w]), Ze.jsx("canvas", { ref: b, style: { width: y, height: S, position: "absolute", top: 0, left: 0, pointerEvents: "none" } });
});
function u_(u, c) {
  let [d, y] = u.domain(), S = Math.min(d, y), w = (Math.max(d, y) - S) / (c - 1);
  return Array.from({ length: c }, (m, b) => S + b * w);
}
function o_(u) {
  return Math.abs(u) >= 1e3 ? Math.round(u).toString() : Math.abs(u) >= 1 ? u.toFixed(1) : Math.abs(u) >= 0.01 ? u.toFixed(3) : u.toExponential(1);
}
function gz({ xScale: u, yScale: c, width: d, height: y, xLabel: S, yLabel: w, showGrid: m = !0, colors: b }) {
  let k = u_(u, 8), R = u_(c, 6);
  return Ze.jsxs("g", { children: [m && Ze.jsxs("g", { children: [k.map((O) => Ze.jsx("line", { x1: u(O), x2: u(O), y1: 0, y2: y, stroke: b.gridColor, strokeWidth: 0.5 }, `xgrid-${O}`)), R.map((O) => Ze.jsx("line", { x1: 0, x2: d, y1: c(O), y2: c(O), stroke: b.gridColor, strokeWidth: 0.5 }, `ygrid-${O}`))] }), Ze.jsxs("g", { transform: `translate(0, ${y})`, children: [Ze.jsx("line", { x1: 0, x2: d, y1: 0, y2: 0, stroke: b.axisColor }), k.map((O) => Ze.jsxs("g", { transform: `translate(${u(O)}, 0)`, children: [Ze.jsx("line", { y1: 0, y2: 6, stroke: b.axisColor }), Ze.jsx("text", { y: 20, textAnchor: "middle", fill: b.tickColor, fontSize: 11, fontFamily: "system-ui, sans-serif", children: o_(O) })] }, `xtick-${O}`)), S && Ze.jsx("text", { x: d / 2, y: 42, textAnchor: "middle", fill: b.labelColor, fontSize: 13, fontFamily: "system-ui, sans-serif", children: S })] }), Ze.jsxs("g", { children: [Ze.jsx("line", { x1: 0, x2: 0, y1: 0, y2: y, stroke: b.axisColor }), R.map((O) => Ze.jsxs("g", { transform: `translate(0, ${c(O)})`, children: [Ze.jsx("line", { x1: -6, x2: 0, stroke: b.axisColor }), Ze.jsx("text", { x: -10, textAnchor: "end", dominantBaseline: "middle", fill: b.tickColor, fontSize: 11, fontFamily: "system-ui, sans-serif", children: o_(O) })] }, `ytick-${O}`)), w && Ze.jsx("text", { transform: `translate(-50, ${y / 2}) rotate(-90)`, textAnchor: "middle", fill: b.labelColor, fontSize: 13, fontFamily: "system-ui, sans-serif", children: w })] })] });
}
function Sz({ peaks: u, xScale: c, yScale: d, colors: y, onPeakClick: S }) {
  let [w, m] = c.domain(), b = Math.min(w, m), k = Math.max(w, m), R = u.filter((O) => O.x >= b && O.x <= k);
  return Ze.jsx("g", { className: "spectraview-peaks", children: R.map((O, L) => {
    let F = c(O.x), V = d(O.y);
    return Ze.jsxs("g", { transform: `translate(${F}, ${V})`, style: { cursor: S ? "pointer" : "default" }, onClick: () => S == null ? void 0 : S(O), children: [Ze.jsx("polygon", { points: `0,-5 -5,${-5 * 2.5} 5,${-5 * 2.5}`, fill: y.labelColor, opacity: 0.8 }), O.label && Ze.jsx("text", { y: -5 * 2.5 - 14, textAnchor: "middle", fill: y.labelColor, fontSize: 10, fontFamily: "system-ui, sans-serif", fontWeight: 500, children: O.label })] }, `peak-${O.x}-${L}`);
  }) });
}
function Ez({ regions: u, xScale: c, height: d, colors: y }) {
  return Ze.jsx("g", { className: "spectraview-regions", children: u.map((S, w) => {
    let m = c(S.xStart), b = c(S.xEnd), k = Math.min(m, b), R = Math.abs(b - m);
    return Ze.jsxs("g", { children: [Ze.jsx("rect", { x: k, y: 0, width: R, height: d, fill: S.color ?? y.regionFill, stroke: y.regionStroke, strokeWidth: 1 }), S.label && Ze.jsx("text", { x: k + R / 2, y: 12, textAnchor: "middle", fill: y.labelColor, fontSize: 10, fontFamily: "system-ui, sans-serif", children: S.label })] }, `region-${w}`);
  }) });
}
function xz({ position: u, width: c, height: d, colors: y }) {
  return u ? Ze.jsxs("g", { className: "spectraview-crosshair", pointerEvents: "none", children: [Ze.jsx("line", { x1: u.px, x2: u.px, y1: 0, y2: d, stroke: y.crosshairColor, strokeWidth: 1, strokeDasharray: "4 4" }), Ze.jsx("line", { x1: 0, x2: c, y1: u.py, y2: u.py, stroke: y.crosshairColor, strokeWidth: 1, strokeDasharray: "4 4" }), Ze.jsxs("g", { transform: `translate(${Math.min(u.px + 10, c - 100)}, ${Math.max(u.py - 10, 20)})`, children: [Ze.jsx("rect", { x: 0, y: -14, width: 90, height: 18, rx: 3, fill: y.tooltipBg, stroke: y.tooltipBorder, strokeWidth: 0.5, opacity: 0.9 }), Ze.jsxs("text", { x: 5, y: 0, fill: y.tooltipText, fontSize: 10, fontFamily: "monospace", children: [s_(u.dataX), ", ", s_(u.dataY)] })] })] }) : null;
}
function s_(u) {
  return Math.abs(u) >= 100 ? Math.round(u).toString() : Math.abs(u) >= 1 ? u.toFixed(1) : u.toFixed(4);
}
var EE = (u) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, border: `1px solid ${u === "dark" ? "#4b5563" : "#d1d5db"}`, borderRadius: 4, background: u === "dark" ? "#1f2937" : "#ffffff", color: u === "dark" ? "#d1d5db" : "#374151", fontSize: 14, cursor: "pointer", padding: 0, lineHeight: 1 }), Cz = (u) => ({ display: "flex", gap: 4, padding: "4px 0", borderBottom: `1px solid ${u === "dark" ? "#374151" : "#e5e7eb"}` });
function wz({ onZoomIn: u, onZoomOut: c, onReset: d, isZoomed: y, theme: S }) {
  return Ze.jsxs("div", { style: Cz(S), className: "spectraview-toolbar", children: [Ze.jsx("button", { type: "button", style: EE(S), onClick: u, title: "Zoom in", "aria-label": "Zoom in", children: "+" }), Ze.jsx("button", { type: "button", style: EE(S), onClick: c, title: "Zoom out", "aria-label": "Zoom out", children: "−" }), Ze.jsx("button", { type: "button", style: { ...EE(S), opacity: y ? 1 : 0.4 }, onClick: d, disabled: !y, title: "Reset zoom", "aria-label": "Reset zoom", children: "↺" })] });
}
var _z = { top: 20, right: 20, bottom: 50, left: 65 }, Rz = 800, Tz = 400;
function bz(u) {
  return { width: u.width ?? Rz, height: u.height ?? Tz, reverseX: u.reverseX ?? !1, showGrid: u.showGrid ?? !0, showCrosshair: u.showCrosshair ?? !0, showToolbar: u.showToolbar ?? !0, displayMode: u.displayMode ?? "overlay", margin: { ..._z, ...u.margin }, theme: u.theme ?? "light" };
}
function kz(u, c, d) {
  let y = u[0];
  return { xLabel: c ?? (y == null ? void 0 : y.xUnit) ?? "x", yLabel: d ?? (y == null ? void 0 : y.yUnit) ?? "y" };
}
function Dz(u) {
  let { spectra: c, peaks: d = [], regions: y = [], onPeakClick: S, onViewChange: w, onCrosshairMove: m, canvasRef: b } = u, k = `spectraview-clip-${Rt.useId().replace(/:/g, "")}`, R = Rt.useMemo(() => bz(u), [u.width, u.height, u.reverseX, u.showGrid, u.showCrosshair, u.showToolbar, u.displayMode, u.margin, u.theme]), { width: O, height: L, margin: F, reverseX: V, theme: me } = R, ge = O - F.left - F.right, Se = L - F.top - F.bottom, se = Rt.useMemo(() => oz(me), [me]), Pe = Rt.useMemo(() => kz(c, u.xLabel, u.yLabel), [c, u.xLabel, u.yLabel]), pe = Rt.useMemo(() => tz(c), [c]), De = Rt.useMemo(() => nz(c), [c]), xe = Rt.useMemo(() => rz(pe, O, F, V), [pe, O, F, V]), Me = Rt.useMemo(() => az(De, L, F), [De, L, F]), Ue = Rt.useRef(w);
  Ue.current = w;
  let kt = Rt.useMemo(() => (X, He) => {
    var Re;
    (Re = Ue.current) == null || Re.call(Ue, { xDomain: X, yDomain: He });
  }, []), { zoomRef: Et, state: Mt, zoomedXScale: Tt, zoomedYScale: _e, resetZoom: je, zoomIn: P, zoomOut: de } = sz({ plotWidth: ge, plotHeight: Se, xScale: xe, yScale: Me, onViewChange: w ? kt : void 0 }), [J, re] = Rt.useState(null), K = Rt.useRef(m);
  K.current = m;
  let ue = Rt.useCallback((X) => {
    var et;
    if (!R.showCrosshair) return;
    let He = X.currentTarget.getBoundingClientRect(), Re = X.clientX - He.left, Ke = X.clientY - He.top, Je = Tt.invert(Re), Ge = _e.invert(Ke);
    re({ px: Re, py: Ke, dataX: Je, dataY: Ge }), (et = K.current) == null || et.call(K, Je, Ge);
  }, [Tt, _e, R.showCrosshair]), ne = Rt.useCallback(() => {
    re(null);
  }, []);
  if (c.length === 0) return Ze.jsx("div", { style: { width: O, height: L, display: "flex", alignItems: "center", justifyContent: "center", border: `1px dashed ${se.gridColor}`, borderRadius: 8, color: se.tickColor, fontFamily: "system-ui, sans-serif", fontSize: 14 }, className: u.className, children: "No spectra loaded" });
  let z = R.showToolbar ? 37 : 0;
  return Ze.jsxs("div", { style: { width: O, background: se.background, borderRadius: 4, overflow: "hidden" }, className: u.className, children: [R.showToolbar && Ze.jsx(wz, { onZoomIn: P, onZoomOut: de, onReset: je, isZoomed: Mt.isZoomed, theme: me }), Ze.jsxs("div", { style: { position: "relative", width: O, height: L - z }, children: [Ze.jsx("div", { style: { position: "absolute", top: F.top, left: F.left, width: ge, height: Se, overflow: "hidden" }, children: Ze.jsx(yz, { ref: b, spectra: c, xScale: Tt, yScale: _e, width: ge, height: Se }) }), Ze.jsx("svg", { width: O, height: L - z, style: { position: "absolute", top: 0, left: 0 }, children: Ze.jsxs("g", { transform: `translate(${F.left}, ${F.top})`, children: [Ze.jsx(gz, { xScale: Tt, yScale: _e, width: ge, height: Se, xLabel: Pe.xLabel, yLabel: Pe.yLabel, showGrid: R.showGrid, colors: se }), Ze.jsx("defs", { children: Ze.jsx("clipPath", { id: k, children: Ze.jsx("rect", { x: 0, y: 0, width: ge, height: Se }) }) }), Ze.jsxs("g", { clipPath: `url(#${k})`, children: [y.length > 0 && Ze.jsx(Ez, { regions: y, xScale: Tt, height: Se, colors: se }), d.length > 0 && Ze.jsx(Sz, { peaks: d, xScale: Tt, yScale: _e, colors: se, onPeakClick: S })] }), R.showCrosshair && Ze.jsx(xz, { position: J, width: ge, height: Se, colors: se }), Ze.jsx("rect", { ref: Et, x: 0, y: 0, width: ge, height: Se, fill: "transparent", style: { cursor: R.showCrosshair ? "crosshair" : "grab" }, onMouseMove: ue, onMouseLeave: ne })] }) })] })] });
}
function Mz(u) {
  if (u.byteLength < 4)
    return [];
  const c = new TextDecoder("utf-8");
  let d = 0;
  const y = u.getUint32(d, !0);
  d += 4;
  const S = [];
  for (let w = 0; w < y; w++) {
    const m = u.getUint32(d, !0);
    d += 4;
    const b = u.getUint32(d, !0);
    d += 4;
    const k = u.getUint32(d, !0);
    d += 4;
    const R = new Uint8Array(
      u.buffer,
      u.byteOffset + d,
      k
    ), O = c.decode(R);
    d += k;
    const L = new Float64Array(
      u.buffer.slice(
        u.byteOffset + d,
        u.byteOffset + d + m * 8
      )
    );
    d += m * 8;
    let F = null;
    b && (F = new Float64Array(
      u.buffer.slice(
        u.byteOffset + d,
        u.byteOffset + d + m * 8
      )
    ), d += m * 8), S.push({ label: O, intensities: L, wavenumbers: F });
  }
  return S;
}
function Oz(u) {
  return u.map((c, d) => {
    const y = c.intensities.length, S = c.wavenumbers ?? Float64Array.from({ length: y }, (w, m) => m);
    return {
      id: `spectrum-${d}`,
      label: c.label || `Spectrum ${d + 1}`,
      x: S,
      y: c.intensities,
      xUnit: "cm⁻¹",
      yUnit: "Absorbance",
      type: "IR",
      visible: !0
    };
  });
}
function c_(u, c) {
  const d = parseInt(u, 10);
  return Number.isFinite(d) ? d : c;
}
function Nz() {
  const [u] = sd("spectrum_data"), [c] = sd("width"), [d] = sd("height"), [y] = sd("x_reversed"), [S] = sd("show_grid"), [w] = sd("theme"), m = Rt.useMemo(() => !u || u.byteLength === 0 ? [] : Oz(Mz(u)), [u]), b = c_(c, 720), k = c_(d, 400);
  return m.length === 0 ? /* @__PURE__ */ Ze.jsxs(
    "div",
    {
      style: {
        width: c || "100%",
        height: d || "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #d1d5db",
        borderRadius: "8px",
        color: "#9ca3af",
        fontFamily: "system-ui, sans-serif",
        fontSize: "14px"
      },
      children: [
        "No spectrum data. Use",
        " ",
        /* @__PURE__ */ Ze.jsx("code", { style: { margin: "0 4px" }, children: "viewer.set_spectrum(spec)" }),
        " to add data."
      ]
    }
  ) : /* @__PURE__ */ Ze.jsx("div", { style: { width: c || "100%", height: d || "500px" }, children: /* @__PURE__ */ Ze.jsx(
    Dz,
    {
      spectra: m,
      width: b,
      height: k,
      reverseX: y,
      showGrid: S,
      showToolbar: !0,
      showCrosshair: !0,
      theme: w === "dark" ? "dark" : "light"
    }
  ) });
}
const Lz = BM(() => /* @__PURE__ */ Ze.jsx(Nz, {})), Fz = { render: Lz };
export {
  Fz as default
};
//# sourceMappingURL=index.js.map

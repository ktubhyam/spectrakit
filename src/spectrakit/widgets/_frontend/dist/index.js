var Ty = { exports: {} }, Eh = {}, ky = { exports: {} }, Dt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _w;
function jM() {
  if (_w) return Dt;
  _w = 1;
  var l = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), v = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), R = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.iterator;
  function z(A) {
    return A === null || typeof A != "object" ? null : (A = O && A[O] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var F = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, oe = Object.assign, ae = {};
  function ie(A, K, Be) {
    this.props = A, this.context = K, this.refs = ae, this.updater = Be || F;
  }
  ie.prototype.isReactComponent = {}, ie.prototype.setState = function(A, K) {
    if (typeof A != "object" && typeof A != "function" && A != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, A, K, "setState");
  }, ie.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function ue() {
  }
  ue.prototype = ie.prototype;
  function we(A, K, Be) {
    this.props = A, this.context = K, this.refs = ae, this.updater = Be || F;
  }
  var fe = we.prototype = new ue();
  fe.constructor = we, oe(fe, ie.prototype), fe.isPureReactComponent = !0;
  var Ne = Array.isArray, de = Object.prototype.hasOwnProperty, ge = { current: null }, xe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Xe(A, K, Be) {
    var Ae, et = {}, at = null, qe = null;
    if (K != null) for (Ae in K.ref !== void 0 && (qe = K.ref), K.key !== void 0 && (at = "" + K.key), K) de.call(K, Ae) && !xe.hasOwnProperty(Ae) && (et[Ae] = K[Ae]);
    var tt = arguments.length - 2;
    if (tt === 1) et.children = Be;
    else if (1 < tt) {
      for (var pt = Array(tt), jt = 0; jt < tt; jt++) pt[jt] = arguments[jt + 2];
      et.children = pt;
    }
    if (A && A.defaultProps) for (Ae in tt = A.defaultProps, tt) et[Ae] === void 0 && (et[Ae] = tt[Ae]);
    return { $$typeof: l, type: A, key: at, ref: qe, props: et, _owner: ge.current };
  }
  function lt(A, K) {
    return { $$typeof: l, type: A.type, key: K, ref: A.ref, props: A.props, _owner: A._owner };
  }
  function bt(A) {
    return typeof A == "object" && A !== null && A.$$typeof === l;
  }
  function Ut(A) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(Be) {
      return K[Be];
    });
  }
  var ze = /\/+/g;
  function Ve(A, K) {
    return typeof A == "object" && A !== null && A.key != null ? Ut("" + A.key) : K.toString(36);
  }
  function V(A, K, Be, Ae, et) {
    var at = typeof A;
    (at === "undefined" || at === "boolean") && (A = null);
    var qe = !1;
    if (A === null) qe = !0;
    else switch (at) {
      case "string":
      case "number":
        qe = !0;
        break;
      case "object":
        switch (A.$$typeof) {
          case l:
          case c:
            qe = !0;
        }
    }
    if (qe) return qe = A, et = et(qe), A = Ae === "" ? "." + Ve(qe, 0) : Ae, Ne(et) ? (Be = "", A != null && (Be = A.replace(ze, "$&/") + "/"), V(et, K, Be, "", function(jt) {
      return jt;
    })) : et != null && (bt(et) && (et = lt(et, Be + (!et.key || qe && qe.key === et.key ? "" : ("" + et.key).replace(ze, "$&/") + "/") + A)), K.push(et)), 1;
    if (qe = 0, Ae = Ae === "" ? "." : Ae + ":", Ne(A)) for (var tt = 0; tt < A.length; tt++) {
      at = A[tt];
      var pt = Ae + Ve(at, tt);
      qe += V(at, K, Be, pt, et);
    }
    else if (pt = z(A), typeof pt == "function") for (A = pt.call(A), tt = 0; !(at = A.next()).done; ) at = at.value, pt = Ae + Ve(at, tt++), qe += V(at, K, Be, pt, et);
    else if (at === "object") throw K = String(A), Error("Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead.");
    return qe;
  }
  function Se(A, K, Be) {
    if (A == null) return A;
    var Ae = [], et = 0;
    return V(A, Ae, "", "", function(at) {
      return K.call(Be, at, et++);
    }), Ae;
  }
  function J(A) {
    if (A._status === -1) {
      var K = A._result;
      K = K(), K.then(function(Be) {
        (A._status === 0 || A._status === -1) && (A._status = 1, A._result = Be);
      }, function(Be) {
        (A._status === 0 || A._status === -1) && (A._status = 2, A._result = Be);
      }), A._status === -1 && (A._status = 0, A._result = K);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var re = { current: null }, G = { transition: null }, ce = { ReactCurrentDispatcher: re, ReactCurrentBatchConfig: G, ReactCurrentOwner: ge };
  function ee() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return Dt.Children = { map: Se, forEach: function(A, K, Be) {
    Se(A, function() {
      K.apply(this, arguments);
    }, Be);
  }, count: function(A) {
    var K = 0;
    return Se(A, function() {
      K++;
    }), K;
  }, toArray: function(A) {
    return Se(A, function(K) {
      return K;
    }) || [];
  }, only: function(A) {
    if (!bt(A)) throw Error("React.Children.only expected to receive a single React element child.");
    return A;
  } }, Dt.Component = ie, Dt.Fragment = d, Dt.Profiler = g, Dt.PureComponent = we, Dt.StrictMode = y, Dt.Suspense = _, Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ce, Dt.act = ee, Dt.cloneElement = function(A, K, Be) {
    if (A == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + A + ".");
    var Ae = oe({}, A.props), et = A.key, at = A.ref, qe = A._owner;
    if (K != null) {
      if (K.ref !== void 0 && (at = K.ref, qe = ge.current), K.key !== void 0 && (et = "" + K.key), A.type && A.type.defaultProps) var tt = A.type.defaultProps;
      for (pt in K) de.call(K, pt) && !xe.hasOwnProperty(pt) && (Ae[pt] = K[pt] === void 0 && tt !== void 0 ? tt[pt] : K[pt]);
    }
    var pt = arguments.length - 2;
    if (pt === 1) Ae.children = Be;
    else if (1 < pt) {
      tt = Array(pt);
      for (var jt = 0; jt < pt; jt++) tt[jt] = arguments[jt + 2];
      Ae.children = tt;
    }
    return { $$typeof: l, type: A.type, key: et, ref: at, props: Ae, _owner: qe };
  }, Dt.createContext = function(A) {
    return A = { $$typeof: v, _currentValue: A, _currentValue2: A, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, A.Provider = { $$typeof: C, _context: A }, A.Consumer = A;
  }, Dt.createElement = Xe, Dt.createFactory = function(A) {
    var K = Xe.bind(null, A);
    return K.type = A, K;
  }, Dt.createRef = function() {
    return { current: null };
  }, Dt.forwardRef = function(A) {
    return { $$typeof: T, render: A };
  }, Dt.isValidElement = bt, Dt.lazy = function(A) {
    return { $$typeof: D, _payload: { _status: -1, _result: A }, _init: J };
  }, Dt.memo = function(A, K) {
    return { $$typeof: R, type: A, compare: K === void 0 ? null : K };
  }, Dt.startTransition = function(A) {
    var K = G.transition;
    G.transition = {};
    try {
      A();
    } finally {
      G.transition = K;
    }
  }, Dt.unstable_act = ee, Dt.useCallback = function(A, K) {
    return re.current.useCallback(A, K);
  }, Dt.useContext = function(A) {
    return re.current.useContext(A);
  }, Dt.useDebugValue = function() {
  }, Dt.useDeferredValue = function(A) {
    return re.current.useDeferredValue(A);
  }, Dt.useEffect = function(A, K) {
    return re.current.useEffect(A, K);
  }, Dt.useId = function() {
    return re.current.useId();
  }, Dt.useImperativeHandle = function(A, K, Be) {
    return re.current.useImperativeHandle(A, K, Be);
  }, Dt.useInsertionEffect = function(A, K) {
    return re.current.useInsertionEffect(A, K);
  }, Dt.useLayoutEffect = function(A, K) {
    return re.current.useLayoutEffect(A, K);
  }, Dt.useMemo = function(A, K) {
    return re.current.useMemo(A, K);
  }, Dt.useReducer = function(A, K, Be) {
    return re.current.useReducer(A, K, Be);
  }, Dt.useRef = function(A) {
    return re.current.useRef(A);
  }, Dt.useState = function(A) {
    return re.current.useState(A);
  }, Dt.useSyncExternalStore = function(A, K, Be) {
    return re.current.useSyncExternalStore(A, K, Be);
  }, Dt.useTransition = function() {
    return re.current.useTransition();
  }, Dt.version = "18.3.1", Dt;
}
var bh = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
bh.exports;
var Tw;
function HM() {
  return Tw || (Tw = 1, (function(l, c) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var d = "18.3.1", y = Symbol.for("react.element"), g = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), _ = Symbol.for("react.provider"), R = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), ae = Symbol.for("react.offscreen"), ie = Symbol.iterator, ue = "@@iterator";
      function we(E) {
        if (E === null || typeof E != "object")
          return null;
        var N = ie && E[ie] || E[ue];
        return typeof N == "function" ? N : null;
      }
      var fe = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ne = {
        transition: null
      }, de = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ge = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, xe = {}, Xe = null;
      function lt(E) {
        Xe = E;
      }
      xe.setExtraStackFrame = function(E) {
        Xe = E;
      }, xe.getCurrentStack = null, xe.getStackAddendum = function() {
        var E = "";
        Xe && (E += Xe);
        var N = xe.getCurrentStack;
        return N && (E += N() || ""), E;
      };
      var bt = !1, Ut = !1, ze = !1, Ve = !1, V = !1, Se = {
        ReactCurrentDispatcher: fe,
        ReactCurrentBatchConfig: Ne,
        ReactCurrentOwner: ge
      };
      Se.ReactDebugCurrentFrame = xe, Se.ReactCurrentActQueue = de;
      function J(E) {
        {
          for (var N = arguments.length, Q = new Array(N > 1 ? N - 1 : 0), Z = 1; Z < N; Z++)
            Q[Z - 1] = arguments[Z];
          G("warn", E, Q);
        }
      }
      function re(E) {
        {
          for (var N = arguments.length, Q = new Array(N > 1 ? N - 1 : 0), Z = 1; Z < N; Z++)
            Q[Z - 1] = arguments[Z];
          G("error", E, Q);
        }
      }
      function G(E, N, Q) {
        {
          var Z = Se.ReactDebugCurrentFrame, be = Z.getStackAddendum();
          be !== "" && (N += "%s", Q = Q.concat([be]));
          var nt = Q.map(function(Te) {
            return String(Te);
          });
          nt.unshift("Warning: " + N), Function.prototype.apply.call(console[E], console, nt);
        }
      }
      var ce = {};
      function ee(E, N) {
        {
          var Q = E.constructor, Z = Q && (Q.displayName || Q.name) || "ReactClass", be = Z + "." + N;
          if (ce[be])
            return;
          re("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", N, Z), ce[be] = !0;
        }
      }
      var A = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(E) {
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
        enqueueForceUpdate: function(E, N, Q) {
          ee(E, "forceUpdate");
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
        enqueueReplaceState: function(E, N, Q, Z) {
          ee(E, "replaceState");
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
        enqueueSetState: function(E, N, Q, Z) {
          ee(E, "setState");
        }
      }, K = Object.assign, Be = {};
      Object.freeze(Be);
      function Ae(E, N, Q) {
        this.props = E, this.context = N, this.refs = Be, this.updater = Q || A;
      }
      Ae.prototype.isReactComponent = {}, Ae.prototype.setState = function(E, N) {
        if (typeof E != "object" && typeof E != "function" && E != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, E, N, "setState");
      }, Ae.prototype.forceUpdate = function(E) {
        this.updater.enqueueForceUpdate(this, E, "forceUpdate");
      };
      {
        var et = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, at = function(E, N) {
          Object.defineProperty(Ae.prototype, E, {
            get: function() {
              J("%s(...) is deprecated in plain JavaScript React classes. %s", N[0], N[1]);
            }
          });
        };
        for (var qe in et)
          et.hasOwnProperty(qe) && at(qe, et[qe]);
      }
      function tt() {
      }
      tt.prototype = Ae.prototype;
      function pt(E, N, Q) {
        this.props = E, this.context = N, this.refs = Be, this.updater = Q || A;
      }
      var jt = pt.prototype = new tt();
      jt.constructor = pt, K(jt, Ae.prototype), jt.isPureReactComponent = !0;
      function _n() {
        var E = {
          current: null
        };
        return Object.seal(E), E;
      }
      var Gn = Array.isArray;
      function Ht(E) {
        return Gn(E);
      }
      function Fn(E) {
        {
          var N = typeof Symbol == "function" && Symbol.toStringTag, Q = N && E[Symbol.toStringTag] || E.constructor.name || "Object";
          return Q;
        }
      }
      function Tn(E) {
        try {
          return Dn(E), !1;
        } catch {
          return !0;
        }
      }
      function Dn(E) {
        return "" + E;
      }
      function wr(E) {
        if (Tn(E))
          return re("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Fn(E)), Dn(E);
      }
      function Ta(E, N, Q) {
        var Z = E.displayName;
        if (Z)
          return Z;
        var be = N.displayName || N.name || "";
        return be !== "" ? Q + "(" + be + ")" : Q;
      }
      function ur(E) {
        return E.displayName || "Context";
      }
      function rn(E) {
        if (E == null)
          return null;
        if (typeof E.tag == "number" && re("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof E == "function")
          return E.displayName || E.name || null;
        if (typeof E == "string")
          return E;
        switch (E) {
          case C:
            return "Fragment";
          case g:
            return "Portal";
          case T:
            return "Profiler";
          case v:
            return "StrictMode";
          case O:
            return "Suspense";
          case z:
            return "SuspenseList";
        }
        if (typeof E == "object")
          switch (E.$$typeof) {
            case R:
              var N = E;
              return ur(N) + ".Consumer";
            case _:
              var Q = E;
              return ur(Q._context) + ".Provider";
            case D:
              return Ta(E, E.render, "ForwardRef");
            case F:
              var Z = E.displayName || null;
              return Z !== null ? Z : rn(E.type) || "Memo";
            case oe: {
              var be = E, nt = be._payload, Te = be._init;
              try {
                return rn(Te(nt));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var ln = Object.prototype.hasOwnProperty, dn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, jn, Rr, yn;
      yn = {};
      function Xn(E) {
        if (ln.call(E, "ref")) {
          var N = Object.getOwnPropertyDescriptor(E, "ref").get;
          if (N && N.isReactWarning)
            return !1;
        }
        return E.ref !== void 0;
      }
      function br(E) {
        if (ln.call(E, "key")) {
          var N = Object.getOwnPropertyDescriptor(E, "key").get;
          if (N && N.isReactWarning)
            return !1;
        }
        return E.key !== void 0;
      }
      function Xr(E, N) {
        var Q = function() {
          jn || (jn = !0, re("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
        };
        Q.isReactWarning = !0, Object.defineProperty(E, "key", {
          get: Q,
          configurable: !0
        });
      }
      function pa(E, N) {
        var Q = function() {
          Rr || (Rr = !0, re("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
        };
        Q.isReactWarning = !0, Object.defineProperty(E, "ref", {
          get: Q,
          configurable: !0
        });
      }
      function Re(E) {
        if (typeof E.ref == "string" && ge.current && E.__self && ge.current.stateNode !== E.__self) {
          var N = rn(ge.current.type);
          yn[N] || (re('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N, E.ref), yn[N] = !0);
        }
      }
      var We = function(E, N, Q, Z, be, nt, Te) {
        var ut = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: y,
          // Built-in properties that belong on the element
          type: E,
          key: N,
          ref: Q,
          props: Te,
          // Record the component responsible for creating this element.
          _owner: nt
        };
        return ut._store = {}, Object.defineProperty(ut._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(ut, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Z
        }), Object.defineProperty(ut, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: be
        }), Object.freeze && (Object.freeze(ut.props), Object.freeze(ut)), ut;
      };
      function St(E, N, Q) {
        var Z, be = {}, nt = null, Te = null, ut = null, Tt = null;
        if (N != null) {
          Xn(N) && (Te = N.ref, Re(N)), br(N) && (wr(N.key), nt = "" + N.key), ut = N.__self === void 0 ? null : N.__self, Tt = N.__source === void 0 ? null : N.__source;
          for (Z in N)
            ln.call(N, Z) && !dn.hasOwnProperty(Z) && (be[Z] = N[Z]);
        }
        var At = arguments.length - 2;
        if (At === 1)
          be.children = Q;
        else if (At > 1) {
          for (var cn = Array(At), Zt = 0; Zt < At; Zt++)
            cn[Zt] = arguments[Zt + 2];
          Object.freeze && Object.freeze(cn), be.children = cn;
        }
        if (E && E.defaultProps) {
          var Ct = E.defaultProps;
          for (Z in Ct)
            be[Z] === void 0 && (be[Z] = Ct[Z]);
        }
        if (nt || Te) {
          var Jt = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
          nt && Xr(be, Jt), Te && pa(be, Jt);
        }
        return We(E, nt, Te, ut, Tt, ge.current, be);
      }
      function Wt(E, N) {
        var Q = We(E.type, N, E.ref, E._self, E._source, E._owner, E.props);
        return Q;
      }
      function un(E, N, Q) {
        if (E == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + E + ".");
        var Z, be = K({}, E.props), nt = E.key, Te = E.ref, ut = E._self, Tt = E._source, At = E._owner;
        if (N != null) {
          Xn(N) && (Te = N.ref, At = ge.current), br(N) && (wr(N.key), nt = "" + N.key);
          var cn;
          E.type && E.type.defaultProps && (cn = E.type.defaultProps);
          for (Z in N)
            ln.call(N, Z) && !dn.hasOwnProperty(Z) && (N[Z] === void 0 && cn !== void 0 ? be[Z] = cn[Z] : be[Z] = N[Z]);
        }
        var Zt = arguments.length - 2;
        if (Zt === 1)
          be.children = Q;
        else if (Zt > 1) {
          for (var Ct = Array(Zt), Jt = 0; Jt < Zt; Jt++)
            Ct[Jt] = arguments[Jt + 2];
          be.children = Ct;
        }
        return We(E.type, nt, Te, ut, Tt, At, be);
      }
      function xn(E) {
        return typeof E == "object" && E !== null && E.$$typeof === y;
      }
      var pn = ".", tr = ":";
      function on(E) {
        var N = /[=:]/g, Q = {
          "=": "=0",
          ":": "=2"
        }, Z = E.replace(N, function(be) {
          return Q[be];
        });
        return "$" + Z;
      }
      var Xt = !1, qt = /\/+/g;
      function ha(E) {
        return E.replace(qt, "$&/");
      }
      function _r(E, N) {
        return typeof E == "object" && E !== null && E.key != null ? (wr(E.key), on("" + E.key)) : N.toString(36);
      }
      function ka(E, N, Q, Z, be) {
        var nt = typeof E;
        (nt === "undefined" || nt === "boolean") && (E = null);
        var Te = !1;
        if (E === null)
          Te = !0;
        else
          switch (nt) {
            case "string":
            case "number":
              Te = !0;
              break;
            case "object":
              switch (E.$$typeof) {
                case y:
                case g:
                  Te = !0;
              }
          }
        if (Te) {
          var ut = E, Tt = be(ut), At = Z === "" ? pn + _r(ut, 0) : Z;
          if (Ht(Tt)) {
            var cn = "";
            At != null && (cn = ha(At) + "/"), ka(Tt, N, cn, "", function(Sd) {
              return Sd;
            });
          } else Tt != null && (xn(Tt) && (Tt.key && (!ut || ut.key !== Tt.key) && wr(Tt.key), Tt = Wt(
            Tt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            Q + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Tt.key && (!ut || ut.key !== Tt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              ha("" + Tt.key) + "/"
            ) : "") + At
          )), N.push(Tt));
          return 1;
        }
        var Zt, Ct, Jt = 0, En = Z === "" ? pn : Z + tr;
        if (Ht(E))
          for (var kl = 0; kl < E.length; kl++)
            Zt = E[kl], Ct = En + _r(Zt, kl), Jt += ka(Zt, N, Q, Ct, be);
        else {
          var ls = we(E);
          if (typeof ls == "function") {
            var Yi = E;
            ls === Yi.entries && (Xt || J("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Xt = !0);
            for (var us = ls.call(Yi), mu, gd = 0; !(mu = us.next()).done; )
              Zt = mu.value, Ct = En + _r(Zt, gd++), Jt += ka(Zt, N, Q, Ct, be);
          } else if (nt === "object") {
            var Rc = String(E);
            throw new Error("Objects are not valid as a React child (found: " + (Rc === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : Rc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Jt;
      }
      function Bi(E, N, Q) {
        if (E == null)
          return E;
        var Z = [], be = 0;
        return ka(E, Z, "", "", function(nt) {
          return N.call(Q, nt, be++);
        }), Z;
      }
      function uu(E) {
        var N = 0;
        return Bi(E, function() {
          N++;
        }), N;
      }
      function ou(E, N, Q) {
        Bi(E, function() {
          N.apply(this, arguments);
        }, Q);
      }
      function Sl(E) {
        return Bi(E, function(N) {
          return N;
        }) || [];
      }
      function xl(E) {
        if (!xn(E))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return E;
      }
      function su(E) {
        var N = {
          $$typeof: R,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: E,
          _currentValue2: E,
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
        N.Provider = {
          $$typeof: _,
          _context: N
        };
        var Q = !1, Z = !1, be = !1;
        {
          var nt = {
            $$typeof: R,
            _context: N
          };
          Object.defineProperties(nt, {
            Provider: {
              get: function() {
                return Z || (Z = !0, re("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), N.Provider;
              },
              set: function(Te) {
                N.Provider = Te;
              }
            },
            _currentValue: {
              get: function() {
                return N._currentValue;
              },
              set: function(Te) {
                N._currentValue = Te;
              }
            },
            _currentValue2: {
              get: function() {
                return N._currentValue2;
              },
              set: function(Te) {
                N._currentValue2 = Te;
              }
            },
            _threadCount: {
              get: function() {
                return N._threadCount;
              },
              set: function(Te) {
                N._threadCount = Te;
              }
            },
            Consumer: {
              get: function() {
                return Q || (Q = !0, re("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), N.Consumer;
              }
            },
            displayName: {
              get: function() {
                return N.displayName;
              },
              set: function(Te) {
                be || (J("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Te), be = !0);
              }
            }
          }), N.Consumer = nt;
        }
        return N._currentRenderer = null, N._currentRenderer2 = null, N;
      }
      var Or = -1, Nr = 0, or = 1, vi = 2;
      function Ka(E) {
        if (E._status === Or) {
          var N = E._result, Q = N();
          if (Q.then(function(nt) {
            if (E._status === Nr || E._status === Or) {
              var Te = E;
              Te._status = or, Te._result = nt;
            }
          }, function(nt) {
            if (E._status === Nr || E._status === Or) {
              var Te = E;
              Te._status = vi, Te._result = nt;
            }
          }), E._status === Or) {
            var Z = E;
            Z._status = Nr, Z._result = Q;
          }
        }
        if (E._status === or) {
          var be = E._result;
          return be === void 0 && re(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, be), "default" in be || re(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, be), be.default;
        } else
          throw E._result;
      }
      function mi(E) {
        var N = {
          // We use these fields to store the result.
          _status: Or,
          _result: E
        }, Q = {
          $$typeof: oe,
          _payload: N,
          _init: Ka
        };
        {
          var Z, be;
          Object.defineProperties(Q, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Z;
              },
              set: function(nt) {
                re("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Z = nt, Object.defineProperty(Q, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return be;
              },
              set: function(nt) {
                re("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), be = nt, Object.defineProperty(Q, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return Q;
      }
      function yi(E) {
        E != null && E.$$typeof === F ? re("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof E != "function" ? re("forwardRef requires a render function but was given %s.", E === null ? "null" : typeof E) : E.length !== 0 && E.length !== 2 && re("forwardRef render functions accept exactly two parameters: props and ref. %s", E.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), E != null && (E.defaultProps != null || E.propTypes != null) && re("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var N = {
          $$typeof: D,
          render: E
        };
        {
          var Q;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Q;
            },
            set: function(Z) {
              Q = Z, !E.name && !E.displayName && (E.displayName = Z);
            }
          });
        }
        return N;
      }
      var L;
      L = Symbol.for("react.module.reference");
      function pe(E) {
        return !!(typeof E == "string" || typeof E == "function" || E === C || E === T || V || E === v || E === O || E === z || Ve || E === ae || bt || Ut || ze || typeof E == "object" && E !== null && (E.$$typeof === oe || E.$$typeof === F || E.$$typeof === _ || E.$$typeof === R || E.$$typeof === D || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        E.$$typeof === L || E.getModuleId !== void 0));
      }
      function ke(E, N) {
        pe(E) || re("memo: The first argument must be a component. Instead received: %s", E === null ? "null" : typeof E);
        var Q = {
          $$typeof: F,
          type: E,
          compare: N === void 0 ? null : N
        };
        {
          var Z;
          Object.defineProperty(Q, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Z;
            },
            set: function(be) {
              Z = be, !E.name && !E.displayName && (E.displayName = be);
            }
          });
        }
        return Q;
      }
      function Pe() {
        var E = fe.current;
        return E === null && re(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), E;
      }
      function yt(E) {
        var N = Pe();
        if (E._context !== void 0) {
          var Q = E._context;
          Q.Consumer === E ? re("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : Q.Provider === E && re("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return N.useContext(E);
      }
      function ht(E) {
        var N = Pe();
        return N.useState(E);
      }
      function _t(E, N, Q) {
        var Z = Pe();
        return Z.useReducer(E, N, Q);
      }
      function wt(E) {
        var N = Pe();
        return N.useRef(E);
      }
      function Mn(E, N) {
        var Q = Pe();
        return Q.useEffect(E, N);
      }
      function sn(E, N) {
        var Q = Pe();
        return Q.useInsertionEffect(E, N);
      }
      function hn(E, N) {
        var Q = Pe();
        return Q.useLayoutEffect(E, N);
      }
      function sr(E, N) {
        var Q = Pe();
        return Q.useCallback(E, N);
      }
      function Za(E, N) {
        var Q = Pe();
        return Q.useMemo(E, N);
      }
      function Ja(E, N, Q) {
        var Z = Pe();
        return Z.useImperativeHandle(E, N, Q);
      }
      function gt(E, N) {
        {
          var Q = Pe();
          return Q.useDebugValue(E, N);
        }
      }
      function Et() {
        var E = Pe();
        return E.useTransition();
      }
      function ei(E) {
        var N = Pe();
        return N.useDeferredValue(E);
      }
      function cu() {
        var E = Pe();
        return E.useId();
      }
      function fu(E, N, Q) {
        var Z = Pe();
        return Z.useSyncExternalStore(E, N, Q);
      }
      var El = 0, ao, Cl, qr, ns, Lr, Cc, wc;
      function io() {
      }
      io.__reactDisabledLog = !0;
      function wl() {
        {
          if (El === 0) {
            ao = console.log, Cl = console.info, qr = console.warn, ns = console.error, Lr = console.group, Cc = console.groupCollapsed, wc = console.groupEnd;
            var E = {
              configurable: !0,
              enumerable: !0,
              value: io,
              writable: !0
            };
            Object.defineProperties(console, {
              info: E,
              log: E,
              warn: E,
              error: E,
              group: E,
              groupCollapsed: E,
              groupEnd: E
            });
          }
          El++;
        }
      }
      function va() {
        {
          if (El--, El === 0) {
            var E = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: K({}, E, {
                value: ao
              }),
              info: K({}, E, {
                value: Cl
              }),
              warn: K({}, E, {
                value: qr
              }),
              error: K({}, E, {
                value: ns
              }),
              group: K({}, E, {
                value: Lr
              }),
              groupCollapsed: K({}, E, {
                value: Cc
              }),
              groupEnd: K({}, E, {
                value: wc
              })
            });
          }
          El < 0 && re("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ti = Se.ReactCurrentDispatcher, ni;
      function lo(E, N, Q) {
        {
          if (ni === void 0)
            try {
              throw Error();
            } catch (be) {
              var Z = be.stack.trim().match(/\n( *(at )?)/);
              ni = Z && Z[1] || "";
            }
          return `
` + ni + E;
        }
      }
      var du = !1, Rl;
      {
        var uo = typeof WeakMap == "function" ? WeakMap : Map;
        Rl = new uo();
      }
      function oo(E, N) {
        if (!E || du)
          return "";
        {
          var Q = Rl.get(E);
          if (Q !== void 0)
            return Q;
        }
        var Z;
        du = !0;
        var be = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var nt;
        nt = ti.current, ti.current = null, wl();
        try {
          if (N) {
            var Te = function() {
              throw Error();
            };
            if (Object.defineProperty(Te.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Te, []);
              } catch (En) {
                Z = En;
              }
              Reflect.construct(E, [], Te);
            } else {
              try {
                Te.call();
              } catch (En) {
                Z = En;
              }
              E.call(Te.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (En) {
              Z = En;
            }
            E();
          }
        } catch (En) {
          if (En && Z && typeof En.stack == "string") {
            for (var ut = En.stack.split(`
`), Tt = Z.stack.split(`
`), At = ut.length - 1, cn = Tt.length - 1; At >= 1 && cn >= 0 && ut[At] !== Tt[cn]; )
              cn--;
            for (; At >= 1 && cn >= 0; At--, cn--)
              if (ut[At] !== Tt[cn]) {
                if (At !== 1 || cn !== 1)
                  do
                    if (At--, cn--, cn < 0 || ut[At] !== Tt[cn]) {
                      var Zt = `
` + ut[At].replace(" at new ", " at ");
                      return E.displayName && Zt.includes("<anonymous>") && (Zt = Zt.replace("<anonymous>", E.displayName)), typeof E == "function" && Rl.set(E, Zt), Zt;
                    }
                  while (At >= 1 && cn >= 0);
                break;
              }
          }
        } finally {
          du = !1, ti.current = nt, va(), Error.prepareStackTrace = be;
        }
        var Ct = E ? E.displayName || E.name : "", Jt = Ct ? lo(Ct) : "";
        return typeof E == "function" && Rl.set(E, Jt), Jt;
      }
      function $i(E, N, Q) {
        return oo(E, !1);
      }
      function md(E) {
        var N = E.prototype;
        return !!(N && N.isReactComponent);
      }
      function Ii(E, N, Q) {
        if (E == null)
          return "";
        if (typeof E == "function")
          return oo(E, md(E));
        if (typeof E == "string")
          return lo(E);
        switch (E) {
          case O:
            return lo("Suspense");
          case z:
            return lo("SuspenseList");
        }
        if (typeof E == "object")
          switch (E.$$typeof) {
            case D:
              return $i(E.render);
            case F:
              return Ii(E.type, N, Q);
            case oe: {
              var Z = E, be = Z._payload, nt = Z._init;
              try {
                return Ii(nt(be), N, Q);
              } catch {
              }
            }
          }
        return "";
      }
      var Pt = {}, so = Se.ReactDebugCurrentFrame;
      function zt(E) {
        if (E) {
          var N = E._owner, Q = Ii(E.type, E._source, N ? N.type : null);
          so.setExtraStackFrame(Q);
        } else
          so.setExtraStackFrame(null);
      }
      function rs(E, N, Q, Z, be) {
        {
          var nt = Function.call.bind(ln);
          for (var Te in E)
            if (nt(E, Te)) {
              var ut = void 0;
              try {
                if (typeof E[Te] != "function") {
                  var Tt = Error((Z || "React class") + ": " + Q + " type `" + Te + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[Te] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Tt.name = "Invariant Violation", Tt;
                }
                ut = E[Te](N, Te, Z, Q, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (At) {
                ut = At;
              }
              ut && !(ut instanceof Error) && (zt(be), re("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Z || "React class", Q, Te, typeof ut), zt(null)), ut instanceof Error && !(ut.message in Pt) && (Pt[ut.message] = !0, zt(be), re("Failed %s type: %s", Q, ut.message), zt(null));
            }
        }
      }
      function gi(E) {
        if (E) {
          var N = E._owner, Q = Ii(E.type, E._source, N ? N.type : null);
          lt(Q);
        } else
          lt(null);
      }
      var dt;
      dt = !1;
      function co() {
        if (ge.current) {
          var E = rn(ge.current.type);
          if (E)
            return `

Check the render method of \`` + E + "`.";
        }
        return "";
      }
      function cr(E) {
        if (E !== void 0) {
          var N = E.fileName.replace(/^.*[\\\/]/, ""), Q = E.lineNumber;
          return `

Check your code at ` + N + ":" + Q + ".";
        }
        return "";
      }
      function Si(E) {
        return E != null ? cr(E.__source) : "";
      }
      var zr = {};
      function xi(E) {
        var N = co();
        if (!N) {
          var Q = typeof E == "string" ? E : E.displayName || E.name;
          Q && (N = `

Check the top-level render call using <` + Q + ">.");
        }
        return N;
      }
      function vn(E, N) {
        if (!(!E._store || E._store.validated || E.key != null)) {
          E._store.validated = !0;
          var Q = xi(N);
          if (!zr[Q]) {
            zr[Q] = !0;
            var Z = "";
            E && E._owner && E._owner !== ge.current && (Z = " It was passed a child from " + rn(E._owner.type) + "."), gi(E), re('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Q, Z), gi(null);
          }
        }
      }
      function Kt(E, N) {
        if (typeof E == "object") {
          if (Ht(E))
            for (var Q = 0; Q < E.length; Q++) {
              var Z = E[Q];
              xn(Z) && vn(Z, N);
            }
          else if (xn(E))
            E._store && (E._store.validated = !0);
          else if (E) {
            var be = we(E);
            if (typeof be == "function" && be !== E.entries)
              for (var nt = be.call(E), Te; !(Te = nt.next()).done; )
                xn(Te.value) && vn(Te.value, N);
          }
        }
      }
      function bl(E) {
        {
          var N = E.type;
          if (N == null || typeof N == "string")
            return;
          var Q;
          if (typeof N == "function")
            Q = N.propTypes;
          else if (typeof N == "object" && (N.$$typeof === D || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          N.$$typeof === F))
            Q = N.propTypes;
          else
            return;
          if (Q) {
            var Z = rn(N);
            rs(Q, E.props, "prop", Z, E);
          } else if (N.PropTypes !== void 0 && !dt) {
            dt = !0;
            var be = rn(N);
            re("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", be || "Unknown");
          }
          typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && re("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function qn(E) {
        {
          for (var N = Object.keys(E.props), Q = 0; Q < N.length; Q++) {
            var Z = N[Q];
            if (Z !== "children" && Z !== "key") {
              gi(E), re("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Z), gi(null);
              break;
            }
          }
          E.ref !== null && (gi(E), re("Invalid attribute `ref` supplied to `React.Fragment`."), gi(null));
        }
      }
      function Ar(E, N, Q) {
        var Z = pe(E);
        if (!Z) {
          var be = "";
          (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (be += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var nt = Si(N);
          nt ? be += nt : be += co();
          var Te;
          E === null ? Te = "null" : Ht(E) ? Te = "array" : E !== void 0 && E.$$typeof === y ? (Te = "<" + (rn(E.type) || "Unknown") + " />", be = " Did you accidentally export a JSX literal instead of a component?") : Te = typeof E, re("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Te, be);
        }
        var ut = St.apply(this, arguments);
        if (ut == null)
          return ut;
        if (Z)
          for (var Tt = 2; Tt < arguments.length; Tt++)
            Kt(arguments[Tt], E);
        return E === C ? qn(ut) : bl(ut), ut;
      }
      var Da = !1;
      function pu(E) {
        var N = Ar.bind(null, E);
        return N.type = E, Da || (Da = !0, J("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(N, "type", {
          enumerable: !1,
          get: function() {
            return J("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: E
            }), E;
          }
        }), N;
      }
      function as(E, N, Q) {
        for (var Z = un.apply(this, arguments), be = 2; be < arguments.length; be++)
          Kt(arguments[be], Z.type);
        return bl(Z), Z;
      }
      function is(E, N) {
        var Q = Ne.transition;
        Ne.transition = {};
        var Z = Ne.transition;
        Ne.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          E();
        } finally {
          if (Ne.transition = Q, Q === null && Z._updatedFibers) {
            var be = Z._updatedFibers.size;
            be > 10 && J("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Z._updatedFibers.clear();
          }
        }
      }
      var _l = !1, hu = null;
      function yd(E) {
        if (hu === null)
          try {
            var N = ("require" + Math.random()).slice(0, 7), Q = l && l[N];
            hu = Q.call(l, "timers").setImmediate;
          } catch {
            hu = function(be) {
              _l === !1 && (_l = !0, typeof MessageChannel > "u" && re("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var nt = new MessageChannel();
              nt.port1.onmessage = be, nt.port2.postMessage(void 0);
            };
          }
        return hu(E);
      }
      var Ma = 0, ri = !1;
      function Ei(E) {
        {
          var N = Ma;
          Ma++, de.current === null && (de.current = []);
          var Q = de.isBatchingLegacy, Z;
          try {
            if (de.isBatchingLegacy = !0, Z = E(), !Q && de.didScheduleLegacyUpdate) {
              var be = de.current;
              be !== null && (de.didScheduleLegacyUpdate = !1, Tl(be));
            }
          } catch (Ct) {
            throw Oa(N), Ct;
          } finally {
            de.isBatchingLegacy = Q;
          }
          if (Z !== null && typeof Z == "object" && typeof Z.then == "function") {
            var nt = Z, Te = !1, ut = {
              then: function(Ct, Jt) {
                Te = !0, nt.then(function(En) {
                  Oa(N), Ma === 0 ? fo(En, Ct, Jt) : Ct(En);
                }, function(En) {
                  Oa(N), Jt(En);
                });
              }
            };
            return !ri && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              Te || (ri = !0, re("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), ut;
          } else {
            var Tt = Z;
            if (Oa(N), Ma === 0) {
              var At = de.current;
              At !== null && (Tl(At), de.current = null);
              var cn = {
                then: function(Ct, Jt) {
                  de.current === null ? (de.current = [], fo(Tt, Ct, Jt)) : Ct(Tt);
                }
              };
              return cn;
            } else {
              var Zt = {
                then: function(Ct, Jt) {
                  Ct(Tt);
                }
              };
              return Zt;
            }
          }
        }
      }
      function Oa(E) {
        E !== Ma - 1 && re("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ma = E;
      }
      function fo(E, N, Q) {
        {
          var Z = de.current;
          if (Z !== null)
            try {
              Tl(Z), yd(function() {
                Z.length === 0 ? (de.current = null, N(E)) : fo(E, N, Q);
              });
            } catch (be) {
              Q(be);
            }
          else
            N(E);
        }
      }
      var po = !1;
      function Tl(E) {
        if (!po) {
          po = !0;
          var N = 0;
          try {
            for (; N < E.length; N++) {
              var Q = E[N];
              do
                Q = Q(!0);
              while (Q !== null);
            }
            E.length = 0;
          } catch (Z) {
            throw E = E.slice(N + 1), Z;
          } finally {
            po = !1;
          }
        }
      }
      var vu = Ar, ho = as, vo = pu, ai = {
        map: Bi,
        forEach: ou,
        count: uu,
        toArray: Sl,
        only: xl
      };
      c.Children = ai, c.Component = Ae, c.Fragment = C, c.Profiler = T, c.PureComponent = pt, c.StrictMode = v, c.Suspense = O, c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Se, c.act = Ei, c.cloneElement = ho, c.createContext = su, c.createElement = vu, c.createFactory = vo, c.createRef = _n, c.forwardRef = yi, c.isValidElement = xn, c.lazy = mi, c.memo = ke, c.startTransition = is, c.unstable_act = Ei, c.useCallback = sr, c.useContext = yt, c.useDebugValue = gt, c.useDeferredValue = ei, c.useEffect = Mn, c.useId = cu, c.useImperativeHandle = Ja, c.useInsertionEffect = sn, c.useLayoutEffect = hn, c.useMemo = Za, c.useReducer = _t, c.useRef = wt, c.useState = ht, c.useSyncExternalStore = fu, c.useTransition = Et, c.version = d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(bh, bh.exports)), bh.exports;
}
var kw;
function Lh() {
  return kw || (kw = 1, process.env.NODE_ENV === "production" ? ky.exports = jM() : ky.exports = HM()), ky.exports;
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
var Dw;
function PM() {
  if (Dw) return Eh;
  Dw = 1;
  var l = Lh(), c = Symbol.for("react.element"), d = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, g = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(T, _, R) {
    var D, O = {}, z = null, F = null;
    R !== void 0 && (z = "" + R), _.key !== void 0 && (z = "" + _.key), _.ref !== void 0 && (F = _.ref);
    for (D in _) y.call(_, D) && !C.hasOwnProperty(D) && (O[D] = _[D]);
    if (T && T.defaultProps) for (D in _ = T.defaultProps, _) O[D] === void 0 && (O[D] = _[D]);
    return { $$typeof: c, type: T, key: z, ref: F, props: O, _owner: g.current };
  }
  return Eh.Fragment = d, Eh.jsx = v, Eh.jsxs = v, Eh;
}
var Ch = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mw;
function VM() {
  return Mw || (Mw = 1, process.env.NODE_ENV !== "production" && (function() {
    var l = Lh(), c = Symbol.for("react.element"), d = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), D = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), F = Symbol.for("react.offscreen"), oe = Symbol.iterator, ae = "@@iterator";
    function ie(L) {
      if (L === null || typeof L != "object")
        return null;
      var pe = oe && L[oe] || L[ae];
      return typeof pe == "function" ? pe : null;
    }
    var ue = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function we(L) {
      {
        for (var pe = arguments.length, ke = new Array(pe > 1 ? pe - 1 : 0), Pe = 1; Pe < pe; Pe++)
          ke[Pe - 1] = arguments[Pe];
        fe("error", L, ke);
      }
    }
    function fe(L, pe, ke) {
      {
        var Pe = ue.ReactDebugCurrentFrame, yt = Pe.getStackAddendum();
        yt !== "" && (pe += "%s", ke = ke.concat([yt]));
        var ht = ke.map(function(_t) {
          return String(_t);
        });
        ht.unshift("Warning: " + pe), Function.prototype.apply.call(console[L], console, ht);
      }
    }
    var Ne = !1, de = !1, ge = !1, xe = !1, Xe = !1, lt;
    lt = Symbol.for("react.module.reference");
    function bt(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === y || L === C || Xe || L === g || L === R || L === D || xe || L === F || Ne || de || ge || typeof L == "object" && L !== null && (L.$$typeof === z || L.$$typeof === O || L.$$typeof === v || L.$$typeof === T || L.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === lt || L.getModuleId !== void 0));
    }
    function Ut(L, pe, ke) {
      var Pe = L.displayName;
      if (Pe)
        return Pe;
      var yt = pe.displayName || pe.name || "";
      return yt !== "" ? ke + "(" + yt + ")" : ke;
    }
    function ze(L) {
      return L.displayName || "Context";
    }
    function Ve(L) {
      if (L == null)
        return null;
      if (typeof L.tag == "number" && we("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof L == "function")
        return L.displayName || L.name || null;
      if (typeof L == "string")
        return L;
      switch (L) {
        case y:
          return "Fragment";
        case d:
          return "Portal";
        case C:
          return "Profiler";
        case g:
          return "StrictMode";
        case R:
          return "Suspense";
        case D:
          return "SuspenseList";
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case T:
            var pe = L;
            return ze(pe) + ".Consumer";
          case v:
            var ke = L;
            return ze(ke._context) + ".Provider";
          case _:
            return Ut(L, L.render, "ForwardRef");
          case O:
            var Pe = L.displayName || null;
            return Pe !== null ? Pe : Ve(L.type) || "Memo";
          case z: {
            var yt = L, ht = yt._payload, _t = yt._init;
            try {
              return Ve(_t(ht));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var V = Object.assign, Se = 0, J, re, G, ce, ee, A, K;
    function Be() {
    }
    Be.__reactDisabledLog = !0;
    function Ae() {
      {
        if (Se === 0) {
          J = console.log, re = console.info, G = console.warn, ce = console.error, ee = console.group, A = console.groupCollapsed, K = console.groupEnd;
          var L = {
            configurable: !0,
            enumerable: !0,
            value: Be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: L,
            log: L,
            warn: L,
            error: L,
            group: L,
            groupCollapsed: L,
            groupEnd: L
          });
        }
        Se++;
      }
    }
    function et() {
      {
        if (Se--, Se === 0) {
          var L = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: V({}, L, {
              value: J
            }),
            info: V({}, L, {
              value: re
            }),
            warn: V({}, L, {
              value: G
            }),
            error: V({}, L, {
              value: ce
            }),
            group: V({}, L, {
              value: ee
            }),
            groupCollapsed: V({}, L, {
              value: A
            }),
            groupEnd: V({}, L, {
              value: K
            })
          });
        }
        Se < 0 && we("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var at = ue.ReactCurrentDispatcher, qe;
    function tt(L, pe, ke) {
      {
        if (qe === void 0)
          try {
            throw Error();
          } catch (yt) {
            var Pe = yt.stack.trim().match(/\n( *(at )?)/);
            qe = Pe && Pe[1] || "";
          }
        return `
` + qe + L;
      }
    }
    var pt = !1, jt;
    {
      var _n = typeof WeakMap == "function" ? WeakMap : Map;
      jt = new _n();
    }
    function Gn(L, pe) {
      if (!L || pt)
        return "";
      {
        var ke = jt.get(L);
        if (ke !== void 0)
          return ke;
      }
      var Pe;
      pt = !0;
      var yt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ht;
      ht = at.current, at.current = null, Ae();
      try {
        if (pe) {
          var _t = function() {
            throw Error();
          };
          if (Object.defineProperty(_t.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(_t, []);
            } catch (gt) {
              Pe = gt;
            }
            Reflect.construct(L, [], _t);
          } else {
            try {
              _t.call();
            } catch (gt) {
              Pe = gt;
            }
            L.call(_t.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (gt) {
            Pe = gt;
          }
          L();
        }
      } catch (gt) {
        if (gt && Pe && typeof gt.stack == "string") {
          for (var wt = gt.stack.split(`
`), Mn = Pe.stack.split(`
`), sn = wt.length - 1, hn = Mn.length - 1; sn >= 1 && hn >= 0 && wt[sn] !== Mn[hn]; )
            hn--;
          for (; sn >= 1 && hn >= 0; sn--, hn--)
            if (wt[sn] !== Mn[hn]) {
              if (sn !== 1 || hn !== 1)
                do
                  if (sn--, hn--, hn < 0 || wt[sn] !== Mn[hn]) {
                    var sr = `
` + wt[sn].replace(" at new ", " at ");
                    return L.displayName && sr.includes("<anonymous>") && (sr = sr.replace("<anonymous>", L.displayName)), typeof L == "function" && jt.set(L, sr), sr;
                  }
                while (sn >= 1 && hn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, at.current = ht, et(), Error.prepareStackTrace = yt;
      }
      var Za = L ? L.displayName || L.name : "", Ja = Za ? tt(Za) : "";
      return typeof L == "function" && jt.set(L, Ja), Ja;
    }
    function Ht(L, pe, ke) {
      return Gn(L, !1);
    }
    function Fn(L) {
      var pe = L.prototype;
      return !!(pe && pe.isReactComponent);
    }
    function Tn(L, pe, ke) {
      if (L == null)
        return "";
      if (typeof L == "function")
        return Gn(L, Fn(L));
      if (typeof L == "string")
        return tt(L);
      switch (L) {
        case R:
          return tt("Suspense");
        case D:
          return tt("SuspenseList");
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case _:
            return Ht(L.render);
          case O:
            return Tn(L.type, pe, ke);
          case z: {
            var Pe = L, yt = Pe._payload, ht = Pe._init;
            try {
              return Tn(ht(yt), pe, ke);
            } catch {
            }
          }
        }
      return "";
    }
    var Dn = Object.prototype.hasOwnProperty, wr = {}, Ta = ue.ReactDebugCurrentFrame;
    function ur(L) {
      if (L) {
        var pe = L._owner, ke = Tn(L.type, L._source, pe ? pe.type : null);
        Ta.setExtraStackFrame(ke);
      } else
        Ta.setExtraStackFrame(null);
    }
    function rn(L, pe, ke, Pe, yt) {
      {
        var ht = Function.call.bind(Dn);
        for (var _t in L)
          if (ht(L, _t)) {
            var wt = void 0;
            try {
              if (typeof L[_t] != "function") {
                var Mn = Error((Pe || "React class") + ": " + ke + " type `" + _t + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof L[_t] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Mn.name = "Invariant Violation", Mn;
              }
              wt = L[_t](pe, _t, Pe, ke, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (sn) {
              wt = sn;
            }
            wt && !(wt instanceof Error) && (ur(yt), we("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Pe || "React class", ke, _t, typeof wt), ur(null)), wt instanceof Error && !(wt.message in wr) && (wr[wt.message] = !0, ur(yt), we("Failed %s type: %s", ke, wt.message), ur(null));
          }
      }
    }
    var ln = Array.isArray;
    function dn(L) {
      return ln(L);
    }
    function jn(L) {
      {
        var pe = typeof Symbol == "function" && Symbol.toStringTag, ke = pe && L[Symbol.toStringTag] || L.constructor.name || "Object";
        return ke;
      }
    }
    function Rr(L) {
      try {
        return yn(L), !1;
      } catch {
        return !0;
      }
    }
    function yn(L) {
      return "" + L;
    }
    function Xn(L) {
      if (Rr(L))
        return we("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", jn(L)), yn(L);
    }
    var br = ue.ReactCurrentOwner, Xr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pa, Re;
    function We(L) {
      if (Dn.call(L, "ref")) {
        var pe = Object.getOwnPropertyDescriptor(L, "ref").get;
        if (pe && pe.isReactWarning)
          return !1;
      }
      return L.ref !== void 0;
    }
    function St(L) {
      if (Dn.call(L, "key")) {
        var pe = Object.getOwnPropertyDescriptor(L, "key").get;
        if (pe && pe.isReactWarning)
          return !1;
      }
      return L.key !== void 0;
    }
    function Wt(L, pe) {
      typeof L.ref == "string" && br.current;
    }
    function un(L, pe) {
      {
        var ke = function() {
          pa || (pa = !0, we("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", pe));
        };
        ke.isReactWarning = !0, Object.defineProperty(L, "key", {
          get: ke,
          configurable: !0
        });
      }
    }
    function xn(L, pe) {
      {
        var ke = function() {
          Re || (Re = !0, we("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", pe));
        };
        ke.isReactWarning = !0, Object.defineProperty(L, "ref", {
          get: ke,
          configurable: !0
        });
      }
    }
    var pn = function(L, pe, ke, Pe, yt, ht, _t) {
      var wt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: c,
        // Built-in properties that belong on the element
        type: L,
        key: pe,
        ref: ke,
        props: _t,
        // Record the component responsible for creating this element.
        _owner: ht
      };
      return wt._store = {}, Object.defineProperty(wt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(wt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Pe
      }), Object.defineProperty(wt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: yt
      }), Object.freeze && (Object.freeze(wt.props), Object.freeze(wt)), wt;
    };
    function tr(L, pe, ke, Pe, yt) {
      {
        var ht, _t = {}, wt = null, Mn = null;
        ke !== void 0 && (Xn(ke), wt = "" + ke), St(pe) && (Xn(pe.key), wt = "" + pe.key), We(pe) && (Mn = pe.ref, Wt(pe, yt));
        for (ht in pe)
          Dn.call(pe, ht) && !Xr.hasOwnProperty(ht) && (_t[ht] = pe[ht]);
        if (L && L.defaultProps) {
          var sn = L.defaultProps;
          for (ht in sn)
            _t[ht] === void 0 && (_t[ht] = sn[ht]);
        }
        if (wt || Mn) {
          var hn = typeof L == "function" ? L.displayName || L.name || "Unknown" : L;
          wt && un(_t, hn), Mn && xn(_t, hn);
        }
        return pn(L, wt, Mn, yt, Pe, br.current, _t);
      }
    }
    var on = ue.ReactCurrentOwner, Xt = ue.ReactDebugCurrentFrame;
    function qt(L) {
      if (L) {
        var pe = L._owner, ke = Tn(L.type, L._source, pe ? pe.type : null);
        Xt.setExtraStackFrame(ke);
      } else
        Xt.setExtraStackFrame(null);
    }
    var ha;
    ha = !1;
    function _r(L) {
      return typeof L == "object" && L !== null && L.$$typeof === c;
    }
    function ka() {
      {
        if (on.current) {
          var L = Ve(on.current.type);
          if (L)
            return `

Check the render method of \`` + L + "`.";
        }
        return "";
      }
    }
    function Bi(L) {
      return "";
    }
    var uu = {};
    function ou(L) {
      {
        var pe = ka();
        if (!pe) {
          var ke = typeof L == "string" ? L : L.displayName || L.name;
          ke && (pe = `

Check the top-level render call using <` + ke + ">.");
        }
        return pe;
      }
    }
    function Sl(L, pe) {
      {
        if (!L._store || L._store.validated || L.key != null)
          return;
        L._store.validated = !0;
        var ke = ou(pe);
        if (uu[ke])
          return;
        uu[ke] = !0;
        var Pe = "";
        L && L._owner && L._owner !== on.current && (Pe = " It was passed a child from " + Ve(L._owner.type) + "."), qt(L), we('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ke, Pe), qt(null);
      }
    }
    function xl(L, pe) {
      {
        if (typeof L != "object")
          return;
        if (dn(L))
          for (var ke = 0; ke < L.length; ke++) {
            var Pe = L[ke];
            _r(Pe) && Sl(Pe, pe);
          }
        else if (_r(L))
          L._store && (L._store.validated = !0);
        else if (L) {
          var yt = ie(L);
          if (typeof yt == "function" && yt !== L.entries)
            for (var ht = yt.call(L), _t; !(_t = ht.next()).done; )
              _r(_t.value) && Sl(_t.value, pe);
        }
      }
    }
    function su(L) {
      {
        var pe = L.type;
        if (pe == null || typeof pe == "string")
          return;
        var ke;
        if (typeof pe == "function")
          ke = pe.propTypes;
        else if (typeof pe == "object" && (pe.$$typeof === _ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        pe.$$typeof === O))
          ke = pe.propTypes;
        else
          return;
        if (ke) {
          var Pe = Ve(pe);
          rn(ke, L.props, "prop", Pe, L);
        } else if (pe.PropTypes !== void 0 && !ha) {
          ha = !0;
          var yt = Ve(pe);
          we("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", yt || "Unknown");
        }
        typeof pe.getDefaultProps == "function" && !pe.getDefaultProps.isReactClassApproved && we("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Or(L) {
      {
        for (var pe = Object.keys(L.props), ke = 0; ke < pe.length; ke++) {
          var Pe = pe[ke];
          if (Pe !== "children" && Pe !== "key") {
            qt(L), we("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Pe), qt(null);
            break;
          }
        }
        L.ref !== null && (qt(L), we("Invalid attribute `ref` supplied to `React.Fragment`."), qt(null));
      }
    }
    var Nr = {};
    function or(L, pe, ke, Pe, yt, ht) {
      {
        var _t = bt(L);
        if (!_t) {
          var wt = "";
          (L === void 0 || typeof L == "object" && L !== null && Object.keys(L).length === 0) && (wt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Mn = Bi();
          Mn ? wt += Mn : wt += ka();
          var sn;
          L === null ? sn = "null" : dn(L) ? sn = "array" : L !== void 0 && L.$$typeof === c ? (sn = "<" + (Ve(L.type) || "Unknown") + " />", wt = " Did you accidentally export a JSX literal instead of a component?") : sn = typeof L, we("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", sn, wt);
        }
        var hn = tr(L, pe, ke, yt, ht);
        if (hn == null)
          return hn;
        if (_t) {
          var sr = pe.children;
          if (sr !== void 0)
            if (Pe)
              if (dn(sr)) {
                for (var Za = 0; Za < sr.length; Za++)
                  xl(sr[Za], L);
                Object.freeze && Object.freeze(sr);
              } else
                we("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              xl(sr, L);
        }
        if (Dn.call(pe, "key")) {
          var Ja = Ve(L), gt = Object.keys(pe).filter(function(cu) {
            return cu !== "key";
          }), Et = gt.length > 0 ? "{key: someKey, " + gt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Nr[Ja + Et]) {
            var ei = gt.length > 0 ? "{" + gt.join(": ..., ") + ": ...}" : "{}";
            we(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Et, Ja, ei, Ja), Nr[Ja + Et] = !0;
          }
        }
        return L === y ? Or(hn) : su(hn), hn;
      }
    }
    function vi(L, pe, ke) {
      return or(L, pe, ke, !0);
    }
    function Ka(L, pe, ke) {
      return or(L, pe, ke, !1);
    }
    var mi = Ka, yi = vi;
    Ch.Fragment = y, Ch.jsx = mi, Ch.jsxs = yi;
  })()), Ch;
}
var Ow;
function BM() {
  return Ow || (Ow = 1, process.env.NODE_ENV === "production" ? Ty.exports = PM() : Ty.exports = VM()), Ty.exports;
}
var se = BM(), Oe = Lh(), od = {}, Dy = { exports: {} }, Qa = {}, My = { exports: {} }, gx = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nw;
function $M() {
  return Nw || (Nw = 1, (function(l) {
    function c(G, ce) {
      var ee = G.length;
      G.push(ce);
      e: for (; 0 < ee; ) {
        var A = ee - 1 >>> 1, K = G[A];
        if (0 < g(K, ce)) G[A] = ce, G[ee] = K, ee = A;
        else break e;
      }
    }
    function d(G) {
      return G.length === 0 ? null : G[0];
    }
    function y(G) {
      if (G.length === 0) return null;
      var ce = G[0], ee = G.pop();
      if (ee !== ce) {
        G[0] = ee;
        e: for (var A = 0, K = G.length, Be = K >>> 1; A < Be; ) {
          var Ae = 2 * (A + 1) - 1, et = G[Ae], at = Ae + 1, qe = G[at];
          if (0 > g(et, ee)) at < K && 0 > g(qe, et) ? (G[A] = qe, G[at] = ee, A = at) : (G[A] = et, G[Ae] = ee, A = Ae);
          else if (at < K && 0 > g(qe, ee)) G[A] = qe, G[at] = ee, A = at;
          else break e;
        }
      }
      return ce;
    }
    function g(G, ce) {
      var ee = G.sortIndex - ce.sortIndex;
      return ee !== 0 ? ee : G.id - ce.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var C = performance;
      l.unstable_now = function() {
        return C.now();
      };
    } else {
      var v = Date, T = v.now();
      l.unstable_now = function() {
        return v.now() - T;
      };
    }
    var _ = [], R = [], D = 1, O = null, z = 3, F = !1, oe = !1, ae = !1, ie = typeof setTimeout == "function" ? setTimeout : null, ue = typeof clearTimeout == "function" ? clearTimeout : null, we = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function fe(G) {
      for (var ce = d(R); ce !== null; ) {
        if (ce.callback === null) y(R);
        else if (ce.startTime <= G) y(R), ce.sortIndex = ce.expirationTime, c(_, ce);
        else break;
        ce = d(R);
      }
    }
    function Ne(G) {
      if (ae = !1, fe(G), !oe) if (d(_) !== null) oe = !0, J(de);
      else {
        var ce = d(R);
        ce !== null && re(Ne, ce.startTime - G);
      }
    }
    function de(G, ce) {
      oe = !1, ae && (ae = !1, ue(Xe), Xe = -1), F = !0;
      var ee = z;
      try {
        for (fe(ce), O = d(_); O !== null && (!(O.expirationTime > ce) || G && !Ut()); ) {
          var A = O.callback;
          if (typeof A == "function") {
            O.callback = null, z = O.priorityLevel;
            var K = A(O.expirationTime <= ce);
            ce = l.unstable_now(), typeof K == "function" ? O.callback = K : O === d(_) && y(_), fe(ce);
          } else y(_);
          O = d(_);
        }
        if (O !== null) var Be = !0;
        else {
          var Ae = d(R);
          Ae !== null && re(Ne, Ae.startTime - ce), Be = !1;
        }
        return Be;
      } finally {
        O = null, z = ee, F = !1;
      }
    }
    var ge = !1, xe = null, Xe = -1, lt = 5, bt = -1;
    function Ut() {
      return !(l.unstable_now() - bt < lt);
    }
    function ze() {
      if (xe !== null) {
        var G = l.unstable_now();
        bt = G;
        var ce = !0;
        try {
          ce = xe(!0, G);
        } finally {
          ce ? Ve() : (ge = !1, xe = null);
        }
      } else ge = !1;
    }
    var Ve;
    if (typeof we == "function") Ve = function() {
      we(ze);
    };
    else if (typeof MessageChannel < "u") {
      var V = new MessageChannel(), Se = V.port2;
      V.port1.onmessage = ze, Ve = function() {
        Se.postMessage(null);
      };
    } else Ve = function() {
      ie(ze, 0);
    };
    function J(G) {
      xe = G, ge || (ge = !0, Ve());
    }
    function re(G, ce) {
      Xe = ie(function() {
        G(l.unstable_now());
      }, ce);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(G) {
      G.callback = null;
    }, l.unstable_continueExecution = function() {
      oe || F || (oe = !0, J(de));
    }, l.unstable_forceFrameRate = function(G) {
      0 > G || 125 < G ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : lt = 0 < G ? Math.floor(1e3 / G) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, l.unstable_getFirstCallbackNode = function() {
      return d(_);
    }, l.unstable_next = function(G) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var ce = 3;
          break;
        default:
          ce = z;
      }
      var ee = z;
      z = ce;
      try {
        return G();
      } finally {
        z = ee;
      }
    }, l.unstable_pauseExecution = function() {
    }, l.unstable_requestPaint = function() {
    }, l.unstable_runWithPriority = function(G, ce) {
      switch (G) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          G = 3;
      }
      var ee = z;
      z = G;
      try {
        return ce();
      } finally {
        z = ee;
      }
    }, l.unstable_scheduleCallback = function(G, ce, ee) {
      var A = l.unstable_now();
      switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? A + ee : A) : ee = A, G) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return K = ee + K, G = { id: D++, callback: ce, priorityLevel: G, startTime: ee, expirationTime: K, sortIndex: -1 }, ee > A ? (G.sortIndex = ee, c(R, G), d(_) === null && G === d(R) && (ae ? (ue(Xe), Xe = -1) : ae = !0, re(Ne, ee - A))) : (G.sortIndex = K, c(_, G), oe || F || (oe = !0, J(de))), G;
    }, l.unstable_shouldYield = Ut, l.unstable_wrapCallback = function(G) {
      var ce = z;
      return function() {
        var ee = z;
        z = ce;
        try {
          return G.apply(this, arguments);
        } finally {
          z = ee;
        }
      };
    };
  })(gx)), gx;
}
var Sx = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lw;
function IM() {
  return Lw || (Lw = 1, (function(l) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var c = !1, d = 5;
      function y(Re, We) {
        var St = Re.length;
        Re.push(We), v(Re, We, St);
      }
      function g(Re) {
        return Re.length === 0 ? null : Re[0];
      }
      function C(Re) {
        if (Re.length === 0)
          return null;
        var We = Re[0], St = Re.pop();
        return St !== We && (Re[0] = St, T(Re, St, 0)), We;
      }
      function v(Re, We, St) {
        for (var Wt = St; Wt > 0; ) {
          var un = Wt - 1 >>> 1, xn = Re[un];
          if (_(xn, We) > 0)
            Re[un] = We, Re[Wt] = xn, Wt = un;
          else
            return;
        }
      }
      function T(Re, We, St) {
        for (var Wt = St, un = Re.length, xn = un >>> 1; Wt < xn; ) {
          var pn = (Wt + 1) * 2 - 1, tr = Re[pn], on = pn + 1, Xt = Re[on];
          if (_(tr, We) < 0)
            on < un && _(Xt, tr) < 0 ? (Re[Wt] = Xt, Re[on] = We, Wt = on) : (Re[Wt] = tr, Re[pn] = We, Wt = pn);
          else if (on < un && _(Xt, We) < 0)
            Re[Wt] = Xt, Re[on] = We, Wt = on;
          else
            return;
        }
      }
      function _(Re, We) {
        var St = Re.sortIndex - We.sortIndex;
        return St !== 0 ? St : Re.id - We.id;
      }
      var R = 1, D = 2, O = 3, z = 4, F = 5;
      function oe(Re, We) {
      }
      var ae = typeof performance == "object" && typeof performance.now == "function";
      if (ae) {
        var ie = performance;
        l.unstable_now = function() {
          return ie.now();
        };
      } else {
        var ue = Date, we = ue.now();
        l.unstable_now = function() {
          return ue.now() - we;
        };
      }
      var fe = 1073741823, Ne = -1, de = 250, ge = 5e3, xe = 1e4, Xe = fe, lt = [], bt = [], Ut = 1, ze = null, Ve = O, V = !1, Se = !1, J = !1, re = typeof setTimeout == "function" ? setTimeout : null, G = typeof clearTimeout == "function" ? clearTimeout : null, ce = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ee(Re) {
        for (var We = g(bt); We !== null; ) {
          if (We.callback === null)
            C(bt);
          else if (We.startTime <= Re)
            C(bt), We.sortIndex = We.expirationTime, y(lt, We);
          else
            return;
          We = g(bt);
        }
      }
      function A(Re) {
        if (J = !1, ee(Re), !Se)
          if (g(lt) !== null)
            Se = !0, yn(K);
          else {
            var We = g(bt);
            We !== null && Xn(A, We.startTime - Re);
          }
      }
      function K(Re, We) {
        Se = !1, J && (J = !1, br()), V = !0;
        var St = Ve;
        try {
          var Wt;
          if (!c) return Be(Re, We);
        } finally {
          ze = null, Ve = St, V = !1;
        }
      }
      function Be(Re, We) {
        var St = We;
        for (ee(St), ze = g(lt); ze !== null && !(ze.expirationTime > St && (!Re || Ta())); ) {
          var Wt = ze.callback;
          if (typeof Wt == "function") {
            ze.callback = null, Ve = ze.priorityLevel;
            var un = ze.expirationTime <= St, xn = Wt(un);
            St = l.unstable_now(), typeof xn == "function" ? ze.callback = xn : ze === g(lt) && C(lt), ee(St);
          } else
            C(lt);
          ze = g(lt);
        }
        if (ze !== null)
          return !0;
        var pn = g(bt);
        return pn !== null && Xn(A, pn.startTime - St), !1;
      }
      function Ae(Re, We) {
        switch (Re) {
          case R:
          case D:
          case O:
          case z:
          case F:
            break;
          default:
            Re = O;
        }
        var St = Ve;
        Ve = Re;
        try {
          return We();
        } finally {
          Ve = St;
        }
      }
      function et(Re) {
        var We;
        switch (Ve) {
          case R:
          case D:
          case O:
            We = O;
            break;
          default:
            We = Ve;
            break;
        }
        var St = Ve;
        Ve = We;
        try {
          return Re();
        } finally {
          Ve = St;
        }
      }
      function at(Re) {
        var We = Ve;
        return function() {
          var St = Ve;
          Ve = We;
          try {
            return Re.apply(this, arguments);
          } finally {
            Ve = St;
          }
        };
      }
      function qe(Re, We, St) {
        var Wt = l.unstable_now(), un;
        if (typeof St == "object" && St !== null) {
          var xn = St.delay;
          typeof xn == "number" && xn > 0 ? un = Wt + xn : un = Wt;
        } else
          un = Wt;
        var pn;
        switch (Re) {
          case R:
            pn = Ne;
            break;
          case D:
            pn = de;
            break;
          case F:
            pn = Xe;
            break;
          case z:
            pn = xe;
            break;
          case O:
          default:
            pn = ge;
            break;
        }
        var tr = un + pn, on = {
          id: Ut++,
          callback: We,
          priorityLevel: Re,
          startTime: un,
          expirationTime: tr,
          sortIndex: -1
        };
        return un > Wt ? (on.sortIndex = un, y(bt, on), g(lt) === null && on === g(bt) && (J ? br() : J = !0, Xn(A, un - Wt))) : (on.sortIndex = tr, y(lt, on), !Se && !V && (Se = !0, yn(K))), on;
      }
      function tt() {
      }
      function pt() {
        !Se && !V && (Se = !0, yn(K));
      }
      function jt() {
        return g(lt);
      }
      function _n(Re) {
        Re.callback = null;
      }
      function Gn() {
        return Ve;
      }
      var Ht = !1, Fn = null, Tn = -1, Dn = d, wr = -1;
      function Ta() {
        var Re = l.unstable_now() - wr;
        return !(Re < Dn);
      }
      function ur() {
      }
      function rn(Re) {
        if (Re < 0 || Re > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Re > 0 ? Dn = Math.floor(1e3 / Re) : Dn = d;
      }
      var ln = function() {
        if (Fn !== null) {
          var Re = l.unstable_now();
          wr = Re;
          var We = !0, St = !0;
          try {
            St = Fn(We, Re);
          } finally {
            St ? dn() : (Ht = !1, Fn = null);
          }
        } else
          Ht = !1;
      }, dn;
      if (typeof ce == "function")
        dn = function() {
          ce(ln);
        };
      else if (typeof MessageChannel < "u") {
        var jn = new MessageChannel(), Rr = jn.port2;
        jn.port1.onmessage = ln, dn = function() {
          Rr.postMessage(null);
        };
      } else
        dn = function() {
          re(ln, 0);
        };
      function yn(Re) {
        Fn = Re, Ht || (Ht = !0, dn());
      }
      function Xn(Re, We) {
        Tn = re(function() {
          Re(l.unstable_now());
        }, We);
      }
      function br() {
        G(Tn), Tn = -1;
      }
      var Xr = ur, pa = null;
      l.unstable_IdlePriority = F, l.unstable_ImmediatePriority = R, l.unstable_LowPriority = z, l.unstable_NormalPriority = O, l.unstable_Profiling = pa, l.unstable_UserBlockingPriority = D, l.unstable_cancelCallback = _n, l.unstable_continueExecution = pt, l.unstable_forceFrameRate = rn, l.unstable_getCurrentPriorityLevel = Gn, l.unstable_getFirstCallbackNode = jt, l.unstable_next = et, l.unstable_pauseExecution = tt, l.unstable_requestPaint = Xr, l.unstable_runWithPriority = Ae, l.unstable_scheduleCallback = qe, l.unstable_shouldYield = Ta, l.unstable_wrapCallback = at, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(Sx)), Sx;
}
var zw;
function mR() {
  return zw || (zw = 1, process.env.NODE_ENV === "production" ? My.exports = $M() : My.exports = IM()), My.exports;
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
var Aw;
function YM() {
  if (Aw) return Qa;
  Aw = 1;
  var l = Lh(), c = mR();
  function d(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, u = 1; u < arguments.length; u++) r += "&args[]=" + encodeURIComponent(arguments[u]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var y = /* @__PURE__ */ new Set(), g = {};
  function C(n, r) {
    v(n, r), v(n + "Capture", r);
  }
  function v(n, r) {
    for (g[n] = r, n = 0; n < r.length; n++) y.add(r[n]);
  }
  var T = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _ = Object.prototype.hasOwnProperty, R = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, D = {}, O = {};
  function z(n) {
    return _.call(O, n) ? !0 : _.call(D, n) ? !1 : R.test(n) ? O[n] = !0 : (D[n] = !0, !1);
  }
  function F(n, r, u, s) {
    if (u !== null && u.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return s ? !1 : u !== null ? !u.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function oe(n, r, u, s) {
    if (r === null || typeof r > "u" || F(n, r, u, s)) return !0;
    if (s) return !1;
    if (u !== null) switch (u.type) {
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
  function ae(n, r, u, s, p, m, w) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = s, this.attributeNamespace = p, this.mustUseProperty = u, this.propertyName = n, this.type = r, this.sanitizeURL = m, this.removeEmptyString = w;
  }
  var ie = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    ie[n] = new ae(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    ie[r] = new ae(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    ie[n] = new ae(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    ie[n] = new ae(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    ie[n] = new ae(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    ie[n] = new ae(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    ie[n] = new ae(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    ie[n] = new ae(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    ie[n] = new ae(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var ue = /[\-:]([a-z])/g;
  function we(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      ue,
      we
    );
    ie[r] = new ae(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(ue, we);
    ie[r] = new ae(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(ue, we);
    ie[r] = new ae(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    ie[n] = new ae(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), ie.xlinkHref = new ae("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    ie[n] = new ae(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function fe(n, r, u, s) {
    var p = ie.hasOwnProperty(r) ? ie[r] : null;
    (p !== null ? p.type !== 0 : s || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (oe(r, u, p, s) && (u = null), s || p === null ? z(r) && (u === null ? n.removeAttribute(r) : n.setAttribute(r, "" + u)) : p.mustUseProperty ? n[p.propertyName] = u === null ? p.type === 3 ? !1 : "" : u : (r = p.attributeName, s = p.attributeNamespace, u === null ? n.removeAttribute(r) : (p = p.type, u = p === 3 || p === 4 && u === !0 ? "" : "" + u, s ? n.setAttributeNS(s, r, u) : n.setAttribute(r, u))));
  }
  var Ne = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, de = Symbol.for("react.element"), ge = Symbol.for("react.portal"), xe = Symbol.for("react.fragment"), Xe = Symbol.for("react.strict_mode"), lt = Symbol.for("react.profiler"), bt = Symbol.for("react.provider"), Ut = Symbol.for("react.context"), ze = Symbol.for("react.forward_ref"), Ve = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), Se = Symbol.for("react.memo"), J = Symbol.for("react.lazy"), re = Symbol.for("react.offscreen"), G = Symbol.iterator;
  function ce(n) {
    return n === null || typeof n != "object" ? null : (n = G && n[G] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ee = Object.assign, A;
  function K(n) {
    if (A === void 0) try {
      throw Error();
    } catch (u) {
      var r = u.stack.trim().match(/\n( *(at )?)/);
      A = r && r[1] || "";
    }
    return `
` + A + n;
  }
  var Be = !1;
  function Ae(n, r) {
    if (!n || Be) return "";
    Be = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (X) {
          var s = X;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (X) {
          s = X;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (X) {
          s = X;
        }
        n();
      }
    } catch (X) {
      if (X && s && typeof X.stack == "string") {
        for (var p = X.stack.split(`
`), m = s.stack.split(`
`), w = p.length - 1, M = m.length - 1; 1 <= w && 0 <= M && p[w] !== m[M]; ) M--;
        for (; 1 <= w && 0 <= M; w--, M--) if (p[w] !== m[M]) {
          if (w !== 1 || M !== 1)
            do
              if (w--, M--, 0 > M || p[w] !== m[M]) {
                var U = `
` + p[w].replace(" at new ", " at ");
                return n.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", n.displayName)), U;
              }
            while (1 <= w && 0 <= M);
          break;
        }
      }
    } finally {
      Be = !1, Error.prepareStackTrace = u;
    }
    return (n = n ? n.displayName || n.name : "") ? K(n) : "";
  }
  function et(n) {
    switch (n.tag) {
      case 5:
        return K(n.type);
      case 16:
        return K("Lazy");
      case 13:
        return K("Suspense");
      case 19:
        return K("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ae(n.type, !1), n;
      case 11:
        return n = Ae(n.type.render, !1), n;
      case 1:
        return n = Ae(n.type, !0), n;
      default:
        return "";
    }
  }
  function at(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case xe:
        return "Fragment";
      case ge:
        return "Portal";
      case lt:
        return "Profiler";
      case Xe:
        return "StrictMode";
      case Ve:
        return "Suspense";
      case V:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Ut:
        return (n.displayName || "Context") + ".Consumer";
      case bt:
        return (n._context.displayName || "Context") + ".Provider";
      case ze:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Se:
        return r = n.displayName || null, r !== null ? r : at(n.type) || "Memo";
      case J:
        r = n._payload, n = n._init;
        try {
          return at(n(r));
        } catch {
        }
    }
    return null;
  }
  function qe(n) {
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
        return at(r);
      case 8:
        return r === Xe ? "StrictMode" : "Mode";
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
  function tt(n) {
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
  function jt(n) {
    var r = pt(n) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), s = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var p = u.get, m = u.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return p.call(this);
      }, set: function(w) {
        s = "" + w, m.call(this, w);
      } }), Object.defineProperty(n, r, { enumerable: u.enumerable }), { getValue: function() {
        return s;
      }, setValue: function(w) {
        s = "" + w;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function _n(n) {
    n._valueTracker || (n._valueTracker = jt(n));
  }
  function Gn(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var u = r.getValue(), s = "";
    return n && (s = pt(n) ? n.checked ? "true" : "false" : n.value), n = s, n !== u ? (r.setValue(n), !0) : !1;
  }
  function Ht(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Fn(n, r) {
    var u = r.checked;
    return ee({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? n._wrapperState.initialChecked });
  }
  function Tn(n, r) {
    var u = r.defaultValue == null ? "" : r.defaultValue, s = r.checked != null ? r.checked : r.defaultChecked;
    u = tt(r.value != null ? r.value : u), n._wrapperState = { initialChecked: s, initialValue: u, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Dn(n, r) {
    r = r.checked, r != null && fe(n, "checked", r, !1);
  }
  function wr(n, r) {
    Dn(n, r);
    var u = tt(r.value), s = r.type;
    if (u != null) s === "number" ? (u === 0 && n.value === "" || n.value != u) && (n.value = "" + u) : n.value !== "" + u && (n.value = "" + u);
    else if (s === "submit" || s === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? ur(n, r.type, u) : r.hasOwnProperty("defaultValue") && ur(n, r.type, tt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Ta(n, r, u) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var s = r.type;
      if (!(s !== "submit" && s !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, u || r === n.value || (n.value = r), n.defaultValue = r;
    }
    u = n.name, u !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, u !== "" && (n.name = u);
  }
  function ur(n, r, u) {
    (r !== "number" || Ht(n.ownerDocument) !== n) && (u == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + u && (n.defaultValue = "" + u));
  }
  var rn = Array.isArray;
  function ln(n, r, u, s) {
    if (n = n.options, r) {
      r = {};
      for (var p = 0; p < u.length; p++) r["$" + u[p]] = !0;
      for (u = 0; u < n.length; u++) p = r.hasOwnProperty("$" + n[u].value), n[u].selected !== p && (n[u].selected = p), p && s && (n[u].defaultSelected = !0);
    } else {
      for (u = "" + tt(u), r = null, p = 0; p < n.length; p++) {
        if (n[p].value === u) {
          n[p].selected = !0, s && (n[p].defaultSelected = !0);
          return;
        }
        r !== null || n[p].disabled || (r = n[p]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function dn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(d(91));
    return ee({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function jn(n, r) {
    var u = r.value;
    if (u == null) {
      if (u = r.children, r = r.defaultValue, u != null) {
        if (r != null) throw Error(d(92));
        if (rn(u)) {
          if (1 < u.length) throw Error(d(93));
          u = u[0];
        }
        r = u;
      }
      r == null && (r = ""), u = r;
    }
    n._wrapperState = { initialValue: tt(u) };
  }
  function Rr(n, r) {
    var u = tt(r.value), s = tt(r.defaultValue);
    u != null && (u = "" + u, u !== n.value && (n.value = u), r.defaultValue == null && n.defaultValue !== u && (n.defaultValue = u)), s != null && (n.defaultValue = "" + s);
  }
  function yn(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Xn(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function br(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Xn(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Xr, pa = (function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, u, s, p) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, u, s, p);
      });
    } : n;
  })(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Xr = Xr || document.createElement("div"), Xr.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Xr.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Re(n, r) {
    if (r) {
      var u = n.firstChild;
      if (u && u === n.lastChild && u.nodeType === 3) {
        u.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var We = {
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
  }, St = ["Webkit", "ms", "Moz", "O"];
  Object.keys(We).forEach(function(n) {
    St.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), We[r] = We[n];
    });
  });
  function Wt(n, r, u) {
    return r == null || typeof r == "boolean" || r === "" ? "" : u || typeof r != "number" || r === 0 || We.hasOwnProperty(n) && We[n] ? ("" + r).trim() : r + "px";
  }
  function un(n, r) {
    n = n.style;
    for (var u in r) if (r.hasOwnProperty(u)) {
      var s = u.indexOf("--") === 0, p = Wt(u, r[u], s);
      u === "float" && (u = "cssFloat"), s ? n.setProperty(u, p) : n[u] = p;
    }
  }
  var xn = ee({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function pn(n, r) {
    if (r) {
      if (xn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(d(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(d(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(d(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(d(62));
    }
  }
  function tr(n, r) {
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
  var on = null;
  function Xt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var qt = null, ha = null, _r = null;
  function ka(n) {
    if (n = Ze(n)) {
      if (typeof qt != "function") throw Error(d(280));
      var r = n.stateNode;
      r && (r = Cn(r), qt(n.stateNode, n.type, r));
    }
  }
  function Bi(n) {
    ha ? _r ? _r.push(n) : _r = [n] : ha = n;
  }
  function uu() {
    if (ha) {
      var n = ha, r = _r;
      if (_r = ha = null, ka(n), r) for (n = 0; n < r.length; n++) ka(r[n]);
    }
  }
  function ou(n, r) {
    return n(r);
  }
  function Sl() {
  }
  var xl = !1;
  function su(n, r, u) {
    if (xl) return n(r, u);
    xl = !0;
    try {
      return ou(n, r, u);
    } finally {
      xl = !1, (ha !== null || _r !== null) && (Sl(), uu());
    }
  }
  function Or(n, r) {
    var u = n.stateNode;
    if (u === null) return null;
    var s = Cn(u);
    if (s === null) return null;
    u = s[r];
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
    if (u && typeof u != "function") throw Error(d(231, r, typeof u));
    return u;
  }
  var Nr = !1;
  if (T) try {
    var or = {};
    Object.defineProperty(or, "passive", { get: function() {
      Nr = !0;
    } }), window.addEventListener("test", or, or), window.removeEventListener("test", or, or);
  } catch {
    Nr = !1;
  }
  function vi(n, r, u, s, p, m, w, M, U) {
    var X = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(u, X);
    } catch (me) {
      this.onError(me);
    }
  }
  var Ka = !1, mi = null, yi = !1, L = null, pe = { onError: function(n) {
    Ka = !0, mi = n;
  } };
  function ke(n, r, u, s, p, m, w, M, U) {
    Ka = !1, mi = null, vi.apply(pe, arguments);
  }
  function Pe(n, r, u, s, p, m, w, M, U) {
    if (ke.apply(this, arguments), Ka) {
      if (Ka) {
        var X = mi;
        Ka = !1, mi = null;
      } else throw Error(d(198));
      yi || (yi = !0, L = X);
    }
  }
  function yt(n) {
    var r = n, u = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, (r.flags & 4098) !== 0 && (u = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? u : null;
  }
  function ht(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function _t(n) {
    if (yt(n) !== n) throw Error(d(188));
  }
  function wt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = yt(n), r === null) throw Error(d(188));
      return r !== n ? null : n;
    }
    for (var u = n, s = r; ; ) {
      var p = u.return;
      if (p === null) break;
      var m = p.alternate;
      if (m === null) {
        if (s = p.return, s !== null) {
          u = s;
          continue;
        }
        break;
      }
      if (p.child === m.child) {
        for (m = p.child; m; ) {
          if (m === u) return _t(p), n;
          if (m === s) return _t(p), r;
          m = m.sibling;
        }
        throw Error(d(188));
      }
      if (u.return !== s.return) u = p, s = m;
      else {
        for (var w = !1, M = p.child; M; ) {
          if (M === u) {
            w = !0, u = p, s = m;
            break;
          }
          if (M === s) {
            w = !0, s = p, u = m;
            break;
          }
          M = M.sibling;
        }
        if (!w) {
          for (M = m.child; M; ) {
            if (M === u) {
              w = !0, u = m, s = p;
              break;
            }
            if (M === s) {
              w = !0, s = m, u = p;
              break;
            }
            M = M.sibling;
          }
          if (!w) throw Error(d(189));
        }
      }
      if (u.alternate !== s) throw Error(d(190));
    }
    if (u.tag !== 3) throw Error(d(188));
    return u.stateNode.current === u ? n : r;
  }
  function Mn(n) {
    return n = wt(n), n !== null ? sn(n) : null;
  }
  function sn(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = sn(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var hn = c.unstable_scheduleCallback, sr = c.unstable_cancelCallback, Za = c.unstable_shouldYield, Ja = c.unstable_requestPaint, gt = c.unstable_now, Et = c.unstable_getCurrentPriorityLevel, ei = c.unstable_ImmediatePriority, cu = c.unstable_UserBlockingPriority, fu = c.unstable_NormalPriority, El = c.unstable_LowPriority, ao = c.unstable_IdlePriority, Cl = null, qr = null;
  function ns(n) {
    if (qr && typeof qr.onCommitFiberRoot == "function") try {
      qr.onCommitFiberRoot(Cl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Lr = Math.clz32 ? Math.clz32 : io, Cc = Math.log, wc = Math.LN2;
  function io(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Cc(n) / wc | 0) | 0;
  }
  var wl = 64, va = 4194304;
  function ti(n) {
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
  function ni(n, r) {
    var u = n.pendingLanes;
    if (u === 0) return 0;
    var s = 0, p = n.suspendedLanes, m = n.pingedLanes, w = u & 268435455;
    if (w !== 0) {
      var M = w & ~p;
      M !== 0 ? s = ti(M) : (m &= w, m !== 0 && (s = ti(m)));
    } else w = u & ~p, w !== 0 ? s = ti(w) : m !== 0 && (s = ti(m));
    if (s === 0) return 0;
    if (r !== 0 && r !== s && (r & p) === 0 && (p = s & -s, m = r & -r, p >= m || p === 16 && (m & 4194240) !== 0)) return r;
    if ((s & 4) !== 0 && (s |= u & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= s; 0 < r; ) u = 31 - Lr(r), p = 1 << u, s |= n[u], r &= ~p;
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
    for (var u = n.suspendedLanes, s = n.pingedLanes, p = n.expirationTimes, m = n.pendingLanes; 0 < m; ) {
      var w = 31 - Lr(m), M = 1 << w, U = p[w];
      U === -1 ? ((M & u) === 0 || (M & s) !== 0) && (p[w] = lo(M, r)) : U <= r && (n.expiredLanes |= M), m &= ~M;
    }
  }
  function Rl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function uo() {
    var n = wl;
    return wl <<= 1, (wl & 4194240) === 0 && (wl = 64), n;
  }
  function oo(n) {
    for (var r = [], u = 0; 31 > u; u++) r.push(n);
    return r;
  }
  function $i(n, r, u) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Lr(r), n[r] = u;
  }
  function md(n, r) {
    var u = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var s = n.eventTimes;
    for (n = n.expirationTimes; 0 < u; ) {
      var p = 31 - Lr(u), m = 1 << p;
      r[p] = 0, s[p] = -1, n[p] = -1, u &= ~m;
    }
  }
  function Ii(n, r) {
    var u = n.entangledLanes |= r;
    for (n = n.entanglements; u; ) {
      var s = 31 - Lr(u), p = 1 << s;
      p & r | n[s] & r && (n[s] |= r), u &= ~p;
    }
  }
  var Pt = 0;
  function so(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var zt, rs, gi, dt, co, cr = !1, Si = [], zr = null, xi = null, vn = null, Kt = /* @__PURE__ */ new Map(), bl = /* @__PURE__ */ new Map(), qn = [], Ar = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Da(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        zr = null;
        break;
      case "dragenter":
      case "dragleave":
        xi = null;
        break;
      case "mouseover":
      case "mouseout":
        vn = null;
        break;
      case "pointerover":
      case "pointerout":
        Kt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bl.delete(r.pointerId);
    }
  }
  function pu(n, r, u, s, p, m) {
    return n === null || n.nativeEvent !== m ? (n = { blockedOn: r, domEventName: u, eventSystemFlags: s, nativeEvent: m, targetContainers: [p] }, r !== null && (r = Ze(r), r !== null && rs(r)), n) : (n.eventSystemFlags |= s, r = n.targetContainers, p !== null && r.indexOf(p) === -1 && r.push(p), n);
  }
  function as(n, r, u, s, p) {
    switch (r) {
      case "focusin":
        return zr = pu(zr, n, r, u, s, p), !0;
      case "dragenter":
        return xi = pu(xi, n, r, u, s, p), !0;
      case "mouseover":
        return vn = pu(vn, n, r, u, s, p), !0;
      case "pointerover":
        var m = p.pointerId;
        return Kt.set(m, pu(Kt.get(m) || null, n, r, u, s, p)), !0;
      case "gotpointercapture":
        return m = p.pointerId, bl.set(m, pu(bl.get(m) || null, n, r, u, s, p)), !0;
    }
    return !1;
  }
  function is(n) {
    var r = Cu(n.target);
    if (r !== null) {
      var u = yt(r);
      if (u !== null) {
        if (r = u.tag, r === 13) {
          if (r = ht(u), r !== null) {
            n.blockedOn = r, co(n.priority, function() {
              gi(u);
            });
            return;
          }
        } else if (r === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function _l(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var u = ho(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (u === null) {
        u = n.nativeEvent;
        var s = new u.constructor(u.type, u);
        on = s, u.target.dispatchEvent(s), on = null;
      } else return r = Ze(u), r !== null && rs(r), n.blockedOn = u, !1;
      r.shift();
    }
    return !0;
  }
  function hu(n, r, u) {
    _l(n) && u.delete(r);
  }
  function yd() {
    cr = !1, zr !== null && _l(zr) && (zr = null), xi !== null && _l(xi) && (xi = null), vn !== null && _l(vn) && (vn = null), Kt.forEach(hu), bl.forEach(hu);
  }
  function Ma(n, r) {
    n.blockedOn === r && (n.blockedOn = null, cr || (cr = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, yd)));
  }
  function ri(n) {
    function r(p) {
      return Ma(p, n);
    }
    if (0 < Si.length) {
      Ma(Si[0], n);
      for (var u = 1; u < Si.length; u++) {
        var s = Si[u];
        s.blockedOn === n && (s.blockedOn = null);
      }
    }
    for (zr !== null && Ma(zr, n), xi !== null && Ma(xi, n), vn !== null && Ma(vn, n), Kt.forEach(r), bl.forEach(r), u = 0; u < qn.length; u++) s = qn[u], s.blockedOn === n && (s.blockedOn = null);
    for (; 0 < qn.length && (u = qn[0], u.blockedOn === null); ) is(u), u.blockedOn === null && qn.shift();
  }
  var Ei = Ne.ReactCurrentBatchConfig, Oa = !0;
  function fo(n, r, u, s) {
    var p = Pt, m = Ei.transition;
    Ei.transition = null;
    try {
      Pt = 1, Tl(n, r, u, s);
    } finally {
      Pt = p, Ei.transition = m;
    }
  }
  function po(n, r, u, s) {
    var p = Pt, m = Ei.transition;
    Ei.transition = null;
    try {
      Pt = 4, Tl(n, r, u, s);
    } finally {
      Pt = p, Ei.transition = m;
    }
  }
  function Tl(n, r, u, s) {
    if (Oa) {
      var p = ho(n, r, u, s);
      if (p === null) Ac(n, r, s, vu, u), Da(n, s);
      else if (as(p, n, r, u, s)) s.stopPropagation();
      else if (Da(n, s), r & 4 && -1 < Ar.indexOf(n)) {
        for (; p !== null; ) {
          var m = Ze(p);
          if (m !== null && zt(m), m = ho(n, r, u, s), m === null && Ac(n, r, s, vu, u), m === p) break;
          p = m;
        }
        p !== null && s.stopPropagation();
      } else Ac(n, r, s, null, u);
    }
  }
  var vu = null;
  function ho(n, r, u, s) {
    if (vu = null, n = Xt(s), n = Cu(n), n !== null) if (r = yt(n), r === null) n = null;
    else if (u = r.tag, u === 13) {
      if (n = ht(r), n !== null) return n;
      n = null;
    } else if (u === 3) {
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
        switch (Et()) {
          case ei:
            return 1;
          case cu:
            return 4;
          case fu:
          case El:
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
  var ai = null, E = null, N = null;
  function Q() {
    if (N) return N;
    var n, r = E, u = r.length, s, p = "value" in ai ? ai.value : ai.textContent, m = p.length;
    for (n = 0; n < u && r[n] === p[n]; n++) ;
    var w = u - n;
    for (s = 1; s <= w && r[u - s] === p[m - s]; s++) ;
    return N = p.slice(n, 1 < s ? 1 - s : void 0);
  }
  function Z(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function be() {
    return !0;
  }
  function nt() {
    return !1;
  }
  function Te(n) {
    function r(u, s, p, m, w) {
      this._reactName = u, this._targetInst = p, this.type = s, this.nativeEvent = m, this.target = w, this.currentTarget = null;
      for (var M in n) n.hasOwnProperty(M) && (u = n[M], this[M] = u ? u(m) : m[M]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? be : nt, this.isPropagationStopped = nt, this;
    }
    return ee(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = be);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = be);
    }, persist: function() {
    }, isPersistent: be }), r;
  }
  var ut = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Tt = Te(ut), At = ee({}, ut, { view: 0, detail: 0 }), cn = Te(At), Zt, Ct, Jt, En = ee({}, At, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Cd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Jt && (Jt && n.type === "mousemove" ? (Zt = n.screenX - Jt.screenX, Ct = n.screenY - Jt.screenY) : Ct = Zt = 0, Jt = n), Zt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Ct;
  } }), kl = Te(En), ls = ee({}, En, { dataTransfer: 0 }), Yi = Te(ls), us = ee({}, At, { relatedTarget: 0 }), mu = Te(us), gd = ee({}, ut, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Rc = Te(gd), Sd = ee({}, ut, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Uh = Te(Sd), xd = ee({}, ut, { data: 0 }), Ed = Te(xd), Fh = {
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
  }, jh = {
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
  }, ng = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Wi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = ng[n]) ? !!r[n] : !1;
  }
  function Cd() {
    return Wi;
  }
  var wd = ee({}, At, { key: function(n) {
    if (n.key) {
      var r = Fh[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = Z(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? jh[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Cd, charCode: function(n) {
    return n.type === "keypress" ? Z(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Z(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Rd = Te(wd), bd = ee({}, En, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Hh = Te(bd), bc = ee({}, At, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Cd }), Ph = Te(bc), Kr = ee({}, ut, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qi = Te(Kr), Hn = ee({}, En, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gi = Te(Hn), _d = [9, 13, 27, 32], mo = T && "CompositionEvent" in window, os = null;
  T && "documentMode" in document && (os = document.documentMode);
  var ss = T && "TextEvent" in window && !os, Vh = T && (!mo || os && 8 < os && 11 >= os), Bh = " ", _c = !1;
  function $h(n, r) {
    switch (n) {
      case "keyup":
        return _d.indexOf(r.keyCode) !== -1;
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
  function Ih(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var yo = !1;
  function Yh(n, r) {
    switch (n) {
      case "compositionend":
        return Ih(r);
      case "keypress":
        return r.which !== 32 ? null : (_c = !0, Bh);
      case "textInput":
        return n = r.data, n === Bh && _c ? null : n;
      default:
        return null;
    }
  }
  function rg(n, r) {
    if (yo) return n === "compositionend" || !mo && $h(n, r) ? (n = Q(), N = E = ai = null, yo = !1, n) : null;
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
        return Vh && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var ag = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Wh(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!ag[n.type] : r === "textarea";
  }
  function Td(n, r, u, s) {
    Bi(s), r = vs(r, "onChange"), 0 < r.length && (u = new Tt("onChange", "change", null, u, s), n.push({ event: u, listeners: r }));
  }
  var Ci = null, yu = null;
  function Qh(n) {
    xu(n, 0);
  }
  function cs(n) {
    var r = li(n);
    if (Gn(r)) return n;
  }
  function ig(n, r) {
    if (n === "change") return r;
  }
  var Gh = !1;
  if (T) {
    var kd;
    if (T) {
      var Dd = "oninput" in document;
      if (!Dd) {
        var Xh = document.createElement("div");
        Xh.setAttribute("oninput", "return;"), Dd = typeof Xh.oninput == "function";
      }
      kd = Dd;
    } else kd = !1;
    Gh = kd && (!document.documentMode || 9 < document.documentMode);
  }
  function qh() {
    Ci && (Ci.detachEvent("onpropertychange", Kh), yu = Ci = null);
  }
  function Kh(n) {
    if (n.propertyName === "value" && cs(yu)) {
      var r = [];
      Td(r, yu, n, Xt(n)), su(Qh, r);
    }
  }
  function lg(n, r, u) {
    n === "focusin" ? (qh(), Ci = r, yu = u, Ci.attachEvent("onpropertychange", Kh)) : n === "focusout" && qh();
  }
  function Zh(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return cs(yu);
  }
  function ug(n, r) {
    if (n === "click") return cs(r);
  }
  function Jh(n, r) {
    if (n === "input" || n === "change") return cs(r);
  }
  function og(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ii = typeof Object.is == "function" ? Object.is : og;
  function fs(n, r) {
    if (ii(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var u = Object.keys(n), s = Object.keys(r);
    if (u.length !== s.length) return !1;
    for (s = 0; s < u.length; s++) {
      var p = u[s];
      if (!_.call(r, p) || !ii(n[p], r[p])) return !1;
    }
    return !0;
  }
  function ev(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Tc(n, r) {
    var u = ev(n);
    n = 0;
    for (var s; u; ) {
      if (u.nodeType === 3) {
        if (s = n + u.textContent.length, n <= r && s >= r) return { node: u, offset: r - n };
        n = s;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = ev(u);
    }
  }
  function Dl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Dl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function ds() {
    for (var n = window, r = Ht(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var u = typeof r.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) n = r.contentWindow;
      else break;
      r = Ht(n.document);
    }
    return r;
  }
  function kc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function go(n) {
    var r = ds(), u = n.focusedElem, s = n.selectionRange;
    if (r !== u && u && u.ownerDocument && Dl(u.ownerDocument.documentElement, u)) {
      if (s !== null && kc(u)) {
        if (r = s.start, n = s.end, n === void 0 && (n = r), "selectionStart" in u) u.selectionStart = r, u.selectionEnd = Math.min(n, u.value.length);
        else if (n = (r = u.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var p = u.textContent.length, m = Math.min(s.start, p);
          s = s.end === void 0 ? m : Math.min(s.end, p), !n.extend && m > s && (p = s, s = m, m = p), p = Tc(u, m);
          var w = Tc(
            u,
            s
          );
          p && w && (n.rangeCount !== 1 || n.anchorNode !== p.node || n.anchorOffset !== p.offset || n.focusNode !== w.node || n.focusOffset !== w.offset) && (r = r.createRange(), r.setStart(p.node, p.offset), n.removeAllRanges(), m > s ? (n.addRange(r), n.extend(w.node, w.offset)) : (r.setEnd(w.node, w.offset), n.addRange(r)));
        }
      }
      for (r = [], n = u; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof u.focus == "function" && u.focus(), u = 0; u < r.length; u++) n = r[u], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var sg = T && "documentMode" in document && 11 >= document.documentMode, So = null, Md = null, ps = null, Od = !1;
  function Nd(n, r, u) {
    var s = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Od || So == null || So !== Ht(s) || (s = So, "selectionStart" in s && kc(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), ps && fs(ps, s) || (ps = s, s = vs(Md, "onSelect"), 0 < s.length && (r = new Tt("onSelect", "select", null, r, u), n.push({ event: r, listeners: s }), r.target = So)));
  }
  function Dc(n, r) {
    var u = {};
    return u[n.toLowerCase()] = r.toLowerCase(), u["Webkit" + n] = "webkit" + r, u["Moz" + n] = "moz" + r, u;
  }
  var gu = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") }, fr = {}, Ld = {};
  T && (Ld = document.createElement("div").style, "AnimationEvent" in window || (delete gu.animationend.animation, delete gu.animationiteration.animation, delete gu.animationstart.animation), "TransitionEvent" in window || delete gu.transitionend.transition);
  function Mc(n) {
    if (fr[n]) return fr[n];
    if (!gu[n]) return n;
    var r = gu[n], u;
    for (u in r) if (r.hasOwnProperty(u) && u in Ld) return fr[n] = r[u];
    return n;
  }
  var tv = Mc("animationend"), nv = Mc("animationiteration"), rv = Mc("animationstart"), av = Mc("transitionend"), zd = /* @__PURE__ */ new Map(), Oc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Na(n, r) {
    zd.set(n, r), C(r, [n]);
  }
  for (var Ad = 0; Ad < Oc.length; Ad++) {
    var Su = Oc[Ad], cg = Su.toLowerCase(), fg = Su[0].toUpperCase() + Su.slice(1);
    Na(cg, "on" + fg);
  }
  Na(tv, "onAnimationEnd"), Na(nv, "onAnimationIteration"), Na(rv, "onAnimationStart"), Na("dblclick", "onDoubleClick"), Na("focusin", "onFocus"), Na("focusout", "onBlur"), Na(av, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), C("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), C("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), C("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), C("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), C("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), C("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var hs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ud = new Set("cancel close invalid load scroll toggle".split(" ").concat(hs));
  function Nc(n, r, u) {
    var s = n.type || "unknown-event";
    n.currentTarget = u, Pe(s, r, void 0, n), n.currentTarget = null;
  }
  function xu(n, r) {
    r = (r & 4) !== 0;
    for (var u = 0; u < n.length; u++) {
      var s = n[u], p = s.event;
      s = s.listeners;
      e: {
        var m = void 0;
        if (r) for (var w = s.length - 1; 0 <= w; w--) {
          var M = s[w], U = M.instance, X = M.currentTarget;
          if (M = M.listener, U !== m && p.isPropagationStopped()) break e;
          Nc(p, M, X), m = U;
        }
        else for (w = 0; w < s.length; w++) {
          if (M = s[w], U = M.instance, X = M.currentTarget, M = M.listener, U !== m && p.isPropagationStopped()) break e;
          Nc(p, M, X), m = U;
        }
      }
    }
    if (yi) throw n = L, yi = !1, L = null, n;
  }
  function Qt(n, r) {
    var u = r[gs];
    u === void 0 && (u = r[gs] = /* @__PURE__ */ new Set());
    var s = n + "__bubble";
    u.has(s) || (iv(r, n, 2, !1), u.add(s));
  }
  function Lc(n, r, u) {
    var s = 0;
    r && (s |= 4), iv(u, n, s, r);
  }
  var zc = "_reactListening" + Math.random().toString(36).slice(2);
  function xo(n) {
    if (!n[zc]) {
      n[zc] = !0, y.forEach(function(u) {
        u !== "selectionchange" && (Ud.has(u) || Lc(u, !1, n), Lc(u, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[zc] || (r[zc] = !0, Lc("selectionchange", !1, r));
    }
  }
  function iv(n, r, u, s) {
    switch (vo(r)) {
      case 1:
        var p = fo;
        break;
      case 4:
        p = po;
        break;
      default:
        p = Tl;
    }
    u = p.bind(null, r, u, n), p = void 0, !Nr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (p = !0), s ? p !== void 0 ? n.addEventListener(r, u, { capture: !0, passive: p }) : n.addEventListener(r, u, !0) : p !== void 0 ? n.addEventListener(r, u, { passive: p }) : n.addEventListener(r, u, !1);
  }
  function Ac(n, r, u, s, p) {
    var m = s;
    if ((r & 1) === 0 && (r & 2) === 0 && s !== null) e: for (; ; ) {
      if (s === null) return;
      var w = s.tag;
      if (w === 3 || w === 4) {
        var M = s.stateNode.containerInfo;
        if (M === p || M.nodeType === 8 && M.parentNode === p) break;
        if (w === 4) for (w = s.return; w !== null; ) {
          var U = w.tag;
          if ((U === 3 || U === 4) && (U = w.stateNode.containerInfo, U === p || U.nodeType === 8 && U.parentNode === p)) return;
          w = w.return;
        }
        for (; M !== null; ) {
          if (w = Cu(M), w === null) return;
          if (U = w.tag, U === 5 || U === 6) {
            s = m = w;
            continue e;
          }
          M = M.parentNode;
        }
      }
      s = s.return;
    }
    su(function() {
      var X = m, me = Xt(u), Ee = [];
      e: {
        var ve = zd.get(n);
        if (ve !== void 0) {
          var Ue = Tt, $e = n;
          switch (n) {
            case "keypress":
              if (Z(u) === 0) break e;
            case "keydown":
            case "keyup":
              Ue = Rd;
              break;
            case "focusin":
              $e = "focus", Ue = mu;
              break;
            case "focusout":
              $e = "blur", Ue = mu;
              break;
            case "beforeblur":
            case "afterblur":
              Ue = mu;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Ue = kl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ue = Yi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ue = Ph;
              break;
            case tv:
            case nv:
            case rv:
              Ue = Rc;
              break;
            case av:
              Ue = Qi;
              break;
            case "scroll":
              Ue = cn;
              break;
            case "wheel":
              Ue = Gi;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ue = Uh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ue = Hh;
          }
          var Qe = (r & 4) !== 0, An = !Qe && n === "scroll", B = Qe ? ve !== null ? ve + "Capture" : null : ve;
          Qe = [];
          for (var H = X, Y; H !== null; ) {
            Y = H;
            var ye = Y.stateNode;
            if (Y.tag === 5 && ye !== null && (Y = ye, B !== null && (ye = Or(H, B), ye != null && Qe.push(Eo(H, ye, Y)))), An) break;
            H = H.return;
          }
          0 < Qe.length && (ve = new Ue(ve, $e, null, u, me), Ee.push({ event: ve, listeners: Qe }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (ve = n === "mouseover" || n === "pointerover", Ue = n === "mouseout" || n === "pointerout", ve && u !== on && ($e = u.relatedTarget || u.fromElement) && (Cu($e) || $e[Xi])) break e;
          if ((Ue || ve) && (ve = me.window === me ? me : (ve = me.ownerDocument) ? ve.defaultView || ve.parentWindow : window, Ue ? ($e = u.relatedTarget || u.toElement, Ue = X, $e = $e ? Cu($e) : null, $e !== null && (An = yt($e), $e !== An || $e.tag !== 5 && $e.tag !== 6) && ($e = null)) : (Ue = null, $e = X), Ue !== $e)) {
            if (Qe = kl, ye = "onMouseLeave", B = "onMouseEnter", H = "mouse", (n === "pointerout" || n === "pointerover") && (Qe = Hh, ye = "onPointerLeave", B = "onPointerEnter", H = "pointer"), An = Ue == null ? ve : li(Ue), Y = $e == null ? ve : li($e), ve = new Qe(ye, H + "leave", Ue, u, me), ve.target = An, ve.relatedTarget = Y, ye = null, Cu(me) === X && (Qe = new Qe(B, H + "enter", $e, u, me), Qe.target = Y, Qe.relatedTarget = An, ye = Qe), An = ye, Ue && $e) t: {
              for (Qe = Ue, B = $e, H = 0, Y = Qe; Y; Y = Ml(Y)) H++;
              for (Y = 0, ye = B; ye; ye = Ml(ye)) Y++;
              for (; 0 < H - Y; ) Qe = Ml(Qe), H--;
              for (; 0 < Y - H; ) B = Ml(B), Y--;
              for (; H--; ) {
                if (Qe === B || B !== null && Qe === B.alternate) break t;
                Qe = Ml(Qe), B = Ml(B);
              }
              Qe = null;
            }
            else Qe = null;
            Ue !== null && lv(Ee, ve, Ue, Qe, !1), $e !== null && An !== null && lv(Ee, An, $e, Qe, !0);
          }
        }
        e: {
          if (ve = X ? li(X) : window, Ue = ve.nodeName && ve.nodeName.toLowerCase(), Ue === "select" || Ue === "input" && ve.type === "file") var Ie = ig;
          else if (Wh(ve)) if (Gh) Ie = Jh;
          else {
            Ie = Zh;
            var it = lg;
          }
          else (Ue = ve.nodeName) && Ue.toLowerCase() === "input" && (ve.type === "checkbox" || ve.type === "radio") && (Ie = ug);
          if (Ie && (Ie = Ie(n, X))) {
            Td(Ee, Ie, u, me);
            break e;
          }
          it && it(n, ve, X), n === "focusout" && (it = ve._wrapperState) && it.controlled && ve.type === "number" && ur(ve, "number", ve.value);
        }
        switch (it = X ? li(X) : window, n) {
          case "focusin":
            (Wh(it) || it.contentEditable === "true") && (So = it, Md = X, ps = null);
            break;
          case "focusout":
            ps = Md = So = null;
            break;
          case "mousedown":
            Od = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Od = !1, Nd(Ee, u, me);
            break;
          case "selectionchange":
            if (sg) break;
          case "keydown":
          case "keyup":
            Nd(Ee, u, me);
        }
        var ot;
        if (mo) e: {
          switch (n) {
            case "compositionstart":
              var ft = "onCompositionStart";
              break e;
            case "compositionend":
              ft = "onCompositionEnd";
              break e;
            case "compositionupdate":
              ft = "onCompositionUpdate";
              break e;
          }
          ft = void 0;
        }
        else yo ? $h(n, u) && (ft = "onCompositionEnd") : n === "keydown" && u.keyCode === 229 && (ft = "onCompositionStart");
        ft && (Vh && u.locale !== "ko" && (yo || ft !== "onCompositionStart" ? ft === "onCompositionEnd" && yo && (ot = Q()) : (ai = me, E = "value" in ai ? ai.value : ai.textContent, yo = !0)), it = vs(X, ft), 0 < it.length && (ft = new Ed(ft, n, null, u, me), Ee.push({ event: ft, listeners: it }), ot ? ft.data = ot : (ot = Ih(u), ot !== null && (ft.data = ot)))), (ot = ss ? Yh(n, u) : rg(n, u)) && (X = vs(X, "onBeforeInput"), 0 < X.length && (me = new Ed("onBeforeInput", "beforeinput", null, u, me), Ee.push({ event: me, listeners: X }), me.data = ot));
      }
      xu(Ee, r);
    });
  }
  function Eo(n, r, u) {
    return { instance: n, listener: r, currentTarget: u };
  }
  function vs(n, r) {
    for (var u = r + "Capture", s = []; n !== null; ) {
      var p = n, m = p.stateNode;
      p.tag === 5 && m !== null && (p = m, m = Or(n, u), m != null && s.unshift(Eo(n, m, p)), m = Or(n, r), m != null && s.push(Eo(n, m, p))), n = n.return;
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
  function lv(n, r, u, s, p) {
    for (var m = r._reactName, w = []; u !== null && u !== s; ) {
      var M = u, U = M.alternate, X = M.stateNode;
      if (U !== null && U === s) break;
      M.tag === 5 && X !== null && (M = X, p ? (U = Or(u, m), U != null && w.unshift(Eo(u, U, M))) : p || (U = Or(u, m), U != null && w.push(Eo(u, U, M)))), u = u.return;
    }
    w.length !== 0 && n.push({ event: r, listeners: w });
  }
  var uv = /\r\n?/g, dg = /\u0000|\uFFFD/g;
  function ov(n) {
    return (typeof n == "string" ? n : "" + n).replace(uv, `
`).replace(dg, "");
  }
  function Uc(n, r, u) {
    if (r = ov(r), ov(n) !== r && u) throw Error(d(425));
  }
  function Ol() {
  }
  var ms = null, Eu = null;
  function Fc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var jc = typeof setTimeout == "function" ? setTimeout : void 0, Fd = typeof clearTimeout == "function" ? clearTimeout : void 0, sv = typeof Promise == "function" ? Promise : void 0, Co = typeof queueMicrotask == "function" ? queueMicrotask : typeof sv < "u" ? function(n) {
    return sv.resolve(null).then(n).catch(Hc);
  } : jc;
  function Hc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function wo(n, r) {
    var u = r, s = 0;
    do {
      var p = u.nextSibling;
      if (n.removeChild(u), p && p.nodeType === 8) if (u = p.data, u === "/$") {
        if (s === 0) {
          n.removeChild(p), ri(r);
          return;
        }
        s--;
      } else u !== "$" && u !== "$?" && u !== "$!" || s++;
      u = p;
    } while (u);
    ri(r);
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
  function cv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var u = n.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (r === 0) return n;
          r--;
        } else u === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Nl = Math.random().toString(36).slice(2), Ri = "__reactFiber$" + Nl, ys = "__reactProps$" + Nl, Xi = "__reactContainer$" + Nl, gs = "__reactEvents$" + Nl, Ro = "__reactListeners$" + Nl, pg = "__reactHandles$" + Nl;
  function Cu(n) {
    var r = n[Ri];
    if (r) return r;
    for (var u = n.parentNode; u; ) {
      if (r = u[Xi] || u[Ri]) {
        if (u = r.alternate, r.child !== null || u !== null && u.child !== null) for (n = cv(n); n !== null; ) {
          if (u = n[Ri]) return u;
          n = cv(n);
        }
        return r;
      }
      n = u, u = n.parentNode;
    }
    return null;
  }
  function Ze(n) {
    return n = n[Ri] || n[Xi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function li(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(d(33));
  }
  function Cn(n) {
    return n[ys] || null;
  }
  var Mt = [], La = -1;
  function za(n) {
    return { current: n };
  }
  function fn(n) {
    0 > La || (n.current = Mt[La], Mt[La] = null, La--);
  }
  function Ke(n, r) {
    La++, Mt[La] = n.current, n.current = r;
  }
  var Tr = {}, kn = za(Tr), Kn = za(!1), Zr = Tr;
  function Jr(n, r) {
    var u = n.type.contextTypes;
    if (!u) return Tr;
    var s = n.stateNode;
    if (s && s.__reactInternalMemoizedUnmaskedChildContext === r) return s.__reactInternalMemoizedMaskedChildContext;
    var p = {}, m;
    for (m in u) p[m] = r[m];
    return s && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = p), p;
  }
  function Pn(n) {
    return n = n.childContextTypes, n != null;
  }
  function bo() {
    fn(Kn), fn(kn);
  }
  function fv(n, r, u) {
    if (kn.current !== Tr) throw Error(d(168));
    Ke(kn, r), Ke(Kn, u);
  }
  function Ss(n, r, u) {
    var s = n.stateNode;
    if (r = r.childContextTypes, typeof s.getChildContext != "function") return u;
    s = s.getChildContext();
    for (var p in s) if (!(p in r)) throw Error(d(108, qe(n) || "Unknown", p));
    return ee({}, u, s);
  }
  function nr(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Tr, Zr = kn.current, Ke(kn, n), Ke(Kn, Kn.current), !0;
  }
  function Pc(n, r, u) {
    var s = n.stateNode;
    if (!s) throw Error(d(169));
    u ? (n = Ss(n, r, Zr), s.__reactInternalMemoizedMergedChildContext = n, fn(Kn), fn(kn), Ke(kn, n)) : fn(Kn), Ke(Kn, u);
  }
  var bi = null, _o = !1, qi = !1;
  function Vc(n) {
    bi === null ? bi = [n] : bi.push(n);
  }
  function Ll(n) {
    _o = !0, Vc(n);
  }
  function _i() {
    if (!qi && bi !== null) {
      qi = !0;
      var n = 0, r = Pt;
      try {
        var u = bi;
        for (Pt = 1; n < u.length; n++) {
          var s = u[n];
          do
            s = s(!0);
          while (s !== null);
        }
        bi = null, _o = !1;
      } catch (p) {
        throw bi !== null && (bi = bi.slice(n + 1)), hn(ei, _i), p;
      } finally {
        Pt = r, qi = !1;
      }
    }
    return null;
  }
  var zl = [], Al = 0, Ul = null, Ki = 0, Vn = [], Aa = 0, ma = null, Ti = 1, ki = "";
  function wu(n, r) {
    zl[Al++] = Ki, zl[Al++] = Ul, Ul = n, Ki = r;
  }
  function dv(n, r, u) {
    Vn[Aa++] = Ti, Vn[Aa++] = ki, Vn[Aa++] = ma, ma = n;
    var s = Ti;
    n = ki;
    var p = 32 - Lr(s) - 1;
    s &= ~(1 << p), u += 1;
    var m = 32 - Lr(r) + p;
    if (30 < m) {
      var w = p - p % 5;
      m = (s & (1 << w) - 1).toString(32), s >>= w, p -= w, Ti = 1 << 32 - Lr(r) + p | u << p | s, ki = m + n;
    } else Ti = 1 << m | u << p | s, ki = n;
  }
  function Bc(n) {
    n.return !== null && (wu(n, 1), dv(n, 1, 0));
  }
  function $c(n) {
    for (; n === Ul; ) Ul = zl[--Al], zl[Al] = null, Ki = zl[--Al], zl[Al] = null;
    for (; n === ma; ) ma = Vn[--Aa], Vn[Aa] = null, ki = Vn[--Aa], Vn[Aa] = null, Ti = Vn[--Aa], Vn[Aa] = null;
  }
  var ea = null, ta = null, gn = !1, Ua = null;
  function jd(n, r) {
    var u = Va(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = r, u.return = n, r = n.deletions, r === null ? (n.deletions = [u], n.flags |= 16) : r.push(u);
  }
  function pv(n, r) {
    switch (n.tag) {
      case 5:
        var u = n.type;
        return r = r.nodeType !== 1 || u.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ea = n, ta = wi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ea = n, ta = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (u = ma !== null ? { id: Ti, overflow: ki } : null, n.memoizedState = { dehydrated: r, treeContext: u, retryLane: 1073741824 }, u = Va(18, null, null, 0), u.stateNode = r, u.return = n, n.child = u, ea = n, ta = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Hd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Pd(n) {
    if (gn) {
      var r = ta;
      if (r) {
        var u = r;
        if (!pv(n, r)) {
          if (Hd(n)) throw Error(d(418));
          r = wi(u.nextSibling);
          var s = ea;
          r && pv(n, r) ? jd(s, u) : (n.flags = n.flags & -4097 | 2, gn = !1, ea = n);
        }
      } else {
        if (Hd(n)) throw Error(d(418));
        n.flags = n.flags & -4097 | 2, gn = !1, ea = n;
      }
    }
  }
  function Zn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ea = n;
  }
  function Ic(n) {
    if (n !== ea) return !1;
    if (!gn) return Zn(n), gn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Fc(n.type, n.memoizedProps)), r && (r = ta)) {
      if (Hd(n)) throw xs(), Error(d(418));
      for (; r; ) jd(n, r), r = wi(r.nextSibling);
    }
    if (Zn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(d(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var u = n.data;
            if (u === "/$") {
              if (r === 0) {
                ta = wi(n.nextSibling);
                break e;
              }
              r--;
            } else u !== "$" && u !== "$!" && u !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        ta = null;
      }
    } else ta = ea ? wi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function xs() {
    for (var n = ta; n; ) n = wi(n.nextSibling);
  }
  function Fl() {
    ta = ea = null, gn = !1;
  }
  function Zi(n) {
    Ua === null ? Ua = [n] : Ua.push(n);
  }
  var hg = Ne.ReactCurrentBatchConfig;
  function Ru(n, r, u) {
    if (n = u.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (u._owner) {
        if (u = u._owner, u) {
          if (u.tag !== 1) throw Error(d(309));
          var s = u.stateNode;
        }
        if (!s) throw Error(d(147, n));
        var p = s, m = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === m ? r.ref : (r = function(w) {
          var M = p.refs;
          w === null ? delete M[m] : M[m] = w;
        }, r._stringRef = m, r);
      }
      if (typeof n != "string") throw Error(d(284));
      if (!u._owner) throw Error(d(290, n));
    }
    return n;
  }
  function Yc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(d(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function hv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function bu(n) {
    function r(B, H) {
      if (n) {
        var Y = B.deletions;
        Y === null ? (B.deletions = [H], B.flags |= 16) : Y.push(H);
      }
    }
    function u(B, H) {
      if (!n) return null;
      for (; H !== null; ) r(B, H), H = H.sibling;
      return null;
    }
    function s(B, H) {
      for (B = /* @__PURE__ */ new Map(); H !== null; ) H.key !== null ? B.set(H.key, H) : B.set(H.index, H), H = H.sibling;
      return B;
    }
    function p(B, H) {
      return B = Yl(B, H), B.index = 0, B.sibling = null, B;
    }
    function m(B, H, Y) {
      return B.index = Y, n ? (Y = B.alternate, Y !== null ? (Y = Y.index, Y < H ? (B.flags |= 2, H) : Y) : (B.flags |= 2, H)) : (B.flags |= 1048576, H);
    }
    function w(B) {
      return n && B.alternate === null && (B.flags |= 2), B;
    }
    function M(B, H, Y, ye) {
      return H === null || H.tag !== 6 ? (H = yp(Y, B.mode, ye), H.return = B, H) : (H = p(H, Y), H.return = B, H);
    }
    function U(B, H, Y, ye) {
      var Ie = Y.type;
      return Ie === xe ? me(B, H, Y.props.children, ye, Y.key) : H !== null && (H.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === J && hv(Ie) === H.type) ? (ye = p(H, Y.props), ye.ref = Ru(B, H, Y), ye.return = B, ye) : (ye = qs(Y.type, Y.key, Y.props, null, B.mode, ye), ye.ref = Ru(B, H, Y), ye.return = B, ye);
    }
    function X(B, H, Y, ye) {
      return H === null || H.tag !== 4 || H.stateNode.containerInfo !== Y.containerInfo || H.stateNode.implementation !== Y.implementation ? (H = bf(Y, B.mode, ye), H.return = B, H) : (H = p(H, Y.children || []), H.return = B, H);
    }
    function me(B, H, Y, ye, Ie) {
      return H === null || H.tag !== 7 ? (H = al(Y, B.mode, ye, Ie), H.return = B, H) : (H = p(H, Y), H.return = B, H);
    }
    function Ee(B, H, Y) {
      if (typeof H == "string" && H !== "" || typeof H == "number") return H = yp("" + H, B.mode, Y), H.return = B, H;
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case de:
            return Y = qs(H.type, H.key, H.props, null, B.mode, Y), Y.ref = Ru(B, null, H), Y.return = B, Y;
          case ge:
            return H = bf(H, B.mode, Y), H.return = B, H;
          case J:
            var ye = H._init;
            return Ee(B, ye(H._payload), Y);
        }
        if (rn(H) || ce(H)) return H = al(H, B.mode, Y, null), H.return = B, H;
        Yc(B, H);
      }
      return null;
    }
    function ve(B, H, Y, ye) {
      var Ie = H !== null ? H.key : null;
      if (typeof Y == "string" && Y !== "" || typeof Y == "number") return Ie !== null ? null : M(B, H, "" + Y, ye);
      if (typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case de:
            return Y.key === Ie ? U(B, H, Y, ye) : null;
          case ge:
            return Y.key === Ie ? X(B, H, Y, ye) : null;
          case J:
            return Ie = Y._init, ve(
              B,
              H,
              Ie(Y._payload),
              ye
            );
        }
        if (rn(Y) || ce(Y)) return Ie !== null ? null : me(B, H, Y, ye, null);
        Yc(B, Y);
      }
      return null;
    }
    function Ue(B, H, Y, ye, Ie) {
      if (typeof ye == "string" && ye !== "" || typeof ye == "number") return B = B.get(Y) || null, M(H, B, "" + ye, Ie);
      if (typeof ye == "object" && ye !== null) {
        switch (ye.$$typeof) {
          case de:
            return B = B.get(ye.key === null ? Y : ye.key) || null, U(H, B, ye, Ie);
          case ge:
            return B = B.get(ye.key === null ? Y : ye.key) || null, X(H, B, ye, Ie);
          case J:
            var it = ye._init;
            return Ue(B, H, Y, it(ye._payload), Ie);
        }
        if (rn(ye) || ce(ye)) return B = B.get(Y) || null, me(H, B, ye, Ie, null);
        Yc(H, ye);
      }
      return null;
    }
    function $e(B, H, Y, ye) {
      for (var Ie = null, it = null, ot = H, ft = H = 0, ir = null; ot !== null && ft < Y.length; ft++) {
        ot.index > ft ? (ir = ot, ot = null) : ir = ot.sibling;
        var $t = ve(B, ot, Y[ft], ye);
        if ($t === null) {
          ot === null && (ot = ir);
          break;
        }
        n && ot && $t.alternate === null && r(B, ot), H = m($t, H, ft), it === null ? Ie = $t : it.sibling = $t, it = $t, ot = ir;
      }
      if (ft === Y.length) return u(B, ot), gn && wu(B, ft), Ie;
      if (ot === null) {
        for (; ft < Y.length; ft++) ot = Ee(B, Y[ft], ye), ot !== null && (H = m(ot, H, ft), it === null ? Ie = ot : it.sibling = ot, it = ot);
        return gn && wu(B, ft), Ie;
      }
      for (ot = s(B, ot); ft < Y.length; ft++) ir = Ue(ot, B, ft, Y[ft], ye), ir !== null && (n && ir.alternate !== null && ot.delete(ir.key === null ? ft : ir.key), H = m(ir, H, ft), it === null ? Ie = ir : it.sibling = ir, it = ir);
      return n && ot.forEach(function(Gl) {
        return r(B, Gl);
      }), gn && wu(B, ft), Ie;
    }
    function Qe(B, H, Y, ye) {
      var Ie = ce(Y);
      if (typeof Ie != "function") throw Error(d(150));
      if (Y = Ie.call(Y), Y == null) throw Error(d(151));
      for (var it = Ie = null, ot = H, ft = H = 0, ir = null, $t = Y.next(); ot !== null && !$t.done; ft++, $t = Y.next()) {
        ot.index > ft ? (ir = ot, ot = null) : ir = ot.sibling;
        var Gl = ve(B, ot, $t.value, ye);
        if (Gl === null) {
          ot === null && (ot = ir);
          break;
        }
        n && ot && Gl.alternate === null && r(B, ot), H = m(Gl, H, ft), it === null ? Ie = Gl : it.sibling = Gl, it = Gl, ot = ir;
      }
      if ($t.done) return u(
        B,
        ot
      ), gn && wu(B, ft), Ie;
      if (ot === null) {
        for (; !$t.done; ft++, $t = Y.next()) $t = Ee(B, $t.value, ye), $t !== null && (H = m($t, H, ft), it === null ? Ie = $t : it.sibling = $t, it = $t);
        return gn && wu(B, ft), Ie;
      }
      for (ot = s(B, ot); !$t.done; ft++, $t = Y.next()) $t = Ue(ot, B, ft, $t.value, ye), $t !== null && (n && $t.alternate !== null && ot.delete($t.key === null ? ft : $t.key), H = m($t, H, ft), it === null ? Ie = $t : it.sibling = $t, it = $t);
      return n && ot.forEach(function(qv) {
        return r(B, qv);
      }), gn && wu(B, ft), Ie;
    }
    function An(B, H, Y, ye) {
      if (typeof Y == "object" && Y !== null && Y.type === xe && Y.key === null && (Y = Y.props.children), typeof Y == "object" && Y !== null) {
        switch (Y.$$typeof) {
          case de:
            e: {
              for (var Ie = Y.key, it = H; it !== null; ) {
                if (it.key === Ie) {
                  if (Ie = Y.type, Ie === xe) {
                    if (it.tag === 7) {
                      u(B, it.sibling), H = p(it, Y.props.children), H.return = B, B = H;
                      break e;
                    }
                  } else if (it.elementType === Ie || typeof Ie == "object" && Ie !== null && Ie.$$typeof === J && hv(Ie) === it.type) {
                    u(B, it.sibling), H = p(it, Y.props), H.ref = Ru(B, it, Y), H.return = B, B = H;
                    break e;
                  }
                  u(B, it);
                  break;
                } else r(B, it);
                it = it.sibling;
              }
              Y.type === xe ? (H = al(Y.props.children, B.mode, ye, Y.key), H.return = B, B = H) : (ye = qs(Y.type, Y.key, Y.props, null, B.mode, ye), ye.ref = Ru(B, H, Y), ye.return = B, B = ye);
            }
            return w(B);
          case ge:
            e: {
              for (it = Y.key; H !== null; ) {
                if (H.key === it) if (H.tag === 4 && H.stateNode.containerInfo === Y.containerInfo && H.stateNode.implementation === Y.implementation) {
                  u(B, H.sibling), H = p(H, Y.children || []), H.return = B, B = H;
                  break e;
                } else {
                  u(B, H);
                  break;
                }
                else r(B, H);
                H = H.sibling;
              }
              H = bf(Y, B.mode, ye), H.return = B, B = H;
            }
            return w(B);
          case J:
            return it = Y._init, An(B, H, it(Y._payload), ye);
        }
        if (rn(Y)) return $e(B, H, Y, ye);
        if (ce(Y)) return Qe(B, H, Y, ye);
        Yc(B, Y);
      }
      return typeof Y == "string" && Y !== "" || typeof Y == "number" ? (Y = "" + Y, H !== null && H.tag === 6 ? (u(B, H.sibling), H = p(H, Y), H.return = B, B = H) : (u(B, H), H = yp(Y, B.mode, ye), H.return = B, B = H), w(B)) : u(B, H);
    }
    return An;
  }
  var On = bu(!0), De = bu(!1), ya = za(null), na = null, To = null, Vd = null;
  function Bd() {
    Vd = To = na = null;
  }
  function $d(n) {
    var r = ya.current;
    fn(ya), n._currentValue = r;
  }
  function Id(n, r, u) {
    for (; n !== null; ) {
      var s = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, s !== null && (s.childLanes |= r)) : s !== null && (s.childLanes & r) !== r && (s.childLanes |= r), n === u) break;
      n = n.return;
    }
  }
  function wn(n, r) {
    na = n, Vd = To = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & r) !== 0 && ($n = !0), n.firstContext = null);
  }
  function Fa(n) {
    var r = n._currentValue;
    if (Vd !== n) if (n = { context: n, memoizedValue: r, next: null }, To === null) {
      if (na === null) throw Error(d(308));
      To = n, na.dependencies = { lanes: 0, firstContext: n };
    } else To = To.next = n;
    return r;
  }
  var _u = null;
  function Yd(n) {
    _u === null ? _u = [n] : _u.push(n);
  }
  function Wd(n, r, u, s) {
    var p = r.interleaved;
    return p === null ? (u.next = u, Yd(r)) : (u.next = p.next, p.next = u), r.interleaved = u, ga(n, s);
  }
  function ga(n, r) {
    n.lanes |= r;
    var u = n.alternate;
    for (u !== null && (u.lanes |= r), u = n, n = n.return; n !== null; ) n.childLanes |= r, u = n.alternate, u !== null && (u.childLanes |= r), u = n, n = n.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Sa = !1;
  function Qd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function vv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Ji(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function jl(n, r, u) {
    var s = n.updateQueue;
    if (s === null) return null;
    if (s = s.shared, (Ot & 2) !== 0) {
      var p = s.pending;
      return p === null ? r.next = r : (r.next = p.next, p.next = r), s.pending = r, ga(n, u);
    }
    return p = s.interleaved, p === null ? (r.next = r, Yd(s)) : (r.next = p.next, p.next = r), s.interleaved = r, ga(n, u);
  }
  function Wc(n, r, u) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (u & 4194240) !== 0)) {
      var s = r.lanes;
      s &= n.pendingLanes, u |= s, r.lanes = u, Ii(n, u);
    }
  }
  function mv(n, r) {
    var u = n.updateQueue, s = n.alternate;
    if (s !== null && (s = s.updateQueue, u === s)) {
      var p = null, m = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var w = { eventTime: u.eventTime, lane: u.lane, tag: u.tag, payload: u.payload, callback: u.callback, next: null };
          m === null ? p = m = w : m = m.next = w, u = u.next;
        } while (u !== null);
        m === null ? p = m = r : m = m.next = r;
      } else p = m = r;
      u = { baseState: s.baseState, firstBaseUpdate: p, lastBaseUpdate: m, shared: s.shared, effects: s.effects }, n.updateQueue = u;
      return;
    }
    n = u.lastBaseUpdate, n === null ? u.firstBaseUpdate = r : n.next = r, u.lastBaseUpdate = r;
  }
  function Es(n, r, u, s) {
    var p = n.updateQueue;
    Sa = !1;
    var m = p.firstBaseUpdate, w = p.lastBaseUpdate, M = p.shared.pending;
    if (M !== null) {
      p.shared.pending = null;
      var U = M, X = U.next;
      U.next = null, w === null ? m = X : w.next = X, w = U;
      var me = n.alternate;
      me !== null && (me = me.updateQueue, M = me.lastBaseUpdate, M !== w && (M === null ? me.firstBaseUpdate = X : M.next = X, me.lastBaseUpdate = U));
    }
    if (m !== null) {
      var Ee = p.baseState;
      w = 0, me = X = U = null, M = m;
      do {
        var ve = M.lane, Ue = M.eventTime;
        if ((s & ve) === ve) {
          me !== null && (me = me.next = {
            eventTime: Ue,
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          });
          e: {
            var $e = n, Qe = M;
            switch (ve = r, Ue = u, Qe.tag) {
              case 1:
                if ($e = Qe.payload, typeof $e == "function") {
                  Ee = $e.call(Ue, Ee, ve);
                  break e;
                }
                Ee = $e;
                break e;
              case 3:
                $e.flags = $e.flags & -65537 | 128;
              case 0:
                if ($e = Qe.payload, ve = typeof $e == "function" ? $e.call(Ue, Ee, ve) : $e, ve == null) break e;
                Ee = ee({}, Ee, ve);
                break e;
              case 2:
                Sa = !0;
            }
          }
          M.callback !== null && M.lane !== 0 && (n.flags |= 64, ve = p.effects, ve === null ? p.effects = [M] : ve.push(M));
        } else Ue = { eventTime: Ue, lane: ve, tag: M.tag, payload: M.payload, callback: M.callback, next: null }, me === null ? (X = me = Ue, U = Ee) : me = me.next = Ue, w |= ve;
        if (M = M.next, M === null) {
          if (M = p.shared.pending, M === null) break;
          ve = M, M = ve.next, ve.next = null, p.lastBaseUpdate = ve, p.shared.pending = null;
        }
      } while (!0);
      if (me === null && (U = Ee), p.baseState = U, p.firstBaseUpdate = X, p.lastBaseUpdate = me, r = p.shared.interleaved, r !== null) {
        p = r;
        do
          w |= p.lane, p = p.next;
        while (p !== r);
      } else m === null && (p.shared.lanes = 0);
      Li |= w, n.lanes = w, n.memoizedState = Ee;
    }
  }
  function Gd(n, r, u) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var s = n[r], p = s.callback;
      if (p !== null) {
        if (s.callback = null, s = u, typeof p != "function") throw Error(d(191, p));
        p.call(s);
      }
    }
  }
  var Cs = {}, Di = za(Cs), ws = za(Cs), Rs = za(Cs);
  function Tu(n) {
    if (n === Cs) throw Error(d(174));
    return n;
  }
  function Xd(n, r) {
    switch (Ke(Rs, r), Ke(ws, n), Ke(Di, Cs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : br(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = br(r, n);
    }
    fn(Di), Ke(Di, r);
  }
  function ku() {
    fn(Di), fn(ws), fn(Rs);
  }
  function yv(n) {
    Tu(Rs.current);
    var r = Tu(Di.current), u = br(r, n.type);
    r !== u && (Ke(ws, n), Ke(Di, u));
  }
  function Qc(n) {
    ws.current === n && (fn(Di), fn(ws));
  }
  var Rn = za(0);
  function Gc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var u = r.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || u.data === "$!")) return r;
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
  var bs = [];
  function Je() {
    for (var n = 0; n < bs.length; n++) bs[n]._workInProgressVersionPrimary = null;
    bs.length = 0;
  }
  var Rt = Ne.ReactCurrentDispatcher, Vt = Ne.ReactCurrentBatchConfig, en = 0, Bt = null, Bn = null, rr = null, Xc = !1, _s = !1, Du = 0, he = 0;
  function Ft() {
    throw Error(d(321));
  }
  function st(n, r) {
    if (r === null) return !1;
    for (var u = 0; u < r.length && u < n.length; u++) if (!ii(n[u], r[u])) return !1;
    return !0;
  }
  function Hl(n, r, u, s, p, m) {
    if (en = m, Bt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Rt.current = n === null || n.memoizedState === null ? ff : Ns, n = u(s, p), _s) {
      m = 0;
      do {
        if (_s = !1, Du = 0, 25 <= m) throw Error(d(301));
        m += 1, rr = Bn = null, r.updateQueue = null, Rt.current = df, n = u(s, p);
      } while (_s);
    }
    if (Rt.current = zu, r = Bn !== null && Bn.next !== null, en = 0, rr = Bn = Bt = null, Xc = !1, r) throw Error(d(300));
    return n;
  }
  function ui() {
    var n = Du !== 0;
    return Du = 0, n;
  }
  function kr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return rr === null ? Bt.memoizedState = rr = n : rr = rr.next = n, rr;
  }
  function Nn() {
    if (Bn === null) {
      var n = Bt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = Bn.next;
    var r = rr === null ? Bt.memoizedState : rr.next;
    if (r !== null) rr = r, Bn = n;
    else {
      if (n === null) throw Error(d(310));
      Bn = n, n = { memoizedState: Bn.memoizedState, baseState: Bn.baseState, baseQueue: Bn.baseQueue, queue: Bn.queue, next: null }, rr === null ? Bt.memoizedState = rr = n : rr = rr.next = n;
    }
    return rr;
  }
  function el(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Pl(n) {
    var r = Nn(), u = r.queue;
    if (u === null) throw Error(d(311));
    u.lastRenderedReducer = n;
    var s = Bn, p = s.baseQueue, m = u.pending;
    if (m !== null) {
      if (p !== null) {
        var w = p.next;
        p.next = m.next, m.next = w;
      }
      s.baseQueue = p = m, u.pending = null;
    }
    if (p !== null) {
      m = p.next, s = s.baseState;
      var M = w = null, U = null, X = m;
      do {
        var me = X.lane;
        if ((en & me) === me) U !== null && (U = U.next = { lane: 0, action: X.action, hasEagerState: X.hasEagerState, eagerState: X.eagerState, next: null }), s = X.hasEagerState ? X.eagerState : n(s, X.action);
        else {
          var Ee = {
            lane: me,
            action: X.action,
            hasEagerState: X.hasEagerState,
            eagerState: X.eagerState,
            next: null
          };
          U === null ? (M = U = Ee, w = s) : U = U.next = Ee, Bt.lanes |= me, Li |= me;
        }
        X = X.next;
      } while (X !== null && X !== m);
      U === null ? w = s : U.next = M, ii(s, r.memoizedState) || ($n = !0), r.memoizedState = s, r.baseState = w, r.baseQueue = U, u.lastRenderedState = s;
    }
    if (n = u.interleaved, n !== null) {
      p = n;
      do
        m = p.lane, Bt.lanes |= m, Li |= m, p = p.next;
      while (p !== n);
    } else p === null && (u.lanes = 0);
    return [r.memoizedState, u.dispatch];
  }
  function Mu(n) {
    var r = Nn(), u = r.queue;
    if (u === null) throw Error(d(311));
    u.lastRenderedReducer = n;
    var s = u.dispatch, p = u.pending, m = r.memoizedState;
    if (p !== null) {
      u.pending = null;
      var w = p = p.next;
      do
        m = n(m, w.action), w = w.next;
      while (w !== p);
      ii(m, r.memoizedState) || ($n = !0), r.memoizedState = m, r.baseQueue === null && (r.baseState = m), u.lastRenderedState = m;
    }
    return [m, s];
  }
  function qc() {
  }
  function Kc(n, r) {
    var u = Bt, s = Nn(), p = r(), m = !ii(s.memoizedState, p);
    if (m && (s.memoizedState = p, $n = !0), s = s.queue, Ts(ef.bind(null, u, s, n), [n]), s.getSnapshot !== r || m || rr !== null && rr.memoizedState.tag & 1) {
      if (u.flags |= 2048, Ou(9, Jc.bind(null, u, s, p, r), void 0, null), Jn === null) throw Error(d(349));
      (en & 30) !== 0 || Zc(u, r, p);
    }
    return p;
  }
  function Zc(n, r, u) {
    n.flags |= 16384, n = { getSnapshot: r, value: u }, r = Bt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Bt.updateQueue = r, r.stores = [n]) : (u = r.stores, u === null ? r.stores = [n] : u.push(n));
  }
  function Jc(n, r, u, s) {
    r.value = u, r.getSnapshot = s, tf(r) && nf(n);
  }
  function ef(n, r, u) {
    return u(function() {
      tf(r) && nf(n);
    });
  }
  function tf(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var u = r();
      return !ii(n, u);
    } catch {
      return !0;
    }
  }
  function nf(n) {
    var r = ga(n, 1);
    r !== null && Hr(r, n, 1, -1);
  }
  function rf(n) {
    var r = kr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: el, lastRenderedState: n }, r.queue = n, n = n.dispatch = Lu.bind(null, Bt, n), [r.memoizedState, n];
  }
  function Ou(n, r, u, s) {
    return n = { tag: n, create: r, destroy: u, deps: s, next: null }, r = Bt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Bt.updateQueue = r, r.lastEffect = n.next = n) : (u = r.lastEffect, u === null ? r.lastEffect = n.next = n : (s = u.next, u.next = n, n.next = s, r.lastEffect = n)), n;
  }
  function af() {
    return Nn().memoizedState;
  }
  function ko(n, r, u, s) {
    var p = kr();
    Bt.flags |= n, p.memoizedState = Ou(1 | r, u, void 0, s === void 0 ? null : s);
  }
  function Do(n, r, u, s) {
    var p = Nn();
    s = s === void 0 ? null : s;
    var m = void 0;
    if (Bn !== null) {
      var w = Bn.memoizedState;
      if (m = w.destroy, s !== null && st(s, w.deps)) {
        p.memoizedState = Ou(r, u, m, s);
        return;
      }
    }
    Bt.flags |= n, p.memoizedState = Ou(1 | r, u, m, s);
  }
  function lf(n, r) {
    return ko(8390656, 8, n, r);
  }
  function Ts(n, r) {
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
  function of(n, r, u) {
    return u = u != null ? u.concat([n]) : null, Do(4, 4, Nu.bind(null, r, n), u);
  }
  function Ds() {
  }
  function sf(n, r) {
    var u = Nn();
    r = r === void 0 ? null : r;
    var s = u.memoizedState;
    return s !== null && r !== null && st(r, s[1]) ? s[0] : (u.memoizedState = [n, r], n);
  }
  function cf(n, r) {
    var u = Nn();
    r = r === void 0 ? null : r;
    var s = u.memoizedState;
    return s !== null && r !== null && st(r, s[1]) ? s[0] : (n = n(), u.memoizedState = [n, r], n);
  }
  function qd(n, r, u) {
    return (en & 21) === 0 ? (n.baseState && (n.baseState = !1, $n = !0), n.memoizedState = u) : (ii(u, r) || (u = uo(), Bt.lanes |= u, Li |= u, n.baseState = !0), r);
  }
  function Ms(n, r) {
    var u = Pt;
    Pt = u !== 0 && 4 > u ? u : 4, n(!0);
    var s = Vt.transition;
    Vt.transition = {};
    try {
      n(!1), r();
    } finally {
      Pt = u, Vt.transition = s;
    }
  }
  function Kd() {
    return Nn().memoizedState;
  }
  function Os(n, r, u) {
    var s = zi(n);
    if (u = { lane: s, action: u, hasEagerState: !1, eagerState: null, next: null }, ra(n)) gv(r, u);
    else if (u = Wd(n, r, u, s), u !== null) {
      var p = Wn();
      Hr(u, n, s, p), an(u, r, s);
    }
  }
  function Lu(n, r, u) {
    var s = zi(n), p = { lane: s, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (ra(n)) gv(r, p);
    else {
      var m = n.alternate;
      if (n.lanes === 0 && (m === null || m.lanes === 0) && (m = r.lastRenderedReducer, m !== null)) try {
        var w = r.lastRenderedState, M = m(w, u);
        if (p.hasEagerState = !0, p.eagerState = M, ii(M, w)) {
          var U = r.interleaved;
          U === null ? (p.next = p, Yd(r)) : (p.next = U.next, U.next = p), r.interleaved = p;
          return;
        }
      } catch {
      } finally {
      }
      u = Wd(n, r, p, s), u !== null && (p = Wn(), Hr(u, n, s, p), an(u, r, s));
    }
  }
  function ra(n) {
    var r = n.alternate;
    return n === Bt || r !== null && r === Bt;
  }
  function gv(n, r) {
    _s = Xc = !0;
    var u = n.pending;
    u === null ? r.next = r : (r.next = u.next, u.next = r), n.pending = r;
  }
  function an(n, r, u) {
    if ((u & 4194240) !== 0) {
      var s = r.lanes;
      s &= n.pendingLanes, u |= s, r.lanes = u, Ii(n, u);
    }
  }
  var zu = { readContext: Fa, useCallback: Ft, useContext: Ft, useEffect: Ft, useImperativeHandle: Ft, useInsertionEffect: Ft, useLayoutEffect: Ft, useMemo: Ft, useReducer: Ft, useRef: Ft, useState: Ft, useDebugValue: Ft, useDeferredValue: Ft, useTransition: Ft, useMutableSource: Ft, useSyncExternalStore: Ft, useId: Ft, unstable_isNewReconciler: !1 }, ff = { readContext: Fa, useCallback: function(n, r) {
    return kr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Fa, useEffect: lf, useImperativeHandle: function(n, r, u) {
    return u = u != null ? u.concat([n]) : null, ko(
      4194308,
      4,
      Nu.bind(null, r, n),
      u
    );
  }, useLayoutEffect: function(n, r) {
    return ko(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return ko(4, 2, n, r);
  }, useMemo: function(n, r) {
    var u = kr();
    return r = r === void 0 ? null : r, n = n(), u.memoizedState = [n, r], n;
  }, useReducer: function(n, r, u) {
    var s = kr();
    return r = u !== void 0 ? u(r) : r, s.memoizedState = s.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, s.queue = n, n = n.dispatch = Os.bind(null, Bt, n), [s.memoizedState, n];
  }, useRef: function(n) {
    var r = kr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: rf, useDebugValue: Ds, useDeferredValue: function(n) {
    return kr().memoizedState = n;
  }, useTransition: function() {
    var n = rf(!1), r = n[0];
    return n = Ms.bind(null, n[1]), kr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, u) {
    var s = Bt, p = kr();
    if (gn) {
      if (u === void 0) throw Error(d(407));
      u = u();
    } else {
      if (u = r(), Jn === null) throw Error(d(349));
      (en & 30) !== 0 || Zc(s, r, u);
    }
    p.memoizedState = u;
    var m = { value: u, getSnapshot: r };
    return p.queue = m, lf(ef.bind(
      null,
      s,
      m,
      n
    ), [n]), s.flags |= 2048, Ou(9, Jc.bind(null, s, m, u, r), void 0, null), u;
  }, useId: function() {
    var n = kr(), r = Jn.identifierPrefix;
    if (gn) {
      var u = ki, s = Ti;
      u = (s & ~(1 << 32 - Lr(s) - 1)).toString(32) + u, r = ":" + r + "R" + u, u = Du++, 0 < u && (r += "H" + u.toString(32)), r += ":";
    } else u = he++, r = ":" + r + "r" + u.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Ns = {
    readContext: Fa,
    useCallback: sf,
    useContext: Fa,
    useEffect: Ts,
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
      var r = Nn();
      return qd(r, Bn.memoizedState, n);
    },
    useTransition: function() {
      var n = Pl(el)[0], r = Nn().memoizedState;
      return [n, r];
    },
    useMutableSource: qc,
    useSyncExternalStore: Kc,
    useId: Kd,
    unstable_isNewReconciler: !1
  }, df = { readContext: Fa, useCallback: sf, useContext: Fa, useEffect: Ts, useImperativeHandle: of, useInsertionEffect: uf, useLayoutEffect: ks, useMemo: cf, useReducer: Mu, useRef: af, useState: function() {
    return Mu(el);
  }, useDebugValue: Ds, useDeferredValue: function(n) {
    var r = Nn();
    return Bn === null ? r.memoizedState = n : qd(r, Bn.memoizedState, n);
  }, useTransition: function() {
    var n = Mu(el)[0], r = Nn().memoizedState;
    return [n, r];
  }, useMutableSource: qc, useSyncExternalStore: Kc, useId: Kd, unstable_isNewReconciler: !1 };
  function oi(n, r) {
    if (n && n.defaultProps) {
      r = ee({}, r), n = n.defaultProps;
      for (var u in n) r[u] === void 0 && (r[u] = n[u]);
      return r;
    }
    return r;
  }
  function Zd(n, r, u, s) {
    r = n.memoizedState, u = u(s, r), u = u == null ? r : ee({}, r, u), n.memoizedState = u, n.lanes === 0 && (n.updateQueue.baseState = u);
  }
  var pf = { isMounted: function(n) {
    return (n = n._reactInternals) ? yt(n) === n : !1;
  }, enqueueSetState: function(n, r, u) {
    n = n._reactInternals;
    var s = Wn(), p = zi(n), m = Ji(s, p);
    m.payload = r, u != null && (m.callback = u), r = jl(n, m, p), r !== null && (Hr(r, n, p, s), Wc(r, n, p));
  }, enqueueReplaceState: function(n, r, u) {
    n = n._reactInternals;
    var s = Wn(), p = zi(n), m = Ji(s, p);
    m.tag = 1, m.payload = r, u != null && (m.callback = u), r = jl(n, m, p), r !== null && (Hr(r, n, p, s), Wc(r, n, p));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var u = Wn(), s = zi(n), p = Ji(u, s);
    p.tag = 2, r != null && (p.callback = r), r = jl(n, p, s), r !== null && (Hr(r, n, s, u), Wc(r, n, s));
  } };
  function Sv(n, r, u, s, p, m, w) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(s, m, w) : r.prototype && r.prototype.isPureReactComponent ? !fs(u, s) || !fs(p, m) : !0;
  }
  function hf(n, r, u) {
    var s = !1, p = Tr, m = r.contextType;
    return typeof m == "object" && m !== null ? m = Fa(m) : (p = Pn(r) ? Zr : kn.current, s = r.contextTypes, m = (s = s != null) ? Jr(n, p) : Tr), r = new r(u, m), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = pf, n.stateNode = r, r._reactInternals = n, s && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = p, n.__reactInternalMemoizedMaskedChildContext = m), r;
  }
  function xv(n, r, u, s) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(u, s), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(u, s), r.state !== n && pf.enqueueReplaceState(r, r.state, null);
  }
  function Ls(n, r, u, s) {
    var p = n.stateNode;
    p.props = u, p.state = n.memoizedState, p.refs = {}, Qd(n);
    var m = r.contextType;
    typeof m == "object" && m !== null ? p.context = Fa(m) : (m = Pn(r) ? Zr : kn.current, p.context = Jr(n, m)), p.state = n.memoizedState, m = r.getDerivedStateFromProps, typeof m == "function" && (Zd(n, r, m, u), p.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function" || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (r = p.state, typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount(), r !== p.state && pf.enqueueReplaceState(p, p.state, null), Es(n, u, p, s), p.state = n.memoizedState), typeof p.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Au(n, r) {
    try {
      var u = "", s = r;
      do
        u += et(s), s = s.return;
      while (s);
      var p = u;
    } catch (m) {
      p = `
Error generating stack: ` + m.message + `
` + m.stack;
    }
    return { value: n, source: r, stack: p, digest: null };
  }
  function Jd(n, r, u) {
    return { value: n, source: null, stack: u ?? null, digest: r ?? null };
  }
  function ep(n, r) {
    try {
      console.error(r.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var vf = typeof WeakMap == "function" ? WeakMap : Map;
  function Ev(n, r, u) {
    u = Ji(-1, u), u.tag = 3, u.payload = { element: null };
    var s = r.value;
    return u.callback = function() {
      Ao || (Ao = !0, ju = s), ep(n, r);
    }, u;
  }
  function tp(n, r, u) {
    u = Ji(-1, u), u.tag = 3;
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var p = r.value;
      u.payload = function() {
        return s(p);
      }, u.callback = function() {
        ep(n, r);
      };
    }
    var m = n.stateNode;
    return m !== null && typeof m.componentDidCatch == "function" && (u.callback = function() {
      ep(n, r), typeof s != "function" && ($l === null ? $l = /* @__PURE__ */ new Set([this]) : $l.add(this));
      var w = r.stack;
      this.componentDidCatch(r.value, { componentStack: w !== null ? w : "" });
    }), u;
  }
  function np(n, r, u) {
    var s = n.pingCache;
    if (s === null) {
      s = n.pingCache = new vf();
      var p = /* @__PURE__ */ new Set();
      s.set(r, p);
    } else p = s.get(r), p === void 0 && (p = /* @__PURE__ */ new Set(), s.set(r, p));
    p.has(u) || (p.add(u), n = Eg.bind(null, n, r, u), r.then(n, n));
  }
  function Cv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Vl(n, r, u, s, p) {
    return (n.mode & 1) === 0 ? (n === r ? n.flags |= 65536 : (n.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (r = Ji(-1, 1), r.tag = 2, jl(u, r, 1))), u.lanes |= 1), n) : (n.flags |= 65536, n.lanes = p, n);
  }
  var zs = Ne.ReactCurrentOwner, $n = !1;
  function dr(n, r, u, s) {
    r.child = n === null ? De(r, null, u, s) : On(r, n.child, u, s);
  }
  function aa(n, r, u, s, p) {
    u = u.render;
    var m = r.ref;
    return wn(r, p), s = Hl(n, r, u, s, m, p), u = ui(), n !== null && !$n ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Ha(n, r, p)) : (gn && u && Bc(r), r.flags |= 1, dr(n, r, s, p), r.child);
  }
  function Uu(n, r, u, s, p) {
    if (n === null) {
      var m = u.type;
      return typeof m == "function" && !mp(m) && m.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (r.tag = 15, r.type = m, xt(n, r, m, s, p)) : (n = qs(u.type, null, s, r, r.mode, p), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (m = n.child, (n.lanes & p) === 0) {
      var w = m.memoizedProps;
      if (u = u.compare, u = u !== null ? u : fs, u(w, s) && n.ref === r.ref) return Ha(n, r, p);
    }
    return r.flags |= 1, n = Yl(m, s), n.ref = r.ref, n.return = r, r.child = n;
  }
  function xt(n, r, u, s, p) {
    if (n !== null) {
      var m = n.memoizedProps;
      if (fs(m, s) && n.ref === r.ref) if ($n = !1, r.pendingProps = s = m, (n.lanes & p) !== 0) (n.flags & 131072) !== 0 && ($n = !0);
      else return r.lanes = n.lanes, Ha(n, r, p);
    }
    return wv(n, r, u, s, p);
  }
  function As(n, r, u) {
    var s = r.pendingProps, p = s.children, m = n !== null ? n.memoizedState : null;
    if (s.mode === "hidden") if ((r.mode & 1) === 0) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ke(No, xa), xa |= u;
    else {
      if ((u & 1073741824) === 0) return n = m !== null ? m.baseLanes | u : u, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Ke(No, xa), xa |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = m !== null ? m.baseLanes : u, Ke(No, xa), xa |= s;
    }
    else m !== null ? (s = m.baseLanes | u, r.memoizedState = null) : s = u, Ke(No, xa), xa |= s;
    return dr(n, r, p, u), r.child;
  }
  function rp(n, r) {
    var u = r.ref;
    (n === null && u !== null || n !== null && n.ref !== u) && (r.flags |= 512, r.flags |= 2097152);
  }
  function wv(n, r, u, s, p) {
    var m = Pn(u) ? Zr : kn.current;
    return m = Jr(r, m), wn(r, p), u = Hl(n, r, u, s, m, p), s = ui(), n !== null && !$n ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Ha(n, r, p)) : (gn && s && Bc(r), r.flags |= 1, dr(n, r, u, p), r.child);
  }
  function Rv(n, r, u, s, p) {
    if (Pn(u)) {
      var m = !0;
      nr(r);
    } else m = !1;
    if (wn(r, p), r.stateNode === null) ja(n, r), hf(r, u, s), Ls(r, u, s, p), s = !0;
    else if (n === null) {
      var w = r.stateNode, M = r.memoizedProps;
      w.props = M;
      var U = w.context, X = u.contextType;
      typeof X == "object" && X !== null ? X = Fa(X) : (X = Pn(u) ? Zr : kn.current, X = Jr(r, X));
      var me = u.getDerivedStateFromProps, Ee = typeof me == "function" || typeof w.getSnapshotBeforeUpdate == "function";
      Ee || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (M !== s || U !== X) && xv(r, w, s, X), Sa = !1;
      var ve = r.memoizedState;
      w.state = ve, Es(r, s, w, p), U = r.memoizedState, M !== s || ve !== U || Kn.current || Sa ? (typeof me == "function" && (Zd(r, u, me, s), U = r.memoizedState), (M = Sa || Sv(r, u, M, s, ve, U, X)) ? (Ee || typeof w.UNSAFE_componentWillMount != "function" && typeof w.componentWillMount != "function" || (typeof w.componentWillMount == "function" && w.componentWillMount(), typeof w.UNSAFE_componentWillMount == "function" && w.UNSAFE_componentWillMount()), typeof w.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof w.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = s, r.memoizedState = U), w.props = s, w.state = U, w.context = X, s = M) : (typeof w.componentDidMount == "function" && (r.flags |= 4194308), s = !1);
    } else {
      w = r.stateNode, vv(n, r), M = r.memoizedProps, X = r.type === r.elementType ? M : oi(r.type, M), w.props = X, Ee = r.pendingProps, ve = w.context, U = u.contextType, typeof U == "object" && U !== null ? U = Fa(U) : (U = Pn(u) ? Zr : kn.current, U = Jr(r, U));
      var Ue = u.getDerivedStateFromProps;
      (me = typeof Ue == "function" || typeof w.getSnapshotBeforeUpdate == "function") || typeof w.UNSAFE_componentWillReceiveProps != "function" && typeof w.componentWillReceiveProps != "function" || (M !== Ee || ve !== U) && xv(r, w, s, U), Sa = !1, ve = r.memoizedState, w.state = ve, Es(r, s, w, p);
      var $e = r.memoizedState;
      M !== Ee || ve !== $e || Kn.current || Sa ? (typeof Ue == "function" && (Zd(r, u, Ue, s), $e = r.memoizedState), (X = Sa || Sv(r, u, X, s, ve, $e, U) || !1) ? (me || typeof w.UNSAFE_componentWillUpdate != "function" && typeof w.componentWillUpdate != "function" || (typeof w.componentWillUpdate == "function" && w.componentWillUpdate(s, $e, U), typeof w.UNSAFE_componentWillUpdate == "function" && w.UNSAFE_componentWillUpdate(s, $e, U)), typeof w.componentDidUpdate == "function" && (r.flags |= 4), typeof w.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof w.componentDidUpdate != "function" || M === n.memoizedProps && ve === n.memoizedState || (r.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || M === n.memoizedProps && ve === n.memoizedState || (r.flags |= 1024), r.memoizedProps = s, r.memoizedState = $e), w.props = s, w.state = $e, w.context = U, s = X) : (typeof w.componentDidUpdate != "function" || M === n.memoizedProps && ve === n.memoizedState || (r.flags |= 4), typeof w.getSnapshotBeforeUpdate != "function" || M === n.memoizedProps && ve === n.memoizedState || (r.flags |= 1024), s = !1);
    }
    return Us(n, r, u, s, m, p);
  }
  function Us(n, r, u, s, p, m) {
    rp(n, r);
    var w = (r.flags & 128) !== 0;
    if (!s && !w) return p && Pc(r, u, !1), Ha(n, r, m);
    s = r.stateNode, zs.current = r;
    var M = w && typeof u.getDerivedStateFromError != "function" ? null : s.render();
    return r.flags |= 1, n !== null && w ? (r.child = On(r, n.child, null, m), r.child = On(r, null, M, m)) : dr(n, r, M, m), r.memoizedState = s.state, p && Pc(r, u, !0), r.child;
  }
  function Mo(n) {
    var r = n.stateNode;
    r.pendingContext ? fv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && fv(n, r.context, !1), Xd(n, r.containerInfo);
  }
  function bv(n, r, u, s, p) {
    return Fl(), Zi(p), r.flags |= 256, dr(n, r, u, s), r.child;
  }
  var mf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ap(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function yf(n, r, u) {
    var s = r.pendingProps, p = Rn.current, m = !1, w = (r.flags & 128) !== 0, M;
    if ((M = w) || (M = n !== null && n.memoizedState === null ? !1 : (p & 2) !== 0), M ? (m = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (p |= 1), Ke(Rn, p & 1), n === null)
      return Pd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((r.mode & 1) === 0 ? r.lanes = 1 : n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824, null) : (w = s.children, n = s.fallback, m ? (s = r.mode, m = r.child, w = { mode: "hidden", children: w }, (s & 1) === 0 && m !== null ? (m.childLanes = 0, m.pendingProps = w) : m = Wl(w, s, 0, null), n = al(n, s, u, null), m.return = r, n.return = r, m.sibling = n, r.child = m, r.child.memoizedState = ap(u), r.memoizedState = mf, n) : ip(r, w));
    if (p = n.memoizedState, p !== null && (M = p.dehydrated, M !== null)) return _v(n, r, w, s, M, p, u);
    if (m) {
      m = s.fallback, w = r.mode, p = n.child, M = p.sibling;
      var U = { mode: "hidden", children: s.children };
      return (w & 1) === 0 && r.child !== p ? (s = r.child, s.childLanes = 0, s.pendingProps = U, r.deletions = null) : (s = Yl(p, U), s.subtreeFlags = p.subtreeFlags & 14680064), M !== null ? m = Yl(M, m) : (m = al(m, w, u, null), m.flags |= 2), m.return = r, s.return = r, s.sibling = m, r.child = s, s = m, m = r.child, w = n.child.memoizedState, w = w === null ? ap(u) : { baseLanes: w.baseLanes | u, cachePool: null, transitions: w.transitions }, m.memoizedState = w, m.childLanes = n.childLanes & ~u, r.memoizedState = mf, s;
    }
    return m = n.child, n = m.sibling, s = Yl(m, { mode: "visible", children: s.children }), (r.mode & 1) === 0 && (s.lanes = u), s.return = r, s.sibling = null, n !== null && (u = r.deletions, u === null ? (r.deletions = [n], r.flags |= 16) : u.push(n)), r.child = s, r.memoizedState = null, s;
  }
  function ip(n, r) {
    return r = Wl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Fs(n, r, u, s) {
    return s !== null && Zi(s), On(r, n.child, null, u), n = ip(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function _v(n, r, u, s, p, m, w) {
    if (u)
      return r.flags & 256 ? (r.flags &= -257, s = Jd(Error(d(422))), Fs(n, r, w, s)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (m = s.fallback, p = r.mode, s = Wl({ mode: "visible", children: s.children }, p, 0, null), m = al(m, p, w, null), m.flags |= 2, s.return = r, m.return = r, s.sibling = m, r.child = s, (r.mode & 1) !== 0 && On(r, n.child, null, w), r.child.memoizedState = ap(w), r.memoizedState = mf, m);
    if ((r.mode & 1) === 0) return Fs(n, r, w, null);
    if (p.data === "$!") {
      if (s = p.nextSibling && p.nextSibling.dataset, s) var M = s.dgst;
      return s = M, m = Error(d(419)), s = Jd(m, s, void 0), Fs(n, r, w, s);
    }
    if (M = (w & n.childLanes) !== 0, $n || M) {
      if (s = Jn, s !== null) {
        switch (w & -w) {
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
        p = (p & (s.suspendedLanes | w)) !== 0 ? 0 : p, p !== 0 && p !== m.retryLane && (m.retryLane = p, ga(n, p), Hr(s, n, p, -1));
      }
      return vp(), s = Jd(Error(d(421))), Fs(n, r, w, s);
    }
    return p.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Cg.bind(null, n), p._reactRetry = r, null) : (n = m.treeContext, ta = wi(p.nextSibling), ea = r, gn = !0, Ua = null, n !== null && (Vn[Aa++] = Ti, Vn[Aa++] = ki, Vn[Aa++] = ma, Ti = n.id, ki = n.overflow, ma = r), r = ip(r, s.children), r.flags |= 4096, r);
  }
  function lp(n, r, u) {
    n.lanes |= r;
    var s = n.alternate;
    s !== null && (s.lanes |= r), Id(n.return, r, u);
  }
  function Ur(n, r, u, s, p) {
    var m = n.memoizedState;
    m === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: s, tail: u, tailMode: p } : (m.isBackwards = r, m.rendering = null, m.renderingStartTime = 0, m.last = s, m.tail = u, m.tailMode = p);
  }
  function Mi(n, r, u) {
    var s = r.pendingProps, p = s.revealOrder, m = s.tail;
    if (dr(n, r, s.children, u), s = Rn.current, (s & 2) !== 0) s = s & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && lp(n, u, r);
        else if (n.tag === 19) lp(n, u, r);
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
    if (Ke(Rn, s), (r.mode & 1) === 0) r.memoizedState = null;
    else switch (p) {
      case "forwards":
        for (u = r.child, p = null; u !== null; ) n = u.alternate, n !== null && Gc(n) === null && (p = u), u = u.sibling;
        u = p, u === null ? (p = r.child, r.child = null) : (p = u.sibling, u.sibling = null), Ur(r, !1, p, u, m);
        break;
      case "backwards":
        for (u = null, p = r.child, r.child = null; p !== null; ) {
          if (n = p.alternate, n !== null && Gc(n) === null) {
            r.child = p;
            break;
          }
          n = p.sibling, p.sibling = u, u = p, p = n;
        }
        Ur(r, !0, u, null, m);
        break;
      case "together":
        Ur(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function ja(n, r) {
    (r.mode & 1) === 0 && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Ha(n, r, u) {
    if (n !== null && (r.dependencies = n.dependencies), Li |= r.lanes, (u & r.childLanes) === 0) return null;
    if (n !== null && r.child !== n.child) throw Error(d(153));
    if (r.child !== null) {
      for (n = r.child, u = Yl(n, n.pendingProps), r.child = u, u.return = r; n.sibling !== null; ) n = n.sibling, u = u.sibling = Yl(n, n.pendingProps), u.return = r;
      u.sibling = null;
    }
    return r.child;
  }
  function js(n, r, u) {
    switch (r.tag) {
      case 3:
        Mo(r), Fl();
        break;
      case 5:
        yv(r);
        break;
      case 1:
        Pn(r.type) && nr(r);
        break;
      case 4:
        Xd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var s = r.type._context, p = r.memoizedProps.value;
        Ke(ya, s._currentValue), s._currentValue = p;
        break;
      case 13:
        if (s = r.memoizedState, s !== null)
          return s.dehydrated !== null ? (Ke(Rn, Rn.current & 1), r.flags |= 128, null) : (u & r.child.childLanes) !== 0 ? yf(n, r, u) : (Ke(Rn, Rn.current & 1), n = Ha(n, r, u), n !== null ? n.sibling : null);
        Ke(Rn, Rn.current & 1);
        break;
      case 19:
        if (s = (u & r.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (s) return Mi(n, r, u);
          r.flags |= 128;
        }
        if (p = r.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), Ke(Rn, Rn.current), s) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, As(n, r, u);
    }
    return Ha(n, r, u);
  }
  var Pa, In, Tv, kv;
  Pa = function(n, r) {
    for (var u = r.child; u !== null; ) {
      if (u.tag === 5 || u.tag === 6) n.appendChild(u.stateNode);
      else if (u.tag !== 4 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue;
      }
      if (u === r) break;
      for (; u.sibling === null; ) {
        if (u.return === null || u.return === r) return;
        u = u.return;
      }
      u.sibling.return = u.return, u = u.sibling;
    }
  }, In = function() {
  }, Tv = function(n, r, u, s) {
    var p = n.memoizedProps;
    if (p !== s) {
      n = r.stateNode, Tu(Di.current);
      var m = null;
      switch (u) {
        case "input":
          p = Fn(n, p), s = Fn(n, s), m = [];
          break;
        case "select":
          p = ee({}, p, { value: void 0 }), s = ee({}, s, { value: void 0 }), m = [];
          break;
        case "textarea":
          p = dn(n, p), s = dn(n, s), m = [];
          break;
        default:
          typeof p.onClick != "function" && typeof s.onClick == "function" && (n.onclick = Ol);
      }
      pn(u, s);
      var w;
      u = null;
      for (X in p) if (!s.hasOwnProperty(X) && p.hasOwnProperty(X) && p[X] != null) if (X === "style") {
        var M = p[X];
        for (w in M) M.hasOwnProperty(w) && (u || (u = {}), u[w] = "");
      } else X !== "dangerouslySetInnerHTML" && X !== "children" && X !== "suppressContentEditableWarning" && X !== "suppressHydrationWarning" && X !== "autoFocus" && (g.hasOwnProperty(X) ? m || (m = []) : (m = m || []).push(X, null));
      for (X in s) {
        var U = s[X];
        if (M = p != null ? p[X] : void 0, s.hasOwnProperty(X) && U !== M && (U != null || M != null)) if (X === "style") if (M) {
          for (w in M) !M.hasOwnProperty(w) || U && U.hasOwnProperty(w) || (u || (u = {}), u[w] = "");
          for (w in U) U.hasOwnProperty(w) && M[w] !== U[w] && (u || (u = {}), u[w] = U[w]);
        } else u || (m || (m = []), m.push(
          X,
          u
        )), u = U;
        else X === "dangerouslySetInnerHTML" ? (U = U ? U.__html : void 0, M = M ? M.__html : void 0, U != null && M !== U && (m = m || []).push(X, U)) : X === "children" ? typeof U != "string" && typeof U != "number" || (m = m || []).push(X, "" + U) : X !== "suppressContentEditableWarning" && X !== "suppressHydrationWarning" && (g.hasOwnProperty(X) ? (U != null && X === "onScroll" && Qt("scroll", n), m || M === U || (m = [])) : (m = m || []).push(X, U));
      }
      u && (m = m || []).push("style", u);
      var X = m;
      (r.updateQueue = X) && (r.flags |= 4);
    }
  }, kv = function(n, r, u, s) {
    u !== s && (r.flags |= 4);
  };
  function Hs(n, r) {
    if (!gn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var u = null; r !== null; ) r.alternate !== null && (u = r), r = r.sibling;
        u === null ? n.tail = null : u.sibling = null;
        break;
      case "collapsed":
        u = n.tail;
        for (var s = null; u !== null; ) u.alternate !== null && (s = u), u = u.sibling;
        s === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : s.sibling = null;
    }
  }
  function ar(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, u = 0, s = 0;
    if (r) for (var p = n.child; p !== null; ) u |= p.lanes | p.childLanes, s |= p.subtreeFlags & 14680064, s |= p.flags & 14680064, p.return = n, p = p.sibling;
    else for (p = n.child; p !== null; ) u |= p.lanes | p.childLanes, s |= p.subtreeFlags, s |= p.flags, p.return = n, p = p.sibling;
    return n.subtreeFlags |= s, n.childLanes = u, r;
  }
  function Dv(n, r, u) {
    var s = r.pendingProps;
    switch ($c(r), r.tag) {
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
        return ar(r), null;
      case 1:
        return Pn(r.type) && bo(), ar(r), null;
      case 3:
        return s = r.stateNode, ku(), fn(Kn), fn(kn), Je(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (n === null || n.child === null) && (Ic(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, Ua !== null && (Hu(Ua), Ua = null))), In(n, r), ar(r), null;
      case 5:
        Qc(r);
        var p = Tu(Rs.current);
        if (u = r.type, n !== null && r.stateNode != null) Tv(n, r, u, s, p), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!s) {
            if (r.stateNode === null) throw Error(d(166));
            return ar(r), null;
          }
          if (n = Tu(Di.current), Ic(r)) {
            s = r.stateNode, u = r.type;
            var m = r.memoizedProps;
            switch (s[Ri] = r, s[ys] = m, n = (r.mode & 1) !== 0, u) {
              case "dialog":
                Qt("cancel", s), Qt("close", s);
                break;
              case "iframe":
              case "object":
              case "embed":
                Qt("load", s);
                break;
              case "video":
              case "audio":
                for (p = 0; p < hs.length; p++) Qt(hs[p], s);
                break;
              case "source":
                Qt("error", s);
                break;
              case "img":
              case "image":
              case "link":
                Qt(
                  "error",
                  s
                ), Qt("load", s);
                break;
              case "details":
                Qt("toggle", s);
                break;
              case "input":
                Tn(s, m), Qt("invalid", s);
                break;
              case "select":
                s._wrapperState = { wasMultiple: !!m.multiple }, Qt("invalid", s);
                break;
              case "textarea":
                jn(s, m), Qt("invalid", s);
            }
            pn(u, m), p = null;
            for (var w in m) if (m.hasOwnProperty(w)) {
              var M = m[w];
              w === "children" ? typeof M == "string" ? s.textContent !== M && (m.suppressHydrationWarning !== !0 && Uc(s.textContent, M, n), p = ["children", M]) : typeof M == "number" && s.textContent !== "" + M && (m.suppressHydrationWarning !== !0 && Uc(
                s.textContent,
                M,
                n
              ), p = ["children", "" + M]) : g.hasOwnProperty(w) && M != null && w === "onScroll" && Qt("scroll", s);
            }
            switch (u) {
              case "input":
                _n(s), Ta(s, m, !0);
                break;
              case "textarea":
                _n(s), yn(s);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof m.onClick == "function" && (s.onclick = Ol);
            }
            s = p, r.updateQueue = s, s !== null && (r.flags |= 4);
          } else {
            w = p.nodeType === 9 ? p : p.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Xn(u)), n === "http://www.w3.org/1999/xhtml" ? u === "script" ? (n = w.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof s.is == "string" ? n = w.createElement(u, { is: s.is }) : (n = w.createElement(u), u === "select" && (w = n, s.multiple ? w.multiple = !0 : s.size && (w.size = s.size))) : n = w.createElementNS(n, u), n[Ri] = r, n[ys] = s, Pa(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (w = tr(u, s), u) {
                case "dialog":
                  Qt("cancel", n), Qt("close", n), p = s;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Qt("load", n), p = s;
                  break;
                case "video":
                case "audio":
                  for (p = 0; p < hs.length; p++) Qt(hs[p], n);
                  p = s;
                  break;
                case "source":
                  Qt("error", n), p = s;
                  break;
                case "img":
                case "image":
                case "link":
                  Qt(
                    "error",
                    n
                  ), Qt("load", n), p = s;
                  break;
                case "details":
                  Qt("toggle", n), p = s;
                  break;
                case "input":
                  Tn(n, s), p = Fn(n, s), Qt("invalid", n);
                  break;
                case "option":
                  p = s;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!s.multiple }, p = ee({}, s, { value: void 0 }), Qt("invalid", n);
                  break;
                case "textarea":
                  jn(n, s), p = dn(n, s), Qt("invalid", n);
                  break;
                default:
                  p = s;
              }
              pn(u, p), M = p;
              for (m in M) if (M.hasOwnProperty(m)) {
                var U = M[m];
                m === "style" ? un(n, U) : m === "dangerouslySetInnerHTML" ? (U = U ? U.__html : void 0, U != null && pa(n, U)) : m === "children" ? typeof U == "string" ? (u !== "textarea" || U !== "") && Re(n, U) : typeof U == "number" && Re(n, "" + U) : m !== "suppressContentEditableWarning" && m !== "suppressHydrationWarning" && m !== "autoFocus" && (g.hasOwnProperty(m) ? U != null && m === "onScroll" && Qt("scroll", n) : U != null && fe(n, m, U, w));
              }
              switch (u) {
                case "input":
                  _n(n), Ta(n, s, !1);
                  break;
                case "textarea":
                  _n(n), yn(n);
                  break;
                case "option":
                  s.value != null && n.setAttribute("value", "" + tt(s.value));
                  break;
                case "select":
                  n.multiple = !!s.multiple, m = s.value, m != null ? ln(n, !!s.multiple, m, !1) : s.defaultValue != null && ln(
                    n,
                    !!s.multiple,
                    s.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof p.onClick == "function" && (n.onclick = Ol);
              }
              switch (u) {
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
        return ar(r), null;
      case 6:
        if (n && r.stateNode != null) kv(n, r, n.memoizedProps, s);
        else {
          if (typeof s != "string" && r.stateNode === null) throw Error(d(166));
          if (u = Tu(Rs.current), Tu(Di.current), Ic(r)) {
            if (s = r.stateNode, u = r.memoizedProps, s[Ri] = r, (m = s.nodeValue !== u) && (n = ea, n !== null)) switch (n.tag) {
              case 3:
                Uc(s.nodeValue, u, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Uc(s.nodeValue, u, (n.mode & 1) !== 0);
            }
            m && (r.flags |= 4);
          } else s = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(s), s[Ri] = r, r.stateNode = s;
        }
        return ar(r), null;
      case 13:
        if (fn(Rn), s = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (gn && ta !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0) xs(), Fl(), r.flags |= 98560, m = !1;
          else if (m = Ic(r), s !== null && s.dehydrated !== null) {
            if (n === null) {
              if (!m) throw Error(d(318));
              if (m = r.memoizedState, m = m !== null ? m.dehydrated : null, !m) throw Error(d(317));
              m[Ri] = r;
            } else Fl(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            ar(r), m = !1;
          } else Ua !== null && (Hu(Ua), Ua = null), m = !0;
          if (!m) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0 ? (r.lanes = u, r) : (s = s !== null, s !== (n !== null && n.memoizedState !== null) && s && (r.child.flags |= 8192, (r.mode & 1) !== 0 && (n === null || (Rn.current & 1) !== 0 ? zn === 0 && (zn = 3) : vp())), r.updateQueue !== null && (r.flags |= 4), ar(r), null);
      case 4:
        return ku(), In(n, r), n === null && xo(r.stateNode.containerInfo), ar(r), null;
      case 10:
        return $d(r.type._context), ar(r), null;
      case 17:
        return Pn(r.type) && bo(), ar(r), null;
      case 19:
        if (fn(Rn), m = r.memoizedState, m === null) return ar(r), null;
        if (s = (r.flags & 128) !== 0, w = m.rendering, w === null) if (s) Hs(m, !1);
        else {
          if (zn !== 0 || n !== null && (n.flags & 128) !== 0) for (n = r.child; n !== null; ) {
            if (w = Gc(n), w !== null) {
              for (r.flags |= 128, Hs(m, !1), s = w.updateQueue, s !== null && (r.updateQueue = s, r.flags |= 4), r.subtreeFlags = 0, s = u, u = r.child; u !== null; ) m = u, n = s, m.flags &= 14680066, w = m.alternate, w === null ? (m.childLanes = 0, m.lanes = n, m.child = null, m.subtreeFlags = 0, m.memoizedProps = null, m.memoizedState = null, m.updateQueue = null, m.dependencies = null, m.stateNode = null) : (m.childLanes = w.childLanes, m.lanes = w.lanes, m.child = w.child, m.subtreeFlags = 0, m.deletions = null, m.memoizedProps = w.memoizedProps, m.memoizedState = w.memoizedState, m.updateQueue = w.updateQueue, m.type = w.type, n = w.dependencies, m.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), u = u.sibling;
              return Ke(Rn, Rn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          m.tail !== null && gt() > zo && (r.flags |= 128, s = !0, Hs(m, !1), r.lanes = 4194304);
        }
        else {
          if (!s) if (n = Gc(w), n !== null) {
            if (r.flags |= 128, s = !0, u = n.updateQueue, u !== null && (r.updateQueue = u, r.flags |= 4), Hs(m, !0), m.tail === null && m.tailMode === "hidden" && !w.alternate && !gn) return ar(r), null;
          } else 2 * gt() - m.renderingStartTime > zo && u !== 1073741824 && (r.flags |= 128, s = !0, Hs(m, !1), r.lanes = 4194304);
          m.isBackwards ? (w.sibling = r.child, r.child = w) : (u = m.last, u !== null ? u.sibling = w : r.child = w, m.last = w);
        }
        return m.tail !== null ? (r = m.tail, m.rendering = r, m.tail = r.sibling, m.renderingStartTime = gt(), r.sibling = null, u = Rn.current, Ke(Rn, s ? u & 1 | 2 : u & 1), r) : (ar(r), null);
      case 22:
      case 23:
        return hp(), s = r.memoizedState !== null, n !== null && n.memoizedState !== null !== s && (r.flags |= 8192), s && (r.mode & 1) !== 0 ? (xa & 1073741824) !== 0 && (ar(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : ar(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(d(156, r.tag));
  }
  function gf(n, r) {
    switch ($c(r), r.tag) {
      case 1:
        return Pn(r.type) && bo(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return ku(), fn(Kn), fn(kn), Je(), n = r.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Qc(r), null;
      case 13:
        if (fn(Rn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(d(340));
          Fl();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return fn(Rn), null;
      case 4:
        return ku(), null;
      case 10:
        return $d(r.type._context), null;
      case 22:
      case 23:
        return hp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ps = !1, Dr = !1, vg = typeof WeakSet == "function" ? WeakSet : Set, He = null;
  function Oo(n, r) {
    var u = n.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (s) {
      Sn(n, r, s);
    }
    else u.current = null;
  }
  function Sf(n, r, u) {
    try {
      u();
    } catch (s) {
      Sn(n, r, s);
    }
  }
  var Mv = !1;
  function Ov(n, r) {
    if (ms = Oa, n = ds(), kc(n)) {
      if ("selectionStart" in n) var u = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        u = (u = n.ownerDocument) && u.defaultView || window;
        var s = u.getSelection && u.getSelection();
        if (s && s.rangeCount !== 0) {
          u = s.anchorNode;
          var p = s.anchorOffset, m = s.focusNode;
          s = s.focusOffset;
          try {
            u.nodeType, m.nodeType;
          } catch {
            u = null;
            break e;
          }
          var w = 0, M = -1, U = -1, X = 0, me = 0, Ee = n, ve = null;
          t: for (; ; ) {
            for (var Ue; Ee !== u || p !== 0 && Ee.nodeType !== 3 || (M = w + p), Ee !== m || s !== 0 && Ee.nodeType !== 3 || (U = w + s), Ee.nodeType === 3 && (w += Ee.nodeValue.length), (Ue = Ee.firstChild) !== null; )
              ve = Ee, Ee = Ue;
            for (; ; ) {
              if (Ee === n) break t;
              if (ve === u && ++X === p && (M = w), ve === m && ++me === s && (U = w), (Ue = Ee.nextSibling) !== null) break;
              Ee = ve, ve = Ee.parentNode;
            }
            Ee = Ue;
          }
          u = M === -1 || U === -1 ? null : { start: M, end: U };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Eu = { focusedElem: n, selectionRange: u }, Oa = !1, He = r; He !== null; ) if (r = He, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, He = n;
    else for (; He !== null; ) {
      r = He;
      try {
        var $e = r.alternate;
        if ((r.flags & 1024) !== 0) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ($e !== null) {
              var Qe = $e.memoizedProps, An = $e.memoizedState, B = r.stateNode, H = B.getSnapshotBeforeUpdate(r.elementType === r.type ? Qe : oi(r.type, Qe), An);
              B.__reactInternalSnapshotBeforeUpdate = H;
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
      } catch (ye) {
        Sn(r, r.return, ye);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, He = n;
        break;
      }
      He = r.return;
    }
    return $e = Mv, Mv = !1, $e;
  }
  function Vs(n, r, u) {
    var s = r.updateQueue;
    if (s = s !== null ? s.lastEffect : null, s !== null) {
      var p = s = s.next;
      do {
        if ((p.tag & n) === n) {
          var m = p.destroy;
          p.destroy = void 0, m !== void 0 && Sf(r, u, m);
        }
        p = p.next;
      } while (p !== s);
    }
  }
  function Bs(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var u = r = r.next;
      do {
        if ((u.tag & n) === n) {
          var s = u.create;
          u.destroy = s();
        }
        u = u.next;
      } while (u !== r);
    }
  }
  function up(n) {
    var r = n.ref;
    if (r !== null) {
      var u = n.stateNode;
      switch (n.tag) {
        case 5:
          n = u;
          break;
        default:
          n = u;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function xf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, xf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ri], delete r[ys], delete r[gs], delete r[Ro], delete r[pg])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function $s(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function tl(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || $s(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Oi(n, r, u) {
    var s = n.tag;
    if (s === 5 || s === 6) n = n.stateNode, r ? u.nodeType === 8 ? u.parentNode.insertBefore(n, r) : u.insertBefore(n, r) : (u.nodeType === 8 ? (r = u.parentNode, r.insertBefore(n, u)) : (r = u, r.appendChild(n)), u = u._reactRootContainer, u != null || r.onclick !== null || (r.onclick = Ol));
    else if (s !== 4 && (n = n.child, n !== null)) for (Oi(n, r, u), n = n.sibling; n !== null; ) Oi(n, r, u), n = n.sibling;
  }
  function Ni(n, r, u) {
    var s = n.tag;
    if (s === 5 || s === 6) n = n.stateNode, r ? u.insertBefore(n, r) : u.appendChild(n);
    else if (s !== 4 && (n = n.child, n !== null)) for (Ni(n, r, u), n = n.sibling; n !== null; ) Ni(n, r, u), n = n.sibling;
  }
  var Ln = null, Fr = !1;
  function jr(n, r, u) {
    for (u = u.child; u !== null; ) Nv(n, r, u), u = u.sibling;
  }
  function Nv(n, r, u) {
    if (qr && typeof qr.onCommitFiberUnmount == "function") try {
      qr.onCommitFiberUnmount(Cl, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        Dr || Oo(u, r);
      case 6:
        var s = Ln, p = Fr;
        Ln = null, jr(n, r, u), Ln = s, Fr = p, Ln !== null && (Fr ? (n = Ln, u = u.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(u) : n.removeChild(u)) : Ln.removeChild(u.stateNode));
        break;
      case 18:
        Ln !== null && (Fr ? (n = Ln, u = u.stateNode, n.nodeType === 8 ? wo(n.parentNode, u) : n.nodeType === 1 && wo(n, u), ri(n)) : wo(Ln, u.stateNode));
        break;
      case 4:
        s = Ln, p = Fr, Ln = u.stateNode.containerInfo, Fr = !0, jr(n, r, u), Ln = s, Fr = p;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Dr && (s = u.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
          p = s = s.next;
          do {
            var m = p, w = m.destroy;
            m = m.tag, w !== void 0 && ((m & 2) !== 0 || (m & 4) !== 0) && Sf(u, r, w), p = p.next;
          } while (p !== s);
        }
        jr(n, r, u);
        break;
      case 1:
        if (!Dr && (Oo(u, r), s = u.stateNode, typeof s.componentWillUnmount == "function")) try {
          s.props = u.memoizedProps, s.state = u.memoizedState, s.componentWillUnmount();
        } catch (M) {
          Sn(u, r, M);
        }
        jr(n, r, u);
        break;
      case 21:
        jr(n, r, u);
        break;
      case 22:
        u.mode & 1 ? (Dr = (s = Dr) || u.memoizedState !== null, jr(n, r, u), Dr = s) : jr(n, r, u);
        break;
      default:
        jr(n, r, u);
    }
  }
  function Lv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var u = n.stateNode;
      u === null && (u = n.stateNode = new vg()), r.forEach(function(s) {
        var p = Bv.bind(null, n, s);
        u.has(s) || (u.add(s), s.then(p, p));
      });
    }
  }
  function si(n, r) {
    var u = r.deletions;
    if (u !== null) for (var s = 0; s < u.length; s++) {
      var p = u[s];
      try {
        var m = n, w = r, M = w;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 5:
              Ln = M.stateNode, Fr = !1;
              break e;
            case 3:
              Ln = M.stateNode.containerInfo, Fr = !0;
              break e;
            case 4:
              Ln = M.stateNode.containerInfo, Fr = !0;
              break e;
          }
          M = M.return;
        }
        if (Ln === null) throw Error(d(160));
        Nv(m, w, p), Ln = null, Fr = !1;
        var U = p.alternate;
        U !== null && (U.return = null), p.return = null;
      } catch (X) {
        Sn(p, r, X);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) op(r, n), r = r.sibling;
  }
  function op(n, r) {
    var u = n.alternate, s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (si(r, n), ia(n), s & 4) {
          try {
            Vs(3, n, n.return), Bs(3, n);
          } catch (Qe) {
            Sn(n, n.return, Qe);
          }
          try {
            Vs(5, n, n.return);
          } catch (Qe) {
            Sn(n, n.return, Qe);
          }
        }
        break;
      case 1:
        si(r, n), ia(n), s & 512 && u !== null && Oo(u, u.return);
        break;
      case 5:
        if (si(r, n), ia(n), s & 512 && u !== null && Oo(u, u.return), n.flags & 32) {
          var p = n.stateNode;
          try {
            Re(p, "");
          } catch (Qe) {
            Sn(n, n.return, Qe);
          }
        }
        if (s & 4 && (p = n.stateNode, p != null)) {
          var m = n.memoizedProps, w = u !== null ? u.memoizedProps : m, M = n.type, U = n.updateQueue;
          if (n.updateQueue = null, U !== null) try {
            M === "input" && m.type === "radio" && m.name != null && Dn(p, m), tr(M, w);
            var X = tr(M, m);
            for (w = 0; w < U.length; w += 2) {
              var me = U[w], Ee = U[w + 1];
              me === "style" ? un(p, Ee) : me === "dangerouslySetInnerHTML" ? pa(p, Ee) : me === "children" ? Re(p, Ee) : fe(p, me, Ee, X);
            }
            switch (M) {
              case "input":
                wr(p, m);
                break;
              case "textarea":
                Rr(p, m);
                break;
              case "select":
                var ve = p._wrapperState.wasMultiple;
                p._wrapperState.wasMultiple = !!m.multiple;
                var Ue = m.value;
                Ue != null ? ln(p, !!m.multiple, Ue, !1) : ve !== !!m.multiple && (m.defaultValue != null ? ln(
                  p,
                  !!m.multiple,
                  m.defaultValue,
                  !0
                ) : ln(p, !!m.multiple, m.multiple ? [] : "", !1));
            }
            p[ys] = m;
          } catch (Qe) {
            Sn(n, n.return, Qe);
          }
        }
        break;
      case 6:
        if (si(r, n), ia(n), s & 4) {
          if (n.stateNode === null) throw Error(d(162));
          p = n.stateNode, m = n.memoizedProps;
          try {
            p.nodeValue = m;
          } catch (Qe) {
            Sn(n, n.return, Qe);
          }
        }
        break;
      case 3:
        if (si(r, n), ia(n), s & 4 && u !== null && u.memoizedState.isDehydrated) try {
          ri(r.containerInfo);
        } catch (Qe) {
          Sn(n, n.return, Qe);
        }
        break;
      case 4:
        si(r, n), ia(n);
        break;
      case 13:
        si(r, n), ia(n), p = n.child, p.flags & 8192 && (m = p.memoizedState !== null, p.stateNode.isHidden = m, !m || p.alternate !== null && p.alternate.memoizedState !== null || (fp = gt())), s & 4 && Lv(n);
        break;
      case 22:
        if (me = u !== null && u.memoizedState !== null, n.mode & 1 ? (Dr = (X = Dr) || me, si(r, n), Dr = X) : si(r, n), ia(n), s & 8192) {
          if (X = n.memoizedState !== null, (n.stateNode.isHidden = X) && !me && (n.mode & 1) !== 0) for (He = n, me = n.child; me !== null; ) {
            for (Ee = He = me; He !== null; ) {
              switch (ve = He, Ue = ve.child, ve.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Vs(4, ve, ve.return);
                  break;
                case 1:
                  Oo(ve, ve.return);
                  var $e = ve.stateNode;
                  if (typeof $e.componentWillUnmount == "function") {
                    s = ve, u = ve.return;
                    try {
                      r = s, $e.props = r.memoizedProps, $e.state = r.memoizedState, $e.componentWillUnmount();
                    } catch (Qe) {
                      Sn(s, u, Qe);
                    }
                  }
                  break;
                case 5:
                  Oo(ve, ve.return);
                  break;
                case 22:
                  if (ve.memoizedState !== null) {
                    Is(Ee);
                    continue;
                  }
              }
              Ue !== null ? (Ue.return = ve, He = Ue) : Is(Ee);
            }
            me = me.sibling;
          }
          e: for (me = null, Ee = n; ; ) {
            if (Ee.tag === 5) {
              if (me === null) {
                me = Ee;
                try {
                  p = Ee.stateNode, X ? (m = p.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none") : (M = Ee.stateNode, U = Ee.memoizedProps.style, w = U != null && U.hasOwnProperty("display") ? U.display : null, M.style.display = Wt("display", w));
                } catch (Qe) {
                  Sn(n, n.return, Qe);
                }
              }
            } else if (Ee.tag === 6) {
              if (me === null) try {
                Ee.stateNode.nodeValue = X ? "" : Ee.memoizedProps;
              } catch (Qe) {
                Sn(n, n.return, Qe);
              }
            } else if ((Ee.tag !== 22 && Ee.tag !== 23 || Ee.memoizedState === null || Ee === n) && Ee.child !== null) {
              Ee.child.return = Ee, Ee = Ee.child;
              continue;
            }
            if (Ee === n) break e;
            for (; Ee.sibling === null; ) {
              if (Ee.return === null || Ee.return === n) break e;
              me === Ee && (me = null), Ee = Ee.return;
            }
            me === Ee && (me = null), Ee.sibling.return = Ee.return, Ee = Ee.sibling;
          }
        }
        break;
      case 19:
        si(r, n), ia(n), s & 4 && Lv(n);
        break;
      case 21:
        break;
      default:
        si(
          r,
          n
        ), ia(n);
    }
  }
  function ia(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var u = n.return; u !== null; ) {
            if ($s(u)) {
              var s = u;
              break e;
            }
            u = u.return;
          }
          throw Error(d(160));
        }
        switch (s.tag) {
          case 5:
            var p = s.stateNode;
            s.flags & 32 && (Re(p, ""), s.flags &= -33);
            var m = tl(n);
            Ni(n, m, p);
            break;
          case 3:
          case 4:
            var w = s.stateNode.containerInfo, M = tl(n);
            Oi(n, M, w);
            break;
          default:
            throw Error(d(161));
        }
      } catch (U) {
        Sn(n, n.return, U);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function mg(n, r, u) {
    He = n, sp(n);
  }
  function sp(n, r, u) {
    for (var s = (n.mode & 1) !== 0; He !== null; ) {
      var p = He, m = p.child;
      if (p.tag === 22 && s) {
        var w = p.memoizedState !== null || Ps;
        if (!w) {
          var M = p.alternate, U = M !== null && M.memoizedState !== null || Dr;
          M = Ps;
          var X = Dr;
          if (Ps = w, (Dr = U) && !X) for (He = p; He !== null; ) w = He, U = w.child, w.tag === 22 && w.memoizedState !== null ? cp(p) : U !== null ? (U.return = w, He = U) : cp(p);
          for (; m !== null; ) He = m, sp(m), m = m.sibling;
          He = p, Ps = M, Dr = X;
        }
        zv(n);
      } else (p.subtreeFlags & 8772) !== 0 && m !== null ? (m.return = p, He = m) : zv(n);
    }
  }
  function zv(n) {
    for (; He !== null; ) {
      var r = He;
      if ((r.flags & 8772) !== 0) {
        var u = r.alternate;
        try {
          if ((r.flags & 8772) !== 0) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Dr || Bs(5, r);
              break;
            case 1:
              var s = r.stateNode;
              if (r.flags & 4 && !Dr) if (u === null) s.componentDidMount();
              else {
                var p = r.elementType === r.type ? u.memoizedProps : oi(r.type, u.memoizedProps);
                s.componentDidUpdate(p, u.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
              }
              var m = r.updateQueue;
              m !== null && Gd(r, m, s);
              break;
            case 3:
              var w = r.updateQueue;
              if (w !== null) {
                if (u = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    u = r.child.stateNode;
                    break;
                  case 1:
                    u = r.child.stateNode;
                }
                Gd(r, w, u);
              }
              break;
            case 5:
              var M = r.stateNode;
              if (u === null && r.flags & 4) {
                u = M;
                var U = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    U.autoFocus && u.focus();
                    break;
                  case "img":
                    U.src && (u.src = U.src);
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
                var X = r.alternate;
                if (X !== null) {
                  var me = X.memoizedState;
                  if (me !== null) {
                    var Ee = me.dehydrated;
                    Ee !== null && ri(Ee);
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
          Dr || r.flags & 512 && up(r);
        } catch (ve) {
          Sn(r, r.return, ve);
        }
      }
      if (r === n) {
        He = null;
        break;
      }
      if (u = r.sibling, u !== null) {
        u.return = r.return, He = u;
        break;
      }
      He = r.return;
    }
  }
  function Is(n) {
    for (; He !== null; ) {
      var r = He;
      if (r === n) {
        He = null;
        break;
      }
      var u = r.sibling;
      if (u !== null) {
        u.return = r.return, He = u;
        break;
      }
      He = r.return;
    }
  }
  function cp(n) {
    for (; He !== null; ) {
      var r = He;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var u = r.return;
            try {
              Bs(4, r);
            } catch (U) {
              Sn(r, u, U);
            }
            break;
          case 1:
            var s = r.stateNode;
            if (typeof s.componentDidMount == "function") {
              var p = r.return;
              try {
                s.componentDidMount();
              } catch (U) {
                Sn(r, p, U);
              }
            }
            var m = r.return;
            try {
              up(r);
            } catch (U) {
              Sn(r, m, U);
            }
            break;
          case 5:
            var w = r.return;
            try {
              up(r);
            } catch (U) {
              Sn(r, w, U);
            }
        }
      } catch (U) {
        Sn(r, r.return, U);
      }
      if (r === n) {
        He = null;
        break;
      }
      var M = r.sibling;
      if (M !== null) {
        M.return = r.return, He = M;
        break;
      }
      He = r.return;
    }
  }
  var yg = Math.ceil, Bl = Ne.ReactCurrentDispatcher, Fu = Ne.ReactCurrentOwner, pr = Ne.ReactCurrentBatchConfig, Ot = 0, Jn = null, Yn = null, hr = 0, xa = 0, No = za(0), zn = 0, Ys = null, Li = 0, Lo = 0, Ef = 0, Ws = null, la = null, fp = 0, zo = 1 / 0, Ea = null, Ao = !1, ju = null, $l = null, Cf = !1, nl = null, Qs = 0, Il = 0, Uo = null, Gs = -1, Mr = 0;
  function Wn() {
    return (Ot & 6) !== 0 ? gt() : Gs !== -1 ? Gs : Gs = gt();
  }
  function zi(n) {
    return (n.mode & 1) === 0 ? 1 : (Ot & 2) !== 0 && hr !== 0 ? hr & -hr : hg.transition !== null ? (Mr === 0 && (Mr = uo()), Mr) : (n = Pt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : vo(n.type)), n);
  }
  function Hr(n, r, u, s) {
    if (50 < Il) throw Il = 0, Uo = null, Error(d(185));
    $i(n, u, s), ((Ot & 2) === 0 || n !== Jn) && (n === Jn && ((Ot & 2) === 0 && (Lo |= u), zn === 4 && ci(n, hr)), ua(n, s), u === 1 && Ot === 0 && (r.mode & 1) === 0 && (zo = gt() + 500, _o && _i()));
  }
  function ua(n, r) {
    var u = n.callbackNode;
    du(n, r);
    var s = ni(n, n === Jn ? hr : 0);
    if (s === 0) u !== null && sr(u), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = s & -s, n.callbackPriority !== r) {
      if (u != null && sr(u), r === 1) n.tag === 0 ? Ll(dp.bind(null, n)) : Vc(dp.bind(null, n)), Co(function() {
        (Ot & 6) === 0 && _i();
      }), u = null;
      else {
        switch (so(s)) {
          case 1:
            u = ei;
            break;
          case 4:
            u = cu;
            break;
          case 16:
            u = fu;
            break;
          case 536870912:
            u = ao;
            break;
          default:
            u = fu;
        }
        u = Iv(u, wf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = u;
    }
  }
  function wf(n, r) {
    if (Gs = -1, Mr = 0, (Ot & 6) !== 0) throw Error(d(327));
    var u = n.callbackNode;
    if (Fo() && n.callbackNode !== u) return null;
    var s = ni(n, n === Jn ? hr : 0);
    if (s === 0) return null;
    if ((s & 30) !== 0 || (s & n.expiredLanes) !== 0 || r) r = Rf(n, s);
    else {
      r = s;
      var p = Ot;
      Ot |= 2;
      var m = Uv();
      (Jn !== n || hr !== r) && (Ea = null, zo = gt() + 500, rl(n, r));
      do
        try {
          Fv();
          break;
        } catch (M) {
          Av(n, M);
        }
      while (!0);
      Bd(), Bl.current = m, Ot = p, Yn !== null ? r = 0 : (Jn = null, hr = 0, r = zn);
    }
    if (r !== 0) {
      if (r === 2 && (p = Rl(n), p !== 0 && (s = p, r = Xs(n, p))), r === 1) throw u = Ys, rl(n, 0), ci(n, s), ua(n, gt()), u;
      if (r === 6) ci(n, s);
      else {
        if (p = n.current.alternate, (s & 30) === 0 && !gg(p) && (r = Rf(n, s), r === 2 && (m = Rl(n), m !== 0 && (s = m, r = Xs(n, m))), r === 1)) throw u = Ys, rl(n, 0), ci(n, s), ua(n, gt()), u;
        switch (n.finishedWork = p, n.finishedLanes = s, r) {
          case 0:
          case 1:
            throw Error(d(345));
          case 2:
            Vu(n, la, Ea);
            break;
          case 3:
            if (ci(n, s), (s & 130023424) === s && (r = fp + 500 - gt(), 10 < r)) {
              if (ni(n, 0) !== 0) break;
              if (p = n.suspendedLanes, (p & s) !== s) {
                Wn(), n.pingedLanes |= n.suspendedLanes & p;
                break;
              }
              n.timeoutHandle = jc(Vu.bind(null, n, la, Ea), r);
              break;
            }
            Vu(n, la, Ea);
            break;
          case 4:
            if (ci(n, s), (s & 4194240) === s) break;
            for (r = n.eventTimes, p = -1; 0 < s; ) {
              var w = 31 - Lr(s);
              m = 1 << w, w = r[w], w > p && (p = w), s &= ~m;
            }
            if (s = p, s = gt() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * yg(s / 1960)) - s, 10 < s) {
              n.timeoutHandle = jc(Vu.bind(null, n, la, Ea), s);
              break;
            }
            Vu(n, la, Ea);
            break;
          case 5:
            Vu(n, la, Ea);
            break;
          default:
            throw Error(d(329));
        }
      }
    }
    return ua(n, gt()), n.callbackNode === u ? wf.bind(null, n) : null;
  }
  function Xs(n, r) {
    var u = Ws;
    return n.current.memoizedState.isDehydrated && (rl(n, r).flags |= 256), n = Rf(n, r), n !== 2 && (r = la, la = u, r !== null && Hu(r)), n;
  }
  function Hu(n) {
    la === null ? la = n : la.push.apply(la, n);
  }
  function gg(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var u = r.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var s = 0; s < u.length; s++) {
          var p = u[s], m = p.getSnapshot;
          p = p.value;
          try {
            if (!ii(m(), p)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (u = r.child, r.subtreeFlags & 16384 && u !== null) u.return = r, r = u;
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
  function ci(n, r) {
    for (r &= ~Ef, r &= ~Lo, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var u = 31 - Lr(r), s = 1 << u;
      n[u] = -1, r &= ~s;
    }
  }
  function dp(n) {
    if ((Ot & 6) !== 0) throw Error(d(327));
    Fo();
    var r = ni(n, 0);
    if ((r & 1) === 0) return ua(n, gt()), null;
    var u = Rf(n, r);
    if (n.tag !== 0 && u === 2) {
      var s = Rl(n);
      s !== 0 && (r = s, u = Xs(n, s));
    }
    if (u === 1) throw u = Ys, rl(n, 0), ci(n, r), ua(n, gt()), u;
    if (u === 6) throw Error(d(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Vu(n, la, Ea), ua(n, gt()), null;
  }
  function pp(n, r) {
    var u = Ot;
    Ot |= 1;
    try {
      return n(r);
    } finally {
      Ot = u, Ot === 0 && (zo = gt() + 500, _o && _i());
    }
  }
  function Pu(n) {
    nl !== null && nl.tag === 0 && (Ot & 6) === 0 && Fo();
    var r = Ot;
    Ot |= 1;
    var u = pr.transition, s = Pt;
    try {
      if (pr.transition = null, Pt = 1, n) return n();
    } finally {
      Pt = s, pr.transition = u, Ot = r, (Ot & 6) === 0 && _i();
    }
  }
  function hp() {
    xa = No.current, fn(No);
  }
  function rl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var u = n.timeoutHandle;
    if (u !== -1 && (n.timeoutHandle = -1, Fd(u)), Yn !== null) for (u = Yn.return; u !== null; ) {
      var s = u;
      switch ($c(s), s.tag) {
        case 1:
          s = s.type.childContextTypes, s != null && bo();
          break;
        case 3:
          ku(), fn(Kn), fn(kn), Je();
          break;
        case 5:
          Qc(s);
          break;
        case 4:
          ku();
          break;
        case 13:
          fn(Rn);
          break;
        case 19:
          fn(Rn);
          break;
        case 10:
          $d(s.type._context);
          break;
        case 22:
        case 23:
          hp();
      }
      u = u.return;
    }
    if (Jn = n, Yn = n = Yl(n.current, null), hr = xa = r, zn = 0, Ys = null, Ef = Lo = Li = 0, la = Ws = null, _u !== null) {
      for (r = 0; r < _u.length; r++) if (u = _u[r], s = u.interleaved, s !== null) {
        u.interleaved = null;
        var p = s.next, m = u.pending;
        if (m !== null) {
          var w = m.next;
          m.next = p, s.next = w;
        }
        u.pending = s;
      }
      _u = null;
    }
    return n;
  }
  function Av(n, r) {
    do {
      var u = Yn;
      try {
        if (Bd(), Rt.current = zu, Xc) {
          for (var s = Bt.memoizedState; s !== null; ) {
            var p = s.queue;
            p !== null && (p.pending = null), s = s.next;
          }
          Xc = !1;
        }
        if (en = 0, rr = Bn = Bt = null, _s = !1, Du = 0, Fu.current = null, u === null || u.return === null) {
          zn = 1, Ys = r, Yn = null;
          break;
        }
        e: {
          var m = n, w = u.return, M = u, U = r;
          if (r = hr, M.flags |= 32768, U !== null && typeof U == "object" && typeof U.then == "function") {
            var X = U, me = M, Ee = me.tag;
            if ((me.mode & 1) === 0 && (Ee === 0 || Ee === 11 || Ee === 15)) {
              var ve = me.alternate;
              ve ? (me.updateQueue = ve.updateQueue, me.memoizedState = ve.memoizedState, me.lanes = ve.lanes) : (me.updateQueue = null, me.memoizedState = null);
            }
            var Ue = Cv(w);
            if (Ue !== null) {
              Ue.flags &= -257, Vl(Ue, w, M, m, r), Ue.mode & 1 && np(m, X, r), r = Ue, U = X;
              var $e = r.updateQueue;
              if ($e === null) {
                var Qe = /* @__PURE__ */ new Set();
                Qe.add(U), r.updateQueue = Qe;
              } else $e.add(U);
              break e;
            } else {
              if ((r & 1) === 0) {
                np(m, X, r), vp();
                break e;
              }
              U = Error(d(426));
            }
          } else if (gn && M.mode & 1) {
            var An = Cv(w);
            if (An !== null) {
              (An.flags & 65536) === 0 && (An.flags |= 256), Vl(An, w, M, m, r), Zi(Au(U, M));
              break e;
            }
          }
          m = U = Au(U, M), zn !== 4 && (zn = 2), Ws === null ? Ws = [m] : Ws.push(m), m = w;
          do {
            switch (m.tag) {
              case 3:
                m.flags |= 65536, r &= -r, m.lanes |= r;
                var B = Ev(m, U, r);
                mv(m, B);
                break e;
              case 1:
                M = U;
                var H = m.type, Y = m.stateNode;
                if ((m.flags & 128) === 0 && (typeof H.getDerivedStateFromError == "function" || Y !== null && typeof Y.componentDidCatch == "function" && ($l === null || !$l.has(Y)))) {
                  m.flags |= 65536, r &= -r, m.lanes |= r;
                  var ye = tp(m, M, r);
                  mv(m, ye);
                  break e;
                }
            }
            m = m.return;
          } while (m !== null);
        }
        Hv(u);
      } catch (Ie) {
        r = Ie, Yn === u && u !== null && (Yn = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Uv() {
    var n = Bl.current;
    return Bl.current = zu, n === null ? zu : n;
  }
  function vp() {
    (zn === 0 || zn === 3 || zn === 2) && (zn = 4), Jn === null || (Li & 268435455) === 0 && (Lo & 268435455) === 0 || ci(Jn, hr);
  }
  function Rf(n, r) {
    var u = Ot;
    Ot |= 2;
    var s = Uv();
    (Jn !== n || hr !== r) && (Ea = null, rl(n, r));
    do
      try {
        Sg();
        break;
      } catch (p) {
        Av(n, p);
      }
    while (!0);
    if (Bd(), Ot = u, Bl.current = s, Yn !== null) throw Error(d(261));
    return Jn = null, hr = 0, zn;
  }
  function Sg() {
    for (; Yn !== null; ) jv(Yn);
  }
  function Fv() {
    for (; Yn !== null && !Za(); ) jv(Yn);
  }
  function jv(n) {
    var r = $v(n.alternate, n, xa);
    n.memoizedProps = n.pendingProps, r === null ? Hv(n) : Yn = r, Fu.current = null;
  }
  function Hv(n) {
    var r = n;
    do {
      var u = r.alternate;
      if (n = r.return, (r.flags & 32768) === 0) {
        if (u = Dv(u, r, xa), u !== null) {
          Yn = u;
          return;
        }
      } else {
        if (u = gf(u, r), u !== null) {
          u.flags &= 32767, Yn = u;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          zn = 6, Yn = null;
          return;
        }
      }
      if (r = r.sibling, r !== null) {
        Yn = r;
        return;
      }
      Yn = r = n;
    } while (r !== null);
    zn === 0 && (zn = 5);
  }
  function Vu(n, r, u) {
    var s = Pt, p = pr.transition;
    try {
      pr.transition = null, Pt = 1, xg(n, r, u, s);
    } finally {
      pr.transition = p, Pt = s;
    }
    return null;
  }
  function xg(n, r, u, s) {
    do
      Fo();
    while (nl !== null);
    if ((Ot & 6) !== 0) throw Error(d(327));
    u = n.finishedWork;
    var p = n.finishedLanes;
    if (u === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, u === n.current) throw Error(d(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var m = u.lanes | u.childLanes;
    if (md(n, m), n === Jn && (Yn = Jn = null, hr = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || Cf || (Cf = !0, Iv(fu, function() {
      return Fo(), null;
    })), m = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || m) {
      m = pr.transition, pr.transition = null;
      var w = Pt;
      Pt = 1;
      var M = Ot;
      Ot |= 4, Fu.current = null, Ov(n, u), op(u, n), go(Eu), Oa = !!ms, Eu = ms = null, n.current = u, mg(u), Ja(), Ot = M, Pt = w, pr.transition = m;
    } else n.current = u;
    if (Cf && (Cf = !1, nl = n, Qs = p), m = n.pendingLanes, m === 0 && ($l = null), ns(u.stateNode), ua(n, gt()), r !== null) for (s = n.onRecoverableError, u = 0; u < r.length; u++) p = r[u], s(p.value, { componentStack: p.stack, digest: p.digest });
    if (Ao) throw Ao = !1, n = ju, ju = null, n;
    return (Qs & 1) !== 0 && n.tag !== 0 && Fo(), m = n.pendingLanes, (m & 1) !== 0 ? n === Uo ? Il++ : (Il = 0, Uo = n) : Il = 0, _i(), null;
  }
  function Fo() {
    if (nl !== null) {
      var n = so(Qs), r = pr.transition, u = Pt;
      try {
        if (pr.transition = null, Pt = 16 > n ? 16 : n, nl === null) var s = !1;
        else {
          if (n = nl, nl = null, Qs = 0, (Ot & 6) !== 0) throw Error(d(331));
          var p = Ot;
          for (Ot |= 4, He = n.current; He !== null; ) {
            var m = He, w = m.child;
            if ((He.flags & 16) !== 0) {
              var M = m.deletions;
              if (M !== null) {
                for (var U = 0; U < M.length; U++) {
                  var X = M[U];
                  for (He = X; He !== null; ) {
                    var me = He;
                    switch (me.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Vs(8, me, m);
                    }
                    var Ee = me.child;
                    if (Ee !== null) Ee.return = me, He = Ee;
                    else for (; He !== null; ) {
                      me = He;
                      var ve = me.sibling, Ue = me.return;
                      if (xf(me), me === X) {
                        He = null;
                        break;
                      }
                      if (ve !== null) {
                        ve.return = Ue, He = ve;
                        break;
                      }
                      He = Ue;
                    }
                  }
                }
                var $e = m.alternate;
                if ($e !== null) {
                  var Qe = $e.child;
                  if (Qe !== null) {
                    $e.child = null;
                    do {
                      var An = Qe.sibling;
                      Qe.sibling = null, Qe = An;
                    } while (Qe !== null);
                  }
                }
                He = m;
              }
            }
            if ((m.subtreeFlags & 2064) !== 0 && w !== null) w.return = m, He = w;
            else e: for (; He !== null; ) {
              if (m = He, (m.flags & 2048) !== 0) switch (m.tag) {
                case 0:
                case 11:
                case 15:
                  Vs(9, m, m.return);
              }
              var B = m.sibling;
              if (B !== null) {
                B.return = m.return, He = B;
                break e;
              }
              He = m.return;
            }
          }
          var H = n.current;
          for (He = H; He !== null; ) {
            w = He;
            var Y = w.child;
            if ((w.subtreeFlags & 2064) !== 0 && Y !== null) Y.return = w, He = Y;
            else e: for (w = H; He !== null; ) {
              if (M = He, (M.flags & 2048) !== 0) try {
                switch (M.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Bs(9, M);
                }
              } catch (Ie) {
                Sn(M, M.return, Ie);
              }
              if (M === w) {
                He = null;
                break e;
              }
              var ye = M.sibling;
              if (ye !== null) {
                ye.return = M.return, He = ye;
                break e;
              }
              He = M.return;
            }
          }
          if (Ot = p, _i(), qr && typeof qr.onPostCommitFiberRoot == "function") try {
            qr.onPostCommitFiberRoot(Cl, n);
          } catch {
          }
          s = !0;
        }
        return s;
      } finally {
        Pt = u, pr.transition = r;
      }
    }
    return !1;
  }
  function Pv(n, r, u) {
    r = Au(u, r), r = Ev(n, r, 1), n = jl(n, r, 1), r = Wn(), n !== null && ($i(n, 1, r), ua(n, r));
  }
  function Sn(n, r, u) {
    if (n.tag === 3) Pv(n, n, u);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Pv(r, n, u);
        break;
      } else if (r.tag === 1) {
        var s = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && ($l === null || !$l.has(s))) {
          n = Au(u, n), n = tp(r, n, 1), r = jl(r, n, 1), n = Wn(), r !== null && ($i(r, 1, n), ua(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Eg(n, r, u) {
    var s = n.pingCache;
    s !== null && s.delete(r), r = Wn(), n.pingedLanes |= n.suspendedLanes & u, Jn === n && (hr & u) === u && (zn === 4 || zn === 3 && (hr & 130023424) === hr && 500 > gt() - fp ? rl(n, 0) : Ef |= u), ua(n, r);
  }
  function Vv(n, r) {
    r === 0 && ((n.mode & 1) === 0 ? r = 1 : (r = va, va <<= 1, (va & 130023424) === 0 && (va = 4194304)));
    var u = Wn();
    n = ga(n, r), n !== null && ($i(n, r, u), ua(n, u));
  }
  function Cg(n) {
    var r = n.memoizedState, u = 0;
    r !== null && (u = r.retryLane), Vv(n, u);
  }
  function Bv(n, r) {
    var u = 0;
    switch (n.tag) {
      case 13:
        var s = n.stateNode, p = n.memoizedState;
        p !== null && (u = p.retryLane);
        break;
      case 19:
        s = n.stateNode;
        break;
      default:
        throw Error(d(314));
    }
    s !== null && s.delete(r), Vv(n, u);
  }
  var $v;
  $v = function(n, r, u) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Kn.current) $n = !0;
    else {
      if ((n.lanes & u) === 0 && (r.flags & 128) === 0) return $n = !1, js(n, r, u);
      $n = (n.flags & 131072) !== 0;
    }
    else $n = !1, gn && (r.flags & 1048576) !== 0 && dv(r, Ki, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var s = r.type;
        ja(n, r), n = r.pendingProps;
        var p = Jr(r, kn.current);
        wn(r, u), p = Hl(null, r, s, n, p, u);
        var m = ui();
        return r.flags |= 1, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Pn(s) ? (m = !0, nr(r)) : m = !1, r.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Qd(r), p.updater = pf, r.stateNode = p, p._reactInternals = r, Ls(r, s, n, u), r = Us(null, r, s, !0, m, u)) : (r.tag = 0, gn && m && Bc(r), dr(null, r, p, u), r = r.child), r;
      case 16:
        s = r.elementType;
        e: {
          switch (ja(n, r), n = r.pendingProps, p = s._init, s = p(s._payload), r.type = s, p = r.tag = Rg(s), n = oi(s, n), p) {
            case 0:
              r = wv(null, r, s, n, u);
              break e;
            case 1:
              r = Rv(null, r, s, n, u);
              break e;
            case 11:
              r = aa(null, r, s, n, u);
              break e;
            case 14:
              r = Uu(null, r, s, oi(s.type, n), u);
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
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : oi(s, p), wv(n, r, s, p, u);
      case 1:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : oi(s, p), Rv(n, r, s, p, u);
      case 3:
        e: {
          if (Mo(r), n === null) throw Error(d(387));
          s = r.pendingProps, m = r.memoizedState, p = m.element, vv(n, r), Es(r, s, null, u);
          var w = r.memoizedState;
          if (s = w.element, m.isDehydrated) if (m = { element: s, isDehydrated: !1, cache: w.cache, pendingSuspenseBoundaries: w.pendingSuspenseBoundaries, transitions: w.transitions }, r.updateQueue.baseState = m, r.memoizedState = m, r.flags & 256) {
            p = Au(Error(d(423)), r), r = bv(n, r, s, u, p);
            break e;
          } else if (s !== p) {
            p = Au(Error(d(424)), r), r = bv(n, r, s, u, p);
            break e;
          } else for (ta = wi(r.stateNode.containerInfo.firstChild), ea = r, gn = !0, Ua = null, u = De(r, null, s, u), r.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (Fl(), s === p) {
              r = Ha(n, r, u);
              break e;
            }
            dr(n, r, s, u);
          }
          r = r.child;
        }
        return r;
      case 5:
        return yv(r), n === null && Pd(r), s = r.type, p = r.pendingProps, m = n !== null ? n.memoizedProps : null, w = p.children, Fc(s, p) ? w = null : m !== null && Fc(s, m) && (r.flags |= 32), rp(n, r), dr(n, r, w, u), r.child;
      case 6:
        return n === null && Pd(r), null;
      case 13:
        return yf(n, r, u);
      case 4:
        return Xd(r, r.stateNode.containerInfo), s = r.pendingProps, n === null ? r.child = On(r, null, s, u) : dr(n, r, s, u), r.child;
      case 11:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : oi(s, p), aa(n, r, s, p, u);
      case 7:
        return dr(n, r, r.pendingProps, u), r.child;
      case 8:
        return dr(n, r, r.pendingProps.children, u), r.child;
      case 12:
        return dr(n, r, r.pendingProps.children, u), r.child;
      case 10:
        e: {
          if (s = r.type._context, p = r.pendingProps, m = r.memoizedProps, w = p.value, Ke(ya, s._currentValue), s._currentValue = w, m !== null) if (ii(m.value, w)) {
            if (m.children === p.children && !Kn.current) {
              r = Ha(n, r, u);
              break e;
            }
          } else for (m = r.child, m !== null && (m.return = r); m !== null; ) {
            var M = m.dependencies;
            if (M !== null) {
              w = m.child;
              for (var U = M.firstContext; U !== null; ) {
                if (U.context === s) {
                  if (m.tag === 1) {
                    U = Ji(-1, u & -u), U.tag = 2;
                    var X = m.updateQueue;
                    if (X !== null) {
                      X = X.shared;
                      var me = X.pending;
                      me === null ? U.next = U : (U.next = me.next, me.next = U), X.pending = U;
                    }
                  }
                  m.lanes |= u, U = m.alternate, U !== null && (U.lanes |= u), Id(
                    m.return,
                    u,
                    r
                  ), M.lanes |= u;
                  break;
                }
                U = U.next;
              }
            } else if (m.tag === 10) w = m.type === r.type ? null : m.child;
            else if (m.tag === 18) {
              if (w = m.return, w === null) throw Error(d(341));
              w.lanes |= u, M = w.alternate, M !== null && (M.lanes |= u), Id(w, u, r), w = m.sibling;
            } else w = m.child;
            if (w !== null) w.return = m;
            else for (w = m; w !== null; ) {
              if (w === r) {
                w = null;
                break;
              }
              if (m = w.sibling, m !== null) {
                m.return = w.return, w = m;
                break;
              }
              w = w.return;
            }
            m = w;
          }
          dr(n, r, p.children, u), r = r.child;
        }
        return r;
      case 9:
        return p = r.type, s = r.pendingProps.children, wn(r, u), p = Fa(p), s = s(p), r.flags |= 1, dr(n, r, s, u), r.child;
      case 14:
        return s = r.type, p = oi(s, r.pendingProps), p = oi(s.type, p), Uu(n, r, s, p, u);
      case 15:
        return xt(n, r, r.type, r.pendingProps, u);
      case 17:
        return s = r.type, p = r.pendingProps, p = r.elementType === s ? p : oi(s, p), ja(n, r), r.tag = 1, Pn(s) ? (n = !0, nr(r)) : n = !1, wn(r, u), hf(r, s, p), Ls(r, s, p, u), Us(null, r, s, !0, n, u);
      case 19:
        return Mi(n, r, u);
      case 22:
        return As(n, r, u);
    }
    throw Error(d(156, r.tag));
  };
  function Iv(n, r) {
    return hn(n, r);
  }
  function wg(n, r, u, s) {
    this.tag = n, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Va(n, r, u, s) {
    return new wg(n, r, u, s);
  }
  function mp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Rg(n) {
    if (typeof n == "function") return mp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === ze) return 11;
      if (n === Se) return 14;
    }
    return 2;
  }
  function Yl(n, r) {
    var u = n.alternate;
    return u === null ? (u = Va(n.tag, r, n.key, n.mode), u.elementType = n.elementType, u.type = n.type, u.stateNode = n.stateNode, u.alternate = n, n.alternate = u) : (u.pendingProps = r, u.type = n.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = n.flags & 14680064, u.childLanes = n.childLanes, u.lanes = n.lanes, u.child = n.child, u.memoizedProps = n.memoizedProps, u.memoizedState = n.memoizedState, u.updateQueue = n.updateQueue, r = n.dependencies, u.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, u.sibling = n.sibling, u.index = n.index, u.ref = n.ref, u;
  }
  function qs(n, r, u, s, p, m) {
    var w = 2;
    if (s = n, typeof n == "function") mp(n) && (w = 1);
    else if (typeof n == "string") w = 5;
    else e: switch (n) {
      case xe:
        return al(u.children, p, m, r);
      case Xe:
        w = 8, p |= 8;
        break;
      case lt:
        return n = Va(12, u, r, p | 2), n.elementType = lt, n.lanes = m, n;
      case Ve:
        return n = Va(13, u, r, p), n.elementType = Ve, n.lanes = m, n;
      case V:
        return n = Va(19, u, r, p), n.elementType = V, n.lanes = m, n;
      case re:
        return Wl(u, p, m, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case bt:
            w = 10;
            break e;
          case Ut:
            w = 9;
            break e;
          case ze:
            w = 11;
            break e;
          case Se:
            w = 14;
            break e;
          case J:
            w = 16, s = null;
            break e;
        }
        throw Error(d(130, n == null ? n : typeof n, ""));
    }
    return r = Va(w, u, r, p), r.elementType = n, r.type = s, r.lanes = m, r;
  }
  function al(n, r, u, s) {
    return n = Va(7, n, s, r), n.lanes = u, n;
  }
  function Wl(n, r, u, s) {
    return n = Va(22, n, s, r), n.elementType = re, n.lanes = u, n.stateNode = { isHidden: !1 }, n;
  }
  function yp(n, r, u) {
    return n = Va(6, n, null, r), n.lanes = u, n;
  }
  function bf(n, r, u) {
    return r = Va(4, n.children !== null ? n.children : [], n.key, r), r.lanes = u, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Yv(n, r, u, s, p) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = oo(0), this.expirationTimes = oo(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = oo(0), this.identifierPrefix = s, this.onRecoverableError = p, this.mutableSourceEagerHydrationData = null;
  }
  function _f(n, r, u, s, p, m, w, M, U) {
    return n = new Yv(n, r, u, M, U), r === 1 ? (r = 1, m === !0 && (r |= 8)) : r = 0, m = Va(3, null, null, r), n.current = m, m.stateNode = n, m.memoizedState = { element: s, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Qd(m), n;
  }
  function bg(n, r, u) {
    var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ge, key: s == null ? null : "" + s, children: n, containerInfo: r, implementation: u };
  }
  function gp(n) {
    if (!n) return Tr;
    n = n._reactInternals;
    e: {
      if (yt(n) !== n || n.tag !== 1) throw Error(d(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Pn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(d(171));
    }
    if (n.tag === 1) {
      var u = n.type;
      if (Pn(u)) return Ss(n, u, r);
    }
    return r;
  }
  function Wv(n, r, u, s, p, m, w, M, U) {
    return n = _f(u, s, !0, n, p, m, w, M, U), n.context = gp(null), u = n.current, s = Wn(), p = zi(u), m = Ji(s, p), m.callback = r ?? null, jl(u, m, p), n.current.lanes = p, $i(n, p, s), ua(n, s), n;
  }
  function Tf(n, r, u, s) {
    var p = r.current, m = Wn(), w = zi(p);
    return u = gp(u), r.context === null ? r.context = u : r.pendingContext = u, r = Ji(m, w), r.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (r.callback = s), n = jl(p, r, w), n !== null && (Hr(n, p, w, m), Wc(n, p, w)), w;
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
  function Sp(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var u = n.retryLane;
      n.retryLane = u !== 0 && u < r ? u : r;
    }
  }
  function Df(n, r) {
    Sp(n, r), (n = n.alternate) && Sp(n, r);
  }
  function Qv() {
    return null;
  }
  var Bu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function xp(n) {
    this._internalRoot = n;
  }
  Mf.prototype.render = xp.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(d(409));
    Tf(n, r, null, null);
  }, Mf.prototype.unmount = xp.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Pu(function() {
        Tf(null, n, null, null);
      }), r[Xi] = null;
    }
  };
  function Mf(n) {
    this._internalRoot = n;
  }
  Mf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = dt();
      n = { blockedOn: null, target: n, priority: r };
      for (var u = 0; u < qn.length && r !== 0 && r < qn[u].priority; u++) ;
      qn.splice(u, 0, n), u === 0 && is(n);
    }
  };
  function Ep(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Of(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Gv() {
  }
  function _g(n, r, u, s, p) {
    if (p) {
      if (typeof s == "function") {
        var m = s;
        s = function() {
          var X = kf(w);
          m.call(X);
        };
      }
      var w = Wv(r, s, n, 0, null, !1, !1, "", Gv);
      return n._reactRootContainer = w, n[Xi] = w.current, xo(n.nodeType === 8 ? n.parentNode : n), Pu(), w;
    }
    for (; p = n.lastChild; ) n.removeChild(p);
    if (typeof s == "function") {
      var M = s;
      s = function() {
        var X = kf(U);
        M.call(X);
      };
    }
    var U = _f(n, 0, !1, null, null, !1, !1, "", Gv);
    return n._reactRootContainer = U, n[Xi] = U.current, xo(n.nodeType === 8 ? n.parentNode : n), Pu(function() {
      Tf(r, U, u, s);
    }), U;
  }
  function Ks(n, r, u, s, p) {
    var m = u._reactRootContainer;
    if (m) {
      var w = m;
      if (typeof p == "function") {
        var M = p;
        p = function() {
          var U = kf(w);
          M.call(U);
        };
      }
      Tf(r, w, n, p);
    } else w = _g(u, r, n, p, s);
    return kf(w);
  }
  zt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var u = ti(r.pendingLanes);
          u !== 0 && (Ii(r, u | 1), ua(r, gt()), (Ot & 6) === 0 && (zo = gt() + 500, _i()));
        }
        break;
      case 13:
        Pu(function() {
          var s = ga(n, 1);
          if (s !== null) {
            var p = Wn();
            Hr(s, n, 1, p);
          }
        }), Df(n, 1);
    }
  }, rs = function(n) {
    if (n.tag === 13) {
      var r = ga(n, 134217728);
      if (r !== null) {
        var u = Wn();
        Hr(r, n, 134217728, u);
      }
      Df(n, 134217728);
    }
  }, gi = function(n) {
    if (n.tag === 13) {
      var r = zi(n), u = ga(n, r);
      if (u !== null) {
        var s = Wn();
        Hr(u, n, r, s);
      }
      Df(n, r);
    }
  }, dt = function() {
    return Pt;
  }, co = function(n, r) {
    var u = Pt;
    try {
      return Pt = n, r();
    } finally {
      Pt = u;
    }
  }, qt = function(n, r, u) {
    switch (r) {
      case "input":
        if (wr(n, u), r = u.name, u.type === "radio" && r != null) {
          for (u = n; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < u.length; r++) {
            var s = u[r];
            if (s !== n && s.form === n.form) {
              var p = Cn(s);
              if (!p) throw Error(d(90));
              Gn(s), wr(s, p);
            }
          }
        }
        break;
      case "textarea":
        Rr(n, u);
        break;
      case "select":
        r = u.value, r != null && ln(n, !!u.multiple, r, !1);
    }
  }, ou = pp, Sl = Pu;
  var Tg = { usingClientEntryPoint: !1, Events: [Ze, li, Cn, Bi, uu, pp] }, Zs = { findFiberByHostInstance: Cu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Xv = { bundleType: Zs.bundleType, version: Zs.version, rendererPackageName: Zs.rendererPackageName, rendererConfig: Zs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ne.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Mn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Zs.findFiberByHostInstance || Qv, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ql = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ql.isDisabled && Ql.supportsFiber) try {
      Cl = Ql.inject(Xv), qr = Ql;
    } catch {
    }
  }
  return Qa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Tg, Qa.createPortal = function(n, r) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Ep(r)) throw Error(d(200));
    return bg(n, r, null, u);
  }, Qa.createRoot = function(n, r) {
    if (!Ep(n)) throw Error(d(299));
    var u = !1, s = "", p = Bu;
    return r != null && (r.unstable_strictMode === !0 && (u = !0), r.identifierPrefix !== void 0 && (s = r.identifierPrefix), r.onRecoverableError !== void 0 && (p = r.onRecoverableError)), r = _f(n, 1, !1, null, null, u, !1, s, p), n[Xi] = r.current, xo(n.nodeType === 8 ? n.parentNode : n), new xp(r);
  }, Qa.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(d(188)) : (n = Object.keys(n).join(","), Error(d(268, n)));
    return n = Mn(r), n = n === null ? null : n.stateNode, n;
  }, Qa.flushSync = function(n) {
    return Pu(n);
  }, Qa.hydrate = function(n, r, u) {
    if (!Of(r)) throw Error(d(200));
    return Ks(null, n, r, !0, u);
  }, Qa.hydrateRoot = function(n, r, u) {
    if (!Ep(n)) throw Error(d(405));
    var s = u != null && u.hydratedSources || null, p = !1, m = "", w = Bu;
    if (u != null && (u.unstable_strictMode === !0 && (p = !0), u.identifierPrefix !== void 0 && (m = u.identifierPrefix), u.onRecoverableError !== void 0 && (w = u.onRecoverableError)), r = Wv(r, null, n, 1, u ?? null, p, !1, m, w), n[Xi] = r.current, xo(n), s) for (n = 0; n < s.length; n++) u = s[n], p = u._getVersion, p = p(u._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [u, p] : r.mutableSourceEagerHydrationData.push(
      u,
      p
    );
    return new Mf(r);
  }, Qa.render = function(n, r, u) {
    if (!Of(r)) throw Error(d(200));
    return Ks(null, n, r, !1, u);
  }, Qa.unmountComponentAtNode = function(n) {
    if (!Of(n)) throw Error(d(40));
    return n._reactRootContainer ? (Pu(function() {
      Ks(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Xi] = null;
      });
    }), !0) : !1;
  }, Qa.unstable_batchedUpdates = pp, Qa.unstable_renderSubtreeIntoContainer = function(n, r, u, s) {
    if (!Of(u)) throw Error(d(200));
    if (n == null || n._reactInternals === void 0) throw Error(d(38));
    return Ks(n, r, u, !1, s);
  }, Qa.version = "18.3.1-next-f1338f8080-20240426", Qa;
}
var Ga = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uw;
function WM() {
  return Uw || (Uw = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var l = Lh(), c = mR(), d = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, y = !1;
    function g(e) {
      y = e;
    }
    function C(e) {
      if (!y) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        T("warn", e, a);
      }
    }
    function v(e) {
      if (!y) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        T("error", e, a);
      }
    }
    function T(e, t, a) {
      {
        var i = d.ReactDebugCurrentFrame, o = i.getStackAddendum();
        o !== "" && (t += "%s", a = a.concat([o]));
        var f = a.map(function(h) {
          return String(h);
        });
        f.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, f);
      }
    }
    var _ = 0, R = 1, D = 2, O = 3, z = 4, F = 5, oe = 6, ae = 7, ie = 8, ue = 9, we = 10, fe = 11, Ne = 12, de = 13, ge = 14, xe = 15, Xe = 16, lt = 17, bt = 18, Ut = 19, ze = 21, Ve = 22, V = 23, Se = 24, J = 25, re = !0, G = !1, ce = !1, ee = !1, A = !1, K = !0, Be = !0, Ae = !0, et = !0, at = /* @__PURE__ */ new Set(), qe = {}, tt = {};
    function pt(e, t) {
      jt(e, t), jt(e + "Capture", t);
    }
    function jt(e, t) {
      qe[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), qe[e] = t;
      {
        var a = e.toLowerCase();
        tt[a] = e, e === "onDoubleClick" && (tt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        at.add(t[i]);
    }
    var _n = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Gn = Object.prototype.hasOwnProperty;
    function Ht(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Fn(e) {
      try {
        return Tn(e), !1;
      } catch {
        return !0;
      }
    }
    function Tn(e) {
      return "" + e;
    }
    function Dn(e, t) {
      if (Fn(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ht(e)), Tn(e);
    }
    function wr(e) {
      if (Fn(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ht(e)), Tn(e);
    }
    function Ta(e, t) {
      if (Fn(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ht(e)), Tn(e);
    }
    function ur(e, t) {
      if (Fn(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Ht(e)), Tn(e);
    }
    function rn(e) {
      if (Fn(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Ht(e)), Tn(e);
    }
    function ln(e) {
      if (Fn(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Ht(e)), Tn(e);
    }
    var dn = 0, jn = 1, Rr = 2, yn = 3, Xn = 4, br = 5, Xr = 6, pa = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Re = pa + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", We = new RegExp("^[" + pa + "][" + Re + "]*$"), St = {}, Wt = {};
    function un(e) {
      return Gn.call(Wt, e) ? !0 : Gn.call(St, e) ? !1 : We.test(e) ? (Wt[e] = !0, !0) : (St[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function xn(e, t, a) {
      return t !== null ? t.type === dn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function pn(e, t, a, i) {
      if (a !== null && a.type === dn)
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
    function tr(e, t, a, i) {
      if (t === null || typeof t > "u" || pn(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case yn:
            return !t;
          case Xn:
            return t === !1;
          case br:
            return isNaN(t);
          case Xr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function on(e) {
      return qt.hasOwnProperty(e) ? qt[e] : null;
    }
    function Xt(e, t, a, i, o, f, h) {
      this.acceptsBooleans = t === Rr || t === yn || t === Xn, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = f, this.removeEmptyString = h;
    }
    var qt = {}, ha = [
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
    ha.forEach(function(e) {
      qt[e] = new Xt(
        e,
        dn,
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
      qt[t] = new Xt(
        t,
        jn,
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
      qt[e] = new Xt(
        e,
        Rr,
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
      qt[e] = new Xt(
        e,
        Rr,
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
      qt[e] = new Xt(
        e,
        yn,
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
      qt[e] = new Xt(
        e,
        yn,
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
      qt[e] = new Xt(
        e,
        Xn,
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
      qt[e] = new Xt(
        e,
        Xr,
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
      qt[e] = new Xt(
        e,
        br,
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
    var _r = /[\-\:]([a-z])/g, ka = function(e) {
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
      var t = e.replace(_r, ka);
      qt[t] = new Xt(
        t,
        jn,
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
      var t = e.replace(_r, ka);
      qt[t] = new Xt(
        t,
        jn,
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
      var t = e.replace(_r, ka);
      qt[t] = new Xt(
        t,
        jn,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      qt[e] = new Xt(
        e,
        jn,
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
    qt[Bi] = new Xt(
      "xlinkHref",
      jn,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      qt[e] = new Xt(
        e,
        jn,
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
      !ou && uu.test(e) && (ou = !0, v("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function xl(e, t, a, i) {
      if (i.mustUseProperty) {
        var o = i.propertyName;
        return e[o];
      } else {
        Dn(a, t), i.sanitizeURL && Sl("" + a);
        var f = i.attributeName, h = null;
        if (i.type === Xn) {
          if (e.hasAttribute(f)) {
            var S = e.getAttribute(f);
            return S === "" ? !0 : tr(t, a, i, !1) ? S : S === "" + a ? a : S;
          }
        } else if (e.hasAttribute(f)) {
          if (tr(t, a, i, !1))
            return e.getAttribute(f);
          if (i.type === yn)
            return a;
          h = e.getAttribute(f);
        }
        return tr(t, a, i, !1) ? h === null ? a : h : h === "" + a ? a : h;
      }
    }
    function su(e, t, a, i) {
      {
        if (!un(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var o = e.getAttribute(t);
        return Dn(a, t), o === "" + a ? a : o;
      }
    }
    function Or(e, t, a, i) {
      var o = on(t);
      if (!xn(t, o, i)) {
        if (tr(t, a, o, i) && (a = null), i || o === null) {
          if (un(t)) {
            var f = t;
            a === null ? e.removeAttribute(f) : (Dn(a, t), e.setAttribute(f, "" + a));
          }
          return;
        }
        var h = o.mustUseProperty;
        if (h) {
          var S = o.propertyName;
          if (a === null) {
            var x = o.type;
            e[S] = x === yn ? !1 : "";
          } else
            e[S] = a;
          return;
        }
        var b = o.attributeName, k = o.attributeNamespace;
        if (a === null)
          e.removeAttribute(b);
        else {
          var P = o.type, j;
          P === yn || P === Xn && a === !0 ? j = "" : (Dn(a, b), j = "" + a, o.sanitizeURL && Sl(j.toString())), k ? e.setAttributeNS(k, b, j) : e.setAttribute(b, j);
        }
      }
    }
    var Nr = Symbol.for("react.element"), or = Symbol.for("react.portal"), vi = Symbol.for("react.fragment"), Ka = Symbol.for("react.strict_mode"), mi = Symbol.for("react.profiler"), yi = Symbol.for("react.provider"), L = Symbol.for("react.context"), pe = Symbol.for("react.forward_ref"), ke = Symbol.for("react.suspense"), Pe = Symbol.for("react.suspense_list"), yt = Symbol.for("react.memo"), ht = Symbol.for("react.lazy"), _t = Symbol.for("react.scope"), wt = Symbol.for("react.debug_trace_mode"), Mn = Symbol.for("react.offscreen"), sn = Symbol.for("react.legacy_hidden"), hn = Symbol.for("react.cache"), sr = Symbol.for("react.tracing_marker"), Za = Symbol.iterator, Ja = "@@iterator";
    function gt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Za && e[Za] || e[Ja];
      return typeof t == "function" ? t : null;
    }
    var Et = Object.assign, ei = 0, cu, fu, El, ao, Cl, qr, ns;
    function Lr() {
    }
    Lr.__reactDisabledLog = !0;
    function Cc() {
      {
        if (ei === 0) {
          cu = console.log, fu = console.info, El = console.warn, ao = console.error, Cl = console.group, qr = console.groupCollapsed, ns = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Lr,
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
        ei++;
      }
    }
    function wc() {
      {
        if (ei--, ei === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Et({}, e, {
              value: cu
            }),
            info: Et({}, e, {
              value: fu
            }),
            warn: Et({}, e, {
              value: El
            }),
            error: Et({}, e, {
              value: ao
            }),
            group: Et({}, e, {
              value: Cl
            }),
            groupCollapsed: Et({}, e, {
              value: qr
            }),
            groupEnd: Et({}, e, {
              value: ns
            })
          });
        }
        ei < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var io = d.ReactCurrentDispatcher, wl;
    function va(e, t, a) {
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
    var ti = !1, ni;
    {
      var lo = typeof WeakMap == "function" ? WeakMap : Map;
      ni = new lo();
    }
    function du(e, t) {
      if (!e || ti)
        return "";
      {
        var a = ni.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      ti = !0;
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
          for (var S = q.stack.split(`
`), x = i.stack.split(`
`), b = S.length - 1, k = x.length - 1; b >= 1 && k >= 0 && S[b] !== x[k]; )
            k--;
          for (; b >= 1 && k >= 0; b--, k--)
            if (S[b] !== x[k]) {
              if (b !== 1 || k !== 1)
                do
                  if (b--, k--, k < 0 || S[b] !== x[k]) {
                    var P = `
` + S[b].replace(" at new ", " at ");
                    return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), typeof e == "function" && ni.set(e, P), P;
                  }
                while (b >= 1 && k >= 0);
              break;
            }
        }
      } finally {
        ti = !1, io.current = f, wc(), Error.prepareStackTrace = o;
      }
      var j = e ? e.displayName || e.name : "", W = j ? va(j) : "";
      return typeof e == "function" && ni.set(e, W), W;
    }
    function Rl(e, t, a) {
      return du(e, !0);
    }
    function uo(e, t, a) {
      return du(e, !1);
    }
    function oo(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function $i(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return du(e, oo(e));
      if (typeof e == "string")
        return va(e);
      switch (e) {
        case ke:
          return va("Suspense");
        case Pe:
          return va("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case pe:
            return uo(e.render);
          case yt:
            return $i(e.type, t, a);
          case ht: {
            var i = e, o = i._payload, f = i._init;
            try {
              return $i(f(o), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function md(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case F:
          return va(e.type);
        case Xe:
          return va("Lazy");
        case de:
          return va("Suspense");
        case Ut:
          return va("SuspenseList");
        case _:
        case D:
        case xe:
          return uo(e.type);
        case fe:
          return uo(e.type.render);
        case R:
          return Rl(e.type);
        default:
          return "";
      }
    }
    function Ii(e) {
      try {
        var t = "", a = e;
        do
          t += md(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Pt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var o = t.displayName || t.name || "";
      return o !== "" ? a + "(" + o + ")" : a;
    }
    function so(e) {
      return e.displayName || "Context";
    }
    function zt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case vi:
          return "Fragment";
        case or:
          return "Portal";
        case mi:
          return "Profiler";
        case Ka:
          return "StrictMode";
        case ke:
          return "Suspense";
        case Pe:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case L:
            var t = e;
            return so(t) + ".Consumer";
          case yi:
            var a = e;
            return so(a._context) + ".Provider";
          case pe:
            return Pt(e, e.render, "ForwardRef");
          case yt:
            var i = e.displayName || null;
            return i !== null ? i : zt(e.type) || "Memo";
          case ht: {
            var o = e, f = o._payload, h = o._init;
            try {
              return zt(h(f));
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
    function dt(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Se:
          return "Cache";
        case ue:
          var i = a;
          return gi(i) + ".Consumer";
        case we:
          var o = a;
          return gi(o._context) + ".Provider";
        case bt:
          return "DehydratedFragment";
        case fe:
          return rs(a, a.render, "ForwardRef");
        case ae:
          return "Fragment";
        case F:
          return a;
        case z:
          return "Portal";
        case O:
          return "Root";
        case oe:
          return "Text";
        case Xe:
          return zt(a);
        case ie:
          return a === Ka ? "StrictMode" : "Mode";
        case Ve:
          return "Offscreen";
        case Ne:
          return "Profiler";
        case ze:
          return "Scope";
        case de:
          return "Suspense";
        case Ut:
          return "SuspenseList";
        case J:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case R:
        case _:
        case lt:
        case D:
        case ge:
        case xe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var co = d.ReactDebugCurrentFrame, cr = null, Si = !1;
    function zr() {
      {
        if (cr === null)
          return null;
        var e = cr._debugOwner;
        if (e !== null && typeof e < "u")
          return dt(e);
      }
      return null;
    }
    function xi() {
      return cr === null ? "" : Ii(cr);
    }
    function vn() {
      co.getCurrentStack = null, cr = null, Si = !1;
    }
    function Kt(e) {
      co.getCurrentStack = e === null ? null : xi, cr = e, Si = !1;
    }
    function bl() {
      return cr;
    }
    function qn(e) {
      Si = e;
    }
    function Ar(e) {
      return "" + e;
    }
    function Da(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return ln(e), e;
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
      pu[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function is(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function _l(e) {
      return e._valueTracker;
    }
    function hu(e) {
      e._valueTracker = null;
    }
    function yd(e) {
      var t = "";
      return e && (is(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ma(e) {
      var t = is(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      ln(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var o = a.get, f = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(S) {
            ln(S), i = "" + S, f.call(this, S);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var h = {
          getValue: function() {
            return i;
          },
          setValue: function(S) {
            ln(S), i = "" + S;
          },
          stopTracking: function() {
            hu(e), delete e[t];
          }
        };
        return h;
      }
    }
    function ri(e) {
      _l(e) || (e._valueTracker = Ma(e));
    }
    function Ei(e) {
      if (!e)
        return !1;
      var t = _l(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = yd(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Oa(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var fo = !1, po = !1, Tl = !1, vu = !1;
    function ho(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function vo(e, t) {
      var a = e, i = t.checked, o = Et({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return o;
    }
    function ai(e, t) {
      as("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !po && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", zr() || "A component", t.type), po = !0), t.value !== void 0 && t.defaultValue !== void 0 && !fo && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", zr() || "A component", t.type), fo = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Da(t.value != null ? t.value : i),
        controlled: ho(t)
      };
    }
    function E(e, t) {
      var a = e, i = t.checked;
      i != null && Or(a, "checked", i, !1);
    }
    function N(e, t) {
      var a = e;
      {
        var i = ho(t);
        !a._wrapperState.controlled && i && !vu && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), vu = !0), a._wrapperState.controlled && !i && !Tl && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Tl = !0);
      }
      E(e, t);
      var o = Da(t.value), f = t.type;
      if (o != null)
        f === "number" ? (o === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != o) && (a.value = Ar(o)) : a.value !== Ar(o) && (a.value = Ar(o));
      else if (f === "submit" || f === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? nt(a, t.type, o) : t.hasOwnProperty("defaultValue") && nt(a, t.type, Da(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function Q(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type, f = o === "submit" || o === "reset";
        if (f && (t.value === void 0 || t.value === null))
          return;
        var h = Ar(i._wrapperState.initialValue);
        a || h !== i.value && (i.value = h), i.defaultValue = h;
      }
      var S = i.name;
      S !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, S !== "" && (i.name = S);
    }
    function Z(e, t) {
      var a = e;
      N(a, t), be(a, t);
    }
    function be(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Dn(a, "name");
        for (var o = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), f = 0; f < o.length; f++) {
          var h = o[f];
          if (!(h === e || h.form !== e.form)) {
            var S = pm(h);
            if (!S)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Ei(h), N(h, S);
          }
        }
      }
    }
    function nt(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Oa(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Ar(e._wrapperState.initialValue) : e.defaultValue !== Ar(a) && (e.defaultValue = Ar(a)));
    }
    var Te = !1, ut = !1, Tt = !1;
    function At(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? l.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || ut || (ut = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Tt || (Tt = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Te && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Te = !0);
    }
    function cn(e, t) {
      t.value != null && e.setAttribute("value", Ar(Da(t.value)));
    }
    var Zt = Array.isArray;
    function Ct(e) {
      return Zt(e);
    }
    var Jt;
    Jt = !1;
    function En() {
      var e = zr();
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
            var i = Ct(e[a]);
            e.multiple && !i ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, En()) : !e.multiple && i && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, En());
          }
        }
      }
    }
    function Yi(e, t, a, i) {
      var o = e.options;
      if (t) {
        for (var f = a, h = {}, S = 0; S < f.length; S++)
          h["$" + f[S]] = !0;
        for (var x = 0; x < o.length; x++) {
          var b = h.hasOwnProperty("$" + o[x].value);
          o[x].selected !== b && (o[x].selected = b), b && i && (o[x].defaultSelected = !0);
        }
      } else {
        for (var k = Ar(Da(a)), P = null, j = 0; j < o.length; j++) {
          if (o[j].value === k) {
            o[j].selected = !0, i && (o[j].defaultSelected = !0);
            return;
          }
          P === null && !o[j].disabled && (P = o[j]);
        }
        P !== null && (P.selected = !0);
      }
    }
    function us(e, t) {
      return Et({}, t, {
        value: void 0
      });
    }
    function mu(e, t) {
      var a = e;
      ls(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Jt && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Jt = !0);
    }
    function gd(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Yi(a, !!t.multiple, i, !1) : t.defaultValue != null && Yi(a, !!t.multiple, t.defaultValue, !0);
    }
    function Rc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var o = t.value;
      o != null ? Yi(a, !!t.multiple, o, !1) : i !== !!t.multiple && (t.defaultValue != null ? Yi(a, !!t.multiple, t.defaultValue, !0) : Yi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Sd(e, t) {
      var a = e, i = t.value;
      i != null && Yi(a, !!t.multiple, i, !1);
    }
    var Uh = !1;
    function xd(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = Et({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Ar(a._wrapperState.initialValue)
      });
      return i;
    }
    function Ed(e, t) {
      var a = e;
      as("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Uh && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", zr() || "A component"), Uh = !0);
      var i = t.value;
      if (i == null) {
        var o = t.children, f = t.defaultValue;
        if (o != null) {
          v("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (f != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (Ct(o)) {
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
        initialValue: Da(i)
      };
    }
    function Fh(e, t) {
      var a = e, i = Da(t.value), o = Da(t.defaultValue);
      if (i != null) {
        var f = Ar(i);
        f !== a.value && (a.value = f), t.defaultValue == null && a.defaultValue !== f && (a.defaultValue = f);
      }
      o != null && (a.defaultValue = Ar(o));
    }
    function jh(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function ng(e, t) {
      Fh(e, t);
    }
    var Wi = "http://www.w3.org/1999/xhtml", Cd = "http://www.w3.org/1998/Math/MathML", wd = "http://www.w3.org/2000/svg";
    function Rd(e) {
      switch (e) {
        case "svg":
          return wd;
        case "math":
          return Cd;
        default:
          return Wi;
      }
    }
    function bd(e, t) {
      return e == null || e === Wi ? Rd(t) : e === wd && t === "foreignObject" ? Wi : e;
    }
    var Hh = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, o) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, o);
        });
      } : e;
    }, bc, Ph = Hh(function(e, t) {
      if (e.namespaceURI === wd && !("innerHTML" in e)) {
        bc = bc || document.createElement("div"), bc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = bc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Kr = 1, Qi = 3, Hn = 8, Gi = 9, _d = 11, mo = function(e, t) {
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
    function Vh(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Bh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(ss).forEach(function(e) {
      Bh.forEach(function(t) {
        ss[Vh(t, e)] = ss[e];
      });
    });
    function _c(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(ss.hasOwnProperty(e) && ss[e]) ? t + "px" : (ur(t, e), ("" + t).trim());
    }
    var $h = /([A-Z])/g, Ih = /^ms-/;
    function yo(e) {
      return e.replace($h, "-$1").toLowerCase().replace(Ih, "-ms-");
    }
    var Yh = function() {
    };
    {
      var rg = /^(?:webkit|moz|o)[A-Z]/, ag = /^-ms-/, Wh = /-(.)/g, Td = /;\s*$/, Ci = {}, yu = {}, Qh = !1, cs = !1, ig = function(e) {
        return e.replace(Wh, function(t, a) {
          return a.toUpperCase();
        });
      }, Gh = function(e) {
        Ci.hasOwnProperty(e) && Ci[e] || (Ci[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          ig(e.replace(ag, "ms-"))
        ));
      }, kd = function(e) {
        Ci.hasOwnProperty(e) && Ci[e] || (Ci[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Dd = function(e, t) {
        yu.hasOwnProperty(t) && yu[t] || (yu[t] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Td, "")));
      }, Xh = function(e, t) {
        Qh || (Qh = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, qh = function(e, t) {
        cs || (cs = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Yh = function(e, t) {
        e.indexOf("-") > -1 ? Gh(e) : rg.test(e) ? kd(e) : Td.test(t) && Dd(e, t), typeof t == "number" && (isNaN(t) ? Xh(e, t) : isFinite(t) || qh(e, t));
      };
    }
    var Kh = Yh;
    function lg(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var o = e[i];
            if (o != null) {
              var f = i.indexOf("--") === 0;
              t += a + (f ? i : yo(i)) + ":", t += _c(i, o, f), a = ";";
            }
          }
        return t || null;
      }
    }
    function Zh(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var o = i.indexOf("--") === 0;
          o || Kh(i, t[i]);
          var f = _c(i, t[i], o);
          i === "float" && (i = "cssFloat"), o ? a.setProperty(i, f) : a[i] = f;
        }
    }
    function ug(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Jh(e) {
      var t = {};
      for (var a in e)
        for (var i = os[a] || [a], o = 0; o < i.length; o++)
          t[i[o]] = a;
      return t;
    }
    function og(e, t) {
      {
        if (!t)
          return;
        var a = Jh(e), i = Jh(t), o = {};
        for (var f in a) {
          var h = a[f], S = i[f];
          if (S && h !== S) {
            var x = h + "," + S;
            if (o[x])
              continue;
            o[x] = !0, v("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", ug(e[h]) ? "Removing" : "Updating", h, S);
          }
        }
      }
    }
    var ii = {
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
    }, fs = Et({
      menuitem: !0
    }, ii), ev = "__html";
    function Tc(e, t) {
      if (t) {
        if (fs[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(ev in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && v("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
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
    }, go = {}, sg = new RegExp("^(aria)-[" + Re + "]*$"), So = new RegExp("^(aria)[A-Z][" + Re + "]*$");
    function Md(e, t) {
      {
        if (Gn.call(go, t) && go[t])
          return !0;
        if (So.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = kc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), go[t] = !0, !0;
          if (t !== i)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), go[t] = !0, !0;
        }
        if (sg.test(t)) {
          var o = t.toLowerCase(), f = kc.hasOwnProperty(o) ? o : null;
          if (f == null)
            return go[t] = !0, !1;
          if (t !== f)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, f), go[t] = !0, !0;
        }
      }
      return !0;
    }
    function ps(e, t) {
      {
        var a = [];
        for (var i in t) {
          var o = Md(e, i);
          o || a.push(i);
        }
        var f = a.map(function(h) {
          return "`" + h + "`";
        }).join(", ");
        a.length === 1 ? v("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", f, e) : a.length > 1 && v("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", f, e);
      }
    }
    function Od(e, t) {
      Dl(e, t) || ps(e, t);
    }
    var Nd = !1;
    function Dc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Nd && (Nd = !0, e === "select" && t.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var gu = function() {
    };
    {
      var fr = {}, Ld = /^on./, Mc = /^on[^A-Z]/, tv = new RegExp("^(aria)-[" + Re + "]*$"), nv = new RegExp("^(aria)[A-Z][" + Re + "]*$");
      gu = function(e, t, a, i) {
        if (Gn.call(fr, t) && fr[t])
          return !0;
        var o = t.toLowerCase();
        if (o === "onfocusin" || o === "onfocusout")
          return v("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), fr[t] = !0, !0;
        if (i != null) {
          var f = i.registrationNameDependencies, h = i.possibleRegistrationNames;
          if (f.hasOwnProperty(t))
            return !0;
          var S = h.hasOwnProperty(o) ? h[o] : null;
          if (S != null)
            return v("Invalid event handler property `%s`. Did you mean `%s`?", t, S), fr[t] = !0, !0;
          if (Ld.test(t))
            return v("Unknown event handler property `%s`. It will be ignored.", t), fr[t] = !0, !0;
        } else if (Ld.test(t))
          return Mc.test(t) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), fr[t] = !0, !0;
        if (tv.test(t) || nv.test(t))
          return !0;
        if (o === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), fr[t] = !0, !0;
        if (o === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), fr[t] = !0, !0;
        if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), fr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), fr[t] = !0, !0;
        var x = on(t), b = x !== null && x.type === dn;
        if (ds.hasOwnProperty(o)) {
          var k = ds[o];
          if (k !== t)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", t, k), fr[t] = !0, !0;
        } else if (!b && t !== o)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, o), fr[t] = !0, !0;
        return typeof a == "boolean" && pn(t, a, x, !1) ? (a ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), fr[t] = !0, !0) : b ? !0 : pn(t, a, x, !1) ? (fr[t] = !0, !1) : ((a === "false" || a === "true") && x !== null && x.type === yn && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), fr[t] = !0), !0);
      };
    }
    var rv = function(e, t, a) {
      {
        var i = [];
        for (var o in t) {
          var f = gu(e, o, t[o], a);
          f || i.push(o);
        }
        var h = i.map(function(S) {
          return "`" + S + "`";
        }).join(", ");
        i.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", h, e) : i.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", h, e);
      }
    };
    function av(e, t, a) {
      Dl(e, t) || rv(e, t, a);
    }
    var zd = 1, Oc = 2, Na = 4, Ad = zd | Oc | Na, Su = null;
    function cg(e) {
      Su !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Su = e;
    }
    function fg() {
      Su === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Su = null;
    }
    function hs(e) {
      return e === Su;
    }
    function Ud(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Qi ? t.parentNode : t;
    }
    var Nc = null, xu = null, Qt = null;
    function Lc(e) {
      var t = Po(e);
      if (t) {
        if (typeof Nc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = pm(a);
          Nc(t.stateNode, t.type, i);
        }
      }
    }
    function zc(e) {
      Nc = e;
    }
    function xo(e) {
      xu ? Qt ? Qt.push(e) : Qt = [e] : xu = e;
    }
    function iv() {
      return xu !== null || Qt !== null;
    }
    function Ac() {
      if (xu) {
        var e = xu, t = Qt;
        if (xu = null, Qt = null, Lc(e), t)
          for (var a = 0; a < t.length; a++)
            Lc(t[a]);
      }
    }
    var Eo = function(e, t) {
      return e(t);
    }, vs = function() {
    }, Ml = !1;
    function lv() {
      var e = iv();
      e && (vs(), Ac());
    }
    function uv(e, t, a) {
      if (Ml)
        return e(t, a);
      Ml = !0;
      try {
        return Eo(e, t, a);
      } finally {
        Ml = !1, lv();
      }
    }
    function dg(e, t, a) {
      Eo = e, vs = a;
    }
    function ov(e) {
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
          return !!(a.disabled && ov(t));
        default:
          return !1;
      }
    }
    function Ol(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = pm(a);
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
    if (_n)
      try {
        var Eu = {};
        Object.defineProperty(Eu, "passive", {
          get: function() {
            ms = !0;
          }
        }), window.addEventListener("test", Eu, Eu), window.removeEventListener("test", Eu, Eu);
      } catch {
        ms = !1;
      }
    function Fc(e, t, a, i, o, f, h, S, x) {
      var b = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, b);
      } catch (k) {
        this.onError(k);
      }
    }
    var jc = Fc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Fd = document.createElement("react");
      jc = function(t, a, i, o, f, h, S, x, b) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var k = document.createEvent("Event"), P = !1, j = !0, W = window.event, q = Object.getOwnPropertyDescriptor(window, "event");
        function te() {
          Fd.removeEventListener(ne, rt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = W);
        }
        var Me = Array.prototype.slice.call(arguments, 3);
        function rt() {
          P = !0, te(), a.apply(i, Me), j = !1;
        }
        var Ge, Lt = !1, kt = !1;
        function $(I) {
          if (Ge = I.error, Lt = !0, Ge === null && I.colno === 0 && I.lineno === 0 && (kt = !0), I.defaultPrevented && Ge != null && typeof Ge == "object")
            try {
              Ge._suppressLogging = !0;
            } catch {
            }
        }
        var ne = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", $), Fd.addEventListener(ne, rt, !1), k.initEvent(ne, !1, !1), Fd.dispatchEvent(k), q && Object.defineProperty(window, "event", q), P && j && (Lt ? kt && (Ge = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ge = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ge)), window.removeEventListener("error", $), !P)
          return te(), Fc.apply(this, arguments);
      };
    }
    var sv = jc, Co = !1, Hc = null, wo = !1, wi = null, cv = {
      onError: function(e) {
        Co = !0, Hc = e;
      }
    };
    function Nl(e, t, a, i, o, f, h, S, x) {
      Co = !1, Hc = null, sv.apply(cv, arguments);
    }
    function Ri(e, t, a, i, o, f, h, S, x) {
      if (Nl.apply(this, arguments), Co) {
        var b = gs();
        wo || (wo = !0, wi = b);
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
    function Ro(e) {
      return e._reactInternals;
    }
    function pg(e) {
      return e._reactInternals !== void 0;
    }
    function Cu(e, t) {
      e._reactInternals = t;
    }
    var Ze = (
      /*                      */
      0
    ), li = (
      /*                */
      1
    ), Cn = (
      /*                    */
      2
    ), Mt = (
      /*                       */
      4
    ), La = (
      /*                */
      16
    ), za = (
      /*                 */
      32
    ), fn = (
      /*                     */
      64
    ), Ke = (
      /*                   */
      128
    ), Tr = (
      /*            */
      256
    ), kn = (
      /*                          */
      512
    ), Kn = (
      /*                     */
      1024
    ), Zr = (
      /*                      */
      2048
    ), Jr = (
      /*                    */
      4096
    ), Pn = (
      /*                   */
      8192
    ), bo = (
      /*             */
      16384
    ), fv = (
      /*               */
      32767
    ), Ss = (
      /*                   */
      32768
    ), nr = (
      /*                */
      65536
    ), Pc = (
      /* */
      131072
    ), bi = (
      /*                       */
      1048576
    ), _o = (
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
    ), _i = (
      /*              */
      33554432
    ), zl = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Mt | Kn | 0
    ), Al = Cn | Mt | La | za | kn | Jr | Pn, Ul = Mt | fn | kn | Pn, Ki = Zr | La, Vn = qi | Vc | _o, Aa = d.ReactCurrentOwner;
    function ma(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (Cn | Jr)) !== Ze && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === O ? a : null;
    }
    function Ti(e) {
      if (e.tag === de) {
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
      return e.tag === O ? e.stateNode.containerInfo : null;
    }
    function wu(e) {
      return ma(e) === e;
    }
    function dv(e) {
      {
        var t = Aa.current;
        if (t !== null && t.tag === R) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", dt(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var o = Ro(e);
      return o ? ma(o) === o : !1;
    }
    function Bc(e) {
      if (ma(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function $c(e) {
      var t = e.alternate;
      if (!t) {
        var a = ma(e);
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
          var S = f.return;
          if (S !== null) {
            i = o = S;
            continue;
          }
          break;
        }
        if (f.child === h.child) {
          for (var x = f.child; x; ) {
            if (x === i)
              return Bc(f), e;
            if (x === o)
              return Bc(f), t;
            x = x.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== o.return)
          i = f, o = h;
        else {
          for (var b = !1, k = f.child; k; ) {
            if (k === i) {
              b = !0, i = f, o = h;
              break;
            }
            if (k === o) {
              b = !0, o = f, i = h;
              break;
            }
            k = k.sibling;
          }
          if (!b) {
            for (k = h.child; k; ) {
              if (k === i) {
                b = !0, i = h, o = f;
                break;
              }
              if (k === o) {
                b = !0, o = h, i = f;
                break;
              }
              k = k.sibling;
            }
            if (!b)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== o)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== O)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function ea(e) {
      var t = $c(e);
      return t !== null ? ta(t) : null;
    }
    function ta(e) {
      if (e.tag === F || e.tag === oe)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = ta(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function gn(e) {
      var t = $c(e);
      return t !== null ? Ua(t) : null;
    }
    function Ua(e) {
      if (e.tag === F || e.tag === oe)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== z) {
          var a = Ua(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var jd = c.unstable_scheduleCallback, pv = c.unstable_cancelCallback, Hd = c.unstable_shouldYield, Pd = c.unstable_requestPaint, Zn = c.unstable_now, Ic = c.unstable_getCurrentPriorityLevel, xs = c.unstable_ImmediatePriority, Fl = c.unstable_UserBlockingPriority, Zi = c.unstable_NormalPriority, hg = c.unstable_LowPriority, Ru = c.unstable_IdlePriority, Yc = c.unstable_yieldValue, hv = c.unstable_setDisableYieldValue, bu = null, On = null, De = null, ya = !1, na = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function To(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Be && (e = Et({}, e, {
          getLaneLabelMap: _u,
          injectProfilingHooks: Fa
        })), bu = t.inject(e), On = t;
      } catch (a) {
        v("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Vd(e, t) {
      if (On && typeof On.onScheduleFiberRoot == "function")
        try {
          On.onScheduleFiberRoot(bu, e, t);
        } catch (a) {
          ya || (ya = !0, v("React instrumentation encountered an error: %s", a));
        }
    }
    function Bd(e, t) {
      if (On && typeof On.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Ke) === Ke;
          if (Ae) {
            var i;
            switch (t) {
              case Ur:
                i = xs;
                break;
              case Mi:
                i = Fl;
                break;
              case ja:
                i = Zi;
                break;
              case Ha:
                i = Ru;
                break;
              default:
                i = Zi;
                break;
            }
            On.onCommitFiberRoot(bu, e, i, a);
          }
        } catch (o) {
          ya || (ya = !0, v("React instrumentation encountered an error: %s", o));
        }
    }
    function $d(e) {
      if (On && typeof On.onPostCommitFiberRoot == "function")
        try {
          On.onPostCommitFiberRoot(bu, e);
        } catch (t) {
          ya || (ya = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function Id(e) {
      if (On && typeof On.onCommitFiberUnmount == "function")
        try {
          On.onCommitFiberUnmount(bu, e);
        } catch (t) {
          ya || (ya = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function wn(e) {
      if (typeof Yc == "function" && (hv(e), g(e)), On && typeof On.setStrictMode == "function")
        try {
          On.setStrictMode(bu, e);
        } catch (t) {
          ya || (ya = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function Fa(e) {
      De = e;
    }
    function _u() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Du; a++) {
          var i = gv(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Yd(e) {
      De !== null && typeof De.markCommitStarted == "function" && De.markCommitStarted(e);
    }
    function Wd() {
      De !== null && typeof De.markCommitStopped == "function" && De.markCommitStopped();
    }
    function ga(e) {
      De !== null && typeof De.markComponentRenderStarted == "function" && De.markComponentRenderStarted(e);
    }
    function Sa() {
      De !== null && typeof De.markComponentRenderStopped == "function" && De.markComponentRenderStopped();
    }
    function Qd(e) {
      De !== null && typeof De.markComponentPassiveEffectMountStarted == "function" && De.markComponentPassiveEffectMountStarted(e);
    }
    function vv() {
      De !== null && typeof De.markComponentPassiveEffectMountStopped == "function" && De.markComponentPassiveEffectMountStopped();
    }
    function Ji(e) {
      De !== null && typeof De.markComponentPassiveEffectUnmountStarted == "function" && De.markComponentPassiveEffectUnmountStarted(e);
    }
    function jl() {
      De !== null && typeof De.markComponentPassiveEffectUnmountStopped == "function" && De.markComponentPassiveEffectUnmountStopped();
    }
    function Wc(e) {
      De !== null && typeof De.markComponentLayoutEffectMountStarted == "function" && De.markComponentLayoutEffectMountStarted(e);
    }
    function mv() {
      De !== null && typeof De.markComponentLayoutEffectMountStopped == "function" && De.markComponentLayoutEffectMountStopped();
    }
    function Es(e) {
      De !== null && typeof De.markComponentLayoutEffectUnmountStarted == "function" && De.markComponentLayoutEffectUnmountStarted(e);
    }
    function Gd() {
      De !== null && typeof De.markComponentLayoutEffectUnmountStopped == "function" && De.markComponentLayoutEffectUnmountStopped();
    }
    function Cs(e, t, a) {
      De !== null && typeof De.markComponentErrored == "function" && De.markComponentErrored(e, t, a);
    }
    function Di(e, t, a) {
      De !== null && typeof De.markComponentSuspended == "function" && De.markComponentSuspended(e, t, a);
    }
    function ws(e) {
      De !== null && typeof De.markLayoutEffectsStarted == "function" && De.markLayoutEffectsStarted(e);
    }
    function Rs() {
      De !== null && typeof De.markLayoutEffectsStopped == "function" && De.markLayoutEffectsStopped();
    }
    function Tu(e) {
      De !== null && typeof De.markPassiveEffectsStarted == "function" && De.markPassiveEffectsStarted(e);
    }
    function Xd() {
      De !== null && typeof De.markPassiveEffectsStopped == "function" && De.markPassiveEffectsStopped();
    }
    function ku(e) {
      De !== null && typeof De.markRenderStarted == "function" && De.markRenderStarted(e);
    }
    function yv() {
      De !== null && typeof De.markRenderYielded == "function" && De.markRenderYielded();
    }
    function Qc() {
      De !== null && typeof De.markRenderStopped == "function" && De.markRenderStopped();
    }
    function Rn(e) {
      De !== null && typeof De.markRenderScheduled == "function" && De.markRenderScheduled(e);
    }
    function Gc(e, t) {
      De !== null && typeof De.markForceUpdateScheduled == "function" && De.markForceUpdateScheduled(e, t);
    }
    function bs(e, t) {
      De !== null && typeof De.markStateUpdateScheduled == "function" && De.markStateUpdateScheduled(e, t);
    }
    var Je = (
      /*                         */
      0
    ), Rt = (
      /*                 */
      1
    ), Vt = (
      /*                    */
      2
    ), en = (
      /*               */
      8
    ), Bt = (
      /*              */
      16
    ), Bn = Math.clz32 ? Math.clz32 : _s, rr = Math.log, Xc = Math.LN2;
    function _s(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (rr(t) / Xc | 0) | 0;
    }
    var Du = 31, he = (
      /*                        */
      0
    ), Ft = (
      /*                          */
      0
    ), st = (
      /*                        */
      1
    ), Hl = (
      /*    */
      2
    ), ui = (
      /*             */
      4
    ), kr = (
      /*            */
      8
    ), Nn = (
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
    ), Ts = (
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
    ), qd = Nu, Ms = (
      /*          */
      134217728
    ), Kd = (
      /*                          */
      268435455
    ), Os = (
      /*               */
      268435456
    ), Lu = (
      /*                        */
      536870912
    ), ra = (
      /*                   */
      1073741824
    );
    function gv(e) {
      {
        if (e & st)
          return "Sync";
        if (e & Hl)
          return "InputContinuousHydration";
        if (e & ui)
          return "InputContinuous";
        if (e & kr)
          return "DefaultHydration";
        if (e & Nn)
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
        if (e & ra)
          return "Offscreen";
      }
    }
    var an = -1, zu = Mu, ff = Nu;
    function Ns(e) {
      switch (Vl(e)) {
        case st:
          return st;
        case Hl:
          return Hl;
        case ui:
          return ui;
        case kr:
          return kr;
        case Nn:
          return Nn;
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
        case Ts:
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
        case ra:
          return ra;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function df(e, t) {
      var a = e.pendingLanes;
      if (a === he)
        return he;
      var i = he, o = e.suspendedLanes, f = e.pingedLanes, h = a & Kd;
      if (h !== he) {
        var S = h & ~o;
        if (S !== he)
          i = Ns(S);
        else {
          var x = h & f;
          x !== he && (i = Ns(x));
        }
      } else {
        var b = a & ~o;
        b !== he ? i = Ns(b) : f !== he && (i = Ns(f));
      }
      if (i === he)
        return he;
      if (t !== he && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & o) === he) {
        var k = Vl(i), P = Vl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          k >= P || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          k === Nn && (P & Pl) !== he
        )
          return t;
      }
      (i & ui) !== he && (i |= a & Nn);
      var j = e.entangledLanes;
      if (j !== he)
        for (var W = e.entanglements, q = i & j; q > 0; ) {
          var te = $n(q), Me = 1 << te;
          i |= W[te], q &= ~Me;
        }
      return i;
    }
    function oi(e, t) {
      for (var a = e.eventTimes, i = an; t > 0; ) {
        var o = $n(t), f = 1 << o, h = a[o];
        h > i && (i = h), t &= ~f;
      }
      return i;
    }
    function Zd(e, t) {
      switch (e) {
        case st:
        case Hl:
        case ui:
          return t + 250;
        case kr:
        case Nn:
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
        case Ts:
        case uf:
          return t + 5e3;
        case Nu:
        case of:
        case Ds:
        case sf:
        case cf:
          return an;
        case Ms:
        case Os:
        case Lu:
        case ra:
          return an;
        default:
          return v("Should have found matching lanes. This is a bug in React."), an;
      }
    }
    function pf(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, o = e.pingedLanes, f = e.expirationTimes, h = a; h > 0; ) {
        var S = $n(h), x = 1 << S, b = f[S];
        b === an ? ((x & i) === he || (x & o) !== he) && (f[S] = Zd(x, t)) : b <= t && (e.expiredLanes |= x), h &= ~x;
      }
    }
    function Sv(e) {
      return Ns(e.pendingLanes);
    }
    function hf(e) {
      var t = e.pendingLanes & ~ra;
      return t !== he ? t : t & ra ? ra : he;
    }
    function xv(e) {
      return (e & st) !== he;
    }
    function Ls(e) {
      return (e & Kd) !== he;
    }
    function Au(e) {
      return (e & ks) === e;
    }
    function Jd(e) {
      var t = st | ui | Nn;
      return (e & t) === he;
    }
    function ep(e) {
      return (e & Pl) === e;
    }
    function vf(e, t) {
      var a = Hl | ui | kr | Nn;
      return (t & a) !== he;
    }
    function Ev(e, t) {
      return (t & e.expiredLanes) !== he;
    }
    function tp(e) {
      return (e & Pl) !== he;
    }
    function np() {
      var e = zu;
      return zu <<= 1, (zu & Pl) === he && (zu = Mu), e;
    }
    function Cv() {
      var e = ff;
      return ff <<= 1, (ff & ks) === he && (ff = Nu), e;
    }
    function Vl(e) {
      return e & -e;
    }
    function zs(e) {
      return Vl(e);
    }
    function $n(e) {
      return 31 - Bn(e);
    }
    function dr(e) {
      return $n(e);
    }
    function aa(e, t) {
      return (e & t) !== he;
    }
    function Uu(e, t) {
      return (e & t) === t;
    }
    function xt(e, t) {
      return e | t;
    }
    function As(e, t) {
      return e & ~t;
    }
    function rp(e, t) {
      return e & t;
    }
    function wv(e) {
      return e;
    }
    function Rv(e, t) {
      return e !== Ft && e < t ? e : t;
    }
    function Us(e) {
      for (var t = [], a = 0; a < Du; a++)
        t.push(e);
      return t;
    }
    function Mo(e, t, a) {
      e.pendingLanes |= t, t !== Lu && (e.suspendedLanes = he, e.pingedLanes = he);
      var i = e.eventTimes, o = dr(t);
      i[o] = a;
    }
    function bv(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var o = $n(i), f = 1 << o;
        a[o] = an, i &= ~f;
      }
    }
    function mf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function ap(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = he, e.pingedLanes = he, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, o = e.eventTimes, f = e.expirationTimes, h = a; h > 0; ) {
        var S = $n(h), x = 1 << S;
        i[S] = he, o[S] = an, f[S] = an, h &= ~x;
      }
    }
    function yf(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, o = a; o; ) {
        var f = $n(o), h = 1 << f;
        // Is this one of the newly entangled lanes?
        h & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[f] & t && (i[f] |= t), o &= ~h;
      }
    }
    function ip(e, t) {
      var a = Vl(t), i;
      switch (a) {
        case ui:
          i = Hl;
          break;
        case Nn:
          i = kr;
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
        case Ts:
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
      if (na)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var o = dr(a), f = 1 << o, h = i[o];
          h.add(t), a &= ~f;
        }
    }
    function _v(e, t) {
      if (na)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var o = dr(t), f = 1 << o, h = a[o];
          h.size > 0 && (h.forEach(function(S) {
            var x = S.alternate;
            (x === null || !i.has(x)) && i.add(S);
          }), h.clear()), t &= ~f;
        }
    }
    function lp(e, t) {
      return null;
    }
    var Ur = st, Mi = ui, ja = Nn, Ha = Lu, js = Ft;
    function Pa() {
      return js;
    }
    function In(e) {
      js = e;
    }
    function Tv(e, t) {
      var a = js;
      try {
        return js = e, t();
      } finally {
        js = a;
      }
    }
    function kv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Hs(e, t) {
      return e > t ? e : t;
    }
    function ar(e, t) {
      return e !== 0 && e < t;
    }
    function Dv(e) {
      var t = Vl(e);
      return ar(Ur, t) ? ar(Mi, t) ? Ls(t) ? ja : Ha : Mi : Ur;
    }
    function gf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ps;
    function Dr(e) {
      Ps = e;
    }
    function vg(e) {
      Ps(e);
    }
    var He;
    function Oo(e) {
      He = e;
    }
    var Sf;
    function Mv(e) {
      Sf = e;
    }
    var Ov;
    function Vs(e) {
      Ov = e;
    }
    var Bs;
    function up(e) {
      Bs = e;
    }
    var xf = !1, $s = [], tl = null, Oi = null, Ni = null, Ln = /* @__PURE__ */ new Map(), Fr = /* @__PURE__ */ new Map(), jr = [], Nv = [
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
    function Lv(e) {
      return Nv.indexOf(e) > -1;
    }
    function si(e, t, a, i, o) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: o,
        targetContainers: [i]
      };
    }
    function op(e, t) {
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
          Ln.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Fr.delete(i);
          break;
        }
      }
    }
    function ia(e, t, a, i, o, f) {
      if (e === null || e.nativeEvent !== f) {
        var h = si(t, a, i, o, f);
        if (t !== null) {
          var S = Po(t);
          S !== null && He(S);
        }
        return h;
      }
      e.eventSystemFlags |= i;
      var x = e.targetContainers;
      return o !== null && x.indexOf(o) === -1 && x.push(o), e;
    }
    function mg(e, t, a, i, o) {
      switch (t) {
        case "focusin": {
          var f = o;
          return tl = ia(tl, e, t, a, i, f), !0;
        }
        case "dragenter": {
          var h = o;
          return Oi = ia(Oi, e, t, a, i, h), !0;
        }
        case "mouseover": {
          var S = o;
          return Ni = ia(Ni, e, t, a, i, S), !0;
        }
        case "pointerover": {
          var x = o, b = x.pointerId;
          return Ln.set(b, ia(Ln.get(b) || null, e, t, a, i, x)), !0;
        }
        case "gotpointercapture": {
          var k = o, P = k.pointerId;
          return Fr.set(P, ia(Fr.get(P) || null, e, t, a, i, k)), !0;
        }
      }
      return !1;
    }
    function sp(e) {
      var t = tc(e.target);
      if (t !== null) {
        var a = ma(t);
        if (a !== null) {
          var i = a.tag;
          if (i === de) {
            var o = Ti(a);
            if (o !== null) {
              e.blockedOn = o, Bs(e.priority, function() {
                Sf(a);
              });
              return;
            }
          } else if (i === O) {
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
    function zv(e) {
      for (var t = Ov(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < jr.length && ar(t, jr[i].priority); i++)
        ;
      jr.splice(i, 0, a), i === 0 && sp(a);
    }
    function Is(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Lo(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var o = e.nativeEvent, f = new o.constructor(o.type, o);
          cg(f), o.target.dispatchEvent(f), fg();
        } else {
          var h = Po(i);
          return h !== null && He(h), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function cp(e, t, a) {
      Is(e) && a.delete(t);
    }
    function yg() {
      xf = !1, tl !== null && Is(tl) && (tl = null), Oi !== null && Is(Oi) && (Oi = null), Ni !== null && Is(Ni) && (Ni = null), Ln.forEach(cp), Fr.forEach(cp);
    }
    function Bl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, xf || (xf = !0, c.unstable_scheduleCallback(c.unstable_NormalPriority, yg)));
    }
    function Fu(e) {
      if ($s.length > 0) {
        Bl($s[0], e);
        for (var t = 1; t < $s.length; t++) {
          var a = $s[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      tl !== null && Bl(tl, e), Oi !== null && Bl(Oi, e), Ni !== null && Bl(Ni, e);
      var i = function(S) {
        return Bl(S, e);
      };
      Ln.forEach(i), Fr.forEach(i);
      for (var o = 0; o < jr.length; o++) {
        var f = jr[o];
        f.blockedOn === e && (f.blockedOn = null);
      }
      for (; jr.length > 0; ) {
        var h = jr[0];
        if (h.blockedOn !== null)
          break;
        sp(h), h.blockedOn === null && jr.shift();
      }
    }
    var pr = d.ReactCurrentBatchConfig, Ot = !0;
    function Jn(e) {
      Ot = !!e;
    }
    function Yn() {
      return Ot;
    }
    function hr(e, t, a) {
      var i = Ef(t), o;
      switch (i) {
        case Ur:
          o = xa;
          break;
        case Mi:
          o = No;
          break;
        case ja:
        default:
          o = zn;
          break;
      }
      return o.bind(null, t, a, e);
    }
    function xa(e, t, a, i) {
      var o = Pa(), f = pr.transition;
      pr.transition = null;
      try {
        In(Ur), zn(e, t, a, i);
      } finally {
        In(o), pr.transition = f;
      }
    }
    function No(e, t, a, i) {
      var o = Pa(), f = pr.transition;
      pr.transition = null;
      try {
        In(Mi), zn(e, t, a, i);
      } finally {
        In(o), pr.transition = f;
      }
    }
    function zn(e, t, a, i) {
      Ot && Ys(e, t, a, i);
    }
    function Ys(e, t, a, i) {
      var o = Lo(e, t, a, i);
      if (o === null) {
        zg(e, t, i, Li, a), op(e, i);
        return;
      }
      if (mg(o, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (op(e, i), t & Na && Lv(e)) {
        for (; o !== null; ) {
          var f = Po(o);
          f !== null && vg(f);
          var h = Lo(e, t, a, i);
          if (h === null && zg(e, t, i, Li, a), h === o)
            break;
          o = h;
        }
        o !== null && i.stopPropagation();
        return;
      }
      zg(e, t, i, null, a);
    }
    var Li = null;
    function Lo(e, t, a, i) {
      Li = null;
      var o = Ud(i), f = tc(o);
      if (f !== null) {
        var h = ma(f);
        if (h === null)
          f = null;
        else {
          var S = h.tag;
          if (S === de) {
            var x = Ti(h);
            if (x !== null)
              return x;
            f = null;
          } else if (S === O) {
            var b = h.stateNode;
            if (gf(b))
              return ki(h);
            f = null;
          } else h !== f && (f = null);
        }
      }
      return Li = f, null;
    }
    function Ef(e) {
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
          return Ur;
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
          var t = Ic();
          switch (t) {
            case xs:
              return Ur;
            case Fl:
              return Mi;
            case Zi:
            case hg:
              return ja;
            case Ru:
              return Ha;
            default:
              return ja;
          }
        }
        default:
          return ja;
      }
    }
    function Ws(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function la(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function fp(e, t, a, i) {
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
    var Ea = null, Ao = null, ju = null;
    function $l(e) {
      return Ea = e, Ao = Qs(), !0;
    }
    function Cf() {
      Ea = null, Ao = null, ju = null;
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
      var S = i > 1 ? 1 - i : void 0;
      return ju = o.slice(e, S), ju;
    }
    function Qs() {
      return "value" in Ea ? Ea.value : Ea.textContent;
    }
    function Il(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Uo() {
      return !0;
    }
    function Gs() {
      return !1;
    }
    function Mr(e) {
      function t(a, i, o, f, h) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = h, this.currentTarget = null;
        for (var S in e)
          if (e.hasOwnProperty(S)) {
            var x = e[S];
            x ? this[S] = x(f) : this[S] = f[S];
          }
        var b = f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1;
        return b ? this.isDefaultPrevented = Uo : this.isDefaultPrevented = Gs, this.isPropagationStopped = Gs, this;
      }
      return Et(t.prototype, {
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
    var Wn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, zi = Mr(Wn), Hr = Et({}, Wn, {
      view: 0,
      detail: 0
    }), ua = Mr(Hr), wf, Xs, Hu;
    function gg(e) {
      e !== Hu && (Hu && e.type === "mousemove" ? (wf = e.screenX - Hu.screenX, Xs = e.screenY - Hu.screenY) : (wf = 0, Xs = 0), Hu = e);
    }
    var ci = Et({}, Hr, {
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
      getModifierState: Sn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (gg(e), wf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Xs;
      }
    }), dp = Mr(ci), pp = Et({}, ci, {
      dataTransfer: 0
    }), Pu = Mr(pp), hp = Et({}, Hr, {
      relatedTarget: 0
    }), rl = Mr(hp), Av = Et({}, Wn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Uv = Mr(Av), vp = Et({}, Wn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Rf = Mr(vp), Sg = Et({}, Wn, {
      data: 0
    }), Fv = Mr(Sg), jv = Fv, Hv = {
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
    function xg(e) {
      if (e.key) {
        var t = Hv[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Il(e);
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
    function Pv(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Fo[e];
      return i ? !!a[i] : !1;
    }
    function Sn(e) {
      return Pv;
    }
    var Eg = Et({}, Hr, {
      key: xg,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Sn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Il(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Il(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Vv = Mr(Eg), Cg = Et({}, ci, {
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
    }), Bv = Mr(Cg), $v = Et({}, Hr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Sn
    }), Iv = Mr($v), wg = Et({}, Wn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Va = Mr(wg), mp = Et({}, ci, {
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
    }), Rg = Mr(mp), Yl = [9, 13, 27, 32], qs = 229, al = _n && "CompositionEvent" in window, Wl = null;
    _n && "documentMode" in document && (Wl = document.documentMode);
    var yp = _n && "TextEvent" in window && !Wl, bf = _n && (!al || Wl && Wl > 8 && Wl <= 11), Yv = 32, _f = String.fromCharCode(Yv);
    function bg() {
      pt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), pt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), pt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), pt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var gp = !1;
    function Wv(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Tf(e) {
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
    function Sp(e, t) {
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
    function Qv(e) {
      return e.locale === "ko";
    }
    var Bu = !1;
    function xp(e, t, a, i, o) {
      var f, h;
      if (al ? f = Tf(t) : Bu ? Sp(t, i) && (f = "onCompositionEnd") : kf(t, i) && (f = "onCompositionStart"), !f)
        return null;
      bf && !Qv(i) && (!Bu && f === "onCompositionStart" ? Bu = $l(o) : f === "onCompositionEnd" && Bu && (h = nl()));
      var S = em(a, f);
      if (S.length > 0) {
        var x = new Fv(f, t, null, i, o);
        if (e.push({
          event: x,
          listeners: S
        }), h)
          x.data = h;
        else {
          var b = Df(i);
          b !== null && (x.data = b);
        }
      }
    }
    function Mf(e, t) {
      switch (e) {
        case "compositionend":
          return Df(t);
        case "keypress":
          var a = t.which;
          return a !== Yv ? null : (gp = !0, _f);
        case "textInput":
          var i = t.data;
          return i === _f && gp ? null : i;
        default:
          return null;
      }
    }
    function Ep(e, t) {
      if (Bu) {
        if (e === "compositionend" || !al && Sp(e, t)) {
          var a = nl();
          return Cf(), Bu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Wv(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return bf && !Qv(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Of(e, t, a, i, o) {
      var f;
      if (yp ? f = Mf(t, i) : f = Ep(t, i), !f)
        return null;
      var h = em(a, "onBeforeInput");
      if (h.length > 0) {
        var S = new jv("onBeforeInput", "beforeinput", null, i, o);
        e.push({
          event: S,
          listeners: h
        }), S.data = f;
      }
    }
    function Gv(e, t, a, i, o, f, h) {
      xp(e, t, a, i, o), Of(e, t, a, i, o);
    }
    var _g = {
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
      return t === "input" ? !!_g[e.type] : t === "textarea";
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
    function Tg(e) {
      if (!_n)
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
    function Xv(e, t, a, i) {
      xo(i);
      var o = em(t, "onChange");
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
    function u(e) {
      var t = [];
      Xv(t, n, e, Ud(e)), uv(s, t);
    }
    function s(e) {
      rE(e, 0);
    }
    function p(e) {
      var t = Ff(e);
      if (Ei(t))
        return e;
    }
    function m(e, t) {
      if (e === "change")
        return t;
    }
    var w = !1;
    _n && (w = Tg("input") && (!document.documentMode || document.documentMode > 9));
    function M(e, t) {
      Ql = e, n = t, Ql.attachEvent("onpropertychange", X);
    }
    function U() {
      Ql && (Ql.detachEvent("onpropertychange", X), Ql = null, n = null);
    }
    function X(e) {
      e.propertyName === "value" && p(n) && u(e);
    }
    function me(e, t, a) {
      e === "focusin" ? (U(), M(t, a)) : e === "focusout" && U();
    }
    function Ee(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return p(n);
    }
    function ve(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Ue(e, t) {
      if (e === "click")
        return p(t);
    }
    function $e(e, t) {
      if (e === "input" || e === "change")
        return p(t);
    }
    function Qe(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || nt(e, "number", e.value);
    }
    function An(e, t, a, i, o, f, h) {
      var S = a ? Ff(a) : window, x, b;
      if (r(S) ? x = m : Ks(S) ? w ? x = $e : (x = Ee, b = me) : ve(S) && (x = Ue), x) {
        var k = x(t, a);
        if (k) {
          Xv(e, k, i, o);
          return;
        }
      }
      b && b(t, S, a), t === "focusout" && Qe(S);
    }
    function B() {
      jt("onMouseEnter", ["mouseout", "mouseover"]), jt("onMouseLeave", ["mouseout", "mouseover"]), jt("onPointerEnter", ["pointerout", "pointerover"]), jt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function H(e, t, a, i, o, f, h) {
      var S = t === "mouseover" || t === "pointerover", x = t === "mouseout" || t === "pointerout";
      if (S && !hs(i)) {
        var b = i.relatedTarget || i.fromElement;
        if (b && (tc(b) || Ap(b)))
          return;
      }
      if (!(!x && !S)) {
        var k;
        if (o.window === o)
          k = o;
        else {
          var P = o.ownerDocument;
          P ? k = P.defaultView || P.parentWindow : k = window;
        }
        var j, W;
        if (x) {
          var q = i.relatedTarget || i.toElement;
          if (j = a, W = q ? tc(q) : null, W !== null) {
            var te = ma(W);
            (W !== te || W.tag !== F && W.tag !== oe) && (W = null);
          }
        } else
          j = null, W = a;
        if (j !== W) {
          var Me = dp, rt = "onMouseLeave", Ge = "onMouseEnter", Lt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Me = Bv, rt = "onPointerLeave", Ge = "onPointerEnter", Lt = "pointer");
          var kt = j == null ? k : Ff(j), $ = W == null ? k : Ff(W), ne = new Me(rt, Lt + "leave", j, i, o);
          ne.target = kt, ne.relatedTarget = $;
          var I = null, Ce = tc(o);
          if (Ce === a) {
            var je = new Me(Ge, Lt + "enter", W, i, o);
            je.target = $, je.relatedTarget = kt, I = je;
          }
          mb(e, ne, I, j, W);
        }
      }
    }
    function Y(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ye = typeof Object.is == "function" ? Object.is : Y;
    function Ie(e, t) {
      if (ye(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var o = 0; o < a.length; o++) {
        var f = a[o];
        if (!Gn.call(t, f) || !ye(e[f], t[f]))
          return !1;
      }
      return !0;
    }
    function it(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function ot(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function ft(e, t) {
      for (var a = it(e), i = 0, o = 0; a; ) {
        if (a.nodeType === Qi) {
          if (o = i + a.textContent.length, i <= t && o >= t)
            return {
              node: a,
              offset: t - i
            };
          i = o;
        }
        a = it(ot(a));
      }
    }
    function ir(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var o = i.anchorNode, f = i.anchorOffset, h = i.focusNode, S = i.focusOffset;
      try {
        o.nodeType, h.nodeType;
      } catch {
        return null;
      }
      return $t(e, o, f, h, S);
    }
    function $t(e, t, a, i, o) {
      var f = 0, h = -1, S = -1, x = 0, b = 0, k = e, P = null;
      e: for (; ; ) {
        for (var j = null; k === t && (a === 0 || k.nodeType === Qi) && (h = f + a), k === i && (o === 0 || k.nodeType === Qi) && (S = f + o), k.nodeType === Qi && (f += k.nodeValue.length), (j = k.firstChild) !== null; )
          P = k, k = j;
        for (; ; ) {
          if (k === e)
            break e;
          if (P === t && ++x === a && (h = f), P === i && ++b === o && (S = f), (j = k.nextSibling) !== null)
            break;
          k = P, P = k.parentNode;
        }
        k = j;
      }
      return h === -1 || S === -1 ? null : {
        start: h,
        end: S
      };
    }
    function Gl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var o = i.getSelection(), f = e.textContent.length, h = Math.min(t.start, f), S = t.end === void 0 ? h : Math.min(t.end, f);
        if (!o.extend && h > S) {
          var x = S;
          S = h, h = x;
        }
        var b = ft(e, h), k = ft(e, S);
        if (b && k) {
          if (o.rangeCount === 1 && o.anchorNode === b.node && o.anchorOffset === b.offset && o.focusNode === k.node && o.focusOffset === k.offset)
            return;
          var P = a.createRange();
          P.setStart(b.node, b.offset), o.removeAllRanges(), h > S ? (o.addRange(P), o.extend(k.node, k.offset)) : (P.setEnd(k.node, k.offset), o.addRange(P));
        }
      }
    }
    function qv(e) {
      return e && e.nodeType === Qi;
    }
    function Wx(e, t) {
      return !e || !t ? !1 : e === t ? !0 : qv(e) ? !1 : qv(t) ? Wx(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function ZR(e) {
      return e && e.ownerDocument && Wx(e.ownerDocument.documentElement, e);
    }
    function JR(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function Qx() {
      for (var e = window, t = Oa(); t instanceof e.HTMLIFrameElement; ) {
        if (JR(t))
          e = t.contentWindow;
        else
          return t;
        t = Oa(e.document);
      }
      return t;
    }
    function kg(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function eb() {
      var e = Qx();
      return {
        focusedElem: e,
        selectionRange: kg(e) ? nb(e) : null
      };
    }
    function tb(e) {
      var t = Qx(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && ZR(a)) {
        i !== null && kg(a) && rb(a, i);
        for (var o = [], f = a; f = f.parentNode; )
          f.nodeType === Kr && o.push({
            element: f,
            left: f.scrollLeft,
            top: f.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var h = 0; h < o.length; h++) {
          var S = o[h];
          S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
        }
      }
    }
    function nb(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = ir(e), t || {
        start: 0,
        end: 0
      };
    }
    function rb(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Gl(e, t);
    }
    var ab = _n && "documentMode" in document && document.documentMode <= 11;
    function ib() {
      pt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Nf = null, Dg = null, Cp = null, Mg = !1;
    function lb(e) {
      if ("selectionStart" in e && kg(e))
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
    function ub(e) {
      return e.window === e ? e.document : e.nodeType === Gi ? e : e.ownerDocument;
    }
    function Gx(e, t, a) {
      var i = ub(a);
      if (!(Mg || Nf == null || Nf !== Oa(i))) {
        var o = lb(Nf);
        if (!Cp || !Ie(Cp, o)) {
          Cp = o;
          var f = em(Dg, "onSelect");
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
    function ob(e, t, a, i, o, f, h) {
      var S = a ? Ff(a) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (Ks(S) || S.contentEditable === "true") && (Nf = S, Dg = a, Cp = null);
          break;
        case "focusout":
          Nf = null, Dg = null, Cp = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          Mg = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Mg = !1, Gx(e, i, o);
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
          if (ab)
            break;
        // falls through
        case "keydown":
        case "keyup":
          Gx(e, i, o);
      }
    }
    function Kv(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Lf = {
      animationend: Kv("Animation", "AnimationEnd"),
      animationiteration: Kv("Animation", "AnimationIteration"),
      animationstart: Kv("Animation", "AnimationStart"),
      transitionend: Kv("Transition", "TransitionEnd")
    }, Og = {}, Xx = {};
    _n && (Xx = document.createElement("div").style, "AnimationEvent" in window || (delete Lf.animationend.animation, delete Lf.animationiteration.animation, delete Lf.animationstart.animation), "TransitionEvent" in window || delete Lf.transitionend.transition);
    function Zv(e) {
      if (Og[e])
        return Og[e];
      if (!Lf[e])
        return e;
      var t = Lf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in Xx)
          return Og[e] = t[a];
      return e;
    }
    var qx = Zv("animationend"), Kx = Zv("animationiteration"), Zx = Zv("animationstart"), Jx = Zv("transitionend"), eE = /* @__PURE__ */ new Map(), tE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function jo(e, t) {
      eE.set(e, t), pt(t, [e]);
    }
    function sb() {
      for (var e = 0; e < tE.length; e++) {
        var t = tE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        jo(a, "on" + i);
      }
      jo(qx, "onAnimationEnd"), jo(Kx, "onAnimationIteration"), jo(Zx, "onAnimationStart"), jo("dblclick", "onDoubleClick"), jo("focusin", "onFocus"), jo("focusout", "onBlur"), jo(Jx, "onTransitionEnd");
    }
    function cb(e, t, a, i, o, f, h) {
      var S = eE.get(t);
      if (S !== void 0) {
        var x = zi, b = t;
        switch (t) {
          case "keypress":
            if (Il(i) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            x = Vv;
            break;
          case "focusin":
            b = "focus", x = rl;
            break;
          case "focusout":
            b = "blur", x = rl;
            break;
          case "beforeblur":
          case "afterblur":
            x = rl;
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
            x = dp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Pu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = Iv;
            break;
          case qx:
          case Kx:
          case Zx:
            x = Uv;
            break;
          case Jx:
            x = Va;
            break;
          case "scroll":
            x = ua;
            break;
          case "wheel":
            x = Rg;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Rf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Bv;
            break;
        }
        var k = (f & Na) !== 0;
        {
          var P = !k && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", j = hb(a, S, i.type, k, P);
          if (j.length > 0) {
            var W = new x(S, b, null, i, o);
            e.push({
              event: W,
              listeners: j
            });
          }
        }
      }
    }
    sb(), B(), Zs(), ib(), bg();
    function fb(e, t, a, i, o, f, h) {
      cb(e, t, a, i, o, f);
      var S = (f & Ad) === 0;
      S && (H(e, t, a, i, o), An(e, t, a, i, o), ob(e, t, a, i, o), Gv(e, t, a, i, o));
    }
    var wp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Ng = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(wp));
    function nE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Ri(i, t, void 0, e), e.currentTarget = null;
    }
    function db(e, t, a) {
      var i;
      if (a)
        for (var o = t.length - 1; o >= 0; o--) {
          var f = t[o], h = f.instance, S = f.currentTarget, x = f.listener;
          if (h !== i && e.isPropagationStopped())
            return;
          nE(e, x, S), i = h;
        }
      else
        for (var b = 0; b < t.length; b++) {
          var k = t[b], P = k.instance, j = k.currentTarget, W = k.listener;
          if (P !== i && e.isPropagationStopped())
            return;
          nE(e, W, j), i = P;
        }
    }
    function rE(e, t) {
      for (var a = (t & Na) !== 0, i = 0; i < e.length; i++) {
        var o = e[i], f = o.event, h = o.listeners;
        db(f, h, a);
      }
      ys();
    }
    function pb(e, t, a, i, o) {
      var f = Ud(a), h = [];
      fb(h, e, i, a, f, t), rE(h, t);
    }
    function bn(e, t) {
      Ng.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = $_(t), o = yb(e);
      i.has(o) || (aE(t, e, Oc, a), i.add(o));
    }
    function Lg(e, t, a) {
      Ng.has(e) && !t && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Na), aE(a, e, i, t);
    }
    var Jv = "_reactListening" + Math.random().toString(36).slice(2);
    function Rp(e) {
      if (!e[Jv]) {
        e[Jv] = !0, at.forEach(function(a) {
          a !== "selectionchange" && (Ng.has(a) || Lg(a, !1, e), Lg(a, !0, e));
        });
        var t = e.nodeType === Gi ? e : e.ownerDocument;
        t !== null && (t[Jv] || (t[Jv] = !0, Lg("selectionchange", !1, t)));
      }
    }
    function aE(e, t, a, i, o) {
      var f = hr(e, t, a), h = void 0;
      ms && (t === "touchstart" || t === "touchmove" || t === "wheel") && (h = !0), e = e, i ? h !== void 0 ? fp(e, t, f, h) : la(e, t, f) : h !== void 0 ? zo(e, t, f, h) : Ws(e, t, f);
    }
    function iE(e, t) {
      return e === t || e.nodeType === Hn && e.parentNode === t;
    }
    function zg(e, t, a, i, o) {
      var f = i;
      if ((t & zd) === 0 && (t & Oc) === 0) {
        var h = o;
        if (i !== null) {
          var S = i;
          e: for (; ; ) {
            if (S === null)
              return;
            var x = S.tag;
            if (x === O || x === z) {
              var b = S.stateNode.containerInfo;
              if (iE(b, h))
                break;
              if (x === z)
                for (var k = S.return; k !== null; ) {
                  var P = k.tag;
                  if (P === O || P === z) {
                    var j = k.stateNode.containerInfo;
                    if (iE(j, h))
                      return;
                  }
                  k = k.return;
                }
              for (; b !== null; ) {
                var W = tc(b);
                if (W === null)
                  return;
                var q = W.tag;
                if (q === F || q === oe) {
                  S = f = W;
                  continue e;
                }
                b = b.parentNode;
              }
            }
            S = S.return;
          }
        }
      }
      uv(function() {
        return pb(e, t, a, f);
      });
    }
    function bp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function hb(e, t, a, i, o, f) {
      for (var h = t !== null ? t + "Capture" : null, S = i ? h : t, x = [], b = e, k = null; b !== null; ) {
        var P = b, j = P.stateNode, W = P.tag;
        if (W === F && j !== null && (k = j, S !== null)) {
          var q = Ol(b, S);
          q != null && x.push(bp(b, q, k));
        }
        if (o)
          break;
        b = b.return;
      }
      return x;
    }
    function em(e, t) {
      for (var a = t + "Capture", i = [], o = e; o !== null; ) {
        var f = o, h = f.stateNode, S = f.tag;
        if (S === F && h !== null) {
          var x = h, b = Ol(o, a);
          b != null && i.unshift(bp(o, b, x));
          var k = Ol(o, t);
          k != null && i.push(bp(o, k, x));
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
      while (e && e.tag !== F);
      return e || null;
    }
    function vb(e, t) {
      for (var a = e, i = t, o = 0, f = a; f; f = zf(f))
        o++;
      for (var h = 0, S = i; S; S = zf(S))
        h++;
      for (; o - h > 0; )
        a = zf(a), o--;
      for (; h - o > 0; )
        i = zf(i), h--;
      for (var x = o; x--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = zf(a), i = zf(i);
      }
      return null;
    }
    function lE(e, t, a, i, o) {
      for (var f = t._reactName, h = [], S = a; S !== null && S !== i; ) {
        var x = S, b = x.alternate, k = x.stateNode, P = x.tag;
        if (b !== null && b === i)
          break;
        if (P === F && k !== null) {
          var j = k;
          if (o) {
            var W = Ol(S, f);
            W != null && h.unshift(bp(S, W, j));
          } else if (!o) {
            var q = Ol(S, f);
            q != null && h.push(bp(S, q, j));
          }
        }
        S = S.return;
      }
      h.length !== 0 && e.push({
        event: t,
        listeners: h
      });
    }
    function mb(e, t, a, i, o) {
      var f = i && o ? vb(i, o) : null;
      i !== null && lE(e, t, i, f, !1), o !== null && a !== null && lE(e, a, o, f, !0);
    }
    function yb(e, t) {
      return e + "__bubble";
    }
    var Ba = !1, _p = "dangerouslySetInnerHTML", tm = "suppressContentEditableWarning", Ho = "suppressHydrationWarning", uE = "autoFocus", Js = "children", ec = "style", nm = "__html", Ag, rm, Tp, oE, am, sE, cE;
    Ag = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, rm = function(e, t) {
      Od(e, t), Dc(e, t), av(e, t, {
        registrationNameDependencies: qe,
        possibleRegistrationNames: tt
      });
    }, sE = _n && !document.documentMode, Tp = function(e, t, a) {
      if (!Ba) {
        var i = im(a), o = im(t);
        o !== i && (Ba = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(o), JSON.stringify(i)));
      }
    }, oE = function(e) {
      if (!Ba) {
        Ba = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), v("Extra attributes from the server: %s", t);
      }
    }, am = function(e, t) {
      t === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, cE = function(e, t) {
      var a = e.namespaceURI === Wi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var gb = /\r\n?/g, Sb = /\u0000|\uFFFD/g;
    function im(e) {
      rn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(gb, `
`).replace(Sb, "");
    }
    function lm(e, t, a, i) {
      var o = im(t), f = im(e);
      if (f !== o && (i && (Ba || (Ba = !0, v('Text content did not match. Server: "%s" Client: "%s"', f, o))), a && re))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function fE(e) {
      return e.nodeType === Gi ? e : e.ownerDocument;
    }
    function xb() {
    }
    function um(e) {
      e.onclick = xb;
    }
    function Eb(e, t, a, i, o) {
      for (var f in i)
        if (i.hasOwnProperty(f)) {
          var h = i[f];
          if (f === ec)
            h && Object.freeze(h), Zh(t, h);
          else if (f === _p) {
            var S = h ? h[nm] : void 0;
            S != null && Ph(t, S);
          } else if (f === Js)
            if (typeof h == "string") {
              var x = e !== "textarea" || h !== "";
              x && mo(t, h);
            } else typeof h == "number" && mo(t, "" + h);
          else f === tm || f === Ho || f === uE || (qe.hasOwnProperty(f) ? h != null && (typeof h != "function" && am(f, h), f === "onScroll" && bn("scroll", t)) : h != null && Or(t, f, h, o));
        }
    }
    function Cb(e, t, a, i) {
      for (var o = 0; o < t.length; o += 2) {
        var f = t[o], h = t[o + 1];
        f === ec ? Zh(e, h) : f === _p ? Ph(e, h) : f === Js ? mo(e, h) : Or(e, f, h, i);
      }
    }
    function wb(e, t, a, i) {
      var o, f = fE(a), h, S = i;
      if (S === Wi && (S = Rd(e)), S === Wi) {
        if (o = Dl(e, t), !o && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var x = f.createElement("div");
          x.innerHTML = "<script><\/script>";
          var b = x.firstChild;
          h = x.removeChild(b);
        } else if (typeof t.is == "string")
          h = f.createElement(e, {
            is: t.is
          });
        else if (h = f.createElement(e), e === "select") {
          var k = h;
          t.multiple ? k.multiple = !0 : t.size && (k.size = t.size);
        }
      } else
        h = f.createElementNS(S, e);
      return S === Wi && !o && Object.prototype.toString.call(h) === "[object HTMLUnknownElement]" && !Gn.call(Ag, e) && (Ag[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), h;
    }
    function Rb(e, t) {
      return fE(t).createTextNode(e);
    }
    function bb(e, t, a, i) {
      var o = Dl(t, a);
      rm(t, a);
      var f;
      switch (t) {
        case "dialog":
          bn("cancel", e), bn("close", e), f = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          bn("load", e), f = a;
          break;
        case "video":
        case "audio":
          for (var h = 0; h < wp.length; h++)
            bn(wp[h], e);
          f = a;
          break;
        case "source":
          bn("error", e), f = a;
          break;
        case "img":
        case "image":
        case "link":
          bn("error", e), bn("load", e), f = a;
          break;
        case "details":
          bn("toggle", e), f = a;
          break;
        case "input":
          ai(e, a), f = vo(e, a), bn("invalid", e);
          break;
        case "option":
          At(e, a), f = a;
          break;
        case "select":
          mu(e, a), f = us(e, a), bn("invalid", e);
          break;
        case "textarea":
          Ed(e, a), f = xd(e, a), bn("invalid", e);
          break;
        default:
          f = a;
      }
      switch (Tc(t, f), Eb(t, e, i, f, o), t) {
        case "input":
          ri(e), Q(e, a, !1);
          break;
        case "textarea":
          ri(e), jh(e);
          break;
        case "option":
          cn(e, a);
          break;
        case "select":
          gd(e, a);
          break;
        default:
          typeof f.onClick == "function" && um(e);
          break;
      }
    }
    function _b(e, t, a, i, o) {
      rm(t, i);
      var f = null, h, S;
      switch (t) {
        case "input":
          h = vo(e, a), S = vo(e, i), f = [];
          break;
        case "select":
          h = us(e, a), S = us(e, i), f = [];
          break;
        case "textarea":
          h = xd(e, a), S = xd(e, i), f = [];
          break;
        default:
          h = a, S = i, typeof h.onClick != "function" && typeof S.onClick == "function" && um(e);
          break;
      }
      Tc(t, S);
      var x, b, k = null;
      for (x in h)
        if (!(S.hasOwnProperty(x) || !h.hasOwnProperty(x) || h[x] == null))
          if (x === ec) {
            var P = h[x];
            for (b in P)
              P.hasOwnProperty(b) && (k || (k = {}), k[b] = "");
          } else x === _p || x === Js || x === tm || x === Ho || x === uE || (qe.hasOwnProperty(x) ? f || (f = []) : (f = f || []).push(x, null));
      for (x in S) {
        var j = S[x], W = h != null ? h[x] : void 0;
        if (!(!S.hasOwnProperty(x) || j === W || j == null && W == null))
          if (x === ec)
            if (j && Object.freeze(j), W) {
              for (b in W)
                W.hasOwnProperty(b) && (!j || !j.hasOwnProperty(b)) && (k || (k = {}), k[b] = "");
              for (b in j)
                j.hasOwnProperty(b) && W[b] !== j[b] && (k || (k = {}), k[b] = j[b]);
            } else
              k || (f || (f = []), f.push(x, k)), k = j;
          else if (x === _p) {
            var q = j ? j[nm] : void 0, te = W ? W[nm] : void 0;
            q != null && te !== q && (f = f || []).push(x, q);
          } else x === Js ? (typeof j == "string" || typeof j == "number") && (f = f || []).push(x, "" + j) : x === tm || x === Ho || (qe.hasOwnProperty(x) ? (j != null && (typeof j != "function" && am(x, j), x === "onScroll" && bn("scroll", e)), !f && W !== j && (f = [])) : (f = f || []).push(x, j));
      }
      return k && (og(k, S[ec]), (f = f || []).push(ec, k)), f;
    }
    function Tb(e, t, a, i, o) {
      a === "input" && o.type === "radio" && o.name != null && E(e, o);
      var f = Dl(a, i), h = Dl(a, o);
      switch (Cb(e, t, f, h), a) {
        case "input":
          N(e, o);
          break;
        case "textarea":
          Fh(e, o);
          break;
        case "select":
          Rc(e, o);
          break;
      }
    }
    function kb(e) {
      {
        var t = e.toLowerCase();
        return ds.hasOwnProperty(t) && ds[t] || null;
      }
    }
    function Db(e, t, a, i, o, f, h) {
      var S, x;
      switch (S = Dl(t, a), rm(t, a), t) {
        case "dialog":
          bn("cancel", e), bn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          bn("load", e);
          break;
        case "video":
        case "audio":
          for (var b = 0; b < wp.length; b++)
            bn(wp[b], e);
          break;
        case "source":
          bn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          bn("error", e), bn("load", e);
          break;
        case "details":
          bn("toggle", e);
          break;
        case "input":
          ai(e, a), bn("invalid", e);
          break;
        case "option":
          At(e, a);
          break;
        case "select":
          mu(e, a), bn("invalid", e);
          break;
        case "textarea":
          Ed(e, a), bn("invalid", e);
          break;
      }
      Tc(t, a);
      {
        x = /* @__PURE__ */ new Set();
        for (var k = e.attributes, P = 0; P < k.length; P++) {
          var j = k[P].name.toLowerCase();
          switch (j) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              x.add(k[P].name);
          }
        }
      }
      var W = null;
      for (var q in a)
        if (a.hasOwnProperty(q)) {
          var te = a[q];
          if (q === Js)
            typeof te == "string" ? e.textContent !== te && (a[Ho] !== !0 && lm(e.textContent, te, f, h), W = [Js, te]) : typeof te == "number" && e.textContent !== "" + te && (a[Ho] !== !0 && lm(e.textContent, te, f, h), W = [Js, "" + te]);
          else if (qe.hasOwnProperty(q))
            te != null && (typeof te != "function" && am(q, te), q === "onScroll" && bn("scroll", e));
          else if (h && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof S == "boolean") {
            var Me = void 0, rt = on(q);
            if (a[Ho] !== !0) {
              if (!(q === tm || q === Ho || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              q === "value" || q === "checked" || q === "selected")) {
                if (q === _p) {
                  var Ge = e.innerHTML, Lt = te ? te[nm] : void 0;
                  if (Lt != null) {
                    var kt = cE(e, Lt);
                    kt !== Ge && Tp(q, Ge, kt);
                  }
                } else if (q === ec) {
                  if (x.delete(q), sE) {
                    var $ = lg(te);
                    Me = e.getAttribute("style"), $ !== Me && Tp(q, Me, $);
                  }
                } else if (S && !A)
                  x.delete(q.toLowerCase()), Me = su(e, q, te), te !== Me && Tp(q, Me, te);
                else if (!xn(q, rt, S) && !tr(q, te, rt, S)) {
                  var ne = !1;
                  if (rt !== null)
                    x.delete(rt.attributeName), Me = xl(e, q, te, rt);
                  else {
                    var I = i;
                    if (I === Wi && (I = Rd(t)), I === Wi)
                      x.delete(q.toLowerCase());
                    else {
                      var Ce = kb(q);
                      Ce !== null && Ce !== q && (ne = !0, x.delete(Ce)), x.delete(q);
                    }
                    Me = su(e, q, te);
                  }
                  var je = A;
                  !je && te !== Me && !ne && Tp(q, Me, te);
                }
              }
            }
          }
        }
      switch (h && // $FlowFixMe - Should be inferred as not undefined.
      x.size > 0 && a[Ho] !== !0 && oE(x), t) {
        case "input":
          ri(e), Q(e, a, !0);
          break;
        case "textarea":
          ri(e), jh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && um(e);
          break;
      }
      return W;
    }
    function Mb(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Ug(e, t) {
      {
        if (Ba)
          return;
        Ba = !0, v("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Fg(e, t) {
      {
        if (Ba)
          return;
        Ba = !0, v('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function jg(e, t, a) {
      {
        if (Ba)
          return;
        Ba = !0, v("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Hg(e, t) {
      {
        if (t === "" || Ba)
          return;
        Ba = !0, v('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function Ob(e, t, a) {
      switch (t) {
        case "input":
          Z(e, a);
          return;
        case "textarea":
          ng(e, a);
          return;
        case "select":
          Sd(e, a);
          return;
      }
    }
    var kp = function() {
    }, Dp = function() {
    };
    {
      var Nb = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], dE = [
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
      ], Lb = dE.concat(["button"]), zb = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], pE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Dp = function(e, t) {
        var a = Et({}, e || pE), i = {
          tag: t
        };
        return dE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), Lb.indexOf(t) !== -1 && (a.pTagInButtonScope = null), Nb.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var Ab = function(e, t) {
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
            return zb.indexOf(t) === -1;
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
      }, Ub = function(e, t) {
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
      }, hE = {};
      kp = function(e, t, a) {
        a = a || pE;
        var i = a.current, o = i && i.tag;
        t != null && (e != null && v("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var f = Ab(e, o) ? null : i, h = f ? null : Ub(e, a), S = f || h;
        if (S) {
          var x = S.tag, b = !!f + "|" + e + "|" + x;
          if (!hE[b]) {
            hE[b] = !0;
            var k = e, P = "";
            if (e === "#text" ? /\S/.test(t) ? k = "Text nodes" : (k = "Whitespace text nodes", P = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : k = "<" + e + ">", f) {
              var j = "";
              x === "table" && e === "tr" && (j += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), v("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", k, x, P, j);
            } else
              v("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", k, x);
          }
        }
      };
    }
    var om = "suppressHydrationWarning", sm = "$", cm = "/$", Mp = "$?", Op = "$!", Fb = "style", Pg = null, Vg = null;
    function jb(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Gi:
        case _d: {
          t = i === Gi ? "#document" : "#fragment";
          var o = e.documentElement;
          a = o ? o.namespaceURI : bd(null, "");
          break;
        }
        default: {
          var f = i === Hn ? e.parentNode : e, h = f.namespaceURI || null;
          t = f.tagName, a = bd(h, t);
          break;
        }
      }
      {
        var S = t.toLowerCase(), x = Dp(null, S);
        return {
          namespace: a,
          ancestorInfo: x
        };
      }
    }
    function Hb(e, t, a) {
      {
        var i = e, o = bd(i.namespace, t), f = Dp(i.ancestorInfo, t);
        return {
          namespace: o,
          ancestorInfo: f
        };
      }
    }
    function Xz(e) {
      return e;
    }
    function Pb(e) {
      Pg = Yn(), Vg = eb();
      var t = null;
      return Jn(!1), t;
    }
    function Vb(e) {
      tb(Vg), Jn(Pg), Pg = null, Vg = null;
    }
    function Bb(e, t, a, i, o) {
      var f;
      {
        var h = i;
        if (kp(e, null, h.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var S = "" + t.children, x = Dp(h.ancestorInfo, e);
          kp(null, S, x);
        }
        f = h.namespace;
      }
      var b = wb(e, t, a, f);
      return zp(o, b), Xg(b, t), b;
    }
    function $b(e, t) {
      e.appendChild(t);
    }
    function Ib(e, t, a, i, o) {
      switch (bb(e, t, a, i), t) {
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
    function Yb(e, t, a, i, o, f) {
      {
        var h = f;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var S = "" + i.children, x = Dp(h.ancestorInfo, t);
          kp(null, S, x);
        }
      }
      return _b(e, t, a, i);
    }
    function Bg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function Wb(e, t, a, i) {
      {
        var o = a;
        kp(null, e, o.ancestorInfo);
      }
      var f = Rb(e, t);
      return zp(i, f), f;
    }
    function Qb() {
      var e = window.event;
      return e === void 0 ? ja : Ef(e.type);
    }
    var $g = typeof setTimeout == "function" ? setTimeout : void 0, Gb = typeof clearTimeout == "function" ? clearTimeout : void 0, Ig = -1, vE = typeof Promise == "function" ? Promise : void 0, Xb = typeof queueMicrotask == "function" ? queueMicrotask : typeof vE < "u" ? function(e) {
      return vE.resolve(null).then(e).catch(qb);
    } : $g;
    function qb(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Kb(e, t, a, i) {
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
    function Zb(e, t, a, i, o, f) {
      Tb(e, t, a, i, o), Xg(e, o);
    }
    function mE(e) {
      mo(e, "");
    }
    function Jb(e, t, a) {
      e.nodeValue = a;
    }
    function e_(e, t) {
      e.appendChild(t);
    }
    function t_(e, t) {
      var a;
      e.nodeType === Hn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && um(a);
    }
    function n_(e, t, a) {
      e.insertBefore(t, a);
    }
    function r_(e, t, a) {
      e.nodeType === Hn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function a_(e, t) {
      e.removeChild(t);
    }
    function i_(e, t) {
      e.nodeType === Hn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Yg(e, t) {
      var a = t, i = 0;
      do {
        var o = a.nextSibling;
        if (e.removeChild(a), o && o.nodeType === Hn) {
          var f = o.data;
          if (f === cm)
            if (i === 0) {
              e.removeChild(o), Fu(t);
              return;
            } else
              i--;
          else (f === sm || f === Mp || f === Op) && i++;
        }
        a = o;
      } while (a);
      Fu(t);
    }
    function l_(e, t) {
      e.nodeType === Hn ? Yg(e.parentNode, t) : e.nodeType === Kr && Yg(e, t), Fu(e);
    }
    function u_(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function o_(e) {
      e.nodeValue = "";
    }
    function s_(e, t) {
      e = e;
      var a = t[Fb], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = _c("display", i);
    }
    function c_(e, t) {
      e.nodeValue = t;
    }
    function f_(e) {
      e.nodeType === Kr ? e.textContent = "" : e.nodeType === Gi && e.documentElement && e.removeChild(e.documentElement);
    }
    function d_(e, t, a) {
      return e.nodeType !== Kr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function p_(e, t) {
      return t === "" || e.nodeType !== Qi ? null : e;
    }
    function h_(e) {
      return e.nodeType !== Hn ? null : e;
    }
    function yE(e) {
      return e.data === Mp;
    }
    function Wg(e) {
      return e.data === Op;
    }
    function v_(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, o;
      return t && (a = t.dgst, i = t.msg, o = t.stck), {
        message: i,
        digest: a,
        stack: o
      };
    }
    function m_(e, t) {
      e._reactRetry = t;
    }
    function fm(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Kr || t === Qi)
          break;
        if (t === Hn) {
          var a = e.data;
          if (a === sm || a === Op || a === Mp)
            break;
          if (a === cm)
            return null;
        }
      }
      return e;
    }
    function Np(e) {
      return fm(e.nextSibling);
    }
    function y_(e) {
      return fm(e.firstChild);
    }
    function g_(e) {
      return fm(e.firstChild);
    }
    function S_(e) {
      return fm(e.nextSibling);
    }
    function x_(e, t, a, i, o, f, h) {
      zp(f, e), Xg(e, a);
      var S;
      {
        var x = o;
        S = x.namespace;
      }
      var b = (f.mode & Rt) !== Je;
      return Db(e, t, a, S, i, b, h);
    }
    function E_(e, t, a, i) {
      return zp(a, e), a.mode & Rt, Mb(e, t);
    }
    function C_(e, t) {
      zp(t, e);
    }
    function w_(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Hn) {
          var i = t.data;
          if (i === cm) {
            if (a === 0)
              return Np(t);
            a--;
          } else (i === sm || i === Op || i === Mp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function gE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Hn) {
          var i = t.data;
          if (i === sm || i === Op || i === Mp) {
            if (a === 0)
              return t;
            a--;
          } else i === cm && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function R_(e) {
      Fu(e);
    }
    function b_(e) {
      Fu(e);
    }
    function __(e) {
      return e !== "head" && e !== "body";
    }
    function T_(e, t, a, i) {
      var o = !0;
      lm(t.nodeValue, a, i, o);
    }
    function k_(e, t, a, i, o, f) {
      if (t[om] !== !0) {
        var h = !0;
        lm(i.nodeValue, o, f, h);
      }
    }
    function D_(e, t) {
      t.nodeType === Kr ? Ug(e, t) : t.nodeType === Hn || Fg(e, t);
    }
    function M_(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Kr ? Ug(a, t) : t.nodeType === Hn || Fg(a, t));
      }
    }
    function O_(e, t, a, i, o) {
      (o || t[om] !== !0) && (i.nodeType === Kr ? Ug(a, i) : i.nodeType === Hn || Fg(a, i));
    }
    function N_(e, t, a) {
      jg(e, t);
    }
    function L_(e, t) {
      Hg(e, t);
    }
    function z_(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && jg(i, t);
      }
    }
    function A_(e, t) {
      {
        var a = e.parentNode;
        a !== null && Hg(a, t);
      }
    }
    function U_(e, t, a, i, o, f) {
      (f || t[om] !== !0) && jg(a, i);
    }
    function F_(e, t, a, i, o) {
      (o || t[om] !== !0) && Hg(a, i);
    }
    function j_(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function H_(e) {
      Rp(e);
    }
    var Af = Math.random().toString(36).slice(2), Uf = "__reactFiber$" + Af, Qg = "__reactProps$" + Af, Lp = "__reactContainer$" + Af, Gg = "__reactEvents$" + Af, P_ = "__reactListeners$" + Af, V_ = "__reactHandles$" + Af;
    function B_(e) {
      delete e[Uf], delete e[Qg], delete e[Gg], delete e[P_], delete e[V_];
    }
    function zp(e, t) {
      t[Uf] = e;
    }
    function dm(e, t) {
      t[Lp] = e;
    }
    function SE(e) {
      e[Lp] = null;
    }
    function Ap(e) {
      return !!e[Lp];
    }
    function tc(e) {
      var t = e[Uf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Lp] || a[Uf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var o = gE(e); o !== null; ) {
              var f = o[Uf];
              if (f)
                return f;
              o = gE(o);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Po(e) {
      var t = e[Uf] || e[Lp];
      return t && (t.tag === F || t.tag === oe || t.tag === de || t.tag === O) ? t : null;
    }
    function Ff(e) {
      if (e.tag === F || e.tag === oe)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function pm(e) {
      return e[Qg] || null;
    }
    function Xg(e, t) {
      e[Qg] = t;
    }
    function $_(e) {
      var t = e[Gg];
      return t === void 0 && (t = e[Gg] = /* @__PURE__ */ new Set()), t;
    }
    var xE = {}, EE = d.ReactDebugCurrentFrame;
    function hm(e) {
      if (e) {
        var t = e._owner, a = $i(e.type, e._source, t ? t.type : null);
        EE.setExtraStackFrame(a);
      } else
        EE.setExtraStackFrame(null);
    }
    function il(e, t, a, i, o) {
      {
        var f = Function.call.bind(Gn);
        for (var h in e)
          if (f(e, h)) {
            var S = void 0;
            try {
              if (typeof e[h] != "function") {
                var x = Error((i || "React class") + ": " + a + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw x.name = "Invariant Violation", x;
              }
              S = e[h](t, h, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (b) {
              S = b;
            }
            S && !(S instanceof Error) && (hm(o), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, h, typeof S), hm(null)), S instanceof Error && !(S.message in xE) && (xE[S.message] = !0, hm(o), v("Failed %s type: %s", a, S.message), hm(null));
          }
      }
    }
    var qg = [], vm;
    vm = [];
    var $u = -1;
    function Vo(e) {
      return {
        current: e
      };
    }
    function oa(e, t) {
      if ($u < 0) {
        v("Unexpected pop.");
        return;
      }
      t !== vm[$u] && v("Unexpected Fiber popped."), e.current = qg[$u], qg[$u] = null, vm[$u] = null, $u--;
    }
    function sa(e, t, a) {
      $u++, qg[$u] = e.current, vm[$u] = a, e.current = t;
    }
    var Kg;
    Kg = {};
    var fi = {};
    Object.freeze(fi);
    var Iu = Vo(fi), Xl = Vo(!1), Zg = fi;
    function jf(e, t, a) {
      return a && ql(t) ? Zg : Iu.current;
    }
    function CE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Hf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return fi;
        var o = e.stateNode;
        if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
          return o.__reactInternalMemoizedMaskedChildContext;
        var f = {};
        for (var h in i)
          f[h] = t[h];
        {
          var S = dt(e) || "Unknown";
          il(i, f, "context", S);
        }
        return o && CE(e, t, f), f;
      }
    }
    function mm() {
      return Xl.current;
    }
    function ql(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function ym(e) {
      oa(Xl, e), oa(Iu, e);
    }
    function Jg(e) {
      oa(Xl, e), oa(Iu, e);
    }
    function wE(e, t, a) {
      {
        if (Iu.current !== fi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        sa(Iu, t, e), sa(Xl, a, e);
      }
    }
    function RE(e, t, a) {
      {
        var i = e.stateNode, o = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var f = dt(e) || "Unknown";
            Kg[f] || (Kg[f] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", f, f));
          }
          return a;
        }
        var h = i.getChildContext();
        for (var S in h)
          if (!(S in o))
            throw new Error((dt(e) || "Unknown") + '.getChildContext(): key "' + S + '" is not defined in childContextTypes.');
        {
          var x = dt(e) || "Unknown";
          il(o, h, "child context", x);
        }
        return Et({}, a, h);
      }
    }
    function gm(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || fi;
        return Zg = Iu.current, sa(Iu, a, e), sa(Xl, Xl.current, e), !0;
      }
    }
    function bE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var o = RE(e, t, Zg);
          i.__reactInternalMemoizedMergedChildContext = o, oa(Xl, e), oa(Iu, e), sa(Iu, o, e), sa(Xl, a, e);
        } else
          oa(Xl, e), sa(Xl, a, e);
      }
    }
    function I_(e) {
      {
        if (!wu(e) || e.tag !== R)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case O:
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
    var Bo = 0, Sm = 1, Yu = null, e0 = !1, t0 = !1;
    function _E(e) {
      Yu === null ? Yu = [e] : Yu.push(e);
    }
    function Y_(e) {
      e0 = !0, _E(e);
    }
    function TE() {
      e0 && $o();
    }
    function $o() {
      if (!t0 && Yu !== null) {
        t0 = !0;
        var e = 0, t = Pa();
        try {
          var a = !0, i = Yu;
          for (In(Ur); e < i.length; e++) {
            var o = i[e];
            do
              o = o(a);
            while (o !== null);
          }
          Yu = null, e0 = !1;
        } catch (f) {
          throw Yu !== null && (Yu = Yu.slice(e + 1)), jd(xs, $o), f;
        } finally {
          In(t), t0 = !1;
        }
      }
      return null;
    }
    var Pf = [], Vf = 0, xm = null, Em = 0, Ai = [], Ui = 0, nc = null, Wu = 1, Qu = "";
    function W_(e) {
      return ac(), (e.flags & bi) !== Ze;
    }
    function Q_(e) {
      return ac(), Em;
    }
    function G_() {
      var e = Qu, t = Wu, a = t & ~X_(t);
      return a.toString(32) + e;
    }
    function rc(e, t) {
      ac(), Pf[Vf++] = Em, Pf[Vf++] = xm, xm = e, Em = t;
    }
    function kE(e, t, a) {
      ac(), Ai[Ui++] = Wu, Ai[Ui++] = Qu, Ai[Ui++] = nc, nc = e;
      var i = Wu, o = Qu, f = Cm(i) - 1, h = i & ~(1 << f), S = a + 1, x = Cm(t) + f;
      if (x > 30) {
        var b = f - f % 5, k = (1 << b) - 1, P = (h & k).toString(32), j = h >> b, W = f - b, q = Cm(t) + W, te = S << W, Me = te | j, rt = P + o;
        Wu = 1 << q | Me, Qu = rt;
      } else {
        var Ge = S << f, Lt = Ge | h, kt = o;
        Wu = 1 << x | Lt, Qu = kt;
      }
    }
    function n0(e) {
      ac();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        rc(e, a), kE(e, a, i);
      }
    }
    function Cm(e) {
      return 32 - Bn(e);
    }
    function X_(e) {
      return 1 << Cm(e) - 1;
    }
    function r0(e) {
      for (; e === xm; )
        xm = Pf[--Vf], Pf[Vf] = null, Em = Pf[--Vf], Pf[Vf] = null;
      for (; e === nc; )
        nc = Ai[--Ui], Ai[Ui] = null, Qu = Ai[--Ui], Ai[Ui] = null, Wu = Ai[--Ui], Ai[Ui] = null;
    }
    function q_() {
      return ac(), nc !== null ? {
        id: Wu,
        overflow: Qu
      } : null;
    }
    function K_(e, t) {
      ac(), Ai[Ui++] = Wu, Ai[Ui++] = Qu, Ai[Ui++] = nc, Wu = t.id, Qu = t.overflow, nc = e;
    }
    function ac() {
      Vr() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Pr = null, Fi = null, ll = !1, ic = !1, Io = null;
    function Z_() {
      ll && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function DE() {
      ic = !0;
    }
    function J_() {
      return ic;
    }
    function eT(e) {
      var t = e.stateNode.containerInfo;
      return Fi = g_(t), Pr = e, ll = !0, Io = null, ic = !1, !0;
    }
    function tT(e, t, a) {
      return Fi = S_(t), Pr = e, ll = !0, Io = null, ic = !1, a !== null && K_(e, a), !0;
    }
    function ME(e, t) {
      switch (e.tag) {
        case O: {
          D_(e.stateNode.containerInfo, t);
          break;
        }
        case F: {
          var a = (e.mode & Rt) !== Je;
          O_(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case de: {
          var i = e.memoizedState;
          i.dehydrated !== null && M_(i.dehydrated, t);
          break;
        }
      }
    }
    function OE(e, t) {
      ME(e, t);
      var a = iM();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= La) : i.push(a);
    }
    function a0(e, t) {
      {
        if (ic)
          return;
        switch (e.tag) {
          case O: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case F:
                var i = t.type;
                t.pendingProps, N_(a, i);
                break;
              case oe:
                var o = t.pendingProps;
                L_(a, o);
                break;
            }
            break;
          }
          case F: {
            var f = e.type, h = e.memoizedProps, S = e.stateNode;
            switch (t.tag) {
              case F: {
                var x = t.type, b = t.pendingProps, k = (e.mode & Rt) !== Je;
                U_(
                  f,
                  h,
                  S,
                  x,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  k
                );
                break;
              }
              case oe: {
                var P = t.pendingProps, j = (e.mode & Rt) !== Je;
                F_(
                  f,
                  h,
                  S,
                  P,
                  // TODO: Delete this argument when we remove the legacy root API.
                  j
                );
                break;
              }
            }
            break;
          }
          case de: {
            var W = e.memoizedState, q = W.dehydrated;
            if (q !== null) switch (t.tag) {
              case F:
                var te = t.type;
                t.pendingProps, z_(q, te);
                break;
              case oe:
                var Me = t.pendingProps;
                A_(q, Me);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function NE(e, t) {
      t.flags = t.flags & ~Jr | Cn, a0(e, t);
    }
    function LE(e, t) {
      switch (e.tag) {
        case F: {
          var a = e.type;
          e.pendingProps;
          var i = d_(t, a);
          return i !== null ? (e.stateNode = i, Pr = e, Fi = y_(i), !0) : !1;
        }
        case oe: {
          var o = e.pendingProps, f = p_(t, o);
          return f !== null ? (e.stateNode = f, Pr = e, Fi = null, !0) : !1;
        }
        case de: {
          var h = h_(t);
          if (h !== null) {
            var S = {
              dehydrated: h,
              treeContext: q_(),
              retryLane: ra
            };
            e.memoizedState = S;
            var x = lM(h);
            return x.return = e, e.child = x, Pr = e, Fi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function i0(e) {
      return (e.mode & Rt) !== Je && (e.flags & Ke) === Ze;
    }
    function l0(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function u0(e) {
      if (ll) {
        var t = Fi;
        if (!t) {
          i0(e) && (a0(Pr, e), l0()), NE(Pr, e), ll = !1, Pr = e;
          return;
        }
        var a = t;
        if (!LE(e, t)) {
          i0(e) && (a0(Pr, e), l0()), t = Np(a);
          var i = Pr;
          if (!t || !LE(e, t)) {
            NE(Pr, e), ll = !1, Pr = e;
            return;
          }
          OE(i, a);
        }
      }
    }
    function nT(e, t, a) {
      var i = e.stateNode, o = !ic, f = x_(i, e.type, e.memoizedProps, t, a, e, o);
      return e.updateQueue = f, f !== null;
    }
    function rT(e) {
      var t = e.stateNode, a = e.memoizedProps, i = E_(t, a, e);
      if (i) {
        var o = Pr;
        if (o !== null)
          switch (o.tag) {
            case O: {
              var f = o.stateNode.containerInfo, h = (o.mode & Rt) !== Je;
              T_(
                f,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case F: {
              var S = o.type, x = o.memoizedProps, b = o.stateNode, k = (o.mode & Rt) !== Je;
              k_(
                S,
                x,
                b,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                k
              );
              break;
            }
          }
      }
      return i;
    }
    function aT(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      C_(a, e);
    }
    function iT(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return w_(a);
    }
    function zE(e) {
      for (var t = e.return; t !== null && t.tag !== F && t.tag !== O && t.tag !== de; )
        t = t.return;
      Pr = t;
    }
    function wm(e) {
      if (e !== Pr)
        return !1;
      if (!ll)
        return zE(e), ll = !0, !1;
      if (e.tag !== O && (e.tag !== F || __(e.type) && !Bg(e.type, e.memoizedProps))) {
        var t = Fi;
        if (t)
          if (i0(e))
            AE(e), l0();
          else
            for (; t; )
              OE(e, t), t = Np(t);
      }
      return zE(e), e.tag === de ? Fi = iT(e) : Fi = Pr ? Np(e.stateNode) : null, !0;
    }
    function lT() {
      return ll && Fi !== null;
    }
    function AE(e) {
      for (var t = Fi; t; )
        ME(e, t), t = Np(t);
    }
    function Bf() {
      Pr = null, Fi = null, ll = !1, ic = !1;
    }
    function UE() {
      Io !== null && (D1(Io), Io = null);
    }
    function Vr() {
      return ll;
    }
    function o0(e) {
      Io === null ? Io = [e] : Io.push(e);
    }
    var uT = d.ReactCurrentBatchConfig, oT = null;
    function sT() {
      return uT.transition;
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
      var cT = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & en && (t = a), a = a.return;
        return t;
      }, lc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Up = [], Fp = [], jp = [], Hp = [], Pp = [], Vp = [], uc = /* @__PURE__ */ new Set();
      ul.recordUnsafeLifecycleWarnings = function(e, t) {
        uc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Up.push(e), e.mode & en && typeof t.UNSAFE_componentWillMount == "function" && Fp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && jp.push(e), e.mode & en && typeof t.UNSAFE_componentWillReceiveProps == "function" && Hp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Pp.push(e), e.mode & en && typeof t.UNSAFE_componentWillUpdate == "function" && Vp.push(e));
      }, ul.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Up.length > 0 && (Up.forEach(function(j) {
          e.add(dt(j) || "Component"), uc.add(j.type);
        }), Up = []);
        var t = /* @__PURE__ */ new Set();
        Fp.length > 0 && (Fp.forEach(function(j) {
          t.add(dt(j) || "Component"), uc.add(j.type);
        }), Fp = []);
        var a = /* @__PURE__ */ new Set();
        jp.length > 0 && (jp.forEach(function(j) {
          a.add(dt(j) || "Component"), uc.add(j.type);
        }), jp = []);
        var i = /* @__PURE__ */ new Set();
        Hp.length > 0 && (Hp.forEach(function(j) {
          i.add(dt(j) || "Component"), uc.add(j.type);
        }), Hp = []);
        var o = /* @__PURE__ */ new Set();
        Pp.length > 0 && (Pp.forEach(function(j) {
          o.add(dt(j) || "Component"), uc.add(j.type);
        }), Pp = []);
        var f = /* @__PURE__ */ new Set();
        if (Vp.length > 0 && (Vp.forEach(function(j) {
          f.add(dt(j) || "Component"), uc.add(j.type);
        }), Vp = []), t.size > 0) {
          var h = lc(t);
          v(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, h);
        }
        if (i.size > 0) {
          var S = lc(i);
          v(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, S);
        }
        if (f.size > 0) {
          var x = lc(f);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, x);
        }
        if (e.size > 0) {
          var b = lc(e);
          C(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
        if (a.size > 0) {
          var k = lc(a);
          C(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, k);
        }
        if (o.size > 0) {
          var P = lc(o);
          C(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, P);
        }
      };
      var Rm = /* @__PURE__ */ new Map(), FE = /* @__PURE__ */ new Set();
      ul.recordLegacyContextWarning = function(e, t) {
        var a = cT(e);
        if (a === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!FE.has(e.type)) {
          var i = Rm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Rm.set(a, i)), i.push(e));
        }
      }, ul.flushLegacyContextWarning = function() {
        Rm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(f) {
              i.add(dt(f) || "Component"), FE.add(f.type);
            });
            var o = lc(i);
            try {
              Kt(a), v(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o);
            } finally {
              vn();
            }
          }
        });
      }, ul.discardPendingWarnings = function() {
        Up = [], Fp = [], jp = [], Hp = [], Pp = [], Vp = [], Rm = /* @__PURE__ */ new Map();
      };
    }
    var s0, c0, f0, d0, p0, jE = function(e, t) {
    };
    s0 = !1, c0 = !1, f0 = {}, d0 = {}, p0 = {}, jE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = dt(t) || "Component";
        d0[a] || (d0[a] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function fT(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Bp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & en || K) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== R) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !fT(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var o = dt(e) || "Component";
          f0[o] || (v('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', o, i), f0[o] = !0);
        }
        if (a._owner) {
          var f = a._owner, h;
          if (f) {
            var S = f;
            if (S.tag !== R)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            h = S.stateNode;
          }
          if (!h)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var x = h;
          Ta(i, "ref");
          var b = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === b)
            return t.ref;
          var k = function(P) {
            var j = x.refs;
            P === null ? delete j[b] : j[b] = P;
          };
          return k._stringRef = b, k;
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
    function bm(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function _m(e) {
      {
        var t = dt(e) || "Component";
        if (p0[t])
          return;
        p0[t] = !0, v("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function HE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function PE(e) {
      function t($, ne) {
        if (e) {
          var I = $.deletions;
          I === null ? ($.deletions = [ne], $.flags |= La) : I.push(ne);
        }
      }
      function a($, ne) {
        if (!e)
          return null;
        for (var I = ne; I !== null; )
          t($, I), I = I.sibling;
        return null;
      }
      function i($, ne) {
        for (var I = /* @__PURE__ */ new Map(), Ce = ne; Ce !== null; )
          Ce.key !== null ? I.set(Ce.key, Ce) : I.set(Ce.index, Ce), Ce = Ce.sibling;
        return I;
      }
      function o($, ne) {
        var I = mc($, ne);
        return I.index = 0, I.sibling = null, I;
      }
      function f($, ne, I) {
        if ($.index = I, !e)
          return $.flags |= bi, ne;
        var Ce = $.alternate;
        if (Ce !== null) {
          var je = Ce.index;
          return je < ne ? ($.flags |= Cn, ne) : je;
        } else
          return $.flags |= Cn, ne;
      }
      function h($) {
        return e && $.alternate === null && ($.flags |= Cn), $;
      }
      function S($, ne, I, Ce) {
        if (ne === null || ne.tag !== oe) {
          var je = ox(I, $.mode, Ce);
          return je.return = $, je;
        } else {
          var Le = o(ne, I);
          return Le.return = $, Le;
        }
      }
      function x($, ne, I, Ce) {
        var je = I.type;
        if (je === vi)
          return k($, ne, I.props.children, Ce, I.key);
        if (ne !== null && (ne.elementType === je || // Keep this check inline so it only runs on the false path:
        Y1(ne, I) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof je == "object" && je !== null && je.$$typeof === ht && HE(je) === ne.type)) {
          var Le = o(ne, I.props);
          return Le.ref = Bp($, ne, I), Le.return = $, Le._debugSource = I._source, Le._debugOwner = I._owner, Le;
        }
        var ct = ux(I, $.mode, Ce);
        return ct.ref = Bp($, ne, I), ct.return = $, ct;
      }
      function b($, ne, I, Ce) {
        if (ne === null || ne.tag !== z || ne.stateNode.containerInfo !== I.containerInfo || ne.stateNode.implementation !== I.implementation) {
          var je = sx(I, $.mode, Ce);
          return je.return = $, je;
        } else {
          var Le = o(ne, I.children || []);
          return Le.return = $, Le;
        }
      }
      function k($, ne, I, Ce, je) {
        if (ne === null || ne.tag !== ae) {
          var Le = ts(I, $.mode, Ce, je);
          return Le.return = $, Le;
        } else {
          var ct = o(ne, I);
          return ct.return = $, ct;
        }
      }
      function P($, ne, I) {
        if (typeof ne == "string" && ne !== "" || typeof ne == "number") {
          var Ce = ox("" + ne, $.mode, I);
          return Ce.return = $, Ce;
        }
        if (typeof ne == "object" && ne !== null) {
          switch (ne.$$typeof) {
            case Nr: {
              var je = ux(ne, $.mode, I);
              return je.ref = Bp($, null, ne), je.return = $, je;
            }
            case or: {
              var Le = sx(ne, $.mode, I);
              return Le.return = $, Le;
            }
            case ht: {
              var ct = ne._payload, mt = ne._init;
              return P($, mt(ct), I);
            }
          }
          if (Ct(ne) || gt(ne)) {
            var nn = ts(ne, $.mode, I, null);
            return nn.return = $, nn;
          }
          bm($, ne);
        }
        return typeof ne == "function" && _m($), null;
      }
      function j($, ne, I, Ce) {
        var je = ne !== null ? ne.key : null;
        if (typeof I == "string" && I !== "" || typeof I == "number")
          return je !== null ? null : S($, ne, "" + I, Ce);
        if (typeof I == "object" && I !== null) {
          switch (I.$$typeof) {
            case Nr:
              return I.key === je ? x($, ne, I, Ce) : null;
            case or:
              return I.key === je ? b($, ne, I, Ce) : null;
            case ht: {
              var Le = I._payload, ct = I._init;
              return j($, ne, ct(Le), Ce);
            }
          }
          if (Ct(I) || gt(I))
            return je !== null ? null : k($, ne, I, Ce, null);
          bm($, I);
        }
        return typeof I == "function" && _m($), null;
      }
      function W($, ne, I, Ce, je) {
        if (typeof Ce == "string" && Ce !== "" || typeof Ce == "number") {
          var Le = $.get(I) || null;
          return S(ne, Le, "" + Ce, je);
        }
        if (typeof Ce == "object" && Ce !== null) {
          switch (Ce.$$typeof) {
            case Nr: {
              var ct = $.get(Ce.key === null ? I : Ce.key) || null;
              return x(ne, ct, Ce, je);
            }
            case or: {
              var mt = $.get(Ce.key === null ? I : Ce.key) || null;
              return b(ne, mt, Ce, je);
            }
            case ht:
              var nn = Ce._payload, It = Ce._init;
              return W($, ne, I, It(nn), je);
          }
          if (Ct(Ce) || gt(Ce)) {
            var er = $.get(I) || null;
            return k(ne, er, Ce, je, null);
          }
          bm(ne, Ce);
        }
        return typeof Ce == "function" && _m(ne), null;
      }
      function q($, ne, I) {
        {
          if (typeof $ != "object" || $ === null)
            return ne;
          switch ($.$$typeof) {
            case Nr:
            case or:
              jE($, I);
              var Ce = $.key;
              if (typeof Ce != "string")
                break;
              if (ne === null) {
                ne = /* @__PURE__ */ new Set(), ne.add(Ce);
                break;
              }
              if (!ne.has(Ce)) {
                ne.add(Ce);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Ce);
              break;
            case ht:
              var je = $._payload, Le = $._init;
              q(Le(je), ne, I);
              break;
          }
        }
        return ne;
      }
      function te($, ne, I, Ce) {
        for (var je = null, Le = 0; Le < I.length; Le++) {
          var ct = I[Le];
          je = q(ct, je, $);
        }
        for (var mt = null, nn = null, It = ne, er = 0, Yt = 0, Qn = null; It !== null && Yt < I.length; Yt++) {
          It.index > Yt ? (Qn = It, It = null) : Qn = It.sibling;
          var fa = j($, It, I[Yt], Ce);
          if (fa === null) {
            It === null && (It = Qn);
            break;
          }
          e && It && fa.alternate === null && t($, It), er = f(fa, er, Yt), nn === null ? mt = fa : nn.sibling = fa, nn = fa, It = Qn;
        }
        if (Yt === I.length) {
          if (a($, It), Vr()) {
            var Gr = Yt;
            rc($, Gr);
          }
          return mt;
        }
        if (It === null) {
          for (; Yt < I.length; Yt++) {
            var pi = P($, I[Yt], Ce);
            pi !== null && (er = f(pi, er, Yt), nn === null ? mt = pi : nn.sibling = pi, nn = pi);
          }
          if (Vr()) {
            var ba = Yt;
            rc($, ba);
          }
          return mt;
        }
        for (var _a = i($, It); Yt < I.length; Yt++) {
          var da = W(_a, $, Yt, I[Yt], Ce);
          da !== null && (e && da.alternate !== null && _a.delete(da.key === null ? Yt : da.key), er = f(da, er, Yt), nn === null ? mt = da : nn.sibling = da, nn = da);
        }
        if (e && _a.forEach(function(ud) {
          return t($, ud);
        }), Vr()) {
          var eo = Yt;
          rc($, eo);
        }
        return mt;
      }
      function Me($, ne, I, Ce) {
        var je = gt(I);
        if (typeof je != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          I[Symbol.toStringTag] === "Generator" && (c0 || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), c0 = !0), I.entries === je && (s0 || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), s0 = !0);
          var Le = je.call(I);
          if (Le)
            for (var ct = null, mt = Le.next(); !mt.done; mt = Le.next()) {
              var nn = mt.value;
              ct = q(nn, ct, $);
            }
        }
        var It = je.call(I);
        if (It == null)
          throw new Error("An iterable object provided no iterator.");
        for (var er = null, Yt = null, Qn = ne, fa = 0, Gr = 0, pi = null, ba = It.next(); Qn !== null && !ba.done; Gr++, ba = It.next()) {
          Qn.index > Gr ? (pi = Qn, Qn = null) : pi = Qn.sibling;
          var _a = j($, Qn, ba.value, Ce);
          if (_a === null) {
            Qn === null && (Qn = pi);
            break;
          }
          e && Qn && _a.alternate === null && t($, Qn), fa = f(_a, fa, Gr), Yt === null ? er = _a : Yt.sibling = _a, Yt = _a, Qn = pi;
        }
        if (ba.done) {
          if (a($, Qn), Vr()) {
            var da = Gr;
            rc($, da);
          }
          return er;
        }
        if (Qn === null) {
          for (; !ba.done; Gr++, ba = It.next()) {
            var eo = P($, ba.value, Ce);
            eo !== null && (fa = f(eo, fa, Gr), Yt === null ? er = eo : Yt.sibling = eo, Yt = eo);
          }
          if (Vr()) {
            var ud = Gr;
            rc($, ud);
          }
          return er;
        }
        for (var xh = i($, Qn); !ba.done; Gr++, ba = It.next()) {
          var au = W(xh, $, Gr, ba.value, Ce);
          au !== null && (e && au.alternate !== null && xh.delete(au.key === null ? Gr : au.key), fa = f(au, fa, Gr), Yt === null ? er = au : Yt.sibling = au, Yt = au);
        }
        if (e && xh.forEach(function(FM) {
          return t($, FM);
        }), Vr()) {
          var UM = Gr;
          rc($, UM);
        }
        return er;
      }
      function rt($, ne, I, Ce) {
        if (ne !== null && ne.tag === oe) {
          a($, ne.sibling);
          var je = o(ne, I);
          return je.return = $, je;
        }
        a($, ne);
        var Le = ox(I, $.mode, Ce);
        return Le.return = $, Le;
      }
      function Ge($, ne, I, Ce) {
        for (var je = I.key, Le = ne; Le !== null; ) {
          if (Le.key === je) {
            var ct = I.type;
            if (ct === vi) {
              if (Le.tag === ae) {
                a($, Le.sibling);
                var mt = o(Le, I.props.children);
                return mt.return = $, mt._debugSource = I._source, mt._debugOwner = I._owner, mt;
              }
            } else if (Le.elementType === ct || // Keep this check inline so it only runs on the false path:
            Y1(Le, I) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof ct == "object" && ct !== null && ct.$$typeof === ht && HE(ct) === Le.type) {
              a($, Le.sibling);
              var nn = o(Le, I.props);
              return nn.ref = Bp($, Le, I), nn.return = $, nn._debugSource = I._source, nn._debugOwner = I._owner, nn;
            }
            a($, Le);
            break;
          } else
            t($, Le);
          Le = Le.sibling;
        }
        if (I.type === vi) {
          var It = ts(I.props.children, $.mode, Ce, I.key);
          return It.return = $, It;
        } else {
          var er = ux(I, $.mode, Ce);
          return er.ref = Bp($, ne, I), er.return = $, er;
        }
      }
      function Lt($, ne, I, Ce) {
        for (var je = I.key, Le = ne; Le !== null; ) {
          if (Le.key === je)
            if (Le.tag === z && Le.stateNode.containerInfo === I.containerInfo && Le.stateNode.implementation === I.implementation) {
              a($, Le.sibling);
              var ct = o(Le, I.children || []);
              return ct.return = $, ct;
            } else {
              a($, Le);
              break;
            }
          else
            t($, Le);
          Le = Le.sibling;
        }
        var mt = sx(I, $.mode, Ce);
        return mt.return = $, mt;
      }
      function kt($, ne, I, Ce) {
        var je = typeof I == "object" && I !== null && I.type === vi && I.key === null;
        if (je && (I = I.props.children), typeof I == "object" && I !== null) {
          switch (I.$$typeof) {
            case Nr:
              return h(Ge($, ne, I, Ce));
            case or:
              return h(Lt($, ne, I, Ce));
            case ht:
              var Le = I._payload, ct = I._init;
              return kt($, ne, ct(Le), Ce);
          }
          if (Ct(I))
            return te($, ne, I, Ce);
          if (gt(I))
            return Me($, ne, I, Ce);
          bm($, I);
        }
        return typeof I == "string" && I !== "" || typeof I == "number" ? h(rt($, ne, "" + I, Ce)) : (typeof I == "function" && _m($), a($, ne));
      }
      return kt;
    }
    var $f = PE(!0), VE = PE(!1);
    function dT(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = mc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = mc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function pT(e, t) {
      for (var a = e.child; a !== null; )
        eM(a, t), a = a.sibling;
    }
    var h0 = Vo(null), v0;
    v0 = {};
    var Tm = null, If = null, m0 = null, km = !1;
    function Dm() {
      Tm = null, If = null, m0 = null, km = !1;
    }
    function BE() {
      km = !0;
    }
    function $E() {
      km = !1;
    }
    function IE(e, t, a) {
      sa(h0, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== v0 && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = v0;
    }
    function y0(e, t) {
      var a = h0.current;
      oa(h0, t), e._currentValue = a;
    }
    function g0(e, t, a) {
      for (var i = e; i !== null; ) {
        var o = i.alternate;
        if (Uu(i.childLanes, t) ? o !== null && !Uu(o.childLanes, t) && (o.childLanes = xt(o.childLanes, t)) : (i.childLanes = xt(i.childLanes, t), o !== null && (o.childLanes = xt(o.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && v("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function hT(e, t, a) {
      vT(e, t, a);
    }
    function vT(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var o = void 0, f = i.dependencies;
        if (f !== null) {
          o = i.child;
          for (var h = f.firstContext; h !== null; ) {
            if (h.context === t) {
              if (i.tag === R) {
                var S = zs(a), x = Gu(an, S);
                x.tag = Om;
                var b = i.updateQueue;
                if (b !== null) {
                  var k = b.shared, P = k.pending;
                  P === null ? x.next = x : (x.next = P.next, P.next = x), k.pending = x;
                }
              }
              i.lanes = xt(i.lanes, a);
              var j = i.alternate;
              j !== null && (j.lanes = xt(j.lanes, a)), g0(i.return, a, e), f.lanes = xt(f.lanes, a);
              break;
            }
            h = h.next;
          }
        } else if (i.tag === we)
          o = i.type === e.type ? null : i.child;
        else if (i.tag === bt) {
          var W = i.return;
          if (W === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          W.lanes = xt(W.lanes, a);
          var q = W.alternate;
          q !== null && (q.lanes = xt(q.lanes, a)), g0(W, a, e), o = i.sibling;
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
            var te = o.sibling;
            if (te !== null) {
              te.return = o.return, o = te;
              break;
            }
            o = o.return;
          }
        i = o;
      }
    }
    function Yf(e, t) {
      Tm = e, If = null, m0 = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (aa(a.lanes, t) && rh(), a.firstContext = null);
      }
    }
    function lr(e) {
      km && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (m0 !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (If === null) {
          if (Tm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          If = a, Tm.dependencies = {
            lanes: he,
            firstContext: a
          };
        } else
          If = If.next = a;
      }
      return t;
    }
    var oc = null;
    function S0(e) {
      oc === null ? oc = [e] : oc.push(e);
    }
    function mT() {
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
    function YE(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, S0(t)) : (a.next = o.next, o.next = a), t.interleaved = a, Mm(e, i);
    }
    function yT(e, t, a, i) {
      var o = t.interleaved;
      o === null ? (a.next = a, S0(t)) : (a.next = o.next, o.next = a), t.interleaved = a;
    }
    function gT(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, S0(t)) : (a.next = o.next, o.next = a), t.interleaved = a, Mm(e, i);
    }
    function $a(e, t) {
      return Mm(e, t);
    }
    var ST = Mm;
    function Mm(e, t) {
      e.lanes = xt(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = xt(a.lanes, t)), a === null && (e.flags & (Cn | Jr)) !== Ze && V1(e);
      for (var i = e, o = e.return; o !== null; )
        o.childLanes = xt(o.childLanes, t), a = o.alternate, a !== null ? a.childLanes = xt(a.childLanes, t) : (o.flags & (Cn | Jr)) !== Ze && V1(e), i = o, o = o.return;
      if (i.tag === O) {
        var f = i.stateNode;
        return f;
      } else
        return null;
    }
    var WE = 0, QE = 1, Om = 2, x0 = 3, Nm = !1, E0, Lm;
    E0 = !1, Lm = null;
    function C0(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: he
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function GE(e, t) {
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
        tag: WE,
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
      if (Lm === o && !E0 && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), E0 = !0), yD()) {
        var f = o.pending;
        return f === null ? t.next = t : (t.next = f.next, f.next = t), o.pending = t, ST(e, a);
      } else
        return gT(e, o, t, a);
    }
    function zm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var o = i.shared;
        if (tp(a)) {
          var f = o.lanes;
          f = rp(f, e.pendingLanes);
          var h = xt(f, a);
          o.lanes = h, yf(e, h);
        }
      }
    }
    function w0(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var o = i.updateQueue;
        if (a === o) {
          var f = null, h = null, S = a.firstBaseUpdate;
          if (S !== null) {
            var x = S;
            do {
              var b = {
                eventTime: x.eventTime,
                lane: x.lane,
                tag: x.tag,
                payload: x.payload,
                callback: x.callback,
                next: null
              };
              h === null ? f = h = b : (h.next = b, h = b), x = x.next;
            } while (x !== null);
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
      var k = a.lastBaseUpdate;
      k === null ? a.firstBaseUpdate = t : k.next = t, a.lastBaseUpdate = t;
    }
    function xT(e, t, a, i, o, f) {
      switch (a.tag) {
        case QE: {
          var h = a.payload;
          if (typeof h == "function") {
            BE();
            var S = h.call(f, i, o);
            {
              if (e.mode & en) {
                wn(!0);
                try {
                  h.call(f, i, o);
                } finally {
                  wn(!1);
                }
              }
              $E();
            }
            return S;
          }
          return h;
        }
        case x0:
          e.flags = e.flags & ~nr | Ke;
        // Intentional fallthrough
        case WE: {
          var x = a.payload, b;
          if (typeof x == "function") {
            BE(), b = x.call(f, i, o);
            {
              if (e.mode & en) {
                wn(!0);
                try {
                  x.call(f, i, o);
                } finally {
                  wn(!1);
                }
              }
              $E();
            }
          } else
            b = x;
          return b == null ? i : Et({}, i, b);
        }
        case Om:
          return Nm = !0, i;
      }
      return i;
    }
    function Am(e, t, a, i) {
      var o = e.updateQueue;
      Nm = !1, Lm = o.shared;
      var f = o.firstBaseUpdate, h = o.lastBaseUpdate, S = o.shared.pending;
      if (S !== null) {
        o.shared.pending = null;
        var x = S, b = x.next;
        x.next = null, h === null ? f = b : h.next = b, h = x;
        var k = e.alternate;
        if (k !== null) {
          var P = k.updateQueue, j = P.lastBaseUpdate;
          j !== h && (j === null ? P.firstBaseUpdate = b : j.next = b, P.lastBaseUpdate = x);
        }
      }
      if (f !== null) {
        var W = o.baseState, q = he, te = null, Me = null, rt = null, Ge = f;
        do {
          var Lt = Ge.lane, kt = Ge.eventTime;
          if (Uu(i, Lt)) {
            if (rt !== null) {
              var ne = {
                eventTime: kt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ft,
                tag: Ge.tag,
                payload: Ge.payload,
                callback: Ge.callback,
                next: null
              };
              rt = rt.next = ne;
            }
            W = xT(e, o, Ge, W, t, a);
            var I = Ge.callback;
            if (I !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ge.lane !== Ft) {
              e.flags |= fn;
              var Ce = o.effects;
              Ce === null ? o.effects = [Ge] : Ce.push(Ge);
            }
          } else {
            var $ = {
              eventTime: kt,
              lane: Lt,
              tag: Ge.tag,
              payload: Ge.payload,
              callback: Ge.callback,
              next: null
            };
            rt === null ? (Me = rt = $, te = W) : rt = rt.next = $, q = xt(q, Lt);
          }
          if (Ge = Ge.next, Ge === null) {
            if (S = o.shared.pending, S === null)
              break;
            var je = S, Le = je.next;
            je.next = null, Ge = Le, o.lastBaseUpdate = je, o.shared.pending = null;
          }
        } while (!0);
        rt === null && (te = W), o.baseState = te, o.firstBaseUpdate = Me, o.lastBaseUpdate = rt;
        var ct = o.shared.interleaved;
        if (ct !== null) {
          var mt = ct;
          do
            q = xt(q, mt.lane), mt = mt.next;
          while (mt !== ct);
        } else f === null && (o.shared.lanes = he);
        vh(q), e.lanes = q, e.memoizedState = W;
      }
      Lm = null;
    }
    function ET(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function XE() {
      Nm = !1;
    }
    function Um() {
      return Nm;
    }
    function qE(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.callback;
          h !== null && (f.callback = null, ET(h, a));
        }
    }
    var $p = {}, Wo = Vo($p), Ip = Vo($p), Fm = Vo($p);
    function jm(e) {
      if (e === $p)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function KE() {
      var e = jm(Fm.current);
      return e;
    }
    function R0(e, t) {
      sa(Fm, t, e), sa(Ip, e, e), sa(Wo, $p, e);
      var a = jb(t);
      oa(Wo, e), sa(Wo, a, e);
    }
    function Wf(e) {
      oa(Wo, e), oa(Ip, e), oa(Fm, e);
    }
    function b0() {
      var e = jm(Wo.current);
      return e;
    }
    function ZE(e) {
      jm(Fm.current);
      var t = jm(Wo.current), a = Hb(t, e.type);
      t !== a && (sa(Ip, e, e), sa(Wo, a, e));
    }
    function _0(e) {
      Ip.current === e && (oa(Wo, e), oa(Ip, e));
    }
    var CT = 0, JE = 1, eC = 1, Yp = 2, ol = Vo(CT);
    function T0(e, t) {
      return (e & t) !== 0;
    }
    function Qf(e) {
      return e & JE;
    }
    function k0(e, t) {
      return e & JE | t;
    }
    function wT(e, t) {
      return e | t;
    }
    function Qo(e, t) {
      sa(ol, t, e);
    }
    function Gf(e) {
      oa(ol, e);
    }
    function RT(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Hm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === de) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || yE(i) || Wg(i))
              return t;
          }
        } else if (t.tag === Ut && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var o = (t.flags & Ke) !== Ze;
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
    var Ia = (
      /*   */
      0
    ), vr = (
      /* */
      1
    ), Kl = (
      /*  */
      2
    ), mr = (
      /*    */
      4
    ), Br = (
      /*   */
      8
    ), D0 = [];
    function M0() {
      for (var e = 0; e < D0.length; e++) {
        var t = D0[e];
        t._workInProgressVersionPrimary = null;
      }
      D0.length = 0;
    }
    function bT(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Fe = d.ReactCurrentDispatcher, Wp = d.ReactCurrentBatchConfig, O0, Xf;
    O0 = /* @__PURE__ */ new Set();
    var sc = he, tn = null, yr = null, gr = null, Pm = !1, Qp = !1, Gp = 0, _T = 0, TT = 25, le = null, ji = null, Go = -1, N0 = !1;
    function Gt() {
      {
        var e = le;
        ji === null ? ji = [e] : ji.push(e);
      }
    }
    function _e() {
      {
        var e = le;
        ji !== null && (Go++, ji[Go] !== e && kT(e));
      }
    }
    function qf(e) {
      e != null && !Ct(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", le, typeof e);
    }
    function kT(e) {
      {
        var t = dt(tn);
        if (!O0.has(t) && (O0.add(t), ji !== null)) {
          for (var a = "", i = 30, o = 0; o <= Go; o++) {
            for (var f = ji[o], h = o === Go ? e : f, S = o + 1 + ". " + f; S.length < i; )
              S += " ";
            S += h + `
`, a += S;
          }
          v(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ca() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function L0(e, t) {
      if (N0)
        return !1;
      if (t === null)
        return v("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", le), !1;
      e.length !== t.length && v(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, le, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ye(e[a], t[a]))
          return !1;
      return !0;
    }
    function Kf(e, t, a, i, o, f) {
      sc = f, tn = t, ji = e !== null ? e._debugHookTypes : null, Go = -1, N0 = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = he, e !== null && e.memoizedState !== null ? Fe.current = CC : ji !== null ? Fe.current = EC : Fe.current = xC;
      var h = a(i, o);
      if (Qp) {
        var S = 0;
        do {
          if (Qp = !1, Gp = 0, S >= TT)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          S += 1, N0 = !1, yr = null, gr = null, t.updateQueue = null, Go = -1, Fe.current = wC, h = a(i, o);
        } while (Qp);
      }
      Fe.current = Jm, t._debugHookTypes = ji;
      var x = yr !== null && yr.next !== null;
      if (sc = he, tn = null, yr = null, gr = null, le = null, ji = null, Go = -1, e !== null && (e.flags & Vn) !== (t.flags & Vn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Rt) !== Je && v("Internal React error: Expected static flag was missing. Please notify the React team."), Pm = !1, x)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return h;
    }
    function Zf() {
      var e = Gp !== 0;
      return Gp = 0, e;
    }
    function tC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Bt) !== Je ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = As(e.lanes, a);
    }
    function nC() {
      if (Fe.current = Jm, Pm) {
        for (var e = tn.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Pm = !1;
      }
      sc = he, tn = null, yr = null, gr = null, ji = null, Go = -1, le = null, vC = !1, Qp = !1, Gp = 0;
    }
    function Zl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return gr === null ? tn.memoizedState = gr = e : gr = gr.next = e, gr;
    }
    function Hi() {
      var e;
      if (yr === null) {
        var t = tn.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = yr.next;
      var a;
      if (gr === null ? a = tn.memoizedState : a = gr.next, a !== null)
        gr = a, a = gr.next, yr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        yr = e;
        var i = {
          memoizedState: yr.memoizedState,
          baseState: yr.baseState,
          baseQueue: yr.baseQueue,
          queue: yr.queue,
          next: null
        };
        gr === null ? tn.memoizedState = gr = i : gr = gr.next = i;
      }
      return gr;
    }
    function rC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function z0(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function A0(e, t, a) {
      var i = Zl(), o;
      a !== void 0 ? o = a(t) : o = t, i.memoizedState = i.baseState = o;
      var f = {
        pending: null,
        interleaved: null,
        lanes: he,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      };
      i.queue = f;
      var h = f.dispatch = NT.bind(null, tn, f);
      return [i.memoizedState, h];
    }
    function U0(e, t, a) {
      var i = Hi(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var f = yr, h = f.baseQueue, S = o.pending;
      if (S !== null) {
        if (h !== null) {
          var x = h.next, b = S.next;
          h.next = b, S.next = x;
        }
        f.baseQueue !== h && v("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), f.baseQueue = h = S, o.pending = null;
      }
      if (h !== null) {
        var k = h.next, P = f.baseState, j = null, W = null, q = null, te = k;
        do {
          var Me = te.lane;
          if (Uu(sc, Me)) {
            if (q !== null) {
              var Ge = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Ft,
                action: te.action,
                hasEagerState: te.hasEagerState,
                eagerState: te.eagerState,
                next: null
              };
              q = q.next = Ge;
            }
            if (te.hasEagerState)
              P = te.eagerState;
            else {
              var Lt = te.action;
              P = e(P, Lt);
            }
          } else {
            var rt = {
              lane: Me,
              action: te.action,
              hasEagerState: te.hasEagerState,
              eagerState: te.eagerState,
              next: null
            };
            q === null ? (W = q = rt, j = P) : q = q.next = rt, tn.lanes = xt(tn.lanes, Me), vh(Me);
          }
          te = te.next;
        } while (te !== null && te !== k);
        q === null ? j = P : q.next = W, ye(P, i.memoizedState) || rh(), i.memoizedState = P, i.baseState = j, i.baseQueue = q, o.lastRenderedState = P;
      }
      var kt = o.interleaved;
      if (kt !== null) {
        var $ = kt;
        do {
          var ne = $.lane;
          tn.lanes = xt(tn.lanes, ne), vh(ne), $ = $.next;
        } while ($ !== kt);
      } else h === null && (o.lanes = he);
      var I = o.dispatch;
      return [i.memoizedState, I];
    }
    function F0(e, t, a) {
      var i = Hi(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var f = o.dispatch, h = o.pending, S = i.memoizedState;
      if (h !== null) {
        o.pending = null;
        var x = h.next, b = x;
        do {
          var k = b.action;
          S = e(S, k), b = b.next;
        } while (b !== x);
        ye(S, i.memoizedState) || rh(), i.memoizedState = S, i.baseQueue === null && (i.baseState = S), o.lastRenderedState = S;
      }
      return [S, f];
    }
    function qz(e, t, a) {
    }
    function Kz(e, t, a) {
    }
    function j0(e, t, a) {
      var i = tn, o = Zl(), f, h = Vr();
      if (h) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        f = a(), Xf || f !== a() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), Xf = !0);
      } else {
        if (f = t(), !Xf) {
          var S = t();
          ye(f, S) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Xf = !0);
        }
        var x = gy();
        if (x === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        vf(x, sc) || aC(i, t, f);
      }
      o.memoizedState = f;
      var b = {
        value: f,
        getSnapshot: t
      };
      return o.queue = b, Ym(lC.bind(null, i, b, e), [e]), i.flags |= Zr, Xp(vr | Br, iC.bind(null, i, b, f, t), void 0, null), f;
    }
    function Vm(e, t, a) {
      var i = tn, o = Hi(), f = t();
      if (!Xf) {
        var h = t();
        ye(f, h) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), Xf = !0);
      }
      var S = o.memoizedState, x = !ye(S, f);
      x && (o.memoizedState = f, rh());
      var b = o.queue;
      if (Kp(lC.bind(null, i, b, e), [e]), b.getSnapshot !== t || x || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      gr !== null && gr.memoizedState.tag & vr) {
        i.flags |= Zr, Xp(vr | Br, iC.bind(null, i, b, f, t), void 0, null);
        var k = gy();
        if (k === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        vf(k, sc) || aC(i, t, f);
      }
      return f;
    }
    function aC(e, t, a) {
      e.flags |= bo;
      var i = {
        getSnapshot: t,
        value: a
      }, o = tn.updateQueue;
      if (o === null)
        o = rC(), tn.updateQueue = o, o.stores = [i];
      else {
        var f = o.stores;
        f === null ? o.stores = [i] : f.push(i);
      }
    }
    function iC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, uC(t) && oC(e);
    }
    function lC(e, t, a) {
      var i = function() {
        uC(t) && oC(e);
      };
      return a(i);
    }
    function uC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !ye(a, i);
      } catch {
        return !0;
      }
    }
    function oC(e) {
      var t = $a(e, st);
      t !== null && Cr(t, e, st, an);
    }
    function Bm(e) {
      var t = Zl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: he,
        dispatch: null,
        lastRenderedReducer: z0,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = LT.bind(null, tn, a);
      return [t.memoizedState, i];
    }
    function H0(e) {
      return U0(z0);
    }
    function P0(e) {
      return F0(z0);
    }
    function Xp(e, t, a, i) {
      var o = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, f = tn.updateQueue;
      if (f === null)
        f = rC(), tn.updateQueue = f, f.lastEffect = o.next = o;
      else {
        var h = f.lastEffect;
        if (h === null)
          f.lastEffect = o.next = o;
        else {
          var S = h.next;
          h.next = o, o.next = S, f.lastEffect = o;
        }
      }
      return o;
    }
    function V0(e) {
      var t = Zl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function $m(e) {
      var t = Hi();
      return t.memoizedState;
    }
    function qp(e, t, a, i) {
      var o = Zl(), f = i === void 0 ? null : i;
      tn.flags |= e, o.memoizedState = Xp(vr | t, a, void 0, f);
    }
    function Im(e, t, a, i) {
      var o = Hi(), f = i === void 0 ? null : i, h = void 0;
      if (yr !== null) {
        var S = yr.memoizedState;
        if (h = S.destroy, f !== null) {
          var x = S.deps;
          if (L0(f, x)) {
            o.memoizedState = Xp(t, a, h, f);
            return;
          }
        }
      }
      tn.flags |= e, o.memoizedState = Xp(vr | t, a, h, f);
    }
    function Ym(e, t) {
      return (tn.mode & Bt) !== Je ? qp(_i | Zr | Vc, Br, e, t) : qp(Zr | Vc, Br, e, t);
    }
    function Kp(e, t) {
      return Im(Zr, Br, e, t);
    }
    function B0(e, t) {
      return qp(Mt, Kl, e, t);
    }
    function Wm(e, t) {
      return Im(Mt, Kl, e, t);
    }
    function $0(e, t) {
      var a = Mt;
      return a |= qi, (tn.mode & Bt) !== Je && (a |= Ll), qp(a, mr, e, t);
    }
    function Qm(e, t) {
      return Im(Mt, mr, e, t);
    }
    function sC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var o = t;
        o.hasOwnProperty("current") || v("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(o).join(", ") + "}");
        var f = e();
        return o.current = f, function() {
          o.current = null;
        };
      }
    }
    function I0(e, t, a) {
      typeof t != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, o = Mt;
      return o |= qi, (tn.mode & Bt) !== Je && (o |= Ll), qp(o, mr, sC.bind(null, t, e), i);
    }
    function Gm(e, t, a) {
      typeof t != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Im(Mt, mr, sC.bind(null, t, e), i);
    }
    function DT(e, t) {
    }
    var Xm = DT;
    function Y0(e, t) {
      var a = Zl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function qm(e, t) {
      var a = Hi(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var f = o[1];
        if (L0(i, f))
          return o[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function W0(e, t) {
      var a = Zl(), i = t === void 0 ? null : t, o = e();
      return a.memoizedState = [o, i], o;
    }
    function Km(e, t) {
      var a = Hi(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var f = o[1];
        if (L0(i, f))
          return o[0];
      }
      var h = e();
      return a.memoizedState = [h, i], h;
    }
    function Q0(e) {
      var t = Zl();
      return t.memoizedState = e, e;
    }
    function cC(e) {
      var t = Hi(), a = yr, i = a.memoizedState;
      return dC(t, i, e);
    }
    function fC(e) {
      var t = Hi();
      if (yr === null)
        return t.memoizedState = e, e;
      var a = yr.memoizedState;
      return dC(t, a, e);
    }
    function dC(e, t, a) {
      var i = !Jd(sc);
      if (i) {
        if (!ye(a, t)) {
          var o = np();
          tn.lanes = xt(tn.lanes, o), vh(o), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, rh()), e.memoizedState = a, a;
    }
    function MT(e, t, a) {
      var i = Pa();
      In(kv(i, Mi)), e(!0);
      var o = Wp.transition;
      Wp.transition = {};
      var f = Wp.transition;
      Wp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (In(i), Wp.transition = o, o === null && f._updatedFibers) {
          var h = f._updatedFibers.size;
          h > 10 && C("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), f._updatedFibers.clear();
        }
      }
    }
    function G0() {
      var e = Bm(!1), t = e[0], a = e[1], i = MT.bind(null, a), o = Zl();
      return o.memoizedState = i, [t, i];
    }
    function pC() {
      var e = H0(), t = e[0], a = Hi(), i = a.memoizedState;
      return [t, i];
    }
    function hC() {
      var e = P0(), t = e[0], a = Hi(), i = a.memoizedState;
      return [t, i];
    }
    var vC = !1;
    function OT() {
      return vC;
    }
    function X0() {
      var e = Zl(), t = gy(), a = t.identifierPrefix, i;
      if (Vr()) {
        var o = G_();
        i = ":" + a + "R" + o;
        var f = Gp++;
        f > 0 && (i += "H" + f.toString(32)), i += ":";
      } else {
        var h = _T++;
        i = ":" + a + "r" + h.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Zm() {
      var e = Hi(), t = e.memoizedState;
      return t;
    }
    function NT(e, t, a) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Jo(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (mC(e))
        yC(t, o);
      else {
        var f = YE(e, t, o, i);
        if (f !== null) {
          var h = Ra();
          Cr(f, e, i, h), gC(f, t, i);
        }
      }
      SC(e, i);
    }
    function LT(e, t, a) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Jo(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (mC(e))
        yC(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === he && (f === null || f.lanes === he)) {
          var h = t.lastRenderedReducer;
          if (h !== null) {
            var S;
            S = Fe.current, Fe.current = sl;
            try {
              var x = t.lastRenderedState, b = h(x, a);
              if (o.hasEagerState = !0, o.eagerState = b, ye(b, x)) {
                yT(e, t, o, i);
                return;
              }
            } catch {
            } finally {
              Fe.current = S;
            }
          }
        }
        var k = YE(e, t, o, i);
        if (k !== null) {
          var P = Ra();
          Cr(k, e, i, P), gC(k, t, i);
        }
      }
      SC(e, i);
    }
    function mC(e) {
      var t = e.alternate;
      return e === tn || t !== null && t === tn;
    }
    function yC(e, t) {
      Qp = Pm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function gC(e, t, a) {
      if (tp(a)) {
        var i = t.lanes;
        i = rp(i, e.pendingLanes);
        var o = xt(i, a);
        t.lanes = o, yf(e, o);
      }
    }
    function SC(e, t, a) {
      bs(e, t);
    }
    var Jm = {
      readContext: lr,
      useCallback: ca,
      useContext: ca,
      useEffect: ca,
      useImperativeHandle: ca,
      useInsertionEffect: ca,
      useLayoutEffect: ca,
      useMemo: ca,
      useReducer: ca,
      useRef: ca,
      useState: ca,
      useDebugValue: ca,
      useDeferredValue: ca,
      useTransition: ca,
      useMutableSource: ca,
      useSyncExternalStore: ca,
      useId: ca,
      unstable_isNewReconciler: G
    }, xC = null, EC = null, CC = null, wC = null, Jl = null, sl = null, ey = null;
    {
      var q0 = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, vt = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      xC = {
        readContext: function(e) {
          return lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", Gt(), qf(t), Y0(e, t);
        },
        useContext: function(e) {
          return le = "useContext", Gt(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", Gt(), qf(t), Ym(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", Gt(), qf(a), I0(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", Gt(), qf(t), B0(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", Gt(), qf(t), $0(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", Gt(), qf(t);
          var a = Fe.current;
          Fe.current = Jl;
          try {
            return W0(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", Gt();
          var i = Fe.current;
          Fe.current = Jl;
          try {
            return A0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", Gt(), V0(e);
        },
        useState: function(e) {
          le = "useState", Gt();
          var t = Fe.current;
          Fe.current = Jl;
          try {
            return Bm(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", Gt(), void 0;
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", Gt(), Q0(e);
        },
        useTransition: function() {
          return le = "useTransition", Gt(), G0();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", Gt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", Gt(), j0(e, t, a);
        },
        useId: function() {
          return le = "useId", Gt(), X0();
        },
        unstable_isNewReconciler: G
      }, EC = {
        readContext: function(e) {
          return lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", _e(), Y0(e, t);
        },
        useContext: function(e) {
          return le = "useContext", _e(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", _e(), Ym(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", _e(), I0(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", _e(), B0(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", _e(), $0(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", _e();
          var a = Fe.current;
          Fe.current = Jl;
          try {
            return W0(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", _e();
          var i = Fe.current;
          Fe.current = Jl;
          try {
            return A0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", _e(), V0(e);
        },
        useState: function(e) {
          le = "useState", _e();
          var t = Fe.current;
          Fe.current = Jl;
          try {
            return Bm(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", _e(), void 0;
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", _e(), Q0(e);
        },
        useTransition: function() {
          return le = "useTransition", _e(), G0();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", _e(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", _e(), j0(e, t, a);
        },
        useId: function() {
          return le = "useId", _e(), X0();
        },
        unstable_isNewReconciler: G
      }, CC = {
        readContext: function(e) {
          return lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", _e(), qm(e, t);
        },
        useContext: function(e) {
          return le = "useContext", _e(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", _e(), Kp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", _e(), Gm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", _e(), Wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", _e(), Qm(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", _e();
          var a = Fe.current;
          Fe.current = sl;
          try {
            return Km(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", _e();
          var i = Fe.current;
          Fe.current = sl;
          try {
            return U0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", _e(), $m();
        },
        useState: function(e) {
          le = "useState", _e();
          var t = Fe.current;
          Fe.current = sl;
          try {
            return H0(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", _e(), Xm();
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", _e(), cC(e);
        },
        useTransition: function() {
          return le = "useTransition", _e(), pC();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", _e(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", _e(), Vm(e, t);
        },
        useId: function() {
          return le = "useId", _e(), Zm();
        },
        unstable_isNewReconciler: G
      }, wC = {
        readContext: function(e) {
          return lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", _e(), qm(e, t);
        },
        useContext: function(e) {
          return le = "useContext", _e(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", _e(), Kp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", _e(), Gm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", _e(), Wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", _e(), Qm(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", _e();
          var a = Fe.current;
          Fe.current = ey;
          try {
            return Km(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", _e();
          var i = Fe.current;
          Fe.current = ey;
          try {
            return F0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", _e(), $m();
        },
        useState: function(e) {
          le = "useState", _e();
          var t = Fe.current;
          Fe.current = ey;
          try {
            return P0(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", _e(), Xm();
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", _e(), fC(e);
        },
        useTransition: function() {
          return le = "useTransition", _e(), hC();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", _e(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", _e(), Vm(e, t);
        },
        useId: function() {
          return le = "useId", _e(), Zm();
        },
        unstable_isNewReconciler: G
      }, Jl = {
        readContext: function(e) {
          return q0(), lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", vt(), Gt(), Y0(e, t);
        },
        useContext: function(e) {
          return le = "useContext", vt(), Gt(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", vt(), Gt(), Ym(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", vt(), Gt(), I0(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", vt(), Gt(), B0(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", vt(), Gt(), $0(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", vt(), Gt();
          var a = Fe.current;
          Fe.current = Jl;
          try {
            return W0(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", vt(), Gt();
          var i = Fe.current;
          Fe.current = Jl;
          try {
            return A0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", vt(), Gt(), V0(e);
        },
        useState: function(e) {
          le = "useState", vt(), Gt();
          var t = Fe.current;
          Fe.current = Jl;
          try {
            return Bm(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", vt(), Gt(), void 0;
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", vt(), Gt(), Q0(e);
        },
        useTransition: function() {
          return le = "useTransition", vt(), Gt(), G0();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", vt(), Gt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", vt(), Gt(), j0(e, t, a);
        },
        useId: function() {
          return le = "useId", vt(), Gt(), X0();
        },
        unstable_isNewReconciler: G
      }, sl = {
        readContext: function(e) {
          return q0(), lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", vt(), _e(), qm(e, t);
        },
        useContext: function(e) {
          return le = "useContext", vt(), _e(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", vt(), _e(), Kp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", vt(), _e(), Gm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", vt(), _e(), Wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", vt(), _e(), Qm(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", vt(), _e();
          var a = Fe.current;
          Fe.current = sl;
          try {
            return Km(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", vt(), _e();
          var i = Fe.current;
          Fe.current = sl;
          try {
            return U0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", vt(), _e(), $m();
        },
        useState: function(e) {
          le = "useState", vt(), _e();
          var t = Fe.current;
          Fe.current = sl;
          try {
            return H0(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", vt(), _e(), Xm();
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", vt(), _e(), cC(e);
        },
        useTransition: function() {
          return le = "useTransition", vt(), _e(), pC();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", vt(), _e(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", vt(), _e(), Vm(e, t);
        },
        useId: function() {
          return le = "useId", vt(), _e(), Zm();
        },
        unstable_isNewReconciler: G
      }, ey = {
        readContext: function(e) {
          return q0(), lr(e);
        },
        useCallback: function(e, t) {
          return le = "useCallback", vt(), _e(), qm(e, t);
        },
        useContext: function(e) {
          return le = "useContext", vt(), _e(), lr(e);
        },
        useEffect: function(e, t) {
          return le = "useEffect", vt(), _e(), Kp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return le = "useImperativeHandle", vt(), _e(), Gm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return le = "useInsertionEffect", vt(), _e(), Wm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return le = "useLayoutEffect", vt(), _e(), Qm(e, t);
        },
        useMemo: function(e, t) {
          le = "useMemo", vt(), _e();
          var a = Fe.current;
          Fe.current = sl;
          try {
            return Km(e, t);
          } finally {
            Fe.current = a;
          }
        },
        useReducer: function(e, t, a) {
          le = "useReducer", vt(), _e();
          var i = Fe.current;
          Fe.current = sl;
          try {
            return F0(e, t, a);
          } finally {
            Fe.current = i;
          }
        },
        useRef: function(e) {
          return le = "useRef", vt(), _e(), $m();
        },
        useState: function(e) {
          le = "useState", vt(), _e();
          var t = Fe.current;
          Fe.current = sl;
          try {
            return P0(e);
          } finally {
            Fe.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return le = "useDebugValue", vt(), _e(), Xm();
        },
        useDeferredValue: function(e) {
          return le = "useDeferredValue", vt(), _e(), fC(e);
        },
        useTransition: function() {
          return le = "useTransition", vt(), _e(), hC();
        },
        useMutableSource: function(e, t, a) {
          return le = "useMutableSource", vt(), _e(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return le = "useSyncExternalStore", vt(), _e(), Vm(e, t);
        },
        useId: function() {
          return le = "useId", vt(), _e(), Zm();
        },
        unstable_isNewReconciler: G
      };
    }
    var Xo = c.unstable_now, RC = 0, ty = -1, Zp = -1, ny = -1, K0 = !1, ry = !1;
    function bC() {
      return K0;
    }
    function zT() {
      ry = !0;
    }
    function AT() {
      K0 = !1, ry = !1;
    }
    function UT() {
      K0 = ry, ry = !1;
    }
    function _C() {
      return RC;
    }
    function TC() {
      RC = Xo();
    }
    function Z0(e) {
      Zp = Xo(), e.actualStartTime < 0 && (e.actualStartTime = Xo());
    }
    function kC(e) {
      Zp = -1;
    }
    function ay(e, t) {
      if (Zp >= 0) {
        var a = Xo() - Zp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Zp = -1;
      }
    }
    function eu(e) {
      if (ty >= 0) {
        var t = Xo() - ty;
        ty = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case Ne:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function J0(e) {
      if (ny >= 0) {
        var t = Xo() - ny;
        ny = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case Ne:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function tu() {
      ty = Xo();
    }
    function eS() {
      ny = Xo();
    }
    function tS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function cl(e, t) {
      if (e && e.defaultProps) {
        var a = Et({}, t), i = e.defaultProps;
        for (var o in i)
          a[o] === void 0 && (a[o] = i[o]);
        return a;
      }
      return t;
    }
    var nS = {}, rS, aS, iS, lS, uS, DC, iy, oS, sS, cS, Jp;
    {
      rS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), iS = /* @__PURE__ */ new Set(), lS = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), uS = /* @__PURE__ */ new Set(), sS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), Jp = /* @__PURE__ */ new Set();
      var MC = /* @__PURE__ */ new Set();
      iy = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          MC.has(a) || (MC.add(a), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, DC = function(e, t) {
        if (t === void 0) {
          var a = zt(e) || "Component";
          uS.has(a) || (uS.add(a), v("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(nS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(nS);
    }
    function fS(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      {
        if (e.mode & en) {
          wn(!0);
          try {
            f = a(i, o);
          } finally {
            wn(!1);
          }
        }
        DC(t, f);
      }
      var h = f == null ? o : Et({}, o, f);
      if (e.memoizedState = h, e.lanes === he) {
        var S = e.updateQueue;
        S.baseState = h;
      }
    }
    var dS = {
      isMounted: dv,
      enqueueSetState: function(e, t, a) {
        var i = Ro(e), o = Ra(), f = Jo(i), h = Gu(o, f);
        h.payload = t, a != null && (iy(a, "setState"), h.callback = a);
        var S = Yo(i, h, f);
        S !== null && (Cr(S, i, f, o), zm(S, i, f)), bs(i, f);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Ro(e), o = Ra(), f = Jo(i), h = Gu(o, f);
        h.tag = QE, h.payload = t, a != null && (iy(a, "replaceState"), h.callback = a);
        var S = Yo(i, h, f);
        S !== null && (Cr(S, i, f, o), zm(S, i, f)), bs(i, f);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Ro(e), i = Ra(), o = Jo(a), f = Gu(i, o);
        f.tag = Om, t != null && (iy(t, "forceUpdate"), f.callback = t);
        var h = Yo(a, f, o);
        h !== null && (Cr(h, a, o, i), zm(h, a, o)), Gc(a, o);
      }
    };
    function OC(e, t, a, i, o, f, h) {
      var S = e.stateNode;
      if (typeof S.shouldComponentUpdate == "function") {
        var x = S.shouldComponentUpdate(i, f, h);
        {
          if (e.mode & en) {
            wn(!0);
            try {
              x = S.shouldComponentUpdate(i, f, h);
            } finally {
              wn(!1);
            }
          }
          x === void 0 && v("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", zt(t) || "Component");
        }
        return x;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Ie(a, i) || !Ie(o, f) : !0;
    }
    function FT(e, t, a) {
      var i = e.stateNode;
      {
        var o = zt(t) || "Component", f = i.render;
        f || (t.prototype && typeof t.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", o) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", o)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), i.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", o), i.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), t.childContextTypes && !Jp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & en) === Je && (Jp.add(t), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), t.contextTypes && !Jp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & en) === Je && (Jp.add(t), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), i.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", o), t.contextType && t.contextTypes && !sS.has(t) && (sS.add(t), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", o)), typeof i.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", zt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof i.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof i.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof i.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o);
        var h = i.props !== a;
        i.props !== void 0 && h && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o, o), i.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !iS.has(t) && (iS.add(t), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", zt(t))), typeof i.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof i.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof t.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o);
        var S = i.state;
        S && (typeof S != "object" || Ct(S)) && v("%s.state: must be set to an object or null", o), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o);
      }
    }
    function NC(e, t) {
      t.updater = dS, e.stateNode = t, Cu(t, e), t._reactInternalInstance = nS;
    }
    function LC(e, t, a) {
      var i = !1, o = fi, f = fi, h = t.contextType;
      if ("contextType" in t) {
        var S = (
          // Allow null for conditional declaration
          h === null || h !== void 0 && h.$$typeof === L && h._context === void 0
        );
        if (!S && !cS.has(t)) {
          cS.add(t);
          var x = "";
          h === void 0 ? x = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof h != "object" ? x = " However, it is set to a " + typeof h + "." : h.$$typeof === yi ? x = " Did you accidentally pass the Context.Provider instead?" : h._context !== void 0 ? x = " Did you accidentally pass the Context.Consumer instead?" : x = " However, it is set to an object with keys {" + Object.keys(h).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", zt(t) || "Component", x);
        }
      }
      if (typeof h == "object" && h !== null)
        f = lr(h);
      else {
        o = jf(e, t, !0);
        var b = t.contextTypes;
        i = b != null, f = i ? Hf(e, o) : fi;
      }
      var k = new t(a, f);
      if (e.mode & en) {
        wn(!0);
        try {
          k = new t(a, f);
        } finally {
          wn(!1);
        }
      }
      var P = e.memoizedState = k.state !== null && k.state !== void 0 ? k.state : null;
      NC(e, k);
      {
        if (typeof t.getDerivedStateFromProps == "function" && P === null) {
          var j = zt(t) || "Component";
          aS.has(j) || (aS.add(j), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", j, k.state === null ? "null" : "undefined", j));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof k.getSnapshotBeforeUpdate == "function") {
          var W = null, q = null, te = null;
          if (typeof k.componentWillMount == "function" && k.componentWillMount.__suppressDeprecationWarning !== !0 ? W = "componentWillMount" : typeof k.UNSAFE_componentWillMount == "function" && (W = "UNSAFE_componentWillMount"), typeof k.componentWillReceiveProps == "function" && k.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? q = "componentWillReceiveProps" : typeof k.UNSAFE_componentWillReceiveProps == "function" && (q = "UNSAFE_componentWillReceiveProps"), typeof k.componentWillUpdate == "function" && k.componentWillUpdate.__suppressDeprecationWarning !== !0 ? te = "componentWillUpdate" : typeof k.UNSAFE_componentWillUpdate == "function" && (te = "UNSAFE_componentWillUpdate"), W !== null || q !== null || te !== null) {
            var Me = zt(t) || "Component", rt = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            lS.has(Me) || (lS.add(Me), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Me, rt, W !== null ? `
  ` + W : "", q !== null ? `
  ` + q : "", te !== null ? `
  ` + te : ""));
          }
        }
      }
      return i && CE(e, o, f), k;
    }
    function jT(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", dt(e) || "Component"), dS.enqueueReplaceState(t, t.state, null));
    }
    function zC(e, t, a, i) {
      var o = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o) {
        {
          var f = dt(e) || "Component";
          rS.has(f) || (rS.add(f), v("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", f));
        }
        dS.enqueueReplaceState(t, t.state, null);
      }
    }
    function pS(e, t, a, i) {
      FT(e, t, a);
      var o = e.stateNode;
      o.props = a, o.state = e.memoizedState, o.refs = {}, C0(e);
      var f = t.contextType;
      if (typeof f == "object" && f !== null)
        o.context = lr(f);
      else {
        var h = jf(e, t, !0);
        o.context = Hf(e, h);
      }
      {
        if (o.state === a) {
          var S = zt(t) || "Component";
          oS.has(S) || (oS.add(S), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", S));
        }
        e.mode & en && ul.recordLegacyContextWarning(e, o), ul.recordUnsafeLifecycleWarnings(e, o);
      }
      o.state = e.memoizedState;
      var x = t.getDerivedStateFromProps;
      if (typeof x == "function" && (fS(e, t, x, a), o.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof o.getSnapshotBeforeUpdate != "function" && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (jT(e, o), Am(e, a, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function") {
        var b = Mt;
        b |= qi, (e.mode & Bt) !== Je && (b |= Ll), e.flags |= b;
      }
    }
    function HT(e, t, a, i) {
      var o = e.stateNode, f = e.memoizedProps;
      o.props = f;
      var h = o.context, S = t.contextType, x = fi;
      if (typeof S == "object" && S !== null)
        x = lr(S);
      else {
        var b = jf(e, t, !0);
        x = Hf(e, b);
      }
      var k = t.getDerivedStateFromProps, P = typeof k == "function" || typeof o.getSnapshotBeforeUpdate == "function";
      !P && (typeof o.UNSAFE_componentWillReceiveProps == "function" || typeof o.componentWillReceiveProps == "function") && (f !== a || h !== x) && zC(e, o, a, x), XE();
      var j = e.memoizedState, W = o.state = j;
      if (Am(e, a, o, i), W = e.memoizedState, f === a && j === W && !mm() && !Um()) {
        if (typeof o.componentDidMount == "function") {
          var q = Mt;
          q |= qi, (e.mode & Bt) !== Je && (q |= Ll), e.flags |= q;
        }
        return !1;
      }
      typeof k == "function" && (fS(e, t, k, a), W = e.memoizedState);
      var te = Um() || OC(e, t, f, a, j, W, x);
      if (te) {
        if (!P && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function") {
          var Me = Mt;
          Me |= qi, (e.mode & Bt) !== Je && (Me |= Ll), e.flags |= Me;
        }
      } else {
        if (typeof o.componentDidMount == "function") {
          var rt = Mt;
          rt |= qi, (e.mode & Bt) !== Je && (rt |= Ll), e.flags |= rt;
        }
        e.memoizedProps = a, e.memoizedState = W;
      }
      return o.props = a, o.state = W, o.context = x, te;
    }
    function PT(e, t, a, i, o) {
      var f = t.stateNode;
      GE(e, t);
      var h = t.memoizedProps, S = t.type === t.elementType ? h : cl(t.type, h);
      f.props = S;
      var x = t.pendingProps, b = f.context, k = a.contextType, P = fi;
      if (typeof k == "object" && k !== null)
        P = lr(k);
      else {
        var j = jf(t, a, !0);
        P = Hf(t, j);
      }
      var W = a.getDerivedStateFromProps, q = typeof W == "function" || typeof f.getSnapshotBeforeUpdate == "function";
      !q && (typeof f.UNSAFE_componentWillReceiveProps == "function" || typeof f.componentWillReceiveProps == "function") && (h !== x || b !== P) && zC(t, f, i, P), XE();
      var te = t.memoizedState, Me = f.state = te;
      if (Am(t, i, f, o), Me = t.memoizedState, h === x && te === Me && !mm() && !Um() && !ce)
        return typeof f.componentDidUpdate == "function" && (h !== e.memoizedProps || te !== e.memoizedState) && (t.flags |= Mt), typeof f.getSnapshotBeforeUpdate == "function" && (h !== e.memoizedProps || te !== e.memoizedState) && (t.flags |= Kn), !1;
      typeof W == "function" && (fS(t, a, W, i), Me = t.memoizedState);
      var rt = Um() || OC(t, a, S, i, te, Me, P) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ce;
      return rt ? (!q && (typeof f.UNSAFE_componentWillUpdate == "function" || typeof f.componentWillUpdate == "function") && (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, Me, P), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(i, Me, P)), typeof f.componentDidUpdate == "function" && (t.flags |= Mt), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= Kn)) : (typeof f.componentDidUpdate == "function" && (h !== e.memoizedProps || te !== e.memoizedState) && (t.flags |= Mt), typeof f.getSnapshotBeforeUpdate == "function" && (h !== e.memoizedProps || te !== e.memoizedState) && (t.flags |= Kn), t.memoizedProps = i, t.memoizedState = Me), f.props = i, f.state = Me, f.context = P, rt;
    }
    function cc(e, t) {
      return {
        value: e,
        source: t,
        stack: Ii(t),
        digest: null
      };
    }
    function hS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function VT(e, t) {
      return !0;
    }
    function vS(e, t) {
      try {
        var a = VT(e, t);
        if (a === !1)
          return;
        var i = t.value, o = t.source, f = t.stack, h = f !== null ? f : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === R)
            return;
          console.error(i);
        }
        var S = o ? dt(o) : null, x = S ? "The above error occurred in the <" + S + "> component:" : "The above error occurred in one of your React components:", b;
        if (e.tag === O)
          b = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var k = dt(e) || "Anonymous";
          b = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + k + ".");
        }
        var P = x + `
` + h + `

` + ("" + b);
        console.error(P);
      } catch (j) {
        setTimeout(function() {
          throw j;
        });
      }
    }
    var BT = typeof WeakMap == "function" ? WeakMap : Map;
    function AC(e, t, a) {
      var i = Gu(an, a);
      i.tag = x0, i.payload = {
        element: null
      };
      var o = t.value;
      return i.callback = function() {
        zD(o), vS(e, t);
      }, i;
    }
    function mS(e, t, a) {
      var i = Gu(an, a);
      i.tag = x0;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = t.value;
        i.payload = function() {
          return o(f);
        }, i.callback = function() {
          W1(e), vS(e, t);
        };
      }
      var h = e.stateNode;
      return h !== null && typeof h.componentDidCatch == "function" && (i.callback = function() {
        W1(e), vS(e, t), typeof o != "function" && ND(this);
        var x = t.value, b = t.stack;
        this.componentDidCatch(x, {
          componentStack: b !== null ? b : ""
        }), typeof o != "function" && (aa(e.lanes, st) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", dt(e) || "Unknown"));
      }), i;
    }
    function UC(e, t, a) {
      var i = e.pingCache, o;
      if (i === null ? (i = e.pingCache = new BT(), o = /* @__PURE__ */ new Set(), i.set(t, o)) : (o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o))), !o.has(a)) {
        o.add(a);
        var f = AD.bind(null, e, t, a);
        na && mh(e, a), t.then(f, f);
      }
    }
    function $T(e, t, a, i) {
      var o = e.updateQueue;
      if (o === null) {
        var f = /* @__PURE__ */ new Set();
        f.add(a), e.updateQueue = f;
      } else
        o.add(a);
    }
    function IT(e, t) {
      var a = e.tag;
      if ((e.mode & Rt) === Je && (a === _ || a === fe || a === xe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function FC(e) {
      var t = e;
      do {
        if (t.tag === de && RT(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function jC(e, t, a, i, o) {
      if ((e.mode & Rt) === Je) {
        if (e === t)
          e.flags |= nr;
        else {
          if (e.flags |= Ke, a.flags |= Pc, a.flags &= -52805, a.tag === R) {
            var f = a.alternate;
            if (f === null)
              a.tag = lt;
            else {
              var h = Gu(an, st);
              h.tag = Om, Yo(a, h, st);
            }
          }
          a.lanes = xt(a.lanes, st);
        }
        return e;
      }
      return e.flags |= nr, e.lanes = o, e;
    }
    function YT(e, t, a, i, o) {
      if (a.flags |= Ss, na && mh(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        var f = i;
        IT(a), Vr() && a.mode & Rt && DE();
        var h = FC(t);
        if (h !== null) {
          h.flags &= ~Tr, jC(h, t, a, e, o), h.mode & Rt && UC(e, f, o), $T(h, e, f);
          return;
        } else {
          if (!xv(o)) {
            UC(e, f, o), XS();
            return;
          }
          var S = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = S;
        }
      } else if (Vr() && a.mode & Rt) {
        DE();
        var x = FC(t);
        if (x !== null) {
          (x.flags & nr) === Ze && (x.flags |= Tr), jC(x, t, a, e, o), o0(cc(i, a));
          return;
        }
      }
      i = cc(i, a), RD(i);
      var b = t;
      do {
        switch (b.tag) {
          case O: {
            var k = i;
            b.flags |= nr;
            var P = zs(o);
            b.lanes = xt(b.lanes, P);
            var j = AC(b, k, P);
            w0(b, j);
            return;
          }
          case R:
            var W = i, q = b.type, te = b.stateNode;
            if ((b.flags & Ke) === Ze && (typeof q.getDerivedStateFromError == "function" || te !== null && typeof te.componentDidCatch == "function" && !F1(te))) {
              b.flags |= nr;
              var Me = zs(o);
              b.lanes = xt(b.lanes, Me);
              var rt = mS(b, W, Me);
              w0(b, rt);
              return;
            }
            break;
        }
        b = b.return;
      } while (b !== null);
    }
    function WT() {
      return null;
    }
    var eh = d.ReactCurrentOwner, fl = !1, yS, th, gS, SS, xS, fc, ES, ly, nh;
    yS = {}, th = {}, gS = {}, SS = {}, xS = {}, fc = !1, ES = {}, ly = {}, nh = {};
    function Ca(e, t, a, i) {
      e === null ? t.child = VE(t, null, a, i) : t.child = $f(t, e.child, a, i);
    }
    function QT(e, t, a, i) {
      t.child = $f(t, e.child, null, i), t.child = $f(t, null, a, i);
    }
    function HC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var f = a.propTypes;
        f && il(
          f,
          i,
          // Resolved props
          "prop",
          zt(a)
        );
      }
      var h = a.render, S = t.ref, x, b;
      Yf(t, o), ga(t);
      {
        if (eh.current = t, qn(!0), x = Kf(e, t, h, i, S, o), b = Zf(), t.mode & en) {
          wn(!0);
          try {
            x = Kf(e, t, h, i, S, o), b = Zf();
          } finally {
            wn(!1);
          }
        }
        qn(!1);
      }
      return Sa(), e !== null && !fl ? (tC(e, t, o), Xu(e, t, o)) : (Vr() && b && n0(t), t.flags |= li, Ca(e, t, x, o), t.child);
    }
    function PC(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        if (ZD(f) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var h = f;
          return h = ld(f), t.tag = xe, t.type = h, RS(t, f), VC(e, t, h, i, o);
        }
        {
          var S = f.propTypes;
          if (S && il(
            S,
            i,
            // Resolved props
            "prop",
            zt(f)
          ), a.defaultProps !== void 0) {
            var x = zt(f) || "Unknown";
            nh[x] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", x), nh[x] = !0);
          }
        }
        var b = lx(a.type, null, i, t, t.mode, o);
        return b.ref = t.ref, b.return = t, t.child = b, b;
      }
      {
        var k = a.type, P = k.propTypes;
        P && il(
          P,
          i,
          // Resolved props
          "prop",
          zt(k)
        );
      }
      var j = e.child, W = MS(e, o);
      if (!W) {
        var q = j.memoizedProps, te = a.compare;
        if (te = te !== null ? te : Ie, te(q, i) && e.ref === t.ref)
          return Xu(e, t, o);
      }
      t.flags |= li;
      var Me = mc(j, i);
      return Me.ref = t.ref, Me.return = t, t.child = Me, Me;
    }
    function VC(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var f = t.elementType;
        if (f.$$typeof === ht) {
          var h = f, S = h._payload, x = h._init;
          try {
            f = x(S);
          } catch {
            f = null;
          }
          var b = f && f.propTypes;
          b && il(
            b,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            zt(f)
          );
        }
      }
      if (e !== null) {
        var k = e.memoizedProps;
        if (Ie(k, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (fl = !1, t.pendingProps = i = k, MS(e, o))
            (e.flags & Pc) !== Ze && (fl = !0);
          else return t.lanes = e.lanes, Xu(e, t, o);
      }
      return CS(e, t, a, i, o);
    }
    function BC(e, t, a) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ee)
        if ((t.mode & Rt) === Je) {
          var h = {
            baseLanes: he,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = h, Sy(t, a);
        } else if (aa(a, ra)) {
          var P = {
            baseLanes: he,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = P;
          var j = f !== null ? f.baseLanes : a;
          Sy(t, j);
        } else {
          var S = null, x;
          if (f !== null) {
            var b = f.baseLanes;
            x = xt(b, a);
          } else
            x = a;
          t.lanes = t.childLanes = ra;
          var k = {
            baseLanes: x,
            cachePool: S,
            transitions: null
          };
          return t.memoizedState = k, t.updateQueue = null, Sy(t, x), null;
        }
      else {
        var W;
        f !== null ? (W = xt(f.baseLanes, a), t.memoizedState = null) : W = a, Sy(t, W);
      }
      return Ca(e, t, o, a), t.child;
    }
    function GT(e, t, a) {
      var i = t.pendingProps;
      return Ca(e, t, i, a), t.child;
    }
    function XT(e, t, a) {
      var i = t.pendingProps.children;
      return Ca(e, t, i, a), t.child;
    }
    function qT(e, t, a) {
      {
        t.flags |= Mt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var o = t.pendingProps, f = o.children;
      return Ca(e, t, f, a), t.child;
    }
    function $C(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= kn, t.flags |= _o);
    }
    function CS(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var f = a.propTypes;
        f && il(
          f,
          i,
          // Resolved props
          "prop",
          zt(a)
        );
      }
      var h;
      {
        var S = jf(t, a, !0);
        h = Hf(t, S);
      }
      var x, b;
      Yf(t, o), ga(t);
      {
        if (eh.current = t, qn(!0), x = Kf(e, t, a, i, h, o), b = Zf(), t.mode & en) {
          wn(!0);
          try {
            x = Kf(e, t, a, i, h, o), b = Zf();
          } finally {
            wn(!1);
          }
        }
        qn(!1);
      }
      return Sa(), e !== null && !fl ? (tC(e, t, o), Xu(e, t, o)) : (Vr() && b && n0(t), t.flags |= li, Ca(e, t, x, o), t.child);
    }
    function IC(e, t, a, i, o) {
      {
        switch (pM(t)) {
          case !1: {
            var f = t.stateNode, h = t.type, S = new h(t.memoizedProps, f.context), x = S.state;
            f.updater.enqueueSetState(f, x, null);
            break;
          }
          case !0: {
            t.flags |= Ke, t.flags |= nr;
            var b = new Error("Simulated error coming from DevTools"), k = zs(o);
            t.lanes = xt(t.lanes, k);
            var P = mS(t, cc(b, t), k);
            w0(t, P);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var j = a.propTypes;
          j && il(
            j,
            i,
            // Resolved props
            "prop",
            zt(a)
          );
        }
      }
      var W;
      ql(a) ? (W = !0, gm(t)) : W = !1, Yf(t, o);
      var q = t.stateNode, te;
      q === null ? (oy(e, t), LC(t, a, i), pS(t, a, i, o), te = !0) : e === null ? te = HT(t, a, i, o) : te = PT(e, t, a, i, o);
      var Me = wS(e, t, a, te, W, o);
      {
        var rt = t.stateNode;
        te && rt.props !== i && (fc || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", dt(t) || "a component"), fc = !0);
      }
      return Me;
    }
    function wS(e, t, a, i, o, f) {
      $C(e, t);
      var h = (t.flags & Ke) !== Ze;
      if (!i && !h)
        return o && bE(t, a, !1), Xu(e, t, f);
      var S = t.stateNode;
      eh.current = t;
      var x;
      if (h && typeof a.getDerivedStateFromError != "function")
        x = null, kC();
      else {
        ga(t);
        {
          if (qn(!0), x = S.render(), t.mode & en) {
            wn(!0);
            try {
              S.render();
            } finally {
              wn(!1);
            }
          }
          qn(!1);
        }
        Sa();
      }
      return t.flags |= li, e !== null && h ? QT(e, t, x, f) : Ca(e, t, x, f), t.memoizedState = S.state, o && bE(t, a, !0), t.child;
    }
    function YC(e) {
      var t = e.stateNode;
      t.pendingContext ? wE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && wE(e, t.context, !1), R0(e, t.containerInfo);
    }
    function KT(e, t, a) {
      if (YC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, o = t.memoizedState, f = o.element;
      GE(e, t), Am(t, i, null, a);
      var h = t.memoizedState;
      t.stateNode;
      var S = h.element;
      if (o.isDehydrated) {
        var x = {
          element: S,
          isDehydrated: !1,
          cache: h.cache,
          pendingSuspenseBoundaries: h.pendingSuspenseBoundaries,
          transitions: h.transitions
        }, b = t.updateQueue;
        if (b.baseState = x, t.memoizedState = x, t.flags & Tr) {
          var k = cc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return WC(e, t, S, a, k);
        } else if (S !== f) {
          var P = cc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return WC(e, t, S, a, P);
        } else {
          eT(t);
          var j = VE(t, null, S, a);
          t.child = j;
          for (var W = j; W; )
            W.flags = W.flags & ~Cn | Jr, W = W.sibling;
        }
      } else {
        if (Bf(), S === f)
          return Xu(e, t, a);
        Ca(e, t, S, a);
      }
      return t.child;
    }
    function WC(e, t, a, i, o) {
      return Bf(), o0(o), t.flags |= Tr, Ca(e, t, a, i), t.child;
    }
    function ZT(e, t, a) {
      ZE(t), e === null && u0(t);
      var i = t.type, o = t.pendingProps, f = e !== null ? e.memoizedProps : null, h = o.children, S = Bg(i, o);
      return S ? h = null : f !== null && Bg(i, f) && (t.flags |= za), $C(e, t), Ca(e, t, h, a), t.child;
    }
    function JT(e, t) {
      return e === null && u0(t), null;
    }
    function ek(e, t, a, i) {
      oy(e, t);
      var o = t.pendingProps, f = a, h = f._payload, S = f._init, x = S(h);
      t.type = x;
      var b = t.tag = JD(x), k = cl(x, o), P;
      switch (b) {
        case _:
          return RS(t, x), t.type = x = ld(x), P = CS(null, t, x, k, i), P;
        case R:
          return t.type = x = ex(x), P = IC(null, t, x, k, i), P;
        case fe:
          return t.type = x = tx(x), P = HC(null, t, x, k, i), P;
        case ge: {
          if (t.type !== t.elementType) {
            var j = x.propTypes;
            j && il(
              j,
              k,
              // Resolved for outer only
              "prop",
              zt(x)
            );
          }
          return P = PC(
            null,
            t,
            x,
            cl(x.type, k),
            // The inner type can have defaults too
            i
          ), P;
        }
      }
      var W = "";
      throw x !== null && typeof x == "object" && x.$$typeof === ht && (W = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + x + ". " + ("Lazy element type must resolve to a class or function." + W));
    }
    function tk(e, t, a, i, o) {
      oy(e, t), t.tag = R;
      var f;
      return ql(a) ? (f = !0, gm(t)) : f = !1, Yf(t, o), LC(t, a, i), pS(t, a, i, o), wS(null, t, a, !0, f, o);
    }
    function nk(e, t, a, i) {
      oy(e, t);
      var o = t.pendingProps, f;
      {
        var h = jf(t, a, !1);
        f = Hf(t, h);
      }
      Yf(t, i);
      var S, x;
      ga(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var b = zt(a) || "Unknown";
          yS[b] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", b, b), yS[b] = !0);
        }
        t.mode & en && ul.recordLegacyContextWarning(t, null), qn(!0), eh.current = t, S = Kf(null, t, a, o, f, i), x = Zf(), qn(!1);
      }
      if (Sa(), t.flags |= li, typeof S == "object" && S !== null && typeof S.render == "function" && S.$$typeof === void 0) {
        var k = zt(a) || "Unknown";
        th[k] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", k, k, k), th[k] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof S == "object" && S !== null && typeof S.render == "function" && S.$$typeof === void 0
      ) {
        {
          var P = zt(a) || "Unknown";
          th[P] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", P, P, P), th[P] = !0);
        }
        t.tag = R, t.memoizedState = null, t.updateQueue = null;
        var j = !1;
        return ql(a) ? (j = !0, gm(t)) : j = !1, t.memoizedState = S.state !== null && S.state !== void 0 ? S.state : null, C0(t), NC(t, S), pS(t, a, o, i), wS(null, t, a, !0, j, i);
      } else {
        if (t.tag = _, t.mode & en) {
          wn(!0);
          try {
            S = Kf(null, t, a, o, f, i), x = Zf();
          } finally {
            wn(!1);
          }
        }
        return Vr() && x && n0(t), Ca(null, t, S, i), RS(t, a), t.child;
      }
    }
    function RS(e, t) {
      {
        if (t && t.childContextTypes && v("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = zr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var o = i || "", f = e._debugSource;
          f && (o = f.fileName + ":" + f.lineNumber), xS[o] || (xS[o] = !0, v("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var h = zt(t) || "Unknown";
          nh[h] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", h), nh[h] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var S = zt(t) || "Unknown";
          SS[S] || (v("%s: Function components do not support getDerivedStateFromProps.", S), SS[S] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var x = zt(t) || "Unknown";
          gS[x] || (v("%s: Function components do not support contextType.", x), gS[x] = !0);
        }
      }
    }
    var bS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Ft
    };
    function _S(e) {
      return {
        baseLanes: e,
        cachePool: WT(),
        transitions: null
      };
    }
    function rk(e, t) {
      var a = null;
      return {
        baseLanes: xt(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function ak(e, t, a, i) {
      if (t !== null) {
        var o = t.memoizedState;
        if (o === null)
          return !1;
      }
      return T0(e, Yp);
    }
    function ik(e, t) {
      return As(e.childLanes, t);
    }
    function QC(e, t, a) {
      var i = t.pendingProps;
      hM(t) && (t.flags |= Ke);
      var o = ol.current, f = !1, h = (t.flags & Ke) !== Ze;
      if (h || ak(o, e) ? (f = !0, t.flags &= ~Ke) : (e === null || e.memoizedState !== null) && (o = wT(o, eC)), o = Qf(o), Qo(t, o), e === null) {
        u0(t);
        var S = t.memoizedState;
        if (S !== null) {
          var x = S.dehydrated;
          if (x !== null)
            return ck(t, x);
        }
        var b = i.children, k = i.fallback;
        if (f) {
          var P = lk(t, b, k, a), j = t.child;
          return j.memoizedState = _S(a), t.memoizedState = bS, P;
        } else
          return TS(t, b);
      } else {
        var W = e.memoizedState;
        if (W !== null) {
          var q = W.dehydrated;
          if (q !== null)
            return fk(e, t, h, i, q, W, a);
        }
        if (f) {
          var te = i.fallback, Me = i.children, rt = ok(e, t, Me, te, a), Ge = t.child, Lt = e.child.memoizedState;
          return Ge.memoizedState = Lt === null ? _S(a) : rk(Lt, a), Ge.childLanes = ik(e, a), t.memoizedState = bS, rt;
        } else {
          var kt = i.children, $ = uk(e, t, kt, a);
          return t.memoizedState = null, $;
        }
      }
    }
    function TS(e, t, a) {
      var i = e.mode, o = {
        mode: "visible",
        children: t
      }, f = kS(o, i);
      return f.return = e, e.child = f, f;
    }
    function lk(e, t, a, i) {
      var o = e.mode, f = e.child, h = {
        mode: "hidden",
        children: t
      }, S, x;
      return (o & Rt) === Je && f !== null ? (S = f, S.childLanes = he, S.pendingProps = h, e.mode & Vt && (S.actualDuration = 0, S.actualStartTime = -1, S.selfBaseDuration = 0, S.treeBaseDuration = 0), x = ts(a, o, i, null)) : (S = kS(h, o), x = ts(a, o, i, null)), S.return = e, x.return = e, S.sibling = x, e.child = S, x;
    }
    function kS(e, t, a) {
      return G1(e, t, he, null);
    }
    function GC(e, t) {
      return mc(e, t);
    }
    function uk(e, t, a, i) {
      var o = e.child, f = o.sibling, h = GC(o, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Rt) === Je && (h.lanes = i), h.return = t, h.sibling = null, f !== null) {
        var S = t.deletions;
        S === null ? (t.deletions = [f], t.flags |= La) : S.push(f);
      }
      return t.child = h, h;
    }
    function ok(e, t, a, i, o) {
      var f = t.mode, h = e.child, S = h.sibling, x = {
        mode: "hidden",
        children: a
      }, b;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (f & Rt) === Je && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== h
      ) {
        var k = t.child;
        b = k, b.childLanes = he, b.pendingProps = x, t.mode & Vt && (b.actualDuration = 0, b.actualStartTime = -1, b.selfBaseDuration = h.selfBaseDuration, b.treeBaseDuration = h.treeBaseDuration), t.deletions = null;
      } else
        b = GC(h, x), b.subtreeFlags = h.subtreeFlags & Vn;
      var P;
      return S !== null ? P = mc(S, i) : (P = ts(i, f, o, null), P.flags |= Cn), P.return = t, b.return = t, b.sibling = P, t.child = b, P;
    }
    function uy(e, t, a, i) {
      i !== null && o0(i), $f(t, e.child, null, a);
      var o = t.pendingProps, f = o.children, h = TS(t, f);
      return h.flags |= Cn, t.memoizedState = null, h;
    }
    function sk(e, t, a, i, o) {
      var f = t.mode, h = {
        mode: "visible",
        children: a
      }, S = kS(h, f), x = ts(i, f, o, null);
      return x.flags |= Cn, S.return = t, x.return = t, S.sibling = x, t.child = S, (t.mode & Rt) !== Je && $f(t, e.child, null, o), x;
    }
    function ck(e, t, a) {
      return (e.mode & Rt) === Je ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = st) : Wg(t) ? e.lanes = kr : e.lanes = ra, null;
    }
    function fk(e, t, a, i, o, f, h) {
      if (a)
        if (t.flags & Tr) {
          t.flags &= ~Tr;
          var $ = hS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return uy(e, t, h, $);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Ke, null;
          var ne = i.children, I = i.fallback, Ce = sk(e, t, ne, I, h), je = t.child;
          return je.memoizedState = _S(h), t.memoizedState = bS, Ce;
        }
      else {
        if (Z_(), (t.mode & Rt) === Je)
          return uy(
            e,
            t,
            h,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Wg(o)) {
          var S, x, b;
          {
            var k = v_(o);
            S = k.digest, x = k.message, b = k.stack;
          }
          var P;
          x ? P = new Error(x) : P = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var j = hS(P, S, b);
          return uy(e, t, h, j);
        }
        var W = aa(h, e.childLanes);
        if (fl || W) {
          var q = gy();
          if (q !== null) {
            var te = ip(q, h);
            if (te !== Ft && te !== f.retryLane) {
              f.retryLane = te;
              var Me = an;
              $a(e, te), Cr(q, e, te, Me);
            }
          }
          XS();
          var rt = hS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return uy(e, t, h, rt);
        } else if (yE(o)) {
          t.flags |= Ke, t.child = e.child;
          var Ge = UD.bind(null, e);
          return m_(o, Ge), null;
        } else {
          tT(t, o, f.treeContext);
          var Lt = i.children, kt = TS(t, Lt);
          return kt.flags |= Jr, kt;
        }
      }
    }
    function XC(e, t, a) {
      e.lanes = xt(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = xt(i.lanes, t)), g0(e.return, t, a);
    }
    function dk(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === de) {
          var o = i.memoizedState;
          o !== null && XC(i, a, e);
        } else if (i.tag === Ut)
          XC(i, a, e);
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
    function pk(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Hm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function hk(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !ES[e])
        if (ES[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              v('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              v('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              v('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          v('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function vk(e, t) {
      e !== void 0 && !ly[e] && (e !== "collapsed" && e !== "hidden" ? (ly[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (ly[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function qC(e, t) {
      {
        var a = Ct(e), i = !a && typeof gt(e) == "function";
        if (a || i) {
          var o = a ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", o, t, o), !1;
        }
      }
      return !0;
    }
    function mk(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Ct(e)) {
          for (var a = 0; a < e.length; a++)
            if (!qC(e[a], a))
              return;
        } else {
          var i = gt(e);
          if (typeof i == "function") {
            var o = i.call(e);
            if (o)
              for (var f = o.next(), h = 0; !f.done; f = o.next()) {
                if (!qC(f.value, h))
                  return;
                h++;
              }
          } else
            v('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function DS(e, t, a, i, o) {
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
    function KC(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail, h = i.children;
      hk(o), vk(f, o), mk(h, o), Ca(e, t, h, a);
      var S = ol.current, x = T0(S, Yp);
      if (x)
        S = k0(S, Yp), t.flags |= Ke;
      else {
        var b = e !== null && (e.flags & Ke) !== Ze;
        b && dk(t, t.child, a), S = Qf(S);
      }
      if (Qo(t, S), (t.mode & Rt) === Je)
        t.memoizedState = null;
      else
        switch (o) {
          case "forwards": {
            var k = pk(t.child), P;
            k === null ? (P = t.child, t.child = null) : (P = k.sibling, k.sibling = null), DS(
              t,
              !1,
              // isBackwards
              P,
              k,
              f
            );
            break;
          }
          case "backwards": {
            var j = null, W = t.child;
            for (t.child = null; W !== null; ) {
              var q = W.alternate;
              if (q !== null && Hm(q) === null) {
                t.child = W;
                break;
              }
              var te = W.sibling;
              W.sibling = j, j = W, W = te;
            }
            DS(
              t,
              !0,
              // isBackwards
              j,
              null,
              // last
              f
            );
            break;
          }
          case "together": {
            DS(
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
    function yk(e, t, a) {
      R0(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = $f(t, null, i, a) : Ca(e, t, i, a), t.child;
    }
    var ZC = !1;
    function gk(e, t, a) {
      var i = t.type, o = i._context, f = t.pendingProps, h = t.memoizedProps, S = f.value;
      {
        "value" in f || ZC || (ZC = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var x = t.type.propTypes;
        x && il(x, f, "prop", "Context.Provider");
      }
      if (IE(t, o, S), h !== null) {
        var b = h.value;
        if (ye(b, S)) {
          if (h.children === f.children && !mm())
            return Xu(e, t, a);
        } else
          hT(t, o, a);
      }
      var k = f.children;
      return Ca(e, t, k, a), t.child;
    }
    var JC = !1;
    function Sk(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (JC || (JC = !0, v("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var o = t.pendingProps, f = o.children;
      typeof f != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Yf(t, a);
      var h = lr(i);
      ga(t);
      var S;
      return eh.current = t, qn(!0), S = f(h), qn(!1), Sa(), t.flags |= li, Ca(e, t, S, a), t.child;
    }
    function rh() {
      fl = !0;
    }
    function oy(e, t) {
      (t.mode & Rt) === Je && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Cn);
    }
    function Xu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), kC(), vh(t.lanes), aa(a, t.childLanes) ? (dT(e, t), t.child) : null;
    }
    function xk(e, t, a) {
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
        return f === null ? (i.deletions = [e], i.flags |= La) : f.push(e), a.flags |= Cn, a;
      }
    }
    function MS(e, t) {
      var a = e.lanes;
      return !!aa(a, t);
    }
    function Ek(e, t, a) {
      switch (t.tag) {
        case O:
          YC(t), t.stateNode, Bf();
          break;
        case F:
          ZE(t);
          break;
        case R: {
          var i = t.type;
          ql(i) && gm(t);
          break;
        }
        case z:
          R0(t, t.stateNode.containerInfo);
          break;
        case we: {
          var o = t.memoizedProps.value, f = t.type._context;
          IE(t, f, o);
          break;
        }
        case Ne:
          {
            var h = aa(a, t.childLanes);
            h && (t.flags |= Mt);
            {
              var S = t.stateNode;
              S.effectDuration = 0, S.passiveEffectDuration = 0;
            }
          }
          break;
        case de: {
          var x = t.memoizedState;
          if (x !== null) {
            if (x.dehydrated !== null)
              return Qo(t, Qf(ol.current)), t.flags |= Ke, null;
            var b = t.child, k = b.childLanes;
            if (aa(a, k))
              return QC(e, t, a);
            Qo(t, Qf(ol.current));
            var P = Xu(e, t, a);
            return P !== null ? P.sibling : null;
          } else
            Qo(t, Qf(ol.current));
          break;
        }
        case Ut: {
          var j = (e.flags & Ke) !== Ze, W = aa(a, t.childLanes);
          if (j) {
            if (W)
              return KC(e, t, a);
            t.flags |= Ke;
          }
          var q = t.memoizedState;
          if (q !== null && (q.rendering = null, q.tail = null, q.lastEffect = null), Qo(t, ol.current), W)
            break;
          return null;
        }
        case Ve:
        case V:
          return t.lanes = he, BC(e, t, a);
      }
      return Xu(e, t, a);
    }
    function e1(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return xk(e, t, lx(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, o = t.pendingProps;
        if (i !== o || mm() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          fl = !0;
        else {
          var f = MS(e, a);
          if (!f && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Ke) === Ze)
            return fl = !1, Ek(e, t, a);
          (e.flags & Pc) !== Ze ? fl = !0 : fl = !1;
        }
      } else if (fl = !1, Vr() && W_(t)) {
        var h = t.index, S = Q_();
        kE(t, S, h);
      }
      switch (t.lanes = he, t.tag) {
        case D:
          return nk(e, t, t.type, a);
        case Xe: {
          var x = t.elementType;
          return ek(e, t, x, a);
        }
        case _: {
          var b = t.type, k = t.pendingProps, P = t.elementType === b ? k : cl(b, k);
          return CS(e, t, b, P, a);
        }
        case R: {
          var j = t.type, W = t.pendingProps, q = t.elementType === j ? W : cl(j, W);
          return IC(e, t, j, q, a);
        }
        case O:
          return KT(e, t, a);
        case F:
          return ZT(e, t, a);
        case oe:
          return JT(e, t);
        case de:
          return QC(e, t, a);
        case z:
          return yk(e, t, a);
        case fe: {
          var te = t.type, Me = t.pendingProps, rt = t.elementType === te ? Me : cl(te, Me);
          return HC(e, t, te, rt, a);
        }
        case ae:
          return GT(e, t, a);
        case ie:
          return XT(e, t, a);
        case Ne:
          return qT(e, t, a);
        case we:
          return gk(e, t, a);
        case ue:
          return Sk(e, t, a);
        case ge: {
          var Ge = t.type, Lt = t.pendingProps, kt = cl(Ge, Lt);
          if (t.type !== t.elementType) {
            var $ = Ge.propTypes;
            $ && il(
              $,
              kt,
              // Resolved for outer only
              "prop",
              zt(Ge)
            );
          }
          return kt = cl(Ge.type, kt), PC(e, t, Ge, kt, a);
        }
        case xe:
          return VC(e, t, t.type, t.pendingProps, a);
        case lt: {
          var ne = t.type, I = t.pendingProps, Ce = t.elementType === ne ? I : cl(ne, I);
          return tk(e, t, ne, Ce, a);
        }
        case Ut:
          return KC(e, t, a);
        case ze:
          break;
        case Ve:
          return BC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Jf(e) {
      e.flags |= Mt;
    }
    function t1(e) {
      e.flags |= kn, e.flags |= _o;
    }
    var n1, OS, r1, a1;
    n1 = function(e, t, a, i) {
      for (var o = t.child; o !== null; ) {
        if (o.tag === F || o.tag === oe)
          $b(e, o.stateNode);
        else if (o.tag !== z) {
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
    }, OS = function(e, t) {
    }, r1 = function(e, t, a, i, o) {
      var f = e.memoizedProps;
      if (f !== i) {
        var h = t.stateNode, S = b0(), x = Yb(h, a, f, i, o, S);
        t.updateQueue = x, x && Jf(t);
      }
    }, a1 = function(e, t, a, i) {
      a !== i && Jf(t);
    };
    function ah(e, t) {
      if (!Vr())
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
    function $r(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = he, i = Ze;
      if (t) {
        if ((e.mode & Vt) !== Je) {
          for (var x = e.selfBaseDuration, b = e.child; b !== null; )
            a = xt(a, xt(b.lanes, b.childLanes)), i |= b.subtreeFlags & Vn, i |= b.flags & Vn, x += b.treeBaseDuration, b = b.sibling;
          e.treeBaseDuration = x;
        } else
          for (var k = e.child; k !== null; )
            a = xt(a, xt(k.lanes, k.childLanes)), i |= k.subtreeFlags & Vn, i |= k.flags & Vn, k.return = e, k = k.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Vt) !== Je) {
          for (var o = e.actualDuration, f = e.selfBaseDuration, h = e.child; h !== null; )
            a = xt(a, xt(h.lanes, h.childLanes)), i |= h.subtreeFlags, i |= h.flags, o += h.actualDuration, f += h.treeBaseDuration, h = h.sibling;
          e.actualDuration = o, e.treeBaseDuration = f;
        } else
          for (var S = e.child; S !== null; )
            a = xt(a, xt(S.lanes, S.childLanes)), i |= S.subtreeFlags, i |= S.flags, S.return = e, S = S.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Ck(e, t, a) {
      if (lT() && (t.mode & Rt) !== Je && (t.flags & Ke) === Ze)
        return AE(t), Bf(), t.flags |= Tr | Ss | nr, !1;
      var i = wm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (aT(t), $r(t), (t.mode & Vt) !== Je) {
            var o = a !== null;
            if (o) {
              var f = t.child;
              f !== null && (t.treeBaseDuration -= f.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Bf(), (t.flags & Ke) === Ze && (t.memoizedState = null), t.flags |= Mt, $r(t), (t.mode & Vt) !== Je) {
            var h = a !== null;
            if (h) {
              var S = t.child;
              S !== null && (t.treeBaseDuration -= S.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return UE(), !0;
    }
    function i1(e, t, a) {
      var i = t.pendingProps;
      switch (r0(t), t.tag) {
        case D:
        case Xe:
        case xe:
        case _:
        case fe:
        case ae:
        case ie:
        case Ne:
        case ue:
        case ge:
          return $r(t), null;
        case R: {
          var o = t.type;
          return ql(o) && ym(t), $r(t), null;
        }
        case O: {
          var f = t.stateNode;
          if (Wf(t), Jg(t), M0(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), e === null || e.child === null) {
            var h = wm(t);
            if (h)
              Jf(t);
            else if (e !== null) {
              var S = e.memoizedState;
              // Check if this is a client root
              (!S.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Tr) !== Ze) && (t.flags |= Kn, UE());
            }
          }
          return OS(e, t), $r(t), null;
        }
        case F: {
          _0(t);
          var x = KE(), b = t.type;
          if (e !== null && t.stateNode != null)
            r1(e, t, b, i, x), e.ref !== t.ref && t1(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return $r(t), null;
            }
            var k = b0(), P = wm(t);
            if (P)
              nT(t, x, k) && Jf(t);
            else {
              var j = Bb(b, i, x, k, t);
              n1(j, t, !1, !1), t.stateNode = j, Ib(j, b, i, x) && Jf(t);
            }
            t.ref !== null && t1(t);
          }
          return $r(t), null;
        }
        case oe: {
          var W = i;
          if (e && t.stateNode != null) {
            var q = e.memoizedProps;
            a1(e, t, q, W);
          } else {
            if (typeof W != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var te = KE(), Me = b0(), rt = wm(t);
            rt ? rT(t) && Jf(t) : t.stateNode = Wb(W, te, Me, t);
          }
          return $r(t), null;
        }
        case de: {
          Gf(t);
          var Ge = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Lt = Ck(e, t, Ge);
            if (!Lt)
              return t.flags & nr ? t : null;
          }
          if ((t.flags & Ke) !== Ze)
            return t.lanes = a, (t.mode & Vt) !== Je && tS(t), t;
          var kt = Ge !== null, $ = e !== null && e.memoizedState !== null;
          if (kt !== $ && kt) {
            var ne = t.child;
            if (ne.flags |= Pn, (t.mode & Rt) !== Je) {
              var I = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              I || T0(ol.current, eC) ? wD() : XS();
            }
          }
          var Ce = t.updateQueue;
          if (Ce !== null && (t.flags |= Mt), $r(t), (t.mode & Vt) !== Je && kt) {
            var je = t.child;
            je !== null && (t.treeBaseDuration -= je.treeBaseDuration);
          }
          return null;
        }
        case z:
          return Wf(t), OS(e, t), e === null && H_(t.stateNode.containerInfo), $r(t), null;
        case we:
          var Le = t.type._context;
          return y0(Le, t), $r(t), null;
        case lt: {
          var ct = t.type;
          return ql(ct) && ym(t), $r(t), null;
        }
        case Ut: {
          Gf(t);
          var mt = t.memoizedState;
          if (mt === null)
            return $r(t), null;
          var nn = (t.flags & Ke) !== Ze, It = mt.rendering;
          if (It === null)
            if (nn)
              ah(mt, !1);
            else {
              var er = bD() && (e === null || (e.flags & Ke) === Ze);
              if (!er)
                for (var Yt = t.child; Yt !== null; ) {
                  var Qn = Hm(Yt);
                  if (Qn !== null) {
                    nn = !0, t.flags |= Ke, ah(mt, !1);
                    var fa = Qn.updateQueue;
                    return fa !== null && (t.updateQueue = fa, t.flags |= Mt), t.subtreeFlags = Ze, pT(t, a), Qo(t, k0(ol.current, Yp)), t.child;
                  }
                  Yt = Yt.sibling;
                }
              mt.tail !== null && Zn() > _1() && (t.flags |= Ke, nn = !0, ah(mt, !1), t.lanes = qd);
            }
          else {
            if (!nn) {
              var Gr = Hm(It);
              if (Gr !== null) {
                t.flags |= Ke, nn = !0;
                var pi = Gr.updateQueue;
                if (pi !== null && (t.updateQueue = pi, t.flags |= Mt), ah(mt, !0), mt.tail === null && mt.tailMode === "hidden" && !It.alternate && !Vr())
                  return $r(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Zn() * 2 - mt.renderingStartTime > _1() && a !== ra && (t.flags |= Ke, nn = !0, ah(mt, !1), t.lanes = qd);
            }
            if (mt.isBackwards)
              It.sibling = t.child, t.child = It;
            else {
              var ba = mt.last;
              ba !== null ? ba.sibling = It : t.child = It, mt.last = It;
            }
          }
          if (mt.tail !== null) {
            var _a = mt.tail;
            mt.rendering = _a, mt.tail = _a.sibling, mt.renderingStartTime = Zn(), _a.sibling = null;
            var da = ol.current;
            return nn ? da = k0(da, Yp) : da = Qf(da), Qo(t, da), _a;
          }
          return $r(t), null;
        }
        case ze:
          break;
        case Ve:
        case V: {
          GS(t);
          var eo = t.memoizedState, ud = eo !== null;
          if (e !== null) {
            var xh = e.memoizedState, au = xh !== null;
            au !== ud && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ee && (t.flags |= Pn);
          }
          return !ud || (t.mode & Rt) === Je ? $r(t) : aa(ru, ra) && ($r(t), t.subtreeFlags & (Cn | Mt) && (t.flags |= Pn)), null;
        }
        case Se:
          return null;
        case J:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function wk(e, t, a) {
      switch (r0(t), t.tag) {
        case R: {
          var i = t.type;
          ql(i) && ym(t);
          var o = t.flags;
          return o & nr ? (t.flags = o & ~nr | Ke, (t.mode & Vt) !== Je && tS(t), t) : null;
        }
        case O: {
          t.stateNode, Wf(t), Jg(t), M0();
          var f = t.flags;
          return (f & nr) !== Ze && (f & Ke) === Ze ? (t.flags = f & ~nr | Ke, t) : null;
        }
        case F:
          return _0(t), null;
        case de: {
          Gf(t);
          var h = t.memoizedState;
          if (h !== null && h.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Bf();
          }
          var S = t.flags;
          return S & nr ? (t.flags = S & ~nr | Ke, (t.mode & Vt) !== Je && tS(t), t) : null;
        }
        case Ut:
          return Gf(t), null;
        case z:
          return Wf(t), null;
        case we:
          var x = t.type._context;
          return y0(x, t), null;
        case Ve:
        case V:
          return GS(t), null;
        case Se:
          return null;
        default:
          return null;
      }
    }
    function l1(e, t, a) {
      switch (r0(t), t.tag) {
        case R: {
          var i = t.type.childContextTypes;
          i != null && ym(t);
          break;
        }
        case O: {
          t.stateNode, Wf(t), Jg(t), M0();
          break;
        }
        case F: {
          _0(t);
          break;
        }
        case z:
          Wf(t);
          break;
        case de:
          Gf(t);
          break;
        case Ut:
          Gf(t);
          break;
        case we:
          var o = t.type._context;
          y0(o, t);
          break;
        case Ve:
        case V:
          GS(t);
          break;
      }
    }
    var u1 = null;
    u1 = /* @__PURE__ */ new Set();
    var sy = !1, Ir = !1, Rk = typeof WeakSet == "function" ? WeakSet : Set, Ye = null, ed = null, td = null;
    function bk(e) {
      Nl(null, function() {
        throw e;
      }), gs();
    }
    var _k = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Vt)
        try {
          tu(), t.componentWillUnmount();
        } finally {
          eu(e);
        }
      else
        t.componentWillUnmount();
    };
    function o1(e, t) {
      try {
        qo(mr, e);
      } catch (a) {
        mn(e, t, a);
      }
    }
    function NS(e, t, a) {
      try {
        _k(e, a);
      } catch (i) {
        mn(e, t, i);
      }
    }
    function Tk(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        mn(e, t, i);
      }
    }
    function s1(e, t) {
      try {
        f1(e);
      } catch (a) {
        mn(e, t, a);
      }
    }
    function nd(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ae && et && e.mode & Vt)
              try {
                tu(), i = a(null);
              } finally {
                eu(e);
              }
            else
              i = a(null);
          } catch (o) {
            mn(e, t, o);
          }
          typeof i == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", dt(e));
        } else
          a.current = null;
    }
    function cy(e, t, a) {
      try {
        a();
      } catch (i) {
        mn(e, t, i);
      }
    }
    var c1 = !1;
    function kk(e, t) {
      Pb(e.containerInfo), Ye = t, Dk();
      var a = c1;
      return c1 = !1, a;
    }
    function Dk() {
      for (; Ye !== null; ) {
        var e = Ye, t = e.child;
        (e.subtreeFlags & zl) !== Ze && t !== null ? (t.return = e, Ye = t) : Mk();
      }
    }
    function Mk() {
      for (; Ye !== null; ) {
        var e = Ye;
        Kt(e);
        try {
          Ok(e);
        } catch (a) {
          mn(e, e.return, a);
        }
        vn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ye = t;
          return;
        }
        Ye = e.return;
      }
    }
    function Ok(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Kn) !== Ze) {
        switch (Kt(e), e.tag) {
          case _:
          case fe:
          case xe:
            break;
          case R: {
            if (t !== null) {
              var i = t.memoizedProps, o = t.memoizedState, f = e.stateNode;
              e.type === e.elementType && !fc && (f.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", dt(e) || "instance"), f.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", dt(e) || "instance"));
              var h = f.getSnapshotBeforeUpdate(e.elementType === e.type ? i : cl(e.type, i), o);
              {
                var S = u1;
                h === void 0 && !S.has(e.type) && (S.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", dt(e)));
              }
              f.__reactInternalSnapshotBeforeUpdate = h;
            }
            break;
          }
          case O: {
            {
              var x = e.stateNode;
              f_(x.containerInfo);
            }
            break;
          }
          case F:
          case oe:
          case z:
          case lt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        vn();
      }
    }
    function dl(e, t, a) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next, h = f;
        do {
          if ((h.tag & e) === e) {
            var S = h.destroy;
            h.destroy = void 0, S !== void 0 && ((e & Br) !== Ia ? Ji(t) : (e & mr) !== Ia && Es(t), (e & Kl) !== Ia && yh(!0), cy(t, a, S), (e & Kl) !== Ia && yh(!1), (e & Br) !== Ia ? jl() : (e & mr) !== Ia && Gd());
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
            (e & Br) !== Ia ? Qd(t) : (e & mr) !== Ia && Wc(t);
            var h = f.create;
            (e & Kl) !== Ia && yh(!0), f.destroy = h(), (e & Kl) !== Ia && yh(!1), (e & Br) !== Ia ? vv() : (e & mr) !== Ia && mv();
            {
              var S = f.destroy;
              if (S !== void 0 && typeof S != "function") {
                var x = void 0;
                (f.tag & mr) !== Ze ? x = "useLayoutEffect" : (f.tag & Kl) !== Ze ? x = "useInsertionEffect" : x = "useEffect";
                var b = void 0;
                S === null ? b = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof S.then == "function" ? b = `

It looks like you wrote ` + x + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + x + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : b = " You returned: " + S, v("%s must not return anything besides a function, which is used for clean-up.%s", x, b);
              }
            }
          }
          f = f.next;
        } while (f !== o);
      }
    }
    function Nk(e, t) {
      if ((t.flags & Mt) !== Ze)
        switch (t.tag) {
          case Ne: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, o = i.id, f = i.onPostCommit, h = _C(), S = t.alternate === null ? "mount" : "update";
            bC() && (S = "nested-update"), typeof f == "function" && f(o, S, a, h);
            var x = t.return;
            e: for (; x !== null; ) {
              switch (x.tag) {
                case O:
                  var b = x.stateNode;
                  b.passiveEffectDuration += a;
                  break e;
                case Ne:
                  var k = x.stateNode;
                  k.passiveEffectDuration += a;
                  break e;
              }
              x = x.return;
            }
            break;
          }
        }
    }
    function Lk(e, t, a, i) {
      if ((a.flags & Ul) !== Ze)
        switch (a.tag) {
          case _:
          case fe:
          case xe: {
            if (!Ir)
              if (a.mode & Vt)
                try {
                  tu(), qo(mr | vr, a);
                } finally {
                  eu(a);
                }
              else
                qo(mr | vr, a);
            break;
          }
          case R: {
            var o = a.stateNode;
            if (a.flags & Mt && !Ir)
              if (t === null)
                if (a.type === a.elementType && !fc && (o.props !== a.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", dt(a) || "instance"), o.state !== a.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", dt(a) || "instance")), a.mode & Vt)
                  try {
                    tu(), o.componentDidMount();
                  } finally {
                    eu(a);
                  }
                else
                  o.componentDidMount();
              else {
                var f = a.elementType === a.type ? t.memoizedProps : cl(a.type, t.memoizedProps), h = t.memoizedState;
                if (a.type === a.elementType && !fc && (o.props !== a.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", dt(a) || "instance"), o.state !== a.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", dt(a) || "instance")), a.mode & Vt)
                  try {
                    tu(), o.componentDidUpdate(f, h, o.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    eu(a);
                  }
                else
                  o.componentDidUpdate(f, h, o.__reactInternalSnapshotBeforeUpdate);
              }
            var S = a.updateQueue;
            S !== null && (a.type === a.elementType && !fc && (o.props !== a.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", dt(a) || "instance"), o.state !== a.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", dt(a) || "instance")), qE(a, S, o));
            break;
          }
          case O: {
            var x = a.updateQueue;
            if (x !== null) {
              var b = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case F:
                    b = a.child.stateNode;
                    break;
                  case R:
                    b = a.child.stateNode;
                    break;
                }
              qE(a, x, b);
            }
            break;
          }
          case F: {
            var k = a.stateNode;
            if (t === null && a.flags & Mt) {
              var P = a.type, j = a.memoizedProps;
              Kb(k, P, j);
            }
            break;
          }
          case oe:
            break;
          case z:
            break;
          case Ne: {
            {
              var W = a.memoizedProps, q = W.onCommit, te = W.onRender, Me = a.stateNode.effectDuration, rt = _C(), Ge = t === null ? "mount" : "update";
              bC() && (Ge = "nested-update"), typeof te == "function" && te(a.memoizedProps.id, Ge, a.actualDuration, a.treeBaseDuration, a.actualStartTime, rt);
              {
                typeof q == "function" && q(a.memoizedProps.id, Ge, Me, rt), MD(a);
                var Lt = a.return;
                e: for (; Lt !== null; ) {
                  switch (Lt.tag) {
                    case O:
                      var kt = Lt.stateNode;
                      kt.effectDuration += Me;
                      break e;
                    case Ne:
                      var $ = Lt.stateNode;
                      $.effectDuration += Me;
                      break e;
                  }
                  Lt = Lt.return;
                }
              }
            }
            break;
          }
          case de: {
            Vk(e, a);
            break;
          }
          case Ut:
          case lt:
          case ze:
          case Ve:
          case V:
          case J:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Ir || a.flags & kn && f1(a);
    }
    function zk(e) {
      switch (e.tag) {
        case _:
        case fe:
        case xe: {
          if (e.mode & Vt)
            try {
              tu(), o1(e, e.return);
            } finally {
              eu(e);
            }
          else
            o1(e, e.return);
          break;
        }
        case R: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Tk(e, e.return, t), s1(e, e.return);
          break;
        }
        case F: {
          s1(e, e.return);
          break;
        }
      }
    }
    function Ak(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === F) {
          if (a === null) {
            a = i;
            try {
              var o = i.stateNode;
              t ? u_(o) : s_(i.stateNode, i.memoizedProps);
            } catch (h) {
              mn(e, e.return, h);
            }
          }
        } else if (i.tag === oe) {
          if (a === null)
            try {
              var f = i.stateNode;
              t ? o_(f) : c_(f, i.memoizedProps);
            } catch (h) {
              mn(e, e.return, h);
            }
        } else if (!((i.tag === Ve || i.tag === V) && i.memoizedState !== null && i !== e)) {
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
    function f1(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case F:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var o;
          if (e.mode & Vt)
            try {
              tu(), o = t(i);
            } finally {
              eu(e);
            }
          else
            o = t(i);
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", dt(e));
        } else
          t.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", dt(e)), t.current = i;
      }
    }
    function Uk(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function d1(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, d1(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === F) {
          var a = e.stateNode;
          a !== null && B_(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Fk(e) {
      for (var t = e.return; t !== null; ) {
        if (p1(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function p1(e) {
      return e.tag === F || e.tag === O || e.tag === z;
    }
    function h1(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || p1(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== F && t.tag !== oe && t.tag !== bt; ) {
          if (t.flags & Cn || t.child === null || t.tag === z)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Cn))
          return t.stateNode;
      }
    }
    function jk(e) {
      var t = Fk(e);
      switch (t.tag) {
        case F: {
          var a = t.stateNode;
          t.flags & za && (mE(a), t.flags &= ~za);
          var i = h1(e);
          zS(e, i, a);
          break;
        }
        case O:
        case z: {
          var o = t.stateNode.containerInfo, f = h1(e);
          LS(e, f, o);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function LS(e, t, a) {
      var i = e.tag, o = i === F || i === oe;
      if (o) {
        var f = e.stateNode;
        t ? r_(a, f, t) : t_(a, f);
      } else if (i !== z) {
        var h = e.child;
        if (h !== null) {
          LS(h, t, a);
          for (var S = h.sibling; S !== null; )
            LS(S, t, a), S = S.sibling;
        }
      }
    }
    function zS(e, t, a) {
      var i = e.tag, o = i === F || i === oe;
      if (o) {
        var f = e.stateNode;
        t ? n_(a, f, t) : e_(a, f);
      } else if (i !== z) {
        var h = e.child;
        if (h !== null) {
          zS(h, t, a);
          for (var S = h.sibling; S !== null; )
            zS(S, t, a), S = S.sibling;
        }
      }
    }
    var Yr = null, pl = !1;
    function Hk(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case F: {
              Yr = i.stateNode, pl = !1;
              break e;
            }
            case O: {
              Yr = i.stateNode.containerInfo, pl = !0;
              break e;
            }
            case z: {
              Yr = i.stateNode.containerInfo, pl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Yr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        v1(e, t, a), Yr = null, pl = !1;
      }
      Uk(a);
    }
    function Ko(e, t, a) {
      for (var i = a.child; i !== null; )
        v1(e, t, i), i = i.sibling;
    }
    function v1(e, t, a) {
      switch (Id(a), a.tag) {
        case F:
          Ir || nd(a, t);
        // eslint-disable-next-line-no-fallthrough
        case oe: {
          {
            var i = Yr, o = pl;
            Yr = null, Ko(e, t, a), Yr = i, pl = o, Yr !== null && (pl ? i_(Yr, a.stateNode) : a_(Yr, a.stateNode));
          }
          return;
        }
        case bt: {
          Yr !== null && (pl ? l_(Yr, a.stateNode) : Yg(Yr, a.stateNode));
          return;
        }
        case z: {
          {
            var f = Yr, h = pl;
            Yr = a.stateNode.containerInfo, pl = !0, Ko(e, t, a), Yr = f, pl = h;
          }
          return;
        }
        case _:
        case fe:
        case ge:
        case xe: {
          if (!Ir) {
            var S = a.updateQueue;
            if (S !== null) {
              var x = S.lastEffect;
              if (x !== null) {
                var b = x.next, k = b;
                do {
                  var P = k, j = P.destroy, W = P.tag;
                  j !== void 0 && ((W & Kl) !== Ia ? cy(a, t, j) : (W & mr) !== Ia && (Es(a), a.mode & Vt ? (tu(), cy(a, t, j), eu(a)) : cy(a, t, j), Gd())), k = k.next;
                } while (k !== b);
              }
            }
          }
          Ko(e, t, a);
          return;
        }
        case R: {
          if (!Ir) {
            nd(a, t);
            var q = a.stateNode;
            typeof q.componentWillUnmount == "function" && NS(a, t, q);
          }
          Ko(e, t, a);
          return;
        }
        case ze: {
          Ko(e, t, a);
          return;
        }
        case Ve: {
          if (
            // TODO: Remove this dead flag
            a.mode & Rt
          ) {
            var te = Ir;
            Ir = te || a.memoizedState !== null, Ko(e, t, a), Ir = te;
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
    function Pk(e) {
      e.memoizedState;
    }
    function Vk(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var o = i.memoizedState;
          if (o !== null) {
            var f = o.dehydrated;
            f !== null && b_(f);
          }
        }
      }
    }
    function m1(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Rk()), t.forEach(function(i) {
          var o = FD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), na)
              if (ed !== null && td !== null)
                mh(td, ed);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(o, o);
          }
        });
      }
    }
    function Bk(e, t, a) {
      ed = a, td = e, Kt(t), y1(t, e), Kt(t), ed = null, td = null;
    }
    function hl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var o = 0; o < i.length; o++) {
          var f = i[o];
          try {
            Hk(e, t, f);
          } catch (x) {
            mn(f, t, x);
          }
        }
      var h = bl();
      if (t.subtreeFlags & Al)
        for (var S = t.child; S !== null; )
          Kt(S), y1(S, e), S = S.sibling;
      Kt(h);
    }
    function y1(e, t, a) {
      var i = e.alternate, o = e.flags;
      switch (e.tag) {
        case _:
        case fe:
        case ge:
        case xe: {
          if (hl(t, e), nu(e), o & Mt) {
            try {
              dl(Kl | vr, e, e.return), qo(Kl | vr, e);
            } catch (ct) {
              mn(e, e.return, ct);
            }
            if (e.mode & Vt) {
              try {
                tu(), dl(mr | vr, e, e.return);
              } catch (ct) {
                mn(e, e.return, ct);
              }
              eu(e);
            } else
              try {
                dl(mr | vr, e, e.return);
              } catch (ct) {
                mn(e, e.return, ct);
              }
          }
          return;
        }
        case R: {
          hl(t, e), nu(e), o & kn && i !== null && nd(i, i.return);
          return;
        }
        case F: {
          hl(t, e), nu(e), o & kn && i !== null && nd(i, i.return);
          {
            if (e.flags & za) {
              var f = e.stateNode;
              try {
                mE(f);
              } catch (ct) {
                mn(e, e.return, ct);
              }
            }
            if (o & Mt) {
              var h = e.stateNode;
              if (h != null) {
                var S = e.memoizedProps, x = i !== null ? i.memoizedProps : S, b = e.type, k = e.updateQueue;
                if (e.updateQueue = null, k !== null)
                  try {
                    Zb(h, k, b, x, S, e);
                  } catch (ct) {
                    mn(e, e.return, ct);
                  }
              }
            }
          }
          return;
        }
        case oe: {
          if (hl(t, e), nu(e), o & Mt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var P = e.stateNode, j = e.memoizedProps, W = i !== null ? i.memoizedProps : j;
            try {
              Jb(P, W, j);
            } catch (ct) {
              mn(e, e.return, ct);
            }
          }
          return;
        }
        case O: {
          if (hl(t, e), nu(e), o & Mt && i !== null) {
            var q = i.memoizedState;
            if (q.isDehydrated)
              try {
                R_(t.containerInfo);
              } catch (ct) {
                mn(e, e.return, ct);
              }
          }
          return;
        }
        case z: {
          hl(t, e), nu(e);
          return;
        }
        case de: {
          hl(t, e), nu(e);
          var te = e.child;
          if (te.flags & Pn) {
            var Me = te.stateNode, rt = te.memoizedState, Ge = rt !== null;
            if (Me.isHidden = Ge, Ge) {
              var Lt = te.alternate !== null && te.alternate.memoizedState !== null;
              Lt || CD();
            }
          }
          if (o & Mt) {
            try {
              Pk(e);
            } catch (ct) {
              mn(e, e.return, ct);
            }
            m1(e);
          }
          return;
        }
        case Ve: {
          var kt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Rt
          ) {
            var $ = Ir;
            Ir = $ || kt, hl(t, e), Ir = $;
          } else
            hl(t, e);
          if (nu(e), o & Pn) {
            var ne = e.stateNode, I = e.memoizedState, Ce = I !== null, je = e;
            if (ne.isHidden = Ce, Ce && !kt && (je.mode & Rt) !== Je) {
              Ye = je;
              for (var Le = je.child; Le !== null; )
                Ye = Le, Ik(Le), Le = Le.sibling;
            }
            Ak(je, Ce);
          }
          return;
        }
        case Ut: {
          hl(t, e), nu(e), o & Mt && m1(e);
          return;
        }
        case ze:
          return;
        default: {
          hl(t, e), nu(e);
          return;
        }
      }
    }
    function nu(e) {
      var t = e.flags;
      if (t & Cn) {
        try {
          jk(e);
        } catch (a) {
          mn(e, e.return, a);
        }
        e.flags &= ~Cn;
      }
      t & Jr && (e.flags &= ~Jr);
    }
    function $k(e, t, a) {
      ed = a, td = t, Ye = e, g1(e, t, a), ed = null, td = null;
    }
    function g1(e, t, a) {
      for (var i = (e.mode & Rt) !== Je; Ye !== null; ) {
        var o = Ye, f = o.child;
        if (o.tag === Ve && i) {
          var h = o.memoizedState !== null, S = h || sy;
          if (S) {
            AS(e, t, a);
            continue;
          } else {
            var x = o.alternate, b = x !== null && x.memoizedState !== null, k = b || Ir, P = sy, j = Ir;
            sy = S, Ir = k, Ir && !j && (Ye = o, Yk(o));
            for (var W = f; W !== null; )
              Ye = W, g1(
                W,
                // New root; bubble back up to here and stop.
                t,
                a
              ), W = W.sibling;
            Ye = o, sy = P, Ir = j, AS(e, t, a);
            continue;
          }
        }
        (o.subtreeFlags & Ul) !== Ze && f !== null ? (f.return = o, Ye = f) : AS(e, t, a);
      }
    }
    function AS(e, t, a) {
      for (; Ye !== null; ) {
        var i = Ye;
        if ((i.flags & Ul) !== Ze) {
          var o = i.alternate;
          Kt(i);
          try {
            Lk(t, o, i, a);
          } catch (h) {
            mn(i, i.return, h);
          }
          vn();
        }
        if (i === e) {
          Ye = null;
          return;
        }
        var f = i.sibling;
        if (f !== null) {
          f.return = i.return, Ye = f;
          return;
        }
        Ye = i.return;
      }
    }
    function Ik(e) {
      for (; Ye !== null; ) {
        var t = Ye, a = t.child;
        switch (t.tag) {
          case _:
          case fe:
          case ge:
          case xe: {
            if (t.mode & Vt)
              try {
                tu(), dl(mr, t, t.return);
              } finally {
                eu(t);
              }
            else
              dl(mr, t, t.return);
            break;
          }
          case R: {
            nd(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && NS(t, t.return, i);
            break;
          }
          case F: {
            nd(t, t.return);
            break;
          }
          case Ve: {
            var o = t.memoizedState !== null;
            if (o) {
              S1(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ye = a) : S1(e);
      }
    }
    function S1(e) {
      for (; Ye !== null; ) {
        var t = Ye;
        if (t === e) {
          Ye = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ye = a;
          return;
        }
        Ye = t.return;
      }
    }
    function Yk(e) {
      for (; Ye !== null; ) {
        var t = Ye, a = t.child;
        if (t.tag === Ve) {
          var i = t.memoizedState !== null;
          if (i) {
            x1(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ye = a) : x1(e);
      }
    }
    function x1(e) {
      for (; Ye !== null; ) {
        var t = Ye;
        Kt(t);
        try {
          zk(t);
        } catch (i) {
          mn(t, t.return, i);
        }
        if (vn(), t === e) {
          Ye = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ye = a;
          return;
        }
        Ye = t.return;
      }
    }
    function Wk(e, t, a, i) {
      Ye = t, Qk(t, e, a, i);
    }
    function Qk(e, t, a, i) {
      for (; Ye !== null; ) {
        var o = Ye, f = o.child;
        (o.subtreeFlags & Ki) !== Ze && f !== null ? (f.return = o, Ye = f) : Gk(e, t, a, i);
      }
    }
    function Gk(e, t, a, i) {
      for (; Ye !== null; ) {
        var o = Ye;
        if ((o.flags & Zr) !== Ze) {
          Kt(o);
          try {
            Xk(t, o, a, i);
          } catch (h) {
            mn(o, o.return, h);
          }
          vn();
        }
        if (o === e) {
          Ye = null;
          return;
        }
        var f = o.sibling;
        if (f !== null) {
          f.return = o.return, Ye = f;
          return;
        }
        Ye = o.return;
      }
    }
    function Xk(e, t, a, i) {
      switch (t.tag) {
        case _:
        case fe:
        case xe: {
          if (t.mode & Vt) {
            eS();
            try {
              qo(Br | vr, t);
            } finally {
              J0(t);
            }
          } else
            qo(Br | vr, t);
          break;
        }
      }
    }
    function qk(e) {
      Ye = e, Kk();
    }
    function Kk() {
      for (; Ye !== null; ) {
        var e = Ye, t = e.child;
        if ((Ye.flags & La) !== Ze) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var o = a[i];
              Ye = o, eD(o, e);
            }
            {
              var f = e.alternate;
              if (f !== null) {
                var h = f.child;
                if (h !== null) {
                  f.child = null;
                  do {
                    var S = h.sibling;
                    h.sibling = null, h = S;
                  } while (h !== null);
                }
              }
            }
            Ye = e;
          }
        }
        (e.subtreeFlags & Ki) !== Ze && t !== null ? (t.return = e, Ye = t) : Zk();
      }
    }
    function Zk() {
      for (; Ye !== null; ) {
        var e = Ye;
        (e.flags & Zr) !== Ze && (Kt(e), Jk(e), vn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ye = t;
          return;
        }
        Ye = e.return;
      }
    }
    function Jk(e) {
      switch (e.tag) {
        case _:
        case fe:
        case xe: {
          e.mode & Vt ? (eS(), dl(Br | vr, e, e.return), J0(e)) : dl(Br | vr, e, e.return);
          break;
        }
      }
    }
    function eD(e, t) {
      for (; Ye !== null; ) {
        var a = Ye;
        Kt(a), nD(a, t), vn();
        var i = a.child;
        i !== null ? (i.return = a, Ye = i) : tD(e);
      }
    }
    function tD(e) {
      for (; Ye !== null; ) {
        var t = Ye, a = t.sibling, i = t.return;
        if (d1(t), t === e) {
          Ye = null;
          return;
        }
        if (a !== null) {
          a.return = i, Ye = a;
          return;
        }
        Ye = i;
      }
    }
    function nD(e, t) {
      switch (e.tag) {
        case _:
        case fe:
        case xe: {
          e.mode & Vt ? (eS(), dl(Br, e, t), J0(e)) : dl(Br, e, t);
          break;
        }
      }
    }
    function rD(e) {
      switch (e.tag) {
        case _:
        case fe:
        case xe: {
          try {
            qo(mr | vr, e);
          } catch (a) {
            mn(e, e.return, a);
          }
          break;
        }
        case R: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            mn(e, e.return, a);
          }
          break;
        }
      }
    }
    function aD(e) {
      switch (e.tag) {
        case _:
        case fe:
        case xe: {
          try {
            qo(Br | vr, e);
          } catch (t) {
            mn(e, e.return, t);
          }
          break;
        }
      }
    }
    function iD(e) {
      switch (e.tag) {
        case _:
        case fe:
        case xe: {
          try {
            dl(mr | vr, e, e.return);
          } catch (a) {
            mn(e, e.return, a);
          }
          break;
        }
        case R: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && NS(e, e.return, t);
          break;
        }
      }
    }
    function lD(e) {
      switch (e.tag) {
        case _:
        case fe:
        case xe:
          try {
            dl(Br | vr, e, e.return);
          } catch (t) {
            mn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var ih = Symbol.for;
      ih("selector.component"), ih("selector.has_pseudo_class"), ih("selector.role"), ih("selector.test_id"), ih("selector.text");
    }
    var uD = [];
    function oD() {
      uD.forEach(function(e) {
        return e();
      });
    }
    var sD = d.ReactCurrentActQueue;
    function cD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function E1() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && sD.current !== null && v("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var fD = Math.ceil, US = d.ReactCurrentDispatcher, FS = d.ReactCurrentOwner, Wr = d.ReactCurrentBatchConfig, vl = d.ReactCurrentActQueue, Sr = (
      /*             */
      0
    ), C1 = (
      /*               */
      1
    ), Qr = (
      /*                */
      2
    ), Pi = (
      /*                */
      4
    ), qu = 0, lh = 1, dc = 2, fy = 3, uh = 4, w1 = 5, jS = 6, Nt = Sr, wa = null, Un = null, xr = he, ru = he, HS = Vo(he), Er = qu, oh = null, dy = he, sh = he, py = he, ch = null, Ya = null, PS = 0, R1 = 500, b1 = 1 / 0, dD = 500, Ku = null;
    function fh() {
      b1 = Zn() + dD;
    }
    function _1() {
      return b1;
    }
    var hy = !1, VS = null, rd = null, pc = !1, Zo = null, dh = he, BS = [], $S = null, pD = 50, ph = 0, IS = null, YS = !1, vy = !1, hD = 50, ad = 0, my = null, hh = an, yy = he, T1 = !1;
    function gy() {
      return wa;
    }
    function Ra() {
      return (Nt & (Qr | Pi)) !== Sr ? Zn() : (hh !== an || (hh = Zn()), hh);
    }
    function Jo(e) {
      var t = e.mode;
      if ((t & Rt) === Je)
        return st;
      if ((Nt & Qr) !== Sr && xr !== he)
        return zs(xr);
      var a = sT() !== oT;
      if (a) {
        if (Wr.transition !== null) {
          var i = Wr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return yy === Ft && (yy = np()), yy;
      }
      var o = Pa();
      if (o !== Ft)
        return o;
      var f = Qb();
      return f;
    }
    function vD(e) {
      var t = e.mode;
      return (t & Rt) === Je ? st : Cv();
    }
    function Cr(e, t, a, i) {
      HD(), T1 && v("useInsertionEffect must not schedule updates."), YS && (vy = !0), Mo(e, a, i), (Nt & Qr) !== he && e === wa ? BD(t) : (na && Fs(e, t, a), $D(t), e === wa && ((Nt & Qr) === Sr && (sh = xt(sh, a)), Er === uh && es(e, xr)), Wa(e, i), a === st && Nt === Sr && (t.mode & Rt) === Je && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !vl.isBatchingLegacy && (fh(), TE()));
    }
    function mD(e, t, a) {
      var i = e.current;
      i.lanes = t, Mo(e, t, a), Wa(e, a);
    }
    function yD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Nt & Qr) !== Sr
      );
    }
    function Wa(e, t) {
      var a = e.callbackNode;
      pf(e, t);
      var i = df(e, e === wa ? xr : he);
      if (i === he) {
        a !== null && $1(a), e.callbackNode = null, e.callbackPriority = Ft;
        return;
      }
      var o = Vl(i), f = e.callbackPriority;
      if (f === o && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(vl.current !== null && a !== ZS)) {
        a == null && f !== st && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && $1(a);
      var h;
      if (o === st)
        e.tag === Bo ? (vl.isBatchingLegacy !== null && (vl.didScheduleLegacyUpdate = !0), Y_(M1.bind(null, e))) : _E(M1.bind(null, e)), vl.current !== null ? vl.current.push($o) : Xb(function() {
          (Nt & (Qr | Pi)) === Sr && $o();
        }), h = null;
      else {
        var S;
        switch (Dv(i)) {
          case Ur:
            S = xs;
            break;
          case Mi:
            S = Fl;
            break;
          case ja:
            S = Zi;
            break;
          case Ha:
            S = Ru;
            break;
          default:
            S = Zi;
            break;
        }
        h = JS(S, k1.bind(null, e));
      }
      e.callbackPriority = o, e.callbackNode = h;
    }
    function k1(e, t) {
      if (AT(), hh = an, yy = he, (Nt & (Qr | Pi)) !== Sr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Ju();
      if (i && e.callbackNode !== a)
        return null;
      var o = df(e, e === wa ? xr : he);
      if (o === he)
        return null;
      var f = !vf(e, o) && !Ev(e, o) && !t, h = f ? TD(e, o) : xy(e, o);
      if (h !== qu) {
        if (h === dc) {
          var S = hf(e);
          S !== he && (o = S, h = WS(e, S));
        }
        if (h === lh) {
          var x = oh;
          throw hc(e, he), es(e, o), Wa(e, Zn()), x;
        }
        if (h === jS)
          es(e, o);
        else {
          var b = !vf(e, o), k = e.current.alternate;
          if (b && !SD(k)) {
            if (h = xy(e, o), h === dc) {
              var P = hf(e);
              P !== he && (o = P, h = WS(e, P));
            }
            if (h === lh) {
              var j = oh;
              throw hc(e, he), es(e, o), Wa(e, Zn()), j;
            }
          }
          e.finishedWork = k, e.finishedLanes = o, gD(e, h, o);
        }
      }
      return Wa(e, Zn()), e.callbackNode === a ? k1.bind(null, e) : null;
    }
    function WS(e, t) {
      var a = ch;
      if (gf(e)) {
        var i = hc(e, t);
        i.flags |= Tr, j_(e.containerInfo);
      }
      var o = xy(e, t);
      if (o !== dc) {
        var f = Ya;
        Ya = a, f !== null && D1(f);
      }
      return o;
    }
    function D1(e) {
      Ya === null ? Ya = e : Ya.push.apply(Ya, e);
    }
    function gD(e, t, a) {
      switch (t) {
        case qu:
        case lh:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case dc: {
          vc(e, Ya, Ku);
          break;
        }
        case fy: {
          if (es(e, a), Au(a) && // do not delay if we're inside an act() scope
          !I1()) {
            var i = PS + R1 - Zn();
            if (i > 10) {
              var o = df(e, he);
              if (o !== he)
                break;
              var f = e.suspendedLanes;
              if (!Uu(f, a)) {
                Ra(), mf(e, f);
                break;
              }
              e.timeoutHandle = $g(vc.bind(null, e, Ya, Ku), i);
              break;
            }
          }
          vc(e, Ya, Ku);
          break;
        }
        case uh: {
          if (es(e, a), ep(a))
            break;
          if (!I1()) {
            var h = oi(e, a), S = h, x = Zn() - S, b = jD(x) - x;
            if (b > 10) {
              e.timeoutHandle = $g(vc.bind(null, e, Ya, Ku), b);
              break;
            }
          }
          vc(e, Ya, Ku);
          break;
        }
        case w1: {
          vc(e, Ya, Ku);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function SD(e) {
      for (var t = e; ; ) {
        if (t.flags & bo) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var o = 0; o < i.length; o++) {
                var f = i[o], h = f.getSnapshot, S = f.value;
                try {
                  if (!ye(h(), S))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var x = t.child;
        if (t.subtreeFlags & bo && x !== null) {
          x.return = t, t = x;
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
      t = As(t, py), t = As(t, sh), bv(e, t);
    }
    function M1(e) {
      if (UT(), (Nt & (Qr | Pi)) !== Sr)
        throw new Error("Should not already be working.");
      Ju();
      var t = df(e, he);
      if (!aa(t, st))
        return Wa(e, Zn()), null;
      var a = xy(e, t);
      if (e.tag !== Bo && a === dc) {
        var i = hf(e);
        i !== he && (t = i, a = WS(e, i));
      }
      if (a === lh) {
        var o = oh;
        throw hc(e, he), es(e, t), Wa(e, Zn()), o;
      }
      if (a === jS)
        throw new Error("Root did not complete. This is a bug in React.");
      var f = e.current.alternate;
      return e.finishedWork = f, e.finishedLanes = t, vc(e, Ya, Ku), Wa(e, Zn()), null;
    }
    function xD(e, t) {
      t !== he && (yf(e, xt(t, st)), Wa(e, Zn()), (Nt & (Qr | Pi)) === Sr && (fh(), $o()));
    }
    function QS(e, t) {
      var a = Nt;
      Nt |= C1;
      try {
        return e(t);
      } finally {
        Nt = a, Nt === Sr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !vl.isBatchingLegacy && (fh(), TE());
      }
    }
    function ED(e, t, a, i, o) {
      var f = Pa(), h = Wr.transition;
      try {
        return Wr.transition = null, In(Ur), e(t, a, i, o);
      } finally {
        In(f), Wr.transition = h, Nt === Sr && fh();
      }
    }
    function Zu(e) {
      Zo !== null && Zo.tag === Bo && (Nt & (Qr | Pi)) === Sr && Ju();
      var t = Nt;
      Nt |= C1;
      var a = Wr.transition, i = Pa();
      try {
        return Wr.transition = null, In(Ur), e ? e() : void 0;
      } finally {
        In(i), Wr.transition = a, Nt = t, (Nt & (Qr | Pi)) === Sr && $o();
      }
    }
    function O1() {
      return (Nt & (Qr | Pi)) !== Sr;
    }
    function Sy(e, t) {
      sa(HS, ru, e), ru = xt(ru, t);
    }
    function GS(e) {
      ru = HS.current, oa(HS, e);
    }
    function hc(e, t) {
      e.finishedWork = null, e.finishedLanes = he;
      var a = e.timeoutHandle;
      if (a !== Ig && (e.timeoutHandle = Ig, Gb(a)), Un !== null)
        for (var i = Un.return; i !== null; ) {
          var o = i.alternate;
          l1(o, i), i = i.return;
        }
      wa = e;
      var f = mc(e.current, null);
      return Un = f, xr = ru = t, Er = qu, oh = null, dy = he, sh = he, py = he, ch = null, Ya = null, mT(), ul.discardPendingWarnings(), f;
    }
    function N1(e, t) {
      do {
        var a = Un;
        try {
          if (Dm(), nC(), vn(), FS.current = null, a === null || a.return === null) {
            Er = lh, oh = t, Un = null;
            return;
          }
          if (Ae && a.mode & Vt && ay(a, !0), Be)
            if (Sa(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Di(a, i, xr);
            } else
              Cs(a, t, xr);
          YT(e, a.return, a, t, xr), U1(a);
        } catch (o) {
          t = o, Un === a && a !== null ? (a = a.return, Un = a) : a = Un;
          continue;
        }
        return;
      } while (!0);
    }
    function L1() {
      var e = US.current;
      return US.current = Jm, e === null ? Jm : e;
    }
    function z1(e) {
      US.current = e;
    }
    function CD() {
      PS = Zn();
    }
    function vh(e) {
      dy = xt(e, dy);
    }
    function wD() {
      Er === qu && (Er = fy);
    }
    function XS() {
      (Er === qu || Er === fy || Er === dc) && (Er = uh), wa !== null && (Ls(dy) || Ls(sh)) && es(wa, xr);
    }
    function RD(e) {
      Er !== uh && (Er = dc), ch === null ? ch = [e] : ch.push(e);
    }
    function bD() {
      return Er === qu;
    }
    function xy(e, t) {
      var a = Nt;
      Nt |= Qr;
      var i = L1();
      if (wa !== e || xr !== t) {
        if (na) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (mh(e, xr), o.clear()), _v(e, t);
        }
        Ku = lp(), hc(e, t);
      }
      ku(t);
      do
        try {
          _D();
          break;
        } catch (f) {
          N1(e, f);
        }
      while (!0);
      if (Dm(), Nt = a, z1(i), Un !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Qc(), wa = null, xr = he, Er;
    }
    function _D() {
      for (; Un !== null; )
        A1(Un);
    }
    function TD(e, t) {
      var a = Nt;
      Nt |= Qr;
      var i = L1();
      if (wa !== e || xr !== t) {
        if (na) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (mh(e, xr), o.clear()), _v(e, t);
        }
        Ku = lp(), fh(), hc(e, t);
      }
      ku(t);
      do
        try {
          kD();
          break;
        } catch (f) {
          N1(e, f);
        }
      while (!0);
      return Dm(), z1(i), Nt = a, Un !== null ? (yv(), qu) : (Qc(), wa = null, xr = he, Er);
    }
    function kD() {
      for (; Un !== null && !Hd(); )
        A1(Un);
    }
    function A1(e) {
      var t = e.alternate;
      Kt(e);
      var a;
      (e.mode & Vt) !== Je ? (Z0(e), a = qS(t, e, ru), ay(e, !0)) : a = qS(t, e, ru), vn(), e.memoizedProps = e.pendingProps, a === null ? U1(e) : Un = a, FS.current = null;
    }
    function U1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Ss) === Ze) {
          Kt(t);
          var o = void 0;
          if ((t.mode & Vt) === Je ? o = i1(a, t, ru) : (Z0(t), o = i1(a, t, ru), ay(t, !1)), vn(), o !== null) {
            Un = o;
            return;
          }
        } else {
          var f = wk(a, t);
          if (f !== null) {
            f.flags &= fv, Un = f;
            return;
          }
          if ((t.mode & Vt) !== Je) {
            ay(t, !1);
            for (var h = t.actualDuration, S = t.child; S !== null; )
              h += S.actualDuration, S = S.sibling;
            t.actualDuration = h;
          }
          if (i !== null)
            i.flags |= Ss, i.subtreeFlags = Ze, i.deletions = null;
          else {
            Er = jS, Un = null;
            return;
          }
        }
        var x = t.sibling;
        if (x !== null) {
          Un = x;
          return;
        }
        t = i, Un = t;
      } while (t !== null);
      Er === qu && (Er = w1);
    }
    function vc(e, t, a) {
      var i = Pa(), o = Wr.transition;
      try {
        Wr.transition = null, In(Ur), DD(e, t, a, i);
      } finally {
        Wr.transition = o, In(i);
      }
      return null;
    }
    function DD(e, t, a, i) {
      do
        Ju();
      while (Zo !== null);
      if (PD(), (Nt & (Qr | Pi)) !== Sr)
        throw new Error("Should not already be working.");
      var o = e.finishedWork, f = e.finishedLanes;
      if (Yd(f), o === null)
        return Wd(), null;
      if (f === he && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = he, o === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Ft;
      var h = xt(o.lanes, o.childLanes);
      ap(e, h), e === wa && (wa = null, Un = null, xr = he), ((o.subtreeFlags & Ki) !== Ze || (o.flags & Ki) !== Ze) && (pc || (pc = !0, $S = a, JS(Zi, function() {
        return Ju(), null;
      })));
      var S = (o.subtreeFlags & (zl | Al | Ul | Ki)) !== Ze, x = (o.flags & (zl | Al | Ul | Ki)) !== Ze;
      if (S || x) {
        var b = Wr.transition;
        Wr.transition = null;
        var k = Pa();
        In(Ur);
        var P = Nt;
        Nt |= Pi, FS.current = null, kk(e, o), TC(), Bk(e, o, f), Vb(e.containerInfo), e.current = o, ws(f), $k(o, e, f), Rs(), Pd(), Nt = P, In(k), Wr.transition = b;
      } else
        e.current = o, TC();
      var j = pc;
      if (pc ? (pc = !1, Zo = e, dh = f) : (ad = 0, my = null), h = e.pendingLanes, h === he && (rd = null), j || P1(e.current, !1), Bd(o.stateNode, i), na && e.memoizedUpdaters.clear(), oD(), Wa(e, Zn()), t !== null)
        for (var W = e.onRecoverableError, q = 0; q < t.length; q++) {
          var te = t[q], Me = te.stack, rt = te.digest;
          W(te.value, {
            componentStack: Me,
            digest: rt
          });
        }
      if (hy) {
        hy = !1;
        var Ge = VS;
        throw VS = null, Ge;
      }
      return aa(dh, st) && e.tag !== Bo && Ju(), h = e.pendingLanes, aa(h, st) ? (zT(), e === IS ? ph++ : (ph = 0, IS = e)) : ph = 0, $o(), Wd(), null;
    }
    function Ju() {
      if (Zo !== null) {
        var e = Dv(dh), t = Hs(ja, e), a = Wr.transition, i = Pa();
        try {
          return Wr.transition = null, In(t), OD();
        } finally {
          In(i), Wr.transition = a;
        }
      }
      return !1;
    }
    function MD(e) {
      BS.push(e), pc || (pc = !0, JS(Zi, function() {
        return Ju(), null;
      }));
    }
    function OD() {
      if (Zo === null)
        return !1;
      var e = $S;
      $S = null;
      var t = Zo, a = dh;
      if (Zo = null, dh = he, (Nt & (Qr | Pi)) !== Sr)
        throw new Error("Cannot flush passive effects while already rendering.");
      YS = !0, vy = !1, Tu(a);
      var i = Nt;
      Nt |= Pi, qk(t.current), Wk(t, t.current, a, e);
      {
        var o = BS;
        BS = [];
        for (var f = 0; f < o.length; f++) {
          var h = o[f];
          Nk(t, h);
        }
      }
      Xd(), P1(t.current, !0), Nt = i, $o(), vy ? t === my ? ad++ : (ad = 0, my = t) : ad = 0, YS = !1, vy = !1, $d(t);
      {
        var S = t.current.stateNode;
        S.effectDuration = 0, S.passiveEffectDuration = 0;
      }
      return !0;
    }
    function F1(e) {
      return rd !== null && rd.has(e);
    }
    function ND(e) {
      rd === null ? rd = /* @__PURE__ */ new Set([e]) : rd.add(e);
    }
    function LD(e) {
      hy || (hy = !0, VS = e);
    }
    var zD = LD;
    function j1(e, t, a) {
      var i = cc(a, t), o = AC(e, i, st), f = Yo(e, o, st), h = Ra();
      f !== null && (Mo(f, st, h), Wa(f, h));
    }
    function mn(e, t, a) {
      if (bk(a), yh(!1), e.tag === O) {
        j1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === O) {
          j1(i, e, a);
          return;
        } else if (i.tag === R) {
          var o = i.type, f = i.stateNode;
          if (typeof o.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && !F1(f)) {
            var h = cc(a, e), S = mS(i, h, st), x = Yo(i, S, st), b = Ra();
            x !== null && (Mo(x, st, b), Wa(x, b));
            return;
          }
        }
        i = i.return;
      }
      v(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function AD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var o = Ra();
      mf(e, a), ID(e), wa === e && Uu(xr, a) && (Er === uh || Er === fy && Au(xr) && Zn() - PS < R1 ? hc(e, he) : py = xt(py, a)), Wa(e, o);
    }
    function H1(e, t) {
      t === Ft && (t = vD(e));
      var a = Ra(), i = $a(e, t);
      i !== null && (Mo(i, t, a), Wa(i, a));
    }
    function UD(e) {
      var t = e.memoizedState, a = Ft;
      t !== null && (a = t.retryLane), H1(e, a);
    }
    function FD(e, t) {
      var a = Ft, i;
      switch (e.tag) {
        case de:
          i = e.stateNode;
          var o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case Ut:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), H1(e, a);
    }
    function jD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : fD(e / 1960) * 1960;
    }
    function HD() {
      if (ph > pD)
        throw ph = 0, IS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      ad > hD && (ad = 0, my = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function PD() {
      ul.flushLegacyContextWarning(), ul.flushPendingUnsafeLifecycleWarnings();
    }
    function P1(e, t) {
      Kt(e), Ey(e, Ll, iD), t && Ey(e, _i, lD), Ey(e, Ll, rD), t && Ey(e, _i, aD), vn();
    }
    function Ey(e, t, a) {
      for (var i = e, o = null; i !== null; ) {
        var f = i.subtreeFlags & t;
        i !== o && i.child !== null && f !== Ze ? i = i.child : ((i.flags & t) !== Ze && a(i), i.sibling !== null ? i = i.sibling : i = o = i.return);
      }
    }
    var Cy = null;
    function V1(e) {
      {
        if ((Nt & Qr) !== Sr || !(e.mode & Rt))
          return;
        var t = e.tag;
        if (t !== D && t !== O && t !== R && t !== _ && t !== fe && t !== ge && t !== xe)
          return;
        var a = dt(e) || "ReactComponent";
        if (Cy !== null) {
          if (Cy.has(a))
            return;
          Cy.add(a);
        } else
          Cy = /* @__PURE__ */ new Set([a]);
        var i = cr;
        try {
          Kt(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Kt(e) : vn();
        }
      }
    }
    var qS;
    {
      var VD = null;
      qS = function(e, t, a) {
        var i = X1(VD, t);
        try {
          return e1(e, t, a);
        } catch (f) {
          if (J_() || f !== null && typeof f == "object" && typeof f.then == "function")
            throw f;
          if (Dm(), nC(), l1(e, t), X1(t, i), t.mode & Vt && Z0(t), Nl(null, e1, null, e, t, a), Xi()) {
            var o = gs();
            typeof o == "object" && o !== null && o._suppressLogging && typeof f == "object" && f !== null && !f._suppressLogging && (f._suppressLogging = !0);
          }
          throw f;
        }
      };
    }
    var B1 = !1, KS;
    KS = /* @__PURE__ */ new Set();
    function BD(e) {
      if (Si && !OT())
        switch (e.tag) {
          case _:
          case fe:
          case xe: {
            var t = Un && dt(Un) || "Unknown", a = t;
            if (!KS.has(a)) {
              KS.add(a);
              var i = dt(e) || "Unknown";
              v("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case R: {
            B1 || (v("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), B1 = !0);
            break;
          }
        }
    }
    function mh(e, t) {
      if (na) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Fs(e, i, t);
        });
      }
    }
    var ZS = {};
    function JS(e, t) {
      {
        var a = vl.current;
        return a !== null ? (a.push(t), ZS) : jd(e, t);
      }
    }
    function $1(e) {
      if (e !== ZS)
        return pv(e);
    }
    function I1() {
      return vl.current !== null;
    }
    function $D(e) {
      {
        if (e.mode & Rt) {
          if (!E1())
            return;
        } else if (!cD() || Nt !== Sr || e.tag !== _ && e.tag !== fe && e.tag !== xe)
          return;
        if (vl.current === null) {
          var t = cr;
          try {
            Kt(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, dt(e));
          } finally {
            t ? Kt(e) : vn();
          }
        }
      }
    }
    function ID(e) {
      e.tag !== Bo && E1() && vl.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function yh(e) {
      T1 = e;
    }
    var Vi = null, id = null, YD = function(e) {
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
    function ex(e) {
      return ld(e);
    }
    function tx(e) {
      {
        if (Vi === null)
          return e;
        var t = Vi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = ld(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: pe,
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
    function Y1(e, t) {
      {
        if (Vi === null)
          return !1;
        var a = e.elementType, i = t.type, o = !1, f = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case R: {
            typeof i == "function" && (o = !0);
            break;
          }
          case _: {
            (typeof i == "function" || f === ht) && (o = !0);
            break;
          }
          case fe: {
            (f === pe || f === ht) && (o = !0);
            break;
          }
          case ge:
          case xe: {
            (f === yt || f === ht) && (o = !0);
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
    function W1(e) {
      {
        if (Vi === null || typeof WeakSet != "function")
          return;
        id === null && (id = /* @__PURE__ */ new WeakSet()), id.add(e);
      }
    }
    var WD = function(e, t) {
      {
        if (Vi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Ju(), Zu(function() {
          nx(e.current, i, a);
        });
      }
    }, QD = function(e, t) {
      {
        if (e.context !== fi)
          return;
        Ju(), Zu(function() {
          gh(t, e, null, null);
        });
      }
    };
    function nx(e, t, a) {
      {
        var i = e.alternate, o = e.child, f = e.sibling, h = e.tag, S = e.type, x = null;
        switch (h) {
          case _:
          case xe:
          case R:
            x = S;
            break;
          case fe:
            x = S.render;
            break;
        }
        if (Vi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var b = !1, k = !1;
        if (x !== null) {
          var P = Vi(x);
          P !== void 0 && (a.has(P) ? k = !0 : t.has(P) && (h === R ? k = !0 : b = !0));
        }
        if (id !== null && (id.has(e) || i !== null && id.has(i)) && (k = !0), k && (e._debugNeedsRemount = !0), k || b) {
          var j = $a(e, st);
          j !== null && Cr(j, e, st, an);
        }
        o !== null && !k && nx(o, t, a), f !== null && nx(f, t, a);
      }
    }
    var GD = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(o) {
          return o.current;
        }));
        return rx(e.current, i, a), a;
      }
    };
    function rx(e, t, a) {
      {
        var i = e.child, o = e.sibling, f = e.tag, h = e.type, S = null;
        switch (f) {
          case _:
          case xe:
          case R:
            S = h;
            break;
          case fe:
            S = h.render;
            break;
        }
        var x = !1;
        S !== null && t.has(S) && (x = !0), x ? XD(e, a) : i !== null && rx(i, t, a), o !== null && rx(o, t, a);
      }
    }
    function XD(e, t) {
      {
        var a = qD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case F:
              t.add(i.stateNode);
              return;
            case z:
              t.add(i.stateNode.containerInfo);
              return;
            case O:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function qD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === F)
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
    var ax;
    {
      ax = !1;
      try {
        var Q1 = Object.preventExtensions({});
      } catch {
        ax = !0;
      }
    }
    function KD(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Ze, this.subtreeFlags = Ze, this.deletions = null, this.lanes = he, this.childLanes = he, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !ax && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var di = function(e, t, a, i) {
      return new KD(e, t, a, i);
    };
    function ix(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ZD(e) {
      return typeof e == "function" && !ix(e) && e.defaultProps === void 0;
    }
    function JD(e) {
      if (typeof e == "function")
        return ix(e) ? R : _;
      if (e != null) {
        var t = e.$$typeof;
        if (t === pe)
          return fe;
        if (t === yt)
          return ge;
      }
      return D;
    }
    function mc(e, t) {
      var a = e.alternate;
      a === null ? (a = di(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Ze, a.subtreeFlags = Ze, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Vn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case D:
        case _:
        case xe:
          a.type = ld(e.type);
          break;
        case R:
          a.type = ex(e.type);
          break;
        case fe:
          a.type = tx(e.type);
          break;
      }
      return a;
    }
    function eM(e, t) {
      e.flags &= Vn | Cn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = he, e.lanes = t, e.child = null, e.subtreeFlags = Ze, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Ze, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function tM(e, t, a) {
      var i;
      return e === Sm ? (i = Rt, t === !0 && (i |= en, i |= Bt)) : i = Je, na && (i |= Vt), di(O, null, null, i);
    }
    function lx(e, t, a, i, o, f) {
      var h = D, S = e;
      if (typeof e == "function")
        ix(e) ? (h = R, S = ex(S)) : S = ld(S);
      else if (typeof e == "string")
        h = F;
      else
        e: switch (e) {
          case vi:
            return ts(a.children, o, f, t);
          case Ka:
            h = ie, o |= en, (o & Rt) !== Je && (o |= Bt);
            break;
          case mi:
            return nM(a, o, f, t);
          case ke:
            return rM(a, o, f, t);
          case Pe:
            return aM(a, o, f, t);
          case Mn:
            return G1(a, o, f, t);
          case sn:
          // eslint-disable-next-line no-fallthrough
          case _t:
          // eslint-disable-next-line no-fallthrough
          case hn:
          // eslint-disable-next-line no-fallthrough
          case sr:
          // eslint-disable-next-line no-fallthrough
          case wt:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case yi:
                  h = we;
                  break e;
                case L:
                  h = ue;
                  break e;
                case pe:
                  h = fe, S = tx(S);
                  break e;
                case yt:
                  h = ge;
                  break e;
                case ht:
                  h = Xe, S = null;
                  break e;
              }
            var x = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var b = i ? dt(i) : null;
              b && (x += `

Check the render method of \`` + b + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + x));
          }
        }
      var k = di(h, a, t, o);
      return k.elementType = e, k.type = S, k.lanes = f, k._debugOwner = i, k;
    }
    function ux(e, t, a) {
      var i = null;
      i = e._owner;
      var o = e.type, f = e.key, h = e.props, S = lx(o, f, h, i, t, a);
      return S._debugSource = e._source, S._debugOwner = e._owner, S;
    }
    function ts(e, t, a, i) {
      var o = di(ae, e, i, t);
      return o.lanes = a, o;
    }
    function nM(e, t, a, i) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var o = di(Ne, e, i, t | Vt);
      return o.elementType = mi, o.lanes = a, o.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, o;
    }
    function rM(e, t, a, i) {
      var o = di(de, e, i, t);
      return o.elementType = ke, o.lanes = a, o;
    }
    function aM(e, t, a, i) {
      var o = di(Ut, e, i, t);
      return o.elementType = Pe, o.lanes = a, o;
    }
    function G1(e, t, a, i) {
      var o = di(Ve, e, i, t);
      o.elementType = Mn, o.lanes = a;
      var f = {
        isHidden: !1
      };
      return o.stateNode = f, o;
    }
    function ox(e, t, a) {
      var i = di(oe, e, null, t);
      return i.lanes = a, i;
    }
    function iM() {
      var e = di(F, null, null, Je);
      return e.elementType = "DELETED", e;
    }
    function lM(e) {
      var t = di(bt, null, null, Je);
      return t.stateNode = e, t;
    }
    function sx(e, t, a) {
      var i = e.children !== null ? e.children : [], o = di(z, i, e.key, t);
      return o.lanes = a, o.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, o;
    }
    function X1(e, t) {
      return e === null && (e = di(D, null, null, Je)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function uM(e, t, a, i, o) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Ig, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Ft, this.eventTimes = Us(he), this.expirationTimes = Us(an), this.pendingLanes = he, this.suspendedLanes = he, this.pingedLanes = he, this.expiredLanes = he, this.mutableReadLanes = he, this.finishedLanes = he, this.entangledLanes = he, this.entanglements = Us(he), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var f = this.pendingUpdatersLaneMap = [], h = 0; h < Du; h++)
          f.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Sm:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Bo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function q1(e, t, a, i, o, f, h, S, x, b) {
      var k = new uM(e, t, a, S, x), P = tM(t, f);
      k.current = P, P.stateNode = k;
      {
        var j = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        P.memoizedState = j;
      }
      return C0(P), k;
    }
    var cx = "18.3.1";
    function oM(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return wr(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: or,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var fx, dx;
    fx = !1, dx = {};
    function K1(e) {
      if (!e)
        return fi;
      var t = Ro(e), a = I_(t);
      if (t.tag === R) {
        var i = t.type;
        if (ql(i))
          return RE(t, i, a);
      }
      return a;
    }
    function sM(e, t) {
      {
        var a = Ro(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var o = ea(a);
        if (o === null)
          return null;
        if (o.mode & en) {
          var f = dt(a) || "Component";
          if (!dx[f]) {
            dx[f] = !0;
            var h = cr;
            try {
              Kt(o), a.mode & en ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, f) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, f);
            } finally {
              h ? Kt(h) : vn();
            }
          }
        }
        return o.stateNode;
      }
    }
    function Z1(e, t, a, i, o, f, h, S) {
      var x = !1, b = null;
      return q1(e, t, x, b, a, i, o, f, h);
    }
    function J1(e, t, a, i, o, f, h, S, x, b) {
      var k = !0, P = q1(a, i, k, e, o, f, h, S, x);
      P.context = K1(null);
      var j = P.current, W = Ra(), q = Jo(j), te = Gu(W, q);
      return te.callback = t ?? null, Yo(j, te, q), mD(P, q, W), P;
    }
    function gh(e, t, a, i) {
      Vd(t, e);
      var o = t.current, f = Ra(), h = Jo(o);
      Rn(h);
      var S = K1(a);
      t.context === null ? t.context = S : t.pendingContext = S, Si && cr !== null && !fx && (fx = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, dt(cr) || "Unknown"));
      var x = Gu(f, h);
      x.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), x.callback = i);
      var b = Yo(o, x, h);
      return b !== null && (Cr(b, o, h, f), zm(b, o, h)), h;
    }
    function wy(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case F:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function cM(e) {
      switch (e.tag) {
        case O: {
          var t = e.stateNode;
          if (gf(t)) {
            var a = Sv(t);
            xD(t, a);
          }
          break;
        }
        case de: {
          Zu(function() {
            var o = $a(e, st);
            if (o !== null) {
              var f = Ra();
              Cr(o, e, st, f);
            }
          });
          var i = st;
          px(e, i);
          break;
        }
      }
    }
    function ew(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Rv(a.retryLane, t));
    }
    function px(e, t) {
      ew(e, t);
      var a = e.alternate;
      a && ew(a, t);
    }
    function fM(e) {
      if (e.tag === de) {
        var t = Ms, a = $a(e, t);
        if (a !== null) {
          var i = Ra();
          Cr(a, e, t, i);
        }
        px(e, t);
      }
    }
    function dM(e) {
      if (e.tag === de) {
        var t = Jo(e), a = $a(e, t);
        if (a !== null) {
          var i = Ra();
          Cr(a, e, t, i);
        }
        px(e, t);
      }
    }
    function tw(e) {
      var t = gn(e);
      return t === null ? null : t.stateNode;
    }
    var nw = function(e) {
      return null;
    };
    function pM(e) {
      return nw(e);
    }
    var rw = function(e) {
      return !1;
    };
    function hM(e) {
      return rw(e);
    }
    var aw = null, iw = null, lw = null, uw = null, ow = null, sw = null, cw = null, fw = null, dw = null;
    {
      var pw = function(e, t, a) {
        var i = t[a], o = Ct(e) ? e.slice() : Et({}, e);
        return a + 1 === t.length ? (Ct(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = pw(e[i], t, a + 1), o);
      }, hw = function(e, t) {
        return pw(e, t, 0);
      }, vw = function(e, t, a, i) {
        var o = t[i], f = Ct(e) ? e.slice() : Et({}, e);
        if (i + 1 === t.length) {
          var h = a[i];
          f[h] = f[o], Ct(f) ? f.splice(o, 1) : delete f[o];
        } else
          f[o] = vw(
            // $FlowFixMe number or string is fine here
            e[o],
            t,
            a,
            i + 1
          );
        return f;
      }, mw = function(e, t, a) {
        if (t.length !== a.length) {
          C("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              C("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return vw(e, t, a, 0);
      }, yw = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var o = t[a], f = Ct(e) ? e.slice() : Et({}, e);
        return f[o] = yw(e[o], t, a + 1, i), f;
      }, gw = function(e, t, a) {
        return yw(e, t, 0, a);
      }, hx = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      aw = function(e, t, a, i) {
        var o = hx(e, t);
        if (o !== null) {
          var f = gw(o.memoizedState, a, i);
          o.memoizedState = f, o.baseState = f, e.memoizedProps = Et({}, e.memoizedProps);
          var h = $a(e, st);
          h !== null && Cr(h, e, st, an);
        }
      }, iw = function(e, t, a) {
        var i = hx(e, t);
        if (i !== null) {
          var o = hw(i.memoizedState, a);
          i.memoizedState = o, i.baseState = o, e.memoizedProps = Et({}, e.memoizedProps);
          var f = $a(e, st);
          f !== null && Cr(f, e, st, an);
        }
      }, lw = function(e, t, a, i) {
        var o = hx(e, t);
        if (o !== null) {
          var f = mw(o.memoizedState, a, i);
          o.memoizedState = f, o.baseState = f, e.memoizedProps = Et({}, e.memoizedProps);
          var h = $a(e, st);
          h !== null && Cr(h, e, st, an);
        }
      }, uw = function(e, t, a) {
        e.pendingProps = gw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = $a(e, st);
        i !== null && Cr(i, e, st, an);
      }, ow = function(e, t) {
        e.pendingProps = hw(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = $a(e, st);
        a !== null && Cr(a, e, st, an);
      }, sw = function(e, t, a) {
        e.pendingProps = mw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = $a(e, st);
        i !== null && Cr(i, e, st, an);
      }, cw = function(e) {
        var t = $a(e, st);
        t !== null && Cr(t, e, st, an);
      }, fw = function(e) {
        nw = e;
      }, dw = function(e) {
        rw = e;
      };
    }
    function vM(e) {
      var t = ea(e);
      return t === null ? null : t.stateNode;
    }
    function mM(e) {
      return null;
    }
    function yM() {
      return cr;
    }
    function gM(e) {
      var t = e.findFiberByHostInstance, a = d.ReactCurrentDispatcher;
      return To({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: aw,
        overrideHookStateDeletePath: iw,
        overrideHookStateRenamePath: lw,
        overrideProps: uw,
        overridePropsDeletePath: ow,
        overridePropsRenamePath: sw,
        setErrorHandler: fw,
        setSuspenseHandler: dw,
        scheduleUpdate: cw,
        currentDispatcherRef: a,
        findHostInstanceByFiber: vM,
        findFiberByHostInstance: t || mM,
        // React Refresh
        findHostInstancesForRefresh: GD,
        scheduleRefresh: WD,
        scheduleRoot: QD,
        setRefreshHandler: YD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: yM,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: cx
      });
    }
    var Sw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function vx(e) {
      this._internalRoot = e;
    }
    Ry.prototype.render = vx.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : by(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Hn) {
          var i = tw(t.current);
          i && i.parentNode !== a && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      gh(e, t, null, null);
    }, Ry.prototype.unmount = vx.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        O1() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Zu(function() {
          gh(null, e, null, null);
        }), SE(t);
      }
    };
    function SM(e, t) {
      if (!by(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      xw(e);
      var a = !1, i = !1, o = "", f = Sw;
      t != null && (t.hydrate ? C("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Nr && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (f = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var h = Z1(e, Sm, null, a, i, o, f);
      dm(h.current, e);
      var S = e.nodeType === Hn ? e.parentNode : e;
      return Rp(S), new vx(h);
    }
    function Ry(e) {
      this._internalRoot = e;
    }
    function xM(e) {
      e && zv(e);
    }
    Ry.prototype.unstable_scheduleHydration = xM;
    function EM(e, t, a) {
      if (!by(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      xw(e), t === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, o = a != null && a.hydratedSources || null, f = !1, h = !1, S = "", x = Sw;
      a != null && (a.unstable_strictMode === !0 && (f = !0), a.identifierPrefix !== void 0 && (S = a.identifierPrefix), a.onRecoverableError !== void 0 && (x = a.onRecoverableError));
      var b = J1(t, null, e, Sm, i, f, h, S, x);
      if (dm(b.current, e), Rp(e), o)
        for (var k = 0; k < o.length; k++) {
          var P = o[k];
          bT(b, P);
        }
      return new Ry(b);
    }
    function by(e) {
      return !!(e && (e.nodeType === Kr || e.nodeType === Gi || e.nodeType === _d));
    }
    function Sh(e) {
      return !!(e && (e.nodeType === Kr || e.nodeType === Gi || e.nodeType === _d || e.nodeType === Hn && e.nodeValue === " react-mount-point-unstable "));
    }
    function xw(e) {
      e.nodeType === Kr && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Ap(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var CM = d.ReactCurrentOwner, Ew;
    Ew = function(e) {
      if (e._reactRootContainer && e.nodeType !== Hn) {
        var t = tw(e._reactRootContainer.current);
        t && t.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = mx(e), o = !!(i && Po(i));
      o && !a && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Kr && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function mx(e) {
      return e ? e.nodeType === Gi ? e.documentElement : e.firstChild : null;
    }
    function Cw() {
    }
    function wM(e, t, a, i, o) {
      if (o) {
        if (typeof i == "function") {
          var f = i;
          i = function() {
            var j = wy(h);
            f.call(j);
          };
        }
        var h = J1(
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
          Cw
        );
        e._reactRootContainer = h, dm(h.current, e);
        var S = e.nodeType === Hn ? e.parentNode : e;
        return Rp(S), Zu(), h;
      } else {
        for (var x; x = e.lastChild; )
          e.removeChild(x);
        if (typeof i == "function") {
          var b = i;
          i = function() {
            var j = wy(k);
            b.call(j);
          };
        }
        var k = Z1(
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
          Cw
        );
        e._reactRootContainer = k, dm(k.current, e);
        var P = e.nodeType === Hn ? e.parentNode : e;
        return Rp(P), Zu(function() {
          gh(t, k, a, i);
        }), k;
      }
    }
    function RM(e, t) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function _y(e, t, a, i, o) {
      Ew(a), RM(o === void 0 ? null : o, "render");
      var f = a._reactRootContainer, h;
      if (!f)
        h = wM(a, t, e, o, i);
      else {
        if (h = f, typeof o == "function") {
          var S = o;
          o = function() {
            var x = wy(h);
            S.call(x);
          };
        }
        gh(t, h, e, o);
      }
      return wy(h);
    }
    var ww = !1;
    function bM(e) {
      {
        ww || (ww = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = CM.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", zt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Kr ? e : sM(e, "findDOMNode");
    }
    function _M(e, t, a) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Sh(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Ap(t) && t._reactRootContainer === void 0;
        i && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return _y(null, e, t, !0, a);
    }
    function TM(e, t, a) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Sh(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Ap(t) && t._reactRootContainer === void 0;
        i && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return _y(null, e, t, !1, a);
    }
    function kM(e, t, a, i) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Sh(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !pg(e))
        throw new Error("parentComponent must be a valid React Component");
      return _y(e, t, a, !1, i);
    }
    var Rw = !1;
    function DM(e) {
      if (Rw || (Rw = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Sh(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Ap(e) && e._reactRootContainer === void 0;
        t && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = mx(e), i = a && !Po(a);
          i && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Zu(function() {
          _y(null, null, e, !1, function() {
            e._reactRootContainer = null, SE(e);
          });
        }), !0;
      } else {
        {
          var o = mx(e), f = !!(o && Po(o)), h = e.nodeType === Kr && Sh(e.parentNode) && !!e.parentNode._reactRootContainer;
          f && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", h ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Dr(cM), Oo(fM), Mv(dM), Vs(Pa), up(Tv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), zc(Ob), dg(QS, ED, Zu);
    function MM(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!by(t))
        throw new Error("Target container is not a DOM element.");
      return oM(e, t, null, a);
    }
    function OM(e, t, a, i) {
      return kM(e, t, a, i);
    }
    var yx = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Po, Ff, pm, xo, Ac, QS]
    };
    function NM(e, t) {
      return yx.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), SM(e, t);
    }
    function LM(e, t, a) {
      return yx.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), EM(e, t, a);
    }
    function zM(e) {
      return O1() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Zu(e);
    }
    var AM = gM({
      findFiberByHostInstance: tc,
      bundleType: 1,
      version: cx,
      rendererPackageName: "react-dom"
    });
    if (!AM && _n && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var bw = window.location.protocol;
      /^(https?|file):$/.test(bw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (bw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ga.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yx, Ga.createPortal = MM, Ga.createRoot = NM, Ga.findDOMNode = bM, Ga.flushSync = zM, Ga.hydrate = _M, Ga.hydrateRoot = LM, Ga.render = TM, Ga.unmountComponentAtNode = DM, Ga.unstable_batchedUpdates = QS, Ga.unstable_renderSubtreeIntoContainer = OM, Ga.version = cx, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Ga;
}
var Fw;
function QM() {
  if (Fw) return Dy.exports;
  Fw = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (c) {
        console.error(c);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (l(), Dy.exports = YM()) : Dy.exports = WM(), Dy.exports;
}
var jw;
function GM() {
  if (jw) return od;
  jw = 1;
  var l = QM();
  if (process.env.NODE_ENV === "production")
    od.createRoot = l.createRoot, od.hydrateRoot = l.hydrateRoot;
  else {
    var c = l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    od.createRoot = function(d, y) {
      c.usingClientEntryPoint = !0;
      try {
        return l.createRoot(d, y);
      } finally {
        c.usingClientEntryPoint = !1;
      }
    }, od.hydrateRoot = function(d, y, g) {
      c.usingClientEntryPoint = !0;
      try {
        return l.hydrateRoot(d, y, g);
      } finally {
        c.usingClientEntryPoint = !1;
      }
    };
  }
  return od;
}
var XM = GM();
let yR = Oe.createContext(
  /** @type {any} */
  null
);
function qM() {
  let l = Oe.useContext(yR);
  if (!l) throw new Error("RenderContext not found");
  return l;
}
function KM() {
  return qM().model;
}
function sd(l) {
  let c = KM(), [d, y] = Oe.useState(c.get(l));
  return Oe.useEffect(() => {
    let g = () => y(c.get(l));
    return c.on(`change:${l}`, g), () => c.off(`change:${l}`, g);
  }, [c, l]), [
    d,
    (g) => {
      c.set(l, g), c.save_changes();
    }
  ];
}
function ZM(l) {
  return ({ el: c, model: d, experimental: y }) => {
    let g = XM.createRoot(c);
    return g.render(
      Oe.createElement(
        Oe.StrictMode,
        null,
        Oe.createElement(
          yR.Provider,
          { value: { model: d, experimental: y } },
          Oe.createElement(l)
        )
      )
    ), () => g.unmount();
  };
}
function Uy(l, c) {
  return l == null || c == null ? NaN : l < c ? -1 : l > c ? 1 : l >= c ? 0 : NaN;
}
function JM(l, c) {
  return l == null || c == null ? NaN : c < l ? -1 : c > l ? 1 : c >= l ? 0 : NaN;
}
function gR(l) {
  let c, d, y;
  l.length !== 2 ? (c = Uy, d = (T, _) => Uy(l(T), _), y = (T, _) => l(T) - _) : (c = l === Uy || l === JM ? l : eO, d = l, y = l);
  function g(T, _, R = 0, D = T.length) {
    if (R < D) {
      if (c(_, _) !== 0) return D;
      do {
        const O = R + D >>> 1;
        d(T[O], _) < 0 ? R = O + 1 : D = O;
      } while (R < D);
    }
    return R;
  }
  function C(T, _, R = 0, D = T.length) {
    if (R < D) {
      if (c(_, _) !== 0) return D;
      do {
        const O = R + D >>> 1;
        d(T[O], _) <= 0 ? R = O + 1 : D = O;
      } while (R < D);
    }
    return R;
  }
  function v(T, _, R = 0, D = T.length) {
    const O = g(T, _, R, D - 1);
    return O > R && y(T[O - 1], _) > -y(T[O], _) ? O - 1 : O;
  }
  return { left: g, center: v, right: C };
}
function eO() {
  return 0;
}
function tO(l) {
  return l === null ? NaN : +l;
}
const nO = gR(Uy), rO = nO.right;
gR(tO).center;
function SR(l, c) {
  let d, y;
  for (const g of l)
    g != null && (d === void 0 ? g >= g && (d = y = g) : (d > g && (d = g), y < g && (y = g)));
  return [d, y];
}
const aO = Math.sqrt(50), iO = Math.sqrt(10), lO = Math.sqrt(2);
function Vy(l, c, d) {
  const y = (c - l) / Math.max(0, d), g = Math.floor(Math.log10(y)), C = y / Math.pow(10, g), v = C >= aO ? 10 : C >= iO ? 5 : C >= lO ? 2 : 1;
  let T, _, R;
  return g < 0 ? (R = Math.pow(10, -g) / v, T = Math.round(l * R), _ = Math.round(c * R), T / R < l && ++T, _ / R > c && --_, R = -R) : (R = Math.pow(10, g) * v, T = Math.round(l / R), _ = Math.round(c / R), T * R < l && ++T, _ * R > c && --_), _ < T && 0.5 <= d && d < 2 ? Vy(l, c, d * 2) : [T, _, R];
}
function uO(l, c, d) {
  if (c = +c, l = +l, d = +d, !(d > 0)) return [];
  if (l === c) return [l];
  const y = c < l, [g, C, v] = y ? Vy(c, l, d) : Vy(l, c, d);
  if (!(C >= g)) return [];
  const T = C - g + 1, _ = new Array(T);
  if (y)
    if (v < 0) for (let R = 0; R < T; ++R) _[R] = (C - R) / -v;
    else for (let R = 0; R < T; ++R) _[R] = (C - R) * v;
  else if (v < 0) for (let R = 0; R < T; ++R) _[R] = (g + R) / -v;
  else for (let R = 0; R < T; ++R) _[R] = (g + R) * v;
  return _;
}
function bx(l, c, d) {
  return c = +c, l = +l, d = +d, Vy(l, c, d)[2];
}
function oO(l, c, d) {
  c = +c, l = +l, d = +d;
  const y = c < l, g = y ? bx(c, l, d) : bx(l, c, d);
  return (y ? -1 : 1) * (g < 0 ? 1 / -g : g);
}
function sO(l, c) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(l);
      break;
    default:
      this.range(c).domain(l);
      break;
  }
  return this;
}
function Ux(l, c, d) {
  l.prototype = c.prototype = d, d.constructor = l;
}
function xR(l, c) {
  var d = Object.create(l.prototype);
  for (var y in c) d[y] = c[y];
  return d;
}
function zh() {
}
var Dh = 0.7, By = 1 / Dh, fd = "\\s*([+-]?\\d+)\\s*", Mh = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", iu = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", cO = /^#([0-9a-f]{3,8})$/, fO = new RegExp(`^rgb\\(${fd},${fd},${fd}\\)$`), dO = new RegExp(`^rgb\\(${iu},${iu},${iu}\\)$`), pO = new RegExp(`^rgba\\(${fd},${fd},${fd},${Mh}\\)$`), hO = new RegExp(`^rgba\\(${iu},${iu},${iu},${Mh}\\)$`), vO = new RegExp(`^hsl\\(${Mh},${iu},${iu}\\)$`), mO = new RegExp(`^hsla\\(${Mh},${iu},${iu},${Mh}\\)$`), Hw = {
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
Ux(zh, xc, {
  copy(l) {
    return Object.assign(new this.constructor(), this, l);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Pw,
  // Deprecated! Use color.formatHex.
  formatHex: Pw,
  formatHex8: yO,
  formatHsl: gO,
  formatRgb: Vw,
  toString: Vw
});
function Pw() {
  return this.rgb().formatHex();
}
function yO() {
  return this.rgb().formatHex8();
}
function gO() {
  return ER(this).formatHsl();
}
function Vw() {
  return this.rgb().formatRgb();
}
function xc(l) {
  var c, d;
  return l = (l + "").trim().toLowerCase(), (c = cO.exec(l)) ? (d = c[1].length, c = parseInt(c[1], 16), d === 6 ? Bw(c) : d === 3 ? new qa(c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, (c & 15) << 4 | c & 15, 1) : d === 8 ? Oy(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, (c & 255) / 255) : d === 4 ? Oy(c >> 12 & 15 | c >> 8 & 240, c >> 8 & 15 | c >> 4 & 240, c >> 4 & 15 | c & 240, ((c & 15) << 4 | c & 15) / 255) : null) : (c = fO.exec(l)) ? new qa(c[1], c[2], c[3], 1) : (c = dO.exec(l)) ? new qa(c[1] * 255 / 100, c[2] * 255 / 100, c[3] * 255 / 100, 1) : (c = pO.exec(l)) ? Oy(c[1], c[2], c[3], c[4]) : (c = hO.exec(l)) ? Oy(c[1] * 255 / 100, c[2] * 255 / 100, c[3] * 255 / 100, c[4]) : (c = vO.exec(l)) ? Yw(c[1], c[2] / 100, c[3] / 100, 1) : (c = mO.exec(l)) ? Yw(c[1], c[2] / 100, c[3] / 100, c[4]) : Hw.hasOwnProperty(l) ? Bw(Hw[l]) : l === "transparent" ? new qa(NaN, NaN, NaN, 0) : null;
}
function Bw(l) {
  return new qa(l >> 16 & 255, l >> 8 & 255, l & 255, 1);
}
function Oy(l, c, d, y) {
  return y <= 0 && (l = c = d = NaN), new qa(l, c, d, y);
}
function SO(l) {
  return l instanceof zh || (l = xc(l)), l ? (l = l.rgb(), new qa(l.r, l.g, l.b, l.opacity)) : new qa();
}
function _x(l, c, d, y) {
  return arguments.length === 1 ? SO(l) : new qa(l, c, d, y ?? 1);
}
function qa(l, c, d, y) {
  this.r = +l, this.g = +c, this.b = +d, this.opacity = +y;
}
Ux(qa, _x, xR(zh, {
  brighter(l) {
    return l = l == null ? By : Math.pow(By, l), new qa(this.r * l, this.g * l, this.b * l, this.opacity);
  },
  darker(l) {
    return l = l == null ? Dh : Math.pow(Dh, l), new qa(this.r * l, this.g * l, this.b * l, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new qa(Sc(this.r), Sc(this.g), Sc(this.b), $y(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: $w,
  // Deprecated! Use color.formatHex.
  formatHex: $w,
  formatHex8: xO,
  formatRgb: Iw,
  toString: Iw
}));
function $w() {
  return `#${gc(this.r)}${gc(this.g)}${gc(this.b)}`;
}
function xO() {
  return `#${gc(this.r)}${gc(this.g)}${gc(this.b)}${gc((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Iw() {
  const l = $y(this.opacity);
  return `${l === 1 ? "rgb(" : "rgba("}${Sc(this.r)}, ${Sc(this.g)}, ${Sc(this.b)}${l === 1 ? ")" : `, ${l})`}`;
}
function $y(l) {
  return isNaN(l) ? 1 : Math.max(0, Math.min(1, l));
}
function Sc(l) {
  return Math.max(0, Math.min(255, Math.round(l) || 0));
}
function gc(l) {
  return l = Sc(l), (l < 16 ? "0" : "") + l.toString(16);
}
function Yw(l, c, d, y) {
  return y <= 0 ? l = c = d = NaN : d <= 0 || d >= 1 ? l = c = NaN : c <= 0 && (l = NaN), new yl(l, c, d, y);
}
function ER(l) {
  if (l instanceof yl) return new yl(l.h, l.s, l.l, l.opacity);
  if (l instanceof zh || (l = xc(l)), !l) return new yl();
  if (l instanceof yl) return l;
  l = l.rgb();
  var c = l.r / 255, d = l.g / 255, y = l.b / 255, g = Math.min(c, d, y), C = Math.max(c, d, y), v = NaN, T = C - g, _ = (C + g) / 2;
  return T ? (c === C ? v = (d - y) / T + (d < y) * 6 : d === C ? v = (y - c) / T + 2 : v = (c - d) / T + 4, T /= _ < 0.5 ? C + g : 2 - C - g, v *= 60) : T = _ > 0 && _ < 1 ? 0 : v, new yl(v, T, _, l.opacity);
}
function EO(l, c, d, y) {
  return arguments.length === 1 ? ER(l) : new yl(l, c, d, y ?? 1);
}
function yl(l, c, d, y) {
  this.h = +l, this.s = +c, this.l = +d, this.opacity = +y;
}
Ux(yl, EO, xR(zh, {
  brighter(l) {
    return l = l == null ? By : Math.pow(By, l), new yl(this.h, this.s, this.l * l, this.opacity);
  },
  darker(l) {
    return l = l == null ? Dh : Math.pow(Dh, l), new yl(this.h, this.s, this.l * l, this.opacity);
  },
  rgb() {
    var l = this.h % 360 + (this.h < 0) * 360, c = isNaN(l) || isNaN(this.s) ? 0 : this.s, d = this.l, y = d + (d < 0.5 ? d : 1 - d) * c, g = 2 * d - y;
    return new qa(
      xx(l >= 240 ? l - 240 : l + 120, g, y),
      xx(l, g, y),
      xx(l < 120 ? l + 240 : l - 120, g, y),
      this.opacity
    );
  },
  clamp() {
    return new yl(Ww(this.h), Ny(this.s), Ny(this.l), $y(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const l = $y(this.opacity);
    return `${l === 1 ? "hsl(" : "hsla("}${Ww(this.h)}, ${Ny(this.s) * 100}%, ${Ny(this.l) * 100}%${l === 1 ? ")" : `, ${l})`}`;
  }
}));
function Ww(l) {
  return l = (l || 0) % 360, l < 0 ? l + 360 : l;
}
function Ny(l) {
  return Math.max(0, Math.min(1, l || 0));
}
function xx(l, c, d) {
  return (l < 60 ? c + (d - c) * l / 60 : l < 180 ? d : l < 240 ? c + (d - c) * (240 - l) / 60 : c) * 255;
}
const Fx = (l) => () => l;
function CO(l, c) {
  return function(d) {
    return l + d * c;
  };
}
function wO(l, c, d) {
  return l = Math.pow(l, d), c = Math.pow(c, d) - l, d = 1 / d, function(y) {
    return Math.pow(l + y * c, d);
  };
}
function RO(l) {
  return (l = +l) == 1 ? CR : function(c, d) {
    return d - c ? wO(c, d, l) : Fx(isNaN(c) ? d : c);
  };
}
function CR(l, c) {
  var d = c - l;
  return d ? CO(l, d) : Fx(isNaN(l) ? c : l);
}
const Iy = (function l(c) {
  var d = RO(c);
  function y(g, C) {
    var v = d((g = _x(g)).r, (C = _x(C)).r), T = d(g.g, C.g), _ = d(g.b, C.b), R = CR(g.opacity, C.opacity);
    return function(D) {
      return g.r = v(D), g.g = T(D), g.b = _(D), g.opacity = R(D), g + "";
    };
  }
  return y.gamma = l, y;
})(1);
function bO(l, c) {
  c || (c = []);
  var d = l ? Math.min(c.length, l.length) : 0, y = c.slice(), g;
  return function(C) {
    for (g = 0; g < d; ++g) y[g] = l[g] * (1 - C) + c[g] * C;
    return y;
  };
}
function _O(l) {
  return ArrayBuffer.isView(l) && !(l instanceof DataView);
}
function TO(l, c) {
  var d = c ? c.length : 0, y = l ? Math.min(d, l.length) : 0, g = new Array(y), C = new Array(d), v;
  for (v = 0; v < y; ++v) g[v] = jx(l[v], c[v]);
  for (; v < d; ++v) C[v] = c[v];
  return function(T) {
    for (v = 0; v < y; ++v) C[v] = g[v](T);
    return C;
  };
}
function kO(l, c) {
  var d = /* @__PURE__ */ new Date();
  return l = +l, c = +c, function(y) {
    return d.setTime(l * (1 - y) + c * y), d;
  };
}
function ml(l, c) {
  return l = +l, c = +c, function(d) {
    return l * (1 - d) + c * d;
  };
}
function DO(l, c) {
  var d = {}, y = {}, g;
  (l === null || typeof l != "object") && (l = {}), (c === null || typeof c != "object") && (c = {});
  for (g in c)
    g in l ? d[g] = jx(l[g], c[g]) : y[g] = c[g];
  return function(C) {
    for (g in d) y[g] = d[g](C);
    return y;
  };
}
var Tx = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ex = new RegExp(Tx.source, "g");
function MO(l) {
  return function() {
    return l;
  };
}
function OO(l) {
  return function(c) {
    return l(c) + "";
  };
}
function wR(l, c) {
  var d = Tx.lastIndex = Ex.lastIndex = 0, y, g, C, v = -1, T = [], _ = [];
  for (l = l + "", c = c + ""; (y = Tx.exec(l)) && (g = Ex.exec(c)); )
    (C = g.index) > d && (C = c.slice(d, C), T[v] ? T[v] += C : T[++v] = C), (y = y[0]) === (g = g[0]) ? T[v] ? T[v] += g : T[++v] = g : (T[++v] = null, _.push({ i: v, x: ml(y, g) })), d = Ex.lastIndex;
  return d < c.length && (C = c.slice(d), T[v] ? T[v] += C : T[++v] = C), T.length < 2 ? _[0] ? OO(_[0].x) : MO(c) : (c = _.length, function(R) {
    for (var D = 0, O; D < c; ++D) T[(O = _[D]).i] = O.x(R);
    return T.join("");
  });
}
function jx(l, c) {
  var d = typeof c, y;
  return c == null || d === "boolean" ? Fx(c) : (d === "number" ? ml : d === "string" ? (y = xc(c)) ? (c = y, Iy) : wR : c instanceof xc ? Iy : c instanceof Date ? kO : _O(c) ? bO : Array.isArray(c) ? TO : typeof c.valueOf != "function" && typeof c.toString != "function" || isNaN(c) ? DO : ml)(l, c);
}
function NO(l, c) {
  return l = +l, c = +c, function(d) {
    return Math.round(l * (1 - d) + c * d);
  };
}
var Qw = 180 / Math.PI, kx = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function RR(l, c, d, y, g, C) {
  var v, T, _;
  return (v = Math.sqrt(l * l + c * c)) && (l /= v, c /= v), (_ = l * d + c * y) && (d -= l * _, y -= c * _), (T = Math.sqrt(d * d + y * y)) && (d /= T, y /= T, _ /= T), l * y < c * d && (l = -l, c = -c, _ = -_, v = -v), {
    translateX: g,
    translateY: C,
    rotate: Math.atan2(c, l) * Qw,
    skewX: Math.atan(_) * Qw,
    scaleX: v,
    scaleY: T
  };
}
var Ly;
function LO(l) {
  const c = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(l + "");
  return c.isIdentity ? kx : RR(c.a, c.b, c.c, c.d, c.e, c.f);
}
function zO(l) {
  return l == null || (Ly || (Ly = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ly.setAttribute("transform", l), !(l = Ly.transform.baseVal.consolidate())) ? kx : (l = l.matrix, RR(l.a, l.b, l.c, l.d, l.e, l.f));
}
function bR(l, c, d, y) {
  function g(R) {
    return R.length ? R.pop() + " " : "";
  }
  function C(R, D, O, z, F, oe) {
    if (R !== O || D !== z) {
      var ae = F.push("translate(", null, c, null, d);
      oe.push({ i: ae - 4, x: ml(R, O) }, { i: ae - 2, x: ml(D, z) });
    } else (O || z) && F.push("translate(" + O + c + z + d);
  }
  function v(R, D, O, z) {
    R !== D ? (R - D > 180 ? D += 360 : D - R > 180 && (R += 360), z.push({ i: O.push(g(O) + "rotate(", null, y) - 2, x: ml(R, D) })) : D && O.push(g(O) + "rotate(" + D + y);
  }
  function T(R, D, O, z) {
    R !== D ? z.push({ i: O.push(g(O) + "skewX(", null, y) - 2, x: ml(R, D) }) : D && O.push(g(O) + "skewX(" + D + y);
  }
  function _(R, D, O, z, F, oe) {
    if (R !== O || D !== z) {
      var ae = F.push(g(F) + "scale(", null, ",", null, ")");
      oe.push({ i: ae - 4, x: ml(R, O) }, { i: ae - 2, x: ml(D, z) });
    } else (O !== 1 || z !== 1) && F.push(g(F) + "scale(" + O + "," + z + ")");
  }
  return function(R, D) {
    var O = [], z = [];
    return R = l(R), D = l(D), C(R.translateX, R.translateY, D.translateX, D.translateY, O, z), v(R.rotate, D.rotate, O, z), T(R.skewX, D.skewX, O, z), _(R.scaleX, R.scaleY, D.scaleX, D.scaleY, O, z), R = D = null, function(F) {
      for (var oe = -1, ae = z.length, ie; ++oe < ae; ) O[(ie = z[oe]).i] = ie.x(F);
      return O.join("");
    };
  };
}
var AO = bR(LO, "px, ", "px)", "deg)"), UO = bR(zO, ", ", ")", ")"), FO = 1e-12;
function Gw(l) {
  return ((l = Math.exp(l)) + 1 / l) / 2;
}
function jO(l) {
  return ((l = Math.exp(l)) - 1 / l) / 2;
}
function HO(l) {
  return ((l = Math.exp(2 * l)) - 1) / (l + 1);
}
const PO = (function l(c, d, y) {
  function g(C, v) {
    var T = C[0], _ = C[1], R = C[2], D = v[0], O = v[1], z = v[2], F = D - T, oe = O - _, ae = F * F + oe * oe, ie, ue;
    if (ae < FO)
      ue = Math.log(z / R) / c, ie = function(xe) {
        return [
          T + xe * F,
          _ + xe * oe,
          R * Math.exp(c * xe * ue)
        ];
      };
    else {
      var we = Math.sqrt(ae), fe = (z * z - R * R + y * ae) / (2 * R * d * we), Ne = (z * z - R * R - y * ae) / (2 * z * d * we), de = Math.log(Math.sqrt(fe * fe + 1) - fe), ge = Math.log(Math.sqrt(Ne * Ne + 1) - Ne);
      ue = (ge - de) / c, ie = function(xe) {
        var Xe = xe * ue, lt = Gw(de), bt = R / (d * we) * (lt * HO(c * Xe + de) - jO(de));
        return [
          T + bt * F,
          _ + bt * oe,
          R * lt / Gw(c * Xe + de)
        ];
      };
    }
    return ie.duration = ue * 1e3 * c / Math.SQRT2, ie;
  }
  return g.rho = function(C) {
    var v = Math.max(1e-3, +C), T = v * v, _ = T * T;
    return l(v, T, _);
  }, g;
})(Math.SQRT2, 2, 4);
function VO(l) {
  return function() {
    return l;
  };
}
function BO(l) {
  return +l;
}
var Xw = [0, 1];
function cd(l) {
  return l;
}
function Dx(l, c) {
  return (c -= l = +l) ? function(d) {
    return (d - l) / c;
  } : VO(isNaN(c) ? NaN : 0.5);
}
function $O(l, c) {
  var d;
  return l > c && (d = l, l = c, c = d), function(y) {
    return Math.max(l, Math.min(c, y));
  };
}
function IO(l, c, d) {
  var y = l[0], g = l[1], C = c[0], v = c[1];
  return g < y ? (y = Dx(g, y), C = d(v, C)) : (y = Dx(y, g), C = d(C, v)), function(T) {
    return C(y(T));
  };
}
function YO(l, c, d) {
  var y = Math.min(l.length, c.length) - 1, g = new Array(y), C = new Array(y), v = -1;
  for (l[y] < l[0] && (l = l.slice().reverse(), c = c.slice().reverse()); ++v < y; )
    g[v] = Dx(l[v], l[v + 1]), C[v] = d(c[v], c[v + 1]);
  return function(T) {
    var _ = rO(l, T, 1, y) - 1;
    return C[_](g[_](T));
  };
}
function WO(l, c) {
  return c.domain(l.domain()).range(l.range()).interpolate(l.interpolate()).clamp(l.clamp()).unknown(l.unknown());
}
function QO() {
  var l = Xw, c = Xw, d = jx, y, g, C, v = cd, T, _, R;
  function D() {
    var z = Math.min(l.length, c.length);
    return v !== cd && (v = $O(l[0], l[z - 1])), T = z > 2 ? YO : IO, _ = R = null, O;
  }
  function O(z) {
    return z == null || isNaN(z = +z) ? C : (_ || (_ = T(l.map(y), c, d)))(y(v(z)));
  }
  return O.invert = function(z) {
    return v(g((R || (R = T(c, l.map(y), ml)))(z)));
  }, O.domain = function(z) {
    return arguments.length ? (l = Array.from(z, BO), D()) : l.slice();
  }, O.range = function(z) {
    return arguments.length ? (c = Array.from(z), D()) : c.slice();
  }, O.rangeRound = function(z) {
    return c = Array.from(z), d = NO, D();
  }, O.clamp = function(z) {
    return arguments.length ? (v = z ? !0 : cd, D()) : v !== cd;
  }, O.interpolate = function(z) {
    return arguments.length ? (d = z, D()) : d;
  }, O.unknown = function(z) {
    return arguments.length ? (C = z, O) : C;
  }, function(z, F) {
    return y = z, g = F, D();
  };
}
function GO() {
  return QO()(cd, cd);
}
function XO(l) {
  return Math.abs(l = Math.round(l)) >= 1e21 ? l.toLocaleString("en").replace(/,/g, "") : l.toString(10);
}
function Yy(l, c) {
  if (!isFinite(l) || l === 0) return null;
  var d = (l = c ? l.toExponential(c - 1) : l.toExponential()).indexOf("e"), y = l.slice(0, d);
  return [
    y.length > 1 ? y[0] + y.slice(2) : y,
    +l.slice(d + 1)
  ];
}
function dd(l) {
  return l = Yy(Math.abs(l)), l ? l[1] : NaN;
}
function qO(l, c) {
  return function(d, y) {
    for (var g = d.length, C = [], v = 0, T = l[0], _ = 0; g > 0 && T > 0 && (_ + T + 1 > y && (T = Math.max(1, y - _)), C.push(d.substring(g -= T, g + T)), !((_ += T + 1) > y)); )
      T = l[v = (v + 1) % l.length];
    return C.reverse().join(c);
  };
}
function KO(l) {
  return function(c) {
    return c.replace(/[0-9]/g, function(d) {
      return l[+d];
    });
  };
}
var ZO = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Wy(l) {
  if (!(c = ZO.exec(l))) throw new Error("invalid format: " + l);
  var c;
  return new Hx({
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
Wy.prototype = Hx.prototype;
function Hx(l) {
  this.fill = l.fill === void 0 ? " " : l.fill + "", this.align = l.align === void 0 ? ">" : l.align + "", this.sign = l.sign === void 0 ? "-" : l.sign + "", this.symbol = l.symbol === void 0 ? "" : l.symbol + "", this.zero = !!l.zero, this.width = l.width === void 0 ? void 0 : +l.width, this.comma = !!l.comma, this.precision = l.precision === void 0 ? void 0 : +l.precision, this.trim = !!l.trim, this.type = l.type === void 0 ? "" : l.type + "";
}
Hx.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function JO(l) {
  e: for (var c = l.length, d = 1, y = -1, g; d < c; ++d)
    switch (l[d]) {
      case ".":
        y = g = d;
        break;
      case "0":
        y === 0 && (y = d), g = d;
        break;
      default:
        if (!+l[d]) break e;
        y > 0 && (y = 0);
        break;
    }
  return y > 0 ? l.slice(0, y) + l.slice(g + 1) : l;
}
var Qy;
function eN(l, c) {
  var d = Yy(l, c);
  if (!d) return Qy = void 0, l.toPrecision(c);
  var y = d[0], g = d[1], C = g - (Qy = Math.max(-8, Math.min(8, Math.floor(g / 3))) * 3) + 1, v = y.length;
  return C === v ? y : C > v ? y + new Array(C - v + 1).join("0") : C > 0 ? y.slice(0, C) + "." + y.slice(C) : "0." + new Array(1 - C).join("0") + Yy(l, Math.max(0, c + C - 1))[0];
}
function qw(l, c) {
  var d = Yy(l, c);
  if (!d) return l + "";
  var y = d[0], g = d[1];
  return g < 0 ? "0." + new Array(-g).join("0") + y : y.length > g + 1 ? y.slice(0, g + 1) + "." + y.slice(g + 1) : y + new Array(g - y.length + 2).join("0");
}
const Kw = {
  "%": (l, c) => (l * 100).toFixed(c),
  b: (l) => Math.round(l).toString(2),
  c: (l) => l + "",
  d: XO,
  e: (l, c) => l.toExponential(c),
  f: (l, c) => l.toFixed(c),
  g: (l, c) => l.toPrecision(c),
  o: (l) => Math.round(l).toString(8),
  p: (l, c) => qw(l * 100, c),
  r: qw,
  s: eN,
  X: (l) => Math.round(l).toString(16).toUpperCase(),
  x: (l) => Math.round(l).toString(16)
};
function Zw(l) {
  return l;
}
var Jw = Array.prototype.map, eR = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function tN(l) {
  var c = l.grouping === void 0 || l.thousands === void 0 ? Zw : qO(Jw.call(l.grouping, Number), l.thousands + ""), d = l.currency === void 0 ? "" : l.currency[0] + "", y = l.currency === void 0 ? "" : l.currency[1] + "", g = l.decimal === void 0 ? "." : l.decimal + "", C = l.numerals === void 0 ? Zw : KO(Jw.call(l.numerals, String)), v = l.percent === void 0 ? "%" : l.percent + "", T = l.minus === void 0 ? "−" : l.minus + "", _ = l.nan === void 0 ? "NaN" : l.nan + "";
  function R(O, z) {
    O = Wy(O);
    var F = O.fill, oe = O.align, ae = O.sign, ie = O.symbol, ue = O.zero, we = O.width, fe = O.comma, Ne = O.precision, de = O.trim, ge = O.type;
    ge === "n" ? (fe = !0, ge = "g") : Kw[ge] || (Ne === void 0 && (Ne = 12), de = !0, ge = "g"), (ue || F === "0" && oe === "=") && (ue = !0, F = "0", oe = "=");
    var xe = (z && z.prefix !== void 0 ? z.prefix : "") + (ie === "$" ? d : ie === "#" && /[boxX]/.test(ge) ? "0" + ge.toLowerCase() : ""), Xe = (ie === "$" ? y : /[%p]/.test(ge) ? v : "") + (z && z.suffix !== void 0 ? z.suffix : ""), lt = Kw[ge], bt = /[defgprs%]/.test(ge);
    Ne = Ne === void 0 ? 6 : /[gprs]/.test(ge) ? Math.max(1, Math.min(21, Ne)) : Math.max(0, Math.min(20, Ne));
    function Ut(ze) {
      var Ve = xe, V = Xe, Se, J, re;
      if (ge === "c")
        V = lt(ze) + V, ze = "";
      else {
        ze = +ze;
        var G = ze < 0 || 1 / ze < 0;
        if (ze = isNaN(ze) ? _ : lt(Math.abs(ze), Ne), de && (ze = JO(ze)), G && +ze == 0 && ae !== "+" && (G = !1), Ve = (G ? ae === "(" ? ae : T : ae === "-" || ae === "(" ? "" : ae) + Ve, V = (ge === "s" && !isNaN(ze) && Qy !== void 0 ? eR[8 + Qy / 3] : "") + V + (G && ae === "(" ? ")" : ""), bt) {
          for (Se = -1, J = ze.length; ++Se < J; )
            if (re = ze.charCodeAt(Se), 48 > re || re > 57) {
              V = (re === 46 ? g + ze.slice(Se + 1) : ze.slice(Se)) + V, ze = ze.slice(0, Se);
              break;
            }
        }
      }
      fe && !ue && (ze = c(ze, 1 / 0));
      var ce = Ve.length + ze.length + V.length, ee = ce < we ? new Array(we - ce + 1).join(F) : "";
      switch (fe && ue && (ze = c(ee + ze, ee.length ? we - V.length : 1 / 0), ee = ""), oe) {
        case "<":
          ze = Ve + ze + V + ee;
          break;
        case "=":
          ze = Ve + ee + ze + V;
          break;
        case "^":
          ze = ee.slice(0, ce = ee.length >> 1) + Ve + ze + V + ee.slice(ce);
          break;
        default:
          ze = ee + Ve + ze + V;
          break;
      }
      return C(ze);
    }
    return Ut.toString = function() {
      return O + "";
    }, Ut;
  }
  function D(O, z) {
    var F = Math.max(-8, Math.min(8, Math.floor(dd(z) / 3))) * 3, oe = Math.pow(10, -F), ae = R((O = Wy(O), O.type = "f", O), { suffix: eR[8 + F / 3] });
    return function(ie) {
      return ae(oe * ie);
    };
  }
  return {
    format: R,
    formatPrefix: D
  };
}
var zy, _R, TR;
nN({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function nN(l) {
  return zy = tN(l), _R = zy.format, TR = zy.formatPrefix, zy;
}
function rN(l) {
  return Math.max(0, -dd(Math.abs(l)));
}
function aN(l, c) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(dd(c) / 3))) * 3 - dd(Math.abs(l)));
}
function iN(l, c) {
  return l = Math.abs(l), c = Math.abs(c) - l, Math.max(0, dd(c) - dd(l)) + 1;
}
function lN(l, c, d, y) {
  var g = oO(l, c, d), C;
  switch (y = Wy(y ?? ",f"), y.type) {
    case "s": {
      var v = Math.max(Math.abs(l), Math.abs(c));
      return y.precision == null && !isNaN(C = aN(g, v)) && (y.precision = C), TR(y, v);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      y.precision == null && !isNaN(C = iN(g, Math.max(Math.abs(l), Math.abs(c)))) && (y.precision = C - (y.type === "e"));
      break;
    }
    case "f":
    case "%": {
      y.precision == null && !isNaN(C = rN(g)) && (y.precision = C - (y.type === "%") * 2);
      break;
    }
  }
  return _R(y);
}
function uN(l) {
  var c = l.domain;
  return l.ticks = function(d) {
    var y = c();
    return uO(y[0], y[y.length - 1], d ?? 10);
  }, l.tickFormat = function(d, y) {
    var g = c();
    return lN(g[0], g[g.length - 1], d ?? 10, y);
  }, l.nice = function(d) {
    d == null && (d = 10);
    var y = c(), g = 0, C = y.length - 1, v = y[g], T = y[C], _, R, D = 10;
    for (T < v && (R = v, v = T, T = R, R = g, g = C, C = R); D-- > 0; ) {
      if (R = bx(v, T, d), R === _)
        return y[g] = v, y[C] = T, c(y);
      if (R > 0)
        v = Math.floor(v / R) * R, T = Math.ceil(T / R) * R;
      else if (R < 0)
        v = Math.ceil(v * R) / R, T = Math.floor(T * R) / R;
      else
        break;
      _ = R;
    }
    return l;
  }, l;
}
function Oh() {
  var l = GO();
  return l.copy = function() {
    return WO(l, Oh());
  }, sO.apply(l, arguments), uN(l);
}
var oN = { value: () => {
} };
function Px() {
  for (var l = 0, c = arguments.length, d = {}, y; l < c; ++l) {
    if (!(y = arguments[l] + "") || y in d || /[\s.]/.test(y)) throw new Error("illegal type: " + y);
    d[y] = [];
  }
  return new Fy(d);
}
function Fy(l) {
  this._ = l;
}
function sN(l, c) {
  return l.trim().split(/^|\s+/).map(function(d) {
    var y = "", g = d.indexOf(".");
    if (g >= 0 && (y = d.slice(g + 1), d = d.slice(0, g)), d && !c.hasOwnProperty(d)) throw new Error("unknown type: " + d);
    return { type: d, name: y };
  });
}
Fy.prototype = Px.prototype = {
  constructor: Fy,
  on: function(l, c) {
    var d = this._, y = sN(l + "", d), g, C = -1, v = y.length;
    if (arguments.length < 2) {
      for (; ++C < v; ) if ((g = (l = y[C]).type) && (g = cN(d[g], l.name))) return g;
      return;
    }
    if (c != null && typeof c != "function") throw new Error("invalid callback: " + c);
    for (; ++C < v; )
      if (g = (l = y[C]).type) d[g] = tR(d[g], l.name, c);
      else if (c == null) for (g in d) d[g] = tR(d[g], l.name, null);
    return this;
  },
  copy: function() {
    var l = {}, c = this._;
    for (var d in c) l[d] = c[d].slice();
    return new Fy(l);
  },
  call: function(l, c) {
    if ((g = arguments.length - 2) > 0) for (var d = new Array(g), y = 0, g, C; y < g; ++y) d[y] = arguments[y + 2];
    if (!this._.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    for (C = this._[l], y = 0, g = C.length; y < g; ++y) C[y].value.apply(c, d);
  },
  apply: function(l, c, d) {
    if (!this._.hasOwnProperty(l)) throw new Error("unknown type: " + l);
    for (var y = this._[l], g = 0, C = y.length; g < C; ++g) y[g].value.apply(c, d);
  }
};
function cN(l, c) {
  for (var d = 0, y = l.length, g; d < y; ++d)
    if ((g = l[d]).name === c)
      return g.value;
}
function tR(l, c, d) {
  for (var y = 0, g = l.length; y < g; ++y)
    if (l[y].name === c) {
      l[y] = oN, l = l.slice(0, y).concat(l.slice(y + 1));
      break;
    }
  return d != null && l.push({ name: c, value: d }), l;
}
var Mx = "http://www.w3.org/1999/xhtml";
const nR = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Mx,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Zy(l) {
  var c = l += "", d = c.indexOf(":");
  return d >= 0 && (c = l.slice(0, d)) !== "xmlns" && (l = l.slice(d + 1)), nR.hasOwnProperty(c) ? { space: nR[c], local: l } : l;
}
function fN(l) {
  return function() {
    var c = this.ownerDocument, d = this.namespaceURI;
    return d === Mx && c.documentElement.namespaceURI === Mx ? c.createElement(l) : c.createElementNS(d, l);
  };
}
function dN(l) {
  return function() {
    return this.ownerDocument.createElementNS(l.space, l.local);
  };
}
function kR(l) {
  var c = Zy(l);
  return (c.local ? dN : fN)(c);
}
function pN() {
}
function Vx(l) {
  return l == null ? pN : function() {
    return this.querySelector(l);
  };
}
function hN(l) {
  typeof l != "function" && (l = Vx(l));
  for (var c = this._groups, d = c.length, y = new Array(d), g = 0; g < d; ++g)
    for (var C = c[g], v = C.length, T = y[g] = new Array(v), _, R, D = 0; D < v; ++D)
      (_ = C[D]) && (R = l.call(_, _.__data__, D, C)) && ("__data__" in _ && (R.__data__ = _.__data__), T[D] = R);
  return new hi(y, this._parents);
}
function vN(l) {
  return l == null ? [] : Array.isArray(l) ? l : Array.from(l);
}
function mN() {
  return [];
}
function DR(l) {
  return l == null ? mN : function() {
    return this.querySelectorAll(l);
  };
}
function yN(l) {
  return function() {
    return vN(l.apply(this, arguments));
  };
}
function gN(l) {
  typeof l == "function" ? l = yN(l) : l = DR(l);
  for (var c = this._groups, d = c.length, y = [], g = [], C = 0; C < d; ++C)
    for (var v = c[C], T = v.length, _, R = 0; R < T; ++R)
      (_ = v[R]) && (y.push(l.call(_, _.__data__, R, v)), g.push(_));
  return new hi(y, g);
}
function MR(l) {
  return function() {
    return this.matches(l);
  };
}
function OR(l) {
  return function(c) {
    return c.matches(l);
  };
}
var SN = Array.prototype.find;
function xN(l) {
  return function() {
    return SN.call(this.children, l);
  };
}
function EN() {
  return this.firstElementChild;
}
function CN(l) {
  return this.select(l == null ? EN : xN(typeof l == "function" ? l : OR(l)));
}
var wN = Array.prototype.filter;
function RN() {
  return Array.from(this.children);
}
function bN(l) {
  return function() {
    return wN.call(this.children, l);
  };
}
function _N(l) {
  return this.selectAll(l == null ? RN : bN(typeof l == "function" ? l : OR(l)));
}
function TN(l) {
  typeof l != "function" && (l = MR(l));
  for (var c = this._groups, d = c.length, y = new Array(d), g = 0; g < d; ++g)
    for (var C = c[g], v = C.length, T = y[g] = [], _, R = 0; R < v; ++R)
      (_ = C[R]) && l.call(_, _.__data__, R, C) && T.push(_);
  return new hi(y, this._parents);
}
function NR(l) {
  return new Array(l.length);
}
function kN() {
  return new hi(this._enter || this._groups.map(NR), this._parents);
}
function Gy(l, c) {
  this.ownerDocument = l.ownerDocument, this.namespaceURI = l.namespaceURI, this._next = null, this._parent = l, this.__data__ = c;
}
Gy.prototype = {
  constructor: Gy,
  appendChild: function(l) {
    return this._parent.insertBefore(l, this._next);
  },
  insertBefore: function(l, c) {
    return this._parent.insertBefore(l, c);
  },
  querySelector: function(l) {
    return this._parent.querySelector(l);
  },
  querySelectorAll: function(l) {
    return this._parent.querySelectorAll(l);
  }
};
function DN(l) {
  return function() {
    return l;
  };
}
function MN(l, c, d, y, g, C) {
  for (var v = 0, T, _ = c.length, R = C.length; v < R; ++v)
    (T = c[v]) ? (T.__data__ = C[v], y[v] = T) : d[v] = new Gy(l, C[v]);
  for (; v < _; ++v)
    (T = c[v]) && (g[v] = T);
}
function ON(l, c, d, y, g, C, v) {
  var T, _, R = /* @__PURE__ */ new Map(), D = c.length, O = C.length, z = new Array(D), F;
  for (T = 0; T < D; ++T)
    (_ = c[T]) && (z[T] = F = v.call(_, _.__data__, T, c) + "", R.has(F) ? g[T] = _ : R.set(F, _));
  for (T = 0; T < O; ++T)
    F = v.call(l, C[T], T, C) + "", (_ = R.get(F)) ? (y[T] = _, _.__data__ = C[T], R.delete(F)) : d[T] = new Gy(l, C[T]);
  for (T = 0; T < D; ++T)
    (_ = c[T]) && R.get(z[T]) === _ && (g[T] = _);
}
function NN(l) {
  return l.__data__;
}
function LN(l, c) {
  if (!arguments.length) return Array.from(this, NN);
  var d = c ? ON : MN, y = this._parents, g = this._groups;
  typeof l != "function" && (l = DN(l));
  for (var C = g.length, v = new Array(C), T = new Array(C), _ = new Array(C), R = 0; R < C; ++R) {
    var D = y[R], O = g[R], z = O.length, F = zN(l.call(D, D && D.__data__, R, y)), oe = F.length, ae = T[R] = new Array(oe), ie = v[R] = new Array(oe), ue = _[R] = new Array(z);
    d(D, O, ae, ie, ue, F, c);
    for (var we = 0, fe = 0, Ne, de; we < oe; ++we)
      if (Ne = ae[we]) {
        for (we >= fe && (fe = we + 1); !(de = ie[fe]) && ++fe < oe; ) ;
        Ne._next = de || null;
      }
  }
  return v = new hi(v, y), v._enter = T, v._exit = _, v;
}
function zN(l) {
  return typeof l == "object" && "length" in l ? l : Array.from(l);
}
function AN() {
  return new hi(this._exit || this._groups.map(NR), this._parents);
}
function UN(l, c, d) {
  var y = this.enter(), g = this, C = this.exit();
  return typeof l == "function" ? (y = l(y), y && (y = y.selection())) : y = y.append(l + ""), c != null && (g = c(g), g && (g = g.selection())), d == null ? C.remove() : d(C), y && g ? y.merge(g).order() : g;
}
function FN(l) {
  for (var c = l.selection ? l.selection() : l, d = this._groups, y = c._groups, g = d.length, C = y.length, v = Math.min(g, C), T = new Array(g), _ = 0; _ < v; ++_)
    for (var R = d[_], D = y[_], O = R.length, z = T[_] = new Array(O), F, oe = 0; oe < O; ++oe)
      (F = R[oe] || D[oe]) && (z[oe] = F);
  for (; _ < g; ++_)
    T[_] = d[_];
  return new hi(T, this._parents);
}
function jN() {
  for (var l = this._groups, c = -1, d = l.length; ++c < d; )
    for (var y = l[c], g = y.length - 1, C = y[g], v; --g >= 0; )
      (v = y[g]) && (C && v.compareDocumentPosition(C) ^ 4 && C.parentNode.insertBefore(v, C), C = v);
  return this;
}
function HN(l) {
  l || (l = PN);
  function c(O, z) {
    return O && z ? l(O.__data__, z.__data__) : !O - !z;
  }
  for (var d = this._groups, y = d.length, g = new Array(y), C = 0; C < y; ++C) {
    for (var v = d[C], T = v.length, _ = g[C] = new Array(T), R, D = 0; D < T; ++D)
      (R = v[D]) && (_[D] = R);
    _.sort(c);
  }
  return new hi(g, this._parents).order();
}
function PN(l, c) {
  return l < c ? -1 : l > c ? 1 : l >= c ? 0 : NaN;
}
function VN() {
  var l = arguments[0];
  return arguments[0] = this, l.apply(null, arguments), this;
}
function BN() {
  return Array.from(this);
}
function $N() {
  for (var l = this._groups, c = 0, d = l.length; c < d; ++c)
    for (var y = l[c], g = 0, C = y.length; g < C; ++g) {
      var v = y[g];
      if (v) return v;
    }
  return null;
}
function IN() {
  let l = 0;
  for (const c of this) ++l;
  return l;
}
function YN() {
  return !this.node();
}
function WN(l) {
  for (var c = this._groups, d = 0, y = c.length; d < y; ++d)
    for (var g = c[d], C = 0, v = g.length, T; C < v; ++C)
      (T = g[C]) && l.call(T, T.__data__, C, g);
  return this;
}
function QN(l) {
  return function() {
    this.removeAttribute(l);
  };
}
function GN(l) {
  return function() {
    this.removeAttributeNS(l.space, l.local);
  };
}
function XN(l, c) {
  return function() {
    this.setAttribute(l, c);
  };
}
function qN(l, c) {
  return function() {
    this.setAttributeNS(l.space, l.local, c);
  };
}
function KN(l, c) {
  return function() {
    var d = c.apply(this, arguments);
    d == null ? this.removeAttribute(l) : this.setAttribute(l, d);
  };
}
function ZN(l, c) {
  return function() {
    var d = c.apply(this, arguments);
    d == null ? this.removeAttributeNS(l.space, l.local) : this.setAttributeNS(l.space, l.local, d);
  };
}
function JN(l, c) {
  var d = Zy(l);
  if (arguments.length < 2) {
    var y = this.node();
    return d.local ? y.getAttributeNS(d.space, d.local) : y.getAttribute(d);
  }
  return this.each((c == null ? d.local ? GN : QN : typeof c == "function" ? d.local ? ZN : KN : d.local ? qN : XN)(d, c));
}
function LR(l) {
  return l.ownerDocument && l.ownerDocument.defaultView || l.document && l || l.defaultView;
}
function e2(l) {
  return function() {
    this.style.removeProperty(l);
  };
}
function t2(l, c, d) {
  return function() {
    this.style.setProperty(l, c, d);
  };
}
function n2(l, c, d) {
  return function() {
    var y = c.apply(this, arguments);
    y == null ? this.style.removeProperty(l) : this.style.setProperty(l, y, d);
  };
}
function r2(l, c, d) {
  return arguments.length > 1 ? this.each((c == null ? e2 : typeof c == "function" ? n2 : t2)(l, c, d ?? "")) : pd(this.node(), l);
}
function pd(l, c) {
  return l.style.getPropertyValue(c) || LR(l).getComputedStyle(l, null).getPropertyValue(c);
}
function a2(l) {
  return function() {
    delete this[l];
  };
}
function i2(l, c) {
  return function() {
    this[l] = c;
  };
}
function l2(l, c) {
  return function() {
    var d = c.apply(this, arguments);
    d == null ? delete this[l] : this[l] = d;
  };
}
function u2(l, c) {
  return arguments.length > 1 ? this.each((c == null ? a2 : typeof c == "function" ? l2 : i2)(l, c)) : this.node()[l];
}
function zR(l) {
  return l.trim().split(/^|\s+/);
}
function Bx(l) {
  return l.classList || new AR(l);
}
function AR(l) {
  this._node = l, this._names = zR(l.getAttribute("class") || "");
}
AR.prototype = {
  add: function(l) {
    var c = this._names.indexOf(l);
    c < 0 && (this._names.push(l), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(l) {
    var c = this._names.indexOf(l);
    c >= 0 && (this._names.splice(c, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(l) {
    return this._names.indexOf(l) >= 0;
  }
};
function UR(l, c) {
  for (var d = Bx(l), y = -1, g = c.length; ++y < g; ) d.add(c[y]);
}
function FR(l, c) {
  for (var d = Bx(l), y = -1, g = c.length; ++y < g; ) d.remove(c[y]);
}
function o2(l) {
  return function() {
    UR(this, l);
  };
}
function s2(l) {
  return function() {
    FR(this, l);
  };
}
function c2(l, c) {
  return function() {
    (c.apply(this, arguments) ? UR : FR)(this, l);
  };
}
function f2(l, c) {
  var d = zR(l + "");
  if (arguments.length < 2) {
    for (var y = Bx(this.node()), g = -1, C = d.length; ++g < C; ) if (!y.contains(d[g])) return !1;
    return !0;
  }
  return this.each((typeof c == "function" ? c2 : c ? o2 : s2)(d, c));
}
function d2() {
  this.textContent = "";
}
function p2(l) {
  return function() {
    this.textContent = l;
  };
}
function h2(l) {
  return function() {
    var c = l.apply(this, arguments);
    this.textContent = c ?? "";
  };
}
function v2(l) {
  return arguments.length ? this.each(l == null ? d2 : (typeof l == "function" ? h2 : p2)(l)) : this.node().textContent;
}
function m2() {
  this.innerHTML = "";
}
function y2(l) {
  return function() {
    this.innerHTML = l;
  };
}
function g2(l) {
  return function() {
    var c = l.apply(this, arguments);
    this.innerHTML = c ?? "";
  };
}
function S2(l) {
  return arguments.length ? this.each(l == null ? m2 : (typeof l == "function" ? g2 : y2)(l)) : this.node().innerHTML;
}
function x2() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function E2() {
  return this.each(x2);
}
function C2() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function w2() {
  return this.each(C2);
}
function R2(l) {
  var c = typeof l == "function" ? l : kR(l);
  return this.select(function() {
    return this.appendChild(c.apply(this, arguments));
  });
}
function b2() {
  return null;
}
function _2(l, c) {
  var d = typeof l == "function" ? l : kR(l), y = c == null ? b2 : typeof c == "function" ? c : Vx(c);
  return this.select(function() {
    return this.insertBefore(d.apply(this, arguments), y.apply(this, arguments) || null);
  });
}
function T2() {
  var l = this.parentNode;
  l && l.removeChild(this);
}
function k2() {
  return this.each(T2);
}
function D2() {
  var l = this.cloneNode(!1), c = this.parentNode;
  return c ? c.insertBefore(l, this.nextSibling) : l;
}
function M2() {
  var l = this.cloneNode(!0), c = this.parentNode;
  return c ? c.insertBefore(l, this.nextSibling) : l;
}
function O2(l) {
  return this.select(l ? M2 : D2);
}
function N2(l) {
  return arguments.length ? this.property("__data__", l) : this.node().__data__;
}
function L2(l) {
  return function(c) {
    l.call(this, c, this.__data__);
  };
}
function z2(l) {
  return l.trim().split(/^|\s+/).map(function(c) {
    var d = "", y = c.indexOf(".");
    return y >= 0 && (d = c.slice(y + 1), c = c.slice(0, y)), { type: c, name: d };
  });
}
function A2(l) {
  return function() {
    var c = this.__on;
    if (c) {
      for (var d = 0, y = -1, g = c.length, C; d < g; ++d)
        C = c[d], (!l.type || C.type === l.type) && C.name === l.name ? this.removeEventListener(C.type, C.listener, C.options) : c[++y] = C;
      ++y ? c.length = y : delete this.__on;
    }
  };
}
function U2(l, c, d) {
  return function() {
    var y = this.__on, g, C = L2(c);
    if (y) {
      for (var v = 0, T = y.length; v < T; ++v)
        if ((g = y[v]).type === l.type && g.name === l.name) {
          this.removeEventListener(g.type, g.listener, g.options), this.addEventListener(g.type, g.listener = C, g.options = d), g.value = c;
          return;
        }
    }
    this.addEventListener(l.type, C, d), g = { type: l.type, name: l.name, value: c, listener: C, options: d }, y ? y.push(g) : this.__on = [g];
  };
}
function F2(l, c, d) {
  var y = z2(l + ""), g, C = y.length, v;
  if (arguments.length < 2) {
    var T = this.node().__on;
    if (T) {
      for (var _ = 0, R = T.length, D; _ < R; ++_)
        for (g = 0, D = T[_]; g < C; ++g)
          if ((v = y[g]).type === D.type && v.name === D.name)
            return D.value;
    }
    return;
  }
  for (T = c ? U2 : A2, g = 0; g < C; ++g) this.each(T(y[g], c, d));
  return this;
}
function jR(l, c, d) {
  var y = LR(l), g = y.CustomEvent;
  typeof g == "function" ? g = new g(c, d) : (g = y.document.createEvent("Event"), d ? (g.initEvent(c, d.bubbles, d.cancelable), g.detail = d.detail) : g.initEvent(c, !1, !1)), l.dispatchEvent(g);
}
function j2(l, c) {
  return function() {
    return jR(this, l, c);
  };
}
function H2(l, c) {
  return function() {
    return jR(this, l, c.apply(this, arguments));
  };
}
function P2(l, c) {
  return this.each((typeof c == "function" ? H2 : j2)(l, c));
}
function* V2() {
  for (var l = this._groups, c = 0, d = l.length; c < d; ++c)
    for (var y = l[c], g = 0, C = y.length, v; g < C; ++g)
      (v = y[g]) && (yield v);
}
var HR = [null];
function hi(l, c) {
  this._groups = l, this._parents = c;
}
function Ah() {
  return new hi([[document.documentElement]], HR);
}
function B2() {
  return this;
}
hi.prototype = Ah.prototype = {
  constructor: hi,
  select: hN,
  selectAll: gN,
  selectChild: CN,
  selectChildren: _N,
  filter: TN,
  data: LN,
  enter: kN,
  exit: AN,
  join: UN,
  merge: FN,
  selection: B2,
  order: jN,
  sort: HN,
  call: VN,
  nodes: BN,
  node: $N,
  size: IN,
  empty: YN,
  each: WN,
  attr: JN,
  style: r2,
  property: u2,
  classed: f2,
  text: v2,
  html: S2,
  raise: E2,
  lower: w2,
  append: R2,
  insert: _2,
  remove: k2,
  clone: O2,
  datum: N2,
  on: F2,
  dispatch: P2,
  [Symbol.iterator]: V2
};
function Xa(l) {
  return typeof l == "string" ? new hi([[document.querySelector(l)]], [document.documentElement]) : new hi([[l]], HR);
}
function $2(l) {
  let c;
  for (; c = l.sourceEvent; ) l = c;
  return l;
}
function yc(l, c) {
  if (l = $2(l), c === void 0 && (c = l.currentTarget), c) {
    var d = c.ownerSVGElement || c;
    if (d.createSVGPoint) {
      var y = d.createSVGPoint();
      return y.x = l.clientX, y.y = l.clientY, y = y.matrixTransform(c.getScreenCTM().inverse()), [y.x, y.y];
    }
    if (c.getBoundingClientRect) {
      var g = c.getBoundingClientRect();
      return [l.clientX - g.left - c.clientLeft, l.clientY - g.top - c.clientTop];
    }
  }
  return [l.pageX, l.pageY];
}
const Ox = { capture: !0, passive: !1 };
function Nx(l) {
  l.preventDefault(), l.stopImmediatePropagation();
}
function I2(l) {
  var c = l.document.documentElement, d = Xa(l).on("dragstart.drag", Nx, Ox);
  "onselectstart" in c ? d.on("selectstart.drag", Nx, Ox) : (c.__noselect = c.style.MozUserSelect, c.style.MozUserSelect = "none");
}
function Y2(l, c) {
  var d = l.document.documentElement, y = Xa(l).on("dragstart.drag", null);
  c && (y.on("click.drag", Nx, Ox), setTimeout(function() {
    y.on("click.drag", null);
  }, 0)), "onselectstart" in d ? y.on("selectstart.drag", null) : (d.style.MozUserSelect = d.__noselect, delete d.__noselect);
}
var hd = 0, _h = 0, wh = 0, PR = 1e3, Xy, Th, qy = 0, Ec = 0, Jy = 0, Nh = typeof performance == "object" && performance.now ? performance : Date, VR = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(l) {
  setTimeout(l, 17);
};
function $x() {
  return Ec || (VR(W2), Ec = Nh.now() + Jy);
}
function W2() {
  Ec = 0;
}
function Ky() {
  this._call = this._time = this._next = null;
}
Ky.prototype = BR.prototype = {
  constructor: Ky,
  restart: function(l, c, d) {
    if (typeof l != "function") throw new TypeError("callback is not a function");
    d = (d == null ? $x() : +d) + (c == null ? 0 : +c), !this._next && Th !== this && (Th ? Th._next = this : Xy = this, Th = this), this._call = l, this._time = d, Lx();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Lx());
  }
};
function BR(l, c, d) {
  var y = new Ky();
  return y.restart(l, c, d), y;
}
function Q2() {
  $x(), ++hd;
  for (var l = Xy, c; l; )
    (c = Ec - l._time) >= 0 && l._call.call(void 0, c), l = l._next;
  --hd;
}
function rR() {
  Ec = (qy = Nh.now()) + Jy, hd = _h = 0;
  try {
    Q2();
  } finally {
    hd = 0, X2(), Ec = 0;
  }
}
function G2() {
  var l = Nh.now(), c = l - qy;
  c > PR && (Jy -= c, qy = l);
}
function X2() {
  for (var l, c = Xy, d, y = 1 / 0; c; )
    c._call ? (y > c._time && (y = c._time), l = c, c = c._next) : (d = c._next, c._next = null, c = l ? l._next = d : Xy = d);
  Th = l, Lx(y);
}
function Lx(l) {
  if (!hd) {
    _h && (_h = clearTimeout(_h));
    var c = l - Ec;
    c > 24 ? (l < 1 / 0 && (_h = setTimeout(rR, l - Nh.now() - Jy)), wh && (wh = clearInterval(wh))) : (wh || (qy = Nh.now(), wh = setInterval(G2, PR)), hd = 1, VR(rR));
  }
}
function aR(l, c, d) {
  var y = new Ky();
  return c = c == null ? 0 : +c, y.restart((g) => {
    y.stop(), l(g + c);
  }, c, d), y;
}
var q2 = Px("start", "end", "cancel", "interrupt"), K2 = [], $R = 0, iR = 1, zx = 2, jy = 3, lR = 4, Ax = 5, Hy = 6;
function eg(l, c, d, y, g, C) {
  var v = l.__transition;
  if (!v) l.__transition = {};
  else if (d in v) return;
  Z2(l, d, {
    name: c,
    index: y,
    // For context during callback.
    group: g,
    // For context during callback.
    on: q2,
    tween: K2,
    time: C.time,
    delay: C.delay,
    duration: C.duration,
    ease: C.ease,
    timer: null,
    state: $R
  });
}
function Ix(l, c) {
  var d = gl(l, c);
  if (d.state > $R) throw new Error("too late; already scheduled");
  return d;
}
function lu(l, c) {
  var d = gl(l, c);
  if (d.state > jy) throw new Error("too late; already running");
  return d;
}
function gl(l, c) {
  var d = l.__transition;
  if (!d || !(d = d[c])) throw new Error("transition not found");
  return d;
}
function Z2(l, c, d) {
  var y = l.__transition, g;
  y[c] = d, d.timer = BR(C, 0, d.time);
  function C(R) {
    d.state = iR, d.timer.restart(v, d.delay, d.time), d.delay <= R && v(R - d.delay);
  }
  function v(R) {
    var D, O, z, F;
    if (d.state !== iR) return _();
    for (D in y)
      if (F = y[D], F.name === d.name) {
        if (F.state === jy) return aR(v);
        F.state === lR ? (F.state = Hy, F.timer.stop(), F.on.call("interrupt", l, l.__data__, F.index, F.group), delete y[D]) : +D < c && (F.state = Hy, F.timer.stop(), F.on.call("cancel", l, l.__data__, F.index, F.group), delete y[D]);
      }
    if (aR(function() {
      d.state === jy && (d.state = lR, d.timer.restart(T, d.delay, d.time), T(R));
    }), d.state = zx, d.on.call("start", l, l.__data__, d.index, d.group), d.state === zx) {
      for (d.state = jy, g = new Array(z = d.tween.length), D = 0, O = -1; D < z; ++D)
        (F = d.tween[D].value.call(l, l.__data__, d.index, d.group)) && (g[++O] = F);
      g.length = O + 1;
    }
  }
  function T(R) {
    for (var D = R < d.duration ? d.ease.call(null, R / d.duration) : (d.timer.restart(_), d.state = Ax, 1), O = -1, z = g.length; ++O < z; )
      g[O].call(l, D);
    d.state === Ax && (d.on.call("end", l, l.__data__, d.index, d.group), _());
  }
  function _() {
    d.state = Hy, d.timer.stop(), delete y[c];
    for (var R in y) return;
    delete l.__transition;
  }
}
function Py(l, c) {
  var d = l.__transition, y, g, C = !0, v;
  if (d) {
    c = c == null ? null : c + "";
    for (v in d) {
      if ((y = d[v]).name !== c) {
        C = !1;
        continue;
      }
      g = y.state > zx && y.state < Ax, y.state = Hy, y.timer.stop(), y.on.call(g ? "interrupt" : "cancel", l, l.__data__, y.index, y.group), delete d[v];
    }
    C && delete l.__transition;
  }
}
function J2(l) {
  return this.each(function() {
    Py(this, l);
  });
}
function eL(l, c) {
  var d, y;
  return function() {
    var g = lu(this, l), C = g.tween;
    if (C !== d) {
      y = d = C;
      for (var v = 0, T = y.length; v < T; ++v)
        if (y[v].name === c) {
          y = y.slice(), y.splice(v, 1);
          break;
        }
    }
    g.tween = y;
  };
}
function tL(l, c, d) {
  var y, g;
  if (typeof d != "function") throw new Error();
  return function() {
    var C = lu(this, l), v = C.tween;
    if (v !== y) {
      g = (y = v).slice();
      for (var T = { name: c, value: d }, _ = 0, R = g.length; _ < R; ++_)
        if (g[_].name === c) {
          g[_] = T;
          break;
        }
      _ === R && g.push(T);
    }
    C.tween = g;
  };
}
function nL(l, c) {
  var d = this._id;
  if (l += "", arguments.length < 2) {
    for (var y = gl(this.node(), d).tween, g = 0, C = y.length, v; g < C; ++g)
      if ((v = y[g]).name === l)
        return v.value;
    return null;
  }
  return this.each((c == null ? eL : tL)(d, l, c));
}
function Yx(l, c, d) {
  var y = l._id;
  return l.each(function() {
    var g = lu(this, y);
    (g.value || (g.value = {}))[c] = d.apply(this, arguments);
  }), function(g) {
    return gl(g, y).value[c];
  };
}
function IR(l, c) {
  var d;
  return (typeof c == "number" ? ml : c instanceof xc ? Iy : (d = xc(c)) ? (c = d, Iy) : wR)(l, c);
}
function rL(l) {
  return function() {
    this.removeAttribute(l);
  };
}
function aL(l) {
  return function() {
    this.removeAttributeNS(l.space, l.local);
  };
}
function iL(l, c, d) {
  var y, g = d + "", C;
  return function() {
    var v = this.getAttribute(l);
    return v === g ? null : v === y ? C : C = c(y = v, d);
  };
}
function lL(l, c, d) {
  var y, g = d + "", C;
  return function() {
    var v = this.getAttributeNS(l.space, l.local);
    return v === g ? null : v === y ? C : C = c(y = v, d);
  };
}
function uL(l, c, d) {
  var y, g, C;
  return function() {
    var v, T = d(this), _;
    return T == null ? void this.removeAttribute(l) : (v = this.getAttribute(l), _ = T + "", v === _ ? null : v === y && _ === g ? C : (g = _, C = c(y = v, T)));
  };
}
function oL(l, c, d) {
  var y, g, C;
  return function() {
    var v, T = d(this), _;
    return T == null ? void this.removeAttributeNS(l.space, l.local) : (v = this.getAttributeNS(l.space, l.local), _ = T + "", v === _ ? null : v === y && _ === g ? C : (g = _, C = c(y = v, T)));
  };
}
function sL(l, c) {
  var d = Zy(l), y = d === "transform" ? UO : IR;
  return this.attrTween(l, typeof c == "function" ? (d.local ? oL : uL)(d, y, Yx(this, "attr." + l, c)) : c == null ? (d.local ? aL : rL)(d) : (d.local ? lL : iL)(d, y, c));
}
function cL(l, c) {
  return function(d) {
    this.setAttribute(l, c.call(this, d));
  };
}
function fL(l, c) {
  return function(d) {
    this.setAttributeNS(l.space, l.local, c.call(this, d));
  };
}
function dL(l, c) {
  var d, y;
  function g() {
    var C = c.apply(this, arguments);
    return C !== y && (d = (y = C) && fL(l, C)), d;
  }
  return g._value = c, g;
}
function pL(l, c) {
  var d, y;
  function g() {
    var C = c.apply(this, arguments);
    return C !== y && (d = (y = C) && cL(l, C)), d;
  }
  return g._value = c, g;
}
function hL(l, c) {
  var d = "attr." + l;
  if (arguments.length < 2) return (d = this.tween(d)) && d._value;
  if (c == null) return this.tween(d, null);
  if (typeof c != "function") throw new Error();
  var y = Zy(l);
  return this.tween(d, (y.local ? dL : pL)(y, c));
}
function vL(l, c) {
  return function() {
    Ix(this, l).delay = +c.apply(this, arguments);
  };
}
function mL(l, c) {
  return c = +c, function() {
    Ix(this, l).delay = c;
  };
}
function yL(l) {
  var c = this._id;
  return arguments.length ? this.each((typeof l == "function" ? vL : mL)(c, l)) : gl(this.node(), c).delay;
}
function gL(l, c) {
  return function() {
    lu(this, l).duration = +c.apply(this, arguments);
  };
}
function SL(l, c) {
  return c = +c, function() {
    lu(this, l).duration = c;
  };
}
function xL(l) {
  var c = this._id;
  return arguments.length ? this.each((typeof l == "function" ? gL : SL)(c, l)) : gl(this.node(), c).duration;
}
function EL(l, c) {
  if (typeof c != "function") throw new Error();
  return function() {
    lu(this, l).ease = c;
  };
}
function CL(l) {
  var c = this._id;
  return arguments.length ? this.each(EL(c, l)) : gl(this.node(), c).ease;
}
function wL(l, c) {
  return function() {
    var d = c.apply(this, arguments);
    if (typeof d != "function") throw new Error();
    lu(this, l).ease = d;
  };
}
function RL(l) {
  if (typeof l != "function") throw new Error();
  return this.each(wL(this._id, l));
}
function bL(l) {
  typeof l != "function" && (l = MR(l));
  for (var c = this._groups, d = c.length, y = new Array(d), g = 0; g < d; ++g)
    for (var C = c[g], v = C.length, T = y[g] = [], _, R = 0; R < v; ++R)
      (_ = C[R]) && l.call(_, _.__data__, R, C) && T.push(_);
  return new ro(y, this._parents, this._name, this._id);
}
function _L(l) {
  if (l._id !== this._id) throw new Error();
  for (var c = this._groups, d = l._groups, y = c.length, g = d.length, C = Math.min(y, g), v = new Array(y), T = 0; T < C; ++T)
    for (var _ = c[T], R = d[T], D = _.length, O = v[T] = new Array(D), z, F = 0; F < D; ++F)
      (z = _[F] || R[F]) && (O[F] = z);
  for (; T < y; ++T)
    v[T] = c[T];
  return new ro(v, this._parents, this._name, this._id);
}
function TL(l) {
  return (l + "").trim().split(/^|\s+/).every(function(c) {
    var d = c.indexOf(".");
    return d >= 0 && (c = c.slice(0, d)), !c || c === "start";
  });
}
function kL(l, c, d) {
  var y, g, C = TL(c) ? Ix : lu;
  return function() {
    var v = C(this, l), T = v.on;
    T !== y && (g = (y = T).copy()).on(c, d), v.on = g;
  };
}
function DL(l, c) {
  var d = this._id;
  return arguments.length < 2 ? gl(this.node(), d).on.on(l) : this.each(kL(d, l, c));
}
function ML(l) {
  return function() {
    var c = this.parentNode;
    for (var d in this.__transition) if (+d !== l) return;
    c && c.removeChild(this);
  };
}
function OL() {
  return this.on("end.remove", ML(this._id));
}
function NL(l) {
  var c = this._name, d = this._id;
  typeof l != "function" && (l = Vx(l));
  for (var y = this._groups, g = y.length, C = new Array(g), v = 0; v < g; ++v)
    for (var T = y[v], _ = T.length, R = C[v] = new Array(_), D, O, z = 0; z < _; ++z)
      (D = T[z]) && (O = l.call(D, D.__data__, z, T)) && ("__data__" in D && (O.__data__ = D.__data__), R[z] = O, eg(R[z], c, d, z, R, gl(D, d)));
  return new ro(C, this._parents, c, d);
}
function LL(l) {
  var c = this._name, d = this._id;
  typeof l != "function" && (l = DR(l));
  for (var y = this._groups, g = y.length, C = [], v = [], T = 0; T < g; ++T)
    for (var _ = y[T], R = _.length, D, O = 0; O < R; ++O)
      if (D = _[O]) {
        for (var z = l.call(D, D.__data__, O, _), F, oe = gl(D, d), ae = 0, ie = z.length; ae < ie; ++ae)
          (F = z[ae]) && eg(F, c, d, ae, z, oe);
        C.push(z), v.push(D);
      }
  return new ro(C, v, c, d);
}
var zL = Ah.prototype.constructor;
function AL() {
  return new zL(this._groups, this._parents);
}
function UL(l, c) {
  var d, y, g;
  return function() {
    var C = pd(this, l), v = (this.style.removeProperty(l), pd(this, l));
    return C === v ? null : C === d && v === y ? g : g = c(d = C, y = v);
  };
}
function YR(l) {
  return function() {
    this.style.removeProperty(l);
  };
}
function FL(l, c, d) {
  var y, g = d + "", C;
  return function() {
    var v = pd(this, l);
    return v === g ? null : v === y ? C : C = c(y = v, d);
  };
}
function jL(l, c, d) {
  var y, g, C;
  return function() {
    var v = pd(this, l), T = d(this), _ = T + "";
    return T == null && (_ = T = (this.style.removeProperty(l), pd(this, l))), v === _ ? null : v === y && _ === g ? C : (g = _, C = c(y = v, T));
  };
}
function HL(l, c) {
  var d, y, g, C = "style." + c, v = "end." + C, T;
  return function() {
    var _ = lu(this, l), R = _.on, D = _.value[C] == null ? T || (T = YR(c)) : void 0;
    (R !== d || g !== D) && (y = (d = R).copy()).on(v, g = D), _.on = y;
  };
}
function PL(l, c, d) {
  var y = (l += "") == "transform" ? AO : IR;
  return c == null ? this.styleTween(l, UL(l, y)).on("end.style." + l, YR(l)) : typeof c == "function" ? this.styleTween(l, jL(l, y, Yx(this, "style." + l, c))).each(HL(this._id, l)) : this.styleTween(l, FL(l, y, c), d).on("end.style." + l, null);
}
function VL(l, c, d) {
  return function(y) {
    this.style.setProperty(l, c.call(this, y), d);
  };
}
function BL(l, c, d) {
  var y, g;
  function C() {
    var v = c.apply(this, arguments);
    return v !== g && (y = (g = v) && VL(l, v, d)), y;
  }
  return C._value = c, C;
}
function $L(l, c, d) {
  var y = "style." + (l += "");
  if (arguments.length < 2) return (y = this.tween(y)) && y._value;
  if (c == null) return this.tween(y, null);
  if (typeof c != "function") throw new Error();
  return this.tween(y, BL(l, c, d ?? ""));
}
function IL(l) {
  return function() {
    this.textContent = l;
  };
}
function YL(l) {
  return function() {
    var c = l(this);
    this.textContent = c ?? "";
  };
}
function WL(l) {
  return this.tween("text", typeof l == "function" ? YL(Yx(this, "text", l)) : IL(l == null ? "" : l + ""));
}
function QL(l) {
  return function(c) {
    this.textContent = l.call(this, c);
  };
}
function GL(l) {
  var c, d;
  function y() {
    var g = l.apply(this, arguments);
    return g !== d && (c = (d = g) && QL(g)), c;
  }
  return y._value = l, y;
}
function XL(l) {
  var c = "text";
  if (arguments.length < 1) return (c = this.tween(c)) && c._value;
  if (l == null) return this.tween(c, null);
  if (typeof l != "function") throw new Error();
  return this.tween(c, GL(l));
}
function qL() {
  for (var l = this._name, c = this._id, d = WR(), y = this._groups, g = y.length, C = 0; C < g; ++C)
    for (var v = y[C], T = v.length, _, R = 0; R < T; ++R)
      if (_ = v[R]) {
        var D = gl(_, c);
        eg(_, l, d, R, v, {
          time: D.time + D.delay + D.duration,
          delay: 0,
          duration: D.duration,
          ease: D.ease
        });
      }
  return new ro(y, this._parents, l, d);
}
function KL() {
  var l, c, d = this, y = d._id, g = d.size();
  return new Promise(function(C, v) {
    var T = { value: v }, _ = { value: function() {
      --g === 0 && C();
    } };
    d.each(function() {
      var R = lu(this, y), D = R.on;
      D !== l && (c = (l = D).copy(), c._.cancel.push(T), c._.interrupt.push(T), c._.end.push(_)), R.on = c;
    }), g === 0 && C();
  });
}
var ZL = 0;
function ro(l, c, d, y) {
  this._groups = l, this._parents = c, this._name = d, this._id = y;
}
function WR() {
  return ++ZL;
}
var to = Ah.prototype;
ro.prototype = {
  constructor: ro,
  select: NL,
  selectAll: LL,
  selectChild: to.selectChild,
  selectChildren: to.selectChildren,
  filter: bL,
  merge: _L,
  selection: AL,
  transition: qL,
  call: to.call,
  nodes: to.nodes,
  node: to.node,
  size: to.size,
  empty: to.empty,
  each: to.each,
  on: DL,
  attr: sL,
  attrTween: hL,
  style: PL,
  styleTween: $L,
  text: WL,
  textTween: XL,
  remove: OL,
  tween: nL,
  delay: yL,
  duration: xL,
  ease: CL,
  easeVarying: RL,
  end: KL,
  [Symbol.iterator]: to[Symbol.iterator]
};
function JL(l) {
  return ((l *= 2) <= 1 ? l * l * l : (l -= 2) * l * l + 2) / 2;
}
var ez = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: JL
};
function tz(l, c) {
  for (var d; !(d = l.__transition) || !(d = d[c]); )
    if (!(l = l.parentNode))
      throw new Error(`transition ${c} not found`);
  return d;
}
function nz(l) {
  var c, d;
  l instanceof ro ? (c = l._id, l = l._name) : (c = WR(), (d = ez).time = $x(), l = l == null ? null : l + "");
  for (var y = this._groups, g = y.length, C = 0; C < g; ++C)
    for (var v = y[C], T = v.length, _, R = 0; R < T; ++R)
      (_ = v[R]) && eg(_, l, c, R, v, d || tz(_, c));
  return new ro(y, this._parents, l, c);
}
Ah.prototype.interrupt = J2;
Ah.prototype.transition = nz;
const Ay = (l) => () => l;
function rz(l, {
  sourceEvent: c,
  target: d,
  transform: y,
  dispatch: g
}) {
  Object.defineProperties(this, {
    type: { value: l, enumerable: !0, configurable: !0 },
    sourceEvent: { value: c, enumerable: !0, configurable: !0 },
    target: { value: d, enumerable: !0, configurable: !0 },
    transform: { value: y, enumerable: !0, configurable: !0 },
    _: { value: g }
  });
}
function no(l, c, d) {
  this.k = l, this.x = c, this.y = d;
}
no.prototype = {
  constructor: no,
  scale: function(l) {
    return l === 1 ? this : new no(this.k * l, this.x, this.y);
  },
  translate: function(l, c) {
    return l === 0 & c === 0 ? this : new no(this.k, this.x + this.k * l, this.y + this.k * c);
  },
  apply: function(l) {
    return [l[0] * this.k + this.x, l[1] * this.k + this.y];
  },
  applyX: function(l) {
    return l * this.k + this.x;
  },
  applyY: function(l) {
    return l * this.k + this.y;
  },
  invert: function(l) {
    return [(l[0] - this.x) / this.k, (l[1] - this.y) / this.k];
  },
  invertX: function(l) {
    return (l - this.x) / this.k;
  },
  invertY: function(l) {
    return (l - this.y) / this.k;
  },
  rescaleX: function(l) {
    return l.copy().domain(l.range().map(this.invertX, this).map(l.invert, l));
  },
  rescaleY: function(l) {
    return l.copy().domain(l.range().map(this.invertY, this).map(l.invert, l));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var kh = new no(1, 0, 0);
no.prototype;
function Cx(l) {
  l.stopImmediatePropagation();
}
function Rh(l) {
  l.preventDefault(), l.stopImmediatePropagation();
}
function az(l) {
  return (!l.ctrlKey || l.type === "wheel") && !l.button;
}
function iz() {
  var l = this;
  return l instanceof SVGElement ? (l = l.ownerSVGElement || l, l.hasAttribute("viewBox") ? (l = l.viewBox.baseVal, [[l.x, l.y], [l.x + l.width, l.y + l.height]]) : [[0, 0], [l.width.baseVal.value, l.height.baseVal.value]]) : [[0, 0], [l.clientWidth, l.clientHeight]];
}
function uR() {
  return this.__zoom || kh;
}
function lz(l) {
  return -l.deltaY * (l.deltaMode === 1 ? 0.05 : l.deltaMode ? 1 : 2e-3) * (l.ctrlKey ? 10 : 1);
}
function uz() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function oz(l, c, d) {
  var y = l.invertX(c[0][0]) - d[0][0], g = l.invertX(c[1][0]) - d[1][0], C = l.invertY(c[0][1]) - d[0][1], v = l.invertY(c[1][1]) - d[1][1];
  return l.translate(
    g > y ? (y + g) / 2 : Math.min(0, y) || Math.max(0, g),
    v > C ? (C + v) / 2 : Math.min(0, C) || Math.max(0, v)
  );
}
function sz() {
  var l = az, c = iz, d = oz, y = lz, g = uz, C = [0, 1 / 0], v = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], T = 250, _ = PO, R = Px("start", "zoom", "end"), D, O, z, F = 500, oe = 150, ae = 0, ie = 10;
  function ue(V) {
    V.property("__zoom", uR).on("wheel.zoom", Xe, { passive: !1 }).on("mousedown.zoom", lt).on("dblclick.zoom", bt).filter(g).on("touchstart.zoom", Ut).on("touchmove.zoom", ze).on("touchend.zoom touchcancel.zoom", Ve).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  ue.transform = function(V, Se, J, re) {
    var G = V.selection ? V.selection() : V;
    G.property("__zoom", uR), V !== G ? de(V, Se, J, re) : G.interrupt().each(function() {
      ge(this, arguments).event(re).start().zoom(null, typeof Se == "function" ? Se.apply(this, arguments) : Se).end();
    });
  }, ue.scaleBy = function(V, Se, J, re) {
    ue.scaleTo(V, function() {
      var G = this.__zoom.k, ce = typeof Se == "function" ? Se.apply(this, arguments) : Se;
      return G * ce;
    }, J, re);
  }, ue.scaleTo = function(V, Se, J, re) {
    ue.transform(V, function() {
      var G = c.apply(this, arguments), ce = this.__zoom, ee = J == null ? Ne(G) : typeof J == "function" ? J.apply(this, arguments) : J, A = ce.invert(ee), K = typeof Se == "function" ? Se.apply(this, arguments) : Se;
      return d(fe(we(ce, K), ee, A), G, v);
    }, J, re);
  }, ue.translateBy = function(V, Se, J, re) {
    ue.transform(V, function() {
      return d(this.__zoom.translate(
        typeof Se == "function" ? Se.apply(this, arguments) : Se,
        typeof J == "function" ? J.apply(this, arguments) : J
      ), c.apply(this, arguments), v);
    }, null, re);
  }, ue.translateTo = function(V, Se, J, re, G) {
    ue.transform(V, function() {
      var ce = c.apply(this, arguments), ee = this.__zoom, A = re == null ? Ne(ce) : typeof re == "function" ? re.apply(this, arguments) : re;
      return d(kh.translate(A[0], A[1]).scale(ee.k).translate(
        typeof Se == "function" ? -Se.apply(this, arguments) : -Se,
        typeof J == "function" ? -J.apply(this, arguments) : -J
      ), ce, v);
    }, re, G);
  };
  function we(V, Se) {
    return Se = Math.max(C[0], Math.min(C[1], Se)), Se === V.k ? V : new no(Se, V.x, V.y);
  }
  function fe(V, Se, J) {
    var re = Se[0] - J[0] * V.k, G = Se[1] - J[1] * V.k;
    return re === V.x && G === V.y ? V : new no(V.k, re, G);
  }
  function Ne(V) {
    return [(+V[0][0] + +V[1][0]) / 2, (+V[0][1] + +V[1][1]) / 2];
  }
  function de(V, Se, J, re) {
    V.on("start.zoom", function() {
      ge(this, arguments).event(re).start();
    }).on("interrupt.zoom end.zoom", function() {
      ge(this, arguments).event(re).end();
    }).tween("zoom", function() {
      var G = this, ce = arguments, ee = ge(G, ce).event(re), A = c.apply(G, ce), K = J == null ? Ne(A) : typeof J == "function" ? J.apply(G, ce) : J, Be = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), Ae = G.__zoom, et = typeof Se == "function" ? Se.apply(G, ce) : Se, at = _(Ae.invert(K).concat(Be / Ae.k), et.invert(K).concat(Be / et.k));
      return function(qe) {
        if (qe === 1) qe = et;
        else {
          var tt = at(qe), pt = Be / tt[2];
          qe = new no(pt, K[0] - tt[0] * pt, K[1] - tt[1] * pt);
        }
        ee.zoom(null, qe);
      };
    });
  }
  function ge(V, Se, J) {
    return !J && V.__zooming || new xe(V, Se);
  }
  function xe(V, Se) {
    this.that = V, this.args = Se, this.active = 0, this.sourceEvent = null, this.extent = c.apply(V, Se), this.taps = 0;
  }
  xe.prototype = {
    event: function(V) {
      return V && (this.sourceEvent = V), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(V, Se) {
      return this.mouse && V !== "mouse" && (this.mouse[1] = Se.invert(this.mouse[0])), this.touch0 && V !== "touch" && (this.touch0[1] = Se.invert(this.touch0[0])), this.touch1 && V !== "touch" && (this.touch1[1] = Se.invert(this.touch1[0])), this.that.__zoom = Se, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(V) {
      var Se = Xa(this.that).datum();
      R.call(
        V,
        this.that,
        new rz(V, {
          sourceEvent: this.sourceEvent,
          target: ue,
          transform: this.that.__zoom,
          dispatch: R
        }),
        Se
      );
    }
  };
  function Xe(V, ...Se) {
    if (!l.apply(this, arguments)) return;
    var J = ge(this, Se).event(V), re = this.__zoom, G = Math.max(C[0], Math.min(C[1], re.k * Math.pow(2, y.apply(this, arguments)))), ce = yc(V);
    if (J.wheel)
      (J.mouse[0][0] !== ce[0] || J.mouse[0][1] !== ce[1]) && (J.mouse[1] = re.invert(J.mouse[0] = ce)), clearTimeout(J.wheel);
    else {
      if (re.k === G) return;
      J.mouse = [ce, re.invert(ce)], Py(this), J.start();
    }
    Rh(V), J.wheel = setTimeout(ee, oe), J.zoom("mouse", d(fe(we(re, G), J.mouse[0], J.mouse[1]), J.extent, v));
    function ee() {
      J.wheel = null, J.end();
    }
  }
  function lt(V, ...Se) {
    if (z || !l.apply(this, arguments)) return;
    var J = V.currentTarget, re = ge(this, Se, !0).event(V), G = Xa(V.view).on("mousemove.zoom", K, !0).on("mouseup.zoom", Be, !0), ce = yc(V, J), ee = V.clientX, A = V.clientY;
    I2(V.view), Cx(V), re.mouse = [ce, this.__zoom.invert(ce)], Py(this), re.start();
    function K(Ae) {
      if (Rh(Ae), !re.moved) {
        var et = Ae.clientX - ee, at = Ae.clientY - A;
        re.moved = et * et + at * at > ae;
      }
      re.event(Ae).zoom("mouse", d(fe(re.that.__zoom, re.mouse[0] = yc(Ae, J), re.mouse[1]), re.extent, v));
    }
    function Be(Ae) {
      G.on("mousemove.zoom mouseup.zoom", null), Y2(Ae.view, re.moved), Rh(Ae), re.event(Ae).end();
    }
  }
  function bt(V, ...Se) {
    if (l.apply(this, arguments)) {
      var J = this.__zoom, re = yc(V.changedTouches ? V.changedTouches[0] : V, this), G = J.invert(re), ce = J.k * (V.shiftKey ? 0.5 : 2), ee = d(fe(we(J, ce), re, G), c.apply(this, Se), v);
      Rh(V), T > 0 ? Xa(this).transition().duration(T).call(de, ee, re, V) : Xa(this).call(ue.transform, ee, re, V);
    }
  }
  function Ut(V, ...Se) {
    if (l.apply(this, arguments)) {
      var J = V.touches, re = J.length, G = ge(this, Se, V.changedTouches.length === re).event(V), ce, ee, A, K;
      for (Cx(V), ee = 0; ee < re; ++ee)
        A = J[ee], K = yc(A, this), K = [K, this.__zoom.invert(K), A.identifier], G.touch0 ? !G.touch1 && G.touch0[2] !== K[2] && (G.touch1 = K, G.taps = 0) : (G.touch0 = K, ce = !0, G.taps = 1 + !!D);
      D && (D = clearTimeout(D)), ce && (G.taps < 2 && (O = K[0], D = setTimeout(function() {
        D = null;
      }, F)), Py(this), G.start());
    }
  }
  function ze(V, ...Se) {
    if (this.__zooming) {
      var J = ge(this, Se).event(V), re = V.changedTouches, G = re.length, ce, ee, A, K;
      for (Rh(V), ce = 0; ce < G; ++ce)
        ee = re[ce], A = yc(ee, this), J.touch0 && J.touch0[2] === ee.identifier ? J.touch0[0] = A : J.touch1 && J.touch1[2] === ee.identifier && (J.touch1[0] = A);
      if (ee = J.that.__zoom, J.touch1) {
        var Be = J.touch0[0], Ae = J.touch0[1], et = J.touch1[0], at = J.touch1[1], qe = (qe = et[0] - Be[0]) * qe + (qe = et[1] - Be[1]) * qe, tt = (tt = at[0] - Ae[0]) * tt + (tt = at[1] - Ae[1]) * tt;
        ee = we(ee, Math.sqrt(qe / tt)), A = [(Be[0] + et[0]) / 2, (Be[1] + et[1]) / 2], K = [(Ae[0] + at[0]) / 2, (Ae[1] + at[1]) / 2];
      } else if (J.touch0) A = J.touch0[0], K = J.touch0[1];
      else return;
      J.zoom("touch", d(fe(ee, A, K), J.extent, v));
    }
  }
  function Ve(V, ...Se) {
    if (this.__zooming) {
      var J = ge(this, Se).event(V), re = V.changedTouches, G = re.length, ce, ee;
      for (Cx(V), z && clearTimeout(z), z = setTimeout(function() {
        z = null;
      }, F), ce = 0; ce < G; ++ce)
        ee = re[ce], J.touch0 && J.touch0[2] === ee.identifier ? delete J.touch0 : J.touch1 && J.touch1[2] === ee.identifier && delete J.touch1;
      if (J.touch1 && !J.touch0 && (J.touch0 = J.touch1, delete J.touch1), J.touch0) J.touch0[1] = this.__zoom.invert(J.touch0[0]);
      else if (J.end(), J.taps === 2 && (ee = yc(ee, this), Math.hypot(O[0] - ee[0], O[1] - ee[1]) < ie)) {
        var A = Xa(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return ue.wheelDelta = function(V) {
    return arguments.length ? (y = typeof V == "function" ? V : Ay(+V), ue) : y;
  }, ue.filter = function(V) {
    return arguments.length ? (l = typeof V == "function" ? V : Ay(!!V), ue) : l;
  }, ue.touchable = function(V) {
    return arguments.length ? (g = typeof V == "function" ? V : Ay(!!V), ue) : g;
  }, ue.extent = function(V) {
    return arguments.length ? (c = typeof V == "function" ? V : Ay([[+V[0][0], +V[0][1]], [+V[1][0], +V[1][1]]]), ue) : c;
  }, ue.scaleExtent = function(V) {
    return arguments.length ? (C[0] = +V[0], C[1] = +V[1], ue) : [C[0], C[1]];
  }, ue.translateExtent = function(V) {
    return arguments.length ? (v[0][0] = +V[0][0], v[1][0] = +V[1][0], v[0][1] = +V[0][1], v[1][1] = +V[1][1], ue) : [[v[0][0], v[0][1]], [v[1][0], v[1][1]]];
  }, ue.constrain = function(V) {
    return arguments.length ? (d = V, ue) : d;
  }, ue.duration = function(V) {
    return arguments.length ? (T = +V, ue) : T;
  }, ue.interpolate = function(V) {
    return arguments.length ? (_ = V, ue) : _;
  }, ue.on = function() {
    var V = R.on.apply(R, arguments);
    return V === R ? ue : V;
  }, ue.clickDistance = function(V) {
    return arguments.length ? (ae = (V = +V) * V, ue) : Math.sqrt(ae);
  }, ue.tapDistance = function(V) {
    return arguments.length ? (ie = +V, ue) : ie;
  }, ue;
}
var cz = 0.05;
function fz(l) {
  let c = 1 / 0, d = -1 / 0;
  for (let y of l) {
    if (y.visible === !1) continue;
    let [g, C] = SR(y.x);
    g < c && (c = g), C > d && (d = C);
  }
  return isFinite(c) ? [c, d] : [0, 1];
}
function QR(l) {
  let c = 1 / 0, d = -1 / 0;
  for (let g of l) {
    if (g.visible === !1) continue;
    let [C, v] = SR(g.y);
    C < c && (c = C), v > d && (d = v);
  }
  if (!isFinite(c)) return [0, 1];
  let y = (d - c) * cz;
  return [c - y, d + y];
}
function dz(l, c, d, y) {
  let g = c - d.left - d.right, C = y ? [l[1], l[0]] : l;
  return Oh().domain(C).range([0, g]);
}
function GR(l, c, d) {
  let y = c - d.top - d.bottom;
  return Oh().domain(l).range([y, 0]);
}
var oR = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#be185d", "#854d0e", "#4f46e5", "#65a30d"], pz = { background: "#ffffff", axisColor: "#374151", gridColor: "#e5e7eb", tickColor: "#6b7280", labelColor: "#111827", crosshairColor: "#9ca3af", regionFill: "rgba(37, 99, 235, 0.1)", regionStroke: "rgba(37, 99, 235, 0.4)", tooltipBg: "#ffffff", tooltipBorder: "#d1d5db", tooltipText: "#111827" }, hz = { background: "#111827", axisColor: "#d1d5db", gridColor: "#374151", tickColor: "#9ca3af", labelColor: "#f9fafb", crosshairColor: "#6b7280", regionFill: "rgba(96, 165, 250, 0.15)", regionStroke: "rgba(96, 165, 250, 0.5)", tooltipBg: "#1f2937", tooltipBorder: "#4b5563", tooltipText: "#f9fafb" };
function vd(l) {
  return oR[l % oR.length];
}
function tg(l) {
  return l === "dark" ? hz : pz;
}
var sR = 1.5;
function vz(l) {
  let { plotWidth: c, plotHeight: d, xScale: y, yScale: g, scaleExtent: C = [1, 50], enabled: v = !0, onViewChange: T } = l, _ = Oe.useRef(null), R = Oe.useRef(null), D = Oe.useRef(T);
  D.current = T;
  let O = Oe.useRef(C);
  O.current = C;
  let [z, F] = Oe.useState(kh), oe = Oe.useMemo(() => z.rescaleX(y.copy()), [z, y]), ae = Oe.useMemo(() => z.rescaleY(g.copy()), [z, g]);
  Oe.useEffect(() => {
    let fe = _.current;
    if (!fe || !v) return;
    let Ne = sz().scaleExtent(O.current).extent([[0, 0], [c, d]]).translateExtent([[-1 / 0, -1 / 0], [1 / 0, 1 / 0]]).on("zoom", (de) => {
      let ge = de.transform;
      if (F(ge), D.current) {
        let xe = ge.rescaleX(y.copy()), Xe = ge.rescaleY(g.copy());
        D.current(xe.domain(), Xe.domain());
      }
    });
    return R.current = Ne, Xa(fe).call(Ne), Xa(fe).on("dblclick.zoom", () => {
      Xa(fe).transition().duration(300).call(Ne.transform, kh);
    }), () => {
      Xa(fe).on(".zoom", null);
    };
  }, [c, d, v, y, g]);
  let ie = Oe.useCallback(() => {
    !_.current || !R.current || Xa(_.current).transition().duration(300).call(R.current.transform, kh);
  }, []), ue = Oe.useCallback(() => {
    !_.current || !R.current || Xa(_.current).transition().duration(200).call(R.current.scaleBy, sR);
  }, []), we = Oe.useCallback(() => {
    !_.current || !R.current || Xa(_.current).transition().duration(200).call(R.current.scaleBy, 1 / sR);
  }, []);
  return { zoomRef: _, state: { transform: z, isZoomed: z.k !== 1 || z.x !== 0 || z.y !== 0 }, zoomedXScale: oe, zoomedYScale: ae, resetZoom: ie, zoomIn: ue, zoomOut: we };
}
function mz(l, c, d, y, g, C, v) {
  let T = y - d;
  if (T <= v) {
    let z = [];
    for (let F = d; F < y; F++) z.push({ px: g(l[F]), py: C(c[F]), index: F });
    return z;
  }
  let _ = [];
  _.push({ px: g(l[d]), py: C(c[d]), index: d });
  let R = v - 2, D = (T - 2) / R, O = d;
  for (let z = 0; z < R; z++) {
    let F = d + 1 + Math.floor(z * D), oe = d + 1 + Math.min(Math.floor((z + 1) * D), T - 2), ae = oe, ie = d + 1 + Math.min(Math.floor((z + 2) * D), T - 2), ue, we;
    if (z === R - 1) ue = g(l[y - 1]), we = C(c[y - 1]);
    else {
      ue = 0, we = 0;
      let xe = ie - ae;
      for (let Xe = ae; Xe < ie; Xe++) ue += g(l[Xe]), we += C(c[Xe]);
      xe > 0 && (ue /= xe, we /= xe);
    }
    let fe = g(l[O]), Ne = C(c[O]), de = -1, ge = F;
    for (let xe = F; xe < oe; xe++) {
      let Xe = g(l[xe]), lt = C(c[xe]), bt = Math.abs((fe - ue) * (lt - Ne) - (fe - Xe) * (we - Ne));
      bt > de && (de = bt, ge = xe);
    }
    _.push({ px: g(l[ge]), py: C(c[ge]), index: ge }), O = ge;
  }
  return _.push({ px: g(l[y - 1]), py: C(c[y - 1]), index: y - 1 }), _;
}
var yz = 1.5, gz = { solid: [], dashed: [8, 4], dotted: [2, 2], "dash-dot": [8, 4, 2, 4] }, Sz = 2e3;
function xz(l, c, d) {
  l.clearRect(0, 0, c, d);
}
function Ez(l, c, d, y, g, C, v) {
  let { highlighted: T = !1, opacity: _ = 1 } = v ?? {}, R = Math.min(c.x.length, c.y.length);
  if (R < 2) return;
  let D = c.color ?? vd(d), O = c.lineWidth ?? yz, z = T ? O + 1 : O, F = gz[c.lineStyle ?? "solid"] ?? [], [oe, ae] = y.domain(), ie = Math.min(oe, ae), ue = Math.max(oe, ae), we = 0, fe = R;
  for (let de = 0; de < R; de++) if (c.x[de] >= ie || de < R - 1 && c.x[de + 1] >= ie) {
    we = Math.max(0, de - 1);
    break;
  }
  for (let de = R - 1; de >= 0; de--) if (c.x[de] <= ue || de > 0 && c.x[de - 1] <= ue) {
    fe = Math.min(R, de + 2);
    break;
  }
  let Ne = fe - we;
  if (l.save(), l.beginPath(), l.strokeStyle = D, l.lineWidth = z, l.globalAlpha = _, l.lineJoin = "round", l.setLineDash(F), Ne > Sz) {
    let de = Math.max(Math.ceil(C * 2), 200), ge = mz(c.x, c.y, we, fe, y, g, de);
    if (ge.length > 0) {
      l.moveTo(ge[0].px, ge[0].py);
      for (let xe = 1; xe < ge.length; xe++) l.lineTo(ge[xe].px, ge[xe].py);
    }
  } else {
    let de = !1;
    for (let ge = we; ge < fe; ge++) {
      let xe = y(c.x[ge]), Xe = g(c.y[ge]);
      de ? l.lineTo(xe, Xe) : (l.moveTo(xe, Xe), de = !0);
    }
  }
  l.stroke(), l.restore();
}
function Cz(l, c, d, y, g, C, v) {
  xz(l, g, C), c.forEach((T, _) => {
    T.visible !== !1 && Ez(l, T, _, d, y, g, { highlighted: T.id === v, opacity: v && T.id !== v ? 0.3 : 1 });
  });
}
var XR = Oe.forwardRef(function({ spectra: l, xScale: c, yScale: d, width: y, height: g, highlightedId: C }, v) {
  let T = Oe.useRef(null), _ = Oe.useRef(1);
  return Oe.useImperativeHandle(v, () => T.current, []), Oe.useEffect(() => {
    let R = T.current;
    if (!R) return;
    let D = window.devicePixelRatio || 1;
    _.current = D, R.width = y * D, R.height = g * D;
  }, [y, g]), Oe.useEffect(() => {
    let R = T.current;
    if (!R) return;
    let D = R.getContext("2d");
    if (!D) return;
    let O = _.current;
    D.setTransform(O, 0, 0, O, 0, 0), Cz(D, l, c, d, y, g, C);
  }, [l, c, d, y, g, C]), se.jsx("canvas", { ref: T, style: { width: y, height: g, position: "absolute", top: 0, left: 0, pointerEvents: "none" } });
});
function cR(l, c) {
  let [d, y] = l.domain(), g = Math.min(d, y), C = (Math.max(d, y) - g) / (c - 1);
  return Array.from({ length: c }, (v, T) => g + T * C);
}
function fR(l) {
  return Math.abs(l) >= 1e3 ? Math.round(l).toString() : Math.abs(l) >= 1 ? l.toFixed(1) : Math.abs(l) >= 0.01 ? l.toFixed(3) : l.toExponential(1);
}
function qR({ xScale: l, yScale: c, width: d, height: y, xLabel: g, yLabel: C, showGrid: v = !0, colors: T }) {
  let _ = cR(l, 8), R = cR(c, 6);
  return se.jsxs("g", { children: [v && se.jsxs("g", { children: [_.map((D) => se.jsx("line", { x1: l(D), x2: l(D), y1: 0, y2: y, stroke: T.gridColor, strokeWidth: 0.5 }, `xgrid-${D}`)), R.map((D) => se.jsx("line", { x1: 0, x2: d, y1: c(D), y2: c(D), stroke: T.gridColor, strokeWidth: 0.5 }, `ygrid-${D}`))] }), se.jsxs("g", { transform: `translate(0, ${y})`, children: [se.jsx("line", { x1: 0, x2: d, y1: 0, y2: 0, stroke: T.axisColor }), _.map((D) => se.jsxs("g", { transform: `translate(${l(D)}, 0)`, children: [se.jsx("line", { y1: 0, y2: 6, stroke: T.axisColor }), se.jsx("text", { y: 20, textAnchor: "middle", fill: T.tickColor, fontSize: 11, fontFamily: "system-ui, sans-serif", children: fR(D) })] }, `xtick-${D}`)), g && se.jsx("text", { x: d / 2, y: 42, textAnchor: "middle", fill: T.labelColor, fontSize: 13, fontFamily: "system-ui, sans-serif", children: g })] }), se.jsxs("g", { children: [se.jsx("line", { x1: 0, x2: 0, y1: 0, y2: y, stroke: T.axisColor }), R.map((D) => se.jsxs("g", { transform: `translate(0, ${c(D)})`, children: [se.jsx("line", { x1: -6, x2: 0, stroke: T.axisColor }), se.jsx("text", { x: -10, textAnchor: "end", dominantBaseline: "middle", fill: T.tickColor, fontSize: 11, fontFamily: "system-ui, sans-serif", children: fR(D) })] }, `ytick-${D}`)), C && se.jsx("text", { transform: `translate(-50, ${y / 2}) rotate(-90)`, textAnchor: "middle", fill: T.labelColor, fontSize: 13, fontFamily: "system-ui, sans-serif", children: C })] })] });
}
function wz({ peaks: l, xScale: c, yScale: d, colors: y, onPeakClick: g }) {
  let [C, v] = c.domain(), T = Math.min(C, v), _ = Math.max(C, v), R = l.filter((D) => D.x >= T && D.x <= _);
  return se.jsx("g", { className: "spectraview-peaks", children: R.map((D, O) => {
    let z = c(D.x), F = d(D.y);
    return se.jsxs("g", { transform: `translate(${z}, ${F})`, style: { cursor: g ? "pointer" : "default" }, onClick: () => g == null ? void 0 : g(D), children: [se.jsx("polygon", { points: `0,-5 -5,${-5 * 2.5} 5,${-5 * 2.5}`, fill: y.labelColor, opacity: 0.8 }), D.label && se.jsx("text", { y: -5 * 2.5 - 14, textAnchor: "middle", fill: y.labelColor, fontSize: 10, fontFamily: "system-ui, sans-serif", fontWeight: 500, children: D.label })] }, `peak-${D.x}-${O}`);
  }) });
}
function Rz({ regions: l, xScale: c, height: d, colors: y }) {
  return se.jsx("g", { className: "spectraview-regions", children: l.map((g, C) => {
    let v = c(g.xStart), T = c(g.xEnd), _ = Math.min(v, T), R = Math.abs(T - v);
    return se.jsxs("g", { children: [se.jsx("rect", { x: _, y: 0, width: R, height: d, fill: g.color ?? y.regionFill, stroke: y.regionStroke, strokeWidth: 1 }), g.label && se.jsx("text", { x: _ + R / 2, y: 12, textAnchor: "middle", fill: y.labelColor, fontSize: 10, fontFamily: "system-ui, sans-serif", children: g.label })] }, `region-${C}`);
  }) });
}
function bz({ position: l, width: c, height: d, colors: y, snapPoint: g }) {
  return l ? se.jsxs("g", { className: "spectraview-crosshair", pointerEvents: "none", children: [se.jsx("line", { x1: l.px, x2: l.px, y1: 0, y2: d, stroke: y.crosshairColor, strokeWidth: 1, strokeDasharray: "4 4" }), se.jsx("line", { x1: 0, x2: c, y1: l.py, y2: l.py, stroke: y.crosshairColor, strokeWidth: 1, strokeDasharray: "4 4" }), g && se.jsx("circle", { cx: g.px, cy: g.py, r: 4, fill: g.color ?? y.crosshairColor, stroke: y.background, strokeWidth: 1.5 }), se.jsxs("g", { transform: `translate(${Math.min(l.px + 10, c - 100)}, ${Math.max(l.py - 10, 20)})`, children: [se.jsx("rect", { x: 0, y: -14, width: 90, height: 18, rx: 3, fill: y.tooltipBg, stroke: y.tooltipBorder, strokeWidth: 0.5, opacity: 0.9 }), se.jsxs("text", { x: 5, y: 0, fill: y.tooltipText, fontSize: 10, fontFamily: "monospace", children: [dR((g == null ? void 0 : g.dataX) ?? l.dataX), ",", " ", dR((g == null ? void 0 : g.dataY) ?? l.dataY)] })] })] }) : null;
}
function dR(l) {
  return Math.abs(l) >= 100 ? Math.round(l).toString() : Math.abs(l) >= 1 ? l.toFixed(1) : l.toFixed(4);
}
function _z({ annotations: l, xScale: c, yScale: d, colors: y }) {
  return l.length === 0 ? null : se.jsx("g", { className: "spectraview-annotations", pointerEvents: "none", children: l.map((g) => {
    let C = c(g.x), v = d(g.y), [T, _] = g.offset ?? [0, -20], R = C + T, D = v + _, O = g.fontSize ?? 11, z = g.color ?? y.tickColor, F = g.showAnchorLine !== !1;
    return se.jsxs("g", { children: [F && se.jsx("line", { x1: C, y1: v, x2: R, y2: D, stroke: z, strokeWidth: 0.75, strokeDasharray: "3 2", opacity: 0.6 }), se.jsx("circle", { cx: C, cy: v, r: 2.5, fill: z, opacity: 0.8 }), se.jsx("text", { x: R, y: D, fill: y.background, fontSize: O, fontFamily: "system-ui, sans-serif", textAnchor: "middle", dominantBaseline: "auto", stroke: y.background, strokeWidth: 3, strokeLinejoin: "round", children: g.text }), se.jsx("text", { x: R, y: D, fill: z, fontSize: O, fontFamily: "system-ui, sans-serif", textAnchor: "middle", dominantBaseline: "auto", children: g.text })] }, g.id);
  }) });
}
function KR(l, c, d) {
  if (d === 0) return -1;
  if (d === 1) return 0;
  let y = l[d - 1] >= l[0], g = 0, C = d - 1;
  for (; g < C - 1; ) {
    let _ = g + C >>> 1, R = l[_];
    y ? R <= c ? g = _ : C = _ : R >= c ? g = _ : C = _;
  }
  let v = Math.abs(l[g] - c), T = Math.abs(l[C] - c);
  return v <= T ? g : C;
}
function Tz(l, c, d, y, g) {
  let C = null;
  for (let v of l) {
    if (v.visible === !1) continue;
    let T = Math.min(v.x.length, v.y.length);
    if (T < 2) continue;
    let _ = KR(v.x, c, T);
    if (_ < 0) continue;
    let R = v.x[_], D = v.y[_], O = Math.abs(y(R) - y(c)), z = Math.abs(g(D) - d), F = Math.sqrt(O * O + z * z);
    (!C || F < C.distance) && (C = { spectrumId: v.id, index: _, x: R, y: D, distance: F });
  }
  return C;
}
var wx = (l) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, border: `1px solid ${l === "dark" ? "#4b5563" : "#d1d5db"}`, borderRadius: 4, background: l === "dark" ? "#1f2937" : "#ffffff", color: l === "dark" ? "#d1d5db" : "#374151", fontSize: 14, cursor: "pointer", padding: 0, lineHeight: 1 }), kz = (l) => ({ display: "flex", gap: 4, padding: "4px 0", borderBottom: `1px solid ${l === "dark" ? "#374151" : "#e5e7eb"}` }), Dz = Oe.memo(function({ onZoomIn: l, onZoomOut: c, onReset: d, isZoomed: y, theme: g }) {
  return se.jsxs("div", { style: kz(g), className: "spectraview-toolbar", children: [se.jsx("button", { type: "button", style: wx(g), onClick: l, title: "Zoom in", "aria-label": "Zoom in", children: "+" }), se.jsx("button", { type: "button", style: wx(g), onClick: c, title: "Zoom out", "aria-label": "Zoom out", children: "−" }), se.jsx("button", { type: "button", style: { ...wx(g), opacity: y ? 1 : 0.4 }, onClick: d, disabled: !y, title: "Reset zoom", "aria-label": "Reset zoom", children: "↺" })] });
}), Mz = (l, c) => ({ display: "flex", flexDirection: c === "left" || c === "right" ? "column" : "row", flexWrap: "wrap", gap: 6, padding: "4px 8px", fontSize: 12, fontFamily: "system-ui, sans-serif", borderTop: c === "bottom" ? `1px solid ${l === "dark" ? "#374151" : "#e5e7eb"}` : void 0, borderBottom: c === "top" ? `1px solid ${l === "dark" ? "#374151" : "#e5e7eb"}` : void 0, borderLeft: c === "right" ? `1px solid ${l === "dark" ? "#374151" : "#e5e7eb"}` : void 0, borderRight: c === "left" ? `1px solid ${l === "dark" ? "#374151" : "#e5e7eb"}` : void 0 }), Oz = (l, c, d) => ({ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer", opacity: c ? 0.4 : 1, fontWeight: d ? 600 : 400, color: l === "dark" ? "#e5e7eb" : "#374151", userSelect: "none", padding: "2px 4px", borderRadius: 3, background: d ? l === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)" : "transparent", transition: "background 0.15s, opacity 0.15s" }), Nz = (l, c) => ({ width: 12, height: 3, borderRadius: 1, background: l, opacity: c ? 0.4 : 1, flexShrink: 0 }), pR = Oe.memo(function({ spectra: l, theme: c, position: d, onToggleVisibility: y, onHighlight: g, highlightedId: C }) {
  return l.length <= 1 ? null : se.jsx("div", { className: "spectraview-legend", style: Mz(c, d), role: "list", "aria-label": "Spectrum legend", children: l.map((v, T) => {
    let _ = v.color ?? vd(T), R = v.visible === !1, D = C === v.id;
    return se.jsxs("div", { role: "listitem", style: Oz(c, R, D), onClick: () => y == null ? void 0 : y(v.id), onMouseEnter: () => g == null ? void 0 : g(v.id), onMouseLeave: () => g == null ? void 0 : g(null), title: R ? `Show ${v.label}` : `Hide ${v.label}`, children: [se.jsx("span", { style: Nz(_, R) }), se.jsx("span", { style: { textDecoration: R ? "line-through" : "none", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: v.label })] }, v.id);
  }) });
});
function Lz({ enabled: l, theme: c, width: d, height: y, onDrop: g, children: C }) {
  let [v, T] = Oe.useState(!1), _ = { current: 0 }, R = Oe.useCallback((F) => {
    l && (F.preventDefault(), _.current++, T(!0));
  }, [l]), D = Oe.useCallback((F) => {
    l && (F.preventDefault(), _.current--, _.current <= 0 && (_.current = 0, T(!1)));
  }, [l]), O = Oe.useCallback((F) => {
    l && (F.preventDefault(), F.dataTransfer.dropEffect = "copy");
  }, [l]), z = Oe.useCallback((F) => {
    if (!l) return;
    F.preventDefault(), _.current = 0, T(!1);
    let oe = Array.from(F.dataTransfer.files);
    oe.length > 0 && (g == null || g(oe));
  }, [l, g]);
  return se.jsxs("div", { style: { position: "relative", width: d, height: y }, onDragEnter: R, onDragLeave: D, onDragOver: O, onDrop: z, children: [C, v && se.jsx("div", { "data-testid": "dropzone-overlay", style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: c === "dark" ? "rgba(30, 58, 138, 0.6)" : "rgba(59, 130, 246, 0.15)", border: `2px dashed ${c === "dark" ? "#60a5fa" : "#3b82f6"}`, borderRadius: 4, zIndex: 100, pointerEvents: "none", fontSize: 14, fontFamily: "system-ui, sans-serif", color: c === "dark" ? "#93c5fd" : "#1d4ed8", fontWeight: 500 }, children: "Drop spectrum files here" })] });
}
var hR = 8;
function zz({ spectra: l, xScale: c, plotWidth: d, plotHeight: y, margin: g, theme: C, showGrid: v, xLabel: T, yLabel: _ }) {
  let R = l.filter((oe) => oe.visible !== !1), D = Oe.useMemo(() => tg(C), [C]), O = R.length, z = (O - 1) * hR, F = Math.max(40, Math.floor((y - z) / Math.max(O, 1)));
  return se.jsx("g", { className: "spectraview-stacked", children: R.map((oe, ae) => {
    let ie = ae * (F + hR), ue = QR([oe]), we = GR(ue, F + g.top + g.bottom, { ...g, top: 0, bottom: 0 }), fe = oe.color ?? vd(ae), Ne = { ...oe, color: fe };
    return se.jsxs("g", { transform: `translate(0, ${ie})`, children: [se.jsx("rect", { x: 0, y: 0, width: d, height: F, fill: "transparent", stroke: D.gridColor, strokeWidth: 0.5, rx: 2 }), se.jsx(qR, { xScale: c, yScale: we, width: d, height: F, xLabel: ae === O - 1 ? T : "", yLabel: _, showGrid: v, colors: D }), se.jsx("text", { x: 4, y: 14, fill: fe, fontSize: 11, fontFamily: "system-ui, sans-serif", fontWeight: 500, children: oe.label }), se.jsx("foreignObject", { x: 0, y: 0, width: d, height: F, children: se.jsx(XR, { spectra: [Ne], xScale: c, yScale: we, width: d, height: F }) })] }, oe.id);
  }) });
}
function Az(l) {
  let { enabled: c, xScale: d, onRegionSelect: y } = l, [g, C] = Oe.useState(null), v = Oe.useRef(null), T = Oe.useCallback((D) => {
    if (!c || !D.shiftKey) return;
    D.preventDefault();
    let O = D.currentTarget.getBoundingClientRect(), z = D.clientX - O.left, F = d.invert(z);
    v.current = F, C({ xStart: F, xEnd: F });
  }, [c, d]), _ = Oe.useCallback((D) => {
    if (v.current === null) return;
    let O = D.currentTarget.getBoundingClientRect(), z = D.clientX - O.left, F = d.invert(z), oe = v.current;
    C({ xStart: Math.min(oe, F), xEnd: Math.max(oe, F) });
  }, [d]), R = Oe.useCallback(() => {
    v.current === null || !g || (Math.abs(g.xEnd - g.xStart) > 0 && (y == null || y(g)), v.current = null, C(null));
  }, [g, y]);
  return { pendingRegion: g, handleMouseDown: T, handleMouseMove: _, handleMouseUp: R };
}
function Uz() {
  let [l, c] = Oe.useState(null), d = Oe.useRef(null), y = Oe.useRef(null), g = Oe.useCallback((C) => {
    if (d.current && (d.current.disconnect(), d.current = null), y.current = C, !C) return;
    let v = new ResizeObserver((R) => {
      let D = R[0];
      if (!D) return;
      let { width: O, height: z } = D.contentRect;
      c({ width: Math.round(O), height: Math.round(z) });
    });
    v.observe(C), d.current = v;
    let { width: T, height: _ } = C.getBoundingClientRect();
    c({ width: Math.round(T), height: Math.round(_) });
  }, []);
  return Oe.useEffect(() => () => {
    var C;
    (C = d.current) == null || C.disconnect();
  }, []), { ref: g, size: l };
}
function Fz(l) {
  let { onZoomIn: c, onZoomOut: d, onReset: y, enabled: g = !0 } = l;
  return Oe.useCallback((C) => {
    if (g) switch (C.key) {
      case "+":
      case "=":
        C.preventDefault(), c();
        break;
      case "-":
        C.preventDefault(), d();
        break;
      case "Escape":
        C.preventDefault(), y();
        break;
    }
  }, [g, c, d, y]);
}
function jz(l, c, d) {
  return l === 0 ? "Empty spectrum viewer" : `Interactive spectrum viewer showing ${l} ${l === 1 ? "spectrum" : "spectra"}. X-axis: ${c}. Y-axis: ${d}. Use arrow keys to pan, +/- to zoom, Escape to reset.`;
}
var Hz = { top: 20, right: 20, bottom: 50, left: 65 }, Pz = 800, Vz = 400;
function Bz(l) {
  return { width: l.width ?? Pz, height: l.height ?? Vz, reverseX: l.reverseX ?? !1, showGrid: l.showGrid ?? !0, showCrosshair: l.showCrosshair ?? !0, showToolbar: l.showToolbar ?? !0, showLegend: l.showLegend ?? !0, legendPosition: l.legendPosition ?? "bottom", displayMode: l.displayMode ?? "overlay", margin: { ...Hz, ...l.margin }, theme: l.theme ?? "light", responsive: l.responsive ?? !1, enableDragDrop: l.enableDragDrop ?? !1, enableRegionSelect: l.enableRegionSelect ?? !1 };
}
function $z(l, c, d) {
  let y = l[0];
  return { xLabel: c ?? (y == null ? void 0 : y.xUnit) ?? "x", yLabel: d ?? (y == null ? void 0 : y.yUnit) ?? "y" };
}
function Iz(l) {
  let { spectra: c, peaks: d = [], regions: y = [], annotations: g = [], onPeakClick: C, onViewChange: v, onCrosshairMove: T, onToggleVisibility: _, onFileDrop: R, onRegionSelect: D, canvasRef: O, snapCrosshair: z = !0 } = l, { ref: F, size: oe } = Uz(), ae = `spectraview-clip-${Oe.useId().replace(/:/g, "")}`, ie = Oe.useMemo(() => Bz(l), [l.width, l.height, l.reverseX, l.showGrid, l.showCrosshair, l.showToolbar, l.showLegend, l.legendPosition, l.displayMode, l.margin, l.theme, l.responsive, l.enableDragDrop, l.enableRegionSelect]), ue = ie.responsive && oe ? oe.width : ie.width, { height: we, margin: fe, reverseX: Ne, theme: de } = ie, ge = ue - fe.left - fe.right, xe = we - fe.top - fe.bottom, Xe = Oe.useMemo(() => tg(de), [de]), lt = Oe.useMemo(() => $z(c, l.xLabel, l.yLabel), [c, l.xLabel, l.yLabel]), bt = Oe.useMemo(() => fz(c), [c]), Ut = Oe.useMemo(() => QR(c), [c]), ze = Oe.useMemo(() => dz(bt, ue, fe, Ne), [bt, ue, fe, Ne]), Ve = Oe.useMemo(() => GR(Ut, we, fe), [Ut, we, fe]), V = Oe.useRef(v);
  V.current = v;
  let Se = Oe.useMemo(() => (rn, ln) => {
    var dn;
    (dn = V.current) == null || dn.call(V, { xDomain: rn, yDomain: ln });
  }, []), { zoomRef: J, state: re, zoomedXScale: G, zoomedYScale: ce, resetZoom: ee, zoomIn: A, zoomOut: K } = vz({ plotWidth: ge, plotHeight: xe, xScale: ze, yScale: Ve, onViewChange: v ? Se : void 0 }), { pendingRegion: Be, handleMouseDown: Ae, handleMouseMove: et, handleMouseUp: at } = Az({ enabled: ie.enableRegionSelect, xScale: G, onRegionSelect: D }), [qe, tt] = Oe.useState(null), [pt, jt] = Oe.useState(null), [_n, Gn] = Oe.useState(null), Ht = Oe.useRef(T);
  Ht.current = T;
  let Fn = Oe.useCallback((rn) => {
    var Xn, br, Xr, pa;
    if (!ie.showCrosshair) return;
    let ln = rn.currentTarget.getBoundingClientRect(), dn = rn.clientX - ln.left, jn = rn.clientY - ln.top, Rr = G.invert(dn), yn = ce.invert(jn);
    if (jt({ px: dn, py: jn, dataX: Rr, dataY: yn }), z && c.length > 0) {
      let Re = Tz(c, Rr, jn, G, ce);
      if (Re && Re.distance < 50) {
        let We = c.findIndex((St) => St.id === Re.spectrumId);
        Gn({ px: G(Re.x), py: ce(Re.y), dataX: Re.x, dataY: Re.y, color: ((Xn = c[We]) == null ? void 0 : Xn.color) ?? vd(We) }), (br = Ht.current) == null || br.call(Ht, Re.x, Re.y);
      } else Gn(null), (Xr = Ht.current) == null || Xr.call(Ht, Rr, yn);
    } else (pa = Ht.current) == null || pa.call(Ht, Rr, yn);
  }, [G, ce, ie.showCrosshair, z, c]), Tn = Oe.useCallback(() => {
    jt(null), Gn(null);
  }, []), Dn = Fz({ onZoomIn: A, onZoomOut: K, onReset: ee }), wr = Oe.useMemo(() => jz(c.length, lt.xLabel, lt.yLabel), [c.length, lt.xLabel, lt.yLabel]), Ta = ie.displayMode === "stacked";
  if (c.length === 0) return se.jsx("div", { ref: ie.responsive ? F : void 0, style: { width: ie.responsive ? "100%" : ue, height: we, display: "flex", alignItems: "center", justifyContent: "center", border: `1px dashed ${Xe.gridColor}`, borderRadius: 8, color: Xe.tickColor, fontFamily: "system-ui, sans-serif", fontSize: 14 }, className: l.className, children: "No spectra loaded" });
  let ur = ie.showToolbar ? 37 : 0;
  return se.jsxs("div", { ref: ie.responsive ? F : void 0, style: { width: ie.responsive ? "100%" : ue, background: Xe.background, borderRadius: 4, overflow: "hidden" }, className: l.className, role: "img", "aria-label": wr, tabIndex: 0, onKeyDown: Dn, children: [ie.showToolbar && se.jsx(Dz, { onZoomIn: A, onZoomOut: K, onReset: ee, isZoomed: re.isZoomed, theme: de }), ie.showLegend && ie.legendPosition === "top" && se.jsx(pR, { spectra: c, theme: de, position: "top", onToggleVisibility: _, onHighlight: tt, highlightedId: qe }), se.jsx(Lz, { enabled: ie.enableDragDrop, theme: de, width: ue, height: we - ur, onDrop: R, children: Ta ? se.jsx("svg", { width: ue, height: we - ur, style: { position: "absolute", top: 0, left: 0 }, children: se.jsxs("g", { transform: `translate(${fe.left}, ${fe.top})`, children: [se.jsx(zz, { spectra: c, xScale: G, plotWidth: ge, plotHeight: xe, margin: fe, theme: de, showGrid: ie.showGrid, xLabel: lt.xLabel, yLabel: lt.yLabel }), se.jsx("rect", { ref: J, x: 0, y: 0, width: ge, height: xe, fill: "transparent", style: { cursor: "grab" }, onMouseMove: Fn, onMouseLeave: Tn })] }) }) : se.jsxs(se.Fragment, { children: [se.jsx("div", { style: { position: "absolute", top: fe.top, left: fe.left, width: ge, height: xe, overflow: "hidden" }, children: se.jsx(XR, { ref: O, spectra: c, xScale: G, yScale: ce, width: ge, height: xe, highlightedId: qe ?? void 0 }) }), se.jsx("svg", { width: ue, height: we - ur, style: { position: "absolute", top: 0, left: 0 }, children: se.jsxs("g", { transform: `translate(${fe.left}, ${fe.top})`, children: [se.jsx(qR, { xScale: G, yScale: ce, width: ge, height: xe, xLabel: lt.xLabel, yLabel: lt.yLabel, showGrid: ie.showGrid, colors: Xe }), se.jsx("defs", { children: se.jsx("clipPath", { id: ae, children: se.jsx("rect", { x: 0, y: 0, width: ge, height: xe }) }) }), se.jsxs("g", { clipPath: `url(#${ae})`, children: [y.length > 0 && se.jsx(Rz, { regions: y, xScale: G, height: xe, colors: Xe }), d.length > 0 && se.jsx(wz, { peaks: d, xScale: G, yScale: ce, colors: Xe, onPeakClick: C })] }), g.length > 0 && se.jsx(_z, { annotations: g, xScale: G, yScale: ce, colors: Xe }), ie.showCrosshair && se.jsx(bz, { position: pt, width: ge, height: xe, colors: Xe, snapPoint: _n }), Be && se.jsx("rect", { x: G(Be.xStart), y: 0, width: Math.abs(G(Be.xEnd) - G(Be.xStart)), height: xe, fill: Xe.regionFill, stroke: Xe.regionStroke, strokeWidth: 1, pointerEvents: "none" }), se.jsx("rect", { ref: J, x: 0, y: 0, width: ge, height: xe, fill: "transparent", style: { cursor: ie.showCrosshair ? "crosshair" : "grab" }, onMouseDown: Ae, onMouseMove: (rn) => {
    Fn(rn), et(rn);
  }, onMouseUp: at, onMouseLeave: Tn })] }) })] }) }), ie.showLegend && ie.legendPosition === "bottom" && se.jsx(pR, { spectra: c, theme: de, position: "bottom", onToggleVisibility: _, onHighlight: tt, highlightedId: qe })] });
}
Oe.memo(function({ spectra: l, xExtent: c, yExtent: d, visibleXDomain: y, width: g = 200, height: C = 50, theme: v = "light", isZoomed: T = !1 }) {
  let _ = Oe.useRef(null), R = Oe.useMemo(() => tg(v), [v]), D = Oe.useMemo(() => Oh().domain(c).range([0, g]), [c, g]), O = Oe.useMemo(() => Oh().domain(d).range([C - 2, 2]), [d, C]);
  Oe.useEffect(() => {
    var ie;
    let ae = (ie = _.current) == null ? void 0 : ie.getContext("2d");
    if (ae) {
      ae.clearRect(0, 0, g, C);
      for (let ue = 0; ue < l.length; ue++) {
        let we = l[ue];
        if (we.visible === !1) continue;
        let fe = Math.min(we.x.length, we.y.length);
        if (fe < 2) continue;
        let Ne = we.color ?? vd(ue);
        ae.beginPath(), ae.strokeStyle = Ne, ae.lineWidth = 1, ae.globalAlpha = 0.7;
        let de = Math.max(1, Math.floor(fe / g)), ge = !1;
        for (let xe = 0; xe < fe; xe += de) {
          let Xe = D(we.x[xe]), lt = O(we.y[xe]);
          ge ? ae.lineTo(Xe, lt) : (ae.moveTo(Xe, lt), ge = !0);
        }
        ae.stroke();
      }
    }
  }, [l, D, O, g, C]);
  let z = D(Math.min(y[0], y[1])), F = D(Math.max(y[0], y[1])), oe = Math.max(F - z, 2);
  return se.jsxs("div", { className: "spectraview-minimap", style: { position: "relative", width: g, height: C, border: `1px solid ${R.gridColor}`, borderRadius: 3, overflow: "hidden", background: R.background }, children: [se.jsx("canvas", { ref: _, width: g, height: C, style: { position: "absolute", top: 0, left: 0 } }), T && se.jsxs("svg", { width: g, height: C, style: { position: "absolute", top: 0, left: 0 }, children: [se.jsx("rect", { x: 0, y: 0, width: z, height: C, fill: R.background, opacity: 0.6 }), se.jsx("rect", { x: z + oe, y: 0, width: g - z - oe, height: C, fill: R.background, opacity: 0.6 }), se.jsx("rect", { x: z, y: 0, width: oe, height: C, fill: "none", stroke: v === "dark" ? "#60a5fa" : "#3b82f6", strokeWidth: 1.5, rx: 1 })] })] });
});
function Rx(l, c) {
  switch (c) {
    case "fixed2":
      return l.toFixed(2);
    case "fixed4":
      return l.toFixed(4);
    case "scientific":
      return l.toExponential(2);
    default:
      return Math.abs(l) >= 100 ? Math.round(l).toString() : Math.abs(l) >= 1 ? l.toFixed(2) : Math.abs(l) >= 0.01 ? l.toFixed(4) : l.toExponential(2);
  }
}
Oe.memo(function({ data: l, spectra: c, peaks: d = [], plotWidth: y, plotHeight: g, colors: C, numberFormat: v = "auto" }) {
  let T = Oe.useMemo(() => l ? c.filter((ie) => ie.visible !== !1).map((ie, ue) => {
    let we = Math.min(ie.x.length, ie.y.length);
    if (we < 1) return null;
    let fe = KR(ie.x, l.dataX, we);
    return fe < 0 ? null : { label: ie.label, color: ie.color ?? vd(ue), value: ie.y[fe], x: ie.x[fe] };
  }).filter(Boolean) : [], [l, c]), _ = Oe.useMemo(() => {
    if (!l || d.length === 0) return null;
    let ie = null, ue = 1 / 0;
    for (let we of d) {
      let fe = Math.abs(we.x - l.dataX);
      fe < ue && (ue = fe, ie = we);
    }
    return ie;
  }, [l, d]);
  if (!l) return null;
  let R = 16, D = 18, O = _ ? R : 0, z = D + T.length * R + O + 8, F = 160, oe = l.px + 15, ae = l.py - z / 2;
  return oe + F > y && (oe = l.px - F - 15), ae < 0 && (ae = 4), ae + z > g && (ae = g - z - 4), se.jsxs("g", { className: "spectraview-tooltip", transform: `translate(${oe}, ${ae})`, pointerEvents: "none", children: [se.jsx("rect", { x: 0, y: 0, width: F, height: z, rx: 4, fill: C.tooltipBg, stroke: C.tooltipBorder, strokeWidth: 0.5, opacity: 0.95 }), se.jsxs("text", { x: 8, y: 14, fill: C.tooltipText, fontSize: 10, fontFamily: "monospace", fontWeight: 600, children: ["x = ", Rx(l.dataX, v)] }), T.map((ie, ue) => se.jsxs("g", { transform: `translate(0, ${D + ue * R})`, children: [se.jsx("circle", { cx: 12, cy: 8, r: 3, fill: ie.color }), se.jsxs("text", { x: 20, y: 11, fill: C.tooltipText, fontSize: 9, fontFamily: "monospace", children: [ie.label.slice(0, 10), ": ", Rx(ie.value, v)] })] }, ie.label)), _ && se.jsxs("text", { x: 8, y: D + T.length * R + 12, fill: C.labelColor, fontSize: 9, fontFamily: "monospace", fontStyle: "italic", children: ["Peak: ", _.label ?? Rx(_.x, v)] })] });
});
Oe.memo(function({ spectrum: l, theme: c = "light", maxRows: d = 200, height: y = 300, highlightRange: g }) {
  let C = Oe.useMemo(() => tg(c), [c]), [v, T] = Oe.useState(!1), _ = Math.min(l.x.length, l.y.length), R = Oe.useMemo(() => {
    let ae = Array.from({ length: _ }, (ie, ue) => ue);
    return v && ae.reverse(), ae.slice(0, d);
  }, [_, v, d]), D = (ae) => {
    if (!g) return !1;
    let ie = Math.min(g[0], g[1]), ue = Math.max(g[0], g[1]);
    return ae >= ie && ae <= ue;
  }, O = (ae) => Math.abs(ae) >= 100 ? ae.toFixed(2) : Math.abs(ae) >= 0.01 ? ae.toFixed(4) : ae.toExponential(3), z = c === "dark" ? "#1f2937" : "#f3f4f6", F = c === "dark" ? "#374151" : "#e5e7eb", oe = c === "dark" ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.08)";
  return se.jsxs("div", { className: "spectraview-datatable", style: { height: y, overflow: "auto", border: `1px solid ${F}`, borderRadius: 4, fontFamily: "monospace", fontSize: 12, color: C.tickColor, background: C.background }, children: [se.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [se.jsx("thead", { children: se.jsxs("tr", { style: { position: "sticky", top: 0, background: z, borderBottom: `1px solid ${F}` }, children: [se.jsx("th", { style: { padding: "6px 8px", textAlign: "right" }, children: "#" }), se.jsxs("th", { style: { padding: "6px 8px", textAlign: "right", cursor: "pointer", userSelect: "none" }, onClick: () => T((ae) => !ae), title: "Click to reverse sort", children: [l.xUnit ?? "x", " ", v ? "↑" : "↓"] }), se.jsx("th", { style: { padding: "6px 8px", textAlign: "right" }, children: l.yUnit ?? "y" })] }) }), se.jsx("tbody", { children: R.map((ae) => {
    let ie = l.x[ae], ue = l.y[ae];
    return se.jsxs("tr", { style: { background: D(ie) ? oe : "transparent", borderBottom: `1px solid ${F}` }, children: [se.jsx("td", { style: { padding: "3px 8px", textAlign: "right", opacity: 0.5 }, children: ae }), se.jsx("td", { style: { padding: "3px 8px", textAlign: "right" }, children: O(ie) }), se.jsx("td", { style: { padding: "3px 8px", textAlign: "right" }, children: O(ue) })] }, ae);
  }) })] }), _ > d && se.jsxs("div", { style: { padding: "6px 8px", textAlign: "center", fontSize: 11, opacity: 0.6, borderTop: `1px solid ${F}` }, children: ["Showing ", d, " of ", _, " points"] })] });
});
function Yz(l) {
  if (l.byteLength < 4)
    return [];
  const c = new TextDecoder("utf-8");
  let d = 0;
  const y = l.getUint32(d, !0);
  d += 4;
  const g = [];
  for (let C = 0; C < y; C++) {
    const v = l.getUint32(d, !0);
    d += 4;
    const T = l.getUint32(d, !0);
    d += 4;
    const _ = l.getUint32(d, !0);
    d += 4;
    const R = new Uint8Array(
      l.buffer,
      l.byteOffset + d,
      _
    ), D = c.decode(R);
    d += _;
    const O = new Float64Array(
      l.buffer.slice(
        l.byteOffset + d,
        l.byteOffset + d + v * 8
      )
    );
    d += v * 8;
    let z = null;
    T && (z = new Float64Array(
      l.buffer.slice(
        l.byteOffset + d,
        l.byteOffset + d + v * 8
      )
    ), d += v * 8), g.push({ label: D, intensities: O, wavenumbers: z });
  }
  return g;
}
function Wz(l) {
  return l.map((c, d) => {
    const y = c.intensities.length, g = c.wavenumbers ?? Float64Array.from({ length: y }, (C, v) => v);
    return {
      id: `spectrum-${d}`,
      label: c.label || `Spectrum ${d + 1}`,
      x: g,
      y: c.intensities,
      xUnit: "cm⁻¹",
      yUnit: "Absorbance",
      type: "IR",
      visible: !0
    };
  });
}
function vR(l, c) {
  const d = parseInt(l, 10);
  return Number.isFinite(d) ? d : c;
}
function Qz() {
  const [l] = sd("spectrum_data"), [c] = sd("width"), [d] = sd("height"), [y] = sd("x_reversed"), [g] = sd("show_grid"), [C] = sd("theme"), v = Oe.useMemo(() => !l || l.byteLength === 0 ? [] : Wz(Yz(l)), [l]), T = vR(c, 720), _ = vR(d, 400);
  return v.length === 0 ? /* @__PURE__ */ se.jsxs(
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
        /* @__PURE__ */ se.jsx("code", { style: { margin: "0 4px" }, children: "viewer.set_spectrum(spec)" }),
        " to add data."
      ]
    }
  ) : /* @__PURE__ */ se.jsx("div", { style: { width: c || "100%", height: d || "500px" }, children: /* @__PURE__ */ se.jsx(
    Iz,
    {
      spectra: v,
      width: T,
      height: _,
      reverseX: y,
      showGrid: g,
      showToolbar: !0,
      showCrosshair: !0,
      theme: C === "dark" ? "dark" : "light"
    }
  ) });
}
const Gz = ZM(() => /* @__PURE__ */ se.jsx(Qz, {})), Zz = { render: Gz };
export {
  Zz as default
};
//# sourceMappingURL=index.js.map

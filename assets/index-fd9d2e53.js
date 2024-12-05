(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();function po(e,a){const t=Object.create(null),n=e.split(",");for(let s=0;s<n.length;s++)t[n[s]]=!0;return a?s=>!!t[s.toLowerCase()]:s=>!!t[s]}const Ve={},In=[],Za=()=>{},fg=()=>!1,vg=/^on[^a-z]/,xl=e=>vg.test(e),yo=e=>e.startsWith("onUpdate:"),Ze=Object.assign,ko=(e,a)=>{const t=e.indexOf(a);t>-1&&e.splice(t,1)},pg=Object.prototype.hasOwnProperty,Ee=(e,a)=>pg.call(e,a),ye=Array.isArray,Tn=e=>Sl(e)==="[object Map]",Bd=e=>Sl(e)==="[object Set]",Ae=e=>typeof e=="function",Ye=e=>typeof e=="string",bo=e=>typeof e=="symbol",We=e=>e!==null&&typeof e=="object",Hd=e=>We(e)&&Ae(e.then)&&Ae(e.catch),Dd=Object.prototype.toString,Sl=e=>Dd.call(e),yg=e=>Sl(e).slice(8,-1),Gd=e=>Sl(e)==="[object Object]",wo=e=>Ye(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Xs=po(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ll=e=>{const a=Object.create(null);return t=>a[t]||(a[t]=e(t))},kg=/-(\w)/g,Oa=Ll(e=>e.replace(kg,(a,t)=>t?t.toUpperCase():"")),bg=/\B([A-Z])/g,zn=Ll(e=>e.replace(bg,"-$1").toLowerCase()),Ct=Ll(e=>e.charAt(0).toUpperCase()+e.slice(1)),Xl=Ll(e=>e?`on${Ct(e)}`:""),ys=(e,a)=>!Object.is(e,a),el=(e,a)=>{for(let t=0;t<e.length;t++)e[t](a)},rl=(e,a,t)=>{Object.defineProperty(e,a,{configurable:!0,enumerable:!1,value:t})},yi=e=>{const a=parseFloat(e);return isNaN(a)?e:a},wg=e=>{const a=Ye(e)?Number(e):NaN;return isNaN(a)?e:a};let Dr;const ki=()=>Dr||(Dr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Mo(e){if(ye(e)){const a={};for(let t=0;t<e.length;t++){const n=e[t],s=Ye(n)?Lg(n):Mo(n);if(s)for(const l in s)a[l]=s[l]}return a}else{if(Ye(e))return e;if(We(e))return e}}const Mg=/;(?![^(]*\))/g,xg=/:([^]+)/,Sg=/\/\*[^]*?\*\//g;function Lg(e){const a={};return e.replace(Sg,"").split(Mg).forEach(t=>{if(t){const n=t.split(xg);n.length>1&&(a[n[0].trim()]=n[1].trim())}}),a}function ln(e){let a="";if(Ye(e))a=e;else if(ye(e))for(let t=0;t<e.length;t++){const n=ln(e[t]);n&&(a+=n+" ")}else if(We(e))for(const t in e)e[t]&&(a+=t+" ");return a.trim()}const Ag="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Cg=po(Ag);function Ed(e){return!!e||e===""}const ha=e=>Ye(e)?e:e==null?"":ye(e)||We(e)&&(e.toString===Dd||!Ae(e.toString))?JSON.stringify(e,Fd,2):String(e),Fd=(e,a)=>a&&a.__v_isRef?Fd(e,a.value):Tn(a)?{[`Map(${a.size})`]:[...a.entries()].reduce((t,[n,s])=>(t[`${n} =>`]=s,t),{})}:Bd(a)?{[`Set(${a.size})`]:[...a.values()]}:We(a)&&!ye(a)&&!Gd(a)?String(a):a;let Ta;class qd{constructor(a=!1){this.detached=a,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Ta,!a&&Ta&&(this.index=(Ta.scopes||(Ta.scopes=[])).push(this)-1)}get active(){return this._active}run(a){if(this._active){const t=Ta;try{return Ta=this,a()}finally{Ta=t}}}on(){Ta=this}off(){Ta=this.parent}stop(a){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!a){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function xo(e){return new qd(e)}function Ig(e,a=Ta){a&&a.active&&a.effects.push(e)}function Tg(){return Ta}function Aa(e){Ta&&Ta.cleanups.push(e)}const So=e=>{const a=new Set(e);return a.w=0,a.n=0,a},Rd=e=>(e.w&zt)>0,Pd=e=>(e.n&zt)>0,Bg=({deps:e})=>{if(e.length)for(let a=0;a<e.length;a++)e[a].w|=zt},Hg=e=>{const{deps:a}=e;if(a.length){let t=0;for(let n=0;n<a.length;n++){const s=a[n];Rd(s)&&!Pd(s)?s.delete(e):a[t++]=s,s.w&=~zt,s.n&=~zt}a.length=t}},cl=new WeakMap;let os=0,zt=1;const bi=30;let $a;const on=Symbol(""),wi=Symbol("");class Lo{constructor(a,t=null,n){this.fn=a,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,Ig(this,n)}run(){if(!this.active)return this.fn();let a=$a,t=Nt;for(;a;){if(a===this)return;a=a.parent}try{return this.parent=$a,$a=this,Nt=!0,zt=1<<++os,os<=bi?Bg(this):Gr(this),this.fn()}finally{os<=bi&&Hg(this),zt=1<<--os,$a=this.parent,Nt=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){$a===this?this.deferStop=!0:this.active&&(Gr(this),this.onStop&&this.onStop(),this.active=!1)}}function Gr(e){const{deps:a}=e;if(a.length){for(let t=0;t<a.length;t++)a[t].delete(e);a.length=0}}let Nt=!0;const Nd=[];function _n(){Nd.push(Nt),Nt=!1}function Wn(){const e=Nd.pop();Nt=e===void 0?!0:e}function Ca(e,a,t){if(Nt&&$a){let n=cl.get(e);n||cl.set(e,n=new Map);let s=n.get(t);s||n.set(t,s=So()),Od(s)}}function Od(e,a){let t=!1;os<=bi?Pd(e)||(e.n|=zt,t=!Rd(e)):t=!e.has($a),t&&(e.add($a),$a.deps.push(e))}function Mt(e,a,t,n,s,l){const i=cl.get(e);if(!i)return;let o=[];if(a==="clear")o=[...i.values()];else if(t==="length"&&ye(e)){const r=Number(n);i.forEach((c,d)=>{(d==="length"||d>=r)&&o.push(c)})}else switch(t!==void 0&&o.push(i.get(t)),a){case"add":ye(e)?wo(t)&&o.push(i.get("length")):(o.push(i.get(on)),Tn(e)&&o.push(i.get(wi)));break;case"delete":ye(e)||(o.push(i.get(on)),Tn(e)&&o.push(i.get(wi)));break;case"set":Tn(e)&&o.push(i.get(on));break}if(o.length===1)o[0]&&Mi(o[0]);else{const r=[];for(const c of o)c&&r.push(...c);Mi(So(r))}}function Mi(e,a){const t=ye(e)?e:[...e];for(const n of t)n.computed&&Er(n);for(const n of t)n.computed||Er(n)}function Er(e,a){(e!==$a||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}function Dg(e,a){var t;return(t=cl.get(e))==null?void 0:t.get(a)}const Gg=po("__proto__,__v_isRef,__isVue"),zd=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(bo)),Eg=Ao(),Fg=Ao(!1,!0),qg=Ao(!0),Fr=Rg();function Rg(){const e={};return["includes","indexOf","lastIndexOf"].forEach(a=>{e[a]=function(...t){const n=Ce(this);for(let l=0,i=this.length;l<i;l++)Ca(n,"get",l+"");const s=n[a](...t);return s===-1||s===!1?n[a](...t.map(Ce)):s}}),["push","pop","shift","unshift","splice"].forEach(a=>{e[a]=function(...t){_n();const n=Ce(this)[a].apply(this,t);return Wn(),n}}),e}function Pg(e){const a=Ce(this);return Ca(a,"has",e),a.hasOwnProperty(e)}function Ao(e=!1,a=!1){return function(n,s,l){if(s==="__v_isReactive")return!e;if(s==="__v_isReadonly")return e;if(s==="__v_isShallow")return a;if(s==="__v_raw"&&l===(e?a?ef:Ud:a?Qd:Vd).get(n))return n;const i=ye(n);if(!e){if(i&&Ee(Fr,s))return Reflect.get(Fr,s,l);if(s==="hasOwnProperty")return Pg}const o=Reflect.get(n,s,l);return(bo(s)?zd.has(s):Gg(s))||(e||Ca(n,"get",s),a)?o:Ue(o)?i&&wo(s)?o:o.value:We(o)?e?Fs(o):Ma(o):o}}const Ng=_d(),Og=_d(!0);function _d(e=!1){return function(t,n,s,l){let i=t[n];if(Gn(i)&&Ue(i)&&!Ue(s))return!1;if(!e&&(!dl(s)&&!Gn(s)&&(i=Ce(i),s=Ce(s)),!ye(t)&&Ue(i)&&!Ue(s)))return i.value=s,!0;const o=ye(t)&&wo(n)?Number(n)<t.length:Ee(t,n),r=Reflect.set(t,n,s,l);return t===Ce(l)&&(o?ys(s,i)&&Mt(t,"set",n,s):Mt(t,"add",n,s)),r}}function zg(e,a){const t=Ee(e,a);e[a];const n=Reflect.deleteProperty(e,a);return n&&t&&Mt(e,"delete",a,void 0),n}function _g(e,a){const t=Reflect.has(e,a);return(!bo(a)||!zd.has(a))&&Ca(e,"has",a),t}function Wg(e){return Ca(e,"iterate",ye(e)?"length":on),Reflect.ownKeys(e)}const Wd={get:Eg,set:Ng,deleteProperty:zg,has:_g,ownKeys:Wg},Vg={get:qg,set(e,a){return!0},deleteProperty(e,a){return!0}},Qg=Ze({},Wd,{get:Fg,set:Og}),Co=e=>e,Al=e=>Reflect.getPrototypeOf(e);function _s(e,a,t=!1,n=!1){e=e.__v_raw;const s=Ce(e),l=Ce(a);t||(a!==l&&Ca(s,"get",a),Ca(s,"get",l));const{has:i}=Al(s),o=n?Co:t?Bo:ks;if(i.call(s,a))return o(e.get(a));if(i.call(s,l))return o(e.get(l));e!==s&&e.get(a)}function Ws(e,a=!1){const t=this.__v_raw,n=Ce(t),s=Ce(e);return a||(e!==s&&Ca(n,"has",e),Ca(n,"has",s)),e===s?t.has(e):t.has(e)||t.has(s)}function Vs(e,a=!1){return e=e.__v_raw,!a&&Ca(Ce(e),"iterate",on),Reflect.get(e,"size",e)}function qr(e){e=Ce(e);const a=Ce(this);return Al(a).has.call(a,e)||(a.add(e),Mt(a,"add",e,e)),this}function Rr(e,a){a=Ce(a);const t=Ce(this),{has:n,get:s}=Al(t);let l=n.call(t,e);l||(e=Ce(e),l=n.call(t,e));const i=s.call(t,e);return t.set(e,a),l?ys(a,i)&&Mt(t,"set",e,a):Mt(t,"add",e,a),this}function Pr(e){const a=Ce(this),{has:t,get:n}=Al(a);let s=t.call(a,e);s||(e=Ce(e),s=t.call(a,e)),n&&n.call(a,e);const l=a.delete(e);return s&&Mt(a,"delete",e,void 0),l}function Nr(){const e=Ce(this),a=e.size!==0,t=e.clear();return a&&Mt(e,"clear",void 0,void 0),t}function Qs(e,a){return function(n,s){const l=this,i=l.__v_raw,o=Ce(i),r=a?Co:e?Bo:ks;return!e&&Ca(o,"iterate",on),i.forEach((c,d)=>n.call(s,r(c),r(d),l))}}function Us(e,a,t){return function(...n){const s=this.__v_raw,l=Ce(s),i=Tn(l),o=e==="entries"||e===Symbol.iterator&&i,r=e==="keys"&&i,c=s[e](...n),d=t?Co:a?Bo:ks;return!a&&Ca(l,"iterate",r?wi:on),{next(){const{value:u,done:h}=c.next();return h?{value:u,done:h}:{value:o?[d(u[0]),d(u[1])]:d(u),done:h}},[Symbol.iterator](){return this}}}}function Gt(e){return function(...a){return e==="delete"?!1:this}}function Ug(){const e={get(l){return _s(this,l)},get size(){return Vs(this)},has:Ws,add:qr,set:Rr,delete:Pr,clear:Nr,forEach:Qs(!1,!1)},a={get(l){return _s(this,l,!1,!0)},get size(){return Vs(this)},has:Ws,add:qr,set:Rr,delete:Pr,clear:Nr,forEach:Qs(!1,!0)},t={get(l){return _s(this,l,!0)},get size(){return Vs(this,!0)},has(l){return Ws.call(this,l,!0)},add:Gt("add"),set:Gt("set"),delete:Gt("delete"),clear:Gt("clear"),forEach:Qs(!0,!1)},n={get(l){return _s(this,l,!0,!0)},get size(){return Vs(this,!0)},has(l){return Ws.call(this,l,!0)},add:Gt("add"),set:Gt("set"),delete:Gt("delete"),clear:Gt("clear"),forEach:Qs(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(l=>{e[l]=Us(l,!1,!1),t[l]=Us(l,!0,!1),a[l]=Us(l,!1,!0),n[l]=Us(l,!0,!0)}),[e,t,a,n]}const[Kg,Jg,$g,jg]=Ug();function Io(e,a){const t=a?e?jg:$g:e?Jg:Kg;return(n,s,l)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?n:Reflect.get(Ee(t,s)&&s in n?t:n,s,l)}const Yg={get:Io(!1,!1)},Zg={get:Io(!1,!0)},Xg={get:Io(!0,!1)},Vd=new WeakMap,Qd=new WeakMap,Ud=new WeakMap,ef=new WeakMap;function af(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function tf(e){return e.__v_skip||!Object.isExtensible(e)?0:af(yg(e))}function Ma(e){return Gn(e)?e:To(e,!1,Wd,Yg,Vd)}function Kd(e){return To(e,!1,Qg,Zg,Qd)}function Fs(e){return To(e,!0,Vg,Xg,Ud)}function To(e,a,t,n,s){if(!We(e)||e.__v_raw&&!(a&&e.__v_isReactive))return e;const l=s.get(e);if(l)return l;const i=tf(e);if(i===0)return e;const o=new Proxy(e,i===2?n:t);return s.set(e,o),o}function Bn(e){return Gn(e)?Bn(e.__v_raw):!!(e&&e.__v_isReactive)}function Gn(e){return!!(e&&e.__v_isReadonly)}function dl(e){return!!(e&&e.__v_isShallow)}function Jd(e){return Bn(e)||Gn(e)}function Ce(e){const a=e&&e.__v_raw;return a?Ce(a):e}function $d(e){return rl(e,"__v_skip",!0),e}const ks=e=>We(e)?Ma(e):e,Bo=e=>We(e)?Fs(e):e;function jd(e){Nt&&$a&&(e=Ce(e),Od(e.dep||(e.dep=So())))}function Yd(e,a){e=Ce(e);const t=e.dep;t&&Mi(t)}function Ue(e){return!!(e&&e.__v_isRef===!0)}function se(e){return Zd(e,!1)}function re(e){return Zd(e,!0)}function Zd(e,a){return Ue(e)?e:new nf(e,a)}class nf{constructor(a,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?a:Ce(a),this._value=t?a:ks(a)}get value(){return jd(this),this._value}set value(a){const t=this.__v_isShallow||dl(a)||Gn(a);a=t?a:Ce(a),ys(a,this._rawValue)&&(this._rawValue=a,this._value=t?a:ks(a),Yd(this))}}function ia(e){return Ue(e)?e.value:e}const sf={get:(e,a,t)=>ia(Reflect.get(e,a,t)),set:(e,a,t,n)=>{const s=e[a];return Ue(s)&&!Ue(t)?(s.value=t,!0):Reflect.set(e,a,t,n)}};function Xd(e){return Bn(e)?e:new Proxy(e,sf)}function Ho(e){const a=ye(e)?new Array(e.length):{};for(const t in e)a[t]=eu(e,t);return a}class lf{constructor(a,t,n){this._object=a,this._key=t,this._defaultValue=n,this.__v_isRef=!0}get value(){const a=this._object[this._key];return a===void 0?this._defaultValue:a}set value(a){this._object[this._key]=a}get dep(){return Dg(Ce(this._object),this._key)}}class of{constructor(a){this._getter=a,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Z(e,a,t){return Ue(e)?e:Ae(e)?new of(e):We(e)&&arguments.length>1?eu(e,a,t):se(e)}function eu(e,a,t){const n=e[a];return Ue(n)?n:new lf(e,a,t)}class rf{constructor(a,t,n,s){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Lo(a,()=>{this._dirty||(this._dirty=!0,Yd(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const a=Ce(this);return jd(a),(a._dirty||!a._cacheable)&&(a._dirty=!1,a._value=a.effect.run()),a._value}set value(a){this._setter(a)}}function cf(e,a,t=!1){let n,s;const l=Ae(e);return l?(n=e,s=Za):(n=e.get,s=e.set),new rf(n,s,l||!s,t)}function Ot(e,a,t,n){let s;try{s=n?e(...n):e()}catch(l){Cl(l,a,t)}return s}function Pa(e,a,t,n){if(Ae(e)){const l=Ot(e,a,t,n);return l&&Hd(l)&&l.catch(i=>{Cl(i,a,t)}),l}const s=[];for(let l=0;l<e.length;l++)s.push(Pa(e[l],a,t,n));return s}function Cl(e,a,t,n=!0){const s=a?a.vnode:null;if(a){let l=a.parent;const i=a.proxy,o=t;for(;l;){const c=l.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](e,i,o)===!1)return}l=l.parent}const r=a.appContext.config.errorHandler;if(r){Ot(r,null,10,[e,i,o]);return}}df(e,t,s,n)}function df(e,a,t,n=!0){console.error(e)}let bs=!1,xi=!1;const ga=[];let ot=0;const Hn=[];let kt=null,Xt=0;const au=Promise.resolve();let Do=null;function ze(e){const a=Do||au;return e?a.then(this?e.bind(this):e):a}function uf(e){let a=ot+1,t=ga.length;for(;a<t;){const n=a+t>>>1;ws(ga[n])<e?a=n+1:t=n}return a}function Go(e){(!ga.length||!ga.includes(e,bs&&e.allowRecurse?ot+1:ot))&&(e.id==null?ga.push(e):ga.splice(uf(e.id),0,e),tu())}function tu(){!bs&&!xi&&(xi=!0,Do=au.then(su))}function hf(e){const a=ga.indexOf(e);a>ot&&ga.splice(a,1)}function mf(e){ye(e)?Hn.push(...e):(!kt||!kt.includes(e,e.allowRecurse?Xt+1:Xt))&&Hn.push(e),tu()}function Or(e,a=bs?ot+1:0){for(;a<ga.length;a++){const t=ga[a];t&&t.pre&&(ga.splice(a,1),a--,t())}}function nu(e){if(Hn.length){const a=[...new Set(Hn)];if(Hn.length=0,kt){kt.push(...a);return}for(kt=a,kt.sort((t,n)=>ws(t)-ws(n)),Xt=0;Xt<kt.length;Xt++)kt[Xt]();kt=null,Xt=0}}const ws=e=>e.id==null?1/0:e.id,gf=(e,a)=>{const t=ws(e)-ws(a);if(t===0){if(e.pre&&!a.pre)return-1;if(a.pre&&!e.pre)return 1}return t};function su(e){xi=!1,bs=!0,ga.sort(gf);const a=Za;try{for(ot=0;ot<ga.length;ot++){const t=ga[ot];t&&t.active!==!1&&Ot(t,null,14)}}finally{ot=0,ga.length=0,nu(),bs=!1,Do=null,(ga.length||Hn.length)&&su()}}function ff(e,a,...t){if(e.isUnmounted)return;const n=e.vnode.props||Ve;let s=t;const l=a.startsWith("update:"),i=l&&a.slice(7);if(i&&i in n){const d=`${i==="modelValue"?"model":i}Modifiers`,{number:u,trim:h}=n[d]||Ve;h&&(s=t.map(g=>Ye(g)?g.trim():g)),u&&(s=t.map(yi))}let o,r=n[o=Xl(a)]||n[o=Xl(Oa(a))];!r&&l&&(r=n[o=Xl(zn(a))]),r&&Pa(r,e,6,s);const c=n[o+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[o])return;e.emitted[o]=!0,Pa(c,e,6,s)}}function lu(e,a,t=!1){const n=a.emitsCache,s=n.get(e);if(s!==void 0)return s;const l=e.emits;let i={},o=!1;if(!Ae(e)){const r=c=>{const d=lu(c,a,!0);d&&(o=!0,Ze(i,d))};!t&&a.mixins.length&&a.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!l&&!o?(We(e)&&n.set(e,null),null):(ye(l)?l.forEach(r=>i[r]=null):Ze(i,l),We(e)&&n.set(e,i),i)}function Il(e,a){return!e||!xl(a)?!1:(a=a.slice(2).replace(/Once$/,""),Ee(e,a[0].toLowerCase()+a.slice(1))||Ee(e,zn(a))||Ee(e,a))}let Ha=null,iu=null;function ul(e){const a=Ha;return Ha=e,iu=e&&e.type.__scopeId||null,a}function Fe(e,a=Ha,t){if(!a||e._n)return e;const n=(...s)=>{n._d&&Xr(-1);const l=ul(a);let i;try{i=e(...s)}finally{ul(l),n._d&&Xr(1)}return i};return n._n=!0,n._c=!0,n._d=!0,n}function ei(e){const{type:a,vnode:t,proxy:n,withProxy:s,props:l,propsOptions:[i],slots:o,attrs:r,emit:c,render:d,renderCache:u,data:h,setupState:g,ctx:f,inheritAttrs:v}=e;let k,b;const p=ul(e);try{if(t.shapeFlag&4){const C=s||n;k=it(d.call(C,C,u,l,g,h,f)),b=r}else{const C=a;k=it(C.length>1?C(l,{attrs:r,slots:o,emit:c}):C(l,null)),b=a.props?r:vf(r)}}catch(C){ms.length=0,Cl(C,e,1),k=m(Xa)}let w=k;if(b&&v!==!1){const C=Object.keys(b),{shapeFlag:H}=w;C.length&&H&7&&(i&&C.some(yo)&&(b=pf(b,i)),w=xt(w,b))}return t.dirs&&(w=xt(w),w.dirs=w.dirs?w.dirs.concat(t.dirs):t.dirs),t.transition&&(w.transition=t.transition),k=w,ul(p),k}const vf=e=>{let a;for(const t in e)(t==="class"||t==="style"||xl(t))&&((a||(a={}))[t]=e[t]);return a},pf=(e,a)=>{const t={};for(const n in e)(!yo(n)||!(n.slice(9)in a))&&(t[n]=e[n]);return t};function yf(e,a,t){const{props:n,children:s,component:l}=e,{props:i,children:o,patchFlag:r}=a,c=l.emitsOptions;if(a.dirs||a.transition)return!0;if(t&&r>=0){if(r&1024)return!0;if(r&16)return n?zr(n,i,c):!!i;if(r&8){const d=a.dynamicProps;for(let u=0;u<d.length;u++){const h=d[u];if(i[h]!==n[h]&&!Il(c,h))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:n===i?!1:n?i?zr(n,i,c):!0:!!i;return!1}function zr(e,a,t){const n=Object.keys(a);if(n.length!==Object.keys(e).length)return!0;for(let s=0;s<n.length;s++){const l=n[s];if(a[l]!==e[l]&&!Il(t,l))return!0}return!1}function kf({vnode:e,parent:a},t){for(;a&&a.subTree===e;)(e=a.vnode).el=t,a=a.parent}const bf=e=>e.__isSuspense;function wf(e,a){a&&a.pendingBranch?ye(e)?a.effects.push(...e):a.effects.push(e):mf(e)}function Da(e,a){return Eo(e,null,a)}const Ks={};function de(e,a,t){return Eo(e,a,t)}function Eo(e,a,{immediate:t,deep:n,flush:s,onTrack:l,onTrigger:i}=Ve){var o;const r=Tg()===((o=la)==null?void 0:o.scope)?la:null;let c,d=!1,u=!1;if(Ue(e)?(c=()=>e.value,d=dl(e)):Bn(e)?(c=()=>e,n=!0):ye(e)?(u=!0,d=e.some(C=>Bn(C)||dl(C)),c=()=>e.map(C=>{if(Ue(C))return C.value;if(Bn(C))return tn(C);if(Ae(C))return Ot(C,r,2)})):Ae(e)?a?c=()=>Ot(e,r,2):c=()=>{if(!(r&&r.isUnmounted))return h&&h(),Pa(e,r,3,[g])}:c=Za,a&&n){const C=c;c=()=>tn(C())}let h,g=C=>{h=p.onStop=()=>{Ot(C,r,4)}},f;if(Ls)if(g=Za,a?t&&Pa(a,r,3,[c(),u?[]:void 0,g]):c(),s==="sync"){const C=uv();f=C.__watcherHandles||(C.__watcherHandles=[])}else return Za;let v=u?new Array(e.length).fill(Ks):Ks;const k=()=>{if(p.active)if(a){const C=p.run();(n||d||(u?C.some((H,B)=>ys(H,v[B])):ys(C,v)))&&(h&&h(),Pa(a,r,3,[C,v===Ks?void 0:u&&v[0]===Ks?[]:v,g]),v=C)}else p.run()};k.allowRecurse=!!a;let b;s==="sync"?b=k:s==="post"?b=()=>Sa(k,r&&r.suspense):(k.pre=!0,r&&(k.id=r.uid),b=()=>Go(k));const p=new Lo(c,b);a?t?k():v=p.run():s==="post"?Sa(p.run.bind(p),r&&r.suspense):p.run();const w=()=>{p.stop(),r&&r.scope&&ko(r.scope.effects,p)};return f&&f.push(w),w}function Mf(e,a,t){const n=this.proxy,s=Ye(e)?e.includes(".")?ou(n,e):()=>n[e]:e.bind(n,n);let l;Ae(a)?l=a:(l=a.handler,t=a);const i=la;En(this);const o=Eo(s,l.bind(n),t);return i?En(i):rn(),o}function ou(e,a){const t=a.split(".");return()=>{let n=e;for(let s=0;s<t.length&&n;s++)n=n[t[s]];return n}}function tn(e,a){if(!We(e)||e.__v_skip||(a=a||new Set,a.has(e)))return e;if(a.add(e),Ue(e))tn(e.value,a);else if(ye(e))for(let t=0;t<e.length;t++)tn(e[t],a);else if(Bd(e)||Tn(e))e.forEach(t=>{tn(t,a)});else if(Gd(e))for(const t in e)tn(e[t],a);return e}function Je(e,a){const t=Ha;if(t===null)return e;const n=Gl(t)||t.proxy,s=e.dirs||(e.dirs=[]);for(let l=0;l<a.length;l++){let[i,o,r,c=Ve]=a[l];i&&(Ae(i)&&(i={mounted:i,updated:i}),i.deep&&tn(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:r,modifiers:c}))}return e}function Kt(e,a,t,n){const s=e.dirs,l=a&&a.dirs;for(let i=0;i<s.length;i++){const o=s[i];l&&(o.oldValue=l[i].value);let r=o.dir[n];r&&(_n(),Pa(r,t,8,[e.el,o,e,a]),Wn())}}function ru(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ya(()=>{e.isMounted=!0}),xa(()=>{e.isUnmounting=!0}),e}const qa=[Function,Array],cu={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:qa,onEnter:qa,onAfterEnter:qa,onEnterCancelled:qa,onBeforeLeave:qa,onLeave:qa,onAfterLeave:qa,onLeaveCancelled:qa,onBeforeAppear:qa,onAppear:qa,onAfterAppear:qa,onAppearCancelled:qa},xf={name:"BaseTransition",props:cu,setup(e,{slots:a}){const t=Wo(),n=ru();let s;return()=>{const l=a.default&&Fo(a.default(),!0);if(!l||!l.length)return;let i=l[0];if(l.length>1){for(const v of l)if(v.type!==Xa){i=v;break}}const o=Ce(e),{mode:r}=o;if(n.isLeaving)return ai(i);const c=_r(i);if(!c)return ai(i);const d=Ms(c,o,n,t);xs(c,d);const u=t.subTree,h=u&&_r(u);let g=!1;const{getTransitionKey:f}=c.type;if(f){const v=f();s===void 0?s=v:v!==s&&(s=v,g=!0)}if(h&&h.type!==Xa&&(!en(c,h)||g)){const v=Ms(h,o,n,t);if(xs(h,v),r==="out-in")return n.isLeaving=!0,v.afterLeave=()=>{n.isLeaving=!1,t.update.active!==!1&&t.update()},ai(i);r==="in-out"&&c.type!==Xa&&(v.delayLeave=(k,b,p)=>{const w=du(n,h);w[String(h.key)]=h,k._leaveCb=()=>{b(),k._leaveCb=void 0,delete d.delayedLeave},d.delayedLeave=p})}return i}}},Sf=xf;function du(e,a){const{leavingVNodes:t}=e;let n=t.get(a.type);return n||(n=Object.create(null),t.set(a.type,n)),n}function Ms(e,a,t,n){const{appear:s,mode:l,persisted:i=!1,onBeforeEnter:o,onEnter:r,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:u,onLeave:h,onAfterLeave:g,onLeaveCancelled:f,onBeforeAppear:v,onAppear:k,onAfterAppear:b,onAppearCancelled:p}=a,w=String(e.key),C=du(t,e),H=(x,L)=>{x&&Pa(x,n,9,L)},B=(x,L)=>{const T=L[1];H(x,L),ye(x)?x.every(E=>E.length<=1)&&T():x.length<=1&&T()},I={mode:l,persisted:i,beforeEnter(x){let L=o;if(!t.isMounted)if(s)L=v||o;else return;x._leaveCb&&x._leaveCb(!0);const T=C[w];T&&en(e,T)&&T.el._leaveCb&&T.el._leaveCb(),H(L,[x])},enter(x){let L=r,T=c,E=d;if(!t.isMounted)if(s)L=k||r,T=b||c,E=p||d;else return;let D=!1;const q=x._enterCb=U=>{D||(D=!0,U?H(E,[x]):H(T,[x]),I.delayedLeave&&I.delayedLeave(),x._enterCb=void 0)};L?B(L,[x,q]):q()},leave(x,L){const T=String(e.key);if(x._enterCb&&x._enterCb(!0),t.isUnmounting)return L();H(u,[x]);let E=!1;const D=x._leaveCb=q=>{E||(E=!0,L(),q?H(f,[x]):H(g,[x]),x._leaveCb=void 0,C[T]===e&&delete C[T])};C[T]=e,h?B(h,[x,D]):D()},clone(x){return Ms(x,a,t,n)}};return I}function ai(e){if(Tl(e))return e=xt(e),e.children=null,e}function _r(e){return Tl(e)?e.children?e.children[0]:void 0:e}function xs(e,a){e.shapeFlag&6&&e.component?xs(e.component.subTree,a):e.shapeFlag&128?(e.ssContent.transition=a.clone(e.ssContent),e.ssFallback.transition=a.clone(e.ssFallback)):e.transition=a}function Fo(e,a=!1,t){let n=[],s=0;for(let l=0;l<e.length;l++){let i=e[l];const o=t==null?i.key:String(t)+String(i.key!=null?i.key:l);i.type===ve?(i.patchFlag&128&&s++,n=n.concat(Fo(i.children,a,o))):(a||i.type!==Xa)&&n.push(o!=null?xt(i,{key:o}):i)}if(s>1)for(let l=0;l<n.length;l++)n[l].patchFlag=-2;return n}function qo(e,a){return Ae(e)?(()=>Ze({name:e.name},a,{setup:e}))():e}const al=e=>!!e.type.__asyncLoader,Tl=e=>e.type.__isKeepAlive;function uu(e,a){mu(e,"a",a)}function hu(e,a){mu(e,"da",a)}function mu(e,a,t=la){const n=e.__wdc||(e.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(Bl(a,n,t),t){let s=t.parent;for(;s&&s.parent;)Tl(s.parent.vnode)&&Lf(n,a,t,s),s=s.parent}}function Lf(e,a,t,n){const s=Bl(a,e,n,!0);vu(()=>{ko(n[a],s)},t)}function Bl(e,a,t=la,n=!1){if(t){const s=t[e]||(t[e]=[]),l=a.__weh||(a.__weh=(...i)=>{if(t.isUnmounted)return;_n(),En(t);const o=Pa(a,t,e,i);return rn(),Wn(),o});return n?s.unshift(l):s.push(l),l}}const It=e=>(a,t=la)=>(!Ls||e==="sp")&&Bl(e,(...n)=>a(...n),t),Hl=It("bm"),ya=It("m"),gu=It("bu"),fu=It("u"),xa=It("bum"),vu=It("um"),Af=It("sp"),Cf=It("rtg"),If=It("rtc");function Tf(e,a=la){Bl("ec",e,a)}const Ro="components",Bf="directives";function Si(e,a){return Po(Ro,e,!0,a)||e}const pu=Symbol.for("v-ndc");function Hf(e){return Ye(e)?Po(Ro,e,!1)||e:e||pu}function Ga(e){return Po(Bf,e)}function Po(e,a,t=!0,n=!1){const s=Ha||la;if(s){const l=s.type;if(e===Ro){const o=rv(l,!1);if(o&&(o===a||o===Oa(a)||o===Ct(Oa(a))))return l}const i=Wr(s[e]||l[e],a)||Wr(s.appContext[e],a);return!i&&n?l:i}}function Wr(e,a){return e&&(e[a]||e[Oa(a)]||e[Ct(Oa(a))])}function Zt(e,a,t,n){let s;const l=t&&t[n];if(ye(e)||Ye(e)){s=new Array(e.length);for(let i=0,o=e.length;i<o;i++)s[i]=a(e[i],i,void 0,l&&l[i])}else if(typeof e=="number"){s=new Array(e);for(let i=0;i<e;i++)s[i]=a(i+1,i,void 0,l&&l[i])}else if(We(e))if(e[Symbol.iterator])s=Array.from(e,(i,o)=>a(i,o,void 0,l&&l[o]));else{const i=Object.keys(e);s=new Array(i.length);for(let o=0,r=i.length;o<r;o++){const c=i[o];s[o]=a(e[c],c,o,l&&l[o])}}else s=[];return t&&(t[n]=s),s}const Li=e=>e?Iu(e)?Gl(e)||e.proxy:Li(e.parent):null,us=Ze(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Li(e.parent),$root:e=>Li(e.root),$emit:e=>e.emit,$options:e=>No(e),$forceUpdate:e=>e.f||(e.f=()=>Go(e.update)),$nextTick:e=>e.n||(e.n=ze.bind(e.proxy)),$watch:e=>Mf.bind(e)}),ti=(e,a)=>e!==Ve&&!e.__isScriptSetup&&Ee(e,a),Df={get({_:e},a){const{ctx:t,setupState:n,data:s,props:l,accessCache:i,type:o,appContext:r}=e;let c;if(a[0]!=="$"){const g=i[a];if(g!==void 0)switch(g){case 1:return n[a];case 2:return s[a];case 4:return t[a];case 3:return l[a]}else{if(ti(n,a))return i[a]=1,n[a];if(s!==Ve&&Ee(s,a))return i[a]=2,s[a];if((c=e.propsOptions[0])&&Ee(c,a))return i[a]=3,l[a];if(t!==Ve&&Ee(t,a))return i[a]=4,t[a];Ai&&(i[a]=0)}}const d=us[a];let u,h;if(d)return a==="$attrs"&&Ca(e,"get",a),d(e);if((u=o.__cssModules)&&(u=u[a]))return u;if(t!==Ve&&Ee(t,a))return i[a]=4,t[a];if(h=r.config.globalProperties,Ee(h,a))return h[a]},set({_:e},a,t){const{data:n,setupState:s,ctx:l}=e;return ti(s,a)?(s[a]=t,!0):n!==Ve&&Ee(n,a)?(n[a]=t,!0):Ee(e.props,a)||a[0]==="$"&&a.slice(1)in e?!1:(l[a]=t,!0)},has({_:{data:e,setupState:a,accessCache:t,ctx:n,appContext:s,propsOptions:l}},i){let o;return!!t[i]||e!==Ve&&Ee(e,i)||ti(a,i)||(o=l[0])&&Ee(o,i)||Ee(n,i)||Ee(us,i)||Ee(s.config.globalProperties,i)},defineProperty(e,a,t){return t.get!=null?e._.accessCache[a]=0:Ee(t,"value")&&this.set(e,a,t.value,null),Reflect.defineProperty(e,a,t)}};function Vr(e){return ye(e)?e.reduce((a,t)=>(a[t]=null,a),{}):e}let Ai=!0;function Gf(e){const a=No(e),t=e.proxy,n=e.ctx;Ai=!1,a.beforeCreate&&Qr(a.beforeCreate,e,"bc");const{data:s,computed:l,methods:i,watch:o,provide:r,inject:c,created:d,beforeMount:u,mounted:h,beforeUpdate:g,updated:f,activated:v,deactivated:k,beforeDestroy:b,beforeUnmount:p,destroyed:w,unmounted:C,render:H,renderTracked:B,renderTriggered:I,errorCaptured:x,serverPrefetch:L,expose:T,inheritAttrs:E,components:D,directives:q,filters:U}=a;if(c&&Ef(c,n,null),i)for(const K in i){const z=i[K];Ae(z)&&(n[K]=z.bind(t))}if(s){const K=s.call(t,t);We(K)&&(e.data=Ma(K))}if(Ai=!0,l)for(const K in l){const z=l[K],ee=Ae(z)?z.bind(t,t):Ae(z.get)?z.get.bind(t,t):Za,Q=!Ae(z)&&Ae(z.set)?z.set.bind(t):Za,te=y({get:ee,set:Q});Object.defineProperty(n,K,{enumerable:!0,configurable:!0,get:()=>te.value,set:he=>te.value=he})}if(o)for(const K in o)yu(o[K],n,t,K);if(r){const K=Ae(r)?r.call(t):r;Reflect.ownKeys(K).forEach(z=>{je(z,K[z])})}d&&Qr(d,e,"c");function J(K,z){ye(z)?z.forEach(ee=>K(ee.bind(t))):z&&K(z.bind(t))}if(J(Hl,u),J(ya,h),J(gu,g),J(fu,f),J(uu,v),J(hu,k),J(Tf,x),J(If,B),J(Cf,I),J(xa,p),J(vu,C),J(Af,L),ye(T))if(T.length){const K=e.exposed||(e.exposed={});T.forEach(z=>{Object.defineProperty(K,z,{get:()=>t[z],set:ee=>t[z]=ee})})}else e.exposed||(e.exposed={});H&&e.render===Za&&(e.render=H),E!=null&&(e.inheritAttrs=E),D&&(e.components=D),q&&(e.directives=q)}function Ef(e,a,t=Za){ye(e)&&(e=Ci(e));for(const n in e){const s=e[n];let l;We(s)?"default"in s?l=He(s.from||n,s.default,!0):l=He(s.from||n):l=He(s),Ue(l)?Object.defineProperty(a,n,{enumerable:!0,configurable:!0,get:()=>l.value,set:i=>l.value=i}):a[n]=l}}function Qr(e,a,t){Pa(ye(e)?e.map(n=>n.bind(a.proxy)):e.bind(a.proxy),a,t)}function yu(e,a,t,n){const s=n.includes(".")?ou(t,n):()=>t[n];if(Ye(e)){const l=a[e];Ae(l)&&de(s,l)}else if(Ae(e))de(s,e.bind(t));else if(We(e))if(ye(e))e.forEach(l=>yu(l,a,t,n));else{const l=Ae(e.handler)?e.handler.bind(t):a[e.handler];Ae(l)&&de(s,l,e)}}function No(e){const a=e.type,{mixins:t,extends:n}=a,{mixins:s,optionsCache:l,config:{optionMergeStrategies:i}}=e.appContext,o=l.get(a);let r;return o?r=o:!s.length&&!t&&!n?r=a:(r={},s.length&&s.forEach(c=>hl(r,c,i,!0)),hl(r,a,i)),We(a)&&l.set(a,r),r}function hl(e,a,t,n=!1){const{mixins:s,extends:l}=a;l&&hl(e,l,t,!0),s&&s.forEach(i=>hl(e,i,t,!0));for(const i in a)if(!(n&&i==="expose")){const o=Ff[i]||t&&t[i];e[i]=o?o(e[i],a[i]):a[i]}return e}const Ff={data:Ur,props:Kr,emits:Kr,methods:rs,computed:rs,beforeCreate:wa,created:wa,beforeMount:wa,mounted:wa,beforeUpdate:wa,updated:wa,beforeDestroy:wa,beforeUnmount:wa,destroyed:wa,unmounted:wa,activated:wa,deactivated:wa,errorCaptured:wa,serverPrefetch:wa,components:rs,directives:rs,watch:Rf,provide:Ur,inject:qf};function Ur(e,a){return a?e?function(){return Ze(Ae(e)?e.call(this,this):e,Ae(a)?a.call(this,this):a)}:a:e}function qf(e,a){return rs(Ci(e),Ci(a))}function Ci(e){if(ye(e)){const a={};for(let t=0;t<e.length;t++)a[e[t]]=e[t];return a}return e}function wa(e,a){return e?[...new Set([].concat(e,a))]:a}function rs(e,a){return e?Ze(Object.create(null),e,a):a}function Kr(e,a){return e?ye(e)&&ye(a)?[...new Set([...e,...a])]:Ze(Object.create(null),Vr(e),Vr(a??{})):a}function Rf(e,a){if(!e)return a;if(!a)return e;const t=Ze(Object.create(null),e);for(const n in a)t[n]=wa(e[n],a[n]);return t}function ku(){return{app:null,config:{isNativeTag:fg,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Pf=0;function Nf(e,a){return function(n,s=null){Ae(n)||(n=Ze({},n)),s!=null&&!We(s)&&(s=null);const l=ku(),i=new Set;let o=!1;const r=l.app={_uid:Pf++,_component:n,_props:s,_container:null,_context:l,_instance:null,version:hv,get config(){return l.config},set config(c){},use(c,...d){return i.has(c)||(c&&Ae(c.install)?(i.add(c),c.install(r,...d)):Ae(c)&&(i.add(c),c(r,...d))),r},mixin(c){return l.mixins.includes(c)||l.mixins.push(c),r},component(c,d){return d?(l.components[c]=d,r):l.components[c]},directive(c,d){return d?(l.directives[c]=d,r):l.directives[c]},mount(c,d,u){if(!o){const h=m(n,s);return h.appContext=l,d&&a?a(h,c):e(h,c,u),o=!0,r._container=c,c.__vue_app__=r,Gl(h.component)||h.component.proxy}},unmount(){o&&(e(null,r._container),delete r._container.__vue_app__)},provide(c,d){return l.provides[c]=d,r},runWithContext(c){ml=r;try{return c()}finally{ml=null}}};return r}}let ml=null;function je(e,a){if(la){let t=la.provides;const n=la.parent&&la.parent.provides;n===t&&(t=la.provides=Object.create(n)),t[e]=a}}function He(e,a,t=!1){const n=la||Ha;if(n||ml){const s=n?n.parent==null?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:ml._context.provides;if(s&&e in s)return s[e];if(arguments.length>1)return t&&Ae(a)?a.call(n&&n.proxy):a}}function Of(e,a,t,n=!1){const s={},l={};rl(l,Dl,1),e.propsDefaults=Object.create(null),bu(e,a,s,l);for(const i in e.propsOptions[0])i in s||(s[i]=void 0);t?e.props=n?s:Kd(s):e.type.props?e.props=s:e.props=l,e.attrs=l}function zf(e,a,t,n){const{props:s,attrs:l,vnode:{patchFlag:i}}=e,o=Ce(s),[r]=e.propsOptions;let c=!1;if((n||i>0)&&!(i&16)){if(i&8){const d=e.vnode.dynamicProps;for(let u=0;u<d.length;u++){let h=d[u];if(Il(e.emitsOptions,h))continue;const g=a[h];if(r)if(Ee(l,h))g!==l[h]&&(l[h]=g,c=!0);else{const f=Oa(h);s[f]=Ii(r,o,f,g,e,!1)}else g!==l[h]&&(l[h]=g,c=!0)}}}else{bu(e,a,s,l)&&(c=!0);let d;for(const u in o)(!a||!Ee(a,u)&&((d=zn(u))===u||!Ee(a,d)))&&(r?t&&(t[u]!==void 0||t[d]!==void 0)&&(s[u]=Ii(r,o,u,void 0,e,!0)):delete s[u]);if(l!==o)for(const u in l)(!a||!Ee(a,u))&&(delete l[u],c=!0)}c&&Mt(e,"set","$attrs")}function bu(e,a,t,n){const[s,l]=e.propsOptions;let i=!1,o;if(a)for(let r in a){if(Xs(r))continue;const c=a[r];let d;s&&Ee(s,d=Oa(r))?!l||!l.includes(d)?t[d]=c:(o||(o={}))[d]=c:Il(e.emitsOptions,r)||(!(r in n)||c!==n[r])&&(n[r]=c,i=!0)}if(l){const r=Ce(t),c=o||Ve;for(let d=0;d<l.length;d++){const u=l[d];t[u]=Ii(s,r,u,c[u],e,!Ee(c,u))}}return i}function Ii(e,a,t,n,s,l){const i=e[t];if(i!=null){const o=Ee(i,"default");if(o&&n===void 0){const r=i.default;if(i.type!==Function&&!i.skipFactory&&Ae(r)){const{propsDefaults:c}=s;t in c?n=c[t]:(En(s),n=c[t]=r.call(null,a),rn())}else n=r}i[0]&&(l&&!o?n=!1:i[1]&&(n===""||n===zn(t))&&(n=!0))}return n}function wu(e,a,t=!1){const n=a.propsCache,s=n.get(e);if(s)return s;const l=e.props,i={},o=[];let r=!1;if(!Ae(e)){const d=u=>{r=!0;const[h,g]=wu(u,a,!0);Ze(i,h),g&&o.push(...g)};!t&&a.mixins.length&&a.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}if(!l&&!r)return We(e)&&n.set(e,In),In;if(ye(l))for(let d=0;d<l.length;d++){const u=Oa(l[d]);Jr(u)&&(i[u]=Ve)}else if(l)for(const d in l){const u=Oa(d);if(Jr(u)){const h=l[d],g=i[u]=ye(h)||Ae(h)?{type:h}:Ze({},h);if(g){const f=Yr(Boolean,g.type),v=Yr(String,g.type);g[0]=f>-1,g[1]=v<0||f<v,(f>-1||Ee(g,"default"))&&o.push(u)}}}const c=[i,o];return We(e)&&n.set(e,c),c}function Jr(e){return e[0]!=="$"}function $r(e){const a=e&&e.toString().match(/^\s*(function|class) (\w+)/);return a?a[2]:e===null?"null":""}function jr(e,a){return $r(e)===$r(a)}function Yr(e,a){return ye(a)?a.findIndex(t=>jr(t,e)):Ae(a)&&jr(a,e)?0:-1}const Mu=e=>e[0]==="_"||e==="$stable",Oo=e=>ye(e)?e.map(it):[it(e)],_f=(e,a,t)=>{if(a._n)return a;const n=Fe((...s)=>Oo(a(...s)),t);return n._c=!1,n},xu=(e,a,t)=>{const n=e._ctx;for(const s in e){if(Mu(s))continue;const l=e[s];if(Ae(l))a[s]=_f(s,l,n);else if(l!=null){const i=Oo(l);a[s]=()=>i}}},Su=(e,a)=>{const t=Oo(a);e.slots.default=()=>t},Wf=(e,a)=>{if(e.vnode.shapeFlag&32){const t=a._;t?(e.slots=Ce(a),rl(a,"_",t)):xu(a,e.slots={})}else e.slots={},a&&Su(e,a);rl(e.slots,Dl,1)},Vf=(e,a,t)=>{const{vnode:n,slots:s}=e;let l=!0,i=Ve;if(n.shapeFlag&32){const o=a._;o?t&&o===1?l=!1:(Ze(s,a),!t&&o===1&&delete s._):(l=!a.$stable,xu(a,s)),i=a}else a&&(Su(e,a),i={default:1});if(l)for(const o in s)!Mu(o)&&!(o in i)&&delete s[o]};function Ti(e,a,t,n,s=!1){if(ye(e)){e.forEach((h,g)=>Ti(h,a&&(ye(a)?a[g]:a),t,n,s));return}if(al(n)&&!s)return;const l=n.shapeFlag&4?Gl(n.component)||n.component.proxy:n.el,i=s?null:l,{i:o,r}=e,c=a&&a.r,d=o.refs===Ve?o.refs={}:o.refs,u=o.setupState;if(c!=null&&c!==r&&(Ye(c)?(d[c]=null,Ee(u,c)&&(u[c]=null)):Ue(c)&&(c.value=null)),Ae(r))Ot(r,o,12,[i,d]);else{const h=Ye(r),g=Ue(r);if(h||g){const f=()=>{if(e.f){const v=h?Ee(u,r)?u[r]:d[r]:r.value;s?ye(v)&&ko(v,l):ye(v)?v.includes(l)||v.push(l):h?(d[r]=[l],Ee(u,r)&&(u[r]=d[r])):(r.value=[l],e.k&&(d[e.k]=r.value))}else h?(d[r]=i,Ee(u,r)&&(u[r]=i)):g&&(r.value=i,e.k&&(d[e.k]=i))};i?(f.id=-1,Sa(f,t)):f()}}}const Sa=wf;function Qf(e){return Uf(e)}function Uf(e,a){const t=ki();t.__VUE__=!0;const{insert:n,remove:s,patchProp:l,createElement:i,createText:o,createComment:r,setText:c,setElementText:d,parentNode:u,nextSibling:h,setScopeId:g=Za,insertStaticContent:f}=e,v=(M,S,G,N=null,W=null,V=null,le=!1,ne=null,oe=!!S.dynamicChildren)=>{if(M===S)return;M&&!en(M,S)&&(N=R(M),he(M,W,V,!0),M=null),S.patchFlag===-2&&(oe=!1,S.dynamicChildren=null);const{type:X,ref:fe,shapeFlag:me}=S;switch(X){case qs:k(M,S,G,N);break;case Xa:b(M,S,G,N);break;case ni:M==null&&p(S,G,N,le);break;case ve:D(M,S,G,N,W,V,le,ne,oe);break;default:me&1?H(M,S,G,N,W,V,le,ne,oe):me&6?q(M,S,G,N,W,V,le,ne,oe):(me&64||me&128)&&X.process(M,S,G,N,W,V,le,ne,oe,F)}fe!=null&&W&&Ti(fe,M&&M.ref,V,S||M,!S)},k=(M,S,G,N)=>{if(M==null)n(S.el=o(S.children),G,N);else{const W=S.el=M.el;S.children!==M.children&&c(W,S.children)}},b=(M,S,G,N)=>{M==null?n(S.el=r(S.children||""),G,N):S.el=M.el},p=(M,S,G,N)=>{[M.el,M.anchor]=f(M.children,S,G,N,M.el,M.anchor)},w=({el:M,anchor:S},G,N)=>{let W;for(;M&&M!==S;)W=h(M),n(M,G,N),M=W;n(S,G,N)},C=({el:M,anchor:S})=>{let G;for(;M&&M!==S;)G=h(M),s(M),M=G;s(S)},H=(M,S,G,N,W,V,le,ne,oe)=>{le=le||S.type==="svg",M==null?B(S,G,N,W,V,le,ne,oe):L(M,S,W,V,le,ne,oe)},B=(M,S,G,N,W,V,le,ne)=>{let oe,X;const{type:fe,props:me,shapeFlag:pe,transition:Se,dirs:Be}=M;if(oe=M.el=i(M.type,V,me&&me.is,me),pe&8?d(oe,M.children):pe&16&&x(M.children,oe,null,N,W,V&&fe!=="foreignObject",le,ne),Be&&Kt(M,null,N,"created"),I(oe,M,M.scopeId,le,N),me){for(const Oe in me)Oe!=="value"&&!Xs(Oe)&&l(oe,Oe,null,me[Oe],V,M.children,N,W,$);"value"in me&&l(oe,"value",null,me.value),(X=me.onVnodeBeforeMount)&&st(X,N,M)}Be&&Kt(M,null,N,"beforeMount");const _e=(!W||W&&!W.pendingBranch)&&Se&&!Se.persisted;_e&&Se.beforeEnter(oe),n(oe,S,G),((X=me&&me.onVnodeMounted)||_e||Be)&&Sa(()=>{X&&st(X,N,M),_e&&Se.enter(oe),Be&&Kt(M,null,N,"mounted")},W)},I=(M,S,G,N,W)=>{if(G&&g(M,G),N)for(let V=0;V<N.length;V++)g(M,N[V]);if(W){let V=W.subTree;if(S===V){const le=W.vnode;I(M,le,le.scopeId,le.slotScopeIds,W.parent)}}},x=(M,S,G,N,W,V,le,ne,oe=0)=>{for(let X=oe;X<M.length;X++){const fe=M[X]=ne?Rt(M[X]):it(M[X]);v(null,fe,S,G,N,W,V,le,ne)}},L=(M,S,G,N,W,V,le)=>{const ne=S.el=M.el;let{patchFlag:oe,dynamicChildren:X,dirs:fe}=S;oe|=M.patchFlag&16;const me=M.props||Ve,pe=S.props||Ve;let Se;G&&Jt(G,!1),(Se=pe.onVnodeBeforeUpdate)&&st(Se,G,S,M),fe&&Kt(S,M,G,"beforeUpdate"),G&&Jt(G,!0);const Be=W&&S.type!=="foreignObject";if(X?T(M.dynamicChildren,X,ne,G,N,Be,V):le||z(M,S,ne,null,G,N,Be,V,!1),oe>0){if(oe&16)E(ne,S,me,pe,G,N,W);else if(oe&2&&me.class!==pe.class&&l(ne,"class",null,pe.class,W),oe&4&&l(ne,"style",me.style,pe.style,W),oe&8){const _e=S.dynamicProps;for(let Oe=0;Oe<_e.length;Oe++){const aa=_e[Oe],Ka=me[aa],kn=pe[aa];(kn!==Ka||aa==="value")&&l(ne,aa,Ka,kn,W,M.children,G,N,$)}}oe&1&&M.children!==S.children&&d(ne,S.children)}else!le&&X==null&&E(ne,S,me,pe,G,N,W);((Se=pe.onVnodeUpdated)||fe)&&Sa(()=>{Se&&st(Se,G,S,M),fe&&Kt(S,M,G,"updated")},N)},T=(M,S,G,N,W,V,le)=>{for(let ne=0;ne<S.length;ne++){const oe=M[ne],X=S[ne],fe=oe.el&&(oe.type===ve||!en(oe,X)||oe.shapeFlag&70)?u(oe.el):G;v(oe,X,fe,null,N,W,V,le,!0)}},E=(M,S,G,N,W,V,le)=>{if(G!==N){if(G!==Ve)for(const ne in G)!Xs(ne)&&!(ne in N)&&l(M,ne,G[ne],null,le,S.children,W,V,$);for(const ne in N){if(Xs(ne))continue;const oe=N[ne],X=G[ne];oe!==X&&ne!=="value"&&l(M,ne,X,oe,le,S.children,W,V,$)}"value"in N&&l(M,"value",G.value,N.value)}},D=(M,S,G,N,W,V,le,ne,oe)=>{const X=S.el=M?M.el:o(""),fe=S.anchor=M?M.anchor:o("");let{patchFlag:me,dynamicChildren:pe,slotScopeIds:Se}=S;Se&&(ne=ne?ne.concat(Se):Se),M==null?(n(X,G,N),n(fe,G,N),x(S.children,G,fe,W,V,le,ne,oe)):me>0&&me&64&&pe&&M.dynamicChildren?(T(M.dynamicChildren,pe,G,W,V,le,ne),(S.key!=null||W&&S===W.subTree)&&zo(M,S,!0)):z(M,S,G,fe,W,V,le,ne,oe)},q=(M,S,G,N,W,V,le,ne,oe)=>{S.slotScopeIds=ne,M==null?S.shapeFlag&512?W.ctx.activate(S,G,N,le,oe):U(S,G,N,W,V,le,oe):_(M,S,oe)},U=(M,S,G,N,W,V,le)=>{const ne=M.component=nv(M,N,W);if(Tl(M)&&(ne.ctx.renderer=F),sv(ne),ne.asyncDep){if(W&&W.registerDep(ne,J),!M.el){const oe=ne.subTree=m(Xa);b(null,oe,S,G)}return}J(ne,M,S,G,W,V,le)},_=(M,S,G)=>{const N=S.component=M.component;if(yf(M,S,G))if(N.asyncDep&&!N.asyncResolved){K(N,S,G);return}else N.next=S,hf(N.update),N.update();else S.el=M.el,N.vnode=S},J=(M,S,G,N,W,V,le)=>{const ne=()=>{if(M.isMounted){let{next:fe,bu:me,u:pe,parent:Se,vnode:Be}=M,_e=fe,Oe;Jt(M,!1),fe?(fe.el=Be.el,K(M,fe,le)):fe=Be,me&&el(me),(Oe=fe.props&&fe.props.onVnodeBeforeUpdate)&&st(Oe,Se,fe,Be),Jt(M,!0);const aa=ei(M),Ka=M.subTree;M.subTree=aa,v(Ka,aa,u(Ka.el),R(Ka),M,W,V),fe.el=aa.el,_e===null&&kf(M,aa.el),pe&&Sa(pe,W),(Oe=fe.props&&fe.props.onVnodeUpdated)&&Sa(()=>st(Oe,Se,fe,Be),W)}else{let fe;const{el:me,props:pe}=S,{bm:Se,m:Be,parent:_e}=M,Oe=al(S);if(Jt(M,!1),Se&&el(Se),!Oe&&(fe=pe&&pe.onVnodeBeforeMount)&&st(fe,_e,S),Jt(M,!0),me&&ge){const aa=()=>{M.subTree=ei(M),ge(me,M.subTree,M,W,null)};Oe?S.type.__asyncLoader().then(()=>!M.isUnmounted&&aa()):aa()}else{const aa=M.subTree=ei(M);v(null,aa,G,N,M,W,V),S.el=aa.el}if(Be&&Sa(Be,W),!Oe&&(fe=pe&&pe.onVnodeMounted)){const aa=S;Sa(()=>st(fe,_e,aa),W)}(S.shapeFlag&256||_e&&al(_e.vnode)&&_e.vnode.shapeFlag&256)&&M.a&&Sa(M.a,W),M.isMounted=!0,S=G=N=null}},oe=M.effect=new Lo(ne,()=>Go(X),M.scope),X=M.update=()=>oe.run();X.id=M.uid,Jt(M,!0),X()},K=(M,S,G)=>{S.component=M;const N=M.vnode.props;M.vnode=S,M.next=null,zf(M,S.props,N,G),Vf(M,S.children,G),_n(),Or(),Wn()},z=(M,S,G,N,W,V,le,ne,oe=!1)=>{const X=M&&M.children,fe=M?M.shapeFlag:0,me=S.children,{patchFlag:pe,shapeFlag:Se}=S;if(pe>0){if(pe&128){Q(X,me,G,N,W,V,le,ne,oe);return}else if(pe&256){ee(X,me,G,N,W,V,le,ne,oe);return}}Se&8?(fe&16&&$(X,W,V),me!==X&&d(G,me)):fe&16?Se&16?Q(X,me,G,N,W,V,le,ne,oe):$(X,W,V,!0):(fe&8&&d(G,""),Se&16&&x(me,G,N,W,V,le,ne,oe))},ee=(M,S,G,N,W,V,le,ne,oe)=>{M=M||In,S=S||In;const X=M.length,fe=S.length,me=Math.min(X,fe);let pe;for(pe=0;pe<me;pe++){const Se=S[pe]=oe?Rt(S[pe]):it(S[pe]);v(M[pe],Se,G,null,W,V,le,ne,oe)}X>fe?$(M,W,V,!0,!1,me):x(S,G,N,W,V,le,ne,oe,me)},Q=(M,S,G,N,W,V,le,ne,oe)=>{let X=0;const fe=S.length;let me=M.length-1,pe=fe-1;for(;X<=me&&X<=pe;){const Se=M[X],Be=S[X]=oe?Rt(S[X]):it(S[X]);if(en(Se,Be))v(Se,Be,G,null,W,V,le,ne,oe);else break;X++}for(;X<=me&&X<=pe;){const Se=M[me],Be=S[pe]=oe?Rt(S[pe]):it(S[pe]);if(en(Se,Be))v(Se,Be,G,null,W,V,le,ne,oe);else break;me--,pe--}if(X>me){if(X<=pe){const Se=pe+1,Be=Se<fe?S[Se].el:N;for(;X<=pe;)v(null,S[X]=oe?Rt(S[X]):it(S[X]),G,Be,W,V,le,ne,oe),X++}}else if(X>pe)for(;X<=me;)he(M[X],W,V,!0),X++;else{const Se=X,Be=X,_e=new Map;for(X=Be;X<=pe;X++){const Ia=S[X]=oe?Rt(S[X]):it(S[X]);Ia.key!=null&&_e.set(Ia.key,X)}let Oe,aa=0;const Ka=pe-Be+1;let kn=!1,Tr=0;const as=new Array(Ka);for(X=0;X<Ka;X++)as[X]=0;for(X=Se;X<=me;X++){const Ia=M[X];if(aa>=Ka){he(Ia,W,V,!0);continue}let nt;if(Ia.key!=null)nt=_e.get(Ia.key);else for(Oe=Be;Oe<=pe;Oe++)if(as[Oe-Be]===0&&en(Ia,S[Oe])){nt=Oe;break}nt===void 0?he(Ia,W,V,!0):(as[nt-Be]=X+1,nt>=Tr?Tr=nt:kn=!0,v(Ia,S[nt],G,null,W,V,le,ne,oe),aa++)}const Br=kn?Kf(as):In;for(Oe=Br.length-1,X=Ka-1;X>=0;X--){const Ia=Be+X,nt=S[Ia],Hr=Ia+1<fe?S[Ia+1].el:N;as[X]===0?v(null,nt,G,Hr,W,V,le,ne,oe):kn&&(Oe<0||X!==Br[Oe]?te(nt,G,Hr,2):Oe--)}}},te=(M,S,G,N,W=null)=>{const{el:V,type:le,transition:ne,children:oe,shapeFlag:X}=M;if(X&6){te(M.component.subTree,S,G,N);return}if(X&128){M.suspense.move(S,G,N);return}if(X&64){le.move(M,S,G,F);return}if(le===ve){n(V,S,G);for(let me=0;me<oe.length;me++)te(oe[me],S,G,N);n(M.anchor,S,G);return}if(le===ni){w(M,S,G);return}if(N!==2&&X&1&&ne)if(N===0)ne.beforeEnter(V),n(V,S,G),Sa(()=>ne.enter(V),W);else{const{leave:me,delayLeave:pe,afterLeave:Se}=ne,Be=()=>n(V,S,G),_e=()=>{me(V,()=>{Be(),Se&&Se()})};pe?pe(V,Be,_e):_e()}else n(V,S,G)},he=(M,S,G,N=!1,W=!1)=>{const{type:V,props:le,ref:ne,children:oe,dynamicChildren:X,shapeFlag:fe,patchFlag:me,dirs:pe}=M;if(ne!=null&&Ti(ne,null,G,M,!0),fe&256){S.ctx.deactivate(M);return}const Se=fe&1&&pe,Be=!al(M);let _e;if(Be&&(_e=le&&le.onVnodeBeforeUnmount)&&st(_e,S,M),fe&6)Ie(M.component,G,N);else{if(fe&128){M.suspense.unmount(G,N);return}Se&&Kt(M,null,S,"beforeUnmount"),fe&64?M.type.remove(M,S,G,W,F,N):X&&(V!==ve||me>0&&me&64)?$(X,S,G,!1,!0):(V===ve&&me&384||!W&&fe&16)&&$(oe,S,G),N&&we(M)}(Be&&(_e=le&&le.onVnodeUnmounted)||Se)&&Sa(()=>{_e&&st(_e,S,M),Se&&Kt(M,null,S,"unmounted")},G)},we=M=>{const{type:S,el:G,anchor:N,transition:W}=M;if(S===ve){ke(G,N);return}if(S===ni){C(M);return}const V=()=>{s(G),W&&!W.persisted&&W.afterLeave&&W.afterLeave()};if(M.shapeFlag&1&&W&&!W.persisted){const{leave:le,delayLeave:ne}=W,oe=()=>le(G,V);ne?ne(M.el,V,oe):oe()}else V()},ke=(M,S)=>{let G;for(;M!==S;)G=h(M),s(M),M=G;s(S)},Ie=(M,S,G)=>{const{bum:N,scope:W,update:V,subTree:le,um:ne}=M;N&&el(N),W.stop(),V&&(V.active=!1,he(le,M,S,G)),ne&&Sa(ne,S),Sa(()=>{M.isUnmounted=!0},S),S&&S.pendingBranch&&!S.isUnmounted&&M.asyncDep&&!M.asyncResolved&&M.suspenseId===S.pendingId&&(S.deps--,S.deps===0&&S.resolve())},$=(M,S,G,N=!1,W=!1,V=0)=>{for(let le=V;le<M.length;le++)he(M[le],S,G,N,W)},R=M=>M.shapeFlag&6?R(M.component.subTree):M.shapeFlag&128?M.suspense.next():h(M.anchor||M.el),O=(M,S,G)=>{M==null?S._vnode&&he(S._vnode,null,null,!0):v(S._vnode||null,M,S,null,null,null,G),Or(),nu(),S._vnode=M},F={p:v,um:he,m:te,r:we,mt:U,mc:x,pc:z,pbc:T,n:R,o:e};let Y,ge;return a&&([Y,ge]=a(F)),{render:O,hydrate:Y,createApp:Nf(O,Y)}}function Jt({effect:e,update:a},t){e.allowRecurse=a.allowRecurse=t}function zo(e,a,t=!1){const n=e.children,s=a.children;if(ye(n)&&ye(s))for(let l=0;l<n.length;l++){const i=n[l];let o=s[l];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[l]=Rt(s[l]),o.el=i.el),t||zo(i,o)),o.type===qs&&(o.el=i.el)}}function Kf(e){const a=e.slice(),t=[0];let n,s,l,i,o;const r=e.length;for(n=0;n<r;n++){const c=e[n];if(c!==0){if(s=t[t.length-1],e[s]<c){a[n]=s,t.push(n);continue}for(l=0,i=t.length-1;l<i;)o=l+i>>1,e[t[o]]<c?l=o+1:i=o;c<e[t[l]]&&(l>0&&(a[n]=t[l-1]),t[l]=n)}}for(l=t.length,i=t[l-1];l-- >0;)t[l]=i,i=a[i];return t}const Jf=e=>e.__isTeleport,hs=e=>e&&(e.disabled||e.disabled===""),Zr=e=>typeof SVGElement<"u"&&e instanceof SVGElement,Bi=(e,a)=>{const t=e&&e.to;return Ye(t)?a?a(t):null:t},$f={__isTeleport:!0,process(e,a,t,n,s,l,i,o,r,c){const{mc:d,pc:u,pbc:h,o:{insert:g,querySelector:f,createText:v,createComment:k}}=c,b=hs(a.props);let{shapeFlag:p,children:w,dynamicChildren:C}=a;if(e==null){const H=a.el=v(""),B=a.anchor=v("");g(H,t,n),g(B,t,n);const I=a.target=Bi(a.props,f),x=a.targetAnchor=v("");I&&(g(x,I),i=i||Zr(I));const L=(T,E)=>{p&16&&d(w,T,E,s,l,i,o,r)};b?L(t,B):I&&L(I,x)}else{a.el=e.el;const H=a.anchor=e.anchor,B=a.target=e.target,I=a.targetAnchor=e.targetAnchor,x=hs(e.props),L=x?t:B,T=x?H:I;if(i=i||Zr(B),C?(h(e.dynamicChildren,C,L,s,l,i,o),zo(e,a,!0)):r||u(e,a,L,T,s,l,i,o,!1),b)x||Js(a,t,H,c,1);else if((a.props&&a.props.to)!==(e.props&&e.props.to)){const E=a.target=Bi(a.props,f);E&&Js(a,E,null,c,0)}else x&&Js(a,B,I,c,1)}Lu(a)},remove(e,a,t,n,{um:s,o:{remove:l}},i){const{shapeFlag:o,children:r,anchor:c,targetAnchor:d,target:u,props:h}=e;if(u&&l(d),(i||!hs(h))&&(l(c),o&16))for(let g=0;g<r.length;g++){const f=r[g];s(f,a,t,!0,!!f.dynamicChildren)}},move:Js,hydrate:jf};function Js(e,a,t,{o:{insert:n},m:s},l=2){l===0&&n(e.targetAnchor,a,t);const{el:i,anchor:o,shapeFlag:r,children:c,props:d}=e,u=l===2;if(u&&n(i,a,t),(!u||hs(d))&&r&16)for(let h=0;h<c.length;h++)s(c[h],a,t,2);u&&n(o,a,t)}function jf(e,a,t,n,s,l,{o:{nextSibling:i,parentNode:o,querySelector:r}},c){const d=a.target=Bi(a.props,r);if(d){const u=d._lpa||d.firstChild;if(a.shapeFlag&16)if(hs(a.props))a.anchor=c(i(e),a,o(e),t,n,s,l),a.targetAnchor=u;else{a.anchor=i(e);let h=u;for(;h;)if(h=i(h),h&&h.nodeType===8&&h.data==="teleport anchor"){a.targetAnchor=h,d._lpa=a.targetAnchor&&i(a.targetAnchor);break}c(u,a,d,t,n,s,l)}Lu(a)}return a.anchor&&i(a.anchor)}const Yf=$f;function Lu(e){const a=e.ctx;if(a&&a.ut){let t=e.children[0].el;for(;t!==e.targetAnchor;)t.nodeType===1&&t.setAttribute("data-v-owner",a.uid),t=t.nextSibling;a.ut()}}const ve=Symbol.for("v-fgt"),qs=Symbol.for("v-txt"),Xa=Symbol.for("v-cmt"),ni=Symbol.for("v-stc"),ms=[];let ja=null;function Ge(e=!1){ms.push(ja=e?null:[])}function Zf(){ms.pop(),ja=ms[ms.length-1]||null}let Ss=1;function Xr(e){Ss+=e}function Au(e){return e.dynamicChildren=Ss>0?ja||In:null,Zf(),Ss>0&&ja&&ja.push(e),e}function sa(e,a,t,n,s,l){return Au(Me(e,a,t,n,s,l,!0))}function ma(e,a,t,n,s){return Au(m(e,a,t,n,s,!0))}function Hi(e){return e?e.__v_isVNode===!0:!1}function en(e,a){return e.type===a.type&&e.key===a.key}const Dl="__vInternal",Cu=({key:e})=>e??null,tl=({ref:e,ref_key:a,ref_for:t})=>(typeof e=="number"&&(e=""+e),e!=null?Ye(e)||Ue(e)||Ae(e)?{i:Ha,r:e,k:a,f:!!t}:e:null);function Me(e,a=null,t=null,n=0,s=null,l=e===ve?0:1,i=!1,o=!1){const r={__v_isVNode:!0,__v_skip:!0,type:e,props:a,key:a&&Cu(a),ref:a&&tl(a),scopeId:iu,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:l,patchFlag:n,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Ha};return o?(_o(r,t),l&128&&e.normalize(r)):t&&(r.shapeFlag|=Ye(t)?8:16),Ss>0&&!i&&ja&&(r.patchFlag>0||l&6)&&r.patchFlag!==32&&ja.push(r),r}const m=Xf;function Xf(e,a=null,t=null,n=0,s=null,l=!1){if((!e||e===pu)&&(e=Xa),Hi(e)){const o=xt(e,a,!0);return t&&_o(o,t),Ss>0&&!l&&ja&&(o.shapeFlag&6?ja[ja.indexOf(e)]=o:ja.push(o)),o.patchFlag|=-2,o}if(cv(e)&&(e=e.__vccOpts),a){a=ev(a);let{class:o,style:r}=a;o&&!Ye(o)&&(a.class=ln(o)),We(r)&&(Jd(r)&&!ye(r)&&(r=Ze({},r)),a.style=Mo(r))}const i=Ye(e)?1:bf(e)?128:Jf(e)?64:We(e)?4:Ae(e)?2:0;return Me(e,a,t,n,s,i,l,!0)}function ev(e){return e?Jd(e)||Dl in e?Ze({},e):e:null}function xt(e,a,t=!1){const{props:n,ref:s,patchFlag:l,children:i}=e,o=a?ie(n||{},a):n;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:o,key:o&&Cu(o),ref:a&&a.ref?t&&s?ye(s)?s.concat(tl(a)):[s,tl(a)]:tl(a):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:a&&e.type!==ve?l===-1?16:l|16:l,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&xt(e.ssContent),ssFallback:e.ssFallback&&xt(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function La(e=" ",a=0){return m(qs,null,e,a)}function Ja(e="",a=!1){return a?(Ge(),ma(Xa,null,e)):m(Xa,null,e)}function it(e){return e==null||typeof e=="boolean"?m(Xa):ye(e)?m(ve,null,e.slice()):typeof e=="object"?Rt(e):m(qs,null,String(e))}function Rt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:xt(e)}function _o(e,a){let t=0;const{shapeFlag:n}=e;if(a==null)a=null;else if(ye(a))t=16;else if(typeof a=="object")if(n&65){const s=a.default;s&&(s._c&&(s._d=!1),_o(e,s()),s._c&&(s._d=!0));return}else{t=32;const s=a._;!s&&!(Dl in a)?a._ctx=Ha:s===3&&Ha&&(Ha.slots._===1?a._=1:(a._=2,e.patchFlag|=1024))}else Ae(a)?(a={default:a,_ctx:Ha},t=32):(a=String(a),n&64?(t=16,a=[La(a)]):t=8);e.children=a,e.shapeFlag|=t}function ie(...e){const a={};for(let t=0;t<e.length;t++){const n=e[t];for(const s in n)if(s==="class")a.class!==n.class&&(a.class=ln([a.class,n.class]));else if(s==="style")a.style=Mo([a.style,n.style]);else if(xl(s)){const l=a[s],i=n[s];i&&l!==i&&!(ye(l)&&l.includes(i))&&(a[s]=l?[].concat(l,i):i)}else s!==""&&(a[s]=n[s])}return a}function st(e,a,t,n=null){Pa(e,a,7,[t,n])}const av=ku();let tv=0;function nv(e,a,t){const n=e.type,s=(a?a.appContext:e.appContext)||av,l={uid:tv++,vnode:e,type:n,parent:a,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new qd(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:a?a.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:wu(n,s),emitsOptions:lu(n,s),emit:null,emitted:null,propsDefaults:Ve,inheritAttrs:n.inheritAttrs,ctx:Ve,data:Ve,props:Ve,attrs:Ve,slots:Ve,refs:Ve,setupState:Ve,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return l.ctx={_:l},l.root=a?a.root:l,l.emit=ff.bind(null,l),e.ce&&e.ce(l),l}let la=null;const Wo=()=>la||Ha;let Vo,bn,ec="__VUE_INSTANCE_SETTERS__";(bn=ki()[ec])||(bn=ki()[ec]=[]),bn.push(e=>la=e),Vo=e=>{bn.length>1?bn.forEach(a=>a(e)):bn[0](e)};const En=e=>{Vo(e),e.scope.on()},rn=()=>{la&&la.scope.off(),Vo(null)};function Iu(e){return e.vnode.shapeFlag&4}let Ls=!1;function sv(e,a=!1){Ls=a;const{props:t,children:n}=e.vnode,s=Iu(e);Of(e,t,s,a),Wf(e,n);const l=s?lv(e,a):void 0;return Ls=!1,l}function lv(e,a){const t=e.type;e.accessCache=Object.create(null),e.proxy=$d(new Proxy(e.ctx,Df));const{setup:n}=t;if(n){const s=e.setupContext=n.length>1?ov(e):null;En(e),_n();const l=Ot(n,e,0,[e.props,s]);if(Wn(),rn(),Hd(l)){if(l.then(rn,rn),a)return l.then(i=>{ac(e,i,a)}).catch(i=>{Cl(i,e,0)});e.asyncDep=l}else ac(e,l,a)}else Tu(e,a)}function ac(e,a,t){Ae(a)?e.type.__ssrInlineRender?e.ssrRender=a:e.render=a:We(a)&&(e.setupState=Xd(a)),Tu(e,t)}let tc;function Tu(e,a,t){const n=e.type;if(!e.render){if(!a&&tc&&!n.render){const s=n.template||No(e).template;if(s){const{isCustomElement:l,compilerOptions:i}=e.appContext.config,{delimiters:o,compilerOptions:r}=n,c=Ze(Ze({isCustomElement:l,delimiters:o},i),r);n.render=tc(s,c)}}e.render=n.render||Za}En(e),_n(),Gf(e),Wn(),rn()}function iv(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get(a,t){return Ca(e,"get","$attrs"),a[t]}}))}function ov(e){const a=t=>{e.exposed=t||{}};return{get attrs(){return iv(e)},slots:e.slots,emit:e.emit,expose:a}}function Gl(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Xd($d(e.exposed)),{get(a,t){if(t in a)return a[t];if(t in us)return us[t](e)},has(a,t){return t in a||t in us}}))}function rv(e,a=!0){return Ae(e)?e.displayName||e.name:e.name||a&&e.__name}function cv(e){return Ae(e)&&"__vccOpts"in e}const y=(e,a)=>cf(e,a,Ls);function mt(e,a,t){const n=arguments.length;return n===2?We(a)&&!ye(a)?Hi(a)?m(e,null,[a]):m(e,a):m(e,null,a):(n>3?t=Array.prototype.slice.call(arguments,2):n===3&&Hi(t)&&(t=[t]),m(e,a,t))}const dv=Symbol.for("v-scx"),uv=()=>He(dv),hv="3.3.4",mv="http://www.w3.org/2000/svg",an=typeof document<"u"?document:null,nc=an&&an.createElement("template"),gv={insert:(e,a,t)=>{a.insertBefore(e,t||null)},remove:e=>{const a=e.parentNode;a&&a.removeChild(e)},createElement:(e,a,t,n)=>{const s=a?an.createElementNS(mv,e):an.createElement(e,t?{is:t}:void 0);return e==="select"&&n&&n.multiple!=null&&s.setAttribute("multiple",n.multiple),s},createText:e=>an.createTextNode(e),createComment:e=>an.createComment(e),setText:(e,a)=>{e.nodeValue=a},setElementText:(e,a)=>{e.textContent=a},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>an.querySelector(e),setScopeId(e,a){e.setAttribute(a,"")},insertStaticContent(e,a,t,n,s,l){const i=t?t.previousSibling:a.lastChild;if(s&&(s===l||s.nextSibling))for(;a.insertBefore(s.cloneNode(!0),t),!(s===l||!(s=s.nextSibling)););else{nc.innerHTML=n?`<svg>${e}</svg>`:e;const o=nc.content;if(n){const r=o.firstChild;for(;r.firstChild;)o.appendChild(r.firstChild);o.removeChild(r)}a.insertBefore(o,t)}return[i?i.nextSibling:a.firstChild,t?t.previousSibling:a.lastChild]}};function fv(e,a,t){const n=e._vtc;n&&(a=(a?[a,...n]:[...n]).join(" ")),a==null?e.removeAttribute("class"):t?e.setAttribute("class",a):e.className=a}function vv(e,a,t){const n=e.style,s=Ye(t);if(t&&!s){if(a&&!Ye(a))for(const l in a)t[l]==null&&Di(n,l,"");for(const l in t)Di(n,l,t[l])}else{const l=n.display;s?a!==t&&(n.cssText=t):a&&e.removeAttribute("style"),"_vod"in e&&(n.display=l)}}const sc=/\s*!important$/;function Di(e,a,t){if(ye(t))t.forEach(n=>Di(e,a,n));else if(t==null&&(t=""),a.startsWith("--"))e.setProperty(a,t);else{const n=pv(e,a);sc.test(t)?e.setProperty(zn(n),t.replace(sc,""),"important"):e[n]=t}}const lc=["Webkit","Moz","ms"],si={};function pv(e,a){const t=si[a];if(t)return t;let n=Oa(a);if(n!=="filter"&&n in e)return si[a]=n;n=Ct(n);for(let s=0;s<lc.length;s++){const l=lc[s]+n;if(l in e)return si[a]=l}return a}const ic="http://www.w3.org/1999/xlink";function yv(e,a,t,n,s){if(n&&a.startsWith("xlink:"))t==null?e.removeAttributeNS(ic,a.slice(6,a.length)):e.setAttributeNS(ic,a,t);else{const l=Cg(a);t==null||l&&!Ed(t)?e.removeAttribute(a):e.setAttribute(a,l?"":t)}}function kv(e,a,t,n,s,l,i){if(a==="innerHTML"||a==="textContent"){n&&i(n,s,l),e[a]=t??"";return}const o=e.tagName;if(a==="value"&&o!=="PROGRESS"&&!o.includes("-")){e._value=t;const c=o==="OPTION"?e.getAttribute("value"):e.value,d=t??"";c!==d&&(e.value=d),t==null&&e.removeAttribute(a);return}let r=!1;if(t===""||t==null){const c=typeof e[a];c==="boolean"?t=Ed(t):t==null&&c==="string"?(t="",r=!0):c==="number"&&(t=0,r=!0)}try{e[a]=t}catch{}r&&e.removeAttribute(a)}function Ln(e,a,t,n){e.addEventListener(a,t,n)}function bv(e,a,t,n){e.removeEventListener(a,t,n)}function wv(e,a,t,n,s=null){const l=e._vei||(e._vei={}),i=l[a];if(n&&i)i.value=n;else{const[o,r]=Mv(a);if(n){const c=l[a]=Lv(n,s);Ln(e,o,c,r)}else i&&(bv(e,o,i,r),l[a]=void 0)}}const oc=/(?:Once|Passive|Capture)$/;function Mv(e){let a;if(oc.test(e)){a={};let n;for(;n=e.match(oc);)e=e.slice(0,e.length-n[0].length),a[n[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):zn(e.slice(2)),a]}let li=0;const xv=Promise.resolve(),Sv=()=>li||(xv.then(()=>li=0),li=Date.now());function Lv(e,a){const t=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=t.attached)return;Pa(Av(n,t.value),a,5,[n])};return t.value=e,t.attached=Sv(),t}function Av(e,a){if(ye(a)){const t=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{t.call(e),e._stopped=!0},a.map(n=>s=>!s._stopped&&n&&n(s))}else return a}const rc=/^on[a-z]/,Cv=(e,a,t,n,s=!1,l,i,o,r)=>{a==="class"?fv(e,n,s):a==="style"?vv(e,t,n):xl(a)?yo(a)||wv(e,a,t,n,i):(a[0]==="."?(a=a.slice(1),!0):a[0]==="^"?(a=a.slice(1),!1):Iv(e,a,n,s))?kv(e,a,n,l,i,o,r):(a==="true-value"?e._trueValue=n:a==="false-value"&&(e._falseValue=n),yv(e,a,n,s))};function Iv(e,a,t,n){return n?!!(a==="innerHTML"||a==="textContent"||a in e&&rc.test(a)&&Ae(t)):a==="spellcheck"||a==="draggable"||a==="translate"||a==="form"||a==="list"&&e.tagName==="INPUT"||a==="type"&&e.tagName==="TEXTAREA"||rc.test(a)&&Ye(t)?!1:a in e}const Et="transition",ts="animation",dt=(e,{slots:a})=>mt(Sf,Hu(e),a);dt.displayName="Transition";const Bu={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Tv=dt.props=Ze({},cu,Bu),$t=(e,a=[])=>{ye(e)?e.forEach(t=>t(...a)):e&&e(...a)},cc=e=>e?ye(e)?e.some(a=>a.length>1):e.length>1:!1;function Hu(e){const a={};for(const D in e)D in Bu||(a[D]=e[D]);if(e.css===!1)return a;const{name:t="v",type:n,duration:s,enterFromClass:l=`${t}-enter-from`,enterActiveClass:i=`${t}-enter-active`,enterToClass:o=`${t}-enter-to`,appearFromClass:r=l,appearActiveClass:c=i,appearToClass:d=o,leaveFromClass:u=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:g=`${t}-leave-to`}=e,f=Bv(s),v=f&&f[0],k=f&&f[1],{onBeforeEnter:b,onEnter:p,onEnterCancelled:w,onLeave:C,onLeaveCancelled:H,onBeforeAppear:B=b,onAppear:I=p,onAppearCancelled:x=w}=a,L=(D,q,U)=>{qt(D,q?d:o),qt(D,q?c:i),U&&U()},T=(D,q)=>{D._isLeaving=!1,qt(D,u),qt(D,g),qt(D,h),q&&q()},E=D=>(q,U)=>{const _=D?I:p,J=()=>L(q,D,U);$t(_,[q,J]),dc(()=>{qt(q,D?r:l),pt(q,D?d:o),cc(_)||uc(q,n,v,J)})};return Ze(a,{onBeforeEnter(D){$t(b,[D]),pt(D,l),pt(D,i)},onBeforeAppear(D){$t(B,[D]),pt(D,r),pt(D,c)},onEnter:E(!1),onAppear:E(!0),onLeave(D,q){D._isLeaving=!0;const U=()=>T(D,q);pt(D,u),Gu(),pt(D,h),dc(()=>{D._isLeaving&&(qt(D,u),pt(D,g),cc(C)||uc(D,n,k,U))}),$t(C,[D,U])},onEnterCancelled(D){L(D,!1),$t(w,[D])},onAppearCancelled(D){L(D,!0),$t(x,[D])},onLeaveCancelled(D){T(D),$t(H,[D])}})}function Bv(e){if(e==null)return null;if(We(e))return[ii(e.enter),ii(e.leave)];{const a=ii(e);return[a,a]}}function ii(e){return wg(e)}function pt(e,a){a.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e._vtc||(e._vtc=new Set)).add(a)}function qt(e,a){a.split(/\s+/).forEach(n=>n&&e.classList.remove(n));const{_vtc:t}=e;t&&(t.delete(a),t.size||(e._vtc=void 0))}function dc(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Hv=0;function uc(e,a,t,n){const s=e._endId=++Hv,l=()=>{s===e._endId&&n()};if(t)return setTimeout(l,t);const{type:i,timeout:o,propCount:r}=Du(e,a);if(!i)return n();const c=i+"end";let d=0;const u=()=>{e.removeEventListener(c,h),l()},h=g=>{g.target===e&&++d>=r&&u()};setTimeout(()=>{d<r&&u()},o+1),e.addEventListener(c,h)}function Du(e,a){const t=window.getComputedStyle(e),n=f=>(t[f]||"").split(", "),s=n(`${Et}Delay`),l=n(`${Et}Duration`),i=hc(s,l),o=n(`${ts}Delay`),r=n(`${ts}Duration`),c=hc(o,r);let d=null,u=0,h=0;a===Et?i>0&&(d=Et,u=i,h=l.length):a===ts?c>0&&(d=ts,u=c,h=r.length):(u=Math.max(i,c),d=u>0?i>c?Et:ts:null,h=d?d===Et?l.length:r.length:0);const g=d===Et&&/\b(transform|all)(,|$)/.test(n(`${Et}Property`).toString());return{type:d,timeout:u,propCount:h,hasTransform:g}}function hc(e,a){for(;e.length<a.length;)e=e.concat(e);return Math.max(...a.map((t,n)=>mc(t)+mc(e[n])))}function mc(e){return Number(e.slice(0,-1).replace(",","."))*1e3}function Gu(){return document.body.offsetHeight}const Eu=new WeakMap,Fu=new WeakMap,qu={name:"TransitionGroup",props:Ze({},Tv,{tag:String,moveClass:String}),setup(e,{slots:a}){const t=Wo(),n=ru();let s,l;return fu(()=>{if(!s.length)return;const i=e.moveClass||`${e.name||"v"}-move`;if(!Rv(s[0].el,t.vnode.el,i))return;s.forEach(Ev),s.forEach(Fv);const o=s.filter(qv);Gu(),o.forEach(r=>{const c=r.el,d=c.style;pt(c,i),d.transform=d.webkitTransform=d.transitionDuration="";const u=c._moveCb=h=>{h&&h.target!==c||(!h||/transform$/.test(h.propertyName))&&(c.removeEventListener("transitionend",u),c._moveCb=null,qt(c,i))};c.addEventListener("transitionend",u)})}),()=>{const i=Ce(e),o=Hu(i);let r=i.tag||ve;s=l,l=a.default?Fo(a.default()):[];for(let c=0;c<l.length;c++){const d=l[c];d.key!=null&&xs(d,Ms(d,o,n,t))}if(s)for(let c=0;c<s.length;c++){const d=s[c];xs(d,Ms(d,o,n,t)),Eu.set(d,d.el.getBoundingClientRect())}return m(r,null,l)}}},Dv=e=>delete e.mode;qu.props;const Gv=qu;function Ev(e){const a=e.el;a._moveCb&&a._moveCb(),a._enterCb&&a._enterCb()}function Fv(e){Fu.set(e,e.el.getBoundingClientRect())}function qv(e){const a=Eu.get(e),t=Fu.get(e),n=a.left-t.left,s=a.top-t.top;if(n||s){const l=e.el.style;return l.transform=l.webkitTransform=`translate(${n}px,${s}px)`,l.transitionDuration="0s",e}}function Rv(e,a,t){const n=e.cloneNode();e._vtc&&e._vtc.forEach(i=>{i.split(/\s+/).forEach(o=>o&&n.classList.remove(o))}),t.split(/\s+/).forEach(i=>i&&n.classList.add(i)),n.style.display="none";const s=a.nodeType===1?a:a.parentNode;s.appendChild(n);const{hasTransform:l}=Du(n);return s.removeChild(n),l}const gc=e=>{const a=e.props["onUpdate:modelValue"]||!1;return ye(a)?t=>el(a,t):a};function Pv(e){e.target.composing=!0}function fc(e){const a=e.target;a.composing&&(a.composing=!1,a.dispatchEvent(new Event("input")))}const Nv={created(e,{modifiers:{lazy:a,trim:t,number:n}},s){e._assign=gc(s);const l=n||s.props&&s.props.type==="number";Ln(e,a?"change":"input",i=>{if(i.target.composing)return;let o=e.value;t&&(o=o.trim()),l&&(o=yi(o)),e._assign(o)}),t&&Ln(e,"change",()=>{e.value=e.value.trim()}),a||(Ln(e,"compositionstart",Pv),Ln(e,"compositionend",fc),Ln(e,"change",fc))},mounted(e,{value:a}){e.value=a??""},beforeUpdate(e,{value:a,modifiers:{lazy:t,trim:n,number:s}},l){if(e._assign=gc(l),e.composing||document.activeElement===e&&e.type!=="range"&&(t||n&&e.value.trim()===a||(s||e.type==="number")&&yi(e.value)===a))return;const i=a??"";e.value!==i&&(e.value=i)}},Ov=["ctrl","shift","alt","meta"],zv={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,a)=>Ov.some(t=>e[`${t}Key`]&&!a.includes(t))},vc=(e,a)=>(t,...n)=>{for(let s=0;s<a.length;s++){const l=zv[a[s]];if(l&&l(t,a))return}return e(t,...n)},gt={beforeMount(e,{value:a},{transition:t}){e._vod=e.style.display==="none"?"":e.style.display,t&&a?t.beforeEnter(e):ns(e,a)},mounted(e,{value:a},{transition:t}){t&&a&&t.enter(e)},updated(e,{value:a,oldValue:t},{transition:n}){!a!=!t&&(n?a?(n.beforeEnter(e),ns(e,!0),n.enter(e)):n.leave(e,()=>{ns(e,!1)}):ns(e,a))},beforeUnmount(e,{value:a}){ns(e,a)}};function ns(e,a){e.style.display=a?e._vod:"none"}const _v=Ze({patchProp:Cv},gv);let pc;function Wv(){return pc||(pc=Qf(_v))}const Vv=(...e)=>{const a=Wv().createApp(...e),{mount:t}=a;return a.mount=n=>{const s=Qv(n);if(!s)return;const l=a._component;!Ae(l)&&!l.render&&!l.template&&(l.template=s.innerHTML),s.innerHTML="";const i=t(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},a};function Qv(e){return Ye(e)?document.querySelector(e):e}function St(e,a){let t;function n(){t=xo(),t.run(()=>a.length?a(()=>{t==null||t.stop(),n()}):a())}de(e,s=>{s&&!t?n():s||(t==null||t.stop(),t=void 0)},{immediate:!0}),Aa(()=>{t==null||t.stop()})}const Ke=typeof window<"u",Qo=Ke&&"IntersectionObserver"in window,Uv=Ke&&("ontouchstart"in window||window.navigator.maxTouchPoints>0);function yc(e,a,t){Kv(e,a),a.set(e,t)}function Kv(e,a){if(a.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Jv(e,a,t){var n=Ru(e,a,"set");return $v(e,n,t),t}function $v(e,a,t){if(a.set)a.set.call(e,t);else{if(!a.writable)throw new TypeError("attempted to set read only private field");a.value=t}}function jt(e,a){var t=Ru(e,a,"get");return jv(e,t)}function Ru(e,a,t){if(!a.has(e))throw new TypeError("attempted to "+t+" private field on non-instance");return a.get(e)}function jv(e,a){return a.get?a.get.call(e):a.value}function Pu(e,a,t){const n=a.length-1;if(n<0)return e===void 0?t:e;for(let s=0;s<n;s++){if(e==null)return t;e=e[a[s]]}return e==null||e[a[n]]===void 0?t:e[a[n]]}function hn(e,a){if(e===a)return!0;if(e instanceof Date&&a instanceof Date&&e.getTime()!==a.getTime()||e!==Object(e)||a!==Object(a))return!1;const t=Object.keys(e);return t.length!==Object.keys(a).length?!1:t.every(n=>hn(e[n],a[n]))}function Gi(e,a,t){return e==null||!a||typeof a!="string"?t:e[a]!==void 0?e[a]:(a=a.replace(/\[(\w+)\]/g,".$1"),a=a.replace(/^\./,""),Pu(e,a.split("."),t))}function fa(e,a,t){if(a==null)return e===void 0?t:e;if(e!==Object(e)){if(typeof a!="function")return t;const s=a(e,t);return typeof s>"u"?t:s}if(typeof a=="string")return Gi(e,a,t);if(Array.isArray(a))return Pu(e,a,t);if(typeof a!="function")return t;const n=a(e,t);return typeof n>"u"?t:n}function bt(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return Array.from({length:e},(t,n)=>a+n)}function ue(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"px";if(!(e==null||e===""))return isNaN(+e)?String(e):isFinite(+e)?`${Number(e)}${a}`:void 0}function Ei(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function Fi(e){return e&&"$el"in e?e.$el:e}const kc=Object.freeze({enter:13,tab:9,delete:46,esc:27,space:32,up:38,down:40,left:37,right:39,end:35,home:36,del:46,backspace:8,insert:45,pageup:33,pagedown:34,shift:16}),qi=Object.freeze({enter:"Enter",tab:"Tab",delete:"Delete",esc:"Escape",space:"Space",up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",end:"End",home:"Home",del:"Delete",backspace:"Backspace",insert:"Insert",pageup:"PageUp",pagedown:"PageDown",shift:"Shift"});function Nu(e){return Object.keys(e)}function nn(e,a){return a.every(t=>e.hasOwnProperty(t))}function Vn(e,a,t){const n=Object.create(null),s=Object.create(null);for(const l in e)a.some(i=>i instanceof RegExp?i.test(l):i===l)&&!(t!=null&&t.some(i=>i===l))?n[l]=e[l]:s[l]=e[l];return[n,s]}function ft(e,a){const t={...e};return a.forEach(n=>delete t[n]),t}function mn(e){return Vn(e,["class","style","id",/^data-/])}function Na(e){return e==null?[]:Array.isArray(e)?e:[e]}function va(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;return Math.max(a,Math.min(t,e))}function bc(e){const a=e.toString().trim();return a.includes(".")?a.length-a.indexOf(".")-1:0}function wc(e,a){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"0";return e+t.repeat(Math.max(0,a-e.length))}function Yv(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;const t=[];let n=0;for(;n<e.length;)t.push(e.substr(n,a)),n+=a;return t}function Mc(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e3;if(e<a)return`${e} B`;const t=a===1024?["Ki","Mi","Gi"]:["k","M","G"];let n=-1;for(;Math.abs(e)>=a&&n<t.length-1;)e/=a,++n;return`${e.toFixed(1)} ${t[n]}B`}function Ra(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=arguments.length>2?arguments[2]:void 0;const n={};for(const s in e)n[s]=e[s];for(const s in a){const l=e[s],i=a[s];if(Ei(l)&&Ei(i)){n[s]=Ra(l,i,t);continue}if(Array.isArray(l)&&Array.isArray(i)&&t){n[s]=t(l,i);continue}n[s]=i}return n}function Ou(e){return e.map(a=>a.type===ve?Ou(a.children):a).flat()}function cn(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";if(cn.cache.has(e))return cn.cache.get(e);const a=e.replace(/[^a-z]/gi,"-").replace(/\B([A-Z])/g,"-$1").toLowerCase();return cn.cache.set(e,a),a}cn.cache=new Map;function gs(e,a){if(!a||typeof a!="object")return[];if(Array.isArray(a))return a.map(t=>gs(e,t)).flat(1);if(Array.isArray(a.children))return a.children.map(t=>gs(e,t)).flat(1);if(a.component){if(Object.getOwnPropertySymbols(a.component.provides).includes(e))return[a.component];if(a.component.subTree)return gs(e,a.component.subTree).flat(1)}return[]}var $s=new WeakMap,wn=new WeakMap;class Zv{constructor(a){yc(this,$s,{writable:!0,value:[]}),yc(this,wn,{writable:!0,value:0}),this.size=a}push(a){jt(this,$s)[jt(this,wn)]=a,Jv(this,wn,(jt(this,wn)+1)%this.size)}values(){return jt(this,$s).slice(jt(this,wn)).concat(jt(this,$s).slice(0,jt(this,wn)))}}function Xv(e){return"touches"in e?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:{clientX:e.clientX,clientY:e.clientY}}function Uo(e){const a=Ma({}),t=y(e);return Da(()=>{for(const n in t.value)a[n]=t.value[n]},{flush:"sync"}),Ho(a)}function gl(e,a){return e.includes(a)}const e5=/^on[^a-z]/,Ko=e=>e5.test(e);function zu(e){return e[2].toLowerCase()+e.slice(3)}const rt=()=>[Function,Array];function xc(e,a){return a="on"+Ct(a),!!(e[a]||e[`${a}Once`]||e[`${a}Capture`]||e[`${a}OnceCapture`]||e[`${a}CaptureOnce`])}function Jo(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];if(Array.isArray(e))for(const s of e)s(...t);else typeof e=="function"&&e(...t)}function As(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const t=["button","[href]",'input:not([type="hidden"])',"select","textarea","[tabindex]"].map(n=>`${n}${a?':not([tabindex="-1"])':""}:not([disabled])`).join(", ");return[...e.querySelectorAll(t)]}function _u(e,a,t){let n,s=e.indexOf(document.activeElement);const l=a==="next"?1:-1;do s+=l,n=e[s];while((!n||n.offsetParent==null||!((t==null?void 0:t(n))??!0))&&s<e.length&&s>=0);return n}function fl(e,a){var n,s,l,i;const t=As(e);if(!a)(e===document.activeElement||!e.contains(document.activeElement))&&((n=t[0])==null||n.focus());else if(a==="first")(s=t[0])==null||s.focus();else if(a==="last")(l=t.at(-1))==null||l.focus();else if(typeof a=="number")(i=t[a])==null||i.focus();else{const o=_u(t,a);o?o.focus():fl(e,a==="next"?"first":"last")}}function Wu(){}function Fn(e,a){if(!(Ke&&typeof CSS<"u"&&typeof CSS.supports<"u"&&CSS.supports(`selector(${a})`)))return null;try{return!!e&&e.matches(a)}catch{return null}}const Vu=["top","bottom"],a5=["start","end","left","right"];function Ri(e,a){let[t,n]=e.split(" ");return n||(n=gl(Vu,t)?"start":gl(a5,t)?"top":"center"),{side:Pi(t,a),align:Pi(n,a)}}function Pi(e,a){return e==="start"?a?"right":"left":e==="end"?a?"left":"right":e}function oi(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function ri(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Sc(e){return{side:e.align,align:e.side}}function Lc(e){return gl(Vu,e.side)?"y":"x"}class Dn{constructor(a){let{x:t,y:n,width:s,height:l}=a;this.x=t,this.y=n,this.width=s,this.height=l}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function Ac(e,a){return{x:{before:Math.max(0,a.left-e.left),after:Math.max(0,e.right-a.right)},y:{before:Math.max(0,a.top-e.top),after:Math.max(0,e.bottom-a.bottom)}}}function $o(e){const a=e.getBoundingClientRect(),t=getComputedStyle(e),n=t.transform;if(n){let s,l,i,o,r;if(n.startsWith("matrix3d("))s=n.slice(9,-1).split(/, /),l=+s[0],i=+s[5],o=+s[12],r=+s[13];else if(n.startsWith("matrix("))s=n.slice(7,-1).split(/, /),l=+s[0],i=+s[3],o=+s[4],r=+s[5];else return new Dn(a);const c=t.transformOrigin,d=a.x-o-(1-l)*parseFloat(c),u=a.y-r-(1-i)*parseFloat(c.slice(c.indexOf(" ")+1)),h=l?a.width/l:e.offsetWidth+1,g=i?a.height/i:e.offsetHeight+1;return new Dn({x:d,y:u,width:h,height:g})}else return new Dn(a)}function sn(e,a,t){if(typeof e.animate>"u")return{finished:Promise.resolve()};let n;try{n=e.animate(a,t)}catch{return{finished:Promise.resolve()}}return typeof n.finished>"u"&&(n.finished=new Promise(s=>{n.onfinish=()=>{s(n)}})),n}const nl=new WeakMap;function t5(e,a){Object.keys(a).forEach(t=>{if(Ko(t)){const n=zu(t),s=nl.get(e);if(a[t]==null)s==null||s.forEach(l=>{const[i,o]=l;i===n&&(e.removeEventListener(n,o),s.delete(l))});else if(!s||![...s].some(l=>l[0]===n&&l[1]===a[t])){e.addEventListener(n,a[t]);const l=s||new Set;l.add([n,a[t]]),nl.has(e)||nl.set(e,l)}}else a[t]==null?e.removeAttribute(t):e.setAttribute(t,a[t])})}function n5(e,a){Object.keys(a).forEach(t=>{if(Ko(t)){const n=zu(t),s=nl.get(e);s==null||s.forEach(l=>{const[i,o]=l;i===n&&(e.removeEventListener(n,o),s.delete(l))})}else e.removeAttribute(t)})}function s5(e,a){a=Array.isArray(a)?a.slice(0,-1).map(t=>`'${t}'`).join(", ")+` or '${a.at(-1)}'`:`'${a}'`}const vl=.20689655172413793,l5=e=>e>vl**3?Math.cbrt(e):e/(3*vl**2)+4/29,i5=e=>e>vl?e**3:3*vl**2*(e-4/29);function Qu(e){const a=l5,t=a(e[1]);return[116*t-16,500*(a(e[0]/.95047)-t),200*(t-a(e[2]/1.08883))]}function Uu(e){const a=i5,t=(e[0]+16)/116;return[a(t+e[1]/500)*.95047,a(t),a(t-e[2]/200)*1.08883]}const o5=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],r5=e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055,c5=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],d5=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function Ku(e){const a=Array(3),t=r5,n=o5;for(let s=0;s<3;++s)a[s]=Math.round(va(t(n[s][0]*e[0]+n[s][1]*e[1]+n[s][2]*e[2]))*255);return{r:a[0],g:a[1],b:a[2]}}function jo(e){let{r:a,g:t,b:n}=e;const s=[0,0,0],l=d5,i=c5;a=l(a/255),t=l(t/255),n=l(n/255);for(let o=0;o<3;++o)s[o]=i[o][0]*a+i[o][1]*t+i[o][2]*n;return s}function Cc(e){return!!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e)}const Ic=/^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,u5={rgb:(e,a,t,n)=>({r:e,g:a,b:t,a:n}),rgba:(e,a,t,n)=>({r:e,g:a,b:t,a:n}),hsl:(e,a,t,n)=>Tc({h:e,s:a,l:t,a:n}),hsla:(e,a,t,n)=>Tc({h:e,s:a,l:t,a:n}),hsv:(e,a,t,n)=>Lt({h:e,s:a,v:t,a:n}),hsva:(e,a,t,n)=>Lt({h:e,s:a,v:t,a:n})};function wt(e){if(typeof e=="number")return{r:(e&16711680)>>16,g:(e&65280)>>8,b:e&255};if(typeof e=="string"&&Ic.test(e)){const{groups:a}=e.match(Ic),{fn:t,values:n}=a,s=n.split(/,\s*/).map(l=>l.endsWith("%")&&["hsl","hsla","hsv","hsva"].includes(t)?parseFloat(l)/100:parseFloat(l));return u5[t](...s)}else if(typeof e=="string"){let a=e.startsWith("#")?e.slice(1):e;return[3,4].includes(a.length)?a=a.split("").map(t=>t+t).join(""):[6,8].includes(a.length),Zu(a)}else if(typeof e=="object"){if(nn(e,["r","g","b"]))return e;if(nn(e,["h","s","l"]))return Lt(Yo(e));if(nn(e,["h","s","v"]))return Lt(e)}throw new TypeError(`Invalid color: ${e==null?e:String(e)||e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)}function Lt(e){const{h:a,s:t,v:n,a:s}=e,l=o=>{const r=(o+a/60)%6;return n-n*t*Math.max(Math.min(r,4-r,1),0)},i=[l(5),l(3),l(1)].map(o=>Math.round(o*255));return{r:i[0],g:i[1],b:i[2],a:s}}function Tc(e){return Lt(Yo(e))}function El(e){if(!e)return{h:0,s:1,v:1,a:1};const a=e.r/255,t=e.g/255,n=e.b/255,s=Math.max(a,t,n),l=Math.min(a,t,n);let i=0;s!==l&&(s===a?i=60*(0+(t-n)/(s-l)):s===t?i=60*(2+(n-a)/(s-l)):s===n&&(i=60*(4+(a-t)/(s-l)))),i<0&&(i=i+360);const o=s===0?0:(s-l)/s,r=[i,o,s];return{h:r[0],s:r[1],v:r[2],a:e.a}}function Ju(e){const{h:a,s:t,v:n,a:s}=e,l=n-n*t/2,i=l===1||l===0?0:(n-l)/Math.min(l,1-l);return{h:a,s:i,l,a:s}}function Yo(e){const{h:a,s:t,l:n,a:s}=e,l=n+t*Math.min(n,1-n),i=l===0?0:2-2*n/l;return{h:a,s:i,v:l,a:s}}function $u(e){let{r:a,g:t,b:n,a:s}=e;return s===void 0?`rgb(${a}, ${t}, ${n})`:`rgba(${a}, ${t}, ${n}, ${s})`}function ju(e){return $u(Lt(e))}function js(e){const a=Math.round(e).toString(16);return("00".substr(0,2-a.length)+a).toUpperCase()}function Yu(e){let{r:a,g:t,b:n,a:s}=e;return`#${[js(a),js(t),js(n),s!==void 0?js(Math.round(s*255)):""].join("")}`}function Zu(e){e=m5(e);let[a,t,n,s]=Yv(e,2).map(l=>parseInt(l,16));return s=s===void 0?s:s/255,{r:a,g:t,b:n,a:s}}function h5(e){const a=Zu(e);return El(a)}function Xu(e){return Yu(Lt(e))}function m5(e){return e.startsWith("#")&&(e=e.slice(1)),e=e.replace(/([^0-9a-f])/gi,"F"),(e.length===3||e.length===4)&&(e=e.split("").map(a=>a+a).join("")),e.length!==6&&(e=wc(wc(e,6),8,"F")),e}function g5(e,a){const t=Qu(jo(e));return t[0]=t[0]+a*10,Ku(Uu(t))}function f5(e,a){const t=Qu(jo(e));return t[0]=t[0]-a*10,Ku(Uu(t))}function Ni(e){const a=wt(e);return jo(a)[1]}function v5(e,a){const t=Ni(e),n=Ni(a),s=Math.max(t,n),l=Math.min(t,n);return(s+.05)/(l+.05)}function P(e,a){return t=>Object.keys(e).reduce((n,s)=>{const i=typeof e[s]=="object"&&e[s]!=null&&!Array.isArray(e[s])?e[s]:{type:e[s]};return t&&s in t?n[s]={...i,default:t[s]}:n[s]=i,a&&!n[s].source&&(n[s].source=a),n},{})}const ce=P({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function za(e){if(e._setup=e._setup??e.setup,!e.name)return e;if(e._setup){e.props=P(e.props??{},e.name)();const a=Object.keys(e.props);e.filterProps=function(n){return Vn(n,a,["class","style"])},e.props._as=String,e.setup=function(n,s){const l=er();if(!l.value)return e._setup(n,s);const{props:i,provideSubDefaults:o}=S5(n,n._as??e.name,l),r=e._setup(i,s);return o(),r}}return e}function j(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return a=>(e?za:qo)(a)}function at(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",t=arguments.length>2?arguments[2]:void 0;return j()({name:t??Ct(Oa(e.replace(/__/g,"-"))),props:{tag:{type:String,default:a},...ce()},setup(n,s){let{slots:l}=s;return()=>{var i;return mt(n.tag,{class:[e,n.class],style:n.style},(i=l.default)==null?void 0:i.call(l))}}})}function eh(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const a=e.getRootNode();return a!==document&&a.getRootNode({composed:!0})!==document?null:a}const Cs="cubic-bezier(0.4, 0, 0.2, 1)",p5="cubic-bezier(0.0, 0, 0.2, 1)",y5="cubic-bezier(0.4, 0, 1, 1)";function oa(e,a){const t=Wo();if(!t)throw new Error(`[Vuetify] ${e} ${a||"must be called from inside a setup function"}`);return t}function Tt(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"composables";const a=oa(e).type;return cn((a==null?void 0:a.aliasName)||(a==null?void 0:a.name))}let ah=0,sl=new WeakMap;function ka(){const e=oa("getUid");if(sl.has(e))return sl.get(e);{const a=ah++;return sl.set(e,a),a}}ka.reset=()=>{ah=0,sl=new WeakMap};function Zo(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(a?k5(e):Xo(e))return e;e=e.parentElement}return document.scrollingElement}function pl(e,a){const t=[];if(a&&e&&!a.contains(e))return t;for(;e&&(Xo(e)&&t.push(e),e!==a);)e=e.parentElement;return t}function Xo(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const a=window.getComputedStyle(e);return a.overflowY==="scroll"||a.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function k5(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const a=window.getComputedStyle(e);return["scroll","auto"].includes(a.overflowY)}function b5(e){const{provides:a}=oa("injectSelf");if(a&&e in a)return a[e]}function w5(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}function ae(e){const a=oa("useRender");a.render=e}const Is=Symbol.for("vuetify:defaults");function M5(e){return se(e)}function er(){const e=He(Is);if(!e)throw new Error("[Vuetify] Could not find defaults instance");return e}function Xe(e,a){const t=er(),n=se(e),s=y(()=>{if(ia(a==null?void 0:a.disabled))return t.value;const i=ia(a==null?void 0:a.scoped),o=ia(a==null?void 0:a.reset),r=ia(a==null?void 0:a.root);let c=Ra(n.value,{prev:t.value});if(i)return c;if(o||r){const d=Number(o||1/0);for(let u=0;u<=d&&!(!c||!("prev"in c));u++)c=c.prev;return c&&typeof r=="string"&&r in c&&(c=Ra(Ra(c,{prev:c}),c[r])),c}return c.prev?Ra(c.prev,c):c});return je(Is,s),s}function x5(e,a){var t,n;return typeof((t=e.props)==null?void 0:t[a])<"u"||typeof((n=e.props)==null?void 0:n[cn(a)])<"u"}function S5(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:er();const n=oa("useDefaults");if(a=a??n.type.name??n.type.__name,!a)throw new Error("[Vuetify] Could not determine component name");const s=y(()=>{var r;return(r=t.value)==null?void 0:r[e._as??a]}),l=new Proxy(e,{get(r,c){var u,h,g,f;const d=Reflect.get(r,c);return c==="class"||c==="style"?[(u=s.value)==null?void 0:u[c],d].filter(v=>v!=null):typeof c=="string"&&!x5(n.vnode,c)?((h=s.value)==null?void 0:h[c])??((f=(g=t.value)==null?void 0:g.global)==null?void 0:f[c])??d:d}}),i=re();Da(()=>{if(s.value){const r=Object.entries(s.value).filter(c=>{let[d]=c;return d.startsWith(d[0].toUpperCase())});r.length&&(i.value=Object.fromEntries(r))}});function o(){St(i,()=>{var r;Xe(Ra(((r=b5(Is))==null?void 0:r.value)??{},i.value))})}return{props:l,provideSubDefaults:o}}const Fl=["sm","md","lg","xl","xxl"],Oi=Symbol.for("vuetify:display"),Bc={mobileBreakpoint:"lg",thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}},L5=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Bc;return Ra(Bc,e)};function Hc(e){return Ke&&!e?window.innerWidth:typeof e=="object"&&e.clientWidth||0}function Dc(e){return Ke&&!e?window.innerHeight:typeof e=="object"&&e.clientHeight||0}function Gc(e){const a=Ke&&!e?window.navigator.userAgent:"ssr";function t(f){return!!a.match(f)}const n=t(/android/i),s=t(/iphone|ipad|ipod/i),l=t(/cordova/i),i=t(/electron/i),o=t(/chrome/i),r=t(/edge/i),c=t(/firefox/i),d=t(/opera/i),u=t(/win/i),h=t(/mac/i),g=t(/linux/i);return{android:n,ios:s,cordova:l,electron:i,chrome:o,edge:r,firefox:c,opera:d,win:u,mac:h,linux:g,touch:Uv,ssr:a==="ssr"}}function A5(e,a){const{thresholds:t,mobileBreakpoint:n}=L5(e),s=re(Dc(a)),l=re(Gc(a)),i=Ma({}),o=re(Hc(a));function r(){s.value=Dc(),o.value=Hc()}function c(){r(),l.value=Gc()}return Da(()=>{const d=o.value<t.sm,u=o.value<t.md&&!d,h=o.value<t.lg&&!(u||d),g=o.value<t.xl&&!(h||u||d),f=o.value<t.xxl&&!(g||h||u||d),v=o.value>=t.xxl,k=d?"xs":u?"sm":h?"md":g?"lg":f?"xl":"xxl",b=typeof n=="number"?n:t[n],p=o.value<b;i.xs=d,i.sm=u,i.md=h,i.lg=g,i.xl=f,i.xxl=v,i.smAndUp=!d,i.mdAndUp=!(d||u),i.lgAndUp=!(d||u||h),i.xlAndUp=!(d||u||h||g),i.smAndDown=!(h||g||f||v),i.mdAndDown=!(g||f||v),i.lgAndDown=!(f||v),i.xlAndDown=!v,i.name=k,i.height=s.value,i.width=o.value,i.mobile=p,i.mobileBreakpoint=n,i.platform=l.value,i.thresholds=t}),Ke&&window.addEventListener("resize",r,{passive:!0}),{...Ho(i),update:c,ssr:!!a}}function gn(){const e=He(Oi);if(!e)throw new Error("Could not find Vuetify display injection");return e}const C5={collapse:"mdi-chevron-up",complete:"mdi-check",cancel:"mdi-close-circle",close:"mdi-close",delete:"mdi-close-circle",clear:"mdi-close-circle",success:"mdi-check-circle",info:"mdi-information",warning:"mdi-alert-circle",error:"mdi-close-circle",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked",checkboxOff:"mdi-checkbox-blank-outline",checkboxIndeterminate:"mdi-minus-box",delimiter:"mdi-circle",sortAsc:"mdi-arrow-up",sortDesc:"mdi-arrow-down",expand:"mdi-chevron-down",menu:"mdi-menu",subgroup:"mdi-menu-down",dropdown:"mdi-menu-down",radioOn:"mdi-radiobox-marked",radioOff:"mdi-radiobox-blank",edit:"mdi-pencil",ratingEmpty:"mdi-star-outline",ratingFull:"mdi-star",ratingHalf:"mdi-star-half-full",loading:"mdi-cached",first:"mdi-page-first",last:"mdi-page-last",unfold:"mdi-unfold-more-horizontal",file:"mdi-paperclip",plus:"mdi-plus",minus:"mdi-minus",calendar:"mdi-calendar"},I5={component:e=>mt(tr,{...e,class:"mdi"})},be=[String,Function,Object,Array],zi=Symbol.for("vuetify:icons"),ql=P({icon:{type:be},tag:{type:String,required:!0}},"icon"),_i=j()({name:"VComponentIcon",props:ql(),setup(e,a){let{slots:t}=a;return()=>{const n=e.icon;return m(e.tag,null,{default:()=>{var s;return[e.icon?m(n,null,null):(s=t.default)==null?void 0:s.call(t)]}})}}}),ar=za({name:"VSvgIcon",inheritAttrs:!1,props:ql(),setup(e,a){let{attrs:t}=a;return()=>m(e.tag,ie(t,{style:null}),{default:()=>[m("svg",{class:"v-icon__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true"},[Array.isArray(e.icon)?e.icon.map(n=>Array.isArray(n)?m("path",{d:n[0],"fill-opacity":n[1]},null):m("path",{d:n},null)):m("path",{d:e.icon},null)])]})}}),T5=za({name:"VLigatureIcon",props:ql(),setup(e){return()=>m(e.tag,null,{default:()=>[e.icon]})}}),tr=za({name:"VClassIcon",props:ql(),setup(e){return()=>m(e.tag,{class:e.icon},null)}}),B5={svg:{component:ar},class:{component:tr}};function H5(e){return Ra({defaultSet:"mdi",sets:{...B5,mdi:I5},aliases:{...C5,vuetify:["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z",["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z",.6]],"vuetify-outline":"svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"}},e)}const D5=e=>{const a=He(zi);if(!a)throw new Error("Missing Vuetify Icons provide!");return{iconData:y(()=>{var r;const n=ia(e);if(!n)return{component:_i};let s=n;if(typeof s=="string"&&(s=s.trim(),s.startsWith("$")&&(s=(r=a.aliases)==null?void 0:r[s.slice(1)])),!s)throw new Error(`Could not find aliased icon "${n}"`);if(Array.isArray(s))return{component:ar,icon:s};if(typeof s!="string")return{component:_i,icon:s};const l=Object.keys(a.sets).find(c=>typeof s=="string"&&s.startsWith(`${c}:`)),i=l?s.slice(l.length+1):s;return{component:a.sets[l??a.defaultSet].component,icon:i}})}},G5={badge:"Badge",close:"Close",dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},dateRangeInput:{divider:"to"},datePicker:{ok:"OK",cancel:"Cancel",range:{title:"Select dates",header:"Enter dates"},title:"Select date",header:"Enter date",input:{placeholder:"Enter date"}},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Please enter OTP character {0}"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},timePicker:{am:"AM",pm:"PM"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Go to page {0}",currentPage:"Page {0}, Current page",first:"First page",last:"Last page"}},stepper:{next:"Next",prev:"Previous"},rating:{ariaLabel:{item:"Rating {0} of {1}"}},loading:"Loading...",infiniteScroll:{loadMore:"Load more",empty:"No more"}},E5={af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1};function xe(e,a,t){let n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:u=>u,s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:u=>u;const l=oa("useProxiedModel"),i=se(e[a]!==void 0?e[a]:t),o=cn(a),c=y(o!==a?()=>{var u,h,g,f;return e[a],!!(((u=l.vnode.props)!=null&&u.hasOwnProperty(a)||(h=l.vnode.props)!=null&&h.hasOwnProperty(o))&&((g=l.vnode.props)!=null&&g.hasOwnProperty(`onUpdate:${a}`)||(f=l.vnode.props)!=null&&f.hasOwnProperty(`onUpdate:${o}`)))}:()=>{var u,h;return e[a],!!((u=l.vnode.props)!=null&&u.hasOwnProperty(a)&&((h=l.vnode.props)!=null&&h.hasOwnProperty(`onUpdate:${a}`)))});St(()=>!c.value,()=>{de(()=>e[a],u=>{i.value=u})});const d=y({get(){const u=e[a];return n(c.value?u:i.value)},set(u){const h=s(u),g=Ce(c.value?e[a]:i.value);g===h||n(g)===u||(i.value=h,l==null||l.emit(`update:${a}`,h))}});return Object.defineProperty(d,"externalValue",{get:()=>c.value?e[a]:i.value}),d}const Ec="$vuetify.",Fc=(e,a)=>e.replace(/\{(\d+)\}/g,(t,n)=>String(a[+n])),th=(e,a,t)=>function(n){for(var s=arguments.length,l=new Array(s>1?s-1:0),i=1;i<s;i++)l[i-1]=arguments[i];if(!n.startsWith(Ec))return Fc(n,l);const o=n.replace(Ec,""),r=e.value&&t.value[e.value],c=a.value&&t.value[a.value];let d=Gi(r,o,null);return d||(`${n}${e.value}`,d=Gi(c,o,null)),d||(d=n),typeof d!="string"&&(d=n),Fc(d,l)};function nh(e,a){return(t,n)=>new Intl.NumberFormat([e.value,a.value],n).format(t)}function ci(e,a,t){const n=xe(e,a,e[a]??t.value);return n.value=e[a]??t.value,de(t,s=>{e[a]==null&&(n.value=t.value)}),n}function sh(e){return a=>{const t=ci(a,"locale",e.current),n=ci(a,"fallback",e.fallback),s=ci(a,"messages",e.messages);return{name:"vuetify",current:t,fallback:n,messages:s,t:th(t,n,s),n:nh(t,n),provide:sh({current:t,fallback:n,messages:s})}}}function F5(e){const a=re((e==null?void 0:e.locale)??"en"),t=re((e==null?void 0:e.fallback)??"en"),n=se({en:G5,...e==null?void 0:e.messages});return{name:"vuetify",current:a,fallback:t,messages:n,t:th(a,t,n),n:nh(a,t),provide:sh({current:a,fallback:t,messages:n})}}const qn=Symbol.for("vuetify:locale");function q5(e){return e.name!=null}function R5(e){const a=e!=null&&e.adapter&&q5(e==null?void 0:e.adapter)?e==null?void 0:e.adapter:F5(e),t=N5(a,e);return{...a,...t}}function _a(){const e=He(qn);if(!e)throw new Error("[Vuetify] Could not find injected locale instance");return e}function P5(e){const a=He(qn);if(!a)throw new Error("[Vuetify] Could not find injected locale instance");const t=a.provide(e),n=O5(t,a.rtl,e),s={...t,...n};return je(qn,s),s}function N5(e,a){const t=se((a==null?void 0:a.rtl)??E5),n=y(()=>t.value[e.current.value]??!1);return{isRtl:n,rtl:t,rtlClasses:y(()=>`v-locale--is-${n.value?"rtl":"ltr"}`)}}function O5(e,a,t){const n=y(()=>t.rtl??a.value[e.current.value]??!1);return{isRtl:n,rtl:a,rtlClasses:y(()=>`v-locale--is-${n.value?"rtl":"ltr"}`)}}function ra(){const e=He(qn);if(!e)throw new Error("[Vuetify] Could not find injected rtl instance");return{isRtl:e.isRtl,rtlClasses:e.rtlClasses}}const Mn=2.4,qc=.2126729,Rc=.7151522,Pc=.072175,z5=.55,_5=.58,W5=.57,V5=.62,Ys=.03,Nc=1.45,Q5=5e-4,U5=1.25,K5=1.25,Oc=.078,zc=12.82051282051282,Zs=.06,_c=.001;function Wc(e,a){const t=(e.r/255)**Mn,n=(e.g/255)**Mn,s=(e.b/255)**Mn,l=(a.r/255)**Mn,i=(a.g/255)**Mn,o=(a.b/255)**Mn;let r=t*qc+n*Rc+s*Pc,c=l*qc+i*Rc+o*Pc;if(r<=Ys&&(r+=(Ys-r)**Nc),c<=Ys&&(c+=(Ys-c)**Nc),Math.abs(c-r)<Q5)return 0;let d;if(c>r){const u=(c**z5-r**_5)*U5;d=u<_c?0:u<Oc?u-u*zc*Zs:u-Zs}else{const u=(c**V5-r**W5)*K5;d=u>-_c?0:u>-Oc?u-u*zc*Zs:u+Zs}return d*100}const Ts=Symbol.for("vuetify:theme"),De=P({theme:String},"theme"),ss={defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#6200EE","primary-darken-1":"#3700B3",secondary:"#03DAC6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-variant":"#BDBDBD","on-surface-variant":"#424242",primary:"#BB86FC","primary-darken-1":"#3700B3",secondary:"#03DAC5","secondary-darken-1":"#03DAC5",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}}};function J5(){var t,n;let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ss;if(!e)return{...ss,isDisabled:!0};const a={};for(const[s,l]of Object.entries(e.themes??{})){const i=l.dark||s==="dark"?(t=ss.themes)==null?void 0:t.dark:(n=ss.themes)==null?void 0:n.light;a[s]=Ra(i,l)}return Ra(ss,{...e,themes:a})}function $5(e){const a=J5(e),t=se(a.defaultTheme),n=se(a.themes),s=y(()=>{const d={};for(const[u,h]of Object.entries(n.value)){const g=d[u]={...h,colors:{...h.colors}};if(a.variations)for(const f of a.variations.colors){const v=g.colors[f];if(v)for(const k of["lighten","darken"]){const b=k==="lighten"?g5:f5;for(const p of bt(a.variations[k],1))g.colors[`${f}-${k}-${p}`]=Yu(b(wt(v),p))}}for(const f of Object.keys(g.colors)){if(/^on-[a-z]/.test(f)||g.colors[`on-${f}`])continue;const v=`on-${f}`,k=wt(g.colors[f]),b=Math.abs(Wc(wt(0),k)),p=Math.abs(Wc(wt(16777215),k));g.colors[v]=p>Math.min(b,50)?"#fff":"#000"}}return d}),l=y(()=>s.value[t.value]),i=y(()=>{const d=[];l.value.dark&&Yt(d,":root",["color-scheme: dark"]),Yt(d,":root",Vc(l.value));for(const[f,v]of Object.entries(s.value))Yt(d,`.v-theme--${f}`,[`color-scheme: ${v.dark?"dark":"normal"}`,...Vc(v)]);const u=[],h=[],g=new Set(Object.values(s.value).flatMap(f=>Object.keys(f.colors)));for(const f of g)/^on-[a-z]/.test(f)?Yt(h,`.${f}`,[`color: rgb(var(--v-theme-${f})) !important`]):(Yt(u,`.bg-${f}`,[`--v-theme-overlay-multiplier: var(--v-theme-${f}-overlay-multiplier)`,`background-color: rgb(var(--v-theme-${f})) !important`,`color: rgb(var(--v-theme-on-${f})) !important`]),Yt(h,`.text-${f}`,[`color: rgb(var(--v-theme-${f})) !important`]),Yt(h,`.border-${f}`,[`--v-border-color: var(--v-theme-${f})`]));return d.push(...u,...h),d.map((f,v)=>v===0?f:`    ${f}`).join("")});function o(){return{style:[{children:i.value,id:"vuetify-theme-stylesheet",nonce:a.cspNonce||!1}]}}function r(d){if(a.isDisabled)return;const u=d._context.provides.usehead;if(u)if(u.push){const g=u.push(o);Ke&&de(i,()=>{g.patch(o)})}else Ke?(u.addHeadObjs(y(o)),Da(()=>u.updateDOM())):u.addHeadObjs(o());else{let f=function(){if(typeof document<"u"&&!g){const v=document.createElement("style");v.type="text/css",v.id="vuetify-theme-stylesheet",a.cspNonce&&v.setAttribute("nonce",a.cspNonce),g=v,document.head.appendChild(g)}g&&(g.innerHTML=i.value)};var h=f;let g=Ke?document.getElementById("vuetify-theme-stylesheet"):null;Ke?de(i,f,{immediate:!0}):f()}}const c=y(()=>a.isDisabled?void 0:`v-theme--${t.value}`);return{install:r,isDisabled:a.isDisabled,name:t,themes:n,current:l,computedThemes:s,themeClasses:c,styles:i,global:{name:t,current:l}}}function qe(e){oa("provideTheme");const a=He(Ts,null);if(!a)throw new Error("Could not find Vuetify theme injection");const t=y(()=>e.theme??(a==null?void 0:a.name.value)),n=y(()=>a.isDisabled?void 0:`v-theme--${t.value}`),s={...a,name:t,themeClasses:n};return je(Ts,s),s}function lh(){oa("useTheme");const e=He(Ts,null);if(!e)throw new Error("Could not find Vuetify theme injection");return e}function Yt(e,a,t){e.push(`${a} {
`,...t.map(n=>`  ${n};
`),`}
`)}function Vc(e){const a=e.dark?2:1,t=e.dark?1:2,n=[];for(const[s,l]of Object.entries(e.colors)){const i=wt(l);n.push(`--v-theme-${s}: ${i.r},${i.g},${i.b}`),s.startsWith("on-")||n.push(`--v-theme-${s}-overlay-multiplier: ${Ni(l)>.18?a:t}`)}for(const[s,l]of Object.entries(e.variables)){const i=typeof l=="string"&&l.startsWith("#")?wt(l):void 0,o=i?`${i.r}, ${i.g}, ${i.b}`:void 0;n.push(`--v-${s}: ${o??l}`)}return n}const Wi={"001":1,AD:1,AE:6,AF:6,AG:0,AI:1,AL:1,AM:1,AN:1,AR:1,AS:0,AT:1,AU:1,AX:1,AZ:1,BA:1,BD:0,BE:1,BG:1,BH:6,BM:1,BN:1,BR:0,BS:0,BT:0,BW:0,BY:1,BZ:0,CA:0,CH:1,CL:1,CM:1,CN:1,CO:0,CR:1,CY:1,CZ:1,DE:1,DJ:6,DK:1,DM:0,DO:0,DZ:6,EC:1,EE:1,EG:6,ES:1,ET:0,FI:1,FJ:1,FO:1,FR:1,GB:1,"GB-alt-variant":0,GE:1,GF:1,GP:1,GR:1,GT:0,GU:0,HK:0,HN:0,HR:1,HU:1,ID:0,IE:1,IL:0,IN:0,IQ:6,IR:6,IS:1,IT:1,JM:0,JO:6,JP:0,KE:0,KG:1,KH:0,KR:0,KW:6,KZ:1,LA:0,LB:1,LI:1,LK:1,LT:1,LU:1,LV:1,LY:6,MC:1,MD:1,ME:1,MH:0,MK:1,MM:0,MN:1,MO:0,MQ:1,MT:0,MV:5,MX:0,MY:1,MZ:0,NI:0,NL:1,NO:1,NP:0,NZ:1,OM:6,PA:0,PE:0,PH:0,PK:0,PL:1,PR:0,PT:0,PY:0,QA:6,RE:1,RO:1,RS:1,RU:1,SA:0,SD:6,SE:1,SG:0,SI:1,SK:1,SM:1,SV:0,SY:6,TH:0,TJ:1,TM:1,TR:1,TT:0,TW:0,UA:1,UM:0,US:0,UY:1,UZ:1,VA:1,VE:0,VI:0,VN:1,WS:0,XK:1,YE:0,ZA:0,ZW:0};function j5(e,a){const t=[];let n=[];const s=ih(e),l=oh(e),i=s.getDay()-Wi[a.slice(-2).toUpperCase()],o=l.getDay()-Wi[a.slice(-2).toUpperCase()];for(let r=0;r<i;r++){const c=new Date(s);c.setDate(c.getDate()-(i-r)),n.push(c)}for(let r=1;r<=l.getDate();r++){const c=new Date(e.getFullYear(),e.getMonth(),r);n.push(c),n.length===7&&(t.push(n),n=[])}for(let r=1;r<7-o;r++){const c=new Date(l);c.setDate(c.getDate()+r),n.push(c)}return t.push(n),t}function ih(e){return new Date(e.getFullYear(),e.getMonth(),1)}function oh(e){return new Date(e.getFullYear(),e.getMonth()+1,0)}function Y5(e){const a=e.split("-").map(Number);return new Date(a[0],a[1]-1,a[2])}const Z5=/([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))/;function X5(e){if(e==null)return new Date;if(e instanceof Date)return e;if(typeof e=="string"){let a;if(Z5.test(e))return Y5(e);if(a=Date.parse(e),!isNaN(a))return new Date(a)}return null}const Qc=new Date(2e3,0,2);function ep(e){const a=Wi[e.slice(-2).toUpperCase()];return bt(7).map(t=>{const n=new Date(Qc);return n.setDate(Qc.getDate()+a+t),new Intl.DateTimeFormat(e,{weekday:"narrow"}).format(n)})}function ap(e,a,t){const n=new Date(e);let s={};switch(a){case"fullDateWithWeekday":s={weekday:"long",day:"numeric",month:"long",year:"numeric"};break;case"normalDateWithWeekday":s={weekday:"short",day:"numeric",month:"short"};break;case"keyboardDate":s={};break;case"monthAndDate":s={month:"long",day:"numeric"};break;case"monthAndYear":s={month:"long",year:"numeric"};break;case"dayOfMonth":s={day:"numeric"};break;default:s={timeZone:"UTC",timeZoneName:"short"}}return new Intl.DateTimeFormat(t,s).format(n)}function tp(e,a){const t=new Date(e);return t.setDate(t.getDate()+a),t}function np(e,a){const t=new Date(e);return t.setMonth(t.getMonth()+a),t}function sp(e){return e.getFullYear()}function lp(e){return e.getMonth()}function ip(e){return new Date(e.getFullYear(),0,1)}function op(e){return new Date(e.getFullYear(),11,31)}function rp(e,a){return Vi(e,a[0])&&dp(e,a[1])}function cp(e){const a=new Date(e);return a instanceof Date&&!isNaN(a.getTime())}function Vi(e,a){return e.getTime()>a.getTime()}function dp(e,a){return e.getTime()<a.getTime()}function Uc(e,a){return e.getTime()===a.getTime()}function up(e,a){return e.getDate()===a.getDate()&&e.getMonth()===a.getMonth()&&e.getFullYear()===a.getFullYear()}function hp(e,a){return e.getMonth()===a.getMonth()&&e.getFullYear()===a.getFullYear()}function mp(e,a,t){const n=new Date(e),s=new Date(a);return t==="month"?n.getMonth()-s.getMonth()+(n.getFullYear()-s.getFullYear())*12:Math.floor((n.getTime()-s.getTime())/(1e3*60*60*24))}function gp(e,a){const t=new Date(e);return t.setFullYear(a),t}class fp{constructor(a){this.locale=a.locale}date(a){return X5(a)}toJsDate(a){return a}addDays(a,t){return tp(a,t)}addMonths(a,t){return np(a,t)}getWeekArray(a){return j5(a,this.locale)}startOfMonth(a){return ih(a)}endOfMonth(a){return oh(a)}format(a,t){return ap(a,t,this.locale)}isEqual(a,t){return Uc(a,t)}isValid(a){return cp(a)}isWithinRange(a,t){return rp(a,t)}isAfter(a,t){return Vi(a,t)}isBefore(a,t){return!Vi(a,t)&&!Uc(a,t)}isSameDay(a,t){return up(a,t)}isSameMonth(a,t){return hp(a,t)}setYear(a,t){return gp(a,t)}getDiff(a,t,n){return mp(a,t,n)}getWeekdays(){return ep(this.locale)}getYear(a){return sp(a)}getMonth(a){return lp(a)}startOfYear(a){return ip(a)}endOfYear(a){return op(a)}}const Kc=Symbol.for("vuetify:date-adapter");function vp(e){return Ra({adapter:fp,locale:{af:"af-ZA",bg:"bg-BG",ca:"ca-ES",ckb:"",cs:"",de:"de-DE",el:"el-GR",en:"en-US",et:"et-EE",fa:"fa-IR",fi:"fi-FI",hr:"hr-HR",hu:"hu-HU",he:"he-IL",id:"id-ID",it:"it-IT",ja:"ja-JP",ko:"ko-KR",lv:"lv-LV",lt:"lt-LT",nl:"nl-NL",no:"nn-NO",pl:"pl-PL",pt:"pt-PT",ro:"ro-RO",ru:"ru-RU",sk:"sk-SK",sl:"sl-SI",srCyrl:"sr-SP",srLatn:"sr-SP",sv:"sv-SE",th:"th-TH",tr:"tr-TR",az:"az-AZ",uk:"uk-UA",vi:"vi-VN",zhHans:"zh-CN",zhHant:"zh-TW"}},e)}function ut(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"content";const t=se(),n=se();if(Ke){const s=new ResizeObserver(l=>{e==null||e(l,s),l.length&&(a==="content"?n.value=l[0].contentRect:n.value=l[0].target.getBoundingClientRect())});xa(()=>{s.disconnect()}),de(t,(l,i)=>{i&&(s.unobserve(Fi(i)),n.value=void 0),l&&s.observe(Fi(l))},{flush:"post"})}return{resizeRef:t,contentRect:Fs(n)}}const yl=Symbol.for("vuetify:layout"),rh=Symbol.for("vuetify:layout-item"),Jc=1e3,ch=P({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Qn=P({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function pp(){const e=He(yl);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Un(e){const a=He(yl);if(!a)throw new Error("[Vuetify] Could not find injected layout");const t=e.id??`layout-item-${ka()}`,n=oa("useLayoutItem");je(rh,{id:t});const s=re(!1);hu(()=>s.value=!0),uu(()=>s.value=!1);const{layoutItemStyles:l,layoutItemScrimStyles:i}=a.register(n,{...e,active:y(()=>s.value?!1:e.active.value),id:t});return xa(()=>a.unregister(t)),{layoutItemStyles:l,layoutRect:a.layoutRect,layoutItemScrimStyles:i}}const yp=(e,a,t,n)=>{let s={top:0,left:0,right:0,bottom:0};const l=[{id:"",layer:{...s}}];for(const i of e){const o=a.get(i),r=t.get(i),c=n.get(i);if(!o||!r||!c)continue;const d={...s,[o.value]:parseInt(s[o.value],10)+(c.value?parseInt(r.value,10):0)};l.push({id:i,layer:d}),s=d}return l};function dh(e){const a=He(yl,null),t=y(()=>a?a.rootZIndex.value-100:Jc),n=se([]),s=Ma(new Map),l=Ma(new Map),i=Ma(new Map),o=Ma(new Map),r=Ma(new Map),{resizeRef:c,contentRect:d}=ut(),u=y(()=>{const B=new Map,I=e.overlaps??[];for(const x of I.filter(L=>L.includes(":"))){const[L,T]=x.split(":");if(!n.value.includes(L)||!n.value.includes(T))continue;const E=s.get(L),D=s.get(T),q=l.get(L),U=l.get(T);!E||!D||!q||!U||(B.set(T,{position:E.value,amount:parseInt(q.value,10)}),B.set(L,{position:D.value,amount:-parseInt(U.value,10)}))}return B}),h=y(()=>{const B=[...new Set([...i.values()].map(x=>x.value))].sort((x,L)=>x-L),I=[];for(const x of B){const L=n.value.filter(T=>{var E;return((E=i.get(T))==null?void 0:E.value)===x});I.push(...L)}return yp(I,s,l,o)}),g=y(()=>!Array.from(r.values()).some(B=>B.value)),f=y(()=>h.value[h.value.length-1].layer),v=y(()=>({"--v-layout-left":ue(f.value.left),"--v-layout-right":ue(f.value.right),"--v-layout-top":ue(f.value.top),"--v-layout-bottom":ue(f.value.bottom),...g.value?void 0:{transition:"none"}})),k=y(()=>h.value.slice(1).map((B,I)=>{let{id:x}=B;const{layer:L}=h.value[I],T=l.get(x),E=s.get(x);return{id:x,...L,size:Number(T.value),position:E.value}})),b=B=>k.value.find(I=>I.id===B),p=oa("createLayout"),w=re(!1);ya(()=>{w.value=!0}),je(yl,{register:(B,I)=>{let{id:x,order:L,position:T,layoutSize:E,elementSize:D,active:q,disableTransitions:U,absolute:_}=I;i.set(x,L),s.set(x,T),l.set(x,E),o.set(x,q),U&&r.set(x,U);const K=gs(rh,p==null?void 0:p.vnode).indexOf(B);K>-1?n.value.splice(K,0,x):n.value.push(x);const z=y(()=>k.value.findIndex(he=>he.id===x)),ee=y(()=>t.value+h.value.length*2-z.value*2),Q=y(()=>{const he=T.value==="left"||T.value==="right",we=T.value==="right",ke=T.value==="bottom",Ie={[T.value]:0,zIndex:ee.value,transform:`translate${he?"X":"Y"}(${(q.value?0:-110)*(we||ke?-1:1)}%)`,position:_.value||t.value!==Jc?"absolute":"fixed",...g.value?void 0:{transition:"none"}};if(!w.value)return Ie;const $=k.value[z.value];if(!$)throw new Error(`[Vuetify] Could not find layout item "${x}"`);const R=u.value.get(x);return R&&($[R.position]+=R.amount),{...Ie,height:he?`calc(100% - ${$.top}px - ${$.bottom}px)`:D.value?`${D.value}px`:void 0,left:we?void 0:`${$.left}px`,right:we?`${$.right}px`:void 0,top:T.value!=="bottom"?`${$.top}px`:void 0,bottom:T.value!=="top"?`${$.bottom}px`:void 0,width:he?D.value?`${D.value}px`:void 0:`calc(100% - ${$.left}px - ${$.right}px)`}}),te=y(()=>({zIndex:ee.value-1}));return{layoutItemStyles:Q,layoutItemScrimStyles:te,zIndex:ee}},unregister:B=>{i.delete(B),s.delete(B),l.delete(B),o.delete(B),r.delete(B),n.value=n.value.filter(I=>I!==B)},mainRect:f,mainStyles:v,getLayoutItem:b,items:k,layoutRect:d,rootZIndex:t});const C=y(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),H=y(()=>({zIndex:t.value,position:a?"relative":void 0,overflow:a?"hidden":void 0}));return{layoutClasses:C,layoutStyles:H,getLayoutItem:b,items:k,layoutRect:d,layoutRef:c}}function uh(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{blueprint:a,...t}=e,n=Ra(a,t),{aliases:s={},components:l={},directives:i={}}=n,o=M5(n.defaults),r=A5(n.display,n.ssr),c=$5(n.theme),d=H5(n.icons),u=R5(n.locale),h=vp(n.date);return{install:f=>{for(const v in i)f.directive(v,i[v]);for(const v in l)f.component(v,l[v]);for(const v in s)f.component(v,za({...s[v],name:v,aliasName:s[v].name}));if(c.install(f),f.provide(Is,o),f.provide(Oi,r),f.provide(Ts,c),f.provide(zi,d),f.provide(qn,u),f.provide(Kc,h),Ke&&n.ssr)if(f.$nuxt)f.$nuxt.hook("app:suspense:resolve",()=>{r.update()});else{const{mount:v}=f;f.mount=function(){const k=v(...arguments);return ze(()=>r.update()),f.mount=v,k}}ka.reset(),f.mixin({computed:{$vuetify(){return Ma({defaults:xn.call(this,Is),display:xn.call(this,Oi),theme:xn.call(this,Ts),icons:xn.call(this,zi),locale:xn.call(this,qn),date:xn.call(this,Kc)})}}})},defaults:o,display:r,theme:c,icons:d,locale:u,date:h}}const kp="3.3.12";uh.version=kp;function xn(e){var n,s;const a=this.$,t=((n=a.parent)==null?void 0:n.provides)??((s=a.vnode.appContext)==null?void 0:s.provides);if(t&&e in t)return t[e]}const bp=P({...ce(),...ch({fullHeight:!0}),...De()},"VApp"),hh=j()({name:"VApp",props:bp(),setup(e,a){let{slots:t}=a;const n=qe(e),{layoutClasses:s,layoutStyles:l,getLayoutItem:i,items:o,layoutRef:r}=dh(e),{rtlClasses:c}=ra();return ae(()=>{var d;return m("div",{ref:r,class:["v-application",n.themeClasses.value,s.value,c.value,e.class],style:[l.value,e.style]},[m("div",{class:"v-application__wrap"},[(d=t.default)==null?void 0:d.call(t)])])}),{getLayoutItem:i,items:o,theme:n}}});const Le=P({tag:{type:String,default:"div"}},"tag"),mh=P({text:String,...ce(),...Le()},"VToolbarTitle"),nr=j()({name:"VToolbarTitle",props:mh(),setup(e,a){let{slots:t}=a;return ae(()=>{const n=!!(t.default||t.text||e.text);return m(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var s;return[n&&m("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(s=t.default)==null?void 0:s.call(t)])]}})}),{}}}),wp=P({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function Ea(e,a,t){return j()({name:e,props:wp({mode:t,origin:a}),setup(n,s){let{slots:l}=s;const i={onBeforeEnter(o){n.origin&&(o.style.transformOrigin=n.origin)},onLeave(o){if(n.leaveAbsolute){const{offsetTop:r,offsetLeft:c,offsetWidth:d,offsetHeight:u}=o;o._transitionInitialStyles={position:o.style.position,top:o.style.top,left:o.style.left,width:o.style.width,height:o.style.height},o.style.position="absolute",o.style.top=`${r}px`,o.style.left=`${c}px`,o.style.width=`${d}px`,o.style.height=`${u}px`}n.hideOnLeave&&o.style.setProperty("display","none","important")},onAfterLeave(o){if(n.leaveAbsolute&&(o!=null&&o._transitionInitialStyles)){const{position:r,top:c,left:d,width:u,height:h}=o._transitionInitialStyles;delete o._transitionInitialStyles,o.style.position=r||"",o.style.top=c||"",o.style.left=d||"",o.style.width=u||"",o.style.height=h||""}}};return()=>{const o=n.group?Gv:dt;return mt(o,{name:n.disabled?"":e,css:!n.disabled,...n.group?void 0:{mode:n.mode},...n.disabled?{}:i},l.default)}}})}function gh(e,a){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return j()({name:e,props:{mode:{type:String,default:t},disabled:Boolean},setup(n,s){let{slots:l}=s;return()=>mt(dt,{name:n.disabled?"":e,css:!n.disabled,...n.disabled?{}:a},l.default)}})}function fh(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const t=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",n=Oa(`offset-${t}`);return{onBeforeEnter(i){i._parent=i.parentNode,i._initialStyle={transition:i.style.transition,overflow:i.style.overflow,[t]:i.style[t]}},onEnter(i){const o=i._initialStyle;i.style.setProperty("transition","none","important"),i.style.overflow="hidden";const r=`${i[n]}px`;i.style[t]="0",i.offsetHeight,i.style.transition=o.transition,e&&i._parent&&i._parent.classList.add(e),requestAnimationFrame(()=>{i.style[t]=r})},onAfterEnter:l,onEnterCancelled:l,onLeave(i){i._initialStyle={transition:"",overflow:i.style.overflow,[t]:i.style[t]},i.style.overflow="hidden",i.style[t]=`${i[n]}px`,i.offsetHeight,requestAnimationFrame(()=>i.style[t]="0")},onAfterLeave:s,onLeaveCancelled:s};function s(i){e&&i._parent&&i._parent.classList.remove(e),l(i)}function l(i){const o=i._initialStyle[t];i.style.overflow=i._initialStyle.overflow,o!=null&&(i.style[t]=o),delete i._initialStyle}}const Mp=P({target:Object},"v-dialog-transition"),Rl=j()({name:"VDialogTransition",props:Mp(),setup(e,a){let{slots:t}=a;const n={onBeforeEnter(s){s.style.pointerEvents="none",s.style.visibility="hidden"},async onEnter(s,l){var h;await new Promise(g=>requestAnimationFrame(g)),await new Promise(g=>requestAnimationFrame(g)),s.style.visibility="";const{x:i,y:o,sx:r,sy:c,speed:d}=jc(e.target,s),u=sn(s,[{transform:`translate(${i}px, ${o}px) scale(${r}, ${c})`,opacity:0},{}],{duration:225*d,easing:p5});(h=$c(s))==null||h.forEach(g=>{sn(g,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*d,easing:Cs})}),u.finished.then(()=>l())},onAfterEnter(s){s.style.removeProperty("pointer-events")},onBeforeLeave(s){s.style.pointerEvents="none"},async onLeave(s,l){var h;await new Promise(g=>requestAnimationFrame(g));const{x:i,y:o,sx:r,sy:c,speed:d}=jc(e.target,s);sn(s,[{},{transform:`translate(${i}px, ${o}px) scale(${r}, ${c})`,opacity:0}],{duration:125*d,easing:y5}).finished.then(()=>l()),(h=$c(s))==null||h.forEach(g=>{sn(g,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*d,easing:Cs})})},onAfterLeave(s){s.style.removeProperty("pointer-events")}};return()=>e.target?m(dt,ie({name:"dialog-transition"},n,{css:!1}),t):m(dt,{name:"dialog-transition"},t)}});function $c(e){var t;const a=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return a&&[...a]}function jc(e,a){const t=e.getBoundingClientRect(),n=$o(a),[s,l]=getComputedStyle(a).transformOrigin.split(" ").map(b=>parseFloat(b)),[i,o]=getComputedStyle(a).getPropertyValue("--v-overlay-anchor-origin").split(" ");let r=t.left+t.width/2;i==="left"||o==="left"?r-=t.width/2:(i==="right"||o==="right")&&(r+=t.width/2);let c=t.top+t.height/2;i==="top"||o==="top"?c-=t.height/2:(i==="bottom"||o==="bottom")&&(c+=t.height/2);const d=t.width/n.width,u=t.height/n.height,h=Math.max(1,d,u),g=d/h||0,f=u/h||0,v=n.width*n.height/(window.innerWidth*window.innerHeight),k=v>.12?Math.min(1.5,(v-.12)*10+1):1;return{x:r-(s+n.left),y:c-(l+n.top),sx:g,sy:f,speed:k}}const xp=Ea("fab-transition","center center","out-in"),Sp=Ea("dialog-bottom-transition"),Lp=Ea("dialog-top-transition"),Qi=Ea("fade-transition"),vh=Ea("scale-transition"),Ap=Ea("scroll-x-transition"),Cp=Ea("scroll-x-reverse-transition"),Ip=Ea("scroll-y-transition"),Tp=Ea("scroll-y-reverse-transition"),Bp=Ea("slide-x-transition"),Hp=Ea("slide-x-reverse-transition"),sr=Ea("slide-y-transition"),Dp=Ea("slide-y-reverse-transition"),Pl=gh("expand-transition",fh()),lr=gh("expand-x-transition",fh("",!0)),Gp=P({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),Ne=j(!1)({name:"VDefaultsProvider",props:Gp(),setup(e,a){let{slots:t}=a;const{defaults:n,disabled:s,reset:l,root:i,scoped:o}=Ho(e);return Xe(n,{reset:l,root:i,scoped:o,disabled:s}),()=>{var r;return(r=t.default)==null?void 0:r.call(t)}}});const Wa=P({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function Va(e){return{dimensionStyles:y(()=>({height:ue(e.height),maxHeight:ue(e.maxHeight),maxWidth:ue(e.maxWidth),minHeight:ue(e.minHeight),minWidth:ue(e.minWidth),width:ue(e.width)}))}}function Ep(e){return{aspectStyles:y(()=>{const a=Number(e.aspectRatio);return a?{paddingBottom:String(1/a*100)+"%"}:void 0})}}const ph=P({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...ce(),...Wa()},"VResponsive"),Ui=j()({name:"VResponsive",props:ph(),setup(e,a){let{slots:t}=a;const{aspectStyles:n}=Ep(e),{dimensionStyles:s}=Va(e);return ae(()=>{var l;return m("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[s.value,e.style]},[m("div",{class:"v-responsive__sizer",style:n.value},null),(l=t.additional)==null?void 0:l.call(t),t.default&&m("div",{class:["v-responsive__content",e.contentClass]},[t.default()])])}),{}}}),Bt=P({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),Ya=(e,a)=>{let{slots:t}=a;const{transition:n,disabled:s,...l}=e,{component:i=dt,...o}=typeof n=="object"?n:{};return mt(i,ie(typeof n=="string"?{name:s?"":n}:o,l,{disabled:s}),t)};function Fp(e,a){if(!Qo)return;const t=a.modifiers||{},n=a.value,{handler:s,options:l}=typeof n=="object"?n:{handler:n,options:{}},i=new IntersectionObserver(function(){var u;let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1?arguments[1]:void 0;const c=(u=e._observe)==null?void 0:u[a.instance.$.uid];if(!c)return;const d=o.some(h=>h.isIntersecting);s&&(!t.quiet||c.init)&&(!t.once||d||c.init)&&s(d,o,r),d&&t.once?yh(e,a):c.init=!0},l);e._observe=Object(e._observe),e._observe[a.instance.$.uid]={init:!1,observer:i},i.observe(e)}function yh(e,a){var n;const t=(n=e._observe)==null?void 0:n[a.instance.$.uid];t&&(t.observer.unobserve(e),delete e._observe[a.instance.$.uid])}const kh={mounted:Fp,unmounted:yh},Nl=kh,bh=P({alt:String,cover:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},srcset:String,...ph(),...ce(),...Bt()},"VImg"),un=j()({name:"VImg",directives:{intersect:Nl},props:bh(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,a){let{emit:t,slots:n}=a;const s=re(""),l=se(),i=re(e.eager?"loading":"idle"),o=re(),r=re(),c=y(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),d=y(()=>c.value.aspect||o.value/r.value||0);de(()=>e.src,()=>{u(i.value!=="idle")}),de(d,(x,L)=>{!x&&L&&l.value&&k(l.value)}),Hl(()=>u());function u(x){if(!(e.eager&&x)&&!(Qo&&!x&&!e.eager)){if(i.value="loading",c.value.lazySrc){const L=new Image;L.src=c.value.lazySrc,k(L,null)}c.value.src&&ze(()=>{var L,T;if(t("loadstart",((L=l.value)==null?void 0:L.currentSrc)||c.value.src),(T=l.value)!=null&&T.complete){if(l.value.naturalWidth||g(),i.value==="error")return;d.value||k(l.value,null),h()}else d.value||k(l.value),f()})}}function h(){var x;f(),i.value="loaded",t("load",((x=l.value)==null?void 0:x.currentSrc)||c.value.src)}function g(){var x;i.value="error",t("error",((x=l.value)==null?void 0:x.currentSrc)||c.value.src)}function f(){const x=l.value;x&&(s.value=x.currentSrc||x.src)}let v=-1;function k(x){let L=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const T=()=>{clearTimeout(v);const{naturalHeight:E,naturalWidth:D}=x;E||D?(o.value=D,r.value=E):!x.complete&&i.value==="loading"&&L!=null?v=window.setTimeout(T,L):(x.currentSrc.endsWith(".svg")||x.currentSrc.startsWith("data:image/svg+xml"))&&(o.value=1,r.value=1)};T()}const b=y(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),p=()=>{var T;if(!c.value.src||i.value==="idle")return null;const x=m("img",{class:["v-img__img",b.value],src:c.value.src,srcset:c.value.srcset,alt:e.alt,sizes:e.sizes,ref:l,onLoad:h,onError:g},null),L=(T=n.sources)==null?void 0:T.call(n);return m(Ya,{transition:e.transition,appear:!0},{default:()=>[Je(L?m("picture",{class:"v-img__picture"},[L,x]):x,[[gt,i.value==="loaded"]])]})},w=()=>m(Ya,{transition:e.transition},{default:()=>[c.value.lazySrc&&i.value!=="loaded"&&m("img",{class:["v-img__img","v-img__img--preload",b.value],src:c.value.lazySrc,alt:e.alt},null)]}),C=()=>n.placeholder?m(Ya,{transition:e.transition,appear:!0},{default:()=>[(i.value==="loading"||i.value==="error"&&!n.error)&&m("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,H=()=>n.error?m(Ya,{transition:e.transition,appear:!0},{default:()=>[i.value==="error"&&m("div",{class:"v-img__error"},[n.error()])]}):null,B=()=>e.gradient?m("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,I=re(!1);{const x=de(d,L=>{L&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{I.value=!0})}),x())})}return ae(()=>{const[x]=Ui.filterProps(e);return Je(m(Ui,ie({class:["v-img",{"v-img--booting":!I.value},e.class],style:[{width:ue(e.width==="auto"?o.value:e.width)},e.style]},x,{aspectRatio:d.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>m(ve,null,[m(p,null,null),m(w,null,null),m(B,null,null),m(C,null,null),m(H,null,null)]),default:n.default}),[[Ga("intersect"),{handler:u,options:e.options},null,{once:!0}]])}),{currentSrc:s,image:l,state:i,naturalWidth:o,naturalHeight:r}}}),Fa=P({border:[Boolean,Number,String]},"border");function Qa(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();return{borderClasses:y(()=>{const n=Ue(e)?e.value:e.border,s=[];if(n===!0||n==="")s.push(`${a}--border`);else if(typeof n=="string"||n===0)for(const l of String(n).split(" "))s.push(`border-${l}`);return s})}}function ir(e){return Uo(()=>{const a=[],t={};return e.value.background&&(Cc(e.value.background)?t.backgroundColor=e.value.background:a.push(`bg-${e.value.background}`)),e.value.text&&(Cc(e.value.text)?(t.color=e.value.text,t.caretColor=e.value.text):a.push(`text-${e.value.text}`)),{colorClasses:a,colorStyles:t}})}function pa(e,a){const t=y(()=>({text:Ue(e)?e.value:a?e[a]:null})),{colorClasses:n,colorStyles:s}=ir(t);return{textColorClasses:n,textColorStyles:s}}function ea(e,a){const t=y(()=>({background:Ue(e)?e.value:a?e[a]:null})),{colorClasses:n,colorStyles:s}=ir(t);return{backgroundColorClasses:n,backgroundColorStyles:s}}const ta=P({elevation:{type:[Number,String],validator(e){const a=parseInt(e);return!isNaN(a)&&a>=0&&a<=24}}},"elevation");function ua(e){return{elevationClasses:y(()=>{const t=Ue(e)?e.value:e.elevation,n=[];return t==null||n.push(`elevation-${t}`),n})}}const Qe=P({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function $e(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();return{roundedClasses:y(()=>{const n=Ue(e)?e.value:e.rounded,s=[];if(n===!0||n==="")s.push(`${a}--rounded`);else if(typeof n=="string"||n===0)for(const l of String(n).split(" "))s.push(`rounded-${l}`);return s})}}const qp=[null,"prominent","default","comfortable","compact"],wh=P({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>qp.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...Fa(),...ce(),...ta(),...Qe(),...Le({tag:"header"}),...De()},"VToolbar"),Ki=j()({name:"VToolbar",props:wh(),setup(e,a){var g;let{slots:t}=a;const{backgroundColorClasses:n,backgroundColorStyles:s}=ea(Z(e,"color")),{borderClasses:l}=Qa(e),{elevationClasses:i}=ua(e),{roundedClasses:o}=$e(e),{themeClasses:r}=qe(e),{rtlClasses:c}=ra(),d=re(!!(e.extended||(g=t.extension)!=null&&g.call(t))),u=y(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),h=y(()=>d.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return Xe({VBtn:{variant:"text"}}),ae(()=>{var b;const f=!!(e.title||t.title),v=!!(t.image||e.image),k=(b=t.extension)==null?void 0:b.call(t);return d.value=!!(e.extended||k),m(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},n.value,l.value,i.value,o.value,r.value,c.value,e.class],style:[s.value,e.style]},{default:()=>[v&&m("div",{key:"image",class:"v-toolbar__image"},[t.image?m(Ne,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):m(un,{key:"image-img",cover:!0,src:e.image},null)]),m(Ne,{defaults:{VTabs:{height:ue(u.value)}}},{default:()=>{var p,w,C;return[m("div",{class:"v-toolbar__content",style:{height:ue(u.value)}},[t.prepend&&m("div",{class:"v-toolbar__prepend"},[(p=t.prepend)==null?void 0:p.call(t)]),f&&m(nr,{key:"title",text:e.title},{text:t.title}),(w=t.default)==null?void 0:w.call(t),t.append&&m("div",{class:"v-toolbar__append"},[(C=t.append)==null?void 0:C.call(t)])])]}}),m(Ne,{defaults:{VTabs:{height:ue(h.value)}}},{default:()=>[m(Pl,null,{default:()=>[d.value&&m("div",{class:"v-toolbar__extension",style:{height:ue(h.value)}},[k])]})]})]})}),{contentHeight:u,extensionHeight:h}}}),Rp=P({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Pp(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:t}=a;let n=0;const s=se(null),l=re(0),i=re(0),o=re(0),r=re(!1),c=re(!1),d=y(()=>Number(e.scrollThreshold)),u=y(()=>va((d.value-l.value)/d.value||0)),h=()=>{const g=s.value;!g||t&&!t.value||(n=l.value,l.value="window"in g?g.pageYOffset:g.scrollTop,c.value=l.value<n,o.value=Math.abs(l.value-d.value))};return de(c,()=>{i.value=i.value||l.value}),de(r,()=>{i.value=0}),ya(()=>{de(()=>e.scrollTarget,g=>{var v;const f=g?document.querySelector(g):window;f&&f!==s.value&&((v=s.value)==null||v.removeEventListener("scroll",h),s.value=f,s.value.addEventListener("scroll",h,{passive:!0}))},{immediate:!0})}),xa(()=>{var g;(g=s.value)==null||g.removeEventListener("scroll",h)}),t&&de(t,h,{immediate:!0}),{scrollThreshold:d,currentScroll:l,currentThreshold:o,isScrollActive:r,scrollRatio:u,isScrollingUp:c,savedScroll:i}}function fn(){const e=re(!1);return ya(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:y(()=>e.value?void 0:{transition:"none !important"}),isBooted:Fs(e)}}const Np=P({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...wh(),...Qn(),...Rp(),height:{type:[Number,String],default:64}},"VAppBar"),Op=j()({name:"VAppBar",props:Np(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=se(),s=xe(e,"modelValue"),l=y(()=>{var p;const b=new Set(((p=e.scrollBehavior)==null?void 0:p.split(" "))??[]);return{hide:b.has("hide"),inverted:b.has("inverted"),collapse:b.has("collapse"),elevate:b.has("elevate"),fadeImage:b.has("fade-image")}}),i=y(()=>{const b=l.value;return b.hide||b.inverted||b.collapse||b.elevate||b.fadeImage||!s.value}),{currentScroll:o,scrollThreshold:r,isScrollingUp:c,scrollRatio:d}=Pp(e,{canScroll:i}),u=y(()=>e.collapse||l.value.collapse&&(l.value.inverted?d.value>0:d.value===0)),h=y(()=>e.flat||l.value.elevate&&(l.value.inverted?o.value>0:o.value===0)),g=y(()=>l.value.fadeImage?l.value.inverted?1-d.value:d.value:void 0),f=y(()=>{var w,C;if(l.value.hide&&l.value.inverted)return 0;const b=((w=n.value)==null?void 0:w.contentHeight)??0,p=((C=n.value)==null?void 0:C.extensionHeight)??0;return b+p});St(y(()=>!!e.scrollBehavior),()=>{Da(()=>{l.value.hide?l.value.inverted?s.value=o.value>r.value:s.value=c.value||o.value<r.value:s.value=!0})});const{ssrBootStyles:v}=fn(),{layoutItemStyles:k}=Un({id:e.name,order:y(()=>parseInt(e.order,10)),position:Z(e,"location"),layoutSize:f,elementSize:re(void 0),active:s,absolute:Z(e,"absolute")});return ae(()=>{const[b]=Ki.filterProps(e);return m(Ki,ie({ref:n,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...k.value,"--v-toolbar-image-opacity":g.value,height:void 0,...v.value},e.style]},b,{collapse:u.value,flat:h.value}),t)}),{}}});const zp=[null,"default","comfortable","compact"],na=P({density:{type:String,default:"default",validator:e=>zp.includes(e)}},"density");function ba(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();return{densityClasses:y(()=>`${a}--density-${e.density}`)}}const _p=["elevated","flat","tonal","outlined","text","plain"];function vn(e,a){return m(ve,null,[e&&m("span",{key:"overlay",class:`${a}__overlay`},null),m("span",{key:"underlay",class:`${a}__underlay`},null)])}const Ua=P({color:String,variant:{type:String,default:"elevated",validator:e=>_p.includes(e)}},"variant");function pn(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();const t=y(()=>{const{variant:l}=ia(e);return`${a}--variant-${l}`}),{colorClasses:n,colorStyles:s}=ir(y(()=>{const{variant:l,color:i}=ia(e);return{[["elevated","flat"].includes(l)?"background":"text"]:i}}));return{colorClasses:n,colorStyles:s,variantClasses:t}}const Mh=P({divided:Boolean,...Fa(),...ce(),...na(),...ta(),...Qe(),...Le(),...De(),...Ua()},"VBtnGroup"),Ji=j()({name:"VBtnGroup",props:Mh(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{densityClasses:s}=ba(e),{borderClasses:l}=Qa(e),{elevationClasses:i}=ua(e),{roundedClasses:o}=$e(e);Xe({VBtn:{height:"auto",color:Z(e,"color"),density:Z(e,"density"),flat:!0,variant:Z(e,"variant")}}),ae(()=>m(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},n.value,l.value,s.value,i.value,o.value,e.class],style:e.style},t))}}),Kn=P({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),Jn=P({value:null,disabled:Boolean,selectedClass:String},"group-item");function $n(e,a){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const n=oa("useGroupItem");if(!n)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const s=ka();je(Symbol.for(`${a.description}:id`),s);const l=He(a,null);if(!l){if(!t)return l;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${a.description}`)}const i=Z(e,"value"),o=y(()=>!!(l.disabled.value||e.disabled));l.register({id:s,value:i,disabled:o},n),xa(()=>{l.unregister(s)});const r=y(()=>l.isSelected(s)),c=y(()=>r.value&&[l.selectedClass.value,e.selectedClass]);return de(r,d=>{n.emit("group:selected",{value:d})}),{id:s,isSelected:r,toggle:()=>l.select(s,!r.value),select:d=>l.select(s,d),selectedClass:c,value:i,disabled:o,group:l}}function yn(e,a){let t=!1;const n=Ma([]),s=xe(e,"modelValue",[],h=>h==null?[]:xh(n,Na(h)),h=>{const g=Vp(n,h);return e.multiple?g:g[0]}),l=oa("useGroup");function i(h,g){const f=h,v=Symbol.for(`${a.description}:id`),b=gs(v,l==null?void 0:l.vnode).indexOf(g);b>-1?n.splice(b,0,f):n.push(f)}function o(h){if(t)return;r();const g=n.findIndex(f=>f.id===h);n.splice(g,1)}function r(){const h=n.find(g=>!g.disabled);h&&e.mandatory==="force"&&!s.value.length&&(s.value=[h.id])}ya(()=>{r()}),xa(()=>{t=!0});function c(h,g){const f=n.find(v=>v.id===h);if(!(g&&(f!=null&&f.disabled)))if(e.multiple){const v=s.value.slice(),k=v.findIndex(p=>p===h),b=~k;if(g=g??!b,b&&e.mandatory&&v.length<=1||!b&&e.max!=null&&v.length+1>e.max)return;k<0&&g?v.push(h):k>=0&&!g&&v.splice(k,1),s.value=v}else{const v=s.value.includes(h);if(e.mandatory&&v)return;s.value=g??!v?[h]:[]}}function d(h){if(e.multiple,s.value.length){const g=s.value[0],f=n.findIndex(b=>b.id===g);let v=(f+h)%n.length,k=n[v];for(;k.disabled&&v!==f;)v=(v+h)%n.length,k=n[v];if(k.disabled)return;s.value=[n[v].id]}else{const g=n.find(f=>!f.disabled);g&&(s.value=[g.id])}}const u={register:i,unregister:o,selected:s,select:c,disabled:Z(e,"disabled"),prev:()=>d(n.length-1),next:()=>d(1),isSelected:h=>s.value.includes(h),selectedClass:y(()=>e.selectedClass),items:y(()=>n),getItemIndex:h=>Wp(n,h)};return je(a,u),u}function Wp(e,a){const t=xh(e,[a]);return t.length?e.findIndex(n=>n.id===t[0]):-1}function xh(e,a){const t=[];return a.forEach(n=>{const s=e.find(i=>hn(n,i.value)),l=e[n];(s==null?void 0:s.value)!=null?t.push(s.id):l!=null&&t.push(l.id)}),t}function Vp(e,a){const t=[];return a.forEach(n=>{const s=e.findIndex(l=>l.id===n);if(~s){const l=e[s];t.push(l.value!=null?l.value:s)}}),t}const or=Symbol.for("vuetify:v-btn-toggle"),Qp=P({...Mh(),...Kn()},"VBtnToggle"),Up=j()({name:"VBtnToggle",props:Qp(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{isSelected:n,next:s,prev:l,select:i,selected:o}=yn(e,or);return ae(()=>{const[r]=Ji.filterProps(e);return m(Ji,ie({class:["v-btn-toggle",e.class]},r,{style:e.style}),{default:()=>{var c;return[(c=t.default)==null?void 0:c.call(t,{isSelected:n,next:s,prev:l,select:i,selected:o})]}})}),{next:s,prev:l,select:i}}});const Kp=["x-small","small","default","large","x-large"],Ht=P({size:{type:[String,Number],default:"default"}},"size");function jn(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();return Uo(()=>{let t,n;return gl(Kp,e.size)?t=`${a}--size-${e.size}`:e.size&&(n={width:ue(e.size),height:ue(e.size)}),{sizeClasses:t,sizeStyles:n}})}const Jp=P({color:String,start:Boolean,end:Boolean,icon:be,...ce(),...Ht(),...Le({tag:"i"}),...De()},"VIcon"),Re=j()({name:"VIcon",props:Jp(),setup(e,a){let{attrs:t,slots:n}=a;const s=se(),{themeClasses:l}=qe(e),{iconData:i}=D5(y(()=>s.value||e.icon)),{sizeClasses:o}=jn(e),{textColorClasses:r,textColorStyles:c}=pa(Z(e,"color"));return ae(()=>{var u,h;const d=(u=n.default)==null?void 0:u.call(n);return d&&(s.value=(h=Ou(d).filter(g=>g.type===qs&&g.children&&typeof g.children=="string")[0])==null?void 0:h.children),m(i.value.component,{tag:e.tag,icon:i.value.icon,class:["v-icon","notranslate",l.value,o.value,r.value,{"v-icon--clickable":!!t.onClick,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[o.value?void 0:{fontSize:ue(e.size),height:ue(e.size),width:ue(e.size)},c.value,e.style],role:t.onClick?"button":void 0,"aria-hidden":!t.onClick},{default:()=>[d]})}),{}}});function rr(e,a){const t=se(),n=re(!1);if(Qo){const s=new IntersectionObserver(l=>{e==null||e(l,s),n.value=!!l.find(i=>i.isIntersecting)},a);xa(()=>{s.disconnect()}),de(t,(l,i)=>{i&&(s.unobserve(i),n.value=!1),l&&s.observe(l)},{flush:"post"})}return{intersectionRef:t,isIntersecting:n}}const $p=P({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...ce(),...Ht(),...Le({tag:"div"}),...De()},"VProgressCircular"),cr=j()({name:"VProgressCircular",props:$p(),setup(e,a){let{slots:t}=a;const n=20,s=2*Math.PI*n,l=se(),{themeClasses:i}=qe(e),{sizeClasses:o,sizeStyles:r}=jn(e),{textColorClasses:c,textColorStyles:d}=pa(Z(e,"color")),{textColorClasses:u,textColorStyles:h}=pa(Z(e,"bgColor")),{intersectionRef:g,isIntersecting:f}=rr(),{resizeRef:v,contentRect:k}=ut(),b=y(()=>Math.max(0,Math.min(100,parseFloat(e.modelValue)))),p=y(()=>Number(e.width)),w=y(()=>r.value?Number(e.size):k.value?k.value.width:Math.max(p.value,32)),C=y(()=>n/(1-p.value/w.value)*2),H=y(()=>p.value/w.value*C.value),B=y(()=>ue((100-b.value)/100*s));return Da(()=>{g.value=l.value,v.value=l.value}),ae(()=>m(e.tag,{ref:l,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":f.value,"v-progress-circular--disable-shrink":e.indeterminate==="disable-shrink"},i.value,o.value,c.value,e.class],style:[r.value,d.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:b.value},{default:()=>[m("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${C.value} ${C.value}`},[m("circle",{class:["v-progress-circular__underlay",u.value],style:h.value,fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":H.value,"stroke-dasharray":s,"stroke-dashoffset":0},null),m("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:n,"stroke-width":H.value,"stroke-dasharray":s,"stroke-dashoffset":B.value},null)]),t.default&&m("div",{class:"v-progress-circular__content"},[t.default({value:b.value})])]})),{}}});const Yc={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},Wt=P({location:String},"location");function Vt(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,t=arguments.length>2?arguments[2]:void 0;const{isRtl:n}=ra();return{locationStyles:y(()=>{if(!e.location)return{};const{side:l,align:i}=Ri(e.location.split(" ").length>1?e.location:`${e.location} center`,n.value);function o(c){return t?t(c):0}const r={};return l!=="center"&&(a?r[Yc[l]]=`calc(100% - ${o(l)}px)`:r[l]=0),i!=="center"?a?r[Yc[i]]=`calc(100% - ${o(i)}px)`:r[i]=0:(l==="center"?r.top=r.left="50%":r[{top:"left",bottom:"left",left:"top",right:"top"}[l]]="50%",r.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[l]),r})}}const jp=P({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...ce(),...Wt({location:"top"}),...Qe(),...Le(),...De()},"VProgressLinear"),dr=j()({name:"VProgressLinear",props:jp(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{isRtl:s,rtlClasses:l}=ra(),{themeClasses:i}=qe(e),{locationStyles:o}=Vt(e),{textColorClasses:r,textColorStyles:c}=pa(e,"color"),{backgroundColorClasses:d,backgroundColorStyles:u}=ea(y(()=>e.bgColor||e.color)),{backgroundColorClasses:h,backgroundColorStyles:g}=ea(e,"color"),{roundedClasses:f}=$e(e),{intersectionRef:v,isIntersecting:k}=rr(),b=y(()=>parseInt(e.max,10)),p=y(()=>parseInt(e.height,10)),w=y(()=>parseFloat(e.bufferValue)/b.value*100),C=y(()=>parseFloat(n.value)/b.value*100),H=y(()=>s.value!==e.reverse),B=y(()=>e.indeterminate?"fade-transition":"slide-x-transition"),I=y(()=>e.bgOpacity==null?e.bgOpacity:parseFloat(e.bgOpacity));function x(L){if(!v.value)return;const{left:T,right:E,width:D}=v.value.getBoundingClientRect(),q=H.value?D-L.clientX+(E-D):L.clientX-T;n.value=Math.round(q/D*b.value)}return ae(()=>m(e.tag,{ref:v,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&k.value,"v-progress-linear--reverse":H.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},f.value,i.value,l.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?ue(p.value):0,"--v-progress-linear-height":ue(p.value),...o.value},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:C.value,onClick:e.clickable&&x},{default:()=>[e.stream&&m("div",{key:"stream",class:["v-progress-linear__stream",r.value],style:{...c.value,[H.value?"left":"right"]:ue(-p.value),borderTop:`${ue(p.value/2)} dotted`,opacity:I.value,top:`calc(50% - ${ue(p.value/4)})`,width:ue(100-w.value,"%"),"--v-progress-linear-stream-to":ue(p.value*(H.value?1:-1))}},null),m("div",{class:["v-progress-linear__background",d.value],style:[u.value,{opacity:I.value,width:ue(e.stream?w.value:100,"%")}]},null),m(dt,{name:B.value},{default:()=>[e.indeterminate?m("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(L=>m("div",{key:L,class:["v-progress-linear__indeterminate",L,h.value],style:g.value},null))]):m("div",{class:["v-progress-linear__determinate",h.value],style:[g.value,{width:ue(C.value,"%")}]},null)]}),t.default&&m("div",{class:"v-progress-linear__content"},[t.default({value:C.value,buffer:w.value})])]})),{}}}),ur=P({loading:[Boolean,String]},"loader");function Ol(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();return{loaderClasses:y(()=>({[`${a}--loading`]:e.loading}))}}function hr(e,a){var n;let{slots:t}=a;return m("div",{class:`${e.name}__loader`},[((n=t.default)==null?void 0:n.call(t,{color:e.color,isActive:e.active}))||m(dr,{active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const Yp=["static","relative","fixed","absolute","sticky"],Yn=P({position:{type:String,validator:e=>Yp.includes(e)}},"position");function Zn(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();return{positionClasses:y(()=>e.position?`${a}--${e.position}`:void 0)}}function Sh(){var e,a;return(a=(e=oa("useRouter"))==null?void 0:e.proxy)==null?void 0:a.$router}function Rs(e,a){const t=Hf("RouterLink"),n=y(()=>!!(e.href||e.to)),s=y(()=>(n==null?void 0:n.value)||xc(a,"click")||xc(e,"click"));if(typeof t=="string")return{isLink:n,isClickable:s,href:Z(e,"href")};const l=e.to?t.useLink(e):void 0;return{isLink:n,isClickable:s,route:l==null?void 0:l.route,navigate:l==null?void 0:l.navigate,isActive:l&&y(()=>{var i,o;return e.exact?(i=l.isExactActive)==null?void 0:i.value:(o=l.isActive)==null?void 0:o.value}),href:y(()=>e.to?l==null?void 0:l.route.value.href:e.href)}}const Ps=P({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let di=!1;function Zp(e,a){let t=!1,n,s;Ke&&(ze(()=>{window.addEventListener("popstate",l),n=e==null?void 0:e.beforeEach((i,o,r)=>{di?t?a(r):r():setTimeout(()=>t?a(r):r()),di=!0}),s=e==null?void 0:e.afterEach(()=>{di=!1})}),Aa(()=>{window.removeEventListener("popstate",l),n==null||n(),s==null||s()}));function l(i){var o;(o=i.state)!=null&&o.replaced||(t=!0,setTimeout(()=>t=!1))}}function Xp(e,a){de(()=>{var t;return(t=e.isActive)==null?void 0:t.value},t=>{e.isLink.value&&t&&a&&ze(()=>{a(!0)})},{immediate:!0})}const $i=Symbol("rippleStop"),e1=80;function Zc(e,a){e.style.transform=a,e.style.webkitTransform=a}function ji(e){return e.constructor.name==="TouchEvent"}function Lh(e){return e.constructor.name==="KeyboardEvent"}const a1=function(e,a){var u;let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=0,s=0;if(!Lh(e)){const h=a.getBoundingClientRect(),g=ji(e)?e.touches[e.touches.length-1]:e;n=g.clientX-h.left,s=g.clientY-h.top}let l=0,i=.3;(u=a._ripple)!=null&&u.circle?(i=.15,l=a.clientWidth/2,l=t.center?l:l+Math.sqrt((n-l)**2+(s-l)**2)/4):l=Math.sqrt(a.clientWidth**2+a.clientHeight**2)/2;const o=`${(a.clientWidth-l*2)/2}px`,r=`${(a.clientHeight-l*2)/2}px`,c=t.center?o:`${n-l}px`,d=t.center?r:`${s-l}px`;return{radius:l,scale:i,x:c,y:d,centerX:o,centerY:r}},kl={show(e,a){var g;let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((g=a==null?void 0:a._ripple)!=null&&g.enabled))return;const n=document.createElement("span"),s=document.createElement("span");n.appendChild(s),n.className="v-ripple__container",t.class&&(n.className+=` ${t.class}`);const{radius:l,scale:i,x:o,y:r,centerX:c,centerY:d}=a1(e,a,t),u=`${l*2}px`;s.className="v-ripple__animation",s.style.width=u,s.style.height=u,a.appendChild(n);const h=window.getComputedStyle(a);h&&h.position==="static"&&(a.style.position="relative",a.dataset.previousPosition="static"),s.classList.add("v-ripple__animation--enter"),s.classList.add("v-ripple__animation--visible"),Zc(s,`translate(${o}, ${r}) scale3d(${i},${i},${i})`),s.dataset.activated=String(performance.now()),setTimeout(()=>{s.classList.remove("v-ripple__animation--enter"),s.classList.add("v-ripple__animation--in"),Zc(s,`translate(${c}, ${d}) scale3d(1,1,1)`)},0)},hide(e){var l;if(!((l=e==null?void 0:e._ripple)!=null&&l.enabled))return;const a=e.getElementsByClassName("v-ripple__animation");if(a.length===0)return;const t=a[a.length-1];if(t.dataset.isHiding)return;t.dataset.isHiding="true";const n=performance.now()-Number(t.dataset.activated),s=Math.max(250-n,0);setTimeout(()=>{t.classList.remove("v-ripple__animation--in"),t.classList.add("v-ripple__animation--out"),setTimeout(()=>{var o;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((o=t.parentNode)==null?void 0:o.parentNode)===e&&e.removeChild(t.parentNode)},300)},s)}};function Ah(e){return typeof e>"u"||!!e}function Bs(e){const a={},t=e.currentTarget;if(!(!(t!=null&&t._ripple)||t._ripple.touched||e[$i])){if(e[$i]=!0,ji(e))t._ripple.touched=!0,t._ripple.isTouch=!0;else if(t._ripple.isTouch)return;if(a.center=t._ripple.centered||Lh(e),t._ripple.class&&(a.class=t._ripple.class),ji(e)){if(t._ripple.showTimerCommit)return;t._ripple.showTimerCommit=()=>{kl.show(e,t,a)},t._ripple.showTimer=window.setTimeout(()=>{var n;(n=t==null?void 0:t._ripple)!=null&&n.showTimerCommit&&(t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null)},e1)}else kl.show(e,t,a)}}function Xc(e){e[$i]=!0}function Ba(e){const a=e.currentTarget;if(a!=null&&a._ripple){if(window.clearTimeout(a._ripple.showTimer),e.type==="touchend"&&a._ripple.showTimerCommit){a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null,a._ripple.showTimer=window.setTimeout(()=>{Ba(e)});return}window.setTimeout(()=>{a._ripple&&(a._ripple.touched=!1)}),kl.hide(a)}}function Ch(e){const a=e.currentTarget;a!=null&&a._ripple&&(a._ripple.showTimerCommit&&(a._ripple.showTimerCommit=null),window.clearTimeout(a._ripple.showTimer))}let Hs=!1;function Ih(e){!Hs&&(e.keyCode===kc.enter||e.keyCode===kc.space)&&(Hs=!0,Bs(e))}function Th(e){Hs=!1,Ba(e)}function Bh(e){Hs&&(Hs=!1,Ba(e))}function Hh(e,a,t){const{value:n,modifiers:s}=a,l=Ah(n);if(l||kl.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=l,e._ripple.centered=s.center,e._ripple.circle=s.circle,Ei(n)&&n.class&&(e._ripple.class=n.class),l&&!t){if(s.stop){e.addEventListener("touchstart",Xc,{passive:!0}),e.addEventListener("mousedown",Xc);return}e.addEventListener("touchstart",Bs,{passive:!0}),e.addEventListener("touchend",Ba,{passive:!0}),e.addEventListener("touchmove",Ch,{passive:!0}),e.addEventListener("touchcancel",Ba),e.addEventListener("mousedown",Bs),e.addEventListener("mouseup",Ba),e.addEventListener("mouseleave",Ba),e.addEventListener("keydown",Ih),e.addEventListener("keyup",Th),e.addEventListener("blur",Bh),e.addEventListener("dragstart",Ba,{passive:!0})}else!l&&t&&Dh(e)}function Dh(e){e.removeEventListener("mousedown",Bs),e.removeEventListener("touchstart",Bs),e.removeEventListener("touchend",Ba),e.removeEventListener("touchmove",Ch),e.removeEventListener("touchcancel",Ba),e.removeEventListener("mouseup",Ba),e.removeEventListener("mouseleave",Ba),e.removeEventListener("keydown",Ih),e.removeEventListener("keyup",Th),e.removeEventListener("dragstart",Ba),e.removeEventListener("blur",Bh)}function t1(e,a){Hh(e,a,!1)}function n1(e){delete e._ripple,Dh(e)}function s1(e,a){if(a.value===a.oldValue)return;const t=Ah(a.oldValue);Hh(e,a,t)}const Qt={mounted:t1,unmounted:n1,updated:s1},mr=P({active:{type:Boolean,default:void 0},symbol:{type:null,default:or},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:be,appendIcon:be,block:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:String,...Fa(),...ce(),...na(),...Wa(),...ta(),...Jn(),...ur(),...Wt(),...Yn(),...Qe(),...Ps(),...Ht(),...Le({tag:"button"}),...De(),...Ua({variant:"elevated"})},"VBtn"),ca=j()({name:"VBtn",directives:{Ripple:Qt},props:mr(),emits:{"group:selected":e=>!0},setup(e,a){let{attrs:t,slots:n}=a;const{themeClasses:s}=qe(e),{borderClasses:l}=Qa(e),{colorClasses:i,colorStyles:o,variantClasses:r}=pn(e),{densityClasses:c}=ba(e),{dimensionStyles:d}=Va(e),{elevationClasses:u}=ua(e),{loaderClasses:h}=Ol(e),{locationStyles:g}=Vt(e),{positionClasses:f}=Zn(e),{roundedClasses:v}=$e(e),{sizeClasses:k,sizeStyles:b}=jn(e),p=$n(e,e.symbol,!1),w=Rs(e,t),C=y(()=>{var L;return e.active!==void 0?e.active:w.isLink.value?(L=w.isActive)==null?void 0:L.value:p==null?void 0:p.isSelected.value}),H=y(()=>(p==null?void 0:p.disabled.value)||e.disabled),B=y(()=>e.variant==="elevated"&&!(e.disabled||e.flat||e.border)),I=y(()=>{if(e.value!==void 0)return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value});function x(L){var T;H.value||w.isLink.value&&(L.metaKey||L.ctrlKey||L.shiftKey||L.button!==0||t.target==="_blank")||((T=w.navigate)==null||T.call(w,L),p==null||p.toggle())}return Xp(w,p==null?void 0:p.select),ae(()=>{var U,_;const L=w.isLink.value?"a":e.tag,T=!!(e.prependIcon||n.prepend),E=!!(e.appendIcon||n.append),D=!!(e.icon&&e.icon!==!0),q=(p==null?void 0:p.isSelected.value)&&(!w.isLink.value||((U=w.isActive)==null?void 0:U.value))||!p||((_=w.isActive)==null?void 0:_.value);return Je(m(L,{type:L==="a"?void 0:"button",class:["v-btn",p==null?void 0:p.selectedClass.value,{"v-btn--active":C.value,"v-btn--block":e.block,"v-btn--disabled":H.value,"v-btn--elevated":B.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--stacked":e.stacked},s.value,l.value,q?i.value:void 0,c.value,u.value,h.value,f.value,v.value,k.value,r.value,e.class],style:[q?o.value:void 0,d.value,g.value,b.value,e.style],disabled:H.value||void 0,href:w.href.value,onClick:x,value:I.value},{default:()=>{var J;return[vn(!0,"v-btn"),!e.icon&&T&&m("span",{key:"prepend",class:"v-btn__prepend"},[n.prepend?m(Ne,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},n.prepend):m(Re,{key:"prepend-icon",icon:e.prependIcon},null)]),m("span",{class:"v-btn__content","data-no-activator":""},[!n.default&&D?m(Re,{key:"content-icon",icon:e.icon},null):m(Ne,{key:"content-defaults",disabled:!D,defaults:{VIcon:{icon:e.icon}}},{default:()=>{var K;return[((K=n.default)==null?void 0:K.call(n))??e.text]}})]),!e.icon&&E&&m("span",{key:"append",class:"v-btn__append"},[n.append?m(Ne,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},n.append):m(Re,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&m("span",{key:"loader",class:"v-btn__loader"},[((J=n.loader)==null?void 0:J.call(n))??m(cr,{color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0,size:"23",width:"2"},null)])]}}),[[Ga("ripple"),!H.value&&e.ripple,null]])}),{}}}),l1=P({...mr({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),i1=j()({name:"VAppBarNavIcon",props:l1(),setup(e,a){let{slots:t}=a;return ae(()=>m(ca,ie(e,{class:["v-app-bar-nav-icon"]}),t)),{}}}),o1=j()({name:"VAppBarTitle",props:mh(),setup(e,a){let{slots:t}=a;return ae(()=>m(nr,ie(e,{class:"v-app-bar-title"}),t)),{}}});const Gh=at("v-alert-title"),r1=["success","info","warning","error"],c1=P({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:be,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>r1.includes(e)},...ce(),...na(),...Wa(),...ta(),...Wt(),...Yn(),...Qe(),...Le(),...De(),...Ua({variant:"flat"})},"VAlert"),d1=j()({name:"VAlert",props:c1(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{emit:t,slots:n}=a;const s=xe(e,"modelValue"),l=y(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),i=y(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:o}=qe(e),{colorClasses:r,colorStyles:c,variantClasses:d}=pn(i),{densityClasses:u}=ba(e),{dimensionStyles:h}=Va(e),{elevationClasses:g}=ua(e),{locationStyles:f}=Vt(e),{positionClasses:v}=Zn(e),{roundedClasses:k}=$e(e),{textColorClasses:b,textColorStyles:p}=pa(Z(e,"borderColor")),{t:w}=_a(),C=y(()=>({"aria-label":w(e.closeLabel),onClick(H){s.value=!1,t("click:close",H)}}));return()=>{const H=!!(n.prepend||l.value),B=!!(n.title||e.title),I=!!(n.close||e.closable);return s.value&&m(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},o.value,r.value,u.value,g.value,v.value,k.value,d.value,e.class],style:[c.value,h.value,f.value,e.style],role:"alert"},{default:()=>{var x,L;return[vn(!1,"v-alert"),e.border&&m("div",{key:"border",class:["v-alert__border",b.value],style:p.value},null),H&&m("div",{key:"prepend",class:"v-alert__prepend"},[n.prepend?m(Ne,{key:"prepend-defaults",disabled:!l.value,defaults:{VIcon:{density:e.density,icon:l.value,size:e.prominent?44:28}}},n.prepend):m(Re,{key:"prepend-icon",density:e.density,icon:l.value,size:e.prominent?44:28},null)]),m("div",{class:"v-alert__content"},[B&&m(Gh,{key:"title"},{default:()=>{var T;return[((T=n.title)==null?void 0:T.call(n))??e.title]}}),((x=n.text)==null?void 0:x.call(n))??e.text,(L=n.default)==null?void 0:L.call(n)]),n.append&&m("div",{key:"append",class:"v-alert__append"},[n.append()]),I&&m("div",{key:"close",class:"v-alert__close"},[n.close?m(Ne,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var T;return[(T=n.close)==null?void 0:T.call(n,{props:C.value})]}}):m(ca,ie({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},C.value),null)])]}})}}});const u1=P({text:String,clickable:Boolean,...ce(),...De()},"VLabel"),Xn=j()({name:"VLabel",props:u1(),setup(e,a){let{slots:t}=a;return ae(()=>{var n;return m("label",{class:["v-label",{"v-label--clickable":e.clickable},e.class],style:e.style},[e.text,(n=t.default)==null?void 0:n.call(t)])}),{}}});const Eh=Symbol.for("vuetify:selection-control-group"),gr=P({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:be,trueIcon:be,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:hn},...ce(),...na(),...De()},"SelectionControlGroup"),h1=P({...gr({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),Fh=j()({name:"VSelectionControlGroup",props:h1(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),s=ka(),l=y(()=>e.id||`v-selection-control-group-${s}`),i=y(()=>e.name||l.value),o=new Set;return je(Eh,{modelValue:n,forceUpdate:()=>{o.forEach(r=>r())},onForceUpdate:r=>{o.add(r),Aa(()=>{o.delete(r)})}}),Xe({[e.defaultsTarget]:{color:Z(e,"color"),disabled:Z(e,"disabled"),density:Z(e,"density"),error:Z(e,"error"),inline:Z(e,"inline"),modelValue:n,multiple:y(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),name:i,falseIcon:Z(e,"falseIcon"),trueIcon:Z(e,"trueIcon"),readonly:Z(e,"readonly"),ripple:Z(e,"ripple"),type:Z(e,"type"),valueComparator:Z(e,"valueComparator")}}),ae(()=>{var r;return m("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(r=t.default)==null?void 0:r.call(t)])}),{}}}),zl=P({label:String,trueValue:null,falseValue:null,value:null,...ce(),...gr()},"VSelectionControl");function m1(e){const a=He(Eh,void 0),{densityClasses:t}=ba(e),n=xe(e,"modelValue"),s=y(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),l=y(()=>e.falseValue!==void 0?e.falseValue:!1),i=y(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),o=y({get(){const u=a?a.modelValue.value:n.value;return i.value?u.some(h=>e.valueComparator(h,s.value)):e.valueComparator(u,s.value)},set(u){if(e.readonly)return;const h=u?s.value:l.value;let g=h;i.value&&(g=u?[...Na(n.value),h]:Na(n.value).filter(f=>!e.valueComparator(f,s.value))),a?a.modelValue.value=g:n.value=g}}),{textColorClasses:r,textColorStyles:c}=pa(y(()=>o.value&&!e.error&&!e.disabled?e.color:void 0)),d=y(()=>o.value?e.trueIcon:e.falseIcon);return{group:a,densityClasses:t,trueValue:s,falseValue:l,model:o,textColorClasses:r,textColorStyles:c,icon:d}}const Rn=j()({name:"VSelectionControl",directives:{Ripple:Qt},inheritAttrs:!1,props:zl(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:t,slots:n}=a;const{group:s,densityClasses:l,icon:i,model:o,textColorClasses:r,textColorStyles:c,trueValue:d}=m1(e),u=ka(),h=y(()=>e.id||`input-${u}`),g=re(!1),f=re(!1),v=se();s==null||s.onForceUpdate(()=>{v.value&&(v.value.checked=o.value)});function k(w){g.value=!0,Fn(w.target,":focus-visible")!==!1&&(f.value=!0)}function b(){g.value=!1,f.value=!1}function p(w){e.readonly&&s&&ze(()=>s.forceUpdate()),o.value=w.target.checked}return ae(()=>{var B,I;const w=n.label?n.label({label:e.label,props:{for:h.value}}):e.label,[C,H]=mn(t);return m("div",ie({class:["v-selection-control",{"v-selection-control--dirty":o.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":g.value,"v-selection-control--focus-visible":f.value,"v-selection-control--inline":e.inline},l.value,e.class]},C,{style:e.style}),[m("div",{class:["v-selection-control__wrapper",r.value],style:c.value},[(B=n.default)==null?void 0:B.call(n),Je(m("div",{class:["v-selection-control__input"]},[i.value&&m(Re,{key:"icon",icon:i.value},null),m("input",ie({ref:v,checked:o.value,disabled:!!(e.readonly||e.disabled),id:h.value,onBlur:b,onFocus:k,onInput:p,"aria-disabled":!!(e.readonly||e.disabled),type:e.type,value:d.value,name:e.name,"aria-checked":e.type==="checkbox"?o.value:void 0},H),null),(I=n.input)==null?void 0:I.call(n,{model:o,textColorClasses:r,textColorStyles:c,props:{onFocus:k,onBlur:b,id:h.value}})]),[[Ga("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),w&&m(Xn,{for:h.value,clickable:!0},{default:()=>[w]})])}),{isFocused:g,input:v}}}),qh=P({indeterminate:Boolean,indeterminateIcon:{type:be,default:"$checkboxIndeterminate"},...zl({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Pn=j()({name:"VCheckboxBtn",props:qh(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"indeterminate"),s=xe(e,"modelValue");function l(r){n.value&&(n.value=!1)}const i=y(()=>n.value?e.indeterminateIcon:e.falseIcon),o=y(()=>n.value?e.indeterminateIcon:e.trueIcon);return ae(()=>m(Rn,ie(e,{modelValue:s.value,"onUpdate:modelValue":[r=>s.value=r,l],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:i.value,trueIcon:o.value,"aria-checked":n.value?"mixed":void 0}),t)),{}}});function Rh(e){const{t:a}=_a();function t(n){let{name:s}=n;const l={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[s],i=e[`onClick:${s}`],o=i&&l?a(`$vuetify.input.${l}`,e.label??""):void 0;return m(Re,{icon:e[`${s}Icon`],"aria-label":o,onClick:i},null)}return{InputIcon:t}}const g1=P({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...ce(),...Bt({transition:{component:sr,leaveAbsolute:!0,group:!0}})},"VMessages"),Ph=j()({name:"VMessages",props:g1(),setup(e,a){let{slots:t}=a;const n=y(()=>Na(e.messages)),{textColorClasses:s,textColorStyles:l}=pa(y(()=>e.color));return ae(()=>m(Ya,{transition:e.transition,tag:"div",class:["v-messages",s.value,e.class],style:[l.value,e.style],role:"alert","aria-live":"polite"},{default:()=>[e.active&&n.value.map((i,o)=>m("div",{class:"v-messages__message",key:`${o}-${n.value}`},[t.message?t.message({message:i}):i]))]})),{}}}),_l=P({focused:Boolean,"onUpdate:focused":rt()},"focus");function Ut(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt();const t=xe(e,"focused"),n=y(()=>({[`${a}--focused`]:t.value}));function s(){t.value=!0}function l(){t.value=!1}return{focusClasses:n,isFocused:t,focus:s,blur:l}}const Nh=Symbol.for("vuetify:form"),f1=P({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form");function v1(e){const a=xe(e,"modelValue"),t=y(()=>e.disabled),n=y(()=>e.readonly),s=re(!1),l=se([]),i=se([]);async function o(){const d=[];let u=!0;i.value=[],s.value=!0;for(const h of l.value){const g=await h.validate();if(g.length>0&&(u=!1,d.push({id:h.id,errorMessages:g})),!u&&e.fastFail)break}return i.value=d,s.value=!1,{valid:u,errors:i.value}}function r(){l.value.forEach(d=>d.reset())}function c(){l.value.forEach(d=>d.resetValidation())}return de(l,()=>{let d=0,u=0;const h=[];for(const g of l.value)g.isValid===!1?(u++,h.push({id:g.id,errorMessages:g.errorMessages})):g.isValid===!0&&d++;i.value=h,a.value=u>0?!1:d===l.value.length?!0:null},{deep:!0}),je(Nh,{register:d=>{let{id:u,validate:h,reset:g,resetValidation:f}=d;l.value.some(v=>v.id===u),l.value.push({id:u,validate:h,reset:g,resetValidation:f,isValid:null,errorMessages:[]})},unregister:d=>{l.value=l.value.filter(u=>u.id!==d)},update:(d,u,h)=>{const g=l.value.find(f=>f.id===d);g&&(g.isValid=u,g.errorMessages=h)},isDisabled:t,isReadonly:n,isValidating:s,isValid:a,items:l,validateOn:Z(e,"validateOn")}),{errors:i,isDisabled:t,isReadonly:n,isValidating:s,isValid:a,items:l,validate:o,reset:r,resetValidation:c}}function Wl(){return He(Nh,null)}const Oh=P({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,..._l()},"validation");function zh(e){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Tt(),t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ka();const n=xe(e,"modelValue"),s=y(()=>e.validationValue===void 0?n.value:e.validationValue),l=Wl(),i=se([]),o=re(!0),r=y(()=>!!(Na(n.value===""?null:n.value).length||Na(s.value===""?null:s.value).length)),c=y(()=>!!(e.disabled??(l==null?void 0:l.isDisabled.value))),d=y(()=>!!(e.readonly??(l==null?void 0:l.isReadonly.value))),u=y(()=>e.errorMessages.length?Na(e.errorMessages).slice(0,Math.max(0,+e.maxErrors)):i.value),h=y(()=>{let C=(e.validateOn??(l==null?void 0:l.validateOn.value))||"input";C==="lazy"&&(C="input lazy");const H=new Set((C==null?void 0:C.split(" "))??[]);return{blur:H.has("blur")||H.has("input"),input:H.has("input"),submit:H.has("submit"),lazy:H.has("lazy")}}),g=y(()=>e.error||e.errorMessages.length?!1:e.rules.length?o.value?i.value.length||h.value.lazy?null:!0:!i.value.length:!0),f=re(!1),v=y(()=>({[`${a}--error`]:g.value===!1,[`${a}--dirty`]:r.value,[`${a}--disabled`]:c.value,[`${a}--readonly`]:d.value})),k=y(()=>e.name??ia(t));Hl(()=>{l==null||l.register({id:k.value,validate:w,reset:b,resetValidation:p})}),xa(()=>{l==null||l.unregister(k.value)}),ya(async()=>{h.value.lazy||await w(!0),l==null||l.update(k.value,g.value,u.value)}),St(()=>h.value.input,()=>{de(s,()=>{if(s.value!=null)w();else if(e.focused){const C=de(()=>e.focused,H=>{H||w(),C()})}})}),St(()=>h.value.blur,()=>{de(()=>e.focused,C=>{C||w()})}),de(g,()=>{l==null||l.update(k.value,g.value,u.value)});function b(){n.value=null,ze(p)}function p(){o.value=!0,h.value.lazy?i.value=[]:w(!0)}async function w(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const H=[];f.value=!0;for(const B of e.rules){if(H.length>=+(e.maxErrors??1))break;const x=await(typeof B=="function"?B:()=>B)(s.value);if(x!==!0){if(x!==!1&&typeof x!="string"){console.warn(`${x} is not a valid value. Rule functions must return boolean true or a string.`);continue}H.push(x||"")}}return i.value=H,f.value=!1,o.value=C,i.value}return{errorMessages:u,isDirty:r,isDisabled:c,isReadonly:d,isPristine:o,isValid:g,isValidating:f,reset:b,resetValidation:p,validate:w,validationClasses:v}}const Dt=P({id:String,appendIcon:be,centerAffix:{type:Boolean,default:!0},prependIcon:be,hideDetails:[Boolean,String],hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":rt(),"onClick:append":rt(),...ce(),...na(),...Oh()},"VInput"),da=j()({name:"VInput",props:{...Dt()},emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:t,slots:n,emit:s}=a;const{densityClasses:l}=ba(e),{rtlClasses:i}=ra(),{InputIcon:o}=Rh(e),r=ka(),c=y(()=>e.id||`input-${r}`),d=y(()=>`${c.value}-messages`),{errorMessages:u,isDirty:h,isDisabled:g,isReadonly:f,isPristine:v,isValid:k,isValidating:b,reset:p,resetValidation:w,validate:C,validationClasses:H}=zh(e,"v-input",c),B=y(()=>({id:c,messagesId:d,isDirty:h,isDisabled:g,isReadonly:f,isPristine:v,isValid:k,isValidating:b,reset:p,resetValidation:w,validate:C})),I=y(()=>{var x;return(x=e.errorMessages)!=null&&x.length||!v.value&&u.value.length?u.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages});return ae(()=>{var D,q,U,_;const x=!!(n.prepend||e.prependIcon),L=!!(n.append||e.appendIcon),T=I.value.length>0,E=!e.hideDetails||e.hideDetails==="auto"&&(T||!!n.details);return m("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix},l.value,i.value,H.value,e.class],style:e.style},[x&&m("div",{key:"prepend",class:"v-input__prepend"},[(D=n.prepend)==null?void 0:D.call(n,B.value),e.prependIcon&&m(o,{key:"prepend-icon",name:"prepend"},null)]),n.default&&m("div",{class:"v-input__control"},[(q=n.default)==null?void 0:q.call(n,B.value)]),L&&m("div",{key:"append",class:"v-input__append"},[e.appendIcon&&m(o,{key:"append-icon",name:"append"},null),(U=n.append)==null?void 0:U.call(n,B.value)]),E&&m("div",{class:"v-input__details"},[m(Ph,{id:d.value,active:T,messages:I.value},{message:n.message}),(_=n.details)==null?void 0:_.call(n,B.value)])])}),{reset:p,resetValidation:w,validate:C}}}),p1=P({...Dt(),...ft(qh(),["inline"])},"VCheckbox"),ll=j()({name:"VCheckbox",inheritAttrs:!1,props:p1(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,a){let{attrs:t,slots:n}=a;const s=xe(e,"modelValue"),{isFocused:l,focus:i,blur:o}=Ut(e),r=ka(),c=y(()=>e.id||`checkbox-${r}`);return ae(()=>{const[d,u]=mn(t),[h,g]=da.filterProps(e),[f,v]=Pn.filterProps(e);return m(da,ie({class:["v-checkbox",e.class]},d,h,{modelValue:s.value,"onUpdate:modelValue":k=>s.value=k,id:c.value,focused:l.value,style:e.style}),{...n,default:k=>{let{id:b,messagesId:p,isDisabled:w,isReadonly:C}=k;return m(Pn,ie(f,{id:b.value,"aria-describedby":p.value,disabled:w.value,readonly:C.value},u,{modelValue:s.value,"onUpdate:modelValue":H=>s.value=H,onFocus:i,onBlur:o}),n)}})}),{}}});const y1=P({start:Boolean,end:Boolean,icon:be,image:String,...ce(),...na(),...Qe(),...Ht(),...Le(),...De(),...Ua({variant:"flat"})},"VAvatar"),_t=j()({name:"VAvatar",props:y1(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{colorClasses:s,colorStyles:l,variantClasses:i}=pn(e),{densityClasses:o}=ba(e),{roundedClasses:r}=$e(e),{sizeClasses:c,sizeStyles:d}=jn(e);return ae(()=>m(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},n.value,s.value,o.value,r.value,c.value,i.value,e.class],style:[l.value,d.value,e.style]},{default:()=>{var u;return[e.image?m(un,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?m(Re,{key:"icon",icon:e.icon},null):(u=t.default)==null?void 0:u.call(t),vn(!1,"v-avatar")]}})),{}}});const _h=Symbol.for("vuetify:v-chip-group"),k1=P({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:hn},...ce(),...Kn({selectedClass:"v-chip--selected"}),...Le(),...De(),...Ua({variant:"tonal"})},"VChipGroup"),b1=j()({name:"VChipGroup",props:k1(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{isSelected:s,select:l,next:i,prev:o,selected:r}=yn(e,_h);return Xe({VChip:{color:Z(e,"color"),disabled:Z(e,"disabled"),filter:Z(e,"filter"),variant:Z(e,"variant")}}),ae(()=>m(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style},{default:()=>{var c;return[(c=t.default)==null?void 0:c.call(t,{isSelected:s,select:l,next:i,prev:o,selected:r.value})]}})),{}}}),w1=P({activeClass:String,appendAvatar:String,appendIcon:be,closable:Boolean,closeIcon:{type:be,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:be,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:rt(),onClickOnce:rt(),...Fa(),...ce(),...na(),...ta(),...Jn(),...Qe(),...Ps(),...Ht(),...Le({tag:"span"}),...De(),...Ua({variant:"tonal"})},"VChip"),Ns=j()({name:"VChip",directives:{Ripple:Qt},props:w1(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const{t:l}=_a(),{borderClasses:i}=Qa(e),{colorClasses:o,colorStyles:r,variantClasses:c}=pn(e),{densityClasses:d}=ba(e),{elevationClasses:u}=ua(e),{roundedClasses:h}=$e(e),{sizeClasses:g}=jn(e),{themeClasses:f}=qe(e),v=xe(e,"modelValue"),k=$n(e,_h,!1),b=Rs(e,t),p=y(()=>e.link!==!1&&b.isLink.value),w=y(()=>!e.disabled&&e.link!==!1&&(!!k||e.link||b.isClickable.value)),C=y(()=>({"aria-label":l(e.closeLabel),onClick(I){I.stopPropagation(),v.value=!1,n("click:close",I)}}));function H(I){var x;n("click",I),w.value&&((x=b.navigate)==null||x.call(b,I),k==null||k.toggle())}function B(I){(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),H(I))}return()=>{const I=b.isLink.value?"a":e.tag,x=!!(e.appendIcon||e.appendAvatar),L=!!(x||s.append),T=!!(s.close||e.closable),E=!!(s.filter||e.filter)&&k,D=!!(e.prependIcon||e.prependAvatar),q=!!(D||s.prepend),U=!k||k.isSelected.value;return v.value&&Je(m(I,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":w.value,"v-chip--filter":E,"v-chip--pill":e.pill},f.value,i.value,U?o.value:void 0,d.value,u.value,h.value,g.value,c.value,k==null?void 0:k.selectedClass.value,e.class],style:[U?r.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:b.href.value,tabindex:w.value?0:void 0,onClick:H,onKeydown:w.value&&!p.value&&B},{default:()=>{var _;return[vn(w.value,"v-chip"),E&&m(lr,{key:"filter"},{default:()=>[Je(m("div",{class:"v-chip__filter"},[s.filter?m(Ne,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},s.filter):m(Re,{key:"filter-icon",icon:e.filterIcon},null)]),[[gt,k.isSelected.value]])]}),q&&m("div",{key:"prepend",class:"v-chip__prepend"},[s.prepend?m(Ne,{key:"prepend-defaults",disabled:!D,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},s.prepend):m(ve,null,[e.prependIcon&&m(Re,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&m(_t,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),m("div",{class:"v-chip__content"},[((_=s.default)==null?void 0:_.call(s,{isSelected:k==null?void 0:k.isSelected.value,selectedClass:k==null?void 0:k.selectedClass.value,select:k==null?void 0:k.select,toggle:k==null?void 0:k.toggle,value:k==null?void 0:k.value.value,disabled:e.disabled}))??e.text]),L&&m("div",{key:"append",class:"v-chip__append"},[s.append?m(Ne,{key:"append-defaults",disabled:!x,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},s.append):m(ve,null,[e.appendIcon&&m(Re,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&m(_t,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),T&&m("div",ie({key:"close",class:"v-chip__close"},C.value),[s.close?m(Ne,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},s.close):m(Re,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Ga("ripple"),w.value&&e.ripple,null]])}}});const Yi=Symbol.for("vuetify:list");function Wh(){const e=He(Yi,{hasPrepend:re(!1),updateHasPrepend:()=>null}),a={hasPrepend:re(!1),updateHasPrepend:t=>{t&&(a.hasPrepend.value=t)}};return je(Yi,a),e}function Vh(){return He(Yi,null)}const M1={open:e=>{let{id:a,value:t,opened:n,parents:s}=e;if(t){const l=new Set;l.add(a);let i=s.get(a);for(;i!=null;)l.add(i),i=s.get(i);return l}else return n.delete(a),n},select:()=>null},Qh={open:e=>{let{id:a,value:t,opened:n,parents:s}=e;if(t){let l=s.get(a);for(n.add(a);l!=null&&l!==a;)n.add(l),l=s.get(l);return n}else n.delete(a);return n},select:()=>null},x1={open:Qh.open,select:e=>{let{id:a,value:t,opened:n,parents:s}=e;if(!t)return n;const l=[];let i=s.get(a);for(;i!=null;)l.push(i),i=s.get(i);return new Set(l)}},fr=e=>{const a={select:t=>{let{id:n,value:s,selected:l}=t;if(n=Ce(n),e&&!s){const i=Array.from(l.entries()).reduce((o,r)=>{let[c,d]=r;return d==="on"?[...o,c]:o},[]);if(i.length===1&&i[0]===n)return l}return l.set(n,s?"on":"off"),l},in:(t,n,s)=>{let l=new Map;for(const i of t||[])l=a.select({id:i,value:!0,selected:new Map(l),children:n,parents:s});return l},out:t=>{const n=[];for(const[s,l]of t.entries())l==="on"&&n.push(s);return n}};return a},Uh=e=>{const a=fr(e);return{select:n=>{let{selected:s,id:l,...i}=n;l=Ce(l);const o=s.has(l)?new Map([[l,s.get(l)]]):new Map;return a.select({...i,id:l,selected:o})},in:(n,s,l)=>{let i=new Map;return n!=null&&n.length&&(i=a.in(n.slice(0,1),s,l)),i},out:(n,s,l)=>a.out(n,s,l)}},S1=e=>{const a=fr(e);return{select:n=>{let{id:s,selected:l,children:i,...o}=n;return s=Ce(s),i.has(s)?l:a.select({id:s,selected:l,children:i,...o})},in:a.in,out:a.out}},L1=e=>{const a=Uh(e);return{select:n=>{let{id:s,selected:l,children:i,...o}=n;return s=Ce(s),i.has(s)?l:a.select({id:s,selected:l,children:i,...o})},in:a.in,out:a.out}},A1=e=>{const a={select:t=>{let{id:n,value:s,selected:l,children:i,parents:o}=t;n=Ce(n);const r=new Map(l),c=[n];for(;c.length;){const u=c.shift();l.set(u,s?"on":"off"),i.has(u)&&c.push(...i.get(u))}let d=o.get(n);for(;d;){const u=i.get(d),h=u.every(f=>l.get(f)==="on"),g=u.every(f=>!l.has(f)||l.get(f)==="off");l.set(d,h?"on":g?"off":"indeterminate"),d=o.get(d)}return e&&!s&&Array.from(l.entries()).reduce((h,g)=>{let[f,v]=g;return v==="on"?[...h,f]:h},[]).length===0?r:l},in:(t,n,s)=>{let l=new Map;for(const i of t||[])l=a.select({id:i,value:!0,selected:new Map(l),children:n,parents:s});return l},out:(t,n)=>{const s=[];for(const[l,i]of t.entries())i==="on"&&!n.has(l)&&s.push(l);return s}};return a},Ds=Symbol.for("vuetify:nested"),Kh={id:re(),root:{register:()=>null,unregister:()=>null,parents:se(new Map),children:se(new Map),open:()=>null,openOnSelect:()=>null,select:()=>null,opened:se(new Set),selected:se(new Map),selectedValues:se([])}},C1=P({selectStrategy:[String,Function],openStrategy:[String,Object],opened:Array,selected:Array,mandatory:Boolean},"nested"),I1=e=>{let a=!1;const t=se(new Map),n=se(new Map),s=xe(e,"opened",e.opened,u=>new Set(u),u=>[...u.values()]),l=y(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;switch(e.selectStrategy){case"single-leaf":return L1(e.mandatory);case"leaf":return S1(e.mandatory);case"independent":return fr(e.mandatory);case"single-independent":return Uh(e.mandatory);case"classic":default:return A1(e.mandatory)}}),i=y(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return x1;case"single":return M1;case"multiple":default:return Qh}}),o=xe(e,"selected",e.selected,u=>l.value.in(u,t.value,n.value),u=>l.value.out(u,t.value,n.value));xa(()=>{a=!0});function r(u){const h=[];let g=u;for(;g!=null;)h.unshift(g),g=n.value.get(g);return h}const c=oa("nested"),d={id:re(),root:{opened:s,selected:o,selectedValues:y(()=>{const u=[];for(const[h,g]of o.value.entries())g==="on"&&u.push(h);return u}),register:(u,h,g)=>{h&&u!==h&&n.value.set(u,h),g&&t.value.set(u,[]),h!=null&&t.value.set(h,[...t.value.get(h)||[],u])},unregister:u=>{if(a)return;t.value.delete(u);const h=n.value.get(u);if(h){const g=t.value.get(h)??[];t.value.set(h,g.filter(f=>f!==u))}n.value.delete(u),s.value.delete(u)},open:(u,h,g)=>{c.emit("click:open",{id:u,value:h,path:r(u),event:g});const f=i.value.open({id:u,value:h,opened:new Set(s.value),children:t.value,parents:n.value,event:g});f&&(s.value=f)},openOnSelect:(u,h,g)=>{const f=i.value.select({id:u,value:h,selected:new Map(o.value),opened:new Set(s.value),children:t.value,parents:n.value,event:g});f&&(s.value=f)},select:(u,h,g)=>{c.emit("click:select",{id:u,value:h,path:r(u),event:g});const f=l.value.select({id:u,value:h,selected:new Map(o.value),children:t.value,parents:n.value,event:g});f&&(o.value=f),d.root.openOnSelect(u,h,g)},children:t,parents:n}};return je(Ds,d),d.root},Jh=(e,a)=>{const t=He(Ds,Kh),n=Symbol(ka()),s=y(()=>e.value!==void 0?e.value:n),l={...t,id:s,open:(i,o)=>t.root.open(s.value,i,o),openOnSelect:(i,o)=>t.root.openOnSelect(s.value,i,o),isOpen:y(()=>t.root.opened.value.has(s.value)),parent:y(()=>t.root.parents.value.get(s.value)),select:(i,o)=>t.root.select(s.value,i,o),isSelected:y(()=>t.root.selected.value.get(Ce(s.value))==="on"),isIndeterminate:y(()=>t.root.selected.value.get(s.value)==="indeterminate"),isLeaf:y(()=>!t.root.children.value.get(s.value)),isGroupActivator:t.isGroupActivator};return!t.isGroupActivator&&t.root.register(s.value,t.id.value,a),xa(()=>{!t.isGroupActivator&&t.root.unregister(s.value)}),a&&je(Ds,l),l},T1=()=>{const e=He(Ds,Kh);je(Ds,{...e,isGroupActivator:!0})},B1=za({name:"VListGroupActivator",setup(e,a){let{slots:t}=a;return T1(),()=>{var n;return(n=t.default)==null?void 0:n.call(t)}}}),H1=P({activeColor:String,baseColor:String,color:String,collapseIcon:{type:be,default:"$collapse"},expandIcon:{type:be,default:"$expand"},prependIcon:be,appendIcon:be,fluid:Boolean,subgroup:Boolean,title:String,value:null,...ce(),...Le()},"VListGroup"),Zi=j()({name:"VListGroup",props:H1(),setup(e,a){let{slots:t}=a;const{isOpen:n,open:s,id:l}=Jh(Z(e,"value"),!0),i=y(()=>`v-list-group--id-${String(l.value)}`),o=Vh(),{isBooted:r}=fn();function c(g){s(!n.value,g)}const d=y(()=>({onClick:c,class:"v-list-group__header",id:i.value})),u=y(()=>n.value?e.collapseIcon:e.expandIcon),h=y(()=>({VListItem:{active:n.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&u.value,appendIcon:e.appendIcon||!e.subgroup&&u.value,title:e.title,value:e.value}}));return ae(()=>m(e.tag,{class:["v-list-group",{"v-list-group--prepend":o==null?void 0:o.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":n.value},e.class],style:e.style},{default:()=>[t.activator&&m(Ne,{defaults:h.value},{default:()=>[m(B1,null,{default:()=>[t.activator({props:d.value,isOpen:n.value})]})]}),m(Ya,{transition:{component:Pl},disabled:!r.value},{default:()=>{var g;return[Je(m("div",{class:"v-list-group__items",role:"group","aria-labelledby":i.value},[(g=t.default)==null?void 0:g.call(t)]),[[gt,n.value]])]}})]})),{}}});const vr=at("v-list-item-subtitle"),$h=at("v-list-item-title"),D1=P({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:be,baseColor:String,disabled:Boolean,lines:String,link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:be,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number,Boolean],title:[String,Number,Boolean],value:null,onClick:rt(),onClickOnce:rt(),...Fa(),...ce(),...na(),...Wa(),...ta(),...Qe(),...Ps(),...Le(),...De(),...Ua({variant:"text"})},"VListItem"),ht=j()({name:"VListItem",directives:{Ripple:Qt},props:D1(),emits:{click:e=>!0},setup(e,a){let{attrs:t,slots:n,emit:s}=a;const l=Rs(e,t),i=y(()=>e.value===void 0?l.href.value:e.value),{select:o,isSelected:r,isIndeterminate:c,isGroupActivator:d,root:u,parent:h,openOnSelect:g}=Jh(i,!1),f=Vh(),v=y(()=>{var z;return e.active!==!1&&(e.active||((z=l.isActive)==null?void 0:z.value)||r.value)}),k=y(()=>e.link!==!1&&l.isLink.value),b=y(()=>!e.disabled&&e.link!==!1&&(e.link||l.isClickable.value||e.value!=null&&!!f)),p=y(()=>e.rounded||e.nav),w=y(()=>e.color??e.activeColor),C=y(()=>({color:v.value?w.value??e.baseColor:e.baseColor,variant:e.variant}));de(()=>{var z;return(z=l.isActive)==null?void 0:z.value},z=>{z&&h.value!=null&&u.open(h.value,!0),z&&g(z)},{immediate:!0});const{themeClasses:H}=qe(e),{borderClasses:B}=Qa(e),{colorClasses:I,colorStyles:x,variantClasses:L}=pn(C),{densityClasses:T}=ba(e),{dimensionStyles:E}=Va(e),{elevationClasses:D}=ua(e),{roundedClasses:q}=$e(p),U=y(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),_=y(()=>({isActive:v.value,select:o,isSelected:r.value,isIndeterminate:c.value}));function J(z){var ee;s("click",z),!(d||!b.value)&&((ee=l.navigate)==null||ee.call(l,z),e.value!=null&&o(!r.value,z))}function K(z){(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),J(z))}return ae(()=>{const z=k.value?"a":e.tag,ee=n.title||e.title,Q=n.subtitle||e.subtitle,te=!!(e.appendAvatar||e.appendIcon),he=!!(te||n.append),we=!!(e.prependAvatar||e.prependIcon),ke=!!(we||n.prepend);return f==null||f.updateHasPrepend(ke),e.activeColor&&s5("active-color",["color","base-color"]),Je(m(z,{class:["v-list-item",{"v-list-item--active":v.value,"v-list-item--disabled":e.disabled,"v-list-item--link":b.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!ke&&(f==null?void 0:f.hasPrepend.value),[`${e.activeClass}`]:e.activeClass&&v.value},H.value,B.value,I.value,T.value,D.value,U.value,q.value,L.value,e.class],style:[x.value,E.value,e.style],href:l.href.value,tabindex:b.value?f?-2:0:void 0,title:e.title,onClick:J,onKeydown:b.value&&!k.value&&K},{default:()=>{var Ie;return[vn(b.value||v.value,"v-list-item"),ke&&m("div",{key:"prepend",class:"v-list-item__prepend"},[n.prepend?m(Ne,{key:"prepend-defaults",disabled:!we,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var $;return[($=n.prepend)==null?void 0:$.call(n,_.value)]}}):m(ve,null,[e.prependAvatar&&m(_t,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&m(Re,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),m("div",{class:"v-list-item__content","data-no-activator":""},[ee&&m($h,{key:"title"},{default:()=>{var $;return[(($=n.title)==null?void 0:$.call(n,{title:e.title}))??e.title]}}),Q&&m(vr,{key:"subtitle"},{default:()=>{var $;return[(($=n.subtitle)==null?void 0:$.call(n,{subtitle:e.subtitle}))??e.subtitle]}}),(Ie=n.default)==null?void 0:Ie.call(n,_.value)]),he&&m("div",{key:"append",class:"v-list-item__append"},[n.append?m(Ne,{key:"append-defaults",disabled:!te,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var $;return[($=n.append)==null?void 0:$.call(n,_.value)]}}):m(ve,null,[e.appendIcon&&m(Re,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&m(_t,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])]}}),[[Ga("ripple"),b.value&&e.ripple]])}),{}}}),G1=P({color:String,inset:Boolean,sticky:Boolean,title:String,...ce(),...Le()},"VListSubheader"),jh=j()({name:"VListSubheader",props:G1(),setup(e,a){let{slots:t}=a;const{textColorClasses:n,textColorStyles:s}=pa(Z(e,"color"));return ae(()=>{const l=!!(t.default||e.title);return m(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},n.value,e.class],style:[{textColorStyles:s},e.style]},{default:()=>{var i;return[l&&m("div",{class:"v-list-subheader__text"},[((i=t.default)==null?void 0:i.call(t))??e.title])]}})}),{}}});const E1=P({color:String,inset:Boolean,length:[Number,String],thickness:[Number,String],vertical:Boolean,...ce(),...De()},"VDivider"),bl=j()({name:"VDivider",props:E1(),setup(e,a){let{attrs:t}=a;const{themeClasses:n}=qe(e),{textColorClasses:s,textColorStyles:l}=pa(Z(e,"color")),i=y(()=>{const o={};return e.length&&(o[e.vertical?"maxHeight":"maxWidth"]=ue(e.length)),e.thickness&&(o[e.vertical?"borderRightWidth":"borderTopWidth"]=ue(e.thickness)),o});return ae(()=>m("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},n.value,s.value,e.class],style:[i.value,l.value,e.style],"aria-orientation":!t.role||t.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${t.role||"separator"}`},null)),{}}}),F1=P({items:Array},"VListChildren"),Yh=j()({name:"VListChildren",props:F1(),setup(e,a){let{slots:t}=a;return Wh(),()=>{var n,s;return((n=t.default)==null?void 0:n.call(t))??((s=e.items)==null?void 0:s.map(l=>{var g,f;let{children:i,props:o,type:r,raw:c}=l;if(r==="divider")return((g=t.divider)==null?void 0:g.call(t,{props:o}))??m(bl,o,null);if(r==="subheader")return((f=t.subheader)==null?void 0:f.call(t,{props:o}))??m(jh,o,null);const d={subtitle:t.subtitle?v=>{var k;return(k=t.subtitle)==null?void 0:k.call(t,{...v,item:c})}:void 0,prepend:t.prepend?v=>{var k;return(k=t.prepend)==null?void 0:k.call(t,{...v,item:c})}:void 0,append:t.append?v=>{var k;return(k=t.append)==null?void 0:k.call(t,{...v,item:c})}:void 0,title:t.title?v=>{var k;return(k=t.title)==null?void 0:k.call(t,{...v,item:c})}:void 0},[u,h]=Zi.filterProps(o);return i?m(Zi,ie({value:o==null?void 0:o.value},u),{activator:v=>{let{props:k}=v;return t.header?t.header({props:{...o,...k}}):m(ht,ie(o,k),d)},default:()=>m(Yh,{items:i},t)}):t.item?t.item({props:o}):m(ht,o,d)}))}}}),Zh=P({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean},"list-items");function Cn(e,a){const t=fa(a,e.itemTitle,a),n=e.returnObject?a:fa(a,e.itemValue,t),s=fa(a,e.itemChildren),l=e.itemProps===!0?typeof a=="object"&&a!=null&&!Array.isArray(a)?"children"in a?Vn(a,["children"])[1]:a:void 0:fa(a,e.itemProps),i={title:t,value:n,...l};return{title:String(i.title??""),value:i.value,props:i,children:Array.isArray(s)?Xh(e,s):void 0,raw:a}}function Xh(e,a){const t=[];for(const n of a)t.push(Cn(e,n));return t}function pr(e){const a=y(()=>Xh(e,e.items));return q1(a,t=>Cn(e,t))}function q1(e,a){function t(s){return s.filter(l=>l!==null||e.value.some(i=>i.value===null)).map(l=>e.value.find(o=>hn(l,o.value))??a(l))}function n(s){return s.map(l=>{let{value:i}=l;return i})}return{items:e,transformIn:t,transformOut:n}}function R1(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function P1(e,a){const t=fa(a,e.itemType,"item"),n=R1(a)?a:fa(a,e.itemTitle),s=fa(a,e.itemValue,void 0),l=fa(a,e.itemChildren),i=e.itemProps===!0?Vn(a,["children"])[1]:fa(a,e.itemProps),o={title:n,value:s,...i};return{type:t,title:o.title,value:o.value,props:o,children:t==="item"&&l?em(e,l):void 0,raw:a}}function em(e,a){const t=[];for(const n of a)t.push(P1(e,n));return t}function N1(e){return{items:y(()=>em(e,e.items))}}const O1=P({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,lines:{type:[Boolean,String],default:"one"},nav:Boolean,...C1({selectStrategy:"single-leaf",openStrategy:"list"}),...Fa(),...ce(),...na(),...Wa(),...ta(),itemType:{type:String,default:"type"},...Zh(),...Qe(),...Le(),...De(),...Ua({variant:"text"})},"VList"),Vl=j()({name:"VList",props:O1(),emits:{"update:selected":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:select":e=>!0},setup(e,a){let{slots:t}=a;const{items:n}=N1(e),{themeClasses:s}=qe(e),{backgroundColorClasses:l,backgroundColorStyles:i}=ea(Z(e,"bgColor")),{borderClasses:o}=Qa(e),{densityClasses:r}=ba(e),{dimensionStyles:c}=Va(e),{elevationClasses:d}=ua(e),{roundedClasses:u}=$e(e),{open:h,select:g}=I1(e),f=y(()=>e.lines?`v-list--${e.lines}-line`:void 0),v=Z(e,"activeColor"),k=Z(e,"baseColor"),b=Z(e,"color");Wh(),Xe({VListGroup:{activeColor:v,baseColor:k,color:b},VListItem:{activeClass:Z(e,"activeClass"),activeColor:v,baseColor:k,color:b,density:Z(e,"density"),disabled:Z(e,"disabled"),lines:Z(e,"lines"),nav:Z(e,"nav"),variant:Z(e,"variant")}});const p=re(!1),w=se();function C(L){p.value=!0}function H(L){p.value=!1}function B(L){var T;!p.value&&!(L.relatedTarget&&((T=w.value)!=null&&T.contains(L.relatedTarget)))&&x()}function I(L){if(w.value){if(L.key==="ArrowDown")x("next");else if(L.key==="ArrowUp")x("prev");else if(L.key==="Home")x("first");else if(L.key==="End")x("last");else return;L.preventDefault()}}function x(L){if(w.value)return fl(w.value,L)}return ae(()=>m(e.tag,{ref:w,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav},s.value,l.value,o.value,r.value,d.value,f.value,u.value,e.class],style:[i.value,c.value,e.style],tabindex:e.disabled||p.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:C,onFocusout:H,onFocus:B,onKeydown:I},{default:()=>[m(Yh,{items:n.value},t)]})),{open:h,select:g,focus:x}}}),z1=at("v-list-img"),_1=P({start:Boolean,end:Boolean,...ce(),...Le()},"VListItemAction"),W1=j()({name:"VListItemAction",props:_1(),setup(e,a){let{slots:t}=a;return ae(()=>m(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},t)),{}}}),V1=P({start:Boolean,end:Boolean,...ce(),...Le()},"VListItemMedia"),Q1=j()({name:"VListItemMedia",props:V1(),setup(e,a){let{slots:t}=a;return ae(()=>m(e.tag,{class:["v-list-item-media",{"v-list-item-media--start":e.start,"v-list-item-media--end":e.end},e.class],style:e.style},t)),{}}});function ui(e,a){return{x:e.x+a.x,y:e.y+a.y}}function U1(e,a){return{x:e.x-a.x,y:e.y-a.y}}function ed(e,a){if(e.side==="top"||e.side==="bottom"){const{side:t,align:n}=e,s=n==="left"?0:n==="center"?a.width/2:n==="right"?a.width:n,l=t==="top"?0:t==="bottom"?a.height:t;return ui({x:s,y:l},a)}else if(e.side==="left"||e.side==="right"){const{side:t,align:n}=e,s=t==="left"?0:t==="right"?a.width:t,l=n==="top"?0:n==="center"?a.height/2:n==="bottom"?a.height:n;return ui({x:s,y:l},a)}return ui({x:a.width/2,y:a.height/2},a)}const am={static:$1,connected:Y1},K1=P({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in am},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function J1(e,a){const t=se({}),n=se();Ke&&(St(()=>!!(a.isActive.value&&e.locationStrategy),l=>{var i,o;de(()=>e.locationStrategy,l),Aa(()=>{n.value=void 0}),typeof e.locationStrategy=="function"?n.value=(i=e.locationStrategy(a,e,t))==null?void 0:i.updateLocation:n.value=(o=am[e.locationStrategy](a,e,t))==null?void 0:o.updateLocation}),window.addEventListener("resize",s,{passive:!0}),Aa(()=>{window.removeEventListener("resize",s),n.value=void 0}));function s(l){var i;(i=n.value)==null||i.call(n,l)}return{contentStyles:t,updateLocation:n}}function $1(){}function j1(e,a){a?e.style.removeProperty("left"):e.style.removeProperty("right");const t=$o(e);return a?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function Y1(e,a,t){w5(e.activatorEl.value)&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:s,preferredOrigin:l}=Uo(()=>{const f=Ri(a.location,e.isRtl.value),v=a.origin==="overlap"?f:a.origin==="auto"?oi(f):Ri(a.origin,e.isRtl.value);return f.side===v.side&&f.align===ri(v).align?{preferredAnchor:Sc(f),preferredOrigin:Sc(v)}:{preferredAnchor:f,preferredOrigin:v}}),[i,o,r,c]=["minWidth","minHeight","maxWidth","maxHeight"].map(f=>y(()=>{const v=parseFloat(a[f]);return isNaN(v)?1/0:v})),d=y(()=>{if(Array.isArray(a.offset))return a.offset;if(typeof a.offset=="string"){const f=a.offset.split(" ").map(parseFloat);return f.length<2&&f.push(0),f}return typeof a.offset=="number"?[a.offset,0]:[0,0]});let u=!1;const h=new ResizeObserver(()=>{u&&g()});de([e.activatorEl,e.contentEl],(f,v)=>{let[k,b]=f,[p,w]=v;p&&h.unobserve(p),k&&h.observe(k),w&&h.unobserve(w),b&&h.observe(b)},{immediate:!0}),Aa(()=>{h.disconnect()});function g(){if(u=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>u=!0)}),!e.activatorEl.value||!e.contentEl.value)return;const f=e.activatorEl.value.getBoundingClientRect(),v=j1(e.contentEl.value,e.isRtl.value),k=pl(e.contentEl.value),b=12;k.length||(k.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(v.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),v.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const p=k.reduce((E,D)=>{const q=D.getBoundingClientRect(),U=new Dn({x:D===document.documentElement?0:q.x,y:D===document.documentElement?0:q.y,width:D.clientWidth,height:D.clientHeight});return E?new Dn({x:Math.max(E.left,U.left),y:Math.max(E.top,U.top),width:Math.min(E.right,U.right)-Math.max(E.left,U.left),height:Math.min(E.bottom,U.bottom)-Math.max(E.top,U.top)}):U},void 0);p.x+=b,p.y+=b,p.width-=b*2,p.height-=b*2;let w={anchor:s.value,origin:l.value};function C(E){const D=new Dn(v),q=ed(E.anchor,f),U=ed(E.origin,D);let{x:_,y:J}=U1(q,U);switch(E.anchor.side){case"top":J-=d.value[0];break;case"bottom":J+=d.value[0];break;case"left":_-=d.value[0];break;case"right":_+=d.value[0];break}switch(E.anchor.align){case"top":J-=d.value[1];break;case"bottom":J+=d.value[1];break;case"left":_-=d.value[1];break;case"right":_+=d.value[1];break}return D.x+=_,D.y+=J,D.width=Math.min(D.width,r.value),D.height=Math.min(D.height,c.value),{overflows:Ac(D,p),x:_,y:J}}let H=0,B=0;const I={x:0,y:0},x={x:!1,y:!1};let L=-1;for(;!(L++>10);){const{x:E,y:D,overflows:q}=C(w);H+=E,B+=D,v.x+=E,v.y+=D;{const U=Lc(w.anchor),_=q.x.before||q.x.after,J=q.y.before||q.y.after;let K=!1;if(["x","y"].forEach(z=>{if(z==="x"&&_&&!x.x||z==="y"&&J&&!x.y){const ee={anchor:{...w.anchor},origin:{...w.origin}},Q=z==="x"?U==="y"?ri:oi:U==="y"?oi:ri;ee.anchor=Q(ee.anchor),ee.origin=Q(ee.origin);const{overflows:te}=C(ee);(te[z].before<=q[z].before&&te[z].after<=q[z].after||te[z].before+te[z].after<(q[z].before+q[z].after)/2)&&(w=ee,K=x[z]=!0)}}),K)continue}q.x.before&&(H+=q.x.before,v.x+=q.x.before),q.x.after&&(H-=q.x.after,v.x-=q.x.after),q.y.before&&(B+=q.y.before,v.y+=q.y.before),q.y.after&&(B-=q.y.after,v.y-=q.y.after);{const U=Ac(v,p);I.x=p.width-U.x.before-U.x.after,I.y=p.height-U.y.before-U.y.after,H+=U.x.before,v.x+=U.x.before,B+=U.y.before,v.y+=U.y.before}break}const T=Lc(w.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${w.anchor.side} ${w.anchor.align}`,transformOrigin:`${w.origin.side} ${w.origin.align}`,top:ue(hi(B)),left:e.isRtl.value?void 0:ue(hi(H)),right:e.isRtl.value?ue(hi(-H)):void 0,minWidth:ue(T==="y"?Math.min(i.value,f.width):i.value),maxWidth:ue(ad(va(I.x,i.value===1/0?0:i.value,r.value))),maxHeight:ue(ad(va(I.y,o.value===1/0?0:o.value,c.value)))}),{available:I,contentBox:v}}return de(()=>[s.value,l.value,a.offset,a.minWidth,a.minHeight,a.maxWidth,a.maxHeight],()=>g()),ze(()=>{const f=g();if(!f)return;const{available:v,contentBox:k}=f;k.height>v.y&&requestAnimationFrame(()=>{g(),requestAnimationFrame(()=>{g()})})}),{updateLocation:g}}function hi(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function ad(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let Xi=!0;const wl=[];function Z1(e){!Xi||wl.length?(wl.push(e),eo()):(Xi=!1,e(),eo())}let td=-1;function eo(){cancelAnimationFrame(td),td=requestAnimationFrame(()=>{const e=wl.shift();e&&e(),wl.length?eo():Xi=!0})}const il={none:null,close:a2,block:t2,reposition:n2},X1=P({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in il}},"VOverlay-scroll-strategies");function e2(e,a){if(!Ke)return;let t;Da(async()=>{t==null||t.stop(),a.isActive.value&&e.scrollStrategy&&(t=xo(),await ze(),t.active&&t.run(()=>{var n;typeof e.scrollStrategy=="function"?e.scrollStrategy(a,e,t):(n=il[e.scrollStrategy])==null||n.call(il,a,e,t)}))}),Aa(()=>{t==null||t.stop()})}function a2(e){function a(t){e.isActive.value=!1}tm(e.activatorEl.value??e.contentEl.value,a)}function t2(e,a){var i;const t=(i=e.root.value)==null?void 0:i.offsetParent,n=[...new Set([...pl(e.activatorEl.value,a.contained?t:void 0),...pl(e.contentEl.value,a.contained?t:void 0)])].filter(o=>!o.classList.contains("v-overlay-scroll-blocked")),s=window.innerWidth-document.documentElement.offsetWidth,l=(o=>Xo(o)&&o)(t||document.documentElement);l&&e.root.value.classList.add("v-overlay--scroll-blocked"),n.forEach((o,r)=>{o.style.setProperty("--v-body-scroll-x",ue(-o.scrollLeft)),o.style.setProperty("--v-body-scroll-y",ue(-o.scrollTop)),o!==document.documentElement&&o.style.setProperty("--v-scrollbar-offset",ue(s)),o.classList.add("v-overlay-scroll-blocked")}),Aa(()=>{n.forEach((o,r)=>{const c=parseFloat(o.style.getPropertyValue("--v-body-scroll-x")),d=parseFloat(o.style.getPropertyValue("--v-body-scroll-y"));o.style.removeProperty("--v-body-scroll-x"),o.style.removeProperty("--v-body-scroll-y"),o.style.removeProperty("--v-scrollbar-offset"),o.classList.remove("v-overlay-scroll-blocked"),o.scrollLeft=-c,o.scrollTop=-d}),l&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function n2(e,a,t){let n=!1,s=-1,l=-1;function i(o){Z1(()=>{var d,u;const r=performance.now();(u=(d=e.updateLocation).value)==null||u.call(d,o),n=(performance.now()-r)/(1e3/60)>2})}l=(typeof requestIdleCallback>"u"?o=>o():requestIdleCallback)(()=>{t.run(()=>{tm(e.activatorEl.value??e.contentEl.value,o=>{n?(cancelAnimationFrame(s),s=requestAnimationFrame(()=>{s=requestAnimationFrame(()=>{i(o)})})):i(o)})})}),Aa(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(l),cancelAnimationFrame(s)})}function tm(e,a){const t=[document,...pl(e)];t.forEach(n=>{n.addEventListener("scroll",a,{passive:!0})}),Aa(()=>{t.forEach(n=>{n.removeEventListener("scroll",a)})})}const ao=Symbol.for("vuetify:v-menu"),nm=P({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function sm(e,a){const t={},n=s=>()=>{if(!Ke)return Promise.resolve(!0);const l=s==="openDelay";return t.closeDelay&&window.clearTimeout(t.closeDelay),delete t.closeDelay,t.openDelay&&window.clearTimeout(t.openDelay),delete t.openDelay,new Promise(i=>{const o=parseInt(e[s]??0,10);t[s]=window.setTimeout(()=>{a==null||a(l),i(l)},o)})};return{runCloseDelay:n("closeDelay"),runOpenDelay:n("openDelay")}}const s2=P({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...nm()},"VOverlay-activator");function l2(e,a){let{isActive:t,isTop:n}=a;const s=se();let l=!1,i=!1,o=!0;const r=y(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),c=y(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!r.value),{runOpenDelay:d,runCloseDelay:u}=sm(e,w=>{w===(e.openOnHover&&l||r.value&&i)&&!(e.openOnHover&&t.value&&!n.value)&&(t.value!==w&&(o=!0),t.value=w)}),h={onClick:w=>{w.stopPropagation(),s.value=w.currentTarget||w.target,t.value=!t.value},onMouseenter:w=>{var C;(C=w.sourceCapabilities)!=null&&C.firesTouchEvents||(l=!0,s.value=w.currentTarget||w.target,d())},onMouseleave:w=>{l=!1,u()},onFocus:w=>{Fn(w.target,":focus-visible")!==!1&&(i=!0,w.stopPropagation(),s.value=w.currentTarget||w.target,d())},onBlur:w=>{i=!1,w.stopPropagation(),u()}},g=y(()=>{const w={};return c.value&&(w.onClick=h.onClick),e.openOnHover&&(w.onMouseenter=h.onMouseenter,w.onMouseleave=h.onMouseleave),r.value&&(w.onFocus=h.onFocus,w.onBlur=h.onBlur),w}),f=y(()=>{const w={};if(e.openOnHover&&(w.onMouseenter=()=>{l=!0,d()},w.onMouseleave=()=>{l=!1,u()}),r.value&&(w.onFocusin=()=>{i=!0,d()},w.onFocusout=()=>{i=!1,u()}),e.closeOnContentClick){const C=He(ao,null);w.onClick=()=>{t.value=!1,C==null||C.closeParents()}}return w}),v=y(()=>{const w={};return e.openOnHover&&(w.onMouseenter=()=>{o&&(l=!0,o=!1,d())},w.onMouseleave=()=>{l=!1,u()}),w});de(n,w=>{w&&(e.openOnHover&&!l&&(!r.value||!i)||r.value&&!i&&(!e.openOnHover||!l))&&(t.value=!1)});const k=se();Da(()=>{k.value&&ze(()=>{s.value=Fi(k.value)})});const b=oa("useActivator");let p;return de(()=>!!e.activator,w=>{w&&Ke?(p=xo(),p.run(()=>{i2(e,b,{activatorEl:s,activatorEvents:g})})):p&&p.stop()},{flush:"post",immediate:!0}),Aa(()=>{p==null||p.stop()}),{activatorEl:s,activatorRef:k,activatorEvents:g,contentEvents:f,scrimEvents:v}}function i2(e,a,t){let{activatorEl:n,activatorEvents:s}=t;de(()=>e.activator,(r,c)=>{if(c&&r!==c){const d=o(c);d&&i(d)}r&&ze(()=>l())},{immediate:!0}),de(()=>e.activatorProps,()=>{l()}),Aa(()=>{i()});function l(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:o(),c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;r&&t5(r,ie(s.value,c))}function i(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:o(),c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;r&&n5(r,ie(s.value,c))}function o(){var d,u;let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,c;if(r)if(r==="parent"){let h=(u=(d=a==null?void 0:a.proxy)==null?void 0:d.$el)==null?void 0:u.parentNode;for(;h.hasAttribute("data-no-activator");)h=h.parentNode;c=h}else typeof r=="string"?c=document.querySelector(r):"$el"in r?c=r.$el:c=r;return n.value=(c==null?void 0:c.nodeType)===Node.ELEMENT_NODE?c:null,n.value}}function lm(){if(!Ke)return re(!1);const{ssr:e}=gn();if(e){const a=re(!1);return ya(()=>{a.value=!0}),a}else return re(!0)}const Ql=P({eager:Boolean},"lazy");function yr(e,a){const t=re(!1),n=y(()=>t.value||e.eager||a.value);de(a,()=>t.value=!0);function s(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:n,onAfterLeave:s}}function es(){const a=oa("useScopeId").vnode.scopeId;return{scopeId:a?{[a]:""}:void 0}}const nd=Symbol.for("vuetify:stack"),ls=Ma([]);function o2(e,a,t){const n=oa("useStack"),s=!t,l=He(nd,void 0),i=Ma({activeChildren:new Set});je(nd,i);const o=re(+a.value);St(e,()=>{var u;const d=(u=ls.at(-1))==null?void 0:u[1];o.value=d?d+10:+a.value,s&&ls.push([n.uid,o.value]),l==null||l.activeChildren.add(n.uid),Aa(()=>{if(s){const h=Ce(ls).findIndex(g=>g[0]===n.uid);ls.splice(h,1)}l==null||l.activeChildren.delete(n.uid)})});const r=re(!0);s&&Da(()=>{var u;const d=((u=ls.at(-1))==null?void 0:u[0])===n.uid;setTimeout(()=>r.value=d)});const c=y(()=>!i.activeChildren.size);return{globalTop:Fs(r),localTop:c,stackStyles:y(()=>({zIndex:o.value}))}}function r2(e){return{teleportTarget:y(()=>{const t=e.value;if(t===!0||!Ke)return;const n=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(n==null)return;let s=n.querySelector(":scope > .v-overlay-container");return s||(s=document.createElement("div"),s.className="v-overlay-container",n.appendChild(s)),s})}}function c2(){return!0}function im(e,a,t){if(!e||om(e,t)===!1)return!1;const n=eh(a);if(typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&n.host===e.target)return!1;const s=(typeof t.value=="object"&&t.value.include||(()=>[]))();return s.push(a),!s.some(l=>l==null?void 0:l.contains(e.target))}function om(e,a){return(typeof a.value=="object"&&a.value.closeConditional||c2)(e)}function d2(e,a,t){const n=typeof t.value=="function"?t.value:t.value.handler;a._clickOutside.lastMousedownWasOutside&&im(e,a,t)&&setTimeout(()=>{om(e,t)&&n&&n(e)},0)}function sd(e,a){const t=eh(e);a(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&a(t)}const rm={mounted(e,a){const t=s=>d2(s,e,a),n=s=>{e._clickOutside.lastMousedownWasOutside=im(s,e,a)};sd(e,s=>{s.addEventListener("click",t,!0),s.addEventListener("mousedown",n,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[a.instance.$.uid]={onClick:t,onMousedown:n}},unmounted(e,a){e._clickOutside&&(sd(e,t=>{var l;if(!t||!((l=e._clickOutside)!=null&&l[a.instance.$.uid]))return;const{onClick:n,onMousedown:s}=e._clickOutside[a.instance.$.uid];t.removeEventListener("click",n,!0),t.removeEventListener("mousedown",s,!0)}),delete e._clickOutside[a.instance.$.uid])}};function u2(e){const{modelValue:a,color:t,...n}=e;return m(dt,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&m("div",ie({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},n),null)]})}const Os=P({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...s2(),...ce(),...Wa(),...Ql(),...K1(),...X1(),...De(),...Bt()},"VOverlay"),At=j()({name:"VOverlay",directives:{ClickOutside:rm},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Os()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,a){let{slots:t,attrs:n,emit:s}=a;const l=xe(e,"modelValue"),i=y({get:()=>l.value,set:ee=>{ee&&e.disabled||(l.value=ee)}}),{teleportTarget:o}=r2(y(()=>e.attach||e.contained)),{themeClasses:r}=qe(e),{rtlClasses:c,isRtl:d}=ra(),{hasContent:u,onAfterLeave:h}=yr(e,i),g=ea(y(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:f,localTop:v,stackStyles:k}=o2(i,Z(e,"zIndex"),e._disableGlobalStack),{activatorEl:b,activatorRef:p,activatorEvents:w,contentEvents:C,scrimEvents:H}=l2(e,{isActive:i,isTop:v}),{dimensionStyles:B}=Va(e),I=lm(),{scopeId:x}=es();de(()=>e.disabled,ee=>{ee&&(i.value=!1)});const L=se(),T=se(),{contentStyles:E,updateLocation:D}=J1(e,{isRtl:d,contentEl:T,activatorEl:b,isActive:i});e2(e,{root:L,contentEl:T,activatorEl:b,isActive:i,updateLocation:D});function q(ee){s("click:outside",ee),e.persistent?z():i.value=!1}function U(){return i.value&&f.value}Ke&&de(i,ee=>{ee?window.addEventListener("keydown",_):window.removeEventListener("keydown",_)},{immediate:!0});function _(ee){var Q,te;ee.key==="Escape"&&f.value&&(e.persistent?z():(i.value=!1,(Q=T.value)!=null&&Q.contains(document.activeElement)&&((te=b.value)==null||te.focus())))}const J=Sh();St(()=>e.closeOnBack,()=>{Zp(J,ee=>{f.value&&i.value?(ee(!1),e.persistent?z():i.value=!1):ee()})});const K=se();de(()=>i.value&&(e.absolute||e.contained)&&o.value==null,ee=>{if(ee){const Q=Zo(L.value);Q&&Q!==document.scrollingElement&&(K.value=Q.scrollTop)}});function z(){e.noClickAnimation||T.value&&sn(T.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:Cs})}return ae(()=>{var ee;return m(ve,null,[(ee=t.activator)==null?void 0:ee.call(t,{isActive:i.value,props:ie({ref:p},w.value,e.activatorProps)}),I.value&&u.value&&m(Yf,{disabled:!o.value,to:o.value},{default:()=>[m("div",ie({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":i.value,"v-overlay--contained":e.contained},r.value,c.value,e.class],style:[k.value,{top:ue(K.value)},e.style],ref:L},x,n),[m(u2,ie({color:g,modelValue:i.value&&!!e.scrim},H.value),null),m(Ya,{appear:!0,persisted:!0,transition:e.transition,target:b.value,onAfterLeave:()=>{h(),s("afterLeave")}},{default:()=>{var Q;return[Je(m("div",ie({ref:T,class:["v-overlay__content",e.contentClass],style:[B.value,E.value]},C.value,e.contentProps),[(Q=t.default)==null?void 0:Q.call(t,{isActive:i})]),[[gt,i.value],[Ga("click-outside"),{handler:q,closeConditional:U,include:()=>[b.value]}]])]}})])]})])}),{activatorEl:b,animateClick:z,contentEl:T,globalTop:f,localTop:v,updateLocation:D}}}),mi=Symbol("Forwarded refs");function gi(e,a){let t=e;for(;t;){const n=Reflect.getOwnPropertyDescriptor(t,a);if(n)return n;t=Object.getPrototypeOf(t)}}function tt(e){for(var a=arguments.length,t=new Array(a>1?a-1:0),n=1;n<a;n++)t[n-1]=arguments[n];return e[mi]=t,new Proxy(e,{get(s,l){if(Reflect.has(s,l))return Reflect.get(s,l);if(!(typeof l=="symbol"||l.startsWith("__"))){for(const i of t)if(i.value&&Reflect.has(i.value,l)){const o=Reflect.get(i.value,l);return typeof o=="function"?o.bind(i.value):o}}},has(s,l){if(Reflect.has(s,l))return!0;if(typeof l=="symbol"||l.startsWith("__"))return!1;for(const i of t)if(i.value&&Reflect.has(i.value,l))return!0;return!1},set(s,l,i){if(Reflect.has(s,l))return Reflect.set(s,l,i);if(typeof l=="symbol"||l.startsWith("__"))return!1;for(const o of t)if(o.value&&Reflect.has(o.value,l))return Reflect.set(o.value,l,i);return!1},getOwnPropertyDescriptor(s,l){var o;const i=Reflect.getOwnPropertyDescriptor(s,l);if(i)return i;if(!(typeof l=="symbol"||l.startsWith("__"))){for(const r of t){if(!r.value)continue;const c=gi(r.value,l)??("_"in r.value?gi((o=r.value._)==null?void 0:o.setupState,l):void 0);if(c)return c}for(const r of t){const c=r.value&&r.value[mi];if(!c)continue;const d=c.slice();for(;d.length;){const u=d.shift(),h=gi(u.value,l);if(h)return h;const g=u.value&&u.value[mi];g&&d.push(...g)}}}}})}const h2=P({id:String,...ft(Os({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Rl}}),["absolute"])},"VMenu"),Ul=j()({name:"VMenu",props:h2(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{scopeId:s}=es(),l=ka(),i=y(()=>e.id||`v-menu-${l}`),o=se(),r=He(ao,null),c=re(0);je(ao,{register(){++c.value},unregister(){--c.value},closeParents(){setTimeout(()=>{c.value||(n.value=!1,r==null||r.closeParents())},40)}});function d(v){var p,w,C;const k=v.relatedTarget,b=v.target;k!==b&&((p=o.value)!=null&&p.contentEl)&&((w=o.value)!=null&&w.globalTop)&&![document,o.value.contentEl].includes(b)&&!o.value.contentEl.contains(b)&&((C=As(o.value.contentEl)[0])==null||C.focus())}de(n,v=>{v?(r==null||r.register(),document.addEventListener("focusin",d,{once:!0})):(r==null||r.unregister(),document.removeEventListener("focusin",d))});function u(){r==null||r.closeParents()}function h(v){var k,b,p;e.disabled||v.key==="Tab"&&(_u(As((k=o.value)==null?void 0:k.contentEl,!1),v.shiftKey?"prev":"next",C=>C.tabIndex>=0)||(n.value=!1,(p=(b=o.value)==null?void 0:b.activatorEl)==null||p.focus()))}function g(v){var b;if(e.disabled)return;const k=(b=o.value)==null?void 0:b.contentEl;k&&n.value?v.key==="ArrowDown"?(v.preventDefault(),fl(k,"next")):v.key==="ArrowUp"&&(v.preventDefault(),fl(k,"prev")):["ArrowDown","ArrowUp"].includes(v.key)&&(n.value=!0,v.preventDefault(),setTimeout(()=>setTimeout(()=>g(v))))}const f=y(()=>ie({"aria-haspopup":"menu","aria-expanded":String(n.value),"aria-owns":i.value,onKeydown:g},e.activatorProps));return ae(()=>{const[v]=At.filterProps(e);return m(At,ie({ref:o,class:["v-menu",e.class],style:e.style},v,{modelValue:n.value,"onUpdate:modelValue":k=>n.value=k,absolute:!0,activatorProps:f.value,"onClick:outside":u,onKeydown:h},s),{activator:t.activator,default:function(){for(var k=arguments.length,b=new Array(k),p=0;p<k;p++)b[p]=arguments[p];return m(Ne,{root:"VMenu"},{default:()=>{var w;return[(w=t.default)==null?void 0:w.call(t,...b)]}})}})}),tt({id:i,ΨopenChildren:c},o)}});const m2=P({active:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...ce(),...Bt({transition:{component:sr}})},"VCounter"),Kl=j()({name:"VCounter",functional:!0,props:m2(),setup(e,a){let{slots:t}=a;const n=y(()=>e.max?`${e.value} / ${e.max}`:String(e.value));return ae(()=>m(Ya,{transition:e.transition},{default:()=>[Je(m("div",{class:["v-counter",e.class],style:e.style},[t.default?t.default({counter:n.value,max:e.max,value:e.value}):n.value]),[[gt,e.active]])]})),{}}});const g2=P({floating:Boolean,...ce()},"VFieldLabel"),cs=j()({name:"VFieldLabel",props:g2(),setup(e,a){let{slots:t}=a;return ae(()=>m(Xn,{class:["v-field-label",{"v-field-label--floating":e.floating},e.class],style:e.style,"aria-hidden":e.floating||void 0},t)),{}}}),f2=["underlined","outlined","filled","solo","solo-inverted","solo-filled","plain"],Jl=P({appendInnerIcon:be,bgColor:String,clearable:Boolean,clearIcon:{type:be,default:"$clear"},active:Boolean,centerAffix:{type:Boolean,default:void 0},color:String,baseColor:String,dirty:Boolean,disabled:{type:Boolean,default:null},error:Boolean,flat:Boolean,label:String,persistentClear:Boolean,prependInnerIcon:be,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>f2.includes(e)},"onClick:clear":rt(),"onClick:appendInner":rt(),"onClick:prependInner":rt(),...ce(),...ur(),...Qe(),...De()},"VField"),zs=j()({name:"VField",inheritAttrs:!1,props:{id:String,..._l(),...Jl()},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const{themeClasses:l}=qe(e),{loaderClasses:i}=Ol(e),{focusClasses:o,isFocused:r,focus:c,blur:d}=Ut(e),{InputIcon:u}=Rh(e),{roundedClasses:h}=$e(e),{rtlClasses:g}=ra(),f=y(()=>e.dirty||e.active),v=y(()=>!e.singleLine&&!!(e.label||s.label)),k=ka(),b=y(()=>e.id||`input-${k}`),p=y(()=>`${b.value}-messages`),w=se(),C=se(),H=se(),B=y(()=>["plain","underlined"].includes(e.variant)),{backgroundColorClasses:I,backgroundColorStyles:x}=ea(Z(e,"bgColor")),{textColorClasses:L,textColorStyles:T}=pa(y(()=>e.error||e.disabled?void 0:f.value&&r.value?e.color:e.baseColor));de(f,q=>{if(v.value){const U=w.value.$el,_=C.value.$el;requestAnimationFrame(()=>{const J=$o(U),K=_.getBoundingClientRect(),z=K.x-J.x,ee=K.y-J.y-(J.height/2-K.height/2),Q=K.width/.75,te=Math.abs(Q-J.width)>1?{maxWidth:ue(Q)}:void 0,he=getComputedStyle(U),we=getComputedStyle(_),ke=parseFloat(he.transitionDuration)*1e3||150,Ie=parseFloat(we.getPropertyValue("--v-field-label-scale")),$=we.getPropertyValue("color");U.style.visibility="visible",_.style.visibility="hidden",sn(U,{transform:`translate(${z}px, ${ee}px) scale(${Ie})`,color:$,...te},{duration:ke,easing:Cs,direction:q?"normal":"reverse"}).finished.then(()=>{U.style.removeProperty("visibility"),_.style.removeProperty("visibility")})})}},{flush:"post"});const E=y(()=>({isActive:f,isFocused:r,controlRef:H,blur:d,focus:c}));function D(q){q.target!==document.activeElement&&q.preventDefault()}return ae(()=>{var z,ee,Q;const q=e.variant==="outlined",U=s["prepend-inner"]||e.prependInnerIcon,_=!!(e.clearable||s.clear),J=!!(s["append-inner"]||e.appendInnerIcon||_),K=s.label?s.label({...E.value,label:e.label,props:{for:b.value}}):e.label;return m("div",ie({class:["v-field",{"v-field--active":f.value,"v-field--appended":J,"v-field--center-affix":e.centerAffix??!B.value,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--flat":e.flat,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":U,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!K,[`v-field--variant-${e.variant}`]:!0},l.value,I.value,o.value,i.value,h.value,g.value,e.class],style:[x.value,T.value,e.style],onClick:D},t),[m("div",{class:"v-field__overlay"},null),m(hr,{name:"v-field",active:!!e.loading,color:e.error?"error":typeof e.loading=="string"?e.loading:e.color},{default:s.loader}),U&&m("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&m(u,{key:"prepend-icon",name:"prependInner"},null),(z=s["prepend-inner"])==null?void 0:z.call(s,E.value)]),m("div",{class:"v-field__field","data-no-activator":""},[["filled","solo","solo-inverted","solo-filled"].includes(e.variant)&&v.value&&m(cs,{key:"floating-label",ref:C,class:[L.value],floating:!0,for:b.value},{default:()=>[K]}),m(cs,{ref:w,for:b.value},{default:()=>[K]}),(ee=s.default)==null?void 0:ee.call(s,{...E.value,props:{id:b.value,class:"v-field__input","aria-describedby":p.value},focus:c,blur:d})]),_&&m(lr,{key:"clear"},{default:()=>[Je(m("div",{class:"v-field__clearable",onMousedown:te=>{te.preventDefault(),te.stopPropagation()}},[s.clear?s.clear():m(u,{name:"clear"},null)]),[[gt,e.dirty]])]}),J&&m("div",{key:"append",class:"v-field__append-inner"},[(Q=s["append-inner"])==null?void 0:Q.call(s,E.value),e.appendInnerIcon&&m(u,{key:"append-icon",name:"appendInner"},null)]),m("div",{class:["v-field__outline",L.value]},[q&&m(ve,null,[m("div",{class:"v-field__outline__start"},null),v.value&&m("div",{class:"v-field__outline__notch"},[m(cs,{ref:C,floating:!0,for:b.value},{default:()=>[K]})]),m("div",{class:"v-field__outline__end"},null)]),B.value&&v.value&&m(cs,{ref:C,floating:!0,for:b.value},{default:()=>[K]})])])}),{controlRef:H}}});function kr(e){const a=Object.keys(zs.props).filter(t=>!Ko(t)&&t!=="class"&&t!=="style");return Vn(e,a)}const v2=["color","file","time","date","datetime-local","week","month"],$l=P({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,type:{type:String,default:"text"},modelModifiers:Object,...Dt(),...Jl()},"VTextField"),ct=j()({name:"VTextField",directives:{Intersect:Nl},inheritAttrs:!1,props:$l(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const l=xe(e,"modelValue"),{isFocused:i,focus:o,blur:r}=Ut(e),c=y(()=>typeof e.counterValue=="function"?e.counterValue(l.value):(l.value??"").toString().length),d=y(()=>{if(t.maxlength)return t.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter}),u=y(()=>["plain","underlined"].includes(e.variant));function h(B,I){var x,L;!e.autofocus||!B||(L=(x=I[0].target)==null?void 0:x.focus)==null||L.call(x)}const g=se(),f=se(),v=se(),k=y(()=>v2.includes(e.type)||e.persistentPlaceholder||i.value||e.active);function b(){var B;v.value!==document.activeElement&&((B=v.value)==null||B.focus()),i.value||o()}function p(B){n("mousedown:control",B),B.target!==v.value&&(b(),B.preventDefault())}function w(B){b(),n("click:control",B)}function C(B){B.stopPropagation(),b(),ze(()=>{l.value=null,Jo(e["onClick:clear"],B)})}function H(B){var x;const I=B.target;if(l.value=I.value,(x=e.modelModifiers)!=null&&x.trim&&["text","search","password","tel","url"].includes(e.type)){const L=[I.selectionStart,I.selectionEnd];ze(()=>{I.selectionStart=L[0],I.selectionEnd=L[1]})}}return ae(()=>{const B=!!(s.counter||e.counter||e.counterValue),I=!!(B||s.details),[x,L]=mn(t),[{modelValue:T,...E}]=da.filterProps(e),[D]=kr(e);return m(da,ie({ref:g,modelValue:l.value,"onUpdate:modelValue":q=>l.value=q,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--plain-underlined":["plain","underlined"].includes(e.variant)},e.class],style:e.style},x,E,{centerAffix:!u.value,focused:i.value}),{...s,default:q=>{let{id:U,isDisabled:_,isDirty:J,isReadonly:K,isValid:z}=q;return m(zs,ie({ref:f,onMousedown:p,onClick:w,"onClick:clear":C,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},D,{id:U.value,active:k.value||J.value,dirty:J.value||e.dirty,disabled:_.value,focused:i.value,error:z.value===!1}),{...s,default:ee=>{let{props:{class:Q,...te}}=ee;const he=Je(m("input",ie({ref:v,value:l.value,onInput:H,autofocus:e.autofocus,readonly:K.value,disabled:_.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:b,onBlur:r},te,L),null),[[Ga("intersect"),{handler:h},null,{once:!0}]]);return m(ve,null,[e.prefix&&m("span",{class:"v-text-field__prefix"},[m("span",{class:"v-text-field__prefix__text"},[e.prefix])]),m("div",{class:Q,"data-no-activator":""},[s.default?m(ve,null,[s.default(),he]):xt(he)]),e.suffix&&m("span",{class:"v-text-field__suffix"},[m("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:I?q=>{var U;return m(ve,null,[(U=s.details)==null?void 0:U.call(s,q),B&&m(ve,null,[m("span",null,null),m(Kl,{active:e.persistentCounter||i.value,value:c.value,max:d.value},s.counter)])])}:void 0})}),tt({},g,f,v)}});const p2=P({renderless:Boolean,...ce()},"VVirtualScrollItem"),y2=j()({name:"VVirtualScrollItem",inheritAttrs:!1,props:p2(),emits:{"update:height":e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const{resizeRef:l,contentRect:i}=ut(void 0,"border");de(()=>{var o;return(o=i.value)==null?void 0:o.height},o=>{o!=null&&n("update:height",o)}),ae(()=>{var o,r;return e.renderless?m(ve,null,[(o=s.default)==null?void 0:o.call(s,{itemRef:l})]):m("div",ie({ref:l,class:["v-virtual-scroll__item",e.class],style:e.style},t),[(r=s.default)==null?void 0:r.call(s)])})}}),ld=-1,id=1,k2=P({itemHeight:{type:[Number,String],default:48}},"virtual");function b2(e,a,t){const n=re(0),s=re(e.itemHeight),l=y({get:()=>parseInt(s.value??0,10),set(I){s.value=I}}),i=se(),{resizeRef:o,contentRect:r}=ut();Da(()=>{o.value=i.value});const c=gn(),d=new Map;let u=Array.from({length:a.value.length});const h=y(()=>{const I=(!r.value||i.value===document.documentElement?c.height.value:r.value.height)-((t==null?void 0:t.value)??0);return Math.ceil(I/l.value*1.7+1)});function g(I,x){l.value=Math.max(l.value,x),u[I]=x,d.set(a.value[I],x)}function f(I){return u.slice(0,I).reduce((x,L)=>x+(L||l.value),0)}function v(I){const x=a.value.length;let L=0,T=0;for(;T<I&&L<x;)T+=u[L++]||l.value;return L-1}let k=0;function b(){if(!i.value||!r.value)return;const I=r.value.height-56,x=i.value.scrollTop,L=x<k?ld:id,T=v(x+I/2),E=Math.round(h.value/3),D=T-E,q=n.value+E*2-1;L===ld&&T<=q?n.value=va(D,0,a.value.length):L===id&&T>=q&&(n.value=va(D,0,a.value.length-h.value)),k=x}function p(I){if(!i.value)return;const x=f(I);i.value.scrollTop=x}const w=y(()=>Math.min(a.value.length,n.value+h.value)),C=y(()=>a.value.slice(n.value,w.value).map((I,x)=>({raw:I,index:x+n.value}))),H=y(()=>f(n.value)),B=y(()=>f(a.value.length)-f(w.value));return de(()=>a.value.length,()=>{u=bt(a.value.length).map(()=>l.value),d.forEach((I,x)=>{const L=a.value.indexOf(x);L===-1?d.delete(x):u[L]=I})}),{containerRef:i,computedItems:C,itemHeight:l,paddingTop:H,paddingBottom:B,scrollToIndex:p,handleScroll:b,handleItemResize:g}}const w2=P({items:{type:Array,default:()=>[]},renderless:Boolean,...k2(),...ce(),...Wa()},"VVirtualScroll"),jl=j()({name:"VVirtualScroll",props:w2(),setup(e,a){let{slots:t}=a;const n=oa("VVirtualScroll"),{dimensionStyles:s}=Va(e),{containerRef:l,handleScroll:i,handleItemResize:o,scrollToIndex:r,paddingTop:c,paddingBottom:d,computedItems:u}=b2(e,Z(e,"items"));return St(()=>e.renderless,()=>{ya(()=>{var h;l.value=Zo(n.vnode.el,!0),(h=l.value)==null||h.addEventListener("scroll",i)}),Aa(()=>{var h;(h=l.value)==null||h.removeEventListener("scroll",i)})}),ae(()=>{const h=u.value.map(g=>m(y2,{key:g.index,renderless:e.renderless,"onUpdate:height":f=>o(g.index,f)},{default:f=>{var v;return(v=t.default)==null?void 0:v.call(t,{item:g.raw,index:g.index,...f})}}));return e.renderless?m(ve,null,[m("div",{class:"v-virtual-scroll__spacer",style:{paddingTop:ue(c.value)}},null),h,m("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:ue(d.value)}},null)]):m("div",{ref:l,class:["v-virtual-scroll",e.class],onScroll:i,style:[s.value,e.style]},[m("div",{class:"v-virtual-scroll__container",style:{paddingTop:ue(c.value),paddingBottom:ue(d.value)}},[h])])}),{scrollToIndex:r}}});function br(e,a){const t=re(!1);let n;function s(o){cancelAnimationFrame(n),t.value=!0,n=requestAnimationFrame(()=>{n=requestAnimationFrame(()=>{t.value=!1})})}async function l(){await new Promise(o=>requestAnimationFrame(o)),await new Promise(o=>requestAnimationFrame(o)),await new Promise(o=>requestAnimationFrame(o)),await new Promise(o=>{if(t.value){const r=de(t,()=>{r(),o()})}else o()})}async function i(o){var d,u;if(o.key==="Tab"&&((d=a.value)==null||d.focus()),!["PageDown","PageUp","Home","End"].includes(o.key))return;const r=(u=e.value)==null?void 0:u.$el;if(!r)return;(o.key==="Home"||o.key==="End")&&r.scrollTo({top:o.key==="Home"?0:r.scrollHeight,behavior:"smooth"}),await l();const c=r.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(o.key==="PageDown"||o.key==="Home"){const h=r.getBoundingClientRect().top;for(const g of c)if(g.getBoundingClientRect().top>=h){g.focus();break}}else{const h=r.getBoundingClientRect().bottom;for(const g of[...c].reverse())if(g.getBoundingClientRect().bottom<=h){g.focus();break}}}return{onListScroll:s,onListKeydown:i}}const wr=P({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:be,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,valueComparator:{type:Function,default:hn},itemColor:String,...Zh({itemChildren:!1})},"Select"),M2=P({...wr(),...ft($l({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...Bt({transition:{component:Rl}})},"VSelect"),lt=j()({name:"VSelect",props:M2(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,a){let{slots:t}=a;const{t:n}=_a(),s=se(),l=se(),i=xe(e,"menu"),o=y({get:()=>i.value,set:_=>{var J;i.value&&!_&&((J=l.value)!=null&&J.ΨopenChildren)||(i.value=_)}}),{items:r,transformIn:c,transformOut:d}=pr(e),u=xe(e,"modelValue",[],_=>c(_===null?[null]:Na(_)),_=>{const J=d(_);return e.multiple?J:J[0]??null}),h=Wl(),g=y(()=>u.value.map(_=>r.value.find(J=>{const K=fa(J.raw,e.itemValue),z=fa(_.raw,e.itemValue);return K===void 0||z===void 0?!1:e.returnObject?e.valueComparator(K,z):e.valueComparator(J.value,_.value)})||_)),f=y(()=>g.value.map(_=>_.props.value)),v=re(!1);let k="",b;const p=y(()=>e.hideSelected?r.value.filter(_=>!g.value.some(J=>J===_)):r.value),w=y(()=>e.hideNoData&&!r.value.length||e.readonly||(h==null?void 0:h.isReadonly.value)),C=se(),{onListScroll:H,onListKeydown:B}=br(C,s);function I(_){e.openOnClear&&(o.value=!0)}function x(){w.value||(o.value=!o.value)}function L(_){var Q,te;if(!_.key||e.readonly||h!=null&&h.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(_.key)&&_.preventDefault(),["Enter","ArrowDown"," "].includes(_.key)&&(o.value=!0),["Escape","Tab"].includes(_.key)&&(o.value=!1),_.key==="Home"?(Q=C.value)==null||Q.focus("first"):_.key==="End"&&((te=C.value)==null||te.focus("last"));const J=1e3;function K(he){const we=he.key.length===1,ke=!he.ctrlKey&&!he.metaKey&&!he.altKey;return we&&ke}if(e.multiple||!K(_))return;const z=performance.now();z-b>J&&(k=""),k+=_.key.toLowerCase(),b=z;const ee=r.value.find(he=>he.title.toLowerCase().startsWith(k));ee!==void 0&&(u.value=[ee])}function T(_){if(e.multiple){const J=f.value.findIndex(K=>e.valueComparator(K,_.value));if(J===-1)u.value=[...u.value,_];else{const K=[...u.value];K.splice(J,1),u.value=K}}else u.value=[_],o.value=!1}function E(_){var J;(J=C.value)!=null&&J.$el.contains(_.relatedTarget)||(o.value=!1)}function D(){var _;v.value&&((_=s.value)==null||_.focus())}function q(_){v.value=!0}function U(_){if(_==null)u.value=[];else if(Fn(s.value,":autofill")||Fn(s.value,":-webkit-autofill")){const J=r.value.find(K=>K.title===_);J&&T(J)}else s.value&&(s.value.value="")}return ae(()=>{const _=!!(e.chips||t.chip),J=!!(!e.hideNoData||p.value.length||t["prepend-item"]||t["append-item"]||t["no-data"]),K=u.value.length>0,[z]=ct.filterProps(e),ee=K||!v.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return m(ct,ie({ref:s},z,{modelValue:u.value.map(Q=>Q.props.value).join(", "),"onUpdate:modelValue":U,focused:v.value,"onUpdate:focused":Q=>v.value=Q,validationValue:u.externalValue,dirty:K,class:["v-select",{"v-select--active-menu":o.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":u.value.length,"v-select--selection-slot":!!t.selection},e.class],style:e.style,inputmode:"none",placeholder:ee,"onClick:clear":I,"onMousedown:control":x,onBlur:E,onKeydown:L}),{...t,default:()=>m(ve,null,[m(Ul,ie({ref:l,modelValue:o.value,"onUpdate:modelValue":Q=>o.value=Q,activator:"parent",contentClass:"v-select__content",disabled:w.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:D},e.menuProps),{default:()=>[J&&m(Vl,{ref:C,selected:f.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:Q=>Q.preventDefault(),onKeydown:B,onFocusin:q,onScrollPassive:H,tabindex:"-1",color:e.itemColor??e.color},{default:()=>{var Q,te,he;return[(Q=t["prepend-item"])==null?void 0:Q.call(t),!p.value.length&&!e.hideNoData&&(((te=t["no-data"])==null?void 0:te.call(t))??m(ht,{title:n(e.noDataText)},null)),m(jl,{renderless:!0,items:p.value},{default:we=>{var O;let{item:ke,index:Ie,itemRef:$}=we;const R=ie(ke.props,{ref:$,key:Ie,onClick:()=>T(ke)});return((O=t.item)==null?void 0:O.call(t,{item:ke,index:Ie,props:R}))??m(ht,R,{prepend:F=>{let{isSelected:Y}=F;return m(ve,null,[e.multiple&&!e.hideSelected?m(Pn,{key:ke.value,modelValue:Y,ripple:!1,tabindex:"-1"},null):void 0,ke.props.prependIcon&&m(Re,{icon:ke.props.prependIcon},null)])}})}}),(he=t["append-item"])==null?void 0:he.call(t)]}})]}),g.value.map((Q,te)=>{var ke;function he(Ie){Ie.stopPropagation(),Ie.preventDefault(),T(Q)}const we={"onClick:close":he,onMousedown(Ie){Ie.preventDefault(),Ie.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0};return m("div",{key:Q.value,class:"v-select__selection"},[_?t.chip?m(Ne,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:Q.title}}},{default:()=>{var Ie;return[(Ie=t.chip)==null?void 0:Ie.call(t,{item:Q,index:te,props:we})]}}):m(Ns,ie({key:"chip",closable:e.closableChips,size:"small",text:Q.title},we),null):((ke=t.selection)==null?void 0:ke.call(t,{item:Q,index:te}))??m("span",{class:"v-select__selection-text"},[Q.title,e.multiple&&te<g.value.length-1&&m("span",{class:"v-select__selection-comma"},[La(",")])])])})]),"append-inner":function(){var we;for(var Q=arguments.length,te=new Array(Q),he=0;he<Q;he++)te[he]=arguments[he];return m(ve,null,[(we=t["append-inner"])==null?void 0:we.call(t,...te),e.menuIcon?m(Re,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),tt({isFocused:v,menu:o,select:T},s)}}),x2=(e,a,t)=>e==null||a==null?-1:e.toString().toLocaleLowerCase().indexOf(a.toString().toLocaleLowerCase()),cm=P({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function S2(e,a,t){var o;const n=[],s=(t==null?void 0:t.default)??x2,l=t!=null&&t.filterKeys?Na(t.filterKeys):!1,i=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return n;e:for(let r=0;r<e.length;r++){const c=e[r],d={},u={};let h=-1;if(a&&!(t!=null&&t.noFilter)){if(typeof c=="object"){const v=l||Object.keys(c);for(const k of v){const b=fa(c,k,c),p=(o=t==null?void 0:t.customKeyFilter)==null?void 0:o[k];if(h=p?p(b,a,c):s(b,a,c),h!==-1&&h!==!1)p?d[k]=h:u[k]=h;else if((t==null?void 0:t.filterMode)==="every")continue e}}else h=s(c,a,c),h!==-1&&h!==!1&&(u.title=h);const g=Object.keys(u).length,f=Object.keys(d).length;if(!g&&!f||(t==null?void 0:t.filterMode)==="union"&&f!==i&&!g||(t==null?void 0:t.filterMode)==="intersection"&&(f!==i||!g))continue}n.push({index:r,matches:{...u,...d}})}return n}function dm(e,a,t,n){const s=se([]),l=se(new Map),i=y(()=>n!=null&&n.transform?ia(a).map(n==null?void 0:n.transform):ia(a));Da(()=>{const r=typeof t=="function"?t():ia(t),c=typeof r!="string"&&typeof r!="number"?"":String(r),d=S2(i.value,c,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),u=ia(a),h=[],g=new Map;d.forEach(f=>{let{index:v,matches:k}=f;const b=u[v];h.push(b),g.set(b.value,k)}),s.value=h,l.value=g});function o(r){return l.value.get(r.value)}return{filteredItems:s,filteredMatches:l,getMatches:o}}function L2(e,a,t){if(a==null)return e;if(Array.isArray(a))throw new Error("Multiple matches is not implemented");return typeof a=="number"&&~a?m(ve,null,[m("span",{class:"v-autocomplete__unmask"},[e.substr(0,a)]),m("span",{class:"v-autocomplete__mask"},[e.substr(a,t)]),m("span",{class:"v-autocomplete__unmask"},[e.substr(a+t)])]):e}const A2=P({autoSelectFirst:{type:[Boolean,String]},search:String,...cm({filterKeys:["title"]}),...wr(),...ft($l({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...Bt({transition:!1})},"VAutocomplete"),um=j()({name:"VAutocomplete",props:A2(),emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,a){let{slots:t}=a;const{t:n}=_a(),s=se(),l=re(!1),i=re(!0),o=re(!1),r=se(),c=xe(e,"menu"),d=y({get:()=>c.value,set:O=>{var F;c.value&&!O&&((F=r.value)!=null&&F.ΨopenChildren)||(c.value=O)}}),u=re(-1),h=y(()=>{var O;return(O=s.value)==null?void 0:O.color}),{items:g,transformIn:f,transformOut:v}=pr(e),{textColorClasses:k,textColorStyles:b}=pa(h),p=xe(e,"search",""),w=xe(e,"modelValue",[],O=>f(O===null?[null]:Na(O)),O=>{const F=v(O);return e.multiple?F:F[0]??null}),C=Wl(),{filteredItems:H,getMatches:B}=dm(e,g,()=>i.value?"":p.value),I=y(()=>w.value.map(O=>g.value.find(F=>{const Y=fa(F.raw,e.itemValue),ge=fa(O.raw,e.itemValue);return Y===void 0||ge===void 0?!1:e.returnObject?e.valueComparator(Y,ge):e.valueComparator(F.value,O.value)})||O)),x=y(()=>e.hideSelected?H.value.filter(O=>!I.value.some(F=>F.value===O.value)):H.value),L=y(()=>I.value.map(O=>O.props.value)),T=y(()=>I.value[u.value]),E=y(()=>{var F;return(e.autoSelectFirst===!0||e.autoSelectFirst==="exact"&&p.value===((F=x.value[0])==null?void 0:F.title))&&x.value.length>0&&!i.value&&!o.value}),D=y(()=>e.hideNoData&&!g.value.length||e.readonly||(C==null?void 0:C.isReadonly.value)),q=se(),{onListScroll:U,onListKeydown:_}=br(q,s);function J(O){e.openOnClear&&(d.value=!0),p.value=""}function K(){D.value||(d.value=!0)}function z(O){D.value||(l.value&&(O.preventDefault(),O.stopPropagation()),d.value=!d.value)}function ee(O){var ge,M,S;if(e.readonly||C!=null&&C.isReadonly.value)return;const F=s.value.selectionStart,Y=L.value.length;if((u.value>-1||["Enter","ArrowDown","ArrowUp"].includes(O.key))&&O.preventDefault(),["Enter","ArrowDown"].includes(O.key)&&(d.value=!0),["Escape"].includes(O.key)&&(d.value=!1),E.value&&["Enter","Tab"].includes(O.key)&&R(H.value[0]),O.key==="ArrowDown"&&E.value&&((ge=q.value)==null||ge.focus("next")),!!e.multiple){if(["Backspace","Delete"].includes(O.key)){if(u.value<0){O.key==="Backspace"&&!p.value&&(u.value=Y-1);return}const G=u.value;T.value&&R(T.value),u.value=G>=Y-1?Y-2:G}if(O.key==="ArrowLeft"){if(u.value<0&&F>0)return;const G=u.value>-1?u.value-1:Y-1;I.value[G]?u.value=G:(u.value=-1,s.value.setSelectionRange((M=p.value)==null?void 0:M.length,(S=p.value)==null?void 0:S.length))}if(O.key==="ArrowRight"){if(u.value<0)return;const G=u.value+1;I.value[G]?u.value=G:(u.value=-1,s.value.setSelectionRange(0,0))}}}function Q(O){p.value=O.target.value}function te(O){if(Fn(s.value,":autofill")||Fn(s.value,":-webkit-autofill")){const F=g.value.find(Y=>Y.title===O.target.value);F&&R(F)}}function he(){var O;l.value&&(i.value=!0,(O=s.value)==null||O.focus())}function we(O){l.value=!0,setTimeout(()=>{o.value=!0})}function ke(O){o.value=!1}function Ie(O){(O==null||O===""&&!e.multiple)&&(w.value=[])}const $=re(!1);function R(O){if(e.multiple){const F=L.value.findIndex(Y=>e.valueComparator(Y,O.value));if(F===-1)w.value=[...w.value,O];else{const Y=[...w.value];Y.splice(F,1),w.value=Y}}else w.value=[O],$.value=!0,p.value=O.title,d.value=!1,i.value=!0,ze(()=>$.value=!1)}return de(l,(O,F)=>{var Y;O!==F&&(O?($.value=!0,p.value=e.multiple?"":String(((Y=I.value.at(-1))==null?void 0:Y.props.title)??""),i.value=!0,ze(()=>$.value=!1)):(!e.multiple&&!p.value?w.value=[]:E.value&&!o.value&&!I.value.some(ge=>{let{value:M}=ge;return M===x.value[0].value})&&R(x.value[0]),d.value=!1,p.value="",u.value=-1))}),de(p,O=>{!l.value||$.value||(O&&(d.value=!0),i.value=!O)}),ae(()=>{const O=!!(e.chips||t.chip),F=!!(!e.hideNoData||x.value.length||t["prepend-item"]||t["append-item"]||t["no-data"]),Y=w.value.length>0,[ge]=ct.filterProps(e);return m(ct,ie({ref:s},ge,{modelValue:p.value,"onUpdate:modelValue":Ie,focused:l.value,"onUpdate:focused":M=>l.value=M,validationValue:w.externalValue,dirty:Y,onInput:Q,onChange:te,class:["v-autocomplete",`v-autocomplete--${e.multiple?"multiple":"single"}`,{"v-autocomplete--active-menu":d.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selection-slot":!!t.selection,"v-autocomplete--selecting-index":u.value>-1},e.class],style:e.style,readonly:e.readonly,placeholder:Y?void 0:e.placeholder,"onClick:clear":J,"onMousedown:control":K,onKeydown:ee}),{...t,default:()=>m(ve,null,[m(Ul,ie({ref:r,modelValue:d.value,"onUpdate:modelValue":M=>d.value=M,activator:"parent",contentClass:"v-autocomplete__content",disabled:D.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:he},e.menuProps),{default:()=>[F&&m(Vl,{ref:q,selected:L.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:M=>M.preventDefault(),onKeydown:_,onFocusin:we,onFocusout:ke,onScrollPassive:U,tabindex:"-1",color:e.itemColor??e.color},{default:()=>{var M,S,G;return[(M=t["prepend-item"])==null?void 0:M.call(t),!x.value.length&&!e.hideNoData&&(((S=t["no-data"])==null?void 0:S.call(t))??m(ht,{title:n(e.noDataText)},null)),m(jl,{renderless:!0,items:x.value},{default:N=>{var oe;let{item:W,index:V,itemRef:le}=N;const ne=ie(W.props,{ref:le,key:V,active:E.value&&V===0?!0:void 0,onClick:()=>R(W)});return((oe=t.item)==null?void 0:oe.call(t,{item:W,index:V,props:ne}))??m(ht,ne,{prepend:X=>{let{isSelected:fe}=X;return m(ve,null,[e.multiple&&!e.hideSelected?m(Pn,{key:W.value,modelValue:fe,ripple:!1,tabindex:"-1"},null):void 0,W.props.prependIcon&&m(Re,{icon:W.props.prependIcon},null)])},title:()=>{var X,fe;return i.value?W.title:L2(W.title,(X=B(W))==null?void 0:X.title,((fe=p.value)==null?void 0:fe.length)??0)}})}}),(G=t["append-item"])==null?void 0:G.call(t)]}})]}),I.value.map((M,S)=>{var W;function G(V){V.stopPropagation(),V.preventDefault(),R(M)}const N={"onClick:close":G,onMousedown(V){V.preventDefault(),V.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0};return m("div",{key:M.value,class:["v-autocomplete__selection",S===u.value&&["v-autocomplete__selection--selected",k.value]],style:S===u.value?b.value:{}},[O?t.chip?m(Ne,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:M.title}}},{default:()=>{var V;return[(V=t.chip)==null?void 0:V.call(t,{item:M,index:S,props:N})]}}):m(Ns,ie({key:"chip",closable:e.closableChips,size:"small",text:M.title},N),null):((W=t.selection)==null?void 0:W.call(t,{item:M,index:S}))??m("span",{class:"v-autocomplete__selection-text"},[M.title,e.multiple&&S<I.value.length-1&&m("span",{class:"v-autocomplete__selection-comma"},[La(",")])])])})]),"append-inner":function(){var N;for(var M=arguments.length,S=new Array(M),G=0;G<M;G++)S[G]=arguments[G];return m(ve,null,[(N=t["append-inner"])==null?void 0:N.call(t,...S),e.menuIcon?m(Re,{class:"v-autocomplete__menu-icon",icon:e.menuIcon,onMousedown:z,onClick:Wu},null):void 0])}})}),tt({isFocused:l,isPristine:i,menu:d,search:p,filteredItems:H,select:R},s)}});const C2=P({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:be,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...ce(),...Wt({location:"top end"}),...Qe(),...Le(),...De(),...Bt({transition:"scale-rotate-transition"})},"VBadge"),I2=j()({name:"VBadge",inheritAttrs:!1,props:C2(),setup(e,a){const{backgroundColorClasses:t,backgroundColorStyles:n}=ea(Z(e,"color")),{roundedClasses:s}=$e(e),{t:l}=_a(),{textColorClasses:i,textColorStyles:o}=pa(Z(e,"textColor")),{themeClasses:r}=lh(),{locationStyles:c}=Vt(e,!0,d=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(d)?+(e.offsetY??0):["left","right"].includes(d)?+(e.offsetX??0):0));return ae(()=>{const d=Number(e.content),u=!e.max||isNaN(d)?e.content:d<=+e.max?d:`${e.max}+`,[h,g]=Vn(a.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return m(e.tag,ie({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},g,{style:e.style}),{default:()=>{var f,v;return[m("div",{class:"v-badge__wrapper"},[(v=(f=a.slots).default)==null?void 0:v.call(f),m(Ya,{transition:e.transition},{default:()=>{var k,b;return[Je(m("span",ie({class:["v-badge__badge",r.value,t.value,s.value,i.value],style:[n.value,o.value,e.inline?{}:c.value],"aria-atomic":"true","aria-label":l(e.label,d),"aria-live":"polite",role:"status"},h),[e.dot?void 0:a.slots.badge?(b=(k=a.slots).badge)==null?void 0:b.call(k):e.icon?m(Re,{icon:e.icon},null):u]),[[gt,e.modelValue]])]}})])]}})}),{}}});const T2=P({color:String,density:String,...ce()},"VBannerActions"),hm=j()({name:"VBannerActions",props:T2(),setup(e,a){let{slots:t}=a;return Xe({VBtn:{color:e.color,density:e.density,variant:"text"}}),ae(()=>{var n;return m("div",{class:["v-banner-actions",e.class],style:e.style},[(n=t.default)==null?void 0:n.call(t)])}),{}}}),mm=at("v-banner-text"),B2=P({avatar:String,color:String,icon:be,lines:String,stacked:Boolean,sticky:Boolean,text:String,...Fa(),...ce(),...na(),...Wa(),...ta(),...Wt(),...Yn(),...Qe(),...Le(),...De()},"VBanner"),H2=j()({name:"VBanner",props:B2(),setup(e,a){let{slots:t}=a;const{borderClasses:n}=Qa(e),{densityClasses:s}=ba(e),{mobile:l}=gn(),{dimensionStyles:i}=Va(e),{elevationClasses:o}=ua(e),{locationStyles:r}=Vt(e),{positionClasses:c}=Zn(e),{roundedClasses:d}=$e(e),{themeClasses:u}=qe(e),h=Z(e,"color"),g=Z(e,"density");Xe({VBannerActions:{color:h,density:g}}),ae(()=>{const f=!!(e.text||t.text),v=!!(e.avatar||e.icon),k=!!(v||t.prepend);return m(e.tag,{class:["v-banner",{"v-banner--stacked":e.stacked||l.value,"v-banner--sticky":e.sticky,[`v-banner--${e.lines}-line`]:!!e.lines},n.value,s.value,o.value,c.value,d.value,u.value,e.class],style:[i.value,r.value,e.style],role:"banner"},{default:()=>{var b;return[k&&m("div",{key:"prepend",class:"v-banner__prepend"},[t.prepend?m(Ne,{key:"prepend-defaults",disabled:!v,defaults:{VAvatar:{color:h.value,density:g.value,icon:e.icon,image:e.avatar}}},t.prepend):m(_t,{key:"prepend-avatar",color:h.value,density:g.value,icon:e.icon,image:e.avatar},null)]),m("div",{class:"v-banner__content"},[f&&m(mm,{key:"text"},{default:()=>{var p;return[((p=t.text)==null?void 0:p.call(t))??e.text]}}),(b=t.default)==null?void 0:b.call(t)]),t.actions&&m(hm,{key:"actions"},t.actions)]}})})}});const D2=P({bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...Fa(),...ce(),...na(),...ta(),...Qe(),...Qn({name:"bottom-navigation"}),...Le({tag:"header"}),...Kn({modelValue:!0,selectedClass:"v-btn--selected"}),...De()},"VBottomNavigation"),G2=j()({name:"VBottomNavigation",props:D2(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{themeClasses:n}=lh(),{borderClasses:s}=Qa(e),{backgroundColorClasses:l,backgroundColorStyles:i}=ea(Z(e,"bgColor")),{densityClasses:o}=ba(e),{elevationClasses:r}=ua(e),{roundedClasses:c}=$e(e),{ssrBootStyles:d}=fn(),u=y(()=>Number(e.height)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0)),h=Z(e,"active"),{layoutItemStyles:g}=Un({id:e.name,order:y(()=>parseInt(e.order,10)),position:y(()=>"bottom"),layoutSize:y(()=>h.value?u.value:0),elementSize:u,active:h,absolute:Z(e,"absolute")});return yn(e,or),Xe({VBtn:{color:Z(e,"color"),density:Z(e,"density"),stacked:y(()=>e.mode!=="horizontal"),variant:"text"}},{scoped:!0}),ae(()=>m(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":h.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":e.mode==="shift"},n.value,l.value,s.value,o.value,r.value,c.value,e.class],style:[i.value,g.value,{height:ue(u.value),transform:`translateY(${ue(h.value?0:100,"%")})`},d.value,e.style]},{default:()=>[t.default&&m("div",{class:"v-bottom-navigation__content"},[t.default()])]})),{}}});const E2=P({divider:[Number,String],...ce()},"VBreadcrumbsDivider"),gm=j()({name:"VBreadcrumbsDivider",props:E2(),setup(e,a){let{slots:t}=a;return ae(()=>{var n;return m("li",{class:["v-breadcrumbs-divider",e.class],style:e.style},[((n=t==null?void 0:t.default)==null?void 0:n.call(t))??e.divider])}),{}}}),F2=P({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...ce(),...Ps(),...Le({tag:"li"})},"VBreadcrumbsItem"),fm=j()({name:"VBreadcrumbsItem",props:F2(),setup(e,a){let{slots:t,attrs:n}=a;const s=Rs(e,n),l=y(()=>{var c;return e.active||((c=s.isActive)==null?void 0:c.value)}),i=y(()=>l.value?e.activeColor:e.color),{textColorClasses:o,textColorStyles:r}=pa(i);return ae(()=>m(e.tag,{class:["v-breadcrumbs-item",{"v-breadcrumbs-item--active":l.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:l.value&&e.activeClass},o.value,e.class],style:[r.value,e.style],"aria-current":l.value?"page":void 0},{default:()=>{var c,d;return[s.isLink.value?m("a",{class:"v-breadcrumbs-item--link",href:s.href.value,"aria-current":l.value?"page":void 0,onClick:s.navigate},[((d=t.default)==null?void 0:d.call(t))??e.title]):((c=t.default)==null?void 0:c.call(t))??e.title]}})),{}}}),q2=P({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:be,items:{type:Array,default:()=>[]},...ce(),...na(),...Qe(),...Le({tag:"ul"})},"VBreadcrumbs"),R2=j()({name:"VBreadcrumbs",props:q2(),setup(e,a){let{slots:t}=a;const{backgroundColorClasses:n,backgroundColorStyles:s}=ea(Z(e,"bgColor")),{densityClasses:l}=ba(e),{roundedClasses:i}=$e(e);Xe({VBreadcrumbsDivider:{divider:Z(e,"divider")},VBreadcrumbsItem:{activeClass:Z(e,"activeClass"),activeColor:Z(e,"activeColor"),color:Z(e,"color"),disabled:Z(e,"disabled")}});const o=y(()=>e.items.map(r=>typeof r=="string"?{item:{title:r},raw:r}:{item:r,raw:r}));return ae(()=>{const r=!!(t.prepend||e.icon);return m(e.tag,{class:["v-breadcrumbs",n.value,l.value,i.value,e.class],style:[s.value,e.style]},{default:()=>{var c;return[r&&m("li",{key:"prepend",class:"v-breadcrumbs__prepend"},[t.prepend?m(Ne,{key:"prepend-defaults",disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},t.prepend):m(Re,{key:"prepend-icon",start:!0,icon:e.icon},null)]),o.value.map((d,u,h)=>{let{item:g,raw:f}=d;return m(ve,null,[m(fm,ie({key:g.title,disabled:u>=h.length-1},g),{default:t.title?()=>{var v;return(v=t.title)==null?void 0:v.call(t,{item:f,index:u})}:void 0}),u<h.length-1&&m(gm,null,{default:t.divider?()=>{var v;return(v=t.divider)==null?void 0:v.call(t,{item:f,index:u})}:void 0})])}),(c=t.default)==null?void 0:c.call(t)]}})}),{}}});const vm=j()({name:"VCardActions",props:ce(),setup(e,a){let{slots:t}=a;return Xe({VBtn:{variant:"text"}}),ae(()=>{var n;return m("div",{class:["v-card-actions",e.class],style:e.style},[(n=t.default)==null?void 0:n.call(t)])}),{}}}),pm=at("v-card-subtitle"),ym=at("v-card-title"),P2=P({appendAvatar:String,appendIcon:be,prependAvatar:String,prependIcon:be,subtitle:String,title:String,...ce(),...na()},"VCardItem"),km=j()({name:"VCardItem",props:P2(),setup(e,a){let{slots:t}=a;return ae(()=>{var c;const n=!!(e.prependAvatar||e.prependIcon),s=!!(n||t.prepend),l=!!(e.appendAvatar||e.appendIcon),i=!!(l||t.append),o=!!(e.title||t.title),r=!!(e.subtitle||t.subtitle);return m("div",{class:["v-card-item",e.class],style:e.style},[s&&m("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?m(Ne,{key:"prepend-defaults",disabled:!n,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},t.prepend):n&&m(_t,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),m("div",{class:"v-card-item__content"},[o&&m(ym,{key:"title"},{default:()=>{var d;return[((d=t.title)==null?void 0:d.call(t))??e.title]}}),r&&m(pm,{key:"subtitle"},{default:()=>{var d;return[((d=t.subtitle)==null?void 0:d.call(t))??e.subtitle]}}),(c=t.default)==null?void 0:c.call(t)]),i&&m("div",{key:"append",class:"v-card-item__append"},[t.append?m(Ne,{key:"append-defaults",disabled:!l,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},t.append):l&&m(_t,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),bm=at("v-card-text"),N2=P({appendAvatar:String,appendIcon:be,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:be,ripple:{type:[Boolean,Object],default:!0},subtitle:String,text:String,title:String,...Fa(),...ce(),...na(),...Wa(),...ta(),...ur(),...Wt(),...Yn(),...Qe(),...Ps(),...Le(),...De(),...Ua({variant:"elevated"})},"VCard"),O2=j()({name:"VCard",directives:{Ripple:Qt},props:N2(),setup(e,a){let{attrs:t,slots:n}=a;const{themeClasses:s}=qe(e),{borderClasses:l}=Qa(e),{colorClasses:i,colorStyles:o,variantClasses:r}=pn(e),{densityClasses:c}=ba(e),{dimensionStyles:d}=Va(e),{elevationClasses:u}=ua(e),{loaderClasses:h}=Ol(e),{locationStyles:g}=Vt(e),{positionClasses:f}=Zn(e),{roundedClasses:v}=$e(e),k=Rs(e,t),b=y(()=>e.link!==!1&&k.isLink.value),p=y(()=>!e.disabled&&e.link!==!1&&(e.link||k.isClickable.value));return ae(()=>{const w=b.value?"a":e.tag,C=!!(n.title||e.title),H=!!(n.subtitle||e.subtitle),B=C||H,I=!!(n.append||e.appendAvatar||e.appendIcon),x=!!(n.prepend||e.prependAvatar||e.prependIcon),L=!!(n.image||e.image),T=B||x||I,E=!!(n.text||e.text);return Je(m(w,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":p.value},s.value,l.value,i.value,c.value,u.value,h.value,f.value,v.value,r.value,e.class],style:[o.value,d.value,g.value,e.style],href:k.href.value,onClick:p.value&&k.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var D;return[L&&m("div",{key:"image",class:"v-card__image"},[n.image?m(Ne,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},n.image):m(un,{key:"image-img",cover:!0,src:e.image},null)]),m(hr,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:n.loader}),T&&m(km,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:n.item,prepend:n.prepend,title:n.title,subtitle:n.subtitle,append:n.append}),E&&m(bm,{key:"text"},{default:()=>{var q;return[((q=n.text)==null?void 0:q.call(n))??e.text]}}),(D=n.default)==null?void 0:D.call(n),n.actions&&m(vm,null,{default:n.actions}),vn(p.value,"v-card")]}}),[[Ga("ripple"),p.value&&e.ripple]])}),{}}});const z2=e=>{const{touchstartX:a,touchendX:t,touchstartY:n,touchendY:s}=e,l=.5,i=16;e.offsetX=t-a,e.offsetY=s-n,Math.abs(e.offsetY)<l*Math.abs(e.offsetX)&&(e.left&&t<a-i&&e.left(e),e.right&&t>a+i&&e.right(e)),Math.abs(e.offsetX)<l*Math.abs(e.offsetY)&&(e.up&&s<n-i&&e.up(e),e.down&&s>n+i&&e.down(e))};function _2(e,a){var n;const t=e.changedTouches[0];a.touchstartX=t.clientX,a.touchstartY=t.clientY,(n=a.start)==null||n.call(a,{originalEvent:e,...a})}function W2(e,a){var n;const t=e.changedTouches[0];a.touchendX=t.clientX,a.touchendY=t.clientY,(n=a.end)==null||n.call(a,{originalEvent:e,...a}),z2(a)}function V2(e,a){var n;const t=e.changedTouches[0];a.touchmoveX=t.clientX,a.touchmoveY=t.clientY,(n=a.move)==null||n.call(a,{originalEvent:e,...a})}function Q2(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const a={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:t=>_2(t,a),touchend:t=>W2(t,a),touchmove:t=>V2(t,a)}}function U2(e,a){var o;const t=a.value,n=t!=null&&t.parent?e.parentElement:e,s=(t==null?void 0:t.options)??{passive:!0},l=(o=a.instance)==null?void 0:o.$.uid;if(!n||!l)return;const i=Q2(a.value);n._touchHandlers=n._touchHandlers??Object.create(null),n._touchHandlers[l]=i,Nu(i).forEach(r=>{n.addEventListener(r,i[r],s)})}function K2(e,a){var l,i;const t=(l=a.value)!=null&&l.parent?e.parentElement:e,n=(i=a.instance)==null?void 0:i.$.uid;if(!(t!=null&&t._touchHandlers)||!n)return;const s=t._touchHandlers[n];Nu(s).forEach(o=>{t.removeEventListener(o,s[o])}),delete t._touchHandlers[n]}const Mr={mounted:U2,unmounted:K2},wm=Symbol.for("vuetify:v-window"),Mm=Symbol.for("vuetify:v-window-group"),xm=P({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...ce(),...Le(),...De()},"VWindow"),to=j()({name:"VWindow",directives:{Touch:Mr},props:xm(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{isRtl:s}=ra(),{t:l}=_a(),i=yn(e,Mm),o=se(),r=y(()=>s.value?!e.reverse:e.reverse),c=re(!1),d=y(()=>{const C=e.direction==="vertical"?"y":"x",B=(r.value?!c.value:c.value)?"-reverse":"";return`v-window-${C}${B}-transition`}),u=re(0),h=se(void 0),g=y(()=>i.items.value.findIndex(C=>i.selected.value.includes(C.id)));de(g,(C,H)=>{const B=i.items.value.length,I=B-1;B<=2?c.value=C<H:C===I&&H===0?c.value=!0:C===0&&H===I?c.value=!1:c.value=C<H}),je(wm,{transition:d,isReversed:c,transitionCount:u,transitionHeight:h,rootRef:o});const f=y(()=>e.continuous||g.value!==0),v=y(()=>e.continuous||g.value!==i.items.value.length-1);function k(){f.value&&i.prev()}function b(){v.value&&i.next()}const p=y(()=>{const C=[],H={icon:s.value?e.nextIcon:e.prevIcon,class:`v-window__${r.value?"right":"left"}`,onClick:i.prev,ariaLabel:l("$vuetify.carousel.prev")};C.push(f.value?t.prev?t.prev({props:H}):m(ca,H,null):m("div",null,null));const B={icon:s.value?e.prevIcon:e.nextIcon,class:`v-window__${r.value?"left":"right"}`,onClick:i.next,ariaLabel:l("$vuetify.carousel.next")};return C.push(v.value?t.next?t.next({props:B}):m(ca,B,null):m("div",null,null)),C}),w=y(()=>e.touch===!1?e.touch:{...{left:()=>{r.value?k():b()},right:()=>{r.value?b():k()},start:H=>{let{originalEvent:B}=H;B.stopPropagation()}},...e.touch===!0?{}:e.touch});return ae(()=>Je(m(e.tag,{ref:o,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},n.value,e.class],style:e.style},{default:()=>{var C,H;return[m("div",{class:"v-window__container",style:{height:h.value}},[(C=t.default)==null?void 0:C.call(t,{group:i}),e.showArrows!==!1&&m("div",{class:"v-window__controls"},[p.value])]),(H=t.additional)==null?void 0:H.call(t,{group:i})]}}),[[Ga("touch"),w.value]])),{group:i}}}),J2=P({color:String,cycle:Boolean,delimiterIcon:{type:be,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...xm({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),$2=j()({name:"VCarousel",props:J2(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{t:s}=_a(),l=se();let i=-1;de(n,r),de(()=>e.interval,r),de(()=>e.cycle,c=>{c?r():window.clearTimeout(i)}),ya(o);function o(){!e.cycle||!l.value||(i=window.setTimeout(l.value.group.next,+e.interval>0?+e.interval:6e3))}function r(){window.clearTimeout(i),window.requestAnimationFrame(o)}return ae(()=>{const[c]=to.filterProps(e);return m(to,ie({ref:l},c,{modelValue:n.value,"onUpdate:modelValue":d=>n.value=d,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:ue(e.height)},e.style]}),{default:t.default,additional:d=>{let{group:u}=d;return m(ve,null,[!e.hideDelimiters&&m("div",{class:"v-carousel__controls",style:{left:e.verticalDelimiters==="left"&&e.verticalDelimiters?0:"auto",right:e.verticalDelimiters==="right"?0:"auto"}},[u.items.value.length>0&&m(Ne,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[u.items.value.map((h,g)=>{const f={id:`carousel-item-${h.id}`,"aria-label":s("$vuetify.carousel.ariaLabel.delimiter",g+1,u.items.value.length),class:[u.isSelected(h.id)&&"v-btn--active"],onClick:()=>u.select(h.id,!0)};return t.item?t.item({props:f,item:h}):m(ca,ie(h,f),null)})]})]),e.progress&&m(dr,{class:"v-carousel__progress",color:typeof e.progress=="string"?e.progress:void 0,modelValue:(u.getItemIndex(n.value)+1)/u.items.value.length*100},null)])},prev:t.prev,next:t.next})}),{}}}),Sm=P({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...ce(),...Jn(),...Ql()},"VWindowItem"),no=j()({name:"VWindowItem",directives:{Touch:Mr},props:Sm(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:t}=a;const n=He(wm),s=$n(e,Mm),{isBooted:l}=fn();if(!n||!s)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const i=re(!1),o=y(()=>l.value&&(n.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function r(){!i.value||!n||(i.value=!1,n.transitionCount.value>0&&(n.transitionCount.value-=1,n.transitionCount.value===0&&(n.transitionHeight.value=void 0)))}function c(){var f;i.value||!n||(i.value=!0,n.transitionCount.value===0&&(n.transitionHeight.value=ue((f=n.rootRef.value)==null?void 0:f.clientHeight)),n.transitionCount.value+=1)}function d(){r()}function u(f){i.value&&ze(()=>{!o.value||!i.value||!n||(n.transitionHeight.value=ue(f.clientHeight))})}const h=y(()=>{const f=n.isReversed.value?e.reverseTransition:e.transition;return o.value?{name:typeof f!="string"?n.transition.value:f,onBeforeEnter:c,onAfterEnter:r,onEnterCancelled:d,onBeforeLeave:c,onAfterLeave:r,onLeaveCancelled:d,onEnter:u}:!1}),{hasContent:g}=yr(e,s.isSelected);return ae(()=>m(Ya,{transition:h.value,disabled:!l.value},{default:()=>{var f;return[Je(m("div",{class:["v-window-item",s.selectedClass.value,e.class],style:e.style},[g.value&&((f=t.default)==null?void 0:f.call(t))]),[[gt,s.isSelected.value]])]}})),{groupItem:s}}}),j2=P({...bh(),...Sm()},"VCarouselItem"),Y2=j()({name:"VCarouselItem",inheritAttrs:!1,props:j2(),setup(e,a){let{slots:t,attrs:n}=a;ae(()=>{const[s]=un.filterProps(e),[l]=no.filterProps(e);return m(no,ie({class:"v-carousel-item"},l),{default:()=>[m(un,ie(n,s),t)]})})}});const Z2=at("v-code");const X2=P({color:{type:Object},disabled:Boolean,dotSize:{type:[Number,String],default:10},height:{type:[Number,String],default:150},width:{type:[Number,String],default:300},...ce()},"VColorPickerCanvas"),ey=za({name:"VColorPickerCanvas",props:X2(),emits:{"update:color":e=>!0,"update:position":e=>!0},setup(e,a){let{emit:t}=a;const n=re(!1),s=re(!1),l=se({x:0,y:0}),i=y(()=>{const{x:b,y:p}=l.value,w=parseInt(e.dotSize,10)/2;return{width:ue(e.dotSize),height:ue(e.dotSize),transform:`translate(${ue(b-w)}, ${ue(p-w)})`}}),o=se(),r=re(parseFloat(e.width)),c=re(parseFloat(e.height)),{resizeRef:d}=ut(b=>{var C;if(!((C=d.value)!=null&&C.offsetParent))return;const{width:p,height:w}=b[0].contentRect;r.value=p,c.value=w});function u(b,p,w){const{left:C,top:H,width:B,height:I}=w;l.value={x:va(b-C,0,B),y:va(p-H,0,I)}}function h(b){e.disabled||!o.value||u(b.clientX,b.clientY,o.value.getBoundingClientRect())}function g(b){b.preventDefault(),!e.disabled&&(n.value=!0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",v),window.addEventListener("touchmove",f),window.addEventListener("touchend",v))}function f(b){if(e.disabled||!o.value)return;n.value=!0;const p=Xv(b);u(p.clientX,p.clientY,o.value.getBoundingClientRect())}function v(){window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",v),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",v)}de(l,()=>{var w,C;if(s.value){s.value=!1;return}if(!o.value)return;const{x:b,y:p}=l.value;t("update:color",{h:((w=e.color)==null?void 0:w.h)??0,s:va(b,0,r.value)/r.value,v:1-va(p,0,c.value)/c.value,a:((C=e.color)==null?void 0:C.a)??1})});function k(){var H;if(!o.value)return;const b=o.value,p=b.getContext("2d");if(!p)return;const w=p.createLinearGradient(0,0,b.width,0);w.addColorStop(0,"hsla(0, 0%, 100%, 1)"),w.addColorStop(1,`hsla(${((H=e.color)==null?void 0:H.h)??0}, 100%, 50%, 1)`),p.fillStyle=w,p.fillRect(0,0,b.width,b.height);const C=p.createLinearGradient(0,0,0,b.height);C.addColorStop(0,"hsla(0, 0%, 100%, 0)"),C.addColorStop(1,"hsla(0, 0%, 0%, 1)"),p.fillStyle=C,p.fillRect(0,0,b.width,b.height)}return de(()=>{var b;return(b=e.color)==null?void 0:b.h},k,{immediate:!0}),de(()=>[r.value,c.value],(b,p)=>{k(),l.value={x:l.value.x*b[0]/p[0],y:l.value.y*b[1]/p[1]}},{flush:"post"}),de(()=>e.color,()=>{if(n.value){n.value=!1;return}s.value=!0,l.value=e.color?{x:e.color.s*r.value,y:(1-e.color.v)*c.value}:{x:0,y:0}},{deep:!0,immediate:!0}),ya(()=>k()),ae(()=>m("div",{ref:d,class:["v-color-picker-canvas",e.class],style:e.style,onClick:h,onMousedown:g,onTouchstart:g},[m("canvas",{ref:o,width:r.value,height:c.value},null),e.color&&m("div",{class:["v-color-picker-canvas__dot",{"v-color-picker-canvas__dot--disabled":e.disabled}],style:i.value},null)])),{}}});function ay(e,a){if(a){const{a:t,...n}=e;return n}return e}function ty(e,a){if(a==null||typeof a=="string"){const t=Xu(e);return e.a===1?t.slice(0,7):t}if(typeof a=="object"){let t;return nn(a,["r","g","b"])?t=Lt(e):nn(a,["h","s","l"])?t=Ju(e):nn(a,["h","s","v"])&&(t=e),ay(t,!nn(a,["a"])&&e.a===1)}return e}const fs={h:0,s:0,v:1,a:1},so={inputProps:{type:"number",min:0},inputs:[{label:"R",max:255,step:1,getValue:e=>Math.round(e.r),getColor:(e,a)=>({...e,r:Number(a)})},{label:"G",max:255,step:1,getValue:e=>Math.round(e.g),getColor:(e,a)=>({...e,g:Number(a)})},{label:"B",max:255,step:1,getValue:e=>Math.round(e.b),getColor:(e,a)=>({...e,b:Number(a)})},{label:"A",max:1,step:.01,getValue:e=>{let{a}=e;return a!=null?Math.round(a*100)/100:1},getColor:(e,a)=>({...e,a:Number(a)})}],to:Lt,from:El};var Td;const ny={...so,inputs:(Td=so.inputs)==null?void 0:Td.slice(0,3)},lo={inputProps:{type:"number",min:0},inputs:[{label:"H",max:360,step:1,getValue:e=>Math.round(e.h),getColor:(e,a)=>({...e,h:Number(a)})},{label:"S",max:1,step:.01,getValue:e=>Math.round(e.s*100)/100,getColor:(e,a)=>({...e,s:Number(a)})},{label:"L",max:1,step:.01,getValue:e=>Math.round(e.l*100)/100,getColor:(e,a)=>({...e,l:Number(a)})},{label:"A",max:1,step:.01,getValue:e=>{let{a}=e;return a!=null?Math.round(a*100)/100:1},getColor:(e,a)=>({...e,a:Number(a)})}],to:Ju,from:Yo},sy={...lo,inputs:lo.inputs.slice(0,3)},Lm={inputProps:{type:"text"},inputs:[{label:"HEXA",getValue:e=>e,getColor:(e,a)=>a}],to:Xu,from:h5},ly={...Lm,inputs:[{label:"HEX",getValue:e=>e.slice(0,7),getColor:(e,a)=>a}]},dn={rgb:ny,rgba:so,hsl:sy,hsla:lo,hex:ly,hexa:Lm},iy=e=>{let{label:a,...t}=e;return m("div",{class:"v-color-picker-edit__input"},[m("input",t,null),m("span",null,[a])])},oy=P({color:Object,disabled:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(dn).includes(e)},modes:{type:Array,default:()=>Object.keys(dn),validator:e=>Array.isArray(e)&&e.every(a=>Object.keys(dn).includes(a))},...ce()},"VColorPickerEdit"),ry=za({name:"VColorPickerEdit",props:oy(),emits:{"update:color":e=>!0,"update:mode":e=>!0},setup(e,a){let{emit:t}=a;const n=y(()=>e.modes.map(l=>({...dn[l],name:l}))),s=y(()=>{var o;const l=n.value.find(r=>r.name===e.mode);if(!l)return[];const i=e.color?l.to(e.color):null;return(o=l.inputs)==null?void 0:o.map(r=>{let{getValue:c,getColor:d,...u}=r;return{...l.inputProps,...u,disabled:e.disabled,value:i&&c(i),onChange:h=>{const g=h.target;g&&t("update:color",l.from(d(i??fs,g.value)))}}})});return ae(()=>{var l;return m("div",{class:["v-color-picker-edit",e.class],style:e.style},[(l=s.value)==null?void 0:l.map(i=>m(iy,i,null)),n.value.length>1&&m(ca,{icon:"$unfold",size:"x-small",variant:"plain",onClick:()=>{const i=n.value.findIndex(o=>o.name===e.mode);t("update:mode",n.value[(i+1)%n.value.length].name)}},null)])}),{}}});const xr=Symbol.for("vuetify:v-slider");function io(e,a,t){const n=t==="vertical",s=a.getBoundingClientRect(),l="touches"in e?e.touches[0]:e;return n?l.clientY-(s.top+s.height/2):l.clientX-(s.left+s.width/2)}function cy(e,a){return"touches"in e&&e.touches.length?e.touches[0][a]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][a]:e[a]}const Am=P({disabled:{type:Boolean,default:null},error:Boolean,readonly:{type:Boolean,default:null},max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>typeof e=="boolean"||e==="always"},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>typeof e=="boolean"||e==="always"},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...Qe(),...ta({elevation:2})},"Slider"),Cm=e=>{const a=y(()=>parseFloat(e.min)),t=y(()=>parseFloat(e.max)),n=y(()=>+e.step>0?parseFloat(e.step):0),s=y(()=>Math.max(bc(n.value),bc(a.value)));function l(i){if(i=parseFloat(i),n.value<=0)return i;const o=va(i,a.value,t.value),r=a.value%n.value,c=Math.round((o-r)/n.value)*n.value+r;return parseFloat(Math.min(c,t.value).toFixed(s.value))}return{min:a,max:t,step:n,decimals:s,roundValue:l}},Im=e=>{let{props:a,steps:t,onSliderStart:n,onSliderMove:s,onSliderEnd:l,getActiveThumb:i}=e;const{isRtl:o}=ra(),r=Z(a,"reverse"),c=y(()=>{let $=o.value?"rtl":"ltr";return a.reverse&&($=$==="rtl"?"ltr":"rtl"),$}),{min:d,max:u,step:h,decimals:g,roundValue:f}=t,v=y(()=>parseInt(a.thumbSize,10)),k=y(()=>parseInt(a.tickSize,10)),b=y(()=>parseInt(a.trackSize,10)),p=y(()=>(u.value-d.value)/h.value),w=Z(a,"disabled"),C=y(()=>a.direction==="vertical"),H=y(()=>a.error||a.disabled?void 0:a.thumbColor??a.color),B=y(()=>a.error||a.disabled?void 0:a.trackColor??a.color),I=y(()=>a.error||a.disabled?void 0:a.trackFillColor??a.color),x=re(!1),L=re(0),T=se(),E=se();function D($){var N;const R=a.direction==="vertical",O=R?"top":"left",F=R?"height":"width",Y=R?"clientY":"clientX",{[O]:ge,[F]:M}=(N=T.value)==null?void 0:N.$el.getBoundingClientRect(),S=cy($,Y);let G=Math.min(Math.max((S-ge-L.value)/M,0),1)||0;return(R||c.value==="rtl")&&(G=1-G),f(d.value+G*(u.value-d.value))}const q=$=>{l({value:D($)}),x.value=!1,L.value=0},U=$=>{E.value=i($),E.value&&(E.value.focus(),x.value=!0,E.value.contains($.target)?L.value=io($,E.value,a.direction):(L.value=0,s({value:D($)})),n({value:D($)}))},_={passive:!0,capture:!0};function J($){s({value:D($)})}function K($){$.stopPropagation(),$.preventDefault(),q($),window.removeEventListener("mousemove",J,_),window.removeEventListener("mouseup",K)}function z($){var R;q($),window.removeEventListener("touchmove",J,_),(R=$.target)==null||R.removeEventListener("touchend",z)}function ee($){var R;U($),window.addEventListener("touchmove",J,_),(R=$.target)==null||R.addEventListener("touchend",z,{passive:!1})}function Q($){$.preventDefault(),U($),window.addEventListener("mousemove",J,_),window.addEventListener("mouseup",K,{passive:!1})}const te=$=>{const R=($-d.value)/(u.value-d.value)*100;return va(isNaN(R)?0:R,0,100)},he=Z(a,"showTicks"),we=y(()=>he.value?a.ticks?Array.isArray(a.ticks)?a.ticks.map($=>({value:$,position:te($),label:$.toString()})):Object.keys(a.ticks).map($=>({value:parseFloat($),position:te(parseFloat($)),label:a.ticks[$]})):p.value!==1/0?bt(p.value+1).map($=>{const R=d.value+$*h.value;return{value:R,position:te(R)}}):[]:[]),ke=y(()=>we.value.some($=>{let{label:R}=$;return!!R})),Ie={activeThumbRef:E,color:Z(a,"color"),decimals:g,disabled:w,direction:Z(a,"direction"),elevation:Z(a,"elevation"),hasLabels:ke,horizontalDirection:c,isReversed:r,min:d,max:u,mousePressed:x,numTicks:p,onSliderMousedown:Q,onSliderTouchstart:ee,parsedTicks:we,parseMouseMove:D,position:te,readonly:Z(a,"readonly"),rounded:Z(a,"rounded"),roundValue:f,showTicks:he,startOffset:L,step:h,thumbSize:v,thumbColor:H,thumbLabel:Z(a,"thumbLabel"),ticks:Z(a,"ticks"),tickSize:k,trackColor:B,trackContainerRef:T,trackFillColor:I,trackSize:b,vertical:C};return je(xr,Ie),Ie},dy=P({focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0},ripple:{type:[Boolean,Object],default:!0},...ce()},"VSliderThumb"),oo=j()({name:"VSliderThumb",directives:{Ripple:Qt},props:dy(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t,emit:n}=a;const s=He(xr),{rtlClasses:l}=ra();if(!s)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");const{thumbColor:i,step:o,vertical:r,disabled:c,thumbSize:d,thumbLabel:u,direction:h,readonly:g,elevation:f,isReversed:v,horizontalDirection:k,mousePressed:b,decimals:p}=s,{textColorClasses:w,textColorStyles:C}=pa(i),{pageup:H,pagedown:B,end:I,home:x,left:L,right:T,down:E,up:D}=qi,q=[H,B,I,x,L,T,E,D],U=y(()=>o.value?[1,2,3]:[1,5,10]);function _(K,z){if(!q.includes(K.key))return;K.preventDefault();const ee=o.value||.1,Q=(e.max-e.min)/ee;if([L,T,E,D].includes(K.key)){const he=(k.value==="rtl"?[L,D]:[T,D]).includes(K.key)?1:-1,we=K.shiftKey?2:K.ctrlKey?1:0;z=z+he*ee*U.value[we]}else if(K.key===x)z=e.min;else if(K.key===I)z=e.max;else{const te=K.key===B?1:-1;z=z-te*ee*(Q>100?Q/10:10)}return Math.max(e.min,Math.min(e.max,z))}function J(K){const z=_(K,e.modelValue);z!=null&&n("update:modelValue",z)}return ae(()=>{const K=ue(r.value||v.value?100-e.position:e.position,"%"),{elevationClasses:z}=ua(y(()=>c.value?void 0:f.value));return m("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&b.value},e.class,l.value],style:[{"--v-slider-thumb-position":K,"--v-slider-thumb-size":ue(d.value)},e.style],role:"slider",tabindex:c.value?-1:0,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":!!g.value,"aria-orientation":h.value,onKeydown:g.value?void 0:J},[m("div",{class:["v-slider-thumb__surface",w.value,z.value],style:{...C.value}},null),Je(m("div",{class:["v-slider-thumb__ripple",w.value],style:C.value},null),[[Ga("ripple"),e.ripple,null,{circle:!0,center:!0}]]),m(vh,{origin:"bottom center"},{default:()=>{var ee;return[Je(m("div",{class:"v-slider-thumb__label-container"},[m("div",{class:["v-slider-thumb__label"]},[m("div",null,[((ee=t["thumb-label"])==null?void 0:ee.call(t,{modelValue:e.modelValue}))??e.modelValue.toFixed(o.value?p.value:1)])])]),[[gt,u.value&&e.focused||u.value==="always"]])]}})])}),{}}});const uy=P({start:{type:Number,required:!0},stop:{type:Number,required:!0},...ce()},"VSliderTrack"),Tm=j()({name:"VSliderTrack",props:uy(),emits:{},setup(e,a){let{slots:t}=a;const n=He(xr);if(!n)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");const{color:s,horizontalDirection:l,parsedTicks:i,rounded:o,showTicks:r,tickSize:c,trackColor:d,trackFillColor:u,trackSize:h,vertical:g,min:f,max:v}=n,{roundedClasses:k}=$e(o),{backgroundColorClasses:b,backgroundColorStyles:p}=ea(u),{backgroundColorClasses:w,backgroundColorStyles:C}=ea(d),H=y(()=>`inset-${g.value?"block-end":"inline-start"}`),B=y(()=>g.value?"height":"width"),I=y(()=>({[H.value]:"0%",[B.value]:"100%"})),x=y(()=>e.stop-e.start),L=y(()=>({[H.value]:ue(e.start,"%"),[B.value]:ue(x.value,"%")})),T=y(()=>r.value?(g.value?i.value.slice().reverse():i.value).map((D,q)=>{var J;const U=g.value?"bottom":"margin-inline-start",_=D.value!==f.value&&D.value!==v.value?ue(D.position,"%"):void 0;return m("div",{key:D.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":D.position>=e.start&&D.position<=e.stop,"v-slider-track__tick--first":D.value===f.value,"v-slider-track__tick--last":D.value===v.value}],style:{[U]:_}},[(D.label||t["tick-label"])&&m("div",{class:"v-slider-track__tick-label"},[((J=t["tick-label"])==null?void 0:J.call(t,{tick:D,index:q}))??D.label])])}):[]);return ae(()=>m("div",{class:["v-slider-track",k.value,e.class],style:[{"--v-slider-track-size":ue(h.value),"--v-slider-tick-size":ue(c.value),direction:g.value?void 0:l.value},e.style]},[m("div",{class:["v-slider-track__background",w.value,{"v-slider-track__background--opacity":!!s.value||!u.value}],style:{...I.value,...C.value}},null),m("div",{class:["v-slider-track__fill",b.value],style:{...L.value,...p.value}},null),r.value&&m("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":r.value==="always"}]},[T.value])])),{}}}),hy=P({..._l(),...Am(),...Dt(),modelValue:{type:[Number,String],default:0}},"VSlider"),ro=j()({name:"VSlider",props:hy(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,start:e=>!0,end:e=>!0},setup(e,a){let{slots:t,emit:n}=a;const s=se(),{rtlClasses:l}=ra(),i=Cm(e),o=xe(e,"modelValue",void 0,B=>i.roundValue(B??i.min.value)),{min:r,max:c,mousePressed:d,roundValue:u,onSliderMousedown:h,onSliderTouchstart:g,trackContainerRef:f,position:v,hasLabels:k,readonly:b}=Im({props:e,steps:i,onSliderStart:()=>{n("start",o.value)},onSliderEnd:B=>{let{value:I}=B;const x=u(I);o.value=x,n("end",x)},onSliderMove:B=>{let{value:I}=B;return o.value=u(I)},getActiveThumb:()=>{var B;return(B=s.value)==null?void 0:B.$el}}),{isFocused:p,focus:w,blur:C}=Ut(e),H=y(()=>v(o.value));return ae(()=>{const[B,I]=da.filterProps(e),x=!!(e.label||t.label||t.prepend);return m(da,ie({class:["v-slider",{"v-slider--has-labels":!!t["tick-label"]||k.value,"v-slider--focused":p.value,"v-slider--pressed":d.value,"v-slider--disabled":e.disabled},l.value,e.class],style:e.style},B,{focused:p.value}),{...t,prepend:x?L=>{var T,E;return m(ve,null,[((T=t.label)==null?void 0:T.call(t,L))??e.label?m(Xn,{id:L.id.value,class:"v-slider__label",text:e.label},null):void 0,(E=t.prepend)==null?void 0:E.call(t,L)])}:void 0,default:L=>{let{id:T,messagesId:E}=L;return m("div",{class:"v-slider__container",onMousedown:b.value?void 0:h,onTouchstartPassive:b.value?void 0:g},[m("input",{id:T.value,name:e.name||T.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:o.value},null),m(Tm,{ref:f,start:0,stop:H.value},{"tick-label":t["tick-label"]}),m(oo,{ref:s,"aria-describedby":E.value,focused:p.value,min:r.value,max:c.value,modelValue:o.value,"onUpdate:modelValue":D=>o.value=D,position:H.value,elevation:e.elevation,onFocus:w,onBlur:C},{"thumb-label":t["thumb-label"]})])}})}),{}}}),my=P({color:{type:Object},disabled:Boolean,hideAlpha:Boolean,...ce()},"VColorPickerPreview"),gy=za({name:"VColorPickerPreview",props:my(),emits:{"update:color":e=>!0},setup(e,a){let{emit:t}=a;return ae(()=>{var n,s;return m("div",{class:["v-color-picker-preview",{"v-color-picker-preview--hide-alpha":e.hideAlpha},e.class],style:e.style},[m("div",{class:"v-color-picker-preview__dot"},[m("div",{style:{background:ju(e.color??fs)}},null)]),m("div",{class:"v-color-picker-preview__sliders"},[m(ro,{class:"v-color-picker-preview__track v-color-picker-preview__hue",modelValue:(n=e.color)==null?void 0:n.h,"onUpdate:modelValue":l=>t("update:color",{...e.color??fs,h:l}),step:0,min:0,max:360,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null),!e.hideAlpha&&m(ro,{class:"v-color-picker-preview__track v-color-picker-preview__alpha",modelValue:((s=e.color)==null?void 0:s.a)??1,"onUpdate:modelValue":l=>t("update:color",{...e.color??fs,a:l}),step:1/256,min:0,max:1,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null)])])}),{}}});const fy=Object.freeze({base:"#f44336",lighten5:"#ffebee",lighten4:"#ffcdd2",lighten3:"#ef9a9a",lighten2:"#e57373",lighten1:"#ef5350",darken1:"#e53935",darken2:"#d32f2f",darken3:"#c62828",darken4:"#b71c1c",accent1:"#ff8a80",accent2:"#ff5252",accent3:"#ff1744",accent4:"#d50000"}),vy=Object.freeze({base:"#e91e63",lighten5:"#fce4ec",lighten4:"#f8bbd0",lighten3:"#f48fb1",lighten2:"#f06292",lighten1:"#ec407a",darken1:"#d81b60",darken2:"#c2185b",darken3:"#ad1457",darken4:"#880e4f",accent1:"#ff80ab",accent2:"#ff4081",accent3:"#f50057",accent4:"#c51162"}),py=Object.freeze({base:"#9c27b0",lighten5:"#f3e5f5",lighten4:"#e1bee7",lighten3:"#ce93d8",lighten2:"#ba68c8",lighten1:"#ab47bc",darken1:"#8e24aa",darken2:"#7b1fa2",darken3:"#6a1b9a",darken4:"#4a148c",accent1:"#ea80fc",accent2:"#e040fb",accent3:"#d500f9",accent4:"#aa00ff"}),yy=Object.freeze({base:"#673ab7",lighten5:"#ede7f6",lighten4:"#d1c4e9",lighten3:"#b39ddb",lighten2:"#9575cd",lighten1:"#7e57c2",darken1:"#5e35b1",darken2:"#512da8",darken3:"#4527a0",darken4:"#311b92",accent1:"#b388ff",accent2:"#7c4dff",accent3:"#651fff",accent4:"#6200ea"}),ky=Object.freeze({base:"#3f51b5",lighten5:"#e8eaf6",lighten4:"#c5cae9",lighten3:"#9fa8da",lighten2:"#7986cb",lighten1:"#5c6bc0",darken1:"#3949ab",darken2:"#303f9f",darken3:"#283593",darken4:"#1a237e",accent1:"#8c9eff",accent2:"#536dfe",accent3:"#3d5afe",accent4:"#304ffe"}),by=Object.freeze({base:"#2196f3",lighten5:"#e3f2fd",lighten4:"#bbdefb",lighten3:"#90caf9",lighten2:"#64b5f6",lighten1:"#42a5f5",darken1:"#1e88e5",darken2:"#1976d2",darken3:"#1565c0",darken4:"#0d47a1",accent1:"#82b1ff",accent2:"#448aff",accent3:"#2979ff",accent4:"#2962ff"}),wy=Object.freeze({base:"#03a9f4",lighten5:"#e1f5fe",lighten4:"#b3e5fc",lighten3:"#81d4fa",lighten2:"#4fc3f7",lighten1:"#29b6f6",darken1:"#039be5",darken2:"#0288d1",darken3:"#0277bd",darken4:"#01579b",accent1:"#80d8ff",accent2:"#40c4ff",accent3:"#00b0ff",accent4:"#0091ea"}),My=Object.freeze({base:"#00bcd4",lighten5:"#e0f7fa",lighten4:"#b2ebf2",lighten3:"#80deea",lighten2:"#4dd0e1",lighten1:"#26c6da",darken1:"#00acc1",darken2:"#0097a7",darken3:"#00838f",darken4:"#006064",accent1:"#84ffff",accent2:"#18ffff",accent3:"#00e5ff",accent4:"#00b8d4"}),xy=Object.freeze({base:"#009688",lighten5:"#e0f2f1",lighten4:"#b2dfdb",lighten3:"#80cbc4",lighten2:"#4db6ac",lighten1:"#26a69a",darken1:"#00897b",darken2:"#00796b",darken3:"#00695c",darken4:"#004d40",accent1:"#a7ffeb",accent2:"#64ffda",accent3:"#1de9b6",accent4:"#00bfa5"}),Sy=Object.freeze({base:"#4caf50",lighten5:"#e8f5e9",lighten4:"#c8e6c9",lighten3:"#a5d6a7",lighten2:"#81c784",lighten1:"#66bb6a",darken1:"#43a047",darken2:"#388e3c",darken3:"#2e7d32",darken4:"#1b5e20",accent1:"#b9f6ca",accent2:"#69f0ae",accent3:"#00e676",accent4:"#00c853"}),Ly=Object.freeze({base:"#8bc34a",lighten5:"#f1f8e9",lighten4:"#dcedc8",lighten3:"#c5e1a5",lighten2:"#aed581",lighten1:"#9ccc65",darken1:"#7cb342",darken2:"#689f38",darken3:"#558b2f",darken4:"#33691e",accent1:"#ccff90",accent2:"#b2ff59",accent3:"#76ff03",accent4:"#64dd17"}),Ay=Object.freeze({base:"#cddc39",lighten5:"#f9fbe7",lighten4:"#f0f4c3",lighten3:"#e6ee9c",lighten2:"#dce775",lighten1:"#d4e157",darken1:"#c0ca33",darken2:"#afb42b",darken3:"#9e9d24",darken4:"#827717",accent1:"#f4ff81",accent2:"#eeff41",accent3:"#c6ff00",accent4:"#aeea00"}),Cy=Object.freeze({base:"#ffeb3b",lighten5:"#fffde7",lighten4:"#fff9c4",lighten3:"#fff59d",lighten2:"#fff176",lighten1:"#ffee58",darken1:"#fdd835",darken2:"#fbc02d",darken3:"#f9a825",darken4:"#f57f17",accent1:"#ffff8d",accent2:"#ffff00",accent3:"#ffea00",accent4:"#ffd600"}),Iy=Object.freeze({base:"#ffc107",lighten5:"#fff8e1",lighten4:"#ffecb3",lighten3:"#ffe082",lighten2:"#ffd54f",lighten1:"#ffca28",darken1:"#ffb300",darken2:"#ffa000",darken3:"#ff8f00",darken4:"#ff6f00",accent1:"#ffe57f",accent2:"#ffd740",accent3:"#ffc400",accent4:"#ffab00"}),Ty=Object.freeze({base:"#ff9800",lighten5:"#fff3e0",lighten4:"#ffe0b2",lighten3:"#ffcc80",lighten2:"#ffb74d",lighten1:"#ffa726",darken1:"#fb8c00",darken2:"#f57c00",darken3:"#ef6c00",darken4:"#e65100",accent1:"#ffd180",accent2:"#ffab40",accent3:"#ff9100",accent4:"#ff6d00"}),By=Object.freeze({base:"#ff5722",lighten5:"#fbe9e7",lighten4:"#ffccbc",lighten3:"#ffab91",lighten2:"#ff8a65",lighten1:"#ff7043",darken1:"#f4511e",darken2:"#e64a19",darken3:"#d84315",darken4:"#bf360c",accent1:"#ff9e80",accent2:"#ff6e40",accent3:"#ff3d00",accent4:"#dd2c00"}),Hy=Object.freeze({base:"#795548",lighten5:"#efebe9",lighten4:"#d7ccc8",lighten3:"#bcaaa4",lighten2:"#a1887f",lighten1:"#8d6e63",darken1:"#6d4c41",darken2:"#5d4037",darken3:"#4e342e",darken4:"#3e2723"}),Dy=Object.freeze({base:"#607d8b",lighten5:"#eceff1",lighten4:"#cfd8dc",lighten3:"#b0bec5",lighten2:"#90a4ae",lighten1:"#78909c",darken1:"#546e7a",darken2:"#455a64",darken3:"#37474f",darken4:"#263238"}),Gy=Object.freeze({base:"#9e9e9e",lighten5:"#fafafa",lighten4:"#f5f5f5",lighten3:"#eeeeee",lighten2:"#e0e0e0",lighten1:"#bdbdbd",darken1:"#757575",darken2:"#616161",darken3:"#424242",darken4:"#212121"}),Ey=Object.freeze({black:"#000000",white:"#ffffff",transparent:"#ffffff00"}),Fy=Object.freeze({red:fy,pink:vy,purple:py,deepPurple:yy,indigo:ky,blue:by,lightBlue:wy,cyan:My,teal:xy,green:Sy,lightGreen:Ly,lime:Ay,yellow:Cy,amber:Iy,orange:Ty,deepOrange:By,brown:Hy,blueGrey:Dy,grey:Gy,shades:Ey}),qy=P({swatches:{type:Array,default:()=>Ry(Fy)},disabled:Boolean,color:Object,maxHeight:[Number,String],...ce()},"VColorPickerSwatches");function Ry(e){return Object.keys(e).map(a=>{const t=e[a];return t.base?[t.base,t.darken4,t.darken3,t.darken2,t.darken1,t.lighten1,t.lighten2,t.lighten3,t.lighten4,t.lighten5]:[t.black,t.white,t.transparent]})}const Py=za({name:"VColorPickerSwatches",props:qy(),emits:{"update:color":e=>!0},setup(e,a){let{emit:t}=a;return ae(()=>m("div",{class:["v-color-picker-swatches",e.class],style:[{maxHeight:ue(e.maxHeight)},e.style]},[m("div",null,[e.swatches.map(n=>m("div",{class:"v-color-picker-swatches__swatch"},[n.map(s=>{const l=wt(s),i=El(l),o=$u(l);return m("div",{class:"v-color-picker-swatches__color",onClick:()=>i&&t("update:color",i)},[m("div",{style:{background:o}},[e.color&&hn(e.color,i)?m(Re,{size:"x-small",icon:"$success",color:v5(s,"#FFFFFF")>2?"white":"black"},null):void 0])])})]))])])),{}}});const Bm=P({color:String,...Fa(),...ce(),...Wa(),...ta(),...Wt(),...Yn(),...Qe(),...Le(),...De()},"VSheet"),co=j()({name:"VSheet",props:Bm(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{backgroundColorClasses:s,backgroundColorStyles:l}=ea(Z(e,"color")),{borderClasses:i}=Qa(e),{dimensionStyles:o}=Va(e),{elevationClasses:r}=ua(e),{locationStyles:c}=Vt(e),{positionClasses:d}=Zn(e),{roundedClasses:u}=$e(e);return ae(()=>m(e.tag,{class:["v-sheet",n.value,s.value,i.value,r.value,d.value,u.value,e.class],style:[l.value,o.value,c.value,e.style]},t)),{}}}),Ny=P({canvasHeight:{type:[String,Number],default:150},disabled:Boolean,dotSize:{type:[Number,String],default:10},hideCanvas:Boolean,hideSliders:Boolean,hideInputs:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(dn).includes(e)},modes:{type:Array,default:()=>Object.keys(dn),validator:e=>Array.isArray(e)&&e.every(a=>Object.keys(dn).includes(a))},showSwatches:Boolean,swatches:Array,swatchesMaxHeight:{type:[Number,String],default:150},modelValue:{type:[Object,String]},...ft(Bm({width:300}),["height","location","minHeight","maxHeight","minWidth","maxWidth"])},"VColorPicker"),Oy=za({name:"VColorPicker",props:Ny(),emits:{"update:modelValue":e=>!0,"update:mode":e=>!0},setup(e){const a=xe(e,"mode"),t=se(null),n=xe(e,"modelValue",void 0,i=>{if(i==null||i==="")return null;let o;try{o=El(wt(i))}catch{return null}return t.value&&(o={...o,h:t.value.h},t.value=null),o},i=>i?ty(i,e.modelValue):null),{rtlClasses:s}=ra(),l=i=>{n.value=i,t.value=i};return ya(()=>{e.modes.includes(a.value)||(a.value=e.modes[0])}),Xe({VSlider:{color:void 0,trackColor:void 0,trackFillColor:void 0}}),ae(()=>{const[i]=co.filterProps(e);return m(co,ie({rounded:e.rounded,elevation:e.elevation,theme:e.theme,class:["v-color-picker",s.value,e.class],style:[{"--v-color-picker-color-hsv":ju({...n.value??fs,a:1})},e.style]},i,{maxWidth:e.width}),{default:()=>[!e.hideCanvas&&m(ey,{key:"canvas",color:n.value,"onUpdate:color":l,disabled:e.disabled,dotSize:e.dotSize,width:e.width,height:e.canvasHeight},null),(!e.hideSliders||!e.hideInputs)&&m("div",{key:"controls",class:"v-color-picker__controls"},[!e.hideSliders&&m(gy,{key:"preview",color:n.value,"onUpdate:color":l,hideAlpha:!a.value.endsWith("a"),disabled:e.disabled},null),!e.hideInputs&&m(ry,{key:"edit",modes:e.modes,mode:a.value,"onUpdate:mode":o=>a.value=o,color:n.value,"onUpdate:color":l,disabled:e.disabled},null)]),e.showSwatches&&m(Py,{key:"swatches",color:n.value,"onUpdate:color":l,maxHeight:e.swatchesMaxHeight,swatches:e.swatches,disabled:e.disabled},null)]})}),{}}});function zy(e,a,t){if(a==null)return e;if(Array.isArray(a))throw new Error("Multiple matches is not implemented");return typeof a=="number"&&~a?m(ve,null,[m("span",{class:"v-combobox__unmask"},[e.substr(0,a)]),m("span",{class:"v-combobox__mask"},[e.substr(a,t)]),m("span",{class:"v-combobox__unmask"},[e.substr(a+t)])]):e}const _y=P({autoSelectFirst:{type:[Boolean,String]},delimiters:Array,...cm({filterKeys:["title"]}),...wr({hideNoData:!0,returnObject:!0}),...ft($l({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...Bt({transition:!1})},"VCombobox"),Wy=j()({name:"VCombobox",props:_y(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:search":e=>!0,"update:menu":e=>!0},setup(e,a){var O;let{emit:t,slots:n}=a;const{t:s}=_a(),l=se(),i=re(!1),o=re(!0),r=re(!1),c=se(),d=xe(e,"menu"),u=y({get:()=>d.value,set:F=>{var Y;d.value&&!F&&((Y=c.value)!=null&&Y.ΨopenChildren)||(d.value=F)}}),h=re(-1);let g=!1;const f=y(()=>{var F;return(F=l.value)==null?void 0:F.color}),{items:v,transformIn:k,transformOut:b}=pr(e),{textColorClasses:p,textColorStyles:w}=pa(f),C=xe(e,"modelValue",[],F=>k(Na(F)),F=>{const Y=b(F);return e.multiple?Y:Y[0]??null}),H=Wl(),B=re(e.multiple?"":((O=C.value[0])==null?void 0:O.title)??""),I=y({get:()=>B.value,set:F=>{var Y;if(B.value=F,e.multiple||(C.value=[Cn(e,F)]),F&&e.multiple&&((Y=e.delimiters)!=null&&Y.length)){const ge=F.split(new RegExp(`(?:${e.delimiters.join("|")})+`));ge.length>1&&(ge.forEach(M=>{M=M.trim(),M&&ke(Cn(e,M))}),B.value="")}F||(h.value=-1),o.value=!F}});de(B,F=>{g?ze(()=>g=!1):i.value&&!u.value&&(u.value=!0),t("update:search",F)}),de(C,F=>{var Y;e.multiple||(B.value=((Y=F[0])==null?void 0:Y.title)??"")});const{filteredItems:x,getMatches:L}=dm(e,v,()=>o.value?"":I.value),T=y(()=>C.value.map(F=>v.value.find(Y=>{const ge=fa(Y.raw,e.itemValue),M=fa(F.raw,e.itemValue);return ge===void 0||M===void 0?!1:e.returnObject?e.valueComparator(ge,M):e.valueComparator(Y.value,F.value)})||F)),E=y(()=>e.hideSelected?x.value.filter(F=>!T.value.some(Y=>Y.value===F.value)):x.value),D=y(()=>T.value.map(F=>F.props.value)),q=y(()=>T.value[h.value]),U=y(()=>{var Y;return(e.autoSelectFirst===!0||e.autoSelectFirst==="exact"&&I.value===((Y=E.value[0])==null?void 0:Y.title))&&E.value.length>0&&!o.value&&!r.value}),_=y(()=>e.hideNoData&&!v.value.length||e.readonly||(H==null?void 0:H.isReadonly.value)),J=se(),{onListScroll:K,onListKeydown:z}=br(J,l);function ee(F){g=!0,e.openOnClear&&(u.value=!0)}function Q(){_.value||(u.value=!0)}function te(F){_.value||(i.value&&(F.preventDefault(),F.stopPropagation()),u.value=!u.value)}function he(F){var M;if(e.readonly||H!=null&&H.isReadonly.value)return;const Y=l.value.selectionStart,ge=D.value.length;if((h.value>-1||["Enter","ArrowDown","ArrowUp"].includes(F.key))&&F.preventDefault(),["Enter","ArrowDown"].includes(F.key)&&(u.value=!0),["Escape"].includes(F.key)&&(u.value=!1),["Enter","Escape","Tab"].includes(F.key)&&(U.value&&["Enter","Tab"].includes(F.key)&&ke(x.value[0]),o.value=!0),F.key==="ArrowDown"&&U.value&&((M=J.value)==null||M.focus("next")),!!e.multiple){if(["Backspace","Delete"].includes(F.key)){if(h.value<0){F.key==="Backspace"&&!I.value&&(h.value=ge-1);return}const S=h.value;q.value&&ke(q.value),h.value=S>=ge-1?ge-2:S}if(F.key==="ArrowLeft"){if(h.value<0&&Y>0)return;const S=h.value>-1?h.value-1:ge-1;T.value[S]?h.value=S:(h.value=-1,l.value.setSelectionRange(I.value.length,I.value.length))}if(F.key==="ArrowRight"){if(h.value<0)return;const S=h.value+1;T.value[S]?h.value=S:(h.value=-1,l.value.setSelectionRange(0,0))}F.key==="Enter"&&I.value&&(ke(Cn(e,I.value)),I.value="")}}function we(){var F;i.value&&(o.value=!0,(F=l.value)==null||F.focus())}function ke(F){if(e.multiple){const Y=D.value.findIndex(ge=>e.valueComparator(ge,F.value));if(Y===-1)C.value=[...C.value,F];else{const ge=[...C.value];ge.splice(Y,1),C.value=ge}I.value=""}else C.value=[F],B.value=F.title,ze(()=>{u.value=!1,o.value=!0})}function Ie(F){i.value=!0,setTimeout(()=>{r.value=!0})}function $(F){r.value=!1}function R(F){(F==null||F===""&&!e.multiple)&&(C.value=[])}return de(x,F=>{!F.length&&e.hideNoData&&(u.value=!1)}),de(i,(F,Y)=>{F||F===Y||(h.value=-1,u.value=!1,U.value&&!r.value&&!T.value.some(ge=>{let{value:M}=ge;return M===E.value[0].value})?ke(E.value[0]):e.multiple&&I.value&&(C.value=[...C.value,Cn(e,I.value)],I.value=""))}),ae(()=>{const F=!!(e.chips||n.chip),Y=!!(!e.hideNoData||E.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),ge=C.value.length>0,[M]=ct.filterProps(e);return m(ct,ie({ref:l},M,{modelValue:I.value,"onUpdate:modelValue":[S=>I.value=S,R],focused:i.value,"onUpdate:focused":S=>i.value=S,validationValue:C.externalValue,dirty:ge,class:["v-combobox",{"v-combobox--active-menu":u.value,"v-combobox--chips":!!e.chips,"v-combobox--selection-slot":!!n.selection,"v-combobox--selecting-index":h.value>-1,[`v-combobox--${e.multiple?"multiple":"single"}`]:!0},e.class],style:e.style,readonly:e.readonly,placeholder:ge?void 0:e.placeholder,"onClick:clear":ee,"onMousedown:control":Q,onKeydown:he}),{...n,default:()=>m(ve,null,[m(Ul,ie({ref:c,modelValue:u.value,"onUpdate:modelValue":S=>u.value=S,activator:"parent",contentClass:"v-combobox__content",disabled:_.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:we},e.menuProps),{default:()=>[Y&&m(Vl,{ref:J,selected:D.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:S=>S.preventDefault(),onKeydown:z,onFocusin:Ie,onFocusout:$,onScrollPassive:K,tabindex:"-1",color:e.itemColor??e.color},{default:()=>{var S,G,N;return[(S=n["prepend-item"])==null?void 0:S.call(n),!E.value.length&&!e.hideNoData&&(((G=n["no-data"])==null?void 0:G.call(n))??m(ht,{title:s(e.noDataText)},null)),m(jl,{renderless:!0,items:E.value},{default:W=>{var X;let{item:V,index:le,itemRef:ne}=W;const oe=ie(V.props,{ref:ne,key:le,active:U.value&&le===0?!0:void 0,onClick:()=>ke(V)});return((X=n.item)==null?void 0:X.call(n,{item:V,index:le,props:oe}))??m(ht,oe,{prepend:fe=>{let{isSelected:me}=fe;return m(ve,null,[e.multiple&&!e.hideSelected?m(Pn,{key:V.value,modelValue:me,ripple:!1,tabindex:"-1"},null):void 0,V.props.prependIcon&&m(Re,{icon:V.props.prependIcon},null)])},title:()=>{var fe,me;return o.value?V.title:zy(V.title,(fe=L(V))==null?void 0:fe.title,((me=I.value)==null?void 0:me.length)??0)}})}}),(N=n["append-item"])==null?void 0:N.call(n)]}})]}),T.value.map((S,G)=>{var V;function N(le){le.stopPropagation(),le.preventDefault(),ke(S)}const W={"onClick:close":N,onMousedown(le){le.preventDefault(),le.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0};return m("div",{key:S.value,class:["v-combobox__selection",G===h.value&&["v-combobox__selection--selected",p.value]],style:G===h.value?w.value:{}},[F?n.chip?m(Ne,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:S.title}}},{default:()=>{var le;return[(le=n.chip)==null?void 0:le.call(n,{item:S,index:G,props:W})]}}):m(Ns,ie({key:"chip",closable:e.closableChips,size:"small",text:S.title},W),null):((V=n.selection)==null?void 0:V.call(n,{item:S,index:G}))??m("span",{class:"v-combobox__selection-text"},[S.title,e.multiple&&G<T.value.length-1&&m("span",{class:"v-combobox__selection-comma"},[La(",")])])])})]),"append-inner":function(){var W;for(var S=arguments.length,G=new Array(S),N=0;N<S;N++)G[N]=arguments[N];return m(ve,null,[(W=n["append-inner"])==null?void 0:W.call(n,...G),(!e.hideNoData||e.items.length)&&e.menuIcon?m(Re,{class:"v-combobox__menu-icon",icon:e.menuIcon,onMousedown:te,onClick:Wu},null):void 0])}})}),tt({isFocused:i,isPristine:o,menu:u,search:I,selectionIndex:h,filteredItems:x,select:ke},l)}});const Vy=P({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...Os({origin:"center center",scrollStrategy:"block",transition:{component:Rl},zIndex:2400})},"VDialog"),Qy=j()({name:"VDialog",props:Vy(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{scopeId:s}=es(),l=se();function i(r){var u,h;const c=r.relatedTarget,d=r.target;if(c!==d&&((u=l.value)!=null&&u.contentEl)&&((h=l.value)!=null&&h.globalTop)&&![document,l.value.contentEl].includes(d)&&!l.value.contentEl.contains(d)){const g=As(l.value.contentEl);if(!g.length)return;const f=g[0],v=g[g.length-1];c===f?v.focus():f.focus()}}Ke&&de(()=>n.value&&e.retainFocus,r=>{r?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),de(n,async r=>{var c,d;await ze(),r?(c=l.value.contentEl)==null||c.focus({preventScroll:!0}):(d=l.value.activatorEl)==null||d.focus({preventScroll:!0})});const o=y(()=>ie({"aria-haspopup":"dialog","aria-expanded":String(n.value)},e.activatorProps));return ae(()=>{const[r]=At.filterProps(e);return m(At,ie({ref:l,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},r,{modelValue:n.value,"onUpdate:modelValue":c=>n.value=c,"aria-modal":"true",activatorProps:o.value,role:"dialog"},s),{activator:t.activator,default:function(){for(var c=arguments.length,d=new Array(c),u=0;u<c;u++)d[u]=arguments[u];return m(Ne,{root:"VDialog"},{default:()=>{var h;return[(h=t.default)==null?void 0:h.call(t,...d)]}})}})}),tt({},l)}});const Gs=Symbol.for("vuetify:v-expansion-panel"),Uy=["default","accordion","inset","popout"],Ky=P({color:String,variant:{type:String,default:"default",validator:e=>Uy.includes(e)},readonly:Boolean,...ce(),...Kn(),...Le(),...De()},"VExpansionPanels"),Jy=j()({name:"VExpansionPanels",props:Ky(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;yn(e,Gs);const{themeClasses:n}=qe(e),s=y(()=>e.variant&&`v-expansion-panels--variant-${e.variant}`);return Xe({VExpansionPanel:{color:Z(e,"color")},VExpansionPanelTitle:{readonly:Z(e,"readonly")}}),ae(()=>m(e.tag,{class:["v-expansion-panels",n.value,s.value,e.class],style:e.style},t)),{}}}),$y=P({...ce(),...Ql()},"VExpansionPanelText"),Hm=j()({name:"VExpansionPanelText",props:$y(),setup(e,a){let{slots:t}=a;const n=He(Gs);if(!n)throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");const{hasContent:s,onAfterLeave:l}=yr(e,n.isSelected);return ae(()=>m(Pl,{onAfterLeave:l},{default:()=>{var i;return[Je(m("div",{class:["v-expansion-panel-text",e.class],style:e.style},[t.default&&s.value&&m("div",{class:"v-expansion-panel-text__wrapper"},[(i=t.default)==null?void 0:i.call(t)])]),[[gt,n.isSelected.value]])]}})),{}}}),Dm=P({color:String,expandIcon:{type:be,default:"$expand"},collapseIcon:{type:be,default:"$collapse"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1},readonly:Boolean,...ce()},"VExpansionPanelTitle"),Gm=j()({name:"VExpansionPanelTitle",directives:{Ripple:Qt},props:Dm(),setup(e,a){let{slots:t}=a;const n=He(Gs);if(!n)throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");const{backgroundColorClasses:s,backgroundColorStyles:l}=ea(e,"color"),i=y(()=>({collapseIcon:e.collapseIcon,disabled:n.disabled.value,expanded:n.isSelected.value,expandIcon:e.expandIcon,readonly:e.readonly}));return ae(()=>{var o;return Je(m("button",{class:["v-expansion-panel-title",{"v-expansion-panel-title--active":n.isSelected.value},s.value,e.class],style:[l.value,e.style],type:"button",tabindex:n.disabled.value?-1:void 0,disabled:n.disabled.value,"aria-expanded":n.isSelected.value,onClick:e.readonly?void 0:n.toggle},[m("span",{class:"v-expansion-panel-title__overlay"},null),(o=t.default)==null?void 0:o.call(t,i.value),!e.hideActions&&m("span",{class:"v-expansion-panel-title__icon"},[t.actions?t.actions(i.value):m(Re,{icon:n.isSelected.value?e.collapseIcon:e.expandIcon},null)])]),[[Ga("ripple"),e.ripple]])}),{}}}),jy=P({title:String,text:String,bgColor:String,...ce(),...ta(),...Jn(),...Ql(),...Qe(),...Le(),...Dm()},"VExpansionPanel"),Yy=j()({name:"VExpansionPanel",props:jy(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:t}=a;const n=$n(e,Gs),{backgroundColorClasses:s,backgroundColorStyles:l}=ea(e,"bgColor"),{elevationClasses:i}=ua(e),{roundedClasses:o}=$e(e),r=y(()=>(n==null?void 0:n.disabled.value)||e.disabled),c=y(()=>n.group.items.value.reduce((h,g,f)=>(n.group.selected.value.includes(g.id)&&h.push(f),h),[])),d=y(()=>{const h=n.group.items.value.findIndex(g=>g.id===n.id);return!n.isSelected.value&&c.value.some(g=>g-h===1)}),u=y(()=>{const h=n.group.items.value.findIndex(g=>g.id===n.id);return!n.isSelected.value&&c.value.some(g=>g-h===-1)});return je(Gs,n),Xe({VExpansionPanelText:{eager:Z(e,"eager")}}),ae(()=>{const h=!!(t.text||e.text),g=!!(t.title||e.title);return m(e.tag,{class:["v-expansion-panel",{"v-expansion-panel--active":n.isSelected.value,"v-expansion-panel--before-active":d.value,"v-expansion-panel--after-active":u.value,"v-expansion-panel--disabled":r.value},o.value,s.value,e.class],style:[l.value,e.style]},{default:()=>{var f;return[m("div",{class:["v-expansion-panel__shadow",...i.value]},null),g&&m(Gm,{key:"title",collapseIcon:e.collapseIcon,color:e.color,expandIcon:e.expandIcon,hideActions:e.hideActions,ripple:e.ripple},{default:()=>[t.title?t.title():e.title]}),h&&m(Hm,{key:"text"},{default:()=>[t.text?t.text():e.text]}),(f=t.default)==null?void 0:f.call(t)]}})}),{}}});const Zy=P({chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,showSize:{type:[Boolean,Number],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(e)},...Dt({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>Na(e).every(a=>a!=null&&typeof a=="object")},...Jl({clearable:!0})},"VFileInput"),Xy=j()({name:"VFileInput",inheritAttrs:!1,props:Zy(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const{t:l}=_a(),i=xe(e,"modelValue"),{isFocused:o,focus:r,blur:c}=Ut(e),d=y(()=>typeof e.showSize!="boolean"?e.showSize:void 0),u=y(()=>(i.value??[]).reduce((L,T)=>{let{size:E=0}=T;return L+E},0)),h=y(()=>Mc(u.value,d.value)),g=y(()=>(i.value??[]).map(L=>{const{name:T="",size:E=0}=L;return e.showSize?`${T} (${Mc(E,d.value)})`:T})),f=y(()=>{var T;const L=((T=i.value)==null?void 0:T.length)??0;return e.showSize?l(e.counterSizeString,L,h.value):l(e.counterString,L)}),v=se(),k=se(),b=se(),p=y(()=>o.value||e.active),w=y(()=>["plain","underlined"].includes(e.variant));function C(){var L;b.value!==document.activeElement&&((L=b.value)==null||L.focus()),o.value||r()}function H(L){I(L)}function B(L){n("mousedown:control",L)}function I(L){var T;(T=b.value)==null||T.click(),n("click:control",L)}function x(L){L.stopPropagation(),C(),ze(()=>{i.value=[],Jo(e["onClick:clear"],L)})}return de(i,L=>{(!Array.isArray(L)||!L.length)&&b.value&&(b.value.value="")}),ae(()=>{const L=!!(s.counter||e.counter),T=!!(L||s.details),[E,D]=mn(t),[{modelValue:q,...U}]=da.filterProps(e),[_]=kr(e);return m(da,ie({ref:v,modelValue:i.value,"onUpdate:modelValue":J=>i.value=J,class:["v-file-input",{"v-text-field--plain-underlined":w.value},e.class],style:e.style,"onClick:prepend":H},E,U,{centerAffix:!w.value,focused:o.value}),{...s,default:J=>{let{id:K,isDisabled:z,isDirty:ee,isReadonly:Q,isValid:te}=J;return m(zs,ie({ref:k,"prepend-icon":e.prependIcon,onMousedown:B,onClick:I,"onClick:clear":x,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},_,{id:K.value,active:p.value||ee.value,dirty:ee.value,disabled:z.value,focused:o.value,error:te.value===!1}),{...s,default:he=>{var Ie;let{props:{class:we,...ke}}=he;return m(ve,null,[m("input",ie({ref:b,type:"file",readonly:Q.value,disabled:z.value,multiple:e.multiple,name:e.name,onClick:$=>{$.stopPropagation(),Q.value&&$.preventDefault(),C()},onChange:$=>{if(!$.target)return;const R=$.target;i.value=[...R.files??[]]},onFocus:C,onBlur:c},ke,D),null),m("div",{class:we},[!!((Ie=i.value)!=null&&Ie.length)&&(s.selection?s.selection({fileNames:g.value,totalBytes:u.value,totalBytesReadable:h.value}):e.chips?g.value.map($=>m(Ns,{key:$,size:"small",color:e.color},{default:()=>[$]})):g.value.join(", "))])])}})},details:T?J=>{var K,z;return m(ve,null,[(K=s.details)==null?void 0:K.call(s,J),L&&m(ve,null,[m("span",null,null),m(Kl,{active:!!((z=i.value)!=null&&z.length),value:f.value},s.counter)])])}:void 0})}),tt({},v,k,b)}});const ek=P({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...Fa(),...ce(),...ta(),...Qn(),...Qe(),...Le({tag:"footer"}),...De()},"VFooter"),ak=j()({name:"VFooter",props:ek(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{backgroundColorClasses:s,backgroundColorStyles:l}=ea(Z(e,"color")),{borderClasses:i}=Qa(e),{elevationClasses:o}=ua(e),{roundedClasses:r}=$e(e),c=re(32),{resizeRef:d}=ut(g=>{g.length&&(c.value=g[0].target.clientHeight)}),u=y(()=>e.height==="auto"?c.value:parseInt(e.height,10)),{layoutItemStyles:h}=Un({id:e.name,order:y(()=>parseInt(e.order,10)),position:y(()=>"bottom"),layoutSize:u,elementSize:y(()=>e.height==="auto"?void 0:u.value),active:y(()=>e.app),absolute:Z(e,"absolute")});return ae(()=>m(e.tag,{ref:d,class:["v-footer",n.value,s.value,i.value,o.value,r.value,e.class],style:[l.value,e.app?h.value:{height:ue(e.height)},e.style]},t)),{}}}),tk=P({...ce(),...f1()},"VForm"),Em=j()({name:"VForm",props:tk(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,a){let{slots:t,emit:n}=a;const s=v1(e),l=se();function i(r){r.preventDefault(),s.reset()}function o(r){const c=r,d=s.validate();c.then=d.then.bind(d),c.catch=d.catch.bind(d),c.finally=d.finally.bind(d),n("submit",c),c.defaultPrevented||d.then(u=>{var g;let{valid:h}=u;h&&((g=l.value)==null||g.submit())}),c.preventDefault()}return ae(()=>{var r;return m("form",{ref:l,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:i,onSubmit:o},[(r=t.default)==null?void 0:r.call(t,s)])}),tt(s,l)}});const nk=P({fluid:{type:Boolean,default:!1},...ce(),...Le()},"VContainer"),Fm=j()({name:"VContainer",props:nk(),setup(e,a){let{slots:t}=a;const{rtlClasses:n}=ra();return ae(()=>m(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},n.value,e.class],style:e.style},t)),{}}}),qm=(()=>Fl.reduce((e,a)=>(e[a]={type:[Boolean,String,Number],default:!1},e),{}))(),Rm=(()=>Fl.reduce((e,a)=>{const t="offset"+Ct(a);return e[t]={type:[String,Number],default:null},e},{}))(),Pm=(()=>Fl.reduce((e,a)=>{const t="order"+Ct(a);return e[t]={type:[String,Number],default:null},e},{}))(),od={col:Object.keys(qm),offset:Object.keys(Rm),order:Object.keys(Pm)};function sk(e,a,t){let n=e;if(!(t==null||t===!1)){if(a){const s=a.replace(e,"");n+=`-${s}`}return e==="col"&&(n="v-"+n),e==="col"&&(t===""||t===!0)||(n+=`-${t}`),n.toLowerCase()}}const lk=["auto","start","end","center","baseline","stretch"],ik=P({cols:{type:[Boolean,String,Number],default:!1},...qm,offset:{type:[String,Number],default:null},...Rm,order:{type:[String,Number],default:null},...Pm,alignSelf:{type:String,default:null,validator:e=>lk.includes(e)},...ce(),...Le()},"VCol"),yt=j()({name:"VCol",props:ik(),setup(e,a){let{slots:t}=a;const n=y(()=>{const s=[];let l;for(l in od)od[l].forEach(o=>{const r=e[o],c=sk(l,o,r);c&&s.push(c)});const i=s.some(o=>o.startsWith("v-col-"));return s.push({"v-col":!i||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),s});return()=>{var s;return mt(e.tag,{class:[n.value,e.class],style:e.style},(s=t.default)==null?void 0:s.call(t))}}}),Sr=["start","end","center"],Nm=["space-between","space-around","space-evenly"];function Lr(e,a){return Fl.reduce((t,n)=>{const s=e+Ct(n);return t[s]=a(),t},{})}const ok=[...Sr,"baseline","stretch"],Om=e=>ok.includes(e),zm=Lr("align",()=>({type:String,default:null,validator:Om})),rk=[...Sr,...Nm],_m=e=>rk.includes(e),Wm=Lr("justify",()=>({type:String,default:null,validator:_m})),ck=[...Sr,...Nm,"stretch"],Vm=e=>ck.includes(e),Qm=Lr("alignContent",()=>({type:String,default:null,validator:Vm})),rd={align:Object.keys(zm),justify:Object.keys(Wm),alignContent:Object.keys(Qm)},dk={align:"align",justify:"justify",alignContent:"align-content"};function uk(e,a,t){let n=dk[e];if(t!=null){if(a){const s=a.replace(e,"");n+=`-${s}`}return n+=`-${t}`,n.toLowerCase()}}const hk=P({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:Om},...zm,justify:{type:String,default:null,validator:_m},...Wm,alignContent:{type:String,default:null,validator:Vm},...Qm,...ce(),...Le()},"VRow"),ds=j()({name:"VRow",props:hk(),setup(e,a){let{slots:t}=a;const n=y(()=>{const s=[];let l;for(l in rd)rd[l].forEach(i=>{const o=e[i],r=uk(l,i,o);r&&s.push(r)});return s.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),s});return()=>{var s;return mt(e.tag,{class:["v-row",n.value,e.class],style:e.style},(s=t.default)==null?void 0:s.call(t))}}}),mk=at("v-spacer","div","VSpacer"),gk=P({disabled:Boolean,modelValue:{type:Boolean,default:void 0},...nm()},"VHover"),fk=j()({name:"VHover",props:gk(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{runOpenDelay:s,runCloseDelay:l}=sm(e,i=>!e.disabled&&(n.value=i));return()=>{var i;return(i=t.default)==null?void 0:i.call(t,{isHovering:n.value,props:{onMouseenter:s,onMouseleave:l}})}}});const Um=Symbol.for("vuetify:v-item-group"),vk=P({...ce(),...Kn({selectedClass:"v-item--selected"}),...Le(),...De()},"VItemGroup"),pk=j()({name:"VItemGroup",props:vk(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{isSelected:s,select:l,next:i,prev:o,selected:r}=yn(e,Um);return()=>m(e.tag,{class:["v-item-group",n.value,e.class],style:e.style},{default:()=>{var c;return[(c=t.default)==null?void 0:c.call(t,{isSelected:s,select:l,next:i,prev:o,selected:r.value})]}})}}),yk=j()({name:"VItem",props:Jn(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:t}=a;const{isSelected:n,select:s,toggle:l,selectedClass:i,value:o,disabled:r}=$n(e,Um);return()=>{var c;return(c=t.default)==null?void 0:c.call(t,{isSelected:n.value,selectedClass:i.value,select:s,toggle:l,value:o.value,disabled:r.value})}}});const kk=at("v-kbd");const bk=P({...ce(),...ch()},"VLayout"),wk=j()({name:"VLayout",props:bk(),setup(e,a){let{slots:t}=a;const{layoutClasses:n,layoutStyles:s,getLayoutItem:l,items:i,layoutRef:o}=dh(e);return ae(()=>{var r;return m("div",{ref:o,class:[n.value,e.class],style:[s.value,e.style]},[(r=t.default)==null?void 0:r.call(t)])}),{getLayoutItem:l,items:i}}});const Mk=P({position:{type:String,required:!0},size:{type:[Number,String],default:300},modelValue:Boolean,...ce(),...Qn()},"VLayoutItem"),xk=j()({name:"VLayoutItem",props:Mk(),setup(e,a){let{slots:t}=a;const{layoutItemStyles:n}=Un({id:e.name,order:y(()=>parseInt(e.order,10)),position:Z(e,"position"),elementSize:Z(e,"size"),layoutSize:Z(e,"size"),active:Z(e,"modelValue"),absolute:Z(e,"absolute")});return()=>{var s;return m("div",{class:["v-layout-item",e.class],style:[n.value,e.style]},[(s=t.default)==null?void 0:s.call(t)])}}}),Sk=P({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...ce(),...Wa(),...Le(),...Bt({transition:"fade-transition"})},"VLazy"),Lk=j()({name:"VLazy",directives:{intersect:Nl},props:Sk(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{dimensionStyles:n}=Va(e),s=xe(e,"modelValue");function l(i){s.value||(s.value=i)}return ae(()=>Je(m(e.tag,{class:["v-lazy",e.class],style:[n.value,e.style]},{default:()=>[s.value&&m(Ya,{transition:e.transition,appear:!0},{default:()=>{var i;return[(i=t.default)==null?void 0:i.call(t)]}})]}),[[Ga("intersect"),{handler:l,options:e.options},null]])),{}}});const Ak=P({locale:String,fallbackLocale:String,messages:Object,rtl:{type:Boolean,default:void 0},...ce()},"VLocaleProvider"),Ck=j()({name:"VLocaleProvider",props:Ak(),setup(e,a){let{slots:t}=a;const{rtlClasses:n}=P5(e);return ae(()=>{var s;return m("div",{class:["v-locale-provider",n.value,e.class],style:e.style},[(s=t.default)==null?void 0:s.call(t)])}),{}}});const Ik=P({scrollable:Boolean,...ce(),...Le({tag:"main"})},"VMain"),Km=j()({name:"VMain",props:Ik(),setup(e,a){let{slots:t}=a;const{mainStyles:n}=pp(),{ssrBootStyles:s}=fn();return ae(()=>m(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[n.value,s.value,e.style]},{default:()=>{var l,i;return[e.scrollable?m("div",{class:"v-main__scroller"},[(l=t.default)==null?void 0:l.call(t)]):(i=t.default)==null?void 0:i.call(t)]}})),{}}});function Tk(e){let{rootEl:a,isSticky:t,layoutItemStyles:n}=e;const s=re(!1),l=re(0),i=y(()=>{const c=typeof s.value=="boolean"?"top":s.value;return[t.value?{top:"auto",bottom:"auto",height:void 0}:void 0,s.value?{[c]:ue(l.value)}:{top:n.value.top}]});ya(()=>{de(t,c=>{c?window.addEventListener("scroll",r,{passive:!0}):window.removeEventListener("scroll",r)},{immediate:!0})}),xa(()=>{window.removeEventListener("scroll",r)});let o=0;function r(){const c=o>window.scrollY?"up":"down",d=a.value.getBoundingClientRect(),u=parseFloat(n.value.top??0),h=window.scrollY-Math.max(0,l.value-u),g=d.height+Math.max(l.value,u)-window.scrollY-window.innerHeight,f=parseFloat(getComputedStyle(a.value).getPropertyValue("--v-body-scroll-y"))||0;d.height<window.innerHeight-u?(s.value="top",l.value=u):c==="up"&&s.value==="bottom"||c==="down"&&s.value==="top"?(l.value=window.scrollY+d.top-f,s.value=!0):c==="down"&&g<=0?(l.value=0,s.value="bottom"):c==="up"&&h<=0&&(f?s.value!=="top"&&(l.value=-h+f+u,s.value="top"):(l.value=d.top+h,s.value="top")),o=window.scrollY}return{isStuck:s,stickyStyles:i}}const Bk=100,Hk=20;function cd(e){const a=1.41421356237;return(e<0?-1:1)*Math.sqrt(Math.abs(e))*a}function dd(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let a=0;for(let t=e.length-1;t>0;t--){if(e[t].t===e[t-1].t)continue;const n=cd(a),s=(e[t].d-e[t-1].d)/(e[t].t-e[t-1].t);a+=(s-n)*Math.abs(s),t===e.length-1&&(a*=.5)}return cd(a)*1e3}function Dk(){const e={};function a(s){Array.from(s.changedTouches).forEach(l=>{(e[l.identifier]??(e[l.identifier]=new Zv(Hk))).push([s.timeStamp,l])})}function t(s){Array.from(s.changedTouches).forEach(l=>{delete e[l.identifier]})}function n(s){var c;const l=(c=e[s])==null?void 0:c.values().reverse();if(!l)throw new Error(`No samples for touch id ${s}`);const i=l[0],o=[],r=[];for(const d of l){if(i[0]-d[0]>Bk)break;o.push({t:d[0],d:d[1].clientX}),r.push({t:d[0],d:d[1].clientY})}return{x:dd(o),y:dd(r),get direction(){const{x:d,y:u}=this,[h,g]=[Math.abs(d),Math.abs(u)];return h>g&&d>=0?"right":h>g&&d<=0?"left":g>h&&u>=0?"down":g>h&&u<=0?"up":Gk()}}}return{addMovement:a,endTouch:t,getVelocity:n}}function Gk(){throw new Error}function Ek(e){let{isActive:a,isTemporary:t,width:n,touchless:s,position:l}=e;ya(()=>{window.addEventListener("touchstart",b,{passive:!0}),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",w,{passive:!0})}),xa(()=>{window.removeEventListener("touchstart",b),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",w)});const i=y(()=>["left","right"].includes(l.value)),{addMovement:o,endTouch:r,getVelocity:c}=Dk();let d=!1;const u=re(!1),h=re(0),g=re(0);let f;function v(H,B){return(l.value==="left"?H:l.value==="right"?document.documentElement.clientWidth-H:l.value==="top"?H:l.value==="bottom"?document.documentElement.clientHeight-H:Sn())-(B?n.value:0)}function k(H){let B=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const I=l.value==="left"?(H-g.value)/n.value:l.value==="right"?(document.documentElement.clientWidth-H-g.value)/n.value:l.value==="top"?(H-g.value)/n.value:l.value==="bottom"?(document.documentElement.clientHeight-H-g.value)/n.value:Sn();return B?Math.max(0,Math.min(1,I)):I}function b(H){if(s.value)return;const B=H.changedTouches[0].clientX,I=H.changedTouches[0].clientY,x=25,L=l.value==="left"?B<x:l.value==="right"?B>document.documentElement.clientWidth-x:l.value==="top"?I<x:l.value==="bottom"?I>document.documentElement.clientHeight-x:Sn(),T=a.value&&(l.value==="left"?B<n.value:l.value==="right"?B>document.documentElement.clientWidth-n.value:l.value==="top"?I<n.value:l.value==="bottom"?I>document.documentElement.clientHeight-n.value:Sn());(L||T||a.value&&t.value)&&(d=!0,f=[B,I],g.value=v(i.value?B:I,a.value),h.value=k(i.value?B:I),r(H),o(H))}function p(H){const B=H.changedTouches[0].clientX,I=H.changedTouches[0].clientY;if(d){if(!H.cancelable){d=!1;return}const L=Math.abs(B-f[0]),T=Math.abs(I-f[1]);(i.value?L>T&&L>3:T>L&&T>3)?(u.value=!0,d=!1):(i.value?T:L)>3&&(d=!1)}if(!u.value)return;H.preventDefault(),o(H);const x=k(i.value?B:I,!1);h.value=Math.max(0,Math.min(1,x)),x>1?g.value=v(i.value?B:I,!0):x<0&&(g.value=v(i.value?B:I,!1))}function w(H){if(d=!1,!u.value)return;o(H),u.value=!1;const B=c(H.changedTouches[0].identifier),I=Math.abs(B.x),x=Math.abs(B.y);(i.value?I>x&&I>400:x>I&&x>3)?a.value=B.direction===({left:"right",right:"left",top:"down",bottom:"up"}[l.value]||Sn()):a.value=h.value>.5}const C=y(()=>u.value?{transform:l.value==="left"?`translateX(calc(-100% + ${h.value*n.value}px))`:l.value==="right"?`translateX(calc(100% - ${h.value*n.value}px))`:l.value==="top"?`translateY(calc(-100% + ${h.value*n.value}px))`:l.value==="bottom"?`translateY(calc(100% - ${h.value*n.value}px))`:Sn(),transition:"none"}:void 0);return{isDragging:u,dragProgress:h,dragStyles:C}}function Sn(){throw new Error}const Fk=["start","end","left","right","top","bottom"],qk=P({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>Fk.includes(e)},sticky:Boolean,...Fa(),...ce(),...ta(),...Qn(),...Qe(),...Le({tag:"nav"}),...De()},"VNavigationDrawer"),Rk=j()({name:"VNavigationDrawer",props:qk(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const{isRtl:l}=ra(),{themeClasses:i}=qe(e),{borderClasses:o}=Qa(e),{backgroundColorClasses:r,backgroundColorStyles:c}=ea(Z(e,"color")),{elevationClasses:d}=ua(e),{mobile:u}=gn(),{roundedClasses:h}=$e(e),g=Sh(),f=xe(e,"modelValue",null,ee=>!!ee),{ssrBootStyles:v}=fn(),{scopeId:k}=es(),b=se(),p=re(!1),w=y(()=>e.rail&&e.expandOnHover&&p.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),C=y(()=>Pi(e.location,l.value)),H=y(()=>!e.permanent&&(u.value||e.temporary)),B=y(()=>e.sticky&&!H.value&&C.value!=="bottom");e.expandOnHover&&e.rail!=null&&de(p,ee=>n("update:rail",!ee)),e.disableResizeWatcher||de(H,ee=>!e.permanent&&ze(()=>f.value=!ee)),!e.disableRouteWatcher&&g&&de(g.currentRoute,()=>H.value&&(f.value=!1)),de(()=>e.permanent,ee=>{ee&&(f.value=!0)}),Hl(()=>{e.modelValue!=null||H.value||(f.value=e.permanent||!u.value)});const{isDragging:I,dragProgress:x,dragStyles:L}=Ek({isActive:f,isTemporary:H,width:w,touchless:Z(e,"touchless"),position:C}),T=y(()=>{const ee=H.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):w.value;return I.value?ee*x.value:ee}),{layoutItemStyles:E,layoutItemScrimStyles:D}=Un({id:e.name,order:y(()=>parseInt(e.order,10)),position:C,layoutSize:T,elementSize:w,active:y(()=>f.value||I.value),disableTransitions:y(()=>I.value),absolute:y(()=>e.absolute||B.value&&typeof q.value!="string")}),{isStuck:q,stickyStyles:U}=Tk({rootEl:b,isSticky:B,layoutItemStyles:E}),_=ea(y(()=>typeof e.scrim=="string"?e.scrim:null)),J=y(()=>({...I.value?{opacity:x.value*.2,transition:"none"}:void 0,...D.value}));Xe({VList:{bgColor:"transparent"}});function K(){p.value=!0}function z(){p.value=!1}return ae(()=>{const ee=s.image||e.image;return m(ve,null,[m(e.tag,ie({ref:b,onMouseenter:K,onMouseleave:z,class:["v-navigation-drawer",`v-navigation-drawer--${C.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":p.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":H.value,"v-navigation-drawer--active":f.value,"v-navigation-drawer--sticky":B.value},i.value,r.value,o.value,d.value,h.value,e.class],style:[c.value,E.value,L.value,v.value,U.value,e.style]},k,t),{default:()=>{var Q,te,he,we;return[ee&&m("div",{key:"image",class:"v-navigation-drawer__img"},[s.image?(Q=s.image)==null?void 0:Q.call(s,{image:e.image}):m("img",{src:e.image,alt:""},null)]),s.prepend&&m("div",{class:"v-navigation-drawer__prepend"},[(te=s.prepend)==null?void 0:te.call(s)]),m("div",{class:"v-navigation-drawer__content"},[(he=s.default)==null?void 0:he.call(s)]),s.append&&m("div",{class:"v-navigation-drawer__append"},[(we=s.append)==null?void 0:we.call(s)])]}}),m(dt,{name:"fade-transition"},{default:()=>[H.value&&(I.value||f.value)&&!!e.scrim&&m("div",ie({class:["v-navigation-drawer__scrim",_.backgroundColorClasses.value],style:[J.value,_.backgroundColorStyles.value],onClick:()=>f.value=!1},k),null)]})])}),{isStuck:q}}}),Pk=za({name:"VNoSsr",setup(e,a){let{slots:t}=a;const n=lm();return()=>{var s;return n.value&&((s=t.default)==null?void 0:s.call(t))}}});function Nk(){const e=se([]);gu(()=>e.value=[]);function a(t,n){e.value[n]=t}return{refs:e,updateRef:a}}const Ok=P({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1===0},totalVisible:[Number,String],firstIcon:{type:be,default:"$first"},prevIcon:{type:be,default:"$prev"},nextIcon:{type:be,default:"$next"},lastIcon:{type:be,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...Fa(),...ce(),...na(),...ta(),...Qe(),...Ht(),...Le({tag:"nav"}),...De(),...Ua({variant:"text"})},"VPagination"),zk=j()({name:"VPagination",props:Ok(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,a){let{slots:t,emit:n}=a;const s=xe(e,"modelValue"),{t:l,n:i}=_a(),{isRtl:o}=ra(),{themeClasses:r}=qe(e),{width:c}=gn(),d=re(-1);Xe(void 0,{scoped:!0});const{resizeRef:u}=ut(x=>{if(!x.length)return;const{target:L,contentRect:T}=x[0],E=L.querySelector(".v-pagination__list > *");if(!E)return;const D=T.width,q=E.offsetWidth+parseFloat(getComputedStyle(E).marginRight)*2;d.value=v(D,q)}),h=y(()=>parseInt(e.length,10)),g=y(()=>parseInt(e.start,10)),f=y(()=>e.totalVisible?parseInt(e.totalVisible,10):d.value>=0?d.value:v(c.value,58));function v(x,L){const T=e.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((x-L*T)/L).toFixed(2)))}const k=y(()=>{if(h.value<=0||isNaN(h.value)||h.value>Number.MAX_SAFE_INTEGER)return[];if(f.value<=1)return[s.value];if(h.value<=f.value)return bt(h.value,g.value);const x=f.value%2===0,L=x?f.value/2:Math.floor(f.value/2),T=x?L:L+1,E=h.value-L;if(T-s.value>=0)return[...bt(Math.max(1,f.value-1),g.value),e.ellipsis,h.value];if(s.value-E>=(x?1:0)){const D=f.value-1,q=h.value-D+g.value;return[g.value,e.ellipsis,...bt(D,q)]}else{const D=Math.max(1,f.value-3),q=D===1?s.value:s.value-Math.ceil(D/2)+g.value;return[g.value,e.ellipsis,...bt(D,q),e.ellipsis,h.value]}});function b(x,L,T){x.preventDefault(),s.value=L,T&&n(T,L)}const{refs:p,updateRef:w}=Nk();Xe({VPaginationBtn:{color:Z(e,"color"),border:Z(e,"border"),density:Z(e,"density"),size:Z(e,"size"),variant:Z(e,"variant"),rounded:Z(e,"rounded"),elevation:Z(e,"elevation")}});const C=y(()=>k.value.map((x,L)=>{const T=E=>w(E,L);if(typeof x=="string")return{isActive:!1,key:`ellipsis-${L}`,page:x,props:{ref:T,ellipsis:!0,icon:!0,disabled:!0}};{const E=x===s.value;return{isActive:E,key:x,page:i(x),props:{ref:T,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:E?e.activeColor:e.color,ariaCurrent:E,ariaLabel:l(E?e.currentPageAriaLabel:e.pageAriaLabel,x),onClick:D=>b(D,x)}}}})),H=y(()=>{const x=!!e.disabled||s.value<=g.value,L=!!e.disabled||s.value>=g.value+h.value-1;return{first:e.showFirstLastPage?{icon:o.value?e.lastIcon:e.firstIcon,onClick:T=>b(T,g.value,"first"),disabled:x,ariaLabel:l(e.firstAriaLabel),ariaDisabled:x}:void 0,prev:{icon:o.value?e.nextIcon:e.prevIcon,onClick:T=>b(T,s.value-1,"prev"),disabled:x,ariaLabel:l(e.previousAriaLabel),ariaDisabled:x},next:{icon:o.value?e.prevIcon:e.nextIcon,onClick:T=>b(T,s.value+1,"next"),disabled:L,ariaLabel:l(e.nextAriaLabel),ariaDisabled:L},last:e.showFirstLastPage?{icon:o.value?e.firstIcon:e.lastIcon,onClick:T=>b(T,g.value+h.value-1,"last"),disabled:L,ariaLabel:l(e.lastAriaLabel),ariaDisabled:L}:void 0}});function B(){var L;const x=s.value-g.value;(L=p.value[x])==null||L.$el.focus()}function I(x){x.key===qi.left&&!e.disabled&&s.value>+e.start?(s.value=s.value-1,ze(B)):x.key===qi.right&&!e.disabled&&s.value<g.value+h.value-1&&(s.value=s.value+1,ze(B))}return ae(()=>m(e.tag,{ref:u,class:["v-pagination",r.value,e.class],style:e.style,role:"navigation","aria-label":l(e.ariaLabel),onKeydown:I,"data-test":"v-pagination-root"},{default:()=>[m("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&m("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[t.first?t.first(H.value.first):m(ca,ie({_as:"VPaginationBtn"},H.value.first),null)]),m("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[t.prev?t.prev(H.value.prev):m(ca,ie({_as:"VPaginationBtn"},H.value.prev),null)]),C.value.map((x,L)=>m("li",{key:x.key,class:["v-pagination__item",{"v-pagination__item--is-active":x.isActive}],"data-test":"v-pagination-item"},[t.item?t.item(x):m(ca,ie({_as:"VPaginationBtn"},x.props),{default:()=>[x.page]})])),m("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[t.next?t.next(H.value.next):m(ca,ie({_as:"VPaginationBtn"},H.value.next),null)]),e.showFirstLastPage&&m("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[t.last?t.last(H.value.last):m(ca,ie({_as:"VPaginationBtn"},H.value.last),null)])])]})),{}}});function _k(e){return Math.floor(Math.abs(e))*Math.sign(e)}const Wk=P({scale:{type:[Number,String],default:.5},...ce()},"VParallax"),Vk=j()({name:"VParallax",props:Wk(),setup(e,a){let{slots:t}=a;const{intersectionRef:n,isIntersecting:s}=rr(),{resizeRef:l,contentRect:i}=ut(),{height:o}=gn(),r=se();Da(()=>{var g;n.value=l.value=(g=r.value)==null?void 0:g.$el});let c;de(s,g=>{g?(c=Zo(n.value),c=c===document.scrollingElement?document:c,c.addEventListener("scroll",h,{passive:!0}),h()):c.removeEventListener("scroll",h)}),xa(()=>{c==null||c.removeEventListener("scroll",h)}),de(o,h),de(()=>{var g;return(g=i.value)==null?void 0:g.height},h);const d=y(()=>1-va(+e.scale));let u=-1;function h(){s.value&&(cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var H;const g=((H=r.value)==null?void 0:H.$el).querySelector(".v-img__img");if(!g)return;const f=c instanceof Document?document.documentElement.clientHeight:c.clientHeight,v=c instanceof Document?window.scrollY:c.scrollTop,k=n.value.getBoundingClientRect().top+v,b=i.value.height,p=k+(b-f)/2,w=_k((v-p)*d.value),C=Math.max(1,(d.value*(f-b)+b)/b);g.style.setProperty("transform",`translateY(${w}px) scale(${C})`)}))}return ae(()=>m(un,{class:["v-parallax",{"v-parallax--active":s.value},e.class],style:e.style,ref:r,cover:!0,onLoadstart:h,onLoad:h},t)),{}}}),Qk=P({...zl({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),Uk=j()({name:"VRadio",props:Qk(),setup(e,a){let{slots:t}=a;return ae(()=>m(Rn,ie(e,{class:["v-radio",e.class],style:e.style,type:"radio"}),t)),{}}});const Kk=P({height:{type:[Number,String],default:"auto"},...Dt(),...ft(gr(),["multiple"]),trueIcon:{type:be,default:"$radioOn"},falseIcon:{type:be,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),Jk=j()({name:"VRadioGroup",inheritAttrs:!1,props:Kk(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:t,slots:n}=a;const s=ka(),l=y(()=>e.id||`radio-group-${s}`),i=xe(e,"modelValue");return ae(()=>{const[o,r]=mn(t),[c,d]=da.filterProps(e),[u,h]=Rn.filterProps(e),g=n.label?n.label({label:e.label,props:{for:l.value}}):e.label;return m(da,ie({class:["v-radio-group",e.class],style:e.style},o,c,{modelValue:i.value,"onUpdate:modelValue":f=>i.value=f,id:l.value}),{...n,default:f=>{let{id:v,messagesId:k,isDisabled:b,isReadonly:p}=f;return m(ve,null,[g&&m(Xn,{id:v.value},{default:()=>[g]}),m(Fh,ie(u,{id:v.value,"aria-describedby":k.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:b.value,readonly:p.value,"aria-labelledby":g?v.value:void 0,multiple:!1},r,{modelValue:i.value,"onUpdate:modelValue":w=>i.value=w}),n)])}})}),{}}}),$k=P({..._l(),...Dt(),...Am(),strict:Boolean,modelValue:{type:Array,default:()=>[0,0]}},"VRangeSlider"),jk=j()({name:"VRangeSlider",props:$k(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,end:e=>!0,start:e=>!0},setup(e,a){let{slots:t,emit:n}=a;const s=se(),l=se(),i=se(),{rtlClasses:o}=ra();function r(L){if(!s.value||!l.value)return;const T=io(L,s.value.$el,e.direction),E=io(L,l.value.$el,e.direction),D=Math.abs(T),q=Math.abs(E);return D<q||D===q&&T<0?s.value.$el:l.value.$el}const c=Cm(e),d=xe(e,"modelValue",void 0,L=>L!=null&&L.length?L.map(T=>c.roundValue(T)):[0,0]),{activeThumbRef:u,hasLabels:h,max:g,min:f,mousePressed:v,onSliderMousedown:k,onSliderTouchstart:b,position:p,trackContainerRef:w}=Im({props:e,steps:c,onSliderStart:()=>{n("start",d.value)},onSliderEnd:L=>{var D;let{value:T}=L;const E=u.value===((D=s.value)==null?void 0:D.$el)?[T,d.value[1]]:[d.value[0],T];!e.strict&&E[0]<E[1]&&(d.value=E),n("end",d.value)},onSliderMove:L=>{var q,U,_,J;let{value:T}=L;const[E,D]=d.value;!e.strict&&E===D&&E!==f.value&&(u.value=T>E?(q=l.value)==null?void 0:q.$el:(U=s.value)==null?void 0:U.$el,(_=u.value)==null||_.focus()),u.value===((J=s.value)==null?void 0:J.$el)?d.value=[Math.min(T,D),D]:d.value=[E,Math.max(E,T)]},getActiveThumb:r}),{isFocused:C,focus:H,blur:B}=Ut(e),I=y(()=>p(d.value[0])),x=y(()=>p(d.value[1]));return ae(()=>{const[L,T]=da.filterProps(e),E=!!(e.label||t.label||t.prepend);return m(da,ie({class:["v-slider","v-range-slider",{"v-slider--has-labels":!!t["tick-label"]||h.value,"v-slider--focused":C.value,"v-slider--pressed":v.value,"v-slider--disabled":e.disabled},o.value,e.class],style:e.style,ref:i},L,{focused:C.value}),{...t,prepend:E?D=>{var q,U;return m(ve,null,[((q=t.label)==null?void 0:q.call(t,D))??e.label?m(Xn,{class:"v-slider__label",text:e.label},null):void 0,(U=t.prepend)==null?void 0:U.call(t,D)])}:void 0,default:D=>{var _,J;let{id:q,messagesId:U}=D;return m("div",{class:"v-slider__container",onMousedown:k,onTouchstartPassive:b},[m("input",{id:`${q.value}_start`,name:e.name||q.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:d.value[0]},null),m("input",{id:`${q.value}_stop`,name:e.name||q.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:d.value[1]},null),m(Tm,{ref:w,start:I.value,stop:x.value},{"tick-label":t["tick-label"]}),m(oo,{ref:s,"aria-describedby":U.value,focused:C&&u.value===((_=s.value)==null?void 0:_.$el),modelValue:d.value[0],"onUpdate:modelValue":K=>d.value=[K,d.value[1]],onFocus:K=>{var z,ee,Q,te;H(),u.value=(z=s.value)==null?void 0:z.$el,d.value[0]===d.value[1]&&d.value[1]===f.value&&K.relatedTarget!==((ee=l.value)==null?void 0:ee.$el)&&((Q=s.value)==null||Q.$el.blur(),(te=l.value)==null||te.$el.focus())},onBlur:()=>{B(),u.value=void 0},min:f.value,max:d.value[1],position:I.value},{"thumb-label":t["thumb-label"]}),m(oo,{ref:l,"aria-describedby":U.value,focused:C&&u.value===((J=l.value)==null?void 0:J.$el),modelValue:d.value[1],"onUpdate:modelValue":K=>d.value=[d.value[0],K],onFocus:K=>{var z,ee,Q,te;H(),u.value=(z=l.value)==null?void 0:z.$el,d.value[0]===d.value[1]&&d.value[0]===g.value&&K.relatedTarget!==((ee=s.value)==null?void 0:ee.$el)&&((Q=l.value)==null||Q.$el.blur(),(te=s.value)==null||te.$el.focus())},onBlur:()=>{B(),u.value=void 0},min:d.value[0],max:g.value,position:x.value},{"thumb-label":t["thumb-label"]})])}})}),{}}});const Yk=P({name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:be,default:"$ratingEmpty"},fullIcon:{type:be,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:[Number,String],default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...ce(),...na(),...Ht(),...Le(),...De()},"VRating"),Zk=j()({name:"VRating",props:Yk(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{t:n}=_a(),{themeClasses:s}=qe(e),l=xe(e,"modelValue"),i=y(()=>va(parseFloat(l.value),0,+e.length)),o=y(()=>bt(Number(e.length),1)),r=y(()=>o.value.flatMap(v=>e.halfIncrements?[v-.5,v]:[v])),c=re(-1),d=y(()=>r.value.map(v=>{const k=e.hover&&c.value>-1,b=i.value>=v,p=c.value>=v,C=(k?p:b)?e.fullIcon:e.emptyIcon,H=e.activeColor??e.color,B=b||p?H:e.color;return{isFilled:b,isHovered:p,icon:C,color:B}})),u=y(()=>[0,...r.value].map(v=>{function k(){c.value=v}function b(){c.value=-1}function p(){e.disabled||e.readonly||(l.value=i.value===v&&e.clearable?0:v)}return{onMouseenter:e.hover?k:void 0,onMouseleave:e.hover?b:void 0,onClick:p}})),h=y(()=>e.name??`v-rating-${ka()}`);function g(v){var x,L;let{value:k,index:b,showStar:p=!0}=v;const{onMouseenter:w,onMouseleave:C,onClick:H}=u.value[b+1],B=`${h.value}-${String(k).replace(".","-")}`,I={color:(x=d.value[b])==null?void 0:x.color,density:e.density,disabled:e.disabled,icon:(L=d.value[b])==null?void 0:L.icon,ripple:e.ripple,size:e.size,variant:"plain"};return m(ve,null,[m("label",{for:B,class:{"v-rating__item--half":e.halfIncrements&&k%1>0,"v-rating__item--full":e.halfIncrements&&k%1===0},onMouseenter:w,onMouseleave:C,onClick:H},[m("span",{class:"v-rating__hidden"},[n(e.itemAriaLabel,k,e.length)]),p?t.item?t.item({...d.value[b],props:I,value:k,index:b,rating:i.value}):m(ca,ie({"aria-label":n(e.itemAriaLabel,k,e.length)},I),null):void 0]),m("input",{class:"v-rating__hidden",name:h.value,id:B,type:"radio",value:k,checked:i.value===k,tabindex:-1,readonly:e.readonly,disabled:e.disabled},null)])}function f(v){return t["item-label"]?t["item-label"](v):v.label?m("span",null,[v.label]):m("span",null,[La(" ")])}return ae(()=>{var k;const v=!!((k=e.itemLabels)!=null&&k.length)||t["item-label"];return m(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},s.value,e.class],style:e.style},{default:()=>[m(g,{value:0,index:-1,showStar:!1},null),o.value.map((b,p)=>{var w,C;return m("div",{class:"v-rating__wrapper"},[v&&e.itemLabelPosition==="top"?f({value:b,index:p,label:(w=e.itemLabels)==null?void 0:w[p]}):void 0,m("div",{class:"v-rating__item"},[e.halfIncrements?m(ve,null,[m(g,{value:b-.5,index:p*2},null),m(g,{value:b,index:p*2+1},null)]):m(g,{value:b,index:p},null)]),v&&e.itemLabelPosition==="bottom"?f({value:b,index:p,label:(C=e.itemLabels)==null?void 0:C[p]}):void 0])})]})}),{}}});function ud(e){const t=Math.abs(e);return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function hd(e){let{selectedElement:a,containerSize:t,contentSize:n,isRtl:s,currentScrollOffset:l,isHorizontal:i}=e;const o=i?a.clientWidth:a.clientHeight,r=i?a.offsetLeft:a.offsetTop,c=s&&i?n-r-o:r,d=t+l,u=o+c,h=o*.4;return c<=l?l=Math.max(c-h,0):d<=u&&(l=Math.min(l-(d-u-h),n-t)),l}function Xk(e){let{selectedElement:a,containerSize:t,contentSize:n,isRtl:s,isHorizontal:l}=e;const i=l?a.clientWidth:a.clientHeight,o=l?a.offsetLeft:a.offsetTop,r=s&&l?n-o-i/2-t/2:o+i/2-t/2;return Math.min(n-t,Math.max(0,r))}const Jm=Symbol.for("vuetify:v-slide-group"),$m=P({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Jm},nextIcon:{type:be,default:"$next"},prevIcon:{type:be,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...ce(),...Le(),...Kn({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),uo=j()({name:"VSlideGroup",props:$m(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const{isRtl:n}=ra(),{mobile:s}=gn(),l=yn(e,e.symbol),i=re(!1),o=re(0),r=re(0),c=re(0),d=y(()=>e.direction==="horizontal"),{resizeRef:u,contentRect:h}=ut(),{resizeRef:g,contentRect:f}=ut(),v=y(()=>l.selected.value.length?l.items.value.findIndex(Q=>Q.id===l.selected.value[0]):-1),k=y(()=>l.selected.value.length?l.items.value.findIndex(Q=>Q.id===l.selected.value[l.selected.value.length-1]):-1);if(Ke){let Q=-1;de(()=>[l.selected.value,h.value,f.value,d.value],()=>{cancelAnimationFrame(Q),Q=requestAnimationFrame(()=>{if(h.value&&f.value){const te=d.value?"width":"height";r.value=h.value[te],c.value=f.value[te],i.value=r.value+1<c.value}if(v.value>=0&&g.value){const te=g.value.children[k.value];v.value===0||!i.value?o.value=0:e.centerActive?o.value=Xk({selectedElement:te,containerSize:r.value,contentSize:c.value,isRtl:n.value,isHorizontal:d.value}):i.value&&(o.value=hd({selectedElement:te,containerSize:r.value,contentSize:c.value,isRtl:n.value,currentScrollOffset:o.value,isHorizontal:d.value}))}})})}const b=re(!1);let p=0,w=0;function C(Q){const te=d.value?"clientX":"clientY";w=(n.value&&d.value?-1:1)*o.value,p=Q.touches[0][te],b.value=!0}function H(Q){if(!i.value)return;const te=d.value?"clientX":"clientY",he=n.value&&d.value?-1:1;o.value=he*(w+p-Q.touches[0][te])}function B(Q){const te=c.value-r.value;o.value<0||!i.value?o.value=0:o.value>=te&&(o.value=te),b.value=!1}function I(){u.value&&(u.value[d.value?"scrollLeft":"scrollTop"]=0)}const x=re(!1);function L(Q){if(x.value=!0,!(!i.value||!g.value)){for(const te of Q.composedPath())for(const he of g.value.children)if(he===te){o.value=hd({selectedElement:he,containerSize:r.value,contentSize:c.value,isRtl:n.value,currentScrollOffset:o.value,isHorizontal:d.value});return}}}function T(Q){x.value=!1}function E(Q){var te;!x.value&&!(Q.relatedTarget&&((te=g.value)!=null&&te.contains(Q.relatedTarget)))&&q()}function D(Q){g.value&&(d.value?Q.key==="ArrowRight"?q(n.value?"prev":"next"):Q.key==="ArrowLeft"&&q(n.value?"next":"prev"):Q.key==="ArrowDown"?q("next"):Q.key==="ArrowUp"&&q("prev"),Q.key==="Home"?q("first"):Q.key==="End"&&q("last"))}function q(Q){var te,he,we,ke,Ie;if(g.value)if(!Q)(te=As(g.value)[0])==null||te.focus();else if(Q==="next"){const $=(he=g.value.querySelector(":focus"))==null?void 0:he.nextElementSibling;$?$.focus():q("first")}else if(Q==="prev"){const $=(we=g.value.querySelector(":focus"))==null?void 0:we.previousElementSibling;$?$.focus():q("last")}else Q==="first"?(ke=g.value.firstElementChild)==null||ke.focus():Q==="last"&&((Ie=g.value.lastElementChild)==null||Ie.focus())}function U(Q){const te=o.value+(Q==="prev"?-1:1)*r.value;o.value=va(te,0,c.value-r.value)}const _=y(()=>{let Q=o.value>c.value-r.value?-(c.value-r.value)+ud(c.value-r.value-o.value):-o.value;o.value<=0&&(Q=ud(-o.value));const te=n.value&&d.value?-1:1;return{transform:`translate${d.value?"X":"Y"}(${te*Q}px)`,transition:b.value?"none":"",willChange:b.value?"transform":""}}),J=y(()=>({next:l.next,prev:l.prev,select:l.select,isSelected:l.isSelected})),K=y(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!s.value;case!0:return i.value||Math.abs(o.value)>0;case"mobile":return s.value||i.value||Math.abs(o.value)>0;default:return!s.value&&(i.value||Math.abs(o.value)>0)}}),z=y(()=>Math.abs(o.value)>0),ee=y(()=>c.value>Math.abs(o.value)+r.value);return ae(()=>m(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!d.value,"v-slide-group--has-affixes":K.value,"v-slide-group--is-overflowing":i.value},e.class],style:e.style,tabindex:x.value||l.selected.value.length?-1:0,onFocus:E},{default:()=>{var Q,te,he;return[K.value&&m("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!z.value}],onClick:()=>U("prev")},[((Q=t.prev)==null?void 0:Q.call(t,J.value))??m(Qi,null,{default:()=>[m(Re,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),m("div",{key:"container",ref:u,class:"v-slide-group__container",onScroll:I},[m("div",{ref:g,class:"v-slide-group__content",style:_.value,onTouchstartPassive:C,onTouchmovePassive:H,onTouchendPassive:B,onFocusin:L,onFocusout:T,onKeydown:D},[(te=t.default)==null?void 0:te.call(t,J.value)])]),K.value&&m("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!ee.value}],onClick:()=>U("next")},[((he=t.next)==null?void 0:he.call(t,J.value))??m(Qi,null,{default:()=>[m(Re,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:l.selected,scrollTo:U,scrollOffset:o,focus:q}}}),eb=j()({name:"VSlideGroupItem",props:Jn(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:t}=a;const n=$n(e,Jm);return()=>{var s;return(s=t.default)==null?void 0:s.call(t,{isSelected:n.isSelected.value,select:n.select,toggle:n.toggle,selectedClass:n.selectedClass.value})}}});const ab=P({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...Wt({location:"bottom"}),...Yn(),...Qe(),...Ua(),...De(),...ft(Os({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),jm=j()({name:"VSnackbar",props:ab(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{locationStyles:s}=Vt(e),{positionClasses:l}=Zn(e),{scopeId:i}=es(),{themeClasses:o}=qe(e),{colorClasses:r,colorStyles:c,variantClasses:d}=pn(e),{roundedClasses:u}=$e(e),h=se();de(n,f),de(()=>e.timeout,f),ya(()=>{n.value&&f()});let g=-1;function f(){window.clearTimeout(g);const k=Number(e.timeout);!n.value||k===-1||(g=window.setTimeout(()=>{n.value=!1},k))}function v(){window.clearTimeout(g)}return ae(()=>{const[k]=At.filterProps(e);return m(At,ie({ref:h,class:["v-snackbar",{"v-snackbar--active":n.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},l.value,e.class],style:e.style},k,{modelValue:n.value,"onUpdate:modelValue":b=>n.value=b,contentProps:ie({class:["v-snackbar__wrapper",o.value,r.value,u.value,d.value],style:[s.value,c.value],onPointerenter:v,onPointerleave:f},k.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},i),{default:()=>[vn(!1,"v-snackbar"),t.default&&m("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[t.default()]),t.actions&&m(Ne,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[m("div",{class:"v-snackbar__actions"},[t.actions()])]})],activator:t.activator})}),tt({},h)}});const tb=P({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...Dt(),...zl()},"VSwitch"),nb=j()({name:"VSwitch",inheritAttrs:!1,props:tb(),emits:{"update:focused":e=>!0,"update:modelValue":()=>!0,"update:indeterminate":e=>!0},setup(e,a){let{attrs:t,slots:n}=a;const s=xe(e,"indeterminate"),l=xe(e,"modelValue"),{loaderClasses:i}=Ol(e),{isFocused:o,focus:r,blur:c}=Ut(e),d=y(()=>typeof e.loading=="string"&&e.loading!==""?e.loading:e.color),u=ka(),h=y(()=>e.id||`switch-${u}`);function g(){s.value&&(s.value=!1)}return ae(()=>{const[f,v]=mn(t),[k,b]=da.filterProps(e),[p,w]=Rn.filterProps(e),C=se();function H(B){var I,x;B.stopPropagation(),B.preventDefault(),(x=(I=C.value)==null?void 0:I.input)==null||x.click()}return m(da,ie({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":s.value},i.value,e.class],style:e.style},f,k,{id:h.value,focused:o.value}),{...n,default:B=>{let{id:I,messagesId:x,isDisabled:L,isReadonly:T,isValid:E}=B;return m(Rn,ie({ref:C},p,{modelValue:l.value,"onUpdate:modelValue":[D=>l.value=D,g],id:I.value,"aria-describedby":x.value,type:"checkbox","aria-checked":s.value?"mixed":void 0,disabled:L.value,readonly:T.value,onFocus:r,onBlur:c},v),{...n,default:()=>m("div",{class:"v-switch__track",onClick:H},null),input:D=>{let{textColorClasses:q,textColorStyles:U}=D;return m("div",{class:["v-switch__thumb",q.value],style:U.value},[e.loading&&m(hr,{name:"v-switch",active:!0,color:E.value===!1?void 0:d.value},{default:_=>n.loader?n.loader(_):m(cr,{active:_.isActive,color:_.color,indeterminate:!0,size:"16",width:"2"},null)})])}})}})}),{}}});const sb=P({color:String,height:[Number,String],window:Boolean,...ce(),...ta(),...Qn(),...Qe(),...Le(),...De()},"VSystemBar"),lb=j()({name:"VSystemBar",props:sb(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{backgroundColorClasses:s,backgroundColorStyles:l}=ea(Z(e,"color")),{elevationClasses:i}=ua(e),{roundedClasses:o}=$e(e),{ssrBootStyles:r}=fn(),c=y(()=>e.height??(e.window?32:24)),{layoutItemStyles:d}=Un({id:e.name,order:y(()=>parseInt(e.order,10)),position:re("top"),layoutSize:c,elementSize:c,active:y(()=>!0),absolute:Z(e,"absolute")});return ae(()=>m(e.tag,{class:["v-system-bar",{"v-system-bar--window":e.window},n.value,s.value,i.value,o.value,e.class],style:[l.value,d.value,r.value,e.style]},t)),{}}});const Ym=Symbol.for("vuetify:v-tabs"),ib=P({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...ft(mr({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),Zm=j()({name:"VTab",props:ib(),setup(e,a){let{slots:t,attrs:n}=a;const{textColorClasses:s,textColorStyles:l}=pa(e,"sliderColor"),i=y(()=>e.direction==="horizontal"),o=re(!1),r=se(),c=se();function d(u){var g,f;let{value:h}=u;if(o.value=h,h){const v=(f=(g=r.value)==null?void 0:g.$el.parentElement)==null?void 0:f.querySelector(".v-tab--selected .v-tab__slider"),k=c.value;if(!v||!k)return;const b=getComputedStyle(v).color,p=v.getBoundingClientRect(),w=k.getBoundingClientRect(),C=i.value?"x":"y",H=i.value?"X":"Y",B=i.value?"right":"bottom",I=i.value?"width":"height",x=p[C],L=w[C],T=x>L?p[B]-w[B]:p[C]-w[C],E=Math.sign(T)>0?i.value?"right":"bottom":Math.sign(T)<0?i.value?"left":"top":"center",q=(Math.abs(T)+(Math.sign(T)<0?p[I]:w[I]))/Math.max(p[I],w[I]),U=p[I]/w[I],_=1.5;sn(k,{backgroundColor:[b,"currentcolor"],transform:[`translate${H}(${T}px) scale${H}(${U})`,`translate${H}(${T/_}px) scale${H}(${(q-1)/_+1})`,"none"],transformOrigin:Array(3).fill(E)},{duration:225,easing:Cs})}}return ae(()=>{const[u]=ca.filterProps(e);return m(ca,ie({symbol:Ym,ref:r,class:["v-tab",e.class],style:e.style,tabindex:o.value?0:-1,role:"tab","aria-selected":String(o.value),active:!1,block:e.fixed,maxWidth:e.fixed?300:void 0,rounded:0},u,n,{"onGroup:selected":d}),{default:()=>{var h;return[((h=t.default)==null?void 0:h.call(t))??e.text,!e.hideSlider&&m("div",{ref:c,class:["v-tab__slider",s.value],style:l.value},null)]}})}),{}}});function ob(e){return e?e.map(a=>typeof a=="string"?{title:a,value:a}:a):[]}const rb=P({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...$m({mandatory:"force"}),...na(),...Le()},"VTabs"),cb=j()({name:"VTabs",props:rb(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),s=y(()=>ob(e.items)),{densityClasses:l}=ba(e),{backgroundColorClasses:i,backgroundColorStyles:o}=ea(Z(e,"bgColor"));return Xe({VTab:{color:Z(e,"color"),direction:Z(e,"direction"),stacked:Z(e,"stacked"),fixed:Z(e,"fixedTabs"),sliderColor:Z(e,"sliderColor"),hideSlider:Z(e,"hideSlider")}}),ae(()=>{const[r]=uo.filterProps(e);return m(uo,ie(r,{modelValue:n.value,"onUpdate:modelValue":c=>n.value=c,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},l.value,i.value,e.class],style:[{"--v-tabs-height":ue(e.height)},o.value,e.style],role:"tablist",symbol:Ym}),{default:()=>[t.default?t.default():s.value.map(c=>m(Zm,ie(c,{key:c.title}),null))]})}),{}}});const db=P({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...ce(),...na(),...Le(),...De()},"VTable"),ho=j()({name:"VTable",props:db(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{densityClasses:s}=ba(e);return ae(()=>m(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!t.top,"v-table--has-bottom":!!t.bottom,"v-table--hover":e.hover},n.value,s.value,e.class],style:e.style},{default:()=>{var l,i,o;return[(l=t.top)==null?void 0:l.call(t),t.default?m("div",{class:"v-table__wrapper",style:{height:ue(e.height)}},[m("table",null,[t.default()])]):(i=t.wrapper)==null?void 0:i.call(t),(o=t.bottom)==null?void 0:o.call(t)]}})),{}}});const ub=P({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...Dt(),...Jl()},"VTextarea"),hb=j()({name:"VTextarea",directives:{Intersect:Nl},inheritAttrs:!1,props:ub(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:t,emit:n,slots:s}=a;const l=xe(e,"modelValue"),{isFocused:i,focus:o,blur:r}=Ut(e),c=y(()=>typeof e.counterValue=="function"?e.counterValue(l.value):(l.value||"").toString().length),d=y(()=>{if(t.maxlength)return t.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function u(E,D){var q,U;!e.autofocus||!E||(U=(q=D[0].target)==null?void 0:q.focus)==null||U.call(q)}const h=se(),g=se(),f=re(""),v=se(),k=y(()=>e.persistentPlaceholder||i.value||e.active);function b(){var E;v.value!==document.activeElement&&((E=v.value)==null||E.focus()),i.value||o()}function p(E){b(),n("click:control",E)}function w(E){n("mousedown:control",E)}function C(E){E.stopPropagation(),b(),ze(()=>{l.value="",Jo(e["onClick:clear"],E)})}function H(E){var q;const D=E.target;if(l.value=D.value,(q=e.modelModifiers)!=null&&q.trim){const U=[D.selectionStart,D.selectionEnd];ze(()=>{D.selectionStart=U[0],D.selectionEnd=U[1]})}}const B=se(),I=se(+e.rows),x=y(()=>["plain","underlined"].includes(e.variant));Da(()=>{e.autoGrow||(I.value=+e.rows)});function L(){e.autoGrow&&ze(()=>{if(!B.value||!g.value)return;const E=getComputedStyle(B.value),D=getComputedStyle(g.value.$el),q=parseFloat(E.getPropertyValue("--v-field-padding-top"))+parseFloat(E.getPropertyValue("--v-input-padding-top"))+parseFloat(E.getPropertyValue("--v-field-padding-bottom")),U=B.value.scrollHeight,_=parseFloat(E.lineHeight),J=Math.max(parseFloat(e.rows)*_+q,parseFloat(D.getPropertyValue("--v-input-control-height"))),K=parseFloat(e.maxRows)*_+q||1/0,z=va(U??0,J,K);I.value=Math.floor((z-q)/_),f.value=ue(z)})}ya(L),de(l,L),de(()=>e.rows,L),de(()=>e.maxRows,L),de(()=>e.density,L);let T;return de(B,E=>{E?(T=new ResizeObserver(L),T.observe(B.value)):T==null||T.disconnect()}),xa(()=>{T==null||T.disconnect()}),ae(()=>{const E=!!(s.counter||e.counter||e.counterValue),D=!!(E||s.details),[q,U]=mn(t),[{modelValue:_,...J}]=da.filterProps(e),[K]=kr(e);return m(da,ie({ref:h,modelValue:l.value,"onUpdate:modelValue":z=>l.value=z,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--plain-underlined":x.value},e.class],style:e.style},q,J,{centerAffix:I.value===1&&!x.value,focused:i.value}),{...s,default:z=>{let{isDisabled:ee,isDirty:Q,isReadonly:te,isValid:he}=z;return m(zs,ie({ref:g,style:{"--v-textarea-control-height":f.value},onClick:p,onMousedown:w,"onClick:clear":C,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},K,{active:k.value||Q.value,centerAffix:I.value===1&&!x.value,dirty:Q.value||e.dirty,disabled:ee.value,focused:i.value,error:he.value===!1}),{...s,default:we=>{let{props:{class:ke,...Ie}}=we;return m(ve,null,[e.prefix&&m("span",{class:"v-text-field__prefix"},[e.prefix]),Je(m("textarea",ie({ref:v,class:ke,value:l.value,onInput:H,autofocus:e.autofocus,readonly:te.value,disabled:ee.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:b,onBlur:r},Ie,U),null),[[Ga("intersect"),{handler:u},null,{once:!0}]]),e.autoGrow&&Je(m("textarea",{class:[ke,"v-textarea__sizer"],"onUpdate:modelValue":$=>l.value=$,ref:B,readonly:!0,"aria-hidden":"true"},null),[[Nv,l.value]]),e.suffix&&m("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:D?z=>{var ee;return m(ve,null,[(ee=s.details)==null?void 0:ee.call(s,z),E&&m(ve,null,[m("span",null,null),m(Kl,{active:e.persistentCounter||i.value,value:c.value,max:d.value},s.counter)])])}:void 0})}),tt({},h,g,v)}});const mb=P({withBackground:Boolean,...ce(),...De(),...Le()},"VThemeProvider"),gb=j()({name:"VThemeProvider",props:mb(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e);return()=>{var s;return e.withBackground?m(e.tag,{class:["v-theme-provider",n.value,e.class],style:e.style},{default:()=>{var l;return[(l=t.default)==null?void 0:l.call(t)]}}):(s=t.default)==null?void 0:s.call(t)}}});const fb=P({align:{type:String,default:"center",validator:e=>["center","start"].includes(e)},direction:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},justify:{type:String,default:"auto",validator:e=>["auto","center"].includes(e)},side:{type:String,validator:e=>e==null||["start","end"].includes(e)},lineInset:{type:[String,Number],default:0},lineThickness:{type:[String,Number],default:2},lineColor:String,truncateLine:{type:String,validator:e=>["start","end","both"].includes(e)},...ce(),...na(),...Le(),...De()},"VTimeline"),vb=j()({name:"VTimeline",props:fb(),setup(e,a){let{slots:t}=a;const{themeClasses:n}=qe(e),{densityClasses:s}=ba(e),{rtlClasses:l}=ra();Xe({VTimelineDivider:{lineColor:Z(e,"lineColor")},VTimelineItem:{density:Z(e,"density"),lineInset:Z(e,"lineInset")}});const i=y(()=>{const r=e.side?e.side:e.density!=="default"?"end":null;return r&&`v-timeline--side-${r}`}),o=y(()=>{const r=["v-timeline--truncate-line-start","v-timeline--truncate-line-end"];switch(e.truncateLine){case"both":return r;case"start":return r[0];case"end":return r[1];default:return null}});return ae(()=>m(e.tag,{class:["v-timeline",`v-timeline--${e.direction}`,`v-timeline--align-${e.align}`,`v-timeline--justify-${e.justify}`,o.value,{"v-timeline--inset-line":!!e.lineInset},n.value,s.value,i.value,l.value,e.class],style:[{"--v-timeline-line-thickness":ue(e.lineThickness)},e.style]},t)),{}}}),pb=P({dotColor:String,fillDot:Boolean,hideDot:Boolean,icon:be,iconColor:String,lineColor:String,...ce(),...Qe(),...Ht(),...ta()},"VTimelineDivider"),yb=j()({name:"VTimelineDivider",props:pb(),setup(e,a){let{slots:t}=a;const{sizeClasses:n,sizeStyles:s}=jn(e,"v-timeline-divider__dot"),{backgroundColorStyles:l,backgroundColorClasses:i}=ea(Z(e,"dotColor")),{roundedClasses:o}=$e(e,"v-timeline-divider__dot"),{elevationClasses:r}=ua(e),{backgroundColorClasses:c,backgroundColorStyles:d}=ea(Z(e,"lineColor"));return ae(()=>m("div",{class:["v-timeline-divider",{"v-timeline-divider--fill-dot":e.fillDot},e.class],style:e.style},[m("div",{class:["v-timeline-divider__before",c.value],style:d.value},null),!e.hideDot&&m("div",{key:"dot",class:["v-timeline-divider__dot",r.value,o.value,n.value],style:s.value},[m("div",{class:["v-timeline-divider__inner-dot",i.value,o.value],style:l.value},[t.default?m(Ne,{key:"icon-defaults",disabled:!e.icon,defaults:{VIcon:{color:e.iconColor,icon:e.icon,size:e.size}}},t.default):m(Re,{key:"icon",color:e.iconColor,icon:e.icon,size:e.size},null)])]),m("div",{class:["v-timeline-divider__after",c.value],style:d.value},null)])),{}}}),kb=P({density:String,dotColor:String,fillDot:Boolean,hideDot:Boolean,hideOpposite:{type:Boolean,default:void 0},icon:be,iconColor:String,lineInset:[Number,String],...ce(),...Wa(),...ta(),...Qe(),...Ht(),...Le()},"VTimelineItem"),bb=j()({name:"VTimelineItem",props:kb(),setup(e,a){let{slots:t}=a;const{dimensionStyles:n}=Va(e),s=re(0),l=se();return de(l,i=>{var o;i&&(s.value=((o=i.$el.querySelector(".v-timeline-divider__dot"))==null?void 0:o.getBoundingClientRect().width)??0)},{flush:"post"}),ae(()=>{var i,o;return m("div",{class:["v-timeline-item",{"v-timeline-item--fill-dot":e.fillDot},e.class],style:[{"--v-timeline-dot-size":ue(s.value),"--v-timeline-line-inset":e.lineInset?`calc(var(--v-timeline-dot-size) / 2 + ${ue(e.lineInset)})`:ue(0)},e.style]},[m("div",{class:"v-timeline-item__body",style:n.value},[(i=t.default)==null?void 0:i.call(t)]),m(yb,{ref:l,hideDot:e.hideDot,icon:e.icon,iconColor:e.iconColor,size:e.size,elevation:e.elevation,dotColor:e.dotColor,fillDot:e.fillDot,rounded:e.rounded},{default:t.icon}),e.density!=="compact"&&m("div",{class:"v-timeline-item__opposite"},[!e.hideOpposite&&((o=t.opposite)==null?void 0:o.call(t))])])}),{}}}),wb=P({...ce(),...Ua({variant:"text"})},"VToolbarItems"),Mb=j()({name:"VToolbarItems",props:wb(),setup(e,a){let{slots:t}=a;return Xe({VBtn:{color:Z(e,"color"),height:"inherit",variant:Z(e,"variant")}}),ae(()=>{var n;return m("div",{class:["v-toolbar-items",e.class],style:e.style},[(n=t.default)==null?void 0:n.call(t)])}),{}}});const xb=P({id:String,text:String,...ft(Os({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"VTooltip"),mo=j()({name:"VTooltip",props:xb(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=xe(e,"modelValue"),{scopeId:s}=es(),l=ka(),i=y(()=>e.id||`v-tooltip-${l}`),o=se(),r=y(()=>e.location.split(" ").length>1?e.location:e.location+" center"),c=y(()=>e.origin==="auto"||e.origin==="overlap"||e.origin.split(" ").length>1||e.location.split(" ").length>1?e.origin:e.origin+" center"),d=y(()=>e.transition?e.transition:n.value?"scale-transition":"fade-transition"),u=y(()=>ie({"aria-describedby":i.value},e.activatorProps));return ae(()=>{const[h]=At.filterProps(e);return m(At,ie({ref:o,class:["v-tooltip",e.class],style:e.style,id:i.value},h,{modelValue:n.value,"onUpdate:modelValue":g=>n.value=g,transition:d.value,absolute:!0,location:r.value,origin:c.value,persistent:!0,role:"tooltip",activatorProps:u.value,_disableGlobalStack:!0},s),{activator:t.activator,default:function(){var k;for(var g=arguments.length,f=new Array(g),v=0;v<g;v++)f[v]=arguments[v];return((k=t.default)==null?void 0:k.call(t,...f))??e.text}})}),tt({},o)}}),Sb=j()({name:"VValidation",props:Oh(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:t}=a;const n=zh(e,"validation");return()=>{var s;return(s=t.default)==null?void 0:s.call(t,n)}}}),Lb=Object.freeze(Object.defineProperty({__proto__:null,VAlert:d1,VAlertTitle:Gh,VApp:hh,VAppBar:Op,VAppBarNavIcon:i1,VAppBarTitle:o1,VAutocomplete:um,VAvatar:_t,VBadge:I2,VBanner:H2,VBannerActions:hm,VBannerText:mm,VBottomNavigation:G2,VBreadcrumbs:R2,VBreadcrumbsDivider:gm,VBreadcrumbsItem:fm,VBtn:ca,VBtnGroup:Ji,VBtnToggle:Up,VCard:O2,VCardActions:vm,VCardItem:km,VCardSubtitle:pm,VCardText:bm,VCardTitle:ym,VCarousel:$2,VCarouselItem:Y2,VCheckbox:ll,VCheckboxBtn:Pn,VChip:Ns,VChipGroup:b1,VClassIcon:tr,VCode:Z2,VCol:yt,VColorPicker:Oy,VCombobox:Wy,VComponentIcon:_i,VContainer:Fm,VCounter:Kl,VDefaultsProvider:Ne,VDialog:Qy,VDialogBottomTransition:Sp,VDialogTopTransition:Lp,VDialogTransition:Rl,VDivider:bl,VExpandTransition:Pl,VExpandXTransition:lr,VExpansionPanel:Yy,VExpansionPanelText:Hm,VExpansionPanelTitle:Gm,VExpansionPanels:Jy,VFabTransition:xp,VFadeTransition:Qi,VField:zs,VFieldLabel:cs,VFileInput:Xy,VFooter:ak,VForm:Em,VHover:fk,VIcon:Re,VImg:un,VInput:da,VItem:yk,VItemGroup:pk,VKbd:kk,VLabel:Xn,VLayout:wk,VLayoutItem:xk,VLazy:Lk,VLigatureIcon:T5,VList:Vl,VListGroup:Zi,VListImg:z1,VListItem:ht,VListItemAction:W1,VListItemMedia:Q1,VListItemSubtitle:vr,VListItemTitle:$h,VListSubheader:jh,VLocaleProvider:Ck,VMain:Km,VMenu:Ul,VMessages:Ph,VNavigationDrawer:Rk,VNoSsr:Pk,VOverlay:At,VPagination:zk,VParallax:Vk,VProgressCircular:cr,VProgressLinear:dr,VRadio:Uk,VRadioGroup:Jk,VRangeSlider:jk,VRating:Zk,VResponsive:Ui,VRow:ds,VScaleTransition:vh,VScrollXReverseTransition:Cp,VScrollXTransition:Ap,VScrollYReverseTransition:Tp,VScrollYTransition:Ip,VSelect:lt,VSelectionControl:Rn,VSelectionControlGroup:Fh,VSheet:co,VSlideGroup:uo,VSlideGroupItem:eb,VSlideXReverseTransition:Hp,VSlideXTransition:Bp,VSlideYReverseTransition:Dp,VSlideYTransition:sr,VSlider:ro,VSnackbar:jm,VSpacer:mk,VSvgIcon:ar,VSwitch:nb,VSystemBar:lb,VTab:Zm,VTable:ho,VTabs:cb,VTextField:ct,VTextarea:hb,VThemeProvider:gb,VTimeline:vb,VTimelineItem:bb,VToolbar:Ki,VToolbarItems:Mb,VToolbarTitle:nr,VTooltip:mo,VValidation:Sb,VVirtualScroll:jl,VWindow:to,VWindowItem:no},Symbol.toStringTag,{value:"Module"}));function Ab(e,a){const t=a.modifiers||{},n=a.value,{once:s,immediate:l,...i}=t,o=!Object.keys(i).length,{handler:r,options:c}=typeof n=="object"?n:{handler:n,options:{attributes:(i==null?void 0:i.attr)??o,characterData:(i==null?void 0:i.char)??o,childList:(i==null?void 0:i.child)??o,subtree:(i==null?void 0:i.sub)??o}},d=new MutationObserver(function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],h=arguments.length>1?arguments[1]:void 0;r==null||r(u,h),s&&Xm(e,a)});l&&(r==null||r([],d)),e._mutate=Object(e._mutate),e._mutate[a.instance.$.uid]={observer:d},d.observe(e,c)}function Xm(e,a){var t;(t=e._mutate)!=null&&t[a.instance.$.uid]&&(e._mutate[a.instance.$.uid].observer.disconnect(),delete e._mutate[a.instance.$.uid])}const Cb={mounted:Ab,unmounted:Xm};function Ib(e,a){var s,l;const t=a.value,n={passive:!((s=a.modifiers)!=null&&s.active)};window.addEventListener("resize",t,n),e._onResize=Object(e._onResize),e._onResize[a.instance.$.uid]={handler:t,options:n},(l=a.modifiers)!=null&&l.quiet||t()}function Tb(e,a){var s;if(!((s=e._onResize)!=null&&s[a.instance.$.uid]))return;const{handler:t,options:n}=e._onResize[a.instance.$.uid];window.removeEventListener("resize",t,n),delete e._onResize[a.instance.$.uid]}const Bb={mounted:Ib,unmounted:Tb};function eg(e,a){const{self:t=!1}=a.modifiers??{},n=a.value,s=typeof n=="object"&&n.options||{passive:!0},l=typeof n=="function"||"handleEvent"in n?n:n.handler,i=t?e:a.arg?document.querySelector(a.arg):window;i&&(i.addEventListener("scroll",l,s),e._onScroll=Object(e._onScroll),e._onScroll[a.instance.$.uid]={handler:l,options:s,target:t?void 0:i})}function ag(e,a){var l;if(!((l=e._onScroll)!=null&&l[a.instance.$.uid]))return;const{handler:t,options:n,target:s=e}=e._onScroll[a.instance.$.uid];s.removeEventListener("scroll",t,n),delete e._onScroll[a.instance.$.uid]}function Hb(e,a){a.value!==a.oldValue&&(ag(e,a),eg(e,a))}const Db={mounted:eg,unmounted:ag,updated:Hb},Gb=Object.freeze(Object.defineProperty({__proto__:null,ClickOutside:rm,Intersect:kh,Mutate:Cb,Resize:Bb,Ripple:Qt,Scroll:Db,Touch:Mr},Symbol.toStringTag,{value:"Module"})),Eb=uh({components:Lb,directives:Gb,theme:{defaultTheme:"dark"}}),Yl=(e,a)=>{const t=e.__vccOpts||e;for(const[n,s]of a)t[n]=s;return t},Fb={};function qb(e,a){const t=Si("router-view");return Ge(),ma(hh,null,{default:Fe(()=>[m(Km,null,{default:Fe(()=>[m(t)]),_:1})]),_:1})}const Rb=Yl(Fb,[["render",qb]]);/*!
  * vue-router v4.2.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const An=typeof window<"u";function Pb(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const Pe=Object.assign;function fi(e,a){const t={};for(const n in a){const s=a[n];t[n]=et(s)?s.map(e):e(s)}return t}const vs=()=>{},et=Array.isArray,Nb=/\/$/,Ob=e=>e.replace(Nb,"");function vi(e,a,t="/"){let n,s={},l="",i="";const o=a.indexOf("#");let r=a.indexOf("?");return o<r&&o>=0&&(r=-1),r>-1&&(n=a.slice(0,r),l=a.slice(r+1,o>-1?o:a.length),s=e(l)),o>-1&&(n=n||a.slice(0,o),i=a.slice(o,a.length)),n=Vb(n??a,t),{fullPath:n+(l&&"?")+l+i,path:n,query:s,hash:i}}function zb(e,a){const t=a.query?e(a.query):"";return a.path+(t&&"?")+t+(a.hash||"")}function md(e,a){return!a||!e.toLowerCase().startsWith(a.toLowerCase())?e:e.slice(a.length)||"/"}function _b(e,a,t){const n=a.matched.length-1,s=t.matched.length-1;return n>-1&&n===s&&Nn(a.matched[n],t.matched[s])&&tg(a.params,t.params)&&e(a.query)===e(t.query)&&a.hash===t.hash}function Nn(e,a){return(e.aliasOf||e)===(a.aliasOf||a)}function tg(e,a){if(Object.keys(e).length!==Object.keys(a).length)return!1;for(const t in e)if(!Wb(e[t],a[t]))return!1;return!0}function Wb(e,a){return et(e)?gd(e,a):et(a)?gd(a,e):e===a}function gd(e,a){return et(a)?e.length===a.length&&e.every((t,n)=>t===a[n]):e.length===1&&e[0]===a}function Vb(e,a){if(e.startsWith("/"))return e;if(!e)return a;const t=a.split("/"),n=e.split("/"),s=n[n.length-1];(s===".."||s===".")&&n.push("");let l=t.length-1,i,o;for(i=0;i<n.length;i++)if(o=n[i],o!==".")if(o==="..")l>1&&l--;else break;return t.slice(0,l).join("/")+"/"+n.slice(i-(i===n.length?1:0)).join("/")}var Es;(function(e){e.pop="pop",e.push="push"})(Es||(Es={}));var ps;(function(e){e.back="back",e.forward="forward",e.unknown=""})(ps||(ps={}));function Qb(e){if(!e)if(An){const a=document.querySelector("base");e=a&&a.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Ob(e)}const Ub=/^[^#]+#/;function Kb(e,a){return e.replace(Ub,"#")+a}function Jb(e,a){const t=document.documentElement.getBoundingClientRect(),n=e.getBoundingClientRect();return{behavior:a.behavior,left:n.left-t.left-(a.left||0),top:n.top-t.top-(a.top||0)}}const Zl=()=>({left:window.pageXOffset,top:window.pageYOffset});function $b(e){let a;if("el"in e){const t=e.el,n=typeof t=="string"&&t.startsWith("#"),s=typeof t=="string"?n?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!s)return;a=Jb(s,e)}else a=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(a):window.scrollTo(a.left!=null?a.left:window.pageXOffset,a.top!=null?a.top:window.pageYOffset)}function fd(e,a){return(history.state?history.state.position-a:-1)+e}const go=new Map;function jb(e,a){go.set(e,a)}function Yb(e){const a=go.get(e);return go.delete(e),a}let Zb=()=>location.protocol+"//"+location.host;function ng(e,a){const{pathname:t,search:n,hash:s}=a,l=e.indexOf("#");if(l>-1){let o=s.includes(e.slice(l))?e.slice(l).length:1,r=s.slice(o);return r[0]!=="/"&&(r="/"+r),md(r,"")}return md(t,e)+n+s}function Xb(e,a,t,n){let s=[],l=[],i=null;const o=({state:h})=>{const g=ng(e,location),f=t.value,v=a.value;let k=0;if(h){if(t.value=g,a.value=h,i&&i===f){i=null;return}k=v?h.position-v.position:0}else n(g);s.forEach(b=>{b(t.value,f,{delta:k,type:Es.pop,direction:k?k>0?ps.forward:ps.back:ps.unknown})})};function r(){i=t.value}function c(h){s.push(h);const g=()=>{const f=s.indexOf(h);f>-1&&s.splice(f,1)};return l.push(g),g}function d(){const{history:h}=window;h.state&&h.replaceState(Pe({},h.state,{scroll:Zl()}),"")}function u(){for(const h of l)h();l=[],window.removeEventListener("popstate",o),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",o),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:r,listen:c,destroy:u}}function vd(e,a,t,n=!1,s=!1){return{back:e,current:a,forward:t,replaced:n,position:window.history.length,scroll:s?Zl():null}}function ew(e){const{history:a,location:t}=window,n={value:ng(e,t)},s={value:a.state};s.value||l(n.value,{back:null,current:n.value,forward:null,position:a.length-1,replaced:!0,scroll:null},!0);function l(r,c,d){const u=e.indexOf("#"),h=u>-1?(t.host&&document.querySelector("base")?e:e.slice(u))+r:Zb()+e+r;try{a[d?"replaceState":"pushState"](c,"",h),s.value=c}catch(g){console.error(g),t[d?"replace":"assign"](h)}}function i(r,c){const d=Pe({},a.state,vd(s.value.back,r,s.value.forward,!0),c,{position:s.value.position});l(r,d,!0),n.value=r}function o(r,c){const d=Pe({},s.value,a.state,{forward:r,scroll:Zl()});l(d.current,d,!0);const u=Pe({},vd(n.value,r,null),{position:d.position+1},c);l(r,u,!1),n.value=r}return{location:n,state:s,push:o,replace:i}}function aw(e){e=Qb(e);const a=ew(e),t=Xb(e,a.state,a.location,a.replace);function n(l,i=!0){i||t.pauseListeners(),history.go(l)}const s=Pe({location:"",base:e,go:n,createHref:Kb.bind(null,e)},a,t);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>a.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>a.state.value}),s}function tw(e){return typeof e=="string"||e&&typeof e=="object"}function sg(e){return typeof e=="string"||typeof e=="symbol"}const Ft={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},lg=Symbol("");var pd;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(pd||(pd={}));function On(e,a){return Pe(new Error,{type:e,[lg]:!0},a)}function vt(e,a){return e instanceof Error&&lg in e&&(a==null||!!(e.type&a))}const yd="[^/]+?",nw={sensitive:!1,strict:!1,start:!0,end:!0},sw=/[.+*?^${}()[\]/\\]/g;function lw(e,a){const t=Pe({},nw,a),n=[];let s=t.start?"^":"";const l=[];for(const c of e){const d=c.length?[]:[90];t.strict&&!c.length&&(s+="/");for(let u=0;u<c.length;u++){const h=c[u];let g=40+(t.sensitive?.25:0);if(h.type===0)u||(s+="/"),s+=h.value.replace(sw,"\\$&"),g+=40;else if(h.type===1){const{value:f,repeatable:v,optional:k,regexp:b}=h;l.push({name:f,repeatable:v,optional:k});const p=b||yd;if(p!==yd){g+=10;try{new RegExp(`(${p})`)}catch(C){throw new Error(`Invalid custom RegExp for param "${f}" (${p}): `+C.message)}}let w=v?`((?:${p})(?:/(?:${p}))*)`:`(${p})`;u||(w=k&&c.length<2?`(?:/${w})`:"/"+w),k&&(w+="?"),s+=w,g+=20,k&&(g+=-8),v&&(g+=-20),p===".*"&&(g+=-50)}d.push(g)}n.push(d)}if(t.strict&&t.end){const c=n.length-1;n[c][n[c].length-1]+=.7000000000000001}t.strict||(s+="/?"),t.end?s+="$":t.strict&&(s+="(?:/|$)");const i=new RegExp(s,t.sensitive?"":"i");function o(c){const d=c.match(i),u={};if(!d)return null;for(let h=1;h<d.length;h++){const g=d[h]||"",f=l[h-1];u[f.name]=g&&f.repeatable?g.split("/"):g}return u}function r(c){let d="",u=!1;for(const h of e){(!u||!d.endsWith("/"))&&(d+="/"),u=!1;for(const g of h)if(g.type===0)d+=g.value;else if(g.type===1){const{value:f,repeatable:v,optional:k}=g,b=f in c?c[f]:"";if(et(b)&&!v)throw new Error(`Provided param "${f}" is an array but it is not repeatable (* or + modifiers)`);const p=et(b)?b.join("/"):b;if(!p)if(k)h.length<2&&(d.endsWith("/")?d=d.slice(0,-1):u=!0);else throw new Error(`Missing required param "${f}"`);d+=p}}return d||"/"}return{re:i,score:n,keys:l,parse:o,stringify:r}}function iw(e,a){let t=0;for(;t<e.length&&t<a.length;){const n=a[t]-e[t];if(n)return n;t++}return e.length<a.length?e.length===1&&e[0]===40+40?-1:1:e.length>a.length?a.length===1&&a[0]===40+40?1:-1:0}function ow(e,a){let t=0;const n=e.score,s=a.score;for(;t<n.length&&t<s.length;){const l=iw(n[t],s[t]);if(l)return l;t++}if(Math.abs(s.length-n.length)===1){if(kd(n))return 1;if(kd(s))return-1}return s.length-n.length}function kd(e){const a=e[e.length-1];return e.length>0&&a[a.length-1]<0}const rw={type:0,value:""},cw=/[a-zA-Z0-9_]/;function dw(e){if(!e)return[[]];if(e==="/")return[[rw]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function a(g){throw new Error(`ERR (${t})/"${c}": ${g}`)}let t=0,n=t;const s=[];let l;function i(){l&&s.push(l),l=[]}let o=0,r,c="",d="";function u(){c&&(t===0?l.push({type:0,value:c}):t===1||t===2||t===3?(l.length>1&&(r==="*"||r==="+")&&a(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),l.push({type:1,value:c,regexp:d,repeatable:r==="*"||r==="+",optional:r==="*"||r==="?"})):a("Invalid state to consume buffer"),c="")}function h(){c+=r}for(;o<e.length;){if(r=e[o++],r==="\\"&&t!==2){n=t,t=4;continue}switch(t){case 0:r==="/"?(c&&u(),i()):r===":"?(u(),t=1):h();break;case 4:h(),t=n;break;case 1:r==="("?t=2:cw.test(r)?h():(u(),t=0,r!=="*"&&r!=="?"&&r!=="+"&&o--);break;case 2:r===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+r:t=3:d+=r;break;case 3:u(),t=0,r!=="*"&&r!=="?"&&r!=="+"&&o--,d="";break;default:a("Unknown state");break}}return t===2&&a(`Unfinished custom RegExp for param "${c}"`),u(),i(),s}function uw(e,a,t){const n=lw(dw(e.path),t),s=Pe(n,{record:e,parent:a,children:[],alias:[]});return a&&!s.record.aliasOf==!a.record.aliasOf&&a.children.push(s),s}function hw(e,a){const t=[],n=new Map;a=Md({strict:!1,end:!0,sensitive:!1},a);function s(d){return n.get(d)}function l(d,u,h){const g=!h,f=mw(d);f.aliasOf=h&&h.record;const v=Md(a,d),k=[f];if("alias"in d){const w=typeof d.alias=="string"?[d.alias]:d.alias;for(const C of w)k.push(Pe({},f,{components:h?h.record.components:f.components,path:C,aliasOf:h?h.record:f}))}let b,p;for(const w of k){const{path:C}=w;if(u&&C[0]!=="/"){const H=u.record.path,B=H[H.length-1]==="/"?"":"/";w.path=u.record.path+(C&&B+C)}if(b=uw(w,u,v),h?h.alias.push(b):(p=p||b,p!==b&&p.alias.push(b),g&&d.name&&!wd(b)&&i(d.name)),f.children){const H=f.children;for(let B=0;B<H.length;B++)l(H[B],b,h&&h.children[B])}h=h||b,(b.record.components&&Object.keys(b.record.components).length||b.record.name||b.record.redirect)&&r(b)}return p?()=>{i(p)}:vs}function i(d){if(sg(d)){const u=n.get(d);u&&(n.delete(d),t.splice(t.indexOf(u),1),u.children.forEach(i),u.alias.forEach(i))}else{const u=t.indexOf(d);u>-1&&(t.splice(u,1),d.record.name&&n.delete(d.record.name),d.children.forEach(i),d.alias.forEach(i))}}function o(){return t}function r(d){let u=0;for(;u<t.length&&ow(d,t[u])>=0&&(d.record.path!==t[u].record.path||!ig(d,t[u]));)u++;t.splice(u,0,d),d.record.name&&!wd(d)&&n.set(d.record.name,d)}function c(d,u){let h,g={},f,v;if("name"in d&&d.name){if(h=n.get(d.name),!h)throw On(1,{location:d});v=h.record.name,g=Pe(bd(u.params,h.keys.filter(p=>!p.optional).map(p=>p.name)),d.params&&bd(d.params,h.keys.map(p=>p.name))),f=h.stringify(g)}else if("path"in d)f=d.path,h=t.find(p=>p.re.test(f)),h&&(g=h.parse(f),v=h.record.name);else{if(h=u.name?n.get(u.name):t.find(p=>p.re.test(u.path)),!h)throw On(1,{location:d,currentLocation:u});v=h.record.name,g=Pe({},u.params,d.params),f=h.stringify(g)}const k=[];let b=h;for(;b;)k.unshift(b.record),b=b.parent;return{name:v,path:f,params:g,matched:k,meta:fw(k)}}return e.forEach(d=>l(d)),{addRoute:l,resolve:c,removeRoute:i,getRoutes:o,getRecordMatcher:s}}function bd(e,a){const t={};for(const n of a)n in e&&(t[n]=e[n]);return t}function mw(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:gw(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function gw(e){const a={},t=e.props||!1;if("component"in e)a.default=t;else for(const n in e.components)a[n]=typeof t=="object"?t[n]:t;return a}function wd(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function fw(e){return e.reduce((a,t)=>Pe(a,t.meta),{})}function Md(e,a){const t={};for(const n in e)t[n]=n in a?a[n]:e[n];return t}function ig(e,a){return a.children.some(t=>t===e||ig(e,t))}const og=/#/g,vw=/&/g,pw=/\//g,yw=/=/g,kw=/\?/g,rg=/\+/g,bw=/%5B/g,ww=/%5D/g,cg=/%5E/g,Mw=/%60/g,dg=/%7B/g,xw=/%7C/g,ug=/%7D/g,Sw=/%20/g;function Ar(e){return encodeURI(""+e).replace(xw,"|").replace(bw,"[").replace(ww,"]")}function Lw(e){return Ar(e).replace(dg,"{").replace(ug,"}").replace(cg,"^")}function fo(e){return Ar(e).replace(rg,"%2B").replace(Sw,"+").replace(og,"%23").replace(vw,"%26").replace(Mw,"`").replace(dg,"{").replace(ug,"}").replace(cg,"^")}function Aw(e){return fo(e).replace(yw,"%3D")}function Cw(e){return Ar(e).replace(og,"%23").replace(kw,"%3F")}function Iw(e){return e==null?"":Cw(e).replace(pw,"%2F")}function Ml(e){try{return decodeURIComponent(""+e)}catch{}return""+e}function Tw(e){const a={};if(e===""||e==="?")return a;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let s=0;s<n.length;++s){const l=n[s].replace(rg," "),i=l.indexOf("="),o=Ml(i<0?l:l.slice(0,i)),r=i<0?null:Ml(l.slice(i+1));if(o in a){let c=a[o];et(c)||(c=a[o]=[c]),c.push(r)}else a[o]=r}return a}function xd(e){let a="";for(let t in e){const n=e[t];if(t=Aw(t),n==null){n!==void 0&&(a+=(a.length?"&":"")+t);continue}(et(n)?n.map(l=>l&&fo(l)):[n&&fo(n)]).forEach(l=>{l!==void 0&&(a+=(a.length?"&":"")+t,l!=null&&(a+="="+l))})}return a}function Bw(e){const a={};for(const t in e){const n=e[t];n!==void 0&&(a[t]=et(n)?n.map(s=>s==null?null:""+s):n==null?n:""+n)}return a}const Hw=Symbol(""),Sd=Symbol(""),Cr=Symbol(""),hg=Symbol(""),vo=Symbol("");function is(){let e=[];function a(n){return e.push(n),()=>{const s=e.indexOf(n);s>-1&&e.splice(s,1)}}function t(){e=[]}return{add:a,list:()=>e.slice(),reset:t}}function Pt(e,a,t,n,s){const l=n&&(n.enterCallbacks[s]=n.enterCallbacks[s]||[]);return()=>new Promise((i,o)=>{const r=u=>{u===!1?o(On(4,{from:t,to:a})):u instanceof Error?o(u):tw(u)?o(On(2,{from:a,to:u})):(l&&n.enterCallbacks[s]===l&&typeof u=="function"&&l.push(u),i())},c=e.call(n&&n.instances[s],a,t,r);let d=Promise.resolve(c);e.length<3&&(d=d.then(r)),d.catch(u=>o(u))})}function pi(e,a,t,n){const s=[];for(const l of e)for(const i in l.components){let o=l.components[i];if(!(a!=="beforeRouteEnter"&&!l.instances[i]))if(Dw(o)){const c=(o.__vccOpts||o)[a];c&&s.push(Pt(c,t,n,l,i))}else{let r=o();s.push(()=>r.then(c=>{if(!c)return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${l.path}"`));const d=Pb(c)?c.default:c;l.components[i]=d;const h=(d.__vccOpts||d)[a];return h&&Pt(h,t,n,l,i)()}))}}return s}function Dw(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function Ld(e){const a=He(Cr),t=He(hg),n=y(()=>a.resolve(ia(e.to))),s=y(()=>{const{matched:r}=n.value,{length:c}=r,d=r[c-1],u=t.matched;if(!d||!u.length)return-1;const h=u.findIndex(Nn.bind(null,d));if(h>-1)return h;const g=Ad(r[c-2]);return c>1&&Ad(d)===g&&u[u.length-1].path!==g?u.findIndex(Nn.bind(null,r[c-2])):h}),l=y(()=>s.value>-1&&qw(t.params,n.value.params)),i=y(()=>s.value>-1&&s.value===t.matched.length-1&&tg(t.params,n.value.params));function o(r={}){return Fw(r)?a[ia(e.replace)?"replace":"push"](ia(e.to)).catch(vs):Promise.resolve()}return{route:n,href:y(()=>n.value.href),isActive:l,isExactActive:i,navigate:o}}const Gw=qo({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ld,setup(e,{slots:a}){const t=Ma(Ld(e)),{options:n}=He(Cr),s=y(()=>({[Cd(e.activeClass,n.linkActiveClass,"router-link-active")]:t.isActive,[Cd(e.exactActiveClass,n.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const l=a.default&&a.default(t);return e.custom?l:mt("a",{"aria-current":t.isExactActive?e.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:s.value},l)}}}),Ew=Gw;function Fw(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const a=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(a))return}return e.preventDefault&&e.preventDefault(),!0}}function qw(e,a){for(const t in a){const n=a[t],s=e[t];if(typeof n=="string"){if(n!==s)return!1}else if(!et(s)||s.length!==n.length||n.some((l,i)=>l!==s[i]))return!1}return!0}function Ad(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Cd=(e,a,t)=>e??a??t,Rw=qo({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:a,slots:t}){const n=He(vo),s=y(()=>e.route||n.value),l=He(Sd,0),i=y(()=>{let c=ia(l);const{matched:d}=s.value;let u;for(;(u=d[c])&&!u.components;)c++;return c}),o=y(()=>s.value.matched[i.value]);je(Sd,y(()=>i.value+1)),je(Hw,o),je(vo,s);const r=se();return de(()=>[r.value,o.value,e.name],([c,d,u],[h,g,f])=>{d&&(d.instances[u]=c,g&&g!==d&&c&&c===h&&(d.leaveGuards.size||(d.leaveGuards=g.leaveGuards),d.updateGuards.size||(d.updateGuards=g.updateGuards))),c&&d&&(!g||!Nn(d,g)||!h)&&(d.enterCallbacks[u]||[]).forEach(v=>v(c))},{flush:"post"}),()=>{const c=s.value,d=e.name,u=o.value,h=u&&u.components[d];if(!h)return Id(t.default,{Component:h,route:c});const g=u.props[d],f=g?g===!0?c.params:typeof g=="function"?g(c):g:null,k=mt(h,Pe({},f,a,{onVnodeUnmounted:b=>{b.component.isUnmounted&&(u.instances[d]=null)},ref:r}));return Id(t.default,{Component:k,route:c})||k}}});function Id(e,a){if(!e)return null;const t=e(a);return t.length===1?t[0]:t}const Pw=Rw;function Nw(e){const a=hw(e.routes,e),t=e.parseQuery||Tw,n=e.stringifyQuery||xd,s=e.history,l=is(),i=is(),o=is(),r=re(Ft);let c=Ft;An&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=fi.bind(null,R=>""+R),u=fi.bind(null,Iw),h=fi.bind(null,Ml);function g(R,O){let F,Y;return sg(R)?(F=a.getRecordMatcher(R),Y=O):Y=R,a.addRoute(Y,F)}function f(R){const O=a.getRecordMatcher(R);O&&a.removeRoute(O)}function v(){return a.getRoutes().map(R=>R.record)}function k(R){return!!a.getRecordMatcher(R)}function b(R,O){if(O=Pe({},O||r.value),typeof R=="string"){const G=vi(t,R,O.path),N=a.resolve({path:G.path},O),W=s.createHref(G.fullPath);return Pe(G,N,{params:h(N.params),hash:Ml(G.hash),redirectedFrom:void 0,href:W})}let F;if("path"in R)F=Pe({},R,{path:vi(t,R.path,O.path).path});else{const G=Pe({},R.params);for(const N in G)G[N]==null&&delete G[N];F=Pe({},R,{params:u(G)}),O.params=u(O.params)}const Y=a.resolve(F,O),ge=R.hash||"";Y.params=d(h(Y.params));const M=zb(n,Pe({},R,{hash:Lw(ge),path:Y.path})),S=s.createHref(M);return Pe({fullPath:M,hash:ge,query:n===xd?Bw(R.query):R.query||{}},Y,{redirectedFrom:void 0,href:S})}function p(R){return typeof R=="string"?vi(t,R,r.value.path):Pe({},R)}function w(R,O){if(c!==R)return On(8,{from:O,to:R})}function C(R){return I(R)}function H(R){return C(Pe(p(R),{replace:!0}))}function B(R){const O=R.matched[R.matched.length-1];if(O&&O.redirect){const{redirect:F}=O;let Y=typeof F=="function"?F(R):F;return typeof Y=="string"&&(Y=Y.includes("?")||Y.includes("#")?Y=p(Y):{path:Y},Y.params={}),Pe({query:R.query,hash:R.hash,params:"path"in Y?{}:R.params},Y)}}function I(R,O){const F=c=b(R),Y=r.value,ge=R.state,M=R.force,S=R.replace===!0,G=B(F);if(G)return I(Pe(p(G),{state:typeof G=="object"?Pe({},ge,G.state):ge,force:M,replace:S}),O||F);const N=F;N.redirectedFrom=O;let W;return!M&&_b(n,Y,F)&&(W=On(16,{to:N,from:Y}),te(Y,Y,!0,!1)),(W?Promise.resolve(W):T(N,Y)).catch(V=>vt(V)?vt(V,2)?V:Q(V):z(V,N,Y)).then(V=>{if(V){if(vt(V,2))return I(Pe({replace:S},p(V.to),{state:typeof V.to=="object"?Pe({},ge,V.to.state):ge,force:M}),O||N)}else V=D(N,Y,!0,S,ge);return E(N,Y,V),V})}function x(R,O){const F=w(R,O);return F?Promise.reject(F):Promise.resolve()}function L(R){const O=ke.values().next().value;return O&&typeof O.runWithContext=="function"?O.runWithContext(R):R()}function T(R,O){let F;const[Y,ge,M]=Ow(R,O);F=pi(Y.reverse(),"beforeRouteLeave",R,O);for(const G of Y)G.leaveGuards.forEach(N=>{F.push(Pt(N,R,O))});const S=x.bind(null,R,O);return F.push(S),$(F).then(()=>{F=[];for(const G of l.list())F.push(Pt(G,R,O));return F.push(S),$(F)}).then(()=>{F=pi(ge,"beforeRouteUpdate",R,O);for(const G of ge)G.updateGuards.forEach(N=>{F.push(Pt(N,R,O))});return F.push(S),$(F)}).then(()=>{F=[];for(const G of M)if(G.beforeEnter)if(et(G.beforeEnter))for(const N of G.beforeEnter)F.push(Pt(N,R,O));else F.push(Pt(G.beforeEnter,R,O));return F.push(S),$(F)}).then(()=>(R.matched.forEach(G=>G.enterCallbacks={}),F=pi(M,"beforeRouteEnter",R,O),F.push(S),$(F))).then(()=>{F=[];for(const G of i.list())F.push(Pt(G,R,O));return F.push(S),$(F)}).catch(G=>vt(G,8)?G:Promise.reject(G))}function E(R,O,F){o.list().forEach(Y=>L(()=>Y(R,O,F)))}function D(R,O,F,Y,ge){const M=w(R,O);if(M)return M;const S=O===Ft,G=An?history.state:{};F&&(Y||S?s.replace(R.fullPath,Pe({scroll:S&&G&&G.scroll},ge)):s.push(R.fullPath,ge)),r.value=R,te(R,O,F,S),Q()}let q;function U(){q||(q=s.listen((R,O,F)=>{if(!Ie.listening)return;const Y=b(R),ge=B(Y);if(ge){I(Pe(ge,{replace:!0}),Y).catch(vs);return}c=Y;const M=r.value;An&&jb(fd(M.fullPath,F.delta),Zl()),T(Y,M).catch(S=>vt(S,12)?S:vt(S,2)?(I(S.to,Y).then(G=>{vt(G,20)&&!F.delta&&F.type===Es.pop&&s.go(-1,!1)}).catch(vs),Promise.reject()):(F.delta&&s.go(-F.delta,!1),z(S,Y,M))).then(S=>{S=S||D(Y,M,!1),S&&(F.delta&&!vt(S,8)?s.go(-F.delta,!1):F.type===Es.pop&&vt(S,20)&&s.go(-1,!1)),E(Y,M,S)}).catch(vs)}))}let _=is(),J=is(),K;function z(R,O,F){Q(R);const Y=J.list();return Y.length?Y.forEach(ge=>ge(R,O,F)):console.error(R),Promise.reject(R)}function ee(){return K&&r.value!==Ft?Promise.resolve():new Promise((R,O)=>{_.add([R,O])})}function Q(R){return K||(K=!R,U(),_.list().forEach(([O,F])=>R?F(R):O()),_.reset()),R}function te(R,O,F,Y){const{scrollBehavior:ge}=e;if(!An||!ge)return Promise.resolve();const M=!F&&Yb(fd(R.fullPath,0))||(Y||!F)&&history.state&&history.state.scroll||null;return ze().then(()=>ge(R,O,M)).then(S=>S&&$b(S)).catch(S=>z(S,R,O))}const he=R=>s.go(R);let we;const ke=new Set,Ie={currentRoute:r,listening:!0,addRoute:g,removeRoute:f,hasRoute:k,getRoutes:v,resolve:b,options:e,push:C,replace:H,go:he,back:()=>he(-1),forward:()=>he(1),beforeEach:l.add,beforeResolve:i.add,afterEach:o.add,onError:J.add,isReady:ee,install(R){const O=this;R.component("RouterLink",Ew),R.component("RouterView",Pw),R.config.globalProperties.$router=O,Object.defineProperty(R.config.globalProperties,"$route",{enumerable:!0,get:()=>ia(r)}),An&&!we&&r.value===Ft&&(we=!0,C(s.location).catch(ge=>{}));const F={};for(const ge in Ft)Object.defineProperty(F,ge,{get:()=>r.value[ge],enumerable:!0});R.provide(Cr,O),R.provide(hg,Kd(F)),R.provide(vo,r);const Y=R.unmount;ke.add(R),R.unmount=function(){ke.delete(R),ke.size<1&&(c=Ft,q&&q(),q=null,r.value=Ft,we=!1,K=!1),Y()}}};function $(R){return R.reduce((O,F)=>O.then(()=>L(F)),Promise.resolve())}return Ie}function Ow(e,a){const t=[],n=[],s=[],l=Math.max(a.matched.length,e.matched.length);for(let i=0;i<l;i++){const o=a.matched[i];o&&(e.matched.find(c=>Nn(c,o))?n.push(o):t.push(o));const r=e.matched[i];r&&(a.matched.find(c=>Nn(c,r))||s.push(r))}return[t,n,s]}const zw=`45
Greetings, stranger. I'm not surprised 
to see your kind here. Many 
adventurers have traveled this way 
since the recent troubles began.
 
No doubt you've heard about the 
tragedy that befell the town of 
Tristram. Some say that Diablo, the 
Lord of Terror, walks the world again.
 
I don't know if I believe that, but a Dark 
Wanderer did travel this route a few 
weeks ago. He was headed east to the 
mountain pass guarded by the Rogue 
Monastery.
 
Maybe it's nothing, but evil seems to 
have trailed in his wake. You see, 
shortly after the Wanderer went 
through, the Monastery's Gates to the 
pass were closed and strange 
creatures began ravaging the 
countryside.
 
Until it's safer outside the camp and the 
gates are re-opened, I'll remain here 
with my caravan. I hope to leave for 
Lut Gholein before the shadow that fell 
over Tristram consumes us all.  If 
you're still alive then, I'll take you 
along.
 
You should talk to Akara, too. She 
seems to be the leader of this camp. 
Maybe she can tell you more.
`,_w=`45
Well met, noble Paladin. It's been a 
while since I've seen any of your kind in 
the west. It would be an honor to aid 
you in any way that I can.
 
No doubt you've heard about the 
tragedy that befell the town of 
Tristram. Some say that Diablo, the 
Lord of Terror, walks the world again.
 
I don't know if I believe that, but a Dark 
Wanderer did travel this route a few 
weeks ago. He was headed east to the 
mountain pass guarded by the Rogue 
Monastery.
 
Maybe it's nothing, but evil seems to 
have trailed in his wake. You see, 
shortly after the Wanderer went 
through, the Monastery's Gates to the 
pass were closed and strange 
creatures began ravaging the 
countryside.
 
Until it's safer outside the camp and the 
gates are re-opened, I'll remain here 
with my caravan. I hope to leave for 
Lut Gholein before the shadow that fell 
over Tristram consumes us all.  If 
you're still alive then, I'll take you 
along.
 
You should talk to Akara, too. She 
seems to be the leader of this camp. 
Maybe she can tell you more.
`,Ww=`51
I've been leading my trade caravan 
across the eastern deserts for more 
than twenty years now. I've been 
attacked by bandits and outlaws more 
times than I can remember. But never 
when a Paladin accompanied me. 
 
Indeed, your Order has saved me from 
losing a small fortune over the years. I 
just hope you can discover what's 
going on around here and get the 
Gates to the East opened up!
`,Vw=`85
Cain seems to have great wisdom 
regarding the supernatural. I hope I 
never live to be that wise...
`,Qw=`58
Akara is the Rogues' High Priestess. She 
sells the few magic items in her 
possession and can even heal your 
wounds. She is very wise and will help 
you if she can.
`,Uw=`66
The fiery Kashya commands the Rogue 
archers in battle. I've only spoken to 
her a few times, though. I get the 
feeling that she doesn't like outsiders 
very much.
`,Kw=`88
Charsi seems to be a very sweet girl. 
She's the smith around here and can 
help you by trading weapons and 
armor.
`,Jw=`55
Gheed is a wandering merchant of 
questionable character who is traveling 
along with my caravan to the East. He 
will buy and sell most anything.
 
He's greedy, but his wares are beyond 
reproach. I would suggest keeping both 
eyes open when you deal with him.
`,$w=`71
To the east are lands of great 
mystery... and the Jewel City of the 
Desert, Lut Gholein.
`,jw=`68
I'll gladly take you eastward, if you can 
drive the Evil from the Monastery.  
Then, the Rogues may re-open the pass 
through the mountains.
`,Yw=`70
It's easy to become lost in the 
wilderness on the way to the Citadel. 
After you have come to the Cairn 
Stones, you must remember that the 
path continues through the caves.
`,Zw=`35
I am Akara, High Priestess of the 
Sisterhood of the Sightless Eye. I 
welcome you, traveler, to our camp, 
but I'm afraid I can offer you but poor 
shelter within these rickety walls.
 
You see, our ancient Sisterhood has 
fallen under a strange curse. The 
mighty Citadel from which we have 
guarded the gates to the East for 
generations, has been corrupted by the 
evil Demoness, Andariel.
 
I still can't believe it... but she turned 
many of our sister Rogues against us 
and drove us from our ancestral home. 
Now the last defenders of the 
Sisterhood are either dead or scattered 
throughout the wilderness.
 
I implore you, stranger. Please help us. 
Find a way to lift this terrible curse and 
we will pledge our loyalty to you for all 
time.
`,Xw=`34
Greetings, young Sorceress. It is good 
to see more of your kind at work in the 
world these dark days. In my opinion, 
the world needs more women to fight 
against the great shadow. But I am 
forgetting my manners... 
 
I am Akara, High Priestess of the 
Sisterhood of the Sightless Eye. I 
welcome you, traveler, to our camp, 
but I'm afraid I can offer you but poor 
shelter within these rickety walls.
 
You see, our ancient Sisterhood has 
fallen under a strange curse. The 
mighty Citadel from which we have 
guarded the gates to the East for 
generations, has been corrupted by the 
evil Demoness, Andariel.
 
I still can't believe it... but she turned 
many of our sister Rogues against us 
and drove us from our ancestral home. 
Now the last defenders of the 
Sisterhood are either dead or scattered 
throughout the wilderness.
 
I implore you, stranger: please help us. 
Find a way to lift this terrible curse and 
we will pledge our loyalty to you for all 
time.
`,eM=`42
The Sisterhood of the Sightless Eye has 
a long and distinguished history. Over 
the generations our Order has become 
a deadly fighting force as well as a 
bastion for women who sought to forge 
their own destiny.
 
Yet beware, young one, the lure of 
power and knowledge can lead to 
disaster. I have seen ambition foul the 
bravest of hearts and recklessness dull 
hard-won wisdom.
 
You would do well to tread lightly upon 
the dark path you have chosen to 
explore.
`,aM=`49
I understand that Cain is the last 
descendant of the ancient Horadrim 
and that his knowledge of their lore is 
vast. He could prove to be very useful 
in discerning the nature of our current 
crisis.
`,tM=`49
Kashya has always been fiercely loyal, 
but I fear her anger and frustration 
over these recent events will lead her 
into harm's way. She is highly 
protective of the few Rogues remaining 
under her command and will not send 
them into combat unless there is dire 
need.
`,nM=`46
Charsi is young and innocent. However, 
I believe her Barbarian blood thrills to 
the prospect of adventure and danger. 
She takes great pride in her work and 
finds comfort in the fact that her 
weapons and armor are helping to end 
this evil plague.
`,sM=`48
Though he has only been our guest for 
a short time, I sense that Warriv has 
faced many harrowing trials. Though 
he knows, as I do, that a terrible evil 
has blanketed the land, his only real 
concern is to reach the eastern trading 
ports with his caravan.
`,lM=`53
To be honest, I have done my best to 
stay clear of Gheed. He wears 
dishonesty about himself like a cloak 
and seeks only to better his situation 
by preying on the misfortunes of 
others.
`,iM=`55
The wilderness is overrun with Evil and 
the minions of Hell have taken our 
rightful home. We must purge all Evil 
from the Monastery and restore order 
to the world.
`,oM=`53
I often dream of the day we reclaim our 
own. The Sightless Eye sees through 
the mist of time a great glory ahead, 
but how far ahead the Eye cannot 
discern.
`,rM=`67
Our mental discipline is matched only by 
our skill in archery... I only hope these 
are enough to withstand this awful 
trial.
`,cM=`59
Beware that you do not suffer the fate 
of the corrupted Rogues. To lose one's 
life is a tragedy, but to lose one's soul 
is even worse.
`,dM=`41
Even though the corrupted ones were 
once of our Order, you need not shy 
from slaying them, for they stand 
between you and Andariel.
 
Perhaps, when the Demon Queen is 
dead, our Sisters will return to life, but 
more likely they will be forever bound 
to their unholy pact.
`,uM=`56
Welcome, outlander, to our glorious 
hovel. I know you're here to challenge 
the evil that's driven us from our 
ancestral home.
 
But, know this. Akara may be our 
spiritual leader, but I command the 
Rogues in battle. It will take more than 
just killing a few beasts in the 
wilderness to earn my trust.
`,hM=`55
Well, well, I never expected to see an 
Amazon in these lands. You're very 
brave to have come here. Many of my 
fellow Sisters have fallen under some 
dark spell, and if you're not careful you 
may fall prey to it as well.
`,mM=`60
When I was very young, Akara told me 
tales of the Amazons' fearlessness in 
battle and of their skills with spears 
and bows. I like to think we Rogues 
have much in common with you 
Amazons.
`,gM=`64
Some of my Rogues told me of Deckard 
Cain. They said that he is a man of 
great wisdom. Personally, I don't know 
how wise he could possibly be if he 
never learned how to wage battle 
himself.
`,fM=`57
Akara has been like a mother to me for 
as long as I can remember. She is wise 
and good, but I don't think she has the 
steel to retake our Monastery by force.
`,vM=`89
I don't trust many outlanders, but 
Warriv seems fine. He never says much 
to me, though.
`,pM=`66
Before our exile, Charsi, our blacksmith, 
could fashion any implement of war.
 
Here in the camp, she merely makes do. 
Her best tools remain within the 
Monastery.
`,yM=`58
Gheed is a pig. I've been tempted to 
throw him out of the camp many times, 
but Charsi seems to think that he's 
good company. I don't trust the man, 
but if she's comforted by him, then I'll 
desist.
`,kM=`76
If we could only find out how Andariel 
has managed to corrupt our Sisters, 
then, perhaps, we could drive out the 
evil clouding their minds.
`,bM=`68
In this camp, those of us who have 
remained true to our Order are forced 
to live among common traders and 
farm animals.
 
Welcome to our circle of suffering.
`,wM=`67
Perhaps Tristram deserved its fate... 
for letting Evil loose upon the land. I 
only hope we don't suffer the same.
`,MM=`71
Some evenings we gather at the bonfire 
to retell epic tales... and try to forget 
about the terrible events that led to 
losing the Monastery.
`,xM=`47
Hi there. I'm Charsi, the blacksmith here 
in camp. It's good to see some strong 
adventurers around here.
 
Many of our Sisters fought bravely 
against Diablo when he first attacked 
the town of Tristram. They came back 
to us true veterans, bearing some 
really powerful items. Seems like their 
victory was short-lived, though... Most 
of them are now corrupted by Andariel.
`,SM=`54
Wow. You're a Barbarian, huh? It's 
really great to meet you. I've seen a 
few of your kind around here lately. I'm 
a little jealous... I wish I could go off 
adventuring with you.
 
Oh, by the way... I'm Charsi, the 
blacksmith here in camp.
`,LM=`57
You know, I've been with the Sisters for 
as long as I can remember. But Akara 
told me that my real parents were 
Barbarians from the northern tribes 
and that they were killed when I was 
very young.
 
Sometimes I wonder what my life would 
have been like if I had been raised as a 
Barbarian.
 
I don't know. I love being a blacksmith... 
but sometimes I just want to get out 
and explore the world, you know?
`,AM=`86
I don't really know anything about Cain. 
He seems to have a lot of secrets... 
That makes me nervous.
`,CM=`51
Oh, Kashya's fantastic. Sure, she's a 
little hard on outsiders, but who can 
blame her? All she wants is to protect 
our Order. But now that our Sisters 
have turned against us... I think this 
whole mess has hardened her heart.
`,IM=`64
Akara, our priestess and seer, is most 
upset by the corruption of our Sisters. 
I fear that she blames herself.
`,TM=`80
Warriv's all right, I guess. He seems too 
serious most of the time. I haven't 
really talked to him all that much.
`,BM=`60
Oh, I like Gheed. He's very funny. He 
has all sorts of interesting stories from 
the places he's been. I wish I could see 
the sights he has.
`,HM=`84
I don't know why some of my Sisters 
chose to follow Andariel. Those who 
strayed were among our finest 
warriors.
`,DM=`48
Good day to you partner! I'm Gheed and 
I can already tell that I'll be your best 
friend in this forsaken camp.
 
A spare weapon, some gold, a small 
gem is all I want in exchange for the 
equipment you'll need on whatever 
quests you might undertake.
 
Now, now, now... Don't be shy, all of my 
items are guaranteed for life and come 
with a two-day warranty!
`,GM=`46
A Necromancer! I hoped I'd never have 
to lay my eyes on one of your kind 
again. ... The recent troubles in this 
area have brought out all kinds, I see. 
Nevertheless, your money's good...
 
A spare weapon, some gold, a small 
gem is all I want in exchange for the 
equipment you'll need on whatever 
quests you might undertake!
 
Now, now, now... Don't be shy, all of my 
items are guaranteed for life and come 
with a two-day warranty!
`,EM=`74
Don't think you can fool me, 
Necromancer. I've seen what your kind 
can do. If you're involved in any of the 
evil out there, I don't even want to 
know. Trade quickly and be about your 
business!
`,FM=`57
That old coot, Cain, is as crazy as a wet 
Quill Rat. I hear he survived whatever 
happened in Tristram. Personally, I 
wouldn't trust a thing he has to say.
`,qM=`55
Akara and Kashya are Sisters in the 
Order of the Sightless Eye, but they are 
worlds apart. Akara is a slow river of 
magic, and Kashya, a viper of war. 
They're both deeply devoted to their 
religious order, yet the corruption of 
their Sisters pains them both to no 
end.
`,RM=`52
Charsi is a fine girl..., but she has no 
business savvy! I know she means well, 
but the prices she charges for weapons 
and armor will never earn her a profit.
 
As long as I keep filling her mind with 
stories of adventure, she'll never catch 
on to the fact that I'm raking in gold 
hand over fist!
`,PM=`55
Warriv was kind enough to let me travel 
with his caravan, but don't let him drag 
you into a search for a new Eastern 
trade route.
 
I'm making a fortune right here... from 
the Rogues, of course! You, on the 
other hand, always get my best prices!
`,NM=`61
Andariel's demonic forces have taken up 
residence in the forests as well as the 
Monastery. Uh-uh. I won't be venturing 
out of the camp. So, if you need 
anything, I'll be right here.
`,OM=`58
When - or if - I get to Lut Gholein, I'm 
going to find the largest bowl of 
Narlant weed and smoke 'til all earthly 
sense has left my body.
`,zM=`43
Long ago, the Soulstones were given to 
the Horadrim by the Archangel Tyrael. 
They were used to bind the three Prime 
Evils. I now know that even these holy 
artifacts were no match for Diablo's 
power.
 
I hope that his two brothers are more 
securely held... but I fear the worst.
`,_M=`54
It takes time to master your skills... and 
use will hone your technique. But take 
care to choose your new skills wisely.
`,WM=`52
You may recover some mysterious 
things from the demons you kill. Some 
of great use to you... some of great 
peril! Bring them to me and I'll reveal 
their secrets.
`,VM=`46
Have I told you about the Horadrim? 
They were an ancient confederation of 
mage-clans who sought to bind the 
three Prime Evils for eternity. The 
Horadrim are now nearly forgotten... 
and it appears that the bonds they 
wove are unravelling!
 
As the last of the Horadrim, I pray that 
I can help you remedy their failure.
`,QM=`43
Long ago, Diablo and his brothers were 
cast out of Hell by the Lesser Evils. It 
seems that Hell's balance has shifted, 
as Andariel is now aligned with the 
Lord of Terror. Her presence here in 
the mortal realm does not bode well for 
us.
`,UM=`90
Turn back! I can tell that you need more 
experience to fight safely in the next 
wilderness.
`,KM=`46
Halt! You should complete Akara's quest 
before venturing further. Search for 
the Den in the wilderness closer to 
camp.
`,JM=`116
Beware! The evil is strong ahead.
`,$M=`92
Beware! Beyond lies mortal danger for 
the likes of you!
`,jM=`88
Take care! The Corrupted Rogues in the 
wilderness ahead are not to be trifled 
with.
`,YM=`43
There is a place of great evil in the 
wilderness. Kashya's Rogue scouts 
have informed me that a cave nearby is 
filled with shadowy creatures and 
horrors from beyond the grave.
 
I fear that these creatures are massing 
for an attack against our encampment. 
If you are sincere about helping us, 
find the dark labyrinth and destroy the 
foul beasts.
 
May the Great Eye watch over you.
`,ZM=`46
I should add that many Rogue scouts 
have died in that horrible place. We 
cannot afford to lose any more. If you 
choose to enter that Den of Evil, you 
must do so alone.
`,XM=`87
The demons in that cave have claimed 
many of my finest archers. I wonder 
how you will fare!
`,ex=`95
The beasts from the cave have begun to 
roam throughout the countryside. 
You'd better be careful out there.
`,ax=`95
You seem like a noble warrior. I hope 
you can help us.
`,tx=`67
You're a brave soul! I'd sooner thrust 
my sacred scepter into the foulest, 
carbuncular trull than set one boot 
into that cave.
`,nx=`122
One who seeks that cave, seeks death.
`,sx=`85
Your task is not complete until you have 
killed all the demons in that cave.
`,lx=`111
You'd better come through on this. Your 
reputation depends on it.
`,ix=`148
You haven't cleared the cave, yet? Do 
you need anything?
`,ox=`73
Demons still befouling that cave, huh? I 
think you might need a new weapon.
`,rx=`124
One who hesitates... does so with good 
reason.
`,cx=`65
You have cleansed the Den of Evil. 
You've earned my trust and may yet 
restore my faith in humanity.
 
Your reward is training in the skill of 
your choice.
`,dx=`74
Hmm. I'm surprised you survived that 
test, outlander. Go see Akara. She may 
reward you.
`,ux=`94
You are truly brave and skillful...  Akara 
was worried about you.
`,hx=`87
The only good demon is a dead one, I 
say.
 
By the way, did you happen to find 
anything in that cave you'd like to sell?
`,mx=`120
...That which does not kill you makes 
you stronger.
`,gx=`56
My Rogue scouts have just reported an 
abomination in the Monastery 
graveyard!
 
Apparently, Andariel is not content to 
take only our living. Blood Raven, one 
of our finest captains in the battle 
against Diablo at Tristram, was also 
one of the first to be corrupted by 
Andariel.
 
Now, you'll find her in the Monastery 
graveyard raising our dead as 
zombies!
 
We cannot abide this defilement! If you 
are truly our ally, you will help us 
destroy her.
`,fx=`80
Death has done nothing to weaken 
Blood Raven's combat skills. If 
anything, she's more deadly than ever.
`,vx=`99
Blood Raven was the leader of a Rogue 
band that once fought Diablo at 
Tristram.
`,px=`94
I'm sorry... The undead are bad for 
trade. I have a strict no-return policy.
`,yx=`51
Blood Raven fought valiantly against 
Diablo in the catacombs beneath 
Tristram... She was never quite the 
same afterwards. It is now obvious she 
brought an evil influence back with her.
`,kx=`140
Hmmm...
 
How can one kill what is already dead?
`,bx=`99
Each moment you delay adds another 
undead Sister to Blood Raven's army.
`,wx=`70
If you fail to destroy Blood Raven, I fear 
that our Order will perish forever.
`,Mx=`68
Akara felt something was wrong even 
before Andariel descended upon us. 
She feared that Blood Raven had 
stumbled upon some evil force beneath 
Tristram.
 
I wish we had acted then...
`,xx=`77
I wonder if that old gossip, Melra, is 
among the undead? Oh, she had dirt on 
everybody.
`,Sx=`86
When the dead return to prey upon the 
living, it is a terror beyond 
understanding.
`,Lx=`55
I can hardly believe that you've defeated 
Blood Raven!
 
Though she was once my closest friend, 
I pray that her tortured spirit remains 
banished forever.
 
You have earned my respect, stranger... 
and the allegiance of the Rogues. I 
have placed several of my best 
warriors at your disposal.
`,Ax=`122
Andariel must be made to pay for her 
sacrilege!
`,Cx=`77
Kashya wishes to reward you for your 
defeat of Blood Raven. I thank you, 
too, even though Blood Raven was once 
my friend.
`,Ix=`148
Some of those gals weren't so nice the 
first time around.
`,Tx=`104
You've done well, stranger. I hope all 
your efforts are worth it.
`,Bx=`50
It is clear that we are facing an Evil 
difficult to comprehend, let alone 
combat.
 
There is only one Horadrim sage, 
schooled in the most arcane history 
and lore, who could advise us... His 
name is Deckard Cain.
 
You must go to Tristram and find him, 
my friend. I pray that he still lives.
`,Hx=`90
The bark of Inifuss holds mystical 
runes.
 
Akara can translate them... into our 
revenge!
`,Dx=`42
Tristram is too far to journey by foot...  
Cain would likely be dead, when you 
arrived. However, there is a magical 
portal that will take you there 
instantly.
 
To open it, one must stand within the 
circle of Cairn Stones and touch them 
in a certain order. The proper order 
can be found in the runes written on 
the bark of the Tree of Inifuss.
 
You must find the sacred Tree of Inifuss 
and bring back its bark. I will translate 
the runes to unlock the Stones' mystic 
pattern.
`,Gx=`117
If you bring back the bark of Inifuss, 
Akara will tell you how to get to 
Tristram.
`,Ex=`68
Months ago, I came across a few 
survivors from Tristram. They said 
that Cain had gone half-mad and could 
no longer distinguish fact from 
fantasy.
`,Fx=`98
I would sooner micturate in a tankard 
of my own ale than journey to 
Tristram!
`,qx=`150
Without the bark of Inifuss you can't 
find Cain.
`,Rx=`76
How will you find Cain without going to 
Tristram? Finding the Tree of Inifuss is 
the first step on your journey.
`,Px=`96
The Tree of Inifuss is hard to find, but 
you'll know it when you see it.
`,Nx=`99
Barking up the wrong tree, huh? You'll 
find it, just keep looking.
`,Ox=`70
He who seeks that which cannot be 
found must look inside himself for 
further guidance... or look harder!
`,zx=`82
With this scroll you may open a portal 
back to Tristram. Only Akara can 
decipher its logic.
`,_x=`168
Get this to Akara.
 
Only she can understand it.
`,Wx=`72
Look, friend... I trade a lot of strange 
items, but I'm not going to start 
dealing in bark. Okay?
`,Vx=`86
This looks like gibberish to me. Akara 
may know what to make of it.
`,Qx=`64
Ah, very good. I have translated the 
runes on this scroll. You must find the 
Cairn Stones and touch them in the 
order that I have written.
`,Ux=`103
Deckard Cain has crucial knowledge 
about the Evils we face. You must find 
him!
`,Kx=`92
I have heard that Tristram is now in 
ruins! Without Cain I fear for the ruin 
of all of us.
`,Jx=`68
I'm told that Tristram now resembles a 
mead hall... after a Barbarian wedding! 
I will wait here for your most glorious 
return.
`,$x=`82
It is too dangerous to travel to 
Tristram. I won't be leaving here until 
the way is clear!
`,jx=`64
If he still lives, Deckard Cain may be in 
grave peril! You must hurry to Tristram 
before all is lost!
`,Yx=`82
You have risked your life to rescue 
Cain. For that we thank you.
 
We must seek his counsel immediately.
`,Zx=`78
Again, you amaze me, outlander.
 
The Sisterhood is grateful to you for 
delivering Cain to us. I believe Akara 
has something to tell you.
`,Xx=`53
Ah, Cain is here... another customer. I 
haven't been this pleased since a 
love-starved maiden let down a bit 
more than her hair.
`,eS=`102
Akara wishes to reward you for your 
bravery in returning Deckard Cain.
`,aS=`80
Only a brave adventurer could return 
with Deckard Cain. Akara has a reward 
for your valor.
`,tS=`74
As a token of my gratitude, I will 
identify items for you at no charge.
`,nS=`82
...I thank you, friend, for coming to my 
aid.
`,sS=`75
Oh... Blessings on the Rogues! They 
finally rescued me from that cursed 
place!
`,lS=`33
Regrettably, I could do nothing to 
prevent the disaster which devastated 
Tristram. It would appear that our 
greatest fears have come to pass. 
Diablo, the Lord of Terror, has once 
again been set loose upon the world!
 
As you know, some time ago Diablo was 
slain beneath Tristram.  And when our 
hero emerged triumphant from the 
labyrinth beneath town, we held a 
grand celebration that lasted several 
days.
 
Yet, as the weeks passed, our hero 
became increasingly aloof. He kept his 
distance from the rest of the townsfolk 
and seemed to lapse into a dark, 
brooding depression. I thought that 
perhaps his ordeal had been so 
disturbing that he simply could not put 
it out of his mind.
 
The hero seemed more tormented every 
passing day. I remember he awoke 
many times -- screaming in the night -- 
always something about 'the East'.
 
One day, he simply left. And shortly 
thereafter Tristram was attacked by 
legions of foul demons. Many were 
slain, and the demons left me to die in 
that cursed cage.
 
I believe now that Tristram's hero was 
that Dark Wanderer who passed this 
way before the Monastery fell.
 
I fear even worse, my friend... I fear 
that Diablo has taken possession of the 
hero who sought to slay him. If true, 
Diablo will become more powerful than 
ever before.
 
You must stop him or all will be lost.
`,iS=`36
...And so it came to pass that the 
Countess, who once bathed in the 
rejuvenating blood of a hundred 
virgins, was buried alive... And her 
castle in which so many cruel deeds 
took place fell rapidly into ruin. Rising 
over the buried dungeons in that 
god-forsaken wilderness, a solitary 
tower, like some monument to Evil, is 
all that remains.
 
The Countess' fortune was believed to 
be divided among the clergy, although 
some say that more remains unfound, 
still buried alongside the rotting skulls 
that bear mute witness to the 
inhumanity of the human creature.
`,oS=`110
The only wealth you're likely to find 
there is a wealth of vermin.
`,rS=`70
That old tower is as rotten on the inside 
as it appears on the outside. I heard 
that several Sisters came to a 
gruesome end when a stairwell 
collapsed on them.
`,cS=`67
The dangers there are not solely 
architectural. Once inside that 
wretched place, many succumb to a 
vile miasma.
`,dS=`60
That tower marks a place of danger. 
There is an epic poem about it...  How 
much sorrow one can stand was tested 
there.
`,uS=`81
Rumors of treasure are no different 
from rumors of any other kind. They 
hold false promise to those who should 
know better.
`,hS=`78
The tome speaks of treasure. Yet, all we 
have found are death, delirium, and 
disappointment.
`,mS=`151
Have you suddenly lost your taste for 
wealth?
`,gS=`94
Quickly in and quickly out is all the 
advice I can give you.
`,fS=`118
Better an empty pocket than a full 
grave.
`,vS=`170
You're not ready to give up, are you?
`,pS=`140
There is no more I can tell you about 
that ancient tower.
`,yS=`79
Guess what! I've named a boil on my 
ass after you. It, too, bothers me every 
time I sit down.
`,kS=`79
Your rewards are well-earned. To us, 
the tower was nothing more than a 
headstone looming over a long 
forgotten grave.
`,bS=`62
Remember. Wealth is as insubstantial 
as a cloud and passes as quickly. 
Ignore Gheed. All that twitters is not 
bold.
`,wS=`68
Warriv's advice is like corpse gas; it 
befouls the air for a moment and then 
it disappears.
`,MS=`58
I thought the stories of treasure in the 
tower were nothing but lies. I am glad 
you found something of value in that 
death-trap. Would that our Sisters had 
been so fortunate.
`,xS=`126
Those riches will serve you well on the 
long road ahead.
`,SS=`69
Well done, my friend. Courage and 
opportunity together have created in 
you a kind of alchemy.
`,LS=`66
When I fled the Monastery, I left behind 
the Horadric Malus, my enchanted 
smithing hammer. If you can retrieve it 
for me, I'll use its magic to strengthen 
your equipment.
`,AS=`51
The Malus was forged and enchanted by 
the ancient Horadric Mages during the 
Sin Wars. When their union dissolved, 
the Malus was entrusted to the 
Sisterhood guarding the pass into the 
East.
`,CS=`59
The retrieval of the Horadric Malus is 
not without risk. Our Monastery is 
filled with voracious hellspawn. You'd 
best be careful, my friend.
`,IS=`61
Charsi is wasting her time and talents 
using an inferior hammer! Had she the 
Horadric Malus, she could make the 
steel sing and craft you a suit of armor 
as impenetrable as the Great Eye.
`,TS=`87
The Monastery can confuse even those 
who know it well. Stay alert in there.
`,BS=`74
Charsi talks of nothing anymore, but 
this Horadric Malus. Between you and 
her my ears need a rest.
 
Just find it and bring it back quickly.
`,HS=`74
I have offered my nomadic phallus, but 
to no avail.
`,DS=`68
Just as an archer needs bow and arrow, 
or a draughtsman pen and paper, so 
Charsi needs the Horadric Malus with 
which to ply her trade.
`,GS=`57
The Malus has eluded you so far. Well, 
search thoroughly in the Barracks... 
That is where the Rogues kept their 
forge.
`,ES=`98
If you can't carry out this quest, how 
will you face the greater evils ahead?
`,FS=`71
To do battle with Andariel requires 
more than thick skin and a strong will. 
You'll want armor and weaponry forged 
with the hammer's enchantments.
`,qS=`89
The Malus is a Horadric artifact of 
great power. Please bring it back.
`,RS=`90
I have heard that you bear us no Malus.
`,PS=`120
What better opportunity to show your 
mettle?
`,NS=`59
The magical effects imbued by the 
Malus are impossible to predict, but 
are always to the good.
`,OS=`57
Well done, my friend. But remember, the 
return of the Horadric Malus is but one 
step in reclaiming the Monastery.
`,zS=`74
Now that the Horadric Malus is back in 
our possession, we shall use it to 
deliver a great blow against the Evil 
which torments this land.
`,_S=`72
Oh! Thanks so much for returning the 
Horadric Malus! I will now imbue one of 
your items with magical powers.
`,WS=`120
I guess it's too late to take back some 
of the names I called you.
`,VS=`118
I am glad the hammer has returned and 
you with it.
`,QS=`34
It is certain that we face the demon 
queen, Andariel, who has corrupted the 
Rogue Sisterhood and defiled their 
ancestral Monastery. This does not 
bode well for us, my friend.
 
Ancient Horadric texts record that 
Andariel and the other Lesser Evils 
once overthrew the three Prime Evils -- 
Diablo, Mephisto and Baal -- banishing 
them from Hell to our world. Here, they 
caused mankind untold anguish and 
suffering before they were finally 
bound within the Soulstones.
 
Andariel's presence here could mean 
that the forces of Hell are once again 
aligned behind Diablo and his Brothers. 
If this is true, then I fear for us all.
 
You must kill her before the Monastery 
becomes a permanent outpost of Hell 
and the way east lost forever.
`,US=`45
Diablo is heading east for some foul 
purpose. And the only passage east is 
through the Monastery gate. 
Obviously, Diablo summoned Andariel 
to block any pursuit.
 
For her part Andariel hopes to win 
Diablo's favor... the lesser demons are 
always vying for positions of power 
within the unholy hierarchy!
`,KS=`63
Andariel has desecrated all we hold 
dear. She must not be permitted to 
serve Diablo.
 
Destroy her! Her corruption of our 
Order must be undone!
`,JS=`132
Send Andariel back to the Hell she came 
from!
`,$S=`71
You're going after Andariel?
 
... One of my wagon wheels is in need of 
repair. I'll be under the wagon, if I'm 
needed.
`,jS=`72
The mapmakers tell us the shortest 
distance between two points is a 
straight line.
 
Our way east is a line that runs through 
Andariel's stronghold, the Monastery.
`,YS=`81
I can imagine a thousand different ways 
to kill Andariel. You need only choose 
one.
`,ZS=`48
It is clear that Andariel is acting on 
behalf of Diablo to prevent anyone 
from following him eastward. Her 
defeat would allow you to continue the 
pursuit.
 
Ancient lore has it that while Andariel 
was spawned in the Burning Hells, she 
is not fond of fire.
`,XS=`57
You have done much to help us, but I 
sense that this has only fueled 
Andariel's fury. She will not stop until 
we are all dead.
 
You must kill Andariel before her army 
can gain the upper hand.
`,eL=`72
Have you stumbled upon that Demon 
Queen, yet? I hear she's quite the 
beauty... as far as Maidens of Anguish 
go, that is.
`,aL=`108
If you are the hero that you seem to be, 
now is the time to prove it.
`,tL=`90
May I remind you that my caravan can 
only go east, if the Monastery is 
cleansed?
`,nL=`126
Deckard Cain has important information 
about Andariel.
`,sL=`64
Finally, we may rejoice!
 
We owe you a debt we can never repay. 
I only hope that in time we will be able 
to rebuild our Order.
 
All our thanks go with you, my friend.
`,lL=`86
You'll probably go east now... It was 
good to know you. I hope you'll come 
back if you ever need anything.
`,iL=`44
Andariel's death brings about renewed 
life for us all. We mourn the loss of our 
dear Sisters, but at least now we can 
get on with our lives.
 
I... may have misjudged you, outlander. 
You are a true hero and testament to 
the noble spirit which has inspired our 
Order for generations.
 
Fare well... my friend.
`,oL=`100
I'm going to party like it's 999!
`,rL=`82
The caravan is prepared. We may now 
journey eastward to Lut Gholein.
`,cL=`38
This is a great victory indeed, but many 
more battles await. I will accompany 
you on your journey, lending what 
assistance I can... 
 
Remember... Diablo is still out there, 
seeking something in the desert. I'm 
afraid that this nightmare will not end 
until you find what it is that he seeks.
`,dL=`600
Halt.
`,uL=`290
You may not pass.
`,hL=`255
Welcome to the palace.
`,mL=`255
You may enter the palace.
`,gL=`290
Stay out of trouble.
`,fL=`58
I'll bet you wonder how this town 
manages to stay safe with all the 
trouble going on out in the desert. 
Well, I can tell you that it's got nothing 
to do with the local town guards... 
they're all in the palace for some 
reason.
 
Jerhyn hired me and my mercenaries to 
help keep the peace around here. We're 
not cheap, but we're the best this 
wasteland has to offer.
`,vL=`85
We do a good job in town, but beyond 
the city gates, you'll find all manner of 
demons.
`,pL=`52
The local guards were all relocated to 
the palace after the troubles began. No 
one really knows why. Actually, all of 
the town's brothel girls have been 
hiding out in the palace's cellar lately, 
so I assume that the guards have been 
assigned to 'protect them' with their 
lives.
`,yL=`75
I might spare you a few of my men. 
Why, enough gold can muster an army.
`,kL=`61
Jerhyn's got a nice little trading post 
going here. Despite his youth, he is a 
clever businessman. As you can see by 
that palace, he's done quite well for 
himself.
`,bL=`99
We're keeping the town safe and tight, 
but I've got a hunch there's something 
Jerhyn's not telling us.
`,wL=`44
Ah, Elzix is quite a character. I had a 
few run-ins with his band of outlaws in 
my younger years. Now, he's as settled 
as the dunes out there. The Desert Rain 
Inn is his pride and joy these days.
`,ML=`53
Atma seems to be a fine woman. But I'm 
sure the loss of her family has made 
her lonely. Perhaps I should go over 
and console her when I get off duty 
tonight...
`,xL=`72
Geglash is an imposing warrior, but he's 
never been able to back down from a 
fight. One of these days, his pride will 
be the death of him.
`,SL=`67
Meshif has sailed all around the 
southern seas and visited many 
strange lands. It must be driving him 
mad, having to stay anchored here.
`,LL=`70
I haven't talked much to Fara. She 
keeps to herself most of the time. I get 
the feeling that she doesn't like us 
mercenary types much.
`,AL=`73
I'd stay clear of Lysander, if I were you. 
He's always mixing his damned potions 
and chemicals. I wouldn't be surprised 
if he winds up blowing himself to 
smithereens!
`,CL=`85
Drognan's a mystery to me. Then again, 
I never did trust mages much.
`,IL=`61
Hmm... You look like a sturdy 
adventurer.
 
You know, I used to be quite the 
scoundrel in my day. I led the fiercest 
group of bandits who ever terrorized 
these sands!
 
Nowadays, I run this here Inn and 
pretty much stay out of trouble.
 
My days of adventuring are behind me.
`,TL=`48
Ah... You must be one of the new 
heroes who've come to rid our city of 
evil. Under any other circumstances, I'd 
be surprised to see one of your kind in 
the city. But lately... Oh, never mind all 
that...
 
You know, I used to be quite the 
scoundrel in my day. I led the fiercest 
group of bandits who ever terrorized 
these sands!
 
Nowadays, I run this here Inn and 
pretty much stay out of trouble.
 
My days of adventuring are behind me.
`,BL=`52
You know, I've lost a number of body 
parts over the years. An eye here, a leg 
there...
 
Say, do you know any spells that'd grow 
them back for me? Hmm... On second 
thought, I'll leave well enough alone.
`,HL=`90
What tales Drognan can tell... You 
would do well to listen carefully to that 
wizened wizard.
`,DL=`80
There are many ancient tombs in the 
desert. Most of them are already 
plundered, but I imagine that some 
have remained hidden.
`,GL=`67
I miss the brothels that used to do 
business here.
 
You know, all of the ladies fled to the 
palace as soon as the trouble in the 
desert started. You'd think that they 
could at least come out once in a while 
now that Greiz and his men have things 
relatively under control.
`,EL=`71
Atma... Now, there's a fine woman. 
Lately, though, she's only thinking 
about revenge. She has reason 
enough...
`,FL=`71
We've all fared well under Jerhyn's 
leadership. The town has remained 
safe throughout this whole mess; and 
yet the lad still seems very upset about 
something.
`,qL=`88
Geglash is a fool who would fight his 
own shadow if he could. Fighting's all 
he ever thinks about!
`,RL=`74
Meshif is a wise Captain, I think. Wise 
enough to know silver from tin and 
truth from dung, that's for sure.
`,PL=`65
Fara is a good woman. She seems very 
sad, but seldom speaks of her past. 
She's good to the poor and helps 
people when she can. That makes her 
all right in my book.
`,NL=`70
That Lysander's a grumpy old cuss. 
You'd better not disturb him while he's 
working on his potions, or... BOOM! 
You could get blasted to the moon.
`,OL=`62
Now that Andariel is dead, I can return 
and outfit the Rogues properly. Once 
I've made some trades here, I'll be free 
to head back to their Monastery. Let 
me know if you want to travel along.
`,zL=`106
Caravans take people where they want 
to go - until they get there.
`,_L=`80
By ship is the only way eastward from 
here. I believe Captain Meshif has a 
small trading vessel moored at the 
docks.
`,WL=`70
There used to be a lot of brothels 
here... I guess the troubles scared all 
the women away, or maybe they're 
'safe' in Jerhyn's palace.
`,VL=`53
That old desert fox, Elzix, is as crafty 
as they come. Years back, he made off 
with a small fortune of my caravan's 
wares. I certainly never expected to see 
him so... domesticated.
`,QL=`57
Jerhyn has his father's strength and 
wits. He's young, but he rules this 
place with wisdom and care. I think 
he'll grow into a fine Sultan... Provided 
we all survive this crisis.
`,UL=`59
You'll forgive me if I seem upset. I've 
suffered a loss recently, but that's not 
your problem.
 
It's a relief to see some proper warriors 
come through here. My name is Atma. I 
run the tavern here in Lut Gholein.
`,KL=`86
Evil has laid siege to Lut Gholein and 
you may be our last hope...
`,JL=`56
This public house used to be quite lively, 
until this plague of evil. Luckily, I've 
managed to save away a tidy nest egg. 
Unfortunately, I couldn't save 
everything I cared for...
`,$L=`57
In addition to my public house, there 
used to be several brothels doing 
business here. When the troubles first 
started in the desert, the harem guilds 
sought sanctuary within the palace.
 
Of course, Jerhyn was glad to oblige. I'll 
bet they're finding many ways to repay 
him for his protection.
`,jL=`70
Geglash may seem like a sot, but he's a 
brave man. All this trouble has driven 
him to drinking more than his usual.
`,YL=`64
Elzix and I have reached an 
understanding over the years. He 
sends travelers to me for drink and 
entertainment, and I send them back to 
him for a soft bed. The travelers often 
trade their wares for lodging.
`,ZL=`89
Meshif seldom patronizes my 
establishment. I think he prefers to 
stay out there on his leaky ship.
`,XL=`71
Oh, Lysander is cranky, but he's a good 
old man. He used to give me medicines 
when... my son was ill.
`,e0=`78
Drognan is a very private person. He's 
always studying ancient scrolls and 
such. He may be a mystery to me 
forever.
`,a0=`57
Bah! I don't know why you people keep 
pestering me.
 
Greiz seems to have this place locked 
down nice and tight. Not that I couldn't 
have done the same! I've proven my 
valor in combat plenty of times.
`,t0=`43
Hey, you're a Barbarian, aren't ya? 
Ferocious as the wild beasts of the 
north, that's what they say. I suppose 
you've come to help save this city. You 
needn't bother.
 
Greiz seems to have this place locked 
down nice and tight. Not that I couldn't 
have done the same! I've proven my 
valor in combat plenty of times.
`,n0=`46
Hey, I heard that you Barbarians can 
wield multiple weapons at once. I never 
learned to fight two-handed. Carrying a 
sword and a wineskin at the same time 
is all I can ever handle.
`,s0=`53
Sure, I hear lots of what goes on. Did 
you hear about the harem guilds? They 
were the only ones allowed to hide out 
in the palace when the raids started!
 
Ah... It figures.
`,l0=`64
I've killed plenty of those demons out in 
the desert. It doesn't seem to slow 
them down any, though... they just 
keep coming back for more.
`,i0=`55
Have you found those big sand maggots 
yet? Arrows and all that don't work so 
well against them. Best thing is to hack 
'em with a sword or such.
`,o0=`58
There are some ancient tombs out there 
in the desert. You have to go pretty far 
to find them, though. Rumor has it that 
they're crawling with walking corpses 
now.
 
As if the Saber Cats and Claw Vipers 
weren't bad enough.
`,r0=`67
Yeah. Meshif's okay, I guess. But I'll be 
damned if I ever get on his ship. I don't 
even like to drink water.
`,c0=`52
Jerhyn's been acting strange lately. I 
can't imagine why he recalled the town 
guards into the palace. If there is 
something wrong in there, I hope he 
doesn't expect me to handle it.
`,d0=`57
I've seen Fara defend herself against a 
few drunken ruffians. She's got moves 
I've never even seen before. Wherever 
she's from, she sure learned how to 
fight there.
`,u0=`83
I've got no time for old alchemists. 
Lysander would be completely useless 
in a real fight.
`,h0=`63
Greetings. I'm Meshif, captain of this 
ship here. I make port runs around the 
Twin Seas and occasionally out to 
Kingsport in Westmarch.
 
I haven't sailed anywhere lately, 
though... Jerhyn has ordered me to 
stay docked here in case of emergency.
`,m0=`54
Greetings, Amazon. I haven't seen one 
of your kind in many years.... It's good 
to know that warriors of your caliber 
are protecting this city.
 
I'm Meshif, captain of this ship here. I 
make port runs around the Twin Seas 
and occasionally out to Kingsport in 
Westmarch.
 
I haven't sailed anywhere lately, 
though... Jerhyn has ordered me to 
stay docked here in case of emergency.
`,g0=`62
I was wondering if you've heard any 
news from Kurast? I know you 
Amazons travel extensively. Have you 
been there recently?
 
Hmm... Well, I hope the port opens 
soon. I need to get home to Kurast and 
find out what's been happening there.
`,f0=`72
There's something Jerhyn's not telling 
me, I just don't know what. To my eye, 
things here in town don't look that bad, 
especially since Warriv's caravan route 
opened up.
`,v0=`65
I've been all around the seas in these 
parts. It's dangerous sailing west this 
time of year, though. Until the season 
changes, the caravan through the 
desert is the main trade route to 
Westmarch.
`,p0=`75
My ship is the only way East from here. 
Still, Lord Jerhyn tells me that I may 
not leave until the current crisis is 
over.
`,y0=`65
Oh, I've known Elzix for years. He 
always offers me a free room at his Inn 
when I dock here, but I prefer the 
comforts of my own cabin.
`,k0=`61
Warriv is a good friend. We've shared 
many tales, he and I. If we had it all to 
do over again, I believe we'd both be 
explorers of some renown.
`,b0=`69
Greiz seems to be a dependable fellow. I 
hope he can handle it if those things in 
the desert decide to attack this town.
`,w0=`130
Atma serves a fine ale in her 
establishment.
`,M0=`70
Hah! That braggart Geglash says he 
fears neither man nor beast. Yet, when 
I offer to take him out to sea, he 
quakes with fear.
`,x0=`130
The lady Fara has a proud, noble air 
about her.
`,S0=`41
Greetings, honored traveler. I am 
Jerhyn, Lord of Lut Gholein, and I bid 
you welcome to my fair port-city. I'm 
glad to know that once again caravans 
are free to travel through the Western 
Pass.
 
For some time now, we have been under 
siege by an evil power that I cannot 
identify. Strange... It all began when a 
Dark Wanderer came this way, looking 
for the Tomb of Tal Rasha. No one 
knows exactly where Tal Rasha, Keeper 
of Baal, is entombed, but it is certain 
to be far out in the desert.
 
Now, my people whisper tales of the 
dead rising from their tombs and 
horrible creatures lurking amongst the 
moonlit dunes. Even I have witnessed 
things which I cannot explain. I've 
ordered the port closed and all trade 
ships moored until I am sure that my 
city is safe.
 
Atma, the tavernkeeper, has an 
important mission for you. Go see her 
immediately. You'll find her on the 
other side of town.
 
Now, I must return to the palace. I 
apologize, but I can't invite you in. 
Things are... rather a mess right now.
`,L0=`51
For trade in magic and the like, see 
Drognan or Lysander. Drognan is the 
wisest man I know - without equal in 
magic and ancient lore. Poor Lysander 
is nearly deaf, but he's a reliable potion 
chemist.
 
For travel back west, see Warriv, whom 
you already know.
 
Our own Fara is a fine and honest 
armorer, and she can heal wounds as 
well.
 
Elzix is the Innkeeper and may also 
have some items to trade.
 
Greiz, the mercenary captain I hired to 
secure the gates of Lut Gholein, keeps 
order in town, as well.
 
There are others here, too. I'm sure 
you'll meet most of them. Just look 
around...
`,A0=`117
Things are getting worse by the hour. I 
know everything looks fine, but trust 
me, it isn't!
`,C0=`117
Things are getting worse by the hour. I 
know everything looks fine, but trust 
me, it isn't!
`,I0=`63
To any who aid me in the defense of Lut 
Gholein, I pledge my support. Passage 
East, wealth, honor - all are due to 
those who help my city.
`,T0=`71
You seem very capable, but no offense 
is intended when I say that I must 
choose my confidants carefully. It 
wouldn't do to have rumors sending 
everyone into a panic.
`,B0=`87
Even though he was once a bandit, I 
permitted Elzix to take over the Desert 
Rain Inn. He has been quite civilized 
ever since.
`,H0=`76
When you arrived, Warriv's caravan had 
been long overdue. With all of the evil 
that's arisen in the land, I'm surprised 
he got through at all.
`,D0=`77
Meshif is an honorable man, but I fear 
that he is growing impatient with me 
about impounding his ship. I dare not 
tell him what's really happening in this 
city.
`,G0=`98
The woman, Atma, may have some 
useful gossip for you. She can always 
be found near her public house.
`,E0=`81
I know much about the ancient 
religions. I was trained as a Paladin of 
Zakarum in the Eastern Kurast temple 
many years ago.
`,F0=`103
Welcome, brother Paladin.
 
I am Fara. I was once a devout 
champion of Zakarum.
`,q0=`67
Perhaps, in time, you will play a part in 
reclaiming our Order's honor and 
spirit. You are an inspiration to me, 
brother Paladin.
`,R0=`60
The shrines in the desert are leftover 
artifacts from the great Sin War that 
ravaged these lands almost a thousand 
years ago. They still function, but most 
travelers believe them only to be 
remnants of the distant past.
`,P0=`54
I've no love for brothels, as they can 
lead honorable men to do dishonorable 
things. Since the local harems took up 
hiding in the palace, however, there 
seems to be a rise in foul tempers.
`,N0=`66
When the Three Evils were bound ages 
ago, Mephisto, the Lord of Hatred, was 
moved to Kurast and bound by the 
holiest of magics.
`,O0=`79
Warriv may not remember me, but I 
helped him out when I was a young 
Paladin. There's no need for me to 
remind him. The rewards for honor will 
not come in this life.
`,z0=`68
Greiz is a fine warrior and leader, but in 
his heart, he will always be a 
mercenary for hire. I cannot be loyal to 
those who have no loyalty to 
themselves.
`,_0=`90
Atma is a good, loving woman. But I 
fear she will succumb to her despair 
and hatred.
`,W0=`95
Geglash is too confident in his abilities. 
A warrior's true strength is in his 
heart.
`,V0=`94
Meshif is an honest man as far as I can 
tell. He has never pestered me about 
my past.
`,Q0=`61
How do I know I can trust you? Hmm?
 
You may be as shifty as that pack rat, 
Elzix, who runs the Inn. But, if you 
need a potion, though, I suppose I can 
make you one... for a price, of course.
`,U0=`109
Potions are delicate mixtures. They're 
just as liable to go off in your face as 
anything.
`,K0=`65
Ah... The sweetest desert flower - that's 
Atma. Even my strongest brew can't 
bring back her family, though.
`,J0=`86
There are some ancient enchanted 
fountains in the desert that can heal 
your wounds - if you drink enough from 
them.
`,$0=`71
Oh. Deafness has its advantages, you 
know. I'm no longer forced to overhear 
the tedious gossip of others.
`,j0=`54
I never patronized the brothels, mind 
you. But since those ladies took up 
hiding in the palace, there certainly has 
been less scenery to feast my eyes on.
`,Y0=`95
Oh... I have great faith in Greiz. He 
seems to have things well in hand.
`,Z0=`90
I've traded my potions to Warriv many 
times. Yes. They seem to fetch a good 
price in the western lands.
`,X0=`71
I've sold many sea-sickness potions to 
Meshif over the years. It seems that 
many of his passengers don't take well 
to the rocking of his ship on the open 
seas.
`,eA=`58
Oh... Young Jerhyn used to purchase 
minor love potions from me, hoping to 
win the favors of the harem girls.
 
But now that the girls have taken up 
residence in the palace, he doesn't 
come around here anymore. Well, 
well... I've always said, 'alchemy is no 
substitute for experience'.
`,aA=`57
Drognan? Oh.. He's a good friend of 
mine. I help him find exotic spell 
components and alchemical books from 
time to time. I think he used to be a 
sorcerer of great renown, but he 
doesn't like to talk about his past.
`,tA=`61
I've heard that you are responsible for 
banishing Andariel back to the Burning 
Hells. I'm impressed, stranger. That 
couldn't have been easy.
 
My name is Drognan and I know what 
you're up against, my friend.
 
You ought to look over my inventory of 
items for trade.
`,nA=`50
Welcome, young Sorceress, to Lut 
Gholein. I hope your skills are a match 
for the horrors that lie beyond the 
city's walls. A mage of your limited 
experience may find the evil too great 
to withstand alone.
 
My name is Drognan and I know what 
you're up against, my friend.
 
You ought to look over my inventory of 
items for trade.
`,sA=`74
Many of the Mage Clans feel that 
women shouldn't practice magic 
openly. But since you've made it this 
far, I must say that you have proven 
your right to do so.
`,lA=`57
The Horadrim were a powerful Order, 
although maybe too prideful. Tal Rasha 
was one of their Order. And that 
should tell you something.
 
Any man who believes himself strong 
enough to contain one of the Prime 
Evils is in for a rude awakening, I 
should think.
`,iA=`78
I have heard of your friend, Cain. He is 
the last of the Horadrim. You would do 
well to heed whatever advice he has to 
give you.
`,oA=`53
Not long ago, one of my Vizjerei 
comrades, who I believed had died in 
Tristram, came to this city. He seemed 
quite insane, so I dismissed much of 
what he said.
 
However, he was able to talk his way 
into Jerhyn's palace. No one has seen 
him since. I fear that fool may have 
found something in the palace that led 
to his doom.
`,rA=`68
I've been practicing magic for more 
years than you could know. I'm older 
than I look, though not so old that I 
can't conjure up a few sparks.
`,cA=`67
Elzix is a sly one, I'll give him that. Of 
course, he never tries to cheat me. He 
knows what my magic skills can do.
`,dA=`86
Demons have spread throughout the 
desert wasteland and threaten to 
engulf our quiet port-city.
`,uA=`88
Meshif and his vessel should remain 
here, lest we risk taking demonic 
stowaways to other lands.
`,hA=`58
When the recent troubles began, Lord 
Jerhyn came seeking my council. I 
advised him to close the port and put 
the town under strict watch.
 
Lately, though, he's been occupied 
within the palace. I doubt his whores 
could divert him from his civic duties 
for this long, though.
`,mA=`68
Lysander is harmless enough. We keep 
each other company with our mutual 
interests, yet I don't think he could 
handle the enormity of our present 
situation.
`,gA=`48
Greetings, my friend. Have you spoken 
to Jerhyn yet? He's quite a remarkable 
leader for being such a young man. 
Then again, the old blood has always 
run strong in this land.
`,fA=`71
There is something about Fara that 
troubles me. Her manner is strange for 
a lonely desert-maid.
`,vA=`70
Elzix is quite a scoundrel, but I like him 
all the same.
`,pA=`59
I talked at length with Warriv as we 
crossed the desert from Khanduras. He 
has many fascinating tales of the 
dangers in the desert. His experience 
may be useful to you.
`,yA=`57
Meshif is an interesting man. Part of 
him longs for the freedom of the open 
seas... Yet his heart belongs in his 
homeland.
`,kA=`42
I thank you, mortal, for my freedom. 
But I did expect you earlier.
 
I am the Archangel Tyrael. I came here 
to prevent Diablo from freeing his 
brother, Baal. But I have failed. Now, 
Terror and Destruction roam free 
throughout your world.
 
Even now, they head towards the 
Eastern capital of Kurast - to the very 
heart of the Zakarum Temple. There 
they hope to find their eldest brother, 
Mephisto, the Lord of Hatred who was 
imprisoned there ages ago.
 
If the three Prime Evils unite, they will 
be invincible. Though it is unclear as to 
what their aims are, it is certain that 
they must be stopped at all costs.
 
I am broken and the energies that tie 
me to this world are diminishing 
rapidly.
 
You must take up this quest and 
prevent the Three Brothers from 
reuniting. You must cross the sea and 
search for Diablo and Baal in Kurast.
 
Now hurry, mortal... Time is running 
out for all of us!
`,bA=`50
Hey, hero! You're asking for trouble, if 
you leave town now.
`,wA=`50
I don't expect this of you, but if you 
want to help me, I would be grateful.
 
In the sewers below our city, there lurks 
a horrid creature that hungers for 
human flesh. The creature has killed 
many, including my son and my 
husband.
 
If you destroy it, I will reward you. 
Please be careful though, that beast 
has taken enough from us already.
 
The sewer entrance is through the trap 
door just up the street.
`,MA=`52
I've personally found some of that 
devil's victims washed up out of the 
sewer. Often, they are missing limbs or 
a head, and their bodies have always 
been skinned.
 
At first the creature raided the town at 
night... That's how Atma lost her 
family. Now we've got him barricaded 
in the sewers.
 
You're safe up here on the surface, but 
every now and again some fool wants 
to be a hero and heads down to the 
waste tunnels with a pig-sticker.
`,xA=`68
I hear that the creature kills his victims 
in order to hack off their limbs! I guess 
that makes me a less likely candidate, 
eh?
`,SA=`84
I've heard tales of walking corpses out 
in the desert at night, though I've never 
actually seen one.
`,LA=`77
Hey... Don't touch my drink or I'll bore a 
hole into your skull with my thumb.
`,AA=`54
I believe that the creature you refer to 
is one of the ancient Horadric 
mummies from the tombs that lie 
buried beneath the desert sands. It is 
unusual for one of his kind to be so far 
away from his resting place. I sense in 
this entity a restless and malevolent 
spirit.
`,CA=`62
The creature makes its lair in the 
tunnels beneath this city. He butchered 
my husband and son... I simply cannot 
bear to talk about it...
`,IA=`63
There are two entrances to the sewers, 
I believe. One of them is right near 
here, down by the water beneath the 
docks. I can see it from my ship, and 
you can bet I keep an eye on it every 
night.
`,TA=`53
Fara and I have been talking about the 
creature recently. From my studies, I 
have deduced that it is Radament the 
Fallen, an ancient Horadric mummy 
that has for some reason left his tomb 
to prey on mortals.
 
I'm doing some more research now. If 
you check back later, I may have some 
more insight as to his nature.
`,BA=`94
I hear that beast is after body parts. 
Does he eat them? Oooh... Ghastly!
`,HA=`48
The Horadrim used to mummify their 
highest mages, and infuse them with 
spells that would allow them to protect 
their tombs, even after death.
 
I have no idea why one of them would 
be acting so malevolently. Perhaps 
Drognan or Fara would know more 
about this.
`,DA=`90
Death is not afraid of the living, but the 
living abhor death.
`,GA=`55
I noticed a rotting, human arm floating 
in the harbor this morning. I suspected 
foul play, so I told Greiz. He didn't 
seem too concerned since there haven't 
been any folk reported missing lately.
`,EA=`83
I am starting to have second thoughts 
about my request... I couldn't bear the 
thought of you losing your life on my 
behalf.
 
Please be careful.
`,FA=`69
We've been meaning to send an 
organized group down there to kill that 
thing, but it would be dangerous. We 
just can't afford the chance of losing 
any men with all the trouble that's 
going on in the desert.
`,qA=`65
Ah-hah! Back for a small shot of 
courage... Believe me, it doesn't help 
for long.
 
Drinks, barkeep!
`,RA=`69
If you're going to fight that thing, use 
some common sense. Be knowledgeable 
about what harms the undead. Poison, 
for instance, will have little effect.
`,PA=`64
Huh? Peppermint? Oh, Radament! Yes, 
yes. Ooh, a foul creature...
 
Some of my exploding potions should do 
quite nicely against him. They usually 
work well against the undead.
`,NA=`49
I've just been reading something 
interesting about this sort of undead. 
Apparently, certain Horadric funereal 
priests altered the bodies of their dead 
mages with magical and surgical 
techniques -- often replacing body 
parts with those of animals.
 
This was thought to augment their 
powers, and raise their status in the 
afterlife.
`,OA=`68
Drognan told me something interesting 
earlier today. It might explain why 
Radament is so restless, and it might 
have something to do with why he is 
stealing human body parts.
`,zA=`41
The Horadric mummies were created to 
protect the tombs, but Radament is far 
from his burial chamber. Given the 
aberrations that have been witnessed 
lately, it comes as no surprise that 
even the ancient guardian spells have 
begun to unravel. Be wary of this as 
you venture farther into the desert.
`,_A=`76
You've killed Radament, eh? That's quite 
a nice piece of work! If you ever need a 
job as a mercenary, I'd be happy to 
sign ya' up.
`,WA=`52
From what you tell me, it would seem 
that Radament was bent on the task of 
reviving his own mummified corpse 
with the flesh of the living.
 
This is very unusual indeed. It takes an 
incredible magic power to alter the 
singular purpose of an undead mind.
 
Perhaps there is a power at work here 
which is beyond my ken.
`,VA=`61
Uh... Little of what I am able to hear is 
of any value. Radament's death, 
however, is news worth hearing. I'm 
sure Atma will be glad to hear of this.
`,QA=`62
Good job mate! At night out on my ship, 
I was often awakened by that fiend's 
awful moaning. I bet I rest easier now.
`,UA=`41
Whoah oh... 'Radament the Fallen', is it?
 
I've fallen off many a barstool and no 
one calls me 'Geglash the Fallen'. They 
might go so far as to say, 'Geglash, 
you've fallen!'
`,KA=`70
We ran into one of those old tomb 
guardians when I ran with my bandits. 
I know they aren't easy foes to face, so 
you sure have my respect. Have you 
told Atma yet?
`,JA=`142
Atma's been telling everyone what 
you've done for her.
`,$A=`102
As you have helped Atma and all of us, 
so shall I help you.
`,jA=`57
If you haven't already, tell Atma that 
Radament is dead. It may help to ease 
the weight of her mourning.
`,YA=`50
They say that the taste of vengeance is 
bittersweet, but I find it to my liking. 
 
In addition to my undying gratitude, I 
have spoken on your behalf with the 
rest of the townspeople. The 
merchants have agreed to show their 
gratitude by offering their wares and 
services at lower rates.
 
Oh... Jerhyn wants to see you, too. 
You'll find him in front of the palace.
`,ZA=`37
Ahh... The lost Horadric Scroll! What a 
fortunate turn of events...
 
As the last living Horadrim, I alone have 
knowledge of its meaning. Now, to read 
the Horadric runes it bears. Hmmm...
 
The Horadric Mages, after binding Baal 
within Tal Rasha, magically sealed off 
his Burial Chamber from the mortal 
realm. Those same Mages also crafted 
fearsome Horadric Staves and imbued 
them with the special power to open 
the Chamber's hidden door.
 
After nearly losing one to the thievery 
of a rogue sorcerer, they divided all 
the Horadric Staves into two parts - 
wooden shaft and metal headpiece - 
hiding them separately to safeguard 
them.
 
The Horadrim foresaw our current 
plight and designed the hiding places 
to reveal themselves to worthy heroes 
like you.
 
Collect both parts of a Horadric Staff 
and unite them using a Horadric Cube. 
Then, you may enter Tal Rasha's Burial 
Chamber.
`,XA=`50
The Viper Amulet you bear is actually 
the headpiece of a Horadric Staff!
 
Yes... You have an uncanny knack for 
finding rare and valuable artifacts. Of 
course, you'll have to use a Horadric 
Cube to combine the headpiece with the 
shaft.
`,eC=`56
The Staff of Kings! You astound me, my 
friend. You have discovered the shaft 
portion of a Horadric Staff.
 
I trust you know how to use a Horadric 
Cube to unite the shaft with its 
headpiece.
`,aC=`40
You have quite a treasure there in that 
Horadric Cube. According to Horadric 
lore, the Cube can restore a Horadric 
Staff.
 
To do it - use the Cube as you would a 
scroll. When the Cube opens, place 
both pieces of the Staff into it and use 
the Cube's transmute power.
 
You'll be pleased to know that the Cube 
has other alchemical uses as well...
 
Six gems plus one sword transmute into 
a socketed long sword.
 
You may also transmute two quivers of 
crossbow bolts into one quiver of 
arrows, while two quivers of arrows 
yield one quiver of bolts.
 
I must leave it to you to discover other 
formulae.
`,tC=`46
Excellent! You have a Horadric Staff.
 
Carry it with you into Tal Rasha's Tomb. 
Find within the Tomb the chamber 
whose floor is inset with the Circle of 
Seven Symbols.
 
Place the Staff into the receptacle you 
find there. That will open the secret 
passage into Tal Rasha's Burial 
Chamber.
 
But, be prepared for a fight - you'll 
likely have to kill Tal Rasha to destroy 
Baal.
`,nC=`110
My astrologers failed to predict this 
eclipse. You should seek Drognan's 
advice.
`,sC=`71
This midday darkness reeks of foul 
magic! My men and I are trying to keep 
the peace, but this kind of thing really 
scares people.
`,lC=`65
Two men arrived late last night bearing 
a story about evil magic. They said 
they saw a gathering of giant snake 
creatures performing some arcane 
ritual. They sound like the Serpent Men 
of the desert.
`,iC=`72
The sun has grown disgusted with the 
terrible deeds it must shine upon each 
day. Damnation is upon us all.
`,oC=`121
Drognan, the wizard, will have some 
idea as to what is happening.
`,rC=`100
This whole place is one big ale fog.
`,cC=`70
This unnatural nightfall is no doubt 
caused by evil sorcery. Drognan might 
know what we are dealing with.
`,dC=`65
Claw Vipers! This outer darkness 
mirrors the inner blackness of their 
souls. It is they who have eclipsed the 
sun, I'll wager. They are a venomous 
band.
`,uC=`77
I've been researching this lengthy 
eclipse and I believe it to be the work 
of Claw Vipers.
 
Find their temple beneath the desert 
sands and you may find the source of 
this curse.
`,hC=`76
This permanent darkness is very 
unsettling. Hmmm... It would make 
navigation by stars easier for me, 
though.
`,mC=`62
Drognan may have some advice on this 
matter. Hmm... I think I'll speak with 
him myself.
`,gC=`130
This eclipse is a definite manifestation 
of evil.
`,fC=`73
Don't worry! My men and I have an iron 
grip on this town. If those cursed Claw 
Vipers are plotting anything against 
us, we'll be prepared for 'em.
`,vC=`73
The calculated coldness of the reptilian 
brain makes the Claw Vipers uncanny 
adversaries.
`,pC=`49
It's strange when the morning after the 
night before... is still the same night.
`,yC=`105
I've had about enough of this darkness. 
I don't even know what day it is 
anymore.
`,kC=`77
The Claw Vipers practice evil magic. 
They have also been known to kidnap 
travelers and sacrifice them to their 
dark gods.
`,bC=`82
Well... I don't know much about the 
habits of Claw Vipers, to be honest. 
Drognan will probably know something 
about the nature of the magic at work.
`,wC=`51
I've discovered a reference to a similar 
eclipse several hundred years ago. It 
says that some desert-dwelling snake 
demons had erected an evil altar, 
which caused the sun to go black.
 
Perhaps we are dealing with something 
similar here. Look for an altar in the 
Claw Viper temple.
`,MC=`94
I usually charge for rooms by the night.
 
But I may have to soon change that.
`,xC=`57
The source of this spell is probably a 
magical altar. It will not be enough to 
kill the Claw Vipers. To reverse the 
spell you must destroy the altar.
`,SC=`80
I was going to go to bed, but then I 
realized that I have no idea what time 
it is. It could be the crack of dawn, for 
all I know.
`,LC=`96
The sun again shines on Lut Gholein! I'm 
beginning to like you, traveler.
`,AC=`219
I'm glad that's over with!
`,CC=`74
Ahh... It takes but one eye to revel in 
the beauty of our restored sun.
`,IC=`60
So, this is daylight... It's over-rated.
`,TC=`80
With renewed daylight, one may gather 
the wits that were scattered about like 
restrictive undergarments in the 
darkness.
`,BC=`130
So... Did you plunder any booty?
`,HC=`132
You have done well to restore light to 
our world.
`,DC=`87
Drognan seems to have taken you into 
his confidence. This is good, for you 
will benefit from his wisdom.
`,GC=`69
Ahhh... Claw Vipers are fond of magical 
artifacts. Did you happen to find one in 
their temple?
`,EC=`69
You did well in destroying the Claw 
Vipers. We are all glad to see the sun 
returned to its former glory.
`,FC=`48
I've been speaking with Lord Jerhyn, and 
I sense that he is becoming more and 
more agitated by something. You 
should try to talk to him again.
 
If he still won't take you into his 
confidence, seek to prove yourself a bit 
more. I gather that his respect for you 
is growing.
`,qC=`41
I've been researching the old records, 
trying to find the location of Tal 
Rasha's Tomb. Though I haven't found 
the Tomb, itself, I may have a good 
lead for you.
 
The great Vizjerei Summoner, Horazon, 
built his Arcane Sanctuary somewhere 
around here. He was a powerful 
spellcaster and kept demons as slaves 
within the Sanctuary. He kept a close 
eye on great events, too -- such as the 
imprisonment of Baal within Tal 
Rasha's Tomb.
 
If you could find Horazon's Sanctuary, 
I'm sure that it would hold some clue 
as to the Tomb's location. Though I 
doubt Horazon is still alive, you must 
proceed with caution. There's no telling 
what could be waiting inside.
 
When I spoke of this with Lord Jerhyn, 
he asked that I send you to him. 
Perhaps he knows of a secret entrance 
or the like.
`,RC=`46
Ah, the ancient mage Horazon! He 
believed that he could bend Evil forces 
to his will. What he didn't know was 
that Evil uses man, not the reverse.
 
The Vizjerei still revere him as a symbol 
of man's ability to triumph over other 
worldly forces. The Church of Light, 
however, cites him as an example of 
man's folly.
`,PC=`89
The only thing in Jerhyn's cellar are the 
harem girls that have been hiding there 
since the troubles began.
`,NC=`62
An 'Arcane Sanctuary' under the 
palace? I'd heard that there were some 
underground cellar levels that Jerhyn 
used as chambers for his treasure and 
such, but no Arcane Sanctuary.
`,OC=`44
When the troubles began here, I allowed 
the terrified Harem guilds to join me 
within the safety of the palace. All was 
fine, until one night...
 
Screams echoed up the stairwells from 
the harem. My guards arrived to find 
the poor girls being slaughtered by a 
merciless band of hell-spawned 
demons. My brave guardsmen tried to 
push the demons back into the 
mysterious rift from which they came.
 
Ever since, my men have fought a losing 
battle. Demons have continued to pour 
through the rift into the palace. 
Ultimately, I hired Greiz and his 
mercenaries to help protect the rest of 
my fair city.
 
Drognan believes that the Arcane 
Sanctuary lies buried underneath this 
palace, since Lut Gholein occupies the 
site of an ancient Vizjerei fortress.
 
My palace is open to you now... Take 
care.
`,zC=`45
I very much doubt that Horazon still 
lives in his Sanctuary. He possessed 
great power and influence over 
demons, but even that may not have 
been enough in the end. One of his 
notoriety cannot easily remove himself 
from the vengeful reach of Hell.
`,_C=`60
Look, look... I'm just about as tough and 
arrogant as they come, but you'd never 
catch me trying to tame a demon for a 
pet. That's just asking for a lot of 
trouble.
`,WC=`75
Arcane Sanctuary? That place sounds 
awful! Even if you find a way into it, 
what makes you think you'll be able to 
leave again?
`,VC=`73
A careful caravan gives wide berth to 
sleeping bandits. If Horazon is gone, 
let him remain so.
`,QC=`49
Horazon found it necessary to lock 
himself up for all time, just to protect 
himself from those angry demons. 
Such is the fate of one who practices 
the summoning arts... that, or eternal 
damnation. There's old summoners and 
bold summoners, but no old, bold 
summoners.
`,UC=`42
Nearly a thousand years ago, Horazon 
rose to the fore of the Vizjerei mage 
clan. Horazon used the knowledge of 
the Vizjerei to summon and control 
demons from Hell.
 
Though a powerful Summoner, Horazon 
feared that the Lords of Hell would 
punish him for enslaving their 
brethren. Thus, the Summoner created 
for himself an Arcane Sanctuary.
 
He believed that his Sanctuary would 
not only protect him from Hell's 
vengeance, but also allow him to 
continue his studies free from the 
ravages of time and disease.
 
Horazon had crafted many wondrous 
scrying devices through which he 
observed the events of the world 
outside. It is certain that he took 
careful study of Tal Rasha's 
imprisonment and recorded the 
location of his forgotten Tomb.
 
The Arcane Sanctuary was believed to 
have been constructed here in Lut 
Gholein. An entrance may be hidden 
somewhere in the palace, as that 
building is very old, and was once a 
Vizjerei fortress.
`,KC=`57
Ahh... The legend of Horazon is an old 
one, especially around these parts. You 
wouldn't believe the feats and strange 
events that are attributed to him.
`,JC=`63
I understand that you've been talking to 
Jerhyn. Well, if so, then you're the first 
in a long while... since the trouble 
began, actually.
 
Do us a favor and try to find out what's 
got Jerhyn so edgy all the time. OK?
`,$C=`48
There was an eastern mage... a Vizjerei, 
I believe... who visited me almost a 
year ago. He was very interested in the 
history of this site, and he seemed 
particularly fascinated with the palace 
architecture.
 
I gave him a tour. When he found the 
ancient seals over a passageway in the 
cellar, he became very agitated. He 
asked for some time alone to study 
them, and I granted it.
 
Shortly after, he left with no further 
word and I never saw him again. Odd... 
Don't you think?
`,jC=`61
What's got you so occupied in the 
palace? Don't tell me you're finding the 
Harems more compelling than killing 
demons? That would be out of 
character for one such as yourself.
`,YC=`63
I am certain that you will find the 
information you need when you find 
Horazon's Journal. I suggest you find it 
quickly, for Diablo may be getting 
closer to freeing his brother as we 
speak.
`,ZC=`68
Huh? The horizon is always out of 
reach, you should know that. Oh, 
Horazon! Oh, I see. Uh.
 
Yes. Well. He was insane. Brilliant, yes, 
but... total lunatic.
`,XC=`57
Even a sanctuary such as Horazon's 
can be breached by the tentacles of 
Evil. Such a haven could have become a 
chamber of unspeakable horrors. Be 
wary of what you may unleash!
`,e3=`49
All my years of brawling, of pummeling 
both the unsuspecting and the 
deserving, have yielded two insights. 
You can either fight or you can run. All 
other strategies are variations of 
these.
`,a3=`77
So... Now that you're such a pal of 
Jerhyn, why don't you ask him if I can 
set sail one of these days? I'm running 
out of patience.
`,t3=`87
So you've been in the palace, have you? 
Tell me, why does Jerhyn keep that 
place locked up so tight?
`,n3=`87
Fate is like a caged gorilla. It will pelt 
you with dung if you mock it.
`,s3=`51
I've been thinking about the problems in 
Jerhyn's palace. Perhaps this has 
occurred to you as well...
 
If those cellar passageways lead to the 
Arcane Sanctuary, then that is where 
the demons came from. Horazon's 
haven must have been breached!
`,l3=`37
Seekers of the Tomb of Tal Rasha will 
find it through the Portal. But know 
that the glowing glyphs recorded here 
in my Arcane Sanctuary are the signs 
of the six False Tombs.
 
The missing Seventh Sign marks the 
Tomb of Tal Rasha... Of the Horadrim 
he might be called the foremost.
 
It was a shining - but brief - moment for 
the Mage Clans when they set aside 
their differences and worked together 
against the common enemy.
 
The Horadrim relentlessly pursued the 
Three across the desolate Empires of 
the East, and even into the uncharted 
lands of the West, leaving the 
Archangel Tyrael's hands unblemished.
 
Presuming the Three to be vanquished, 
the Horadrim's unstable fellowship 
began to dissipate. Abandoning their 
sacred charge to safeguard the three 
Soulstones, the disparate Mage Clans 
began to squabble amongst each other 
over petty differences.
 
Their conflicts not only dissolved their 
brotherhood, but strengthened the 
Evils which they had buried beneath the 
cold earth.
`,i3=`59
Unbelievable! The Harem girls are dead! 
The palace guards have been fighting 
off demons from the cellar. How could 
that happen without my knowledge?
`,o3=`62
I thank you for your heroic aid! I'm also 
glad that you found something you 
were looking for. The journal should 
help you find the True Tomb of Tal 
Rasha. Hopefully, there is still time to 
get there before Diablo.
 
Go now. And good luck.
`,r3=`55
You have found Horazon's Journal. 
Excellent... But, I must caution you.
 
The mark of the True Tomb of Tal 
Rasha, is sought, if not already known, 
by Diablo. I needn't elaborate on the 
implications of that.
`,c3=`71
News of the tragedy in the palace is 
spreading fast. How awful! And to 
think, this whole time I thought Jerhyn 
and his guards were in there playing 
with the harem girls.
`,d3=`60
Hah! I wish Jerhyn would've let me in the 
palace. I would've saved those girls and 
kicked demon ass back to the fire-pits 
o' Hell!
`,u3=`52
So... Now we know Jerhyn's little secret. 
Well... I guess I can see why he wanted 
me to stay, though... I'm just glad it 
didn't come to that. Now he tells me to 
wait some more, in case you need to 
get out of here.
 
Well, for you I'll do it. Maybe they'll 
mention me in the epic ballads, eh?
`,h3=`67
Well, the news going around town is 
very unsettling. Apparently, we were in 
more danger than anyone thought.
 
Good work friend... you may have saved 
all our skins.
`,m3=`64
Faith is stronger than any armor. The 
shield will protect the body, but Faith 
will strengthen the courageous heart.
`,g3=`55
Horazon's urinal? Oh, journal! Yes, 
well... Glad you found it. Such a shame 
about those poor harem girls, huh? I 
shall miss them deeply... I mean their 
conversations, of course.
`,f3=`62
Oh, those poor women! Will the 
slaughter never end? Thank you once 
again for protecting our city.
`,v3=`57
You must move quickly now, friend, for 
Diablo is undoubtedly close to finding 
what he seeks. Find the Tomb of Tal 
Rasha before he frees the Lord of 
Destruction.
`,p3=`89
That guy really talks like that? Sounds 
like either Horazon has gone stir-crazy 
or that's some impostor.
`,y3=`57
The man you describe is probably not 
Horazon.
 
He sounds like the very mage who came 
around here a while ago. He was very 
curious about this palace and seemed 
especially interested in the seal on the 
passageway in the cellar. He left 
shortly after that. I wonder how he got 
down there? The seal was never 
broken...
 
That mage spoke a great deal to 
Drognan. Why don't you ask him about 
it?
`,k3=`47
Yes... The man you speak of sounds like 
the mage who came here many months 
ago. He claimed to have fought Diablo 
in the passages beneath Tristram.
 
No doubt the fool wandered into 
Horazon's Sanctuary and lost whatever 
was left of his ravaged mind. He is 
beyond salvation. 
 
It is possible that the fool has been 
possessed by the spirit of Horazon. If 
that's true, then you'd better put an 
end to his tortured existence.
 
Once done, I believe the demons who 
were summoned and imprisoned within 
the Sanctuary will cease to exist as 
well.
`,b3=`57
Ah, yes. I remember. There was a... 
fellow around here many months ago 
who asked almost as many questions 
about Horazon as you.
 
So... He discovered enough to assume 
Horazon's place in the Arcane 
Sanctuary, huh? What a fool!
`,w3=`72
Ah, yes. As a ship captain I am well 
aware of the phenomenon of a false 
Horazon.
 
Sorry, just a little joke.
`,M3=`99
There's nothing more dreadful than a 
powerful being driven by a frayed 
mind.
`,x3=`105
You always seem to find the worst 
trouble. I don't know how you handle it.
`,S3=`38
So! Horazon's crazy, eh? I'd be 
surprised if he wasn't. All those 
centuries without ale would drive 
anyone to drink... but then you couldn't 
drink. And that would drive you to 
drink... Hah?... What was the question?
`,L3=`63
Hmmm... That doesn't sound like 
Horazon. I'll agree that he may have 
gone mad, but from what you tell me, I 
don't think that's the case. Talk to 
Drognan... he may know more than I.
`,A3=`106
Ugh... Crazy mages give me the creeps.
 
Just kill him and get on with your 
business.
`,C3=`45
The appearance of the mage you 
describe sounds like one I met back in 
Tristram. Many Vizjerei came to fight 
against Diablo, the Lord of Terror. 
Perhaps, this is one of them.
 
You know, fate seems to have frowned 
upon all of the heroes who confronted 
that terrible Evil. Take care or the 
same may happen to you.
`,I3=`76
So, Horazon's been dead for some time. 
I take it you at least found what you 
were looking for.
`,T3=`60
The way I see it... Well, it's all pretty 
blurry.
`,B3=`63
The demonic force that was emanating 
from the corrupted Sanctuary has 
dissipated. I thank you greatly for your 
help. Now, we can look to rebuilding 
our lives.
 
All will be for nothing, though, if you do 
not stop the greater Evil which is 
rapidly gaining ground.
`,H3=`83
Larger forces are moving inexorably 
towards us. You must now make haste 
to the Tombs.
`,D3=`65
You make me long for the days of glory. 
When I had both hands, both eyes and 
more of a foot...
`,G3=`84
I guess you'll be heading to the Tombs 
now? I hear that they're in the deepest 
desert regions.
`,E3=`100
Well! You've got what you're after. Now 
get a move on before it's too late.
`,F3=`103
Huhhh... Such is always the fate of 
those who meddle with evil.
`,q3=`89
You're more the hero than I could have 
dreamed. Perhaps, there is hope for us 
after all.
`,R3=`74
I feel no pity for that would-be 
Summoner. His terrible ambition for 
demonic power was his undoing. You 
merely hastened the inevitable.
`,P3=`48
I hope that this false Summoner found 
peace in death. Unfortunately, it is 
more likely that he will be dragged 
down into Hell by the demons he was 
bound to.
 
Let this be a lesson to you... Demonic 
magic is a quick path, but its powers 
are seductive and deadly.
`,N3=`45
I have heard of your many deeds of skill 
and bravery. I feel I can trust you with 
something I have been hesitant to 
speak of...
 
Drognan and I have concluded that the 
Dark Wanderer who passed through 
here recently was Diablo, himself! 
Drognan believes that Diablo is 
searching the desert for the secret 
tomb where the great Horadric mage, 
Tal Rasha, keeps Baal imprisoned.
 
You must find Diablo and put an end to 
the terrible evil that has fallen upon 
our city. Drognan is wise and is sure to 
have some helpful advice for you as to 
how Tal Rasha's tomb may be found.
 
It may take you quite some time to find 
The Tomb. May you be ready when you 
do.
`,O3=`53
It is well-known that there are seven 
great Horadric tombs hidden beneath 
the sands in the furthest reaches of 
the desert. One of them surely must be 
Tal Rasha's prison. You must explore 
each of the tombs to find Tal Rasha's 
exact location.
 
Of course, Diablo is searching for the 
Tomb as well... No one can guess as to 
what terrors he has unleashed in his 
search.
`,z3=`59
So... You're going to search for the 
Seven Tombs, huh? Don't you know 
that they're just desert legends passed 
between merchants and travelers? No 
one really believes that they exist.
`,_3=`61
Be very careful, my friend. I think I've 
seen enough recently not to doubt that 
these Tombs exist. And if they do, 
they're most certainly guarded by 
terrible creatures.
`,W3=`67
I've heard legends of the Tomb of Tal 
Rasha, but I thought they were just old 
tales meant to scare young children.
`,V3=`59
Ohh... I'd go with ya' to those tombs... 
But... umm... I don't like all that living 
dead stuff.
`,Q3=`84
I'm sorry, I can't help you much here. 
Now, if the tombs were across the 
ocean, then I'd be the guy to talk to.
`,U3=`57
Legend has it that Tal Rasha lies 
imprisoned within his tomb, forever 
struggling to keep the Lord of 
Destruction bound. His was a selfless 
act, although perhaps foolhardy.
`,K3=`56
When Tal Rasha chose to embody the 
spirit of Baal, he knew his doom was to 
wrestle eternally against the will of the 
greater Evil. Look around you and ask 
yourself, 'Has the battle been won or 
lost?'
`,J3=`55
Tal Rasha's tomb is hidden deep in the 
desert among six others. Tal Rasha's 
symbol marks the True Tomb. If you 
want to know what that symbol is, you 
should be able to find it within the 
legendary Arcane Sanctuary.
`,$3=`57
Diablo nears his goal. We have little 
time to lose.
 
Remember, my friend, that Andariel 
gave herself willingly to Diablo's cause. 
It would be prudent to assume that the 
other Evils will attempt to aid their 
master as well.
`,j3=`106
If you're going into the deep desert, why 
not hire a few of my men to watch your 
back?
`,Y3=`47
You have done very well. Few could have 
come this far, let alone discover the 
True Tomb of Tal Rasha. Unfortunately, 
I hear that Diablo and Baal have eluded 
your grasp. This is most unfortunate...
 
If you wish to travel East, I have 
authorized Meshif to give you passage 
by sea. I imagine he should be very 
anxious to leave by now.
 
Good luck on your quest, and thank you 
again for saving my beloved city. You 
will always be welcome in Lut Gholein, 
my friend.
`,Z3=`71
I heard that Diablo has managed to 
best you, at least for the time being. I 
hope you catch up with him soon, and 
send him back to Hell for good!
`,X3=`70
I'm sorry things didn't turn out as you 
had hoped. Go and remember us 
fondly. You know, you bothered me far 
less than most.
`,eI=`64
You have proven to be the greatest of 
heroes, and I am honored to call you 
friend. Thank you for bringing peace to 
our lives again.
`,aI=`68
Never fear, my friend. You did the best 
you could.
 
I suspect that Diablo and Baal are now 
heading east, towards Kurast. You'll 
find them... I know you will.
`,tI=`46
This is terrible news! Baal is in 
possession of one of mankind's most 
powerful mages, and the Lord of Terror 
guides his path. They must be stopped, 
for I am sure they mean to free their 
elder brother Mephisto, the Lord of 
Hatred, who lies imprisoned under the 
corrupted city of Kurast.
 
I fear you are walking into a great evil, 
but your faith can save you. May you 
walk in the light always.
`,nI=`54
You're an inspiration! And such a hero 
that it makes me look twice as bad...
 
Ahh, you're OK... Hey! Just save some 
glory for us little guys, huh?
`,sI=`51
This is a serious setback... It is most 
unfortunate that Tal Rasha has been 
consumed by Baal's destructive 
influence. There are many secrets 
known to the Horadrim, which could be 
used by Baal against us.
 
You must travel east by sea to Kurast 
and stop Diablo and Baal before they 
free their eldest brother, Mephisto.
 
Hahh... The lands of the eastern Empire 
are not the same as they used to be. 
There has been little word for some 
time.
 
Speed is of the essence. Go quickly, my 
friend. May the fates smile on you.
`,lI=`82
Jerhyn tells me I should take you east to 
Kurast. I haven't been there for several 
years, but rumor has it that things are 
pretty grim.
`,iI=`51
I've heard that your foe got away from 
you this time. Well, look at it this way... 
you've got the demons on the run. If 
you're going to be leaving, then... Well, 
thanks for your help.
`,oI=`39
The Archangel Tyrael was the one who 
gave the Soulstones to the Horadrim 
two hundred and sixty years ago.
 
It is highly unusual for the forces of 
Heaven to so directly interfere with 
man's destiny, but Tyrael was said to 
act of his own volition. We have never 
been able to discern why.
 
Perhaps, he goes against the consensus 
of Heaven because he doubts our 
ability to defend ourselves, or perhaps, 
he sees more threat than his peers.
 
Where the actions of Hell often seem 
straightforwardly bent on destruction, 
the motives of Heaven are 
unfathomable.
 
Now make haste... Both Diablo and Baal 
must be stopped before they join with 
their brother, Mephisto. If the three 
Prime Evils unite once again, the world 
as we know it will be no more.
`,rI=`48
Greetings, hero. I've heard of your 
exploits and... I'm quite impressed. 
Very few mortals are capable of 
dealing with the Three and their 
minions as you have.
 
My name is Natalya. I am a hunter of 
Evil, part of an ancient Order sworn to 
hunt down corrupted sorcerers.
 
If I could, I would gladly join your quest 
to stop the Three. But I must wait here 
for further news. I can't predict what 
will happen, but the danger is greater 
than we can know.
 
Until I receive my orders, I'll assist you 
with the information I have.
`,cI=`74
Asheara...? Oh, she's is a tough-talking 
mage, but I'd wager she's never faced 
true Evil.
 
Pampering drunken mercenaries is one 
thing, but standing face to face with a 
hell-spawned demon is another.
`,dI=`69
I've heard the name of Deckard Cain 
many times. He's the last of the 
Horadrim, and thus, I must honor him. 
You must be powerful, indeed, if one 
such as he accompanies you.
`,uI=`100
Hratli is a master craftsman. My Order 
could make use of one with his unique 
skills.
`,hI=`67
My Order has been keeping watch over 
Ormus for many years, now. He seems 
to champion the cause of good, but 
who knows what shadow lurks within 
his soul?
`,mI=`45
I've not set foot in glorious Kurast for 
many years. But I never would have 
imagined it could be so corrupted.
 
Certainly, this must be Mephisto's work! 
You'd best get going, my friend. Diablo 
and Baal are still out there and you 
must find them.
`,gI=`62
Seeing his homeland in such a state 
must be horrifying to Meshif. I'm 
surprised he's willing to remain here in 
order to help you.
`,fI=`82
Asheara seems like a very tough 
woman. I'd be careful around her if I 
were you.
`,vI=`53
Drognan told me of Hratli when we were 
in Lut Gholein. He said that he weaves 
magic into his forge and produces 
mystical weapons and armor.
 
His skills could be quite useful to you. 
`,pI=`44
Judging from his dress and strange 
markings, I would guess that Ormus is 
from the ancient Taan mage-clan. Yet 
none of the others here seem to know 
that he is a sorcerer.
 
The Taan were once as powerful as the 
Vizjerei clan, but their studies were 
even more secretive. I wonder what 
he's hiding.
`,yI=`49
Have you met, Natalya? She appears to 
be a member of the Khral-Harzhek, a 
secret order that has been around for 
centuries... almost as long as the 
Horadrim, itself.
 
Her presence here makes me uneasy, 
for they are traditionally sworn to hunt 
down Magi who have betrayed the trust 
of their order.
 
I wonder why she is here.
`,kI=`73
Ormus would like you to think him mad. 
Better to watch his actions than listen 
to his words.
`,bI=`33
Welcome to Kurast, traveler. Few come 
willingly to this ancient city anymore. I 
hope you brought your wits with you, 
for sanity is in short supply here.
 
My name is Hratli. I am a sorcerer 
skilled in metal work. It'd be a pleasure 
to help you... I don't have many 
customers these days.
 
As you can see, the populace has been 
brutally decimated by the forces of 
Mephisto. The canals run red with 
blood and demons roam the land.
 
The wretched jungle-hell has already 
reclaimed much of Kurast. The only 
safety you'll find is here at the 
dockside, where a magical warding 
holds the jungle evils at bay... but I 
don't know how long it will last.
 
To make matters worse, the Children of 
Zakarum are in league with the forces 
of Mephisto. The Zakarum have 
concentrated their power in the Temple 
City of Travincal, located within Kurast 
deep in the jungle wilderness.
 
It's true... Their zeal is unmatched. But I 
say the so-called 'Warriors of Light' are 
nothing more than the twisted puppets 
of a hidden hand.
`,wI=`33
Welcome to Kurast, young Sorceress. 
Few come willingly to this ancient city 
anymore. I hope you brought your wits 
with you, for sanity is in short supply 
here.
 
My name is Hratli. I am a sorcerer 
skilled in metal work. It'd be a pleasure 
to help you... I don't have many 
customers these days.
 
Though my own magic is only useful for 
making enchanted weapons, I'll bet 
yours will put an end to this terrible 
evil once and for all. May the spirits of 
Skatsim watch over and protect you.
 
As you can see, the populace has been 
brutally decimated by the forces of 
Mephisto. The canals run red with 
blood and demons roam the land.
 
The wretched jungle-hell has already 
reclaimed much of Kurast. The only 
safety you'll find is here at the 
dockside, where a magical warding 
holds the jungle evils at bay... but I 
don't know how long it will last.
 
To make matters worse, the Children of 
Zakarum are in league with the forces 
of Mephisto. The Zakarum have 
concentrated their power in the Temple 
City of Travincal, located within Kurast 
deep in the jungle wilderness.
 
It's true... Their zeal is unmatched. But I 
say the so-called 'Warriors of Light' are 
nothing more than the twisted puppets 
of a hidden hand.
`,MI=`48
You're very brave to have come here. In 
the old days, mages who didn't belong 
to one of the great Mage Clans were 
hunted down as renegades. But now, 
the Mage Clans have little authority.
`,xI=`53
Within the Temple City stands a tower 
built long ago by the Horadrim to 
imprison the... Well, you'll discover 
more about it soon enough.
`,SI=`60
If you are another follower of Zakarum, 
I've told you people before I don't want 
your Towering Spire or anything else 
you have to sell!
`,LI=`74
Some find my prices unreasonable. That 
is because I am unreasonable.
`,AI=`76
You'll find that the Zakarumites have 
the persistence of zombies, but without 
the charisma.
`,CI=`60
Asheara leads the mercenary company 
known as the Iron Wolves. You can hire 
some of them, but many are occupied 
securing the dockside.
`,II=`74
Alkor is a potion dealer given over to a 
life steeped in ceaseless study and 
dissipation.
`,TI=`58
Ormus is a man of many mysteries. I 
sense strong magic about him, but he's 
never spoken of it to me.
`,BI=`49
I trust you already know Meshif. But did 
you know that he was born and raised 
here?
 
I suspect that like many of us his spirit 
is near broken at the sight of Kurast's 
decline. Only our brand of gallows 
humor saves us from utter despair.
`,HI=`55
This, Cain, whom you brought with you. 
He has the bearing of great power, yet 
I sense no magic about him. He is an 
enigma to me.
`,DI=`49
Natalya is a quiet one. She arrived here 
about a week ago and has pretty much 
kept to herself. She's inquired about 
my weapons a few times, so I assume 
that she's a warrior of some sort.
`,GI=`51
Well, I gave you my word, and brought 
you here as promised.
 
But by all that's still holy, I wish I'd 
never returned to this accursed place. 
This fetid jungle can't be the fair 
Kurast I left behind.
 
I don't know what all this evil is, my 
friend, but it's obvious that you must 
stop it. I only pray that you can before 
the jungle consumes the last vestiges 
of my beloved homeland.
`,EI=`47
Being a Barbarian, I'm sure you've seen 
many strange sights in the northlands.
 
But by all that's still holy, I wish I'd 
never returned to this accursed place. 
This fetid jungle can't be the fair 
Kurast I left behind!
 
I don't know what all this evil is, my 
friend, but it's obvious that you must 
stop it. I only pray that you can before 
the jungle consumes the last vestiges 
of my beloved homeland.
 
If this evil isn't contained, it could 
spread north to your homeland, too. 
Then the whole world would fall under 
the shadow of the Three.
`,FI=`63
It takes great courage and generosity 
to defend a land and a people that are 
not your own. Perhaps, when this curse 
is lifted, my people can do something 
for yours in return.
`,qI=`72
I shouldn't have boasted so much about 
Kurast on the journey here. Oh... Much 
has changed since I left.
`,RI=`99
The dockside is apparently the only 
civilized area left in Kurast.
`,PI=`88
If you are planning to carry on your 
wild ways here, you may need the 
assistance of Asheara's Iron Wolf 
mercenaries.
`,NI=`75
Your companion, Cain, must have 
known that he would be in grave 
danger here. You are great, indeed, to 
elicit such loyalty.
`,OI=`81
Hratli seems to be the only one left here 
with any common sense. Yet how 
sensible is it to remain here?
`,zI=`80
I went to speak with old Alkor, but I 
disturbed his studies. He doesn't seem 
to like visitors.
`,_I=`73
Trying to get information out of Ormus 
is like straining water from a rock. His 
damned riddles are almost as 
confusing as our current state of 
affairs.
`,WI=`75
That woman, Natalya, seems to be 
waiting for something important to 
happen. She's a strange one, I think.
`,VI=`68
All through my childhood, Kurast was a 
paradise. The once perfumed air now 
reeks of putrefaction.
`,QI=`54
Hello, there. You must be a great 
adventurer to risk coming here.
 
My name's Asheara, and I lead the 
mercenary band of mages known as 
the Iron Wolves. We've been hunting 
down demons in the jungle for months, 
but no matter how many of them we 
kill, they just keep comin'. Seems this 
whole place has been overrun by evil.
 
Rumor has it that you've come here to 
help. If that's true, then I'll let you hire 
some of my mercenaries.
 
But be careful... If you piss them off, 
they can be worse than those monsters 
out in the jungle.
`,UI=`50
Hello, there. You must be an Amazon. 
I've heard about your people... nomadic 
warriors without peer.
 
My name's Asheara, and I lead the 
mercenary band of mages known as 
the Iron Wolves. We've been hunting 
down demons in the jungle for months, 
but no matter how many of them we 
kill, they just keep comin'. Seems this 
whole place has been overrun by evil.
 
Rumor has it that you've come here to 
help. If that's true, then I'll let you hire 
some of my mercenaries.
 
But be careful... If you piss them off, 
they can be worse than those monsters 
out in the jungle.
`,KI=`66
Your skills are unique indeed. They are 
neither sorcery, nor physical, but seem 
to be a harmonious blend of the two. 
The Iron Wolves could learn much from 
your kind.
`,JI=`160
Why fight fair, when you can hire some 
of us?
`,$I=`107
No one comes to Kurast anymore 
without good reason.  You must be 
seeking fame and fortune.
`,jI=`137
The Iron Wolves and I have made a 
good living around here lately.
`,YI=`110
The jungle can take you down fast. Try 
to avoid getting trapped out there if 
you can.
`,ZI=`90
Hratli may be a bit too clever for his 
own good. Still, I'd trust his work 
anytime.
`,XI=`77
Hratli thinks he's so funny. The other 
day he said, 'Asheara, I don't recognize 
you without that big gash on your 
face.'
`,eT=`97
Meshif says he used to live here. I'm 
surprised he came back. I'll bet he 
wishes he hadn't.
`,aT=`78
I invited Natalya to join the Iron Wolves 
and she began lecturing me about the 
'dangers of magic'. Who the hell does 
she think she is, anyway?
`,tT=`61
Damn it, I wish you people would just 
leave me alone! I...
 
Oh, you're new here, aren't you?
 
I am Alkor, the Alchemist. I dabble in 
potions and salves, and I can sell you 
some if you really need them.
 
But don't make a habit of coming here. I 
don't like to be disturbed while I'm 
studying!
`,nT=`48
Damn it, I wish you people would just 
leave me alone! I...
 
Oh, you're a Necromancer, aren't you? 
I've heard that your kind use powerful 
potions and such to wake the dead and 
control spirits. I'd love to discuss what 
components you use some time.
 
I am Alkor, the Alchemist. I dabble in 
potions and salves, myself, and I can 
sell you some if you really need them.
 
...Feel free to drop by anytime.
`,sT=`55
Even I can tell that the evil in the jungle 
is growing. I hope you survive out 
there, my pasty friend. I'd still like to 
discuss what components are best 
used in necromantic potions.
`,lT=`151
Care to take a gander at my Grimoire?
`,iT=`90
I've never claimed that you'd live forever 
after trying one of my potions! Merely 
that you might look as though you had.
`,oT=`105
I keep a library of tomes - heretical, 
exegetical, hermeneutical and 
pharmaceutical.
`,rT=`50
There was a very fat man here recently 
asking after the Golden Bird of Ku 
Y'Leh. Have you heard of it? He kept 
muttering about ashes. I would imagine 
one Golden Bird's ash-hole to be about 
the same as another, wouldn't you?
`,cT=`150
I hope you don't object to my badgering 
the witless.
`,dT=`115
You came here with Meshif? That old 
'tour-guide to the stupid'!
 
I'm surprised you made it here in one 
piece.
`,uT=`98
Oh, Asheara's a good customer. She 
buys a potion of manliness from me 
every week.
`,hT=`82
Hratli's only good for making his silly 
magic weapons. It's not like he's got 
the stones to actually go out and use 
them on anything.
`,mT=`88
Oh, Ormus has been talking in riddles 
for years. I think he does it to cover up 
the fact that he's got nothing 
intelligent to say.
`,gT=`52
Yes, Natalya is a cute girl. However, I 
think she could use a special potion.
 
Let me see here, 'Radiant Beauty'... No. 
'Ray of Sunshine'... No, that's not it.
 
Ah, here it is: 'Relax Frosty Bitch'. This 
should help her out.
`,fT=`38
You now speak to Ormus.
 
He was once a great mage, but now 
lives like a rat in a sinking vessel. You 
have questions for Ormus and doubt in 
yourself. Ormus sees a strange 
dichotomy in you... as he does in all 
would-be heroes.
 
Speak to him and he may grant you 
wisdom in turn. Or turn from him and 
seek wisdom in thyself.
`,vT=`37
You now speak to Ormus, good Paladin.
 
He was once a great mage, but now 
lives like a rat in a sinking vessel. You 
have questions for Ormus and doubt in 
yourself. Ormus sees a strange 
dichotomy in you... as he does in all 
would-be heroes.
 
Speak to him and he may grant you 
wisdom in turn. Or turn from him and 
seek wisdom in thyself.
`,pT=`68
The Church which you serve is 
corrupted by evil. Yet the holy 
disciplines it taught you may yet save 
us all.
 
This is a strange time for heroes, 
Ormus thinks.
`,yT=`65
Your salvation can only be reached 
through Hatred. A strange fate, but a 
true one.
`,kT=`52
How does one destroy Destruction? How 
does one force Terror to flee in fear? 
You have great tasks ahead of you, 
Ormus thinks.
`,bT=`72
The Church of Light harbors the darkest 
shadow of all. Tread lightly.
`,wT=`89
When speaking of the dead, it is best to 
remain cryptic.
`,MT=`84
The Travincal can be breached by the 
loss of one's wits, not by the use of 
them.
`,xT=`95
Alkor is able to explain things much 
more clearly than Ormus.
`,ST=`58
For one who spends so much time away 
from home, Meshif has taken Kurast's 
corruption the hardest.
`,LT=`91
Asheara is both proud and 
self-conscious of her womanhood.
`,AT=`65
Deckard Cain... Ormus has no time for 
the last son of the Horadrim. Pride led 
that holy Order to failure.
`,CT=`63
Hratli suspects that Ormus is a mage. 
He can suspect whatever he wants, 
Ormus will not show him the true 
magic.
`,IT=`53
Back in Lut Gholein Meshif told me he 
had a fondness for jade figurines. On 
his trading voyages he collected an odd 
assortment of such small statues.
 
I would show him your figurine. 
`,TT=`160
Only Deckard Cain can make sense of 
this.
`,BT=`73
Praise you! That jade figurine will 
complete the set I was collecting.
 
Here! I've had this statuette of a golden 
bird for years, but I consider it a fair 
exchange.
`,HT=`89
I'm having fun just watching you run 
from place to place searching for a 
Golden Bird. Some hero you are.
`,DT=`47
I've read legends about a sage named 
Ku Y'leh, who studied the mysteries of 
life beyond death.
 
If I remember correctly, his ashes were 
ensconced within a golden statuette. It 
was a very strange tale.
`,GT=`134
You will have to take Ku Y'leh's ashes to 
Alkor.
`,ET=`96
Such a beautiful statuette... But, you'd 
think it would've been better cared for. 
There's a compartment here that's full 
o' dust.
`,FT=`73
Ah, the Golden Bird of Ku Y'leh.  Thank 
you, my friend. 
 
Busy yourself while I experiment with 
the ashes within it. Then, return and 
see what I have made for you.
`,qT=`51
Ku Y'leh, in searching for immortal 
youth, found only an early death. His 
apprentices, seeking to live forever, 
burned his body in order to derive 
benefit from his ashes.
`,RT=`50
Ku Y'leh was a powerful sage who was 
rumored to have brewed a potion of 
immortality. In an ironic twist of fate, 
he was murdered before his potent 
elixir could take effect.
`,PT=`78
Don't tell me you believe in all of that 
'life after death' nonsense. You should 
be more concerned with avoiding death 
than making plans for after it finds 
you.
`,NT=`120
From the ashes of Ku Y'leh I have mixed 
for you a potion.
`,OT=`94
Immortality is definitely not for me.
 
Can you imagine having to wake up 
every night just to piss for the next 
thousand years?
`,zT=`63
So, Meshif had the Golden Bird all 
along. I wonder if he knows what he 
gave up for that jade figurine.
`,_T=`54
Ormus remembers the tale of Ku Y'leh. 
That venerable sage forgot that there 
is no life beyond death. There is only 
life.
 
Once prolonged unnaturally, it can 
become a living hell.
`,WT=`67
I must admit, your foolish quest made 
little sense to me. But now I see the 
value of your actions. I believe you do 
possess great wisdom.
`,VT=`33
Never forget that your ultimate purpose 
here in Kurast is to destroy Mephisto. 
The ancient Horadrim imprisoned the 
Lord of Hatred inside the Guardian 
Tower that is located within the Temple 
City of Travincal.
 
Know this, friend. The only way to gain 
entry to Mephisto's prison is to destroy 
the artifact known as the Compelling 
Orb.
 
Mephisto used this device to control the 
Zakarum Priests and their followers. 
The Orb can only be destroyed with an 
ancient flail imbued with the spirit of 
the one incorruptible priest.
 
Soon after his imprisonment, Mephisto 
worked his evil corruption on the 
Zakarum priesthood. All were turned to 
his dark ways, save one - Khalim, the 
Que-Hegan of the High Council.
 
Mephisto directed the other Council 
priests to slay and dismember Khalim 
and then scatter his remains across 
the Kingdom. The Priest Sankekur 
succeeded Khalim as Que-Hegan, 
eventually becoming the embodiment of 
Mephisto here on the mortal plane.
 
The corrupted High Council fashioned 
an Orb to control the rest of the 
Zakarum faithful and used their powers 
to hide the lair of their master from 
mortals.
 
Your task is to collect the scattered 
relics of Khalim - his Heart, his Brain, 
and his Eye. Then, using the Horadric 
Cube, transmute Khalim's Flail with his 
relics.
 
Once this is accomplished, you must 
destroy the Compelling Orb with 
Khalim's Will to open the way into the 
corrupt sanctum of Mephisto.
`,QT=`61
You have found Khalim's Heart, and it 
still bears the courage to face 
Mephisto!
 
Place it in the Horadric Cube along with 
Khalim's other relics - the Eye, the 
Brain, and the Flail.
`,UT=`52
Ahh... Khalim's Eye! Only it can reveal 
the true path to Mephisto.
 
Place the Eye in the Horadric Cube 
along with Khalim's other relics - the 
Heart, the Brain, and the Flail.
`,KT=`58
This is most fortunate! Khalim's Brain 
knows Mephisto's weakness.
 
Place it in the Horadric Cube along with 
Khalim's other relics - the Eye, the 
Heart, and the Flail.
`,JT=`46
Once properly imbued, Khalim's Flail can 
destroy the Compelling Orb and reveal 
the way to Mephisto.
 
Place it into the Horadric Cube along 
with Khalim's relics - his Heart, his 
Brain, and his Eye. Then, transmute 
them to carry out Khalim's Will.
`,$T=`54
Masterfully done, hero! You have 
crafted Khalim's Will. Employ it to 
destroy the Compelling Orb and open 
the way to Mephisto. 
 
May the true Light guide your way.
`,jT=`56
It pains me to waste time with you, so 
I'll get right to the point.
 
There is a very special book which you 
must find for me. It was written long 
ago by a sage known as Lam Esen, who 
studied Skatsimi magic and the effects 
of the Prime Evils on the mortal world. 
The Black Book was lost when the 
Children of Zakarum took over this 
land.
 
Now, you must reclaim it without delay! 
Its knowledge may aid us in this dark 
time ahead.
`,YT=`73
The Black Book contains powerful 
secrets of Skatsim, the Old Religion, 
long eclipsed by Zakarum.
 
I should warn you. The Black Book is 
much sought after by both good and 
evil. Be wary.
`,ZT=`62
The Children of Zakarum believe that 
the Black Book is filled with 
blasphemous heresy. In truth, the book 
may contain the secrets to our ultimate 
redemption.
`,XT=`73
Oh. No one really believes that the Black 
Book exists. It's just a symbol of 
Zakarum's anti-Skatsim propaganda.
`,e4=`102
Many things can be found in the city of 
Kurast. The book may be there.
`,a4=`54
We have long sought the Black Book of 
Lam Esen. Rumors of its whereabouts 
spread as fast as jungle plagues. If you 
find it, take it to Alkor.
`,t4=`72
The Black Book is a powerful source of 
information. The Zakarum will do 
everything in their power to stop you 
from obtaining it.
`,n4=`81
I've heard of the Black Book. My Order's 
code is based on many of its passages. 
If you find it, I will be greatly 
impressed.
`,s4=`104
Did I neglect to mention that the book 
contains useful information about the 
Prime Evils?
`,l4=`55
Even if you find the sacred Book, you 
must still traverse the jungle of 
meaning within it. That journey could 
prove to be far more perilous.
`,i4=`56
Kurast was once the greatest city in the 
world. Now it is hard to tell where the 
jungle stops and the city begins. The 
jungle grows rampant on the soil 
enriched by the blood of my fellow 
citizens.
`,o4=`68
I believe I can trust you now.
 
When you first arrived, I suspected you 
a spy for the Zakarum, the false 
religion whose faithful are now under 
the sway of a mysterious power. 
They've made a mockery of the Old 
Religion of Skatsim.
`,r4=`62
Not getting much help?
 
You know, people are like rugs. Hang 
them out a window and shake 'em a 
couple times. You'll be surprised how 
much dirt comes out.
`,c4=`81
I heard that there are ruined temples in 
Kurast. Perhaps you will find the Black 
Book in one of them.
`,d4=`105
I hope you find the Black Book soon. I 
could use something to read while I 
wait for my orders.
`,u4=`83
You have found the Book! It should give 
all of us here some insight into the 
nature of the Prime Evils...
 
Ah, but as for you...
`,h4=`70
Why is the Black Book of Lam Esen like 
a coffin? Simple. Each holds the shape 
of our future.
`,m4=`75
Thank all that's holy. You've returned 
with the Black Book! Maybe now you 
can put an end to the Evil that has 
destroyed my homeland.
`,g4=`135
The Iron Wolves are very impressed by 
your skills.
`,f4=`74
We have the Book. Now we must see if 
we can bear its revelations.
`,v4=`86
You have found a source of information 
powerful enough to turn the tide 
against the Zakarum.
`,p4=`89
So, you've returned with the Book. You 
surprise me. You must be very 
resourceful.
`,y4=`45
As I told you before, I placed an 
enchantment upon the dockside in 
order to keep the demons at bay. But 
lately, the enchantment seems to be 
weakening.
 
If memory serves me correctly, there is 
a holy Skatsimi blade that could 
revitalize the enchantment. The blade 
is called the Gidbinn.
 
Find it, and our sanctuary here will 
remain safe.
`,k4=`66
Have you not heard of the Gidbinn? 
Well, allow me to reduce your 
ignorance on the subject.
 
The Gidbinn is an enchanted dagger - a 
religious artifact greatly valued by the 
Old Religion, Skatsim.
`,b4=`64
Ormus is familiar with the Gidbinn. But 
how would a powerful Skatsimi artifact 
aid an unbeliever like you?
`,w4=`66
The Gidbinn is one of the few remaining 
relics of Skatsim, the Old Religion. It is 
reputed to have great powers.
`,M4=`107
The Gidbinn will reinforce the 
enchantments that protect the 
dockside from the evil that infests 
Kurast.
`,x4=`54
As far as we know, the Gidbinn is in the 
possession of the Children of Light. 
They do not wish it to fall into the 
hands of those who can restore its 
powers.
 
You may not believe it, but Ormus is the 
one who can use the Gidbinn to protect 
us.
`,S4=`55
I've done some research on the Taan 
mage-clan, and it seems that most of 
their magical studies were focused on 
Skatsimi rites.
 
If anyone is qualified to use the powers 
of the Gidbinn, it would be Ormus.
`,L4=`73
Don't let the Gidbinn's size fool you. 
Though it is only a small dagger, it 
holds tremendous power when in the 
hands of a true Skatsimi mage.
`,A4=`70
Legend has it that the Skatsimi priests 
placed great power within the small 
blade. Power enough to repel this 
terrible jungle-curse which encroaches 
on our sanctuary.
`,C4=`83
If we are to have peace from the 
shadow, you must find the weapon 
which will destroy the Light.
`,I4=`67
The jungle is like nothing you've ever 
seen before. Imagine Paradise 
festering like a wound... then bursting!
`,T4=`145
I'm certain that the Gidbinn is very 
closely guarded.
`,B4=`70
Once the Gidbinn is found, Ormus will 
use it to strengthen the protective 
barrier around the dockside.
`,H4=`75
Since you haven't come across the 
Gidbinn yet, the dagger must be deeper 
in the jungle nearer Kurast.
`,D4=`97
You'd best get back out there and find 
that blade. The jungle creeps further 
into this camp by the hour.
`,G4=`77
Hah! You have stolen the fabled blade 
from right under Zakarum's nose! This 
is a great day, indeed!
`,E4=`41
You have done well, noble hero. Ormus 
congratulates you. The old spirits of 
Skatsim will watch over you for 
returning their sacred blade.
 
Now, after all these years, Ormus will 
once again use his powers to protect 
the innocent from the shadow. The 
spell that protects the dockside shall 
now be reinforced.
`,F4=`79
With any luck, the spirits of Skatsim will 
grant us revenge upon the powers that 
ravaged this land.
`,q4=`99
Now that fewer of the Iron Wolves are 
needed to guard the dockside, some of 
them have volunteered to accompany 
you free of charge.
`,R4=`80
The Gidbinn's magic can only be 
channeled through Ormus.
 
Take it to him. He has the necessary 
knowledge about the ancient Skatsimi 
magics.
`,P4=`62
Who could have foreseen that the Old 
Religion would play such an effective 
role in our war against the Three? 
Again, your efforts amaze me, my 
friend.
`,N4=`67
You are truly amazing, stranger. There 
are precious few items in the world 
that would tempt me to go up against 
the Children of Zakarum and their 
midget minions.
`,O4=`101
This magic ring does me no good.
 
Here... Wear it proudly!
`,z4=`36
You have done well, my friend. Your 
courage and valor are an inspiration to 
us all.
 
But now the time has come to face 
those responsible for the evil that has 
stifled our land. You must destroy the 
High Council of Zakarum!
 
Long ago, these elders were charged 
with the stewardship of Mephisto, the 
Lord of Hatred, who was imprisoned 
within the Guardian Tower.
 
Through the generations, these pious 
men slowly fell more and more under 
the sway of Mephisto's malevolent 
power and the Council became an evil 
mockery of its former glory. 
 
It is Mephisto's Hatred that has 
corrupted Zakarum and turned its 
devout followers into paranoid 
fanatics. That is why you must travel 
to the Temple City of Travincal and 
slay the Council.
 
Once they are gone, Mephisto's hold 
over this land and its people will be 
broken!
`,_4=`84
The Black Book contains some vague 
prophecies regarding this undertaking. 
I'm not so sure it will turn out well for 
you.
`,W4=`90
I am but a potion dealer and an avid 
reader of occult books. What do I know 
of the Travincal?
`,V4=`54
You must know that the Guardian Tower 
in the Temple City was built by the 
Horadrim for one purpose - to hold 
Mephisto. Once the Council is dead, 
you may enter the Tower.
`,Q4=`54
You must know that the Guardian Tower 
in the Temple City was built by the 
Horadrim for one purpose -  to hold 
Mephisto. Once the Council is dead, 
you may enter the Tower.
`,U4=`68
There is only one way to the Temple 
City. You will have to cross many rivers 
and streams, but you'll find it. A great 
tower stands at its center.
`,K4=`113
It has been said that Ormus speaks 
most clearly when his ideas are utterly 
mad.
`,J4=`89
The Children of Zakarum who guard the 
Tower square can be killed, but their 
numbers are vast. You must destroy 
their Council.
`,$4=`105
There are many zealots among the 
followers of Zakarum. It will be difficult 
to get past them.
`,j4=`104
Remember. You can always find 
sanctuary here with us.
`,Y4=`75
This has been a trying time for all of us, 
but I sense this nightmare is coming to 
an end.
`,Z4=`63
Ormus tells me that the Council is 
comprised of tremendously powerful 
priests. It will be difficult to best them.
`,X4=`93
The Temple City is well guarded. You'd 
best keep your wits about you.
`,eB=`100
You are incredibly brave to venture into 
the lion's den. I wish you luck.
`,aB=`95
Beware the followers of Zakarum. Their 
fanaticism is their greatest weapon.
`,tB=`111
Kill as many as you can. I have a 
morbid love of excess.
`,nB=`91
If only we could have found the Black 
Book. I feel as though a malevolent 
hand has led us away from it.
`,sB=`49
If you die on this quest, I will 
commemorate your sacrifice in an epic 
poem. You will not need a potion to 
achieve immortality. Ormus' words will 
do that.
`,lB=`110
Within the Temple City is a courtyard. 
The Council resides there.
`,iB=`107
I have heard rumors that the Prime 
Evils are here seeking their Brother.
`,oB=`161
The Iron Wolves and I are at the ready 
to aid you.
`,rB=`139
Things are getting wilder than Ladies 
Night at the Slippery Fist.
`,cB=`65
The followers of Zakarum demand 
complete allegiance to their creed. 
They have slaughtered many of their 
own for minor grievances.
 
They will not hesitate to kill you.
`,dB=`75
After having served Mephisto all these 
years, the Council must be twisted by 
hatred and evil.
`,uB=`81
Sankekur may be using a Compelling 
Orb to control the minds of the 
Children of Zakarum.
`,hB=`80
I respect your need to do this. Honor 
demands that you see this through. Yet 
your chances are so slim...
`,mB=`80
I respect your need to do this. Honor 
demands that you see this through. Yet 
your chances are so slim...
`,gB=`91
You've accomplished the impossible! By 
killing the Council, the curse of 
Zakarum will be lifted and our land will 
be free!
 
Oh. Thank you!
`,fB=`40
Ormus is grateful to you, stranger. You 
have broken the long, dark reign of 
Zakarum and delivered the first 
paralyzing blow against the Three.
 
Yet still, the true test lies ahead. For he 
whom the Council guarded still lives 
within the Blackened Tower.
`,vB=`76
It seems the jungle is already dying 
back. You've broken the curse, my 
friend! May the Light bless you!
`,pB=`125
The sun has set on the Religion of Light.
`,yB=`68
The followers of Zakarum lacked all 
sense of moderation. The collapse of 
their tainted religion gives me hope.
`,kB=`48
Ridding Kurast of the Council of 
Zakarum was essential. Still, there is 
more you must do. The Compelling Orb, 
too, must be destroyed.
 
Diablo and Baal must be close to finding 
their brother, Mephisto, by now. You've 
no time to waste.
`,bB=`88
I can hardly believe you did it. Your 
power blankets you like a shining aura.
`,wB=`53
Diablo and Baal have surely found the 
Temple City by now. They seek to free 
their Brother, Mephisto, who was 
imprisoned by the Horadrim in the 
Temple's Guardian Tower.
 
You must reach him before his Brothers 
do and prevent them from releasing 
Hatred upon the world.
`,MB=`90
The hidden ways of the Tower are long 
forgotten. Though... it is rumored to 
have been built as far below the 
ground as above it.
`,xB=`114
We have seen Diablo, but remain unsure 
of his Brothers' whereabouts.
`,SB=`52
Make haste! Though the Three are sure 
to reunite, it is uncertain as to what 
they have planned once they do.
 
Be cautious, my friend. Though you are 
mighty, no mortal can stand alone 
against the power of the Prime Evils.
`,LB=`52
Make haste! Though the Three are sure 
to reunite, it is uncertain as to what 
they have planned once they do.
 
Be cautious, my friend. Though you are 
mighty, no mortal can stand alone 
against the power of the Prime Evils.
`,AB=`66
Be careful when you return to the 
Tower. Though many of the followers 
of Zakarum have fled, there's no telling 
what horrors still lurk inside it.
`,CB=`116
Move quickly, my friend, and end this 
curse once and for all!
`,IB=`60
I sent a few of my Iron Wolves on a 
scouting mission into the jungle near 
the Temple City... They encountered 
two cloaked men who attacked them 
with horrifying powers.
 
My men barely survived. I have to 
assume that the two strangers are 
Diablo and Baal.
 
You'd better hurry. They're close to 
finding their brother.
`,TB=`93
Many Iron Wolves have disappeared in 
Travincal. The Evil is still strong there.
`,BB=`43
Mephisto, along with Baal, was 
originally captured in the desert near 
Lut Gholein. But imprisoning two of the 
Brothers together was far too 
dangerous.
 
The Horadrim built the Guardian Tower 
to hold Mephisto. When Zakarum came 
to power in this land, it took over the 
Temple City without paying any heed to 
what was locked within the Tower.
 
And it became their doom.
`,HB=`73
I hear there is a little family reunion 
about to take place in Kurast. The 
Three brothers draw close.
`,DB=`116
You must reach Mephisto before his 
brothers do.
`,GB=`50
The ancient Horadrim always feared 
that the Three would escape their 
prisons and unite. I can't believe that I, 
the last of their Order, have seen it 
come to pass.
 
You are the only one who can prevent 
this, my friend. The final hour draws 
near.
`,EB=`75
Now you rush to face Mephisto. Don't 
give in to your hatred. That is his 
greatest weapon against you.
`,FB=`75
Now you rush to face Mephisto. Don't 
give in to your hatred. That is his 
greatest weapon against you.
`,qB=`68
Well, the good news is that events are 
unfolding just as Lam Esen foretold. 
The bad news is that the story ends in 
our utter ruin!
`,RB=`80
I'm afraid both fear and a large dose of 
elixir preclude me from answering.
`,PB=`59
I understand that the great Patriarch of 
Zakarum, Sankekur, now embodies 
Mephisto.
 
You must overcome Hatred lest Terror 
and Destruction claim us all!
`,NB=`77
I am loath to describe what will happen 
if Diablo and Baal release Mephisto.
`,OB=`110
I ought to return to the ship. We may 
have to sail from here very quickly.
`,zB=`110
I ought to return to the ship. We may 
have to sail from here very quickly.
`,_B=`80
The sudden reduction in our ranks 
makes us eager to destroy Diablo and 
his brothers. Vengeance for the Iron 
Wolves!
`,WB=`200
We will fight to the death.
`,VB=`58
Why build a Tower to place the beast 
below ground? At times I believe the 
Horadrim lacked common sense.
`,QB=`106
Shouldn't you be running frantically up 
and down stairs about now?
`,UB=`96
Search the Tower thoroughly. Mephisto 
must not escape.
`,KB=`96
Search the Tower thoroughly. Mephisto 
must not escape.
`,JB=`55
Beware, my friend. Sankekur may be the 
most powerful mortal in the world. He 
controls thousands of fanatical 
worshippers and embodies the Lord of 
Hatred, himself. His death will be no 
easy task.
`,$B=`55
Beware, my friend. Sankekur may be the 
most powerful mortal in the world. He 
controls thousands of fanatical 
worshippers and embodies the Lord of 
Hatred himself. His death will be no 
easy task.
`,jB=`71
Your news is great indeed. You have 
saved us all. I would smile, but I'm 
afraid my face might collapse.
`,YB=`48
You have defeated a Prime Evil in 
combat. Ormus is impressed beyond 
words. But staying here will not end 
this conflict.
 
You must enter the Infernal Gate and 
stop Diablo once and for all.
`,ZB=`70
Ahh... Now, Kurast can begin the task 
of rekindling its former glory... I thank 
you.
`,XB=`65
Well done, my friend. You are a great 
champion of Order. Please, consider 
yourself an honorary Iron Wolf.
`,eH=`121
It looks like you're going to Hell before 
me.
 
Put in a good word.
`,aH=`42
Our faith in you was well deserved. But 
Diablo has made his way to Hell; and it 
is likely that Baal followed him there.
 
Enter the Infernal Gate and kill the Lord 
of Terror before all is lost. Only then 
will our world be saved!
`,tH=`55
Word is spreading fast that you killed 
Mephisto. I'd be honored to fight 
beside you in Hell, but I've just received 
my mission orders.
 
I'll be travelling to the Barbarian lands 
of the North, but I can't tell you why. 
With luck, our paths will cross again. 
Farewell.
`,nH=`43
It is good to see you again, hero.
 
Mephisto's defeat is a great victory for 
the Light. I knew that you would 
eventually find your way here. The 
Pandemonium Fortress is the last 
bastion of Heaven's power before the 
Gates of the Burning Hells.
 
This place has been hallowed by the 
blood of thousands of champions of 
the Light, many of whom were mortal, 
like yourself. Now the final battle 
against the Prime Evils draws near... 
and you must face it alone. 
 
I have been forbidden to aid you 
directly, save for a few bits of wisdom. 
For this is the hour of mortal Man's 
triumph...your triumph.
 
May the Light protect you and the 
powers of Heaven shine upon your 
path...
`,sH=`62
Long ago, I swore an oath to watch 
over the Horadrim and their 
descendants.
 
As Deckard Cain is the last of their 
esteemed Order, I will not allow him to 
perish here so far from the lands of his 
birth.
 
Be at ease, hero, I know that he is your 
friend. He shall come to no harm.
`,lH=`41
Can you believe this place? Did you ever 
dare to dream that you'd one day 
stand upon the crossroads between 
Heaven and Hell? This Pandemonium 
Fortress is truly miraculous.
 
However, your journey is not yet over. 
Diablo still roams free in Hell, 
marshalling his demonic forces. Only 
when he is beaten will our world finally 
have peace.
 
Hurry now... the sands of time slow for 
no one! 
`,iH=`48
I have read much about the enigmatic 
Archangel Tyrael. He was revered in 
Horadrim lore both for his compassion 
for mortals and his unquenchable 
spirit.
 
It was rumored that he went against the 
wishes of Heaven and gave the 
Horadrim the original Soulstones in 
order to trap Diablo and his Brothers.
`,oH=`72
Halt! Before venturing into Diablo's lair, 
go to the Hellforge with Mephisto's 
Soulstone.
 
Place the stone on the Hellforge and 
use the Hellforge Hammer to destroy 
it.
`,rH=`66
Proceed, hero, into Terror's lair.
 
Know that Diablo's innermost sanctum 
is hidden by five seals.
 
Only by opening each of these seals can 
you clear your way to the final battle.
`,cH=`42
There is a dark, tortured soul who was 
trapped within this forsaken realm long 
ago. He was called Izual by mortal 
men, and in ages past he was my most 
trusted Lieutenant.
 
Yet, against my wishes he led an 
ill-fated assault upon the fiery 
Hellforge, itself.
 
Despite his valor and strength, Izual 
was captured by the Prime Evils and 
twisted by their perverse power. They 
forced him to betray his own kind and 
give up Heaven's most guarded 
secrets.
 
He became a corrupt shadow of his 
former self - a fallen angel trusted 
neither by Heaven nor Hell.
 
For his transgressions, Izual's spirit 
was bound within the form of a terrible 
creature which was summoned from 
the Abyss. His maddened spirit has 
resided within that tortured husk for 
many ages now.
 
It seems to me that he has suffered 
long enough. I implore you, hero, find 
Izual and release him from his cruel 
imprisonment.
 
Put an end to his guilt and suffering.
`,dH=`59
Though Izual no longer carries the 
Angelic Runeblade, Azurewrath, he may 
still possess great strength and power 
within his new form.
 
Also, he may not be able to tell friend 
from foe while in his present state. If 
you find him, he will almost certainly be 
hostile.
 
Proceed with the utmost caution.
`,uH=`54
Tyrael has asked you to confront Izual 
the Fallen? He must have great faith in 
your abilities!
 
I trust you know what you're doing... Be 
careful. You're our last hope.
`,hH=`75
You mustn't delay, mortal hero. Izual 
must be put to rest, but Diablo still 
lurks within this realm.
 
Go now... Hurry!
`,mH=`83
Having trouble finding the Fallen Angel, 
eh?
 
You'd better hurry. It's beginning to feel 
like some great evil is permeating the 
air around here.
`,gH=`47
Tyrael was a fool to have trusted me!
 
You see, it was I who told Diablo and his 
Brothers about the Soulstones and how 
to corrupt them. It was I who helped 
the Prime Evils mastermind their own 
exile to your world.
 
The plan we set in motion so long ago 
cannot be stopped by any mortal 
agency.  Hell, itself, is poised to spill 
forth into your world like a tidal wave 
of blood and nightmares.
 
You and all your kind... are doomed.
`,fH=`53
Thank you, hero, for putting Izual's 
tortured spirit to rest. May the Light 
protect you and the powers of Heaven 
shine upon your path.
 
But, if what you tell me is true, then I 
fear that we have been played for fools 
all along.
 
Izual helped Diablo and his Brothers 
trick me into using the Soulstones 
against them... Now the Stones' powers 
are corrupted.
 
With the combined powers of the 
Soulstones under their control, the 
Prime Evils will be able to turn the 
mortal world into a permanent outpost 
of Hell!
`,vH=`68
You're lucky to be alive, my friend! It is 
imperative that you find and stop 
Diablo!
 
You should speak of this with Tyrael. He 
will know what to make of this.
`,pH=`53
The time has come for you to destroy 
Mephisto's Soulstone!
 
Take the Stone to the Hellforge. Place it 
upon the forge and strike it soundly 
with the Hammer.
 
Only by doing this can you prevent 
Mephisto from manifesting in this 
world ever again.
`,yH=`50
The time has come to destroy 
Mephisto's Soulstone! 
 
Although I picked it up before entering 
the Infernal Gate, I believe you should 
carry out this crucial mission.
 
Take the Stone to the Hellforge.  Place 
it upon the forge and strike it soundly 
with the Hammer.
 
Only by doing this can you prevent 
Mephisto from manifesting in this 
world ever again.
`,kH=`70
Congratulations, hero!
 
Surely, even Diablo, himself, sensed the 
fury unleashed when you smashed his 
Brother's Soulstone.
`,bH=`48
The time has come to hunt down and 
destroy Diablo, himself.
 
But beware, the Lord of Terror is not to 
be underestimated. He single-handedly 
destroyed the town of Tristram and 
corrupted the last noble hero who tried 
to stop him.
 
This time, you must defeat him for 
good. Only by destroying the Soulstone 
which he carries will his spirit be 
banished forever.
 
Good luck! Though this be our darkest 
hour, it may yet be your greatest 
moment.
`,wH=`54
You don't have time to dally about here!
 
Diablo awaits you in Hell. Remember... 
Diablo's greatest weapon against you is 
Terror.
 
Don't give in to your fears. Resist his 
power and put an end to him for good!
`,MH=`48
The time has come to hunt down and 
destroy Diablo, himself.
 
But beware, the Lord of Terror is not to 
be underestimated. He single-handedly 
destroyed the town of Tristram and 
corrupted the last noble hero who tried 
to stop him.
 
This time, you must defeat him for 
good. Only by destroying the Soulstone 
which he carries will his spirit be 
banished forever.
 
Good luck! Though this be our darkest 
hour, it may yet be your greatest 
moment.
`,xH=`62
Praise be to the Light! You have 
accomplished the impossible!
 
Diablo and Mephisto have been 
banished back into the Black Abyss 
that spawned them and the corrupted 
Soulstones are no more.
 
You've done well, hero. For now, you 
should rejoice.
`,SH=`42
I knew there was great potential in you, 
my friend. You've done a fantastic job.
 
Though my ancestors often struggled 
against the Three Evils and their 
minions, I've always lived a shut-in, 
scholarly life. I'm glad that my wisdom 
aided you.
 
Now, I wish to leave this place. Though 
Heaven's Gates are a marvel to behold, 
I hope I won't have to see them again 
for many, many years.
`,LH="CHAT HELP",AH="CHAT COMMANDS",CH="To select a Character, left-click on the Character portrait to highlight it with an aura. To deselect any highlighted character, left-click on their portrait.",IH="The buttons located under the Chat Window on the left side of the screen have the following functions:",TH="SEND displays your message to everyone in your chat Channel, regardless of what character portrait is currently selected. This button is activated as soon as you start typing in the Text Box.",BH="WHISPER sends your message only to the character that you have selected. This button is activated as soon as you start typing in the Text Box and have another character selected.",HH="SQUELCH filters out incoming messages from the character that you have selected. Characters that you have squelched are marked with a red X graphic. This button is activated as soon as you select another character.",DH="UNSQUELCH allows you to again receive incoming messages from a character that has been squelched.",GH="EMOTE lets you perform an action that the whole room can <see> as represented through text.",EH="For example, if Doomhammer wants to greet all the players in the chat Channel, he could type, <waves hello.> and then click the EMOTE button. Everyone in the Channel will then receive the message, <Doomhammer waves hello.> This button is activated as soon as you start typing in the Text Box.",FH="ÿc5Gray Textÿc4 indicates when someone Joins or Leaves the chat Channel.",qH="ÿc7Gold Textÿc4 indicates the name of the player speaking.",RH="ÿc0White Textÿc4 indicates what you or others have said out loud to the entire chat Channel.",PH="ÿc2Green Textÿc4 indicates what you have <whispered> to a specific person, or any message that has been <whispered> to you, in the chat Channel.",NH="ÿc3Blue Textÿc4 represents actions that have been taken by people in the chat Channel.",OH="ÿc1Red Textÿc4 represents error messages sent directly from battle.net.",zH="THE DIALOGUE WINDOW",_H="This window on the right side of the screen is used to display and enter both game and profile information. Unlike the Chat Window, this area changes depending on what function you have activated. The buttons for these functions are discussed in detail in the following section:",WH="CREATE",VH="Lets you form a new game for other players to join. There are several choices listed below that you need to make when creating a new game, although many of them are optional.",QH="Game Name is how you want your game to be displayed in the Join Game screen. It can be cryptic or descriptive, although certain words and names are restricted.",UH="Password gives you the option to make your game Private. Other players who wish to join your game will need to know the password you have selected.",KH="Game Description lets you say something about the game you are forming. This is a good way to advertise for the kind of player or character you want to join your game.",JH="Maximum Number of Players sets a limit as to how many characters can be in your game at any one time. The default setting is 4. You can change the number of players, up to a maximum of 8, by clicking the Up or Down arrows next to the box.",$H="Character Difference sets a range above and below the level of your character that other characters joining your game must fall into. The default setting is set at 4 to determine who can join your game.",jH="To set no level restrictions, click the check box next to this option. The displayed number 4 means that any character joining your game must be within 4 levels of your character. You can change the level difference by clicking the Up or Down arrows next to the box.",YH="Normal, Nightmare and Hell sets the difficulty levels at which you can play. The default setting is Normal. Characters must meet certain requirements to start games with the Nightmare and Hell difficulties. Until those requirements are met, these options will be non-selectable.",ZH="JOIN",XH="Lets you enter an existing game. Games that are listed in this screen are considered Public and can be can be joined any time they have space for a player within them.",eD="Selecting a game from this list will display information on the game, including the characters and the elapsed time of the game. To join a Private game, you will be required to enter the name of the game and its assigned password.",aD="CHANNEL",tD="Lets you join an existing chat Channel or gives you the opportunity to create a Channel of your own. To enter an established Public Channel, select one from the Channels list and click the OK button. To enter a Private Channel, you will need to enter the name of the Channel that you wish to enter.",nD="If you wish to start your own Channel, enter the name of the Channel that you wish to create in the Channel Name Field. If this channel does not exist, you will automatically create that Channel.",sD="LADDER",lD="Allows you to view your character's ranking in the Diablo II Ladders for your Realm.",iD="The STANDARD LADDER displays the top characters, ranked by experience. The default setting displays overall rankings, but you can view sorted lists after selecting the By Class option.",oD="The HARDCORE LADDER displays the top Hardcore characters, ranked by experience. The default setting displays overall rankings, but you can view sorted lists after selecting By Class option.",rD="QUIT closes the Battle.net chat interface and returns you to the Character Selection screen. Although you are still connected to Battle.net, you cannot chat or start games until you have selected a character.",cD="ADVANCED COMMANDS",dD="When using advanced commands, you may also use character names for people in the same Realm, and character names @Realm for people in another Realm.",uD="Wherever a command below calls for the use of <accountname>, please use either <charactername>, <charactername@Realm>, or <*accountname>.",hD="You can access any of these advanced features by entering the following commands in the Text Box where you normally type messages:",mD="/whisper <*accountname>, /w <*accountname>",gD="/msg <*accountname>, /m <*accountname>",fD="Sends a private message to another user on battle.net",vD="/me, /emote",pD="Allows you to perform an action in the chat room.",yD="/squelch <*accountname>",kD="/ignore <*accountname>",bD="Allows you to ignore messages from the indicated user.",wD="/unsquelch <*accountname>",MD="/unignore <*accountname>",xD="Allows you to again receive messages from this user.",SD="/away <reason>",LD="Lets other people who send you messages know that you are away from your keyboard and cannot respond. You may provide a reason for your absence, by typing it after the /away command. To turn off this auto message when you return to your keyboard, enter just /away by itself.",AD="/dnd",CD="Lets other people who send you messages know that you do not wish to be disturbed. You may provide a reason for your absence, by typing it after the /dnd command. To turn off this auto message when you return to your keyboard, enter just /dnd by itself.",ID="/channel <channelname>, /join <channelname>",TD="Takes you to the battle.net Channel of your choice. If you wanted to enter the technical support Channel, you would simply type /channel technical support. If you attempt to join a Channel that does not exist, you will automatically create that Channel.",BD="/who <channelname>",HD="Provides you with a list of the battle.net account names of the players that are currently in the requested battle.net Channel.",DD="/ban <*accountname>",GD="Bans an account from entering a private Channel and can only be issued by the Channel operator. Use /unban <accountname> to allow accounts banned from a private Channel back into that Channel.",ED="ctrl+c, ctrl+x ctrl+v",FD="Use these commands to copy, cut, and paste highlighted text. Use ctrl+a to select all text in the text field. Use ctrl+m to toggle music off/on. Use ctrl+n to paste the account name of a selected character.",qD="/designate <*accountname>",RD="Designates the player of your choice to become the next Channel operator, which will take effect after the current Channel operator leaves the Channel and can only be issued by the current Channel operator.",PD="/kick <*accountname>",ND="Kicks an account from a private Channel and can only be issued by the Channel operator. The kicked player, however, can immediately rejoin the channel.",OD="/rejoin, resign",zD="Causes a Channel operator to rejoin the Channel, appearing at the end/bottom of the list instead of the front/top of the list. Only the Channel operator can issue this command.",_D="/whois <*accountname>, /where <*accountname>",WD="/whereis <*accountname>",VD="Searches for another player in all battle.net Public Chat channels and all Blizzard games, telling you their account name, account number and current location.",QD="/whoami",UD="Provides you with your current account number and location on battle.net.",KD="/d2notify",JD="Toggles battle.net Join/Leave notifications in the Chat Channel.",$D="/help, /?",jD="Accesses the general battle.net help text.",YD="/time",ZD="Provides you with the current battle.net time and your current Local time.",XD="/users",eG="Provides the number of users, games, and channels that are currently active across all of battle.net.",aG="/stats <*accountname> <programID>",tG="Provides you with the Ladder statistics for other Blizzard games supported over battle.net. The program ID for each game is as follows; StarCraft < STAR>, Brood War <STARX>, and Warcraft II: battle.net Edition <W2BN>.",nG="Right-clicking on your own character allows you to edit your own profile.",sG="Using the 'Tab' key in the battle.net chat room cycles through the last 10 commands you have issued.",lG="If you need further help, please go to the TECHNICAL SUPPORT Channel on battle.net, consult the Diablo II manual or go to the Blizzard technical support page at http://www.blizzard.com/support/",iG="BATTLE.NET COMMANDS",oG="/whisper, /msg, /reply",rG="/me",cG="/away",dG="/squelch, /unsquelch",uG="/ban, /unban, /kick",hG="/channel",mG="/whois, /where, /whoami",gG="/d2notify",fG="/designate, /rejoin",vG="/time",pG="/who, /users",yG="/stats",kG="Travincal",bG="Harem",wG="Sewers",MG="Act 2 Prologue",xG="Radament's Lair",SG="The Horadric Staff",LG="Tainted Sun",AG="Arcane Sanctuary",CG="The Summoner",IG="The Seven Tombs",TG="Act 3 Prologue",BG="Lam Esen's Tome",HG="Khalim's Will",DG="Blade of the Old Religion",GG="The Golden Bird",EG="The Blackened Temple",FG="The Guardian",qG="Act 4 Prologue",RG="The Fallen Angel",PG="Terror's End",NG="Hell's Forge",OG="Lut Gholein",zG="Find Radament's Lair in the Lut Gholein sewers.",_G="Kill Radament.",WG="Return to Atma for a reward.",VG="Show the scroll to Cain in Lut Gholein.",QG="Search the Halls of the Dead under the Dry Hills for the Cube. Search the Maggot Lair under the Far Oasis for the Shaft. Search the Claw Viper Temple for the Headpiece.",UG="Use the Horadric Cube to restore the Staff.",KG="Take the Staff into Tal Rasha's Tomb.",JG="Take the artifacts to Cain in Lut Gholein.",$G="Look for the source of the darkness.",jG="Ask Drognan about the strange darkness.",YG="Destroy the Serpent Altar in the Claw Viper Temple beneath the Valley of Snakes.",ZG="Speak with the townsfolk in Lut Gholein.",XG="Look for the Arcane Sanctuary within the Palace.",eE="Talk to Drognan.",aE="Find Horazon's Journal.",tE="Continue the search for the Seventh Tomb.",nE="Beware the Summoner.",sE="Kill the Summoner.",lE="Return to town for more information.",iE="Find Tal Rasha's Tomb.",oE="The Symbol of the True Tomb of Tal Rasha.",rE="Kill Duriel.",cE="Explore Tal Rasha'a Chamber.",dE="Talk to Jerhyn.",uE="Talk to Jerhyn.",hE="Talk to Meshif.",mE="Jungle Village",gE="Search the six temples in the Bazaar, Upper Kurast, and the Causeway for Lam Esen's Tome.",fE="Talk to Alkor.",vE="Find Khalim's relics. Search for his Eye in the Spider Cavern.",pE="Search for Khalim's Brain in the Flayer Dungeon.",yE="Search for Khalim's Flail in Travincal. Beware the High Council.",kE="Search for Khalim's Heart in the Sewers under the Kurast Bazaar.",bE="Transmute Khalim's relics - the Flail, Eye, Heart, and Brain - with the Horadric Cube.",wE="Use Khalim's Will to smash the Compelling Orb.",ME="Ask Cain about Khalim's relics.",xE="Look for the Gidbinn in the Flayer Jungle.",SE="Pick up the Gidbinn.",LE="Return the Gidbinn to Ormus.",AE="Talk to Asheara.",CE="Talk to Ormus.",IE="Ask Cain about the Jade Figurine.",TE="Show Meshif the Figurine.",BE="Ask Cain about the Golden Bird.",HE="Give the Golden Bird to Alkor.",DE="Return to Alkor for reward.",GE="Find the Blackened Temple within Travincal.",EE="Kill the High Council.",FE="Ask Cain for help.",qE="Smash the Compelling Orb with Khalim's Will to open the way to Mephisto's Durance.",RE="Search for Mephisto in his Durance.",PE="Kill Mephisto.",NE="Ask around the Docks about the Gidbinn.",OE="Ask Ormus about the Blackened Temple.",zE="Ormus has news about the Guardian.",_E="Look for Izual in the Plains of Despair.",WE="Destroy the demon that holds Izual's soul.",VE="Talk to Izual's Spirit.",QE="See Tyrael for reward.",UE="Take Mephisto's Soulstone to the Hellforge.",KE="Destroy Mephisto's Soulstone at the Hellforge.",JE="Use the Hellforge Hammer on the Forge.",$E="Consult with Cain.",jE="Find Diablo in his Sanctuary.",YE="Kill Diablo.",ZE="Break the remaining %d seals.",XE="Break the final seal.",e7="Asheara",a7="Hratli",t7="Alkor",n7="Ormus",s7="Natalya",l7="Tyrael",i7="Izual",o7="Izual",r7="Jamella",c7="Halbu",d7="Hadriel",u7="Hazade",h7="Alhizeer",m7="Azrael",g7="Ahsab",f7="Chalan",v7="Haseen",p7="Razan",y7="Emilio",k7="Pratham",b7="Fazel",w7="Jemali",M7="Kasim",x7="Gulzar",S7="Mizan",L7="Leharas",A7="Durga",C7="Neeraj",I7="Ilzan",T7="Zanarhi",B7="Waheed",H7="Vikhyat",D7="Jelani",G7="Barani",E7="Jabari",F7="Devak",q7="Raldin",R7="Telash",P7="Ajheed",N7="Narphet",O7="Khaleel",z7="Phaet",_7="Geshef",W7="Vanji",V7="Haphet",Q7="Thadar",U7="Yatiraj",K7="Rhadge",J7="Yashied",$7="Jarulf",j7="Flux",Y7="Scorch",Z7="Khalim's Flail",X7="Khalim's Will",e6="Khalim's Flail",a6="Khalim's Will",t6="Khalim's Eye",n6="Khalim's Brain",s6="Khalim's Heart",l6="Impossible.",i6="I can't.",o6="Help Me!",r6="Help!",c6="Follow Me.",d6="Come on.",u6="This is for you.",h6="This is yours.",m6="Thank you.",g6="Thanks.",f6="Oops.",v6="Forgive me.",p6="Goodbye.",y6="Bye.",k6="Die!",b6="Time to Die!",w6="Not enough mana.",M6="I need mana.",x6="I can't use this yet.",S6="I am overburdened.",L6="I can't carry anymore.",A6="Not in Town.",C6="Not Here.",I6="I can't do that here.",T6="It's Locked.",B6="I need a key.",H6="I shall purge this land of the shadow.",D6="Beware foul demons and beasts.",G6="I will cleanse thiw widerness.",E6="Evil beware!",F6="My enemies beware.",q6="I hear foul creatures about.",R6="There are many foes here.",P6="Evil Dwells within this cave.",N6="This place is trouble.",O6="I sense death within this place.",z6="I sense great sorrow and misery.",_6="I shall meet death head-on.",W6="This holy place has been desecrated!",V6="There is dark magic at work here.",Q6="Too many empty graves.",U6="So, this is the site of Andariel's atrocities.",K6="The Monastery reeks with evil and corruption.",J6="Even the Light cannot pierce this gloom.",$6="Ah, the Monastery... Andariel's stronghold!",j6="This place has the stench of demons about it.",Y6="What's that smell?",Z6="The stench of poison...",X6="This tower shall be cleansed of evil.",eF="This place holds many secrets.",aF="This place reeks of death.",tF="What nightmarish tortures took place here?",nF="No one should ever be caged.",sF="This is no place for a warrior to die.",lF="If there was magic here, it's long gone now.",iF="Ah, the slow torture of caged starvation.",oF="Removed",rF="This place is eerie.",cF="So cold and damp under the earth.",dF="There is great evil here.",uF="This place chills me to the bone.",hF="I sense a demonic presence here.",mF="Perhaps now the Sisters will trust me.",gF="The Rogues are safe for the moment.",fF="My duty here is done.",vF="This cave has been purged of evil.",pF="Is that enough to earn the Rogues' trust?",yF="Rest in peace, Sister.",kF="Good riddance, Blood Raven.",bF="Sisters, there was no other way.",wF="Rest now, Blood Raven.",MF="Blood Raven... rest well.",xF="What a strange-looking tree...",SF="This tree is one of a kind.",LF="This tree bristles with magic!",AF="This ancient tree has an aura of magic about it.",CF="This tree shines with inner spirits.",IF="These stones serve some magical purpose...",TF="These magic stones are ancient.",BF="Maybe Akara could dispel the mystery of these stones.",HF="These stones radiate powerful magic.",DF="I sense many spirits around the stones.",GF="It's as if a great war were fought here.",EF="The land here is dead and lifeless.",FF="What a tragic end to Tristram!",qF="Tristram was no match for Diablo's fury.",RF="All that's left of proud Tristram are ghosts and ashes.",PF="Deckard Cain, go to the Rogues' camp without delay!",NF="Deckard Cain, you've got to get out of here!",OF="Deckard Cain, leave quickly!",zF="Deckard Cain, get to the Rogue camp!",_F="Deckard Cain, if you value your life, leave here immediately.",WF="The Sisters will be glad to have this back!",VF="I should take this to Charsi.",QF="This will help the Sisters turn the tide against evil.",UF="I hope the Sisters appreciate this thing...",KF="All this for a hammer?",JF="The Tower's trove... for the taking!",$F="This is reward enough!",jF="This tower has its charms...",YF="I hope to find other such treasures!",ZF="Treasure hunting... bah... Treasure finding... yes.",XF="This Maiden shall inflict no more anguish.",eq="Let the gate be opened!",aq="My work here is finished.",tq="The evil queen has fallen.",nq="Back to the hell that spawned you, Andariel.",sq="This place disgusts me.",lq="Ugh... The tell-tale stench of a carnivore's lair.",iq="The foul stench of evil assails me.",oq="I sense strange magic here.",rq="I sense a powerful undead being within this place.",cq="Atma has been avenged.",dq="I've just about had my fill of the walking dead.",uq="I pray that Atma will rest easy now.",hq="What a misguided monster.",mq="What a waste of undead flesh.",gq="Great. An eclipse. This just keeps getting better and better.",fq="What is wrong with the sun?",vq="What Evil taints the light of the sun?",pq="Only powerful magic can conjure an eclipse.",yq="Only the darkest magics can turn the sun black.",kq="I hope I know what I'm doing!",bq="The sun has never shone here!",wq="Light guide my way in this accursed place.",Mq="I sense strong magic within this place.",xq="This place is as dark as a tomb.",Sq="Let there be light.",Lq="It is good to know that the sun shines once again.",Aq="The Light can never be extinguished by evil.",Cq="Who would have thought that such primitive beings could cause so much trouble!",Iq="What a pity. I was beginning to enjoy the darkness.",Tq="Am I the first to find this Arcane fortress?",Bq="One could get lost in here.",Hq="This surely is the product of a twisted mind!",Dq="This place actually... distorts reality. Fascinating.",Gq="This is fantastic! I wish I had time to study this bizarre dimension.",Eq="What a freak!",Fq="Stand aside, old fool. I have no time for your babblings.",qq="Surely the evil here has driven you mad.",Rq="Is this truly Horazon?",Pq="This bumbling fool cannot be the mighty Horazon!",Nq="Good riddance, freak.",Oq="I hate staining my hands with the blood of foul sorcerers.",zq="Rest in peace, tortured soul.",_q="That couldn't have been Horazon. Poor wretch.",Wq="He was not Horazon. He was a deluded fool who got too close to true power!",Vq="This has got to be the right place.",Qq="This tomb is very ornate. This must be Tal Rasha's resting place.",Uq="Is this the tomb I seek?",Kq="This tomb has Horadric markings. I wonder if this is Tal Rasha's tomb?",Jq="This could be Tal Rasha's tomb. However, I'm sensing very strange energies here.",$q="Should I enter...?  Diablo and Baal may have laid a trap...",jq="Such a cold breeze... Tal Rasha must be kept here.",Yq="Here, at last, is a fitting testament in stone to Tal Rasha's sacrifice.",Zq="This must be the true Tomb of Tal Rasha!",Xq="I sense an incredible aura about this tomb. The Horadrim hid something powerful inside.",eR="This is not good. Will this madness ever end?",aR="I have failed. Diablo has freed his accursed brother. The world remains at their mercy.",tR="I shall honor Tal Rasha's sacrifice by destroying all the Prime Evils.",nR="Diablo and Baal have escaped me!  Next time... vengeance!",sR="I came too late. Now... Destruction is let loose upon the world once more.",lR="Not in Game",iR="I hope the secrets within this book can help us.",oR="I hope this book is worth all the trouble.",rR="The Black Book... It's heresy to the Zakarum High Council.",cR="This tome has the weight of knowledge about it.",dR="This ancient book radiates arcane power!",uR="All this trouble over a tattered book.",hR="May this book lift the shadow from Kurast.",mR="May the Black Book deliver us from evil!",gR="May the Black Book bring a black day to hell!",fR="Once the book has served its purpose, I shall delve into its secrets.",vR="Whoa.... What died down here?",pR="Cough... The stench down here is choking!",yR="The smell of death... or worse... surrounds me.",kR="It smells worse than rotting reagents down here.",bR="It's been years since I waded through sewers for fun.",wR="I hope this does something good...",MR="This will drain out some of the filth.",xR="This appears to control the ancient valves.",SR="This looks promising.",LR="This looks like what I've been searching for.",AR="Eureka!",CR="Good. Now I can get out of here and get some fresh air!",IR="This trove will help lift the curse from Kurast!",TR="I hope these items can aid me against the demons.",BR="Great. More junk. Just what I'd expect to find in a sewer...",HR="This dagger will separate the faithful from the fallen.",DR="This holy blade does not belong in the hands of the Zakarum.",GR="This blade shall pierce the heart of evil!",ER="I must take this to Ormus.",FR="This is a powerful weapon. Perhaps Ormus can tell me more about it.",qR="A worthless statue. Perhaps I can trade this for something better.",RR="Such a dark temple for a Religion of Light...",PR="The spirits of nature have fled this dreaded place.",NR="This corrupted temple was once the shining heart of my religion...",OR="I sense tremendous evil within this place.",zR="This temple exudes darkness.",_R="Skatsim's reign is renewed!",WR="The dark powers here will no longer poison the land.",VR="The Temple shall shine anew with the Light.",QR="The Temple's power is annulled.",UR="The Temple's dark power is broken.",KR="This must be where Mephisto is.",JR="The final resting place of Hatred itself.",$R="This must be where the Horadrim imprisoned Mephisto.",jR="Ah... Mephisto's prison.",YR="The Tower that holds Mephisto....",ZR="Success... But still there's something not right.",XR="Maybe now the world will have peace.",eP="The Lord of Hatred shall darken the world no longer.",aP="Mephisto shall no longer darken our souls with hatred.",tP="Good journey, Mephisto. Give my regards to the abyss.",nP="Goodbye, Izual.",sP="Even Fallen Angels deserve freedom.",lP="How can one who was once so holy fall so far from righteousness?",iP="He was corrupted to the core. I pity him.",oP="Bah! Izual was weak. He squandered his infernal power.",rP="          ",cP="          ",dP="          ",uP="          ",hP="    ",mP="           ",gP="           ",fP="    ",vP="     ",pP="                       ",yP="                       ",kP="     ",bP="           ",wP="           ",MP="                                                             ",xP="           ",SP="         ",LP="                   ",AP="                              ",CP="         ",IP="         ",TP="                           ",BP="                           ",HP="         ",DP="         ",GP="           ",EP="                                 ",FP="         ",qP="    ",RP="                     ",PP="                     ",NP="    ",OP="              ",zP="                       ",_P="                       ",WP="          ",VP="            ",QP="                   ",UP="                                     ",KP="            ",JP="           ",$P="                   ",jP="                   ",YP="           ",ZP="                ",XP="                ",e8="                ",a8="         ",t8="    ",n8="                     ",s8="                     ",l8="    ",i8="        ",o8="                 ",r8="                                      ",c8="        ",d8="           ",u8="           ",h8="           ",m8="           ",g8="          ",f8="                           ",v8="                           ",p8="          ",y8="         ",k8="         ",b8="                ",w8="         ",M8="     ",x8="     ",S8="     ",L8="     ",A8="    ",C8="    ",I8="    ",T8="    ",B8="       ",H8="                                ",D8="                                ",G8="       ",E8="            ",F8="                    ",q8="                    ",R8="            ",P8="       ",N8="                ",O8="                                               ",z8="       ",_8="   ",W8="                         ",V8="                         ",Q8="   ",U8="       ",K8="                ",J8="                ",$8="       ",j8="       ",Y8="                ",Z8="                ",X8="       ",e9="               ",a9="                                ",t9="                                ",n9="               ",s9="              ",l9="              ",i9="              ",o9="              ",r9="           ",c9="                     ",d9="                                            ",u9="           ",h9="          ",m9="          ",g9="          ",f9="          ",v9="         ",p9="         ",y9="         ",k9="         ",b9="           ",w9="                 ",M9="                 ",x9="           ",S9="     ",L9="     ",A9="                           ",C9="     ",I9="              ",T9="              ",B9="              ",H9="              ",D9="             ",G9="             ",E9="             ",F9="             ",q9="           ",R9="                  ",P9="                       ",N9="           ",O9="           ",z9="                      ",_9="                                      ",W9="           ",V9="             ",Q9="                      ",U9="                      ",K9="             ",J9="          ",$9="                    ",j9="                                          ",Y9="          ",Z9="          ",X9="          ",eN="          ",aN="          ",tN="             ",nN="             ",sN="             ",lN="             ",iN="                   ",oN="                           ",rN="                                        ",cN="         ",dN="               ",uN="                       ",hN="                                       ",mN="               ",gN="               ",fN="               ",vN="               ",pN="               ",yN="            ",kN="                            ",bN="                                         ",wN="            ",MN="          ",xN="          ",SN="          ",LN="          ",AN="          ",CN="          ",IN="          ",TN="          ",BN="    ",HN="    ",DN="    ",GN="    ",EN="            ",FN="            ",qN="            ",RN="            ",PN="      ",NN="      ",ON="      ",zN="      ",_N="                ",WN="                ",VN="                ",QN="                ",UN="                ",KN="                        ",JN="                                    ",$N="                ",jN="          ",YN="          ",ZN="          ",XN="          ",eO="          ",aO="          ",tO="          ",nO="          ",sO="          ",lO="          ",iO="          ",oO="          ",rO="             ",cO="             ",dO="             ",uO="             ",hO="         ",mO="         ",gO="         ",fO="         ",vO="            ",pO="            ",yO="            ",kO="            ",bO="            ",wO="            ",MO="            ",xO="            ",SO="              ",LO="              ",AO="              ",CO="              ",IO="             ",TO="             ",BO="             ",HO="             ",DO="Ravens: ",GO="Spikes: ",EO="Stars: ",FO="Wolf: ",qO="Wolves: ",RO="Shoots ",PO=" Times",NO=" Spikes",OO="Eagle Orb",zO="Sacred Globe",_O="Smoked Sphere",WO="Clasped Orb",VO="Jared's Stone",QO="Preserved Head",UO="Zombie Head",KO="Unraveller Head",JO="Gargoyle Head",$O="Demon Head",jO="Wolf Head",YO="Hawk Helm",ZO="Antlers",XO="Falcon Mask",ez="Spirit Mask",az="Wraps",tz="Knuckles",nz="Slashers",sz="Splay",lz="Hook",iz="Shank",oz="Claws",rz="(Amazon Only)",cz="(Sorceress Only)",dz="(Necromancer Only)",uz="(Paladin Only)",hz="(Barbarian Only)",mz="(Druid Only)",gz="(Assassin Only)",fz="Claw Class",vz="Rot Walker",pz="Reanimated Horde",yz="Prowling Dead",kz="Unholy Corpse",bz="Defiled Warrior",wz="Crush Beast",Mz="Blood Bringer",xz="Gore Bearer",Sz="Demon Steed",Lz="Wailing Spirit",Az="Life Seeker",Cz="Life Stealer",Iz="Deathly Visage",Tz="Bound Spirit",Bz="Banished Soul",Hz="Death",Dz="Enslaved",Gz="Slayer",Ez="Ice Boar",Fz="Fire Boar",qz="Hell Spawn",Rz="Ice Spawn",Pz="Greater Hell Spawn",Nz="Greater Ice Spawn",Oz="Fanatic Enslaved",zz="Berserker Slayer",_z="Consumed Fire Boar",Wz="Consumed Ice Boar",Vz="Frenzied Hell Spawn",Qz="Frenzied Ice Spawn",Uz="Insane Hell Spawn",Kz="Insane Ice Spawn",Jz="Succubus",$z="Vile Temptress",jz="Stygian Harlot",Yz="           ",Zz="           ",Xz="Siren",e_="Vile Witch",a_="Stygian Fury",t_="         ",n_="          ",s_="Overseer",l_="Lasher",i_="Overlord",o_="Blood Boss",r_="Hell Whip",c_="Demon Portal",d_="Demon Portal",u_="Demon Imp",h_="Demon Rascal",m_="Demon Gremlin",g_="Demon Trickster",f_="Demon Sprite",v_="     ",p_="     ",y_="      ",k_="                ",b_="             ",w_="          ",M_="            ",x_="                 ",S_="                                                           ",L_="          ",A_="         ",C_="                            ",I_="                                     ",T_="            ",B_="          ",H_="                  ",D_="    ",G_="   ",E_="              ",F_="              ",q_="             ",R_="           ",P_="             ",N_="       ",O_="    ",z_="     ",__="   ",W_="      ",V_="             ",Q_="   ",U_="   ",K_="   ",J_="   ",$_="   ",j_="                              ",Y_="                             ",Z_="                                 ",X_="                                ",eW="                            ",aW="                      ",tW="                        ",nW="                                                                  ",sW="                               ",lW="                     ",iW="                                      ",oW="                     ",rW="                      ",cW="                                 ",dW="      ",uW="              ",hW="     ",mW="             ",gW="           ",fW="                 ",vW="               ",pW="                                                 ",yW="                     ",kW="                            ",bW="                    ",wW="                  ",MW="    ",xW="%0 %1",SW="%0 %1",LW="%0 %1",AW="%0 %1",CW="%0 %1",IW="%0 %1 %2",TW="%0 %1",BW="%0 %1",HW="%0 %1",DW="%0 %1",GW="%0 %1",EW="%0 %1",FW="%0 %1",qW="%0 %1 %2",RW="Damaged",PW="Cracked",NW="Crude",OW="Superior",zW="Gemmed",_W="Resilient",WW="Sturdy",VW="Strong",QW="Glorious",UW="Blessed",KW="Saintly",JW="Holy",$W="Devious",jW="Fortified",YW="Urgent",ZW="Fleet",XW="Muscular",eV="Jagged",aV="Deadly",tV="Vicious",nV="Brutal",sV="Massive",lV="Savage",iV="Merciless",oV="Vulpine",rV="Swift",cV="Artful",dV="Skillful",uV="Adroit",hV="Tireless",mV="Rugged",gV="Bronze",fV="Iron",vV="Steel",pV="Silver",yV="Gold",kV="Platinum",bV="Meteoric",wV="Sharp",MV="Fine",xV="Howling",SV="Fortuitous",LV="Brilliant",AV="Omniscient",CV="Sage",IV="Shrewd",TV="Vivid",BV="Glimmering",HV="Glowing",DV="Bright",GV="Solar",EV="Forceful",FV="Dazzling",qV="Fascinating",RV="Prismatic",PV="Azure",NV="Lapis",OV="Cobalt",zV="Indigo",_V="Sapphire",WV="Cerulean",VV="Red",QV="Crimson",UV="Burgundy",KV="Garnet",JV="Russet",$V="Ruby",jV="Vermilion",YV="Orange",ZV="Ocher",XV="Tangerine",eQ="Coral",aQ="Crackling",tQ="Amber",nQ="Forked",sQ="Green",lQ="Beryl",iQ="Jade",oQ="Viridian",rQ="Vital",cQ="Emerald",dQ="Enduring",uQ="Kicking",hQ="Triumphant",mQ="Mighty",gQ="Energizing",fQ="Strengthening",vQ="Empowering",pQ="Brisk",yQ="Tough",kQ="Hardy",bQ="Robust",wQ="Cap",MQ="Skull Cap",xQ="Helm",SQ="Full Helm",LQ="Great Helm",AQ="Crown",CQ="Mask",IQ="Quilted Armor",TQ="Leather Armor",BQ="Hard Leather Armor",HQ="Studded Leather",DQ="Ring Mail",GQ="Scale Mail",EQ="Chain Mail",FQ="Breast Plate",qQ="Splint Mail",RQ="Plate Mail",PQ="Field Plate",NQ="Gothic Plate",OQ="Full Plate Mail",zQ="Ancient Armor",_Q="Light Plate",WQ="Buckler",VQ="Small Shield",QQ="Large Shield",UQ="Kite Shield",KQ="Tower Shield",JQ="Gothic Shield",$Q="Leather Gloves",jQ="Heavy Gloves",YQ="Chain Gloves",ZQ="Light Gauntlets",XQ="Gauntlets",eU="Boots",aU="Heavy Boots",tU="Chain Boots",nU="Light Plated Boots",sU="Greaves",lU="Sash",iU="Light Belt",oU="Belt",rU="Heavy Belt",cU="Plated Belt",dU="Bone Helm",uU="Bone Shield",hU="Spiked Shield",mU="Hand Axe",gU="Axe",fU="Military Pick",vU="War Axe",pU="Large Axe",yU="Broad Axe",kU="Battle Axe",bU="Great Axe",wU="Giant Axe",MU="Wand",xU="Yew Wand",SU="Bone Wand",LU="Grim Wand",AU="Club",CU="Scepter",IU="Grand Scepter",TU="War Scepter",BU="Spiked Club",HU="Mace",DU="Morning Star",GU="Flail",EU="War Hammer",FU="Maul",qU="Great Maul",RU="Short Sword",PU="Scimitar",NU="Sabre",OU="Falchion",zU="Crystal Sword",_U="Broad Sword",WU="Long Sword",VU="War Sword",QU="Claymore",UU="Giant Sword",KU="Bastard Sword",JU="Flamberge",$U="Great Sword",jU="Dagger",YU="Dirk",ZU="Kris",XU="Blade",eK="Throwing Knife",aK="Throwing Axe",tK="Balanced Knife",nK="Balanced Axe",sK="Javelin",lK="Pilum",iK="Short Spear",oK="Glaive",rK="Throwing Spear",cK="Spear",dK="Trident",uK="Brandistock",hK="Spetum",mK="Pike",gK="Bardiche",fK="Voulge",vK="Scythe",pK="Poleaxe",yK="Halberd",kK="War Scythe",bK="Short Staff",wK="Long Staff",MK="Gnarled Staff",xK="Battle Staff",SK="War Staff",LK="Short Bow",AK="Hunter's Bow",CK="Long Bow",IK="Composite Bow",TK="Short Battle Bow",BK="Long Battle Bow",HK="Short War Bow",DK="Long War Bow",GK="Light Crossbow",EK="Crossbow",FK="Heavy Crossbow",qK="Repeating Crossbow",RK="Barbed Shield",PK="Grim Shield",NK="Grim Helm",OK="War Belt",zK="Battle Belt",_K="Mesh Belt",WK="Sharkskin Belt",VK="Demonhide Sash",QK="War Boots",UK="Battle Boots",KK="Mesh Boots",JK="Sharkskin Boots",$K="Demonhide Boots",jK="War Gauntlets",YK="Battle Gauntlets",ZK="Heavy Bracers",XK="Sharkskin Gloves",eJ="Demonhide Gloves",aJ="Ancient Shield",tJ="Pavise",nJ="Dragon Shield",sJ="Scutum",lJ="Round Shield",iJ="Defender",oJ="Mage Plate",rJ="Ornate Plate",cJ="Chaos Armor",dJ="Embossed Plate",uJ="Sharktooth Armor",hJ="Templar Coat",mJ="Russet Armor",gJ="Cuirass",fJ="Mesh Armor",vJ="Tigulated Mail",pJ="Linked Mail",yJ="Trellised Armor",kJ="Demonhide Armor",bJ="Serpentskin Armor",wJ="Ghost Armor",MJ="Death Mask",xJ="Grand Crown",SJ="Winged Helm",LJ="Basinet",AJ="Casque",CJ="Sallet",IJ="War Hat",TJ="Strangling Gas Potion",BJ="Fulminating Potion",HJ="Choking Gas Potion",DJ="Exploding Potion",GJ="Rancid Gas Potion",EJ="Oil Potion",FJ="Gidbinn",qJ="The Gidbinn",RJ="Decoy Gidbinn",PJ="Wirt's Leg",NJ="Horadric Malus",OJ="Horadric Malus",zJ="Hell Forge Hammer",_J="Horadric Staff",WJ="Shaft of the Horadric Staff",VJ="orifice",QJ="Elixir",UJ="Tome of Town Portal",KJ="Scroll of Town Portal",JJ="Tome of Identify",$J="Scroll of Identify",jJ="Right Click to Use",YJ="Right Click to Open",ZJ="Right Click to Read",XJ="Insert Scrolls",e$="Stamina Potion",a$="Antidote Potion",t$="Rejuvenation Potion",n$="Full Rejuvenation Potion",s$="Thawing Potion",l$="Amulet",i$="Top of the Horadric Staff",o$="Ring",r$="Gold",c$="Scroll of Inifuss",d$="Key to the Cairn Stones",u$="Arrows",h$="Torch",m$="Bolts",g$="Key",f$="Key",v$="The Black Tower Key",p$=`Right Click to permanently add 20 to Life
Potion of Life`,y$="shrine",k$="A Jade Figurine",b$="The Golden Bird",w$="Lam Esen's Tome",M$="Lam Esen's Tome",x$="Horadric Cube",S$="Horadric Scroll",L$="Mephisto's Soulstone",A$=`Right Click to learn skill of your choice
Book of Skill`,C$="Ear",I$="Chipped Amethyst",T$="Flawed Amethyst",B$="Amethyst",H$="Flawless Amethyst",D$="Perfect Amethyst",G$="Chipped Topaz",E$="Flawed Topaz",F$="Topaz",q$="Flawless Topaz",R$="Perfect Topaz",P$="Chipped Sapphire",N$="Flawed Sapphire",O$="Sapphire",z$="Flawless Sapphire",_$="Perfect Sapphire",W$="Chipped Emerald",V$="Flawed Emerald",Q$="Flawless Emerald",U$="Emerald",K$="Perfect Emerald",J$="Chipped Ruby",$$="Flawed Ruby",j$="Ruby",Y$="Flawless Ruby",Z$="Perfect Ruby",X$="Chipped Diamond",ej="Flawed Diamond",aj="Diamond",tj="Flawless Diamond",nj="Perfect Diamond",sj="Minor Healing Potion",lj="Light Healing Potion",ij="Healing Potion",oj="Greater Healing Potion",rj="Super Healing Potion",cj="Minor Mana Potion",dj="Light Mana Potion",uj="Mana Potion",hj="Greater Mana Potion",mj="Super Mana Potion",gj="Herb",fj="Chipped Skull",vj="Flawed Skull",pj="Skull",yj="Flawless Skull",kj="Perfect Skull",bj="Beast",wj="Eagle",Mj="Raven",xj="Viper",Sj="Ghoul",Lj="Skull",Aj="Blood",Cj="Dread",Ij="Doom",Tj="Grim",Bj="Bone",Hj="Death",Dj="Shadow",Gj="Storm",Ej="Rune",Fj="Plague",qj="Stone",Rj="Wraith",Pj="Spirit",Nj="Demon",Oj="Cruel",zj="Empyrian",_j="Bramble",Wj="Pain",Vj="Loath",Qj="Glyph",Uj="Imp",Kj="Fiend",Jj="Hailstone",$j="Gale",jj="Dire",Yj="Soul",Zj="Brimstone",Xj="Corpse",eY="Carrion",aY="Armageddon",tY="Havoc",nY="Bitter",sY="Entropy",lY="Chaos",iY="Order",oY="Rift",rY="Corruption",cY="Bite",dY="Scratch",uY="Scalpel",hY="Fang",mY="Gutter",gY="Thirst",fY="Razor",vY="Scythe",pY="Edge",yY="Saw",kY="Splitter",bY="Cleaver",wY="Sever",MY="Sunder",xY="Rend",SY="Mangler",LY="Slayer",AY="Reaver",CY="Spawn",IY="Gnash",TY="Star",BY="Blow",HY="Smasher",DY="Bane",GY="Crusher",EY="Breaker",FY="Grinder",qY="Crack",RY="Mallet",PY="Knell",NY="Lance",OY="Spike",zY="Impaler",_Y="Skewer",WY="Prod",VY="Scourge",QY="Wand",UY="Wrack",KY="Barb",JY="Needle",$Y="Dart",jY="Bolt",YY="Quarrel",ZY="Fletch",XY="Flight",eZ="Nock",aZ="Horn",tZ="Stinger",nZ="Quill",sZ="Goad",lZ="Branch",iZ="Spire",oZ="Song",rZ="Call",cZ="Cry",dZ="Spell",uZ="Chant",hZ="Weaver",mZ="Gnarl",gZ="Visage",fZ="Crest",vZ="Circlet",pZ="Veil",yZ="Hood",kZ="Mask",bZ="Brow",wZ="Casque",MZ="Visor",xZ="Cowl",SZ="Hide",LZ="Pelt",AZ="Carapace",CZ="Coat",IZ="Wrap",TZ="Suit",BZ="Cloak",HZ="Shroud",DZ="Jack",GZ="Mantle",EZ="Guard",FZ="Badge",qZ="Rock",RZ="Aegis",PZ="Ward",NZ="Tower",OZ="Shield",zZ="Wing",_Z="Mark",WZ="Emblem",VZ="Hand",QZ="Fist",UZ="Claw",KZ="Clutches",JZ="Grip",$Z="Grasp",jZ="Hold",YZ="Touch",ZZ="Finger",XZ="Knuckle",eX="Shank",aX="Spur",tX="Tread",nX="Stalker",sX="Greaves",lX="Blazer",iX="Nails",oX="Trample",rX="Brogues",cX="Track",dX="Slippers",uX="Clasp",hX="Buckle",mX="Harness",gX="Lock",fX="Fringe",vX="Winding",pX="Chain",yX="Strap",kX="Lash",bX="Cord",wX="Knot",MX="Circle",xX="Loop",SX="Eye",LX="Turn",AX="Spiral",CX="Coil",IX="Gyre",TX="Band",BX="Whorl",HX="Talisman",DX="Heart",GX="Noose",EX="Necklace",FX="Collar",qX="Beads",RX="Torc",PX="Gorget",NX="Scarab",OX="Wood",zX="Brand",_X="Bludgeon",WX="Cudgel",VX="Loom",QX="Harp",UX="Master",KX="Bar",JX="Hew",$X="Crook",jX="Mar",YX="Shell",ZX="Stake",XX="Picket",eee="Pale",aee="Flange",tee="Infernal",nee="Angelic",see="Arctic",lee="Ward",iee="Tooth",oee="Collar",ree="Lightbrand",cee="Barb",dee="Orb",uee="Rule",hee="Crowbill",mee="Visor",gee="Cranium",fee="Headgear",vee="Hand",pee="Sickle",yee="Horn",kee="Sign",bee="Icon",wee="Claw",Mee="Cuff",xee="Parry",See="Fetlock",Lee="Rod",Aee="Mesh",Cee="Spine",Iee="Shelter",Tee="Torch",Bee="Hauberk",Hee="Guard",Dee="Mantle",Gee="Furs",Eee="Deathwand",Fee="Cudgel",qee="Pincers",Ree="Coil",Pee="Case",Nee="Ambush",Oee="Diadem",zee="Visage",_ee="Hobnails",Wee="Gage",Vee="Buckle",Qee="Hatchet",Uee="Touch",Kee="Halo",Jee="Binding",$ee="Head",jee="Horns",Yee="Snare",Zee="Robe",Xee="Sigil",eae="Weird",aae="Sabot",tae="Wings",nae="Mitts",sae="Flesh",lae="Cord",iae="Seal",oae="Skull",rae="Wrap",cae="Guard",dae="Deathspade",uae="Bladebone",hae="Skull Splitter",mae="Rakescar",gae="Goreshovel",fae="Brainhew",vae="Maelstrom",pae="Gravenspine",yae="Felloak",kae="Rusthandle",bae="Stormeye",wae="Stoutnail",Mae="Crushflange",xae="Bloodrise",Sae="Ironstone",Lae="Bonesnap",Aae="Steeldriver",Cae="Gleamscythe",Iae="Azurewrath",Tae="Hellplague",Bae="Shadowfang",Hae="Soulflay",Dae="Blacktongue",Gae="Ripsaw",Eae="Gull",Fae="Razortine",qae="Bloodthief",Rae="Steelgoad",Pae="Woestave",Nae="Pluckeye",Oae="Witherstring",zae="Raven Claw",_ae="Rogue's Bow",Wae="Stormstrike",Vae="Wizendraw",Qae="Hellclap",Uae="Blastbark",Kae="Leadcrow",Jae="Ichorsting",$ae="Hellcast",jae="Doomslinger",Yae="Tarnhelm",Zae="Duskdeep",Xae="Wormskull",ete="Howltusk",ate="Greyform",tte="Twitchthroe",nte="Darkglow",ste="Hawkmail",lte="Venom Ward",ite="Iceblink",ote="Boneflesh",rte="Rockfleece",cte="Rattlecage",dte="Goldskin",ute="Stormguild",hte="Steelclash",mte="Bloodfist",gte="Magefist",fte="Frostburn",vte="Hotspur",pte="Gorefoot",yte="Tearhaunch",kte="Snakecord",bte="Nightsmoke",wte="Goldwrap",Mte="Bladebuckle",xte="Nagelring",Ste="Gorgethroat",Lte="Gloom",Ate="Gray",Cte="Dire",Ite="Black",Tte="Shadow",Bte="Haze",Hte="Wind",Dte="Storm",Gte="Warp",Ete="Night",Fte="Moon",qte="Star",Rte="Pit",Pte="Flame",Nte="Ice",Ote="Seethe",zte="Sharp",_te="Ash",Wte="Blade",Vte="Steel",Qte="Stone",Ute="Rust",Kte="Mold",Jte="Blight",$te="Plague",jte="Rot",Yte="Ooze",Zte="Puke",Xte="Snot",ene="Bile",ane="Blood",tne="Pulse",nne="Gut",sne="Gore",lne="Flesh",ine="Bone",one="Spine",rne="Mind",cne="Spirit",dne="Soul",une="Wrath",hne="Grief",mne="Foul",gne="Vile",fne="Sin",vne="Chaos",pne="Dread",yne="Doom",kne="Bane",bne="Death",wne="Viper",Mne="Dragon",xne="Devil",Sne="Touch",Lne="Spell",Ane="Feast",Cne="Wound",Ine="Grin",Tne="Maim",Bne="Hack",Hne="Bite",Dne="Rend",Gne="Burn",Ene="Ripper",Fne="Kill",qne="Call",Rne="Vex",Pne="Jade",Nne="Web",One="Shield",zne="Killer",_ne="Razor",Wne="Drinker",Vne="Shifter",Qne="Crawler",Une="Dancer",Kne="Bender",Jne="Weaver",$ne="Eater",jne="Widow",Yne="Maggot",Zne="Spawn",Xne="Wight",ese="Grumble",ase="Growler",tse="Snarl",nse="Wolf",sse="Crow",lse="Raven",ise="Hawk",ose="Cloud",rse="Bang",cse="Head",dse="Skull",use="Brow",hse="Eye",mse="Maw",gse="Tongue",fse="Fang",vse="Horn",pse="Thorn",yse="Claw",kse="Fist",bse="Heart",wse="Shank",Mse="Skin",xse="Wing",Sse="Pox",Lse="Fester",Ase="Blister",Cse="Pus",Ise="Slime",Tse="Drool",Bse="Froth",Hse="Sludge",Dse="Venom",Gse="Poison",Ese="Shard",Fse="Flame",qse="Maul",Rse="Thirst",Pse="Lust",Nse="the Quick",Ose="Taintbreeder",zse="Stormtree",_se="Bishibosh",Wse="Bonebreaker",Vse="Coldcrow",Qse="Rakanishu",Use="Griswold",Kse="Bone Ash",Jse="Radament",$se="Fangskin",jse="Beetleburst",Yse="Creeping Feature",Zse="Deckard Cain",Xse="Gheed",ele="Akara",ale="Kashya",tle="Charsi",nle="Warriv",sle="Warriv",lle="Rogue",ile="Stygian Doll",ole="Soul Killer",rle="Flayer",cle="Fetish",dle="Rat Man",ule="Dark Familiar",hle="Blood Diver",mle="Gloombat",gle="Desert Wing",fle="The Banished",vle="Blood Lord",ple="Dark Lord",yle="Night Lord",kle="Ghoul Lord",ble="Spikefist",wle="Thrasher",Mle="Bramble Hulk",xle="Thorned Hulk",Sle="Spider Magus",Lle="Flame Spider",Ale="Poison Spinner",Cle="Sand Fisher",Ile="Arach",Tle="Blood Wing",Ble="Blood Hook",Hle="Feeder",Dle="Sucker",Gle="Winged Nightmare",Ele="Hell Buzzard",Fle="Undead Scavenger",qle="Carrion Bird",Rle="Unraveler",Ple="Guardian",Nle="Hollow One",Ole="Bone Scarab",zle="Steel Scarab",_le="Scarab",Wle="Death Beetle",Vle="Dung Soldier",Qle="Hell Swarm",Ule="Plague Bugs",Kle="Black Locusts",Jle="Itchies",$le="Hell Cat",jle="Night Tiger",Yle="Saber Cat",Zle="Huntress",Xle="Cliff Lurker",eie="Tree Lurker",aie="Cave Leaper",tie="Tomb Creeper",nie="Sand Leaper",sie="Tomb Viper",lie="Pit Viper",iie="Salamander",oie="Claw Viper",rie="Serpent Magus",cie="Blood Maggot",die="Giant Lamprey",uie="Devourer",hie="Rock Worm",mie="Sand Maggot",gie="Bush Barb",fie="Razor Spine",vie="Thorn Beast",pie="Spike Fiend",yie="Quill Rat",kie="Hell Clan",bie="Moon Clan",wie="Night Clan",Mie="Death Clan",xie="Blood Clan",Sie="Temple Guard",Lie="Doom Ape",Aie="Jungle Hunter",Cie="Rock Dweller",Iie="Dune Beast",Tie="Flesh Hunter",Bie="Black Rogue",Hie="Dark Stalker",Die="Vile Hunter",Gie="Dark Hunter",Eie="Dark Shape",Fie="Apparition",qie="Specter",Rie="Ghost",Pie="Assailant",Nie="Infidel",Oie="Invader",zie="Marauder",_ie="Sand Raider",Wie="Gargantuan Beast",Vie="Wailing Beast",Qie="Yeti",Uie="Crusher",Kie="Brute",Jie="Cloud Stalker",$ie="Black Vulture",jie="Black Raptor",Yie="Blood Hawk",Zie="Foul Crow",Xie="Plague Bearer",eoe="Ghoul",aoe="Drowned Carcass",toe="Hungry Dead",noe="Zombie",soe="Skeleton",loe="Horror",ioe="Returned",ooe="Burning Dead",roe="Bone Warrior",coe="Damned",doe="Disfigured",uoe="Misshapen",hoe="Tainted",moe="Afflicted",goe="Andariel",foe="Natalya",voe="Drognan",poe="Atma",yoe="Fara",koe="Lysander",boe="Jerhyn",woe="Jerhyn",Moe="Geglash",xoe="Elzix",Soe="Greiz",Loe="Meshif",Aoe="Camel",Coe="Cadaver",Ioe="Preserved Dead",Toe="Embalmed",Boe="Dried Corpse",Hoe="Decayed",Doe="Urdar",Goe="Mauler",Eoe="Gorebelly",Foe="Blunderbore",qoe="Blood Maggot Young",Roe="Giant Lamprey Young",Poe="Devourer Young",Noe="Rock Worm Young",Ooe="Sand Maggot Young",zoe="Blood Maggot Egg",_oe="Giant Lamprey Egg",Woe="Devourer Egg",Voe="Rock Worm Egg",Qoe="Sand Maggot Egg",Uoe="Maggot",Koe="Duriel",Joe="Blood Hawk Nest",$oe="Flying Scimitar",joe="Cloud Stalker Nest",Yoe="Black Raptor Nest",Zoe="Foul Crow Nest",Xoe="Diablo",ere="Baal",are="Mephisto",tre="Cantor",nre="Heirophant",sre="Sexton",lre="Zealot",ire="Faithful",ore="Zakarumite",rre="Black Soul",cre="Burning Soul",dre="Swamp Ghost",ure="Gloam",hre="Warped Shaman",mre="Dark Shaman",gre="Devilkin Shaman",fre="Carver Shaman",vre="Fallen Shaman",pre="Warped One",yre="Dark One",kre="Devilkin",bre="Carver",wre="Fallen",Mre="Returned Archer",xre="Horror Archer",Sre="Burning Dead Archer",Lre="Bone Archer",Are="Corpse Archer",Cre="Skeleton Archer",Ire="Flesh Lancer",Tre="Black Lancer",Bre="Dark Lancer",Hre="Vile Lancer",Dre="Dark Spearwoman",Gre="Flesh Archer",Ere="Black Archer",Fre="Dark Ranger",qre="Vile Archer",Rre="Dark Archer",Pre="The Summoner",Nre="Stygian Doll Shaman",Ore="Soul Killer Shaman",zre="Flayer Shaman",_re="Fetish Shaman",Wre="RatMan Shaman",Vre="Horror Mage",Qre="Burning Dead Mage",Ure="Bone Mage",Kre="Corpse Mage",Jre="Returned Mage",$re="Gargoyle Trap",jre="Blood Raven",Yre="Flavie",Zre="Kaelan",Xre="Meshif",ece="Stygian Watcher",ace="River Stalker",tce="Water Watcher",nce="Stygian Watcher",sce="River Stalker",lce="Water Watcher",ice="Night Marauder",oce="Fire Golem",rce="Iron Golem",cce="Blood Golem",dce="Clay Golem",uce="Blood Maggot Queen",hce="Giant Lamprey Queen",mce="Devourer Queen",gce="Rock Worm Queen",fce="Sand Maggot Queen",vce="Barbed Giant",pce="Razor Beast",yce="Thorn Brute",kce="Spike Giant",bce="Quill Bear",wce="Dark Wanderer",Mce="Dark Wanderer",xce="Hell Slinger",Sce="Night Slinger",Lce="Spear Cat",Ace="Slinger",Cce="Fire Tower",Ice="Lightning Spire",Tce="Pit Lord",Bce="Balrog",Hce="Venom Lord",Dce="Inviso Spawner",Gce="Oblivion Knight",Ece="Mage",Fce="Abyss Knight",qce="Doom Knight",Rce="Fighter",Pce="Maw Fiend",Nce="Corpse Spitter",Oce="Corpulent",zce="Storm Caster",_ce="Strangler",Wce="Doom Caster",Vce="Grotesque Wyrm",Qce="Stygian Dog",Uce="Flesh Beast",Kce="Grotesque",Jce="Stygian Hag",$ce="Flesh Spawner",jce="Rogue Scout",Yce="Blood Wing Nest",Zce="Blood Hook Nest",Xce="Feeder Nest",ede="Sucker Nest",ade="Necromage",tde="Necroskeleton",nde="Trapped Soul",sde="Valkyrie",lde="Decoy",ide="Extra Strong",ode="Extra Fast",rde="Cursed",cde="Magic Resistant",dde="Fire Enchanted",ude="Cold Enchanted",hde="Lightning Enchanted",mde="Mana Burn",gde="Spectral Hit",fde="Teleportation",vde="Stone Skin",pde="Multiple Shots",yde="Thief",kde="Aura Enchanted",bde="Champion",wde="Minion",Mde="Barrel",xde="Lever",Sde="an Exploding Barrel",Lde="Closed Door",Ade="Portal to ",Cde="Open Door",Ide="Blocked Door",Tde="Locked Door",Bde="Cairn Stone",Hde="Cairn Stone",Dde="Cairn Stone",Gde="Cairn Stone",Ede="Cairn Stone",Fde="Cairn Stone",qde="Crate",Rde="Casket",Pde="Cabinet",Nde="Vase",Ode="Tree of Inifuss",zde="Corpse",_de="Dead Rogue",Wde="Dead Rogue",Vde="The Moldy Tome",Qde="Cain's Gibbet",Ude="Mummy Sarcophagus",Kde="Armor Stand",Jde="Weapon Rack",$de="Sarcophagus",jde="Large Urn",Yde="Canopic Jar",Zde="Obelisk",Xde="Undefiled Grave",eue="Shrine",aue="Urn",tue="Waypoint",nue="Well",sue="Bag",lue="Chest",iue="Chest",oue="Locked Chest",rue="Horazon's Journal",cue="shrine",due="Stair",uue="Coffin",hue="Bookshelf",mue="Fire",gue="Chest",fue="Guard Corpse",vue="Bowl",pue="Jug",yue="Ambient Sound",kue="Rat's Nest",bue="Well",wue="Door",Mue="Skeleton",xue="Skullpile",Sue="Cocoon",Lue="Cow",Aue="Shrine",Cue="Bed",Iue="Chest",Tue="Your Private Stash",Bue="Holyshrine",Hue="Body",Due="Compelling Orb",Gue="Basket",Eue="Basket",Fue="Rock Pile",que="Horazon's Journal",Rue="Eunuch",Pue="Portal",Nue="Sarcophagus",Oue="Stash",zue="Suffering Soul",_ue="Tainted Sun Altar",Wue="Hellforge",Vue="Corpsefire",Que="fissure",Uue="Bone Chest",Kue="Casket",Jue="Hung Skeleton",$ue="Pillar",jue="Hydra",Yue="a Turret",Zue="Cost: ",Xue="Repair cost: ",ehe="Sell value: ",ahe="Identify cost: ",the="Item cannot be traded here.",nhe="trade/repair",she="Buy",lhe="Sell",ihe="Heal :",ohe="Repair",rhe="Next Page",che="Previous Page",dhe="Accept Trade",uhe="     Your Gold: ",hhe="Which item should be imbued?",mhe="Yes",ghe="No",fhe="Gold:",vhe="Sell",phe="Buy",yhe="Hire",khe="Identify",bhe="Repair",whe="This Mercenary will replace your current one.",Mhe="Waiting for confirmation of transaction...",xhe="Sync error on transaction, please try again.",She="Invalid item detected, player will be dropped.",Lhe="You do not have enough free space to do that.",Ahe="You already have the maximum number of Mercenaries.",Che="That item has just been traded.",Ihe="You do not have enough room for the gold.",The="Something tells me that you do not have that item.",Bhe="I cannot complete that request.",Hhe="You do not have enough gold for that.",Dhe="She cannot come right now.  Try again later.",Ghe="Your Gold: %d     Hire which Mercenary?",Ehe="There are no Mercenaries left to hire.",Fhe="Life",qhe="Def",Rhe="Lvl",Phe="Cost",Nhe="Damage",Ohe="Fire Arrow",zhe="Cold Arrow",_he="Jab Attack",Whe="Poison Resistant",Vhe="Lightning",Qhe="Cold",Uhe="Fire",Khe="Lightning, Fast Cast",Jhe="Cold, Fast Cast",$he="Fire, Fast Cast",jhe="talk",Yhe="go east",Zhe="go west",Xhe="sail east",eme="sail west",ame="important news",tme="urgent news",nme="pressing matters",sme="important news",lme="urgent matters",ime="tell me more",ome="about the merchants",rme="the townspeople",cme="leave",dme="gossip",ume="trade",hme="hire",mme="gamble",gme="introduction",fme="cancel",vme="ok",pme="CANCEL",yme="Continue",kme="_",bme="Music",wme="Sound",Mme="Gamma",xme="Render",Sme="Previous Menu",Lme="Configure Controls",Ame="Aliza",Cme="Amplisa",Ime="Annor",Tme="Abhaya",Bme="Elly",Hme="Paige",Dme="Basanti",Gme="Blaise",Eme="Kyoko",Fme="Klaudia",qme="Kundri",Rme="Kyle",Pme="Visala",Nme="Elexa",Ome="Floria",zme="Fiona",_me="Gwinni",Wme="Gaile",Vme="Hannah",Qme="Heather",Ume="Iantha",Kme="Diane",Jme="Isolde",$me="Divo",jme="Ithera",Yme="Itonya",Zme="Liene",Xme="Maeko",ege="Mahala",age="Liaza",tge="Meghan",nge="Olena",sge="Oriana",lge="Ryann",ige="Rozene",oge="Raissa",rge="Sharyn",cge="Shikha",dge="Debi",uge="Tylena",hge="Wendy",mge="I feel much stronger now",gge="Socketed",fge="Requirements not met",vge="Unidentified",pge="Charges:",yge="Durability:",kge="Required Strength:",bge="Required Dexterity:",wge="Damage:",Mge="Defense:",xge="Quantity:",Sge="of",Lge="to",Age="One-Hand Damage:",Cge="Two-Hand Damage:",Ige="Throw Damage:",Tge="Smite Damage:",Bge="Required Level:",Hge="Points:",Dge="Heals 35% Life and Mana",Gge="Heals 100% Life and Mana",Ege="to Strength",Fge="to Dexterity",qge="to Vitality",Rge="to Energy",Pge="to Mana",Nge="to Maximum Damage",Oge="to Minimum Damage",zge="to Attack Rating",_ge="Defense",Wge="Fire Resist",Vge="Cold Resist",Qge="Lightning Resist",Uge="Magic Resist",Kge="Poison Resist",Jge="to Maximum Fire Damage",$ge="to Minimum Fire Damage",jge="to Maximum Lightning Damage",Yge="to Minimum Lightning Damage",Zge="to Maximum Cold Damage",Xge="to Minimum Cold Damage",efe="to Life",afe="Attacker Takes Damage of",tfe="Extra Gold from Monsters",nfe="Better Chance of Getting Magic Items",sfe="Knockback",lfe="Elixir of Strength",ife="Elixir of Dexterity",ofe="Elixir of Energy",rfe="Elixir of Vitality",cfe="Elixir of Mana",dfe="Elixir of Life",ufe="Sec. Duration",hfe="Increase Maximum Life",mfe="Increase Maximum Mana",gfe="Increase Maximum Durability",ffe="Enhanced Maximum Damage",vfe="Enhanced Minimum Damage",pfe="Replenish Life",yfe="Replenish Mana",kfe="Heal 1/4 Life",bfe="Heal 1/2 Life",wfe="Restore Full Life",Mfe="Replenish 1/4 Mana",xfe="Replenish 1/2 Life",Sfe="Restore Full Mana",Lfe="Magic Damage Reduced by",Afe="Damage Reduced by",Cfe="Enhanced Defense",Ife="Drain Life",Tfe="Drain Mana",Bfe="Mana stolen per hit",Hfe="Life stolen per hit",Dfe="to Amazon Skill Levels",Gfe="to Paladin Skill Levels",Efe="to Necromancer Skill Levels",Ffe="to Sorceress Skill Levels",qfe="to Barbarian Skill Levels",Rfe="to Light Radius",Pfe="Increased Chance of Blocking",Nfe="Requirements",Ofe="to Fire Skills",zfe="Attacker Takes Lightning Damage of",_fe="to All Skills",Wfe="Freezes target",Vfe="Chance of Open Wounds",Qfe="Invisibility",Ufe="Neutral Invisibility",Kfe="No Mana Healing",Jfe="No Life Healing",$fe="Poison Length Reduced by",jfe="Hit Causes Monster to Flee",Yfe="Heal Stamina Plus",Zfe="Damage Taken Goes To Mana",Xfe="Heal Life Plus",eve="Ignore Target's Defense",ave="Half Poison Duration",tve="Prevent Monster Heal",nve="Half Freeze Duration",sve="Bonus to Attack Rating",lve="to Monster Defense Per Hit",ive="Damage to Demons",ove="Damage to Undead",rve="Regenerate Mana",cve="to Maximum Poison Damage",dve="to Minimum Poison Damage",uve="to Attack Rating against Demons",hve="to Attack Rating against Undead",mve="Slightly Increased Attack Speed",gve="Increased Attack Speed",fve="Greatly Increased Attack Speed",vve="Fast Hit Recovery",pve="Faster Hit Recovery",yve="Fastest Hit Recovery",kve="Fast Run/Walk",bve="Faster Run/Walk",wve="Fastest Run/Walk",Mve="Fast Cast Rate",xve="Faster Cast Rate",Sve="Fastest Cast Rate",Lve="Fast Block Rate",Ave="Faster Block Rate",Cve="Fastest Block Rate",Ive="Throwable",Tve="Damage",Bve="Chance of Crushing Blow",Hve="Maximum Stamina",Dve="Kick Damage",Gve="to Mana after each Kill",Eve="Fire Absorb",Fve="Fire Absorb",qve="Lightning Absorb",Rve="Lightning Absorb",Pve="Magic Absorb",Nve="Magic Absorb",Ove="Cold Absorb",zve="Cold Absorb",_ve="Target Defense",Wve="Extra Bloody",Vve="Deadly Strike",Qve="Slows Target by",Uve="Blessed Aim",Kve="Defiance",Jve="to Maximum Fire Resist",$ve="to Maximum Cold Resist",jve="to Maximum Lightning Resist",Yve="to Maximum Magic Resist",Zve="to Maximum Poison Resist",Xve="Cannot Be Frozen",e5e="Defense vs. Missile",a5e="Defense vs. Melee",t5e="Life after each Demon Kill",n5e="Hit Blinds Target",s5e="Slower Stamina Drain",l5e="Chance to Reanimate Target",i5e="Piercing Attack",o5e="Fires Magic Arrows",r5e="Fires Explosive Arrows or Bolts",c5e="All Resistances +%d",d5e="+%d to All Skill Levels",u5e="+%d fire damage",h5e="Adds %d-%d fire damage",m5e="+%d cold damage",g5e="Adds %d-%d cold damage",f5e="+%d lightning damage",v5e="Adds %d-%d lightning damage",p5e="+%d magic damage",y5e="Adds %d-%d magic damage",k5e="+%d poison damage over %d seconds",b5e="Adds %d-%d poison damage over %d seconds",w5e="+%d damage",M5e="Adds %d-%d damage",x5e="Enhanced damage",S5e="Can Be Inserted in Socketed",L5e="Weapons, Shields or Helms",A5e=`Helm: adds to strength
Shield: adds to shield's defense rating
Weapon: adds to attack rating
`,C5e=`Helm: adds to maximum mana
Shield: adds resistance to cold
Weapon: adds cold damage to attack
`,I5e=`Helm: adds to dexterity
Shield: adds resistance to poison
Weapon: adds poison damage to attack
`,T5e=`Helm: adds to maximum life
Shield: adds resistance to fire
Weapon: adds fire damage to attack
`,B5e=`Helm: adds to attack rating
Shield: adds to all resistances
Weapon: adds to damage vs. undead
`,H5e=`Helm: adds to chance to find magic items
Shield: adds resistance to lightning
Weapon: adds lightning damage to attack
`,D5e=`Helm: adds mana and life regeneration
Shield: adds attacker takes damage
Weapon: adds mana and life steal to attack
`,G5e=" dropped due to timeout.",E5e=" dropped due to errors.",F5e="%s joined our world. Diablo's minions grow stronger.",q5e="%s left our world. Diablo's minions weaken.",R5e="%s(%s) joined our world. Diablo's minions grow stronger.",P5e="%s(%s) left our world. Diablo's minions weaken.",N5e=" is not in the game.",O5e=" is not logged in.",z5e=" was slain by ",_5e=" was slain by ",W5e=" was slain.",V5e="Wrong type of Gem.",Q5e="Realm is going down in %d minutes.",U5e=" is not listening to you.",K5e="Player",J5e=" whispers: ",$5e=" shouts: ",j5e=" )",Y5e="ÿc0You whispered to ÿc1%sÿc0: %s",Z5e="Working...",X5e="Null Shrine",epe="Refilling Shrine",ape="Health Shrine",tpe="Mana Shrine",npe="Health Exchange Shrine",spe="Mana Exchange Shrine",lpe="Armor Shrine",ipe="Combat Shrine",ope="Resist Fire Shrine",rpe="Resist Cold Shrine",cpe="Resist Lightning Shrine",dpe="Resist Poison Shrine",upe="Skill Shrine",hpe="Mana Recharge Shrine",mpe="Stamina Shrine",gpe="Experience Shrine",fpe="Enirhs Shrine",vpe="Portal Shrine",ppe="Gem Shrine",ype="Fire Shrine",kpe="Monster Shrine",bpe="Exploding Shrine",wpe="Poison Shrine",Mpe="You feel nothing.",xpe="You feel refreshed.",Spe="You feel healthy.",Lpe="You feel recharged.",Ape="You feel incredibly healthy.",Cpe="You feel infused with energy.",Ipe="Your skin hardens.",Tpe="You feel ready for battle.",Bpe="You no longer fear fire.",Hpe="You no longer fear cold.",Dpe="You no longer fear lightning.",Gpe="You no longer fear poison.",Epe="You feel more skillful.",Fpe="Your spiritual force recovers quickly.",qpe="The weight of the world seems lighter.",Rpe="Your experience teaches you well.",Ppe="Your sense of identity is subtly changed.",Npe="The freedom to go home...",Ope="A marvelous gem...",zpe="A fiery death...",_pe="Death's advocate approaches.",Wpe="A circle of flame...",Vpe="A circle of death...",Qpe="Activate the stones in",Upe="this order.",Kpe="The Horadric Malus has been returned to the Monastery.",Jpe="The scroll of Inifuss has been returned to the Tree.",$pe="The minions of Diablo have taken back Lam Esen's Tome.",jpe="The Townspeople",Ype="introduction",Zpe="Act 1 Prologue",Xpe="Den of Evil",e1e="Sisters' Burial Grounds",a1e="Tools of the Trade",t1e="The Search for Cain",n1e="The Forgotten Tower",s1e="Sisters to the Slaughter",l1e="Speech",i1e="New Entry",o1e="Quest Status",r1e="No active quests.",c1e="Invalid Quest Value",d1e="Invalid State",u1e="Quest completed.",h1e="You cannot complete this quest in this game. Another player completed it first.",m1e="You completed this quest in a previous game.",g1e="You cannot complete this quest in this game. You can complete it by creating a new game.",f1e="You cannot complete this quest in this game. You can complete it by creating a new game or joining a different game.",v1e="You cannot complete this quest in this game. Cain was rescued without your help.",p1e="You must be level 8 to complete this quest. You can complete it by creating a new game or joining a different game when you are at least level 8.",y1e="The person with the malus quit the game.",k1e="The person with the horadric scroll quit the game.",b1e="Look for the Den in the wilderness outside the Rogues' Camp.",w1e="Kill all the monsters in the Den.",M1e="",x1e="Monsters remaining: ",S1e="One monster left.",L1e="Return to Akara for a reward.",A1e="Look for Blood Raven in the Burial Grounds next to the Cold Plains.",C1e="Kill Blood Raven.",I1e="Return to Kashya for a reward.",T1e="Go through the Underground Passage to the Dark Wood, search for the Tree of Inifuss, and recover the Scroll.",B1e="Take the Scroll of Inifuss to Akara.",H1e="Go to the Cairn Stones in the Stony Field. Touch the Stones in the order found on the Scroll of Inifuss. Enter the portal to Tristram, but beware the danger that lies ahead.",D1e="Find and rescue Deckard Cain.",G1e="Cain has been rescued and is now at the Rogue Encampment.",E1e="Visit Cain and Akara in the Rogue Encampment.",F1e="Talk to Akara for a reward.",q1e="Look for the Tower in the Black Marsh beyond the Dark Wood.",R1e="Explore the cellar dungeons beneath the Tower ruins.",P1e="Explore the cellar dungeons beneath the Tower ruins.",N1e="Dispose of the evil Countess.",O1e="Look for the Horadric Malus in the Monastery Barracks. Beware of the Smith that guards it.",z1e="Return the Horadric Malus to Charsi.",_1e="Charsi will imbue an item with magical power.",W1e="Find Andariel's Lair in the depths of the Monastery Catacombs.",V1e="Kill Andariel.",Q1e="Return to Warriv to take the Caravan East.",U1e="Return to Warriv to take the Caravan East.",K1e="None",J1e="Mouse 1",$1e="Mouse 2",j1e="Cancel",Y1e="Mouse 3",Z1e="Mouse 4",X1e="Mouse 5",e2e="Mouse Wheel Up",a2e="Mouse Wheel Down",t2e="Kana",n2e="Junja",s2e="Final",l2e="Kanji",i2e="Escape",o2e="Convert",r2e="Non-Convert",c2e="Accept",d2e="Mode Change",u2e="Left",h2e="Up",m2e="Right",g2e="Down",f2e="Select",v2e="Execute",p2e="Left Windows",y2e="Right Windows",k2e="Apps Menu",b2e="Num Lock",w2e="Backspace",M2e="Tab",x2e="Clear",S2e="Enter",L2e="Shift",A2e="Ctrl",C2e="Alt",I2e="Pause",T2e="Caps Lock",B2e="Space",H2e="Page Up",D2e="Page Down",G2e="End",E2e="Home",F2e="P - Tell Ken",q2e="Print Screen",R2e="Insert",P2e="Delete",N2e="Help",O2e="Num Pad 0",z2e="Num Pad 1",_2e="Num Pad 2",W2e="Num Pad 3",V2e="Num Pad 4",Q2e="Num Pad 5",U2e="Num Pad 6",K2e="Num Pad 7",J2e="Num Pad 8",$2e="Num Pad 9",j2e="Num Pad *",Y2e="Num Pad +",Z2e="Separator",X2e="Num Pad -",eye="Num Pad .",aye="Num Pad /",tye="F1",nye="F2",sye="F3",lye="F4",iye="F5",oye="F6",rye="F7",cye="F8",dye="F9",uye="F10",hye="F11",mye="F12",gye="F13",fye="F14",vye="F15",pye="F16",yye="F17",kye="F18",bye="F19",wye="F20",Mye="F21",xye="F22",Sye="F23",Lye="F24",Aye="Scroll Lock",Cye=";",Iye="=",Tye=",",Bye="-",Hye=".",Dye="/",Gye="~",Eye="[",Fye="\\",qye="]",Rye="'",Pye="m3",Nye="m4",Oye="m5",zye="mwu",_ye="mwd",Wye="kna",Vye="jun",Qye="fin",Uye="kji",Kye="esc",Jye="con",$ye="ncn",jye="acc",Yye="mdc",Zye="lft",Xye="rgt",eke="Dwn",ake="Slt",tke="exc",nke="lwn",ske="rwn",lke="apm",ike="nml",oke="bks",rke="clr",cke="ent",dke="sft",uke="ctl",hke="pse",mke="clk",gke="spc",fke="pup",vke="pdn",pke="hme",yke="psn",kke="ins",bke="del",wke="hel",Mke="np0",xke="np1",Ske="np2",Lke="np3",Ake="np4",Cke="np5",Ike="np6",Tke="np7",Bke="np8",Hke="np9",Dke="slk",Gke="Option",Eke="Command",Fke="Opt",qke="Cmd",Rke="Function",Pke="Key/Button One",Nke="Key/Button Two",Oke="Character Screen",zke="Inventory Screen",_ke="Party Screen",Wke="Message Log",Vke="Quest Log",Qke="Chat",Uke="Automap",Kke="Center Automap",Jke="Micromap",$ke="Help Screen",jke="Skill Tree",Yke="Skill Speed Bar",Zke="Skill 1",Xke="Skill 2",ebe="Skill 3",abe="Skill 4",tbe="Skill 5",nbe="Skill 6",sbe="Skill 7",lbe="Skill 8",ibe="Select Previous Skill",obe="Select Next Skill",rbe="Show Belt",cbe="Use Belt 1",dbe="Use Belt 2",ube="Use Belt 3",hbe="Use Belt 4",mbe="Use Belt 5",gbe="Use Belt 6",fbe="Use Belt 7",vbe="Use Belt 8",pbe="Use Belt 9",ybe="Use Belt 10",kbe="Use Belt 11",bbe="Use Belt 12",wbe="Say 'Help'",Mbe="Say 'Follow me'",xbe="Say 'This is for you'",Sbe="Say 'Thanks'",Lbe="Say 'Sorry'",Abe="Say 'Bye'",Cbe="Say 'Now you die'",Ibe="Run",Tbe="Toggle Run/Walk",Bbe="Stand Still",Hbe="Show Items",Dbe="Clear Screen",Gbe="Screen Shot",Ebe="Default",Fbe="Accept",qbe="Cancel",Rbe="No keys were assigned because you neglected to assign one or more keys.",Pbe="Keys assigned.",Nbe="Cannot assign to mouse button",Obe="Cannot assign to mouse wheel",zbe="Cannot assign to this key",_be="Clear key",Wbe="Clear Messages",Vbe="Show Portraits",Qbe="Fade Automap",Ube="Names on Automap",Kbe="Party on Automap",Jbe="New Stats",$be="New Skill",jbe="Warps",Ybe="No Warps",Zbe="Choose your destination",Xbe="No Other Waypoints Activated",ewe="MAX",awe="MAX",twe="ÿc",nwe=" ",swe="-",lwe=":",iwe=`
`,owe="|",rwe="/",cwe="%",dwe="+",uwe="to",hwe="Players",mwe="Dwell",gwe="Larva",fwe="Barbarian",vwe="Paladin",pwe="Necromancer",ywe="Sorceress",kwe="Amazon",bwe="Druid",wwe="Assassin",Mwe="Nest",xwe="No Party",Swe="Party  #",Lwe="imbue",Awe="No Magic, Socketed, Rare, Unique, or Set Items. No Jewelry or Throwing Weapons.",Cwe="Use Gem",Iwe="Identify Items",Twe="Identify Items: ",Bwe="Cannot repair unidentified items",Hwe=" permits you to loot his corpse.",Dwe=" permits you to loot her corpse.",Gwe=" has expressed hostility towards you.",Ewe=" is no longer hostile towards you.",Fwe=" invites you to ally against the forces of evil.",qwe=" has cancelled the party invite.",Rwe=" has joined your party to fight the forces of evil.",Pwe="You are now allied with ",Nwe=" has left your party.",Owe="How much Gold would you like to drop?",zwe="Drop Gold",_we="Message Log",Wwe="Armor",Vwe="Weapons",Qwe="Magic",Uwe="Misc",Kwe="trade",Jwe="accept trade",$we="agree to trade",jwe="asking other player to trade",Ywe=" is busy",Zwe="One of you has too much stuff",Xwe="How much Gold would you like to offer?",eMe="You must wait a short time to trade with that player.",aMe=": ",tMe="How much Gold would you like to deposit?",nMe="How much Gold would you like to withdraw?",sMe="Gold Max: %d",lMe="Golem",iMe="Skeleton",oMe="Mage",rMe="Revived",cMe="Valkyrie",dMe="Level",uMe="Experience",hMe="Next Level",mMe="Strength",gMe="Damage",fMe="Dexterity",vMe=`%s
Attack Rating`,pMe="Defense",yMe=`%s
Rating`,kMe="Vitality",bMe="Stamina",wMe="Life",MMe="Energy",xMe="Mana",SMe=`Fire
Resistance`,LMe=`Cold
Resistance`,AMe=`Lightning
Resistance`,CMe=`Poison
Resistance`,IMe="Stat Points",TMe="Remaining",BMe="Mace Class",HMe="Axe Class",DMe="Sword Class",GMe="Dagger Class",EMe="Equip to Throw",FMe="Javelin Class",qMe="Spear Class",RMe="Bow Class",PMe="Staff Class",NMe="Polearm Class",OMe="Crossbow Class",zMe="Fastest Attack Speed",_Me="Very Fast Attack Speed",WMe="Fast Attack Speed",VMe="Normal Attack Speed",QMe="Slow Attack Speed",UMe="Very Slow Attack Speed",KMe="Slowest Attack Speed",JMe="(Necromancer Only)",$Me="(Paladin Only)",jMe="(Sorceress Only)",YMe="Damage to Undead",ZMe="Gold",XMe="Invite this player ",exe="to join your party.",axe="Accept this player's ",txe="invitation to form a party.",nxe="Cancel your invitation",sxe="to this player.",lxe="Click to go hostile",ixe="with this player.",oxe="Click to go neutral",rxe="with this player.",cxe="Click to allow this player",dxe="to loot your corpse.",uxe="Click to disallow this player",hxe="from looting your corpse.",mxe="Click to allow this player",gxe="to hear you.",fxe="Click to stop this player",vxe="from hearing you.",pxe="Click to squelch this player.",yxe="Click to un-squelch this player.",kxe="Remove yourself from party.",bxe="Must be toggled in town.",wxe="Both players must be at least level 9",Mxe="to go hostile with each other",xxe="Withdraw",Sxe="Drop Gold",Lxe="Deposit",Axe="Offer",Cxe="Gold in Stash:",Ixe="Trade Gold",Txe="Cancel",Bxe="ACCEPT TRADE",Hxe="The True Tomb is Hidden.",Dxe=" has items in his box.",Gxe="You have items in your box.",Exe=" - Free for you",Fxe="Act 1",qxe="Act 2",Rxe="Act 3",Pxe="Act 4",Nxe="Level",Oxe="cancel",zxe="close",_xe="Close",Wxe="In your party",Vxe="In a party",Qxe="INVITE",Uxe="ACCEPT",Kxe="LEAVE",Jxe="CLOSE",$xe="Amazon",jxe="Sorceress",Yxe="Barbarian",Zxe="Necromancer",Xxe="Paladin",eSe="Average chance to hit",aSe="level %d monster: %d%%",tSe="Average chance a level %d",nSe="monster will hit you: %d%%",sSe="Experience: %u / %u",lSe="Stamina: %d / %d",iSe="Life: %d / %d",oSe="Mana: %d / %d",rSe="Open Mini Panel",cSe="Close Mini Panel",dSe="Character",uSe="Inventory",hSe="Skill Tree",mSe="Party Screen",gSe="Automap",fSe="Message Log",vSe="Quest Log",pSe="Game Menu (Esc)",ySe="Help",kSe=" (%s)",bSe="Run",wSe="Walk",MSe="Game: ",xSe="Password: ",SSe="Difficulty: %s",LSe="Quantity : %d",ASe="Level ",CSe=" percent",ISe="Required Level : ",TSe="Quantity ",BSe="Char Info",HSe="Quests",DSe="Unused",GSe="Inventory",ESe="Menu",FSe="Automap",qSe="Unused",RSe="Skill Tree",PSe="Your stash is full.",NSe="Diablo II Help",OSe="Hold Down <%s> to Run",zSe="Hold down <%s> to highlight items on the ground",_Se="Hold down <%s> to attack while standing still",WSe="Hit <%s> to toggle the automap on and off",VSe="Hit <Esc> to bring up the Game Menu",QSe="Hit <Enter> to go into chat mode",USe="Use F1-F8 to set your Left or Right Mouse Button Skills.",KSe="Hit <%s> to toggle this screen open and closed",JSe="Life Orb",$Se="Left Mouse-",jSe="Button Skill",YSe="(Click to Change)",ZSe="Right Mouse-",XSe="Run/Walk",eLe="Toggle",aLe="Stamina Bar",tLe="Experience",nLe="Bar",sLe="Mini-Panel",lLe="(opens Character,",iLe="Inventory, and",oLe="other screens)",rLe="Belt",cLe="Mana Orb",dLe="",uLe="Skill Tab 1",hLe="Skill Tab 2",mLe="Skill Tab 3",gLe="Skill",fLe="Choices",vLe="Remaining",pLe="Skills",yLe="Spells",kLe="Javelin",bLe="and Spear",wLe="Passive",MLe="and Magic",xLe="Bow and",SLe="Crossbow",LLe="Defensive",ALe="Auras",CLe="Offensive",ILe="Combat",TLe="Summoning",BLe="Poison",HLe="and Bone",DLe="Curses",GLe="Warcries",ELe="Combat",FLe="Masteries",qLe="Cold",RLe="Lightning",PLe="Fire",NLe="",OLe="Next Level",zLe="Current Skill Level: ",_Le="Mana Cost: ",WLe="Damage: ",VLe="Fire Damage: ",QLe="Cold Damage: ",ULe="Lightning Damage: ",KLe="Poison Damage: ",JLe=" arrows",$Le="To Attack Rating: ",jLe=" hits",YLe="-",ZLe="Cold Length: ",XLe="Poison Length: ",e0e=" second",a0e=" seconds",t0e="First Level",n0e="Radius: ",s0e=" squares",l0e="Duration: ",i0e="Defense: ",o0e="Attack: ",r0e=" percent",c0e=" percent chance",d0e="Enemy Defense: ",u0e=" yards",h0e=" bolts",m0e=" teeth",g0e="Freeze Length: ",f0e="Attack Bonus: ",v0e="Defense Bonus: ",p0e="Fire Damage",y0e="Weakens Enemies by ",k0e=" per second",b0e="Continuous Fire Damage: ",w0e=" yard",M0e="Damage Taken: ",x0e="Target's Damage: ",S0e="Magic Damage: ",L0e="Absorbs ",A0e=" damage",C0e="Life: ",I0e=" skeleton mage",T0e=" skeleton magi",B0e="Golem Level: ",H0e=" percent of corpse Life",D0e=" damage to Self",G0e="Stun Length: ",E0e=" percent of shield strength",F0e="Heals: ",q0e="Resist Fire: ",R0e="Resist Cold: ",P0e="Resist Lightning: ",N0e="Resist All: ",O0e=" percent damage returned",z0e="Range: ",_0e="Target's Attack: ",W0e="Enemy runs up to ",V0e="Enemy runs for ",Q0e=" per target",U0e="Multiple Hits",K0e="Freezes for ",J0e="over ",$0e=" poison damage",j0e="Chance of losing durability: ",Y0e="Target stutters for ",Z0e="Ranged attacks slowed to ",X0e="Average ",eAe="Stamina Recovery Rate: ",aAe="Velocity: ",tAe="Stamina Bonus: ",nAe="Releases ",sAe=" charged bolts",lAe="Duration reduced by ",iAe="Elemental Damages: ",oAe="Chance uninterruptable ",rAe="Enemies slowed ",cAe="Remains target for ",dAe=" percent of attack damage",uAe="Converts ",hAe=" percent damage to life",mAe="Fire Duration: ",gAe="Fire Explosion Damage: ",fAe="Lightning Bolt Damage: ",vAe="Reduces curse duration by ",pAe="Attacks up to ",yAe=" targets",kAe="Mana Recovery Rate: ",bAe="Walk/Run Speed: ",wAe="Resistances: ",MAe="Holy Bolt Damage: ",xAe=" mana per knockback",SAe=" skeleton total",LAe="Skeletons: ",AAe="Magi: ",CAe="Monsters: ",IAe="Lowers Maximum Resistances ",TAe="Chance to convert: ",BAe="Max Life: ",HAe="Max Mana: ",DAe="Max Stamina: ",GAe=" percent fire damage",EAe=" monster",FAe=" monsters",qAe="Attack Speed: ",RAe="Life/Mana Recovered: ",PAe=" points",NAe="Chance to redeem soul: ",OAe="Successful Blocking: ",zAe=" per yard",_Ae="Thorns damage",WAe="Hydra Fire Damage: ",VAe="Resist Elemental Damage: ",QAe="Minimum Mana Required to Cast: ",UAe="Maximum Level Reached",KAe=" (item)",JAe="You have been granted this skill by an item",$Ae="You have not learned this skill yet",jAe="Attack",YAe="normal attack",ZAe="normal attack",XAe="Attack",eCe="Kick",aCe="kick target",tCe="kick target",nCe="kick target",sCe="Throw",lCe="throw equipped item",iCe="throw equipped item",oCe="Throw",rCe="Unsummon",cCe="releases a summoned creature",dCe=`of one of your creatures
relinquishes control`,uCe="Unsummon",hCe="Left Hand Throw",mCe="throw left hand item",gCe="throw left hand item",fCe="Left Throw",vCe="Left Hand Swing",pCe="swing left hand weapon",yCe="swing left hand weapon",kCe="Left Swing",bCe="Magic Arrow",wCe="creates a magical arrow",MCe=`that does extra damage
creates a magical arrow or bolt`,xCe="Magic Arrow",SCe="Fire Arrow",LCe="enchants arrows with flame",ACe=`always hits
or bolts with fire
magically enhances your arrows`,CCe="Fire Arrow",ICe="Inner Sight",TCe="illuminates and weakens nearby monsters",BCe=`for you and your party
making them easier to hit
illuminates nearby enemies`,HCe="Inner Sight",DCe="Critical Strike",GCe="passive - chance of doing double damage",ECe="passive - your attacks have a chance to do double damage",FCe="Critical Strike",qCe="Jab",RCe="rapid attacks with a thrusting weapon",PCe=`using a javelin or spear class weapon
attacks with a series of rapid thrusts`,NCe="Jab",OCe="Cold Arrow",zCe="enchants arrows to slow targets",_Ce=`always hits
cold arrows only do half of their regular damage
by adding cold damage and a slowing effect
magically enhances your arrows or bolts`,WCe="Cold Arrow",VCe="Multiple Shot",QCe="fires multiple arrows",UCe=`or bolt into many
magically splits one arrow`,KCe="Multiple Shot",JCe="Dodge",$Ce="passive - dodges melee attacks",jCe=`or standing still
a melee attack when attacking
passive - you have a chance to dodge`,YCe="Dodge",ZCe="Power Strike",XCe="adds lightning damage",e3e=`javelin and spear class weapons
adds lightning damage to attacks with`,a3e="Power Strike",t3e="Poison Javelin",n3e="adds poison damage",s3e=`to leave a trail of poison clouds
magically enhances your javelin`,l3e="Poison Javelin",i3e="Exploding Arrow",o3e="enchant arrows to explode",r3e=`always hits
contact, damaging all nearby enemies
enchants an arrow or bolt that explodes on`,c3e="Exploding",d3e="Slow Missiles",u3e="slows ranged attacks of enemies",h3e="illuminates nearby enemies and slows their ranged attacks",m3e="Slow Missiles",g3e="Avoid",f3e="passive - dodges missiles",v3e=`when attacking or standing still
passive - you have a chance to dodge enemy missiles`,p3e="Avoid",y3e="Impale",k3e="increases damage but degrades weapon",b3e="increases attack damage but rapidly degrades the weapon",w3e="Impale",M3e="Lightning Bolt",x3e="changes a thrown javelin into lightning",S3e="magically converts your javelin into a bolt of lightning",L3e="Lightning Bolt",A3e="Ice Arrow",C3e="enchants arrows to freeze enemies",I3e=`always hits
to freeze your enemies
magically enhances your arrow or bolt`,T3e="Ice Arrow",B3e="Guided Arrow",H3e="enchants arrows to seek enemies",D3e=`always hits
or seek one of its own
to track your target
enhances your arrows and bolts`,G3e="Guided Arrow",E3e="Penetrate",F3e="passive - increases attack rating",q3e="passive - increases your attack rating",R3e="Penetrate",P3e="Charged Strike",N3e="enchants thrusting weapons with charged bolts",O3e=`and releases charged bolts upon impact
adds lightning damage to javelin and spear class weapons`,z3e="Charged Strike",_3e="Plague Javelin",W3e="enchants javelins with poison explosions",V3e=`expanding clouds of poison upon impact
magically enhances your javelin to release`,Q3e="Plague Javelin",U3e="Strafe",K3e="enchants arrows to strike multiple targets",J3e=`that target multiple nearby enemies
magically splits one arrow into several`,$3e="Strafe",j3e="Immolation Arrow",Y3e="enchants arrows to burn enemies",Z3e=`always hits
creates a pyre upon impact
cause severe fire damage and
enhances arrows or bolts to`,X3e="Immolation",eIe="Decoy",aIe="creates a duplicate of yourself",tIe=`that draws fire from enemies
creates a duplicate of yourself`,nIe="Decoy",sIe="Evade",lIe="passive - dodges when moving",iIe=`when walking or running
a melee or missile attack
passive - you have a chance to dodge`,oIe="Evade",rIe="Fend",cIe="attacks all adjacent targets",dIe="attacks all adjacent targets",uIe="Fend",hIe="Freezing Arrow",mIe="enchants arrows to freeze multiple monsters",gIe=`always hits
to freeze entire groups of monsters
magically enhances an arrow or bolt`,fIe="Freezing Arrow",vIe="Valkyrie",pIe="summons a powerful Valkyrie ally",yIe="summons a powerful Valkyrie ally",kIe="Valkyrie",bIe="Pierce",wIe="passive - missiles may continue through enemies",MIe=`pass through enemies that they hit
passive - your missiles have a chance to`,xIe="Pierce",SIe="Lightning Strike",LIe="enchants thrusting weapons with chain lightning",AIe=`and releases chain lightning upon impact
adds lightning damage to javelin and spear class weapons`,CIe="Light'ng Strike",IIe="Lightning Fury",TIe="a lightning bolt that splits on impact",BIe=`bolt of lightning that splits on impact
changes a thrown javelin into a powerful`,HIe="Lightning Fury",DIe="Fire Bolt",GIe="creates a missile of flame",EIe="creates a magical flaming missile",FIe="Fire Bolt",qIe="Warmth",RIe="passive - increases mana recovery rate",PIe="passive - increases the rate at which you recover mana",NIe="Warmth",OIe="Charged Bolt",zIe="creates multiple deadly sparks",_Ie=`bolts of electrical energy
creates multiple, randomly directed`,WIe="Charged Bolt",VIe="Ice Bolt",QIe="creates a shard of ice that slows enemies",UIe=`that damages and slows your enemies
creates a magical bolt of ice`,KIe="Ice Bolt",JIe="Frozen Armor",$Ie="improves defense and freezes attacker",jIe=`and freezes enemies that hit you
increases your defense rating`,YIe="Frozen Armor",ZIe="Inferno",XIe="creates a jet of flame",eTe=`to scorch your enemies
creates a continuous jet of flame`,aTe="Inferno",tTe="Static Field",nTe="creates a field of deadly sparks",sTe=`of all nearby enemies
creates an electrical field that reduces life`,lTe="Static Field",iTe="Telekinesis",oTe="moves objects with your mind",rTe=`and knock back enemies
pick up items, use objects,
uses the power of your mind to`,cTe="Telekinesis",dTe="Frost Nova",uTe="creates a freezing ring",hTe=`and slows all nearby enemies
creates an expanding ring of ice that damages`,mTe="Frost Nova",gTe="Ice Blast",fTe="creates an ice bolt that freezes enemies",vTe=`damages and freezes your enemy
creates a magical sphere of ice that`,pTe="Ice Blast",yTe="Blaze",kTe="creates fire in your wake",bTe=`in your wake to scorch your enemies
creates a wall of fire`,wTe="Blaze",MTe="Fire Ball",xTe="creates an explosive sphere of fire",STe=`to engulf your enemies
creates an explosive sphere of fiery death`,LTe="Fire Ball",ATe="Nova",CTe="creates an electrically charged ring",ITe=`to shock nearby enemies
creates an expanding ring of lightning`,TTe="Nova",BTe="Lightning",HTe="creates a bolt of lightning",DTe=`to lay waste to your enemies
creates a powerful lightning bolt`,GTe="Lightning",ETe="Shiver Armor",FTe="freezes and damages attackers",qTe=`freezes and damages enemies that hit you
increases your defense rating`,RTe="Shiver Armor",PTe="Fire Wall",NTe="creates a wall of flame",OTe=`blocks or burns your enemies
creates a wall of flame that`,zTe="Fire Wall",_Te="Enchant",WTe="enchants melee or ranged weapons with fire",VTe=`adds one-third fire damage to ranged weapons
adds fire damage to melee weapons
enchants equipped weapon of targeted character or minion`,QTe="Enchant",UTe="Chain Lightning",KTe="creates a bolt of lightning that arcs",JTe=`arcs through several targets
creates a bolt of lightning that`,$Te="Chain Lightning",jTe="Teleport",YTe="instantly moves to destination",ZTe="instantly moves to a destination within your line of sight",XTe="Teleport",e4e="Glacial Spike",a4e="creates a freezing comet of ice",t4e=`that freezes or kills nearby enemies
creates a magical ice comet`,n4e="Glacial Spike",s4e="Meteor",l4e="summons a meteor from the heavens",i4e=`to crush and incinerate your enemies
summons a meteor from the heavens`,o4e="Meteor",r4e="Thunder Storm",c4e="summons a powerful tempest",d4e=`your enemies with bolts of lightning
summons a deadly thunderstorm that strikes`,u4e="Thunder Storm",h4e="Energy Shield",m4e="uses your mana as a shield",g4e=`instead of health when you take damage
creates a magical shield that consumes mana`,f4e="Energy Shield",v4e="Blizzard",p4e="summons a massive ice storm",y4e="summons massive shards of ice to destroy your enemies",k4e="Blizzard",b4e="Chilling Armor",w4e="retaliates against ranged attackers",M4e=`against ranged attackers
increases defense and discharges an ice bolt in retaliation`,x4e="Chill'n Armor",S4e="Fire Mastery",L4e="passive - increases fire damage",A4e="passive - increases all damage caused by your fire spells",C4e="Fire Mastery",I4e="Hydra",T4e="summons multi-headed fire beast",B4e=`to reduce your enemies to ashes
summons a multi-headed beast of flame`,H4e="Hydra",D4e="Lightning Mastery",G4e="passive - reduces cost of lightning spells",E4e=`to cast your lightning spells
passive - reduces the mana required`,F4e="Lightning Mastery",q4e="Frozen Orb",R4e="creates a globe of frozen death",P4e=`to lay waste to your enemies
creates a magical globe that sprays a torrent of ice bolts`,N4e="Frozen Orb",O4e="Cold Mastery",z4e="passive - cold attacks become piercing",_4e=`by piercing enemies' resistances to cold
passive - increases the damage of your cold attacks`,W4e="Cold Mastery",V4e="Amplify Damage",Q4e="curse - amplifies damage taken by enemies",U4e=`the non-magic damage they receive
curses a group of enemies, increasing`,K4e="Amplify",J4e="Teeth",$4e="fires barbed teeth",j4e="fires a barrage of summoned barbed teeth",Y4e="Teeth",Z4e="Bone Armor",X4e="creates a damage absorbing bone shell",eBe=`that absorbs melee damage
creates an orbiting shield of bone`,aBe="Bone Armor",tBe="Skeleton Mastery",nBe="passive - better skeletons and revived creatures",sBe=`of raised skeletons and revived creatures
passive - increases life and damage`,lBe="Skeleton Mastery",iBe="Raise Skeleton",oBe="reanimate skeletal warrior from target corpse",rBe=`fights for you
this raises a skeleton warrior that
cast on the corpse of a slain monster,`,cBe="Raise Skeleton",dBe="Dim Vision",uBe="curse - reduces vision of monsters",hBe=`reducing their vision radius
curses a group of monsters,`,mBe="Dim Vision",gBe="Weaken",fBe="curse - reduces damage done by enemies",vBe=`reducing the amount of damage they inflict
curses a group of enemies,`,pBe="Weaken",yBe="Poison Dagger",kBe="next dagger attack poisons target",bBe="adds poison to your dagger attacks",wBe="Poison Dagger",MBe="Corpse Explosion",xBe="turns a corpse into a bomb",SBe=`it explodes, damaging nearby enemies
cast on the corpse of a slain monster,`,LBe="Corpse Exp.",ABe="Clay Golem",CBe="creates a golem to fight for you",IBe=`to fight by your side
creates a golem from the earth`,TBe="Clay Golem",BBe="Iron Maiden",HBe="curse - enemies damage themselves",DBe=`to damage themselves when damaging others
curses a group of enemies, causing them`,GBe="Iron Maiden",EBe="Terror",FBe="curse - monsters run away in fear",qBe=`causing them to flee in terror
curses a group of monsters,`,RBe="Terror",PBe="Bone Wall",NBe="creates an impassable barrier",OBe=`of bone and debris
creates an impassable barrier`,zBe="Bone Wall",_Be="Golem Mastery",WBe="Enhances Speed and Life of Golems",VBe="Enhances Speed and Life of all your Golems",QBe="Golem Mastery",UBe="Raise Skeletal Mage",KBe="reanimate skeletal mage from target corpse",JBe=`fights for you
this raises a skeleton mage that
cast on the corpse of a slain monster,`,$Be="Skeletal Mage",jBe="Confuse",YBe="curse - monster attacks random targets",ZBe="curses a monster to force it to attack random targets",XBe="Confuse",eHe="Life Tap",aHe="curse - enemies return life to attacker",tHe=`damaging them gives the attacker life
curses a group of monsters so that`,nHe="Life Tap",sHe="Poison Explosion",lHe="turns a corpse into a poison gas bomb",iHe=`that poisons nearby monsters
toxic gas is released
cast on the corpse of a slain monster,`,oHe="Poison Exp.",rHe="Bone Spear",cHe="summons a deadly spike of bone",dHe="summons a deadly spike of bone to impale your enemies",uHe="Bone Spear",hHe="Blood Golem",mHe="a golem that shares life and damage",gHe=`it steals and damage it receives
creates a golem that shares with you the life`,fHe="Blood Golem",vHe="Attract",pHe="curse - monster becomes universal target",yHe=`this curse may not be overridden by another curse
target of all nearby monsters
curses a monster to becomes the`,kHe="Attract",bHe="Decrepify",wHe="curse - greatly slows and weakens enemies",MHe=`slow, weak and take amplified damage
curses a group of enemies to make them`,xHe="Decrepify",SHe="Bone Prison",LHe="creates a barrier of bone around target",AHe="creates a barrier of fossilized bone around your target",CHe="Bone Prison",IHe="Summon Resist",THe="passive - summoned monsters gain resistances",BHe=`of all summoned creatures
passive - increases the resistances`,HHe="Summon Resist",DHe="Iron Golem",GHe="creates a golem from an item",EHe=`the properties of the item
transforms a metallic item into a golem that gains`,FHe="Iron Golem",qHe="Lower Resist",RHe="curse - lowers enemies resistance to magic",PHe=`lowers maximum resistances of hostile players
lowers resistances of monsters
curses an enemy to take more damage from all magical attacks`,NHe="Lower Resist",OHe="Poison Nova",zHe="emits an expanding ring of poison",_He="emits an expanding ring of concentrated poison",WHe="Poison Nova",VHe="Bone Spirit",QHe="releases an undead specter",UHe=`tracks its target or finds one of its own
releases a spirit of the restless undead that`,KHe="Bone Spirit",JHe="Fire Golem",$He="creates a golem of fire",jHe=`it receives from fire into life
creates a golem that converts the damage`,YHe="Fire Golem",ZHe="Revive",XHe="raises a monster to fight for you",eDe=`to fight by your side
returns a monster to life`,aDe="Revive",tDe="Sacrifice",nDe="increased accuracy and damage",sDe=`at the cost of life
increased accuracy and damage`,lDe="Sacrifice",iDe="Smite",oDe="shield bash",rDe=`by bashing it with your shield
temporarily stun your enemy`,cDe="Smite",dDe="Might",uDe="aura - increases damage",hDe=`done by you and your party
when active, aura increases the damage`,mDe="Might",gDe="Prayer",fDe="aura - regenerates life",vDe=`the life of you and your party
when active, aura slowly regenerates`,pDe="Prayer",yDe="Resist Fire",kDe="aura - protects against fire damage",bDe=`done to you and your party
when active, aura decreases fire damage`,wDe="Resist Fire",MDe="Holy Bolt",xDe="divine energy that damages undead",SDe=`or heals allies
that damages undead enemies
a bolt of divine energy`,LDe="Holy Bolt",ADe="Holy Fire",CDe="aura - flames damage nearby enemies",IDe=`with heavenly flames
when active, aura damages nearby enemies`,TDe="Holy Fire",BDe="Thorns",HDe="aura - reflects damage back at enemies",DDe=`back at your attacker
when active, aura reflects damage done to you`,GDe="Thorns",EDe="Defiance",FDe="aura - increases defense",qDe=`of you and your party
when active, aura increases the defense rating`,RDe="Defiance",PDe="Resist Cold",NDe="aura - protects against cold damage",ODe=`done to you and your party
when active, aura decreases cold damage`,zDe="Resist Cold",_De="Zeal",WDe="attacks multiple adjacent enemies",VDe=`with a single attack
allows you to attack multiple adjacent enemies`,QDe="Zeal",UDe="Charge",KDe="charge and attack target",JDe="charge into battle and attack an enemy",$De="Charge",jDe="Blessed Aim",YDe="aura - increases your attack rating",ZDe=`for you and your party
when active, aura increases the attack rating`,XDe="Blessed Aim",eGe="Cleansing",aGe="aura - reduces poison and curse duration",tGe=`will remain poisoned or cursed
of time you and your party
when active, aura reduces the length`,nGe="Cleansing",sGe="Resist Lightning",lGe="aura - protects against lightning damage",iGe=`done to you and your party
when active, aura decreases lightning damage`,oGe="R. Lightning",rGe="Vengeance",cGe="attacks add elemental damage",dGe=`to each successful attack
fire, lightning and cold damage are added`,uGe="Vengeance",hGe="Blessed Hammer",mGe="summon a spiraling magic hammer",gGe=`150 Percent Damage to Undead
spirals outwards damaging enemies it hits
summons an ethereal hammer that`,fGe="B. Hammer",vGe="Concentration",pGe="aura - increases your attack ability",yGe=`that the attack will be interrupted for you and your party 
when active, aura increases the damage and decreases the chance`,kGe="Concentration",bGe="Holy Freeze",wGe="aura - freezes nearby monsters",MGe="when active, aura freezes nearby monsters",xGe="Holy Freeze",SGe="Vigor",LGe="aura - increases speed and stamina recovery",AGe=`and movement speed for you and your party
when active, aura increases stamina recovery rate, maximum stamina`,CGe="Vigor",IGe="Conversion",TGe="Change allegiance of monsters",BGe=`other foul demons and beasts
converts monsters to fight against`,HGe="Conversion",DGe="Holy Shield",GGe="enhances your shield",EGe="enhances your shield with divine power",FGe="Holy Shield",qGe="Holy Shock",RGe="aura - lightning damages nearby enemies",PGe=`to damage nearby enemies
when active, aura causes pulses of electricity`,NGe="Holy Shock",OGe="Sanctuary",zGe="aura - repels and damages undead",_Ge=`and knocks them back
when active, aura damages the undead`,WGe="Sanctuary",VGe="Meditation",QGe="aura - increases mana recovery",UGe=`for you and your party
when active, aura increases mana recovery`,KGe="Meditation",JGe="Fist of the Heavens",$Ge="target is banished",jGe=`seek out nearby enemies
lightning strikes your target as holy bolts`,YGe="Heaven's Fist",ZGe="Fanaticism",XGe="aura - increases attack speed",eEe=`and attack rating for you and your party
when active, aura increases attack speed`,aEe="Fanaticism",tEe="Conviction",nEe="aura  - weakens enemies",sEe=`and resistances of nearby enemies
when active, aura reduces the defenses`,lEe="Conviction",iEe="Redemption",oEe="aura - redeems the dead for mana and life",rEe=`life and mana to you and your party
the souls of slain enemies to give
when active, aura attempts to redeem`,cEe="Redemption",dEe="Salvation",uEe="aura - protects against elemental damage",hEe=`done to you and your party
when active, aura decreases fire, cold and lightning damage`,mEe="Salvation",gEe="Bash",fEe="powerful blow that increases damage",vEe=`to enemies and knocks them back
powerful blow that increases the damage done`,pEe="Bash",yEe="Sword Mastery",kEe="passive - improves sword fighting skill",bEe="passive - improves sword fighting skill",wEe="Sword Mastery",MEe="Axe Mastery",xEe="passive - improves axe fighting skill",SEe="passive - improves axe fighting skill",LEe="Axe Mastery",AEe="Mace Mastery",CEe="passive - improves mace fighting skill",IEe="passive - improves mace fighting skill",TEe="Mace Mastery",BEe="Howl",HEe="frightens nearby monsters",DEe=`scrambling away in fear
sends nearby monsters`,GEe="Howl",EEe="Find Potion",FEe="targets corpses to find potions",qEe=`for a chance to find a potion
use on the corpse of a slain monster`,REe="Find Potion",PEe="Leap",NEe="jumps over obstacles",OEe=`or into the fray
leaps away from danger`,zEe="Leap",_Ee="Double Swing",WEe="swings two weapons at once",VEe=`or one target twice
attacks two targets if possible,
when two weapons are equipped`,QEe="Double Swing",UEe="Pole Arm Mastery",KEe="passive - improves pole arm skill",JEe="passive - improves pole arm skill",$Ee="Pole Arm Mastery",jEe="Throwing Mastery",YEe="passive - improves thrown weapon skill",ZEe="passive - improves thrown weapon skill",XEe="Throwing Mastery",e7e="Spear Mastery",a7e="passive - improves spear fighting skill",t7e="passive - improves spear fighting skill",n7e="Spear Mastery",s7e="Taunt",l7e="causes a monster to attack",i7e="enrages a monster into relentlessly attacking",o7e="Taunt",r7e="Shout",c7e="alerts party and improves defense",d7e=`rating of you and your party
warns of impending danger and improves the defense`,u7e="Shout",h7e="Stun",m7e="stuns your target",g7e=`and increases your attack rating
stuns your target for a short time`,f7e="Stun",v7e="Double Throw",p7e="throw two weapons at once",y7e=`throwing weapons at the same time
allows you to throw two different`,k7e="Double Throw",b7e="Increased Stamina",w7e="passive - increases stamina",M7e="passive - increases your stamina",x7e="Increased Stamina",S7e="Find Item",L7e="targets corpses to find items",A7e=`to find hidden treasures
use on the corpse of a slain monster`,C7e="Find Item",I7e="Leap Attack",T7e="leaps and attacks target enemy",B7e=`in one swift assault
leaps to and attacks target enemy`,H7e="Leap Attack",D7e="Concentrate",G7e="attack that is not interruptible",E7e=`improves attack and defense rating
attack that is not interruptible and`,F7e="Concentrate",q7e="Iron Skin",R7e="passive - improves defense rating",P7e="passive - improves defense rating",N7e="Iron Skin",O7e="Battle Cry",z7e="reduces enemy effectiveness",_7e=`enemies' defense rating and damage
fearsome cry that decreases`,W7e="Battle Cry",V7e="Frenzy",Q7e="successful double swing hit increases speed",U7e=`requires you to equip two weapons
each successful attack increases your overall speed
allows you to swing two weapons at once`,K7e="Frenzy",J7e="Increased Speed",$7e="passive - increases walk and run speed",j7e="passive - increases walk and run speed",Y7e="Increased Speed",Z7e="Battle Orders",X7e="improves life, mana and stamina of party",e6e=`stamina of you and your party
improves the maximum mana, life and`,a6e="Battle Orders",t6e="Grim Ward",n6e="creates a frightening totem",s6e=`that causes nearby monsters to flee
to create a frightening totem
use on the corpse of a slain monster`,l6e="Grim Ward",i6e="Whirlwind",o6e="whirling dance of death",r6e=`legions of your enemies
that cuts a path through the
a whirling dance of death`,c6e="Whirlwind",d6e="Berserk",u6e="powerful but reckless attack",h6e=`but decreases defense rating
that increases damage and attack rating
a powerful but reckless attack`,m6e="Berserk",g6e="Natural Resistance",f6e="passive - increases natural resistances",v6e=`to elemental and poison damage
passive - increases natural resistances`,p6e="Natural Resistance",y6e="War Cry",k6e="injures and stuns nearby enemies",b6e="injures and stuns all nearby enemies",w6e="War Cry",M6e="Battle Command",x6e="increases skill levels",S6e="increases all current skill levels for you and your party",L6e="Battle Cmd",A6e="Scroll of Identify",C6e="identify a magic item's properties",I6e="identify a magic item's properties",T6e="Identify",B6e="Tome of Identify",H6e="identify a magic item's properties",D6e="identify a magic item's properties",G6e="Identify",E6e="Scroll of Townportal",F6e="create a magic portal to the nearest town",q6e="create a magic portal to the nearest town",R6e="Townportal",P6e="Tome of Townportal",N6e="create a magic portal to the nearest town",O6e="create a magic portal to the nearest town",z6e="Townportal",_6e="Ormus has the key that opens this door.",W6e="Lady %s",V6e="Lord %s",Q6e="Hardcore",U6e="Level %d",K6e="Tristram",J6e="Cathedral",$6e="Barracks",j6e="Mausoleum",Y6e="Crypt",Z6e="Death takes its toll of %d Gold",X6e="You have lost experience",eFe="Your deeds of valor will be remembered",aFe="%d Seconds Until Game Ends",tFe="Congratulations!",nFe="You Have Vanquished Diablo",sFe="Will Henceforth Be Known As",lFe="Unable to remove message filter.",iFe="By logging on to Battle.net, you are certifying that you have read and agree to its current Terms of Service",oFe="an evil force",rFe="an evil force",cFe="an evil force",dFe="Right click to make",uFe="Not in Beta.",hFe="No Level Name",mFe="End of Beta",gFe=`40
Praise be to the Light! You have 
accomplished the impossible!
 
Diablo and Mephisto have been 
banished back into the Black Abyss 
that spawned them, and the corrupted 
Soulstones are no more.
 
However, while you were fighting here, 
Baal remained behind in the mortal 
realm, building an army of hellish 
minions. Now, Baal's army is searching 
for the Worldstone, the ancient source 
of all the Soulstones and their power, 
while leaving behind a wake of 
destruction. They have forged deeply 
into the Barbarian homelands, heading 
directly for the summit of Mount 
Arreat!
 
Baal knows, mortal hero! That is the 
very site of the blessed Worldstone!
 
Now, enter the portal I have opened for 
you. It will take you to the Barbarian 
city of Harrogath, the last bastion of 
Order on the slopes of Arreat.
`,fFe=`40
I knew there was great potential in you, 
my friend. You've done a fantastic job.
 
Though my ancestors often struggled 
against the Three Evils and their 
minions, I've always lived a shut-in, 
scholarly life. I'm glad that my wisdom 
aided you.
 
Now, I wish to leave this place. Though 
Heaven's Gates are a marvel to behold, 
I hope I won't have to see them again 
for many, many years.
 
Please talk to Tyrael about leaving this 
place now!
`,vFe=`35
We are the spirits of the Nephalem, the 
Ancient Ones. We have been chosen to 
guard sacred Mount Arreat, wherein 
the Worldstone rests. Few are worthy 
to stand in its presence; fewer still can 
comprehend its true purpose.
 
Before you enter, you must defeat us.
`,pFe=`39
I am amazed to find this place so 
untouched. Everything else in the path 
of Baal the Lord of Destruction lies in 
ruin. 
 
These Barbarians must indeed be the 
legendary guardians of Mount Arreat. 
They are a proud, hardy people. Don't 
expect to be greeted warmly -- 
strangers here rarely are.
 
Perhaps I can gain their trust. I'll spend 
some time with the townsfolk and try 
to understand them better. I'll let you 
know what I discover.
`,yFe=`52
With hellspawn, size is no measure of 
their threat. Demons half the size of 
men can kill with a gesture, while 
hellish pack animals trample any who 
stand in their way.
`,kFe=`55
Though these Barbarians are known 
throughout the kingdoms as ferocious 
fighters, they are also capable of great 
compassion.
 
They have trained throughout history 
for a battle their legends foretell will 
decide the fate of the world.
`,bFe=`55
The angel Tyrael has watched over the 
guardians of Arreat throughout 
history. I do not believe that Baal and 
Tyrael have come to fight over a paltry 
few souls.
 
They are here to settle a conflict as old 
as time itself.
`,wFe=`44
During my time with the Horadrim, we 
often debated the nature of Mount 
Arreat.
 
We knew that the Barbarian clans 
zealously guarded the mountain as 
their sacred duty. However, many 
dismissed their zeal as simple 
superstition...combined with an inborn 
hostility toward outsiders.
 
Those Horadrim who trekked up Arreat 
were never heard from again...Still, I 
do not believe they died at the hands of 
Barbarians.
`,MFe=`41
All users of the magical arts know of 
Mount Arreat, but few understand its 
true nature. It is the nexus of an 
unfathomable magic.
 
It bodes ill that the Lord of Destruction 
races to its summit with such purpose. 
I fear for the whole world should Baal 
gain what he seeks.
`,xFe=`59
I have spent decades trying to 
understand the forces at work in this 
world. But in the face of all that is 
transpiring, I realize how meager my 
knowledge is.
 
I will be of assistance where I can, my 
friend.
`,SFe=`54
Though the Elder Council of Harrogath 
is gone, there are many capable young 
leaders to take their place.
 
Anya certainly has enough courage and 
intelligence to lead them all, if they can 
survive this catastrophe.
`,LFe=`53
Ah, Anya. Such a fine example of 
feminine strength...
 
She reminds me of the Zakarum 
priestesses I knew in my youth. They 
don't take vows of chastity, you know.
`,AFe=`65
It is fortunate that this town has such a 
talented smith.
 
The quality of Larzuk's work surely 
complements your skills. In fact, he 
would have been quite welcome 
amongst the Horadrim.
`,CFe=`54
It is my belief that the Soulstones are at 
the center of this conflict. If only that 
fool Marius had not intervened, Baal 
would still be imprisoned within Tal 
Rasha.
`,IFe=`54
You have proven yourself a true hero to 
me and my people.
 
These are dark times, warrior. I hope 
you can bring an end to Baal's reign of 
destruction. 
 
Our Council of Elders is gone -- my 
father, Aust, among them. The one 
thing that keeps us from total despair 
is the promise of vengeance against 
Baal.
`,TFe=`45
Now that the Elders are all dead, I don't 
know who will guide our people through 
this dark time. I was to be next in line 
after my father, but this burden is too 
great for me to shoulder alone. 
 
We are a people of strong blood. I shall 
do what I can and let fate do the rest.
`,BFe=`82
Baal's minions are not to be trifled with. 
In their bloodlust they will sacrifice 
themselves to destroy you.
`,HFe=`60
Many outsiders believe that the 
fantastic stories about our ancestors, 
the Ancients, are but fables. However, I 
believe that the Ancients were more 
than human -- that mankind has fallen 
from what it once was.
`,DFe=`58
When I was a child, the Elders told us 
stories about the mountain and its 
power...and how the Barbarian people 
are bound to it as protectors.
 
Baal is not just taking our land -- with 
every step he takes up the mountain, 
he takes a part of who we are as a 
people.
`,GFe=`72
I am truly glad you are here, warrior. 
Perhaps things would be different now 
if we had asked for assistance from 
the neighboring kingdoms.
 
Our foolish, foolish pride...
`,EFe=`54
My father, Aust, was among those 
Elders wise enough to see that we 
would need outside help to deal with 
Baal's legions. He believed that this 
conflict would affect the entire world, 
not just our homeland. He said that 
Mount Arreat is as necessary to the 
world's survival as food and water is to 
our own.
 
I believe this to be true.
`,FFe=`50
Qual-Kehk's confidence in his abilities 
once bordered on arrogance, but in the 
early days of the siege, he was 
humbled by Baal. While he saved us 
from immediate destruction, a third of 
our warriors were lost.
 
None felt those losses more than he. 
Though he may not admit it, your 
presence gives him hope, warrior.
`,qFe=`78
If Larzuk could sing or dance half as 
well as he smiths, he'd be married by 
now.
 
...Just look at those shoulders.
`,RFe=`57
Nihlathak was the last of our Elders, 
whose charge it was to safeguard the 
mountain. He alone tried to guide us 
through the most desperate time in our 
history -- but he was just as helpless as 
the rest of us.
 
I cannot forgive his betrayal, but I can 
learn from it.
`,PFe=`60
Our people believe that the Ancients 
protecting Mount Arreat have the 
power to stop Baal. Unfortunately, the 
Lord of Destruction has shown great 
power to undermine our faith.
`,NFe=`55
I am Larzuk, the armorer. My ancestors 
were some of the finest craftsmen in 
Harrogath. 
 
Regretfully, my supplies run lower with 
every passing day, yet the demons 
beyond the walls have not weakened. 
 
I fear the time is near when I must put 
down my hammer and take up a sword, 
instead.
`,OFe=`42
So, you're an Amazon. I have heard 
rumors about your kind. Your unusual 
weapons could prove a challenge to my 
skills, but I'm prepared to meet it.
 
I am Larzuk, the armorer. My ancestors 
were some of the finest craftsmen in 
Harrogath. Regretfully, my supplies run 
lower with every passing day, yet the 
demons beyond the walls have not 
weakened. I fear the time is near when 
I must put down my hammer and take 
up a sword, instead.
`,zFe=`65
I've heard that you Amazons excel at 
killing from a distance. From what I've 
seen, that's the best way to deal with 
Hell's minions. 
 
Are all of your kind so...big?
`,_Fe=`65
Why did you ever leave your beautiful 
islands to come to this frozen 
battleground? Perhaps if we both 
survive this, we'll travel back there 
together.
`,WFe=`75
Has that infernal howling been keeping 
you awake at night, too? Some think 
it's the howling of animals, but those 
sounds don't come from any beast I've 
ever known.
`,VFe=`69
Demonic forces have been using our 
own towers and barricades against us. 
You know, it would be wise to cut the 
demons down in the open before they 
can mount those fortifications.
`,QFe=`70
Nihlathak's despair is infectious -- and 
his behavior does not befit an Elder of 
his stature. I think we'd be better off 
without him.
`,UFe=`63
I've offered Qual-Kehk my ideas on how 
to break the siege, but he dismisses 
them. Is it because I lack scars of 
battle, or does he think I'm a couple 
arrows short of a quiver?
`,KFe=`64
Legend has it that the top of Mount 
Arreat is guarded by the spirits of our 
ancestors. Though our people are 
forbidden to climb to the mountain's 
summit, some foreign travelers have 
made the attempt.
 
None have ever returned.
`,JFe=`66
This is a lively town during our victory 
celebrations. We Barbarians train long 
and hard from childhood to become 
warriors, and we celebrate with equal 
fervor.
 
You didn't happen to bring along any 
ale to trade?
`,$Fe=`54
Every day, one of my friends dies 
fighting outside the town walls, while I 
tend my anvil here unscathed. If only 
we didn't need weapons so badly, I 
could be out doing my share of the 
fighting. 
 
Good luck to you, warrior.
`,jFe=`56
Just so you know...The gold you pay me 
doesn't line my pockets. Much of it 
goes to buy the raw metal I need to 
melt down for weapons and armor. The 
rest -- well, all I can spare -- goes to 
Malah and Qual-Kehk for other 
supplies.
`,YFe=`35
I, Malah, welcome you to Harrogath, 
the last stronghold of Order on Mount 
Arreat. You have come to the right 
place if you intend to defeat Baal the 
Lord of Destruction.
 
Baal has laid waste to our mountain 
and its denizens. His minions continue 
to attack our town, while Qual-Kehk 
and his men have proven helpless to 
stop them. Baal is still out on the 
mountain looking for something -- but I 
know not what. 
 
All of the Elders, save Nihlathak, 
sacrificed themselves to place a 
protective ward around Harrogath.
 
Some of us here, certainly Nihlathak, do 
not appreciate your presence. We are a 
proud people, and it is not easy for us 
to accept aid. I, however, am glad you 
are here.
 
If you need healing or a potion, please 
come to me. See Larzuk for weapons, 
armor, and repairs. Nihlathak, despite 
his disposition, may be of some 
assistance with other wares. Finally, 
Qual-Kehk, our Man-At-Arms, leads 
Harrogath's remaining forces against 
Baal.
`,ZFe=`36
A Sorceress...Here in Harrogath?
 
There was a time, child, when I thought 
I was destined to follow your kind's 
path. However, my powers never 
developed beyond the simplest of 
spells. Although I can heal almost any 
wound with time and energy, there is 
little I can do to help against Baal.
 
But enough of that...I spend too much 
time in reflection and have forgotten 
my manners.
 
I, Malah, welcome you to Harrogath, 
the last stronghold of Order on Mount 
Arreat. You have come to the right 
place, if you intend to defeat Baal the 
Lord of Destruction.
 
Baal has laid waste to our mountain 
and its denizens. His minions continue 
to attack our town, while Qual-Kehk 
and his men have proven helpless to 
stop them. Baal is still out on the 
mountain looking for something -- but I 
know not what. 
 
All of the Elders, save Nihlathak, 
sacrificed themselves to place a 
protective ward around Harrogath.
 
Some of us here, certainly Nihlathak, do 
not appreciate your presence. We are a 
proud people, and it is not easy for us 
to accept aid. I, however, am glad you 
are here.
 
If you need healing or a potion, please 
come to me. See Larzuk for weapons, 
armor, and repairs. Nihlathak, despite 
his disposition, may be of some 
assistance with other wares. Finally, 
Qual-Kehk, our Man-At-Arms, leads 
Harrogath's remaining forces against 
Baal.
`,XFe=`34
You have traveled far only to return 
home to us, Barbarian. Ohh...Much has 
happened in Harrogath since you left. 
Our homeland is hardly recognizable 
with so much evil about.
 
Yet, I've managed to survive so far. 
You've seen your share of suffering as 
well, I'm sure. Seeing you again -- alive 
-- does my heart good. I shall pray that 
you can help us out of this hell.
 
Baal has laid waste to our mountain 
and its denizens. His minions continue 
to attack our town, while Qual-Kehk 
and his men have proven helpless to 
stop them. Baal is still out on the 
mountain looking for something -- but I 
know not what.
 
Nihlathak is the last survivor of the 
Council of Elders, but I'm afraid he has 
not been himself lately. The other 
Elders sacrificed themselves to place a 
protective ward around Harrogath. If 
Nihlathak is curt with you, it is because 
he feels responsible for our situation. 
He does not relish sending more of our 
people out to die.
 
So much has changed since you left 
that I see little hope for us in this life.
 
If you need healing or a potion, please 
come to me. See Larzuk for weapons, 
armor, and repairs. Nihlathak, despite 
his disposition, may be of some 
assistance with other wares. Finally, 
Qual-Kehk, our Man-At-Arms, leads 
Harrogath's remaining forces against 
Baal.
`,eqe=`53
I'm aware of the amazing magical 
powers a Sorceress can channel. If we 
survive Baal's wrath, I would be most 
honored if you could demonstrate and 
perhaps teach me something of what 
you know. 
 
I may be old, but I'm not dead.
`,aqe=`42
I know you and my son, Bannuk, did not 
part on the best of terms. He did not 
understand the wanderlust that drove 
you to leave your homeland. However, 
even though Bannuk could never admit 
it to me, as he grew older I could see 
that same desire in his eyes.
 
Oh...It's a pity I didn't encourage him to 
go with you. He might still be alive 
today.
`,tqe=`57
Though once considered shelter by our 
people, the Ice Caves offer no refuge 
from the dark horde. There are 
creatures there that will freeze your 
heart before feasting upon it.
`,nqe=`107
On the battlefield, turning your back on 
even the dead is unwise.
`,sqe=`60
This battle plays mind tricks on our 
warriors. Those fortunate enough to 
have returned from the mountainside 
claim to have seen angels in flight.
 
Fly they might, but that certainly does 
not make them angels.
`,lqe=`53
Perhaps you have heard the accounts 
of my son's horrible death at the hands 
of Baal's minions. He was my last living 
child...
 
The oath of compassion I have taken as 
a healer extends only to humankind.
 
Cut them down, warrior. All of them!
`,iqe=`78
The catapults are infernal machines 
made of demon flesh fused with steel.
 
Be wary of them.
`,oqe=`60
Qual-Kehk is a worthy leader, but the 
losses have borne heavily upon him. He 
is only impatient because he judges the 
worth of a warrior by action, not 
words.
 
You must prove yourself worthy of his 
trust.
`,rqe=`52
Larzuk possesses a good soul, but at 
times his mind seems quite unsound. 
 
He once asked me for twenty of my 
finest sheepskins. He said he would fill 
them with hot air and float like a cloud 
above the battlefield to spy on Baal's 
legions! 
 
I worry the siege has driven him mad.
`,cqe=`90
Be cautious, warrior.
 
Though I am an experienced healer, 
resurrection is beyond my powers.
`,dqe=`53
I pray for the day when the fields are 
covered in snow unstained by the blood 
of our own. Perhaps that day will come 
soon...Perhaps never...
 
Oh...But I forget myself. How may I aid 
your quest?
`,uqe=`64
Your gold is most helpful. Medical 
supplies for our wounded are scarce 
and very expensive.
 
When we can find a supplier, oh, we 
must pay dearly for what we need.
`,hqe=`44
With the exception of Qual-Kehk, the 
townspeople do not see what I see -- 
the massacre we face.
 
Our bravest, strongest heroes hobble 
back to me begging for help. I do what 
I can -- healing and bandaging some, 
preparing the others for what lies 
beyond.
`,mqe=`43
Well, well. The siege has everything in 
short supply...except fools. 
 
Why would you seek this place, 
stranger? Are you a vulture come to 
loot the bodies of our fallen warriors? 
 
Regardless, this is no place to make a 
name for yourself. The mountain is 
ours to protect. It is only a matter of 
time before Hell's legions are routed.
`,gqe=`54
Well, well...An Assassin!
 
Heh, heh...While I am sure we are all 
grateful for your presence in our 
troubled town, you need not have made 
the journey.
 
I can personally say that your skills are 
not required here. You would serve 
your clan better elsewhere.
`,fqe=`45
Ahhh, a Necromancer.
 
While I admire your courage in seeking 
out the darker side of magic, we really 
have little need of your skills. The 
battle will turn soon enough without 
your meddling. 
 
Yet, I should have expected to see your 
kind here. You are like a moth to the 
flame -- drawn to all this death. It 
feeds you in more ways than one, does 
it not?
`,vqe=`49
If you're looking for cases of 
treacherous magic, Assassin, take a 
hard look at Larzuk. He was the only 
one in town who escaped the Red Fever 
last spring. He claimed his good 
fortune was due to 'hand washing' 
before meals.
 
Hmmm...Very suspicious...
`,pqe=`48
Why would you seek this place, 
stranger? Are you a vulture come to 
loot the bodies of our fallen warriors? 
 
Regardless, this is no place to make a 
name for yourself. The mountain is 
ours to protect. It is only a matter of 
time before Hell's legions are routed.
`,yqe=`67
Qual-Kehk is useless. He has blindly 
sent our warriors to their deaths, 
assuming Baal's legions would fight as 
men do. Of course, everyone knows 
they do not.
`,kqe=`57
The demon hordes have grown powerful 
beyond measure, aided by our foolish 
mistakes. But I may have found a way 
to correct those mistakes...
`,bqe=`37
Oh yes...I remember our warriors as 
children. Malah would set their broken 
bones and give them powders for their 
fevers. Now, they return to her with 
wounds that will never heal.
 
I am tired...Please...leave me.
`,wqe=`133
If you have nothing useful for me, be on 
your way!
`,Mqe=`81
Anya's father was my good friend. 
There are so many to mourn...I have 
no time for you!
`,xqe=`53
I have long been criticized, but 
especially of late -- since the deaths of 
my fellow Elders. Through it all, I have 
learned one thing. Each man must do 
what's right, no matter what others 
may think.
`,Sqe=`65
The Council of Elders always believed 
itself prepared for the coming of the 
Three. Obviously, we were not prepared 
enough.
`,Lqe=`45
I am Qual-Kehk, the Senior Man-At-Arms 
of Harrogath.
 
You have the look of a warrior...An 
extra soldier will be useful. But don't 
expect anyone to mourn if you get 
yourself killed. 
 
Baal is true to his namesake. He has 
ravaged through our lands like a 
merciless plague.
 
The protective ward laid down by our 
lost Elders helps hold the evil at bay, 
but Baal's siege has taken its toll all 
the same.
 
Most of my men are now dead. Others 
are trapped in the mountain passes.
 
But I swear we are not beaten yet! We 
will fight to the end to protect this 
mountain!
`,Aqe=`42
A Paladin! I have long heard of your 
people.
 
As a young warrior I even considered 
the pilgrimage to Kurast. But I was 
younger then and foolish. My place has 
always been here -- protecting 
Harrogath, and Mount Arreat with it.
 
I am Qual-Kehk, the Senior Man-At-Arms 
of Harrogath.
 
You have the look of a warrior...An 
extra soldier will be useful. But don't 
expect anyone to mourn if you get 
yourself killed. 
 
Baal is true to his namesake. He has 
ravaged through our lands like a 
merciless plague.
 
The protective ward laid down by our 
lost Elders helps hold the evil at bay, 
but Baal's siege has taken its toll all 
the same.
 
Most of my men are now dead. Others 
are trapped in the mountain passes.
 
But I swear we are not beaten yet! We 
will fight to the end to protect this 
mountain!
`,Cqe=`42
A Druid in Harrogath! Have things truly 
come to this?
 
After the Mage Wars, I assumed Druids 
would never be seen in Harrogath 
again. You take a big chance coming 
here! 
 
To be honest, I have never been 
comfortable with your shape-shifting 
kind, but I do respect your search for 
balance and peace. So, if you trust us 
enough to enter our gates, I trust you 
enough to let you stay.
 
I am Qual-Kehk, the Senior Man-At-Arms 
of Harrogath.
 
You have the look of a warrior...An 
extra soldier will be useful. But don't 
expect anyone to mourn if you get 
yourself killed. 
 
Baal is true to his namesake. He has 
ravaged through our lands like a 
merciless plague.
 
The protective ward laid down by our 
lost Elders helps hold the evil at bay, 
but Baal's siege has taken its toll all 
the same.
 
Most of my men are now dead. Others 
are trapped in the mountain passes.
 
But I swear we are not beaten yet! We 
will fight to the end to protect this 
mountain!
`,Iqe=`67
It would be an honor to have a warrior 
of the Light fighting side-by-side with 
my men.
 
I can see your faith gives you great 
strength, Paladin, but don't expect it to 
keep you out of harm's way.
`,Tqe=`61
Harrogath has great need of your 
powers, noble Druid. However, in the 
face of this supernatural onslaught, 
are your natural powers up to the 
task?
`,Bqe=`44
The death of Malah's son was a great 
tragedy. He was our finest archer.
 
While leading a successful campaign 
against Baal's forces, he was impaled 
on a demon's spear. The wound was 
such that...Well, even Malah herself 
acknowledges that quick death was a 
blessing.
`,Hqe=`57
We have lost many well-trained warriors 
to Baal's siege machines. Their range is 
great. Though, they are vulnerable if 
you close the distance quickly enough.
`,Dqe=`96
Baal's legions seem countless, but 
slaying their commanders takes some 
of the fight out of them.
`,Gqe=`58
Early on, parties of our best scouts 
were ambushed by demons that 
spawned from the very air around 
them. Survivors often mentioned a 
strange creature floating in the 
distance.
 
Perhaps taking it down could prevent 
some nasty surprises.
`,Eqe=`57
This is unlike any battle I have ever 
fought. While we ration food and 
water, the demon hordes feast nightly 
on the flesh and blood of our dead.
`,Fqe=`48
Larzuk is a talented blacksmith, but his 
head is full of some strange ideas. 
 
Just the other day he came to me with a 
plan to break the siege. He wanted to 
fill large pipes with exploding powders 
and steel balls, then...Well, like I said, 
strange.
`,qqe=`46
Our Elders were wise leaders in more 
peaceful times, but now the survival of 
our people has fallen to me. My men 
and I will fight to the death, but there's 
no way to ensure the outcome.
 
I used to believe that nothing could 
break through our guard and assault 
the holy mountain. I know now that I 
was horribly mistaken.
`,Rqe=`45
If you're here to defeat Baal, you must 
prove it!
 
As we speak, Harrogath is under siege 
by Baal's demons. Catapults rain death 
just outside the town walls.
 
Baal himself travels up the sacred 
mountain, having left in charge here 
one of his most vicious generals, Shenk 
the Overseer. A ruthless taskmaster, 
he lashes his own minions into suicidal 
frenzies on the battlefield.
 
If you wish to prove yourself to us, 
destroy the monster, Shenk, that 
commands those infernal catapults 
outside Harrogath.  If you manage to 
do this, return to me.
`,Pqe=`150
Uh...Did I mention there were catapults?
`,Nqe=`83
I believe that stopping the siege on 
Harrogath is the only way for you to 
earn the trust of these people.
`,Oqe=`84
You've proven your skill at rescuing fair 
maidens...but how are you at killing 
vicious beasts?
`,zqe=`77
Qual-Kehk and his men have been 
fighting to break the siege for some 
time. Where many have failed, you may 
succeed.
`,_qe=`70
After so many have died, who are you 
to think you can accomplish what our 
proud warriors could not?
`,Wqe=`66
About to face Shenk the Overseer and 
stop the siege, are you? You should 
ask Malah to perform your last rites 
before you go, stranger.
`,Vqe=`90
What's the matter, hero? Questioning 
your fortitude? I know we are.
`,Qqe=`105
I understand your reluctance, but now 
is the time to strike.
`,Uqe=`66
Those demons have been out there 
since before your arrival. Can you do 
nothing to stop them?
 
Your task is a simple one, warrior. Find 
Shenk and destroy him.
`,Kqe=`64
This may not be very encouraging, but 
you have fared better than the others 
who passed through those gates.
 
In regards to Shenk the Overseer, 
remember: a general is nothing without 
his men.
`,Jqe=`78
What are you still doing here? I thought 
you were going off to die.
 
Go...Be quick about it.
`,$qe=`93
So, you still live. You're either quick or a 
coward.
`,jqe=`63
You're an even greater warrior than I 
expected...Sorry for underestimating 
you.
 
As a token of my appreciation, I will 
craft sockets into an item of your 
choosing, and from now on, you'll get 
the best price for all my wares.
`,Yqe=`60
Those catapults were like nothing I have 
ever seen before. You have prevailed 
against Shenk, my friend, but Baal is 
still far ahead of you.
`,Zqe=`108
I was starting to wonder how long it 
would take you to stop those beasts.
 
Good job.
`,Xqe=`94
Oh...At last, the siege is ended. You 
truly are an angel.
 
I thank you.
`,eRe=`65
Ending the siege does not earn 
immediate respect, outsider.
 
Respect only comes with sacrifice -- 
something I'm sure you know nothing 
of.
`,aRe=`68
So...You managed to stop the siege.
 
You are more powerful than I gave you 
credit for. You have rightfully earned 
my respect.
`,tRe=`58
My concerns have turned to my men 
taken prisoner on the battlefield by 
Baal's demons. I hate to think what's 
happened to them.
 
As you journey up the mountain, keep 
your eyes open for my soldiers and 
bring them back to me if you can.
`,nRe=`85
Those of my men fortunate enough to 
escape on their own told me that they 
were held captive in the highlands and 
plateaus.
`,sRe=`74
I know firsthand that captivity is a sad 
fate for a man. Find them quickly.
`,lRe=`85
If those men are being treated like I 
was, you must find them. They won't 
survive much longer.
`,iRe=`73
I crafted the swords and armor for 
Qual-Kehk's men. They were like 
brothers to me. I can't imagine the pain 
they must be suffering.
 
Save them if you can!
`,oRe=`84
Qual-Kehk's men have been imprisoned 
for some time. They are certain to be 
tired and weak.
 
You must protect them once you free 
them.
`,rRe=`94
You have proven you can take life, 
warrior, but can you save it as well?
`,cRe=`95
They say that discretion, not 
procrastination, is the better part of 
valor.
`,dRe=`78
More of my men are still alive out there. 
I am certain of it!
 
Find them. Free them from their cages 
and bring them back to me.
`,uRe=`63
If you are having trouble finding 
Qual-Kehk's soldiers, you should talk to 
Malah. She healed those who made it 
back before. Perhaps she would have 
some advice.
`,hRe=`115
Well, you found me on the mountain; I'm 
sure you'll find them too.
`,mRe=`76
As a kid, I used to play soldier among 
the barricades on the mountain. 
There's no easy way through that maze 
of walls.
`,gRe=`67
Soldiers who made it back told of a 
system of barricades placed among the 
mountain passes. They said that is 
where the prisoners are held.
`,fRe=`52
Did you ever stop to think why these 
demons are capturing Qual-Kehk's 
men? Why they are attacking us? Have 
you considered what Baal wants with 
the mountain?
 
No. You've not. You have no idea what 
you are dealing with.
`,vRe=`51
Thank you for rescuing my men. They 
have spoken well of your bravery in 
battle. Perhaps there is hope for us 
after all. 
 
If you wish, you may hire some of my 
mercenaries that you saved. And 
please...take this set of runes. I had 
been saving them for a socketed shield, 
but I think you'll make better use of 
them.
 
Be sure to set them in the right order 
for their fullest effect.
`,pRe=`80
You've become a hero to this town, my 
friend. The shadows have lifted ever 
since you brought the Light to 
Harrogath.
`,yRe=`107
I'm sure those men appreciate the 
freedom you gave them...as much as I 
do.
`,kRe=`55
Since your arrival, Cain has spoken of 
your deeds in the Southern Kingdoms, 
defeating both Mephisto and Diablo. At 
first, I scoffed at his tales, but I'm 
finding them more believable with every 
passing day.
`,bRe=`73
You have inspired the people in this 
town -- not only those you rescued, but 
those you've helped in other ways as 
well.
`,wRe=`72
So. You brought the lost sheep home to 
the shepherd. Well done.
`,MRe=`43
There is a matter which I hesitate to 
share, but I believe you are the only 
one who can help me now.
 
Anya, the young alchemist and 
daughter to one of our slain Elders, 
has been missing for some time. She is 
a strong, crafty woman with a spirit 
like no other.
 
One night, just before your arrival, I 
overheard her and Nihlathak arguing 
about her father's death. The next 
morning she was gone.
 
Nihlathak has his own tale as to where 
she went and why. Don't believe him! I 
fear he is at the root of her 
disappearance.
 
Please, if you can, search for Anya and 
bring her back to us. She'll know what 
to do about Nihlathak.
`,xRe=`94
When you talk to Nihlathak, be careful. 
There is no telling what he will say or 
do.
`,SRe=`59
I would listen to Malah. Nihlathak 
speaks with a venomous tongue and 
acts as if the entire weight of this town 
rests upon his shoulders.
 
Perhaps there is more going on here 
than we know.
`,LRe=`57
Anya is an amazing alchemist, 
especially for her young age. As long 
as I've known her, she's never let 
anything stop her from pursuing what 
she believed in. 
 
I wouldn't doubt that Nihlathak is 
involved. Ever since her father died, 
they haven't gotten along.
`,ARe=`41
Anya! Who have you been talking to? 
Likely it was that meddling Malah. 
 
Well, I'll tell you what really happened. 
Anya came to me for guidance, after 
receiving a vision that her mother and 
younger brother were trapped in the 
lands beyond the Ice Caves. She had 
decided to go rescue them. 
 
I told her that her quest was a foolish 
one and that she would be safer 
staying within the city walls. However, 
she is a willful girl and would not listen 
to me. 
 
The next morning, she was gone. No 
one is more distraught than I over 
losing her. 
 
However, if you feel the need to be 
Malah's errand child, I won't try to stop 
you.
`,CRe=`43
Anya's father, Aust, was our wisest 
Elder. He was killed along with the 
other Elders who erected the ward that 
protects this city. The ward has kept 
Baal's demons out of Harrogath, but at 
a costly sacrifice. 
 
Nihlathak, on the other hand, was the 
only Elder to escape the demons. 
Somehow, he alone managed to find 
sanctuary, while the others died 
around him.
 
Ever since that day, Nihlathak and Anya 
have been at odds.
`,IRe=`52
If it were anyone else, I would assume 
her dead. However, Anya is not so 
easily beaten. I know she must be alive.
`,TRe=`60
Nihlathak's story does sound 
reasonable, considering what I've 
heard about Anya. However, the best 
lies are often hidden within truth.
`,BRe=`56
As the daughter of Elder Aust, Anya is 
the only person, besides Nihlathak, 
who has any real knowledge of Mount 
Arreat's secrets. I'd hate to see our 
fate in the hands of Nihlathak alone.
`,HRe=`46
Look, I've told you! She's dead! If you 
knew what was good for you, you'd 
concentrate your efforts on saving 
Harrogath -- not on lost causes like 
Anya.
`,DRe=`81
It seems like everyone feels Nihlathak 
played a part in Anya's disappearance.
 
Why would he do such a thing?
`,GRe=`56
So! That snake Nihlathak was behind 
Anya's disappearance...and he trapped 
her with a freezing curse.
 
Here. Take this potion to Anya and give 
it to her. That should release her.
`,ERe=`54
Goodness! Anya frozen by that fallen 
Barbarian, Nihlathak...Perhaps Malah 
can help you where I cannot.
`,FRe=`80
Poor Anya! I should've known Nihlathak 
was a traitor...
 
If you find him alive, kill him for me!
`,qRe=`70
The snake has slipped our grasp! While 
you were gone, Nihlathak disappeared.
 
I'll bet Anya knows how to track him 
down.
`,RRe=`50
Hero. Nihlathak did this to me!
 
If you've come to help me, my only hope 
lies with Malah.
 
Please...Tell her you've found me...
`,PRe=`48
Thank you so much for bringing Anya 
back to us. I have devised this spell to 
increase your resistances as a token of 
my thanks. I know it isn't much, but I 
hope you find it helpful.
 
Please go talk to Anya. She has urgent 
news concerning Nihlathak.
`,NRe=`62
For one so young, Anya commands 
great respect. Now that she is here, I 
will make it a point to talk to her about 
Mount Arreat.
 
You should do the same.
`,ORe=`67
I never liked Nihlathak, but I never 
suspected that he'd betray us! I just 
can't understand how an Elder could do 
such a thing.
`,zRe=`140
Your rescue of Anya was quite an 
accomplishment.
`,_Re=`80
Thank you, hero, for rescuing me.
 
To show my personal gratitude, I give 
you this. I had it custom-made for you 
by Larzuk.
`,WRe=`43
Nihlathak told me he struck a deal with 
Baal to protect Harrogath. In exchange 
for the demon's mercy, the misguided 
fool plans to give Baal the Relic of the 
Ancients, our most holy totem!
 
Doing so will allow Baal to enter Mount 
Arreat unchallenged by the Ancients. I 
tried to stop Nihlathak, but he 
imprisoned me in that icy tomb.
 
Nihlathak must be stopped before he 
dooms the whole world. As much as I 
would love to strangle the life out of 
him, I'm afraid I haven't the strength.
 
You must go to his lair through this 
portal I've opened, kill him, and then 
bring back the Relic of the Ancients.
 
Stop Nihlathak from destroying what we 
have striven for eons to protect.
`,VRe=`90
As noble as Nihlathak's intentions are, 
nothing can excuse his actions.
`,QRe=`50
Regretfully, I know very little about this 
Relic. However, if what the others say 
is true, then Baal must not gain 
possession of it.
 
Stop Nihlathak...before all is lost.
`,URe=`65
My worst fear has come true. Nihlathak 
has gone mad.
 
You must stop him, before he gives the 
Relic to the Lord of Destruction!
`,KRe=`56
Now, rescuing Anya -- that's good. 
Talking to me while Nihlathak hands 
over the Relic to Baal -- uh...that's bad!
`,JRe=`60
I saw Nihlathak leave town just before 
you found Anya. He must be held 
accountable for his criminal deeds.
 
Find him and bring him back, if you can. 
Likely, he won't come willingly, and 
you'll be forced to kill him.
 
So be it.
`,$Re=`55
Nihlathak is a traitor! If Baal gets the 
Relic, he shall enter the mountain and 
wreak havoc there!
 
I cannot believe that Nihlathak would 
give the Relic to Baal in any kind of 
trade. He's truly insane if he believes 
that he can deal with the Lord of 
Destruction.
`,jRe=`58
Ohh...This is a truly horrible turn of 
events.
 
I know it seems you have always been 
one step behind, my friend. But look at 
it this way...You have evil on the run.
`,YRe=`160
...What's there to talk about?
 
Kill Nihlathak!
`,ZRe=`63
Nihlathak was never the kindest man. 
But for him to betray the whole world...
 
Ahh...Where shall his soul finally rest?
`,XRe=`65
My advice is to go in quick and hit hard. 
Nihlathak can't be half as tough as the 
beasts you've faced out there.
`,ePe=`55
You have stopped Nihlathak, but he 
didn't have the Relic! He must have 
already given it to Baal. Now, Baal will 
not be tested when he reaches Arreat's 
summit.
 
...Damn Nihlathak!
 
I do thank you for trying, though. 
Please, allow me to honor your courage 
by magically inscribing your name onto 
an item of your choosing. It's the least 
I can do.
`,aPe=`90
Beware! Baal grows stronger with every 
passing moment.
`,tPe=`93
Hmmm...What does Baal plan to do 
inside Mount Arreat?
`,nPe=`65
So, the Relic is lost. Do not dwell on 
failures past. It is your future that 
matters more.
`,sPe=`57
Nihlathak was a vile demon that shall 
find his home among the tortured 
minions of Hell!
 
You battled the Darkness without fear. I 
laud your skill and courage.
`,lPe=`37
Every time I hear of you, warrior, your 
deeds become more legendary.
 
But take heed. You are approaching the 
very summit of Mount Arreat. I have 
never dared venture there. It is sacred 
-- our most holy place. The legends say 
it is guarded by the Ancient Ones, who 
block the path of all who are unworthy.
 
Your reputation here does not 
matter...It will be the Ancients who 
determine your worthiness.
 
Good luck.
`,iPe=`63
The Ancients are not our enemies. 
Remember that! They are our 
ancestors -- our gods.
`,oPe=`90
A test of mettle is a fitting rite of 
passage for a Barbarian hero.
`,rPe=`72
You wouldn't have to test yourself 
against the Ancients if it weren't for 
Nihlathak's treachery. He was a fool 
and deserves to suffer for eternity.
`,cPe=`75
Every night, I've prayed to the Ancients 
to bring us peace...and now you must 
fight them.
 
Huh...Who shall I pray to now, warrior?
`,dPe=`65
By reaching the summit, you cease 
being just a simple warrior. When you 
come back, you will be far more.
`,uPe=`114
I warned you!
 
The Ancients are not like the demons 
you're accustomed to fighting.
`,hPe=`52
We have come too far to be defeated 
now, my friend. I have seen you 
complete many difficult quests. Though 
this may be your greatest trial, it is not 
beyond your reach.
`,mPe=`71
Look. I must apologize.
 
I feel responsible for your current 
struggle. If I had only stopped 
Nihlathak from giving Baal the Relic, 
you would not have to fight those 
ghosts.
`,gPe=`70
You've walked on the burial grounds of 
our greatest ancestors. I'm not sure 
whether I should bow before you or 
revile you for committing sacrilege.
 
Tread lightly when you walk with gods.
`,fPe=`68
Do not doubt yourself. I believe you are 
worthy to pass through the Ancients' 
gates, but you must believe, as well.
`,vPe=`75
Besting the Ancients in battle is a 
mighty feat indeed. I hope this means 
you're ready to battle Baal.
`,pPe=`67
You have proven yourself to these 
people. They look to you as their 
warrior, their champion.
`,yPe=`82
You stand before me a worthy hero -- 
and on you rests the last hope of our 
people.
 
Bear it well, warrior.
`,kPe=`82
The Ancients have honored you, and in 
turn, so do we. I have no remaining 
doubts about you, now.
`,bPe=`60
I knew the Ancients would find you 
worthy of Mount Arreat's secrets. Now, 
stop Baal before he destroys all that is 
sacred.
`,wPe=`31
You are a worthy hero! We augment 
your skill and grant you entry to the 
interior of Mount Arreat, wherein lies 
the Worldstone.
 
Beware. You will not be alone. Baal the 
Lord of Destruction is already inside. 
 
The Archangel Tyrael has always been 
our benefactor, but even he cannot 
help us now. For Baal blocks Tyrael's 
spiritual presence from entering the 
chamber of the Worldstone. Only you, 
mortal, have the power to defeat Baal 
now.
 
Baal threatens the Worldstone -- and 
through it, the mortal realm, itself. You 
must stop him before he gains full 
control of the sacred stone. With it 
under his control, Baal could shatter 
the boundaries between this world and 
the Burning Hells, thus allowing the 
hordes of the Prime Evils to pour forth 
into the mortal realm like an 
unstoppable tide!
 
If you are weak, the world as you know 
it could be lost forever. You must NOT 
fail!
`,MPe=`51
Remember this. Baal once possessed Tal 
Rasha, one of the most powerful of the 
ancient Horadrim.
 
Your battles with Mephisto and Diablo 
will pale in comparison to your battle 
with Baal.
 
The Lord of Destruction aided by Tal 
Rasha's knowledge...The mountain 
itself will tremble when you clash.
`,xPe=`59
I may be just an armorer, but I know 
this...Baal plans to destroy the world 
with the secrets contained in that 
mountain. It doesn't take a genius to 
know he has to be stopped.
`,SPe=`70
You knew it would eventually come down 
to this. Kill Baal! Finish the game!
`,LPe=`60
Baal has blocked Tyrael from entering 
the Worldstone Chamber? This truly 
has become a battle against Hell.
 
Whether or not it was the Heavens' 
decree, this is your fight now -- your 
destiny.
`,APe=`63
You have ventured to a place beyond 
legend. You rush to face an evil few 
can even imagine.
 
Be careful, my friend, and may the Light 
watch over you.
`,CPe=`40
I am impressed, mortal. You have 
overcome the greatest challenge this 
world has ever faced and defeated the 
last of the Prime Evils. However, we are 
too late to save the Worldstone. Baal's 
destructive touch has corrupted it 
completely.
 
Given enough time, the Worldstone's 
energies will drain away and the 
barriers between the worlds will 
shatter -- the powers of Hell will flood 
into this...Sanctuary...and eradicate 
your people and everything you've 
labored to build.
 
Therefore, I must destroy the corrupted 
Worldstone before the powers of Hell 
take root. This act will change your 
world forever -- with consequences 
even I cannot foresee. However, it is 
the only way to ensure mankind's 
survival.
 
Go now, mortal. I have opened a portal 
that will lead you to safety.
 
May the Eternal Light shine upon you 
and your descendants for what you've 
done this day. The continued survival 
of mankind is your legacy! Above all 
else, you have earned a rest from this 
endless battle.
`,IPe=`53
You have done the impossible, hero. 
Your defeat of the last of the three 
Prime Evils is a great victory for the 
Light. 
 
Strange that you say that the 
Worldstone must be destroyed. The 
prophecies said nothing about that.
 
Perhaps all we have fought for will be 
lost...or perhaps we'll never need fight 
again!
`,TPe=`40
I knew in time you would defeat Baal. 
You have done everything you set out 
to do, my friend.
 
Ever since you rescued me from 
Tristram, I have believed in you. It has 
been a supreme honor to aid you along 
the way. 
 
So...The Worldstone was corrupted by 
Baal. And now Tyrael must destroy it. 
Worry not. Through whatever lies 
ahead I have faith that the Light will 
guide us both.
 
Go, now, back to the Worldstone 
chamber, and enter the portal Tyrael 
has opened for you.
`,BPe=`74
The Ancients themselves will envy our 
songs about you.
 
Please, don't forget about us! Farewell, 
my friend.
`,HPe=`48
If Tyrael says the Worldstone must be 
destroyed, then it must. We cannot let 
Baal's corruption prevail!
 
The world will change, true -- but who is 
to say it isn't for the better?
`,DPe=`60
The destruction of the Worldstone does 
not bode well for our world. But I'll try 
not to worry...
 
After all, we have warriors like you 
fighting for us and for the Light.
 
Farewell!
`,GPe="Katar",EPe="Wrist Blade",FPe="Cestus",qPe="Claws",RPe="Blade Talons",PPe="Scissors Katar",NPe="Stag Bow",OPe="Reflex Bow",zPe="Maiden Spear",_Pe="Maiden Pike",WPe="Maiden Javelin",VPe="Glowing Orb",QPe="Crystalline Globe",UPe="Cloudy Sphere",KPe="Sparkling Ball",JPe="Swirling Crystal",$Pe="Ashwood Bow",jPe="Ceremonial Bow",YPe="Ceremonial Spear",ZPe="Ceremonial Pike",XPe="Ceremonial Javelin",e8e="Heavenly Stone",a8e="Eldritch Orb",t8e="Demon Heart",n8e="Vortex Orb",s8e="Dimensional Shard",l8e="Matriarchal Bow",i8e="Grand Matron Bow",o8e="Matriarchal Spear",r8e="Matriarchal Pike",c8e="Matriarchal Javelin",d8e="Jawbone Cap",u8e="Fanged Helm",h8e="Horned Helm",m8e="Assault Helmet",g8e="Avenger Guard",f8e="Targe",v8e="Rondache",p8e="Heraldic Shield",y8e="Aerin Shield",k8e="Crown Shield",b8e="Circlet",w8e="Coronet",M8e="Tiara",x8e="Diadem",S8e="Shako",L8e="Hydraskull",A8e="Armet",C8e="Giant Conch",I8e="Spired Helm",T8e="Corona",B8e="Demonhead",H8e="Dusk Shroud",D8e="Wyrmhide",G8e="Scarab Husk",E8e="Wire Fleece",F8e="Diamond Mail",q8e="Loricated Mail",R8e="Boneweave",P8e="Great Hauberk",N8e="Balrog Skin",O8e="Hellforge Plate",z8e="Kraken Shell",_8e="Lacquered Plate",W8e="Shadow Plate",V8e="Sacred Armor",Q8e="Archon Plate",U8e="Heater",K8e="Luna",J8e="Hyperion",$8e="Monarch",j8e="Aegis",Y8e="Ward",Z8e="Bramble Mitts",X8e="Vampirebone Gloves",e9e="Vambraces",a9e="Crusader Gauntlets",t9e="Ogre Gauntlets",n9e="Wyrmhide Boots",s9e="Scarabshell Boots",l9e="Boneweave Boots",i9e="Mirrored Boots",o9e="Myrmidon Greaves",r9e="Spiderweb Sash",c9e="Vampirefang Belt",d9e="Mithril Coil",u9e="Troll Belt",h9e="Colossus Girdle",m9e="Bone Visage",g9e="Troll Nest",f9e="Blade Barrier",v9e="Sacred Feathers",p9e="Griffon Headdress",y9e="Hunter's Guise",k9e="Alpha Helm",b9e="Totemic Mask",w9e="Jawbone Visor",M9e="Lion Helm",x9e="Rage Mask",S9e="Savage Helmet",L9e="Slayer Guard",A9e="Akaran Targe",C9e="Akaran Rondache",I9e="Protector Shield",T9e="Gilded Shield",B9e="Royal Shield",H9e="Mummified Trophy",D9e="Fetish Trophy",G9e="Sexton Trophy",E9e="Cantor Trophy",F9e="Hierophant Trophy",q9e="Sky Spirit",R9e="Sun Spirit",P9e="Earth Spirit",N9e="Blood Spirit",O9e="Dream Spirit",z9e="Carnage Helm",_9e="Fury Visor",W9e="Destroyer Helm",V9e="Conqueror Crown",Q9e="Guardian Crown",U9e="Sacred Targe",K9e="Sacred Rondache",J9e="Zakarum Shield",$9e="Vortex Shield",j9e="Minion Skull",Y9e="Hellspawn Skull",Z9e="Overseer Skull",X9e="Succubus Skull",eNe="Bloodlord Skull",aNe="Jewel",tNe="Small Charm",nNe="Large Charm",sNe="Grand Charm",lNe="Keep in Inventory to Gain Bonus",iNe=`Keep it to thaw Anya
Malah's Potion`,oNe="Zod Rune",rNe="Cham Rune",cNe="Jah Rune",dNe="Ber Rune",uNe="Sur Rune",hNe="Lo Rune",mNe="Ohm Rune",gNe="Vex Rune",fNe="Gul Rune",vNe="Ist Rune",pNe="Mal Rune",yNe="Um Rune",kNe="Pul Rune",bNe="Lem Rune",wNe="Fal Rune",MNe="Ko Rune",xNe="Lum Rune",SNe="Io Rune",LNe="Hel Rune",ANe="Dol Rune",CNe="Shael Rune",INe="Sol Rune",TNe="Amn Rune",BNe="Thul Rune",HNe="Ort Rune",DNe="Ral Rune",GNe="Tal Rune",ENe="Ith Rune",FNe="Eth Rune",qNe="Nef Rune",RNe="Tir Rune",PNe="Eld Rune",NNe="El Rune",ONe="Zod",zNe="Cham",_Ne="Jah",WNe="Ber",VNe="Sur",QNe="Lo",UNe="Ohm",KNe="Vex",JNe="Gul",$Ne="Ist",jNe="Mal",YNe="Um",ZNe="Pul",XNe="Lem",eOe="Fal",aOe="Ko",tOe="Lum",nOe="Io",sOe="Hel",lOe="Dol",iOe="Shael",oOe="Sol",rOe="Amn",cOe="Thul",dOe="Ort",uOe="Ral",hOe="Tal",mOe="Ith",gOe="Eth",fOe="Nef",vOe="Tir",pOe="Eld",yOe="El",kOe="'",bOe="Ancients' Pledge",wOe="Armageddon",MOe="Authority",xOe="Beast",SOe="Beauty",LOe="Black",AOe="Blood",COe="Bone",IOe="Bramble",TOe="Brand",BOe="Breath of the Dying",HOe="Broken Promise",DOe="Call to Arms",GOe="Chains of Honor",EOe="Chance",FOe="Chaos",qOe="Crescent Moon",ROe="Darkness",POe="Daylight",NOe="Death",OOe="Deception",zOe="Delirium",_Oe="Desire",WOe="Despair",VOe="Destruction",QOe="Doom",UOe="Dragon",KOe="Dread",JOe="Dream",$Oe="Duress",jOe="Edge",YOe="Elation",ZOe="Enigma",XOe="Enlightenment",eze="Envy",aze="Eternity",tze="Exile",nze="Faith",sze="Famine",lze="Flame",ize="Fortitude",oze="Fortune",rze="Friendship",cze="Fury",dze="Gloom",uze="Glory",hze="Grief",mze="Hand of Justice",gze="Harmony",fze="Hatred",vze="Heart of the Oak",pze="Heaven's Will",yze="Holy Tears",kze="Holy Thunder",bze="Honor",wze="Revenge",Mze="Humility",xze="Hunger",Sze="Ice",Lze="Infinity",Aze="Innocence",Cze="Insight",Ize="Jealousy",Tze="Judgement",Bze="King's Grace",Hze="Kingslayer",Dze="Knight's Vigil",Gze="Knowledge",Eze="Last Wish",Fze="Law",qze="Lawbringer",Rze="Leaf",Pze="Lightning",Nze="Lionheart",Oze="Lore",zze="Love",_ze="Loyalty",Wze="Lust",Vze="Madness",Qze="Malice",Uze="Melody",Kze="Memory",Jze="Mist",$ze="Morning",jze="Mystery",Yze="Myth",Zze="Nadir",Xze="Nature's Kingdom",e_e="Night",a_e="Oath",t_e="Obedience",n_e="Oblivion",s_e="Obsession",l_e="Passion",i_e="Patience",o_e="Patter",r_e="Peace",c_e="Voice of Reason",d_e="Penitence",u_e="Peril",h_e="Pestilence",m_e="Phoenix",g_e="Piety",f_e="Pillar of Faith",v_e="Plague",p_e="Praise",y_e="Prayer",k_e="Pride",b_e="Principle",w_e="Prowess in Battle",M_e="Prudence",x_e="Punishment",S_e="Purity",L_e="Question",A_e="Radiance",C_e="Rain",I_e="Reason",T_e="Red",B_e="Rhyme",H_e="Rift",D_e="Sanctuary",G_e="Serendipity",E_e="Shadow",F_e="Shadow of Doubt",q_e="Silence",R_e="Siren's Song",P_e="Smoke",N_e="Sorrow",O_e="Spirit",z_e="Splendor",__e="Starlight",W_e="Stealth",V_e="Steel",Q_e="Still Water",U_e="Sting",K_e="Stone",J_e="Storm",$_e="Strength",j_e="Tempest",Y_e="Temptation",Z_e="Terror",X_e="Thirst",eWe="Thought",aWe="Thunder",tWe="Time",nWe="Tradition",sWe="Treachery",lWe="Trust",iWe="Truth",oWe="Unbending Will",rWe="Valor",cWe="Vengeance",dWe="Venom",uWe="Victory",hWe="Voice",mWe="Void",gWe="War",fWe="Water",vWe="Wealth",pWe="Whisper",yWe="White",kWe="Wind",bWe="Wings of Hope",wWe="Wisdom",MWe="Woe",xWe="Wonder",SWe="Wrath",LWe="Youth",AWe="Zephyr",CWe="Spleen",IWe="Scalp",TWe="Soul",BWe="Quill",HWe="Fang",DWe="Flag",GWe="Tail",EWe="Horn",FWe="Eye",qWe="Jawbone",RWe="Brain",PWe="Heart",NWe="Stout",OWe="Antimagic",zWe="Null",_We="Godly",WWe="Ivory",VWe="Eburine",QWe="Blanched",UWe="Stalwart",KWe="Burly",JWe="Dense",$We="Thin",jWe="Compact",YWe="Pestilent",ZWe="Toxic",XWe="Corrosive",eVe="Foul",aVe="Septic",tVe="Shocking",nVe="Arcing",sVe="Buzzing",lVe="Static",iVe="Condensing",oVe="Flaming",rVe="Smoking",cVe="Smoldering",dVe="Fiery",uVe="Hibernal",hVe="Boreal",mVe="Shivering",gVe="Snowy",fVe="Mnemonic",vVe="Visionary",pVe="Eagleeye",yVe="Hawkeye",kVe="Falconeye",bVe="Sparroweye",wVe="Robineye",MVe="Paradox",xVe="Howling",SVe="Yelling",LVe="Calling",AVe="Alarming",CVe="Fool's",IVe="Faithful",TVe="Righteous",BVe="Honorable",HVe="Enlightened",DVe="Psychic",GVe="Cunning",EVe="Entrapping",FVe="Communal",qVe="Feral",RVe="Spiritual",PVe="Furious",NVe="Raging",OVe="Echoing",zVe="Resonant",_Ve="Sounding",WVe="Mojo",VVe="Venomous",QVe="Noxious",UVe="Fungal",KVe="Cursing",JVe="Blighting",$Ve="Hexing",jVe="Glacial",YVe="Freezing",ZVe="Chilling",XVe="Powered",eQe="Charged",aQe="Sparking",tQe="Volcanic",nQe="Blazing",sQe="Burning",lQe="Diamond",iQe="Celestial",oQe="Elysian",rQe="Astral",cQe="Unearthly",dQe="Arcadian",uQe="Aureolic",hQe="Victorious",mQe="Ambergris",gQe="Camphor",fQe="Chromatic",vQe="Scintillating",pQe="Turquoise",yQe="Jacinth",kQe="Zircon",bQe="Felicitous",wQe="Lucky",MQe="Wailing",xQe="Screaming",SQe="Argent",LQe="Tin",AQe="Nickel",CQe="Maroon",IQe="Chestnut",TQe="Vigorous",BQe="Brown",HQe="Dun",DQe="Realgar",GQe="Rusty",EQe="Cinnabar",FQe="Vermilion",qQe="Carmine",RQe="Carbuncle",PQe="Serrated",NQe="Scarlet",OQe="Bloody",zQe="Sanguinary",_Qe="Pearl",WQe="Divine",VQe="Hallowed",QQe="Sacred",UQe="Pure",KQe="Consecrated",JQe="Lunar",$Qe="Frantic",jQe="Hellacious",YQe="Quixotic",ZQe="Smiting",XQe="Stellar",eUe="Stinging",aUe="Singing",tUe="Timeless",nUe="Original",sUe="Corporal",lUe="Lawful",iUe="Chaotic",oUe="Fierce",rUe="Ferocious",cUe="Perpetual",dUe="Everlasting",uUe="Laden",hUe="Pernicious",mUe="Harmful",gUe="Evil",fUe="Insidious",vUe="Malicious",pUe="Spiteful",yUe="Precocious",kUe="Majestic",bUe="Sanguine",wUe="Monumental",MUe="Irresistible",xUe="Festering",SUe="Musty",LUe="Dusty",AUe="Decaying",CUe="Rotting",IUe="Infectious",TUe="Foggy",BUe="Cloudy",HUe="Hazy",DUe="Punishing",GUe="Obsidian",EUe="Royal",FUe="Frigid",qUe="Moldy",RUe="Gaudy",PUe="Impeccable",NUe="Soulless",OUe="Heated",zUe="Lasting",_Ue="Scorched",WUe="Marred",VUe="Lilac",QUe="Rose",UUe="Shimmering",KUe="Wicked",JUe="Strange",$Ue="Repulsive",jUe="Reclusive",YUe="Rude",ZUe="Hermetic",XUe="Rainbow",eKe="Colorful",aKe="Odiferous",tKe="Grinding",nKe="to Druid Skills",sKe="to Assassin Skills",lKe=" Sockets",iKe=" to Attack Rating vs. Demons",oKe=" to Attack Rating vs. Undead",rKe=" to Damage vs. Demons",cKe=" percent to Attack Rating",dKe=" to Javelin and Spear Skills",uKe=" to Passive and Magic Skills",hKe=" to Bow and Crossbow Skills",mKe=" to Defensive Aura Skills",gKe=" to Offensive Aura Skills",fKe=" to Combat Skills",vKe=" to Summoning Skills",pKe=" to Poison and Bone Skills",yKe=" to Curses",kKe=" to Warcry Skills",bKe=" to Combat Skills",wKe=" to Masteries Skills",MKe=" to Cold Skills",xKe=" to Lightning Skills",SKe=" to Fire Skills",LKe=" to Summoning Skills",AKe=" to Shape-Shifting Skills",CKe=" to Elemental Skills",IKe=" to Trap Skills",TKe=" to Shadow Discipline Skills",BKe=" to Martial Art Skills",HKe="(Based on Character Level)",DKe="(Increases During Nighttime)",GKe="(Increases During Daytime)",EKe="(Increases Near Dawn)",FKe="(Increases Near Dusk)",qKe=" Charges of",RKe="Increased Stack Size",PKe="Indestructible",NKe="Repairs %d durability per second",OKe="Repairs %d durability in %d seconds",zKe="Replenishes quantity",_Ke="Cast a Level %d",WKe="When You Swing",VKe="When You Get Hit",QKe="When You Hit an Enemy",UKe="Charges",KKe="Level",JKe="Per Level",$Ke="(%d/%d Charges)",jKe="(",YKe=")",ZKe="Stealth",XKe="Immunity to Poison",eJe="Cursed",aJe="Per Player in Party",tJe="Orb Class",nJe=" Elemental Damage",sJe="Helms:",lJe="Shields:",iJe="Weapons:",oJe="Armor:",rJe="Adds to Strength",cJe="Adds to Defense Rating",dJe="Adds to Attack Rating",uJe="Adds to Maximum Mana",hJe="Adds Resistance to Cold",mJe="Adds Cold Damage to Attack",gJe="Adds to Dexterity",fJe="Adds Resistance to Poison",vJe="Adds Poison Damage to Attack",pJe="Adds to Maximum Life",yJe="Adds Resistance to Fire",kJe="Adds Fire Damage to Attack",bJe="Adds to Attack Rating",wJe="Adds to All Resistances",MJe="Adds to Damage vs. Undead",xJe="Adds to Chance to Find Magic Items",SJe="Adds Resistance to Lightning",LJe="Adds Lightning Damage to Attack",AJe="Adds Mana and Life Regeneration",CJe="Adds Attacker Takes Damage",IJe="Adds Mana and Life Steal to Attack",TJe="Coldkill",BJe="Islestrike",HJe="Spellsteel",DJe="Stormrider",GJe="Fleshrender",EJe="Moonfall",FJe="Earthshaker",qJe="Bloodletter",RJe="Hexfire",PJe="Riftslash",NJe="Headstriker",OJe="Cloudcrack",zJe="Swordguard",_Je="Spineripper",WJe="Stormspike",VJe="Ribcracker",QJe="Warpspear",UJe="Skull Collector",KJe="Skystrike",JJe="Endlesshail",$Je="Vampire Gaze",jJe="Gore Rider",YJe="Lava Gout",ZJe="Visceratuant",XJe="Shaftstop",e$e="Blackhorn",a$e="Magewrath",t$e="Cliffkiller",n$e="Riphook",s$e="Razorswitch",l$e="Meatscrape",i$e="Deathbit",o$e="Warshrike",r$e="Gut Siphon",c$e="Razor's Edge",d$e="Stone Rattle",u$e="Marrow Grinder",h$e="Demon Limb",m$e="Steel Shade",g$e="Fleshbone",f$e="Odium",v$e="Bonehew",p$e="Steelrend",y$e="Shadow Dancer",k$e="Soul Drainer",b$e="Rune Master",w$e="Death Cleaver",M$e="Leviathan",x$e="Dawn Bringer",S$e="Dragontooth",L$e="Wisp Projector",A$e="Lacerator",C$e="Viperfork",I$e="Spirit Keeper",T$e="Hellrack",B$e="Rockhew",H$e="Catgut",D$e="Ghostflame",G$e="Shadow Killer",E$e="Eaglewind",F$e="Windhammer",q$e="Thunderstroke",R$e="Giant Maimer",P$e="Bloodmoon",N$e="Djinn Slayer",O$e="Cranebeak",z$e="Warhound",_$e="Gulletwound",W$e="Darksoul",V$e="Earth Shifter",Q$e="Fleshripper",U$e="Stonerage",K$e="Jade Talon",J$e="Wraithfang",$$e="Blade Master",j$e="Cerebus' Bite",Y$e="Sinblade",Z$e="Rune Slayer",X$e="Excalibur",eje="Stoneraven",aje="Moonrend",tje="Nightsummon",nje="Bonescalpel",sje="Snake Tongue",lje="Lifechoke",ije="Carnage Leaver",oje="Ghost Leach",rje="Soul Reaper",cje="Stormwillow",dje="Moon Shadow",uje="Strong Oak",hje="Demonweb",mje="Shade Falcon",gje="Glimmershred",fje="Wraith Flight",vje="Windstrike",pje="Titan's Fist",yje="Hadeshorn",kje="Rockstopper",bje="Stealskull",wje="Iron Pelt",Mje="Spirit Forge",xje="Toothrow",Sje="Corpsemourn",Lje="Stormchaser",Aje="Gravepalm",Cje="Ghoulhide",Ije="Hellmouth",Tje="Infernostride",Bje="Waterwalk",Hje="Silkweave",Dje="War Traveler",Gje="Razortail",Eje="Gloom's Trap",Fje="Snowclash",qje="Lance Guard",Rje="Boneflame",Pje="Steel Pillar",Nje="Darkfear",Oje="Dragonscale",zje="Ravenlore",_je="Boneshade",Wje="Nethercrow",Vje="Flamebellow",Qje="Death's Fathom",Uje="Wolfhowl",Kje="Stormlash",Jje="Frostwind",$je="Marrowwalk",jje="Metalite's Girth",Yje="Giant Skull",Zje="Astreon's Iron Ward",Xje="Drakeflame",eYe="Skulltred",aYe="Rings",tYe="Metalgrid",nYe="Stormshield",sYe="Armor",lYe="Windforce",iYe="Eaglehorn",oYe="Gimmershred",rYe="Widowmaker",cYe="Stormspire",dYe="Wizardspike",uYe="Doombringer",hYe="Lightsabre",mYe="Hellslayer",gYe="Endlesshail",fYe="Riftlash",vYe="Credendum",pYe="Bartuc's Chop Chop",yYe="Annihilus",kYe="Doomseer",bYe="Terra's Guardian",wYe="Triad's Foliage",MYe="Malignant Skull",xYe="Apocrypha",SYe="Homunculus",LYe="Xenos",AYe="Nagas",CYe="%0 %1",IYe=" Kick",TYe=" Kicks",BYe="Pet Life: ",HYe="Wolf Defense: ",DYe="Passive Bonus to Wolves and Bears",GYe=" per hit",EYe=" hit",FYe="%d Percent Chance of Critical Strike",qYe="Mana Cost Per Raven: ",RYe="Kurast Shield",PYe="Hatchet Hands",NYe="Kick Damage: ",OYe="Kick Damage:",zYe="Percent Chance to Cast",_Ye="Frozen Anya",WYe="Larzuk will add sockets to the item of your choice.",VYe="Find Nihlathak in the Halls of Vaught.",QYe="Rescue Anya.",UYe="Free the soldiers from their prison and lead them back to town.",KYe="Anya will personalize an item for you.",JYe="Kill Baal in the Worldstone Chamber before he corrupts it.",$Ye="Find Baal's Throne Room.",jYe="THE SISTER'S LAMENT",YYe="DESERT JOURNEY",ZYe="MEPHISTO'S JUNGLE",XYe="ENTER HELL",eZe="TERROR'S END",aZe="SEARCH FOR BAAL",tZe="DESTRUCTION'S END",nZe="Say 'Retreat'",sZe=`Right Click to Cast
Scroll of Resistance`,lZe="Death Mage",iZe="Abaddon",oZe="Pit of Acheron",rZe="Infernal Pit",cZe=" per blade",dZe="Can be Inserted into Socketed Items",uZe="Kill Baal's Minions.",hZe="%d%% Chance to cast level %d %s on attack",mZe="%d%% Chance to cast level %d %s on striking",gZe="%d%% Chance to cast level %d %s when struck",fZe="Keep in inventory to gain bonus",vZe="Defensive",pZe="Offensive",yZe="Combat",kZe="Elemental Charge-up Damage: ",bZe="Retreat!",wZe="Run away!",MZe="So, it begins.",xZe="They'll never see me coming.",SZe="So dark... perfect.",LZe="So, this is where evil hides.",AZe="Whose handiwork lies buried here?",CZe="Planting the dead... How odd.",IZe="Such corruption in this place...",TZe="Evil flows from here.",BZe="Who would want to remember this place?",HZe="I can smell why this tower was abandoned.",DZe="Try and cage me, demons.",GZe="Bars can't hold a force of nature.",EZe="I don't like it down here.",FZe="The supernatural is strong here.",qZe="The Rogues' test is done.",RZe="Bah! Is that all of them?",PZe="What I kill stays dead.",NZe="Your time is past, Blood Raven.",OZe="How has this tree escaped corruption?",zZe="This dead tree teems with energy.",_Ze="These stones hold an ancient power.",WZe="Such stones are common back home.",VZe="Tristram... The first to fall to Diablo's wrath.",QZe="Ruins... the fate of all cities.",UZe="Cain! Go to the Rogue camp.",KZe="Deckard Cain, leave this place!",JZe="A Malus! This should go to Charsi.",$Ze="Charsi will be thankful to get this Malus.",jZe="Death becomes you, Andariel.",YZe="Your reign is over, Andariel.",ZZe="Why must evil hide in such wretched places?",XZe="Face the light or lurk in darkness.",eXe="Vengeance... for Atma.",aXe="Return to dust, Radament.",tXe="An eclipse... never a good omen.",nXe="Strange... an unexpected eclipse.",sXe="Dark magic in a darker tomb...",lXe="Snakes... I hate snakes.",iXe="Serpents! I expected worse.",oXe="The sun warms the world once more.",rXe="The Sanctuary - Horazon's obsession.",cXe="This was not designed by nature's Architect.",dXe="Summoner, the dark magics have corrupted you.",uXe="This place would drive anyone mad.",hXe="Horazon. Your decoy is dead.",mXe="Now I can leave this twisted nightmare.",gXe="The Horadrim have left their mark here.",fXe="These Horadric markings are mysterious.",vXe="I can sense Tal Rasha's presence now.",pXe="So, Tal Rasha... This is your resting place.",yXe="I shall track the Prime Evils to the ends of the world.",kXe="Diablo... I will find you yet.",bXe="Black books make for dark thoughts.",wXe="An ancient manuscript...  This could be useful.",MXe="Ormus... You have strange taste in books.",xXe="Ormus... study the book well.",SXe="And I thought the Forgotten Tower stank.",LXe="This smells worse than the sewers of Lut Gohlein.",AXe="Levers are made to be pulled.",CXe="Finally... The drain lever.",IXe="This is one drain I don't mind cleaning out.",TXe="From trash to treasure...",BXe="What a delicious blade! I should consult Ormus.",HXe="Ormus may know something about this unusual blade.",DXe="Hmm, a jade statue. What should I do with it?",GXe="It looks like jade. Perhaps it's worth something.",EXe="I dread this place of darkness.",FXe="This temple is a nest of evil.",qXe="The dark magic here is dispelled.",RXe="There is hope once again.",PXe="Mephisto... I'm coming for you.",NXe="Hatred stirs within me.",OXe="Mephisto's hatred was a poisonous void.",zXe="Corruption... take flight.",_Xe="I have no pity for him. Oblivion is his reward.",WXe="Terror stalks Hell no more.",VXe="Eternal suffering would be too brief for you, Diablo.",QXe="Lord Diablo I have bested you.",UXe="Let Diablo's death end the reign of the Three!",KXe="The reign of Terror has ended.",JXe="A hero's mistake is finally corrected.",$Xe="Thus ends the plague of Terror.",jXe="My magic will break the siege.",YXe="The time has come to cleanse my homeland!",ZXe="It takes more than a siege to stop me.",XXe="Baal. I'm coming for you.",eea="The siege must be stopped.",aea="You'll pay for your atrocities, Baal.",tea="Baal! Nothing will stand in my way.",nea="Harrogath can rest easier now.",sea="The siege is broken.",lea="My, my, what a messy little demon.",iea="Harrogath is free of your kind, demon.",oea="Oops...Did I do that?",rea="Shenk, your command has ended.",cea="The catapults have been silenced.",dea="Could this be a trap?",uea="A coward's hiding place.",hea="Ahh, the familiar scent of death.",mea="By the Light! What is this place?",gea="...Nihlathak's home away from home.",fea="I should have known...",vea="Nihlathak... you can't hide from me.",pea="Your power was no match for mine.",yea="A fitting death for a traitor.",kea="You were a sad little man, Nihlathak.",bea="Nihlathak. What led you to this end?",wea="Conspiring with Baal... What a tragic mistake.",Mea="You Dark Mages are all alike - obsessed with power.",xea="Betrayer, you've reaped your reward.",Sea="The fabled home of the Ancients.",Lea="The guardians of Mount Arreat await.",Aea="The resting place of the Ancients...",Cea="The summit - The Barbarian holy ground.",Iea="The fabled home of the Ancients.",Tea="I shall prove worthy.",Bea="At last...The summit of Mount Arreat.",Hea="The power of the Worldstone washes over me.",Dea="The halls of the Ancients... Magnificent.",Gea="So, this is what the Ancients guard.",Eea="The Worldstone! Praise the Light.",Fea="The Worldstone!",qea="The Worldstone. What power.",Rea="The legendary Worldstone - guardian of the Natural realm.",Pea="The last of the Three has fallen.",Nea="The Prime Evils are no more.",Oea="Baal, never doubt my skills.",zea="Baal, you shall no longer taint this mortal realm.",_ea="My work here is truly done.",Wea="The Evil brotherhood is no more.",Vea="Baal! Join your brothers in oblivion.",Qea="Raven",Uea="summon ravens",Kea=`the eyes of your enemies
summon ravens to peck out`,Jea="Raven",$ea="Werewolf",jea="transform into a werewolf",Yea="transform into a werewolf",Zea="Werewolf",Xea="Lycanthropy",eaa="passive - improves shape-shifting ability",aaa=`when in werewolf or werebear form
passive - improves duration and life`,taa="Lycanthropy",naa="Firestorm",saa="unleash fiery chaos",laa="unleash fiery chaos to burn your enemies",iaa="Firestorm",oaa="Oak Sage",raa="summon the spirit of the oak",caa=`life for you and your party
summon a spirit pet that increases`,daa="Oak Sage",uaa="Summon Spirit Wolf",haa="summon a wolf",maa=`to fight by your side
summon a wolf with teleporting ability`,gaa="Sum Spt Wolf",faa="Werebear",vaa="transform into a werebear",paa="transform into a werebear",yaa="Werebear",kaa="Molten Boulder",baa="launch a molten boulder",waa=`that knocks back your enemies
launch a boulder of flaming hot magma`,Maa="Molten Boulder",xaa="Arctic Blast",Saa="shoot a jet of ice",Laa=`to burn your enemies with frost
blast a continuous jet of ice`,Aaa="Arctic Blast",Caa="Carrion Vine",Iaa="summon corpse eating vine",Taa=`and replenishes your life
summon a vine that eats corpses`,Baa="Carrion Vine",Haa="Feral Rage",Daa="life-stealing rage attack - werewolf form",Gaa=`with successive hits
increasing amounts of life from your enemies
go into a frenzied rage to steal
when in werewolf form,`,Eaa="Feral Rage",Faa="Maul",qaa="maul your enemies - werebear form",Raa=`with successive hits
for increasing extra damage
maul your enemies
when in werebear form,`,Paa="Maul",Naa="Fissure",Oaa="open the earth to burn enemies",zaa=`burning them to a crisp
open volcanic vents below your enemies,`,_aa="Fissure",Waa="Cyclone Armor",Vaa="shield from elemental damage",Qaa=`fire, cold, and lightning
shield yourself from damage caused by`,Uaa="Cyclone Armor",Kaa="Heart of Wolverine",Jaa="summon a wolverine spirit",$aa=`of you and your party
to the damage and attack rating
summon a spirit pet that adds`,jaa="Wolverine Hrt",Yaa="Summon Dire Wolf",Zaa="summon an enraged wolf",Xaa=`it does to enemies
eating corpses to increase damage
summon a wolf that becomes enraged,`,eta="Summon D Wolf",ata="Rabies",tta="bite causes disease - werewolf form",nta=`that spreads to other monsters
to inflict them with disease
bite your enemies
when in werewolf form,`,sta="Rabies",lta="Fire Claws",ita="fiery, mauling attack",ota=`with a fiery claw attack
form, maul your enemies
when in werewolf or werebear`,rta="Fire Claws",cta="Twister",dta="release several small whirlwinds",uta=`cut a path through your enemies
release several small whirlwinds that`,hta="Twister",mta="Solar Creeper",gta="summon corpse eating vine",fta=`and replenishes your mana
summon a vine that eats corpses`,vta="Sol Creep",pta="Hunger",yta="life-and-mana-stealing bite",kta=`to gain life and mana
form, bite your enemies
when in werewolf or werebear`,bta="Hunger",wta="Shock Wave",Mta="create shock waves - werebear form",xta=`that stuns nearby enemies
stomp to create a shock wave
when in werebear form,`,Sta="Shock Wave",Lta="Volcano",Ata="create a volcano",Cta=`and destruction over your enemies
summon forth a volcano to rain death`,Ita="Volcano",Tta="Tornado",Bta="create a tornado",Hta=`to blast your enemies
create a funnel of wind and debris`,Dta="Tornado",Gta="Spirit of Barbs",Eta="summon a spirit pet of thorns",Fta=`back at your enemies
taken by you and your party
summon spirit pet that reflects damage`,qta="Spirit Barbs",Rta="Summon Grizzly",Pta="summon a grizzly bear",Nta="summon a ferocious grizzly bear",Ota="Summon Grizzly",zta="Fury",_ta="multiple attacks - werewolf Form",Wta=`or one target multiple times
either multiple adjacent targets
when in werewolf form, attack`,Vta="Fury",Qta="Armageddon",Uta="rain fire on your enemies",Kta=`destruction on nearby enemies
create a meteor shower to rain fiery`,Jta="Armageddon",$ta="Hurricane",jta="create a massive wind storm",Yta=`debris to pound your enemies to bits
create a massive storm of wind and`,Zta="Hurricane",Xta="Fire Blast",ena="throw a fire bomb",ana=`to blast your enemies to bits
throw a fire bomb`,tna="Fire Blast",nna="Claw Mastery",sna="passive - improves claw-class weapons ability",lna=`with claw-class weapons
passive - improves your skill`,ina="Claw Mastery",ona="Psychic Hammer",rna="a mind blast to crush your enemies",cna=`to crush and knock back your enemies
to create a psychic blast
use the power of your mind`,dna="Psyc Hammer",una="Tiger Strike",hna=`increases damage of finishing moves

Charge-up Skill`,mna=`normal attack to release charges
must use a dragon finishing move or
to finishing moves
consecutive hits add damage bonuses

Charge-up Skill
`,gna="Tiger Strike",fna="Dragon Talon",vna=`kick your enemies

Finishing Move`,pna=`adds charged-up bonuses to the kick
kick your enemies out of your way

Finishing Move
`,yna="Dragon Talon",kna="Shock Web",bna="throw a web of lightning",wna=`to shock your enemies
throw a web of lightning`,Mna="Shock Web",xna="Blade Sentinel",Sna="set a spinning blade",Lna=`between you and target point
set a spinning blade to patrol`,Ana="Blade Sentinel",Cna="Burst of Speed",Ina="increases attack and movement speed",Tna=`for a period of time
increases attack and movement speed`,Bna="Burst of Speed",Hna="Fists of Fire",Dna=`adds fire damage to finishing moves

Charge-up Skill`,Gna=`normal attack to release charges
must use a dragon finishing move or
can only be used with claw-class weapons
to finishing moves
consecutive hits add fire damage

Charge-up Skill
`,Ena="Fists of Fire",Fna="Dragon Claw",qna=`double claw attack

Finishing Move`,Rna=`adds charged-up bonuses to both claw attacks
with your dual claw-class weapons
slice and dice your enemies

Finishing Move
`,Pna="Dragon Claw",Nna="Charged Bolt Sentry",Ona="a trap that emits charged bolts",zna=`at enemies that pass near
a trap that emits charged bolts`,_na="Charged Bolt",Wna="Wake of Fire",Vna="a trap that emits waves of fire",Qna="a trap that emits waves of fire",Una="Wake of Fire",Kna="Weapon Block",Jna="passive - block with two claw-class weapons",$na=`you are using dual claw-class weapons
passive - chance to block when`,jna="Wpn Block",Yna="Cloak of Shadows",Zna="blind your enemies",Xna=`lowering their defenses for a period of time
cast a shadow to blind nearby enemies`,esa="Cloak of Shdws",asa="Cobra Strike",tsa=` adds life and mana stealing to finishing moves

Charge-up Skill`,nsa=`normal attack to release charges
must use a dragon finishing move or
to finishing moves
consecutive hits add life and mana stealing

Charge-up Skill
`,ssa="Cobra Strike",lsa="Blade Fury",isa="throw spinning blades",osa=`to slice up your enemies
throw spinning blades`,rsa="Blade Fury",csa="Fade",dsa="temporary resist all",usa=`for a period of time
raise all resistances and resist curses`,hsa="Fade",msa="Shadow Warrior",gsa="summon a shadow of yourself",fsa=`your skills and fights by your side
summon a shadow of yourself that mimics`,vsa="Shdw Warrior",psa="Claws of Thunder",ysa=`adds lightning damage to finishing moves
 
Charge-up Skill`,ksa=`normal attack to release charges
must use a dragon finishing move or
can only be used with claw-class weapons
to finishing moves
consecutive hits add lightning damage

Charge-up Skill
`,bsa="Thunder Claws",wsa="Dragon Tail",Msa=`explosive kick

Finishing Move`,xsa=`adds charged-up bonuses to the kick
knock back your enemies with an explosive kick

Finishing Move
`,Ssa="Dragon Tail",Lsa="Lightning Sentry",Asa="a trap that emits lightning",Csa=`to scorch passing enemies
a trap that shoots lightning`,Isa="Lightning Sentry",Tsa="Wake of Inferno",Bsa="trap that sprays fire",Hsa="trap that sprays fire at passing enemies",Dsa="Wake of Inferno",Gsa="Mind Blast",Esa="compelling psionic blast",Fsa=`and convert the feeble-minded
stun a group of enemies
using the power of your mind`,qsa="Mind Blast",Rsa="Blades of Ice",Psa=`adds cold damage to finishing moves

Charge-up Skill`,Nsa=`normal attack to release charges
must use a dragon finishing move or
can only be used with claw-class weapons
to finishing moves
consecutive hits add cold damage

Charge-up Skill
`,Osa="Blades of Ice",zsa="Dragon Flight",_sa=`teleport and kick enemies

Finishing Move`,Wsa=`adds charged-up bonuses to the kick
and destroy them with a kick
teleport to your enemies

Finishing Move
`,Vsa="Dragon Flight",Qsa="Death Sentry",Usa="trap that explodes nearby corpses",Ksa=`or explodes nearby corpses laying waste to more enemies
trap that shoots lightning at your enemies`,Jsa="Death Sentry",$sa="Blade Shield",jsa="spinning blades of defense",Ysa=`who stray too close
spinning blades slice enemies`,Zsa="Blade Shield",Xsa="Venom",ela="poison your weapon",ala="add poison damage to your weapons",tla="Venom",nla="Shadow Master",sla="summon your shadow",lla=`to fight by your side
summon a powerful shadow of yourself`,ila="Shdw Master",ola="Phoenix Strike",rla=`adds elemental novas to finishing moves

Charge-up Skill`,cla=`normal attack to release charges
must use a dragon finishing move or
adds elemental novas to finishing moves

Charge-up Skill
`,dla="Phnx Strike",ula=" per kick",hla="Life Steal: ",mla="Chance to stun: ",gla="Chance to afflict target: ",fla="Charge 1 - ",vla="Charge 2 - ",pla="Charge 3 - ",yla="Adds ",kla="Finishing Move Bonuses",bla=" percent life stealing",wla=" percent life and mana stealing ",Mla="burning damage",xla=" percent damage",Sla="Lowers Resistance ",Lla=" to melee attacks",Ala="Mana Steal: ",Cla="Feral Pets: ",Ila=" Percent Attack",Tla=" Percent Life",Bla=" Percent Damage",Hla="Finishing Move - ",Dla="Mana Recovered: ",Gla="meteor damage: ",Ela="chain lightning damage: ",Fla="chaos ice bolt damage: ",qla="lightning damage: ",Rla="nova damage: ",Pla="charged bolt damage: ",Nla="fire damage: ",Ola="fire damage radius: ",zla="burning duration: ",_la="cold damage: ",Wla="cold damage radius: ",Vla="freeze duration: ",Qla="Raven",Ula="Wolf",Kla="Bear",Jla="Poison Creeper",$la="Carrion Vine",jla="Solar Creeper",Yla="Spirit of Barbs",Zla="Heart of Wolverine",Xla="Vine",eia="Spirit",aia="Dire Wolf",tia="Warrior",nia="Shadow",sia="Master",lia="Eagle",iia="Wolf",oia="Bear",ria="Catapult",cia="Catapult",dia="Catapult",uia="Catapult",hia="Catapult",mia="Snow Drifter",gia="Abominable",fia="Chilled Froth",via="Frozen Abyss",pia="Warped Fallen Wolfrider",yia="Darkone Wolfrider",kia="Devilkin Wolfrider",bia="Carver Wolfrider",wia="Fallen Wolfrider",Mia="Ghostly",xia="Fanatic",Sia="Possessed",Lia="Berserker",Aia="Larzuk",Cia="Anya",Iia="Malah",Tia="Nihlathak",Bia="Barbarian Captive",Hia="Moe",Dia="Curly",Gia="Larry",Eia="Pindleskin",Fia="Frozenstein",qia="(Druid Only)",Ria="(Assassin Only)",Pia="(Amazon Only)",Nia="(Barbarian Only)",Oia="Summoning",zia="Shape",_ia="Shifting",Wia="Elemental",Via="Traps",Qia="Shadow",Uia="Disciplines",Kia="Martial",Jia="Arts",$ia="Chest",jia="Wooden Chest",Yia="Burial Chest",Zia="Burial Chest",Xia="Chest",eoa="Chest",aoa="Chest",toa="Wooden Chest",noa="Chest",soa="Pyre of Flesh",loa="Burning Pit",ioa="Town Flag",ooa="Chandelier",roa="Jar",coa="Jar",doa="Jar",uoa="Swinging Heads",hoa="Pole",moa="Skulls and Rocks",goa="Hell Gate",foa="Main Gate",voa="Banner",poa="Banner",yoa="Pole",koa="Stash",boa="Debris",woa="Wooden Chest",Moa="Wooden Chest",xoa="Hidden Stash",Soa="Torch",Loa="Torch",Aoa="Tomb",Coa="Tomb",Ioa="Tomb",Toa="Torch",Boa="Torch",Hoa="Torch",Doa="Smoke",Goa="Dead Barbarian",Eoa="Dead Barbarian",Foa="Cage",qoa="Shrine",Roa="Jar",Poa="Jar",Noa="Jar",Ooa="Jar",zoa="Evil Urn",_oa="Altar",Woa="Death Pole",Voa="Death Pole",Qoa="Chest",Uoa="Skulls and Rocks",Koa="Jar",Joa="Torch",$oa="Torch",joa="Fire",Yoa="Torch",Zoa="Health Shrine",Xoa="Barrel",era="Hidden Stash",ara="Shrine",tra="Shrine",nra="Fire Pit",sra="Torch Pit",lra="Hidden Stash",ira="Hidden Stash",ora="Box",rra="Tomb",cra="Tomb",dra="Tomb",ura="Tomb",hra="Tomb",mra="Corpse",gra="Candles",fra="Shrub",vra="Shrub",pra="Corpse",yra="Altar of the Heavens",kra="Hidden Stash",bra="Weapon Rack",wra="Weapon Rack",Mra="Armor Stand",xra="Armor Stand",Sra="Siege on Harrogath",Lra="Stop the Siege by killing Shenk the Overseer in the Bloody Foothills.",Ara="Kill Shenk the Overseer.",Cra="Go talk to Larzuk for your reward.",Ira="Rescue on Mount Arreat",Tra="Find the Soldiers in the Frigid Highlands.",Bra="Rescue %d more Soldiers in the Frigid Highlands.",Hra="Return to Qual-Kehk for your reward.",Dra="Apply the Runes to a Socketed item in this order:",Gra="Prison of Ice",Era="Look for Anya under the Crystalline Passage by the Frozen River.",Fra="Talk to Malah.",qra="Use the potion Malah gave you to thaw Anya.",Rra="Talk to Malah for your reward.",Pra="Talk to Anya.",Nra="Betrayal of Harrogath",Ora="Take Anya's portal to Nihlathak's Temple.",zra="Kill Nihlathak.",_ra="Talk to Anya before you continue through the Crystalline Passage, past the Glacial Trail, to proceed up Mount Arreat to the Summit.",Wra="Rite of Passage",Vra="Travel through the Ancient's Way to find the Ancients at the Arreat Summit.",Qra="Consult with the Ancients by activating the Altar of the Heavens.",Ura="Defeat all three Ancients without leaving Mount Arreat.",Kra="Eve of Destruction",Jra="Consult with the Ancients.",$ra="Kill Baal.",jra="Talk to Tyreal.",Yra="Take Tyreal's Portal to Safety.",Zra="Harrogath",Xra="Drop Potion on Portrait to Heal",eca="Right-click to Open Inventory (%s)",aca="Dismiss",tca="Dismiss Hireling",nca="Rehire",sca="Resurrect",lca="Resurrect %s: %d",ica="Thanks.",oca="Thank you.",rca="I needed that.",cca="It is good to work for someone who cares.",dca="Good for you.",uca="I sense danger.",hca="I hate these vermin.",mca="I have a bad feeling about this.",gca="Beware!",fca="I detest spiders.",vca="Eek, snakes!",pca="I am more experienced.",yca="I am hurt!",kca="Help!",bca="I am dying.",wca="Help me!",Mca="Good morning.",xca="Good afternoon.",Sca="Good evening.",Lca="Hello.",Aca="Skill 9",Cca="Skill 10",Ica="Skill 11",Tca="Skill 12",Bca="Skill 13",Hca="Skill 14",Dca="Skill 15",Gca="Skill 16",Eca="Toggle MiniMap",Fca="Swap Weapons",qca="Hireling Screen",Rca="Hireling Inventory",Pca="Hireling",Nca="add sockets",Oca="personalize",zca="Choose the item to which you wish to add sockets.",_ca="Varaya",Wca="Khan",Vca="Klisk",Qca="Bors",Uca="Brom",Kca="Wiglaf",Jca="Hrothgar",$ca="Scyld",jca="Healfdane",Yca="Heorogar",Zca="Halgaunt",Xca="Hygelac",eda="Egtheow",ada="Bohdan",tda="Wulfgar",nda="Hild",sda="Heatholaf",lda="Weder",ida="Vikhyat",oda="Unferth",rda="Sigemund",cda="Heremod",dda="Hengest",uda="Folcwald",hda="Frisian",mda="Hnaef",gda="Guthlaf",fda="Oslaf",vda="Yrmenlaf",pda="Garmund",yda="Lanth",kda="Eadgils",bda="Onela",wda="Damien",Mda="Tryneus",xda="Klar",Sda="Wulf",Lda="Bulwye",Ada="Lief",Cda="Magnus",Ida="Klatu",Tda="Drus",Bda="Hoku",Hda="Kord",Dda="Uther",Gda="Ip",Eda="Ulf",Fda="Tharr",qda="Kaelim",Rda="Ulric",Pda="Alaric",Nda="Ethelred",Oda="Caden",zda="Elgifu",_da="Tostig",Wda="Alcuin",Vda="Emund",Qda="Sigurd",Uda="Gorm",Kda="Hollis",Jda="Ragnar",$da="Torkel",jda="Wulfstan",Yda="Alban",Zda="Barloc",Xda="Bill",eua="Theodoric",aua="Bartuc's Cut-Throat",tua="Fire Damage Reduced by",nua="Cold Damage Reduced by",sua="Lightning Damage Reduced by",lua="Poison Damage Reduced by",iua="Absorbs Magic Damage",oua="Absorbs Fire Damage",rua="Absorbs Cold Damage",cua="Absorbs Lightning Damage",dua="Absorbs Poison Damage",uua="Void",hua=" to your attack",mua="+%d to Javelin and Spear Skills",gua="+%d to Passive and Magic Skills",fua="+%d to Bow and Crossbow Skills",vua="+%d to Defensive Auras",pua="+%d to Offensive Auras",yua="+%d to Summoning Skills",kua="+%d to Poison and Bone Skills",bua="+%d to Curses",wua="+%d to Warcries",Mua="+%d to Combat Skills",xua="+%d to Masteries",Sua="+%d to Cold Skills",Lua="+%d to Lightning Skills",Aua="+%d to Fire Skills",Cua="+%d to Summoning Skills",Iua="+%d to Shape Shifting Skills",Tua="+%d to Elemental Skills",Bua="+%d to Traps",Hua="+%d to Shadow Disciplines",Dua="+%d to Martial Arts",Gua="No Magic, Socketed, Rare, Unique, or Set Items. No Jewelry.",Eua="Undead",Fua="Demon",qua="",Rua="",Pua="Immune to Fire",Nua="Immune to Cold",Oua="Immune to Lightning",zua="Immune to Poison",_ua="Immune to Physical",Wua="Immune to Magic",Vua="%s's",Qua="%s'",Uua="%0",Kua="The EXPANSION LADDER displays the top characters, ranked by experience. The default setting displays overall rankings, but you can view sorted lists after selecting the By Class option.",Jua="The EXPANSION HARDCORE LADDER displays the top Hardcore characters, ranked by experience. The default setting displays overall rankings, but you can view sorted lists after selecting By Class option.",$ua="Druid",jua="Assassin",Yua="Druid",Zua="Assassin",Xua="%s: %d%%",eha="Average chance %s will hit you: %d%%",aha=`Chance to Block: %d%%
Average chance %s will hit you: %d%%`,tha="%s permits you to loot his corpse.",nha="%s permits you to loot her corpse.",sha="%s no longer allows you to access his corpse.",lha="%s no longer allows you to access her corpse.",iha="You are hostile towards each other.",oha="%s is hostile to you, but you are friendly to him.",rha="%s is hostile to you, but you are friendly to her.",cha="%s is friendly to you, but you are hostile to her.",dha="You are friendly to each other.",uha="You may loot each other's corpse.",hha="%s may loot your corpse, but you may not loot his.",mha="%s may loot your corpse, but you may not loot hers.",gha="%s may not loot your corpse, but you may loot his.",fha="%s may not loot your corpse, but you may loot hers.",vha="Neither of you may loot the other's corpse.",pha=" ",yha=" ",kha=" ",bha=" ",wha=" ",Mha=" ",xha=" ",Sha=" ",Lha=" ",Aha=" ",Cha=" ",Iha=" ",Tha=" ",Bha=" ",Hha=" ",Dha=" ",Gha=" ",Eha=" ",Fha=" ",qha=" ",Rha=" ",Pha=" ",Nha=" ",Oha=" ",zha=" ",_ha=" ",Wha=" ",Vha=" ",Qha=" ",Uha=" ",Kha=`or bolts with fire
magically enhances your arrows`,Jha=" ",$ha=" ",jha=" ",Yha=`cold arrows only do half of their regular damage
by adding cold damage and a slowing effect
magically enhances your arrows or bolts`,Zha=" ",Xha=" ",ema=" ",ama=" ",tma=" ",nma=" ",sma=" ",lma=" ",ima=" ",oma=" ",rma=" ",cma=`cold arrows only do half of their regular damage
by adding cold damage and a slowing effect
magically enhances your arrows or bolts`,dma=" ",uma=" ",hma=" ",mma=" ",gma=" ",fma=" ",vma=" ",pma=" ",yma=" ",kma=" ",bma=" ",wma=" ",Mma=" ",xma=" ",Sma=" ",Lma=" ",Ama=" ",Cma=" ",Ima=" ",Tma=`contact, damaging all nearby enemies
enchants an arrow or bolt that explodes on`,Bma=" ",Hma=" ",Dma=" ",Gma=" ",Ema=" ",Fma=" ",qma=" ",Rma=" ",Pma=" ",Nma=" ",Oma=" ",zma=" ",_ma=" ",Wma=" ",Vma=" ",Qma=" ",Uma=" ",Kma=" ",Jma=" ",$ma=`to freeze your enemies
magically enhances your arrow or bolt`,jma=" ",Yma=" ",Zma=" ",Xma=" ",ega=" ",aga=" ",tga=" ",nga=" ",sga=" ",lga=" ",iga=" ",oga=" ",rga=" ",cga=" ",dga=" ",uga=" ",hga=" ",mga=" ",gga=" ",fga=" ",vga=" ",pga=" ",yga=" ",kga=`creates a pyre upon impact
cause severe fire damage and
enhances arrows or bolts to`,bga=" ",wga=" ",Mga=" ",xga=" ",Sga=" ",Lga=" ",Aga=" ",Cga=" ",Iga=" ",Tga=" ",Bga=" ",Hga=" ",Dga=" ",Gga=" ",Ega=" ",Fga=`to freeze entire groups of monsters
magically enhances an arrow or bolt`,qga=" ",Rga=" ",Pga=" ",Nga=" ",Oga=" ",zga=" ",_ga=" ",Wga=" ",Vga=" ",Qga=" ",Uga=" ",Kga=" ",Jga=" ",$ga=" ",jga=" ",Yga=" ",Zga=" ",Xga=" ",efa=" ",afa=" ",tfa=" ",nfa=" ",sfa=" ",lfa=" ",ifa=" ",ofa=" ",rfa=" ",cfa=" ",dfa=" ",ufa=" ",hfa=" ",mfa=" ",gfa=" ",ffa=" ",vfa=" ",pfa=" ",yfa=" ",kfa=" ",bfa=" ",wfa=" ",Mfa=" ",xfa=" ",Sfa=" ",Lfa=`of all nearby enemies
creates an electrical field that reduces life`,Afa=" ",Cfa=" ",Ifa=" ",Tfa=" ",Bfa=" ",Hfa=" ",Dfa=" ",Gfa=" ",Efa=" ",Ffa=" ",qfa=" ",Rfa=" ",Pfa=" ",Nfa=" ",Ofa=" ",zfa=" ",_fa=" ",Wfa=" ",Vfa=" ",Qfa=" ",Ufa=" ",Kfa=" ",Jfa=" ",$fa=" ",jfa=" ",Yfa=" ",Zfa=" ",Xfa=" ",eva=" ",ava=" ",tva=" ",nva=" ",sva=" ",lva=" ",iva=" ",ova=" ",rva=" ",cva=" ",dva=" ",uva=" ",hva=" ",mva=" ",gva=" ",fva=" ",vva=" ",pva=" ",yva=" ",kva=" ",bva=" ",wva=" ",Mva=" ",xva=" ",Sva=" ",Lva=" ",Ava=" ",Cva=" ",Iva=" ",Tva=" ",Bva=" ",Hva=" ",Dva=" ",Gva=" ",Eva=" ",Fva=" ",qva=" ",Rva=" ",Pva=" ",Nva=" ",Ova=" ",zva=" ",_va=" ",Wva=" ",Vva=" ",Qva=" ",Uva=" ",Kva=" ",Jva=" ",$va=" ",jva=" ",Yva=" ",Zva=" ",Xva=" ",e5a="passive - increases lightning damage",a5a="passive - increases all damage caused by your lightning spells",t5a=" ",n5a=" ",s5a=" ",l5a=" ",i5a=" ",o5a=" ",r5a=" ",c5a=" ",d5a=" ",u5a=" ",h5a=" ",m5a=" ",g5a=" ",f5a=" ",v5a=" ",p5a=" ",y5a=" ",k5a=" ",b5a=" ",w5a=" ",M5a=" ",x5a=" ",S5a=" ",L5a=" ",A5a=" ",C5a=" ",I5a=" ",T5a=" ",B5a=" ",H5a=" ",D5a=" ",G5a=" ",E5a=" ",F5a=" ",q5a=" ",R5a=" ",P5a=" ",N5a=" ",O5a=" ",z5a=" ",_5a=" ",W5a=" ",V5a=" ",Q5a=" ",U5a=" ",K5a=" ",J5a=" ",$5a=" ",j5a=" ",Y5a=" ",Z5a=" ",X5a=" ",epa=" ",apa=" ",tpa=" ",npa=" ",spa=" ",lpa=" ",ipa=" ",opa=" ",rpa=" ",cpa=" ",dpa=" ",upa=" ",hpa=" ",mpa=" ",gpa=" ",fpa=" ",vpa=" ",ppa=" ",ypa=" ",kpa=" ",bpa=" ",wpa=" ",Mpa=" ",xpa=" ",Spa=" ",Lpa=" ",Apa=" ",Cpa=" ",Ipa=" ",Tpa=" ",Bpa=" ",Hpa=" ",Dpa=" ",Gpa=" ",Epa=" ",Fpa=" ",qpa=" ",Rpa=" ",Ppa=" ",Npa=`this curse may not be overridden by another curse
target of all nearby monsters
curses a monster to become the`,Opa=" ",zpa=" ",_pa=" ",Wpa=" ",Vpa=" ",Qpa=" ",Upa=" ",Kpa=" ",Jpa=" ",$pa=" ",jpa=" ",Ypa=" ",Zpa=" ",Xpa=" ",e1a=" ",a1a=" ",t1a=" ",n1a=" ",s1a=" ",l1a=" ",i1a=" ",o1a=" ",r1a=" ",c1a=" ",d1a=" ",u1a=" ",h1a=" ",m1a=" ",g1a=" ",f1a=" ",v1a=" ",p1a=" ",y1a=" ",k1a=" ",b1a=" ",w1a=" ",M1a=" ",x1a=" ",S1a=" ",L1a=" ",A1a=" ",C1a=" ",I1a=" ",T1a=" ",B1a=" ",H1a=" ",D1a=" ",G1a=" ",E1a=" ",F1a=" ",q1a=" ",R1a=" ",P1a=" ",N1a=" ",O1a=" ",z1a=" ",_1a=" ",W1a=" ",V1a=" ",Q1a=" ",U1a=" ",K1a=" ",J1a=" ",$1a=" ",j1a=" ",Y1a=" ",Z1a=" ",X1a=" ",e2a=" ",a2a=" ",t2a=" ",n2a=" ",s2a=" ",l2a=" ",i2a=" ",o2a=" ",r2a=" ",c2a=" ",d2a=" ",u2a=" ",h2a=" ",m2a=" ",g2a=" ",f2a=" ",v2a=" ",p2a=" ",y2a=" ",k2a=" ",b2a=" ",w2a=" ",M2a=" ",x2a=" ",S2a=" ",L2a=" ",A2a=" ",C2a=" ",I2a=" ",T2a=" ",B2a=" ",H2a=" ",D2a=" ",G2a=" ",E2a=" ",F2a=" ",q2a=" ",R2a=" ",P2a=" ",N2a=" ",O2a=" ",z2a=" ",_2a=" ",W2a=" ",V2a=" ",Q2a=" ",U2a=" ",K2a=" ",J2a=" ",$2a=" ",j2a=" ",Y2a=" ",Z2a=" ",X2a=" ",eya=" ",aya=" ",tya=" ",nya=" ",sya=" ",lya=`adds lightning damage to your attack
to damage nearby enemies
when active, aura causes pulses of electricity`,iya=" ",oya=" ",rya=" ",cya=" ",dya=" ",uya=" ",hya=" ",mya=" ",gya=" ",fya=" ",vya=" ",pya=" ",yya=" ",kya=" ",bya="aura - increases attack speed and damage",wya=`and attack rating for you and your party
when active, aura increases damage, attack speed,`,Mya=" ",xya=" ",Sya="aura - weakens enemies",Lya=" ",Aya=" ",Cya=" ",Iya=" ",Tya=`you life and mana
the souls of slain enemies to give
when active, aura attempts to redeem`,Bya=" ",Hya=" ",Dya=" ",Gya=" ",Eya=" ",Fya=" ",qya=" ",Rya=" ",Pya=" ",Nya=" ",Oya=" ",zya=" ",_ya=" ",Wya=" ",Vya=" ",Qya=" ",Uya=" ",Kya=" ",Jya=" ",$ya=" ",jya=" ",Yya=" ",Zya=" ",Xya=" ",eka=" ",aka=" ",tka=" ",nka=" ",ska=" ",lka=" ",ika=" ",oka=" ",rka=" ",cka=" ",dka=" ",uka=" ",hka=" ",mka=" ",gka=" ",fka=" ",vka=" ",pka=" ",yka=" ",kka=" ",bka=" ",wka=" ",Mka=" ",xka=" ",Ska=" ",Lka=" ",Aka=" ",Cka=" ",Ika=" ",Tka=" ",Bka=" ",Hka=" ",Dka=" ",Gka=" ",Eka=" ",Fka=" ",qka=" ",Rka=" ",Pka=" ",Nka=" ",Oka=" ",zka=" ",_ka=" ",Wka=" ",Vka=" ",Qka=" ",Uka=" ",Kka=" ",Jka=" ",$ka=" ",jka=" ",Yka=" ",Zka=" ",Xka=" ",eba=" ",aba=" ",tba=" ",nba=" ",sba=" ",lba=" ",iba=" ",oba=" ",rba=" ",cba=" ",dba=" ",uba=" ",hba=" ",mba=" ",gba=" ",fba=" ",vba=" ",pba=" ",yba=" ",kba=" ",bba=" ",wba=" ",Mba=" ",xba=" ",Sba=" ",Lba=" ",Aba=" ",Cba=" ",Iba=" ",Tba=" ",Bba=" ",Hba=" ",Dba=" ",Gba=" ",Eba=" ",Fba=" ",qba=" ",Rba=" ",Pba=" ",Nba=" ",Oba=" ",zba=" ",_ba=" ",Wba=" ",Vba=" ",Qba=" ",Uba=" ",Kba="You must wait a short time to declare hostility with that player.",Jba="CHAT",$ba="NEWS",jba="LADDER",Yba="LADDER CHARACTER",Zba="%s Receives Bonuses From:",Xba="Damage per Level",ewa="Elemental Damage per Level",awa="Fire Damage per Level",twa="Cold Damage per Level",nwa="Lightning Damage per Level",swa="Poison Damage per Level",lwa="Magic Damage per Level",iwa="Yards per Level",owa="Rate of Fire per Level",rwa="Attack Rating per Level",cwa="Attack Speed per Level",dwa="Defense per Level",uwa="Mana Cost per Level",hwa="Missiles per Level",mwa="+1 Missile per Level",gwa="+1 Missile per %d Levels",fwa="Bolts per Level",vwa="+1 Bolt per Level",pwa="+1 Bolt per %d Levels",ywa="Shots per Level",kwa="+1 Shot per Level",bwa="+1 Shot per %d Levels",wwa="Life per Level",Mwa="Walk/Run Speed per Level",xwa="Duration per Level",Swa="Cold Length per Level",Lwa="Freeze Length per Level",Awa="Poison Length per Level",Cwa="Converts %d%% Physical Damage to Magic Damage per Level",Iwa="Converts %d%% Physical Damage to Elemental Damage per Level",Twa="Converts %d%% Physical Damage to Elemental Damage",Bwa="Converts %d%% Physical Damage to Magic Damage",Hwa="Second per Level",Dwa="Seconds per Level",Gwa="Damage Absorbed per Level",Ewa="Weapon Damage",Fwa="Holy Bolt Damage per Level",qwa="Life Healed per Level",Rwa="Life Healed Every 2 Seconds",Pwa="Your Damage: ",Nwa="Party Damage: ",Owa="Average Fire Damage per Second per Level",zwa="Slows Enemies: ",_wa="Corpse Explosion Damage: ",Wwa="Level %d %s Aura When Equipped",Vwa="to all Attributes",Qwa="to Experience Gained",Uwa="Life after each Kill",Kwa="Reduces all Vendor Prices",Jwa="Slain Monsters Rest in Peace",$wa="to Attack Rating versus",jwa="to Damage versus",Ywa="Slaying:",Zwa="Reanimate as:",Xwa="to Enemy Cold Resistance",eMa="to Enemy Fire Resistance",aMa="to Enemy Lightning Resistance",tMa="to Enemy Poison Resistance",nMa="to Fire Skill Damage",sMa="to Cold Skill Damage",lMa="to Lightning Skill Damage",iMa="to Poison Skill Damage",oMa="%d%% Chance to cast level %d %s when you Die",rMa="%d%% Chance to cast level %d %s when you Level-Up",cMa="%d%% Chance to cast level %d %s when you Kill an Enemy",dMa="Werewolf",uMa="transform into a werewolf",hMa="transform into a werewolf",mMa="Werewolf",gMa=" skeleton mage",fMa=" skeleton magi",vMa="+%d to Summoning Skills",pMa="%d Stones of Jordan Sold to Merchants",yMa="Diablo Walks the Earth",kMa="Hellspawn Skull",bMa="Trap Door",wMa="Legendary Mallet",MMa=`your life and mana
the souls of slain enemies to give
when active, aura attempts to redeem`,xMa="Fiend",SMa="Wraith",LMa="Chance to Block: ",AMa="over ",CMa="Explore Tal Rasha's Tomb",IMa="/reply",TMa="Allows you to reply to a whisper without typing the account name",BMa="ÿc9 Yellow Textÿc4 represents special messages sent directly from battle.net",HMa="Game Time:",DMa="You must use *account names for anyone on battle.net including people in a different game such as Starcraft.",GMa="ÿc5Gray Textÿc4 also represents actions that have been taken by people in the chat Channel.",EMa="ÿc3Blue Textÿc4 represents special messages sent directly from battle.net or messages from a Blizzard Representative.",FMa="Helms:",qMa="Shields:",RMa="Weapons:",PMa="Armor:",NMa="EXPANSION CHARACTER",OMa="Lowers Resistance ",zMa="Can be Inserted into Socketed Items",_Ma=" to melee attacks",WMa="%d Percent Chance of Critical Strike",VMa="Say 'Retreat'",QMa="Ghostly",UMa="Fanatic",KMa="Possessed",JMa="Berserker",$Ma="Defensive",jMa="Offensive",YMa="Combat",ZMa="(Based on Character Level)",XMa="Rank",exa="Key of Terror",axa="Key of Hate",txa="Key of Destruction",nxa="Diablo's Horn",sxa="Baal's Eye",lxa="Mephisto's Brain",ixa="Standard of Heroes",oxa="Lilith",rxa=`Right-click to reset Stat/Skill Points
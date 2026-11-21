(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();const K=(function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}})();K.trustedTypes===void 0&&(K.trustedTypes={createPolicy:(t,e)=>e});const un={configurable:!1,enumerable:!1,writable:!1};K.FAST===void 0&&Reflect.defineProperty(K,"FAST",Object.assign({value:Object.create(null)},un));const Bt=K.FAST;if(Bt.getById===void 0){const t=Object.create(null);Reflect.defineProperty(Bt,"getById",Object.assign({value(e,r){let n=t[e];return n===void 0&&(n=r?t[e]=r():null),n}},un))}const Tt=Object.freeze([]);function hn(){const t=new WeakMap;return function(e){let r=t.get(e);if(r===void 0){let n=Reflect.getPrototypeOf(e);for(;r===void 0&&n!==null;)r=t.get(n),n=Reflect.getPrototypeOf(n);r=r===void 0?[]:r.slice(0),t.set(e,r)}return r}}const He=K.FAST.getById(1,()=>{const t=[],e=[];function r(){if(e.length)throw e.shift()}function n(o){try{o.call()}catch(a){e.push(a),setTimeout(r,0)}}function i(){let a=0;for(;a<t.length;)if(n(t[a]),a++,a>1024){for(let u=0,c=t.length-a;u<c;u++)t[u]=t[u+a];t.length-=a,a=0}t.length=0}function s(o){t.length<1&&K.requestAnimationFrame(i),t.push(o)}return Object.freeze({enqueue:s,process:i})}),dn=K.trustedTypes.createPolicy("fast-html",{createHTML:t=>t});let ze=dn;const Lt=`fast-${Math.random().toString(36).substring(2,8)}`,fn=`${Lt}{`,ur=`}${Lt}`,y=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(t){if(ze!==dn)throw new Error("The HTML policy can only be set once.");ze=t},createHTML(t){return ze.createHTML(t)},isMarker(t){return t&&t.nodeType===8&&t.data.startsWith(Lt)},extractDirectiveIndexFromMarker(t){return parseInt(t.data.replace(`${Lt}:`,""))},createInterpolationPlaceholder(t){return`${fn}${t}${ur}`},createCustomAttributePlaceholder(t,e){return`${t}="${this.createInterpolationPlaceholder(e)}"`},createBlockPlaceholder(t){return`<!--${Lt}:${t}-->`},queueUpdate:He.enqueue,processUpdates:He.process,nextUpdate(){return new Promise(He.enqueue)},setAttribute(t,e,r){r==null?t.removeAttribute(e):t.setAttribute(e,r)},setBooleanAttribute(t,e,r){r?t.setAttribute(e,""):t.removeAttribute(e)},removeChildNodes(t){for(let e=t.firstChild;e!==null;e=t.firstChild)t.removeChild(e)},createTemplateWalker(t){return document.createTreeWalker(t,133,null,!1)}});class nr{constructor(e,r){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=e,this.sub1=r}has(e){return this.spillover===void 0?this.sub1===e||this.sub2===e:this.spillover.indexOf(e)!==-1}subscribe(e){const r=this.spillover;if(r===void 0){if(this.has(e))return;if(this.sub1===void 0){this.sub1=e;return}if(this.sub2===void 0){this.sub2=e;return}this.spillover=[this.sub1,this.sub2,e],this.sub1=void 0,this.sub2=void 0}else r.indexOf(e)===-1&&r.push(e)}unsubscribe(e){const r=this.spillover;if(r===void 0)this.sub1===e?this.sub1=void 0:this.sub2===e&&(this.sub2=void 0);else{const n=r.indexOf(e);n!==-1&&r.splice(n,1)}}notify(e){const r=this.spillover,n=this.source;if(r===void 0){const i=this.sub1,s=this.sub2;i!==void 0&&i.handleChange(n,e),s!==void 0&&s.handleChange(n,e)}else for(let i=0,s=r.length;i<s;++i)r[i].handleChange(n,e)}}class gn{constructor(e){this.subscribers={},this.sourceSubscribers=null,this.source=e}notify(e){var r;const n=this.subscribers[e];n!==void 0&&n.notify(e),(r=this.sourceSubscribers)===null||r===void 0||r.notify(e)}subscribe(e,r){var n;if(r){let i=this.subscribers[r];i===void 0&&(this.subscribers[r]=i=new nr(this.source)),i.subscribe(e)}else this.sourceSubscribers=(n=this.sourceSubscribers)!==null&&n!==void 0?n:new nr(this.source),this.sourceSubscribers.subscribe(e)}unsubscribe(e,r){var n;if(r){const i=this.subscribers[r];i!==void 0&&i.unsubscribe(e)}else(n=this.sourceSubscribers)===null||n===void 0||n.unsubscribe(e)}}const k=Bt.getById(2,()=>{const t=/(:|&&|\|\||if)/,e=new WeakMap,r=y.queueUpdate;let n,i=c=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function s(c){let h=c.$fastController||e.get(c);return h===void 0&&(Array.isArray(c)?h=i(c):e.set(c,h=new gn(c))),h}const o=hn();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return n!==void 0&&n.watch(h,this.name),h[this.field]}setValue(h,g){const b=this.field,x=h[b];if(x!==g){h[b]=g;const m=h[this.callback];typeof m=="function"&&m.call(h,x,g),s(h).notify(this.name)}}}class u extends nr{constructor(h,g,b=!1){super(h,g),this.binding=h,this.isVolatileBinding=b,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,g){this.needsRefresh&&this.last!==null&&this.disconnect();const b=n;n=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const x=this.binding(h,g);return n=b,x}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,g){const b=this.last,x=s(h),m=b===null?this.first:{};if(m.propertySource=h,m.propertyName=g,m.notifier=x,x.subscribe(this,g),b!==null){if(!this.needsRefresh){let V;n=void 0,V=b.propertySource[b.propertyName],n=this,h===V&&(this.needsRefresh=!0)}b.next=m}this.last=m}handleChange(){this.needsQueue&&(this.needsQueue=!1,r(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const g=h;return g===void 0?{value:void 0,done:!0}:(h=h.next,{value:g,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(c){i=c},getNotifier:s,track(c,h){n!==void 0&&n.watch(c,h)},trackVolatile(){n!==void 0&&(n.needsRefresh=!0)},notify(c,h){s(c).notify(h)},defineProperty(c,h){typeof h=="string"&&(h=new a(h)),o(c).push(h),Reflect.defineProperty(c,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(g){h.setValue(this,g)}})},getAccessors:o,binding(c,h,g=this.isVolatileBinding(c)){return new u(c,h,g)},isVolatileBinding(c){return t.test(c.toString())}})});function wt(t,e){k.defineProperty(t,e)}const Rr=Bt.getById(3,()=>{let t=null;return{get(){return t},set(e){t=e}}});class Ot{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return Rr.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(e){Rr.set(e)}}k.defineProperty(Ot.prototype,"index");k.defineProperty(Ot.prototype,"length");const At=Object.seal(new Ot);class hr{constructor(){this.targetIndex=0}}class pn extends hr{constructor(){super(...arguments),this.createPlaceholder=y.createInterpolationPlaceholder}}class vn extends hr{constructor(e,r,n){super(),this.name=e,this.behavior=r,this.options=n}createPlaceholder(e){return y.createCustomAttributePlaceholder(this.name,e)}createBehavior(e){return new this.behavior(e,this.options)}}function hi(t,e){this.source=t,this.context=e,this.bindingObserver===null&&(this.bindingObserver=k.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(t,e))}function di(t,e){this.source=t,this.context=e,this.target.addEventListener(this.targetName,this)}function fi(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function gi(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const t=this.target.$fastView;t!==void 0&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}function pi(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function vi(t){y.setAttribute(this.target,this.targetName,t)}function bi(t){y.setBooleanAttribute(this.target,this.targetName,t)}function yi(t){if(t==null&&(t=""),t.create){this.target.textContent="";let e=this.target.$fastView;e===void 0?e=t.create():this.target.$fastTemplate!==t&&(e.isComposed&&(e.remove(),e.unbind()),e=t.create()),e.isComposed?e.needsBindOnly&&(e.needsBindOnly=!1,e.bind(this.source,this.context)):(e.isComposed=!0,e.bind(this.source,this.context),e.insertBefore(this.target),this.target.$fastView=e,this.target.$fastTemplate=t)}else{const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.isComposed=!1,e.remove(),e.needsBindOnly?e.needsBindOnly=!1:e.unbind()),this.target.textContent=t}}function mi(t){this.target[this.targetName]=t}function wi(t){const e=this.classVersions||Object.create(null),r=this.target;let n=this.version||0;if(t!=null&&t.length){const i=t.split(/\s+/);for(let s=0,o=i.length;s<o;++s){const a=i[s];a!==""&&(e[a]=n,r.classList.add(a))}}if(this.classVersions=e,this.version=n+1,n!==0){n-=1;for(const i in e)e[i]===n&&r.classList.remove(i)}}class dr extends pn{constructor(e){super(),this.binding=e,this.bind=hi,this.unbind=fi,this.updateTarget=vi,this.isBindingVolatile=k.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(e){if(this.originalTargetName=e,e!==void 0)switch(e[0]){case":":if(this.cleanedTargetName=e.substr(1),this.updateTarget=mi,this.cleanedTargetName==="innerHTML"){const r=this.binding;this.binding=(n,i)=>y.createHTML(r(n,i))}break;case"?":this.cleanedTargetName=e.substr(1),this.updateTarget=bi;break;case"@":this.cleanedTargetName=e.substr(1),this.bind=di,this.unbind=pi;break;default:this.cleanedTargetName=e,e==="class"&&(this.updateTarget=wi);break}}targetAtContent(){this.updateTarget=yi,this.unbind=gi}createBehavior(e){return new Si(e,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class Si{constructor(e,r,n,i,s,o,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=e,this.binding=r,this.isBindingVolatile=n,this.bind=i,this.unbind=s,this.updateTarget=o,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(e){Ot.setEvent(e);const r=this.binding(this.source,this.context);Ot.setEvent(null),r!==!0&&e.preventDefault()}}let je=null;class fr{addFactory(e){e.targetIndex=this.targetIndex,this.behaviorFactories.push(e)}captureContentBinding(e){e.targetAtContent(),this.addFactory(e)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){je=this}static borrow(e){const r=je||new fr;return r.directives=e,r.reset(),je=null,r}}function Fi(t){if(t.length===1)return t[0];let e;const r=t.length,n=t.map(o=>typeof o=="string"?()=>o:(e=o.targetName||e,o.binding)),i=(o,a)=>{let u="";for(let c=0;c<r;++c)u+=n[c](o,a);return u},s=new dr(i);return s.targetName=e,s}const xi=ur.length;function bn(t,e){const r=e.split(fn);if(r.length===1)return null;const n=[];for(let i=0,s=r.length;i<s;++i){const o=r[i],a=o.indexOf(ur);let u;if(a===-1)u=o;else{const c=parseInt(o.substring(0,a));n.push(t.directives[c]),u=o.substring(a+xi)}u!==""&&n.push(u)}return n}function Vr(t,e,r=!1){const n=e.attributes;for(let i=0,s=n.length;i<s;++i){const o=n[i],a=o.value,u=bn(t,a);let c=null;u===null?r&&(c=new dr(()=>a),c.targetName=o.name):c=Fi(u),c!==null&&(e.removeAttributeNode(o),i--,s--,t.addFactory(c))}}function $i(t,e,r){const n=bn(t,e.textContent);if(n!==null){let i=e;for(let s=0,o=n.length;s<o;++s){const a=n[s],u=s===0?e:i.parentNode.insertBefore(document.createTextNode(""),i.nextSibling);typeof a=="string"?u.textContent=a:(u.textContent=" ",t.captureContentBinding(a)),i=u,t.targetIndex++,u!==e&&r.nextNode()}t.targetIndex--}}function ki(t,e){const r=t.content;document.adoptNode(r);const n=fr.borrow(e);Vr(n,t,!0);const i=n.behaviorFactories;n.reset();const s=y.createTemplateWalker(r);let o;for(;o=s.nextNode();)switch(n.targetIndex++,o.nodeType){case 1:Vr(n,o);break;case 3:$i(n,o,s);break;case 8:y.isMarker(o)&&n.addFactory(e[y.extractDirectiveIndexFromMarker(o)])}let a=0;(y.isMarker(r.firstChild)||r.childNodes.length===1&&e.length)&&(r.insertBefore(document.createComment(""),r.firstChild),a=-1);const u=n.behaviorFactories;return n.release(),{fragment:r,viewBehaviorFactories:u,hostBehaviorFactories:i,targetOffset:a}}const Ue=document.createRange();class Di{constructor(e,r){this.fragment=e,this.behaviors=r,this.source=null,this.context=null,this.firstChild=e.firstChild,this.lastChild=e.lastChild}appendTo(e){e.appendChild(this.fragment)}insertBefore(e){if(this.fragment.hasChildNodes())e.parentNode.insertBefore(this.fragment,e);else{const r=this.lastChild;if(e.previousSibling===r)return;const n=e.parentNode;let i=this.firstChild,s;for(;i!==r;)s=i.nextSibling,n.insertBefore(i,e),i=s;n.insertBefore(r,e)}}remove(){const e=this.fragment,r=this.lastChild;let n=this.firstChild,i;for(;n!==r;)i=n.nextSibling,e.appendChild(n),n=i;e.appendChild(r)}dispose(){const e=this.firstChild.parentNode,r=this.lastChild;let n=this.firstChild,i;for(;n!==r;)i=n.nextSibling,e.removeChild(n),n=i;e.removeChild(r);const s=this.behaviors,o=this.source;for(let a=0,u=s.length;a<u;++a)s[a].unbind(o)}bind(e,r){const n=this.behaviors;if(this.source!==e)if(this.source!==null){const i=this.source;this.source=e,this.context=r;for(let s=0,o=n.length;s<o;++s){const a=n[s];a.unbind(i),a.bind(e,r)}}else{this.source=e,this.context=r;for(let i=0,s=n.length;i<s;++i)n[i].bind(e,r)}}unbind(){if(this.source===null)return;const e=this.behaviors,r=this.source;for(let n=0,i=e.length;n<i;++n)e[n].unbind(r);this.source=null}static disposeContiguousBatch(e){if(e.length!==0){Ue.setStartBefore(e[0].firstChild),Ue.setEndAfter(e[e.length-1].lastChild),Ue.deleteContents();for(let r=0,n=e.length;r<n;++r){const i=e[r],s=i.behaviors,o=i.source;for(let a=0,u=s.length;a<u;++a)s[a].unbind(o)}}}}class Cr{constructor(e,r){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=e,this.directives=r}create(e){if(this.fragment===null){let c;const h=this.html;if(typeof h=="string"){c=document.createElement("template"),c.innerHTML=y.createHTML(h);const b=c.content.firstElementChild;b!==null&&b.tagName==="TEMPLATE"&&(c=b)}else c=h;const g=ki(c,this.directives);this.fragment=g.fragment,this.viewBehaviorFactories=g.viewBehaviorFactories,this.hostBehaviorFactories=g.hostBehaviorFactories,this.targetOffset=g.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const r=this.fragment.cloneNode(!0),n=this.viewBehaviorFactories,i=new Array(this.behaviorCount),s=y.createTemplateWalker(r);let o=0,a=this.targetOffset,u=s.nextNode();for(let c=n.length;o<c;++o){const h=n[o],g=h.targetIndex;for(;u!==null;)if(a===g){i[o]=h.createBehavior(u);break}else u=s.nextNode(),a++}if(this.hasHostBehaviors){const c=this.hostBehaviorFactories;for(let h=0,g=c.length;h<g;++h,++o)i[o]=c[h].createBehavior(e)}return new Di(r,i)}render(e,r,n){typeof r=="string"&&(r=document.getElementById(r)),n===void 0&&(n=r);const i=this.create(n);return i.bind(e,At),i.appendTo(r),i}}const Ri=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function et(t,...e){const r=[];let n="";for(let i=0,s=t.length-1;i<s;++i){const o=t[i];let a=e[i];if(n+=o,a instanceof Cr){const u=a;a=()=>u}if(typeof a=="function"&&(a=new dr(a)),a instanceof pn){const u=Ri.exec(o);u!==null&&(a.targetName=u[2])}a instanceof hr?(n+=a.createPlaceholder(r.length),r.push(a)):n+=a}return n+=t[t.length-1],new Cr(n,r)}class E{constructor(){this.targets=new WeakSet}addStylesTo(e){this.targets.add(e)}removeStylesFrom(e){this.targets.delete(e)}isAttachedTo(e){return this.targets.has(e)}withBehaviors(...e){return this.behaviors=this.behaviors===null?e:this.behaviors.concat(e),this}}E.create=(()=>{if(y.supportsAdoptedStyleSheets){const t=new Map;return e=>new Vi(e,t)}return t=>new Li(t)})();function gr(t){return t.map(e=>e instanceof E?gr(e.styles):[e]).reduce((e,r)=>e.concat(r),[])}function yn(t){return t.map(e=>e instanceof E?e.behaviors:null).reduce((e,r)=>r===null?e:(e===null&&(e=[]),e.concat(r)),null)}const mn=Symbol("prependToAdoptedStyleSheets");function wn(t){const e=[],r=[];return t.forEach(n=>(n[mn]?e:r).push(n)),{prepend:e,append:r}}let Sn=(t,e)=>{const{prepend:r,append:n}=wn(e);t.adoptedStyleSheets=[...r,...t.adoptedStyleSheets,...n]},Fn=(t,e)=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter(r=>e.indexOf(r)===-1)};if(y.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),Sn=(t,e)=>{const{prepend:r,append:n}=wn(e);t.adoptedStyleSheets.splice(0,0,...r),t.adoptedStyleSheets.push(...n)},Fn=(t,e)=>{for(const r of e){const n=t.adoptedStyleSheets.indexOf(r);n!==-1&&t.adoptedStyleSheets.splice(n,1)}}}catch{}class Vi extends E{constructor(e,r){super(),this.styles=e,this.styleSheetCache=r,this._styleSheets=void 0,this.behaviors=yn(e)}get styleSheets(){if(this._styleSheets===void 0){const e=this.styles,r=this.styleSheetCache;this._styleSheets=gr(e).map(n=>{if(n instanceof CSSStyleSheet)return n;let i=r.get(n);return i===void 0&&(i=new CSSStyleSheet,i.replaceSync(n),r.set(n,i)),i})}return this._styleSheets}addStylesTo(e){Sn(e,this.styleSheets),super.addStylesTo(e)}removeStylesFrom(e){Fn(e,this.styleSheets),super.removeStylesFrom(e)}}let Ci=0;function Ti(){return`fast-style-class-${++Ci}`}class Li extends E{constructor(e){super(),this.styles=e,this.behaviors=null,this.behaviors=yn(e),this.styleSheets=gr(e),this.styleClass=Ti()}addStylesTo(e){const r=this.styleSheets,n=this.styleClass;e=this.normalizeTarget(e);for(let i=0;i<r.length;i++){const s=document.createElement("style");s.innerHTML=r[i],s.className=n,e.append(s)}super.addStylesTo(e)}removeStylesFrom(e){e=this.normalizeTarget(e);const r=e.querySelectorAll(`.${this.styleClass}`);for(let n=0,i=r.length;n<i;++n)e.removeChild(r[n]);super.removeStylesFrom(e)}isAttachedTo(e){return super.isAttachedTo(this.normalizeTarget(e))}normalizeTarget(e){return e===document?document.body:e}}const ne=Object.freeze({locate:hn()}),Ai={toView(t){return t?"true":"false"},fromView(t){return!(t==null||t==="false"||t===!1||t===0)}};class ie{constructor(e,r,n=r.toLowerCase(),i="reflect",s){this.guards=new Set,this.Owner=e,this.name=r,this.attribute=n,this.mode=i,this.converter=s,this.fieldName=`_${r}`,this.callbackName=`${r}Changed`,this.hasCallback=this.callbackName in e.prototype,i==="boolean"&&s===void 0&&(this.converter=Ai)}setValue(e,r){const n=e[this.fieldName],i=this.converter;i!==void 0&&(r=i.fromView(r)),n!==r&&(e[this.fieldName]=r,this.tryReflectToAttribute(e),this.hasCallback&&e[this.callbackName](n,r),e.$fastController.notify(this.name))}getValue(e){return k.track(e,this.name),e[this.fieldName]}onAttributeChangedCallback(e,r){this.guards.has(e)||(this.guards.add(e),this.setValue(e,r),this.guards.delete(e))}tryReflectToAttribute(e){const r=this.mode,n=this.guards;n.has(e)||r==="fromView"||y.queueUpdate(()=>{n.add(e);const i=e[this.fieldName];switch(r){case"reflect":const s=this.converter;y.setAttribute(e,this.attribute,s!==void 0?s.toView(i):i);break;case"boolean":y.setBooleanAttribute(e,this.attribute,i);break}n.delete(e)})}static collect(e,...r){const n=[];r.push(ne.locate(e));for(let i=0,s=r.length;i<s;++i){const o=r[i];if(o!==void 0)for(let a=0,u=o.length;a<u;++a){const c=o[a];typeof c=="string"?n.push(new ie(e,c)):n.push(new ie(e,c.property,c.attribute,c.mode,c.converter))}}return n}}function p(t,e){let r;function n(i,s){arguments.length>1&&(r.property=s),ne.locate(i.constructor).push(r)}if(arguments.length>1){r={},n(t,e);return}return r=t===void 0?{}:t,n}const Tr={mode:"open"},Lr={},ir=Bt.getById(4,()=>{const t=new Map;return Object.freeze({register(e){return t.has(e.type)?!1:(t.set(e.type,e),!0)},getByType(e){return t.get(e)}})});class fe{constructor(e,r=e.definition){typeof r=="string"&&(r={name:r}),this.type=e,this.name=r.name,this.template=r.template;const n=ie.collect(e,r.attributes),i=new Array(n.length),s={},o={};for(let a=0,u=n.length;a<u;++a){const c=n[a];i[a]=c.attribute,s[c.name]=c,o[c.attribute]=c}this.attributes=n,this.observedAttributes=i,this.propertyLookup=s,this.attributeLookup=o,this.shadowOptions=r.shadowOptions===void 0?Tr:r.shadowOptions===null?void 0:Object.assign(Object.assign({},Tr),r.shadowOptions),this.elementOptions=r.elementOptions===void 0?Lr:Object.assign(Object.assign({},Lr),r.elementOptions),this.styles=r.styles===void 0?void 0:Array.isArray(r.styles)?E.create(r.styles):r.styles instanceof E?r.styles:E.create([r.styles])}get isDefined(){return!!ir.getByType(this.type)}define(e=customElements){const r=this.type;if(ir.register(this)){const n=this.attributes,i=r.prototype;for(let s=0,o=n.length;s<o;++s)k.defineProperty(i,n[s]);Reflect.defineProperty(r,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return e.get(this.name)||e.define(this.name,r,this.elementOptions),this}}fe.forType=ir.getByType;const xn=new WeakMap,Pi={bubbles:!0,composed:!0,cancelable:!0};function qe(t){return t.shadowRoot||xn.get(t)||null}class pr extends gn{constructor(e,r){super(e),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=e,this.definition=r;const n=r.shadowOptions;if(n!==void 0){const s=e.attachShadow(n);n.mode==="closed"&&xn.set(e,s)}const i=k.getAccessors(e);if(i.length>0){const s=this.boundObservables=Object.create(null);for(let o=0,a=i.length;o<a;++o){const u=i[o].name,c=e[u];c!==void 0&&(delete e[u],s[u]=c)}}}get isConnected(){return k.track(this,"isConnected"),this._isConnected}setIsConnected(e){this._isConnected=e,k.notify(this,"isConnected")}get template(){return this._template}set template(e){this._template!==e&&(this._template=e,this.needsInitialization||this.renderTemplate(e))}get styles(){return this._styles}set styles(e){this._styles!==e&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=e,!this.needsInitialization&&e!==null&&this.addStyles(e))}addStyles(e){const r=qe(this.element)||this.element.getRootNode();if(e instanceof HTMLStyleElement)r.append(e);else if(!e.isAttachedTo(r)){const n=e.behaviors;e.addStylesTo(r),n!==null&&this.addBehaviors(n)}}removeStyles(e){const r=qe(this.element)||this.element.getRootNode();if(e instanceof HTMLStyleElement)r.removeChild(e);else if(e.isAttachedTo(r)){const n=e.behaviors;e.removeStylesFrom(r),n!==null&&this.removeBehaviors(n)}}addBehaviors(e){const r=this.behaviors||(this.behaviors=new Map),n=e.length,i=[];for(let s=0;s<n;++s){const o=e[s];r.has(o)?r.set(o,r.get(o)+1):(r.set(o,1),i.push(o))}if(this._isConnected){const s=this.element;for(let o=0;o<i.length;++o)i[o].bind(s,At)}}removeBehaviors(e,r=!1){const n=this.behaviors;if(n===null)return;const i=e.length,s=[];for(let o=0;o<i;++o){const a=e[o];if(n.has(a)){const u=n.get(a)-1;u===0||r?n.delete(a)&&s.push(a):n.set(a,u)}}if(this._isConnected){const o=this.element;for(let a=0;a<s.length;++a)s[a].unbind(o)}}onConnectedCallback(){if(this._isConnected)return;const e=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(e,At);const r=this.behaviors;if(r!==null)for(const[n]of r)n.bind(e,At);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const e=this.view;e!==null&&e.unbind();const r=this.behaviors;if(r!==null){const n=this.element;for(const[i]of r)i.unbind(n)}}onAttributeChangedCallback(e,r,n){const i=this.definition.attributeLookup[e];i!==void 0&&i.onAttributeChangedCallback(this.element,n)}emit(e,r,n){return this._isConnected?this.element.dispatchEvent(new CustomEvent(e,Object.assign(Object.assign({detail:r},Pi),n))):!1}finishInitialization(){const e=this.element,r=this.boundObservables;if(r!==null){const i=Object.keys(r);for(let s=0,o=i.length;s<o;++s){const a=i[s];e[a]=r[a]}this.boundObservables=null}const n=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():n.template&&(this._template=n.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():n.styles&&(this._styles=n.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(e){const r=this.element,n=qe(r)||r;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||y.removeChildNodes(n),e&&(this.view=e.render(r,n,r))}static forCustomElement(e){const r=e.$fastController;if(r!==void 0)return r;const n=fe.forType(e.constructor);if(n===void 0)throw new Error("Missing FASTElement definition.");return e.$fastController=new pr(e,n)}}function Ar(t){return class extends t{constructor(){super(),pr.forCustomElement(this)}$emit(e,r,n){return this.$fastController.emit(e,r,n)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(e,r,n){this.$fastController.onAttributeChangedCallback(e,r,n)}}}const ge=Object.assign(Ar(HTMLElement),{from(t){return Ar(t)},define(t,e){return new fe(t,e).define().type}});class vr{createCSS(){return""}createBehavior(){}}function $n(t,e){const r=[];let n="";const i=[];for(let s=0,o=t.length-1;s<o;++s){n+=t[s];let a=e[s];if(a instanceof vr){const u=a.createBehavior();a=a.createCSS(),u&&i.push(u)}a instanceof E||a instanceof CSSStyleSheet?(n.trim()!==""&&(r.push(n),n=""),r.push(a)):n+=a}return n+=t[t.length-1],n.trim()!==""&&r.push(n),{styles:r,behaviors:i}}function P(t,...e){const{styles:r,behaviors:n}=$n(t,e),i=E.create(r);return n.length&&i.withBehaviors(...n),i}class Bi extends vr{constructor(e,r){super(),this.behaviors=r,this.css="";const n=e.reduce((i,s)=>(typeof s=="string"?this.css+=s:i.push(s),i),[]);n.length&&(this.styles=E.create(n))}createBehavior(){return this}createCSS(){return this.css}bind(e){this.styles&&e.$fastController.addStyles(this.styles),this.behaviors.length&&e.$fastController.addBehaviors(this.behaviors)}unbind(e){this.styles&&e.$fastController.removeStyles(this.styles),this.behaviors.length&&e.$fastController.removeBehaviors(this.behaviors)}}function M(t,...e){const{styles:r,behaviors:n}=$n(t,e);return new Bi(r,n)}class Oi{constructor(e,r){this.target=e,this.propertyName=r}bind(e){e[this.propertyName]=this.target}unbind(){}}function Y(t){return new vn("fast-ref",Oi,t)}class Ei{constructor(e,r){this.target=e,this.options=r,this.source=null}bind(e){const r=this.options.property;this.shouldUpdate=k.getAccessors(e).some(n=>n.name===r),this.source=e,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(Tt),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let e=this.getNodes();return this.options.filter!==void 0&&(e=e.filter(this.options.filter)),e}updateTarget(e){this.source[this.options.property]=e}}class Ii extends Ei{constructor(e,r){super(e,r)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Ni(t){return typeof t=="string"&&(t={property:t}),new vn("fast-slotted",Ii,t)}class Mi{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Hi=(t,e)=>et`
    <span
        part="end"
        ${Y("endContainer")}
        class=${r=>e.end?"end":void 0}
    >
        <slot name="end" ${Y("end")} @slotchange="${r=>r.handleEndContentChange()}">
            ${e.end||""}
        </slot>
    </span>
`,zi=(t,e)=>et`
    <span
        part="start"
        ${Y("startContainer")}
        class="${r=>e.start?"start":void 0}"
    >
        <slot
            name="start"
            ${Y("start")}
            @slotchange="${r=>r.handleStartContentChange()}"
        >
            ${e.start||""}
        </slot>
    </span>
`,Ll=et`
    <span part="end" ${Y("endContainer")}>
        <slot
            name="end"
            ${Y("end")}
            @slotchange="${t=>t.handleEndContentChange()}"
        ></slot>
    </span>
`,Al=et`
    <span part="start" ${Y("startContainer")}>
        <slot
            name="start"
            ${Y("start")}
            @slotchange="${t=>t.handleStartContentChange()}"
        ></slot>
    </span>
`;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function v(t,e,r,n){var i=arguments.length,s=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,r,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s}const We=new Map;"metadata"in Reflect||(Reflect.metadata=function(t,e){return function(r){Reflect.defineMetadata(t,e,r)}},Reflect.defineMetadata=function(t,e,r){let n=We.get(r);n===void 0&&We.set(r,n=new Map),n.set(t,e)},Reflect.getOwnMetadata=function(t,e){const r=We.get(e);if(r!==void 0)return r.get(t)});class ji{constructor(e,r){this.container=e,this.key=r}instance(e){return this.registerResolver(0,e)}singleton(e){return this.registerResolver(1,e)}transient(e){return this.registerResolver(2,e)}callback(e){return this.registerResolver(3,e)}cachedCallback(e){return this.registerResolver(3,Dn(e))}aliasTo(e){return this.registerResolver(5,e)}registerResolver(e,r){const{container:n,key:i}=this;return this.container=this.key=void 0,n.registerResolver(i,new N(i,e,r))}}function $t(t){const e=t.slice(),r=Object.keys(t),n=r.length;let i;for(let s=0;s<n;++s)i=r[s],Rn(i)||(e[i]=t[i]);return e}const Ui=Object.freeze({none(t){throw Error(`${t.toString()} not registered, did you forget to add @singleton()?`)},singleton(t){return new N(t,1,t)},transient(t){return new N(t,2,t)}}),Ge=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:Ui.singleton})}),Pr=new Map;function Br(t){return e=>Reflect.getOwnMetadata(t,e)}let Or=null;const $=Object.freeze({createContainer(t){return new Pt(null,Object.assign({},Ge.default,t))},findResponsibleContainer(t){const e=t.$$container$$;return e&&e.responsibleForOwnerRequests?e:$.findParentContainer(t)},findParentContainer(t){const e=new CustomEvent(kn,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return t.dispatchEvent(e),e.detail.container||$.getOrCreateDOMContainer()},getOrCreateDOMContainer(t,e){return t?t.$$container$$||new Pt(t,Object.assign({},Ge.default,e,{parentLocator:$.findParentContainer})):Or||(Or=new Pt(null,Object.assign({},Ge.default,e,{parentLocator:()=>null})))},getDesignParamtypes:Br("design:paramtypes"),getAnnotationParamtypes:Br("di:paramtypes"),getOrCreateAnnotationParamTypes(t){let e=this.getAnnotationParamtypes(t);return e===void 0&&Reflect.defineMetadata("di:paramtypes",e=[],t),e},getDependencies(t){let e=Pr.get(t);if(e===void 0){const r=t.inject;if(r===void 0){const n=$.getDesignParamtypes(t),i=$.getAnnotationParamtypes(t);if(n===void 0)if(i===void 0){const s=Object.getPrototypeOf(t);typeof s=="function"&&s!==Function.prototype?e=$t($.getDependencies(s)):e=[]}else e=$t(i);else if(i===void 0)e=$t(n);else{e=$t(n);let s=i.length,o;for(let c=0;c<s;++c)o=i[c],o!==void 0&&(e[c]=o);const a=Object.keys(i);s=a.length;let u;for(let c=0;c<s;++c)u=a[c],Rn(u)||(e[u]=i[u])}}else e=$t(r);Pr.set(t,e)}return e},defineProperty(t,e,r,n=!1){const i=`$di_${e}`;Reflect.defineProperty(t,e,{get:function(){let s=this[i];if(s===void 0&&(s=(this instanceof HTMLElement?$.findResponsibleContainer(this):$.getOrCreateDOMContainer()).get(r),this[i]=s,n&&this instanceof ge)){const a=this.$fastController,u=()=>{const h=$.findResponsibleContainer(this).get(r),g=this[i];h!==g&&(this[i]=s,a.notify(e))};a.subscribe({handleChange:u},"isConnected")}return s}})},createInterface(t,e){const r=typeof t=="function"?t:e,n=typeof t=="string"?t:t&&"friendlyName"in t&&t.friendlyName||Mr,i=typeof t=="string"?!1:t&&"respectConnection"in t&&t.respectConnection||!1,s=function(o,a,u){if(o==null||new.target!==void 0)throw new Error(`No registration for interface: '${s.friendlyName}'`);if(a)$.defineProperty(o,a,s,i);else{const c=$.getOrCreateAnnotationParamTypes(o);c[u]=s}};return s.$isInterface=!0,s.friendlyName=n??"(anonymous)",r!=null&&(s.register=function(o,a){return r(new ji(o,a??s))}),s.toString=function(){return`InterfaceSymbol<${s.friendlyName}>`},s},inject(...t){return function(e,r,n){if(typeof n=="number"){const i=$.getOrCreateAnnotationParamTypes(e),s=t[0];s!==void 0&&(i[n]=s)}else if(r)$.defineProperty(e,r,t[0]);else{const i=n?$.getOrCreateAnnotationParamTypes(n.value):$.getOrCreateAnnotationParamTypes(e);let s;for(let o=0;o<t.length;++o)s=t[o],s!==void 0&&(i[o]=s)}}},transient(t){return t.register=function(r){return Et.transient(t,t).register(r)},t.registerInRequestor=!1,t},singleton(t,e=Wi){return t.register=function(n){return Et.singleton(t,t).register(n)},t.registerInRequestor=e.scoped,t}}),qi=$.createInterface("Container");$.inject;const Wi={scoped:!1};class N{constructor(e,r,n){this.key=e,this.strategy=r,this.state=n,this.resolving=!1}get $isResolver(){return!0}register(e){return e.registerResolver(this.key,this)}resolve(e,r){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=e.getFactory(this.state).construct(r),this.strategy=0,this.resolving=!1,this.state}case 2:{const n=e.getFactory(this.state);if(n===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return n.construct(r)}case 3:return this.state(e,r,this);case 4:return this.state[0].resolve(e,r);case 5:return r.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(e){var r,n,i;switch(this.strategy){case 1:case 2:return e.getFactory(this.state);case 5:return(i=(n=(r=e.getResolver(this.state))===null||r===void 0?void 0:r.getFactory)===null||n===void 0?void 0:n.call(r,e))!==null&&i!==void 0?i:null;default:return null}}}function Er(t){return this.get(t)}function Gi(t,e){return e(t)}class _i{constructor(e,r){this.Type=e,this.dependencies=r,this.transformers=null}construct(e,r){let n;return r===void 0?n=new this.Type(...this.dependencies.map(Er,e)):n=new this.Type(...this.dependencies.map(Er,e),...r),this.transformers==null?n:this.transformers.reduce(Gi,n)}registerTransformer(e){(this.transformers||(this.transformers=[])).push(e)}}const Qi={$isResolver:!0,resolve(t,e){return e}};function ee(t){return typeof t.register=="function"}function Yi(t){return ee(t)&&typeof t.registerInRequestor=="boolean"}function Ir(t){return Yi(t)&&t.registerInRequestor}function Zi(t){return t.prototype!==void 0}const Ji=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),kn="__DI_LOCATE_PARENT__",_e=new Map;class Pt{constructor(e,r){this.owner=e,this.config=r,this._parent=void 0,this.registerDepth=0,this.context=null,e!==null&&(e.$$container$$=this),this.resolvers=new Map,this.resolvers.set(qi,Qi),e instanceof Node&&e.addEventListener(kn,n=>{n.composedPath()[0]!==this.owner&&(n.detail.container=this,n.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(e,...r){return this.context=e,this.register(...r),this.context=null,this}register(...e){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let r,n,i,s,o;const a=this.context;for(let u=0,c=e.length;u<c;++u)if(r=e[u],!!Hr(r))if(ee(r))r.register(this,a);else if(Zi(r))Et.singleton(r,r).register(this);else for(n=Object.keys(r),s=0,o=n.length;s<o;++s)i=r[n[s]],Hr(i)&&(ee(i)?i.register(this,a):this.register(i));return--this.registerDepth,this}registerResolver(e,r){_t(e);const n=this.resolvers,i=n.get(e);return i==null?n.set(e,r):i instanceof N&&i.strategy===4?i.state.push(r):n.set(e,new N(e,4,[i,r])),r}registerTransformer(e,r){const n=this.getResolver(e);if(n==null)return!1;if(n.getFactory){const i=n.getFactory(this);return i==null?!1:(i.registerTransformer(r),!0)}return!1}getResolver(e,r=!0){if(_t(e),e.resolve!==void 0)return e;let n=this,i;for(;n!=null;)if(i=n.resolvers.get(e),i==null){if(n.parent==null){const s=Ir(e)?this:n;return r?this.jitRegister(e,s):null}n=n.parent}else return i;return null}has(e,r=!1){return this.resolvers.has(e)?!0:r&&this.parent!=null?this.parent.has(e,!0):!1}get(e){if(_t(e),e.$isResolver)return e.resolve(this,this);let r=this,n;for(;r!=null;)if(n=r.resolvers.get(e),n==null){if(r.parent==null){const i=Ir(e)?this:r;return n=this.jitRegister(e,i),n.resolve(r,this)}r=r.parent}else return n.resolve(r,this);throw new Error(`Unable to resolve key: ${String(e)}`)}getAll(e,r=!1){_t(e);const n=this;let i=n,s;if(r){let o=Tt;for(;i!=null;)s=i.resolvers.get(e),s!=null&&(o=o.concat(Nr(s,i,n))),i=i.parent;return o}else for(;i!=null;)if(s=i.resolvers.get(e),s==null){if(i=i.parent,i==null)return Tt}else return Nr(s,i,n);return Tt}getFactory(e){let r=_e.get(e);if(r===void 0){if(Xi(e))throw new Error(`${e.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);_e.set(e,r=new _i(e,$.getDependencies(e)))}return r}registerFactory(e,r){_e.set(e,r)}createChild(e){return new Pt(null,Object.assign({},this.config,e,{parentLocator:()=>this}))}jitRegister(e,r){if(typeof e!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${e}'. Did you forget to register this dependency?`);if(Ji.has(e.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${e.name}. Did you forget to add @inject(Key)`);if(ee(e)){const n=e.register(r);if(!(n instanceof Object)||n.resolve==null){const i=r.resolvers.get(e);if(i!=null)return i;throw new Error("A valid resolver was not returned from the static register method")}return n}else{if(e.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${e.friendlyName}`);{const n=this.config.defaultResolver(e,r);return r.resolvers.set(e,n),n}}}}const Qe=new WeakMap;function Dn(t){return function(e,r,n){if(Qe.has(n))return Qe.get(n);const i=t(e,r,n);return Qe.set(n,i),i}}const Et=Object.freeze({instance(t,e){return new N(t,0,e)},singleton(t,e){return new N(t,1,e)},transient(t,e){return new N(t,2,e)},callback(t,e){return new N(t,3,e)},cachedCallback(t,e){return new N(t,3,Dn(e))},aliasTo(t,e){return new N(e,5,t)}});function _t(t){if(t==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function Nr(t,e,r){if(t instanceof N&&t.strategy===4){const n=t.state;let i=n.length;const s=new Array(i);for(;i--;)s[i]=n[i].resolve(e,r);return s}return[t.resolve(e,r)]}const Mr="(anonymous)";function Hr(t){return typeof t=="object"&&t!==null||typeof t=="function"}const Xi=(function(){const t=new WeakMap;let e=!1,r="",n=0;return function(i){return e=t.get(i),e===void 0&&(r=i.toString(),n=r.length,e=n>=29&&n<=100&&r.charCodeAt(n-1)===125&&r.charCodeAt(n-2)<=32&&r.charCodeAt(n-3)===93&&r.charCodeAt(n-4)===101&&r.charCodeAt(n-5)===100&&r.charCodeAt(n-6)===111&&r.charCodeAt(n-7)===99&&r.charCodeAt(n-8)===32&&r.charCodeAt(n-9)===101&&r.charCodeAt(n-10)===118&&r.charCodeAt(n-11)===105&&r.charCodeAt(n-12)===116&&r.charCodeAt(n-13)===97&&r.charCodeAt(n-14)===110&&r.charCodeAt(n-15)===88,t.set(i,e)),e}})(),Qt={};function Rn(t){switch(typeof t){case"number":return t>=0&&(t|0)===t;case"string":{const e=Qt[t];if(e!==void 0)return e;const r=t.length;if(r===0)return Qt[t]=!1;let n=0;for(let i=0;i<r;++i)if(n=t.charCodeAt(i),i===0&&n===48&&r>1||n<48||n>57)return Qt[t]=!1;return Qt[t]=!0}default:return!1}}function zr(t){return`${t.toLowerCase()}:presentation`}const Yt=new Map,Vn=Object.freeze({define(t,e,r){const n=zr(t);Yt.get(n)===void 0?Yt.set(n,e):Yt.set(n,!1),r.register(Et.instance(n,e))},forTag(t,e){const r=zr(t),n=Yt.get(r);return n===!1?$.findResponsibleContainer(e).get(r):n||null}});class Ki{constructor(e,r){this.template=e||null,this.styles=r===void 0?null:Array.isArray(r)?E.create(r):r instanceof E?r:E.create([r])}applyTo(e){const r=e.$fastController;r.template===null&&(r.template=this.template),r.styles===null&&(r.styles=this.styles)}}class W extends ge{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=Vn.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(e){return(r={})=>new ts(this===W?class extends W{}:this,e,r)}}v([wt],W.prototype,"template",void 0);v([wt],W.prototype,"styles",void 0);function kt(t,e,r){return typeof t=="function"?t(e,r):t}class ts{constructor(e,r,n){this.type=e,this.elementDefinition=r,this.overrideDefinition=n,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(e,r){const n=this.definition,i=this.overrideDefinition,o=`${n.prefix||r.elementPrefix}-${n.baseName}`;r.tryDefineElement({name:o,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const u=new Ki(kt(n.template,a,n),kt(n.styles,a,n));a.definePresentation(u);let c=kt(n.shadowOptions,a,n);a.shadowRootMode&&(c?i.shadowOptions||(c.mode=a.shadowRootMode):c!==null&&(c={mode:a.shadowRootMode})),a.defineElement({elementOptions:kt(n.elementOptions,a,n),shadowOptions:c,attributes:kt(n.attributes,a,n)})}})}}function Cn(t,...e){const r=ne.locate(t);e.forEach(n=>{Object.getOwnPropertyNames(n.prototype).forEach(s=>{s!=="constructor"&&Object.defineProperty(t.prototype,s,Object.getOwnPropertyDescriptor(n.prototype,s))}),ne.locate(n).forEach(s=>r.push(s))})}const es={horizontal:"horizontal",vertical:"vertical"};function rs(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function ns(){const t=document.querySelector('meta[property="csp-nonce"]');return t?t.getAttribute("content"):null}let nt;function is(){if(typeof nt=="boolean")return nt;if(!rs())return nt=!1,nt;const t=document.createElement("style"),e=ns();e!==null&&t.setAttribute("nonce",e),document.head.appendChild(t);try{t.sheet.insertRule("foo:focus-visible {color:inherit}",0),nt=!0}catch{nt=!1}finally{document.head.removeChild(t)}return nt}var jr;(function(t){t[t.alt=18]="alt",t[t.arrowDown=40]="arrowDown",t[t.arrowLeft=37]="arrowLeft",t[t.arrowRight=39]="arrowRight",t[t.arrowUp=38]="arrowUp",t[t.back=8]="back",t[t.backSlash=220]="backSlash",t[t.break=19]="break",t[t.capsLock=20]="capsLock",t[t.closeBracket=221]="closeBracket",t[t.colon=186]="colon",t[t.colon2=59]="colon2",t[t.comma=188]="comma",t[t.ctrl=17]="ctrl",t[t.delete=46]="delete",t[t.end=35]="end",t[t.enter=13]="enter",t[t.equals=187]="equals",t[t.equals2=61]="equals2",t[t.equals3=107]="equals3",t[t.escape=27]="escape",t[t.forwardSlash=191]="forwardSlash",t[t.function1=112]="function1",t[t.function10=121]="function10",t[t.function11=122]="function11",t[t.function12=123]="function12",t[t.function2=113]="function2",t[t.function3=114]="function3",t[t.function4=115]="function4",t[t.function5=116]="function5",t[t.function6=117]="function6",t[t.function7=118]="function7",t[t.function8=119]="function8",t[t.function9=120]="function9",t[t.home=36]="home",t[t.insert=45]="insert",t[t.menu=93]="menu",t[t.minus=189]="minus",t[t.minus2=109]="minus2",t[t.numLock=144]="numLock",t[t.numPad0=96]="numPad0",t[t.numPad1=97]="numPad1",t[t.numPad2=98]="numPad2",t[t.numPad3=99]="numPad3",t[t.numPad4=100]="numPad4",t[t.numPad5=101]="numPad5",t[t.numPad6=102]="numPad6",t[t.numPad7=103]="numPad7",t[t.numPad8=104]="numPad8",t[t.numPad9=105]="numPad9",t[t.numPadDivide=111]="numPadDivide",t[t.numPadDot=110]="numPadDot",t[t.numPadMinus=109]="numPadMinus",t[t.numPadMultiply=106]="numPadMultiply",t[t.numPadPlus=107]="numPadPlus",t[t.openBracket=219]="openBracket",t[t.pageDown=34]="pageDown",t[t.pageUp=33]="pageUp",t[t.period=190]="period",t[t.print=44]="print",t[t.quote=222]="quote",t[t.scrollLock=145]="scrollLock",t[t.shift=16]="shift",t[t.space=32]="space",t[t.tab=9]="tab",t[t.tilde=192]="tilde",t[t.windowsLeft=91]="windowsLeft",t[t.windowsOpera=219]="windowsOpera",t[t.windowsRight=92]="windowsRight"})(jr||(jr={}));const ss="Enter";var sr;(function(t){t.ltr="ltr",t.rtl="rtl"})(sr||(sr={}));var f;(function(t){t.Canvas="Canvas",t.CanvasText="CanvasText",t.LinkText="LinkText",t.VisitedText="VisitedText",t.ActiveText="ActiveText",t.ButtonFace="ButtonFace",t.ButtonText="ButtonText",t.Field="Field",t.FieldText="FieldText",t.Highlight="Highlight",t.HighlightText="HighlightText",t.GrayText="GrayText"})(f||(f={}));class C{}v([p({attribute:"aria-atomic"})],C.prototype,"ariaAtomic",void 0);v([p({attribute:"aria-busy"})],C.prototype,"ariaBusy",void 0);v([p({attribute:"aria-controls"})],C.prototype,"ariaControls",void 0);v([p({attribute:"aria-current"})],C.prototype,"ariaCurrent",void 0);v([p({attribute:"aria-describedby"})],C.prototype,"ariaDescribedby",void 0);v([p({attribute:"aria-details"})],C.prototype,"ariaDetails",void 0);v([p({attribute:"aria-disabled"})],C.prototype,"ariaDisabled",void 0);v([p({attribute:"aria-errormessage"})],C.prototype,"ariaErrormessage",void 0);v([p({attribute:"aria-flowto"})],C.prototype,"ariaFlowto",void 0);v([p({attribute:"aria-haspopup"})],C.prototype,"ariaHaspopup",void 0);v([p({attribute:"aria-hidden"})],C.prototype,"ariaHidden",void 0);v([p({attribute:"aria-invalid"})],C.prototype,"ariaInvalid",void 0);v([p({attribute:"aria-keyshortcuts"})],C.prototype,"ariaKeyshortcuts",void 0);v([p({attribute:"aria-label"})],C.prototype,"ariaLabel",void 0);v([p({attribute:"aria-labelledby"})],C.prototype,"ariaLabelledby",void 0);v([p({attribute:"aria-live"})],C.prototype,"ariaLive",void 0);v([p({attribute:"aria-owns"})],C.prototype,"ariaOwns",void 0);v([p({attribute:"aria-relevant"})],C.prototype,"ariaRelevant",void 0);v([p({attribute:"aria-roledescription"})],C.prototype,"ariaRoledescription",void 0);const os=(t,e)=>et`
    <template class="${r=>r.circular?"circular":""}">
        <div class="control" part="control" style="${r=>r.generateBadgeStyle()}">
            <slot></slot>
        </div>
    </template>
`;let zt=class extends W{constructor(){super(...arguments),this.generateBadgeStyle=()=>{if(!this.fill&&!this.color)return;const e=`background-color: var(--badge-fill-${this.fill});`,r=`color: var(--badge-color-${this.color});`;return this.fill&&!this.color?e:this.color&&!this.fill?r:`${r} ${e}`}}};v([p({attribute:"fill"})],zt.prototype,"fill",void 0);v([p({attribute:"color"})],zt.prototype,"color",void 0);v([p({mode:"boolean"})],zt.prototype,"circular",void 0);const as=(t,e)=>et`
    <button
        class="control"
        part="control"
        ?autofocus="${r=>r.autofocus}"
        ?disabled="${r=>r.disabled}"
        form="${r=>r.formId}"
        formaction="${r=>r.formaction}"
        formenctype="${r=>r.formenctype}"
        formmethod="${r=>r.formmethod}"
        formnovalidate="${r=>r.formnovalidate}"
        formtarget="${r=>r.formtarget}"
        name="${r=>r.name}"
        type="${r=>r.type}"
        value="${r=>r.value}"
        aria-atomic="${r=>r.ariaAtomic}"
        aria-busy="${r=>r.ariaBusy}"
        aria-controls="${r=>r.ariaControls}"
        aria-current="${r=>r.ariaCurrent}"
        aria-describedby="${r=>r.ariaDescribedby}"
        aria-details="${r=>r.ariaDetails}"
        aria-disabled="${r=>r.ariaDisabled}"
        aria-errormessage="${r=>r.ariaErrormessage}"
        aria-expanded="${r=>r.ariaExpanded}"
        aria-flowto="${r=>r.ariaFlowto}"
        aria-haspopup="${r=>r.ariaHaspopup}"
        aria-hidden="${r=>r.ariaHidden}"
        aria-invalid="${r=>r.ariaInvalid}"
        aria-keyshortcuts="${r=>r.ariaKeyshortcuts}"
        aria-label="${r=>r.ariaLabel}"
        aria-labelledby="${r=>r.ariaLabelledby}"
        aria-live="${r=>r.ariaLive}"
        aria-owns="${r=>r.ariaOwns}"
        aria-pressed="${r=>r.ariaPressed}"
        aria-relevant="${r=>r.ariaRelevant}"
        aria-roledescription="${r=>r.ariaRoledescription}"
        ${Y("control")}
    >
        ${zi(t,e)}
        <span class="content" part="content">
            <slot ${Ni("defaultSlottedContent")}></slot>
        </span>
        ${Hi(t,e)}
    </button>
`,Ur="form-associated-proxy",qr="ElementInternals",Wr=qr in window&&"setFormValue"in window[qr].prototype,Gr=new WeakMap;function ls(t){const e=class extends t{constructor(...r){super(...r),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Wr}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const r=this.proxy.labels,n=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),i=r?n.concat(Array.from(r)):n;return Object.freeze(i)}else return Tt}valueChanged(r,n){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(r,n){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(r,n){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),y.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(r,n){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(r,n){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),y.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Wr)return null;let r=Gr.get(this);return r||(r=this.attachInternals(),Gr.set(this,r)),r}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){super.disconnectedCallback(),this.proxyEventsToBlock.forEach(r=>this.proxy.removeEventListener(r,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(r,n,i){this.elementInternals?this.elementInternals.setValidity(r,n,i):typeof n=="string"&&this.proxy.setCustomValidity(n)}formDisabledCallback(r){this.disabled=r}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var r;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(n=>this.proxy.addEventListener(n,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Ur),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Ur)),(r=this.shadowRoot)===null||r===void 0||r.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var r;this.removeChild(this.proxy),(r=this.shadowRoot)===null||r===void 0||r.removeChild(this.proxySlot)}validate(r){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,r)}setFormValue(r,n){this.elementInternals&&this.elementInternals.setFormValue(r,n||r)}_keypressHandler(r){switch(r.key){case ss:if(this.form instanceof HTMLFormElement){const n=this.form.querySelector("[type=submit]");n?.click()}break}}stopPropagation(r){r.stopPropagation()}};return p({mode:"boolean"})(e.prototype,"disabled"),p({mode:"fromView",attribute:"value"})(e.prototype,"initialValue"),p({attribute:"current-value"})(e.prototype,"currentValue"),p(e.prototype,"name"),p({mode:"boolean"})(e.prototype,"required"),wt(e.prototype,"value"),e}class cs extends W{}class us extends ls(cs){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let H=class extends us{constructor(){super(...arguments),this.handleClick=e=>{var r;this.disabled&&((r=this.defaultSlottedContent)===null||r===void 0?void 0:r.length)<=1&&e.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const e=this.proxy.isConnected;e||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),e||this.detachProxy()},this.handleFormReset=()=>{var e;(e=this.form)===null||e===void 0||e.reset()},this.handleUnsupportedDelegatesFocus=()=>{var e;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((e=this.$fastController.definition.shadowOptions)===null||e===void 0)&&e.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(e,r){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),r==="submit"&&this.addEventListener("click",this.handleSubmission),e==="submit"&&this.removeEventListener("click",this.handleSubmission),r==="reset"&&this.addEventListener("click",this.handleFormReset),e==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var e;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const r=Array.from((e=this.control)===null||e===void 0?void 0:e.children);r&&r.forEach(n=>{n.addEventListener("click",this.handleClick)})}disconnectedCallback(){var e;super.disconnectedCallback();const r=Array.from((e=this.control)===null||e===void 0?void 0:e.children);r&&r.forEach(n=>{n.removeEventListener("click",this.handleClick)})}};v([p({mode:"boolean"})],H.prototype,"autofocus",void 0);v([p({attribute:"form"})],H.prototype,"formId",void 0);v([p],H.prototype,"formaction",void 0);v([p],H.prototype,"formenctype",void 0);v([p],H.prototype,"formmethod",void 0);v([p({mode:"boolean"})],H.prototype,"formnovalidate",void 0);v([p],H.prototype,"formtarget",void 0);v([p],H.prototype,"type",void 0);v([wt],H.prototype,"defaultSlottedContent",void 0);class pe{}v([p({attribute:"aria-expanded"})],pe.prototype,"ariaExpanded",void 0);v([p({attribute:"aria-pressed"})],pe.prototype,"ariaPressed",void 0);Cn(pe,C);Cn(H,Mi,pe);const hs=(t,e)=>et`
    <slot></slot>
`;let Tn=class extends W{};function se(t){const e=t.parentElement;if(e)return e;{const r=t.getRootNode();if(r.host instanceof HTMLElement)return r.host}return null}function ds(t,e){let r=e;for(;r!==null;){if(r===t)return!0;r=se(r)}return!1}const _=document.createElement("div");function fs(t){return t instanceof ge}class br{setProperty(e,r){y.queueUpdate(()=>this.target.setProperty(e,r))}removeProperty(e){y.queueUpdate(()=>this.target.removeProperty(e))}}class gs extends br{constructor(e){super();const r=new CSSStyleSheet;r[mn]=!0,this.target=r.cssRules[r.insertRule(":host{}")].style,e.$fastController.addStyles(E.create([r]))}}class ps extends br{constructor(){super();const e=new CSSStyleSheet;this.target=e.cssRules[e.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,e]}}class vs extends br{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:e}=this.style;if(e){const r=e.insertRule(":root{}",e.cssRules.length);this.target=e.cssRules[r].style}}}class Ln{constructor(e){this.store=new Map,this.target=null;const r=e.$fastController;this.style=document.createElement("style"),r.addStyles(this.style),k.getNotifier(r).subscribe(this,"isConnected"),this.handleChange(r,"isConnected")}targetChanged(){if(this.target!==null)for(const[e,r]of this.store.entries())this.target.setProperty(e,r)}setProperty(e,r){this.store.set(e,r),y.queueUpdate(()=>{this.target!==null&&this.target.setProperty(e,r)})}removeProperty(e){this.store.delete(e),y.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(e)})}handleChange(e,r){const{sheet:n}=this.style;if(n){const i=n.insertRule(":host{}",n.cssRules.length);this.target=n.cssRules[i].style}else this.target=null}}v([wt],Ln.prototype,"target",void 0);class bs{constructor(e){this.target=e.style}setProperty(e,r){y.queueUpdate(()=>this.target.setProperty(e,r))}removeProperty(e){y.queueUpdate(()=>this.target.removeProperty(e))}}class T{setProperty(e,r){T.properties[e]=r;for(const n of T.roots.values())ft.getOrCreate(T.normalizeRoot(n)).setProperty(e,r)}removeProperty(e){delete T.properties[e];for(const r of T.roots.values())ft.getOrCreate(T.normalizeRoot(r)).removeProperty(e)}static registerRoot(e){const{roots:r}=T;if(!r.has(e)){r.add(e);const n=ft.getOrCreate(this.normalizeRoot(e));for(const i in T.properties)n.setProperty(i,T.properties[i])}}static unregisterRoot(e){const{roots:r}=T;if(r.has(e)){r.delete(e);const n=ft.getOrCreate(T.normalizeRoot(e));for(const i in T.properties)n.removeProperty(i)}}static normalizeRoot(e){return e===_?document:e}}T.roots=new Set;T.properties={};const Ye=new WeakMap,ys=y.supportsAdoptedStyleSheets?gs:Ln,ft=Object.freeze({getOrCreate(t){if(Ye.has(t))return Ye.get(t);let e;return t===_?e=new T:t instanceof Document?e=y.supportsAdoptedStyleSheets?new ps:new vs:fs(t)?e=new ys(t):e=new bs(t),Ye.set(t,e),e}});class B extends vr{constructor(e){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=e.name,e.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${e.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=B.uniqueId(),B.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(e){return new B({name:typeof e=="string"?e:e.name,cssCustomPropertyName:typeof e=="string"?e:e.cssCustomPropertyName===void 0?e.name:e.cssCustomPropertyName})}static isCSSDesignToken(e){return typeof e.cssCustomProperty=="string"}static isDerivedDesignTokenValue(e){return typeof e=="function"}static getTokenById(e){return B.tokensById.get(e)}getOrCreateSubscriberSet(e=this){return this.subscribers.get(e)||this.subscribers.set(e,new Set)&&this.subscribers.get(e)}createCSS(){return this.cssVar||""}getValueFor(e){const r=D.getOrCreate(e).get(this);if(r!==void 0)return r;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${e} or an ancestor of ${e}.`)}setValueFor(e,r){return this._appliedTo.add(e),r instanceof B&&(r=this.alias(r)),D.getOrCreate(e).set(this,r),this}deleteValueFor(e){return this._appliedTo.delete(e),D.existsFor(e)&&D.getOrCreate(e).delete(this),this}withDefault(e){return this.setValueFor(_,e),this}subscribe(e,r){const n=this.getOrCreateSubscriberSet(r);r&&!D.existsFor(r)&&D.getOrCreate(r),n.has(e)||n.add(e)}unsubscribe(e,r){const n=this.subscribers.get(r||this);n&&n.has(e)&&n.delete(e)}notify(e){const r=Object.freeze({token:this,target:e});this.subscribers.has(this)&&this.subscribers.get(this).forEach(n=>n.handleChange(r)),this.subscribers.has(e)&&this.subscribers.get(e).forEach(n=>n.handleChange(r))}alias(e){return(r=>e.getValueFor(r))}}B.uniqueId=(()=>{let t=0;return()=>(t++,t.toString(16))})();B.tokensById=new Map;class ms{startReflection(e,r){e.subscribe(this,r),this.handleChange({token:e,target:r})}stopReflection(e,r){e.unsubscribe(this,r),this.remove(e,r)}handleChange(e){const{token:r,target:n}=e;this.add(r,n)}add(e,r){ft.getOrCreate(r).setProperty(e.cssCustomProperty,this.resolveCSSValue(D.getOrCreate(r).get(e)))}remove(e,r){ft.getOrCreate(r).removeProperty(e.cssCustomProperty)}resolveCSSValue(e){return e&&typeof e.createCSS=="function"?e.createCSS():e}}class ws{constructor(e,r,n){this.source=e,this.token=r,this.node=n,this.dependencies=new Set,this.observer=k.binding(e,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){try{this.node.store.set(this.token,this.observer.observe(this.node.target,At))}catch(e){console.error(e)}}}class Ss{constructor(){this.values=new Map}set(e,r){this.values.get(e)!==r&&(this.values.set(e,r),k.getNotifier(this).notify(e.id))}get(e){return k.track(this,e.id),this.values.get(e)}delete(e){this.values.delete(e),k.getNotifier(this).notify(e.id)}all(){return this.values.entries()}}const Dt=new WeakMap,Rt=new WeakMap;class D{constructor(e){this.target=e,this.store=new Ss,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(r,n)=>{const i=B.getTokenById(n);i&&(i.notify(this.target),this.updateCSSTokenReflection(r,i))}},Dt.set(e,this),k.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),e instanceof ge?e.$fastController.addBehaviors([this]):e.isConnected&&this.bind()}static getOrCreate(e){return Dt.get(e)||new D(e)}static existsFor(e){return Dt.has(e)}static findParent(e){if(_!==e.target){let r=se(e.target);for(;r!==null;){if(Dt.has(r))return Dt.get(r);r=se(r)}return D.getOrCreate(_)}return null}static findClosestAssignedNode(e,r){let n=r;do{if(n.has(e))return n;n=n.parent?n.parent:n.target!==_?D.getOrCreate(_):null}while(n!==null);return null}get parent(){return Rt.get(this)||null}updateCSSTokenReflection(e,r){if(B.isCSSDesignToken(r)){const n=this.parent,i=this.isReflecting(r);if(n){const s=n.get(r),o=e.get(r);s!==o&&!i?this.reflectToCSS(r):s===o&&i&&this.stopReflectToCSS(r)}else i||this.reflectToCSS(r)}}has(e){return this.assignedValues.has(e)}get(e){const r=this.store.get(e);if(r!==void 0)return r;const n=this.getRaw(e);if(n!==void 0)return this.hydrate(e,n),this.get(e)}getRaw(e){var r;return this.assignedValues.has(e)?this.assignedValues.get(e):(r=D.findClosestAssignedNode(e,this))===null||r===void 0?void 0:r.getRaw(e)}set(e,r){B.isDerivedDesignTokenValue(this.assignedValues.get(e))&&this.tearDownBindingObserver(e),this.assignedValues.set(e,r),B.isDerivedDesignTokenValue(r)?this.setupBindingObserver(e,r):this.store.set(e,r)}delete(e){this.assignedValues.delete(e),this.tearDownBindingObserver(e);const r=this.getRaw(e);r?this.hydrate(e,r):this.store.delete(e)}bind(){const e=D.findParent(this);e&&e.appendChild(this);for(const r of this.assignedValues.keys())r.notify(this.target)}unbind(){this.parent&&Rt.get(this).removeChild(this);for(const e of this.bindingObservers.keys())this.tearDownBindingObserver(e)}appendChild(e){e.parent&&Rt.get(e).removeChild(e);const r=this.children.filter(n=>e.contains(n));Rt.set(e,this),this.children.push(e),r.forEach(n=>e.appendChild(n)),k.getNotifier(this.store).subscribe(e);for(const[n,i]of this.store.all())e.hydrate(n,this.bindingObservers.has(n)?this.getRaw(n):i),e.updateCSSTokenReflection(e.store,n)}removeChild(e){const r=this.children.indexOf(e);if(r!==-1&&this.children.splice(r,1),k.getNotifier(this.store).unsubscribe(e),e.parent!==this)return!1;const n=Rt.delete(e);for(const[i]of this.store.all())e.hydrate(i,e.getRaw(i)),e.updateCSSTokenReflection(e.store,i);return n}contains(e){return ds(this.target,e.target)}reflectToCSS(e){this.isReflecting(e)||(this.reflecting.add(e),D.cssCustomPropertyReflector.startReflection(e,this.target))}stopReflectToCSS(e){this.isReflecting(e)&&(this.reflecting.delete(e),D.cssCustomPropertyReflector.stopReflection(e,this.target))}isReflecting(e){return this.reflecting.has(e)}handleChange(e,r){const n=B.getTokenById(r);n&&(this.hydrate(n,this.getRaw(n)),this.updateCSSTokenReflection(this.store,n))}hydrate(e,r){if(!this.has(e)){const n=this.bindingObservers.get(e);B.isDerivedDesignTokenValue(r)?n?n.source!==r&&(this.tearDownBindingObserver(e),this.setupBindingObserver(e,r)):this.setupBindingObserver(e,r):(n&&this.tearDownBindingObserver(e),this.store.set(e,r))}}setupBindingObserver(e,r){const n=new ws(r,e,this);return this.bindingObservers.set(e,n),n}tearDownBindingObserver(e){return this.bindingObservers.has(e)?(this.bindingObservers.get(e).disconnect(),this.bindingObservers.delete(e),!0):!1}}D.cssCustomPropertyReflector=new ms;v([wt],D.prototype,"children",void 0);function Fs(t){return B.from(t)}const A=Object.freeze({create:Fs,notifyConnection(t){return!t.isConnected||!D.existsFor(t)?!1:(D.getOrCreate(t).bind(),!0)},notifyDisconnection(t){return t.isConnected||!D.existsFor(t)?!1:(D.getOrCreate(t).unbind(),!0)},registerRoot(t=_){T.registerRoot(t)},unregisterRoot(t=_){T.unregisterRoot(t)}}),Ze=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Je=new Map,re=new Map;let gt=null;const Vt=$.createInterface(t=>t.cachedCallback(e=>(gt===null&&(gt=new Pn(null,e)),gt))),An=Object.freeze({tagFor(t){return re.get(t)},responsibleFor(t){const e=t.$$designSystem$$;return e||$.findResponsibleContainer(t).get(Vt)},getOrCreate(t){if(!t)return gt===null&&(gt=$.getOrCreateDOMContainer().get(Vt)),gt;const e=t.$$designSystem$$;if(e)return e;const r=$.getOrCreateDOMContainer(t);if(r.has(Vt,!1))return r.get(Vt);{const n=new Pn(t,r);return r.register(Et.instance(Vt,n)),n}}});function xs(t,e,r){return typeof t=="string"?{name:t,type:e,callback:r}:t}class Pn{constructor(e,r){this.owner=e,this.container=r,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>Ze.definitionCallbackOnly,e!==null&&(e.$$designSystem$$=this)}withPrefix(e){return this.prefix=e,this}withShadowRootMode(e){return this.shadowRootMode=e,this}withElementDisambiguation(e){return this.disambiguate=e,this}withDesignTokenRoot(e){return this.designTokenRoot=e,this}register(...e){const r=this.container,n=[],i=this.disambiguate,s=this.shadowRootMode,o={elementPrefix:this.prefix,tryDefineElement(a,u,c){const h=xs(a,u,c),{name:g,callback:b,baseClass:x}=h;let{type:m}=h,V=g,z=Je.get(V),rt=!0;for(;z;){const j=i(V,m,z);switch(j){case Ze.ignoreDuplicate:return;case Ze.definitionCallbackOnly:rt=!1,z=void 0;break;default:V=j,z=Je.get(V);break}}rt&&((re.has(m)||m===W)&&(m=class extends m{}),Je.set(V,m),re.set(m,V),x&&re.set(x,V)),n.push(new $s(r,V,m,s,b,rt))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&A.registerRoot(this.designTokenRoot)),r.registerWithContext(o,...e);for(const a of n)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class $s{constructor(e,r,n,i,s,o){this.container=e,this.name=r,this.type=n,this.shadowRootMode=i,this.callback=s,this.willDefine=o,this.definition=null}definePresentation(e){Vn.define(this.name,e,this.container)}defineElement(e){this.definition=new fe(this.type,Object.assign(Object.assign({},e),{name:this.name}))}tagFor(e){return An.tagFor(e)}}const ks=(t,e)=>et`
    <template role="${r=>r.role}" aria-orientation="${r=>r.orientation}"></template>
`,Ds={separator:"separator"};class yr extends W{constructor(){super(...arguments),this.role=Ds.separator,this.orientation=es.horizontal}}v([p],yr.prototype,"role",void 0);v([p],yr.prototype,"orientation",void 0);class Rs{constructor(e){this.listenerCache=new WeakMap,this.query=e}bind(e){const{query:r}=this,n=this.constructListener(e);n.bind(r)(),r.addListener(n),this.listenerCache.set(e,n)}unbind(e){const r=this.listenerCache.get(e);r&&(this.query.removeListener(r),this.listenerCache.delete(e))}}class jt extends Rs{constructor(e,r){super(e),this.styles=r}static with(e){return r=>new jt(e,r)}constructListener(e){let r=!1;const n=this.styles;return function(){const{matches:s}=this;s&&!r?(e.$fastController.addStyles(n),r=s):!s&&r&&(e.$fastController.removeStyles(n),r=s)}}unbind(e){super.unbind(e),e.$fastController.removeStyles(this.styles)}}const St=jt.with(window.matchMedia("(forced-colors)"));jt.with(window.matchMedia("(prefers-color-scheme: dark)"));jt.with(window.matchMedia("(prefers-color-scheme: light)"));class Vs{constructor(e,r,n){this.propertyName=e,this.value=r,this.styles=n}bind(e){k.getNotifier(e).subscribe(this,this.propertyName),this.handleChange(e,this.propertyName)}unbind(e){k.getNotifier(e).unsubscribe(this,this.propertyName),e.$fastController.removeStyles(this.styles)}handleChange(e,r){e[r]===this.value?e.$fastController.addStyles(this.styles):e.$fastController.removeStyles(this.styles)}}const Cs="not-allowed",Ts=":host([hidden]){display:none}";function ve(t){return`${Ts}:host{display:${t}}`}const lt=is()?"focus-visible":"focus";function ot(t,e,r){return isNaN(t)||t<=e?e:t>=r?r:t}function Xe(t,e,r){return isNaN(t)||t<=e?0:t>=r?1:t/(r-e)}function it(t,e,r){return isNaN(t)?e:e+t*(r-e)}function Ls(t){const e=Math.round(ot(t,0,255)).toString(16);return e.length===1?"0"+e:e}function Zt(t,e,r){return isNaN(t)||t<=0?e:t>=1?r:e+t*(r-e)}function O(t,e){const r=Math.pow(10,e);return Math.round(t*r)/r}class It{constructor(e,r,n){this.h=e,this.s=r,this.l=n}static fromObject(e){return e&&!isNaN(e.h)&&!isNaN(e.s)&&!isNaN(e.l)?new It(e.h,e.s,e.l):null}equalValue(e){return this.h===e.h&&this.s===e.s&&this.l===e.l}roundToPrecision(e){return new It(O(this.h,e),O(this.s,e),O(this.l,e))}toObject(){return{h:this.h,s:this.s,l:this.l}}}class L{constructor(e,r,n){this.l=e,this.a=r,this.b=n}static fromObject(e){return e&&!isNaN(e.l)&&!isNaN(e.a)&&!isNaN(e.b)?new L(e.l,e.a,e.b):null}equalValue(e){return this.l===e.l&&this.a===e.a&&this.b===e.b}roundToPrecision(e){return new L(O(this.l,e),O(this.a,e),O(this.b,e))}toObject(){return{l:this.l,a:this.a,b:this.b}}}L.epsilon=216/24389;L.kappa=24389/27;class R{constructor(e,r,n,i){this.r=e,this.g=r,this.b=n,this.a=typeof i=="number"&&!isNaN(i)?i:1}static fromObject(e){return e&&!isNaN(e.r)&&!isNaN(e.g)&&!isNaN(e.b)?new R(e.r,e.g,e.b,e.a):null}equalValue(e){return this.r===e.r&&this.g===e.g&&this.b===e.b&&this.a===e.a}toStringHexRGB(){return"#"+[this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringHexRGBA(){return this.toStringHexRGB()+this.formatHexValue(this.a)}toStringHexARGB(){return"#"+[this.a,this.r,this.g,this.b].map(this.formatHexValue).join("")}toStringWebRGB(){return`rgb(${Math.round(it(this.r,0,255))},${Math.round(it(this.g,0,255))},${Math.round(it(this.b,0,255))})`}toStringWebRGBA(){return`rgba(${Math.round(it(this.r,0,255))},${Math.round(it(this.g,0,255))},${Math.round(it(this.b,0,255))},${ot(this.a,0,1)})`}roundToPrecision(e){return new R(O(this.r,e),O(this.g,e),O(this.b,e),O(this.a,e))}clamp(){return new R(ot(this.r,0,1),ot(this.g,0,1),ot(this.b,0,1),ot(this.a,0,1))}toObject(){return{r:this.r,g:this.g,b:this.b,a:this.a}}formatHexValue(e){return Ls(it(e,0,255))}}class I{constructor(e,r,n){this.x=e,this.y=r,this.z=n}static fromObject(e){return e&&!isNaN(e.x)&&!isNaN(e.y)&&!isNaN(e.z)?new I(e.x,e.y,e.z):null}equalValue(e){return this.x===e.x&&this.y===e.y&&this.z===e.z}roundToPrecision(e){return new I(O(this.x,e),O(this.y,e),O(this.z,e))}toObject(){return{x:this.x,y:this.y,z:this.z}}}I.whitePoint=new I(.95047,1,1.08883);function As(t){return t.r*.2126+t.g*.7152+t.b*.0722}function Bn(t){function e(r){return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}return As(new R(e(t.r),e(t.g),e(t.b),1))}function Ke(t,e,r){return r-e===0?0:(t-e)/(r-e)}function tr(t,e,r){const n=Ke(t.r,e.r,r.r),i=Ke(t.g,e.g,r.g),s=Ke(t.b,e.b,r.b);return(n+i+s)/3}function Ps(t,e,r=null){let n=0,i=r;return i!==null?n=tr(t,e,i):(i=new R(0,0,0,1),n=tr(t,e,i),n<=0&&(i=new R(1,1,1,1),n=tr(t,e,i))),n=Math.round(n*1e3)/1e3,new R(i.r,i.g,i.b,n)}function _r(t){const e=Math.max(t.r,t.g,t.b),r=Math.min(t.r,t.g,t.b),n=e-r;let i=0;n!==0&&(e===t.r?i=60*((t.g-t.b)/n%6):e===t.g?i=60*((t.b-t.r)/n+2):i=60*((t.r-t.g)/n+4)),i<0&&(i+=360);const s=(e+r)/2;let o=0;return n!==0&&(o=n/(1-Math.abs(2*s-1))),new It(i,o,s)}function Bs(t,e=1){const r=(1-Math.abs(2*t.l-1))*t.s,n=r*(1-Math.abs(t.h/60%2-1)),i=t.l-r/2;let s=0,o=0,a=0;return t.h<60?(s=r,o=n,a=0):t.h<120?(s=n,o=r,a=0):t.h<180?(s=0,o=r,a=n):t.h<240?(s=0,o=n,a=r):t.h<300?(s=n,o=0,a=r):t.h<360&&(s=r,o=0,a=n),new R(s+i,o+i,a+i,e)}function Os(t){const e=(t.l+16)/116,r=e+t.a/500,n=e-t.b/200,i=Math.pow(r,3),s=Math.pow(e,3),o=Math.pow(n,3);let a=0;i>L.epsilon?a=i:a=(116*r-16)/L.kappa;let u=0;t.l>L.epsilon*L.kappa?u=s:u=t.l/L.kappa;let c=0;return o>L.epsilon?c=o:c=(116*n-16)/L.kappa,a=I.whitePoint.x*a,u=I.whitePoint.y*u,c=I.whitePoint.z*c,new I(a,u,c)}function Es(t){function e(u){return u>L.epsilon?Math.pow(u,1/3):(L.kappa*u+16)/116}const r=e(t.x/I.whitePoint.x),n=e(t.y/I.whitePoint.y),i=e(t.z/I.whitePoint.z),s=116*n-16,o=500*(r-n),a=200*(n-i);return new L(s,o,a)}function Is(t){function e(u){return u<=.04045?u/12.92:Math.pow((u+.055)/1.055,2.4)}const r=e(t.r),n=e(t.g),i=e(t.b),s=r*.4124564+n*.3575761+i*.1804375,o=r*.2126729+n*.7151522+i*.072175,a=r*.0193339+n*.119192+i*.9503041;return new I(s,o,a)}function Ns(t,e=1){function r(o){return o<=.0031308?o*12.92:1.055*Math.pow(o,1/2.4)-.055}const n=r(t.x*3.2404542-t.y*1.5371385-t.z*.4985314),i=r(t.x*-.969266+t.y*1.8760108+t.z*.041556),s=r(t.x*.0556434-t.y*.2040259+t.z*1.0572252);return new R(n,i,s,e)}function Ms(t){return Es(Is(t))}function er(t,e=1){return Ns(Os(t),e)}var Qr;(function(t){t[t.Burn=0]="Burn",t[t.Color=1]="Color",t[t.Darken=2]="Darken",t[t.Dodge=3]="Dodge",t[t.Lighten=4]="Lighten",t[t.Multiply=5]="Multiply",t[t.Overlay=6]="Overlay",t[t.Screen=7]="Screen"})(Qr||(Qr={}));function Hs(t,e){if(e.a>=1)return e;if(e.a<=0)return new R(t.r,t.g,t.b,1);const r=e.a*e.r+(1-e.a)*t.r,n=e.a*e.g+(1-e.a)*t.g,i=e.a*e.b+(1-e.a)*t.b;return new R(r,n,i,1)}function Jt(t,e,r){return isNaN(t)||t<=0?e:t>=1?r:new R(Zt(t,e.r,r.r),Zt(t,e.g,r.g),Zt(t,e.b,r.b),Zt(t,e.a,r.a))}var Yr;(function(t){t[t.RGB=0]="RGB",t[t.HSL=1]="HSL",t[t.HSV=2]="HSV",t[t.XYZ=3]="XYZ",t[t.LAB=4]="LAB",t[t.LCH=5]="LCH"})(Yr||(Yr={}));const zs=/^#((?:[0-9a-f]{6}|[0-9a-f]{3}))$/i;function pt(t){const e=zs.exec(t);if(e===null)return null;let r=e[1];if(r.length===3){const i=r.charAt(0),s=r.charAt(1),o=r.charAt(2);r=i.concat(i,s,s,o,o)}const n=parseInt(r,16);return isNaN(n)?null:new R(Xe((n&16711680)>>>16,0,255),Xe((n&65280)>>>8,0,255),Xe(n&255,0,255),1)}function oe(t,e){const r=t.relativeLuminance>e.relativeLuminance?t:e,n=t.relativeLuminance>e.relativeLuminance?e:t;return(r.relativeLuminance+.05)/(n.relativeLuminance+.05)}const U=Object.freeze({create(t,e,r){return new ae(t,e,r)},from(t){return new ae(t.r,t.g,t.b)}});function js(t){const e={r:0,g:0,b:0,toColorString:()=>"",contrast:()=>0,relativeLuminance:0};for(const r in e)if(typeof e[r]!=typeof t[r])return!1;return!0}class ae extends R{constructor(e,r,n){super(e,r,n,1),this.toColorString=this.toStringHexRGB,this.contrast=oe.bind(null,this),this.createCSS=this.toColorString,this.relativeLuminance=Bn(this)}static fromObject(e){return new ae(e.r,e.g,e.b)}}function or(t,e,r=0,n=t.length-1){if(n===r)return t[r];const i=Math.floor((n-r)/2)+r;return e(t[i])?or(t,e,r,i):or(t,e,i+1,n)}const Us=(-.1+Math.sqrt(.21))/2;function Ut(t){return t.relativeLuminance<=Us}function ut(t){return Ut(t)?-1:1}const Zr={stepContrast:1.03,stepContrastRamp:.03,preserveSource:!1};function qs(t,e,r){return typeof t=="number"?Nt.from(U.create(t,e,r)):Nt.from(t)}function Ws(t,e){return js(t)?q.from(t,e):q.from(U.create(t.r,t.g,t.b),e)}const Nt=Object.freeze({create:qs,from:Ws});class q{constructor(e,r){this.closestIndexCache=new Map,this.source=e,this.swatches=r,this.reversedSwatches=Object.freeze([...this.swatches].reverse()),this.lastIndex=this.swatches.length-1}colorContrast(e,r,n,i){n===void 0&&(n=this.closestIndexOf(e));let s=this.swatches;const o=this.lastIndex;let a=n;i===void 0&&(i=ut(e));const u=c=>oe(e,c)>=r;return i===-1&&(s=this.reversedSwatches,a=o-a),or(s,u,a,o)}get(e){return this.swatches[e]||this.swatches[ot(e,0,this.lastIndex)]}closestIndexOf(e){if(this.closestIndexCache.has(e.relativeLuminance))return this.closestIndexCache.get(e.relativeLuminance);let r=this.swatches.indexOf(e);if(r!==-1)return this.closestIndexCache.set(e.relativeLuminance,r),r;const n=this.swatches.reduce((i,s)=>Math.abs(s.relativeLuminance-e.relativeLuminance)<Math.abs(i.relativeLuminance-e.relativeLuminance)?s:i);return r=this.swatches.indexOf(n),this.closestIndexCache.set(e.relativeLuminance,r),r}static saturationBump(e,r){const i=_r(e).s,s=_r(r);if(s.s<i){const o=new It(s.h,i,s.l);return Bs(o)}return r}static ramp(e){const r=e/100;return r>.5?(r-.5)/.5:2*r}static createHighResolutionPalette(e){const r=[],n=Ms(R.fromObject(e).roundToPrecision(4)),i=er(new L(0,n.a,n.b)).clamp().roundToPrecision(4),s=er(new L(50,n.a,n.b)).clamp().roundToPrecision(4),o=er(new L(100,n.a,n.b)).clamp().roundToPrecision(4),a=new R(0,0,0),u=new R(1,1,1),c=o.equalValue(u)?0:14,h=i.equalValue(a)?0:14;for(let g=100+c;g>=0-h;g-=.5){let b;if(g<0){const x=g/h+1;b=Jt(x,a,i)}else if(g<=50)b=Jt(q.ramp(g),i,s);else if(g<=100)b=Jt(q.ramp(g),s,o);else{const x=(g-100)/c;b=Jt(x,o,u)}b=q.saturationBump(s,b).roundToPrecision(4),r.push(U.from(b))}return new q(e,r)}static adjustEnd(e,r,n,i){const s=i===-1?r.swatches:r.reversedSwatches,o=c=>{const h=r.closestIndexOf(c);return i===1?r.lastIndex-h:h};i===1&&n.reverse();const a=e(n[n.length-2]);if(O(oe(n[n.length-1],n[n.length-2]),2)<a){n.pop();const c=r.colorContrast(s[r.lastIndex],a,void 0,i),h=o(c),g=o(n[n.length-2]),b=h-g;let x=1;for(let m=n.length-b-1;m<n.length;m++){const V=o(n[m]),z=m===n.length-1?r.lastIndex:V+x;n[m]=s[z],x++}}i===1&&n.reverse()}static createColorPaletteByContrast(e,r){const n=q.createHighResolutionPalette(e),i=a=>{const u=r.stepContrast+r.stepContrast*(1-a.relativeLuminance)*r.stepContrastRamp;return O(u,2)},s=[];let o=r.preserveSource?e:n.swatches[0];s.push(o);do{const a=i(o);o=n.colorContrast(o,a,void 0,1),s.push(o)}while(o.relativeLuminance>0);if(r.preserveSource){o=e;do{const a=i(o);o=n.colorContrast(o,a,void 0,-1),s.unshift(o)}while(o.relativeLuminance<1)}return this.adjustEnd(i,n,s,-1),r.preserveSource&&this.adjustEnd(i,n,s,1),s}static from(e,r){const n=r===void 0?Zr:Object.assign(Object.assign({},Zr),r);return new q(e,Object.freeze(q.createColorPaletteByContrast(e,n)))}}const le=U.create(1,1,1),mr=U.create(0,0,0),Gs=U.create(.5,.5,.5),rr=pt("#0078D4"),_s=U.create(rr.r,rr.g,rr.b);function On(t,e,r,n,i){const s=h=>h.contrast(le)>=i?le:mr,o=s(t),a=s(e),u=o.relativeLuminance===a.relativeLuminance?o:s(r),c=s(n);return{rest:o,hover:a,active:u,focus:c}}class be{constructor(e,r,n,i){this.toColorString=()=>this.cssGradient,this.contrast=oe.bind(null,this),this.createCSS=this.toColorString,this.color=new R(e,r,n),this.cssGradient=i,this.relativeLuminance=Bn(this.color),this.r=e,this.g=r,this.b=n}static fromObject(e,r){return new be(e.r,e.g,e.b,r)}}const Qs=new R(0,0,0),Ys=new R(1,1,1);function En(t,e,r,n,i,s,o,a,u=10,c=!1){const h=t.closestIndexOf(e);a===void 0&&(a=ut(e));function g(G){if(c){const Ft=t.closestIndexOf(e),xt=t.get(Ft),Wt=G.relativeLuminance<e.relativeLuminance?Qs:Ys,Gt=Ps(pt(G.toColorString()),pt(xt.toColorString()),Wt).roundToPrecision(2),Me=Hs(pt(e.toColorString()),Gt);return U.from(Me)}else return G}const b=h+a*r,x=b+a*(n-r),m=b+a*(i-r),V=b+a*(s-r),z=a===-1?0:100-u,rt=a===-1?u:100;function j(G,Ft){const xt=t.get(G);if(Ft){const Wt=t.get(G+a*o),Gt=a===-1?Wt:xt,Me=a===-1?xt:Wt,ui=`linear-gradient(${g(Gt).toColorString()} ${z}%, ${g(Me).toColorString()} ${rt}%)`;return be.fromObject(Gt,ui)}else return g(xt)}return{rest:j(b,!0),hover:j(x,!0),active:j(m,!1),focus:j(V,!0)}}function Zs(t,e,r,n,i,s,o,a){const u=t.closestIndexOf(e),c=ut(e),h=u+c*r,g=h+c*(n-r),b=h+c*(i-r),x=h+c*(s-r),m=`calc(100% - ${a})`;function V(z,rt){const j=t.get(z);if(rt){const G=t.get(z+c*o),Ft=`linear-gradient(${j.toColorString()} ${m}, ${G.toColorString()} ${m}, ${G.toColorString()})`;return be.fromObject(j,Ft)}else return j}return{rest:V(h,!0),hover:V(g,!0),active:V(b,!1),focus:V(x,!0)}}function Js(t,e,r){return t.colorContrast(e,r)}function bt(t,e,r,n,i,s,o,a){a==null&&(a=ut(e));const u=t.closestIndexOf(t.colorContrast(e,r));return{rest:t.get(u+a*n),hover:t.get(u+a*i),active:t.get(u+a*s),focus:t.get(u+a*o)}}function Xs(t,e,r,n,i,s,o,a=void 0,u,c,h,g,b,x=void 0){return Ut(e)?bt(t,e,u,c,h,g,b,x):bt(t,e,r,n,i,s,o,a)}function Ks(t,e,r){return t.get(t.closestIndexOf(e)+ut(e)*r)}function tt(t,e,r,n,i,s,o){const a=t.closestIndexOf(e);return o==null&&(o=ut(e)),{rest:t.get(a+o*r),hover:t.get(a+o*n),active:t.get(a+o*i),focus:t.get(a+o*s)}}function wr(t,e,r,n,i,s,o=void 0,a,u,c,h,g=void 0){return Ut(e)?tt(t,e,a,u,c,h,g):tt(t,e,r,n,i,s,o)}function to(t,e){return Ut(e)?le:mr}function eo(t,e,r){return Ut(e)?mr:le}function ro(t){return U.create(t,t,t)}var Mt;(function(t){t[t.LightMode=.98]="LightMode",t[t.DarkMode=.15]="DarkMode"})(Mt||(Mt={}));function qt(t,e){return t.closestIndexOf(ro(e))}function no(t,e){return t.get(qt(t,e))}function io(t,e,r){return t.get(qt(t,e)+r)}function In(t,e,r){return t.get(qt(t,e)+r*-1)}function so(t,e,r){return t.get(qt(t,e)+r*-1*2)}function oo(t,e,r){return t.get(qt(t,e)+r*-1*3)}const ao={Normal:400},{create:l}=A;function d(t){return A.create({name:t,cssCustomPropertyName:null})}const El=l("direction").withDefault(sr.ltr),lo=l("disabled-opacity").withDefault(.3),co=l("base-height-multiplier").withDefault(8),Il=l("base-horizontal-spacing-multiplier").withDefault(3),Nn=l("density").withDefault(0),vt=l("design-unit").withDefault(4),Mn=l("control-corner-radius").withDefault(4),uo=l("layer-corner-radius").withDefault(8),Q=l("stroke-width").withDefault(1),Ht=l("focus-stroke-width").withDefault(2),Z=l("body-font").withDefault('"Segoe UI Variable", "Segoe UI", sans-serif'),ho=l("font-weight").withDefault(ao.Normal);function J(t){return e=>{const r=t.getValueFor(e),n=ho.getValueFor(e);if(r.endsWith("px")){const i=Number.parseFloat(r.replace("px",""));if(i<=12)return`"wght" ${n}, "opsz" 8`;if(i>24)return`"wght" ${n}, "opsz" 36`}return`"wght" ${n}, "opsz" 10.5`}}const Hn=l("type-ramp-base-font-size").withDefault("14px"),fo=l("type-ramp-base-line-height").withDefault("20px"),go=l("type-ramp-base-font-variations").withDefault(J(Hn)),zn=l("type-ramp-minus-1-font-size").withDefault("12px"),jn=l("type-ramp-minus-1-line-height").withDefault("16px"),po=l("type-ramp-minus-1-font-variations").withDefault(J(zn)),Un=l("type-ramp-minus-2-font-size").withDefault("10px"),vo=l("type-ramp-minus-2-line-height").withDefault("14px"),bo=l("type-ramp-minus-2-font-variations").withDefault(J(Un)),qn=l("type-ramp-plus-1-font-size").withDefault("16px"),yo=l("type-ramp-plus-1-line-height").withDefault("22px"),mo=l("type-ramp-plus-1-font-variations").withDefault(J(qn)),Wn=l("type-ramp-plus-2-font-size").withDefault("20px"),wo=l("type-ramp-plus-2-line-height").withDefault("26px"),So=l("type-ramp-plus-2-font-variations").withDefault(J(Wn)),Gn=l("type-ramp-plus-3-font-size").withDefault("24px"),Fo=l("type-ramp-plus-3-line-height").withDefault("32px"),xo=l("type-ramp-plus-3-font-variations").withDefault(J(Gn)),_n=l("type-ramp-plus-4-font-size").withDefault("28px"),$o=l("type-ramp-plus-4-line-height").withDefault("36px"),ko=l("type-ramp-plus-4-font-variations").withDefault(J(_n)),Qn=l("type-ramp-plus-5-font-size").withDefault("32px"),Do=l("type-ramp-plus-5-line-height").withDefault("40px"),Ro=l("type-ramp-plus-5-font-variations").withDefault(J(Qn)),Yn=l("type-ramp-plus-6-font-size").withDefault("40px"),Vo=l("type-ramp-plus-6-line-height").withDefault("52px"),Co=l("type-ramp-plus-6-font-variations").withDefault(J(Yn)),ht=l("base-layer-luminance").withDefault(Mt.LightMode),Jr=d("accent-fill-rest-delta").withDefault(0),Xr=d("accent-fill-hover-delta").withDefault(-2),Kr=d("accent-fill-active-delta").withDefault(-5),tn=d("accent-fill-focus-delta").withDefault(0),To=d("accent-foreground-rest-delta").withDefault(0),Lo=d("accent-foreground-hover-delta").withDefault(3),Ao=d("accent-foreground-active-delta").withDefault(-8),Po=d("accent-foreground-focus-delta").withDefault(0),Bo=d("neutral-fill-rest-delta").withDefault(-1),Oo=d("neutral-fill-hover-delta").withDefault(1),Eo=d("neutral-fill-active-delta").withDefault(0),Io=d("neutral-fill-focus-delta").withDefault(0),No=d("neutral-fill-input-rest-delta").withDefault(-1),Mo=d("neutral-fill-input-hover-delta").withDefault(1),Ho=d("neutral-fill-input-active-delta").withDefault(0),zo=d("neutral-fill-input-focus-delta").withDefault(-2),Xt=d("neutral-fill-input-alt-rest-delta").withDefault(2),en=d("neutral-fill-input-alt-hover-delta").withDefault(4),rn=d("neutral-fill-input-alt-active-delta").withDefault(6),nn=d("neutral-fill-input-alt-focus-delta").withDefault(2),ct=d("neutral-fill-layer-rest-delta").withDefault(-2),jo=d("neutral-fill-layer-hover-delta").withDefault(-3),Uo=d("neutral-fill-layer-active-delta").withDefault(-3),Kt=d("neutral-fill-layer-alt-rest-delta").withDefault(-1),qo=d("neutral-fill-secondary-rest-delta").withDefault(3),Wo=d("neutral-fill-secondary-hover-delta").withDefault(2),Go=d("neutral-fill-secondary-active-delta").withDefault(1),_o=d("neutral-fill-secondary-focus-delta").withDefault(3),Qo=d("neutral-fill-stealth-rest-delta").withDefault(0),Yo=d("neutral-fill-stealth-hover-delta").withDefault(3),Zo=d("neutral-fill-stealth-active-delta").withDefault(2),Jo=d("neutral-fill-stealth-focus-delta").withDefault(0),Xo=d("neutral-fill-strong-rest-delta").withDefault(0),Ko=d("neutral-fill-strong-hover-delta").withDefault(8),ta=d("neutral-fill-strong-active-delta").withDefault(-5),ea=d("neutral-fill-strong-focus-delta").withDefault(0),ra=d("neutral-stroke-rest-delta").withDefault(8),na=d("neutral-stroke-hover-delta").withDefault(12),ia=d("neutral-stroke-active-delta").withDefault(6),sa=d("neutral-stroke-focus-delta").withDefault(8),Zn=d("neutral-stroke-control-rest-delta").withDefault(3),Jn=d("neutral-stroke-control-hover-delta").withDefault(5),Xn=d("neutral-stroke-control-active-delta").withDefault(5),Kn=d("neutral-stroke-control-focus-delta").withDefault(5),oa=d("neutral-stroke-divider-rest-delta").withDefault(4),sn=d("neutral-stroke-layer-rest-delta").withDefault(3),aa=d("neutral-stroke-layer-hover-delta").withDefault(3),la=d("neutral-stroke-layer-active-delta").withDefault(3),ca=d("neutral-stroke-strong-hover-delta").withDefault(0),ua=d("neutral-stroke-strong-active-delta").withDefault(0),ha=d("neutral-stroke-strong-focus-delta").withDefault(0),da=l("neutral-base-color").withDefault(Gs),S=d("neutral-palette").withDefault(t=>Nt.from(da.getValueFor(t))),fa=l("accent-base-color").withDefault(_s),Sr=d("accent-palette").withDefault(t=>Nt.from(fa.getValueFor(t))),ga=d("neutral-layer-card-container-recipe").withDefault({evaluate:t=>In(S.getValueFor(t),ht.getValueFor(t),ct.getValueFor(t))});l("neutral-layer-card-container").withDefault(t=>ga.getValueFor(t).evaluate(t));const pa=d("neutral-layer-floating-recipe").withDefault({evaluate:t=>io(S.getValueFor(t),ht.getValueFor(t),ct.getValueFor(t))}),Nl=l("neutral-layer-floating").withDefault(t=>pa.getValueFor(t).evaluate(t)),va=d("neutral-layer-1-recipe").withDefault({evaluate:t=>no(S.getValueFor(t),ht.getValueFor(t))}),ba=l("neutral-layer-1").withDefault(t=>va.getValueFor(t).evaluate(t)),ya=d("neutral-layer-2-recipe").withDefault({evaluate:t=>In(S.getValueFor(t),ht.getValueFor(t),ct.getValueFor(t))});l("neutral-layer-2").withDefault(t=>ya.getValueFor(t).evaluate(t));const ma=d("neutral-layer-3-recipe").withDefault({evaluate:t=>so(S.getValueFor(t),ht.getValueFor(t),ct.getValueFor(t))});l("neutral-layer-3").withDefault(t=>ma.getValueFor(t).evaluate(t));const wa=d("neutral-layer-4-recipe").withDefault({evaluate:t=>oo(S.getValueFor(t),ht.getValueFor(t),ct.getValueFor(t))});l("neutral-layer-4").withDefault(t=>wa.getValueFor(t).evaluate(t));const w=l("fill-color").withDefault(t=>ba.getValueFor(t));var ce;(function(t){t[t.normal=4.5]="normal",t[t.large=3]="large"})(ce||(ce={}));const ye=d("accent-fill-recipe").withDefault({evaluate:(t,e)=>Xs(Sr.getValueFor(t),e||w.getValueFor(t),5,Jr.getValueFor(t),Xr.getValueFor(t),Kr.getValueFor(t),tn.getValueFor(t),void 0,8,Jr.getValueFor(t),Xr.getValueFor(t),Kr.getValueFor(t),tn.getValueFor(t),void 0)}),at=l("accent-fill-rest").withDefault(t=>ye.getValueFor(t).evaluate(t).rest),yt=l("accent-fill-hover").withDefault(t=>ye.getValueFor(t).evaluate(t).hover),mt=l("accent-fill-active").withDefault(t=>ye.getValueFor(t).evaluate(t).active),me=l("accent-fill-focus").withDefault(t=>ye.getValueFor(t).evaluate(t).focus),we=d("foreground-on-accent-recipe").withDefault({evaluate:t=>On(at.getValueFor(t),yt.getValueFor(t),mt.getValueFor(t),me.getValueFor(t),ce.normal)}),ti=l("foreground-on-accent-rest").withDefault(t=>we.getValueFor(t).evaluate(t).rest),Sa=l("foreground-on-accent-hover").withDefault(t=>we.getValueFor(t).evaluate(t).hover),Fa=l("foreground-on-accent-active").withDefault(t=>we.getValueFor(t).evaluate(t).active);l("foreground-on-accent-focus").withDefault(t=>we.getValueFor(t).evaluate(t).focus);const Se=d("accent-foreground-recipe").withDefault({evaluate:(t,e)=>bt(Sr.getValueFor(t),e||w.getValueFor(t),9.5,To.getValueFor(t),Lo.getValueFor(t),Ao.getValueFor(t),Po.getValueFor(t))}),xa=l("accent-foreground-rest").withDefault(t=>Se.getValueFor(t).evaluate(t).rest),$a=l("accent-foreground-hover").withDefault(t=>Se.getValueFor(t).evaluate(t).hover),ka=l("accent-foreground-active").withDefault(t=>Se.getValueFor(t).evaluate(t).active);l("accent-foreground-focus").withDefault(t=>Se.getValueFor(t).evaluate(t).focus);const Fe=d("accent-stroke-control-recipe").withDefault({evaluate:(t,e)=>En(S.getValueFor(t),e||w.getValueFor(t),-3,-3,-3,-3,10,1,void 0,!0)}),Da=l("accent-stroke-control-rest").withDefault(t=>Fe.getValueFor(t).evaluate(t,at.getValueFor(t)).rest),Ra=l("accent-stroke-control-hover").withDefault(t=>Fe.getValueFor(t).evaluate(t,yt.getValueFor(t)).hover),Va=l("accent-stroke-control-active").withDefault(t=>Fe.getValueFor(t).evaluate(t,mt.getValueFor(t)).active);l("accent-stroke-control-focus").withDefault(t=>Fe.getValueFor(t).evaluate(t,me.getValueFor(t)).focus);const xe=d("neutral-fill-recipe").withDefault({evaluate:(t,e)=>wr(S.getValueFor(t),e||w.getValueFor(t),Bo.getValueFor(t),Oo.getValueFor(t),Eo.getValueFor(t),Io.getValueFor(t),void 0,2,3,1,2,void 0)}),te=l("neutral-fill-rest").withDefault(t=>xe.getValueFor(t).evaluate(t).rest),on=l("neutral-fill-hover").withDefault(t=>xe.getValueFor(t).evaluate(t).hover),an=l("neutral-fill-active").withDefault(t=>xe.getValueFor(t).evaluate(t).active);l("neutral-fill-focus").withDefault(t=>xe.getValueFor(t).evaluate(t).focus);const $e=d("neutral-fill-input-recipe").withDefault({evaluate:(t,e)=>wr(S.getValueFor(t),e||w.getValueFor(t),No.getValueFor(t),Mo.getValueFor(t),Ho.getValueFor(t),zo.getValueFor(t),void 0,2,3,1,0,void 0)}),Ml=l("neutral-fill-input-rest").withDefault(t=>$e.getValueFor(t).evaluate(t).rest),Hl=l("neutral-fill-input-hover").withDefault(t=>$e.getValueFor(t).evaluate(t).hover);l("neutral-fill-input-active").withDefault(t=>$e.getValueFor(t).evaluate(t).active);const zl=l("neutral-fill-input-focus").withDefault(t=>$e.getValueFor(t).evaluate(t).focus),ke=d("neutral-fill-input-alt-recipe").withDefault({evaluate:(t,e)=>wr(S.getValueFor(t),e||w.getValueFor(t),Xt.getValueFor(t),en.getValueFor(t),rn.getValueFor(t),nn.getValueFor(t),1,Xt.getValueFor(t),Xt.getValueFor(t)-en.getValueFor(t),Xt.getValueFor(t)-rn.getValueFor(t),nn.getValueFor(t),1)}),jl=l("neutral-fill-input-alt-rest").withDefault(t=>ke.getValueFor(t).evaluate(t).rest),Ul=l("neutral-fill-input-alt-hover").withDefault(t=>ke.getValueFor(t).evaluate(t).hover),ql=l("neutral-fill-input-alt-active").withDefault(t=>ke.getValueFor(t).evaluate(t).active),Wl=l("neutral-fill-input-alt-focus").withDefault(t=>ke.getValueFor(t).evaluate(t).focus),De=d("neutral-fill-layer-recipe").withDefault({evaluate:(t,e)=>tt(S.getValueFor(t),e||w.getValueFor(t),ct.getValueFor(t),jo.getValueFor(t),Uo.getValueFor(t),ct.getValueFor(t),1)}),Gl=l("neutral-fill-layer-rest").withDefault(t=>De.getValueFor(t).evaluate(t).rest);l("neutral-fill-layer-hover").withDefault(t=>De.getValueFor(t).evaluate(t).hover);l("neutral-fill-layer-active").withDefault(t=>De.getValueFor(t).evaluate(t).active);const Ca=d("neutral-fill-layer-alt-recipe").withDefault({evaluate:(t,e)=>tt(S.getValueFor(t),e||w.getValueFor(t),Kt.getValueFor(t),Kt.getValueFor(t),Kt.getValueFor(t),Kt.getValueFor(t))}),_l=l("neutral-fill-layer-alt-rest").withDefault(t=>Ca.getValueFor(t).evaluate(t).rest),Re=d("neutral-fill-secondary-recipe").withDefault({evaluate:(t,e)=>tt(S.getValueFor(t),e||w.getValueFor(t),qo.getValueFor(t),Wo.getValueFor(t),Go.getValueFor(t),_o.getValueFor(t))}),Ta=l("neutral-fill-secondary-rest").withDefault(t=>Re.getValueFor(t).evaluate(t).rest),Ql=l("neutral-fill-secondary-hover").withDefault(t=>Re.getValueFor(t).evaluate(t).hover),Yl=l("neutral-fill-secondary-active").withDefault(t=>Re.getValueFor(t).evaluate(t).active),Zl=l("neutral-fill-secondary-focus").withDefault(t=>Re.getValueFor(t).evaluate(t).focus),Ve=d("neutral-fill-stealth-recipe").withDefault({evaluate:(t,e)=>tt(S.getValueFor(t),e||w.getValueFor(t),Qo.getValueFor(t),Yo.getValueFor(t),Zo.getValueFor(t),Jo.getValueFor(t))}),ue=l("neutral-fill-stealth-rest").withDefault(t=>Ve.getValueFor(t).evaluate(t).rest),ei=l("neutral-fill-stealth-hover").withDefault(t=>Ve.getValueFor(t).evaluate(t).hover),ri=l("neutral-fill-stealth-active").withDefault(t=>Ve.getValueFor(t).evaluate(t).active),Jl=l("neutral-fill-stealth-focus").withDefault(t=>Ve.getValueFor(t).evaluate(t).focus),Ce=d("neutral-fill-strong-recipe").withDefault({evaluate:(t,e)=>bt(S.getValueFor(t),e||w.getValueFor(t),4.5,Xo.getValueFor(t),Ko.getValueFor(t),ta.getValueFor(t),ea.getValueFor(t))}),Xl=l("neutral-fill-strong-rest").withDefault(t=>Ce.getValueFor(t).evaluate(t).rest),Kl=l("neutral-fill-strong-hover").withDefault(t=>Ce.getValueFor(t).evaluate(t).hover),tc=l("neutral-fill-strong-active").withDefault(t=>Ce.getValueFor(t).evaluate(t).active);l("neutral-fill-strong-focus").withDefault(t=>Ce.getValueFor(t).evaluate(t).focus);const Te=d("neutral-foreground-recipe").withDefault({evaluate:(t,e)=>bt(S.getValueFor(t),e||w.getValueFor(t),16,0,-19,-30,0)}),he=l("neutral-foreground-rest").withDefault(t=>Te.getValueFor(t).evaluate(t).rest),ec=l("neutral-foreground-hover").withDefault(t=>Te.getValueFor(t).evaluate(t).hover),rc=l("neutral-foreground-active").withDefault(t=>Te.getValueFor(t).evaluate(t).active);l("neutral-foreground-focus").withDefault(t=>Te.getValueFor(t).evaluate(t).focus);const La=d("neutral-foreground-hint-recipe").withDefault({evaluate:(t,e)=>Js(S.getValueFor(t),e||w.getValueFor(t),4.5)}),nc=l("neutral-foreground-hint").withDefault(t=>La.getValueFor(t).evaluate(t)),Le=d("neutral-stroke-recipe").withDefault({evaluate:(t,e)=>tt(S.getValueFor(t),e||w.getValueFor(t),ra.getValueFor(t),na.getValueFor(t),ia.getValueFor(t),sa.getValueFor(t))}),ar=l("neutral-stroke-rest").withDefault(t=>Le.getValueFor(t).evaluate(t).rest),Aa=l("neutral-stroke-hover").withDefault(t=>Le.getValueFor(t).evaluate(t).hover),Pa=l("neutral-stroke-active").withDefault(t=>Le.getValueFor(t).evaluate(t).active);l("neutral-stroke-focus").withDefault(t=>Le.getValueFor(t).evaluate(t).focus);const Ae=d("neutral-stroke-control-recipe").withDefault({evaluate:(t,e)=>En(S.getValueFor(t),e||w.getValueFor(t),Zn.getValueFor(t),Jn.getValueFor(t),Xn.getValueFor(t),Kn.getValueFor(t),5)}),Ba=l("neutral-stroke-control-rest").withDefault(t=>Ae.getValueFor(t).evaluate(t).rest),Oa=l("neutral-stroke-control-hover").withDefault(t=>Ae.getValueFor(t).evaluate(t).hover),Ea=l("neutral-stroke-control-active").withDefault(t=>Ae.getValueFor(t).evaluate(t).active);l("neutral-stroke-control-focus").withDefault(t=>Ae.getValueFor(t).evaluate(t).focus);const Ia=d("neutral-stroke-divider-recipe").withDefault({evaluate:(t,e)=>Ks(S.getValueFor(t),e||w.getValueFor(t),oa.getValueFor(t))}),ln=l("neutral-stroke-divider-rest").withDefault(t=>Ia.getValueFor(t).evaluate(t)),Pe=d("neutral-stroke-input-recipe").withDefault({evaluate:(t,e)=>Zs(S.getValueFor(t),e||w.getValueFor(t),Zn.getValueFor(t),Jn.getValueFor(t),Xn.getValueFor(t),Kn.getValueFor(t),20,Q.getValueFor(t)+"px")}),ic=l("neutral-stroke-input-rest").withDefault(t=>Pe.getValueFor(t).evaluate(t).rest),sc=l("neutral-stroke-input-hover").withDefault(t=>Pe.getValueFor(t).evaluate(t).hover);l("neutral-stroke-input-active").withDefault(t=>Pe.getValueFor(t).evaluate(t).active);l("neutral-stroke-input-focus").withDefault(t=>Pe.getValueFor(t).evaluate(t).focus);const Fr=d("neutral-stroke-layer-recipe").withDefault({evaluate:(t,e)=>tt(S.getValueFor(t),e||w.getValueFor(t),sn.getValueFor(t),aa.getValueFor(t),la.getValueFor(t),sn.getValueFor(t))}),Na=l("neutral-stroke-layer-rest").withDefault(t=>Fr.getValueFor(t).evaluate(t).rest);l("neutral-stroke-layer-hover").withDefault(t=>Fr.getValueFor(t).evaluate(t).hover);l("neutral-stroke-layer-active").withDefault(t=>Fr.getValueFor(t).evaluate(t).active);const Be=d("neutral-stroke-strong-recipe").withDefault({evaluate:(t,e)=>bt(S.getValueFor(t),e||w.getValueFor(t),5.5,0,ca.getValueFor(t),ua.getValueFor(t),ha.getValueFor(t))}),oc=l("neutral-stroke-strong-rest").withDefault(t=>Be.getValueFor(t).evaluate(t).rest),ac=l("neutral-stroke-strong-hover").withDefault(t=>Be.getValueFor(t).evaluate(t).hover),lc=l("neutral-stroke-strong-active").withDefault(t=>Be.getValueFor(t).evaluate(t).active);l("neutral-stroke-strong-focus").withDefault(t=>Be.getValueFor(t).evaluate(t).focus);const Ma=d("focus-stroke-outer-recipe").withDefault({evaluate:t=>to(S.getValueFor(t),w.getValueFor(t))}),xr=l("focus-stroke-outer").withDefault(t=>Ma.getValueFor(t).evaluate(t)),Ha=d("focus-stroke-inner-recipe").withDefault({evaluate:t=>eo(Sr.getValueFor(t),w.getValueFor(t),xr.getValueFor(t))}),za=l("focus-stroke-inner").withDefault(t=>Ha.getValueFor(t).evaluate(t)),Oe=d("foreground-on-accent-large-recipe").withDefault({evaluate:t=>On(at.getValueFor(t),yt.getValueFor(t),mt.getValueFor(t),me.getValueFor(t),ce.large)});l("foreground-on-accent-rest-large").withDefault(t=>Oe.getValueFor(t).evaluate(t).rest);l("foreground-on-accent-hover-large").withDefault(t=>Oe.getValueFor(t).evaluate(t,yt.getValueFor(t)).hover);l("foreground-on-accent-active-large").withDefault(t=>Oe.getValueFor(t).evaluate(t,mt.getValueFor(t)).active);l("foreground-on-accent-focus-large").withDefault(t=>Oe.getValueFor(t).evaluate(t,me.getValueFor(t)).focus);const ja=l("neutral-fill-inverse-rest-delta").withDefault(0),Ua=l("neutral-fill-inverse-hover-delta").withDefault(-3),qa=l("neutral-fill-inverse-active-delta").withDefault(7),Wa=l("neutral-fill-inverse-focus-delta").withDefault(0);function Ga(t,e,r,n,i,s){const o=ut(e),a=t.closestIndexOf(t.colorContrast(e,14)),u=a+o*Math.abs(r-n),c=o===1?r<n:o*r>o*n;let h,g;return c?(h=a,g=u):(h=u,g=a),{rest:t.get(h),hover:t.get(g),active:t.get(h+o*i),focus:t.get(h+o*s)}}const Ee=d("neutral-fill-inverse-recipe").withDefault({evaluate:(t,e)=>Ga(S.getValueFor(t),e||w.getValueFor(t),ja.getValueFor(t),Ua.getValueFor(t),qa.getValueFor(t),Wa.getValueFor(t))});l("neutral-fill-inverse-rest").withDefault(t=>Ee.getValueFor(t).evaluate(t).rest);l("neutral-fill-inverse-hover").withDefault(t=>Ee.getValueFor(t).evaluate(t).hover);l("neutral-fill-inverse-active").withDefault(t=>Ee.getValueFor(t).evaluate(t).active);l("neutral-fill-inverse-focus").withDefault(t=>Ee.getValueFor(t).evaluate(t).focus);const _a=M`
  font-family: ${Z};
  font-size: ${Hn};
  line-height: ${fo};
  font-weight: initial;
  font-variation-settings: ${go};
`,Qa=M`
  font-family: ${Z};
  font-size: ${zn};
  line-height: ${jn};
  font-weight: initial;
  font-variation-settings: ${po};
`;M`
  font-family: ${Z};
  font-size: ${Un};
  line-height: ${vo};
  font-weight: initial;
  font-variation-settings: ${bo};
`;M`
  font-family: ${Z};
  font-size: ${qn};
  line-height: ${yo};
  font-weight: initial;
  font-variation-settings: ${mo};
`;M`
  font-family: ${Z};
  font-size: ${Wn};
  line-height: ${wo};
  font-weight: initial;
  font-variation-settings: ${So};
`;M`
  font-family: ${Z};
  font-size: ${Gn};
  line-height: ${Fo};
  font-weight: initial;
  font-variation-settings: ${xo};
`;M`
  font-family: ${Z};
  font-size: ${_n};
  line-height: ${$o};
  font-weight: initial;
  font-variation-settings: ${ko};
`;M`
  font-family: ${Z};
  font-size: ${Qn};
  line-height: ${Do};
  font-weight: initial;
  font-variation-settings: ${Ro};
`;M`
  font-family: ${Z};
  font-size: ${Yn};
  line-height: ${Vo};
  font-weight: initial;
  font-variation-settings: ${Co};
`;const Ya=M`
  outline: calc(${Ht} * 1px) solid ${xr};
  outline-offset: calc(${Ht} * -1px);
`,cc=M`
  outline: calc(${Ht} * 1px) solid ${xr};
  outline-offset: calc(${Q} * 1px);
`,cn=M`(${co} + ${Nn}) * ${vt}`;function Ie(t,e,r,n){var i=arguments.length,s=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,r,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(s=(i<3?o(s):i>3?o(e,r,s):o(e,r))||s);return i>3&&s&&Object.defineProperty(e,r,s),s}const dt=A.create({name:"elevation-shadow",cssCustomPropertyName:null}).withDefault({evaluate:(t,e,r)=>{let n=.12,i=.14;e>16&&(n=.2,i=.24);const s=`0 0 2px rgba(0, 0, 0, ${n})`,o=`0 calc(${e} * 0.5px) calc((${e} * 1px)) rgba(0, 0, 0, ${i})`;return`${s}, ${o}`}}),Za=A.create("elevation-shadow-card-rest-size").withDefault(4),Ja=A.create("elevation-shadow-card-hover-size").withDefault(8),Xa=A.create("elevation-shadow-card-active-size").withDefault(0),Ka=A.create("elevation-shadow-card-focus-size").withDefault(8),tl=A.create("elevation-shadow-card-rest").withDefault(t=>dt.getValueFor(t).evaluate(t,Za.getValueFor(t)));A.create("elevation-shadow-card-hover").withDefault(t=>dt.getValueFor(t).evaluate(t,Ja.getValueFor(t)));A.create("elevation-shadow-card-active").withDefault(t=>dt.getValueFor(t).evaluate(t,Xa.getValueFor(t)));A.create("elevation-shadow-card-focus").withDefault(t=>dt.getValueFor(t).evaluate(t,Ka.getValueFor(t)));const el=A.create("elevation-shadow-tooltip-size").withDefault(16),uc=A.create("elevation-shadow-tooltip").withDefault(t=>dt.getValueFor(t).evaluate(t,el.getValueFor(t))),rl=A.create("elevation-shadow-flyout-size").withDefault(32),hc=A.create("elevation-shadow-flyout").withDefault(t=>dt.getValueFor(t).evaluate(t,rl.getValueFor(t))),nl=A.create("elevation-shadow-dialog-size").withDefault(128),dc=A.create("elevation-shadow-dialog").withDefault(t=>dt.getValueFor(t).evaluate(t,nl.getValueFor(t))),il=(t,e,r,n="[disabled]")=>P`
    ${ve("inline-flex")}
    
    :host {
      position: relative;
      box-sizing: border-box;
      ${_a}
      height: calc(${cn} * 1px);
      min-width: calc(${cn} * 1px);
      color: ${he};
      border-radius: calc(${Mn} * 1px);
      fill: currentcolor;
    }

    .control {
      border: calc(${Q} * 1px) solid transparent;
      flex-grow: 1;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 calc((10 + (${vt} * 2 * ${Nn})) * 1px);
      white-space: nowrap;
      outline: none;
      text-decoration: none;
      color: inherit;
      border-radius: inherit;
      fill: inherit;
      font-family: inherit;
    }

    .control,
    .end,
    .start {
      font: inherit;
    }

    .control.icon-only {
      padding: 0;
      line-height: 0;
    }

    .control:${lt} {
      ${Ya}
    }

    .control::-moz-focus-inner {
      border: 0;
    }

    .content {
      pointer-events: none;
    }

    .start,
    .end {
      display: flex;
      pointer-events: none;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }
  `,sl=(t,e,r,n="[disabled]")=>P`
    .control {
      background: padding-box linear-gradient(${te}, ${te}),
        border-box ${Ba};
    }

    :host(${r}:hover) .control {
      background: padding-box linear-gradient(${on}, ${on}),
        border-box ${Oa};
    }

    :host(${r}:active) .control {
      background: padding-box linear-gradient(${an}, ${an}),
        border-box ${Ea};
    }

    :host(${n}) .control {
      background: padding-box linear-gradient(${te}, ${te}),
        border-box ${ar};
    }
  `.withBehaviors(St(P`
        .control {
          background: ${f.ButtonFace};
          border-color: ${f.ButtonText};
          color: ${f.ButtonText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          forced-color-adjust: none;
          background: ${f.HighlightText};
          border-color: ${f.Highlight};
          color: ${f.Highlight};
        }

        :host(${n}) .control {
          background: transparent;
          border-color: ${f.GrayText};
          color: ${f.GrayText};
        }

        .control:${lt} {
          outline-color: ${f.CanvasText};
        }

        :host([href]) .control {
          background: transparent;
          border-color: ${f.LinkText};
          color: ${f.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${f.CanvasText};
          color: ${f.CanvasText};
        }
    `)),ol=(t,e,r,n="[disabled]")=>P`
    .control {
      background: padding-box linear-gradient(${at}, ${at}),
        border-box ${Da};
      color: ${ti};
    }

    :host(${r}:hover) .control {
      background: padding-box linear-gradient(${yt}, ${yt}),
        border-box ${Ra};
      color: ${Sa};
    }

    :host(${r}:active) .control {
      background: padding-box linear-gradient(${mt}, ${mt}),
        border-box ${Va};
      color: ${Fa};
    }

    :host(${n}) .control {
      background: ${at};
    }

    .control:${lt} {
      box-shadow: 0 0 0 calc(${Ht} * 1px) ${za} inset !important;
    }
  `.withBehaviors(St(P`
        .control {
          forced-color-adjust: none;
          background: ${f.Highlight};
          color: ${f.HighlightText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: ${f.HighlightText};
          border-color: ${f.Highlight};
          color: ${f.Highlight};
        }

        :host(${n}) .control {
          background: transparent;
          border-color: ${f.GrayText};
          color: ${f.GrayText};
        }

        .control:${lt} {
          outline-color: ${f.CanvasText};
          box-shadow: 0 0 0 calc(${Ht} * 1px) ${f.HighlightText} inset !important;
        }

        :host([href]) .control {
          background: ${f.LinkText};
          color: ${f.HighlightText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: ${f.ButtonFace};
          border-color: ${f.LinkText};
          color: ${f.LinkText};
        }
      `));const al=(t,e,r,n="[disabled]")=>P`
    :host {
      color: ${xa};
    }

    .control {
      background: ${ue};
    }

    :host(${r}:hover) .control {
      background: ${ei};
      color: ${$a};
    }

    :host(${r}:active) .control {
      background: ${ri};
      color: ${ka};
    }

    :host(${n}) .control {
      background: ${ue};
    }
  `.withBehaviors(St(P`
        :host {
          color: ${f.ButtonText};
        }

        .control {
          forced-color-adjust: none;
          background: transparent;
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: transparent;
          border-color: ${f.ButtonText};
          color: ${f.ButtonText};
        }

        :host(${n}) .control {
          background: transparent;
          color: ${f.GrayText};
        }

        .control:${lt} {
          outline-color: ${f.CanvasText};
        }

        :host([href]) .control {
          color: ${f.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${f.LinkText};
          color: ${f.LinkText};
        }
      `)),ll=(t,e,r,n="[disabled]")=>P`
    .control {
      background: transparent !important;
      border-color: ${ar};
    }

    :host(${r}:hover) .control {
      border-color: ${Aa};
    }

    :host(${r}:active) .control {
      border-color: ${Pa};
    }

    :host(${n}) .control {
      background: transparent !important;
      border-color: ${ar};
    }
  `.withBehaviors(St(P`
        .control {
          border-color: ${f.ButtonText};
          color: ${f.ButtonText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: ${f.HighlightText};
          border-color: ${f.Highlight};
          color: ${f.Highlight};
        }

        :host(${n}) .control {
          border-color: ${f.GrayText};
          color: ${f.GrayText};
        }

        .control:${lt} {
          outline-color: ${f.CanvasText};
        }

        :host([href]) .control {
          border-color: ${f.LinkText};
          color: ${f.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${f.CanvasText};
          color: ${f.CanvasText};
        }
      `)),cl=(t,e,r,n="[disabled]")=>P`
    .control {
      background: ${ue};
    }

    :host(${r}:hover) .control {
      background: ${ei};
    }

    :host(${r}:active) .control {
      background: ${ri};
    }

    :host(${n}) .control {
      background: ${ue};
    }
  `.withBehaviors(St(P`
        .control {
          forced-color-adjust: none;
          background: transparent;
          color: ${f.ButtonText};
        }

        :host(${r}:hover) .control,
        :host(${r}:active) .control {
          background: transparent;
          border-color: ${f.ButtonText};
          color: ${f.ButtonText};
        }

        :host(${n}) .control {
          background: transparent;
          color: ${f.GrayText};
        }
        
        .control:${lt} {
          outline-color: ${f.CanvasText};
        }

        :host([href]) .control {
          color: ${f.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${f.LinkText};
          color: ${f.LinkText};
        }
      `));function Ct(t,e){return new Vs("appearance",t,e)}const ul=(t,e)=>P`
    ${ve("inline-block")} :host {
      box-sizing: border-box;
      ${Qa};
    }

    .control {
      border-radius: calc(${Mn} * 1px);
      padding: calc(((${vt} * 0.5) - ${Q}) * 1px) calc((${vt} - ${Q}) * 1px);
      border: calc(${Q} * 1px) solid transparent;
    }

    :host(.lightweight) .control {
      background: transparent;
      color: ${he};
      font-weight: 600;
    }

    :host(.accent) .control {
      background: ${at};
      color: ${ti};
    }

    :host(.neutral) .control {
      background: ${Ta};
      color: ${he};
    }

    :host([circular]) .control {
      border-radius: 100px;
      min-width: calc(${jn} - calc(${vt} * 1px));
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;class ni extends zt{constructor(){super(...arguments),this.appearance="lightweight"}appearanceChanged(e,r){e!==r&&y.queueUpdate(()=>{this.classList.add(r),this.classList.remove(e)})}}Ie([p({mode:"fromView"})],ni.prototype,"appearance",void 0);const hl=ni.compose({baseName:"badge",baseClass:zt,template:os,styles:ul}),st=":not([disabled])",X="[disabled]",dl=(t,e)=>P`
    :host(${st}) .control {
      cursor: pointer;
    }

    :host(${X}) .control {
      cursor: ${Cs};
    }

    @media (forced-colors: none) {
      :host(${X}) .control {
        opacity: ${lo};
      }
    }

    ${il(t,e,st,X)}
  `.withBehaviors(Ct("neutral",sl(t,e,st,X)),Ct("accent",ol(t,e,st,X)),Ct("lightweight",al(t,e,st,X)),Ct("outline",ll(t,e,st,X)),Ct("stealth",cl(t,e,st,X)));class ii extends H{appearanceChanged(e,r){e!==r&&(this.classList.add(r),this.classList.remove(e))}connectedCallback(){super.connectedCallback(),this.appearance||(this.appearance="neutral")}defaultSlottedContentChanged(){const e=this.defaultSlottedContent.filter(r=>r.nodeType===Node.ELEMENT_NODE);e.length===1&&e[0]instanceof SVGElement?this.control.classList.add("icon-only"):this.control.classList.remove("icon-only")}}Ie([p],ii.prototype,"appearance",void 0);const fl=ii.compose({baseName:"button",baseClass:H,template:as,styles:dl,shadowOptions:{delegatesFocus:!0}}),gl=(t,e)=>P`
    ${ve("block")} :host {
      display: block;
      contain: content;
      height: var(--card-height, 100%);
      width: var(--card-width, 100%);
      box-sizing: border-box;
      background: ${w};
      color: ${he};
      border: calc(${Q} * 1px) solid ${Na};
      border-radius: calc(${uo} * 1px);
      box-shadow: ${tl};
    }

    :host {
      content-visibility: auto;
    }
  `.withBehaviors(St(P`
        :host {
          background: ${f.Canvas};
          color: ${f.CanvasText};
        }
      `));class $r extends Tn{cardFillColorChanged(e,r){if(r){const n=pt(r);n!==null&&(this.neutralPaletteSource=r,w.setValueFor(this,U.create(n.r,n.g,n.b)))}}neutralPaletteSourceChanged(e,r){if(r){const n=pt(r),i=U.create(n.r,n.g,n.b);S.setValueFor(this,Nt.create(i))}}handleChange(e,r){this.cardFillColor||w.setValueFor(this,n=>De.getValueFor(n).evaluate(n,w.getValueFor(e)).rest)}connectedCallback(){super.connectedCallback();const e=se(this);if(e){const r=k.getNotifier(e);r.subscribe(this,"fillColor"),r.subscribe(this,"neutralPalette"),this.handleChange(e,"fillColor")}}}Ie([p({attribute:"card-fill-color",mode:"fromView"})],$r.prototype,"cardFillColor",void 0);Ie([p({attribute:"neutral-palette-source",mode:"fromView"})],$r.prototype,"neutralPaletteSource",void 0);const pl=$r.compose({baseName:"card",baseClass:Tn,template:hs,styles:gl}),vl=(t,e)=>P`
    ${ve("block")} :host {
      box-sizing: content-box;
      height: 0;
      border: none;
      border-top: calc(${Q} * 1px) solid ${ln};
    }

    :host([orientation="vertical"]) {
      border: none;
      height: 100%;
      margin: 0 calc(${vt} * 1px);
      border-left: calc(${Q} * 1px) solid ${ln};
  }
  `,bl=yr.compose({baseName:"divider",template:ks,styles:vl});function yl(t){return An.getOrCreate(t).withPrefix("fluent")}/**
 * @license MIT
 * ============================================================================
 * src/data/launcherData.ts — Consumer-Friendly Content for RaggieSoft Launcher
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL TYPESCRIPT DATA GUIDE):
 *   What is this file?
 *     This TypeScript module stores all routes, application cards, update
 *     walkthrough steps, and everyday questions for `https://launcher.raggiesoft.com`.
 *
 *   Consumer-Friendly Language Rule:
 *     Every headline, description, and bullet point here is written in warm,
 *     everyday language for book readers, music listeners, and PC gamers—with
 *     zero intimidating developer or compiler jargon!
 * ============================================================================
 */const ml="https://assets.raggiesoft.com/raggiesoft-launcher/images",wl={logoSvg:`${ml}/launcher-logo.svg`},kr=[{path:"/",navLabel:"Overview",seoTitle:"RaggieSoft Launcher | Desktop App Hub for Books & Music",seoDescription:"Discover, install, open, and update RaggieSoft Book Reader, The Listening Room, Backstage, and StoreTrainer from one calm, account-free desktop home.",inMainNav:!0},{path:"/apps",navLabel:"Included Apps",seoTitle:"Desktop Apps in RaggieSoft Launcher | Books, Music & Games",seoDescription:"Explore all applications managed by RaggieSoft Launcher: Book Reader, The Listening Room, RaggieSoft Backstage, and StoreTrainer.",inMainNav:!0},{path:"/updates",navLabel:"Easy Updates & Safety",seoTitle:"One-Click Updates & Safe Uninstalls | RaggieSoft Launcher",seoDescription:"See how RaggieSoft Launcher and the built-in Software Update Wizard keep your apps current while protecting your saved books, music, and games.",inMainNav:!0},{path:"/faq",navLabel:"Questions & Tips",seoTitle:"Questions & Offline Reading Tips | RaggieSoft Launcher",seoDescription:"Plain-English answers about offline reading and listening, account-free setup, Light and Dark themes, and managing offline library space.",inMainNav:!0},{path:"/404",navLabel:"404",seoTitle:"Page Not Found | RaggieSoft Launcher",seoDescription:"We could not find a page at this address—return to RaggieSoft Launcher or explore the full RaggieSoft directory at The Uncharted Waystation.",inMainNav:!1,noindex:!0}],de=[{id:"book-reader",title:"RaggieSoft Book Reader",imprint:"Ocean View Archives & Story Crossroads",category:"reading",categoryBadge:"Books & Interactive Novels",icon:"📖",summary:"Read every Ocean View Archives novel and interactive Story Crossroads adventure offline on your computer with adjustable font sizes, warm reading themes, full-color illustrations, and one-click chapter soundtracks.",highlights:["Download complete novels with artwork for airplane, commuter, or cabin offline reading.","Customize text size, line spacing, and Daylight, Sepia, or Night reading palettes.","Jump straight into chapter songs in The Listening Room or bonus notes in Backstage without losing your page."],webUrl:"https://books.raggiesoft.com",webLabel:"Open Web Edition (books.raggiesoft.com)",secondaryUrl:"https://crossroads.raggiesoft.com",secondaryLabel:"Explore Story Crossroads"},{id:"listening-room",title:"The Listening Room",imprint:"Engine Room Records",category:"music",categoryBadge:"Music & Sing-Along Lyrics",icon:"🎧",summary:"Stream or save full Engine Room Records albums on your desktop with gapless playback, synchronized line-by-line lyrics, album liner notes, and keyboard media controls.",highlights:["Save favorite albums from The Stardust Engine, Crimson Node, Firelight, and more for offline listening.","Watch lyrics highlight in time with the vocals—or jump to any verse by clicking a line.","Plays seamlessly alongside RaggieSoft Book Reader when exploring soundtrack-paired chapters."],webUrl:"https://music.raggiesoft.com",webLabel:"Open Web Edition (music.raggiesoft.com)",secondaryUrl:"https://engineroom.raggiesoft.com",secondaryLabel:"Meet All 7 Bands"},{id:"backstage",title:"RaggieSoft Backstage",imprint:"RaggieSoft Media Bonus Features",category:"reading",categoryBadge:"Behind the Scenes & Story Arcs",icon:"🎬",summary:"Like the bonus-features disc inside a favorite box set: explore behind-the-scenes essays, character correspondence, curated multi-book Story Arcs, and standalone alternate-path stories.",highlights:["Browse spoiler-marked commentary and production stories organized by book and musical era.","Follow guided Story Arcs across interconnected novels in chronological order.","Opens instantly when clicking a Bonus Feature card inside RaggieSoft Book Reader."],webUrl:"https://backstage.raggiesoft.com",webLabel:"Open Web Edition (backstage.raggiesoft.com)"},{id:"storetrainer",title:"RaggieSoft StoreTrainer 2.0",imprint:"PC Game & Trainer Organizer",category:"games",categoryBadge:"PC Games & Trainers",icon:"🕹️",summary:"Keep your classic and modern PC games paired with their companion trainers, downloaded trainer ZIP archives, pre-launch save-game backups, and floating shortcut key cheat cards.",highlights:['Launch with your chosen trainer—or click "Launch Game Only (No Trainer)" anytime for standard play.',"Extract trainer ZIP files straight into your game folder, view classic ASCII info files, and pop out an Always-On-Top Cheat Card.","Includes a 3-step StoreFile Upgrade Wizard that imports classic StoreTrainer 1.0 & 1.1 profiles while leaving your originals untouched."],webUrl:"https://storetrainer.raggiesoft.com",webLabel:"Visit StoreTrainer Portal",secondaryUrl:"https://github.com/raggiesoft/storetrainer",secondaryLabel:"View Open-Source Archive"},{id:"storetrainer-classic",title:"StoreTrainer Classic (v1.1 Retro Edition)",imprint:"Vintage Windows 95 – 2000 Preservation",category:"games",categoryBadge:"Retro PC Preservation",icon:"💾",summary:"Built for collectors running real vintage Windows 95, Windows 98, or Windows 2000 gaming PCs—and automatically recognized by RaggieSoft Launcher when installed on modern PCs too.",highlights:["Preserves the lightweight classic design Michael originally hand-built inside Windows 2000.","Saves classic My StoreFiles profiles that remain 100% compatible between v1.0 and v1.1.","Automatically disables internet update checks when installed on offline vintage PCs."],webUrl:"https://storetrainer.raggiesoft.com/installer",webLabel:"Explore Retro Edition"}],Sl=[{icon:"✨",title:"Zero Sign-Ins, Zero Background Bloat",body:"RaggieSoft Launcher only runs when you open it—never sitting in your system tray, never asking for an email account, and never interrupting your day with pop-ups."},{icon:"⚡",title:"Express Setup or Custom Control",body:"Every RaggieSoft setup wizard lets you pick one-click Express Setup for sensible defaults, or Custom Setup to choose your exact folder, shortcuts, and file preferences."},{icon:"🛡️",title:"Your Offline Library Always Stays Safe",body:"Updating or removing an app never deletes your downloaded books, music albums, reading preferences, or saved game profiles unless you explicitly check the box to clear them."}],Fl=[{icon:"🔄",title:"Shared Software Update Wizard",body:'Click "Check for Updates" inside RaggieSoft Launcher—or inside the About window of any RaggieSoft app—to check all of your installed RaggieSoft apps in one step.'},{icon:"🪄",title:"Step-by-Step or One-Click Quiet Mode",body:"Prefer seeing every setup screen? Leave Quick Install unchecked. Prefer updating in a single click? Turn on Quick Install inside Launcher for smooth, hands-free updates."},{icon:"👤",title:"Works With or Without Administrator Access",body:'Install for everyone on a family PC, or choose "Install for me only" to set up RaggieSoft apps inside your personal account folder with zero administrator password prompts.'}],xl=[{question:"Do I need to create an account or stay connected to the internet?",answer:"Never! None of our desktop apps or websites use accounts, subscriptions, or sign-in walls. Once you download a book in Book Reader or an album in The Listening Room, you can read and listen completely offline."},{question:"Can I still read books and listen to music in my web browser without installing anything?",answer:"Yes! Every RaggieSoft desktop app has a full-featured web twin—including books.raggiesoft.com, music.raggiesoft.com, and backstage.raggiesoft.com—that works immediately on phones, tablets, Macs, Linux PCs, and Windows computers."},{question:"What happens to my downloaded books, music, and StoreTrainer profiles when an app updates?",answer:"They stay 100% untouched. Even if you uninstall an app, your offline downloads and personal font/theme preferences are kept safe by default so you never lose your spot."},{question:"How do I check how much disk space my offline books and albums are using?",answer:"Look at the bottom bar of RaggieSoft Launcher: it shows the exact size of your downloaded offline library alongside one-click buttons to open the folder or clear cached downloads whenever you want."},{question:"Where can I see the full map of every RaggieSoft website and story world?",answer:"Visit The Uncharted Waystation (waystation.raggiesoft.com) for our complete searchable directory of every RaggieSoft site, or visit Jessica’s Study (jessica.raggiesoft.com) to read the personal story behind why each project was created!"}];/**
 * @license MIT
 * ============================================================================
 * src/entry-server.ts — Isomorphic Route HTML Renderer for RaggieSoft Launcher
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL STATIC SSG RENDERER GUIDE):
 *   What does this module do?
 *     Both `scripts/prerender.mjs` (at build time on Node.js) and `entry-client.ts`
 *     (when clicking between `/`, `/apps`, `/updates`, and `/faq` in the browser)
 *     call `renderRoute(pathname)` here!
 *
 *   How Fluent UI Web Components (`<fluent-card>`, `<fluent-badge>`, `<fluent-divider>`)
 *   work with Static Pre-Rendering:
 *     - Build Time: `renderRoute()` emits clean semantic HTML5 (`<header>`, `<main>`,
 *       `<section>`, `<details>`) wrapped inside `<fluent-card class="fl-card">`
 *       and `<fluent-divider>` custom element tags so search engines, screen readers,
 *       and no-JS browsers get 100% of the content immediately!
 *     - Browser Time: `entry-client.ts` registers `@fluentui/web-components` with
 *       the browser's `CustomElementRegistry`, upgrading those `<fluent-*>` elements
 *       with Fluent Design System tokens and keyboard behaviors seamlessly!
 * ============================================================================
 */function F(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function si(t){if(!t||t==="/"||t==="/index.html")return"/";const e=t.replace(/\.html$/i,"").replace(/\/+$/,"");return kr.some(r=>r.path===e)?e:"/404"}function Dr(t="all",e=""){const r=e.trim().toLowerCase(),n=de.filter(i=>t==="all"||i.category===t?r?i.title.toLowerCase().includes(r)||i.imprint.toLowerCase().includes(r)||i.summary.toLowerCase().includes(r):!0:!1);return n.length===0?`
      <fluent-card class="fl-card">
        <div>
          <h3>No desktop apps matched that search</h3>
          <p>Clear the search filter to view all ${de.length} applications managed by RaggieSoft Launcher.</p>
        </div>
      </fluent-card>`:`
    <div class="fl-grid-2">
      ${n.map(i=>`
        <fluent-card class="fl-card" data-app-category="${F(i.category)}">
          <div>
            <span class="fl-status-pill">${F(i.categoryBadge)}</span>
            <h3><span aria-hidden="true">${F(i.icon)} </span>${F(i.title)}</h3>
            <p><strong>${F(i.imprint)}.</strong> ${F(i.summary)}</p>
            <ul class="fl-feature-list">
              ${i.highlights.map(s=>`<li>${F(s)}</li>`).join("")}
            </ul>
          </div>
          <div class="fl-btn-row">
            <a href="${F(i.webUrl)}" class="fl-btn-primary">${F(i.webLabel)} →</a>
            ${i.secondaryUrl&&i.secondaryLabel?`<a href="${F(i.secondaryUrl)}" class="fl-btn-secondary">${F(i.secondaryLabel)}</a>`:""}
          </div>
        </fluent-card>`).join(`
`)}
    </div>`}function $l(){return`
    <section class="fl-hero" aria-labelledby="hero-heading">
      <div>
        <span class="fl-eyebrow"><span aria-hidden="true">🚀</span> All-In-One RaggieSoft Desktop Home</span>
        <h1 id="hero-heading">One Calm Desktop Hub for Every RaggieSoft Book, Album &amp; Game.</h1>
        <p class="fl-lead">
          <strong>RaggieSoft Launcher</strong> brings <em>Book Reader</em>, <em>The Listening Room</em>,
          <em>RaggieSoft Backstage</em>, and <em>StoreTrainer</em> together in one clean, friendly window—so you can
          install, open, update, and manage offline downloads without creating an account or cluttering your computer.
        </p>
        <div class="fl-btn-row">
          <a href="/apps" data-local-nav="true" class="fl-btn-primary">Explore Included Desktop Apps →</a>
          <a href="/updates" data-local-nav="true" class="fl-btn-secondary">How One-Click Updates Work</a>
          <a href="https://jessica.raggiesoft.com" class="fl-btn-secondary">🛡️ Read Jessica’s Story Behind Our Apps</a>
        </div>
      </div>

      <div class="fl-window-preview" role="img" aria-label="Preview of RaggieSoft Launcher showing Book Reader, The Listening Room, Backstage, and StoreTrainer">
        <div class="fl-window-titlebar">
          <span>🚀 RaggieSoft Launcher — Installed &amp; Available Apps</span>
          <span class="fl-window-dots" aria-hidden="true">_ □ ×</span>
        </div>
        <div class="fl-window-body">
          ${de.slice(0,4).map(t=>`
            <div class="fl-mini-app-row">
              <div>
                <div class="fl-mini-app-title"><span aria-hidden="true">${F(t.icon)} </span>${F(t.title)}</div>
                <div class="fl-mini-app-sub">${F(t.imprint)}</div>
              </div>
              <span class="fl-status-pill">Ready to Open</span>
            </div>`).join("")}
        </div>
      </div>
    </section>

    <section class="fl-section" aria-labelledby="pillars-heading">
      <div class="fl-section-head">
        <h2 id="pillars-heading">Designed for Readers, Listeners &amp; Everyday Comfort</h2>
        <p>Everything you need to enjoy RaggieSoft offline—and nothing getting in your way.</p>
      </div>
      <div class="fl-grid-3">
        ${Sl.map(t=>`
          <fluent-card class="fl-card">
            <div>
              <h3><span aria-hidden="true">${F(t.icon)} </span>${F(t.title)}</h3>
              <p>${F(t.body)}</p>
            </div>
          </fluent-card>`).join(`
`)}
      </div>
    </section>

    <fluent-divider role="separator"></fluent-divider>

    <section class="fl-section" style="margin-top: 2rem;" aria-labelledby="featured-apps-heading">
      <div class="fl-section-head">
        <h2 id="featured-apps-heading">Applications Managed by RaggieSoft Launcher</h2>
        <p>Install only the ones you want—or enjoy their instant web editions right in your browser anytime.</p>
      </div>
      ${Dr()}
    </section>`}function kl(){return`
    <section class="fl-section" aria-labelledby="apps-page-heading">
      <div class="fl-section-head">
        <span class="fl-eyebrow"><span aria-hidden="true">📦</span> 5 Desktop Applications • Web Companions Included</span>
        <h1 id="apps-page-heading" style="margin: 0 0 0.4rem; font-size: clamp(1.75rem, 3vw, 2.3rem);">Every RaggieSoft Desktop Application in One Place</h1>
        <p>Filter by Books, Music, or PC Games below to explore what each RaggieSoft desktop app does.</p>
      </div>

      <div class="fl-filter-panel" role="region" aria-label="Filter RaggieSoft desktop applications">
        <div class="fl-pill-row" role="group" aria-label="Filter by category">
          <button type="button" class="fl-filter-pill" data-cat="all" aria-pressed="true">All Apps (${de.length})</button>
          <button type="button" class="fl-filter-pill" data-cat="reading" aria-pressed="false">📖 Books &amp; Bonus Features</button>
          <button type="button" class="fl-filter-pill" data-cat="music" aria-pressed="false">🎧 Music &amp; Lyrics</button>
          <button type="button" class="fl-filter-pill" data-cat="games" aria-pressed="false">🕹️ PC Games &amp; Retro</button>
        </div>
        <div>
          <label for="fl-app-search" class="fl-skip-link">Search RaggieSoft desktop apps</label>
          <input id="fl-app-search" type="search" class="fl-search-input" placeholder="Search apps (e.g. lyrics, offline, trainers)..." aria-label="Search RaggieSoft desktop apps" />
        </div>
      </div>

      <div id="fl-apps-results">
        ${Dr()}
      </div>
    </section>`}function Dl(){return`
    <section class="fl-section" aria-labelledby="updates-heading">
      <div class="fl-section-head">
        <span class="fl-eyebrow"><span aria-hidden="true">🔄</span> Built-In Software Update Wizard</span>
        <h1 id="updates-heading" style="margin: 0 0 0.4rem; font-size: clamp(1.75rem, 3vw, 2.3rem);">Effortless Updates That Respect Your Computer &amp; Files</h1>
        <p>Whether you install one RaggieSoft app or the whole family, keeping up with new features is always on your schedule.</p>
      </div>

      <div class="fl-grid-3" style="margin-bottom: 2rem;">
        ${Fl.map(t=>`
          <fluent-card class="fl-card">
            <div>
              <h3><span aria-hidden="true">${F(t.icon)} </span>${F(t.title)}</h3>
              <p>${F(t.body)}</p>
            </div>
          </fluent-card>`).join(`
`)}
      </div>

      <fluent-card class="fl-card">
        <div>
          <h2>Express Setup vs. Custom Setup — Your Choice Every Time</h2>
          <p>
            Inspired by classic desktop setup wizards that respected power users while staying effortless for newcomers,
            every RaggieSoft installer offers two clear paths right after the open-culture license screen:
          </p>
          <ul class="fl-feature-list">
            <li><strong>Express Setup (Recommended):</strong> Skips straight to installing with standard Start Menu shortcuts and default settings in a single click.</li>
            <li><strong>Custom Setup:</strong> Lets you pick a custom installation folder, choose Desktop &amp; Start Menu shortcuts, pre-load offline books, or customize double-click behavior in StoreTrainer.</li>
            <li><strong>Thoughtful Uninstaller:</strong> Uninstalling RaggieSoft Launcher even shows a live checklist of your other installed RaggieSoft apps—with every data-removal box unchecked by default so you never lose books, music, or game profiles by mistake!</li>
          </ul>
        </div>
        <div class="fl-btn-row">
          <a href="/faq" data-local-nav="true" class="fl-btn-primary">Read Common Questions &amp; Tips →</a>
          <a href="https://waystation.raggiesoft.com/realms" class="fl-btn-secondary">🔮 Browse Full RaggieSoft Directory</a>
        </div>
      </fluent-card>
    </section>`}function Rl(){return`
    <section class="fl-section" aria-labelledby="faq-heading">
      <div class="fl-section-head">
        <span class="fl-eyebrow"><span aria-hidden="true">💡</span> Helpful Everyday Answers</span>
        <h1 id="faq-heading" style="margin: 0 0 0.4rem; font-size: clamp(1.75rem, 3vw, 2.3rem);">Questions &amp; Offline Tips</h1>
        <p>Quick plain-English answers about using RaggieSoft Launcher and its companion apps.</p>
      </div>

      <div>
        ${xl.map((t,e)=>`
          <details class="fl-faq-item"${e===0?" open":""}>
            <summary>${F(t.question)}</summary>
            <p>${F(t.answer)}</p>
          </details>`).join(`
`)}
      </div>
    </section>`}function Vl(){return`
    <section class="fl-section" aria-labelledby="not-found-heading">
      <fluent-card class="fl-card">
        <div>
          <span class="fl-eyebrow">404 • Address Not Found</span>
          <h1 id="not-found-heading" style="margin: 0.35rem 0 0.6rem;">That Page Isn’t in RaggieSoft Launcher</h1>
          <p>
            We couldn’t find a page at this web address. Head back to the RaggieSoft Launcher overview below,
            or visit Nolan &amp; Gwen at <strong>The Uncharted Waystation</strong> to search every corner of RaggieSoft!
          </p>
        </div>
        <div class="fl-btn-row">
          <a href="/" data-local-nav="true" class="fl-btn-primary">← Back to RaggieSoft Launcher Home</a>
          <a href="https://waystation.raggiesoft.com" class="fl-btn-secondary">🔮 Open Global RaggieSoft Directory</a>
        </div>
      </fluent-card>
    </section>`}function Cl(t){const e=si(t),r=kr.filter(s=>s.inMainNav).map(s=>{const o=e===s.path;return`<li><a href="${F(s.path)}" data-local-nav="true" class="fl-nav-link"${o?' aria-current="page"':""}>${F(s.navLabel)}</a></li>`}).join(`
              `),n=e==="/"?$l():e==="/apps"?kl():e==="/updates"?Dl():e==="/faq"?Rl():Vl();return{html:`
    <header class="fl-header">
      <div class="fl-container fl-header-inner">
        <a href="/" data-local-nav="true" class="fl-brand">
          <img src="${F(wl.logoSvg)}" alt="" width="40" height="40" class="fl-brand-icon" />
          <span>
            <span class="fl-brand-title">RaggieSoft Launcher</span>
            <span class="fl-brand-sub">Desktop App Hub for Books, Music &amp; Games</span>
          </span>
        </a>

        <button
          type="button"
          class="rs-mobile-header-toggle"
          data-rs-mobile-toggle
          data-open-label="Open menu"
          data-close-label="Close menu"
          aria-expanded="false"
          aria-controls="header-navigation-panel"
          aria-label="Open menu"
        >
          <svg class="rs-icon-bars" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg class="rs-icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true" focusable="false">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div id="header-navigation-panel" class="fl-nav-cluster" data-rs-collapsible="true">
          <nav aria-label="RaggieSoft Launcher Navigation">
            <ul class="fl-nav-list">
              ${r}
            </ul>
          </nav>
          <button type="button" id="fl-theme-toggle" class="fl-theme-btn" aria-label="Switch between light and dark color scheme">
            <span id="fl-theme-label">🌓 Theme</span>
          </button>
        </div>
      </div>
    </header>

    <main id="main-content" class="fl-main" tabindex="-1">
      <div class="fl-container">
        ${n}
      </div>
    </main>

    <footer class="fl-footer">
      <div class="fl-container">
        <div class="fl-btn-row" style="justify-content: space-between;">
          <div>
            <strong>RaggieSoft Launcher</strong> • Companion web portals:
            <a href="https://raggiesoft.com">RaggieSoft Home</a> •
            <a href="https://waystation.raggiesoft.com/realms">Global Directory (Waystation)</a> •
            <a href="https://jessica.raggiesoft.com">Project Stories (Jessica)</a> •
            <a href="https://michaelpragsdale.com">Creator Portfolio</a>
          </div>
          <div>
            Code: <a href="https://opensource.org/licenses/MIT">MIT</a> •
            Creative Works: <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
          </div>
        </div>

        <div class="fl-disclaimer" role="note" aria-label="Fictitious Persons and Entities Disclaimer">
          <strong>Work of Fiction Disclaimer:</strong> While <strong>RaggieSoft Launcher</strong> and its companion desktop applications are real software tools created by <strong>Michael P. Ragsdale</strong>, all narrative characters, bands, biographies, universities (including CPI, VDU, The Forgers, and The Crucible), corporations (including OmniCorp, Apex Records, Prairie Coachworks, and Sainte-Claire), transit agencies (BRT, CVTA), in-universe legal filings, and any entity with “LLC”, “Trust”, or “Holdings” in its name across RaggieSoft’s creative works are works of fiction. Any resemblance to actual persons, living or dead, or real-world entities is purely coincidental.
        </div>
      </div>
    </footer>`,normalizedPath:e}}/**
 * @license MIT
 * ============================================================================
 * src/entry-client.ts — Fluent UI Web Components Registration & Client Router
 * Property: https://launcher.raggiesoft.com (raggiesoft-launcher)
 * ============================================================================
 * PLAIN-ENGLISH OVERVIEW (100-LEVEL FLUENT WEB COMPONENTS GUIDE):
 *   What happens when this script loads in a visitor's browser?
 *     1. Registers Microsoft's official Fluent UI Web Components (`<fluent-card>`,
 *        `<fluent-button>`, `<fluent-badge>`, `<fluent-divider>`) powered by
 *        `@microsoft/fast-element`.
 *     2. Synchronizes Fluent's `baseLayerLuminance` design token (`LightMode` vs.
 *        `DarkMode`) with the operating system's `prefers-color-scheme` and our
 *        two-state `<meta name="color-scheme">` theme toggle!
 *     3. Wires instant client-side navigation between `/`, `/apps`, `/updates`,
 *        and `/faq` plus live category & keyword filtering on `/apps`.
 * ============================================================================
 */yl().register(pl(),fl(),hl(),bl());function oi(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function ai(){try{const t=localStorage.getItem("color-scheme");if(t==="light"||t==="dark")return t}catch{}return oi()}function Ne(){const t=ai();ht.setValueFor(document.body,t==="dark"?Mt.DarkMode:Mt.LightMode);const e=document.getElementById("fl-theme-label");if(e){let r=null;try{r=localStorage.getItem("color-scheme")}catch{}r==="light"||r==="dark"?e.textContent=t==="dark"?"🌙 Dark":"☀️ Light":e.textContent=t==="dark"?"🌓 System (Dark)":"🌓 System (Light)"}}function Tl(){const t=document.querySelector('meta[name="color-scheme"]');if(!t)return;const r=ai()==="dark"?"light":"dark",n=oi();try{r===n?(localStorage.removeItem("color-scheme"),t.content="light dark"):(localStorage.setItem("color-scheme",r),t.content=r)}catch{t.content=r}Ne()}let lr="all",cr="";function li(){Ne(),document.getElementById("fl-theme-toggle")?.addEventListener("click",Tl);const e=document.getElementById("fl-apps-results"),r=document.getElementById("fl-app-search"),n=document.querySelectorAll(".fl-filter-pill[data-cat]");if(e){const i=()=>{e.innerHTML=Dr(lr,cr)};n.forEach(s=>{s.addEventListener("click",()=>{lr=s.getAttribute("data-cat")||"all",n.forEach(o=>o.setAttribute("aria-pressed",o===s?"true":"false")),i()})}),r?.addEventListener("input",()=>{cr=r.value,i()})}}function ci(t,e){const r=document.getElementById("launcher-app");if(!r)return;lr="all",cr="";const{html:n,normalizedPath:i}=Cl(t);r.innerHTML=n,e&&window.history.pushState({},"",i);const s=kr.find(u=>u.path===i);s&&(document.title=s.seoTitle),li(),window.initRaggieSoftNetworkMenu?.(),document.getElementById("main-content")?.focus()}document.addEventListener("click",t=>{if(t.defaultPrevented||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.button!==0)return;const r=t.target?.closest('a[data-local-nav="true"]');if(!r)return;const n=r.getAttribute("href");!n||!n.startsWith("/")||(t.preventDefault(),ci(n,!0))});window.addEventListener("popstate",()=>{ci(si(window.location.pathname),!1)});window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Ne);window.addEventListener("storage",t=>{if(t.key==="color-scheme"){const e=document.querySelector('meta[name="color-scheme"]');e&&(e.content=t.newValue==="light"||t.newValue==="dark"?t.newValue:"light dark"),Ne()}});li();

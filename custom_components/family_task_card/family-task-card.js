function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??$)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,z=`<${P}>`,T=document,O=()=>T.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,M="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,R=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),V=new WeakMap,q=T.createTreeWalker(T,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=L;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===L?"!--"===l[1]?r=D:void 0!==l[1]?r=H:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=R):void 0!==l[3]&&(r=R):r===R?">"===l[0]?(r=o??L,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?R:'"'===l[3]?B:j):r===B||r===j?r=R:r===D||r===H?r=L:(r=R,o=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===L?s+z:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+C+h):s+C+(-2===c?e:h)}return[Z(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Y{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=Y.createElement(l,s),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=q.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[n++],s=i.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),q.nextNode(),a.push({type:2,index:++o});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=N(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=J(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);q.currentNode=i;let o=q.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=q.nextNode(),n++)}return q.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Y.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=K}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=J(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=J(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),n||=!N(a)||a!==this._$AH[r],a===K?t=K:t!==K&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??K)===W)return;const s=this._$AH,i=t===K&&s!==K||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==K&&(s===K||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=k.litHtmlPolyfillSupport;nt?.(Y,X),(k.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(O(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},dt=(t=ct,e,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return ht({...t,state:!0,attribute:!1})}const ut="Family Task Card",gt=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],ft=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function mt(t,e){return t.color||gt[e%gt.length]}function _t(t){return t.lists?(Array.isArray(t.lists)?t.lists:[t.lists]).filter(Boolean):[]}function vt(t){for(const[e,s]of ft)if(e.test(t))return s;return"📝"}function bt(t){if(!t.due)return!1;const e=new Date(t.due.length<=10?`${t.due}T23:59:59`:t.due);return!isNaN(e.getTime())&&e.getTime()<Date.now()}function $t(t,e,s){if(t.lists){if(!(Array.isArray(t.lists)?t.lists:[t.lists]).includes(s))return!1}if(t.match)try{if(!new RegExp(t.match,"i").test(e))return!1}catch{return!1}return!0}function yt(t,e){let s=!1;if(e)if(void 0!==t.state){s=(Array.isArray(t.state)?t.state:[t.state]).includes(e.state)}else if(void 0!==t.above||void 0!==t.below){const i=Number(e.state);isNaN(i)||(s=!0,void 0===t.above||i>t.above||(s=!1),void 0===t.below||i<t.below||(s=!1))}else s=!["off","unavailable","unknown","","none","false"].includes(e.state.toLowerCase());return t.invert?!s:s}class xt extends at{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1,this._activeKid=0,this._burst=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return Pt}),document.createElement("family-task-card-editor")}static getStubConfig(t){const e=t?Object.keys(t.states).find(t=>t.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:"Familien-Aufgaben",persons:[{name:"Person 1",lists:e?[e]:[]}]}}setConfig(t){if(!t||!Array.isArray(t.persons))throw new Error('"persons" muss eine Liste sein (mind. eine Person).');this._config={points_per_task:10,...t}}getCardSize(){const t=this._config?.persons?.length??1;return 2+Math.min(t,4)}willUpdate(t){(t.has("hass")||t.has("_config"))&&this.hass&&this._config&&this._refresh()}async _refresh(){if(!this.hass||!this._config||this._loading)return;const t=new Set;for(const e of this._config.persons)for(const s of _t(e))t.add(s);const e=[];for(const s of t){const t=this.hass.states[s],i=t?`${t.state}|${t.last_changed}`:"missing";this._sig[s]!==i&&(this._sig[s]=i,e.push(s))}if(0!==e.length){this._loading=!0;try{const t={...this._items};await Promise.all(e.map(async e=>{try{const s=await this.hass.callWS({type:"todo/item/list",entity_id:e});t[e]=s?.items??[]}catch(s){t[e]=[]}})),this._items=t}finally{this._loading=!1}}}_shoppingSet(){const t=this._config?.shopping_lists,e=t?Array.isArray(t)?t:[t]:[];return new Set(e.filter(Boolean))}_listName(t){return this.hass?.states[t]?.attributes?.friendly_name||"Einkauf"}_bringLink(){return this._config?.bring_deeplink||"https://web.getbring.com"}_personView(t){const e=this._config,s=e.points_per_task??10,i=e.shopping_points??s,o=this._shoppingSet(),n=[],r=[],a=[];let l=0;for(const e of _t(t)){const t=(this._items[e]??[]).map(t=>({entity:e,item:t}));if(o.has(e)){const s=t.filter(t=>"completed"!==t.item.status),o=t.filter(t=>"completed"===t.item.status);s.length>0?a.push({entity:e,name:this._listName(e),open:s}):o.length>0&&(l+=i)}else for(const e of t)("completed"===e.item.status?r:n).push(e)}const c=this._decorate(n);return l+=r.length*s,{tasksOpen:c,tasksDone:r,shopOpen:a,earned:l,openCount:c.length+a.length}}_decorate(t){const e=this._config?.context_rules??[],s=!1!==this._config?.highlight_overdue,i=[];for(const o of t){let t,n=!1,r="none";for(const s of e)if($t(s,o.item.summary,o.entity)&&yt(s,this.hass?.states[s.entity])){if("hide"===s.effect){n=!0;break}"urgent"===s.effect?(r="urgent",t=s.label??t):"highlight"===s.effect&&"urgent"!==r&&(r="highlight",t=t??s.label)}n||(s&&bt(o.item)&&(r="urgent",t=t??"Überfällig"),i.push({...o,flag:r,label:t}))}const o=t=>"urgent"===t?0:"highlight"===t?1:2;return i.map((t,e)=>({d:t,i:e})).sort((t,e)=>o(t.d.flag)-o(e.d.flag)||t.i-e.i).map(({d:t})=>t)}async _completeShopping(t){await Promise.all(t.open.map(t=>this._toggle(t.entity,t.item)))}_personName(t,e){return t.name||(t.person?this.hass?.states[t.person]?.attributes?.friendly_name:"")||`Person ${e+1}`}async _toggle(t,e){if(!this.hass)return;const s="completed"===e.status?"needs_action":"completed";this._items={...this._items,[t]:(this._items[t]??[]).map(t=>t.uid===e.uid?{...t,status:s}:t)};try{await this.hass.callService("todo","update_item",{entity_id:t,item:e.uid,status:s})}catch(e){this._sig[t]="",this._refresh()}}render(){if(!this._config)return K;const t=this._config;if(t.kid_mode&&t.persons.length>0)return this._renderKid();let e=0;const s=t.persons.map((t,s)=>{const i=this._personView(t);return e+=i.earned,{p:t,idx:s,view:i}});return I`
      <ha-card>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${t.title||ut}</div>
            <div class="sub">Familien-Aufgaben</div>
          </div>
          ${this._goalBar(e)}
        </div>

        <div class="board">${s.map(t=>this._column(t.p,t.idx,t.view))}</div>
      </ha-card>
    `}_renderKid(){const t=this._config,e=t.persons,s=Math.min(this._activeKid,e.length-1),i=e[s],o=mt(i,s),n=this._personName(i,s),r=this._personView(i),a=r.earned,l=r.openCount,c=i.goal??t.goal,d=c&&c>0?Math.min(100,Math.round(a/c*100)):0,h=0===l;return I`
      <ha-card class="kid" style="--pc:${o}">
        ${e.length>1?I`<div class="kid-people">
                ${e.map((t,e)=>this._kidAvatar(t,e,e===s))}
              </div>`:K}

        <div class="kid-hero">
          ${this._kidAvatar(i,s,!1,!0)}
          <div class="kid-hero-text">
            <div class="kid-name">${n}</div>
            <div class="kid-stars">
              ⭐ ${a}${l?I` · ${l} offen`:K}
            </div>
          </div>
        </div>

        ${c&&c>0?I`<div class="kid-bar"><div class="kid-fill" style="width:${d}%"></div></div>`:K}

        <div class="kid-tasks">
          ${h?I`<div class="kid-alldone">
                  🎉
                  <div>Alles geschafft!</div>
                </div>`:I`${r.shopOpen.map(t=>this._kidShopping(t,o))}
                ${r.tasksOpen.map(t=>this._kidTask(t,o))}`}
        </div>

        ${this._burst?I`<div class="burst">⭐</div>`:K}
      </ha-card>
    `}_kidAvatar(t,e,s,i=!1){const o=mt(t,e),n=this._personName(t,e),r=t.person?this.hass?.states[t.person]:void 0,a=r?.attributes?.entity_picture,l=n.slice(0,2).toUpperCase(),c=`kid-av ${i?"big":""} ${s?"active":""}`,d=a?`background-image:url('${a}');box-shadow:0 0 0 3px ${o}`:`background:${o}`,h=a?K:I`<span>${l}</span>`;return i?I`<div class="${c}" style="${d}">${h}</div>`:I`<button
          class="${c}"
          style="${d}"
          title=${n}
          @click=${()=>this._activeKid=e}
        >
          ${h}
        </button>`}_kidTask(t,e){const{entity:s,item:i,flag:o,label:n}=t,r="urgent"===o?"⚠️":vt(i.summary);return I`
      <button
        class="kid-task ${o}"
        style="--pc:${e}"
        @click=${()=>this._kidComplete(s,i)}
      >
        <span class="kid-emoji">${r}</span>
        <span class="kid-task-title">
          ${i.summary}${n?I`<span class="kid-sub">${n}</span>`:K}
        </span>
        <span class="kid-check">◯</span>
      </button>
    `}_kidShopping(t,e){return I`
      <button
        class="kid-task"
        style="--pc:${e}"
        @click=${()=>this._kidCompleteShopping(t)}
      >
        <span class="kid-emoji">🛒</span>
        <span class="kid-task-title">
          ${t.name}
          <span class="kid-sub">${t.open.length} Artikel</span>
        </span>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          @click=${t=>t.stopPropagation()}
        >
          Öffnen
        </a>
      </button>
    `}_celebrate(){this._burst=!0,this._burstTimer&&clearTimeout(this._burstTimer),this._burstTimer=window.setTimeout(()=>{this._burst=!1},900)}async _kidComplete(t,e){this._celebrate(),await this._toggle(t,e)}async _kidCompleteShopping(t){this._celebrate(),await this._completeShopping(t)}disconnectedCallback(){super.disconnectedCallback(),this._burstTimer&&clearTimeout(this._burstTimer)}_goalBar(t){const e=this._config?.goal;if(!e||e<=0)return I`<div class="fam-pts">⭐ ${t}</div>`;const s=Math.max(0,Math.min(100,Math.round(t/e*100)));return I`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${t}</span><span class="goal-target">Ziel ${e}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${s}%"></div></div>
      </div>
    `}_column(t,e,s){const i=mt(t,e),o=this._personName(t,e),n=t.person?this.hass?.states[t.person]:void 0,r=n?.attributes?.entity_picture,a=o.slice(0,2).toUpperCase(),l=this._config?.show_completed,c=0===s.openCount&&(!l||0===s.tasksDone.length);return I`
      <div class="col" style="--pc:${i}">
        <div class="col-head">
          ${r?I`<div
                  class="avatar"
                  style="background-image:url('${r}');box-shadow:0 0 0 2px ${i}55"
                ></div>`:I`<div class="avatar initials" style="background:${i}">${a}</div>`}
          <div class="col-meta">
            <div class="pname">${o}</div>
            <div class="pstatus">${s.openCount} offen · ⭐ ${s.earned}</div>
          </div>
        </div>

        <div class="tiles">
          ${c?I`<div class="empty">Alles erledigt 🎉</div>`:K}
          ${s.shopOpen.map(t=>this._shoppingTile(t,i))}
          ${s.tasksOpen.map(t=>this._tile(t,i,!1,t.flag,t.label))}
          ${l?s.tasksDone.map(t=>this._tile(t,i,!0)):K}
        </div>
      </div>
    `}_shoppingTile(t,e){const s=t.open.length;return I`
      <div
        class="tile shopping"
        style="--pc:${e}"
        role="button"
        tabindex="0"
        @click=${()=>this._completeShopping(t)}
        @keydown=${e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._completeShopping(t))}}
      >
        <div class="check"></div>
        <div class="tile-emoji">🛒</div>
        <div class="tile-text">
          <div class="tile-title">${t.name}</div>
          <div class="tile-due">${s} Artikel</div>
        </div>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          title="In Bring! öffnen"
          @click=${t=>t.stopPropagation()}
        >
          Öffnen
        </a>
      </div>
    `}_tile(t,e,s,i="none",o){const{entity:n,item:r}=t,a="urgent"===i?"⚠️":vt(r.summary);return I`
      <div
        class="tile ${s?"done":i}"
        style="--pc:${e}"
        role="button"
        tabindex="0"
        @click=${()=>this._toggle(n,r)}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(n,r))}}
      >
        <div class="check">${s?"✓":""}</div>
        <div class="tile-emoji">${a}</div>
        <div class="tile-text">
          <div class="tile-title">${r.summary}</div>
          ${o?I`<div class="tile-flag">${o}</div>`:r.due?I`<div class="tile-due">${this._formatDue(r.due)}</div>`:K}
        </div>
      </div>
    `}_formatDue(t){const e=new Date(t.length<=10?`${t}T00:00:00`:t);if(isNaN(e.getTime()))return t;const s=this.hass?.locale?.language||"de",i=new Date;return e.toDateString()===i.toDateString()?"heute":new Intl.DateTimeFormat(s,{weekday:"short",day:"numeric",month:"short"}).format(e)}}xt.styles=r`
    :host {
      --pc: var(--primary-color);
    }
    ha-card {
      padding: 16px;
      font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, inherit));
      color: var(--primary-text-color);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .head-text {
      flex: 1 1 auto;
      min-width: 0;
    }
    .badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color, #fff));
    }
    .title {
      font-size: 1.2em;
      font-weight: 700;
      line-height: 1.2;
    }
    .sub {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-top: 2px;
    }
    .fam-pts {
      font-weight: 700;
      font-size: 1.05em;
      white-space: nowrap;
    }
    .goal {
      width: 140px;
      flex: none;
    }
    .goal-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.8em;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .goal-target {
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .bar {
      height: 8px;
      border-radius: 6px;
      background: var(--divider-color);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      border-radius: 6px;
      background: var(--primary-color);
      transition: width 0.3s ease;
    }
    .board {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .col {
      background: color-mix(in srgb, var(--pc) 6%, var(--card-background-color, #fff));
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 10px;
      min-width: 0;
    }
    .col-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      flex: none;
    }
    .avatar.initials {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #11181f;
      font-weight: 700;
      font-size: 13px;
    }
    .col-meta {
      min-width: 0;
    }
    .pname {
      font-weight: 600;
      font-size: 0.98em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pstatus {
      font-size: 0.78em;
      color: var(--secondary-text-color);
    }
    .tiles {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .empty {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      padding: 8px 4px;
    }
    .tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      background: color-mix(in srgb, var(--pc) 12%, var(--card-background-color, #fff));
      border-left: 3px solid var(--pc);
      transition:
        transform 0.08s ease,
        opacity 0.2s ease;
    }
    .tile:hover {
      transform: translateY(-1px);
    }
    .tile:focus-visible {
      outline: 2px solid var(--pc);
      outline-offset: 1px;
    }
    .tile.done {
      opacity: 0.55;
    }
    .tile.done .tile-title {
      text-decoration: line-through;
    }
    .tile.highlight {
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--pc) 55%, transparent);
    }
    .tile.urgent {
      background: color-mix(
        in srgb,
        var(--error-color, #db4437) 16%,
        var(--card-background-color, #fff)
      );
      border-left-color: var(--error-color, #db4437);
    }
    .tile.urgent .check {
      border-color: var(--error-color, #db4437);
    }
    .tile-flag {
      display: inline-block;
      margin-top: 3px;
      font-size: 0.72em;
      font-weight: 700;
      color: var(--error-color, #db4437);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .tile.highlight .tile-flag {
      color: color-mix(in srgb, var(--pc) 80%, var(--primary-text-color));
    }
    .check {
      width: 22px;
      height: 22px;
      flex: none;
      border-radius: 6px;
      border: 2px solid var(--pc);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      background: transparent;
    }
    .tile.done .check {
      background: var(--pc);
    }
    .tile-emoji {
      font-size: 18px;
      flex: none;
    }
    .tile-text {
      min-width: 0;
    }
    .tile-title {
      font-size: 0.95em;
      font-weight: 500;
      line-height: 1.25;
      overflow-wrap: anywhere;
    }
    .tile-due {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .tile.shopping .tile-text {
      flex: 1 1 auto;
    }
    .bring-open {
      flex: none;
      align-self: center;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.78em;
      font-weight: 700;
      text-decoration: none;
      color: #fff;
      background: var(--pc);
      white-space: nowrap;
    }

    /* ---- kid mode ---- */
    ha-card.kid {
      padding: 18px;
      position: relative;
      overflow: hidden;
    }
    .kid-people {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .kid-av {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #11181f;
      font-weight: 800;
      font-size: 16px;
      opacity: 0.55;
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
    }
    .kid-av.active {
      opacity: 1;
      transform: scale(1.08);
    }
    .kid-av.big {
      width: 72px;
      height: 72px;
      font-size: 24px;
      opacity: 1;
    }
    .kid-hero {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }
    .kid-name {
      font-size: 1.7em;
      font-weight: 800;
      line-height: 1.1;
    }
    .kid-stars {
      font-size: 1.05em;
      font-weight: 700;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .kid-bar {
      height: 14px;
      border-radius: 10px;
      background: var(--divider-color);
      overflow: hidden;
      margin-bottom: 16px;
    }
    .kid-fill {
      height: 100%;
      border-radius: 10px;
      background: var(--pc);
      transition: width 0.4s ease;
    }
    .kid-tasks {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .kid-task {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 16px 18px;
      border-radius: 16px;
      border: none;
      cursor: pointer;
      text-align: left;
      font: inherit;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--pc) 16%, var(--card-background-color, #fff));
      border-left: 6px solid var(--pc);
      transition:
        transform 0.1s ease,
        box-shadow 0.1s ease;
    }
    .kid-task:hover {
      transform: translateY(-2px);
    }
    .kid-task:active {
      transform: scale(0.98);
    }
    .kid-task.highlight {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--pc) 60%, transparent);
    }
    .kid-task.urgent {
      background: color-mix(
        in srgb,
        var(--error-color, #db4437) 20%,
        var(--card-background-color, #fff)
      );
      border-left-color: var(--error-color, #db4437);
    }
    .kid-task.urgent .kid-sub {
      color: var(--error-color, #db4437);
    }
    .kid-emoji {
      font-size: 34px;
      flex: none;
    }
    .kid-task-title {
      flex: 1 1 auto;
      font-size: 1.25em;
      font-weight: 700;
      overflow-wrap: anywhere;
    }
    .kid-sub {
      display: block;
      font-size: 0.7em;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .kid-check {
      flex: none;
      font-size: 30px;
      color: var(--pc);
      font-weight: 700;
    }
    .kid-alldone {
      text-align: center;
      padding: 28px 10px;
      font-size: 1.4em;
      font-weight: 800;
    }
    .kid-alldone > div {
      font-size: 0.75em;
      margin-top: 6px;
    }
    .burst {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 120px;
      pointer-events: none;
      animation: burst 0.9s ease-out forwards;
    }
    @keyframes burst {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      30% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1.6);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .burst {
        animation: none;
        display: none;
      }
    }
  `,t([ht({attribute:!1})],xt.prototype,"hass",void 0),t([pt()],xt.prototype,"_config",void 0),t([pt()],xt.prototype,"_items",void 0),t([pt()],xt.prototype,"_activeKid",void 0),t([pt()],xt.prototype,"_burst",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",xt),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:ut,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const kt=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],wt=[{name:"title",selector:{text:{}}},{name:"points_per_task",selector:{number:{min:0,max:1e3,mode:"box",step:1}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"show_completed",selector:{boolean:{}}},{name:"kid_mode",selector:{boolean:{}}},{name:"highlight_overdue",selector:{boolean:{}}},{name:"shopping_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"shopping_points",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"bring_deeplink",selector:{text:{}}}],At=[{name:"name",selector:{text:{}}},{name:"person",selector:{entity:{filter:{domain:"person"}}}},{name:"lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}}],Et={title:"Titel",points_per_task:"Punkte pro Aufgabe",goal:"Ziel (Punkte)",show_completed:"Erledigte anzeigen",kid_mode:"Kinder-Modus",highlight_overdue:"Überfällige hervorheben",shopping_lists:"Einkaufslisten (Bring!)",shopping_points:"Punkte pro Einkauf",bring_deeplink:"Bring!-Link",name:"Name",person:"Person (Avatar)",lists:"Aufgabenlisten (todo.*)"},St={points_per_task:"Punkte je erledigter Aufgabe (Standard 10).",goal:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",show_completed:"Erledigte Aufgaben ausgegraut mitanzeigen.",kid_mode:"Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",highlight_overdue:"Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Weitere Kontext-Regeln per YAML (context_rules).",shopping_lists:"Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",shopping_points:"Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",bring_deeplink:"Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",person:"Optional: person.* liefert Avatarbild & Anzeigename.",lists:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",goal_person:"Optionales persönliches Punkteziel."};class Ct extends at{constructor(){super(...arguments),this._label=t=>Et[t.name]??t.name,this._helper=t=>St[t.name]}setConfig(t){this._config=t}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}get _settingsData(){const t=this._config.shopping_lists,e=Array.isArray(t)?t:t?[t]:[],s=!1!==this._config.highlight_overdue;return{...this._config,shopping_lists:e,highlight_overdue:s}}_emit(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_settingsChanged(t){t.stopPropagation();const e={...t.detail.value};e.title||delete e.title,e.goal||delete e.goal,e.show_completed||delete e.show_completed,e.kid_mode||delete e.kid_mode,e.shopping_points||delete e.shopping_points,e.bring_deeplink||delete e.bring_deeplink,e.highlight_overdue&&delete e.highlight_overdue,Array.isArray(e.shopping_lists)&&(0===e.shopping_lists.length?delete e.shopping_lists:1===e.shopping_lists.length&&(e.shopping_lists=e.shopping_lists[0])),this._emit({...this._config,...e,persons:this._persons})}_personChanged(t,e){e.stopPropagation();const s={...e.detail.value};s.color||delete s.color,s.goal||delete s.goal,Array.isArray(s.lists)&&(0===s.lists.length?delete s.lists:1===s.lists.length&&(s.lists=s.lists[0]));const i=this._persons.map((e,i)=>i===t?s:e);this._emit({...this._config,persons:i})}_personData(t){const e=Array.isArray(t.lists)?t.lists:t.lists?[t.lists]:[];return{...t,lists:e}}_setPersonColor(t,e){const s=this._persons.map((s,i)=>{if(i!==t)return s;const o={...s};return e?o.color=e:delete o.color,o});this._emit({...this._config,persons:s})}_addPerson(){const t=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:t})}_removePerson(t){const e=this._persons.filter((e,s)=>s!==t);this._emit({...this._config,persons:e})}_movePerson(t,e){const s=[...this._persons],i=t+e;i<0||i>=s.length||([s[t],s[i]]=[s[i],s[t]],this._emit({...this._config,persons:s}))}_autoDetect(){const t=new Set(this._persons.map(t=>t.person).filter(Boolean)),e=Object.keys(this.hass.states).filter(t=>t.startsWith("person.")).filter(e=>!t.has(e)).map(t=>({name:this.hass.states[t].attributes?.friendly_name||"",person:t,lists:""}));if(0===e.length)return;const s=this._persons.filter(t=>t.name||t.person||t.lists&&t.lists.length);this._emit({...this._config,persons:[...s,...e]})}_personColor(t,e){return t.color||kt[e%kt.length]}render(){return this._config&&this.hass?I`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${wt}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${this._settingsChanged}
        ></ha-form>

        <div class="section">
          <div class="section-head">
            <span>Personen</span>
            <button class="link" @click=${this._autoDetect} title="person.*-Entitäten übernehmen">
              Personen erkennen
            </button>
          </div>

          ${this._persons.map((t,e)=>this._personRow(t,e))}
          ${0===this._persons.length?I`<div class="empty">Noch keine Person. Füge eine hinzu.</div>`:K}

          <button class="add" @click=${this._addPerson}>+ Person hinzufügen</button>
        </div>
      </div>
    `:K}_personRow(t,e){const s=this._personColor(t,e),i=t.name||t.person||`Person ${e+1}`;return I`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${s}"></span>
          <span class="ptitle">${i}</span>
          <span class="spacer"></span>
          <ha-icon-button
            .path=${"M7,15L12,10L17,15H7Z"}
            title="Nach oben"
            .disabled=${0===e}
            @click=${()=>this._movePerson(e,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M7,10L12,15L17,10H7Z"}
            title="Nach unten"
            .disabled=${e===this._persons.length-1}
            @click=${()=>this._movePerson(e,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            title="Entfernen"
            @click=${()=>this._removePerson(e)}
          ></ha-icon-button>
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${this._personData(t)}
          .schema=${At}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${t=>this._personChanged(e,t)}
        ></ha-form>

        <div class="colors">
          <span class="colors-label">Farbe</span>
          ${kt.map(s=>I`
              <button
                class="swatch ${t.color===s?"active":""}"
                style="background:${s}"
                title=${s}
                @click=${()=>this._setPersonColor(e,s)}
              ></button>
            `)}
          <button
            class="swatch auto ${t.color?"":"active"}"
            title="Automatisch (Palette)"
            @click=${()=>this._setPersonColor(e,void 0)}
          >
            A
          </button>
        </div>
      </div>
    `}}Ct.styles=r`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .link {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font: inherit;
      padding: 0;
    }
    .person {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .person-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      flex: none;
    }
    .ptitle {
      font-weight: 600;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .colors {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .colors-label {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-right: 4px;
    }
    .swatch {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
    }
    .swatch.active {
      border-color: var(--primary-text-color);
    }
    .swatch.auto {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font-size: 11px;
      font-weight: 700;
      border-radius: 6px;
    }
    .add {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed var(--divider-color);
      background: none;
      color: var(--primary-color);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }
    .empty {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 6px 2px 10px;
    }
  `,t([ht({attribute:!1})],Ct.prototype,"hass",void 0),t([pt()],Ct.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",Ct);var Pt=Object.freeze({__proto__:null,FamilyTaskCardEditor:Ct});export{xt as FamilyTaskCard};

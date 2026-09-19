function e(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,b=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&d(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=p(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);n?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...c(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const r=n.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(void 0!==e){const r=this.constructor;if(!1===s&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??$)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=e=>e,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,z=`<${C}>`,O=document,N=()=>O.createComment(""),T=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,L="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,U=/>/g,D=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,H=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),V=new WeakMap,q=O.createTreeWalker(O,129);function Z(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,s=[];let n,r=2===t?"<svg>":3===t?"<math>":"",o=M;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,p=0;for(;p<i.length&&(o.lastIndex=p,l=o.exec(i),null!==l);)p=o.lastIndex,o===M?"!--"===l[1]?o=j:void 0!==l[1]?o=U:void 0!==l[2]?(F.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=D):void 0!==l[3]&&(o=D):o===D?">"===l[0]?(o=n??M,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?D:'"'===l[3]?H:B):o===H||o===B?o=D:o===j||o===U?o=M:(o=D,n=void 0);const c=o===D&&e[t+1].startsWith("/>")?" ":"";r+=o===M?i+z:d>=0?(s.push(a),i.slice(0,d)+S+i.slice(d)+P+c):i+P+(-2===d?t:c)}return[Z(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Y{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0;const o=e.length-1,a=this.parts,[l,d]=G(e,t);if(this.el=Y.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(S)){const t=d[r++],i=s.getAttribute(e).split(P),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(P)&&(a.push({type:6,index:n}),s.removeAttribute(e));if(F.test(s.tagName)){const e=s.textContent.split(P),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],N()),q.nextNode(),a.push({type:2,index:++n});s.append(e[t],N())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(P,e+1));)a.push({type:7,index:n}),e+=P.length-1}n++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===W)return t;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(t=J(e,n._$AS(e,t.values),n,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??O).importNode(t,!0);q.currentNode=s;let n=q.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new X(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new ne(n,this,e)),this._$AV.push(t),a=i[++o]}r!==a?.index&&(n=q.nextNode(),r++)}return q.currentNode=O,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),T(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Y(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new X(this.O(N()),this.O(N()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,s){const n=this.strings;let r=!1;if(void 0===n)e=J(this,e,t,0),r=!T(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{const s=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=J(this,s[i+o],t,o),a===W&&(a=this._$AH[o]),r||=!T(a)||a!==this._$AH[o],a===K?e=K:e!==K&&(e+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class se extends ee{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??K)===W)return;const i=this._$AH,s=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const re=k.litHtmlPolyfillSupport;re?.(Y,X),(k.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class ae extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let n=s._$litPart$;if(void 0===n){const e=i?.renderBefore??null;s._$litPart$=n=new X(t.insertBefore(N(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const le=oe.litElementPolyfillSupport;le?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},pe=(e=de,t,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,n,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];t.call(this,i),this.requestUpdate(s,n,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ce(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return ce({...e,state:!0,attribute:!1})}const ue="Family Task Card",ge=["🌱","⭐","🔥","🏅","🏆","👑"],fe=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],me=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function _e(e,t){return e.color||fe[t%fe.length]}function be(e){return e.lists?(Array.isArray(e.lists)?e.lists:[e.lists]).filter(Boolean):[]}function ve(e){for(const[t,i]of me)if(t.test(e))return i;return"📝"}function $e(e,t){if("string"==typeof e)return e.replace(/\{name\}/g,t.name??"").replace(/\{task\}/g,t.task??"");if(Array.isArray(e))return e.map(e=>$e(e,t));if(e&&"object"==typeof e){const i={};for(const[s,n]of Object.entries(e))i[s]=$e(n,t);return i}return e}function ye(e){if(!e.due)return!1;const t=new Date(e.due.length<=10?`${e.due}T23:59:59`:e.due);return!isNaN(t.getTime())&&t.getTime()<Date.now()}function xe(e,t,i){if(e.lists){if(!(Array.isArray(e.lists)?e.lists:[e.lists]).includes(i))return!1}if(e.match)try{if(!new RegExp(e.match,"i").test(t))return!1}catch{return!1}return!0}function ke(e,t){let i=!1;if(t)if(void 0!==e.state){i=(Array.isArray(e.state)?e.state:[e.state]).includes(t.state)}else if(void 0!==e.above||void 0!==e.below){const s=Number(t.state);isNaN(s)||(i=!0,void 0===e.above||s>e.above||(i=!1),void 0===e.below||s<e.below||(i=!1))}else i=!["off","unavailable","unknown","","none","false"].includes(t.state.toLowerCase());return e.invert?!i:i}class we extends ae{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1,this._activeKid=0,this._burst=!1,this._shopPerson=null,this._kidShopOpen=!1,this._pending=null,this._pin="",this._pinError=!1,this._prevOpen={}}static async getConfigElement(){return await Promise.resolve().then(function(){return Oe}),document.createElement("family-task-card-editor")}static getStubConfig(e){const t=e?Object.keys(e.states).find(e=>e.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:"Familien-Aufgaben",persons:[{name:"Person 1",lists:t?[t]:[]}]}}setConfig(e){if(!e||!Array.isArray(e.persons))throw new Error('"persons" muss eine Liste sein (mind. eine Person).');this._config={points_per_task:10,...e}}getCardSize(){const e=this._config?.persons?.length??1;return 2+Math.min(e,4)}willUpdate(e){(e.has("hass")||e.has("_config"))&&this.hass&&this._config&&this._refresh()}async _refresh(){if(!this.hass||!this._config||this._loading)return;const e=new Set;for(const t of this._config.persons)for(const i of be(t))e.add(i);const t=[];for(const i of e){const e=this.hass.states[i],s=e?`${e.state}|${e.last_changed}`:"missing";this._sig[i]!==s&&(this._sig[i]=s,t.push(i))}if(0!==t.length){this._loading=!0;try{const e={...this._items};await Promise.all(t.map(async t=>{try{const i=await this.hass.callWS({type:"todo/item/list",entity_id:t});e[t]=i?.items??[]}catch(i){e[t]=[]}})),this._items=e}finally{this._loading=!1}}}_shoppingSet(){const e=this._config?.shopping_lists,t=e?Array.isArray(e)?e:[e]:[];return new Set(t.filter(Boolean))}_listName(e){return this.hass?.states[e]?.attributes?.friendly_name||"Einkauf"}_bringLink(){return this._config?.bring_deeplink||"https://web.getbring.com"}_levelInfo(e){return function(e,t,i){if(!t||t<=0)return null;const s=Math.floor(e/t)+1;return{level:s,pct:Math.round(e%t/t*100),emoji:i[Math.min(s-1,i.length-1)]??"⭐"}}(e,this._config?.level_size??100,this._config?.level_emojis??ge)}_canToggle(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(4&t)}_personView(e){const t=this._config,i=t.points_per_task??10,s=t.shopping_points??i,n=this._shoppingSet(),r=[],o=[],a=[];let l=0;for(const t of be(e)){const e=(this._items[t]??[]).map(e=>({entity:t,item:e}));if(n.has(t)){const i=e.filter(e=>"completed"!==e.item.status),n=e.filter(e=>"completed"===e.item.status);i.length>0?a.push({entity:t,name:this._listName(t),open:i}):n.length>0&&(l+=s)}else for(const t of e)("completed"===t.item.status?o:r).push(t)}const d=this._decorate(r);l+=o.length*i;const p=!!e.points_entity,c=p?this._spent(e):0;return{tasksOpen:d,tasksDone:o,shopOpen:a,earned:l,openCount:d.length+a.length,spent:c,balance:l-c,hasWallet:p}}_spent(e){if(!e.points_entity)return 0;const t=Number(this.hass?.states[e.points_entity]?.state);return isNaN(t)?0:t}_decorate(e){const t=this._config?.context_rules??[],i=!1!==this._config?.highlight_overdue,s=[];for(const n of e){let e,r=!1,o="none";for(const i of t)if(xe(i,n.item.summary,n.entity)&&ke(i,this.hass?.states[i.entity])){if("hide"===i.effect){r=!0;break}"urgent"===i.effect?(o="urgent",e=i.label??e):"highlight"===i.effect&&"urgent"!==o&&(o="highlight",e=e??i.label)}r||(i&&ye(n.item)&&(o="urgent",e=e??"Überfällig"),s.push({...n,flag:o,label:e}))}const n=e=>"urgent"===e?0:"highlight"===e?1:2;return s.map((e,t)=>({d:e,i:t})).sort((e,t)=>n(e.d.flag)-n(t.d.flag)||e.i-t.i).map(({d:e})=>e)}async _completeShopping(e){await Promise.all(e.open.map(e=>this._toggle(e.entity,e.item,!0))),this._fireCelebrate("task",{name:this._ownerName(e.entity),task:e.name})}_rewards(){return this._config?.rewards??[]}_startRedeem(e,t){const i=this._config?.parent_pin;null!=i&&""!==i?(this._pending={personIdx:e,reward:t},this._pin="",this._pinError=!1):this._doRedeem(e,t)}_confirmRedeem(){if(this._pending)if(this._pin===String(this._config?.parent_pin??"")){const{personIdx:e,reward:t}=this._pending;this._doRedeem(e,t)}else this._pinError=!0}_cancelRedeem(){this._pending=null,this._pin="",this._pinError=!1}async _doRedeem(e,t){const i=this._config?.persons[e];if(!i?.points_entity||!this.hass)return;const s=this._spent(i)+t.cost;this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("input_number","set_value",{entity_id:i.points_entity,value:s}),this._fireCelebrate("reward",{name:this._personName(i,e),task:t.name})}catch(t){this._shopPerson=e}}_personName(e,t){return e.name||(e.person?this.hass?.states[e.person]?.attributes?.friendly_name:"")||`Person ${t+1}`}async _toggle(e,t,i=!1){if(!this.hass)return;const s="completed"===t.status?"needs_action":"completed";this._items={...this._items,[e]:(this._items[e]??[]).map(e=>e.uid===t.uid?{...e,status:s}:e)};try{await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:s}),"completed"!==s||i||this._fireCelebrate("task",{name:this._ownerName(e),task:t.summary})}catch(t){this._sig[e]="",this._refresh()}}render(){if(!this._config)return K;const e=this._config;if(e.kid_mode&&e.persons.length>0)return this._renderKid();let t=0;const i=e.persons.map((e,i)=>{const s=this._personView(e);return t+=s.earned,{p:e,idx:i,view:s}});return I`
      <ha-card>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${e.title||ue}</div>
            <div class="sub">Familien-Aufgaben</div>
          </div>
          ${this._goalBar(t)}
        </div>

        <div class="board">${i.map(e=>this._column(e.p,e.idx,e.view))}</div>
        ${this._leaderboard(i)}
      </ha-card>
    `}_leaderboard(e){if(!this._config?.show_leaderboard||e.length<2)return K;const t=["🥇","🥈","🥉"],i=[...e].sort((e,t)=>t.view.earned-e.view.earned);return I`
      <div class="leaderboard">
        <div class="lb-title">🏆 Rangliste</div>
        ${i.map((e,i)=>I`
            <div class="lb-row">
              <span class="lb-rank">${t[i]??`${i+1}.`}</span>
              <span class="lb-dot" style="background:${_e(e.p,e.idx)}"></span>
              <span class="lb-name">${this._personName(e.p,e.idx)}</span>
              <span class="lb-pts">⭐ ${e.view.earned}</span>
            </div>
          `)}
      </div>
    `}_renderKid(){const e=this._config,t=e.persons,i=Math.min(this._activeKid,t.length-1),s=t[i],n=_e(s,i),r=this._personName(s,i),o=this._personView(s),a=o.earned,l=o.openCount,d=s.goal??e.goal,p=d&&d>0?Math.min(100,Math.round(a/d*100)):0,c=0===l,h=this._rewards().length>0,u=o.hasWallet?o.balance:a,g=this._levelInfo(a);return I`
      <ha-card class="kid" style="--pc:${n}">
        ${t.length>1?I`<div class="kid-people">
                ${t.map((e,t)=>this._kidAvatar(e,t,t===i))}
              </div>`:K}

        <div class="kid-hero">
          ${this._kidAvatar(s,i,!1,!0)}
          <div class="kid-hero-text">
            <div class="kid-name">
              ${r}${g?I`<span class="lvl kid-lvl">${g.emoji} L${g.level}</span>`:K}
            </div>
            <div class="kid-stars">
              ${o.hasWallet?"💰":"⭐"}
              ${u}${l?I` · ${l} offen`:K}
            </div>
          </div>
          ${h?I`<button
                  class="kid-shop-btn ${this._kidShopOpen?"active":""}"
                  title="Belohnungen"
                  @click=${()=>{this._kidShopOpen=!this._kidShopOpen,this._cancelRedeem()}}
                >
                  🎁
                </button>`:K}
        </div>

        ${d&&d>0?I`<div class="kid-bar"><div class="kid-fill" style="width:${p}%"></div></div>`:K}
        ${h&&this._kidShopOpen?this._shopPanel(i,o.balance,o.hasWallet):I`<div class="kid-tasks">
                ${c?I`<div class="kid-alldone">
                        🎉
                        <div>Alles geschafft!</div>
                      </div>`:I`${o.shopOpen.map(e=>this._kidShopping(e,n))}
                      ${o.tasksOpen.map(e=>this._kidTask(e,n))}`}
              </div>`}
        ${this._burst?I`<div class="burst">⭐</div>`:K}
      </ha-card>
    `}_kidAvatar(e,t,i,s=!1){const n=_e(e,t),r=this._personName(e,t),o=e.person?this.hass?.states[e.person]:void 0,a=o?.attributes?.entity_picture,l=r.slice(0,2).toUpperCase(),d=`kid-av ${s?"big":""} ${i?"active":""}`,p=a?`background-image:url('${a}');box-shadow:0 0 0 3px ${n}`:`background:${n}`,c=a?K:I`<span>${l}</span>`;return s?I`<div class="${d}" style="${p}">${c}</div>`:I`<button
          class="${d}"
          style="${p}"
          title=${r}
          @click=${()=>this._activeKid=t}
        >
          ${c}
        </button>`}_kidTask(e,t){const{entity:i,item:s,flag:n,label:r}=e,o="urgent"===n?"⚠️":ve(s.summary),a=this._canToggle(i);return I`
      <button
        class="kid-task ${n}"
        style="--pc:${t}"
        ?disabled=${!a}
        title=${a?"":"Diese Liste unterstützt kein Abhaken"}
        @click=${()=>this._kidComplete(i,s)}
      >
        <span class="kid-emoji">${o}</span>
        <span class="kid-task-title">
          ${s.summary}${r?I`<span class="kid-sub">${r}</span>`:K}
        </span>
        <span class="kid-check">${a?"◯":"🔒"}</span>
      </button>
    `}_kidShopping(e,t){return I`
      <button
        class="kid-task"
        style="--pc:${t}"
        @click=${()=>this._kidCompleteShopping(e)}
      >
        <span class="kid-emoji">🛒</span>
        <span class="kid-task-title">
          ${e.name}
          <span class="kid-sub">${e.open.length} Artikel</span>
        </span>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          @click=${e=>e.stopPropagation()}
        >
          Öffnen
        </a>
      </button>
    `}_celebrate(){this._burst=!0,this._burstTimer&&clearTimeout(this._burstTimer),this._burstTimer=window.setTimeout(()=>{this._burst=!1},900)}_ownerName(e){const t=this._config?.persons??[];for(let i=0;i<t.length;i++)if(be(t[i]).includes(e))return this._personName(t[i],i)}_fireCelebrate(e,t){const i=this._config?.celebrate;if(!i||!this.hass||!Array.isArray(i.actions))return;if((i.on?Array.isArray(i.on)?i.on:[i.on]:["all_done"]).includes(e))for(const e of i.actions){if(!e?.service||!e.service.includes("."))continue;const[i,...s]=e.service.split("."),n=s.join("."),r=$e(e.data??{},t),o=e.target?$e(e.target,t):void 0;Promise.resolve(this.hass.callService(i,n,r,o)).catch(()=>{})}}updated(){this._config?.celebrate&&this._config.persons.forEach((e,t)=>{const i=this._personView(e).openCount,s=this._prevOpen[t];this._prevOpen[t]=i,void 0!==s&&s>0&&0===i&&this._fireCelebrate("all_done",{name:this._personName(e,t)})})}async _kidComplete(e,t){this._celebrate(),await this._toggle(e,t)}async _kidCompleteShopping(e){this._celebrate(),await this._completeShopping(e)}disconnectedCallback(){super.disconnectedCallback(),this._burstTimer&&clearTimeout(this._burstTimer)}_goalBar(e){const t=this._config?.goal;if(!t||t<=0)return I`<div class="fam-pts">⭐ ${e}</div>`;const i=Math.max(0,Math.min(100,Math.round(e/t*100)));return I`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${e}</span><span class="goal-target">Ziel ${t}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${i}%"></div></div>
      </div>
    `}_column(e,t,i){const s=_e(e,t),n=this._personName(e,t),r=e.person?this.hass?.states[e.person]:void 0,o=r?.attributes?.entity_picture,a=n.slice(0,2).toUpperCase(),l=this._config?.show_completed,d=0===i.openCount&&(!l||0===i.tasksDone.length),p=this._rewards().length>0,c=this._shopPerson===t,h=i.hasWallet?i.balance:i.earned,u=this._levelInfo(i.earned);return I`
      <div class="col" style="--pc:${s}">
        <div class="col-head">
          ${o?I`<div
                  class="avatar"
                  style="background-image:url('${o}');box-shadow:0 0 0 2px ${s}55"
                ></div>`:I`<div class="avatar initials" style="background:${s}">${a}</div>`}
          <div class="col-meta">
            <div class="pname">
              <span class="pname-txt">${n}</span>
              ${u?I`<span class="lvl" title="Level ${u.level} · ${u.pct}% zum nächsten"
                      >${u.emoji} L${u.level}</span
                    >`:K}
            </div>
            <div class="pstatus">
              ${i.openCount} offen · ${i.hasWallet?"💰":"⭐"} ${h}
            </div>
          </div>
          ${p?I`<button
                  class="shop-toggle ${c?"active":""}"
                  title="Belohnungen"
                  @click=${()=>{this._shopPerson=c?null:t,this._cancelRedeem()}}
                >
                  🎁
                </button>`:K}
        </div>

        <div class="tiles">
          ${d?I`<div class="empty">Alles erledigt 🎉</div>`:K}
          ${i.shopOpen.map(e=>this._shoppingTile(e,s))}
          ${i.tasksOpen.map(e=>this._tile(e,s,!1,e.flag,e.label))}
          ${l?i.tasksDone.map(e=>this._tile(e,s,!0)):K}
        </div>

        ${c?this._shopPanel(t,i.balance,i.hasWallet):K}
      </div>
    `}_shopPanel(e,t,i){const s=this._rewards(),n=this._pending?.personIdx===e?this._pending:null;return I`
      <div class="shop">
        <div class="shop-head">
          <span>🎁 Belohnungen</span>
          <span class="shop-balance">Guthaben ${i?"💰":"⭐"} ${t}</span>
        </div>
        ${i?K:I`<div class="shop-note">
                Kein Guthaben-Helfer (<code>points_entity</code>, ein
                <code>input_number</code>) gesetzt – Einlösen ist deaktiviert.
              </div>`}
        ${s.map(s=>{const n=i&&t>=s.cost;return I`
            <div class="reward ${n?"":"locked"}">
              <span class="reward-emoji">${s.emoji||"🎁"}</span>
              <span class="reward-name">${s.name}</span>
              <span class="reward-cost">⭐ ${s.cost}</span>
              <button
                class="reward-btn"
                ?disabled=${!n}
                @click=${()=>this._startRedeem(e,s)}
              >
                Einlösen
              </button>
            </div>
          `})}
        ${n?this._pinRow():K}
      </div>
    `}_pinRow(){return I`
      <div class="pin ${this._pinError?"err":""}">
        <span class="pin-label">Eltern-PIN:</span>
        <input
          class="pin-input"
          type="password"
          inputmode="numeric"
          autocomplete="off"
          .value=${this._pin}
          @input=${e=>{this._pin=e.target.value,this._pinError=!1}}
          @keydown=${e=>{"Enter"===e.key&&this._confirmRedeem(),"Escape"===e.key&&this._cancelRedeem()}}
        />
        <button class="pin-ok" @click=${this._confirmRedeem}>OK</button>
        <button class="pin-cancel" title="Abbrechen" @click=${this._cancelRedeem}>✕</button>
        ${this._pinError?I`<span class="pin-msg">Falsche PIN</span>`:K}
      </div>
    `}_shoppingTile(e,t){const i=e.open.length,s=this._canToggle(e.entity);return I`
      <div
        class="tile shopping ${s?"":"readonly"}"
        style="--pc:${t}"
        role=${s?"button":"listitem"}
        tabindex=${s?0:-1}
        @click=${s?()=>this._completeShopping(e):K}
        @keydown=${s?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._completeShopping(e))}:K}
      >
        <div class="check">${s?"":"🔒"}</div>
        <div class="tile-emoji">🛒</div>
        <div class="tile-text">
          <div class="tile-title">${e.name}</div>
          <div class="tile-due">${i} Artikel</div>
        </div>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          title="In Bring! öffnen"
          @click=${e=>e.stopPropagation()}
        >
          Öffnen
        </a>
      </div>
    `}_tile(e,t,i,s="none",n){const{entity:r,item:o}=e,a="urgent"===s?"⚠️":ve(o.summary),l=this._canToggle(r);return I`
      <div
        class="tile ${i?"done":s} ${l?"":"readonly"}"
        style="--pc:${t}"
        title=${l?"":"Diese Liste unterstützt kein Abhaken"}
        role=${l?"button":"listitem"}
        tabindex=${l?0:-1}
        @click=${l?()=>this._toggle(r,o):K}
        @keydown=${l?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle(r,o))}:K}
      >
        <div class="check">${i?"✓":l?"":"🔒"}</div>
        <div class="tile-emoji">${a}</div>
        <div class="tile-text">
          <div class="tile-title">${o.summary}</div>
          ${n?I`<div class="tile-flag">${n}</div>`:o.due?I`<div class="tile-due">${this._formatDue(o.due)}</div>`:K}
        </div>
      </div>
    `}_formatDue(e){const t=new Date(e.length<=10?`${e}T00:00:00`:e);if(isNaN(t.getTime()))return e;const i=this.hass?.locale?.language||"de",s=new Date;return t.toDateString()===s.toDateString()?"heute":new Intl.DateTimeFormat(i,{weekday:"short",day:"numeric",month:"short"}).format(t)}}we.styles=o`
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
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .pname-txt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lvl {
      flex: none;
      font-size: 0.72em;
      font-weight: 700;
      padding: 1px 7px;
      border-radius: 999px;
      white-space: nowrap;
      color: var(--pc, var(--primary-color));
      background: color-mix(in srgb, var(--pc) 16%, var(--card-background-color, #fff));
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
    .tile.readonly {
      cursor: default;
    }
    .tile.readonly:hover {
      transform: none;
    }
    .tile.readonly .check {
      border-color: var(--divider-color);
      font-size: 12px;
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
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 6px 12px;
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
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .kid-lvl {
      font-size: 0.5em;
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

    /* ---- reward shop ---- */
    .shop-toggle,
    .kid-shop-btn {
      flex: none;
      border: none;
      cursor: pointer;
      background: color-mix(in srgb, var(--pc) 16%, var(--card-background-color, #fff));
      border-radius: 10px;
      font-size: 16px;
      line-height: 1;
      min-width: 38px;
      min-height: 38px;
      padding: 6px 8px;
    }
    .kid-shop-btn {
      font-size: 26px;
      padding: 10px 12px;
      border-radius: 14px;
      margin-left: auto;
    }
    .shop-toggle.active,
    .kid-shop-btn.active {
      box-shadow: 0 0 0 2px var(--pc);
    }
    .shop {
      margin-top: 10px;
      padding: 10px;
      border-radius: 12px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
    }
    .shop-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .shop-balance {
      font-size: 0.9em;
    }
    .shop-note {
      font-size: 0.8em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .shop code {
      font-size: 0.9em;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      padding: 0 4px;
      border-radius: 4px;
    }
    .reward {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 6px;
      border-top: 1px solid var(--divider-color);
    }
    .reward.locked {
      opacity: 0.55;
    }
    .reward-emoji {
      font-size: 20px;
      flex: none;
    }
    .reward-name {
      flex: 1 1 auto;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .reward-cost {
      flex: none;
      font-size: 0.85em;
      font-weight: 700;
      color: var(--secondary-text-color);
    }
    .reward-btn {
      flex: none;
      border: none;
      border-radius: 999px;
      min-height: 36px;
      padding: 6px 14px;
      font: inherit;
      font-weight: 700;
      font-size: 0.82em;
      color: #fff;
      background: var(--pc, var(--primary-color));
      cursor: pointer;
    }
    .reward-btn:disabled {
      background: var(--disabled-text-color, #9aa0a6);
      cursor: default;
    }
    .pin {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--divider-color);
    }
    .pin-label {
      font-size: 0.85em;
      font-weight: 600;
    }
    .pin-input {
      width: 84px;
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
    }
    .pin.err .pin-input {
      border-color: var(--error-color, #db4437);
    }
    .pin-ok,
    .pin-cancel {
      border: none;
      border-radius: 8px;
      padding: 6px 10px;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }
    .pin-ok {
      color: #fff;
      background: var(--pc, var(--primary-color));
    }
    .pin-cancel {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    .pin-msg {
      font-size: 0.8em;
      font-weight: 700;
      color: var(--error-color, #db4437);
    }

    /* ---- leaderboard ---- */
    .leaderboard {
      margin-top: 16px;
      padding: 12px;
      border-radius: 14px;
      background: color-mix(in srgb, var(--primary-color) 5%, var(--card-background-color, #fff));
      border: 1px solid var(--divider-color);
    }
    .lb-title {
      font-weight: 700;
      margin-bottom: 8px;
    }
    .lb-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 0;
    }
    .lb-rank {
      flex: none;
      width: 26px;
      text-align: center;
      font-weight: 700;
    }
    .lb-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex: none;
    }
    .lb-name {
      flex: 1 1 auto;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lb-pts {
      flex: none;
      font-weight: 700;
      color: var(--secondary-text-color);
    }

    /* ---- phones: tighten spacing, let the header wrap ---- */
    @media (max-width: 480px) {
      ha-card {
        padding: 12px;
      }
      ha-card.kid {
        padding: 14px;
      }
      .head {
        flex-wrap: wrap;
        gap: 8px 10px;
      }
      /* points / goal drop to their own full-width line under the title */
      .goal,
      .fam-pts {
        flex: 1 1 100%;
        width: auto;
      }
      .board {
        margin-top: 12px;
        gap: 10px;
      }
      .kid-hero {
        flex-wrap: wrap;
      }
      .kid-shop-btn {
        margin-left: 0;
      }
      .kid-name {
        font-size: 1.45em;
      }
    }
  `,e([ce({attribute:!1})],we.prototype,"hass",void 0),e([he()],we.prototype,"_config",void 0),e([he()],we.prototype,"_items",void 0),e([he()],we.prototype,"_activeKid",void 0),e([he()],we.prototype,"_burst",void 0),e([he()],we.prototype,"_shopPerson",void 0),e([he()],we.prototype,"_kidShopOpen",void 0),e([he()],we.prototype,"_pending",void 0),e([he()],we.prototype,"_pin",void 0),e([he()],we.prototype,"_pinError",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",we),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:ue,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const Ae=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],Ee=[{name:"title",selector:{text:{}}},{name:"points_per_task",selector:{number:{min:0,max:1e3,mode:"box",step:1}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"show_completed",selector:{boolean:{}}},{name:"kid_mode",selector:{boolean:{}}},{name:"highlight_overdue",selector:{boolean:{}}},{name:"shopping_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"shopping_points",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"bring_deeplink",selector:{text:{}}},{name:"parent_pin",selector:{text:{}}},{name:"level_size",selector:{number:{min:0,max:1e5,mode:"box",step:10}}},{name:"show_leaderboard",selector:{boolean:{}}}],Se=[{name:"name",selector:{text:{}}},{name:"person",selector:{entity:{filter:{domain:"person"}}}},{name:"lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"points_entity",selector:{entity:{filter:{domain:"input_number"}}}}],Pe={title:"Titel",points_per_task:"Punkte pro Aufgabe",goal:"Ziel (Punkte)",show_completed:"Erledigte anzeigen",kid_mode:"Kinder-Modus",highlight_overdue:"Überfällige hervorheben",shopping_lists:"Einkaufslisten (Bring!)",shopping_points:"Punkte pro Einkauf",bring_deeplink:"Bring!-Link",parent_pin:"Eltern-PIN (Belohnungen)",level_size:"Punkte pro Level",show_leaderboard:"Rangliste anzeigen",name:"Name",person:"Person (Avatar)",lists:"Aufgabenlisten (todo.*)",points_entity:"Guthaben-Helfer (input_number)"},Ce={points_per_task:"Punkte je erledigter Aufgabe (Standard 10).",goal:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",show_completed:"Erledigte Aufgaben ausgegraut mitanzeigen.",kid_mode:"Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",highlight_overdue:"Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Weitere Kontext-Regeln per YAML (context_rules).",shopping_lists:"Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",shopping_points:"Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",bring_deeplink:"Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",parent_pin:"PIN, die zum Einlösen einer Belohnung abgefragt wird (Eltern-Freigabe). Belohnungen selbst per YAML (rewards).",level_size:"Punkte pro Level (aus verdienten Punkten). Standard 100, 0 = keine Level. Abzeichen optional per YAML (level_emojis).",show_leaderboard:"Rangliste der Personen nach verdienten Punkten unter dem Board anzeigen.",person:"Optional: person.* liefert Avatarbild & Anzeigename.",lists:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",goal_person:"Optionales persönliches Punkteziel.",points_entity:"input_number, das die bereits eingelösten Punkte dieser Person speichert (Guthaben = verdient − eingelöst)."};class ze extends ae{constructor(){super(...arguments),this._label=e=>Pe[e.name]??e.name,this._helper=e=>Ce[e.name]}setConfig(e){this._config=e}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}get _settingsData(){const e=this._config.shopping_lists,t=Array.isArray(e)?e:e?[e]:[],i=!1!==this._config.highlight_overdue;return{...this._config,shopping_lists:t,highlight_overdue:i}}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}_settingsChanged(e){e.stopPropagation();const t={...e.detail.value};t.title||delete t.title,t.goal||delete t.goal,t.show_completed||delete t.show_completed,t.kid_mode||delete t.kid_mode,t.shopping_points||delete t.shopping_points,t.bring_deeplink||delete t.bring_deeplink,t.parent_pin||delete t.parent_pin,t.show_leaderboard||delete t.show_leaderboard,t.highlight_overdue&&delete t.highlight_overdue,Array.isArray(t.shopping_lists)&&(0===t.shopping_lists.length?delete t.shopping_lists:1===t.shopping_lists.length&&(t.shopping_lists=t.shopping_lists[0])),this._emit({...this._config,...t,persons:this._persons})}_personChanged(e,t){t.stopPropagation();const i={...t.detail.value};i.color||delete i.color,i.goal||delete i.goal,i.points_entity||delete i.points_entity,Array.isArray(i.lists)&&(0===i.lists.length?delete i.lists:1===i.lists.length&&(i.lists=i.lists[0]));const s=this._persons.map((t,s)=>s===e?i:t);this._emit({...this._config,persons:s})}_personData(e){const t=Array.isArray(e.lists)?e.lists:e.lists?[e.lists]:[];return{...e,lists:t}}_setPersonColor(e,t){const i=this._persons.map((i,s)=>{if(s!==e)return i;const n={...i};return t?n.color=t:delete n.color,n});this._emit({...this._config,persons:i})}_addPerson(){const e=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:e})}_removePerson(e){const t=this._persons.filter((t,i)=>i!==e);this._emit({...this._config,persons:t})}_movePerson(e,t){const i=[...this._persons],s=e+t;s<0||s>=i.length||([i[e],i[s]]=[i[s],i[e]],this._emit({...this._config,persons:i}))}_autoDetect(){const e=new Set(this._persons.map(e=>e.person).filter(Boolean)),t=Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).filter(t=>!e.has(t)).map(e=>({name:this.hass.states[e].attributes?.friendly_name||"",person:e,lists:""}));if(0===t.length)return;const i=this._persons.filter(e=>e.name||e.person||e.lists&&e.lists.length);this._emit({...this._config,persons:[...i,...t]})}_personColor(e,t){return e.color||Ae[t%Ae.length]}render(){return this._config&&this.hass?I`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${Ee}
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

          ${this._persons.map((e,t)=>this._personRow(e,t))}
          ${0===this._persons.length?I`<div class="empty">Noch keine Person. Füge eine hinzu.</div>`:K}

          <button class="add" @click=${this._addPerson}>+ Person hinzufügen</button>
        </div>
      </div>
    `:K}_personRow(e,t){const i=this._personColor(e,t),s=e.name||e.person||`Person ${t+1}`;return I`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${i}"></span>
          <span class="ptitle">${s}</span>
          <span class="spacer"></span>
          <ha-icon-button
            .path=${"M7,15L12,10L17,15H7Z"}
            title="Nach oben"
            .disabled=${0===t}
            @click=${()=>this._movePerson(t,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M7,10L12,15L17,10H7Z"}
            title="Nach unten"
            .disabled=${t===this._persons.length-1}
            @click=${()=>this._movePerson(t,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            title="Entfernen"
            @click=${()=>this._removePerson(t)}
          ></ha-icon-button>
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${this._personData(e)}
          .schema=${Se}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${e=>this._personChanged(t,e)}
        ></ha-form>

        <div class="colors">
          <span class="colors-label">Farbe</span>
          ${Ae.map(i=>I`
              <button
                class="swatch ${e.color===i?"active":""}"
                style="background:${i}"
                title=${i}
                @click=${()=>this._setPersonColor(t,i)}
              ></button>
            `)}
          <button
            class="swatch auto ${e.color?"":"active"}"
            title="Automatisch (Palette)"
            @click=${()=>this._setPersonColor(t,void 0)}
          >
            A
          </button>
        </div>
      </div>
    `}}ze.styles=o`
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
  `,e([ce({attribute:!1})],ze.prototype,"hass",void 0),e([he()],ze.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",ze);var Oe=Object.freeze({__proto__:null,FamilyTaskCardEditor:ze});export{we as FamilyTaskCard};

function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,A=k.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,z=`<${C}>`,O=document,N=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,M="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,j=/>/g,B=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,H=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),V=new WeakMap,q=O.createTreeWalker(O,129);function Z(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===U?"!--"===l[1]?r=L:void 0!==l[1]?r=j:void 0!==l[2]?(F.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=B):void 0!==l[3]&&(r=B):r===B?">"===l[0]?(r=n??U,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?B:'"'===l[3]?H:D):r===H||r===D?r=B:r===L||r===j?r=U:(r=B,n=void 0);const p=r===B&&t[e+1].startsWith("/>")?" ":"";o+=r===U?i+z:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+P+p):i+P+(-2===c?e:p)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=Y.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(F.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),q.nextNode(),a.push({type:2,index:++n});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=q.nextNode(),o++)}return q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=J(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=J(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),o||=!T(a)||a!==this._$AH[r],a===K?t=K:t!==K&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??K)===W)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=k.litHtmlPolyfillSupport;ot?.(Y,X),(k.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(N(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ht(t){return pt({...t,state:!0,attribute:!1})}const ut="Family Task Card",gt=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],ft=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function mt(t,e){return t.color||gt[e%gt.length]}function _t(t){return t.lists?(Array.isArray(t.lists)?t.lists:[t.lists]).filter(Boolean):[]}function bt(t){for(const[e,i]of ft)if(e.test(t))return i;return"📝"}function vt(t,e){if("string"==typeof t)return t.replace(/\{name\}/g,e.name??"").replace(/\{task\}/g,e.task??"");if(Array.isArray(t))return t.map(t=>vt(t,e));if(t&&"object"==typeof t){const i={};for(const[s,n]of Object.entries(t))i[s]=vt(n,e);return i}return t}function yt(t){if(!t.due)return!1;const e=new Date(t.due.length<=10?`${t.due}T23:59:59`:t.due);return!isNaN(e.getTime())&&e.getTime()<Date.now()}function $t(t,e,i){if(t.lists){if(!(Array.isArray(t.lists)?t.lists:[t.lists]).includes(i))return!1}if(t.match)try{if(!new RegExp(t.match,"i").test(e))return!1}catch{return!1}return!0}function xt(t,e){let i=!1;if(e)if(void 0!==t.state){i=(Array.isArray(t.state)?t.state:[t.state]).includes(e.state)}else if(void 0!==t.above||void 0!==t.below){const s=Number(e.state);isNaN(s)||(i=!0,void 0===t.above||s>t.above||(i=!1),void 0===t.below||s<t.below||(i=!1))}else i=!["off","unavailable","unknown","","none","false"].includes(e.state.toLowerCase());return t.invert?!i:i}class kt extends at{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1,this._activeKid=0,this._burst=!1,this._shopPerson=null,this._kidShopOpen=!1,this._pending=null,this._pin="",this._pinError=!1,this._prevOpen={}}static async getConfigElement(){return await Promise.resolve().then(function(){return zt}),document.createElement("family-task-card-editor")}static getStubConfig(t){const e=t?Object.keys(t.states).find(t=>t.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:"Familien-Aufgaben",persons:[{name:"Person 1",lists:e?[e]:[]}]}}setConfig(t){if(!t||!Array.isArray(t.persons))throw new Error('"persons" muss eine Liste sein (mind. eine Person).');this._config={points_per_task:10,...t}}getCardSize(){const t=this._config?.persons?.length??1;return 2+Math.min(t,4)}willUpdate(t){(t.has("hass")||t.has("_config"))&&this.hass&&this._config&&this._refresh()}async _refresh(){if(!this.hass||!this._config||this._loading)return;const t=new Set;for(const e of this._config.persons)for(const i of _t(e))t.add(i);const e=[];for(const i of t){const t=this.hass.states[i],s=t?`${t.state}|${t.last_changed}`:"missing";this._sig[i]!==s&&(this._sig[i]=s,e.push(i))}if(0!==e.length){this._loading=!0;try{const t={...this._items};await Promise.all(e.map(async e=>{try{const i=await this.hass.callWS({type:"todo/item/list",entity_id:e});t[e]=i?.items??[]}catch(i){t[e]=[]}})),this._items=t}finally{this._loading=!1}}}_shoppingSet(){const t=this._config?.shopping_lists,e=t?Array.isArray(t)?t:[t]:[];return new Set(e.filter(Boolean))}_listName(t){return this.hass?.states[t]?.attributes?.friendly_name||"Einkauf"}_bringLink(){return this._config?.bring_deeplink||"https://web.getbring.com"}_personView(t){const e=this._config,i=e.points_per_task??10,s=e.shopping_points??i,n=this._shoppingSet(),o=[],r=[],a=[];let l=0;for(const e of _t(t)){const t=(this._items[e]??[]).map(t=>({entity:e,item:t}));if(n.has(e)){const i=t.filter(t=>"completed"!==t.item.status),n=t.filter(t=>"completed"===t.item.status);i.length>0?a.push({entity:e,name:this._listName(e),open:i}):n.length>0&&(l+=s)}else for(const e of t)("completed"===e.item.status?r:o).push(e)}const c=this._decorate(o);l+=r.length*i;const d=!!t.points_entity,p=d?this._spent(t):0;return{tasksOpen:c,tasksDone:r,shopOpen:a,earned:l,openCount:c.length+a.length,spent:p,balance:l-p,hasWallet:d}}_spent(t){if(!t.points_entity)return 0;const e=Number(this.hass?.states[t.points_entity]?.state);return isNaN(e)?0:e}_decorate(t){const e=this._config?.context_rules??[],i=!1!==this._config?.highlight_overdue,s=[];for(const n of t){let t,o=!1,r="none";for(const i of e)if($t(i,n.item.summary,n.entity)&&xt(i,this.hass?.states[i.entity])){if("hide"===i.effect){o=!0;break}"urgent"===i.effect?(r="urgent",t=i.label??t):"highlight"===i.effect&&"urgent"!==r&&(r="highlight",t=t??i.label)}o||(i&&yt(n.item)&&(r="urgent",t=t??"Überfällig"),s.push({...n,flag:r,label:t}))}const n=t=>"urgent"===t?0:"highlight"===t?1:2;return s.map((t,e)=>({d:t,i:e})).sort((t,e)=>n(t.d.flag)-n(e.d.flag)||t.i-e.i).map(({d:t})=>t)}async _completeShopping(t){await Promise.all(t.open.map(t=>this._toggle(t.entity,t.item,!0))),this._fireCelebrate("task",{name:this._ownerName(t.entity),task:t.name})}_rewards(){return this._config?.rewards??[]}_startRedeem(t,e){const i=this._config?.parent_pin;null!=i&&""!==i?(this._pending={personIdx:t,reward:e},this._pin="",this._pinError=!1):this._doRedeem(t,e)}_confirmRedeem(){if(this._pending)if(this._pin===String(this._config?.parent_pin??"")){const{personIdx:t,reward:e}=this._pending;this._doRedeem(t,e)}else this._pinError=!0}_cancelRedeem(){this._pending=null,this._pin="",this._pinError=!1}async _doRedeem(t,e){const i=this._config?.persons[t];if(!i?.points_entity||!this.hass)return;const s=this._spent(i)+e.cost;this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("input_number","set_value",{entity_id:i.points_entity,value:s}),this._fireCelebrate("reward",{name:this._personName(i,t),task:e.name})}catch(e){this._shopPerson=t}}_personName(t,e){return t.name||(t.person?this.hass?.states[t.person]?.attributes?.friendly_name:"")||`Person ${e+1}`}async _toggle(t,e,i=!1){if(!this.hass)return;const s="completed"===e.status?"needs_action":"completed";this._items={...this._items,[t]:(this._items[t]??[]).map(t=>t.uid===e.uid?{...t,status:s}:t)};try{await this.hass.callService("todo","update_item",{entity_id:t,item:e.uid,status:s}),"completed"!==s||i||this._fireCelebrate("task",{name:this._ownerName(t),task:e.summary})}catch(e){this._sig[t]="",this._refresh()}}render(){if(!this._config)return K;const t=this._config;if(t.kid_mode&&t.persons.length>0)return this._renderKid();let e=0;const i=t.persons.map((t,i)=>{const s=this._personView(t);return e+=s.earned,{p:t,idx:i,view:s}});return I`
      <ha-card>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${t.title||ut}</div>
            <div class="sub">Familien-Aufgaben</div>
          </div>
          ${this._goalBar(e)}
        </div>

        <div class="board">${i.map(t=>this._column(t.p,t.idx,t.view))}</div>
      </ha-card>
    `}_renderKid(){const t=this._config,e=t.persons,i=Math.min(this._activeKid,e.length-1),s=e[i],n=mt(s,i),o=this._personName(s,i),r=this._personView(s),a=r.earned,l=r.openCount,c=s.goal??t.goal,d=c&&c>0?Math.min(100,Math.round(a/c*100)):0,p=0===l,h=this._rewards().length>0,u=r.hasWallet?r.balance:a;return I`
      <ha-card class="kid" style="--pc:${n}">
        ${e.length>1?I`<div class="kid-people">
                ${e.map((t,e)=>this._kidAvatar(t,e,e===i))}
              </div>`:K}

        <div class="kid-hero">
          ${this._kidAvatar(s,i,!1,!0)}
          <div class="kid-hero-text">
            <div class="kid-name">${o}</div>
            <div class="kid-stars">
              ${r.hasWallet?"💰":"⭐"}
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

        ${c&&c>0?I`<div class="kid-bar"><div class="kid-fill" style="width:${d}%"></div></div>`:K}
        ${h&&this._kidShopOpen?this._shopPanel(i,r.balance,r.hasWallet):I`<div class="kid-tasks">
                ${p?I`<div class="kid-alldone">
                        🎉
                        <div>Alles geschafft!</div>
                      </div>`:I`${r.shopOpen.map(t=>this._kidShopping(t,n))}
                      ${r.tasksOpen.map(t=>this._kidTask(t,n))}`}
              </div>`}
        ${this._burst?I`<div class="burst">⭐</div>`:K}
      </ha-card>
    `}_kidAvatar(t,e,i,s=!1){const n=mt(t,e),o=this._personName(t,e),r=t.person?this.hass?.states[t.person]:void 0,a=r?.attributes?.entity_picture,l=o.slice(0,2).toUpperCase(),c=`kid-av ${s?"big":""} ${i?"active":""}`,d=a?`background-image:url('${a}');box-shadow:0 0 0 3px ${n}`:`background:${n}`,p=a?K:I`<span>${l}</span>`;return s?I`<div class="${c}" style="${d}">${p}</div>`:I`<button
          class="${c}"
          style="${d}"
          title=${o}
          @click=${()=>this._activeKid=e}
        >
          ${p}
        </button>`}_kidTask(t,e){const{entity:i,item:s,flag:n,label:o}=t,r="urgent"===n?"⚠️":bt(s.summary);return I`
      <button
        class="kid-task ${n}"
        style="--pc:${e}"
        @click=${()=>this._kidComplete(i,s)}
      >
        <span class="kid-emoji">${r}</span>
        <span class="kid-task-title">
          ${s.summary}${o?I`<span class="kid-sub">${o}</span>`:K}
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
    `}_celebrate(){this._burst=!0,this._burstTimer&&clearTimeout(this._burstTimer),this._burstTimer=window.setTimeout(()=>{this._burst=!1},900)}_ownerName(t){const e=this._config?.persons??[];for(let i=0;i<e.length;i++)if(_t(e[i]).includes(t))return this._personName(e[i],i)}_fireCelebrate(t,e){const i=this._config?.celebrate;if(!i||!this.hass||!Array.isArray(i.actions))return;if((i.on?Array.isArray(i.on)?i.on:[i.on]:["all_done"]).includes(t))for(const t of i.actions){if(!t?.service||!t.service.includes("."))continue;const[i,...s]=t.service.split("."),n=s.join("."),o=vt(t.data??{},e),r=t.target?vt(t.target,e):void 0;Promise.resolve(this.hass.callService(i,n,o,r)).catch(()=>{})}}updated(){this._config?.celebrate&&this._config.persons.forEach((t,e)=>{const i=this._personView(t).openCount,s=this._prevOpen[e];this._prevOpen[e]=i,void 0!==s&&s>0&&0===i&&this._fireCelebrate("all_done",{name:this._personName(t,e)})})}async _kidComplete(t,e){this._celebrate(),await this._toggle(t,e)}async _kidCompleteShopping(t){this._celebrate(),await this._completeShopping(t)}disconnectedCallback(){super.disconnectedCallback(),this._burstTimer&&clearTimeout(this._burstTimer)}_goalBar(t){const e=this._config?.goal;if(!e||e<=0)return I`<div class="fam-pts">⭐ ${t}</div>`;const i=Math.max(0,Math.min(100,Math.round(t/e*100)));return I`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${t}</span><span class="goal-target">Ziel ${e}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${i}%"></div></div>
      </div>
    `}_column(t,e,i){const s=mt(t,e),n=this._personName(t,e),o=t.person?this.hass?.states[t.person]:void 0,r=o?.attributes?.entity_picture,a=n.slice(0,2).toUpperCase(),l=this._config?.show_completed,c=0===i.openCount&&(!l||0===i.tasksDone.length),d=this._rewards().length>0,p=this._shopPerson===e,h=i.hasWallet?i.balance:i.earned;return I`
      <div class="col" style="--pc:${s}">
        <div class="col-head">
          ${r?I`<div
                  class="avatar"
                  style="background-image:url('${r}');box-shadow:0 0 0 2px ${s}55"
                ></div>`:I`<div class="avatar initials" style="background:${s}">${a}</div>`}
          <div class="col-meta">
            <div class="pname">${n}</div>
            <div class="pstatus">
              ${i.openCount} offen · ${i.hasWallet?"💰":"⭐"} ${h}
            </div>
          </div>
          ${d?I`<button
                  class="shop-toggle ${p?"active":""}"
                  title="Belohnungen"
                  @click=${()=>{this._shopPerson=p?null:e,this._cancelRedeem()}}
                >
                  🎁
                </button>`:K}
        </div>

        <div class="tiles">
          ${c?I`<div class="empty">Alles erledigt 🎉</div>`:K}
          ${i.shopOpen.map(t=>this._shoppingTile(t,s))}
          ${i.tasksOpen.map(t=>this._tile(t,s,!1,t.flag,t.label))}
          ${l?i.tasksDone.map(t=>this._tile(t,s,!0)):K}
        </div>

        ${p?this._shopPanel(e,i.balance,i.hasWallet):K}
      </div>
    `}_shopPanel(t,e,i){const s=this._rewards(),n=this._pending?.personIdx===t?this._pending:null;return I`
      <div class="shop">
        <div class="shop-head">
          <span>🎁 Belohnungen</span>
          <span class="shop-balance">Guthaben ${i?"💰":"⭐"} ${e}</span>
        </div>
        ${i?K:I`<div class="shop-note">
                Kein Guthaben-Helfer (<code>points_entity</code>, ein
                <code>input_number</code>) gesetzt – Einlösen ist deaktiviert.
              </div>`}
        ${s.map(s=>{const n=i&&e>=s.cost;return I`
            <div class="reward ${n?"":"locked"}">
              <span class="reward-emoji">${s.emoji||"🎁"}</span>
              <span class="reward-name">${s.name}</span>
              <span class="reward-cost">⭐ ${s.cost}</span>
              <button
                class="reward-btn"
                ?disabled=${!n}
                @click=${()=>this._startRedeem(t,s)}
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
          @input=${t=>{this._pin=t.target.value,this._pinError=!1}}
          @keydown=${t=>{"Enter"===t.key&&this._confirmRedeem(),"Escape"===t.key&&this._cancelRedeem()}}
        />
        <button class="pin-ok" @click=${this._confirmRedeem}>OK</button>
        <button class="pin-cancel" title="Abbrechen" @click=${this._cancelRedeem}>✕</button>
        ${this._pinError?I`<span class="pin-msg">Falsche PIN</span>`:K}
      </div>
    `}_shoppingTile(t,e){const i=t.open.length;return I`
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
          <div class="tile-due">${i} Artikel</div>
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
    `}_tile(t,e,i,s="none",n){const{entity:o,item:r}=t,a="urgent"===s?"⚠️":bt(r.summary);return I`
      <div
        class="tile ${i?"done":s}"
        style="--pc:${e}"
        role="button"
        tabindex="0"
        @click=${()=>this._toggle(o,r)}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(o,r))}}
      >
        <div class="check">${i?"✓":""}</div>
        <div class="tile-emoji">${a}</div>
        <div class="tile-text">
          <div class="tile-title">${r.summary}</div>
          ${n?I`<div class="tile-flag">${n}</div>`:r.due?I`<div class="tile-due">${this._formatDue(r.due)}</div>`:K}
        </div>
      </div>
    `}_formatDue(t){const e=new Date(t.length<=10?`${t}T00:00:00`:t);if(isNaN(e.getTime()))return t;const i=this.hass?.locale?.language||"de",s=new Date;return e.toDateString()===s.toDateString()?"heute":new Intl.DateTimeFormat(i,{weekday:"short",day:"numeric",month:"short"}).format(e)}}kt.styles=r`
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
      padding: 6px 12px;
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
  `,t([pt({attribute:!1})],kt.prototype,"hass",void 0),t([ht()],kt.prototype,"_config",void 0),t([ht()],kt.prototype,"_items",void 0),t([ht()],kt.prototype,"_activeKid",void 0),t([ht()],kt.prototype,"_burst",void 0),t([ht()],kt.prototype,"_shopPerson",void 0),t([ht()],kt.prototype,"_kidShopOpen",void 0),t([ht()],kt.prototype,"_pending",void 0),t([ht()],kt.prototype,"_pin",void 0),t([ht()],kt.prototype,"_pinError",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",kt),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:ut,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const wt=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],At=[{name:"title",selector:{text:{}}},{name:"points_per_task",selector:{number:{min:0,max:1e3,mode:"box",step:1}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"show_completed",selector:{boolean:{}}},{name:"kid_mode",selector:{boolean:{}}},{name:"highlight_overdue",selector:{boolean:{}}},{name:"shopping_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"shopping_points",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"bring_deeplink",selector:{text:{}}},{name:"parent_pin",selector:{text:{}}}],Et=[{name:"name",selector:{text:{}}},{name:"person",selector:{entity:{filter:{domain:"person"}}}},{name:"lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"points_entity",selector:{entity:{filter:{domain:"input_number"}}}}],St={title:"Titel",points_per_task:"Punkte pro Aufgabe",goal:"Ziel (Punkte)",show_completed:"Erledigte anzeigen",kid_mode:"Kinder-Modus",highlight_overdue:"Überfällige hervorheben",shopping_lists:"Einkaufslisten (Bring!)",shopping_points:"Punkte pro Einkauf",bring_deeplink:"Bring!-Link",parent_pin:"Eltern-PIN (Belohnungen)",name:"Name",person:"Person (Avatar)",lists:"Aufgabenlisten (todo.*)",points_entity:"Guthaben-Helfer (input_number)"},Pt={points_per_task:"Punkte je erledigter Aufgabe (Standard 10).",goal:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",show_completed:"Erledigte Aufgaben ausgegraut mitanzeigen.",kid_mode:"Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",highlight_overdue:"Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Weitere Kontext-Regeln per YAML (context_rules).",shopping_lists:"Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",shopping_points:"Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",bring_deeplink:"Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",parent_pin:"PIN, die zum Einlösen einer Belohnung abgefragt wird (Eltern-Freigabe). Belohnungen selbst per YAML (rewards).",person:"Optional: person.* liefert Avatarbild & Anzeigename.",lists:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",goal_person:"Optionales persönliches Punkteziel.",points_entity:"input_number, das die bereits eingelösten Punkte dieser Person speichert (Guthaben = verdient − eingelöst)."};class Ct extends at{constructor(){super(...arguments),this._label=t=>St[t.name]??t.name,this._helper=t=>Pt[t.name]}setConfig(t){this._config=t}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}get _settingsData(){const t=this._config.shopping_lists,e=Array.isArray(t)?t:t?[t]:[],i=!1!==this._config.highlight_overdue;return{...this._config,shopping_lists:e,highlight_overdue:i}}_emit(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_settingsChanged(t){t.stopPropagation();const e={...t.detail.value};e.title||delete e.title,e.goal||delete e.goal,e.show_completed||delete e.show_completed,e.kid_mode||delete e.kid_mode,e.shopping_points||delete e.shopping_points,e.bring_deeplink||delete e.bring_deeplink,e.parent_pin||delete e.parent_pin,e.highlight_overdue&&delete e.highlight_overdue,Array.isArray(e.shopping_lists)&&(0===e.shopping_lists.length?delete e.shopping_lists:1===e.shopping_lists.length&&(e.shopping_lists=e.shopping_lists[0])),this._emit({...this._config,...e,persons:this._persons})}_personChanged(t,e){e.stopPropagation();const i={...e.detail.value};i.color||delete i.color,i.goal||delete i.goal,i.points_entity||delete i.points_entity,Array.isArray(i.lists)&&(0===i.lists.length?delete i.lists:1===i.lists.length&&(i.lists=i.lists[0]));const s=this._persons.map((e,s)=>s===t?i:e);this._emit({...this._config,persons:s})}_personData(t){const e=Array.isArray(t.lists)?t.lists:t.lists?[t.lists]:[];return{...t,lists:e}}_setPersonColor(t,e){const i=this._persons.map((i,s)=>{if(s!==t)return i;const n={...i};return e?n.color=e:delete n.color,n});this._emit({...this._config,persons:i})}_addPerson(){const t=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:t})}_removePerson(t){const e=this._persons.filter((e,i)=>i!==t);this._emit({...this._config,persons:e})}_movePerson(t,e){const i=[...this._persons],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._emit({...this._config,persons:i}))}_autoDetect(){const t=new Set(this._persons.map(t=>t.person).filter(Boolean)),e=Object.keys(this.hass.states).filter(t=>t.startsWith("person.")).filter(e=>!t.has(e)).map(t=>({name:this.hass.states[t].attributes?.friendly_name||"",person:t,lists:""}));if(0===e.length)return;const i=this._persons.filter(t=>t.name||t.person||t.lists&&t.lists.length);this._emit({...this._config,persons:[...i,...e]})}_personColor(t,e){return t.color||wt[e%wt.length]}render(){return this._config&&this.hass?I`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${At}
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
    `:K}_personRow(t,e){const i=this._personColor(t,e),s=t.name||t.person||`Person ${e+1}`;return I`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${i}"></span>
          <span class="ptitle">${s}</span>
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
          .schema=${Et}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${t=>this._personChanged(e,t)}
        ></ha-form>

        <div class="colors">
          <span class="colors-label">Farbe</span>
          ${wt.map(i=>I`
              <button
                class="swatch ${t.color===i?"active":""}"
                style="background:${i}"
                title=${i}
                @click=${()=>this._setPersonColor(e,i)}
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
  `,t([pt({attribute:!1})],Ct.prototype,"hass",void 0),t([ht()],Ct.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",Ct);var zt=Object.freeze({__proto__:null,FamilyTaskCardEditor:Ct});export{kt as FamilyTaskCard};

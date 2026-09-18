function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,_?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,E=A.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,O=`<${C}>`,U=document,z=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,L=/>/g,D=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,Z=U.createTreeWalker(U,129);function G(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(n.lastIndex=h,l=n.exec(s),null!==l);)h=n.lastIndex,n===N?"!--"===l[1]?n=R:void 0!==l[1]?n=L:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=o??N,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?D:'"'===l[3]?B:j):n===B||n===j?n=D:n===R||n===L?n=N:(n=D,o=void 0);const d=n===D&&t[e+1].startsWith("/>")?" ":"";r+=n===N?s+O:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+P+d):s+P+(-2===c?e:d)}return[G(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,s),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Z.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[r++],s=i.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?et:"?"===n[1]?st:"@"===n[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),Z.nextNode(),a.push({type:2,index:++o});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Y(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);Z.currentNode=i;let o=Z.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=Z.nextNode(),r++)}return Z.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(G(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(K,X),(A.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(z(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=ct,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function dt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function pt(t){return dt({...t,state:!0,attribute:!1})}const ut="Family Task Card",mt=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],ft=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function gt(t){return t.lists?(Array.isArray(t.lists)?t.lists:[t.lists]).filter(Boolean):[]}class _t extends at{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return wt}),document.createElement("family-task-card-editor")}static getStubConfig(t){const e=t?Object.keys(t.states).find(t=>t.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:"Familien-Aufgaben",persons:[{name:"Person 1",lists:e?[e]:[]}]}}setConfig(t){if(!t||!Array.isArray(t.persons))throw new Error('"persons" muss eine Liste sein (mind. eine Person).');this._config={points_per_task:10,...t}}getCardSize(){const t=this._config?.persons?.length??1;return 2+Math.min(t,4)}willUpdate(t){(t.has("hass")||t.has("_config"))&&this.hass&&this._config&&this._refresh()}async _refresh(){if(!this.hass||!this._config||this._loading)return;const t=new Set;for(const e of this._config.persons)for(const s of gt(e))t.add(s);const e=[];for(const s of t){const t=this.hass.states[s],i=t?`${t.state}|${t.last_changed}`:"missing";this._sig[s]!==i&&(this._sig[s]=i,e.push(s))}if(0!==e.length){this._loading=!0;try{const t={...this._items};await Promise.all(e.map(async e=>{try{const s=await this.hass.callWS({type:"todo/item/list",entity_id:e});t[e]=s?.items??[]}catch(s){t[e]=[]}})),this._items=t}finally{this._loading=!1}}}_itemsFor(t){const e=[];for(const s of gt(t))for(const t of this._items[s]??[])e.push({entity:s,item:t});return e}_personName(t,e){return t.name||(t.person?this.hass?.states[t.person]?.attributes?.friendly_name:"")||`Person ${e+1}`}async _toggle(t,e){if(!this.hass)return;const s="completed"===e.status?"needs_action":"completed";this._items={...this._items,[t]:(this._items[t]??[]).map(t=>t.uid===e.uid?{...t,status:s}:t)};try{await this.hass.callService("todo","update_item",{entity_id:t,item:e.uid,status:s})}catch(e){this._sig[t]="",this._refresh()}}render(){if(!this._config)return q;const t=this._config,e=t.points_per_task??10;let s=0;const i=t.persons.map((t,i)=>{const o=this._itemsFor(t),r=o.filter(t=>"completed"!==t.item.status),n=o.filter(t=>"completed"===t.item.status);return s+=n.length*e,{p:t,idx:i,open:r,done:n}});return I`
      <ha-card>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${t.title||ut}</div>
            <div class="sub">Familien-Aufgaben</div>
          </div>
          ${this._goalBar(s)}
        </div>

        <div class="board">
          ${i.map(t=>this._column(t.p,t.idx,t.open,t.done,e))}
        </div>
      </ha-card>
    `}_goalBar(t){const e=this._config?.goal;if(!e||e<=0)return I`<div class="fam-pts">⭐ ${t}</div>`;const s=Math.max(0,Math.min(100,Math.round(t/e*100)));return I`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${t}</span><span class="goal-target">Ziel ${e}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${s}%"></div></div>
      </div>
    `}_column(t,e,s,i,o){const r=function(t,e){return t.color||mt[e%mt.length]}(t,e),n=this._personName(t,e),a=t.person?this.hass?.states[t.person]:void 0,l=a?.attributes?.entity_picture,c=n.slice(0,2).toUpperCase(),h=i.length*o,d=this._config?.show_completed;return I`
      <div class="col" style="--pc:${r}">
        <div class="col-head">
          ${l?I`<div
                  class="avatar"
                  style="background-image:url('${l}');box-shadow:0 0 0 2px ${r}55"
                ></div>`:I`<div class="avatar initials" style="background:${r}">${c}</div>`}
          <div class="col-meta">
            <div class="pname">${n}</div>
            <div class="pstatus">${s.length} offen · ⭐ ${h}</div>
          </div>
        </div>

        <div class="tiles">
          ${0!==s.length||d&&0!==i.length?q:I`<div class="empty">Alles erledigt 🎉</div>`}
          ${s.map(t=>this._tile(t,r,!1))}
          ${d?i.map(t=>this._tile(t,r,!0)):q}
        </div>
      </div>
    `}_tile(t,e,s){const{entity:i,item:o}=t,r=function(t){for(const[e,s]of ft)if(e.test(t))return s;return"📝"}(o.summary);return I`
      <div
        class="tile ${s?"done":""}"
        style="--pc:${e}"
        role="button"
        tabindex="0"
        @click=${()=>this._toggle(i,o)}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggle(i,o))}}
      >
        <div class="check">${s?"✓":""}</div>
        <div class="tile-emoji">${r}</div>
        <div class="tile-text">
          <div class="tile-title">${o.summary}</div>
          ${o.due?I`<div class="tile-due">${this._formatDue(o.due)}</div>`:q}
        </div>
      </div>
    `}_formatDue(t){const e=new Date(t.length<=10?`${t}T00:00:00`:t);if(isNaN(e.getTime()))return t;const s=this.hass?.locale?.language||"de",i=new Date;return e.toDateString()===i.toDateString()?"heute":new Intl.DateTimeFormat(s,{weekday:"short",day:"numeric",month:"short"}).format(e)}}_t.styles=n`
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
  `,t([dt({attribute:!1})],_t.prototype,"hass",void 0),t([pt()],_t.prototype,"_config",void 0),t([pt()],_t.prototype,"_items",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",_t),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:ut,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const $t=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],vt=[{name:"title",selector:{text:{}}},{name:"points_per_task",selector:{number:{min:0,max:1e3,mode:"box",step:1}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"show_completed",selector:{boolean:{}}}],yt=[{name:"name",selector:{text:{}}},{name:"person",selector:{entity:{filter:{domain:"person"}}}},{name:"lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}}],bt={title:"Titel",points_per_task:"Punkte pro Aufgabe",goal:"Ziel (Punkte)",show_completed:"Erledigte anzeigen",name:"Name",person:"Person (Avatar)",lists:"Aufgabenlisten (todo.*)"},xt={points_per_task:"Punkte je erledigter Aufgabe (Standard 10).",goal:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",show_completed:"Erledigte Aufgaben ausgegraut mitanzeigen.",person:"Optional: person.* liefert Avatarbild & Anzeigename.",lists:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",goal_person:"Optionales persönliches Punkteziel."};class At extends at{constructor(){super(...arguments),this._label=t=>bt[t.name]??t.name,this._helper=t=>xt[t.name]}setConfig(t){this._config=t}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}_emit(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_settingsChanged(t){t.stopPropagation();const e={...t.detail.value};e.title||delete e.title,e.goal||delete e.goal,e.show_completed||delete e.show_completed,this._emit({...this._config,...e,persons:this._persons})}_personChanged(t,e){e.stopPropagation();const s={...e.detail.value};s.color||delete s.color,s.goal||delete s.goal,Array.isArray(s.lists)&&(0===s.lists.length?delete s.lists:1===s.lists.length&&(s.lists=s.lists[0]));const i=this._persons.map((e,i)=>i===t?s:e);this._emit({...this._config,persons:i})}_personData(t){const e=Array.isArray(t.lists)?t.lists:t.lists?[t.lists]:[];return{...t,lists:e}}_setPersonColor(t,e){const s=this._persons.map((s,i)=>{if(i!==t)return s;const o={...s};return e?o.color=e:delete o.color,o});this._emit({...this._config,persons:s})}_addPerson(){const t=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:t})}_removePerson(t){const e=this._persons.filter((e,s)=>s!==t);this._emit({...this._config,persons:e})}_movePerson(t,e){const s=[...this._persons],i=t+e;i<0||i>=s.length||([s[t],s[i]]=[s[i],s[t]],this._emit({...this._config,persons:s}))}_autoDetect(){const t=new Set(this._persons.map(t=>t.person).filter(Boolean)),e=Object.keys(this.hass.states).filter(t=>t.startsWith("person.")).filter(e=>!t.has(e)).map(t=>({name:this.hass.states[t].attributes?.friendly_name||"",person:t,lists:""}));if(0===e.length)return;const s=this._persons.filter(t=>t.name||t.person||t.lists&&t.lists.length);this._emit({...this._config,persons:[...s,...e]})}_personColor(t,e){return t.color||$t[e%$t.length]}render(){return this._config&&this.hass?I`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${vt}
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
          ${0===this._persons.length?I`<div class="empty">Noch keine Person. Füge eine hinzu.</div>`:q}

          <button class="add" @click=${this._addPerson}>+ Person hinzufügen</button>
        </div>
      </div>
    `:q}_personRow(t,e){const s=this._personColor(t,e),i=t.name||t.person||`Person ${e+1}`;return I`
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
          .schema=${yt}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${t=>this._personChanged(e,t)}
        ></ha-form>

        <div class="colors">
          <span class="colors-label">Farbe</span>
          ${$t.map(s=>I`
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
    `}}At.styles=n`
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
  `,t([dt({attribute:!1})],At.prototype,"hass",void 0),t([pt()],At.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",At);var wt=Object.freeze({__proto__:null,FamilyTaskCardEditor:At});export{_t as FamilyTaskCard};

function e(e,t,i,s){var n,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,m=g?g.emptyScript:"",f=_.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!d(e,t),k={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=k){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);n?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??k}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=s;const o=n.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(void 0!==e){const o=this.constructor;if(!1===s&&(n=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??y)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==n||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,f?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,x=e=>e,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,z=`<${C}>`,T=document,M=()=>T.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,O="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,B=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),q=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,Y=T.createTreeWalker(T,129);function G(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,s=[];let n,o=2===t?"<svg>":3===t?"<math>":"",r=D;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===D?"!--"===d[1]?r=R:void 0!==d[1]?r=j:void 0!==d[2]?(H.test(d[2])&&(n=RegExp("</"+d[2],"g")),r=B):void 0!==d[3]&&(r=B):r===B?">"===d[0]?(r=n??D,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?B:'"'===d[3]?U:F):r===U||r===F?r=B:r===R||r===j?r=D:(r=B,n=void 0);const h=r===B&&e[t+1].startsWith("/>")?" ":"";o+=r===D?i+z:l>=0?(s.push(a),i.slice(0,l)+P+i.slice(l)+E+h):i+E+(-2===l?t:h)}return[G(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0;const r=e.length-1,a=this.parts,[d,l]=V(e,t);if(this.el=Z.createElement(d,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=Y.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(P)){const t=l[o++],i=s.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:n}),s.removeAttribute(e));if(H.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],M()),Y.nextNode(),a.push({type:2,index:++n});s.append(e[t],M())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)a.push({type:7,index:n}),e+=E.length-1}n++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===q)return t;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(e),n._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(t=J(e,n._$AS(e,t.values),n,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??T).importNode(t,!0);Y.currentNode=s;let n=Y.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Q(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new ne(n,this,e)),this._$AV.push(t),a=i[++r]}o!==a?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=T,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new Z(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,s){const n=this.strings;let o=!1;if(void 0===n)e=J(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==q,o&&(this._$AH=e);else{const s=e;let r,a;for(e=n[0],r=0;r<n.length-1;r++)a=J(this,s[i+r],t,r),a===q&&(a=this._$AH[r]),o||=!N(a)||a!==this._$AH[r],a===K?e=K:e!==K&&(e+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class se extends ee{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??K)===q)return;const i=this._$AH,s=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=$.litHtmlPolyfillSupport;oe?.(Z,Q),($.litHtmlVersions??=[]).push("3.3.3");const re=globalThis;class ae extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let n=s._$litPart$;if(void 0===n){const e=i?.renderBefore??null;s._$litPart$=n=new Q(t.insertBefore(M(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ae._$litElement$=!0,ae.finalized=!0,re.litElementHydrateSupport?.({LitElement:ae});const de=re.litElementPolyfillSupport;de?.({LitElement:ae}),(re.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ce=(e=le,t,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,n,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];t.call(this,i),this.requestUpdate(s,n,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function he(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function pe(e){return he({...e,state:!0,attribute:!1})}const ue={subtitle:{de:"Familien-Aufgaben",en:"Family tasks"},open:{de:"offen",en:"open"},all_done_board:{de:"Alles erledigt 🎉",en:"All done 🎉"},all_done_kid:{de:"Alles geschafft!",en:"All done!"},shopping:{de:"Einkauf",en:"Shopping"},items:{de:"Artikel",en:"items"},open_app:{de:"Öffnen",en:"Open"},today:{de:"heute",en:"today"},overdue:{de:"Überfällig",en:"Overdue"},due_soon:{de:"Bald fällig",en:"Due soon"},no_toggle:{de:"Diese Liste unterstützt kein Abhaken",en:"This list can't be checked off"},add_task:{de:"Aufgabe hinzufügen…",en:"Add task…"},rewards:{de:"Belohnungen",en:"Rewards"},balance:{de:"Guthaben",en:"Balance"},no_wallet_1:{de:"Kein Guthaben-Helfer (",en:"No points helper ("},no_wallet_2:{de:") gesetzt – Einlösen ist deaktiviert.",en:") set — redeeming is disabled."},redeem:{de:"Einlösen",en:"Redeem"},request:{de:"Anfragen",en:"Request"},waiting:{de:"wartet auf Freigabe",en:"waiting for approval"},approve:{de:"Freigeben",en:"Approve"},deny:{de:"Ablehnen",en:"Deny"},parent_pin:{de:"Eltern-PIN:",en:"Parent PIN:"},cancel:{de:"Abbrechen",en:"Cancel"},wrong_pin:{de:"Falsche PIN",en:"Wrong PIN"},leaderboard:{de:"🏆 Rangliste",en:"🏆 Leaderboard"},lb_week:{de:"diese Woche",en:"this week"},lb_month:{de:"diesen Monat",en:"this month"},lb_all:{de:"Gesamt",en:"All time"},streak_title:{de:"{n} Tage am Stück",en:"{n} days in a row"},level:{de:"Level",en:"Level"},to_next:{de:"zum nächsten",en:"to next"},goal:{de:"Ziel",en:"Goal"},persons:{de:"Personen",en:"Persons"},detect_persons:{de:"Personen erkennen",en:"Detect persons"},detect_persons_hint:{de:"person.*-Entitäten übernehmen",en:"Import person.* entities"},no_persons:{de:"Noch keine Person. Füge eine hinzu.",en:"No person yet. Add one."},add_person:{de:"+ Person hinzufügen",en:"+ Add person"},color:{de:"Farbe",en:"Color"},color_auto:{de:"Automatisch (Palette)",en:"Automatic (palette)"},move_up:{de:"Nach oben",en:"Move up"},move_down:{de:"Nach unten",en:"Move down"},remove:{de:"Entfernen",en:"Remove"},person_fallback:{de:"Person",en:"Person"},sort_manual:{de:"Manuell",en:"Manual"},sort_due:{de:"Nach Fälligkeit",en:"By due date"},sort_alpha:{de:"Alphabetisch",en:"Alphabetical"},theme_auto:{de:"Automatisch (HA-Theme)",en:"Automatic (HA theme)"},theme_dark:{de:"Dunkel",en:"Dark"},theme_light:{de:"Hell",en:"Light"},who_is_it:{de:"Wer ist dran?",en:"Who's there?"},matrix_sub:{de:"Wichtig × dringend",en:"Important × urgent"},quad_do:{de:"🔴 Jetzt erledigen",en:"🔴 Do now"},quad_do_hint:{de:"wichtig & dringend",en:"important & urgent"},quad_plan:{de:"🗓 Einplanen",en:"🗓 Schedule"},quad_plan_hint:{de:"wichtig, nicht dringend",en:"important, not urgent"},quad_delegate:{de:"👥 Delegieren",en:"👥 Delegate"},quad_delegate_hint:{de:"dringend, nicht wichtig",en:"urgent, not important"},quad_later:{de:"💤 Später",en:"💤 Later"},quad_later_hint:{de:"weder dringend noch wichtig",en:"neither urgent nor important"},grp_overdue:{de:"🔴 Überfällig",en:"🔴 Overdue"},grp_today:{de:"📌 Heute",en:"📌 Today"},grp_soon:{de:"📅 Bald",en:"📅 Soon"},grp_later:{de:"🗓 Später",en:"🗓 Later"},grp_undated:{de:"📥 Ohne Termin",en:"📥 No date"},rot_next_week:{de:"nächste Woche",en:"next week"},rot_next_day:{de:"morgen",en:"tomorrow"},rot_week:{de:"Wöchentlich (ab Montag)",en:"Weekly (from Monday)"},rot_day:{de:"Täglich",en:"Daily"},err_no_persons:{de:'"persons" muss eine Liste sein (mind. eine Person).',en:'"persons" must be a list with at least one person.'}};function _e(e){return(e?.locale?.language||("undefined"==typeof navigator?"":navigator.language)||"en").toLowerCase().startsWith("de")?"de":"en"}function ge(e,t){const i=ue[t];return i?i[_e(e)]??i.de:t}const me=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],fe=864e5;function ve(e,t){const i=function(e){return Math.round(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/fe)}(e);return"day"===t?i:Math.floor((i-4)/7)}const be=e=>new Date(e*fe).toISOString().slice(0,10);function ye(e,t){if("day"===t)return{start:be(e),end:be(e)};const i=7*e+4;return{start:be(i),end:be(i+6)}}const ke=(e,t)=>(e%t+t)%t;function we(e,t){const i=e.due?e.due.slice(0,10):void 0;return i&&i>=t.start?null:{..."completed"===e.status?{status:"needs_action"}:{},due_date:t.end}}const $e="Family Task Card",xe=["🌱","⭐","🔥","🏅","🏆","👑"],Ae=me,Se=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function Pe(e,t){return e.color||Ae[t%Ae.length]}function Ee(e){return e.lists?(Array.isArray(e.lists)?e.lists:[e.lists]).filter(Boolean):[]}function Ce(e){return Ee(e).map(e=>"string"==typeof e?e:e.entity).filter(Boolean)}const ze=["do","plan","delegate","later"];function Te(e,t){return t?e?"do":"plan":e?"delegate":"later"}function Me(e){return e.trimStart().startsWith("!")}const Ne=["overdue","today","soon","later","undated"],Le=new Set(["later","undated"]);function Oe(e){const t=je(e.due);if(!t)return"undated";if(Fe(e))return"overdue";const i=Be(t.day);return i<=0?"today":i<=7?"soon":"later"}function De(e){for(const[t,i]of Se)if(t.test(e))return i;return"📝"}function Re(e,t){if("string"==typeof e)return e.replace(/\{name\}/g,t.name??"").replace(/\{task\}/g,t.task??"");if(Array.isArray(e))return e.map(e=>Re(e,t));if(e&&"object"==typeof e){const i={};for(const[s,n]of Object.entries(e))i[s]=Re(n,t);return i}return e}function je(e){if(!e)return;const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t)return{day:new Date(+t[1],+t[2]-1,+t[3])};const i=new Date(e);return isNaN(i.getTime())?void 0:i.getHours()+i.getMinutes()+i.getSeconds()+i.getMilliseconds()===0?{day:new Date(i.getFullYear(),i.getMonth(),i.getDate())}:i.getUTCHours()+i.getUTCMinutes()+i.getUTCSeconds()+i.getUTCMilliseconds()===0?{day:new Date(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate())}:{day:new Date(i.getFullYear(),i.getMonth(),i.getDate()),at:i}}function Be(e){const t=new Date,i=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())-i)/864e5)}function Fe(e){const t=je(e.due);return!!t&&(t.at?t.at.getTime()<Date.now():Be(t.day)<0)}function Ue(e,t){const i=je(e.due);return!(!i||t<=0||Fe(e))&&Be(i.day)<=t}function He(e,t,i){if(e.lists){if(!(Array.isArray(e.lists)?e.lists:[e.lists]).includes(i))return!1}if(e.match)try{if(!new RegExp(e.match,"i").test(t))return!1}catch{return!1}return!0}function Ie(e,t){let i=!1;if(t)if(void 0!==e.state){i=(Array.isArray(e.state)?e.state:[e.state]).includes(t.state)}else if(void 0!==e.above||void 0!==e.below){const s=Number(t.state);isNaN(s)||(i=!0,void 0===e.above||s>e.above||(i=!1),void 0===e.below||s<e.below||(i=!1))}else i=!["off","unavailable","unknown","","none","false"].includes(t.state.toLowerCase());return e.invert?!i:i}class qe extends ae{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1,this._activeKid=0,this._burst=!1,this._shopPerson=null,this._kidShopOpen=!1,this._pending=null,this._pin="",this._pinError=!1,this._prevOpen={},this._kioskIdle=!0,this._rotSent=new Set,this._reported=new Set,this._expanded={}}static async getConfigElement(){return await Promise.resolve().then(function(){return et}),document.createElement("family-task-card-editor")}static getStubConfig(e){const t=e?Object.keys(e.states).find(e=>e.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:"Familien-Aufgaben",persons:[{name:"Person 1",lists:t?[t]:[]}]}}setConfig(e){if(!e||!Array.isArray(e.persons))throw new Error(ge(this.hass,"err_no_persons"));this._config={points_per_task:10,...e}}getCardSize(){const e=this._config?.persons?.length??1;return 2+Math.min(e,4)}willUpdate(e){(e.has("hass")||e.has("_config"))&&this.hass&&this._config&&this._refresh()}async _refresh(){if(!this.hass||!this._config||this._loading)return;const e=new Set;for(const t of this._config.persons)for(const i of Ce(t))e.add(i);for(const t of this._rotationLists())e.add(t);const t=[];for(const i of e){const e=this.hass.states[i],s=e?`${e.state}|${e.last_changed}`:"missing";this._sig[i]!==s&&(this._sig[i]=s,t.push(i))}if(0!==t.length){this._loading=!0;try{const e={...this._items};await Promise.all(t.map(async t=>{try{const i=await this.hass.callWS({type:"todo/item/list",entity_id:t});e[t]=i?.items??[]}catch(i){e[t]=[]}})),this._items=e}finally{this._loading=!1}}}_shoppingSet(){const e=this._config?.shopping_lists,t=e?Array.isArray(e)?e:[e]:[];return new Set(t.filter(Boolean))}_listName(e){return this.hass?.states[e]?.attributes?.friendly_name||this._t("shopping")}_bringLink(){return this._config?.bring_deeplink||"https://web.getbring.com"}_levelInfo(e){return function(e,t,i){if(!t||t<=0)return null;const s=Math.floor(e/t)+1;return{level:s,pct:Math.round(e%t/t*100),emoji:i[Math.min(s-1,i.length-1)]??"⭐"}}(e,this._config?.level_size??100,this._config?.level_emojis??xe)}_t(e){return ge(this.hass,e)}_themeClass(){const e=this._config?.theme;return"dark"===e?"theme-dark":"light"===e?"theme-light":""}_canToggle(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(4&t)}_canCreate(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(1&t)}_addEntityFor(e){const t=this._shoppingSet();return this._ownLists(e).find(e=>!t.has(e)&&this._canCreate(e))}_rotationLists(){const e=this._config;if(!e?.rotation||!e.rotation_lists)return[];return(Array.isArray(e.rotation_lists)?e.rotation_lists:[e.rotation_lists]).filter(Boolean)}_ownLists(e){const t=this._rotationLists();return t.length?Ce(e).filter(e=>!t.includes(e)):Ce(e)}_rotationGroup(){const e=this._config?.persons??[],t=this._config?.rotation_persons??[],i=e.map((e,t)=>t);if(0===t.length)return i;const s=new Set(t.map(e=>e.toLowerCase())),n=i.filter(t=>{const i=e[t];return[i.name,i.person].some(e=>e&&s.has(e.toLowerCase()))});return n.length?n:i}_rotationPeriod(){return"day"===this._config?.rotation_period?"day":"week"}_rotationMap(){const e=this._rotationLists(),t=this._rotationGroup(),i=this._rotationPeriod(),s=ve(new Date,i),n=`${e.join(",")}|${t.join(",")}|${i}|${s}`;if(this._rotCache&&this._rotCache.items===this._items&&this._rotCache.sig===n)return this._rotCache.map;const o=function(e,t,i){const s=new Map;if(t<=0)return s;const n=[...e].sort((e,t)=>e.item.summary.localeCompare(t.item.summary)||e.item.uid.localeCompare(t.item.uid));return n.forEach((e,n)=>{s.set(e.key,{now:ke(n+i,t),next:ke(n+i+1,t)})}),s}(e.flatMap(e=>(this._items[e]??[]).map(t=>({key:`${e}|${t.uid}`,item:t}))),t.length,s),r=new Map;for(const[e,i]of o)r.set(e,{now:t[i.now],next:t[i.next]});return this._rotCache={items:this._items,sig:n,map:r},r}_rotationHint(e){const t=this._config?.persons??[];if(this._rotationGroup().length<2)return;const i=this._rotationMap().get(`${e.entity}|${e.item.uid}`);if(!i)return;return`🔄 ${this._t("day"===this._rotationPeriod()?"rot_next_day":"rot_next_week")}: ${this._personName(t[i.next],i.next)}`}_canSetDue(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(16&t)}_maintainRotation(){const e=this._config;if(!e?.rotation||!1===e.rotation_reset||!this.hass)return;const t=this._rotationPeriod(),i=ye(ve(new Date,t),t);for(const e of this._rotationLists()){const t=this._items[e];if(t&&this._canToggle(e)&&this._canSetDue(e))for(const s of t){const t=we(s,i);if(!t)continue;const n=`${e}|${s.uid}|${i.end}`;this._rotSent.has(n)||(this._rotSent.add(n),this.hass.callService("todo","update_item",{entity_id:e,item:s.uid,...t}).catch(()=>this._rotSent.delete(n)))}}}async _addTask(e,t){if(!this.hass)return;const i=t.value.trim();if(i){t.value="";try{await this.hass.callService("todo","add_item",{entity_id:e,item:i}),this._sig[e]="",this._refresh()}catch(e){t.value=i}}}_personView(e){const t=this._config,i=t.points_per_task??10,s=t.shopping_points??i,n=this._shoppingSet(),o=[],r=[],a=[];let d=0;for(const t of this._ownLists(e)){const i=(this._items[t]??[]).map(e=>({entity:t,item:e}));if(n.has(t)){const e=i.filter(e=>"completed"!==e.item.status),n=i.filter(e=>"completed"===e.item.status);e.length>0?a.push({entity:t,name:this._listName(t),open:e}):n.length>0&&(d+=s)}else{const s=this._listFilter(e,t);for(const e of i)"completed"===e.item.status?r.push(e):this._visible(e.item,s)&&o.push(e)}}d+=r.length*i;const l=this._rotationLists();if(l.length){const t=this._config.persons.indexOf(e),i=this._rotationMap();for(const e of l)for(const s of this._items[e]??[])i.get(`${e}|${s.uid}`)?.now===t&&("completed"===s.status?r:o).push({entity:e,item:s})}const c=this._decorate(this._sortOpen(o)),h={tasksOpen:c,tasksDone:r,shopOpen:a,openCount:c.length+a.length};if(this._backendOn()){const t=this._config.persons.indexOf(e),i=this._ledger(this._personKey(e,t)),s=i?.earned??0,n=i?.redeemed??0,o=i?.reserved??0;return{...h,earned:s,spent:n,balance:s-n-o,hasWallet:!0,requests:i?.pending??[],weekPoints:i?.weekPoints??0,monthPoints:i?.monthPoints??0,streak:i?.streak??0}}const p=!!e.points_entity,u=p?this._spent(e):0;return{...h,earned:d,spent:u,balance:d-u,hasWallet:p}}_backendOn(){return!!this._config?.points_backend&&!!this.hass?.services?.family_tasks?.award}_personKey(e,t){return e.person||e.name||`person_${t+1}`}_ledger(e){const t=this.hass?.states??{};if(this._ledgerCache?.states!==t){const e=new Map;for(const i of Object.values(t)){const t=i.attributes??{};i.entity_id?.startsWith("sensor.")&&"string"==typeof t.person&&("number"==typeof t.earned&&e.set(t.person,{earned:t.earned,redeemed:Number(t.redeemed)||0,reserved:Number(t.reserved)||0,pending:Array.isArray(t.pending)?t.pending:[],weekPoints:Number(t.week_points)||0,monthPoints:Number(t.month_points)||0,streak:Number(t.streak)||0}))}this._ledgerCache={states:t,map:e}}return this._ledgerCache.map.get(e)}_awardKey(e,t){if(!this._rotationLists().includes(e))return`${e}|${t.uid}`;const i=this._rotationPeriod();return`${e}|${t.uid}|${ye(ve(new Date,i),i).end}`}_award(e,t,i,s){if(this._reported.has(e)||!this.hass)return;this._reported.add(e);const n=this._config.persons[t];this.hass.callService("family_tasks","award",{key:e,person:this._personKey(n,t),points:i,task:s}).catch(()=>{})}_reportCompletions(){if(!this._backendOn())return;const e=this._config,t=e.points_per_task??10,i=this._shoppingSet();e.persons.forEach((e,s)=>{for(const n of this._ownLists(e))if(!i.has(n))for(const e of this._items[n]??[])"completed"===e.status&&this._award(`${n}|${e.uid}`,s,t,e.summary)});const s=this._rotationLists();if(!s.length)return;const n=this._rotationPeriod(),o=ye(ve(new Date,n),n),r=this._rotationMap();for(const e of s)for(const i of this._items[e]??[]){if("completed"!==i.status||we(i,o))continue;const s=r.get(`${e}|${i.uid}`);s&&this._award(this._awardKey(e,i),s.now,t,i.summary)}}_listFilter(e,t){const i=Ee(e).find(e=>"string"!=typeof e&&e.entity===t),s="object"==typeof i?i:{};return{hide_undated:s.hide_undated??this._config?.hide_undated,show_within:s.show_within??this._config?.show_within}}_visible(e,t){const i=je(e.due);return i?"number"!=typeof t.show_within||t.show_within<0||(Fe(e)||Be(i.day)<=t.show_within):!t.hide_undated}_ownerIndex(e){return(this._config?.persons??[]).findIndex(t=>this._ownLists(t).includes(e))}_spent(e){if(!e.points_entity)return 0;const t=Number(this.hass?.states[e.points_entity]?.state);return isNaN(t)?0:t}_sortOpen(e){const t=this._config?.sort??"manual";if("manual"===t)return e;const i=e=>{const t=je(e.due);return t?(t.at??t.day).getTime():1/0},s=[...e];return"alpha"===t?s.sort((e,t)=>e.item.summary.localeCompare(t.item.summary)):"due"===t&&s.sort((e,t)=>i(e.item)-i(t.item)),s}_decorate(e){const t=this._config?.context_rules??[],i=!1!==this._config?.highlight_overdue,s=this._config?.due_soon,n=[];for(const o of e){let e,r=!1,a="none";for(const i of t)if(He(i,o.item.summary,o.entity)&&Ie(i,this.hass?.states[i.entity])){if("hide"===i.effect){r=!0;break}"urgent"===i.effect?(a="urgent",e=i.label??e):"highlight"===i.effect&&"urgent"!==a&&(a="highlight",e=e??i.label)}r||("none"===a&&s&&Ue(o.item,s)&&(a="highlight",e=e??this._t("due_soon")),i&&Fe(o.item)&&(a="urgent",e=e??this._t("overdue")),n.push({...o,flag:a,label:e}))}const o=e=>"urgent"===e?0:"highlight"===e?1:2;return n.map((e,t)=>({d:e,i:t})).sort((e,t)=>o(e.d.flag)-o(t.d.flag)||e.i-t.i).map(({d:e})=>e)}async _completeShopping(e){await Promise.all(e.open.map(e=>this._toggle(e.entity,e.item,!0)));const t=this._ownerIndex(e.entity);if(this._backendOn()&&t>=0){const i=this._config,s=i.shopping_points??i.points_per_task??10,n=(new Date).toLocaleDateString("sv");this._award(`${e.entity}|trip|${n}`,t,s,e.name)}this._fireCelebrate("task",{name:this._ownerName(e.entity),task:e.name})}_rewards(){return this._config?.rewards??[]}_approvalOn(){return this._backendOn()&&!!this._config?.reward_approval&&!!this.hass?.services?.family_tasks?.request_reward}_hasPin(){const e=this._config?.parent_pin;return null!=e&&""!==e}async _requestReward(e,t){const i=this._config?.persons[e];if(i&&this.hass){this._celebrate();try{await this.hass.callService("family_tasks","request_reward",{person:this._personKey(i,e),points:t.cost,reward:t.name})}catch(t){this._shopPerson=e}}}_startDecide(e,t,i){this._pending={personIdx:e,requestId:t,approve:i},this._pin="",this._pinError=!1}async _decide(e,t){this.hass&&await this.hass.callService("family_tasks",t?"approve":"deny",{request_id:e})}_startRedeem(e,t){if(this._approvalOn())return void this._requestReward(e,t);const i=this._config?.parent_pin;null!=i&&""!==i?(this._pending={personIdx:e,reward:t},this._pin="",this._pinError=!1):this._doRedeem(e,t)}_confirmRedeem(){if(this._pending)if(this._pin===String(this._config?.parent_pin??"")){const e=this._pending;"requestId"in e?(this._cancelRedeem(),this._decide(e.requestId,e.approve)):this._doRedeem(e.personIdx,e.reward)}else this._pinError=!0}_cancelRedeem(){this._pending=null,this._pin="",this._pinError=!1}async _doRedeem(e,t){const i=this._config?.persons[e];if(!i||!this.hass)return;if(this._backendOn()){this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("family_tasks","redeem",{person:this._personKey(i,e),points:t.cost,reward:t.name}),this._fireCelebrate("reward",{name:this._personName(i,e),task:t.name})}catch(t){this._shopPerson=e}return}if(!i.points_entity)return;const s=this._spent(i)+t.cost;this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("input_number","set_value",{entity_id:i.points_entity,value:s}),this._fireCelebrate("reward",{name:this._personName(i,e),task:t.name})}catch(t){this._shopPerson=e}}_personName(e,t){return e.name||(e.person?this.hass?.states[e.person]?.attributes?.friendly_name:"")||`${this._t("person_fallback")} ${t+1}`}async _toggle(e,t,i=!1){if(!this.hass)return;const s="completed"===t.status?"needs_action":"completed";this._items={...this._items,[e]:(this._items[e]??[]).map(e=>e.uid===t.uid?{...e,status:s}:e)};try{if(await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:s}),"needs_action"===s&&this._backendOn()){const i=this._awardKey(e,t);this._reported.delete(i),await this.hass.callService("family_tasks","revoke",{key:i})}"completed"!==s||i||this._fireCelebrate("task",{name:this._ownerName(e,t),task:t.summary})}catch(t){this._sig[e]="",this._refresh()}}render(){if(!this._config)return K;const e=this._config;if(e.kiosk&&e.persons.length>0)return this._renderKiosk();if(e.kid_mode&&e.persons.length>0)return this._renderKid();if(e.eisenhower)return this._renderMatrix();let t=0;const i=e.persons.map((e,i)=>{const s=this._personView(e);return t+=s.earned,{p:e,idx:i,view:s}}),s=e.show_completed,n=e.hide_empty?i.filter(e=>e.view.openCount>0||s&&e.view.tasksDone.length>0):i;return I`
      <ha-card class=${this._themeClass()}>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${e.title||$e}</div>
            <div class="sub">${this._t("subtitle")}</div>
          </div>
          ${this._goalBar(t)}
        </div>

        <div class="board">${n.map(e=>this._column(e.p,e.idx,e.view))}</div>
        ${this._leaderboard(i)}
      </ha-card>
    `}_renderMatrix(){const e=this._config,t=e.urgent_within??2,i=new Map(ze.map(e=>[e,[]]));e.persons.forEach((e,s)=>{for(const n of this._personView(e).tasksOpen){const o=je(n.item.due),r=Fe(n.item)||!!o&&Be(o.day)<=t,a=Me(n.item.summary)||this._listImportant(e,n.entity);i.get(Te(r,a)).push({o:n,idx:s})}});const s=(e,t)=>{const i=je(e.o.item.due),s=je(t.o.item.due);return((i?.at??i?.day)?.getTime()??1/0)-((s?.at??s?.day)?.getTime()??1/0)};return I`
      <ha-card class=${this._themeClass()}>
        <div class="head">
          <div class="badge">🧭</div>
          <div class="head-text">
            <div class="title">${e.title||$e}</div>
            <div class="sub">${this._t("matrix_sub")}</div>
          </div>
        </div>
        <div class="matrix">
          <div class="quad-grid">
            ${ze.map(t=>{const n=i.get(t).sort(s);return I`
                <div class="quad ${t}">
                  <div class="quad-head">
                    <span>${this._t(`quad_${t}`)}</span
                    ><span class="grp-count">${n.length}</span>
                  </div>
                  <div class="quad-hint">${this._t(`quad_${t}_hint`)}</div>
                  ${n.length?n.map(({o:t,idx:i})=>{return this._tile(t,Pe(e.persons[i],i),!1,t.flag,void 0,{title:(s=t.item.summary,s.trimStart().replace(/^!+\s*/,"")),who:this._personName(e.persons[i],i)});var s}):I`<div class="quad-empty">—</div>`}
                </div>
              `})}
          </div>
        </div>
      </ha-card>
    `}_listImportant(e,t){return Ee(e).some(e=>"object"==typeof e&&e.entity===t&&!!e.important)}_leaderboard(e){if(!this._config?.show_leaderboard||e.length<2)return K;const t=["🥇","🥈","🥉"],i=this._backendOn()?this._config?.leaderboard_period??"all":"all",s=e=>"week"===i?e.weekPoints??0:"month"===i?e.monthPoints??0:e.earned,n=[...e].sort((e,t)=>s(t.view)-s(e.view));return I`
      <div class="leaderboard">
        <div class="lb-title">
          ${this._t("leaderboard")}${"all"===i?K:I` · ${this._t("week"===i?"lb_week":"lb_month")}`}
        </div>
        ${n.map((e,i)=>I`
            <div class="lb-row">
              <span class="lb-rank">${t[i]??`${i+1}.`}</span>
              <span class="lb-dot" style="background:${Pe(e.p,e.idx)}"></span>
              <span class="lb-name">${this._personName(e.p,e.idx)}</span>
              <span class="lb-pts">⭐ ${s(e.view)}</span>
            </div>
          `)}
      </div>
    `}_streakChip(e,t=!1){const i=e.streak??0;return!this._config?.show_streak||!this._backendOn()||i<2?K:I`<span
      class="lvl streak ${t?"kid-lvl":""}"
      title=${this._t("streak_title").replace("{n}",String(i))}
      >⚡ ${i}</span
    >`}_autoReturnSecs(){return this._config?.auto_return??30}_resetKioskTimer(){this._kioskTimer&&clearTimeout(this._kioskTimer);const e=this._autoReturnSecs();!this._config?.kiosk||e<=0||(this._kioskTimer=window.setTimeout(()=>{this._kioskIdle=!0},1e3*e))}_wakeKiosk(e){this._activeKid=e,this._kioskIdle=!1,this._resetKioskTimer()}_renderKiosk(){const e=()=>{this._kioskIdle||this._resetKioskTimer()},t=this._kioskIdle?this._renderKioskPicker():this._renderKid();return I`<div class="kiosk-wrap" @pointerdown=${e} @keydown=${e}>
      ${t}
    </div>`}_renderKioskPicker(){const e=this._config,t=this._themeClass();let i=0;for(const t of e.persons)i+=this._personView(t).earned;return I`
      <ha-card class="kiosk-idle ${t}">
        <div class="kiosk-title">${this._t("who_is_it")}</div>
        <div class="kiosk-people">${e.persons.map((e,t)=>this._kioskAvatar(e,t))}</div>
        <div class="kiosk-foot">⭐ ${i}</div>
      </ha-card>
    `}_kioskAvatar(e,t){const i=Pe(e,t),s=this._personName(e,t),n=e.person?this.hass?.states[e.person]:void 0,o=n?.attributes?.entity_picture,r=s.slice(0,2).toUpperCase(),a=this._personView(e).openCount;return I`
      <button class="kiosk-person" @click=${()=>this._wakeKiosk(t)}>
        ${o?I`<div
                class="kiosk-av"
                style="background-image:url('${o}');box-shadow:0 0 0 4px ${i}"
              ></div>`:I`<div class="kiosk-av initials" style="background:${i}">${r}</div>`}
        <div class="kiosk-name">${s}</div>
        <div class="kiosk-open">${a?I`${a} ${this._t("open")}`:"✓"}</div>
      </button>
    `}disconnectedCallback(){super.disconnectedCallback(),this._burstTimer&&clearTimeout(this._burstTimer),this._kioskTimer&&clearTimeout(this._kioskTimer)}_renderKid(){const e=this._config,t=e.persons,i=Math.min(this._activeKid,t.length-1),s=t[i],n=Pe(s,i),o=this._personName(s,i),r=this._personView(s),a=r.earned,d=r.openCount,l=s.goal??e.goal,c=l&&l>0?Math.min(100,Math.round(a/l*100)):0,h=0===d,p=this._rewards().length>0,u=r.hasWallet?r.balance:a,_=this._levelInfo(a);return I`
      <ha-card class="kid ${this._themeClass()}" style="--pc:${n}">
        ${t.length>1?I`<div class="kid-people">
                ${t.map((e,t)=>this._kidAvatar(e,t,t===i))}
              </div>`:K}

        <div class="kid-hero">
          ${this._kidAvatar(s,i,!1,!0)}
          <div class="kid-hero-text">
            <div class="kid-name">
              ${o}${_?I`<span class="lvl kid-lvl">${_.emoji} L${_.level}</span>`:K}${this._streakChip(r,!0)}
            </div>
            <div class="kid-stars">
              ${r.hasWallet?"💰":"⭐"}
              ${u}${d?I` · ${d} offen`:K}
            </div>
          </div>
          ${p?I`<button
                  class="kid-shop-btn ${this._kidShopOpen?"active":""}"
                  title="Belohnungen"
                  @click=${()=>{this._kidShopOpen=!this._kidShopOpen,this._cancelRedeem()}}
                >
                  🎁
                </button>`:K}
        </div>

        ${l&&l>0?I`<div class="kid-bar"><div class="kid-fill" style="width:${c}%"></div></div>`:K}
        ${p&&this._kidShopOpen?this._shopPanel(i,r.balance,r.hasWallet,r.requests):I`<div class="kid-tasks">
                ${h?I`<div class="kid-alldone">
                        🎉
                        <div>${this._t("all_done_kid")}</div>
                      </div>`:I`${r.shopOpen.map(e=>this._kidShopping(e,n))}
                      ${r.tasksOpen.map(e=>this._kidTask(e,n))}`}
              </div>`}
        ${this._burst?I`<div class="burst">⭐</div>`:K}
      </ha-card>
    `}_kidAvatar(e,t,i,s=!1){const n=Pe(e,t),o=this._personName(e,t),r=e.person?this.hass?.states[e.person]:void 0,a=r?.attributes?.entity_picture,d=o.slice(0,2).toUpperCase(),l=`kid-av ${s?"big":""} ${i?"active":""}`,c=a?`background-image:url('${a}');box-shadow:0 0 0 3px ${n}`:`background:${n}`,h=a?K:I`<span>${d}</span>`;return s?I`<div class="${l}" style="${c}">${h}</div>`:I`<button
          class="${l}"
          style="${c}"
          title=${o}
          @click=${()=>this._activeKid=t}
        >
          ${h}
        </button>`}_kidTask(e,t){const{entity:i,item:s,flag:n,label:o}=e,r="urgent"===n?"⚠️":De(s.summary),a=this._canToggle(i),d=o??this._rotationHint(e);return I`
      <button
        class="kid-task ${n}"
        style="--pc:${t}"
        ?disabled=${!a}
        title=${a?"":this._t("no_toggle")}
        @click=${()=>this._kidComplete(i,s)}
      >
        <span class="kid-emoji">${r}</span>
        <span class="kid-task-title">
          ${s.summary}${d?I`<span class="kid-sub">${d}</span>`:K}
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
    `}_celebrate(){this._burst=!0,this._burstTimer&&clearTimeout(this._burstTimer),this._burstTimer=window.setTimeout(()=>{this._burst=!1},900)}_ownerName(e,t){const i=this._config?.persons??[];if(t&&this._rotationLists().includes(e)){const s=this._rotationMap().get(`${e}|${t.uid}`);return s?this._personName(i[s.now],s.now):void 0}for(let t=0;t<i.length;t++)if(this._ownLists(i[t]).includes(e))return this._personName(i[t],t)}_fireCelebrate(e,t){const i=this._config?.celebrate;if(!i||!this.hass||!Array.isArray(i.actions))return;if((i.on?Array.isArray(i.on)?i.on:[i.on]:["all_done"]).includes(e))for(const e of i.actions){if(!e?.service||!e.service.includes("."))continue;const[i,...s]=e.service.split("."),n=s.join("."),o=Re(e.data??{},t),r=e.target?Re(e.target,t):void 0;Promise.resolve(this.hass.callService(i,n,o,r)).catch(()=>{})}}updated(){if(!this._config)return;this._applyAppearance(),this._maintainRotation(),this._reportCompletions();const e=this._config.active_person_entity;if(e){const t=this.hass?.states[e]?.state;if(t!==this._lastActive){this._lastActive=t;const e=this._activePersonIndex();e>=0&&(this._config.kiosk?this._wakeKiosk(e):this._activeKid=e)}}this._config.celebrate&&this._config.persons.forEach((e,t)=>{const i=this._personView(e).openCount,s=this._prevOpen[t];this._prevOpen[t]=i,void 0!==s&&s>0&&0===i&&this._fireCelebrate("all_done",{name:this._personName(e,t)})})}_applyAppearance(){const e=this._config,t=(e,t,i)=>{const s="number"==typeof e&&isFinite(e)?e:100;return Math.min(i,Math.max(t,s))/100},i=t(e?.font_scale,50,300),s=t(e?.avatar_scale,40,400),n=t(e?.scale,40,400);this.style.setProperty("--ftc-fs",String(i)),this.style.setProperty("--ftc-av",String(s)),this.style.setProperty("zoom",1===n?"":String(n))}_activePersonIndex(){const e=this._config?.active_person_entity,t=e?this.hass?.states[e]?.state:void 0;if(!t||["unknown","unavailable",""].includes(t))return-1;const i=t.toLowerCase(),s=this._config?.persons??[];for(let e=0;e<s.length;e++){const t=s[e];if(t.person&&t.person.toLowerCase()===i)return e;if(this._personName(t,e).toLowerCase()===i)return e;const n=t.person?this.hass?.states[t.person]?.attributes?.friendly_name:void 0;if(n&&n.toLowerCase()===i)return e}return-1}async _kidComplete(e,t){this._celebrate(),await this._toggle(e,t)}async _kidCompleteShopping(e){this._celebrate(),await this._completeShopping(e)}_goalBar(e){const t=this._config?.goal;if(!t||t<=0)return I`<div class="fam-pts">⭐ ${e}</div>`;const i=Math.max(0,Math.min(100,Math.round(e/t*100)));return I`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${e}</span><span class="goal-target">${this._t("goal")} ${t}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${i}%"></div></div>
      </div>
    `}_column(e,t,i){const s=Pe(e,t),n=this._personName(e,t),o=e.person?this.hass?.states[e.person]:void 0,r=o?.attributes?.entity_picture,a=n.slice(0,2).toUpperCase(),d=this._config?.show_completed,l=0===i.openCount&&(!d||0===i.tasksDone.length),c=this._rewards().length>0,h=this._shopPerson===t,p=i.hasWallet?i.balance:i.earned,u=this._levelInfo(i.earned),_=!1===this._config?.allow_add?void 0:this._addEntityFor(e),g=!!this._config?.active_person_entity&&this._activePersonIndex()===t;return I`
      <div class="col ${g?"active":""}" style="--pc:${s}">
        <div class="col-head">
          ${r?I`<div
                  class="avatar"
                  style="background-image:url('${r}');box-shadow:0 0 0 2px ${s}55"
                ></div>`:I`<div class="avatar initials" style="background:${s}">${a}</div>`}
          <div class="col-meta">
            <div class="pname">
              <span class="pname-txt">${n}</span>
              ${u?I`<span
                      class="lvl"
                      title="${this._t("level")} ${u.level} · ${u.pct}% ${this._t("to_next")}"
                      >${u.emoji} L${u.level}</span
                    >`:K}
              ${this._streakChip(i)}
            </div>
            <div class="pstatus">
              ${i.openCount} ${this._t("open")} · ${i.hasWallet?"💰":"⭐"} ${p}
            </div>
          </div>
          ${c?I`<button
                  class="shop-toggle ${h?"active":""}"
                  title=${this._t("rewards")}
                  @click=${()=>{this._shopPerson=h?null:t,this._cancelRedeem()}}
                >
                  🎁
                </button>`:K}
        </div>

        <div class="tiles">
          ${l?I`<div class="empty">${this._t("all_done_board")}</div>`:K}
          ${i.shopOpen.map(e=>this._shoppingTile(e,s))}
          ${this._config.group_by_due?this._groupedTiles(t,i.tasksOpen,s):i.tasksOpen.map(e=>this._tile(e,s,!1,e.flag,e.label))}
          ${d?i.tasksDone.map(e=>this._tile(e,s,!0)):K}
        </div>

        ${_?I`<div class="add-row">
                <input
                  class="add-input"
                  type="text"
                  placeholder=${this._t("add_task")}
                  @keydown=${e=>{"Enter"===e.key&&this._addTask(_,e.target)}}
                />
              </div>`:K}
        ${h?this._shopPanel(t,i.balance,i.hasWallet,i.requests):K}
      </div>
    `}_groupedTiles(e,t,i){const s=new Map;for(const e of t){const t=Oe(e.item);s.set(t,[...s.get(t)??[],e])}return Ne.filter(e=>s.has(e)).map(t=>{const n=s.get(t),o=`${e}|${t}`,r=Le.has(t),a=!r||!!this._expanded[o];return I`
        <div
          class="grp-head ${t} ${r?"collapsible":""}"
          role=${r?"button":K}
          tabindex=${r?0:K}
          aria-expanded=${r?String(a):K}
          @click=${r?()=>this._toggleGroup(o):K}
          @keydown=${r?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleGroup(o))}:K}
        >
          <span>${this._t(`grp_${t}`)}</span>
          <span class="grp-count">${n.length}${r?a?" ▾":" ▸":""}</span>
        </div>
        ${a?n.map(e=>this._tile(e,i,!1,e.flag,e.label)):K}
      `})}_toggleGroup(e){this._expanded={...this._expanded,[e]:!this._expanded[e]}}_shopPanel(e,t,i,s=[]){const n=this._rewards(),o=this._pending?.personIdx===e?this._pending:null,r=this._approvalOn();return I`
      <div class="shop">
        <div class="shop-head">
          <span>🎁 ${this._t("rewards")}</span>
          <span class="shop-balance"
            >${this._t("balance")} ${i?"💰":"⭐"} ${t}</span
          >
        </div>
        ${i?K:I`<div class="shop-note">
                ${this._t("no_wallet_1")}<code>points_entity</code>,
                <code>input_number</code>${this._t("no_wallet_2")}
              </div>`}
        ${n.map(s=>{const n=i&&t>=s.cost;return I`
            <div class="reward ${n?"":"locked"}">
              <span class="reward-emoji">${s.emoji||"🎁"}</span>
              <span class="reward-name">${s.name}</span>
              <span class="reward-cost">⭐ ${s.cost}</span>
              <button
                class="reward-btn"
                ?disabled=${!n}
                @click=${()=>this._startRedeem(e,s)}
              >
                ${this._t(r?"request":"redeem")}
              </button>
            </div>
          `})}
        ${s.map(t=>I`
            <div class="reward waiting">
              <span class="reward-emoji">⏳</span>
              <span class="reward-name"
                >${t.reward}<span class="reward-wait">${this._t("waiting")}</span></span
              >
              <span class="reward-cost">⭐ ${t.points}</span>
              ${this._hasPin()?I`<button
                        class="reward-btn approve"
                        title=${this._t("approve")}
                        @click=${()=>this._startDecide(e,t.id,!0)}
                      >
                        ✓
                      </button>
                      <button
                        class="reward-btn deny"
                        title=${this._t("deny")}
                        @click=${()=>this._startDecide(e,t.id,!1)}
                      >
                        ✕
                      </button>`:K}
            </div>
          `)}
        ${o?this._pinRow():K}
      </div>
    `}_pinRow(){return I`
      <div class="pin ${this._pinError?"err":""}">
        <span class="pin-label">${this._t("parent_pin")}</span>
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
        <button class="pin-cancel" title=${this._t("cancel")} @click=${this._cancelRedeem}>
          ✕
        </button>
        ${this._pinError?I`<span class="pin-msg">${this._t("wrong_pin")}</span>`:K}
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
          <div class="tile-due">${i} ${this._t("items")}</div>
        </div>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          title="In Bring! öffnen"
          @click=${e=>e.stopPropagation()}
        >
          ${this._t("open_app")}
        </a>
      </div>
    `}_tile(e,t,i,s="none",n,o){const{entity:r,item:a}=e,d="urgent"===s?"⚠️":De(a.summary),l=this._canToggle(r),c=i?void 0:this._rotationHint(e);return I`
      <div
        class="tile ${i?"done":s} ${l?"":"readonly"}"
        style="--pc:${t}"
        title=${l?"":this._t("no_toggle")}
        role=${l?"button":"listitem"}
        tabindex=${l?0:-1}
        @click=${l?()=>this._toggle(r,a):K}
        @keydown=${l?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle(r,a))}:K}
      >
        <div class="check">${i?"✓":l?"":"🔒"}</div>
        <div class="tile-emoji">${d}</div>
        <div class="tile-text">
          <div class="tile-title">${o?o.title:a.summary}</div>
          ${o?I`<div class="tile-due">
                  ${o.who}${a.due?` · ${this._formatDue(a.due)}`:""}
                </div>`:n?I`<div class="tile-flag">${n}</div>`:c?I`<div class="tile-due">${c}</div>`:a.due?I`<div class="tile-due">${this._formatDue(a.due)}</div>`:K}
        </div>
      </div>
    `}_formatDue(e){const t=je(e);if(!t)return e;const i=this.hass?.locale?.language||"de",s=0===Be(t.day)?this._t("today"):new Intl.DateTimeFormat(i,{weekday:"short",day:"numeric",month:"short"}).format(t.day);if(!t.at)return s;return`${s}, ${new Intl.DateTimeFormat(i,{hour:"2-digit",minute:"2-digit"}).format(t.at)}`}}qe.styles=r`
    :host {
      --pc: var(--primary-color);
    }
    /* Optional forced color scheme (theme: dark|light). Overrides the HA theme
       variables only within this card, so a wall tablet can stay dark/light. */
    ha-card.theme-dark {
      --card-background-color: #1b1c20;
      --ha-card-background: #1b1c20;
      --primary-text-color: #e4e4e7;
      --secondary-text-color: #9aa0a6;
      --divider-color: rgba(255, 255, 255, 0.12);
      --secondary-background-color: #26272c;
      color-scheme: dark;
    }
    ha-card.theme-light {
      --card-background-color: #ffffff;
      --ha-card-background: #ffffff;
      --primary-text-color: #1f2933;
      --secondary-text-color: #6b7280;
      --divider-color: rgba(0, 0, 0, 0.12);
      --secondary-background-color: #f3f4f6;
      color-scheme: light;
    }
    ha-card {
      padding: 16px;
      font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, inherit));
      color: var(--primary-text-color);
      background: var(--card-background-color, var(--ha-card-background));
      /* font_scale: base for all em-relative text; default 1 = no change */
      font-size: calc(1em * var(--ftc-fs, 1));
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
      width: calc(42px * var(--ftc-av, 1));
      height: calc(42px * var(--ftc-av, 1));
      border-radius: 12px;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: calc(22px * var(--ftc-av, 1));
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
    /* the person named by active_person_entity (NFC / presence) */
    .col.active {
      border-color: var(--pc);
      box-shadow: 0 0 0 2px var(--pc);
      background: color-mix(in srgb, var(--pc) 12%, var(--card-background-color, #fff));
    }
    .col-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .avatar {
      width: calc(36px * var(--ftc-av, 1));
      height: calc(36px * var(--ftc-av, 1));
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
      font-size: calc(13px * var(--ftc-av, 1));
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
    .add-row {
      margin-top: 8px;
    }
    .add-input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 0.9em;
    }
    .add-input:focus {
      outline: none;
      border-style: solid;
      border-color: var(--pc);
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
      width: calc(48px * var(--ftc-av, 1));
      height: calc(48px * var(--ftc-av, 1));
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
      font-size: calc(16px * var(--ftc-av, 1));
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
      width: calc(72px * var(--ftc-av, 1));
      height: calc(72px * var(--ftc-av, 1));
      font-size: calc(24px * var(--ftc-av, 1));
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

    /* ---- kiosk idle picker ---- */
    ha-card.kiosk-idle {
      padding: 24px;
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }
    .kiosk-title {
      font-size: 2em;
      font-weight: 800;
    }
    .kiosk-people {
      display: flex;
      flex-wrap: wrap;
      gap: 22px;
      justify-content: center;
    }
    .kiosk-person {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      border: none;
      background: none;
      cursor: pointer;
      font: inherit;
      color: var(--primary-text-color);
      padding: 8px;
      border-radius: 18px;
      transition: transform 0.12s ease;
    }
    .kiosk-person:hover,
    .kiosk-person:active {
      transform: scale(1.05);
    }
    .kiosk-av {
      width: calc(104px * var(--ftc-av, 1));
      height: calc(104px * var(--ftc-av, 1));
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #11181f;
      font-weight: 800;
      font-size: calc(34px * var(--ftc-av, 1));
    }
    .kiosk-name {
      font-size: 1.2em;
      font-weight: 700;
    }
    .kiosk-open {
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }
    .kiosk-foot {
      font-size: 1.2em;
      font-weight: 700;
      color: var(--secondary-text-color);
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
    /* A requested reward waiting for a parent (reward approval). */
    .reward.waiting {
      background: color-mix(in srgb, var(--pc) 10%, transparent);
      border-radius: 10px;
    }
    .reward-wait {
      display: block;
      font-size: 0.8em;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .reward-btn.approve,
    .reward-btn.deny {
      min-width: 0;
      padding-left: 10px;
      padding-right: 10px;
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
    .lvl.streak {
      background: color-mix(in srgb, #ff7043 16%, transparent);
      color: #e64a19;
    }
    /* Eisenhower view: 2×2 on wide cards, stacked on phones. */
    .matrix {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
      margin-top: 12px;
      container-type: inline-size;
    }
    .quad-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }
    /* two columns once the card itself is wide enough, not the window
       (after the base rule, so it wins) */
    @container (min-width: 520px) {
      .quad-grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
    }
    .quad {
      min-width: 0;
      border-radius: 14px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: var(--secondary-background-color, #f3f4f6);
      border-top: 4px solid var(--q, var(--divider-color));
    }
    .quad.do {
      --q: var(--error-color, #db4437);
    }
    .quad.plan {
      --q: var(--primary-color, #03a9f4);
    }
    .quad.delegate {
      --q: var(--warning-color, #ffa600);
    }
    .quad.later {
      --q: var(--disabled-text-color, #9aa0a6);
    }
    .quad-head {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
    }
    .quad-hint {
      font-size: 0.78em;
      color: var(--secondary-text-color);
      margin-top: -4px;
    }
    .quad-empty {
      color: var(--secondary-text-color);
      text-align: center;
      padding: 6px 0;
    }
    /* Due-date groups on the board (group_by_due). */
    .grp-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
      margin: 6px 2px 0;
    }
    .grp-head.overdue {
      color: var(--error-color, #db4437);
    }
    .grp-head.collapsible {
      cursor: pointer;
      padding: 6px 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f3f4f6);
    }
    .grp-count {
      font-weight: 600;
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
  `,e([he({attribute:!1})],qe.prototype,"hass",void 0),e([pe()],qe.prototype,"_config",void 0),e([pe()],qe.prototype,"_items",void 0),e([pe()],qe.prototype,"_activeKid",void 0),e([pe()],qe.prototype,"_burst",void 0),e([pe()],qe.prototype,"_shopPerson",void 0),e([pe()],qe.prototype,"_kidShopOpen",void 0),e([pe()],qe.prototype,"_pending",void 0),e([pe()],qe.prototype,"_pin",void 0),e([pe()],qe.prototype,"_pinError",void 0),e([pe()],qe.prototype,"_kioskIdle",void 0),e([pe()],qe.prototype,"_expanded",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",qe),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:$e,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const Ke=me,We=["manual","due","alpha"],Ye=["auto","dark","light"],Ge=["week","day"],Ve=["all","week","month"],Ze=[{name:"name",selector:{text:{}}},{name:"person",selector:{entity:{filter:{domain:"person"}}}},{name:"lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"points_entity",selector:{entity:{filter:{domain:"input_number"}}}}],Je={title:{de:"Titel",en:"Title"},theme:{de:"Farbschema",en:"Color scheme"},points_per_task:{de:"Punkte pro Aufgabe",en:"Points per task"},goal:{de:"Ziel (Punkte)",en:"Goal (points)"},show_completed:{de:"Erledigte anzeigen",en:"Show completed"},kid_mode:{de:"Kinder-Modus",en:"Kid mode"},eisenhower:{de:"Eisenhower-Ansicht (für Eltern)",en:"Eisenhower view (for parents)"},urgent_within:{de:"Dringend: fällig in … Tagen",en:"Urgent: due within … days"},active_person_entity:{de:"Aktive Person (Entität)",en:"Active person (entity)"},kiosk:{de:"Kiosk-Modus (Wandtablet)",en:"Kiosk mode (wall tablet)"},auto_return:{de:"Auto-Rückkehr (Sek.)",en:"Auto-return (sec)"},highlight_overdue:{de:"Überfällige hervorheben",en:"Highlight overdue"},shopping_lists:{de:"Einkaufslisten (Bring!)",en:"Shopping lists (Bring!)"},shopping_points:{de:"Punkte pro Einkauf",en:"Points per shopping trip"},bring_deeplink:{de:"Bring!-Link",en:"Bring! link"},parent_pin:{de:"Eltern-PIN (Belohnungen)",en:"Parent PIN (rewards)"},points_backend:{de:"Punktekonto nutzen (Family Tasks)",en:"Use points ledger (Family Tasks)"},reward_approval:{de:"Belohnungs-Freigabe per Push",en:"Reward approval by push"},level_size:{de:"Punkte pro Level",en:"Points per level"},show_leaderboard:{de:"Rangliste anzeigen",en:"Show leaderboard"},leaderboard_period:{de:"Rangliste für",en:"Leaderboard for"},show_streak:{de:"Serien anzeigen (⚡)",en:"Show streaks (⚡)"},rotation:{de:"Auto-Rotation (reihum)",en:"Auto-rotation (take turns)"},rotation_lists:{de:"Ämtli-Listen (reihum)",en:"Chore lists (rotating)"},rotation_period:{de:"Wechsel",en:"Rotate"},rotation_persons:{de:"Wer macht mit?",en:"Who takes part?"},rotation_reset:{de:"Ämtli jede Runde wieder öffnen",en:"Reopen chores every round"},scale:{de:"Kartengröße",en:"Card size"},font_scale:{de:"Schriftgröße",en:"Font size"},avatar_scale:{de:"Avatar-/Bildgröße",en:"Avatar / picture size"},sort:{de:"Sortierung",en:"Sort"},hide_empty:{de:"Leere Personen ausblenden",en:"Hide empty persons"},due_soon:{de:"Bald fällig (Tage)",en:"Due soon (days)"},group_by_due:{de:"Nach Fälligkeit gruppieren",en:"Group by due date"},hide_undated:{de:"Aufgaben ohne Termin ausblenden",en:"Hide tasks without a date"},show_within:{de:"Nur fällig in den nächsten … Tagen",en:"Only due within … days"},allow_add:{de:"Aufgabe-hinzufügen-Feld",en:"Add-task field"},name:{de:"Name",en:"Name"},person:{de:"Person (Avatar)",en:"Person (avatar)"},lists:{de:"Aufgabenlisten (todo.*)",en:"Task lists (todo.*)"},points_entity:{de:"Guthaben-Helfer (input_number)",en:"Points helper (input_number)"}},Xe={theme:{de:"Farbschema der Karte erzwingen (unabhängig vom Dashboard-Theme). Standard: dem HA-Theme folgen.",en:"Force the card's color scheme (independent of the dashboard theme). Default: follow the HA theme."},points_per_task:{de:"Punkte je erledigter Aufgabe (Standard 10).",en:"Points per completed task (default 10)."},goal:{de:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",en:"Family points goal for the progress bar. 0 = off."},show_completed:{de:"Erledigte Aufgaben ausgegraut mitanzeigen.",en:"Also show completed tasks (dimmed)."},eisenhower:{de:"Statt Spalten pro Person ein 2×2-Raster: Jetzt erledigen / Einplanen / Delegieren / Später. Dringend = überfällig oder bald fällig; wichtig = „!“ am Titelanfang oder Liste mit important: true (YAML). Kinder- und Kiosk-Modus haben Vorrang.",en:"Instead of person columns, a 2×2 grid: Do now / Schedule / Delegate / Later. Urgent = overdue or due soon; important = “!” at the start of the title or a list with important: true (YAML). Kid and kiosk mode take precedence."},urgent_within:{de:"Aufgaben, die in so vielen Tagen fällig sind, gelten als dringend (Überfälliges immer). Standard 2.",en:"Tasks due within this many days count as urgent (overdue always). Default 2."},kid_mode:{de:"Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",en:"Big, tappable layout for the kids' tablet (avatar switcher on top)."},active_person_entity:{de:"Entität (input_select/Sensor/person), deren Wert die aktive Person nennt – die Karte fokussiert sie automatisch (z. B. per NFC-Tag/Anwesenheit). Leer = manuell umschalten.",en:"Entity (input_select/sensor/person) whose value names the active person — the card focuses them automatically (e.g. via NFC tag/presence). Empty = switch manually."},kiosk:{de:"Wandtablet-Modus: Ruhebildschirm 'Wer ist dran?' mit großen Avataren; Antippen (oder NFC/Anwesenheit) zeigt die Aufgaben, nach Inaktivität geht es zurück.",en:"Wall-tablet mode: an idle 'Who's there?' screen with big avatars; tapping (or NFC/presence) shows the tasks, and it returns after inactivity."},auto_return:{de:"Sekunden Inaktivität bis zurück zum 'Wer ist dran?'-Bildschirm (Standard 30, 0 = nie).",en:"Seconds of inactivity before returning to the 'Who's there?' screen (default 30, 0 = never)."},highlight_overdue:{de:"Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Weitere Kontext-Regeln per YAML (context_rules).",en:"Mark tasks past their due date as urgent (default on). More context rules via YAML (context_rules)."},shopping_lists:{de:"Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",en:"These todo.* lists (e.g. Bring!) show as one 'shopping' tile; checking it off completes the whole trip."},shopping_points:{de:"Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",en:"Points for a finished shopping trip (default = points per task)."},bring_deeplink:{de:"Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",en:"Target of the 'Open in Bring!' button (default web.getbring.com)."},reward_approval:{de:"Kinder fragen Belohnungen an, die Punkte werden reserviert, und die Eltern geben per Push frei oder lehnen ab. Wer die Push bekommt, stellst du in der Integration Family Tasks ein (Konfigurieren). Mit Eltern-PIN geht die Freigabe auch in der Karte.",en:"Kids request rewards, the points are reserved, and the parents approve or deny by push. Who gets the push is set in the Family Tasks integration (Configure). With a parent PIN, requests can also be decided in the card."},points_backend:{de:"Punkte dauerhaft im Punktekonto der Integration „Family Tasks“ buchen: Sie bleiben, wenn Listen geleert werden, Ämtli geben Punkte, Einlösen läuft übers Konto. Braucht die installierte Integration, sonst bleibt alles wie bisher.",en:"Book points permanently in the ledger of the “Family Tasks” integration: they stay when lists are cleared, chores earn points, rewards are paid from it. Needs the integration installed, otherwise nothing changes."},parent_pin:{de:"PIN, die zum Einlösen einer Belohnung abgefragt wird (Eltern-Freigabe). Belohnungen selbst per YAML (rewards).",en:"PIN asked when redeeming a reward (parent approval). Rewards themselves via YAML (rewards)."},level_size:{de:"Punkte pro Level (aus verdienten Punkten). Standard 100, 0 = keine Level. Abzeichen optional per YAML (level_emojis).",en:"Points per level (from earned points). Default 100, 0 = no levels. Badges optional via YAML (level_emojis)."},leaderboard_period:{de:"Gesamt, diese Woche oder diesen Monat. Woche/Monat braucht das Punktekonto (Family Tasks), sonst wird gesamt gezählt.",en:"All time, this week or this month. Week/month needs the points ledger (Family Tasks), otherwise all time is used."},show_streak:{de:"Zeigt „⚡ 5“ neben dem Namen: an wie vielen Tagen am Stück jemand mindestens eine Aufgabe erledigt hat (ab 2 Tagen). Braucht das Punktekonto (Family Tasks).",en:"Shows “⚡ 5” next to the name: how many days in a row someone has done at least one task (from 2 days). Needs the points ledger (Family Tasks)."},show_leaderboard:{de:"Rangliste der Personen nach verdienten Punkten unter dem Board anzeigen.",en:"Show a ranking of persons by earned points under the board."},rotation:{de:"Ämtli aus gemeinsamen Listen wechseln automatisch reihum zwischen den Personen – täglich oder wöchentlich. Aus = aus.",en:"Chores from shared lists automatically take turns between persons – daily or weekly. Off = off."},rotation_lists:{de:"Eigene todo.*-Liste(n) nur für Ämtli, z. B. Müll, Spülmaschine, Tisch decken. Nicht zusätzlich bei einer Person eintragen.",en:"Dedicated todo.* list(s) just for chores, e.g. bins, dishwasher, set the table. Don't also add them to a person."},rotation_period:{de:"Wie oft die Ämtli weiterwandern. Wöchentlich beginnt jede Runde am Montag.",en:"How often chores move on. Weekly rounds start on Monday."},rotation_persons:{de:"Nichts gewählt = alle Personen der Karte machen mit.",en:"Nothing selected = every person on the card takes part."},rotation_reset:{de:"Abgehakte Ämtli zu Beginn der nächsten Runde wieder öffnen (die Karte setzt dafür die Fälligkeit auf das Rundenende). Ämtli geben nur mit Punktekonto (Family Tasks) Punkte, weil sie jede Runde neu starten.",en:"Reopen checked-off chores when the next round starts (the card sets their due date to the end of the round). Chores only earn points with the points ledger (Family Tasks), as they start over every round."},scale:{de:"Gesamte Karte vergrößern/verkleinern (Zoom über alles: Layout, Schrift, Bilder). 100 % = Standard.",en:"Enlarge/shrink the whole card (zoom over everything: layout, text, pictures). 100 % = default."},font_scale:{de:"Nur die Schriftgröße anpassen (zusätzlich zur Kartengröße). 100 % = Standard.",en:"Adjust the text size only (on top of the card size). 100 % = default."},avatar_scale:{de:"Nur Avatare/Bilder und das Karten-Icon anpassen. 100 % = Standard.",en:"Adjust avatars/pictures and the card icon only. 100 % = default."},sort:{de:"Reihenfolge der offenen Aufgaben je Person.",en:"Order of the open tasks per person."},hide_empty:{de:"Personen ohne offene Aufgaben ausblenden.",en:"Hide persons that have no open tasks."},group_by_due:{de:"Board: offene Aufgaben unter Überfällig / Heute / Bald / Später / Ohne Termin; Später und Ohne Termin sind zugeklappt. Nicht im Kinder-Modus.",en:"Board: open tasks under Overdue / Today / Soon / Later / No date; Later and No date start collapsed. Not in kid mode."},hide_undated:{de:"Offene Aufgaben ohne Fälligkeitsdatum nicht anzeigen. Pro Liste per YAML überschreibbar.",en:"Don't show open tasks without a due date. Can be overridden per list in YAML."},show_within:{de:"Nur Aufgaben zeigen, die in so vielen Tagen fällig sind; Überfälliges immer. 0 = nur heute. Leer = alle. Pro Liste per YAML überschreibbar.",en:"Only show tasks due within this many days; overdue always. 0 = today only. Empty = all. Can be overridden per list in YAML."},due_soon:{de:"Aufgaben, die in den nächsten X Tagen fällig sind, hervorheben. 0 = aus.",en:"Highlight tasks due within the next X days. 0 = off."},allow_add:{de:"Ein Eingabefeld pro Person zum Anlegen neuer Aufgaben (nur wo die Liste es unterstützt).",en:"An input field per person to add new tasks (only where the list supports it)."},person:{de:"Optional: person.* liefert Avatarbild & Anzeigename.",en:"Optional: person.* provides the avatar picture & display name."},lists:{de:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",en:"One or more todo.* lists that belong to this person."},points_entity:{de:"input_number, das die bereits eingelösten Punkte dieser Person speichert (Guthaben = verdient − eingelöst).",en:"input_number storing this person's already-redeemed points (balance = earned − spent)."}};class Qe extends ae{constructor(){super(...arguments),this._label=e=>Je[e.name]?.[this._lang]??e.name,this._helper=e=>Xe[e.name]?.[this._lang]}setConfig(e){this._config=e}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}get _settingsData(){const e=this._config.shopping_lists,t=Array.isArray(e)?e:e?[e]:[],i=!1!==this._config.highlight_overdue,s=!1!==this._config.allow_add,n=this._config.rotation_lists,o=Array.isArray(n)?n:n?[n]:[],r=this._config.rotation_period??"week",a=!1!==this._config.rotation_reset,d=this._config.scale??100,l=this._config.font_scale??100,c=this._config.avatar_scale??100;return{...this._config,shopping_lists:t,highlight_overdue:i,allow_add:s,scale:d,font_scale:l,avatar_scale:c,rotation_lists:o,rotation_period:r,rotation_reset:a}}get _lang(){return _e(this.hass)}_schema(){return[{name:"title",selector:{text:{}}},{name:"theme",selector:{select:{mode:"dropdown",options:Ye.map(e=>({value:e,label:ge(this.hass,`theme_${e}`)}))}}},{name:"points_per_task",selector:{number:{min:0,max:1e3,mode:"box",step:1}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"show_completed",selector:{boolean:{}}},{name:"kid_mode",selector:{boolean:{}}},{name:"eisenhower",selector:{boolean:{}}},...this._config.eisenhower?[{name:"urgent_within",selector:{number:{min:0,max:60,mode:"box",step:1}}}]:[],{name:"active_person_entity",selector:{entity:{filter:[{domain:"input_select"},{domain:"sensor"},{domain:"person"}]}}},{name:"kiosk",selector:{boolean:{}}},{name:"auto_return",selector:{number:{min:0,max:3600,mode:"box",step:5}}},{name:"highlight_overdue",selector:{boolean:{}}},{name:"allow_add",selector:{boolean:{}}},{name:"hide_empty",selector:{boolean:{}}},{name:"sort",selector:{select:{mode:"dropdown",options:We.map(e=>({value:e,label:ge(this.hass,`sort_${e}`)}))}}},{name:"due_soon",selector:{number:{min:0,max:60,mode:"box",step:1}}},{name:"group_by_due",selector:{boolean:{}}},{name:"hide_undated",selector:{boolean:{}}},{name:"show_within",selector:{number:{min:0,max:365,mode:"box",step:1}}},{name:"rotation",selector:{boolean:{}}},...this._config.rotation?this._rotationSchema():[],{name:"shopping_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"shopping_points",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"bring_deeplink",selector:{text:{}}},{name:"parent_pin",selector:{text:{}}},{name:"points_backend",selector:{boolean:{}}},...this._config.points_backend?[{name:"reward_approval",selector:{boolean:{}}}]:[],{name:"level_size",selector:{number:{min:0,max:1e5,mode:"box",step:10}}},{name:"show_leaderboard",selector:{boolean:{}}},...this._config.show_leaderboard?[{name:"leaderboard_period",selector:{select:{mode:"dropdown",options:Ve.map(e=>({value:e,label:ge(this.hass,"all"===e?"lb_all":`lb_${e}`)}))}}}]:[],{name:"show_streak",selector:{boolean:{}}},{name:"scale",selector:{number:{min:50,max:200,mode:"slider",step:5,unit_of_measurement:"%"}}},{name:"font_scale",selector:{number:{min:70,max:200,mode:"slider",step:5,unit_of_measurement:"%"}}},{name:"avatar_scale",selector:{number:{min:50,max:250,mode:"slider",step:5,unit_of_measurement:"%"}}}]}_rotationSchema(){const e=this._persons.map((e,t)=>({value:e.name||e.person||`${t+1}`,label:e.name||e.person||`${ge(this.hass,"person_fallback")} ${t+1}`}));return[{name:"rotation_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"rotation_period",selector:{select:{mode:"dropdown",options:Ge.map(e=>({value:e,label:ge(this.hass,`rot_${e}`)}))}}},{name:"rotation_persons",selector:{select:{multiple:!0,mode:"list",options:e}}},{name:"rotation_reset",selector:{boolean:{}}}]}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}_settingsChanged(e){e.stopPropagation();const t={...e.detail.value};t.title||delete t.title,t.goal||delete t.goal,t.show_completed||delete t.show_completed,t.kid_mode||delete t.kid_mode,t.eisenhower||delete t.eisenhower,("number"!=typeof t.urgent_within||isNaN(t.urgent_within))&&delete t.urgent_within,t.shopping_points||delete t.shopping_points,t.bring_deeplink||delete t.bring_deeplink,t.parent_pin||delete t.parent_pin,t.points_backend||delete t.points_backend,t.reward_approval||delete t.reward_approval,t.show_leaderboard||delete t.show_leaderboard,t.leaderboard_period&&"all"!==t.leaderboard_period||delete t.leaderboard_period,t.show_streak||delete t.show_streak,t.hide_empty||delete t.hide_empty,t.due_soon||delete t.due_soon,t.group_by_due||delete t.group_by_due,t.hide_undated||delete t.hide_undated,("number"!=typeof t.show_within||isNaN(t.show_within))&&delete t.show_within,t.sort&&"manual"!==t.sort||delete t.sort,t.theme&&"auto"!==t.theme||delete t.theme,t.active_person_entity||delete t.active_person_entity,t.kiosk||delete t.kiosk,t.auto_return||delete t.auto_return,t.scale&&100!==t.scale||delete t.scale,t.font_scale&&100!==t.font_scale||delete t.font_scale,t.avatar_scale&&100!==t.avatar_scale||delete t.avatar_scale,t.rotation||delete t.rotation,t.rotation_period&&"week"!==t.rotation_period||delete t.rotation_period,t.rotation_persons?.length||delete t.rotation_persons,!1!==t.rotation_reset&&delete t.rotation_reset,Array.isArray(t.rotation_lists)&&(0===t.rotation_lists.length?delete t.rotation_lists:1===t.rotation_lists.length&&(t.rotation_lists=t.rotation_lists[0])),t.highlight_overdue&&delete t.highlight_overdue,t.allow_add&&delete t.allow_add,Array.isArray(t.shopping_lists)&&(0===t.shopping_lists.length?delete t.shopping_lists:1===t.shopping_lists.length&&(t.shopping_lists=t.shopping_lists[0])),this._emit({...this._config,...t,persons:this._persons})}_personChanged(e,t){t.stopPropagation();const i={...t.detail.value};if(i.color||delete i.color,i.goal||delete i.goal,i.points_entity||delete i.points_entity,Array.isArray(i.lists)){const t=this._persons[e]?.lists,s=(Array.isArray(t)?t:t?[t]:[]).filter(e=>"object"==typeof e&&!!e),n=i.lists.map(e=>s.find(t=>t.entity===e)??e);0===n.length?delete i.lists:i.lists=1===n.length&&"string"==typeof n[0]?n[0]:n}const s=this._persons.map((t,s)=>s===e?i:t);this._emit({...this._config,persons:s})}_personData(e){const t=(Array.isArray(e.lists)?e.lists:e.lists?[e.lists]:[]).map(e=>"string"==typeof e?e:e.entity);return{...e,lists:t}}_setPersonColor(e,t){const i=this._persons.map((i,s)=>{if(s!==e)return i;const n={...i};return t?n.color=t:delete n.color,n});this._emit({...this._config,persons:i})}_addPerson(){const e=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:e})}_removePerson(e){const t=this._persons.filter((t,i)=>i!==e);this._emit({...this._config,persons:t})}_movePerson(e,t){const i=[...this._persons],s=e+t;s<0||s>=i.length||([i[e],i[s]]=[i[s],i[e]],this._emit({...this._config,persons:i}))}_autoDetect(){const e=new Set(this._persons.map(e=>e.person).filter(Boolean)),t=Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).filter(t=>!e.has(t)).map(e=>({name:this.hass.states[e].attributes?.friendly_name||"",person:e,lists:""}));if(0===t.length)return;const i=this._persons.filter(e=>e.name||e.person||(e=>Array.isArray(e.lists)?e.lists.length>0:!!e.lists)(e));this._emit({...this._config,persons:[...i,...t]})}_personColor(e,t){return e.color||Ke[t%Ke.length]}render(){return this._config&&this.hass?I`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${this._schema()}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${this._settingsChanged}
        ></ha-form>

        <div class="section">
          <div class="section-head">
            <span>${ge(this.hass,"persons")}</span>
            <button
              class="link"
              @click=${this._autoDetect}
              title=${ge(this.hass,"detect_persons_hint")}
            >
              ${ge(this.hass,"detect_persons")}
            </button>
          </div>

          ${this._persons.map((e,t)=>this._personRow(e,t))}
          ${0===this._persons.length?I`<div class="empty">${ge(this.hass,"no_persons")}</div>`:K}

          <button class="add" @click=${this._addPerson}>${ge(this.hass,"add_person")}</button>
        </div>
      </div>
    `:K}_personRow(e,t){const i=this._personColor(e,t),s=e.name||e.person||`${ge(this.hass,"person_fallback")} ${t+1}`;return I`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${i}"></span>
          <span class="ptitle">${s}</span>
          <span class="spacer"></span>
          <ha-icon-button
            .path=${"M7,15L12,10L17,15H7Z"}
            title=${ge(this.hass,"move_up")}
            .disabled=${0===t}
            @click=${()=>this._movePerson(t,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M7,10L12,15L17,10H7Z"}
            title=${ge(this.hass,"move_down")}
            .disabled=${t===this._persons.length-1}
            @click=${()=>this._movePerson(t,1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            title=${ge(this.hass,"remove")}
            @click=${()=>this._removePerson(t)}
          ></ha-icon-button>
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${this._personData(e)}
          .schema=${Ze}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${e=>this._personChanged(t,e)}
        ></ha-form>

        <div class="colors">
          <span class="colors-label">${ge(this.hass,"color")}</span>
          ${Ke.map(i=>I`
              <button
                class="swatch ${e.color===i?"active":""}"
                style="background:${i}"
                title=${i}
                @click=${()=>this._setPersonColor(t,i)}
              ></button>
            `)}
          <button
            class="swatch auto ${e.color?"":"active"}"
            title=${ge(this.hass,"color_auto")}
            @click=${()=>this._setPersonColor(t,void 0)}
          >
            A
          </button>
        </div>
      </div>
    `}}Qe.styles=r`
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
  `,e([he({attribute:!1})],Qe.prototype,"hass",void 0),e([pe()],Qe.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",Qe);var et=Object.freeze({__proto__:null,FamilyTaskCardEditor:Qe});export{qe as FamilyTaskCard};

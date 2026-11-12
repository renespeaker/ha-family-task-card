function e(e,t,n,i){var s,r=arguments.length,o=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(r<3?s(o):r>3?s(t,n,o):s(t,n))||o);return r>3&&o&&Object.defineProperty(t,n,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new r(n,e,i)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",m=_.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},w=(e,t)=>!d(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);s?.call(this,t),this.requestUpdate(e,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),s=t.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const s=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(t,n.type);this._$Em=e,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const r=s.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,n,i=!1,s){if(void 0!==e){const r=this.constructor;if(!1===i&&(s=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??w)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,m?.({ReactiveElement:k}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,x=e=>e,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,T=`<${E}>`,z=document,N=()=>z.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,O="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,R=/>/g,B=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,F=/"/g,K=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),W=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),q=new WeakMap,G=z.createTreeWalker(z,129);function V(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Z=(e,t)=>{const n=e.length-1,i=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=D;for(let t=0;t<n;t++){const n=e[t];let a,d,l=-1,h=0;for(;h<n.length&&(o.lastIndex=h,d=o.exec(n),null!==d);)h=o.lastIndex,o===D?"!--"===d[1]?o=j:void 0!==d[1]?o=R:void 0!==d[2]?(K.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=B):void 0!==d[3]&&(o=B):o===B?">"===d[0]?(o=s??D,l=-1):void 0===d[1]?l=-2:(l=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?B:'"'===d[3]?F:I):o===F||o===I?o=B:o===j||o===R?o=D:(o=B,s=void 0);const c=o===B&&e[t+1].startsWith("/>")?" ":"";r+=o===D?n+T:l>=0?(i.push(a),n.slice(0,l)+P+n.slice(l)+C+c):n+C+(-2===l?t:c)}return[V(e,r+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,r=0;const o=e.length-1,a=this.parts,[d,l]=Z(e,t);if(this.el=J.createElement(d,n),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=G.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(P)){const t=l[r++],n=i.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:n,ctor:"."===o[1]?te:"?"===o[1]?ne:"@"===o[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:s}),i.removeAttribute(e));if(K.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],N()),G.nextNode(),a.push({type:2,index:++s});i.append(e[t],N())}}}else if(8===i.nodeType)if(i.data===E)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)a.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const n=z.createElement("template");return n.innerHTML=e,n}}function Y(e,t,n=e,i){if(t===W)return t;let s=void 0!==i?n._$Co?.[i]:n._$Cl;const r=L(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=s:n._$Cl=s),void 0!==s&&(t=Y(e,s._$AS(e,t.values),s,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??z).importNode(t,!0);G.currentNode=i;let s=G.nextNode(),r=0,o=0,a=n[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Q(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new se(s,this,e)),this._$AV.push(t),a=n[++o]}r!==a?.index&&(s=G.nextNode(),r++)}return G.currentNode=z,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),L(e)?e===U||null==e||""===e?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==U&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=J.createElement(V(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new J(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new Q(this.O(N()),this.O(N()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=U}_$AI(e,t=this,n,i){const s=this.strings;let r=!1;if(void 0===s)e=Y(this,e,t,0),r=!L(e)||e!==this._$AH&&e!==W,r&&(this._$AH=e);else{const i=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=Y(this,i[n+o],t,o),a===W&&(a=this._$AH[o]),r||=!L(a)||a!==this._$AH[o],a===U?e=U:e!==U&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}r&&!i&&this.j(e)}j(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===U?void 0:e}}class ne extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==U)}}class ie extends ee{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??U)===W)return;const n=this._$AH,i=e===U&&n!==U||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==U&&(n===U||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const re=$.litHtmlPolyfillSupport;re?.(J,Q),($.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class ae extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let s=i._$litPart$;if(void 0===s){const e=n?.renderBefore??null;i._$litPart$=s=new Q(t.insertBefore(N(),e),e,void 0,n??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const de=oe.litElementPolyfillSupport;de?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:w},he=(e=le,t,n)=>{const{kind:i,metadata:s}=n;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const s=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,s,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const s=this[i];t.call(this,n),this.requestUpdate(i,s,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};function ce(e){return(t,n)=>"object"==typeof n?he(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function pe(e){return ce({...e,state:!0,attribute:!1})}const ue={subtitle:{de:"Familien-Aufgaben",en:"Family tasks"},open:{de:"offen",en:"open"},all_done_board:{de:"Alles erledigt 🎉",en:"All done 🎉"},all_done_kid:{de:"Alles geschafft!",en:"All done!"},shopping:{de:"Einkauf",en:"Shopping"},items:{de:"Artikel",en:"items"},open_app:{de:"Öffnen",en:"Open"},open_in_bring:{de:"In Bring! öffnen",en:"Open in Bring!"},today:{de:"heute",en:"today"},overdue:{de:"Überfällig",en:"Overdue"},due_soon:{de:"Bald fällig",en:"Due soon"},no_toggle:{de:"Diese Liste unterstützt kein Abhaken",en:"This list can't be checked off"},add_task:{de:"Aufgabe hinzufügen…",en:"Add task…"},private:{de:"Privat",en:"Private"},rewards:{de:"Belohnungen",en:"Rewards"},balance:{de:"Guthaben",en:"Balance"},no_wallet_1:{de:"Kein Guthaben-Helfer (",en:"No points helper ("},no_wallet_2:{de:") gesetzt – Einlösen ist deaktiviert.",en:") set — redeeming is disabled."},redeem:{de:"Einlösen",en:"Redeem"},request:{de:"Anfragen",en:"Request"},waiting:{de:"wartet auf Freigabe",en:"waiting for approval"},approve:{de:"Freigeben",en:"Approve"},deny:{de:"Ablehnen",en:"Deny"},parent_pin:{de:"Eltern-PIN:",en:"Parent PIN:"},cancel:{de:"Abbrechen",en:"Cancel"},wrong_pin:{de:"Falsche PIN",en:"Wrong PIN"},leaderboard:{de:"🏆 Rangliste",en:"🏆 Leaderboard"},lb_week:{de:"diese Woche",en:"this week"},lb_month:{de:"diesen Monat",en:"this month"},lb_all:{de:"Gesamt",en:"All time"},fairness:{de:"⚖️ Fairness",en:"⚖️ Fair share"},fair_target:{de:"Soll",en:"target"},fair_ok:{de:"wie vereinbart",en:"as agreed"},fair_more:{de:"mehr als vereinbart",en:"more than agreed"},fair_less:{de:"weniger als vereinbart",en:"less than agreed"},fair_none:{de:"Noch nichts erledigt",en:"Nothing done yet"},streak_title:{de:"{n} Tage am Stück",en:"{n} days in a row"},level:{de:"Level",en:"Level"},to_next:{de:"zum nächsten",en:"to next"},goal:{de:"Ziel",en:"Goal"},persons:{de:"Personen",en:"Persons"},detect_persons:{de:"Personen erkennen",en:"Detect persons"},detect_persons_hint:{de:"person.*-Entitäten übernehmen",en:"Import person.* entities"},no_persons:{de:"Noch keine Person. Füge eine hinzu.",en:"No person yet. Add one."},add_person:{de:"+ Person hinzufügen",en:"+ Add person"},color:{de:"Farbe",en:"Color"},color_auto:{de:"Automatisch (Palette)",en:"Automatic (palette)"},move_up:{de:"Nach oben",en:"Move up"},move_down:{de:"Nach unten",en:"Move down"},remove:{de:"Entfernen",en:"Remove"},person_fallback:{de:"Person",en:"Person"},sort_manual:{de:"Manuell",en:"Manual"},sort_due:{de:"Nach Fälligkeit",en:"By due date"},sort_alpha:{de:"Alphabetisch",en:"Alphabetical"},theme_auto:{de:"Automatisch (HA-Theme)",en:"Automatic (HA theme)"},theme_dark:{de:"Dunkel",en:"Dark"},theme_light:{de:"Hell",en:"Light"},who_is_it:{de:"Wer ist dran?",en:"Who's there?"},add_reward:{de:"+ Belohnung hinzufügen",en:"+ Add reward"},add_rule:{de:"+ Regel hinzufügen",en:"+ Add rule"},effect_highlight:{de:"Hervorheben",en:"Highlight"},effect_urgent:{de:"Dringend",en:"Urgent"},effect_hide:{de:"Ausblenden",en:"Hide"},on_all_done:{de:"Alles geschafft",en:"All done"},on_task:{de:"Jede Aufgabe",en:"Every task"},on_reward:{de:"Belohnung eingelöst",en:"Reward redeemed"},matrix_sub:{de:"Wichtig × dringend",en:"Important × urgent"},quad_do:{de:"🔴 Jetzt erledigen",en:"🔴 Do now"},quad_do_hint:{de:"wichtig & dringend",en:"important & urgent"},quad_plan:{de:"🗓 Einplanen",en:"🗓 Schedule"},quad_plan_hint:{de:"wichtig, nicht dringend",en:"important, not urgent"},quad_delegate:{de:"👥 Delegieren",en:"👥 Delegate"},quad_delegate_hint:{de:"dringend, nicht wichtig",en:"urgent, not important"},quad_later:{de:"💤 Später",en:"💤 Later"},quad_later_hint:{de:"weder dringend noch wichtig",en:"neither urgent nor important"},grp_overdue:{de:"🔴 Überfällig",en:"🔴 Overdue"},grp_today:{de:"📌 Heute",en:"📌 Today"},grp_soon:{de:"📅 Bald",en:"📅 Soon"},grp_later:{de:"🗓 Später",en:"🗓 Later"},grp_undated:{de:"📥 Ohne Termin",en:"📥 No date"},rot_next_week:{de:"nächste Woche",en:"next week"},rot_next_day:{de:"morgen",en:"tomorrow"},rot_cover:{de:"statt",en:"instead of"},rot_evens:{de:"Ausgleich für",en:"making up for"},away:{de:"✈️ weg",en:"✈️ away"},swap:{de:"Abgeben",en:"Hand over"},swap_to:{de:"an",en:"to"},swap_points:{de:"Punkte",en:"Points"},swap_offer:{de:"Anbieten",en:"Offer"},swap_offered:{de:"angeboten an",en:"offered to"},swap_incoming:{de:"gibt dir",en:"offers you"},swap_take:{de:"Übernehmen",en:"Take over"},swap_decline:{de:"Ablehnen",en:"Decline"},swap_withdraw:{de:"Angebot zurückziehen",en:"Withdraw the offer"},swap_from:{de:"von",en:"from"},swap_failed:{de:"Hat nicht geklappt – genug Punkte?",en:"That didn't work – enough points?"},rot_week:{de:"Wöchentlich (ab Montag)",en:"Weekly (from Monday)"},rot_day:{de:"Täglich",en:"Daily"},err_no_persons:{de:'"persons" muss eine Liste sein (mind. eine Person).',en:'"persons" must be a list with at least one person.'}};function _e(e){return(e?.locale?.language||("undefined"==typeof navigator?"":navigator.language)||"en").toLowerCase().startsWith("de")?"de":"en"}function fe(e,t){const n=ue[t];return n?n[_e(e)]??n.de:t}const ge=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],me=864e5;function ve(e,t){const n=function(e){return Math.round(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/me)}(e);return"day"===t?n:Math.floor((n-4)/7)}const be=e=>new Date(e*me).toISOString().slice(0,10);function we(e,t){if("day"===t)return{start:be(e),end:be(e)};const n=7*e+4;return{start:be(n),end:be(n+6)}}const ye=(e,t)=>(e%t+t)%t;function ke(e,t){const n=e.due?e.due.slice(0,10):void 0;return n&&n>=t.start?null:{..."completed"===e.status?{status:"needs_action"}:{},due_date:t.end}}function $e(e,t){if("string"==typeof e)return e.replace(/\{name\}/g,t.name??"").replace(/\{task\}/g,t.task??"");if(Array.isArray(e))return e.map(e=>$e(e,t));if(e&&"object"==typeof e){const n={};for(const[i,s]of Object.entries(e))n[i]=$e(s,t);return n}return e}function xe(e){if("number"==typeof e)return e>=0?1e3*e:void 0;if("string"==typeof e){const t=e.trim();if(/^\d+(\.\d+)?$/.test(t))return 1e3*Number(t);const n=/^(\d+):(\d+)(?::(\d+(?:\.\d+)?))?$/.exec(t);if(!n)return;return 1e3*(60*(60*Number(n[1])+Number(n[2]))+Number(n[3]??0))}if(e&&"object"==typeof e){const t=e,n=e=>Number(t[e]??0)||0;return 1e3*(60*(60*(24*n("days")+n("hours"))+n("minutes"))+n("seconds"))+n("milliseconds")}}const Ae=e=>Array.isArray(e)?e.map(String):null==e?[]:[String(e)],Se=["sun","mon","tue","wed","thu","fri","sat"];function Pe(e,t){const n=e.condition===t?e.conditions:e[t];return(Array.isArray(n)?n:n?[n]:[]).filter(e=>!!e&&"object"==typeof e&&!1!==e.enabled)}function Ce(e,t){const n="string"==typeof e.condition?e.condition:["and","or","not"].find(t=>t in e),i=(e,n)=>{const i=t.state(e);if(i)return"string"==typeof n?i.attributes?.[n]:i.state};switch(n){case"and":return Pe(e,"and").every(e=>Ce(e,t));case"or":return Pe(e,"or").some(e=>Ce(e,t));case"not":return!Pe(e,"not").some(e=>Ce(e,t));case"state":{const n=Ae(e.entity_id),s=Ae(e.state);if(!n.length||!s.length)return!1;const r=void 0===e.for?0:xe(e.for);if(void 0===r)return!1;const o=n=>{const o=i(n,e.attribute);if(void 0===o||!s.includes(String(o)))return!1;if(!r)return!0;const a=Date.parse(t.state(n)?.last_changed??"");return!isNaN(a)&&t.now().getTime()-a>=r};return"any"===e.match?n.some(o):n.every(o)}case"numeric_state":{const n=Ae(e.entity_id);if(!n.length||void 0!==e.value_template)return!1;const s=e=>{if(null!=e)return"string"==typeof e&&e.includes(".")&&isNaN(Number(e))?Number(t.state(e)?.state):Number(e)},r=s(e.above),o=s(e.below);return(void 0!==r||void 0!==o)&&n.every(t=>{const n=Number(i(t,e.attribute));return void 0!==i(t,e.attribute)&&!isNaN(n)&&((void 0===r||n>r)&&(void 0===o||n<o))})}case"time":{const n=t.now(),i=Ae(e.weekday);if(i.length&&!i.includes(Se[n.getDay()]))return!1;const s=e=>{if(null==e)return null;const n=String(e);return function(e){if(!e)return;const t=/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(e.trim());if(t)return 3600*Number(t[1])+60*Number(t[2])+Number(t[3]??0);const n=new Date(e);return!isNaN(n.getTime())&&/\d{4}-\d{2}-\d{2}/.test(e)?3600*n.getHours()+60*n.getMinutes()+n.getSeconds():void 0}(/^[a-z_]+\.\w+$/.test(n)?t.state(n)?.state:n)},r=s(e.after),o=s(e.before);if(void 0===r||void 0===o)return!1;const a=3600*n.getHours()+60*n.getMinutes()+n.getSeconds();return null!==r&&null!==o&&r>o?a>=r||a<o:(null===r||a>=r)&&(null===o||a<o)}default:return!1}}const Ee=e=>["condition","and","or","not"].some(t=>t in e);async function Te(e,...t){try{await e.call(...t)}catch{}}function ze(e){return e.lists?(Array.isArray(e.lists)?e.lists:[e.lists]).filter(Boolean):[]}const Ne=e=>"string"==typeof e?e:e.entity;function Le(e){return ze(e).map(Ne).filter(Boolean)}const Me=/(^|\s)@([\p{L}\p{N}_-]+)/gu,Oe=/(^|\s)\+(\d{1,4})(?=$|[\s.,;:!?)])/g,De=e=>e.toLocaleLowerCase();function je(e){const t=(e??"").trim();if(!t)return[];const n=t.split(/\s+/);return[De(n.join("")),De(n[0])]}function Re(e){return e.map(e=>{const t=new Set([...je(e.name),...je(e.friendly)]),n=e.person?.split(".")[1];return n&&t.add(De(n)),t})}function Be(e,t){const n=[];let i,s=e.replace(Me,(e,i,s)=>{const r=De(s),o=t.flatMap((e,t)=>e.has(r)?[t]:[]);if(!o.length)return e;for(const e of o)n.includes(e)||n.push(e);return i});return s=s.replace(Oe,(e,t,n)=>(void 0===i&&(i=Math.min(9999,Number(n))),t)),s===e?{title:s,persons:n}:(s=s.replace(/\s{2,}/g," ").replace(/\s+([.,;:!?])/g,"$1").trim(),void 0===i?{title:s,persons:n}:{title:s,persons:n,points:i})}function Ie(e,t,n){const i=Re(t),s=n.trim().split(/\s+/),r=[s[0],s.join(""),t[e]?.person?.split(".")[1]??""].find(t=>{return/^[\p{L}\p{N}_-]+$/u.test(t)&&(!!(n=t)&&i.every((t,i)=>i===e||!t.has(De(n))))&&i[e]?.has(De(t));var n});return r?`@${r}`:void 0}const Fe="Family Task Card",Ke=["🌱","⭐","🔥","🏅","🏆","👑"],He=ge,We={ok:"✓",more:"▲",less:"▼"},Ue=[0,5,10,20],qe=new Map,Ge=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function Ve(e,t){return e.color||He[t%He.length]}const Ze=["do","plan","delegate","later"];function Je(e,t){return t?e?"do":"plan":e?"delegate":"later"}function Ye(e){return e.trimStart().startsWith("!")}const Xe=["overdue","today","soon","later","undated"],Qe=new Set(["later","undated"]);function et(e){const t=tt(e.due);if(!t)return"undated";if(it(e))return"overdue";const n=nt(t.day);return n<=0?"today":n<=7?"soon":"later"}function tt(e){if(!e)return;const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t)return{day:new Date(+t[1],+t[2]-1,+t[3])};const n=new Date(e);return isNaN(n.getTime())?void 0:n.getHours()+n.getMinutes()+n.getSeconds()+n.getMilliseconds()===0?{day:new Date(n.getFullYear(),n.getMonth(),n.getDate())}:n.getUTCHours()+n.getUTCMinutes()+n.getUTCSeconds()+n.getUTCMilliseconds()===0?{day:new Date(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate())}:{day:new Date(n.getFullYear(),n.getMonth(),n.getDate()),at:n}}function nt(e){const t=new Date,n=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())-n)/864e5)}function it(e){const t=tt(e.due);return!!t&&(t.at?t.at.getTime()<Date.now():nt(t.day)<0)}function st(e,t){const n=tt(e.due);return!(!n||t<=0||it(e))&&nt(n.day)<=t}function rt(e,t,n){if(e.lists){if(!(Array.isArray(e.lists)?e.lists:[e.lists]).includes(n))return!1}return!(e.match&&!function(e,t){if(t.toLowerCase().includes(e.toLowerCase()))return!0;try{return new RegExp(e,"i").test(t)}catch{return!1}}(e.match,t))}function ot(e,t){let n=!1;if(t)if(void 0!==e.state){n=(Array.isArray(e.state)?e.state:[e.state]).includes(t.state)}else if(void 0!==e.above||void 0!==e.below){const i=Number(t.state);isNaN(i)||(n=!0,void 0===e.above||i>e.above||(n=!1),void 0===e.below||i<e.below||(n=!1))}else n=!["off","unavailable","unknown","","none","false"].includes(t.state.toLowerCase());return e.invert?!n:n}class at extends ae{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1,this._refreshAgain=!1,this._retryAt={},this._sending=new Map,this._activeKid=0,this._burst=!1,this._shopPerson=null,this._kidShopOpen=!1,this._pending=null,this._pin="",this._pinError=!1,this._prevOpen={},this._checkedHere=new Set,this._kioskIdle=!0,this._wakeUntil=0,this._hadMotion=!1,this._eatClick=!1,this._onNightTap=()=>{this._nightWindow()&&(this._night&&(this._eatClick=!0),this._wakeUntil=Date.now()+this._wakeMs,this.requestUpdate())},this._onNightClick=e=>{this._eatClick&&(this._eatClick=!1,e.stopPropagation(),e.preventDefault())},this._offering=null,this._offerTo=null,this._offerPoints=0,this._offerFailed=!1,this._rotSent=new Set,this._reported=new Set,this._coverSent=new Set,this._expanded={}}static async getConfigElement(){return await Promise.resolve().then(function(){return Mt}),document.createElement("family-task-card-editor")}static getStubConfig(e){const t=e?Object.keys(e.states).find(e=>e.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:fe(e,"subtitle"),persons:[{name:"Person 1",lists:t?[t]:[]}]}}setConfig(e){if(!e||!Array.isArray(e.persons))throw new Error(fe(this.hass,"err_no_persons"));this._config={points_per_task:10,...e}}getCardSize(){const e=this._config?.persons?.length??1;return 2+Math.min(e,4)}willUpdate(e){if((e.has("hass")||e.has("_config"))&&this.hass&&this._config&&this._refresh(),e.has("hass")){const e=this._motion;(e||this._hadMotion)&&this._nightWindow()&&(this._wakeUntil=Date.now()+this._wakeMs),this._hadMotion=e}}static _clockMin(e){const t=/^(\d{1,2}):(\d{2})/.exec(String(e??"").trim());if(!t)return null;const n=60*Number(t[1])+Number(t[2]);return n>=0&&n<1440?n:null}_nightWindow(){const e=at._clockMin(this._config?.night_start),t=at._clockMin(this._config?.night_end);if(null===e||null===t||e===t)return!1;const n=new Date,i=60*n.getHours()+n.getMinutes();return e<t?i>=e&&i<t:i>=e||i<t}get _wakeMs(){return 1e3*Math.max(Number(this._config?.auto_return)||0,120)}get _motion(){const e=this._config?.night_wake_entity;return(Array.isArray(e)?e:e?[e]:[]).some(e=>"on"===this.hass?.states[e]?.state)}get _night(){return this._nightWindow()&&Date.now()>=this._wakeUntil&&!this._motion}_renderNight(){const e=new Date,t=this.hass?.locale?.language||void 0,n=new Intl.DateTimeFormat(t,{hour:"2-digit",minute:"2-digit"}).format(e),i=new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long"}).format(e);let s=0;for(const e of this._config.persons)s+=this._personView(e).openCount;return H`<ha-card class="night">
      <div class="night-time">${n}</div>
      <div class="night-date">${i}</div>
      <div class="night-foot">🌙 ${s?H`${s} ${this._t("open")}`:"✓"}</div>
    </ha-card>`}async _refresh(){if(!this.hass||!this._config)return;if(this._loading)return void(this._refreshAgain=!0);const e=new Set;for(const t of this._config.persons)for(const n of Le(t))e.add(n);for(const t of this._rotationLists())e.add(t);const t=Date.now(),n=[];for(const i of e){const e=this.hass.states[i],s=e?`${e.state}|${e.last_changed}`:"missing",r=void 0!==this._retryAt[i]&&t>=this._retryAt[i];(this._sig[i]!==s||r)&&(this._sig[i]=s,this._isReady(i)&&n.push(i))}if(0!==n.length){this._loading=!0;try{const e={};await Promise.all(n.map(async t=>{try{const n=await this.hass.callWS({type:"todo/item/list",entity_id:t});delete this._retryAt[t],e[t]=this._withSending(t,n?.items??[])}catch(e){this._retryAt[t]=Date.now()+1e4}})),Object.keys(e).length&&(this._items={...this._items,...e})}finally{this._loading=!1}this._refreshAgain&&(this._refreshAgain=!1,this._refresh())}}_isReady(e){const t=this.hass?.states[e]?.state;return void 0!==t&&"unavailable"!==t&&"unknown"!==t}_withSending(e,t){return 0===this._sending.size?t:t.map(t=>{const n=this._sending.get(`${e}|${t.uid}`);return n&&n.status!==t.status?{...t,status:n.status}:t})}_shoppingSet(){const e=this._config?.shopping_lists,t=e?Array.isArray(e)?e:[e]:[];return new Set(t.filter(Boolean))}_listName(e){return this.hass?.states[e]?.attributes?.friendly_name||this._t("shopping")}_bringLink(){return this._config?.bring_deeplink||"https://web.getbring.com"}_levelInfo(e){return function(e,t,n){if(!t||t<=0)return null;const i=Math.floor(e/t)+1;return{level:i,pct:Math.round(e%t/t*100),emoji:n[Math.min(i-1,n.length-1)]??"⭐"}}(e,this._config?.level_size??100,this._config?.level_emojis??Ke)}_t(e){return fe(this.hass,e)}_themeClass(){const e=this._config?.theme;return"dark"===e?"theme-dark":"light"===e?"theme-light":""}_canToggle(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(4&t)}_canCreate(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(1&t)}_addEntityFor(e){const t=this._shoppingSet();return this._ownLists(e).find(e=>!t.has(e)&&this._canCreate(e))}_rotationLists(){const e=this._config;if(!e?.rotation||!e.rotation_lists)return[];return(Array.isArray(e.rotation_lists)?e.rotation_lists:[e.rotation_lists]).filter(Boolean)}_ownLists(e){const t=this._rotationLists();return t.length?Le(e).filter(e=>!t.includes(e)):Le(e)}_rotationGroup(){const e=this._config?.persons??[],t=this._config?.rotation_persons??[],n=e.map((e,t)=>t);if(0===t.length)return n;const i=new Set(t.map(e=>e.toLowerCase())),s=n.filter(t=>{const n=e[t];return[n.name,n.person].some(e=>e&&i.has(e.toLowerCase()))});return s.length?s:n}_rotationPeriod(){return"day"===this._config?.rotation_period?"day":"week"}_away(){const e=new Set;return(this._config?.persons??[]).forEach((t,n)=>{const i=t.away_entity?this.hass?.states[t.away_entity]?.state:void 0;"on"===i?.toLowerCase()&&e.add(n)}),e}_catchUp(e,t,n,i,s){const r=new Set;for(const i of t){if(!i.settled_by?.endsWith(n))continue;const t=i.settled_by.slice(0,-n.length),s=e.get(t),o=this._personIndexByKey(i.absent),a=this._personIndexByKey(i.helper);!s||o<0||a<0||(e.set(t,{...s,now:o,evens:a}),r.add(t))}const o=n.slice(1),a=new Map;for(const e of t){if(e.settled_by||e.key.slice(e.key.lastIndexOf("|")+1)>=o)continue;const t=this._personIndexByKey(e.absent),n=this._personIndexByKey(e.helper);if(t<0||n<0||i.has(t)||!s.includes(t))continue;const r=`${t}>${n}`,d=a.get(r);d?d.n+=1:a.set(r,{to:t,helper:n,n:1})}for(const{to:t,helper:n,n:i}of a.values()){const s=[...e.entries()].filter(([e,t])=>t.now===n&&void 0===t.covers&&void 0===t.evens&&void 0===t.handedBy&&!r.has(e)).map(([e])=>e).sort();for(const r of s.slice(0,i))e.set(r,{...e.get(r),now:t,evens:n})}}_rotationMap(){const e=this._rotationLists(),t=this._rotationGroup(),n=this._rotationPeriod(),i=ve(new Date,n),s=this._away(),r=t.filter(e=>!s.has(e)),o=this._offers().filter(e=>e.accepted),a=this._covers(),d=[e.join(","),t.join(","),n,i,r.join(","),o.map(e=>`${e.key}>${e.to}`).join(","),a.map(e=>`${e.key}>${e.settled_by??""}`).join(",")].join("|"),l=this._tagMap(),h=this._rotCache;if(h&&h.items===this._items&&h.tags===l&&h.sig===d)return h.map;const c=function(e,t,n){const i=new Map;if(t<=0)return i;const s=[...e].sort((e,t)=>e.item.summary.localeCompare(t.item.summary)||e.item.uid.localeCompare(t.item.uid));return s.forEach((e,s)=>{i.set(e.key,{now:ye(s+n,t),next:ye(s+n+1,t)})}),i}(e.flatMap(e=>(this._items[e]??[]).filter(t=>!this._taggedFor(e,t)).map(t=>({key:`${e}|${t.uid}`,item:this._shown(e,t)}))),t.length,i),p=new Map,u=r.length>0&&r.length<t.length,_=new Map(r.map(e=>[e,0])),f=[];for(const[e,n]of c){const i=t[n.now];p.set(e,{now:i,next:t[n.next]}),u&&s.has(i)?f.push(e):_.has(i)&&_.set(i,_.get(i)+1)}const g=r.map((e,t)=>r[(t+i)%r.length]);for(const e of f){const t=g.reduce((e,t)=>_.get(t)<_.get(e)?t:e),n=p.get(e);p.set(e,{...n,now:t,covers:n.now}),_.set(t,_.get(t)+1)}const m=`|${we(i,n).end}`;this._catchUp(p,a,m,s,t);for(const e of o){if(!e.key.endsWith(m))continue;const t=e.key.slice(0,-m.length),n=p.get(t),i=this._personIndexByKey(e.to);if(!n||i<0)continue;const s=this._personIndexByKey(e.from);p.set(t,{...n,now:i,handedBy:s>=0?s:n.now})}return this._rotCache={items:this._items,tags:l,sig:d,map:p},p}_rotationHint(e){const t=this._config?.persons??[];if(this._rotationGroup().length<2)return;const n=this._rotationMap().get(`${e.entity}|${e.item.uid}`);if(!n)return;if(void 0!==n.handedBy)return`🔁 ${this._t("swap_from")} ${this._personName(t[n.handedBy],n.handedBy)}`;if(void 0!==n.evens)return`↩️ ${this._t("rot_evens")} ${this._personName(t[n.evens],n.evens)}`;if(void 0!==n.covers)return`🤝 ${this._t("rot_cover")} ${this._personName(t[n.covers],n.covers)}`;return`🔄 ${this._t("day"===this._rotationPeriod()?"rot_next_day":"rot_next_week")}: ${this._personName(t[n.next],n.next)}`}_swapOn(){return!!this._config?.chore_swap&&this._backendOn()&&!!this.hass?.services?.family_tasks?.offer_chore&&this._rotationLists().length>0}_offers(){if(!this._swapOn())return[];const e=this.hass?.states??{};if(this._offerCache?.states===e)return this._offerCache.list;const t=new Map;for(const n of Object.values(e)){const e=n.attributes??{};if(n.entity_id?.startsWith("sensor.")&&"string"==typeof e.person&&Array.isArray(e.offers))for(const n of e.offers)n&&"string"==typeof n.id&&"string"==typeof n.key&&t.set(n.id,n)}const n=[...t.values()];return this._offerCache={states:e,list:n},n}_catchUpOn(){return!!this._config?.catch_up&&this._backendOn()&&!!this.hass?.services?.family_tasks?.cover&&this._rotationLists().length>0}_covers(){if(!this._catchUpOn())return[];const e=this.hass?.states??{};if(this._coverCache?.states===e)return this._coverCache.list;const t=new Map;for(const n of Object.values(e)){const e=n.attributes??{};if(n.entity_id?.startsWith("sensor.")&&"string"==typeof e.person&&Array.isArray(e.covers))for(const n of e.covers)n&&"string"==typeof n.key&&!t.has(n.key)&&t.set(n.key,n)}const n=[...t.values()];return this._coverCache={states:e,list:n},n}_personIndexByKey(e){return(this._config?.persons??[]).findIndex((t,n)=>this._personKey(t,n)===e)}_roundEnd(){const e=this._rotationPeriod();return we(ve(new Date,e),e).end}_swapTurn(e){if(this._swapOn()&&"completed"!==e.item.status&&this._rotationLists().includes(e.entity))return this._rotationMap().get(`${e.entity}|${e.item.uid}`)}_openOffer(e,t){const n=this._awardKey(e,t);return this._offers().find(e=>!e.accepted&&e.key===n)}_incoming(e){const t=this._config?.persons[e];if(!t)return[];const n=this._personKey(t,e),i=`|${this._roundEnd()}`;return this._offers().filter(e=>!e.accepted&&e.to===n&&e.key.endsWith(i))}_startOffer(e,t){this._offering={entity:e.entity,item:e.item,from:t},this._offerTo=null,this._offerPoints=0,this._offerFailed=!1}async _sendOffer(){const e=this._offering,t=this._offerTo;if(!e||null===t||!this.hass)return;const n=this._config.persons;try{await this.hass.callService("family_tasks","offer_chore",{key:this._awardKey(e.entity,e.item),person:this._personKey(n[e.from],e.from),to:this._personKey(n[t],t),points:this._offerPoints,chore:e.item.summary,until:this._roundEnd()}),this._offering=null}catch(e){this._offerFailed=!0}}_answerOffer(e,t){this.hass?.callService("family_tasks","answer_offer",{offer_id:e,accept:t}).catch(()=>{})}_offerPanel(e){const t=this._offering;if(!t||t.from!==e)return U;const n=this._config.persons,i=this._away(),s=this._rotationGroup().filter(t=>t!==e&&!i.has(t)),r=this._personView(n[e]).balance;return H`
      <div class="offer">
        <div class="offer-head">🔁 ${this._t("swap")}: ${t.item.summary}</div>
        <div class="offer-row">
          <span class="offer-label">${this._t("swap_to")}</span>
          ${s.map(e=>H`<button
                class="chip ${this._offerTo===e?"on":""}"
                style="--pc:${Ve(n[e],e)}"
                @click=${()=>this._offerTo=e}
              >
                ${this._personName(n[e],e)}
              </button>`)}
        </div>
        <div class="offer-row">
          <span class="offer-label">${this._t("swap_points")}</span>
          ${Ue.map(e=>H`<button
                class="chip ${this._offerPoints===e?"on":""}"
                ?disabled=${e>r}
                @click=${()=>this._offerPoints=e}
              >
                ${e?`+${e}`:"0"}
              </button>`)}
        </div>
        ${this._offerFailed?H`<div class="offer-err">${this._t("swap_failed")}</div>`:U}
        <div class="offer-row end">
          <button class="reward-btn" ?disabled=${null===this._offerTo} @click=${this._sendOffer}>
            ${this._t("swap_offer")}
          </button>
          <button
            class="pin-cancel"
            title=${this._t("cancel")}
            @click=${()=>this._offering=null}
          >
            ✕
          </button>
        </div>
      </div>
    `}_incomingRows(e){const t=this._config?.persons??[];return this._incoming(e).map(e=>{const n=this._personIndexByKey(e.from),i=n>=0?this._personName(t[n],n):e.from;return H`
        <div class="offer-in">
          <span class="offer-in-text"
            >🔁 ${i} ${this._t("swap_incoming")} <b>${e.chore}</b>${e.points?` · +${e.points} ⭐`:""}</span
          >
          <button class="reward-btn approve" @click=${()=>this._answerOffer(e.id,!0)}>
            ${this._t("swap_take")}
          </button>
          <button
            class="reward-btn deny"
            title=${this._t("swap_decline")}
            @click=${()=>this._answerOffer(e.id,!1)}
          >
            ✕
          </button>
        </div>
      `})}_swapButton(e,t=!1){const n=this._swapTurn(e);if(!n||void 0!==n.handedBy)return U;const i=this._openOffer(e.entity,e.item),s=e=>e.stopPropagation();return i?H`<button
          class="swap-btn ${t?"kid":""}"
          title=${this._t("swap_withdraw")}
          aria-label=${this._t("swap_withdraw")}
          @click=${e=>{s(e),this._answerOffer(i.id,!1)}}
          @keydown=${s}
        >
          ✕
        </button>`:H`<button
          class="swap-btn ${t?"kid":""}"
          title=${this._t("swap")}
          aria-label=${this._t("swap")}
          @click=${t=>{s(t),this._startOffer(e,n.now)}}
          @keydown=${s}
        >
          🔁
        </button>`}_offerNote(e){if(!this._swapTurn(e))return;const t=this._openOffer(e.entity,e.item);if(!t)return;const n=this._config?.persons??[],i=this._personIndexByKey(t.to),s=i>=0?this._personName(n[i],i):t.to;return`⏳ ${this._t("swap_offered")} ${s}${t.points?` · +${t.points}`:""}`}_canSetDue(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(16&t)}_maintainRotation(){const e=this._config;if(!e?.rotation||!1===e.rotation_reset||!this.hass)return;const t=this._rotationPeriod(),n=we(ve(new Date,t),t);for(const e of this._rotationLists()){const t=this._items[e];if(t&&this._isReady(e)&&(this._canToggle(e)&&this._canSetDue(e)))for(const i of t){const t=ke(i,n);if(!t)continue;const s=`${e}|${i.uid}|${n.end}`;this._rotSent.has(s)||(this._rotSent.add(s),this.hass.callService("todo","update_item",{entity_id:e,item:i.uid,...t}).catch(()=>this._rotSent.delete(s)))}}}_personNames(){return(this._config?.persons??[]).map(e=>({name:e.name,person:e.person,friendly:e.person?this.hass?.states[e.person]?.attributes?.friendly_name:void 0}))}_tagMap(){const e=this._config;if(!e?.title_tags)return qe;const t=this._tagCache;if(t&&t.items===this._items&&t.config===e){if(t.hass===this.hass)return t.map;if(JSON.stringify(this._personNames())===t.names)return t.hass=this.hass,t.map}const n=this._personNames(),i=Re(n),s=new Map;for(const[e,t]of Object.entries(this._items))for(const n of t){const t=Be(n.summary,i);t.title!==n.summary&&s.set(`${e}|${n.uid}`,t)}return this._tagCache={items:this._items,config:e,hass:this.hass,names:JSON.stringify(n),map:s},s}_taggedFor(e,t){const n=this._tagMap().get(`${e}|${t.uid}`)?.persons;return n?.length?n:void 0}_pointsOf(e,t){return this._tagMap().get(`${e}|${t.uid}`)?.points??this._config?.points_per_task??10}_shown(e,t){const n=this._tagMap().get(`${e}|${t.uid}`),i=n?{...t,summary:n.title}:t;if(!this._isPrivate(t))return i;const s=Ye(t.summary)?"! ":"";return{...i,summary:`${s}${this._t("private")}`,description:void 0,private:!0}}_isPrivate(e){const t=this._config?.private_patterns;if(!Array.isArray(t)||0===t.length)return!1;const n=`${e.summary??""} ${e.description??""}`.toLowerCase();return t.some(e=>{const t=String(e).trim().toLowerCase();return t.length>0&&n.includes(t)})}_shownLists(){const e=new Set;for(const t of this._config?.persons??[])for(const n of Le(t))e.add(n);for(const t of this._rotationLists())e.add(t);return[...e]}_taggedTasks(e){if(!this._config?.title_tags)return[];const t=[];for(const n of this._shownLists())for(const i of this._items[n]??[])this._taggedFor(n,i)?.includes(e)&&t.push({entity:n,item:i});return t}_tagNew(e,t,n){const i=this._config;if(!i?.title_tags||n<0)return e;const s=i.persons.filter(e=>this._ownLists(e).includes(t)).length;if(s<2)return e;const r=this._personNames();if(Be(e,Re(r)).persons.length)return e;const o=Ie(n,r,this._personName(i.persons[n],n));return o?`${e} ${o}`:e}async _addTask(e,t,n=-1){if(!this.hass)return;const i=t.value.trim();if(i){t.value="";try{await this.hass.callService("todo","add_item",{entity_id:e,item:this._tagNew(i,e,n)}),this._sig[e]="",this._refresh()}catch(e){t.value=i}}}_personView(e){const t=this._config,n=t.shopping_points??t.points_per_task??10,i=this._shoppingSet(),s=t.persons.indexOf(e),r=[],o=[],a=[];let d=0;for(const t of this._ownLists(e)){const s=(this._items[t]??[]).filter(e=>!this._taggedFor(t,e)).map(e=>({entity:t,item:this._shown(t,e)}));if(i.has(t)){const e=s.filter(e=>"completed"!==e.item.status),i=s.filter(e=>"completed"===e.item.status);e.length>0?a.push({entity:t,name:this._listName(t),open:e}):i.length>0&&(d+=n)}else{const n=this._listFilter(e,t);for(const e of s)"completed"===e.item.status?(o.push(e),d+=this._pointsOf(t,e.item)):this._visible(e.item,n)&&r.push(e)}}const l=this._rotationLists();for(const{entity:t,item:n}of this._taggedTasks(s)){const i={entity:t,item:this._shown(t,n)},s=l.includes(t);"completed"===n.status?(o.push(i),s||(d+=this._pointsOf(t,n))):(s||this._visible(n,this._listFilter(e,t)))&&r.push(i)}if(l.length){const e=this._rotationMap();for(const t of l)for(const n of this._items[t]??[]){if(e.get(`${t}|${n.uid}`)?.now!==s)continue;const i={entity:t,item:this._shown(t,n)};("completed"===n.status?o:r).push(i)}}const h=this._decorate(this._sortOpen(r)),c={tasksOpen:h,tasksDone:o,shopOpen:a,openCount:h.length+a.length};if(this._backendOn()){const t=this._ledger(this._personKey(e,s)),n=t?.earned??0,i=t?.redeemed??0,r=t?.reserved??0;return{...c,earned:n,spent:i,balance:n-i-r+(t?.transferred??0),hasWallet:!0,requests:t?.pending??[],weekPoints:t?.weekPoints??0,monthPoints:t?.monthPoints??0,streak:t?.streak??0}}const p=!!e.points_entity,u=p?this._spent(e):0;return{...c,earned:d,spent:u,balance:d-u,hasWallet:p}}_backendOn(){return!!this._config?.points_backend&&!!this.hass?.services?.family_tasks?.award}_personKey(e,t){return e.person||e.name||`person_${t+1}`}_ledger(e){const t=this.hass?.states??{};if(this._ledgerCache?.states!==t){const e=new Map;for(const n of Object.values(t)){const t=n.attributes??{};n.entity_id?.startsWith("sensor.")&&"string"==typeof t.person&&("number"==typeof t.earned&&e.set(t.person,{earned:t.earned,redeemed:Number(t.redeemed)||0,reserved:Number(t.reserved)||0,transferred:Number(t.transferred)||0,pending:Array.isArray(t.pending)?t.pending:[],offers:Array.isArray(t.offers)?t.offers:[],weekPoints:Number(t.week_points)||0,monthPoints:Number(t.month_points)||0,streak:Number(t.streak)||0}))}this._ledgerCache={states:t,map:e}}return this._ledgerCache.map.get(e)}_awardKey(e,t){if(!this._rotationLists().includes(e))return`${e}|${t.uid}`;const n=this._rotationPeriod();return`${e}|${t.uid}|${we(ve(new Date,n),n).end}`}_awardKeys(e,t){const n=this._awardKey(e,t),i=this._taggedFor(e,t);if(!i||i.length<2)return[n];const s=this._config.persons;return i.map((e,t)=>0===t?n:`${n}|${this._personKey(s[e],e)}`)}_award(e,t,n,i){if(this._reported.has(e)||!this.hass)return;this._reported.add(e);const s=this._config.persons[t];this.hass.callService("family_tasks","award",{key:e,person:this._personKey(s,t),points:n,task:i}).catch(()=>{})}_reportCompletions(){if(!this._backendOn())return;const e=this._config,t=this._shoppingSet(),n=this._rotationLists(),i=this._rotationPeriod(),s=we(ve(new Date,i),i),r=(e,t)=>this._shown(e,t).summary;if(e.persons.forEach((e,n)=>{for(const i of this._ownLists(e))if(!t.has(i))for(const e of this._items[i]??[])"completed"!==e.status||this._taggedFor(i,e)||this._award(`${i}|${e.uid}`,n,this._pointsOf(i,e),r(i,e))}),e.title_tags)for(const e of this._shownLists())for(const t of this._items[e]??[]){const i=this._taggedFor(e,t);if(!i||"completed"!==t.status)continue;if(n.includes(e)&&ke(t,s))continue;const o=this._awardKeys(e,t),a=this._pointsOf(e,t);i.forEach((n,i)=>this._award(o[i],n,a,r(e,t)))}if(!n.length)return;const o=this._rotationMap();for(const e of n)for(const t of this._items[e]??[]){if("completed"!==t.status||ke(t,s))continue;const n=o.get(`${e}|${t.uid}`);if(!n)continue;const i=this._awardKey(e,t);this._award(i,n.now,this._pointsOf(e,t),r(e,t)),this._catchUpOn()&&this._noteCover(i,n,r(e,t))}}_noteCover(e,t,n){const i=this._config.persons,s=e=>this._personKey(i[e],e);this.hass&&!this._coverSent.has(e)&&(void 0!==t.covers?(this._coverSent.add(e),this.hass.callService("family_tasks","cover",{key:e,person:s(t.now),absent:s(t.covers),chore:n}).catch(()=>this._coverSent.delete(e))):void 0!==t.evens&&(this._coverSent.add(e),this.hass.callService("family_tasks","even_out",{key:e,person:s(t.now),helper:s(t.evens)}).catch(()=>this._coverSent.delete(e))))}_listFilter(e,t){const n=ze(e).find(e=>"string"!=typeof e&&e.entity===t),i="object"==typeof n?n:{};return{hide_undated:i.hide_undated??this._config?.hide_undated,show_within:i.show_within??this._config?.show_within}}_visible(e,t){const n=tt(e.due);return n?"number"!=typeof t.show_within||t.show_within<0||(it(e)||nt(n.day)<=t.show_within):!t.hide_undated}_ownerIndex(e){return(this._config?.persons??[]).findIndex(t=>this._ownLists(t).includes(e))}_spent(e){if(!e.points_entity)return 0;const t=Number(this.hass?.states[e.points_entity]?.state);return isNaN(t)?0:t}_sortOpen(e){const t=this._config?.sort??"manual";if("manual"===t)return e;const n=e=>{const t=tt(e.due);return t?(t.at??t.day).getTime():1/0},i=[...e];return"alpha"===t?i.sort((e,t)=>e.item.summary.localeCompare(t.item.summary)):"due"===t&&i.sort((e,t)=>n(e.item)-n(t.item)),i}_decorate(e){const t=this._config?.context_rules??[],n=!1!==this._config?.highlight_overdue,i=this._config?.due_soon,s=[];for(const r of e){let e,o=!1,a="none";for(const n of t)if(rt(n,r.item.summary,r.entity)&&ot(n,this.hass?.states[n.entity])){if("hide"===n.effect){o=!0;break}"urgent"===n.effect?(a="urgent",e=n.label??e):"highlight"===n.effect&&"urgent"!==a&&(a="highlight",e=e??n.label)}o||("none"===a&&i&&st(r.item,i)&&(a="highlight",e=e??this._t("due_soon")),n&&it(r.item)&&(a="urgent",e=e??this._t("overdue")),s.push({...r,flag:a,label:e}))}const r=e=>"urgent"===e?0:"highlight"===e?1:2;return s.map((e,t)=>({d:e,i:t})).sort((e,t)=>r(e.d.flag)-r(t.d.flag)||e.i-t.i).map(({d:e})=>e)}async _completeShopping(e){await Promise.all(e.open.map(e=>this._toggle(e.entity,e.item,!0)));const t=this._ownerIndex(e.entity);if(this._backendOn()&&t>=0){const n=this._config,i=n.shopping_points??n.points_per_task??10,s=(new Date).toLocaleDateString("sv");this._award(`${e.entity}|trip|${s}`,t,i,e.name)}this._fireCelebrate("task",{name:this._ownerName(e.entity),task:e.name})}_rewards(){return this._config?.rewards??[]}_approvalOn(){return this._backendOn()&&!!this._config?.reward_approval&&!!this.hass?.services?.family_tasks?.request_reward}_hasPin(){const e=this._config?.parent_pin;return null!=e&&""!==e}async _requestReward(e,t){const n=this._config?.persons[e];if(n&&this.hass){this._celebrate();try{await this.hass.callService("family_tasks","request_reward",{person:this._personKey(n,e),points:t.cost,reward:t.name})}catch(t){this._shopPerson=e}}}_startDecide(e,t,n){this._pending={personIdx:e,requestId:t,approve:n},this._pin="",this._pinError=!1}async _decide(e,t){this.hass&&await this.hass.callService("family_tasks",t?"approve":"deny",{request_id:e})}_startRedeem(e,t){if(this._approvalOn())return void this._requestReward(e,t);const n=this._config?.parent_pin;null!=n&&""!==n?(this._pending={personIdx:e,reward:t},this._pin="",this._pinError=!1):this._doRedeem(e,t)}_confirmRedeem(){if(this._pending)if(this._pin===String(this._config?.parent_pin??"")){const e=this._pending;"requestId"in e?(this._cancelRedeem(),this._decide(e.requestId,e.approve)):this._doRedeem(e.personIdx,e.reward)}else this._pinError=!0}_cancelRedeem(){this._pending=null,this._pin="",this._pinError=!1}async _doRedeem(e,t){const n=this._config?.persons[e];if(!n||!this.hass)return;if(this._backendOn()){this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("family_tasks","redeem",{person:this._personKey(n,e),points:t.cost,reward:t.name}),this._fireCelebrate("reward",{name:this._personName(n,e),task:t.name})}catch(t){this._shopPerson=e}return}if(!n.points_entity)return;const i=this._spent(n)+t.cost;this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("input_number","set_value",{entity_id:n.points_entity,value:i}),this._fireCelebrate("reward",{name:this._personName(n,e),task:t.name})}catch(t){this._shopPerson=e}}_personName(e,t){return e.name||(e.person?this.hass?.states[e.person]?.attributes?.friendly_name:"")||`${this._t("person_fallback")} ${t+1}`}async _toggle(e,t,n=!1){if(!this.hass)return;const i="completed"===t.status?"needs_action":"completed",s=`${e}|${t.uid}`,r={status:i};if(this._sending.set(s,r),"completed"===i)for(const n of this._ownersOf(e,t))this._checkedHere.add(n);this._items={...this._items,[e]:(this._items[e]??[]).map(e=>e.uid===t.uid?{...e,status:i}:e)};try{if(await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:i}),"needs_action"===i&&this._backendOn())for(const n of this._awardKeys(e,t))this._reported.delete(n),await this.hass.callService("family_tasks","revoke",{key:n});"completed"!==i||n||this._fireCelebrate("task",{name:this._ownerName(e,t),task:t.summary})}catch(t){this._sig[e]="",this._refresh()}finally{this._sending.get(s)===r&&this._sending.delete(s)}}render(){if(!this._config)return U;const e=this._config;if(this._night)return this._renderNight();if(e.kiosk&&e.persons.length>0)return this._renderKiosk();if(e.kid_mode&&e.persons.length>0)return this._renderKid();if(e.eisenhower)return this._renderMatrix();let t=0;const n=e.persons.map((e,n)=>{const i=this._personView(e);return t+=i.earned,{p:e,idx:n,view:i}}),i=e.show_completed,s=e.hide_empty?n.filter(e=>e.view.openCount>0||i&&e.view.tasksDone.length>0):n,r=(e.title||Fe).trim(),o=this._t("subtitle");return H`
      <ha-card class=${this._themeClass()}>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${r}</div>
            ${o.toLowerCase()!==r.toLowerCase()?H`<div class="sub">${o}</div>`:U}
          </div>
          ${this._goalBar(t)}
        </div>

        <div class="board">${s.map(e=>this._column(e.p,e.idx,e.view))}</div>
        ${this._leaderboard(n)} ${this._fairness(n)}
      </ha-card>
    `}_renderMatrix(){const e=this._config,t=e.urgent_within??2,n=new Map,i=e.persons.map((e,t)=>({p:e,idx:t,view:this._personView(e)}));i.forEach(({p:e,idx:t,view:i})=>{for(const s of i.tasksOpen){const i=`${s.entity}|${s.item.uid}`,r=this._personName(e,t),o=this._listImportant(e,s.entity),a=n.get(i);a?(a.who.push(r),a.important||=o):n.set(i,{o:s,idx:t,who:[r],important:o})}});const s=new Map(Ze.map(e=>[e,[]]));for(const e of n.values()){const{item:n,flag:i}=e.o,r=tt(n.due),o="urgent"===i||it(n)||!!r&&nt(r.day)<=t,a=e.important||Ye(n.summary);s.get(Je(o,a)).push(e)}const r=(e,t)=>{const n=tt(e.o.item.due),i=tt(t.o.item.due);return((n?.at??n?.day)?.getTime()??1/0)-((i?.at??i?.day)?.getTime()??1/0)};return H`
      <ha-card class=${this._themeClass()}>
        <div class="head">
          <div class="badge">🧭</div>
          <div class="head-text">
            <div class="title">${e.title||Fe}</div>
            <div class="sub">${this._t("matrix_sub")}</div>
          </div>
        </div>
        <div class="matrix">
          <div class="quad-grid">
            ${Ze.map(t=>{const n=s.get(t).sort(r);return H`
                <div class="quad ${t}">
                  <div class="quad-head">
                    <span>${this._t(`quad_${t}`)}</span
                    ><span class="grp-count">${n.length}</span>
                  </div>
                  <div class="quad-hint">${this._t(`quad_${t}_hint`)}</div>
                  ${n.length?n.map(({o:t,idx:n,who:i})=>{return this._tile(t,Ve(e.persons[n],n),!1,t.flag,t.label,{title:(s=t.item.summary,s.trimStart().replace(/^!+\s*/,"")),who:i.join(" & ")});var s}):H`<div class="quad-empty">—</div>`}
                </div>
              `})}
          </div>
        </div>
        ${this._fairness(i)}
      </ha-card>
    `}_listImportant(e,t){return ze(e).some(e=>"object"==typeof e&&e.entity===t&&!!e.important)}_leaderboard(e){if(!this._config?.show_leaderboard||e.length<2)return U;const t=["🥇","🥈","🥉"],n=this._backendOn()?this._config?.leaderboard_period??"all":"all",i=e=>"week"===n?e.weekPoints??0:"month"===n?e.monthPoints??0:e.earned,s=[...e].sort((e,t)=>i(t.view)-i(e.view));return H`
      <div class="leaderboard">
        <div class="lb-title">
          ${this._t("leaderboard")}${"all"===n?U:H` · ${this._t("week"===n?"lb_week":"lb_month")}`}
        </div>
        ${s.map((e,n)=>H`
            <div class="lb-row">
              <span class="lb-rank">${t[n]??`${n+1}.`}</span>
              <span class="lb-dot" style="background:${Ve(e.p,e.idx)}"></span>
              <span class="lb-name">${this._personName(e.p,e.idx)}</span>
              <span class="lb-pts">⭐ ${i(e.view)}</span>
            </div>
          `)}
      </div>
    `}_fairness(e){if(!this._config?.show_fairness||e.length<2)return U;const t=this._backendOn()?this._config.fairness_period??"week":"all",n=e=>Math.max(0,"week"===t?e.weekPoints??0:"month"===t?e.monthPoints??0:e.earned),i=e.reduce((e,t)=>e+n(t.view),0),s=new Intl.NumberFormat(this.hass?.locale?.language||"de",{style:"percent"}),r=e.map(e=>{const t=i>0?n(e.view)/i:0,s="number"==typeof e.p.share&&e.p.share>=0?e.p.share:void 0,r=void 0===s?0:Math.round(100*t)-s,o=Math.abs(r)<=5?"ok":r>0?"more":"less";return{...e,name:this._personName(e.p,e.idx),share:t,target:s,mark:o}});return H`
      <div class="fairness">
        <div class="lb-title">
          ${this._t("fairness")}${"all"===t?U:H` · ${this._t("week"===t?"lb_week":"lb_month")}`}
        </div>
        ${i>0?H`<div class="fair-bar">
                  ${r.map(e=>e.share>0?H`<div
                          class="fair-seg"
                          style="flex:${e.share};background:${Ve(e.p,e.idx)}"
                          title="${e.name} ${s.format(e.share)}"
                        ></div>`:U)}
                </div>
                <div class="fair-legend">
                  ${r.map(e=>H`
                      <span class="fair-item">
                        <span class="lb-dot" style="background:${Ve(e.p,e.idx)}"></span>
                        <span class="fair-name">${e.name}</span>
                        <span class="fair-pct">${s.format(e.share)}</span>
                        ${void 0===e.target?U:H`<span
                                class="fair-target ${e.mark}"
                                title=${this._t(`fair_${e.mark}`)}
                                >${this._t("fair_target")} ${s.format(e.target/100)}
                                ${We[e.mark]}</span
                              >`}
                      </span>
                    `)}
                </div>`:H`<div class="fair-none">${this._t("fair_none")}</div>`}
      </div>
    `}_awayChip(e){return this._away().has(e)?H`<span class="lvl away">${this._t("away")}</span>`:U}_streakChip(e,t=!1){const n=e.streak??0;return!this._config?.show_streak||!this._backendOn()||n<2?U:H`<span
      class="lvl streak ${t?"kid-lvl":""}"
      title=${this._t("streak_title").replace("{n}",String(n))}
      >⚡ ${n}</span
    >`}_autoReturnSecs(){return this._config?.auto_return??30}_resetKioskTimer(){this._kioskTimer&&clearTimeout(this._kioskTimer);const e=this._autoReturnSecs();!this._config?.kiosk||e<=0||(this._kioskTimer=window.setTimeout(()=>{this._kioskIdle=!0},1e3*e))}_wakeKiosk(e){this._activeKid=e,this._kioskIdle=!1,this._resetKioskTimer()}_renderKiosk(){const e=()=>{this._kioskIdle||this._resetKioskTimer()},t=this._kioskIdle?this._renderKioskPicker():this._renderKid();return H`<div class="kiosk-wrap" @pointerdown=${e} @keydown=${e}>
      ${t}
    </div>`}_renderKioskPicker(){const e=this._config,t=this._themeClass();let n=0;for(const t of e.persons)n+=this._personView(t).earned;return H`
      <ha-card class="kiosk-idle ${t}">
        <div class="kiosk-title">${this._t("who_is_it")}</div>
        <div class="kiosk-people">${e.persons.map((e,t)=>this._kioskAvatar(e,t))}</div>
        <div class="kiosk-foot">⭐ ${n}</div>
      </ha-card>
    `}_kioskAvatar(e,t){const n=Ve(e,t),i=this._personName(e,t),s=e.person?this.hass?.states[e.person]:void 0,r=s?.attributes?.entity_picture,o=i.slice(0,2).toUpperCase(),a=this._personView(e).openCount;return H`
      <button class="kiosk-person" @click=${()=>this._wakeKiosk(t)}>
        ${r?H`<div
                class="kiosk-av"
                style="background-image:url('${r}');box-shadow:0 0 0 4px ${n}"
              ></div>`:H`<div class="kiosk-av initials" style="background:${n}">${o}</div>`}
        <div class="kiosk-name">${i}</div>
        <div class="kiosk-open">${a?H`${a} ${this._t("open")}`:"✓"}</div>
      </button>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerdown",this._onNightTap),this.addEventListener("click",this._onNightClick,!0),this._nightTimer||(this._nightTimer=window.setInterval(()=>this._nightTick(),3e4)),this._config?.kiosk&&!this._kioskIdle&&this._resetKioskTimer()}_nightTick(){this._config?.night_start&&this._config?.night_end&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this._onNightTap),this.removeEventListener("click",this._onNightClick,!0),this._nightTimer&&(clearInterval(this._nightTimer),this._nightTimer=void 0),this._burstTimer&&clearTimeout(this._burstTimer),this._burst=!1,this._kioskTimer&&clearTimeout(this._kioskTimer)}_renderKid(){const e=this._config,t=e.persons,n=Math.min(this._activeKid,t.length-1),i=t[n],s=Ve(i,n),r=this._personName(i,n),o=this._personView(i),a=o.earned,d=o.openCount,l=i.goal??e.goal,h=l&&l>0?Math.min(100,Math.round(a/l*100)):0,c=0===d,p=this._rewards().length>0,u=o.hasWallet?o.balance:a,_=this._levelInfo(a);return H`
      <ha-card class="kid ${this._themeClass()}" style="--pc:${s}">
        ${t.length>1?H`<div class="kid-people">
                ${t.map((e,t)=>this._kidAvatar(e,t,t===n))}
              </div>`:U}

        <div class="kid-hero">
          ${this._kidAvatar(i,n,!1,!0)}
          <div class="kid-hero-text">
            <div class="kid-name">
              ${r}${_?H`<span class="lvl kid-lvl">${_.emoji} L${_.level}</span>`:U}${this._streakChip(o,!0)}
            </div>
            <div class="kid-stars">
              ${o.hasWallet?"💰":"⭐"}
              ${u}${d?H` · ${d} ${this._t("open")}`:U}
            </div>
          </div>
          ${p?H`<button
                  class="kid-shop-btn ${this._kidShopOpen?"active":""}"
                  title=${this._t("rewards")}
                  @click=${()=>{this._kidShopOpen=!this._kidShopOpen,this._cancelRedeem()}}
                >
                  🎁
                </button>`:U}
        </div>

        ${l&&l>0?H`<div class="kid-bar"><div class="kid-fill" style="width:${h}%"></div></div>`:U}
        ${p&&this._kidShopOpen?this._shopPanel(n,o.balance,o.hasWallet,o.requests):H`<div class="kid-tasks">
                ${this._incomingRows(n)}${this._offerPanel(n)}
                ${c?H`<div class="kid-alldone">
                        🎉
                        <div>${this._t("all_done_kid")}</div>
                      </div>`:H`${o.shopOpen.map(e=>this._kidShopping(e,s))}
                      ${o.tasksOpen.map(e=>this._kidTask(e,s))}`}
              </div>`}
        ${this._burst?H`<div class="burst">⭐</div>`:U}
      </ha-card>
    `}_kidAvatar(e,t,n,i=!1){const s=Ve(e,t),r=this._personName(e,t),o=e.person?this.hass?.states[e.person]:void 0,a=o?.attributes?.entity_picture,d=r.slice(0,2).toUpperCase(),l=`kid-av ${i?"big":""} ${n?"active":""}`,h=a?`background-image:url('${a}');box-shadow:0 0 0 3px ${s}`:`background:${s}`,c=a?U:H`<span>${d}</span>`;return i?H`<div class="${l}" style="${h}">${c}</div>`:H`<button
          class="${l}"
          style="${h}"
          title=${r}
          @click=${()=>this._activeKid=t}
        >
          ${c}
        </button>`}_kidTask(e,t){const{entity:n,item:i,flag:s,label:r}=e,o="urgent"===s?"⚠️":this._emoji(n,i),a=this._canToggle(n),d=r??this._offerNote(e)??this._rotationHint(e),l=this._swapButton(e,!0),h=H`
      <button
        class="kid-task ${s}"
        style="--pc:${t}"
        ?disabled=${!a}
        title=${a?"":this._t("no_toggle")}
        @click=${()=>this._kidComplete(n,i)}
      >
        <span class="kid-emoji">${o}</span>
        <span class="kid-task-title">
          ${i.summary}${d?H`<span class="kid-sub">${d}</span>`:U}
        </span>
        <span class="kid-check">${a?"◯":"🔒"}</span>
      </button>
    `;return l===U?h:H`<div class="kid-row">${h}${l}</div>`}_kidShopping(e,t){return H`
      <button
        class="kid-task"
        style="--pc:${t}"
        @click=${()=>this._kidCompleteShopping(e)}
      >
        <span class="kid-emoji">🛒</span>
        <span class="kid-task-title">
          ${e.name}
          <span class="kid-sub">${e.open.length} ${this._t("items")}</span>
        </span>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          @click=${e=>e.stopPropagation()}
        >
          ${this._t("open_app")}
        </a>
      </button>
    `}_celebrate(){this._burst=!0,this._burstTimer&&clearTimeout(this._burstTimer),this._burstTimer=window.setTimeout(()=>{this._burst=!1},900)}_ownersOf(e,t){const n=this._taggedFor(e,t);if(n)return n;if(this._rotationLists().includes(e)){const n=this._rotationMap().get(`${e}|${t.uid}`);return n?[n.now]:[]}return(this._config?.persons??[]).flatMap((t,n)=>this._ownLists(t).includes(e)?[n]:[])}_ownerName(e,t){const n=this._config?.persons??[],i=t?this._taggedFor(e,t):void 0;if(i)return i.map(e=>this._personName(n[e],e)).join(" & ");if(t&&this._rotationLists().includes(e)){const i=this._rotationMap().get(`${e}|${t.uid}`);return i?this._personName(n[i.now],i.now):void 0}for(let t=0;t<n.length;t++)if(this._ownLists(n[t]).includes(e))return this._personName(n[t],t)}_fireCelebrate(e,t){const n=this._config?.celebrate;if(!n||!this.hass||!Array.isArray(n.actions))return;(n.on?Array.isArray(n.on)?n.on:[n.on]:["all_done"]).includes(e)&&async function(e,t,n){if(Array.isArray(e))for(const i of e){if(!i||"object"!=typeof i)continue;const e=i;if(!1===e.enabled)continue;if(Ee(e)){if(!Ce(e,n))return;continue}if("delay"in e){const t=xe(e.delay);t&&await n.wait(t);continue}if("stop"in e)return;const s=e.action??e.service;if("string"==typeof s&&s.includes(".")){const[i,...r]=s.split("."),o=$e(e.data??{},t),a=e.target?$e(e.target,t):void 0;await Te(n,i,r.join("."),o,a);continue}"string"==typeof e.scene&&await Te(n,"scene","turn_on",{entity_id:e.scene})}}(n.actions,t,{state:e=>this.hass?.states[e],call:async(e,t,n,i)=>{this.hass&&await this.hass.callService(e,t,n,i)},wait:e=>new Promise(t=>setTimeout(t,e)),now:()=>new Date}).catch(()=>{})}updated(){if(this.toggleAttribute("night",this._night),!this._config)return;this._applyAppearance(),this._maintainRotation(),this._reportCompletions();const e=this._config.active_person_entity;if(e){const t=this.hass?.states[e]?.state;if(t!==this._lastActive){this._lastActive=t;const e=this._activePersonIndex();e>=0&&(this._config.kiosk?this._wakeKiosk(e):this._activeKid=e)}}const t=this._checkedHere;this._checkedHere=new Set,this._config.celebrate&&this._config.persons.forEach((e,n)=>{const i=this._personView(e).openCount,s=this._prevOpen[n];this._prevOpen[n]=i,t.has(n)&&void 0!==s&&s>0&&0===i&&this._fireCelebrate("all_done",{name:this._personName(e,n)})})}_applyAppearance(){const e=this._config,t=(e,t,n)=>{const i="number"==typeof e&&isFinite(e)?e:100;return Math.min(n,Math.max(t,i))/100},n=t(e?.font_scale,50,300),i=t(e?.avatar_scale,40,400),s=t(e?.scale,40,400);this.style.setProperty("--ftc-fs",String(n)),this.style.setProperty("--ftc-av",String(i)),this.style.setProperty("zoom",1===s?"":String(s))}_activePersonIndex(){const e=this._config?.active_person_entity,t=e?this.hass?.states[e]?.state:void 0;if(!t||["unknown","unavailable",""].includes(t))return-1;const n=t.toLowerCase(),i=this._config?.persons??[];for(let e=0;e<i.length;e++){const t=i[e];if(t.person&&t.person.toLowerCase()===n)return e;if(this._personName(t,e).toLowerCase()===n)return e;const s=t.person?this.hass?.states[t.person]?.attributes?.friendly_name:void 0;if(s&&s.toLowerCase()===n)return e}return-1}async _kidComplete(e,t){this._celebrate(),await this._toggle(e,t)}async _kidCompleteShopping(e){this._celebrate(),await this._completeShopping(e)}_goalBar(e){const t=this._config?.goal;if(!t||t<=0)return H`<div class="fam-pts">⭐ ${e}</div>`;const n=Math.max(0,Math.min(100,Math.round(e/t*100)));return H`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${e}</span><span class="goal-target">${this._t("goal")} ${t}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${n}%"></div></div>
      </div>
    `}_column(e,t,n){const i=Ve(e,t),s=this._personName(e,t),r=e.person?this.hass?.states[e.person]:void 0,o=r?.attributes?.entity_picture,a=s.slice(0,2).toUpperCase(),d=this._config?.show_completed,l=0===n.openCount&&(!d||0===n.tasksDone.length),h=this._rewards().length>0,c=this._shopPerson===t,p=n.hasWallet?n.balance:n.earned,u=this._levelInfo(n.earned),_=!1===this._config?.allow_add?void 0:this._addEntityFor(e),f=!!this._config?.active_person_entity&&this._activePersonIndex()===t;return H`
      <div class="col ${f?"active":""}" style="--pc:${i}">
        <div class="col-head">
          ${o?H`<div
                  class="avatar"
                  style="background-image:url('${o}');box-shadow:0 0 0 2px ${i}55"
                ></div>`:H`<div class="avatar initials" style="background:${i}">${a}</div>`}
          <div class="col-meta">
            <div class="pname">
              <span class="pname-txt">${s}</span>
              ${u?H`<span
                      class="lvl"
                      title="${this._t("level")} ${u.level} · ${u.pct}% ${this._t("to_next")}"
                      >${u.emoji} L${u.level}</span
                    >`:U}
              ${this._streakChip(n)}${this._awayChip(t)}
            </div>
            <div class="pstatus">
              ${n.openCount} ${this._t("open")} · ${n.hasWallet?"💰":"⭐"} ${p}
            </div>
          </div>
          ${h?H`<button
                  class="shop-toggle ${c?"active":""}"
                  title=${this._t("rewards")}
                  @click=${()=>{this._shopPerson=c?null:t,this._cancelRedeem()}}
                >
                  🎁
                </button>`:U}
        </div>

        <div class="tiles">
          ${this._incomingRows(t)}
          ${l?H`<div class="empty">${this._t("all_done_board")}</div>`:U}
          ${n.shopOpen.map(e=>this._shoppingTile(e,i))}
          ${this._config.group_by_due?this._groupedTiles(t,n.tasksOpen,i):n.tasksOpen.map(e=>this._tile(e,i,!1,e.flag,e.label))}
          ${d?n.tasksDone.map(e=>this._tile(e,i,!0)):U}
        </div>

        ${_?H`<div class="add-row">
                <input
                  class="add-input"
                  type="text"
                  placeholder=${this._t("add_task")}
                  @keydown=${e=>{"Enter"===e.key&&this._addTask(_,e.target,t)}}
                />
              </div>`:U}
        ${this._offerPanel(t)}
        ${c?this._shopPanel(t,n.balance,n.hasWallet,n.requests):U}
      </div>
    `}_groupedTiles(e,t,n){const i=new Map;for(const e of t){const t=et(e.item);i.set(t,[...i.get(t)??[],e])}return Xe.filter(e=>i.has(e)).map(t=>{const s=i.get(t),r=`${e}|${t}`,o=Qe.has(t),a=!o||!!this._expanded[r];return H`
        <div
          class="grp-head ${t} ${o?"collapsible":""}"
          role=${o?"button":U}
          tabindex=${o?0:U}
          aria-expanded=${o?String(a):U}
          @click=${o?()=>this._toggleGroup(r):U}
          @keydown=${o?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleGroup(r))}:U}
        >
          <span>${this._t(`grp_${t}`)}</span>
          <span class="grp-count">${s.length}${o?a?" ▾":" ▸":""}</span>
        </div>
        ${a?s.map(e=>this._tile(e,n,!1,e.flag,e.label)):U}
      `})}_toggleGroup(e){this._expanded={...this._expanded,[e]:!this._expanded[e]}}_shopPanel(e,t,n,i=[]){const s=this._rewards(),r=this._pending?.personIdx===e?this._pending:null,o=this._approvalOn();return H`
      <div class="shop">
        <div class="shop-head">
          <span>🎁 ${this._t("rewards")}</span>
          <span class="shop-balance"
            >${this._t("balance")} ${n?"💰":"⭐"} ${t}</span
          >
        </div>
        ${n?U:H`<div class="shop-note">
                ${this._t("no_wallet_1")}<code>points_entity</code>,
                <code>input_number</code>${this._t("no_wallet_2")}
              </div>`}
        ${s.map(i=>{const s=n&&t>=i.cost;return H`
            <div class="reward ${s?"":"locked"}">
              <span class="reward-emoji">${i.emoji||"🎁"}</span>
              <span class="reward-name">${i.name}</span>
              <span class="reward-cost">⭐ ${i.cost}</span>
              <button
                class="reward-btn"
                ?disabled=${!s}
                @click=${()=>this._startRedeem(e,i)}
              >
                ${this._t(o?"request":"redeem")}
              </button>
            </div>
          `})}
        ${i.map(t=>H`
            <div class="reward waiting">
              <span class="reward-emoji">⏳</span>
              <span class="reward-name"
                >${t.reward}<span class="reward-wait">${this._t("waiting")}</span></span
              >
              <span class="reward-cost">⭐ ${t.points}</span>
              ${this._hasPin()?H`<button
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
                      </button>`:U}
            </div>
          `)}
        ${r?this._pinRow():U}
      </div>
    `}_pinRow(){return H`
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
        ${this._pinError?H`<span class="pin-msg">${this._t("wrong_pin")}</span>`:U}
      </div>
    `}_shoppingTile(e,t){const n=e.open.length,i=this._canToggle(e.entity);return H`
      <div
        class="tile shopping ${i?"":"readonly"}"
        style="--pc:${t}"
        role=${i?"button":"listitem"}
        tabindex=${i?0:-1}
        @click=${i?()=>this._completeShopping(e):U}
        @keydown=${i?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._completeShopping(e))}:U}
      >
        <div class="check">${i?"":"🔒"}</div>
        <div class="tile-emoji">🛒</div>
        <div class="tile-text">
          <div class="tile-title">${e.name}</div>
          <div class="tile-due">${n} ${this._t("items")}</div>
        </div>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          title=${this._t("open_in_bring")}
          aria-label=${this._t("open_in_bring")}
          @click=${e=>e.stopPropagation()}
        >
          <span class="bo-text">${this._t("open_app")}</span
          ><span class="bo-icon" aria-hidden="true">↗</span>
        </a>
      </div>
    `}_tile(e,t,n,i="none",s,r){const{entity:o,item:a}=e,d="urgent"===i?"⚠️":this._emoji(o,a),l=this._canToggle(o),h=n?void 0:(r?void 0:this._offerNote(e))??this._rotationHint(e);return H`
      <div
        class="tile ${n?"done":i} ${l?"":"readonly"}"
        style="--pc:${t}"
        title=${l?"":this._t("no_toggle")}
        role=${l?"button":"listitem"}
        tabindex=${l?0:-1}
        @click=${l?()=>this._toggle(o,a):U}
        @keydown=${l?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle(o,a))}:U}
      >
        <div class="check">${n?"✓":l?"":"🔒"}</div>
        <div class="tile-emoji">${d}</div>
        <div class="tile-text">
          <div class="tile-title">${r?r.title:a.summary}</div>
          ${r?H`${s?H`<div class="tile-flag">${s}</div>`:U}
                  <div class="tile-due">
                    ${r.who}${a.due?` · ${this._formatDue(a.due)}`:""}
                  </div>`:s?H`<div class="tile-flag">${s}</div>`:h?H`<div class="tile-due">${h}</div>`:a.due?H`<div class="tile-due">${this._formatDue(a.due)}</div>`:U}
        </div>
        ${n||r?U:this._swapButton(e)}
      </div>
    `}_emoji(e,t){return t.private?"🔒":this._shoppingSet().has(e)?"🛒":function(e){for(const[t,n]of Ge)if(t.test(e))return n;return"📝"}(t.summary)}_formatDue(e){const t=tt(e);if(!t)return e;const n=this.hass?.locale?.language||"de",i=0===nt(t.day)?this._t("today"):new Intl.DateTimeFormat(n,{weekday:"short",day:"numeric",month:"short"}).format(t.day);if(!t.at)return i;return`${i}, ${new Intl.DateTimeFormat(n,{hour:"2-digit",minute:"2-digit"}).format(t.at)}`}}at.styles=o`
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
    .tile.shopping {
      container-type: inline-size;
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
    .bring-open .bo-icon {
      display: none;
    }
    /* Narrow columns (many persons): a compact ↗ leaves room for the list name. */
    @container (max-width: 300px) {
      .bring-open {
        width: 34px;
        padding: 0;
        justify-content: center;
        font-size: 1em;
      }
      .bring-open .bo-text {
        display: none;
      }
      .bring-open .bo-icon {
        display: inline;
      }
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
    /* A chore that can be handed over: the big tile plus its 🔁 button. */
    .kid-row {
      display: flex;
      gap: 8px;
    }
    .kid-row .kid-task {
      flex: 1 1 auto;
      min-width: 0;
    }
    .swap-btn {
      flex: none;
      margin-left: auto;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      font: inherit;
      font-size: 15px;
      line-height: 1;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--pc) 22%, var(--card-background-color, #fff));
    }
    .swap-btn.kid {
      margin-left: 0;
      width: 56px;
      height: auto;
      border-radius: 16px;
      font-size: 24px;
    }
    .offer {
      margin-top: 10px;
      padding: 10px;
      border-radius: 12px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
    }
    .offer-head {
      font-weight: 700;
      margin-bottom: 8px;
      overflow-wrap: anywhere;
    }
    .offer-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
    }
    .offer-row.end {
      justify-content: flex-end;
    }
    .offer-label {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      min-width: 52px;
    }
    .chip {
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      padding: 5px 12px;
      font: inherit;
      font-size: 0.85em;
      font-weight: 600;
      cursor: pointer;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
    }
    .chip.on {
      border-color: var(--pc, var(--primary-color));
      background: color-mix(in srgb, var(--pc, var(--primary-color)) 22%, transparent);
    }
    .chip:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .offer-err {
      margin-top: 6px;
      font-size: 0.8em;
      font-weight: 700;
      color: var(--error-color, #db4437);
    }
    .offer-in {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--pc) 16%, var(--card-background-color, #fff));
      border: 1px dashed var(--pc);
    }
    .offer-in-text {
      flex: 1 1 auto;
      font-size: 0.9em;
      overflow-wrap: anywhere;
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
    ha-card.night {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 260px;
      padding: 32px 16px;
      background: #0b0b0f;
      color: #d4d4d4;
    }
    .night-time {
      font-size: 72px;
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      color: #e5e5e5;
    }
    .night-date {
      font-size: 20px;
      color: #9a9a9a;
    }
    .night-foot {
      margin-top: 12px;
      font-size: 16px;
      color: #9a9a9a;
    }
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
    .fairness {
      margin-top: 16px;
      padding: 12px;
      border-radius: 14px;
      background: color-mix(in srgb, var(--primary-color) 5%, var(--card-background-color, #fff));
      border: 1px solid var(--divider-color);
    }
    .leaderboard + .fairness {
      margin-top: 10px;
    }
    .fair-bar {
      display: flex;
      gap: 2px;
      height: 14px;
      border-radius: 7px;
      overflow: hidden;
    }
    .fair-seg {
      min-width: 4px;
    }
    .fair-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 16px;
      margin-top: 10px;
      font-size: 0.92em;
    }
    .fair-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .fair-name {
      font-weight: 600;
    }
    .fair-pct {
      font-weight: 700;
    }
    .fair-target {
      color: var(--secondary-text-color);
      font-size: 0.92em;
    }
    .fair-target.more,
    .fair-target.less {
      color: var(--warning-color, #f59e0b);
      font-weight: 600;
    }
    .fair-none {
      color: var(--secondary-text-color);
      font-size: 0.92em;
    }
    .lb-name {
      flex: 1 1 auto;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lvl.away {
      background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent);
      color: var(--secondary-text-color);
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
  `,e([ce({attribute:!1})],at.prototype,"hass",void 0),e([pe()],at.prototype,"_config",void 0),e([pe()],at.prototype,"_items",void 0),e([pe()],at.prototype,"_activeKid",void 0),e([pe()],at.prototype,"_burst",void 0),e([pe()],at.prototype,"_shopPerson",void 0),e([pe()],at.prototype,"_kidShopOpen",void 0),e([pe()],at.prototype,"_pending",void 0),e([pe()],at.prototype,"_pin",void 0),e([pe()],at.prototype,"_pinError",void 0),e([pe()],at.prototype,"_kioskIdle",void 0),e([pe()],at.prototype,"_offering",void 0),e([pe()],at.prototype,"_offerTo",void 0),e([pe()],at.prototype,"_offerPoints",void 0),e([pe()],at.prototype,"_offerFailed",void 0),e([pe()],at.prototype,"_expanded",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",at),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:Fe,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const dt=ge,lt=["manual","due","alpha"],ht=["auto","dark","light"],ct=["week","day"],pt=["all","week","month"],ut=["week","month","all"],_t={text:{}},ft={boolean:{}},gt=(e,t,n=1)=>({number:{min:e,max:t,mode:"box",step:n}}),mt=(e,t)=>({number:{min:e,max:t,mode:"slider",step:5,unit_of_measurement:"%"}}),vt=(e,t=!1)=>({entity:{filter:{domain:e},...t?{multiple:t}:{}}}),bt=[{name:"name",selector:_t},{name:"person",selector:vt("person")},{name:"lists",selector:vt("todo",!0)},{name:"goal",selector:gt(0,1e5)},{name:"points_entity",selector:vt("input_number")}],wt={entity:{filter:["input_boolean","binary_sensor","calendar","schedule","switch"].map(e=>({domain:e}))}},yt=e=>"number"==typeof e&&!isNaN(e),kt=e=>e.split(/[\s,]+/).filter(Boolean),$t=e=>e.split(",").map(e=>e.trim()).filter(Boolean),xt={general:{de:"Allgemein",en:"General"},mode:{de:"Modus",en:"Mode"},tasks:{de:"Aufgaben & Filter",en:"Tasks & filters"},rotation:{de:"Ämtli-Rotation",en:"Chore rotation"},points:{de:"Punkte & Level",en:"Points & levels"},shopping:{de:"Einkauf (Bring!)",en:"Shopping (Bring!)"},look:{de:"Darstellung",en:"Appearance"},rewards:{de:"Belohnungen",en:"Rewards"},rules:{de:"Kontext-Regeln",en:"Context rules"},celebrate:{de:"Feier-Aktionen",en:"Celebrate actions"},list_settings:{de:"Listen-Einstellungen",en:"List settings"}},At=["highlight","urgent","hide"],St=["all_done","task","reward"],Pt=[{name:"name",selector:_t},{name:"cost",selector:gt(1,1e5)},{name:"emoji",selector:_t}],Ct=[{name:"parent_pin",selector:_t}],Et=[{name:"important",selector:ft},{name:"hide_undated",selector:ft},{name:"show_within",selector:gt(0,365)}],Tt={title:{de:"Titel",en:"Title"},theme:{de:"Farbschema",en:"Color scheme"},points_per_task:{de:"Punkte pro Aufgabe",en:"Points per task"},goal:{de:"Ziel (Punkte)",en:"Goal (points)"},show_completed:{de:"Erledigte anzeigen",en:"Show completed"},kid_mode:{de:"Kinder-Modus",en:"Kid mode"},eisenhower:{de:"Eisenhower-Ansicht (für Eltern)",en:"Eisenhower view (for parents)"},urgent_within:{de:"Dringend: fällig in … Tagen",en:"Urgent: due within … days"},active_person_entity:{de:"Aktive Person (Entität)",en:"Active person (entity)"},kiosk:{de:"Kiosk-Modus (Wandtablet)",en:"Kiosk mode (wall tablet)"},auto_return:{de:"Auto-Rückkehr (Sek.)",en:"Auto-return (sec)"},night_start:{de:"Nachtbildschirm ab",en:"Night screen from"},night_end:{de:"Nachtbildschirm bis",en:"Night screen until"},night_wake_entity:{de:"Bei Bewegung aufwecken",en:"Wake on motion"},highlight_overdue:{de:"Überfällige hervorheben",en:"Highlight overdue"},shopping_lists:{de:"Einkaufslisten (Bring!)",en:"Shopping lists (Bring!)"},shopping_points:{de:"Punkte pro Einkauf",en:"Points per shopping trip"},bring_deeplink:{de:"Bring!-Link",en:"Bring! link"},parent_pin:{de:"Eltern-PIN (Belohnungen)",en:"Parent PIN (rewards)"},points_backend:{de:"Punktekonto nutzen (Family Task Card Integration)",en:"Use points ledger (Family Task Card Integration)"},reward_approval:{de:"Belohnungs-Freigabe per Push",en:"Reward approval by push"},level_size:{de:"Punkte pro Level",en:"Points per level"},show_leaderboard:{de:"Rangliste anzeigen",en:"Show leaderboard"},leaderboard_period:{de:"Rangliste für",en:"Leaderboard for"},show_fairness:{de:"Fairness-Anzeige",en:"Fair-share bar"},fairness_period:{de:"Fairness für",en:"Fair share for"},share:{de:"Soll-Anteil an der Arbeit (%)",en:"Agreed share of the work (%)"},away_entity:{de:"Abwesend, solange an",en:"Away while on"},show_streak:{de:"Serien anzeigen (⚡)",en:"Show streaks (⚡)"},rotation:{de:"Auto-Rotation (reihum)",en:"Auto-rotation (take turns)"},rotation_lists:{de:"Ämtli-Listen (reihum)",en:"Chore lists (rotating)"},rotation_period:{de:"Wechsel",en:"Rotate"},rotation_persons:{de:"Wer macht mit?",en:"Who takes part?"},rotation_reset:{de:"Ämtli jede Runde wieder öffnen",en:"Reopen chores every round"},chore_swap:{de:"Ämtli abgeben (auf Wunsch gegen Punkte)",en:"Hand over chores (for points if you like)"},catch_up:{de:"Nachholen nach Abwesenheit",en:"Make up for it after being away"},scale:{de:"Kartengröße",en:"Card size"},font_scale:{de:"Schriftgröße",en:"Font size"},avatar_scale:{de:"Avatar-/Bildgröße",en:"Avatar / picture size"},sort:{de:"Sortierung",en:"Sort"},hide_empty:{de:"Leere Personen ausblenden",en:"Hide empty persons"},due_soon:{de:"Bald fällig (Tage)",en:"Due soon (days)"},group_by_due:{de:"Nach Fälligkeit gruppieren",en:"Group by due date"},hide_undated:{de:"Aufgaben ohne Termin ausblenden",en:"Hide tasks without a date"},show_within:{de:"Nur fällig in den nächsten … Tagen",en:"Only due within … days"},allow_add:{de:"Aufgabe-hinzufügen-Feld",en:"Add-task field"},private_patterns:{de:"Private Aufgaben",en:"Private tasks"},title_tags:{de:"Kurzschrift im Titel (@Person, +Punkte)",en:"Shorthand in titles (@person, +points)"},name:{de:"Name",en:"Name"},level_emojis:{de:"Level-Abzeichen",en:"Level badges"},cost:{de:"Preis (Punkte)",en:"Price (points)"},emoji:{de:"Emoji",en:"Emoji"},important:{de:"Wichtig (Eisenhower)",en:"Important (Eisenhower)"},match:{de:"Titel enthält",en:"Title contains"},entity:{de:"Entität",en:"Entity"},state:{de:"Wenn Zustand",en:"When state"},effect:{de:"Wirkung",en:"Effect"},label:{de:"Hinweis",en:"Note"},invert:{de:"Umkehren (wenn NICHT)",en:"Invert (when NOT)"},on:{de:"Wann feiern",en:"When to celebrate"},actions:{de:"Aktionen",en:"Actions"},person:{de:"Person (Avatar)",en:"Person (avatar)"},lists:{de:"Aufgabenlisten (todo.*)",en:"Task lists (todo.*)"},points_entity:{de:"Guthaben-Helfer (input_number)",en:"Points helper (input_number)"}},zt={theme:{de:"Farbschema der Karte erzwingen (unabhängig vom Dashboard-Theme). Standard: dem HA-Theme folgen.",en:"Force the card's color scheme (independent of the dashboard theme). Default: follow the HA theme."},points_per_task:{de:"Punkte je erledigter Aufgabe (Standard 10).",en:"Points per completed task (default 10)."},goal:{de:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",en:"Family points goal for the progress bar. 0 = off."},show_completed:{de:"Erledigte Aufgaben ausgegraut mitanzeigen.",en:"Also show completed tasks (dimmed)."},eisenhower:{de:"Statt Spalten pro Person ein 2×2-Raster: Jetzt erledigen / Einplanen / Delegieren / Später. Dringend = überfällig oder bald fällig; wichtig = „!“ am Titelanfang oder Liste mit „Wichtig“ (Listen-Einstellungen der Person). Kinder- und Kiosk-Modus haben Vorrang.",en:"Instead of person columns, a 2×2 grid: Do now / Schedule / Delegate / Later. Urgent = overdue or due soon; important = “!” at the start of the title or a list marked “Important” (the person's list settings). Kid and kiosk mode take precedence."},urgent_within:{de:"Aufgaben, die in so vielen Tagen fällig sind, gelten als dringend (Überfälliges immer). Standard 2.",en:"Tasks due within this many days count as urgent (overdue always). Default 2."},kid_mode:{de:"Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",en:"Big, tappable layout for the kids' tablet (avatar switcher on top)."},active_person_entity:{de:"Entität (input_select/input_text/Sensor), deren Wert die aktive Person nennt (Name, person.* oder Anzeigename) – die Karte fokussiert sie automatisch (z. B. per NFC-Tag/Anwesenheit). Leer = manuell umschalten.",en:"Entity (input_select/input_text/sensor) whose value names the active person (name, person.* or display name) — the card focuses them automatically (e.g. via NFC tag/presence). Empty = switch manually."},kiosk:{de:"Wandtablet-Modus: Ruhebildschirm 'Wer ist dran?' mit großen Avataren; Antippen (oder NFC/Anwesenheit) zeigt die Aufgaben, nach Inaktivität geht es zurück.",en:"Wall-tablet mode: an idle 'Who's there?' screen with big avatars; tapping (or NFC/presence) shows the tasks, and it returns after inactivity."},night_start:{de:"Wandtablet: nachts ein ruhiger, dunkler Bildschirm mit Uhr; Antippen zeigt die Aufgaben wieder.",en:"Wall tablet: a calm, dark screen with a clock at night; a tap brings the tasks back."},night_end:{de:"Morgens: zurück zu den Aufgaben.",en:"Morning: back to the tasks."},night_wake_entity:{de:"Bewegungs- oder Präsenzmelder: meldet er „an“, wacht die Karte auf wie nach einem Antippen.",en:"Motion or presence sensor: when it reports “on”, the card wakes like after a tap."},auto_return:{de:"Sekunden Inaktivität bis zurück zum 'Wer ist dran?'-Bildschirm (Standard 30, 0 = nie).",en:"Seconds of inactivity before returning to the 'Who's there?' screen (default 30, 0 = never)."},highlight_overdue:{de:"Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Eigene Regeln unter „Kontext-Regeln“.",en:"Mark tasks past their due date as urgent (default on). Your own rules under “Context rules”."},shopping_lists:{de:"Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",en:"These todo.* lists (e.g. Bring!) show as one 'shopping' tile; checking it off completes the whole trip."},shopping_points:{de:"Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",en:"Points for a finished shopping trip (default = points per task)."},bring_deeplink:{de:"Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",en:"Target of the 'Open in Bring!' button (default web.getbring.com)."},reward_approval:{de:"Kinder fragen Belohnungen an, die Punkte werden reserviert, und die Eltern geben per Push frei oder lehnen ab. Wer die Push bekommt, stellst du in der Family Task Card Integration ein (Konfigurieren). Mit Eltern-PIN geht die Freigabe auch in der Karte.",en:"Kids request rewards, the points are reserved, and the parents approve or deny by push. Who gets the push is set in the Family Task Card Integration (Configure). With a parent PIN, requests can also be decided in the card."},points_backend:{de:"Punkte dauerhaft im Punktekonto der Family Task Card Integration buchen: Sie bleiben, wenn Listen geleert werden, Ämtli geben Punkte, Einlösen läuft übers Konto. Braucht die installierte Integration, sonst bleibt alles wie bisher.",en:"Book points permanently in the ledger of the Family Task Card Integration: they stay when lists are cleared, chores earn points, rewards are paid from it. Needs the integration installed, otherwise nothing changes."},parent_pin:{de:"PIN, die zum Einlösen einer Belohnung abgefragt wird (Eltern-Freigabe). Leer = ohne PIN.",en:"PIN asked when redeeming a reward (parent approval). Empty = no PIN."},level_size:{de:"Punkte pro Level (aus verdienten Punkten). Standard 100, 0 = keine Level.",en:"Points per level (from earned points). Default 100, 0 = no levels."},leaderboard_period:{de:"Gesamt, diese Woche oder diesen Monat. Woche/Monat braucht das Punktekonto (Family Task Card Integration), sonst wird gesamt gezählt.",en:"All time, this week or this month. Week/month needs the points ledger (Family Task Card Integration), otherwise all time is used."},show_fairness:{de:"Ein Balken unter dem Board zeigt, welchen Anteil der Punkte jede Person geschafft hat – z. B. „Mama 58 % · Papa 42 %“. Aufgaben mit mehr Punkten zählen mehr. Pro Person lässt sich ein Soll-Anteil eintragen.",en:"A bar under the board shows each person's share of the points – e.g. “Mom 58% · Dad 42%”. Tasks worth more count for more. Each person can get an agreed share."},fairness_period:{de:"Diese Woche (ab Montag), diesen Monat oder gesamt. Woche/Monat braucht das Punktekonto (Family Task Card Integration), sonst zählt, was abgehakt in den Listen steht.",en:"This week (from Monday), this month or all time. Week/month needs the points ledger (Family Task Card Integration), otherwise it counts what is checked off in the lists."},away_entity:{de:"Für die Ämtli-Rotation: ein Schalter, der „an“ ist, solange die Person weg ist – z. B. ein input_boolean für Urlaub oder Klassenfahrt, oder ein Kalender, der während eines Eintrags „an“ ist. Ihre Ämtli übernehmen dann die anderen.",en:"For the chore rotation: something that is “on” while this person is away – e.g. an input_boolean for a holiday or a school trip, or a calendar that is on during an entry. The others take over their chores."},share:{de:"Für die Fairness-Anzeige: welcher Anteil der Arbeit für diese Person vereinbart ist, z. B. 40. Leer = kein Soll.",en:"For the fair-share bar: the share of the work agreed for this person, e.g. 40. Empty = none."},show_streak:{de:"Zeigt „⚡ 5“ neben dem Namen: an wie vielen Tagen am Stück jemand mindestens eine Aufgabe erledigt hat (ab 2 Tagen). Braucht das Punktekonto (Family Task Card Integration).",en:"Shows “⚡ 5” next to the name: how many days in a row someone has done at least one task (from 2 days). Needs the points ledger (Family Task Card Integration)."},show_leaderboard:{de:"Rangliste der Personen nach verdienten Punkten unter dem Board anzeigen.",en:"Show a ranking of persons by earned points under the board."},rotation:{de:"Ämtli aus gemeinsamen Listen wechseln automatisch reihum zwischen den Personen – täglich oder wöchentlich. Aus = aus.",en:"Chores from shared lists automatically take turns between persons – daily or weekly. Off = off."},rotation_lists:{de:"Eigene todo.*-Liste(n) nur für Ämtli, z. B. Müll, Spülmaschine, Tisch decken. Nicht zusätzlich bei einer Person eintragen.",en:"Dedicated todo.* list(s) just for chores, e.g. bins, dishwasher, set the table. Don't also add them to a person."},rotation_period:{de:"Wie oft die Ämtli weiterwandern. Wöchentlich beginnt jede Runde am Montag.",en:"How often chores move on. Weekly rounds start on Monday."},rotation_persons:{de:"Nichts gewählt = alle Personen der Karte machen mit.",en:"Nothing selected = every person on the card takes part."},rotation_reset:{de:"Abgehakte Ämtli zu Beginn der nächsten Runde wieder öffnen (die Karte setzt dafür die Fälligkeit auf das Rundenende). Ämtli geben nur mit Punktekonto (Family Task Card Integration) Punkte, weil sie jede Runde neu starten.",en:"Reopen checked-off chores when the next round starts (the card sets their due date to the end of the round). Chores only earn points with the points ledger (Family Task Card Integration), as they start over every round."},chore_swap:{de:"Wer dran ist, kann ein Ämtli dieser Runde mit 🔁 jemand anderem anbieten, auf Wunsch gegen Punkte. Die andere Person übernimmt oder lehnt ab; die Punkte wandern mit. Braucht das Punktekonto (Family Task Card Integration ab v0.4.0).",en:"Whoever has a chore this round can offer it to someone else with 🔁, for points if they like. The other person takes it over or says no; the points move along. Needs the points ledger (Family Task Card Integration v0.4.0 or newer)."},catch_up:{de:"Wer für jemanden eingesprungen ist, bekommt es zurück: Ist die Person wieder da, übernimmt sie in einer späteren Runde ein Ämtli des Helfers („↩️ Ausgleich für Lina“). Braucht das Punktekonto (Family Task Card Integration ab v0.5.0) und ein „Abwesend“-Feld bei den Personen.",en:"Whoever covered for someone gets it back: once that person is back, they do one of the helper's chores in a later round (“↩️ making up for Lina”). Needs the points ledger (Family Task Card Integration v0.5.0 or newer) and an “Away” field on the persons."},scale:{de:"Gesamte Karte vergrößern/verkleinern (Zoom über alles: Layout, Schrift, Bilder). 100 % = Standard.",en:"Enlarge/shrink the whole card (zoom over everything: layout, text, pictures). 100 % = default."},font_scale:{de:"Nur die Schriftgröße anpassen (zusätzlich zur Kartengröße). 100 % = Standard.",en:"Adjust the text size only (on top of the card size). 100 % = default."},avatar_scale:{de:"Nur Avatare/Bilder und das Karten-Icon anpassen. 100 % = Standard.",en:"Adjust avatars/pictures and the card icon only. 100 % = default."},sort:{de:"Reihenfolge der offenen Aufgaben je Person.",en:"Order of the open tasks per person."},hide_empty:{de:"Personen ohne offene Aufgaben ausblenden.",en:"Hide persons that have no open tasks."},group_by_due:{de:"Board: offene Aufgaben unter Überfällig / Heute / Bald / Später / Ohne Termin; Später und Ohne Termin sind zugeklappt. Nicht im Kinder-Modus.",en:"Board: open tasks under Overdue / Today / Soon / Later / No date; Later and No date start collapsed. Not in kid mode."},hide_undated:{de:"Offene Aufgaben ohne Fälligkeitsdatum nicht anzeigen. Jede Liste kann abweichen (Listen-Einstellungen der Person).",en:"Don't show open tasks without a due date. Each list can differ (the person's list settings)."},show_within:{de:"Nur Aufgaben zeigen, die in so vielen Tagen fällig sind; Überfälliges immer. 0 = nur heute. Leer = alle. Jede Liste kann abweichen.",en:"Only show tasks due within this many days; overdue always. 0 = today only. Empty = all. Each list can differ."},due_soon:{de:"Aufgaben, die in den nächsten X Tagen fällig sind, hervorheben. 0 = aus.",en:"Highlight tasks due within the next X days. 0 = off."},allow_add:{de:"Ein Eingabefeld pro Person zum Anlegen neuer Aufgaben (nur wo die Liste es unterstützt).",en:"An input field per person to add new tasks (only where the list supports it)."},private_patterns:{de:"Text in Titel oder Beschreibung, z. B. „#privat“ – die Aufgabe erscheint nur als „Privat“ (etwa Geschenke, die die Kinder nicht sehen sollen).",en:"Text in the title or description, e.g. “#private” – the task shows only as “Private” (gifts the kids shouldn't see, say)."},title_tags:{de:"„Zimmer aufräumen @Lina +20“ ist Linas Aufgabe und bringt 20 Punkte – egal in welcher Liste, ob in der App getippt oder dem Sprachassistenten gesagt. Die Karte zeigt nur „Zimmer aufräumen“. Nach dem @ geht der Name (auch nur der Vorname) oder die Personen-Entität; unbekannte Namen bleiben stehen.",en:"“Tidy room @Lina +20” is Lina's task and worth 20 points – in any list, typed in an app or told to a voice assistant. The card shows just “Tidy room”. After the @ goes the name (the first name is enough) or the person entity; unknown names stay as they are."},level_emojis:{de:"Ein Abzeichen pro Level, durch Leerzeichen getrennt, z. B. 🌱 ⭐ 🔥 🏅 🏆 👑. Leer = Standard.",en:"One badge per level, separated by spaces, e.g. 🌱 ⭐ 🔥 🏅 🏆 👑. Empty = default."},important:{de:"Alle Aufgaben dieser Liste gelten in der Eisenhower-Ansicht als wichtig.",en:"Every task of this list counts as important in the Eisenhower view."},match:{de:"Ein Text im Titel oder mehrere mit | getrennt, z. B. gieß|blumen; Groß-/Kleinschreibung egal. Leer = alle Aufgaben.",en:"Text in the title, or several separated by |, e.g. water|plants; case doesn't matter. Empty = all tasks."},state:{de:"Zustand der Entität, z. B. rainy. Mehrere mit Komma = einer davon.",en:"State of the entity, e.g. rainy. Several with commas = any of them."},label:{de:"Kurzer Hinweis auf der Kachel, z. B. „Morgen Abfuhr!“ (bei Hervorheben/Dringend).",en:"Short note on the tile, e.g. “Bins tomorrow!” (with highlight/urgent)."},on:{de:"Alles geschafft = wenn eine Person alles erledigt hat; Aufgabe = bei jeder Aufgabe; Belohnung = beim Einlösen. Gefeiert wird auf dem Bildschirm, auf dem abgehakt wurde. In Texten stehen {name} und {task} für Person und Aufgabe.",en:"All done = when a person finished everything; task = on every task; reward = when redeeming. It runs on the screen where the task was checked off. In texts, {name} and {task} stand for person and task."},actions:{de:"Laufen nacheinander: Aktionen, Szenen, Verzögerungen und Bedingungen (Zustand, Zahlenwert, Zeit, und/oder/nicht). Geräte-Aktionen, Auswahl & Co. werden übersprungen – dafür ein Skript aufrufen.",en:"Run one after another: actions, scenes, delays and conditions (state, numeric, time, and/or/not). Device actions, choose & co. are skipped – call a script for those."},person:{de:"Optional: person.* liefert Avatarbild & Anzeigename.",en:"Optional: person.* provides the avatar picture & display name."},lists:{de:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",en:"One or more todo.* lists that belong to this person."},points_entity:{de:"input_number, das die bereits eingelösten Punkte dieser Person speichert (Guthaben = verdient − eingelöst).",en:"input_number storing this person's already-redeemed points (balance = earned − spent)."}},Nt={hide_undated:{de:"Wie die Karte, bis du es hier umstellst.",en:"Like the card until you change it here."},show_within:{de:"Wie die Karte, bis du es hier änderst. 0 = nur heute. Leer = alle, auch wenn die Karte begrenzt.",en:"Like the card until you change it here. 0 = today only. Empty = all, even if the card limits."}};class Lt extends ae{constructor(){super(...arguments),this._drafts={},this._label=e=>Tt[e.name]?.[this._lang]??e.name,this._helper=e=>zt[e.name]?.[this._lang],this._listHelper=e=>(Nt[e.name]??zt[e.name])?.[this._lang]}setConfig(e){this._config=e}_draft(e,t,n,i){const s=(e=>Array.isArray(e)?e:e?[e]:[])(t),r=this._drafts[e];return void 0!==r&&n(r).join("\n")===s.join("\n")?r:s.join(i)}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}get _settingsData(){const e=this._config.shopping_lists,t=Array.isArray(e)?e:e?[e]:[],n=!1!==this._config.highlight_overdue,i=!1!==this._config.allow_add,s=this._config.rotation_lists,r=Array.isArray(s)?s:s?[s]:[],o=this._config.rotation_period??"week",a=!1!==this._config.rotation_reset,d=this._draft("level_emojis",this._config.level_emojis,kt," "),l=this._config.scale??100,h=this._config.font_scale??100,c=this._config.avatar_scale??100;return{...this._config,shopping_lists:t,highlight_overdue:n,allow_add:i,scale:l,font_scale:h,avatar_scale:c,rotation_lists:r,rotation_period:o,rotation_reset:a,level_emojis:d}}get _lang(){return _e(this.hass)}_section(e,t,n,i=!1){return{type:"expandable",name:"",title:xt[e]?.[this._lang]??e,icon:t,flatten:!0,expanded:i,schema:n}}_schema(){const e=this._config;return[this._section("general","mdi:card-text-outline",[{name:"title",selector:_t},{name:"theme",selector:this._select(ht,e=>`theme_${e}`)}],!0),this._section("mode","mdi:view-dashboard-variant-outline",[{name:"kid_mode",selector:ft},{name:"eisenhower",selector:ft},...e.eisenhower?[{name:"urgent_within",selector:gt(0,60)}]:[],{name:"kiosk",selector:ft},...e.kiosk?[{name:"auto_return",selector:gt(0,3600,5)}]:[],{name:"night_start",selector:{time:{}}},{name:"night_end",selector:{time:{}}},...e.night_start?[{name:"night_wake_entity",selector:{entity:{filter:[{domain:"binary_sensor"},{domain:"input_boolean"}],multiple:!0}}}]:[],{name:"active_person_entity",selector:{entity:{filter:[{domain:"input_select"},{domain:"input_text"},{domain:"sensor"}]}}}]),this._section("tasks","mdi:format-list-checks",[{name:"show_completed",selector:ft},{name:"allow_add",selector:ft},{name:"title_tags",selector:ft},{name:"private_patterns",selector:{text:{multiple:!0}}},{name:"hide_empty",selector:ft},{name:"highlight_overdue",selector:ft},{name:"sort",selector:this._select(lt,e=>`sort_${e}`)},{name:"due_soon",selector:gt(0,60)},{name:"group_by_due",selector:ft},{name:"hide_undated",selector:ft},{name:"show_within",selector:gt(0,365)}]),this._section("rotation","mdi:rotate-3d-variant",[{name:"rotation",selector:ft},...e.rotation?this._rotationSchema():[]]),this._section("points","mdi:star-circle-outline",[{name:"points_per_task",selector:gt(0,1e3)},{name:"goal",selector:gt(0,1e5)},{name:"level_size",selector:gt(0,1e5,10)},{name:"level_emojis",selector:_t},{name:"show_leaderboard",selector:ft},...e.show_leaderboard?[{name:"leaderboard_period",selector:this._select(pt,e=>"all"===e?"lb_all":`lb_${e}`)}]:[],{name:"show_fairness",selector:ft},...e.show_fairness?[{name:"fairness_period",selector:this._select(ut,e=>`lb_${e}`)}]:[],{name:"show_streak",selector:ft},{name:"points_backend",selector:ft},...e.points_backend?[{name:"reward_approval",selector:ft}]:[]]),this._section("shopping","mdi:cart-outline",[{name:"shopping_lists",selector:vt("todo",!0)},{name:"shopping_points",selector:gt(0,1e5)},{name:"bring_deeplink",selector:_t}]),this._section("look","mdi:palette-outline",[{name:"scale",selector:mt(50,200)},{name:"font_scale",selector:mt(70,200)},{name:"avatar_scale",selector:mt(50,250)}])]}_select(e,t,n={mode:"dropdown"}){return{select:{...n,options:e.map(e=>({value:e,label:fe(this.hass,t(e))}))}}}_rotationSchema(){const e=this._persons.map((e,t)=>({value:e.name||e.person||`${t+1}`,label:e.name||e.person||`${fe(this.hass,"person_fallback")} ${t+1}`}));return[{name:"rotation_lists",selector:vt("todo",!0)},{name:"rotation_period",selector:this._select(ct,e=>`rot_${e}`)},{name:"rotation_persons",selector:{select:{multiple:!0,mode:"list",options:e}}},{name:"rotation_reset",selector:ft},{name:"chore_swap",selector:ft},{name:"catch_up",selector:ft}]}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}_settingsChanged(e){e.stopPropagation();const t=e.detail.value,n={...t};n.title||delete n.title,n.goal||delete n.goal,n.show_completed||delete n.show_completed,n.kid_mode||delete n.kid_mode,n.eisenhower||delete n.eisenhower,yt(n.urgent_within)||delete n.urgent_within,yt(n.points_per_task)||delete n.points_per_task,yt(n.level_size)||delete n.level_size,yt(n.shopping_points)||delete n.shopping_points,n.bring_deeplink||delete n.bring_deeplink,void 0!==n.parent_pin&&null!==n.parent_pin&&""!==n.parent_pin||delete n.parent_pin,n.points_backend||delete n.points_backend,n.reward_approval||delete n.reward_approval,n.show_leaderboard||delete n.show_leaderboard,n.leaderboard_period&&"all"!==n.leaderboard_period||delete n.leaderboard_period,n.show_fairness||delete n.show_fairness,n.fairness_period&&"week"!==n.fairness_period||delete n.fairness_period,n.show_streak||delete n.show_streak,n.hide_empty||delete n.hide_empty,n.title_tags||delete n.title_tags,n.private_patterns?.length||delete n.private_patterns,n.night_start||delete n.night_start,n.night_end||delete n.night_end,(Array.isArray(n.night_wake_entity)?n.night_wake_entity.length:n.night_wake_entity)||delete n.night_wake_entity,n.due_soon||delete n.due_soon,n.group_by_due||delete n.group_by_due,n.hide_undated||delete n.hide_undated,yt(n.show_within)||delete n.show_within,n.sort&&"manual"!==n.sort||delete n.sort,n.theme&&"auto"!==n.theme||delete n.theme,n.active_person_entity||delete n.active_person_entity,n.kiosk||delete n.kiosk,yt(n.auto_return)||delete n.auto_return,n.scale&&100!==n.scale||delete n.scale,n.font_scale&&100!==n.font_scale||delete n.font_scale,n.avatar_scale&&100!==n.avatar_scale||delete n.avatar_scale,n.rotation||delete n.rotation,n.rotation_period&&"week"!==n.rotation_period||delete n.rotation_period,n.rotation_persons?.length||delete n.rotation_persons,!1!==n.rotation_reset&&delete n.rotation_reset,n.chore_swap||delete n.chore_swap,n.catch_up||delete n.catch_up,Array.isArray(n.rotation_lists)&&(0===n.rotation_lists.length?delete n.rotation_lists:1===n.rotation_lists.length&&(n.rotation_lists=n.rotation_lists[0]));const i=String(n.level_emojis??"");this._drafts.level_emojis=i;const s=kt(i);s.length?n.level_emojis=s:delete n.level_emojis,n.highlight_overdue&&delete n.highlight_overdue,n.allow_add&&delete n.allow_add,Array.isArray(n.shopping_lists)&&(0===n.shopping_lists.length?delete n.shopping_lists:1===n.shopping_lists.length&&(n.shopping_lists=n.shopping_lists[0]));const r={...this._config,...n,persons:this._persons};for(const e of Object.keys(t))e in n||delete r[e];this._emit(r)}_personSchema(){const e=this._config;return[...bt,...e?.show_fairness?[{name:"share",selector:gt(0,100)}]:[],...e?.rotation?[{name:"away_entity",selector:wt}]:[]]}_personChanged(e,t){t.stopPropagation();const n={...t.detail.value};if(n.color||delete n.color,n.goal||delete n.goal,n.points_entity||delete n.points_entity,yt(n.share)||delete n.share,n.away_entity||delete n.away_entity,Array.isArray(n.lists)){const t=ze(this._persons[e]??{}).filter(e=>"object"==typeof e),i=n.lists.map(e=>t.find(t=>t.entity===e)??e);0===i.length?delete n.lists:n.lists=1===i.length&&"string"==typeof i[0]?i[0]:i}const i=this._persons.map((t,i)=>i===e?n:t);this._emit({...this._config,persons:i})}_personData(e){return{...e,lists:Le(e)}}_setPersonColor(e,t){const n=this._persons.map((n,i)=>{if(i!==e)return n;const s={...n};return t?s.color=t:delete s.color,s});this._emit({...this._config,persons:n})}_addPerson(){const e=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:e})}_removePerson(e){const t=this._persons.filter((t,n)=>n!==e);this._emit({...this._config,persons:t})}_movePerson(e,t){const n=[...this._persons],i=e+t;i<0||i>=n.length||([n[e],n[i]]=[n[i],n[e]],this._emit({...this._config,persons:n}))}_autoDetect(){const e=new Set(this._persons.map(e=>e.person).filter(Boolean)),t=Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).filter(t=>!e.has(t)).map(e=>({name:this.hass.states[e].attributes?.friendly_name||"",person:e,lists:""}));if(0===t.length)return;const n=this._persons.filter(e=>e.name||e.person||ze(e).length>0);this._emit({...this._config,persons:[...n,...t]})}_personColor(e,t){return e.color||dt[t%dt.length]}get _rewardList(){return Array.isArray(this._config.rewards)?this._config.rewards:[]}_setRewards(e){const t={...this._config};e.length?t.rewards=e:delete t.rewards,this._emit(t)}_rewardChanged(e,t){t.stopPropagation();const n=t.detail.value,i={name:String(n.name??""),cost:Number(n.cost)||0};n.emoji&&(i.emoji=String(n.emoji)),this._setRewards(this._rewardList.map((t,n)=>n===e?i:t))}_addReward(){this._setRewards([...this._rewardList,{name:"",cost:50,emoji:"🎁"}])}_removeReward(e){this._setRewards(this._rewardList.filter((t,n)=>n!==e))}_pinChanged(e){e.stopPropagation();const t=e.detail.value.parent_pin,n={...this._config};t?n.parent_pin=t:delete n.parent_pin,this._emit(n)}get _rules(){return Array.isArray(this._config.context_rules)?this._config.context_rules:[]}_ruleSchema(){return[{name:"match",selector:_t},{name:"entity",selector:{entity:{}}},{name:"state",selector:_t},{name:"effect",selector:this._select(At,e=>`effect_${e}`)},{name:"label",selector:_t},{name:"invert",selector:ft}]}_ruleData(e,t){return{...e,state:this._draft(`rule${t}`,e.state,$t,", ")}}_setRules(e){const t={...this._config};e.length?t.context_rules=e:delete t.context_rules,this._emit(t)}_ruleChanged(e,t){t.stopPropagation();const n={...this._rules[e],...t.detail.value},i=String(n.state??"");this._drafts[`rule${e}`]=i;const s=$t(i);0===s.length?delete n.state:n.state=1===s.length?s[0]:s,n.match||delete n.match,n.label||delete n.label,n.invert||delete n.invert,this._setRules(this._rules.map((t,i)=>i===e?n:t))}_addRule(){this._setRules([...this._rules,{entity:"",effect:"highlight"}])}_removeRule(e){this._setRules(this._rules.filter((t,n)=>n!==e))}_celebrateSchema(){return[{name:"on",selector:this._select(St,e=>`on_${e}`,{multiple:!0,mode:"list"})},{name:"actions",selector:{action:{}}}]}_celebrateData(){const e=this._config.celebrate;return{on:e?.on?Array.isArray(e.on)?e.on:[e.on]:["all_done"],actions:e?.actions??[]}}_celebrateChanged(e){e.stopPropagation();const t=e.detail.value,n=Array.isArray(t.actions)?t.actions:t.actions?[t.actions]:[],i=Array.isArray(t.on)?t.on:[],s={...this._config},r={actions:n};!i.length||1===i.length&&"all_done"===i[0]||(r.on=1===i.length?i[0]:i),0!==n.length||r.on?s.celebrate=r:delete s.celebrate,this._emit(s)}get _cardWithin(){const e=this._config.show_within;return yt(e)&&e>=0?e:-1}_listData(e){const t="string"==typeof e?{}:e,n=yt(t.show_within)?t.show_within:this._cardWithin;return{important:t.important??!1,hide_undated:t.hide_undated??this._config.hide_undated??!1,show_within:n>=0?n:void 0}}_listSettingsChanged(e,t,n){n.stopPropagation();const i=n.detail.value,s={};i.important&&(s.important=!0),!!i.hide_undated!=!!this._config.hide_undated&&(s.hide_undated=!!i.hide_undated);const r=yt(i.show_within)&&i.show_within>=0?i.show_within:-1;r!==this._cardWithin&&(s.show_within=r);const o=this._persons.map((n,i)=>{if(i!==e)return n;const r=ze(n).map(e=>Ne(e)===t?Object.keys(s).length?{entity:t,...s}:t:e);return{...n,lists:1===r.length&&"string"==typeof r[0]?r[0]:r}});this._emit({...this._config,persons:o})}_listName(e){return this.hass.states[e]?.attributes?.friendly_name||e}render(){return this._config&&this.hass?H`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${this._schema()}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${this._settingsChanged}
        ></ha-form>

        ${this._panel("rewards",H`
            <ha-form
              .hass=${this.hass}
              .data=${{parent_pin:this._config.parent_pin??""}}
              .schema=${Ct}
              .computeLabel=${this._label}
              .computeHelper=${this._helper}
              @value-changed=${this._pinChanged}
            ></ha-form>
            ${this._rewardList.map((e,t)=>H`
                <div class="row">
                  <ha-form
                    .hass=${this.hass}
                    .data=${e}
                    .schema=${Pt}
                    .computeLabel=${this._label}
                    @value-changed=${e=>this._rewardChanged(t,e)}
                  ></ha-form>
                  ${this._removeButton(()=>this._removeReward(t))}
                </div>
              `)}
            <button class="add" @click=${this._addReward}>${fe(this.hass,"add_reward")}</button>
          `)}
        ${this._panel("rules",H`
            ${this._rules.map((e,t)=>H`
                <div class="row">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._ruleData(e,t)}
                    .schema=${this._ruleSchema()}
                    .computeLabel=${this._label}
                    .computeHelper=${this._helper}
                    @value-changed=${e=>this._ruleChanged(t,e)}
                  ></ha-form>
                  ${this._removeButton(()=>this._removeRule(t))}
                </div>
              `)}
            <button class="add" @click=${this._addRule}>${fe(this.hass,"add_rule")}</button>
          `)}
        ${this._panel("celebrate",H`<ha-form
            .hass=${this.hass}
            .data=${this._celebrateData()}
            .schema=${this._celebrateSchema()}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${this._celebrateChanged}
          ></ha-form>`)}

        <div class="section">
          <div class="section-head">
            <span>${fe(this.hass,"persons")}</span>
            <button
              class="link"
              @click=${this._autoDetect}
              title=${fe(this.hass,"detect_persons_hint")}
            >
              ${fe(this.hass,"detect_persons")}
            </button>
          </div>

          ${this._persons.map((e,t)=>this._personRow(e,t))}
          ${0===this._persons.length?H`<div class="empty">${fe(this.hass,"no_persons")}</div>`:U}

          <button class="add" @click=${this._addPerson}>${fe(this.hass,"add_person")}</button>
        </div>
      </div>
    `:U}_panel(e,t){return H`<ha-expansion-panel outlined .header=${xt[e][this._lang]}
      >${t}</ha-expansion-panel
    >`}_removeButton(e){return H`<ha-icon-button
      .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
      title=${fe(this.hass,"remove")}
      @click=${e}
    ></ha-icon-button>`}_personRow(e,t){const n=this._personColor(e,t),i=e.name||e.person||`${fe(this.hass,"person_fallback")} ${t+1}`;return H`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${n}"></span>
          <span class="ptitle">${i}</span>
          <span class="spacer"></span>
          <ha-icon-button
            .path=${"M7,15L12,10L17,15H7Z"}
            title=${fe(this.hass,"move_up")}
            .disabled=${0===t}
            @click=${()=>this._movePerson(t,-1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M7,10L12,15L17,10H7Z"}
            title=${fe(this.hass,"move_down")}
            .disabled=${t===this._persons.length-1}
            @click=${()=>this._movePerson(t,1)}
          ></ha-icon-button>
          ${this._removeButton(()=>this._removePerson(t))}
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${this._personData(e)}
          .schema=${this._personSchema()}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${e=>this._personChanged(t,e)}
        ></ha-form>

        ${ze(e).length?H`<ha-expansion-panel
                outlined
                .header=${xt.list_settings[this._lang]}
                class="lists"
              >
                ${ze(e).map(e=>{const n=Ne(e);return H`
                    <div class="list-name">${this._listName(n)}</div>
                    <ha-form
                      .hass=${this.hass}
                      .data=${this._listData(e)}
                      .schema=${Et}
                      .computeLabel=${this._label}
                      .computeHelper=${this._listHelper}
                      @value-changed=${e=>this._listSettingsChanged(t,n,e)}
                    ></ha-form>
                  `})}
              </ha-expansion-panel>`:U}

        <div class="colors">
          <span class="colors-label">${fe(this.hass,"color")}</span>
          ${dt.map(n=>H`
              <button
                class="swatch ${e.color===n?"active":""}"
                style="background:${n}"
                title=${n}
                @click=${()=>this._setPersonColor(t,n)}
              ></button>
            `)}
          <button
            class="swatch auto ${e.color?"":"active"}"
            title=${fe(this.hass,"color_auto")}
            @click=${()=>this._setPersonColor(t,void 0)}
          >
            A
          </button>
        </div>
      </div>
    `}}Lt.styles=o`
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
    .row {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color);
      padding: 8px 0;
    }
    .row ha-form {
      flex: 1 1 auto;
    }
    ha-expansion-panel {
      --expansion-panel-content-padding: 0 12px 12px;
    }
    .lists {
      margin-top: 8px;
    }
    .list-name {
      font-weight: 600;
      margin: 10px 0 4px;
    }
    .empty {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 6px 2px 10px;
    }
  `,e([ce({attribute:!1})],Lt.prototype,"hass",void 0),e([pe()],Lt.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",Lt);var Mt=Object.freeze({__proto__:null,FamilyTaskCardEditor:Lt});export{at as FamilyTaskCard};

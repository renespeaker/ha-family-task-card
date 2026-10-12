function e(e,t,s,i){var n,r=arguments.length,o=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,s,o):n(t,s))||o);return r>3&&o&&Object.defineProperty(t,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&n.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new r(s,e,i)},a=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,m=g?g.emptyScript:"",f=_.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},y=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);n?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...c(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(t,s.type);this._$Em=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const r=n.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,s,i=!1,n){if(void 0!==e){const r=this.constructor;if(!1===i&&(n=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??y)(n,t)||s.useDefault&&s.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[v("elementProperties")]=new Map,k[v("finalized")]=new Map,f?.({ReactiveElement:k}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,x=e=>e,A=$.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,P="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,z=`<${C}>`,L=document,T=()=>L.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,j=/>/g,B=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,F=/"/g,I=/^(?:script|style|textarea|title)$/i,U=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),K=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,G=L.createTreeWalker(L,129);function Y(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const V=(e,t)=>{const s=e.length-1,i=[];let n,r=2===t?"<svg>":3===t?"<math>":"",o=R;for(let t=0;t<s;t++){const s=e[t];let a,l,d=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===R?"!--"===l[1]?o=D:void 0!==l[1]?o=j:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=B):void 0!==l[3]&&(o=B):o===B?">"===l[0]?(o=n??R,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?B:'"'===l[3]?F:H):o===F||o===H?o=B:o===D||o===j?o=R:(o=B,n=void 0);const c=o===B&&e[t+1].startsWith("/>")?" ":"";r+=o===R?s+z:d>=0?(i.push(a),s.slice(0,d)+P+s.slice(d)+E+c):s+E+(-2===d?t:c)}return[Y(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,r=0;const o=e.length-1,a=this.parts,[l,d]=V(e,t);if(this.el=Z.createElement(l,s),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=G.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(P)){const t=d[r++],s=i.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?te:"?"===o[1]?se:"@"===o[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:n}),i.removeAttribute(e));if(I.test(i.tagName)){const e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],T()),G.nextNode(),a.push({type:2,index:++n});i.append(e[t],T())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(E,e+1));)a.push({type:7,index:n}),e+=E.length-1}n++}}static createElement(e,t){const s=L.createElement("template");return s.innerHTML=e,s}}function J(e,t,s=e,i){if(t===K)return t;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=N(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(t=J(e,n._$AS(e,t.values),n,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??L).importNode(t,!0);G.currentNode=i;let n=G.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Q(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new ne(n,this,e)),this._$AV.push(t),a=s[++o]}r!==a?.index&&(n=G.nextNode(),r++)}return G.currentNode=L,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>M(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(L.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Z.createElement(Y(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new Q(this.O(T()),this.O(T()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(e,t=this,s,i){const n=this.strings;let r=!1;if(void 0===n)e=J(this,e,t,0),r=!N(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const i=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=J(this,i[s+o],t,o),a===K&&(a=this._$AH[o]),r||=!N(a)||a!==this._$AH[o],a===W?e=W:e!==W&&(e+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends ee{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??W)===K)return;const s=this._$AH,i=e===W&&s!==W||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const re=$.litHtmlPolyfillSupport;re?.(Z,Q),($.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class ae extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let n=i._$litPart$;if(void 0===n){const e=s?.renderBefore??null;i._$litPart$=n=new Q(t.insertBefore(T(),e),e,void 0,s??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const le=oe.litElementPolyfillSupport;le?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},he=(e=de,t,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const n=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,n,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];t.call(this,s),this.requestUpdate(i,n,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ce(e){return(t,s)=>"object"==typeof s?he(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function pe(e){return ce({...e,state:!0,attribute:!1})}const ue={subtitle:{de:"Familien-Aufgaben",en:"Family tasks"},open:{de:"offen",en:"open"},all_done_board:{de:"Alles erledigt 🎉",en:"All done 🎉"},all_done_kid:{de:"Alles geschafft!",en:"All done!"},shopping:{de:"Einkauf",en:"Shopping"},items:{de:"Artikel",en:"items"},open_app:{de:"Öffnen",en:"Open"},today:{de:"heute",en:"today"},overdue:{de:"Überfällig",en:"Overdue"},due_soon:{de:"Bald fällig",en:"Due soon"},no_toggle:{de:"Diese Liste unterstützt kein Abhaken",en:"This list can't be checked off"},add_task:{de:"Aufgabe hinzufügen…",en:"Add task…"},rewards:{de:"Belohnungen",en:"Rewards"},balance:{de:"Guthaben",en:"Balance"},no_wallet_1:{de:"Kein Guthaben-Helfer (",en:"No points helper ("},no_wallet_2:{de:") gesetzt – Einlösen ist deaktiviert.",en:") set — redeeming is disabled."},redeem:{de:"Einlösen",en:"Redeem"},request:{de:"Anfragen",en:"Request"},waiting:{de:"wartet auf Freigabe",en:"waiting for approval"},approve:{de:"Freigeben",en:"Approve"},deny:{de:"Ablehnen",en:"Deny"},parent_pin:{de:"Eltern-PIN:",en:"Parent PIN:"},cancel:{de:"Abbrechen",en:"Cancel"},wrong_pin:{de:"Falsche PIN",en:"Wrong PIN"},leaderboard:{de:"🏆 Rangliste",en:"🏆 Leaderboard"},lb_week:{de:"diese Woche",en:"this week"},lb_month:{de:"diesen Monat",en:"this month"},lb_all:{de:"Gesamt",en:"All time"},streak_title:{de:"{n} Tage am Stück",en:"{n} days in a row"},level:{de:"Level",en:"Level"},to_next:{de:"zum nächsten",en:"to next"},goal:{de:"Ziel",en:"Goal"},persons:{de:"Personen",en:"Persons"},detect_persons:{de:"Personen erkennen",en:"Detect persons"},detect_persons_hint:{de:"person.*-Entitäten übernehmen",en:"Import person.* entities"},no_persons:{de:"Noch keine Person. Füge eine hinzu.",en:"No person yet. Add one."},add_person:{de:"+ Person hinzufügen",en:"+ Add person"},color:{de:"Farbe",en:"Color"},color_auto:{de:"Automatisch (Palette)",en:"Automatic (palette)"},move_up:{de:"Nach oben",en:"Move up"},move_down:{de:"Nach unten",en:"Move down"},remove:{de:"Entfernen",en:"Remove"},person_fallback:{de:"Person",en:"Person"},sort_manual:{de:"Manuell",en:"Manual"},sort_due:{de:"Nach Fälligkeit",en:"By due date"},sort_alpha:{de:"Alphabetisch",en:"Alphabetical"},theme_auto:{de:"Automatisch (HA-Theme)",en:"Automatic (HA theme)"},theme_dark:{de:"Dunkel",en:"Dark"},theme_light:{de:"Hell",en:"Light"},who_is_it:{de:"Wer ist dran?",en:"Who's there?"},add_reward:{de:"+ Belohnung hinzufügen",en:"+ Add reward"},add_rule:{de:"+ Regel hinzufügen",en:"+ Add rule"},effect_highlight:{de:"Hervorheben",en:"Highlight"},effect_urgent:{de:"Dringend",en:"Urgent"},effect_hide:{de:"Ausblenden",en:"Hide"},on_all_done:{de:"Alles geschafft",en:"All done"},on_task:{de:"Jede Aufgabe",en:"Every task"},on_reward:{de:"Belohnung eingelöst",en:"Reward redeemed"},matrix_sub:{de:"Wichtig × dringend",en:"Important × urgent"},quad_do:{de:"🔴 Jetzt erledigen",en:"🔴 Do now"},quad_do_hint:{de:"wichtig & dringend",en:"important & urgent"},quad_plan:{de:"🗓 Einplanen",en:"🗓 Schedule"},quad_plan_hint:{de:"wichtig, nicht dringend",en:"important, not urgent"},quad_delegate:{de:"👥 Delegieren",en:"👥 Delegate"},quad_delegate_hint:{de:"dringend, nicht wichtig",en:"urgent, not important"},quad_later:{de:"💤 Später",en:"💤 Later"},quad_later_hint:{de:"weder dringend noch wichtig",en:"neither urgent nor important"},grp_overdue:{de:"🔴 Überfällig",en:"🔴 Overdue"},grp_today:{de:"📌 Heute",en:"📌 Today"},grp_soon:{de:"📅 Bald",en:"📅 Soon"},grp_later:{de:"🗓 Später",en:"🗓 Later"},grp_undated:{de:"📥 Ohne Termin",en:"📥 No date"},rot_next_week:{de:"nächste Woche",en:"next week"},rot_next_day:{de:"morgen",en:"tomorrow"},rot_week:{de:"Wöchentlich (ab Montag)",en:"Weekly (from Monday)"},rot_day:{de:"Täglich",en:"Daily"},err_no_persons:{de:'"persons" muss eine Liste sein (mind. eine Person).',en:'"persons" must be a list with at least one person.'}};function _e(e){return(e?.locale?.language||("undefined"==typeof navigator?"":navigator.language)||"en").toLowerCase().startsWith("de")?"de":"en"}function ge(e,t){const s=ue[t];return s?s[_e(e)]??s.de:t}const me=["#8B7CF6","#34D399","#FBBF24","#FB7185","#22D3EE","#C084FC","#A3E635","#FB923C","#F472B6","#60A5FA"],fe=864e5;function ve(e,t){const s=function(e){return Math.round(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())/fe)}(e);return"day"===t?s:Math.floor((s-4)/7)}const be=e=>new Date(e*fe).toISOString().slice(0,10);function ye(e,t){if("day"===t)return{start:be(e),end:be(e)};const s=7*e+4;return{start:be(s),end:be(s+6)}}const we=(e,t)=>(e%t+t)%t;function ke(e,t){const s=e.due?e.due.slice(0,10):void 0;return s&&s>=t.start?null:{..."completed"===e.status?{status:"needs_action"}:{},due_date:t.end}}const $e="Family Task Card",xe=["🌱","⭐","🔥","🏅","🏆","👑"],Ae=me,Se=[[/müll|abfall|tonne|papier|restmüll|gelber sack/i,"🗑️"],[/wäsche|waschen|laundry/i,"🧺"],[/spül|geschirr|dishes|abwasch/i,"🍽️"],[/staub|wisch|putz|clean|saug|fegen|kehren/i,"🧹"],[/einkauf|shopping|bring|supermarkt|lebensmittel/i,"🛒"],[/hund|gassi|dog/i,"🐕"],[/katze|cat/i,"🐈"],[/gieß|blumen|pflanze|garten|rasen|plant|water/i,"🪴"],[/hausaufgabe|homework|lernen|üben/i,"📚"],[/zimmer|aufräum|tidy|room/i,"🧸"],[/bad|dusche|wc|toilette|bathroom/i,"🛁"],[/koch|cook|essen|dinner|abendessen/i,"🍳"],[/tisch|decken|table/i,"🍴"],[/bett|bed/i,"🛏️"],[/auto|car|tanken/i,"🚗"]];function Pe(e,t){return e.color||Ae[t%Ae.length]}function Ee(e){return e.lists?(Array.isArray(e.lists)?e.lists:[e.lists]).filter(Boolean):[]}function Ce(e){return Ee(e).map(e=>"string"==typeof e?e:e.entity).filter(Boolean)}const ze=["do","plan","delegate","later"];function Le(e,t){return t?e?"do":"plan":e?"delegate":"later"}function Te(e){return e.trimStart().startsWith("!")}const Ne=["overdue","today","soon","later","undated"],Me=new Set(["later","undated"]);function Oe(e){const t=je(e.due);if(!t)return"undated";if(He(e))return"overdue";const s=Be(t.day);return s<=0?"today":s<=7?"soon":"later"}function Re(e){for(const[t,s]of Se)if(t.test(e))return s;return"📝"}function De(e,t){if("string"==typeof e)return e.replace(/\{name\}/g,t.name??"").replace(/\{task\}/g,t.task??"");if(Array.isArray(e))return e.map(e=>De(e,t));if(e&&"object"==typeof e){const s={};for(const[i,n]of Object.entries(e))s[i]=De(n,t);return s}return e}function je(e){if(!e)return;const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t)return{day:new Date(+t[1],+t[2]-1,+t[3])};const s=new Date(e);return isNaN(s.getTime())?void 0:s.getHours()+s.getMinutes()+s.getSeconds()+s.getMilliseconds()===0?{day:new Date(s.getFullYear(),s.getMonth(),s.getDate())}:s.getUTCHours()+s.getUTCMinutes()+s.getUTCSeconds()+s.getUTCMilliseconds()===0?{day:new Date(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate())}:{day:new Date(s.getFullYear(),s.getMonth(),s.getDate()),at:s}}function Be(e){const t=new Date,s=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())-s)/864e5)}function He(e){const t=je(e.due);return!!t&&(t.at?t.at.getTime()<Date.now():Be(t.day)<0)}function Fe(e,t){const s=je(e.due);return!(!s||t<=0||He(e))&&Be(s.day)<=t}function Ie(e,t,s){if(e.lists){if(!(Array.isArray(e.lists)?e.lists:[e.lists]).includes(s))return!1}if(e.match)try{if(!new RegExp(e.match,"i").test(t))return!1}catch{return!1}return!0}function Ue(e,t){let s=!1;if(t)if(void 0!==e.state){s=(Array.isArray(e.state)?e.state:[e.state]).includes(t.state)}else if(void 0!==e.above||void 0!==e.below){const i=Number(t.state);isNaN(i)||(s=!0,void 0===e.above||i>e.above||(s=!1),void 0===e.below||i<e.below||(s=!1))}else s=!["off","unavailable","unknown","","none","false"].includes(t.state.toLowerCase());return e.invert?!s:s}class Ke extends ae{constructor(){super(...arguments),this._items={},this._sig={},this._loading=!1,this._activeKid=0,this._burst=!1,this._shopPerson=null,this._kidShopOpen=!1,this._pending=null,this._pin="",this._pinError=!1,this._prevOpen={},this._kioskIdle=!0,this._rotSent=new Set,this._reported=new Set,this._expanded={}}static async getConfigElement(){return await Promise.resolve().then(function(){return rt}),document.createElement("family-task-card-editor")}static getStubConfig(e){const t=e?Object.keys(e.states).find(e=>e.startsWith("todo.")):void 0;return{type:"custom:family-task-card",title:"Familien-Aufgaben",persons:[{name:"Person 1",lists:t?[t]:[]}]}}setConfig(e){if(!e||!Array.isArray(e.persons))throw new Error(ge(this.hass,"err_no_persons"));this._config={points_per_task:10,...e}}getCardSize(){const e=this._config?.persons?.length??1;return 2+Math.min(e,4)}willUpdate(e){(e.has("hass")||e.has("_config"))&&this.hass&&this._config&&this._refresh()}async _refresh(){if(!this.hass||!this._config||this._loading)return;const e=new Set;for(const t of this._config.persons)for(const s of Ce(t))e.add(s);for(const t of this._rotationLists())e.add(t);const t=[];for(const s of e){const e=this.hass.states[s],i=e?`${e.state}|${e.last_changed}`:"missing";this._sig[s]!==i&&(this._sig[s]=i,t.push(s))}if(0!==t.length){this._loading=!0;try{const e={...this._items};await Promise.all(t.map(async t=>{try{const s=await this.hass.callWS({type:"todo/item/list",entity_id:t});e[t]=s?.items??[]}catch(s){e[t]=[]}})),this._items=e}finally{this._loading=!1}}}_shoppingSet(){const e=this._config?.shopping_lists,t=e?Array.isArray(e)?e:[e]:[];return new Set(t.filter(Boolean))}_listName(e){return this.hass?.states[e]?.attributes?.friendly_name||this._t("shopping")}_bringLink(){return this._config?.bring_deeplink||"https://web.getbring.com"}_levelInfo(e){return function(e,t,s){if(!t||t<=0)return null;const i=Math.floor(e/t)+1;return{level:i,pct:Math.round(e%t/t*100),emoji:s[Math.min(i-1,s.length-1)]??"⭐"}}(e,this._config?.level_size??100,this._config?.level_emojis??xe)}_t(e){return ge(this.hass,e)}_themeClass(){const e=this._config?.theme;return"dark"===e?"theme-dark":"light"===e?"theme-light":""}_canToggle(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(4&t)}_canCreate(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(1&t)}_addEntityFor(e){const t=this._shoppingSet();return this._ownLists(e).find(e=>!t.has(e)&&this._canCreate(e))}_rotationLists(){const e=this._config;if(!e?.rotation||!e.rotation_lists)return[];return(Array.isArray(e.rotation_lists)?e.rotation_lists:[e.rotation_lists]).filter(Boolean)}_ownLists(e){const t=this._rotationLists();return t.length?Ce(e).filter(e=>!t.includes(e)):Ce(e)}_rotationGroup(){const e=this._config?.persons??[],t=this._config?.rotation_persons??[],s=e.map((e,t)=>t);if(0===t.length)return s;const i=new Set(t.map(e=>e.toLowerCase())),n=s.filter(t=>{const s=e[t];return[s.name,s.person].some(e=>e&&i.has(e.toLowerCase()))});return n.length?n:s}_rotationPeriod(){return"day"===this._config?.rotation_period?"day":"week"}_rotationMap(){const e=this._rotationLists(),t=this._rotationGroup(),s=this._rotationPeriod(),i=ve(new Date,s),n=`${e.join(",")}|${t.join(",")}|${s}|${i}`;if(this._rotCache&&this._rotCache.items===this._items&&this._rotCache.sig===n)return this._rotCache.map;const r=function(e,t,s){const i=new Map;if(t<=0)return i;const n=[...e].sort((e,t)=>e.item.summary.localeCompare(t.item.summary)||e.item.uid.localeCompare(t.item.uid));return n.forEach((e,n)=>{i.set(e.key,{now:we(n+s,t),next:we(n+s+1,t)})}),i}(e.flatMap(e=>(this._items[e]??[]).map(t=>({key:`${e}|${t.uid}`,item:t}))),t.length,i),o=new Map;for(const[e,s]of r)o.set(e,{now:t[s.now],next:t[s.next]});return this._rotCache={items:this._items,sig:n,map:o},o}_rotationHint(e){const t=this._config?.persons??[];if(this._rotationGroup().length<2)return;const s=this._rotationMap().get(`${e.entity}|${e.item.uid}`);if(!s)return;return`🔄 ${this._t("day"===this._rotationPeriod()?"rot_next_day":"rot_next_week")}: ${this._personName(t[s.next],s.next)}`}_canSetDue(e){const t=this.hass?.states[e]?.attributes?.supported_features;return"number"!=typeof t||!!(16&t)}_maintainRotation(){const e=this._config;if(!e?.rotation||!1===e.rotation_reset||!this.hass)return;const t=this._rotationPeriod(),s=ye(ve(new Date,t),t);for(const e of this._rotationLists()){const t=this._items[e];if(t&&this._canToggle(e)&&this._canSetDue(e))for(const i of t){const t=ke(i,s);if(!t)continue;const n=`${e}|${i.uid}|${s.end}`;this._rotSent.has(n)||(this._rotSent.add(n),this.hass.callService("todo","update_item",{entity_id:e,item:i.uid,...t}).catch(()=>this._rotSent.delete(n)))}}}async _addTask(e,t){if(!this.hass)return;const s=t.value.trim();if(s){t.value="";try{await this.hass.callService("todo","add_item",{entity_id:e,item:s}),this._sig[e]="",this._refresh()}catch(e){t.value=s}}}_personView(e){const t=this._config,s=t.points_per_task??10,i=t.shopping_points??s,n=this._shoppingSet(),r=[],o=[],a=[];let l=0;for(const t of this._ownLists(e)){const s=(this._items[t]??[]).map(e=>({entity:t,item:e}));if(n.has(t)){const e=s.filter(e=>"completed"!==e.item.status),n=s.filter(e=>"completed"===e.item.status);e.length>0?a.push({entity:t,name:this._listName(t),open:e}):n.length>0&&(l+=i)}else{const i=this._listFilter(e,t);for(const e of s)"completed"===e.item.status?o.push(e):this._visible(e.item,i)&&r.push(e)}}l+=o.length*s;const d=this._rotationLists();if(d.length){const t=this._config.persons.indexOf(e),s=this._rotationMap();for(const e of d)for(const i of this._items[e]??[])s.get(`${e}|${i.uid}`)?.now===t&&("completed"===i.status?o:r).push({entity:e,item:i})}const h=this._decorate(this._sortOpen(r)),c={tasksOpen:h,tasksDone:o,shopOpen:a,openCount:h.length+a.length};if(this._backendOn()){const t=this._config.persons.indexOf(e),s=this._ledger(this._personKey(e,t)),i=s?.earned??0,n=s?.redeemed??0,r=s?.reserved??0;return{...c,earned:i,spent:n,balance:i-n-r,hasWallet:!0,requests:s?.pending??[],weekPoints:s?.weekPoints??0,monthPoints:s?.monthPoints??0,streak:s?.streak??0}}const p=!!e.points_entity,u=p?this._spent(e):0;return{...c,earned:l,spent:u,balance:l-u,hasWallet:p}}_backendOn(){return!!this._config?.points_backend&&!!this.hass?.services?.family_tasks?.award}_personKey(e,t){return e.person||e.name||`person_${t+1}`}_ledger(e){const t=this.hass?.states??{};if(this._ledgerCache?.states!==t){const e=new Map;for(const s of Object.values(t)){const t=s.attributes??{};s.entity_id?.startsWith("sensor.")&&"string"==typeof t.person&&("number"==typeof t.earned&&e.set(t.person,{earned:t.earned,redeemed:Number(t.redeemed)||0,reserved:Number(t.reserved)||0,pending:Array.isArray(t.pending)?t.pending:[],weekPoints:Number(t.week_points)||0,monthPoints:Number(t.month_points)||0,streak:Number(t.streak)||0}))}this._ledgerCache={states:t,map:e}}return this._ledgerCache.map.get(e)}_awardKey(e,t){if(!this._rotationLists().includes(e))return`${e}|${t.uid}`;const s=this._rotationPeriod();return`${e}|${t.uid}|${ye(ve(new Date,s),s).end}`}_award(e,t,s,i){if(this._reported.has(e)||!this.hass)return;this._reported.add(e);const n=this._config.persons[t];this.hass.callService("family_tasks","award",{key:e,person:this._personKey(n,t),points:s,task:i}).catch(()=>{})}_reportCompletions(){if(!this._backendOn())return;const e=this._config,t=e.points_per_task??10,s=this._shoppingSet();e.persons.forEach((e,i)=>{for(const n of this._ownLists(e))if(!s.has(n))for(const e of this._items[n]??[])"completed"===e.status&&this._award(`${n}|${e.uid}`,i,t,e.summary)});const i=this._rotationLists();if(!i.length)return;const n=this._rotationPeriod(),r=ye(ve(new Date,n),n),o=this._rotationMap();for(const e of i)for(const s of this._items[e]??[]){if("completed"!==s.status||ke(s,r))continue;const i=o.get(`${e}|${s.uid}`);i&&this._award(this._awardKey(e,s),i.now,t,s.summary)}}_listFilter(e,t){const s=Ee(e).find(e=>"string"!=typeof e&&e.entity===t),i="object"==typeof s?s:{};return{hide_undated:i.hide_undated??this._config?.hide_undated,show_within:i.show_within??this._config?.show_within}}_visible(e,t){const s=je(e.due);return s?"number"!=typeof t.show_within||t.show_within<0||(He(e)||Be(s.day)<=t.show_within):!t.hide_undated}_ownerIndex(e){return(this._config?.persons??[]).findIndex(t=>this._ownLists(t).includes(e))}_spent(e){if(!e.points_entity)return 0;const t=Number(this.hass?.states[e.points_entity]?.state);return isNaN(t)?0:t}_sortOpen(e){const t=this._config?.sort??"manual";if("manual"===t)return e;const s=e=>{const t=je(e.due);return t?(t.at??t.day).getTime():1/0},i=[...e];return"alpha"===t?i.sort((e,t)=>e.item.summary.localeCompare(t.item.summary)):"due"===t&&i.sort((e,t)=>s(e.item)-s(t.item)),i}_decorate(e){const t=this._config?.context_rules??[],s=!1!==this._config?.highlight_overdue,i=this._config?.due_soon,n=[];for(const r of e){let e,o=!1,a="none";for(const s of t)if(Ie(s,r.item.summary,r.entity)&&Ue(s,this.hass?.states[s.entity])){if("hide"===s.effect){o=!0;break}"urgent"===s.effect?(a="urgent",e=s.label??e):"highlight"===s.effect&&"urgent"!==a&&(a="highlight",e=e??s.label)}o||("none"===a&&i&&Fe(r.item,i)&&(a="highlight",e=e??this._t("due_soon")),s&&He(r.item)&&(a="urgent",e=e??this._t("overdue")),n.push({...r,flag:a,label:e}))}const r=e=>"urgent"===e?0:"highlight"===e?1:2;return n.map((e,t)=>({d:e,i:t})).sort((e,t)=>r(e.d.flag)-r(t.d.flag)||e.i-t.i).map(({d:e})=>e)}async _completeShopping(e){await Promise.all(e.open.map(e=>this._toggle(e.entity,e.item,!0)));const t=this._ownerIndex(e.entity);if(this._backendOn()&&t>=0){const s=this._config,i=s.shopping_points??s.points_per_task??10,n=(new Date).toLocaleDateString("sv");this._award(`${e.entity}|trip|${n}`,t,i,e.name)}this._fireCelebrate("task",{name:this._ownerName(e.entity),task:e.name})}_rewards(){return this._config?.rewards??[]}_approvalOn(){return this._backendOn()&&!!this._config?.reward_approval&&!!this.hass?.services?.family_tasks?.request_reward}_hasPin(){const e=this._config?.parent_pin;return null!=e&&""!==e}async _requestReward(e,t){const s=this._config?.persons[e];if(s&&this.hass){this._celebrate();try{await this.hass.callService("family_tasks","request_reward",{person:this._personKey(s,e),points:t.cost,reward:t.name})}catch(t){this._shopPerson=e}}}_startDecide(e,t,s){this._pending={personIdx:e,requestId:t,approve:s},this._pin="",this._pinError=!1}async _decide(e,t){this.hass&&await this.hass.callService("family_tasks",t?"approve":"deny",{request_id:e})}_startRedeem(e,t){if(this._approvalOn())return void this._requestReward(e,t);const s=this._config?.parent_pin;null!=s&&""!==s?(this._pending={personIdx:e,reward:t},this._pin="",this._pinError=!1):this._doRedeem(e,t)}_confirmRedeem(){if(this._pending)if(this._pin===String(this._config?.parent_pin??"")){const e=this._pending;"requestId"in e?(this._cancelRedeem(),this._decide(e.requestId,e.approve)):this._doRedeem(e.personIdx,e.reward)}else this._pinError=!0}_cancelRedeem(){this._pending=null,this._pin="",this._pinError=!1}async _doRedeem(e,t){const s=this._config?.persons[e];if(!s||!this.hass)return;if(this._backendOn()){this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("family_tasks","redeem",{person:this._personKey(s,e),points:t.cost,reward:t.name}),this._fireCelebrate("reward",{name:this._personName(s,e),task:t.name})}catch(t){this._shopPerson=e}return}if(!s.points_entity)return;const i=this._spent(s)+t.cost;this._pending=null,this._pin="",this._pinError=!1,this._celebrate();try{await this.hass.callService("input_number","set_value",{entity_id:s.points_entity,value:i}),this._fireCelebrate("reward",{name:this._personName(s,e),task:t.name})}catch(t){this._shopPerson=e}}_personName(e,t){return e.name||(e.person?this.hass?.states[e.person]?.attributes?.friendly_name:"")||`${this._t("person_fallback")} ${t+1}`}async _toggle(e,t,s=!1){if(!this.hass)return;const i="completed"===t.status?"needs_action":"completed";this._items={...this._items,[e]:(this._items[e]??[]).map(e=>e.uid===t.uid?{...e,status:i}:e)};try{if(await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:i}),"needs_action"===i&&this._backendOn()){const s=this._awardKey(e,t);this._reported.delete(s),await this.hass.callService("family_tasks","revoke",{key:s})}"completed"!==i||s||this._fireCelebrate("task",{name:this._ownerName(e,t),task:t.summary})}catch(t){this._sig[e]="",this._refresh()}}render(){if(!this._config)return W;const e=this._config;if(e.kiosk&&e.persons.length>0)return this._renderKiosk();if(e.kid_mode&&e.persons.length>0)return this._renderKid();if(e.eisenhower)return this._renderMatrix();let t=0;const s=e.persons.map((e,s)=>{const i=this._personView(e);return t+=i.earned,{p:e,idx:s,view:i}}),i=e.show_completed,n=e.hide_empty?s.filter(e=>e.view.openCount>0||i&&e.view.tasksDone.length>0):s;return U`
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
        ${this._leaderboard(s)}
      </ha-card>
    `}_renderMatrix(){const e=this._config,t=e.urgent_within??2,s=new Map(ze.map(e=>[e,[]]));e.persons.forEach((e,i)=>{for(const n of this._personView(e).tasksOpen){const r=je(n.item.due),o=He(n.item)||!!r&&Be(r.day)<=t,a=Te(n.item.summary)||this._listImportant(e,n.entity);s.get(Le(o,a)).push({o:n,idx:i})}});const i=(e,t)=>{const s=je(e.o.item.due),i=je(t.o.item.due);return((s?.at??s?.day)?.getTime()??1/0)-((i?.at??i?.day)?.getTime()??1/0)};return U`
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
            ${ze.map(t=>{const n=s.get(t).sort(i);return U`
                <div class="quad ${t}">
                  <div class="quad-head">
                    <span>${this._t(`quad_${t}`)}</span
                    ><span class="grp-count">${n.length}</span>
                  </div>
                  <div class="quad-hint">${this._t(`quad_${t}_hint`)}</div>
                  ${n.length?n.map(({o:t,idx:s})=>{return this._tile(t,Pe(e.persons[s],s),!1,t.flag,void 0,{title:(i=t.item.summary,i.trimStart().replace(/^!+\s*/,"")),who:this._personName(e.persons[s],s)});var i}):U`<div class="quad-empty">—</div>`}
                </div>
              `})}
          </div>
        </div>
      </ha-card>
    `}_listImportant(e,t){return Ee(e).some(e=>"object"==typeof e&&e.entity===t&&!!e.important)}_leaderboard(e){if(!this._config?.show_leaderboard||e.length<2)return W;const t=["🥇","🥈","🥉"],s=this._backendOn()?this._config?.leaderboard_period??"all":"all",i=e=>"week"===s?e.weekPoints??0:"month"===s?e.monthPoints??0:e.earned,n=[...e].sort((e,t)=>i(t.view)-i(e.view));return U`
      <div class="leaderboard">
        <div class="lb-title">
          ${this._t("leaderboard")}${"all"===s?W:U` · ${this._t("week"===s?"lb_week":"lb_month")}`}
        </div>
        ${n.map((e,s)=>U`
            <div class="lb-row">
              <span class="lb-rank">${t[s]??`${s+1}.`}</span>
              <span class="lb-dot" style="background:${Pe(e.p,e.idx)}"></span>
              <span class="lb-name">${this._personName(e.p,e.idx)}</span>
              <span class="lb-pts">⭐ ${i(e.view)}</span>
            </div>
          `)}
      </div>
    `}_streakChip(e,t=!1){const s=e.streak??0;return!this._config?.show_streak||!this._backendOn()||s<2?W:U`<span
      class="lvl streak ${t?"kid-lvl":""}"
      title=${this._t("streak_title").replace("{n}",String(s))}
      >⚡ ${s}</span
    >`}_autoReturnSecs(){return this._config?.auto_return??30}_resetKioskTimer(){this._kioskTimer&&clearTimeout(this._kioskTimer);const e=this._autoReturnSecs();!this._config?.kiosk||e<=0||(this._kioskTimer=window.setTimeout(()=>{this._kioskIdle=!0},1e3*e))}_wakeKiosk(e){this._activeKid=e,this._kioskIdle=!1,this._resetKioskTimer()}_renderKiosk(){const e=()=>{this._kioskIdle||this._resetKioskTimer()},t=this._kioskIdle?this._renderKioskPicker():this._renderKid();return U`<div class="kiosk-wrap" @pointerdown=${e} @keydown=${e}>
      ${t}
    </div>`}_renderKioskPicker(){const e=this._config,t=this._themeClass();let s=0;for(const t of e.persons)s+=this._personView(t).earned;return U`
      <ha-card class="kiosk-idle ${t}">
        <div class="kiosk-title">${this._t("who_is_it")}</div>
        <div class="kiosk-people">${e.persons.map((e,t)=>this._kioskAvatar(e,t))}</div>
        <div class="kiosk-foot">⭐ ${s}</div>
      </ha-card>
    `}_kioskAvatar(e,t){const s=Pe(e,t),i=this._personName(e,t),n=e.person?this.hass?.states[e.person]:void 0,r=n?.attributes?.entity_picture,o=i.slice(0,2).toUpperCase(),a=this._personView(e).openCount;return U`
      <button class="kiosk-person" @click=${()=>this._wakeKiosk(t)}>
        ${r?U`<div
                class="kiosk-av"
                style="background-image:url('${r}');box-shadow:0 0 0 4px ${s}"
              ></div>`:U`<div class="kiosk-av initials" style="background:${s}">${o}</div>`}
        <div class="kiosk-name">${i}</div>
        <div class="kiosk-open">${a?U`${a} ${this._t("open")}`:"✓"}</div>
      </button>
    `}disconnectedCallback(){super.disconnectedCallback(),this._burstTimer&&clearTimeout(this._burstTimer),this._kioskTimer&&clearTimeout(this._kioskTimer)}_renderKid(){const e=this._config,t=e.persons,s=Math.min(this._activeKid,t.length-1),i=t[s],n=Pe(i,s),r=this._personName(i,s),o=this._personView(i),a=o.earned,l=o.openCount,d=i.goal??e.goal,h=d&&d>0?Math.min(100,Math.round(a/d*100)):0,c=0===l,p=this._rewards().length>0,u=o.hasWallet?o.balance:a,_=this._levelInfo(a);return U`
      <ha-card class="kid ${this._themeClass()}" style="--pc:${n}">
        ${t.length>1?U`<div class="kid-people">
                ${t.map((e,t)=>this._kidAvatar(e,t,t===s))}
              </div>`:W}

        <div class="kid-hero">
          ${this._kidAvatar(i,s,!1,!0)}
          <div class="kid-hero-text">
            <div class="kid-name">
              ${r}${_?U`<span class="lvl kid-lvl">${_.emoji} L${_.level}</span>`:W}${this._streakChip(o,!0)}
            </div>
            <div class="kid-stars">
              ${o.hasWallet?"💰":"⭐"}
              ${u}${l?U` · ${l} offen`:W}
            </div>
          </div>
          ${p?U`<button
                  class="kid-shop-btn ${this._kidShopOpen?"active":""}"
                  title="Belohnungen"
                  @click=${()=>{this._kidShopOpen=!this._kidShopOpen,this._cancelRedeem()}}
                >
                  🎁
                </button>`:W}
        </div>

        ${d&&d>0?U`<div class="kid-bar"><div class="kid-fill" style="width:${h}%"></div></div>`:W}
        ${p&&this._kidShopOpen?this._shopPanel(s,o.balance,o.hasWallet,o.requests):U`<div class="kid-tasks">
                ${c?U`<div class="kid-alldone">
                        🎉
                        <div>${this._t("all_done_kid")}</div>
                      </div>`:U`${o.shopOpen.map(e=>this._kidShopping(e,n))}
                      ${o.tasksOpen.map(e=>this._kidTask(e,n))}`}
              </div>`}
        ${this._burst?U`<div class="burst">⭐</div>`:W}
      </ha-card>
    `}_kidAvatar(e,t,s,i=!1){const n=Pe(e,t),r=this._personName(e,t),o=e.person?this.hass?.states[e.person]:void 0,a=o?.attributes?.entity_picture,l=r.slice(0,2).toUpperCase(),d=`kid-av ${i?"big":""} ${s?"active":""}`,h=a?`background-image:url('${a}');box-shadow:0 0 0 3px ${n}`:`background:${n}`,c=a?W:U`<span>${l}</span>`;return i?U`<div class="${d}" style="${h}">${c}</div>`:U`<button
          class="${d}"
          style="${h}"
          title=${r}
          @click=${()=>this._activeKid=t}
        >
          ${c}
        </button>`}_kidTask(e,t){const{entity:s,item:i,flag:n,label:r}=e,o="urgent"===n?"⚠️":Re(i.summary),a=this._canToggle(s),l=r??this._rotationHint(e);return U`
      <button
        class="kid-task ${n}"
        style="--pc:${t}"
        ?disabled=${!a}
        title=${a?"":this._t("no_toggle")}
        @click=${()=>this._kidComplete(s,i)}
      >
        <span class="kid-emoji">${o}</span>
        <span class="kid-task-title">
          ${i.summary}${l?U`<span class="kid-sub">${l}</span>`:W}
        </span>
        <span class="kid-check">${a?"◯":"🔒"}</span>
      </button>
    `}_kidShopping(e,t){return U`
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
    `}_celebrate(){this._burst=!0,this._burstTimer&&clearTimeout(this._burstTimer),this._burstTimer=window.setTimeout(()=>{this._burst=!1},900)}_ownerName(e,t){const s=this._config?.persons??[];if(t&&this._rotationLists().includes(e)){const i=this._rotationMap().get(`${e}|${t.uid}`);return i?this._personName(s[i.now],i.now):void 0}for(let t=0;t<s.length;t++)if(this._ownLists(s[t]).includes(e))return this._personName(s[t],t)}_fireCelebrate(e,t){const s=this._config?.celebrate;if(!s||!this.hass||!Array.isArray(s.actions))return;if((s.on?Array.isArray(s.on)?s.on:[s.on]:["all_done"]).includes(e))for(const e of s.actions){const s=e?.action??e?.service;if(!s||!s.includes("."))continue;const[i,...n]=s.split("."),r=n.join("."),o=De(e.data??{},t),a=e.target?De(e.target,t):void 0;Promise.resolve(this.hass.callService(i,r,o,a)).catch(()=>{})}}updated(){if(!this._config)return;this._applyAppearance(),this._maintainRotation(),this._reportCompletions();const e=this._config.active_person_entity;if(e){const t=this.hass?.states[e]?.state;if(t!==this._lastActive){this._lastActive=t;const e=this._activePersonIndex();e>=0&&(this._config.kiosk?this._wakeKiosk(e):this._activeKid=e)}}this._config.celebrate&&this._config.persons.forEach((e,t)=>{const s=this._personView(e).openCount,i=this._prevOpen[t];this._prevOpen[t]=s,void 0!==i&&i>0&&0===s&&this._fireCelebrate("all_done",{name:this._personName(e,t)})})}_applyAppearance(){const e=this._config,t=(e,t,s)=>{const i="number"==typeof e&&isFinite(e)?e:100;return Math.min(s,Math.max(t,i))/100},s=t(e?.font_scale,50,300),i=t(e?.avatar_scale,40,400),n=t(e?.scale,40,400);this.style.setProperty("--ftc-fs",String(s)),this.style.setProperty("--ftc-av",String(i)),this.style.setProperty("zoom",1===n?"":String(n))}_activePersonIndex(){const e=this._config?.active_person_entity,t=e?this.hass?.states[e]?.state:void 0;if(!t||["unknown","unavailable",""].includes(t))return-1;const s=t.toLowerCase(),i=this._config?.persons??[];for(let e=0;e<i.length;e++){const t=i[e];if(t.person&&t.person.toLowerCase()===s)return e;if(this._personName(t,e).toLowerCase()===s)return e;const n=t.person?this.hass?.states[t.person]?.attributes?.friendly_name:void 0;if(n&&n.toLowerCase()===s)return e}return-1}async _kidComplete(e,t){this._celebrate(),await this._toggle(e,t)}async _kidCompleteShopping(e){this._celebrate(),await this._completeShopping(e)}_goalBar(e){const t=this._config?.goal;if(!t||t<=0)return U`<div class="fam-pts">⭐ ${e}</div>`;const s=Math.max(0,Math.min(100,Math.round(e/t*100)));return U`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${e}</span><span class="goal-target">${this._t("goal")} ${t}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${s}%"></div></div>
      </div>
    `}_column(e,t,s){const i=Pe(e,t),n=this._personName(e,t),r=e.person?this.hass?.states[e.person]:void 0,o=r?.attributes?.entity_picture,a=n.slice(0,2).toUpperCase(),l=this._config?.show_completed,d=0===s.openCount&&(!l||0===s.tasksDone.length),h=this._rewards().length>0,c=this._shopPerson===t,p=s.hasWallet?s.balance:s.earned,u=this._levelInfo(s.earned),_=!1===this._config?.allow_add?void 0:this._addEntityFor(e),g=!!this._config?.active_person_entity&&this._activePersonIndex()===t;return U`
      <div class="col ${g?"active":""}" style="--pc:${i}">
        <div class="col-head">
          ${o?U`<div
                  class="avatar"
                  style="background-image:url('${o}');box-shadow:0 0 0 2px ${i}55"
                ></div>`:U`<div class="avatar initials" style="background:${i}">${a}</div>`}
          <div class="col-meta">
            <div class="pname">
              <span class="pname-txt">${n}</span>
              ${u?U`<span
                      class="lvl"
                      title="${this._t("level")} ${u.level} · ${u.pct}% ${this._t("to_next")}"
                      >${u.emoji} L${u.level}</span
                    >`:W}
              ${this._streakChip(s)}
            </div>
            <div class="pstatus">
              ${s.openCount} ${this._t("open")} · ${s.hasWallet?"💰":"⭐"} ${p}
            </div>
          </div>
          ${h?U`<button
                  class="shop-toggle ${c?"active":""}"
                  title=${this._t("rewards")}
                  @click=${()=>{this._shopPerson=c?null:t,this._cancelRedeem()}}
                >
                  🎁
                </button>`:W}
        </div>

        <div class="tiles">
          ${d?U`<div class="empty">${this._t("all_done_board")}</div>`:W}
          ${s.shopOpen.map(e=>this._shoppingTile(e,i))}
          ${this._config.group_by_due?this._groupedTiles(t,s.tasksOpen,i):s.tasksOpen.map(e=>this._tile(e,i,!1,e.flag,e.label))}
          ${l?s.tasksDone.map(e=>this._tile(e,i,!0)):W}
        </div>

        ${_?U`<div class="add-row">
                <input
                  class="add-input"
                  type="text"
                  placeholder=${this._t("add_task")}
                  @keydown=${e=>{"Enter"===e.key&&this._addTask(_,e.target)}}
                />
              </div>`:W}
        ${c?this._shopPanel(t,s.balance,s.hasWallet,s.requests):W}
      </div>
    `}_groupedTiles(e,t,s){const i=new Map;for(const e of t){const t=Oe(e.item);i.set(t,[...i.get(t)??[],e])}return Ne.filter(e=>i.has(e)).map(t=>{const n=i.get(t),r=`${e}|${t}`,o=Me.has(t),a=!o||!!this._expanded[r];return U`
        <div
          class="grp-head ${t} ${o?"collapsible":""}"
          role=${o?"button":W}
          tabindex=${o?0:W}
          aria-expanded=${o?String(a):W}
          @click=${o?()=>this._toggleGroup(r):W}
          @keydown=${o?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleGroup(r))}:W}
        >
          <span>${this._t(`grp_${t}`)}</span>
          <span class="grp-count">${n.length}${o?a?" ▾":" ▸":""}</span>
        </div>
        ${a?n.map(e=>this._tile(e,s,!1,e.flag,e.label)):W}
      `})}_toggleGroup(e){this._expanded={...this._expanded,[e]:!this._expanded[e]}}_shopPanel(e,t,s,i=[]){const n=this._rewards(),r=this._pending?.personIdx===e?this._pending:null,o=this._approvalOn();return U`
      <div class="shop">
        <div class="shop-head">
          <span>🎁 ${this._t("rewards")}</span>
          <span class="shop-balance"
            >${this._t("balance")} ${s?"💰":"⭐"} ${t}</span
          >
        </div>
        ${s?W:U`<div class="shop-note">
                ${this._t("no_wallet_1")}<code>points_entity</code>,
                <code>input_number</code>${this._t("no_wallet_2")}
              </div>`}
        ${n.map(i=>{const n=s&&t>=i.cost;return U`
            <div class="reward ${n?"":"locked"}">
              <span class="reward-emoji">${i.emoji||"🎁"}</span>
              <span class="reward-name">${i.name}</span>
              <span class="reward-cost">⭐ ${i.cost}</span>
              <button
                class="reward-btn"
                ?disabled=${!n}
                @click=${()=>this._startRedeem(e,i)}
              >
                ${this._t(o?"request":"redeem")}
              </button>
            </div>
          `})}
        ${i.map(t=>U`
            <div class="reward waiting">
              <span class="reward-emoji">⏳</span>
              <span class="reward-name"
                >${t.reward}<span class="reward-wait">${this._t("waiting")}</span></span
              >
              <span class="reward-cost">⭐ ${t.points}</span>
              ${this._hasPin()?U`<button
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
                      </button>`:W}
            </div>
          `)}
        ${r?this._pinRow():W}
      </div>
    `}_pinRow(){return U`
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
        ${this._pinError?U`<span class="pin-msg">${this._t("wrong_pin")}</span>`:W}
      </div>
    `}_shoppingTile(e,t){const s=e.open.length,i=this._canToggle(e.entity);return U`
      <div
        class="tile shopping ${i?"":"readonly"}"
        style="--pc:${t}"
        role=${i?"button":"listitem"}
        tabindex=${i?0:-1}
        @click=${i?()=>this._completeShopping(e):W}
        @keydown=${i?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._completeShopping(e))}:W}
      >
        <div class="check">${i?"":"🔒"}</div>
        <div class="tile-emoji">🛒</div>
        <div class="tile-text">
          <div class="tile-title">${e.name}</div>
          <div class="tile-due">${s} ${this._t("items")}</div>
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
    `}_tile(e,t,s,i="none",n,r){const{entity:o,item:a}=e,l="urgent"===i?"⚠️":Re(a.summary),d=this._canToggle(o),h=s?void 0:this._rotationHint(e);return U`
      <div
        class="tile ${s?"done":i} ${d?"":"readonly"}"
        style="--pc:${t}"
        title=${d?"":this._t("no_toggle")}
        role=${d?"button":"listitem"}
        tabindex=${d?0:-1}
        @click=${d?()=>this._toggle(o,a):W}
        @keydown=${d?e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggle(o,a))}:W}
      >
        <div class="check">${s?"✓":d?"":"🔒"}</div>
        <div class="tile-emoji">${l}</div>
        <div class="tile-text">
          <div class="tile-title">${r?r.title:a.summary}</div>
          ${r?U`<div class="tile-due">
                  ${r.who}${a.due?` · ${this._formatDue(a.due)}`:""}
                </div>`:n?U`<div class="tile-flag">${n}</div>`:h?U`<div class="tile-due">${h}</div>`:a.due?U`<div class="tile-due">${this._formatDue(a.due)}</div>`:W}
        </div>
      </div>
    `}_formatDue(e){const t=je(e);if(!t)return e;const s=this.hass?.locale?.language||"de",i=0===Be(t.day)?this._t("today"):new Intl.DateTimeFormat(s,{weekday:"short",day:"numeric",month:"short"}).format(t.day);if(!t.at)return i;return`${i}, ${new Intl.DateTimeFormat(s,{hour:"2-digit",minute:"2-digit"}).format(t.at)}`}}Ke.styles=o`
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
  `,e([ce({attribute:!1})],Ke.prototype,"hass",void 0),e([pe()],Ke.prototype,"_config",void 0),e([pe()],Ke.prototype,"_items",void 0),e([pe()],Ke.prototype,"_activeKid",void 0),e([pe()],Ke.prototype,"_burst",void 0),e([pe()],Ke.prototype,"_shopPerson",void 0),e([pe()],Ke.prototype,"_kidShopOpen",void 0),e([pe()],Ke.prototype,"_pending",void 0),e([pe()],Ke.prototype,"_pin",void 0),e([pe()],Ke.prototype,"_pinError",void 0),e([pe()],Ke.prototype,"_kioskIdle",void 0),e([pe()],Ke.prototype,"_expanded",void 0),customElements.get("family-task-card")||customElements.define("family-task-card",Ke),window.customCards=window.customCards||[],window.customCards.push({type:"family-task-card",name:$e,description:"Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",preview:!0,documentationURL:"https://github.com/renespeaker/ha-family-task-card"});const We=me,qe=["manual","due","alpha"],Ge=["auto","dark","light"],Ye=["week","day"],Ve=["all","week","month"],Ze=[{name:"name",selector:{text:{}}},{name:"person",selector:{entity:{filter:{domain:"person"}}}},{name:"lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"goal",selector:{number:{min:0,max:1e5,mode:"box",step:1}}},{name:"points_entity",selector:{entity:{filter:{domain:"input_number"}}}}],Je={general:{de:"Allgemein",en:"General"},mode:{de:"Modus",en:"Mode"},tasks:{de:"Aufgaben & Filter",en:"Tasks & filters"},rotation:{de:"Ämtli-Rotation",en:"Chore rotation"},points:{de:"Punkte & Level",en:"Points & levels"},shopping:{de:"Einkauf (Bring!)",en:"Shopping (Bring!)"},look:{de:"Darstellung",en:"Appearance"},rewards:{de:"Belohnungen",en:"Rewards"},rules:{de:"Kontext-Regeln",en:"Context rules"},celebrate:{de:"Feier-Aktionen",en:"Celebrate actions"},list_settings:{de:"Listen-Einstellungen",en:"List settings"}},Xe=["highlight","urgent","hide"],Qe=["all_done","task","reward"],et=[{name:"name",selector:{text:{}}},{name:"cost",selector:{number:{min:1,max:1e5,mode:"box",step:1}}},{name:"emoji",selector:{text:{}}}],tt=[{name:"important",selector:{boolean:{}}},{name:"hide_undated",selector:{boolean:{}}},{name:"show_within",selector:{number:{min:0,max:365,mode:"box",step:1}}}],st={title:{de:"Titel",en:"Title"},theme:{de:"Farbschema",en:"Color scheme"},points_per_task:{de:"Punkte pro Aufgabe",en:"Points per task"},goal:{de:"Ziel (Punkte)",en:"Goal (points)"},show_completed:{de:"Erledigte anzeigen",en:"Show completed"},kid_mode:{de:"Kinder-Modus",en:"Kid mode"},eisenhower:{de:"Eisenhower-Ansicht (für Eltern)",en:"Eisenhower view (for parents)"},urgent_within:{de:"Dringend: fällig in … Tagen",en:"Urgent: due within … days"},active_person_entity:{de:"Aktive Person (Entität)",en:"Active person (entity)"},kiosk:{de:"Kiosk-Modus (Wandtablet)",en:"Kiosk mode (wall tablet)"},auto_return:{de:"Auto-Rückkehr (Sek.)",en:"Auto-return (sec)"},highlight_overdue:{de:"Überfällige hervorheben",en:"Highlight overdue"},shopping_lists:{de:"Einkaufslisten (Bring!)",en:"Shopping lists (Bring!)"},shopping_points:{de:"Punkte pro Einkauf",en:"Points per shopping trip"},bring_deeplink:{de:"Bring!-Link",en:"Bring! link"},parent_pin:{de:"Eltern-PIN (Belohnungen)",en:"Parent PIN (rewards)"},points_backend:{de:"Punktekonto nutzen (Family Tasks)",en:"Use points ledger (Family Tasks)"},reward_approval:{de:"Belohnungs-Freigabe per Push",en:"Reward approval by push"},level_size:{de:"Punkte pro Level",en:"Points per level"},show_leaderboard:{de:"Rangliste anzeigen",en:"Show leaderboard"},leaderboard_period:{de:"Rangliste für",en:"Leaderboard for"},show_streak:{de:"Serien anzeigen (⚡)",en:"Show streaks (⚡)"},rotation:{de:"Auto-Rotation (reihum)",en:"Auto-rotation (take turns)"},rotation_lists:{de:"Ämtli-Listen (reihum)",en:"Chore lists (rotating)"},rotation_period:{de:"Wechsel",en:"Rotate"},rotation_persons:{de:"Wer macht mit?",en:"Who takes part?"},rotation_reset:{de:"Ämtli jede Runde wieder öffnen",en:"Reopen chores every round"},scale:{de:"Kartengröße",en:"Card size"},font_scale:{de:"Schriftgröße",en:"Font size"},avatar_scale:{de:"Avatar-/Bildgröße",en:"Avatar / picture size"},sort:{de:"Sortierung",en:"Sort"},hide_empty:{de:"Leere Personen ausblenden",en:"Hide empty persons"},due_soon:{de:"Bald fällig (Tage)",en:"Due soon (days)"},group_by_due:{de:"Nach Fälligkeit gruppieren",en:"Group by due date"},hide_undated:{de:"Aufgaben ohne Termin ausblenden",en:"Hide tasks without a date"},show_within:{de:"Nur fällig in den nächsten … Tagen",en:"Only due within … days"},allow_add:{de:"Aufgabe-hinzufügen-Feld",en:"Add-task field"},name:{de:"Name",en:"Name"},level_emojis:{de:"Level-Abzeichen",en:"Level badges"},cost:{de:"Preis (Punkte)",en:"Price (points)"},emoji:{de:"Emoji",en:"Emoji"},important:{de:"Wichtig (Eisenhower)",en:"Important (Eisenhower)"},match:{de:"Titel enthält",en:"Title contains"},entity:{de:"Entität",en:"Entity"},state:{de:"Wenn Zustand",en:"When state"},effect:{de:"Wirkung",en:"Effect"},label:{de:"Hinweis",en:"Note"},invert:{de:"Umkehren (wenn NICHT)",en:"Invert (when NOT)"},on:{de:"Wann feiern",en:"When to celebrate"},actions:{de:"Aktionen",en:"Actions"},person:{de:"Person (Avatar)",en:"Person (avatar)"},lists:{de:"Aufgabenlisten (todo.*)",en:"Task lists (todo.*)"},points_entity:{de:"Guthaben-Helfer (input_number)",en:"Points helper (input_number)"}},it={theme:{de:"Farbschema der Karte erzwingen (unabhängig vom Dashboard-Theme). Standard: dem HA-Theme folgen.",en:"Force the card's color scheme (independent of the dashboard theme). Default: follow the HA theme."},points_per_task:{de:"Punkte je erledigter Aufgabe (Standard 10).",en:"Points per completed task (default 10)."},goal:{de:"Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",en:"Family points goal for the progress bar. 0 = off."},show_completed:{de:"Erledigte Aufgaben ausgegraut mitanzeigen.",en:"Also show completed tasks (dimmed)."},eisenhower:{de:"Statt Spalten pro Person ein 2×2-Raster: Jetzt erledigen / Einplanen / Delegieren / Später. Dringend = überfällig oder bald fällig; wichtig = „!“ am Titelanfang oder Liste mit important: true (YAML). Kinder- und Kiosk-Modus haben Vorrang.",en:"Instead of person columns, a 2×2 grid: Do now / Schedule / Delegate / Later. Urgent = overdue or due soon; important = “!” at the start of the title or a list with important: true (YAML). Kid and kiosk mode take precedence."},urgent_within:{de:"Aufgaben, die in so vielen Tagen fällig sind, gelten als dringend (Überfälliges immer). Standard 2.",en:"Tasks due within this many days count as urgent (overdue always). Default 2."},kid_mode:{de:"Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",en:"Big, tappable layout for the kids' tablet (avatar switcher on top)."},active_person_entity:{de:"Entität (input_select/Sensor/person), deren Wert die aktive Person nennt – die Karte fokussiert sie automatisch (z. B. per NFC-Tag/Anwesenheit). Leer = manuell umschalten.",en:"Entity (input_select/sensor/person) whose value names the active person — the card focuses them automatically (e.g. via NFC tag/presence). Empty = switch manually."},kiosk:{de:"Wandtablet-Modus: Ruhebildschirm 'Wer ist dran?' mit großen Avataren; Antippen (oder NFC/Anwesenheit) zeigt die Aufgaben, nach Inaktivität geht es zurück.",en:"Wall-tablet mode: an idle 'Who's there?' screen with big avatars; tapping (or NFC/presence) shows the tasks, and it returns after inactivity."},auto_return:{de:"Sekunden Inaktivität bis zurück zum 'Wer ist dran?'-Bildschirm (Standard 30, 0 = nie).",en:"Seconds of inactivity before returning to the 'Who's there?' screen (default 30, 0 = never)."},highlight_overdue:{de:"Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Weitere Kontext-Regeln per YAML (context_rules).",en:"Mark tasks past their due date as urgent (default on). More context rules via YAML (context_rules)."},shopping_lists:{de:"Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",en:"These todo.* lists (e.g. Bring!) show as one 'shopping' tile; checking it off completes the whole trip."},shopping_points:{de:"Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",en:"Points for a finished shopping trip (default = points per task)."},bring_deeplink:{de:"Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",en:"Target of the 'Open in Bring!' button (default web.getbring.com)."},reward_approval:{de:"Kinder fragen Belohnungen an, die Punkte werden reserviert, und die Eltern geben per Push frei oder lehnen ab. Wer die Push bekommt, stellst du in der Integration Family Tasks ein (Konfigurieren). Mit Eltern-PIN geht die Freigabe auch in der Karte.",en:"Kids request rewards, the points are reserved, and the parents approve or deny by push. Who gets the push is set in the Family Tasks integration (Configure). With a parent PIN, requests can also be decided in the card."},points_backend:{de:"Punkte dauerhaft im Punktekonto der Integration „Family Tasks“ buchen: Sie bleiben, wenn Listen geleert werden, Ämtli geben Punkte, Einlösen läuft übers Konto. Braucht die installierte Integration, sonst bleibt alles wie bisher.",en:"Book points permanently in the ledger of the “Family Tasks” integration: they stay when lists are cleared, chores earn points, rewards are paid from it. Needs the integration installed, otherwise nothing changes."},parent_pin:{de:"PIN, die zum Einlösen einer Belohnung abgefragt wird (Eltern-Freigabe). Belohnungen selbst per YAML (rewards).",en:"PIN asked when redeeming a reward (parent approval). Rewards themselves via YAML (rewards)."},level_size:{de:"Punkte pro Level (aus verdienten Punkten). Standard 100, 0 = keine Level. Abzeichen optional per YAML (level_emojis).",en:"Points per level (from earned points). Default 100, 0 = no levels. Badges optional via YAML (level_emojis)."},leaderboard_period:{de:"Gesamt, diese Woche oder diesen Monat. Woche/Monat braucht das Punktekonto (Family Tasks), sonst wird gesamt gezählt.",en:"All time, this week or this month. Week/month needs the points ledger (Family Tasks), otherwise all time is used."},show_streak:{de:"Zeigt „⚡ 5“ neben dem Namen: an wie vielen Tagen am Stück jemand mindestens eine Aufgabe erledigt hat (ab 2 Tagen). Braucht das Punktekonto (Family Tasks).",en:"Shows “⚡ 5” next to the name: how many days in a row someone has done at least one task (from 2 days). Needs the points ledger (Family Tasks)."},show_leaderboard:{de:"Rangliste der Personen nach verdienten Punkten unter dem Board anzeigen.",en:"Show a ranking of persons by earned points under the board."},rotation:{de:"Ämtli aus gemeinsamen Listen wechseln automatisch reihum zwischen den Personen – täglich oder wöchentlich. Aus = aus.",en:"Chores from shared lists automatically take turns between persons – daily or weekly. Off = off."},rotation_lists:{de:"Eigene todo.*-Liste(n) nur für Ämtli, z. B. Müll, Spülmaschine, Tisch decken. Nicht zusätzlich bei einer Person eintragen.",en:"Dedicated todo.* list(s) just for chores, e.g. bins, dishwasher, set the table. Don't also add them to a person."},rotation_period:{de:"Wie oft die Ämtli weiterwandern. Wöchentlich beginnt jede Runde am Montag.",en:"How often chores move on. Weekly rounds start on Monday."},rotation_persons:{de:"Nichts gewählt = alle Personen der Karte machen mit.",en:"Nothing selected = every person on the card takes part."},rotation_reset:{de:"Abgehakte Ämtli zu Beginn der nächsten Runde wieder öffnen (die Karte setzt dafür die Fälligkeit auf das Rundenende). Ämtli geben nur mit Punktekonto (Family Tasks) Punkte, weil sie jede Runde neu starten.",en:"Reopen checked-off chores when the next round starts (the card sets their due date to the end of the round). Chores only earn points with the points ledger (Family Tasks), as they start over every round."},scale:{de:"Gesamte Karte vergrößern/verkleinern (Zoom über alles: Layout, Schrift, Bilder). 100 % = Standard.",en:"Enlarge/shrink the whole card (zoom over everything: layout, text, pictures). 100 % = default."},font_scale:{de:"Nur die Schriftgröße anpassen (zusätzlich zur Kartengröße). 100 % = Standard.",en:"Adjust the text size only (on top of the card size). 100 % = default."},avatar_scale:{de:"Nur Avatare/Bilder und das Karten-Icon anpassen. 100 % = Standard.",en:"Adjust avatars/pictures and the card icon only. 100 % = default."},sort:{de:"Reihenfolge der offenen Aufgaben je Person.",en:"Order of the open tasks per person."},hide_empty:{de:"Personen ohne offene Aufgaben ausblenden.",en:"Hide persons that have no open tasks."},group_by_due:{de:"Board: offene Aufgaben unter Überfällig / Heute / Bald / Später / Ohne Termin; Später und Ohne Termin sind zugeklappt. Nicht im Kinder-Modus.",en:"Board: open tasks under Overdue / Today / Soon / Later / No date; Later and No date start collapsed. Not in kid mode."},hide_undated:{de:"Offene Aufgaben ohne Fälligkeitsdatum nicht anzeigen. Pro Liste per YAML überschreibbar.",en:"Don't show open tasks without a due date. Can be overridden per list in YAML."},show_within:{de:"Nur Aufgaben zeigen, die in so vielen Tagen fällig sind; Überfälliges immer. 0 = nur heute. Leer = alle. Pro Liste per YAML überschreibbar.",en:"Only show tasks due within this many days; overdue always. 0 = today only. Empty = all. Can be overridden per list in YAML."},due_soon:{de:"Aufgaben, die in den nächsten X Tagen fällig sind, hervorheben. 0 = aus.",en:"Highlight tasks due within the next X days. 0 = off."},allow_add:{de:"Ein Eingabefeld pro Person zum Anlegen neuer Aufgaben (nur wo die Liste es unterstützt).",en:"An input field per person to add new tasks (only where the list supports it)."},level_emojis:{de:"Ein Abzeichen pro Level, durch Leerzeichen getrennt, z. B. 🌱 ⭐ 🔥 🏅 🏆 👑. Leer = Standard.",en:"One badge per level, separated by spaces, e.g. 🌱 ⭐ 🔥 🏅 🏆 👑. Empty = default."},important:{de:"Alle Aufgaben dieser Liste gelten in der Eisenhower-Ansicht als wichtig.",en:"Every task of this list counts as important in the Eisenhower view."},match:{de:"Ein Wort oder mehrere mit | getrennt, z. B. gieß|blumen. Leer = alle Aufgaben.",en:"A word or several separated by |, e.g. water|plants. Empty = all tasks."},state:{de:"Zustand der Entität, z. B. rainy. Mehrere mit Komma = einer davon.",en:"State of the entity, e.g. rainy. Several with commas = any of them."},label:{de:"Kurzer Hinweis auf der Kachel, z. B. „Morgen Abfuhr!“ (bei Hervorheben/Dringend).",en:"Short note on the tile, e.g. “Bins tomorrow!” (with highlight/urgent)."},on:{de:"Alles geschafft = wenn eine Person alles erledigt hat; Aufgabe = bei jeder Aufgabe; Belohnung = beim Einlösen. In Texten stehen {name} und {task} für Person und Aufgabe.",en:"All done = when a person finished everything; task = on every task; reward = when redeeming. In texts, {name} and {task} stand for person and task."},person:{de:"Optional: person.* liefert Avatarbild & Anzeigename.",en:"Optional: person.* provides the avatar picture & display name."},lists:{de:"Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",en:"One or more todo.* lists that belong to this person."},points_entity:{de:"input_number, das die bereits eingelösten Punkte dieser Person speichert (Guthaben = verdient − eingelöst).",en:"input_number storing this person's already-redeemed points (balance = earned − spent)."}};class nt extends ae{constructor(){super(...arguments),this._label=e=>st[e.name]?.[this._lang]??e.name,this._helper=e=>it[e.name]?.[this._lang]}setConfig(e){this._config=e}get _persons(){return Array.isArray(this._config.persons)?this._config.persons:[]}get _settingsData(){const e=this._config.shopping_lists,t=Array.isArray(e)?e:e?[e]:[],s=!1!==this._config.highlight_overdue,i=!1!==this._config.allow_add,n=this._config.rotation_lists,r=Array.isArray(n)?n:n?[n]:[],o=this._config.rotation_period??"week",a=!1!==this._config.rotation_reset,l=(this._config.level_emojis??[]).join(" "),d=this._config.scale??100,h=this._config.font_scale??100,c=this._config.avatar_scale??100;return{...this._config,shopping_lists:t,highlight_overdue:s,allow_add:i,scale:d,font_scale:h,avatar_scale:c,rotation_lists:r,rotation_period:o,rotation_reset:a,level_emojis:l}}get _lang(){return _e(this.hass)}_section(e,t,s,i=!1){return{type:"expandable",name:"",title:Je[e]?.[this._lang]??e,icon:t,flatten:!0,expanded:i,schema:s}}_schema(){const e=this._config,t=(e,t,s=1)=>({number:{min:e,max:t,mode:"box",step:s}}),s=(e,t)=>({number:{min:e,max:t,mode:"slider",step:5,unit_of_measurement:"%"}}),i=(e,t)=>({select:{mode:"dropdown",options:e.map(e=>({value:e,label:ge(this.hass,t(e))}))}}),n={boolean:{}};return[this._section("general","mdi:card-text-outline",[{name:"title",selector:{text:{}}},{name:"theme",selector:i(Ge,e=>`theme_${e}`)}],!0),this._section("mode","mdi:view-dashboard-variant-outline",[{name:"kid_mode",selector:n},{name:"eisenhower",selector:n},...e.eisenhower?[{name:"urgent_within",selector:t(0,60)}]:[],{name:"kiosk",selector:n},...e.kiosk?[{name:"auto_return",selector:t(0,3600,5)}]:[],{name:"active_person_entity",selector:{entity:{filter:[{domain:"input_select"},{domain:"sensor"},{domain:"person"}]}}}]),this._section("tasks","mdi:format-list-checks",[{name:"show_completed",selector:n},{name:"allow_add",selector:n},{name:"hide_empty",selector:n},{name:"highlight_overdue",selector:n},{name:"sort",selector:i(qe,e=>`sort_${e}`)},{name:"due_soon",selector:t(0,60)},{name:"group_by_due",selector:n},{name:"hide_undated",selector:n},{name:"show_within",selector:t(0,365)}]),this._section("rotation","mdi:rotate-3d-variant",[{name:"rotation",selector:n},...e.rotation?this._rotationSchema():[]]),this._section("points","mdi:star-circle-outline",[{name:"points_per_task",selector:t(0,1e3)},{name:"goal",selector:t(0,1e5)},{name:"level_size",selector:t(0,1e5,10)},{name:"level_emojis",selector:{text:{}}},{name:"show_leaderboard",selector:n},...e.show_leaderboard?[{name:"leaderboard_period",selector:i(Ve,e=>"all"===e?"lb_all":`lb_${e}`)}]:[],{name:"show_streak",selector:n},{name:"points_backend",selector:n},...e.points_backend?[{name:"reward_approval",selector:n}]:[]]),this._section("shopping","mdi:cart-outline",[{name:"shopping_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"shopping_points",selector:t(0,1e5)},{name:"bring_deeplink",selector:{text:{}}}]),this._section("look","mdi:palette-outline",[{name:"scale",selector:s(50,200)},{name:"font_scale",selector:s(70,200)},{name:"avatar_scale",selector:s(50,250)}])]}_rotationSchema(){const e=this._persons.map((e,t)=>({value:e.name||e.person||`${t+1}`,label:e.name||e.person||`${ge(this.hass,"person_fallback")} ${t+1}`}));return[{name:"rotation_lists",selector:{entity:{filter:{domain:"todo"},multiple:!0}}},{name:"rotation_period",selector:{select:{mode:"dropdown",options:Ye.map(e=>({value:e,label:ge(this.hass,`rot_${e}`)}))}}},{name:"rotation_persons",selector:{select:{multiple:!0,mode:"list",options:e}}},{name:"rotation_reset",selector:{boolean:{}}}]}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}}))}_settingsChanged(e){e.stopPropagation();const t=e.detail.value,s={...t};s.title||delete s.title,s.goal||delete s.goal,s.show_completed||delete s.show_completed,s.kid_mode||delete s.kid_mode,s.eisenhower||delete s.eisenhower,("number"!=typeof s.urgent_within||isNaN(s.urgent_within))&&delete s.urgent_within,s.shopping_points||delete s.shopping_points,s.bring_deeplink||delete s.bring_deeplink,s.parent_pin||delete s.parent_pin,s.points_backend||delete s.points_backend,s.reward_approval||delete s.reward_approval,s.show_leaderboard||delete s.show_leaderboard,s.leaderboard_period&&"all"!==s.leaderboard_period||delete s.leaderboard_period,s.show_streak||delete s.show_streak,s.hide_empty||delete s.hide_empty,s.due_soon||delete s.due_soon,s.group_by_due||delete s.group_by_due,s.hide_undated||delete s.hide_undated,("number"!=typeof s.show_within||isNaN(s.show_within))&&delete s.show_within,s.sort&&"manual"!==s.sort||delete s.sort,s.theme&&"auto"!==s.theme||delete s.theme,s.active_person_entity||delete s.active_person_entity,s.kiosk||delete s.kiosk,s.auto_return||delete s.auto_return,s.scale&&100!==s.scale||delete s.scale,s.font_scale&&100!==s.font_scale||delete s.font_scale,s.avatar_scale&&100!==s.avatar_scale||delete s.avatar_scale,s.rotation||delete s.rotation,s.rotation_period&&"week"!==s.rotation_period||delete s.rotation_period,s.rotation_persons?.length||delete s.rotation_persons,!1!==s.rotation_reset&&delete s.rotation_reset,Array.isArray(s.rotation_lists)&&(0===s.rotation_lists.length?delete s.rotation_lists:1===s.rotation_lists.length&&(s.rotation_lists=s.rotation_lists[0]));const i=String(s.level_emojis??"").split(/[\s,]+/).filter(Boolean);i.length?s.level_emojis=i:delete s.level_emojis,s.highlight_overdue&&delete s.highlight_overdue,s.allow_add&&delete s.allow_add,Array.isArray(s.shopping_lists)&&(0===s.shopping_lists.length?delete s.shopping_lists:1===s.shopping_lists.length&&(s.shopping_lists=s.shopping_lists[0]));const n={...this._config,...s,persons:this._persons};for(const e of Object.keys(t))e in s||delete n[e];this._emit(n)}_personChanged(e,t){t.stopPropagation();const s={...t.detail.value};if(s.color||delete s.color,s.goal||delete s.goal,s.points_entity||delete s.points_entity,Array.isArray(s.lists)){const t=this._persons[e]?.lists,i=(Array.isArray(t)?t:t?[t]:[]).filter(e=>"object"==typeof e&&!!e),n=s.lists.map(e=>i.find(t=>t.entity===e)??e);0===n.length?delete s.lists:s.lists=1===n.length&&"string"==typeof n[0]?n[0]:n}const i=this._persons.map((t,i)=>i===e?s:t);this._emit({...this._config,persons:i})}_personData(e){const t=(Array.isArray(e.lists)?e.lists:e.lists?[e.lists]:[]).map(e=>"string"==typeof e?e:e.entity);return{...e,lists:t}}_setPersonColor(e,t){const s=this._persons.map((s,i)=>{if(i!==e)return s;const n={...s};return t?n.color=t:delete n.color,n});this._emit({...this._config,persons:s})}_addPerson(){const e=[...this._persons,{name:"",person:"",lists:""}];this._emit({...this._config,persons:e})}_removePerson(e){const t=this._persons.filter((t,s)=>s!==e);this._emit({...this._config,persons:t})}_movePerson(e,t){const s=[...this._persons],i=e+t;i<0||i>=s.length||([s[e],s[i]]=[s[i],s[e]],this._emit({...this._config,persons:s}))}_autoDetect(){const e=new Set(this._persons.map(e=>e.person).filter(Boolean)),t=Object.keys(this.hass.states).filter(e=>e.startsWith("person.")).filter(t=>!e.has(t)).map(e=>({name:this.hass.states[e].attributes?.friendly_name||"",person:e,lists:""}));if(0===t.length)return;const s=this._persons.filter(e=>e.name||e.person||(e=>Array.isArray(e.lists)?e.lists.length>0:!!e.lists)(e));this._emit({...this._config,persons:[...s,...t]})}_personColor(e,t){return e.color||We[t%We.length]}get _rewardList(){return Array.isArray(this._config.rewards)?this._config.rewards:[]}_setRewards(e){const t={...this._config};e.length?t.rewards=e:delete t.rewards,this._emit(t)}_rewardChanged(e,t){t.stopPropagation();const s=t.detail.value,i={name:String(s.name??""),cost:Number(s.cost)||0};s.emoji&&(i.emoji=String(s.emoji)),this._setRewards(this._rewardList.map((t,s)=>s===e?i:t))}_addReward(){this._setRewards([...this._rewardList,{name:"",cost:50,emoji:"🎁"}])}_removeReward(e){this._setRewards(this._rewardList.filter((t,s)=>s!==e))}_pinChanged(e){e.stopPropagation();const t=e.detail.value.parent_pin,s={...this._config};t?s.parent_pin=t:delete s.parent_pin,this._emit(s)}get _rules(){return Array.isArray(this._config.context_rules)?this._config.context_rules:[]}_ruleSchema(){return[{name:"match",selector:{text:{}}},{name:"entity",selector:{entity:{}}},{name:"state",selector:{text:{}}},{name:"effect",selector:{select:{mode:"dropdown",options:Xe.map(e=>({value:e,label:ge(this.hass,`effect_${e}`)}))}}},{name:"label",selector:{text:{}}},{name:"invert",selector:{boolean:{}}}]}_ruleData(e){return{...e,state:Array.isArray(e.state)?e.state.join(", "):e.state??""}}_setRules(e){const t={...this._config};e.length?t.context_rules=e:delete t.context_rules,this._emit(t)}_ruleChanged(e,t){t.stopPropagation();const s={...this._rules[e],...t.detail.value},i=String(s.state??"").split(",").map(e=>e.trim()).filter(Boolean);0===i.length?delete s.state:s.state=1===i.length?i[0]:i,s.match||delete s.match,s.label||delete s.label,s.invert||delete s.invert,this._setRules(this._rules.map((t,i)=>i===e?s:t))}_addRule(){this._setRules([...this._rules,{entity:"",effect:"highlight"}])}_removeRule(e){this._setRules(this._rules.filter((t,s)=>s!==e))}_celebrateSchema(){return[{name:"on",selector:{select:{multiple:!0,mode:"list",options:Qe.map(e=>({value:e,label:ge(this.hass,`on_${e}`)}))}}},{name:"actions",selector:{action:{}}}]}_celebrateData(){const e=this._config.celebrate;return{on:e?.on?Array.isArray(e.on)?e.on:[e.on]:["all_done"],actions:e?.actions??[]}}_celebrateChanged(e){e.stopPropagation();const t=e.detail.value,s=Array.isArray(t.actions)?t.actions:t.actions?[t.actions]:[],i=Array.isArray(t.on)?t.on:[],n={...this._config};if(0===s.length)delete n.celebrate;else{const e={actions:s};!i.length||1===i.length&&"all_done"===i[0]||(e.on=1===i.length?i[0]:i),n.celebrate=e}this._emit(n)}_refs(e){return(Array.isArray(e.lists)?e.lists:e.lists?[e.lists]:[]).filter(Boolean)}_listData(e){return"string"==typeof e?{}:{important:e.important,hide_undated:e.hide_undated,show_within:e.show_within}}_listSettingsChanged(e,t,s){s.stopPropagation();const i=s.detail.value,n={};i.important&&(n.important=!0),i.hide_undated&&(n.hide_undated=!0),"number"!=typeof i.show_within||isNaN(i.show_within)||(n.show_within=i.show_within);const r=this._persons.map((s,i)=>{if(i!==e)return s;const r=this._refs(s).map(e=>("string"==typeof e?e:e.entity)===t?Object.keys(n).length?{entity:t,...n}:t:e);return{...s,lists:1===r.length&&"string"==typeof r[0]?r[0]:r}});this._emit({...this._config,persons:r})}_listName(e){return this.hass.states[e]?.attributes?.friendly_name||e}render(){return this._config&&this.hass?U`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${this._schema()}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${this._settingsChanged}
        ></ha-form>

        ${this._panel("rewards",U`
            <ha-form
              .hass=${this.hass}
              .data=${{parent_pin:this._config.parent_pin??""}}
              .schema=${[{name:"parent_pin",selector:{text:{}}}]}
              .computeLabel=${this._label}
              .computeHelper=${this._helper}
              @value-changed=${this._pinChanged}
            ></ha-form>
            ${this._rewardList.map((e,t)=>U`
                <div class="row">
                  <ha-form
                    .hass=${this.hass}
                    .data=${e}
                    .schema=${et}
                    .computeLabel=${this._label}
                    @value-changed=${e=>this._rewardChanged(t,e)}
                  ></ha-form>
                  ${this._removeButton(()=>this._removeReward(t))}
                </div>
              `)}
            <button class="add" @click=${this._addReward}>${ge(this.hass,"add_reward")}</button>
          `)}
        ${this._panel("rules",U`
            ${this._rules.map((e,t)=>U`
                <div class="row">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this._ruleData(e)}
                    .schema=${this._ruleSchema()}
                    .computeLabel=${this._label}
                    .computeHelper=${this._helper}
                    @value-changed=${e=>this._ruleChanged(t,e)}
                  ></ha-form>
                  ${this._removeButton(()=>this._removeRule(t))}
                </div>
              `)}
            <button class="add" @click=${this._addRule}>${ge(this.hass,"add_rule")}</button>
          `)}
        ${this._panel("celebrate",U`<ha-form
            .hass=${this.hass}
            .data=${this._celebrateData()}
            .schema=${this._celebrateSchema()}
            .computeLabel=${this._label}
            .computeHelper=${this._helper}
            @value-changed=${this._celebrateChanged}
          ></ha-form>`)}

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
          ${0===this._persons.length?U`<div class="empty">${ge(this.hass,"no_persons")}</div>`:W}

          <button class="add" @click=${this._addPerson}>${ge(this.hass,"add_person")}</button>
        </div>
      </div>
    `:W}_panel(e,t){return U`<ha-expansion-panel outlined .header=${Je[e][this._lang]}
      >${t}</ha-expansion-panel
    >`}_removeButton(e){return U`<ha-icon-button
      .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
      title=${ge(this.hass,"remove")}
      @click=${e}
    ></ha-icon-button>`}_personRow(e,t){const s=this._personColor(e,t),i=e.name||e.person||`${ge(this.hass,"person_fallback")} ${t+1}`;return U`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${s}"></span>
          <span class="ptitle">${i}</span>
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

        ${this._refs(e).length?U`<ha-expansion-panel
                outlined
                .header=${Je.list_settings[this._lang]}
                class="lists"
              >
                ${this._refs(e).map(e=>{const s="string"==typeof e?e:e.entity;return U`
                    <div class="list-name">${this._listName(s)}</div>
                    <ha-form
                      .hass=${this.hass}
                      .data=${this._listData(e)}
                      .schema=${tt}
                      .computeLabel=${this._label}
                      .computeHelper=${this._helper}
                      @value-changed=${e=>this._listSettingsChanged(t,s,e)}
                    ></ha-form>
                  `})}
              </ha-expansion-panel>`:W}

        <div class="colors">
          <span class="colors-label">${ge(this.hass,"color")}</span>
          ${We.map(s=>U`
              <button
                class="swatch ${e.color===s?"active":""}"
                style="background:${s}"
                title=${s}
                @click=${()=>this._setPersonColor(t,s)}
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
    `}}nt.styles=o`
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
  `,e([ce({attribute:!1})],nt.prototype,"hass",void 0),e([pe()],nt.prototype,"_config",void 0),customElements.get("family-task-card-editor")||customElements.define("family-task-card-editor",nt);var rt=Object.freeze({__proto__:null,FamilyTaskCardEditor:nt});export{Ke as FamilyTaskCard};

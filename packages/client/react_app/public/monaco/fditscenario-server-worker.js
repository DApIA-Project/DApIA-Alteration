"use strict";(()=>{var Dl=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var si=d(Fp=>{"use strict";Object.defineProperty(Fp,"__esModule",{value:!0});var qp;function Mp(){if(qp===void 0)throw new Error("No runtime abstraction layer installed");return qp}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");qp=r}t.install=e})(Mp||(Mp={}));Fp.default=Mp});var jp=d(Zs=>{"use strict";Object.defineProperty(Zs,"__esModule",{value:!0});Zs.Disposable=void 0;var DL;(function(t){function e(r){return{dispose:r}}t.create=e})(DL=Zs.Disposable||(Zs.Disposable={}))});var Ta=d(va=>{"use strict";Object.defineProperty(va,"__esModule",{value:!0});va.Emitter=va.Event=void 0;var xL=si(),LL;(function(t){let e={dispose(){}};t.None=function(){return e}})(LL=va.Event||(va.Event={}));var Gp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,xL.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},ao=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Gp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=ao._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};va.Emitter=ao;ao._noop=function(){}});var E_=d(xl=>{"use strict";Object.defineProperty(xl,"__esModule",{value:!0});xl.AbstractMessageBuffer=void 0;var qL=13,ML=10,FL=`\r
`,Up=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case qL:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case ML:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(FL);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),m=l.substr(c+1).trim();o.set(f,m)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};xl.AbstractMessageBuffer=Up});var w_=d(Bp=>{"use strict";Object.defineProperty(Bp,"__esModule",{value:!0});var k_=si(),oo=jp(),jL=Ta(),GL=E_(),so=class extends GL.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return so.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};so.emptyBuffer=new Uint8Array(0);var Hp=class{constructor(e){this.socket=e,this._onData=new jL.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,k_.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),oo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),oo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),oo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Kp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),oo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),oo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),oo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},UL=new TextEncoder,N_=Object.freeze({messageBuffer:Object.freeze({create:t=>new so(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(UL.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Hp(t),asWritableStream:t=>new Kp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Wp(){return N_}(function(t){function e(){k_.default.install(N_)}t.install=e})(Wp||(Wp={}));Bp.default=Wp});var uo=d(Xt=>{"use strict";Object.defineProperty(Xt,"__esModule",{value:!0});Xt.stringArray=Xt.array=Xt.func=Xt.error=Xt.number=Xt.string=Xt.boolean=void 0;function HL(t){return t===!0||t===!1}Xt.boolean=HL;function $_(t){return typeof t=="string"||t instanceof String}Xt.string=$_;function KL(t){return typeof t=="number"||t instanceof Number}Xt.number=KL;function WL(t){return t instanceof Error}Xt.error=WL;function BL(t){return typeof t=="function"}Xt.func=BL;function O_(t){return Array.isArray(t)}Xt.array=O_;function VL(t){return O_(t)&&t.every(e=>$_(e))}Xt.stringArray=VL});var mh=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.Message=J.NotificationType9=J.NotificationType8=J.NotificationType7=J.NotificationType6=J.NotificationType5=J.NotificationType4=J.NotificationType3=J.NotificationType2=J.NotificationType1=J.NotificationType0=J.NotificationType=J.RequestType9=J.RequestType8=J.RequestType7=J.RequestType6=J.RequestType5=J.RequestType4=J.RequestType3=J.RequestType2=J.RequestType1=J.RequestType=J.RequestType0=J.AbstractMessageSignature=J.ParameterStructures=J.ResponseError=J.ErrorCodes=void 0;var _a=uo(),I_;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(I_=J.ErrorCodes||(J.ErrorCodes={}));var eu=class extends Error{constructor(e,r,n){super(r),this.code=_a.number(e)?e:I_.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,eu.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};J.ResponseError=eu;var Ot=class{constructor(e){this.kind=e}static is(e){return e===Ot.auto||e===Ot.byName||e===Ot.byPosition}toString(){return this.kind}};J.ParameterStructures=Ot;Ot.auto=new Ot("auto");Ot.byPosition=new Ot("byPosition");Ot.byName=new Ot("byName");var Be=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Ot.auto}};J.AbstractMessageSignature=Be;var Vp=class extends Be{constructor(e){super(e,0)}};J.RequestType0=Vp;var zp=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType=zp;var Yp=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType1=Yp;var Xp=class extends Be{constructor(e){super(e,2)}};J.RequestType2=Xp;var Jp=class extends Be{constructor(e){super(e,3)}};J.RequestType3=Jp;var Qp=class extends Be{constructor(e){super(e,4)}};J.RequestType4=Qp;var Zp=class extends Be{constructor(e){super(e,5)}};J.RequestType5=Zp;var eh=class extends Be{constructor(e){super(e,6)}};J.RequestType6=eh;var th=class extends Be{constructor(e){super(e,7)}};J.RequestType7=th;var rh=class extends Be{constructor(e){super(e,8)}};J.RequestType8=rh;var nh=class extends Be{constructor(e){super(e,9)}};J.RequestType9=nh;var ih=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType=ih;var ah=class extends Be{constructor(e){super(e,0)}};J.NotificationType0=ah;var oh=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType1=oh;var sh=class extends Be{constructor(e){super(e,2)}};J.NotificationType2=sh;var uh=class extends Be{constructor(e){super(e,3)}};J.NotificationType3=uh;var lh=class extends Be{constructor(e){super(e,4)}};J.NotificationType4=lh;var ch=class extends Be{constructor(e){super(e,5)}};J.NotificationType5=ch;var fh=class extends Be{constructor(e){super(e,6)}};J.NotificationType6=fh;var dh=class extends Be{constructor(e){super(e,7)}};J.NotificationType7=dh;var ph=class extends Be{constructor(e){super(e,8)}};J.NotificationType8=ph;var hh=class extends Be{constructor(e){super(e,9)}};J.NotificationType9=hh;var zL;(function(t){function e(i){let a=i;return a&&_a.string(a.method)&&(_a.string(a.id)||_a.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&_a.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(_a.string(a.id)||_a.number(a.id)||a.id===null)}t.isResponse=n})(zL=J.Message||(J.Message={}))});var gh=d(ui=>{"use strict";var D_;Object.defineProperty(ui,"__esModule",{value:!0});ui.LRUCache=ui.LinkedMap=ui.Touch=void 0;var ar;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(ar=ui.Touch||(ui.Touch={}));var Ll=class{constructor(){this[D_]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=ar.None){let n=this._map.get(e);if(n)return r!==ar.None&&this.touch(n,r),n.value}set(e,r,n=ar.None){let i=this._map.get(e);if(i)i.value=r,n!==ar.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case ar.None:this.addItemLast(i);break;case ar.First:this.addItemFirst(i);break;case ar.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(D_=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==ar.First&&r!==ar.Last)){if(r===ar.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===ar.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};ui.LinkedMap=Ll;var yh=class extends Ll{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=ar.AsNew){return super.get(e,r)}peek(e){return super.get(e,ar.None)}set(e,r){return super.set(e,r,ar.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};ui.LRUCache=yh});var Rh=d(Ra=>{"use strict";Object.defineProperty(Ra,"__esModule",{value:!0});Ra.CancellationTokenSource=Ra.CancellationToken=void 0;var YL=si(),XL=uo(),vh=Ta(),Th;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:vh.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:vh.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||XL.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Th=Ra.CancellationToken||(Ra.CancellationToken={}));var JL=Object.freeze(function(t,e){let r=(0,YL.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),ql=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?JL:(this._emitter||(this._emitter=new vh.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},_h=class{get token(){return this._token||(this._token=new ql),this._token}cancel(){this._token?this._token.cancel():this._token=Th.Cancelled}dispose(){this._token?this._token instanceof ql&&this._token.dispose():this._token=Th.None}};Ra.CancellationTokenSource=_h});var x_=d(li=>{"use strict";Object.defineProperty(li,"__esModule",{value:!0});li.ReadableStreamMessageReader=li.AbstractMessageReader=li.MessageReader=void 0;var Sh=si(),lo=uo(),Ah=Ta(),QL;(function(t){function e(r){let n=r;return n&&lo.func(n.listen)&&lo.func(n.dispose)&&lo.func(n.onError)&&lo.func(n.onClose)&&lo.func(n.onPartialMessage)}t.is=e})(QL=li.MessageReader||(li.MessageReader={}));var Ml=class{constructor(){this.errorEmitter=new Ah.Emitter,this.closeEmitter=new Ah.Emitter,this.partialMessageEmitter=new Ah.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${lo.string(e.message)?e.message:"unknown"}`)}};li.AbstractMessageReader=Ml;var bh;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,Sh.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(bh||(bh={}));var Ch=class extends Ml{constructor(e,r){super(),this.readable=e,this.options=bh.fromOptions(r),this.buffer=(0,Sh.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Sh.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};li.ReadableStreamMessageReader=Ch});var L_=d(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.Semaphore=void 0;var ZL=si(),Ph=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,ZL.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Fl.Semaphore=Ph});var j_=d(ci=>{"use strict";Object.defineProperty(ci,"__esModule",{value:!0});ci.WriteableStreamMessageWriter=ci.AbstractMessageWriter=ci.MessageWriter=void 0;var q_=si(),tu=uo(),eq=L_(),M_=Ta(),tq="Content-Length: ",F_=`\r
`,rq;(function(t){function e(r){let n=r;return n&&tu.func(n.dispose)&&tu.func(n.onClose)&&tu.func(n.onError)&&tu.func(n.write)}t.is=e})(rq=ci.MessageWriter||(ci.MessageWriter={}));var jl=class{constructor(){this.errorEmitter=new M_.Emitter,this.closeEmitter=new M_.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${tu.string(e.message)?e.message:"unknown"}`)}};ci.AbstractMessageWriter=jl;var Eh;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,q_.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,q_.default)().applicationJson.encoder}}t.fromOptions=e})(Eh||(Eh={}));var kh=class extends jl{constructor(e,r){super(),this.writable=e,this.options=Eh.fromOptions(r),this.errorCount=0,this.writeSemaphore=new eq.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(tq,n.byteLength.toString(),F_),i.push(F_),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};ci.WriteableStreamMessageWriter=kh});var B_=d(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.createMessageConnection=te.ConnectionOptions=te.CancellationStrategy=te.CancellationSenderStrategy=te.CancellationReceiverStrategy=te.ConnectionStrategy=te.ConnectionError=te.ConnectionErrors=te.LogTraceNotification=te.SetTraceNotification=te.TraceFormat=te.TraceValues=te.Trace=te.NullLogger=te.ProgressType=te.ProgressToken=void 0;var G_=si(),Pt=uo(),ne=mh(),U_=gh(),ru=Ta(),Nh=Rh(),iu;(function(t){t.type=new ne.NotificationType("$/cancelRequest")})(iu||(iu={}));var H_;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(H_=te.ProgressToken||(te.ProgressToken={}));var nu;(function(t){t.type=new ne.NotificationType("$/progress")})(nu||(nu={}));var wh=class{constructor(){}};te.ProgressType=wh;var $h;(function(t){function e(r){return Pt.func(r)}t.is=e})($h||($h={}));te.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var we;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(we=te.Trace||(te.Trace={}));var nq;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(nq=te.TraceValues||(te.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(we=te.Trace||(te.Trace={}));var an;(function(t){t.Text="text",t.JSON="json"})(an=te.TraceFormat||(te.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(an=te.TraceFormat||(te.TraceFormat={}));var K_;(function(t){t.type=new ne.NotificationType("$/setTrace")})(K_=te.SetTraceNotification||(te.SetTraceNotification={}));var Oh;(function(t){t.type=new ne.NotificationType("$/logTrace")})(Oh=te.LogTraceNotification||(te.LogTraceNotification={}));var Gl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Gl=te.ConnectionErrors||(te.ConnectionErrors={}));var xi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,xi.prototype)}};te.ConnectionError=xi;var W_;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(W_=te.ConnectionStrategy||(te.ConnectionStrategy={}));var Ih;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Nh.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(Ih=te.CancellationReceiverStrategy||(te.CancellationReceiverStrategy={}));var Dh;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(iu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(Dh=te.CancellationSenderStrategy||(te.CancellationSenderStrategy={}));var xh;(function(t){t.Message=Object.freeze({receiver:Ih.Message,sender:Dh.Message});function e(r){let n=r;return n&&Ih.is(n.receiver)&&Dh.is(n.sender)}t.is=e})(xh=te.CancellationStrategy||(te.CancellationStrategy={}));var iq;(function(t){function e(r){let n=r;return n&&(xh.is(n.cancellationStrategy)||W_.is(n.connectionStrategy))}t.is=e})(iq=te.ConnectionOptions||(te.ConnectionOptions={}));var on;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(on||(on={}));function aq(t,e,r,n){let i=r!==void 0?r:te.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,m=new Map,v=new Map,y,R=new U_.LinkedMap,P=new Map,E=new Set,b=new Map,S=we.Off,O=an.Text,F,W=on.New,re=new ru.Emitter,Ne=new ru.Emitter,V=new ru.Emitter,Ae=new ru.Emitter,Ye=new ru.Emitter,We=n&&n.cancellationStrategy?n.cancellationStrategy:xh.Message;function q(C){if(C===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+C.toString()}function L(C){return C===null?"res-unknown-"+(++s).toString():"res-"+C.toString()}function j(){return"not-"+(++o).toString()}function B(C,x){ne.Message.isRequest(x)?C.set(q(x.id),x):ne.Message.isResponse(x)?C.set(L(x.id),x):C.set(j(),x)}function oe(C){}function se(){return W===on.Listening}function ee(){return W===on.Closed}function st(){return W===on.Disposed}function Xe(){(W===on.New||W===on.Listening)&&(W=on.Closed,Ne.fire(void 0))}function Ct(C){re.fire([C,void 0,void 0])}function Qr(C){re.fire(C)}t.onClose(Xe),t.onError(Ct),e.onClose(Xe),e.onError(Qr);function Ar(){y||R.size===0||(y=(0,G_.default)().timer.setImmediate(()=>{y=void 0,Qa()}))}function Qa(){if(R.size===0)return;let C=R.shift();try{ne.Message.isRequest(C)?Za(C):ne.Message.isNotification(C)?to(C):ne.Message.isResponse(C)?eo(C):Js(C)}finally{Ar()}}let ir=C=>{try{if(ne.Message.isNotification(C)&&C.method===iu.type.method){let x=C.params.id,G=q(x),z=R.get(G);if(ne.Message.isRequest(z)){let Le=n?.connectionStrategy,Je=Le&&Le.cancelUndispatched?Le.cancelUndispatched(z,oe):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){R.delete(G),b.delete(x),Je.id=z.id,bn(Je,C.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let xe=b.get(x);if(xe!==void 0){xe.cancel(),Cn(C);return}else E.add(x)}B(R,C)}finally{Ar()}};function Za(C){if(st())return;function x(ye,je,_e){let ft={jsonrpc:u,id:C.id};ye instanceof ne.ResponseError?ft.error=ye.toJson():ft.result=ye===void 0?null:ye,bn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function G(ye,je,_e){let ft={jsonrpc:u,id:C.id,error:ye.toJson()};bn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function z(ye,je,_e){ye===void 0&&(ye=null);let ft={jsonrpc:u,id:C.id,result:ye};bn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}ya(C);let xe=c.get(C.method),Le,Je;xe&&(Le=xe.type,Je=xe.handler);let pt=Date.now();if(Je||l){let ye=C.id??String(Date.now()),je=We.receiver.createCancellationTokenSource(ye);C.id!==null&&E.has(C.id)&&je.cancel(),C.id!==null&&b.set(ye,je);try{let _e;if(Je)if(C.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines ${Le.numberOfParams} params but received none.`),C.method,pt);return}_e=Je(je.token)}else if(Array.isArray(C.params)){if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byName){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by name but received parameters by position`),C.method,pt);return}_e=Je(...C.params,je.token)}else{if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byPosition){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by position but received parameters by name`),C.method,pt);return}_e=Je(C.params,je.token)}else l&&(_e=l(C.method,C.params,je.token));let ft=_e;_e?ft.then?ft.then(Yt=>{b.delete(ye),x(Yt,C.method,pt)},Yt=>{b.delete(ye),Yt instanceof ne.ResponseError?G(Yt,C.method,pt):Yt&&Pt.string(Yt.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${Yt.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}):(b.delete(ye),x(_e,C.method,pt)):(b.delete(ye),z(_e,C.method,pt))}catch(_e){b.delete(ye),_e instanceof ne.ResponseError?x(_e,C.method,pt):_e&&Pt.string(_e.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${_e.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}}else G(new ne.ResponseError(ne.ErrorCodes.MethodNotFound,`Unhandled method ${C.method}`),C.method,pt)}function eo(C){if(!st())if(C.id===null)C.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(C.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=C.id,G=P.get(x);if(ga(C,G),G!==void 0){P.delete(x);try{if(C.error){let z=C.error;G.reject(new ne.ResponseError(z.code,z.message,z.data))}else if(C.result!==void 0)G.resolve(C.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function to(C){if(st())return;let x,G;if(C.method===iu.type.method){let z=C.params.id;E.delete(z),Cn(C);return}else{let z=m.get(C.method);z&&(G=z.handler,x=z.type)}if(G||f)try{if(Cn(C),G)if(C.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(C.params)){let z=C.params;C.method===nu.type.method&&z.length===2&&H_.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines parameters by name but received parameters by position`),x.numberOfParams!==C.params.length&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===ne.ParameterStructures.byPosition&&i.error(`Notification ${C.method} defines parameters by position but received parameters by name`),G(C.params);else f&&f(C.method,C.params)}catch(z){z.message?i.error(`Notification handler '${C.method}' failed with message: ${z.message}`):i.error(`Notification handler '${C.method}' failed unexpectedly.`)}else V.fire(C)}function Js(C){if(!C){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(C,null,4)}`);let x=C;if(Pt.string(x.id)||Pt.number(x.id)){let G=x.id,z=P.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function ct(C){if(C!=null)switch(S){case we.Verbose:return JSON.stringify(C,null,4);case we.Compact:return JSON.stringify(C);default:return}}function ii(C){if(!(S===we.Off||!F))if(O===an.Text){let x;(S===we.Verbose||S===we.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Sending request '${C.method} - (${C.id})'.`,x)}else Ir("send-request",C)}function Qs(C){if(!(S===we.Off||!F))if(O===an.Text){let x;(S===we.Verbose||S===we.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${C.method}'.`,x)}else Ir("send-notification",C)}function bn(C,x,G){if(!(S===we.Off||!F))if(O===an.Text){let z;(S===we.Verbose||S===we.Compact)&&(C.error&&C.error.data?z=`Error data: ${ct(C.error.data)}

`:C.result?z=`Result: ${ct(C.result)}

`:C.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${C.id})'. Processing request took ${Date.now()-G}ms`,z)}else Ir("send-response",C)}function ya(C){if(!(S===we.Off||!F))if(O===an.Text){let x;(S===we.Verbose||S===we.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Received request '${C.method} - (${C.id})'.`,x)}else Ir("receive-request",C)}function Cn(C){if(!(S===we.Off||!F||C.method===Oh.type.method))if(O===an.Text){let x;(S===we.Verbose||S===we.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${C.method}'.`,x)}else Ir("receive-notification",C)}function ga(C,x){if(!(S===we.Off||!F))if(O===an.Text){let G;if((S===we.Verbose||S===we.Compact)&&(C.error&&C.error.data?G=`Error data: ${ct(C.error.data)}

`:C.result?G=`Result: ${ct(C.result)}

`:C.error===void 0&&(G=`No result returned.

`)),x){let z=C.error?` Request failed: ${C.error.message} (${C.error.code}).`:"";F.log(`Received response '${x.method} - (${C.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${C.id} without active response promise.`,G)}else Ir("receive-response",C)}function Ir(C,x){if(!F||S===we.Off)return;let G={isLSPMessage:!0,type:C,message:x,timestamp:Date.now()};F.log(G)}function Zr(){if(ee())throw new xi(Gl.Closed,"Connection is closed.");if(st())throw new xi(Gl.Disposed,"Connection is disposed.")}function ro(){if(se())throw new xi(Gl.AlreadyListening,"Connection is already listening")}function no(){if(!se())throw new Error("Call listen() first.")}function Sr(C){return C===void 0?null:C}function Pn(C){if(C!==null)return C}function $t(C){return C!=null&&!Array.isArray(C)&&typeof C=="object"}function en(C,x){switch(C){case ne.ParameterStructures.auto:return $t(x)?Pn(x):[Sr(x)];case ne.ParameterStructures.byName:if(!$t(x))throw new Error("Received parameters by name but param is not an object literal.");return Pn(x);case ne.ParameterStructures.byPosition:return[Sr(x)];default:throw new Error(`Unknown parameter structure ${C.toString()}`)}}function tn(C,x){let G,z=C.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=en(C.parameterStructures,x[0]);break;default:G=[];for(let xe=0;xe<x.length&&xe<z;xe++)G.push(Sr(x[xe]));if(x.length<z)for(let xe=x.length;xe<z;xe++)G.push(null);break}return G}let En={sendNotification:(C,...x)=>{Zr();let G,z;if(Pt.string(C)){G=C;let Le=x[0],Je=0,pt=ne.ParameterStructures.auto;ne.ParameterStructures.is(Le)&&(Je=1,pt=Le);let ye=x.length,je=ye-Je;switch(je){case 0:z=void 0;break;case 1:z=en(pt,x[Je]);break;default:if(pt===ne.ParameterStructures.byName)throw new Error(`Received ${je} parameters for 'by Name' notification parameter structure.`);z=x.slice(Je,ye).map(_e=>Sr(_e));break}}else{let Le=x;G=C.method,z=tn(C,Le)}let xe={jsonrpc:u,method:G,params:z};return Qs(xe),e.write(xe).catch(()=>i.error("Sending notification failed."))},onNotification:(C,x)=>{Zr();let G;return Pt.func(C)?f=C:x&&(Pt.string(C)?(G=C,m.set(C,{type:void 0,handler:x})):(G=C.method,m.set(C.method,{type:C,handler:x}))),{dispose:()=>{G!==void 0?m.delete(G):f=void 0}}},onProgress:(C,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(C,x,G)=>En.sendNotification(nu.type,{token:x,value:G}),onUnhandledProgress:Ae.event,sendRequest:(C,...x)=>{Zr(),no();let G,z,xe;if(Pt.string(C)){G=C;let ye=x[0],je=x[x.length-1],_e=0,ft=ne.ParameterStructures.auto;ne.ParameterStructures.is(ye)&&(_e=1,ft=ye);let Yt=x.length;Nh.CancellationToken.is(je)&&(Yt=Yt-1,xe=je);let ai=Yt-_e;switch(ai){case 0:z=void 0;break;case 1:z=en(ft,x[_e]);break;default:if(ft===ne.ParameterStructures.byName)throw new Error(`Received ${ai} parameters for 'by Name' request parameter structure.`);z=x.slice(_e,Yt).map(kn=>Sr(kn));break}}else{let ye=x;G=C.method,z=tn(C,ye);let je=C.numberOfParams;xe=Nh.CancellationToken.is(ye[je])?ye[je]:void 0}let Le=a++,Je;return xe&&(Je=xe.onCancellationRequested(()=>{let ye=We.sender.sendCancellation(En,Le);return ye===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):ye.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((ye,je)=>{let _e={jsonrpc:u,id:Le,method:G,params:z},ft=kn=>{ye(kn),We.sender.cleanup(Le),Je?.dispose()},Yt=kn=>{je(kn),We.sender.cleanup(Le),Je?.dispose()},ai={method:G,timerStart:Date.now(),resolve:ft,reject:Yt};ii(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch(kn){ai.reject(new ne.ResponseError(ne.ErrorCodes.MessageWriteError,kn.message?kn.message:"Unknown reason")),ai=null}ai&&P.set(Le,ai)})},onRequest:(C,x)=>{Zr();let G=null;return $h.is(C)?(G=void 0,l=C):Pt.string(C)?(G=null,x!==void 0&&(G=C,c.set(C,{handler:x,type:void 0}))):x!==void 0&&(G=C.method,c.set(C.method,{type:C,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>P.size>0,trace:async(C,x,G)=>{let z=!1,xe=an.Text;G!==void 0&&(Pt.boolean(G)?z=G:(z=G.sendNotification||!1,xe=G.traceFormat||an.Text)),S=C,O=xe,S===we.Off?F=void 0:F=x,z&&!ee()&&!st()&&await En.sendNotification(K_.type,{value:we.toString(C)})},onError:re.event,onClose:Ne.event,onUnhandledNotification:V.event,onDispose:Ye.event,end:()=>{e.end()},dispose:()=>{if(st())return;W=on.Disposed,Ye.fire(void 0);let C=new ne.ResponseError(ne.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of P.values())x.reject(C);P=new Map,b=new Map,E=new Set,R=new U_.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{Zr(),ro(),W=on.Listening,t.listen(ir)},inspect:()=>{(0,G_.default)().console.log("inspect")}};return En.onNotification(Oh.type,C=>{if(S===we.Off||!F)return;let x=S===we.Verbose||S===we.Compact;F.log(C.message,x?C.verbose:void 0)}),En.onNotification(nu.type,C=>{let x=v.get(C.token);x?x(C.value):Ae.fire(C)}),En}te.createMessageConnection=aq});var Fh=d(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var Ue=mh();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return Ue.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return Ue.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return Ue.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return Ue.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return Ue.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return Ue.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return Ue.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return Ue.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return Ue.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return Ue.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return Ue.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return Ue.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return Ue.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return Ue.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return Ue.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return Ue.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return Ue.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return Ue.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return Ue.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return Ue.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return Ue.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return Ue.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return Ue.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return Ue.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return Ue.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return Ue.ParameterStructures}});var Lh=gh();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return Lh.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return Lh.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return Lh.Touch}});var oq=jp();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return oq.Disposable}});var V_=Ta();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return V_.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return V_.Emitter}});var z_=Rh();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return z_.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return z_.CancellationToken}});var qh=x_();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return qh.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return qh.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return qh.ReadableStreamMessageReader}});var Mh=j_();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return Mh.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return Mh.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Mh.WriteableStreamMessageWriter}});var Jt=B_();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return Jt.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return Jt.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return Jt.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return Jt.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return Jt.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return Jt.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return Jt.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return Jt.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return Jt.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return Jt.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return Jt.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return Jt.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return Jt.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return Jt.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return Jt.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return Jt.CancellationStrategy}});var sq=si();I.RAL=sq.default});var fi=d(br=>{"use strict";var uq=br&&br.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),lq=br&&br.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&uq(e,t,r)};Object.defineProperty(br,"__esModule",{value:!0});br.createMessageConnection=br.BrowserMessageWriter=br.BrowserMessageReader=void 0;var cq=w_();cq.default.install();var co=Fh();lq(Fh(),br);var jh=class extends co.AbstractMessageReader{constructor(e){super(),this._onData=new co.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};br.BrowserMessageReader=jh;var Gh=class extends co.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};br.BrowserMessageWriter=Gh;function fq(t,e,r,n){return r===void 0&&(r=co.NullLogger),co.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,co.createMessageConnection)(t,e,r,n)}br.createMessageConnection=fq});var Uh=d((bce,Y_)=>{"use strict";Y_.exports=fi()});var fo=d((X_,Ul)=>{(function(t){if(typeof Ul=="object"&&typeof Ul.exports=="object"){var e=t(Dl,X_);e!==void 0&&(Ul.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(N){return typeof N=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(N){return typeof N=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(_,h){return _===Number.MAX_VALUE&&(_=a.MAX_VALUE),h===Number.MAX_VALUE&&(h=a.MAX_VALUE),{line:_,character:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.uinteger(h.line)&&w.uinteger(h.character)}g.is=N})(o=e.Position||(e.Position={}));var s;(function(g){function k(_,h,$,D){if(w.uinteger(_)&&w.uinteger(h)&&w.uinteger($)&&w.uinteger(D))return{start:o.create(_,h),end:o.create($,D)};if(o.is(_)&&o.is(h))return{start:_,end:h};throw new Error("Range#create called with invalid arguments[".concat(_,", ").concat(h,", ").concat($,", ").concat(D,"]"))}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&o.is(h.start)&&o.is(h.end)}g.is=N})(s=e.Range||(e.Range={}));var u;(function(g){function k(_,h){return{uri:_,range:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&(w.string(h.uri)||w.undefined(h.uri))}g.is=N})(u=e.Location||(e.Location={}));var l;(function(g){function k(_,h,$,D){return{targetUri:_,targetRange:h,targetSelectionRange:$,originSelectionRange:D}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.targetRange)&&w.string(h.targetUri)&&s.is(h.targetSelectionRange)&&(s.is(h.originSelectionRange)||w.undefined(h.originSelectionRange))}g.is=N})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(_,h,$,D){return{red:_,green:h,blue:$,alpha:D}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.numberRange(h.red,0,1)&&w.numberRange(h.green,0,1)&&w.numberRange(h.blue,0,1)&&w.numberRange(h.alpha,0,1)}g.is=N})(c=e.Color||(e.Color={}));var f;(function(g){function k(_,h){return{range:_,color:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&c.is(h.color)}g.is=N})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(g){function k(_,h,$){return{label:_,textEdit:h,additionalTextEdits:$}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.string(h.label)&&(w.undefined(h.textEdit)||F.is(h))&&(w.undefined(h.additionalTextEdits)||w.typedArray(h.additionalTextEdits,F.is))}g.is=N})(m=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function k(_,h,$,D,ae,ut){var Ge={startLine:_,endLine:h};return w.defined($)&&(Ge.startCharacter=$),w.defined(D)&&(Ge.endCharacter=D),w.defined(ae)&&(Ge.kind=ae),w.defined(ut)&&(Ge.collapsedText=ut),Ge}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.uinteger(h.startLine)&&w.uinteger(h.startLine)&&(w.undefined(h.startCharacter)||w.uinteger(h.startCharacter))&&(w.undefined(h.endCharacter)||w.uinteger(h.endCharacter))&&(w.undefined(h.kind)||w.string(h.kind))}g.is=N})(y=e.FoldingRange||(e.FoldingRange={}));var R;(function(g){function k(_,h){return{location:_,message:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&u.is(h.location)&&w.string(h.message)}g.is=N})(R=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var P;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(P=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var E;(function(g){g.Unnecessary=1,g.Deprecated=2})(E=e.DiagnosticTag||(e.DiagnosticTag={}));var b;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&w.string(_.href)}g.is=k})(b=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function k(_,h,$,D,ae,ut){var Ge={range:_,message:h};return w.defined($)&&(Ge.severity=$),w.defined(D)&&(Ge.code=D),w.defined(ae)&&(Ge.source=ae),w.defined(ut)&&(Ge.relatedInformation=ut),Ge}g.create=k;function N(_){var h,$=_;return w.defined($)&&s.is($.range)&&w.string($.message)&&(w.number($.severity)||w.undefined($.severity))&&(w.integer($.code)||w.string($.code)||w.undefined($.code))&&(w.undefined($.codeDescription)||w.string((h=$.codeDescription)===null||h===void 0?void 0:h.href))&&(w.string($.source)||w.undefined($.source))&&(w.undefined($.relatedInformation)||w.typedArray($.relatedInformation,R.is))}g.is=N})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function k(_,h){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ae={title:_,command:h};return w.defined($)&&$.length>0&&(ae.arguments=$),ae}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.title)&&w.string(h.command)}g.is=N})(O=e.Command||(e.Command={}));var F;(function(g){function k($,D){return{range:$,newText:D}}g.replace=k;function N($,D){return{range:{start:$,end:$},newText:D}}g.insert=N;function _($){return{range:$,newText:""}}g.del=_;function h($){var D=$;return w.objectLiteral(D)&&w.string(D.newText)&&s.is(D.range)}g.is=h})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function k(_,h,$){var D={label:_};return h!==void 0&&(D.needsConfirmation=h),$!==void 0&&(D.description=$),D}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.string(h.label)&&(w.boolean(h.needsConfirmation)||h.needsConfirmation===void 0)&&(w.string(h.description)||h.description===void 0)}g.is=N})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var re;(function(g){function k(N){var _=N;return w.string(_)}g.is=k})(re=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ne;(function(g){function k($,D,ae){return{range:$,newText:D,annotationId:ae}}g.replace=k;function N($,D,ae){return{range:{start:$,end:$},newText:D,annotationId:ae}}g.insert=N;function _($,D){return{range:$,newText:"",annotationId:D}}g.del=_;function h($){var D=$;return F.is(D)&&(W.is(D.annotationId)||re.is(D.annotationId))}g.is=h})(Ne=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var V;(function(g){function k(_,h){return{textDocument:_,edits:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&ee.is(h.textDocument)&&Array.isArray(h.edits)}g.is=N})(V=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Ae;(function(g){function k(_,h,$){var D={kind:"create",uri:_};return h!==void 0&&(h.overwrite!==void 0||h.ignoreIfExists!==void 0)&&(D.options=h),$!==void 0&&(D.annotationId=$),D}g.create=k;function N(_){var h=_;return h&&h.kind==="create"&&w.string(h.uri)&&(h.options===void 0||(h.options.overwrite===void 0||w.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||w.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(Ae=e.CreateFile||(e.CreateFile={}));var Ye;(function(g){function k(_,h,$,D){var ae={kind:"rename",oldUri:_,newUri:h};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ae.options=$),D!==void 0&&(ae.annotationId=D),ae}g.create=k;function N(_){var h=_;return h&&h.kind==="rename"&&w.string(h.oldUri)&&w.string(h.newUri)&&(h.options===void 0||(h.options.overwrite===void 0||w.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||w.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(Ye=e.RenameFile||(e.RenameFile={}));var We;(function(g){function k(_,h,$){var D={kind:"delete",uri:_};return h!==void 0&&(h.recursive!==void 0||h.ignoreIfNotExists!==void 0)&&(D.options=h),$!==void 0&&(D.annotationId=$),D}g.create=k;function N(_){var h=_;return h&&h.kind==="delete"&&w.string(h.uri)&&(h.options===void 0||(h.options.recursive===void 0||w.boolean(h.options.recursive))&&(h.options.ignoreIfNotExists===void 0||w.boolean(h.options.ignoreIfNotExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(We=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function k(N){var _=N;return _&&(_.changes!==void 0||_.documentChanges!==void 0)&&(_.documentChanges===void 0||_.documentChanges.every(function(h){return w.string(h.kind)?Ae.is(h)||Ye.is(h)||We.is(h):V.is(h)}))}g.is=k})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(k,N){this.edits=k,this.changeAnnotations=N}return g.prototype.insert=function(k,N,_){var h,$;if(_===void 0?h=F.insert(k,N):re.is(_)?($=_,h=Ne.insert(k,N,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),h=Ne.insert(k,N,$)),this.edits.push(h),$!==void 0)return $},g.prototype.replace=function(k,N,_){var h,$;if(_===void 0?h=F.replace(k,N):re.is(_)?($=_,h=Ne.replace(k,N,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),h=Ne.replace(k,N,$)),this.edits.push(h),$!==void 0)return $},g.prototype.delete=function(k,N){var _,h;if(N===void 0?_=F.del(k):re.is(N)?(h=N,_=Ne.del(k,N)):(this.assertChangeAnnotations(this.changeAnnotations),h=this.changeAnnotations.manage(N),_=Ne.del(k,h)),this.edits.push(_),h!==void 0)return h},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,N){var _;if(re.is(k)?_=k:(_=this.nextId(),N=k),this._annotations[_]!==void 0)throw new Error("Id ".concat(_," is already in use."));if(N===void 0)throw new Error("No annotation provided for id ".concat(_));return this._annotations[_]=N,this._size++,_},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(k){var N=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new j(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(_){if(V.is(_)){var h=new L(_.edits,N._changeAnnotations);N._textEditChanges[_.textDocument.uri]=h}})):k.changes&&Object.keys(k.changes).forEach(function(_){var h=new L(k.changes[_]);N._textEditChanges[_]=h})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(ee.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var N={uri:k.uri,version:k.version},_=this._textEditChanges[N.uri];if(!_){var h=[],$={textDocument:N,edits:h};this._workspaceEdit.documentChanges.push($),_=new L(h,this._changeAnnotations),this._textEditChanges[N.uri]=_}return _}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var _=this._textEditChanges[k];if(!_){var h=[];this._workspaceEdit.changes[k]=h,_=new L(h),this._textEditChanges[k]=_}return _}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,N,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||re.is(N)?h=N:_=N;var $,D;if(h===void 0?$=Ae.create(k,_):(D=re.is(h)?h:this._changeAnnotations.manage(h),$=Ae.create(k,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(k,N,_,h){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(_)||re.is(_)?$=_:h=_;var D,ae;if($===void 0?D=Ye.create(k,N,h):(ae=re.is($)?$:this._changeAnnotations.manage($),D=Ye.create(k,N,h,ae)),this._workspaceEdit.documentChanges.push(D),ae!==void 0)return ae},g.prototype.deleteFile=function(k,N,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||re.is(N)?h=N:_=N;var $,D;if(h===void 0?$=We.create(k,_):(D=re.is(h)?h:this._changeAnnotations.manage(h),$=We.create(k,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var oe;(function(g){function k(_){return{uri:_}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)}g.is=N})(oe=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var se;(function(g){function k(_,h){return{uri:_,version:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&w.integer(h.version)}g.is=N})(se=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ee;(function(g){function k(_,h){return{uri:_,version:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&(h.version===null||w.integer(h.version))}g.is=N})(ee=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var st;(function(g){function k(_,h,$,D){return{uri:_,languageId:h,version:$,text:D}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&w.string(h.languageId)&&w.integer(h.version)&&w.string(h.text)}g.is=N})(st=e.TextDocumentItem||(e.TextDocumentItem={}));var Xe;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(N){var _=N;return _===g.PlainText||_===g.Markdown}g.is=k})(Xe=e.MarkupKind||(e.MarkupKind={}));var Ct;(function(g){function k(N){var _=N;return w.objectLiteral(N)&&Xe.is(_.kind)&&w.string(_.value)}g.is=k})(Ct=e.MarkupContent||(e.MarkupContent={}));var Qr;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(Qr=e.CompletionItemKind||(e.CompletionItemKind={}));var Ar;(function(g){g.PlainText=1,g.Snippet=2})(Ar=e.InsertTextFormat||(e.InsertTextFormat={}));var Qa;(function(g){g.Deprecated=1})(Qa=e.CompletionItemTag||(e.CompletionItemTag={}));var ir;(function(g){function k(_,h,$){return{newText:_,insert:h,replace:$}}g.create=k;function N(_){var h=_;return h&&w.string(h.newText)&&s.is(h.insert)&&s.is(h.replace)}g.is=N})(ir=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var Za;(function(g){g.asIs=1,g.adjustIndentation=2})(Za=e.InsertTextMode||(e.InsertTextMode={}));var eo;(function(g){function k(N){var _=N;return _&&(w.string(_.detail)||_.detail===void 0)&&(w.string(_.description)||_.description===void 0)}g.is=k})(eo=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var to;(function(g){function k(N){return{label:N}}g.create=k})(to=e.CompletionItem||(e.CompletionItem={}));var Js;(function(g){function k(N,_){return{items:N||[],isIncomplete:!!_}}g.create=k})(Js=e.CompletionList||(e.CompletionList={}));var ct;(function(g){function k(_){return _.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function N(_){var h=_;return w.string(h)||w.objectLiteral(h)&&w.string(h.language)&&w.string(h.value)}g.is=N})(ct=e.MarkedString||(e.MarkedString={}));var ii;(function(g){function k(N){var _=N;return!!_&&w.objectLiteral(_)&&(Ct.is(_.contents)||ct.is(_.contents)||w.typedArray(_.contents,ct.is))&&(N.range===void 0||s.is(N.range))}g.is=k})(ii=e.Hover||(e.Hover={}));var Qs;(function(g){function k(N,_){return _?{label:N,documentation:_}:{label:N}}g.create=k})(Qs=e.ParameterInformation||(e.ParameterInformation={}));var bn;(function(g){function k(N,_){for(var h=[],$=2;$<arguments.length;$++)h[$-2]=arguments[$];var D={label:N};return w.defined(_)&&(D.documentation=_),w.defined(h)?D.parameters=h:D.parameters=[],D}g.create=k})(bn=e.SignatureInformation||(e.SignatureInformation={}));var ya;(function(g){g.Text=1,g.Read=2,g.Write=3})(ya=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Cn;(function(g){function k(N,_){var h={range:N};return w.number(_)&&(h.kind=_),h}g.create=k})(Cn=e.DocumentHighlight||(e.DocumentHighlight={}));var ga;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(ga=e.SymbolKind||(e.SymbolKind={}));var Ir;(function(g){g.Deprecated=1})(Ir=e.SymbolTag||(e.SymbolTag={}));var Zr;(function(g){function k(N,_,h,$,D){var ae={name:N,kind:_,location:{uri:$,range:h}};return D&&(ae.containerName=D),ae}g.create=k})(Zr=e.SymbolInformation||(e.SymbolInformation={}));var ro;(function(g){function k(N,_,h,$){return $!==void 0?{name:N,kind:_,location:{uri:h,range:$}}:{name:N,kind:_,location:{uri:h}}}g.create=k})(ro=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var no;(function(g){function k(_,h,$,D,ae,ut){var Ge={name:_,detail:h,kind:$,range:D,selectionRange:ae};return ut!==void 0&&(Ge.children=ut),Ge}g.create=k;function N(_){var h=_;return h&&w.string(h.name)&&w.number(h.kind)&&s.is(h.range)&&s.is(h.selectionRange)&&(h.detail===void 0||w.string(h.detail))&&(h.deprecated===void 0||w.boolean(h.deprecated))&&(h.children===void 0||Array.isArray(h.children))&&(h.tags===void 0||Array.isArray(h.tags))}g.is=N})(no=e.DocumentSymbol||(e.DocumentSymbol={}));var Sr;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(Sr=e.CodeActionKind||(e.CodeActionKind={}));var Pn;(function(g){g.Invoked=1,g.Automatic=2})(Pn=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var $t;(function(g){function k(_,h,$){var D={diagnostics:_};return h!=null&&(D.only=h),$!=null&&(D.triggerKind=$),D}g.create=k;function N(_){var h=_;return w.defined(h)&&w.typedArray(h.diagnostics,S.is)&&(h.only===void 0||w.typedArray(h.only,w.string))&&(h.triggerKind===void 0||h.triggerKind===Pn.Invoked||h.triggerKind===Pn.Automatic)}g.is=N})($t=e.CodeActionContext||(e.CodeActionContext={}));var en;(function(g){function k(_,h,$){var D={title:_},ae=!0;return typeof h=="string"?(ae=!1,D.kind=h):O.is(h)?D.command=h:D.edit=h,ae&&$!==void 0&&(D.kind=$),D}g.create=k;function N(_){var h=_;return h&&w.string(h.title)&&(h.diagnostics===void 0||w.typedArray(h.diagnostics,S.is))&&(h.kind===void 0||w.string(h.kind))&&(h.edit!==void 0||h.command!==void 0)&&(h.command===void 0||O.is(h.command))&&(h.isPreferred===void 0||w.boolean(h.isPreferred))&&(h.edit===void 0||q.is(h.edit))}g.is=N})(en=e.CodeAction||(e.CodeAction={}));var tn;(function(g){function k(_,h){var $={range:_};return w.defined(h)&&($.data=h),$}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(h.range)&&(w.undefined(h.command)||O.is(h.command))}g.is=N})(tn=e.CodeLens||(e.CodeLens={}));var En;(function(g){function k(_,h){return{tabSize:_,insertSpaces:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.uinteger(h.tabSize)&&w.boolean(h.insertSpaces)}g.is=N})(En=e.FormattingOptions||(e.FormattingOptions={}));var C;(function(g){function k(_,h,$){return{range:_,target:h,data:$}}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(h.range)&&(w.undefined(h.target)||w.string(h.target))}g.is=N})(C=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function k(_,h){return{range:_,parent:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&(h.parent===void 0||g.is(h.parent))}g.is=N})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var xe;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&(_.resultId===void 0||typeof _.resultId=="string")&&Array.isArray(_.data)&&(_.data.length===0||typeof _.data[0]=="number")}g.is=k})(xe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(g){function k(_,h){return{range:_,text:h}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&w.string(h.text)}g.is=N})(Le=e.InlineValueText||(e.InlineValueText={}));var Je;(function(g){function k(_,h,$){return{range:_,variableName:h,caseSensitiveLookup:$}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&w.boolean(h.caseSensitiveLookup)&&(w.string(h.variableName)||h.variableName===void 0)}g.is=N})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var pt;(function(g){function k(_,h){return{range:_,expression:h}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&(w.string(h.expression)||h.expression===void 0)}g.is=N})(pt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ye;(function(g){function k(_,h){return{frameId:_,stoppedLocation:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(_.stoppedLocation)}g.is=N})(ye=e.InlineValueContext||(e.InlineValueContext={}));var je;(function(g){g.Type=1,g.Parameter=2;function k(N){return N===1||N===2}g.is=k})(je=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function k(_){return{value:_}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&(h.tooltip===void 0||w.string(h.tooltip)||Ct.is(h.tooltip))&&(h.location===void 0||u.is(h.location))&&(h.command===void 0||O.is(h.command))}g.is=N})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ft;(function(g){function k(_,h,$){var D={position:_,label:h};return $!==void 0&&(D.kind=$),D}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&o.is(h.position)&&(w.string(h.label)||w.typedArray(h.label,_e.is))&&(h.kind===void 0||je.is(h.kind))&&h.textEdits===void 0||w.typedArray(h.textEdits,F.is)&&(h.tooltip===void 0||w.string(h.tooltip)||Ct.is(h.tooltip))&&(h.paddingLeft===void 0||w.boolean(h.paddingLeft))&&(h.paddingRight===void 0||w.boolean(h.paddingRight))}g.is=N})(ft=e.InlayHint||(e.InlayHint={}));var Yt;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&n.is(_.uri)&&w.string(_.name)}g.is=k})(Yt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var ai;(function(g){function k($,D,ae,ut){return new kn($,D,ae,ut)}g.create=k;function N($){var D=$;return!!(w.defined(D)&&w.string(D.uri)&&(w.undefined(D.languageId)||w.string(D.languageId))&&w.uinteger(D.lineCount)&&w.func(D.getText)&&w.func(D.positionAt)&&w.func(D.offsetAt))}g.is=N;function _($,D){for(var ae=$.getText(),ut=h(D,function(io,Il){var P_=io.range.start.line-Il.range.start.line;return P_===0?io.range.start.character-Il.range.start.character:P_}),Ge=ae.length,rn=ut.length-1;rn>=0;rn--){var nn=ut[rn],oi=$.offsetAt(nn.range.start),ge=$.offsetAt(nn.range.end);if(ge<=Ge)ae=ae.substring(0,oi)+nn.newText+ae.substring(ge,ae.length);else throw new Error("Overlapping edit");Ge=oi}return ae}g.applyEdits=_;function h($,D){if($.length<=1)return $;var ae=$.length/2|0,ut=$.slice(0,ae),Ge=$.slice(ae);h(ut,D),h(Ge,D);for(var rn=0,nn=0,oi=0;rn<ut.length&&nn<Ge.length;){var ge=D(ut[rn],Ge[nn]);ge<=0?$[oi++]=ut[rn++]:$[oi++]=Ge[nn++]}for(;rn<ut.length;)$[oi++]=ut[rn++];for(;nn<Ge.length;)$[oi++]=Ge[nn++];return $}})(ai=e.TextDocument||(e.TextDocument={}));var kn=function(){function g(k,N,_,h){this._uri=k,this._languageId=N,this._version=_,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var N=this.offsetAt(k.start),_=this.offsetAt(k.end);return this._content.substring(N,_)}return this._content},g.prototype.update=function(k,N){this._content=k.text,this._version=N,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],N=this._content,_=!0,h=0;h<N.length;h++){_&&(k.push(h),_=!1);var $=N.charAt(h);_=$==="\r"||$===`
`,$==="\r"&&h+1<N.length&&N.charAt(h+1)===`
`&&h++}_&&N.length>0&&k.push(N.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var N=this.getLineOffsets(),_=0,h=N.length;if(h===0)return o.create(0,k);for(;_<h;){var $=Math.floor((_+h)/2);N[$]>k?h=$:_=$+1}var D=_-1;return o.create(D,k-N[D])},g.prototype.offsetAt=function(k){var N=this.getLineOffsets();if(k.line>=N.length)return this._content.length;if(k.line<0)return 0;var _=N[k.line],h=k.line+1<N.length?N[k.line+1]:this._content.length;return Math.max(Math.min(_+k.character,h),_)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),w;(function(g){var k=Object.prototype.toString;function N(ge){return typeof ge<"u"}g.defined=N;function _(ge){return typeof ge>"u"}g.undefined=_;function h(ge){return ge===!0||ge===!1}g.boolean=h;function $(ge){return k.call(ge)==="[object String]"}g.string=$;function D(ge){return k.call(ge)==="[object Number]"}g.number=D;function ae(ge,io,Il){return k.call(ge)==="[object Number]"&&io<=ge&&ge<=Il}g.numberRange=ae;function ut(ge){return k.call(ge)==="[object Number]"&&-2147483648<=ge&&ge<=2147483647}g.integer=ut;function Ge(ge){return k.call(ge)==="[object Number]"&&0<=ge&&ge<=2147483647}g.uinteger=Ge;function rn(ge){return k.call(ge)==="[object Function]"}g.func=rn;function nn(ge){return ge!==null&&typeof ge=="object"}g.objectLiteral=nn;function oi(ge,io){return Array.isArray(ge)&&ge.every(io)}g.typedArray=oi})(w||(w={}))})});var at=d(or=>{"use strict";Object.defineProperty(or,"__esModule",{value:!0});or.ProtocolNotificationType=or.ProtocolNotificationType0=or.ProtocolRequestType=or.ProtocolRequestType0=or.RegistrationType=or.MessageDirection=void 0;var po=fi(),dq;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(dq=or.MessageDirection||(or.MessageDirection={}));var Hh=class{constructor(e){this.method=e}};or.RegistrationType=Hh;var Kh=class extends po.RequestType0{constructor(e){super(e)}};or.ProtocolRequestType0=Kh;var Wh=class extends po.RequestType{constructor(e){super(e,po.ParameterStructures.byName)}};or.ProtocolRequestType=Wh;var Bh=class extends po.NotificationType0{constructor(e){super(e)}};or.ProtocolNotificationType0=Bh;var Vh=class extends po.NotificationType{constructor(e){super(e,po.ParameterStructures.byName)}};or.ProtocolNotificationType=Vh});var Hl=d(ht=>{"use strict";Object.defineProperty(ht,"__esModule",{value:!0});ht.objectLiteral=ht.typedArray=ht.stringArray=ht.array=ht.func=ht.error=ht.number=ht.string=ht.boolean=void 0;function pq(t){return t===!0||t===!1}ht.boolean=pq;function J_(t){return typeof t=="string"||t instanceof String}ht.string=J_;function hq(t){return typeof t=="number"||t instanceof Number}ht.number=hq;function mq(t){return t instanceof Error}ht.error=mq;function yq(t){return typeof t=="function"}ht.func=yq;function Q_(t){return Array.isArray(t)}ht.array=Q_;function gq(t){return Q_(t)&&t.every(e=>J_(e))}ht.stringArray=gq;function vq(t,e){return Array.isArray(t)&&t.every(e)}ht.typedArray=vq;function Tq(t){return t!==null&&typeof t=="object"}ht.objectLiteral=Tq});var eR=d(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.ImplementationRequest=void 0;var Z_=at(),_q;(function(t){t.method="textDocument/implementation",t.messageDirection=Z_.MessageDirection.clientToServer,t.type=new Z_.ProtocolRequestType(t.method)})(_q=au.ImplementationRequest||(au.ImplementationRequest={}))});var rR=d(ou=>{"use strict";Object.defineProperty(ou,"__esModule",{value:!0});ou.TypeDefinitionRequest=void 0;var tR=at(),Rq;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=tR.MessageDirection.clientToServer,t.type=new tR.ProtocolRequestType(t.method)})(Rq=ou.TypeDefinitionRequest||(ou.TypeDefinitionRequest={}))});var nR=d(Li=>{"use strict";Object.defineProperty(Li,"__esModule",{value:!0});Li.DidChangeWorkspaceFoldersNotification=Li.WorkspaceFoldersRequest=void 0;var Kl=at(),Aq;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Kl.MessageDirection.serverToClient,t.type=new Kl.ProtocolRequestType0(t.method)})(Aq=Li.WorkspaceFoldersRequest||(Li.WorkspaceFoldersRequest={}));var Sq;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Kl.MessageDirection.clientToServer,t.type=new Kl.ProtocolNotificationType(t.method)})(Sq=Li.DidChangeWorkspaceFoldersNotification||(Li.DidChangeWorkspaceFoldersNotification={}))});var aR=d(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.ConfigurationRequest=void 0;var iR=at(),bq;(function(t){t.method="workspace/configuration",t.messageDirection=iR.MessageDirection.serverToClient,t.type=new iR.ProtocolRequestType(t.method)})(bq=su.ConfigurationRequest||(su.ConfigurationRequest={}))});var oR=d(qi=>{"use strict";Object.defineProperty(qi,"__esModule",{value:!0});qi.ColorPresentationRequest=qi.DocumentColorRequest=void 0;var Wl=at(),Cq;(function(t){t.method="textDocument/documentColor",t.messageDirection=Wl.MessageDirection.clientToServer,t.type=new Wl.ProtocolRequestType(t.method)})(Cq=qi.DocumentColorRequest||(qi.DocumentColorRequest={}));var Pq;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Wl.MessageDirection.clientToServer,t.type=new Wl.ProtocolRequestType(t.method)})(Pq=qi.ColorPresentationRequest||(qi.ColorPresentationRequest={}))});var uR=d(uu=>{"use strict";Object.defineProperty(uu,"__esModule",{value:!0});uu.FoldingRangeRequest=void 0;var sR=at(),Eq;(function(t){t.method="textDocument/foldingRange",t.messageDirection=sR.MessageDirection.clientToServer,t.type=new sR.ProtocolRequestType(t.method)})(Eq=uu.FoldingRangeRequest||(uu.FoldingRangeRequest={}))});var cR=d(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.DeclarationRequest=void 0;var lR=at(),kq;(function(t){t.method="textDocument/declaration",t.messageDirection=lR.MessageDirection.clientToServer,t.type=new lR.ProtocolRequestType(t.method)})(kq=lu.DeclarationRequest||(lu.DeclarationRequest={}))});var dR=d(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.SelectionRangeRequest=void 0;var fR=at(),Nq;(function(t){t.method="textDocument/selectionRange",t.messageDirection=fR.MessageDirection.clientToServer,t.type=new fR.ProtocolRequestType(t.method)})(Nq=cu.SelectionRangeRequest||(cu.SelectionRangeRequest={}))});var pR=d(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.WorkDoneProgressCancelNotification=sn.WorkDoneProgressCreateRequest=sn.WorkDoneProgress=void 0;var wq=fi(),Bl=at(),$q;(function(t){t.type=new wq.ProgressType;function e(r){return r===t.type}t.is=e})($q=sn.WorkDoneProgress||(sn.WorkDoneProgress={}));var Oq;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Bl.MessageDirection.serverToClient,t.type=new Bl.ProtocolRequestType(t.method)})(Oq=sn.WorkDoneProgressCreateRequest||(sn.WorkDoneProgressCreateRequest={}));var Iq;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Bl.MessageDirection.clientToServer,t.type=new Bl.ProtocolNotificationType(t.method)})(Iq=sn.WorkDoneProgressCancelNotification||(sn.WorkDoneProgressCancelNotification={}))});var hR=d(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.CallHierarchyOutgoingCallsRequest=un.CallHierarchyIncomingCallsRequest=un.CallHierarchyPrepareRequest=void 0;var ho=at(),Dq;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=ho.MessageDirection.clientToServer,t.type=new ho.ProtocolRequestType(t.method)})(Dq=un.CallHierarchyPrepareRequest||(un.CallHierarchyPrepareRequest={}));var xq;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=ho.MessageDirection.clientToServer,t.type=new ho.ProtocolRequestType(t.method)})(xq=un.CallHierarchyIncomingCallsRequest||(un.CallHierarchyIncomingCallsRequest={}));var Lq;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=ho.MessageDirection.clientToServer,t.type=new ho.ProtocolRequestType(t.method)})(Lq=un.CallHierarchyOutgoingCallsRequest||(un.CallHierarchyOutgoingCallsRequest={}))});var mR=d(mt=>{"use strict";Object.defineProperty(mt,"__esModule",{value:!0});mt.SemanticTokensRefreshRequest=mt.SemanticTokensRangeRequest=mt.SemanticTokensDeltaRequest=mt.SemanticTokensRequest=mt.SemanticTokensRegistrationType=mt.TokenFormat=void 0;var di=at(),qq;(function(t){t.Relative="relative"})(qq=mt.TokenFormat||(mt.TokenFormat={}));var Vl;(function(t){t.method="textDocument/semanticTokens",t.type=new di.RegistrationType(t.method)})(Vl=mt.SemanticTokensRegistrationType||(mt.SemanticTokensRegistrationType={}));var Mq;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=di.MessageDirection.clientToServer,t.type=new di.ProtocolRequestType(t.method),t.registrationMethod=Vl.method})(Mq=mt.SemanticTokensRequest||(mt.SemanticTokensRequest={}));var Fq;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=di.MessageDirection.clientToServer,t.type=new di.ProtocolRequestType(t.method),t.registrationMethod=Vl.method})(Fq=mt.SemanticTokensDeltaRequest||(mt.SemanticTokensDeltaRequest={}));var jq;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=di.MessageDirection.clientToServer,t.type=new di.ProtocolRequestType(t.method),t.registrationMethod=Vl.method})(jq=mt.SemanticTokensRangeRequest||(mt.SemanticTokensRangeRequest={}));var Gq;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=di.MessageDirection.clientToServer,t.type=new di.ProtocolRequestType0(t.method)})(Gq=mt.SemanticTokensRefreshRequest||(mt.SemanticTokensRefreshRequest={}))});var gR=d(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.ShowDocumentRequest=void 0;var yR=at(),Uq;(function(t){t.method="window/showDocument",t.messageDirection=yR.MessageDirection.serverToClient,t.type=new yR.ProtocolRequestType(t.method)})(Uq=fu.ShowDocumentRequest||(fu.ShowDocumentRequest={}))});var TR=d(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.LinkedEditingRangeRequest=void 0;var vR=at(),Hq;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=vR.MessageDirection.clientToServer,t.type=new vR.ProtocolRequestType(t.method)})(Hq=du.LinkedEditingRangeRequest||(du.LinkedEditingRangeRequest={}))});var _R=d(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var Dr=at(),Kq;(function(t){t.file="file",t.folder="folder"})(Kq=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var Wq;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Dr.MessageDirection.clientToServer,t.type=new Dr.ProtocolRequestType(t.method)})(Wq=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var Bq;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Dr.MessageDirection.clientToServer,t.type=new Dr.ProtocolNotificationType(t.method)})(Bq=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var Vq;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Dr.MessageDirection.clientToServer,t.type=new Dr.ProtocolRequestType(t.method)})(Vq=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var zq;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Dr.MessageDirection.clientToServer,t.type=new Dr.ProtocolNotificationType(t.method)})(zq=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var Yq;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Dr.MessageDirection.clientToServer,t.type=new Dr.ProtocolNotificationType(t.method)})(Yq=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var Xq;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Dr.MessageDirection.clientToServer,t.type=new Dr.ProtocolRequestType(t.method)})(Xq=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var AR=d(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.MonikerRequest=ln.MonikerKind=ln.UniquenessLevel=void 0;var RR=at(),Jq;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Jq=ln.UniquenessLevel||(ln.UniquenessLevel={}));var Qq;(function(t){t.$import="import",t.$export="export",t.local="local"})(Qq=ln.MonikerKind||(ln.MonikerKind={}));var Zq;(function(t){t.method="textDocument/moniker",t.messageDirection=RR.MessageDirection.clientToServer,t.type=new RR.ProtocolRequestType(t.method)})(Zq=ln.MonikerRequest||(ln.MonikerRequest={}))});var SR=d(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.TypeHierarchySubtypesRequest=cn.TypeHierarchySupertypesRequest=cn.TypeHierarchyPrepareRequest=void 0;var mo=at(),eM;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=mo.MessageDirection.clientToServer,t.type=new mo.ProtocolRequestType(t.method)})(eM=cn.TypeHierarchyPrepareRequest||(cn.TypeHierarchyPrepareRequest={}));var tM;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=mo.MessageDirection.clientToServer,t.type=new mo.ProtocolRequestType(t.method)})(tM=cn.TypeHierarchySupertypesRequest||(cn.TypeHierarchySupertypesRequest={}));var rM;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=mo.MessageDirection.clientToServer,t.type=new mo.ProtocolRequestType(t.method)})(rM=cn.TypeHierarchySubtypesRequest||(cn.TypeHierarchySubtypesRequest={}))});var bR=d(Mi=>{"use strict";Object.defineProperty(Mi,"__esModule",{value:!0});Mi.InlineValueRefreshRequest=Mi.InlineValueRequest=void 0;var zl=at(),nM;(function(t){t.method="textDocument/inlineValue",t.messageDirection=zl.MessageDirection.clientToServer,t.type=new zl.ProtocolRequestType(t.method)})(nM=Mi.InlineValueRequest||(Mi.InlineValueRequest={}));var iM;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=zl.MessageDirection.clientToServer,t.type=new zl.ProtocolRequestType0(t.method)})(iM=Mi.InlineValueRefreshRequest||(Mi.InlineValueRefreshRequest={}))});var CR=d(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.InlayHintRefreshRequest=fn.InlayHintResolveRequest=fn.InlayHintRequest=void 0;var yo=at(),aM;(function(t){t.method="textDocument/inlayHint",t.messageDirection=yo.MessageDirection.clientToServer,t.type=new yo.ProtocolRequestType(t.method)})(aM=fn.InlayHintRequest||(fn.InlayHintRequest={}));var oM;(function(t){t.method="inlayHint/resolve",t.messageDirection=yo.MessageDirection.clientToServer,t.type=new yo.ProtocolRequestType(t.method)})(oM=fn.InlayHintResolveRequest||(fn.InlayHintResolveRequest={}));var sM;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=yo.MessageDirection.clientToServer,t.type=new yo.ProtocolRequestType0(t.method)})(sM=fn.InlayHintRefreshRequest||(fn.InlayHintRefreshRequest={}))});var ER=d(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});Ut.DiagnosticRefreshRequest=Ut.WorkspaceDiagnosticRequest=Ut.DocumentDiagnosticRequest=Ut.DocumentDiagnosticReportKind=Ut.DiagnosticServerCancellationData=void 0;var PR=fi(),uM=Hl(),go=at(),lM;(function(t){function e(r){let n=r;return n&&uM.boolean(n.retriggerRequest)}t.is=e})(lM=Ut.DiagnosticServerCancellationData||(Ut.DiagnosticServerCancellationData={}));var cM;(function(t){t.Full="full",t.Unchanged="unchanged"})(cM=Ut.DocumentDiagnosticReportKind||(Ut.DocumentDiagnosticReportKind={}));var fM;(function(t){t.method="textDocument/diagnostic",t.messageDirection=go.MessageDirection.clientToServer,t.type=new go.ProtocolRequestType(t.method),t.partialResult=new PR.ProgressType})(fM=Ut.DocumentDiagnosticRequest||(Ut.DocumentDiagnosticRequest={}));var dM;(function(t){t.method="workspace/diagnostic",t.messageDirection=go.MessageDirection.clientToServer,t.type=new go.ProtocolRequestType(t.method),t.partialResult=new PR.ProgressType})(dM=Ut.WorkspaceDiagnosticRequest||(Ut.WorkspaceDiagnosticRequest={}));var pM;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=go.MessageDirection.clientToServer,t.type=new go.ProtocolRequestType0(t.method)})(pM=Ut.DiagnosticRefreshRequest||(Ut.DiagnosticRefreshRequest={}))});var wR=d(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.DidCloseNotebookDocumentNotification=Se.DidSaveNotebookDocumentNotification=Se.DidChangeNotebookDocumentNotification=Se.NotebookCellArrayChange=Se.DidOpenNotebookDocumentNotification=Se.NotebookDocumentSyncRegistrationType=Se.NotebookDocument=Se.NotebookCell=Se.ExecutionSummary=Se.NotebookCellKind=void 0;var pu=fo(),dn=Hl(),Nn=at(),kR;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(kR=Se.NotebookCellKind||(Se.NotebookCellKind={}));var NR;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return dn.objectLiteral(a)&&pu.uinteger.is(a.executionOrder)&&(a.success===void 0||dn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(NR=Se.ExecutionSummary||(Se.ExecutionSummary={}));var zh;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return dn.objectLiteral(o)&&kR.is(o.kind)&&pu.DocumentUri.is(o.document)&&(o.metadata===void 0||dn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!NR.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(dn.objectLiteral(a)&&dn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(a[m],o[m]))return!1}}return!0}})(zh=Se.NotebookCell||(Se.NotebookCell={}));var hM;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return dn.objectLiteral(i)&&dn.string(i.uri)&&pu.integer.is(i.version)&&dn.typedArray(i.cells,zh.is)}t.is=r})(hM=Se.NotebookDocument||(Se.NotebookDocument={}));var hu;(function(t){t.method="notebookDocument/sync",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.RegistrationType(t.method)})(hu=Se.NotebookDocumentSyncRegistrationType||(Se.NotebookDocumentSyncRegistrationType={}));var mM;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolNotificationType(t.method),t.registrationMethod=hu.method})(mM=Se.DidOpenNotebookDocumentNotification||(Se.DidOpenNotebookDocumentNotification={}));var yM;(function(t){function e(n){let i=n;return dn.objectLiteral(i)&&pu.uinteger.is(i.start)&&pu.uinteger.is(i.deleteCount)&&(i.cells===void 0||dn.typedArray(i.cells,zh.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(yM=Se.NotebookCellArrayChange||(Se.NotebookCellArrayChange={}));var gM;(function(t){t.method="notebookDocument/didChange",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolNotificationType(t.method),t.registrationMethod=hu.method})(gM=Se.DidChangeNotebookDocumentNotification||(Se.DidChangeNotebookDocumentNotification={}));var vM;(function(t){t.method="notebookDocument/didSave",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolNotificationType(t.method),t.registrationMethod=hu.method})(vM=Se.DidSaveNotebookDocumentNotification||(Se.DidSaveNotebookDocumentNotification={}));var TM;(function(t){t.method="notebookDocument/didClose",t.messageDirection=Nn.MessageDirection.clientToServer,t.type=new Nn.ProtocolNotificationType(t.method),t.registrationMethod=hu.method})(TM=Se.DidCloseNotebookDocumentNotification||(Se.DidCloseNotebookDocumentNotification={}))});var FR=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=at(),$R=fo(),Ht=Hl(),_M=eR();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return _M.ImplementationRequest}});var RM=rR();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return RM.TypeDefinitionRequest}});var OR=nR();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return OR.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return OR.DidChangeWorkspaceFoldersNotification}});var AM=aR();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return AM.ConfigurationRequest}});var IR=oR();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return IR.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return IR.ColorPresentationRequest}});var SM=uR();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return SM.FoldingRangeRequest}});var bM=cR();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return bM.DeclarationRequest}});var CM=dR();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return CM.SelectionRangeRequest}});var Yh=pR();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return Yh.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Yh.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Yh.WorkDoneProgressCancelNotification}});var Xh=hR();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Xh.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Xh.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Xh.CallHierarchyPrepareRequest}});var vo=mR();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return vo.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return vo.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return vo.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return vo.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return vo.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return vo.SemanticTokensRegistrationType}});var PM=gR();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return PM.ShowDocumentRequest}});var EM=TR();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return EM.LinkedEditingRangeRequest}});var Aa=_R();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return Aa.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return Aa.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return Aa.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return Aa.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return Aa.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return Aa.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return Aa.WillDeleteFilesRequest}});var Jh=AR();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return Jh.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return Jh.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return Jh.MonikerRequest}});var Qh=SR();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return Qh.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return Qh.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return Qh.TypeHierarchySupertypesRequest}});var DR=bR();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return DR.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return DR.InlineValueRefreshRequest}});var Zh=CR();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return Zh.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Zh.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Zh.InlayHintRefreshRequest}});var mu=ER();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return mu.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return mu.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return mu.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return mu.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return mu.DiagnosticRefreshRequest}});var wn=wR();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return wn.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return wn.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return wn.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return wn.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return wn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return wn.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return wn.DidCloseNotebookDocumentNotification}});var xR;(function(t){function e(r){let n=r;return Ht.string(n.language)||Ht.string(n.scheme)||Ht.string(n.pattern)}t.is=e})(xR=T.TextDocumentFilter||(T.TextDocumentFilter={}));var LR;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(Ht.string(n.notebookType)||Ht.string(n.scheme)||Ht.string(n.pattern))}t.is=e})(LR=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var qR;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(Ht.string(n.notebook)||LR.is(n.notebook))&&(n.language===void 0||Ht.string(n.language))}t.is=e})(qR=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var MR;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Ht.string(n)&&!xR.is(n)&&!qR.is(n))return!1;return!0}t.is=e})(MR=T.DocumentSelector||(T.DocumentSelector={}));var kM;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(kM=T.RegistrationRequest||(T.RegistrationRequest={}));var NM;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(NM=T.UnregistrationRequest||(T.UnregistrationRequest={}));var wM;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(wM=T.ResourceOperationKind||(T.ResourceOperationKind={}));var $M;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})($M=T.FailureHandlingKind||(T.FailureHandlingKind={}));var OM;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(OM=T.PositionEncodingKind||(T.PositionEncodingKind={}));var IM;(function(t){function e(r){let n=r;return n&&Ht.string(n.id)&&n.id.length>0}t.hasId=e})(IM=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var DM;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||MR.is(n.documentSelector))}t.is=e})(DM=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var xM;(function(t){function e(n){let i=n;return Ht.objectLiteral(i)&&(i.workDoneProgress===void 0||Ht.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Ht.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(xM=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var LM;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LM=T.InitializeRequest||(T.InitializeRequest={}));var qM;(function(t){t.unknownProtocolVersion=1})(qM=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var MM;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(MM=T.InitializedNotification||(T.InitializedNotification={}));var FM;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(FM=T.ShutdownRequest||(T.ShutdownRequest={}));var jM;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(jM=T.ExitNotification||(T.ExitNotification={}));var GM;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(GM=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var UM;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(UM=T.MessageType||(T.MessageType={}));var HM;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(HM=T.ShowMessageNotification||(T.ShowMessageNotification={}));var KM;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(KM=T.ShowMessageRequest||(T.ShowMessageRequest={}));var WM;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(WM=T.LogMessageNotification||(T.LogMessageNotification={}));var BM;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(BM=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var VM;(function(t){t.None=0,t.Full=1,t.Incremental=2})(VM=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var zM;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(zM=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var YM;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(YM=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var XM;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(XM=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var JM;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(JM=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var QM;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(QM=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var ZM;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(ZM=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var eF;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(eF=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var tF;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(tF=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var rF;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(rF=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var nF;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(nF=T.FileChangeType||(T.FileChangeType={}));var iF;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&($R.URI.is(n.baseUri)||$R.WorkspaceFolder.is(n.baseUri))&&Ht.string(n.pattern)}t.is=e})(iF=T.RelativePattern||(T.RelativePattern={}));var aF;(function(t){t.Create=1,t.Change=2,t.Delete=4})(aF=T.WatchKind||(T.WatchKind={}));var oF;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(oF=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var sF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(sF=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var uF;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(uF=T.CompletionRequest||(T.CompletionRequest={}));var lF;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(lF=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var cF;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(cF=T.HoverRequest||(T.HoverRequest={}));var fF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(fF=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var dF;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(dF=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var pF;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(pF=T.DefinitionRequest||(T.DefinitionRequest={}));var hF;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(hF=T.ReferencesRequest||(T.ReferencesRequest={}));var mF;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(mF=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var yF;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(yF=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var gF;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(gF=T.CodeActionRequest||(T.CodeActionRequest={}));var vF;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(vF=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var TF;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(TF=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var _F;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(_F=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var RF;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(RF=T.CodeLensRequest||(T.CodeLensRequest={}));var AF;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(AF=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var SF;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(SF=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var bF;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(bF=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var CF;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(CF=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var PF;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(PF=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var EF;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(EF=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var kF;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(kF=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var NF;(function(t){t.Identifier=1})(NF=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var wF;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(wF=T.RenameRequest||(T.RenameRequest={}));var $F;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})($F=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var OF;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(OF=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var IF;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(IF=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var GR=d(Yl=>{"use strict";Object.defineProperty(Yl,"__esModule",{value:!0});Yl.createProtocolConnection=void 0;var jR=fi();function DF(t,e,r,n){return jR.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,jR.createMessageConnection)(t,e,r,n)}Yl.createProtocolConnection=DF});var UR=d(sr=>{"use strict";var xF=sr&&sr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Xl=sr&&sr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&xF(e,t,r)};Object.defineProperty(sr,"__esModule",{value:!0});sr.LSPErrorCodes=sr.createProtocolConnection=void 0;Xl(fi(),sr);Xl(fo(),sr);Xl(at(),sr);Xl(FR(),sr);var LF=GR();Object.defineProperty(sr,"createProtocolConnection",{enumerable:!0,get:function(){return LF.createProtocolConnection}});var qF;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(qF=sr.LSPErrorCodes||(sr.LSPErrorCodes={}))});var yt=d($n=>{"use strict";var MF=$n&&$n.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),HR=$n&&$n.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&MF(e,t,r)};Object.defineProperty($n,"__esModule",{value:!0});$n.createProtocolConnection=void 0;var FF=Uh();HR(Uh(),$n);HR(UR(),$n);function jF(t,e,r,n){return(0,FF.createMessageConnection)(t,e,r,n)}$n.createProtocolConnection=jF});var tm=d(Fi=>{"use strict";Object.defineProperty(Fi,"__esModule",{value:!0});Fi.SemanticTokensBuilder=Fi.SemanticTokensDiff=Fi.SemanticTokensFeature=void 0;var Jl=yt(),GF=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Jl.SemanticTokensRefreshRequest.type),on:e=>{let r=Jl.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Jl.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Jl.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Fi.SemanticTokensFeature=GF;var Ql=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Fi.SemanticTokensDiff=Ql;var em=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Ql(this._prevData,this._data).computeDiff()}:this.build()}};Fi.SemanticTokensBuilder=em});var nm=d(Zl=>{"use strict";Object.defineProperty(Zl,"__esModule",{value:!0});Zl.TextDocuments=void 0;var Sa=yt(),rm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new Sa.Emitter,this._onDidOpen=new Sa.Emitter,this._onDidClose=new Sa.Emitter,this._onDidSave=new Sa.Emitter,this._onWillSave=new Sa.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=Sa.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),Sa.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Zl.TextDocuments=rm});var am=d(To=>{"use strict";Object.defineProperty(To,"__esModule",{value:!0});To.NotebookDocuments=To.NotebookSyncFeature=void 0;var xr=yt(),KR=nm(),UF=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(xr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(xr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(xr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(xr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};To.NotebookSyncFeature=UF;var ji=class{onDidOpenTextDocument(e){return this.openHandler=e,xr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,xr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,xr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return ji.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return ji.NULL_DISPOSE}onDidSaveTextDocument(){return ji.NULL_DISPOSE}};ji.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var im=class{constructor(e){e instanceof KR.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new KR.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new xr.Emitter,this._onDidChange=new xr.Emitter,this._onDidSave=new xr.Emitter,this._onDidClose=new xr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new ji,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],m=[];if(u.cells!==void 0){let E=u.cells;if(E.structure!==void 0){let b=E.structure.array;if(a.cells.splice(b.start,b.deleteCount,...b.cells!==void 0?b.cells:[]),E.structure.didOpen!==void 0)for(let S of E.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(E.structure.didClose)for(let S of E.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(E.data!==void 0){let b=new Map(E.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=b.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(f.push({old:F[0],new:O}),b.delete(O.document),b.size===0)break}}}if(E.textContent!==void 0)for(let b of E.textContent)r.changeTextDocument({textDocument:b.document,contentChanges:b.changes}),m.push(b.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let E of l)y.push(this.getNotebookCell(E));let R=[];for(let E of c)R.push(this.getNotebookCell(E));let P=[];for(let E of m)P.push(this.getNotebookCell(E));(y.length>0||R.length>0||f.length>0||P.length>0)&&(v.cells={added:y,removed:R,changed:{data:f,textContent:P}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),xr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};To.NotebookDocuments=im});var om=d(gt=>{"use strict";Object.defineProperty(gt,"__esModule",{value:!0});gt.thenable=gt.typedArray=gt.stringArray=gt.array=gt.func=gt.error=gt.number=gt.string=gt.boolean=void 0;function HF(t){return t===!0||t===!1}gt.boolean=HF;function WR(t){return typeof t=="string"||t instanceof String}gt.string=WR;function KF(t){return typeof t=="number"||t instanceof Number}gt.number=KF;function WF(t){return t instanceof Error}gt.error=WF;function BR(t){return typeof t=="function"}gt.func=BR;function VR(t){return Array.isArray(t)}gt.array=VR;function BF(t){return VR(t)&&t.every(e=>WR(e))}gt.stringArray=BF;function VF(t,e){return Array.isArray(t)&&t.every(e)}gt.typedArray=VF;function zF(t){return t&&BR(t.then)}gt.thenable=zF});var sm=d(Lr=>{"use strict";Object.defineProperty(Lr,"__esModule",{value:!0});Lr.generateUuid=Lr.parse=Lr.isUUID=Lr.v4=Lr.empty=void 0;var yu=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},ue=class extends yu{constructor(){super([ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-","4",ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._oneOf(ue._timeHighBits),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return ue._oneOf(ue._chars)}};ue._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];ue._timeHighBits=["8","9","a","b"];Lr.empty=new yu("00000000-0000-0000-0000-000000000000");function zR(){return new ue}Lr.v4=zR;var YF=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function YR(t){return YF.test(t)}Lr.isUUID=YR;function XF(t){if(!YR(t))throw new Error("invalid uuid");return new yu(t)}Lr.parse=XF;function JF(){return zR().asHex()}Lr.generateUuid=JF});var XR=d(Ui=>{"use strict";Object.defineProperty(Ui,"__esModule",{value:!0});Ui.attachPartialResult=Ui.ProgressFeature=Ui.attachWorkDone=void 0;var Gi=yt(),QF=sm(),On=class{constructor(e,r){this._connection=e,this._token=r,On.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Gi.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Gi.WorkDoneProgress.type,this._token,n)}done(){On.Instances.delete(this._token),this._connection.sendProgress(Gi.WorkDoneProgress.type,this._token,{kind:"end"})}};On.Instances=new Map;var ec=class extends On{constructor(e,r){super(e,r),this._source=new Gi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},gu=class{constructor(){}begin(){}report(){}done(){}},tc=class extends gu{constructor(){super(),this._source=new Gi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function ZF(t,e){if(e===void 0||e.workDoneToken===void 0)return new gu;let r=e.workDoneToken;return delete e.workDoneToken,new On(t,r)}Ui.attachWorkDone=ZF;var ej=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Gi.WorkDoneProgressCancelNotification.type,r=>{let n=On.Instances.get(r.token);(n instanceof ec||n instanceof tc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new gu:new On(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,QF.generateUuid)();return this.connection.sendRequest(Gi.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new ec(this.connection,e))}else return Promise.resolve(new tc)}};Ui.ProgressFeature=ej;var um;(function(t){t.type=new Gi.ProgressType})(um||(um={}));var lm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(um.type,this._token,e)}};function tj(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new lm(t,r)}Ui.attachPartialResult=tj});var JR=d(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.ConfigurationFeature=void 0;var rj=yt(),nj=om(),ij=t=>class extends t{getConfiguration(e){return e?nj.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(rj.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};rc.ConfigurationFeature=ij});var QR=d(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.WorkspaceFoldersFeature=void 0;var nc=yt(),aj=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new nc.Emitter,this.connection.onNotification(nc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(nc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(nc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};ic.WorkspaceFoldersFeature=aj});var ZR=d(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.CallHierarchyFeature=void 0;var cm=yt(),oj=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(cm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=cm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=cm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};ac.CallHierarchyFeature=oj});var eA=d(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.ShowDocumentFeature=void 0;var sj=yt(),uj=t=>class extends t{showDocument(e){return this.connection.sendRequest(sj.ShowDocumentRequest.type,e)}};oc.ShowDocumentFeature=uj});var tA=d(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.FileOperationsFeature=void 0;var _o=yt(),lj=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(_o.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(_o.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(_o.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(_o.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(_o.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(_o.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};sc.FileOperationsFeature=lj});var rA=d(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.LinkedEditingRangeFeature=void 0;var cj=yt(),fj=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(cj.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};uc.LinkedEditingRangeFeature=fj});var nA=d(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.TypeHierarchyFeature=void 0;var fm=yt(),dj=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(fm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=fm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=fm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};lc.TypeHierarchyFeature=dj});var aA=d(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.InlineValueFeature=void 0;var iA=yt(),pj=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(iA.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(iA.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};cc.InlineValueFeature=pj});var oA=d(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.InlayHintFeature=void 0;var dm=yt(),hj=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(dm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(dm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(dm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};fc.InlayHintFeature=hj});var sA=d(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.DiagnosticFeature=void 0;var vu=yt(),mj=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(vu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(vu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(vu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(vu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(vu.WorkspaceDiagnosticRequest.partialResult,r)))}}};dc.DiagnosticFeature=mj});var uA=d(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.MonikerFeature=void 0;var yj=yt(),gj=t=>class extends t{get moniker(){return{on:e=>{let r=yj.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};pc.MonikerFeature=gj});var RA=d(ve=>{"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.createConnection=ve.combineFeatures=ve.combineNotebooksFeatures=ve.combineLanguagesFeatures=ve.combineWorkspaceFeatures=ve.combineWindowFeatures=ve.combineClientFeatures=ve.combineTracerFeatures=ve.combineTelemetryFeatures=ve.combineConsoleFeatures=ve._NotebooksImpl=ve._LanguagesImpl=ve.BulkUnregistration=ve.BulkRegistration=ve.ErrorMessageTracker=void 0;var H=yt(),qr=om(),hm=sm(),ie=XR(),vj=JR(),Tj=QR(),_j=ZR(),Rj=tm(),Aj=eA(),Sj=tA(),bj=rA(),Cj=nA(),Pj=aA(),Ej=oA(),kj=sA(),Nj=am(),wj=uA();function pm(t){if(t!==null)return t}var mm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ve.ErrorMessageTracker=mm;var hc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},ym=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(pm)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(pm)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(pm)}},lA=(0,Aj.ShowDocumentFeature)((0,ie.ProgressFeature)(ym)),$j;(function(t){function e(){return new mc}t.create=e})($j=ve.BulkRegistration||(ve.BulkRegistration={}));var mc=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=qr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=hm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},Oj;(function(t){function e(){return new Tu(void 0,[])}t.create=e})(Oj=ve.BulkUnregistration||(ve.BulkUnregistration={}));var Tu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=qr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},yc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof mc?this.registerMany(e):e instanceof Tu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=qr.string(r)?r:r.method,a=hm.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=qr.string(e)?e:e.method,i=hm.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new Tu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},gm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},cA=(0,Sj.FileOperationsFeature)((0,Tj.WorkspaceFoldersFeature)((0,vj.ConfigurationFeature)(gm))),gc=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},vc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Tc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._LanguagesImpl=Tc;var fA=(0,wj.MonikerFeature)((0,kj.DiagnosticFeature)((0,Ej.InlayHintFeature)((0,Pj.InlineValueFeature)((0,Cj.TypeHierarchyFeature)((0,bj.LinkedEditingRangeFeature)((0,Rj.SemanticTokensFeature)((0,_j.CallHierarchyFeature)(Tc)))))))),_c=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._NotebooksImpl=_c;var dA=(0,Nj.NotebookSyncFeature)(_c);function pA(t,e){return function(r){return e(t(r))}}ve.combineConsoleFeatures=pA;function hA(t,e){return function(r){return e(t(r))}}ve.combineTelemetryFeatures=hA;function mA(t,e){return function(r){return e(t(r))}}ve.combineTracerFeatures=mA;function yA(t,e){return function(r){return e(t(r))}}ve.combineClientFeatures=yA;function gA(t,e){return function(r){return e(t(r))}}ve.combineWindowFeatures=gA;function vA(t,e){return function(r){return e(t(r))}}ve.combineWorkspaceFeatures=vA;function TA(t,e){return function(r){return e(t(r))}}ve.combineLanguagesFeatures=TA;function _A(t,e){return function(r){return e(t(r))}}ve.combineNotebooksFeatures=_A;function Ij(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,pA),tracer:r(t.tracer,e.tracer,mA),telemetry:r(t.telemetry,e.telemetry,hA),client:r(t.client,e.client,yA),window:r(t.window,e.window,gA),workspace:r(t.workspace,e.workspace,vA),languages:r(t.languages,e.languages,TA),notebooks:r(t.notebooks,e.notebooks,_A)}}ve.combineFeatures=Ij;function Dj(t,e,r){let n=r&&r.console?new(r.console(hc)):new hc,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(gc)):new gc,o=r&&r.telemetry?new(r.telemetry(vc)):new vc,s=r&&r.client?new(r.client(yc)):new yc,u=r&&r.window?new(r.window(lA)):new lA,l=r&&r.workspace?new(r.workspace(cA)):new cA,c=r&&r.languages?new(r.languages(fA)):new fA,f=r&&r.notebooks?new(r.notebooks(dA)):new dA,m=[n,a,o,s,u,l,c,f];function v(b){return b instanceof Promise?b:qr.thenable(b)?new Promise((S,O)=>{b.then(F=>S(F),F=>O(F))}):Promise.resolve(b)}let y,R,P,E={listen:()=>i.listen(),sendRequest:(b,...S)=>i.sendRequest(qr.string(b)?b:b.method,...S),onRequest:(b,S)=>i.onRequest(b,S),sendNotification:(b,S)=>{let O=qr.string(b)?b:b.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(b,S)=>i.onNotification(b,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:b=>(R=b,{dispose:()=>{R=void 0}}),onInitialized:b=>i.onNotification(H.InitializedNotification.type,b),onShutdown:b=>(y=b,{dispose:()=>{y=void 0}}),onExit:b=>(P=b,{dispose:()=>{P=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:b=>i.onNotification(H.DidChangeConfigurationNotification.type,b),onDidChangeWatchedFiles:b=>i.onNotification(H.DidChangeWatchedFilesNotification.type,b),__textDocumentSync:void 0,onDidOpenTextDocument:b=>i.onNotification(H.DidOpenTextDocumentNotification.type,b),onDidChangeTextDocument:b=>i.onNotification(H.DidChangeTextDocumentNotification.type,b),onDidCloseTextDocument:b=>i.onNotification(H.DidCloseTextDocumentNotification.type,b),onWillSaveTextDocument:b=>i.onNotification(H.WillSaveTextDocumentNotification.type,b),onWillSaveTextDocumentWaitUntil:b=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,b),onDidSaveTextDocument:b=>i.onNotification(H.DidSaveTextDocumentNotification.type,b),sendDiagnostics:b=>i.sendNotification(H.PublishDiagnosticsNotification.type,b),onHover:b=>i.onRequest(H.HoverRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onCompletion:b=>i.onRequest(H.CompletionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCompletionResolve:b=>i.onRequest(H.CompletionResolveRequest.type,b),onSignatureHelp:b=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDeclaration:b=>i.onRequest(H.DeclarationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDefinition:b=>i.onRequest(H.DefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onTypeDefinition:b=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onImplementation:b=>i.onRequest(H.ImplementationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onReferences:b=>i.onRequest(H.ReferencesRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentHighlight:b=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentSymbol:b=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbol:b=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:b=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,b),onCodeAction:b=>i.onRequest(H.CodeActionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeActionResolve:b=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>b(S,O)),onCodeLens:b=>i.onRequest(H.CodeLensRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeLensResolve:b=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>b(S,O)),onDocumentFormatting:b=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:b=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:b=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>b(S,O)),onRenameRequest:b=>i.onRequest(H.RenameRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onPrepareRename:b=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>b(S,O)),onDocumentLinks:b=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentLinkResolve:b=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>b(S,O)),onDocumentColor:b=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onColorPresentation:b=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onFoldingRanges:b=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onSelectionRanges:b=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onExecuteCommand:b=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let b of m)b.attach(E);return i.onRequest(H.InitializeRequest.type,b=>{e.initialize(b),qr.string(b.trace)&&(a.trace=H.Trace.fromString(b.trace));for(let S of m)S.initialize(b.capabilities);if(R){let S=R(b,new H.CancellationTokenSource().token,(0,ie.attachWorkDone)(i,b),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=qr.number(E.__textDocumentSync)?E.__textDocumentSync:H.TextDocumentSyncKind.None:!qr.number(W.textDocumentSync)&&!qr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=qr.number(E.__textDocumentSync)?E.__textDocumentSync:H.TextDocumentSyncKind.None);for(let re of m)re.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of m)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{P&&P()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,b=>{a.trace=H.Trace.fromString(b.value)}),E}ve.createConnection=Dj});var vm=d(Kt=>{"use strict";var xj=Kt&&Kt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),AA=Kt&&Kt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&xj(e,t,r)};Object.defineProperty(Kt,"__esModule",{value:!0});Kt.ProposedFeatures=Kt.NotebookDocuments=Kt.TextDocuments=Kt.SemanticTokensBuilder=void 0;var Lj=tm();Object.defineProperty(Kt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return Lj.SemanticTokensBuilder}});AA(yt(),Kt);var qj=nm();Object.defineProperty(Kt,"TextDocuments",{enumerable:!0,get:function(){return qj.TextDocuments}});var Mj=am();Object.defineProperty(Kt,"NotebookDocuments",{enumerable:!0,get:function(){return Mj.NotebookDocuments}});AA(RA(),Kt);var Fj;(function(t){t.all={__brand:"features"}})(Fj=Kt.ProposedFeatures||(Kt.ProposedFeatures={}))});var bA=d(($fe,SA)=>{"use strict";SA.exports=yt()});var qe=d(In=>{"use strict";var jj=In&&In.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),PA=In&&In.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&jj(e,t,r)};Object.defineProperty(In,"__esModule",{value:!0});In.createConnection=void 0;var Rc=vm();PA(bA(),In);PA(vm(),In);var CA=!1,Gj={initialize:t=>{},get shutdownReceived(){return CA},set shutdownReceived(t){CA=t},exit:t=>{}};function Uj(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Rc.ConnectionStrategy.is(t)||Rc.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,Rc.createProtocolConnection)(a,o,l,s);return(0,Rc.createConnection)(u,Gj,i)}In.createConnection=Uj});var Tm=d((Sc,Ac)=>{var Hj=Sc&&Sc.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof Ac=="object"&&typeof Ac.exports=="object"){var e=t(Dl,Sc);e!==void 0&&(Ac.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,m){this._uri=l,this._languageId=c,this._version=f,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,m=l;f<m.length;f++){var v=m[f];if(u.isIncremental(v)){var y=o(v.range),R=this.offsetAt(y.start),P=this.offsetAt(y.end);this._content=this._content.substring(0,R)+v.text+this._content.substring(P,this._content.length);var E=Math.max(y.start.line,0),b=Math.max(y.end.line,0),S=this._lineOffsets,O=a(v.text,!1,R);if(b-E===O.length)for(var F=0,W=O.length;F<W;F++)S[F+E+1]=O[F];else O.length<1e4?S.splice.apply(S,Hj([E+1,b-E],O,!1)):this._lineOffsets=S=S.slice(0,E+1).concat(O,S.slice(b+1));var re=v.text.length-(P-R);if(re!==0)for(var F=E+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+re}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,m=c.length;if(m===0)return{line:0,character:l};for(;f<m;){var v=Math.floor((f+m)/2);c[v]>l?m=v:f=v+1}var y=f-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],m=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,m),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(m,v,y,R){return new r(m,v,y,R)}u.create=l;function c(m,v,y){if(m instanceof r)return m.update(v,y),m;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(m,v){for(var y=m.getText(),R=i(v.map(s),function(W,re){var Ne=W.range.start.line-re.range.start.line;return Ne===0?W.range.start.character-re.range.start.character:Ne}),P=0,E=[],b=0,S=R;b<S.length;b++){var O=S[b],F=m.offsetAt(O.range.start);if(F<P)throw new Error("Overlapping edit");F>P&&E.push(y.substring(P,F)),O.newText.length&&E.push(O.newText),P=m.offsetAt(O.range.end)}return E.push(y.substr(P)),E.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),m=u.slice(c);i(f,l),i(m,l);for(var v=0,y=0,R=0;v<f.length&&y<m.length;){var P=l(f[v],m[y]);P<=0?u[R++]=f[v++]:u[R++]=m[y++]}for(;v<f.length;)u[R++]=f[v++];for(;y<m.length;)u[R++]=m[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],m=0;m<u.length;m++){var v=u.charCodeAt(m);(v===13||v===10)&&(v===13&&m+1<u.length&&u.charCodeAt(m+1)===10&&m++,f.push(c+m+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var pr=d(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.isRootCstNode=It.isLeafCstNode=It.isCompositeCstNode=It.AbstractAstReflection=It.isLinkingError=It.isAstNodeDescription=It.isReference=It.isAstNode=void 0;function Rm(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}It.isAstNode=Rm;function EA(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}It.isReference=EA;function Kj(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}It.isAstNodeDescription=Kj;function Wj(t){return typeof t=="object"&&t!==null&&Rm(t.container)&&EA(t.reference)&&typeof t.message=="string"}It.isLinkingError=Wj;var _m=class{constructor(){this.subtypes={}}isInstance(e,r){return Rm(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};It.AbstractAstReflection=_m;function kA(t){return typeof t=="object"&&t!==null&&"children"in t}It.isCompositeCstNode=kA;function Bj(t){return typeof t=="object"&&t!==null&&"tokenType"in t}It.isLeafCstNode=Bj;function Vj(t){return kA(t)&&"fullText"in t}It.isRootCstNode=Vj});var Dt=d(He=>{"use strict";Object.defineProperty(He,"__esModule",{value:!0});He.Reduction=He.TreeStreamImpl=He.stream=He.DONE_RESULT=He.EMPTY_STREAM=He.StreamImpl=void 0;var Wt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Wt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return He.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=zj(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Wt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?He.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Wt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return He.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Wt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(bc(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return He.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Wt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(bc(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return He.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Wt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Wt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?He.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};He.StreamImpl=Wt;function zj(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function bc(t){return!!t&&typeof t[Symbol.iterator]=="function"}He.EMPTY_STREAM=new Wt(()=>{},()=>He.DONE_RESULT);He.DONE_RESULT=Object.freeze({done:!0,value:void 0});function Yj(...t){if(t.length===1){let e=t[0];if(e instanceof Wt)return e;if(bc(e))return new Wt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Wt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:He.DONE_RESULT)}return t.length>1?new Wt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];bc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return He.DONE_RESULT}):He.EMPTY_STREAM}He.stream=Yj;var Am=class extends Wt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return He.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};He.TreeStreamImpl=Am;var Xj;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(Xj=He.Reduction||(He.Reduction={}))});var Qe=d(Pe=>{"use strict";Object.defineProperty(Pe,"__esModule",{value:!0});Pe.getInteriorNodes=Pe.getStartlineNode=Pe.getNextNode=Pe.getPreviousNode=Pe.findLeafNodeAtOffset=Pe.isCommentNode=Pe.findCommentNode=Pe.findDeclarationNodeAtOffset=Pe.DefaultNameRegexp=Pe.toDocumentSegment=Pe.tokenToRange=Pe.isCstChildNode=Pe.flattenCst=Pe.streamCst=void 0;var Ro=pr(),Jj=Dt();function wA(t){return new Jj.TreeStreamImpl(t,e=>(0,Ro.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}Pe.streamCst=wA;function Qj(t){return wA(t).filter(Ro.isLeafCstNode)}Pe.flattenCst=Qj;function Zj(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}Pe.isCstChildNode=Zj;function eG(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}Pe.tokenToRange=eG;function tG(t){let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}Pe.toDocumentSegment=tG;Pe.DefaultNameRegexp=/^[\w\p{L}]$/u;function rG(t,e,r=Pe.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return bm(t,e)}}Pe.findDeclarationNodeAtOffset=rG;function nG(t,e){if(t){let r=$A(t,!0);if(r&&Sm(r,e))return r;if((0,Ro.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(Sm(a,e))return a}}}}Pe.findCommentNode=nG;function Sm(t,e){return(0,Ro.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}Pe.isCommentNode=Sm;function bm(t,e){if((0,Ro.isLeafCstNode)(t))return t;if((0,Ro.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<=n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return bm(a,e)}}}Pe.findLeafNodeAtOffset=bm;function $A(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getPreviousNode=$A;function iG(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getNextNode=iG;function aG(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}Pe.getStartlineNode=aG;function oG(t,e){let r=sG(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}Pe.getInteriorNodes=oG;function sG(t,e){let r=NA(t),n=NA(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function NA(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var Dn=d((_u,Cm)=>{(function(t,e){if(typeof _u=="object"&&typeof Cm=="object")Cm.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof _u=="object"?_u:t)[n]=r[n]}})(_u,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",m=0,v=-1,y=0,R=0;R<=u.length;++R){if(R<u.length)c=u.charCodeAt(R);else{if(c===47)break;c=47}if(c===47){if(!(v===R-1||y===1))if(v!==R-1&&y===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var P=f.lastIndexOf("/");if(P!==f.length-1){P===-1?(f="",m=0):m=(f=f.slice(0,P)).length-1-f.lastIndexOf("/"),v=R,y=0;continue}}else if(f.length===2||f.length===1){f="",m=0,v=R,y=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+u.slice(v+1,R):f=u.slice(v+1,R),m=R-v-1;v=R,y=0}else c===46&&y!==-1?++y:y=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(u===void 0&&(u=process.cwd()),m=u),a(m),m.length!==0&&(l=m+"/"+l,c=m.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,m=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,R=m<y?m:y,P=-1,E=0;E<=R;++E){if(E===R){if(y>R){if(l.charCodeAt(v+E)===47)return l.slice(v+E+1);if(E===0)return l.slice(v+E)}else m>R&&(u.charCodeAt(c+E)===47?P=E:E===0&&(P=0));break}var b=u.charCodeAt(c+E);if(b!==l.charCodeAt(v+E))break;b===47&&(P=E)}var S="";for(E=c+P+1;E<=f;++E)E!==f&&u.charCodeAt(E)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+P):(v+=P,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,m=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!m){f=v;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,m=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,R=-1;for(c=u.length-1;c>=0;--c){var P=u.charCodeAt(c);if(P===47){if(!v){f=c+1;break}}else R===-1&&(v=!1,R=c+1),y>=0&&(P===l.charCodeAt(y)?--y==-1&&(m=c):(y=-1,m=R))}return f===m?m=R:m===-1&&(m=u.length),u.slice(f,m)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else m===-1&&(v=!1,m=c+1);return m===-1?"":u.slice(f,m)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,m=!0,v=0,y=u.length-1;y>=0;--y){var R=u.charCodeAt(y);if(R!==47)f===-1&&(m=!1,f=y+1),R===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!m){c=y+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),m=f===47;m?(l.root="/",c=1):c=0;for(var v=-1,y=0,R=-1,P=!0,E=u.length-1,b=0;E>=c;--E)if((f=u.charCodeAt(E))!==47)R===-1&&(P=!1,R=E+1),f===46?v===-1?v=E:b!==1&&(b=1):v!==-1&&(b=-1);else if(!P){y=E+1;break}return v===-1||R===-1||b===0||b===1&&v===R-1&&v===y+1?R!==-1&&(l.base=l.name=y===0&&m?u.slice(1,R):u.slice(y,R)):(y===0&&m?(l.name=u.slice(1,v),l.base=u.slice(1,R)):(l.name=u.slice(y,v),l.base=u.slice(y,R)),l.ext=u.slice(v,R)),y>0?l.dir=u.slice(0,y-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var oe in B)Object.prototype.hasOwnProperty.call(B,oe)&&(j[oe]=B[oe])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,m=/^\//,v=/^\/\//;function y(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!f.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!m.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var R="",P="/",E=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,b=function(){function q(L,j,B,oe,se,ee){ee===void 0&&(ee=!1),typeof L=="object"?(this.scheme=L.scheme||R,this.authority=L.authority||R,this.path=L.path||R,this.query=L.query||R,this.fragment=L.fragment||R):(this.scheme=function(st,Xe){return st||Xe?st:"file"}(L,ee),this.authority=j||R,this.path=function(st,Xe){switch(st){case"https":case"http":case"file":Xe?Xe[0]!==P&&(Xe=P+Xe):Xe=P}return Xe}(this.scheme,B||R),this.query=oe||R,this.fragment=se||R,y(this,ee))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return Ne(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,oe=L.path,se=L.query,ee=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=R),B===void 0?B=this.authority:B===null&&(B=R),oe===void 0?oe=this.path:oe===null&&(oe=R),se===void 0?se=this.query:se===null&&(se=R),ee===void 0?ee=this.fragment:ee===null&&(ee=R),j===this.scheme&&B===this.authority&&oe===this.path&&se===this.query&&ee===this.fragment?this:new O(j,B,oe,se,ee)},q.parse=function(L,j){j===void 0&&(j=!1);var B=E.exec(L);return B?new O(B[2]||R,We(B[4]||R),We(B[5]||R),We(B[7]||R),We(B[9]||R),j):new O(R,R,R,R,R)},q.file=function(L){var j=R;if(c.isWindows&&(L=L.replace(/\\/g,P)),L[0]===P&&L[1]===P){var B=L.indexOf(P,2);B===-1?(j=L.substring(2),L=P):(j=L.substring(2,B),L=L.substring(B)||P)}return new O("file",j,L,R,R)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return y(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),V(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=b;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=Ne(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?V(this,!0):(this._formatted||(this._formatted=V(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(b),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,oe=-1,se=0;se<q.length;se++){var ee=q.charCodeAt(se);if(ee>=97&&ee<=122||ee>=65&&ee<=90||ee>=48&&ee<=57||ee===45||ee===46||ee===95||ee===126||L&&ee===47||j&&ee===91||j&&ee===93||j&&ee===58)oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B!==void 0&&(B+=q.charAt(se));else{B===void 0&&(B=q.substr(0,se));var st=F[ee];st!==void 0?(oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B+=st):oe===-1&&(oe=se)}}return oe!==-1&&(B+=encodeURIComponent(q.substring(oe))),B!==void 0?B:q}function re(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function Ne(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function V(q,L){var j=L?re:W,B="",oe=q.scheme,se=q.authority,ee=q.path,st=q.query,Xe=q.fragment;if(oe&&(B+=oe,B+=":"),(se||oe==="file")&&(B+=P,B+=P),se){var Ct=se.indexOf("@");if(Ct!==-1){var Qr=se.substr(0,Ct);se=se.substr(Ct+1),(Ct=Qr.lastIndexOf(":"))===-1?B+=j(Qr,!1,!1):(B+=j(Qr.substr(0,Ct),!1,!1),B+=":",B+=j(Qr.substr(Ct+1),!1,!0)),B+="@"}(Ct=(se=se.toLowerCase()).lastIndexOf(":"))===-1?B+=j(se,!1,!0):(B+=j(se.substr(0,Ct),!1,!0),B+=se.substr(Ct))}if(ee){if(ee.length>=3&&ee.charCodeAt(0)===47&&ee.charCodeAt(2)===58)(Ar=ee.charCodeAt(1))>=65&&Ar<=90&&(ee="/".concat(String.fromCharCode(Ar+32),":").concat(ee.substr(3)));else if(ee.length>=2&&ee.charCodeAt(1)===58){var Ar;(Ar=ee.charCodeAt(0))>=65&&Ar<=90&&(ee="".concat(String.fromCharCode(Ar+32),":").concat(ee.substr(2)))}B+=j(ee,!0,!1)}return st&&(B+="?",B+=j(st,!1,!1)),Xe&&(B+="#",B+=L?Xe:W(Xe,!1,!1)),B}function Ae(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Ae(q.substr(3)):q}}a.uriToFsPath=Ne;var Ye=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function We(q){return q.match(Ye)?q.replace(Ye,function(L){return Ae(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(m,v,y){if(y||arguments.length===2)for(var R,P=0,E=v.length;P<E;P++)!R&&P in v||(R||(R=Array.prototype.slice.call(v,0,P)),R[P]=v[P]);return m.concat(R||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return m.with({path:c.join.apply(c,s([m.path],v,!1))})},u.resolvePath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var R=m.path,P=!1;R[0]!==f&&(R=f+R,P=!0);var E=c.resolve.apply(c,s([R],v,!1));return P&&E[0]===f&&!m.authority&&(E=E.substring(1)),m.with({path:E})},u.dirname=function(m){if(m.path.length===0||m.path===f)return m;var v=c.dirname(m.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),m.with({path:v})},u.basename=function(m){return c.basename(m.path)},u.extname=function(m){return c.extname(m.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var Ru=d(Ao=>{"use strict";Object.defineProperty(Ao,"__esModule",{value:!0});Ao.eagerLoad=Ao.inject=void 0;function uG(t,e,r,n){let i=[t,e,r,n].reduce(LA,{});return xA(i)}Ao.inject=uG;var Pm=Symbol("isProxy");function DA(t){if(t&&t[Pm])for(let e of Object.values(t))DA(e);return t}Ao.eagerLoad=DA;function xA(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>IA(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(IA(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Pm]});return r[Pm]=!0,r}var OA=Symbol();function IA(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===OA)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=OA;try{t[e]=typeof i=="function"?i(n):xA(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function LA(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=LA(i,n):t[r]=n}}return t}});var Cr=d(Cc=>{"use strict";Object.defineProperty(Cc,"__esModule",{value:!0});Cc.MultiMap=void 0;var So=Dt(),Em=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return So.Reduction.sum((0,So.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,So.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,So.stream)(this.map.keys())}values(){return(0,So.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,So.stream)(this.map.entries())}};Cc.MultiMap=Em});var $e=d(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.isCharacterRange=A.CharacterRange=A.isAssignment=A.Assignment=A.isAlternatives=A.Alternatives=A.isAction=A.Action=A.isTypeAttribute=A.TypeAttribute=A.isType=A.Type=A.isTerminalRule=A.TerminalRule=A.isReturnType=A.ReturnType=A.isParserRule=A.ParserRule=A.isParameterReference=A.ParameterReference=A.isParameter=A.Parameter=A.isNegation=A.Negation=A.isNamedArgument=A.NamedArgument=A.isLiteralCondition=A.LiteralCondition=A.isInterface=A.Interface=A.isInferredType=A.InferredType=A.isGrammarImport=A.GrammarImport=A.isGrammar=A.Grammar=A.isDisjunction=A.Disjunction=A.isConjunction=A.Conjunction=A.isAtomType=A.AtomType=A.isAbstractElement=A.AbstractElement=A.isCondition=A.Condition=A.isAbstractType=A.AbstractType=A.isAbstractRule=A.AbstractRule=void 0;A.reflection=A.LangiumGrammarAstReflection=A.isWildcard=A.Wildcard=A.isUntilToken=A.UntilToken=A.isUnorderedGroup=A.UnorderedGroup=A.isTerminalRuleCall=A.TerminalRuleCall=A.isTerminalGroup=A.TerminalGroup=A.isTerminalAlternatives=A.TerminalAlternatives=A.isRuleCall=A.RuleCall=A.isRegexToken=A.RegexToken=A.isNegatedToken=A.NegatedToken=A.isKeyword=A.Keyword=A.isGroup=A.Group=A.isCrossReference=A.CrossReference=void 0;var lG=pr();A.AbstractRule="AbstractRule";function cG(t){return A.reflection.isInstance(t,A.AbstractRule)}A.isAbstractRule=cG;A.AbstractType="AbstractType";function fG(t){return A.reflection.isInstance(t,A.AbstractType)}A.isAbstractType=fG;A.Condition="Condition";function dG(t){return A.reflection.isInstance(t,A.Condition)}A.isCondition=dG;A.AbstractElement="AbstractElement";function pG(t){return A.reflection.isInstance(t,A.AbstractElement)}A.isAbstractElement=pG;A.AtomType="AtomType";function hG(t){return A.reflection.isInstance(t,A.AtomType)}A.isAtomType=hG;A.Conjunction="Conjunction";function mG(t){return A.reflection.isInstance(t,A.Conjunction)}A.isConjunction=mG;A.Disjunction="Disjunction";function yG(t){return A.reflection.isInstance(t,A.Disjunction)}A.isDisjunction=yG;A.Grammar="Grammar";function gG(t){return A.reflection.isInstance(t,A.Grammar)}A.isGrammar=gG;A.GrammarImport="GrammarImport";function vG(t){return A.reflection.isInstance(t,A.GrammarImport)}A.isGrammarImport=vG;A.InferredType="InferredType";function TG(t){return A.reflection.isInstance(t,A.InferredType)}A.isInferredType=TG;A.Interface="Interface";function _G(t){return A.reflection.isInstance(t,A.Interface)}A.isInterface=_G;A.LiteralCondition="LiteralCondition";function RG(t){return A.reflection.isInstance(t,A.LiteralCondition)}A.isLiteralCondition=RG;A.NamedArgument="NamedArgument";function AG(t){return A.reflection.isInstance(t,A.NamedArgument)}A.isNamedArgument=AG;A.Negation="Negation";function SG(t){return A.reflection.isInstance(t,A.Negation)}A.isNegation=SG;A.Parameter="Parameter";function bG(t){return A.reflection.isInstance(t,A.Parameter)}A.isParameter=bG;A.ParameterReference="ParameterReference";function CG(t){return A.reflection.isInstance(t,A.ParameterReference)}A.isParameterReference=CG;A.ParserRule="ParserRule";function PG(t){return A.reflection.isInstance(t,A.ParserRule)}A.isParserRule=PG;A.ReturnType="ReturnType";function EG(t){return A.reflection.isInstance(t,A.ReturnType)}A.isReturnType=EG;A.TerminalRule="TerminalRule";function kG(t){return A.reflection.isInstance(t,A.TerminalRule)}A.isTerminalRule=kG;A.Type="Type";function NG(t){return A.reflection.isInstance(t,A.Type)}A.isType=NG;A.TypeAttribute="TypeAttribute";function wG(t){return A.reflection.isInstance(t,A.TypeAttribute)}A.isTypeAttribute=wG;A.Action="Action";function $G(t){return A.reflection.isInstance(t,A.Action)}A.isAction=$G;A.Alternatives="Alternatives";function OG(t){return A.reflection.isInstance(t,A.Alternatives)}A.isAlternatives=OG;A.Assignment="Assignment";function IG(t){return A.reflection.isInstance(t,A.Assignment)}A.isAssignment=IG;A.CharacterRange="CharacterRange";function DG(t){return A.reflection.isInstance(t,A.CharacterRange)}A.isCharacterRange=DG;A.CrossReference="CrossReference";function xG(t){return A.reflection.isInstance(t,A.CrossReference)}A.isCrossReference=xG;A.Group="Group";function LG(t){return A.reflection.isInstance(t,A.Group)}A.isGroup=LG;A.Keyword="Keyword";function qG(t){return A.reflection.isInstance(t,A.Keyword)}A.isKeyword=qG;A.NegatedToken="NegatedToken";function MG(t){return A.reflection.isInstance(t,A.NegatedToken)}A.isNegatedToken=MG;A.RegexToken="RegexToken";function FG(t){return A.reflection.isInstance(t,A.RegexToken)}A.isRegexToken=FG;A.RuleCall="RuleCall";function jG(t){return A.reflection.isInstance(t,A.RuleCall)}A.isRuleCall=jG;A.TerminalAlternatives="TerminalAlternatives";function GG(t){return A.reflection.isInstance(t,A.TerminalAlternatives)}A.isTerminalAlternatives=GG;A.TerminalGroup="TerminalGroup";function UG(t){return A.reflection.isInstance(t,A.TerminalGroup)}A.isTerminalGroup=UG;A.TerminalRuleCall="TerminalRuleCall";function HG(t){return A.reflection.isInstance(t,A.TerminalRuleCall)}A.isTerminalRuleCall=HG;A.UnorderedGroup="UnorderedGroup";function KG(t){return A.reflection.isInstance(t,A.UnorderedGroup)}A.isUnorderedGroup=KG;A.UntilToken="UntilToken";function WG(t){return A.reflection.isInstance(t,A.UntilToken)}A.isUntilToken=WG;A.Wildcard="Wildcard";function BG(t){return A.reflection.isInstance(t,A.Wildcard)}A.isWildcard=BG;var Pc=class extends lG.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","Assignment","AtomType","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","RegexToken","ReturnType","RuleCall","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case A.Conjunction:case A.Disjunction:case A.LiteralCondition:case A.Negation:case A.ParameterReference:return this.isSubtype(A.Condition,r);case A.Interface:case A.Type:return this.isSubtype(A.AbstractType,r);case A.ParserRule:return this.isSubtype(A.AbstractRule,r)||this.isSubtype(A.AbstractType,r);case A.TerminalRule:return this.isSubtype(A.AbstractRule,r);case A.Action:return this.isSubtype(A.AbstractElement,r)||this.isSubtype(A.AbstractType,r);case A.Alternatives:case A.Assignment:case A.CharacterRange:case A.CrossReference:case A.Group:case A.Keyword:case A.NegatedToken:case A.RegexToken:case A.RuleCall:case A.TerminalAlternatives:case A.TerminalGroup:case A.TerminalRuleCall:case A.UnorderedGroup:case A.UntilToken:case A.Wildcard:return this.isSubtype(A.AbstractElement,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"AtomType:refType":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":return A.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return A.AbstractRule;case"Grammar:usedGrammars":return A.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return A.Parameter;case"TerminalRuleCall:rule":return A.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"AtomType":return{name:"AtomType",mandatory:[{name:"isArray",type:"boolean"},{name:"isRef",type:"boolean"}]};case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"Type":return{name:"Type",mandatory:[{name:"typeAlternatives",type:"array"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"},{name:"typeAlternatives",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};A.LangiumGrammarAstReflection=Pc;A.reflection=new Pc});var pi=d(vt=>{"use strict";Object.defineProperty(vt,"__esModule",{value:!0});vt.addSubTypes=vt.sortInterfacesTopologically=vt.mergeTypesAndInterfaces=vt.mergeInterfaces=vt.comparePropertyType=vt.collectSuperTypes=vt.collectChildrenTypes=vt.distinctAndSorted=vt.collectAllProperties=void 0;var VG=Cr(),ba=$e();function zG(t){let e=new VG.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.printingSuperTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}vt.collectAllProperties=zG;function km(t,e){return Array.from(new Set(t)).sort(e)}vt.distinctAndSorted=km;function qA(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,ba.isInterface)(u)?(i.add(u),qA(u,e,r,n).forEach(c=>i.add(c))):u&&(0,ba.isType)(u.$container)&&i.add(u.$container)}),i}vt.collectChildrenTypes=qA;function Nm(t){let e=new Set;return(0,ba.isInterface)(t)?(e.add(t),t.superTypes.forEach(r=>{if((0,ba.isInterface)(r.ref)){e.add(r.ref);let n=Nm(r.ref);for(let i of n)e.add(i)}})):(0,ba.isType)(t)&&t.typeAlternatives.forEach(r=>{var n;if(!((n=r.refType)===null||n===void 0)&&n.ref&&((0,ba.isInterface)(r.refType.ref)||(0,ba.isType)(r.refType.ref))){let i=Nm(r.refType.ref);for(let a of i)e.add(a)}}),e}vt.collectSuperTypes=Nm;function YG(t,e){return t.array===e.array&&t.reference===e.reference&&XG(t.types,e.types)}vt.comparePropertyType=YG;function XG(t,e,r=(n,i)=>n===i){let n=km(t),i=km(e);return n.length!==i.length?!1:i.every((a,o)=>r(a,n[o]))}function JG(t,e){return t.interfaces.concat(e.interfaces)}vt.mergeInterfaces=JG;function QG(t){return t.interfaces.concat(t.unions)}vt.mergeTypesAndInterfaces=QG;function ZG(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.realSuperTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}vt.sortInterfacesTopologically=ZG;function e2(t){var e;for(let r of t.values())for(let n of r.realSuperTypes)(e=t.get(n))===null||e===void 0||e.subTypes.add(r.name)}vt.addSubTypes=e2});var $m=d(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.processGeneratorNode=void 0;var Au=bo(),wm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}append(e){e.length>0&&this.lines[this.currentLineNumber].push(e)}increaseIndent(e){this.currentIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([])}};function t2(t,e){let r=new wm(e);return MA(t,r),r.content}Ec.processGeneratorNode=t2;function MA(t,e){typeof t=="string"?r2(t,e):t instanceof Au.IndentNode?n2(t,e):t instanceof Au.CompositeGeneratorNode?GA(t,e):t instanceof Au.NewLineNode&&i2(t,e)}function FA(t,e){return typeof t=="string"?UA(t):t instanceof Au.CompositeGeneratorNode?t.contents.some(r=>FA(r,e)):t instanceof Au.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function r2(t,e){t&&(e.pendingIndent&&jA(e,!1),e.append(t))}function jA(t,e){var r;let n="";for(let i of t.currentIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n),t.pendingIndent=!1}function GA(t,e){for(let r of t.contents)MA(r,e)}function n2(t,e){var r;if(FA(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation);try{e.increaseIndent(t),GA(t,e)}finally{e.decreaseIndent()}}}function i2(t,e){t.ifNotEmpty&&!UA(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&jA(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function UA(t){return t.trimStart()!==""}});var bo=d(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.NLEmpty=Ze.NL=Ze.NewLineNode=Ze.IndentNode=Ze.CompositeGeneratorNode=Ze.toString=Ze.isNewLineNode=Ze.isGeneratorNode=Ze.EOL=void 0;var a2=$m();Ze.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function HA(t){return t instanceof Su||t instanceof bu||t instanceof Ca}Ze.isGeneratorNode=HA;function o2(t){return t instanceof Ca}Ze.isNewLineNode=o2;function s2(t,e){return HA(t)?(0,a2.processGeneratorNode)(t,e):String(t)}Ze.toString=s2;var Su=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,r){return e?this.append(...r):this}appendNewLine(){return this.append(Ze.NL)}appendNewLineIf(e){return e?this.append(Ze.NL):this}appendNewLineIfNotEmpty(){return this.append(Ze.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}indent(e,r){let n=new bu(r,!1);return this.contents.push(n),e&&e(n),this}};Ze.CompositeGeneratorNode=Su;var bu=class extends Su{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Ze.IndentNode=bu;var Ca=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Ze.EOL,this.ifNotEmpty=r}};Ze.NewLineNode=Ca;Ze.NL=new Ca;Ze.NLEmpty=new Ca(void 0,!0)});var Hi=d(hr=>{"use strict";Object.defineProperty(hr,"__esModule",{value:!0});hr.propertyTypesToString=hr.TypeResolutionError=hr.InterfaceType=hr.UnionType=hr.isInterfaceType=hr.isUnionType=void 0;var Tt=bo(),kc=$m(),u2=Cr(),Co=pi();function l2(t){return t&&"alternatives"in t}hr.isUnionType=l2;function c2(t){return t&&"properties"in t}hr.isInterfaceType=c2;var Om=class{constructor(e,r,n){var i;this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.name=e,this.alternatives=r,this.reflection=(i=n?.reflection)!==null&&i!==void 0?i:!1}toAstTypesString(){let e=new Tt.CompositeGeneratorNode;return e.append(`export type ${this.name} = ${Nc(this.alternatives,"AstType")};`,Tt.NL),this.reflection&&(e.append(Tt.NL),WA(e,this.name)),(0,kc.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode;return r.append(`type ${xm(this.name,e)} = ${Nc(this.alternatives,"DeclaredType")};`,Tt.NL),(0,kc.processGeneratorNode)(r)}};hr.UnionType=Om;var Im=class{constructor(e,r,n){this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.printingSuperTypes=[],this.superProperties=new u2.MultiMap,this.name=e,this.realSuperTypes=new Set(r),this.printingSuperTypes=[...r],this.properties=n,n.forEach(i=>this.superProperties.add(i.name,i))}toAstTypesString(){let e=new Tt.CompositeGeneratorNode,r=this.printingSuperTypes.length>0?(0,Co.distinctAndSorted)([...this.printingSuperTypes]):["AstNode"];return e.append(`export interface ${this.name} extends ${r.join(", ")} {`,Tt.NL),e.indent(n=>{this.containerTypes.size>0&&n.append(`readonly $container: ${(0,Co.distinctAndSorted)([...this.containerTypes]).join(" | ")};`,Tt.NL),this.typeTypes.size>0&&n.append(`readonly $type: ${(0,Co.distinctAndSorted)([...this.typeTypes]).map(i=>`'${i}'`).join(" | ")};`,Tt.NL),KA(n,this.properties,"AstType")}),e.append("}",Tt.NL),e.append(Tt.NL),WA(e,this.name),(0,kc.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode,n=xm(this.name,e),i=Array.from(this.printingSuperTypes).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,Tt.NL),r.indent(a=>KA(a,this.properties,"DeclaredType",e)),r.append("}",Tt.NL),(0,kc.processGeneratorNode)(r)}};hr.InterfaceType=Im;var Dm=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};hr.TypeResolutionError=Dm;function Nc(t,e="AstType"){function r(n){let i=(0,Co.distinctAndSorted)(n.types).join(" | ");return i=n.reference?e==="AstType"?`Reference<${i}>`:`@${i}`:i,i=n.array?e==="AstType"?`Array<${i}>`:`${i}[]`:i,i}return(0,Co.distinctAndSorted)(t.map(r)).join(" | ")}hr.propertyTypesToString=Nc;function KA(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:xm(a.name,n),s=a.optional&&!a.typeAlternatives.some(l=>l.array)&&!a.typeAlternatives.every(l=>l.types.length===1&&l.types[0]==="boolean"),u=Nc(a.typeAlternatives,r);return`${o}${s?"?":""}: ${u}`}(0,Co.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),Tt.NL))}function WA(t,e){t.append(`export const ${e} = '${e}';`,Tt.NL),t.append(Tt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,Tt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,Tt.NL)),t.append("}",Tt.NL)}function xm(t,e){return e.has(t)?`^${t}`:t}});var Eo=d(Po=>{"use strict";Object.defineProperty(Po,"__esModule",{value:!0});Po.DefaultNameProvider=Po.isNamed=void 0;var f2=Et();function BA(t){return typeof t.name=="string"}Po.isNamed=BA;var Lm=class{getName(e){if(BA(e))return e.name}getNameNode(e){return(0,f2.findNodeForProperty)(e.$cstNode,"name")}};Po.DefaultNameProvider=Lm});var Ie=d(et=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.copyAstNode=et.findLocalReferences=et.streamReferences=et.streamAst=et.streamAllContents=et.streamContents=et.findRootNode=et.getDocument=et.hasContainerOfType=et.getContainerOfType=et.linkContentToContainer=void 0;var xn=pr(),Pa=Dt();function VA(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,xn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,xn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}et.linkContentToContainer=VA;function d2(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}et.getContainerOfType=d2;function p2(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}et.hasContainerOfType=p2;function zA(t){let r=YA(t).$document;if(!r)throw new Error("AST node has no document.");return r}et.getDocument=zA;function YA(t){for(;t.$container;)t=t.$container;return t}et.findRootNode=YA;function Mm(t){if(!t)throw new Error("Node must be an AstNode.");return new Pa.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,xn.isAstNode)(n))return e.keyIndex++,{done:!1,value:n};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,xn.isAstNode)(a))return{done:!1,value:a}}e.arrayIndex=0}}e.keyIndex++}return Pa.DONE_RESULT})}et.streamContents=Mm;function h2(t){if(!t)throw new Error("Root node must be an AstNode.");return new Pa.TreeStreamImpl(t,e=>Mm(e))}et.streamAllContents=h2;function XA(t){if(!t)throw new Error("Root node must be an AstNode.");return new Pa.TreeStreamImpl(t,e=>Mm(e),{includeRoot:!0})}et.streamAst=XA;function JA(t){return new Pa.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,xn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,xn.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return Pa.DONE_RESULT})}et.streamReferences=JA;function m2(t,e=zA(t).parseResult.value){let r=[];return XA(e).forEach(n=>{JA(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,Pa.stream)(r)}et.findLocalReferences=m2;function qm(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,xn.isAstNode)(i))r[n]=qm(i,e);else if((0,xn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,xn.isAstNode)(o)?a.push(qm(o,e)):(0,xn.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return VA(r),r}et.copyAstNode=qm});var Cu=d((QA,wc)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof wc=="object"&&wc.exports?wc.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:QA,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var R=this.disjunction();this.consumeChar("/");for(var P={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(P,"global");break;case"i":o(P,"ignoreCase");break;case"m":o(P,"multiLine");break;case"u":o(P,"unicode");break;case"y":o(P,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:P,value:R,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],R=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(R)}},t.prototype.alternative=function(){for(var y=[],R=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(R)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var R;switch(this.popChar()){case"=":R="Lookahead";break;case"!":R="NegativeLookahead";break}s(R);var P=this.disjunction();return this.consumeChar(")"),{type:R,value:P,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var R,P=this.idx;switch(this.popChar()){case"*":R={atLeast:0,atMost:1/0};break;case"+":R={atLeast:1,atMost:1/0};break;case"?":R={atLeast:0,atMost:1};break;case"{":var E=this.integerIncludingZero();switch(this.popChar()){case"}":R={atLeast:E,atMost:E};break;case",":var b;this.isDigit()?(b=this.integerIncludingZero(),R={atLeast:E,atMost:b}):R={atLeast:E,atMost:1/0},this.consumeChar("}");break}if(y===!0&&R===void 0)return;s(R);break}if(!(y===!0&&R===void 0))return s(R),this.peekChar(0)==="?"?(this.consumeChar("?"),R.greedy=!1):R.greedy=!0,R.type="Quantifier",R.loc=this.loc(P),R},t.prototype.atom=function(){var y,R=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(R),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,R=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,R=!0;break;case"s":y=m;break;case"S":y=m,R=!0;break;case"w":y=f;break;case"W":y=f,R=!0;break}return s(y),{type:"Set",value:y,complement:R}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var R=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:R}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],R=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),R=!0);this.isClassAtom();){var P=this.classAtom(),E=P.type==="Character";if(E&&this.isRangeDash()){this.consumeChar("-");var b=this.classAtom(),S=b.type==="Character";if(S){if(b.value<P.value)throw Error("Range out of order in character class");y.push({from:P.value,to:b.value})}else a(P.value,y),y.push(i("-")),a(b.value,y)}else a(P.value,y)}return this.consumeChar("]"),{type:"Set",complement:R,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var R=this.disjunction();this.consumeChar(")");var P={type:"Group",capturing:y,value:R};return y&&(P.idx=this.groupIdx),P},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var R="",P=0;P<y;P++){var E=this.popChar();if(e.test(E)===!1)throw Error("Expecting a HexDecimal digits");R+=E}var b=parseInt(R,16);return{type:"Character",value:b}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,R){y.length!==void 0?y.forEach(function(P){R.push(P)}):R.push(y)}function o(y,R){if(y[R]===!0)throw"duplicate flag "+R;y[R]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var m=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var R in y){var P=y[R];y.hasOwnProperty(R)&&(P.type!==void 0?this.visit(P):Array.isArray(P)&&P.forEach(function(E){this.visit(E)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var ko=d(Qt=>{"use strict";Object.defineProperty(Qt,"__esModule",{value:!0});Qt.partialRegex=Qt.partialMatches=Qt.getCaseInsensitivePattern=Qt.escapeRegExp=Qt.isWhitespaceRegExp=Qt.isMultilineComment=Qt.getTerminalParts=void 0;var ZA=Cu(),eS=new ZA.RegExpParser,Fm=class extends ZA.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=jm(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}},Ea=new Fm;function y2(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=eS.pattern(t),r=[];for(let n of e.value.value)Ea.reset(t),Ea.visit(n),r.push({start:Ea.startRegex,end:Ea.endRegex});return r}catch{return[]}}Qt.getTerminalParts=y2;function g2(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Ea.reset(t),Ea.visit(eS.pattern(t)),Ea.multiline}catch{return!1}}Qt.isMultilineComment=g2;function v2(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}Qt.isWhitespaceRegExp=v2;function jm(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}Qt.escapeRegExp=jm;function T2(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:jm(e)).join("")}Qt.getCaseInsensitivePattern=T2;function _2(t,e){let r=tS(t),n=e.match(r);return!!n&&n[0].length>0}Qt.partialMatches=_2;function tS(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}Qt.partialRegex=tS});var kt=d(le=>{"use strict";var R2=le&&le.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),A2=le&&le.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),S2=le&&le.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&R2(e,t,r);return A2(e,t),e};Object.defineProperty(le,"__esModule",{value:!0});le.isPrimitiveType=le.extractAssignments=le.resolveTransitiveImports=le.resolveImport=le.resolveImportUri=le.terminalRegex=le.getRuleType=le.getActionType=le.getExplicitRuleType=le.getTypeNameWithoutError=le.getTypeName=le.getActionAtElement=le.isDataTypeRule=le.isArrayOperator=le.isArrayCardinality=le.isOptionalCardinality=void 0;var be=S2($e()),rS=Dn(),$c=Ie(),b2=Hi(),C2=ko();function P2(t){return t==="?"||t==="*"}le.isOptionalCardinality=P2;function E2(t){return t==="*"||t==="+"}le.isArrayCardinality=E2;function k2(t){return t==="+="}le.isArrayOperator=k2;function Hm(t){return nS(t,new Set)}le.isDataTypeRule=Hm;function nS(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,$c.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!nS(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function iS(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(be.isAction(a))return a;{let o=(0,$c.streamAllContents)(r[i]).find(be.isAction);if(o)return o}}}if(be.isAbstractElement(e))return iS(e)}le.getActionAtElement=iS;function Km(t){var e;if(be.isParserRule(t))return Hm(t)?t.name:(e=Wm(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=aS(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new b2.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}le.getTypeName=Km;function N2(t){try{return Km(t)}catch{return"never"}}le.getTypeNameWithoutError=N2;function Wm(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}le.getExplicitRuleType=Wm;function aS(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Km(t.type.ref)}le.getActionType=aS;function w2(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Hm(t)?t.name:(n=Wm(t))!==null&&n!==void 0?n:t.name}le.getRuleType=w2;function oS(t){return Pu(t.definition)}le.terminalRegex=oS;var Bm=/[\s\S]/.source;function Pu(t){if(be.isTerminalAlternatives(t))return $2(t);if(be.isTerminalGroup(t))return O2(t);if(be.isCharacterRange(t))return x2(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return hi(oS(e),t.cardinality)}else{if(be.isNegatedToken(t))return D2(t);if(be.isUntilToken(t))return I2(t);if(be.isRegexToken(t))return hi(t.regex,t.cardinality,!1);if(be.isWildcard(t))return hi(Bm,t.cardinality);throw new Error("Invalid terminal element.")}}function $2(t){return hi(t.elements.map(Pu).join("|"),t.cardinality)}function O2(t){return hi(t.elements.map(Pu).join(""),t.cardinality)}function I2(t){return hi(`${Bm}*?${Pu(t.terminal)}`,t.cardinality)}function D2(t){return hi(`(?!${Pu(t.terminal)})${Bm}*?`,t.cardinality)}function x2(t){return t.right?hi(`[${Gm(t.left)}-${Gm(t.right)}]`,t.cardinality,!1):hi(Gm(t.left),t.cardinality,!1)}function Gm(t){return(0,C2.escapeRegExp)(t.value)}function hi(t,e,r=!0){return r&&(t=`(${t})`),e?`${t}${e}`:t}function sS(t){if(t.path===void 0||t.path.length===0)return;let e=rS.Utils.dirname((0,$c.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),rS.Utils.resolvePath(e,r)}le.resolveImportUri=sS;function Vm(t,e){let r=sS(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch{}}le.resolveImport=Vm;function L2(t,e){if(be.isGrammarImport(e)){let r=Vm(t,e);if(r){let n=Um(t,r);return n.push(r),n}return[]}else return Um(t,e)}le.resolveTransitiveImports=L2;function Um(t,e,r=e,n=new Set,i=new Set){let a=(0,$c.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=Vm(t,o);s&&Um(t,s,r,n,i)}}return Array.from(i)}function uS(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>uS(e)):[]}le.extractAssignments=uS;var q2=["string","number","boolean","Date","bigint"];function M2(t){return q2.includes(t)}le.isPrimitiveType=M2});var pS=d(Ic=>{"use strict";Object.defineProperty(Ic,"__esModule",{value:!0});Ic.collectInferredTypes=void 0;var F2=Eo(),lS=Cr(),j2=Dt(),Nt=$e(),mi=kt(),G2=pi(),Oc=Hi(),zm=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:this.copyTypeAlternative(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return dS(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(this.copyTypeAlternative(e));return n}copyTypeAlternative(e){function r(n){return{name:n.name,optional:n.optional,typeAlternatives:n.typeAlternatives,astNodes:n.astNodes}}return{name:e.name,super:e.super,ruleCalls:e.ruleCalls,properties:e.properties.map(n=>r(n))}}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=ka();r.parents=e;for(let n of e)n.children.push(r);return r}};function U2(t,e){var r;let n=[],i={fragments:new Map};for(let u of t)n.push(...cS(i,u));let a=V2(n),o=Y2(a),s=X2(a,o);for(let u of e){let l=(0,Nt.isAlternatives)(u.definition)&&u.definition.elements.every(c=>(0,Nt.isKeyword)(c))?(0,j2.stream)(u.definition.elements).filter(Nt.isKeyword).map(c=>`'${c.value}'`).toArray():[(r=(0,mi.getExplicitRuleType)(u))!==null&&r!==void 0?r:"string"];s.unions.push(new Oc.UnionType(u.name,Eu(!1,!1,l)))}return s}Ic.collectInferredTypes=U2;function cS(t,e){let r=ka(e),n=new zm(t,r);return e.definition&&Ym(n,n.root,e.definition),n.getTypes()}function ka(t){return{name:(0,Nt.isParserRule)(t)||(0,Nt.isAction)(t)?(0,mi.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Ym(t,e,r){let n=(0,mi.isOptionalCardinality)(r.cardinality);if((0,Nt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,ka()));for(let a of r.elements){let o=t.connect(e,ka());i.push(Ym(t,o,a))}return t.merge(...i)}else if((0,Nt.isGroup)(r)||(0,Nt.isUnorderedGroup)(r)){let i=t.connect(e,ka());for(let a of r.elements)i=Ym(t,i,a);if(n){let a=t.connect(e,ka());return t.merge(a,i)}else return i}else{if((0,Nt.isAction)(r))return H2(t,e,r);(0,Nt.isAssignment)(r)?K2(e,r):(0,Nt.isRuleCall)(r)&&W2(t,e,r)}return e}function H2(t,e,r){var n;let i=t.connect(e,ka(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,F2.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,typeAlternatives:Eu(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function K2(t,e){let r={types:new Set,reference:!1};fS(e.terminal,r);let n=Eu(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,mi.isOptionalCardinality)(e.cardinality),typeAlternatives:n,astNodes:new Set([e])})}function fS(t,e){if((0,Nt.isAlternatives)(t)||(0,Nt.isUnorderedGroup)(t)||(0,Nt.isGroup)(t))for(let r of t.elements)fS(r,e);else(0,Nt.isKeyword)(t)?e.types.add(`'${t.value}'`):(0,Nt.isRuleCall)(t)&&t.rule.ref?e.types.add((0,mi.getRuleType)(t.rule.ref)):(0,Nt.isCrossReference)(t)&&t.type.ref&&(e.types.add((0,mi.getTypeNameWithoutError)(t.type.ref)),e.reference=!0)}function W2(t,e,r){let n=r.rule.ref;if((0,Nt.isParserRule)(n)&&n.fragment){let i=B2(n,t.context);(0,mi.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,Nt.isParserRule)(n)&&e.ruleCalls.push((0,mi.getRuleType)(n))}function B2(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,mi.getTypeNameWithoutError)(t),a=cS(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function V2(t){let e=new Map,r=[],n=dS(t).map(i=>i.alt);for(let i of n){let a=new Oc.InterfaceType(i.name,i.super,i.properties);e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.realSuperTypes.add(i.name)}return Array.from(e.values())}function dS(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new lS.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let m=a.find(v=>v.name===f.name);m?(f.typeAlternatives.filter(z2(m.typeAlternatives)).forEach(v=>m.typeAlternatives.push(v)),f.astNodes.forEach(v=>m.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function z2(t){return e=>!t.some(r=>(0,G2.comparePropertyType)(r,e))}function Y2(t){let e=[],r=new lS.MultiMap;for(let n of t)for(let i of n.realSuperTypes)r.add(i,n.name);for(let[n,i]of r.entriesGroupedByKey())t.some(a=>a.name===n)||e.push(new Oc.UnionType(n,Eu(!1,!1,i),{reflection:!0}));return e}function X2(t,e){var r;for(let a of t)for(let o of a.realSuperTypes)(r=t.find(s=>s.name===o))===null||r===void 0||r.subTypes.add(a.name);let n={interfaces:[],unions:e},i=new Set(e.map(a=>a.name));for(let a of t)if(a.properties.length===0&&a.subTypes.size>0){let o=Eu(!1,!1,Array.from(a.subTypes)),s=e.find(u=>u.name===a.name);if(s)s.alternatives.push(...o);else{let u=new Oc.UnionType(a.name,o,{reflection:!0});u.realSuperTypes=a.realSuperTypes,n.unions.push(u),i.add(a.name)}}else n.interfaces.push(a);for(let a of n.interfaces)a.printingSuperTypes=[...a.realSuperTypes].filter(o=>!i.has(o));return n}function Eu(t,e,r){return t||e?[{array:t,reference:e,types:r}]:r.map(n=>({array:t,reference:e,types:[n]}))}});var gS=d(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.collectDeclaredTypes=void 0;var yS=kt(),hS=Hi();function J2(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=n.superTypes.filter(o=>o.ref).map(o=>(0,yS.getTypeNameWithoutError)(o.ref)),a=n.attributes.map(o=>({name:o.name,optional:o.isOptional===!0,typeAlternatives:o.typeAlternatives.map(mS),astNodes:new Set([o])}));r.interfaces.push(new hS.InterfaceType(n.name,i,a))}for(let n of e){let i=n.typeAlternatives.map(mS),a=n.typeAlternatives.length>1&&n.typeAlternatives.some(o=>{var s;return((s=o.refType)===null||s===void 0?void 0:s.ref)!==void 0});r.unions.push(new hS.UnionType(n.name,i,{reflection:a}))}return r}Dc.collectDeclaredTypes=J2;function mS(t){var e,r;let n=[];return t.refType?n=[t.refType.ref?(0,yS.getTypeNameWithoutError)(t.refType.ref):t.refType.$refText]:n=[(e=t.primitiveType)!==null&&e!==void 0?e:`'${(r=t.keywordType)===null||r===void 0?void 0:r.value}'`],{types:n,reference:t.isRef===!0,array:t.isArray===!0}}});var Jm=d(No=>{"use strict";Object.defineProperty(No,"__esModule",{value:!0});No.collectAllAstResources=No.collectTypeResources=void 0;var Q2=pS(),Z2=gS(),eU=Ie(),tU=Cr(),rU=$e(),vS=kt(),nU=pi(),iU=Hi();function aU(t,e){let r=Xm(t,e),n=(0,Q2.collectInferredTypes)(r.parserRules,r.datatypeRules),i=(0,Z2.collectDeclaredTypes)(r.interfaces,r.types);return sU(n,i),oU((0,nU.mergeInterfaces)(n,i)),{astResources:r,inferred:n,declared:i}}No.collectTypeResources=aU;function oU(t){function e(r,n=new Set){if(!n.has(r)){n.add(r);for(let i of r.printingSuperTypes){let a=t.find(o=>o.name===i);a&&(0,iU.isInterfaceType)(a)&&(e(a),a.superProperties.entriesGroupedByKey().forEach(o=>r.superProperties.addAll(o[0],o[1])))}}}for(let r of t)e(r)}function sU(t,e){let r=new tU.MultiMap,n=t.unions.concat(e.unions);for(let a of n)if(a.reflection)for(let o of a.alternatives)o.types.forEach(s=>r.add(s,a.name));function i(a,o,s){var u;let l=(u=a.interfaces.find(c=>c.name===o))!==null&&u!==void 0?u:a.unions.find(c=>c.name===o);l&&s.forEach(c=>l.realSuperTypes.add(c))}for(let[a,o]of r.entriesGroupedByKey())i(t,a,o),i(e,a,o)}function Xm(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,eU.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,rU.isParserRule)(o)&&!o.fragment&&((0,vS.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,vS.resolveImport)(e,s));Xm(o,e,r,n)}}}return n}No.collectAllAstResources=Xm});var AS=d(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.specifyAstNodeProperties=wo.collectAst=void 0;var _S=pi(),Qm=Hi(),uU=Jm(),lU=kt();function cU(t,e){let{inferred:r,declared:n}=(0,uU.collectTypeResources)(t,e),i={interfaces:(0,_S.sortInterfacesTopologically)(TS(r.interfaces,n.interfaces)),unions:TS(r.unions,n.unions)};return RS(i),i}wo.collectAst=cU;function TS(t,e){return Array.from(t.concat(e).reduce((r,n)=>(r.set(n.name,n),r),new Map).values()).sort((r,n)=>r.name.localeCompare(n.name))}function RS(t){let e=dU(t);(0,_S.addSubTypes)(e),pU(e),fU(e)}wo.specifyAstNodeProperties=RS;function fU(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeTypes.add(n.name);let i=Array.from(n.realSuperTypes).map(a=>t.get(a)).filter(a=>a!==void 0);for(let a of i)n.typeTypes.forEach(o=>a.typeTypes.add(o));e.push(...i.filter(a=>!r.has(a)))}}function dU({interfaces:t,unions:e}){let r=t.concat(e).reduce((a,o)=>(a.set(o.name,o),a),new Map),n=new Map;function i(a,o=new Set){if(n.has(a))return n.get(a);if(o.has(a))return!0;o.add(a);let s=a.alternatives.flatMap(u=>u.types).filter(u=>!(0,lU.isPrimitiveType)(u));if(s.length===0)return!0;for(let u of s){let l=r.get(u);if(l&&((0,Qm.isInterfaceType)(l)||(0,Qm.isUnionType)(l)&&!i(l,o)))return!1}return!0}for(let a of e){let o=i(a);n.set(a,o)}for(let[a,o]of n)o&&r.delete(a.name);return r}function pU(t){var e;let r=Array.from(t.values()),n=r.filter(a=>(0,Qm.isInterfaceType)(a));for(let a of n){let o=a.properties.flatMap(s=>s.typeAlternatives.filter(u=>!u.reference).flatMap(u=>u.types));for(let s of o)(e=t.get(s))===null||e===void 0||e.containerTypes.add(a.name)}let i=hU(r);mU(i)}function hU(t){function e(i){let a=[i];n.add(i.name);let o=[...i.subTypes,...i.realSuperTypes];for(let s of o)if(!n.has(s)){let u=t.find(l=>l.name===s);u&&a.push(...e(u))}return a}let r=[],n=new Set;for(let i of t)n.has(i.name)||r.push(e(i));return r}function mU(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var Zm=d(xc=>{"use strict";Object.defineProperty(xc,"__esModule",{value:!0});xc.interpretAstReflection=void 0;var yU=pr(),SS=Cr(),gU=$e(),vU=AS(),TU=pi();function _U(t,e){let r;(0,gU.isGrammar)(t)?r=(0,vU.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=RU(r),a=AU(r),o=bU(r);return{getAllTypes(){return n},getReferenceType(s){let u=`${s.container.$type}:${s.property}`,l=i.get(u);if(l)return l;throw new Error("Could not find reference type for "+u)},getTypeMetaData(s){var u;return(u=a.get(s))!==null&&u!==void 0?u:{name:s,mandatory:[]}},isInstance(s,u){return(0,yU.isAstNode)(s)&&this.isSubtype(s.$type,u)},isSubtype(s,u){if(s===u)return!0;let l=o.get(s);for(let c of l)if(this.isSubtype(c,u))return!0;return!1}}}xc.interpretAstReflection=_U;function RU(t){let e=new SS.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of i.typeAlternatives)a.reference&&e.add(n.name,[i.name,a.types[0]]);for(let i of n.printingSuperTypes){let a=e.get(i);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function AU(t){let e=new Map,r=(0,TU.collectAllProperties)(t.interfaces);for(let n of t.interfaces){let i=r.get(n.name),a=i.filter(s=>s.typeAlternatives.some(u=>u.array)),o=i.filter(s=>s.typeAlternatives.every(u=>!u.array&&u.types.includes("boolean")));(a.length>0||o.length>0)&&e.set(n.name,{name:n.name,mandatory:SU(a,o)})}return e}function SU(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}function bU(t){let e=new SS.MultiMap;for(let r of t.interfaces)e.addAll(r.name,r.realSuperTypes);for(let r of t.unions)e.addAll(r.name,r.realSuperTypes);return e}});var bS=d(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.LangiumGrammarGrammar=void 0;var CU=Et(),Lc,PU=()=>Lc??(Lc=(0,CU.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "LangiumGrammar",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Grammar",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isDeclared",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "grammar"
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@57"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "with"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "usedGrammars",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@57"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "usedGrammars",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@57"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "definesHiddenTokens",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "hidden"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@8"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@57"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": ","
                          },
                          {
                            "$type": "Assignment",
                            "feature": "hiddenTokens",
                            "operator": "+=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/rules@8"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@57"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          }
                        ],
                        "cardinality": "*"
                      }
                    ],
                    "cardinality": "?"
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ],
                "cardinality": "?"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "imports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "rules",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "interfaces",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "types",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@7"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Interface",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "superTypes",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "superTypes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SchemaType",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "attributes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAttribute",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@56"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "isOptional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@4"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAlternatives",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "typeAlternatives",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "typeAlternatives",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@5"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AtomType",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "primitiveType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "isRef",
                        "operator": "?=",
                        "terminal": {
                          "$type": "Keyword",
                          "value": "@"
                        },
                        "cardinality": "?"
                      },
                      {
                        "$type": "Assignment",
                        "feature": "refType",
                        "operator": "=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/types@0"
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "isArray",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "[]"
                },
                "cardinality": "?"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "keywordType",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@22"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimitiveType",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "string"
          },
          {
            "$type": "Keyword",
            "value": "number"
          },
          {
            "$type": "Keyword",
            "value": "boolean"
          },
          {
            "$type": "Keyword",
            "value": "Date"
          },
          {
            "$type": "Keyword",
            "value": "bigint"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@4"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractRule",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GrammarImport",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Assignment",
            "feature": "path",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParserRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "entry",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "entry"
                }
              },
              {
                "$type": "Assignment",
                "feature": "fragment",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "fragment"
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "wildcard",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "*"
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "returns"
                  },
                  {
                    "$type": "Alternatives",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "returnType",
                        "operator": "=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/types@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@57"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Assignment",
                        "feature": "dataType",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@6"
                          },
                          "arguments": []
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": false
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "definesHiddenTokens",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "hidden"
                }
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "hiddenTokens",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@8"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@57"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@8"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@57"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@14"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InferredType",
      "parameters": [
        {
          "$type": "Parameter",
          "name": "imperative"
        }
      ],
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "ParameterReference",
                  "parameter": {
                    "$ref": "#/rules@11/parameters@0"
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infer"
                  }
                ]
              },
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "Negation",
                  "value": {
                    "$type": "ParameterReference",
                    "parameter": {
                      "$ref": "#/rules@11/parameters@0"
                    }
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infers"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleNameAndParams",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@13"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "parameters",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@13"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@57"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Alternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@15"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConditionalBranch",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                }
              },
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "guardCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ">"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@18"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnorderedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnorderedGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "&"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@17"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Group",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@18"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTokenWithCardinality",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@34"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@21"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Action",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Action"
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "type",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@57"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": true
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "feature",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@56"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "+="
                    }
                  ]
                }
              },
              {
                "$type": "Keyword",
                "value": "current"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Keyword",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@58"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleCall",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@8"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@57"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@24"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@24"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NamedArgument",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@13"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@57"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "calledByName",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "="
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LiteralCondition",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "true",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Disjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Disjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Conjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Conjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "&"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@28"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Negation",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Negation"
                }
              },
              {
                "$type": "Keyword",
                "value": "!"
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@28"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Atom",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedCondition",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterReference",
      "definition": {
        "$type": "Assignment",
        "feature": "parameter",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/rules@13"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedKeyword",
      "inferredType": {
        "$type": "InferredType",
        "name": "Keyword"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "RuleCall"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@8"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@57"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@24"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@24"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Assignment"
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "feature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@56"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "+="
                },
                {
                  "$type": "Keyword",
                  "value": "="
                },
                {
                  "$type": "Keyword",
                  "value": "?="
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedAssignableElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@35"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReference",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CrossReference"
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/types@0"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "deprecatedSyntax",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "|"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ":"
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "terminal",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@39"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReferenceableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "Group"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@14"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@57"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "hidden",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "hidden"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "fragment",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "fragment"
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@57"
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@57"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "returns"
                      },
                      {
                        "$type": "Assignment",
                        "feature": "type",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@42"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "?"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@45"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "RegexLiteral",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalAlternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@47"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalTokenElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedTerminalElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "TerminalRuleCall"
            }
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@43"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@57"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NegatedToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "NegatedToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@48"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UntilToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "UntilToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@48"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RegexToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "RegexToken"
            }
          },
          {
            "$type": "Assignment",
            "feature": "regex",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@44"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wildcard",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Wildcard"
            }
          },
          {
            "$type": "Keyword",
            "value": "."
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CharacterRange",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CharacterRange"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@22"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ".."
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@22"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FeatureName",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "current"
          },
          {
            "$type": "Keyword",
            "value": "entry"
          },
          {
            "$type": "Keyword",
            "value": "extends"
          },
          {
            "$type": "Keyword",
            "value": "false"
          },
          {
            "$type": "Keyword",
            "value": "fragment"
          },
          {
            "$type": "Keyword",
            "value": "grammar"
          },
          {
            "$type": "Keyword",
            "value": "hidden"
          },
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Keyword",
            "value": "returns"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Keyword",
            "value": "infer"
          },
          {
            "$type": "Keyword",
            "value": "infers"
          },
          {
            "$type": "Keyword",
            "value": "with"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\^?[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"[^\\"]*\\"|'[^']*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "types": [
    {
      "$type": "Type",
      "typeAlternatives": [
        {
          "$type": "AtomType",
          "refType": {
            "$ref": "#/rules@1"
          },
          "isArray": false,
          "isRef": false
        },
        {
          "$type": "AtomType",
          "refType": {
            "$ref": "#/rules@7"
          },
          "isArray": false,
          "isRef": false
        },
        {
          "$type": "AtomType",
          "refType": {
            "$ref": "#/rules@20/definition/elements@0"
          },
          "isArray": false,
          "isRef": false
        },
        {
          "$type": "AtomType",
          "refType": {
            "$ref": "#/rules@10"
          },
          "isArray": false,
          "isRef": false
        }
      ],
      "name": "AbstractType"
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`));qc.LangiumGrammarGrammar=PU});var CS=d(Mr=>{"use strict";Object.defineProperty(Mr,"__esModule",{value:!0});Mr.LangiumGrammarGeneratedModule=Mr.LangiumGrammarGeneratedSharedModule=Mr.LangiumGrammarParserConfig=Mr.LangiumGrammarLanguageMetaData=void 0;var EU=$e(),kU=bS();Mr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Mr.LangiumGrammarParserConfig={maxLookahead:3};Mr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new EU.LangiumGrammarAstReflection};Mr.LangiumGrammarGeneratedModule={Grammar:()=>(0,kU.LangiumGrammarGrammar)(),LanguageMetaData:()=>Mr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Mr.LangiumGrammarParserConfig}}});var Fr=d(_t=>{"use strict";Object.defineProperty(_t,"__esModule",{value:!0});_t.Deferred=_t.MutexLock=_t.interruptAndCheck=_t.isOperationCancelled=_t.OperationCancelled=_t.setInterruptionPeriod=_t.startCancelableOperation=_t.delayNextTick=void 0;var Mc=fi();function PS(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}_t.delayNextTick=PS;var ey=0,ES=10;function NU(){return ey=Date.now(),new Mc.CancellationTokenSource}_t.startCancelableOperation=NU;function wU(t){ES=t}_t.setInterruptionPeriod=wU;_t.OperationCancelled=Symbol("OperationCancelled");function kS(t){return t===_t.OperationCancelled}_t.isOperationCancelled=kS;async function $U(t){if(t===Mc.CancellationToken.None)return;let e=Date.now();if(e-ey>=ES&&(ey=e,await PS()),t.isCancellationRequested)throw _t.OperationCancelled}_t.interruptAndCheck=$U;var ty=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Mc.CancellationTokenSource}lock(e){this.cancel();let r=new Mc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{kS(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};_t.MutexLock=ty;var ry=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};_t.Deferred=ry});var jc=d(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.DefaultScopeComputation=void 0;var ny=fi(),NS=Ie(),OU=Cr(),wS=Fr(),iy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=ny.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=NS.streamContents,i=ny.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,wS.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=ny.CancellationToken.None){let n=e.parseResult.value,i=new OU.MultiMap;for(let a of(0,NS.streamAllContents)(n))await(0,wS.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};Fc.DefaultScopeComputation=iy});var Uc=d(Ki=>{"use strict";Object.defineProperty(Ki,"__esModule",{value:!0});Ki.DefaultScopeProvider=Ki.EMPTY_SCOPE=Ki.StreamScope=void 0;var IU=Ie(),Gc=Dt(),$o=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};Ki.StreamScope=$o;Ki.EMPTY_SCOPE={getElement(){},getAllElements(){return Gc.EMPTY_STREAM}};var ay=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,IU.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Gc.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new $o((0,Gc.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Gc.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new $o(i,r,n)}getGlobalScope(e,r){return new $o(this.indexManager.allElements(e))}};Ki.DefaultScopeProvider=ay});var yi=d(Oo=>{"use strict";Object.defineProperty(Oo,"__esModule",{value:!0});Oo.relativeURI=Oo.equalURI=void 0;function DU(t,e){return t?.toString()===e?.toString()}Oo.equalURI=DU;function xU(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}Oo.relativeURI=xU});var OS=d(Io=>{"use strict";Object.defineProperty(Io,"__esModule",{value:!0});Io.LangiumGrammarScopeComputation=Io.LangiumGrammarScopeProvider=void 0;var LU=jc(),oy=Uc(),ku=Ie(),$S=Dt(),qU=yi(),jr=$e(),sy=kt(),uy=class extends oy.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===jr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,ku.getDocument)(r.container).precomputedScopes,a=(0,ku.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,$S.stream)(s).filter(u=>u.type===jr.Interface||u.type===jr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,ku.getContainerOfType)(r.container,jr.isGrammar);if(!n)return oy.EMPTY_SCOPE;let i=(0,$S.stream)(n.imports).map(sy.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,qU.equalURI)(o.documentUri,s)));return e===jr.AbstractType&&(a=a.filter(o=>o.type===jr.Interface||o.type===jr.Type)),new oy.StreamScope(a)}};Io.LangiumGrammarScopeProvider=uy;var ly=class extends LU.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,jr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push({node:a,name:a.name,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(a)})}(0,ku.streamAllContents)(e).forEach(a=>{if((0,jr.isAction)(a)&&a.inferredType){let o=(0,sy.getActionType)(a);o&&r.push({node:e,name:o,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)})}})}}processNode(e,r,n){(0,jr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,jr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,{node:o,name:o.name,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(o)})}}processActionNode(e,r,n){let i=(0,ku.findRootNode)(e);if(i&&(0,jr.isAction)(e)&&e.inferredType){let a=(0,sy.getActionType)(e);a&&n.add(i,{node:e,name:a,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(e)})}}};Io.LangiumGrammarScopeComputation=ly});var my=d(lr=>{"use strict";var MU=lr&&lr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),FU=lr&&lr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),jU=lr&&lr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&MU(e,t,r);return FU(e,t),e};Object.defineProperty(lr,"__esModule",{value:!0});lr.LangiumGrammarValidator=lr.IssueCodes=lr.registerValidationChecks=void 0;var cy=fo(),Wi=Ie(),Bi=Cr(),fy=Qe(),Vi=Et(),dy=Dt(),Ve=jU($e()),py=$e(),xt=kt();function GU(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],AtomType:[r.checkAtomTypeRefType,r.checkFragmentsInTypes]};e.register(n,r)}lr.registerValidationChecks=GU;var ur;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(ur=lr.IssueCodes||(lr.IssueCodes={}));var hy=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:ur.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Ve.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Ve.isParserRule(a)&&!(0,xt.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:ur.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,xt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,dy.stream)(i.rules).filter(a=>!Nu(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,dy.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new Bi.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,xt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Bi.MultiMap;for(let i of e.imports){let a=(0,xt.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[cy.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,xt.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new Bi.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,dy.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,xt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Ve.isParserRule)){if(Nu(u))continue;let l=(0,xt.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,xt.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:ur.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=(0,Vi.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:ur.InvalidInfers,data:m&&(0,fy.toDocumentSegment)(m)})}}else if(l&&c){let m=(0,Vi.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:ur.InvalidInfers,data:m&&(0,fy.toDocumentSegment)(m)})}}for(let u of(0,Wi.streamAllContents)(e).filter(Ve.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,xt.getTypeNameWithoutError)(u);if(u.type&&o.has(f)===c){let m=c?(0,Vi.findNodeForKeyword)(u.$cstNode,"infer"):(0,Vi.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?ur.SuperfluousInfer:ur.MissingInfer,data:m&&(0,fy.toDocumentSegment)(m)})}else if(l&&o.has(f)&&c&&u.$cstNode){let m=(0,Vi.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,Vi.findNodeForKeyword)(u.$cstNode,"{");m&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:ur.SuperfluousInfer,data:{start:v.range.end,end:m.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:ur.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,xt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,Wi.getContainerOfType)(e,i=>Ve.isTerminalRule(i)||Ve.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ve.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ve.isTerminalRule(n)&&n.fragment&&(0,Wi.getContainerOfType)(e,Ve.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:ur.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,xt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:ur.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:ur.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,Vi.getAllReachableRules)(e,!0);for(let i of e.rules)Ve.isTerminalRule(i)&&i.hidden||Nu(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[cy.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Bi.MultiMap,i=new Set;for(let l of e.rules)Ve.isTerminalRule(l)&&l.name&&n.add(l.name,l),Ve.isParserRule(l)&&(0,Wi.streamAllContents)(l).filter(Ve.isKeyword).forEach(f=>i.add(f.value));let a=new Bi.MultiMap,o=new Bi.MultiMap;for(let l of e.imports){let c=(0,xt.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let m of f.rules)Ve.isTerminalRule(m)&&m.name?a.add(m.name,l):Ve.isParserRule(m)&&m.name&&(0,Wi.streamAllContents)(m).filter(Ve.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new Bi.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new Bi.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>u.add(m,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!Nu(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:ur.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&UU.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,Wi.getContainerOfType)(e,py.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,xt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:ur.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,Wi.streamAllContents)(e).filter(Ve.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[cy.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(Nu(e))return;let n=e.dataType,i=(0,xt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,py.isRuleCall)(e.terminal)&&(0,py.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,Wi.streamAllContents)(e.terminal).map(a=>Ve.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){e.attributes.filter(n=>n.typeAlternatives.length>1).forEach(n=>{let i=o=>o.isRef?"ref":"other",a=i(n.typeAlternatives[0]);n.typeAlternatives.slice(1).some(o=>i(o)!==a)&&r("error",this.createMixedTypeError(n.name),{node:n,property:"typeAlternatives"})})}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,xt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Ve.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Ve.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,Vi.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Ve.isRuleCall(e.terminal)&&Ve.isParserRule(e.terminal.rule.ref)&&!(0,xt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkAtomTypeRefType(e,r){if(e?.refType){let n=this.checkReferenceToRuleButNotType(e?.refType);n&&r("error",n,{node:e,property:"refType"})}}checkFragmentsInTypes(e,r){var n,i;Ve.isParserRule((n=e.refType)===null||n===void 0?void 0:n.ref)&&(!((i=e.refType)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"refType"})}checkReferenceToRuleButNotType(e){if(e&&Ve.isParserRule(e.ref)&&!(0,xt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,xt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Ve.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};lr.LangiumGrammarValidator=hy;function Nu(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var UU=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var Wc=d(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.DocumentValidator=pn.toDiagnosticSeverity=pn.getDiagnosticRange=pn.DefaultDocumentValidator=void 0;var Gr=qe(),IS=Et(),HU=Ie(),KU=Qe(),Hc=Fr(),yy=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Gr.CancellationToken.None){let n=e.parseResult,i=[];await(0,Hc.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Gr.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Kc.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Gr.Range.create(0,0,0,0);else{let u=Gr.Position.create(s.endLine-1,s.endColumn);o=Gr.Range.create(u,u)}}}else o=(0,KU.tokenToRange)(a.token);if(o){let s={severity:Gr.DiagnosticSeverity.Error,range:o,message:a.message,code:Kc.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Kc.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Hc.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Hc.interruptAndCheck)(r),i}async validateAst(e,r,n=Gr.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,HU.streamAst)(e).map(async o=>{await(0,Hc.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:DS(n),severity:xS(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};pn.DefaultDocumentValidator=yy;function DS(t){if(Gr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,IS.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,IS.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}pn.getDiagnosticRange=DS;function xS(t){switch(t){case"error":return Gr.DiagnosticSeverity.Error;case"warning":return Gr.DiagnosticSeverity.Warning;case"info":return Gr.DiagnosticSeverity.Information;case"hint":return Gr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}pn.toDiagnosticSeverity=xS;var Kc;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Kc=pn.DocumentValidator||(pn.DocumentValidator={}))});var jS=d(Ln=>{"use strict";var WU=Ln&&Ln.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),BU=Ln&&Ln.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),VU=Ln&&Ln.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&WU(e,t,r);return BU(e,t),e};Object.defineProperty(Ln,"__esModule",{value:!0});Ln.LangiumGrammarCodeActionProvider=void 0;var Ur=qe(),zU=Dn(),LS=Ie(),qS=Qe(),YU=Et(),MS=ko(),FS=yi(),XU=Wc(),gy=VU($e()),Hr=my(),vy=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Hr.IssueCodes.GrammarNameUppercase:case Hr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Hr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Hr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Hr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Hr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Hr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Hr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Hr.IssueCodes.InvalidInfers:case Hr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Hr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Hr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case XU.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,qS.findLeafNodeAtOffset)(i,n),o=(0,LS.getContainerOfType)(a?.element,gy.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,MS.escapeRegExp)(s)}-${(0,MS.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,YU.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&gy.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,qS.findLeafNodeAtOffset)(a,i),s=(0,LS.getContainerOfType)(o?.element,gy.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(m=>m.name===r.refText),l=[],c=-1,f=-1;for(let m of u){if((0,FS.equalURI)(m.documentUri,n.uri))continue;let v=JU(n.uri,m.documentUri),y,R="",P=n.parseResult.value,E=P.imports.find(b=>b.path&&v<b.path);if(E)y=(i=E.$cstNode)===null||i===void 0?void 0:i.range.start;else if(P.imports.length>0){let b=P.imports[P.imports.length-1].$cstNode.range.end;b&&(y={line:b.line+1,character:0})}else P.rules.length>0&&(y=(a=P.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,R=`
`);y&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Ur.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${R}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Ln.LangiumGrammarCodeActionProvider=vy;function JU(t,e){let r=zU.Utils.dirname(t),n=(0,FS.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Vc=d(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.DefaultFoldingRangeProvider=void 0;var Ty=qe(),QU=Ie(),ZU=Qe(),_y=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,QU.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,ZU.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,Ty.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),Ty.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===Ty.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Bc.DefaultFoldingRangeProvider=_y});var GS=d(zc=>{"use strict";Object.defineProperty(zc,"__esModule",{value:!0});zc.LangiumGrammarFoldingRangeProvider=void 0;var eH=Vc(),tH=$e(),Ry=class extends eH.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,tH.isParserRule)(e)}};zc.LangiumGrammarFoldingRangeProvider=Ry});var by=d(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.Formatting=hn.FormattingRegion=hn.DefaultNodeFormatter=hn.AbstractFormatter=void 0;var Yc=Et(),Ay=pr(),rH=Ie(),US=Qe(),wu=Dt(),Sy=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Xc(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let m=this.nodeModeToKey(s,u),v=i.get(m),y=(c=l.options.priority)!==null&&c!==void 0?c:0,R=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||R<=y)&&i.set(m,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,rH.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,m=(0,Ay.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),y=r.get(v);if(r.delete(v),y){let E=this.createTextEdit(l,f,y,a);for(let b of E)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}let R=this.nodeModeToKey(f,"append"),P=r.get(R);if(r.delete(R),P){let E=(0,US.getNextNode)(f);if(E){let b=this.createTextEdit(f,E,P,a);for(let S of b)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!y&&f.hidden){let E=this.createHiddenTextEdits(l,f,void 0,a);for(let b of E)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}m&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let R=r.text.split(`
`);R[0]=l+R[0];for(let P=0;P<R.length;P++){let E=o+P,b={character:0,line:E};if(v>0)s.push({newText:y,range:{start:b,end:b}});else{let S=R[P],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:b,end:{line:E,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return u!==void 0?m.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?m.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(o,Boolean(e),i)),(0,Ay.isLeafCstNode)(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new wu.TreeStreamImpl(i,a=>this.iterateCst(a,r)):wu.EMPTY_STREAM}iterateCst(e,r){if(!(0,Ay.isCompositeCstNode)(e))return wu.EMPTY_STREAM;let n=r.indentation;return new wu.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,wu.DONE_RESULT))}};hn.AbstractFormatter=Sy;var Xc=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new mr(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new mr(r,this.collector)}property(e,r){let n=(0,Yc.findNodeForProperty)(this.astNode.$cstNode,e,r);return new mr(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,Yc.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new mr(r,this.collector)}keyword(e,r){let n=(0,Yc.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new mr(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,Yc.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new mr(r,this.collector)}cst(e){return new mr([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new mr([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new mr((0,US.getInteriorNodes)(a,o),this.collector)}};hn.DefaultNodeFormatter=Xc;var mr=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new mr(this.nodes.slice(e,r),this.collector)}};hn.FormattingRegion=mr;var nH;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var m,v,y,R,P,E;let b=(m=c.lines)!==null&&m!==void 0?m:0,S=(v=f.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,F=(R=f.tabs)!==null&&R!==void 0?R:0,W=(P=c.characters)!==null&&P!==void 0?P:0,re=(E=f.characters)!==null&&E!==void 0?E:0;return b<S?-1:b>S?1:O<F?-1:O>F?1:W<re?-1:W>re?1:0}})(nH=hn.Formatting||(hn.Formatting={}))});var HS=d(qn=>{"use strict";var iH=qn&&qn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),aH=qn&&qn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),oH=qn&&qn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&iH(e,t,r);return aH(e,t),e};Object.defineProperty(qn,"__esModule",{value:!0});qn.LangiumGrammarFormatter=void 0;var Ee=by(),zi=oH($e()),Cy=class extends Ee.AbstractFormatter{format(e){if(zi.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Ee.Formatting.noSpace());else if(zi.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Ee.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Ee.Formatting.oneSpace()):r.property("name").append(Ee.Formatting.noSpace()),r.properties("parameters").append(Ee.Formatting.noSpace()),r.keywords(",").append(Ee.Formatting.oneSpace()),r.keywords("<").append(Ee.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Ee.Formatting.noSpace()),r.interior(i,n).prepend(Ee.Formatting.indent()),n.prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(),Ee.Formatting.newLine())),r.node(e).prepend(Ee.Formatting.noIndent())}else if(zi.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Ee.Formatting.oneSpace()),r.keyword("returns").append(Ee.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Ee.Formatting.oneSpace()),r.keyword(":").prepend(Ee.Formatting.noSpace()),r.keyword(";").prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(),Ee.Formatting.newLine())),r.node(e).prepend(Ee.Formatting.noIndent())}else if(zi.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Ee.Formatting.noSpace()),r.keywords(".","+=","=").surround(Ee.Formatting.noSpace()),r.keyword("}").prepend(Ee.Formatting.noSpace())}else if(zi.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Ee.Formatting.oneSpace());else if(zi.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Ee.Formatting.noSpace());else if(zi.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Ee.Formatting.noSpace()),r.keyword(",").append(Ee.Formatting.oneSpace()),r.properties("arguments").append(Ee.Formatting.noSpace())}zi.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Ee.Formatting.noSpace())}};qn.LangiumGrammarFormatter=Cy});var Zc=d(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.SemanticTokensDecoder=Rt.AbstractSemanticTokenProvider=Rt.SemanticTokensBuilder=Rt.DefaultSemanticTokenOptions=Rt.AllSemanticTokenModifiers=Rt.AllSemanticTokenTypes=void 0;var pe=qe(),Jc=Et(),sH=Ie();Rt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};Rt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};Rt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Rt.AllSemanticTokenTypes),tokenModifiers:Object.keys(Rt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var Qc=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Rt.SemanticTokensBuilder=Qc;var Py=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Qc;return this.tokensBuilders.set(e.uri.toString(),n),n}computeHighlighting(e,r,n){let i=e.parseResult.value;if(this.highlightElement(i,r)==="prune")return;let a=(0,sH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){if(n.isCancellationRequested)break;let s=o.value,u=s.$cstNode.range,l=this.compareRange(u);if(l===1)break;if(l===-1)continue;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}compareRange(e){if(!this.currentRange)return 0;let r=typeof e=="number"?e:e.start.line;return(typeof e=="number"?e:e.end.line)<this.currentRange.start.line?-1:r>this.currentRange.end.line?1:0}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.compareRange(n)!==0||!this.currentDocument||!this.currentTokensBuilder)return;let o=Rt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=Rt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,m-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let m=u+1;m<l;m++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,Jc.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,Jc.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,Jc.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,Jc.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Rt.AbstractSemanticTokenProvider=Py;var uH;(function(t){function e(n,i){let a=new Map;Object.entries(Rt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(uH=Rt.SemanticTokensDecoder||(Rt.SemanticTokensDecoder={}))});var KS=d(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.LangiumGrammarSemanticTokenProvider=void 0;var Yi=qe(),lH=Zc(),Xi=$e(),Ey=class extends lH.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,Xi.isAssignment)(e)?r({node:e,property:"feature",type:Yi.SemanticTokenTypes.property}):(0,Xi.isAction)(e)?e.feature&&r({node:e,property:"feature",type:Yi.SemanticTokenTypes.property}):(0,Xi.isReturnType)(e)?r({node:e,property:"name",type:Yi.SemanticTokenTypes.type}):(0,Xi.isAtomType)(e)?(e.primitiveType||e.refType)&&r({node:e,property:e.primitiveType?"primitiveType":"refType",type:Yi.SemanticTokenTypes.type}):(0,Xi.isParameter)(e)?r({node:e,property:"name",type:Yi.SemanticTokenTypes.parameter}):(0,Xi.isParameterReference)(e)?r({node:e,property:"parameter",type:Yi.SemanticTokenTypes.parameter}):(0,Xi.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:Yi.SemanticTokenTypes.type}):(0,Xi.isTypeAttribute)(e)&&r({node:e,property:"name",type:Yi.SemanticTokenTypes.property})}};ef.LangiumGrammarSemanticTokenProvider=Ey});var BS=d(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.LangiumGrammarNameProvider=void 0;var cH=Eo(),fH=Et(),WS=$e(),ky=class extends cH.DefaultNameProvider{getName(e){return(0,WS.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,WS.isAssignment)(e)?(0,fH.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};tf.LangiumGrammarNameProvider=ky});var $y=d(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.DefaultReferences=void 0;var dH=Et(),VS=pr(),Ji=Ie(),Ny=Qe(),zS=Dt(),pH=yi(),wy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,dH.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,VS.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,VS.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,Ny.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n||r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,zS.stream)(n)}findLocalReferences(e,r=!1){let i=(0,Ji.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,Ji.streamAst)(i).forEach(o=>{(0,Ji.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,Ji.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,Ji.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,Ny.toDocumentSegment)(u),local:(0,pH.equalURI)((0,Ji.getDocument)(u.element).uri,(0,Ji.getDocument)(e).uri)})}})}),(0,zS.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,Ji.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,Ny.toDocumentSegment)(r),local:!0}}}};rf.DefaultReferences=wy});var ZS=d(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.LangiumGrammarReferences=void 0;var hH=$y(),Zt=Ie(),YS=Qe(),XS=Et(),JS=Dt(),Oy=yi(),Bt=$e(),QS=kt(),nf=pi(),Iy=class extends hH.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,XS.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Bt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Bt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Bt.isTypeAttribute)(e)){let i=(0,Zt.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Bt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,Zt.getContainerOfType)(e,Bt.isInterface);if(a){let o=(0,nf.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,Oy.equalURI)((0,Zt.getDocument)(e).uri,(0,Zt.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,JS.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,Zt.getContainerOfType)(e,Bt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,nf.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,JS.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Bt.isParserRule)(e)){let i=(0,QS.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,Zt.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,Zt.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,YS.toDocumentSegment)(a),local:(0,Oy.equalURI)((0,Zt.getDocument)(i).uri,(0,Zt.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,XS.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,Zt.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,Zt.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,YS.toDocumentSegment)(a),local:(0,Oy.equalURI)((0,Zt.getDocument)(e).uri,(0,Zt.getDocument)(r).uri)})}let i=(0,Zt.getContainerOfType)(e,Bt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,Zt.getContainerOfType)(e,Bt.isParserRule),i=(0,QS.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Bt.isInterface)(n.returnType.ref)||(0,Bt.isType)(n.returnType.ref))){let a=(0,nf.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,nf.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Bt.isParserRule)(o)||(0,Bt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,Zt.streamAst)(r).filter(a=>{var o,s;return(0,Bt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Bt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Bt.isParserRule)(a)||(0,Bt.isAction)(a))&&n.push(a)}),n}};af.LangiumGrammarReferences=Iy});var Ly=d(Kr=>{"use strict";var mH=Kr&&Kr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),yH=Kr&&Kr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),gH=Kr&&Kr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&mH(e,t,r);return yH(e,t),e};Object.defineProperty(Kr,"__esModule",{value:!0});Kr.findFirstFeatures=Kr.findNextFeatures=void 0;var er=gH($e()),gi=kt(),vH=pr(),TH=Ie(),_H=Et();function RH(t,e){let r={stacks:t,tokens:e};return AH(r),r.stacks.flat().forEach(i=>{i.property=void 0}),r0(r.stacks).map(i=>i[i.length-1])}Kr.findNextFeatures=RH;function Dy(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(er.isGroup(u.$container)){s=u.$container;break}else if(er.isAbstractElement(u.$container))u=u.$container;else break;if((0,gi.isArrayCardinality)(u.cardinality)){let l=Do({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...t0({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,gi.isOptionalCardinality)(c.feature.cardinality)||(0,gi.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Dy({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function e0(t){return(0,vH.isAstNode)(t)&&(t={feature:t}),Do({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Kr.findFirstFeatures=e0;function Do(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(er.isGroup(u)){if(o.has(u))return[];o.add(u)}if(er.isGroup(u))return t0(i,0,a,o,s).map(c=>of(c,u.cardinality,a));if(er.isAlternatives(u)||er.isUnorderedGroup(u))return u.elements.flatMap(c=>Do({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>of(c,u.cardinality,a));if(er.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return Do({next:c,cardinalities:a,visited:o,plus:s}).map(f=>of(f,u.cardinality,a))}else{if(er.isAction(u))return Dy({next:{feature:u,new:!0,type:(0,gi.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(er.isRuleCall(u)&&er.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,gi.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return Do({next:f,cardinalities:a,visited:o,plus:s}).map(m=>of(m,u.cardinality,a))}else return[i]}}function of(t,e,r){return r.set(t.feature,e),t}function t0(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...Do({next:s,cardinalities:r,visited:n,plus:i})),!!(0,gi.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function AH(t){for(let e of t.tokens){let r=r0(t.stacks,e);t.stacks=r}}function r0(t,e){let r=[];for(let n of t)r.push(...SH(n,e));return r}function SH(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(bH)),i=[];for(;t.length>0;){let a=t.pop(),o=Dy({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?xy(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,gi.isOptionalCardinality)(s.feature.cardinality)||(0,gi.isOptionalCardinality)(r.get(s.feature))))break}return i}function bH(t){if(t.cardinality==="+")return!0;let e=(0,TH.getContainerOfType)(t,er.isAssignment);return!!(e&&e.cardinality==="+")}function xy(t,e){if(er.isKeyword(t))return t.value===e.image;if(er.isRuleCall(t))return CH(t.rule.ref,e);if(er.isCrossReference(t)){let r=(0,_H.getCrossReferenceTerminal)(t);if(r)return xy(r,e)}return!1}function CH(t,e){return er.isParserRule(t)?e0(t.definition).some(n=>xy(n.feature,e)):er.isTerminalRule(t)?new RegExp((0,gi.terminalRegex)(t)).test(e.image):!1}});var My=d(Mn=>{"use strict";var PH=Mn&&Mn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),EH=Mn&&Mn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),kH=Mn&&Mn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&PH(e,t,r);return EH(e,t),e};Object.defineProperty(Mn,"__esModule",{value:!0});Mn.DefaultCompletionProvider=void 0;var $u=qe(),Ou=kH($e()),NH=kt(),wH=Ie(),$H=Qe(),n0=Et(),i0=Dt(),sf=Ly(),qy=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=E=>{let b=this.fillCompletionItem(o,u,E);b&&a.push(b)},c=(0,$H.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let E=(0,n0.getEntryRule)(this.grammar);return await this.completionForRule(f,E,l),$u.CompletionList.create(a,!0)}let m=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,m),y=[],R=this.canReparse()&&u!==m;R&&(y=this.findFeaturesAt(o,u));let P=E=>Ou.isKeyword(E.feature)?E.feature.value:E.feature;return await Promise.all((0,i0.stream)(v).distinct(P).map(E=>this.completionFor(f,E,l))),R&&await Promise.all((0,i0.stream)(y).exclude(v,P).distinct(P).map(E=>this.completionFor(f,E,l))),$u.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:$u.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,n0.getEntryRule)(this.grammar),l=(0,sf.findFirstFeatures)({feature:u.definition,new:!0,type:(0,NH.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,sf.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,sf.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(Ou.isParserRule(r)){let i=(0,sf.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(Ou.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(Ou.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,wH.getContainerOfType)(r.feature,Ou.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:$u.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:$u.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return a0<=e&&e<=o0&&OH<=r&&r<=IH||e===s0&&r!==s0}toUpperCharCode(e){return a0<=e&&e<=o0?e-32:e}};Mn.DefaultCompletionProvider=qy;var a0="a".charCodeAt(0),o0="z".charCodeAt(0),OH="A".charCodeAt(0),IH="Z".charCodeAt(0),s0="_".charCodeAt(0)});var l0=d(u0=>{"use strict";Object.defineProperty(u0,"__esModule",{value:!0})});var jy=d(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.DefaultDocumentHighlightProvider=void 0;var DH=qe(),xH=Ie(),LH=Qe(),qH=yi(),Fy=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,LH.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,qH.equalURI)((0,xH.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return DH.DocumentHighlight.create(e.segment.range)}};uf.DefaultDocumentHighlightProvider=Fy});var f0=d(c0=>{"use strict";Object.defineProperty(c0,"__esModule",{value:!0})});var Uy=d(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.DefaultDocumentSymbolProvider=void 0;var MH=qe(),FH=Ie(),Gy=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,FH.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return MH.SymbolKind.Field}};lf.DefaultDocumentSymbolProvider=Gy});var d0=d(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.AbstractExecuteCommandHandler=void 0;var jH=qe(),Hy=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=jH.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};cf.AbstractExecuteCommandHandler=Hy});var Wy=d(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.DefaultDefinitionProvider=void 0;var GH=qe(),UH=Ie(),HH=Qe(),Ky=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,HH.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[GH.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,UH.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};ff.DefaultDefinitionProvider=Ky});var Vy=d(xo=>{"use strict";Object.defineProperty(xo,"__esModule",{value:!0});xo.MultilineCommentHoverProvider=xo.AstNodeHoverProvider=void 0;var p0=Qe(),df=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,p0.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};xo.AstNodeHoverProvider=df;var By=class extends df{constructor(){super(...arguments),this.commentContentRegex=/\/\*([\s\S]*?)\*\//}getAstNodeHoverContent(e){let r=(0,p0.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules),n;if(r){let i=this.commentContentRegex.exec(r.text);i&&i[1]&&(n=this.getCommentContent(i[1]))}if(n)return{contents:{kind:"markdown",value:n}}}getCommentContent(e){return e.split(`
`).map(n=>(n=n.trim(),n.startsWith("*")&&(n=n.substring(1).trim()),n)).join(" ").trim()}};xo.MultilineCommentHoverProvider=By});var h0=d(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.AbstractGoToImplementationProvider=void 0;var KH=qe(),WH=Qe(),zy=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=KH.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,WH.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};pf.AbstractGoToImplementationProvider=zy});var Qi=d(vi=>{"use strict";Object.defineProperty(vi,"__esModule",{value:!0});vi.DefaultLangiumDocuments=vi.DefaultLangiumDocumentFactory=vi.DocumentState=void 0;var BH=Tm(),VH=Dn(),zH=Dt(),Lo;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Lo=vi.DocumentState||(vi.DocumentState={}));var Yy=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??VH.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:Lo.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:Lo.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=Lo.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=BH.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};vi.DefaultLangiumDocumentFactory=Yy;var Xy=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,zH.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Lo.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Lo.Changed,this.documentMap.delete(r)),n}};vi.DefaultLangiumDocuments=Xy});var Qy=d(qo=>{"use strict";Object.defineProperty(qo,"__esModule",{value:!0});qo.mergeSignatureHelpOptions=qo.AbstractSignatureHelpProvider=void 0;var YH=qe(),XH=Qe(),Jy=class{provideSignatureHelp(e,r,n=YH.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,XH.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};qo.AbstractSignatureHelpProvider=Jy;function JH(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}qo.mergeSignatureHelpOptions=JH});var tg=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createRequestHandler=Q.createServerRequestHandler=Q.createCallHierarchyRequestHandler=Q.addCallHierarchyHandler=Q.addCodeLensHandler=Q.addSignatureHelpHandler=Q.addDocumentLinkHandler=Q.addExecuteCommandHandler=Q.addConfigurationChangeHandler=Q.addSemanticTokenHandler=Q.addRenameHandler=Q.addFormattingHandler=Q.addFoldingRangeHandler=Q.addHoverHandler=Q.addDocumentHighlightsHandler=Q.addGoToDeclarationHandler=Q.addGoToImplementationHandler=Q.addGoToTypeDefinitionHandler=Q.addGotoDefinitionHandler=Q.addDocumentSymbolHandler=Q.addCodeActionHandler=Q.addFindReferencesHandler=Q.addCompletionHandler=Q.addDiagnosticsHandler=Q.addDocumentsHandler=Q.startLanguageServer=Q.DefaultLanguageServer=void 0;var yr=qe(),Mo=Dn(),m0=Ru(),QH=Fr(),ZH=Qi(),eK=Zc(),tK=Qy(),Zy=class{constructor(e){this.onInitializeEmitter=new yr.Emitter,this.onInitializedEmitter=new yr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,m0.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,m0.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var Ae;return(Ae=V.lsp.Formatter)===null||Ae===void 0?void 0:Ae.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,tK.mergeSignatureHelpOptions)(n.map(V=>{var Ae;return(Ae=V.lsp.SignatureHelp)===null||Ae===void 0?void 0:Ae.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),m=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=this.hasService(V=>V.lsp.ReferencesProvider),R=this.hasService(V=>V.lsp.DocumentSymbolProvider),P=this.hasService(V=>V.lsp.DefinitionProvider),E=this.hasService(V=>V.lsp.DocumentHighlightProvider),b=this.hasService(V=>V.lsp.FoldingRangeProvider),S=this.hasService(V=>V.lsp.HoverProvider),O=this.hasService(V=>V.lsp.RenameProvider),F=this.hasService(V=>V.lsp.CallHierarchyProvider),W=this.services.lsp.CodeLensProvider,re=this.hasService(V=>V.lsp.DeclarationProvider);return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:yr.TextDocumentSyncKind.Incremental,completionProvider:v?{}:void 0,referencesProvider:y,documentSymbolProvider:R,definitionProvider:P,typeDefinitionProvider:f,documentHighlightProvider:E,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:b,hoverProvider:S,renameProvider:O?{prepareProvider:!0}:void 0,semanticTokensProvider:s?eK.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:F?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:W?{resolveProvider:Boolean(W.resolveCodeLens)}:void 0,declarationProvider:re}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Q.DefaultLanguageServer=Zy;function rK(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");y0(e,t),g0(e,t),v0(e,t),T0(e,t),R0(e,t),A0(e,t),S0(e,t),b0(e,t),P0(e,t),k0(e,t),N0(e,t),_0(e,t),w0(e,t),E0(e,t),$0(e,t),I0(e,t),x0(e,t),q0(e,t),L0(e,t),D0(e,t),O0(e,t),C0(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Q.startLanguageServer=rK;function y0(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([Mo.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=o.changes.filter(l=>l.type!==yr.FileChangeType.Deleted).map(l=>Mo.URI.parse(l.uri)),u=o.changes.filter(l=>l.type===yr.FileChangeType.Deleted).map(l=>Mo.URI.parse(l.uri));i(s,u)})}Q.addDocumentsHandler=y0;function g0(t,e){e.workspace.DocumentBuilder.onBuildPhase(ZH.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}Q.addDiagnosticsHandler=g0;function v0(t,e){t.onCompletion(Vt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}Q.addCompletionHandler=v0;function T0(t,e){t.onReferences(Vt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}Q.addFindReferencesHandler=T0;function _0(t,e){t.onCodeAction(Vt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}Q.addCodeActionHandler=_0;function R0(t,e){t.onDocumentSymbol(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}Q.addDocumentSymbolHandler=R0;function A0(t,e){t.onDefinition(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}Q.addGotoDefinitionHandler=A0;function S0(t,e){t.onTypeDefinition(Vt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}Q.addGoToTypeDefinitionHandler=S0;function b0(t,e){t.onImplementation(Vt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}Q.addGoToImplementationHandler=b0;function C0(t,e){t.onDeclaration(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}Q.addGoToDeclarationHandler=C0;function P0(t,e){t.onDocumentHighlight(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}Q.addDocumentHighlightsHandler=P0;function E0(t,e){t.onHover(Vt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}Q.addHoverHandler=E0;function k0(t,e){t.onFoldingRanges(Vt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}Q.addFoldingRangeHandler=k0;function N0(t,e){t.onDocumentFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}Q.addFormattingHandler=N0;function w0(t,e){t.onRenameRequest(Vt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Vt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}Q.addRenameHandler=w0;function $0(t,e){let r="No semantic token provider registered";t.languages.semanticTokens.on(Zi((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):new yr.ResponseError(0,r),e)),t.languages.semanticTokens.onDelta(Zi((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):new yr.ResponseError(0,r),e)),t.languages.semanticTokens.onRange(Zi((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):new yr.ResponseError(0,r),e))}Q.addSemanticTokenHandler=$0;function O0(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Q.addConfigurationChangeHandler=O0;function I0(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return Fo(o)}})}Q.addExecuteCommandHandler=I0;function D0(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(Zi((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Fo(s)}})}}Q.addDocumentLinkHandler=D0;function x0(t,e){t.onSignatureHelp(Zi((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}Q.addSignatureHelpHandler=x0;function L0(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(Zi((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Fo(s)}})}}Q.addCodeLensHandler=L0;function q0(t,e){let r="No call hierarchy provider registered";t.languages.callHierarchy.onPrepare(Zi((n,i,a,o)=>{var s;return n.lsp.CallHierarchyProvider?(s=n.lsp.CallHierarchyProvider.prepareCallHierarchy(i,a,o))!==null&&s!==void 0?s:null:new yr.ResponseError(0,r)},e)),t.languages.callHierarchy.onIncomingCalls(eg((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.incomingCalls(i,a))!==null&&o!==void 0?o:null:new yr.ResponseError(0,r)},e)),t.languages.callHierarchy.onOutgoingCalls(eg((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.outgoingCalls(i,a))!==null&&o!==void 0?o:null:new yr.ResponseError(0,r)},e))}Q.addCallHierarchyHandler=q0;function eg(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=Mo.URI.parse(n.item.uri),o=r.getServices(a);if(!o)throw console.error(`Could not find service instance for uri: '${a.toString()}'`),new Error;try{return await t(o,n,i)}catch(s){return Fo(s)}}}Q.createCallHierarchyRequestHandler=eg;function Zi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Mo.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return Fo(l)}}}Q.createServerRequestHandler=Zi;function Vt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Mo.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return Fo(l)}}}Q.createRequestHandler=Vt;function Fo(t){if((0,QH.isOperationCancelled)(t))return new yr.ResponseError(yr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof yr.ResponseError)return t;throw t}});var ng=d(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.DefaultReferencesProvider=void 0;var nK=qe(),iK=Qe(),rg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,iK.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(nK.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};hf.DefaultReferencesProvider=rg});var ag=d(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.DefaultRenameProvider=void 0;var aK=qe(),oK=Eo(),M0=Qe(),ig=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,M0.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=aK.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,M0.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,oK.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};mf.DefaultRenameProvider=ig});var F0=d(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.AbstractTypeDefinitionProvider=void 0;var sK=qe(),uK=Qe(),og=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=sK.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,uK.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};yf.AbstractTypeDefinitionProvider=og});var sg=d(tt=>{"use strict";var lK=tt&&tt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Lt=tt&&tt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&lK(e,t,r)};Object.defineProperty(tt,"__esModule",{value:!0});Lt(My(),tt);Lt(Ly(),tt);Lt(l0(),tt);Lt(jy(),tt);Lt(f0(),tt);Lt(Uy(),tt);Lt(d0(),tt);Lt(Vc(),tt);Lt(Wy(),tt);Lt(Vy(),tt);Lt(by(),tt);Lt(h0(),tt);Lt(tg(),tt);Lt(ng(),tt);Lt(ag(),tt);Lt(Zc(),tt);Lt(Qy(),tt);Lt(F0(),tt)});var j0=d(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.LangiumGrammarDefinitionProvider=void 0;var ug=qe(),cK=sg(),fK=Ie(),dK=Et(),pK=$e(),hK=kt(),lg=class extends cK.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,pK.isGrammarImport)(e.element)&&((n=(0,dK.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,hK.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:ug.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:ug.Range.create(0,0,0,0);return[ug.LocationLink.create(c.$document.uri.toString(),v,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,fK.streamContents)(e).head()}};gf.LangiumGrammarDefinitionProvider=lg});var U0=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.AbstractCallHierarchyProvider=void 0;var mK=qe(),G0=Dn(),cg=Qe(),fg=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,cg.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:mK.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(G0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,cg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(G0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,cg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};vf.AbstractCallHierarchyProvider=fg});var K0=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.LangiumGrammarCallHierarchyProvider=void 0;var H0=qe(),yK=U0(),dg=Ie(),gK=Qe(),Tf=$e(),pg=class extends yK.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,Tf.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,gK.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,dg.getContainerOfType)(s.element,Tf.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:H0.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,Tf.isParserRule)(e))return;let r=(0,dg.streamAllContents)(e).filter(Tf.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,dg.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:H0.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};_f.LangiumGrammarCallHierarchyProvider=pg});var hg=d(ea=>{"use strict";Object.defineProperty(ea,"__esModule",{value:!0});ea.isInferredAndDeclared=ea.isInferred=ea.isDeclared=void 0;function vK(t){return t&&"declared"in t}ea.isDeclared=vK;function TK(t){return t&&"inferred"in t}ea.isInferred=TK;function _K(t){return t&&"inferred"in t&&"declared"in t}ea.isInferredAndDeclared=_K});var B0=d(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.LangiumGrammarValidationResourcesCollector=void 0;var RK=Cr(),Sf=Dt(),Rf=$e(),W0=kt(),AK=Jm(),Af=pi(),SK=Hi(),bK=hg(),mg=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,AK.collectTypeResources)(e,this.documents),n=this.collectValidationInfo(r),i=this.collectSuperProperties(r),a=this.collectSubTypesAndAliases(n);return{typeToValidationInfo:n,typeToSuperProperties:i,typeToAliases:a}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=CK(e);for(let s of(0,Af.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,Sf.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,Af.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,l?Object.assign(Object.assign({},l),{declared:s,declaredNode:u}):{declared:s,declaredNode:u})}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map;for(let i of(0,Af.mergeInterfaces)(e,r))n.set(i.name,Array.from(i.superProperties.values()));return n}collectSubTypesAndAliases(e){let r=(0,Sf.stream)(e.entries()).reduce((s,[u,l])=>(s.set(u,(0,bK.isDeclared)(l)?l.declared:l.inferred),s),new Map);(0,Af.addSubTypes)(r);let n=new Map;function i(s,u){let l=n.get(s);l?l.add(u):n.set(s,new Set([u]))}let a=Array.from(r.values()).filter(s=>s.subTypes.size===0),o=new Set;for(let s of a){o.add(s),i(s.name,s.name);for(let u of(0,Sf.stream)(s.realSuperTypes)){i(u,s.name);let l=r.get(u);l&&!o.has(l)&&a.push(l)}(0,SK.isUnionType)(s)&&s.alternatives.length===1&&s.alternatives.filter(u=>!u.array&&!u.reference).flatMap(u=>u.types).forEach(u=>{i(s.name,u),i(u,u),i(u,s.name)})}return n}};bf.LangiumGrammarValidationResourcesCollector=mg;function CK({parserRules:t,datatypeRules:e}){let r=new RK.MultiMap;(0,Sf.stream)(t).concat(e).forEach(i=>r.add((0,W0.getRuleType)(i),i));function n(i){if((0,Rf.isAction)(i)){let a=(0,W0.getActionType)(i);a&&r.add(a,i)}((0,Rf.isAlternatives)(i)||(0,Rf.isGroup)(i)||(0,Rf.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var z0=d(Wr=>{"use strict";var PK=Wr&&Wr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),EK=Wr&&Wr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),kK=Wr&&Wr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&PK(e,t,r);return EK(e,t),e};Object.defineProperty(Wr,"__esModule",{value:!0});Wr.LangiumGrammarTypesValidator=Wr.registerTypeValidationChecks=void 0;var NK=Cr(),jo=kK($e()),wK=kt(),Fn=Hi(),gg=pi(),Na=hg();function $K(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Wr.registerTypeValidationChecks=$K;var yg=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,Na.isDeclared)(a)&&(0,Fn.isInterfaceType)(a.declared)&&jo.isInterface(a.declaredNode)){let o=a;IK(o,i.typeToValidationInfo,r),DK(o,i.typeToSuperProperties,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,Na.isInferred)(a)&&a.inferred instanceof Fn.InterfaceType&&OK(a.inferred,r),(0,Na.isInferredAndDeclared)(a)&&qK(a,i.typeToAliases,r)}checkActionIsNotUnionType(e,r){jo.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Wr.LangiumGrammarTypesValidator=yg;function OK(t,e){t.properties.filter(r=>r.typeAlternatives.length>1).forEach(r=>{let n=a=>a.reference?"ref":"other",i=n(r.typeAlternatives[0]);if(r.typeAlternatives.slice(1).some(a=>n(a)!==i)){let a=r.astNodes.values().next().value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}})}function IK({declared:t,declaredNode:e},r,n){t.printingSuperTypes.forEach((i,a)=>{let o=r.get(i);o&&(((0,Na.isInferred)(o)&&(0,Fn.isUnionType)(o.inferred)||(0,Na.isDeclared)(o)&&(0,Fn.isUnionType)(o.declared))&&n("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:a}),(0,Na.isInferred)(o)&&!(0,Na.isDeclared)(o)&&n("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:a}))})}function DK({declared:t,declaredNode:e},r,n){var i,a,o;let s=t.properties.reduce((c,f)=>c.add(f.name,f),new NK.MultiMap);for(let[c,f]of s.entriesGroupedByKey())if(f.length>1)for(let m of f)n("error",`Cannot have two properties with the same name '${c}'.`,{node:Array.from(m.astNodes)[0],property:"name"});let u=t.printingSuperTypes;for(let c=0;c<u.length;c++)for(let f=c+1;f<u.length;f++){let m=u[c],v=u[f],y=(i=r.get(m))!==null&&i!==void 0?i:[],R=(a=r.get(v))!==null&&a!==void 0?a:[],P=xK(y,R);P.length>0&&n("error",`Cannot simultaneously inherit from '${m}' and '${v}'. Their ${P.map(E=>"'"+E+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let l=new Set;for(let c of u){let f=(o=r.get(c))!==null&&o!==void 0?o:[];for(let m of f)l.add(m.name)}for(let c of t.properties)if(l.has(c.name)){let m=e.attributes.find(v=>v.name===c.name);m&&n("error",`Cannot redeclare property '${c.name}'. It is already inherited from another interface.`,{node:m,property:"name"})}}function xK(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!LK(n,i)&&r.push(n.name)}return r}function LK(t,e){if(t.optional!==e.optional||t.typeAlternatives.length!==e.typeAlternatives.length)return!1;for(let r of t.typeAlternatives)if(!e.typeAlternatives.some(i=>i.array===r.array&&i.reference===r.reference&&i.types.length===r.types.length&&i.types.every(a=>r.types.includes(a))))return!1;return!0}function qK(t,e,r){let{inferred:n,declared:i,declaredNode:a,inferredNodes:o}=t,s=i.name,u=f=>m=>o.forEach(v=>r("error",`${m[-1]==="."?m.slice(0,-1):m}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:jo.isAction(v)?"type":"name"})),l=(f,m)=>f.forEach(v=>r("error",m,{node:v,property:jo.isAssignment(v)||jo.isAction(v)?"feature":"name"})),c=f=>{o.forEach(m=>{jo.isParserRule(m)&&(0,wK.extractAssignments)(m.definition).find(y=>y.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${s}'.`,{node:m,property:"parameters"})})};if((0,Fn.isUnionType)(n)&&(0,Fn.isUnionType)(i))MK(n.alternatives,i.alternatives,e,u(`in a rule that returns type '${s}'`));else if((0,Fn.isInterfaceType)(n)&&(0,Fn.isInterfaceType)(i))GK(n.superProperties,i.superProperties,e,u(`in a rule that returns type '${s}'`),l,c);else{let f=`Inferred and declared versions of type '${s}' both have to be interfaces or unions.`;u()(f),r("error",f,{node:a,property:"name"})}}function MK(t,e,r,n){let i=V0(t,e,r);for(let a of i)n(`A type '${a.typeAsString}' ${a.errorMessage}`)}function FK(t,e){let r=t.types.map(i=>{var a;return Array.from((a=e.get(i))!==null&&a!==void 0?a:new Set([i]))}),n=[];for(let i of r)if(n.length===0&&n.push([]),i.length===1)n.forEach(a=>a.push(i[0]));else{let a=JSON.parse(JSON.stringify(n));n=[];for(let o of i){let s=JSON.parse(JSON.stringify(a));s.forEach(u=>u.push(o)),n.push(...s)}}return n.map(i=>(0,gg.distinctAndSorted)(i).join(" | "))}function jK(t){let e=t.types.filter(r=>!r.startsWith("'"));return e.push("string"),(0,gg.distinctAndSorted)(e).join(" | ")}function V0(t,e,r){var n;let i=(u,l)=>u.array&&!l.array&&u.reference&&!l.reference?"can't be an array and a reference":!u.array&&l.array&&!u.reference&&l.reference?"has to be an array and a reference":u.array&&!l.array?"can't be an array":!u.array&&l.array?"has to be an array":u.reference&&!l.reference?"can't be a reference":!u.reference&&l.reference?"has to be a reference":"",a=t.reduce((u,l)=>u.set((0,gg.distinctAndSorted)(l.types).join(" | "),l),new Map),o=e.reduce((u,l)=>(FK(l,r).forEach(c=>u.set(c,l)),u),new Map),s=[];for(let[u,l]of a){let c=(n=o.get(u))!==null&&n!==void 0?n:o.get(jK(l));c?(c.array!==l.array||c.reference!==l.reference)&&s.push({typeAsString:u,errorMessage:i(l,c)}):s.push({typeAsString:u,errorMessage:"is not expected"})}return s}function GK(t,e,r,n,i,a){let o=(s,u)=>!(s.typeAlternatives.length===1&&s.typeAlternatives[0].array)&&!(u.typeAlternatives.length===1&&u.typeAlternatives[0].array);for(let[s,u]of t.entriesGroupedByKey()){let l=u[0],c=e.get(s)[0];if(c){let f=(0,Fn.propertyTypesToString)(l.typeAlternatives),m=(0,Fn.propertyTypesToString)(c.typeAlternatives);if(f!==m){let v=V0(l.typeAlternatives,c.typeAlternatives,r);if(v.length>0){let y=`The assigned type '${f}' is not compatible with the declared property '${s}' of type '${m}'`,R=v.map(P=>` '${P.typeAsString}' ${P.errorMessage}`).join("; ");i(l.astNodes,`${y}: ${R}.`)}}!c.optional&&l.optional&&o(l,c)&&a(s)}else i(l.astNodes,`A property '${s}' is not expected.`)}for(let[s,u]of e.entriesGroupedByKey())t.get(s).length===0&&!u.some(c=>c.optional)&&n(`A property '${s}' is expected.`)}});var vg=d(wa=>{"use strict";Object.defineProperty(wa,"__esModule",{value:!0});wa.createLangiumGrammarServices=wa.LangiumGrammarModule=void 0;var Y0=Cf(),X0=Ru(),J0=CS(),Q0=OS(),Z0=my(),UK=jS(),HK=GS(),KK=HS(),WK=KS(),BK=BS(),VK=ZS(),zK=j0(),YK=K0(),XK=B0(),eb=z0(),JK=Fr(),QK=Qi();wa.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new Z0.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new XK.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new eb.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new HK.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new UK.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new WK.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new KK.LangiumGrammarFormatter,DefinitionProvider:t=>new zK.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new YK.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new Q0.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new Q0.LangiumGrammarScopeProvider(t),References:t=>new VK.LangiumGrammarReferences(t),NameProvider:()=>new BK.LangiumGrammarNameProvider}};function ZK(t,e){let r=(0,X0.inject)((0,Y0.createDefaultSharedModule)(t),J0.LangiumGrammarGeneratedSharedModule,e),n=(0,X0.inject)((0,Y0.createDefaultModule)({shared:r}),J0.LangiumGrammarGeneratedModule,wa.LangiumGrammarModule);return e5(r,n),r.ServiceRegistry.register(n),(0,Z0.registerValidationChecks)(n),(0,eb.registerTypeValidationChecks)(n),{shared:r,grammar:n}}wa.createLangiumGrammarServices=ZK;function e5(t,e){t.workspace.DocumentBuilder.onBuildPhase(QK.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,JK.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var Tg=d(Go=>{"use strict";Object.defineProperty(Go,"__esModule",{value:!0});Go.EmptyFileSystem=Go.EmptyFileSystemProvider=void 0;var Pf=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};Go.EmptyFileSystemProvider=Pf;Go.EmptyFileSystem={fileSystemProvider:()=>new Pf}});var Et=d(Te=>{"use strict";var t5=Te&&Te.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),r5=Te&&Te.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),n5=Te&&Te.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&t5(e,t,r);return r5(e,t),e};Object.defineProperty(Te,"__esModule",{value:!0});Te.createServicesForGrammar=Te.loadGrammarFromJson=Te.findNameAssignment=Te.findAssignment=Te.findNodesForKeywordInternal=Te.findNodeForKeyword=Te.findNodesForKeyword=Te.findNodeForProperty=Te.findNodesForProperty=Te.isCommentTerminal=Te.getCrossReferenceTerminal=Te.getAllReachableRules=Te.getEntryRule=void 0;var nb=Dn(),tb=Cf(),rb=Ru(),i5=Zm(),gr=n5($e()),a5=kt(),ib=vg(),o5=pr(),Uo=Ie(),s5=Qe(),_g=Tg();function ab(t){return t.rules.find(e=>gr.isParserRule(e)&&e.entry)}Te.getEntryRule=ab;function u5(t,e){let r=new Set,n=ab(t);if(!n)return new Set(t.rules);ob(n,r,e);let i=new Set;for(let a of t.rules)(r.has(a.name)||gr.isTerminalRule(a)&&a.hidden)&&i.add(a);return i}Te.getAllReachableRules=u5;function ob(t,e,r){e.add(t.name),(0,Uo.streamAllContents)(t).forEach(n=>{if(gr.isRuleCall(n)||r&&gr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&ob(i,e,r)}})}function l5(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=sb(t.type.ref);return e?.terminal}}Te.getCrossReferenceTerminal=l5;function c5(t){return t.hidden&&!" ".match((0,a5.terminalRegex)(t))}Te.isCommentTerminal=c5;function f5(t,e){return!t||!e?[]:Rg(t,e,t.element,!0)}Te.findNodesForProperty=f5;function d5(t,e,r){if(!t||!e)return;let n=Rg(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForProperty=d5;function Rg(t,e,r,n){if(!n){let i=(0,Uo.getContainerOfType)(t.feature,gr.isAssignment);if(i&&i.feature===e)return[t]}return(0,o5.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>Rg(i,e,r,!1)):[]}function p5(t,e){return t?Ag(t,e,t?.element):[]}Te.findNodesForKeyword=p5;function h5(t,e,r){if(!t)return;let n=Ag(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForKeyword=h5;function Ag(t,e,r){if(t.element!==r)return[];if(gr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,s5.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?gr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}Te.findNodesForKeywordInternal=Ag;function m5(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,Uo.getContainerOfType)(t.feature,gr.isAssignment);if(n)return n;t=t.parent}}Te.findAssignment=m5;function sb(t){return gr.isInferredType(t)&&(t=t.$container),ub(t,new Map)}Te.findNameAssignment=sb;function ub(t,e){var r;function n(i,a){let o;return(0,Uo.getContainerOfType)(i,gr.isAssignment)||(o=ub(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,Uo.streamAllContents)(t)){if(gr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(gr.isRuleCall(i)&&gr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(gr.isAtomType(i)&&(!((r=i?.refType)===null||r===void 0)&&r.ref))return n(i,i.refType.ref)}}function y5(t){var e;let r=(0,ib.createLangiumGrammarServices)(_g.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,nb.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}Te.loadGrammarFromJson=y5;async function g5(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,ib.createLangiumGrammarServices)(_g.EmptyFileSystem).grammar,u=nb.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,Uo.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},R={AstReflection:()=>(0,i5.interpretAstReflection)(f)},P={Grammar:()=>f,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},E=(0,rb.inject)((0,tb.createDefaultSharedModule)(_g.EmptyFileSystem),R,t.sharedModule),b=(0,rb.inject)((0,tb.createDefaultModule)({shared:E}),P,t.module);return E.ServiceRegistry.register(b),b}Te.createServicesForGrammar=g5});var lb=d(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.createGrammarConfig=void 0;var v5=Qe(),T5=Et(),_5=ko(),R5=$e(),A5=kt();function S5(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,R5.isTerminalRule)(n)&&(0,T5.isCommentTerminal)(n)&&(0,_5.isMultilineComment)((0,A5.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:v5.DefaultNameRegexp}}Ef.createGrammarConfig=S5});var Sg=d(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.VERSION=void 0;kf.VERSION="10.4.2"});var Ho=d((Bde,cb)=>{var b5=Object.prototype;function C5(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||b5;return t===r}cb.exports=C5});var bg=d((Vde,fb)=>{function P5(t,e){return function(r){return t(e(r))}}fb.exports=P5});var pb=d((zde,db)=>{var E5=bg(),k5=E5(Object.keys,Object);db.exports=k5});var Cg=d((Yde,hb)=>{var N5=Ho(),w5=pb(),$5=Object.prototype,O5=$5.hasOwnProperty;function I5(t){if(!N5(t))return w5(t);var e=[];for(var r in Object(t))O5.call(t,r)&&r!="constructor"&&e.push(r);return e}hb.exports=I5});var Pg=d((Xde,mb)=>{var D5=typeof global=="object"&&global&&global.Object===Object&&global;mb.exports=D5});var mn=d((Jde,yb)=>{var x5=Pg(),L5=typeof self=="object"&&self&&self.Object===Object&&self,q5=x5||L5||Function("return this")();yb.exports=q5});var $a=d((Qde,gb)=>{var M5=mn(),F5=M5.Symbol;gb.exports=F5});var Rb=d((Zde,_b)=>{var vb=$a(),Tb=Object.prototype,j5=Tb.hasOwnProperty,G5=Tb.toString,Iu=vb?vb.toStringTag:void 0;function U5(t){var e=j5.call(t,Iu),r=t[Iu];try{t[Iu]=void 0;var n=!0}catch{}var i=G5.call(t);return n&&(e?t[Iu]=r:delete t[Iu]),i}_b.exports=U5});var Sb=d((epe,Ab)=>{var H5=Object.prototype,K5=H5.toString;function W5(t){return K5.call(t)}Ab.exports=W5});var ta=d((tpe,Pb)=>{var bb=$a(),B5=Rb(),V5=Sb(),z5="[object Null]",Y5="[object Undefined]",Cb=bb?bb.toStringTag:void 0;function X5(t){return t==null?t===void 0?Y5:z5:Cb&&Cb in Object(t)?B5(t):V5(t)}Pb.exports=X5});var yn=d((rpe,Eb)=>{function J5(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}Eb.exports=J5});var Ko=d((npe,kb)=>{var Q5=ta(),Z5=yn(),eW="[object AsyncFunction]",tW="[object Function]",rW="[object GeneratorFunction]",nW="[object Proxy]";function iW(t){if(!Z5(t))return!1;var e=Q5(t);return e==tW||e==rW||e==eW||e==nW}kb.exports=iW});var wb=d((ipe,Nb)=>{var aW=mn(),oW=aW["__core-js_shared__"];Nb.exports=oW});var Ib=d((ape,Ob)=>{var Eg=wb(),$b=function(){var t=/[^.]+$/.exec(Eg&&Eg.keys&&Eg.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function sW(t){return!!$b&&$b in t}Ob.exports=sW});var kg=d((ope,Db)=>{var uW=Function.prototype,lW=uW.toString;function cW(t){if(t!=null){try{return lW.call(t)}catch{}try{return t+""}catch{}}return""}Db.exports=cW});var Lb=d((spe,xb)=>{var fW=Ko(),dW=Ib(),pW=yn(),hW=kg(),mW=/[\\^$.*+?()[\]{}|]/g,yW=/^\[object .+?Constructor\]$/,gW=Function.prototype,vW=Object.prototype,TW=gW.toString,_W=vW.hasOwnProperty,RW=RegExp("^"+TW.call(_W).replace(mW,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function AW(t){if(!pW(t)||dW(t))return!1;var e=fW(t)?RW:yW;return e.test(hW(t))}xb.exports=AW});var Mb=d((upe,qb)=>{function SW(t,e){return t?.[e]}qb.exports=SW});var ra=d((lpe,Fb)=>{var bW=Lb(),CW=Mb();function PW(t,e){var r=CW(t,e);return bW(r)?r:void 0}Fb.exports=PW});var Gb=d((cpe,jb)=>{var EW=ra(),kW=mn(),NW=EW(kW,"DataView");jb.exports=NW});var Nf=d((fpe,Ub)=>{var wW=ra(),$W=mn(),OW=wW($W,"Map");Ub.exports=OW});var Kb=d((dpe,Hb)=>{var IW=ra(),DW=mn(),xW=IW(DW,"Promise");Hb.exports=xW});var Ng=d((ppe,Wb)=>{var LW=ra(),qW=mn(),MW=LW(qW,"Set");Wb.exports=MW});var Vb=d((hpe,Bb)=>{var FW=ra(),jW=mn(),GW=FW(jW,"WeakMap");Bb.exports=GW});var Bo=d((mpe,eC)=>{var wg=Gb(),$g=Nf(),Og=Kb(),Ig=Ng(),Dg=Vb(),Zb=ta(),Wo=kg(),zb="[object Map]",UW="[object Object]",Yb="[object Promise]",Xb="[object Set]",Jb="[object WeakMap]",Qb="[object DataView]",HW=Wo(wg),KW=Wo($g),WW=Wo(Og),BW=Wo(Ig),VW=Wo(Dg),Oa=Zb;(wg&&Oa(new wg(new ArrayBuffer(1)))!=Qb||$g&&Oa(new $g)!=zb||Og&&Oa(Og.resolve())!=Yb||Ig&&Oa(new Ig)!=Xb||Dg&&Oa(new Dg)!=Jb)&&(Oa=function(t){var e=Zb(t),r=e==UW?t.constructor:void 0,n=r?Wo(r):"";if(n)switch(n){case HW:return Qb;case KW:return zb;case WW:return Yb;case BW:return Xb;case VW:return Jb}return e});eC.exports=Oa});var gn=d((ype,tC)=>{function zW(t){return t!=null&&typeof t=="object"}tC.exports=zW});var nC=d((gpe,rC)=>{var YW=ta(),XW=gn(),JW="[object Arguments]";function QW(t){return XW(t)&&YW(t)==JW}rC.exports=QW});var Du=d((vpe,oC)=>{var iC=nC(),ZW=gn(),aC=Object.prototype,eB=aC.hasOwnProperty,tB=aC.propertyIsEnumerable,rB=iC(function(){return arguments}())?iC:function(t){return ZW(t)&&eB.call(t,"callee")&&!tB.call(t,"callee")};oC.exports=rB});var Oe=d((Tpe,sC)=>{var nB=Array.isArray;sC.exports=nB});var wf=d((_pe,uC)=>{var iB=9007199254740991;function aB(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=iB}uC.exports=aB});var vn=d((Rpe,lC)=>{var oB=Ko(),sB=wf();function uB(t){return t!=null&&sB(t.length)&&!oB(t)}lC.exports=uB});var fC=d((Ape,cC)=>{function lB(){return!1}cC.exports=lB});var Lu=d((xu,Vo)=>{var cB=mn(),fB=fC(),hC=typeof xu=="object"&&xu&&!xu.nodeType&&xu,dC=hC&&typeof Vo=="object"&&Vo&&!Vo.nodeType&&Vo,dB=dC&&dC.exports===hC,pC=dB?cB.Buffer:void 0,pB=pC?pC.isBuffer:void 0,hB=pB||fB;Vo.exports=hB});var yC=d((Spe,mC)=>{var mB=ta(),yB=wf(),gB=gn(),vB="[object Arguments]",TB="[object Array]",_B="[object Boolean]",RB="[object Date]",AB="[object Error]",SB="[object Function]",bB="[object Map]",CB="[object Number]",PB="[object Object]",EB="[object RegExp]",kB="[object Set]",NB="[object String]",wB="[object WeakMap]",$B="[object ArrayBuffer]",OB="[object DataView]",IB="[object Float32Array]",DB="[object Float64Array]",xB="[object Int8Array]",LB="[object Int16Array]",qB="[object Int32Array]",MB="[object Uint8Array]",FB="[object Uint8ClampedArray]",jB="[object Uint16Array]",GB="[object Uint32Array]",ze={};ze[IB]=ze[DB]=ze[xB]=ze[LB]=ze[qB]=ze[MB]=ze[FB]=ze[jB]=ze[GB]=!0;ze[vB]=ze[TB]=ze[$B]=ze[_B]=ze[OB]=ze[RB]=ze[AB]=ze[SB]=ze[bB]=ze[CB]=ze[PB]=ze[EB]=ze[kB]=ze[NB]=ze[wB]=!1;function UB(t){return gB(t)&&yB(t.length)&&!!ze[mB(t)]}mC.exports=UB});var zo=d((bpe,gC)=>{function HB(t){return function(e){return t(e)}}gC.exports=HB});var Fu=d((qu,Yo)=>{var KB=Pg(),vC=typeof qu=="object"&&qu&&!qu.nodeType&&qu,Mu=vC&&typeof Yo=="object"&&Yo&&!Yo.nodeType&&Yo,WB=Mu&&Mu.exports===vC,xg=WB&&KB.process,BB=function(){try{var t=Mu&&Mu.require&&Mu.require("util").types;return t||xg&&xg.binding&&xg.binding("util")}catch{}}();Yo.exports=BB});var $f=d((Cpe,RC)=>{var VB=yC(),zB=zo(),TC=Fu(),_C=TC&&TC.isTypedArray,YB=_C?zB(_C):VB;RC.exports=YB});var Pr=d((Ppe,AC)=>{var XB=Cg(),JB=Bo(),QB=Du(),ZB=Oe(),e3=vn(),t3=Lu(),r3=Ho(),n3=$f(),i3="[object Map]",a3="[object Set]",o3=Object.prototype,s3=o3.hasOwnProperty;function u3(t){if(t==null)return!0;if(e3(t)&&(ZB(t)||typeof t=="string"||typeof t.splice=="function"||t3(t)||n3(t)||QB(t)))return!t.length;var e=JB(t);if(e==i3||e==a3)return!t.size;if(r3(t))return!XB(t).length;for(var r in t)if(s3.call(t,r))return!1;return!0}AC.exports=u3});var Xo=d((Epe,SC)=>{function l3(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}SC.exports=l3});var CC=d((kpe,bC)=>{function c3(){this.__data__=[],this.size=0}bC.exports=c3});var Jo=d((Npe,PC)=>{function f3(t,e){return t===e||t!==t&&e!==e}PC.exports=f3});var ju=d((wpe,EC)=>{var d3=Jo();function p3(t,e){for(var r=t.length;r--;)if(d3(t[r][0],e))return r;return-1}EC.exports=p3});var NC=d(($pe,kC)=>{var h3=ju(),m3=Array.prototype,y3=m3.splice;function g3(t){var e=this.__data__,r=h3(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():y3.call(e,r,1),--this.size,!0}kC.exports=g3});var $C=d((Ope,wC)=>{var v3=ju();function T3(t){var e=this.__data__,r=v3(e,t);return r<0?void 0:e[r][1]}wC.exports=T3});var IC=d((Ipe,OC)=>{var _3=ju();function R3(t){return _3(this.__data__,t)>-1}OC.exports=R3});var xC=d((Dpe,DC)=>{var A3=ju();function S3(t,e){var r=this.__data__,n=A3(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}DC.exports=S3});var Gu=d((xpe,LC)=>{var b3=CC(),C3=NC(),P3=$C(),E3=IC(),k3=xC();function Qo(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Qo.prototype.clear=b3;Qo.prototype.delete=C3;Qo.prototype.get=P3;Qo.prototype.has=E3;Qo.prototype.set=k3;LC.exports=Qo});var MC=d((Lpe,qC)=>{var N3=Gu();function w3(){this.__data__=new N3,this.size=0}qC.exports=w3});var jC=d((qpe,FC)=>{function $3(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}FC.exports=$3});var UC=d((Mpe,GC)=>{function O3(t){return this.__data__.get(t)}GC.exports=O3});var KC=d((Fpe,HC)=>{function I3(t){return this.__data__.has(t)}HC.exports=I3});var Uu=d((jpe,WC)=>{var D3=ra(),x3=D3(Object,"create");WC.exports=x3});var zC=d((Gpe,VC)=>{var BC=Uu();function L3(){this.__data__=BC?BC(null):{},this.size=0}VC.exports=L3});var XC=d((Upe,YC)=>{function q3(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}YC.exports=q3});var QC=d((Hpe,JC)=>{var M3=Uu(),F3="__lodash_hash_undefined__",j3=Object.prototype,G3=j3.hasOwnProperty;function U3(t){var e=this.__data__;if(M3){var r=e[t];return r===F3?void 0:r}return G3.call(e,t)?e[t]:void 0}JC.exports=U3});var eP=d((Kpe,ZC)=>{var H3=Uu(),K3=Object.prototype,W3=K3.hasOwnProperty;function B3(t){var e=this.__data__;return H3?e[t]!==void 0:W3.call(e,t)}ZC.exports=B3});var rP=d((Wpe,tP)=>{var V3=Uu(),z3="__lodash_hash_undefined__";function Y3(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=V3&&e===void 0?z3:e,this}tP.exports=Y3});var iP=d((Bpe,nP)=>{var X3=zC(),J3=XC(),Q3=QC(),Z3=eP(),e4=rP();function Zo(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Zo.prototype.clear=X3;Zo.prototype.delete=J3;Zo.prototype.get=Q3;Zo.prototype.has=Z3;Zo.prototype.set=e4;nP.exports=Zo});var sP=d((Vpe,oP)=>{var aP=iP(),t4=Gu(),r4=Nf();function n4(){this.size=0,this.__data__={hash:new aP,map:new(r4||t4),string:new aP}}oP.exports=n4});var lP=d((zpe,uP)=>{function i4(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}uP.exports=i4});var Hu=d((Ype,cP)=>{var a4=lP();function o4(t,e){var r=t.__data__;return a4(e)?r[typeof e=="string"?"string":"hash"]:r.map}cP.exports=o4});var dP=d((Xpe,fP)=>{var s4=Hu();function u4(t){var e=s4(this,t).delete(t);return this.size-=e?1:0,e}fP.exports=u4});var hP=d((Jpe,pP)=>{var l4=Hu();function c4(t){return l4(this,t).get(t)}pP.exports=c4});var yP=d((Qpe,mP)=>{var f4=Hu();function d4(t){return f4(this,t).has(t)}mP.exports=d4});var vP=d((Zpe,gP)=>{var p4=Hu();function h4(t,e){var r=p4(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}gP.exports=h4});var Of=d((ehe,TP)=>{var m4=sP(),y4=dP(),g4=hP(),v4=yP(),T4=vP();function es(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}es.prototype.clear=m4;es.prototype.delete=y4;es.prototype.get=g4;es.prototype.has=v4;es.prototype.set=T4;TP.exports=es});var RP=d((the,_P)=>{var _4=Gu(),R4=Nf(),A4=Of(),S4=200;function b4(t,e){var r=this.__data__;if(r instanceof _4){var n=r.__data__;if(!R4||n.length<S4-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new A4(n)}return r.set(t,e),this.size=r.size,this}_P.exports=b4});var If=d((rhe,AP)=>{var C4=Gu(),P4=MC(),E4=jC(),k4=UC(),N4=KC(),w4=RP();function ts(t){var e=this.__data__=new C4(t);this.size=e.size}ts.prototype.clear=P4;ts.prototype.delete=E4;ts.prototype.get=k4;ts.prototype.has=N4;ts.prototype.set=w4;AP.exports=ts});var bP=d((nhe,SP)=>{var $4="__lodash_hash_undefined__";function O4(t){return this.__data__.set(t,$4),this}SP.exports=O4});var PP=d((ihe,CP)=>{function I4(t){return this.__data__.has(t)}CP.exports=I4});var xf=d((ahe,EP)=>{var D4=Of(),x4=bP(),L4=PP();function Df(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new D4;++e<r;)this.add(t[e])}Df.prototype.add=Df.prototype.push=x4;Df.prototype.has=L4;EP.exports=Df});var Lg=d((ohe,kP)=>{function q4(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}kP.exports=q4});var Lf=d((she,NP)=>{function M4(t,e){return t.has(e)}NP.exports=M4});var qg=d((uhe,wP)=>{var F4=xf(),j4=Lg(),G4=Lf(),U4=1,H4=2;function K4(t,e,r,n,i,a){var o=r&U4,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,m=!0,v=r&H4?new F4:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var y=t[f],R=e[f];if(n)var P=o?n(R,y,f,e,t,a):n(y,R,f,t,e,a);if(P!==void 0){if(P)continue;m=!1;break}if(v){if(!j4(e,function(E,b){if(!G4(v,b)&&(y===E||i(y,E,r,n,a)))return v.push(b)})){m=!1;break}}else if(!(y===R||i(y,R,r,n,a))){m=!1;break}}return a.delete(t),a.delete(e),m}wP.exports=K4});var Mg=d((lhe,$P)=>{var W4=mn(),B4=W4.Uint8Array;$P.exports=B4});var IP=d((che,OP)=>{function V4(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}OP.exports=V4});var qf=d((fhe,DP)=>{function z4(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}DP.exports=z4});var FP=d((dhe,MP)=>{var xP=$a(),LP=Mg(),Y4=Jo(),X4=qg(),J4=IP(),Q4=qf(),Z4=1,e6=2,t6="[object Boolean]",r6="[object Date]",n6="[object Error]",i6="[object Map]",a6="[object Number]",o6="[object RegExp]",s6="[object Set]",u6="[object String]",l6="[object Symbol]",c6="[object ArrayBuffer]",f6="[object DataView]",qP=xP?xP.prototype:void 0,Fg=qP?qP.valueOf:void 0;function d6(t,e,r,n,i,a,o){switch(r){case f6:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case c6:return!(t.byteLength!=e.byteLength||!a(new LP(t),new LP(e)));case t6:case r6:case a6:return Y4(+t,+e);case n6:return t.name==e.name&&t.message==e.message;case o6:case u6:return t==e+"";case i6:var s=J4;case s6:var u=n&Z4;if(s||(s=Q4),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=e6,o.set(t,e);var c=X4(s(t),s(e),n,i,a,o);return o.delete(t),c;case l6:if(Fg)return Fg.call(t)==Fg.call(e)}return!1}MP.exports=d6});var Mf=d((phe,jP)=>{function p6(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}jP.exports=p6});var jg=d((hhe,GP)=>{var h6=Mf(),m6=Oe();function y6(t,e,r){var n=e(t);return m6(t)?n:h6(n,r(t))}GP.exports=y6});var Ff=d((mhe,UP)=>{function g6(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}UP.exports=g6});var Gg=d((yhe,HP)=>{function v6(){return[]}HP.exports=v6});var jf=d((ghe,WP)=>{var T6=Ff(),_6=Gg(),R6=Object.prototype,A6=R6.propertyIsEnumerable,KP=Object.getOwnPropertySymbols,S6=KP?function(t){return t==null?[]:(t=Object(t),T6(KP(t),function(e){return A6.call(t,e)}))}:_6;WP.exports=S6});var VP=d((vhe,BP)=>{function b6(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}BP.exports=b6});var Ku=d((The,zP)=>{var C6=9007199254740991,P6=/^(?:0|[1-9]\d*)$/;function E6(t,e){var r=typeof t;return e=e??C6,!!e&&(r=="number"||r!="symbol"&&P6.test(t))&&t>-1&&t%1==0&&t<e}zP.exports=E6});var Ug=d((_he,YP)=>{var k6=VP(),N6=Du(),w6=Oe(),$6=Lu(),O6=Ku(),I6=$f(),D6=Object.prototype,x6=D6.hasOwnProperty;function L6(t,e){var r=w6(t),n=!r&&N6(t),i=!r&&!n&&$6(t),a=!r&&!n&&!i&&I6(t),o=r||n||i||a,s=o?k6(t.length,String):[],u=s.length;for(var l in t)(e||x6.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||O6(l,u)))&&s.push(l);return s}YP.exports=L6});var Er=d((Rhe,XP)=>{var q6=Ug(),M6=Cg(),F6=vn();function j6(t){return F6(t)?q6(t):M6(t)}XP.exports=j6});var Hg=d((Ahe,JP)=>{var G6=jg(),U6=jf(),H6=Er();function K6(t){return G6(t,H6,U6)}JP.exports=K6});var eE=d((She,ZP)=>{var QP=Hg(),W6=1,B6=Object.prototype,V6=B6.hasOwnProperty;function z6(t,e,r,n,i,a){var o=r&W6,s=QP(t),u=s.length,l=QP(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var m=s[f];if(!(o?m in e:V6.call(e,m)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var R=!0;a.set(t,e),a.set(e,t);for(var P=o;++f<u;){m=s[f];var E=t[m],b=e[m];if(n)var S=o?n(b,E,m,e,t,a):n(E,b,m,t,e,a);if(!(S===void 0?E===b||i(E,b,r,n,a):S)){R=!1;break}P||(P=m=="constructor")}if(R&&!P){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(R=!1)}return a.delete(t),a.delete(e),R}ZP.exports=z6});var uE=d((bhe,sE)=>{var Kg=If(),Y6=qg(),X6=FP(),J6=eE(),tE=Bo(),rE=Oe(),nE=Lu(),Q6=$f(),Z6=1,iE="[object Arguments]",aE="[object Array]",Gf="[object Object]",eV=Object.prototype,oE=eV.hasOwnProperty;function tV(t,e,r,n,i,a){var o=rE(t),s=rE(e),u=o?aE:tE(t),l=s?aE:tE(e);u=u==iE?Gf:u,l=l==iE?Gf:l;var c=u==Gf,f=l==Gf,m=u==l;if(m&&nE(t)){if(!nE(e))return!1;o=!0,c=!1}if(m&&!c)return a||(a=new Kg),o||Q6(t)?Y6(t,e,r,n,i,a):X6(t,e,u,r,n,i,a);if(!(r&Z6)){var v=c&&oE.call(t,"__wrapped__"),y=f&&oE.call(e,"__wrapped__");if(v||y){var R=v?t.value():t,P=y?e.value():e;return a||(a=new Kg),i(R,P,r,n,a)}}return m?(a||(a=new Kg),J6(t,e,r,n,i,a)):!1}sE.exports=tV});var Wg=d((Che,fE)=>{var rV=uE(),lE=gn();function cE(t,e,r,n,i){return t===e?!0:t==null||e==null||!lE(t)&&!lE(e)?t!==t&&e!==e:rV(t,e,r,n,cE,i)}fE.exports=cE});var pE=d((Phe,dE)=>{var nV=If(),iV=Wg(),aV=1,oV=2;function sV(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new nV;if(n)var m=n(l,c,u,t,e,f);if(!(m===void 0?iV(c,l,aV|oV,n,f):m))return!1}}return!0}dE.exports=sV});var Bg=d((Ehe,hE)=>{var uV=yn();function lV(t){return t===t&&!uV(t)}hE.exports=lV});var yE=d((khe,mE)=>{var cV=Bg(),fV=Er();function dV(t){for(var e=fV(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,cV(i)]}return e}mE.exports=dV});var Vg=d((Nhe,gE)=>{function pV(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}gE.exports=pV});var TE=d((whe,vE)=>{var hV=pE(),mV=yE(),yV=Vg();function gV(t){var e=mV(t);return e.length==1&&e[0][2]?yV(e[0][0],e[0][1]):function(r){return r===t||hV(r,t,e)}}vE.exports=gV});var rs=d(($he,_E)=>{var vV=ta(),TV=gn(),_V="[object Symbol]";function RV(t){return typeof t=="symbol"||TV(t)&&vV(t)==_V}_E.exports=RV});var Uf=d((Ohe,RE)=>{var AV=Oe(),SV=rs(),bV=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,CV=/^\w*$/;function PV(t,e){if(AV(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||SV(t)?!0:CV.test(t)||!bV.test(t)||e!=null&&t in Object(e)}RE.exports=PV});var bE=d((Ihe,SE)=>{var AE=Of(),EV="Expected a function";function zg(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(EV);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(zg.Cache||AE),r}zg.Cache=AE;SE.exports=zg});var PE=d((Dhe,CE)=>{var kV=bE(),NV=500;function wV(t){var e=kV(t,function(n){return r.size===NV&&r.clear(),n}),r=e.cache;return e}CE.exports=wV});var kE=d((xhe,EE)=>{var $V=PE(),OV=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,IV=/\\(\\)?/g,DV=$V(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(OV,function(r,n,i,a){e.push(i?a.replace(IV,"$1"):n||r)}),e});EE.exports=DV});var DE=d((Lhe,IE)=>{var NE=$a(),xV=Xo(),LV=Oe(),qV=rs(),MV=1/0,wE=NE?NE.prototype:void 0,$E=wE?wE.toString:void 0;function OE(t){if(typeof t=="string")return t;if(LV(t))return xV(t,OE)+"";if(qV(t))return $E?$E.call(t):"";var e=t+"";return e=="0"&&1/t==-MV?"-0":e}IE.exports=OE});var Yg=d((qhe,xE)=>{var FV=DE();function jV(t){return t==null?"":FV(t)}xE.exports=jV});var Wu=d((Mhe,LE)=>{var GV=Oe(),UV=Uf(),HV=kE(),KV=Yg();function WV(t,e){return GV(t)?t:UV(t,e)?[t]:HV(KV(t))}LE.exports=WV});var ns=d((Fhe,qE)=>{var BV=rs(),VV=1/0;function zV(t){if(typeof t=="string"||BV(t))return t;var e=t+"";return e=="0"&&1/t==-VV?"-0":e}qE.exports=zV});var Hf=d((jhe,ME)=>{var YV=Wu(),XV=ns();function JV(t,e){e=YV(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[XV(e[r++])];return r&&r==n?t:void 0}ME.exports=JV});var jE=d((Ghe,FE)=>{var QV=Hf();function ZV(t,e,r){var n=t==null?void 0:QV(t,e);return n===void 0?r:n}FE.exports=ZV});var UE=d((Uhe,GE)=>{function ez(t,e){return t!=null&&e in Object(t)}GE.exports=ez});var Xg=d((Hhe,HE)=>{var tz=Wu(),rz=Du(),nz=Oe(),iz=Ku(),az=wf(),oz=ns();function sz(t,e,r){e=tz(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=oz(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&az(i)&&iz(o,i)&&(nz(t)||rz(t)))}HE.exports=sz});var WE=d((Khe,KE)=>{var uz=UE(),lz=Xg();function cz(t,e){return t!=null&&lz(t,e,uz)}KE.exports=cz});var VE=d((Whe,BE)=>{var fz=Wg(),dz=jE(),pz=WE(),hz=Uf(),mz=Bg(),yz=Vg(),gz=ns(),vz=1,Tz=2;function _z(t,e){return hz(t)&&mz(e)?yz(gz(t),e):function(r){var n=dz(r,t);return n===void 0&&n===e?pz(r,t):fz(e,n,vz|Tz)}}BE.exports=_z});var Ia=d((Bhe,zE)=>{function Rz(t){return t}zE.exports=Rz});var XE=d((Vhe,YE)=>{function Az(t){return function(e){return e?.[t]}}YE.exports=Az});var QE=d((zhe,JE)=>{var Sz=Hf();function bz(t){return function(e){return Sz(e,t)}}JE.exports=bz});var ek=d((Yhe,ZE)=>{var Cz=XE(),Pz=QE(),Ez=Uf(),kz=ns();function Nz(t){return Ez(t)?Cz(kz(t)):Pz(t)}ZE.exports=Nz});var Br=d((Xhe,tk)=>{var wz=TE(),$z=VE(),Oz=Ia(),Iz=Oe(),Dz=ek();function xz(t){return typeof t=="function"?t:t==null?Oz:typeof t=="object"?Iz(t)?$z(t[0],t[1]):wz(t):Dz(t)}tk.exports=xz});var nk=d((Jhe,rk)=>{function Lz(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}rk.exports=Lz});var ak=d((Qhe,ik)=>{var qz=nk(),Mz=qz();ik.exports=Mz});var sk=d((Zhe,ok)=>{var Fz=ak(),jz=Er();function Gz(t,e){return t&&Fz(t,e,jz)}ok.exports=Gz});var lk=d((eme,uk)=>{var Uz=vn();function Hz(t,e){return function(r,n){if(r==null)return r;if(!Uz(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}uk.exports=Hz});var na=d((tme,ck)=>{var Kz=sk(),Wz=lk(),Bz=Wz(Kz);ck.exports=Bz});var dk=d((rme,fk)=>{var Vz=na(),zz=vn();function Yz(t,e){var r=-1,n=zz(t)?Array(t.length):[];return Vz(t,function(i,a,o){n[++r]=e(i,a,o)}),n}fk.exports=Yz});var qt=d((nme,pk)=>{var Xz=Xo(),Jz=Br(),Qz=dk(),Zz=Oe();function e8(t,e){var r=Zz(t)?Xz:Qz;return r(t,Jz(e,3))}pk.exports=e8});var Jg=d((ime,hk)=>{function t8(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}hk.exports=t8});var yk=d((ame,mk)=>{var r8=Ia();function n8(t){return typeof t=="function"?t:r8}mk.exports=n8});var Mt=d((ome,gk)=>{var i8=Jg(),a8=na(),o8=yk(),s8=Oe();function u8(t,e){var r=s8(t)?i8:a8;return r(t,o8(e))}gk.exports=u8});var Tk=d((sme,vk)=>{var l8=Xo();function c8(t,e){return l8(e,function(r){return t[r]})}vk.exports=c8});var jn=d((ume,_k)=>{var f8=Tk(),d8=Er();function p8(t){return t==null?[]:f8(t,d8(t))}_k.exports=p8});var Ak=d((lme,Rk)=>{var h8=Object.prototype,m8=h8.hasOwnProperty;function y8(t,e){return t!=null&&m8.call(t,e)}Rk.exports=y8});var kr=d((cme,Sk)=>{var g8=Ak(),v8=Xg();function T8(t,e){return t!=null&&v8(t,e,g8)}Sk.exports=T8});var Qg=d((fme,bk)=>{var _8=ra(),R8=function(){try{var t=_8(Object,"defineProperty");return t({},"",{}),t}catch{}}();bk.exports=R8});var Kf=d((dme,Pk)=>{var Ck=Qg();function A8(t,e,r){e=="__proto__"&&Ck?Ck(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}Pk.exports=A8});var Bu=d((pme,Ek)=>{var S8=Kf(),b8=Jo(),C8=Object.prototype,P8=C8.hasOwnProperty;function E8(t,e,r){var n=t[e];(!(P8.call(t,e)&&b8(n,r))||r===void 0&&!(e in t))&&S8(t,e,r)}Ek.exports=E8});var is=d((hme,kk)=>{var k8=Bu(),N8=Kf();function w8(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?N8(r,s,u):k8(r,s,u)}return r}kk.exports=w8});var wk=d((mme,Nk)=>{var $8=is(),O8=Er();function I8(t,e){return t&&$8(e,O8(e),t)}Nk.exports=I8});var Ok=d((yme,$k)=>{function D8(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}$k.exports=D8});var Dk=d((gme,Ik)=>{var x8=yn(),L8=Ho(),q8=Ok(),M8=Object.prototype,F8=M8.hasOwnProperty;function j8(t){if(!x8(t))return q8(t);var e=L8(t),r=[];for(var n in t)n=="constructor"&&(e||!F8.call(t,n))||r.push(n);return r}Ik.exports=j8});var Vu=d((vme,xk)=>{var G8=Ug(),U8=Dk(),H8=vn();function K8(t){return H8(t)?G8(t,!0):U8(t)}xk.exports=K8});var qk=d((Tme,Lk)=>{var W8=is(),B8=Vu();function V8(t,e){return t&&W8(e,B8(e),t)}Lk.exports=V8});var Uk=d((zu,as)=>{var z8=mn(),Gk=typeof zu=="object"&&zu&&!zu.nodeType&&zu,Mk=Gk&&typeof as=="object"&&as&&!as.nodeType&&as,Y8=Mk&&Mk.exports===Gk,Fk=Y8?z8.Buffer:void 0,jk=Fk?Fk.allocUnsafe:void 0;function X8(t,e){if(e)return t.slice();var r=t.length,n=jk?jk(r):new t.constructor(r);return t.copy(n),n}as.exports=X8});var Kk=d((_me,Hk)=>{function J8(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}Hk.exports=J8});var Bk=d((Rme,Wk)=>{var Q8=is(),Z8=jf();function e7(t,e){return Q8(t,Z8(t),e)}Wk.exports=e7});var Zg=d((Ame,Vk)=>{var t7=bg(),r7=t7(Object.getPrototypeOf,Object);Vk.exports=r7});var ev=d((Sme,zk)=>{var n7=Mf(),i7=Zg(),a7=jf(),o7=Gg(),s7=Object.getOwnPropertySymbols,u7=s7?function(t){for(var e=[];t;)n7(e,a7(t)),t=i7(t);return e}:o7;zk.exports=u7});var Xk=d((bme,Yk)=>{var l7=is(),c7=ev();function f7(t,e){return l7(t,c7(t),e)}Yk.exports=f7});var tv=d((Cme,Jk)=>{var d7=jg(),p7=ev(),h7=Vu();function m7(t){return d7(t,h7,p7)}Jk.exports=m7});var Zk=d((Pme,Qk)=>{var y7=Object.prototype,g7=y7.hasOwnProperty;function v7(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&g7.call(t,"index")&&(r.index=t.index,r.input=t.input),r}Qk.exports=v7});var Wf=d((Eme,tN)=>{var eN=Mg();function T7(t){var e=new t.constructor(t.byteLength);return new eN(e).set(new eN(t)),e}tN.exports=T7});var nN=d((kme,rN)=>{var _7=Wf();function R7(t,e){var r=e?_7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}rN.exports=R7});var aN=d((Nme,iN)=>{var A7=/\w*$/;function S7(t){var e=new t.constructor(t.source,A7.exec(t));return e.lastIndex=t.lastIndex,e}iN.exports=S7});var cN=d((wme,lN)=>{var oN=$a(),sN=oN?oN.prototype:void 0,uN=sN?sN.valueOf:void 0;function b7(t){return uN?Object(uN.call(t)):{}}lN.exports=b7});var dN=d(($me,fN)=>{var C7=Wf();function P7(t,e){var r=e?C7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}fN.exports=P7});var hN=d((Ome,pN)=>{var E7=Wf(),k7=nN(),N7=aN(),w7=cN(),$7=dN(),O7="[object Boolean]",I7="[object Date]",D7="[object Map]",x7="[object Number]",L7="[object RegExp]",q7="[object Set]",M7="[object String]",F7="[object Symbol]",j7="[object ArrayBuffer]",G7="[object DataView]",U7="[object Float32Array]",H7="[object Float64Array]",K7="[object Int8Array]",W7="[object Int16Array]",B7="[object Int32Array]",V7="[object Uint8Array]",z7="[object Uint8ClampedArray]",Y7="[object Uint16Array]",X7="[object Uint32Array]";function J7(t,e,r){var n=t.constructor;switch(e){case j7:return E7(t);case O7:case I7:return new n(+t);case G7:return k7(t,r);case U7:case H7:case K7:case W7:case B7:case V7:case z7:case Y7:case X7:return $7(t,r);case D7:return new n;case x7:case M7:return new n(t);case L7:return N7(t);case q7:return new n;case F7:return w7(t)}}pN.exports=J7});var gN=d((Ime,yN)=>{var Q7=yn(),mN=Object.create,Z7=function(){function t(){}return function(e){if(!Q7(e))return{};if(mN)return mN(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();yN.exports=Z7});var TN=d((Dme,vN)=>{var e9=gN(),t9=Zg(),r9=Ho();function n9(t){return typeof t.constructor=="function"&&!r9(t)?e9(t9(t)):{}}vN.exports=n9});var RN=d((xme,_N)=>{var i9=Bo(),a9=gn(),o9="[object Map]";function s9(t){return a9(t)&&i9(t)==o9}_N.exports=s9});var CN=d((Lme,bN)=>{var u9=RN(),l9=zo(),AN=Fu(),SN=AN&&AN.isMap,c9=SN?l9(SN):u9;bN.exports=c9});var EN=d((qme,PN)=>{var f9=Bo(),d9=gn(),p9="[object Set]";function h9(t){return d9(t)&&f9(t)==p9}PN.exports=h9});var $N=d((Mme,wN)=>{var m9=EN(),y9=zo(),kN=Fu(),NN=kN&&kN.isSet,g9=NN?y9(NN):m9;wN.exports=g9});var LN=d((Fme,xN)=>{var v9=If(),T9=Jg(),_9=Bu(),R9=wk(),A9=qk(),S9=Uk(),b9=Kk(),C9=Bk(),P9=Xk(),E9=Hg(),k9=tv(),N9=Bo(),w9=Zk(),$9=hN(),O9=TN(),I9=Oe(),D9=Lu(),x9=CN(),L9=yn(),q9=$N(),M9=Er(),F9=Vu(),j9=1,G9=2,U9=4,ON="[object Arguments]",H9="[object Array]",K9="[object Boolean]",W9="[object Date]",B9="[object Error]",IN="[object Function]",V9="[object GeneratorFunction]",z9="[object Map]",Y9="[object Number]",DN="[object Object]",X9="[object RegExp]",J9="[object Set]",Q9="[object String]",Z9="[object Symbol]",eY="[object WeakMap]",tY="[object ArrayBuffer]",rY="[object DataView]",nY="[object Float32Array]",iY="[object Float64Array]",aY="[object Int8Array]",oY="[object Int16Array]",sY="[object Int32Array]",uY="[object Uint8Array]",lY="[object Uint8ClampedArray]",cY="[object Uint16Array]",fY="[object Uint32Array]",Ke={};Ke[ON]=Ke[H9]=Ke[tY]=Ke[rY]=Ke[K9]=Ke[W9]=Ke[nY]=Ke[iY]=Ke[aY]=Ke[oY]=Ke[sY]=Ke[z9]=Ke[Y9]=Ke[DN]=Ke[X9]=Ke[J9]=Ke[Q9]=Ke[Z9]=Ke[uY]=Ke[lY]=Ke[cY]=Ke[fY]=!0;Ke[B9]=Ke[IN]=Ke[eY]=!1;function Bf(t,e,r,n,i,a){var o,s=e&j9,u=e&G9,l=e&U9;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!L9(t))return t;var c=I9(t);if(c){if(o=w9(t),!s)return b9(t,o)}else{var f=N9(t),m=f==IN||f==V9;if(D9(t))return S9(t,s);if(f==DN||f==ON||m&&!i){if(o=u||m?{}:O9(t),!s)return u?P9(t,A9(o,t)):C9(t,R9(o,t))}else{if(!Ke[f])return i?t:{};o=$9(t,f,s)}}a||(a=new v9);var v=a.get(t);if(v)return v;a.set(t,o),q9(t)?t.forEach(function(P){o.add(Bf(P,e,r,P,t,a))}):x9(t)&&t.forEach(function(P,E){o.set(E,Bf(P,e,r,E,t,a))});var y=l?u?k9:E9:u?F9:M9,R=c?void 0:y(t);return T9(R||t,function(P,E){R&&(E=P,P=t[E]),_9(o,E,Bf(P,e,r,E,t,a))}),o}xN.exports=Bf});var Ti=d((jme,qN)=>{var dY=LN(),pY=4;function hY(t){return dY(t,pY)}qN.exports=hY});var MN=d(os=>{"use strict";Object.defineProperty(os,"__esModule",{value:!0});os.PRINT_WARNING=os.PRINT_ERROR=void 0;function mY(t){console&&console.error&&console.error("Error: ".concat(t))}os.PRINT_ERROR=mY;function yY(t){console&&console.warn&&console.warn("Warning: ".concat(t))}os.PRINT_WARNING=yY});var FN=d(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.timer=void 0;function gY(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}Vf.timer=gY});var jN=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var ss=d(Gn=>{"use strict";Object.defineProperty(Gn,"__esModule",{value:!0});Gn.toFastProperties=Gn.timer=Gn.PRINT_ERROR=Gn.PRINT_WARNING=void 0;var GN=MN();Object.defineProperty(Gn,"PRINT_WARNING",{enumerable:!0,get:function(){return GN.PRINT_WARNING}});Object.defineProperty(Gn,"PRINT_ERROR",{enumerable:!0,get:function(){return GN.PRINT_ERROR}});var vY=FN();Object.defineProperty(Gn,"timer",{enumerable:!0,get:function(){return vY.timer}});var TY=jN();Object.defineProperty(Gn,"toFastProperties",{enumerable:!0,get:function(){return TY.toFastProperties}})});var zf=d((Kme,UN)=>{function _Y(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}UN.exports=_Y});var KN=d((Wme,HN)=>{var RY=/\s/;function AY(t){for(var e=t.length;e--&&RY.test(t.charAt(e)););return e}HN.exports=AY});var BN=d((Bme,WN)=>{var SY=KN(),bY=/^\s+/;function CY(t){return t&&t.slice(0,SY(t)+1).replace(bY,"")}WN.exports=CY});var XN=d((Vme,YN)=>{var PY=BN(),VN=yn(),EY=rs(),zN=0/0,kY=/^[-+]0x[0-9a-f]+$/i,NY=/^0b[01]+$/i,wY=/^0o[0-7]+$/i,$Y=parseInt;function OY(t){if(typeof t=="number")return t;if(EY(t))return zN;if(VN(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=VN(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=PY(t);var r=NY.test(t);return r||wY.test(t)?$Y(t.slice(2),r?2:8):kY.test(t)?zN:+t}YN.exports=OY});var ZN=d((zme,QN)=>{var IY=XN(),JN=1/0,DY=17976931348623157e292;function xY(t){if(!t)return t===0?t:0;if(t=IY(t),t===JN||t===-JN){var e=t<0?-1:1;return e*DY}return t===t?t:0}QN.exports=xY});var us=d((Yme,ew)=>{var LY=ZN();function qY(t){var e=LY(t),r=e%1;return e===e?r?e-r:e:0}ew.exports=qY});var Yf=d((Xme,tw)=>{var MY=zf(),FY=us();function jY(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:FY(e),MY(t,e<0?0:e,n)):[]}tw.exports=jY});var Yu=d((Jme,rw)=>{var GY=ta(),UY=Oe(),HY=gn(),KY="[object String]";function WY(t){return typeof t=="string"||!UY(t)&&HY(t)&&GY(t)==KY}rw.exports=WY});var iw=d((Qme,nw)=>{var BY=ta(),VY=gn(),zY="[object RegExp]";function YY(t){return VY(t)&&BY(t)==zY}nw.exports=YY});var rv=d((Zme,sw)=>{var XY=iw(),JY=zo(),aw=Fu(),ow=aw&&aw.isRegExp,QY=ow?JY(ow):XY;sw.exports=QY});var cw=d((eye,lw)=>{var ZY=Bu(),eX=Wu(),tX=Ku(),uw=yn(),rX=ns();function nX(t,e,r,n){if(!uw(t))return t;e=eX(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=rX(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=uw(c)?c:tX(e[i+1])?[]:{})}ZY(s,u,l),s=s[u]}return t}lw.exports=nX});var dw=d((tye,fw)=>{var iX=Hf(),aX=cw(),oX=Wu();function sX(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=iX(t,o);r(s,o)&&aX(a,oX(o,t),s)}return a}fw.exports=sX});var nv=d((rye,pw)=>{var uX=Xo(),lX=Br(),cX=dw(),fX=tv();function dX(t,e){if(t==null)return{};var r=uX(fX(t),function(n){return[n]});return e=lX(e),cX(t,r,function(n,i){return e(n,i[0])})}pw.exports=dX});var mw=d((nye,hw)=>{function pX(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}hw.exports=pX});var vw=d((iye,gw)=>{var hX=mw(),yw=Math.max;function mX(t,e,r){return e=yw(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=yw(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),hX(t,this,s)}}gw.exports=mX});var _w=d((aye,Tw)=>{function yX(t){return function(){return t}}Tw.exports=yX});var Sw=d((oye,Aw)=>{var gX=_w(),Rw=Qg(),vX=Ia(),TX=Rw?function(t,e){return Rw(t,"toString",{configurable:!0,enumerable:!1,value:gX(e),writable:!0})}:vX;Aw.exports=TX});var Cw=d((sye,bw)=>{var _X=800,RX=16,AX=Date.now;function SX(t){var e=0,r=0;return function(){var n=AX(),i=RX-(n-r);if(r=n,i>0){if(++e>=_X)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}bw.exports=SX});var Ew=d((uye,Pw)=>{var bX=Sw(),CX=Cw(),PX=CX(bX);Pw.exports=PX});var Xf=d((lye,kw)=>{var EX=Ia(),kX=vw(),NX=Ew();function wX(t,e){return NX(kX(t,e,EX),t+"")}kw.exports=wX});var Xu=d((cye,Nw)=>{var $X=Jo(),OX=vn(),IX=Ku(),DX=yn();function xX(t,e,r){if(!DX(r))return!1;var n=typeof e;return(n=="number"?OX(r)&&IX(e,r.length):n=="string"&&e in r)?$X(r[e],t):!1}Nw.exports=xX});var $w=d((fye,ww)=>{var LX=Xf(),qX=Xu();function MX(t){return LX(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&qX(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}ww.exports=MX});var Ju=d((dye,Ow)=>{var FX=Bu(),jX=is(),GX=$w(),UX=vn(),HX=Ho(),KX=Er(),WX=Object.prototype,BX=WX.hasOwnProperty,VX=GX(function(t,e){if(HX(e)||UX(e)){jX(e,KX(e),t);return}for(var r in e)BX.call(e,r)&&FX(t,r,e[r])});Ow.exports=VX});var Qf=d(Ce=>{"use strict";var _i=Ce&&Ce.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ls=Ce&&Ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ce,"__esModule",{value:!0});Ce.serializeProduction=Ce.serializeGrammar=Ce.Terminal=Ce.Alternation=Ce.RepetitionWithSeparator=Ce.Repetition=Ce.RepetitionMandatoryWithSeparator=Ce.RepetitionMandatory=Ce.Option=Ce.Alternative=Ce.Rule=Ce.NonTerminal=Ce.AbstractProduction=void 0;var Iw=ls(qt()),zX=ls(Mt()),iv=ls(Yu()),YX=ls(rv()),Un=ls(nv()),Hn=ls(Ju());function XX(t){return JX(t)?t.LABEL:t.name}function JX(t){return(0,iv.default)(t.LABEL)&&t.LABEL!==""}var Kn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,zX.default)(this.definition,function(r){r.accept(e)})},t}();Ce.AbstractProduction=Kn;var Dw=function(t){_i(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Kn);Ce.NonTerminal=Dw;var xw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.Rule=xw;var Lw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.Alternative=Lw;var qw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.Option=qw;var Mw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.RepetitionMandatory=Mw;var Fw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.RepetitionMandatoryWithSeparator=Fw;var jw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.Repetition=jw;var Gw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return e}(Kn);Ce.RepetitionWithSeparator=Gw;var Uw=function(t){_i(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Hn.default)(n,(0,Un.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Kn);Ce.Alternation=Uw;var Jf=function(){function t(e){this.idx=1,(0,Hn.default)(this,(0,Un.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Ce.Terminal=Jf;function QX(t){return(0,Iw.default)(t,Qu)}Ce.serializeGrammar=QX;function Qu(t){function e(a){return(0,Iw.default)(a,Qu)}if(t instanceof Dw){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,iv.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof Lw)return{type:"Alternative",definition:e(t.definition)};if(t instanceof qw)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Mw)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Fw)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:Qu(new Jf({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Gw)return{type:"RepetitionWithSeparator",idx:t.idx,separator:Qu(new Jf({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof jw)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Uw)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof Jf){var n={type:"Terminal",name:t.terminalType.name,label:XX(t.terminalType),idx:t.idx};(0,iv.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,YX.default)(i)?i.source:i),n}else{if(t instanceof xw)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Ce.serializeProduction=Qu});var Hw=d(Zf=>{"use strict";Object.defineProperty(Zf,"__esModule",{value:!0});Zf.GAstVisitor=void 0;var Wn=Qf(),ZX=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case Wn.NonTerminal:return this.visitNonTerminal(r);case Wn.Alternative:return this.visitAlternative(r);case Wn.Option:return this.visitOption(r);case Wn.RepetitionMandatory:return this.visitRepetitionMandatory(r);case Wn.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case Wn.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case Wn.Repetition:return this.visitRepetition(r);case Wn.Alternation:return this.visitAlternation(r);case Wn.Terminal:return this.visitTerminal(r);case Wn.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();Zf.GAstVisitor=ZX});var Ww=d((mye,Kw)=>{var eJ=na();function tJ(t,e){var r;return eJ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}Kw.exports=tJ});var ed=d((yye,Bw)=>{var rJ=Lg(),nJ=Br(),iJ=Ww(),aJ=Oe(),oJ=Xu();function sJ(t,e,r){var n=aJ(t)?rJ:iJ;return r&&oJ(t,e,r)&&(e=void 0),n(t,nJ(e,3))}Bw.exports=sJ});var zw=d((gye,Vw)=>{function uJ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}Vw.exports=uJ});var Xw=d((vye,Yw)=>{var lJ=na();function cJ(t,e){var r=!0;return lJ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}Yw.exports=cJ});var Zu=d((Tye,Jw)=>{var fJ=zw(),dJ=Xw(),pJ=Br(),hJ=Oe(),mJ=Xu();function yJ(t,e,r){var n=hJ(t)?fJ:dJ;return r&&mJ(t,e,r)&&(e=void 0),n(t,pJ(e,3))}Jw.exports=yJ});var av=d((_ye,Qw)=>{function gJ(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}Qw.exports=gJ});var e$=d((Rye,Zw)=>{function vJ(t){return t!==t}Zw.exports=vJ});var r$=d((Aye,t$)=>{function TJ(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}t$.exports=TJ});var td=d((Sye,n$)=>{var _J=av(),RJ=e$(),AJ=r$();function SJ(t,e,r){return e===e?AJ(t,e,r):_J(t,RJ,r)}n$.exports=SJ});var Ri=d((bye,i$)=>{var bJ=td(),CJ=vn(),PJ=Yu(),EJ=us(),kJ=jn(),NJ=Math.max;function wJ(t,e,r,n){t=CJ(t)?t:kJ(t),r=r&&!n?EJ(r):0;var i=t.length;return r<0&&(r=NJ(i+r,0)),PJ(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&bJ(t,e,r)>-1}i$.exports=wJ});var a$=d(Vr=>{"use strict";var sv=Vr&&Vr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Vr,"__esModule",{value:!0});Vr.getProductionDslName=Vr.isBranchingProd=Vr.isOptionalProd=Vr.isSequenceProd=void 0;var $J=sv(ed()),OJ=sv(Zu()),IJ=sv(Ri()),rt=Qf();function DJ(t){return t instanceof rt.Alternative||t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionMandatory||t instanceof rt.RepetitionMandatoryWithSeparator||t instanceof rt.RepetitionWithSeparator||t instanceof rt.Terminal||t instanceof rt.Rule}Vr.isSequenceProd=DJ;function ov(t,e){e===void 0&&(e=[]);var r=t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionWithSeparator;return r?!0:t instanceof rt.Alternation?(0,$J.default)(t.definition,function(n){return ov(n,e)}):t instanceof rt.NonTerminal&&(0,IJ.default)(e,t)?!1:t instanceof rt.AbstractProduction?(t instanceof rt.NonTerminal&&e.push(t),(0,OJ.default)(t.definition,function(n){return ov(n,e)})):!1}Vr.isOptionalProd=ov;function xJ(t){return t instanceof rt.Alternation}Vr.isBranchingProd=xJ;function LJ(t){if(t instanceof rt.NonTerminal)return"SUBRULE";if(t instanceof rt.Option)return"OPTION";if(t instanceof rt.Alternation)return"OR";if(t instanceof rt.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof rt.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof rt.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof rt.Repetition)return"MANY";if(t instanceof rt.Terminal)return"CONSUME";throw Error("non exhaustive match")}Vr.getProductionDslName=LJ});var dt=d(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.isSequenceProd=he.isBranchingProd=he.isOptionalProd=he.getProductionDslName=he.GAstVisitor=he.serializeProduction=he.serializeGrammar=he.Alternative=he.Alternation=he.RepetitionWithSeparator=he.RepetitionMandatoryWithSeparator=he.RepetitionMandatory=he.Repetition=he.Option=he.NonTerminal=he.Terminal=he.Rule=void 0;var zr=Qf();Object.defineProperty(he,"Rule",{enumerable:!0,get:function(){return zr.Rule}});Object.defineProperty(he,"Terminal",{enumerable:!0,get:function(){return zr.Terminal}});Object.defineProperty(he,"NonTerminal",{enumerable:!0,get:function(){return zr.NonTerminal}});Object.defineProperty(he,"Option",{enumerable:!0,get:function(){return zr.Option}});Object.defineProperty(he,"Repetition",{enumerable:!0,get:function(){return zr.Repetition}});Object.defineProperty(he,"RepetitionMandatory",{enumerable:!0,get:function(){return zr.RepetitionMandatory}});Object.defineProperty(he,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return zr.RepetitionMandatoryWithSeparator}});Object.defineProperty(he,"RepetitionWithSeparator",{enumerable:!0,get:function(){return zr.RepetitionWithSeparator}});Object.defineProperty(he,"Alternation",{enumerable:!0,get:function(){return zr.Alternation}});Object.defineProperty(he,"Alternative",{enumerable:!0,get:function(){return zr.Alternative}});Object.defineProperty(he,"serializeGrammar",{enumerable:!0,get:function(){return zr.serializeGrammar}});Object.defineProperty(he,"serializeProduction",{enumerable:!0,get:function(){return zr.serializeProduction}});var qJ=Hw();Object.defineProperty(he,"GAstVisitor",{enumerable:!0,get:function(){return qJ.GAstVisitor}});var rd=a$();Object.defineProperty(he,"getProductionDslName",{enumerable:!0,get:function(){return rd.getProductionDslName}});Object.defineProperty(he,"isOptionalProd",{enumerable:!0,get:function(){return rd.isOptionalProd}});Object.defineProperty(he,"isBranchingProd",{enumerable:!0,get:function(){return rd.isBranchingProd}});Object.defineProperty(he,"isSequenceProd",{enumerable:!0,get:function(){return rd.isSequenceProd}})});var nd=d(cs=>{"use strict";var u$=cs&&cs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(cs,"__esModule",{value:!0});cs.RestWalker=void 0;var MJ=u$(Yf()),o$=u$(Mt()),vr=dt(),FJ=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,o$.default)(e.definition,function(i,a){var o=(0,MJ.default)(e.definition,a+1);if(i instanceof vr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof vr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof vr.Alternative)n.walkFlat(i,o,r);else if(i instanceof vr.Option)n.walkOption(i,o,r);else if(i instanceof vr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof vr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof vr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof vr.Repetition)n.walkMany(i,o,r);else if(i instanceof vr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new vr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=s$(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new vr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=s$(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,o$.default)(e.definition,function(o){var s=new vr.Alternative({definition:[o]});i.walk(s,a)})},t}();cs.RestWalker=FJ;function s$(t,e,r){var n=[new vr.Option({definition:[new vr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var d$=d((kye,f$)=>{var l$=$a(),jJ=Du(),GJ=Oe(),c$=l$?l$.isConcatSpreadable:void 0;function UJ(t){return GJ(t)||jJ(t)||!!(c$&&t&&t[c$])}f$.exports=UJ});var id=d((Nye,h$)=>{var HJ=Mf(),KJ=d$();function p$(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=KJ),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?p$(s,e-1,r,n,i):HJ(i,s):n||(i[i.length]=s)}return i}h$.exports=p$});var Tn=d((wye,m$)=>{var WJ=id();function BJ(t){var e=t==null?0:t.length;return e?WJ(t,1):[]}m$.exports=BJ});var uv=d(($ye,y$)=>{var VJ=td();function zJ(t,e){var r=t==null?0:t.length;return!!r&&VJ(t,e,0)>-1}y$.exports=zJ});var lv=d((Oye,g$)=>{function YJ(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}g$.exports=YJ});var ad=d((Iye,v$)=>{function XJ(){}v$.exports=XJ});var _$=d((Dye,T$)=>{var cv=Ng(),JJ=ad(),QJ=qf(),ZJ=1/0,eQ=cv&&1/QJ(new cv([,-0]))[1]==ZJ?function(t){return new cv(t)}:JJ;T$.exports=eQ});var fv=d((xye,R$)=>{var tQ=xf(),rQ=uv(),nQ=lv(),iQ=Lf(),aQ=_$(),oQ=qf(),sQ=200;function uQ(t,e,r){var n=-1,i=rQ,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=nQ;else if(a>=sQ){var l=e?null:aQ(t);if(l)return oQ(l);o=!1,i=iQ,u=new tQ}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var m=u.length;m--;)if(u[m]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}R$.exports=uQ});var od=d((Lye,A$)=>{var lQ=fv();function cQ(t){return t&&t.length?lQ(t):[]}A$.exports=cQ});var hv=d(Yr=>{"use strict";var pv=Yr&&Yr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Yr,"__esModule",{value:!0});Yr.firstForTerminal=Yr.firstForBranching=Yr.firstForSequence=Yr.first=void 0;var fQ=pv(Tn()),b$=pv(od()),dQ=pv(qt()),S$=dt(),dv=dt();function sd(t){if(t instanceof S$.NonTerminal)return sd(t.referencedRule);if(t instanceof S$.Terminal)return E$(t);if((0,dv.isSequenceProd)(t))return C$(t);if((0,dv.isBranchingProd)(t))return P$(t);throw Error("non exhaustive match")}Yr.first=sd;function C$(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,dv.isOptionalProd)(a),e=e.concat(sd(a)),n=n+1,i=r.length>n;return(0,b$.default)(e)}Yr.firstForSequence=C$;function P$(t){var e=(0,dQ.default)(t.definition,function(r){return sd(r)});return(0,b$.default)((0,fQ.default)(e))}Yr.firstForBranching=P$;function E$(t){return[t.terminalType]}Yr.firstForTerminal=E$});var mv=d(ud=>{"use strict";Object.defineProperty(ud,"__esModule",{value:!0});ud.IN=void 0;ud.IN="_~IN~_"});var O$=d(Tr=>{"use strict";var pQ=Tr&&Tr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),k$=Tr&&Tr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Tr,"__esModule",{value:!0});Tr.buildInProdFollowPrefix=Tr.buildBetweenProdsFollowPrefix=Tr.computeAllProdsFollows=Tr.ResyncFollowsWalker=void 0;var hQ=nd(),mQ=hv(),yQ=k$(Mt()),gQ=k$(Ju()),N$=mv(),vQ=dt(),w$=function(t){pQ(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=$$(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new vQ.Alternative({definition:o}),u=(0,mQ.first)(s);this.follows[a]=u},e}(hQ.RestWalker);Tr.ResyncFollowsWalker=w$;function TQ(t){var e={};return(0,yQ.default)(t,function(r){var n=new w$(r).startWalking();(0,gQ.default)(e,n)}),e}Tr.computeAllProdsFollows=TQ;function $$(t,e){return t.name+e+N$.IN}Tr.buildBetweenProdsFollowPrefix=$$;function _Q(t){var e=t.terminalType.name;return e+t.idx+N$.IN}Tr.buildInProdFollowPrefix=_Q});var Da=d((jye,I$)=>{function RQ(t){return t===void 0}I$.exports=RQ});var x$=d((Gye,D$)=>{function AQ(t){return t&&t.length?t[0]:void 0}D$.exports=AQ});var fs=d((Uye,L$)=>{L$.exports=x$()});var el=d((Hye,q$)=>{function SQ(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}q$.exports=SQ});var yv=d((Kye,M$)=>{var bQ=na();function CQ(t,e){var r=[];return bQ(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}M$.exports=CQ});var j$=d((Wye,F$)=>{var PQ="Expected a function";function EQ(t){if(typeof t!="function")throw new TypeError(PQ);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}F$.exports=EQ});var ld=d((Bye,G$)=>{var kQ=Ff(),NQ=yv(),wQ=Br(),$Q=Oe(),OQ=j$();function IQ(t,e){var r=$Q(t)?kQ:NQ;return r(t,OQ(wQ(e,3)))}G$.exports=IQ});var H$=d((Vye,U$)=>{var DQ=xf(),xQ=uv(),LQ=lv(),qQ=Xo(),MQ=zo(),FQ=Lf(),jQ=200;function GQ(t,e,r,n){var i=-1,a=xQ,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=qQ(e,MQ(r))),n?(a=LQ,o=!1):e.length>=jQ&&(a=FQ,o=!1,e=new DQ(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}U$.exports=GQ});var W$=d((zye,K$)=>{var UQ=vn(),HQ=gn();function KQ(t){return HQ(t)&&UQ(t)}K$.exports=KQ});var cd=d((Yye,V$)=>{var WQ=H$(),BQ=id(),VQ=Xf(),B$=W$(),zQ=VQ(function(t,e){return B$(t)?WQ(t,BQ(e,1,B$,!0)):[]});V$.exports=zQ});var Y$=d((Xye,z$)=>{var YQ=td(),XQ=us(),JQ=Math.max;function QQ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:XQ(r);return i<0&&(i=JQ(n+i,0)),YQ(t,e,i)}z$.exports=QQ});var J$=d((Jye,X$)=>{var ZQ=Br(),eZ=vn(),tZ=Er();function rZ(t){return function(e,r,n){var i=Object(e);if(!eZ(e)){var a=ZQ(r,3);e=tZ(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}X$.exports=rZ});var Z$=d((Qye,Q$)=>{var nZ=av(),iZ=Br(),aZ=us(),oZ=Math.max;function sZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:aZ(r);return i<0&&(i=oZ(n+i,0)),nZ(t,iZ(e,3),i)}Q$.exports=sZ});var fd=d((Zye,eO)=>{var uZ=J$(),lZ=Z$(),cZ=uZ(lZ);eO.exports=cZ});var tl=d((ege,tO)=>{var fZ=Ff(),dZ=yv(),pZ=Br(),hZ=Oe();function mZ(t,e){var r=hZ(t)?fZ:dZ;return r(t,pZ(e,3))}tO.exports=mZ});var gv=d((tge,nO)=>{var yZ=Xf(),gZ=Jo(),vZ=Xu(),TZ=Vu(),rO=Object.prototype,_Z=rO.hasOwnProperty,RZ=yZ(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&vZ(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=TZ(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||gZ(c,rO[l])&&!_Z.call(t,l))&&(t[l]=a[l])}return t});nO.exports=RZ});var aO=d((rge,iO)=>{function AZ(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}iO.exports=AZ});var sO=d((nge,oO)=>{function SZ(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}oO.exports=SZ});var Ai=d((ige,uO)=>{var bZ=aO(),CZ=na(),PZ=Br(),EZ=sO(),kZ=Oe();function NZ(t,e,r){var n=kZ(t)?bZ:EZ,i=arguments.length<3;return n(t,PZ(e,4),r,i,CZ)}uO.exports=NZ});var pd=d(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.clearRegExpParserCache=ds.getRegExpAst=void 0;var wZ=Cu(),dd={},$Z=new wZ.RegExpParser;function OZ(t){var e=t.toString();if(dd.hasOwnProperty(e))return dd[e];var r=$Z.pattern(e);return dd[e]=r,r}ds.getRegExpAst=OZ;function IZ(){dd={}}ds.clearRegExpParserCache=IZ});var hO=d(tr=>{"use strict";var DZ=tr&&tr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ps=tr&&tr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(tr,"__esModule",{value:!0});tr.canMatchCharCode=tr.firstCharOptimizedIndices=tr.getOptimizedStartCodesIndices=tr.failedOptimizationPrefixMsg=void 0;var fO=Cu(),xZ=ps(Oe()),LZ=ps(Zu()),qZ=ps(Mt()),vv=ps(fd()),MZ=ps(jn()),_v=ps(Ri()),lO=ss(),dO=pd(),Si=Rv(),pO="Complement Sets are not supported for first char optimization";tr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function FZ(t,e){e===void 0&&(e=!1);try{var r=(0,dO.getRegExpAst)(t),n=md(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===pO)e&&(0,lO.PRINT_WARNING)("".concat(tr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,lO.PRINT_ERROR)("".concat(tr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(fO.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}tr.getOptimizedStartCodesIndices=FZ;function md(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)md(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":hd(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(pO);(0,qZ.default)(o.value,function(l){if(typeof l=="number")hd(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)hd(f,e,r);else{for(var f=c.from;f<=c.to&&f<Si.minOptimizationVal;f++)hd(f,e,r);if(c.to>=Si.minOptimizationVal)for(var m=c.from>=Si.minOptimizationVal?c.from:Si.minOptimizationVal,v=c.to,y=(0,Si.charCodeToOptimizedIndex)(m),R=(0,Si.charCodeToOptimizedIndex)(v),P=y;P<=R;P++)e[P]=P}}});break;case"Group":md(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&Tv(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,MZ.default)(e)}tr.firstCharOptimizedIndices=md;function hd(t,e,r){var n=(0,Si.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&jZ(t,e)}function jZ(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Si.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Si.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function cO(t,e){return(0,vv.default)(t.value,function(r){if(typeof r=="number")return(0,_v.default)(e,r);var n=r;return(0,vv.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function Tv(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,xZ.default)(t.value)?(0,LZ.default)(t.value,Tv):Tv(t.value):!1}var GZ=function(t){DZ(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,_v.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?cO(r,this.targetCharCodes)===void 0&&(this.found=!0):cO(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(fO.BaseRegExpVisitor);function UZ(t,e){if(e instanceof RegExp){var r=(0,dO.getRegExpAst)(e),n=new GZ(t);return n.visit(r),n.found}else return(0,vv.default)(e,function(i){return(0,_v.default)(t,i.charCodeAt(0))})!==void 0}tr.canMatchCharCode=UZ});var Rv=d(K=>{"use strict";var gO=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),lt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var vO=Cu(),De=rl(),HZ=lt(fs()),TO=lt(Pr()),_O=lt(el()),gd=lt(Oe()),KZ=lt(jn()),WZ=lt(Tn()),RO=lt(ld()),AO=lt(cd()),mO=lt(Y$()),nt=lt(qt()),bi=lt(Mt()),Ci=lt(Yu()),Td=lt(Ko()),Sv=lt(Da()),BZ=lt(fd()),rr=lt(kr()),VZ=lt(Er()),ia=lt(rv()),Bn=lt(tl()),zZ=lt(gv()),vd=lt(Ai()),_d=lt(Ri()),yO=ss(),hs=hO(),SO=pd(),xa="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function YZ(){K.SUPPORT_STICKY=!1}K.disableSticky=YZ;function XZ(){K.SUPPORT_STICKY=!0}K.enableSticky=XZ;function JZ(t,e){e=(0,zZ.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(b,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){see()});var n;r("Reject Lexer.NA",function(){n=(0,RO.default)(t,function(b){return b[xa]===De.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,nt.default)(n,function(b){var S=b[xa];if((0,ia.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,_d.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?Cv(S):bv(S)}else{if((0,Td.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?Cv(W):bv(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,nt.default)(n,function(b){return b.tokenTypeIdx}),s=(0,nt.default)(n,function(b){var S=b.GROUP;if(S!==De.Lexer.SKIPPED){if((0,Ci.default)(S))return S;if((0,Sv.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,nt.default)(n,function(b){var S=b.LONGER_ALT;if(S){var O=(0,gd.default)(S)?(0,nt.default)(S,function(F){return(0,mO.default)(n,F)}):[(0,mO.default)(n,S)];return O}}),l=(0,nt.default)(n,function(b){return b.PUSH_MODE}),c=(0,nt.default)(n,function(b){return(0,rr.default)(b,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var b=qO(e.lineTerminatorCharacters);f=(0,nt.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,nt.default)(n,function(S){return(0,rr.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:xO(S,b)===!1&&(0,hs.canMatchCharCode)(b,S.PATTERN)}))});var m,v,y,R;r("Misc Mapping #2",function(){m=(0,nt.default)(n,Ev),v=(0,nt.default)(a,DO),y=(0,vd.default)(n,function(b,S){var O=S.GROUP;return(0,Ci.default)(O)&&O!==De.Lexer.SKIPPED&&(b[O]=[]),b},{}),R=(0,nt.default)(a,function(b,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:f[S],isCustom:m[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var P=!0,E=[];return e.safeMode||r("First Char Optimization",function(){E=(0,vd.default)(n,function(b,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=Pv(F);Av(b,W,R[O])}else if((0,gd.default)(S.START_CHARS_HINT)){var re;(0,bi.default)(S.START_CHARS_HINT,function(V){var Ae=typeof V=="string"?V.charCodeAt(0):V,Ye=Pv(Ae);re!==Ye&&(re=Ye,Av(b,Ye,R[O]))})}else if((0,ia.default)(S.PATTERN))if(S.PATTERN.unicode)P=!1,e.ensureOptimizations&&(0,yO.PRINT_ERROR)("".concat(hs.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var Ne=(0,hs.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,TO.default)(Ne)&&(P=!1),(0,bi.default)(Ne,function(V){Av(b,V,R[O])})}else e.ensureOptimizations&&(0,yO.PRINT_ERROR)("".concat(hs.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),P=!1;return b},[])}),{emptyGroups:y,patternIdxToConfig:R,charCodeToPatternIdxToConfig:E,hasCustom:i,canBeOptimized:P}}K.analyzeTokenTypes=JZ;function QZ(t,e){var r=[],n=bO(t);r=r.concat(n.errors);var i=CO(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(ZZ(a)),r=r.concat($O(a)),r=r.concat(OO(a,e)),r=r.concat(IO(a)),r}K.validatePatterns=QZ;function ZZ(t){var e=[],r=(0,Bn.default)(t,function(n){return(0,ia.default)(n[xa])});return e=e.concat(PO(r)),e=e.concat(kO(r)),e=e.concat(NO(r)),e=e.concat(wO(r)),e=e.concat(EO(r)),e}function bO(t){var e=(0,Bn.default)(t,function(i){return!(0,rr.default)(i,xa)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:De.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,AO.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=bO;function CO(t){var e=(0,Bn.default)(t,function(i){var a=i[xa];return!(0,ia.default)(a)&&!(0,Td.default)(a)&&!(0,rr.default)(a,"exec")&&!(0,Ci.default)(a)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:De.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,AO.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=CO;var eee=/[^\\][$]/;function PO(t){var e=function(i){gO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(vO.BaseRegExpVisitor),r=(0,Bn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,SO.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return eee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=PO;function EO(t){var e=(0,Bn.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:De.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=EO;var tee=/[^\\[][\^]|^\^/;function kO(t){var e=function(i){gO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(vO.BaseRegExpVisitor),r=(0,Bn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,SO.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return tee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=kO;function NO(t){var e=(0,Bn.default)(t,function(n){var i=n[xa];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:De.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=NO;function wO(t){var e=[],r=(0,nt.default)(t,function(a){return(0,vd.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,_d.default)(e,s)&&s.PATTERN!==De.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,_O.default)(r);var n=(0,Bn.default)(r,function(a){return a.length>1}),i=(0,nt.default)(n,function(a){var o=(0,nt.default)(a,function(u){return u.name}),s=(0,HZ.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:De.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=wO;function $O(t){var e=(0,Bn.default)(t,function(n){if(!(0,rr.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==De.Lexer.SKIPPED&&i!==De.Lexer.NA&&!(0,Ci.default)(i)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:De.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=$O;function OO(t,e){var r=(0,Bn.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,_d.default)(e,i.PUSH_MODE)}),n=(0,nt.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:De.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=OO;function IO(t){var e=[],r=(0,vd.default)(t,function(n,i,a){var o=i.PATTERN;return o===De.Lexer.NA||((0,Ci.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,ia.default)(o)&&nee(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,bi.default)(t,function(n,i){(0,bi.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&ree(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:De.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=IO;function ree(t,e){if((0,ia.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,Td.default)(e))return e(t,0,[],{});if((0,rr.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function nee(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,BZ.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function bv(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=bv;function Cv(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=Cv;function iee(t,e,r){var n=[];return(0,rr.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,rr.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,rr.default)(t,K.MODES)&&(0,rr.default)(t,K.DEFAULT_MODE)&&!(0,rr.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,rr.default)(t,K.MODES)&&(0,bi.default)(t.modes,function(i,a){(0,bi.default)(i,function(o,s){if((0,Sv.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:De.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,rr.default)(o,"LONGER_ALT")){var u=(0,gd.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,bi.default)(u,function(l){!(0,Sv.default)(l)&&!(0,_d.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=iee;function aee(t,e,r){var n=[],i=!1,a=(0,_O.default)((0,WZ.default)((0,KZ.default)(t.modes))),o=(0,RO.default)(a,function(u){return u[xa]===De.Lexer.NA}),s=qO(r);return e&&(0,bi.default)(o,function(u){var l=xO(u,s);if(l!==!1){var c=LO(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,rr.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,hs.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:De.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=aee;function oee(t){var e={},r=(0,VZ.default)(t);return(0,bi.default)(r,function(n){var i=t[n];if((0,gd.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=oee;function Ev(t){var e=t.PATTERN;if((0,ia.default)(e))return!1;if((0,Td.default)(e))return!0;if((0,rr.default)(e,"exec"))return!0;if((0,Ci.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=Ev;function DO(t){return(0,Ci.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=DO;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function xO(t,e){if((0,rr.default)(t,"LINE_BREAKS"))return!1;if((0,ia.default)(t.PATTERN)){try{(0,hs.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Ci.default)(t.PATTERN))return!1;if(Ev(t))return{issue:De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function LO(t,e){if(e.issue===De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=LO;function qO(t){var e=(0,nt.default)(t,function(r){return(0,Ci.default)(r)?r.charCodeAt(0):r});return e}function Av(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var yd=[];function Pv(t){return t<K.minOptimizationVal?t:yd[t]}K.charCodeToOptimizedIndex=Pv;function see(){if((0,TO.default)(yd)){yd=new Array(65536);for(var t=0;t<65536;t++)yd[t]=t>255?255+~~(t/255):t}}});var Rd=d((uge,MO)=>{function uee(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}MO.exports=uee});var qa=d(fe=>{"use strict";var Vn=fe&&fe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fe,"__esModule",{value:!0});fe.isTokenType=fe.hasExtendingTokensTypesMapProperty=fe.hasExtendingTokensTypesProperty=fe.hasCategoriesProperty=fe.hasShortKeyProperty=fe.singleAssignCategoriesToksMap=fe.assignCategoriesMapProp=fe.assignCategoriesTokensProp=fe.assignTokenDefaultProps=fe.expandCategories=fe.augmentTokenTypes=fe.tokenIdxToClass=fe.tokenShortNameIdx=fe.tokenStructuredMatcherNoCategories=fe.tokenStructuredMatcher=void 0;var lee=Vn(Pr()),cee=Vn(el()),fee=Vn(Oe()),dee=Vn(Tn()),pee=Vn(cd()),hee=Vn(qt()),La=Vn(Mt()),nl=Vn(kr()),mee=Vn(Ri()),yee=Vn(Ti());function gee(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}fe.tokenStructuredMatcher=gee;function vee(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}fe.tokenStructuredMatcherNoCategories=vee;fe.tokenShortNameIdx=1;fe.tokenIdxToClass={};function Tee(t){var e=FO(t);jO(e),UO(e),GO(e),(0,La.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}fe.augmentTokenTypes=Tee;function FO(t){for(var e=(0,yee.default)(t),r=t,n=!0;n;){r=(0,cee.default)((0,dee.default)((0,hee.default)(r,function(a){return a.CATEGORIES})));var i=(0,pee.default)(r,e);e=e.concat(i),(0,lee.default)(i)?n=!1:r=i}return e}fe.expandCategories=FO;function jO(t){(0,La.default)(t,function(e){HO(e)||(fe.tokenIdxToClass[fe.tokenShortNameIdx]=e,e.tokenTypeIdx=fe.tokenShortNameIdx++),kv(e)&&!(0,fee.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),kv(e)||(e.CATEGORIES=[]),KO(e)||(e.categoryMatches=[]),WO(e)||(e.categoryMatchesMap={})})}fe.assignTokenDefaultProps=jO;function GO(t){(0,La.default)(t,function(e){e.categoryMatches=[],(0,La.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(fe.tokenIdxToClass[n].tokenTypeIdx)})})}fe.assignCategoriesTokensProp=GO;function UO(t){(0,La.default)(t,function(e){Nv([],e)})}fe.assignCategoriesMapProp=UO;function Nv(t,e){(0,La.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,La.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,mee.default)(n,r)||Nv(n,r)})}fe.singleAssignCategoriesToksMap=Nv;function HO(t){return(0,nl.default)(t,"tokenTypeIdx")}fe.hasShortKeyProperty=HO;function kv(t){return(0,nl.default)(t,"CATEGORIES")}fe.hasCategoriesProperty=kv;function KO(t){return(0,nl.default)(t,"categoryMatches")}fe.hasExtendingTokensTypesProperty=KO;function WO(t){return(0,nl.default)(t,"categoryMatchesMap")}fe.hasExtendingTokensTypesMapProperty=WO;function _ee(t){return(0,nl.default)(t,"tokenTypeIdx")}fe.isTokenType=_ee});var wv=d(Ad=>{"use strict";Object.defineProperty(Ad,"__esModule",{value:!0});Ad.defaultLexerErrorProvider=void 0;Ad.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var rl=d(Ei=>{"use strict";var Nr=Ei&&Ei.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ei,"__esModule",{value:!0});Ei.Lexer=Ei.LexerDefinitionErrorType=void 0;var Pi=Rv(),$v=Nr(ad()),Sd=Nr(Pr()),Ree=Nr(Oe()),Aee=Nr(Rd()),See=Nr(ld()),BO=Nr(qt()),Ov=Nr(Mt()),bee=Nr(Er()),Cee=Nr(Da()),VO=Nr(Ia()),zO=Nr(Ju()),Pee=Nr(Ai()),YO=Nr(Ti()),Iv=ss(),Eee=qa(),kee=wv(),Nee=pd(),wee;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(wee=Ei.LexerDefinitionErrorType||(Ei.LexerDefinitionErrorType={}));var il={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:kee.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(il);var $ee=function(){function t(e,r){r===void 0&&(r=il);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,Iv.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,zO.default)({},il,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===il.lineTerminatorsPattern)n.config.lineTerminatorsPattern=Pi.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===il.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,Ree.default)(e)?a={modes:{defaultMode:(0,YO.default)(e)},defaultMode:Pi.DEFAULT_MODE}:(o=!1,a=(0,YO.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Pi.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,Pi.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,Ov.default)(a.modes,function(c,f){a.modes[f]=(0,See.default)(c,function(m){return(0,Cee.default)(m)})});var s=(0,bee.default)(a.modes);if((0,Ov.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Pi.validatePatterns)(c,s))}),(0,Sd.default)(n.lexerDefinitionErrors)){(0,Eee.augmentTokenTypes)(c);var m;n.TRACE_INIT("analyzeTokenTypes",function(){m=(0,Pi.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=m.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=m.charCodeToPatternIdxToConfig,n.emptyGroups=(0,zO.default)({},n.emptyGroups,m.emptyGroups),n.hasCustom=m.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=m.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,Sd.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,BO.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,Ov.default)(n.lexerDefinitionWarning,function(c){(0,Iv.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(Pi.SUPPORT_STICKY?(n.chopInput=VO.default,n.match=n.matchWithTest):(n.updateLastIndex=$v.default,n.match=n.matchWithExec),o&&(n.handleModes=$v.default),n.trackStartLines===!1&&(n.computeNewColumn=VO.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=$v.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Pee.default)(n.canModeBeOptimized,function(f,m,v){return m===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,Sd.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,Nee.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,Iv.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,Sd.default)(this.lexerDefinitionErrors)){var n=(0,BO.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,m,v,y,R,P,E,b,S,O=e,F=O.length,W=0,re=0,Ne=this.hasCustom?0:Math.floor(e.length/10),V=new Array(Ne),Ae=[],Ye=this.trackStartLines?1:void 0,We=this.trackStartLines?1:void 0,q=(0,Pi.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,oe=[],se=[],ee=[],st=[];Object.freeze(st);var Xe;function Ct(){return oe}function Qr($t){var en=(0,Pi.charCodeToOptimizedIndex)($t),tn=se[en];return tn===void 0?st:tn}var Ar=function($t){if(ee.length===1&&$t.tokenType.PUSH_MODE===void 0){var en=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage($t);Ae.push({offset:$t.startOffset,line:$t.startLine,column:$t.startColumn,length:$t.image.length,message:en})}else{ee.pop();var tn=(0,Aee.default)(ee);oe=n.patternIdxToConfig[tn],se=n.charCodeToPatternIdxToConfig[tn],B=oe.length;var En=n.canModeBeOptimized[tn]&&n.config.safeMode===!1;se&&En?Xe=Qr:Xe=Ct}};function Qa($t){ee.push($t),se=this.charCodeToPatternIdxToConfig[$t],oe=this.patternIdxToConfig[$t],B=oe.length,B=oe.length;var en=this.canModeBeOptimized[$t]&&this.config.safeMode===!1;se&&en?Xe=Qr:Xe=Ct}Qa.call(this,r);for(var ir,Za=this.config.recoveryEnabled;W<F;){l=null;var eo=O.charCodeAt(W),to=Xe(eo),Js=to.length;for(i=0;i<Js;i++){ir=to[i];var ct=ir.pattern;c=null;var ii=ir.short;if(ii!==!1?eo===ii&&(l=ct):ir.isCustom===!0?(S=ct.exec(O,W,V,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(ct,W),l=this.match(ct,e,W)),l!==null){if(u=ir.longerAlt,u!==void 0){var Qs=u.length;for(o=0;o<Qs;o++){var bn=oe[u[o]],ya=bn.pattern;if(f=null,bn.isCustom===!0?(S=ya.exec(O,W,V,q),S!==null?(s=S[0],S.payload!==void 0&&(f=S.payload)):s=null):(this.updateLastIndex(ya,W),s=this.match(ya,e,W)),s&&s.length>l.length){l=s,c=f,ir=bn;break}}}break}}if(l!==null){if(m=l.length,v=ir.group,v!==void 0&&(y=ir.tokenTypeIdx,R=this.createTokenInstance(l,W,y,ir.tokenType,Ye,We,m),this.handlePayload(R,c),v===!1?re=this.addToken(V,re,R):q[v].push(R)),e=this.chopInput(e,m),W=W+m,We=this.computeNewColumn(We,m),L===!0&&ir.canLineTerminator===!0){var Cn=0,ga=void 0,Ir=void 0;j.lastIndex=0;do ga=j.test(l),ga===!0&&(Ir=j.lastIndex-1,Cn++);while(ga===!0);Cn!==0&&(Ye=Ye+Cn,We=m-Ir,this.updateTokenEndLineColumnLocation(R,v,Ir,Cn,Ye,We,m))}this.handleModes(ir,Ar,Qa,R)}else{for(var Zr=W,ro=Ye,no=We,Sr=Za===!1;Sr===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var Pn=oe[a],ct=Pn.pattern,ii=Pn.short;if(ii!==!1?O.charCodeAt(W)===ii&&(Sr=!0):Pn.isCustom===!0?Sr=ct.exec(O,W,V,q)!==null:(this.updateLastIndex(ct,W),Sr=ct.exec(e)!==null),Sr===!0)break}if(P=W-Zr,b=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,Zr,P,ro,no),Ae.push({offset:Zr,line:ro,column:no,length:P,message:b}),Za===!1)break}}return this.hasCustom||(V.length=re),{tokens:V,groups:q,errors:Ae}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();Ei.Lexer=$ee});var Ma=d(wt=>{"use strict";var Dv=wt&&wt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wt,"__esModule",{value:!0});wt.tokenMatcher=wt.createTokenInstance=wt.EOF=wt.createToken=wt.hasTokenLabel=wt.tokenName=wt.tokenLabel=void 0;var Oee=Dv(Yu()),ki=Dv(kr()),Iee=Dv(Da()),Dee=rl(),xv=qa();function xee(t){return iI(t)?t.LABEL:t.name}wt.tokenLabel=xee;function Lee(t){return t.name}wt.tokenName=Lee;function iI(t){return(0,Oee.default)(t.LABEL)&&t.LABEL!==""}wt.hasTokenLabel=iI;var qee="parent",XO="categories",JO="label",QO="group",ZO="push_mode",eI="pop_mode",tI="longer_alt",rI="line_breaks",nI="start_chars_hint";function aI(t){return Mee(t)}wt.createToken=aI;function Mee(t){var e=t.pattern,r={};if(r.name=t.name,(0,Iee.default)(e)||(r.PATTERN=e),(0,ki.default)(t,qee))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,ki.default)(t,XO)&&(r.CATEGORIES=t[XO]),(0,xv.augmentTokenTypes)([r]),(0,ki.default)(t,JO)&&(r.LABEL=t[JO]),(0,ki.default)(t,QO)&&(r.GROUP=t[QO]),(0,ki.default)(t,eI)&&(r.POP_MODE=t[eI]),(0,ki.default)(t,ZO)&&(r.PUSH_MODE=t[ZO]),(0,ki.default)(t,tI)&&(r.LONGER_ALT=t[tI]),(0,ki.default)(t,rI)&&(r.LINE_BREAKS=t[rI]),(0,ki.default)(t,nI)&&(r.START_CHARS_HINT=t[nI]),r}wt.EOF=aI({name:"EOF",pattern:Dee.Lexer.NA});(0,xv.augmentTokenTypes)([wt.EOF]);function Fee(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}wt.createTokenInstance=Fee;function jee(t,e){return(0,xv.tokenStructuredMatcher)(t,e)}wt.tokenMatcher=jee});var ys=d(_n=>{"use strict";var Mv=_n&&_n.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_n,"__esModule",{value:!0});_n.defaultGrammarValidatorErrorProvider=_n.defaultGrammarResolverErrorProvider=_n.defaultParserErrorProvider=void 0;var ms=Ma(),qv=Mv(fs()),aa=Mv(qt()),Gee=Mv(Ai()),Lv=dt(),oI=dt();_n.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,ms.hasTokenLabel)(e),o=a?"--> ".concat((0,ms.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,qv.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,Gee.default)(e,function(v,y){return v.concat(y)},[]),c=(0,aa.default)(l,function(v){return"[".concat((0,aa.default)(v,function(y){return(0,ms.tokenLabel)(y)}).join(", "),"]")}),f=(0,aa.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),m=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+m+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,qv.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,aa.default)(e,function(c){return"[".concat((0,aa.default)(c,function(f){return(0,ms.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(_n.defaultParserErrorProvider);_n.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};_n.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof Lv.Terminal?c.terminalType.name:c instanceof Lv.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,qv.default)(e),a=i.idx,o=(0,oI.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,aa.default)(t.prefixPath,function(i){return(0,ms.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,aa.default)(t.prefixPath,function(i){return(0,ms.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,oI.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,aa.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof Lv.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var lI=d(zn=>{"use strict";var Uee=zn&&zn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),sI=zn&&zn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zn,"__esModule",{value:!0});zn.GastRefResolverVisitor=zn.resolveGrammar=void 0;var Hee=_r(),Kee=sI(Mt()),Wee=sI(jn()),Bee=dt();function Vee(t,e){var r=new uI(t,e);return r.resolveRefs(),r.errors}zn.resolveGrammar=Vee;var uI=function(t){Uee(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,Kee.default)((0,Wee.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:Hee.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(Bee.GAstVisitor);zn.GastRefResolverVisitor=uI});var fI=d((mge,cI)=>{function zee(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}cI.exports=zee});var pI=d((yge,dI)=>{var Yee=na();function Xee(t,e,r,n){return Yee(t,function(i,a,o){e(n,i,r(i),o)}),n}dI.exports=Xee});var mI=d((gge,hI)=>{var Jee=fI(),Qee=pI(),Zee=Br(),ete=Oe();function tte(t,e){return function(r,n){var i=ete(r)?Jee:Qee,a=e?e():{};return i(r,t,Zee(n,2),a)}}hI.exports=tte});var Fv=d((vge,yI)=>{var rte=Kf(),nte=mI(),ite=Object.prototype,ate=ite.hasOwnProperty,ote=nte(function(t,e,r){ate.call(t,r)?t[r].push(e):rte(t,r,[e])});yI.exports=ote});var bd=d((Tge,gI)=>{var ste=id(),ute=qt();function lte(t,e){return ste(ute(t,e),1)}gI.exports=lte});var Cd=d((_ge,vI)=>{var cte=zf(),fte=us();function dte(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:fte(e),e=n-e,cte(t,0,e<0?0:e)):[]}vI.exports=dte});var ol=d(it=>{"use strict";var ja=it&&it.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ga=it&&it.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(it,"__esModule",{value:!0});it.nextPossibleTokensAfter=it.possiblePathsFrom=it.NextTerminalAfterAtLeastOneSepWalker=it.NextTerminalAfterAtLeastOneWalker=it.NextTerminalAfterManySepWalker=it.NextTerminalAfterManyWalker=it.AbstractNextTerminalAfterProductionWalker=it.NextAfterTokenWalker=it.AbstractNextPossibleTokensWalker=void 0;var _I=nd(),Ed=Ga(fs()),Pd=Ga(Pr()),TI=Ga(Cd()),cr=Ga(Yf()),pte=Ga(Rd()),hte=Ga(Mt()),Fa=Ga(Ti()),mte=hv(),de=dt(),RI=function(t){ja(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,Fa.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,Fa.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,Pd.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(_I.RestWalker);it.AbstractNextPossibleTokensWalker=RI;var yte=function(t){ja(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,mte.first)(o),this.found=!0}},e}(RI);it.NextAfterTokenWalker=yte;var al=function(t){ja(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(_I.RestWalker);it.AbstractNextTerminalAfterProductionWalker=al;var gte=function(t){ja(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Ed.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(al);it.NextTerminalAfterManyWalker=gte;var vte=function(t){ja(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Ed.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(al);it.NextTerminalAfterManySepWalker=vte;var Tte=function(t){ja(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Ed.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(al);it.NextTerminalAfterAtLeastOneWalker=Tte;var _te=function(t){ja(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Ed.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(al);it.NextTerminalAfterAtLeastOneSepWalker=_te;function AI(t,e,r){r===void 0&&(r=[]),r=(0,Fa.default)(r);var n=[],i=0;function a(l){return l.concat((0,cr.default)(t,i+1))}function o(l){var c=AI(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,hte.default)(s.definition,function(l){(0,Pd.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,cr.default)(t,i)}),n}it.possiblePathsFrom=AI;function Rte(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,Pd.default)(f);){var m=f.pop();if(m===o){s&&(0,pte.default)(f).idx<=l&&f.pop();continue}var v=m.def,y=m.idx,R=m.ruleStack,P=m.occurrenceStack;if(!(0,Pd.default)(v)){var E=v[0];if(E===i){var b={idx:y,def:(0,cr.default)(v),ruleStack:(0,TI.default)(R),occurrenceStack:(0,TI.default)(P)};f.push(b)}else if(E instanceof de.Terminal)if(y<u-1){var S=y+1,O=e[S];if(r(O,E.terminalType)){var b={idx:S,def:(0,cr.default)(v),ruleStack:R,occurrenceStack:P};f.push(b)}}else if(y===u-1)c.push({nextTokenType:E.terminalType,nextTokenOccurrence:E.idx,ruleStack:R,occurrenceStack:P}),s=!0;else throw Error("non exhaustive match");else if(E instanceof de.NonTerminal){var F=(0,Fa.default)(R);F.push(E.nonTerminalName);var W=(0,Fa.default)(P);W.push(E.idx);var b={idx:y,def:E.definition.concat(a,(0,cr.default)(v)),ruleStack:F,occurrenceStack:W};f.push(b)}else if(E instanceof de.Option){var re={idx:y,def:(0,cr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ne={idx:y,def:E.definition.concat((0,cr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.RepetitionMandatory){var V=new de.Repetition({definition:E.definition,idx:E.idx}),Ae=E.definition.concat([V],(0,cr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(E instanceof de.RepetitionMandatoryWithSeparator){var Ye=new de.Terminal({terminalType:E.separator}),V=new de.Repetition({definition:[Ye].concat(E.definition),idx:E.idx}),Ae=E.definition.concat([V],(0,cr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(E instanceof de.RepetitionWithSeparator){var re={idx:y,def:(0,cr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ye=new de.Terminal({terminalType:E.separator}),We=new de.Repetition({definition:[Ye].concat(E.definition),idx:E.idx}),Ae=E.definition.concat([We],(0,cr.default)(v)),Ne={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.Repetition){var re={idx:y,def:(0,cr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var We=new de.Repetition({definition:E.definition,idx:E.idx}),Ae=E.definition.concat([We],(0,cr.default)(v)),Ne={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.Alternation)for(var q=E.definition.length-1;q>=0;q--){var L=E.definition[q],j={idx:y,def:L.definition.concat((0,cr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(j),f.push(o)}else if(E instanceof de.Alternative)f.push({idx:y,def:E.definition.concat((0,cr.default)(v)),ruleStack:R,occurrenceStack:P});else if(E instanceof de.Rule)f.push(Ate(E,y,R,P));else throw Error("non exhaustive match")}}return c}it.nextPossibleTokensAfter=Rte;function Ate(t,e,r,n){var i=(0,Fa.default)(r);i.push(t.name);var a=(0,Fa.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var gs=d(Re=>{"use strict";var PI=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ka=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var Gv=Ka(Pr()),EI=Ka(Tn()),Ha=Ka(Zu()),kd=Ka(qt()),Ua=Ka(Mt()),SI=Ka(kr()),kI=Ka(Ai()),bI=ol(),Ste=nd(),Nd=qa(),oa=dt(),bte=dt(),At;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(At=Re.PROD_TYPE||(Re.PROD_TYPE={}));function NI(t){if(t instanceof oa.Option||t==="Option")return At.OPTION;if(t instanceof oa.Repetition||t==="Repetition")return At.REPETITION;if(t instanceof oa.RepetitionMandatory||t==="RepetitionMandatory")return At.REPETITION_MANDATORY;if(t instanceof oa.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return At.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof oa.RepetitionWithSeparator||t==="RepetitionWithSeparator")return At.REPETITION_WITH_SEPARATOR;if(t instanceof oa.Alternation||t==="Alternation")return At.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=NI;function Cte(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=NI(n);return a===At.ALTERNATION?Hv(e,r,i):Kv(e,r,a,i)}Re.getLookaheadPaths=Cte;function Pte(t,e,r,n,i,a){var o=Hv(t,e,r),s=Wv(o)?Nd.tokenStructuredMatcherNoCategories:Nd.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=Pte;function Ete(t,e,r,n,i,a){var o=Kv(t,e,i,r),s=Wv(o)?Nd.tokenStructuredMatcherNoCategories:Nd.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=Ete;function kte(t,e,r,n){var i=t.length,a=(0,Ha.default)(t,function(u){return(0,Ha.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,kd.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var f=t[c],m=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<m;y++){for(var R=f[y],P=R.length,E=0;E<P;E++){var b=this.LA(E+1);if(r(b,R[E])===!1)continue e}return c}}};if(a&&!n){var o=(0,kd.default)(t,function(u){return(0,EI.default)(u)}),s=(0,kI.default)(o,function(u,l,c){return(0,Ua.default)(l,function(f){(0,SI.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,Ua.default)(f.categoryMatches,function(m){(0,SI.default)(u,m)||(u[m]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var m=l[f],v=m.length,y=0;y<v;y++){var R=this.LA(y+1);if(r(R,m[y])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=kte;function Nte(t,e,r){var n=(0,Ha.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,EI.default)(t);if(a.length===1&&(0,Gv.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,kI.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,Ua.default)(c.categoryMatches,function(m){l[m]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,m=0;m<f;m++){var v=this.LA(m+1);if(e(v,c[m])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=Nte;var wte=function(t){PI(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,At.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,At.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(Ste.RestWalker),wI=function(t){PI(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,At.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,At.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,At.ALTERNATION)},e}(bte.GAstVisitor);function CI(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function jv(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function $te(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function Uv(t,e){for(var r=(0,kd.default)(t,function(c){return(0,bI.possiblePathsFrom)([c],1)}),n=CI(r.length),i=(0,kd.default)(r,function(c){var f={};return(0,Ua.default)(c,function(m){var v=jv(m.partialPath);(0,Ua.default)(v,function(y){f[y]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=CI(s.length);for(var u=function(c){for(var f=s[c],m=0;m<f.length;m++){var v=f[m].partialPath,y=f[m].suffixDef,R=jv(v),P=$te(i,R,c);if(P||(0,Gv.default)(y)||v.length===e){var E=n[c];if($I(E,v)===!1){E.push(v);for(var b=0;b<R.length;b++){var S=R[b];i[c][S]=!0}}}else{var O=(0,bI.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,Ua.default)(O,function(F){var W=jv(F.partialPath);(0,Ua.default)(W,function(re){i[c][re]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=Uv;function Hv(t,e,r,n){var i=new wI(t,At.ALTERNATION,n);return e.accept(i),Uv(i.result,r)}Re.getLookaheadPathsForOr=Hv;function Kv(t,e,r,n){var i=new wI(t,r);e.accept(i);var a=i.result,o=new wte(e,t,r),s=o.startWalking(),u=new oa.Alternative({definition:a}),l=new oa.Alternative({definition:s});return Uv([u,l],n)}Re.getLookaheadPathsForOptionalProd=Kv;function $I(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=$I;function Ote(t,e){return t.length<e.length&&(0,Ha.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=Ote;function Wv(t){return(0,Ha.default)(t,function(e){return(0,Ha.default)(e,function(r){return(0,Ha.default)(r,function(n){return(0,Gv.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=Wv});var ll=d(me=>{"use strict";var Vv=me&&me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Bv=me&&me.__assign||function(){return Bv=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Bv.apply(this,arguments)},Ft=me&&me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(me,"__esModule",{value:!0});me.checkPrefixAlternativesAmbiguities=me.validateSomeNonEmptyLookaheadPath=me.validateTooManyAlts=me.RepetitionCollector=me.validateAmbiguousAlternationAlternatives=me.validateEmptyOrAlternative=me.getFirstNoneTerminal=me.validateNoLeftRecursion=me.validateRuleIsOverridden=me.validateRuleDoesNotAlreadyExist=me.OccurrenceValidationCollector=me.identifyProductionForDuplicates=me.validateGrammar=me.validateLookahead=void 0;var OI=Ft(fs()),wd=Ft(Pr()),Ite=Ft(Yf()),II=Ft(Tn()),Dte=Ft(tl()),xte=Ft(ld()),Lte=Ft(cd()),sa=Ft(qt()),ul=Ft(Mt()),qte=Ft(Fv()),zv=Ft(Ai()),Mte=Ft(nv()),Fte=Ft(jn()),Yv=Ft(Ri()),Ni=Ft(bd()),jte=Ft(Ti()),An=_r(),Xv=dt(),vs=gs(),Gte=ol(),Rn=dt(),Jv=dt(),Ute=Ft(Cd()),Hte=Ft(el()),Kte=qa();function Wte(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,sa.default)(e,function(r){return Bv({type:An.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}me.validateLookahead=Wte;function Bte(t,e,r,n){var i=(0,Ni.default)(t,function(u){return Vte(u,r)}),a=Zte(t,e,r),o=(0,Ni.default)(t,function(u){return jI(u,r)}),s=(0,Ni.default)(t,function(u){return qI(u,t,n,r)});return i.concat(a,o,s)}me.validateGrammar=Bte;function Vte(t,e){var r=new LI;t.accept(r);var n=r.allProductions,i=(0,qte.default)(n,DI),a=(0,Mte.default)(i,function(s){return s.length>1}),o=(0,sa.default)((0,Fte.default)(a),function(s){var u=(0,OI.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,Xv.getProductionDslName)(u),f={message:l,type:An.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},m=xI(u);return m&&(f.parameter=m),f});return o}function DI(t){return"".concat((0,Xv.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(xI(t))}me.identifyProductionForDuplicates=DI;function xI(t){return t instanceof Rn.Terminal?t.terminalType.name:t instanceof Rn.NonTerminal?t.nonTerminalName:""}var LI=function(t){Vv(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(Jv.GAstVisitor);me.OccurrenceValidationCollector=LI;function qI(t,e,r,n){var i=[],a=(0,zv.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:An.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}me.validateRuleDoesNotAlreadyExist=qI;function zte(t,e,r){var n=[],i;return(0,Yv.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:An.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}me.validateRuleIsOverridden=zte;function MI(t,e,r,n){n===void 0&&(n=[]);var i=[],a=sl(e.definition);if((0,wd.default)(a))return[];var o=t.name,s=(0,Yv.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:An.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,Lte.default)(a,n.concat([t])),l=(0,Ni.default)(u,function(c){var f=(0,jte.default)(n);return f.push(c),MI(t,c,r,f)});return i.concat(l)}me.validateNoLeftRecursion=MI;function sl(t){var e=[];if((0,wd.default)(t))return e;var r=(0,OI.default)(t);if(r instanceof Rn.NonTerminal)e.push(r.referencedRule);else if(r instanceof Rn.Alternative||r instanceof Rn.Option||r instanceof Rn.RepetitionMandatory||r instanceof Rn.RepetitionMandatoryWithSeparator||r instanceof Rn.RepetitionWithSeparator||r instanceof Rn.Repetition)e=e.concat(sl(r.definition));else if(r instanceof Rn.Alternation)e=(0,II.default)((0,sa.default)(r.definition,function(o){return sl(o.definition)}));else if(!(r instanceof Rn.Terminal))throw Error("non exhaustive match");var n=(0,Xv.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Ite.default)(t);return e.concat(sl(a))}else return e}me.getFirstNoneTerminal=sl;var Qv=function(t){Vv(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(Jv.GAstVisitor);function Yte(t,e){var r=new Qv;t.accept(r);var n=r.alternations,i=(0,Ni.default)(n,function(a){var o=(0,Ute.default)(a.definition);return(0,Ni.default)(o,function(s,u){var l=(0,Gte.nextPossibleTokensAfter)([s],[],Kte.tokenStructuredMatcher,1);return(0,wd.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:An.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}me.validateEmptyOrAlternative=Yte;function Xte(t,e,r){var n=new Qv;t.accept(n);var i=n.alternations;i=(0,xte.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Ni.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,vs.getLookaheadPathsForOr)(s,t,u,o),c=Qte(l,o,t,r),f=GI(l,o,t,r);return c.concat(f)});return a}me.validateAmbiguousAlternationAlternatives=Xte;var FI=function(t){Vv(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(Jv.GAstVisitor);me.RepetitionCollector=FI;function jI(t,e){var r=new Qv;t.accept(r);var n=r.alternations,i=(0,Ni.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:An.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}me.validateTooManyAlts=jI;function Jte(t,e,r){var n=[];return(0,ul.default)(t,function(i){var a=new FI;i.accept(a);var o=a.allProductions;(0,ul.default)(o,function(s){var u=(0,vs.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,vs.getLookaheadPathsForOptionalProd)(c,i,u,l),m=f[0];if((0,wd.default)((0,II.default)(m))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:An.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}me.validateSomeNonEmptyLookaheadPath=Jte;function Qte(t,e,r,n){var i=[],a=(0,zv.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,ul.default)(u,function(c){var f=[l];(0,ul.default)(t,function(m,v){l!==v&&(0,vs.containsPath)(m,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,vs.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,sa.default)(a,function(s){var u=(0,sa.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:An.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function GI(t,e,r,n){var i=(0,zv.default)(t,function(o,s,u){var l=(0,sa.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,Hte.default)((0,Ni.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,Dte.default)(i,function(m){return e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<u&&(0,vs.isStrictPrefixOfPath)(m.path,l)}),f=(0,sa.default)(c,function(m){var v=[m.idx+1,u+1],y=e.idx===0?"":e.idx,R=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:m.path});return{message:R,type:An.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return f}));return a}me.checkPrefixAlternativesAmbiguities=GI;function Zte(t,e,r){var n=[],i=(0,sa.default)(e,function(a){return a.name});return(0,ul.default)(t,function(a){var o=a.name;if((0,Yv.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:An.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var WI=d(ua=>{"use strict";var UI=ua&&ua.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ua,"__esModule",{value:!0});ua.validateGrammar=ua.resolveGrammar=void 0;var ere=UI(Mt()),HI=UI(gv()),tre=lI(),rre=ll(),KI=ys();function nre(t){var e=(0,HI.default)(t,{errMsgProvider:KI.defaultGrammarResolverErrorProvider}),r={};return(0,ere.default)(t.rules,function(n){r[n.name]=n}),(0,tre.resolveGrammar)(r,e.errMsgProvider)}ua.resolveGrammar=nre;function ire(t){return t=(0,HI.default)(t,{errMsgProvider:KI.defaultGrammarValidatorErrorProvider}),(0,rre.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}ua.validateGrammar=ire});var Ts=d(nr=>{"use strict";var cl=nr&&nr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),are=nr&&nr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(nr,"__esModule",{value:!0});nr.EarlyExitException=nr.NotAllInputParsedException=nr.NoViableAltException=nr.MismatchedTokenException=nr.isRecognitionException=void 0;var ore=are(Ri()),BI="MismatchedTokenException",VI="NoViableAltException",zI="EarlyExitException",YI="NotAllInputParsedException",XI=[BI,VI,zI,YI];Object.freeze(XI);function sre(t){return(0,ore.default)(XI,t.name)}nr.isRecognitionException=sre;var $d=function(t){cl(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),ure=function(t){cl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=BI,a}return e}($d);nr.MismatchedTokenException=ure;var lre=function(t){cl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=VI,a}return e}($d);nr.NoViableAltException=lre;var cre=function(t){cl(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=YI,i}return e}($d);nr.NotAllInputParsedException=cre;var fre=function(t){cl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=zI,a}return e}($d);nr.EarlyExitException=fre});var eT=d(St=>{"use strict";var dre=St&&St.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),la=St&&St.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(St,"__esModule",{value:!0});St.attemptInRepetitionRecovery=St.Recoverable=St.InRuleRecoveryException=St.IN_RULE_RECOVERY_EXCEPTION=St.EOF_FOLLOW_KEY=void 0;var fl=Ma(),pre=la(Pr()),JI=la(Cd()),hre=la(Tn()),Zv=la(qt()),QI=la(fd()),mre=la(kr()),yre=la(Ri()),gre=la(Ti()),vre=Ts(),Tre=mv(),_re=_r();St.EOF_FOLLOW_KEY={};St.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var ZI=function(t){dre(e,t);function e(r){var n=t.call(this,r)||this;return n.name=St.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);St.InRuleRecoveryException=ZI;var Rre=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,mre.default)(e,"recoveryEnabled")?e.recoveryEnabled:_re.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=e1)},t.prototype.getTokenToInsert=function(e){var r=(0,fl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),m=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),R=new vre.MismatchedTokenException(y,c,a.LA(0));R.resyncedTokens=(0,JI.default)(u),a.SAVE_ERROR(R)};!l;)if(this.tokenMatcher(f,i)){m();return}else if(n.call(this)){m(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new ZI("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,pre.default)(r))return!1;var i=this.LA(1),a=(0,QI.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,yre.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,QI.default)(e,function(a){var o=(0,fl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return St.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,Zv.default)(r,function(i,a){return a===0?St.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,Zv.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,hre.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===St.EOF_FOLLOW_KEY)return[fl.EOF];var r=e.ruleName+e.idxInCallingRule+Tre.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,fl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,JI.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,gre.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,Zv.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();St.Recoverable=Rre;function e1(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var m=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&m===void 0&&(m=fl.EOF,v=1),!(m===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(m,v,o)&&this.tryInRepetitionRecovery(t,e,r,m)}St.attemptInRepetitionRecovery=e1});var Od=d(ke=>{"use strict";Object.defineProperty(ke,"__esModule",{value:!0});ke.getKeyForAutomaticLookahead=ke.AT_LEAST_ONE_SEP_IDX=ke.MANY_SEP_IDX=ke.AT_LEAST_ONE_IDX=ke.MANY_IDX=ke.OPTION_IDX=ke.OR_IDX=ke.BITS_FOR_ALT_IDX=ke.BITS_FOR_RULE_IDX=ke.BITS_FOR_OCCURRENCE_IDX=ke.BITS_FOR_METHOD_TYPE=void 0;ke.BITS_FOR_METHOD_TYPE=4;ke.BITS_FOR_OCCURRENCE_IDX=8;ke.BITS_FOR_RULE_IDX=12;ke.BITS_FOR_ALT_IDX=8;ke.OR_IDX=1<<ke.BITS_FOR_OCCURRENCE_IDX;ke.OPTION_IDX=2<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_IDX=3<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_IDX=4<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_SEP_IDX=5<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_SEP_IDX=6<<ke.BITS_FOR_OCCURRENCE_IDX;function Are(t,e,r){return r|e|t}ke.getKeyForAutomaticLookahead=Are;var Ege=32-ke.BITS_FOR_ALT_IDX});var rT=d(ca=>{"use strict";var Id=ca&&ca.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},t1=ca&&ca.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ca,"__esModule",{value:!0});ca.LLkLookaheadStrategy=void 0;var tT=t1(bd()),Sre=t1(Pr()),Dd=ys(),bre=_r(),xd=ll(),dl=gs(),Cre=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:bre.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,Sre.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=Id(Id(Id(Id([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,tT.default)(e,function(r){return(0,xd.validateNoLeftRecursion)(r,r,Dd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,tT.default)(e,function(r){return(0,xd.validateEmptyOrAlternative)(r,Dd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,tT.default)(e,function(n){return(0,xd.validateAmbiguousAlternationAlternatives)(n,r,Dd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,xd.validateSomeNonEmptyLookaheadPath)(e,r,Dd.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,dl.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,dl.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,dl.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,dl.getProdType)(e.prodType),dl.buildSingleAlternativeLookaheadFunction)},t}();ca.LLkLookaheadStrategy=Cre});var a1=d(Yn=>{"use strict";var Pre=Yn&&Yn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),n1=Yn&&Yn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Yn,"__esModule",{value:!0});Yn.collectMethods=Yn.LooksAhead=void 0;var Wa=n1(Mt()),nT=n1(kr()),r1=_r(),wi=Od(),Ere=dt(),_s=dt(),kre=rT(),Nre=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,nT.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:r1.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,nT.default)(e,"maxLookahead")?e.maxLookahead:r1.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,nT.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new kre.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Wa.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=i1(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Wa.default)(a,function(f){var m=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,_s.getProductionDslName)(f)).concat(m),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,wi.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],wi.OR_IDX,f.idx);r.setLaFuncCache(y,v)})}),(0,Wa.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,wi.MANY_IDX,"Repetition",f.maxLookahead,(0,_s.getProductionDslName)(f))}),(0,Wa.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,wi.OPTION_IDX,"Option",f.maxLookahead,(0,_s.getProductionDslName)(f))}),(0,Wa.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,wi.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,_s.getProductionDslName)(f))}),(0,Wa.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,wi.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,_s.getProductionDslName)(f))}),(0,Wa.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,wi.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,_s.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,wi.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,wi.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();Yn.LooksAhead=Nre;var wre=function(t){Pre(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(Ere.GAstVisitor),Ld=new wre;function i1(t){Ld.reset(),t.accept(Ld);var e=Ld.dslMethods;return Ld.reset(),e}Yn.collectMethods=i1});var o1=d(Xn=>{"use strict";Object.defineProperty(Xn,"__esModule",{value:!0});Xn.addNoneTerminalToCst=Xn.addTerminalToCst=Xn.setNodeLocationFull=Xn.setNodeLocationOnlyOffset=void 0;function $re(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}Xn.setNodeLocationOnlyOffset=$re;function Ore(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}Xn.setNodeLocationFull=Ore;function Ire(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}Xn.addTerminalToCst=Ire;function Dre(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}Xn.addNoneTerminalToCst=Dre});var s1=d(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.defineNameProp=void 0;var xre="name";function Lre(t,e){Object.defineProperty(t,xre,{enumerable:!1,configurable:!0,writable:!1,value:e})}qd.defineNameProp=Lre});var h1=d(zt=>{"use strict";var $i=zt&&zt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zt,"__esModule",{value:!0});zt.validateMissingCstMethods=zt.validateVisitor=zt.CstVisitorDefinitionError=zt.createBaseVisitorConstructorWithDefaults=zt.createBaseSemanticVisitorConstructor=zt.defaultVisit=void 0;var qre=$i(Pr()),Mre=$i(el()),Fre=$i(Oe()),u1=$i(qt()),jre=$i(Mt()),Gre=$i(tl()),Ure=$i(Er()),Hre=$i(Ko()),Kre=$i(Da()),l1=s1();function c1(t,e){for(var r=(0,Ure.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}zt.defaultVisit=c1;function Wre(t,e){var r=function(){};(0,l1.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,Fre.default)(i)&&(i=i[0]),!(0,Kre.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=d1(this,e);if(!(0,qre.default)(i)){var a=(0,u1.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}zt.createBaseSemanticVisitorConstructor=Wre;function Bre(t,e,r){var n=function(){};(0,l1.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,jre.default)(e,function(a){i[a]=c1}),n.prototype=i,n.prototype.constructor=n,n}zt.createBaseVisitorConstructorWithDefaults=Bre;var f1;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(f1=zt.CstVisitorDefinitionError||(zt.CstVisitorDefinitionError={}));function d1(t,e){var r=p1(t,e);return r}zt.validateVisitor=d1;function p1(t,e){var r=(0,Gre.default)(e,function(i){return(0,Hre.default)(t[i])===!1}),n=(0,u1.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:f1.MISSING_METHOD,methodName:i}});return(0,Mre.default)(n)}zt.validateMissingCstMethods=p1});var v1=d(As=>{"use strict";var Md=As&&As.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(As,"__esModule",{value:!0});As.TreeBuilder=void 0;var Rs=o1(),fr=Md(ad()),Vre=Md(kr()),m1=Md(Er()),y1=Md(Da()),g1=h1(),zre=_r(),Yre=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,Vre.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:zre.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=fr.default,this.cstFinallyStateUpdate=fr.default,this.cstPostTerminal=fr.default,this.cstPostNonTerminal=fr.default,this.cstPostRule=fr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Rs.setNodeLocationFull,this.setNodeLocationFromNode=Rs.setNodeLocationFull,this.cstPostRule=fr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=fr.default,this.setNodeLocationFromNode=fr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Rs.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Rs.setNodeLocationOnlyOffset,this.cstPostRule=fr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=fr.default,this.setNodeLocationFromNode=fr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=fr.default,this.setNodeLocationFromNode=fr.default,this.cstPostRule=fr.default,this.setInitialNodeLocation=fr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Rs.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Rs.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,y1.default)(this.baseCstVisitorConstructor)){var e=(0,g1.createBaseSemanticVisitorConstructor)(this.className,(0,m1.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,y1.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,g1.createBaseVisitorConstructorWithDefaults)(this.className,(0,m1.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();As.TreeBuilder=Yre});var _1=d(Fd=>{"use strict";Object.defineProperty(Fd,"__esModule",{value:!0});Fd.LexerAdapter=void 0;var T1=_r(),Xre=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):T1.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?T1.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();Fd.LexerAdapter=Xre});var A1=d(Ss=>{"use strict";var R1=Ss&&Ss.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ss,"__esModule",{value:!0});Ss.RecognizerApi=void 0;var Jre=R1(jn()),Qre=R1(Ri()),Zre=Ts(),iT=_r(),ene=ys(),tne=ll(),rne=dt(),nne=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=iT.DEFAULT_RULE_CONFIG),(0,Qre.default)(this.definedRulesNames,e)){var i=ene.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:iT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=iT.DEFAULT_RULE_CONFIG);var i=(0,tne.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,Zre.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,rne.serializeGrammar)((0,Jre.default)(this.gastProductionsCache))},t}();Ss.RecognizerApi=nne});var w1=d(Cs=>{"use strict";var Jn=Cs&&Cs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Cs,"__esModule",{value:!0});Cs.RecognizerEngine=void 0;var S1=Jn(Pr()),aT=Jn(Oe()),oT=Jn(Tn()),b1=Jn(Zu()),ine=Jn(od()),ane=Jn(yn()),pl=Jn(kr()),hl=Jn(jn()),C1=Jn(Ai()),P1=Jn(Ti()),wr=Od(),jd=Ts(),E1=gs(),bs=ol(),k1=_r(),one=eT(),N1=Ma(),ml=qa(),sne=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ml.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,pl.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,aT.default)(e)){if((0,S1.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,aT.default)(e))this.tokensMap=(0,C1.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,pl.default)(e,"modes")&&(0,b1.default)((0,oT.default)((0,hl.default)(e.modes)),ml.isTokenType)){var n=(0,oT.default)((0,hl.default)(e.modes)),i=(0,ine.default)(n);this.tokensMap=(0,C1.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,ane.default)(e))this.tokensMap=(0,P1.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=N1.EOF;var a=(0,pl.default)(e,"modes")?(0,oT.default)((0,hl.default)(e.modes)):(0,hl.default)(e),o=(0,b1.default)(a,function(s){return(0,S1.default)(s.categoryMatches)});this.tokenMatcher=o?ml.tokenStructuredMatcherNoCategories:ml.tokenStructuredMatcher,(0,ml.augmentTokenTypes)((0,hl.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,pl.default)(n,"resyncEnabled")?n.resyncEnabled:k1.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,pl.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:k1.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<wr.BITS_FOR_METHOD_TYPE+wr.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var m=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(m),m}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(m){return this.invokeRuleCatch(m,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,jd.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(wr.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(wr.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,E1.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,wr.AT_LEAST_ONE_IDX,e,bs.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(wr.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,bs.NextTerminalAfterAtLeastOneSepWalker],u,wr.AT_LEAST_ONE_SEP_IDX,e,bs.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,E1.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(wr.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,wr.MANY_IDX,e,bs.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(wr.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,bs.NextTerminalAfterManySepWalker],u,wr.MANY_SEP_IDX,e,bs.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,wr.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead(wr.OR_IDX,r),i=(0,aT.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new jd.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,jd.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new jd.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===one.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,P1.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),N1.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();Cs.RecognizerEngine=sne});var D1=d(Ps=>{"use strict";var I1=Ps&&Ps.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ps,"__esModule",{value:!0});Ps.ErrorHandler=void 0;var sT=Ts(),une=I1(kr()),$1=I1(Ti()),O1=gs(),lne=_r(),cne=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,une.default)(e,"errorMessageProvider")?e.errorMessageProvider:lne.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,sT.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,$1.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,$1.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,O1.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new sT.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,O1.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new sT.NoViableAltException(l,this.LA(1),u))},t}();Ps.ErrorHandler=cne});var q1=d(Es=>{"use strict";var L1=Es&&Es.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Es,"__esModule",{value:!0});Es.ContentAssist=void 0;var x1=ol(),fne=L1(fs()),dne=L1(Da()),pne=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,dne.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,x1.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,fne.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new x1.NextAfterTokenWalker(i,e).startWalking();return a},t}();Es.ContentAssist=pne});var B1=d(ks=>{"use strict";var Ns=ks&&ks.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ks,"__esModule",{value:!0});ks.GastRecorder=void 0;var Gd=Ns(Rd()),hne=Ns(Oe()),mne=Ns(ed()),yne=Ns(Mt()),G1=Ns(Ko()),gl=Ns(kr()),Qn=dt(),gne=rl(),U1=qa(),H1=Ma(),vne=_r(),Tne=Od(),Hd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Hd);var M1=!0,F1=Math.pow(2,Tne.BITS_FOR_OCCURRENCE_IDX)-1,K1=(0,H1.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:gne.Lexer.NA});(0,U1.augmentTokenTypes)([K1]);var W1=(0,H1.createTokenInstance)(K1,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(W1);var _ne={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Rne=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return vne.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new Qn.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return yl.call(this,Qn.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){yl.call(this,Qn.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){yl.call(this,Qn.RepetitionMandatoryWithSeparator,r,e,M1)},t.prototype.manyInternalRecord=function(e,r){yl.call(this,Qn.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){yl.call(this,Qn.RepetitionWithSeparator,r,e,M1)},t.prototype.orInternalRecord=function(e,r){return Ane.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Ud(r),!e||(0,gl.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(j1(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Gd.default)(this.recordingProdStack),o=e.ruleName,s=new Qn.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?_ne:Hd},t.prototype.consumeInternalRecord=function(e,r,n){if(Ud(r),!(0,U1.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(j1(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Gd.default)(this.recordingProdStack),o=new Qn.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),W1},t}();ks.GastRecorder=Rne;function yl(t,e,r,n){n===void 0&&(n=!1),Ud(r);var i=(0,Gd.default)(this.recordingProdStack),a=(0,G1.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,gl.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Hd}function Ane(t,e){var r=this;Ud(e);var n=(0,Gd.default)(this.recordingProdStack),i=(0,hne.default)(t)===!1,a=i===!1?t:t.DEF,o=new Qn.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,gl.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,mne.default)(a,function(u){return(0,G1.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,yne.default)(a,function(u){var l=new Qn.Alternative({definition:[]});o.definition.push(l),(0,gl.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,gl.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Hd}function j1(t){return t===0?"":"".concat(t)}function Ud(t){if(t<0||t>F1){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(F1+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var V1=d(ws=>{"use strict";var Sne=ws&&ws.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ws,"__esModule",{value:!0});ws.PerformanceTracer=void 0;var bne=Sne(kr()),Cne=ss(),Pne=_r(),Ene=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,bne.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Pne.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,Cne.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();ws.PerformanceTracer=Ene});var z1=d(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.applyMixins=void 0;function kne(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Kd.applyMixins=kne});var _r=d(Me=>{"use strict";var Q1=Me&&Me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),$s=Me&&Me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Me,"__esModule",{value:!0});Me.EmbeddedActionsParser=Me.CstParser=Me.Parser=Me.EMPTY_ALT=Me.ParserDefinitionErrorType=Me.DEFAULT_RULE_CONFIG=Me.DEFAULT_PARSER_CONFIG=Me.END_OF_FILE=void 0;var uT=$s(Pr()),Nne=$s(qt()),wne=$s(Mt()),fa=$s(jn()),Y1=$s(kr()),Z1=$s(Ti()),$ne=ss(),One=O$(),X1=Ma(),eD=ys(),J1=WI(),Ine=eT(),Dne=a1(),xne=v1(),Lne=_1(),qne=A1(),Mne=w1(),Fne=D1(),jne=q1(),Gne=B1(),Une=V1(),Hne=z1(),Kne=ll();Me.END_OF_FILE=(0,X1.createTokenInstance)(X1.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Me.END_OF_FILE);Me.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:eD.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Me.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var Wne;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Wne=Me.ParserDefinitionErrorType||(Me.ParserDefinitionErrorType={}));function Bne(t){return t===void 0&&(t=void 0),function(){return t}}Me.EMPTY_ALT=Bne;var Wd=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,Y1.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,Y1.default)(r,"skipValidations")?r.skipValidations:Me.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,$ne.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,wne.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,J1.resolveGrammar)({rules:(0,fa.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,uT.default)(i)&&e.skipValidations===!1){var a=(0,J1.validateGrammar)({rules:(0,fa.default)(e.gastProductionsCache),tokenTypes:(0,fa.default)(e.tokensMap),errMsgProvider:eD.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,Kne.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,fa.default)(e.gastProductionsCache),tokenTypes:(0,fa.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,uT.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,One.computeAllProdsFollows)((0,fa.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,fa.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,fa.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,uT.default)(e.definitionErrors))throw r=(0,Nne.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Me.Parser=Wd;(0,Hne.applyMixins)(Wd,[Ine.Recoverable,Dne.LooksAhead,xne.TreeBuilder,Lne.LexerAdapter,Mne.RecognizerEngine,qne.RecognizerApi,Fne.ErrorHandler,jne.ContentAssist,Gne.GastRecorder,Une.PerformanceTracer]);var Vne=function(t){Q1(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,Z1.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Wd);Me.CstParser=Vne;var zne=function(t){Q1(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,Z1.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Wd);Me.EmbeddedActionsParser=zne});var rD=d(da=>{"use strict";var Yne=da&&da.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Os=da&&da.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(da,"__esModule",{value:!0});da.buildModel=void 0;var tD=dt(),vl=Os(qt()),Xne=Os(Tn()),Jne=Os(jn()),Qne=Os(ed()),Zne=Os(Fv()),eie=Os(Ju());function tie(t){var e=new rie,r=(0,Jne.default)(t);return(0,vl.default)(r,function(n){return e.visitRule(n)})}da.buildModel=tie;var rie=function(t){Yne(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,Zne.default)(n,function(o){return o.propertyName}),a=(0,vl.default)(i,function(o,s){var u=!(0,Qne.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,vl.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Bd(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Bd(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Bd(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Bd(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,vl.default)(this.visitEach(r),function(i){return(0,eie.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,Xne.default)((0,vl.default)(r,function(i){return n.visit(i)}))},e}(tD.GAstVisitor);function Bd(t){return t instanceof tD.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var iD=d((Wge,nD)=>{var nie=zf();function iie(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:nie(t,e,r)}nD.exports=iie});var lT=d((Bge,aD)=>{var aie="\\ud800-\\udfff",oie="\\u0300-\\u036f",sie="\\ufe20-\\ufe2f",uie="\\u20d0-\\u20ff",lie=oie+sie+uie,cie="\\ufe0e\\ufe0f",fie="\\u200d",die=RegExp("["+fie+aie+lie+cie+"]");function pie(t){return die.test(t)}aD.exports=pie});var sD=d((Vge,oD)=>{function hie(t){return t.split("")}oD.exports=hie});var mD=d((zge,hD)=>{var uD="\\ud800-\\udfff",mie="\\u0300-\\u036f",yie="\\ufe20-\\ufe2f",gie="\\u20d0-\\u20ff",vie=mie+yie+gie,Tie="\\ufe0e\\ufe0f",_ie="["+uD+"]",cT="["+vie+"]",fT="\\ud83c[\\udffb-\\udfff]",Rie="(?:"+cT+"|"+fT+")",lD="[^"+uD+"]",cD="(?:\\ud83c[\\udde6-\\uddff]){2}",fD="[\\ud800-\\udbff][\\udc00-\\udfff]",Aie="\\u200d",dD=Rie+"?",pD="["+Tie+"]?",Sie="(?:"+Aie+"(?:"+[lD,cD,fD].join("|")+")"+pD+dD+")*",bie=pD+dD+Sie,Cie="(?:"+[lD+cT+"?",cT,cD,fD,_ie].join("|")+")",Pie=RegExp(fT+"(?="+fT+")|"+Cie+bie,"g");function Eie(t){return t.match(Pie)||[]}hD.exports=Eie});var gD=d((Yge,yD)=>{var kie=sD(),Nie=lT(),wie=mD();function $ie(t){return Nie(t)?wie(t):kie(t)}yD.exports=$ie});var TD=d((Xge,vD)=>{var Oie=iD(),Iie=lT(),Die=gD(),xie=Yg();function Lie(t){return function(e){e=xie(e);var r=Iie(e)?Die(e):void 0,n=r?r[0]:e.charAt(0),i=r?Oie(r,1).join(""):e.slice(1);return n[t]()+i}}vD.exports=Lie});var RD=d((Jge,_D)=>{var qie=TD(),Mie=qie("toUpperCase");_D.exports=Mie});var CD=d(Is=>{"use strict";var Ds=Is&&Is.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Is,"__esModule",{value:!0});Is.genDts=void 0;var Fie=Ds(Tn()),jie=Ds(Oe()),Vd=Ds(qt()),Gie=Ds(Ai()),Uie=Ds(od()),SD=Ds(RD());function Hie(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,Fie.default)((0,Vd.default)(t,function(n){return Kie(n)}))),e.includeVisitorInterface&&(r=r.concat(zie(e.visitorInterfaceName,t))),r.join(`

`)+`
`}Is.genDts=Hie;function Kie(t){var e=Wie(t),r=Bie(t);return[e,r]}function Wie(t){var e=bD(t.name),r=dT(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function Bie(t){var e=dT(t.name);return"export type ".concat(e,` = {
  `).concat((0,Vd.default)(t.properties,function(r){return Vie(r)}).join(`
  `),`
};`)}function Vie(t){var e=Xie(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function zie(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,Vd.default)(e,function(r){return Yie(r)}).join(`
  `),`
}`)}function Yie(t){var e=dT(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function Xie(t){if((0,jie.default)(t)){var e=(0,Uie.default)((0,Vd.default)(t,function(n){return AD(n)})),r=(0,Gie.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return AD(t)}function AD(t){return t.kind==="token"?"IToken":bD(t.name)}function bD(t){return(0,SD.default)(t)+"CstNode"}function dT(t){return(0,SD.default)(t)+"CstChildren"}});var PD=d(xs=>{"use strict";var zd=xs&&xs.__assign||function(){return zd=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},zd.apply(this,arguments)};Object.defineProperty(xs,"__esModule",{value:!0});xs.generateCstDts=void 0;var Jie=rD(),Qie=CD(),Zie={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function eae(t,e){var r=zd(zd({},Zie),e),n=(0,Jie.buildModel)(t);return(0,Qie.genDts)(n,r)}xs.generateCstDts=eae});var kD=d(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.createSyntaxDiagramsCode=void 0;var ED=Sg();function tae(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(ED.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(ED.VERSION,"/diagrams/diagrams.css"):a,s=`
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`,u=`
<link rel='stylesheet' href='`.concat(o,`'>
`),l=`
<script src='`.concat(i,`vendor/railroad-diagrams.js'><\/script>
<script src='`).concat(i,`src/diagrams_builder.js'><\/script>
<script src='`).concat(i,`src/diagrams_behavior.js'><\/script>
<script src='`).concat(i,`src/main.js'><\/script>
`),c=`
<div id="diagrams" align="center"></div>    
`,f=`
<script>
    window.serializedGrammar = `.concat(JSON.stringify(t,null,"  "),`;
<\/script>
`),m=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;return s+u+l+c+f+m}Yd.createSyntaxDiagramsCode=tae});var Ba=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var rae=Sg();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return rae.VERSION}});var Xd=_r();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return Xd.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return Xd.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return Xd.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return Xd.EMPTY_ALT}});var ND=rl();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return ND.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return ND.LexerDefinitionErrorType}});var Ls=Ma();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return Ls.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return Ls.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return Ls.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return Ls.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return Ls.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return Ls.tokenName}});var nae=gs();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return nae.getLookaheadPaths}});var iae=rT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return iae.LLkLookaheadStrategy}});var aae=ys();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return aae.defaultParserErrorProvider}});var Tl=Ts();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return Tl.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return Tl.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return Tl.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return Tl.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return Tl.NoViableAltException}});var oae=wv();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return oae.defaultLexerErrorProvider}});var Zn=dt();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return Zn.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return Zn.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return Zn.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return Zn.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return Zn.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return Zn.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Zn.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Zn.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return Zn.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return Zn.Terminal}});var pT=dt();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return pT.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return pT.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return pT.GAstVisitor}});var sae=PD();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return sae.generateCstDts}});function uae(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=uae;var lae=kD();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return lae.createSyntaxDiagramsCode}});var cae=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=cae});var xD=d(X=>{"use strict";var wD=X&&X.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(X,"__esModule",{value:!0});X.createATN=X.RuleTransition=X.EpsilonTransition=X.AtomTransition=X.AbstractTransition=X.ATN_LOOP_END=X.ATN_PLUS_LOOP_BACK=X.ATN_STAR_LOOP_ENTRY=X.ATN_STAR_LOOP_BACK=X.ATN_BLOCK_END=X.ATN_RULE_STOP=X.ATN_TOKEN_START=X.ATN_STAR_BLOCK_START=X.ATN_PLUS_BLOCK_START=X.ATN_RULE_START=X.ATN_BASIC=X.ATN_INVALID_TYPE=X.buildATNKey=void 0;var $D=wD(qt()),fae=wD(tl()),Rr=Ba();function Rl(t,e,r){return`${t.name}_${e}_${r}`}X.buildATNKey=Rl;X.ATN_INVALID_TYPE=0;X.ATN_BASIC=1;X.ATN_RULE_START=2;X.ATN_PLUS_BLOCK_START=4;X.ATN_STAR_BLOCK_START=5;X.ATN_TOKEN_START=6;X.ATN_RULE_STOP=7;X.ATN_BLOCK_END=8;X.ATN_STAR_LOOP_BACK=9;X.ATN_STAR_LOOP_ENTRY=10;X.ATN_PLUS_LOOP_BACK=11;X.ATN_LOOP_END=12;var qs=class{constructor(e){this.target=e}isEpsilon(){return!1}};X.AbstractTransition=qs;var Jd=class extends qs{constructor(e,r){super(e),this.tokenType=r}};X.AtomTransition=Jd;var Qd=class extends qs{constructor(e){super(e)}isEpsilon(){return!0}};X.EpsilonTransition=Qd;var _l=class extends qs{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};X.RuleTransition=_l;function dae(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};pae(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=Va(e,i,i);a!==void 0&&bae(e,i,a)}return e}X.createATN=dae;function pae(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=jt(t,i,void 0,{type:X.ATN_RULE_START}),o=jt(t,i,void 0,{type:X.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function OD(t,e,r){return r instanceof Rr.Terminal?hT(t,e,r.terminalType,r):r instanceof Rr.NonTerminal?Sae(t,e,r):r instanceof Rr.Alternation?vae(t,e,r):r instanceof Rr.Option?Tae(t,e,r):r instanceof Rr.Repetition?hae(t,e,r):r instanceof Rr.RepetitionWithSeparator?mae(t,e,r):r instanceof Rr.RepetitionMandatory?yae(t,e,r):r instanceof Rr.RepetitionMandatoryWithSeparator?gae(t,e,r):Va(t,e,r)}function hae(t,e,r){let n=jt(t,e,r,{type:X.ATN_STAR_BLOCK_START});pa(t,n);let i=Ms(t,e,n,r,Va(t,e,r));return DD(t,e,r,i)}function mae(t,e,r){let n=jt(t,e,r,{type:X.ATN_STAR_BLOCK_START});pa(t,n);let i=Ms(t,e,n,r,Va(t,e,r)),a=hT(t,e,r.separator,r);return DD(t,e,r,i,a)}function yae(t,e,r){let n=jt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});pa(t,n);let i=Ms(t,e,n,r,Va(t,e,r));return ID(t,e,r,i)}function gae(t,e,r){let n=jt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});pa(t,n);let i=Ms(t,e,n,r,Va(t,e,r)),a=hT(t,e,r.separator,r);return ID(t,e,r,i,a)}function vae(t,e,r){let n=jt(t,e,r,{type:X.ATN_BASIC});pa(t,n);let i=(0,$D.default)(r.definition,o=>OD(t,e,o));return Ms(t,e,n,r,...i)}function Tae(t,e,r){let n=jt(t,e,r,{type:X.ATN_BASIC});pa(t,n);let i=Ms(t,e,n,r,Va(t,e,r));return _ae(t,e,r,i)}function Va(t,e,r){let n=(0,fae.default)((0,$D.default)(r.definition,i=>OD(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Aae(t,n)}function ID(t,e,r,n,i){let a=n.left,o=n.right,s=jt(t,e,r,{type:X.ATN_PLUS_LOOP_BACK});pa(t,s);let u=jt(t,e,r,{type:X.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[Rl(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,bt(o,s),i===void 0?(bt(s,a),bt(s,u)):(bt(s,u),bt(s,i.left),bt(i.right,a)),{left:a,right:u}}function DD(t,e,r,n,i){let a=n.left,o=n.right,s=jt(t,e,r,{type:X.ATN_STAR_LOOP_ENTRY});pa(t,s);let u=jt(t,e,r,{type:X.ATN_LOOP_END}),l=jt(t,e,r,{type:X.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,bt(s,a),bt(s,u),bt(o,l),i!==void 0?(bt(l,u),bt(l,i.left),bt(i.right,a)):bt(l,s),t.decisionMap[Rl(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function _ae(t,e,r,n){let i=n.left,a=n.right;return bt(i,a),t.decisionMap[Rl(e,"Option",r.idx)]=i,n}function pa(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Ms(t,e,r,n,...i){let a=jt(t,e,n,{type:X.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(bt(r,s.left),bt(s.right,a)):bt(r,a);let o={left:r,right:a};return t.decisionMap[Rl(e,Rae(n),n.idx)]=r,o}function Rae(t){if(t instanceof Rr.Alternation)return"Alternation";if(t instanceof Rr.Option)return"Option";if(t instanceof Rr.Repetition)return"Repetition";if(t instanceof Rr.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Rr.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Rr.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Aae(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof _l,l=s,c=e[a+1].left;o.left.type===X.ATN_BASIC&&o.right.type===X.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,Cae(t,o.right)):bt(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function hT(t,e,r,n){let i=jt(t,e,n,{type:X.ATN_BASIC}),a=jt(t,e,n,{type:X.ATN_BASIC});return mT(i,new Jd(a,r)),{left:i,right:a}}function Sae(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=jt(t,e,r,{type:X.ATN_BASIC}),o=jt(t,e,r,{type:X.ATN_BASIC}),s=new _l(i,n,o);return mT(a,s),{left:a,right:o}}function bae(t,e,r){let n=t.ruleToStartState.get(e);bt(n,r.left);let i=t.ruleToStopState.get(e);return bt(r.right,i),{left:n,right:i}}function bt(t,e){let r=new Qd(e);mT(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function mT(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function Cae(t,e){t.states.splice(t.states.indexOf(e),1)}});var qD=d(ei=>{"use strict";var Pae=ei&&ei.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ei,"__esModule",{value:!0});ei.getATNConfigKey=ei.ATNConfigSet=ei.DFA_ERROR=void 0;var Eae=Pae(qt());ei.DFA_ERROR={};var yT=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=LD(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,Eae.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};ei.ATNConfigSet=yT;function LD(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}ei.getATNConfigKey=LD});var FD=d((ive,MD)=>{var kae=rs();function Nae(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!kae(o):r(o,s)))var s=o,u=a}return u}MD.exports=Nae});var GD=d((ave,jD)=>{function wae(t,e){return t<e}jD.exports=wae});var HD=d((ove,UD)=>{var $ae=FD(),Oae=GD(),Iae=Ia();function Dae(t){return t&&t.length?$ae(t,Iae,Oae):void 0}UD.exports=Dae});var WD=d((sve,KD)=>{var xae=Br(),Lae=fv();function qae(t,e){return t&&t.length?Lae(t,xae(e,2)):[]}KD.exports=qae});var QD=d(Fs=>{"use strict";var ma=Fs&&Fs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Fs,"__esModule",{value:!0});Fs.LLStarLookaheadStrategy=void 0;var $r=Ba(),Sn=xD(),ha=qD(),Mae=ma(HD()),Fae=ma(bd()),jae=ma(WD()),Al=ma(qt()),Gae=ma(Tn()),gT=ma(Mt()),Uae=ma(Pr()),BD=ma(Ai());function Hae(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var Zd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},VD=new Zd,TT=class extends $r.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,Sn.createATN)(e.rules),this.dfas=Kae(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Sn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,Al.default)((0,$r.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>(0,Al.default)(m,v=>v[0]));if(zD(f,!1)&&!a){let m=(0,BD.default)(f,(v,y,R)=>((0,gT.default)(y,P=>{P&&(v[P.tokenTypeIdx]=R,(0,gT.default)(P.categoryMatches,E=>{v[E]=R}))}),v),{});return i?function(v){var y;let R=this.LA(1),P=m[R.tokenTypeIdx];if(v!==void 0&&P!==void 0){let E=(y=v[P])===null||y===void 0?void 0:y.GATE;if(E!==void 0&&E.call(this)===!1)return}return P}:function(){let v=this.LA(1);return m[v.tokenTypeIdx]}}else return i?function(m){let v=new Zd,y=m===void 0?0:m.length;for(let P=0;P<y;P++){let E=m?.[P].GATE;v.set(P,E===void 0||E.call(this))}let R=vT.call(this,o,c,v,s);return typeof R=="number"?R:void 0}:function(){let m=vT.call(this,o,c,VD,s);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Sn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,Al.default)((0,$r.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>(0,Al.default)(m,v=>v[0]));if(zD(f)&&f[0][0]&&!a){let m=f[0],v=(0,Gae.default)(m);if(v.length===1&&(0,Uae.default)(v[0].categoryMatches)){let R=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===R}}else{let y=(0,BD.default)(v,(R,P)=>(P!==void 0&&(R[P.tokenTypeIdx]=!0,(0,gT.default)(P.categoryMatches,E=>{R[E]=!0})),R),{});return function(){let R=this.LA(1);return y[R.tokenTypeIdx]===!0}}}return function(){let m=vT.call(this,o,c,VD,s);return typeof m=="object"?!1:m===0}}};Fs.LLStarLookaheadStrategy=TT;function zD(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function Kae(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=Hae(t.decisionStates[n],n);return r}function vT(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=toe(i.atnStartState);a=JD(i,XD(s)),i.start=a}return Wae.apply(this,[i,a,r,n])}function Wae(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=Jae(i,s);if(u===void 0&&(u=Bae.apply(this,[t,i,s,a,r,n])),u===ha.DFA_ERROR)return Xae(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function Bae(t,e,r,n,i,a){let o=Qae(e.configs,r,i);if(o.size===0)return YD(t,e,r,ha.DFA_ERROR),ha.DFA_ERROR;let s=XD(o),u=eoe(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(aoe(o)){let l=(0,Mae.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,Vae.apply(this,[t,n,o.alts,a])}return s=YD(t,e,r,s),s}function Vae(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=zae({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function zae(t){let e=(0,Al.default)(t.prefixPath,i=>(0,$r.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${Yae(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function Yae(t){if(t instanceof $r.NonTerminal)return"SUBRULE";if(t instanceof $r.Option)return"OPTION";if(t instanceof $r.Alternation)return"OR";if(t instanceof $r.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof $r.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof $r.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof $r.Repetition)return"MANY";if(t instanceof $r.Terminal)return"CONSUME";throw Error("non exhaustive match")}function Xae(t,e,r){let n=(0,Fae.default)(e.configs.elements,a=>a.state.transitions),i=(0,jae.default)(n.filter(a=>a instanceof Sn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function Jae(t,e){return t.edges[e.tokenTypeIdx]}function Qae(t,e,r){let n=new ha.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===Sn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=Zae(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new ha.ATNConfigSet;for(let o of n.elements)ep(o,a)}if(i.length>0&&!noe(a))for(let o of i)a.add(o);return a}function Zae(t,e){if(t instanceof Sn.AtomTransition&&(0,$r.tokenMatcher)(e,t.tokenType))return t.target}function eoe(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function XD(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function YD(t,e,r,n){return n=JD(t,n),e.edges[r.tokenTypeIdx]=n,n}function JD(t,e){if(e===ha.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function toe(t){let e=new ha.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};ep(a,e)}return e}function ep(t,e){let r=t.state;if(r.type===Sn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};ep(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=roe(t,a);o!==void 0&&ep(o,e)}}function roe(t,e){if(e instanceof Sn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Sn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function noe(t){for(let e of t.elements)if(e.state.type===Sn.ATN_RULE_STOP)return!0;return!1}function ioe(t){for(let e of t.elements)if(e.state.type!==Sn.ATN_RULE_STOP)return!1;return!0}function aoe(t){if(ioe(t))return!0;let e=ooe(t.elements);return soe(e)&&!uoe(e)}function ooe(t){let e=new Map;for(let r of t){let n=(0,ha.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function soe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function uoe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var ZD=d(tp=>{"use strict";Object.defineProperty(tp,"__esModule",{value:!0});tp.LLStarLookaheadStrategy=void 0;var loe=QD();Object.defineProperty(tp,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return loe.LLStarLookaheadStrategy}})});var rx=d(Xr=>{"use strict";Object.defineProperty(Xr,"__esModule",{value:!0});Xr.RootCstNodeImpl=Xr.CompositeCstNodeImpl=Xr.LeafCstNodeImpl=Xr.AbstractCstNode=Xr.CstNodeBuilder=void 0;var ex=fo(),coe=pr(),tx=Qe(),_T=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new rp(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new Cl;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new bl(e.startOffset,e.image.length,(0,tx.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new bl(r.startOffset,r.image.length,(0,tx.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,coe.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};Xr.CstNodeBuilder=_T;var Sl=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};Xr.AbstractCstNode=Sl;var bl=class extends Sl{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};Xr.LeafCstNodeImpl=bl;var Cl=class extends Sl{constructor(){super(...arguments),this.children=new Pl(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:ex.Position.create(0,0),end:ex.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};Xr.CompositeCstNodeImpl=Cl;var Pl=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,Pl.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},rp=class extends Cl{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};Xr.RootCstNodeImpl=rp});var op=d(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.LangiumCompletionParser=dr.LangiumParserErrorMessageProvider=dr.LangiumParser=dr.AbstractLangiumParser=dr.DatatypeSymbol=void 0;var ip=Ba(),foe=ZD(),np=$e(),nx=kt(),ix=Ie(),doe=rx();dr.DatatypeSymbol=Symbol("Datatype");function RT(t){return t.$type===dr.DatatypeSymbol}var ax="\u200B",ox=t=>t.endsWith(ax)?t:t+ax,El=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new bT(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};dr.AbstractLangiumParser=El;var AT=class extends El{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new doe.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,nx.isDataTypeRule)(e)?dr.DatatypeSymbol:(0,nx.getTypeName)(e),i=this.wrapper.DEFINE_RULE(ox(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===dr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,np.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(RT(u)){let l=i.image;(0,np.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(RT(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,ix.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),RT(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,ix.getContainerOfType)(e,np.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,np.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r))e[n]===void 0&&(e[n]=i);return e}get definitionErrors(){return this.wrapper.definitionErrors}};dr.LangiumParser=AT;var ap=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return ip.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return ip.defaultParserErrorProvider.buildEarlyExitMessage(e)}};dr.LangiumParserErrorMessageProvider=ap;var ST=class extends El{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(ox(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};dr.LangiumCompletionParser=ST;var poe={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new ap},bT=class extends ip.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},poe),{lookaheadStrategy:n?new ip.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new foe.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var sx=d(js=>{"use strict";Object.defineProperty(js,"__esModule",{value:!0});js.assertUnreachable=js.ErrorWithLocation=void 0;var CT=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};js.ErrorWithLocation=CT;function hoe(t){throw new Error("Error! The input value was not handled.")}js.assertUnreachable=hoe});var ET=d(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});up.createParser=void 0;var ux=Ba(),Fe=$e(),kl=sx(),moe=Dt(),lx=kt(),cx=Et();function yoe(t,e,r){return goe({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}up.createParser=yoe;function goe(t,e){let r=(0,cx.getAllReachableRules)(e,!1),n=(0,moe.stream)(e.rules).filter(Fe.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,za(a,i.definition)))}}function za(t,e,r=!1){let n;if((0,Fe.isKeyword)(e))n=boe(t,e);else if((0,Fe.isAction)(e))n=voe(t,e);else if((0,Fe.isAssignment)(e))n=za(t,e.terminal);else if((0,Fe.isCrossReference)(e))n=fx(t,e);else if((0,Fe.isRuleCall)(e))n=Toe(t,e);else if((0,Fe.isAlternatives)(e))n=Roe(t,e);else if((0,Fe.isUnorderedGroup)(e))n=Aoe(t,e);else if((0,Fe.isGroup)(e))n=Soe(t,e);else throw new kl.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return dx(t,r?void 0:sp(e),n,e.cardinality)}function voe(t,e){let r=(0,lx.getTypeName)(e);return()=>t.parser.action(r,e)}function Toe(t,e){let r=e.rule.ref;if((0,Fe.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?_oe(r,e.arguments):()=>({});return a=>t.parser.subrule(n,px(t,r),e,i(a))}else if((0,Fe.isTerminalRule)(r)){let n=t.consume++,i=PT(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,kl.assertUnreachable)(r);else throw new kl.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function _oe(t,e){let r=e.map(n=>Oi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function Oi(t){if((0,Fe.isDisjunction)(t)){let e=Oi(t.left),r=Oi(t.right);return n=>e(n)||r(n)}else if((0,Fe.isConjunction)(t)){let e=Oi(t.left),r=Oi(t.right);return n=>e(n)&&r(n)}else if((0,Fe.isNegation)(t)){let e=Oi(t.value);return r=>!e(r)}else if((0,Fe.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Fe.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,kl.assertUnreachable)(t)}function Roe(t,e){if(e.elements.length===1)return za(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:za(t,i,!0)},o=sp(i);o&&(a.GATE=Oi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Aoe(t,e){if(e.elements.length===1)return za(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:za(t,s,!0)},l=sp(s);l&&(u.GATE=Oi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let y=f.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let m=u.GATE;return m?c.GATE=()=>m(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=dx(t,sp(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Soe(t,e){let r=e.elements.map(n=>za(t,n));return n=>r.forEach(i=>i(n))}function sp(t){if((0,Fe.isGroup)(t))return t.guardCondition}function fx(t,e,r=e.terminal){if(r)if((0,Fe.isRuleCall)(r)&&(0,Fe.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,px(t,r.rule.ref),e,i)}else if((0,Fe.isRuleCall)(r)&&(0,Fe.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=PT(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Fe.isKeyword)(r)){let n=t.consume++,i=PT(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,cx.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,lx.getTypeName)(e.type.ref));return fx(t,e,i)}}function boe(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function dx(t,e,r,n){let i=e&&Oi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,ux.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,ux.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,kl.assertUnreachable)(n)}function px(t,e){let r=Coe(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Coe(t,e){if((0,Fe.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Fe.isParserRule)(n);)((0,Fe.isGroup)(n)||(0,Fe.isAlternatives)(n)||(0,Fe.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function PT(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var hx=d(lp=>{"use strict";Object.defineProperty(lp,"__esModule",{value:!0});lp.createCompletionParser=void 0;var Poe=op(),Eoe=ET();function koe(t){let e=t.Grammar,r=t.parser.Lexer,n=new Poe.LangiumCompletionParser(t);return(0,Eoe.createParser)(e,n,r.definition),n.finalize(),n}lp.createCompletionParser=koe});var kT=d(Gs=>{"use strict";Object.defineProperty(Gs,"__esModule",{value:!0});Gs.prepareLangiumParser=Gs.createLangiumParser=void 0;var Noe=op(),woe=ET();function $oe(t){let e=mx(t);return e.finalize(),e}Gs.createLangiumParser=$oe;function mx(t){let e=t.Grammar,r=t.parser.Lexer,n=new Noe.LangiumParser(t);return(0,woe.createParser)(e,n,r.definition)}Gs.prepareLangiumParser=mx});var $T=d(fp=>{"use strict";Object.defineProperty(fp,"__esModule",{value:!0});fp.DefaultTokenBuilder=void 0;var Ooe=Ba(),NT=$e(),Ioe=kt(),Doe=Ie(),xoe=Et(),cp=ko(),Loe=Dt(),wT=class{buildTokens(e,r){let n=(0,Loe.stream)((0,xoe.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,cp.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(NT.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Ioe.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,cp.isWhitespaceRegExp)(r)?Ooe.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(NT.isParserRule).flatMap(i=>(0,Doe.streamAllContents)(i).filter(NT.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,cp.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,cp.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};fp.DefaultTokenBuilder=wT});var DT=d(Gt=>{"use strict";Object.defineProperty(Gt,"__esModule",{value:!0});Gt.convertBoolean=Gt.convertNumber=Gt.convertDate=Gt.convertBigint=Gt.convertInt=Gt.convertID=Gt.convertString=Gt.DefaultValueConverter=void 0;var yx=$e(),qoe=kt(),Moe=Et(),OT=class{convert(e,r){let n=r.feature;if((0,yx.isCrossReference)(n)&&(n=(0,Moe.getCrossReferenceTerminal)(n)),(0,yx.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return vx(r);case"STRING":return IT(r);case"ID":return gx(r);case"REGEXLITERAL":return IT(r)}switch((i=(0,qoe.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Rx(r);case"boolean":return Ax(r);case"bigint":return Tx(r);case"date":return _x(r);default:return r}}};Gt.DefaultValueConverter=OT;function IT(t){return t.substring(1,t.length-1)}Gt.convertString=IT;function gx(t){return t.charAt(0)==="^"?t.substring(1):t}Gt.convertID=gx;function vx(t){return parseInt(t)}Gt.convertInt=vx;function Tx(t){return BigInt(t)}Gt.convertBigint=Tx;function _x(t){return new Date(t)}Gt.convertDate=_x;function Rx(t){return Number(t)}Gt.convertNumber=Rx;function Ax(t){return t.toLowerCase()==="true"}Gt.convertBoolean=Ax});var qT=d(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});pp.DefaultLinker=void 0;var Foe=qe(),Us=pr(),dp=Ie(),joe=Fr(),xT=Qi(),LT=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Foe.CancellationToken.None){for(let n of(0,dp.streamAst)(e.parseResult.value))await(0,joe.interruptAndCheck)(r),(0,dp.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=xT.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,Us.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,Us.isAstNode)(this._ref))return this._ref;if((0,Us.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,dp.getDocument)(e).state<xT.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,Us.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,Us.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,Us.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,dp.getDocument)(e.container);n.state<xT.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};pp.DefaultLinker=LT});var jT=d(hp=>{"use strict";Object.defineProperty(hp,"__esModule",{value:!0});hp.DefaultJsonSerializer=void 0;var MT=pr();function Sx(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var FT=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){return JSON.stringify(e,(n,i)=>this.replacer(n,i,r?.refText),r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,n){var i,a;if(!this.ignoreProperties.has(e)){if((0,MT.isReference)(r)){let o=r.ref,s=n?r.$refText:void 0;return o?{$refText:s,$ref:"#"+(o&&this.astNodeLocator.getAstNodePath(o))}:{$refText:s,$error:(a=(i=r.error)===null||i===void 0?void 0:i.message)!==null&&a!==void 0?a:"Could not resolve reference"}}return r}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];Sx(c)?u[l]=this.reviveReference(e,s,r,c):(0,MT.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else Sx(u)?e[s]=this.reviveReference(e,s,r,u):(0,MT.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};hp.DefaultJsonSerializer=FT});var UT=d(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});mp.DefaultServiceRegistry=void 0;var Goe=Dn(),GT=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=Goe.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};mp.DefaultServiceRegistry=GT});var KT=d(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});yp.ValidationRegistry=void 0;var Uoe=Cr(),Hoe=Fr(),HT=class{constructor(e){this.validationChecks=new Uoe.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,Hoe.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};yp.ValidationRegistry=HT});var VT=d(Hs=>{"use strict";Object.defineProperty(Hs,"__esModule",{value:!0});Hs.DefaultReferenceDescriptionProvider=Hs.DefaultAstNodeDescriptionProvider=void 0;var Koe=qe(),Woe=pr(),gp=Ie(),Boe=Qe(),Voe=Fr(),zoe=yi(),WT=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator}createDescription(e,r,n=(0,gp.getDocument)(e)){return{node:e,name:r,type:e.$type,documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};Hs.DefaultAstNodeDescriptionProvider=WT;var BT=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Koe.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,gp.streamAst)(i))await(0,Voe.interruptAndCheck)(r),(0,gp.streamReferences)(a).filter(o=>!(0,Woe.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,gp.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,Boe.toDocumentSegment)(n),local:(0,zoe.equalURI)(r.documentUri,i)}}};Hs.DefaultReferenceDescriptionProvider=BT});var bx=d(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.DefaultAstNodeLocator=void 0;var zT=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};vp.DefaultAstNodeLocator=zT});var XT=d(Tp=>{"use strict";Object.defineProperty(Tp,"__esModule",{value:!0});Tp.DefaultConfigurationProvider=void 0;var Yoe=yt(),YT=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(Yoe.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};Tp.DefaultConfigurationProvider=YT});var ZT=d(Rp=>{"use strict";Object.defineProperty(Rp,"__esModule",{value:!0});Rp.DefaultDocumentBuilder=void 0;var _p=qe(),Xoe=Cr(),JT=Fr(),ti=Qi(),QT=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new Xoe.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=_p.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=_p.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,JT.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),_p.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,ti.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<ti.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,ti.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,ti.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,ti.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,ti.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,ti.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,ti.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,JT.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),_p.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,JT.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=ti.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=ti.DocumentState.Validated}};Rp.DefaultDocumentBuilder=QT});var n_=d(Ap=>{"use strict";Object.defineProperty(Ap,"__esModule",{value:!0});Ap.DefaultIndexManager=void 0;var Cx=qe(),Joe=Ie(),e_=Dt(),t_=yi(),Px=Qi(),r_=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,Joe.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,t_.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,e_.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,e_.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,e_.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=Cx.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=Px.DocumentState.IndexedContent}async updateReferences(e,r=Cx.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=Px.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,t_.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,t_.equalURI)(o.targetUri,n)):!1}};Ap.DefaultIndexManager=r_});var o_=d(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.DefaultWorkspaceManager=void 0;var Qoe=qe(),i_=Dn(),Zoe=Fr(),a_=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Qoe.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,Zoe.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return i_.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=i_.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=i_.Utils.extname(r.uri);return n.includes(a)}return!1}};Sp.DefaultWorkspaceManager=a_});var c_=d(ri=>{"use strict";Object.defineProperty(ri,"__esModule",{value:!0});ri.isTokenTypeDictionary=ri.isIMultiModeLexerDefinition=ri.isTokenTypeArray=ri.DefaultLexer=void 0;var ese=Ba(),s_=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=u_(r)?Object.values(r):r;this.chevrotainLexer=new ese.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(u_(e))return e;let r=l_(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};ri.DefaultLexer=s_;function Ex(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}ri.isTokenTypeArray=Ex;function l_(t){return t&&"modes"in t&&"defaultMode"in t}ri.isIMultiModeLexerDefinition=l_;function u_(t){return!Ex(t)&&!l_(t)}ri.isTokenTypeDictionary=u_});var Cf=d(Ks=>{"use strict";Object.defineProperty(Ks,"__esModule",{value:!0});Ks.createDefaultSharedModule=Ks.createDefaultModule=void 0;var tse=qe(),rse=Tm(),nse=lb(),ise=hx(),ase=My(),ose=jy(),sse=Uy(),use=Vc(),lse=Wy(),cse=Vy(),fse=tg(),dse=ng(),pse=ag(),hse=kT(),mse=$T(),yse=DT(),gse=qT(),vse=Eo(),Tse=$y(),_se=jc(),Rse=Uc(),Ase=jT(),Sse=UT(),bse=Fr(),Cse=Wc(),Pse=KT(),kx=VT(),Ese=bx(),kse=XT(),Nse=ZT(),Nx=Qi(),wse=n_(),$se=o_(),Ose=c_();function Ise(t){return{parser:{GrammarConfig:e=>(0,nse.createGrammarConfig)(e),LangiumParser:e=>(0,hse.createLangiumParser)(e),CompletionParser:e=>(0,ise.createCompletionParser)(e),ValueConverter:()=>new yse.DefaultValueConverter,TokenBuilder:()=>new mse.DefaultTokenBuilder,Lexer:e=>new Ose.DefaultLexer(e)},lsp:{CompletionProvider:e=>new ase.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new sse.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new cse.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new use.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new dse.DefaultReferencesProvider(e),DefinitionProvider:e=>new lse.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new ose.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new pse.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new Ese.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new kx.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new kx.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new gse.DefaultLinker(e),NameProvider:()=>new vse.DefaultNameProvider,ScopeProvider:e=>new Rse.DefaultScopeProvider(e),ScopeComputation:e=>new _se.DefaultScopeComputation(e),References:e=>new Tse.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Ase.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new Cse.DefaultDocumentValidator(e),ValidationRegistry:e=>new Pse.ValidationRegistry(e)},shared:()=>t.shared}}Ks.createDefaultModule=Ise;function Dse(t){return{ServiceRegistry:()=>new Sse.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new fse.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new Nx.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new Nx.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Nse.DefaultDocumentBuilder(e),TextDocuments:()=>new tse.TextDocuments(rse.TextDocument),IndexManager:e=>new wse.DefaultIndexManager(e),WorkspaceManager:e=>new $se.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new bse.MutexLock,ConfigurationProvider:e=>new kse.DefaultConfigurationProvider(e)}}}Ks.createDefaultSharedModule=Dse});var f_=d(Or=>{"use strict";Object.defineProperty(Or,"__esModule",{value:!0});Or.findIndentation=Or.SNLE=Or.expandToString=Or.expandToStringWithNL=void 0;var Nl=bo();function xse(t,...e){return wx(t,...e)+Nl.EOL}Or.expandToStringWithNL=xse;function wx(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Or.SNLE:Mse((0,Nl.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(Nl.EOL).filter(o=>o.trim()!==Or.SNLE).map(o=>o.replace(Or.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=$x(r);return r.map(o=>o.slice(a).trimRight()).join(`
`)}Or.expandToString=wx;Or.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");var Lse=new RegExp(Nl.EOL,"g"),qse=/\S|$/;function Mse(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Lse,Nl.EOL+n)}function $x(t){let e=t.filter(n=>n.length>0).map(n=>n.search(qse)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Or.findIndentation=$x});var Ix=d(Ws=>{"use strict";Object.defineProperty(Ws,"__esModule",{value:!0});Ws.joinToNode=Ws.expandToNode=void 0;var Ii=bo(),Fse=f_(),bp=Object.freeze(new Ii.NewLineNode),Ox=Object.freeze(new Ii.CompositeGeneratorNode);function jse(t,...e){let r=Gse(t),n=Use(t,e,r);return Hse(n)}Ws.expandToNode=jse;function Gse(t){let e=t.join("_").split(Ii.EOL),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,Fse.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function Use(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(Ii.EOL).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,v)=>v===0?n?[]:[m]:v===1&&f.length===0?[m]:f.concat(bp,m):(f,m,v)=>v===0?[m]:f.concat(bp,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,Ii.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new Ii.CompositeGeneratorNode(String(e[c])):c<e.length?Ox:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===bp?o.slice(0,s-2):o.slice(0,s-1):o}function Hse(t){return t.reduce((r,n,i)=>n===Ox?r:n===bp?{indent:"",node:i===0||(0,Ii.isNewLineNode)(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>({indent:r.indent===""&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):r.indent,node:r.indent.length===0?r.node.append(n):r.node.indent(o=>o.append(n),r.indent)}))(),{indent:"",node:new Ii.CompositeGeneratorNode}).node}function Kse(t,e=String,{prefix:r,suffix:n,appendNewLineIfNotEmpty:i}={}){return Wse(t,(a,o,s,u)=>(a??(a=new Ii.CompositeGeneratorNode),a.append(r&&r(o,s,u)).append(e(o,s,u)).append(n&&n(o,s,u)).appendNewLineIfNotEmptyIf(!a.isEmpty()&&!!i)))}Ws.joinToNode=Kse;function Wse(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var xx=d(Dx=>{"use strict";Object.defineProperty(Dx,"__esModule",{value:!0})});var qx=d(Lx=>{"use strict";Object.defineProperty(Lx,"__esModule",{value:!0})});var Fx=d(Mx=>{"use strict";Object.defineProperty(Mx,"__esModule",{value:!0})});var Ya=d(Z=>{"use strict";var jx=Z&&Z.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Bse=Z&&Z.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),ce=Z&&Z.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&jx(e,t,r)},Vse=Z&&Z.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&jx(e,t,r);return Bse(e,t),e};Object.defineProperty(Z,"__esModule",{value:!0});Z.GrammarAST=Z.expandToStringWithNL=Z.expandToString=void 0;ce(Cf(),Z);ce(Ru(),Z);ce(bo(),Z);ce(Ix(),Z);var Gx=f_();Object.defineProperty(Z,"expandToString",{enumerable:!0,get:function(){return Gx.expandToString}});Object.defineProperty(Z,"expandToStringWithNL",{enumerable:!0,get:function(){return Gx.expandToStringWithNL}});ce(Zm(),Z);ce(vg(),Z);ce(xx(),Z);ce(sg(),Z);ce(op(),Z);ce(kT(),Z);ce(qx(),Z);ce($T(),Z);ce(DT(),Z);ce(c_(),Z);ce(qT(),Z);ce(Eo(),Z);ce(jc(),Z);ce(Uc(),Z);ce(jT(),Z);ce(UT(),Z);ce(Fx(),Z);ce(pr(),Z);ce(Ie(),Z);ce(Cr(),Z);ce(Qe(),Z);ce(Et(),Z);ce(Fr(),Z);ce(yi(),Z);ce(ko(),Z);ce(Dt(),Z);ce(Wc(),Z);ce(KT(),Z);ce(VT(),Z);ce(ZT(),Z);ce(Qi(),Z);ce(n_(),Z);ce(Tg(),Z);ce(o_(),Z);ce(XT(),Z);var zse=Vse($e());Z.GrammarAST=zse});var Hx=d((Lve,Ux)=>{"use strict";Ux.exports=qe()});var d_=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlter=p.ASTAlter=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTRange=p.ASTRange=p.isASTParameter=p.ASTParameter=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTList=p.ASTList=p.isASTInstruction=p.ASTInstruction=p.isASTDeclaration=p.ASTDeclaration=void 0;p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTOffsetList=p.ASTOffsetList=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=p.isASTDoubleValue=p.ASTDoubleValue=p.isASTDoubleRange=p.ASTDoubleRange=p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTrajectory=p.ASTTrajectory=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTStringList=p.ASTStringList=p.isASTSpeedParameterType=p.ASTSpeedParameterType=p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=p.isASTSaturationParameterType=p.ASTSaturationParameterType=p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=void 0;var Yse=Ya();p.ASTDeclaration="ASTDeclaration";function Xse(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=Xse;p.ASTInstruction="ASTInstruction";function Jse(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=Jse;p.ASTList="ASTList";function Qse(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=Qse;p.ASTNumber="ASTNumber";function Zse(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=Zse;p.ASTNumberOffset="ASTNumberOffset";function eue(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=eue;p.ASTParameter="ASTParameter";function tue(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=tue;p.ASTRange="ASTRange";function rue(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=rue;p.ASTReplayTarget="ASTReplayTarget";function nue(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=nue;p.ASTTarget="ASTTarget";function iue(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=iue;p.ASTTimeScope="ASTTimeScope";function aue(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=aue;p.ASTValue="ASTValue";function oue(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=oue;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function sue(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=sue;p.ASTAllPlanes="ASTAllPlanes";function uue(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=uue;p.ASTAlter="ASTAlter";function lue(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=lue;p.ASTAlterSpeed="ASTAlterSpeed";function cue(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=cue;p.ASTAssertion="ASTAssertion";function fue(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=fue;p.ASTAssertions="ASTAssertions";function due(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=due;p.ASTAt="ASTAt";function pue(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=pue;p.ASTAtFor="ASTAtFor";function hue(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=hue;p.ASTConstantValue="ASTConstantValue";function mue(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=mue;p.ASTCreate="ASTCreate";function yue(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=yue;p.ASTCreationParameter="ASTCreationParameter";function gue(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=gue;p.ASTCreationParameters="ASTCreationParameters";function vue(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=vue;p.ASTCreationParameterType="ASTCreationParameterType";function Tue(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=Tue;p.ASTCut="ASTCut";function _ue(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=_ue;p.ASTDelay="ASTDelay";function Rue(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=Rue;p.ASTDelayParameter="ASTDelayParameter";function Aue(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=Aue;p.ASTDoubleRange="ASTDoubleRange";function Sue(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=Sue;p.ASTDoubleValue="ASTDoubleValue";function bue(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=bue;p.ASTFilters="ASTFilters";function Cue(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=Cue;p.ASTHide="ASTHide";function Pue(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=Pue;p.ASTHideParameter="ASTHideParameter";function Eue(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=Eue;p.ASTIntegerRange="ASTIntegerRange";function kue(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=kue;p.ASTIntegerValue="ASTIntegerValue";function Nue(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=Nue;p.ASTLeftShift="ASTLeftShift";function wue(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=wue;p.ASTListDeclaration="ASTListDeclaration";function $ue(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=$ue;p.ASTOffsetList="ASTOffsetList";function Oue(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=Oue;p.ASTParamDrift="ASTParamDrift";function Iue(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Iue;p.ASTParamEdit="ASTParamEdit";function Due(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=Due;p.ASTParameters="ASTParameters";function xue(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=xue;p.ASTParameterType="ASTParameterType";function Lue(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=Lue;p.ASTParamNoise="ASTParamNoise";function que(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=que;p.ASTParamOffset="ASTParamOffset";function Mue(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=Mue;p.ASTPlane="ASTPlane";function Fue(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=Fue;p.ASTPlaneFrom="ASTPlaneFrom";function jue(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=jue;p.ASTRangeDeclaration="ASTRangeDeclaration";function Gue(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=Gue;p.ASTRecordingParameterType="ASTRecordingParameterType";function Uue(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=Uue;p.ASTRecordingValue="ASTRecordingValue";function Hue(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=Hue;p.ASTReplay="ASTReplay";function Kue(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=Kue;p.ASTRightShift="ASTRightShift";function Wue(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=Wue;p.ASTRotate="ASTRotate";function Bue(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=Bue;p.ASTRotateParameter="ASTRotateParameter";function Vue(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=Vue;p.ASTSaturate="ASTSaturate";function zue(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=zue;p.ASTSaturationParameter="ASTSaturationParameter";function Yue(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=Yue;p.ASTSaturationParameters="ASTSaturationParameters";function Xue(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=Xue;p.ASTSaturationParameterType="ASTSaturationParameterType";function Jue(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=Jue;p.ASTScenario="ASTScenario";function Que(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=Que;p.ASTSpeedParameter="ASTSpeedParameter";function Zue(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=Zue;p.ASTSpeedParameters="ASTSpeedParameters";function ele(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=ele;p.ASTSpeedParameterType="ASTSpeedParameterType";function tle(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=tle;p.ASTStringList="ASTStringList";function rle(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=rle;p.ASTStringValue="ASTStringValue";function nle(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=nle;p.ASTTime="ASTTime";function ile(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=ile;p.ASTTrajectory="ASTTrajectory";function ale(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=ale;p.ASTTrigger="ASTTrigger";function ole(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=ole;p.ASTVariableValue="ASTVariableValue";function sle(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=sle;p.ASTWayPoint="ASTWayPoint";function ule(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=ule;p.ASTWayPoints="ASTWayPoints";function lle(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=lle;p.ASTWindow="ASTWindow";function cle(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=cle;var Cp=class extends Yse.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlter:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:case p.ASTTrajectory:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTAtFor:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTStringValue:case p.ASTVariableValue:case p.ASTNumberOffset:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleRange:case p.ASTIntegerRange:return this.isSubtype(p.ASTRange,r);case p.ASTDoubleValue:case p.ASTIntegerValue:case p.ASTRecordingValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTRightShift:case p.ASTNumber:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);case p.ASTOffsetList:case p.ASTStringList:return this.isSubtype(p.ASTList,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=Cp;p.reflection=new Cp});var Kx=d(Ep=>{"use strict";Object.defineProperty(Ep,"__esModule",{value:!0});Ep.AttackScenarioGrammarGrammar=void 0;var fle=Ya(),Pp,dle=()=>Pp!=null?Pp:Pp=(0,fle.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "AttackScenarioGrammar",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "ASTScenario",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "declarations",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "instructions",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@10"
              },
              "arguments": []
            },
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTList",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@3"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTStringList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@102"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@141"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@84"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@141"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@103"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTOffsetList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@102"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@53"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@84"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@53"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@103"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRange",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@5"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTIntegerRange",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@104"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "start",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@139"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@84"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "end",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@139"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@105"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTDoubleRange",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@104"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "start",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@140"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@84"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "end",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@140"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@105"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@8"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@9"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@84"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTListDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@106"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "constant",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@137"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@88"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "list",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRangeDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@106"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "constant",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@137"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@88"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "range",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTInstruction",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTHide",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@113"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "frequency",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@33"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTCreate",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@85"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trajectory",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "parameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@44"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAlter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@73"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "parameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@31"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTTrajectory",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@73"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "trajectory",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAlterSpeed",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@72"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "parameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@40"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSaturate",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@122"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "parameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@42"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTReplay",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@114"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "parameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@31"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTDelay",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@115"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "delay",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@32"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRotate",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@116"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTCut",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@79"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "target",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "trigger",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@46"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "assertions",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAssertions",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@22"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@22"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAssertion",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@76"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "timeScope",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@133"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "file",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@141"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@134"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "filter",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@141"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTTarget",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTPlane",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@120"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "filters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAllPlanes",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@70"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "filters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTReplayTarget",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTPlaneFrom",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@120"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "filters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@97"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "recording",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAllPlaneFrom",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@70"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "filters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@97"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "recording",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTWayPoints",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@132"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@104"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "waypoints",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@30"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@84"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "waypoints",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@105"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTWayPoint",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@100"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "latitude",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@84"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "longitude",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@101"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@131"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "altitude",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@77"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "time",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParameters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@130"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@35"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@35"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTDelayParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@117"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTHideParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@118"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRotateParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@119"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParameter",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParamEdit",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@67"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@88"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParamOffset",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@67"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "offset_op",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@90"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@91"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParamNoise",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@67"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@89"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParamDrift",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@67"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "drift_op",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@92"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@93"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSpeedParameters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@130"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@41"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSpeedParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@66"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@88"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSaturationParameters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@130"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@43"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@43"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSaturationParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@64"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@88"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTCreationParameters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@130"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "items",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@45"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "items",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@45"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTCreationParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@65"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@88"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTTrigger",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@124"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "triggername",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTTimeScope",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAt",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@77"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "time",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTWindow",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@98"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "start",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@127"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "end",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTAtFor",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@77"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "time",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@96"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "for",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@51"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTTime",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "realTime",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@125"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTFilters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@123"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "filters",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@75"
                },
                "arguments": []
              },
              {
                "$type": "Assignment",
                "feature": "filters",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@60"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTNumberOffset",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTLeftShift",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@94"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "content",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@56"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRightShift",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@95"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "content",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@56"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTNumber",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@58"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTIntegerValue",
      "definition": {
        "$type": "Assignment",
        "feature": "content",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@139"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTDoubleValue",
      "definition": {
        "$type": "Assignment",
        "feature": "content",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@140"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRecordingValue",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "ratio",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@140"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@111"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "content",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@68"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTValue",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@61"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@62"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@63"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTStringValue",
      "definition": {
        "$type": "Assignment",
        "feature": "content",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@141"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTVariableValue",
      "definition": {
        "$type": "Assignment",
        "feature": "content",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@138"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTConstantValue",
      "definition": {
        "$type": "Assignment",
        "feature": "content",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@137"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSaturationParameterType",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "ICAO",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "ICAO"
            }
          },
          {
            "$type": "Assignment",
            "feature": "AIRCRAFT_NUMBER",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "NUMBER"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTCreationParameterType",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "ICAO",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "ICAO"
            }
          },
          {
            "$type": "Assignment",
            "feature": "CALLSIGN",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "CALLSIGN"
            }
          },
          {
            "$type": "Assignment",
            "feature": "SQUAWK",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "SQUAWK"
            }
          },
          {
            "$type": "Assignment",
            "feature": "EMERGENCY",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "EMERGENCY"
            }
          },
          {
            "$type": "Assignment",
            "feature": "ALERT",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "ALERT"
            }
          },
          {
            "$type": "Assignment",
            "feature": "SPI",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "SPI"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTSpeedParameterType",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "EAST_WEST_VELOCITY",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "EAST_WEST_VELOCITY"
            }
          },
          {
            "$type": "Assignment",
            "feature": "NORTH_SOUTH_VELOCITY",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "NORTH_SOUTH_VELOCITY"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTParameterType",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "ALTITUDE",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "ALTITUDE"
            }
          },
          {
            "$type": "Assignment",
            "feature": "CALLSIGN",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "CALLSIGN"
            }
          },
          {
            "$type": "Assignment",
            "feature": "EMERGENCY",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "EMERGENCY"
            }
          },
          {
            "$type": "Assignment",
            "feature": "GROUND_SPEED",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "GROUNDSPEED"
            }
          },
          {
            "$type": "Assignment",
            "feature": "ICAO",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "ICAO"
            }
          },
          {
            "$type": "Assignment",
            "feature": "LATITUDE",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "LATITUDE"
            }
          },
          {
            "$type": "Assignment",
            "feature": "LONGITUDE",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "LONGITUDE"
            }
          },
          {
            "$type": "Assignment",
            "feature": "SPI",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "SPI"
            }
          },
          {
            "$type": "Assignment",
            "feature": "SQUAWK",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "SQUAWK"
            }
          },
          {
            "$type": "Assignment",
            "feature": "TRACK",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "TRACK"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ASTRecordingParameterType",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "REC_DURATION",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "REC_DURATION"
            }
          },
          {
            "$type": "Assignment",
            "feature": "ALT_DURATION",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "ALT_DURATION"
            }
          },
          {
            "$type": "Assignment",
            "feature": "REC_NBR_AIRCRAFT",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "REC_NBR_AIRCRAFT"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_AREA",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "area"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_ALL_PLANES",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "all_planes"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_PLANES",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "planes"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_ALTER_SPEED",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "alter_speed"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_ALTER",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "alter"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_ALTITUDE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "altitude"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_AND",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "and"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_ASSERT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "assert"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_AT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "at"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CIRCLE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "circle"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CUT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "cut"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_DO",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "do"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_EACH",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "each"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_POLYGON",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "polygon"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CENTERED",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "centered"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_COMMA",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": ","
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CREATE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "create"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_DOT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "."
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_DIFFERENT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "<>"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_EQUAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_MULEQUAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "*="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_PLUSEQUAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "+="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_MINUSEQUAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "-="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_PLUSPLUSEQUAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "++="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_MINUSMINUSEQUAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "--="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_LEFTSHIT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "<<"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_RIGHTSHIT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": ">>"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_FOR",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "for"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_FROM_RECORDING",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "from_recording"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_FROM",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "from"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_GLOBAL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "global"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_OPEN_PAR",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "("
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CLOSE_PAR",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": ")"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_OPEN_BRACE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "{"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CLOSE_BRACE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "}"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_OPEN_SBRACE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "["
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CLOSE_SBRACE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "]"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_LET",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "let"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_LT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "<"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_GT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": ">"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_LTE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "<="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_GTE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": ">="
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_MUL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "*"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_IN",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "in"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_HIDE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "hide"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_REPLAY",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "replay"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_DELAY",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "delay"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_ROTATE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "rotate"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH_DELAY",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with_delay"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH_FREQUENCY",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with_frequency"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH_ANGLE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with_angle"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_PLANE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "plane"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_RADIUS",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "radius"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_SATURATE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "saturate"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_SATISFYING",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "satisfying"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_TRIGGERED_BY",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "triggered_by"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_SECONDS",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "seconds"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_TO",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "to"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_UNTIL",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "until"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_VERTICES",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "vertices"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH_VALUES",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with_values"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH_ALTITUDE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with_altitude"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_WITH_WAYPOINTS",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "with_waypoints"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_GROOVY_FILE",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "groovy_file"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_FILTER",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "filter"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "T_CONSTANT_BEGIN",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "$"
        }
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "T_VARIABLE_BEGIN",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "#"
        }
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_CONSTANT",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@135"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@145"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_VARIABLE",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@136"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@145"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_INTEGER_LITERAL",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "-"
                },
                "cardinality": "?"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "1"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                },
                "cardinality": "*"
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "0"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_DOUBLE_LITERAL",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalGroup",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "-"
                    },
                    "cardinality": "?"
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "1"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "9"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "0"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "9"
                    },
                    "cardinality": "*"
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "."
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "0"
            },
            "right": {
              "$type": "Keyword",
              "value": "9"
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "0"
            },
            "right": {
              "$type": "Keyword",
              "value": "9"
            },
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "T_STRING_LITERAL",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\""
            }
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalRuleCall",
                "rule": {
                  "$ref": "#/rules@147"
                }
              },
              {
                "$type": "NegatedToken",
                "terminal": {
                  "$type": "TerminalAlternatives",
                  "elements": [
                    {
                      "$type": "CharacterRange",
                      "left": {
                        "$type": "Keyword",
                        "value": "\\\\\\\\"
                      }
                    },
                    {
                      "$type": "CharacterRange",
                      "left": {
                        "$type": "Keyword",
                        "value": "\\""
                      }
                    }
                  ]
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\""
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "DIGIT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        }
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "IDENTIFIER_FIRST",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "*"
            }
          }
        ]
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "IDENTIFIER_BODY",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "TerminalAlternatives",
                        "elements": [
                          {
                            "$type": "CharacterRange",
                            "left": {
                              "$type": "Keyword",
                              "value": "a"
                            },
                            "right": {
                              "$type": "Keyword",
                              "value": "z"
                            }
                          },
                          {
                            "$type": "CharacterRange",
                            "left": {
                              "$type": "Keyword",
                              "value": "A"
                            },
                            "right": {
                              "$type": "Keyword",
                              "value": "Z"
                            }
                          }
                        ]
                      },
                      {
                        "$type": "TerminalRuleCall",
                        "rule": {
                          "$ref": "#/rules@142"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "/"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "*"
            }
          }
        ]
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "IDENTIFIER",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@143"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@144"
            },
            "cardinality": "*"
          }
        ]
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SPACE_ESCAPE",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "ESCAPE_SEQUENCE",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalGroup",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\\\\\\\"
                    }
                  },
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "TerminalAlternatives",
                        "elements": [
                          {
                            "$type": "TerminalAlternatives",
                            "elements": [
                              {
                                "$type": "TerminalAlternatives",
                                "elements": [
                                  {
                                    "$type": "TerminalAlternatives",
                                    "elements": [
                                      {
                                        "$type": "TerminalAlternatives",
                                        "elements": [
                                          {
                                            "$type": "TerminalAlternatives",
                                            "elements": [
                                              {
                                                "$type": "CharacterRange",
                                                "left": {
                                                  "$type": "Keyword",
                                                  "value": "b"
                                                }
                                              },
                                              {
                                                "$type": "CharacterRange",
                                                "left": {
                                                  "$type": "Keyword",
                                                  "value": "t"
                                                }
                                              }
                                            ]
                                          },
                                          {
                                            "$type": "CharacterRange",
                                            "left": {
                                              "$type": "Keyword",
                                              "value": "n"
                                            }
                                          }
                                        ]
                                      },
                                      {
                                        "$type": "CharacterRange",
                                        "left": {
                                          "$type": "Keyword",
                                          "value": "f"
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    "$type": "CharacterRange",
                                    "left": {
                                      "$type": "Keyword",
                                      "value": "r"
                                    }
                                  }
                                ]
                              },
                              {
                                "$type": "CharacterRange",
                                "left": {
                                  "$type": "Keyword",
                                  "value": "\\\\\\""
                                }
                              }
                            ]
                          },
                          {
                            "$type": "CharacterRange",
                            "left": {
                              "$type": "Keyword",
                              "value": "\\\\'"
                            }
                          }
                        ]
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\\\\\"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "TerminalRuleCall",
                "rule": {
                  "$ref": "#/rules@149"
                }
              }
            ]
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@148"
            }
          }
        ]
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "OCTAL_ESCAPE",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalGroup",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\\\\\\\"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "0"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "3"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "0"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "7"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "0"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "7"
                    }
                  }
                ]
              },
              {
                "$type": "TerminalGroup",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\\\\\\\"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "0"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "7"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "0"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "7"
                    }
                  }
                ]
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\\\\\\\"
                }
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "7"
                }
              }
            ]
          }
        ]
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "UNICODE_ESCAPE",
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\\\\\\\"
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "u"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@150"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@150"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@150"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@150"
            }
          }
        ]
      },
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "fragment": true,
      "name": "HEX_DIGIT",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "a"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "f"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "A"
            },
            "right": {
              "$type": "Keyword",
              "value": "F"
            }
          }
        ]
      },
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`);Ep.AttackScenarioGrammarGrammar=dle});var Wx=d(Di=>{"use strict";Object.defineProperty(Di,"__esModule",{value:!0});Di.AttackScenarioGrammarGeneratedModule=Di.FditscenarioGeneratedSharedModule=Di.AttackScenarioGrammarLanguageMetaData=void 0;var ple=d_(),hle=Kx();Di.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};Di.FditscenarioGeneratedSharedModule={AstReflection:()=>new ple.FditscenarioAstReflection};Di.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,hle.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>Di.AttackScenarioGrammarLanguageMetaData,parser:{}}});var Bx=d(Bs=>{"use strict";Object.defineProperty(Bs,"__esModule",{value:!0});Bs.FditscenarioValidator=Bs.registerValidationChecks=void 0;function mle(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}Bs.registerValidationChecks=mle;var p_=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};Bs.FditscenarioValidator=p_});var zx=d(Np=>{"use strict";Object.defineProperty(Np,"__esModule",{value:!0});Np.generateCommands=void 0;var Xa=d_(),yle=50;function gle(t,e){return vle(t,e)}Np.generateCommands=gle;function vle(t,e){return{sensors:Tle(t,e)}}function Tle(t,e){return{sensor:[{sensorType:"SBS",sID:"",record:"../../../server/src/"+e,filter:"",action:_le(t.instructions)}]}}var wl;(function(t){t.deletion="DELETION",t.creation="CREATION",t.alteration="ALTERATION",t.saturation="SATURATION",t.duplication="DUPLICATION",t.rotation="ROTATION",t.custom="CUSTOM",t.replay="REPLAY",t.timestamp="TIMESTAMP",t.cut="CUT",t.speedAltaration="SPEED_ALTERATION",t.trajectory="TRAJECTORY_MODIFICATION"})(wl||(wl={}));var Jr;(function(t){t.altitude="ALTITUDE",t.latitude="LATITUDE",t.icao="ICAO",t.track="TRACK",t.callsign="CALLSIGN",t.emergency="EMERGENCY",t.groundspeed="GROUNDSPEED",t.longitude="LONGITUDE",t.spi="SPI",t.squawk="SQUAWK"})(Jr||(Jr={}));function _le(t){return t.flatMap(e=>Rle(e)).filter(e=>e!==void 0)}function Rle(t){return(0,Xa.isASTHide)(t)?{alterationType:wl.deletion,scope:h_(t.timeScope),parameters:{target:Vx(t.target),parameter:[{mode:"simple",frequency:Cle(t.frequency)}]}}:(0,Xa.isASTAlter)(t)?{alterationType:wl.alteration,scope:h_(t.timeScope),parameters:{target:Vx(t.target),parameter:Ale(t.parameters)}}:{alterationType:wl.cut,scope:h_(t.timeScope),parameters:{target:[{identifier:"SPI",value:""}]}}}function h_(t){return(0,Xa.isASTAt)(t)?{type:"timeWindow",lowerBound:t.time.realTime.content.toString(),upperBound:t.time.realTime.content.toString()+yle.toString()}:{type:"timeWindow"}}function Vx(t){return(0,Xa.isASTAllPlanes)(t)?[{identifier:"hexIdent",value:"ALL"}]:[{identifier:"hexIdent",value:"TEST"}]}function Ale(t){return t!=null?Sle(t.items):[]}function Sle(t){let e=[];for(let r=0;r<t.length;r++)e.push(ble(t[r]));return e}function ble(t){return(0,Xa.isASTParamEdit)(t)?{mode:"simple",key:kp(t.name),value:t.value.content.toString().replace('"',"")}:(0,Xa.isASTParamOffset)(t)?{mode:"offset",key:kp(t.name),value:t.value.content.toString().replace('"',"")}:(0,Xa.isASTParamNoise)(t)?{mode:"noise",key:kp(t.name),value:t.value.content.toString().replace('"',"")}:{mode:"drift",key:kp(t.name),value:t.value.content.toString().replace('"',"")}}function kp(t){return t.ALTITUDE!=null?Jr.altitude:t.CALLSIGN!=null?Jr.callsign:t.EMERGENCY!=null?Jr.emergency:t.GROUND_SPEED!=null?Jr.groundspeed:t.ICAO!=null?Jr.icao:t.LATITUDE!=null?Jr.latitude:t.LONGITUDE!=null?Jr.longitude:t.SPI!=null?Jr.spi:t.SQUAWK!=null?Jr.squawk:Jr.track}function Cle(t){return t!=null?t.value.content.toString():""}});var Xx=d((Uve,Yx)=>{"use strict";Yx.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var m_=d((Hve,Qx)=>{var $l=Xx(),Jx={};for(let t of Object.keys($l))Jx[$l[t]]=t;var Y={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};Qx.exports=Y;for(let t of Object.keys(Y)){if(!("channels"in Y[t]))throw new Error("missing channels property: "+t);if(!("labels"in Y[t]))throw new Error("missing channel labels property: "+t);if(Y[t].labels.length!==Y[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=Y[t];delete Y[t].channels,delete Y[t].labels,Object.defineProperty(Y[t],"channels",{value:e}),Object.defineProperty(Y[t],"labels",{value:r})}Y.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(e,r,n),a=Math.max(e,r,n),o=a-i,s,u;a===i?s=0:e===a?s=(r-n)/o:r===a?s=2+(n-e)/o:n===a&&(s=4+(e-r)/o),s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return a===i?u=0:l<=.5?u=o/(a+i):u=o/(2-a-i),[s,u*100,l*100]};Y.rgb.hsv=function(t){let e,r,n,i,a,o=t[0]/255,s=t[1]/255,u=t[2]/255,l=Math.max(o,s,u),c=l-Math.min(o,s,u),f=function(m){return(l-m)/6/c+1/2};return c===0?(i=0,a=0):(a=c/l,e=f(o),r=f(s),n=f(u),o===l?i=n-r:s===l?i=1/3+e-n:u===l&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[i*360,a*100,l*100]};Y.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],i=Y.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[i,a*100,n*100]};Y.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-r,1-n),a=(1-e-i)/(1-i)||0,o=(1-r-i)/(1-i)||0,s=(1-n-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function Ple(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}Y.rgb.keyword=function(t){let e=Jx[t];if(e)return e;let r=1/0,n;for(let i of Object.keys($l)){let a=$l[i],o=Ple(t,a);o<r&&(r=o,n=i)}return n};Y.keyword.rgb=function(t){return $l[t]};Y.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let i=e*.4124+r*.3576+n*.1805,a=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[i*100,a*100,o*100]};Y.rgb.lab=function(t){let e=Y.rgb.xyz(t),r=e[0],n=e[1],i=e[2];r/=95.047,n/=100,i/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let a=116*n-16,o=500*(r-n),s=200*(n-i);return[a,o,s]};Y.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i,a,o;if(r===0)return o=n*255,[o,o,o];n<.5?i=n*(1+r):i=n+r-n*r;let s=2*n-i,u=[0,0,0];for(let l=0;l<3;l++)a=e+1/3*-(l-1),a<0&&a++,a>1&&a--,6*a<1?o=s+(i-s)*6*a:2*a<1?o=i:3*a<2?o=s+(i-s)*(2/3-a)*6:o=s,u[l]=o*255;return u};Y.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=r,a=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,i*=a<=1?a:2-a;let o=(n+r)/2,s=n===0?2*i/(a+i):2*r/(n+r);return[e,s*100,o*100]};Y.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,i=Math.floor(e)%6,a=e-Math.floor(e),o=255*n*(1-r),s=255*n*(1-r*a),u=255*n*(1-r*(1-a));switch(n*=255,i){case 0:return[n,u,o];case 1:return[s,n,o];case 2:return[o,n,u];case 3:return[o,s,n];case 4:return[u,o,n];case 5:return[n,o,s]}};Y.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=Math.max(n,.01),a,o;o=(2-r)*n;let s=(2-r)*i;return a=r*i,a/=s<=1?s:2-s,a=a||0,o/=2,[e,a*100,o*100]};Y.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i=r+n,a;i>1&&(r/=i,n/=i);let o=Math.floor(6*e),s=1-n;a=6*e-o,o&1&&(a=1-a);let u=r+a*(s-r),l,c,f;switch(o){default:case 6:case 0:l=s,c=u,f=r;break;case 1:l=u,c=s,f=r;break;case 2:l=r,c=s,f=u;break;case 3:l=r,c=u,f=s;break;case 4:l=u,c=r,f=s;break;case 5:l=s,c=r,f=u;break}return[l*255,c*255,f*255]};Y.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i=t[3]/100,a=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,r*(1-i)+i),s=1-Math.min(1,n*(1-i)+i);return[a*255,o*255,s*255]};Y.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i,a,o;return i=e*3.2406+r*-1.5372+n*-.4986,a=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),o=Math.min(Math.max(0,o),1),[i*255,a*255,o*255]};Y.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let i=116*r-16,a=500*(e-r),o=200*(r-n);return[i,a,o]};Y.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],i,a,o;a=(e+16)/116,i=r/500+a,o=a-n/200;let s=a**3,u=i**3,l=o**3;return a=s>.008856?s:(a-16/116)/7.787,i=u>.008856?u:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]};Y.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],i;i=Math.atan2(n,r)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(r*r+n*n);return[e,o,i]};Y.lch.lab=function(t){let e=t[0],r=t[1],i=t[2]/360*2*Math.PI,a=r*Math.cos(i),o=r*Math.sin(i);return[e,a,o]};Y.rgb.ansi16=function(t,e=null){let[r,n,i]=t,a=e===null?Y.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return a===2&&(o+=60),o};Y.hsv.ansi16=function(t){return Y.rgb.ansi16(Y.hsv.rgb(t),t[2])};Y.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};Y.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,i=(e>>1&1)*r*255,a=(e>>2&1)*r*255;return[n,i,a]};Y.ansi256.rgb=function(t){if(t>=232){let a=(t-232)*10+8;return[a,a,a]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,i=e%6/5*255;return[r,n,i]};Y.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};Y.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(s=>s+s).join(""));let n=parseInt(r,16),i=n>>16&255,a=n>>8&255,o=n&255;return[i,a,o]};Y.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),o=i-a,s,u;return o<1?s=a/(1-o):s=0,o<=0?u=0:i===e?u=(r-n)/o%6:i===r?u=2+(n-e)/o:u=4+(e-r)/o,u/=6,u%=1,[u*360,o*100,s*100]};Y.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),i=0;return n<1&&(i=(r-.5*n)/(1-n)),[t[0],n*100,i*100]};Y.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,i=0;return n<1&&(i=(r-n)/(1-n)),[t[0],n*100,i*100]};Y.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let i=[0,0,0],a=e%1*6,o=a%1,s=1-o,u=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return u=(1-r)*n,[(r*i[0]+u)*255,(r*i[1]+u)*255,(r*i[2]+u)*255]};Y.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),i=0;return n>0&&(i=e/n),[t[0],i*100,n*100]};Y.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],i*100,n*100]};Y.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};Y.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],i*100,a*100]};Y.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};Y.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};Y.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};Y.gray.hsl=function(t){return[0,0,t[0]]};Y.gray.hsv=Y.gray.hsl;Y.gray.hwb=function(t){return[0,100,t[0]]};Y.gray.cmyk=function(t){return[0,0,0,t[0]]};Y.gray.lab=function(t){return[t[0],0,0]};Y.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};Y.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var eL=d((Kve,Zx)=>{var wp=m_();function Ele(){let t={},e=Object.keys(wp);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function kle(t){let e=Ele(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),i=Object.keys(wp[n]);for(let a=i.length,o=0;o<a;o++){let s=i[o],u=e[s];u.distance===-1&&(u.distance=e[n].distance+1,u.parent=n,r.unshift(s))}}return e}function Nle(t,e){return function(r){return e(t(r))}}function wle(t,e){let r=[e[t].parent,t],n=wp[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)r.unshift(e[i].parent),n=Nle(wp[e[i].parent][i],n),i=e[i].parent;return n.conversion=r,n}Zx.exports=function(t){let e=kle(t),r={},n=Object.keys(e);for(let i=n.length,a=0;a<i;a++){let o=n[a];e[o].parent!==null&&(r[o]=wle(o,e))}return r}});var rL=d((Wve,tL)=>{var y_=m_(),$le=eL(),Vs={},Ole=Object.keys(y_);function Ile(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function Dle(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let i=t(r);if(typeof i=="object")for(let a=i.length,o=0;o<a;o++)i[o]=Math.round(i[o]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}Ole.forEach(t=>{Vs[t]={},Object.defineProperty(Vs[t],"channels",{value:y_[t].channels}),Object.defineProperty(Vs[t],"labels",{value:y_[t].labels});let e=$le(t);Object.keys(e).forEach(n=>{let i=e[n];Vs[t][n]=Dle(i),Vs[t][n].raw=Ile(i)})});tL.exports=Vs});var uL=d((Bve,sL)=>{"use strict";var nL=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,iL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},aL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},$p=t=>t,oL=(t,e,r)=>[t,e,r],zs=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},g_,Ys=(t,e,r,n)=>{g_===void 0&&(g_=rL());let i=n?10:0,a={};for(let[o,s]of Object.entries(g_)){let u=o==="ansi16"?"ansi":o;o===e?a[u]=t(r,i):typeof s=="object"&&(a[u]=t(s[e],i))}return a};function xle(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[i,a]of Object.entries(n))e[i]={open:`\x1B[${a[0]}m`,close:`\x1B[${a[1]}m`},n[i]=e[i],t.set(a[0],a[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",zs(e.color,"ansi",()=>Ys(nL,"ansi16",$p,!1)),zs(e.color,"ansi256",()=>Ys(iL,"ansi256",$p,!1)),zs(e.color,"ansi16m",()=>Ys(aL,"rgb",oL,!1)),zs(e.bgColor,"ansi",()=>Ys(nL,"ansi16",$p,!0)),zs(e.bgColor,"ansi256",()=>Ys(iL,"ansi256",$p,!0)),zs(e.bgColor,"ansi16m",()=>Ys(aL,"rgb",oL,!0)),e}Object.defineProperty(sL,"exports",{enumerable:!0,get:xle})});var cL=d((Vve,lL)=>{"use strict";lL.exports={stdout:!1,stderr:!1}});var dL=d((zve,fL)=>{"use strict";var Lle=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let i=e.length,a=0,o="";do o+=t.substr(a,n-a)+e+r,a=n+i,n=t.indexOf(e,a);while(n!==-1);return o+=t.substr(a),o},qle=(t,e,r,n)=>{let i=0,a="";do{let o=t[n-1]==="\r";a+=t.substr(i,(o?n-1:n)-i)+e+(o?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return a+=t.substr(i),a};fL.exports={stringReplaceAll:Lle,stringEncaseCRLFWithFirstIndex:qle}});var gL=d((Yve,yL)=>{"use strict";var Mle=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,pL=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,Fle=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,jle=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,Gle=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function mL(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):Gle.get(t)||t}function Ule(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),i;for(let a of n){let o=Number(a);if(!Number.isNaN(o))r.push(o);else if(i=a.match(Fle))r.push(i[2].replace(jle,(s,u,l)=>u?mL(u):l));else throw new Error(`Invalid Chalk template style argument: ${a} (in style '${t}')`)}return r}function Hle(t){pL.lastIndex=0;let e=[],r;for(;(r=pL.exec(t))!==null;){let n=r[1];if(r[2]){let i=Ule(n,r[2]);e.push([n].concat(i))}else e.push([n])}return e}function hL(t,e){let r={};for(let i of e)for(let a of i.styles)r[a[0]]=i.inverse?null:a.slice(1);let n=t;for(let[i,a]of Object.entries(r))if(Array.isArray(a)){if(!(i in n))throw new Error(`Unknown Chalk style: ${i}`);n=a.length>0?n[i](...a):n[i]}return n}yL.exports=(t,e)=>{let r=[],n=[],i=[];if(e.replace(Mle,(a,o,s,u,l,c)=>{if(o)i.push(mL(o));else if(u){let f=i.join("");i=[],n.push(r.length===0?f:hL(t,r)(f)),r.push({inverse:s,styles:Hle(u)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push(hL(t,r)(i.join(""))),i=[],r.pop()}else i.push(c)}),n.push(i.join("")),r.length>0){let a=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(a)}return n.join("")}});var bL=d((Xve,SL)=>{"use strict";var Ol=uL(),{stdout:T_,stderr:__}=cL(),{stringReplaceAll:Kle,stringEncaseCRLFWithFirstIndex:Wle}=dL(),{isArray:Op}=Array,TL=["ansi","ansi","ansi256","ansi16m"],Xs=Object.create(null),Ble=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=T_?T_.level:0;t.level=e.level===void 0?r:e.level},R_=class{constructor(e){return _L(e)}},_L=t=>{let e={};return Ble(e,t),e.template=(...r)=>AL(e.template,...r),Object.setPrototypeOf(e,Ip.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=R_,e.template};function Ip(t){return _L(t)}for(let[t,e]of Object.entries(Ol))Xs[t]={get(){let r=Dp(this,A_(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};Xs.visible={get(){let t=Dp(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var RL=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of RL)Xs[t]={get(){let{level:e}=this;return function(...r){let n=A_(Ol.color[TL[e]][t](...r),Ol.color.close,this._styler);return Dp(this,n,this._isEmpty)}}};for(let t of RL){let e="bg"+t[0].toUpperCase()+t.slice(1);Xs[e]={get(){let{level:r}=this;return function(...n){let i=A_(Ol.bgColor[TL[r]][t](...n),Ol.bgColor.close,this._styler);return Dp(this,i,this._isEmpty)}}}}var Vle=Object.defineProperties(()=>{},{...Xs,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),A_=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Dp=(t,e,r)=>{let n=(...i)=>Op(i[0])&&Op(i[0].raw)?vL(n,AL(n,...i)):vL(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,Vle),n._generator=t,n._styler=e,n._isEmpty=r,n},vL=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=Kle(e,r.close,r.open),r=r.parent;let a=e.indexOf(`
`);return a!==-1&&(e=Wle(e,i,n,a)),n+e+i},v_,AL=(t,...e)=>{let[r]=e;if(!Op(r)||!Op(r.raw))return e.join(" ");let n=e.slice(1),i=[r.raw[0]];for(let a=1;a<r.length;a++)i.push(String(n[a-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[a]));return v_===void 0&&(v_=gL()),v_(t,i.join(""))};Object.defineProperties(Ip.prototype,Xs);var xp=Ip();xp.supportsColor=T_;xp.stderr=Ip({level:__?__.level:0});xp.stderr.supportsColor=__;SL.exports=xp});var NL=d(ni=>{"use strict";var PL=ni&&ni.__awaiter||function(t,e,r,n){function i(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(c){try{l(n.next(c))}catch(f){o(f)}}function u(c){try{l(n.throw(c))}catch(f){o(f)}}function l(c){c.done?a(c.value):i(c.value).then(s,u)}l((n=n.apply(t,e||[])).next())})},zle=ni&&ni.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ni,"__esModule",{value:!0});ni.parseAndGenerate=ni.extractAstNodeFromString=void 0;var EL=Dn(),Yle=Ya(),Xle=S_(),Jle=zx(),CL=zle(bL());function kL(t,e){return PL(this,void 0,void 0,function*(){let r=e.shared.workspace.LangiumDocumentFactory.fromString(t,EL.URI.parse("memory://fditscenario.document"));return yield e.shared.workspace.DocumentBuilder.build([r],{validationChecks:"all"}),r.parseResult.value})}ni.extractAstNodeFromString=kL;function Qle(t,e,r,n){return PL(this,void 0,void 0,function*(){let i=(0,Xle.createFditscenarioServices)(Yle.EmptyFileSystem).Fditscenario,a=yield kL(t,i);console.log("fditscenarioProgram : "+t);let s=i.shared.workspace.LangiumDocumentFactory.fromString(t,EL.URI.parse("memory://fditscenario.document")).parseResult;if(s.lexerErrors.length===0&&s.parserErrors.length===0)console.log(CL.default.green("Parsed and validated successfully!"));else return console.log(CL.default.red("Failed to parse and validate !")),Promise.resolve(void 0);let u=(0,Jle.generateCommands)(a,r);return Promise.resolve(u)})}ni.parseAndGenerate=Qle});var S_=d(Ja=>{"use strict";Object.defineProperty(Ja,"__esModule",{value:!0});Ja.createFditscenarioServices=Ja.FditscenarioModule=void 0;var Lp=Ya(),wL=Wx(),$L=Bx(),Zle=Ya(),ece=NL();Ja.FditscenarioModule={validation:{FditscenarioValidator:()=>new $L.FditscenarioValidator}};function tce(t){let e=(0,Lp.inject)((0,Lp.createDefaultSharedModule)(t),wL.FditscenarioGeneratedSharedModule),r=(0,Lp.inject)((0,Lp.createDefaultModule)({shared:e}),wL.AttackScenarioGrammarGeneratedModule,Ja.FditscenarioModule);return e.lsp.ExecuteCommandHandler=new b_,e.ServiceRegistry.register(r),(0,$L.registerValidationChecks)(r),{shared:e,Fditscenario:r}}Ja.createFditscenarioServices=tce;var b_=class extends Zle.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,ece.parseAndGenerate)(r[0],r[1],r[2],r[3]))}}});var sce=d(IL=>{Object.defineProperty(IL,"__esModule",{value:!0});var OL=Ya(),C_=Hx(),rce=S_(),nce=new C_.BrowserMessageReader(self),ice=new C_.BrowserMessageWriter(self),ace=(0,C_.createConnection)(nce,ice),{shared:oce}=(0,rce.createFditscenarioServices)(Object.assign({connection:ace},OL.EmptyFileSystem));(0,OL.startLanguageServer)(oce)});sce();})();

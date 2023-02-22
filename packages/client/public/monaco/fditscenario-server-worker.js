"use strict";(()=>{var ql=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ci=d(Kp=>{"use strict";Object.defineProperty(Kp,"__esModule",{value:!0});var Up;function Hp(){if(Up===void 0)throw new Error("No runtime abstraction layer installed");return Up}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Up=r}t.install=e})(Hp||(Hp={}));Kp.default=Hp});var Wp=d(nu=>{"use strict";Object.defineProperty(nu,"__esModule",{value:!0});nu.Disposable=void 0;var jL;(function(t){function e(r){return{dispose:r}}t.create=e})(jL=nu.Disposable||(nu.Disposable={}))});var ba=d(Sa=>{"use strict";Object.defineProperty(Sa,"__esModule",{value:!0});Sa.Emitter=Sa.Event=void 0;var GL=ci(),UL;(function(t){let e={dispose(){}};t.None=function(){return e}})(UL=Sa.Event||(Sa.Event={}));var Bp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,GL.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},lo=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Bp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=lo._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Sa.Emitter=lo;lo._noop=function(){}});var O_=d(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.AbstractMessageBuffer=void 0;var HL=13,KL=10,WL=`\r
`,Vp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case HL:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case KL:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(WL);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),h=l.substr(c+1).trim();o.set(f,h)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};Ml.AbstractMessageBuffer=Vp});var x_=d(Jp=>{"use strict";Object.defineProperty(Jp,"__esModule",{value:!0});var I_=ci(),co=Wp(),BL=ba(),VL=O_(),fo=class extends VL.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return fo.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};fo.emptyBuffer=new Uint8Array(0);var zp=class{constructor(e){this.socket=e,this._onData=new BL.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,I_.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),co.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),co.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),co.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Yp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),co.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),co.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),co.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},zL=new TextEncoder,D_=Object.freeze({messageBuffer:Object.freeze({create:t=>new fo(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(zL.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new zp(t),asWritableStream:t=>new Yp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Xp(){return D_}(function(t){function e(){I_.default.install(D_)}t.install=e})(Xp||(Xp={}));Jp.default=Xp});var po=d(Jt=>{"use strict";Object.defineProperty(Jt,"__esModule",{value:!0});Jt.stringArray=Jt.array=Jt.func=Jt.error=Jt.number=Jt.string=Jt.boolean=void 0;function YL(t){return t===!0||t===!1}Jt.boolean=YL;function L_(t){return typeof t=="string"||t instanceof String}Jt.string=L_;function XL(t){return typeof t=="number"||t instanceof Number}Jt.number=XL;function JL(t){return t instanceof Error}Jt.error=JL;function QL(t){return typeof t=="function"}Jt.func=QL;function q_(t){return Array.isArray(t)}Jt.array=q_;function ZL(t){return q_(t)&&t.every(e=>L_(e))}Jt.stringArray=ZL});var _m=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.Message=J.NotificationType9=J.NotificationType8=J.NotificationType7=J.NotificationType6=J.NotificationType5=J.NotificationType4=J.NotificationType3=J.NotificationType2=J.NotificationType1=J.NotificationType0=J.NotificationType=J.RequestType9=J.RequestType8=J.RequestType7=J.RequestType6=J.RequestType5=J.RequestType4=J.RequestType3=J.RequestType2=J.RequestType1=J.RequestType=J.RequestType0=J.AbstractMessageSignature=J.ParameterStructures=J.ResponseError=J.ErrorCodes=void 0;var Ca=po(),M_;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(M_=J.ErrorCodes||(J.ErrorCodes={}));var iu=class extends Error{constructor(e,r,n){super(r),this.code=Ca.number(e)?e:M_.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,iu.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};J.ResponseError=iu;var It=class{constructor(e){this.kind=e}static is(e){return e===It.auto||e===It.byName||e===It.byPosition}toString(){return this.kind}};J.ParameterStructures=It;It.auto=new It("auto");It.byPosition=new It("byPosition");It.byName=new It("byName");var Be=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return It.auto}};J.AbstractMessageSignature=Be;var Qp=class extends Be{constructor(e){super(e,0)}};J.RequestType0=Qp;var Zp=class extends Be{constructor(e,r=It.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType=Zp;var em=class extends Be{constructor(e,r=It.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType1=em;var tm=class extends Be{constructor(e){super(e,2)}};J.RequestType2=tm;var rm=class extends Be{constructor(e){super(e,3)}};J.RequestType3=rm;var nm=class extends Be{constructor(e){super(e,4)}};J.RequestType4=nm;var im=class extends Be{constructor(e){super(e,5)}};J.RequestType5=im;var am=class extends Be{constructor(e){super(e,6)}};J.RequestType6=am;var om=class extends Be{constructor(e){super(e,7)}};J.RequestType7=om;var sm=class extends Be{constructor(e){super(e,8)}};J.RequestType8=sm;var um=class extends Be{constructor(e){super(e,9)}};J.RequestType9=um;var lm=class extends Be{constructor(e,r=It.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType=lm;var cm=class extends Be{constructor(e){super(e,0)}};J.NotificationType0=cm;var fm=class extends Be{constructor(e,r=It.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType1=fm;var dm=class extends Be{constructor(e){super(e,2)}};J.NotificationType2=dm;var pm=class extends Be{constructor(e){super(e,3)}};J.NotificationType3=pm;var mm=class extends Be{constructor(e){super(e,4)}};J.NotificationType4=mm;var hm=class extends Be{constructor(e){super(e,5)}};J.NotificationType5=hm;var ym=class extends Be{constructor(e){super(e,6)}};J.NotificationType6=ym;var gm=class extends Be{constructor(e){super(e,7)}};J.NotificationType7=gm;var vm=class extends Be{constructor(e){super(e,8)}};J.NotificationType8=vm;var Tm=class extends Be{constructor(e){super(e,9)}};J.NotificationType9=Tm;var eq;(function(t){function e(i){let a=i;return a&&Ca.string(a.method)&&(Ca.string(a.id)||Ca.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Ca.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Ca.string(a.id)||Ca.number(a.id)||a.id===null)}t.isResponse=n})(eq=J.Message||(J.Message={}))});var Am=d(fi=>{"use strict";var F_;Object.defineProperty(fi,"__esModule",{value:!0});fi.LRUCache=fi.LinkedMap=fi.Touch=void 0;var or;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(or=fi.Touch||(fi.Touch={}));var Fl=class{constructor(){this[F_]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=or.None){let n=this._map.get(e);if(n)return r!==or.None&&this.touch(n,r),n.value}set(e,r,n=or.None){let i=this._map.get(e);if(i)i.value=r,n!==or.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case or.None:this.addItemLast(i);break;case or.First:this.addItemFirst(i);break;case or.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(F_=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==or.First&&r!==or.Last)){if(r===or.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===or.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};fi.LinkedMap=Fl;var Rm=class extends Fl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=or.AsNew){return super.get(e,r)}peek(e){return super.get(e,or.None)}set(e,r){return super.set(e,r,or.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};fi.LRUCache=Rm});var Pm=d(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.CancellationTokenSource=Pa.CancellationToken=void 0;var tq=ci(),rq=po(),Sm=ba(),bm;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Sm.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Sm.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||rq.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(bm=Pa.CancellationToken||(Pa.CancellationToken={}));var nq=Object.freeze(function(t,e){let r=(0,tq.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),jl=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?nq:(this._emitter||(this._emitter=new Sm.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Cm=class{get token(){return this._token||(this._token=new jl),this._token}cancel(){this._token?this._token.cancel():this._token=bm.Cancelled}dispose(){this._token?this._token instanceof jl&&this._token.dispose():this._token=bm.None}};Pa.CancellationTokenSource=Cm});var j_=d(di=>{"use strict";Object.defineProperty(di,"__esModule",{value:!0});di.ReadableStreamMessageReader=di.AbstractMessageReader=di.MessageReader=void 0;var Em=ci(),mo=po(),km=ba(),iq;(function(t){function e(r){let n=r;return n&&mo.func(n.listen)&&mo.func(n.dispose)&&mo.func(n.onError)&&mo.func(n.onClose)&&mo.func(n.onPartialMessage)}t.is=e})(iq=di.MessageReader||(di.MessageReader={}));var Gl=class{constructor(){this.errorEmitter=new km.Emitter,this.closeEmitter=new km.Emitter,this.partialMessageEmitter=new km.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${mo.string(e.message)?e.message:"unknown"}`)}};di.AbstractMessageReader=Gl;var wm;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,Em.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(wm||(wm={}));var Nm=class extends Gl{constructor(e,r){super(),this.readable=e,this.options=wm.fromOptions(r),this.buffer=(0,Em.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Em.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};di.ReadableStreamMessageReader=Nm});var G_=d(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.Semaphore=void 0;var aq=ci(),$m=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,aq.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Ul.Semaphore=$m});var W_=d(pi=>{"use strict";Object.defineProperty(pi,"__esModule",{value:!0});pi.WriteableStreamMessageWriter=pi.AbstractMessageWriter=pi.MessageWriter=void 0;var U_=ci(),au=po(),oq=G_(),H_=ba(),sq="Content-Length: ",K_=`\r
`,uq;(function(t){function e(r){let n=r;return n&&au.func(n.dispose)&&au.func(n.onClose)&&au.func(n.onError)&&au.func(n.write)}t.is=e})(uq=pi.MessageWriter||(pi.MessageWriter={}));var Hl=class{constructor(){this.errorEmitter=new H_.Emitter,this.closeEmitter=new H_.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${au.string(e.message)?e.message:"unknown"}`)}};pi.AbstractMessageWriter=Hl;var Om;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,U_.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,U_.default)().applicationJson.encoder}}t.fromOptions=e})(Om||(Om={}));var Im=class extends Hl{constructor(e,r){super(),this.writable=e,this.options=Om.fromOptions(r),this.errorCount=0,this.writeSemaphore=new oq.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(sq,n.byteLength.toString(),K_),i.push(K_),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};pi.WriteableStreamMessageWriter=Im});var J_=d(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.createMessageConnection=te.ConnectionOptions=te.CancellationStrategy=te.CancellationSenderStrategy=te.CancellationReceiverStrategy=te.ConnectionStrategy=te.ConnectionError=te.ConnectionErrors=te.LogTraceNotification=te.SetTraceNotification=te.TraceFormat=te.TraceValues=te.Trace=te.NullLogger=te.ProgressType=te.ProgressToken=void 0;var B_=ci(),Pt=po(),ne=_m(),V_=Am(),ou=ba(),Dm=Pm(),uu;(function(t){t.type=new ne.NotificationType("$/cancelRequest")})(uu||(uu={}));var z_;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(z_=te.ProgressToken||(te.ProgressToken={}));var su;(function(t){t.type=new ne.NotificationType("$/progress")})(su||(su={}));var xm=class{constructor(){}};te.ProgressType=xm;var Lm;(function(t){function e(r){return Pt.func(r)}t.is=e})(Lm||(Lm={}));te.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ne;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ne=te.Trace||(te.Trace={}));var lq;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(lq=te.TraceValues||(te.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ne=te.Trace||(te.Trace={}));var sn;(function(t){t.Text="text",t.JSON="json"})(sn=te.TraceFormat||(te.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(sn=te.TraceFormat||(te.TraceFormat={}));var Y_;(function(t){t.type=new ne.NotificationType("$/setTrace")})(Y_=te.SetTraceNotification||(te.SetTraceNotification={}));var qm;(function(t){t.type=new ne.NotificationType("$/logTrace")})(qm=te.LogTraceNotification||(te.LogTraceNotification={}));var Kl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Kl=te.ConnectionErrors||(te.ConnectionErrors={}));var Mi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Mi.prototype)}};te.ConnectionError=Mi;var X_;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(X_=te.ConnectionStrategy||(te.ConnectionStrategy={}));var Mm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Dm.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(Mm=te.CancellationReceiverStrategy||(te.CancellationReceiverStrategy={}));var Fm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(uu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(Fm=te.CancellationSenderStrategy||(te.CancellationSenderStrategy={}));var jm;(function(t){t.Message=Object.freeze({receiver:Mm.Message,sender:Fm.Message});function e(r){let n=r;return n&&Mm.is(n.receiver)&&Fm.is(n.sender)}t.is=e})(jm=te.CancellationStrategy||(te.CancellationStrategy={}));var cq;(function(t){function e(r){let n=r;return n&&(jm.is(n.cancellationStrategy)||X_.is(n.connectionStrategy))}t.is=e})(cq=te.ConnectionOptions||(te.ConnectionOptions={}));var un;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(un||(un={}));function fq(t,e,r,n){let i=r!==void 0?r:te.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,h=new Map,v=new Map,y,R=new V_.LinkedMap,P=new Map,k=new Set,b=new Map,S=Ne.Off,O=sn.Text,F,W=un.New,re=new ou.Emitter,we=new ou.Emitter,V=new ou.Emitter,Ae=new ou.Emitter,Ye=new ou.Emitter,We=n&&n.cancellationStrategy?n.cancellationStrategy:jm.Message;function q(C){if(C===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+C.toString()}function L(C){return C===null?"res-unknown-"+(++s).toString():"res-"+C.toString()}function j(){return"not-"+(++o).toString()}function B(C,x){ne.Message.isRequest(x)?C.set(q(x.id),x):ne.Message.isResponse(x)?C.set(L(x.id),x):C.set(j(),x)}function oe(C){}function se(){return W===un.Listening}function ee(){return W===un.Closed}function st(){return W===un.Disposed}function Xe(){(W===un.New||W===un.Listening)&&(W=un.Closed,we.fire(void 0))}function Ct(C){re.fire([C,void 0,void 0])}function en(C){re.fire(C)}t.onClose(Xe),t.onError(Ct),e.onClose(Xe),e.onError(en);function Sr(){y||R.size===0||(y=(0,B_.default)().timer.setImmediate(()=>{y=void 0,ro()}))}function ro(){if(R.size===0)return;let C=R.shift();try{ne.Message.isRequest(C)?no(C):ne.Message.isNotification(C)?ao(C):ne.Message.isResponse(C)?io(C):tu(C)}finally{Sr()}}let ar=C=>{try{if(ne.Message.isNotification(C)&&C.method===uu.type.method){let x=C.params.id,G=q(x),z=R.get(G);if(ne.Message.isRequest(z)){let Le=n?.connectionStrategy,Je=Le&&Le.cancelUndispatched?Le.cancelUndispatched(z,oe):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){R.delete(G),b.delete(x),Je.id=z.id,Pn(Je,C.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let xe=b.get(x);if(xe!==void 0){xe.cancel(),kn(C);return}else k.add(x)}B(R,C)}finally{Sr()}};function no(C){if(st())return;function x(ye,je,_e){let ft={jsonrpc:u,id:C.id};ye instanceof ne.ResponseError?ft.error=ye.toJson():ft.result=ye===void 0?null:ye,Pn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function G(ye,je,_e){let ft={jsonrpc:u,id:C.id,error:ye.toJson()};Pn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function z(ye,je,_e){ye===void 0&&(ye=null);let ft={jsonrpc:u,id:C.id,result:ye};Pn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}Ra(C);let xe=c.get(C.method),Le,Je;xe&&(Le=xe.type,Je=xe.handler);let pt=Date.now();if(Je||l){let ye=C.id??String(Date.now()),je=We.receiver.createCancellationTokenSource(ye);C.id!==null&&k.has(C.id)&&je.cancel(),C.id!==null&&b.set(ye,je);try{let _e;if(Je)if(C.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines ${Le.numberOfParams} params but received none.`),C.method,pt);return}_e=Je(je.token)}else if(Array.isArray(C.params)){if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byName){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by name but received parameters by position`),C.method,pt);return}_e=Je(...C.params,je.token)}else{if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byPosition){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by position but received parameters by name`),C.method,pt);return}_e=Je(C.params,je.token)}else l&&(_e=l(C.method,C.params,je.token));let ft=_e;_e?ft.then?ft.then(Xt=>{b.delete(ye),x(Xt,C.method,pt)},Xt=>{b.delete(ye),Xt instanceof ne.ResponseError?G(Xt,C.method,pt):Xt&&Pt.string(Xt.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${Xt.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}):(b.delete(ye),x(_e,C.method,pt)):(b.delete(ye),z(_e,C.method,pt))}catch(_e){b.delete(ye),_e instanceof ne.ResponseError?x(_e,C.method,pt):_e&&Pt.string(_e.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${_e.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}}else G(new ne.ResponseError(ne.ErrorCodes.MethodNotFound,`Unhandled method ${C.method}`),C.method,pt)}function io(C){if(!st())if(C.id===null)C.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(C.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=C.id,G=P.get(x);if(Aa(C,G),G!==void 0){P.delete(x);try{if(C.error){let z=C.error;G.reject(new ne.ResponseError(z.code,z.message,z.data))}else if(C.result!==void 0)G.resolve(C.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function ao(C){if(st())return;let x,G;if(C.method===uu.type.method){let z=C.params.id;k.delete(z),kn(C);return}else{let z=h.get(C.method);z&&(G=z.handler,x=z.type)}if(G||f)try{if(kn(C),G)if(C.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(C.params)){let z=C.params;C.method===su.type.method&&z.length===2&&z_.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines parameters by name but received parameters by position`),x.numberOfParams!==C.params.length&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===ne.ParameterStructures.byPosition&&i.error(`Notification ${C.method} defines parameters by position but received parameters by name`),G(C.params);else f&&f(C.method,C.params)}catch(z){z.message?i.error(`Notification handler '${C.method}' failed with message: ${z.message}`):i.error(`Notification handler '${C.method}' failed unexpectedly.`)}else V.fire(C)}function tu(C){if(!C){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(C,null,4)}`);let x=C;if(Pt.string(x.id)||Pt.number(x.id)){let G=x.id,z=P.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function ct(C){if(C!=null)switch(S){case Ne.Verbose:return JSON.stringify(C,null,4);case Ne.Compact:return JSON.stringify(C);default:return}}function si(C){if(!(S===Ne.Off||!F))if(O===sn.Text){let x;(S===Ne.Verbose||S===Ne.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Sending request '${C.method} - (${C.id})'.`,x)}else Dr("send-request",C)}function ru(C){if(!(S===Ne.Off||!F))if(O===sn.Text){let x;(S===Ne.Verbose||S===Ne.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${C.method}'.`,x)}else Dr("send-notification",C)}function Pn(C,x,G){if(!(S===Ne.Off||!F))if(O===sn.Text){let z;(S===Ne.Verbose||S===Ne.Compact)&&(C.error&&C.error.data?z=`Error data: ${ct(C.error.data)}

`:C.result?z=`Result: ${ct(C.result)}

`:C.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${C.id})'. Processing request took ${Date.now()-G}ms`,z)}else Dr("send-response",C)}function Ra(C){if(!(S===Ne.Off||!F))if(O===sn.Text){let x;(S===Ne.Verbose||S===Ne.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Received request '${C.method} - (${C.id})'.`,x)}else Dr("receive-request",C)}function kn(C){if(!(S===Ne.Off||!F||C.method===qm.type.method))if(O===sn.Text){let x;(S===Ne.Verbose||S===Ne.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${C.method}'.`,x)}else Dr("receive-notification",C)}function Aa(C,x){if(!(S===Ne.Off||!F))if(O===sn.Text){let G;if((S===Ne.Verbose||S===Ne.Compact)&&(C.error&&C.error.data?G=`Error data: ${ct(C.error.data)}

`:C.result?G=`Result: ${ct(C.result)}

`:C.error===void 0&&(G=`No result returned.

`)),x){let z=C.error?` Request failed: ${C.error.message} (${C.error.code}).`:"";F.log(`Received response '${x.method} - (${C.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${C.id} without active response promise.`,G)}else Dr("receive-response",C)}function Dr(C,x){if(!F||S===Ne.Off)return;let G={isLSPMessage:!0,type:C,message:x,timestamp:Date.now()};F.log(G)}function tn(){if(ee())throw new Mi(Kl.Closed,"Connection is closed.");if(st())throw new Mi(Kl.Disposed,"Connection is disposed.")}function oo(){if(se())throw new Mi(Kl.AlreadyListening,"Connection is already listening")}function so(){if(!se())throw new Error("Call listen() first.")}function br(C){return C===void 0?null:C}function En(C){if(C!==null)return C}function Ot(C){return C!=null&&!Array.isArray(C)&&typeof C=="object"}function rn(C,x){switch(C){case ne.ParameterStructures.auto:return Ot(x)?En(x):[br(x)];case ne.ParameterStructures.byName:if(!Ot(x))throw new Error("Received parameters by name but param is not an object literal.");return En(x);case ne.ParameterStructures.byPosition:return[br(x)];default:throw new Error(`Unknown parameter structure ${C.toString()}`)}}function nn(C,x){let G,z=C.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=rn(C.parameterStructures,x[0]);break;default:G=[];for(let xe=0;xe<x.length&&xe<z;xe++)G.push(br(x[xe]));if(x.length<z)for(let xe=x.length;xe<z;xe++)G.push(null);break}return G}let wn={sendNotification:(C,...x)=>{tn();let G,z;if(Pt.string(C)){G=C;let Le=x[0],Je=0,pt=ne.ParameterStructures.auto;ne.ParameterStructures.is(Le)&&(Je=1,pt=Le);let ye=x.length,je=ye-Je;switch(je){case 0:z=void 0;break;case 1:z=rn(pt,x[Je]);break;default:if(pt===ne.ParameterStructures.byName)throw new Error(`Received ${je} parameters for 'by Name' notification parameter structure.`);z=x.slice(Je,ye).map(_e=>br(_e));break}}else{let Le=x;G=C.method,z=nn(C,Le)}let xe={jsonrpc:u,method:G,params:z};return ru(xe),e.write(xe).catch(()=>i.error("Sending notification failed."))},onNotification:(C,x)=>{tn();let G;return Pt.func(C)?f=C:x&&(Pt.string(C)?(G=C,h.set(C,{type:void 0,handler:x})):(G=C.method,h.set(C.method,{type:C,handler:x}))),{dispose:()=>{G!==void 0?h.delete(G):f=void 0}}},onProgress:(C,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(C,x,G)=>wn.sendNotification(su.type,{token:x,value:G}),onUnhandledProgress:Ae.event,sendRequest:(C,...x)=>{tn(),so();let G,z,xe;if(Pt.string(C)){G=C;let ye=x[0],je=x[x.length-1],_e=0,ft=ne.ParameterStructures.auto;ne.ParameterStructures.is(ye)&&(_e=1,ft=ye);let Xt=x.length;Dm.CancellationToken.is(je)&&(Xt=Xt-1,xe=je);let ui=Xt-_e;switch(ui){case 0:z=void 0;break;case 1:z=rn(ft,x[_e]);break;default:if(ft===ne.ParameterStructures.byName)throw new Error(`Received ${ui} parameters for 'by Name' request parameter structure.`);z=x.slice(_e,Xt).map(Nn=>br(Nn));break}}else{let ye=x;G=C.method,z=nn(C,ye);let je=C.numberOfParams;xe=Dm.CancellationToken.is(ye[je])?ye[je]:void 0}let Le=a++,Je;return xe&&(Je=xe.onCancellationRequested(()=>{let ye=We.sender.sendCancellation(wn,Le);return ye===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):ye.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((ye,je)=>{let _e={jsonrpc:u,id:Le,method:G,params:z},ft=Nn=>{ye(Nn),We.sender.cleanup(Le),Je?.dispose()},Xt=Nn=>{je(Nn),We.sender.cleanup(Le),Je?.dispose()},ui={method:G,timerStart:Date.now(),resolve:ft,reject:Xt};si(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch(Nn){ui.reject(new ne.ResponseError(ne.ErrorCodes.MessageWriteError,Nn.message?Nn.message:"Unknown reason")),ui=null}ui&&P.set(Le,ui)})},onRequest:(C,x)=>{tn();let G=null;return Lm.is(C)?(G=void 0,l=C):Pt.string(C)?(G=null,x!==void 0&&(G=C,c.set(C,{handler:x,type:void 0}))):x!==void 0&&(G=C.method,c.set(C.method,{type:C,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>P.size>0,trace:async(C,x,G)=>{let z=!1,xe=sn.Text;G!==void 0&&(Pt.boolean(G)?z=G:(z=G.sendNotification||!1,xe=G.traceFormat||sn.Text)),S=C,O=xe,S===Ne.Off?F=void 0:F=x,z&&!ee()&&!st()&&await wn.sendNotification(Y_.type,{value:Ne.toString(C)})},onError:re.event,onClose:we.event,onUnhandledNotification:V.event,onDispose:Ye.event,end:()=>{e.end()},dispose:()=>{if(st())return;W=un.Disposed,Ye.fire(void 0);let C=new ne.ResponseError(ne.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of P.values())x.reject(C);P=new Map,b=new Map,k=new Set,R=new V_.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{tn(),oo(),W=un.Listening,t.listen(ar)},inspect:()=>{(0,B_.default)().console.log("inspect")}};return wn.onNotification(qm.type,C=>{if(S===Ne.Off||!F)return;let x=S===Ne.Verbose||S===Ne.Compact;F.log(C.message,x?C.verbose:void 0)}),wn.onNotification(su.type,C=>{let x=v.get(C.token);x?x(C.value):Ae.fire(C)}),wn}te.createMessageConnection=fq});var Km=d(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var Ue=_m();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return Ue.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return Ue.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return Ue.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return Ue.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return Ue.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return Ue.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return Ue.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return Ue.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return Ue.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return Ue.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return Ue.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return Ue.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return Ue.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return Ue.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return Ue.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return Ue.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return Ue.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return Ue.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return Ue.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return Ue.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return Ue.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return Ue.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return Ue.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return Ue.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return Ue.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return Ue.ParameterStructures}});var Gm=Am();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return Gm.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return Gm.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return Gm.Touch}});var dq=Wp();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return dq.Disposable}});var Q_=ba();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return Q_.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return Q_.Emitter}});var Z_=Pm();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return Z_.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return Z_.CancellationToken}});var Um=j_();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return Um.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return Um.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Um.ReadableStreamMessageReader}});var Hm=W_();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return Hm.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return Hm.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Hm.WriteableStreamMessageWriter}});var Qt=J_();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return Qt.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return Qt.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return Qt.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return Qt.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return Qt.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return Qt.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return Qt.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return Qt.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return Qt.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return Qt.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return Qt.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return Qt.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return Qt.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return Qt.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return Qt.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return Qt.CancellationStrategy}});var pq=ci();I.RAL=pq.default});var mi=d(Cr=>{"use strict";var mq=Cr&&Cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),hq=Cr&&Cr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&mq(e,t,r)};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.createMessageConnection=Cr.BrowserMessageWriter=Cr.BrowserMessageReader=void 0;var yq=x_();yq.default.install();var ho=Km();hq(Km(),Cr);var Wm=class extends ho.AbstractMessageReader{constructor(e){super(),this._onData=new ho.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Cr.BrowserMessageReader=Wm;var Bm=class extends ho.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Cr.BrowserMessageWriter=Bm;function gq(t,e,r,n){return r===void 0&&(r=ho.NullLogger),ho.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,ho.createMessageConnection)(t,e,r,n)}Cr.createMessageConnection=gq});var Vm=d((Jce,eR)=>{"use strict";eR.exports=mi()});var yo=d((tR,Wl)=>{(function(t){if(typeof Wl=="object"&&typeof Wl.exports=="object"){var e=t(ql,tR);e!==void 0&&(Wl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function E(w){return typeof w=="string"}g.is=E})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function E(w){return typeof w=="string"}g.is=E})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function E(w){return typeof w=="number"&&g.MIN_VALUE<=w&&w<=g.MAX_VALUE}g.is=E})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function E(w){return typeof w=="number"&&g.MIN_VALUE<=w&&w<=g.MAX_VALUE}g.is=E})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function E(_,m){return _===Number.MAX_VALUE&&(_=a.MAX_VALUE),m===Number.MAX_VALUE&&(m=a.MAX_VALUE),{line:_,character:m}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&N.uinteger(m.line)&&N.uinteger(m.character)}g.is=w})(o=e.Position||(e.Position={}));var s;(function(g){function E(_,m,$,D){if(N.uinteger(_)&&N.uinteger(m)&&N.uinteger($)&&N.uinteger(D))return{start:o.create(_,m),end:o.create($,D)};if(o.is(_)&&o.is(m))return{start:_,end:m};throw new Error("Range#create called with invalid arguments[".concat(_,", ").concat(m,", ").concat($,", ").concat(D,"]"))}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&o.is(m.start)&&o.is(m.end)}g.is=w})(s=e.Range||(e.Range={}));var u;(function(g){function E(_,m){return{uri:_,range:m}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&s.is(m.range)&&(N.string(m.uri)||N.undefined(m.uri))}g.is=w})(u=e.Location||(e.Location={}));var l;(function(g){function E(_,m,$,D){return{targetUri:_,targetRange:m,targetSelectionRange:$,originSelectionRange:D}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&s.is(m.targetRange)&&N.string(m.targetUri)&&s.is(m.targetSelectionRange)&&(s.is(m.originSelectionRange)||N.undefined(m.originSelectionRange))}g.is=w})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function E(_,m,$,D){return{red:_,green:m,blue:$,alpha:D}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&N.numberRange(m.red,0,1)&&N.numberRange(m.green,0,1)&&N.numberRange(m.blue,0,1)&&N.numberRange(m.alpha,0,1)}g.is=w})(c=e.Color||(e.Color={}));var f;(function(g){function E(_,m){return{range:_,color:m}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&s.is(m.range)&&c.is(m.color)}g.is=w})(f=e.ColorInformation||(e.ColorInformation={}));var h;(function(g){function E(_,m,$){return{label:_,textEdit:m,additionalTextEdits:$}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&N.string(m.label)&&(N.undefined(m.textEdit)||F.is(m))&&(N.undefined(m.additionalTextEdits)||N.typedArray(m.additionalTextEdits,F.is))}g.is=w})(h=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function E(_,m,$,D,ae,ut){var Ge={startLine:_,endLine:m};return N.defined($)&&(Ge.startCharacter=$),N.defined(D)&&(Ge.endCharacter=D),N.defined(ae)&&(Ge.kind=ae),N.defined(ut)&&(Ge.collapsedText=ut),Ge}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&N.uinteger(m.startLine)&&N.uinteger(m.startLine)&&(N.undefined(m.startCharacter)||N.uinteger(m.startCharacter))&&(N.undefined(m.endCharacter)||N.uinteger(m.endCharacter))&&(N.undefined(m.kind)||N.string(m.kind))}g.is=w})(y=e.FoldingRange||(e.FoldingRange={}));var R;(function(g){function E(_,m){return{location:_,message:m}}g.create=E;function w(_){var m=_;return N.defined(m)&&u.is(m.location)&&N.string(m.message)}g.is=w})(R=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var P;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(P=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var k;(function(g){g.Unnecessary=1,g.Deprecated=2})(k=e.DiagnosticTag||(e.DiagnosticTag={}));var b;(function(g){function E(w){var _=w;return N.objectLiteral(_)&&N.string(_.href)}g.is=E})(b=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function E(_,m,$,D,ae,ut){var Ge={range:_,message:m};return N.defined($)&&(Ge.severity=$),N.defined(D)&&(Ge.code=D),N.defined(ae)&&(Ge.source=ae),N.defined(ut)&&(Ge.relatedInformation=ut),Ge}g.create=E;function w(_){var m,$=_;return N.defined($)&&s.is($.range)&&N.string($.message)&&(N.number($.severity)||N.undefined($.severity))&&(N.integer($.code)||N.string($.code)||N.undefined($.code))&&(N.undefined($.codeDescription)||N.string((m=$.codeDescription)===null||m===void 0?void 0:m.href))&&(N.string($.source)||N.undefined($.source))&&(N.undefined($.relatedInformation)||N.typedArray($.relatedInformation,R.is))}g.is=w})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function E(_,m){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ae={title:_,command:m};return N.defined($)&&$.length>0&&(ae.arguments=$),ae}g.create=E;function w(_){var m=_;return N.defined(m)&&N.string(m.title)&&N.string(m.command)}g.is=w})(O=e.Command||(e.Command={}));var F;(function(g){function E($,D){return{range:$,newText:D}}g.replace=E;function w($,D){return{range:{start:$,end:$},newText:D}}g.insert=w;function _($){return{range:$,newText:""}}g.del=_;function m($){var D=$;return N.objectLiteral(D)&&N.string(D.newText)&&s.is(D.range)}g.is=m})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function E(_,m,$){var D={label:_};return m!==void 0&&(D.needsConfirmation=m),$!==void 0&&(D.description=$),D}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&N.string(m.label)&&(N.boolean(m.needsConfirmation)||m.needsConfirmation===void 0)&&(N.string(m.description)||m.description===void 0)}g.is=w})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var re;(function(g){function E(w){var _=w;return N.string(_)}g.is=E})(re=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var we;(function(g){function E($,D,ae){return{range:$,newText:D,annotationId:ae}}g.replace=E;function w($,D,ae){return{range:{start:$,end:$},newText:D,annotationId:ae}}g.insert=w;function _($,D){return{range:$,newText:"",annotationId:D}}g.del=_;function m($){var D=$;return F.is(D)&&(W.is(D.annotationId)||re.is(D.annotationId))}g.is=m})(we=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var V;(function(g){function E(_,m){return{textDocument:_,edits:m}}g.create=E;function w(_){var m=_;return N.defined(m)&&ee.is(m.textDocument)&&Array.isArray(m.edits)}g.is=w})(V=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Ae;(function(g){function E(_,m,$){var D={kind:"create",uri:_};return m!==void 0&&(m.overwrite!==void 0||m.ignoreIfExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=E;function w(_){var m=_;return m&&m.kind==="create"&&N.string(m.uri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||re.is(m.annotationId))}g.is=w})(Ae=e.CreateFile||(e.CreateFile={}));var Ye;(function(g){function E(_,m,$,D){var ae={kind:"rename",oldUri:_,newUri:m};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ae.options=$),D!==void 0&&(ae.annotationId=D),ae}g.create=E;function w(_){var m=_;return m&&m.kind==="rename"&&N.string(m.oldUri)&&N.string(m.newUri)&&(m.options===void 0||(m.options.overwrite===void 0||N.boolean(m.options.overwrite))&&(m.options.ignoreIfExists===void 0||N.boolean(m.options.ignoreIfExists)))&&(m.annotationId===void 0||re.is(m.annotationId))}g.is=w})(Ye=e.RenameFile||(e.RenameFile={}));var We;(function(g){function E(_,m,$){var D={kind:"delete",uri:_};return m!==void 0&&(m.recursive!==void 0||m.ignoreIfNotExists!==void 0)&&(D.options=m),$!==void 0&&(D.annotationId=$),D}g.create=E;function w(_){var m=_;return m&&m.kind==="delete"&&N.string(m.uri)&&(m.options===void 0||(m.options.recursive===void 0||N.boolean(m.options.recursive))&&(m.options.ignoreIfNotExists===void 0||N.boolean(m.options.ignoreIfNotExists)))&&(m.annotationId===void 0||re.is(m.annotationId))}g.is=w})(We=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function E(w){var _=w;return _&&(_.changes!==void 0||_.documentChanges!==void 0)&&(_.documentChanges===void 0||_.documentChanges.every(function(m){return N.string(m.kind)?Ae.is(m)||Ye.is(m)||We.is(m):V.is(m)}))}g.is=E})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(E,w){this.edits=E,this.changeAnnotations=w}return g.prototype.insert=function(E,w,_){var m,$;if(_===void 0?m=F.insert(E,w):re.is(_)?($=_,m=we.insert(E,w,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),m=we.insert(E,w,$)),this.edits.push(m),$!==void 0)return $},g.prototype.replace=function(E,w,_){var m,$;if(_===void 0?m=F.replace(E,w):re.is(_)?($=_,m=we.replace(E,w,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),m=we.replace(E,w,$)),this.edits.push(m),$!==void 0)return $},g.prototype.delete=function(E,w){var _,m;if(w===void 0?_=F.del(E):re.is(w)?(m=w,_=we.del(E,w)):(this.assertChangeAnnotations(this.changeAnnotations),m=this.changeAnnotations.manage(w),_=we.del(E,m)),this.edits.push(_),m!==void 0)return m},g.prototype.add=function(E){this.edits.push(E)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(E){if(E===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(E){this._annotations=E===void 0?Object.create(null):E,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(E,w){var _;if(re.is(E)?_=E:(_=this.nextId(),w=E),this._annotations[_]!==void 0)throw new Error("Id ".concat(_," is already in use."));if(w===void 0)throw new Error("No annotation provided for id ".concat(_));return this._annotations[_]=w,this._size++,_},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(E){var w=this;this._textEditChanges=Object.create(null),E!==void 0?(this._workspaceEdit=E,E.documentChanges?(this._changeAnnotations=new j(E.changeAnnotations),E.changeAnnotations=this._changeAnnotations.all(),E.documentChanges.forEach(function(_){if(V.is(_)){var m=new L(_.edits,w._changeAnnotations);w._textEditChanges[_.textDocument.uri]=m}})):E.changes&&Object.keys(E.changes).forEach(function(_){var m=new L(E.changes[_]);w._textEditChanges[_]=m})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(E){if(ee.is(E)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var w={uri:E.uri,version:E.version},_=this._textEditChanges[w.uri];if(!_){var m=[],$={textDocument:w,edits:m};this._workspaceEdit.documentChanges.push($),_=new L(m,this._changeAnnotations),this._textEditChanges[w.uri]=_}return _}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var _=this._textEditChanges[E];if(!_){var m=[];this._workspaceEdit.changes[E]=m,_=new L(m),this._textEditChanges[E]=_}return _}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(E,w,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(w)||re.is(w)?m=w:_=w;var $,D;if(m===void 0?$=Ae.create(E,_):(D=re.is(m)?m:this._changeAnnotations.manage(m),$=Ae.create(E,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(E,w,_,m){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(_)||re.is(_)?$=_:m=_;var D,ae;if($===void 0?D=Ye.create(E,w,m):(ae=re.is($)?$:this._changeAnnotations.manage($),D=Ye.create(E,w,m,ae)),this._workspaceEdit.documentChanges.push(D),ae!==void 0)return ae},g.prototype.deleteFile=function(E,w,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var m;W.is(w)||re.is(w)?m=w:_=w;var $,D;if(m===void 0?$=We.create(E,_):(D=re.is(m)?m:this._changeAnnotations.manage(m),$=We.create(E,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var oe;(function(g){function E(_){return{uri:_}}g.create=E;function w(_){var m=_;return N.defined(m)&&N.string(m.uri)}g.is=w})(oe=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var se;(function(g){function E(_,m){return{uri:_,version:m}}g.create=E;function w(_){var m=_;return N.defined(m)&&N.string(m.uri)&&N.integer(m.version)}g.is=w})(se=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ee;(function(g){function E(_,m){return{uri:_,version:m}}g.create=E;function w(_){var m=_;return N.defined(m)&&N.string(m.uri)&&(m.version===null||N.integer(m.version))}g.is=w})(ee=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var st;(function(g){function E(_,m,$,D){return{uri:_,languageId:m,version:$,text:D}}g.create=E;function w(_){var m=_;return N.defined(m)&&N.string(m.uri)&&N.string(m.languageId)&&N.integer(m.version)&&N.string(m.text)}g.is=w})(st=e.TextDocumentItem||(e.TextDocumentItem={}));var Xe;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function E(w){var _=w;return _===g.PlainText||_===g.Markdown}g.is=E})(Xe=e.MarkupKind||(e.MarkupKind={}));var Ct;(function(g){function E(w){var _=w;return N.objectLiteral(w)&&Xe.is(_.kind)&&N.string(_.value)}g.is=E})(Ct=e.MarkupContent||(e.MarkupContent={}));var en;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(en=e.CompletionItemKind||(e.CompletionItemKind={}));var Sr;(function(g){g.PlainText=1,g.Snippet=2})(Sr=e.InsertTextFormat||(e.InsertTextFormat={}));var ro;(function(g){g.Deprecated=1})(ro=e.CompletionItemTag||(e.CompletionItemTag={}));var ar;(function(g){function E(_,m,$){return{newText:_,insert:m,replace:$}}g.create=E;function w(_){var m=_;return m&&N.string(m.newText)&&s.is(m.insert)&&s.is(m.replace)}g.is=w})(ar=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var no;(function(g){g.asIs=1,g.adjustIndentation=2})(no=e.InsertTextMode||(e.InsertTextMode={}));var io;(function(g){function E(w){var _=w;return _&&(N.string(_.detail)||_.detail===void 0)&&(N.string(_.description)||_.description===void 0)}g.is=E})(io=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var ao;(function(g){function E(w){return{label:w}}g.create=E})(ao=e.CompletionItem||(e.CompletionItem={}));var tu;(function(g){function E(w,_){return{items:w||[],isIncomplete:!!_}}g.create=E})(tu=e.CompletionList||(e.CompletionList={}));var ct;(function(g){function E(_){return _.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=E;function w(_){var m=_;return N.string(m)||N.objectLiteral(m)&&N.string(m.language)&&N.string(m.value)}g.is=w})(ct=e.MarkedString||(e.MarkedString={}));var si;(function(g){function E(w){var _=w;return!!_&&N.objectLiteral(_)&&(Ct.is(_.contents)||ct.is(_.contents)||N.typedArray(_.contents,ct.is))&&(w.range===void 0||s.is(w.range))}g.is=E})(si=e.Hover||(e.Hover={}));var ru;(function(g){function E(w,_){return _?{label:w,documentation:_}:{label:w}}g.create=E})(ru=e.ParameterInformation||(e.ParameterInformation={}));var Pn;(function(g){function E(w,_){for(var m=[],$=2;$<arguments.length;$++)m[$-2]=arguments[$];var D={label:w};return N.defined(_)&&(D.documentation=_),N.defined(m)?D.parameters=m:D.parameters=[],D}g.create=E})(Pn=e.SignatureInformation||(e.SignatureInformation={}));var Ra;(function(g){g.Text=1,g.Read=2,g.Write=3})(Ra=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var kn;(function(g){function E(w,_){var m={range:w};return N.number(_)&&(m.kind=_),m}g.create=E})(kn=e.DocumentHighlight||(e.DocumentHighlight={}));var Aa;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(Aa=e.SymbolKind||(e.SymbolKind={}));var Dr;(function(g){g.Deprecated=1})(Dr=e.SymbolTag||(e.SymbolTag={}));var tn;(function(g){function E(w,_,m,$,D){var ae={name:w,kind:_,location:{uri:$,range:m}};return D&&(ae.containerName=D),ae}g.create=E})(tn=e.SymbolInformation||(e.SymbolInformation={}));var oo;(function(g){function E(w,_,m,$){return $!==void 0?{name:w,kind:_,location:{uri:m,range:$}}:{name:w,kind:_,location:{uri:m}}}g.create=E})(oo=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var so;(function(g){function E(_,m,$,D,ae,ut){var Ge={name:_,detail:m,kind:$,range:D,selectionRange:ae};return ut!==void 0&&(Ge.children=ut),Ge}g.create=E;function w(_){var m=_;return m&&N.string(m.name)&&N.number(m.kind)&&s.is(m.range)&&s.is(m.selectionRange)&&(m.detail===void 0||N.string(m.detail))&&(m.deprecated===void 0||N.boolean(m.deprecated))&&(m.children===void 0||Array.isArray(m.children))&&(m.tags===void 0||Array.isArray(m.tags))}g.is=w})(so=e.DocumentSymbol||(e.DocumentSymbol={}));var br;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(br=e.CodeActionKind||(e.CodeActionKind={}));var En;(function(g){g.Invoked=1,g.Automatic=2})(En=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var Ot;(function(g){function E(_,m,$){var D={diagnostics:_};return m!=null&&(D.only=m),$!=null&&(D.triggerKind=$),D}g.create=E;function w(_){var m=_;return N.defined(m)&&N.typedArray(m.diagnostics,S.is)&&(m.only===void 0||N.typedArray(m.only,N.string))&&(m.triggerKind===void 0||m.triggerKind===En.Invoked||m.triggerKind===En.Automatic)}g.is=w})(Ot=e.CodeActionContext||(e.CodeActionContext={}));var rn;(function(g){function E(_,m,$){var D={title:_},ae=!0;return typeof m=="string"?(ae=!1,D.kind=m):O.is(m)?D.command=m:D.edit=m,ae&&$!==void 0&&(D.kind=$),D}g.create=E;function w(_){var m=_;return m&&N.string(m.title)&&(m.diagnostics===void 0||N.typedArray(m.diagnostics,S.is))&&(m.kind===void 0||N.string(m.kind))&&(m.edit!==void 0||m.command!==void 0)&&(m.command===void 0||O.is(m.command))&&(m.isPreferred===void 0||N.boolean(m.isPreferred))&&(m.edit===void 0||q.is(m.edit))}g.is=w})(rn=e.CodeAction||(e.CodeAction={}));var nn;(function(g){function E(_,m){var $={range:_};return N.defined(m)&&($.data=m),$}g.create=E;function w(_){var m=_;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.command)||O.is(m.command))}g.is=w})(nn=e.CodeLens||(e.CodeLens={}));var wn;(function(g){function E(_,m){return{tabSize:_,insertSpaces:m}}g.create=E;function w(_){var m=_;return N.defined(m)&&N.uinteger(m.tabSize)&&N.boolean(m.insertSpaces)}g.is=w})(wn=e.FormattingOptions||(e.FormattingOptions={}));var C;(function(g){function E(_,m,$){return{range:_,target:m,data:$}}g.create=E;function w(_){var m=_;return N.defined(m)&&s.is(m.range)&&(N.undefined(m.target)||N.string(m.target))}g.is=w})(C=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function E(_,m){return{range:_,parent:m}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&s.is(m.range)&&(m.parent===void 0||g.is(m.parent))}g.is=w})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var xe;(function(g){function E(w){var _=w;return N.objectLiteral(_)&&(_.resultId===void 0||typeof _.resultId=="string")&&Array.isArray(_.data)&&(_.data.length===0||typeof _.data[0]=="number")}g.is=E})(xe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(g){function E(_,m){return{range:_,text:m}}g.create=E;function w(_){var m=_;return m!=null&&s.is(m.range)&&N.string(m.text)}g.is=w})(Le=e.InlineValueText||(e.InlineValueText={}));var Je;(function(g){function E(_,m,$){return{range:_,variableName:m,caseSensitiveLookup:$}}g.create=E;function w(_){var m=_;return m!=null&&s.is(m.range)&&N.boolean(m.caseSensitiveLookup)&&(N.string(m.variableName)||m.variableName===void 0)}g.is=w})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var pt;(function(g){function E(_,m){return{range:_,expression:m}}g.create=E;function w(_){var m=_;return m!=null&&s.is(m.range)&&(N.string(m.expression)||m.expression===void 0)}g.is=w})(pt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ye;(function(g){function E(_,m){return{frameId:_,stoppedLocation:m}}g.create=E;function w(_){var m=_;return N.defined(m)&&s.is(_.stoppedLocation)}g.is=w})(ye=e.InlineValueContext||(e.InlineValueContext={}));var je;(function(g){g.Type=1,g.Parameter=2;function E(w){return w===1||w===2}g.is=E})(je=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function E(_){return{value:_}}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&(m.tooltip===void 0||N.string(m.tooltip)||Ct.is(m.tooltip))&&(m.location===void 0||u.is(m.location))&&(m.command===void 0||O.is(m.command))}g.is=w})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ft;(function(g){function E(_,m,$){var D={position:_,label:m};return $!==void 0&&(D.kind=$),D}g.create=E;function w(_){var m=_;return N.objectLiteral(m)&&o.is(m.position)&&(N.string(m.label)||N.typedArray(m.label,_e.is))&&(m.kind===void 0||je.is(m.kind))&&m.textEdits===void 0||N.typedArray(m.textEdits,F.is)&&(m.tooltip===void 0||N.string(m.tooltip)||Ct.is(m.tooltip))&&(m.paddingLeft===void 0||N.boolean(m.paddingLeft))&&(m.paddingRight===void 0||N.boolean(m.paddingRight))}g.is=w})(ft=e.InlayHint||(e.InlayHint={}));var Xt;(function(g){function E(w){var _=w;return N.objectLiteral(_)&&n.is(_.uri)&&N.string(_.name)}g.is=E})(Xt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var ui;(function(g){function E($,D,ae,ut){return new Nn($,D,ae,ut)}g.create=E;function w($){var D=$;return!!(N.defined(D)&&N.string(D.uri)&&(N.undefined(D.languageId)||N.string(D.languageId))&&N.uinteger(D.lineCount)&&N.func(D.getText)&&N.func(D.positionAt)&&N.func(D.offsetAt))}g.is=w;function _($,D){for(var ae=$.getText(),ut=m(D,function(uo,Ll){var $_=uo.range.start.line-Ll.range.start.line;return $_===0?uo.range.start.character-Ll.range.start.character:$_}),Ge=ae.length,an=ut.length-1;an>=0;an--){var on=ut[an],li=$.offsetAt(on.range.start),ge=$.offsetAt(on.range.end);if(ge<=Ge)ae=ae.substring(0,li)+on.newText+ae.substring(ge,ae.length);else throw new Error("Overlapping edit");Ge=li}return ae}g.applyEdits=_;function m($,D){if($.length<=1)return $;var ae=$.length/2|0,ut=$.slice(0,ae),Ge=$.slice(ae);m(ut,D),m(Ge,D);for(var an=0,on=0,li=0;an<ut.length&&on<Ge.length;){var ge=D(ut[an],Ge[on]);ge<=0?$[li++]=ut[an++]:$[li++]=Ge[on++]}for(;an<ut.length;)$[li++]=ut[an++];for(;on<Ge.length;)$[li++]=Ge[on++];return $}})(ui=e.TextDocument||(e.TextDocument={}));var Nn=function(){function g(E,w,_,m){this._uri=E,this._languageId=w,this._version=_,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(E){if(E){var w=this.offsetAt(E.start),_=this.offsetAt(E.end);return this._content.substring(w,_)}return this._content},g.prototype.update=function(E,w){this._content=E.text,this._version=w,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var E=[],w=this._content,_=!0,m=0;m<w.length;m++){_&&(E.push(m),_=!1);var $=w.charAt(m);_=$==="\r"||$===`
`,$==="\r"&&m+1<w.length&&w.charAt(m+1)===`
`&&m++}_&&w.length>0&&E.push(w.length),this._lineOffsets=E}return this._lineOffsets},g.prototype.positionAt=function(E){E=Math.max(Math.min(E,this._content.length),0);var w=this.getLineOffsets(),_=0,m=w.length;if(m===0)return o.create(0,E);for(;_<m;){var $=Math.floor((_+m)/2);w[$]>E?m=$:_=$+1}var D=_-1;return o.create(D,E-w[D])},g.prototype.offsetAt=function(E){var w=this.getLineOffsets();if(E.line>=w.length)return this._content.length;if(E.line<0)return 0;var _=w[E.line],m=E.line+1<w.length?w[E.line+1]:this._content.length;return Math.max(Math.min(_+E.character,m),_)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),N;(function(g){var E=Object.prototype.toString;function w(ge){return typeof ge<"u"}g.defined=w;function _(ge){return typeof ge>"u"}g.undefined=_;function m(ge){return ge===!0||ge===!1}g.boolean=m;function $(ge){return E.call(ge)==="[object String]"}g.string=$;function D(ge){return E.call(ge)==="[object Number]"}g.number=D;function ae(ge,uo,Ll){return E.call(ge)==="[object Number]"&&uo<=ge&&ge<=Ll}g.numberRange=ae;function ut(ge){return E.call(ge)==="[object Number]"&&-2147483648<=ge&&ge<=2147483647}g.integer=ut;function Ge(ge){return E.call(ge)==="[object Number]"&&0<=ge&&ge<=2147483647}g.uinteger=Ge;function an(ge){return E.call(ge)==="[object Function]"}g.func=an;function on(ge){return ge!==null&&typeof ge=="object"}g.objectLiteral=on;function li(ge,uo){return Array.isArray(ge)&&ge.every(uo)}g.typedArray=li})(N||(N={}))})});var at=d(sr=>{"use strict";Object.defineProperty(sr,"__esModule",{value:!0});sr.ProtocolNotificationType=sr.ProtocolNotificationType0=sr.ProtocolRequestType=sr.ProtocolRequestType0=sr.RegistrationType=sr.MessageDirection=void 0;var go=mi(),vq;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(vq=sr.MessageDirection||(sr.MessageDirection={}));var zm=class{constructor(e){this.method=e}};sr.RegistrationType=zm;var Ym=class extends go.RequestType0{constructor(e){super(e)}};sr.ProtocolRequestType0=Ym;var Xm=class extends go.RequestType{constructor(e){super(e,go.ParameterStructures.byName)}};sr.ProtocolRequestType=Xm;var Jm=class extends go.NotificationType0{constructor(e){super(e)}};sr.ProtocolNotificationType0=Jm;var Qm=class extends go.NotificationType{constructor(e){super(e,go.ParameterStructures.byName)}};sr.ProtocolNotificationType=Qm});var Bl=d(mt=>{"use strict";Object.defineProperty(mt,"__esModule",{value:!0});mt.objectLiteral=mt.typedArray=mt.stringArray=mt.array=mt.func=mt.error=mt.number=mt.string=mt.boolean=void 0;function Tq(t){return t===!0||t===!1}mt.boolean=Tq;function rR(t){return typeof t=="string"||t instanceof String}mt.string=rR;function _q(t){return typeof t=="number"||t instanceof Number}mt.number=_q;function Rq(t){return t instanceof Error}mt.error=Rq;function Aq(t){return typeof t=="function"}mt.func=Aq;function nR(t){return Array.isArray(t)}mt.array=nR;function Sq(t){return nR(t)&&t.every(e=>rR(e))}mt.stringArray=Sq;function bq(t,e){return Array.isArray(t)&&t.every(e)}mt.typedArray=bq;function Cq(t){return t!==null&&typeof t=="object"}mt.objectLiteral=Cq});var aR=d(lu=>{"use strict";Object.defineProperty(lu,"__esModule",{value:!0});lu.ImplementationRequest=void 0;var iR=at(),Pq;(function(t){t.method="textDocument/implementation",t.messageDirection=iR.MessageDirection.clientToServer,t.type=new iR.ProtocolRequestType(t.method)})(Pq=lu.ImplementationRequest||(lu.ImplementationRequest={}))});var sR=d(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.TypeDefinitionRequest=void 0;var oR=at(),kq;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=oR.MessageDirection.clientToServer,t.type=new oR.ProtocolRequestType(t.method)})(kq=cu.TypeDefinitionRequest||(cu.TypeDefinitionRequest={}))});var uR=d(Fi=>{"use strict";Object.defineProperty(Fi,"__esModule",{value:!0});Fi.DidChangeWorkspaceFoldersNotification=Fi.WorkspaceFoldersRequest=void 0;var Vl=at(),Eq;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Vl.MessageDirection.serverToClient,t.type=new Vl.ProtocolRequestType0(t.method)})(Eq=Fi.WorkspaceFoldersRequest||(Fi.WorkspaceFoldersRequest={}));var wq;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Vl.MessageDirection.clientToServer,t.type=new Vl.ProtocolNotificationType(t.method)})(wq=Fi.DidChangeWorkspaceFoldersNotification||(Fi.DidChangeWorkspaceFoldersNotification={}))});var cR=d(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.ConfigurationRequest=void 0;var lR=at(),Nq;(function(t){t.method="workspace/configuration",t.messageDirection=lR.MessageDirection.serverToClient,t.type=new lR.ProtocolRequestType(t.method)})(Nq=fu.ConfigurationRequest||(fu.ConfigurationRequest={}))});var fR=d(ji=>{"use strict";Object.defineProperty(ji,"__esModule",{value:!0});ji.ColorPresentationRequest=ji.DocumentColorRequest=void 0;var zl=at(),$q;(function(t){t.method="textDocument/documentColor",t.messageDirection=zl.MessageDirection.clientToServer,t.type=new zl.ProtocolRequestType(t.method)})($q=ji.DocumentColorRequest||(ji.DocumentColorRequest={}));var Oq;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=zl.MessageDirection.clientToServer,t.type=new zl.ProtocolRequestType(t.method)})(Oq=ji.ColorPresentationRequest||(ji.ColorPresentationRequest={}))});var pR=d(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.FoldingRangeRequest=void 0;var dR=at(),Iq;(function(t){t.method="textDocument/foldingRange",t.messageDirection=dR.MessageDirection.clientToServer,t.type=new dR.ProtocolRequestType(t.method)})(Iq=du.FoldingRangeRequest||(du.FoldingRangeRequest={}))});var hR=d(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.DeclarationRequest=void 0;var mR=at(),Dq;(function(t){t.method="textDocument/declaration",t.messageDirection=mR.MessageDirection.clientToServer,t.type=new mR.ProtocolRequestType(t.method)})(Dq=pu.DeclarationRequest||(pu.DeclarationRequest={}))});var gR=d(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.SelectionRangeRequest=void 0;var yR=at(),xq;(function(t){t.method="textDocument/selectionRange",t.messageDirection=yR.MessageDirection.clientToServer,t.type=new yR.ProtocolRequestType(t.method)})(xq=mu.SelectionRangeRequest||(mu.SelectionRangeRequest={}))});var vR=d(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.WorkDoneProgressCancelNotification=ln.WorkDoneProgressCreateRequest=ln.WorkDoneProgress=void 0;var Lq=mi(),Yl=at(),qq;(function(t){t.type=new Lq.ProgressType;function e(r){return r===t.type}t.is=e})(qq=ln.WorkDoneProgress||(ln.WorkDoneProgress={}));var Mq;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Yl.MessageDirection.serverToClient,t.type=new Yl.ProtocolRequestType(t.method)})(Mq=ln.WorkDoneProgressCreateRequest||(ln.WorkDoneProgressCreateRequest={}));var Fq;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Yl.MessageDirection.clientToServer,t.type=new Yl.ProtocolNotificationType(t.method)})(Fq=ln.WorkDoneProgressCancelNotification||(ln.WorkDoneProgressCancelNotification={}))});var TR=d(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.CallHierarchyOutgoingCallsRequest=cn.CallHierarchyIncomingCallsRequest=cn.CallHierarchyPrepareRequest=void 0;var vo=at(),jq;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=vo.MessageDirection.clientToServer,t.type=new vo.ProtocolRequestType(t.method)})(jq=cn.CallHierarchyPrepareRequest||(cn.CallHierarchyPrepareRequest={}));var Gq;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=vo.MessageDirection.clientToServer,t.type=new vo.ProtocolRequestType(t.method)})(Gq=cn.CallHierarchyIncomingCallsRequest||(cn.CallHierarchyIncomingCallsRequest={}));var Uq;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=vo.MessageDirection.clientToServer,t.type=new vo.ProtocolRequestType(t.method)})(Uq=cn.CallHierarchyOutgoingCallsRequest||(cn.CallHierarchyOutgoingCallsRequest={}))});var _R=d(ht=>{"use strict";Object.defineProperty(ht,"__esModule",{value:!0});ht.SemanticTokensRefreshRequest=ht.SemanticTokensRangeRequest=ht.SemanticTokensDeltaRequest=ht.SemanticTokensRequest=ht.SemanticTokensRegistrationType=ht.TokenFormat=void 0;var hi=at(),Hq;(function(t){t.Relative="relative"})(Hq=ht.TokenFormat||(ht.TokenFormat={}));var Xl;(function(t){t.method="textDocument/semanticTokens",t.type=new hi.RegistrationType(t.method)})(Xl=ht.SemanticTokensRegistrationType||(ht.SemanticTokensRegistrationType={}));var Kq;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=hi.MessageDirection.clientToServer,t.type=new hi.ProtocolRequestType(t.method),t.registrationMethod=Xl.method})(Kq=ht.SemanticTokensRequest||(ht.SemanticTokensRequest={}));var Wq;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=hi.MessageDirection.clientToServer,t.type=new hi.ProtocolRequestType(t.method),t.registrationMethod=Xl.method})(Wq=ht.SemanticTokensDeltaRequest||(ht.SemanticTokensDeltaRequest={}));var Bq;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=hi.MessageDirection.clientToServer,t.type=new hi.ProtocolRequestType(t.method),t.registrationMethod=Xl.method})(Bq=ht.SemanticTokensRangeRequest||(ht.SemanticTokensRangeRequest={}));var Vq;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=hi.MessageDirection.clientToServer,t.type=new hi.ProtocolRequestType0(t.method)})(Vq=ht.SemanticTokensRefreshRequest||(ht.SemanticTokensRefreshRequest={}))});var AR=d(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.ShowDocumentRequest=void 0;var RR=at(),zq;(function(t){t.method="window/showDocument",t.messageDirection=RR.MessageDirection.serverToClient,t.type=new RR.ProtocolRequestType(t.method)})(zq=hu.ShowDocumentRequest||(hu.ShowDocumentRequest={}))});var bR=d(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.LinkedEditingRangeRequest=void 0;var SR=at(),Yq;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=SR.MessageDirection.clientToServer,t.type=new SR.ProtocolRequestType(t.method)})(Yq=yu.LinkedEditingRangeRequest||(yu.LinkedEditingRangeRequest={}))});var CR=d(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var xr=at(),Xq;(function(t){t.file="file",t.folder="folder"})(Xq=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var Jq;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(Jq=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var Qq;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(Qq=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var Zq;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(Zq=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var eM;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(eM=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var tM;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(tM=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var rM;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(rM=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var kR=d(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.MonikerRequest=fn.MonikerKind=fn.UniquenessLevel=void 0;var PR=at(),nM;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(nM=fn.UniquenessLevel||(fn.UniquenessLevel={}));var iM;(function(t){t.$import="import",t.$export="export",t.local="local"})(iM=fn.MonikerKind||(fn.MonikerKind={}));var aM;(function(t){t.method="textDocument/moniker",t.messageDirection=PR.MessageDirection.clientToServer,t.type=new PR.ProtocolRequestType(t.method)})(aM=fn.MonikerRequest||(fn.MonikerRequest={}))});var ER=d(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.TypeHierarchySubtypesRequest=dn.TypeHierarchySupertypesRequest=dn.TypeHierarchyPrepareRequest=void 0;var To=at(),oM;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=To.MessageDirection.clientToServer,t.type=new To.ProtocolRequestType(t.method)})(oM=dn.TypeHierarchyPrepareRequest||(dn.TypeHierarchyPrepareRequest={}));var sM;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=To.MessageDirection.clientToServer,t.type=new To.ProtocolRequestType(t.method)})(sM=dn.TypeHierarchySupertypesRequest||(dn.TypeHierarchySupertypesRequest={}));var uM;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=To.MessageDirection.clientToServer,t.type=new To.ProtocolRequestType(t.method)})(uM=dn.TypeHierarchySubtypesRequest||(dn.TypeHierarchySubtypesRequest={}))});var wR=d(Gi=>{"use strict";Object.defineProperty(Gi,"__esModule",{value:!0});Gi.InlineValueRefreshRequest=Gi.InlineValueRequest=void 0;var Jl=at(),lM;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Jl.MessageDirection.clientToServer,t.type=new Jl.ProtocolRequestType(t.method)})(lM=Gi.InlineValueRequest||(Gi.InlineValueRequest={}));var cM;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Jl.MessageDirection.clientToServer,t.type=new Jl.ProtocolRequestType0(t.method)})(cM=Gi.InlineValueRefreshRequest||(Gi.InlineValueRefreshRequest={}))});var NR=d(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.InlayHintRefreshRequest=pn.InlayHintResolveRequest=pn.InlayHintRequest=void 0;var _o=at(),fM;(function(t){t.method="textDocument/inlayHint",t.messageDirection=_o.MessageDirection.clientToServer,t.type=new _o.ProtocolRequestType(t.method)})(fM=pn.InlayHintRequest||(pn.InlayHintRequest={}));var dM;(function(t){t.method="inlayHint/resolve",t.messageDirection=_o.MessageDirection.clientToServer,t.type=new _o.ProtocolRequestType(t.method)})(dM=pn.InlayHintResolveRequest||(pn.InlayHintResolveRequest={}));var pM;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=_o.MessageDirection.clientToServer,t.type=new _o.ProtocolRequestType0(t.method)})(pM=pn.InlayHintRefreshRequest||(pn.InlayHintRefreshRequest={}))});var OR=d(Ht=>{"use strict";Object.defineProperty(Ht,"__esModule",{value:!0});Ht.DiagnosticRefreshRequest=Ht.WorkspaceDiagnosticRequest=Ht.DocumentDiagnosticRequest=Ht.DocumentDiagnosticReportKind=Ht.DiagnosticServerCancellationData=void 0;var $R=mi(),mM=Bl(),Ro=at(),hM;(function(t){function e(r){let n=r;return n&&mM.boolean(n.retriggerRequest)}t.is=e})(hM=Ht.DiagnosticServerCancellationData||(Ht.DiagnosticServerCancellationData={}));var yM;(function(t){t.Full="full",t.Unchanged="unchanged"})(yM=Ht.DocumentDiagnosticReportKind||(Ht.DocumentDiagnosticReportKind={}));var gM;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Ro.MessageDirection.clientToServer,t.type=new Ro.ProtocolRequestType(t.method),t.partialResult=new $R.ProgressType})(gM=Ht.DocumentDiagnosticRequest||(Ht.DocumentDiagnosticRequest={}));var vM;(function(t){t.method="workspace/diagnostic",t.messageDirection=Ro.MessageDirection.clientToServer,t.type=new Ro.ProtocolRequestType(t.method),t.partialResult=new $R.ProgressType})(vM=Ht.WorkspaceDiagnosticRequest||(Ht.WorkspaceDiagnosticRequest={}));var TM;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Ro.MessageDirection.clientToServer,t.type=new Ro.ProtocolRequestType0(t.method)})(TM=Ht.DiagnosticRefreshRequest||(Ht.DiagnosticRefreshRequest={}))});var xR=d(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.DidCloseNotebookDocumentNotification=Se.DidSaveNotebookDocumentNotification=Se.DidChangeNotebookDocumentNotification=Se.NotebookCellArrayChange=Se.DidOpenNotebookDocumentNotification=Se.NotebookDocumentSyncRegistrationType=Se.NotebookDocument=Se.NotebookCell=Se.ExecutionSummary=Se.NotebookCellKind=void 0;var gu=yo(),mn=Bl(),$n=at(),IR;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(IR=Se.NotebookCellKind||(Se.NotebookCellKind={}));var DR;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return mn.objectLiteral(a)&&gu.uinteger.is(a.executionOrder)&&(a.success===void 0||mn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(DR=Se.ExecutionSummary||(Se.ExecutionSummary={}));var Zm;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return mn.objectLiteral(o)&&IR.is(o.kind)&&gu.DocumentUri.is(o.document)&&(o.metadata===void 0||mn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!DR.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(mn.objectLiteral(a)&&mn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let h=l[f];if(!i(a[h],o[h]))return!1}}return!0}})(Zm=Se.NotebookCell||(Se.NotebookCell={}));var _M;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return mn.objectLiteral(i)&&mn.string(i.uri)&&gu.integer.is(i.version)&&mn.typedArray(i.cells,Zm.is)}t.is=r})(_M=Se.NotebookDocument||(Se.NotebookDocument={}));var vu;(function(t){t.method="notebookDocument/sync",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.RegistrationType(t.method)})(vu=Se.NotebookDocumentSyncRegistrationType||(Se.NotebookDocumentSyncRegistrationType={}));var RM;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=vu.method})(RM=Se.DidOpenNotebookDocumentNotification||(Se.DidOpenNotebookDocumentNotification={}));var AM;(function(t){function e(n){let i=n;return mn.objectLiteral(i)&&gu.uinteger.is(i.start)&&gu.uinteger.is(i.deleteCount)&&(i.cells===void 0||mn.typedArray(i.cells,Zm.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(AM=Se.NotebookCellArrayChange||(Se.NotebookCellArrayChange={}));var SM;(function(t){t.method="notebookDocument/didChange",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=vu.method})(SM=Se.DidChangeNotebookDocumentNotification||(Se.DidChangeNotebookDocumentNotification={}));var bM;(function(t){t.method="notebookDocument/didSave",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=vu.method})(bM=Se.DidSaveNotebookDocumentNotification||(Se.DidSaveNotebookDocumentNotification={}));var CM;(function(t){t.method="notebookDocument/didClose",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=vu.method})(CM=Se.DidCloseNotebookDocumentNotification||(Se.DidCloseNotebookDocumentNotification={}))});var KR=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=at(),LR=yo(),Kt=Bl(),PM=aR();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return PM.ImplementationRequest}});var kM=sR();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return kM.TypeDefinitionRequest}});var qR=uR();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return qR.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return qR.DidChangeWorkspaceFoldersNotification}});var EM=cR();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return EM.ConfigurationRequest}});var MR=fR();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return MR.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return MR.ColorPresentationRequest}});var wM=pR();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return wM.FoldingRangeRequest}});var NM=hR();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return NM.DeclarationRequest}});var $M=gR();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return $M.SelectionRangeRequest}});var eh=vR();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return eh.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return eh.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return eh.WorkDoneProgressCancelNotification}});var th=TR();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return th.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return th.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return th.CallHierarchyPrepareRequest}});var Ao=_R();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return Ao.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return Ao.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Ao.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Ao.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Ao.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Ao.SemanticTokensRegistrationType}});var OM=AR();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return OM.ShowDocumentRequest}});var IM=bR();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return IM.LinkedEditingRangeRequest}});var ka=CR();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return ka.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return ka.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return ka.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return ka.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return ka.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return ka.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return ka.WillDeleteFilesRequest}});var rh=kR();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return rh.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return rh.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return rh.MonikerRequest}});var nh=ER();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return nh.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return nh.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return nh.TypeHierarchySupertypesRequest}});var FR=wR();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return FR.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return FR.InlineValueRefreshRequest}});var ih=NR();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return ih.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return ih.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return ih.InlayHintRefreshRequest}});var Tu=OR();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Tu.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Tu.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Tu.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Tu.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Tu.DiagnosticRefreshRequest}});var On=xR();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return On.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return On.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return On.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return On.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return On.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return On.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidCloseNotebookDocumentNotification}});var jR;(function(t){function e(r){let n=r;return Kt.string(n.language)||Kt.string(n.scheme)||Kt.string(n.pattern)}t.is=e})(jR=T.TextDocumentFilter||(T.TextDocumentFilter={}));var GR;(function(t){function e(r){let n=r;return Kt.objectLiteral(n)&&(Kt.string(n.notebookType)||Kt.string(n.scheme)||Kt.string(n.pattern))}t.is=e})(GR=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var UR;(function(t){function e(r){let n=r;return Kt.objectLiteral(n)&&(Kt.string(n.notebook)||GR.is(n.notebook))&&(n.language===void 0||Kt.string(n.language))}t.is=e})(UR=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var HR;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Kt.string(n)&&!jR.is(n)&&!UR.is(n))return!1;return!0}t.is=e})(HR=T.DocumentSelector||(T.DocumentSelector={}));var DM;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(DM=T.RegistrationRequest||(T.RegistrationRequest={}));var xM;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(xM=T.UnregistrationRequest||(T.UnregistrationRequest={}));var LM;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(LM=T.ResourceOperationKind||(T.ResourceOperationKind={}));var qM;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(qM=T.FailureHandlingKind||(T.FailureHandlingKind={}));var MM;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(MM=T.PositionEncodingKind||(T.PositionEncodingKind={}));var FM;(function(t){function e(r){let n=r;return n&&Kt.string(n.id)&&n.id.length>0}t.hasId=e})(FM=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var jM;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||HR.is(n.documentSelector))}t.is=e})(jM=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var GM;(function(t){function e(n){let i=n;return Kt.objectLiteral(i)&&(i.workDoneProgress===void 0||Kt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Kt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(GM=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var UM;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(UM=T.InitializeRequest||(T.InitializeRequest={}));var HM;(function(t){t.unknownProtocolVersion=1})(HM=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var KM;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(KM=T.InitializedNotification||(T.InitializedNotification={}));var WM;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(WM=T.ShutdownRequest||(T.ShutdownRequest={}));var BM;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(BM=T.ExitNotification||(T.ExitNotification={}));var VM;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(VM=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var zM;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(zM=T.MessageType||(T.MessageType={}));var YM;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(YM=T.ShowMessageNotification||(T.ShowMessageNotification={}));var XM;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(XM=T.ShowMessageRequest||(T.ShowMessageRequest={}));var JM;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(JM=T.LogMessageNotification||(T.LogMessageNotification={}));var QM;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(QM=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var ZM;(function(t){t.None=0,t.Full=1,t.Incremental=2})(ZM=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var eF;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(eF=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var tF;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(tF=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var rF;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(rF=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var nF;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(nF=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var iF;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(iF=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var aF;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(aF=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var oF;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(oF=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var sF;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(sF=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var uF;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(uF=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var lF;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(lF=T.FileChangeType||(T.FileChangeType={}));var cF;(function(t){function e(r){let n=r;return Kt.objectLiteral(n)&&(LR.URI.is(n.baseUri)||LR.WorkspaceFolder.is(n.baseUri))&&Kt.string(n.pattern)}t.is=e})(cF=T.RelativePattern||(T.RelativePattern={}));var fF;(function(t){t.Create=1,t.Change=2,t.Delete=4})(fF=T.WatchKind||(T.WatchKind={}));var dF;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(dF=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var pF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(pF=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var mF;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(mF=T.CompletionRequest||(T.CompletionRequest={}));var hF;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(hF=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var yF;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(yF=T.HoverRequest||(T.HoverRequest={}));var gF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(gF=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var vF;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(vF=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var TF;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(TF=T.DefinitionRequest||(T.DefinitionRequest={}));var _F;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(_F=T.ReferencesRequest||(T.ReferencesRequest={}));var RF;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(RF=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var AF;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(AF=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var SF;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(SF=T.CodeActionRequest||(T.CodeActionRequest={}));var bF;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(bF=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var CF;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(CF=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var PF;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(PF=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var kF;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(kF=T.CodeLensRequest||(T.CodeLensRequest={}));var EF;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(EF=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var wF;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(wF=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var NF;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(NF=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var $F;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})($F=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var OF;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(OF=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var IF;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(IF=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var DF;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(DF=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var xF;(function(t){t.Identifier=1})(xF=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var LF;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LF=T.RenameRequest||(T.RenameRequest={}));var qF;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(qF=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var MF;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(MF=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var FF;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(FF=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var BR=d(Ql=>{"use strict";Object.defineProperty(Ql,"__esModule",{value:!0});Ql.createProtocolConnection=void 0;var WR=mi();function jF(t,e,r,n){return WR.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,WR.createMessageConnection)(t,e,r,n)}Ql.createProtocolConnection=jF});var VR=d(ur=>{"use strict";var GF=ur&&ur.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Zl=ur&&ur.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&GF(e,t,r)};Object.defineProperty(ur,"__esModule",{value:!0});ur.LSPErrorCodes=ur.createProtocolConnection=void 0;Zl(mi(),ur);Zl(yo(),ur);Zl(at(),ur);Zl(KR(),ur);var UF=BR();Object.defineProperty(ur,"createProtocolConnection",{enumerable:!0,get:function(){return UF.createProtocolConnection}});var HF;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(HF=ur.LSPErrorCodes||(ur.LSPErrorCodes={}))});var yt=d(In=>{"use strict";var KF=In&&In.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),zR=In&&In.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&KF(e,t,r)};Object.defineProperty(In,"__esModule",{value:!0});In.createProtocolConnection=void 0;var WF=Vm();zR(Vm(),In);zR(VR(),In);function BF(t,e,r,n){return(0,WF.createMessageConnection)(t,e,r,n)}In.createProtocolConnection=BF});var oh=d(Ui=>{"use strict";Object.defineProperty(Ui,"__esModule",{value:!0});Ui.SemanticTokensBuilder=Ui.SemanticTokensDiff=Ui.SemanticTokensFeature=void 0;var ec=yt(),VF=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(ec.SemanticTokensRefreshRequest.type),on:e=>{let r=ec.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=ec.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=ec.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ui.SemanticTokensFeature=VF;var tc=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ui.SemanticTokensDiff=tc;var ah=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new tc(this._prevData,this._data).computeDiff()}:this.build()}};Ui.SemanticTokensBuilder=ah});var uh=d(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.TextDocuments=void 0;var Ea=yt(),sh=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new Ea.Emitter,this._onDidOpen=new Ea.Emitter,this._onDidClose=new Ea.Emitter,this._onDidSave=new Ea.Emitter,this._onWillSave=new Ea.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=Ea.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),Ea.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};rc.TextDocuments=sh});var ch=d(So=>{"use strict";Object.defineProperty(So,"__esModule",{value:!0});So.NotebookDocuments=So.NotebookSyncFeature=void 0;var Lr=yt(),YR=uh(),zF=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Lr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Lr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Lr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Lr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};So.NotebookSyncFeature=zF;var Hi=class{onDidOpenTextDocument(e){return this.openHandler=e,Lr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Lr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Lr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return Hi.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return Hi.NULL_DISPOSE}onDidSaveTextDocument(){return Hi.NULL_DISPOSE}};Hi.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var lh=class{constructor(e){e instanceof YR.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new YR.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Lr.Emitter,this._onDidChange=new Lr.Emitter,this._onDidSave=new Lr.Emitter,this._onDidClose=new Lr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Hi,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],h=[];if(u.cells!==void 0){let k=u.cells;if(k.structure!==void 0){let b=k.structure.array;if(a.cells.splice(b.start,b.deleteCount,...b.cells!==void 0?b.cells:[]),k.structure.didOpen!==void 0)for(let S of k.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(k.structure.didClose)for(let S of k.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(k.data!==void 0){let b=new Map(k.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=b.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(f.push({old:F[0],new:O}),b.delete(O.document),b.size===0)break}}}if(k.textContent!==void 0)for(let b of k.textContent)r.changeTextDocument({textDocument:b.document,contentChanges:b.changes}),h.push(b.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let k of l)y.push(this.getNotebookCell(k));let R=[];for(let k of c)R.push(this.getNotebookCell(k));let P=[];for(let k of h)P.push(this.getNotebookCell(k));(y.length>0||R.length>0||f.length>0||P.length>0)&&(v.cells={added:y,removed:R,changed:{data:f,textContent:P}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),Lr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};So.NotebookDocuments=lh});var fh=d(gt=>{"use strict";Object.defineProperty(gt,"__esModule",{value:!0});gt.thenable=gt.typedArray=gt.stringArray=gt.array=gt.func=gt.error=gt.number=gt.string=gt.boolean=void 0;function YF(t){return t===!0||t===!1}gt.boolean=YF;function XR(t){return typeof t=="string"||t instanceof String}gt.string=XR;function XF(t){return typeof t=="number"||t instanceof Number}gt.number=XF;function JF(t){return t instanceof Error}gt.error=JF;function JR(t){return typeof t=="function"}gt.func=JR;function QR(t){return Array.isArray(t)}gt.array=QR;function QF(t){return QR(t)&&t.every(e=>XR(e))}gt.stringArray=QF;function ZF(t,e){return Array.isArray(t)&&t.every(e)}gt.typedArray=ZF;function ej(t){return t&&JR(t.then)}gt.thenable=ej});var dh=d(qr=>{"use strict";Object.defineProperty(qr,"__esModule",{value:!0});qr.generateUuid=qr.parse=qr.isUUID=qr.v4=qr.empty=void 0;var _u=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},ue=class extends _u{constructor(){super([ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-","4",ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._oneOf(ue._timeHighBits),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return ue._oneOf(ue._chars)}};ue._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];ue._timeHighBits=["8","9","a","b"];qr.empty=new _u("00000000-0000-0000-0000-000000000000");function ZR(){return new ue}qr.v4=ZR;var tj=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function eA(t){return tj.test(t)}qr.isUUID=eA;function rj(t){if(!eA(t))throw new Error("invalid uuid");return new _u(t)}qr.parse=rj;function nj(){return ZR().asHex()}qr.generateUuid=nj});var tA=d(Wi=>{"use strict";Object.defineProperty(Wi,"__esModule",{value:!0});Wi.attachPartialResult=Wi.ProgressFeature=Wi.attachWorkDone=void 0;var Ki=yt(),ij=dh(),Dn=class{constructor(e,r){this._connection=e,this._token=r,Dn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Ki.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Ki.WorkDoneProgress.type,this._token,n)}done(){Dn.Instances.delete(this._token),this._connection.sendProgress(Ki.WorkDoneProgress.type,this._token,{kind:"end"})}};Dn.Instances=new Map;var nc=class extends Dn{constructor(e,r){super(e,r),this._source=new Ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ru=class{constructor(){}begin(){}report(){}done(){}},ic=class extends Ru{constructor(){super(),this._source=new Ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function aj(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ru;let r=e.workDoneToken;return delete e.workDoneToken,new Dn(t,r)}Wi.attachWorkDone=aj;var oj=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Ki.WorkDoneProgressCancelNotification.type,r=>{let n=Dn.Instances.get(r.token);(n instanceof nc||n instanceof ic)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ru:new Dn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,ij.generateUuid)();return this.connection.sendRequest(Ki.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new nc(this.connection,e))}else return Promise.resolve(new ic)}};Wi.ProgressFeature=oj;var ph;(function(t){t.type=new Ki.ProgressType})(ph||(ph={}));var mh=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(ph.type,this._token,e)}};function sj(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new mh(t,r)}Wi.attachPartialResult=sj});var rA=d(ac=>{"use strict";Object.defineProperty(ac,"__esModule",{value:!0});ac.ConfigurationFeature=void 0;var uj=yt(),lj=fh(),cj=t=>class extends t{getConfiguration(e){return e?lj.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(uj.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};ac.ConfigurationFeature=cj});var nA=d(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.WorkspaceFoldersFeature=void 0;var oc=yt(),fj=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new oc.Emitter,this.connection.onNotification(oc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(oc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(oc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};sc.WorkspaceFoldersFeature=fj});var iA=d(uc=>{"use strict";Object.defineProperty(uc,"__esModule",{value:!0});uc.CallHierarchyFeature=void 0;var hh=yt(),dj=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(hh.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=hh.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=hh.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};uc.CallHierarchyFeature=dj});var aA=d(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.ShowDocumentFeature=void 0;var pj=yt(),mj=t=>class extends t{showDocument(e){return this.connection.sendRequest(pj.ShowDocumentRequest.type,e)}};lc.ShowDocumentFeature=mj});var oA=d(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.FileOperationsFeature=void 0;var bo=yt(),hj=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(bo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(bo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(bo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(bo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(bo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(bo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};cc.FileOperationsFeature=hj});var sA=d(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.LinkedEditingRangeFeature=void 0;var yj=yt(),gj=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(yj.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};fc.LinkedEditingRangeFeature=gj});var uA=d(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.TypeHierarchyFeature=void 0;var yh=yt(),vj=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(yh.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=yh.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=yh.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};dc.TypeHierarchyFeature=vj});var cA=d(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.InlineValueFeature=void 0;var lA=yt(),Tj=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(lA.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(lA.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};pc.InlineValueFeature=Tj});var fA=d(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.InlayHintFeature=void 0;var gh=yt(),_j=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(gh.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(gh.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(gh.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};mc.InlayHintFeature=_j});var dA=d(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.DiagnosticFeature=void 0;var Au=yt(),Rj=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Au.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Au.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Au.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Au.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Au.WorkspaceDiagnosticRequest.partialResult,r)))}}};hc.DiagnosticFeature=Rj});var pA=d(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.MonikerFeature=void 0;var Aj=yt(),Sj=t=>class extends t{get moniker(){return{on:e=>{let r=Aj.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};yc.MonikerFeature=Sj});var PA=d(ve=>{"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.createConnection=ve.combineFeatures=ve.combineNotebooksFeatures=ve.combineLanguagesFeatures=ve.combineWorkspaceFeatures=ve.combineWindowFeatures=ve.combineClientFeatures=ve.combineTracerFeatures=ve.combineTelemetryFeatures=ve.combineConsoleFeatures=ve._NotebooksImpl=ve._LanguagesImpl=ve.BulkUnregistration=ve.BulkRegistration=ve.ErrorMessageTracker=void 0;var H=yt(),Mr=fh(),Th=dh(),ie=tA(),bj=rA(),Cj=nA(),Pj=iA(),kj=oh(),Ej=aA(),wj=oA(),Nj=sA(),$j=uA(),Oj=cA(),Ij=fA(),Dj=dA(),xj=ch(),Lj=pA();function vh(t){if(t!==null)return t}var _h=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ve.ErrorMessageTracker=_h;var gc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},Rh=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(vh)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(vh)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(vh)}},mA=(0,Ej.ShowDocumentFeature)((0,ie.ProgressFeature)(Rh)),qj;(function(t){function e(){return new vc}t.create=e})(qj=ve.BulkRegistration||(ve.BulkRegistration={}));var vc=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Mr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Th.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},Mj;(function(t){function e(){return new Su(void 0,[])}t.create=e})(Mj=ve.BulkUnregistration||(ve.BulkUnregistration={}));var Su=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Mr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Tc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof vc?this.registerMany(e):e instanceof Su?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Mr.string(r)?r:r.method,a=Th.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Mr.string(e)?e:e.method,i=Th.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new Su(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Ah=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},hA=(0,wj.FileOperationsFeature)((0,Cj.WorkspaceFoldersFeature)((0,bj.ConfigurationFeature)(Ah))),_c=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},Rc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Ac=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._LanguagesImpl=Ac;var yA=(0,Lj.MonikerFeature)((0,Dj.DiagnosticFeature)((0,Ij.InlayHintFeature)((0,Oj.InlineValueFeature)((0,$j.TypeHierarchyFeature)((0,Nj.LinkedEditingRangeFeature)((0,kj.SemanticTokensFeature)((0,Pj.CallHierarchyFeature)(Ac)))))))),Sc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._NotebooksImpl=Sc;var gA=(0,xj.NotebookSyncFeature)(Sc);function vA(t,e){return function(r){return e(t(r))}}ve.combineConsoleFeatures=vA;function TA(t,e){return function(r){return e(t(r))}}ve.combineTelemetryFeatures=TA;function _A(t,e){return function(r){return e(t(r))}}ve.combineTracerFeatures=_A;function RA(t,e){return function(r){return e(t(r))}}ve.combineClientFeatures=RA;function AA(t,e){return function(r){return e(t(r))}}ve.combineWindowFeatures=AA;function SA(t,e){return function(r){return e(t(r))}}ve.combineWorkspaceFeatures=SA;function bA(t,e){return function(r){return e(t(r))}}ve.combineLanguagesFeatures=bA;function CA(t,e){return function(r){return e(t(r))}}ve.combineNotebooksFeatures=CA;function Fj(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,vA),tracer:r(t.tracer,e.tracer,_A),telemetry:r(t.telemetry,e.telemetry,TA),client:r(t.client,e.client,RA),window:r(t.window,e.window,AA),workspace:r(t.workspace,e.workspace,SA),languages:r(t.languages,e.languages,bA),notebooks:r(t.notebooks,e.notebooks,CA)}}ve.combineFeatures=Fj;function jj(t,e,r){let n=r&&r.console?new(r.console(gc)):new gc,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(_c)):new _c,o=r&&r.telemetry?new(r.telemetry(Rc)):new Rc,s=r&&r.client?new(r.client(Tc)):new Tc,u=r&&r.window?new(r.window(mA)):new mA,l=r&&r.workspace?new(r.workspace(hA)):new hA,c=r&&r.languages?new(r.languages(yA)):new yA,f=r&&r.notebooks?new(r.notebooks(gA)):new gA,h=[n,a,o,s,u,l,c,f];function v(b){return b instanceof Promise?b:Mr.thenable(b)?new Promise((S,O)=>{b.then(F=>S(F),F=>O(F))}):Promise.resolve(b)}let y,R,P,k={listen:()=>i.listen(),sendRequest:(b,...S)=>i.sendRequest(Mr.string(b)?b:b.method,...S),onRequest:(b,S)=>i.onRequest(b,S),sendNotification:(b,S)=>{let O=Mr.string(b)?b:b.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(b,S)=>i.onNotification(b,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:b=>(R=b,{dispose:()=>{R=void 0}}),onInitialized:b=>i.onNotification(H.InitializedNotification.type,b),onShutdown:b=>(y=b,{dispose:()=>{y=void 0}}),onExit:b=>(P=b,{dispose:()=>{P=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:b=>i.onNotification(H.DidChangeConfigurationNotification.type,b),onDidChangeWatchedFiles:b=>i.onNotification(H.DidChangeWatchedFilesNotification.type,b),__textDocumentSync:void 0,onDidOpenTextDocument:b=>i.onNotification(H.DidOpenTextDocumentNotification.type,b),onDidChangeTextDocument:b=>i.onNotification(H.DidChangeTextDocumentNotification.type,b),onDidCloseTextDocument:b=>i.onNotification(H.DidCloseTextDocumentNotification.type,b),onWillSaveTextDocument:b=>i.onNotification(H.WillSaveTextDocumentNotification.type,b),onWillSaveTextDocumentWaitUntil:b=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,b),onDidSaveTextDocument:b=>i.onNotification(H.DidSaveTextDocumentNotification.type,b),sendDiagnostics:b=>i.sendNotification(H.PublishDiagnosticsNotification.type,b),onHover:b=>i.onRequest(H.HoverRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onCompletion:b=>i.onRequest(H.CompletionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCompletionResolve:b=>i.onRequest(H.CompletionResolveRequest.type,b),onSignatureHelp:b=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDeclaration:b=>i.onRequest(H.DeclarationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDefinition:b=>i.onRequest(H.DefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onTypeDefinition:b=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onImplementation:b=>i.onRequest(H.ImplementationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onReferences:b=>i.onRequest(H.ReferencesRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentHighlight:b=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentSymbol:b=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbol:b=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:b=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,b),onCodeAction:b=>i.onRequest(H.CodeActionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeActionResolve:b=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>b(S,O)),onCodeLens:b=>i.onRequest(H.CodeLensRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeLensResolve:b=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>b(S,O)),onDocumentFormatting:b=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:b=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:b=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>b(S,O)),onRenameRequest:b=>i.onRequest(H.RenameRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onPrepareRename:b=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>b(S,O)),onDocumentLinks:b=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentLinkResolve:b=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>b(S,O)),onDocumentColor:b=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onColorPresentation:b=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onFoldingRanges:b=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onSelectionRanges:b=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onExecuteCommand:b=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let b of h)b.attach(k);return i.onRequest(H.InitializeRequest.type,b=>{e.initialize(b),Mr.string(b.trace)&&(a.trace=H.Trace.fromString(b.trace));for(let S of h)S.initialize(b.capabilities);if(R){let S=R(b,new H.CancellationTokenSource().token,(0,ie.attachWorkDone)(i,b),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Mr.number(k.__textDocumentSync)?k.__textDocumentSync:H.TextDocumentSyncKind.None:!Mr.number(W.textDocumentSync)&&!Mr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Mr.number(k.__textDocumentSync)?k.__textDocumentSync:H.TextDocumentSyncKind.None);for(let re of h)re.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of h)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{P&&P()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,b=>{a.trace=H.Trace.fromString(b.value)}),k}ve.createConnection=jj});var Sh=d(Wt=>{"use strict";var Gj=Wt&&Wt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),kA=Wt&&Wt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Gj(e,t,r)};Object.defineProperty(Wt,"__esModule",{value:!0});Wt.ProposedFeatures=Wt.NotebookDocuments=Wt.TextDocuments=Wt.SemanticTokensBuilder=void 0;var Uj=oh();Object.defineProperty(Wt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return Uj.SemanticTokensBuilder}});kA(yt(),Wt);var Hj=uh();Object.defineProperty(Wt,"TextDocuments",{enumerable:!0,get:function(){return Hj.TextDocuments}});var Kj=ch();Object.defineProperty(Wt,"NotebookDocuments",{enumerable:!0,get:function(){return Kj.NotebookDocuments}});kA(PA(),Wt);var Wj;(function(t){t.all={__brand:"features"}})(Wj=Wt.ProposedFeatures||(Wt.ProposedFeatures={}))});var wA=d((ide,EA)=>{"use strict";EA.exports=yt()});var qe=d(xn=>{"use strict";var Bj=xn&&xn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),$A=xn&&xn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Bj(e,t,r)};Object.defineProperty(xn,"__esModule",{value:!0});xn.createConnection=void 0;var bc=Sh();$A(wA(),xn);$A(Sh(),xn);var NA=!1,Vj={initialize:t=>{},get shutdownReceived(){return NA},set shutdownReceived(t){NA=t},exit:t=>{}};function zj(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),bc.ConnectionStrategy.is(t)||bc.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,bc.createProtocolConnection)(a,o,l,s);return(0,bc.createConnection)(u,Vj,i)}xn.createConnection=zj});var bh=d((Pc,Cc)=>{var Yj=Pc&&Pc.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof Cc=="object"&&typeof Cc.exports=="object"){var e=t(ql,Pc);e!==void 0&&(Cc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,h){this._uri=l,this._languageId=c,this._version=f,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,h=l;f<h.length;f++){var v=h[f];if(u.isIncremental(v)){var y=o(v.range),R=this.offsetAt(y.start),P=this.offsetAt(y.end);this._content=this._content.substring(0,R)+v.text+this._content.substring(P,this._content.length);var k=Math.max(y.start.line,0),b=Math.max(y.end.line,0),S=this._lineOffsets,O=a(v.text,!1,R);if(b-k===O.length)for(var F=0,W=O.length;F<W;F++)S[F+k+1]=O[F];else O.length<1e4?S.splice.apply(S,Yj([k+1,b-k],O,!1)):this._lineOffsets=S=S.slice(0,k+1).concat(O,S.slice(b+1));var re=v.text.length-(P-R);if(re!==0)for(var F=k+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+re}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,h=c.length;if(h===0)return{line:0,character:l};for(;f<h;){var v=Math.floor((f+h)/2);c[v]>l?h=v:f=v+1}var y=f-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],h=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,h),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(h,v,y,R){return new r(h,v,y,R)}u.create=l;function c(h,v,y){if(h instanceof r)return h.update(v,y),h;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(h,v){for(var y=h.getText(),R=i(v.map(s),function(W,re){var we=W.range.start.line-re.range.start.line;return we===0?W.range.start.character-re.range.start.character:we}),P=0,k=[],b=0,S=R;b<S.length;b++){var O=S[b],F=h.offsetAt(O.range.start);if(F<P)throw new Error("Overlapping edit");F>P&&k.push(y.substring(P,F)),O.newText.length&&k.push(O.newText),P=h.offsetAt(O.range.end)}return k.push(y.substr(P)),k.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),h=u.slice(c);i(f,l),i(h,l);for(var v=0,y=0,R=0;v<f.length&&y<h.length;){var P=l(f[v],h[y]);P<=0?u[R++]=f[v++]:u[R++]=h[y++]}for(;v<f.length;)u[R++]=f[v++];for(;y<h.length;)u[R++]=h[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],h=0;h<u.length;h++){var v=u.charCodeAt(h);(v===13||v===10)&&(v===13&&h+1<u.length&&u.charCodeAt(h+1)===10&&h++,f.push(c+h+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var mr=d(Dt=>{"use strict";Object.defineProperty(Dt,"__esModule",{value:!0});Dt.isRootCstNode=Dt.isLeafCstNode=Dt.isCompositeCstNode=Dt.AbstractAstReflection=Dt.isLinkingError=Dt.isAstNodeDescription=Dt.isReference=Dt.isAstNode=void 0;function Ph(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}Dt.isAstNode=Ph;function OA(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}Dt.isReference=OA;function Xj(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}Dt.isAstNodeDescription=Xj;function Jj(t){return typeof t=="object"&&t!==null&&Ph(t.container)&&OA(t.reference)&&typeof t.message=="string"}Dt.isLinkingError=Jj;var Ch=class{constructor(){this.subtypes={}}isInstance(e,r){return Ph(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};Dt.AbstractAstReflection=Ch;function IA(t){return typeof t=="object"&&t!==null&&"children"in t}Dt.isCompositeCstNode=IA;function Qj(t){return typeof t=="object"&&t!==null&&"tokenType"in t}Dt.isLeafCstNode=Qj;function Zj(t){return IA(t)&&"fullText"in t}Dt.isRootCstNode=Zj});var xt=d(He=>{"use strict";Object.defineProperty(He,"__esModule",{value:!0});He.Reduction=He.TreeStreamImpl=He.stream=He.DONE_RESULT=He.EMPTY_STREAM=He.StreamImpl=void 0;var Bt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Bt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return He.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=eG(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Bt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?He.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Bt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return He.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Bt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(kc(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return He.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Bt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(kc(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return He.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Bt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Bt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?He.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};He.StreamImpl=Bt;function eG(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function kc(t){return!!t&&typeof t[Symbol.iterator]=="function"}He.EMPTY_STREAM=new Bt(()=>{},()=>He.DONE_RESULT);He.DONE_RESULT=Object.freeze({done:!0,value:void 0});function tG(...t){if(t.length===1){let e=t[0];if(e instanceof Bt)return e;if(kc(e))return new Bt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Bt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:He.DONE_RESULT)}return t.length>1?new Bt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];kc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return He.DONE_RESULT}):He.EMPTY_STREAM}He.stream=tG;var kh=class extends Bt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return He.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};He.TreeStreamImpl=kh;var rG;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(rG=He.Reduction||(He.Reduction={}))});var Qe=d(Pe=>{"use strict";Object.defineProperty(Pe,"__esModule",{value:!0});Pe.getInteriorNodes=Pe.getStartlineNode=Pe.getNextNode=Pe.getPreviousNode=Pe.findLeafNodeAtOffset=Pe.isCommentNode=Pe.findCommentNode=Pe.findDeclarationNodeAtOffset=Pe.DefaultNameRegexp=Pe.toDocumentSegment=Pe.tokenToRange=Pe.isCstChildNode=Pe.flattenCst=Pe.streamCst=void 0;var Co=mr(),nG=xt();function xA(t){return new nG.TreeStreamImpl(t,e=>(0,Co.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}Pe.streamCst=xA;function iG(t){return xA(t).filter(Co.isLeafCstNode)}Pe.flattenCst=iG;function aG(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}Pe.isCstChildNode=aG;function oG(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}Pe.tokenToRange=oG;function sG(t){let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}Pe.toDocumentSegment=sG;Pe.DefaultNameRegexp=/^[\w\p{L}]$/u;function uG(t,e,r=Pe.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return wh(t,e)}}Pe.findDeclarationNodeAtOffset=uG;function lG(t,e){if(t){let r=LA(t,!0);if(r&&Eh(r,e))return r;if((0,Co.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(Eh(a,e))return a}}}}Pe.findCommentNode=lG;function Eh(t,e){return(0,Co.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}Pe.isCommentNode=Eh;function wh(t,e){if((0,Co.isLeafCstNode)(t))return t;if((0,Co.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<=n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return wh(a,e)}}}Pe.findLeafNodeAtOffset=wh;function LA(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getPreviousNode=LA;function cG(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getNextNode=cG;function fG(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}Pe.getStartlineNode=fG;function dG(t,e){let r=pG(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}Pe.getInteriorNodes=dG;function pG(t,e){let r=DA(t),n=DA(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function DA(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var Ln=d((bu,Nh)=>{(function(t,e){if(typeof bu=="object"&&typeof Nh=="object")Nh.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof bu=="object"?bu:t)[n]=r[n]}})(bu,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",h=0,v=-1,y=0,R=0;R<=u.length;++R){if(R<u.length)c=u.charCodeAt(R);else{if(c===47)break;c=47}if(c===47){if(!(v===R-1||y===1))if(v!==R-1&&y===2){if(f.length<2||h!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var P=f.lastIndexOf("/");if(P!==f.length-1){P===-1?(f="",h=0):h=(f=f.slice(0,P)).length-1-f.lastIndexOf("/"),v=R,y=0;continue}}else if(f.length===2||f.length===1){f="",h=0,v=R,y=0;continue}}l&&(f.length>0?f+="/..":f="..",h=2)}else f.length>0?f+="/"+u.slice(v+1,R):f=u.slice(v+1,R),h=R-v-1;v=R,y=0}else c===46&&y!==-1?++y:y=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var h;f>=0?h=arguments[f]:(u===void 0&&(u=process.cwd()),h=u),a(h),h.length!==0&&(l=h+"/"+l,c=h.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,h=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,R=h<y?h:y,P=-1,k=0;k<=R;++k){if(k===R){if(y>R){if(l.charCodeAt(v+k)===47)return l.slice(v+k+1);if(k===0)return l.slice(v+k)}else h>R&&(u.charCodeAt(c+k)===47?P=k:k===0&&(P=0));break}var b=u.charCodeAt(c+k);if(b!==l.charCodeAt(v+k))break;b===47&&(P=k)}var S="";for(k=c+P+1;k<=f;++k)k!==f&&u.charCodeAt(k)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+P):(v+=P,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,h=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!h){f=v;break}}else h=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,h=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,R=-1;for(c=u.length-1;c>=0;--c){var P=u.charCodeAt(c);if(P===47){if(!v){f=c+1;break}}else R===-1&&(v=!1,R=c+1),y>=0&&(P===l.charCodeAt(y)?--y==-1&&(h=c):(y=-1,h=R))}return f===h?h=R:h===-1&&(h=u.length),u.slice(f,h)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else h===-1&&(v=!1,h=c+1);return h===-1?"":u.slice(f,h)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,h=!0,v=0,y=u.length-1;y>=0;--y){var R=u.charCodeAt(y);if(R!==47)f===-1&&(h=!1,f=y+1),R===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!h){c=y+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,h=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+h:f+"/"+h:h}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),h=f===47;h?(l.root="/",c=1):c=0;for(var v=-1,y=0,R=-1,P=!0,k=u.length-1,b=0;k>=c;--k)if((f=u.charCodeAt(k))!==47)R===-1&&(P=!1,R=k+1),f===46?v===-1?v=k:b!==1&&(b=1):v!==-1&&(b=-1);else if(!P){y=k+1;break}return v===-1||R===-1||b===0||b===1&&v===R-1&&v===y+1?R!==-1&&(l.base=l.name=y===0&&h?u.slice(1,R):u.slice(y,R)):(y===0&&h?(l.name=u.slice(1,v),l.base=u.slice(1,R)):(l.name=u.slice(y,v),l.base=u.slice(y,R)),l.ext=u.slice(v,R)),y>0?l.dir=u.slice(0,y-1):h&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var oe in B)Object.prototype.hasOwnProperty.call(B,oe)&&(j[oe]=B[oe])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,h=/^\//,v=/^\/\//;function y(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!f.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!h.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var R="",P="/",k=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,b=function(){function q(L,j,B,oe,se,ee){ee===void 0&&(ee=!1),typeof L=="object"?(this.scheme=L.scheme||R,this.authority=L.authority||R,this.path=L.path||R,this.query=L.query||R,this.fragment=L.fragment||R):(this.scheme=function(st,Xe){return st||Xe?st:"file"}(L,ee),this.authority=j||R,this.path=function(st,Xe){switch(st){case"https":case"http":case"file":Xe?Xe[0]!==P&&(Xe=P+Xe):Xe=P}return Xe}(this.scheme,B||R),this.query=oe||R,this.fragment=se||R,y(this,ee))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return we(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,oe=L.path,se=L.query,ee=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=R),B===void 0?B=this.authority:B===null&&(B=R),oe===void 0?oe=this.path:oe===null&&(oe=R),se===void 0?se=this.query:se===null&&(se=R),ee===void 0?ee=this.fragment:ee===null&&(ee=R),j===this.scheme&&B===this.authority&&oe===this.path&&se===this.query&&ee===this.fragment?this:new O(j,B,oe,se,ee)},q.parse=function(L,j){j===void 0&&(j=!1);var B=k.exec(L);return B?new O(B[2]||R,We(B[4]||R),We(B[5]||R),We(B[7]||R),We(B[9]||R),j):new O(R,R,R,R,R)},q.file=function(L){var j=R;if(c.isWindows&&(L=L.replace(/\\/g,P)),L[0]===P&&L[1]===P){var B=L.indexOf(P,2);B===-1?(j=L.substring(2),L=P):(j=L.substring(2,B),L=L.substring(B)||P)}return new O("file",j,L,R,R)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return y(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),V(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=b;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=we(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?V(this,!0):(this._formatted||(this._formatted=V(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(b),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,oe=-1,se=0;se<q.length;se++){var ee=q.charCodeAt(se);if(ee>=97&&ee<=122||ee>=65&&ee<=90||ee>=48&&ee<=57||ee===45||ee===46||ee===95||ee===126||L&&ee===47||j&&ee===91||j&&ee===93||j&&ee===58)oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B!==void 0&&(B+=q.charAt(se));else{B===void 0&&(B=q.substr(0,se));var st=F[ee];st!==void 0?(oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B+=st):oe===-1&&(oe=se)}}return oe!==-1&&(B+=encodeURIComponent(q.substring(oe))),B!==void 0?B:q}function re(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function we(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function V(q,L){var j=L?re:W,B="",oe=q.scheme,se=q.authority,ee=q.path,st=q.query,Xe=q.fragment;if(oe&&(B+=oe,B+=":"),(se||oe==="file")&&(B+=P,B+=P),se){var Ct=se.indexOf("@");if(Ct!==-1){var en=se.substr(0,Ct);se=se.substr(Ct+1),(Ct=en.lastIndexOf(":"))===-1?B+=j(en,!1,!1):(B+=j(en.substr(0,Ct),!1,!1),B+=":",B+=j(en.substr(Ct+1),!1,!0)),B+="@"}(Ct=(se=se.toLowerCase()).lastIndexOf(":"))===-1?B+=j(se,!1,!0):(B+=j(se.substr(0,Ct),!1,!0),B+=se.substr(Ct))}if(ee){if(ee.length>=3&&ee.charCodeAt(0)===47&&ee.charCodeAt(2)===58)(Sr=ee.charCodeAt(1))>=65&&Sr<=90&&(ee="/".concat(String.fromCharCode(Sr+32),":").concat(ee.substr(3)));else if(ee.length>=2&&ee.charCodeAt(1)===58){var Sr;(Sr=ee.charCodeAt(0))>=65&&Sr<=90&&(ee="".concat(String.fromCharCode(Sr+32),":").concat(ee.substr(2)))}B+=j(ee,!0,!1)}return st&&(B+="?",B+=j(st,!1,!1)),Xe&&(B+="#",B+=L?Xe:W(Xe,!1,!1)),B}function Ae(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Ae(q.substr(3)):q}}a.uriToFsPath=we;var Ye=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function We(q){return q.match(Ye)?q.replace(Ye,function(L){return Ae(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(h,v,y){if(y||arguments.length===2)for(var R,P=0,k=v.length;P<k;P++)!R&&P in v||(R||(R=Array.prototype.slice.call(v,0,P)),R[P]=v[P]);return h.concat(R||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(h){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return h.with({path:c.join.apply(c,s([h.path],v,!1))})},u.resolvePath=function(h){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var R=h.path,P=!1;R[0]!==f&&(R=f+R,P=!0);var k=c.resolve.apply(c,s([R],v,!1));return P&&k[0]===f&&!h.authority&&(k=k.substring(1)),h.with({path:k})},u.dirname=function(h){if(h.path.length===0||h.path===f)return h;var v=c.dirname(h.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),h.with({path:v})},u.basename=function(h){return c.basename(h.path)},u.extname=function(h){return c.extname(h.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var Cu=d(Po=>{"use strict";Object.defineProperty(Po,"__esModule",{value:!0});Po.eagerLoad=Po.inject=void 0;function mG(t,e,r,n){let i=[t,e,r,n].reduce(GA,{});return jA(i)}Po.inject=mG;var $h=Symbol("isProxy");function FA(t){if(t&&t[$h])for(let e of Object.values(t))FA(e);return t}Po.eagerLoad=FA;function jA(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>MA(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(MA(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),$h]});return r[$h]=!0,r}var qA=Symbol();function MA(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===qA)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=qA;try{t[e]=typeof i=="function"?i(n):jA(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function GA(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=GA(i,n):t[r]=n}}return t}});var Pr=d(Ec=>{"use strict";Object.defineProperty(Ec,"__esModule",{value:!0});Ec.MultiMap=void 0;var ko=xt(),Oh=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return ko.Reduction.sum((0,ko.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,ko.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,ko.stream)(this.map.keys())}values(){return(0,ko.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,ko.stream)(this.map.entries())}};Ec.MultiMap=Oh});var $e=d(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.isCharacterRange=A.CharacterRange=A.isAssignment=A.Assignment=A.isAlternatives=A.Alternatives=A.isAction=A.Action=A.isTypeAttribute=A.TypeAttribute=A.isType=A.Type=A.isTerminalRule=A.TerminalRule=A.isReturnType=A.ReturnType=A.isParserRule=A.ParserRule=A.isParameterReference=A.ParameterReference=A.isParameter=A.Parameter=A.isNegation=A.Negation=A.isNamedArgument=A.NamedArgument=A.isLiteralCondition=A.LiteralCondition=A.isInterface=A.Interface=A.isInferredType=A.InferredType=A.isGrammarImport=A.GrammarImport=A.isGrammar=A.Grammar=A.isDisjunction=A.Disjunction=A.isConjunction=A.Conjunction=A.isAtomType=A.AtomType=A.isAbstractElement=A.AbstractElement=A.isCondition=A.Condition=A.isAbstractType=A.AbstractType=A.isAbstractRule=A.AbstractRule=void 0;A.reflection=A.LangiumGrammarAstReflection=A.isWildcard=A.Wildcard=A.isUntilToken=A.UntilToken=A.isUnorderedGroup=A.UnorderedGroup=A.isTerminalRuleCall=A.TerminalRuleCall=A.isTerminalGroup=A.TerminalGroup=A.isTerminalAlternatives=A.TerminalAlternatives=A.isRuleCall=A.RuleCall=A.isRegexToken=A.RegexToken=A.isNegatedToken=A.NegatedToken=A.isKeyword=A.Keyword=A.isGroup=A.Group=A.isCrossReference=A.CrossReference=void 0;var hG=mr();A.AbstractRule="AbstractRule";function yG(t){return A.reflection.isInstance(t,A.AbstractRule)}A.isAbstractRule=yG;A.AbstractType="AbstractType";function gG(t){return A.reflection.isInstance(t,A.AbstractType)}A.isAbstractType=gG;A.Condition="Condition";function vG(t){return A.reflection.isInstance(t,A.Condition)}A.isCondition=vG;A.AbstractElement="AbstractElement";function TG(t){return A.reflection.isInstance(t,A.AbstractElement)}A.isAbstractElement=TG;A.AtomType="AtomType";function _G(t){return A.reflection.isInstance(t,A.AtomType)}A.isAtomType=_G;A.Conjunction="Conjunction";function RG(t){return A.reflection.isInstance(t,A.Conjunction)}A.isConjunction=RG;A.Disjunction="Disjunction";function AG(t){return A.reflection.isInstance(t,A.Disjunction)}A.isDisjunction=AG;A.Grammar="Grammar";function SG(t){return A.reflection.isInstance(t,A.Grammar)}A.isGrammar=SG;A.GrammarImport="GrammarImport";function bG(t){return A.reflection.isInstance(t,A.GrammarImport)}A.isGrammarImport=bG;A.InferredType="InferredType";function CG(t){return A.reflection.isInstance(t,A.InferredType)}A.isInferredType=CG;A.Interface="Interface";function PG(t){return A.reflection.isInstance(t,A.Interface)}A.isInterface=PG;A.LiteralCondition="LiteralCondition";function kG(t){return A.reflection.isInstance(t,A.LiteralCondition)}A.isLiteralCondition=kG;A.NamedArgument="NamedArgument";function EG(t){return A.reflection.isInstance(t,A.NamedArgument)}A.isNamedArgument=EG;A.Negation="Negation";function wG(t){return A.reflection.isInstance(t,A.Negation)}A.isNegation=wG;A.Parameter="Parameter";function NG(t){return A.reflection.isInstance(t,A.Parameter)}A.isParameter=NG;A.ParameterReference="ParameterReference";function $G(t){return A.reflection.isInstance(t,A.ParameterReference)}A.isParameterReference=$G;A.ParserRule="ParserRule";function OG(t){return A.reflection.isInstance(t,A.ParserRule)}A.isParserRule=OG;A.ReturnType="ReturnType";function IG(t){return A.reflection.isInstance(t,A.ReturnType)}A.isReturnType=IG;A.TerminalRule="TerminalRule";function DG(t){return A.reflection.isInstance(t,A.TerminalRule)}A.isTerminalRule=DG;A.Type="Type";function xG(t){return A.reflection.isInstance(t,A.Type)}A.isType=xG;A.TypeAttribute="TypeAttribute";function LG(t){return A.reflection.isInstance(t,A.TypeAttribute)}A.isTypeAttribute=LG;A.Action="Action";function qG(t){return A.reflection.isInstance(t,A.Action)}A.isAction=qG;A.Alternatives="Alternatives";function MG(t){return A.reflection.isInstance(t,A.Alternatives)}A.isAlternatives=MG;A.Assignment="Assignment";function FG(t){return A.reflection.isInstance(t,A.Assignment)}A.isAssignment=FG;A.CharacterRange="CharacterRange";function jG(t){return A.reflection.isInstance(t,A.CharacterRange)}A.isCharacterRange=jG;A.CrossReference="CrossReference";function GG(t){return A.reflection.isInstance(t,A.CrossReference)}A.isCrossReference=GG;A.Group="Group";function UG(t){return A.reflection.isInstance(t,A.Group)}A.isGroup=UG;A.Keyword="Keyword";function HG(t){return A.reflection.isInstance(t,A.Keyword)}A.isKeyword=HG;A.NegatedToken="NegatedToken";function KG(t){return A.reflection.isInstance(t,A.NegatedToken)}A.isNegatedToken=KG;A.RegexToken="RegexToken";function WG(t){return A.reflection.isInstance(t,A.RegexToken)}A.isRegexToken=WG;A.RuleCall="RuleCall";function BG(t){return A.reflection.isInstance(t,A.RuleCall)}A.isRuleCall=BG;A.TerminalAlternatives="TerminalAlternatives";function VG(t){return A.reflection.isInstance(t,A.TerminalAlternatives)}A.isTerminalAlternatives=VG;A.TerminalGroup="TerminalGroup";function zG(t){return A.reflection.isInstance(t,A.TerminalGroup)}A.isTerminalGroup=zG;A.TerminalRuleCall="TerminalRuleCall";function YG(t){return A.reflection.isInstance(t,A.TerminalRuleCall)}A.isTerminalRuleCall=YG;A.UnorderedGroup="UnorderedGroup";function XG(t){return A.reflection.isInstance(t,A.UnorderedGroup)}A.isUnorderedGroup=XG;A.UntilToken="UntilToken";function JG(t){return A.reflection.isInstance(t,A.UntilToken)}A.isUntilToken=JG;A.Wildcard="Wildcard";function QG(t){return A.reflection.isInstance(t,A.Wildcard)}A.isWildcard=QG;var wc=class extends hG.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","Assignment","AtomType","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","RegexToken","ReturnType","RuleCall","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case A.Conjunction:case A.Disjunction:case A.LiteralCondition:case A.Negation:case A.ParameterReference:return this.isSubtype(A.Condition,r);case A.Interface:case A.Type:return this.isSubtype(A.AbstractType,r);case A.ParserRule:return this.isSubtype(A.AbstractRule,r)||this.isSubtype(A.AbstractType,r);case A.TerminalRule:return this.isSubtype(A.AbstractRule,r);case A.Action:return this.isSubtype(A.AbstractElement,r)||this.isSubtype(A.AbstractType,r);case A.Alternatives:case A.Assignment:case A.CharacterRange:case A.CrossReference:case A.Group:case A.Keyword:case A.NegatedToken:case A.RegexToken:case A.RuleCall:case A.TerminalAlternatives:case A.TerminalGroup:case A.TerminalRuleCall:case A.UnorderedGroup:case A.UntilToken:case A.Wildcard:return this.isSubtype(A.AbstractElement,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"AtomType:refType":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":return A.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return A.AbstractRule;case"Grammar:usedGrammars":return A.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return A.Parameter;case"TerminalRuleCall:rule":return A.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"AtomType":return{name:"AtomType",mandatory:[{name:"isArray",type:"boolean"},{name:"isRef",type:"boolean"}]};case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"Type":return{name:"Type",mandatory:[{name:"typeAlternatives",type:"array"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"},{name:"typeAlternatives",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};A.LangiumGrammarAstReflection=wc;A.reflection=new wc});var yi=d(vt=>{"use strict";Object.defineProperty(vt,"__esModule",{value:!0});vt.addSubTypes=vt.sortInterfacesTopologically=vt.mergeTypesAndInterfaces=vt.mergeInterfaces=vt.comparePropertyType=vt.collectSuperTypes=vt.collectChildrenTypes=vt.distinctAndSorted=vt.collectAllProperties=void 0;var ZG=Pr(),wa=$e();function e2(t){let e=new ZG.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.printingSuperTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}vt.collectAllProperties=e2;function Ih(t,e){return Array.from(new Set(t)).sort(e)}vt.distinctAndSorted=Ih;function UA(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,wa.isInterface)(u)?(i.add(u),UA(u,e,r,n).forEach(c=>i.add(c))):u&&(0,wa.isType)(u.$container)&&i.add(u.$container)}),i}vt.collectChildrenTypes=UA;function Dh(t){let e=new Set;return(0,wa.isInterface)(t)?(e.add(t),t.superTypes.forEach(r=>{if((0,wa.isInterface)(r.ref)){e.add(r.ref);let n=Dh(r.ref);for(let i of n)e.add(i)}})):(0,wa.isType)(t)&&t.typeAlternatives.forEach(r=>{var n;if(!((n=r.refType)===null||n===void 0)&&n.ref&&((0,wa.isInterface)(r.refType.ref)||(0,wa.isType)(r.refType.ref))){let i=Dh(r.refType.ref);for(let a of i)e.add(a)}}),e}vt.collectSuperTypes=Dh;function t2(t,e){return t.array===e.array&&t.reference===e.reference&&r2(t.types,e.types)}vt.comparePropertyType=t2;function r2(t,e,r=(n,i)=>n===i){let n=Ih(t),i=Ih(e);return n.length!==i.length?!1:i.every((a,o)=>r(a,n[o]))}function n2(t,e){return t.interfaces.concat(e.interfaces)}vt.mergeInterfaces=n2;function i2(t){return t.interfaces.concat(t.unions)}vt.mergeTypesAndInterfaces=i2;function a2(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.realSuperTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}vt.sortInterfacesTopologically=a2;function o2(t){var e;for(let r of t.values())for(let n of r.realSuperTypes)(e=t.get(n))===null||e===void 0||e.subTypes.add(r.name)}vt.addSubTypes=o2});var Lh=d(Nc=>{"use strict";Object.defineProperty(Nc,"__esModule",{value:!0});Nc.processGeneratorNode=void 0;var Pu=Eo(),xh=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}append(e){e.length>0&&this.lines[this.currentLineNumber].push(e)}increaseIndent(e){this.currentIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([])}};function s2(t,e){let r=new xh(e);return HA(t,r),r.content}Nc.processGeneratorNode=s2;function HA(t,e){typeof t=="string"?u2(t,e):t instanceof Pu.IndentNode?l2(t,e):t instanceof Pu.CompositeGeneratorNode?BA(t,e):t instanceof Pu.NewLineNode&&c2(t,e)}function KA(t,e){return typeof t=="string"?VA(t):t instanceof Pu.CompositeGeneratorNode?t.contents.some(r=>KA(r,e)):t instanceof Pu.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function u2(t,e){t&&(e.pendingIndent&&WA(e,!1),e.append(t))}function WA(t,e){var r;let n="";for(let i of t.currentIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n),t.pendingIndent=!1}function BA(t,e){for(let r of t.contents)HA(r,e)}function l2(t,e){var r;if(KA(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation);try{e.increaseIndent(t),BA(t,e)}finally{e.decreaseIndent()}}}function c2(t,e){t.ifNotEmpty&&!VA(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&WA(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function VA(t){return t.trimStart()!==""}});var Eo=d(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.NLEmpty=Ze.NL=Ze.NewLineNode=Ze.IndentNode=Ze.CompositeGeneratorNode=Ze.toString=Ze.isNewLineNode=Ze.isGeneratorNode=Ze.EOL=void 0;var f2=Lh();Ze.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function zA(t){return t instanceof ku||t instanceof Eu||t instanceof Na}Ze.isGeneratorNode=zA;function d2(t){return t instanceof Na}Ze.isNewLineNode=d2;function p2(t,e){return zA(t)?(0,f2.processGeneratorNode)(t,e):String(t)}Ze.toString=p2;var ku=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,r){return e?this.append(...r):this}appendNewLine(){return this.append(Ze.NL)}appendNewLineIf(e){return e?this.append(Ze.NL):this}appendNewLineIfNotEmpty(){return this.append(Ze.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}indent(e,r){let n=new Eu(r,!1);return this.contents.push(n),e&&e(n),this}};Ze.CompositeGeneratorNode=ku;var Eu=class extends ku{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Ze.IndentNode=Eu;var Na=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Ze.EOL,this.ifNotEmpty=r}};Ze.NewLineNode=Na;Ze.NL=new Na;Ze.NLEmpty=new Na(void 0,!0)});var Bi=d(hr=>{"use strict";Object.defineProperty(hr,"__esModule",{value:!0});hr.propertyTypesToString=hr.TypeResolutionError=hr.InterfaceType=hr.UnionType=hr.isInterfaceType=hr.isUnionType=void 0;var Tt=Eo(),$c=Lh(),m2=Pr(),wo=yi();function h2(t){return t&&"alternatives"in t}hr.isUnionType=h2;function y2(t){return t&&"properties"in t}hr.isInterfaceType=y2;var qh=class{constructor(e,r,n){var i;this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.name=e,this.alternatives=r,this.reflection=(i=n?.reflection)!==null&&i!==void 0?i:!1}toAstTypesString(){let e=new Tt.CompositeGeneratorNode;return e.append(`export type ${this.name} = ${Oc(this.alternatives,"AstType")};`,Tt.NL),this.reflection&&(e.append(Tt.NL),XA(e,this.name)),(0,$c.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode;return r.append(`type ${jh(this.name,e)} = ${Oc(this.alternatives,"DeclaredType")};`,Tt.NL),(0,$c.processGeneratorNode)(r)}};hr.UnionType=qh;var Mh=class{constructor(e,r,n){this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.printingSuperTypes=[],this.superProperties=new m2.MultiMap,this.name=e,this.realSuperTypes=new Set(r),this.printingSuperTypes=[...r],this.properties=n,n.forEach(i=>this.superProperties.add(i.name,i))}toAstTypesString(){let e=new Tt.CompositeGeneratorNode,r=this.printingSuperTypes.length>0?(0,wo.distinctAndSorted)([...this.printingSuperTypes]):["AstNode"];return e.append(`export interface ${this.name} extends ${r.join(", ")} {`,Tt.NL),e.indent(n=>{this.containerTypes.size>0&&n.append(`readonly $container: ${(0,wo.distinctAndSorted)([...this.containerTypes]).join(" | ")};`,Tt.NL),this.typeTypes.size>0&&n.append(`readonly $type: ${(0,wo.distinctAndSorted)([...this.typeTypes]).map(i=>`'${i}'`).join(" | ")};`,Tt.NL),YA(n,this.properties,"AstType")}),e.append("}",Tt.NL),e.append(Tt.NL),XA(e,this.name),(0,$c.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode,n=jh(this.name,e),i=Array.from(this.printingSuperTypes).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,Tt.NL),r.indent(a=>YA(a,this.properties,"DeclaredType",e)),r.append("}",Tt.NL),(0,$c.processGeneratorNode)(r)}};hr.InterfaceType=Mh;var Fh=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};hr.TypeResolutionError=Fh;function Oc(t,e="AstType"){function r(n){let i=(0,wo.distinctAndSorted)(n.types).join(" | ");return i=n.reference?e==="AstType"?`Reference<${i}>`:`@${i}`:i,i=n.array?e==="AstType"?`Array<${i}>`:`${i}[]`:i,i}return(0,wo.distinctAndSorted)(t.map(r)).join(" | ")}hr.propertyTypesToString=Oc;function YA(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:jh(a.name,n),s=a.optional&&!a.typeAlternatives.some(l=>l.array)&&!a.typeAlternatives.every(l=>l.types.length===1&&l.types[0]==="boolean"),u=Oc(a.typeAlternatives,r);return`${o}${s?"?":""}: ${u}`}(0,wo.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),Tt.NL))}function XA(t,e){t.append(`export const ${e} = '${e}';`,Tt.NL),t.append(Tt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,Tt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,Tt.NL)),t.append("}",Tt.NL)}function jh(t,e){return e.has(t)?`^${t}`:t}});var $o=d(No=>{"use strict";Object.defineProperty(No,"__esModule",{value:!0});No.DefaultNameProvider=No.isNamed=void 0;var g2=kt();function JA(t){return typeof t.name=="string"}No.isNamed=JA;var Gh=class{getName(e){if(JA(e))return e.name}getNameNode(e){return(0,g2.findNodeForProperty)(e.$cstNode,"name")}};No.DefaultNameProvider=Gh});var Ie=d(et=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.copyAstNode=et.findLocalReferences=et.streamReferences=et.streamAst=et.streamAllContents=et.streamContents=et.findRootNode=et.getDocument=et.hasContainerOfType=et.getContainerOfType=et.linkContentToContainer=void 0;var qn=mr(),$a=xt();function QA(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,qn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,qn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}et.linkContentToContainer=QA;function v2(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}et.getContainerOfType=v2;function T2(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}et.hasContainerOfType=T2;function ZA(t){let r=eS(t).$document;if(!r)throw new Error("AST node has no document.");return r}et.getDocument=ZA;function eS(t){for(;t.$container;)t=t.$container;return t}et.findRootNode=eS;function Hh(t){if(!t)throw new Error("Node must be an AstNode.");return new $a.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,qn.isAstNode)(n))return e.keyIndex++,{done:!1,value:n};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,qn.isAstNode)(a))return{done:!1,value:a}}e.arrayIndex=0}}e.keyIndex++}return $a.DONE_RESULT})}et.streamContents=Hh;function _2(t){if(!t)throw new Error("Root node must be an AstNode.");return new $a.TreeStreamImpl(t,e=>Hh(e))}et.streamAllContents=_2;function tS(t){if(!t)throw new Error("Root node must be an AstNode.");return new $a.TreeStreamImpl(t,e=>Hh(e),{includeRoot:!0})}et.streamAst=tS;function rS(t){return new $a.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,qn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,qn.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return $a.DONE_RESULT})}et.streamReferences=rS;function R2(t,e=ZA(t).parseResult.value){let r=[];return tS(e).forEach(n=>{rS(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,$a.stream)(r)}et.findLocalReferences=R2;function Uh(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,qn.isAstNode)(i))r[n]=Uh(i,e);else if((0,qn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,qn.isAstNode)(o)?a.push(Uh(o,e)):(0,qn.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return QA(r),r}et.copyAstNode=Uh});var wu=d((nS,Ic)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof Ic=="object"&&Ic.exports?Ic.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:nS,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var R=this.disjunction();this.consumeChar("/");for(var P={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(P,"global");break;case"i":o(P,"ignoreCase");break;case"m":o(P,"multiLine");break;case"u":o(P,"unicode");break;case"y":o(P,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:P,value:R,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],R=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(R)}},t.prototype.alternative=function(){for(var y=[],R=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(R)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var R;switch(this.popChar()){case"=":R="Lookahead";break;case"!":R="NegativeLookahead";break}s(R);var P=this.disjunction();return this.consumeChar(")"),{type:R,value:P,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var R,P=this.idx;switch(this.popChar()){case"*":R={atLeast:0,atMost:1/0};break;case"+":R={atLeast:1,atMost:1/0};break;case"?":R={atLeast:0,atMost:1};break;case"{":var k=this.integerIncludingZero();switch(this.popChar()){case"}":R={atLeast:k,atMost:k};break;case",":var b;this.isDigit()?(b=this.integerIncludingZero(),R={atLeast:k,atMost:b}):R={atLeast:k,atMost:1/0},this.consumeChar("}");break}if(y===!0&&R===void 0)return;s(R);break}if(!(y===!0&&R===void 0))return s(R),this.peekChar(0)==="?"?(this.consumeChar("?"),R.greedy=!1):R.greedy=!0,R.type="Quantifier",R.loc=this.loc(P),R},t.prototype.atom=function(){var y,R=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(R),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,R=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,R=!0;break;case"s":y=h;break;case"S":y=h,R=!0;break;case"w":y=f;break;case"W":y=f,R=!0;break}return s(y),{type:"Set",value:y,complement:R}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var R=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:R}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],R=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),R=!0);this.isClassAtom();){var P=this.classAtom(),k=P.type==="Character";if(k&&this.isRangeDash()){this.consumeChar("-");var b=this.classAtom(),S=b.type==="Character";if(S){if(b.value<P.value)throw Error("Range out of order in character class");y.push({from:P.value,to:b.value})}else a(P.value,y),y.push(i("-")),a(b.value,y)}else a(P.value,y)}return this.consumeChar("]"),{type:"Set",complement:R,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var R=this.disjunction();this.consumeChar(")");var P={type:"Group",capturing:y,value:R};return y&&(P.idx=this.groupIdx),P},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var R="",P=0;P<y;P++){var k=this.popChar();if(e.test(k)===!1)throw Error("Expecting a HexDecimal digits");R+=k}var b=parseInt(R,16);return{type:"Character",value:b}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,R){y.length!==void 0?y.forEach(function(P){R.push(P)}):R.push(y)}function o(y,R){if(y[R]===!0)throw"duplicate flag "+R;y[R]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var h=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var R in y){var P=y[R];y.hasOwnProperty(R)&&(P.type!==void 0?this.visit(P):Array.isArray(P)&&P.forEach(function(k){this.visit(k)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var Oo=d(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});Zt.partialRegex=Zt.partialMatches=Zt.getCaseInsensitivePattern=Zt.escapeRegExp=Zt.isWhitespaceRegExp=Zt.isMultilineComment=Zt.getTerminalParts=void 0;var iS=wu(),aS=new iS.RegExpParser,Kh=class extends iS.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Wh(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}},Oa=new Kh;function A2(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=aS.pattern(t),r=[];for(let n of e.value.value)Oa.reset(t),Oa.visit(n),r.push({start:Oa.startRegex,end:Oa.endRegex});return r}catch{return[]}}Zt.getTerminalParts=A2;function S2(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Oa.reset(t),Oa.visit(aS.pattern(t)),Oa.multiline}catch{return!1}}Zt.isMultilineComment=S2;function b2(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}Zt.isWhitespaceRegExp=b2;function Wh(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}Zt.escapeRegExp=Wh;function C2(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Wh(e)).join("")}Zt.getCaseInsensitivePattern=C2;function P2(t,e){let r=oS(t),n=e.match(r);return!!n&&n[0].length>0}Zt.partialMatches=P2;function oS(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}Zt.partialRegex=oS});var Et=d(le=>{"use strict";var k2=le&&le.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),E2=le&&le.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),w2=le&&le.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&k2(e,t,r);return E2(e,t),e};Object.defineProperty(le,"__esModule",{value:!0});le.isPrimitiveType=le.extractAssignments=le.resolveTransitiveImports=le.resolveImport=le.resolveImportUri=le.terminalRegex=le.getRuleType=le.getActionType=le.getExplicitRuleType=le.getTypeNameWithoutError=le.getTypeName=le.getActionAtElement=le.isDataTypeRule=le.isArrayOperator=le.isArrayCardinality=le.isOptionalCardinality=void 0;var be=w2($e()),sS=Ln(),Dc=Ie(),N2=Bi(),$2=Oo();function O2(t){return t==="?"||t==="*"}le.isOptionalCardinality=O2;function I2(t){return t==="*"||t==="+"}le.isArrayCardinality=I2;function D2(t){return t==="+="}le.isArrayOperator=D2;function zh(t){return uS(t,new Set)}le.isDataTypeRule=zh;function uS(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,Dc.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!uS(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function lS(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(be.isAction(a))return a;{let o=(0,Dc.streamAllContents)(r[i]).find(be.isAction);if(o)return o}}}if(be.isAbstractElement(e))return lS(e)}le.getActionAtElement=lS;function Yh(t){var e;if(be.isParserRule(t))return zh(t)?t.name:(e=Xh(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=cS(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new N2.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}le.getTypeName=Yh;function x2(t){try{return Yh(t)}catch{return"never"}}le.getTypeNameWithoutError=x2;function Xh(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}le.getExplicitRuleType=Xh;function cS(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Yh(t.type.ref)}le.getActionType=cS;function L2(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":zh(t)?t.name:(n=Xh(t))!==null&&n!==void 0?n:t.name}le.getRuleType=L2;function fS(t){return Nu(t.definition)}le.terminalRegex=fS;var Jh=/[\s\S]/.source;function Nu(t){if(be.isTerminalAlternatives(t))return q2(t);if(be.isTerminalGroup(t))return M2(t);if(be.isCharacterRange(t))return G2(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return gi(fS(e),t.cardinality)}else{if(be.isNegatedToken(t))return j2(t);if(be.isUntilToken(t))return F2(t);if(be.isRegexToken(t))return gi(t.regex,t.cardinality,!1);if(be.isWildcard(t))return gi(Jh,t.cardinality);throw new Error("Invalid terminal element.")}}function q2(t){return gi(t.elements.map(Nu).join("|"),t.cardinality)}function M2(t){return gi(t.elements.map(Nu).join(""),t.cardinality)}function F2(t){return gi(`${Jh}*?${Nu(t.terminal)}`,t.cardinality)}function j2(t){return gi(`(?!${Nu(t.terminal)})${Jh}*?`,t.cardinality)}function G2(t){return t.right?gi(`[${Bh(t.left)}-${Bh(t.right)}]`,t.cardinality,!1):gi(Bh(t.left),t.cardinality,!1)}function Bh(t){return(0,$2.escapeRegExp)(t.value)}function gi(t,e,r=!0){return r&&(t=`(${t})`),e?`${t}${e}`:t}function dS(t){if(t.path===void 0||t.path.length===0)return;let e=sS.Utils.dirname((0,Dc.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),sS.Utils.resolvePath(e,r)}le.resolveImportUri=dS;function Qh(t,e){let r=dS(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch{}}le.resolveImport=Qh;function U2(t,e){if(be.isGrammarImport(e)){let r=Qh(t,e);if(r){let n=Vh(t,r);return n.push(r),n}return[]}else return Vh(t,e)}le.resolveTransitiveImports=U2;function Vh(t,e,r=e,n=new Set,i=new Set){let a=(0,Dc.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=Qh(t,o);s&&Vh(t,s,r,n,i)}}return Array.from(i)}function pS(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>pS(e)):[]}le.extractAssignments=pS;var H2=["string","number","boolean","Date","bigint"];function K2(t){return H2.includes(t)}le.isPrimitiveType=K2});var vS=d(Lc=>{"use strict";Object.defineProperty(Lc,"__esModule",{value:!0});Lc.collectInferredTypes=void 0;var W2=$o(),mS=Pr(),B2=xt(),wt=$e(),vi=Et(),V2=yi(),xc=Bi(),Zh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:this.copyTypeAlternative(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return gS(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(this.copyTypeAlternative(e));return n}copyTypeAlternative(e){function r(n){return{name:n.name,optional:n.optional,typeAlternatives:n.typeAlternatives,astNodes:n.astNodes}}return{name:e.name,super:e.super,ruleCalls:e.ruleCalls,properties:e.properties.map(n=>r(n))}}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ia();r.parents=e;for(let n of e)n.children.push(r);return r}};function z2(t,e){var r;let n=[],i={fragments:new Map};for(let u of t)n.push(...hS(i,u));let a=Z2(n),o=tU(a),s=rU(a,o);for(let u of e){let l=(0,wt.isAlternatives)(u.definition)&&u.definition.elements.every(c=>(0,wt.isKeyword)(c))?(0,B2.stream)(u.definition.elements).filter(wt.isKeyword).map(c=>`'${c.value}'`).toArray():[(r=(0,vi.getExplicitRuleType)(u))!==null&&r!==void 0?r:"string"];s.unions.push(new xc.UnionType(u.name,$u(!1,!1,l)))}return s}Lc.collectInferredTypes=z2;function hS(t,e){let r=Ia(e),n=new Zh(t,r);return e.definition&&ey(n,n.root,e.definition),n.getTypes()}function Ia(t){return{name:(0,wt.isParserRule)(t)||(0,wt.isAction)(t)?(0,vi.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function ey(t,e,r){let n=(0,vi.isOptionalCardinality)(r.cardinality);if((0,wt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,Ia()));for(let a of r.elements){let o=t.connect(e,Ia());i.push(ey(t,o,a))}return t.merge(...i)}else if((0,wt.isGroup)(r)||(0,wt.isUnorderedGroup)(r)){let i=t.connect(e,Ia());for(let a of r.elements)i=ey(t,i,a);if(n){let a=t.connect(e,Ia());return t.merge(a,i)}else return i}else{if((0,wt.isAction)(r))return Y2(t,e,r);(0,wt.isAssignment)(r)?X2(e,r):(0,wt.isRuleCall)(r)&&J2(t,e,r)}return e}function Y2(t,e,r){var n;let i=t.connect(e,Ia(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,W2.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,typeAlternatives:$u(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function X2(t,e){let r={types:new Set,reference:!1};yS(e.terminal,r);let n=$u(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,vi.isOptionalCardinality)(e.cardinality),typeAlternatives:n,astNodes:new Set([e])})}function yS(t,e){if((0,wt.isAlternatives)(t)||(0,wt.isUnorderedGroup)(t)||(0,wt.isGroup)(t))for(let r of t.elements)yS(r,e);else(0,wt.isKeyword)(t)?e.types.add(`'${t.value}'`):(0,wt.isRuleCall)(t)&&t.rule.ref?e.types.add((0,vi.getRuleType)(t.rule.ref)):(0,wt.isCrossReference)(t)&&t.type.ref&&(e.types.add((0,vi.getTypeNameWithoutError)(t.type.ref)),e.reference=!0)}function J2(t,e,r){let n=r.rule.ref;if((0,wt.isParserRule)(n)&&n.fragment){let i=Q2(n,t.context);(0,vi.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,wt.isParserRule)(n)&&e.ruleCalls.push((0,vi.getRuleType)(n))}function Q2(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,vi.getTypeNameWithoutError)(t),a=hS(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function Z2(t){let e=new Map,r=[],n=gS(t).map(i=>i.alt);for(let i of n){let a=new xc.InterfaceType(i.name,i.super,i.properties);e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.realSuperTypes.add(i.name)}return Array.from(e.values())}function gS(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new mS.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let h=a.find(v=>v.name===f.name);h?(f.typeAlternatives.filter(eU(h.typeAlternatives)).forEach(v=>h.typeAlternatives.push(v)),f.astNodes.forEach(v=>h.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function eU(t){return e=>!t.some(r=>(0,V2.comparePropertyType)(r,e))}function tU(t){let e=[],r=new mS.MultiMap;for(let n of t)for(let i of n.realSuperTypes)r.add(i,n.name);for(let[n,i]of r.entriesGroupedByKey())t.some(a=>a.name===n)||e.push(new xc.UnionType(n,$u(!1,!1,i),{reflection:!0}));return e}function rU(t,e){var r;for(let a of t)for(let o of a.realSuperTypes)(r=t.find(s=>s.name===o))===null||r===void 0||r.subTypes.add(a.name);let n={interfaces:[],unions:e},i=new Set(e.map(a=>a.name));for(let a of t)if(a.properties.length===0&&a.subTypes.size>0){let o=$u(!1,!1,Array.from(a.subTypes)),s=e.find(u=>u.name===a.name);if(s)s.alternatives.push(...o);else{let u=new xc.UnionType(a.name,o,{reflection:!0});u.realSuperTypes=a.realSuperTypes,n.unions.push(u),i.add(a.name)}}else n.interfaces.push(a);for(let a of n.interfaces)a.printingSuperTypes=[...a.realSuperTypes].filter(o=>!i.has(o));return n}function $u(t,e,r){return t||e?[{array:t,reference:e,types:r}]:r.map(n=>({array:t,reference:e,types:[n]}))}});var AS=d(qc=>{"use strict";Object.defineProperty(qc,"__esModule",{value:!0});qc.collectDeclaredTypes=void 0;var RS=Et(),TS=Bi();function nU(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=n.superTypes.filter(o=>o.ref).map(o=>(0,RS.getTypeNameWithoutError)(o.ref)),a=n.attributes.map(o=>({name:o.name,optional:o.isOptional===!0,typeAlternatives:o.typeAlternatives.map(_S),astNodes:new Set([o])}));r.interfaces.push(new TS.InterfaceType(n.name,i,a))}for(let n of e){let i=n.typeAlternatives.map(_S),a=n.typeAlternatives.length>1&&n.typeAlternatives.some(o=>{var s;return((s=o.refType)===null||s===void 0?void 0:s.ref)!==void 0});r.unions.push(new TS.UnionType(n.name,i,{reflection:a}))}return r}qc.collectDeclaredTypes=nU;function _S(t){var e,r;let n=[];return t.refType?n=[t.refType.ref?(0,RS.getTypeNameWithoutError)(t.refType.ref):t.refType.$refText]:n=[(e=t.primitiveType)!==null&&e!==void 0?e:`'${(r=t.keywordType)===null||r===void 0?void 0:r.value}'`],{types:n,reference:t.isRef===!0,array:t.isArray===!0}}});var ry=d(Io=>{"use strict";Object.defineProperty(Io,"__esModule",{value:!0});Io.collectAllAstResources=Io.collectTypeResources=void 0;var iU=vS(),aU=AS(),oU=Ie(),sU=Pr(),uU=$e(),SS=Et(),lU=yi(),cU=Bi();function fU(t,e){let r=ty(t,e),n=(0,iU.collectInferredTypes)(r.parserRules,r.datatypeRules),i=(0,aU.collectDeclaredTypes)(r.interfaces,r.types);return pU(n,i),dU((0,lU.mergeInterfaces)(n,i)),{astResources:r,inferred:n,declared:i}}Io.collectTypeResources=fU;function dU(t){function e(r,n=new Set){if(!n.has(r)){n.add(r);for(let i of r.printingSuperTypes){let a=t.find(o=>o.name===i);a&&(0,cU.isInterfaceType)(a)&&(e(a),a.superProperties.entriesGroupedByKey().forEach(o=>r.superProperties.addAll(o[0],o[1])))}}}for(let r of t)e(r)}function pU(t,e){let r=new sU.MultiMap,n=t.unions.concat(e.unions);for(let a of n)if(a.reflection)for(let o of a.alternatives)o.types.forEach(s=>r.add(s,a.name));function i(a,o,s){var u;let l=(u=a.interfaces.find(c=>c.name===o))!==null&&u!==void 0?u:a.unions.find(c=>c.name===o);l&&s.forEach(c=>l.realSuperTypes.add(c))}for(let[a,o]of r.entriesGroupedByKey())i(t,a,o),i(e,a,o)}function ty(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,oU.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,uU.isParserRule)(o)&&!o.fragment&&((0,SS.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,SS.resolveImport)(e,s));ty(o,e,r,n)}}}return n}Io.collectAllAstResources=ty});var kS=d(Do=>{"use strict";Object.defineProperty(Do,"__esModule",{value:!0});Do.specifyAstNodeProperties=Do.collectAst=void 0;var CS=yi(),ny=Bi(),mU=ry(),hU=Et();function yU(t,e){let{inferred:r,declared:n}=(0,mU.collectTypeResources)(t,e),i={interfaces:(0,CS.sortInterfacesTopologically)(bS(r.interfaces,n.interfaces)),unions:bS(r.unions,n.unions)};return PS(i),i}Do.collectAst=yU;function bS(t,e){return Array.from(t.concat(e).reduce((r,n)=>(r.set(n.name,n),r),new Map).values()).sort((r,n)=>r.name.localeCompare(n.name))}function PS(t){let e=vU(t);(0,CS.addSubTypes)(e),TU(e),gU(e)}Do.specifyAstNodeProperties=PS;function gU(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeTypes.add(n.name);let i=Array.from(n.realSuperTypes).map(a=>t.get(a)).filter(a=>a!==void 0);for(let a of i)n.typeTypes.forEach(o=>a.typeTypes.add(o));e.push(...i.filter(a=>!r.has(a)))}}function vU({interfaces:t,unions:e}){let r=t.concat(e).reduce((a,o)=>(a.set(o.name,o),a),new Map),n=new Map;function i(a,o=new Set){if(n.has(a))return n.get(a);if(o.has(a))return!0;o.add(a);let s=a.alternatives.flatMap(u=>u.types).filter(u=>!(0,hU.isPrimitiveType)(u));if(s.length===0)return!0;for(let u of s){let l=r.get(u);if(l&&((0,ny.isInterfaceType)(l)||(0,ny.isUnionType)(l)&&!i(l,o)))return!1}return!0}for(let a of e){let o=i(a);n.set(a,o)}for(let[a,o]of n)o&&r.delete(a.name);return r}function TU(t){var e;let r=Array.from(t.values()),n=r.filter(a=>(0,ny.isInterfaceType)(a));for(let a of n){let o=a.properties.flatMap(s=>s.typeAlternatives.filter(u=>!u.reference).flatMap(u=>u.types));for(let s of o)(e=t.get(s))===null||e===void 0||e.containerTypes.add(a.name)}let i=_U(r);RU(i)}function _U(t){function e(i){let a=[i];n.add(i.name);let o=[...i.subTypes,...i.realSuperTypes];for(let s of o)if(!n.has(s)){let u=t.find(l=>l.name===s);u&&a.push(...e(u))}return a}let r=[],n=new Set;for(let i of t)n.has(i.name)||r.push(e(i));return r}function RU(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var iy=d(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.interpretAstReflection=void 0;var AU=mr(),ES=Pr(),SU=$e(),bU=kS(),CU=yi();function PU(t,e){let r;(0,SU.isGrammar)(t)?r=(0,bU.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=kU(r),a=EU(r),o=NU(r);return{getAllTypes(){return n},getReferenceType(s){let u=`${s.container.$type}:${s.property}`,l=i.get(u);if(l)return l;throw new Error("Could not find reference type for "+u)},getTypeMetaData(s){var u;return(u=a.get(s))!==null&&u!==void 0?u:{name:s,mandatory:[]}},isInstance(s,u){return(0,AU.isAstNode)(s)&&this.isSubtype(s.$type,u)},isSubtype(s,u){if(s===u)return!0;let l=o.get(s);for(let c of l)if(this.isSubtype(c,u))return!0;return!1}}}Mc.interpretAstReflection=PU;function kU(t){let e=new ES.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of i.typeAlternatives)a.reference&&e.add(n.name,[i.name,a.types[0]]);for(let i of n.printingSuperTypes){let a=e.get(i);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function EU(t){let e=new Map,r=(0,CU.collectAllProperties)(t.interfaces);for(let n of t.interfaces){let i=r.get(n.name),a=i.filter(s=>s.typeAlternatives.some(u=>u.array)),o=i.filter(s=>s.typeAlternatives.every(u=>!u.array&&u.types.includes("boolean")));(a.length>0||o.length>0)&&e.set(n.name,{name:n.name,mandatory:wU(a,o)})}return e}function wU(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}function NU(t){let e=new ES.MultiMap;for(let r of t.interfaces)e.addAll(r.name,r.realSuperTypes);for(let r of t.unions)e.addAll(r.name,r.realSuperTypes);return e}});var wS=d(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.LangiumGrammarGrammar=void 0;var $U=kt(),Fc,OU=()=>Fc??(Fc=(0,$U.loadGrammarFromJson)(`{
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
}`));jc.LangiumGrammarGrammar=OU});var NS=d(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.LangiumGrammarGeneratedModule=Fr.LangiumGrammarGeneratedSharedModule=Fr.LangiumGrammarParserConfig=Fr.LangiumGrammarLanguageMetaData=void 0;var IU=$e(),DU=wS();Fr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Fr.LangiumGrammarParserConfig={maxLookahead:3};Fr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new IU.LangiumGrammarAstReflection};Fr.LangiumGrammarGeneratedModule={Grammar:()=>(0,DU.LangiumGrammarGrammar)(),LanguageMetaData:()=>Fr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Fr.LangiumGrammarParserConfig}}});var jr=d(_t=>{"use strict";Object.defineProperty(_t,"__esModule",{value:!0});_t.Deferred=_t.MutexLock=_t.interruptAndCheck=_t.isOperationCancelled=_t.OperationCancelled=_t.setInterruptionPeriod=_t.startCancelableOperation=_t.delayNextTick=void 0;var Gc=mi();function $S(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}_t.delayNextTick=$S;var ay=0,OS=10;function xU(){return ay=Date.now(),new Gc.CancellationTokenSource}_t.startCancelableOperation=xU;function LU(t){OS=t}_t.setInterruptionPeriod=LU;_t.OperationCancelled=Symbol("OperationCancelled");function IS(t){return t===_t.OperationCancelled}_t.isOperationCancelled=IS;async function qU(t){if(t===Gc.CancellationToken.None)return;let e=Date.now();if(e-ay>=OS&&(ay=e,await $S()),t.isCancellationRequested)throw _t.OperationCancelled}_t.interruptAndCheck=qU;var oy=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Gc.CancellationTokenSource}lock(e){this.cancel();let r=new Gc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{IS(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};_t.MutexLock=oy;var sy=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};_t.Deferred=sy});var Hc=d(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.DefaultScopeComputation=void 0;var uy=mi(),DS=Ie(),MU=Pr(),xS=jr(),ly=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=uy.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=DS.streamContents,i=uy.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,xS.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=uy.CancellationToken.None){let n=e.parseResult.value,i=new MU.MultiMap;for(let a of(0,DS.streamAllContents)(n))await(0,xS.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};Uc.DefaultScopeComputation=ly});var Wc=d(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.DefaultScopeProvider=Vi.EMPTY_SCOPE=Vi.StreamScope=void 0;var FU=Ie(),Kc=xt(),xo=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};Vi.StreamScope=xo;Vi.EMPTY_SCOPE={getElement(){},getAllElements(){return Kc.EMPTY_STREAM}};var cy=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,FU.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Kc.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new xo((0,Kc.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Kc.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new xo(i,r,n)}getGlobalScope(e,r){return new xo(this.indexManager.allElements(e))}};Vi.DefaultScopeProvider=cy});var Ti=d(Lo=>{"use strict";Object.defineProperty(Lo,"__esModule",{value:!0});Lo.relativeURI=Lo.equalURI=void 0;function jU(t,e){return t?.toString()===e?.toString()}Lo.equalURI=jU;function GU(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}Lo.relativeURI=GU});var qS=d(qo=>{"use strict";Object.defineProperty(qo,"__esModule",{value:!0});qo.LangiumGrammarScopeComputation=qo.LangiumGrammarScopeProvider=void 0;var UU=Hc(),fy=Wc(),Ou=Ie(),LS=xt(),HU=Ti(),Gr=$e(),dy=Et(),py=class extends fy.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Gr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,Ou.getDocument)(r.container).precomputedScopes,a=(0,Ou.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,LS.stream)(s).filter(u=>u.type===Gr.Interface||u.type===Gr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,Ou.getContainerOfType)(r.container,Gr.isGrammar);if(!n)return fy.EMPTY_SCOPE;let i=(0,LS.stream)(n.imports).map(dy.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,HU.equalURI)(o.documentUri,s)));return e===Gr.AbstractType&&(a=a.filter(o=>o.type===Gr.Interface||o.type===Gr.Type)),new fy.StreamScope(a)}};qo.LangiumGrammarScopeProvider=py;var my=class extends UU.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Gr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push({node:a,name:a.name,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(a)})}(0,Ou.streamAllContents)(e).forEach(a=>{if((0,Gr.isAction)(a)&&a.inferredType){let o=(0,dy.getActionType)(a);o&&r.push({node:e,name:o,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)})}})}}processNode(e,r,n){(0,Gr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Gr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,{node:o,name:o.name,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(o)})}}processActionNode(e,r,n){let i=(0,Ou.findRootNode)(e);if(i&&(0,Gr.isAction)(e)&&e.inferredType){let a=(0,dy.getActionType)(e);a&&n.add(i,{node:e,name:a,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(e)})}}};qo.LangiumGrammarScopeComputation=my});var _y=d(cr=>{"use strict";var KU=cr&&cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),WU=cr&&cr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),BU=cr&&cr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&KU(e,t,r);return WU(e,t),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.LangiumGrammarValidator=cr.IssueCodes=cr.registerValidationChecks=void 0;var hy=yo(),zi=Ie(),Yi=Pr(),yy=Qe(),Xi=kt(),gy=xt(),Ve=BU($e()),vy=$e(),Lt=Et();function VU(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],AtomType:[r.checkAtomTypeRefType,r.checkFragmentsInTypes]};e.register(n,r)}cr.registerValidationChecks=VU;var lr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(lr=cr.IssueCodes||(cr.IssueCodes={}));var Ty=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:lr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Ve.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Ve.isParserRule(a)&&!(0,Lt.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:lr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,Lt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,gy.stream)(i.rules).filter(a=>!Iu(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,gy.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new Yi.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,Lt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Yi.MultiMap;for(let i of e.imports){let a=(0,Lt.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[hy.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,Lt.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new Yi.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,gy.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,Lt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Ve.isParserRule)){if(Iu(u))continue;let l=(0,Lt.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,Lt.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:lr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let h=(0,Xi.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:lr.InvalidInfers,data:h&&(0,yy.toDocumentSegment)(h)})}}else if(l&&c){let h=(0,Xi.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:lr.InvalidInfers,data:h&&(0,yy.toDocumentSegment)(h)})}}for(let u of(0,zi.streamAllContents)(e).filter(Ve.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,Lt.getTypeNameWithoutError)(u);if(u.type&&o.has(f)===c){let h=c?(0,Xi.findNodeForKeyword)(u.$cstNode,"infer"):(0,Xi.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?lr.SuperfluousInfer:lr.MissingInfer,data:h&&(0,yy.toDocumentSegment)(h)})}else if(l&&o.has(f)&&c&&u.$cstNode){let h=(0,Xi.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,Xi.findNodeForKeyword)(u.$cstNode,"{");h&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:lr.SuperfluousInfer,data:{start:v.range.end,end:h.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:lr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,Lt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,zi.getContainerOfType)(e,i=>Ve.isTerminalRule(i)||Ve.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ve.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ve.isTerminalRule(n)&&n.fragment&&(0,zi.getContainerOfType)(e,Ve.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:lr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,Lt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:lr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:lr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,Xi.getAllReachableRules)(e,!0);for(let i of e.rules)Ve.isTerminalRule(i)&&i.hidden||Iu(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[hy.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Yi.MultiMap,i=new Set;for(let l of e.rules)Ve.isTerminalRule(l)&&l.name&&n.add(l.name,l),Ve.isParserRule(l)&&(0,zi.streamAllContents)(l).filter(Ve.isKeyword).forEach(f=>i.add(f.value));let a=new Yi.MultiMap,o=new Yi.MultiMap;for(let l of e.imports){let c=(0,Lt.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let h of f.rules)Ve.isTerminalRule(h)&&h.name?a.add(h.name,l):Ve.isParserRule(h)&&h.name&&(0,zi.streamAllContents)(h).filter(Ve.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new Yi.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new Yi.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(h=>!f.includes(h)).forEach(h=>u.add(h,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!Iu(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:lr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&zU.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,zi.getContainerOfType)(e,vy.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,Lt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:lr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,zi.streamAllContents)(e).filter(Ve.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[hy.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(Iu(e))return;let n=e.dataType,i=(0,Lt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,vy.isRuleCall)(e.terminal)&&(0,vy.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,zi.streamAllContents)(e.terminal).map(a=>Ve.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){e.attributes.filter(n=>n.typeAlternatives.length>1).forEach(n=>{let i=o=>o.isRef?"ref":"other",a=i(n.typeAlternatives[0]);n.typeAlternatives.slice(1).some(o=>i(o)!==a)&&r("error",this.createMixedTypeError(n.name),{node:n,property:"typeAlternatives"})})}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,Lt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Ve.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Ve.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,Xi.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Ve.isRuleCall(e.terminal)&&Ve.isParserRule(e.terminal.rule.ref)&&!(0,Lt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkAtomTypeRefType(e,r){if(e?.refType){let n=this.checkReferenceToRuleButNotType(e?.refType);n&&r("error",n,{node:e,property:"refType"})}}checkFragmentsInTypes(e,r){var n,i;Ve.isParserRule((n=e.refType)===null||n===void 0?void 0:n.ref)&&(!((i=e.refType)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"refType"})}checkReferenceToRuleButNotType(e){if(e&&Ve.isParserRule(e.ref)&&!(0,Lt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,Lt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Ve.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};cr.LangiumGrammarValidator=Ty;function Iu(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var zU=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var zc=d(hn=>{"use strict";Object.defineProperty(hn,"__esModule",{value:!0});hn.DocumentValidator=hn.toDiagnosticSeverity=hn.getDiagnosticRange=hn.DefaultDocumentValidator=void 0;var Ur=qe(),MS=kt(),YU=Ie(),XU=Qe(),Bc=jr(),Ry=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Ur.CancellationToken.None){let n=e.parseResult,i=[];await(0,Bc.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Ur.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Vc.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Ur.Range.create(0,0,0,0);else{let u=Ur.Position.create(s.endLine-1,s.endColumn);o=Ur.Range.create(u,u)}}}else o=(0,XU.tokenToRange)(a.token);if(o){let s={severity:Ur.DiagnosticSeverity.Error,range:o,message:a.message,code:Vc.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Vc.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Bc.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Bc.interruptAndCheck)(r),i}async validateAst(e,r,n=Ur.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,YU.streamAst)(e).map(async o=>{await(0,Bc.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:FS(n),severity:jS(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};hn.DefaultDocumentValidator=Ry;function FS(t){if(Ur.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,MS.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,MS.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}hn.getDiagnosticRange=FS;function jS(t){switch(t){case"error":return Ur.DiagnosticSeverity.Error;case"warning":return Ur.DiagnosticSeverity.Warning;case"info":return Ur.DiagnosticSeverity.Information;case"hint":return Ur.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}hn.toDiagnosticSeverity=jS;var Vc;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Vc=hn.DocumentValidator||(hn.DocumentValidator={}))});var WS=d(Mn=>{"use strict";var JU=Mn&&Mn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),QU=Mn&&Mn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),ZU=Mn&&Mn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&JU(e,t,r);return QU(e,t),e};Object.defineProperty(Mn,"__esModule",{value:!0});Mn.LangiumGrammarCodeActionProvider=void 0;var Hr=qe(),eH=Ln(),GS=Ie(),US=Qe(),tH=kt(),HS=Oo(),KS=Ti(),rH=zc(),Ay=ZU($e()),Kr=_y(),Sy=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Kr.IssueCodes.GrammarNameUppercase:case Kr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Kr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Kr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Kr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Kr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Kr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Kr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Kr.IssueCodes.InvalidInfers:case Kr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Kr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Kr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case rH.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,US.findLeafNodeAtOffset)(i,n),o=(0,GS.getContainerOfType)(a?.element,Ay.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,HS.escapeRegExp)(s)}-${(0,HS.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,tH.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&Ay.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,US.findLeafNodeAtOffset)(a,i),s=(0,GS.getContainerOfType)(o?.element,Ay.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(h=>h.name===r.refText),l=[],c=-1,f=-1;for(let h of u){if((0,KS.equalURI)(h.documentUri,n.uri))continue;let v=nH(n.uri,h.documentUri),y,R="",P=n.parseResult.value,k=P.imports.find(b=>b.path&&v<b.path);if(k)y=(i=k.$cstNode)===null||i===void 0?void 0:i.range.start;else if(P.imports.length>0){let b=P.imports[P.imports.length-1].$cstNode.range.end;b&&(y={line:b.line+1,character:0})}else P.rules.length>0&&(y=(a=P.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,R=`
`);y&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${R}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Mn.LangiumGrammarCodeActionProvider=Sy;function nH(t,e){let r=eH.Utils.dirname(t),n=(0,KS.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Xc=d(Yc=>{"use strict";Object.defineProperty(Yc,"__esModule",{value:!0});Yc.DefaultFoldingRangeProvider=void 0;var by=qe(),iH=Ie(),aH=Qe(),Cy=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,iH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,aH.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,by.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),by.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===by.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Yc.DefaultFoldingRangeProvider=Cy});var BS=d(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.LangiumGrammarFoldingRangeProvider=void 0;var oH=Xc(),sH=$e(),Py=class extends oH.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,sH.isParserRule)(e)}};Jc.LangiumGrammarFoldingRangeProvider=Py});var wy=d(yn=>{"use strict";Object.defineProperty(yn,"__esModule",{value:!0});yn.Formatting=yn.FormattingRegion=yn.DefaultNodeFormatter=yn.AbstractFormatter=void 0;var Qc=kt(),ky=mr(),uH=Ie(),VS=Qe(),Du=xt(),Ey=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Zc(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let h=this.nodeModeToKey(s,u),v=i.get(h),y=(c=l.options.priority)!==null&&c!==void 0?c:0,R=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||R<=y)&&i.set(h,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,uH.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,h=(0,ky.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),y=r.get(v);if(r.delete(v),y){let k=this.createTextEdit(l,f,y,a);for(let b of k)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}let R=this.nodeModeToKey(f,"append"),P=r.get(R);if(r.delete(R),P){let k=(0,VS.getNextNode)(f);if(k){let b=this.createTextEdit(f,k,P,a);for(let S of b)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!y&&f.hidden){let k=this.createHiddenTextEdits(l,f,void 0,a);for(let b of k)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}h&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let R=r.text.split(`
`);R[0]=l+R[0];for(let P=0;P<R.length;P++){let k=o+P,b={character:0,line:k};if(v>0)s.push({newText:y,range:{start:b,end:b}});else{let S=R[P],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:b,end:{line:k,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let h=[];return u!==void 0?h.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?h.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&h.push(this.createTabTextEdit(o,Boolean(e),i)),(0,ky.isLeafCstNode)(r)&&(i.indentation=f),h}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Du.TreeStreamImpl(i,a=>this.iterateCst(a,r)):Du.EMPTY_STREAM}iterateCst(e,r){if(!(0,ky.isCompositeCstNode)(e))return Du.EMPTY_STREAM;let n=r.indentation;return new Du.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,Du.DONE_RESULT))}};yn.AbstractFormatter=Ey;var Zc=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new yr(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new yr(r,this.collector)}property(e,r){let n=(0,Qc.findNodeForProperty)(this.astNode.$cstNode,e,r);return new yr(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,Qc.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new yr(r,this.collector)}keyword(e,r){let n=(0,Qc.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new yr(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,Qc.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new yr(r,this.collector)}cst(e){return new yr([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new yr([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new yr((0,VS.getInteriorNodes)(a,o),this.collector)}};yn.DefaultNodeFormatter=Zc;var yr=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new yr(this.nodes.slice(e,r),this.collector)}};yn.FormattingRegion=yr;var lH;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var h,v,y,R,P,k;let b=(h=c.lines)!==null&&h!==void 0?h:0,S=(v=f.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,F=(R=f.tabs)!==null&&R!==void 0?R:0,W=(P=c.characters)!==null&&P!==void 0?P:0,re=(k=f.characters)!==null&&k!==void 0?k:0;return b<S?-1:b>S?1:O<F?-1:O>F?1:W<re?-1:W>re?1:0}})(lH=yn.Formatting||(yn.Formatting={}))});var zS=d(Fn=>{"use strict";var cH=Fn&&Fn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),fH=Fn&&Fn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),dH=Fn&&Fn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&cH(e,t,r);return fH(e,t),e};Object.defineProperty(Fn,"__esModule",{value:!0});Fn.LangiumGrammarFormatter=void 0;var ke=wy(),Ji=dH($e()),Ny=class extends ke.AbstractFormatter{format(e){if(Ji.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(ke.Formatting.noSpace());else if(Ji.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ke.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ke.Formatting.oneSpace()):r.property("name").append(ke.Formatting.noSpace()),r.properties("parameters").append(ke.Formatting.noSpace()),r.keywords(",").append(ke.Formatting.oneSpace()),r.keywords("<").append(ke.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ke.Formatting.noSpace()),r.interior(i,n).prepend(ke.Formatting.indent()),n.prepend(ke.Formatting.fit(ke.Formatting.noSpace(),ke.Formatting.newLine())),r.node(e).prepend(ke.Formatting.noIndent())}else if(Ji.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ke.Formatting.oneSpace()),r.keyword("returns").append(ke.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(ke.Formatting.oneSpace()),r.keyword(":").prepend(ke.Formatting.noSpace()),r.keyword(";").prepend(ke.Formatting.fit(ke.Formatting.noSpace(),ke.Formatting.newLine())),r.node(e).prepend(ke.Formatting.noIndent())}else if(Ji.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ke.Formatting.noSpace()),r.keywords(".","+=","=").surround(ke.Formatting.noSpace()),r.keyword("}").prepend(ke.Formatting.noSpace())}else if(Ji.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(ke.Formatting.oneSpace());else if(Ji.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ke.Formatting.noSpace());else if(Ji.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ke.Formatting.noSpace()),r.keyword(",").append(ke.Formatting.oneSpace()),r.properties("arguments").append(ke.Formatting.noSpace())}Ji.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ke.Formatting.noSpace())}};Fn.LangiumGrammarFormatter=Ny});var rf=d(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.SemanticTokensDecoder=Rt.AbstractSemanticTokenProvider=Rt.SemanticTokensBuilder=Rt.DefaultSemanticTokenOptions=Rt.AllSemanticTokenModifiers=Rt.AllSemanticTokenTypes=void 0;var pe=qe(),ef=kt(),pH=Ie();Rt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};Rt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};Rt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Rt.AllSemanticTokenTypes),tokenModifiers:Object.keys(Rt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var tf=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Rt.SemanticTokensBuilder=tf;var $y=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new tf;return this.tokensBuilders.set(e.uri.toString(),n),n}computeHighlighting(e,r,n){let i=e.parseResult.value;if(this.highlightElement(i,r)==="prune")return;let a=(0,pH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){if(n.isCancellationRequested)break;let s=o.value,u=s.$cstNode.range,l=this.compareRange(u);if(l===1)break;if(l===-1)continue;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}compareRange(e){if(!this.currentRange)return 0;let r=typeof e=="number"?e:e.start.line;return(typeof e=="number"?e:e.end.line)<this.currentRange.start.line?-1:r>this.currentRange.end.line?1:0}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.compareRange(n)!==0||!this.currentDocument||!this.currentTokensBuilder)return;let o=Rt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=Rt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),h=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,h-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let h=u+1;h<l;h++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:h+1,character:0}),this.currentTokensBuilder.push(h,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,ef.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,ef.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,ef.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,ef.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Rt.AbstractSemanticTokenProvider=$y;var mH;(function(t){function e(n,i){let a=new Map;Object.entries(Rt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(mH=Rt.SemanticTokensDecoder||(Rt.SemanticTokensDecoder={}))});var YS=d(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.LangiumGrammarSemanticTokenProvider=void 0;var Qi=qe(),hH=rf(),Zi=$e(),Oy=class extends hH.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,Zi.isAssignment)(e)?r({node:e,property:"feature",type:Qi.SemanticTokenTypes.property}):(0,Zi.isAction)(e)?e.feature&&r({node:e,property:"feature",type:Qi.SemanticTokenTypes.property}):(0,Zi.isReturnType)(e)?r({node:e,property:"name",type:Qi.SemanticTokenTypes.type}):(0,Zi.isAtomType)(e)?(e.primitiveType||e.refType)&&r({node:e,property:e.primitiveType?"primitiveType":"refType",type:Qi.SemanticTokenTypes.type}):(0,Zi.isParameter)(e)?r({node:e,property:"name",type:Qi.SemanticTokenTypes.parameter}):(0,Zi.isParameterReference)(e)?r({node:e,property:"parameter",type:Qi.SemanticTokenTypes.parameter}):(0,Zi.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:Qi.SemanticTokenTypes.type}):(0,Zi.isTypeAttribute)(e)&&r({node:e,property:"name",type:Qi.SemanticTokenTypes.property})}};nf.LangiumGrammarSemanticTokenProvider=Oy});var JS=d(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.LangiumGrammarNameProvider=void 0;var yH=$o(),gH=kt(),XS=$e(),Iy=class extends yH.DefaultNameProvider{getName(e){return(0,XS.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,XS.isAssignment)(e)?(0,gH.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};af.LangiumGrammarNameProvider=Iy});var Ly=d(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.DefaultReferences=void 0;var vH=kt(),QS=mr(),ea=Ie(),Dy=Qe(),ZS=xt(),TH=Ti(),xy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,vH.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,QS.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,QS.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,Dy.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n||r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,ZS.stream)(n)}findLocalReferences(e,r=!1){let i=(0,ea.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,ea.streamAst)(i).forEach(o=>{(0,ea.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,ea.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,ea.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,Dy.toDocumentSegment)(u),local:(0,TH.equalURI)((0,ea.getDocument)(u.element).uri,(0,ea.getDocument)(e).uri)})}})}),(0,ZS.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,ea.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,Dy.toDocumentSegment)(r),local:!0}}}};of.DefaultReferences=xy});var i0=d(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.LangiumGrammarReferences=void 0;var _H=Ly(),er=Ie(),e0=Qe(),t0=kt(),r0=xt(),qy=Ti(),Vt=$e(),n0=Et(),sf=yi(),My=class extends _H.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,t0.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Vt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Vt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Vt.isTypeAttribute)(e)){let i=(0,er.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Vt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,er.getContainerOfType)(e,Vt.isInterface);if(a){let o=(0,sf.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,qy.equalURI)((0,er.getDocument)(e).uri,(0,er.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,r0.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,er.getContainerOfType)(e,Vt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,sf.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,r0.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Vt.isParserRule)(e)){let i=(0,n0.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,er.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,er.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,e0.toDocumentSegment)(a),local:(0,qy.equalURI)((0,er.getDocument)(i).uri,(0,er.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,t0.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,er.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,er.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,e0.toDocumentSegment)(a),local:(0,qy.equalURI)((0,er.getDocument)(e).uri,(0,er.getDocument)(r).uri)})}let i=(0,er.getContainerOfType)(e,Vt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,er.getContainerOfType)(e,Vt.isParserRule),i=(0,n0.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Vt.isInterface)(n.returnType.ref)||(0,Vt.isType)(n.returnType.ref))){let a=(0,sf.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,sf.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Vt.isParserRule)(o)||(0,Vt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,er.streamAst)(r).filter(a=>{var o,s;return(0,Vt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Vt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Vt.isParserRule)(a)||(0,Vt.isAction)(a))&&n.push(a)}),n}};uf.LangiumGrammarReferences=My});var Gy=d(Wr=>{"use strict";var RH=Wr&&Wr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),AH=Wr&&Wr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),SH=Wr&&Wr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&RH(e,t,r);return AH(e,t),e};Object.defineProperty(Wr,"__esModule",{value:!0});Wr.findFirstFeatures=Wr.findNextFeatures=void 0;var tr=SH($e()),_i=Et(),bH=mr(),CH=Ie(),PH=kt();function kH(t,e){let r={stacks:t,tokens:e};return EH(r),r.stacks.flat().forEach(i=>{i.property=void 0}),s0(r.stacks).map(i=>i[i.length-1])}Wr.findNextFeatures=kH;function Fy(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(tr.isGroup(u.$container)){s=u.$container;break}else if(tr.isAbstractElement(u.$container))u=u.$container;else break;if((0,_i.isArrayCardinality)(u.cardinality)){let l=Mo({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...o0({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,_i.isOptionalCardinality)(c.feature.cardinality)||(0,_i.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Fy({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function a0(t){return(0,bH.isAstNode)(t)&&(t={feature:t}),Mo({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Wr.findFirstFeatures=a0;function Mo(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(tr.isGroup(u)){if(o.has(u))return[];o.add(u)}if(tr.isGroup(u))return o0(i,0,a,o,s).map(c=>lf(c,u.cardinality,a));if(tr.isAlternatives(u)||tr.isUnorderedGroup(u))return u.elements.flatMap(c=>Mo({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>lf(c,u.cardinality,a));if(tr.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return Mo({next:c,cardinalities:a,visited:o,plus:s}).map(f=>lf(f,u.cardinality,a))}else{if(tr.isAction(u))return Fy({next:{feature:u,new:!0,type:(0,_i.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(tr.isRuleCall(u)&&tr.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,_i.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return Mo({next:f,cardinalities:a,visited:o,plus:s}).map(h=>lf(h,u.cardinality,a))}else return[i]}}function lf(t,e,r){return r.set(t.feature,e),t}function o0(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...Mo({next:s,cardinalities:r,visited:n,plus:i})),!!(0,_i.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function EH(t){for(let e of t.tokens){let r=s0(t.stacks,e);t.stacks=r}}function s0(t,e){let r=[];for(let n of t)r.push(...wH(n,e));return r}function wH(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(NH)),i=[];for(;t.length>0;){let a=t.pop(),o=Fy({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?jy(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,_i.isOptionalCardinality)(s.feature.cardinality)||(0,_i.isOptionalCardinality)(r.get(s.feature))))break}return i}function NH(t){if(t.cardinality==="+")return!0;let e=(0,CH.getContainerOfType)(t,tr.isAssignment);return!!(e&&e.cardinality==="+")}function jy(t,e){if(tr.isKeyword(t))return t.value===e.image;if(tr.isRuleCall(t))return $H(t.rule.ref,e);if(tr.isCrossReference(t)){let r=(0,PH.getCrossReferenceTerminal)(t);if(r)return jy(r,e)}return!1}function $H(t,e){return tr.isParserRule(t)?a0(t.definition).some(n=>jy(n.feature,e)):tr.isTerminalRule(t)?new RegExp((0,_i.terminalRegex)(t)).test(e.image):!1}});var Hy=d(jn=>{"use strict";var OH=jn&&jn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),IH=jn&&jn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),DH=jn&&jn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&OH(e,t,r);return IH(e,t),e};Object.defineProperty(jn,"__esModule",{value:!0});jn.DefaultCompletionProvider=void 0;var xu=qe(),Lu=DH($e()),xH=Et(),LH=Ie(),qH=Qe(),u0=kt(),l0=xt(),cf=Gy(),Uy=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=k=>{let b=this.fillCompletionItem(o,u,k);b&&a.push(b)},c=(0,qH.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let k=(0,u0.getEntryRule)(this.grammar);return await this.completionForRule(f,k,l),xu.CompletionList.create(a,!0)}let h=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,h),y=[],R=this.canReparse()&&u!==h;R&&(y=this.findFeaturesAt(o,u));let P=k=>Lu.isKeyword(k.feature)?k.feature.value:k.feature;return await Promise.all((0,l0.stream)(v).distinct(P).map(k=>this.completionFor(f,k,l))),R&&await Promise.all((0,l0.stream)(y).exclude(v,P).distinct(P).map(k=>this.completionFor(f,k,l))),xu.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:xu.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,u0.getEntryRule)(this.grammar),l=(0,cf.findFirstFeatures)({feature:u.definition,new:!0,type:(0,xH.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,cf.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,cf.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(Lu.isParserRule(r)){let i=(0,cf.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(Lu.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(Lu.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,LH.getContainerOfType)(r.feature,Lu.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:xu.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:xu.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return c0<=e&&e<=f0&&MH<=r&&r<=FH||e===d0&&r!==d0}toUpperCharCode(e){return c0<=e&&e<=f0?e-32:e}};jn.DefaultCompletionProvider=Uy;var c0="a".charCodeAt(0),f0="z".charCodeAt(0),MH="A".charCodeAt(0),FH="Z".charCodeAt(0),d0="_".charCodeAt(0)});var m0=d(p0=>{"use strict";Object.defineProperty(p0,"__esModule",{value:!0})});var Wy=d(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.DefaultDocumentHighlightProvider=void 0;var jH=qe(),GH=Ie(),UH=Qe(),HH=Ti(),Ky=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,UH.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,HH.equalURI)((0,GH.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return jH.DocumentHighlight.create(e.segment.range)}};ff.DefaultDocumentHighlightProvider=Ky});var y0=d(h0=>{"use strict";Object.defineProperty(h0,"__esModule",{value:!0})});var Vy=d(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.DefaultDocumentSymbolProvider=void 0;var KH=qe(),WH=Ie(),By=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,WH.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return KH.SymbolKind.Field}};df.DefaultDocumentSymbolProvider=By});var g0=d(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.AbstractExecuteCommandHandler=void 0;var BH=qe(),zy=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=BH.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};pf.AbstractExecuteCommandHandler=zy});var Xy=d(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.DefaultDefinitionProvider=void 0;var VH=qe(),zH=Ie(),YH=Qe(),Yy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,YH.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[VH.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,zH.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};mf.DefaultDefinitionProvider=Yy});var Qy=d(Fo=>{"use strict";Object.defineProperty(Fo,"__esModule",{value:!0});Fo.MultilineCommentHoverProvider=Fo.AstNodeHoverProvider=void 0;var v0=Qe(),hf=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,v0.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};Fo.AstNodeHoverProvider=hf;var Jy=class extends hf{constructor(){super(...arguments),this.commentContentRegex=/\/\*([\s\S]*?)\*\//}getAstNodeHoverContent(e){let r=(0,v0.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules),n;if(r){let i=this.commentContentRegex.exec(r.text);i&&i[1]&&(n=this.getCommentContent(i[1]))}if(n)return{contents:{kind:"markdown",value:n}}}getCommentContent(e){return e.split(`
`).map(n=>(n=n.trim(),n.startsWith("*")&&(n=n.substring(1).trim()),n)).join(" ").trim()}};Fo.MultilineCommentHoverProvider=Jy});var T0=d(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.AbstractGoToImplementationProvider=void 0;var XH=qe(),JH=Qe(),Zy=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=XH.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,JH.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};yf.AbstractGoToImplementationProvider=Zy});var ta=d(Ri=>{"use strict";Object.defineProperty(Ri,"__esModule",{value:!0});Ri.DefaultLangiumDocuments=Ri.DefaultLangiumDocumentFactory=Ri.DocumentState=void 0;var QH=bh(),ZH=Ln(),eK=xt(),jo;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(jo=Ri.DocumentState||(Ri.DocumentState={}));var eg=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??ZH.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:jo.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:jo.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=jo.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=QH.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Ri.DefaultLangiumDocumentFactory=eg;var tg=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,eK.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=jo.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=jo.Changed,this.documentMap.delete(r)),n}};Ri.DefaultLangiumDocuments=tg});var ng=d(Go=>{"use strict";Object.defineProperty(Go,"__esModule",{value:!0});Go.mergeSignatureHelpOptions=Go.AbstractSignatureHelpProvider=void 0;var tK=qe(),rK=Qe(),rg=class{provideSignatureHelp(e,r,n=tK.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,rK.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};Go.AbstractSignatureHelpProvider=rg;function nK(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}Go.mergeSignatureHelpOptions=nK});var og=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createRequestHandler=Q.createServerRequestHandler=Q.createCallHierarchyRequestHandler=Q.addCallHierarchyHandler=Q.addCodeLensHandler=Q.addSignatureHelpHandler=Q.addDocumentLinkHandler=Q.addExecuteCommandHandler=Q.addConfigurationChangeHandler=Q.addSemanticTokenHandler=Q.addRenameHandler=Q.addFormattingHandler=Q.addFoldingRangeHandler=Q.addHoverHandler=Q.addDocumentHighlightsHandler=Q.addGoToDeclarationHandler=Q.addGoToImplementationHandler=Q.addGoToTypeDefinitionHandler=Q.addGotoDefinitionHandler=Q.addDocumentSymbolHandler=Q.addCodeActionHandler=Q.addFindReferencesHandler=Q.addCompletionHandler=Q.addDiagnosticsHandler=Q.addDocumentsHandler=Q.startLanguageServer=Q.DefaultLanguageServer=void 0;var gr=qe(),Uo=Ln(),_0=Cu(),iK=jr(),aK=ta(),oK=rf(),sK=ng(),ig=class{constructor(e){this.onInitializeEmitter=new gr.Emitter,this.onInitializedEmitter=new gr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,_0.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,_0.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var Ae;return(Ae=V.lsp.Formatter)===null||Ae===void 0?void 0:Ae.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,sK.mergeSignatureHelpOptions)(n.map(V=>{var Ae;return(Ae=V.lsp.SignatureHelp)===null||Ae===void 0?void 0:Ae.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),h=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=this.hasService(V=>V.lsp.ReferencesProvider),R=this.hasService(V=>V.lsp.DocumentSymbolProvider),P=this.hasService(V=>V.lsp.DefinitionProvider),k=this.hasService(V=>V.lsp.DocumentHighlightProvider),b=this.hasService(V=>V.lsp.FoldingRangeProvider),S=this.hasService(V=>V.lsp.HoverProvider),O=this.hasService(V=>V.lsp.RenameProvider),F=this.hasService(V=>V.lsp.CallHierarchyProvider),W=this.services.lsp.CodeLensProvider,re=this.hasService(V=>V.lsp.DeclarationProvider);return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:gr.TextDocumentSyncKind.Incremental,completionProvider:v?{}:void 0,referencesProvider:y,documentSymbolProvider:R,definitionProvider:P,typeDefinitionProvider:f,documentHighlightProvider:k,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:b,hoverProvider:S,renameProvider:O?{prepareProvider:!0}:void 0,semanticTokensProvider:s?oK.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:h,callHierarchyProvider:F?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:W?{resolveProvider:Boolean(W.resolveCodeLens)}:void 0,declarationProvider:re}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Q.DefaultLanguageServer=ig;function uK(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");R0(e,t),A0(e,t),S0(e,t),b0(e,t),P0(e,t),k0(e,t),E0(e,t),w0(e,t),$0(e,t),I0(e,t),D0(e,t),C0(e,t),x0(e,t),O0(e,t),L0(e,t),M0(e,t),j0(e,t),U0(e,t),G0(e,t),F0(e,t),q0(e,t),N0(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Q.startLanguageServer=uK;function R0(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([Uo.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=o.changes.filter(l=>l.type!==gr.FileChangeType.Deleted).map(l=>Uo.URI.parse(l.uri)),u=o.changes.filter(l=>l.type===gr.FileChangeType.Deleted).map(l=>Uo.URI.parse(l.uri));i(s,u)})}Q.addDocumentsHandler=R0;function A0(t,e){e.workspace.DocumentBuilder.onBuildPhase(aK.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}Q.addDiagnosticsHandler=A0;function S0(t,e){t.onCompletion(zt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}Q.addCompletionHandler=S0;function b0(t,e){t.onReferences(zt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}Q.addFindReferencesHandler=b0;function C0(t,e){t.onCodeAction(zt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}Q.addCodeActionHandler=C0;function P0(t,e){t.onDocumentSymbol(zt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}Q.addDocumentSymbolHandler=P0;function k0(t,e){t.onDefinition(zt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}Q.addGotoDefinitionHandler=k0;function E0(t,e){t.onTypeDefinition(zt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}Q.addGoToTypeDefinitionHandler=E0;function w0(t,e){t.onImplementation(zt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}Q.addGoToImplementationHandler=w0;function N0(t,e){t.onDeclaration(zt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}Q.addGoToDeclarationHandler=N0;function $0(t,e){t.onDocumentHighlight(zt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}Q.addDocumentHighlightsHandler=$0;function O0(t,e){t.onHover(zt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}Q.addHoverHandler=O0;function I0(t,e){t.onFoldingRanges(zt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}Q.addFoldingRangeHandler=I0;function D0(t,e){t.onDocumentFormatting(zt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(zt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(zt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}Q.addFormattingHandler=D0;function x0(t,e){t.onRenameRequest(zt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(zt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}Q.addRenameHandler=x0;function L0(t,e){let r="No semantic token provider registered";t.languages.semanticTokens.on(ra((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):new gr.ResponseError(0,r),e)),t.languages.semanticTokens.onDelta(ra((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):new gr.ResponseError(0,r),e)),t.languages.semanticTokens.onRange(ra((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):new gr.ResponseError(0,r),e))}Q.addSemanticTokenHandler=L0;function q0(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Q.addConfigurationChangeHandler=q0;function M0(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return Ho(o)}})}Q.addExecuteCommandHandler=M0;function F0(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(ra((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Ho(s)}})}}Q.addDocumentLinkHandler=F0;function j0(t,e){t.onSignatureHelp(ra((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}Q.addSignatureHelpHandler=j0;function G0(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(ra((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Ho(s)}})}}Q.addCodeLensHandler=G0;function U0(t,e){let r="No call hierarchy provider registered";t.languages.callHierarchy.onPrepare(ra((n,i,a,o)=>{var s;return n.lsp.CallHierarchyProvider?(s=n.lsp.CallHierarchyProvider.prepareCallHierarchy(i,a,o))!==null&&s!==void 0?s:null:new gr.ResponseError(0,r)},e)),t.languages.callHierarchy.onIncomingCalls(ag((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.incomingCalls(i,a))!==null&&o!==void 0?o:null:new gr.ResponseError(0,r)},e)),t.languages.callHierarchy.onOutgoingCalls(ag((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.outgoingCalls(i,a))!==null&&o!==void 0?o:null:new gr.ResponseError(0,r)},e))}Q.addCallHierarchyHandler=U0;function ag(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=Uo.URI.parse(n.item.uri),o=r.getServices(a);if(!o)throw console.error(`Could not find service instance for uri: '${a.toString()}'`),new Error;try{return await t(o,n,i)}catch(s){return Ho(s)}}}Q.createCallHierarchyRequestHandler=ag;function ra(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Uo.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return Ho(l)}}}Q.createServerRequestHandler=ra;function zt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Uo.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return Ho(l)}}}Q.createRequestHandler=zt;function Ho(t){if((0,iK.isOperationCancelled)(t))return new gr.ResponseError(gr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof gr.ResponseError)return t;throw t}});var ug=d(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.DefaultReferencesProvider=void 0;var lK=qe(),cK=Qe(),sg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,cK.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(lK.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};gf.DefaultReferencesProvider=sg});var cg=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.DefaultRenameProvider=void 0;var fK=qe(),dK=$o(),H0=Qe(),lg=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,H0.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=fK.TextEdit.replace(c.segment.range,r.newName),h=c.sourceUri.toString();n[h]?n[h].push(f):n[h]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,H0.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,dK.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};vf.DefaultRenameProvider=lg});var K0=d(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.AbstractTypeDefinitionProvider=void 0;var pK=qe(),mK=Qe(),fg=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=pK.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,mK.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Tf.AbstractTypeDefinitionProvider=fg});var dg=d(tt=>{"use strict";var hK=tt&&tt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),qt=tt&&tt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&hK(e,t,r)};Object.defineProperty(tt,"__esModule",{value:!0});qt(Hy(),tt);qt(Gy(),tt);qt(m0(),tt);qt(Wy(),tt);qt(y0(),tt);qt(Vy(),tt);qt(g0(),tt);qt(Xc(),tt);qt(Xy(),tt);qt(Qy(),tt);qt(wy(),tt);qt(T0(),tt);qt(og(),tt);qt(ug(),tt);qt(cg(),tt);qt(rf(),tt);qt(ng(),tt);qt(K0(),tt)});var W0=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.LangiumGrammarDefinitionProvider=void 0;var pg=qe(),yK=dg(),gK=Ie(),vK=kt(),TK=$e(),_K=Et(),mg=class extends yK.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,TK.isGrammarImport)(e.element)&&((n=(0,vK.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,_K.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,h=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:pg.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:pg.Range.create(0,0,0,0);return[pg.LocationLink.create(c.$document.uri.toString(),v,h,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,gK.streamContents)(e).head()}};_f.LangiumGrammarDefinitionProvider=mg});var V0=d(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.AbstractCallHierarchyProvider=void 0;var RK=qe(),B0=Ln(),hg=Qe(),yg=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,hg.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:RK.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(B0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,hg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(B0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,hg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};Rf.AbstractCallHierarchyProvider=yg});var Y0=d(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.LangiumGrammarCallHierarchyProvider=void 0;var z0=qe(),AK=V0(),gg=Ie(),SK=Qe(),Af=$e(),vg=class extends AK.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,Af.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,SK.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,gg.getContainerOfType)(s.element,Af.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:z0.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,Af.isParserRule)(e))return;let r=(0,gg.streamAllContents)(e).filter(Af.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,gg.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:z0.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};Sf.LangiumGrammarCallHierarchyProvider=vg});var Tg=d(na=>{"use strict";Object.defineProperty(na,"__esModule",{value:!0});na.isInferredAndDeclared=na.isInferred=na.isDeclared=void 0;function bK(t){return t&&"declared"in t}na.isDeclared=bK;function CK(t){return t&&"inferred"in t}na.isInferred=CK;function PK(t){return t&&"inferred"in t&&"declared"in t}na.isInferredAndDeclared=PK});var J0=d(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.LangiumGrammarValidationResourcesCollector=void 0;var kK=Pr(),Pf=xt(),bf=$e(),X0=Et(),EK=ry(),Cf=yi(),wK=Bi(),NK=Tg(),_g=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,EK.collectTypeResources)(e,this.documents),n=this.collectValidationInfo(r),i=this.collectSuperProperties(r),a=this.collectSubTypesAndAliases(n);return{typeToValidationInfo:n,typeToSuperProperties:i,typeToAliases:a}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=$K(e);for(let s of(0,Cf.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,Pf.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,Cf.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,l?Object.assign(Object.assign({},l),{declared:s,declaredNode:u}):{declared:s,declaredNode:u})}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map;for(let i of(0,Cf.mergeInterfaces)(e,r))n.set(i.name,Array.from(i.superProperties.values()));return n}collectSubTypesAndAliases(e){let r=(0,Pf.stream)(e.entries()).reduce((s,[u,l])=>(s.set(u,(0,NK.isDeclared)(l)?l.declared:l.inferred),s),new Map);(0,Cf.addSubTypes)(r);let n=new Map;function i(s,u){let l=n.get(s);l?l.add(u):n.set(s,new Set([u]))}let a=Array.from(r.values()).filter(s=>s.subTypes.size===0),o=new Set;for(let s of a){o.add(s),i(s.name,s.name);for(let u of(0,Pf.stream)(s.realSuperTypes)){i(u,s.name);let l=r.get(u);l&&!o.has(l)&&a.push(l)}(0,wK.isUnionType)(s)&&s.alternatives.length===1&&s.alternatives.filter(u=>!u.array&&!u.reference).flatMap(u=>u.types).forEach(u=>{i(s.name,u),i(u,u),i(u,s.name)})}return n}};kf.LangiumGrammarValidationResourcesCollector=_g;function $K({parserRules:t,datatypeRules:e}){let r=new kK.MultiMap;(0,Pf.stream)(t).concat(e).forEach(i=>r.add((0,X0.getRuleType)(i),i));function n(i){if((0,bf.isAction)(i)){let a=(0,X0.getActionType)(i);a&&r.add(a,i)}((0,bf.isAlternatives)(i)||(0,bf.isGroup)(i)||(0,bf.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var Z0=d(Br=>{"use strict";var OK=Br&&Br.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),IK=Br&&Br.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),DK=Br&&Br.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&OK(e,t,r);return IK(e,t),e};Object.defineProperty(Br,"__esModule",{value:!0});Br.LangiumGrammarTypesValidator=Br.registerTypeValidationChecks=void 0;var xK=Pr(),Ko=DK($e()),LK=Et(),Gn=Bi(),Ag=yi(),Da=Tg();function qK(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Br.registerTypeValidationChecks=qK;var Rg=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,Da.isDeclared)(a)&&(0,Gn.isInterfaceType)(a.declared)&&Ko.isInterface(a.declaredNode)){let o=a;FK(o,i.typeToValidationInfo,r),jK(o,i.typeToSuperProperties,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,Da.isInferred)(a)&&a.inferred instanceof Gn.InterfaceType&&MK(a.inferred,r),(0,Da.isInferredAndDeclared)(a)&&HK(a,i.typeToAliases,r)}checkActionIsNotUnionType(e,r){Ko.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Br.LangiumGrammarTypesValidator=Rg;function MK(t,e){t.properties.filter(r=>r.typeAlternatives.length>1).forEach(r=>{let n=a=>a.reference?"ref":"other",i=n(r.typeAlternatives[0]);if(r.typeAlternatives.slice(1).some(a=>n(a)!==i)){let a=r.astNodes.values().next().value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}})}function FK({declared:t,declaredNode:e},r,n){t.printingSuperTypes.forEach((i,a)=>{let o=r.get(i);o&&(((0,Da.isInferred)(o)&&(0,Gn.isUnionType)(o.inferred)||(0,Da.isDeclared)(o)&&(0,Gn.isUnionType)(o.declared))&&n("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:a}),(0,Da.isInferred)(o)&&!(0,Da.isDeclared)(o)&&n("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:a}))})}function jK({declared:t,declaredNode:e},r,n){var i,a,o;let s=t.properties.reduce((c,f)=>c.add(f.name,f),new xK.MultiMap);for(let[c,f]of s.entriesGroupedByKey())if(f.length>1)for(let h of f)n("error",`Cannot have two properties with the same name '${c}'.`,{node:Array.from(h.astNodes)[0],property:"name"});let u=t.printingSuperTypes;for(let c=0;c<u.length;c++)for(let f=c+1;f<u.length;f++){let h=u[c],v=u[f],y=(i=r.get(h))!==null&&i!==void 0?i:[],R=(a=r.get(v))!==null&&a!==void 0?a:[],P=GK(y,R);P.length>0&&n("error",`Cannot simultaneously inherit from '${h}' and '${v}'. Their ${P.map(k=>"'"+k+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let l=new Set;for(let c of u){let f=(o=r.get(c))!==null&&o!==void 0?o:[];for(let h of f)l.add(h.name)}for(let c of t.properties)if(l.has(c.name)){let h=e.attributes.find(v=>v.name===c.name);h&&n("error",`Cannot redeclare property '${c.name}'. It is already inherited from another interface.`,{node:h,property:"name"})}}function GK(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!UK(n,i)&&r.push(n.name)}return r}function UK(t,e){if(t.optional!==e.optional||t.typeAlternatives.length!==e.typeAlternatives.length)return!1;for(let r of t.typeAlternatives)if(!e.typeAlternatives.some(i=>i.array===r.array&&i.reference===r.reference&&i.types.length===r.types.length&&i.types.every(a=>r.types.includes(a))))return!1;return!0}function HK(t,e,r){let{inferred:n,declared:i,declaredNode:a,inferredNodes:o}=t,s=i.name,u=f=>h=>o.forEach(v=>r("error",`${h[-1]==="."?h.slice(0,-1):h}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:Ko.isAction(v)?"type":"name"})),l=(f,h)=>f.forEach(v=>r("error",h,{node:v,property:Ko.isAssignment(v)||Ko.isAction(v)?"feature":"name"})),c=f=>{o.forEach(h=>{Ko.isParserRule(h)&&(0,LK.extractAssignments)(h.definition).find(y=>y.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${h.name}', but is required in type '${s}'.`,{node:h,property:"parameters"})})};if((0,Gn.isUnionType)(n)&&(0,Gn.isUnionType)(i))KK(n.alternatives,i.alternatives,e,u(`in a rule that returns type '${s}'`));else if((0,Gn.isInterfaceType)(n)&&(0,Gn.isInterfaceType)(i))VK(n.superProperties,i.superProperties,e,u(`in a rule that returns type '${s}'`),l,c);else{let f=`Inferred and declared versions of type '${s}' both have to be interfaces or unions.`;u()(f),r("error",f,{node:a,property:"name"})}}function KK(t,e,r,n){let i=Q0(t,e,r);for(let a of i)n(`A type '${a.typeAsString}' ${a.errorMessage}`)}function WK(t,e){let r=t.types.map(i=>{var a;return Array.from((a=e.get(i))!==null&&a!==void 0?a:new Set([i]))}),n=[];for(let i of r)if(n.length===0&&n.push([]),i.length===1)n.forEach(a=>a.push(i[0]));else{let a=JSON.parse(JSON.stringify(n));n=[];for(let o of i){let s=JSON.parse(JSON.stringify(a));s.forEach(u=>u.push(o)),n.push(...s)}}return n.map(i=>(0,Ag.distinctAndSorted)(i).join(" | "))}function BK(t){let e=t.types.filter(r=>!r.startsWith("'"));return e.push("string"),(0,Ag.distinctAndSorted)(e).join(" | ")}function Q0(t,e,r){var n;let i=(u,l)=>u.array&&!l.array&&u.reference&&!l.reference?"can't be an array and a reference":!u.array&&l.array&&!u.reference&&l.reference?"has to be an array and a reference":u.array&&!l.array?"can't be an array":!u.array&&l.array?"has to be an array":u.reference&&!l.reference?"can't be a reference":!u.reference&&l.reference?"has to be a reference":"",a=t.reduce((u,l)=>u.set((0,Ag.distinctAndSorted)(l.types).join(" | "),l),new Map),o=e.reduce((u,l)=>(WK(l,r).forEach(c=>u.set(c,l)),u),new Map),s=[];for(let[u,l]of a){let c=(n=o.get(u))!==null&&n!==void 0?n:o.get(BK(l));c?(c.array!==l.array||c.reference!==l.reference)&&s.push({typeAsString:u,errorMessage:i(l,c)}):s.push({typeAsString:u,errorMessage:"is not expected"})}return s}function VK(t,e,r,n,i,a){let o=(s,u)=>!(s.typeAlternatives.length===1&&s.typeAlternatives[0].array)&&!(u.typeAlternatives.length===1&&u.typeAlternatives[0].array);for(let[s,u]of t.entriesGroupedByKey()){let l=u[0],c=e.get(s)[0];if(c){let f=(0,Gn.propertyTypesToString)(l.typeAlternatives),h=(0,Gn.propertyTypesToString)(c.typeAlternatives);if(f!==h){let v=Q0(l.typeAlternatives,c.typeAlternatives,r);if(v.length>0){let y=`The assigned type '${f}' is not compatible with the declared property '${s}' of type '${h}'`,R=v.map(P=>` '${P.typeAsString}' ${P.errorMessage}`).join("; ");i(l.astNodes,`${y}: ${R}.`)}}!c.optional&&l.optional&&o(l,c)&&a(s)}else i(l.astNodes,`A property '${s}' is not expected.`)}for(let[s,u]of e.entriesGroupedByKey())t.get(s).length===0&&!u.some(c=>c.optional)&&n(`A property '${s}' is expected.`)}});var Sg=d(xa=>{"use strict";Object.defineProperty(xa,"__esModule",{value:!0});xa.createLangiumGrammarServices=xa.LangiumGrammarModule=void 0;var eb=Ef(),tb=Cu(),rb=NS(),nb=qS(),ib=_y(),zK=WS(),YK=BS(),XK=zS(),JK=YS(),QK=JS(),ZK=i0(),e5=W0(),t5=Y0(),r5=J0(),ab=Z0(),n5=jr(),i5=ta();xa.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new ib.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new r5.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new ab.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new YK.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new zK.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new JK.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new XK.LangiumGrammarFormatter,DefinitionProvider:t=>new e5.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new t5.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new nb.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new nb.LangiumGrammarScopeProvider(t),References:t=>new ZK.LangiumGrammarReferences(t),NameProvider:()=>new QK.LangiumGrammarNameProvider}};function a5(t,e){let r=(0,tb.inject)((0,eb.createDefaultSharedModule)(t),rb.LangiumGrammarGeneratedSharedModule,e),n=(0,tb.inject)((0,eb.createDefaultModule)({shared:r}),rb.LangiumGrammarGeneratedModule,xa.LangiumGrammarModule);return o5(r,n),r.ServiceRegistry.register(n),(0,ib.registerValidationChecks)(n),(0,ab.registerTypeValidationChecks)(n),{shared:r,grammar:n}}xa.createLangiumGrammarServices=a5;function o5(t,e){t.workspace.DocumentBuilder.onBuildPhase(i5.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,n5.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var bg=d(Wo=>{"use strict";Object.defineProperty(Wo,"__esModule",{value:!0});Wo.EmptyFileSystem=Wo.EmptyFileSystemProvider=void 0;var wf=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};Wo.EmptyFileSystemProvider=wf;Wo.EmptyFileSystem={fileSystemProvider:()=>new wf}});var kt=d(Te=>{"use strict";var s5=Te&&Te.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),u5=Te&&Te.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),l5=Te&&Te.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&s5(e,t,r);return u5(e,t),e};Object.defineProperty(Te,"__esModule",{value:!0});Te.createServicesForGrammar=Te.loadGrammarFromJson=Te.findNameAssignment=Te.findAssignment=Te.findNodesForKeywordInternal=Te.findNodeForKeyword=Te.findNodesForKeyword=Te.findNodeForProperty=Te.findNodesForProperty=Te.isCommentTerminal=Te.getCrossReferenceTerminal=Te.getAllReachableRules=Te.getEntryRule=void 0;var ub=Ln(),ob=Ef(),sb=Cu(),c5=iy(),vr=l5($e()),f5=Et(),lb=Sg(),d5=mr(),Bo=Ie(),p5=Qe(),Cg=bg();function cb(t){return t.rules.find(e=>vr.isParserRule(e)&&e.entry)}Te.getEntryRule=cb;function m5(t,e){let r=new Set,n=cb(t);if(!n)return new Set(t.rules);fb(n,r,e);let i=new Set;for(let a of t.rules)(r.has(a.name)||vr.isTerminalRule(a)&&a.hidden)&&i.add(a);return i}Te.getAllReachableRules=m5;function fb(t,e,r){e.add(t.name),(0,Bo.streamAllContents)(t).forEach(n=>{if(vr.isRuleCall(n)||r&&vr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&fb(i,e,r)}})}function h5(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=db(t.type.ref);return e?.terminal}}Te.getCrossReferenceTerminal=h5;function y5(t){return t.hidden&&!" ".match((0,f5.terminalRegex)(t))}Te.isCommentTerminal=y5;function g5(t,e){return!t||!e?[]:Pg(t,e,t.element,!0)}Te.findNodesForProperty=g5;function v5(t,e,r){if(!t||!e)return;let n=Pg(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForProperty=v5;function Pg(t,e,r,n){if(!n){let i=(0,Bo.getContainerOfType)(t.feature,vr.isAssignment);if(i&&i.feature===e)return[t]}return(0,d5.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>Pg(i,e,r,!1)):[]}function T5(t,e){return t?kg(t,e,t?.element):[]}Te.findNodesForKeyword=T5;function _5(t,e,r){if(!t)return;let n=kg(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForKeyword=_5;function kg(t,e,r){if(t.element!==r)return[];if(vr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,p5.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?vr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}Te.findNodesForKeywordInternal=kg;function R5(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,Bo.getContainerOfType)(t.feature,vr.isAssignment);if(n)return n;t=t.parent}}Te.findAssignment=R5;function db(t){return vr.isInferredType(t)&&(t=t.$container),pb(t,new Map)}Te.findNameAssignment=db;function pb(t,e){var r;function n(i,a){let o;return(0,Bo.getContainerOfType)(i,vr.isAssignment)||(o=pb(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,Bo.streamAllContents)(t)){if(vr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(vr.isRuleCall(i)&&vr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(vr.isAtomType(i)&&(!((r=i?.refType)===null||r===void 0)&&r.ref))return n(i,i.refType.ref)}}function A5(t){var e;let r=(0,lb.createLangiumGrammarServices)(Cg.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,ub.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}Te.loadGrammarFromJson=A5;async function S5(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,lb.createLangiumGrammarServices)(Cg.EmptyFileSystem).grammar,u=ub.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,Bo.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},R={AstReflection:()=>(0,c5.interpretAstReflection)(f)},P={Grammar:()=>f,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},k=(0,sb.inject)((0,ob.createDefaultSharedModule)(Cg.EmptyFileSystem),R,t.sharedModule),b=(0,sb.inject)((0,ob.createDefaultModule)({shared:k}),P,t.module);return k.ServiceRegistry.register(b),b}Te.createServicesForGrammar=S5});var mb=d(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.createGrammarConfig=void 0;var b5=Qe(),C5=kt(),P5=Oo(),k5=$e(),E5=Et();function w5(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,k5.isTerminalRule)(n)&&(0,C5.isCommentTerminal)(n)&&(0,P5.isMultilineComment)((0,E5.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:b5.DefaultNameRegexp}}Nf.createGrammarConfig=w5});var Eg=d($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.VERSION=void 0;$f.VERSION="10.4.2"});var Vo=d((Tpe,hb)=>{var N5=Object.prototype;function $5(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||N5;return t===r}hb.exports=$5});var wg=d((_pe,yb)=>{function O5(t,e){return function(r){return t(e(r))}}yb.exports=O5});var vb=d((Rpe,gb)=>{var I5=wg(),D5=I5(Object.keys,Object);gb.exports=D5});var Ng=d((Ape,Tb)=>{var x5=Vo(),L5=vb(),q5=Object.prototype,M5=q5.hasOwnProperty;function F5(t){if(!x5(t))return L5(t);var e=[];for(var r in Object(t))M5.call(t,r)&&r!="constructor"&&e.push(r);return e}Tb.exports=F5});var $g=d((Spe,_b)=>{var j5=typeof global=="object"&&global&&global.Object===Object&&global;_b.exports=j5});var gn=d((bpe,Rb)=>{var G5=$g(),U5=typeof self=="object"&&self&&self.Object===Object&&self,H5=G5||U5||Function("return this")();Rb.exports=H5});var La=d((Cpe,Ab)=>{var K5=gn(),W5=K5.Symbol;Ab.exports=W5});var Pb=d((Ppe,Cb)=>{var Sb=La(),bb=Object.prototype,B5=bb.hasOwnProperty,V5=bb.toString,qu=Sb?Sb.toStringTag:void 0;function z5(t){var e=B5.call(t,qu),r=t[qu];try{t[qu]=void 0;var n=!0}catch{}var i=V5.call(t);return n&&(e?t[qu]=r:delete t[qu]),i}Cb.exports=z5});var Eb=d((kpe,kb)=>{var Y5=Object.prototype,X5=Y5.toString;function J5(t){return X5.call(t)}kb.exports=J5});var ia=d((Epe,$b)=>{var wb=La(),Q5=Pb(),Z5=Eb(),eW="[object Null]",tW="[object Undefined]",Nb=wb?wb.toStringTag:void 0;function rW(t){return t==null?t===void 0?tW:eW:Nb&&Nb in Object(t)?Q5(t):Z5(t)}$b.exports=rW});var vn=d((wpe,Ob)=>{function nW(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}Ob.exports=nW});var zo=d((Npe,Ib)=>{var iW=ia(),aW=vn(),oW="[object AsyncFunction]",sW="[object Function]",uW="[object GeneratorFunction]",lW="[object Proxy]";function cW(t){if(!aW(t))return!1;var e=iW(t);return e==sW||e==uW||e==oW||e==lW}Ib.exports=cW});var xb=d(($pe,Db)=>{var fW=gn(),dW=fW["__core-js_shared__"];Db.exports=dW});var Mb=d((Ope,qb)=>{var Og=xb(),Lb=function(){var t=/[^.]+$/.exec(Og&&Og.keys&&Og.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function pW(t){return!!Lb&&Lb in t}qb.exports=pW});var Ig=d((Ipe,Fb)=>{var mW=Function.prototype,hW=mW.toString;function yW(t){if(t!=null){try{return hW.call(t)}catch{}try{return t+""}catch{}}return""}Fb.exports=yW});var Gb=d((Dpe,jb)=>{var gW=zo(),vW=Mb(),TW=vn(),_W=Ig(),RW=/[\\^$.*+?()[\]{}|]/g,AW=/^\[object .+?Constructor\]$/,SW=Function.prototype,bW=Object.prototype,CW=SW.toString,PW=bW.hasOwnProperty,kW=RegExp("^"+CW.call(PW).replace(RW,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function EW(t){if(!TW(t)||vW(t))return!1;var e=gW(t)?kW:AW;return e.test(_W(t))}jb.exports=EW});var Hb=d((xpe,Ub)=>{function wW(t,e){return t?.[e]}Ub.exports=wW});var aa=d((Lpe,Kb)=>{var NW=Gb(),$W=Hb();function OW(t,e){var r=$W(t,e);return NW(r)?r:void 0}Kb.exports=OW});var Bb=d((qpe,Wb)=>{var IW=aa(),DW=gn(),xW=IW(DW,"DataView");Wb.exports=xW});var Of=d((Mpe,Vb)=>{var LW=aa(),qW=gn(),MW=LW(qW,"Map");Vb.exports=MW});var Yb=d((Fpe,zb)=>{var FW=aa(),jW=gn(),GW=FW(jW,"Promise");zb.exports=GW});var Dg=d((jpe,Xb)=>{var UW=aa(),HW=gn(),KW=UW(HW,"Set");Xb.exports=KW});var Qb=d((Gpe,Jb)=>{var WW=aa(),BW=gn(),VW=WW(BW,"WeakMap");Jb.exports=VW});var Xo=d((Upe,aC)=>{var xg=Bb(),Lg=Of(),qg=Yb(),Mg=Dg(),Fg=Qb(),iC=ia(),Yo=Ig(),Zb="[object Map]",zW="[object Object]",eC="[object Promise]",tC="[object Set]",rC="[object WeakMap]",nC="[object DataView]",YW=Yo(xg),XW=Yo(Lg),JW=Yo(qg),QW=Yo(Mg),ZW=Yo(Fg),qa=iC;(xg&&qa(new xg(new ArrayBuffer(1)))!=nC||Lg&&qa(new Lg)!=Zb||qg&&qa(qg.resolve())!=eC||Mg&&qa(new Mg)!=tC||Fg&&qa(new Fg)!=rC)&&(qa=function(t){var e=iC(t),r=e==zW?t.constructor:void 0,n=r?Yo(r):"";if(n)switch(n){case YW:return nC;case XW:return Zb;case JW:return eC;case QW:return tC;case ZW:return rC}return e});aC.exports=qa});var Tn=d((Hpe,oC)=>{function eB(t){return t!=null&&typeof t=="object"}oC.exports=eB});var uC=d((Kpe,sC)=>{var tB=ia(),rB=Tn(),nB="[object Arguments]";function iB(t){return rB(t)&&tB(t)==nB}sC.exports=iB});var Mu=d((Wpe,fC)=>{var lC=uC(),aB=Tn(),cC=Object.prototype,oB=cC.hasOwnProperty,sB=cC.propertyIsEnumerable,uB=lC(function(){return arguments}())?lC:function(t){return aB(t)&&oB.call(t,"callee")&&!sB.call(t,"callee")};fC.exports=uB});var Oe=d((Bpe,dC)=>{var lB=Array.isArray;dC.exports=lB});var If=d((Vpe,pC)=>{var cB=9007199254740991;function fB(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=cB}pC.exports=fB});var _n=d((zpe,mC)=>{var dB=zo(),pB=If();function mB(t){return t!=null&&pB(t.length)&&!dB(t)}mC.exports=mB});var yC=d((Ype,hC)=>{function hB(){return!1}hC.exports=hB});var ju=d((Fu,Jo)=>{var yB=gn(),gB=yC(),TC=typeof Fu=="object"&&Fu&&!Fu.nodeType&&Fu,gC=TC&&typeof Jo=="object"&&Jo&&!Jo.nodeType&&Jo,vB=gC&&gC.exports===TC,vC=vB?yB.Buffer:void 0,TB=vC?vC.isBuffer:void 0,_B=TB||gB;Jo.exports=_B});var RC=d((Xpe,_C)=>{var RB=ia(),AB=If(),SB=Tn(),bB="[object Arguments]",CB="[object Array]",PB="[object Boolean]",kB="[object Date]",EB="[object Error]",wB="[object Function]",NB="[object Map]",$B="[object Number]",OB="[object Object]",IB="[object RegExp]",DB="[object Set]",xB="[object String]",LB="[object WeakMap]",qB="[object ArrayBuffer]",MB="[object DataView]",FB="[object Float32Array]",jB="[object Float64Array]",GB="[object Int8Array]",UB="[object Int16Array]",HB="[object Int32Array]",KB="[object Uint8Array]",WB="[object Uint8ClampedArray]",BB="[object Uint16Array]",VB="[object Uint32Array]",ze={};ze[FB]=ze[jB]=ze[GB]=ze[UB]=ze[HB]=ze[KB]=ze[WB]=ze[BB]=ze[VB]=!0;ze[bB]=ze[CB]=ze[qB]=ze[PB]=ze[MB]=ze[kB]=ze[EB]=ze[wB]=ze[NB]=ze[$B]=ze[OB]=ze[IB]=ze[DB]=ze[xB]=ze[LB]=!1;function zB(t){return SB(t)&&AB(t.length)&&!!ze[RB(t)]}_C.exports=zB});var Qo=d((Jpe,AC)=>{function YB(t){return function(e){return t(e)}}AC.exports=YB});var Hu=d((Gu,Zo)=>{var XB=$g(),SC=typeof Gu=="object"&&Gu&&!Gu.nodeType&&Gu,Uu=SC&&typeof Zo=="object"&&Zo&&!Zo.nodeType&&Zo,JB=Uu&&Uu.exports===SC,jg=JB&&XB.process,QB=function(){try{var t=Uu&&Uu.require&&Uu.require("util").types;return t||jg&&jg.binding&&jg.binding("util")}catch{}}();Zo.exports=QB});var Df=d((Qpe,PC)=>{var ZB=RC(),e3=Qo(),bC=Hu(),CC=bC&&bC.isTypedArray,t3=CC?e3(CC):ZB;PC.exports=t3});var kr=d((Zpe,kC)=>{var r3=Ng(),n3=Xo(),i3=Mu(),a3=Oe(),o3=_n(),s3=ju(),u3=Vo(),l3=Df(),c3="[object Map]",f3="[object Set]",d3=Object.prototype,p3=d3.hasOwnProperty;function m3(t){if(t==null)return!0;if(o3(t)&&(a3(t)||typeof t=="string"||typeof t.splice=="function"||s3(t)||l3(t)||i3(t)))return!t.length;var e=n3(t);if(e==c3||e==f3)return!t.size;if(u3(t))return!r3(t).length;for(var r in t)if(p3.call(t,r))return!1;return!0}kC.exports=m3});var es=d((eme,EC)=>{function h3(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}EC.exports=h3});var NC=d((tme,wC)=>{function y3(){this.__data__=[],this.size=0}wC.exports=y3});var ts=d((rme,$C)=>{function g3(t,e){return t===e||t!==t&&e!==e}$C.exports=g3});var Ku=d((nme,OC)=>{var v3=ts();function T3(t,e){for(var r=t.length;r--;)if(v3(t[r][0],e))return r;return-1}OC.exports=T3});var DC=d((ime,IC)=>{var _3=Ku(),R3=Array.prototype,A3=R3.splice;function S3(t){var e=this.__data__,r=_3(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():A3.call(e,r,1),--this.size,!0}IC.exports=S3});var LC=d((ame,xC)=>{var b3=Ku();function C3(t){var e=this.__data__,r=b3(e,t);return r<0?void 0:e[r][1]}xC.exports=C3});var MC=d((ome,qC)=>{var P3=Ku();function k3(t){return P3(this.__data__,t)>-1}qC.exports=k3});var jC=d((sme,FC)=>{var E3=Ku();function w3(t,e){var r=this.__data__,n=E3(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}FC.exports=w3});var Wu=d((ume,GC)=>{var N3=NC(),$3=DC(),O3=LC(),I3=MC(),D3=jC();function rs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}rs.prototype.clear=N3;rs.prototype.delete=$3;rs.prototype.get=O3;rs.prototype.has=I3;rs.prototype.set=D3;GC.exports=rs});var HC=d((lme,UC)=>{var x3=Wu();function L3(){this.__data__=new x3,this.size=0}UC.exports=L3});var WC=d((cme,KC)=>{function q3(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}KC.exports=q3});var VC=d((fme,BC)=>{function M3(t){return this.__data__.get(t)}BC.exports=M3});var YC=d((dme,zC)=>{function F3(t){return this.__data__.has(t)}zC.exports=F3});var Bu=d((pme,XC)=>{var j3=aa(),G3=j3(Object,"create");XC.exports=G3});var ZC=d((mme,QC)=>{var JC=Bu();function U3(){this.__data__=JC?JC(null):{},this.size=0}QC.exports=U3});var tP=d((hme,eP)=>{function H3(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}eP.exports=H3});var nP=d((yme,rP)=>{var K3=Bu(),W3="__lodash_hash_undefined__",B3=Object.prototype,V3=B3.hasOwnProperty;function z3(t){var e=this.__data__;if(K3){var r=e[t];return r===W3?void 0:r}return V3.call(e,t)?e[t]:void 0}rP.exports=z3});var aP=d((gme,iP)=>{var Y3=Bu(),X3=Object.prototype,J3=X3.hasOwnProperty;function Q3(t){var e=this.__data__;return Y3?e[t]!==void 0:J3.call(e,t)}iP.exports=Q3});var sP=d((vme,oP)=>{var Z3=Bu(),e4="__lodash_hash_undefined__";function t4(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=Z3&&e===void 0?e4:e,this}oP.exports=t4});var lP=d((Tme,uP)=>{var r4=ZC(),n4=tP(),i4=nP(),a4=aP(),o4=sP();function ns(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}ns.prototype.clear=r4;ns.prototype.delete=n4;ns.prototype.get=i4;ns.prototype.has=a4;ns.prototype.set=o4;uP.exports=ns});var dP=d((_me,fP)=>{var cP=lP(),s4=Wu(),u4=Of();function l4(){this.size=0,this.__data__={hash:new cP,map:new(u4||s4),string:new cP}}fP.exports=l4});var mP=d((Rme,pP)=>{function c4(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}pP.exports=c4});var Vu=d((Ame,hP)=>{var f4=mP();function d4(t,e){var r=t.__data__;return f4(e)?r[typeof e=="string"?"string":"hash"]:r.map}hP.exports=d4});var gP=d((Sme,yP)=>{var p4=Vu();function m4(t){var e=p4(this,t).delete(t);return this.size-=e?1:0,e}yP.exports=m4});var TP=d((bme,vP)=>{var h4=Vu();function y4(t){return h4(this,t).get(t)}vP.exports=y4});var RP=d((Cme,_P)=>{var g4=Vu();function v4(t){return g4(this,t).has(t)}_P.exports=v4});var SP=d((Pme,AP)=>{var T4=Vu();function _4(t,e){var r=T4(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}AP.exports=_4});var xf=d((kme,bP)=>{var R4=dP(),A4=gP(),S4=TP(),b4=RP(),C4=SP();function is(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}is.prototype.clear=R4;is.prototype.delete=A4;is.prototype.get=S4;is.prototype.has=b4;is.prototype.set=C4;bP.exports=is});var PP=d((Eme,CP)=>{var P4=Wu(),k4=Of(),E4=xf(),w4=200;function N4(t,e){var r=this.__data__;if(r instanceof P4){var n=r.__data__;if(!k4||n.length<w4-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new E4(n)}return r.set(t,e),this.size=r.size,this}CP.exports=N4});var Lf=d((wme,kP)=>{var $4=Wu(),O4=HC(),I4=WC(),D4=VC(),x4=YC(),L4=PP();function as(t){var e=this.__data__=new $4(t);this.size=e.size}as.prototype.clear=O4;as.prototype.delete=I4;as.prototype.get=D4;as.prototype.has=x4;as.prototype.set=L4;kP.exports=as});var wP=d((Nme,EP)=>{var q4="__lodash_hash_undefined__";function M4(t){return this.__data__.set(t,q4),this}EP.exports=M4});var $P=d(($me,NP)=>{function F4(t){return this.__data__.has(t)}NP.exports=F4});var Mf=d((Ome,OP)=>{var j4=xf(),G4=wP(),U4=$P();function qf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new j4;++e<r;)this.add(t[e])}qf.prototype.add=qf.prototype.push=G4;qf.prototype.has=U4;OP.exports=qf});var Gg=d((Ime,IP)=>{function H4(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}IP.exports=H4});var Ff=d((Dme,DP)=>{function K4(t,e){return t.has(e)}DP.exports=K4});var Ug=d((xme,xP)=>{var W4=Mf(),B4=Gg(),V4=Ff(),z4=1,Y4=2;function X4(t,e,r,n,i,a){var o=r&z4,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,h=!0,v=r&Y4?new W4:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var y=t[f],R=e[f];if(n)var P=o?n(R,y,f,e,t,a):n(y,R,f,t,e,a);if(P!==void 0){if(P)continue;h=!1;break}if(v){if(!B4(e,function(k,b){if(!V4(v,b)&&(y===k||i(y,k,r,n,a)))return v.push(b)})){h=!1;break}}else if(!(y===R||i(y,R,r,n,a))){h=!1;break}}return a.delete(t),a.delete(e),h}xP.exports=X4});var Hg=d((Lme,LP)=>{var J4=gn(),Q4=J4.Uint8Array;LP.exports=Q4});var MP=d((qme,qP)=>{function Z4(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}qP.exports=Z4});var jf=d((Mme,FP)=>{function eV(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}FP.exports=eV});var KP=d((Fme,HP)=>{var jP=La(),GP=Hg(),tV=ts(),rV=Ug(),nV=MP(),iV=jf(),aV=1,oV=2,sV="[object Boolean]",uV="[object Date]",lV="[object Error]",cV="[object Map]",fV="[object Number]",dV="[object RegExp]",pV="[object Set]",mV="[object String]",hV="[object Symbol]",yV="[object ArrayBuffer]",gV="[object DataView]",UP=jP?jP.prototype:void 0,Kg=UP?UP.valueOf:void 0;function vV(t,e,r,n,i,a,o){switch(r){case gV:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case yV:return!(t.byteLength!=e.byteLength||!a(new GP(t),new GP(e)));case sV:case uV:case fV:return tV(+t,+e);case lV:return t.name==e.name&&t.message==e.message;case dV:case mV:return t==e+"";case cV:var s=nV;case pV:var u=n&aV;if(s||(s=iV),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=oV,o.set(t,e);var c=rV(s(t),s(e),n,i,a,o);return o.delete(t),c;case hV:if(Kg)return Kg.call(t)==Kg.call(e)}return!1}HP.exports=vV});var Gf=d((jme,WP)=>{function TV(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}WP.exports=TV});var Wg=d((Gme,BP)=>{var _V=Gf(),RV=Oe();function AV(t,e,r){var n=e(t);return RV(t)?n:_V(n,r(t))}BP.exports=AV});var Uf=d((Ume,VP)=>{function SV(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}VP.exports=SV});var Bg=d((Hme,zP)=>{function bV(){return[]}zP.exports=bV});var Hf=d((Kme,XP)=>{var CV=Uf(),PV=Bg(),kV=Object.prototype,EV=kV.propertyIsEnumerable,YP=Object.getOwnPropertySymbols,wV=YP?function(t){return t==null?[]:(t=Object(t),CV(YP(t),function(e){return EV.call(t,e)}))}:PV;XP.exports=wV});var QP=d((Wme,JP)=>{function NV(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}JP.exports=NV});var zu=d((Bme,ZP)=>{var $V=9007199254740991,OV=/^(?:0|[1-9]\d*)$/;function IV(t,e){var r=typeof t;return e=e??$V,!!e&&(r=="number"||r!="symbol"&&OV.test(t))&&t>-1&&t%1==0&&t<e}ZP.exports=IV});var Vg=d((Vme,ek)=>{var DV=QP(),xV=Mu(),LV=Oe(),qV=ju(),MV=zu(),FV=Df(),jV=Object.prototype,GV=jV.hasOwnProperty;function UV(t,e){var r=LV(t),n=!r&&xV(t),i=!r&&!n&&qV(t),a=!r&&!n&&!i&&FV(t),o=r||n||i||a,s=o?DV(t.length,String):[],u=s.length;for(var l in t)(e||GV.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||MV(l,u)))&&s.push(l);return s}ek.exports=UV});var Er=d((zme,tk)=>{var HV=Vg(),KV=Ng(),WV=_n();function BV(t){return WV(t)?HV(t):KV(t)}tk.exports=BV});var zg=d((Yme,rk)=>{var VV=Wg(),zV=Hf(),YV=Er();function XV(t){return VV(t,YV,zV)}rk.exports=XV});var ak=d((Xme,ik)=>{var nk=zg(),JV=1,QV=Object.prototype,ZV=QV.hasOwnProperty;function e6(t,e,r,n,i,a){var o=r&JV,s=nk(t),u=s.length,l=nk(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var h=s[f];if(!(o?h in e:ZV.call(e,h)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var R=!0;a.set(t,e),a.set(e,t);for(var P=o;++f<u;){h=s[f];var k=t[h],b=e[h];if(n)var S=o?n(b,k,h,e,t,a):n(k,b,h,t,e,a);if(!(S===void 0?k===b||i(k,b,r,n,a):S)){R=!1;break}P||(P=h=="constructor")}if(R&&!P){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(R=!1)}return a.delete(t),a.delete(e),R}ik.exports=e6});var pk=d((Jme,dk)=>{var Yg=Lf(),t6=Ug(),r6=KP(),n6=ak(),ok=Xo(),sk=Oe(),uk=ju(),i6=Df(),a6=1,lk="[object Arguments]",ck="[object Array]",Kf="[object Object]",o6=Object.prototype,fk=o6.hasOwnProperty;function s6(t,e,r,n,i,a){var o=sk(t),s=sk(e),u=o?ck:ok(t),l=s?ck:ok(e);u=u==lk?Kf:u,l=l==lk?Kf:l;var c=u==Kf,f=l==Kf,h=u==l;if(h&&uk(t)){if(!uk(e))return!1;o=!0,c=!1}if(h&&!c)return a||(a=new Yg),o||i6(t)?t6(t,e,r,n,i,a):r6(t,e,u,r,n,i,a);if(!(r&a6)){var v=c&&fk.call(t,"__wrapped__"),y=f&&fk.call(e,"__wrapped__");if(v||y){var R=v?t.value():t,P=y?e.value():e;return a||(a=new Yg),i(R,P,r,n,a)}}return h?(a||(a=new Yg),n6(t,e,r,n,i,a)):!1}dk.exports=s6});var Xg=d((Qme,yk)=>{var u6=pk(),mk=Tn();function hk(t,e,r,n,i){return t===e?!0:t==null||e==null||!mk(t)&&!mk(e)?t!==t&&e!==e:u6(t,e,r,n,hk,i)}yk.exports=hk});var vk=d((Zme,gk)=>{var l6=Lf(),c6=Xg(),f6=1,d6=2;function p6(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new l6;if(n)var h=n(l,c,u,t,e,f);if(!(h===void 0?c6(c,l,f6|d6,n,f):h))return!1}}return!0}gk.exports=p6});var Jg=d((ehe,Tk)=>{var m6=vn();function h6(t){return t===t&&!m6(t)}Tk.exports=h6});var Rk=d((the,_k)=>{var y6=Jg(),g6=Er();function v6(t){for(var e=g6(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,y6(i)]}return e}_k.exports=v6});var Qg=d((rhe,Ak)=>{function T6(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}Ak.exports=T6});var bk=d((nhe,Sk)=>{var _6=vk(),R6=Rk(),A6=Qg();function S6(t){var e=R6(t);return e.length==1&&e[0][2]?A6(e[0][0],e[0][1]):function(r){return r===t||_6(r,t,e)}}Sk.exports=S6});var os=d((ihe,Ck)=>{var b6=ia(),C6=Tn(),P6="[object Symbol]";function k6(t){return typeof t=="symbol"||C6(t)&&b6(t)==P6}Ck.exports=k6});var Wf=d((ahe,Pk)=>{var E6=Oe(),w6=os(),N6=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,$6=/^\w*$/;function O6(t,e){if(E6(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||w6(t)?!0:$6.test(t)||!N6.test(t)||e!=null&&t in Object(e)}Pk.exports=O6});var wk=d((ohe,Ek)=>{var kk=xf(),I6="Expected a function";function Zg(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(I6);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(Zg.Cache||kk),r}Zg.Cache=kk;Ek.exports=Zg});var $k=d((she,Nk)=>{var D6=wk(),x6=500;function L6(t){var e=D6(t,function(n){return r.size===x6&&r.clear(),n}),r=e.cache;return e}Nk.exports=L6});var Ik=d((uhe,Ok)=>{var q6=$k(),M6=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,F6=/\\(\\)?/g,j6=q6(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(M6,function(r,n,i,a){e.push(i?a.replace(F6,"$1"):n||r)}),e});Ok.exports=j6});var Fk=d((lhe,Mk)=>{var Dk=La(),G6=es(),U6=Oe(),H6=os(),K6=1/0,xk=Dk?Dk.prototype:void 0,Lk=xk?xk.toString:void 0;function qk(t){if(typeof t=="string")return t;if(U6(t))return G6(t,qk)+"";if(H6(t))return Lk?Lk.call(t):"";var e=t+"";return e=="0"&&1/t==-K6?"-0":e}Mk.exports=qk});var ev=d((che,jk)=>{var W6=Fk();function B6(t){return t==null?"":W6(t)}jk.exports=B6});var Yu=d((fhe,Gk)=>{var V6=Oe(),z6=Wf(),Y6=Ik(),X6=ev();function J6(t,e){return V6(t)?t:z6(t,e)?[t]:Y6(X6(t))}Gk.exports=J6});var ss=d((dhe,Uk)=>{var Q6=os(),Z6=1/0;function ez(t){if(typeof t=="string"||Q6(t))return t;var e=t+"";return e=="0"&&1/t==-Z6?"-0":e}Uk.exports=ez});var Bf=d((phe,Hk)=>{var tz=Yu(),rz=ss();function nz(t,e){e=tz(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[rz(e[r++])];return r&&r==n?t:void 0}Hk.exports=nz});var Wk=d((mhe,Kk)=>{var iz=Bf();function az(t,e,r){var n=t==null?void 0:iz(t,e);return n===void 0?r:n}Kk.exports=az});var Vk=d((hhe,Bk)=>{function oz(t,e){return t!=null&&e in Object(t)}Bk.exports=oz});var tv=d((yhe,zk)=>{var sz=Yu(),uz=Mu(),lz=Oe(),cz=zu(),fz=If(),dz=ss();function pz(t,e,r){e=sz(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=dz(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&fz(i)&&cz(o,i)&&(lz(t)||uz(t)))}zk.exports=pz});var Xk=d((ghe,Yk)=>{var mz=Vk(),hz=tv();function yz(t,e){return t!=null&&hz(t,e,mz)}Yk.exports=yz});var Qk=d((vhe,Jk)=>{var gz=Xg(),vz=Wk(),Tz=Xk(),_z=Wf(),Rz=Jg(),Az=Qg(),Sz=ss(),bz=1,Cz=2;function Pz(t,e){return _z(t)&&Rz(e)?Az(Sz(t),e):function(r){var n=vz(r,t);return n===void 0&&n===e?Tz(r,t):gz(e,n,bz|Cz)}}Jk.exports=Pz});var Ma=d((The,Zk)=>{function kz(t){return t}Zk.exports=kz});var tE=d((_he,eE)=>{function Ez(t){return function(e){return e?.[t]}}eE.exports=Ez});var nE=d((Rhe,rE)=>{var wz=Bf();function Nz(t){return function(e){return wz(e,t)}}rE.exports=Nz});var aE=d((Ahe,iE)=>{var $z=tE(),Oz=nE(),Iz=Wf(),Dz=ss();function xz(t){return Iz(t)?$z(Dz(t)):Oz(t)}iE.exports=xz});var Vr=d((She,oE)=>{var Lz=bk(),qz=Qk(),Mz=Ma(),Fz=Oe(),jz=aE();function Gz(t){return typeof t=="function"?t:t==null?Mz:typeof t=="object"?Fz(t)?qz(t[0],t[1]):Lz(t):jz(t)}oE.exports=Gz});var uE=d((bhe,sE)=>{function Uz(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}sE.exports=Uz});var cE=d((Che,lE)=>{var Hz=uE(),Kz=Hz();lE.exports=Kz});var dE=d((Phe,fE)=>{var Wz=cE(),Bz=Er();function Vz(t,e){return t&&Wz(t,e,Bz)}fE.exports=Vz});var mE=d((khe,pE)=>{var zz=_n();function Yz(t,e){return function(r,n){if(r==null)return r;if(!zz(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}pE.exports=Yz});var oa=d((Ehe,hE)=>{var Xz=dE(),Jz=mE(),Qz=Jz(Xz);hE.exports=Qz});var gE=d((whe,yE)=>{var Zz=oa(),e8=_n();function t8(t,e){var r=-1,n=e8(t)?Array(t.length):[];return Zz(t,function(i,a,o){n[++r]=e(i,a,o)}),n}yE.exports=t8});var Mt=d((Nhe,vE)=>{var r8=es(),n8=Vr(),i8=gE(),a8=Oe();function o8(t,e){var r=a8(t)?r8:i8;return r(t,n8(e,3))}vE.exports=o8});var rv=d(($he,TE)=>{function s8(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}TE.exports=s8});var RE=d((Ohe,_E)=>{var u8=Ma();function l8(t){return typeof t=="function"?t:u8}_E.exports=l8});var Ft=d((Ihe,AE)=>{var c8=rv(),f8=oa(),d8=RE(),p8=Oe();function m8(t,e){var r=p8(t)?c8:f8;return r(t,d8(e))}AE.exports=m8});var bE=d((Dhe,SE)=>{var h8=es();function y8(t,e){return h8(e,function(r){return t[r]})}SE.exports=y8});var Un=d((xhe,CE)=>{var g8=bE(),v8=Er();function T8(t){return t==null?[]:g8(t,v8(t))}CE.exports=T8});var kE=d((Lhe,PE)=>{var _8=Object.prototype,R8=_8.hasOwnProperty;function A8(t,e){return t!=null&&R8.call(t,e)}PE.exports=A8});var wr=d((qhe,EE)=>{var S8=kE(),b8=tv();function C8(t,e){return t!=null&&b8(t,e,S8)}EE.exports=C8});var nv=d((Mhe,wE)=>{var P8=aa(),k8=function(){try{var t=P8(Object,"defineProperty");return t({},"",{}),t}catch{}}();wE.exports=k8});var Vf=d((Fhe,$E)=>{var NE=nv();function E8(t,e,r){e=="__proto__"&&NE?NE(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}$E.exports=E8});var Xu=d((jhe,OE)=>{var w8=Vf(),N8=ts(),$8=Object.prototype,O8=$8.hasOwnProperty;function I8(t,e,r){var n=t[e];(!(O8.call(t,e)&&N8(n,r))||r===void 0&&!(e in t))&&w8(t,e,r)}OE.exports=I8});var us=d((Ghe,IE)=>{var D8=Xu(),x8=Vf();function L8(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?x8(r,s,u):D8(r,s,u)}return r}IE.exports=L8});var xE=d((Uhe,DE)=>{var q8=us(),M8=Er();function F8(t,e){return t&&q8(e,M8(e),t)}DE.exports=F8});var qE=d((Hhe,LE)=>{function j8(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}LE.exports=j8});var FE=d((Khe,ME)=>{var G8=vn(),U8=Vo(),H8=qE(),K8=Object.prototype,W8=K8.hasOwnProperty;function B8(t){if(!G8(t))return H8(t);var e=U8(t),r=[];for(var n in t)n=="constructor"&&(e||!W8.call(t,n))||r.push(n);return r}ME.exports=B8});var Ju=d((Whe,jE)=>{var V8=Vg(),z8=FE(),Y8=_n();function X8(t){return Y8(t)?V8(t,!0):z8(t)}jE.exports=X8});var UE=d((Bhe,GE)=>{var J8=us(),Q8=Ju();function Z8(t,e){return t&&J8(e,Q8(e),t)}GE.exports=Z8});var VE=d((Qu,ls)=>{var e7=gn(),BE=typeof Qu=="object"&&Qu&&!Qu.nodeType&&Qu,HE=BE&&typeof ls=="object"&&ls&&!ls.nodeType&&ls,t7=HE&&HE.exports===BE,KE=t7?e7.Buffer:void 0,WE=KE?KE.allocUnsafe:void 0;function r7(t,e){if(e)return t.slice();var r=t.length,n=WE?WE(r):new t.constructor(r);return t.copy(n),n}ls.exports=r7});var YE=d((Vhe,zE)=>{function n7(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}zE.exports=n7});var JE=d((zhe,XE)=>{var i7=us(),a7=Hf();function o7(t,e){return i7(t,a7(t),e)}XE.exports=o7});var iv=d((Yhe,QE)=>{var s7=wg(),u7=s7(Object.getPrototypeOf,Object);QE.exports=u7});var av=d((Xhe,ZE)=>{var l7=Gf(),c7=iv(),f7=Hf(),d7=Bg(),p7=Object.getOwnPropertySymbols,m7=p7?function(t){for(var e=[];t;)l7(e,f7(t)),t=c7(t);return e}:d7;ZE.exports=m7});var tw=d((Jhe,ew)=>{var h7=us(),y7=av();function g7(t,e){return h7(t,y7(t),e)}ew.exports=g7});var ov=d((Qhe,rw)=>{var v7=Wg(),T7=av(),_7=Ju();function R7(t){return v7(t,_7,T7)}rw.exports=R7});var iw=d((Zhe,nw)=>{var A7=Object.prototype,S7=A7.hasOwnProperty;function b7(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&S7.call(t,"index")&&(r.index=t.index,r.input=t.input),r}nw.exports=b7});var zf=d((eye,ow)=>{var aw=Hg();function C7(t){var e=new t.constructor(t.byteLength);return new aw(e).set(new aw(t)),e}ow.exports=C7});var uw=d((tye,sw)=>{var P7=zf();function k7(t,e){var r=e?P7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}sw.exports=k7});var cw=d((rye,lw)=>{var E7=/\w*$/;function w7(t){var e=new t.constructor(t.source,E7.exec(t));return e.lastIndex=t.lastIndex,e}lw.exports=w7});var hw=d((nye,mw)=>{var fw=La(),dw=fw?fw.prototype:void 0,pw=dw?dw.valueOf:void 0;function N7(t){return pw?Object(pw.call(t)):{}}mw.exports=N7});var gw=d((iye,yw)=>{var $7=zf();function O7(t,e){var r=e?$7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}yw.exports=O7});var Tw=d((aye,vw)=>{var I7=zf(),D7=uw(),x7=cw(),L7=hw(),q7=gw(),M7="[object Boolean]",F7="[object Date]",j7="[object Map]",G7="[object Number]",U7="[object RegExp]",H7="[object Set]",K7="[object String]",W7="[object Symbol]",B7="[object ArrayBuffer]",V7="[object DataView]",z7="[object Float32Array]",Y7="[object Float64Array]",X7="[object Int8Array]",J7="[object Int16Array]",Q7="[object Int32Array]",Z7="[object Uint8Array]",e9="[object Uint8ClampedArray]",t9="[object Uint16Array]",r9="[object Uint32Array]";function n9(t,e,r){var n=t.constructor;switch(e){case B7:return I7(t);case M7:case F7:return new n(+t);case V7:return D7(t,r);case z7:case Y7:case X7:case J7:case Q7:case Z7:case e9:case t9:case r9:return q7(t,r);case j7:return new n;case G7:case K7:return new n(t);case U7:return x7(t);case H7:return new n;case W7:return L7(t)}}vw.exports=n9});var Aw=d((oye,Rw)=>{var i9=vn(),_w=Object.create,a9=function(){function t(){}return function(e){if(!i9(e))return{};if(_w)return _w(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();Rw.exports=a9});var bw=d((sye,Sw)=>{var o9=Aw(),s9=iv(),u9=Vo();function l9(t){return typeof t.constructor=="function"&&!u9(t)?o9(s9(t)):{}}Sw.exports=l9});var Pw=d((uye,Cw)=>{var c9=Xo(),f9=Tn(),d9="[object Map]";function p9(t){return f9(t)&&c9(t)==d9}Cw.exports=p9});var Nw=d((lye,ww)=>{var m9=Pw(),h9=Qo(),kw=Hu(),Ew=kw&&kw.isMap,y9=Ew?h9(Ew):m9;ww.exports=y9});var Ow=d((cye,$w)=>{var g9=Xo(),v9=Tn(),T9="[object Set]";function _9(t){return v9(t)&&g9(t)==T9}$w.exports=_9});var Lw=d((fye,xw)=>{var R9=Ow(),A9=Qo(),Iw=Hu(),Dw=Iw&&Iw.isSet,S9=Dw?A9(Dw):R9;xw.exports=S9});var Gw=d((dye,jw)=>{var b9=Lf(),C9=rv(),P9=Xu(),k9=xE(),E9=UE(),w9=VE(),N9=YE(),$9=JE(),O9=tw(),I9=zg(),D9=ov(),x9=Xo(),L9=iw(),q9=Tw(),M9=bw(),F9=Oe(),j9=ju(),G9=Nw(),U9=vn(),H9=Lw(),K9=Er(),W9=Ju(),B9=1,V9=2,z9=4,qw="[object Arguments]",Y9="[object Array]",X9="[object Boolean]",J9="[object Date]",Q9="[object Error]",Mw="[object Function]",Z9="[object GeneratorFunction]",eY="[object Map]",tY="[object Number]",Fw="[object Object]",rY="[object RegExp]",nY="[object Set]",iY="[object String]",aY="[object Symbol]",oY="[object WeakMap]",sY="[object ArrayBuffer]",uY="[object DataView]",lY="[object Float32Array]",cY="[object Float64Array]",fY="[object Int8Array]",dY="[object Int16Array]",pY="[object Int32Array]",mY="[object Uint8Array]",hY="[object Uint8ClampedArray]",yY="[object Uint16Array]",gY="[object Uint32Array]",Ke={};Ke[qw]=Ke[Y9]=Ke[sY]=Ke[uY]=Ke[X9]=Ke[J9]=Ke[lY]=Ke[cY]=Ke[fY]=Ke[dY]=Ke[pY]=Ke[eY]=Ke[tY]=Ke[Fw]=Ke[rY]=Ke[nY]=Ke[iY]=Ke[aY]=Ke[mY]=Ke[hY]=Ke[yY]=Ke[gY]=!0;Ke[Q9]=Ke[Mw]=Ke[oY]=!1;function Yf(t,e,r,n,i,a){var o,s=e&B9,u=e&V9,l=e&z9;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!U9(t))return t;var c=F9(t);if(c){if(o=L9(t),!s)return N9(t,o)}else{var f=x9(t),h=f==Mw||f==Z9;if(j9(t))return w9(t,s);if(f==Fw||f==qw||h&&!i){if(o=u||h?{}:M9(t),!s)return u?O9(t,E9(o,t)):$9(t,k9(o,t))}else{if(!Ke[f])return i?t:{};o=q9(t,f,s)}}a||(a=new b9);var v=a.get(t);if(v)return v;a.set(t,o),H9(t)?t.forEach(function(P){o.add(Yf(P,e,r,P,t,a))}):G9(t)&&t.forEach(function(P,k){o.set(k,Yf(P,e,r,k,t,a))});var y=l?u?D9:I9:u?W9:K9,R=c?void 0:y(t);return C9(R||t,function(P,k){R&&(k=P,P=t[k]),P9(o,k,Yf(P,e,r,k,t,a))}),o}jw.exports=Yf});var Ai=d((pye,Uw)=>{var vY=Gw(),TY=4;function _Y(t){return vY(t,TY)}Uw.exports=_Y});var Hw=d(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.PRINT_WARNING=cs.PRINT_ERROR=void 0;function RY(t){console&&console.error&&console.error("Error: ".concat(t))}cs.PRINT_ERROR=RY;function AY(t){console&&console.warn&&console.warn("Warning: ".concat(t))}cs.PRINT_WARNING=AY});var Kw=d(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.timer=void 0;function SY(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}Xf.timer=SY});var Ww=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var fs=d(Hn=>{"use strict";Object.defineProperty(Hn,"__esModule",{value:!0});Hn.toFastProperties=Hn.timer=Hn.PRINT_ERROR=Hn.PRINT_WARNING=void 0;var Bw=Hw();Object.defineProperty(Hn,"PRINT_WARNING",{enumerable:!0,get:function(){return Bw.PRINT_WARNING}});Object.defineProperty(Hn,"PRINT_ERROR",{enumerable:!0,get:function(){return Bw.PRINT_ERROR}});var bY=Kw();Object.defineProperty(Hn,"timer",{enumerable:!0,get:function(){return bY.timer}});var CY=Ww();Object.defineProperty(Hn,"toFastProperties",{enumerable:!0,get:function(){return CY.toFastProperties}})});var Jf=d((gye,Vw)=>{function PY(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}Vw.exports=PY});var Yw=d((vye,zw)=>{var kY=/\s/;function EY(t){for(var e=t.length;e--&&kY.test(t.charAt(e)););return e}zw.exports=EY});var Jw=d((Tye,Xw)=>{var wY=Yw(),NY=/^\s+/;function $Y(t){return t&&t.slice(0,wY(t)+1).replace(NY,"")}Xw.exports=$Y});var tN=d((_ye,eN)=>{var OY=Jw(),Qw=vn(),IY=os(),Zw=0/0,DY=/^[-+]0x[0-9a-f]+$/i,xY=/^0b[01]+$/i,LY=/^0o[0-7]+$/i,qY=parseInt;function MY(t){if(typeof t=="number")return t;if(IY(t))return Zw;if(Qw(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Qw(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=OY(t);var r=xY.test(t);return r||LY.test(t)?qY(t.slice(2),r?2:8):DY.test(t)?Zw:+t}eN.exports=MY});var iN=d((Rye,nN)=>{var FY=tN(),rN=1/0,jY=17976931348623157e292;function GY(t){if(!t)return t===0?t:0;if(t=FY(t),t===rN||t===-rN){var e=t<0?-1:1;return e*jY}return t===t?t:0}nN.exports=GY});var ds=d((Aye,aN)=>{var UY=iN();function HY(t){var e=UY(t),r=e%1;return e===e?r?e-r:e:0}aN.exports=HY});var Qf=d((Sye,oN)=>{var KY=Jf(),WY=ds();function BY(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:WY(e),KY(t,e<0?0:e,n)):[]}oN.exports=BY});var Zu=d((bye,sN)=>{var VY=ia(),zY=Oe(),YY=Tn(),XY="[object String]";function JY(t){return typeof t=="string"||!zY(t)&&YY(t)&&VY(t)==XY}sN.exports=JY});var lN=d((Cye,uN)=>{var QY=ia(),ZY=Tn(),eX="[object RegExp]";function tX(t){return ZY(t)&&QY(t)==eX}uN.exports=tX});var sv=d((Pye,dN)=>{var rX=lN(),nX=Qo(),cN=Hu(),fN=cN&&cN.isRegExp,iX=fN?nX(fN):rX;dN.exports=iX});var hN=d((kye,mN)=>{var aX=Xu(),oX=Yu(),sX=zu(),pN=vn(),uX=ss();function lX(t,e,r,n){if(!pN(t))return t;e=oX(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=uX(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=pN(c)?c:sX(e[i+1])?[]:{})}aX(s,u,l),s=s[u]}return t}mN.exports=lX});var gN=d((Eye,yN)=>{var cX=Bf(),fX=hN(),dX=Yu();function pX(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=cX(t,o);r(s,o)&&fX(a,dX(o,t),s)}return a}yN.exports=pX});var uv=d((wye,vN)=>{var mX=es(),hX=Vr(),yX=gN(),gX=ov();function vX(t,e){if(t==null)return{};var r=mX(gX(t),function(n){return[n]});return e=hX(e),yX(t,r,function(n,i){return e(n,i[0])})}vN.exports=vX});var _N=d((Nye,TN)=>{function TX(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}TN.exports=TX});var SN=d(($ye,AN)=>{var _X=_N(),RN=Math.max;function RX(t,e,r){return e=RN(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=RN(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),_X(t,this,s)}}AN.exports=RX});var CN=d((Oye,bN)=>{function AX(t){return function(){return t}}bN.exports=AX});var EN=d((Iye,kN)=>{var SX=CN(),PN=nv(),bX=Ma(),CX=PN?function(t,e){return PN(t,"toString",{configurable:!0,enumerable:!1,value:SX(e),writable:!0})}:bX;kN.exports=CX});var NN=d((Dye,wN)=>{var PX=800,kX=16,EX=Date.now;function wX(t){var e=0,r=0;return function(){var n=EX(),i=kX-(n-r);if(r=n,i>0){if(++e>=PX)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}wN.exports=wX});var ON=d((xye,$N)=>{var NX=EN(),$X=NN(),OX=$X(NX);$N.exports=OX});var Zf=d((Lye,IN)=>{var IX=Ma(),DX=SN(),xX=ON();function LX(t,e){return xX(DX(t,e,IX),t+"")}IN.exports=LX});var el=d((qye,DN)=>{var qX=ts(),MX=_n(),FX=zu(),jX=vn();function GX(t,e,r){if(!jX(r))return!1;var n=typeof e;return(n=="number"?MX(r)&&FX(e,r.length):n=="string"&&e in r)?qX(r[e],t):!1}DN.exports=GX});var LN=d((Mye,xN)=>{var UX=Zf(),HX=el();function KX(t){return UX(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&HX(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}xN.exports=KX});var tl=d((Fye,qN)=>{var WX=Xu(),BX=us(),VX=LN(),zX=_n(),YX=Vo(),XX=Er(),JX=Object.prototype,QX=JX.hasOwnProperty,ZX=VX(function(t,e){if(YX(e)||zX(e)){BX(e,XX(e),t);return}for(var r in e)QX.call(e,r)&&WX(t,r,e[r])});qN.exports=ZX});var td=d(Ce=>{"use strict";var Si=Ce&&Ce.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ps=Ce&&Ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ce,"__esModule",{value:!0});Ce.serializeProduction=Ce.serializeGrammar=Ce.Terminal=Ce.Alternation=Ce.RepetitionWithSeparator=Ce.Repetition=Ce.RepetitionMandatoryWithSeparator=Ce.RepetitionMandatory=Ce.Option=Ce.Alternative=Ce.Rule=Ce.NonTerminal=Ce.AbstractProduction=void 0;var MN=ps(Mt()),eJ=ps(Ft()),lv=ps(Zu()),tJ=ps(sv()),Kn=ps(uv()),Wn=ps(tl());function rJ(t){return nJ(t)?t.LABEL:t.name}function nJ(t){return(0,lv.default)(t.LABEL)&&t.LABEL!==""}var Bn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,eJ.default)(this.definition,function(r){r.accept(e)})},t}();Ce.AbstractProduction=Bn;var FN=function(t){Si(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Bn);Ce.NonTerminal=FN;var jN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Rule=jN;var GN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Alternative=GN;var UN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Option=UN;var HN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.RepetitionMandatory=HN;var KN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.RepetitionMandatoryWithSeparator=KN;var WN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Repetition=WN;var BN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.RepetitionWithSeparator=BN;var VN=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Bn);Ce.Alternation=VN;var ed=function(){function t(e){this.idx=1,(0,Wn.default)(this,(0,Kn.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Ce.Terminal=ed;function iJ(t){return(0,MN.default)(t,rl)}Ce.serializeGrammar=iJ;function rl(t){function e(a){return(0,MN.default)(a,rl)}if(t instanceof FN){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,lv.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof GN)return{type:"Alternative",definition:e(t.definition)};if(t instanceof UN)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof HN)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof KN)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:rl(new ed({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof BN)return{type:"RepetitionWithSeparator",idx:t.idx,separator:rl(new ed({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof WN)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof VN)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ed){var n={type:"Terminal",name:t.terminalType.name,label:rJ(t.terminalType),idx:t.idx};(0,lv.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,tJ.default)(i)?i.source:i),n}else{if(t instanceof jN)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Ce.serializeProduction=rl});var zN=d(rd=>{"use strict";Object.defineProperty(rd,"__esModule",{value:!0});rd.GAstVisitor=void 0;var Vn=td(),aJ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case Vn.NonTerminal:return this.visitNonTerminal(r);case Vn.Alternative:return this.visitAlternative(r);case Vn.Option:return this.visitOption(r);case Vn.RepetitionMandatory:return this.visitRepetitionMandatory(r);case Vn.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case Vn.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case Vn.Repetition:return this.visitRepetition(r);case Vn.Alternation:return this.visitAlternation(r);case Vn.Terminal:return this.visitTerminal(r);case Vn.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();rd.GAstVisitor=aJ});var XN=d((Uye,YN)=>{var oJ=oa();function sJ(t,e){var r;return oJ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}YN.exports=sJ});var nd=d((Hye,JN)=>{var uJ=Gg(),lJ=Vr(),cJ=XN(),fJ=Oe(),dJ=el();function pJ(t,e,r){var n=fJ(t)?uJ:cJ;return r&&dJ(t,e,r)&&(e=void 0),n(t,lJ(e,3))}JN.exports=pJ});var ZN=d((Kye,QN)=>{function mJ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}QN.exports=mJ});var t$=d((Wye,e$)=>{var hJ=oa();function yJ(t,e){var r=!0;return hJ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}e$.exports=yJ});var nl=d((Bye,r$)=>{var gJ=ZN(),vJ=t$(),TJ=Vr(),_J=Oe(),RJ=el();function AJ(t,e,r){var n=_J(t)?gJ:vJ;return r&&RJ(t,e,r)&&(e=void 0),n(t,TJ(e,3))}r$.exports=AJ});var cv=d((Vye,n$)=>{function SJ(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}n$.exports=SJ});var a$=d((zye,i$)=>{function bJ(t){return t!==t}i$.exports=bJ});var s$=d((Yye,o$)=>{function CJ(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}o$.exports=CJ});var id=d((Xye,u$)=>{var PJ=cv(),kJ=a$(),EJ=s$();function wJ(t,e,r){return e===e?EJ(t,e,r):PJ(t,kJ,r)}u$.exports=wJ});var bi=d((Jye,l$)=>{var NJ=id(),$J=_n(),OJ=Zu(),IJ=ds(),DJ=Un(),xJ=Math.max;function LJ(t,e,r,n){t=$J(t)?t:DJ(t),r=r&&!n?IJ(r):0;var i=t.length;return r<0&&(r=xJ(i+r,0)),OJ(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&NJ(t,e,r)>-1}l$.exports=LJ});var c$=d(zr=>{"use strict";var dv=zr&&zr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zr,"__esModule",{value:!0});zr.getProductionDslName=zr.isBranchingProd=zr.isOptionalProd=zr.isSequenceProd=void 0;var qJ=dv(nd()),MJ=dv(nl()),FJ=dv(bi()),rt=td();function jJ(t){return t instanceof rt.Alternative||t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionMandatory||t instanceof rt.RepetitionMandatoryWithSeparator||t instanceof rt.RepetitionWithSeparator||t instanceof rt.Terminal||t instanceof rt.Rule}zr.isSequenceProd=jJ;function fv(t,e){e===void 0&&(e=[]);var r=t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionWithSeparator;return r?!0:t instanceof rt.Alternation?(0,qJ.default)(t.definition,function(n){return fv(n,e)}):t instanceof rt.NonTerminal&&(0,FJ.default)(e,t)?!1:t instanceof rt.AbstractProduction?(t instanceof rt.NonTerminal&&e.push(t),(0,MJ.default)(t.definition,function(n){return fv(n,e)})):!1}zr.isOptionalProd=fv;function GJ(t){return t instanceof rt.Alternation}zr.isBranchingProd=GJ;function UJ(t){if(t instanceof rt.NonTerminal)return"SUBRULE";if(t instanceof rt.Option)return"OPTION";if(t instanceof rt.Alternation)return"OR";if(t instanceof rt.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof rt.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof rt.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof rt.Repetition)return"MANY";if(t instanceof rt.Terminal)return"CONSUME";throw Error("non exhaustive match")}zr.getProductionDslName=UJ});var dt=d(me=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});me.isSequenceProd=me.isBranchingProd=me.isOptionalProd=me.getProductionDslName=me.GAstVisitor=me.serializeProduction=me.serializeGrammar=me.Alternative=me.Alternation=me.RepetitionWithSeparator=me.RepetitionMandatoryWithSeparator=me.RepetitionMandatory=me.Repetition=me.Option=me.NonTerminal=me.Terminal=me.Rule=void 0;var Yr=td();Object.defineProperty(me,"Rule",{enumerable:!0,get:function(){return Yr.Rule}});Object.defineProperty(me,"Terminal",{enumerable:!0,get:function(){return Yr.Terminal}});Object.defineProperty(me,"NonTerminal",{enumerable:!0,get:function(){return Yr.NonTerminal}});Object.defineProperty(me,"Option",{enumerable:!0,get:function(){return Yr.Option}});Object.defineProperty(me,"Repetition",{enumerable:!0,get:function(){return Yr.Repetition}});Object.defineProperty(me,"RepetitionMandatory",{enumerable:!0,get:function(){return Yr.RepetitionMandatory}});Object.defineProperty(me,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Yr.RepetitionMandatoryWithSeparator}});Object.defineProperty(me,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Yr.RepetitionWithSeparator}});Object.defineProperty(me,"Alternation",{enumerable:!0,get:function(){return Yr.Alternation}});Object.defineProperty(me,"Alternative",{enumerable:!0,get:function(){return Yr.Alternative}});Object.defineProperty(me,"serializeGrammar",{enumerable:!0,get:function(){return Yr.serializeGrammar}});Object.defineProperty(me,"serializeProduction",{enumerable:!0,get:function(){return Yr.serializeProduction}});var HJ=zN();Object.defineProperty(me,"GAstVisitor",{enumerable:!0,get:function(){return HJ.GAstVisitor}});var ad=c$();Object.defineProperty(me,"getProductionDslName",{enumerable:!0,get:function(){return ad.getProductionDslName}});Object.defineProperty(me,"isOptionalProd",{enumerable:!0,get:function(){return ad.isOptionalProd}});Object.defineProperty(me,"isBranchingProd",{enumerable:!0,get:function(){return ad.isBranchingProd}});Object.defineProperty(me,"isSequenceProd",{enumerable:!0,get:function(){return ad.isSequenceProd}})});var od=d(ms=>{"use strict";var p$=ms&&ms.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ms,"__esModule",{value:!0});ms.RestWalker=void 0;var KJ=p$(Qf()),f$=p$(Ft()),Tr=dt(),WJ=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,f$.default)(e.definition,function(i,a){var o=(0,KJ.default)(e.definition,a+1);if(i instanceof Tr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof Tr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof Tr.Alternative)n.walkFlat(i,o,r);else if(i instanceof Tr.Option)n.walkOption(i,o,r);else if(i instanceof Tr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof Tr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof Tr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof Tr.Repetition)n.walkMany(i,o,r);else if(i instanceof Tr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Tr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=d$(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Tr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=d$(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,f$.default)(e.definition,function(o){var s=new Tr.Alternative({definition:[o]});i.walk(s,a)})},t}();ms.RestWalker=WJ;function d$(t,e,r){var n=[new Tr.Option({definition:[new Tr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var g$=d((tge,y$)=>{var m$=La(),BJ=Mu(),VJ=Oe(),h$=m$?m$.isConcatSpreadable:void 0;function zJ(t){return VJ(t)||BJ(t)||!!(h$&&t&&t[h$])}y$.exports=zJ});var sd=d((rge,T$)=>{var YJ=Gf(),XJ=g$();function v$(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=XJ),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?v$(s,e-1,r,n,i):YJ(i,s):n||(i[i.length]=s)}return i}T$.exports=v$});var Rn=d((nge,_$)=>{var JJ=sd();function QJ(t){var e=t==null?0:t.length;return e?JJ(t,1):[]}_$.exports=QJ});var pv=d((ige,R$)=>{var ZJ=id();function eQ(t,e){var r=t==null?0:t.length;return!!r&&ZJ(t,e,0)>-1}R$.exports=eQ});var mv=d((age,A$)=>{function tQ(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}A$.exports=tQ});var ud=d((oge,S$)=>{function rQ(){}S$.exports=rQ});var C$=d((sge,b$)=>{var hv=Dg(),nQ=ud(),iQ=jf(),aQ=1/0,oQ=hv&&1/iQ(new hv([,-0]))[1]==aQ?function(t){return new hv(t)}:nQ;b$.exports=oQ});var yv=d((uge,P$)=>{var sQ=Mf(),uQ=pv(),lQ=mv(),cQ=Ff(),fQ=C$(),dQ=jf(),pQ=200;function mQ(t,e,r){var n=-1,i=uQ,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=lQ;else if(a>=pQ){var l=e?null:fQ(t);if(l)return dQ(l);o=!1,i=cQ,u=new sQ}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var h=u.length;h--;)if(u[h]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}P$.exports=mQ});var ld=d((lge,k$)=>{var hQ=yv();function yQ(t){return t&&t.length?hQ(t):[]}k$.exports=yQ});var Tv=d(Xr=>{"use strict";var vv=Xr&&Xr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xr,"__esModule",{value:!0});Xr.firstForTerminal=Xr.firstForBranching=Xr.firstForSequence=Xr.first=void 0;var gQ=vv(Rn()),w$=vv(ld()),vQ=vv(Mt()),E$=dt(),gv=dt();function cd(t){if(t instanceof E$.NonTerminal)return cd(t.referencedRule);if(t instanceof E$.Terminal)return O$(t);if((0,gv.isSequenceProd)(t))return N$(t);if((0,gv.isBranchingProd)(t))return $$(t);throw Error("non exhaustive match")}Xr.first=cd;function N$(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,gv.isOptionalProd)(a),e=e.concat(cd(a)),n=n+1,i=r.length>n;return(0,w$.default)(e)}Xr.firstForSequence=N$;function $$(t){var e=(0,vQ.default)(t.definition,function(r){return cd(r)});return(0,w$.default)((0,gQ.default)(e))}Xr.firstForBranching=$$;function O$(t){return[t.terminalType]}Xr.firstForTerminal=O$});var _v=d(fd=>{"use strict";Object.defineProperty(fd,"__esModule",{value:!0});fd.IN=void 0;fd.IN="_~IN~_"});var q$=d(_r=>{"use strict";var TQ=_r&&_r.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),I$=_r&&_r.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_r,"__esModule",{value:!0});_r.buildInProdFollowPrefix=_r.buildBetweenProdsFollowPrefix=_r.computeAllProdsFollows=_r.ResyncFollowsWalker=void 0;var _Q=od(),RQ=Tv(),AQ=I$(Ft()),SQ=I$(tl()),D$=_v(),bQ=dt(),x$=function(t){TQ(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=L$(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new bQ.Alternative({definition:o}),u=(0,RQ.first)(s);this.follows[a]=u},e}(_Q.RestWalker);_r.ResyncFollowsWalker=x$;function CQ(t){var e={};return(0,AQ.default)(t,function(r){var n=new x$(r).startWalking();(0,SQ.default)(e,n)}),e}_r.computeAllProdsFollows=CQ;function L$(t,e){return t.name+e+D$.IN}_r.buildBetweenProdsFollowPrefix=L$;function PQ(t){var e=t.terminalType.name;return e+t.idx+D$.IN}_r.buildInProdFollowPrefix=PQ});var Fa=d((pge,M$)=>{function kQ(t){return t===void 0}M$.exports=kQ});var j$=d((mge,F$)=>{function EQ(t){return t&&t.length?t[0]:void 0}F$.exports=EQ});var hs=d((hge,G$)=>{G$.exports=j$()});var il=d((yge,U$)=>{function wQ(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}U$.exports=wQ});var Rv=d((gge,H$)=>{var NQ=oa();function $Q(t,e){var r=[];return NQ(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}H$.exports=$Q});var W$=d((vge,K$)=>{var OQ="Expected a function";function IQ(t){if(typeof t!="function")throw new TypeError(OQ);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}K$.exports=IQ});var dd=d((Tge,B$)=>{var DQ=Uf(),xQ=Rv(),LQ=Vr(),qQ=Oe(),MQ=W$();function FQ(t,e){var r=qQ(t)?DQ:xQ;return r(t,MQ(LQ(e,3)))}B$.exports=FQ});var z$=d((_ge,V$)=>{var jQ=Mf(),GQ=pv(),UQ=mv(),HQ=es(),KQ=Qo(),WQ=Ff(),BQ=200;function VQ(t,e,r,n){var i=-1,a=GQ,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=HQ(e,KQ(r))),n?(a=UQ,o=!1):e.length>=BQ&&(a=WQ,o=!1,e=new jQ(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var h=l;h--;)if(e[h]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}V$.exports=VQ});var X$=d((Rge,Y$)=>{var zQ=_n(),YQ=Tn();function XQ(t){return YQ(t)&&zQ(t)}Y$.exports=XQ});var pd=d((Age,Q$)=>{var JQ=z$(),QQ=sd(),ZQ=Zf(),J$=X$(),eZ=ZQ(function(t,e){return J$(t)?JQ(t,QQ(e,1,J$,!0)):[]});Q$.exports=eZ});var eO=d((Sge,Z$)=>{var tZ=id(),rZ=ds(),nZ=Math.max;function iZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:rZ(r);return i<0&&(i=nZ(n+i,0)),tZ(t,e,i)}Z$.exports=iZ});var rO=d((bge,tO)=>{var aZ=Vr(),oZ=_n(),sZ=Er();function uZ(t){return function(e,r,n){var i=Object(e);if(!oZ(e)){var a=aZ(r,3);e=sZ(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}tO.exports=uZ});var iO=d((Cge,nO)=>{var lZ=cv(),cZ=Vr(),fZ=ds(),dZ=Math.max;function pZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:fZ(r);return i<0&&(i=dZ(n+i,0)),lZ(t,cZ(e,3),i)}nO.exports=pZ});var md=d((Pge,aO)=>{var mZ=rO(),hZ=iO(),yZ=mZ(hZ);aO.exports=yZ});var al=d((kge,oO)=>{var gZ=Uf(),vZ=Rv(),TZ=Vr(),_Z=Oe();function RZ(t,e){var r=_Z(t)?gZ:vZ;return r(t,TZ(e,3))}oO.exports=RZ});var Av=d((Ege,uO)=>{var AZ=Zf(),SZ=ts(),bZ=el(),CZ=Ju(),sO=Object.prototype,PZ=sO.hasOwnProperty,kZ=AZ(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&bZ(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=CZ(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||SZ(c,sO[l])&&!PZ.call(t,l))&&(t[l]=a[l])}return t});uO.exports=kZ});var cO=d((wge,lO)=>{function EZ(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}lO.exports=EZ});var dO=d((Nge,fO)=>{function wZ(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}fO.exports=wZ});var Ci=d(($ge,pO)=>{var NZ=cO(),$Z=oa(),OZ=Vr(),IZ=dO(),DZ=Oe();function xZ(t,e,r){var n=DZ(t)?NZ:IZ,i=arguments.length<3;return n(t,OZ(e,4),r,i,$Z)}pO.exports=xZ});var yd=d(ys=>{"use strict";Object.defineProperty(ys,"__esModule",{value:!0});ys.clearRegExpParserCache=ys.getRegExpAst=void 0;var LZ=wu(),hd={},qZ=new LZ.RegExpParser;function MZ(t){var e=t.toString();if(hd.hasOwnProperty(e))return hd[e];var r=qZ.pattern(e);return hd[e]=r,r}ys.getRegExpAst=MZ;function FZ(){hd={}}ys.clearRegExpParserCache=FZ});var TO=d(rr=>{"use strict";var jZ=rr&&rr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),gs=rr&&rr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(rr,"__esModule",{value:!0});rr.canMatchCharCode=rr.firstCharOptimizedIndices=rr.getOptimizedStartCodesIndices=rr.failedOptimizationPrefixMsg=void 0;var yO=wu(),GZ=gs(Oe()),UZ=gs(nl()),HZ=gs(Ft()),Sv=gs(md()),KZ=gs(Un()),Cv=gs(bi()),mO=fs(),gO=yd(),Pi=Pv(),vO="Complement Sets are not supported for first char optimization";rr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function WZ(t,e){e===void 0&&(e=!1);try{var r=(0,gO.getRegExpAst)(t),n=vd(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===vO)e&&(0,mO.PRINT_WARNING)("".concat(rr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,mO.PRINT_ERROR)("".concat(rr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(yO.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}rr.getOptimizedStartCodesIndices=WZ;function vd(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)vd(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":gd(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(vO);(0,HZ.default)(o.value,function(l){if(typeof l=="number")gd(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)gd(f,e,r);else{for(var f=c.from;f<=c.to&&f<Pi.minOptimizationVal;f++)gd(f,e,r);if(c.to>=Pi.minOptimizationVal)for(var h=c.from>=Pi.minOptimizationVal?c.from:Pi.minOptimizationVal,v=c.to,y=(0,Pi.charCodeToOptimizedIndex)(h),R=(0,Pi.charCodeToOptimizedIndex)(v),P=y;P<=R;P++)e[P]=P}}});break;case"Group":vd(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&bv(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,KZ.default)(e)}rr.firstCharOptimizedIndices=vd;function gd(t,e,r){var n=(0,Pi.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&BZ(t,e)}function BZ(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Pi.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Pi.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function hO(t,e){return(0,Sv.default)(t.value,function(r){if(typeof r=="number")return(0,Cv.default)(e,r);var n=r;return(0,Sv.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function bv(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,GZ.default)(t.value)?(0,UZ.default)(t.value,bv):bv(t.value):!1}var VZ=function(t){jZ(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,Cv.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?hO(r,this.targetCharCodes)===void 0&&(this.found=!0):hO(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(yO.BaseRegExpVisitor);function zZ(t,e){if(e instanceof RegExp){var r=(0,gO.getRegExpAst)(e),n=new VZ(t);return n.visit(r),n.found}else return(0,Sv.default)(e,function(i){return(0,Cv.default)(t,i.charCodeAt(0))})!==void 0}rr.canMatchCharCode=zZ});var Pv=d(K=>{"use strict";var AO=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),lt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var SO=wu(),De=ol(),YZ=lt(hs()),bO=lt(kr()),CO=lt(il()),_d=lt(Oe()),XZ=lt(Un()),JZ=lt(Rn()),PO=lt(dd()),kO=lt(pd()),_O=lt(eO()),nt=lt(Mt()),ki=lt(Ft()),Ei=lt(Zu()),Ad=lt(zo()),Ev=lt(Fa()),QZ=lt(md()),nr=lt(wr()),ZZ=lt(Er()),sa=lt(sv()),zn=lt(al()),eee=lt(Av()),Rd=lt(Ci()),Sd=lt(bi()),RO=fs(),vs=TO(),EO=yd(),ja="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function tee(){K.SUPPORT_STICKY=!1}K.disableSticky=tee;function ree(){K.SUPPORT_STICKY=!0}K.enableSticky=ree;function nee(t,e){e=(0,eee.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(b,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){pee()});var n;r("Reject Lexer.NA",function(){n=(0,PO.default)(t,function(b){return b[ja]===De.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,nt.default)(n,function(b){var S=b[ja];if((0,sa.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,Sd.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?Nv(S):wv(S)}else{if((0,Ad.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?Nv(W):wv(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,nt.default)(n,function(b){return b.tokenTypeIdx}),s=(0,nt.default)(n,function(b){var S=b.GROUP;if(S!==De.Lexer.SKIPPED){if((0,Ei.default)(S))return S;if((0,Ev.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,nt.default)(n,function(b){var S=b.LONGER_ALT;if(S){var O=(0,_d.default)(S)?(0,nt.default)(S,function(F){return(0,_O.default)(n,F)}):[(0,_O.default)(n,S)];return O}}),l=(0,nt.default)(n,function(b){return b.PUSH_MODE}),c=(0,nt.default)(n,function(b){return(0,nr.default)(b,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var b=UO(e.lineTerminatorCharacters);f=(0,nt.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,nt.default)(n,function(S){return(0,nr.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:jO(S,b)===!1&&(0,vs.canMatchCharCode)(b,S.PATTERN)}))});var h,v,y,R;r("Misc Mapping #2",function(){h=(0,nt.default)(n,Ov),v=(0,nt.default)(a,FO),y=(0,Rd.default)(n,function(b,S){var O=S.GROUP;return(0,Ei.default)(O)&&O!==De.Lexer.SKIPPED&&(b[O]=[]),b},{}),R=(0,nt.default)(a,function(b,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:f[S],isCustom:h[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var P=!0,k=[];return e.safeMode||r("First Char Optimization",function(){k=(0,Rd.default)(n,function(b,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=$v(F);kv(b,W,R[O])}else if((0,_d.default)(S.START_CHARS_HINT)){var re;(0,ki.default)(S.START_CHARS_HINT,function(V){var Ae=typeof V=="string"?V.charCodeAt(0):V,Ye=$v(Ae);re!==Ye&&(re=Ye,kv(b,Ye,R[O]))})}else if((0,sa.default)(S.PATTERN))if(S.PATTERN.unicode)P=!1,e.ensureOptimizations&&(0,RO.PRINT_ERROR)("".concat(vs.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var we=(0,vs.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,bO.default)(we)&&(P=!1),(0,ki.default)(we,function(V){kv(b,V,R[O])})}else e.ensureOptimizations&&(0,RO.PRINT_ERROR)("".concat(vs.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),P=!1;return b},[])}),{emptyGroups:y,patternIdxToConfig:R,charCodeToPatternIdxToConfig:k,hasCustom:i,canBeOptimized:P}}K.analyzeTokenTypes=nee;function iee(t,e){var r=[],n=wO(t);r=r.concat(n.errors);var i=NO(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(aee(a)),r=r.concat(LO(a)),r=r.concat(qO(a,e)),r=r.concat(MO(a)),r}K.validatePatterns=iee;function aee(t){var e=[],r=(0,zn.default)(t,function(n){return(0,sa.default)(n[ja])});return e=e.concat($O(r)),e=e.concat(IO(r)),e=e.concat(DO(r)),e=e.concat(xO(r)),e=e.concat(OO(r)),e}function wO(t){var e=(0,zn.default)(t,function(i){return!(0,nr.default)(i,ja)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:De.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,kO.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=wO;function NO(t){var e=(0,zn.default)(t,function(i){var a=i[ja];return!(0,sa.default)(a)&&!(0,Ad.default)(a)&&!(0,nr.default)(a,"exec")&&!(0,Ei.default)(a)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:De.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,kO.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=NO;var oee=/[^\\][$]/;function $O(t){var e=function(i){AO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(SO.BaseRegExpVisitor),r=(0,zn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,EO.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return oee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=$O;function OO(t){var e=(0,zn.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:De.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=OO;var see=/[^\\[][\^]|^\^/;function IO(t){var e=function(i){AO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(SO.BaseRegExpVisitor),r=(0,zn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,EO.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return see.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=IO;function DO(t){var e=(0,zn.default)(t,function(n){var i=n[ja];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:De.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=DO;function xO(t){var e=[],r=(0,nt.default)(t,function(a){return(0,Rd.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,Sd.default)(e,s)&&s.PATTERN!==De.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,CO.default)(r);var n=(0,zn.default)(r,function(a){return a.length>1}),i=(0,nt.default)(n,function(a){var o=(0,nt.default)(a,function(u){return u.name}),s=(0,YZ.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:De.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=xO;function LO(t){var e=(0,zn.default)(t,function(n){if(!(0,nr.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==De.Lexer.SKIPPED&&i!==De.Lexer.NA&&!(0,Ei.default)(i)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:De.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=LO;function qO(t,e){var r=(0,zn.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,Sd.default)(e,i.PUSH_MODE)}),n=(0,nt.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:De.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=qO;function MO(t){var e=[],r=(0,Rd.default)(t,function(n,i,a){var o=i.PATTERN;return o===De.Lexer.NA||((0,Ei.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,sa.default)(o)&&lee(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,ki.default)(t,function(n,i){(0,ki.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&uee(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:De.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=MO;function uee(t,e){if((0,sa.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,Ad.default)(e))return e(t,0,[],{});if((0,nr.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function lee(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,QZ.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function wv(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=wv;function Nv(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=Nv;function cee(t,e,r){var n=[];return(0,nr.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,nr.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,nr.default)(t,K.MODES)&&(0,nr.default)(t,K.DEFAULT_MODE)&&!(0,nr.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,nr.default)(t,K.MODES)&&(0,ki.default)(t.modes,function(i,a){(0,ki.default)(i,function(o,s){if((0,Ev.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:De.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,nr.default)(o,"LONGER_ALT")){var u=(0,_d.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,ki.default)(u,function(l){!(0,Ev.default)(l)&&!(0,Sd.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=cee;function fee(t,e,r){var n=[],i=!1,a=(0,CO.default)((0,JZ.default)((0,XZ.default)(t.modes))),o=(0,PO.default)(a,function(u){return u[ja]===De.Lexer.NA}),s=UO(r);return e&&(0,ki.default)(o,function(u){var l=jO(u,s);if(l!==!1){var c=GO(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,nr.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,vs.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:De.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=fee;function dee(t){var e={},r=(0,ZZ.default)(t);return(0,ki.default)(r,function(n){var i=t[n];if((0,_d.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=dee;function Ov(t){var e=t.PATTERN;if((0,sa.default)(e))return!1;if((0,Ad.default)(e))return!0;if((0,nr.default)(e,"exec"))return!0;if((0,Ei.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=Ov;function FO(t){return(0,Ei.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=FO;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function jO(t,e){if((0,nr.default)(t,"LINE_BREAKS"))return!1;if((0,sa.default)(t.PATTERN)){try{(0,vs.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Ei.default)(t.PATTERN))return!1;if(Ov(t))return{issue:De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function GO(t,e){if(e.issue===De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=GO;function UO(t){var e=(0,nt.default)(t,function(r){return(0,Ei.default)(r)?r.charCodeAt(0):r});return e}function kv(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var Td=[];function $v(t){return t<K.minOptimizationVal?t:Td[t]}K.charCodeToOptimizedIndex=$v;function pee(){if((0,bO.default)(Td)){Td=new Array(65536);for(var t=0;t<65536;t++)Td[t]=t>255?255+~~(t/255):t}}});var bd=d((xge,HO)=>{function mee(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}HO.exports=mee});var Ua=d(fe=>{"use strict";var Yn=fe&&fe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fe,"__esModule",{value:!0});fe.isTokenType=fe.hasExtendingTokensTypesMapProperty=fe.hasExtendingTokensTypesProperty=fe.hasCategoriesProperty=fe.hasShortKeyProperty=fe.singleAssignCategoriesToksMap=fe.assignCategoriesMapProp=fe.assignCategoriesTokensProp=fe.assignTokenDefaultProps=fe.expandCategories=fe.augmentTokenTypes=fe.tokenIdxToClass=fe.tokenShortNameIdx=fe.tokenStructuredMatcherNoCategories=fe.tokenStructuredMatcher=void 0;var hee=Yn(kr()),yee=Yn(il()),gee=Yn(Oe()),vee=Yn(Rn()),Tee=Yn(pd()),_ee=Yn(Mt()),Ga=Yn(Ft()),sl=Yn(wr()),Ree=Yn(bi()),Aee=Yn(Ai());function See(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}fe.tokenStructuredMatcher=See;function bee(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}fe.tokenStructuredMatcherNoCategories=bee;fe.tokenShortNameIdx=1;fe.tokenIdxToClass={};function Cee(t){var e=KO(t);WO(e),VO(e),BO(e),(0,Ga.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}fe.augmentTokenTypes=Cee;function KO(t){for(var e=(0,Aee.default)(t),r=t,n=!0;n;){r=(0,yee.default)((0,vee.default)((0,_ee.default)(r,function(a){return a.CATEGORIES})));var i=(0,Tee.default)(r,e);e=e.concat(i),(0,hee.default)(i)?n=!1:r=i}return e}fe.expandCategories=KO;function WO(t){(0,Ga.default)(t,function(e){zO(e)||(fe.tokenIdxToClass[fe.tokenShortNameIdx]=e,e.tokenTypeIdx=fe.tokenShortNameIdx++),Iv(e)&&!(0,gee.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),Iv(e)||(e.CATEGORIES=[]),YO(e)||(e.categoryMatches=[]),XO(e)||(e.categoryMatchesMap={})})}fe.assignTokenDefaultProps=WO;function BO(t){(0,Ga.default)(t,function(e){e.categoryMatches=[],(0,Ga.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(fe.tokenIdxToClass[n].tokenTypeIdx)})})}fe.assignCategoriesTokensProp=BO;function VO(t){(0,Ga.default)(t,function(e){Dv([],e)})}fe.assignCategoriesMapProp=VO;function Dv(t,e){(0,Ga.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,Ga.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,Ree.default)(n,r)||Dv(n,r)})}fe.singleAssignCategoriesToksMap=Dv;function zO(t){return(0,sl.default)(t,"tokenTypeIdx")}fe.hasShortKeyProperty=zO;function Iv(t){return(0,sl.default)(t,"CATEGORIES")}fe.hasCategoriesProperty=Iv;function YO(t){return(0,sl.default)(t,"categoryMatches")}fe.hasExtendingTokensTypesProperty=YO;function XO(t){return(0,sl.default)(t,"categoryMatchesMap")}fe.hasExtendingTokensTypesMapProperty=XO;function Pee(t){return(0,sl.default)(t,"tokenTypeIdx")}fe.isTokenType=Pee});var xv=d(Cd=>{"use strict";Object.defineProperty(Cd,"__esModule",{value:!0});Cd.defaultLexerErrorProvider=void 0;Cd.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var ol=d(Ni=>{"use strict";var Nr=Ni&&Ni.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ni,"__esModule",{value:!0});Ni.Lexer=Ni.LexerDefinitionErrorType=void 0;var wi=Pv(),Lv=Nr(ud()),Pd=Nr(kr()),kee=Nr(Oe()),Eee=Nr(bd()),wee=Nr(dd()),JO=Nr(Mt()),qv=Nr(Ft()),Nee=Nr(Er()),$ee=Nr(Fa()),QO=Nr(Ma()),ZO=Nr(tl()),Oee=Nr(Ci()),eI=Nr(Ai()),Mv=fs(),Iee=Ua(),Dee=xv(),xee=yd(),Lee;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Lee=Ni.LexerDefinitionErrorType||(Ni.LexerDefinitionErrorType={}));var ul={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Dee.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(ul);var qee=function(){function t(e,r){r===void 0&&(r=ul);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,Mv.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,ZO.default)({},ul,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===ul.lineTerminatorsPattern)n.config.lineTerminatorsPattern=wi.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===ul.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,kee.default)(e)?a={modes:{defaultMode:(0,eI.default)(e)},defaultMode:wi.DEFAULT_MODE}:(o=!1,a=(0,eI.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,wi.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,wi.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,qv.default)(a.modes,function(c,f){a.modes[f]=(0,wee.default)(c,function(h){return(0,$ee.default)(h)})});var s=(0,Nee.default)(a.modes);if((0,qv.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,wi.validatePatterns)(c,s))}),(0,Pd.default)(n.lexerDefinitionErrors)){(0,Iee.augmentTokenTypes)(c);var h;n.TRACE_INIT("analyzeTokenTypes",function(){h=(0,wi.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=h.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=h.charCodeToPatternIdxToConfig,n.emptyGroups=(0,ZO.default)({},n.emptyGroups,h.emptyGroups),n.hasCustom=h.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=h.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,Pd.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,JO.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,qv.default)(n.lexerDefinitionWarning,function(c){(0,Mv.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(wi.SUPPORT_STICKY?(n.chopInput=QO.default,n.match=n.matchWithTest):(n.updateLastIndex=Lv.default,n.match=n.matchWithExec),o&&(n.handleModes=Lv.default),n.trackStartLines===!1&&(n.computeNewColumn=QO.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=Lv.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Oee.default)(n.canModeBeOptimized,function(f,h,v){return h===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,Pd.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,xee.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,Mv.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,Pd.default)(this.lexerDefinitionErrors)){var n=(0,JO.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,h,v,y,R,P,k,b,S,O=e,F=O.length,W=0,re=0,we=this.hasCustom?0:Math.floor(e.length/10),V=new Array(we),Ae=[],Ye=this.trackStartLines?1:void 0,We=this.trackStartLines?1:void 0,q=(0,wi.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,oe=[],se=[],ee=[],st=[];Object.freeze(st);var Xe;function Ct(){return oe}function en(Ot){var rn=(0,wi.charCodeToOptimizedIndex)(Ot),nn=se[rn];return nn===void 0?st:nn}var Sr=function(Ot){if(ee.length===1&&Ot.tokenType.PUSH_MODE===void 0){var rn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(Ot);Ae.push({offset:Ot.startOffset,line:Ot.startLine,column:Ot.startColumn,length:Ot.image.length,message:rn})}else{ee.pop();var nn=(0,Eee.default)(ee);oe=n.patternIdxToConfig[nn],se=n.charCodeToPatternIdxToConfig[nn],B=oe.length;var wn=n.canModeBeOptimized[nn]&&n.config.safeMode===!1;se&&wn?Xe=en:Xe=Ct}};function ro(Ot){ee.push(Ot),se=this.charCodeToPatternIdxToConfig[Ot],oe=this.patternIdxToConfig[Ot],B=oe.length,B=oe.length;var rn=this.canModeBeOptimized[Ot]&&this.config.safeMode===!1;se&&rn?Xe=en:Xe=Ct}ro.call(this,r);for(var ar,no=this.config.recoveryEnabled;W<F;){l=null;var io=O.charCodeAt(W),ao=Xe(io),tu=ao.length;for(i=0;i<tu;i++){ar=ao[i];var ct=ar.pattern;c=null;var si=ar.short;if(si!==!1?io===si&&(l=ct):ar.isCustom===!0?(S=ct.exec(O,W,V,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(ct,W),l=this.match(ct,e,W)),l!==null){if(u=ar.longerAlt,u!==void 0){var ru=u.length;for(o=0;o<ru;o++){var Pn=oe[u[o]],Ra=Pn.pattern;if(f=null,Pn.isCustom===!0?(S=Ra.exec(O,W,V,q),S!==null?(s=S[0],S.payload!==void 0&&(f=S.payload)):s=null):(this.updateLastIndex(Ra,W),s=this.match(Ra,e,W)),s&&s.length>l.length){l=s,c=f,ar=Pn;break}}}break}}if(l!==null){if(h=l.length,v=ar.group,v!==void 0&&(y=ar.tokenTypeIdx,R=this.createTokenInstance(l,W,y,ar.tokenType,Ye,We,h),this.handlePayload(R,c),v===!1?re=this.addToken(V,re,R):q[v].push(R)),e=this.chopInput(e,h),W=W+h,We=this.computeNewColumn(We,h),L===!0&&ar.canLineTerminator===!0){var kn=0,Aa=void 0,Dr=void 0;j.lastIndex=0;do Aa=j.test(l),Aa===!0&&(Dr=j.lastIndex-1,kn++);while(Aa===!0);kn!==0&&(Ye=Ye+kn,We=h-Dr,this.updateTokenEndLineColumnLocation(R,v,Dr,kn,Ye,We,h))}this.handleModes(ar,Sr,ro,R)}else{for(var tn=W,oo=Ye,so=We,br=no===!1;br===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var En=oe[a],ct=En.pattern,si=En.short;if(si!==!1?O.charCodeAt(W)===si&&(br=!0):En.isCustom===!0?br=ct.exec(O,W,V,q)!==null:(this.updateLastIndex(ct,W),br=ct.exec(e)!==null),br===!0)break}if(P=W-tn,b=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,tn,P,oo,so),Ae.push({offset:tn,line:oo,column:so,length:P,message:b}),no===!1)break}}return this.hasCustom||(V.length=re),{tokens:V,groups:q,errors:Ae}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();Ni.Lexer=qee});var Ha=d(Nt=>{"use strict";var Fv=Nt&&Nt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Nt,"__esModule",{value:!0});Nt.tokenMatcher=Nt.createTokenInstance=Nt.EOF=Nt.createToken=Nt.hasTokenLabel=Nt.tokenName=Nt.tokenLabel=void 0;var Mee=Fv(Zu()),$i=Fv(wr()),Fee=Fv(Fa()),jee=ol(),jv=Ua();function Gee(t){return lI(t)?t.LABEL:t.name}Nt.tokenLabel=Gee;function Uee(t){return t.name}Nt.tokenName=Uee;function lI(t){return(0,Mee.default)(t.LABEL)&&t.LABEL!==""}Nt.hasTokenLabel=lI;var Hee="parent",tI="categories",rI="label",nI="group",iI="push_mode",aI="pop_mode",oI="longer_alt",sI="line_breaks",uI="start_chars_hint";function cI(t){return Kee(t)}Nt.createToken=cI;function Kee(t){var e=t.pattern,r={};if(r.name=t.name,(0,Fee.default)(e)||(r.PATTERN=e),(0,$i.default)(t,Hee))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,$i.default)(t,tI)&&(r.CATEGORIES=t[tI]),(0,jv.augmentTokenTypes)([r]),(0,$i.default)(t,rI)&&(r.LABEL=t[rI]),(0,$i.default)(t,nI)&&(r.GROUP=t[nI]),(0,$i.default)(t,aI)&&(r.POP_MODE=t[aI]),(0,$i.default)(t,iI)&&(r.PUSH_MODE=t[iI]),(0,$i.default)(t,oI)&&(r.LONGER_ALT=t[oI]),(0,$i.default)(t,sI)&&(r.LINE_BREAKS=t[sI]),(0,$i.default)(t,uI)&&(r.START_CHARS_HINT=t[uI]),r}Nt.EOF=cI({name:"EOF",pattern:jee.Lexer.NA});(0,jv.augmentTokenTypes)([Nt.EOF]);function Wee(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}Nt.createTokenInstance=Wee;function Bee(t,e){return(0,jv.tokenStructuredMatcher)(t,e)}Nt.tokenMatcher=Bee});var _s=d(An=>{"use strict";var Hv=An&&An.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(An,"__esModule",{value:!0});An.defaultGrammarValidatorErrorProvider=An.defaultGrammarResolverErrorProvider=An.defaultParserErrorProvider=void 0;var Ts=Ha(),Uv=Hv(hs()),ua=Hv(Mt()),Vee=Hv(Ci()),Gv=dt(),fI=dt();An.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,Ts.hasTokenLabel)(e),o=a?"--> ".concat((0,Ts.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,Uv.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,Vee.default)(e,function(v,y){return v.concat(y)},[]),c=(0,ua.default)(l,function(v){return"[".concat((0,ua.default)(v,function(y){return(0,Ts.tokenLabel)(y)}).join(", "),"]")}),f=(0,ua.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),h=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+h+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,Uv.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,ua.default)(e,function(c){return"[".concat((0,ua.default)(c,function(f){return(0,Ts.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(An.defaultParserErrorProvider);An.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};An.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof Gv.Terminal?c.terminalType.name:c instanceof Gv.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,Uv.default)(e),a=i.idx,o=(0,fI.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,ua.default)(t.prefixPath,function(i){return(0,Ts.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,ua.default)(t.prefixPath,function(i){return(0,Ts.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,fI.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,ua.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof Gv.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var mI=d(Xn=>{"use strict";var zee=Xn&&Xn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),dI=Xn&&Xn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xn,"__esModule",{value:!0});Xn.GastRefResolverVisitor=Xn.resolveGrammar=void 0;var Yee=Rr(),Xee=dI(Ft()),Jee=dI(Un()),Qee=dt();function Zee(t,e){var r=new pI(t,e);return r.resolveRefs(),r.errors}Xn.resolveGrammar=Zee;var pI=function(t){zee(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,Xee.default)((0,Jee.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:Yee.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(Qee.GAstVisitor);Xn.GastRefResolverVisitor=pI});var yI=d((Uge,hI)=>{function ete(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}hI.exports=ete});var vI=d((Hge,gI)=>{var tte=oa();function rte(t,e,r,n){return tte(t,function(i,a,o){e(n,i,r(i),o)}),n}gI.exports=rte});var _I=d((Kge,TI)=>{var nte=yI(),ite=vI(),ate=Vr(),ote=Oe();function ste(t,e){return function(r,n){var i=ote(r)?nte:ite,a=e?e():{};return i(r,t,ate(n,2),a)}}TI.exports=ste});var Kv=d((Wge,RI)=>{var ute=Vf(),lte=_I(),cte=Object.prototype,fte=cte.hasOwnProperty,dte=lte(function(t,e,r){fte.call(t,r)?t[r].push(e):ute(t,r,[e])});RI.exports=dte});var kd=d((Bge,AI)=>{var pte=sd(),mte=Mt();function hte(t,e){return pte(mte(t,e),1)}AI.exports=hte});var Ed=d((Vge,SI)=>{var yte=Jf(),gte=ds();function vte(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:gte(e),e=n-e,yte(t,0,e<0?0:e)):[]}SI.exports=vte});var cl=d(it=>{"use strict";var Wa=it&&it.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ba=it&&it.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(it,"__esModule",{value:!0});it.nextPossibleTokensAfter=it.possiblePathsFrom=it.NextTerminalAfterAtLeastOneSepWalker=it.NextTerminalAfterAtLeastOneWalker=it.NextTerminalAfterManySepWalker=it.NextTerminalAfterManyWalker=it.AbstractNextTerminalAfterProductionWalker=it.NextAfterTokenWalker=it.AbstractNextPossibleTokensWalker=void 0;var CI=od(),Nd=Ba(hs()),wd=Ba(kr()),bI=Ba(Ed()),fr=Ba(Qf()),Tte=Ba(bd()),_te=Ba(Ft()),Ka=Ba(Ai()),Rte=Tv(),de=dt(),PI=function(t){Wa(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,Ka.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,Ka.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,wd.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(CI.RestWalker);it.AbstractNextPossibleTokensWalker=PI;var Ate=function(t){Wa(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,Rte.first)(o),this.found=!0}},e}(PI);it.NextAfterTokenWalker=Ate;var ll=function(t){Wa(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(CI.RestWalker);it.AbstractNextTerminalAfterProductionWalker=ll;var Ste=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Nd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(ll);it.NextTerminalAfterManyWalker=Ste;var bte=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Nd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(ll);it.NextTerminalAfterManySepWalker=bte;var Cte=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Nd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(ll);it.NextTerminalAfterAtLeastOneWalker=Cte;var Pte=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Nd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(ll);it.NextTerminalAfterAtLeastOneSepWalker=Pte;function kI(t,e,r){r===void 0&&(r=[]),r=(0,Ka.default)(r);var n=[],i=0;function a(l){return l.concat((0,fr.default)(t,i+1))}function o(l){var c=kI(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,_te.default)(s.definition,function(l){(0,wd.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,fr.default)(t,i)}),n}it.possiblePathsFrom=kI;function kte(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,wd.default)(f);){var h=f.pop();if(h===o){s&&(0,Tte.default)(f).idx<=l&&f.pop();continue}var v=h.def,y=h.idx,R=h.ruleStack,P=h.occurrenceStack;if(!(0,wd.default)(v)){var k=v[0];if(k===i){var b={idx:y,def:(0,fr.default)(v),ruleStack:(0,bI.default)(R),occurrenceStack:(0,bI.default)(P)};f.push(b)}else if(k instanceof de.Terminal)if(y<u-1){var S=y+1,O=e[S];if(r(O,k.terminalType)){var b={idx:S,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(b)}}else if(y===u-1)c.push({nextTokenType:k.terminalType,nextTokenOccurrence:k.idx,ruleStack:R,occurrenceStack:P}),s=!0;else throw Error("non exhaustive match");else if(k instanceof de.NonTerminal){var F=(0,Ka.default)(R);F.push(k.nonTerminalName);var W=(0,Ka.default)(P);W.push(k.idx);var b={idx:y,def:k.definition.concat(a,(0,fr.default)(v)),ruleStack:F,occurrenceStack:W};f.push(b)}else if(k instanceof de.Option){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var we={idx:y,def:k.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(we)}else if(k instanceof de.RepetitionMandatory){var V=new de.Repetition({definition:k.definition,idx:k.idx}),Ae=k.definition.concat([V],(0,fr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(k instanceof de.RepetitionMandatoryWithSeparator){var Ye=new de.Terminal({terminalType:k.separator}),V=new de.Repetition({definition:[Ye].concat(k.definition),idx:k.idx}),Ae=k.definition.concat([V],(0,fr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(k instanceof de.RepetitionWithSeparator){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ye=new de.Terminal({terminalType:k.separator}),We=new de.Repetition({definition:[Ye].concat(k.definition),idx:k.idx}),Ae=k.definition.concat([We],(0,fr.default)(v)),we={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(we)}else if(k instanceof de.Repetition){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var We=new de.Repetition({definition:k.definition,idx:k.idx}),Ae=k.definition.concat([We],(0,fr.default)(v)),we={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(we)}else if(k instanceof de.Alternation)for(var q=k.definition.length-1;q>=0;q--){var L=k.definition[q],j={idx:y,def:L.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(j),f.push(o)}else if(k instanceof de.Alternative)f.push({idx:y,def:k.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P});else if(k instanceof de.Rule)f.push(Ete(k,y,R,P));else throw Error("non exhaustive match")}}return c}it.nextPossibleTokensAfter=kte;function Ete(t,e,r,n){var i=(0,Ka.default)(r);i.push(t.name);var a=(0,Ka.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Rs=d(Re=>{"use strict";var $I=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ya=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var Bv=Ya(kr()),OI=Ya(Rn()),za=Ya(nl()),$d=Ya(Mt()),Va=Ya(Ft()),EI=Ya(wr()),II=Ya(Ci()),wI=cl(),wte=od(),Od=Ua(),la=dt(),Nte=dt(),At;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(At=Re.PROD_TYPE||(Re.PROD_TYPE={}));function DI(t){if(t instanceof la.Option||t==="Option")return At.OPTION;if(t instanceof la.Repetition||t==="Repetition")return At.REPETITION;if(t instanceof la.RepetitionMandatory||t==="RepetitionMandatory")return At.REPETITION_MANDATORY;if(t instanceof la.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return At.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof la.RepetitionWithSeparator||t==="RepetitionWithSeparator")return At.REPETITION_WITH_SEPARATOR;if(t instanceof la.Alternation||t==="Alternation")return At.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=DI;function $te(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=DI(n);return a===At.ALTERNATION?zv(e,r,i):Yv(e,r,a,i)}Re.getLookaheadPaths=$te;function Ote(t,e,r,n,i,a){var o=zv(t,e,r),s=Xv(o)?Od.tokenStructuredMatcherNoCategories:Od.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=Ote;function Ite(t,e,r,n,i,a){var o=Yv(t,e,i,r),s=Xv(o)?Od.tokenStructuredMatcherNoCategories:Od.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=Ite;function Dte(t,e,r,n){var i=t.length,a=(0,za.default)(t,function(u){return(0,za.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,$d.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var f=t[c],h=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<h;y++){for(var R=f[y],P=R.length,k=0;k<P;k++){var b=this.LA(k+1);if(r(b,R[k])===!1)continue e}return c}}};if(a&&!n){var o=(0,$d.default)(t,function(u){return(0,OI.default)(u)}),s=(0,II.default)(o,function(u,l,c){return(0,Va.default)(l,function(f){(0,EI.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,Va.default)(f.categoryMatches,function(h){(0,EI.default)(u,h)||(u[h]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var h=l[f],v=h.length,y=0;y<v;y++){var R=this.LA(y+1);if(r(R,h[y])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=Dte;function xte(t,e,r){var n=(0,za.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,OI.default)(t);if(a.length===1&&(0,Bv.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,II.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,Va.default)(c.categoryMatches,function(h){l[h]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,h=0;h<f;h++){var v=this.LA(h+1);if(e(v,c[h])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=xte;var Lte=function(t){$I(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,At.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,At.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(wte.RestWalker),xI=function(t){$I(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,At.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,At.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,At.ALTERNATION)},e}(Nte.GAstVisitor);function NI(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function Wv(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function qte(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function Vv(t,e){for(var r=(0,$d.default)(t,function(c){return(0,wI.possiblePathsFrom)([c],1)}),n=NI(r.length),i=(0,$d.default)(r,function(c){var f={};return(0,Va.default)(c,function(h){var v=Wv(h.partialPath);(0,Va.default)(v,function(y){f[y]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=NI(s.length);for(var u=function(c){for(var f=s[c],h=0;h<f.length;h++){var v=f[h].partialPath,y=f[h].suffixDef,R=Wv(v),P=qte(i,R,c);if(P||(0,Bv.default)(y)||v.length===e){var k=n[c];if(LI(k,v)===!1){k.push(v);for(var b=0;b<R.length;b++){var S=R[b];i[c][S]=!0}}}else{var O=(0,wI.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,Va.default)(O,function(F){var W=Wv(F.partialPath);(0,Va.default)(W,function(re){i[c][re]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=Vv;function zv(t,e,r,n){var i=new xI(t,At.ALTERNATION,n);return e.accept(i),Vv(i.result,r)}Re.getLookaheadPathsForOr=zv;function Yv(t,e,r,n){var i=new xI(t,r);e.accept(i);var a=i.result,o=new Lte(e,t,r),s=o.startWalking(),u=new la.Alternative({definition:a}),l=new la.Alternative({definition:s});return Vv([u,l],n)}Re.getLookaheadPathsForOptionalProd=Yv;function LI(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=LI;function Mte(t,e){return t.length<e.length&&(0,za.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=Mte;function Xv(t){return(0,za.default)(t,function(e){return(0,za.default)(e,function(r){return(0,za.default)(r,function(n){return(0,Bv.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=Xv});var pl=d(he=>{"use strict";var Qv=he&&he.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Jv=he&&he.__assign||function(){return Jv=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Jv.apply(this,arguments)},jt=he&&he.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(he,"__esModule",{value:!0});he.checkPrefixAlternativesAmbiguities=he.validateSomeNonEmptyLookaheadPath=he.validateTooManyAlts=he.RepetitionCollector=he.validateAmbiguousAlternationAlternatives=he.validateEmptyOrAlternative=he.getFirstNoneTerminal=he.validateNoLeftRecursion=he.validateRuleIsOverridden=he.validateRuleDoesNotAlreadyExist=he.OccurrenceValidationCollector=he.identifyProductionForDuplicates=he.validateGrammar=he.validateLookahead=void 0;var qI=jt(hs()),Id=jt(kr()),Fte=jt(Qf()),MI=jt(Rn()),jte=jt(al()),Gte=jt(dd()),Ute=jt(pd()),ca=jt(Mt()),dl=jt(Ft()),Hte=jt(Kv()),Zv=jt(Ci()),Kte=jt(uv()),Wte=jt(Un()),eT=jt(bi()),Oi=jt(kd()),Bte=jt(Ai()),bn=Rr(),tT=dt(),As=Rs(),Vte=cl(),Sn=dt(),rT=dt(),zte=jt(Ed()),Yte=jt(il()),Xte=Ua();function Jte(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,ca.default)(e,function(r){return Jv({type:bn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}he.validateLookahead=Jte;function Qte(t,e,r,n){var i=(0,Oi.default)(t,function(u){return Zte(u,r)}),a=are(t,e,r),o=(0,Oi.default)(t,function(u){return WI(u,r)}),s=(0,Oi.default)(t,function(u){return UI(u,t,n,r)});return i.concat(a,o,s)}he.validateGrammar=Qte;function Zte(t,e){var r=new GI;t.accept(r);var n=r.allProductions,i=(0,Hte.default)(n,FI),a=(0,Kte.default)(i,function(s){return s.length>1}),o=(0,ca.default)((0,Wte.default)(a),function(s){var u=(0,qI.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,tT.getProductionDslName)(u),f={message:l,type:bn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},h=jI(u);return h&&(f.parameter=h),f});return o}function FI(t){return"".concat((0,tT.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(jI(t))}he.identifyProductionForDuplicates=FI;function jI(t){return t instanceof Sn.Terminal?t.terminalType.name:t instanceof Sn.NonTerminal?t.nonTerminalName:""}var GI=function(t){Qv(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(rT.GAstVisitor);he.OccurrenceValidationCollector=GI;function UI(t,e,r,n){var i=[],a=(0,Zv.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:bn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}he.validateRuleDoesNotAlreadyExist=UI;function ere(t,e,r){var n=[],i;return(0,eT.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:bn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}he.validateRuleIsOverridden=ere;function HI(t,e,r,n){n===void 0&&(n=[]);var i=[],a=fl(e.definition);if((0,Id.default)(a))return[];var o=t.name,s=(0,eT.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:bn.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,Ute.default)(a,n.concat([t])),l=(0,Oi.default)(u,function(c){var f=(0,Bte.default)(n);return f.push(c),HI(t,c,r,f)});return i.concat(l)}he.validateNoLeftRecursion=HI;function fl(t){var e=[];if((0,Id.default)(t))return e;var r=(0,qI.default)(t);if(r instanceof Sn.NonTerminal)e.push(r.referencedRule);else if(r instanceof Sn.Alternative||r instanceof Sn.Option||r instanceof Sn.RepetitionMandatory||r instanceof Sn.RepetitionMandatoryWithSeparator||r instanceof Sn.RepetitionWithSeparator||r instanceof Sn.Repetition)e=e.concat(fl(r.definition));else if(r instanceof Sn.Alternation)e=(0,MI.default)((0,ca.default)(r.definition,function(o){return fl(o.definition)}));else if(!(r instanceof Sn.Terminal))throw Error("non exhaustive match");var n=(0,tT.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Fte.default)(t);return e.concat(fl(a))}else return e}he.getFirstNoneTerminal=fl;var nT=function(t){Qv(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(rT.GAstVisitor);function tre(t,e){var r=new nT;t.accept(r);var n=r.alternations,i=(0,Oi.default)(n,function(a){var o=(0,zte.default)(a.definition);return(0,Oi.default)(o,function(s,u){var l=(0,Vte.nextPossibleTokensAfter)([s],[],Xte.tokenStructuredMatcher,1);return(0,Id.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:bn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}he.validateEmptyOrAlternative=tre;function rre(t,e,r){var n=new nT;t.accept(n);var i=n.alternations;i=(0,Gte.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Oi.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,As.getLookaheadPathsForOr)(s,t,u,o),c=ire(l,o,t,r),f=BI(l,o,t,r);return c.concat(f)});return a}he.validateAmbiguousAlternationAlternatives=rre;var KI=function(t){Qv(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(rT.GAstVisitor);he.RepetitionCollector=KI;function WI(t,e){var r=new nT;t.accept(r);var n=r.alternations,i=(0,Oi.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:bn.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}he.validateTooManyAlts=WI;function nre(t,e,r){var n=[];return(0,dl.default)(t,function(i){var a=new KI;i.accept(a);var o=a.allProductions;(0,dl.default)(o,function(s){var u=(0,As.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,As.getLookaheadPathsForOptionalProd)(c,i,u,l),h=f[0];if((0,Id.default)((0,MI.default)(h))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:bn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}he.validateSomeNonEmptyLookaheadPath=nre;function ire(t,e,r,n){var i=[],a=(0,Zv.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,dl.default)(u,function(c){var f=[l];(0,dl.default)(t,function(h,v){l!==v&&(0,As.containsPath)(h,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,As.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,ca.default)(a,function(s){var u=(0,ca.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:bn.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function BI(t,e,r,n){var i=(0,Zv.default)(t,function(o,s,u){var l=(0,ca.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,Yte.default)((0,Oi.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,jte.default)(i,function(h){return e.definition[h.idx].ignoreAmbiguities!==!0&&h.idx<u&&(0,As.isStrictPrefixOfPath)(h.path,l)}),f=(0,ca.default)(c,function(h){var v=[h.idx+1,u+1],y=e.idx===0?"":e.idx,R=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:h.path});return{message:R,type:bn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return f}));return a}he.checkPrefixAlternativesAmbiguities=BI;function are(t,e,r){var n=[],i=(0,ca.default)(e,function(a){return a.name});return(0,dl.default)(t,function(a){var o=a.name;if((0,eT.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:bn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var XI=d(fa=>{"use strict";var VI=fa&&fa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fa,"__esModule",{value:!0});fa.validateGrammar=fa.resolveGrammar=void 0;var ore=VI(Ft()),zI=VI(Av()),sre=mI(),ure=pl(),YI=_s();function lre(t){var e=(0,zI.default)(t,{errMsgProvider:YI.defaultGrammarResolverErrorProvider}),r={};return(0,ore.default)(t.rules,function(n){r[n.name]=n}),(0,sre.resolveGrammar)(r,e.errMsgProvider)}fa.resolveGrammar=lre;function cre(t){return t=(0,zI.default)(t,{errMsgProvider:YI.defaultGrammarValidatorErrorProvider}),(0,ure.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}fa.validateGrammar=cre});var Ss=d(ir=>{"use strict";var ml=ir&&ir.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),fre=ir&&ir.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ir,"__esModule",{value:!0});ir.EarlyExitException=ir.NotAllInputParsedException=ir.NoViableAltException=ir.MismatchedTokenException=ir.isRecognitionException=void 0;var dre=fre(bi()),JI="MismatchedTokenException",QI="NoViableAltException",ZI="EarlyExitException",e1="NotAllInputParsedException",t1=[JI,QI,ZI,e1];Object.freeze(t1);function pre(t){return(0,dre.default)(t1,t.name)}ir.isRecognitionException=pre;var Dd=function(t){ml(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),mre=function(t){ml(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=JI,a}return e}(Dd);ir.MismatchedTokenException=mre;var hre=function(t){ml(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=QI,a}return e}(Dd);ir.NoViableAltException=hre;var yre=function(t){ml(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=e1,i}return e}(Dd);ir.NotAllInputParsedException=yre;var gre=function(t){ml(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=ZI,a}return e}(Dd);ir.EarlyExitException=gre});var aT=d(St=>{"use strict";var vre=St&&St.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),da=St&&St.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(St,"__esModule",{value:!0});St.attemptInRepetitionRecovery=St.Recoverable=St.InRuleRecoveryException=St.IN_RULE_RECOVERY_EXCEPTION=St.EOF_FOLLOW_KEY=void 0;var hl=Ha(),Tre=da(kr()),r1=da(Ed()),_re=da(Rn()),iT=da(Mt()),n1=da(md()),Rre=da(wr()),Are=da(bi()),Sre=da(Ai()),bre=Ss(),Cre=_v(),Pre=Rr();St.EOF_FOLLOW_KEY={};St.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var i1=function(t){vre(e,t);function e(r){var n=t.call(this,r)||this;return n.name=St.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);St.InRuleRecoveryException=i1;var kre=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,Rre.default)(e,"recoveryEnabled")?e.recoveryEnabled:Pre.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=a1)},t.prototype.getTokenToInsert=function(e){var r=(0,hl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),h=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),R=new bre.MismatchedTokenException(y,c,a.LA(0));R.resyncedTokens=(0,r1.default)(u),a.SAVE_ERROR(R)};!l;)if(this.tokenMatcher(f,i)){h();return}else if(n.call(this)){h(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new i1("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,Tre.default)(r))return!1;var i=this.LA(1),a=(0,n1.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,Are.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,n1.default)(e,function(a){var o=(0,hl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return St.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,iT.default)(r,function(i,a){return a===0?St.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,iT.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,_re.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===St.EOF_FOLLOW_KEY)return[hl.EOF];var r=e.ruleName+e.idxInCallingRule+Cre.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,hl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,r1.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,Sre.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,iT.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();St.Recoverable=kre;function a1(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var h=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&h===void 0&&(h=hl.EOF,v=1),!(h===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(h,v,o)&&this.tryInRepetitionRecovery(t,e,r,h)}St.attemptInRepetitionRecovery=a1});var xd=d(Ee=>{"use strict";Object.defineProperty(Ee,"__esModule",{value:!0});Ee.getKeyForAutomaticLookahead=Ee.AT_LEAST_ONE_SEP_IDX=Ee.MANY_SEP_IDX=Ee.AT_LEAST_ONE_IDX=Ee.MANY_IDX=Ee.OPTION_IDX=Ee.OR_IDX=Ee.BITS_FOR_ALT_IDX=Ee.BITS_FOR_RULE_IDX=Ee.BITS_FOR_OCCURRENCE_IDX=Ee.BITS_FOR_METHOD_TYPE=void 0;Ee.BITS_FOR_METHOD_TYPE=4;Ee.BITS_FOR_OCCURRENCE_IDX=8;Ee.BITS_FOR_RULE_IDX=12;Ee.BITS_FOR_ALT_IDX=8;Ee.OR_IDX=1<<Ee.BITS_FOR_OCCURRENCE_IDX;Ee.OPTION_IDX=2<<Ee.BITS_FOR_OCCURRENCE_IDX;Ee.MANY_IDX=3<<Ee.BITS_FOR_OCCURRENCE_IDX;Ee.AT_LEAST_ONE_IDX=4<<Ee.BITS_FOR_OCCURRENCE_IDX;Ee.MANY_SEP_IDX=5<<Ee.BITS_FOR_OCCURRENCE_IDX;Ee.AT_LEAST_ONE_SEP_IDX=6<<Ee.BITS_FOR_OCCURRENCE_IDX;function Ere(t,e,r){return r|e|t}Ee.getKeyForAutomaticLookahead=Ere;var eve=32-Ee.BITS_FOR_ALT_IDX});var sT=d(pa=>{"use strict";var Ld=pa&&pa.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},o1=pa&&pa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(pa,"__esModule",{value:!0});pa.LLkLookaheadStrategy=void 0;var oT=o1(kd()),wre=o1(kr()),qd=_s(),Nre=Rr(),Md=pl(),yl=Rs(),$re=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Nre.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,wre.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=Ld(Ld(Ld(Ld([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,oT.default)(e,function(r){return(0,Md.validateNoLeftRecursion)(r,r,qd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,oT.default)(e,function(r){return(0,Md.validateEmptyOrAlternative)(r,qd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,oT.default)(e,function(n){return(0,Md.validateAmbiguousAlternationAlternatives)(n,r,qd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,Md.validateSomeNonEmptyLookaheadPath)(e,r,qd.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,yl.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,yl.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,yl.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,yl.getProdType)(e.prodType),yl.buildSingleAlternativeLookaheadFunction)},t}();pa.LLkLookaheadStrategy=$re});var c1=d(Jn=>{"use strict";var Ore=Jn&&Jn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),u1=Jn&&Jn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Jn,"__esModule",{value:!0});Jn.collectMethods=Jn.LooksAhead=void 0;var Xa=u1(Ft()),uT=u1(wr()),s1=Rr(),Ii=xd(),Ire=dt(),bs=dt(),Dre=sT(),xre=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,uT.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:s1.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,uT.default)(e,"maxLookahead")?e.maxLookahead:s1.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,uT.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new Dre.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Xa.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=l1(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Xa.default)(a,function(f){var h=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,bs.getProductionDslName)(f)).concat(h),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,Ii.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Ii.OR_IDX,f.idx);r.setLaFuncCache(y,v)})}),(0,Xa.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,Ii.MANY_IDX,"Repetition",f.maxLookahead,(0,bs.getProductionDslName)(f))}),(0,Xa.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Ii.OPTION_IDX,"Option",f.maxLookahead,(0,bs.getProductionDslName)(f))}),(0,Xa.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Ii.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,bs.getProductionDslName)(f))}),(0,Xa.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Ii.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,bs.getProductionDslName)(f))}),(0,Xa.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Ii.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,bs.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Ii.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Ii.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();Jn.LooksAhead=xre;var Lre=function(t){Ore(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(Ire.GAstVisitor),Fd=new Lre;function l1(t){Fd.reset(),t.accept(Fd);var e=Fd.dslMethods;return Fd.reset(),e}Jn.collectMethods=l1});var f1=d(Qn=>{"use strict";Object.defineProperty(Qn,"__esModule",{value:!0});Qn.addNoneTerminalToCst=Qn.addTerminalToCst=Qn.setNodeLocationFull=Qn.setNodeLocationOnlyOffset=void 0;function qre(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}Qn.setNodeLocationOnlyOffset=qre;function Mre(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}Qn.setNodeLocationFull=Mre;function Fre(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}Qn.addTerminalToCst=Fre;function jre(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}Qn.addNoneTerminalToCst=jre});var d1=d(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.defineNameProp=void 0;var Gre="name";function Ure(t,e){Object.defineProperty(t,Gre,{enumerable:!1,configurable:!0,writable:!1,value:e})}jd.defineNameProp=Ure});var T1=d(Yt=>{"use strict";var Di=Yt&&Yt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Yt,"__esModule",{value:!0});Yt.validateMissingCstMethods=Yt.validateVisitor=Yt.CstVisitorDefinitionError=Yt.createBaseVisitorConstructorWithDefaults=Yt.createBaseSemanticVisitorConstructor=Yt.defaultVisit=void 0;var Hre=Di(kr()),Kre=Di(il()),Wre=Di(Oe()),p1=Di(Mt()),Bre=Di(Ft()),Vre=Di(al()),zre=Di(Er()),Yre=Di(zo()),Xre=Di(Fa()),m1=d1();function h1(t,e){for(var r=(0,zre.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}Yt.defaultVisit=h1;function Jre(t,e){var r=function(){};(0,m1.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,Wre.default)(i)&&(i=i[0]),!(0,Xre.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=g1(this,e);if(!(0,Hre.default)(i)){var a=(0,p1.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}Yt.createBaseSemanticVisitorConstructor=Jre;function Qre(t,e,r){var n=function(){};(0,m1.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,Bre.default)(e,function(a){i[a]=h1}),n.prototype=i,n.prototype.constructor=n,n}Yt.createBaseVisitorConstructorWithDefaults=Qre;var y1;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(y1=Yt.CstVisitorDefinitionError||(Yt.CstVisitorDefinitionError={}));function g1(t,e){var r=v1(t,e);return r}Yt.validateVisitor=g1;function v1(t,e){var r=(0,Vre.default)(e,function(i){return(0,Yre.default)(t[i])===!1}),n=(0,p1.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:y1.MISSING_METHOD,methodName:i}});return(0,Kre.default)(n)}Yt.validateMissingCstMethods=v1});var S1=d(Ps=>{"use strict";var Gd=Ps&&Ps.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ps,"__esModule",{value:!0});Ps.TreeBuilder=void 0;var Cs=f1(),dr=Gd(ud()),Zre=Gd(wr()),_1=Gd(Er()),R1=Gd(Fa()),A1=T1(),ene=Rr(),tne=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,Zre.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:ene.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=dr.default,this.cstFinallyStateUpdate=dr.default,this.cstPostTerminal=dr.default,this.cstPostNonTerminal=dr.default,this.cstPostRule=dr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Cs.setNodeLocationFull,this.setNodeLocationFromNode=Cs.setNodeLocationFull,this.cstPostRule=dr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Cs.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Cs.setNodeLocationOnlyOffset,this.cstPostRule=dr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=dr.default,this.setInitialNodeLocation=dr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Cs.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Cs.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,R1.default)(this.baseCstVisitorConstructor)){var e=(0,A1.createBaseSemanticVisitorConstructor)(this.className,(0,_1.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,R1.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,A1.createBaseVisitorConstructorWithDefaults)(this.className,(0,_1.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();Ps.TreeBuilder=tne});var C1=d(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.LexerAdapter=void 0;var b1=Rr(),rne=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):b1.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?b1.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();Ud.LexerAdapter=rne});var k1=d(ks=>{"use strict";var P1=ks&&ks.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ks,"__esModule",{value:!0});ks.RecognizerApi=void 0;var nne=P1(Un()),ine=P1(bi()),ane=Ss(),lT=Rr(),one=_s(),sne=pl(),une=dt(),lne=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=lT.DEFAULT_RULE_CONFIG),(0,ine.default)(this.definedRulesNames,e)){var i=one.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:lT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=lT.DEFAULT_RULE_CONFIG);var i=(0,sne.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,ane.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,une.serializeGrammar)((0,nne.default)(this.gastProductionsCache))},t}();ks.RecognizerApi=lne});var x1=d(ws=>{"use strict";var Zn=ws&&ws.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ws,"__esModule",{value:!0});ws.RecognizerEngine=void 0;var E1=Zn(kr()),cT=Zn(Oe()),fT=Zn(Rn()),w1=Zn(nl()),cne=Zn(ld()),fne=Zn(vn()),gl=Zn(wr()),vl=Zn(Un()),N1=Zn(Ci()),$1=Zn(Ai()),$r=xd(),Hd=Ss(),O1=Rs(),Es=cl(),I1=Rr(),dne=aT(),D1=Ha(),Tl=Ua(),pne=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Tl.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,gl.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,cT.default)(e)){if((0,E1.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,cT.default)(e))this.tokensMap=(0,N1.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,gl.default)(e,"modes")&&(0,w1.default)((0,fT.default)((0,vl.default)(e.modes)),Tl.isTokenType)){var n=(0,fT.default)((0,vl.default)(e.modes)),i=(0,cne.default)(n);this.tokensMap=(0,N1.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,fne.default)(e))this.tokensMap=(0,$1.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=D1.EOF;var a=(0,gl.default)(e,"modes")?(0,fT.default)((0,vl.default)(e.modes)):(0,vl.default)(e),o=(0,w1.default)(a,function(s){return(0,E1.default)(s.categoryMatches)});this.tokenMatcher=o?Tl.tokenStructuredMatcherNoCategories:Tl.tokenStructuredMatcher,(0,Tl.augmentTokenTypes)((0,vl.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,gl.default)(n,"resyncEnabled")?n.resyncEnabled:I1.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,gl.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:I1.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<$r.BITS_FOR_METHOD_TYPE+$r.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var h=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(h),h}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(h){return this.invokeRuleCatch(h,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Hd.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,O1.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,$r.AT_LEAST_ONE_IDX,e,Es.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Es.NextTerminalAfterAtLeastOneSepWalker],u,$r.AT_LEAST_ONE_SEP_IDX,e,Es.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,O1.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,$r.MANY_IDX,e,Es.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Es.NextTerminalAfterManySepWalker],u,$r.MANY_SEP_IDX,e,Es.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,$r.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OR_IDX,r),i=(0,cT.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Hd.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Hd.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Hd.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===dne.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,$1.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),D1.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();ws.RecognizerEngine=pne});var F1=d(Ns=>{"use strict";var M1=Ns&&Ns.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ns,"__esModule",{value:!0});Ns.ErrorHandler=void 0;var dT=Ss(),mne=M1(wr()),L1=M1(Ai()),q1=Rs(),hne=Rr(),yne=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,mne.default)(e,"errorMessageProvider")?e.errorMessageProvider:hne.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,dT.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,L1.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,L1.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,q1.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new dT.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,q1.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new dT.NoViableAltException(l,this.LA(1),u))},t}();Ns.ErrorHandler=yne});var U1=d($s=>{"use strict";var G1=$s&&$s.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($s,"__esModule",{value:!0});$s.ContentAssist=void 0;var j1=cl(),gne=G1(hs()),vne=G1(Fa()),Tne=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,vne.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,j1.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,gne.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new j1.NextAfterTokenWalker(i,e).startWalking();return a},t}();$s.ContentAssist=Tne});var J1=d(Os=>{"use strict";var Is=Os&&Os.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Os,"__esModule",{value:!0});Os.GastRecorder=void 0;var Kd=Is(bd()),_ne=Is(Oe()),Rne=Is(nd()),Ane=Is(Ft()),B1=Is(zo()),Rl=Is(wr()),ei=dt(),Sne=ol(),V1=Ua(),z1=Ha(),bne=Rr(),Cne=xd(),Bd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Bd);var H1=!0,K1=Math.pow(2,Cne.BITS_FOR_OCCURRENCE_IDX)-1,Y1=(0,z1.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:Sne.Lexer.NA});(0,V1.augmentTokenTypes)([Y1]);var X1=(0,z1.createTokenInstance)(Y1,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(X1);var Pne={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},kne=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return bne.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new ei.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return _l.call(this,ei.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){_l.call(this,ei.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){_l.call(this,ei.RepetitionMandatoryWithSeparator,r,e,H1)},t.prototype.manyInternalRecord=function(e,r){_l.call(this,ei.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){_l.call(this,ei.RepetitionWithSeparator,r,e,H1)},t.prototype.orInternalRecord=function(e,r){return Ene.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Wd(r),!e||(0,Rl.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(W1(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Kd.default)(this.recordingProdStack),o=e.ruleName,s=new ei.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?Pne:Bd},t.prototype.consumeInternalRecord=function(e,r,n){if(Wd(r),!(0,V1.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(W1(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Kd.default)(this.recordingProdStack),o=new ei.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),X1},t}();Os.GastRecorder=kne;function _l(t,e,r,n){n===void 0&&(n=!1),Wd(r);var i=(0,Kd.default)(this.recordingProdStack),a=(0,B1.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,Rl.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Bd}function Ene(t,e){var r=this;Wd(e);var n=(0,Kd.default)(this.recordingProdStack),i=(0,_ne.default)(t)===!1,a=i===!1?t:t.DEF,o=new ei.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,Rl.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,Rne.default)(a,function(u){return(0,B1.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,Ane.default)(a,function(u){var l=new ei.Alternative({definition:[]});o.definition.push(l),(0,Rl.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,Rl.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Bd}function W1(t){return t===0?"":"".concat(t)}function Wd(t){if(t<0||t>K1){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(K1+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var Q1=d(Ds=>{"use strict";var wne=Ds&&Ds.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ds,"__esModule",{value:!0});Ds.PerformanceTracer=void 0;var Nne=wne(wr()),$ne=fs(),One=Rr(),Ine=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,Nne.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=One.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,$ne.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();Ds.PerformanceTracer=Ine});var Z1=d(Vd=>{"use strict";Object.defineProperty(Vd,"__esModule",{value:!0});Vd.applyMixins=void 0;function Dne(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Vd.applyMixins=Dne});var Rr=d(Me=>{"use strict";var nD=Me&&Me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),xs=Me&&Me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Me,"__esModule",{value:!0});Me.EmbeddedActionsParser=Me.CstParser=Me.Parser=Me.EMPTY_ALT=Me.ParserDefinitionErrorType=Me.DEFAULT_RULE_CONFIG=Me.DEFAULT_PARSER_CONFIG=Me.END_OF_FILE=void 0;var pT=xs(kr()),xne=xs(Mt()),Lne=xs(Ft()),ma=xs(Un()),eD=xs(wr()),iD=xs(Ai()),qne=fs(),Mne=q$(),tD=Ha(),aD=_s(),rD=XI(),Fne=aT(),jne=c1(),Gne=S1(),Une=C1(),Hne=k1(),Kne=x1(),Wne=F1(),Bne=U1(),Vne=J1(),zne=Q1(),Yne=Z1(),Xne=pl();Me.END_OF_FILE=(0,tD.createTokenInstance)(tD.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Me.END_OF_FILE);Me.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:aD.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Me.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var Jne;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Jne=Me.ParserDefinitionErrorType||(Me.ParserDefinitionErrorType={}));function Qne(t){return t===void 0&&(t=void 0),function(){return t}}Me.EMPTY_ALT=Qne;var zd=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,eD.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,eD.default)(r,"skipValidations")?r.skipValidations:Me.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,qne.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,Lne.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,rD.resolveGrammar)({rules:(0,ma.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,pT.default)(i)&&e.skipValidations===!1){var a=(0,rD.validateGrammar)({rules:(0,ma.default)(e.gastProductionsCache),tokenTypes:(0,ma.default)(e.tokensMap),errMsgProvider:aD.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,Xne.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,ma.default)(e.gastProductionsCache),tokenTypes:(0,ma.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,pT.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Mne.computeAllProdsFollows)((0,ma.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,ma.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,ma.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,pT.default)(e.definitionErrors))throw r=(0,xne.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Me.Parser=zd;(0,Yne.applyMixins)(zd,[Fne.Recoverable,jne.LooksAhead,Gne.TreeBuilder,Une.LexerAdapter,Kne.RecognizerEngine,Hne.RecognizerApi,Wne.ErrorHandler,Bne.ContentAssist,Vne.GastRecorder,zne.PerformanceTracer]);var Zne=function(t){nD(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,iD.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(zd);Me.CstParser=Zne;var eie=function(t){nD(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,iD.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(zd);Me.EmbeddedActionsParser=eie});var sD=d(ha=>{"use strict";var tie=ha&&ha.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ls=ha&&ha.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ha,"__esModule",{value:!0});ha.buildModel=void 0;var oD=dt(),Al=Ls(Mt()),rie=Ls(Rn()),nie=Ls(Un()),iie=Ls(nd()),aie=Ls(Kv()),oie=Ls(tl());function sie(t){var e=new uie,r=(0,nie.default)(t);return(0,Al.default)(r,function(n){return e.visitRule(n)})}ha.buildModel=sie;var uie=function(t){tie(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,aie.default)(n,function(o){return o.propertyName}),a=(0,Al.default)(i,function(o,s){var u=!(0,iie.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,Al.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Yd(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Yd(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Yd(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Yd(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,Al.default)(this.visitEach(r),function(i){return(0,oie.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,rie.default)((0,Al.default)(r,function(i){return n.visit(i)}))},e}(oD.GAstVisitor);function Yd(t){return t instanceof oD.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var lD=d((vve,uD)=>{var lie=Jf();function cie(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:lie(t,e,r)}uD.exports=cie});var mT=d((Tve,cD)=>{var fie="\\ud800-\\udfff",die="\\u0300-\\u036f",pie="\\ufe20-\\ufe2f",mie="\\u20d0-\\u20ff",hie=die+pie+mie,yie="\\ufe0e\\ufe0f",gie="\\u200d",vie=RegExp("["+gie+fie+hie+yie+"]");function Tie(t){return vie.test(t)}cD.exports=Tie});var dD=d((_ve,fD)=>{function _ie(t){return t.split("")}fD.exports=_ie});var _D=d((Rve,TD)=>{var pD="\\ud800-\\udfff",Rie="\\u0300-\\u036f",Aie="\\ufe20-\\ufe2f",Sie="\\u20d0-\\u20ff",bie=Rie+Aie+Sie,Cie="\\ufe0e\\ufe0f",Pie="["+pD+"]",hT="["+bie+"]",yT="\\ud83c[\\udffb-\\udfff]",kie="(?:"+hT+"|"+yT+")",mD="[^"+pD+"]",hD="(?:\\ud83c[\\udde6-\\uddff]){2}",yD="[\\ud800-\\udbff][\\udc00-\\udfff]",Eie="\\u200d",gD=kie+"?",vD="["+Cie+"]?",wie="(?:"+Eie+"(?:"+[mD,hD,yD].join("|")+")"+vD+gD+")*",Nie=vD+gD+wie,$ie="(?:"+[mD+hT+"?",hT,hD,yD,Pie].join("|")+")",Oie=RegExp(yT+"(?="+yT+")|"+$ie+Nie,"g");function Iie(t){return t.match(Oie)||[]}TD.exports=Iie});var AD=d((Ave,RD)=>{var Die=dD(),xie=mT(),Lie=_D();function qie(t){return xie(t)?Lie(t):Die(t)}RD.exports=qie});var bD=d((Sve,SD)=>{var Mie=lD(),Fie=mT(),jie=AD(),Gie=ev();function Uie(t){return function(e){e=Gie(e);var r=Fie(e)?jie(e):void 0,n=r?r[0]:e.charAt(0),i=r?Mie(r,1).join(""):e.slice(1);return n[t]()+i}}SD.exports=Uie});var PD=d((bve,CD)=>{var Hie=bD(),Kie=Hie("toUpperCase");CD.exports=Kie});var ND=d(qs=>{"use strict";var Ms=qs&&qs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(qs,"__esModule",{value:!0});qs.genDts=void 0;var Wie=Ms(Rn()),Bie=Ms(Oe()),Xd=Ms(Mt()),Vie=Ms(Ci()),zie=Ms(ld()),ED=Ms(PD());function Yie(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,Wie.default)((0,Xd.default)(t,function(n){return Xie(n)}))),e.includeVisitorInterface&&(r=r.concat(eae(e.visitorInterfaceName,t))),r.join(`

`)+`
`}qs.genDts=Yie;function Xie(t){var e=Jie(t),r=Qie(t);return[e,r]}function Jie(t){var e=wD(t.name),r=gT(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function Qie(t){var e=gT(t.name);return"export type ".concat(e,` = {
  `).concat((0,Xd.default)(t.properties,function(r){return Zie(r)}).join(`
  `),`
};`)}function Zie(t){var e=rae(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function eae(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,Xd.default)(e,function(r){return tae(r)}).join(`
  `),`
}`)}function tae(t){var e=gT(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function rae(t){if((0,Bie.default)(t)){var e=(0,zie.default)((0,Xd.default)(t,function(n){return kD(n)})),r=(0,Vie.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return kD(t)}function kD(t){return t.kind==="token"?"IToken":wD(t.name)}function wD(t){return(0,ED.default)(t)+"CstNode"}function gT(t){return(0,ED.default)(t)+"CstChildren"}});var $D=d(Fs=>{"use strict";var Jd=Fs&&Fs.__assign||function(){return Jd=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Jd.apply(this,arguments)};Object.defineProperty(Fs,"__esModule",{value:!0});Fs.generateCstDts=void 0;var nae=sD(),iae=ND(),aae={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function oae(t,e){var r=Jd(Jd({},aae),e),n=(0,nae.buildModel)(t);return(0,iae.genDts)(n,r)}Fs.generateCstDts=oae});var ID=d(Qd=>{"use strict";Object.defineProperty(Qd,"__esModule",{value:!0});Qd.createSyntaxDiagramsCode=void 0;var OD=Eg();function sae(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(OD.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(OD.VERSION,"/diagrams/diagrams.css"):a,s=`
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
`),h=`
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`;return s+u+l+c+f+h}Qd.createSyntaxDiagramsCode=sae});var Ja=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var uae=Eg();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return uae.VERSION}});var Zd=Rr();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return Zd.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return Zd.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return Zd.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return Zd.EMPTY_ALT}});var DD=ol();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return DD.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return DD.LexerDefinitionErrorType}});var js=Ha();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return js.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return js.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return js.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return js.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return js.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return js.tokenName}});var lae=Rs();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return lae.getLookaheadPaths}});var cae=sT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return cae.LLkLookaheadStrategy}});var fae=_s();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return fae.defaultParserErrorProvider}});var Sl=Ss();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return Sl.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return Sl.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return Sl.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return Sl.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return Sl.NoViableAltException}});var dae=xv();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return dae.defaultLexerErrorProvider}});var ti=dt();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return ti.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return ti.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return ti.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return ti.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return ti.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return ti.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return ti.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return ti.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return ti.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return ti.Terminal}});var vT=dt();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return vT.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return vT.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return vT.GAstVisitor}});var pae=$D();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return pae.generateCstDts}});function mae(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=mae;var hae=ID();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return hae.createSyntaxDiagramsCode}});var yae=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=yae});var jD=d(X=>{"use strict";var xD=X&&X.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(X,"__esModule",{value:!0});X.createATN=X.RuleTransition=X.EpsilonTransition=X.AtomTransition=X.AbstractTransition=X.ATN_LOOP_END=X.ATN_PLUS_LOOP_BACK=X.ATN_STAR_LOOP_ENTRY=X.ATN_STAR_LOOP_BACK=X.ATN_BLOCK_END=X.ATN_RULE_STOP=X.ATN_TOKEN_START=X.ATN_STAR_BLOCK_START=X.ATN_PLUS_BLOCK_START=X.ATN_RULE_START=X.ATN_BASIC=X.ATN_INVALID_TYPE=X.buildATNKey=void 0;var LD=xD(Mt()),gae=xD(al()),Ar=Ja();function Cl(t,e,r){return`${t.name}_${e}_${r}`}X.buildATNKey=Cl;X.ATN_INVALID_TYPE=0;X.ATN_BASIC=1;X.ATN_RULE_START=2;X.ATN_PLUS_BLOCK_START=4;X.ATN_STAR_BLOCK_START=5;X.ATN_TOKEN_START=6;X.ATN_RULE_STOP=7;X.ATN_BLOCK_END=8;X.ATN_STAR_LOOP_BACK=9;X.ATN_STAR_LOOP_ENTRY=10;X.ATN_PLUS_LOOP_BACK=11;X.ATN_LOOP_END=12;var Gs=class{constructor(e){this.target=e}isEpsilon(){return!1}};X.AbstractTransition=Gs;var ep=class extends Gs{constructor(e,r){super(e),this.tokenType=r}};X.AtomTransition=ep;var tp=class extends Gs{constructor(e){super(e)}isEpsilon(){return!0}};X.EpsilonTransition=tp;var bl=class extends Gs{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};X.RuleTransition=bl;function vae(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Tae(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=Qa(e,i,i);a!==void 0&&Nae(e,i,a)}return e}X.createATN=vae;function Tae(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=Gt(t,i,void 0,{type:X.ATN_RULE_START}),o=Gt(t,i,void 0,{type:X.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function qD(t,e,r){return r instanceof Ar.Terminal?TT(t,e,r.terminalType,r):r instanceof Ar.NonTerminal?wae(t,e,r):r instanceof Ar.Alternation?bae(t,e,r):r instanceof Ar.Option?Cae(t,e,r):r instanceof Ar.Repetition?_ae(t,e,r):r instanceof Ar.RepetitionWithSeparator?Rae(t,e,r):r instanceof Ar.RepetitionMandatory?Aae(t,e,r):r instanceof Ar.RepetitionMandatoryWithSeparator?Sae(t,e,r):Qa(t,e,r)}function _ae(t,e,r){let n=Gt(t,e,r,{type:X.ATN_STAR_BLOCK_START});ya(t,n);let i=Us(t,e,n,r,Qa(t,e,r));return FD(t,e,r,i)}function Rae(t,e,r){let n=Gt(t,e,r,{type:X.ATN_STAR_BLOCK_START});ya(t,n);let i=Us(t,e,n,r,Qa(t,e,r)),a=TT(t,e,r.separator,r);return FD(t,e,r,i,a)}function Aae(t,e,r){let n=Gt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});ya(t,n);let i=Us(t,e,n,r,Qa(t,e,r));return MD(t,e,r,i)}function Sae(t,e,r){let n=Gt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});ya(t,n);let i=Us(t,e,n,r,Qa(t,e,r)),a=TT(t,e,r.separator,r);return MD(t,e,r,i,a)}function bae(t,e,r){let n=Gt(t,e,r,{type:X.ATN_BASIC});ya(t,n);let i=(0,LD.default)(r.definition,o=>qD(t,e,o));return Us(t,e,n,r,...i)}function Cae(t,e,r){let n=Gt(t,e,r,{type:X.ATN_BASIC});ya(t,n);let i=Us(t,e,n,r,Qa(t,e,r));return Pae(t,e,r,i)}function Qa(t,e,r){let n=(0,gae.default)((0,LD.default)(r.definition,i=>qD(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Eae(t,n)}function MD(t,e,r,n,i){let a=n.left,o=n.right,s=Gt(t,e,r,{type:X.ATN_PLUS_LOOP_BACK});ya(t,s);let u=Gt(t,e,r,{type:X.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[Cl(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,bt(o,s),i===void 0?(bt(s,a),bt(s,u)):(bt(s,u),bt(s,i.left),bt(i.right,a)),{left:a,right:u}}function FD(t,e,r,n,i){let a=n.left,o=n.right,s=Gt(t,e,r,{type:X.ATN_STAR_LOOP_ENTRY});ya(t,s);let u=Gt(t,e,r,{type:X.ATN_LOOP_END}),l=Gt(t,e,r,{type:X.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,bt(s,a),bt(s,u),bt(o,l),i!==void 0?(bt(l,u),bt(l,i.left),bt(i.right,a)):bt(l,s),t.decisionMap[Cl(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function Pae(t,e,r,n){let i=n.left,a=n.right;return bt(i,a),t.decisionMap[Cl(e,"Option",r.idx)]=i,n}function ya(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Us(t,e,r,n,...i){let a=Gt(t,e,n,{type:X.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(bt(r,s.left),bt(s.right,a)):bt(r,a);let o={left:r,right:a};return t.decisionMap[Cl(e,kae(n),n.idx)]=r,o}function kae(t){if(t instanceof Ar.Alternation)return"Alternation";if(t instanceof Ar.Option)return"Option";if(t instanceof Ar.Repetition)return"Repetition";if(t instanceof Ar.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Ar.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Ar.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Eae(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof bl,l=s,c=e[a+1].left;o.left.type===X.ATN_BASIC&&o.right.type===X.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,$ae(t,o.right)):bt(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function TT(t,e,r,n){let i=Gt(t,e,n,{type:X.ATN_BASIC}),a=Gt(t,e,n,{type:X.ATN_BASIC});return _T(i,new ep(a,r)),{left:i,right:a}}function wae(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=Gt(t,e,r,{type:X.ATN_BASIC}),o=Gt(t,e,r,{type:X.ATN_BASIC}),s=new bl(i,n,o);return _T(a,s),{left:a,right:o}}function Nae(t,e,r){let n=t.ruleToStartState.get(e);bt(n,r.left);let i=t.ruleToStopState.get(e);return bt(r.right,i),{left:n,right:i}}function bt(t,e){let r=new tp(e);_T(t,r)}function Gt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function _T(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function $ae(t,e){t.states.splice(t.states.indexOf(e),1)}});var UD=d(ri=>{"use strict";var Oae=ri&&ri.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ri,"__esModule",{value:!0});ri.getATNConfigKey=ri.ATNConfigSet=ri.DFA_ERROR=void 0;var Iae=Oae(Mt());ri.DFA_ERROR={};var RT=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=GD(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,Iae.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};ri.ATNConfigSet=RT;function GD(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}ri.getATNConfigKey=GD});var KD=d(($ve,HD)=>{var Dae=os();function xae(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!Dae(o):r(o,s)))var s=o,u=a}return u}HD.exports=xae});var BD=d((Ove,WD)=>{function Lae(t,e){return t<e}WD.exports=Lae});var zD=d((Ive,VD)=>{var qae=KD(),Mae=BD(),Fae=Ma();function jae(t){return t&&t.length?qae(t,Fae,Mae):void 0}VD.exports=jae});var XD=d((Dve,YD)=>{var Gae=Vr(),Uae=yv();function Hae(t,e){return t&&t.length?Uae(t,Gae(e,2)):[]}YD.exports=Hae});var nx=d(Hs=>{"use strict";var va=Hs&&Hs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Hs,"__esModule",{value:!0});Hs.LLStarLookaheadStrategy=void 0;var Or=Ja(),Cn=jD(),ga=UD(),Kae=va(zD()),Wae=va(kd()),Bae=va(XD()),Pl=va(Mt()),Vae=va(Rn()),AT=va(Ft()),zae=va(kr()),JD=va(Ci());function Yae(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var rp=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},QD=new rp,bT=class extends Or.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,Cn.createATN)(e.rules),this.dfas=Xae(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Cn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,Pl.default)((0,Or.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),h=>(0,Pl.default)(h,v=>v[0]));if(ZD(f,!1)&&!a){let h=(0,JD.default)(f,(v,y,R)=>((0,AT.default)(y,P=>{P&&(v[P.tokenTypeIdx]=R,(0,AT.default)(P.categoryMatches,k=>{v[k]=R}))}),v),{});return i?function(v){var y;let R=this.LA(1),P=h[R.tokenTypeIdx];if(v!==void 0&&P!==void 0){let k=(y=v[P])===null||y===void 0?void 0:y.GATE;if(k!==void 0&&k.call(this)===!1)return}return P}:function(){let v=this.LA(1);return h[v.tokenTypeIdx]}}else return i?function(h){let v=new rp,y=h===void 0?0:h.length;for(let P=0;P<y;P++){let k=h?.[P].GATE;v.set(P,k===void 0||k.call(this))}let R=ST.call(this,o,c,v,s);return typeof R=="number"?R:void 0}:function(){let h=ST.call(this,o,c,QD,s);return typeof h=="number"?h:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Cn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,Pl.default)((0,Or.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),h=>(0,Pl.default)(h,v=>v[0]));if(ZD(f)&&f[0][0]&&!a){let h=f[0],v=(0,Vae.default)(h);if(v.length===1&&(0,zae.default)(v[0].categoryMatches)){let R=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===R}}else{let y=(0,JD.default)(v,(R,P)=>(P!==void 0&&(R[P.tokenTypeIdx]=!0,(0,AT.default)(P.categoryMatches,k=>{R[k]=!0})),R),{});return function(){let R=this.LA(1);return y[R.tokenTypeIdx]===!0}}}return function(){let h=ST.call(this,o,c,QD,s);return typeof h=="object"?!1:h===0}}};Hs.LLStarLookaheadStrategy=bT;function ZD(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function Xae(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=Yae(t.decisionStates[n],n);return r}function ST(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=soe(i.atnStartState);a=rx(i,tx(s)),i.start=a}return Jae.apply(this,[i,a,r,n])}function Jae(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=noe(i,s);if(u===void 0&&(u=Qae.apply(this,[t,i,s,a,r,n])),u===ga.DFA_ERROR)return roe(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function Qae(t,e,r,n,i,a){let o=ioe(e.configs,r,i);if(o.size===0)return ex(t,e,r,ga.DFA_ERROR),ga.DFA_ERROR;let s=tx(o),u=ooe(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(foe(o)){let l=(0,Kae.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,Zae.apply(this,[t,n,o.alts,a])}return s=ex(t,e,r,s),s}function Zae(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=eoe({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function eoe(t){let e=(0,Pl.default)(t.prefixPath,i=>(0,Or.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${toe(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function toe(t){if(t instanceof Or.NonTerminal)return"SUBRULE";if(t instanceof Or.Option)return"OPTION";if(t instanceof Or.Alternation)return"OR";if(t instanceof Or.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof Or.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof Or.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof Or.Repetition)return"MANY";if(t instanceof Or.Terminal)return"CONSUME";throw Error("non exhaustive match")}function roe(t,e,r){let n=(0,Wae.default)(e.configs.elements,a=>a.state.transitions),i=(0,Bae.default)(n.filter(a=>a instanceof Cn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function noe(t,e){return t.edges[e.tokenTypeIdx]}function ioe(t,e,r){let n=new ga.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===Cn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=aoe(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new ga.ATNConfigSet;for(let o of n.elements)np(o,a)}if(i.length>0&&!loe(a))for(let o of i)a.add(o);return a}function aoe(t,e){if(t instanceof Cn.AtomTransition&&(0,Or.tokenMatcher)(e,t.tokenType))return t.target}function ooe(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function tx(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function ex(t,e,r,n){return n=rx(t,n),e.edges[r.tokenTypeIdx]=n,n}function rx(t,e){if(e===ga.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function soe(t){let e=new ga.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};np(a,e)}return e}function np(t,e){let r=t.state;if(r.type===Cn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};np(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=uoe(t,a);o!==void 0&&np(o,e)}}function uoe(t,e){if(e instanceof Cn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Cn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function loe(t){for(let e of t.elements)if(e.state.type===Cn.ATN_RULE_STOP)return!0;return!1}function coe(t){for(let e of t.elements)if(e.state.type!==Cn.ATN_RULE_STOP)return!1;return!0}function foe(t){if(coe(t))return!0;let e=doe(t.elements);return poe(e)&&!moe(e)}function doe(t){let e=new Map;for(let r of t){let n=(0,ga.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function poe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function moe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var ix=d(ip=>{"use strict";Object.defineProperty(ip,"__esModule",{value:!0});ip.LLStarLookaheadStrategy=void 0;var hoe=nx();Object.defineProperty(ip,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return hoe.LLStarLookaheadStrategy}})});var sx=d(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.RootCstNodeImpl=Jr.CompositeCstNodeImpl=Jr.LeafCstNodeImpl=Jr.AbstractCstNode=Jr.CstNodeBuilder=void 0;var ax=yo(),yoe=mr(),ox=Qe(),CT=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new ap(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new wl;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new El(e.startOffset,e.image.length,(0,ox.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new El(r.startOffset,r.image.length,(0,ox.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,yoe.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};Jr.CstNodeBuilder=CT;var kl=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};Jr.AbstractCstNode=kl;var El=class extends kl{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};Jr.LeafCstNodeImpl=El;var wl=class extends kl{constructor(){super(...arguments),this.children=new Nl(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:ax.Position.create(0,0),end:ax.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};Jr.CompositeCstNodeImpl=wl;var Nl=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,Nl.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},ap=class extends wl{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};Jr.RootCstNodeImpl=ap});var lp=d(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.LangiumCompletionParser=pr.LangiumParserErrorMessageProvider=pr.LangiumParser=pr.AbstractLangiumParser=pr.DatatypeSymbol=void 0;var sp=Ja(),goe=ix(),op=$e(),ux=Et(),lx=Ie(),voe=sx();pr.DatatypeSymbol=Symbol("Datatype");function PT(t){return t.$type===pr.DatatypeSymbol}var cx="\u200B",fx=t=>t.endsWith(cx)?t:t+cx,$l=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new wT(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};pr.AbstractLangiumParser=$l;var kT=class extends $l{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new voe.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,ux.isDataTypeRule)(e)?pr.DatatypeSymbol:(0,ux.getTypeName)(e),i=this.wrapper.DEFINE_RULE(fx(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===pr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,op.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(PT(u)){let l=i.image;(0,op.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(PT(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,lx.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),PT(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,lx.getContainerOfType)(e,op.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,op.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r))e[n]===void 0&&(e[n]=i);return e}get definitionErrors(){return this.wrapper.definitionErrors}};pr.LangiumParser=kT;var up=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return sp.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return sp.defaultParserErrorProvider.buildEarlyExitMessage(e)}};pr.LangiumParserErrorMessageProvider=up;var ET=class extends $l{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(fx(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};pr.LangiumCompletionParser=ET;var Toe={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new up},wT=class extends sp.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Toe),{lookaheadStrategy:n?new sp.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new goe.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var dx=d(Ks=>{"use strict";Object.defineProperty(Ks,"__esModule",{value:!0});Ks.assertUnreachable=Ks.ErrorWithLocation=void 0;var NT=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};Ks.ErrorWithLocation=NT;function _oe(t){throw new Error("Error! The input value was not handled.")}Ks.assertUnreachable=_oe});var OT=d(fp=>{"use strict";Object.defineProperty(fp,"__esModule",{value:!0});fp.createParser=void 0;var px=Ja(),Fe=$e(),Ol=dx(),Roe=xt(),mx=Et(),hx=kt();function Aoe(t,e,r){return Soe({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}fp.createParser=Aoe;function Soe(t,e){let r=(0,hx.getAllReachableRules)(e,!1),n=(0,Roe.stream)(e.rules).filter(Fe.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,Za(a,i.definition)))}}function Za(t,e,r=!1){let n;if((0,Fe.isKeyword)(e))n=Noe(t,e);else if((0,Fe.isAction)(e))n=boe(t,e);else if((0,Fe.isAssignment)(e))n=Za(t,e.terminal);else if((0,Fe.isCrossReference)(e))n=yx(t,e);else if((0,Fe.isRuleCall)(e))n=Coe(t,e);else if((0,Fe.isAlternatives)(e))n=koe(t,e);else if((0,Fe.isUnorderedGroup)(e))n=Eoe(t,e);else if((0,Fe.isGroup)(e))n=woe(t,e);else throw new Ol.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return gx(t,r?void 0:cp(e),n,e.cardinality)}function boe(t,e){let r=(0,mx.getTypeName)(e);return()=>t.parser.action(r,e)}function Coe(t,e){let r=e.rule.ref;if((0,Fe.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?Poe(r,e.arguments):()=>({});return a=>t.parser.subrule(n,vx(t,r),e,i(a))}else if((0,Fe.isTerminalRule)(r)){let n=t.consume++,i=$T(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,Ol.assertUnreachable)(r);else throw new Ol.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Poe(t,e){let r=e.map(n=>xi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function xi(t){if((0,Fe.isDisjunction)(t)){let e=xi(t.left),r=xi(t.right);return n=>e(n)||r(n)}else if((0,Fe.isConjunction)(t)){let e=xi(t.left),r=xi(t.right);return n=>e(n)&&r(n)}else if((0,Fe.isNegation)(t)){let e=xi(t.value);return r=>!e(r)}else if((0,Fe.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Fe.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,Ol.assertUnreachable)(t)}function koe(t,e){if(e.elements.length===1)return Za(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:Za(t,i,!0)},o=cp(i);o&&(a.GATE=xi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Eoe(t,e){if(e.elements.length===1)return Za(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:Za(t,s,!0)},l=cp(s);l&&(u.GATE=xi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let y=f.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let h=u.GATE;return h?c.GATE=()=>h(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=gx(t,cp(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function woe(t,e){let r=e.elements.map(n=>Za(t,n));return n=>r.forEach(i=>i(n))}function cp(t){if((0,Fe.isGroup)(t))return t.guardCondition}function yx(t,e,r=e.terminal){if(r)if((0,Fe.isRuleCall)(r)&&(0,Fe.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,vx(t,r.rule.ref),e,i)}else if((0,Fe.isRuleCall)(r)&&(0,Fe.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=$T(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Fe.isKeyword)(r)){let n=t.consume++,i=$T(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,hx.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,mx.getTypeName)(e.type.ref));return yx(t,e,i)}}function Noe(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function gx(t,e,r,n){let i=e&&xi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,px.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,px.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,Ol.assertUnreachable)(n)}function vx(t,e){let r=$oe(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function $oe(t,e){if((0,Fe.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Fe.isParserRule)(n);)((0,Fe.isGroup)(n)||(0,Fe.isAlternatives)(n)||(0,Fe.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function $T(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var Tx=d(dp=>{"use strict";Object.defineProperty(dp,"__esModule",{value:!0});dp.createCompletionParser=void 0;var Ooe=lp(),Ioe=OT();function Doe(t){let e=t.Grammar,r=t.parser.Lexer,n=new Ooe.LangiumCompletionParser(t);return(0,Ioe.createParser)(e,n,r.definition),n.finalize(),n}dp.createCompletionParser=Doe});var IT=d(Ws=>{"use strict";Object.defineProperty(Ws,"__esModule",{value:!0});Ws.prepareLangiumParser=Ws.createLangiumParser=void 0;var xoe=lp(),Loe=OT();function qoe(t){let e=_x(t);return e.finalize(),e}Ws.createLangiumParser=qoe;function _x(t){let e=t.Grammar,r=t.parser.Lexer,n=new xoe.LangiumParser(t);return(0,Loe.createParser)(e,n,r.definition)}Ws.prepareLangiumParser=_x});var LT=d(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});mp.DefaultTokenBuilder=void 0;var Moe=Ja(),DT=$e(),Foe=Et(),joe=Ie(),Goe=kt(),pp=Oo(),Uoe=xt(),xT=class{buildTokens(e,r){let n=(0,Uoe.stream)((0,Goe.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,pp.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(DT.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Foe.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,pp.isWhitespaceRegExp)(r)?Moe.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(DT.isParserRule).flatMap(i=>(0,joe.streamAllContents)(i).filter(DT.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,pp.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,pp.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};mp.DefaultTokenBuilder=xT});var FT=d(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});Ut.convertBoolean=Ut.convertNumber=Ut.convertDate=Ut.convertBigint=Ut.convertInt=Ut.convertID=Ut.convertString=Ut.DefaultValueConverter=void 0;var Rx=$e(),Hoe=Et(),Koe=kt(),qT=class{convert(e,r){let n=r.feature;if((0,Rx.isCrossReference)(n)&&(n=(0,Koe.getCrossReferenceTerminal)(n)),(0,Rx.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Sx(r);case"STRING":return MT(r);case"ID":return Ax(r);case"REGEXLITERAL":return MT(r)}switch((i=(0,Hoe.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Px(r);case"boolean":return kx(r);case"bigint":return bx(r);case"date":return Cx(r);default:return r}}};Ut.DefaultValueConverter=qT;function MT(t){return t.substring(1,t.length-1)}Ut.convertString=MT;function Ax(t){return t.charAt(0)==="^"?t.substring(1):t}Ut.convertID=Ax;function Sx(t){return parseInt(t)}Ut.convertInt=Sx;function bx(t){return BigInt(t)}Ut.convertBigint=bx;function Cx(t){return new Date(t)}Ut.convertDate=Cx;function Px(t){return Number(t)}Ut.convertNumber=Px;function kx(t){return t.toLowerCase()==="true"}Ut.convertBoolean=kx});var UT=d(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});yp.DefaultLinker=void 0;var Woe=qe(),Bs=mr(),hp=Ie(),Boe=jr(),jT=ta(),GT=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Woe.CancellationToken.None){for(let n of(0,hp.streamAst)(e.parseResult.value))await(0,Boe.interruptAndCheck)(r),(0,hp.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=jT.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,Bs.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,Bs.isAstNode)(this._ref))return this._ref;if((0,Bs.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,hp.getDocument)(e).state<jT.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,Bs.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,Bs.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,Bs.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,hp.getDocument)(e.container);n.state<jT.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};yp.DefaultLinker=GT});var WT=d(gp=>{"use strict";Object.defineProperty(gp,"__esModule",{value:!0});gp.DefaultJsonSerializer=void 0;var HT=mr();function Ex(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var KT=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){return JSON.stringify(e,(n,i)=>this.replacer(n,i,r?.refText),r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,n){var i,a;if(!this.ignoreProperties.has(e)){if((0,HT.isReference)(r)){let o=r.ref,s=n?r.$refText:void 0;return o?{$refText:s,$ref:"#"+(o&&this.astNodeLocator.getAstNodePath(o))}:{$refText:s,$error:(a=(i=r.error)===null||i===void 0?void 0:i.message)!==null&&a!==void 0?a:"Could not resolve reference"}}return r}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];Ex(c)?u[l]=this.reviveReference(e,s,r,c):(0,HT.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else Ex(u)?e[s]=this.reviveReference(e,s,r,u):(0,HT.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};gp.DefaultJsonSerializer=KT});var VT=d(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.DefaultServiceRegistry=void 0;var Voe=Ln(),BT=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=Voe.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};vp.DefaultServiceRegistry=BT});var YT=d(Tp=>{"use strict";Object.defineProperty(Tp,"__esModule",{value:!0});Tp.ValidationRegistry=void 0;var zoe=Pr(),Yoe=jr(),zT=class{constructor(e){this.validationChecks=new zoe.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,Yoe.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};Tp.ValidationRegistry=zT});var QT=d(Vs=>{"use strict";Object.defineProperty(Vs,"__esModule",{value:!0});Vs.DefaultReferenceDescriptionProvider=Vs.DefaultAstNodeDescriptionProvider=void 0;var Xoe=qe(),Joe=mr(),_p=Ie(),Qoe=Qe(),Zoe=jr(),ese=Ti(),XT=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator}createDescription(e,r,n=(0,_p.getDocument)(e)){return{node:e,name:r,type:e.$type,documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};Vs.DefaultAstNodeDescriptionProvider=XT;var JT=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Xoe.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,_p.streamAst)(i))await(0,Zoe.interruptAndCheck)(r),(0,_p.streamReferences)(a).filter(o=>!(0,Joe.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,_p.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,Qoe.toDocumentSegment)(n),local:(0,ese.equalURI)(r.documentUri,i)}}};Vs.DefaultReferenceDescriptionProvider=JT});var wx=d(Rp=>{"use strict";Object.defineProperty(Rp,"__esModule",{value:!0});Rp.DefaultAstNodeLocator=void 0;var ZT=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Rp.DefaultAstNodeLocator=ZT});var t_=d(Ap=>{"use strict";Object.defineProperty(Ap,"__esModule",{value:!0});Ap.DefaultConfigurationProvider=void 0;var tse=yt(),e_=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(tse.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};Ap.DefaultConfigurationProvider=e_});var i_=d(bp=>{"use strict";Object.defineProperty(bp,"__esModule",{value:!0});bp.DefaultDocumentBuilder=void 0;var Sp=qe(),rse=Pr(),r_=jr(),ni=ta(),n_=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new rse.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Sp.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=Sp.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,r_.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),Sp.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,ni.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<ni.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,ni.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,ni.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,ni.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,ni.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,ni.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,ni.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,r_.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Sp.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,r_.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=ni.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=ni.DocumentState.Validated}};bp.DefaultDocumentBuilder=n_});var u_=d(Cp=>{"use strict";Object.defineProperty(Cp,"__esModule",{value:!0});Cp.DefaultIndexManager=void 0;var Nx=qe(),nse=Ie(),a_=xt(),o_=Ti(),$x=ta(),s_=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,nse.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,o_.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,a_.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,a_.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,a_.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=Nx.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=$x.DocumentState.IndexedContent}async updateReferences(e,r=Nx.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=$x.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,o_.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,o_.equalURI)(o.targetUri,n)):!1}};Cp.DefaultIndexManager=s_});var f_=d(Pp=>{"use strict";Object.defineProperty(Pp,"__esModule",{value:!0});Pp.DefaultWorkspaceManager=void 0;var ise=qe(),l_=Ln(),ase=jr(),c_=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=ise.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,ase.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return l_.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=l_.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=l_.Utils.extname(r.uri);return n.includes(a)}return!1}};Pp.DefaultWorkspaceManager=c_});var h_=d(ii=>{"use strict";Object.defineProperty(ii,"__esModule",{value:!0});ii.isTokenTypeDictionary=ii.isIMultiModeLexerDefinition=ii.isTokenTypeArray=ii.DefaultLexer=void 0;var ose=Ja(),d_=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=p_(r)?Object.values(r):r;this.chevrotainLexer=new ose.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(p_(e))return e;let r=m_(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};ii.DefaultLexer=d_;function Ox(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}ii.isTokenTypeArray=Ox;function m_(t){return t&&"modes"in t&&"defaultMode"in t}ii.isIMultiModeLexerDefinition=m_;function p_(t){return!Ox(t)&&!m_(t)}ii.isTokenTypeDictionary=p_});var Ef=d(zs=>{"use strict";Object.defineProperty(zs,"__esModule",{value:!0});zs.createDefaultSharedModule=zs.createDefaultModule=void 0;var sse=qe(),use=bh(),lse=mb(),cse=Tx(),fse=Hy(),dse=Wy(),pse=Vy(),mse=Xc(),hse=Xy(),yse=Qy(),gse=og(),vse=ug(),Tse=cg(),_se=IT(),Rse=LT(),Ase=FT(),Sse=UT(),bse=$o(),Cse=Ly(),Pse=Hc(),kse=Wc(),Ese=WT(),wse=VT(),Nse=jr(),$se=zc(),Ose=YT(),Ix=QT(),Ise=wx(),Dse=t_(),xse=i_(),Dx=ta(),Lse=u_(),qse=f_(),Mse=h_();function Fse(t){return{parser:{GrammarConfig:e=>(0,lse.createGrammarConfig)(e),LangiumParser:e=>(0,_se.createLangiumParser)(e),CompletionParser:e=>(0,cse.createCompletionParser)(e),ValueConverter:()=>new Ase.DefaultValueConverter,TokenBuilder:()=>new Rse.DefaultTokenBuilder,Lexer:e=>new Mse.DefaultLexer(e)},lsp:{CompletionProvider:e=>new fse.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new pse.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new yse.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new mse.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new vse.DefaultReferencesProvider(e),DefinitionProvider:e=>new hse.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new dse.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new Tse.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new Ise.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new Ix.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new Ix.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new Sse.DefaultLinker(e),NameProvider:()=>new bse.DefaultNameProvider,ScopeProvider:e=>new kse.DefaultScopeProvider(e),ScopeComputation:e=>new Pse.DefaultScopeComputation(e),References:e=>new Cse.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Ese.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new $se.DefaultDocumentValidator(e),ValidationRegistry:e=>new Ose.ValidationRegistry(e)},shared:()=>t.shared}}zs.createDefaultModule=Fse;function jse(t){return{ServiceRegistry:()=>new wse.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new gse.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new Dx.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new Dx.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new xse.DefaultDocumentBuilder(e),TextDocuments:()=>new sse.TextDocuments(use.TextDocument),IndexManager:e=>new Lse.DefaultIndexManager(e),WorkspaceManager:e=>new qse.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Nse.MutexLock,ConfigurationProvider:e=>new Dse.DefaultConfigurationProvider(e)}}}zs.createDefaultSharedModule=jse});var y_=d(Ir=>{"use strict";Object.defineProperty(Ir,"__esModule",{value:!0});Ir.findIndentation=Ir.SNLE=Ir.expandToString=Ir.expandToStringWithNL=void 0;var Il=Eo();function Gse(t,...e){return xx(t,...e)+Il.EOL}Ir.expandToStringWithNL=Gse;function xx(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Ir.SNLE:Kse((0,Il.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(Il.EOL).filter(o=>o.trim()!==Ir.SNLE).map(o=>o.replace(Ir.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=Lx(r);return r.map(o=>o.slice(a).trimRight()).join(`
`)}Ir.expandToString=xx;Ir.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");var Use=new RegExp(Il.EOL,"g"),Hse=/\S|$/;function Kse(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Use,Il.EOL+n)}function Lx(t){let e=t.filter(n=>n.length>0).map(n=>n.search(Hse)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Ir.findIndentation=Lx});var Mx=d(Ys=>{"use strict";Object.defineProperty(Ys,"__esModule",{value:!0});Ys.joinToNode=Ys.expandToNode=void 0;var Li=Eo(),Wse=y_(),kp=Object.freeze(new Li.NewLineNode),qx=Object.freeze(new Li.CompositeGeneratorNode);function Bse(t,...e){let r=Vse(t),n=zse(t,e,r);return Yse(n)}Ys.expandToNode=Bse;function Vse(t){let e=t.join("_").split(Li.EOL),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,Wse.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function zse(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(Li.EOL).map((f,h)=>h===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,h,v)=>v===0?n?[]:[h]:v===1&&f.length===0?[h]:f.concat(kp,h):(f,h,v)=>v===0?[h]:f.concat(kp,h),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,Li.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new Li.CompositeGeneratorNode(String(e[c])):c<e.length?qx:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===kp?o.slice(0,s-2):o.slice(0,s-1):o}function Yse(t){return t.reduce((r,n,i)=>n===qx?r:n===kp?{indent:"",node:i===0||(0,Li.isNewLineNode)(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>({indent:r.indent===""&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):r.indent,node:r.indent.length===0?r.node.append(n):r.node.indent(o=>o.append(n),r.indent)}))(),{indent:"",node:new Li.CompositeGeneratorNode}).node}function Xse(t,e=String,{prefix:r,suffix:n,appendNewLineIfNotEmpty:i}={}){return Jse(t,(a,o,s,u)=>(a??(a=new Li.CompositeGeneratorNode),a.append(r&&r(o,s,u)).append(e(o,s,u)).append(n&&n(o,s,u)).appendNewLineIfNotEmptyIf(!a.isEmpty()&&!!i)))}Ys.joinToNode=Xse;function Jse(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var jx=d(Fx=>{"use strict";Object.defineProperty(Fx,"__esModule",{value:!0})});var Ux=d(Gx=>{"use strict";Object.defineProperty(Gx,"__esModule",{value:!0})});var Kx=d(Hx=>{"use strict";Object.defineProperty(Hx,"__esModule",{value:!0})});var eo=d(Z=>{"use strict";var Wx=Z&&Z.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Qse=Z&&Z.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),ce=Z&&Z.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Wx(e,t,r)},Zse=Z&&Z.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&Wx(e,t,r);return Qse(e,t),e};Object.defineProperty(Z,"__esModule",{value:!0});Z.GrammarAST=Z.expandToStringWithNL=Z.expandToString=void 0;ce(Ef(),Z);ce(Cu(),Z);ce(Eo(),Z);ce(Mx(),Z);var Bx=y_();Object.defineProperty(Z,"expandToString",{enumerable:!0,get:function(){return Bx.expandToString}});Object.defineProperty(Z,"expandToStringWithNL",{enumerable:!0,get:function(){return Bx.expandToStringWithNL}});ce(iy(),Z);ce(Sg(),Z);ce(jx(),Z);ce(dg(),Z);ce(lp(),Z);ce(IT(),Z);ce(Ux(),Z);ce(LT(),Z);ce(FT(),Z);ce(h_(),Z);ce(UT(),Z);ce($o(),Z);ce(Hc(),Z);ce(Wc(),Z);ce(WT(),Z);ce(VT(),Z);ce(Kx(),Z);ce(mr(),Z);ce(Ie(),Z);ce(Pr(),Z);ce(Qe(),Z);ce(kt(),Z);ce(jr(),Z);ce(Ti(),Z);ce(Oo(),Z);ce(xt(),Z);ce(zc(),Z);ce(YT(),Z);ce(QT(),Z);ce(i_(),Z);ce(ta(),Z);ce(u_(),Z);ce(bg(),Z);ce(f_(),Z);ce(t_(),Z);var eue=Zse($e());Z.GrammarAST=eue});var zx=d((lTe,Vx)=>{"use strict";Vx.exports=qe()});var g_=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTDeclaration=p.ASTDeclaration=p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlter=p.ASTAlter=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTRange=p.ASTRange=p.isASTParameter=p.ASTParameter=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTList=p.ASTList=p.isASTInstruction=p.ASTInstruction=void 0;p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTOffsetList=p.ASTOffsetList=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=p.isASTDoubleValue=p.ASTDoubleValue=p.isASTDoubleRange=p.ASTDoubleRange=p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTrajectory=p.ASTTrajectory=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTStringList=p.ASTStringList=p.isASTSpeedParameterType=p.ASTSpeedParameterType=p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=p.isASTSaturationParameterType=p.ASTSaturationParameterType=p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=void 0;var tue=eo();p.ASTInstruction="ASTInstruction";function rue(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=rue;p.ASTList="ASTList";function nue(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=nue;p.ASTNumber="ASTNumber";function iue(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=iue;p.ASTNumberOffset="ASTNumberOffset";function aue(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=aue;p.ASTParameter="ASTParameter";function oue(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=oue;p.ASTRange="ASTRange";function sue(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=sue;p.ASTReplayTarget="ASTReplayTarget";function uue(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=uue;p.ASTTarget="ASTTarget";function lue(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=lue;p.ASTTimeScope="ASTTimeScope";function cue(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=cue;p.ASTValue="ASTValue";function fue(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=fue;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function due(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=due;p.ASTAllPlanes="ASTAllPlanes";function pue(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=pue;p.ASTAlter="ASTAlter";function mue(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=mue;p.ASTAlterSpeed="ASTAlterSpeed";function hue(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=hue;p.ASTAssertion="ASTAssertion";function yue(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=yue;p.ASTAssertions="ASTAssertions";function gue(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=gue;p.ASTAt="ASTAt";function vue(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=vue;p.ASTAtFor="ASTAtFor";function Tue(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=Tue;p.ASTConstantValue="ASTConstantValue";function _ue(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=_ue;p.ASTCreate="ASTCreate";function Rue(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=Rue;p.ASTCreationParameter="ASTCreationParameter";function Aue(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=Aue;p.ASTCreationParameters="ASTCreationParameters";function Sue(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=Sue;p.ASTCreationParameterType="ASTCreationParameterType";function bue(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=bue;p.ASTCut="ASTCut";function Cue(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=Cue;p.ASTDeclaration="ASTDeclaration";function Pue(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=Pue;p.ASTDelay="ASTDelay";function kue(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=kue;p.ASTDelayParameter="ASTDelayParameter";function Eue(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=Eue;p.ASTDoubleRange="ASTDoubleRange";function wue(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=wue;p.ASTDoubleValue="ASTDoubleValue";function Nue(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=Nue;p.ASTFilters="ASTFilters";function $ue(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=$ue;p.ASTHide="ASTHide";function Oue(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=Oue;p.ASTHideParameter="ASTHideParameter";function Iue(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=Iue;p.ASTIntegerRange="ASTIntegerRange";function Due(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=Due;p.ASTIntegerValue="ASTIntegerValue";function xue(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=xue;p.ASTLeftShift="ASTLeftShift";function Lue(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=Lue;p.ASTOffsetList="ASTOffsetList";function que(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=que;p.ASTParamDrift="ASTParamDrift";function Mue(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Mue;p.ASTParamEdit="ASTParamEdit";function Fue(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=Fue;p.ASTParameters="ASTParameters";function jue(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=jue;p.ASTParameterType="ASTParameterType";function Gue(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=Gue;p.ASTParamNoise="ASTParamNoise";function Uue(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=Uue;p.ASTParamOffset="ASTParamOffset";function Hue(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=Hue;p.ASTPlane="ASTPlane";function Kue(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=Kue;p.ASTPlaneFrom="ASTPlaneFrom";function Wue(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=Wue;p.ASTRecordingParameterType="ASTRecordingParameterType";function Bue(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=Bue;p.ASTRecordingValue="ASTRecordingValue";function Vue(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=Vue;p.ASTReplay="ASTReplay";function zue(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=zue;p.ASTRightShift="ASTRightShift";function Yue(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=Yue;p.ASTRotate="ASTRotate";function Xue(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=Xue;p.ASTRotateParameter="ASTRotateParameter";function Jue(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=Jue;p.ASTSaturate="ASTSaturate";function Que(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=Que;p.ASTSaturationParameter="ASTSaturationParameter";function Zue(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=Zue;p.ASTSaturationParameters="ASTSaturationParameters";function ele(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=ele;p.ASTSaturationParameterType="ASTSaturationParameterType";function tle(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=tle;p.ASTScenario="ASTScenario";function rle(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=rle;p.ASTSpeedParameter="ASTSpeedParameter";function nle(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=nle;p.ASTSpeedParameters="ASTSpeedParameters";function ile(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=ile;p.ASTSpeedParameterType="ASTSpeedParameterType";function ale(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=ale;p.ASTStringList="ASTStringList";function ole(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=ole;p.ASTStringValue="ASTStringValue";function sle(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=sle;p.ASTTime="ASTTime";function ule(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=ule;p.ASTTrajectory="ASTTrajectory";function lle(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=lle;p.ASTTrigger="ASTTrigger";function cle(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=cle;p.ASTVariableValue="ASTVariableValue";function fle(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=fle;p.ASTWayPoint="ASTWayPoint";function dle(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=dle;p.ASTWayPoints="ASTWayPoints";function ple(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=ple;p.ASTWindow="ASTWindow";function mle(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=mle;p.ASTListDeclaration="ASTListDeclaration";function hle(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=hle;p.ASTRangeDeclaration="ASTRangeDeclaration";function yle(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=yle;var Ep=class extends tue.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlter:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:case p.ASTTrajectory:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTAtFor:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTStringValue:case p.ASTVariableValue:case p.ASTNumberOffset:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleRange:case p.ASTIntegerRange:return this.isSubtype(p.ASTRange,r);case p.ASTDoubleValue:case p.ASTIntegerValue:case p.ASTRecordingValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTRightShift:case p.ASTNumber:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTOffsetList:case p.ASTStringList:return this.isSubtype(p.ASTList,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=Ep;p.reflection=new Ep});var Yx=d(Np=>{"use strict";Object.defineProperty(Np,"__esModule",{value:!0});Np.AttackScenarioGrammarGrammar=void 0;var gle=eo(),wp,vle=()=>wp!=null?wp:wp=(0,gle.loadGrammarFromJson)(`{
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@102"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@84"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@103"
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
      "name": "ASTOffsetList",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@102"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@84"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@103"
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@104"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@84"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@105"
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
      "name": "ASTDoubleRange",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@104"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@84"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@105"
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@84"
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
      "name": "ASTListDeclaration",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@106"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@88"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@106"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@88"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@113"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@85"
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@73"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@73"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@72"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@122"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@114"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@115"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@116"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@79"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@76"
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
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@133"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@134"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@120"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@70"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@120"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@97"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@70"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@97"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@132"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@104"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@84"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@105"
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
      "name": "ASTWayPoint",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@100"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@84"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@101"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@131"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@77"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@130"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@117"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@118"
              },
              "arguments": []
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
      "name": "ASTRotateParameter",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@119"
              },
              "arguments": []
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@88"
              },
              "arguments": []
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@89"
              },
              "arguments": []
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@130"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@88"
              },
              "arguments": []
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
      "name": "ASTSaturationParameters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@130"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@88"
              },
              "arguments": []
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
      "name": "ASTCreationParameters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@130"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@88"
              },
              "arguments": []
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
      "name": "ASTTrigger",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@124"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@77"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@98"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@127"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@77"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@96"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@125"
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
      "name": "ASTFilters",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@123"
              },
              "arguments": []
            }
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
                "$type": "Assignment",
                "feature": "keyword",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@75"
                  },
                  "arguments": []
                }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@94"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@95"
              },
              "arguments": []
            }
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
            "$type": "Assignment",
            "feature": "keyword",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@111"
              },
              "arguments": []
            }
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
      "$type": "ParserRule",
      "name": "T_AREA",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "area"
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
      "name": "T_ALL_PLANES",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "all_planes"
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
      "name": "T_PLANES",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "planes"
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
      "name": "T_ALTER_SPEED",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "alter_speed"
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
      "name": "T_ALTER",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "alter"
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
      "name": "T_ALTITUDE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "altitude"
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
      "name": "T_AND",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "and"
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
      "name": "T_ASSERT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "assert"
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
      "name": "T_AT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "at"
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
      "name": "T_CIRCLE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "circle"
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
      "name": "T_CUT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "cut"
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
      "name": "T_DO",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "do"
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
      "name": "T_EACH",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "each"
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
      "name": "T_POLYGON",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "polygon"
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
      "name": "T_CENTERED",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "centered"
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
      "name": "T_COMMA",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": ","
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
      "name": "T_CREATE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "create"
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
      "name": "T_DOT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "."
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
      "name": "T_DIFFERENT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "<>"
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
      "name": "T_EQUAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "="
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
      "name": "T_MULEQUAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "*="
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
      "name": "T_PLUSEQUAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "+="
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
      "name": "T_MINUSEQUAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "-="
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
      "name": "T_PLUSPLUSEQUAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "++="
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
      "name": "T_MINUSMINUSEQUAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "--="
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
      "name": "T_LEFTSHIT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "<<"
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
      "name": "T_RIGHTSHIT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": ">>"
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
      "name": "T_FOR",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "for"
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
      "name": "T_FROM_RECORDING",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "from_recording"
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
      "name": "T_FROM",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "from"
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
      "name": "T_GLOBAL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "global"
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
      "name": "T_OPEN_PAR",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "("
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
      "name": "T_CLOSE_PAR",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": ")"
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
      "name": "T_OPEN_BRACE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "{"
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
      "name": "T_CLOSE_BRACE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "}"
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
      "name": "T_OPEN_SBRACE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "["
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
      "name": "T_CLOSE_SBRACE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "]"
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
      "name": "T_LET",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "let"
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
      "name": "T_LT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "<"
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
      "name": "T_GT",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": ">"
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
      "name": "T_LTE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "<="
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
      "name": "T_GTE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": ">="
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
      "name": "T_MUL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "*"
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
      "name": "T_IN",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "in"
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
      "name": "T_HIDE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "hide"
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
      "name": "T_REPLAY",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "replay"
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
      "name": "T_DELAY",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "delay"
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
      "name": "T_ROTATE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "rotate"
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
      "name": "T_WITH_DELAY",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with_delay"
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
      "name": "T_WITH_FREQUENCY",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with_frequency"
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
      "name": "T_WITH_ANGLE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with_angle"
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
      "name": "T_PLANE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "plane"
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
      "name": "T_RADIUS",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "radius"
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
      "name": "T_SATURATE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "saturate"
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
      "name": "T_SATISFYING",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "satisfying"
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
      "name": "T_TRIGGERED_BY",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "triggered_by"
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
      "name": "T_SECONDS",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "seconds"
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
      "name": "T_TO",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "to"
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
      "name": "T_UNTIL",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "until"
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
      "name": "T_VERTICES",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "vertices"
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
      "name": "T_WITH",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with"
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
      "name": "T_WITH_VALUES",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with_values"
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
      "name": "T_WITH_ALTITUDE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with_altitude"
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
      "name": "T_WITH_WAYPOINTS",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "with_waypoints"
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
      "name": "T_GROOVY_FILE",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "groovy_file"
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
      "name": "T_FILTER",
      "dataType": "string",
      "definition": {
        "$type": "Keyword",
        "value": "filter"
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
}`);Np.AttackScenarioGrammarGrammar=vle});var Xx=d(qi=>{"use strict";Object.defineProperty(qi,"__esModule",{value:!0});qi.AttackScenarioGrammarGeneratedModule=qi.FditscenarioGeneratedSharedModule=qi.AttackScenarioGrammarLanguageMetaData=void 0;var Tle=g_(),_le=Yx();qi.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};qi.FditscenarioGeneratedSharedModule={AstReflection:()=>new Tle.FditscenarioAstReflection};qi.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,_le.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>qi.AttackScenarioGrammarLanguageMetaData,parser:{}}});var Jx=d(Xs=>{"use strict";Object.defineProperty(Xs,"__esModule",{value:!0});Xs.FditscenarioValidator=Xs.registerValidationChecks=void 0;function Rle(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}Xs.registerValidationChecks=Rle;var v_=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};Xs.FditscenarioValidator=v_});var eL=d(Dp=>{"use strict";Object.defineProperty(Dp,"__esModule",{value:!0});Dp.generateCommands=void 0;var $t=g_(),Ale=22e3;function Sle(t,e){return ble(t,e)}Dp.generateCommands=Sle;function ble(t,e){return{sensors:Cle(t,e)}}function Cle(t,e){return{sensor:[{sensorType:"SBS",sID:"",record:e,filter:"",action:Ple(t.instructions)}]}}var Qr;(function(t){t.deletion="DELETION",t.creation="CREATION",t.alteration="ALTERATION",t.saturation="SATURATION",t.duplication="DUPLICATION",t.rotation="ROTATION",t.custom="CUSTOM",t.replay="REPLAY",t.timestamp="ALTERATIONTIMESTAMP",t.cut="CUT",t.speedAltaration="ALTERATIONSPEED",t.trajectory="TRAJECTORY"})(Qr||(Qr={}));var Zr;(function(t){t.altitude="altitude",t.latitude="latitude",t.icao="icao",t.track="track",t.callsign="callsign",t.emergency="emergency",t.groundspeed="groundSpeed",t.longitude="longitude",t.spi="SPI",t.squawk="squawk"})(Zr||(Zr={}));var _a;(function(t){t.icao="icao",t.callsign="callsign",t.emergency="emergency",t.spi="SPI",t.squawk="squawk",t.alert="alert"})(_a||(_a={}));var Op;(function(t){t.east_west_velocity="EAST_WEST_VELOCITY",t.north_south_velocity="NORTH_SOUTH_VELOCITY"})(Op||(Op={}));var Ip;(function(t){t.icao="ICAO",t.aircraft_number="AIRCRAFT_NUMBER"})(Ip||(Ip={}));function Ple(t){return t.flatMap(e=>kle(e)).filter(e=>e!==void 0)}function kle(t){return(0,$t.isASTHide)(t)?{alterationType:Qr.deletion,scope:ai(t.timeScope),parameters:{target:Ta(t.target),parameter:[{mode:"simple",frequency:Qle(t.frequency)}]}}:(0,$t.isASTAlter)(t)?{alterationType:Qr.alteration,scope:ai(t.timeScope),parameters:{target:Ta(t.target),parameter:Yle(t.parameters)}}:(0,$t.isASTCreate)(t)?{alterationType:Qr.creation,scope:ai(t.timeScope),parameters:{target:{identifier:"hexIdent",value:""},trajectory:Qx(t.trajectory),parameter:xle(t.parameters)}}:(0,$t.isASTTrajectory)(t)?{alterationType:Qr.trajectory,scope:ai(t.timeScope),parameters:{target:Ta(t.target),trajectory:Qx(t.trajectory)}}:(0,$t.isASTAlterSpeed)(t)?{alterationType:Qr.speedAltaration,scope:ai(t.timeScope),parameters:{target:Ta(t.target),parameter:Fle(t.parameters)}}:(0,$t.isASTSaturate)(t)?{alterationType:Qr.saturation,scope:ai(t.timeScope),parameters:{target:Ta(t.target),parameter:Hle(t.parameters)}}:(0,$t.isASTReplay)(t)?{alterationType:Qr.replay,scope:ai(t.timeScope),parameters:{target:Nle(t.target)}}:(0,$t.isASTDelay)(t)?{alterationType:Qr.timestamp,scope:ai(t.timeScope),parameters:{target:Ta(t.target),parameter:[Vle(t.delay)]}}:(0,$t.isASTRotate)(t)?{alterationType:Qr.rotation,scope:ai(t.timeScope),parameters:{target:Ta(t.target),parameter:[zle(t.angle)]}}:{alterationType:Qr.cut,scope:ai(t.timeScope),parameters:{target:Ta(t.target)}}}function ai(t){return(0,$t.isASTAt)(t)?{type:"timeWindow",lowerBound:T_(t.time),upperBound:(parseInt(T_(t.time))+Ale).toString()}:{type:"timeWindow"}}function T_(t){return(0,$t.isASTTime)(t)?Zx(t.realTime):"0"}function Zx(t){return(0,$t.isASTNumberOffset)(t)?Ele(t):"0"}function Ele(t){return(0,$t.isASTNumber)(t)?wle(t):"0"}function wle(t){return(0,$t.isASTIntegerValue)(t)?(t.content*1e3).toString():"0"}function Ta(t){return(0,$t.isASTAllPlanes)(t)?{identifier:"hexIdent",value:"ALL"}:{identifier:"hexIdent",value:"TEST"}}function Nle(t){return(0,$t.isASTAllPlaneFrom)(t)?{identifier:"hexIdent",value:"ALL"}:{identifier:"hexIdent",value:"TEST"}}function Qx(t){return{waypoint:$le(t.waypoints)}}function $le(t){let e=[];for(let r=0;r<t.length;r++)e.push(Ole(t[r]));return e}function Ole(t){return{vertex:Ile(t.latitude,t.longitude),altitude:Dle(t.altitude),time:t.time.realTime.content*1e3}}function Ile(t,e){return{lat:{value:t.content,offset:!1},lon:{value:e.content,offset:!1}}}function Dle(t){return{value:t.content,offset:!1}}function xle(t){return Lle(t.items)}function Lle(t){let e=[];for(let r=0;r<t.length;r++)e.push(qle(t[r]));return e}function qle(t){return{mode:"simple",key:Mle(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}}function Mle(t){return t.ICAO!=null?_a.icao:t.CALLSIGN!=null?_a.callsign:t.EMERGENCY!=null?_a.emergency:t.ALERT!=null?_a.alert:t.SPI!=null?_a.spi:_a.squawk}function Fle(t){return jle(t.items)}function jle(t){let e=[];for(let r=0;r<t.length;r++)e.push(Gle(t[r]));return e}function Gle(t){return{mode:"simple",key:Ule(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}}function Ule(t){if(t.EAST_WEST_VELOCITY!=null)return Op.east_west_velocity;if(t.NORTH_SOUTH_VELOCITY!=null)return Op.north_south_velocity}function Hle(t){return Kle(t.items)}function Kle(t){let e=[];for(let r=0;r<t.length;r++)e.push(Wle(t[r]));return e}function Wle(t){return{mode:"simple",number:Ble(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}}function Ble(t){if(t.ICAO!=null)return Ip.icao;if(t.AIRCRAFT_NUMBER!=null)return Ip.aircraft_number}function Vle(t){return{mode:"simple",value:T_(t.value)}}function zle(t){return{mode:"simple",angle:"angle",value:Zx(t.value)}}function Yle(t){return t!=null?Xle(t.items):[]}function Xle(t){let e=[];for(let r=0;r<t.length;r++)e.push(Jle(t[r]));return e}function Jle(t){return(0,$t.isASTParamEdit)(t)?{mode:"simple",key:$p(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}:(0,$t.isASTParamOffset)(t)?{mode:"offset",key:$p(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}:(0,$t.isASTParamNoise)(t)?{mode:"noise",key:$p(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}:{mode:"drift",key:$p(t.name),value:t.value.content.toString().replace('"',"").replace('"',"")}}function $p(t){return t.ALTITUDE!=null?Zr.altitude:t.CALLSIGN!=null?Zr.callsign:t.EMERGENCY!=null?Zr.emergency:t.GROUND_SPEED!=null?Zr.groundspeed:t.ICAO!=null?Zr.icao:t.LATITUDE!=null?Zr.latitude:t.LONGITUDE!=null?Zr.longitude:t.SPI!=null?Zr.spi:t.SQUAWK!=null?Zr.squawk:Zr.track}function Qle(t){return t!=null?t.value.content.toString():""}});var rL=d((hTe,tL)=>{"use strict";tL.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var __=d((yTe,iL)=>{var Dl=rL(),nL={};for(let t of Object.keys(Dl))nL[Dl[t]]=t;var Y={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};iL.exports=Y;for(let t of Object.keys(Y)){if(!("channels"in Y[t]))throw new Error("missing channels property: "+t);if(!("labels"in Y[t]))throw new Error("missing channel labels property: "+t);if(Y[t].labels.length!==Y[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=Y[t];delete Y[t].channels,delete Y[t].labels,Object.defineProperty(Y[t],"channels",{value:e}),Object.defineProperty(Y[t],"labels",{value:r})}Y.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(e,r,n),a=Math.max(e,r,n),o=a-i,s,u;a===i?s=0:e===a?s=(r-n)/o:r===a?s=2+(n-e)/o:n===a&&(s=4+(e-r)/o),s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return a===i?u=0:l<=.5?u=o/(a+i):u=o/(2-a-i),[s,u*100,l*100]};Y.rgb.hsv=function(t){let e,r,n,i,a,o=t[0]/255,s=t[1]/255,u=t[2]/255,l=Math.max(o,s,u),c=l-Math.min(o,s,u),f=function(h){return(l-h)/6/c+1/2};return c===0?(i=0,a=0):(a=c/l,e=f(o),r=f(s),n=f(u),o===l?i=n-r:s===l?i=1/3+e-n:u===l&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[i*360,a*100,l*100]};Y.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],i=Y.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[i,a*100,n*100]};Y.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-r,1-n),a=(1-e-i)/(1-i)||0,o=(1-r-i)/(1-i)||0,s=(1-n-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function Zle(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}Y.rgb.keyword=function(t){let e=nL[t];if(e)return e;let r=1/0,n;for(let i of Object.keys(Dl)){let a=Dl[i],o=Zle(t,a);o<r&&(r=o,n=i)}return n};Y.keyword.rgb=function(t){return Dl[t]};Y.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let i=e*.4124+r*.3576+n*.1805,a=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[i*100,a*100,o*100]};Y.rgb.lab=function(t){let e=Y.rgb.xyz(t),r=e[0],n=e[1],i=e[2];r/=95.047,n/=100,i/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let a=116*n-16,o=500*(r-n),s=200*(n-i);return[a,o,s]};Y.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i,a,o;if(r===0)return o=n*255,[o,o,o];n<.5?i=n*(1+r):i=n+r-n*r;let s=2*n-i,u=[0,0,0];for(let l=0;l<3;l++)a=e+1/3*-(l-1),a<0&&a++,a>1&&a--,6*a<1?o=s+(i-s)*6*a:2*a<1?o=i:3*a<2?o=s+(i-s)*(2/3-a)*6:o=s,u[l]=o*255;return u};Y.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=r,a=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,i*=a<=1?a:2-a;let o=(n+r)/2,s=n===0?2*i/(a+i):2*r/(n+r);return[e,s*100,o*100]};Y.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,i=Math.floor(e)%6,a=e-Math.floor(e),o=255*n*(1-r),s=255*n*(1-r*a),u=255*n*(1-r*(1-a));switch(n*=255,i){case 0:return[n,u,o];case 1:return[s,n,o];case 2:return[o,n,u];case 3:return[o,s,n];case 4:return[u,o,n];case 5:return[n,o,s]}};Y.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=Math.max(n,.01),a,o;o=(2-r)*n;let s=(2-r)*i;return a=r*i,a/=s<=1?s:2-s,a=a||0,o/=2,[e,a*100,o*100]};Y.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i=r+n,a;i>1&&(r/=i,n/=i);let o=Math.floor(6*e),s=1-n;a=6*e-o,o&1&&(a=1-a);let u=r+a*(s-r),l,c,f;switch(o){default:case 6:case 0:l=s,c=u,f=r;break;case 1:l=u,c=s,f=r;break;case 2:l=r,c=s,f=u;break;case 3:l=r,c=u,f=s;break;case 4:l=u,c=r,f=s;break;case 5:l=s,c=r,f=u;break}return[l*255,c*255,f*255]};Y.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i=t[3]/100,a=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,r*(1-i)+i),s=1-Math.min(1,n*(1-i)+i);return[a*255,o*255,s*255]};Y.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i,a,o;return i=e*3.2406+r*-1.5372+n*-.4986,a=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),o=Math.min(Math.max(0,o),1),[i*255,a*255,o*255]};Y.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let i=116*r-16,a=500*(e-r),o=200*(r-n);return[i,a,o]};Y.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],i,a,o;a=(e+16)/116,i=r/500+a,o=a-n/200;let s=a**3,u=i**3,l=o**3;return a=s>.008856?s:(a-16/116)/7.787,i=u>.008856?u:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]};Y.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],i;i=Math.atan2(n,r)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(r*r+n*n);return[e,o,i]};Y.lch.lab=function(t){let e=t[0],r=t[1],i=t[2]/360*2*Math.PI,a=r*Math.cos(i),o=r*Math.sin(i);return[e,a,o]};Y.rgb.ansi16=function(t,e=null){let[r,n,i]=t,a=e===null?Y.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return a===2&&(o+=60),o};Y.hsv.ansi16=function(t){return Y.rgb.ansi16(Y.hsv.rgb(t),t[2])};Y.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};Y.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,i=(e>>1&1)*r*255,a=(e>>2&1)*r*255;return[n,i,a]};Y.ansi256.rgb=function(t){if(t>=232){let a=(t-232)*10+8;return[a,a,a]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,i=e%6/5*255;return[r,n,i]};Y.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};Y.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(s=>s+s).join(""));let n=parseInt(r,16),i=n>>16&255,a=n>>8&255,o=n&255;return[i,a,o]};Y.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),o=i-a,s,u;return o<1?s=a/(1-o):s=0,o<=0?u=0:i===e?u=(r-n)/o%6:i===r?u=2+(n-e)/o:u=4+(e-r)/o,u/=6,u%=1,[u*360,o*100,s*100]};Y.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),i=0;return n<1&&(i=(r-.5*n)/(1-n)),[t[0],n*100,i*100]};Y.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,i=0;return n<1&&(i=(r-n)/(1-n)),[t[0],n*100,i*100]};Y.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let i=[0,0,0],a=e%1*6,o=a%1,s=1-o,u=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return u=(1-r)*n,[(r*i[0]+u)*255,(r*i[1]+u)*255,(r*i[2]+u)*255]};Y.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),i=0;return n>0&&(i=e/n),[t[0],i*100,n*100]};Y.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],i*100,n*100]};Y.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};Y.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],i*100,a*100]};Y.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};Y.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};Y.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};Y.gray.hsl=function(t){return[0,0,t[0]]};Y.gray.hsv=Y.gray.hsl;Y.gray.hwb=function(t){return[0,100,t[0]]};Y.gray.cmyk=function(t){return[0,0,0,t[0]]};Y.gray.lab=function(t){return[t[0],0,0]};Y.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};Y.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var oL=d((gTe,aL)=>{var xp=__();function ece(){let t={},e=Object.keys(xp);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function tce(t){let e=ece(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),i=Object.keys(xp[n]);for(let a=i.length,o=0;o<a;o++){let s=i[o],u=e[s];u.distance===-1&&(u.distance=e[n].distance+1,u.parent=n,r.unshift(s))}}return e}function rce(t,e){return function(r){return e(t(r))}}function nce(t,e){let r=[e[t].parent,t],n=xp[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)r.unshift(e[i].parent),n=rce(xp[e[i].parent][i],n),i=e[i].parent;return n.conversion=r,n}aL.exports=function(t){let e=tce(t),r={},n=Object.keys(e);for(let i=n.length,a=0;a<i;a++){let o=n[a];e[o].parent!==null&&(r[o]=nce(o,e))}return r}});var uL=d((vTe,sL)=>{var R_=__(),ice=oL(),Js={},ace=Object.keys(R_);function oce(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function sce(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let i=t(r);if(typeof i=="object")for(let a=i.length,o=0;o<a;o++)i[o]=Math.round(i[o]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}ace.forEach(t=>{Js[t]={},Object.defineProperty(Js[t],"channels",{value:R_[t].channels}),Object.defineProperty(Js[t],"labels",{value:R_[t].labels});let e=ice(t);Object.keys(e).forEach(n=>{let i=e[n];Js[t][n]=sce(i),Js[t][n].raw=oce(i)})});sL.exports=Js});var mL=d((TTe,pL)=>{"use strict";var lL=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,cL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},fL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},Lp=t=>t,dL=(t,e,r)=>[t,e,r],Qs=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},A_,Zs=(t,e,r,n)=>{A_===void 0&&(A_=uL());let i=n?10:0,a={};for(let[o,s]of Object.entries(A_)){let u=o==="ansi16"?"ansi":o;o===e?a[u]=t(r,i):typeof s=="object"&&(a[u]=t(s[e],i))}return a};function uce(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[i,a]of Object.entries(n))e[i]={open:`\x1B[${a[0]}m`,close:`\x1B[${a[1]}m`},n[i]=e[i],t.set(a[0],a[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",Qs(e.color,"ansi",()=>Zs(lL,"ansi16",Lp,!1)),Qs(e.color,"ansi256",()=>Zs(cL,"ansi256",Lp,!1)),Qs(e.color,"ansi16m",()=>Zs(fL,"rgb",dL,!1)),Qs(e.bgColor,"ansi",()=>Zs(lL,"ansi16",Lp,!0)),Qs(e.bgColor,"ansi256",()=>Zs(cL,"ansi256",Lp,!0)),Qs(e.bgColor,"ansi16m",()=>Zs(fL,"rgb",dL,!0)),e}Object.defineProperty(pL,"exports",{enumerable:!0,get:uce})});var yL=d((_Te,hL)=>{"use strict";hL.exports={stdout:!1,stderr:!1}});var vL=d((RTe,gL)=>{"use strict";var lce=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let i=e.length,a=0,o="";do o+=t.substr(a,n-a)+e+r,a=n+i,n=t.indexOf(e,a);while(n!==-1);return o+=t.substr(a),o},cce=(t,e,r,n)=>{let i=0,a="";do{let o=t[n-1]==="\r";a+=t.substr(i,(o?n-1:n)-i)+e+(o?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return a+=t.substr(i),a};gL.exports={stringReplaceAll:lce,stringEncaseCRLFWithFirstIndex:cce}});var SL=d((ATe,AL)=>{"use strict";var fce=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,TL=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,dce=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,pce=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,mce=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function RL(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):mce.get(t)||t}function hce(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),i;for(let a of n){let o=Number(a);if(!Number.isNaN(o))r.push(o);else if(i=a.match(dce))r.push(i[2].replace(pce,(s,u,l)=>u?RL(u):l));else throw new Error(`Invalid Chalk template style argument: ${a} (in style '${t}')`)}return r}function yce(t){TL.lastIndex=0;let e=[],r;for(;(r=TL.exec(t))!==null;){let n=r[1];if(r[2]){let i=hce(n,r[2]);e.push([n].concat(i))}else e.push([n])}return e}function _L(t,e){let r={};for(let i of e)for(let a of i.styles)r[a[0]]=i.inverse?null:a.slice(1);let n=t;for(let[i,a]of Object.entries(r))if(Array.isArray(a)){if(!(i in n))throw new Error(`Unknown Chalk style: ${i}`);n=a.length>0?n[i](...a):n[i]}return n}AL.exports=(t,e)=>{let r=[],n=[],i=[];if(e.replace(fce,(a,o,s,u,l,c)=>{if(o)i.push(RL(o));else if(u){let f=i.join("");i=[],n.push(r.length===0?f:_L(t,r)(f)),r.push({inverse:s,styles:yce(u)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push(_L(t,r)(i.join(""))),i=[],r.pop()}else i.push(c)}),n.push(i.join("")),r.length>0){let a=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(a)}return n.join("")}});var NL=d((STe,wL)=>{"use strict";var xl=mL(),{stdout:b_,stderr:C_}=yL(),{stringReplaceAll:gce,stringEncaseCRLFWithFirstIndex:vce}=vL(),{isArray:qp}=Array,CL=["ansi","ansi","ansi256","ansi16m"],eu=Object.create(null),Tce=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=b_?b_.level:0;t.level=e.level===void 0?r:e.level},P_=class{constructor(e){return PL(e)}},PL=t=>{let e={};return Tce(e,t),e.template=(...r)=>EL(e.template,...r),Object.setPrototypeOf(e,Mp.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=P_,e.template};function Mp(t){return PL(t)}for(let[t,e]of Object.entries(xl))eu[t]={get(){let r=Fp(this,k_(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};eu.visible={get(){let t=Fp(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var kL=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of kL)eu[t]={get(){let{level:e}=this;return function(...r){let n=k_(xl.color[CL[e]][t](...r),xl.color.close,this._styler);return Fp(this,n,this._isEmpty)}}};for(let t of kL){let e="bg"+t[0].toUpperCase()+t.slice(1);eu[e]={get(){let{level:r}=this;return function(...n){let i=k_(xl.bgColor[CL[r]][t](...n),xl.bgColor.close,this._styler);return Fp(this,i,this._isEmpty)}}}}var _ce=Object.defineProperties(()=>{},{...eu,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),k_=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Fp=(t,e,r)=>{let n=(...i)=>qp(i[0])&&qp(i[0].raw)?bL(n,EL(n,...i)):bL(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,_ce),n._generator=t,n._styler=e,n._isEmpty=r,n},bL=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=gce(e,r.close,r.open),r=r.parent;let a=e.indexOf(`
`);return a!==-1&&(e=vce(e,i,n,a)),n+e+i},S_,EL=(t,...e)=>{let[r]=e;if(!qp(r)||!qp(r.raw))return e.join(" ");let n=e.slice(1),i=[r.raw[0]];for(let a=1;a<r.length;a++)i.push(String(n[a-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[a]));return S_===void 0&&(S_=SL()),S_(t,i.join(""))};Object.defineProperties(Mp.prototype,eu);var jp=Mp();jp.supportsColor=b_;jp.stderr=Mp({level:C_?C_.level:0});jp.stderr.supportsColor=C_;wL.exports=jp});var xL=d(oi=>{"use strict";var OL=oi&&oi.__awaiter||function(t,e,r,n){function i(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(c){try{l(n.next(c))}catch(f){o(f)}}function u(c){try{l(n.throw(c))}catch(f){o(f)}}function l(c){c.done?a(c.value):i(c.value).then(s,u)}l((n=n.apply(t,e||[])).next())})},Rce=oi&&oi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(oi,"__esModule",{value:!0});oi.parseAndGenerate=oi.extractAstNodeFromString=void 0;var IL=Ln(),Ace=eo(),Sce=E_(),bce=eL(),$L=Rce(NL());function DL(t,e){return OL(this,void 0,void 0,function*(){let r=e.shared.workspace.LangiumDocumentFactory.fromString(t,IL.URI.parse("memory://fditscenario.document"));return yield e.shared.workspace.DocumentBuilder.build([r],{validationChecks:"all"}),r.parseResult.value})}oi.extractAstNodeFromString=DL;function Cce(t,e){return OL(this,void 0,void 0,function*(){let r=(0,Sce.createFditscenarioServices)(Ace.EmptyFileSystem).Fditscenario,n=yield DL(t,r);console.log("fditscenarioProgram : "+t);let a=r.shared.workspace.LangiumDocumentFactory.fromString(t,IL.URI.parse("memory://fditscenario.document")).parseResult;if(a.lexerErrors.length===0&&a.parserErrors.length===0)console.log($L.default.green("Parsed and validated successfully!"));else return console.log($L.default.red("Failed to parse and validate !")),Promise.resolve(void 0);let o=(0,bce.generateCommands)(n,e);return Promise.resolve(o)})}oi.parseAndGenerate=Cce});var E_=d(to=>{"use strict";Object.defineProperty(to,"__esModule",{value:!0});to.createFditscenarioServices=to.FditscenarioModule=void 0;var Gp=eo(),LL=Xx(),qL=Jx(),Pce=eo(),kce=xL();to.FditscenarioModule={validation:{FditscenarioValidator:()=>new qL.FditscenarioValidator}};function Ece(t){let e=(0,Gp.inject)((0,Gp.createDefaultSharedModule)(t),LL.FditscenarioGeneratedSharedModule),r=(0,Gp.inject)((0,Gp.createDefaultModule)({shared:e}),LL.AttackScenarioGrammarGeneratedModule,to.FditscenarioModule);return e.lsp.ExecuteCommandHandler=new w_,e.ServiceRegistry.register(r),(0,qL.registerValidationChecks)(r),{shared:e,Fditscenario:r}}to.createFditscenarioServices=Ece;var w_=class extends Pce.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,kce.parseAndGenerate)(r[0],r[1]))}}});var Dce=d(FL=>{Object.defineProperty(FL,"__esModule",{value:!0});var ML=eo(),N_=zx(),wce=E_(),Nce=new N_.BrowserMessageReader(self),$ce=new N_.BrowserMessageWriter(self),Oce=(0,N_.createConnection)(Nce,$ce),{shared:Ice}=(0,wce.createFditscenarioServices)(Object.assign({connection:Oce},ML.EmptyFileSystem));(0,ML.startLanguageServer)(Ice)});Dce();})();

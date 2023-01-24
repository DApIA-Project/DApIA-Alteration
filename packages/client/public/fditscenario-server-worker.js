"use strict";(()=>{var Fl=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ci=d(Bp=>{"use strict";Object.defineProperty(Bp,"__esModule",{value:!0});var Kp;function Wp(){if(Kp===void 0)throw new Error("No runtime abstraction layer installed");return Kp}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Kp=r}t.install=e})(Wp||(Wp={}));Bp.default=Wp});var Vp=d(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.Disposable=void 0;var BL;(function(t){function e(r){return{dispose:r}}t.create=e})(BL=au.Disposable||(au.Disposable={}))});var ba=d(Sa=>{"use strict";Object.defineProperty(Sa,"__esModule",{value:!0});Sa.Emitter=Sa.Event=void 0;var VL=ci(),zL;(function(t){let e={dispose(){}};t.None=function(){return e}})(zL=Sa.Event||(Sa.Event={}));var zp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,VL.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},fo=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new zp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=fo._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Sa.Emitter=fo;fo._noop=function(){}});var I_=d(jl=>{"use strict";Object.defineProperty(jl,"__esModule",{value:!0});jl.AbstractMessageBuffer=void 0;var YL=13,XL=10,JL=`\r
`,Yp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case YL:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case XL:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(JL);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),m=l.substr(c+1).trim();o.set(f,m)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};jl.AbstractMessageBuffer=Yp});var L_=d(Zp=>{"use strict";Object.defineProperty(Zp,"__esModule",{value:!0});var D_=ci(),po=Vp(),QL=ba(),ZL=I_(),ho=class extends ZL.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return ho.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};ho.emptyBuffer=new Uint8Array(0);var Xp=class{constructor(e){this.socket=e,this._onData=new QL.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,D_.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),po.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),po.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),po.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Jp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),po.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),po.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),po.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},eq=new TextEncoder,x_=Object.freeze({messageBuffer:Object.freeze({create:t=>new ho(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(eq.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Xp(t),asWritableStream:t=>new Jp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Qp(){return x_}(function(t){function e(){D_.default.install(x_)}t.install=e})(Qp||(Qp={}));Zp.default=Qp});var mo=d(Jt=>{"use strict";Object.defineProperty(Jt,"__esModule",{value:!0});Jt.stringArray=Jt.array=Jt.func=Jt.error=Jt.number=Jt.string=Jt.boolean=void 0;function tq(t){return t===!0||t===!1}Jt.boolean=tq;function q_(t){return typeof t=="string"||t instanceof String}Jt.string=q_;function rq(t){return typeof t=="number"||t instanceof Number}Jt.number=rq;function nq(t){return t instanceof Error}Jt.error=nq;function iq(t){return typeof t=="function"}Jt.func=iq;function M_(t){return Array.isArray(t)}Jt.array=M_;function aq(t){return M_(t)&&t.every(e=>q_(e))}Jt.stringArray=aq});var Ah=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.Message=J.NotificationType9=J.NotificationType8=J.NotificationType7=J.NotificationType6=J.NotificationType5=J.NotificationType4=J.NotificationType3=J.NotificationType2=J.NotificationType1=J.NotificationType0=J.NotificationType=J.RequestType9=J.RequestType8=J.RequestType7=J.RequestType6=J.RequestType5=J.RequestType4=J.RequestType3=J.RequestType2=J.RequestType1=J.RequestType=J.RequestType0=J.AbstractMessageSignature=J.ParameterStructures=J.ResponseError=J.ErrorCodes=void 0;var Ca=mo(),F_;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(F_=J.ErrorCodes||(J.ErrorCodes={}));var ou=class extends Error{constructor(e,r,n){super(r),this.code=Ca.number(e)?e:F_.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,ou.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};J.ResponseError=ou;var Ot=class{constructor(e){this.kind=e}static is(e){return e===Ot.auto||e===Ot.byName||e===Ot.byPosition}toString(){return this.kind}};J.ParameterStructures=Ot;Ot.auto=new Ot("auto");Ot.byPosition=new Ot("byPosition");Ot.byName=new Ot("byName");var Be=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Ot.auto}};J.AbstractMessageSignature=Be;var eh=class extends Be{constructor(e){super(e,0)}};J.RequestType0=eh;var th=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType=th;var rh=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType1=rh;var nh=class extends Be{constructor(e){super(e,2)}};J.RequestType2=nh;var ih=class extends Be{constructor(e){super(e,3)}};J.RequestType3=ih;var ah=class extends Be{constructor(e){super(e,4)}};J.RequestType4=ah;var oh=class extends Be{constructor(e){super(e,5)}};J.RequestType5=oh;var sh=class extends Be{constructor(e){super(e,6)}};J.RequestType6=sh;var uh=class extends Be{constructor(e){super(e,7)}};J.RequestType7=uh;var lh=class extends Be{constructor(e){super(e,8)}};J.RequestType8=lh;var ch=class extends Be{constructor(e){super(e,9)}};J.RequestType9=ch;var fh=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType=fh;var dh=class extends Be{constructor(e){super(e,0)}};J.NotificationType0=dh;var ph=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType1=ph;var hh=class extends Be{constructor(e){super(e,2)}};J.NotificationType2=hh;var mh=class extends Be{constructor(e){super(e,3)}};J.NotificationType3=mh;var yh=class extends Be{constructor(e){super(e,4)}};J.NotificationType4=yh;var gh=class extends Be{constructor(e){super(e,5)}};J.NotificationType5=gh;var vh=class extends Be{constructor(e){super(e,6)}};J.NotificationType6=vh;var Th=class extends Be{constructor(e){super(e,7)}};J.NotificationType7=Th;var _h=class extends Be{constructor(e){super(e,8)}};J.NotificationType8=_h;var Rh=class extends Be{constructor(e){super(e,9)}};J.NotificationType9=Rh;var oq;(function(t){function e(i){let a=i;return a&&Ca.string(a.method)&&(Ca.string(a.id)||Ca.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Ca.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Ca.string(a.id)||Ca.number(a.id)||a.id===null)}t.isResponse=n})(oq=J.Message||(J.Message={}))});var bh=d(fi=>{"use strict";var j_;Object.defineProperty(fi,"__esModule",{value:!0});fi.LRUCache=fi.LinkedMap=fi.Touch=void 0;var or;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(or=fi.Touch||(fi.Touch={}));var Gl=class{constructor(){this[j_]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=or.None){let n=this._map.get(e);if(n)return r!==or.None&&this.touch(n,r),n.value}set(e,r,n=or.None){let i=this._map.get(e);if(i)i.value=r,n!==or.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case or.None:this.addItemLast(i);break;case or.First:this.addItemFirst(i);break;case or.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(j_=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==or.First&&r!==or.Last)){if(r===or.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===or.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};fi.LinkedMap=Gl;var Sh=class extends Gl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=or.AsNew){return super.get(e,r)}peek(e){return super.get(e,or.None)}set(e,r){return super.set(e,r,or.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};fi.LRUCache=Sh});var kh=d(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.CancellationTokenSource=Pa.CancellationToken=void 0;var sq=ci(),uq=mo(),Ch=ba(),Ph;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Ch.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Ch.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||uq.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Ph=Pa.CancellationToken||(Pa.CancellationToken={}));var lq=Object.freeze(function(t,e){let r=(0,sq.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Ul=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?lq:(this._emitter||(this._emitter=new Ch.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Eh=class{get token(){return this._token||(this._token=new Ul),this._token}cancel(){this._token?this._token.cancel():this._token=Ph.Cancelled}dispose(){this._token?this._token instanceof Ul&&this._token.dispose():this._token=Ph.None}};Pa.CancellationTokenSource=Eh});var G_=d(di=>{"use strict";Object.defineProperty(di,"__esModule",{value:!0});di.ReadableStreamMessageReader=di.AbstractMessageReader=di.MessageReader=void 0;var wh=ci(),yo=mo(),Nh=ba(),cq;(function(t){function e(r){let n=r;return n&&yo.func(n.listen)&&yo.func(n.dispose)&&yo.func(n.onError)&&yo.func(n.onClose)&&yo.func(n.onPartialMessage)}t.is=e})(cq=di.MessageReader||(di.MessageReader={}));var Hl=class{constructor(){this.errorEmitter=new Nh.Emitter,this.closeEmitter=new Nh.Emitter,this.partialMessageEmitter=new Nh.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${yo.string(e.message)?e.message:"unknown"}`)}};di.AbstractMessageReader=Hl;var $h;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,wh.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})($h||($h={}));var Oh=class extends Hl{constructor(e,r){super(),this.readable=e,this.options=$h.fromOptions(r),this.buffer=(0,wh.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,wh.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};di.ReadableStreamMessageReader=Oh});var U_=d(Kl=>{"use strict";Object.defineProperty(Kl,"__esModule",{value:!0});Kl.Semaphore=void 0;var fq=ci(),Ih=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,fq.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Kl.Semaphore=Ih});var B_=d(pi=>{"use strict";Object.defineProperty(pi,"__esModule",{value:!0});pi.WriteableStreamMessageWriter=pi.AbstractMessageWriter=pi.MessageWriter=void 0;var H_=ci(),su=mo(),dq=U_(),K_=ba(),pq="Content-Length: ",W_=`\r
`,hq;(function(t){function e(r){let n=r;return n&&su.func(n.dispose)&&su.func(n.onClose)&&su.func(n.onError)&&su.func(n.write)}t.is=e})(hq=pi.MessageWriter||(pi.MessageWriter={}));var Wl=class{constructor(){this.errorEmitter=new K_.Emitter,this.closeEmitter=new K_.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${su.string(e.message)?e.message:"unknown"}`)}};pi.AbstractMessageWriter=Wl;var Dh;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,H_.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,H_.default)().applicationJson.encoder}}t.fromOptions=e})(Dh||(Dh={}));var xh=class extends Wl{constructor(e,r){super(),this.writable=e,this.options=Dh.fromOptions(r),this.errorCount=0,this.writeSemaphore=new dq.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(pq,n.byteLength.toString(),W_),i.push(W_),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};pi.WriteableStreamMessageWriter=xh});var Q_=d(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.createMessageConnection=te.ConnectionOptions=te.CancellationStrategy=te.CancellationSenderStrategy=te.CancellationReceiverStrategy=te.ConnectionStrategy=te.ConnectionError=te.ConnectionErrors=te.LogTraceNotification=te.SetTraceNotification=te.TraceFormat=te.TraceValues=te.Trace=te.NullLogger=te.ProgressType=te.ProgressToken=void 0;var V_=ci(),Pt=mo(),ne=Ah(),z_=bh(),uu=ba(),Lh=kh(),cu;(function(t){t.type=new ne.NotificationType("$/cancelRequest")})(cu||(cu={}));var Y_;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(Y_=te.ProgressToken||(te.ProgressToken={}));var lu;(function(t){t.type=new ne.NotificationType("$/progress")})(lu||(lu={}));var qh=class{constructor(){}};te.ProgressType=qh;var Mh;(function(t){function e(r){return Pt.func(r)}t.is=e})(Mh||(Mh={}));te.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var we;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(we=te.Trace||(te.Trace={}));var mq;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(mq=te.TraceValues||(te.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(we=te.Trace||(te.Trace={}));var sn;(function(t){t.Text="text",t.JSON="json"})(sn=te.TraceFormat||(te.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(sn=te.TraceFormat||(te.TraceFormat={}));var X_;(function(t){t.type=new ne.NotificationType("$/setTrace")})(X_=te.SetTraceNotification||(te.SetTraceNotification={}));var Fh;(function(t){t.type=new ne.NotificationType("$/logTrace")})(Fh=te.LogTraceNotification||(te.LogTraceNotification={}));var Bl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Bl=te.ConnectionErrors||(te.ConnectionErrors={}));var Mi=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,Mi.prototype)}};te.ConnectionError=Mi;var J_;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(J_=te.ConnectionStrategy||(te.ConnectionStrategy={}));var jh;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Lh.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(jh=te.CancellationReceiverStrategy||(te.CancellationReceiverStrategy={}));var Gh;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(cu.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(Gh=te.CancellationSenderStrategy||(te.CancellationSenderStrategy={}));var Uh;(function(t){t.Message=Object.freeze({receiver:jh.Message,sender:Gh.Message});function e(r){let n=r;return n&&jh.is(n.receiver)&&Gh.is(n.sender)}t.is=e})(Uh=te.CancellationStrategy||(te.CancellationStrategy={}));var yq;(function(t){function e(r){let n=r;return n&&(Uh.is(n.cancellationStrategy)||J_.is(n.connectionStrategy))}t.is=e})(yq=te.ConnectionOptions||(te.ConnectionOptions={}));var un;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(un||(un={}));function gq(t,e,r,n){let i=r!==void 0?r:te.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,m=new Map,v=new Map,y,R=new z_.LinkedMap,P=new Map,E=new Set,b=new Map,S=we.Off,O=sn.Text,F,W=un.New,re=new uu.Emitter,Ne=new uu.Emitter,V=new uu.Emitter,Ae=new uu.Emitter,Ye=new uu.Emitter,We=n&&n.cancellationStrategy?n.cancellationStrategy:Uh.Message;function q(C){if(C===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+C.toString()}function L(C){return C===null?"res-unknown-"+(++s).toString():"res-"+C.toString()}function j(){return"not-"+(++o).toString()}function B(C,x){ne.Message.isRequest(x)?C.set(q(x.id),x):ne.Message.isResponse(x)?C.set(L(x.id),x):C.set(j(),x)}function oe(C){}function se(){return W===un.Listening}function ee(){return W===un.Closed}function st(){return W===un.Disposed}function Xe(){(W===un.New||W===un.Listening)&&(W=un.Closed,Ne.fire(void 0))}function Ct(C){re.fire([C,void 0,void 0])}function en(C){re.fire(C)}t.onClose(Xe),t.onError(Ct),e.onClose(Xe),e.onError(en);function Sr(){y||R.size===0||(y=(0,V_.default)().timer.setImmediate(()=>{y=void 0,io()}))}function io(){if(R.size===0)return;let C=R.shift();try{ne.Message.isRequest(C)?ao(C):ne.Message.isNotification(C)?so(C):ne.Message.isResponse(C)?oo(C):nu(C)}finally{Sr()}}let ar=C=>{try{if(ne.Message.isNotification(C)&&C.method===cu.type.method){let x=C.params.id,G=q(x),z=R.get(G);if(ne.Message.isRequest(z)){let Le=n?.connectionStrategy,Je=Le&&Le.cancelUndispatched?Le.cancelUndispatched(z,oe):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){R.delete(G),b.delete(x),Je.id=z.id,Pn(Je,C.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let xe=b.get(x);if(xe!==void 0){xe.cancel(),En(C);return}else E.add(x)}B(R,C)}finally{Sr()}};function ao(C){if(st())return;function x(ye,je,_e){let ft={jsonrpc:u,id:C.id};ye instanceof ne.ResponseError?ft.error=ye.toJson():ft.result=ye===void 0?null:ye,Pn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function G(ye,je,_e){let ft={jsonrpc:u,id:C.id,error:ye.toJson()};Pn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function z(ye,je,_e){ye===void 0&&(ye=null);let ft={jsonrpc:u,id:C.id,result:ye};Pn(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}Ra(C);let xe=c.get(C.method),Le,Je;xe&&(Le=xe.type,Je=xe.handler);let pt=Date.now();if(Je||l){let ye=C.id??String(Date.now()),je=We.receiver.createCancellationTokenSource(ye);C.id!==null&&E.has(C.id)&&je.cancel(),C.id!==null&&b.set(ye,je);try{let _e;if(Je)if(C.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines ${Le.numberOfParams} params but received none.`),C.method,pt);return}_e=Je(je.token)}else if(Array.isArray(C.params)){if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byName){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by name but received parameters by position`),C.method,pt);return}_e=Je(...C.params,je.token)}else{if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byPosition){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by position but received parameters by name`),C.method,pt);return}_e=Je(C.params,je.token)}else l&&(_e=l(C.method,C.params,je.token));let ft=_e;_e?ft.then?ft.then(Xt=>{b.delete(ye),x(Xt,C.method,pt)},Xt=>{b.delete(ye),Xt instanceof ne.ResponseError?G(Xt,C.method,pt):Xt&&Pt.string(Xt.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${Xt.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}):(b.delete(ye),x(_e,C.method,pt)):(b.delete(ye),z(_e,C.method,pt))}catch(_e){b.delete(ye),_e instanceof ne.ResponseError?x(_e,C.method,pt):_e&&Pt.string(_e.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${_e.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}}else G(new ne.ResponseError(ne.ErrorCodes.MethodNotFound,`Unhandled method ${C.method}`),C.method,pt)}function oo(C){if(!st())if(C.id===null)C.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(C.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=C.id,G=P.get(x);if(Aa(C,G),G!==void 0){P.delete(x);try{if(C.error){let z=C.error;G.reject(new ne.ResponseError(z.code,z.message,z.data))}else if(C.result!==void 0)G.resolve(C.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function so(C){if(st())return;let x,G;if(C.method===cu.type.method){let z=C.params.id;E.delete(z),En(C);return}else{let z=m.get(C.method);z&&(G=z.handler,x=z.type)}if(G||f)try{if(En(C),G)if(C.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(C.params)){let z=C.params;C.method===lu.type.method&&z.length===2&&Y_.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines parameters by name but received parameters by position`),x.numberOfParams!==C.params.length&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===ne.ParameterStructures.byPosition&&i.error(`Notification ${C.method} defines parameters by position but received parameters by name`),G(C.params);else f&&f(C.method,C.params)}catch(z){z.message?i.error(`Notification handler '${C.method}' failed with message: ${z.message}`):i.error(`Notification handler '${C.method}' failed unexpectedly.`)}else V.fire(C)}function nu(C){if(!C){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(C,null,4)}`);let x=C;if(Pt.string(x.id)||Pt.number(x.id)){let G=x.id,z=P.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function ct(C){if(C!=null)switch(S){case we.Verbose:return JSON.stringify(C,null,4);case we.Compact:return JSON.stringify(C);default:return}}function si(C){if(!(S===we.Off||!F))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Sending request '${C.method} - (${C.id})'.`,x)}else Dr("send-request",C)}function iu(C){if(!(S===we.Off||!F))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${C.method}'.`,x)}else Dr("send-notification",C)}function Pn(C,x,G){if(!(S===we.Off||!F))if(O===sn.Text){let z;(S===we.Verbose||S===we.Compact)&&(C.error&&C.error.data?z=`Error data: ${ct(C.error.data)}

`:C.result?z=`Result: ${ct(C.result)}

`:C.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${C.id})'. Processing request took ${Date.now()-G}ms`,z)}else Dr("send-response",C)}function Ra(C){if(!(S===we.Off||!F))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Received request '${C.method} - (${C.id})'.`,x)}else Dr("receive-request",C)}function En(C){if(!(S===we.Off||!F||C.method===Fh.type.method))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${C.method}'.`,x)}else Dr("receive-notification",C)}function Aa(C,x){if(!(S===we.Off||!F))if(O===sn.Text){let G;if((S===we.Verbose||S===we.Compact)&&(C.error&&C.error.data?G=`Error data: ${ct(C.error.data)}

`:C.result?G=`Result: ${ct(C.result)}

`:C.error===void 0&&(G=`No result returned.

`)),x){let z=C.error?` Request failed: ${C.error.message} (${C.error.code}).`:"";F.log(`Received response '${x.method} - (${C.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${C.id} without active response promise.`,G)}else Dr("receive-response",C)}function Dr(C,x){if(!F||S===we.Off)return;let G={isLSPMessage:!0,type:C,message:x,timestamp:Date.now()};F.log(G)}function tn(){if(ee())throw new Mi(Bl.Closed,"Connection is closed.");if(st())throw new Mi(Bl.Disposed,"Connection is disposed.")}function uo(){if(se())throw new Mi(Bl.AlreadyListening,"Connection is already listening")}function lo(){if(!se())throw new Error("Call listen() first.")}function br(C){return C===void 0?null:C}function kn(C){if(C!==null)return C}function $t(C){return C!=null&&!Array.isArray(C)&&typeof C=="object"}function rn(C,x){switch(C){case ne.ParameterStructures.auto:return $t(x)?kn(x):[br(x)];case ne.ParameterStructures.byName:if(!$t(x))throw new Error("Received parameters by name but param is not an object literal.");return kn(x);case ne.ParameterStructures.byPosition:return[br(x)];default:throw new Error(`Unknown parameter structure ${C.toString()}`)}}function nn(C,x){let G,z=C.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=rn(C.parameterStructures,x[0]);break;default:G=[];for(let xe=0;xe<x.length&&xe<z;xe++)G.push(br(x[xe]));if(x.length<z)for(let xe=x.length;xe<z;xe++)G.push(null);break}return G}let Nn={sendNotification:(C,...x)=>{tn();let G,z;if(Pt.string(C)){G=C;let Le=x[0],Je=0,pt=ne.ParameterStructures.auto;ne.ParameterStructures.is(Le)&&(Je=1,pt=Le);let ye=x.length,je=ye-Je;switch(je){case 0:z=void 0;break;case 1:z=rn(pt,x[Je]);break;default:if(pt===ne.ParameterStructures.byName)throw new Error(`Received ${je} parameters for 'by Name' notification parameter structure.`);z=x.slice(Je,ye).map(_e=>br(_e));break}}else{let Le=x;G=C.method,z=nn(C,Le)}let xe={jsonrpc:u,method:G,params:z};return iu(xe),e.write(xe).catch(()=>i.error("Sending notification failed."))},onNotification:(C,x)=>{tn();let G;return Pt.func(C)?f=C:x&&(Pt.string(C)?(G=C,m.set(C,{type:void 0,handler:x})):(G=C.method,m.set(C.method,{type:C,handler:x}))),{dispose:()=>{G!==void 0?m.delete(G):f=void 0}}},onProgress:(C,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(C,x,G)=>Nn.sendNotification(lu.type,{token:x,value:G}),onUnhandledProgress:Ae.event,sendRequest:(C,...x)=>{tn(),lo();let G,z,xe;if(Pt.string(C)){G=C;let ye=x[0],je=x[x.length-1],_e=0,ft=ne.ParameterStructures.auto;ne.ParameterStructures.is(ye)&&(_e=1,ft=ye);let Xt=x.length;Lh.CancellationToken.is(je)&&(Xt=Xt-1,xe=je);let ui=Xt-_e;switch(ui){case 0:z=void 0;break;case 1:z=rn(ft,x[_e]);break;default:if(ft===ne.ParameterStructures.byName)throw new Error(`Received ${ui} parameters for 'by Name' request parameter structure.`);z=x.slice(_e,Xt).map(wn=>br(wn));break}}else{let ye=x;G=C.method,z=nn(C,ye);let je=C.numberOfParams;xe=Lh.CancellationToken.is(ye[je])?ye[je]:void 0}let Le=a++,Je;return xe&&(Je=xe.onCancellationRequested(()=>{let ye=We.sender.sendCancellation(Nn,Le);return ye===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):ye.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((ye,je)=>{let _e={jsonrpc:u,id:Le,method:G,params:z},ft=wn=>{ye(wn),We.sender.cleanup(Le),Je?.dispose()},Xt=wn=>{je(wn),We.sender.cleanup(Le),Je?.dispose()},ui={method:G,timerStart:Date.now(),resolve:ft,reject:Xt};si(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch(wn){ui.reject(new ne.ResponseError(ne.ErrorCodes.MessageWriteError,wn.message?wn.message:"Unknown reason")),ui=null}ui&&P.set(Le,ui)})},onRequest:(C,x)=>{tn();let G=null;return Mh.is(C)?(G=void 0,l=C):Pt.string(C)?(G=null,x!==void 0&&(G=C,c.set(C,{handler:x,type:void 0}))):x!==void 0&&(G=C.method,c.set(C.method,{type:C,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>P.size>0,trace:async(C,x,G)=>{let z=!1,xe=sn.Text;G!==void 0&&(Pt.boolean(G)?z=G:(z=G.sendNotification||!1,xe=G.traceFormat||sn.Text)),S=C,O=xe,S===we.Off?F=void 0:F=x,z&&!ee()&&!st()&&await Nn.sendNotification(X_.type,{value:we.toString(C)})},onError:re.event,onClose:Ne.event,onUnhandledNotification:V.event,onDispose:Ye.event,end:()=>{e.end()},dispose:()=>{if(st())return;W=un.Disposed,Ye.fire(void 0);let C=new ne.ResponseError(ne.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of P.values())x.reject(C);P=new Map,b=new Map,E=new Set,R=new z_.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{tn(),uo(),W=un.Listening,t.listen(ar)},inspect:()=>{(0,V_.default)().console.log("inspect")}};return Nn.onNotification(Fh.type,C=>{if(S===we.Off||!F)return;let x=S===we.Verbose||S===we.Compact;F.log(C.message,x?C.verbose:void 0)}),Nn.onNotification(lu.type,C=>{let x=v.get(C.token);x?x(C.value):Ae.fire(C)}),Nn}te.createMessageConnection=gq});var Bh=d(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var Ue=Ah();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return Ue.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return Ue.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return Ue.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return Ue.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return Ue.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return Ue.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return Ue.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return Ue.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return Ue.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return Ue.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return Ue.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return Ue.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return Ue.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return Ue.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return Ue.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return Ue.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return Ue.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return Ue.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return Ue.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return Ue.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return Ue.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return Ue.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return Ue.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return Ue.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return Ue.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return Ue.ParameterStructures}});var Hh=bh();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return Hh.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return Hh.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return Hh.Touch}});var vq=Vp();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return vq.Disposable}});var Z_=ba();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return Z_.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return Z_.Emitter}});var eR=kh();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return eR.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return eR.CancellationToken}});var Kh=G_();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return Kh.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return Kh.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Kh.ReadableStreamMessageReader}});var Wh=B_();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return Wh.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return Wh.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Wh.WriteableStreamMessageWriter}});var Qt=Q_();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return Qt.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return Qt.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return Qt.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return Qt.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return Qt.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return Qt.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return Qt.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return Qt.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return Qt.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return Qt.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return Qt.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return Qt.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return Qt.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return Qt.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return Qt.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return Qt.CancellationStrategy}});var Tq=ci();I.RAL=Tq.default});var hi=d(Cr=>{"use strict";var _q=Cr&&Cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Rq=Cr&&Cr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&_q(e,t,r)};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.createMessageConnection=Cr.BrowserMessageWriter=Cr.BrowserMessageReader=void 0;var Aq=L_();Aq.default.install();var go=Bh();Rq(Bh(),Cr);var Vh=class extends go.AbstractMessageReader{constructor(e){super(),this._onData=new go.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Cr.BrowserMessageReader=Vh;var zh=class extends go.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Cr.BrowserMessageWriter=zh;function Sq(t,e,r,n){return r===void 0&&(r=go.NullLogger),go.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,go.createMessageConnection)(t,e,r,n)}Cr.createMessageConnection=Sq});var Yh=d((Vce,tR)=>{"use strict";tR.exports=hi()});var vo=d((rR,Vl)=>{(function(t){if(typeof Vl=="object"&&typeof Vl.exports=="object"){var e=t(Fl,rR);e!==void 0&&(Vl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(N){return typeof N=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(N){return typeof N=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(_,h){return _===Number.MAX_VALUE&&(_=a.MAX_VALUE),h===Number.MAX_VALUE&&(h=a.MAX_VALUE),{line:_,character:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.uinteger(h.line)&&w.uinteger(h.character)}g.is=N})(o=e.Position||(e.Position={}));var s;(function(g){function k(_,h,$,D){if(w.uinteger(_)&&w.uinteger(h)&&w.uinteger($)&&w.uinteger(D))return{start:o.create(_,h),end:o.create($,D)};if(o.is(_)&&o.is(h))return{start:_,end:h};throw new Error("Range#create called with invalid arguments[".concat(_,", ").concat(h,", ").concat($,", ").concat(D,"]"))}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&o.is(h.start)&&o.is(h.end)}g.is=N})(s=e.Range||(e.Range={}));var u;(function(g){function k(_,h){return{uri:_,range:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&(w.string(h.uri)||w.undefined(h.uri))}g.is=N})(u=e.Location||(e.Location={}));var l;(function(g){function k(_,h,$,D){return{targetUri:_,targetRange:h,targetSelectionRange:$,originSelectionRange:D}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.targetRange)&&w.string(h.targetUri)&&s.is(h.targetSelectionRange)&&(s.is(h.originSelectionRange)||w.undefined(h.originSelectionRange))}g.is=N})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(_,h,$,D){return{red:_,green:h,blue:$,alpha:D}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.numberRange(h.red,0,1)&&w.numberRange(h.green,0,1)&&w.numberRange(h.blue,0,1)&&w.numberRange(h.alpha,0,1)}g.is=N})(c=e.Color||(e.Color={}));var f;(function(g){function k(_,h){return{range:_,color:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&c.is(h.color)}g.is=N})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(g){function k(_,h,$){return{label:_,textEdit:h,additionalTextEdits:$}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.string(h.label)&&(w.undefined(h.textEdit)||F.is(h))&&(w.undefined(h.additionalTextEdits)||w.typedArray(h.additionalTextEdits,F.is))}g.is=N})(m=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function k(_,h,$,D,ae,ut){var Ge={startLine:_,endLine:h};return w.defined($)&&(Ge.startCharacter=$),w.defined(D)&&(Ge.endCharacter=D),w.defined(ae)&&(Ge.kind=ae),w.defined(ut)&&(Ge.collapsedText=ut),Ge}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.uinteger(h.startLine)&&w.uinteger(h.startLine)&&(w.undefined(h.startCharacter)||w.uinteger(h.startCharacter))&&(w.undefined(h.endCharacter)||w.uinteger(h.endCharacter))&&(w.undefined(h.kind)||w.string(h.kind))}g.is=N})(y=e.FoldingRange||(e.FoldingRange={}));var R;(function(g){function k(_,h){return{location:_,message:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&u.is(h.location)&&w.string(h.message)}g.is=N})(R=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var P;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(P=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var E;(function(g){g.Unnecessary=1,g.Deprecated=2})(E=e.DiagnosticTag||(e.DiagnosticTag={}));var b;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&w.string(_.href)}g.is=k})(b=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function k(_,h,$,D,ae,ut){var Ge={range:_,message:h};return w.defined($)&&(Ge.severity=$),w.defined(D)&&(Ge.code=D),w.defined(ae)&&(Ge.source=ae),w.defined(ut)&&(Ge.relatedInformation=ut),Ge}g.create=k;function N(_){var h,$=_;return w.defined($)&&s.is($.range)&&w.string($.message)&&(w.number($.severity)||w.undefined($.severity))&&(w.integer($.code)||w.string($.code)||w.undefined($.code))&&(w.undefined($.codeDescription)||w.string((h=$.codeDescription)===null||h===void 0?void 0:h.href))&&(w.string($.source)||w.undefined($.source))&&(w.undefined($.relatedInformation)||w.typedArray($.relatedInformation,R.is))}g.is=N})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function k(_,h){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ae={title:_,command:h};return w.defined($)&&$.length>0&&(ae.arguments=$),ae}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.title)&&w.string(h.command)}g.is=N})(O=e.Command||(e.Command={}));var F;(function(g){function k($,D){return{range:$,newText:D}}g.replace=k;function N($,D){return{range:{start:$,end:$},newText:D}}g.insert=N;function _($){return{range:$,newText:""}}g.del=_;function h($){var D=$;return w.objectLiteral(D)&&w.string(D.newText)&&s.is(D.range)}g.is=h})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function k(_,h,$){var D={label:_};return h!==void 0&&(D.needsConfirmation=h),$!==void 0&&(D.description=$),D}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.string(h.label)&&(w.boolean(h.needsConfirmation)||h.needsConfirmation===void 0)&&(w.string(h.description)||h.description===void 0)}g.is=N})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var re;(function(g){function k(N){var _=N;return w.string(_)}g.is=k})(re=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ne;(function(g){function k($,D,ae){return{range:$,newText:D,annotationId:ae}}g.replace=k;function N($,D,ae){return{range:{start:$,end:$},newText:D,annotationId:ae}}g.insert=N;function _($,D){return{range:$,newText:"",annotationId:D}}g.del=_;function h($){var D=$;return F.is(D)&&(W.is(D.annotationId)||re.is(D.annotationId))}g.is=h})(Ne=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var V;(function(g){function k(_,h){return{textDocument:_,edits:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&ee.is(h.textDocument)&&Array.isArray(h.edits)}g.is=N})(V=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Ae;(function(g){function k(_,h,$){var D={kind:"create",uri:_};return h!==void 0&&(h.overwrite!==void 0||h.ignoreIfExists!==void 0)&&(D.options=h),$!==void 0&&(D.annotationId=$),D}g.create=k;function N(_){var h=_;return h&&h.kind==="create"&&w.string(h.uri)&&(h.options===void 0||(h.options.overwrite===void 0||w.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||w.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(Ae=e.CreateFile||(e.CreateFile={}));var Ye;(function(g){function k(_,h,$,D){var ae={kind:"rename",oldUri:_,newUri:h};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ae.options=$),D!==void 0&&(ae.annotationId=D),ae}g.create=k;function N(_){var h=_;return h&&h.kind==="rename"&&w.string(h.oldUri)&&w.string(h.newUri)&&(h.options===void 0||(h.options.overwrite===void 0||w.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||w.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(Ye=e.RenameFile||(e.RenameFile={}));var We;(function(g){function k(_,h,$){var D={kind:"delete",uri:_};return h!==void 0&&(h.recursive!==void 0||h.ignoreIfNotExists!==void 0)&&(D.options=h),$!==void 0&&(D.annotationId=$),D}g.create=k;function N(_){var h=_;return h&&h.kind==="delete"&&w.string(h.uri)&&(h.options===void 0||(h.options.recursive===void 0||w.boolean(h.options.recursive))&&(h.options.ignoreIfNotExists===void 0||w.boolean(h.options.ignoreIfNotExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(We=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function k(N){var _=N;return _&&(_.changes!==void 0||_.documentChanges!==void 0)&&(_.documentChanges===void 0||_.documentChanges.every(function(h){return w.string(h.kind)?Ae.is(h)||Ye.is(h)||We.is(h):V.is(h)}))}g.is=k})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(k,N){this.edits=k,this.changeAnnotations=N}return g.prototype.insert=function(k,N,_){var h,$;if(_===void 0?h=F.insert(k,N):re.is(_)?($=_,h=Ne.insert(k,N,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),h=Ne.insert(k,N,$)),this.edits.push(h),$!==void 0)return $},g.prototype.replace=function(k,N,_){var h,$;if(_===void 0?h=F.replace(k,N):re.is(_)?($=_,h=Ne.replace(k,N,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),h=Ne.replace(k,N,$)),this.edits.push(h),$!==void 0)return $},g.prototype.delete=function(k,N){var _,h;if(N===void 0?_=F.del(k):re.is(N)?(h=N,_=Ne.del(k,N)):(this.assertChangeAnnotations(this.changeAnnotations),h=this.changeAnnotations.manage(N),_=Ne.del(k,h)),this.edits.push(_),h!==void 0)return h},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,N){var _;if(re.is(k)?_=k:(_=this.nextId(),N=k),this._annotations[_]!==void 0)throw new Error("Id ".concat(_," is already in use."));if(N===void 0)throw new Error("No annotation provided for id ".concat(_));return this._annotations[_]=N,this._size++,_},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(k){var N=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new j(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(_){if(V.is(_)){var h=new L(_.edits,N._changeAnnotations);N._textEditChanges[_.textDocument.uri]=h}})):k.changes&&Object.keys(k.changes).forEach(function(_){var h=new L(k.changes[_]);N._textEditChanges[_]=h})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(ee.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var N={uri:k.uri,version:k.version},_=this._textEditChanges[N.uri];if(!_){var h=[],$={textDocument:N,edits:h};this._workspaceEdit.documentChanges.push($),_=new L(h,this._changeAnnotations),this._textEditChanges[N.uri]=_}return _}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var _=this._textEditChanges[k];if(!_){var h=[];this._workspaceEdit.changes[k]=h,_=new L(h),this._textEditChanges[k]=_}return _}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,N,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||re.is(N)?h=N:_=N;var $,D;if(h===void 0?$=Ae.create(k,_):(D=re.is(h)?h:this._changeAnnotations.manage(h),$=Ae.create(k,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(k,N,_,h){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(_)||re.is(_)?$=_:h=_;var D,ae;if($===void 0?D=Ye.create(k,N,h):(ae=re.is($)?$:this._changeAnnotations.manage($),D=Ye.create(k,N,h,ae)),this._workspaceEdit.documentChanges.push(D),ae!==void 0)return ae},g.prototype.deleteFile=function(k,N,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||re.is(N)?h=N:_=N;var $,D;if(h===void 0?$=We.create(k,_):(D=re.is(h)?h:this._changeAnnotations.manage(h),$=We.create(k,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var oe;(function(g){function k(_){return{uri:_}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)}g.is=N})(oe=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var se;(function(g){function k(_,h){return{uri:_,version:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&w.integer(h.version)}g.is=N})(se=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ee;(function(g){function k(_,h){return{uri:_,version:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&(h.version===null||w.integer(h.version))}g.is=N})(ee=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var st;(function(g){function k(_,h,$,D){return{uri:_,languageId:h,version:$,text:D}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&w.string(h.languageId)&&w.integer(h.version)&&w.string(h.text)}g.is=N})(st=e.TextDocumentItem||(e.TextDocumentItem={}));var Xe;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(N){var _=N;return _===g.PlainText||_===g.Markdown}g.is=k})(Xe=e.MarkupKind||(e.MarkupKind={}));var Ct;(function(g){function k(N){var _=N;return w.objectLiteral(N)&&Xe.is(_.kind)&&w.string(_.value)}g.is=k})(Ct=e.MarkupContent||(e.MarkupContent={}));var en;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(en=e.CompletionItemKind||(e.CompletionItemKind={}));var Sr;(function(g){g.PlainText=1,g.Snippet=2})(Sr=e.InsertTextFormat||(e.InsertTextFormat={}));var io;(function(g){g.Deprecated=1})(io=e.CompletionItemTag||(e.CompletionItemTag={}));var ar;(function(g){function k(_,h,$){return{newText:_,insert:h,replace:$}}g.create=k;function N(_){var h=_;return h&&w.string(h.newText)&&s.is(h.insert)&&s.is(h.replace)}g.is=N})(ar=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var ao;(function(g){g.asIs=1,g.adjustIndentation=2})(ao=e.InsertTextMode||(e.InsertTextMode={}));var oo;(function(g){function k(N){var _=N;return _&&(w.string(_.detail)||_.detail===void 0)&&(w.string(_.description)||_.description===void 0)}g.is=k})(oo=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var so;(function(g){function k(N){return{label:N}}g.create=k})(so=e.CompletionItem||(e.CompletionItem={}));var nu;(function(g){function k(N,_){return{items:N||[],isIncomplete:!!_}}g.create=k})(nu=e.CompletionList||(e.CompletionList={}));var ct;(function(g){function k(_){return _.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function N(_){var h=_;return w.string(h)||w.objectLiteral(h)&&w.string(h.language)&&w.string(h.value)}g.is=N})(ct=e.MarkedString||(e.MarkedString={}));var si;(function(g){function k(N){var _=N;return!!_&&w.objectLiteral(_)&&(Ct.is(_.contents)||ct.is(_.contents)||w.typedArray(_.contents,ct.is))&&(N.range===void 0||s.is(N.range))}g.is=k})(si=e.Hover||(e.Hover={}));var iu;(function(g){function k(N,_){return _?{label:N,documentation:_}:{label:N}}g.create=k})(iu=e.ParameterInformation||(e.ParameterInformation={}));var Pn;(function(g){function k(N,_){for(var h=[],$=2;$<arguments.length;$++)h[$-2]=arguments[$];var D={label:N};return w.defined(_)&&(D.documentation=_),w.defined(h)?D.parameters=h:D.parameters=[],D}g.create=k})(Pn=e.SignatureInformation||(e.SignatureInformation={}));var Ra;(function(g){g.Text=1,g.Read=2,g.Write=3})(Ra=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var En;(function(g){function k(N,_){var h={range:N};return w.number(_)&&(h.kind=_),h}g.create=k})(En=e.DocumentHighlight||(e.DocumentHighlight={}));var Aa;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(Aa=e.SymbolKind||(e.SymbolKind={}));var Dr;(function(g){g.Deprecated=1})(Dr=e.SymbolTag||(e.SymbolTag={}));var tn;(function(g){function k(N,_,h,$,D){var ae={name:N,kind:_,location:{uri:$,range:h}};return D&&(ae.containerName=D),ae}g.create=k})(tn=e.SymbolInformation||(e.SymbolInformation={}));var uo;(function(g){function k(N,_,h,$){return $!==void 0?{name:N,kind:_,location:{uri:h,range:$}}:{name:N,kind:_,location:{uri:h}}}g.create=k})(uo=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var lo;(function(g){function k(_,h,$,D,ae,ut){var Ge={name:_,detail:h,kind:$,range:D,selectionRange:ae};return ut!==void 0&&(Ge.children=ut),Ge}g.create=k;function N(_){var h=_;return h&&w.string(h.name)&&w.number(h.kind)&&s.is(h.range)&&s.is(h.selectionRange)&&(h.detail===void 0||w.string(h.detail))&&(h.deprecated===void 0||w.boolean(h.deprecated))&&(h.children===void 0||Array.isArray(h.children))&&(h.tags===void 0||Array.isArray(h.tags))}g.is=N})(lo=e.DocumentSymbol||(e.DocumentSymbol={}));var br;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(br=e.CodeActionKind||(e.CodeActionKind={}));var kn;(function(g){g.Invoked=1,g.Automatic=2})(kn=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var $t;(function(g){function k(_,h,$){var D={diagnostics:_};return h!=null&&(D.only=h),$!=null&&(D.triggerKind=$),D}g.create=k;function N(_){var h=_;return w.defined(h)&&w.typedArray(h.diagnostics,S.is)&&(h.only===void 0||w.typedArray(h.only,w.string))&&(h.triggerKind===void 0||h.triggerKind===kn.Invoked||h.triggerKind===kn.Automatic)}g.is=N})($t=e.CodeActionContext||(e.CodeActionContext={}));var rn;(function(g){function k(_,h,$){var D={title:_},ae=!0;return typeof h=="string"?(ae=!1,D.kind=h):O.is(h)?D.command=h:D.edit=h,ae&&$!==void 0&&(D.kind=$),D}g.create=k;function N(_){var h=_;return h&&w.string(h.title)&&(h.diagnostics===void 0||w.typedArray(h.diagnostics,S.is))&&(h.kind===void 0||w.string(h.kind))&&(h.edit!==void 0||h.command!==void 0)&&(h.command===void 0||O.is(h.command))&&(h.isPreferred===void 0||w.boolean(h.isPreferred))&&(h.edit===void 0||q.is(h.edit))}g.is=N})(rn=e.CodeAction||(e.CodeAction={}));var nn;(function(g){function k(_,h){var $={range:_};return w.defined(h)&&($.data=h),$}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(h.range)&&(w.undefined(h.command)||O.is(h.command))}g.is=N})(nn=e.CodeLens||(e.CodeLens={}));var Nn;(function(g){function k(_,h){return{tabSize:_,insertSpaces:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.uinteger(h.tabSize)&&w.boolean(h.insertSpaces)}g.is=N})(Nn=e.FormattingOptions||(e.FormattingOptions={}));var C;(function(g){function k(_,h,$){return{range:_,target:h,data:$}}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(h.range)&&(w.undefined(h.target)||w.string(h.target))}g.is=N})(C=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function k(_,h){return{range:_,parent:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&(h.parent===void 0||g.is(h.parent))}g.is=N})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var xe;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&(_.resultId===void 0||typeof _.resultId=="string")&&Array.isArray(_.data)&&(_.data.length===0||typeof _.data[0]=="number")}g.is=k})(xe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(g){function k(_,h){return{range:_,text:h}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&w.string(h.text)}g.is=N})(Le=e.InlineValueText||(e.InlineValueText={}));var Je;(function(g){function k(_,h,$){return{range:_,variableName:h,caseSensitiveLookup:$}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&w.boolean(h.caseSensitiveLookup)&&(w.string(h.variableName)||h.variableName===void 0)}g.is=N})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var pt;(function(g){function k(_,h){return{range:_,expression:h}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&(w.string(h.expression)||h.expression===void 0)}g.is=N})(pt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ye;(function(g){function k(_,h){return{frameId:_,stoppedLocation:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(_.stoppedLocation)}g.is=N})(ye=e.InlineValueContext||(e.InlineValueContext={}));var je;(function(g){g.Type=1,g.Parameter=2;function k(N){return N===1||N===2}g.is=k})(je=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function k(_){return{value:_}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&(h.tooltip===void 0||w.string(h.tooltip)||Ct.is(h.tooltip))&&(h.location===void 0||u.is(h.location))&&(h.command===void 0||O.is(h.command))}g.is=N})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ft;(function(g){function k(_,h,$){var D={position:_,label:h};return $!==void 0&&(D.kind=$),D}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&o.is(h.position)&&(w.string(h.label)||w.typedArray(h.label,_e.is))&&(h.kind===void 0||je.is(h.kind))&&h.textEdits===void 0||w.typedArray(h.textEdits,F.is)&&(h.tooltip===void 0||w.string(h.tooltip)||Ct.is(h.tooltip))&&(h.paddingLeft===void 0||w.boolean(h.paddingLeft))&&(h.paddingRight===void 0||w.boolean(h.paddingRight))}g.is=N})(ft=e.InlayHint||(e.InlayHint={}));var Xt;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&n.is(_.uri)&&w.string(_.name)}g.is=k})(Xt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var ui;(function(g){function k($,D,ae,ut){return new wn($,D,ae,ut)}g.create=k;function N($){var D=$;return!!(w.defined(D)&&w.string(D.uri)&&(w.undefined(D.languageId)||w.string(D.languageId))&&w.uinteger(D.lineCount)&&w.func(D.getText)&&w.func(D.positionAt)&&w.func(D.offsetAt))}g.is=N;function _($,D){for(var ae=$.getText(),ut=h(D,function(co,Ml){var O_=co.range.start.line-Ml.range.start.line;return O_===0?co.range.start.character-Ml.range.start.character:O_}),Ge=ae.length,an=ut.length-1;an>=0;an--){var on=ut[an],li=$.offsetAt(on.range.start),ge=$.offsetAt(on.range.end);if(ge<=Ge)ae=ae.substring(0,li)+on.newText+ae.substring(ge,ae.length);else throw new Error("Overlapping edit");Ge=li}return ae}g.applyEdits=_;function h($,D){if($.length<=1)return $;var ae=$.length/2|0,ut=$.slice(0,ae),Ge=$.slice(ae);h(ut,D),h(Ge,D);for(var an=0,on=0,li=0;an<ut.length&&on<Ge.length;){var ge=D(ut[an],Ge[on]);ge<=0?$[li++]=ut[an++]:$[li++]=Ge[on++]}for(;an<ut.length;)$[li++]=ut[an++];for(;on<Ge.length;)$[li++]=Ge[on++];return $}})(ui=e.TextDocument||(e.TextDocument={}));var wn=function(){function g(k,N,_,h){this._uri=k,this._languageId=N,this._version=_,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var N=this.offsetAt(k.start),_=this.offsetAt(k.end);return this._content.substring(N,_)}return this._content},g.prototype.update=function(k,N){this._content=k.text,this._version=N,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],N=this._content,_=!0,h=0;h<N.length;h++){_&&(k.push(h),_=!1);var $=N.charAt(h);_=$==="\r"||$===`
`,$==="\r"&&h+1<N.length&&N.charAt(h+1)===`
`&&h++}_&&N.length>0&&k.push(N.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var N=this.getLineOffsets(),_=0,h=N.length;if(h===0)return o.create(0,k);for(;_<h;){var $=Math.floor((_+h)/2);N[$]>k?h=$:_=$+1}var D=_-1;return o.create(D,k-N[D])},g.prototype.offsetAt=function(k){var N=this.getLineOffsets();if(k.line>=N.length)return this._content.length;if(k.line<0)return 0;var _=N[k.line],h=k.line+1<N.length?N[k.line+1]:this._content.length;return Math.max(Math.min(_+k.character,h),_)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),w;(function(g){var k=Object.prototype.toString;function N(ge){return typeof ge<"u"}g.defined=N;function _(ge){return typeof ge>"u"}g.undefined=_;function h(ge){return ge===!0||ge===!1}g.boolean=h;function $(ge){return k.call(ge)==="[object String]"}g.string=$;function D(ge){return k.call(ge)==="[object Number]"}g.number=D;function ae(ge,co,Ml){return k.call(ge)==="[object Number]"&&co<=ge&&ge<=Ml}g.numberRange=ae;function ut(ge){return k.call(ge)==="[object Number]"&&-2147483648<=ge&&ge<=2147483647}g.integer=ut;function Ge(ge){return k.call(ge)==="[object Number]"&&0<=ge&&ge<=2147483647}g.uinteger=Ge;function an(ge){return k.call(ge)==="[object Function]"}g.func=an;function on(ge){return ge!==null&&typeof ge=="object"}g.objectLiteral=on;function li(ge,co){return Array.isArray(ge)&&ge.every(co)}g.typedArray=li})(w||(w={}))})});var at=d(sr=>{"use strict";Object.defineProperty(sr,"__esModule",{value:!0});sr.ProtocolNotificationType=sr.ProtocolNotificationType0=sr.ProtocolRequestType=sr.ProtocolRequestType0=sr.RegistrationType=sr.MessageDirection=void 0;var To=hi(),bq;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(bq=sr.MessageDirection||(sr.MessageDirection={}));var Xh=class{constructor(e){this.method=e}};sr.RegistrationType=Xh;var Jh=class extends To.RequestType0{constructor(e){super(e)}};sr.ProtocolRequestType0=Jh;var Qh=class extends To.RequestType{constructor(e){super(e,To.ParameterStructures.byName)}};sr.ProtocolRequestType=Qh;var Zh=class extends To.NotificationType0{constructor(e){super(e)}};sr.ProtocolNotificationType0=Zh;var em=class extends To.NotificationType{constructor(e){super(e,To.ParameterStructures.byName)}};sr.ProtocolNotificationType=em});var zl=d(ht=>{"use strict";Object.defineProperty(ht,"__esModule",{value:!0});ht.objectLiteral=ht.typedArray=ht.stringArray=ht.array=ht.func=ht.error=ht.number=ht.string=ht.boolean=void 0;function Cq(t){return t===!0||t===!1}ht.boolean=Cq;function nR(t){return typeof t=="string"||t instanceof String}ht.string=nR;function Pq(t){return typeof t=="number"||t instanceof Number}ht.number=Pq;function Eq(t){return t instanceof Error}ht.error=Eq;function kq(t){return typeof t=="function"}ht.func=kq;function iR(t){return Array.isArray(t)}ht.array=iR;function Nq(t){return iR(t)&&t.every(e=>nR(e))}ht.stringArray=Nq;function wq(t,e){return Array.isArray(t)&&t.every(e)}ht.typedArray=wq;function $q(t){return t!==null&&typeof t=="object"}ht.objectLiteral=$q});var oR=d(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.ImplementationRequest=void 0;var aR=at(),Oq;(function(t){t.method="textDocument/implementation",t.messageDirection=aR.MessageDirection.clientToServer,t.type=new aR.ProtocolRequestType(t.method)})(Oq=fu.ImplementationRequest||(fu.ImplementationRequest={}))});var uR=d(du=>{"use strict";Object.defineProperty(du,"__esModule",{value:!0});du.TypeDefinitionRequest=void 0;var sR=at(),Iq;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=sR.MessageDirection.clientToServer,t.type=new sR.ProtocolRequestType(t.method)})(Iq=du.TypeDefinitionRequest||(du.TypeDefinitionRequest={}))});var lR=d(Fi=>{"use strict";Object.defineProperty(Fi,"__esModule",{value:!0});Fi.DidChangeWorkspaceFoldersNotification=Fi.WorkspaceFoldersRequest=void 0;var Yl=at(),Dq;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Yl.MessageDirection.serverToClient,t.type=new Yl.ProtocolRequestType0(t.method)})(Dq=Fi.WorkspaceFoldersRequest||(Fi.WorkspaceFoldersRequest={}));var xq;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Yl.MessageDirection.clientToServer,t.type=new Yl.ProtocolNotificationType(t.method)})(xq=Fi.DidChangeWorkspaceFoldersNotification||(Fi.DidChangeWorkspaceFoldersNotification={}))});var fR=d(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.ConfigurationRequest=void 0;var cR=at(),Lq;(function(t){t.method="workspace/configuration",t.messageDirection=cR.MessageDirection.serverToClient,t.type=new cR.ProtocolRequestType(t.method)})(Lq=pu.ConfigurationRequest||(pu.ConfigurationRequest={}))});var dR=d(ji=>{"use strict";Object.defineProperty(ji,"__esModule",{value:!0});ji.ColorPresentationRequest=ji.DocumentColorRequest=void 0;var Xl=at(),qq;(function(t){t.method="textDocument/documentColor",t.messageDirection=Xl.MessageDirection.clientToServer,t.type=new Xl.ProtocolRequestType(t.method)})(qq=ji.DocumentColorRequest||(ji.DocumentColorRequest={}));var Mq;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Xl.MessageDirection.clientToServer,t.type=new Xl.ProtocolRequestType(t.method)})(Mq=ji.ColorPresentationRequest||(ji.ColorPresentationRequest={}))});var hR=d(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.FoldingRangeRequest=void 0;var pR=at(),Fq;(function(t){t.method="textDocument/foldingRange",t.messageDirection=pR.MessageDirection.clientToServer,t.type=new pR.ProtocolRequestType(t.method)})(Fq=hu.FoldingRangeRequest||(hu.FoldingRangeRequest={}))});var yR=d(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.DeclarationRequest=void 0;var mR=at(),jq;(function(t){t.method="textDocument/declaration",t.messageDirection=mR.MessageDirection.clientToServer,t.type=new mR.ProtocolRequestType(t.method)})(jq=mu.DeclarationRequest||(mu.DeclarationRequest={}))});var vR=d(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.SelectionRangeRequest=void 0;var gR=at(),Gq;(function(t){t.method="textDocument/selectionRange",t.messageDirection=gR.MessageDirection.clientToServer,t.type=new gR.ProtocolRequestType(t.method)})(Gq=yu.SelectionRangeRequest||(yu.SelectionRangeRequest={}))});var TR=d(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.WorkDoneProgressCancelNotification=ln.WorkDoneProgressCreateRequest=ln.WorkDoneProgress=void 0;var Uq=hi(),Jl=at(),Hq;(function(t){t.type=new Uq.ProgressType;function e(r){return r===t.type}t.is=e})(Hq=ln.WorkDoneProgress||(ln.WorkDoneProgress={}));var Kq;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Jl.MessageDirection.serverToClient,t.type=new Jl.ProtocolRequestType(t.method)})(Kq=ln.WorkDoneProgressCreateRequest||(ln.WorkDoneProgressCreateRequest={}));var Wq;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Jl.MessageDirection.clientToServer,t.type=new Jl.ProtocolNotificationType(t.method)})(Wq=ln.WorkDoneProgressCancelNotification||(ln.WorkDoneProgressCancelNotification={}))});var _R=d(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.CallHierarchyOutgoingCallsRequest=cn.CallHierarchyIncomingCallsRequest=cn.CallHierarchyPrepareRequest=void 0;var _o=at(),Bq;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=_o.MessageDirection.clientToServer,t.type=new _o.ProtocolRequestType(t.method)})(Bq=cn.CallHierarchyPrepareRequest||(cn.CallHierarchyPrepareRequest={}));var Vq;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=_o.MessageDirection.clientToServer,t.type=new _o.ProtocolRequestType(t.method)})(Vq=cn.CallHierarchyIncomingCallsRequest||(cn.CallHierarchyIncomingCallsRequest={}));var zq;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=_o.MessageDirection.clientToServer,t.type=new _o.ProtocolRequestType(t.method)})(zq=cn.CallHierarchyOutgoingCallsRequest||(cn.CallHierarchyOutgoingCallsRequest={}))});var RR=d(mt=>{"use strict";Object.defineProperty(mt,"__esModule",{value:!0});mt.SemanticTokensRefreshRequest=mt.SemanticTokensRangeRequest=mt.SemanticTokensDeltaRequest=mt.SemanticTokensRequest=mt.SemanticTokensRegistrationType=mt.TokenFormat=void 0;var mi=at(),Yq;(function(t){t.Relative="relative"})(Yq=mt.TokenFormat||(mt.TokenFormat={}));var Ql;(function(t){t.method="textDocument/semanticTokens",t.type=new mi.RegistrationType(t.method)})(Ql=mt.SemanticTokensRegistrationType||(mt.SemanticTokensRegistrationType={}));var Xq;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=mi.MessageDirection.clientToServer,t.type=new mi.ProtocolRequestType(t.method),t.registrationMethod=Ql.method})(Xq=mt.SemanticTokensRequest||(mt.SemanticTokensRequest={}));var Jq;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=mi.MessageDirection.clientToServer,t.type=new mi.ProtocolRequestType(t.method),t.registrationMethod=Ql.method})(Jq=mt.SemanticTokensDeltaRequest||(mt.SemanticTokensDeltaRequest={}));var Qq;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=mi.MessageDirection.clientToServer,t.type=new mi.ProtocolRequestType(t.method),t.registrationMethod=Ql.method})(Qq=mt.SemanticTokensRangeRequest||(mt.SemanticTokensRangeRequest={}));var Zq;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=mi.MessageDirection.clientToServer,t.type=new mi.ProtocolRequestType0(t.method)})(Zq=mt.SemanticTokensRefreshRequest||(mt.SemanticTokensRefreshRequest={}))});var SR=d(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.ShowDocumentRequest=void 0;var AR=at(),eM;(function(t){t.method="window/showDocument",t.messageDirection=AR.MessageDirection.serverToClient,t.type=new AR.ProtocolRequestType(t.method)})(eM=gu.ShowDocumentRequest||(gu.ShowDocumentRequest={}))});var CR=d(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.LinkedEditingRangeRequest=void 0;var bR=at(),tM;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=bR.MessageDirection.clientToServer,t.type=new bR.ProtocolRequestType(t.method)})(tM=vu.LinkedEditingRangeRequest||(vu.LinkedEditingRangeRequest={}))});var PR=d(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var xr=at(),rM;(function(t){t.file="file",t.folder="folder"})(rM=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var nM;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(nM=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var iM;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(iM=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var aM;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(aM=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var oM;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(oM=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var sM;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(sM=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var uM;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(uM=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var kR=d(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.MonikerRequest=fn.MonikerKind=fn.UniquenessLevel=void 0;var ER=at(),lM;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(lM=fn.UniquenessLevel||(fn.UniquenessLevel={}));var cM;(function(t){t.$import="import",t.$export="export",t.local="local"})(cM=fn.MonikerKind||(fn.MonikerKind={}));var fM;(function(t){t.method="textDocument/moniker",t.messageDirection=ER.MessageDirection.clientToServer,t.type=new ER.ProtocolRequestType(t.method)})(fM=fn.MonikerRequest||(fn.MonikerRequest={}))});var NR=d(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.TypeHierarchySubtypesRequest=dn.TypeHierarchySupertypesRequest=dn.TypeHierarchyPrepareRequest=void 0;var Ro=at(),dM;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Ro.MessageDirection.clientToServer,t.type=new Ro.ProtocolRequestType(t.method)})(dM=dn.TypeHierarchyPrepareRequest||(dn.TypeHierarchyPrepareRequest={}));var pM;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Ro.MessageDirection.clientToServer,t.type=new Ro.ProtocolRequestType(t.method)})(pM=dn.TypeHierarchySupertypesRequest||(dn.TypeHierarchySupertypesRequest={}));var hM;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Ro.MessageDirection.clientToServer,t.type=new Ro.ProtocolRequestType(t.method)})(hM=dn.TypeHierarchySubtypesRequest||(dn.TypeHierarchySubtypesRequest={}))});var wR=d(Gi=>{"use strict";Object.defineProperty(Gi,"__esModule",{value:!0});Gi.InlineValueRefreshRequest=Gi.InlineValueRequest=void 0;var Zl=at(),mM;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Zl.MessageDirection.clientToServer,t.type=new Zl.ProtocolRequestType(t.method)})(mM=Gi.InlineValueRequest||(Gi.InlineValueRequest={}));var yM;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Zl.MessageDirection.clientToServer,t.type=new Zl.ProtocolRequestType0(t.method)})(yM=Gi.InlineValueRefreshRequest||(Gi.InlineValueRefreshRequest={}))});var $R=d(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.InlayHintRefreshRequest=pn.InlayHintResolveRequest=pn.InlayHintRequest=void 0;var Ao=at(),gM;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Ao.MessageDirection.clientToServer,t.type=new Ao.ProtocolRequestType(t.method)})(gM=pn.InlayHintRequest||(pn.InlayHintRequest={}));var vM;(function(t){t.method="inlayHint/resolve",t.messageDirection=Ao.MessageDirection.clientToServer,t.type=new Ao.ProtocolRequestType(t.method)})(vM=pn.InlayHintResolveRequest||(pn.InlayHintResolveRequest={}));var TM;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Ao.MessageDirection.clientToServer,t.type=new Ao.ProtocolRequestType0(t.method)})(TM=pn.InlayHintRefreshRequest||(pn.InlayHintRefreshRequest={}))});var IR=d(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});Ut.DiagnosticRefreshRequest=Ut.WorkspaceDiagnosticRequest=Ut.DocumentDiagnosticRequest=Ut.DocumentDiagnosticReportKind=Ut.DiagnosticServerCancellationData=void 0;var OR=hi(),_M=zl(),So=at(),RM;(function(t){function e(r){let n=r;return n&&_M.boolean(n.retriggerRequest)}t.is=e})(RM=Ut.DiagnosticServerCancellationData||(Ut.DiagnosticServerCancellationData={}));var AM;(function(t){t.Full="full",t.Unchanged="unchanged"})(AM=Ut.DocumentDiagnosticReportKind||(Ut.DocumentDiagnosticReportKind={}));var SM;(function(t){t.method="textDocument/diagnostic",t.messageDirection=So.MessageDirection.clientToServer,t.type=new So.ProtocolRequestType(t.method),t.partialResult=new OR.ProgressType})(SM=Ut.DocumentDiagnosticRequest||(Ut.DocumentDiagnosticRequest={}));var bM;(function(t){t.method="workspace/diagnostic",t.messageDirection=So.MessageDirection.clientToServer,t.type=new So.ProtocolRequestType(t.method),t.partialResult=new OR.ProgressType})(bM=Ut.WorkspaceDiagnosticRequest||(Ut.WorkspaceDiagnosticRequest={}));var CM;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=So.MessageDirection.clientToServer,t.type=new So.ProtocolRequestType0(t.method)})(CM=Ut.DiagnosticRefreshRequest||(Ut.DiagnosticRefreshRequest={}))});var LR=d(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.DidCloseNotebookDocumentNotification=Se.DidSaveNotebookDocumentNotification=Se.DidChangeNotebookDocumentNotification=Se.NotebookCellArrayChange=Se.DidOpenNotebookDocumentNotification=Se.NotebookDocumentSyncRegistrationType=Se.NotebookDocument=Se.NotebookCell=Se.ExecutionSummary=Se.NotebookCellKind=void 0;var Tu=vo(),hn=zl(),$n=at(),DR;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(DR=Se.NotebookCellKind||(Se.NotebookCellKind={}));var xR;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return hn.objectLiteral(a)&&Tu.uinteger.is(a.executionOrder)&&(a.success===void 0||hn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(xR=Se.ExecutionSummary||(Se.ExecutionSummary={}));var tm;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return hn.objectLiteral(o)&&DR.is(o.kind)&&Tu.DocumentUri.is(o.document)&&(o.metadata===void 0||hn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!xR.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(hn.objectLiteral(a)&&hn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(a[m],o[m]))return!1}}return!0}})(tm=Se.NotebookCell||(Se.NotebookCell={}));var PM;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return hn.objectLiteral(i)&&hn.string(i.uri)&&Tu.integer.is(i.version)&&hn.typedArray(i.cells,tm.is)}t.is=r})(PM=Se.NotebookDocument||(Se.NotebookDocument={}));var _u;(function(t){t.method="notebookDocument/sync",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.RegistrationType(t.method)})(_u=Se.NotebookDocumentSyncRegistrationType||(Se.NotebookDocumentSyncRegistrationType={}));var EM;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=_u.method})(EM=Se.DidOpenNotebookDocumentNotification||(Se.DidOpenNotebookDocumentNotification={}));var kM;(function(t){function e(n){let i=n;return hn.objectLiteral(i)&&Tu.uinteger.is(i.start)&&Tu.uinteger.is(i.deleteCount)&&(i.cells===void 0||hn.typedArray(i.cells,tm.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(kM=Se.NotebookCellArrayChange||(Se.NotebookCellArrayChange={}));var NM;(function(t){t.method="notebookDocument/didChange",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=_u.method})(NM=Se.DidChangeNotebookDocumentNotification||(Se.DidChangeNotebookDocumentNotification={}));var wM;(function(t){t.method="notebookDocument/didSave",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=_u.method})(wM=Se.DidSaveNotebookDocumentNotification||(Se.DidSaveNotebookDocumentNotification={}));var $M;(function(t){t.method="notebookDocument/didClose",t.messageDirection=$n.MessageDirection.clientToServer,t.type=new $n.ProtocolNotificationType(t.method),t.registrationMethod=_u.method})($M=Se.DidCloseNotebookDocumentNotification||(Se.DidCloseNotebookDocumentNotification={}))});var WR=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=at(),qR=vo(),Ht=zl(),OM=oR();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return OM.ImplementationRequest}});var IM=uR();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return IM.TypeDefinitionRequest}});var MR=lR();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return MR.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return MR.DidChangeWorkspaceFoldersNotification}});var DM=fR();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return DM.ConfigurationRequest}});var FR=dR();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return FR.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return FR.ColorPresentationRequest}});var xM=hR();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return xM.FoldingRangeRequest}});var LM=yR();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return LM.DeclarationRequest}});var qM=vR();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return qM.SelectionRangeRequest}});var rm=TR();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return rm.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return rm.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return rm.WorkDoneProgressCancelNotification}});var nm=_R();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return nm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return nm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return nm.CallHierarchyPrepareRequest}});var bo=RR();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return bo.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return bo.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return bo.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return bo.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return bo.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return bo.SemanticTokensRegistrationType}});var MM=SR();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return MM.ShowDocumentRequest}});var FM=CR();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return FM.LinkedEditingRangeRequest}});var Ea=PR();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return Ea.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return Ea.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return Ea.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return Ea.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return Ea.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return Ea.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return Ea.WillDeleteFilesRequest}});var im=kR();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return im.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return im.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return im.MonikerRequest}});var am=NR();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return am.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return am.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return am.TypeHierarchySupertypesRequest}});var jR=wR();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return jR.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return jR.InlineValueRefreshRequest}});var om=$R();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return om.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return om.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return om.InlayHintRefreshRequest}});var Ru=IR();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Ru.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Ru.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Ru.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Ru.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Ru.DiagnosticRefreshRequest}});var On=LR();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return On.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return On.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return On.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return On.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return On.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return On.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return On.DidCloseNotebookDocumentNotification}});var GR;(function(t){function e(r){let n=r;return Ht.string(n.language)||Ht.string(n.scheme)||Ht.string(n.pattern)}t.is=e})(GR=T.TextDocumentFilter||(T.TextDocumentFilter={}));var UR;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(Ht.string(n.notebookType)||Ht.string(n.scheme)||Ht.string(n.pattern))}t.is=e})(UR=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var HR;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(Ht.string(n.notebook)||UR.is(n.notebook))&&(n.language===void 0||Ht.string(n.language))}t.is=e})(HR=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var KR;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Ht.string(n)&&!GR.is(n)&&!HR.is(n))return!1;return!0}t.is=e})(KR=T.DocumentSelector||(T.DocumentSelector={}));var jM;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(jM=T.RegistrationRequest||(T.RegistrationRequest={}));var GM;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(GM=T.UnregistrationRequest||(T.UnregistrationRequest={}));var UM;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(UM=T.ResourceOperationKind||(T.ResourceOperationKind={}));var HM;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(HM=T.FailureHandlingKind||(T.FailureHandlingKind={}));var KM;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(KM=T.PositionEncodingKind||(T.PositionEncodingKind={}));var WM;(function(t){function e(r){let n=r;return n&&Ht.string(n.id)&&n.id.length>0}t.hasId=e})(WM=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var BM;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||KR.is(n.documentSelector))}t.is=e})(BM=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var VM;(function(t){function e(n){let i=n;return Ht.objectLiteral(i)&&(i.workDoneProgress===void 0||Ht.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Ht.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(VM=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var zM;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(zM=T.InitializeRequest||(T.InitializeRequest={}));var YM;(function(t){t.unknownProtocolVersion=1})(YM=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var XM;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(XM=T.InitializedNotification||(T.InitializedNotification={}));var JM;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(JM=T.ShutdownRequest||(T.ShutdownRequest={}));var QM;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(QM=T.ExitNotification||(T.ExitNotification={}));var ZM;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(ZM=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var eF;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(eF=T.MessageType||(T.MessageType={}));var tF;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(tF=T.ShowMessageNotification||(T.ShowMessageNotification={}));var rF;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(rF=T.ShowMessageRequest||(T.ShowMessageRequest={}));var nF;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(nF=T.LogMessageNotification||(T.LogMessageNotification={}));var iF;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(iF=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var aF;(function(t){t.None=0,t.Full=1,t.Incremental=2})(aF=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var oF;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(oF=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var sF;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(sF=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var uF;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(uF=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var lF;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(lF=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var cF;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(cF=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var fF;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(fF=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var dF;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(dF=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var pF;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(pF=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var hF;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(hF=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var mF;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(mF=T.FileChangeType||(T.FileChangeType={}));var yF;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(qR.URI.is(n.baseUri)||qR.WorkspaceFolder.is(n.baseUri))&&Ht.string(n.pattern)}t.is=e})(yF=T.RelativePattern||(T.RelativePattern={}));var gF;(function(t){t.Create=1,t.Change=2,t.Delete=4})(gF=T.WatchKind||(T.WatchKind={}));var vF;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(vF=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var TF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(TF=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var _F;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(_F=T.CompletionRequest||(T.CompletionRequest={}));var RF;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(RF=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var AF;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(AF=T.HoverRequest||(T.HoverRequest={}));var SF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(SF=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var bF;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(bF=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var CF;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(CF=T.DefinitionRequest||(T.DefinitionRequest={}));var PF;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(PF=T.ReferencesRequest||(T.ReferencesRequest={}));var EF;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(EF=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var kF;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(kF=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var NF;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(NF=T.CodeActionRequest||(T.CodeActionRequest={}));var wF;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(wF=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var $F;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})($F=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var OF;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(OF=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var IF;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(IF=T.CodeLensRequest||(T.CodeLensRequest={}));var DF;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(DF=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var xF;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(xF=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var LF;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LF=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var qF;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(qF=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var MF;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(MF=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var FF;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(FF=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var jF;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(jF=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var GF;(function(t){t.Identifier=1})(GF=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var UF;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(UF=T.RenameRequest||(T.RenameRequest={}));var HF;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(HF=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var KF;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(KF=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var WF;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(WF=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var VR=d(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.createProtocolConnection=void 0;var BR=hi();function BF(t,e,r,n){return BR.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,BR.createMessageConnection)(t,e,r,n)}ec.createProtocolConnection=BF});var zR=d(ur=>{"use strict";var VF=ur&&ur.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),tc=ur&&ur.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&VF(e,t,r)};Object.defineProperty(ur,"__esModule",{value:!0});ur.LSPErrorCodes=ur.createProtocolConnection=void 0;tc(hi(),ur);tc(vo(),ur);tc(at(),ur);tc(WR(),ur);var zF=VR();Object.defineProperty(ur,"createProtocolConnection",{enumerable:!0,get:function(){return zF.createProtocolConnection}});var YF;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(YF=ur.LSPErrorCodes||(ur.LSPErrorCodes={}))});var yt=d(In=>{"use strict";var XF=In&&In.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),YR=In&&In.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&XF(e,t,r)};Object.defineProperty(In,"__esModule",{value:!0});In.createProtocolConnection=void 0;var JF=Yh();YR(Yh(),In);YR(zR(),In);function QF(t,e,r,n){return(0,JF.createMessageConnection)(t,e,r,n)}In.createProtocolConnection=QF});var um=d(Ui=>{"use strict";Object.defineProperty(Ui,"__esModule",{value:!0});Ui.SemanticTokensBuilder=Ui.SemanticTokensDiff=Ui.SemanticTokensFeature=void 0;var rc=yt(),ZF=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(rc.SemanticTokensRefreshRequest.type),on:e=>{let r=rc.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=rc.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=rc.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ui.SemanticTokensFeature=ZF;var nc=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ui.SemanticTokensDiff=nc;var sm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new nc(this._prevData,this._data).computeDiff()}:this.build()}};Ui.SemanticTokensBuilder=sm});var cm=d(ic=>{"use strict";Object.defineProperty(ic,"__esModule",{value:!0});ic.TextDocuments=void 0;var ka=yt(),lm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new ka.Emitter,this._onDidOpen=new ka.Emitter,this._onDidClose=new ka.Emitter,this._onDidSave=new ka.Emitter,this._onWillSave=new ka.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=ka.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),ka.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};ic.TextDocuments=lm});var dm=d(Co=>{"use strict";Object.defineProperty(Co,"__esModule",{value:!0});Co.NotebookDocuments=Co.NotebookSyncFeature=void 0;var Lr=yt(),XR=cm(),ej=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Lr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Lr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Lr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Lr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Co.NotebookSyncFeature=ej;var Hi=class{onDidOpenTextDocument(e){return this.openHandler=e,Lr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Lr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Lr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return Hi.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return Hi.NULL_DISPOSE}onDidSaveTextDocument(){return Hi.NULL_DISPOSE}};Hi.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var fm=class{constructor(e){e instanceof XR.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new XR.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Lr.Emitter,this._onDidChange=new Lr.Emitter,this._onDidSave=new Lr.Emitter,this._onDidClose=new Lr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Hi,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],m=[];if(u.cells!==void 0){let E=u.cells;if(E.structure!==void 0){let b=E.structure.array;if(a.cells.splice(b.start,b.deleteCount,...b.cells!==void 0?b.cells:[]),E.structure.didOpen!==void 0)for(let S of E.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(E.structure.didClose)for(let S of E.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(E.data!==void 0){let b=new Map(E.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=b.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(f.push({old:F[0],new:O}),b.delete(O.document),b.size===0)break}}}if(E.textContent!==void 0)for(let b of E.textContent)r.changeTextDocument({textDocument:b.document,contentChanges:b.changes}),m.push(b.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let E of l)y.push(this.getNotebookCell(E));let R=[];for(let E of c)R.push(this.getNotebookCell(E));let P=[];for(let E of m)P.push(this.getNotebookCell(E));(y.length>0||R.length>0||f.length>0||P.length>0)&&(v.cells={added:y,removed:R,changed:{data:f,textContent:P}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),Lr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Co.NotebookDocuments=fm});var pm=d(gt=>{"use strict";Object.defineProperty(gt,"__esModule",{value:!0});gt.thenable=gt.typedArray=gt.stringArray=gt.array=gt.func=gt.error=gt.number=gt.string=gt.boolean=void 0;function tj(t){return t===!0||t===!1}gt.boolean=tj;function JR(t){return typeof t=="string"||t instanceof String}gt.string=JR;function rj(t){return typeof t=="number"||t instanceof Number}gt.number=rj;function nj(t){return t instanceof Error}gt.error=nj;function QR(t){return typeof t=="function"}gt.func=QR;function ZR(t){return Array.isArray(t)}gt.array=ZR;function ij(t){return ZR(t)&&t.every(e=>JR(e))}gt.stringArray=ij;function aj(t,e){return Array.isArray(t)&&t.every(e)}gt.typedArray=aj;function oj(t){return t&&QR(t.then)}gt.thenable=oj});var hm=d(qr=>{"use strict";Object.defineProperty(qr,"__esModule",{value:!0});qr.generateUuid=qr.parse=qr.isUUID=qr.v4=qr.empty=void 0;var Au=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},ue=class extends Au{constructor(){super([ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-","4",ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._oneOf(ue._timeHighBits),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return ue._oneOf(ue._chars)}};ue._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];ue._timeHighBits=["8","9","a","b"];qr.empty=new Au("00000000-0000-0000-0000-000000000000");function eA(){return new ue}qr.v4=eA;var sj=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function tA(t){return sj.test(t)}qr.isUUID=tA;function uj(t){if(!tA(t))throw new Error("invalid uuid");return new Au(t)}qr.parse=uj;function lj(){return eA().asHex()}qr.generateUuid=lj});var rA=d(Wi=>{"use strict";Object.defineProperty(Wi,"__esModule",{value:!0});Wi.attachPartialResult=Wi.ProgressFeature=Wi.attachWorkDone=void 0;var Ki=yt(),cj=hm(),Dn=class{constructor(e,r){this._connection=e,this._token=r,Dn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Ki.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Ki.WorkDoneProgress.type,this._token,n)}done(){Dn.Instances.delete(this._token),this._connection.sendProgress(Ki.WorkDoneProgress.type,this._token,{kind:"end"})}};Dn.Instances=new Map;var ac=class extends Dn{constructor(e,r){super(e,r),this._source=new Ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Su=class{constructor(){}begin(){}report(){}done(){}},oc=class extends Su{constructor(){super(),this._source=new Ki.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function fj(t,e){if(e===void 0||e.workDoneToken===void 0)return new Su;let r=e.workDoneToken;return delete e.workDoneToken,new Dn(t,r)}Wi.attachWorkDone=fj;var dj=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Ki.WorkDoneProgressCancelNotification.type,r=>{let n=Dn.Instances.get(r.token);(n instanceof ac||n instanceof oc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Su:new Dn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,cj.generateUuid)();return this.connection.sendRequest(Ki.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new ac(this.connection,e))}else return Promise.resolve(new oc)}};Wi.ProgressFeature=dj;var mm;(function(t){t.type=new Ki.ProgressType})(mm||(mm={}));var ym=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(mm.type,this._token,e)}};function pj(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new ym(t,r)}Wi.attachPartialResult=pj});var nA=d(sc=>{"use strict";Object.defineProperty(sc,"__esModule",{value:!0});sc.ConfigurationFeature=void 0;var hj=yt(),mj=pm(),yj=t=>class extends t{getConfiguration(e){return e?mj.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(hj.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};sc.ConfigurationFeature=yj});var iA=d(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.WorkspaceFoldersFeature=void 0;var uc=yt(),gj=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new uc.Emitter,this.connection.onNotification(uc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(uc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(uc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};lc.WorkspaceFoldersFeature=gj});var aA=d(cc=>{"use strict";Object.defineProperty(cc,"__esModule",{value:!0});cc.CallHierarchyFeature=void 0;var gm=yt(),vj=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(gm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=gm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=gm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};cc.CallHierarchyFeature=vj});var oA=d(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.ShowDocumentFeature=void 0;var Tj=yt(),_j=t=>class extends t{showDocument(e){return this.connection.sendRequest(Tj.ShowDocumentRequest.type,e)}};fc.ShowDocumentFeature=_j});var sA=d(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.FileOperationsFeature=void 0;var Po=yt(),Rj=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Po.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Po.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Po.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Po.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Po.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Po.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};dc.FileOperationsFeature=Rj});var uA=d(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.LinkedEditingRangeFeature=void 0;var Aj=yt(),Sj=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(Aj.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};pc.LinkedEditingRangeFeature=Sj});var lA=d(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.TypeHierarchyFeature=void 0;var vm=yt(),bj=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(vm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=vm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=vm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};hc.TypeHierarchyFeature=bj});var fA=d(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.InlineValueFeature=void 0;var cA=yt(),Cj=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(cA.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(cA.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};mc.InlineValueFeature=Cj});var dA=d(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.InlayHintFeature=void 0;var Tm=yt(),Pj=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Tm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Tm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Tm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};yc.InlayHintFeature=Pj});var pA=d(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.DiagnosticFeature=void 0;var bu=yt(),Ej=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(bu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(bu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(bu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(bu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(bu.WorkspaceDiagnosticRequest.partialResult,r)))}}};gc.DiagnosticFeature=Ej});var hA=d(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.MonikerFeature=void 0;var kj=yt(),Nj=t=>class extends t{get moniker(){return{on:e=>{let r=kj.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};vc.MonikerFeature=Nj});var EA=d(ve=>{"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.createConnection=ve.combineFeatures=ve.combineNotebooksFeatures=ve.combineLanguagesFeatures=ve.combineWorkspaceFeatures=ve.combineWindowFeatures=ve.combineClientFeatures=ve.combineTracerFeatures=ve.combineTelemetryFeatures=ve.combineConsoleFeatures=ve._NotebooksImpl=ve._LanguagesImpl=ve.BulkUnregistration=ve.BulkRegistration=ve.ErrorMessageTracker=void 0;var H=yt(),Mr=pm(),Rm=hm(),ie=rA(),wj=nA(),$j=iA(),Oj=aA(),Ij=um(),Dj=oA(),xj=sA(),Lj=uA(),qj=lA(),Mj=fA(),Fj=dA(),jj=pA(),Gj=dm(),Uj=hA();function _m(t){if(t!==null)return t}var Am=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ve.ErrorMessageTracker=Am;var Tc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},Sm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(_m)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(_m)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(_m)}},mA=(0,Dj.ShowDocumentFeature)((0,ie.ProgressFeature)(Sm)),Hj;(function(t){function e(){return new _c}t.create=e})(Hj=ve.BulkRegistration||(ve.BulkRegistration={}));var _c=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Mr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Rm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},Kj;(function(t){function e(){return new Cu(void 0,[])}t.create=e})(Kj=ve.BulkUnregistration||(ve.BulkUnregistration={}));var Cu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Mr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Rc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof _c?this.registerMany(e):e instanceof Cu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Mr.string(r)?r:r.method,a=Rm.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Mr.string(e)?e:e.method,i=Rm.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new Cu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},bm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},yA=(0,xj.FileOperationsFeature)((0,$j.WorkspaceFoldersFeature)((0,wj.ConfigurationFeature)(bm))),Ac=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},Sc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},bc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._LanguagesImpl=bc;var gA=(0,Uj.MonikerFeature)((0,jj.DiagnosticFeature)((0,Fj.InlayHintFeature)((0,Mj.InlineValueFeature)((0,qj.TypeHierarchyFeature)((0,Lj.LinkedEditingRangeFeature)((0,Ij.SemanticTokensFeature)((0,Oj.CallHierarchyFeature)(bc)))))))),Cc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._NotebooksImpl=Cc;var vA=(0,Gj.NotebookSyncFeature)(Cc);function TA(t,e){return function(r){return e(t(r))}}ve.combineConsoleFeatures=TA;function _A(t,e){return function(r){return e(t(r))}}ve.combineTelemetryFeatures=_A;function RA(t,e){return function(r){return e(t(r))}}ve.combineTracerFeatures=RA;function AA(t,e){return function(r){return e(t(r))}}ve.combineClientFeatures=AA;function SA(t,e){return function(r){return e(t(r))}}ve.combineWindowFeatures=SA;function bA(t,e){return function(r){return e(t(r))}}ve.combineWorkspaceFeatures=bA;function CA(t,e){return function(r){return e(t(r))}}ve.combineLanguagesFeatures=CA;function PA(t,e){return function(r){return e(t(r))}}ve.combineNotebooksFeatures=PA;function Wj(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,TA),tracer:r(t.tracer,e.tracer,RA),telemetry:r(t.telemetry,e.telemetry,_A),client:r(t.client,e.client,AA),window:r(t.window,e.window,SA),workspace:r(t.workspace,e.workspace,bA),languages:r(t.languages,e.languages,CA),notebooks:r(t.notebooks,e.notebooks,PA)}}ve.combineFeatures=Wj;function Bj(t,e,r){let n=r&&r.console?new(r.console(Tc)):new Tc,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(Ac)):new Ac,o=r&&r.telemetry?new(r.telemetry(Sc)):new Sc,s=r&&r.client?new(r.client(Rc)):new Rc,u=r&&r.window?new(r.window(mA)):new mA,l=r&&r.workspace?new(r.workspace(yA)):new yA,c=r&&r.languages?new(r.languages(gA)):new gA,f=r&&r.notebooks?new(r.notebooks(vA)):new vA,m=[n,a,o,s,u,l,c,f];function v(b){return b instanceof Promise?b:Mr.thenable(b)?new Promise((S,O)=>{b.then(F=>S(F),F=>O(F))}):Promise.resolve(b)}let y,R,P,E={listen:()=>i.listen(),sendRequest:(b,...S)=>i.sendRequest(Mr.string(b)?b:b.method,...S),onRequest:(b,S)=>i.onRequest(b,S),sendNotification:(b,S)=>{let O=Mr.string(b)?b:b.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(b,S)=>i.onNotification(b,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:b=>(R=b,{dispose:()=>{R=void 0}}),onInitialized:b=>i.onNotification(H.InitializedNotification.type,b),onShutdown:b=>(y=b,{dispose:()=>{y=void 0}}),onExit:b=>(P=b,{dispose:()=>{P=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:b=>i.onNotification(H.DidChangeConfigurationNotification.type,b),onDidChangeWatchedFiles:b=>i.onNotification(H.DidChangeWatchedFilesNotification.type,b),__textDocumentSync:void 0,onDidOpenTextDocument:b=>i.onNotification(H.DidOpenTextDocumentNotification.type,b),onDidChangeTextDocument:b=>i.onNotification(H.DidChangeTextDocumentNotification.type,b),onDidCloseTextDocument:b=>i.onNotification(H.DidCloseTextDocumentNotification.type,b),onWillSaveTextDocument:b=>i.onNotification(H.WillSaveTextDocumentNotification.type,b),onWillSaveTextDocumentWaitUntil:b=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,b),onDidSaveTextDocument:b=>i.onNotification(H.DidSaveTextDocumentNotification.type,b),sendDiagnostics:b=>i.sendNotification(H.PublishDiagnosticsNotification.type,b),onHover:b=>i.onRequest(H.HoverRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onCompletion:b=>i.onRequest(H.CompletionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCompletionResolve:b=>i.onRequest(H.CompletionResolveRequest.type,b),onSignatureHelp:b=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDeclaration:b=>i.onRequest(H.DeclarationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDefinition:b=>i.onRequest(H.DefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onTypeDefinition:b=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onImplementation:b=>i.onRequest(H.ImplementationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onReferences:b=>i.onRequest(H.ReferencesRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentHighlight:b=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentSymbol:b=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbol:b=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:b=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,b),onCodeAction:b=>i.onRequest(H.CodeActionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeActionResolve:b=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>b(S,O)),onCodeLens:b=>i.onRequest(H.CodeLensRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeLensResolve:b=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>b(S,O)),onDocumentFormatting:b=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:b=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:b=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>b(S,O)),onRenameRequest:b=>i.onRequest(H.RenameRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onPrepareRename:b=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>b(S,O)),onDocumentLinks:b=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentLinkResolve:b=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>b(S,O)),onDocumentColor:b=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onColorPresentation:b=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onFoldingRanges:b=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onSelectionRanges:b=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onExecuteCommand:b=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let b of m)b.attach(E);return i.onRequest(H.InitializeRequest.type,b=>{e.initialize(b),Mr.string(b.trace)&&(a.trace=H.Trace.fromString(b.trace));for(let S of m)S.initialize(b.capabilities);if(R){let S=R(b,new H.CancellationTokenSource().token,(0,ie.attachWorkDone)(i,b),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Mr.number(E.__textDocumentSync)?E.__textDocumentSync:H.TextDocumentSyncKind.None:!Mr.number(W.textDocumentSync)&&!Mr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Mr.number(E.__textDocumentSync)?E.__textDocumentSync:H.TextDocumentSyncKind.None);for(let re of m)re.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of m)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{P&&P()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,b=>{a.trace=H.Trace.fromString(b.value)}),E}ve.createConnection=Bj});var Cm=d(Kt=>{"use strict";var Vj=Kt&&Kt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),kA=Kt&&Kt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Vj(e,t,r)};Object.defineProperty(Kt,"__esModule",{value:!0});Kt.ProposedFeatures=Kt.NotebookDocuments=Kt.TextDocuments=Kt.SemanticTokensBuilder=void 0;var zj=um();Object.defineProperty(Kt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return zj.SemanticTokensBuilder}});kA(yt(),Kt);var Yj=cm();Object.defineProperty(Kt,"TextDocuments",{enumerable:!0,get:function(){return Yj.TextDocuments}});var Xj=dm();Object.defineProperty(Kt,"NotebookDocuments",{enumerable:!0,get:function(){return Xj.NotebookDocuments}});kA(EA(),Kt);var Jj;(function(t){t.all={__brand:"features"}})(Jj=Kt.ProposedFeatures||(Kt.ProposedFeatures={}))});var wA=d((ede,NA)=>{"use strict";NA.exports=yt()});var qe=d(xn=>{"use strict";var Qj=xn&&xn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),OA=xn&&xn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Qj(e,t,r)};Object.defineProperty(xn,"__esModule",{value:!0});xn.createConnection=void 0;var Pc=Cm();OA(wA(),xn);OA(Cm(),xn);var $A=!1,Zj={initialize:t=>{},get shutdownReceived(){return $A},set shutdownReceived(t){$A=t},exit:t=>{}};function eG(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Pc.ConnectionStrategy.is(t)||Pc.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,Pc.createProtocolConnection)(a,o,l,s);return(0,Pc.createConnection)(u,Zj,i)}xn.createConnection=eG});var Pm=d((kc,Ec)=>{var tG=kc&&kc.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof Ec=="object"&&typeof Ec.exports=="object"){var e=t(Fl,kc);e!==void 0&&(Ec.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,m){this._uri=l,this._languageId=c,this._version=f,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,m=l;f<m.length;f++){var v=m[f];if(u.isIncremental(v)){var y=o(v.range),R=this.offsetAt(y.start),P=this.offsetAt(y.end);this._content=this._content.substring(0,R)+v.text+this._content.substring(P,this._content.length);var E=Math.max(y.start.line,0),b=Math.max(y.end.line,0),S=this._lineOffsets,O=a(v.text,!1,R);if(b-E===O.length)for(var F=0,W=O.length;F<W;F++)S[F+E+1]=O[F];else O.length<1e4?S.splice.apply(S,tG([E+1,b-E],O,!1)):this._lineOffsets=S=S.slice(0,E+1).concat(O,S.slice(b+1));var re=v.text.length-(P-R);if(re!==0)for(var F=E+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+re}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,m=c.length;if(m===0)return{line:0,character:l};for(;f<m;){var v=Math.floor((f+m)/2);c[v]>l?m=v:f=v+1}var y=f-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],m=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,m),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(m,v,y,R){return new r(m,v,y,R)}u.create=l;function c(m,v,y){if(m instanceof r)return m.update(v,y),m;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(m,v){for(var y=m.getText(),R=i(v.map(s),function(W,re){var Ne=W.range.start.line-re.range.start.line;return Ne===0?W.range.start.character-re.range.start.character:Ne}),P=0,E=[],b=0,S=R;b<S.length;b++){var O=S[b],F=m.offsetAt(O.range.start);if(F<P)throw new Error("Overlapping edit");F>P&&E.push(y.substring(P,F)),O.newText.length&&E.push(O.newText),P=m.offsetAt(O.range.end)}return E.push(y.substr(P)),E.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),m=u.slice(c);i(f,l),i(m,l);for(var v=0,y=0,R=0;v<f.length&&y<m.length;){var P=l(f[v],m[y]);P<=0?u[R++]=f[v++]:u[R++]=m[y++]}for(;v<f.length;)u[R++]=f[v++];for(;y<m.length;)u[R++]=m[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],m=0;m<u.length;m++){var v=u.charCodeAt(m);(v===13||v===10)&&(v===13&&m+1<u.length&&u.charCodeAt(m+1)===10&&m++,f.push(c+m+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var hr=d(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.isRootCstNode=It.isLeafCstNode=It.isCompositeCstNode=It.AbstractAstReflection=It.isLinkingError=It.isAstNodeDescription=It.isReference=It.isAstNode=void 0;function km(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}It.isAstNode=km;function IA(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}It.isReference=IA;function rG(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}It.isAstNodeDescription=rG;function nG(t){return typeof t=="object"&&t!==null&&km(t.container)&&IA(t.reference)&&typeof t.message=="string"}It.isLinkingError=nG;var Em=class{constructor(){this.subtypes={}}isInstance(e,r){return km(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};It.AbstractAstReflection=Em;function DA(t){return typeof t=="object"&&t!==null&&"children"in t}It.isCompositeCstNode=DA;function iG(t){return typeof t=="object"&&t!==null&&"tokenType"in t}It.isLeafCstNode=iG;function aG(t){return DA(t)&&"fullText"in t}It.isRootCstNode=aG});var Dt=d(He=>{"use strict";Object.defineProperty(He,"__esModule",{value:!0});He.Reduction=He.TreeStreamImpl=He.stream=He.DONE_RESULT=He.EMPTY_STREAM=He.StreamImpl=void 0;var Wt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Wt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return He.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=oG(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Wt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?He.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Wt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return He.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Wt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if(Nc(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return He.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Wt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if(Nc(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return He.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Wt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Wt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?He.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};He.StreamImpl=Wt;function oG(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Nc(t){return!!t&&typeof t[Symbol.iterator]=="function"}He.EMPTY_STREAM=new Wt(()=>{},()=>He.DONE_RESULT);He.DONE_RESULT=Object.freeze({done:!0,value:void 0});function sG(...t){if(t.length===1){let e=t[0];if(e instanceof Wt)return e;if(Nc(e))return new Wt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Wt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:He.DONE_RESULT)}return t.length>1?new Wt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Nc(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return He.DONE_RESULT}):He.EMPTY_STREAM}He.stream=sG;var Nm=class extends Wt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return He.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};He.TreeStreamImpl=Nm;var uG;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(uG=He.Reduction||(He.Reduction={}))});var Qe=d(Pe=>{"use strict";Object.defineProperty(Pe,"__esModule",{value:!0});Pe.getInteriorNodes=Pe.getStartlineNode=Pe.getNextNode=Pe.getPreviousNode=Pe.findLeafNodeAtOffset=Pe.isCommentNode=Pe.findCommentNode=Pe.findDeclarationNodeAtOffset=Pe.DefaultNameRegexp=Pe.toDocumentSegment=Pe.tokenToRange=Pe.isCstChildNode=Pe.flattenCst=Pe.streamCst=void 0;var Eo=hr(),lG=Dt();function LA(t){return new lG.TreeStreamImpl(t,e=>(0,Eo.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}Pe.streamCst=LA;function cG(t){return LA(t).filter(Eo.isLeafCstNode)}Pe.flattenCst=cG;function fG(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}Pe.isCstChildNode=fG;function dG(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}Pe.tokenToRange=dG;function pG(t){let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}Pe.toDocumentSegment=pG;Pe.DefaultNameRegexp=/^[\w\p{L}]$/u;function hG(t,e,r=Pe.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return $m(t,e)}}Pe.findDeclarationNodeAtOffset=hG;function mG(t,e){if(t){let r=qA(t,!0);if(r&&wm(r,e))return r;if((0,Eo.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(wm(a,e))return a}}}}Pe.findCommentNode=mG;function wm(t,e){return(0,Eo.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}Pe.isCommentNode=wm;function $m(t,e){if((0,Eo.isLeafCstNode)(t))return t;if((0,Eo.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<=n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return $m(a,e)}}}Pe.findLeafNodeAtOffset=$m;function qA(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getPreviousNode=qA;function yG(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getNextNode=yG;function gG(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}Pe.getStartlineNode=gG;function vG(t,e){let r=TG(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}Pe.getInteriorNodes=vG;function TG(t,e){let r=xA(t),n=xA(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function xA(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var Ln=d((Pu,Om)=>{(function(t,e){if(typeof Pu=="object"&&typeof Om=="object")Om.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof Pu=="object"?Pu:t)[n]=r[n]}})(Pu,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",m=0,v=-1,y=0,R=0;R<=u.length;++R){if(R<u.length)c=u.charCodeAt(R);else{if(c===47)break;c=47}if(c===47){if(!(v===R-1||y===1))if(v!==R-1&&y===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var P=f.lastIndexOf("/");if(P!==f.length-1){P===-1?(f="",m=0):m=(f=f.slice(0,P)).length-1-f.lastIndexOf("/"),v=R,y=0;continue}}else if(f.length===2||f.length===1){f="",m=0,v=R,y=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+u.slice(v+1,R):f=u.slice(v+1,R),m=R-v-1;v=R,y=0}else c===46&&y!==-1?++y:y=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(u===void 0&&(u=process.cwd()),m=u),a(m),m.length!==0&&(l=m+"/"+l,c=m.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,m=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,R=m<y?m:y,P=-1,E=0;E<=R;++E){if(E===R){if(y>R){if(l.charCodeAt(v+E)===47)return l.slice(v+E+1);if(E===0)return l.slice(v+E)}else m>R&&(u.charCodeAt(c+E)===47?P=E:E===0&&(P=0));break}var b=u.charCodeAt(c+E);if(b!==l.charCodeAt(v+E))break;b===47&&(P=E)}var S="";for(E=c+P+1;E<=f;++E)E!==f&&u.charCodeAt(E)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+P):(v+=P,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,m=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!m){f=v;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,m=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,R=-1;for(c=u.length-1;c>=0;--c){var P=u.charCodeAt(c);if(P===47){if(!v){f=c+1;break}}else R===-1&&(v=!1,R=c+1),y>=0&&(P===l.charCodeAt(y)?--y==-1&&(m=c):(y=-1,m=R))}return f===m?m=R:m===-1&&(m=u.length),u.slice(f,m)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else m===-1&&(v=!1,m=c+1);return m===-1?"":u.slice(f,m)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,m=!0,v=0,y=u.length-1;y>=0;--y){var R=u.charCodeAt(y);if(R!==47)f===-1&&(m=!1,f=y+1),R===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!m){c=y+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),m=f===47;m?(l.root="/",c=1):c=0;for(var v=-1,y=0,R=-1,P=!0,E=u.length-1,b=0;E>=c;--E)if((f=u.charCodeAt(E))!==47)R===-1&&(P=!1,R=E+1),f===46?v===-1?v=E:b!==1&&(b=1):v!==-1&&(b=-1);else if(!P){y=E+1;break}return v===-1||R===-1||b===0||b===1&&v===R-1&&v===y+1?R!==-1&&(l.base=l.name=y===0&&m?u.slice(1,R):u.slice(y,R)):(y===0&&m?(l.name=u.slice(1,v),l.base=u.slice(1,R)):(l.name=u.slice(y,v),l.base=u.slice(y,R)),l.ext=u.slice(v,R)),y>0?l.dir=u.slice(0,y-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var oe in B)Object.prototype.hasOwnProperty.call(B,oe)&&(j[oe]=B[oe])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,m=/^\//,v=/^\/\//;function y(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!f.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!m.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var R="",P="/",E=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,b=function(){function q(L,j,B,oe,se,ee){ee===void 0&&(ee=!1),typeof L=="object"?(this.scheme=L.scheme||R,this.authority=L.authority||R,this.path=L.path||R,this.query=L.query||R,this.fragment=L.fragment||R):(this.scheme=function(st,Xe){return st||Xe?st:"file"}(L,ee),this.authority=j||R,this.path=function(st,Xe){switch(st){case"https":case"http":case"file":Xe?Xe[0]!==P&&(Xe=P+Xe):Xe=P}return Xe}(this.scheme,B||R),this.query=oe||R,this.fragment=se||R,y(this,ee))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return Ne(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,oe=L.path,se=L.query,ee=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=R),B===void 0?B=this.authority:B===null&&(B=R),oe===void 0?oe=this.path:oe===null&&(oe=R),se===void 0?se=this.query:se===null&&(se=R),ee===void 0?ee=this.fragment:ee===null&&(ee=R),j===this.scheme&&B===this.authority&&oe===this.path&&se===this.query&&ee===this.fragment?this:new O(j,B,oe,se,ee)},q.parse=function(L,j){j===void 0&&(j=!1);var B=E.exec(L);return B?new O(B[2]||R,We(B[4]||R),We(B[5]||R),We(B[7]||R),We(B[9]||R),j):new O(R,R,R,R,R)},q.file=function(L){var j=R;if(c.isWindows&&(L=L.replace(/\\/g,P)),L[0]===P&&L[1]===P){var B=L.indexOf(P,2);B===-1?(j=L.substring(2),L=P):(j=L.substring(2,B),L=L.substring(B)||P)}return new O("file",j,L,R,R)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return y(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),V(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=b;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=Ne(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?V(this,!0):(this._formatted||(this._formatted=V(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(b),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,oe=-1,se=0;se<q.length;se++){var ee=q.charCodeAt(se);if(ee>=97&&ee<=122||ee>=65&&ee<=90||ee>=48&&ee<=57||ee===45||ee===46||ee===95||ee===126||L&&ee===47||j&&ee===91||j&&ee===93||j&&ee===58)oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B!==void 0&&(B+=q.charAt(se));else{B===void 0&&(B=q.substr(0,se));var st=F[ee];st!==void 0?(oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B+=st):oe===-1&&(oe=se)}}return oe!==-1&&(B+=encodeURIComponent(q.substring(oe))),B!==void 0?B:q}function re(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function Ne(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function V(q,L){var j=L?re:W,B="",oe=q.scheme,se=q.authority,ee=q.path,st=q.query,Xe=q.fragment;if(oe&&(B+=oe,B+=":"),(se||oe==="file")&&(B+=P,B+=P),se){var Ct=se.indexOf("@");if(Ct!==-1){var en=se.substr(0,Ct);se=se.substr(Ct+1),(Ct=en.lastIndexOf(":"))===-1?B+=j(en,!1,!1):(B+=j(en.substr(0,Ct),!1,!1),B+=":",B+=j(en.substr(Ct+1),!1,!0)),B+="@"}(Ct=(se=se.toLowerCase()).lastIndexOf(":"))===-1?B+=j(se,!1,!0):(B+=j(se.substr(0,Ct),!1,!0),B+=se.substr(Ct))}if(ee){if(ee.length>=3&&ee.charCodeAt(0)===47&&ee.charCodeAt(2)===58)(Sr=ee.charCodeAt(1))>=65&&Sr<=90&&(ee="/".concat(String.fromCharCode(Sr+32),":").concat(ee.substr(3)));else if(ee.length>=2&&ee.charCodeAt(1)===58){var Sr;(Sr=ee.charCodeAt(0))>=65&&Sr<=90&&(ee="".concat(String.fromCharCode(Sr+32),":").concat(ee.substr(2)))}B+=j(ee,!0,!1)}return st&&(B+="?",B+=j(st,!1,!1)),Xe&&(B+="#",B+=L?Xe:W(Xe,!1,!1)),B}function Ae(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Ae(q.substr(3)):q}}a.uriToFsPath=Ne;var Ye=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function We(q){return q.match(Ye)?q.replace(Ye,function(L){return Ae(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(m,v,y){if(y||arguments.length===2)for(var R,P=0,E=v.length;P<E;P++)!R&&P in v||(R||(R=Array.prototype.slice.call(v,0,P)),R[P]=v[P]);return m.concat(R||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return m.with({path:c.join.apply(c,s([m.path],v,!1))})},u.resolvePath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var R=m.path,P=!1;R[0]!==f&&(R=f+R,P=!0);var E=c.resolve.apply(c,s([R],v,!1));return P&&E[0]===f&&!m.authority&&(E=E.substring(1)),m.with({path:E})},u.dirname=function(m){if(m.path.length===0||m.path===f)return m;var v=c.dirname(m.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),m.with({path:v})},u.basename=function(m){return c.basename(m.path)},u.extname=function(m){return c.extname(m.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var Eu=d(ko=>{"use strict";Object.defineProperty(ko,"__esModule",{value:!0});ko.eagerLoad=ko.inject=void 0;function _G(t,e,r,n){let i=[t,e,r,n].reduce(UA,{});return GA(i)}ko.inject=_G;var Im=Symbol("isProxy");function jA(t){if(t&&t[Im])for(let e of Object.values(t))jA(e);return t}ko.eagerLoad=jA;function GA(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>FA(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(FA(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Im]});return r[Im]=!0,r}var MA=Symbol();function FA(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===MA)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=MA;try{t[e]=typeof i=="function"?i(n):GA(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function UA(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=UA(i,n):t[r]=n}}return t}});var Pr=d(wc=>{"use strict";Object.defineProperty(wc,"__esModule",{value:!0});wc.MultiMap=void 0;var No=Dt(),Dm=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return No.Reduction.sum((0,No.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,No.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,No.stream)(this.map.keys())}values(){return(0,No.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,No.stream)(this.map.entries())}};wc.MultiMap=Dm});var $e=d(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.isCharacterRange=A.CharacterRange=A.isAssignment=A.Assignment=A.isAlternatives=A.Alternatives=A.isAction=A.Action=A.isTypeAttribute=A.TypeAttribute=A.isType=A.Type=A.isTerminalRule=A.TerminalRule=A.isReturnType=A.ReturnType=A.isParserRule=A.ParserRule=A.isParameterReference=A.ParameterReference=A.isParameter=A.Parameter=A.isNegation=A.Negation=A.isNamedArgument=A.NamedArgument=A.isLiteralCondition=A.LiteralCondition=A.isInterface=A.Interface=A.isInferredType=A.InferredType=A.isGrammarImport=A.GrammarImport=A.isGrammar=A.Grammar=A.isDisjunction=A.Disjunction=A.isConjunction=A.Conjunction=A.isAtomType=A.AtomType=A.isAbstractElement=A.AbstractElement=A.isCondition=A.Condition=A.isAbstractType=A.AbstractType=A.isAbstractRule=A.AbstractRule=void 0;A.reflection=A.LangiumGrammarAstReflection=A.isWildcard=A.Wildcard=A.isUntilToken=A.UntilToken=A.isUnorderedGroup=A.UnorderedGroup=A.isTerminalRuleCall=A.TerminalRuleCall=A.isTerminalGroup=A.TerminalGroup=A.isTerminalAlternatives=A.TerminalAlternatives=A.isRuleCall=A.RuleCall=A.isRegexToken=A.RegexToken=A.isNegatedToken=A.NegatedToken=A.isKeyword=A.Keyword=A.isGroup=A.Group=A.isCrossReference=A.CrossReference=void 0;var RG=hr();A.AbstractRule="AbstractRule";function AG(t){return A.reflection.isInstance(t,A.AbstractRule)}A.isAbstractRule=AG;A.AbstractType="AbstractType";function SG(t){return A.reflection.isInstance(t,A.AbstractType)}A.isAbstractType=SG;A.Condition="Condition";function bG(t){return A.reflection.isInstance(t,A.Condition)}A.isCondition=bG;A.AbstractElement="AbstractElement";function CG(t){return A.reflection.isInstance(t,A.AbstractElement)}A.isAbstractElement=CG;A.AtomType="AtomType";function PG(t){return A.reflection.isInstance(t,A.AtomType)}A.isAtomType=PG;A.Conjunction="Conjunction";function EG(t){return A.reflection.isInstance(t,A.Conjunction)}A.isConjunction=EG;A.Disjunction="Disjunction";function kG(t){return A.reflection.isInstance(t,A.Disjunction)}A.isDisjunction=kG;A.Grammar="Grammar";function NG(t){return A.reflection.isInstance(t,A.Grammar)}A.isGrammar=NG;A.GrammarImport="GrammarImport";function wG(t){return A.reflection.isInstance(t,A.GrammarImport)}A.isGrammarImport=wG;A.InferredType="InferredType";function $G(t){return A.reflection.isInstance(t,A.InferredType)}A.isInferredType=$G;A.Interface="Interface";function OG(t){return A.reflection.isInstance(t,A.Interface)}A.isInterface=OG;A.LiteralCondition="LiteralCondition";function IG(t){return A.reflection.isInstance(t,A.LiteralCondition)}A.isLiteralCondition=IG;A.NamedArgument="NamedArgument";function DG(t){return A.reflection.isInstance(t,A.NamedArgument)}A.isNamedArgument=DG;A.Negation="Negation";function xG(t){return A.reflection.isInstance(t,A.Negation)}A.isNegation=xG;A.Parameter="Parameter";function LG(t){return A.reflection.isInstance(t,A.Parameter)}A.isParameter=LG;A.ParameterReference="ParameterReference";function qG(t){return A.reflection.isInstance(t,A.ParameterReference)}A.isParameterReference=qG;A.ParserRule="ParserRule";function MG(t){return A.reflection.isInstance(t,A.ParserRule)}A.isParserRule=MG;A.ReturnType="ReturnType";function FG(t){return A.reflection.isInstance(t,A.ReturnType)}A.isReturnType=FG;A.TerminalRule="TerminalRule";function jG(t){return A.reflection.isInstance(t,A.TerminalRule)}A.isTerminalRule=jG;A.Type="Type";function GG(t){return A.reflection.isInstance(t,A.Type)}A.isType=GG;A.TypeAttribute="TypeAttribute";function UG(t){return A.reflection.isInstance(t,A.TypeAttribute)}A.isTypeAttribute=UG;A.Action="Action";function HG(t){return A.reflection.isInstance(t,A.Action)}A.isAction=HG;A.Alternatives="Alternatives";function KG(t){return A.reflection.isInstance(t,A.Alternatives)}A.isAlternatives=KG;A.Assignment="Assignment";function WG(t){return A.reflection.isInstance(t,A.Assignment)}A.isAssignment=WG;A.CharacterRange="CharacterRange";function BG(t){return A.reflection.isInstance(t,A.CharacterRange)}A.isCharacterRange=BG;A.CrossReference="CrossReference";function VG(t){return A.reflection.isInstance(t,A.CrossReference)}A.isCrossReference=VG;A.Group="Group";function zG(t){return A.reflection.isInstance(t,A.Group)}A.isGroup=zG;A.Keyword="Keyword";function YG(t){return A.reflection.isInstance(t,A.Keyword)}A.isKeyword=YG;A.NegatedToken="NegatedToken";function XG(t){return A.reflection.isInstance(t,A.NegatedToken)}A.isNegatedToken=XG;A.RegexToken="RegexToken";function JG(t){return A.reflection.isInstance(t,A.RegexToken)}A.isRegexToken=JG;A.RuleCall="RuleCall";function QG(t){return A.reflection.isInstance(t,A.RuleCall)}A.isRuleCall=QG;A.TerminalAlternatives="TerminalAlternatives";function ZG(t){return A.reflection.isInstance(t,A.TerminalAlternatives)}A.isTerminalAlternatives=ZG;A.TerminalGroup="TerminalGroup";function e2(t){return A.reflection.isInstance(t,A.TerminalGroup)}A.isTerminalGroup=e2;A.TerminalRuleCall="TerminalRuleCall";function t2(t){return A.reflection.isInstance(t,A.TerminalRuleCall)}A.isTerminalRuleCall=t2;A.UnorderedGroup="UnorderedGroup";function r2(t){return A.reflection.isInstance(t,A.UnorderedGroup)}A.isUnorderedGroup=r2;A.UntilToken="UntilToken";function n2(t){return A.reflection.isInstance(t,A.UntilToken)}A.isUntilToken=n2;A.Wildcard="Wildcard";function i2(t){return A.reflection.isInstance(t,A.Wildcard)}A.isWildcard=i2;var $c=class extends RG.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","Assignment","AtomType","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","RegexToken","ReturnType","RuleCall","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case A.Conjunction:case A.Disjunction:case A.LiteralCondition:case A.Negation:case A.ParameterReference:return this.isSubtype(A.Condition,r);case A.Interface:case A.Type:return this.isSubtype(A.AbstractType,r);case A.ParserRule:return this.isSubtype(A.AbstractRule,r)||this.isSubtype(A.AbstractType,r);case A.TerminalRule:return this.isSubtype(A.AbstractRule,r);case A.Action:return this.isSubtype(A.AbstractElement,r)||this.isSubtype(A.AbstractType,r);case A.Alternatives:case A.Assignment:case A.CharacterRange:case A.CrossReference:case A.Group:case A.Keyword:case A.NegatedToken:case A.RegexToken:case A.RuleCall:case A.TerminalAlternatives:case A.TerminalGroup:case A.TerminalRuleCall:case A.UnorderedGroup:case A.UntilToken:case A.Wildcard:return this.isSubtype(A.AbstractElement,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"AtomType:refType":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":return A.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return A.AbstractRule;case"Grammar:usedGrammars":return A.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return A.Parameter;case"TerminalRuleCall:rule":return A.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"AtomType":return{name:"AtomType",mandatory:[{name:"isArray",type:"boolean"},{name:"isRef",type:"boolean"}]};case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"Type":return{name:"Type",mandatory:[{name:"typeAlternatives",type:"array"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"},{name:"typeAlternatives",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};A.LangiumGrammarAstReflection=$c;A.reflection=new $c});var yi=d(vt=>{"use strict";Object.defineProperty(vt,"__esModule",{value:!0});vt.addSubTypes=vt.sortInterfacesTopologically=vt.mergeTypesAndInterfaces=vt.mergeInterfaces=vt.comparePropertyType=vt.collectSuperTypes=vt.collectChildrenTypes=vt.distinctAndSorted=vt.collectAllProperties=void 0;var a2=Pr(),Na=$e();function o2(t){let e=new a2.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.printingSuperTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}vt.collectAllProperties=o2;function xm(t,e){return Array.from(new Set(t)).sort(e)}vt.distinctAndSorted=xm;function HA(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,Na.isInterface)(u)?(i.add(u),HA(u,e,r,n).forEach(c=>i.add(c))):u&&(0,Na.isType)(u.$container)&&i.add(u.$container)}),i}vt.collectChildrenTypes=HA;function Lm(t){let e=new Set;return(0,Na.isInterface)(t)?(e.add(t),t.superTypes.forEach(r=>{if((0,Na.isInterface)(r.ref)){e.add(r.ref);let n=Lm(r.ref);for(let i of n)e.add(i)}})):(0,Na.isType)(t)&&t.typeAlternatives.forEach(r=>{var n;if(!((n=r.refType)===null||n===void 0)&&n.ref&&((0,Na.isInterface)(r.refType.ref)||(0,Na.isType)(r.refType.ref))){let i=Lm(r.refType.ref);for(let a of i)e.add(a)}}),e}vt.collectSuperTypes=Lm;function s2(t,e){return t.array===e.array&&t.reference===e.reference&&u2(t.types,e.types)}vt.comparePropertyType=s2;function u2(t,e,r=(n,i)=>n===i){let n=xm(t),i=xm(e);return n.length!==i.length?!1:i.every((a,o)=>r(a,n[o]))}function l2(t,e){return t.interfaces.concat(e.interfaces)}vt.mergeInterfaces=l2;function c2(t){return t.interfaces.concat(t.unions)}vt.mergeTypesAndInterfaces=c2;function f2(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.realSuperTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}vt.sortInterfacesTopologically=f2;function d2(t){var e;for(let r of t.values())for(let n of r.realSuperTypes)(e=t.get(n))===null||e===void 0||e.subTypes.add(r.name)}vt.addSubTypes=d2});var Mm=d(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.processGeneratorNode=void 0;var ku=wo(),qm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}append(e){e.length>0&&this.lines[this.currentLineNumber].push(e)}increaseIndent(e){this.currentIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([])}};function p2(t,e){let r=new qm(e);return KA(t,r),r.content}Oc.processGeneratorNode=p2;function KA(t,e){typeof t=="string"?h2(t,e):t instanceof ku.IndentNode?m2(t,e):t instanceof ku.CompositeGeneratorNode?VA(t,e):t instanceof ku.NewLineNode&&y2(t,e)}function WA(t,e){return typeof t=="string"?zA(t):t instanceof ku.CompositeGeneratorNode?t.contents.some(r=>WA(r,e)):t instanceof ku.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function h2(t,e){t&&(e.pendingIndent&&BA(e,!1),e.append(t))}function BA(t,e){var r;let n="";for(let i of t.currentIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n),t.pendingIndent=!1}function VA(t,e){for(let r of t.contents)KA(r,e)}function m2(t,e){var r;if(WA(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation);try{e.increaseIndent(t),VA(t,e)}finally{e.decreaseIndent()}}}function y2(t,e){t.ifNotEmpty&&!zA(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&BA(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function zA(t){return t.trimStart()!==""}});var wo=d(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.NLEmpty=Ze.NL=Ze.NewLineNode=Ze.IndentNode=Ze.CompositeGeneratorNode=Ze.toString=Ze.isNewLineNode=Ze.isGeneratorNode=Ze.EOL=void 0;var g2=Mm();Ze.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function YA(t){return t instanceof Nu||t instanceof wu||t instanceof wa}Ze.isGeneratorNode=YA;function v2(t){return t instanceof wa}Ze.isNewLineNode=v2;function T2(t,e){return YA(t)?(0,g2.processGeneratorNode)(t,e):String(t)}Ze.toString=T2;var Nu=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,r){return e?this.append(...r):this}appendNewLine(){return this.append(Ze.NL)}appendNewLineIf(e){return e?this.append(Ze.NL):this}appendNewLineIfNotEmpty(){return this.append(Ze.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}indent(e,r){let n=new wu(r,!1);return this.contents.push(n),e&&e(n),this}};Ze.CompositeGeneratorNode=Nu;var wu=class extends Nu{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Ze.IndentNode=wu;var wa=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Ze.EOL,this.ifNotEmpty=r}};Ze.NewLineNode=wa;Ze.NL=new wa;Ze.NLEmpty=new wa(void 0,!0)});var Bi=d(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.propertyTypesToString=mr.TypeResolutionError=mr.InterfaceType=mr.UnionType=mr.isInterfaceType=mr.isUnionType=void 0;var Tt=wo(),Ic=Mm(),_2=Pr(),$o=yi();function R2(t){return t&&"alternatives"in t}mr.isUnionType=R2;function A2(t){return t&&"properties"in t}mr.isInterfaceType=A2;var Fm=class{constructor(e,r,n){var i;this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.name=e,this.alternatives=r,this.reflection=(i=n?.reflection)!==null&&i!==void 0?i:!1}toAstTypesString(){let e=new Tt.CompositeGeneratorNode;return e.append(`export type ${this.name} = ${Dc(this.alternatives,"AstType")};`,Tt.NL),this.reflection&&(e.append(Tt.NL),JA(e,this.name)),(0,Ic.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode;return r.append(`type ${Um(this.name,e)} = ${Dc(this.alternatives,"DeclaredType")};`,Tt.NL),(0,Ic.processGeneratorNode)(r)}};mr.UnionType=Fm;var jm=class{constructor(e,r,n){this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.printingSuperTypes=[],this.superProperties=new _2.MultiMap,this.name=e,this.realSuperTypes=new Set(r),this.printingSuperTypes=[...r],this.properties=n,n.forEach(i=>this.superProperties.add(i.name,i))}toAstTypesString(){let e=new Tt.CompositeGeneratorNode,r=this.printingSuperTypes.length>0?(0,$o.distinctAndSorted)([...this.printingSuperTypes]):["AstNode"];return e.append(`export interface ${this.name} extends ${r.join(", ")} {`,Tt.NL),e.indent(n=>{this.containerTypes.size>0&&n.append(`readonly $container: ${(0,$o.distinctAndSorted)([...this.containerTypes]).join(" | ")};`,Tt.NL),this.typeTypes.size>0&&n.append(`readonly $type: ${(0,$o.distinctAndSorted)([...this.typeTypes]).map(i=>`'${i}'`).join(" | ")};`,Tt.NL),XA(n,this.properties,"AstType")}),e.append("}",Tt.NL),e.append(Tt.NL),JA(e,this.name),(0,Ic.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode,n=Um(this.name,e),i=Array.from(this.printingSuperTypes).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,Tt.NL),r.indent(a=>XA(a,this.properties,"DeclaredType",e)),r.append("}",Tt.NL),(0,Ic.processGeneratorNode)(r)}};mr.InterfaceType=jm;var Gm=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};mr.TypeResolutionError=Gm;function Dc(t,e="AstType"){function r(n){let i=(0,$o.distinctAndSorted)(n.types).join(" | ");return i=n.reference?e==="AstType"?`Reference<${i}>`:`@${i}`:i,i=n.array?e==="AstType"?`Array<${i}>`:`${i}[]`:i,i}return(0,$o.distinctAndSorted)(t.map(r)).join(" | ")}mr.propertyTypesToString=Dc;function XA(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:Um(a.name,n),s=a.optional&&!a.typeAlternatives.some(l=>l.array)&&!a.typeAlternatives.every(l=>l.types.length===1&&l.types[0]==="boolean"),u=Dc(a.typeAlternatives,r);return`${o}${s?"?":""}: ${u}`}(0,$o.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),Tt.NL))}function JA(t,e){t.append(`export const ${e} = '${e}';`,Tt.NL),t.append(Tt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,Tt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,Tt.NL)),t.append("}",Tt.NL)}function Um(t,e){return e.has(t)?`^${t}`:t}});var Io=d(Oo=>{"use strict";Object.defineProperty(Oo,"__esModule",{value:!0});Oo.DefaultNameProvider=Oo.isNamed=void 0;var S2=Et();function QA(t){return typeof t.name=="string"}Oo.isNamed=QA;var Hm=class{getName(e){if(QA(e))return e.name}getNameNode(e){return(0,S2.findNodeForProperty)(e.$cstNode,"name")}};Oo.DefaultNameProvider=Hm});var Ie=d(et=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.copyAstNode=et.findLocalReferences=et.streamReferences=et.streamAst=et.streamAllContents=et.streamContents=et.findRootNode=et.getDocument=et.hasContainerOfType=et.getContainerOfType=et.linkContentToContainer=void 0;var qn=hr(),$a=Dt();function ZA(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,qn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,qn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}et.linkContentToContainer=ZA;function b2(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}et.getContainerOfType=b2;function C2(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}et.hasContainerOfType=C2;function eS(t){let r=tS(t).$document;if(!r)throw new Error("AST node has no document.");return r}et.getDocument=eS;function tS(t){for(;t.$container;)t=t.$container;return t}et.findRootNode=tS;function Wm(t){if(!t)throw new Error("Node must be an AstNode.");return new $a.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,qn.isAstNode)(n))return e.keyIndex++,{done:!1,value:n};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,qn.isAstNode)(a))return{done:!1,value:a}}e.arrayIndex=0}}e.keyIndex++}return $a.DONE_RESULT})}et.streamContents=Wm;function P2(t){if(!t)throw new Error("Root node must be an AstNode.");return new $a.TreeStreamImpl(t,e=>Wm(e))}et.streamAllContents=P2;function rS(t){if(!t)throw new Error("Root node must be an AstNode.");return new $a.TreeStreamImpl(t,e=>Wm(e),{includeRoot:!0})}et.streamAst=rS;function nS(t){return new $a.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,qn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,qn.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return $a.DONE_RESULT})}et.streamReferences=nS;function E2(t,e=eS(t).parseResult.value){let r=[];return rS(e).forEach(n=>{nS(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,$a.stream)(r)}et.findLocalReferences=E2;function Km(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,qn.isAstNode)(i))r[n]=Km(i,e);else if((0,qn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,qn.isAstNode)(o)?a.push(Km(o,e)):(0,qn.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return ZA(r),r}et.copyAstNode=Km});var $u=d((iS,xc)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof xc=="object"&&xc.exports?xc.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:iS,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var R=this.disjunction();this.consumeChar("/");for(var P={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(P,"global");break;case"i":o(P,"ignoreCase");break;case"m":o(P,"multiLine");break;case"u":o(P,"unicode");break;case"y":o(P,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:P,value:R,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],R=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(R)}},t.prototype.alternative=function(){for(var y=[],R=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(R)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var R;switch(this.popChar()){case"=":R="Lookahead";break;case"!":R="NegativeLookahead";break}s(R);var P=this.disjunction();return this.consumeChar(")"),{type:R,value:P,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var R,P=this.idx;switch(this.popChar()){case"*":R={atLeast:0,atMost:1/0};break;case"+":R={atLeast:1,atMost:1/0};break;case"?":R={atLeast:0,atMost:1};break;case"{":var E=this.integerIncludingZero();switch(this.popChar()){case"}":R={atLeast:E,atMost:E};break;case",":var b;this.isDigit()?(b=this.integerIncludingZero(),R={atLeast:E,atMost:b}):R={atLeast:E,atMost:1/0},this.consumeChar("}");break}if(y===!0&&R===void 0)return;s(R);break}if(!(y===!0&&R===void 0))return s(R),this.peekChar(0)==="?"?(this.consumeChar("?"),R.greedy=!1):R.greedy=!0,R.type="Quantifier",R.loc=this.loc(P),R},t.prototype.atom=function(){var y,R=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(R),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,R=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,R=!0;break;case"s":y=m;break;case"S":y=m,R=!0;break;case"w":y=f;break;case"W":y=f,R=!0;break}return s(y),{type:"Set",value:y,complement:R}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var R=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:R}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],R=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),R=!0);this.isClassAtom();){var P=this.classAtom(),E=P.type==="Character";if(E&&this.isRangeDash()){this.consumeChar("-");var b=this.classAtom(),S=b.type==="Character";if(S){if(b.value<P.value)throw Error("Range out of order in character class");y.push({from:P.value,to:b.value})}else a(P.value,y),y.push(i("-")),a(b.value,y)}else a(P.value,y)}return this.consumeChar("]"),{type:"Set",complement:R,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var R=this.disjunction();this.consumeChar(")");var P={type:"Group",capturing:y,value:R};return y&&(P.idx=this.groupIdx),P},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var R="",P=0;P<y;P++){var E=this.popChar();if(e.test(E)===!1)throw Error("Expecting a HexDecimal digits");R+=E}var b=parseInt(R,16);return{type:"Character",value:b}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,R){y.length!==void 0?y.forEach(function(P){R.push(P)}):R.push(y)}function o(y,R){if(y[R]===!0)throw"duplicate flag "+R;y[R]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var m=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var R in y){var P=y[R];y.hasOwnProperty(R)&&(P.type!==void 0?this.visit(P):Array.isArray(P)&&P.forEach(function(E){this.visit(E)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var Do=d(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});Zt.partialRegex=Zt.partialMatches=Zt.getCaseInsensitivePattern=Zt.escapeRegExp=Zt.isWhitespaceRegExp=Zt.isMultilineComment=Zt.getTerminalParts=void 0;var aS=$u(),oS=new aS.RegExpParser,Bm=class extends aS.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Vm(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}},Oa=new Bm;function k2(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=oS.pattern(t),r=[];for(let n of e.value.value)Oa.reset(t),Oa.visit(n),r.push({start:Oa.startRegex,end:Oa.endRegex});return r}catch{return[]}}Zt.getTerminalParts=k2;function N2(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Oa.reset(t),Oa.visit(oS.pattern(t)),Oa.multiline}catch{return!1}}Zt.isMultilineComment=N2;function w2(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}Zt.isWhitespaceRegExp=w2;function Vm(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}Zt.escapeRegExp=Vm;function $2(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Vm(e)).join("")}Zt.getCaseInsensitivePattern=$2;function O2(t,e){let r=sS(t),n=e.match(r);return!!n&&n[0].length>0}Zt.partialMatches=O2;function sS(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}Zt.partialRegex=sS});var kt=d(le=>{"use strict";var I2=le&&le.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),D2=le&&le.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),x2=le&&le.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&I2(e,t,r);return D2(e,t),e};Object.defineProperty(le,"__esModule",{value:!0});le.isPrimitiveType=le.extractAssignments=le.resolveTransitiveImports=le.resolveImport=le.resolveImportUri=le.terminalRegex=le.getRuleType=le.getActionType=le.getExplicitRuleType=le.getTypeNameWithoutError=le.getTypeName=le.getActionAtElement=le.isDataTypeRule=le.isArrayOperator=le.isArrayCardinality=le.isOptionalCardinality=void 0;var be=x2($e()),uS=Ln(),Lc=Ie(),L2=Bi(),q2=Do();function M2(t){return t==="?"||t==="*"}le.isOptionalCardinality=M2;function F2(t){return t==="*"||t==="+"}le.isArrayCardinality=F2;function j2(t){return t==="+="}le.isArrayOperator=j2;function Xm(t){return lS(t,new Set)}le.isDataTypeRule=Xm;function lS(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,Lc.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!lS(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function cS(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(be.isAction(a))return a;{let o=(0,Lc.streamAllContents)(r[i]).find(be.isAction);if(o)return o}}}if(be.isAbstractElement(e))return cS(e)}le.getActionAtElement=cS;function Jm(t){var e;if(be.isParserRule(t))return Xm(t)?t.name:(e=Qm(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=fS(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new L2.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}le.getTypeName=Jm;function G2(t){try{return Jm(t)}catch{return"never"}}le.getTypeNameWithoutError=G2;function Qm(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}le.getExplicitRuleType=Qm;function fS(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Jm(t.type.ref)}le.getActionType=fS;function U2(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Xm(t)?t.name:(n=Qm(t))!==null&&n!==void 0?n:t.name}le.getRuleType=U2;function dS(t){return Ou(t.definition)}le.terminalRegex=dS;var Zm=/[\s\S]/.source;function Ou(t){if(be.isTerminalAlternatives(t))return H2(t);if(be.isTerminalGroup(t))return K2(t);if(be.isCharacterRange(t))return V2(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return gi(dS(e),t.cardinality)}else{if(be.isNegatedToken(t))return B2(t);if(be.isUntilToken(t))return W2(t);if(be.isRegexToken(t))return gi(t.regex,t.cardinality,!1);if(be.isWildcard(t))return gi(Zm,t.cardinality);throw new Error("Invalid terminal element.")}}function H2(t){return gi(t.elements.map(Ou).join("|"),t.cardinality)}function K2(t){return gi(t.elements.map(Ou).join(""),t.cardinality)}function W2(t){return gi(`${Zm}*?${Ou(t.terminal)}`,t.cardinality)}function B2(t){return gi(`(?!${Ou(t.terminal)})${Zm}*?`,t.cardinality)}function V2(t){return t.right?gi(`[${zm(t.left)}-${zm(t.right)}]`,t.cardinality,!1):gi(zm(t.left),t.cardinality,!1)}function zm(t){return(0,q2.escapeRegExp)(t.value)}function gi(t,e,r=!0){return r&&(t=`(${t})`),e?`${t}${e}`:t}function pS(t){if(t.path===void 0||t.path.length===0)return;let e=uS.Utils.dirname((0,Lc.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),uS.Utils.resolvePath(e,r)}le.resolveImportUri=pS;function ey(t,e){let r=pS(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch{}}le.resolveImport=ey;function z2(t,e){if(be.isGrammarImport(e)){let r=ey(t,e);if(r){let n=Ym(t,r);return n.push(r),n}return[]}else return Ym(t,e)}le.resolveTransitiveImports=z2;function Ym(t,e,r=e,n=new Set,i=new Set){let a=(0,Lc.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=ey(t,o);s&&Ym(t,s,r,n,i)}}return Array.from(i)}function hS(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>hS(e)):[]}le.extractAssignments=hS;var Y2=["string","number","boolean","Date","bigint"];function X2(t){return Y2.includes(t)}le.isPrimitiveType=X2});var TS=d(Mc=>{"use strict";Object.defineProperty(Mc,"__esModule",{value:!0});Mc.collectInferredTypes=void 0;var J2=Io(),mS=Pr(),Q2=Dt(),Nt=$e(),vi=kt(),Z2=yi(),qc=Bi(),ty=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:this.copyTypeAlternative(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return vS(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(this.copyTypeAlternative(e));return n}copyTypeAlternative(e){function r(n){return{name:n.name,optional:n.optional,typeAlternatives:n.typeAlternatives,astNodes:n.astNodes}}return{name:e.name,super:e.super,ruleCalls:e.ruleCalls,properties:e.properties.map(n=>r(n))}}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ia();r.parents=e;for(let n of e)n.children.push(r);return r}};function eU(t,e){var r;let n=[],i={fragments:new Map};for(let u of t)n.push(...yS(i,u));let a=aU(n),o=sU(a),s=uU(a,o);for(let u of e){let l=(0,Nt.isAlternatives)(u.definition)&&u.definition.elements.every(c=>(0,Nt.isKeyword)(c))?(0,Q2.stream)(u.definition.elements).filter(Nt.isKeyword).map(c=>`'${c.value}'`).toArray():[(r=(0,vi.getExplicitRuleType)(u))!==null&&r!==void 0?r:"string"];s.unions.push(new qc.UnionType(u.name,Iu(!1,!1,l)))}return s}Mc.collectInferredTypes=eU;function yS(t,e){let r=Ia(e),n=new ty(t,r);return e.definition&&ry(n,n.root,e.definition),n.getTypes()}function Ia(t){return{name:(0,Nt.isParserRule)(t)||(0,Nt.isAction)(t)?(0,vi.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function ry(t,e,r){let n=(0,vi.isOptionalCardinality)(r.cardinality);if((0,Nt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,Ia()));for(let a of r.elements){let o=t.connect(e,Ia());i.push(ry(t,o,a))}return t.merge(...i)}else if((0,Nt.isGroup)(r)||(0,Nt.isUnorderedGroup)(r)){let i=t.connect(e,Ia());for(let a of r.elements)i=ry(t,i,a);if(n){let a=t.connect(e,Ia());return t.merge(a,i)}else return i}else{if((0,Nt.isAction)(r))return tU(t,e,r);(0,Nt.isAssignment)(r)?rU(e,r):(0,Nt.isRuleCall)(r)&&nU(t,e,r)}return e}function tU(t,e,r){var n;let i=t.connect(e,Ia(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,J2.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,typeAlternatives:Iu(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function rU(t,e){let r={types:new Set,reference:!1};gS(e.terminal,r);let n=Iu(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,vi.isOptionalCardinality)(e.cardinality),typeAlternatives:n,astNodes:new Set([e])})}function gS(t,e){if((0,Nt.isAlternatives)(t)||(0,Nt.isUnorderedGroup)(t)||(0,Nt.isGroup)(t))for(let r of t.elements)gS(r,e);else(0,Nt.isKeyword)(t)?e.types.add(`'${t.value}'`):(0,Nt.isRuleCall)(t)&&t.rule.ref?e.types.add((0,vi.getRuleType)(t.rule.ref)):(0,Nt.isCrossReference)(t)&&t.type.ref&&(e.types.add((0,vi.getTypeNameWithoutError)(t.type.ref)),e.reference=!0)}function nU(t,e,r){let n=r.rule.ref;if((0,Nt.isParserRule)(n)&&n.fragment){let i=iU(n,t.context);(0,vi.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,Nt.isParserRule)(n)&&e.ruleCalls.push((0,vi.getRuleType)(n))}function iU(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,vi.getTypeNameWithoutError)(t),a=yS(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function aU(t){let e=new Map,r=[],n=vS(t).map(i=>i.alt);for(let i of n){let a=new qc.InterfaceType(i.name,i.super,i.properties);e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.realSuperTypes.add(i.name)}return Array.from(e.values())}function vS(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new mS.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let m=a.find(v=>v.name===f.name);m?(f.typeAlternatives.filter(oU(m.typeAlternatives)).forEach(v=>m.typeAlternatives.push(v)),f.astNodes.forEach(v=>m.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function oU(t){return e=>!t.some(r=>(0,Z2.comparePropertyType)(r,e))}function sU(t){let e=[],r=new mS.MultiMap;for(let n of t)for(let i of n.realSuperTypes)r.add(i,n.name);for(let[n,i]of r.entriesGroupedByKey())t.some(a=>a.name===n)||e.push(new qc.UnionType(n,Iu(!1,!1,i),{reflection:!0}));return e}function uU(t,e){var r;for(let a of t)for(let o of a.realSuperTypes)(r=t.find(s=>s.name===o))===null||r===void 0||r.subTypes.add(a.name);let n={interfaces:[],unions:e},i=new Set(e.map(a=>a.name));for(let a of t)if(a.properties.length===0&&a.subTypes.size>0){let o=Iu(!1,!1,Array.from(a.subTypes)),s=e.find(u=>u.name===a.name);if(s)s.alternatives.push(...o);else{let u=new qc.UnionType(a.name,o,{reflection:!0});u.realSuperTypes=a.realSuperTypes,n.unions.push(u),i.add(a.name)}}else n.interfaces.push(a);for(let a of n.interfaces)a.printingSuperTypes=[...a.realSuperTypes].filter(o=>!i.has(o));return n}function Iu(t,e,r){return t||e?[{array:t,reference:e,types:r}]:r.map(n=>({array:t,reference:e,types:[n]}))}});var SS=d(Fc=>{"use strict";Object.defineProperty(Fc,"__esModule",{value:!0});Fc.collectDeclaredTypes=void 0;var AS=kt(),_S=Bi();function lU(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=n.superTypes.filter(o=>o.ref).map(o=>(0,AS.getTypeNameWithoutError)(o.ref)),a=n.attributes.map(o=>({name:o.name,optional:o.isOptional===!0,typeAlternatives:o.typeAlternatives.map(RS),astNodes:new Set([o])}));r.interfaces.push(new _S.InterfaceType(n.name,i,a))}for(let n of e){let i=n.typeAlternatives.map(RS),a=n.typeAlternatives.length>1&&n.typeAlternatives.some(o=>{var s;return((s=o.refType)===null||s===void 0?void 0:s.ref)!==void 0});r.unions.push(new _S.UnionType(n.name,i,{reflection:a}))}return r}Fc.collectDeclaredTypes=lU;function RS(t){var e,r;let n=[];return t.refType?n=[t.refType.ref?(0,AS.getTypeNameWithoutError)(t.refType.ref):t.refType.$refText]:n=[(e=t.primitiveType)!==null&&e!==void 0?e:`'${(r=t.keywordType)===null||r===void 0?void 0:r.value}'`],{types:n,reference:t.isRef===!0,array:t.isArray===!0}}});var iy=d(xo=>{"use strict";Object.defineProperty(xo,"__esModule",{value:!0});xo.collectAllAstResources=xo.collectTypeResources=void 0;var cU=TS(),fU=SS(),dU=Ie(),pU=Pr(),hU=$e(),bS=kt(),mU=yi(),yU=Bi();function gU(t,e){let r=ny(t,e),n=(0,cU.collectInferredTypes)(r.parserRules,r.datatypeRules),i=(0,fU.collectDeclaredTypes)(r.interfaces,r.types);return TU(n,i),vU((0,mU.mergeInterfaces)(n,i)),{astResources:r,inferred:n,declared:i}}xo.collectTypeResources=gU;function vU(t){function e(r,n=new Set){if(!n.has(r)){n.add(r);for(let i of r.printingSuperTypes){let a=t.find(o=>o.name===i);a&&(0,yU.isInterfaceType)(a)&&(e(a),a.superProperties.entriesGroupedByKey().forEach(o=>r.superProperties.addAll(o[0],o[1])))}}}for(let r of t)e(r)}function TU(t,e){let r=new pU.MultiMap,n=t.unions.concat(e.unions);for(let a of n)if(a.reflection)for(let o of a.alternatives)o.types.forEach(s=>r.add(s,a.name));function i(a,o,s){var u;let l=(u=a.interfaces.find(c=>c.name===o))!==null&&u!==void 0?u:a.unions.find(c=>c.name===o);l&&s.forEach(c=>l.realSuperTypes.add(c))}for(let[a,o]of r.entriesGroupedByKey())i(t,a,o),i(e,a,o)}function ny(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,dU.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,hU.isParserRule)(o)&&!o.fragment&&((0,bS.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,bS.resolveImport)(e,s));ny(o,e,r,n)}}}return n}xo.collectAllAstResources=ny});var kS=d(Lo=>{"use strict";Object.defineProperty(Lo,"__esModule",{value:!0});Lo.specifyAstNodeProperties=Lo.collectAst=void 0;var PS=yi(),ay=Bi(),_U=iy(),RU=kt();function AU(t,e){let{inferred:r,declared:n}=(0,_U.collectTypeResources)(t,e),i={interfaces:(0,PS.sortInterfacesTopologically)(CS(r.interfaces,n.interfaces)),unions:CS(r.unions,n.unions)};return ES(i),i}Lo.collectAst=AU;function CS(t,e){return Array.from(t.concat(e).reduce((r,n)=>(r.set(n.name,n),r),new Map).values()).sort((r,n)=>r.name.localeCompare(n.name))}function ES(t){let e=bU(t);(0,PS.addSubTypes)(e),CU(e),SU(e)}Lo.specifyAstNodeProperties=ES;function SU(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeTypes.add(n.name);let i=Array.from(n.realSuperTypes).map(a=>t.get(a)).filter(a=>a!==void 0);for(let a of i)n.typeTypes.forEach(o=>a.typeTypes.add(o));e.push(...i.filter(a=>!r.has(a)))}}function bU({interfaces:t,unions:e}){let r=t.concat(e).reduce((a,o)=>(a.set(o.name,o),a),new Map),n=new Map;function i(a,o=new Set){if(n.has(a))return n.get(a);if(o.has(a))return!0;o.add(a);let s=a.alternatives.flatMap(u=>u.types).filter(u=>!(0,RU.isPrimitiveType)(u));if(s.length===0)return!0;for(let u of s){let l=r.get(u);if(l&&((0,ay.isInterfaceType)(l)||(0,ay.isUnionType)(l)&&!i(l,o)))return!1}return!0}for(let a of e){let o=i(a);n.set(a,o)}for(let[a,o]of n)o&&r.delete(a.name);return r}function CU(t){var e;let r=Array.from(t.values()),n=r.filter(a=>(0,ay.isInterfaceType)(a));for(let a of n){let o=a.properties.flatMap(s=>s.typeAlternatives.filter(u=>!u.reference).flatMap(u=>u.types));for(let s of o)(e=t.get(s))===null||e===void 0||e.containerTypes.add(a.name)}let i=PU(r);EU(i)}function PU(t){function e(i){let a=[i];n.add(i.name);let o=[...i.subTypes,...i.realSuperTypes];for(let s of o)if(!n.has(s)){let u=t.find(l=>l.name===s);u&&a.push(...e(u))}return a}let r=[],n=new Set;for(let i of t)n.has(i.name)||r.push(e(i));return r}function EU(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var oy=d(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.interpretAstReflection=void 0;var kU=hr(),NS=Pr(),NU=$e(),wU=kS(),$U=yi();function OU(t,e){let r;(0,NU.isGrammar)(t)?r=(0,wU.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=IU(r),a=DU(r),o=LU(r);return{getAllTypes(){return n},getReferenceType(s){let u=`${s.container.$type}:${s.property}`,l=i.get(u);if(l)return l;throw new Error("Could not find reference type for "+u)},getTypeMetaData(s){var u;return(u=a.get(s))!==null&&u!==void 0?u:{name:s,mandatory:[]}},isInstance(s,u){return(0,kU.isAstNode)(s)&&this.isSubtype(s.$type,u)},isSubtype(s,u){if(s===u)return!0;let l=o.get(s);for(let c of l)if(this.isSubtype(c,u))return!0;return!1}}}jc.interpretAstReflection=OU;function IU(t){let e=new NS.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of i.typeAlternatives)a.reference&&e.add(n.name,[i.name,a.types[0]]);for(let i of n.printingSuperTypes){let a=e.get(i);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function DU(t){let e=new Map,r=(0,$U.collectAllProperties)(t.interfaces);for(let n of t.interfaces){let i=r.get(n.name),a=i.filter(s=>s.typeAlternatives.some(u=>u.array)),o=i.filter(s=>s.typeAlternatives.every(u=>!u.array&&u.types.includes("boolean")));(a.length>0||o.length>0)&&e.set(n.name,{name:n.name,mandatory:xU(a,o)})}return e}function xU(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}function LU(t){let e=new NS.MultiMap;for(let r of t.interfaces)e.addAll(r.name,r.realSuperTypes);for(let r of t.unions)e.addAll(r.name,r.realSuperTypes);return e}});var wS=d(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.LangiumGrammarGrammar=void 0;var qU=Et(),Gc,MU=()=>Gc??(Gc=(0,qU.loadGrammarFromJson)(`{
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
}`));Uc.LangiumGrammarGrammar=MU});var $S=d(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.LangiumGrammarGeneratedModule=Fr.LangiumGrammarGeneratedSharedModule=Fr.LangiumGrammarParserConfig=Fr.LangiumGrammarLanguageMetaData=void 0;var FU=$e(),jU=wS();Fr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Fr.LangiumGrammarParserConfig={maxLookahead:3};Fr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new FU.LangiumGrammarAstReflection};Fr.LangiumGrammarGeneratedModule={Grammar:()=>(0,jU.LangiumGrammarGrammar)(),LanguageMetaData:()=>Fr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Fr.LangiumGrammarParserConfig}}});var jr=d(_t=>{"use strict";Object.defineProperty(_t,"__esModule",{value:!0});_t.Deferred=_t.MutexLock=_t.interruptAndCheck=_t.isOperationCancelled=_t.OperationCancelled=_t.setInterruptionPeriod=_t.startCancelableOperation=_t.delayNextTick=void 0;var Hc=hi();function OS(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}_t.delayNextTick=OS;var sy=0,IS=10;function GU(){return sy=Date.now(),new Hc.CancellationTokenSource}_t.startCancelableOperation=GU;function UU(t){IS=t}_t.setInterruptionPeriod=UU;_t.OperationCancelled=Symbol("OperationCancelled");function DS(t){return t===_t.OperationCancelled}_t.isOperationCancelled=DS;async function HU(t){if(t===Hc.CancellationToken.None)return;let e=Date.now();if(e-sy>=IS&&(sy=e,await OS()),t.isCancellationRequested)throw _t.OperationCancelled}_t.interruptAndCheck=HU;var uy=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Hc.CancellationTokenSource}lock(e){this.cancel();let r=new Hc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{DS(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};_t.MutexLock=uy;var ly=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};_t.Deferred=ly});var Wc=d(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.DefaultScopeComputation=void 0;var cy=hi(),xS=Ie(),KU=Pr(),LS=jr(),fy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=cy.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=xS.streamContents,i=cy.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,LS.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=cy.CancellationToken.None){let n=e.parseResult.value,i=new KU.MultiMap;for(let a of(0,xS.streamAllContents)(n))await(0,LS.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};Kc.DefaultScopeComputation=fy});var Vc=d(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.DefaultScopeProvider=Vi.EMPTY_SCOPE=Vi.StreamScope=void 0;var WU=Ie(),Bc=Dt(),qo=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};Vi.StreamScope=qo;Vi.EMPTY_SCOPE={getElement(){},getAllElements(){return Bc.EMPTY_STREAM}};var dy=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,WU.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,Bc.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new qo((0,Bc.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,Bc.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new qo(i,r,n)}getGlobalScope(e,r){return new qo(this.indexManager.allElements(e))}};Vi.DefaultScopeProvider=dy});var Ti=d(Mo=>{"use strict";Object.defineProperty(Mo,"__esModule",{value:!0});Mo.relativeURI=Mo.equalURI=void 0;function BU(t,e){return t?.toString()===e?.toString()}Mo.equalURI=BU;function VU(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}Mo.relativeURI=VU});var MS=d(Fo=>{"use strict";Object.defineProperty(Fo,"__esModule",{value:!0});Fo.LangiumGrammarScopeComputation=Fo.LangiumGrammarScopeProvider=void 0;var zU=Wc(),py=Vc(),Du=Ie(),qS=Dt(),YU=Ti(),Gr=$e(),hy=kt(),my=class extends py.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Gr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,Du.getDocument)(r.container).precomputedScopes,a=(0,Du.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,qS.stream)(s).filter(u=>u.type===Gr.Interface||u.type===Gr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,Du.getContainerOfType)(r.container,Gr.isGrammar);if(!n)return py.EMPTY_SCOPE;let i=(0,qS.stream)(n.imports).map(hy.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,YU.equalURI)(o.documentUri,s)));return e===Gr.AbstractType&&(a=a.filter(o=>o.type===Gr.Interface||o.type===Gr.Type)),new py.StreamScope(a)}};Fo.LangiumGrammarScopeProvider=my;var yy=class extends zU.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Gr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push({node:a,name:a.name,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(a)})}(0,Du.streamAllContents)(e).forEach(a=>{if((0,Gr.isAction)(a)&&a.inferredType){let o=(0,hy.getActionType)(a);o&&r.push({node:e,name:o,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)})}})}}processNode(e,r,n){(0,Gr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Gr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,{node:o,name:o.name,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(o)})}}processActionNode(e,r,n){let i=(0,Du.findRootNode)(e);if(i&&(0,Gr.isAction)(e)&&e.inferredType){let a=(0,hy.getActionType)(e);a&&n.add(i,{node:e,name:a,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(e)})}}};Fo.LangiumGrammarScopeComputation=yy});var Ay=d(cr=>{"use strict";var XU=cr&&cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),JU=cr&&cr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),QU=cr&&cr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&XU(e,t,r);return JU(e,t),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.LangiumGrammarValidator=cr.IssueCodes=cr.registerValidationChecks=void 0;var gy=vo(),zi=Ie(),Yi=Pr(),vy=Qe(),Xi=Et(),Ty=Dt(),Ve=QU($e()),_y=$e(),xt=kt();function ZU(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],AtomType:[r.checkAtomTypeRefType,r.checkFragmentsInTypes]};e.register(n,r)}cr.registerValidationChecks=ZU;var lr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(lr=cr.IssueCodes||(cr.IssueCodes={}));var Ry=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:lr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Ve.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Ve.isParserRule(a)&&!(0,xt.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:lr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,xt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,Ty.stream)(i.rules).filter(a=>!xu(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,Ty.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new Yi.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,xt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Yi.MultiMap;for(let i of e.imports){let a=(0,xt.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[gy.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,xt.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new Yi.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,Ty.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,xt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Ve.isParserRule)){if(xu(u))continue;let l=(0,xt.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,xt.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:lr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=(0,Xi.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:lr.InvalidInfers,data:m&&(0,vy.toDocumentSegment)(m)})}}else if(l&&c){let m=(0,Xi.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:lr.InvalidInfers,data:m&&(0,vy.toDocumentSegment)(m)})}}for(let u of(0,zi.streamAllContents)(e).filter(Ve.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,xt.getTypeNameWithoutError)(u);if(u.type&&o.has(f)===c){let m=c?(0,Xi.findNodeForKeyword)(u.$cstNode,"infer"):(0,Xi.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?lr.SuperfluousInfer:lr.MissingInfer,data:m&&(0,vy.toDocumentSegment)(m)})}else if(l&&o.has(f)&&c&&u.$cstNode){let m=(0,Xi.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,Xi.findNodeForKeyword)(u.$cstNode,"{");m&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:lr.SuperfluousInfer,data:{start:v.range.end,end:m.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:lr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,xt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,zi.getContainerOfType)(e,i=>Ve.isTerminalRule(i)||Ve.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ve.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ve.isTerminalRule(n)&&n.fragment&&(0,zi.getContainerOfType)(e,Ve.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:lr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,xt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:lr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:lr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,Xi.getAllReachableRules)(e,!0);for(let i of e.rules)Ve.isTerminalRule(i)&&i.hidden||xu(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[gy.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Yi.MultiMap,i=new Set;for(let l of e.rules)Ve.isTerminalRule(l)&&l.name&&n.add(l.name,l),Ve.isParserRule(l)&&(0,zi.streamAllContents)(l).filter(Ve.isKeyword).forEach(f=>i.add(f.value));let a=new Yi.MultiMap,o=new Yi.MultiMap;for(let l of e.imports){let c=(0,xt.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let m of f.rules)Ve.isTerminalRule(m)&&m.name?a.add(m.name,l):Ve.isParserRule(m)&&m.name&&(0,zi.streamAllContents)(m).filter(Ve.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new Yi.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new Yi.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>u.add(m,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!xu(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:lr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&eH.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,zi.getContainerOfType)(e,_y.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,xt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:lr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,zi.streamAllContents)(e).filter(Ve.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[gy.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(xu(e))return;let n=e.dataType,i=(0,xt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,_y.isRuleCall)(e.terminal)&&(0,_y.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,zi.streamAllContents)(e.terminal).map(a=>Ve.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){e.attributes.filter(n=>n.typeAlternatives.length>1).forEach(n=>{let i=o=>o.isRef?"ref":"other",a=i(n.typeAlternatives[0]);n.typeAlternatives.slice(1).some(o=>i(o)!==a)&&r("error",this.createMixedTypeError(n.name),{node:n,property:"typeAlternatives"})})}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,xt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Ve.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Ve.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,Xi.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Ve.isRuleCall(e.terminal)&&Ve.isParserRule(e.terminal.rule.ref)&&!(0,xt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkAtomTypeRefType(e,r){if(e?.refType){let n=this.checkReferenceToRuleButNotType(e?.refType);n&&r("error",n,{node:e,property:"refType"})}}checkFragmentsInTypes(e,r){var n,i;Ve.isParserRule((n=e.refType)===null||n===void 0?void 0:n.ref)&&(!((i=e.refType)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"refType"})}checkReferenceToRuleButNotType(e){if(e&&Ve.isParserRule(e.ref)&&!(0,xt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,xt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Ve.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};cr.LangiumGrammarValidator=Ry;function xu(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var eH=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var Xc=d(mn=>{"use strict";Object.defineProperty(mn,"__esModule",{value:!0});mn.DocumentValidator=mn.toDiagnosticSeverity=mn.getDiagnosticRange=mn.DefaultDocumentValidator=void 0;var Ur=qe(),FS=Et(),tH=Ie(),rH=Qe(),zc=jr(),Sy=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Ur.CancellationToken.None){let n=e.parseResult,i=[];await(0,zc.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Ur.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Yc.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Ur.Range.create(0,0,0,0);else{let u=Ur.Position.create(s.endLine-1,s.endColumn);o=Ur.Range.create(u,u)}}}else o=(0,rH.tokenToRange)(a.token);if(o){let s={severity:Ur.DiagnosticSeverity.Error,range:o,message:a.message,code:Yc.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Yc.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,zc.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,zc.interruptAndCheck)(r),i}async validateAst(e,r,n=Ur.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,tH.streamAst)(e).map(async o=>{await(0,zc.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:jS(n),severity:GS(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};mn.DefaultDocumentValidator=Sy;function jS(t){if(Ur.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,FS.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,FS.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}mn.getDiagnosticRange=jS;function GS(t){switch(t){case"error":return Ur.DiagnosticSeverity.Error;case"warning":return Ur.DiagnosticSeverity.Warning;case"info":return Ur.DiagnosticSeverity.Information;case"hint":return Ur.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}mn.toDiagnosticSeverity=GS;var Yc;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Yc=mn.DocumentValidator||(mn.DocumentValidator={}))});var BS=d(Mn=>{"use strict";var nH=Mn&&Mn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),iH=Mn&&Mn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),aH=Mn&&Mn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&nH(e,t,r);return iH(e,t),e};Object.defineProperty(Mn,"__esModule",{value:!0});Mn.LangiumGrammarCodeActionProvider=void 0;var Hr=qe(),oH=Ln(),US=Ie(),HS=Qe(),sH=Et(),KS=Do(),WS=Ti(),uH=Xc(),by=aH($e()),Kr=Ay(),Cy=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Kr.IssueCodes.GrammarNameUppercase:case Kr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Kr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Kr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Kr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Kr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Kr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Kr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Kr.IssueCodes.InvalidInfers:case Kr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Kr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Kr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case uH.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,HS.findLeafNodeAtOffset)(i,n),o=(0,US.getContainerOfType)(a?.element,by.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,KS.escapeRegExp)(s)}-${(0,KS.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,sH.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&by.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,HS.findLeafNodeAtOffset)(a,i),s=(0,US.getContainerOfType)(o?.element,by.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(m=>m.name===r.refText),l=[],c=-1,f=-1;for(let m of u){if((0,WS.equalURI)(m.documentUri,n.uri))continue;let v=lH(n.uri,m.documentUri),y,R="",P=n.parseResult.value,E=P.imports.find(b=>b.path&&v<b.path);if(E)y=(i=E.$cstNode)===null||i===void 0?void 0:i.range.start;else if(P.imports.length>0){let b=P.imports[P.imports.length-1].$cstNode.range.end;b&&(y={line:b.line+1,character:0})}else P.rules.length>0&&(y=(a=P.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,R=`
`);y&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${R}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Mn.LangiumGrammarCodeActionProvider=Cy;function lH(t,e){let r=oH.Utils.dirname(t),n=(0,WS.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var Qc=d(Jc=>{"use strict";Object.defineProperty(Jc,"__esModule",{value:!0});Jc.DefaultFoldingRangeProvider=void 0;var Py=qe(),cH=Ie(),fH=Qe(),Ey=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,cH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,fH.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,Py.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),Py.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===Py.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Jc.DefaultFoldingRangeProvider=Ey});var VS=d(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.LangiumGrammarFoldingRangeProvider=void 0;var dH=Qc(),pH=$e(),ky=class extends dH.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,pH.isParserRule)(e)}};Zc.LangiumGrammarFoldingRangeProvider=ky});var $y=d(yn=>{"use strict";Object.defineProperty(yn,"__esModule",{value:!0});yn.Formatting=yn.FormattingRegion=yn.DefaultNodeFormatter=yn.AbstractFormatter=void 0;var ef=Et(),Ny=hr(),hH=Ie(),zS=Qe(),Lu=Dt(),wy=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new tf(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let m=this.nodeModeToKey(s,u),v=i.get(m),y=(c=l.options.priority)!==null&&c!==void 0?c:0,R=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||R<=y)&&i.set(m,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,hH.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,m=(0,Ny.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),y=r.get(v);if(r.delete(v),y){let E=this.createTextEdit(l,f,y,a);for(let b of E)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}let R=this.nodeModeToKey(f,"append"),P=r.get(R);if(r.delete(R),P){let E=(0,zS.getNextNode)(f);if(E){let b=this.createTextEdit(f,E,P,a);for(let S of b)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!y&&f.hidden){let E=this.createHiddenTextEdits(l,f,void 0,a);for(let b of E)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}m&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let R=r.text.split(`
`);R[0]=l+R[0];for(let P=0;P<R.length;P++){let E=o+P,b={character:0,line:E};if(v>0)s.push({newText:y,range:{start:b,end:b}});else{let S=R[P],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:b,end:{line:E,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return u!==void 0?m.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?m.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(o,Boolean(e),i)),(0,Ny.isLeafCstNode)(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Lu.TreeStreamImpl(i,a=>this.iterateCst(a,r)):Lu.EMPTY_STREAM}iterateCst(e,r){if(!(0,Ny.isCompositeCstNode)(e))return Lu.EMPTY_STREAM;let n=r.indentation;return new Lu.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,Lu.DONE_RESULT))}};yn.AbstractFormatter=wy;var tf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new yr(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new yr(r,this.collector)}property(e,r){let n=(0,ef.findNodeForProperty)(this.astNode.$cstNode,e,r);return new yr(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,ef.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new yr(r,this.collector)}keyword(e,r){let n=(0,ef.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new yr(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,ef.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new yr(r,this.collector)}cst(e){return new yr([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new yr([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new yr((0,zS.getInteriorNodes)(a,o),this.collector)}};yn.DefaultNodeFormatter=tf;var yr=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new yr(this.nodes.slice(e,r),this.collector)}};yn.FormattingRegion=yr;var mH;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var m,v,y,R,P,E;let b=(m=c.lines)!==null&&m!==void 0?m:0,S=(v=f.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,F=(R=f.tabs)!==null&&R!==void 0?R:0,W=(P=c.characters)!==null&&P!==void 0?P:0,re=(E=f.characters)!==null&&E!==void 0?E:0;return b<S?-1:b>S?1:O<F?-1:O>F?1:W<re?-1:W>re?1:0}})(mH=yn.Formatting||(yn.Formatting={}))});var YS=d(Fn=>{"use strict";var yH=Fn&&Fn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),gH=Fn&&Fn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),vH=Fn&&Fn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&yH(e,t,r);return gH(e,t),e};Object.defineProperty(Fn,"__esModule",{value:!0});Fn.LangiumGrammarFormatter=void 0;var Ee=$y(),Ji=vH($e()),Oy=class extends Ee.AbstractFormatter{format(e){if(Ji.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Ee.Formatting.noSpace());else if(Ji.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Ee.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Ee.Formatting.oneSpace()):r.property("name").append(Ee.Formatting.noSpace()),r.properties("parameters").append(Ee.Formatting.noSpace()),r.keywords(",").append(Ee.Formatting.oneSpace()),r.keywords("<").append(Ee.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Ee.Formatting.noSpace()),r.interior(i,n).prepend(Ee.Formatting.indent()),n.prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(),Ee.Formatting.newLine())),r.node(e).prepend(Ee.Formatting.noIndent())}else if(Ji.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Ee.Formatting.oneSpace()),r.keyword("returns").append(Ee.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Ee.Formatting.oneSpace()),r.keyword(":").prepend(Ee.Formatting.noSpace()),r.keyword(";").prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(),Ee.Formatting.newLine())),r.node(e).prepend(Ee.Formatting.noIndent())}else if(Ji.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Ee.Formatting.noSpace()),r.keywords(".","+=","=").surround(Ee.Formatting.noSpace()),r.keyword("}").prepend(Ee.Formatting.noSpace())}else if(Ji.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Ee.Formatting.oneSpace());else if(Ji.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Ee.Formatting.noSpace());else if(Ji.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Ee.Formatting.noSpace()),r.keyword(",").append(Ee.Formatting.oneSpace()),r.properties("arguments").append(Ee.Formatting.noSpace())}Ji.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Ee.Formatting.noSpace())}};Fn.LangiumGrammarFormatter=Oy});var af=d(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.SemanticTokensDecoder=Rt.AbstractSemanticTokenProvider=Rt.SemanticTokensBuilder=Rt.DefaultSemanticTokenOptions=Rt.AllSemanticTokenModifiers=Rt.AllSemanticTokenTypes=void 0;var pe=qe(),rf=Et(),TH=Ie();Rt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};Rt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};Rt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Rt.AllSemanticTokenTypes),tokenModifiers:Object.keys(Rt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var nf=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Rt.SemanticTokensBuilder=nf;var Iy=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new nf;return this.tokensBuilders.set(e.uri.toString(),n),n}computeHighlighting(e,r,n){let i=e.parseResult.value;if(this.highlightElement(i,r)==="prune")return;let a=(0,TH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){if(n.isCancellationRequested)break;let s=o.value,u=s.$cstNode.range,l=this.compareRange(u);if(l===1)break;if(l===-1)continue;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}compareRange(e){if(!this.currentRange)return 0;let r=typeof e=="number"?e:e.start.line;return(typeof e=="number"?e:e.end.line)<this.currentRange.start.line?-1:r>this.currentRange.end.line?1:0}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.compareRange(n)!==0||!this.currentDocument||!this.currentTokensBuilder)return;let o=Rt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=Rt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,m-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let m=u+1;m<l;m++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,rf.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,rf.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,rf.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,rf.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Rt.AbstractSemanticTokenProvider=Iy;var _H;(function(t){function e(n,i){let a=new Map;Object.entries(Rt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(_H=Rt.SemanticTokensDecoder||(Rt.SemanticTokensDecoder={}))});var XS=d(of=>{"use strict";Object.defineProperty(of,"__esModule",{value:!0});of.LangiumGrammarSemanticTokenProvider=void 0;var Qi=qe(),RH=af(),Zi=$e(),Dy=class extends RH.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,Zi.isAssignment)(e)?r({node:e,property:"feature",type:Qi.SemanticTokenTypes.property}):(0,Zi.isAction)(e)?e.feature&&r({node:e,property:"feature",type:Qi.SemanticTokenTypes.property}):(0,Zi.isReturnType)(e)?r({node:e,property:"name",type:Qi.SemanticTokenTypes.type}):(0,Zi.isAtomType)(e)?(e.primitiveType||e.refType)&&r({node:e,property:e.primitiveType?"primitiveType":"refType",type:Qi.SemanticTokenTypes.type}):(0,Zi.isParameter)(e)?r({node:e,property:"name",type:Qi.SemanticTokenTypes.parameter}):(0,Zi.isParameterReference)(e)?r({node:e,property:"parameter",type:Qi.SemanticTokenTypes.parameter}):(0,Zi.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:Qi.SemanticTokenTypes.type}):(0,Zi.isTypeAttribute)(e)&&r({node:e,property:"name",type:Qi.SemanticTokenTypes.property})}};of.LangiumGrammarSemanticTokenProvider=Dy});var QS=d(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.LangiumGrammarNameProvider=void 0;var AH=Io(),SH=Et(),JS=$e(),xy=class extends AH.DefaultNameProvider{getName(e){return(0,JS.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,JS.isAssignment)(e)?(0,SH.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};sf.LangiumGrammarNameProvider=xy});var My=d(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.DefaultReferences=void 0;var bH=Et(),ZS=hr(),ea=Ie(),Ly=Qe(),e0=Dt(),CH=Ti(),qy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,bH.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,ZS.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,ZS.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,Ly.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n||r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,e0.stream)(n)}findLocalReferences(e,r=!1){let i=(0,ea.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,ea.streamAst)(i).forEach(o=>{(0,ea.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,ea.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,ea.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,Ly.toDocumentSegment)(u),local:(0,CH.equalURI)((0,ea.getDocument)(u.element).uri,(0,ea.getDocument)(e).uri)})}})}),(0,e0.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,ea.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,Ly.toDocumentSegment)(r),local:!0}}}};uf.DefaultReferences=qy});var a0=d(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.LangiumGrammarReferences=void 0;var PH=My(),er=Ie(),t0=Qe(),r0=Et(),n0=Dt(),Fy=Ti(),Bt=$e(),i0=kt(),lf=yi(),jy=class extends PH.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,r0.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Bt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Bt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Bt.isTypeAttribute)(e)){let i=(0,er.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Bt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,er.getContainerOfType)(e,Bt.isInterface);if(a){let o=(0,lf.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,Fy.equalURI)((0,er.getDocument)(e).uri,(0,er.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,n0.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,er.getContainerOfType)(e,Bt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,lf.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,n0.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Bt.isParserRule)(e)){let i=(0,i0.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,er.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,er.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,t0.toDocumentSegment)(a),local:(0,Fy.equalURI)((0,er.getDocument)(i).uri,(0,er.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,r0.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,er.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,er.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,t0.toDocumentSegment)(a),local:(0,Fy.equalURI)((0,er.getDocument)(e).uri,(0,er.getDocument)(r).uri)})}let i=(0,er.getContainerOfType)(e,Bt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,er.getContainerOfType)(e,Bt.isParserRule),i=(0,i0.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Bt.isInterface)(n.returnType.ref)||(0,Bt.isType)(n.returnType.ref))){let a=(0,lf.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,lf.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Bt.isParserRule)(o)||(0,Bt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,er.streamAst)(r).filter(a=>{var o,s;return(0,Bt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Bt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Bt.isParserRule)(a)||(0,Bt.isAction)(a))&&n.push(a)}),n}};cf.LangiumGrammarReferences=jy});var Hy=d(Wr=>{"use strict";var EH=Wr&&Wr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),kH=Wr&&Wr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),NH=Wr&&Wr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&EH(e,t,r);return kH(e,t),e};Object.defineProperty(Wr,"__esModule",{value:!0});Wr.findFirstFeatures=Wr.findNextFeatures=void 0;var tr=NH($e()),_i=kt(),wH=hr(),$H=Ie(),OH=Et();function IH(t,e){let r={stacks:t,tokens:e};return DH(r),r.stacks.flat().forEach(i=>{i.property=void 0}),u0(r.stacks).map(i=>i[i.length-1])}Wr.findNextFeatures=IH;function Gy(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(tr.isGroup(u.$container)){s=u.$container;break}else if(tr.isAbstractElement(u.$container))u=u.$container;else break;if((0,_i.isArrayCardinality)(u.cardinality)){let l=jo({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...s0({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,_i.isOptionalCardinality)(c.feature.cardinality)||(0,_i.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Gy({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function o0(t){return(0,wH.isAstNode)(t)&&(t={feature:t}),jo({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Wr.findFirstFeatures=o0;function jo(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(tr.isGroup(u)){if(o.has(u))return[];o.add(u)}if(tr.isGroup(u))return s0(i,0,a,o,s).map(c=>ff(c,u.cardinality,a));if(tr.isAlternatives(u)||tr.isUnorderedGroup(u))return u.elements.flatMap(c=>jo({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>ff(c,u.cardinality,a));if(tr.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return jo({next:c,cardinalities:a,visited:o,plus:s}).map(f=>ff(f,u.cardinality,a))}else{if(tr.isAction(u))return Gy({next:{feature:u,new:!0,type:(0,_i.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(tr.isRuleCall(u)&&tr.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,_i.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return jo({next:f,cardinalities:a,visited:o,plus:s}).map(m=>ff(m,u.cardinality,a))}else return[i]}}function ff(t,e,r){return r.set(t.feature,e),t}function s0(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...jo({next:s,cardinalities:r,visited:n,plus:i})),!!(0,_i.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function DH(t){for(let e of t.tokens){let r=u0(t.stacks,e);t.stacks=r}}function u0(t,e){let r=[];for(let n of t)r.push(...xH(n,e));return r}function xH(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(LH)),i=[];for(;t.length>0;){let a=t.pop(),o=Gy({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?Uy(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,_i.isOptionalCardinality)(s.feature.cardinality)||(0,_i.isOptionalCardinality)(r.get(s.feature))))break}return i}function LH(t){if(t.cardinality==="+")return!0;let e=(0,$H.getContainerOfType)(t,tr.isAssignment);return!!(e&&e.cardinality==="+")}function Uy(t,e){if(tr.isKeyword(t))return t.value===e.image;if(tr.isRuleCall(t))return qH(t.rule.ref,e);if(tr.isCrossReference(t)){let r=(0,OH.getCrossReferenceTerminal)(t);if(r)return Uy(r,e)}return!1}function qH(t,e){return tr.isParserRule(t)?o0(t.definition).some(n=>Uy(n.feature,e)):tr.isTerminalRule(t)?new RegExp((0,_i.terminalRegex)(t)).test(e.image):!1}});var Wy=d(jn=>{"use strict";var MH=jn&&jn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),FH=jn&&jn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),jH=jn&&jn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&MH(e,t,r);return FH(e,t),e};Object.defineProperty(jn,"__esModule",{value:!0});jn.DefaultCompletionProvider=void 0;var qu=qe(),Mu=jH($e()),GH=kt(),UH=Ie(),HH=Qe(),l0=Et(),c0=Dt(),df=Hy(),Ky=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=E=>{let b=this.fillCompletionItem(o,u,E);b&&a.push(b)},c=(0,HH.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let E=(0,l0.getEntryRule)(this.grammar);return await this.completionForRule(f,E,l),qu.CompletionList.create(a,!0)}let m=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,m),y=[],R=this.canReparse()&&u!==m;R&&(y=this.findFeaturesAt(o,u));let P=E=>Mu.isKeyword(E.feature)?E.feature.value:E.feature;return await Promise.all((0,c0.stream)(v).distinct(P).map(E=>this.completionFor(f,E,l))),R&&await Promise.all((0,c0.stream)(y).exclude(v,P).distinct(P).map(E=>this.completionFor(f,E,l))),qu.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:qu.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,l0.getEntryRule)(this.grammar),l=(0,df.findFirstFeatures)({feature:u.definition,new:!0,type:(0,GH.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,df.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,df.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(Mu.isParserRule(r)){let i=(0,df.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(Mu.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(Mu.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,UH.getContainerOfType)(r.feature,Mu.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:qu.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:qu.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return f0<=e&&e<=d0&&KH<=r&&r<=WH||e===p0&&r!==p0}toUpperCharCode(e){return f0<=e&&e<=d0?e-32:e}};jn.DefaultCompletionProvider=Ky;var f0="a".charCodeAt(0),d0="z".charCodeAt(0),KH="A".charCodeAt(0),WH="Z".charCodeAt(0),p0="_".charCodeAt(0)});var m0=d(h0=>{"use strict";Object.defineProperty(h0,"__esModule",{value:!0})});var Vy=d(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.DefaultDocumentHighlightProvider=void 0;var BH=qe(),VH=Ie(),zH=Qe(),YH=Ti(),By=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,zH.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,YH.equalURI)((0,VH.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return BH.DocumentHighlight.create(e.segment.range)}};pf.DefaultDocumentHighlightProvider=By});var g0=d(y0=>{"use strict";Object.defineProperty(y0,"__esModule",{value:!0})});var Yy=d(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.DefaultDocumentSymbolProvider=void 0;var XH=qe(),JH=Ie(),zy=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,JH.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return XH.SymbolKind.Field}};hf.DefaultDocumentSymbolProvider=zy});var v0=d(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.AbstractExecuteCommandHandler=void 0;var QH=qe(),Xy=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=QH.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};mf.AbstractExecuteCommandHandler=Xy});var Qy=d(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.DefaultDefinitionProvider=void 0;var ZH=qe(),eK=Ie(),tK=Qe(),Jy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,tK.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[ZH.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,eK.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};yf.DefaultDefinitionProvider=Jy});var eg=d(Go=>{"use strict";Object.defineProperty(Go,"__esModule",{value:!0});Go.MultilineCommentHoverProvider=Go.AstNodeHoverProvider=void 0;var T0=Qe(),gf=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,T0.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};Go.AstNodeHoverProvider=gf;var Zy=class extends gf{constructor(){super(...arguments),this.commentContentRegex=/\/\*([\s\S]*?)\*\//}getAstNodeHoverContent(e){let r=(0,T0.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules),n;if(r){let i=this.commentContentRegex.exec(r.text);i&&i[1]&&(n=this.getCommentContent(i[1]))}if(n)return{contents:{kind:"markdown",value:n}}}getCommentContent(e){return e.split(`
`).map(n=>(n=n.trim(),n.startsWith("*")&&(n=n.substring(1).trim()),n)).join(" ").trim()}};Go.MultilineCommentHoverProvider=Zy});var _0=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.AbstractGoToImplementationProvider=void 0;var rK=qe(),nK=Qe(),tg=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=rK.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,nK.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};vf.AbstractGoToImplementationProvider=tg});var ta=d(Ri=>{"use strict";Object.defineProperty(Ri,"__esModule",{value:!0});Ri.DefaultLangiumDocuments=Ri.DefaultLangiumDocumentFactory=Ri.DocumentState=void 0;var iK=Pm(),aK=Ln(),oK=Dt(),Uo;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Uo=Ri.DocumentState||(Ri.DocumentState={}));var rg=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??aK.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:Uo.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:Uo.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=Uo.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=iK.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Ri.DefaultLangiumDocumentFactory=rg;var ng=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,oK.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Uo.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Uo.Changed,this.documentMap.delete(r)),n}};Ri.DefaultLangiumDocuments=ng});var ag=d(Ho=>{"use strict";Object.defineProperty(Ho,"__esModule",{value:!0});Ho.mergeSignatureHelpOptions=Ho.AbstractSignatureHelpProvider=void 0;var sK=qe(),uK=Qe(),ig=class{provideSignatureHelp(e,r,n=sK.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,uK.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};Ho.AbstractSignatureHelpProvider=ig;function lK(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}Ho.mergeSignatureHelpOptions=lK});var ug=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createRequestHandler=Q.createServerRequestHandler=Q.createCallHierarchyRequestHandler=Q.addCallHierarchyHandler=Q.addCodeLensHandler=Q.addSignatureHelpHandler=Q.addDocumentLinkHandler=Q.addExecuteCommandHandler=Q.addConfigurationChangeHandler=Q.addSemanticTokenHandler=Q.addRenameHandler=Q.addFormattingHandler=Q.addFoldingRangeHandler=Q.addHoverHandler=Q.addDocumentHighlightsHandler=Q.addGoToDeclarationHandler=Q.addGoToImplementationHandler=Q.addGoToTypeDefinitionHandler=Q.addGotoDefinitionHandler=Q.addDocumentSymbolHandler=Q.addCodeActionHandler=Q.addFindReferencesHandler=Q.addCompletionHandler=Q.addDiagnosticsHandler=Q.addDocumentsHandler=Q.startLanguageServer=Q.DefaultLanguageServer=void 0;var gr=qe(),Ko=Ln(),R0=Eu(),cK=jr(),fK=ta(),dK=af(),pK=ag(),og=class{constructor(e){this.onInitializeEmitter=new gr.Emitter,this.onInitializedEmitter=new gr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,R0.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,R0.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var Ae;return(Ae=V.lsp.Formatter)===null||Ae===void 0?void 0:Ae.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,pK.mergeSignatureHelpOptions)(n.map(V=>{var Ae;return(Ae=V.lsp.SignatureHelp)===null||Ae===void 0?void 0:Ae.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),m=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=this.hasService(V=>V.lsp.ReferencesProvider),R=this.hasService(V=>V.lsp.DocumentSymbolProvider),P=this.hasService(V=>V.lsp.DefinitionProvider),E=this.hasService(V=>V.lsp.DocumentHighlightProvider),b=this.hasService(V=>V.lsp.FoldingRangeProvider),S=this.hasService(V=>V.lsp.HoverProvider),O=this.hasService(V=>V.lsp.RenameProvider),F=this.hasService(V=>V.lsp.CallHierarchyProvider),W=this.services.lsp.CodeLensProvider,re=this.hasService(V=>V.lsp.DeclarationProvider);return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:gr.TextDocumentSyncKind.Incremental,completionProvider:v?{}:void 0,referencesProvider:y,documentSymbolProvider:R,definitionProvider:P,typeDefinitionProvider:f,documentHighlightProvider:E,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:b,hoverProvider:S,renameProvider:O?{prepareProvider:!0}:void 0,semanticTokensProvider:s?dK.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:F?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:W?{resolveProvider:Boolean(W.resolveCodeLens)}:void 0,declarationProvider:re}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Q.DefaultLanguageServer=og;function hK(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");A0(e,t),S0(e,t),b0(e,t),C0(e,t),E0(e,t),k0(e,t),N0(e,t),w0(e,t),O0(e,t),D0(e,t),x0(e,t),P0(e,t),L0(e,t),I0(e,t),q0(e,t),F0(e,t),G0(e,t),H0(e,t),U0(e,t),j0(e,t),M0(e,t),$0(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Q.startLanguageServer=hK;function A0(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([Ko.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=o.changes.filter(l=>l.type!==gr.FileChangeType.Deleted).map(l=>Ko.URI.parse(l.uri)),u=o.changes.filter(l=>l.type===gr.FileChangeType.Deleted).map(l=>Ko.URI.parse(l.uri));i(s,u)})}Q.addDocumentsHandler=A0;function S0(t,e){e.workspace.DocumentBuilder.onBuildPhase(fK.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}Q.addDiagnosticsHandler=S0;function b0(t,e){t.onCompletion(Vt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}Q.addCompletionHandler=b0;function C0(t,e){t.onReferences(Vt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}Q.addFindReferencesHandler=C0;function P0(t,e){t.onCodeAction(Vt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}Q.addCodeActionHandler=P0;function E0(t,e){t.onDocumentSymbol(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}Q.addDocumentSymbolHandler=E0;function k0(t,e){t.onDefinition(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}Q.addGotoDefinitionHandler=k0;function N0(t,e){t.onTypeDefinition(Vt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}Q.addGoToTypeDefinitionHandler=N0;function w0(t,e){t.onImplementation(Vt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}Q.addGoToImplementationHandler=w0;function $0(t,e){t.onDeclaration(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}Q.addGoToDeclarationHandler=$0;function O0(t,e){t.onDocumentHighlight(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}Q.addDocumentHighlightsHandler=O0;function I0(t,e){t.onHover(Vt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}Q.addHoverHandler=I0;function D0(t,e){t.onFoldingRanges(Vt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}Q.addFoldingRangeHandler=D0;function x0(t,e){t.onDocumentFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}Q.addFormattingHandler=x0;function L0(t,e){t.onRenameRequest(Vt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Vt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}Q.addRenameHandler=L0;function q0(t,e){let r="No semantic token provider registered";t.languages.semanticTokens.on(ra((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):new gr.ResponseError(0,r),e)),t.languages.semanticTokens.onDelta(ra((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):new gr.ResponseError(0,r),e)),t.languages.semanticTokens.onRange(ra((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):new gr.ResponseError(0,r),e))}Q.addSemanticTokenHandler=q0;function M0(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Q.addConfigurationChangeHandler=M0;function F0(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return Wo(o)}})}Q.addExecuteCommandHandler=F0;function j0(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(ra((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Wo(s)}})}}Q.addDocumentLinkHandler=j0;function G0(t,e){t.onSignatureHelp(ra((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}Q.addSignatureHelpHandler=G0;function U0(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(ra((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Wo(s)}})}}Q.addCodeLensHandler=U0;function H0(t,e){let r="No call hierarchy provider registered";t.languages.callHierarchy.onPrepare(ra((n,i,a,o)=>{var s;return n.lsp.CallHierarchyProvider?(s=n.lsp.CallHierarchyProvider.prepareCallHierarchy(i,a,o))!==null&&s!==void 0?s:null:new gr.ResponseError(0,r)},e)),t.languages.callHierarchy.onIncomingCalls(sg((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.incomingCalls(i,a))!==null&&o!==void 0?o:null:new gr.ResponseError(0,r)},e)),t.languages.callHierarchy.onOutgoingCalls(sg((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.outgoingCalls(i,a))!==null&&o!==void 0?o:null:new gr.ResponseError(0,r)},e))}Q.addCallHierarchyHandler=H0;function sg(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=Ko.URI.parse(n.item.uri),o=r.getServices(a);if(!o)throw console.error(`Could not find service instance for uri: '${a.toString()}'`),new Error;try{return await t(o,n,i)}catch(s){return Wo(s)}}}Q.createCallHierarchyRequestHandler=sg;function ra(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Ko.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return Wo(l)}}}Q.createServerRequestHandler=ra;function Vt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Ko.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return Wo(l)}}}Q.createRequestHandler=Vt;function Wo(t){if((0,cK.isOperationCancelled)(t))return new gr.ResponseError(gr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof gr.ResponseError)return t;throw t}});var cg=d(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.DefaultReferencesProvider=void 0;var mK=qe(),yK=Qe(),lg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,yK.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(mK.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};Tf.DefaultReferencesProvider=lg});var dg=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.DefaultRenameProvider=void 0;var gK=qe(),vK=Io(),K0=Qe(),fg=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,K0.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=gK.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,K0.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,vK.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};_f.DefaultRenameProvider=fg});var W0=d(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.AbstractTypeDefinitionProvider=void 0;var TK=qe(),_K=Qe(),pg=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=TK.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,_K.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Rf.AbstractTypeDefinitionProvider=pg});var hg=d(tt=>{"use strict";var RK=tt&&tt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Lt=tt&&tt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&RK(e,t,r)};Object.defineProperty(tt,"__esModule",{value:!0});Lt(Wy(),tt);Lt(Hy(),tt);Lt(m0(),tt);Lt(Vy(),tt);Lt(g0(),tt);Lt(Yy(),tt);Lt(v0(),tt);Lt(Qc(),tt);Lt(Qy(),tt);Lt(eg(),tt);Lt($y(),tt);Lt(_0(),tt);Lt(ug(),tt);Lt(cg(),tt);Lt(dg(),tt);Lt(af(),tt);Lt(ag(),tt);Lt(W0(),tt)});var B0=d(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.LangiumGrammarDefinitionProvider=void 0;var mg=qe(),AK=hg(),SK=Ie(),bK=Et(),CK=$e(),PK=kt(),yg=class extends AK.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,CK.isGrammarImport)(e.element)&&((n=(0,bK.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,PK.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:mg.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:mg.Range.create(0,0,0,0);return[mg.LocationLink.create(c.$document.uri.toString(),v,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,SK.streamContents)(e).head()}};Af.LangiumGrammarDefinitionProvider=yg});var z0=d(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.AbstractCallHierarchyProvider=void 0;var EK=qe(),V0=Ln(),gg=Qe(),vg=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,gg.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:EK.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(V0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,gg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(V0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,gg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};Sf.AbstractCallHierarchyProvider=vg});var X0=d(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.LangiumGrammarCallHierarchyProvider=void 0;var Y0=qe(),kK=z0(),Tg=Ie(),NK=Qe(),bf=$e(),_g=class extends kK.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,bf.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,NK.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,Tg.getContainerOfType)(s.element,bf.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Y0.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,bf.isParserRule)(e))return;let r=(0,Tg.streamAllContents)(e).filter(bf.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,Tg.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Y0.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};Cf.LangiumGrammarCallHierarchyProvider=_g});var Rg=d(na=>{"use strict";Object.defineProperty(na,"__esModule",{value:!0});na.isInferredAndDeclared=na.isInferred=na.isDeclared=void 0;function wK(t){return t&&"declared"in t}na.isDeclared=wK;function $K(t){return t&&"inferred"in t}na.isInferred=$K;function OK(t){return t&&"inferred"in t&&"declared"in t}na.isInferredAndDeclared=OK});var Q0=d(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.LangiumGrammarValidationResourcesCollector=void 0;var IK=Pr(),kf=Dt(),Pf=$e(),J0=kt(),DK=iy(),Ef=yi(),xK=Bi(),LK=Rg(),Ag=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,DK.collectTypeResources)(e,this.documents),n=this.collectValidationInfo(r),i=this.collectSuperProperties(r),a=this.collectSubTypesAndAliases(n);return{typeToValidationInfo:n,typeToSuperProperties:i,typeToAliases:a}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=qK(e);for(let s of(0,Ef.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,kf.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,Ef.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,l?Object.assign(Object.assign({},l),{declared:s,declaredNode:u}):{declared:s,declaredNode:u})}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map;for(let i of(0,Ef.mergeInterfaces)(e,r))n.set(i.name,Array.from(i.superProperties.values()));return n}collectSubTypesAndAliases(e){let r=(0,kf.stream)(e.entries()).reduce((s,[u,l])=>(s.set(u,(0,LK.isDeclared)(l)?l.declared:l.inferred),s),new Map);(0,Ef.addSubTypes)(r);let n=new Map;function i(s,u){let l=n.get(s);l?l.add(u):n.set(s,new Set([u]))}let a=Array.from(r.values()).filter(s=>s.subTypes.size===0),o=new Set;for(let s of a){o.add(s),i(s.name,s.name);for(let u of(0,kf.stream)(s.realSuperTypes)){i(u,s.name);let l=r.get(u);l&&!o.has(l)&&a.push(l)}(0,xK.isUnionType)(s)&&s.alternatives.length===1&&s.alternatives.filter(u=>!u.array&&!u.reference).flatMap(u=>u.types).forEach(u=>{i(s.name,u),i(u,u),i(u,s.name)})}return n}};Nf.LangiumGrammarValidationResourcesCollector=Ag;function qK({parserRules:t,datatypeRules:e}){let r=new IK.MultiMap;(0,kf.stream)(t).concat(e).forEach(i=>r.add((0,J0.getRuleType)(i),i));function n(i){if((0,Pf.isAction)(i)){let a=(0,J0.getActionType)(i);a&&r.add(a,i)}((0,Pf.isAlternatives)(i)||(0,Pf.isGroup)(i)||(0,Pf.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var eb=d(Br=>{"use strict";var MK=Br&&Br.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),FK=Br&&Br.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),jK=Br&&Br.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&MK(e,t,r);return FK(e,t),e};Object.defineProperty(Br,"__esModule",{value:!0});Br.LangiumGrammarTypesValidator=Br.registerTypeValidationChecks=void 0;var GK=Pr(),Bo=jK($e()),UK=kt(),Gn=Bi(),bg=yi(),Da=Rg();function HK(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Br.registerTypeValidationChecks=HK;var Sg=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,Da.isDeclared)(a)&&(0,Gn.isInterfaceType)(a.declared)&&Bo.isInterface(a.declaredNode)){let o=a;WK(o,i.typeToValidationInfo,r),BK(o,i.typeToSuperProperties,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,Da.isInferred)(a)&&a.inferred instanceof Gn.InterfaceType&&KK(a.inferred,r),(0,Da.isInferredAndDeclared)(a)&&YK(a,i.typeToAliases,r)}checkActionIsNotUnionType(e,r){Bo.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Br.LangiumGrammarTypesValidator=Sg;function KK(t,e){t.properties.filter(r=>r.typeAlternatives.length>1).forEach(r=>{let n=a=>a.reference?"ref":"other",i=n(r.typeAlternatives[0]);if(r.typeAlternatives.slice(1).some(a=>n(a)!==i)){let a=r.astNodes.values().next().value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}})}function WK({declared:t,declaredNode:e},r,n){t.printingSuperTypes.forEach((i,a)=>{let o=r.get(i);o&&(((0,Da.isInferred)(o)&&(0,Gn.isUnionType)(o.inferred)||(0,Da.isDeclared)(o)&&(0,Gn.isUnionType)(o.declared))&&n("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:a}),(0,Da.isInferred)(o)&&!(0,Da.isDeclared)(o)&&n("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:a}))})}function BK({declared:t,declaredNode:e},r,n){var i,a,o;let s=t.properties.reduce((c,f)=>c.add(f.name,f),new GK.MultiMap);for(let[c,f]of s.entriesGroupedByKey())if(f.length>1)for(let m of f)n("error",`Cannot have two properties with the same name '${c}'.`,{node:Array.from(m.astNodes)[0],property:"name"});let u=t.printingSuperTypes;for(let c=0;c<u.length;c++)for(let f=c+1;f<u.length;f++){let m=u[c],v=u[f],y=(i=r.get(m))!==null&&i!==void 0?i:[],R=(a=r.get(v))!==null&&a!==void 0?a:[],P=VK(y,R);P.length>0&&n("error",`Cannot simultaneously inherit from '${m}' and '${v}'. Their ${P.map(E=>"'"+E+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let l=new Set;for(let c of u){let f=(o=r.get(c))!==null&&o!==void 0?o:[];for(let m of f)l.add(m.name)}for(let c of t.properties)if(l.has(c.name)){let m=e.attributes.find(v=>v.name===c.name);m&&n("error",`Cannot redeclare property '${c.name}'. It is already inherited from another interface.`,{node:m,property:"name"})}}function VK(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!zK(n,i)&&r.push(n.name)}return r}function zK(t,e){if(t.optional!==e.optional||t.typeAlternatives.length!==e.typeAlternatives.length)return!1;for(let r of t.typeAlternatives)if(!e.typeAlternatives.some(i=>i.array===r.array&&i.reference===r.reference&&i.types.length===r.types.length&&i.types.every(a=>r.types.includes(a))))return!1;return!0}function YK(t,e,r){let{inferred:n,declared:i,declaredNode:a,inferredNodes:o}=t,s=i.name,u=f=>m=>o.forEach(v=>r("error",`${m[-1]==="."?m.slice(0,-1):m}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:Bo.isAction(v)?"type":"name"})),l=(f,m)=>f.forEach(v=>r("error",m,{node:v,property:Bo.isAssignment(v)||Bo.isAction(v)?"feature":"name"})),c=f=>{o.forEach(m=>{Bo.isParserRule(m)&&(0,UK.extractAssignments)(m.definition).find(y=>y.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${s}'.`,{node:m,property:"parameters"})})};if((0,Gn.isUnionType)(n)&&(0,Gn.isUnionType)(i))XK(n.alternatives,i.alternatives,e,u(`in a rule that returns type '${s}'`));else if((0,Gn.isInterfaceType)(n)&&(0,Gn.isInterfaceType)(i))ZK(n.superProperties,i.superProperties,e,u(`in a rule that returns type '${s}'`),l,c);else{let f=`Inferred and declared versions of type '${s}' both have to be interfaces or unions.`;u()(f),r("error",f,{node:a,property:"name"})}}function XK(t,e,r,n){let i=Z0(t,e,r);for(let a of i)n(`A type '${a.typeAsString}' ${a.errorMessage}`)}function JK(t,e){let r=t.types.map(i=>{var a;return Array.from((a=e.get(i))!==null&&a!==void 0?a:new Set([i]))}),n=[];for(let i of r)if(n.length===0&&n.push([]),i.length===1)n.forEach(a=>a.push(i[0]));else{let a=JSON.parse(JSON.stringify(n));n=[];for(let o of i){let s=JSON.parse(JSON.stringify(a));s.forEach(u=>u.push(o)),n.push(...s)}}return n.map(i=>(0,bg.distinctAndSorted)(i).join(" | "))}function QK(t){let e=t.types.filter(r=>!r.startsWith("'"));return e.push("string"),(0,bg.distinctAndSorted)(e).join(" | ")}function Z0(t,e,r){var n;let i=(u,l)=>u.array&&!l.array&&u.reference&&!l.reference?"can't be an array and a reference":!u.array&&l.array&&!u.reference&&l.reference?"has to be an array and a reference":u.array&&!l.array?"can't be an array":!u.array&&l.array?"has to be an array":u.reference&&!l.reference?"can't be a reference":!u.reference&&l.reference?"has to be a reference":"",a=t.reduce((u,l)=>u.set((0,bg.distinctAndSorted)(l.types).join(" | "),l),new Map),o=e.reduce((u,l)=>(JK(l,r).forEach(c=>u.set(c,l)),u),new Map),s=[];for(let[u,l]of a){let c=(n=o.get(u))!==null&&n!==void 0?n:o.get(QK(l));c?(c.array!==l.array||c.reference!==l.reference)&&s.push({typeAsString:u,errorMessage:i(l,c)}):s.push({typeAsString:u,errorMessage:"is not expected"})}return s}function ZK(t,e,r,n,i,a){let o=(s,u)=>!(s.typeAlternatives.length===1&&s.typeAlternatives[0].array)&&!(u.typeAlternatives.length===1&&u.typeAlternatives[0].array);for(let[s,u]of t.entriesGroupedByKey()){let l=u[0],c=e.get(s)[0];if(c){let f=(0,Gn.propertyTypesToString)(l.typeAlternatives),m=(0,Gn.propertyTypesToString)(c.typeAlternatives);if(f!==m){let v=Z0(l.typeAlternatives,c.typeAlternatives,r);if(v.length>0){let y=`The assigned type '${f}' is not compatible with the declared property '${s}' of type '${m}'`,R=v.map(P=>` '${P.typeAsString}' ${P.errorMessage}`).join("; ");i(l.astNodes,`${y}: ${R}.`)}}!c.optional&&l.optional&&o(l,c)&&a(s)}else i(l.astNodes,`A property '${s}' is not expected.`)}for(let[s,u]of e.entriesGroupedByKey())t.get(s).length===0&&!u.some(c=>c.optional)&&n(`A property '${s}' is expected.`)}});var Cg=d(xa=>{"use strict";Object.defineProperty(xa,"__esModule",{value:!0});xa.createLangiumGrammarServices=xa.LangiumGrammarModule=void 0;var tb=wf(),rb=Eu(),nb=$S(),ib=MS(),ab=Ay(),e5=BS(),t5=VS(),r5=YS(),n5=XS(),i5=QS(),a5=a0(),o5=B0(),s5=X0(),u5=Q0(),ob=eb(),l5=jr(),c5=ta();xa.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new ab.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new u5.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new ob.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new t5.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new e5.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new n5.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new r5.LangiumGrammarFormatter,DefinitionProvider:t=>new o5.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new s5.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new ib.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new ib.LangiumGrammarScopeProvider(t),References:t=>new a5.LangiumGrammarReferences(t),NameProvider:()=>new i5.LangiumGrammarNameProvider}};function f5(t,e){let r=(0,rb.inject)((0,tb.createDefaultSharedModule)(t),nb.LangiumGrammarGeneratedSharedModule,e),n=(0,rb.inject)((0,tb.createDefaultModule)({shared:r}),nb.LangiumGrammarGeneratedModule,xa.LangiumGrammarModule);return d5(r,n),r.ServiceRegistry.register(n),(0,ab.registerValidationChecks)(n),(0,ob.registerTypeValidationChecks)(n),{shared:r,grammar:n}}xa.createLangiumGrammarServices=f5;function d5(t,e){t.workspace.DocumentBuilder.onBuildPhase(c5.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,l5.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var Pg=d(Vo=>{"use strict";Object.defineProperty(Vo,"__esModule",{value:!0});Vo.EmptyFileSystem=Vo.EmptyFileSystemProvider=void 0;var $f=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};Vo.EmptyFileSystemProvider=$f;Vo.EmptyFileSystem={fileSystemProvider:()=>new $f}});var Et=d(Te=>{"use strict";var p5=Te&&Te.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),h5=Te&&Te.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),m5=Te&&Te.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&p5(e,t,r);return h5(e,t),e};Object.defineProperty(Te,"__esModule",{value:!0});Te.createServicesForGrammar=Te.loadGrammarFromJson=Te.findNameAssignment=Te.findAssignment=Te.findNodesForKeywordInternal=Te.findNodeForKeyword=Te.findNodesForKeyword=Te.findNodeForProperty=Te.findNodesForProperty=Te.isCommentTerminal=Te.getCrossReferenceTerminal=Te.getAllReachableRules=Te.getEntryRule=void 0;var lb=Ln(),sb=wf(),ub=Eu(),y5=oy(),vr=m5($e()),g5=kt(),cb=Cg(),v5=hr(),zo=Ie(),T5=Qe(),Eg=Pg();function fb(t){return t.rules.find(e=>vr.isParserRule(e)&&e.entry)}Te.getEntryRule=fb;function _5(t,e){let r=new Set,n=fb(t);if(!n)return new Set(t.rules);db(n,r,e);let i=new Set;for(let a of t.rules)(r.has(a.name)||vr.isTerminalRule(a)&&a.hidden)&&i.add(a);return i}Te.getAllReachableRules=_5;function db(t,e,r){e.add(t.name),(0,zo.streamAllContents)(t).forEach(n=>{if(vr.isRuleCall(n)||r&&vr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&db(i,e,r)}})}function R5(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=pb(t.type.ref);return e?.terminal}}Te.getCrossReferenceTerminal=R5;function A5(t){return t.hidden&&!" ".match((0,g5.terminalRegex)(t))}Te.isCommentTerminal=A5;function S5(t,e){return!t||!e?[]:kg(t,e,t.element,!0)}Te.findNodesForProperty=S5;function b5(t,e,r){if(!t||!e)return;let n=kg(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForProperty=b5;function kg(t,e,r,n){if(!n){let i=(0,zo.getContainerOfType)(t.feature,vr.isAssignment);if(i&&i.feature===e)return[t]}return(0,v5.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>kg(i,e,r,!1)):[]}function C5(t,e){return t?Ng(t,e,t?.element):[]}Te.findNodesForKeyword=C5;function P5(t,e,r){if(!t)return;let n=Ng(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForKeyword=P5;function Ng(t,e,r){if(t.element!==r)return[];if(vr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,T5.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?vr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}Te.findNodesForKeywordInternal=Ng;function E5(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,zo.getContainerOfType)(t.feature,vr.isAssignment);if(n)return n;t=t.parent}}Te.findAssignment=E5;function pb(t){return vr.isInferredType(t)&&(t=t.$container),hb(t,new Map)}Te.findNameAssignment=pb;function hb(t,e){var r;function n(i,a){let o;return(0,zo.getContainerOfType)(i,vr.isAssignment)||(o=hb(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,zo.streamAllContents)(t)){if(vr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(vr.isRuleCall(i)&&vr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(vr.isAtomType(i)&&(!((r=i?.refType)===null||r===void 0)&&r.ref))return n(i,i.refType.ref)}}function k5(t){var e;let r=(0,cb.createLangiumGrammarServices)(Eg.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,lb.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}Te.loadGrammarFromJson=k5;async function N5(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,cb.createLangiumGrammarServices)(Eg.EmptyFileSystem).grammar,u=lb.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,zo.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},R={AstReflection:()=>(0,y5.interpretAstReflection)(f)},P={Grammar:()=>f,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},E=(0,ub.inject)((0,sb.createDefaultSharedModule)(Eg.EmptyFileSystem),R,t.sharedModule),b=(0,ub.inject)((0,sb.createDefaultModule)({shared:E}),P,t.module);return E.ServiceRegistry.register(b),b}Te.createServicesForGrammar=N5});var mb=d(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.createGrammarConfig=void 0;var w5=Qe(),$5=Et(),O5=Do(),I5=$e(),D5=kt();function x5(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,I5.isTerminalRule)(n)&&(0,$5.isCommentTerminal)(n)&&(0,O5.isMultilineComment)((0,D5.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:w5.DefaultNameRegexp}}Of.createGrammarConfig=x5});var wg=d(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.VERSION=void 0;If.VERSION="10.4.2"});var Yo=d((mpe,yb)=>{var L5=Object.prototype;function q5(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||L5;return t===r}yb.exports=q5});var $g=d((ype,gb)=>{function M5(t,e){return function(r){return t(e(r))}}gb.exports=M5});var Tb=d((gpe,vb)=>{var F5=$g(),j5=F5(Object.keys,Object);vb.exports=j5});var Og=d((vpe,_b)=>{var G5=Yo(),U5=Tb(),H5=Object.prototype,K5=H5.hasOwnProperty;function W5(t){if(!G5(t))return U5(t);var e=[];for(var r in Object(t))K5.call(t,r)&&r!="constructor"&&e.push(r);return e}_b.exports=W5});var Ig=d((Tpe,Rb)=>{var B5=typeof global=="object"&&global&&global.Object===Object&&global;Rb.exports=B5});var gn=d((_pe,Ab)=>{var V5=Ig(),z5=typeof self=="object"&&self&&self.Object===Object&&self,Y5=V5||z5||Function("return this")();Ab.exports=Y5});var La=d((Rpe,Sb)=>{var X5=gn(),J5=X5.Symbol;Sb.exports=J5});var Eb=d((Ape,Pb)=>{var bb=La(),Cb=Object.prototype,Q5=Cb.hasOwnProperty,Z5=Cb.toString,Fu=bb?bb.toStringTag:void 0;function eW(t){var e=Q5.call(t,Fu),r=t[Fu];try{t[Fu]=void 0;var n=!0}catch{}var i=Z5.call(t);return n&&(e?t[Fu]=r:delete t[Fu]),i}Pb.exports=eW});var Nb=d((Spe,kb)=>{var tW=Object.prototype,rW=tW.toString;function nW(t){return rW.call(t)}kb.exports=nW});var ia=d((bpe,Ob)=>{var wb=La(),iW=Eb(),aW=Nb(),oW="[object Null]",sW="[object Undefined]",$b=wb?wb.toStringTag:void 0;function uW(t){return t==null?t===void 0?sW:oW:$b&&$b in Object(t)?iW(t):aW(t)}Ob.exports=uW});var vn=d((Cpe,Ib)=>{function lW(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}Ib.exports=lW});var Xo=d((Ppe,Db)=>{var cW=ia(),fW=vn(),dW="[object AsyncFunction]",pW="[object Function]",hW="[object GeneratorFunction]",mW="[object Proxy]";function yW(t){if(!fW(t))return!1;var e=cW(t);return e==pW||e==hW||e==dW||e==mW}Db.exports=yW});var Lb=d((Epe,xb)=>{var gW=gn(),vW=gW["__core-js_shared__"];xb.exports=vW});var Fb=d((kpe,Mb)=>{var Dg=Lb(),qb=function(){var t=/[^.]+$/.exec(Dg&&Dg.keys&&Dg.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function TW(t){return!!qb&&qb in t}Mb.exports=TW});var xg=d((Npe,jb)=>{var _W=Function.prototype,RW=_W.toString;function AW(t){if(t!=null){try{return RW.call(t)}catch{}try{return t+""}catch{}}return""}jb.exports=AW});var Ub=d((wpe,Gb)=>{var SW=Xo(),bW=Fb(),CW=vn(),PW=xg(),EW=/[\\^$.*+?()[\]{}|]/g,kW=/^\[object .+?Constructor\]$/,NW=Function.prototype,wW=Object.prototype,$W=NW.toString,OW=wW.hasOwnProperty,IW=RegExp("^"+$W.call(OW).replace(EW,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function DW(t){if(!CW(t)||bW(t))return!1;var e=SW(t)?IW:kW;return e.test(PW(t))}Gb.exports=DW});var Kb=d(($pe,Hb)=>{function xW(t,e){return t?.[e]}Hb.exports=xW});var aa=d((Ope,Wb)=>{var LW=Ub(),qW=Kb();function MW(t,e){var r=qW(t,e);return LW(r)?r:void 0}Wb.exports=MW});var Vb=d((Ipe,Bb)=>{var FW=aa(),jW=gn(),GW=FW(jW,"DataView");Bb.exports=GW});var Df=d((Dpe,zb)=>{var UW=aa(),HW=gn(),KW=UW(HW,"Map");zb.exports=KW});var Xb=d((xpe,Yb)=>{var WW=aa(),BW=gn(),VW=WW(BW,"Promise");Yb.exports=VW});var Lg=d((Lpe,Jb)=>{var zW=aa(),YW=gn(),XW=zW(YW,"Set");Jb.exports=XW});var Zb=d((qpe,Qb)=>{var JW=aa(),QW=gn(),ZW=JW(QW,"WeakMap");Qb.exports=ZW});var Qo=d((Mpe,oC)=>{var qg=Vb(),Mg=Df(),Fg=Xb(),jg=Lg(),Gg=Zb(),aC=ia(),Jo=xg(),eC="[object Map]",eB="[object Object]",tC="[object Promise]",rC="[object Set]",nC="[object WeakMap]",iC="[object DataView]",tB=Jo(qg),rB=Jo(Mg),nB=Jo(Fg),iB=Jo(jg),aB=Jo(Gg),qa=aC;(qg&&qa(new qg(new ArrayBuffer(1)))!=iC||Mg&&qa(new Mg)!=eC||Fg&&qa(Fg.resolve())!=tC||jg&&qa(new jg)!=rC||Gg&&qa(new Gg)!=nC)&&(qa=function(t){var e=aC(t),r=e==eB?t.constructor:void 0,n=r?Jo(r):"";if(n)switch(n){case tB:return iC;case rB:return eC;case nB:return tC;case iB:return rC;case aB:return nC}return e});oC.exports=qa});var Tn=d((Fpe,sC)=>{function oB(t){return t!=null&&typeof t=="object"}sC.exports=oB});var lC=d((jpe,uC)=>{var sB=ia(),uB=Tn(),lB="[object Arguments]";function cB(t){return uB(t)&&sB(t)==lB}uC.exports=cB});var ju=d((Gpe,dC)=>{var cC=lC(),fB=Tn(),fC=Object.prototype,dB=fC.hasOwnProperty,pB=fC.propertyIsEnumerable,hB=cC(function(){return arguments}())?cC:function(t){return fB(t)&&dB.call(t,"callee")&&!pB.call(t,"callee")};dC.exports=hB});var Oe=d((Upe,pC)=>{var mB=Array.isArray;pC.exports=mB});var xf=d((Hpe,hC)=>{var yB=9007199254740991;function gB(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=yB}hC.exports=gB});var _n=d((Kpe,mC)=>{var vB=Xo(),TB=xf();function _B(t){return t!=null&&TB(t.length)&&!vB(t)}mC.exports=_B});var gC=d((Wpe,yC)=>{function RB(){return!1}yC.exports=RB});var Uu=d((Gu,Zo)=>{var AB=gn(),SB=gC(),_C=typeof Gu=="object"&&Gu&&!Gu.nodeType&&Gu,vC=_C&&typeof Zo=="object"&&Zo&&!Zo.nodeType&&Zo,bB=vC&&vC.exports===_C,TC=bB?AB.Buffer:void 0,CB=TC?TC.isBuffer:void 0,PB=CB||SB;Zo.exports=PB});var AC=d((Bpe,RC)=>{var EB=ia(),kB=xf(),NB=Tn(),wB="[object Arguments]",$B="[object Array]",OB="[object Boolean]",IB="[object Date]",DB="[object Error]",xB="[object Function]",LB="[object Map]",qB="[object Number]",MB="[object Object]",FB="[object RegExp]",jB="[object Set]",GB="[object String]",UB="[object WeakMap]",HB="[object ArrayBuffer]",KB="[object DataView]",WB="[object Float32Array]",BB="[object Float64Array]",VB="[object Int8Array]",zB="[object Int16Array]",YB="[object Int32Array]",XB="[object Uint8Array]",JB="[object Uint8ClampedArray]",QB="[object Uint16Array]",ZB="[object Uint32Array]",ze={};ze[WB]=ze[BB]=ze[VB]=ze[zB]=ze[YB]=ze[XB]=ze[JB]=ze[QB]=ze[ZB]=!0;ze[wB]=ze[$B]=ze[HB]=ze[OB]=ze[KB]=ze[IB]=ze[DB]=ze[xB]=ze[LB]=ze[qB]=ze[MB]=ze[FB]=ze[jB]=ze[GB]=ze[UB]=!1;function e3(t){return NB(t)&&kB(t.length)&&!!ze[EB(t)]}RC.exports=e3});var es=d((Vpe,SC)=>{function t3(t){return function(e){return t(e)}}SC.exports=t3});var Wu=d((Hu,ts)=>{var r3=Ig(),bC=typeof Hu=="object"&&Hu&&!Hu.nodeType&&Hu,Ku=bC&&typeof ts=="object"&&ts&&!ts.nodeType&&ts,n3=Ku&&Ku.exports===bC,Ug=n3&&r3.process,i3=function(){try{var t=Ku&&Ku.require&&Ku.require("util").types;return t||Ug&&Ug.binding&&Ug.binding("util")}catch{}}();ts.exports=i3});var Lf=d((zpe,EC)=>{var a3=AC(),o3=es(),CC=Wu(),PC=CC&&CC.isTypedArray,s3=PC?o3(PC):a3;EC.exports=s3});var Er=d((Ype,kC)=>{var u3=Og(),l3=Qo(),c3=ju(),f3=Oe(),d3=_n(),p3=Uu(),h3=Yo(),m3=Lf(),y3="[object Map]",g3="[object Set]",v3=Object.prototype,T3=v3.hasOwnProperty;function _3(t){if(t==null)return!0;if(d3(t)&&(f3(t)||typeof t=="string"||typeof t.splice=="function"||p3(t)||m3(t)||c3(t)))return!t.length;var e=l3(t);if(e==y3||e==g3)return!t.size;if(h3(t))return!u3(t).length;for(var r in t)if(T3.call(t,r))return!1;return!0}kC.exports=_3});var rs=d((Xpe,NC)=>{function R3(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}NC.exports=R3});var $C=d((Jpe,wC)=>{function A3(){this.__data__=[],this.size=0}wC.exports=A3});var ns=d((Qpe,OC)=>{function S3(t,e){return t===e||t!==t&&e!==e}OC.exports=S3});var Bu=d((Zpe,IC)=>{var b3=ns();function C3(t,e){for(var r=t.length;r--;)if(b3(t[r][0],e))return r;return-1}IC.exports=C3});var xC=d((ehe,DC)=>{var P3=Bu(),E3=Array.prototype,k3=E3.splice;function N3(t){var e=this.__data__,r=P3(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():k3.call(e,r,1),--this.size,!0}DC.exports=N3});var qC=d((the,LC)=>{var w3=Bu();function $3(t){var e=this.__data__,r=w3(e,t);return r<0?void 0:e[r][1]}LC.exports=$3});var FC=d((rhe,MC)=>{var O3=Bu();function I3(t){return O3(this.__data__,t)>-1}MC.exports=I3});var GC=d((nhe,jC)=>{var D3=Bu();function x3(t,e){var r=this.__data__,n=D3(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}jC.exports=x3});var Vu=d((ihe,UC)=>{var L3=$C(),q3=xC(),M3=qC(),F3=FC(),j3=GC();function is(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}is.prototype.clear=L3;is.prototype.delete=q3;is.prototype.get=M3;is.prototype.has=F3;is.prototype.set=j3;UC.exports=is});var KC=d((ahe,HC)=>{var G3=Vu();function U3(){this.__data__=new G3,this.size=0}HC.exports=U3});var BC=d((ohe,WC)=>{function H3(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}WC.exports=H3});var zC=d((she,VC)=>{function K3(t){return this.__data__.get(t)}VC.exports=K3});var XC=d((uhe,YC)=>{function W3(t){return this.__data__.has(t)}YC.exports=W3});var zu=d((lhe,JC)=>{var B3=aa(),V3=B3(Object,"create");JC.exports=V3});var eP=d((che,ZC)=>{var QC=zu();function z3(){this.__data__=QC?QC(null):{},this.size=0}ZC.exports=z3});var rP=d((fhe,tP)=>{function Y3(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}tP.exports=Y3});var iP=d((dhe,nP)=>{var X3=zu(),J3="__lodash_hash_undefined__",Q3=Object.prototype,Z3=Q3.hasOwnProperty;function e4(t){var e=this.__data__;if(X3){var r=e[t];return r===J3?void 0:r}return Z3.call(e,t)?e[t]:void 0}nP.exports=e4});var oP=d((phe,aP)=>{var t4=zu(),r4=Object.prototype,n4=r4.hasOwnProperty;function i4(t){var e=this.__data__;return t4?e[t]!==void 0:n4.call(e,t)}aP.exports=i4});var uP=d((hhe,sP)=>{var a4=zu(),o4="__lodash_hash_undefined__";function s4(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=a4&&e===void 0?o4:e,this}sP.exports=s4});var cP=d((mhe,lP)=>{var u4=eP(),l4=rP(),c4=iP(),f4=oP(),d4=uP();function as(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}as.prototype.clear=u4;as.prototype.delete=l4;as.prototype.get=c4;as.prototype.has=f4;as.prototype.set=d4;lP.exports=as});var pP=d((yhe,dP)=>{var fP=cP(),p4=Vu(),h4=Df();function m4(){this.size=0,this.__data__={hash:new fP,map:new(h4||p4),string:new fP}}dP.exports=m4});var mP=d((ghe,hP)=>{function y4(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}hP.exports=y4});var Yu=d((vhe,yP)=>{var g4=mP();function v4(t,e){var r=t.__data__;return g4(e)?r[typeof e=="string"?"string":"hash"]:r.map}yP.exports=v4});var vP=d((The,gP)=>{var T4=Yu();function _4(t){var e=T4(this,t).delete(t);return this.size-=e?1:0,e}gP.exports=_4});var _P=d((_he,TP)=>{var R4=Yu();function A4(t){return R4(this,t).get(t)}TP.exports=A4});var AP=d((Rhe,RP)=>{var S4=Yu();function b4(t){return S4(this,t).has(t)}RP.exports=b4});var bP=d((Ahe,SP)=>{var C4=Yu();function P4(t,e){var r=C4(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}SP.exports=P4});var qf=d((She,CP)=>{var E4=pP(),k4=vP(),N4=_P(),w4=AP(),$4=bP();function os(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}os.prototype.clear=E4;os.prototype.delete=k4;os.prototype.get=N4;os.prototype.has=w4;os.prototype.set=$4;CP.exports=os});var EP=d((bhe,PP)=>{var O4=Vu(),I4=Df(),D4=qf(),x4=200;function L4(t,e){var r=this.__data__;if(r instanceof O4){var n=r.__data__;if(!I4||n.length<x4-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new D4(n)}return r.set(t,e),this.size=r.size,this}PP.exports=L4});var Mf=d((Che,kP)=>{var q4=Vu(),M4=KC(),F4=BC(),j4=zC(),G4=XC(),U4=EP();function ss(t){var e=this.__data__=new q4(t);this.size=e.size}ss.prototype.clear=M4;ss.prototype.delete=F4;ss.prototype.get=j4;ss.prototype.has=G4;ss.prototype.set=U4;kP.exports=ss});var wP=d((Phe,NP)=>{var H4="__lodash_hash_undefined__";function K4(t){return this.__data__.set(t,H4),this}NP.exports=K4});var OP=d((Ehe,$P)=>{function W4(t){return this.__data__.has(t)}$P.exports=W4});var jf=d((khe,IP)=>{var B4=qf(),V4=wP(),z4=OP();function Ff(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new B4;++e<r;)this.add(t[e])}Ff.prototype.add=Ff.prototype.push=V4;Ff.prototype.has=z4;IP.exports=Ff});var Hg=d((Nhe,DP)=>{function Y4(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}DP.exports=Y4});var Gf=d((whe,xP)=>{function X4(t,e){return t.has(e)}xP.exports=X4});var Kg=d(($he,LP)=>{var J4=jf(),Q4=Hg(),Z4=Gf(),e6=1,t6=2;function r6(t,e,r,n,i,a){var o=r&e6,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,m=!0,v=r&t6?new J4:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var y=t[f],R=e[f];if(n)var P=o?n(R,y,f,e,t,a):n(y,R,f,t,e,a);if(P!==void 0){if(P)continue;m=!1;break}if(v){if(!Q4(e,function(E,b){if(!Z4(v,b)&&(y===E||i(y,E,r,n,a)))return v.push(b)})){m=!1;break}}else if(!(y===R||i(y,R,r,n,a))){m=!1;break}}return a.delete(t),a.delete(e),m}LP.exports=r6});var Wg=d((Ohe,qP)=>{var n6=gn(),i6=n6.Uint8Array;qP.exports=i6});var FP=d((Ihe,MP)=>{function a6(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}MP.exports=a6});var Uf=d((Dhe,jP)=>{function o6(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}jP.exports=o6});var WP=d((xhe,KP)=>{var GP=La(),UP=Wg(),s6=ns(),u6=Kg(),l6=FP(),c6=Uf(),f6=1,d6=2,p6="[object Boolean]",h6="[object Date]",m6="[object Error]",y6="[object Map]",g6="[object Number]",v6="[object RegExp]",T6="[object Set]",_6="[object String]",R6="[object Symbol]",A6="[object ArrayBuffer]",S6="[object DataView]",HP=GP?GP.prototype:void 0,Bg=HP?HP.valueOf:void 0;function b6(t,e,r,n,i,a,o){switch(r){case S6:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case A6:return!(t.byteLength!=e.byteLength||!a(new UP(t),new UP(e)));case p6:case h6:case g6:return s6(+t,+e);case m6:return t.name==e.name&&t.message==e.message;case v6:case _6:return t==e+"";case y6:var s=l6;case T6:var u=n&f6;if(s||(s=c6),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=d6,o.set(t,e);var c=u6(s(t),s(e),n,i,a,o);return o.delete(t),c;case R6:if(Bg)return Bg.call(t)==Bg.call(e)}return!1}KP.exports=b6});var Hf=d((Lhe,BP)=>{function C6(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}BP.exports=C6});var Vg=d((qhe,VP)=>{var P6=Hf(),E6=Oe();function k6(t,e,r){var n=e(t);return E6(t)?n:P6(n,r(t))}VP.exports=k6});var Kf=d((Mhe,zP)=>{function N6(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}zP.exports=N6});var zg=d((Fhe,YP)=>{function w6(){return[]}YP.exports=w6});var Wf=d((jhe,JP)=>{var $6=Kf(),O6=zg(),I6=Object.prototype,D6=I6.propertyIsEnumerable,XP=Object.getOwnPropertySymbols,x6=XP?function(t){return t==null?[]:(t=Object(t),$6(XP(t),function(e){return D6.call(t,e)}))}:O6;JP.exports=x6});var ZP=d((Ghe,QP)=>{function L6(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}QP.exports=L6});var Xu=d((Uhe,eE)=>{var q6=9007199254740991,M6=/^(?:0|[1-9]\d*)$/;function F6(t,e){var r=typeof t;return e=e??q6,!!e&&(r=="number"||r!="symbol"&&M6.test(t))&&t>-1&&t%1==0&&t<e}eE.exports=F6});var Yg=d((Hhe,tE)=>{var j6=ZP(),G6=ju(),U6=Oe(),H6=Uu(),K6=Xu(),W6=Lf(),B6=Object.prototype,V6=B6.hasOwnProperty;function z6(t,e){var r=U6(t),n=!r&&G6(t),i=!r&&!n&&H6(t),a=!r&&!n&&!i&&W6(t),o=r||n||i||a,s=o?j6(t.length,String):[],u=s.length;for(var l in t)(e||V6.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||K6(l,u)))&&s.push(l);return s}tE.exports=z6});var kr=d((Khe,rE)=>{var Y6=Yg(),X6=Og(),J6=_n();function Q6(t){return J6(t)?Y6(t):X6(t)}rE.exports=Q6});var Xg=d((Whe,nE)=>{var Z6=Vg(),eV=Wf(),tV=kr();function rV(t){return Z6(t,tV,eV)}nE.exports=rV});var oE=d((Bhe,aE)=>{var iE=Xg(),nV=1,iV=Object.prototype,aV=iV.hasOwnProperty;function oV(t,e,r,n,i,a){var o=r&nV,s=iE(t),u=s.length,l=iE(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var m=s[f];if(!(o?m in e:aV.call(e,m)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var R=!0;a.set(t,e),a.set(e,t);for(var P=o;++f<u;){m=s[f];var E=t[m],b=e[m];if(n)var S=o?n(b,E,m,e,t,a):n(E,b,m,t,e,a);if(!(S===void 0?E===b||i(E,b,r,n,a):S)){R=!1;break}P||(P=m=="constructor")}if(R&&!P){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(R=!1)}return a.delete(t),a.delete(e),R}aE.exports=oV});var hE=d((Vhe,pE)=>{var Jg=Mf(),sV=Kg(),uV=WP(),lV=oE(),sE=Qo(),uE=Oe(),lE=Uu(),cV=Lf(),fV=1,cE="[object Arguments]",fE="[object Array]",Bf="[object Object]",dV=Object.prototype,dE=dV.hasOwnProperty;function pV(t,e,r,n,i,a){var o=uE(t),s=uE(e),u=o?fE:sE(t),l=s?fE:sE(e);u=u==cE?Bf:u,l=l==cE?Bf:l;var c=u==Bf,f=l==Bf,m=u==l;if(m&&lE(t)){if(!lE(e))return!1;o=!0,c=!1}if(m&&!c)return a||(a=new Jg),o||cV(t)?sV(t,e,r,n,i,a):uV(t,e,u,r,n,i,a);if(!(r&fV)){var v=c&&dE.call(t,"__wrapped__"),y=f&&dE.call(e,"__wrapped__");if(v||y){var R=v?t.value():t,P=y?e.value():e;return a||(a=new Jg),i(R,P,r,n,a)}}return m?(a||(a=new Jg),lV(t,e,r,n,i,a)):!1}pE.exports=pV});var Qg=d((zhe,gE)=>{var hV=hE(),mE=Tn();function yE(t,e,r,n,i){return t===e?!0:t==null||e==null||!mE(t)&&!mE(e)?t!==t&&e!==e:hV(t,e,r,n,yE,i)}gE.exports=yE});var TE=d((Yhe,vE)=>{var mV=Mf(),yV=Qg(),gV=1,vV=2;function TV(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new mV;if(n)var m=n(l,c,u,t,e,f);if(!(m===void 0?yV(c,l,gV|vV,n,f):m))return!1}}return!0}vE.exports=TV});var Zg=d((Xhe,_E)=>{var _V=vn();function RV(t){return t===t&&!_V(t)}_E.exports=RV});var AE=d((Jhe,RE)=>{var AV=Zg(),SV=kr();function bV(t){for(var e=SV(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,AV(i)]}return e}RE.exports=bV});var ev=d((Qhe,SE)=>{function CV(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}SE.exports=CV});var CE=d((Zhe,bE)=>{var PV=TE(),EV=AE(),kV=ev();function NV(t){var e=EV(t);return e.length==1&&e[0][2]?kV(e[0][0],e[0][1]):function(r){return r===t||PV(r,t,e)}}bE.exports=NV});var us=d((eme,PE)=>{var wV=ia(),$V=Tn(),OV="[object Symbol]";function IV(t){return typeof t=="symbol"||$V(t)&&wV(t)==OV}PE.exports=IV});var Vf=d((tme,EE)=>{var DV=Oe(),xV=us(),LV=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,qV=/^\w*$/;function MV(t,e){if(DV(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||xV(t)?!0:qV.test(t)||!LV.test(t)||e!=null&&t in Object(e)}EE.exports=MV});var wE=d((rme,NE)=>{var kE=qf(),FV="Expected a function";function tv(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(FV);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(tv.Cache||kE),r}tv.Cache=kE;NE.exports=tv});var OE=d((nme,$E)=>{var jV=wE(),GV=500;function UV(t){var e=jV(t,function(n){return r.size===GV&&r.clear(),n}),r=e.cache;return e}$E.exports=UV});var DE=d((ime,IE)=>{var HV=OE(),KV=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,WV=/\\(\\)?/g,BV=HV(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(KV,function(r,n,i,a){e.push(i?a.replace(WV,"$1"):n||r)}),e});IE.exports=BV});var jE=d((ame,FE)=>{var xE=La(),VV=rs(),zV=Oe(),YV=us(),XV=1/0,LE=xE?xE.prototype:void 0,qE=LE?LE.toString:void 0;function ME(t){if(typeof t=="string")return t;if(zV(t))return VV(t,ME)+"";if(YV(t))return qE?qE.call(t):"";var e=t+"";return e=="0"&&1/t==-XV?"-0":e}FE.exports=ME});var rv=d((ome,GE)=>{var JV=jE();function QV(t){return t==null?"":JV(t)}GE.exports=QV});var Ju=d((sme,UE)=>{var ZV=Oe(),ez=Vf(),tz=DE(),rz=rv();function nz(t,e){return ZV(t)?t:ez(t,e)?[t]:tz(rz(t))}UE.exports=nz});var ls=d((ume,HE)=>{var iz=us(),az=1/0;function oz(t){if(typeof t=="string"||iz(t))return t;var e=t+"";return e=="0"&&1/t==-az?"-0":e}HE.exports=oz});var zf=d((lme,KE)=>{var sz=Ju(),uz=ls();function lz(t,e){e=sz(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[uz(e[r++])];return r&&r==n?t:void 0}KE.exports=lz});var BE=d((cme,WE)=>{var cz=zf();function fz(t,e,r){var n=t==null?void 0:cz(t,e);return n===void 0?r:n}WE.exports=fz});var zE=d((fme,VE)=>{function dz(t,e){return t!=null&&e in Object(t)}VE.exports=dz});var nv=d((dme,YE)=>{var pz=Ju(),hz=ju(),mz=Oe(),yz=Xu(),gz=xf(),vz=ls();function Tz(t,e,r){e=pz(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=vz(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&gz(i)&&yz(o,i)&&(mz(t)||hz(t)))}YE.exports=Tz});var JE=d((pme,XE)=>{var _z=zE(),Rz=nv();function Az(t,e){return t!=null&&Rz(t,e,_z)}XE.exports=Az});var ZE=d((hme,QE)=>{var Sz=Qg(),bz=BE(),Cz=JE(),Pz=Vf(),Ez=Zg(),kz=ev(),Nz=ls(),wz=1,$z=2;function Oz(t,e){return Pz(t)&&Ez(e)?kz(Nz(t),e):function(r){var n=bz(r,t);return n===void 0&&n===e?Cz(r,t):Sz(e,n,wz|$z)}}QE.exports=Oz});var Ma=d((mme,ek)=>{function Iz(t){return t}ek.exports=Iz});var rk=d((yme,tk)=>{function Dz(t){return function(e){return e?.[t]}}tk.exports=Dz});var ik=d((gme,nk)=>{var xz=zf();function Lz(t){return function(e){return xz(e,t)}}nk.exports=Lz});var ok=d((vme,ak)=>{var qz=rk(),Mz=ik(),Fz=Vf(),jz=ls();function Gz(t){return Fz(t)?qz(jz(t)):Mz(t)}ak.exports=Gz});var Vr=d((Tme,sk)=>{var Uz=CE(),Hz=ZE(),Kz=Ma(),Wz=Oe(),Bz=ok();function Vz(t){return typeof t=="function"?t:t==null?Kz:typeof t=="object"?Wz(t)?Hz(t[0],t[1]):Uz(t):Bz(t)}sk.exports=Vz});var lk=d((_me,uk)=>{function zz(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}uk.exports=zz});var fk=d((Rme,ck)=>{var Yz=lk(),Xz=Yz();ck.exports=Xz});var pk=d((Ame,dk)=>{var Jz=fk(),Qz=kr();function Zz(t,e){return t&&Jz(t,e,Qz)}dk.exports=Zz});var mk=d((Sme,hk)=>{var e8=_n();function t8(t,e){return function(r,n){if(r==null)return r;if(!e8(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}hk.exports=t8});var oa=d((bme,yk)=>{var r8=pk(),n8=mk(),i8=n8(r8);yk.exports=i8});var vk=d((Cme,gk)=>{var a8=oa(),o8=_n();function s8(t,e){var r=-1,n=o8(t)?Array(t.length):[];return a8(t,function(i,a,o){n[++r]=e(i,a,o)}),n}gk.exports=s8});var qt=d((Pme,Tk)=>{var u8=rs(),l8=Vr(),c8=vk(),f8=Oe();function d8(t,e){var r=f8(t)?u8:c8;return r(t,l8(e,3))}Tk.exports=d8});var iv=d((Eme,_k)=>{function p8(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}_k.exports=p8});var Ak=d((kme,Rk)=>{var h8=Ma();function m8(t){return typeof t=="function"?t:h8}Rk.exports=m8});var Mt=d((Nme,Sk)=>{var y8=iv(),g8=oa(),v8=Ak(),T8=Oe();function _8(t,e){var r=T8(t)?y8:g8;return r(t,v8(e))}Sk.exports=_8});var Ck=d((wme,bk)=>{var R8=rs();function A8(t,e){return R8(e,function(r){return t[r]})}bk.exports=A8});var Un=d(($me,Pk)=>{var S8=Ck(),b8=kr();function C8(t){return t==null?[]:S8(t,b8(t))}Pk.exports=C8});var kk=d((Ome,Ek)=>{var P8=Object.prototype,E8=P8.hasOwnProperty;function k8(t,e){return t!=null&&E8.call(t,e)}Ek.exports=k8});var Nr=d((Ime,Nk)=>{var N8=kk(),w8=nv();function $8(t,e){return t!=null&&w8(t,e,N8)}Nk.exports=$8});var av=d((Dme,wk)=>{var O8=aa(),I8=function(){try{var t=O8(Object,"defineProperty");return t({},"",{}),t}catch{}}();wk.exports=I8});var Yf=d((xme,Ok)=>{var $k=av();function D8(t,e,r){e=="__proto__"&&$k?$k(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}Ok.exports=D8});var Qu=d((Lme,Ik)=>{var x8=Yf(),L8=ns(),q8=Object.prototype,M8=q8.hasOwnProperty;function F8(t,e,r){var n=t[e];(!(M8.call(t,e)&&L8(n,r))||r===void 0&&!(e in t))&&x8(t,e,r)}Ik.exports=F8});var cs=d((qme,Dk)=>{var j8=Qu(),G8=Yf();function U8(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?G8(r,s,u):j8(r,s,u)}return r}Dk.exports=U8});var Lk=d((Mme,xk)=>{var H8=cs(),K8=kr();function W8(t,e){return t&&H8(e,K8(e),t)}xk.exports=W8});var Mk=d((Fme,qk)=>{function B8(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}qk.exports=B8});var jk=d((jme,Fk)=>{var V8=vn(),z8=Yo(),Y8=Mk(),X8=Object.prototype,J8=X8.hasOwnProperty;function Q8(t){if(!V8(t))return Y8(t);var e=z8(t),r=[];for(var n in t)n=="constructor"&&(e||!J8.call(t,n))||r.push(n);return r}Fk.exports=Q8});var Zu=d((Gme,Gk)=>{var Z8=Yg(),e7=jk(),t7=_n();function r7(t){return t7(t)?Z8(t,!0):e7(t)}Gk.exports=r7});var Hk=d((Ume,Uk)=>{var n7=cs(),i7=Zu();function a7(t,e){return t&&n7(e,i7(e),t)}Uk.exports=a7});var zk=d((el,fs)=>{var o7=gn(),Vk=typeof el=="object"&&el&&!el.nodeType&&el,Kk=Vk&&typeof fs=="object"&&fs&&!fs.nodeType&&fs,s7=Kk&&Kk.exports===Vk,Wk=s7?o7.Buffer:void 0,Bk=Wk?Wk.allocUnsafe:void 0;function u7(t,e){if(e)return t.slice();var r=t.length,n=Bk?Bk(r):new t.constructor(r);return t.copy(n),n}fs.exports=u7});var Xk=d((Hme,Yk)=>{function l7(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}Yk.exports=l7});var Qk=d((Kme,Jk)=>{var c7=cs(),f7=Wf();function d7(t,e){return c7(t,f7(t),e)}Jk.exports=d7});var ov=d((Wme,Zk)=>{var p7=$g(),h7=p7(Object.getPrototypeOf,Object);Zk.exports=h7});var sv=d((Bme,eN)=>{var m7=Hf(),y7=ov(),g7=Wf(),v7=zg(),T7=Object.getOwnPropertySymbols,_7=T7?function(t){for(var e=[];t;)m7(e,g7(t)),t=y7(t);return e}:v7;eN.exports=_7});var rN=d((Vme,tN)=>{var R7=cs(),A7=sv();function S7(t,e){return R7(t,A7(t),e)}tN.exports=S7});var uv=d((zme,nN)=>{var b7=Vg(),C7=sv(),P7=Zu();function E7(t){return b7(t,P7,C7)}nN.exports=E7});var aN=d((Yme,iN)=>{var k7=Object.prototype,N7=k7.hasOwnProperty;function w7(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&N7.call(t,"index")&&(r.index=t.index,r.input=t.input),r}iN.exports=w7});var Xf=d((Xme,sN)=>{var oN=Wg();function $7(t){var e=new t.constructor(t.byteLength);return new oN(e).set(new oN(t)),e}sN.exports=$7});var lN=d((Jme,uN)=>{var O7=Xf();function I7(t,e){var r=e?O7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}uN.exports=I7});var fN=d((Qme,cN)=>{var D7=/\w*$/;function x7(t){var e=new t.constructor(t.source,D7.exec(t));return e.lastIndex=t.lastIndex,e}cN.exports=x7});var yN=d((Zme,mN)=>{var dN=La(),pN=dN?dN.prototype:void 0,hN=pN?pN.valueOf:void 0;function L7(t){return hN?Object(hN.call(t)):{}}mN.exports=L7});var vN=d((eye,gN)=>{var q7=Xf();function M7(t,e){var r=e?q7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}gN.exports=M7});var _N=d((tye,TN)=>{var F7=Xf(),j7=lN(),G7=fN(),U7=yN(),H7=vN(),K7="[object Boolean]",W7="[object Date]",B7="[object Map]",V7="[object Number]",z7="[object RegExp]",Y7="[object Set]",X7="[object String]",J7="[object Symbol]",Q7="[object ArrayBuffer]",Z7="[object DataView]",e9="[object Float32Array]",t9="[object Float64Array]",r9="[object Int8Array]",n9="[object Int16Array]",i9="[object Int32Array]",a9="[object Uint8Array]",o9="[object Uint8ClampedArray]",s9="[object Uint16Array]",u9="[object Uint32Array]";function l9(t,e,r){var n=t.constructor;switch(e){case Q7:return F7(t);case K7:case W7:return new n(+t);case Z7:return j7(t,r);case e9:case t9:case r9:case n9:case i9:case a9:case o9:case s9:case u9:return H7(t,r);case B7:return new n;case V7:case X7:return new n(t);case z7:return G7(t);case Y7:return new n;case J7:return U7(t)}}TN.exports=l9});var SN=d((rye,AN)=>{var c9=vn(),RN=Object.create,f9=function(){function t(){}return function(e){if(!c9(e))return{};if(RN)return RN(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();AN.exports=f9});var CN=d((nye,bN)=>{var d9=SN(),p9=ov(),h9=Yo();function m9(t){return typeof t.constructor=="function"&&!h9(t)?d9(p9(t)):{}}bN.exports=m9});var EN=d((iye,PN)=>{var y9=Qo(),g9=Tn(),v9="[object Map]";function T9(t){return g9(t)&&y9(t)==v9}PN.exports=T9});var $N=d((aye,wN)=>{var _9=EN(),R9=es(),kN=Wu(),NN=kN&&kN.isMap,A9=NN?R9(NN):_9;wN.exports=A9});var IN=d((oye,ON)=>{var S9=Qo(),b9=Tn(),C9="[object Set]";function P9(t){return b9(t)&&S9(t)==C9}ON.exports=P9});var qN=d((sye,LN)=>{var E9=IN(),k9=es(),DN=Wu(),xN=DN&&DN.isSet,N9=xN?k9(xN):E9;LN.exports=N9});var UN=d((uye,GN)=>{var w9=Mf(),$9=iv(),O9=Qu(),I9=Lk(),D9=Hk(),x9=zk(),L9=Xk(),q9=Qk(),M9=rN(),F9=Xg(),j9=uv(),G9=Qo(),U9=aN(),H9=_N(),K9=CN(),W9=Oe(),B9=Uu(),V9=$N(),z9=vn(),Y9=qN(),X9=kr(),J9=Zu(),Q9=1,Z9=2,eY=4,MN="[object Arguments]",tY="[object Array]",rY="[object Boolean]",nY="[object Date]",iY="[object Error]",FN="[object Function]",aY="[object GeneratorFunction]",oY="[object Map]",sY="[object Number]",jN="[object Object]",uY="[object RegExp]",lY="[object Set]",cY="[object String]",fY="[object Symbol]",dY="[object WeakMap]",pY="[object ArrayBuffer]",hY="[object DataView]",mY="[object Float32Array]",yY="[object Float64Array]",gY="[object Int8Array]",vY="[object Int16Array]",TY="[object Int32Array]",_Y="[object Uint8Array]",RY="[object Uint8ClampedArray]",AY="[object Uint16Array]",SY="[object Uint32Array]",Ke={};Ke[MN]=Ke[tY]=Ke[pY]=Ke[hY]=Ke[rY]=Ke[nY]=Ke[mY]=Ke[yY]=Ke[gY]=Ke[vY]=Ke[TY]=Ke[oY]=Ke[sY]=Ke[jN]=Ke[uY]=Ke[lY]=Ke[cY]=Ke[fY]=Ke[_Y]=Ke[RY]=Ke[AY]=Ke[SY]=!0;Ke[iY]=Ke[FN]=Ke[dY]=!1;function Jf(t,e,r,n,i,a){var o,s=e&Q9,u=e&Z9,l=e&eY;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!z9(t))return t;var c=W9(t);if(c){if(o=U9(t),!s)return L9(t,o)}else{var f=G9(t),m=f==FN||f==aY;if(B9(t))return x9(t,s);if(f==jN||f==MN||m&&!i){if(o=u||m?{}:K9(t),!s)return u?M9(t,D9(o,t)):q9(t,I9(o,t))}else{if(!Ke[f])return i?t:{};o=H9(t,f,s)}}a||(a=new w9);var v=a.get(t);if(v)return v;a.set(t,o),Y9(t)?t.forEach(function(P){o.add(Jf(P,e,r,P,t,a))}):V9(t)&&t.forEach(function(P,E){o.set(E,Jf(P,e,r,E,t,a))});var y=l?u?j9:F9:u?J9:X9,R=c?void 0:y(t);return $9(R||t,function(P,E){R&&(E=P,P=t[E]),O9(o,E,Jf(P,e,r,E,t,a))}),o}GN.exports=Jf});var Ai=d((lye,HN)=>{var bY=UN(),CY=4;function PY(t){return bY(t,CY)}HN.exports=PY});var KN=d(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.PRINT_WARNING=ds.PRINT_ERROR=void 0;function EY(t){console&&console.error&&console.error("Error: ".concat(t))}ds.PRINT_ERROR=EY;function kY(t){console&&console.warn&&console.warn("Warning: ".concat(t))}ds.PRINT_WARNING=kY});var WN=d(Qf=>{"use strict";Object.defineProperty(Qf,"__esModule",{value:!0});Qf.timer=void 0;function NY(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}Qf.timer=NY});var BN=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var ps=d(Hn=>{"use strict";Object.defineProperty(Hn,"__esModule",{value:!0});Hn.toFastProperties=Hn.timer=Hn.PRINT_ERROR=Hn.PRINT_WARNING=void 0;var VN=KN();Object.defineProperty(Hn,"PRINT_WARNING",{enumerable:!0,get:function(){return VN.PRINT_WARNING}});Object.defineProperty(Hn,"PRINT_ERROR",{enumerable:!0,get:function(){return VN.PRINT_ERROR}});var wY=WN();Object.defineProperty(Hn,"timer",{enumerable:!0,get:function(){return wY.timer}});var $Y=BN();Object.defineProperty(Hn,"toFastProperties",{enumerable:!0,get:function(){return $Y.toFastProperties}})});var Zf=d((pye,zN)=>{function OY(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}zN.exports=OY});var XN=d((hye,YN)=>{var IY=/\s/;function DY(t){for(var e=t.length;e--&&IY.test(t.charAt(e)););return e}YN.exports=DY});var QN=d((mye,JN)=>{var xY=XN(),LY=/^\s+/;function qY(t){return t&&t.slice(0,xY(t)+1).replace(LY,"")}JN.exports=qY});var rw=d((yye,tw)=>{var MY=QN(),ZN=vn(),FY=us(),ew=0/0,jY=/^[-+]0x[0-9a-f]+$/i,GY=/^0b[01]+$/i,UY=/^0o[0-7]+$/i,HY=parseInt;function KY(t){if(typeof t=="number")return t;if(FY(t))return ew;if(ZN(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=ZN(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=MY(t);var r=GY.test(t);return r||UY.test(t)?HY(t.slice(2),r?2:8):jY.test(t)?ew:+t}tw.exports=KY});var aw=d((gye,iw)=>{var WY=rw(),nw=1/0,BY=17976931348623157e292;function VY(t){if(!t)return t===0?t:0;if(t=WY(t),t===nw||t===-nw){var e=t<0?-1:1;return e*BY}return t===t?t:0}iw.exports=VY});var hs=d((vye,ow)=>{var zY=aw();function YY(t){var e=zY(t),r=e%1;return e===e?r?e-r:e:0}ow.exports=YY});var ed=d((Tye,sw)=>{var XY=Zf(),JY=hs();function QY(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:JY(e),XY(t,e<0?0:e,n)):[]}sw.exports=QY});var tl=d((_ye,uw)=>{var ZY=ia(),eX=Oe(),tX=Tn(),rX="[object String]";function nX(t){return typeof t=="string"||!eX(t)&&tX(t)&&ZY(t)==rX}uw.exports=nX});var cw=d((Rye,lw)=>{var iX=ia(),aX=Tn(),oX="[object RegExp]";function sX(t){return aX(t)&&iX(t)==oX}lw.exports=sX});var lv=d((Aye,pw)=>{var uX=cw(),lX=es(),fw=Wu(),dw=fw&&fw.isRegExp,cX=dw?lX(dw):uX;pw.exports=cX});var yw=d((Sye,mw)=>{var fX=Qu(),dX=Ju(),pX=Xu(),hw=vn(),hX=ls();function mX(t,e,r,n){if(!hw(t))return t;e=dX(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=hX(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=hw(c)?c:pX(e[i+1])?[]:{})}fX(s,u,l),s=s[u]}return t}mw.exports=mX});var vw=d((bye,gw)=>{var yX=zf(),gX=yw(),vX=Ju();function TX(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=yX(t,o);r(s,o)&&gX(a,vX(o,t),s)}return a}gw.exports=TX});var cv=d((Cye,Tw)=>{var _X=rs(),RX=Vr(),AX=vw(),SX=uv();function bX(t,e){if(t==null)return{};var r=_X(SX(t),function(n){return[n]});return e=RX(e),AX(t,r,function(n,i){return e(n,i[0])})}Tw.exports=bX});var Rw=d((Pye,_w)=>{function CX(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}_w.exports=CX});var bw=d((Eye,Sw)=>{var PX=Rw(),Aw=Math.max;function EX(t,e,r){return e=Aw(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=Aw(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),PX(t,this,s)}}Sw.exports=EX});var Pw=d((kye,Cw)=>{function kX(t){return function(){return t}}Cw.exports=kX});var Nw=d((Nye,kw)=>{var NX=Pw(),Ew=av(),wX=Ma(),$X=Ew?function(t,e){return Ew(t,"toString",{configurable:!0,enumerable:!1,value:NX(e),writable:!0})}:wX;kw.exports=$X});var $w=d((wye,ww)=>{var OX=800,IX=16,DX=Date.now;function xX(t){var e=0,r=0;return function(){var n=DX(),i=IX-(n-r);if(r=n,i>0){if(++e>=OX)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}ww.exports=xX});var Iw=d(($ye,Ow)=>{var LX=Nw(),qX=$w(),MX=qX(LX);Ow.exports=MX});var td=d((Oye,Dw)=>{var FX=Ma(),jX=bw(),GX=Iw();function UX(t,e){return GX(jX(t,e,FX),t+"")}Dw.exports=UX});var rl=d((Iye,xw)=>{var HX=ns(),KX=_n(),WX=Xu(),BX=vn();function VX(t,e,r){if(!BX(r))return!1;var n=typeof e;return(n=="number"?KX(r)&&WX(e,r.length):n=="string"&&e in r)?HX(r[e],t):!1}xw.exports=VX});var qw=d((Dye,Lw)=>{var zX=td(),YX=rl();function XX(t){return zX(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&YX(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}Lw.exports=XX});var nl=d((xye,Mw)=>{var JX=Qu(),QX=cs(),ZX=qw(),eJ=_n(),tJ=Yo(),rJ=kr(),nJ=Object.prototype,iJ=nJ.hasOwnProperty,aJ=ZX(function(t,e){if(tJ(e)||eJ(e)){QX(e,rJ(e),t);return}for(var r in e)iJ.call(e,r)&&JX(t,r,e[r])});Mw.exports=aJ});var nd=d(Ce=>{"use strict";var Si=Ce&&Ce.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ms=Ce&&Ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ce,"__esModule",{value:!0});Ce.serializeProduction=Ce.serializeGrammar=Ce.Terminal=Ce.Alternation=Ce.RepetitionWithSeparator=Ce.Repetition=Ce.RepetitionMandatoryWithSeparator=Ce.RepetitionMandatory=Ce.Option=Ce.Alternative=Ce.Rule=Ce.NonTerminal=Ce.AbstractProduction=void 0;var Fw=ms(qt()),oJ=ms(Mt()),fv=ms(tl()),sJ=ms(lv()),Kn=ms(cv()),Wn=ms(nl());function uJ(t){return lJ(t)?t.LABEL:t.name}function lJ(t){return(0,fv.default)(t.LABEL)&&t.LABEL!==""}var Bn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,oJ.default)(this.definition,function(r){r.accept(e)})},t}();Ce.AbstractProduction=Bn;var jw=function(t){Si(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Bn);Ce.NonTerminal=jw;var Gw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Rule=Gw;var Uw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Alternative=Uw;var Hw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Option=Hw;var Kw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.RepetitionMandatory=Kw;var Ww=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.RepetitionMandatoryWithSeparator=Ww;var Bw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.Repetition=Bw;var Vw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return e}(Bn);Ce.RepetitionWithSeparator=Vw;var zw=function(t){Si(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Wn.default)(n,(0,Kn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Bn);Ce.Alternation=zw;var rd=function(){function t(e){this.idx=1,(0,Wn.default)(this,(0,Kn.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Ce.Terminal=rd;function cJ(t){return(0,Fw.default)(t,il)}Ce.serializeGrammar=cJ;function il(t){function e(a){return(0,Fw.default)(a,il)}if(t instanceof jw){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,fv.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof Uw)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Hw)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Kw)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ww)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:il(new rd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Vw)return{type:"RepetitionWithSeparator",idx:t.idx,separator:il(new rd({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Bw)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof zw)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof rd){var n={type:"Terminal",name:t.terminalType.name,label:uJ(t.terminalType),idx:t.idx};(0,fv.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,sJ.default)(i)?i.source:i),n}else{if(t instanceof Gw)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Ce.serializeProduction=il});var Yw=d(id=>{"use strict";Object.defineProperty(id,"__esModule",{value:!0});id.GAstVisitor=void 0;var Vn=nd(),fJ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case Vn.NonTerminal:return this.visitNonTerminal(r);case Vn.Alternative:return this.visitAlternative(r);case Vn.Option:return this.visitOption(r);case Vn.RepetitionMandatory:return this.visitRepetitionMandatory(r);case Vn.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case Vn.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case Vn.Repetition:return this.visitRepetition(r);case Vn.Alternation:return this.visitAlternation(r);case Vn.Terminal:return this.visitTerminal(r);case Vn.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();id.GAstVisitor=fJ});var Jw=d((Mye,Xw)=>{var dJ=oa();function pJ(t,e){var r;return dJ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}Xw.exports=pJ});var ad=d((Fye,Qw)=>{var hJ=Hg(),mJ=Vr(),yJ=Jw(),gJ=Oe(),vJ=rl();function TJ(t,e,r){var n=gJ(t)?hJ:yJ;return r&&vJ(t,e,r)&&(e=void 0),n(t,mJ(e,3))}Qw.exports=TJ});var e$=d((jye,Zw)=>{function _J(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}Zw.exports=_J});var r$=d((Gye,t$)=>{var RJ=oa();function AJ(t,e){var r=!0;return RJ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}t$.exports=AJ});var al=d((Uye,n$)=>{var SJ=e$(),bJ=r$(),CJ=Vr(),PJ=Oe(),EJ=rl();function kJ(t,e,r){var n=PJ(t)?SJ:bJ;return r&&EJ(t,e,r)&&(e=void 0),n(t,CJ(e,3))}n$.exports=kJ});var dv=d((Hye,i$)=>{function NJ(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}i$.exports=NJ});var o$=d((Kye,a$)=>{function wJ(t){return t!==t}a$.exports=wJ});var u$=d((Wye,s$)=>{function $J(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}s$.exports=$J});var od=d((Bye,l$)=>{var OJ=dv(),IJ=o$(),DJ=u$();function xJ(t,e,r){return e===e?DJ(t,e,r):OJ(t,IJ,r)}l$.exports=xJ});var bi=d((Vye,c$)=>{var LJ=od(),qJ=_n(),MJ=tl(),FJ=hs(),jJ=Un(),GJ=Math.max;function UJ(t,e,r,n){t=qJ(t)?t:jJ(t),r=r&&!n?FJ(r):0;var i=t.length;return r<0&&(r=GJ(i+r,0)),MJ(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&LJ(t,e,r)>-1}c$.exports=UJ});var f$=d(zr=>{"use strict";var hv=zr&&zr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zr,"__esModule",{value:!0});zr.getProductionDslName=zr.isBranchingProd=zr.isOptionalProd=zr.isSequenceProd=void 0;var HJ=hv(ad()),KJ=hv(al()),WJ=hv(bi()),rt=nd();function BJ(t){return t instanceof rt.Alternative||t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionMandatory||t instanceof rt.RepetitionMandatoryWithSeparator||t instanceof rt.RepetitionWithSeparator||t instanceof rt.Terminal||t instanceof rt.Rule}zr.isSequenceProd=BJ;function pv(t,e){e===void 0&&(e=[]);var r=t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionWithSeparator;return r?!0:t instanceof rt.Alternation?(0,HJ.default)(t.definition,function(n){return pv(n,e)}):t instanceof rt.NonTerminal&&(0,WJ.default)(e,t)?!1:t instanceof rt.AbstractProduction?(t instanceof rt.NonTerminal&&e.push(t),(0,KJ.default)(t.definition,function(n){return pv(n,e)})):!1}zr.isOptionalProd=pv;function VJ(t){return t instanceof rt.Alternation}zr.isBranchingProd=VJ;function zJ(t){if(t instanceof rt.NonTerminal)return"SUBRULE";if(t instanceof rt.Option)return"OPTION";if(t instanceof rt.Alternation)return"OR";if(t instanceof rt.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof rt.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof rt.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof rt.Repetition)return"MANY";if(t instanceof rt.Terminal)return"CONSUME";throw Error("non exhaustive match")}zr.getProductionDslName=zJ});var dt=d(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.isSequenceProd=he.isBranchingProd=he.isOptionalProd=he.getProductionDslName=he.GAstVisitor=he.serializeProduction=he.serializeGrammar=he.Alternative=he.Alternation=he.RepetitionWithSeparator=he.RepetitionMandatoryWithSeparator=he.RepetitionMandatory=he.Repetition=he.Option=he.NonTerminal=he.Terminal=he.Rule=void 0;var Yr=nd();Object.defineProperty(he,"Rule",{enumerable:!0,get:function(){return Yr.Rule}});Object.defineProperty(he,"Terminal",{enumerable:!0,get:function(){return Yr.Terminal}});Object.defineProperty(he,"NonTerminal",{enumerable:!0,get:function(){return Yr.NonTerminal}});Object.defineProperty(he,"Option",{enumerable:!0,get:function(){return Yr.Option}});Object.defineProperty(he,"Repetition",{enumerable:!0,get:function(){return Yr.Repetition}});Object.defineProperty(he,"RepetitionMandatory",{enumerable:!0,get:function(){return Yr.RepetitionMandatory}});Object.defineProperty(he,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Yr.RepetitionMandatoryWithSeparator}});Object.defineProperty(he,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Yr.RepetitionWithSeparator}});Object.defineProperty(he,"Alternation",{enumerable:!0,get:function(){return Yr.Alternation}});Object.defineProperty(he,"Alternative",{enumerable:!0,get:function(){return Yr.Alternative}});Object.defineProperty(he,"serializeGrammar",{enumerable:!0,get:function(){return Yr.serializeGrammar}});Object.defineProperty(he,"serializeProduction",{enumerable:!0,get:function(){return Yr.serializeProduction}});var YJ=Yw();Object.defineProperty(he,"GAstVisitor",{enumerable:!0,get:function(){return YJ.GAstVisitor}});var sd=f$();Object.defineProperty(he,"getProductionDslName",{enumerable:!0,get:function(){return sd.getProductionDslName}});Object.defineProperty(he,"isOptionalProd",{enumerable:!0,get:function(){return sd.isOptionalProd}});Object.defineProperty(he,"isBranchingProd",{enumerable:!0,get:function(){return sd.isBranchingProd}});Object.defineProperty(he,"isSequenceProd",{enumerable:!0,get:function(){return sd.isSequenceProd}})});var ud=d(ys=>{"use strict";var h$=ys&&ys.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ys,"__esModule",{value:!0});ys.RestWalker=void 0;var XJ=h$(ed()),d$=h$(Mt()),Tr=dt(),JJ=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,d$.default)(e.definition,function(i,a){var o=(0,XJ.default)(e.definition,a+1);if(i instanceof Tr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof Tr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof Tr.Alternative)n.walkFlat(i,o,r);else if(i instanceof Tr.Option)n.walkOption(i,o,r);else if(i instanceof Tr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof Tr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof Tr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof Tr.Repetition)n.walkMany(i,o,r);else if(i instanceof Tr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Tr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=p$(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Tr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=p$(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,d$.default)(e.definition,function(o){var s=new Tr.Alternative({definition:[o]});i.walk(s,a)})},t}();ys.RestWalker=JJ;function p$(t,e,r){var n=[new Tr.Option({definition:[new Tr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var v$=d((Jye,g$)=>{var m$=La(),QJ=ju(),ZJ=Oe(),y$=m$?m$.isConcatSpreadable:void 0;function eQ(t){return ZJ(t)||QJ(t)||!!(y$&&t&&t[y$])}g$.exports=eQ});var ld=d((Qye,_$)=>{var tQ=Hf(),rQ=v$();function T$(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=rQ),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?T$(s,e-1,r,n,i):tQ(i,s):n||(i[i.length]=s)}return i}_$.exports=T$});var Rn=d((Zye,R$)=>{var nQ=ld();function iQ(t){var e=t==null?0:t.length;return e?nQ(t,1):[]}R$.exports=iQ});var mv=d((ege,A$)=>{var aQ=od();function oQ(t,e){var r=t==null?0:t.length;return!!r&&aQ(t,e,0)>-1}A$.exports=oQ});var yv=d((tge,S$)=>{function sQ(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}S$.exports=sQ});var cd=d((rge,b$)=>{function uQ(){}b$.exports=uQ});var P$=d((nge,C$)=>{var gv=Lg(),lQ=cd(),cQ=Uf(),fQ=1/0,dQ=gv&&1/cQ(new gv([,-0]))[1]==fQ?function(t){return new gv(t)}:lQ;C$.exports=dQ});var vv=d((ige,E$)=>{var pQ=jf(),hQ=mv(),mQ=yv(),yQ=Gf(),gQ=P$(),vQ=Uf(),TQ=200;function _Q(t,e,r){var n=-1,i=hQ,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=mQ;else if(a>=TQ){var l=e?null:gQ(t);if(l)return vQ(l);o=!1,i=yQ,u=new pQ}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var m=u.length;m--;)if(u[m]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}E$.exports=_Q});var fd=d((age,k$)=>{var RQ=vv();function AQ(t){return t&&t.length?RQ(t):[]}k$.exports=AQ});var Rv=d(Xr=>{"use strict";var _v=Xr&&Xr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xr,"__esModule",{value:!0});Xr.firstForTerminal=Xr.firstForBranching=Xr.firstForSequence=Xr.first=void 0;var SQ=_v(Rn()),w$=_v(fd()),bQ=_v(qt()),N$=dt(),Tv=dt();function dd(t){if(t instanceof N$.NonTerminal)return dd(t.referencedRule);if(t instanceof N$.Terminal)return I$(t);if((0,Tv.isSequenceProd)(t))return $$(t);if((0,Tv.isBranchingProd)(t))return O$(t);throw Error("non exhaustive match")}Xr.first=dd;function $$(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,Tv.isOptionalProd)(a),e=e.concat(dd(a)),n=n+1,i=r.length>n;return(0,w$.default)(e)}Xr.firstForSequence=$$;function O$(t){var e=(0,bQ.default)(t.definition,function(r){return dd(r)});return(0,w$.default)((0,SQ.default)(e))}Xr.firstForBranching=O$;function I$(t){return[t.terminalType]}Xr.firstForTerminal=I$});var Av=d(pd=>{"use strict";Object.defineProperty(pd,"__esModule",{value:!0});pd.IN=void 0;pd.IN="_~IN~_"});var M$=d(_r=>{"use strict";var CQ=_r&&_r.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),D$=_r&&_r.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_r,"__esModule",{value:!0});_r.buildInProdFollowPrefix=_r.buildBetweenProdsFollowPrefix=_r.computeAllProdsFollows=_r.ResyncFollowsWalker=void 0;var PQ=ud(),EQ=Rv(),kQ=D$(Mt()),NQ=D$(nl()),x$=Av(),wQ=dt(),L$=function(t){CQ(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=q$(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new wQ.Alternative({definition:o}),u=(0,EQ.first)(s);this.follows[a]=u},e}(PQ.RestWalker);_r.ResyncFollowsWalker=L$;function $Q(t){var e={};return(0,kQ.default)(t,function(r){var n=new L$(r).startWalking();(0,NQ.default)(e,n)}),e}_r.computeAllProdsFollows=$Q;function q$(t,e){return t.name+e+x$.IN}_r.buildBetweenProdsFollowPrefix=q$;function OQ(t){var e=t.terminalType.name;return e+t.idx+x$.IN}_r.buildInProdFollowPrefix=OQ});var Fa=d((lge,F$)=>{function IQ(t){return t===void 0}F$.exports=IQ});var G$=d((cge,j$)=>{function DQ(t){return t&&t.length?t[0]:void 0}j$.exports=DQ});var gs=d((fge,U$)=>{U$.exports=G$()});var ol=d((dge,H$)=>{function xQ(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}H$.exports=xQ});var Sv=d((pge,K$)=>{var LQ=oa();function qQ(t,e){var r=[];return LQ(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}K$.exports=qQ});var B$=d((hge,W$)=>{var MQ="Expected a function";function FQ(t){if(typeof t!="function")throw new TypeError(MQ);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}W$.exports=FQ});var hd=d((mge,V$)=>{var jQ=Kf(),GQ=Sv(),UQ=Vr(),HQ=Oe(),KQ=B$();function WQ(t,e){var r=HQ(t)?jQ:GQ;return r(t,KQ(UQ(e,3)))}V$.exports=WQ});var Y$=d((yge,z$)=>{var BQ=jf(),VQ=mv(),zQ=yv(),YQ=rs(),XQ=es(),JQ=Gf(),QQ=200;function ZQ(t,e,r,n){var i=-1,a=VQ,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=YQ(e,XQ(r))),n?(a=zQ,o=!1):e.length>=QQ&&(a=JQ,o=!1,e=new BQ(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}z$.exports=ZQ});var J$=d((gge,X$)=>{var eZ=_n(),tZ=Tn();function rZ(t){return tZ(t)&&eZ(t)}X$.exports=rZ});var md=d((vge,Z$)=>{var nZ=Y$(),iZ=ld(),aZ=td(),Q$=J$(),oZ=aZ(function(t,e){return Q$(t)?nZ(t,iZ(e,1,Q$,!0)):[]});Z$.exports=oZ});var tO=d((Tge,eO)=>{var sZ=od(),uZ=hs(),lZ=Math.max;function cZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:uZ(r);return i<0&&(i=lZ(n+i,0)),sZ(t,e,i)}eO.exports=cZ});var nO=d((_ge,rO)=>{var fZ=Vr(),dZ=_n(),pZ=kr();function hZ(t){return function(e,r,n){var i=Object(e);if(!dZ(e)){var a=fZ(r,3);e=pZ(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}rO.exports=hZ});var aO=d((Rge,iO)=>{var mZ=dv(),yZ=Vr(),gZ=hs(),vZ=Math.max;function TZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:gZ(r);return i<0&&(i=vZ(n+i,0)),mZ(t,yZ(e,3),i)}iO.exports=TZ});var yd=d((Age,oO)=>{var _Z=nO(),RZ=aO(),AZ=_Z(RZ);oO.exports=AZ});var sl=d((Sge,sO)=>{var SZ=Kf(),bZ=Sv(),CZ=Vr(),PZ=Oe();function EZ(t,e){var r=PZ(t)?SZ:bZ;return r(t,CZ(e,3))}sO.exports=EZ});var bv=d((bge,lO)=>{var kZ=td(),NZ=ns(),wZ=rl(),$Z=Zu(),uO=Object.prototype,OZ=uO.hasOwnProperty,IZ=kZ(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&wZ(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=$Z(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||NZ(c,uO[l])&&!OZ.call(t,l))&&(t[l]=a[l])}return t});lO.exports=IZ});var fO=d((Cge,cO)=>{function DZ(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}cO.exports=DZ});var pO=d((Pge,dO)=>{function xZ(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}dO.exports=xZ});var Ci=d((Ege,hO)=>{var LZ=fO(),qZ=oa(),MZ=Vr(),FZ=pO(),jZ=Oe();function GZ(t,e,r){var n=jZ(t)?LZ:FZ,i=arguments.length<3;return n(t,MZ(e,4),r,i,qZ)}hO.exports=GZ});var vd=d(vs=>{"use strict";Object.defineProperty(vs,"__esModule",{value:!0});vs.clearRegExpParserCache=vs.getRegExpAst=void 0;var UZ=$u(),gd={},HZ=new UZ.RegExpParser;function KZ(t){var e=t.toString();if(gd.hasOwnProperty(e))return gd[e];var r=HZ.pattern(e);return gd[e]=r,r}vs.getRegExpAst=KZ;function WZ(){gd={}}vs.clearRegExpParserCache=WZ});var _O=d(rr=>{"use strict";var BZ=rr&&rr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ts=rr&&rr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(rr,"__esModule",{value:!0});rr.canMatchCharCode=rr.firstCharOptimizedIndices=rr.getOptimizedStartCodesIndices=rr.failedOptimizationPrefixMsg=void 0;var gO=$u(),VZ=Ts(Oe()),zZ=Ts(al()),YZ=Ts(Mt()),Cv=Ts(yd()),XZ=Ts(Un()),Ev=Ts(bi()),mO=ps(),vO=vd(),Pi=kv(),TO="Complement Sets are not supported for first char optimization";rr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function JZ(t,e){e===void 0&&(e=!1);try{var r=(0,vO.getRegExpAst)(t),n=_d(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===TO)e&&(0,mO.PRINT_WARNING)("".concat(rr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,mO.PRINT_ERROR)("".concat(rr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(gO.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}rr.getOptimizedStartCodesIndices=JZ;function _d(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)_d(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":Td(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(TO);(0,YZ.default)(o.value,function(l){if(typeof l=="number")Td(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)Td(f,e,r);else{for(var f=c.from;f<=c.to&&f<Pi.minOptimizationVal;f++)Td(f,e,r);if(c.to>=Pi.minOptimizationVal)for(var m=c.from>=Pi.minOptimizationVal?c.from:Pi.minOptimizationVal,v=c.to,y=(0,Pi.charCodeToOptimizedIndex)(m),R=(0,Pi.charCodeToOptimizedIndex)(v),P=y;P<=R;P++)e[P]=P}}});break;case"Group":_d(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&Pv(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,XZ.default)(e)}rr.firstCharOptimizedIndices=_d;function Td(t,e,r){var n=(0,Pi.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&QZ(t,e)}function QZ(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Pi.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Pi.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function yO(t,e){return(0,Cv.default)(t.value,function(r){if(typeof r=="number")return(0,Ev.default)(e,r);var n=r;return(0,Cv.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function Pv(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,VZ.default)(t.value)?(0,zZ.default)(t.value,Pv):Pv(t.value):!1}var ZZ=function(t){BZ(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,Ev.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?yO(r,this.targetCharCodes)===void 0&&(this.found=!0):yO(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(gO.BaseRegExpVisitor);function eee(t,e){if(e instanceof RegExp){var r=(0,vO.getRegExpAst)(e),n=new ZZ(t);return n.visit(r),n.found}else return(0,Cv.default)(e,function(i){return(0,Ev.default)(t,i.charCodeAt(0))})!==void 0}rr.canMatchCharCode=eee});var kv=d(K=>{"use strict";var SO=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),lt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var bO=$u(),De=ul(),tee=lt(gs()),CO=lt(Er()),PO=lt(ol()),Ad=lt(Oe()),ree=lt(Un()),nee=lt(Rn()),EO=lt(hd()),kO=lt(md()),RO=lt(tO()),nt=lt(qt()),Ei=lt(Mt()),ki=lt(tl()),bd=lt(Xo()),wv=lt(Fa()),iee=lt(yd()),nr=lt(Nr()),aee=lt(kr()),sa=lt(lv()),zn=lt(sl()),oee=lt(bv()),Sd=lt(Ci()),Cd=lt(bi()),AO=ps(),_s=_O(),NO=vd(),ja="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function see(){K.SUPPORT_STICKY=!1}K.disableSticky=see;function uee(){K.SUPPORT_STICKY=!0}K.enableSticky=uee;function lee(t,e){e=(0,oee.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(b,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){Tee()});var n;r("Reject Lexer.NA",function(){n=(0,EO.default)(t,function(b){return b[ja]===De.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,nt.default)(n,function(b){var S=b[ja];if((0,sa.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,Cd.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?Ov(S):$v(S)}else{if((0,bd.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?Ov(W):$v(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,nt.default)(n,function(b){return b.tokenTypeIdx}),s=(0,nt.default)(n,function(b){var S=b.GROUP;if(S!==De.Lexer.SKIPPED){if((0,ki.default)(S))return S;if((0,wv.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,nt.default)(n,function(b){var S=b.LONGER_ALT;if(S){var O=(0,Ad.default)(S)?(0,nt.default)(S,function(F){return(0,RO.default)(n,F)}):[(0,RO.default)(n,S)];return O}}),l=(0,nt.default)(n,function(b){return b.PUSH_MODE}),c=(0,nt.default)(n,function(b){return(0,nr.default)(b,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var b=HO(e.lineTerminatorCharacters);f=(0,nt.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,nt.default)(n,function(S){return(0,nr.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:GO(S,b)===!1&&(0,_s.canMatchCharCode)(b,S.PATTERN)}))});var m,v,y,R;r("Misc Mapping #2",function(){m=(0,nt.default)(n,Dv),v=(0,nt.default)(a,jO),y=(0,Sd.default)(n,function(b,S){var O=S.GROUP;return(0,ki.default)(O)&&O!==De.Lexer.SKIPPED&&(b[O]=[]),b},{}),R=(0,nt.default)(a,function(b,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:f[S],isCustom:m[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var P=!0,E=[];return e.safeMode||r("First Char Optimization",function(){E=(0,Sd.default)(n,function(b,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=Iv(F);Nv(b,W,R[O])}else if((0,Ad.default)(S.START_CHARS_HINT)){var re;(0,Ei.default)(S.START_CHARS_HINT,function(V){var Ae=typeof V=="string"?V.charCodeAt(0):V,Ye=Iv(Ae);re!==Ye&&(re=Ye,Nv(b,Ye,R[O]))})}else if((0,sa.default)(S.PATTERN))if(S.PATTERN.unicode)P=!1,e.ensureOptimizations&&(0,AO.PRINT_ERROR)("".concat(_s.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var Ne=(0,_s.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,CO.default)(Ne)&&(P=!1),(0,Ei.default)(Ne,function(V){Nv(b,V,R[O])})}else e.ensureOptimizations&&(0,AO.PRINT_ERROR)("".concat(_s.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),P=!1;return b},[])}),{emptyGroups:y,patternIdxToConfig:R,charCodeToPatternIdxToConfig:E,hasCustom:i,canBeOptimized:P}}K.analyzeTokenTypes=lee;function cee(t,e){var r=[],n=wO(t);r=r.concat(n.errors);var i=$O(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(fee(a)),r=r.concat(qO(a)),r=r.concat(MO(a,e)),r=r.concat(FO(a)),r}K.validatePatterns=cee;function fee(t){var e=[],r=(0,zn.default)(t,function(n){return(0,sa.default)(n[ja])});return e=e.concat(OO(r)),e=e.concat(DO(r)),e=e.concat(xO(r)),e=e.concat(LO(r)),e=e.concat(IO(r)),e}function wO(t){var e=(0,zn.default)(t,function(i){return!(0,nr.default)(i,ja)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:De.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,kO.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=wO;function $O(t){var e=(0,zn.default)(t,function(i){var a=i[ja];return!(0,sa.default)(a)&&!(0,bd.default)(a)&&!(0,nr.default)(a,"exec")&&!(0,ki.default)(a)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:De.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,kO.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=$O;var dee=/[^\\][$]/;function OO(t){var e=function(i){SO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(bO.BaseRegExpVisitor),r=(0,zn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,NO.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return dee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=OO;function IO(t){var e=(0,zn.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:De.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=IO;var pee=/[^\\[][\^]|^\^/;function DO(t){var e=function(i){SO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(bO.BaseRegExpVisitor),r=(0,zn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,NO.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return pee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=DO;function xO(t){var e=(0,zn.default)(t,function(n){var i=n[ja];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:De.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=xO;function LO(t){var e=[],r=(0,nt.default)(t,function(a){return(0,Sd.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,Cd.default)(e,s)&&s.PATTERN!==De.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,PO.default)(r);var n=(0,zn.default)(r,function(a){return a.length>1}),i=(0,nt.default)(n,function(a){var o=(0,nt.default)(a,function(u){return u.name}),s=(0,tee.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:De.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=LO;function qO(t){var e=(0,zn.default)(t,function(n){if(!(0,nr.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==De.Lexer.SKIPPED&&i!==De.Lexer.NA&&!(0,ki.default)(i)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:De.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=qO;function MO(t,e){var r=(0,zn.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,Cd.default)(e,i.PUSH_MODE)}),n=(0,nt.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:De.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=MO;function FO(t){var e=[],r=(0,Sd.default)(t,function(n,i,a){var o=i.PATTERN;return o===De.Lexer.NA||((0,ki.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,sa.default)(o)&&mee(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,Ei.default)(t,function(n,i){(0,Ei.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&hee(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:De.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=FO;function hee(t,e){if((0,sa.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,bd.default)(e))return e(t,0,[],{});if((0,nr.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function mee(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,iee.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function $v(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=$v;function Ov(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=Ov;function yee(t,e,r){var n=[];return(0,nr.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,nr.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,nr.default)(t,K.MODES)&&(0,nr.default)(t,K.DEFAULT_MODE)&&!(0,nr.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,nr.default)(t,K.MODES)&&(0,Ei.default)(t.modes,function(i,a){(0,Ei.default)(i,function(o,s){if((0,wv.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:De.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,nr.default)(o,"LONGER_ALT")){var u=(0,Ad.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,Ei.default)(u,function(l){!(0,wv.default)(l)&&!(0,Cd.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=yee;function gee(t,e,r){var n=[],i=!1,a=(0,PO.default)((0,nee.default)((0,ree.default)(t.modes))),o=(0,EO.default)(a,function(u){return u[ja]===De.Lexer.NA}),s=HO(r);return e&&(0,Ei.default)(o,function(u){var l=GO(u,s);if(l!==!1){var c=UO(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,nr.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,_s.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:De.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=gee;function vee(t){var e={},r=(0,aee.default)(t);return(0,Ei.default)(r,function(n){var i=t[n];if((0,Ad.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=vee;function Dv(t){var e=t.PATTERN;if((0,sa.default)(e))return!1;if((0,bd.default)(e))return!0;if((0,nr.default)(e,"exec"))return!0;if((0,ki.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=Dv;function jO(t){return(0,ki.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=jO;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function GO(t,e){if((0,nr.default)(t,"LINE_BREAKS"))return!1;if((0,sa.default)(t.PATTERN)){try{(0,_s.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,ki.default)(t.PATTERN))return!1;if(Dv(t))return{issue:De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function UO(t,e){if(e.issue===De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=UO;function HO(t){var e=(0,nt.default)(t,function(r){return(0,ki.default)(r)?r.charCodeAt(0):r});return e}function Nv(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var Rd=[];function Iv(t){return t<K.minOptimizationVal?t:Rd[t]}K.charCodeToOptimizedIndex=Iv;function Tee(){if((0,CO.default)(Rd)){Rd=new Array(65536);for(var t=0;t<65536;t++)Rd[t]=t>255?255+~~(t/255):t}}});var Pd=d(($ge,KO)=>{function _ee(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}KO.exports=_ee});var Ua=d(fe=>{"use strict";var Yn=fe&&fe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fe,"__esModule",{value:!0});fe.isTokenType=fe.hasExtendingTokensTypesMapProperty=fe.hasExtendingTokensTypesProperty=fe.hasCategoriesProperty=fe.hasShortKeyProperty=fe.singleAssignCategoriesToksMap=fe.assignCategoriesMapProp=fe.assignCategoriesTokensProp=fe.assignTokenDefaultProps=fe.expandCategories=fe.augmentTokenTypes=fe.tokenIdxToClass=fe.tokenShortNameIdx=fe.tokenStructuredMatcherNoCategories=fe.tokenStructuredMatcher=void 0;var Ree=Yn(Er()),Aee=Yn(ol()),See=Yn(Oe()),bee=Yn(Rn()),Cee=Yn(md()),Pee=Yn(qt()),Ga=Yn(Mt()),ll=Yn(Nr()),Eee=Yn(bi()),kee=Yn(Ai());function Nee(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}fe.tokenStructuredMatcher=Nee;function wee(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}fe.tokenStructuredMatcherNoCategories=wee;fe.tokenShortNameIdx=1;fe.tokenIdxToClass={};function $ee(t){var e=WO(t);BO(e),zO(e),VO(e),(0,Ga.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}fe.augmentTokenTypes=$ee;function WO(t){for(var e=(0,kee.default)(t),r=t,n=!0;n;){r=(0,Aee.default)((0,bee.default)((0,Pee.default)(r,function(a){return a.CATEGORIES})));var i=(0,Cee.default)(r,e);e=e.concat(i),(0,Ree.default)(i)?n=!1:r=i}return e}fe.expandCategories=WO;function BO(t){(0,Ga.default)(t,function(e){YO(e)||(fe.tokenIdxToClass[fe.tokenShortNameIdx]=e,e.tokenTypeIdx=fe.tokenShortNameIdx++),xv(e)&&!(0,See.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),xv(e)||(e.CATEGORIES=[]),XO(e)||(e.categoryMatches=[]),JO(e)||(e.categoryMatchesMap={})})}fe.assignTokenDefaultProps=BO;function VO(t){(0,Ga.default)(t,function(e){e.categoryMatches=[],(0,Ga.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(fe.tokenIdxToClass[n].tokenTypeIdx)})})}fe.assignCategoriesTokensProp=VO;function zO(t){(0,Ga.default)(t,function(e){Lv([],e)})}fe.assignCategoriesMapProp=zO;function Lv(t,e){(0,Ga.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,Ga.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,Eee.default)(n,r)||Lv(n,r)})}fe.singleAssignCategoriesToksMap=Lv;function YO(t){return(0,ll.default)(t,"tokenTypeIdx")}fe.hasShortKeyProperty=YO;function xv(t){return(0,ll.default)(t,"CATEGORIES")}fe.hasCategoriesProperty=xv;function XO(t){return(0,ll.default)(t,"categoryMatches")}fe.hasExtendingTokensTypesProperty=XO;function JO(t){return(0,ll.default)(t,"categoryMatchesMap")}fe.hasExtendingTokensTypesMapProperty=JO;function Oee(t){return(0,ll.default)(t,"tokenTypeIdx")}fe.isTokenType=Oee});var qv=d(Ed=>{"use strict";Object.defineProperty(Ed,"__esModule",{value:!0});Ed.defaultLexerErrorProvider=void 0;Ed.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var ul=d(wi=>{"use strict";var wr=wi&&wi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wi,"__esModule",{value:!0});wi.Lexer=wi.LexerDefinitionErrorType=void 0;var Ni=kv(),Mv=wr(cd()),kd=wr(Er()),Iee=wr(Oe()),Dee=wr(Pd()),xee=wr(hd()),QO=wr(qt()),Fv=wr(Mt()),Lee=wr(kr()),qee=wr(Fa()),ZO=wr(Ma()),e1=wr(nl()),Mee=wr(Ci()),t1=wr(Ai()),jv=ps(),Fee=Ua(),jee=qv(),Gee=vd(),Uee;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Uee=wi.LexerDefinitionErrorType||(wi.LexerDefinitionErrorType={}));var cl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:jee.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(cl);var Hee=function(){function t(e,r){r===void 0&&(r=cl);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,jv.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,e1.default)({},cl,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===cl.lineTerminatorsPattern)n.config.lineTerminatorsPattern=Ni.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===cl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,Iee.default)(e)?a={modes:{defaultMode:(0,t1.default)(e)},defaultMode:Ni.DEFAULT_MODE}:(o=!1,a=(0,t1.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Ni.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,Ni.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,Fv.default)(a.modes,function(c,f){a.modes[f]=(0,xee.default)(c,function(m){return(0,qee.default)(m)})});var s=(0,Lee.default)(a.modes);if((0,Fv.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,Ni.validatePatterns)(c,s))}),(0,kd.default)(n.lexerDefinitionErrors)){(0,Fee.augmentTokenTypes)(c);var m;n.TRACE_INIT("analyzeTokenTypes",function(){m=(0,Ni.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=m.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=m.charCodeToPatternIdxToConfig,n.emptyGroups=(0,e1.default)({},n.emptyGroups,m.emptyGroups),n.hasCustom=m.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=m.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,kd.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,QO.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,Fv.default)(n.lexerDefinitionWarning,function(c){(0,jv.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(Ni.SUPPORT_STICKY?(n.chopInput=ZO.default,n.match=n.matchWithTest):(n.updateLastIndex=Mv.default,n.match=n.matchWithExec),o&&(n.handleModes=Mv.default),n.trackStartLines===!1&&(n.computeNewColumn=ZO.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=Mv.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Mee.default)(n.canModeBeOptimized,function(f,m,v){return m===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,kd.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,Gee.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,jv.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,kd.default)(this.lexerDefinitionErrors)){var n=(0,QO.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,m,v,y,R,P,E,b,S,O=e,F=O.length,W=0,re=0,Ne=this.hasCustom?0:Math.floor(e.length/10),V=new Array(Ne),Ae=[],Ye=this.trackStartLines?1:void 0,We=this.trackStartLines?1:void 0,q=(0,Ni.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,oe=[],se=[],ee=[],st=[];Object.freeze(st);var Xe;function Ct(){return oe}function en($t){var rn=(0,Ni.charCodeToOptimizedIndex)($t),nn=se[rn];return nn===void 0?st:nn}var Sr=function($t){if(ee.length===1&&$t.tokenType.PUSH_MODE===void 0){var rn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage($t);Ae.push({offset:$t.startOffset,line:$t.startLine,column:$t.startColumn,length:$t.image.length,message:rn})}else{ee.pop();var nn=(0,Dee.default)(ee);oe=n.patternIdxToConfig[nn],se=n.charCodeToPatternIdxToConfig[nn],B=oe.length;var Nn=n.canModeBeOptimized[nn]&&n.config.safeMode===!1;se&&Nn?Xe=en:Xe=Ct}};function io($t){ee.push($t),se=this.charCodeToPatternIdxToConfig[$t],oe=this.patternIdxToConfig[$t],B=oe.length,B=oe.length;var rn=this.canModeBeOptimized[$t]&&this.config.safeMode===!1;se&&rn?Xe=en:Xe=Ct}io.call(this,r);for(var ar,ao=this.config.recoveryEnabled;W<F;){l=null;var oo=O.charCodeAt(W),so=Xe(oo),nu=so.length;for(i=0;i<nu;i++){ar=so[i];var ct=ar.pattern;c=null;var si=ar.short;if(si!==!1?oo===si&&(l=ct):ar.isCustom===!0?(S=ct.exec(O,W,V,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(ct,W),l=this.match(ct,e,W)),l!==null){if(u=ar.longerAlt,u!==void 0){var iu=u.length;for(o=0;o<iu;o++){var Pn=oe[u[o]],Ra=Pn.pattern;if(f=null,Pn.isCustom===!0?(S=Ra.exec(O,W,V,q),S!==null?(s=S[0],S.payload!==void 0&&(f=S.payload)):s=null):(this.updateLastIndex(Ra,W),s=this.match(Ra,e,W)),s&&s.length>l.length){l=s,c=f,ar=Pn;break}}}break}}if(l!==null){if(m=l.length,v=ar.group,v!==void 0&&(y=ar.tokenTypeIdx,R=this.createTokenInstance(l,W,y,ar.tokenType,Ye,We,m),this.handlePayload(R,c),v===!1?re=this.addToken(V,re,R):q[v].push(R)),e=this.chopInput(e,m),W=W+m,We=this.computeNewColumn(We,m),L===!0&&ar.canLineTerminator===!0){var En=0,Aa=void 0,Dr=void 0;j.lastIndex=0;do Aa=j.test(l),Aa===!0&&(Dr=j.lastIndex-1,En++);while(Aa===!0);En!==0&&(Ye=Ye+En,We=m-Dr,this.updateTokenEndLineColumnLocation(R,v,Dr,En,Ye,We,m))}this.handleModes(ar,Sr,io,R)}else{for(var tn=W,uo=Ye,lo=We,br=ao===!1;br===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var kn=oe[a],ct=kn.pattern,si=kn.short;if(si!==!1?O.charCodeAt(W)===si&&(br=!0):kn.isCustom===!0?br=ct.exec(O,W,V,q)!==null:(this.updateLastIndex(ct,W),br=ct.exec(e)!==null),br===!0)break}if(P=W-tn,b=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,tn,P,uo,lo),Ae.push({offset:tn,line:uo,column:lo,length:P,message:b}),ao===!1)break}}return this.hasCustom||(V.length=re),{tokens:V,groups:q,errors:Ae}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();wi.Lexer=Hee});var Ha=d(wt=>{"use strict";var Gv=wt&&wt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wt,"__esModule",{value:!0});wt.tokenMatcher=wt.createTokenInstance=wt.EOF=wt.createToken=wt.hasTokenLabel=wt.tokenName=wt.tokenLabel=void 0;var Kee=Gv(tl()),$i=Gv(Nr()),Wee=Gv(Fa()),Bee=ul(),Uv=Ua();function Vee(t){return c1(t)?t.LABEL:t.name}wt.tokenLabel=Vee;function zee(t){return t.name}wt.tokenName=zee;function c1(t){return(0,Kee.default)(t.LABEL)&&t.LABEL!==""}wt.hasTokenLabel=c1;var Yee="parent",r1="categories",n1="label",i1="group",a1="push_mode",o1="pop_mode",s1="longer_alt",u1="line_breaks",l1="start_chars_hint";function f1(t){return Xee(t)}wt.createToken=f1;function Xee(t){var e=t.pattern,r={};if(r.name=t.name,(0,Wee.default)(e)||(r.PATTERN=e),(0,$i.default)(t,Yee))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,$i.default)(t,r1)&&(r.CATEGORIES=t[r1]),(0,Uv.augmentTokenTypes)([r]),(0,$i.default)(t,n1)&&(r.LABEL=t[n1]),(0,$i.default)(t,i1)&&(r.GROUP=t[i1]),(0,$i.default)(t,o1)&&(r.POP_MODE=t[o1]),(0,$i.default)(t,a1)&&(r.PUSH_MODE=t[a1]),(0,$i.default)(t,s1)&&(r.LONGER_ALT=t[s1]),(0,$i.default)(t,u1)&&(r.LINE_BREAKS=t[u1]),(0,$i.default)(t,l1)&&(r.START_CHARS_HINT=t[l1]),r}wt.EOF=f1({name:"EOF",pattern:Bee.Lexer.NA});(0,Uv.augmentTokenTypes)([wt.EOF]);function Jee(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}wt.createTokenInstance=Jee;function Qee(t,e){return(0,Uv.tokenStructuredMatcher)(t,e)}wt.tokenMatcher=Qee});var As=d(An=>{"use strict";var Wv=An&&An.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(An,"__esModule",{value:!0});An.defaultGrammarValidatorErrorProvider=An.defaultGrammarResolverErrorProvider=An.defaultParserErrorProvider=void 0;var Rs=Ha(),Kv=Wv(gs()),ua=Wv(qt()),Zee=Wv(Ci()),Hv=dt(),d1=dt();An.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,Rs.hasTokenLabel)(e),o=a?"--> ".concat((0,Rs.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,Kv.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,Zee.default)(e,function(v,y){return v.concat(y)},[]),c=(0,ua.default)(l,function(v){return"[".concat((0,ua.default)(v,function(y){return(0,Rs.tokenLabel)(y)}).join(", "),"]")}),f=(0,ua.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),m=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+m+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,Kv.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,ua.default)(e,function(c){return"[".concat((0,ua.default)(c,function(f){return(0,Rs.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(An.defaultParserErrorProvider);An.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};An.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof Hv.Terminal?c.terminalType.name:c instanceof Hv.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,Kv.default)(e),a=i.idx,o=(0,d1.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,ua.default)(t.prefixPath,function(i){return(0,Rs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,ua.default)(t.prefixPath,function(i){return(0,Rs.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,d1.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,ua.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof Hv.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var m1=d(Xn=>{"use strict";var ete=Xn&&Xn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),p1=Xn&&Xn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xn,"__esModule",{value:!0});Xn.GastRefResolverVisitor=Xn.resolveGrammar=void 0;var tte=Rr(),rte=p1(Mt()),nte=p1(Un()),ite=dt();function ate(t,e){var r=new h1(t,e);return r.resolveRefs(),r.errors}Xn.resolveGrammar=ate;var h1=function(t){ete(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,rte.default)((0,nte.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:tte.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(ite.GAstVisitor);Xn.GastRefResolverVisitor=h1});var g1=d((Mge,y1)=>{function ote(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}y1.exports=ote});var T1=d((Fge,v1)=>{var ste=oa();function ute(t,e,r,n){return ste(t,function(i,a,o){e(n,i,r(i),o)}),n}v1.exports=ute});var R1=d((jge,_1)=>{var lte=g1(),cte=T1(),fte=Vr(),dte=Oe();function pte(t,e){return function(r,n){var i=dte(r)?lte:cte,a=e?e():{};return i(r,t,fte(n,2),a)}}_1.exports=pte});var Bv=d((Gge,A1)=>{var hte=Yf(),mte=R1(),yte=Object.prototype,gte=yte.hasOwnProperty,vte=mte(function(t,e,r){gte.call(t,r)?t[r].push(e):hte(t,r,[e])});A1.exports=vte});var Nd=d((Uge,S1)=>{var Tte=ld(),_te=qt();function Rte(t,e){return Tte(_te(t,e),1)}S1.exports=Rte});var wd=d((Hge,b1)=>{var Ate=Zf(),Ste=hs();function bte(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Ste(e),e=n-e,Ate(t,0,e<0?0:e)):[]}b1.exports=bte});var dl=d(it=>{"use strict";var Wa=it&&it.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ba=it&&it.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(it,"__esModule",{value:!0});it.nextPossibleTokensAfter=it.possiblePathsFrom=it.NextTerminalAfterAtLeastOneSepWalker=it.NextTerminalAfterAtLeastOneWalker=it.NextTerminalAfterManySepWalker=it.NextTerminalAfterManyWalker=it.AbstractNextTerminalAfterProductionWalker=it.NextAfterTokenWalker=it.AbstractNextPossibleTokensWalker=void 0;var P1=ud(),Od=Ba(gs()),$d=Ba(Er()),C1=Ba(wd()),fr=Ba(ed()),Cte=Ba(Pd()),Pte=Ba(Mt()),Ka=Ba(Ai()),Ete=Rv(),de=dt(),E1=function(t){Wa(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,Ka.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,Ka.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,$d.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(P1.RestWalker);it.AbstractNextPossibleTokensWalker=E1;var kte=function(t){Wa(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,Ete.first)(o),this.found=!0}},e}(E1);it.NextAfterTokenWalker=kte;var fl=function(t){Wa(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(P1.RestWalker);it.AbstractNextTerminalAfterProductionWalker=fl;var Nte=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Od.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(fl);it.NextTerminalAfterManyWalker=Nte;var wte=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Od.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(fl);it.NextTerminalAfterManySepWalker=wte;var $te=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Od.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(fl);it.NextTerminalAfterAtLeastOneWalker=$te;var Ote=function(t){Wa(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Od.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(fl);it.NextTerminalAfterAtLeastOneSepWalker=Ote;function k1(t,e,r){r===void 0&&(r=[]),r=(0,Ka.default)(r);var n=[],i=0;function a(l){return l.concat((0,fr.default)(t,i+1))}function o(l){var c=k1(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,Pte.default)(s.definition,function(l){(0,$d.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,fr.default)(t,i)}),n}it.possiblePathsFrom=k1;function Ite(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,$d.default)(f);){var m=f.pop();if(m===o){s&&(0,Cte.default)(f).idx<=l&&f.pop();continue}var v=m.def,y=m.idx,R=m.ruleStack,P=m.occurrenceStack;if(!(0,$d.default)(v)){var E=v[0];if(E===i){var b={idx:y,def:(0,fr.default)(v),ruleStack:(0,C1.default)(R),occurrenceStack:(0,C1.default)(P)};f.push(b)}else if(E instanceof de.Terminal)if(y<u-1){var S=y+1,O=e[S];if(r(O,E.terminalType)){var b={idx:S,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(b)}}else if(y===u-1)c.push({nextTokenType:E.terminalType,nextTokenOccurrence:E.idx,ruleStack:R,occurrenceStack:P}),s=!0;else throw Error("non exhaustive match");else if(E instanceof de.NonTerminal){var F=(0,Ka.default)(R);F.push(E.nonTerminalName);var W=(0,Ka.default)(P);W.push(E.idx);var b={idx:y,def:E.definition.concat(a,(0,fr.default)(v)),ruleStack:F,occurrenceStack:W};f.push(b)}else if(E instanceof de.Option){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ne={idx:y,def:E.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.RepetitionMandatory){var V=new de.Repetition({definition:E.definition,idx:E.idx}),Ae=E.definition.concat([V],(0,fr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(E instanceof de.RepetitionMandatoryWithSeparator){var Ye=new de.Terminal({terminalType:E.separator}),V=new de.Repetition({definition:[Ye].concat(E.definition),idx:E.idx}),Ae=E.definition.concat([V],(0,fr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(E instanceof de.RepetitionWithSeparator){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ye=new de.Terminal({terminalType:E.separator}),We=new de.Repetition({definition:[Ye].concat(E.definition),idx:E.idx}),Ae=E.definition.concat([We],(0,fr.default)(v)),Ne={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.Repetition){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var We=new de.Repetition({definition:E.definition,idx:E.idx}),Ae=E.definition.concat([We],(0,fr.default)(v)),Ne={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.Alternation)for(var q=E.definition.length-1;q>=0;q--){var L=E.definition[q],j={idx:y,def:L.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(j),f.push(o)}else if(E instanceof de.Alternative)f.push({idx:y,def:E.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P});else if(E instanceof de.Rule)f.push(Dte(E,y,R,P));else throw Error("non exhaustive match")}}return c}it.nextPossibleTokensAfter=Ite;function Dte(t,e,r,n){var i=(0,Ka.default)(r);i.push(t.name);var a=(0,Ka.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Ss=d(Re=>{"use strict";var O1=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ya=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var zv=Ya(Er()),I1=Ya(Rn()),za=Ya(al()),Id=Ya(qt()),Va=Ya(Mt()),N1=Ya(Nr()),D1=Ya(Ci()),w1=dl(),xte=ud(),Dd=Ua(),la=dt(),Lte=dt(),At;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(At=Re.PROD_TYPE||(Re.PROD_TYPE={}));function x1(t){if(t instanceof la.Option||t==="Option")return At.OPTION;if(t instanceof la.Repetition||t==="Repetition")return At.REPETITION;if(t instanceof la.RepetitionMandatory||t==="RepetitionMandatory")return At.REPETITION_MANDATORY;if(t instanceof la.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return At.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof la.RepetitionWithSeparator||t==="RepetitionWithSeparator")return At.REPETITION_WITH_SEPARATOR;if(t instanceof la.Alternation||t==="Alternation")return At.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=x1;function qte(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=x1(n);return a===At.ALTERNATION?Xv(e,r,i):Jv(e,r,a,i)}Re.getLookaheadPaths=qte;function Mte(t,e,r,n,i,a){var o=Xv(t,e,r),s=Qv(o)?Dd.tokenStructuredMatcherNoCategories:Dd.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=Mte;function Fte(t,e,r,n,i,a){var o=Jv(t,e,i,r),s=Qv(o)?Dd.tokenStructuredMatcherNoCategories:Dd.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=Fte;function jte(t,e,r,n){var i=t.length,a=(0,za.default)(t,function(u){return(0,za.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,Id.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var f=t[c],m=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<m;y++){for(var R=f[y],P=R.length,E=0;E<P;E++){var b=this.LA(E+1);if(r(b,R[E])===!1)continue e}return c}}};if(a&&!n){var o=(0,Id.default)(t,function(u){return(0,I1.default)(u)}),s=(0,D1.default)(o,function(u,l,c){return(0,Va.default)(l,function(f){(0,N1.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,Va.default)(f.categoryMatches,function(m){(0,N1.default)(u,m)||(u[m]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var m=l[f],v=m.length,y=0;y<v;y++){var R=this.LA(y+1);if(r(R,m[y])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=jte;function Gte(t,e,r){var n=(0,za.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,I1.default)(t);if(a.length===1&&(0,zv.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,D1.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,Va.default)(c.categoryMatches,function(m){l[m]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,m=0;m<f;m++){var v=this.LA(m+1);if(e(v,c[m])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=Gte;var Ute=function(t){O1(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,At.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,At.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(xte.RestWalker),L1=function(t){O1(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,At.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,At.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,At.ALTERNATION)},e}(Lte.GAstVisitor);function $1(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function Vv(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function Hte(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function Yv(t,e){for(var r=(0,Id.default)(t,function(c){return(0,w1.possiblePathsFrom)([c],1)}),n=$1(r.length),i=(0,Id.default)(r,function(c){var f={};return(0,Va.default)(c,function(m){var v=Vv(m.partialPath);(0,Va.default)(v,function(y){f[y]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=$1(s.length);for(var u=function(c){for(var f=s[c],m=0;m<f.length;m++){var v=f[m].partialPath,y=f[m].suffixDef,R=Vv(v),P=Hte(i,R,c);if(P||(0,zv.default)(y)||v.length===e){var E=n[c];if(q1(E,v)===!1){E.push(v);for(var b=0;b<R.length;b++){var S=R[b];i[c][S]=!0}}}else{var O=(0,w1.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,Va.default)(O,function(F){var W=Vv(F.partialPath);(0,Va.default)(W,function(re){i[c][re]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=Yv;function Xv(t,e,r,n){var i=new L1(t,At.ALTERNATION,n);return e.accept(i),Yv(i.result,r)}Re.getLookaheadPathsForOr=Xv;function Jv(t,e,r,n){var i=new L1(t,r);e.accept(i);var a=i.result,o=new Ute(e,t,r),s=o.startWalking(),u=new la.Alternative({definition:a}),l=new la.Alternative({definition:s});return Yv([u,l],n)}Re.getLookaheadPathsForOptionalProd=Jv;function q1(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=q1;function Kte(t,e){return t.length<e.length&&(0,za.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=Kte;function Qv(t){return(0,za.default)(t,function(e){return(0,za.default)(e,function(r){return(0,za.default)(r,function(n){return(0,zv.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=Qv});var ml=d(me=>{"use strict";var eT=me&&me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Zv=me&&me.__assign||function(){return Zv=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Zv.apply(this,arguments)},Ft=me&&me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(me,"__esModule",{value:!0});me.checkPrefixAlternativesAmbiguities=me.validateSomeNonEmptyLookaheadPath=me.validateTooManyAlts=me.RepetitionCollector=me.validateAmbiguousAlternationAlternatives=me.validateEmptyOrAlternative=me.getFirstNoneTerminal=me.validateNoLeftRecursion=me.validateRuleIsOverridden=me.validateRuleDoesNotAlreadyExist=me.OccurrenceValidationCollector=me.identifyProductionForDuplicates=me.validateGrammar=me.validateLookahead=void 0;var M1=Ft(gs()),xd=Ft(Er()),Wte=Ft(ed()),F1=Ft(Rn()),Bte=Ft(sl()),Vte=Ft(hd()),zte=Ft(md()),ca=Ft(qt()),hl=Ft(Mt()),Yte=Ft(Bv()),tT=Ft(Ci()),Xte=Ft(cv()),Jte=Ft(Un()),rT=Ft(bi()),Oi=Ft(Nd()),Qte=Ft(Ai()),bn=Rr(),nT=dt(),bs=Ss(),Zte=dl(),Sn=dt(),iT=dt(),ere=Ft(wd()),tre=Ft(ol()),rre=Ua();function nre(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,ca.default)(e,function(r){return Zv({type:bn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}me.validateLookahead=nre;function ire(t,e,r,n){var i=(0,Oi.default)(t,function(u){return are(u,r)}),a=fre(t,e,r),o=(0,Oi.default)(t,function(u){return B1(u,r)}),s=(0,Oi.default)(t,function(u){return H1(u,t,n,r)});return i.concat(a,o,s)}me.validateGrammar=ire;function are(t,e){var r=new U1;t.accept(r);var n=r.allProductions,i=(0,Yte.default)(n,j1),a=(0,Xte.default)(i,function(s){return s.length>1}),o=(0,ca.default)((0,Jte.default)(a),function(s){var u=(0,M1.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,nT.getProductionDslName)(u),f={message:l,type:bn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},m=G1(u);return m&&(f.parameter=m),f});return o}function j1(t){return"".concat((0,nT.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(G1(t))}me.identifyProductionForDuplicates=j1;function G1(t){return t instanceof Sn.Terminal?t.terminalType.name:t instanceof Sn.NonTerminal?t.nonTerminalName:""}var U1=function(t){eT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(iT.GAstVisitor);me.OccurrenceValidationCollector=U1;function H1(t,e,r,n){var i=[],a=(0,tT.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:bn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}me.validateRuleDoesNotAlreadyExist=H1;function ore(t,e,r){var n=[],i;return(0,rT.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:bn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}me.validateRuleIsOverridden=ore;function K1(t,e,r,n){n===void 0&&(n=[]);var i=[],a=pl(e.definition);if((0,xd.default)(a))return[];var o=t.name,s=(0,rT.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:bn.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,zte.default)(a,n.concat([t])),l=(0,Oi.default)(u,function(c){var f=(0,Qte.default)(n);return f.push(c),K1(t,c,r,f)});return i.concat(l)}me.validateNoLeftRecursion=K1;function pl(t){var e=[];if((0,xd.default)(t))return e;var r=(0,M1.default)(t);if(r instanceof Sn.NonTerminal)e.push(r.referencedRule);else if(r instanceof Sn.Alternative||r instanceof Sn.Option||r instanceof Sn.RepetitionMandatory||r instanceof Sn.RepetitionMandatoryWithSeparator||r instanceof Sn.RepetitionWithSeparator||r instanceof Sn.Repetition)e=e.concat(pl(r.definition));else if(r instanceof Sn.Alternation)e=(0,F1.default)((0,ca.default)(r.definition,function(o){return pl(o.definition)}));else if(!(r instanceof Sn.Terminal))throw Error("non exhaustive match");var n=(0,nT.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Wte.default)(t);return e.concat(pl(a))}else return e}me.getFirstNoneTerminal=pl;var aT=function(t){eT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(iT.GAstVisitor);function sre(t,e){var r=new aT;t.accept(r);var n=r.alternations,i=(0,Oi.default)(n,function(a){var o=(0,ere.default)(a.definition);return(0,Oi.default)(o,function(s,u){var l=(0,Zte.nextPossibleTokensAfter)([s],[],rre.tokenStructuredMatcher,1);return(0,xd.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:bn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}me.validateEmptyOrAlternative=sre;function ure(t,e,r){var n=new aT;t.accept(n);var i=n.alternations;i=(0,Vte.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Oi.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,bs.getLookaheadPathsForOr)(s,t,u,o),c=cre(l,o,t,r),f=V1(l,o,t,r);return c.concat(f)});return a}me.validateAmbiguousAlternationAlternatives=ure;var W1=function(t){eT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(iT.GAstVisitor);me.RepetitionCollector=W1;function B1(t,e){var r=new aT;t.accept(r);var n=r.alternations,i=(0,Oi.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:bn.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}me.validateTooManyAlts=B1;function lre(t,e,r){var n=[];return(0,hl.default)(t,function(i){var a=new W1;i.accept(a);var o=a.allProductions;(0,hl.default)(o,function(s){var u=(0,bs.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,bs.getLookaheadPathsForOptionalProd)(c,i,u,l),m=f[0];if((0,xd.default)((0,F1.default)(m))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:bn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}me.validateSomeNonEmptyLookaheadPath=lre;function cre(t,e,r,n){var i=[],a=(0,tT.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,hl.default)(u,function(c){var f=[l];(0,hl.default)(t,function(m,v){l!==v&&(0,bs.containsPath)(m,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,bs.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,ca.default)(a,function(s){var u=(0,ca.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:bn.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function V1(t,e,r,n){var i=(0,tT.default)(t,function(o,s,u){var l=(0,ca.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,tre.default)((0,Oi.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,Bte.default)(i,function(m){return e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<u&&(0,bs.isStrictPrefixOfPath)(m.path,l)}),f=(0,ca.default)(c,function(m){var v=[m.idx+1,u+1],y=e.idx===0?"":e.idx,R=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:m.path});return{message:R,type:bn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return f}));return a}me.checkPrefixAlternativesAmbiguities=V1;function fre(t,e,r){var n=[],i=(0,ca.default)(e,function(a){return a.name});return(0,hl.default)(t,function(a){var o=a.name;if((0,rT.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:bn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var J1=d(fa=>{"use strict";var z1=fa&&fa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fa,"__esModule",{value:!0});fa.validateGrammar=fa.resolveGrammar=void 0;var dre=z1(Mt()),Y1=z1(bv()),pre=m1(),hre=ml(),X1=As();function mre(t){var e=(0,Y1.default)(t,{errMsgProvider:X1.defaultGrammarResolverErrorProvider}),r={};return(0,dre.default)(t.rules,function(n){r[n.name]=n}),(0,pre.resolveGrammar)(r,e.errMsgProvider)}fa.resolveGrammar=mre;function yre(t){return t=(0,Y1.default)(t,{errMsgProvider:X1.defaultGrammarValidatorErrorProvider}),(0,hre.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}fa.validateGrammar=yre});var Cs=d(ir=>{"use strict";var yl=ir&&ir.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),gre=ir&&ir.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ir,"__esModule",{value:!0});ir.EarlyExitException=ir.NotAllInputParsedException=ir.NoViableAltException=ir.MismatchedTokenException=ir.isRecognitionException=void 0;var vre=gre(bi()),Q1="MismatchedTokenException",Z1="NoViableAltException",eI="EarlyExitException",tI="NotAllInputParsedException",rI=[Q1,Z1,eI,tI];Object.freeze(rI);function Tre(t){return(0,vre.default)(rI,t.name)}ir.isRecognitionException=Tre;var Ld=function(t){yl(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),_re=function(t){yl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=Q1,a}return e}(Ld);ir.MismatchedTokenException=_re;var Rre=function(t){yl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=Z1,a}return e}(Ld);ir.NoViableAltException=Rre;var Are=function(t){yl(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=tI,i}return e}(Ld);ir.NotAllInputParsedException=Are;var Sre=function(t){yl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=eI,a}return e}(Ld);ir.EarlyExitException=Sre});var sT=d(St=>{"use strict";var bre=St&&St.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),da=St&&St.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(St,"__esModule",{value:!0});St.attemptInRepetitionRecovery=St.Recoverable=St.InRuleRecoveryException=St.IN_RULE_RECOVERY_EXCEPTION=St.EOF_FOLLOW_KEY=void 0;var gl=Ha(),Cre=da(Er()),nI=da(wd()),Pre=da(Rn()),oT=da(qt()),iI=da(yd()),Ere=da(Nr()),kre=da(bi()),Nre=da(Ai()),wre=Cs(),$re=Av(),Ore=Rr();St.EOF_FOLLOW_KEY={};St.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var aI=function(t){bre(e,t);function e(r){var n=t.call(this,r)||this;return n.name=St.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);St.InRuleRecoveryException=aI;var Ire=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,Ere.default)(e,"recoveryEnabled")?e.recoveryEnabled:Ore.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=oI)},t.prototype.getTokenToInsert=function(e){var r=(0,gl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),m=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),R=new wre.MismatchedTokenException(y,c,a.LA(0));R.resyncedTokens=(0,nI.default)(u),a.SAVE_ERROR(R)};!l;)if(this.tokenMatcher(f,i)){m();return}else if(n.call(this)){m(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new aI("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,Cre.default)(r))return!1;var i=this.LA(1),a=(0,iI.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,kre.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,iI.default)(e,function(a){var o=(0,gl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return St.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,oT.default)(r,function(i,a){return a===0?St.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,oT.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,Pre.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===St.EOF_FOLLOW_KEY)return[gl.EOF];var r=e.ruleName+e.idxInCallingRule+$re.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,gl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,nI.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,Nre.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,oT.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();St.Recoverable=Ire;function oI(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var m=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&m===void 0&&(m=gl.EOF,v=1),!(m===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(m,v,o)&&this.tryInRepetitionRecovery(t,e,r,m)}St.attemptInRepetitionRecovery=oI});var qd=d(ke=>{"use strict";Object.defineProperty(ke,"__esModule",{value:!0});ke.getKeyForAutomaticLookahead=ke.AT_LEAST_ONE_SEP_IDX=ke.MANY_SEP_IDX=ke.AT_LEAST_ONE_IDX=ke.MANY_IDX=ke.OPTION_IDX=ke.OR_IDX=ke.BITS_FOR_ALT_IDX=ke.BITS_FOR_RULE_IDX=ke.BITS_FOR_OCCURRENCE_IDX=ke.BITS_FOR_METHOD_TYPE=void 0;ke.BITS_FOR_METHOD_TYPE=4;ke.BITS_FOR_OCCURRENCE_IDX=8;ke.BITS_FOR_RULE_IDX=12;ke.BITS_FOR_ALT_IDX=8;ke.OR_IDX=1<<ke.BITS_FOR_OCCURRENCE_IDX;ke.OPTION_IDX=2<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_IDX=3<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_IDX=4<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_SEP_IDX=5<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_SEP_IDX=6<<ke.BITS_FOR_OCCURRENCE_IDX;function Dre(t,e,r){return r|e|t}ke.getKeyForAutomaticLookahead=Dre;var Xge=32-ke.BITS_FOR_ALT_IDX});var lT=d(pa=>{"use strict";var Md=pa&&pa.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},sI=pa&&pa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(pa,"__esModule",{value:!0});pa.LLkLookaheadStrategy=void 0;var uT=sI(Nd()),xre=sI(Er()),Fd=As(),Lre=Rr(),jd=ml(),vl=Ss(),qre=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Lre.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,xre.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=Md(Md(Md(Md([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,uT.default)(e,function(r){return(0,jd.validateNoLeftRecursion)(r,r,Fd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,uT.default)(e,function(r){return(0,jd.validateEmptyOrAlternative)(r,Fd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,uT.default)(e,function(n){return(0,jd.validateAmbiguousAlternationAlternatives)(n,r,Fd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,jd.validateSomeNonEmptyLookaheadPath)(e,r,Fd.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,vl.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,vl.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,vl.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,vl.getProdType)(e.prodType),vl.buildSingleAlternativeLookaheadFunction)},t}();pa.LLkLookaheadStrategy=qre});var fI=d(Jn=>{"use strict";var Mre=Jn&&Jn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),lI=Jn&&Jn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Jn,"__esModule",{value:!0});Jn.collectMethods=Jn.LooksAhead=void 0;var Xa=lI(Mt()),cT=lI(Nr()),uI=Rr(),Ii=qd(),Fre=dt(),Ps=dt(),jre=lT(),Gre=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,cT.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:uI.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,cT.default)(e,"maxLookahead")?e.maxLookahead:uI.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,cT.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new jre.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Xa.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=cI(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Xa.default)(a,function(f){var m=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,Ps.getProductionDslName)(f)).concat(m),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,Ii.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Ii.OR_IDX,f.idx);r.setLaFuncCache(y,v)})}),(0,Xa.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,Ii.MANY_IDX,"Repetition",f.maxLookahead,(0,Ps.getProductionDslName)(f))}),(0,Xa.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Ii.OPTION_IDX,"Option",f.maxLookahead,(0,Ps.getProductionDslName)(f))}),(0,Xa.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Ii.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,Ps.getProductionDslName)(f))}),(0,Xa.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Ii.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,Ps.getProductionDslName)(f))}),(0,Xa.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Ii.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,Ps.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Ii.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Ii.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();Jn.LooksAhead=Gre;var Ure=function(t){Mre(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(Fre.GAstVisitor),Gd=new Ure;function cI(t){Gd.reset(),t.accept(Gd);var e=Gd.dslMethods;return Gd.reset(),e}Jn.collectMethods=cI});var dI=d(Qn=>{"use strict";Object.defineProperty(Qn,"__esModule",{value:!0});Qn.addNoneTerminalToCst=Qn.addTerminalToCst=Qn.setNodeLocationFull=Qn.setNodeLocationOnlyOffset=void 0;function Hre(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}Qn.setNodeLocationOnlyOffset=Hre;function Kre(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}Qn.setNodeLocationFull=Kre;function Wre(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}Qn.addTerminalToCst=Wre;function Bre(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}Qn.addNoneTerminalToCst=Bre});var pI=d(Ud=>{"use strict";Object.defineProperty(Ud,"__esModule",{value:!0});Ud.defineNameProp=void 0;var Vre="name";function zre(t,e){Object.defineProperty(t,Vre,{enumerable:!1,configurable:!0,writable:!1,value:e})}Ud.defineNameProp=zre});var _I=d(zt=>{"use strict";var Di=zt&&zt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zt,"__esModule",{value:!0});zt.validateMissingCstMethods=zt.validateVisitor=zt.CstVisitorDefinitionError=zt.createBaseVisitorConstructorWithDefaults=zt.createBaseSemanticVisitorConstructor=zt.defaultVisit=void 0;var Yre=Di(Er()),Xre=Di(ol()),Jre=Di(Oe()),hI=Di(qt()),Qre=Di(Mt()),Zre=Di(sl()),ene=Di(kr()),tne=Di(Xo()),rne=Di(Fa()),mI=pI();function yI(t,e){for(var r=(0,ene.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}zt.defaultVisit=yI;function nne(t,e){var r=function(){};(0,mI.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,Jre.default)(i)&&(i=i[0]),!(0,rne.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=vI(this,e);if(!(0,Yre.default)(i)){var a=(0,hI.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}zt.createBaseSemanticVisitorConstructor=nne;function ine(t,e,r){var n=function(){};(0,mI.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,Qre.default)(e,function(a){i[a]=yI}),n.prototype=i,n.prototype.constructor=n,n}zt.createBaseVisitorConstructorWithDefaults=ine;var gI;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(gI=zt.CstVisitorDefinitionError||(zt.CstVisitorDefinitionError={}));function vI(t,e){var r=TI(t,e);return r}zt.validateVisitor=vI;function TI(t,e){var r=(0,Zre.default)(e,function(i){return(0,tne.default)(t[i])===!1}),n=(0,hI.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:gI.MISSING_METHOD,methodName:i}});return(0,Xre.default)(n)}zt.validateMissingCstMethods=TI});var bI=d(ks=>{"use strict";var Hd=ks&&ks.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ks,"__esModule",{value:!0});ks.TreeBuilder=void 0;var Es=dI(),dr=Hd(cd()),ane=Hd(Nr()),RI=Hd(kr()),AI=Hd(Fa()),SI=_I(),one=Rr(),sne=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,ane.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:one.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=dr.default,this.cstFinallyStateUpdate=dr.default,this.cstPostTerminal=dr.default,this.cstPostNonTerminal=dr.default,this.cstPostRule=dr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Es.setNodeLocationFull,this.setNodeLocationFromNode=Es.setNodeLocationFull,this.cstPostRule=dr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Es.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Es.setNodeLocationOnlyOffset,this.cstPostRule=dr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=dr.default,this.setInitialNodeLocation=dr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Es.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Es.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,AI.default)(this.baseCstVisitorConstructor)){var e=(0,SI.createBaseSemanticVisitorConstructor)(this.className,(0,RI.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,AI.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,SI.createBaseVisitorConstructorWithDefaults)(this.className,(0,RI.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();ks.TreeBuilder=sne});var PI=d(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.LexerAdapter=void 0;var CI=Rr(),une=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):CI.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?CI.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();Kd.LexerAdapter=une});var kI=d(Ns=>{"use strict";var EI=Ns&&Ns.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ns,"__esModule",{value:!0});Ns.RecognizerApi=void 0;var lne=EI(Un()),cne=EI(bi()),fne=Cs(),fT=Rr(),dne=As(),pne=ml(),hne=dt(),mne=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=fT.DEFAULT_RULE_CONFIG),(0,cne.default)(this.definedRulesNames,e)){var i=dne.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:fT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=fT.DEFAULT_RULE_CONFIG);var i=(0,pne.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,fne.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,hne.serializeGrammar)((0,lne.default)(this.gastProductionsCache))},t}();Ns.RecognizerApi=mne});var LI=d($s=>{"use strict";var Zn=$s&&$s.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($s,"__esModule",{value:!0});$s.RecognizerEngine=void 0;var NI=Zn(Er()),dT=Zn(Oe()),pT=Zn(Rn()),wI=Zn(al()),yne=Zn(fd()),gne=Zn(vn()),Tl=Zn(Nr()),_l=Zn(Un()),$I=Zn(Ci()),OI=Zn(Ai()),$r=qd(),Wd=Cs(),II=Ss(),ws=dl(),DI=Rr(),vne=sT(),xI=Ha(),Rl=Ua(),Tne=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Rl.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Tl.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,dT.default)(e)){if((0,NI.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,dT.default)(e))this.tokensMap=(0,$I.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Tl.default)(e,"modes")&&(0,wI.default)((0,pT.default)((0,_l.default)(e.modes)),Rl.isTokenType)){var n=(0,pT.default)((0,_l.default)(e.modes)),i=(0,yne.default)(n);this.tokensMap=(0,$I.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,gne.default)(e))this.tokensMap=(0,OI.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=xI.EOF;var a=(0,Tl.default)(e,"modes")?(0,pT.default)((0,_l.default)(e.modes)):(0,_l.default)(e),o=(0,wI.default)(a,function(s){return(0,NI.default)(s.categoryMatches)});this.tokenMatcher=o?Rl.tokenStructuredMatcherNoCategories:Rl.tokenStructuredMatcher,(0,Rl.augmentTokenTypes)((0,_l.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Tl.default)(n,"resyncEnabled")?n.resyncEnabled:DI.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,Tl.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:DI.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<$r.BITS_FOR_METHOD_TYPE+$r.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var m=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(m),m}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(m){return this.invokeRuleCatch(m,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Wd.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,II.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,$r.AT_LEAST_ONE_IDX,e,ws.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,ws.NextTerminalAfterAtLeastOneSepWalker],u,$r.AT_LEAST_ONE_SEP_IDX,e,ws.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,II.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,$r.MANY_IDX,e,ws.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,ws.NextTerminalAfterManySepWalker],u,$r.MANY_SEP_IDX,e,ws.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,$r.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OR_IDX,r),i=(0,dT.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Wd.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Wd.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Wd.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===vne.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,OI.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),xI.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();$s.RecognizerEngine=Tne});var jI=d(Os=>{"use strict";var FI=Os&&Os.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Os,"__esModule",{value:!0});Os.ErrorHandler=void 0;var hT=Cs(),_ne=FI(Nr()),qI=FI(Ai()),MI=Ss(),Rne=Rr(),Ane=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,_ne.default)(e,"errorMessageProvider")?e.errorMessageProvider:Rne.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,hT.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,qI.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,qI.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,MI.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new hT.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,MI.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new hT.NoViableAltException(l,this.LA(1),u))},t}();Os.ErrorHandler=Ane});var HI=d(Is=>{"use strict";var UI=Is&&Is.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Is,"__esModule",{value:!0});Is.ContentAssist=void 0;var GI=dl(),Sne=UI(gs()),bne=UI(Fa()),Cne=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,bne.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,GI.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,Sne.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new GI.NextAfterTokenWalker(i,e).startWalking();return a},t}();Is.ContentAssist=Cne});var QI=d(Ds=>{"use strict";var xs=Ds&&Ds.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ds,"__esModule",{value:!0});Ds.GastRecorder=void 0;var Bd=xs(Pd()),Pne=xs(Oe()),Ene=xs(ad()),kne=xs(Mt()),VI=xs(Xo()),Sl=xs(Nr()),ei=dt(),Nne=ul(),zI=Ua(),YI=Ha(),wne=Rr(),$ne=qd(),zd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(zd);var KI=!0,WI=Math.pow(2,$ne.BITS_FOR_OCCURRENCE_IDX)-1,XI=(0,YI.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:Nne.Lexer.NA});(0,zI.augmentTokenTypes)([XI]);var JI=(0,YI.createTokenInstance)(XI,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(JI);var One={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Ine=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return wne.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new ei.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return Al.call(this,ei.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){Al.call(this,ei.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){Al.call(this,ei.RepetitionMandatoryWithSeparator,r,e,KI)},t.prototype.manyInternalRecord=function(e,r){Al.call(this,ei.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){Al.call(this,ei.RepetitionWithSeparator,r,e,KI)},t.prototype.orInternalRecord=function(e,r){return Dne.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Vd(r),!e||(0,Sl.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(BI(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Bd.default)(this.recordingProdStack),o=e.ruleName,s=new ei.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?One:zd},t.prototype.consumeInternalRecord=function(e,r,n){if(Vd(r),!(0,zI.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(BI(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,Bd.default)(this.recordingProdStack),o=new ei.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),JI},t}();Ds.GastRecorder=Ine;function Al(t,e,r,n){n===void 0&&(n=!1),Vd(r);var i=(0,Bd.default)(this.recordingProdStack),a=(0,VI.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,Sl.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),zd}function Dne(t,e){var r=this;Vd(e);var n=(0,Bd.default)(this.recordingProdStack),i=(0,Pne.default)(t)===!1,a=i===!1?t:t.DEF,o=new ei.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,Sl.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,Ene.default)(a,function(u){return(0,VI.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,kne.default)(a,function(u){var l=new ei.Alternative({definition:[]});o.definition.push(l),(0,Sl.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,Sl.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),zd}function BI(t){return t===0?"":"".concat(t)}function Vd(t){if(t<0||t>WI){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(WI+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var ZI=d(Ls=>{"use strict";var xne=Ls&&Ls.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ls,"__esModule",{value:!0});Ls.PerformanceTracer=void 0;var Lne=xne(Nr()),qne=ps(),Mne=Rr(),Fne=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,Lne.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Mne.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,qne.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();Ls.PerformanceTracer=Fne});var eD=d(Yd=>{"use strict";Object.defineProperty(Yd,"__esModule",{value:!0});Yd.applyMixins=void 0;function jne(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Yd.applyMixins=jne});var Rr=d(Me=>{"use strict";var iD=Me&&Me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),qs=Me&&Me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Me,"__esModule",{value:!0});Me.EmbeddedActionsParser=Me.CstParser=Me.Parser=Me.EMPTY_ALT=Me.ParserDefinitionErrorType=Me.DEFAULT_RULE_CONFIG=Me.DEFAULT_PARSER_CONFIG=Me.END_OF_FILE=void 0;var mT=qs(Er()),Gne=qs(qt()),Une=qs(Mt()),ha=qs(Un()),tD=qs(Nr()),aD=qs(Ai()),Hne=ps(),Kne=M$(),rD=Ha(),oD=As(),nD=J1(),Wne=sT(),Bne=fI(),Vne=bI(),zne=PI(),Yne=kI(),Xne=LI(),Jne=jI(),Qne=HI(),Zne=QI(),eie=ZI(),tie=eD(),rie=ml();Me.END_OF_FILE=(0,rD.createTokenInstance)(rD.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Me.END_OF_FILE);Me.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:oD.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Me.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var nie;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(nie=Me.ParserDefinitionErrorType||(Me.ParserDefinitionErrorType={}));function iie(t){return t===void 0&&(t=void 0),function(){return t}}Me.EMPTY_ALT=iie;var Xd=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,tD.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,tD.default)(r,"skipValidations")?r.skipValidations:Me.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,Hne.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,Une.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,nD.resolveGrammar)({rules:(0,ha.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,mT.default)(i)&&e.skipValidations===!1){var a=(0,nD.validateGrammar)({rules:(0,ha.default)(e.gastProductionsCache),tokenTypes:(0,ha.default)(e.tokensMap),errMsgProvider:oD.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,rie.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,ha.default)(e.gastProductionsCache),tokenTypes:(0,ha.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,mT.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Kne.computeAllProdsFollows)((0,ha.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,ha.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,ha.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,mT.default)(e.definitionErrors))throw r=(0,Gne.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Me.Parser=Xd;(0,tie.applyMixins)(Xd,[Wne.Recoverable,Bne.LooksAhead,Vne.TreeBuilder,zne.LexerAdapter,Xne.RecognizerEngine,Yne.RecognizerApi,Jne.ErrorHandler,Qne.ContentAssist,Zne.GastRecorder,eie.PerformanceTracer]);var aie=function(t){iD(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,aD.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Xd);Me.CstParser=aie;var oie=function(t){iD(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,aD.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Xd);Me.EmbeddedActionsParser=oie});var uD=d(ma=>{"use strict";var sie=ma&&ma.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ms=ma&&ma.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ma,"__esModule",{value:!0});ma.buildModel=void 0;var sD=dt(),bl=Ms(qt()),uie=Ms(Rn()),lie=Ms(Un()),cie=Ms(ad()),fie=Ms(Bv()),die=Ms(nl());function pie(t){var e=new hie,r=(0,lie.default)(t);return(0,bl.default)(r,function(n){return e.visitRule(n)})}ma.buildModel=pie;var hie=function(t){sie(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,fie.default)(n,function(o){return o.propertyName}),a=(0,bl.default)(i,function(o,s){var u=!(0,cie.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,bl.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Jd(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Jd(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Jd(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Jd(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,bl.default)(this.visitEach(r),function(i){return(0,die.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,uie.default)((0,bl.default)(r,function(i){return n.visit(i)}))},e}(sD.GAstVisitor);function Jd(t){return t instanceof sD.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var cD=d((hve,lD)=>{var mie=Zf();function yie(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:mie(t,e,r)}lD.exports=yie});var yT=d((mve,fD)=>{var gie="\\ud800-\\udfff",vie="\\u0300-\\u036f",Tie="\\ufe20-\\ufe2f",_ie="\\u20d0-\\u20ff",Rie=vie+Tie+_ie,Aie="\\ufe0e\\ufe0f",Sie="\\u200d",bie=RegExp("["+Sie+gie+Rie+Aie+"]");function Cie(t){return bie.test(t)}fD.exports=Cie});var pD=d((yve,dD)=>{function Pie(t){return t.split("")}dD.exports=Pie});var RD=d((gve,_D)=>{var hD="\\ud800-\\udfff",Eie="\\u0300-\\u036f",kie="\\ufe20-\\ufe2f",Nie="\\u20d0-\\u20ff",wie=Eie+kie+Nie,$ie="\\ufe0e\\ufe0f",Oie="["+hD+"]",gT="["+wie+"]",vT="\\ud83c[\\udffb-\\udfff]",Iie="(?:"+gT+"|"+vT+")",mD="[^"+hD+"]",yD="(?:\\ud83c[\\udde6-\\uddff]){2}",gD="[\\ud800-\\udbff][\\udc00-\\udfff]",Die="\\u200d",vD=Iie+"?",TD="["+$ie+"]?",xie="(?:"+Die+"(?:"+[mD,yD,gD].join("|")+")"+TD+vD+")*",Lie=TD+vD+xie,qie="(?:"+[mD+gT+"?",gT,yD,gD,Oie].join("|")+")",Mie=RegExp(vT+"(?="+vT+")|"+qie+Lie,"g");function Fie(t){return t.match(Mie)||[]}_D.exports=Fie});var SD=d((vve,AD)=>{var jie=pD(),Gie=yT(),Uie=RD();function Hie(t){return Gie(t)?Uie(t):jie(t)}AD.exports=Hie});var CD=d((Tve,bD)=>{var Kie=cD(),Wie=yT(),Bie=SD(),Vie=rv();function zie(t){return function(e){e=Vie(e);var r=Wie(e)?Bie(e):void 0,n=r?r[0]:e.charAt(0),i=r?Kie(r,1).join(""):e.slice(1);return n[t]()+i}}bD.exports=zie});var ED=d((_ve,PD)=>{var Yie=CD(),Xie=Yie("toUpperCase");PD.exports=Xie});var $D=d(Fs=>{"use strict";var js=Fs&&Fs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Fs,"__esModule",{value:!0});Fs.genDts=void 0;var Jie=js(Rn()),Qie=js(Oe()),Qd=js(qt()),Zie=js(Ci()),eae=js(fd()),ND=js(ED());function tae(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,Jie.default)((0,Qd.default)(t,function(n){return rae(n)}))),e.includeVisitorInterface&&(r=r.concat(oae(e.visitorInterfaceName,t))),r.join(`

`)+`
`}Fs.genDts=tae;function rae(t){var e=nae(t),r=iae(t);return[e,r]}function nae(t){var e=wD(t.name),r=TT(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function iae(t){var e=TT(t.name);return"export type ".concat(e,` = {
  `).concat((0,Qd.default)(t.properties,function(r){return aae(r)}).join(`
  `),`
};`)}function aae(t){var e=uae(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function oae(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,Qd.default)(e,function(r){return sae(r)}).join(`
  `),`
}`)}function sae(t){var e=TT(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function uae(t){if((0,Qie.default)(t)){var e=(0,eae.default)((0,Qd.default)(t,function(n){return kD(n)})),r=(0,Zie.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return kD(t)}function kD(t){return t.kind==="token"?"IToken":wD(t.name)}function wD(t){return(0,ND.default)(t)+"CstNode"}function TT(t){return(0,ND.default)(t)+"CstChildren"}});var OD=d(Gs=>{"use strict";var Zd=Gs&&Gs.__assign||function(){return Zd=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},Zd.apply(this,arguments)};Object.defineProperty(Gs,"__esModule",{value:!0});Gs.generateCstDts=void 0;var lae=uD(),cae=$D(),fae={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function dae(t,e){var r=Zd(Zd({},fae),e),n=(0,lae.buildModel)(t);return(0,cae.genDts)(n,r)}Gs.generateCstDts=dae});var DD=d(ep=>{"use strict";Object.defineProperty(ep,"__esModule",{value:!0});ep.createSyntaxDiagramsCode=void 0;var ID=wg();function pae(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(ID.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(ID.VERSION,"/diagrams/diagrams.css"):a,s=`
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
`;return s+u+l+c+f+m}ep.createSyntaxDiagramsCode=pae});var Ja=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var hae=wg();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return hae.VERSION}});var tp=Rr();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return tp.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return tp.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return tp.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return tp.EMPTY_ALT}});var xD=ul();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return xD.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return xD.LexerDefinitionErrorType}});var Us=Ha();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return Us.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return Us.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return Us.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return Us.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return Us.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return Us.tokenName}});var mae=Ss();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return mae.getLookaheadPaths}});var yae=lT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return yae.LLkLookaheadStrategy}});var gae=As();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return gae.defaultParserErrorProvider}});var Cl=Cs();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return Cl.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return Cl.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return Cl.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return Cl.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return Cl.NoViableAltException}});var vae=qv();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return vae.defaultLexerErrorProvider}});var ti=dt();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return ti.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return ti.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return ti.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return ti.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return ti.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return ti.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return ti.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return ti.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return ti.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return ti.Terminal}});var _T=dt();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return _T.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return _T.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return _T.GAstVisitor}});var Tae=OD();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return Tae.generateCstDts}});function _ae(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=_ae;var Rae=DD();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Rae.createSyntaxDiagramsCode}});var Aae=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=Aae});var GD=d(X=>{"use strict";var LD=X&&X.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(X,"__esModule",{value:!0});X.createATN=X.RuleTransition=X.EpsilonTransition=X.AtomTransition=X.AbstractTransition=X.ATN_LOOP_END=X.ATN_PLUS_LOOP_BACK=X.ATN_STAR_LOOP_ENTRY=X.ATN_STAR_LOOP_BACK=X.ATN_BLOCK_END=X.ATN_RULE_STOP=X.ATN_TOKEN_START=X.ATN_STAR_BLOCK_START=X.ATN_PLUS_BLOCK_START=X.ATN_RULE_START=X.ATN_BASIC=X.ATN_INVALID_TYPE=X.buildATNKey=void 0;var qD=LD(qt()),Sae=LD(sl()),Ar=Ja();function El(t,e,r){return`${t.name}_${e}_${r}`}X.buildATNKey=El;X.ATN_INVALID_TYPE=0;X.ATN_BASIC=1;X.ATN_RULE_START=2;X.ATN_PLUS_BLOCK_START=4;X.ATN_STAR_BLOCK_START=5;X.ATN_TOKEN_START=6;X.ATN_RULE_STOP=7;X.ATN_BLOCK_END=8;X.ATN_STAR_LOOP_BACK=9;X.ATN_STAR_LOOP_ENTRY=10;X.ATN_PLUS_LOOP_BACK=11;X.ATN_LOOP_END=12;var Hs=class{constructor(e){this.target=e}isEpsilon(){return!1}};X.AbstractTransition=Hs;var rp=class extends Hs{constructor(e,r){super(e),this.tokenType=r}};X.AtomTransition=rp;var np=class extends Hs{constructor(e){super(e)}isEpsilon(){return!0}};X.EpsilonTransition=np;var Pl=class extends Hs{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};X.RuleTransition=Pl;function bae(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};Cae(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=Qa(e,i,i);a!==void 0&&Lae(e,i,a)}return e}X.createATN=bae;function Cae(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=jt(t,i,void 0,{type:X.ATN_RULE_START}),o=jt(t,i,void 0,{type:X.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function MD(t,e,r){return r instanceof Ar.Terminal?RT(t,e,r.terminalType,r):r instanceof Ar.NonTerminal?xae(t,e,r):r instanceof Ar.Alternation?wae(t,e,r):r instanceof Ar.Option?$ae(t,e,r):r instanceof Ar.Repetition?Pae(t,e,r):r instanceof Ar.RepetitionWithSeparator?Eae(t,e,r):r instanceof Ar.RepetitionMandatory?kae(t,e,r):r instanceof Ar.RepetitionMandatoryWithSeparator?Nae(t,e,r):Qa(t,e,r)}function Pae(t,e,r){let n=jt(t,e,r,{type:X.ATN_STAR_BLOCK_START});ya(t,n);let i=Ks(t,e,n,r,Qa(t,e,r));return jD(t,e,r,i)}function Eae(t,e,r){let n=jt(t,e,r,{type:X.ATN_STAR_BLOCK_START});ya(t,n);let i=Ks(t,e,n,r,Qa(t,e,r)),a=RT(t,e,r.separator,r);return jD(t,e,r,i,a)}function kae(t,e,r){let n=jt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});ya(t,n);let i=Ks(t,e,n,r,Qa(t,e,r));return FD(t,e,r,i)}function Nae(t,e,r){let n=jt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});ya(t,n);let i=Ks(t,e,n,r,Qa(t,e,r)),a=RT(t,e,r.separator,r);return FD(t,e,r,i,a)}function wae(t,e,r){let n=jt(t,e,r,{type:X.ATN_BASIC});ya(t,n);let i=(0,qD.default)(r.definition,o=>MD(t,e,o));return Ks(t,e,n,r,...i)}function $ae(t,e,r){let n=jt(t,e,r,{type:X.ATN_BASIC});ya(t,n);let i=Ks(t,e,n,r,Qa(t,e,r));return Oae(t,e,r,i)}function Qa(t,e,r){let n=(0,Sae.default)((0,qD.default)(r.definition,i=>MD(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Dae(t,n)}function FD(t,e,r,n,i){let a=n.left,o=n.right,s=jt(t,e,r,{type:X.ATN_PLUS_LOOP_BACK});ya(t,s);let u=jt(t,e,r,{type:X.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[El(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,bt(o,s),i===void 0?(bt(s,a),bt(s,u)):(bt(s,u),bt(s,i.left),bt(i.right,a)),{left:a,right:u}}function jD(t,e,r,n,i){let a=n.left,o=n.right,s=jt(t,e,r,{type:X.ATN_STAR_LOOP_ENTRY});ya(t,s);let u=jt(t,e,r,{type:X.ATN_LOOP_END}),l=jt(t,e,r,{type:X.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,bt(s,a),bt(s,u),bt(o,l),i!==void 0?(bt(l,u),bt(l,i.left),bt(i.right,a)):bt(l,s),t.decisionMap[El(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function Oae(t,e,r,n){let i=n.left,a=n.right;return bt(i,a),t.decisionMap[El(e,"Option",r.idx)]=i,n}function ya(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Ks(t,e,r,n,...i){let a=jt(t,e,n,{type:X.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(bt(r,s.left),bt(s.right,a)):bt(r,a);let o={left:r,right:a};return t.decisionMap[El(e,Iae(n),n.idx)]=r,o}function Iae(t){if(t instanceof Ar.Alternation)return"Alternation";if(t instanceof Ar.Option)return"Option";if(t instanceof Ar.Repetition)return"Repetition";if(t instanceof Ar.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Ar.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Ar.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Dae(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof Pl,l=s,c=e[a+1].left;o.left.type===X.ATN_BASIC&&o.right.type===X.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,qae(t,o.right)):bt(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function RT(t,e,r,n){let i=jt(t,e,n,{type:X.ATN_BASIC}),a=jt(t,e,n,{type:X.ATN_BASIC});return AT(i,new rp(a,r)),{left:i,right:a}}function xae(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=jt(t,e,r,{type:X.ATN_BASIC}),o=jt(t,e,r,{type:X.ATN_BASIC}),s=new Pl(i,n,o);return AT(a,s),{left:a,right:o}}function Lae(t,e,r){let n=t.ruleToStartState.get(e);bt(n,r.left);let i=t.ruleToStopState.get(e);return bt(r.right,i),{left:n,right:i}}function bt(t,e){let r=new np(e);AT(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function AT(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function qae(t,e){t.states.splice(t.states.indexOf(e),1)}});var HD=d(ri=>{"use strict";var Mae=ri&&ri.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ri,"__esModule",{value:!0});ri.getATNConfigKey=ri.ATNConfigSet=ri.DFA_ERROR=void 0;var Fae=Mae(qt());ri.DFA_ERROR={};var ST=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=UD(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,Fae.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};ri.ATNConfigSet=ST;function UD(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}ri.getATNConfigKey=UD});var WD=d((Eve,KD)=>{var jae=us();function Gae(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!jae(o):r(o,s)))var s=o,u=a}return u}KD.exports=Gae});var VD=d((kve,BD)=>{function Uae(t,e){return t<e}BD.exports=Uae});var YD=d((Nve,zD)=>{var Hae=WD(),Kae=VD(),Wae=Ma();function Bae(t){return t&&t.length?Hae(t,Wae,Kae):void 0}zD.exports=Bae});var JD=d((wve,XD)=>{var Vae=Vr(),zae=vv();function Yae(t,e){return t&&t.length?zae(t,Vae(e,2)):[]}XD.exports=Yae});var ix=d(Ws=>{"use strict";var va=Ws&&Ws.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ws,"__esModule",{value:!0});Ws.LLStarLookaheadStrategy=void 0;var Or=Ja(),Cn=GD(),ga=HD(),Xae=va(YD()),Jae=va(Nd()),Qae=va(JD()),kl=va(qt()),Zae=va(Rn()),bT=va(Mt()),eoe=va(Er()),QD=va(Ci());function toe(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var ip=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},ZD=new ip,PT=class extends Or.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,Cn.createATN)(e.rules),this.dfas=roe(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Cn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,kl.default)((0,Or.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>(0,kl.default)(m,v=>v[0]));if(ex(f,!1)&&!a){let m=(0,QD.default)(f,(v,y,R)=>((0,bT.default)(y,P=>{P&&(v[P.tokenTypeIdx]=R,(0,bT.default)(P.categoryMatches,E=>{v[E]=R}))}),v),{});return i?function(v){var y;let R=this.LA(1),P=m[R.tokenTypeIdx];if(v!==void 0&&P!==void 0){let E=(y=v[P])===null||y===void 0?void 0:y.GATE;if(E!==void 0&&E.call(this)===!1)return}return P}:function(){let v=this.LA(1);return m[v.tokenTypeIdx]}}else return i?function(m){let v=new ip,y=m===void 0?0:m.length;for(let P=0;P<y;P++){let E=m?.[P].GATE;v.set(P,E===void 0||E.call(this))}let R=CT.call(this,o,c,v,s);return typeof R=="number"?R:void 0}:function(){let m=CT.call(this,o,c,ZD,s);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Cn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,kl.default)((0,Or.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>(0,kl.default)(m,v=>v[0]));if(ex(f)&&f[0][0]&&!a){let m=f[0],v=(0,Zae.default)(m);if(v.length===1&&(0,eoe.default)(v[0].categoryMatches)){let R=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===R}}else{let y=(0,QD.default)(v,(R,P)=>(P!==void 0&&(R[P.tokenTypeIdx]=!0,(0,bT.default)(P.categoryMatches,E=>{R[E]=!0})),R),{});return function(){let R=this.LA(1);return y[R.tokenTypeIdx]===!0}}}return function(){let m=CT.call(this,o,c,ZD,s);return typeof m=="object"?!1:m===0}}};Ws.LLStarLookaheadStrategy=PT;function ex(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function roe(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=toe(t.decisionStates[n],n);return r}function CT(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=poe(i.atnStartState);a=nx(i,rx(s)),i.start=a}return noe.apply(this,[i,a,r,n])}function noe(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=loe(i,s);if(u===void 0&&(u=ioe.apply(this,[t,i,s,a,r,n])),u===ga.DFA_ERROR)return uoe(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function ioe(t,e,r,n,i,a){let o=coe(e.configs,r,i);if(o.size===0)return tx(t,e,r,ga.DFA_ERROR),ga.DFA_ERROR;let s=rx(o),u=doe(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(goe(o)){let l=(0,Xae.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,aoe.apply(this,[t,n,o.alts,a])}return s=tx(t,e,r,s),s}function aoe(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=ooe({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function ooe(t){let e=(0,kl.default)(t.prefixPath,i=>(0,Or.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${soe(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function soe(t){if(t instanceof Or.NonTerminal)return"SUBRULE";if(t instanceof Or.Option)return"OPTION";if(t instanceof Or.Alternation)return"OR";if(t instanceof Or.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof Or.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof Or.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof Or.Repetition)return"MANY";if(t instanceof Or.Terminal)return"CONSUME";throw Error("non exhaustive match")}function uoe(t,e,r){let n=(0,Jae.default)(e.configs.elements,a=>a.state.transitions),i=(0,Qae.default)(n.filter(a=>a instanceof Cn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function loe(t,e){return t.edges[e.tokenTypeIdx]}function coe(t,e,r){let n=new ga.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===Cn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=foe(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new ga.ATNConfigSet;for(let o of n.elements)ap(o,a)}if(i.length>0&&!moe(a))for(let o of i)a.add(o);return a}function foe(t,e){if(t instanceof Cn.AtomTransition&&(0,Or.tokenMatcher)(e,t.tokenType))return t.target}function doe(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function rx(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function tx(t,e,r,n){return n=nx(t,n),e.edges[r.tokenTypeIdx]=n,n}function nx(t,e){if(e===ga.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function poe(t){let e=new ga.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};ap(a,e)}return e}function ap(t,e){let r=t.state;if(r.type===Cn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};ap(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=hoe(t,a);o!==void 0&&ap(o,e)}}function hoe(t,e){if(e instanceof Cn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Cn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function moe(t){for(let e of t.elements)if(e.state.type===Cn.ATN_RULE_STOP)return!0;return!1}function yoe(t){for(let e of t.elements)if(e.state.type!==Cn.ATN_RULE_STOP)return!1;return!0}function goe(t){if(yoe(t))return!0;let e=voe(t.elements);return Toe(e)&&!_oe(e)}function voe(t){let e=new Map;for(let r of t){let n=(0,ga.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function Toe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function _oe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var ax=d(op=>{"use strict";Object.defineProperty(op,"__esModule",{value:!0});op.LLStarLookaheadStrategy=void 0;var Roe=ix();Object.defineProperty(op,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Roe.LLStarLookaheadStrategy}})});var ux=d(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.RootCstNodeImpl=Jr.CompositeCstNodeImpl=Jr.LeafCstNodeImpl=Jr.AbstractCstNode=Jr.CstNodeBuilder=void 0;var ox=vo(),Aoe=hr(),sx=Qe(),ET=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new sp(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new $l;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new wl(e.startOffset,e.image.length,(0,sx.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new wl(r.startOffset,r.image.length,(0,sx.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,Aoe.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};Jr.CstNodeBuilder=ET;var Nl=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};Jr.AbstractCstNode=Nl;var wl=class extends Nl{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};Jr.LeafCstNodeImpl=wl;var $l=class extends Nl{constructor(){super(...arguments),this.children=new Ol(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:ox.Position.create(0,0),end:ox.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};Jr.CompositeCstNodeImpl=$l;var Ol=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,Ol.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},sp=class extends $l{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};Jr.RootCstNodeImpl=sp});var fp=d(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.LangiumCompletionParser=pr.LangiumParserErrorMessageProvider=pr.LangiumParser=pr.AbstractLangiumParser=pr.DatatypeSymbol=void 0;var lp=Ja(),Soe=ax(),up=$e(),lx=kt(),cx=Ie(),boe=ux();pr.DatatypeSymbol=Symbol("Datatype");function kT(t){return t.$type===pr.DatatypeSymbol}var fx="\u200B",dx=t=>t.endsWith(fx)?t:t+fx,Il=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new $T(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};pr.AbstractLangiumParser=Il;var NT=class extends Il{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new boe.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,lx.isDataTypeRule)(e)?pr.DatatypeSymbol:(0,lx.getTypeName)(e),i=this.wrapper.DEFINE_RULE(dx(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===pr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,up.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(kT(u)){let l=i.image;(0,up.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(kT(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,cx.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),kT(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,cx.getContainerOfType)(e,up.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,up.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r))e[n]===void 0&&(e[n]=i);return e}get definitionErrors(){return this.wrapper.definitionErrors}};pr.LangiumParser=NT;var cp=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return lp.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return lp.defaultParserErrorProvider.buildEarlyExitMessage(e)}};pr.LangiumParserErrorMessageProvider=cp;var wT=class extends Il{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(dx(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};pr.LangiumCompletionParser=wT;var Coe={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new cp},$T=class extends lp.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Coe),{lookaheadStrategy:n?new lp.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new Soe.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var px=d(Bs=>{"use strict";Object.defineProperty(Bs,"__esModule",{value:!0});Bs.assertUnreachable=Bs.ErrorWithLocation=void 0;var OT=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};Bs.ErrorWithLocation=OT;function Poe(t){throw new Error("Error! The input value was not handled.")}Bs.assertUnreachable=Poe});var DT=d(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});pp.createParser=void 0;var hx=Ja(),Fe=$e(),Dl=px(),Eoe=Dt(),mx=kt(),yx=Et();function koe(t,e,r){return Noe({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}pp.createParser=koe;function Noe(t,e){let r=(0,yx.getAllReachableRules)(e,!1),n=(0,Eoe.stream)(e.rules).filter(Fe.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,Za(a,i.definition)))}}function Za(t,e,r=!1){let n;if((0,Fe.isKeyword)(e))n=Loe(t,e);else if((0,Fe.isAction)(e))n=woe(t,e);else if((0,Fe.isAssignment)(e))n=Za(t,e.terminal);else if((0,Fe.isCrossReference)(e))n=gx(t,e);else if((0,Fe.isRuleCall)(e))n=$oe(t,e);else if((0,Fe.isAlternatives)(e))n=Ioe(t,e);else if((0,Fe.isUnorderedGroup)(e))n=Doe(t,e);else if((0,Fe.isGroup)(e))n=xoe(t,e);else throw new Dl.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return vx(t,r?void 0:dp(e),n,e.cardinality)}function woe(t,e){let r=(0,mx.getTypeName)(e);return()=>t.parser.action(r,e)}function $oe(t,e){let r=e.rule.ref;if((0,Fe.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?Ooe(r,e.arguments):()=>({});return a=>t.parser.subrule(n,Tx(t,r),e,i(a))}else if((0,Fe.isTerminalRule)(r)){let n=t.consume++,i=IT(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,Dl.assertUnreachable)(r);else throw new Dl.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function Ooe(t,e){let r=e.map(n=>xi(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function xi(t){if((0,Fe.isDisjunction)(t)){let e=xi(t.left),r=xi(t.right);return n=>e(n)||r(n)}else if((0,Fe.isConjunction)(t)){let e=xi(t.left),r=xi(t.right);return n=>e(n)&&r(n)}else if((0,Fe.isNegation)(t)){let e=xi(t.value);return r=>!e(r)}else if((0,Fe.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Fe.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,Dl.assertUnreachable)(t)}function Ioe(t,e){if(e.elements.length===1)return Za(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:Za(t,i,!0)},o=dp(i);o&&(a.GATE=xi(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Doe(t,e){if(e.elements.length===1)return Za(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:Za(t,s,!0)},l=dp(s);l&&(u.GATE=xi(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let y=f.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let m=u.GATE;return m?c.GATE=()=>m(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=vx(t,dp(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function xoe(t,e){let r=e.elements.map(n=>Za(t,n));return n=>r.forEach(i=>i(n))}function dp(t){if((0,Fe.isGroup)(t))return t.guardCondition}function gx(t,e,r=e.terminal){if(r)if((0,Fe.isRuleCall)(r)&&(0,Fe.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Tx(t,r.rule.ref),e,i)}else if((0,Fe.isRuleCall)(r)&&(0,Fe.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=IT(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Fe.isKeyword)(r)){let n=t.consume++,i=IT(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,yx.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,mx.getTypeName)(e.type.ref));return gx(t,e,i)}}function Loe(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function vx(t,e,r,n){let i=e&&xi(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,hx.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,hx.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,Dl.assertUnreachable)(n)}function Tx(t,e){let r=qoe(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function qoe(t,e){if((0,Fe.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Fe.isParserRule)(n);)((0,Fe.isGroup)(n)||(0,Fe.isAlternatives)(n)||(0,Fe.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function IT(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var _x=d(hp=>{"use strict";Object.defineProperty(hp,"__esModule",{value:!0});hp.createCompletionParser=void 0;var Moe=fp(),Foe=DT();function joe(t){let e=t.Grammar,r=t.parser.Lexer,n=new Moe.LangiumCompletionParser(t);return(0,Foe.createParser)(e,n,r.definition),n.finalize(),n}hp.createCompletionParser=joe});var xT=d(Vs=>{"use strict";Object.defineProperty(Vs,"__esModule",{value:!0});Vs.prepareLangiumParser=Vs.createLangiumParser=void 0;var Goe=fp(),Uoe=DT();function Hoe(t){let e=Rx(t);return e.finalize(),e}Vs.createLangiumParser=Hoe;function Rx(t){let e=t.Grammar,r=t.parser.Lexer,n=new Goe.LangiumParser(t);return(0,Uoe.createParser)(e,n,r.definition)}Vs.prepareLangiumParser=Rx});var MT=d(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});yp.DefaultTokenBuilder=void 0;var Koe=Ja(),LT=$e(),Woe=kt(),Boe=Ie(),Voe=Et(),mp=Do(),zoe=Dt(),qT=class{buildTokens(e,r){let n=(0,zoe.stream)((0,Voe.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,mp.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(LT.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Woe.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,mp.isWhitespaceRegExp)(r)?Koe.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(LT.isParserRule).flatMap(i=>(0,Boe.streamAllContents)(i).filter(LT.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,mp.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,mp.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};yp.DefaultTokenBuilder=qT});var GT=d(Gt=>{"use strict";Object.defineProperty(Gt,"__esModule",{value:!0});Gt.convertBoolean=Gt.convertNumber=Gt.convertDate=Gt.convertBigint=Gt.convertInt=Gt.convertID=Gt.convertString=Gt.DefaultValueConverter=void 0;var Ax=$e(),Yoe=kt(),Xoe=Et(),FT=class{convert(e,r){let n=r.feature;if((0,Ax.isCrossReference)(n)&&(n=(0,Xoe.getCrossReferenceTerminal)(n)),(0,Ax.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return bx(r);case"STRING":return jT(r);case"ID":return Sx(r);case"REGEXLITERAL":return jT(r)}switch((i=(0,Yoe.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Ex(r);case"boolean":return kx(r);case"bigint":return Cx(r);case"date":return Px(r);default:return r}}};Gt.DefaultValueConverter=FT;function jT(t){return t.substring(1,t.length-1)}Gt.convertString=jT;function Sx(t){return t.charAt(0)==="^"?t.substring(1):t}Gt.convertID=Sx;function bx(t){return parseInt(t)}Gt.convertInt=bx;function Cx(t){return BigInt(t)}Gt.convertBigint=Cx;function Px(t){return new Date(t)}Gt.convertDate=Px;function Ex(t){return Number(t)}Gt.convertNumber=Ex;function kx(t){return t.toLowerCase()==="true"}Gt.convertBoolean=kx});var KT=d(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.DefaultLinker=void 0;var Joe=qe(),zs=hr(),gp=Ie(),Qoe=jr(),UT=ta(),HT=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=Joe.CancellationToken.None){for(let n of(0,gp.streamAst)(e.parseResult.value))await(0,Qoe.interruptAndCheck)(r),(0,gp.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=UT.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,zs.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,zs.isAstNode)(this._ref))return this._ref;if((0,zs.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,gp.getDocument)(e).state<UT.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,zs.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,zs.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,zs.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,gp.getDocument)(e.container);n.state<UT.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};vp.DefaultLinker=HT});var VT=d(Tp=>{"use strict";Object.defineProperty(Tp,"__esModule",{value:!0});Tp.DefaultJsonSerializer=void 0;var WT=hr();function Nx(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var BT=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){return JSON.stringify(e,(n,i)=>this.replacer(n,i,r?.refText),r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,n){var i,a;if(!this.ignoreProperties.has(e)){if((0,WT.isReference)(r)){let o=r.ref,s=n?r.$refText:void 0;return o?{$refText:s,$ref:"#"+(o&&this.astNodeLocator.getAstNodePath(o))}:{$refText:s,$error:(a=(i=r.error)===null||i===void 0?void 0:i.message)!==null&&a!==void 0?a:"Could not resolve reference"}}return r}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];Nx(c)?u[l]=this.reviveReference(e,s,r,c):(0,WT.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else Nx(u)?e[s]=this.reviveReference(e,s,r,u):(0,WT.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};Tp.DefaultJsonSerializer=BT});var YT=d(_p=>{"use strict";Object.defineProperty(_p,"__esModule",{value:!0});_p.DefaultServiceRegistry=void 0;var Zoe=Ln(),zT=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=Zoe.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};_p.DefaultServiceRegistry=zT});var JT=d(Rp=>{"use strict";Object.defineProperty(Rp,"__esModule",{value:!0});Rp.ValidationRegistry=void 0;var ese=Pr(),tse=jr(),XT=class{constructor(e){this.validationChecks=new ese.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,tse.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};Rp.ValidationRegistry=XT});var e_=d(Ys=>{"use strict";Object.defineProperty(Ys,"__esModule",{value:!0});Ys.DefaultReferenceDescriptionProvider=Ys.DefaultAstNodeDescriptionProvider=void 0;var rse=qe(),nse=hr(),Ap=Ie(),ise=Qe(),ase=jr(),ose=Ti(),QT=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator}createDescription(e,r,n=(0,Ap.getDocument)(e)){return{node:e,name:r,type:e.$type,documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};Ys.DefaultAstNodeDescriptionProvider=QT;var ZT=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=rse.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,Ap.streamAst)(i))await(0,ase.interruptAndCheck)(r),(0,Ap.streamReferences)(a).filter(o=>!(0,nse.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,Ap.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,ise.toDocumentSegment)(n),local:(0,ose.equalURI)(r.documentUri,i)}}};Ys.DefaultReferenceDescriptionProvider=ZT});var wx=d(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.DefaultAstNodeLocator=void 0;var t_=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Sp.DefaultAstNodeLocator=t_});var n_=d(bp=>{"use strict";Object.defineProperty(bp,"__esModule",{value:!0});bp.DefaultConfigurationProvider=void 0;var sse=yt(),r_=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(sse.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};bp.DefaultConfigurationProvider=r_});var o_=d(Pp=>{"use strict";Object.defineProperty(Pp,"__esModule",{value:!0});Pp.DefaultDocumentBuilder=void 0;var Cp=qe(),use=Pr(),i_=jr(),ni=ta(),a_=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new use.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Cp.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=Cp.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,i_.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),Cp.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,ni.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<ni.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,ni.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,ni.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,ni.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,ni.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,ni.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,ni.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,i_.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Cp.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,i_.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=ni.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=ni.DocumentState.Validated}};Pp.DefaultDocumentBuilder=a_});var c_=d(Ep=>{"use strict";Object.defineProperty(Ep,"__esModule",{value:!0});Ep.DefaultIndexManager=void 0;var $x=qe(),lse=Ie(),s_=Dt(),u_=Ti(),Ox=ta(),l_=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,lse.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,u_.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,s_.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,s_.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,s_.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=$x.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=Ox.DocumentState.IndexedContent}async updateReferences(e,r=$x.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=Ox.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,u_.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,u_.equalURI)(o.targetUri,n)):!1}};Ep.DefaultIndexManager=l_});var p_=d(kp=>{"use strict";Object.defineProperty(kp,"__esModule",{value:!0});kp.DefaultWorkspaceManager=void 0;var cse=qe(),f_=Ln(),fse=jr(),d_=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=cse.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,fse.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return f_.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=f_.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=f_.Utils.extname(r.uri);return n.includes(a)}return!1}};kp.DefaultWorkspaceManager=d_});var g_=d(ii=>{"use strict";Object.defineProperty(ii,"__esModule",{value:!0});ii.isTokenTypeDictionary=ii.isIMultiModeLexerDefinition=ii.isTokenTypeArray=ii.DefaultLexer=void 0;var dse=Ja(),h_=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=m_(r)?Object.values(r):r;this.chevrotainLexer=new dse.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(m_(e))return e;let r=y_(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};ii.DefaultLexer=h_;function Ix(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}ii.isTokenTypeArray=Ix;function y_(t){return t&&"modes"in t&&"defaultMode"in t}ii.isIMultiModeLexerDefinition=y_;function m_(t){return!Ix(t)&&!y_(t)}ii.isTokenTypeDictionary=m_});var wf=d(Xs=>{"use strict";Object.defineProperty(Xs,"__esModule",{value:!0});Xs.createDefaultSharedModule=Xs.createDefaultModule=void 0;var pse=qe(),hse=Pm(),mse=mb(),yse=_x(),gse=Wy(),vse=Vy(),Tse=Yy(),_se=Qc(),Rse=Qy(),Ase=eg(),Sse=ug(),bse=cg(),Cse=dg(),Pse=xT(),Ese=MT(),kse=GT(),Nse=KT(),wse=Io(),$se=My(),Ose=Wc(),Ise=Vc(),Dse=VT(),xse=YT(),Lse=jr(),qse=Xc(),Mse=JT(),Dx=e_(),Fse=wx(),jse=n_(),Gse=o_(),xx=ta(),Use=c_(),Hse=p_(),Kse=g_();function Wse(t){return{parser:{GrammarConfig:e=>(0,mse.createGrammarConfig)(e),LangiumParser:e=>(0,Pse.createLangiumParser)(e),CompletionParser:e=>(0,yse.createCompletionParser)(e),ValueConverter:()=>new kse.DefaultValueConverter,TokenBuilder:()=>new Ese.DefaultTokenBuilder,Lexer:e=>new Kse.DefaultLexer(e)},lsp:{CompletionProvider:e=>new gse.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new Tse.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new Ase.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new _se.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new bse.DefaultReferencesProvider(e),DefinitionProvider:e=>new Rse.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new vse.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new Cse.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new Fse.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new Dx.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new Dx.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new Nse.DefaultLinker(e),NameProvider:()=>new wse.DefaultNameProvider,ScopeProvider:e=>new Ise.DefaultScopeProvider(e),ScopeComputation:e=>new Ose.DefaultScopeComputation(e),References:e=>new $se.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Dse.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new qse.DefaultDocumentValidator(e),ValidationRegistry:e=>new Mse.ValidationRegistry(e)},shared:()=>t.shared}}Xs.createDefaultModule=Wse;function Bse(t){return{ServiceRegistry:()=>new xse.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Sse.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new xx.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new xx.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Gse.DefaultDocumentBuilder(e),TextDocuments:()=>new pse.TextDocuments(hse.TextDocument),IndexManager:e=>new Use.DefaultIndexManager(e),WorkspaceManager:e=>new Hse.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Lse.MutexLock,ConfigurationProvider:e=>new jse.DefaultConfigurationProvider(e)}}}Xs.createDefaultSharedModule=Bse});var v_=d(Ir=>{"use strict";Object.defineProperty(Ir,"__esModule",{value:!0});Ir.findIndentation=Ir.SNLE=Ir.expandToString=Ir.expandToStringWithNL=void 0;var xl=wo();function Vse(t,...e){return Lx(t,...e)+xl.EOL}Ir.expandToStringWithNL=Vse;function Lx(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Ir.SNLE:Xse((0,xl.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(xl.EOL).filter(o=>o.trim()!==Ir.SNLE).map(o=>o.replace(Ir.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=qx(r);return r.map(o=>o.slice(a).trimRight()).join(`
`)}Ir.expandToString=Lx;Ir.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");var zse=new RegExp(xl.EOL,"g"),Yse=/\S|$/;function Xse(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(zse,xl.EOL+n)}function qx(t){let e=t.filter(n=>n.length>0).map(n=>n.search(Yse)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Ir.findIndentation=qx});var Fx=d(Js=>{"use strict";Object.defineProperty(Js,"__esModule",{value:!0});Js.joinToNode=Js.expandToNode=void 0;var Li=wo(),Jse=v_(),Np=Object.freeze(new Li.NewLineNode),Mx=Object.freeze(new Li.CompositeGeneratorNode);function Qse(t,...e){let r=Zse(t),n=eue(t,e,r);return tue(n)}Js.expandToNode=Qse;function Zse(t){let e=t.join("_").split(Li.EOL),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,Jse.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function eue(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(Li.EOL).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,v)=>v===0?n?[]:[m]:v===1&&f.length===0?[m]:f.concat(Np,m):(f,m,v)=>v===0?[m]:f.concat(Np,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,Li.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new Li.CompositeGeneratorNode(String(e[c])):c<e.length?Mx:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===Np?o.slice(0,s-2):o.slice(0,s-1):o}function tue(t){return t.reduce((r,n,i)=>n===Mx?r:n===Np?{indent:"",node:i===0||(0,Li.isNewLineNode)(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>({indent:r.indent===""&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):r.indent,node:r.indent.length===0?r.node.append(n):r.node.indent(o=>o.append(n),r.indent)}))(),{indent:"",node:new Li.CompositeGeneratorNode}).node}function rue(t,e=String,{prefix:r,suffix:n,appendNewLineIfNotEmpty:i}={}){return nue(t,(a,o,s,u)=>(a??(a=new Li.CompositeGeneratorNode),a.append(r&&r(o,s,u)).append(e(o,s,u)).append(n&&n(o,s,u)).appendNewLineIfNotEmptyIf(!a.isEmpty()&&!!i)))}Js.joinToNode=rue;function nue(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var Gx=d(jx=>{"use strict";Object.defineProperty(jx,"__esModule",{value:!0})});var Hx=d(Ux=>{"use strict";Object.defineProperty(Ux,"__esModule",{value:!0})});var Wx=d(Kx=>{"use strict";Object.defineProperty(Kx,"__esModule",{value:!0})});var eo=d(Z=>{"use strict";var Bx=Z&&Z.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),iue=Z&&Z.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),ce=Z&&Z.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Bx(e,t,r)},aue=Z&&Z.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&Bx(e,t,r);return iue(e,t),e};Object.defineProperty(Z,"__esModule",{value:!0});Z.GrammarAST=Z.expandToStringWithNL=Z.expandToString=void 0;ce(wf(),Z);ce(Eu(),Z);ce(wo(),Z);ce(Fx(),Z);var Vx=v_();Object.defineProperty(Z,"expandToString",{enumerable:!0,get:function(){return Vx.expandToString}});Object.defineProperty(Z,"expandToStringWithNL",{enumerable:!0,get:function(){return Vx.expandToStringWithNL}});ce(oy(),Z);ce(Cg(),Z);ce(Gx(),Z);ce(hg(),Z);ce(fp(),Z);ce(xT(),Z);ce(Hx(),Z);ce(MT(),Z);ce(GT(),Z);ce(g_(),Z);ce(KT(),Z);ce(Io(),Z);ce(Wc(),Z);ce(Vc(),Z);ce(VT(),Z);ce(YT(),Z);ce(Wx(),Z);ce(hr(),Z);ce(Ie(),Z);ce(Pr(),Z);ce(Qe(),Z);ce(Et(),Z);ce(jr(),Z);ce(Ti(),Z);ce(Do(),Z);ce(Dt(),Z);ce(Xc(),Z);ce(JT(),Z);ce(e_(),Z);ce(o_(),Z);ce(ta(),Z);ce(c_(),Z);ce(Pg(),Z);ce(p_(),Z);ce(n_(),Z);var oue=aue($e());Z.GrammarAST=oue});var Yx=d((aTe,zx)=>{"use strict";zx.exports=qe()});var T_=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlter=p.ASTAlter=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTRange=p.ASTRange=p.isASTParameter=p.ASTParameter=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTList=p.ASTList=p.isASTInstruction=p.ASTInstruction=p.isASTDeclaration=p.ASTDeclaration=void 0;p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTOffsetList=p.ASTOffsetList=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=p.isASTDoubleValue=p.ASTDoubleValue=p.isASTDoubleRange=p.ASTDoubleRange=p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTrajectory=p.ASTTrajectory=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTStringList=p.ASTStringList=p.isASTSpeedParameterType=p.ASTSpeedParameterType=p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=p.isASTSaturationParameterType=p.ASTSaturationParameterType=p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=void 0;var sue=eo();p.ASTDeclaration="ASTDeclaration";function uue(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=uue;p.ASTInstruction="ASTInstruction";function lue(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=lue;p.ASTList="ASTList";function cue(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=cue;p.ASTNumber="ASTNumber";function fue(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=fue;p.ASTNumberOffset="ASTNumberOffset";function due(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=due;p.ASTParameter="ASTParameter";function pue(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=pue;p.ASTRange="ASTRange";function hue(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=hue;p.ASTReplayTarget="ASTReplayTarget";function mue(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=mue;p.ASTTarget="ASTTarget";function yue(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=yue;p.ASTTimeScope="ASTTimeScope";function gue(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=gue;p.ASTValue="ASTValue";function vue(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=vue;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function Tue(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=Tue;p.ASTAllPlanes="ASTAllPlanes";function _ue(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=_ue;p.ASTAlter="ASTAlter";function Rue(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=Rue;p.ASTAlterSpeed="ASTAlterSpeed";function Aue(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=Aue;p.ASTAssertion="ASTAssertion";function Sue(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=Sue;p.ASTAssertions="ASTAssertions";function bue(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=bue;p.ASTAt="ASTAt";function Cue(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=Cue;p.ASTAtFor="ASTAtFor";function Pue(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=Pue;p.ASTConstantValue="ASTConstantValue";function Eue(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=Eue;p.ASTCreate="ASTCreate";function kue(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=kue;p.ASTCreationParameter="ASTCreationParameter";function Nue(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=Nue;p.ASTCreationParameters="ASTCreationParameters";function wue(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=wue;p.ASTCreationParameterType="ASTCreationParameterType";function $ue(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=$ue;p.ASTCut="ASTCut";function Oue(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=Oue;p.ASTDelay="ASTDelay";function Iue(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=Iue;p.ASTDelayParameter="ASTDelayParameter";function Due(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=Due;p.ASTDoubleRange="ASTDoubleRange";function xue(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=xue;p.ASTDoubleValue="ASTDoubleValue";function Lue(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=Lue;p.ASTFilters="ASTFilters";function que(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=que;p.ASTHide="ASTHide";function Mue(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=Mue;p.ASTHideParameter="ASTHideParameter";function Fue(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=Fue;p.ASTIntegerRange="ASTIntegerRange";function jue(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=jue;p.ASTIntegerValue="ASTIntegerValue";function Gue(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=Gue;p.ASTLeftShift="ASTLeftShift";function Uue(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=Uue;p.ASTListDeclaration="ASTListDeclaration";function Hue(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=Hue;p.ASTOffsetList="ASTOffsetList";function Kue(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=Kue;p.ASTParamDrift="ASTParamDrift";function Wue(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Wue;p.ASTParamEdit="ASTParamEdit";function Bue(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=Bue;p.ASTParameters="ASTParameters";function Vue(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=Vue;p.ASTParameterType="ASTParameterType";function zue(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=zue;p.ASTParamNoise="ASTParamNoise";function Yue(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=Yue;p.ASTParamOffset="ASTParamOffset";function Xue(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=Xue;p.ASTPlane="ASTPlane";function Jue(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=Jue;p.ASTPlaneFrom="ASTPlaneFrom";function Que(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=Que;p.ASTRangeDeclaration="ASTRangeDeclaration";function Zue(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=Zue;p.ASTRecordingParameterType="ASTRecordingParameterType";function ele(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=ele;p.ASTRecordingValue="ASTRecordingValue";function tle(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=tle;p.ASTReplay="ASTReplay";function rle(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=rle;p.ASTRightShift="ASTRightShift";function nle(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=nle;p.ASTRotate="ASTRotate";function ile(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=ile;p.ASTRotateParameter="ASTRotateParameter";function ale(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=ale;p.ASTSaturate="ASTSaturate";function ole(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=ole;p.ASTSaturationParameter="ASTSaturationParameter";function sle(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=sle;p.ASTSaturationParameters="ASTSaturationParameters";function ule(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=ule;p.ASTSaturationParameterType="ASTSaturationParameterType";function lle(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=lle;p.ASTScenario="ASTScenario";function cle(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=cle;p.ASTSpeedParameter="ASTSpeedParameter";function fle(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=fle;p.ASTSpeedParameters="ASTSpeedParameters";function dle(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=dle;p.ASTSpeedParameterType="ASTSpeedParameterType";function ple(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=ple;p.ASTStringList="ASTStringList";function hle(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=hle;p.ASTStringValue="ASTStringValue";function mle(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=mle;p.ASTTime="ASTTime";function yle(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=yle;p.ASTTrajectory="ASTTrajectory";function gle(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=gle;p.ASTTrigger="ASTTrigger";function vle(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=vle;p.ASTVariableValue="ASTVariableValue";function Tle(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=Tle;p.ASTWayPoint="ASTWayPoint";function _le(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=_le;p.ASTWayPoints="ASTWayPoints";function Rle(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=Rle;p.ASTWindow="ASTWindow";function Ale(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=Ale;var wp=class extends sue.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlter:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:case p.ASTTrajectory:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTAtFor:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTStringValue:case p.ASTVariableValue:case p.ASTNumberOffset:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleRange:case p.ASTIntegerRange:return this.isSubtype(p.ASTRange,r);case p.ASTDoubleValue:case p.ASTIntegerValue:case p.ASTRecordingValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTRightShift:case p.ASTNumber:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);case p.ASTOffsetList:case p.ASTStringList:return this.isSubtype(p.ASTList,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=wp;p.reflection=new wp});var Xx=d(Op=>{"use strict";Object.defineProperty(Op,"__esModule",{value:!0});Op.AttackScenarioGrammarGrammar=void 0;var Sle=eo(),$p,ble=()=>$p!=null?$p:$p=(0,Sle.loadGrammarFromJson)(`{
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
}`);Op.AttackScenarioGrammarGrammar=ble});var Jx=d(qi=>{"use strict";Object.defineProperty(qi,"__esModule",{value:!0});qi.AttackScenarioGrammarGeneratedModule=qi.FditscenarioGeneratedSharedModule=qi.AttackScenarioGrammarLanguageMetaData=void 0;var Cle=T_(),Ple=Xx();qi.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};qi.FditscenarioGeneratedSharedModule={AstReflection:()=>new Cle.FditscenarioAstReflection};qi.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,Ple.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>qi.AttackScenarioGrammarLanguageMetaData,parser:{}}});var Qx=d(Qs=>{"use strict";Object.defineProperty(Qs,"__esModule",{value:!0});Qs.FditscenarioValidator=Qs.registerValidationChecks=void 0;function Ele(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}Qs.registerValidationChecks=Ele;var __=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};Qs.FditscenarioValidator=__});var oL=d(Lp=>{"use strict";Object.defineProperty(Lp,"__esModule",{value:!0});Lp.generateCommands=void 0;var Yt=T_();function kle(t){return Nle(t)}Lp.generateCommands=kle;function Nle(t){return wle(t)}function wle(t){return t.declarations.length!=0?[{declarations:$le(t.declarations),instructions:Zx(t.instructions)}]:[{instructions:Zx(t.instructions)}]}function $le(t){return t.flatMap(e=>Ole(e)).filter(e=>e!==void 0)}var Qr;(function(t){t.deletion="deletion",t.creation="creation",t.alteration="alteration",t.saturation="saturation",t.duplication="duplication",t.convergence="convergence",t.custom="custom",t.replay="replay",t.timestamp="timestamp",t.reductionDF="reductionDF",t.speedAltaration="speedAltaration",t.trajectory="trajectory"})(Qr||(Qr={}));var Zr;(function(t){t.altitude="ALTITUDE",t.latitude="LATITUDE",t.icao="ICAO",t.track="TRACK",t.callsign="CALLSIGN",t.emergency="EMERGENCY",t.groundspeed="GROUNDSPEED",t.longitude="LONGITUDE",t.spi="SPI",t.squawk="SQUAWK"})(Zr||(Zr={}));var Dp;(function(t){t.east_west_velocity="EAST_WEST_VELOCITY",t.north_south_velocity="NORTH_SOUTH_VELOCITY"})(Dp||(Dp={}));var xp;(function(t){t.icao="ICAO",t.aircraft_number="NUMBER"})(xp||(xp={}));function Zx(t){return t.flatMap(e=>xle(e)).filter(e=>e!==void 0)}function Ole(t){return(0,Yt.isASTListDeclaration)(t)?[{constant:t.constant,listDeclaration:Ile(t.list)}]:[{constant:t.constant,rangeDeclaration:Dle(t.range)}]}function Ile(t){return[{items:t.items}]}function Dle(t){return[{start:t.start,end:t.end}]}function xle(t){return(0,Yt.isASTHide)(t)?[{action:Qr.deletion,target:Ta(t.target),timescope:ai(t.timeScope),trigger:to(t.trigger)}]:(0,Yt.isASTAlter)(t)?[{ActionType:Qr.alteration,target:Ta(t.target),timescope:ai(t.timeScope),trigger:to(t.trigger),parameters:qle(t.parameters)}]:(0,Yt.isASTCreate)(t)?[{ActionType:Qr.creation,timescope:ai(t.timeScope),trajectory:eL(t.trajectory)}]:(0,Yt.isASTTrajectory)(t)?[{ActionType:Qr.trajectory,target:Ta(t.target),timescope:ai(t.timeScope),trajectory:eL(t.trajectory),trigger:to(t.trigger)}]:(0,Yt.isASTAlterSpeed)(t)?[{ActionType:Qr.speedAltaration,target:Ta(t.target),timescope:ai(t.timeScope),parameters:Fle(t.parameters),trigger:to(t.trigger)}]:(0,Yt.isASTSaturate)(t)?[{ActionType:Qr.saturation,target:Ta(t.target),timescope:ai(t.timeScope),parameters:Ule(t.parameters),trigger:to(t.trigger)}]:(0,Yt.isASTReplay)(t)?[{ActionType:Qr.replay,target:Wle(t.target),timescope:ai(t.timeScope)}]:(0,Yt.isASTDelay)(t)?[{ActionType:Qr.timestamp,target:Ta(t.target),timescope:ai(t.timeScope),delay:Vle(t.delay)}]:(0,Yt.isASTRotate)(t)?[{ActionType:Qr.convergence,target:Ta(t.target),timescope:ai(t.timeScope),angle:zle(t.angle),trigger:to(t.trigger)}]:[{ActionType:Qr.reductionDF,target:Ta(t.target),timescope:ai(t.timeScope),trigger:to(t.trigger)}]}function ai(t){return(0,Yt.isASTAt)(t)?[{type:"timeAt",time:ro(t.time)}]:(0,Yt.isASTWindow)(t)?[{type:"timeWindow",lowerBound:ro(t.start),upperBound:ro(t.end)}]:[{type:"timeAtFor",time:ro(t.time),for:ro(t.for)}]}function eL(t){return Lle(t.waypoints)}function Lle(t){let e=tL(t[0]);for(let r=1;r<t.length;r++)e.push(tL(t[r]));return e}function tL(t){return[{latitude:_a(t.latitude),longitude:_a(t.longitude),altitude:_a(t.altitude),time:ro(t.time)}]}function Ta(t){return(0,Yt.isASTAllPlanes)(t)?"all_planes":"plane"}function ro(t){return _a(t.realTime)}function _a(t){return t.content}function to(t){return t!=null?[_a(t.triggername)]:[]}function qle(t){return Mle(t.items)}function Mle(t){let e=rL(t[0]);for(let r=1;r<t.length;r++)e.push(rL(t[r]));return e}function rL(t){return(0,Yt.isASTParamEdit)(t)?[{parameter:{name:Ip(t.name),value:t.value.content}}]:(0,Yt.isASTParamOffset)(t)?[{parameter:{name:Ip(t.name),operation:t.offset_op,value:t.value.content}}]:(0,Yt.isASTParamNoise)(t)?[{parameter:{name:Ip(t.name),value:t.value.content}}]:[{parameter:{name:Ip(t.name),operation:t.drift_op,value:t.value.content}}]}function Ip(t){return t.ALTITUDE!=null?Zr.altitude:t.CALLSIGN!=null?Zr.callsign:t.EMERGENCY!=null?Zr.emergency:t.GROUND_SPEED!=null?Zr.groundspeed:t.ICAO!=null?Zr.icao:t.LATITUDE!=null?Zr.latitude:t.LONGITUDE!=null?Zr.longitude:t.SPI!=null?Zr.spi:t.SQUAWK!=null?Zr.squawk:Zr.track}function Fle(t){return jle(t.items)}function jle(t){let e=nL(t[0]);for(let r=1;r<t.length;r++)e.push(nL(t[r]));return e}function nL(t){return[{parameter:{name:Gle(t.name),value:t.value.content}}]}function Gle(t){return t.EAST_WEST_VELOCITY!=null?Dp.east_west_velocity:Dp.north_south_velocity}function Ule(t){return Hle(t.items)}function Hle(t){let e=iL(t[0]);for(let r=1;r<t.length;r++)e.push(iL(t[r]));return e}function iL(t){return[{parameter:{name:Kle(t.name),value:t.value.content}}]}function Kle(t){return t.ICAO!=null?xp.icao:xp.aircraft_number}function Wle(t){return(0,Yt.isASTPlaneFrom)(t)?[{filters:aL(t.filters),recording:t.recording.content}]:t.filters!=null?[{filters:aL(t.filters),recording:t.recording.content}]:[{recording:t.recording.content}]}function aL(t){return Ble(t.filters)}function Ble(t){let e=[_a(t[0])];for(let r=1;r<t.length;r++)e.push(_a(t[r]));return e}function Vle(t){return[{value:ro(t.value)}]}function zle(t){return[{value:_a(t.value)}]}});var uL=d((fTe,sL)=>{"use strict";sL.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var R_=d((dTe,cL)=>{var Ll=uL(),lL={};for(let t of Object.keys(Ll))lL[Ll[t]]=t;var Y={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};cL.exports=Y;for(let t of Object.keys(Y)){if(!("channels"in Y[t]))throw new Error("missing channels property: "+t);if(!("labels"in Y[t]))throw new Error("missing channel labels property: "+t);if(Y[t].labels.length!==Y[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=Y[t];delete Y[t].channels,delete Y[t].labels,Object.defineProperty(Y[t],"channels",{value:e}),Object.defineProperty(Y[t],"labels",{value:r})}Y.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(e,r,n),a=Math.max(e,r,n),o=a-i,s,u;a===i?s=0:e===a?s=(r-n)/o:r===a?s=2+(n-e)/o:n===a&&(s=4+(e-r)/o),s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return a===i?u=0:l<=.5?u=o/(a+i):u=o/(2-a-i),[s,u*100,l*100]};Y.rgb.hsv=function(t){let e,r,n,i,a,o=t[0]/255,s=t[1]/255,u=t[2]/255,l=Math.max(o,s,u),c=l-Math.min(o,s,u),f=function(m){return(l-m)/6/c+1/2};return c===0?(i=0,a=0):(a=c/l,e=f(o),r=f(s),n=f(u),o===l?i=n-r:s===l?i=1/3+e-n:u===l&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[i*360,a*100,l*100]};Y.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],i=Y.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[i,a*100,n*100]};Y.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-r,1-n),a=(1-e-i)/(1-i)||0,o=(1-r-i)/(1-i)||0,s=(1-n-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function Yle(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}Y.rgb.keyword=function(t){let e=lL[t];if(e)return e;let r=1/0,n;for(let i of Object.keys(Ll)){let a=Ll[i],o=Yle(t,a);o<r&&(r=o,n=i)}return n};Y.keyword.rgb=function(t){return Ll[t]};Y.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let i=e*.4124+r*.3576+n*.1805,a=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[i*100,a*100,o*100]};Y.rgb.lab=function(t){let e=Y.rgb.xyz(t),r=e[0],n=e[1],i=e[2];r/=95.047,n/=100,i/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let a=116*n-16,o=500*(r-n),s=200*(n-i);return[a,o,s]};Y.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i,a,o;if(r===0)return o=n*255,[o,o,o];n<.5?i=n*(1+r):i=n+r-n*r;let s=2*n-i,u=[0,0,0];for(let l=0;l<3;l++)a=e+1/3*-(l-1),a<0&&a++,a>1&&a--,6*a<1?o=s+(i-s)*6*a:2*a<1?o=i:3*a<2?o=s+(i-s)*(2/3-a)*6:o=s,u[l]=o*255;return u};Y.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=r,a=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,i*=a<=1?a:2-a;let o=(n+r)/2,s=n===0?2*i/(a+i):2*r/(n+r);return[e,s*100,o*100]};Y.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,i=Math.floor(e)%6,a=e-Math.floor(e),o=255*n*(1-r),s=255*n*(1-r*a),u=255*n*(1-r*(1-a));switch(n*=255,i){case 0:return[n,u,o];case 1:return[s,n,o];case 2:return[o,n,u];case 3:return[o,s,n];case 4:return[u,o,n];case 5:return[n,o,s]}};Y.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=Math.max(n,.01),a,o;o=(2-r)*n;let s=(2-r)*i;return a=r*i,a/=s<=1?s:2-s,a=a||0,o/=2,[e,a*100,o*100]};Y.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i=r+n,a;i>1&&(r/=i,n/=i);let o=Math.floor(6*e),s=1-n;a=6*e-o,o&1&&(a=1-a);let u=r+a*(s-r),l,c,f;switch(o){default:case 6:case 0:l=s,c=u,f=r;break;case 1:l=u,c=s,f=r;break;case 2:l=r,c=s,f=u;break;case 3:l=r,c=u,f=s;break;case 4:l=u,c=r,f=s;break;case 5:l=s,c=r,f=u;break}return[l*255,c*255,f*255]};Y.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i=t[3]/100,a=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,r*(1-i)+i),s=1-Math.min(1,n*(1-i)+i);return[a*255,o*255,s*255]};Y.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i,a,o;return i=e*3.2406+r*-1.5372+n*-.4986,a=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),o=Math.min(Math.max(0,o),1),[i*255,a*255,o*255]};Y.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let i=116*r-16,a=500*(e-r),o=200*(r-n);return[i,a,o]};Y.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],i,a,o;a=(e+16)/116,i=r/500+a,o=a-n/200;let s=a**3,u=i**3,l=o**3;return a=s>.008856?s:(a-16/116)/7.787,i=u>.008856?u:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]};Y.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],i;i=Math.atan2(n,r)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(r*r+n*n);return[e,o,i]};Y.lch.lab=function(t){let e=t[0],r=t[1],i=t[2]/360*2*Math.PI,a=r*Math.cos(i),o=r*Math.sin(i);return[e,a,o]};Y.rgb.ansi16=function(t,e=null){let[r,n,i]=t,a=e===null?Y.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return a===2&&(o+=60),o};Y.hsv.ansi16=function(t){return Y.rgb.ansi16(Y.hsv.rgb(t),t[2])};Y.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};Y.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,i=(e>>1&1)*r*255,a=(e>>2&1)*r*255;return[n,i,a]};Y.ansi256.rgb=function(t){if(t>=232){let a=(t-232)*10+8;return[a,a,a]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,i=e%6/5*255;return[r,n,i]};Y.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};Y.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(s=>s+s).join(""));let n=parseInt(r,16),i=n>>16&255,a=n>>8&255,o=n&255;return[i,a,o]};Y.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),o=i-a,s,u;return o<1?s=a/(1-o):s=0,o<=0?u=0:i===e?u=(r-n)/o%6:i===r?u=2+(n-e)/o:u=4+(e-r)/o,u/=6,u%=1,[u*360,o*100,s*100]};Y.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),i=0;return n<1&&(i=(r-.5*n)/(1-n)),[t[0],n*100,i*100]};Y.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,i=0;return n<1&&(i=(r-n)/(1-n)),[t[0],n*100,i*100]};Y.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let i=[0,0,0],a=e%1*6,o=a%1,s=1-o,u=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return u=(1-r)*n,[(r*i[0]+u)*255,(r*i[1]+u)*255,(r*i[2]+u)*255]};Y.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),i=0;return n>0&&(i=e/n),[t[0],i*100,n*100]};Y.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],i*100,n*100]};Y.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};Y.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],i*100,a*100]};Y.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};Y.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};Y.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};Y.gray.hsl=function(t){return[0,0,t[0]]};Y.gray.hsv=Y.gray.hsl;Y.gray.hwb=function(t){return[0,100,t[0]]};Y.gray.cmyk=function(t){return[0,0,0,t[0]]};Y.gray.lab=function(t){return[t[0],0,0]};Y.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};Y.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var dL=d((pTe,fL)=>{var qp=R_();function Xle(){let t={},e=Object.keys(qp);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function Jle(t){let e=Xle(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),i=Object.keys(qp[n]);for(let a=i.length,o=0;o<a;o++){let s=i[o],u=e[s];u.distance===-1&&(u.distance=e[n].distance+1,u.parent=n,r.unshift(s))}}return e}function Qle(t,e){return function(r){return e(t(r))}}function Zle(t,e){let r=[e[t].parent,t],n=qp[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)r.unshift(e[i].parent),n=Qle(qp[e[i].parent][i],n),i=e[i].parent;return n.conversion=r,n}fL.exports=function(t){let e=Jle(t),r={},n=Object.keys(e);for(let i=n.length,a=0;a<i;a++){let o=n[a];e[o].parent!==null&&(r[o]=Zle(o,e))}return r}});var hL=d((hTe,pL)=>{var A_=R_(),ece=dL(),Zs={},tce=Object.keys(A_);function rce(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function nce(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let i=t(r);if(typeof i=="object")for(let a=i.length,o=0;o<a;o++)i[o]=Math.round(i[o]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}tce.forEach(t=>{Zs[t]={},Object.defineProperty(Zs[t],"channels",{value:A_[t].channels}),Object.defineProperty(Zs[t],"labels",{value:A_[t].labels});let e=ece(t);Object.keys(e).forEach(n=>{let i=e[n];Zs[t][n]=nce(i),Zs[t][n].raw=rce(i)})});pL.exports=Zs});var _L=d((mTe,TL)=>{"use strict";var mL=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,yL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},gL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},Mp=t=>t,vL=(t,e,r)=>[t,e,r],eu=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},S_,tu=(t,e,r,n)=>{S_===void 0&&(S_=hL());let i=n?10:0,a={};for(let[o,s]of Object.entries(S_)){let u=o==="ansi16"?"ansi":o;o===e?a[u]=t(r,i):typeof s=="object"&&(a[u]=t(s[e],i))}return a};function ice(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[i,a]of Object.entries(n))e[i]={open:`\x1B[${a[0]}m`,close:`\x1B[${a[1]}m`},n[i]=e[i],t.set(a[0],a[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",eu(e.color,"ansi",()=>tu(mL,"ansi16",Mp,!1)),eu(e.color,"ansi256",()=>tu(yL,"ansi256",Mp,!1)),eu(e.color,"ansi16m",()=>tu(gL,"rgb",vL,!1)),eu(e.bgColor,"ansi",()=>tu(mL,"ansi16",Mp,!0)),eu(e.bgColor,"ansi256",()=>tu(yL,"ansi256",Mp,!0)),eu(e.bgColor,"ansi16m",()=>tu(gL,"rgb",vL,!0)),e}Object.defineProperty(TL,"exports",{enumerable:!0,get:ice})});var AL=d((yTe,RL)=>{"use strict";RL.exports={stdout:!1,stderr:!1}});var bL=d((gTe,SL)=>{"use strict";var ace=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let i=e.length,a=0,o="";do o+=t.substr(a,n-a)+e+r,a=n+i,n=t.indexOf(e,a);while(n!==-1);return o+=t.substr(a),o},oce=(t,e,r,n)=>{let i=0,a="";do{let o=t[n-1]==="\r";a+=t.substr(i,(o?n-1:n)-i)+e+(o?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return a+=t.substr(i),a};SL.exports={stringReplaceAll:ace,stringEncaseCRLFWithFirstIndex:oce}});var NL=d((vTe,kL)=>{"use strict";var sce=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,CL=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,uce=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,lce=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,cce=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function EL(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):cce.get(t)||t}function fce(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),i;for(let a of n){let o=Number(a);if(!Number.isNaN(o))r.push(o);else if(i=a.match(uce))r.push(i[2].replace(lce,(s,u,l)=>u?EL(u):l));else throw new Error(`Invalid Chalk template style argument: ${a} (in style '${t}')`)}return r}function dce(t){CL.lastIndex=0;let e=[],r;for(;(r=CL.exec(t))!==null;){let n=r[1];if(r[2]){let i=fce(n,r[2]);e.push([n].concat(i))}else e.push([n])}return e}function PL(t,e){let r={};for(let i of e)for(let a of i.styles)r[a[0]]=i.inverse?null:a.slice(1);let n=t;for(let[i,a]of Object.entries(r))if(Array.isArray(a)){if(!(i in n))throw new Error(`Unknown Chalk style: ${i}`);n=a.length>0?n[i](...a):n[i]}return n}kL.exports=(t,e)=>{let r=[],n=[],i=[];if(e.replace(sce,(a,o,s,u,l,c)=>{if(o)i.push(EL(o));else if(u){let f=i.join("");i=[],n.push(r.length===0?f:PL(t,r)(f)),r.push({inverse:s,styles:dce(u)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push(PL(t,r)(i.join(""))),i=[],r.pop()}else i.push(c)}),n.push(i.join("")),r.length>0){let a=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(a)}return n.join("")}});var LL=d((TTe,xL)=>{"use strict";var ql=_L(),{stdout:C_,stderr:P_}=AL(),{stringReplaceAll:pce,stringEncaseCRLFWithFirstIndex:hce}=bL(),{isArray:Fp}=Array,$L=["ansi","ansi","ansi256","ansi16m"],ru=Object.create(null),mce=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=C_?C_.level:0;t.level=e.level===void 0?r:e.level},E_=class{constructor(e){return OL(e)}},OL=t=>{let e={};return mce(e,t),e.template=(...r)=>DL(e.template,...r),Object.setPrototypeOf(e,jp.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=E_,e.template};function jp(t){return OL(t)}for(let[t,e]of Object.entries(ql))ru[t]={get(){let r=Gp(this,k_(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};ru.visible={get(){let t=Gp(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var IL=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of IL)ru[t]={get(){let{level:e}=this;return function(...r){let n=k_(ql.color[$L[e]][t](...r),ql.color.close,this._styler);return Gp(this,n,this._isEmpty)}}};for(let t of IL){let e="bg"+t[0].toUpperCase()+t.slice(1);ru[e]={get(){let{level:r}=this;return function(...n){let i=k_(ql.bgColor[$L[r]][t](...n),ql.bgColor.close,this._styler);return Gp(this,i,this._isEmpty)}}}}var yce=Object.defineProperties(()=>{},{...ru,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),k_=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Gp=(t,e,r)=>{let n=(...i)=>Fp(i[0])&&Fp(i[0].raw)?wL(n,DL(n,...i)):wL(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,yce),n._generator=t,n._styler=e,n._isEmpty=r,n},wL=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=pce(e,r.close,r.open),r=r.parent;let a=e.indexOf(`
`);return a!==-1&&(e=hce(e,i,n,a)),n+e+i},b_,DL=(t,...e)=>{let[r]=e;if(!Fp(r)||!Fp(r.raw))return e.join(" ");let n=e.slice(1),i=[r.raw[0]];for(let a=1;a<r.length;a++)i.push(String(n[a-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[a]));return b_===void 0&&(b_=NL()),b_(t,i.join(""))};Object.defineProperties(jp.prototype,ru);var Up=jp();Up.supportsColor=C_;Up.stderr=jp({level:P_?P_.level:0});Up.stderr.supportsColor=P_;xL.exports=Up});var GL=d(oi=>{"use strict";var ML=oi&&oi.__awaiter||function(t,e,r,n){function i(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(c){try{l(n.next(c))}catch(f){o(f)}}function u(c){try{l(n.throw(c))}catch(f){o(f)}}function l(c){c.done?a(c.value):i(c.value).then(s,u)}l((n=n.apply(t,e||[])).next())})},gce=oi&&oi.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(oi,"__esModule",{value:!0});oi.parseAndGenerate=oi.extractAstNodeFromString=void 0;var FL=Ln(),vce=eo(),Tce=N_(),_ce=oL(),qL=gce(LL());function jL(t,e){var r;return ML(this,void 0,void 0,function*(){let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,FL.URI.parse("memory://fditscenario.document"));return yield e.shared.workspace.DocumentBuilder.build([n],{validationChecks:"all"}),(r=n.parseResult)===null||r===void 0?void 0:r.value})}oi.extractAstNodeFromString=jL;function Rce(t){return ML(this,void 0,void 0,function*(){let e=(0,Tce.createFditscenarioServices)(vce.EmptyFileSystem).Fditscenario,r=yield jL(t,e);console.log("fditscenarioProgram : "+t);let i=e.shared.workspace.LangiumDocumentFactory.fromString(t,FL.URI.parse("memory://fditscenario.document")).parseResult;i.lexerErrors.length===0&&i.parserErrors.length===0?console.log(qL.default.green("Parsed and validated successfully!")):console.log(qL.default.red("Failed to parse and validate !"));let a=(0,_ce.generateCommands)(r);return Promise.resolve(a)})}oi.parseAndGenerate=Rce});var N_=d(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.createFditscenarioServices=no.FditscenarioModule=void 0;var Hp=eo(),UL=Jx(),HL=Qx(),Ace=eo(),Sce=GL();no.FditscenarioModule={validation:{FditscenarioValidator:()=>new HL.FditscenarioValidator}};function bce(t){let e=(0,Hp.inject)((0,Hp.createDefaultSharedModule)(t),UL.FditscenarioGeneratedSharedModule),r=(0,Hp.inject)((0,Hp.createDefaultModule)({shared:e}),UL.AttackScenarioGrammarGeneratedModule,no.FditscenarioModule);return e.lsp.ExecuteCommandHandler=new w_,e.ServiceRegistry.register(r),(0,HL.registerValidationChecks)(r),{shared:e,Fditscenario:r}}no.createFditscenarioServices=bce;var w_=class extends Ace.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,Sce.parseAndGenerate)(r[0]))}}});var wce=d(WL=>{Object.defineProperty(WL,"__esModule",{value:!0});var KL=eo(),$_=Yx(),Cce=N_(),Pce=new $_.BrowserMessageReader(self),Ece=new $_.BrowserMessageWriter(self),kce=(0,$_.createConnection)(Pce,Ece),{shared:Nce}=(0,Cce.createFditscenarioServices)(Object.assign({connection:kce},KL.EmptyFileSystem));(0,KL.startLanguageServer)(Nce)});wce();})();

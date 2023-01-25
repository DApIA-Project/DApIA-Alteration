"use strict";(()=>{var Gl=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+t+'" is not supported')});var d=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var fi=d(zp=>{"use strict";Object.defineProperty(zp,"__esModule",{value:!0});var Bp;function Vp(){if(Bp===void 0)throw new Error("No runtime abstraction layer installed");return Bp}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Bp=r}t.install=e})(Vp||(Vp={}));zp.default=Vp});var Yp=d(su=>{"use strict";Object.defineProperty(su,"__esModule",{value:!0});su.Disposable=void 0;var JL;(function(t){function e(r){return{dispose:r}}t.create=e})(JL=su.Disposable||(su.Disposable={}))});var Pa=d(Ca=>{"use strict";Object.defineProperty(Ca,"__esModule",{value:!0});Ca.Emitter=Ca.Event=void 0;var QL=fi(),ZL;(function(t){let e={dispose(){}};t.None=function(){return e}})(ZL=Ca.Event||(Ca.Event={}));var Xp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,a=this._callbacks.length;i<a;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let a=0,o=n.length;a<o;a++)try{r.push(n[a].apply(i[a],e))}catch(s){(0,QL.default)().console.error(s)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},ho=class{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Xp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=ho._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};Ca.Emitter=ho;ho._noop=function(){}});var x_=d(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.AbstractMessageBuffer=void 0;var eq=13,tq=10,rq=`\r
`,Jp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let u=this._chunks[r];n=0;t:for(;n<u.length;){switch(u[n]){case eq:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case tq:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=u.byteLength,r++}if(e!==4)return;let a=this._read(i+n),o=new Map,s=this.toString(a,"ascii").split(rq);if(s.length<2)return o;for(let u=0;u<s.length-2;u++){let l=s[u],c=l.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,c),m=l.substr(c+1).trim();o.set(f,m)}return o}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let a=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(a)}if(this._chunks[0].byteLength>e){let a=this._chunks[0],o=this.asNative(a,e);return this._chunks[0]=a.slice(e),this._totalLength-=e,o}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let a=this._chunks[i];if(a.byteLength>e){let o=a.slice(0,e);r.set(o,n),n+=e,this._chunks[i]=a.slice(e),this._totalLength-=e,e-=e}else r.set(a,n),n+=a.byteLength,this._chunks.shift(),this._totalLength-=a.byteLength,e-=a.byteLength}return r}};Ul.AbstractMessageBuffer=Jp});var M_=d(th=>{"use strict";Object.defineProperty(th,"__esModule",{value:!0});var L_=fi(),mo=Yp(),nq=Pa(),iq=x_(),yo=class extends iq.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return yo.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};yo.emptyBuffer=new Uint8Array(0);var Qp=class{constructor(e){this.socket=e,this._onData=new nq.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,L_.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),mo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),mo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),mo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Zp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),mo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),mo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),mo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},aq=new TextEncoder,q_=Object.freeze({messageBuffer:Object.freeze({create:t=>new yo(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(aq.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Qp(t),asWritableStream:t=>new Zp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function eh(){return q_}(function(t){function e(){L_.default.install(q_)}t.install=e})(eh||(eh={}));th.default=eh});var go=d(Jt=>{"use strict";Object.defineProperty(Jt,"__esModule",{value:!0});Jt.stringArray=Jt.array=Jt.func=Jt.error=Jt.number=Jt.string=Jt.boolean=void 0;function oq(t){return t===!0||t===!1}Jt.boolean=oq;function F_(t){return typeof t=="string"||t instanceof String}Jt.string=F_;function sq(t){return typeof t=="number"||t instanceof Number}Jt.number=sq;function uq(t){return t instanceof Error}Jt.error=uq;function lq(t){return typeof t=="function"}Jt.func=lq;function j_(t){return Array.isArray(t)}Jt.array=j_;function cq(t){return j_(t)&&t.every(e=>F_(e))}Jt.stringArray=cq});var bh=d(J=>{"use strict";Object.defineProperty(J,"__esModule",{value:!0});J.Message=J.NotificationType9=J.NotificationType8=J.NotificationType7=J.NotificationType6=J.NotificationType5=J.NotificationType4=J.NotificationType3=J.NotificationType2=J.NotificationType1=J.NotificationType0=J.NotificationType=J.RequestType9=J.RequestType8=J.RequestType7=J.RequestType6=J.RequestType5=J.RequestType4=J.RequestType3=J.RequestType2=J.RequestType1=J.RequestType=J.RequestType0=J.AbstractMessageSignature=J.ParameterStructures=J.ResponseError=J.ErrorCodes=void 0;var Ea=go(),G_;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(G_=J.ErrorCodes||(J.ErrorCodes={}));var uu=class extends Error{constructor(e,r,n){super(r),this.code=Ea.number(e)?e:G_.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,uu.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};J.ResponseError=uu;var Ot=class{constructor(e){this.kind=e}static is(e){return e===Ot.auto||e===Ot.byName||e===Ot.byPosition}toString(){return this.kind}};J.ParameterStructures=Ot;Ot.auto=new Ot("auto");Ot.byPosition=new Ot("byPosition");Ot.byName=new Ot("byName");var Be=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Ot.auto}};J.AbstractMessageSignature=Be;var rh=class extends Be{constructor(e){super(e,0)}};J.RequestType0=rh;var nh=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType=nh;var ih=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.RequestType1=ih;var ah=class extends Be{constructor(e){super(e,2)}};J.RequestType2=ah;var oh=class extends Be{constructor(e){super(e,3)}};J.RequestType3=oh;var sh=class extends Be{constructor(e){super(e,4)}};J.RequestType4=sh;var uh=class extends Be{constructor(e){super(e,5)}};J.RequestType5=uh;var lh=class extends Be{constructor(e){super(e,6)}};J.RequestType6=lh;var ch=class extends Be{constructor(e){super(e,7)}};J.RequestType7=ch;var fh=class extends Be{constructor(e){super(e,8)}};J.RequestType8=fh;var dh=class extends Be{constructor(e){super(e,9)}};J.RequestType9=dh;var ph=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType=ph;var hh=class extends Be{constructor(e){super(e,0)}};J.NotificationType0=hh;var mh=class extends Be{constructor(e,r=Ot.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};J.NotificationType1=mh;var yh=class extends Be{constructor(e){super(e,2)}};J.NotificationType2=yh;var gh=class extends Be{constructor(e){super(e,3)}};J.NotificationType3=gh;var vh=class extends Be{constructor(e){super(e,4)}};J.NotificationType4=vh;var Th=class extends Be{constructor(e){super(e,5)}};J.NotificationType5=Th;var _h=class extends Be{constructor(e){super(e,6)}};J.NotificationType6=_h;var Rh=class extends Be{constructor(e){super(e,7)}};J.NotificationType7=Rh;var Ah=class extends Be{constructor(e){super(e,8)}};J.NotificationType8=Ah;var Sh=class extends Be{constructor(e){super(e,9)}};J.NotificationType9=Sh;var fq;(function(t){function e(i){let a=i;return a&&Ea.string(a.method)&&(Ea.string(a.id)||Ea.number(a.id))}t.isRequest=e;function r(i){let a=i;return a&&Ea.string(a.method)&&i.id===void 0}t.isNotification=r;function n(i){let a=i;return a&&(a.result!==void 0||!!a.error)&&(Ea.string(a.id)||Ea.number(a.id)||a.id===null)}t.isResponse=n})(fq=J.Message||(J.Message={}))});var Ph=d(di=>{"use strict";var U_;Object.defineProperty(di,"__esModule",{value:!0});di.LRUCache=di.LinkedMap=di.Touch=void 0;var or;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(or=di.Touch||(di.Touch={}));var Hl=class{constructor(){this[U_]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=or.None){let n=this._map.get(e);if(n)return r!==or.None&&this.touch(n,r),n.value}set(e,r,n=or.None){let i=this._map.get(e);if(i)i.value=r,n!==or.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case or.None:this.addItemLast(i);break;case or.First:this.addItemFirst(i);break;case or.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(U_=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==or.First&&r!==or.Last)){if(r===or.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===or.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};di.LinkedMap=Hl;var Ch=class extends Hl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=or.AsNew){return super.get(e,r)}peek(e){return super.get(e,or.None)}set(e,r){return super.set(e,r,or.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};di.LRUCache=Ch});var wh=d(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.CancellationTokenSource=ka.CancellationToken=void 0;var dq=fi(),pq=go(),Eh=Pa(),kh;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Eh.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Eh.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||pq.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(kh=ka.CancellationToken||(ka.CancellationToken={}));var hq=Object.freeze(function(t,e){let r=(0,dq.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Kl=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?hq:(this._emitter||(this._emitter=new Eh.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Nh=class{get token(){return this._token||(this._token=new Kl),this._token}cancel(){this._token?this._token.cancel():this._token=kh.Cancelled}dispose(){this._token?this._token instanceof Kl&&this._token.dispose():this._token=kh.None}};ka.CancellationTokenSource=Nh});var H_=d(pi=>{"use strict";Object.defineProperty(pi,"__esModule",{value:!0});pi.ReadableStreamMessageReader=pi.AbstractMessageReader=pi.MessageReader=void 0;var Oh=fi(),vo=go(),$h=Pa(),mq;(function(t){function e(r){let n=r;return n&&vo.func(n.listen)&&vo.func(n.dispose)&&vo.func(n.onError)&&vo.func(n.onClose)&&vo.func(n.onPartialMessage)}t.is=e})(mq=pi.MessageReader||(pi.MessageReader={}));var Wl=class{constructor(){this.errorEmitter=new $h.Emitter,this.closeEmitter=new $h.Emitter,this.partialMessageEmitter=new $h.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${vo.string(e.message)?e.message:"unknown"}`)}};pi.AbstractMessageReader=Wl;var Ih;(function(t){function e(r){let n,i,a,o=new Map,s,u=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(a=r.contentDecoder,o.set(a.name,a)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)o.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(s=r.contentTypeDecoder,u.set(s.name,s)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)u.set(l.name,l)}return s===void 0&&(s=(0,Oh.default)().applicationJson.decoder,u.set(s.name,s)),{charset:n,contentDecoder:a,contentDecoders:o,contentTypeDecoder:s,contentTypeDecoders:u}}t.fromOptions=e})(Ih||(Ih={}));var Dh=class extends Wl{constructor(e,r){super(),this.readable=e,this.options=Ih.fromOptions(r),this.buffer=(0,Oh.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let a=i.get("Content-Length");if(!a)throw new Error("Header must provide a Content-Length property.");let o=parseInt(a);if(isNaN(o))throw new Error("Content-Length value must be a number.");this.nextMessageLength=o}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(a=>{this.callback(a)},a=>{this.fireError(a)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Oh.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};pi.ReadableStreamMessageReader=Dh});var K_=d(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.Semaphore=void 0;var yq=fi(),xh=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,yq.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Bl.Semaphore=xh});var z_=d(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.WriteableStreamMessageWriter=hi.AbstractMessageWriter=hi.MessageWriter=void 0;var W_=fi(),lu=go(),gq=K_(),B_=Pa(),vq="Content-Length: ",V_=`\r
`,Tq;(function(t){function e(r){let n=r;return n&&lu.func(n.dispose)&&lu.func(n.onClose)&&lu.func(n.onError)&&lu.func(n.write)}t.is=e})(Tq=hi.MessageWriter||(hi.MessageWriter={}));var Vl=class{constructor(){this.errorEmitter=new B_.Emitter,this.closeEmitter=new B_.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${lu.string(e.message)?e.message:"unknown"}`)}};hi.AbstractMessageWriter=Vl;var Lh;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,W_.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,W_.default)().applicationJson.encoder}}t.fromOptions=e})(Lh||(Lh={}));var qh=class extends Vl{constructor(e,r){super(),this.writable=e,this.options=Lh.fromOptions(r),this.errorCount=0,this.writeSemaphore=new gq.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(vq,n.byteLength.toString(),V_),i.push(V_),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};hi.WriteableStreamMessageWriter=qh});var eR=d(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.createMessageConnection=te.ConnectionOptions=te.CancellationStrategy=te.CancellationSenderStrategy=te.CancellationReceiverStrategy=te.ConnectionStrategy=te.ConnectionError=te.ConnectionErrors=te.LogTraceNotification=te.SetTraceNotification=te.TraceFormat=te.TraceValues=te.Trace=te.NullLogger=te.ProgressType=te.ProgressToken=void 0;var Y_=fi(),Pt=go(),ne=bh(),X_=Ph(),cu=Pa(),Mh=wh(),du;(function(t){t.type=new ne.NotificationType("$/cancelRequest")})(du||(du={}));var J_;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(J_=te.ProgressToken||(te.ProgressToken={}));var fu;(function(t){t.type=new ne.NotificationType("$/progress")})(fu||(fu={}));var Fh=class{constructor(){}};te.ProgressType=Fh;var jh;(function(t){function e(r){return Pt.func(r)}t.is=e})(jh||(jh={}));te.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var we;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(we=te.Trace||(te.Trace={}));var _q;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(_q=te.TraceValues||(te.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(we=te.Trace||(te.Trace={}));var sn;(function(t){t.Text="text",t.JSON="json"})(sn=te.TraceFormat||(te.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(sn=te.TraceFormat||(te.TraceFormat={}));var Q_;(function(t){t.type=new ne.NotificationType("$/setTrace")})(Q_=te.SetTraceNotification||(te.SetTraceNotification={}));var Gh;(function(t){t.type=new ne.NotificationType("$/logTrace")})(Gh=te.LogTraceNotification||(te.LogTraceNotification={}));var zl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(zl=te.ConnectionErrors||(te.ConnectionErrors={}));var ji=class extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,ji.prototype)}};te.ConnectionError=ji;var Z_;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(Z_=te.ConnectionStrategy||(te.ConnectionStrategy={}));var Uh;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Mh.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(Uh=te.CancellationReceiverStrategy||(te.CancellationReceiverStrategy={}));var Hh;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(du.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(Hh=te.CancellationSenderStrategy||(te.CancellationSenderStrategy={}));var Kh;(function(t){t.Message=Object.freeze({receiver:Uh.Message,sender:Hh.Message});function e(r){let n=r;return n&&Uh.is(n.receiver)&&Hh.is(n.sender)}t.is=e})(Kh=te.CancellationStrategy||(te.CancellationStrategy={}));var Rq;(function(t){function e(r){let n=r;return n&&(Kh.is(n.cancellationStrategy)||Z_.is(n.connectionStrategy))}t.is=e})(Rq=te.ConnectionOptions||(te.ConnectionOptions={}));var un;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(un||(un={}));function Aq(t,e,r,n){let i=r!==void 0?r:te.NullLogger,a=0,o=0,s=0,u="2.0",l,c=new Map,f,m=new Map,v=new Map,y,R=new X_.LinkedMap,P=new Map,E=new Set,b=new Map,S=we.Off,O=sn.Text,F,W=un.New,re=new cu.Emitter,Ne=new cu.Emitter,V=new cu.Emitter,Ae=new cu.Emitter,Ye=new cu.Emitter,We=n&&n.cancellationStrategy?n.cancellationStrategy:Kh.Message;function q(C){if(C===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+C.toString()}function L(C){return C===null?"res-unknown-"+(++s).toString():"res-"+C.toString()}function j(){return"not-"+(++o).toString()}function B(C,x){ne.Message.isRequest(x)?C.set(q(x.id),x):ne.Message.isResponse(x)?C.set(L(x.id),x):C.set(j(),x)}function oe(C){}function se(){return W===un.Listening}function ee(){return W===un.Closed}function st(){return W===un.Disposed}function Xe(){(W===un.New||W===un.Listening)&&(W=un.Closed,Ne.fire(void 0))}function Ct(C){re.fire([C,void 0,void 0])}function en(C){re.fire(C)}t.onClose(Xe),t.onError(Ct),e.onClose(Xe),e.onError(en);function Sr(){y||R.size===0||(y=(0,Y_.default)().timer.setImmediate(()=>{y=void 0,oo()}))}function oo(){if(R.size===0)return;let C=R.shift();try{ne.Message.isRequest(C)?so(C):ne.Message.isNotification(C)?lo(C):ne.Message.isResponse(C)?uo(C):au(C)}finally{Sr()}}let ar=C=>{try{if(ne.Message.isNotification(C)&&C.method===du.type.method){let x=C.params.id,G=q(x),z=R.get(G);if(ne.Message.isRequest(z)){let Le=n?.connectionStrategy,Je=Le&&Le.cancelUndispatched?Le.cancelUndispatched(z,oe):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){R.delete(G),b.delete(x),Je.id=z.id,En(Je,C.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let xe=b.get(x);if(xe!==void 0){xe.cancel(),kn(C);return}else E.add(x)}B(R,C)}finally{Sr()}};function so(C){if(st())return;function x(ye,je,_e){let ft={jsonrpc:u,id:C.id};ye instanceof ne.ResponseError?ft.error=ye.toJson():ft.result=ye===void 0?null:ye,En(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function G(ye,je,_e){let ft={jsonrpc:u,id:C.id,error:ye.toJson()};En(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}function z(ye,je,_e){ye===void 0&&(ye=null);let ft={jsonrpc:u,id:C.id,result:ye};En(ft,je,_e),e.write(ft).catch(()=>i.error("Sending response failed."))}Sa(C);let xe=c.get(C.method),Le,Je;xe&&(Le=xe.type,Je=xe.handler);let pt=Date.now();if(Je||l){let ye=C.id??String(Date.now()),je=We.receiver.createCancellationTokenSource(ye);C.id!==null&&E.has(C.id)&&je.cancel(),C.id!==null&&b.set(ye,je);try{let _e;if(Je)if(C.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines ${Le.numberOfParams} params but received none.`),C.method,pt);return}_e=Je(je.token)}else if(Array.isArray(C.params)){if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byName){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by name but received parameters by position`),C.method,pt);return}_e=Je(...C.params,je.token)}else{if(Le!==void 0&&Le.parameterStructures===ne.ParameterStructures.byPosition){G(new ne.ResponseError(ne.ErrorCodes.InvalidParams,`Request ${C.method} defines parameters by position but received parameters by name`),C.method,pt);return}_e=Je(C.params,je.token)}else l&&(_e=l(C.method,C.params,je.token));let ft=_e;_e?ft.then?ft.then(Xt=>{b.delete(ye),x(Xt,C.method,pt)},Xt=>{b.delete(ye),Xt instanceof ne.ResponseError?G(Xt,C.method,pt):Xt&&Pt.string(Xt.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${Xt.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}):(b.delete(ye),x(_e,C.method,pt)):(b.delete(ye),z(_e,C.method,pt))}catch(_e){b.delete(ye),_e instanceof ne.ResponseError?x(_e,C.method,pt):_e&&Pt.string(_e.message)?G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed with message: ${_e.message}`),C.method,pt):G(new ne.ResponseError(ne.ErrorCodes.InternalError,`Request ${C.method} failed unexpectedly without providing any details.`),C.method,pt)}}else G(new ne.ResponseError(ne.ErrorCodes.MethodNotFound,`Unhandled method ${C.method}`),C.method,pt)}function uo(C){if(!st())if(C.id===null)C.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(C.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let x=C.id,G=P.get(x);if(ba(C,G),G!==void 0){P.delete(x);try{if(C.error){let z=C.error;G.reject(new ne.ResponseError(z.code,z.message,z.data))}else if(C.result!==void 0)G.resolve(C.result);else throw new Error("Should never happen.")}catch(z){z.message?i.error(`Response handler '${G.method}' failed with message: ${z.message}`):i.error(`Response handler '${G.method}' failed unexpectedly.`)}}}}function lo(C){if(st())return;let x,G;if(C.method===du.type.method){let z=C.params.id;E.delete(z),kn(C);return}else{let z=m.get(C.method);z&&(G=z.handler,x=z.type)}if(G||f)try{if(kn(C),G)if(C.params===void 0)x!==void 0&&x.numberOfParams!==0&&x.parameterStructures!==ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received none.`),G();else if(Array.isArray(C.params)){let z=C.params;C.method===fu.type.method&&z.length===2&&J_.is(z[0])?G({token:z[0],value:z[1]}):(x!==void 0&&(x.parameterStructures===ne.ParameterStructures.byName&&i.error(`Notification ${C.method} defines parameters by name but received parameters by position`),x.numberOfParams!==C.params.length&&i.error(`Notification ${C.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)),G(...z))}else x!==void 0&&x.parameterStructures===ne.ParameterStructures.byPosition&&i.error(`Notification ${C.method} defines parameters by position but received parameters by name`),G(C.params);else f&&f(C.method,C.params)}catch(z){z.message?i.error(`Notification handler '${C.method}' failed with message: ${z.message}`):i.error(`Notification handler '${C.method}' failed unexpectedly.`)}else V.fire(C)}function au(C){if(!C){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(C,null,4)}`);let x=C;if(Pt.string(x.id)||Pt.number(x.id)){let G=x.id,z=P.get(G);z&&z.reject(new Error("The received response has neither a result nor an error property."))}}function ct(C){if(C!=null)switch(S){case we.Verbose:return JSON.stringify(C,null,4);case we.Compact:return JSON.stringify(C);default:return}}function ui(C){if(!(S===we.Off||!F))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Sending request '${C.method} - (${C.id})'.`,x)}else Dr("send-request",C)}function ou(C){if(!(S===we.Off||!F))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Sending notification '${C.method}'.`,x)}else Dr("send-notification",C)}function En(C,x,G){if(!(S===we.Off||!F))if(O===sn.Text){let z;(S===we.Verbose||S===we.Compact)&&(C.error&&C.error.data?z=`Error data: ${ct(C.error.data)}

`:C.result?z=`Result: ${ct(C.result)}

`:C.error===void 0&&(z=`No result returned.

`)),F.log(`Sending response '${x} - (${C.id})'. Processing request took ${Date.now()-G}ms`,z)}else Dr("send-response",C)}function Sa(C){if(!(S===we.Off||!F))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&C.params&&(x=`Params: ${ct(C.params)}

`),F.log(`Received request '${C.method} - (${C.id})'.`,x)}else Dr("receive-request",C)}function kn(C){if(!(S===we.Off||!F||C.method===Gh.type.method))if(O===sn.Text){let x;(S===we.Verbose||S===we.Compact)&&(C.params?x=`Params: ${ct(C.params)}

`:x=`No parameters provided.

`),F.log(`Received notification '${C.method}'.`,x)}else Dr("receive-notification",C)}function ba(C,x){if(!(S===we.Off||!F))if(O===sn.Text){let G;if((S===we.Verbose||S===we.Compact)&&(C.error&&C.error.data?G=`Error data: ${ct(C.error.data)}

`:C.result?G=`Result: ${ct(C.result)}

`:C.error===void 0&&(G=`No result returned.

`)),x){let z=C.error?` Request failed: ${C.error.message} (${C.error.code}).`:"";F.log(`Received response '${x.method} - (${C.id})' in ${Date.now()-x.timerStart}ms.${z}`,G)}else F.log(`Received response ${C.id} without active response promise.`,G)}else Dr("receive-response",C)}function Dr(C,x){if(!F||S===we.Off)return;let G={isLSPMessage:!0,type:C,message:x,timestamp:Date.now()};F.log(G)}function tn(){if(ee())throw new ji(zl.Closed,"Connection is closed.");if(st())throw new ji(zl.Disposed,"Connection is disposed.")}function co(){if(se())throw new ji(zl.AlreadyListening,"Connection is already listening")}function fo(){if(!se())throw new Error("Call listen() first.")}function br(C){return C===void 0?null:C}function Nn(C){if(C!==null)return C}function $t(C){return C!=null&&!Array.isArray(C)&&typeof C=="object"}function rn(C,x){switch(C){case ne.ParameterStructures.auto:return $t(x)?Nn(x):[br(x)];case ne.ParameterStructures.byName:if(!$t(x))throw new Error("Received parameters by name but param is not an object literal.");return Nn(x);case ne.ParameterStructures.byPosition:return[br(x)];default:throw new Error(`Unknown parameter structure ${C.toString()}`)}}function nn(C,x){let G,z=C.numberOfParams;switch(z){case 0:G=void 0;break;case 1:G=rn(C.parameterStructures,x[0]);break;default:G=[];for(let xe=0;xe<x.length&&xe<z;xe++)G.push(br(x[xe]));if(x.length<z)for(let xe=x.length;xe<z;xe++)G.push(null);break}return G}let wn={sendNotification:(C,...x)=>{tn();let G,z;if(Pt.string(C)){G=C;let Le=x[0],Je=0,pt=ne.ParameterStructures.auto;ne.ParameterStructures.is(Le)&&(Je=1,pt=Le);let ye=x.length,je=ye-Je;switch(je){case 0:z=void 0;break;case 1:z=rn(pt,x[Je]);break;default:if(pt===ne.ParameterStructures.byName)throw new Error(`Received ${je} parameters for 'by Name' notification parameter structure.`);z=x.slice(Je,ye).map(_e=>br(_e));break}}else{let Le=x;G=C.method,z=nn(C,Le)}let xe={jsonrpc:u,method:G,params:z};return ou(xe),e.write(xe).catch(()=>i.error("Sending notification failed."))},onNotification:(C,x)=>{tn();let G;return Pt.func(C)?f=C:x&&(Pt.string(C)?(G=C,m.set(C,{type:void 0,handler:x})):(G=C.method,m.set(C.method,{type:C,handler:x}))),{dispose:()=>{G!==void 0?m.delete(G):f=void 0}}},onProgress:(C,x,G)=>{if(v.has(x))throw new Error(`Progress handler for token ${x} already registered`);return v.set(x,G),{dispose:()=>{v.delete(x)}}},sendProgress:(C,x,G)=>wn.sendNotification(fu.type,{token:x,value:G}),onUnhandledProgress:Ae.event,sendRequest:(C,...x)=>{tn(),fo();let G,z,xe;if(Pt.string(C)){G=C;let ye=x[0],je=x[x.length-1],_e=0,ft=ne.ParameterStructures.auto;ne.ParameterStructures.is(ye)&&(_e=1,ft=ye);let Xt=x.length;Mh.CancellationToken.is(je)&&(Xt=Xt-1,xe=je);let li=Xt-_e;switch(li){case 0:z=void 0;break;case 1:z=rn(ft,x[_e]);break;default:if(ft===ne.ParameterStructures.byName)throw new Error(`Received ${li} parameters for 'by Name' request parameter structure.`);z=x.slice(_e,Xt).map($n=>br($n));break}}else{let ye=x;G=C.method,z=nn(C,ye);let je=C.numberOfParams;xe=Mh.CancellationToken.is(ye[je])?ye[je]:void 0}let Le=a++,Je;return xe&&(Je=xe.onCancellationRequested(()=>{let ye=We.sender.sendCancellation(wn,Le);return ye===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):ye.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((ye,je)=>{let _e={jsonrpc:u,id:Le,method:G,params:z},ft=$n=>{ye($n),We.sender.cleanup(Le),Je?.dispose()},Xt=$n=>{je($n),We.sender.cleanup(Le),Je?.dispose()},li={method:G,timerStart:Date.now(),resolve:ft,reject:Xt};ui(_e);try{e.write(_e).catch(()=>i.error("Sending request failed."))}catch($n){li.reject(new ne.ResponseError(ne.ErrorCodes.MessageWriteError,$n.message?$n.message:"Unknown reason")),li=null}li&&P.set(Le,li)})},onRequest:(C,x)=>{tn();let G=null;return jh.is(C)?(G=void 0,l=C):Pt.string(C)?(G=null,x!==void 0&&(G=C,c.set(C,{handler:x,type:void 0}))):x!==void 0&&(G=C.method,c.set(C.method,{type:C,handler:x})),{dispose:()=>{G!==null&&(G!==void 0?c.delete(G):l=void 0)}}},hasPendingResponse:()=>P.size>0,trace:async(C,x,G)=>{let z=!1,xe=sn.Text;G!==void 0&&(Pt.boolean(G)?z=G:(z=G.sendNotification||!1,xe=G.traceFormat||sn.Text)),S=C,O=xe,S===we.Off?F=void 0:F=x,z&&!ee()&&!st()&&await wn.sendNotification(Q_.type,{value:we.toString(C)})},onError:re.event,onClose:Ne.event,onUnhandledNotification:V.event,onDispose:Ye.event,end:()=>{e.end()},dispose:()=>{if(st())return;W=un.Disposed,Ye.fire(void 0);let C=new ne.ResponseError(ne.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let x of P.values())x.reject(C);P=new Map,b=new Map,E=new Set,R=new X_.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{tn(),co(),W=un.Listening,t.listen(ar)},inspect:()=>{(0,Y_.default)().console.log("inspect")}};return wn.onNotification(Gh.type,C=>{if(S===we.Off||!F)return;let x=S===we.Verbose||S===we.Compact;F.log(C.message,x?C.verbose:void 0)}),wn.onNotification(fu.type,C=>{let x=v.get(C.token);x?x(C.value):Ae.fire(C)}),wn}te.createMessageConnection=Aq});var zh=d(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.TraceFormat=I.TraceValues=I.Trace=I.ProgressType=I.ProgressToken=I.createMessageConnection=I.NullLogger=I.ConnectionOptions=I.ConnectionStrategy=I.WriteableStreamMessageWriter=I.AbstractMessageWriter=I.MessageWriter=I.ReadableStreamMessageReader=I.AbstractMessageReader=I.MessageReader=I.CancellationToken=I.CancellationTokenSource=I.Emitter=I.Event=I.Disposable=I.LRUCache=I.Touch=I.LinkedMap=I.ParameterStructures=I.NotificationType9=I.NotificationType8=I.NotificationType7=I.NotificationType6=I.NotificationType5=I.NotificationType4=I.NotificationType3=I.NotificationType2=I.NotificationType1=I.NotificationType0=I.NotificationType=I.ErrorCodes=I.ResponseError=I.RequestType9=I.RequestType8=I.RequestType7=I.RequestType6=I.RequestType5=I.RequestType4=I.RequestType3=I.RequestType2=I.RequestType1=I.RequestType0=I.RequestType=I.Message=I.RAL=void 0;I.CancellationStrategy=I.CancellationSenderStrategy=I.CancellationReceiverStrategy=I.ConnectionError=I.ConnectionErrors=I.LogTraceNotification=I.SetTraceNotification=void 0;var Ue=bh();Object.defineProperty(I,"Message",{enumerable:!0,get:function(){return Ue.Message}});Object.defineProperty(I,"RequestType",{enumerable:!0,get:function(){return Ue.RequestType}});Object.defineProperty(I,"RequestType0",{enumerable:!0,get:function(){return Ue.RequestType0}});Object.defineProperty(I,"RequestType1",{enumerable:!0,get:function(){return Ue.RequestType1}});Object.defineProperty(I,"RequestType2",{enumerable:!0,get:function(){return Ue.RequestType2}});Object.defineProperty(I,"RequestType3",{enumerable:!0,get:function(){return Ue.RequestType3}});Object.defineProperty(I,"RequestType4",{enumerable:!0,get:function(){return Ue.RequestType4}});Object.defineProperty(I,"RequestType5",{enumerable:!0,get:function(){return Ue.RequestType5}});Object.defineProperty(I,"RequestType6",{enumerable:!0,get:function(){return Ue.RequestType6}});Object.defineProperty(I,"RequestType7",{enumerable:!0,get:function(){return Ue.RequestType7}});Object.defineProperty(I,"RequestType8",{enumerable:!0,get:function(){return Ue.RequestType8}});Object.defineProperty(I,"RequestType9",{enumerable:!0,get:function(){return Ue.RequestType9}});Object.defineProperty(I,"ResponseError",{enumerable:!0,get:function(){return Ue.ResponseError}});Object.defineProperty(I,"ErrorCodes",{enumerable:!0,get:function(){return Ue.ErrorCodes}});Object.defineProperty(I,"NotificationType",{enumerable:!0,get:function(){return Ue.NotificationType}});Object.defineProperty(I,"NotificationType0",{enumerable:!0,get:function(){return Ue.NotificationType0}});Object.defineProperty(I,"NotificationType1",{enumerable:!0,get:function(){return Ue.NotificationType1}});Object.defineProperty(I,"NotificationType2",{enumerable:!0,get:function(){return Ue.NotificationType2}});Object.defineProperty(I,"NotificationType3",{enumerable:!0,get:function(){return Ue.NotificationType3}});Object.defineProperty(I,"NotificationType4",{enumerable:!0,get:function(){return Ue.NotificationType4}});Object.defineProperty(I,"NotificationType5",{enumerable:!0,get:function(){return Ue.NotificationType5}});Object.defineProperty(I,"NotificationType6",{enumerable:!0,get:function(){return Ue.NotificationType6}});Object.defineProperty(I,"NotificationType7",{enumerable:!0,get:function(){return Ue.NotificationType7}});Object.defineProperty(I,"NotificationType8",{enumerable:!0,get:function(){return Ue.NotificationType8}});Object.defineProperty(I,"NotificationType9",{enumerable:!0,get:function(){return Ue.NotificationType9}});Object.defineProperty(I,"ParameterStructures",{enumerable:!0,get:function(){return Ue.ParameterStructures}});var Wh=Ph();Object.defineProperty(I,"LinkedMap",{enumerable:!0,get:function(){return Wh.LinkedMap}});Object.defineProperty(I,"LRUCache",{enumerable:!0,get:function(){return Wh.LRUCache}});Object.defineProperty(I,"Touch",{enumerable:!0,get:function(){return Wh.Touch}});var Sq=Yp();Object.defineProperty(I,"Disposable",{enumerable:!0,get:function(){return Sq.Disposable}});var tR=Pa();Object.defineProperty(I,"Event",{enumerable:!0,get:function(){return tR.Event}});Object.defineProperty(I,"Emitter",{enumerable:!0,get:function(){return tR.Emitter}});var rR=wh();Object.defineProperty(I,"CancellationTokenSource",{enumerable:!0,get:function(){return rR.CancellationTokenSource}});Object.defineProperty(I,"CancellationToken",{enumerable:!0,get:function(){return rR.CancellationToken}});var Bh=H_();Object.defineProperty(I,"MessageReader",{enumerable:!0,get:function(){return Bh.MessageReader}});Object.defineProperty(I,"AbstractMessageReader",{enumerable:!0,get:function(){return Bh.AbstractMessageReader}});Object.defineProperty(I,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Bh.ReadableStreamMessageReader}});var Vh=z_();Object.defineProperty(I,"MessageWriter",{enumerable:!0,get:function(){return Vh.MessageWriter}});Object.defineProperty(I,"AbstractMessageWriter",{enumerable:!0,get:function(){return Vh.AbstractMessageWriter}});Object.defineProperty(I,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return Vh.WriteableStreamMessageWriter}});var Qt=eR();Object.defineProperty(I,"ConnectionStrategy",{enumerable:!0,get:function(){return Qt.ConnectionStrategy}});Object.defineProperty(I,"ConnectionOptions",{enumerable:!0,get:function(){return Qt.ConnectionOptions}});Object.defineProperty(I,"NullLogger",{enumerable:!0,get:function(){return Qt.NullLogger}});Object.defineProperty(I,"createMessageConnection",{enumerable:!0,get:function(){return Qt.createMessageConnection}});Object.defineProperty(I,"ProgressToken",{enumerable:!0,get:function(){return Qt.ProgressToken}});Object.defineProperty(I,"ProgressType",{enumerable:!0,get:function(){return Qt.ProgressType}});Object.defineProperty(I,"Trace",{enumerable:!0,get:function(){return Qt.Trace}});Object.defineProperty(I,"TraceValues",{enumerable:!0,get:function(){return Qt.TraceValues}});Object.defineProperty(I,"TraceFormat",{enumerable:!0,get:function(){return Qt.TraceFormat}});Object.defineProperty(I,"SetTraceNotification",{enumerable:!0,get:function(){return Qt.SetTraceNotification}});Object.defineProperty(I,"LogTraceNotification",{enumerable:!0,get:function(){return Qt.LogTraceNotification}});Object.defineProperty(I,"ConnectionErrors",{enumerable:!0,get:function(){return Qt.ConnectionErrors}});Object.defineProperty(I,"ConnectionError",{enumerable:!0,get:function(){return Qt.ConnectionError}});Object.defineProperty(I,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return Qt.CancellationReceiverStrategy}});Object.defineProperty(I,"CancellationSenderStrategy",{enumerable:!0,get:function(){return Qt.CancellationSenderStrategy}});Object.defineProperty(I,"CancellationStrategy",{enumerable:!0,get:function(){return Qt.CancellationStrategy}});var bq=fi();I.RAL=bq.default});var mi=d(Cr=>{"use strict";var Cq=Cr&&Cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Pq=Cr&&Cr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Cq(e,t,r)};Object.defineProperty(Cr,"__esModule",{value:!0});Cr.createMessageConnection=Cr.BrowserMessageWriter=Cr.BrowserMessageReader=void 0;var Eq=M_();Eq.default.install();var To=zh();Pq(zh(),Cr);var Yh=class extends To.AbstractMessageReader{constructor(e){super(),this._onData=new To.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Cr.BrowserMessageReader=Yh;var Xh=class extends To.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Cr.BrowserMessageWriter=Xh;function kq(t,e,r,n){return r===void 0&&(r=To.NullLogger),To.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,To.createMessageConnection)(t,e,r,n)}Cr.createMessageConnection=kq});var Jh=d((rfe,nR)=>{"use strict";nR.exports=mi()});var _o=d((iR,Yl)=>{(function(t){if(typeof Yl=="object"&&typeof Yl.exports=="object"){var e=t(Gl,iR);e!==void 0&&(Yl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(g){function k(N){return typeof N=="string"}g.is=k})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(g){function k(N){return typeof N=="string"}g.is=k})(n=e.URI||(e.URI={}));var i;(function(g){g.MIN_VALUE=-2147483648,g.MAX_VALUE=2147483647;function k(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=k})(i=e.integer||(e.integer={}));var a;(function(g){g.MIN_VALUE=0,g.MAX_VALUE=2147483647;function k(N){return typeof N=="number"&&g.MIN_VALUE<=N&&N<=g.MAX_VALUE}g.is=k})(a=e.uinteger||(e.uinteger={}));var o;(function(g){function k(_,h){return _===Number.MAX_VALUE&&(_=a.MAX_VALUE),h===Number.MAX_VALUE&&(h=a.MAX_VALUE),{line:_,character:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.uinteger(h.line)&&w.uinteger(h.character)}g.is=N})(o=e.Position||(e.Position={}));var s;(function(g){function k(_,h,$,D){if(w.uinteger(_)&&w.uinteger(h)&&w.uinteger($)&&w.uinteger(D))return{start:o.create(_,h),end:o.create($,D)};if(o.is(_)&&o.is(h))return{start:_,end:h};throw new Error("Range#create called with invalid arguments[".concat(_,", ").concat(h,", ").concat($,", ").concat(D,"]"))}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&o.is(h.start)&&o.is(h.end)}g.is=N})(s=e.Range||(e.Range={}));var u;(function(g){function k(_,h){return{uri:_,range:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&(w.string(h.uri)||w.undefined(h.uri))}g.is=N})(u=e.Location||(e.Location={}));var l;(function(g){function k(_,h,$,D){return{targetUri:_,targetRange:h,targetSelectionRange:$,originSelectionRange:D}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.targetRange)&&w.string(h.targetUri)&&s.is(h.targetSelectionRange)&&(s.is(h.originSelectionRange)||w.undefined(h.originSelectionRange))}g.is=N})(l=e.LocationLink||(e.LocationLink={}));var c;(function(g){function k(_,h,$,D){return{red:_,green:h,blue:$,alpha:D}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.numberRange(h.red,0,1)&&w.numberRange(h.green,0,1)&&w.numberRange(h.blue,0,1)&&w.numberRange(h.alpha,0,1)}g.is=N})(c=e.Color||(e.Color={}));var f;(function(g){function k(_,h){return{range:_,color:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&c.is(h.color)}g.is=N})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(g){function k(_,h,$){return{label:_,textEdit:h,additionalTextEdits:$}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.string(h.label)&&(w.undefined(h.textEdit)||F.is(h))&&(w.undefined(h.additionalTextEdits)||w.typedArray(h.additionalTextEdits,F.is))}g.is=N})(m=e.ColorPresentation||(e.ColorPresentation={}));var v;(function(g){g.Comment="comment",g.Imports="imports",g.Region="region"})(v=e.FoldingRangeKind||(e.FoldingRangeKind={}));var y;(function(g){function k(_,h,$,D,ae,ut){var Ge={startLine:_,endLine:h};return w.defined($)&&(Ge.startCharacter=$),w.defined(D)&&(Ge.endCharacter=D),w.defined(ae)&&(Ge.kind=ae),w.defined(ut)&&(Ge.collapsedText=ut),Ge}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.uinteger(h.startLine)&&w.uinteger(h.startLine)&&(w.undefined(h.startCharacter)||w.uinteger(h.startCharacter))&&(w.undefined(h.endCharacter)||w.uinteger(h.endCharacter))&&(w.undefined(h.kind)||w.string(h.kind))}g.is=N})(y=e.FoldingRange||(e.FoldingRange={}));var R;(function(g){function k(_,h){return{location:_,message:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&u.is(h.location)&&w.string(h.message)}g.is=N})(R=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var P;(function(g){g.Error=1,g.Warning=2,g.Information=3,g.Hint=4})(P=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var E;(function(g){g.Unnecessary=1,g.Deprecated=2})(E=e.DiagnosticTag||(e.DiagnosticTag={}));var b;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&w.string(_.href)}g.is=k})(b=e.CodeDescription||(e.CodeDescription={}));var S;(function(g){function k(_,h,$,D,ae,ut){var Ge={range:_,message:h};return w.defined($)&&(Ge.severity=$),w.defined(D)&&(Ge.code=D),w.defined(ae)&&(Ge.source=ae),w.defined(ut)&&(Ge.relatedInformation=ut),Ge}g.create=k;function N(_){var h,$=_;return w.defined($)&&s.is($.range)&&w.string($.message)&&(w.number($.severity)||w.undefined($.severity))&&(w.integer($.code)||w.string($.code)||w.undefined($.code))&&(w.undefined($.codeDescription)||w.string((h=$.codeDescription)===null||h===void 0?void 0:h.href))&&(w.string($.source)||w.undefined($.source))&&(w.undefined($.relatedInformation)||w.typedArray($.relatedInformation,R.is))}g.is=N})(S=e.Diagnostic||(e.Diagnostic={}));var O;(function(g){function k(_,h){for(var $=[],D=2;D<arguments.length;D++)$[D-2]=arguments[D];var ae={title:_,command:h};return w.defined($)&&$.length>0&&(ae.arguments=$),ae}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.title)&&w.string(h.command)}g.is=N})(O=e.Command||(e.Command={}));var F;(function(g){function k($,D){return{range:$,newText:D}}g.replace=k;function N($,D){return{range:{start:$,end:$},newText:D}}g.insert=N;function _($){return{range:$,newText:""}}g.del=_;function h($){var D=$;return w.objectLiteral(D)&&w.string(D.newText)&&s.is(D.range)}g.is=h})(F=e.TextEdit||(e.TextEdit={}));var W;(function(g){function k(_,h,$){var D={label:_};return h!==void 0&&(D.needsConfirmation=h),$!==void 0&&(D.description=$),D}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&w.string(h.label)&&(w.boolean(h.needsConfirmation)||h.needsConfirmation===void 0)&&(w.string(h.description)||h.description===void 0)}g.is=N})(W=e.ChangeAnnotation||(e.ChangeAnnotation={}));var re;(function(g){function k(N){var _=N;return w.string(_)}g.is=k})(re=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ne;(function(g){function k($,D,ae){return{range:$,newText:D,annotationId:ae}}g.replace=k;function N($,D,ae){return{range:{start:$,end:$},newText:D,annotationId:ae}}g.insert=N;function _($,D){return{range:$,newText:"",annotationId:D}}g.del=_;function h($){var D=$;return F.is(D)&&(W.is(D.annotationId)||re.is(D.annotationId))}g.is=h})(Ne=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var V;(function(g){function k(_,h){return{textDocument:_,edits:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&ee.is(h.textDocument)&&Array.isArray(h.edits)}g.is=N})(V=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Ae;(function(g){function k(_,h,$){var D={kind:"create",uri:_};return h!==void 0&&(h.overwrite!==void 0||h.ignoreIfExists!==void 0)&&(D.options=h),$!==void 0&&(D.annotationId=$),D}g.create=k;function N(_){var h=_;return h&&h.kind==="create"&&w.string(h.uri)&&(h.options===void 0||(h.options.overwrite===void 0||w.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||w.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(Ae=e.CreateFile||(e.CreateFile={}));var Ye;(function(g){function k(_,h,$,D){var ae={kind:"rename",oldUri:_,newUri:h};return $!==void 0&&($.overwrite!==void 0||$.ignoreIfExists!==void 0)&&(ae.options=$),D!==void 0&&(ae.annotationId=D),ae}g.create=k;function N(_){var h=_;return h&&h.kind==="rename"&&w.string(h.oldUri)&&w.string(h.newUri)&&(h.options===void 0||(h.options.overwrite===void 0||w.boolean(h.options.overwrite))&&(h.options.ignoreIfExists===void 0||w.boolean(h.options.ignoreIfExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(Ye=e.RenameFile||(e.RenameFile={}));var We;(function(g){function k(_,h,$){var D={kind:"delete",uri:_};return h!==void 0&&(h.recursive!==void 0||h.ignoreIfNotExists!==void 0)&&(D.options=h),$!==void 0&&(D.annotationId=$),D}g.create=k;function N(_){var h=_;return h&&h.kind==="delete"&&w.string(h.uri)&&(h.options===void 0||(h.options.recursive===void 0||w.boolean(h.options.recursive))&&(h.options.ignoreIfNotExists===void 0||w.boolean(h.options.ignoreIfNotExists)))&&(h.annotationId===void 0||re.is(h.annotationId))}g.is=N})(We=e.DeleteFile||(e.DeleteFile={}));var q;(function(g){function k(N){var _=N;return _&&(_.changes!==void 0||_.documentChanges!==void 0)&&(_.documentChanges===void 0||_.documentChanges.every(function(h){return w.string(h.kind)?Ae.is(h)||Ye.is(h)||We.is(h):V.is(h)}))}g.is=k})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var L=function(){function g(k,N){this.edits=k,this.changeAnnotations=N}return g.prototype.insert=function(k,N,_){var h,$;if(_===void 0?h=F.insert(k,N):re.is(_)?($=_,h=Ne.insert(k,N,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),h=Ne.insert(k,N,$)),this.edits.push(h),$!==void 0)return $},g.prototype.replace=function(k,N,_){var h,$;if(_===void 0?h=F.replace(k,N):re.is(_)?($=_,h=Ne.replace(k,N,_)):(this.assertChangeAnnotations(this.changeAnnotations),$=this.changeAnnotations.manage(_),h=Ne.replace(k,N,$)),this.edits.push(h),$!==void 0)return $},g.prototype.delete=function(k,N){var _,h;if(N===void 0?_=F.del(k):re.is(N)?(h=N,_=Ne.del(k,N)):(this.assertChangeAnnotations(this.changeAnnotations),h=this.changeAnnotations.manage(N),_=Ne.del(k,h)),this.edits.push(_),h!==void 0)return h},g.prototype.add=function(k){this.edits.push(k)},g.prototype.all=function(){return this.edits},g.prototype.clear=function(){this.edits.splice(0,this.edits.length)},g.prototype.assertChangeAnnotations=function(k){if(k===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},g}(),j=function(){function g(k){this._annotations=k===void 0?Object.create(null):k,this._counter=0,this._size=0}return g.prototype.all=function(){return this._annotations},Object.defineProperty(g.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),g.prototype.manage=function(k,N){var _;if(re.is(k)?_=k:(_=this.nextId(),N=k),this._annotations[_]!==void 0)throw new Error("Id ".concat(_," is already in use."));if(N===void 0)throw new Error("No annotation provided for id ".concat(_));return this._annotations[_]=N,this._size++,_},g.prototype.nextId=function(){return this._counter++,this._counter.toString()},g}(),B=function(){function g(k){var N=this;this._textEditChanges=Object.create(null),k!==void 0?(this._workspaceEdit=k,k.documentChanges?(this._changeAnnotations=new j(k.changeAnnotations),k.changeAnnotations=this._changeAnnotations.all(),k.documentChanges.forEach(function(_){if(V.is(_)){var h=new L(_.edits,N._changeAnnotations);N._textEditChanges[_.textDocument.uri]=h}})):k.changes&&Object.keys(k.changes).forEach(function(_){var h=new L(k.changes[_]);N._textEditChanges[_]=h})):this._workspaceEdit={}}return Object.defineProperty(g.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),g.prototype.getTextEditChange=function(k){if(ee.is(k)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var N={uri:k.uri,version:k.version},_=this._textEditChanges[N.uri];if(!_){var h=[],$={textDocument:N,edits:h};this._workspaceEdit.documentChanges.push($),_=new L(h,this._changeAnnotations),this._textEditChanges[N.uri]=_}return _}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var _=this._textEditChanges[k];if(!_){var h=[];this._workspaceEdit.changes[k]=h,_=new L(h),this._textEditChanges[k]=_}return _}},g.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new j,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},g.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},g.prototype.createFile=function(k,N,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||re.is(N)?h=N:_=N;var $,D;if(h===void 0?$=Ae.create(k,_):(D=re.is(h)?h:this._changeAnnotations.manage(h),$=Ae.create(k,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g.prototype.renameFile=function(k,N,_,h){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var $;W.is(_)||re.is(_)?$=_:h=_;var D,ae;if($===void 0?D=Ye.create(k,N,h):(ae=re.is($)?$:this._changeAnnotations.manage($),D=Ye.create(k,N,h,ae)),this._workspaceEdit.documentChanges.push(D),ae!==void 0)return ae},g.prototype.deleteFile=function(k,N,_){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var h;W.is(N)||re.is(N)?h=N:_=N;var $,D;if(h===void 0?$=We.create(k,_):(D=re.is(h)?h:this._changeAnnotations.manage(h),$=We.create(k,_,D)),this._workspaceEdit.documentChanges.push($),D!==void 0)return D},g}();e.WorkspaceChange=B;var oe;(function(g){function k(_){return{uri:_}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)}g.is=N})(oe=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var se;(function(g){function k(_,h){return{uri:_,version:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&w.integer(h.version)}g.is=N})(se=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ee;(function(g){function k(_,h){return{uri:_,version:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&(h.version===null||w.integer(h.version))}g.is=N})(ee=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var st;(function(g){function k(_,h,$,D){return{uri:_,languageId:h,version:$,text:D}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.string(h.uri)&&w.string(h.languageId)&&w.integer(h.version)&&w.string(h.text)}g.is=N})(st=e.TextDocumentItem||(e.TextDocumentItem={}));var Xe;(function(g){g.PlainText="plaintext",g.Markdown="markdown";function k(N){var _=N;return _===g.PlainText||_===g.Markdown}g.is=k})(Xe=e.MarkupKind||(e.MarkupKind={}));var Ct;(function(g){function k(N){var _=N;return w.objectLiteral(N)&&Xe.is(_.kind)&&w.string(_.value)}g.is=k})(Ct=e.MarkupContent||(e.MarkupContent={}));var en;(function(g){g.Text=1,g.Method=2,g.Function=3,g.Constructor=4,g.Field=5,g.Variable=6,g.Class=7,g.Interface=8,g.Module=9,g.Property=10,g.Unit=11,g.Value=12,g.Enum=13,g.Keyword=14,g.Snippet=15,g.Color=16,g.File=17,g.Reference=18,g.Folder=19,g.EnumMember=20,g.Constant=21,g.Struct=22,g.Event=23,g.Operator=24,g.TypeParameter=25})(en=e.CompletionItemKind||(e.CompletionItemKind={}));var Sr;(function(g){g.PlainText=1,g.Snippet=2})(Sr=e.InsertTextFormat||(e.InsertTextFormat={}));var oo;(function(g){g.Deprecated=1})(oo=e.CompletionItemTag||(e.CompletionItemTag={}));var ar;(function(g){function k(_,h,$){return{newText:_,insert:h,replace:$}}g.create=k;function N(_){var h=_;return h&&w.string(h.newText)&&s.is(h.insert)&&s.is(h.replace)}g.is=N})(ar=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var so;(function(g){g.asIs=1,g.adjustIndentation=2})(so=e.InsertTextMode||(e.InsertTextMode={}));var uo;(function(g){function k(N){var _=N;return _&&(w.string(_.detail)||_.detail===void 0)&&(w.string(_.description)||_.description===void 0)}g.is=k})(uo=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var lo;(function(g){function k(N){return{label:N}}g.create=k})(lo=e.CompletionItem||(e.CompletionItem={}));var au;(function(g){function k(N,_){return{items:N||[],isIncomplete:!!_}}g.create=k})(au=e.CompletionList||(e.CompletionList={}));var ct;(function(g){function k(_){return _.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}g.fromPlainText=k;function N(_){var h=_;return w.string(h)||w.objectLiteral(h)&&w.string(h.language)&&w.string(h.value)}g.is=N})(ct=e.MarkedString||(e.MarkedString={}));var ui;(function(g){function k(N){var _=N;return!!_&&w.objectLiteral(_)&&(Ct.is(_.contents)||ct.is(_.contents)||w.typedArray(_.contents,ct.is))&&(N.range===void 0||s.is(N.range))}g.is=k})(ui=e.Hover||(e.Hover={}));var ou;(function(g){function k(N,_){return _?{label:N,documentation:_}:{label:N}}g.create=k})(ou=e.ParameterInformation||(e.ParameterInformation={}));var En;(function(g){function k(N,_){for(var h=[],$=2;$<arguments.length;$++)h[$-2]=arguments[$];var D={label:N};return w.defined(_)&&(D.documentation=_),w.defined(h)?D.parameters=h:D.parameters=[],D}g.create=k})(En=e.SignatureInformation||(e.SignatureInformation={}));var Sa;(function(g){g.Text=1,g.Read=2,g.Write=3})(Sa=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var kn;(function(g){function k(N,_){var h={range:N};return w.number(_)&&(h.kind=_),h}g.create=k})(kn=e.DocumentHighlight||(e.DocumentHighlight={}));var ba;(function(g){g.File=1,g.Module=2,g.Namespace=3,g.Package=4,g.Class=5,g.Method=6,g.Property=7,g.Field=8,g.Constructor=9,g.Enum=10,g.Interface=11,g.Function=12,g.Variable=13,g.Constant=14,g.String=15,g.Number=16,g.Boolean=17,g.Array=18,g.Object=19,g.Key=20,g.Null=21,g.EnumMember=22,g.Struct=23,g.Event=24,g.Operator=25,g.TypeParameter=26})(ba=e.SymbolKind||(e.SymbolKind={}));var Dr;(function(g){g.Deprecated=1})(Dr=e.SymbolTag||(e.SymbolTag={}));var tn;(function(g){function k(N,_,h,$,D){var ae={name:N,kind:_,location:{uri:$,range:h}};return D&&(ae.containerName=D),ae}g.create=k})(tn=e.SymbolInformation||(e.SymbolInformation={}));var co;(function(g){function k(N,_,h,$){return $!==void 0?{name:N,kind:_,location:{uri:h,range:$}}:{name:N,kind:_,location:{uri:h}}}g.create=k})(co=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var fo;(function(g){function k(_,h,$,D,ae,ut){var Ge={name:_,detail:h,kind:$,range:D,selectionRange:ae};return ut!==void 0&&(Ge.children=ut),Ge}g.create=k;function N(_){var h=_;return h&&w.string(h.name)&&w.number(h.kind)&&s.is(h.range)&&s.is(h.selectionRange)&&(h.detail===void 0||w.string(h.detail))&&(h.deprecated===void 0||w.boolean(h.deprecated))&&(h.children===void 0||Array.isArray(h.children))&&(h.tags===void 0||Array.isArray(h.tags))}g.is=N})(fo=e.DocumentSymbol||(e.DocumentSymbol={}));var br;(function(g){g.Empty="",g.QuickFix="quickfix",g.Refactor="refactor",g.RefactorExtract="refactor.extract",g.RefactorInline="refactor.inline",g.RefactorRewrite="refactor.rewrite",g.Source="source",g.SourceOrganizeImports="source.organizeImports",g.SourceFixAll="source.fixAll"})(br=e.CodeActionKind||(e.CodeActionKind={}));var Nn;(function(g){g.Invoked=1,g.Automatic=2})(Nn=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var $t;(function(g){function k(_,h,$){var D={diagnostics:_};return h!=null&&(D.only=h),$!=null&&(D.triggerKind=$),D}g.create=k;function N(_){var h=_;return w.defined(h)&&w.typedArray(h.diagnostics,S.is)&&(h.only===void 0||w.typedArray(h.only,w.string))&&(h.triggerKind===void 0||h.triggerKind===Nn.Invoked||h.triggerKind===Nn.Automatic)}g.is=N})($t=e.CodeActionContext||(e.CodeActionContext={}));var rn;(function(g){function k(_,h,$){var D={title:_},ae=!0;return typeof h=="string"?(ae=!1,D.kind=h):O.is(h)?D.command=h:D.edit=h,ae&&$!==void 0&&(D.kind=$),D}g.create=k;function N(_){var h=_;return h&&w.string(h.title)&&(h.diagnostics===void 0||w.typedArray(h.diagnostics,S.is))&&(h.kind===void 0||w.string(h.kind))&&(h.edit!==void 0||h.command!==void 0)&&(h.command===void 0||O.is(h.command))&&(h.isPreferred===void 0||w.boolean(h.isPreferred))&&(h.edit===void 0||q.is(h.edit))}g.is=N})(rn=e.CodeAction||(e.CodeAction={}));var nn;(function(g){function k(_,h){var $={range:_};return w.defined(h)&&($.data=h),$}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(h.range)&&(w.undefined(h.command)||O.is(h.command))}g.is=N})(nn=e.CodeLens||(e.CodeLens={}));var wn;(function(g){function k(_,h){return{tabSize:_,insertSpaces:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&w.uinteger(h.tabSize)&&w.boolean(h.insertSpaces)}g.is=N})(wn=e.FormattingOptions||(e.FormattingOptions={}));var C;(function(g){function k(_,h,$){return{range:_,target:h,data:$}}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(h.range)&&(w.undefined(h.target)||w.string(h.target))}g.is=N})(C=e.DocumentLink||(e.DocumentLink={}));var x;(function(g){function k(_,h){return{range:_,parent:h}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&s.is(h.range)&&(h.parent===void 0||g.is(h.parent))}g.is=N})(x=e.SelectionRange||(e.SelectionRange={}));var G;(function(g){g.namespace="namespace",g.type="type",g.class="class",g.enum="enum",g.interface="interface",g.struct="struct",g.typeParameter="typeParameter",g.parameter="parameter",g.variable="variable",g.property="property",g.enumMember="enumMember",g.event="event",g.function="function",g.method="method",g.macro="macro",g.keyword="keyword",g.modifier="modifier",g.comment="comment",g.string="string",g.number="number",g.regexp="regexp",g.operator="operator",g.decorator="decorator"})(G=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var z;(function(g){g.declaration="declaration",g.definition="definition",g.readonly="readonly",g.static="static",g.deprecated="deprecated",g.abstract="abstract",g.async="async",g.modification="modification",g.documentation="documentation",g.defaultLibrary="defaultLibrary"})(z=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var xe;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&(_.resultId===void 0||typeof _.resultId=="string")&&Array.isArray(_.data)&&(_.data.length===0||typeof _.data[0]=="number")}g.is=k})(xe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(g){function k(_,h){return{range:_,text:h}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&w.string(h.text)}g.is=N})(Le=e.InlineValueText||(e.InlineValueText={}));var Je;(function(g){function k(_,h,$){return{range:_,variableName:h,caseSensitiveLookup:$}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&w.boolean(h.caseSensitiveLookup)&&(w.string(h.variableName)||h.variableName===void 0)}g.is=N})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var pt;(function(g){function k(_,h){return{range:_,expression:h}}g.create=k;function N(_){var h=_;return h!=null&&s.is(h.range)&&(w.string(h.expression)||h.expression===void 0)}g.is=N})(pt=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ye;(function(g){function k(_,h){return{frameId:_,stoppedLocation:h}}g.create=k;function N(_){var h=_;return w.defined(h)&&s.is(_.stoppedLocation)}g.is=N})(ye=e.InlineValueContext||(e.InlineValueContext={}));var je;(function(g){g.Type=1,g.Parameter=2;function k(N){return N===1||N===2}g.is=k})(je=e.InlayHintKind||(e.InlayHintKind={}));var _e;(function(g){function k(_){return{value:_}}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&(h.tooltip===void 0||w.string(h.tooltip)||Ct.is(h.tooltip))&&(h.location===void 0||u.is(h.location))&&(h.command===void 0||O.is(h.command))}g.is=N})(_e=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ft;(function(g){function k(_,h,$){var D={position:_,label:h};return $!==void 0&&(D.kind=$),D}g.create=k;function N(_){var h=_;return w.objectLiteral(h)&&o.is(h.position)&&(w.string(h.label)||w.typedArray(h.label,_e.is))&&(h.kind===void 0||je.is(h.kind))&&h.textEdits===void 0||w.typedArray(h.textEdits,F.is)&&(h.tooltip===void 0||w.string(h.tooltip)||Ct.is(h.tooltip))&&(h.paddingLeft===void 0||w.boolean(h.paddingLeft))&&(h.paddingRight===void 0||w.boolean(h.paddingRight))}g.is=N})(ft=e.InlayHint||(e.InlayHint={}));var Xt;(function(g){function k(N){var _=N;return w.objectLiteral(_)&&n.is(_.uri)&&w.string(_.name)}g.is=k})(Xt=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var li;(function(g){function k($,D,ae,ut){return new $n($,D,ae,ut)}g.create=k;function N($){var D=$;return!!(w.defined(D)&&w.string(D.uri)&&(w.undefined(D.languageId)||w.string(D.languageId))&&w.uinteger(D.lineCount)&&w.func(D.getText)&&w.func(D.positionAt)&&w.func(D.offsetAt))}g.is=N;function _($,D){for(var ae=$.getText(),ut=h(D,function(po,jl){var D_=po.range.start.line-jl.range.start.line;return D_===0?po.range.start.character-jl.range.start.character:D_}),Ge=ae.length,an=ut.length-1;an>=0;an--){var on=ut[an],ci=$.offsetAt(on.range.start),ge=$.offsetAt(on.range.end);if(ge<=Ge)ae=ae.substring(0,ci)+on.newText+ae.substring(ge,ae.length);else throw new Error("Overlapping edit");Ge=ci}return ae}g.applyEdits=_;function h($,D){if($.length<=1)return $;var ae=$.length/2|0,ut=$.slice(0,ae),Ge=$.slice(ae);h(ut,D),h(Ge,D);for(var an=0,on=0,ci=0;an<ut.length&&on<Ge.length;){var ge=D(ut[an],Ge[on]);ge<=0?$[ci++]=ut[an++]:$[ci++]=Ge[on++]}for(;an<ut.length;)$[ci++]=ut[an++];for(;on<Ge.length;)$[ci++]=Ge[on++];return $}})(li=e.TextDocument||(e.TextDocument={}));var $n=function(){function g(k,N,_,h){this._uri=k,this._languageId=N,this._version=_,this._content=h,this._lineOffsets=void 0}return Object.defineProperty(g.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),g.prototype.getText=function(k){if(k){var N=this.offsetAt(k.start),_=this.offsetAt(k.end);return this._content.substring(N,_)}return this._content},g.prototype.update=function(k,N){this._content=k.text,this._version=N,this._lineOffsets=void 0},g.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var k=[],N=this._content,_=!0,h=0;h<N.length;h++){_&&(k.push(h),_=!1);var $=N.charAt(h);_=$==="\r"||$===`
`,$==="\r"&&h+1<N.length&&N.charAt(h+1)===`
`&&h++}_&&N.length>0&&k.push(N.length),this._lineOffsets=k}return this._lineOffsets},g.prototype.positionAt=function(k){k=Math.max(Math.min(k,this._content.length),0);var N=this.getLineOffsets(),_=0,h=N.length;if(h===0)return o.create(0,k);for(;_<h;){var $=Math.floor((_+h)/2);N[$]>k?h=$:_=$+1}var D=_-1;return o.create(D,k-N[D])},g.prototype.offsetAt=function(k){var N=this.getLineOffsets();if(k.line>=N.length)return this._content.length;if(k.line<0)return 0;var _=N[k.line],h=k.line+1<N.length?N[k.line+1]:this._content.length;return Math.max(Math.min(_+k.character,h),_)},Object.defineProperty(g.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),g}(),w;(function(g){var k=Object.prototype.toString;function N(ge){return typeof ge<"u"}g.defined=N;function _(ge){return typeof ge>"u"}g.undefined=_;function h(ge){return ge===!0||ge===!1}g.boolean=h;function $(ge){return k.call(ge)==="[object String]"}g.string=$;function D(ge){return k.call(ge)==="[object Number]"}g.number=D;function ae(ge,po,jl){return k.call(ge)==="[object Number]"&&po<=ge&&ge<=jl}g.numberRange=ae;function ut(ge){return k.call(ge)==="[object Number]"&&-2147483648<=ge&&ge<=2147483647}g.integer=ut;function Ge(ge){return k.call(ge)==="[object Number]"&&0<=ge&&ge<=2147483647}g.uinteger=Ge;function an(ge){return k.call(ge)==="[object Function]"}g.func=an;function on(ge){return ge!==null&&typeof ge=="object"}g.objectLiteral=on;function ci(ge,po){return Array.isArray(ge)&&ge.every(po)}g.typedArray=ci})(w||(w={}))})});var at=d(sr=>{"use strict";Object.defineProperty(sr,"__esModule",{value:!0});sr.ProtocolNotificationType=sr.ProtocolNotificationType0=sr.ProtocolRequestType=sr.ProtocolRequestType0=sr.RegistrationType=sr.MessageDirection=void 0;var Ro=mi(),Nq;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(Nq=sr.MessageDirection||(sr.MessageDirection={}));var Qh=class{constructor(e){this.method=e}};sr.RegistrationType=Qh;var Zh=class extends Ro.RequestType0{constructor(e){super(e)}};sr.ProtocolRequestType0=Zh;var em=class extends Ro.RequestType{constructor(e){super(e,Ro.ParameterStructures.byName)}};sr.ProtocolRequestType=em;var tm=class extends Ro.NotificationType0{constructor(e){super(e)}};sr.ProtocolNotificationType0=tm;var rm=class extends Ro.NotificationType{constructor(e){super(e,Ro.ParameterStructures.byName)}};sr.ProtocolNotificationType=rm});var Xl=d(ht=>{"use strict";Object.defineProperty(ht,"__esModule",{value:!0});ht.objectLiteral=ht.typedArray=ht.stringArray=ht.array=ht.func=ht.error=ht.number=ht.string=ht.boolean=void 0;function wq(t){return t===!0||t===!1}ht.boolean=wq;function aR(t){return typeof t=="string"||t instanceof String}ht.string=aR;function $q(t){return typeof t=="number"||t instanceof Number}ht.number=$q;function Oq(t){return t instanceof Error}ht.error=Oq;function Iq(t){return typeof t=="function"}ht.func=Iq;function oR(t){return Array.isArray(t)}ht.array=oR;function Dq(t){return oR(t)&&t.every(e=>aR(e))}ht.stringArray=Dq;function xq(t,e){return Array.isArray(t)&&t.every(e)}ht.typedArray=xq;function Lq(t){return t!==null&&typeof t=="object"}ht.objectLiteral=Lq});var uR=d(pu=>{"use strict";Object.defineProperty(pu,"__esModule",{value:!0});pu.ImplementationRequest=void 0;var sR=at(),qq;(function(t){t.method="textDocument/implementation",t.messageDirection=sR.MessageDirection.clientToServer,t.type=new sR.ProtocolRequestType(t.method)})(qq=pu.ImplementationRequest||(pu.ImplementationRequest={}))});var cR=d(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.TypeDefinitionRequest=void 0;var lR=at(),Mq;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=lR.MessageDirection.clientToServer,t.type=new lR.ProtocolRequestType(t.method)})(Mq=hu.TypeDefinitionRequest||(hu.TypeDefinitionRequest={}))});var fR=d(Gi=>{"use strict";Object.defineProperty(Gi,"__esModule",{value:!0});Gi.DidChangeWorkspaceFoldersNotification=Gi.WorkspaceFoldersRequest=void 0;var Jl=at(),Fq;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Jl.MessageDirection.serverToClient,t.type=new Jl.ProtocolRequestType0(t.method)})(Fq=Gi.WorkspaceFoldersRequest||(Gi.WorkspaceFoldersRequest={}));var jq;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Jl.MessageDirection.clientToServer,t.type=new Jl.ProtocolNotificationType(t.method)})(jq=Gi.DidChangeWorkspaceFoldersNotification||(Gi.DidChangeWorkspaceFoldersNotification={}))});var pR=d(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.ConfigurationRequest=void 0;var dR=at(),Gq;(function(t){t.method="workspace/configuration",t.messageDirection=dR.MessageDirection.serverToClient,t.type=new dR.ProtocolRequestType(t.method)})(Gq=mu.ConfigurationRequest||(mu.ConfigurationRequest={}))});var hR=d(Ui=>{"use strict";Object.defineProperty(Ui,"__esModule",{value:!0});Ui.ColorPresentationRequest=Ui.DocumentColorRequest=void 0;var Ql=at(),Uq;(function(t){t.method="textDocument/documentColor",t.messageDirection=Ql.MessageDirection.clientToServer,t.type=new Ql.ProtocolRequestType(t.method)})(Uq=Ui.DocumentColorRequest||(Ui.DocumentColorRequest={}));var Hq;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Ql.MessageDirection.clientToServer,t.type=new Ql.ProtocolRequestType(t.method)})(Hq=Ui.ColorPresentationRequest||(Ui.ColorPresentationRequest={}))});var yR=d(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.FoldingRangeRequest=void 0;var mR=at(),Kq;(function(t){t.method="textDocument/foldingRange",t.messageDirection=mR.MessageDirection.clientToServer,t.type=new mR.ProtocolRequestType(t.method)})(Kq=yu.FoldingRangeRequest||(yu.FoldingRangeRequest={}))});var vR=d(gu=>{"use strict";Object.defineProperty(gu,"__esModule",{value:!0});gu.DeclarationRequest=void 0;var gR=at(),Wq;(function(t){t.method="textDocument/declaration",t.messageDirection=gR.MessageDirection.clientToServer,t.type=new gR.ProtocolRequestType(t.method)})(Wq=gu.DeclarationRequest||(gu.DeclarationRequest={}))});var _R=d(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.SelectionRangeRequest=void 0;var TR=at(),Bq;(function(t){t.method="textDocument/selectionRange",t.messageDirection=TR.MessageDirection.clientToServer,t.type=new TR.ProtocolRequestType(t.method)})(Bq=vu.SelectionRangeRequest||(vu.SelectionRangeRequest={}))});var RR=d(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.WorkDoneProgressCancelNotification=ln.WorkDoneProgressCreateRequest=ln.WorkDoneProgress=void 0;var Vq=mi(),Zl=at(),zq;(function(t){t.type=new Vq.ProgressType;function e(r){return r===t.type}t.is=e})(zq=ln.WorkDoneProgress||(ln.WorkDoneProgress={}));var Yq;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=Zl.MessageDirection.serverToClient,t.type=new Zl.ProtocolRequestType(t.method)})(Yq=ln.WorkDoneProgressCreateRequest||(ln.WorkDoneProgressCreateRequest={}));var Xq;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=Zl.MessageDirection.clientToServer,t.type=new Zl.ProtocolNotificationType(t.method)})(Xq=ln.WorkDoneProgressCancelNotification||(ln.WorkDoneProgressCancelNotification={}))});var AR=d(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.CallHierarchyOutgoingCallsRequest=cn.CallHierarchyIncomingCallsRequest=cn.CallHierarchyPrepareRequest=void 0;var Ao=at(),Jq;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Ao.MessageDirection.clientToServer,t.type=new Ao.ProtocolRequestType(t.method)})(Jq=cn.CallHierarchyPrepareRequest||(cn.CallHierarchyPrepareRequest={}));var Qq;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Ao.MessageDirection.clientToServer,t.type=new Ao.ProtocolRequestType(t.method)})(Qq=cn.CallHierarchyIncomingCallsRequest||(cn.CallHierarchyIncomingCallsRequest={}));var Zq;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Ao.MessageDirection.clientToServer,t.type=new Ao.ProtocolRequestType(t.method)})(Zq=cn.CallHierarchyOutgoingCallsRequest||(cn.CallHierarchyOutgoingCallsRequest={}))});var SR=d(mt=>{"use strict";Object.defineProperty(mt,"__esModule",{value:!0});mt.SemanticTokensRefreshRequest=mt.SemanticTokensRangeRequest=mt.SemanticTokensDeltaRequest=mt.SemanticTokensRequest=mt.SemanticTokensRegistrationType=mt.TokenFormat=void 0;var yi=at(),eM;(function(t){t.Relative="relative"})(eM=mt.TokenFormat||(mt.TokenFormat={}));var ec;(function(t){t.method="textDocument/semanticTokens",t.type=new yi.RegistrationType(t.method)})(ec=mt.SemanticTokensRegistrationType||(mt.SemanticTokensRegistrationType={}));var tM;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=yi.MessageDirection.clientToServer,t.type=new yi.ProtocolRequestType(t.method),t.registrationMethod=ec.method})(tM=mt.SemanticTokensRequest||(mt.SemanticTokensRequest={}));var rM;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=yi.MessageDirection.clientToServer,t.type=new yi.ProtocolRequestType(t.method),t.registrationMethod=ec.method})(rM=mt.SemanticTokensDeltaRequest||(mt.SemanticTokensDeltaRequest={}));var nM;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=yi.MessageDirection.clientToServer,t.type=new yi.ProtocolRequestType(t.method),t.registrationMethod=ec.method})(nM=mt.SemanticTokensRangeRequest||(mt.SemanticTokensRangeRequest={}));var iM;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=yi.MessageDirection.clientToServer,t.type=new yi.ProtocolRequestType0(t.method)})(iM=mt.SemanticTokensRefreshRequest||(mt.SemanticTokensRefreshRequest={}))});var CR=d(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.ShowDocumentRequest=void 0;var bR=at(),aM;(function(t){t.method="window/showDocument",t.messageDirection=bR.MessageDirection.serverToClient,t.type=new bR.ProtocolRequestType(t.method)})(aM=Tu.ShowDocumentRequest||(Tu.ShowDocumentRequest={}))});var ER=d(_u=>{"use strict";Object.defineProperty(_u,"__esModule",{value:!0});_u.LinkedEditingRangeRequest=void 0;var PR=at(),oM;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=PR.MessageDirection.clientToServer,t.type=new PR.ProtocolRequestType(t.method)})(oM=_u.LinkedEditingRangeRequest||(_u.LinkedEditingRangeRequest={}))});var kR=d(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var xr=at(),sM;(function(t){t.file="file",t.folder="folder"})(sM=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var uM;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(uM=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var lM;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(lM=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var cM;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(cM=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var fM;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(fM=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var dM;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolNotificationType(t.method)})(dM=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var pM;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=xr.MessageDirection.clientToServer,t.type=new xr.ProtocolRequestType(t.method)})(pM=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var wR=d(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.MonikerRequest=fn.MonikerKind=fn.UniquenessLevel=void 0;var NR=at(),hM;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(hM=fn.UniquenessLevel||(fn.UniquenessLevel={}));var mM;(function(t){t.$import="import",t.$export="export",t.local="local"})(mM=fn.MonikerKind||(fn.MonikerKind={}));var yM;(function(t){t.method="textDocument/moniker",t.messageDirection=NR.MessageDirection.clientToServer,t.type=new NR.ProtocolRequestType(t.method)})(yM=fn.MonikerRequest||(fn.MonikerRequest={}))});var $R=d(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.TypeHierarchySubtypesRequest=dn.TypeHierarchySupertypesRequest=dn.TypeHierarchyPrepareRequest=void 0;var So=at(),gM;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=So.MessageDirection.clientToServer,t.type=new So.ProtocolRequestType(t.method)})(gM=dn.TypeHierarchyPrepareRequest||(dn.TypeHierarchyPrepareRequest={}));var vM;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=So.MessageDirection.clientToServer,t.type=new So.ProtocolRequestType(t.method)})(vM=dn.TypeHierarchySupertypesRequest||(dn.TypeHierarchySupertypesRequest={}));var TM;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=So.MessageDirection.clientToServer,t.type=new So.ProtocolRequestType(t.method)})(TM=dn.TypeHierarchySubtypesRequest||(dn.TypeHierarchySubtypesRequest={}))});var OR=d(Hi=>{"use strict";Object.defineProperty(Hi,"__esModule",{value:!0});Hi.InlineValueRefreshRequest=Hi.InlineValueRequest=void 0;var tc=at(),_M;(function(t){t.method="textDocument/inlineValue",t.messageDirection=tc.MessageDirection.clientToServer,t.type=new tc.ProtocolRequestType(t.method)})(_M=Hi.InlineValueRequest||(Hi.InlineValueRequest={}));var RM;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=tc.MessageDirection.clientToServer,t.type=new tc.ProtocolRequestType0(t.method)})(RM=Hi.InlineValueRefreshRequest||(Hi.InlineValueRefreshRequest={}))});var IR=d(pn=>{"use strict";Object.defineProperty(pn,"__esModule",{value:!0});pn.InlayHintRefreshRequest=pn.InlayHintResolveRequest=pn.InlayHintRequest=void 0;var bo=at(),AM;(function(t){t.method="textDocument/inlayHint",t.messageDirection=bo.MessageDirection.clientToServer,t.type=new bo.ProtocolRequestType(t.method)})(AM=pn.InlayHintRequest||(pn.InlayHintRequest={}));var SM;(function(t){t.method="inlayHint/resolve",t.messageDirection=bo.MessageDirection.clientToServer,t.type=new bo.ProtocolRequestType(t.method)})(SM=pn.InlayHintResolveRequest||(pn.InlayHintResolveRequest={}));var bM;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=bo.MessageDirection.clientToServer,t.type=new bo.ProtocolRequestType0(t.method)})(bM=pn.InlayHintRefreshRequest||(pn.InlayHintRefreshRequest={}))});var xR=d(Ut=>{"use strict";Object.defineProperty(Ut,"__esModule",{value:!0});Ut.DiagnosticRefreshRequest=Ut.WorkspaceDiagnosticRequest=Ut.DocumentDiagnosticRequest=Ut.DocumentDiagnosticReportKind=Ut.DiagnosticServerCancellationData=void 0;var DR=mi(),CM=Xl(),Co=at(),PM;(function(t){function e(r){let n=r;return n&&CM.boolean(n.retriggerRequest)}t.is=e})(PM=Ut.DiagnosticServerCancellationData||(Ut.DiagnosticServerCancellationData={}));var EM;(function(t){t.Full="full",t.Unchanged="unchanged"})(EM=Ut.DocumentDiagnosticReportKind||(Ut.DocumentDiagnosticReportKind={}));var kM;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Co.MessageDirection.clientToServer,t.type=new Co.ProtocolRequestType(t.method),t.partialResult=new DR.ProgressType})(kM=Ut.DocumentDiagnosticRequest||(Ut.DocumentDiagnosticRequest={}));var NM;(function(t){t.method="workspace/diagnostic",t.messageDirection=Co.MessageDirection.clientToServer,t.type=new Co.ProtocolRequestType(t.method),t.partialResult=new DR.ProgressType})(NM=Ut.WorkspaceDiagnosticRequest||(Ut.WorkspaceDiagnosticRequest={}));var wM;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Co.MessageDirection.clientToServer,t.type=new Co.ProtocolRequestType0(t.method)})(wM=Ut.DiagnosticRefreshRequest||(Ut.DiagnosticRefreshRequest={}))});var MR=d(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.DidCloseNotebookDocumentNotification=Se.DidSaveNotebookDocumentNotification=Se.DidChangeNotebookDocumentNotification=Se.NotebookCellArrayChange=Se.DidOpenNotebookDocumentNotification=Se.NotebookDocumentSyncRegistrationType=Se.NotebookDocument=Se.NotebookCell=Se.ExecutionSummary=Se.NotebookCellKind=void 0;var Ru=_o(),hn=Xl(),On=at(),LR;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(LR=Se.NotebookCellKind||(Se.NotebookCellKind={}));var qR;(function(t){function e(i,a){let o={executionOrder:i};return(a===!0||a===!1)&&(o.success=a),o}t.create=e;function r(i){let a=i;return hn.objectLiteral(a)&&Ru.uinteger.is(a.executionOrder)&&(a.success===void 0||hn.boolean(a.success))}t.is=r;function n(i,a){return i===a?!0:i==null||a===null||a===void 0?!1:i.executionOrder===a.executionOrder&&i.success===a.success}t.equals=n})(qR=Se.ExecutionSummary||(Se.ExecutionSummary={}));var nm;(function(t){function e(a,o){return{kind:a,document:o}}t.create=e;function r(a){let o=a;return hn.objectLiteral(o)&&LR.is(o.kind)&&Ru.DocumentUri.is(o.document)&&(o.metadata===void 0||hn.objectLiteral(o.metadata))}t.is=r;function n(a,o){let s=new Set;return a.document!==o.document&&s.add("document"),a.kind!==o.kind&&s.add("kind"),a.executionSummary!==o.executionSummary&&s.add("executionSummary"),(a.metadata!==void 0||o.metadata!==void 0)&&!i(a.metadata,o.metadata)&&s.add("metadata"),(a.executionSummary!==void 0||o.executionSummary!==void 0)&&!qR.equals(a.executionSummary,o.executionSummary)&&s.add("executionSummary"),s}t.diff=n;function i(a,o){if(a===o)return!0;if(a==null||o===null||o===void 0||typeof a!=typeof o||typeof a!="object")return!1;let s=Array.isArray(a),u=Array.isArray(o);if(s!==u)return!1;if(s&&u){if(a.length!==o.length)return!1;for(let l=0;l<a.length;l++)if(!i(a[l],o[l]))return!1}if(hn.objectLiteral(a)&&hn.objectLiteral(o)){let l=Object.keys(a),c=Object.keys(o);if(l.length!==c.length||(l.sort(),c.sort(),!i(l,c)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(a[m],o[m]))return!1}}return!0}})(nm=Se.NotebookCell||(Se.NotebookCell={}));var $M;(function(t){function e(n,i,a,o){return{uri:n,notebookType:i,version:a,cells:o}}t.create=e;function r(n){let i=n;return hn.objectLiteral(i)&&hn.string(i.uri)&&Ru.integer.is(i.version)&&hn.typedArray(i.cells,nm.is)}t.is=r})($M=Se.NotebookDocument||(Se.NotebookDocument={}));var Au;(function(t){t.method="notebookDocument/sync",t.messageDirection=On.MessageDirection.clientToServer,t.type=new On.RegistrationType(t.method)})(Au=Se.NotebookDocumentSyncRegistrationType||(Se.NotebookDocumentSyncRegistrationType={}));var OM;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=On.MessageDirection.clientToServer,t.type=new On.ProtocolNotificationType(t.method),t.registrationMethod=Au.method})(OM=Se.DidOpenNotebookDocumentNotification||(Se.DidOpenNotebookDocumentNotification={}));var IM;(function(t){function e(n){let i=n;return hn.objectLiteral(i)&&Ru.uinteger.is(i.start)&&Ru.uinteger.is(i.deleteCount)&&(i.cells===void 0||hn.typedArray(i.cells,nm.is))}t.is=e;function r(n,i,a){let o={start:n,deleteCount:i};return a!==void 0&&(o.cells=a),o}t.create=r})(IM=Se.NotebookCellArrayChange||(Se.NotebookCellArrayChange={}));var DM;(function(t){t.method="notebookDocument/didChange",t.messageDirection=On.MessageDirection.clientToServer,t.type=new On.ProtocolNotificationType(t.method),t.registrationMethod=Au.method})(DM=Se.DidChangeNotebookDocumentNotification||(Se.DidChangeNotebookDocumentNotification={}));var xM;(function(t){t.method="notebookDocument/didSave",t.messageDirection=On.MessageDirection.clientToServer,t.type=new On.ProtocolNotificationType(t.method),t.registrationMethod=Au.method})(xM=Se.DidSaveNotebookDocumentNotification||(Se.DidSaveNotebookDocumentNotification={}));var LM;(function(t){t.method="notebookDocument/didClose",t.messageDirection=On.MessageDirection.clientToServer,t.type=new On.ProtocolNotificationType(t.method),t.registrationMethod=Au.method})(LM=Se.DidCloseNotebookDocumentNotification||(Se.DidCloseNotebookDocumentNotification={}))});var VR=d(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.WorkspaceSymbolRequest=T.CodeActionResolveRequest=T.CodeActionRequest=T.DocumentSymbolRequest=T.DocumentHighlightRequest=T.ReferencesRequest=T.DefinitionRequest=T.SignatureHelpRequest=T.SignatureHelpTriggerKind=T.HoverRequest=T.CompletionResolveRequest=T.CompletionRequest=T.CompletionTriggerKind=T.PublishDiagnosticsNotification=T.WatchKind=T.RelativePattern=T.FileChangeType=T.DidChangeWatchedFilesNotification=T.WillSaveTextDocumentWaitUntilRequest=T.WillSaveTextDocumentNotification=T.TextDocumentSaveReason=T.DidSaveTextDocumentNotification=T.DidCloseTextDocumentNotification=T.DidChangeTextDocumentNotification=T.TextDocumentContentChangeEvent=T.DidOpenTextDocumentNotification=T.TextDocumentSyncKind=T.TelemetryEventNotification=T.LogMessageNotification=T.ShowMessageRequest=T.ShowMessageNotification=T.MessageType=T.DidChangeConfigurationNotification=T.ExitNotification=T.ShutdownRequest=T.InitializedNotification=T.InitializeErrorCodes=T.InitializeRequest=T.WorkDoneProgressOptions=T.TextDocumentRegistrationOptions=T.StaticRegistrationOptions=T.PositionEncodingKind=T.FailureHandlingKind=T.ResourceOperationKind=T.UnregistrationRequest=T.RegistrationRequest=T.DocumentSelector=T.NotebookCellTextDocumentFilter=T.NotebookDocumentFilter=T.TextDocumentFilter=void 0;T.TypeHierarchySubtypesRequest=T.TypeHierarchyPrepareRequest=T.MonikerRequest=T.MonikerKind=T.UniquenessLevel=T.WillDeleteFilesRequest=T.DidDeleteFilesNotification=T.WillRenameFilesRequest=T.DidRenameFilesNotification=T.WillCreateFilesRequest=T.DidCreateFilesNotification=T.FileOperationPatternKind=T.LinkedEditingRangeRequest=T.ShowDocumentRequest=T.SemanticTokensRegistrationType=T.SemanticTokensRefreshRequest=T.SemanticTokensRangeRequest=T.SemanticTokensDeltaRequest=T.SemanticTokensRequest=T.TokenFormat=T.CallHierarchyPrepareRequest=T.CallHierarchyOutgoingCallsRequest=T.CallHierarchyIncomingCallsRequest=T.WorkDoneProgressCancelNotification=T.WorkDoneProgressCreateRequest=T.WorkDoneProgress=T.SelectionRangeRequest=T.DeclarationRequest=T.FoldingRangeRequest=T.ColorPresentationRequest=T.DocumentColorRequest=T.ConfigurationRequest=T.DidChangeWorkspaceFoldersNotification=T.WorkspaceFoldersRequest=T.TypeDefinitionRequest=T.ImplementationRequest=T.ApplyWorkspaceEditRequest=T.ExecuteCommandRequest=T.PrepareRenameRequest=T.RenameRequest=T.PrepareSupportDefaultBehavior=T.DocumentOnTypeFormattingRequest=T.DocumentRangeFormattingRequest=T.DocumentFormattingRequest=T.DocumentLinkResolveRequest=T.DocumentLinkRequest=T.CodeLensRefreshRequest=T.CodeLensResolveRequest=T.CodeLensRequest=T.WorkspaceSymbolResolveRequest=void 0;T.DidCloseNotebookDocumentNotification=T.DidSaveNotebookDocumentNotification=T.DidChangeNotebookDocumentNotification=T.NotebookCellArrayChange=T.DidOpenNotebookDocumentNotification=T.NotebookDocumentSyncRegistrationType=T.NotebookDocument=T.NotebookCell=T.ExecutionSummary=T.NotebookCellKind=T.DiagnosticRefreshRequest=T.WorkspaceDiagnosticRequest=T.DocumentDiagnosticRequest=T.DocumentDiagnosticReportKind=T.DiagnosticServerCancellationData=T.InlayHintRefreshRequest=T.InlayHintResolveRequest=T.InlayHintRequest=T.InlineValueRefreshRequest=T.InlineValueRequest=T.TypeHierarchySupertypesRequest=void 0;var M=at(),FR=_o(),Ht=Xl(),qM=uR();Object.defineProperty(T,"ImplementationRequest",{enumerable:!0,get:function(){return qM.ImplementationRequest}});var MM=cR();Object.defineProperty(T,"TypeDefinitionRequest",{enumerable:!0,get:function(){return MM.TypeDefinitionRequest}});var jR=fR();Object.defineProperty(T,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return jR.WorkspaceFoldersRequest}});Object.defineProperty(T,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return jR.DidChangeWorkspaceFoldersNotification}});var FM=pR();Object.defineProperty(T,"ConfigurationRequest",{enumerable:!0,get:function(){return FM.ConfigurationRequest}});var GR=hR();Object.defineProperty(T,"DocumentColorRequest",{enumerable:!0,get:function(){return GR.DocumentColorRequest}});Object.defineProperty(T,"ColorPresentationRequest",{enumerable:!0,get:function(){return GR.ColorPresentationRequest}});var jM=yR();Object.defineProperty(T,"FoldingRangeRequest",{enumerable:!0,get:function(){return jM.FoldingRangeRequest}});var GM=vR();Object.defineProperty(T,"DeclarationRequest",{enumerable:!0,get:function(){return GM.DeclarationRequest}});var UM=_R();Object.defineProperty(T,"SelectionRangeRequest",{enumerable:!0,get:function(){return UM.SelectionRangeRequest}});var im=RR();Object.defineProperty(T,"WorkDoneProgress",{enumerable:!0,get:function(){return im.WorkDoneProgress}});Object.defineProperty(T,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return im.WorkDoneProgressCreateRequest}});Object.defineProperty(T,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return im.WorkDoneProgressCancelNotification}});var am=AR();Object.defineProperty(T,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return am.CallHierarchyIncomingCallsRequest}});Object.defineProperty(T,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return am.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(T,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return am.CallHierarchyPrepareRequest}});var Po=SR();Object.defineProperty(T,"TokenFormat",{enumerable:!0,get:function(){return Po.TokenFormat}});Object.defineProperty(T,"SemanticTokensRequest",{enumerable:!0,get:function(){return Po.SemanticTokensRequest}});Object.defineProperty(T,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Po.SemanticTokensDeltaRequest}});Object.defineProperty(T,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Po.SemanticTokensRangeRequest}});Object.defineProperty(T,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Po.SemanticTokensRefreshRequest}});Object.defineProperty(T,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Po.SemanticTokensRegistrationType}});var HM=CR();Object.defineProperty(T,"ShowDocumentRequest",{enumerable:!0,get:function(){return HM.ShowDocumentRequest}});var KM=ER();Object.defineProperty(T,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return KM.LinkedEditingRangeRequest}});var Na=kR();Object.defineProperty(T,"FileOperationPatternKind",{enumerable:!0,get:function(){return Na.FileOperationPatternKind}});Object.defineProperty(T,"DidCreateFilesNotification",{enumerable:!0,get:function(){return Na.DidCreateFilesNotification}});Object.defineProperty(T,"WillCreateFilesRequest",{enumerable:!0,get:function(){return Na.WillCreateFilesRequest}});Object.defineProperty(T,"DidRenameFilesNotification",{enumerable:!0,get:function(){return Na.DidRenameFilesNotification}});Object.defineProperty(T,"WillRenameFilesRequest",{enumerable:!0,get:function(){return Na.WillRenameFilesRequest}});Object.defineProperty(T,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return Na.DidDeleteFilesNotification}});Object.defineProperty(T,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return Na.WillDeleteFilesRequest}});var om=wR();Object.defineProperty(T,"UniquenessLevel",{enumerable:!0,get:function(){return om.UniquenessLevel}});Object.defineProperty(T,"MonikerKind",{enumerable:!0,get:function(){return om.MonikerKind}});Object.defineProperty(T,"MonikerRequest",{enumerable:!0,get:function(){return om.MonikerRequest}});var sm=$R();Object.defineProperty(T,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return sm.TypeHierarchyPrepareRequest}});Object.defineProperty(T,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return sm.TypeHierarchySubtypesRequest}});Object.defineProperty(T,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return sm.TypeHierarchySupertypesRequest}});var UR=OR();Object.defineProperty(T,"InlineValueRequest",{enumerable:!0,get:function(){return UR.InlineValueRequest}});Object.defineProperty(T,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return UR.InlineValueRefreshRequest}});var um=IR();Object.defineProperty(T,"InlayHintRequest",{enumerable:!0,get:function(){return um.InlayHintRequest}});Object.defineProperty(T,"InlayHintResolveRequest",{enumerable:!0,get:function(){return um.InlayHintResolveRequest}});Object.defineProperty(T,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return um.InlayHintRefreshRequest}});var Su=xR();Object.defineProperty(T,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Su.DiagnosticServerCancellationData}});Object.defineProperty(T,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Su.DocumentDiagnosticReportKind}});Object.defineProperty(T,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Su.DocumentDiagnosticRequest}});Object.defineProperty(T,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Su.WorkspaceDiagnosticRequest}});Object.defineProperty(T,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Su.DiagnosticRefreshRequest}});var In=MR();Object.defineProperty(T,"NotebookCellKind",{enumerable:!0,get:function(){return In.NotebookCellKind}});Object.defineProperty(T,"ExecutionSummary",{enumerable:!0,get:function(){return In.ExecutionSummary}});Object.defineProperty(T,"NotebookCell",{enumerable:!0,get:function(){return In.NotebookCell}});Object.defineProperty(T,"NotebookDocument",{enumerable:!0,get:function(){return In.NotebookDocument}});Object.defineProperty(T,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return In.NotebookDocumentSyncRegistrationType}});Object.defineProperty(T,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return In.DidOpenNotebookDocumentNotification}});Object.defineProperty(T,"NotebookCellArrayChange",{enumerable:!0,get:function(){return In.NotebookCellArrayChange}});Object.defineProperty(T,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return In.DidChangeNotebookDocumentNotification}});Object.defineProperty(T,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return In.DidSaveNotebookDocumentNotification}});Object.defineProperty(T,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return In.DidCloseNotebookDocumentNotification}});var HR;(function(t){function e(r){let n=r;return Ht.string(n.language)||Ht.string(n.scheme)||Ht.string(n.pattern)}t.is=e})(HR=T.TextDocumentFilter||(T.TextDocumentFilter={}));var KR;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(Ht.string(n.notebookType)||Ht.string(n.scheme)||Ht.string(n.pattern))}t.is=e})(KR=T.NotebookDocumentFilter||(T.NotebookDocumentFilter={}));var WR;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(Ht.string(n.notebook)||KR.is(n.notebook))&&(n.language===void 0||Ht.string(n.language))}t.is=e})(WR=T.NotebookCellTextDocumentFilter||(T.NotebookCellTextDocumentFilter={}));var BR;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Ht.string(n)&&!HR.is(n)&&!WR.is(n))return!1;return!0}t.is=e})(BR=T.DocumentSelector||(T.DocumentSelector={}));var WM;(function(t){t.method="client/registerCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(WM=T.RegistrationRequest||(T.RegistrationRequest={}));var BM;(function(t){t.method="client/unregisterCapability",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(BM=T.UnregistrationRequest||(T.UnregistrationRequest={}));var VM;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(VM=T.ResourceOperationKind||(T.ResourceOperationKind={}));var zM;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(zM=T.FailureHandlingKind||(T.FailureHandlingKind={}));var YM;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(YM=T.PositionEncodingKind||(T.PositionEncodingKind={}));var XM;(function(t){function e(r){let n=r;return n&&Ht.string(n.id)&&n.id.length>0}t.hasId=e})(XM=T.StaticRegistrationOptions||(T.StaticRegistrationOptions={}));var JM;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||BR.is(n.documentSelector))}t.is=e})(JM=T.TextDocumentRegistrationOptions||(T.TextDocumentRegistrationOptions={}));var QM;(function(t){function e(n){let i=n;return Ht.objectLiteral(i)&&(i.workDoneProgress===void 0||Ht.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Ht.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(QM=T.WorkDoneProgressOptions||(T.WorkDoneProgressOptions={}));var ZM;(function(t){t.method="initialize",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(ZM=T.InitializeRequest||(T.InitializeRequest={}));var eF;(function(t){t.unknownProtocolVersion=1})(eF=T.InitializeErrorCodes||(T.InitializeErrorCodes={}));var tF;(function(t){t.method="initialized",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(tF=T.InitializedNotification||(T.InitializedNotification={}));var rF;(function(t){t.method="shutdown",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType0(t.method)})(rF=T.ShutdownRequest||(T.ShutdownRequest={}));var nF;(function(t){t.method="exit",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType0(t.method)})(nF=T.ExitNotification||(T.ExitNotification={}));var iF;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(iF=T.DidChangeConfigurationNotification||(T.DidChangeConfigurationNotification={}));var aF;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(aF=T.MessageType||(T.MessageType={}));var oF;(function(t){t.method="window/showMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(oF=T.ShowMessageNotification||(T.ShowMessageNotification={}));var sF;(function(t){t.method="window/showMessageRequest",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType(t.method)})(sF=T.ShowMessageRequest||(T.ShowMessageRequest={}));var uF;(function(t){t.method="window/logMessage",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(uF=T.LogMessageNotification||(T.LogMessageNotification={}));var lF;(function(t){t.method="telemetry/event",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(lF=T.TelemetryEventNotification||(T.TelemetryEventNotification={}));var cF;(function(t){t.None=0,t.Full=1,t.Incremental=2})(cF=T.TextDocumentSyncKind||(T.TextDocumentSyncKind={}));var fF;(function(t){t.method="textDocument/didOpen",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(fF=T.DidOpenTextDocumentNotification||(T.DidOpenTextDocumentNotification={}));var dF;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(dF=T.TextDocumentContentChangeEvent||(T.TextDocumentContentChangeEvent={}));var pF;(function(t){t.method="textDocument/didChange",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(pF=T.DidChangeTextDocumentNotification||(T.DidChangeTextDocumentNotification={}));var hF;(function(t){t.method="textDocument/didClose",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(hF=T.DidCloseTextDocumentNotification||(T.DidCloseTextDocumentNotification={}));var mF;(function(t){t.method="textDocument/didSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(mF=T.DidSaveTextDocumentNotification||(T.DidSaveTextDocumentNotification={}));var yF;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(yF=T.TextDocumentSaveReason||(T.TextDocumentSaveReason={}));var gF;(function(t){t.method="textDocument/willSave",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(gF=T.WillSaveTextDocumentNotification||(T.WillSaveTextDocumentNotification={}));var vF;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(vF=T.WillSaveTextDocumentWaitUntilRequest||(T.WillSaveTextDocumentWaitUntilRequest={}));var TF;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolNotificationType(t.method)})(TF=T.DidChangeWatchedFilesNotification||(T.DidChangeWatchedFilesNotification={}));var _F;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(_F=T.FileChangeType||(T.FileChangeType={}));var RF;(function(t){function e(r){let n=r;return Ht.objectLiteral(n)&&(FR.URI.is(n.baseUri)||FR.WorkspaceFolder.is(n.baseUri))&&Ht.string(n.pattern)}t.is=e})(RF=T.RelativePattern||(T.RelativePattern={}));var AF;(function(t){t.Create=1,t.Change=2,t.Delete=4})(AF=T.WatchKind||(T.WatchKind={}));var SF;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolNotificationType(t.method)})(SF=T.PublishDiagnosticsNotification||(T.PublishDiagnosticsNotification={}));var bF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(bF=T.CompletionTriggerKind||(T.CompletionTriggerKind={}));var CF;(function(t){t.method="textDocument/completion",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(CF=T.CompletionRequest||(T.CompletionRequest={}));var PF;(function(t){t.method="completionItem/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(PF=T.CompletionResolveRequest||(T.CompletionResolveRequest={}));var EF;(function(t){t.method="textDocument/hover",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(EF=T.HoverRequest||(T.HoverRequest={}));var kF;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(kF=T.SignatureHelpTriggerKind||(T.SignatureHelpTriggerKind={}));var NF;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(NF=T.SignatureHelpRequest||(T.SignatureHelpRequest={}));var wF;(function(t){t.method="textDocument/definition",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(wF=T.DefinitionRequest||(T.DefinitionRequest={}));var $F;(function(t){t.method="textDocument/references",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})($F=T.ReferencesRequest||(T.ReferencesRequest={}));var OF;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(OF=T.DocumentHighlightRequest||(T.DocumentHighlightRequest={}));var IF;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(IF=T.DocumentSymbolRequest||(T.DocumentSymbolRequest={}));var DF;(function(t){t.method="textDocument/codeAction",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(DF=T.CodeActionRequest||(T.CodeActionRequest={}));var xF;(function(t){t.method="codeAction/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(xF=T.CodeActionResolveRequest||(T.CodeActionResolveRequest={}));var LF;(function(t){t.method="workspace/symbol",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(LF=T.WorkspaceSymbolRequest||(T.WorkspaceSymbolRequest={}));var qF;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(qF=T.WorkspaceSymbolResolveRequest||(T.WorkspaceSymbolResolveRequest={}));var MF;(function(t){t.method="textDocument/codeLens",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(MF=T.CodeLensRequest||(T.CodeLensRequest={}));var FF;(function(t){t.method="codeLens/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(FF=T.CodeLensResolveRequest||(T.CodeLensResolveRequest={}));var jF;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType0(t.method)})(jF=T.CodeLensRefreshRequest||(T.CodeLensRefreshRequest={}));var GF;(function(t){t.method="textDocument/documentLink",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(GF=T.DocumentLinkRequest||(T.DocumentLinkRequest={}));var UF;(function(t){t.method="documentLink/resolve",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(UF=T.DocumentLinkResolveRequest||(T.DocumentLinkResolveRequest={}));var HF;(function(t){t.method="textDocument/formatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(HF=T.DocumentFormattingRequest||(T.DocumentFormattingRequest={}));var KF;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(KF=T.DocumentRangeFormattingRequest||(T.DocumentRangeFormattingRequest={}));var WF;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(WF=T.DocumentOnTypeFormattingRequest||(T.DocumentOnTypeFormattingRequest={}));var BF;(function(t){t.Identifier=1})(BF=T.PrepareSupportDefaultBehavior||(T.PrepareSupportDefaultBehavior={}));var VF;(function(t){t.method="textDocument/rename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(VF=T.RenameRequest||(T.RenameRequest={}));var zF;(function(t){t.method="textDocument/prepareRename",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(zF=T.PrepareRenameRequest||(T.PrepareRenameRequest={}));var YF;(function(t){t.method="workspace/executeCommand",t.messageDirection=M.MessageDirection.clientToServer,t.type=new M.ProtocolRequestType(t.method)})(YF=T.ExecuteCommandRequest||(T.ExecuteCommandRequest={}));var XF;(function(t){t.method="workspace/applyEdit",t.messageDirection=M.MessageDirection.serverToClient,t.type=new M.ProtocolRequestType("workspace/applyEdit")})(XF=T.ApplyWorkspaceEditRequest||(T.ApplyWorkspaceEditRequest={}))});var YR=d(rc=>{"use strict";Object.defineProperty(rc,"__esModule",{value:!0});rc.createProtocolConnection=void 0;var zR=mi();function JF(t,e,r,n){return zR.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,zR.createMessageConnection)(t,e,r,n)}rc.createProtocolConnection=JF});var XR=d(ur=>{"use strict";var QF=ur&&ur.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),nc=ur&&ur.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&QF(e,t,r)};Object.defineProperty(ur,"__esModule",{value:!0});ur.LSPErrorCodes=ur.createProtocolConnection=void 0;nc(mi(),ur);nc(_o(),ur);nc(at(),ur);nc(VR(),ur);var ZF=YR();Object.defineProperty(ur,"createProtocolConnection",{enumerable:!0,get:function(){return ZF.createProtocolConnection}});var ej;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(ej=ur.LSPErrorCodes||(ur.LSPErrorCodes={}))});var yt=d(Dn=>{"use strict";var tj=Dn&&Dn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),JR=Dn&&Dn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&tj(e,t,r)};Object.defineProperty(Dn,"__esModule",{value:!0});Dn.createProtocolConnection=void 0;var rj=Jh();JR(Jh(),Dn);JR(XR(),Dn);function nj(t,e,r,n){return(0,rj.createMessageConnection)(t,e,r,n)}Dn.createProtocolConnection=nj});var cm=d(Ki=>{"use strict";Object.defineProperty(Ki,"__esModule",{value:!0});Ki.SemanticTokensBuilder=Ki.SemanticTokensDiff=Ki.SemanticTokensFeature=void 0;var ic=yt(),ij=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(ic.SemanticTokensRefreshRequest.type),on:e=>{let r=ic.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=ic.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=ic.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ki.SemanticTokensFeature=ij;var ac=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,a=r-1;for(;i>=n&&a>=n&&this.originalSequence[i]===this.modifiedSequence[a];)i--,a--;(i<n||a<n)&&(i++,a++);let o=i-n+1,s=this.modifiedSequence.slice(n,a+1);return s.length===1&&s[0]===this.originalSequence[i]?[{start:n,deleteCount:o-1}]:[{start:n,deleteCount:o,data:s}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ki.SemanticTokensDiff=ac;var lm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,a){let o=e,s=r;this._dataLen>0&&(o-=this._prevLine,o===0&&(s-=this._prevChar)),this._data[this._dataLen++]=o,this._data[this._dataLen++]=s,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=a,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new ac(this._prevData,this._data).computeDiff()}:this.build()}};Ki.SemanticTokensBuilder=lm});var dm=d(oc=>{"use strict";Object.defineProperty(oc,"__esModule",{value:!0});oc.TextDocuments=void 0;var wa=yt(),fm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new wa.Emitter,this._onDidOpen=new wa.Emitter,this._onDidClose=new wa.Emitter,this._onDidSave=new wa.Emitter,this._onWillSave=new wa.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=wa.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,a=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,a);let o=Object.freeze({document:a});this._onDidOpen.fire(o),this._onDidChangeContent.fire(o)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,a=n.contentChanges;if(a.length===0)return;let{version:o}=i;if(o==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let s=this._syncedDocuments.get(i.uri);s!==void 0&&(s=this._configuration.update(s,a,o),this._syncedDocuments.set(i.uri,s),this._onDidChangeContent.fire(Object.freeze({document:s})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let a=this._syncedDocuments.get(n.textDocument.uri);return a!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:a,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),wa.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};oc.TextDocuments=fm});var hm=d(Eo=>{"use strict";Object.defineProperty(Eo,"__esModule",{value:!0});Eo.NotebookDocuments=Eo.NotebookSyncFeature=void 0;var Lr=yt(),QR=dm(),aj=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Lr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Lr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Lr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Lr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};Eo.NotebookSyncFeature=aj;var Wi=class{onDidOpenTextDocument(e){return this.openHandler=e,Lr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Lr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Lr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return Wi.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return Wi.NULL_DISPOSE}onDidSaveTextDocument(){return Wi.NULL_DISPOSE}};Wi.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var pm=class{constructor(e){e instanceof QR.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new QR.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Lr.Emitter,this._onDidChange=new Lr.Emitter,this._onDidSave=new Lr.Emitter,this._onDidClose=new Lr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Wi,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let a of i.cellTextDocuments)r.openTextDocument({textDocument:a});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a===void 0)return;a.version=i.notebookDocument.version;let o=a.metadata,s=!1,u=i.change;u.metadata!==void 0&&(s=!0,a.metadata=u.metadata);let l=[],c=[],f=[],m=[];if(u.cells!==void 0){let E=u.cells;if(E.structure!==void 0){let b=E.structure.array;if(a.cells.splice(b.start,b.deleteCount,...b.cells!==void 0?b.cells:[]),E.structure.didOpen!==void 0)for(let S of E.structure.didOpen)r.openTextDocument({textDocument:S}),l.push(S.uri);if(E.structure.didClose)for(let S of E.structure.didClose)r.closeTextDocument({textDocument:S}),c.push(S.uri)}if(E.data!==void 0){let b=new Map(E.data.map(S=>[S.document,S]));for(let S=0;S<=a.cells.length;S++){let O=b.get(a.cells[S].document);if(O!==void 0){let F=a.cells.splice(S,1,O);if(f.push({old:F[0],new:O}),b.delete(O.document),b.size===0)break}}}if(E.textContent!==void 0)for(let b of E.textContent)r.changeTextDocument({textDocument:b.document,contentChanges:b.changes}),m.push(b.document.uri)}this.updateCellMap(a);let v={notebookDocument:a};s&&(v.metadata={old:o,new:a.metadata});let y=[];for(let E of l)y.push(this.getNotebookCell(E));let R=[];for(let E of c)R.push(this.getNotebookCell(E));let P=[];for(let E of m)P.push(this.getNotebookCell(E));(y.length>0||R.length>0||f.length>0||P.length>0)&&(v.cells={added:y,removed:R,changed:{data:f,textContent:P}}),(v.metadata!==void 0||v.cells!==void 0)&&this._onDidChange.fire(v)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);a!==void 0&&this._onDidSave.fire(a)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let a=this.notebookDocuments.get(i.notebookDocument.uri);if(a!==void 0){this._onDidClose.fire(a);for(let o of i.cellTextDocuments)r.closeTextDocument({textDocument:o});this.notebookDocuments.delete(i.notebookDocument.uri);for(let o of a.cells)this.notebookCellMap.delete(o.document)}})),Lr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};Eo.NotebookDocuments=pm});var mm=d(gt=>{"use strict";Object.defineProperty(gt,"__esModule",{value:!0});gt.thenable=gt.typedArray=gt.stringArray=gt.array=gt.func=gt.error=gt.number=gt.string=gt.boolean=void 0;function oj(t){return t===!0||t===!1}gt.boolean=oj;function ZR(t){return typeof t=="string"||t instanceof String}gt.string=ZR;function sj(t){return typeof t=="number"||t instanceof Number}gt.number=sj;function uj(t){return t instanceof Error}gt.error=uj;function eA(t){return typeof t=="function"}gt.func=eA;function tA(t){return Array.isArray(t)}gt.array=tA;function lj(t){return tA(t)&&t.every(e=>ZR(e))}gt.stringArray=lj;function cj(t,e){return Array.isArray(t)&&t.every(e)}gt.typedArray=cj;function fj(t){return t&&eA(t.then)}gt.thenable=fj});var ym=d(qr=>{"use strict";Object.defineProperty(qr,"__esModule",{value:!0});qr.generateUuid=qr.parse=qr.isUUID=qr.v4=qr.empty=void 0;var bu=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},ue=class extends bu{constructor(){super([ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-","4",ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._oneOf(ue._timeHighBits),ue._randomHex(),ue._randomHex(),ue._randomHex(),"-",ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex(),ue._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return ue._oneOf(ue._chars)}};ue._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];ue._timeHighBits=["8","9","a","b"];qr.empty=new bu("00000000-0000-0000-0000-000000000000");function rA(){return new ue}qr.v4=rA;var dj=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function nA(t){return dj.test(t)}qr.isUUID=nA;function pj(t){if(!nA(t))throw new Error("invalid uuid");return new bu(t)}qr.parse=pj;function hj(){return rA().asHex()}qr.generateUuid=hj});var iA=d(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.attachPartialResult=Vi.ProgressFeature=Vi.attachWorkDone=void 0;var Bi=yt(),mj=ym(),xn=class{constructor(e,r){this._connection=e,this._token=r,xn.Instances.set(this._token,this)}begin(e,r,n,i){let a={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Bi.WorkDoneProgress.type,this._token,a)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Bi.WorkDoneProgress.type,this._token,n)}done(){xn.Instances.delete(this._token),this._connection.sendProgress(Bi.WorkDoneProgress.type,this._token,{kind:"end"})}};xn.Instances=new Map;var sc=class extends xn{constructor(e,r){super(e,r),this._source=new Bi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Cu=class{constructor(){}begin(){}report(){}done(){}},uc=class extends Cu{constructor(){super(),this._source=new Bi.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function yj(t,e){if(e===void 0||e.workDoneToken===void 0)return new Cu;let r=e.workDoneToken;return delete e.workDoneToken,new xn(t,r)}Vi.attachWorkDone=yj;var gj=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Bi.WorkDoneProgressCancelNotification.type,r=>{let n=xn.Instances.get(r.token);(n instanceof sc||n instanceof uc)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Cu:new xn(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,mj.generateUuid)();return this.connection.sendRequest(Bi.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new sc(this.connection,e))}else return Promise.resolve(new uc)}};Vi.ProgressFeature=gj;var gm;(function(t){t.type=new Bi.ProgressType})(gm||(gm={}));var vm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(gm.type,this._token,e)}};function vj(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new vm(t,r)}Vi.attachPartialResult=vj});var aA=d(lc=>{"use strict";Object.defineProperty(lc,"__esModule",{value:!0});lc.ConfigurationFeature=void 0;var Tj=yt(),_j=mm(),Rj=t=>class extends t{getConfiguration(e){return e?_j.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(Tj.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};lc.ConfigurationFeature=Rj});var oA=d(fc=>{"use strict";Object.defineProperty(fc,"__esModule",{value:!0});fc.WorkspaceFoldersFeature=void 0;var cc=yt(),Aj=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new cc.Emitter,this.connection.onNotification(cc.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(cc.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(cc.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};fc.WorkspaceFoldersFeature=Aj});var sA=d(dc=>{"use strict";Object.defineProperty(dc,"__esModule",{value:!0});dc.CallHierarchyFeature=void 0;var Tm=yt(),Sj=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Tm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Tm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Tm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};dc.CallHierarchyFeature=Sj});var uA=d(pc=>{"use strict";Object.defineProperty(pc,"__esModule",{value:!0});pc.ShowDocumentFeature=void 0;var bj=yt(),Cj=t=>class extends t{showDocument(e){return this.connection.sendRequest(bj.ShowDocumentRequest.type,e)}};pc.ShowDocumentFeature=Cj});var lA=d(hc=>{"use strict";Object.defineProperty(hc,"__esModule",{value:!0});hc.FileOperationsFeature=void 0;var ko=yt(),Pj=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(ko.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(ko.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(ko.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(ko.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(ko.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(ko.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};hc.FileOperationsFeature=Pj});var cA=d(mc=>{"use strict";Object.defineProperty(mc,"__esModule",{value:!0});mc.LinkedEditingRangeFeature=void 0;var Ej=yt(),kj=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(Ej.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};mc.LinkedEditingRangeFeature=kj});var fA=d(yc=>{"use strict";Object.defineProperty(yc,"__esModule",{value:!0});yc.TypeHierarchyFeature=void 0;var _m=yt(),Nj=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(_m.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=_m.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=_m.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};yc.TypeHierarchyFeature=Nj});var pA=d(gc=>{"use strict";Object.defineProperty(gc,"__esModule",{value:!0});gc.InlineValueFeature=void 0;var dA=yt(),wj=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(dA.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(dA.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};gc.InlineValueFeature=wj});var hA=d(vc=>{"use strict";Object.defineProperty(vc,"__esModule",{value:!0});vc.InlayHintFeature=void 0;var Rm=yt(),$j=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Rm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Rm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Rm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};vc.InlayHintFeature=$j});var mA=d(Tc=>{"use strict";Object.defineProperty(Tc,"__esModule",{value:!0});Tc.DiagnosticFeature=void 0;var Pu=yt(),Oj=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Pu.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Pu.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Pu.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Pu.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Pu.WorkspaceDiagnosticRequest.partialResult,r)))}}};Tc.DiagnosticFeature=Oj});var yA=d(_c=>{"use strict";Object.defineProperty(_c,"__esModule",{value:!0});_c.MonikerFeature=void 0;var Ij=yt(),Dj=t=>class extends t{get moniker(){return{on:e=>{let r=Ij.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};_c.MonikerFeature=Dj});var NA=d(ve=>{"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.createConnection=ve.combineFeatures=ve.combineNotebooksFeatures=ve.combineLanguagesFeatures=ve.combineWorkspaceFeatures=ve.combineWindowFeatures=ve.combineClientFeatures=ve.combineTracerFeatures=ve.combineTelemetryFeatures=ve.combineConsoleFeatures=ve._NotebooksImpl=ve._LanguagesImpl=ve.BulkUnregistration=ve.BulkRegistration=ve.ErrorMessageTracker=void 0;var H=yt(),Mr=mm(),Sm=ym(),ie=iA(),xj=aA(),Lj=oA(),qj=sA(),Mj=cm(),Fj=uA(),jj=lA(),Gj=cA(),Uj=fA(),Hj=pA(),Kj=hA(),Wj=mA(),Bj=hm(),Vj=yA();function Am(t){if(t!==null)return t}var bm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ve.ErrorMessageTracker=bm;var Rc=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(H.MessageType.Error,e)}warn(e){this.send(H.MessageType.Warning,e)}info(e){this.send(H.MessageType.Info,e)}log(e){this.send(H.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(H.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,H.RAL)().console.error("Sending log message failed")})}},Cm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:H.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Am)}showWarningMessage(e,...r){let n={type:H.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Am)}showInformationMessage(e,...r){let n={type:H.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(H.ShowMessageRequest.type,n).then(Am)}},gA=(0,Fj.ShowDocumentFeature)((0,ie.ProgressFeature)(Cm)),zj;(function(t){function e(){return new Ac}t.create=e})(zj=ve.BulkRegistration||(ve.BulkRegistration={}));var Ac=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Mr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Sm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},Yj;(function(t){function e(){return new Eu(void 0,[])}t.create=e})(Yj=ve.BulkUnregistration||(ve.BulkUnregistration={}));var Eu=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(H.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Mr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(H.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},a=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Sc=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Ac?this.registerMany(e):e instanceof Eu?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Mr.string(r)?r:r.method,a=Sm.generateUuid(),o={registrations:[{id:a,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(H.RegistrationRequest.type,o).then(s=>(e.add({id:a,method:i}),e),s=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(s)))}registerSingle2(e,r){let n=Mr.string(e)?e:e.method,i=Sm.generateUuid(),a={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(H.RegistrationRequest.type,a).then(o=>H.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),o=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(o)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(H.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(H.RegistrationRequest.type,r).then(()=>new Eu(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Pm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(H.ApplyWorkspaceEditRequest.type,n)}},vA=(0,jj.FileOperationsFeature)((0,Lj.WorkspaceFoldersFeature)((0,xj.ConfigurationFeature)(Pm))),bc=class{constructor(){this._trace=H.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==H.Trace.Off&&this.connection.sendNotification(H.LogTraceNotification.type,{message:e,verbose:this._trace===H.Trace.Verbose?r:void 0}).catch(()=>{})}},Cc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(H.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Pc=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._LanguagesImpl=Pc;var TA=(0,Vj.MonikerFeature)((0,Wj.DiagnosticFeature)((0,Kj.InlayHintFeature)((0,Hj.InlineValueFeature)((0,Uj.TypeHierarchyFeature)((0,Gj.LinkedEditingRangeFeature)((0,Mj.SemanticTokensFeature)((0,qj.CallHierarchyFeature)(Pc)))))))),Ec=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,ie.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,ie.attachPartialResult)(this.connection,r)}};ve._NotebooksImpl=Ec;var _A=(0,Bj.NotebookSyncFeature)(Ec);function RA(t,e){return function(r){return e(t(r))}}ve.combineConsoleFeatures=RA;function AA(t,e){return function(r){return e(t(r))}}ve.combineTelemetryFeatures=AA;function SA(t,e){return function(r){return e(t(r))}}ve.combineTracerFeatures=SA;function bA(t,e){return function(r){return e(t(r))}}ve.combineClientFeatures=bA;function CA(t,e){return function(r){return e(t(r))}}ve.combineWindowFeatures=CA;function PA(t,e){return function(r){return e(t(r))}}ve.combineWorkspaceFeatures=PA;function EA(t,e){return function(r){return e(t(r))}}ve.combineLanguagesFeatures=EA;function kA(t,e){return function(r){return e(t(r))}}ve.combineNotebooksFeatures=kA;function Xj(t,e){function r(i,a,o){return i&&a?o(i,a):i||a}return{__brand:"features",console:r(t.console,e.console,RA),tracer:r(t.tracer,e.tracer,SA),telemetry:r(t.telemetry,e.telemetry,AA),client:r(t.client,e.client,bA),window:r(t.window,e.window,CA),workspace:r(t.workspace,e.workspace,PA),languages:r(t.languages,e.languages,EA),notebooks:r(t.notebooks,e.notebooks,kA)}}ve.combineFeatures=Xj;function Jj(t,e,r){let n=r&&r.console?new(r.console(Rc)):new Rc,i=t(n);n.rawAttach(i);let a=r&&r.tracer?new(r.tracer(bc)):new bc,o=r&&r.telemetry?new(r.telemetry(Cc)):new Cc,s=r&&r.client?new(r.client(Sc)):new Sc,u=r&&r.window?new(r.window(gA)):new gA,l=r&&r.workspace?new(r.workspace(vA)):new vA,c=r&&r.languages?new(r.languages(TA)):new TA,f=r&&r.notebooks?new(r.notebooks(_A)):new _A,m=[n,a,o,s,u,l,c,f];function v(b){return b instanceof Promise?b:Mr.thenable(b)?new Promise((S,O)=>{b.then(F=>S(F),F=>O(F))}):Promise.resolve(b)}let y,R,P,E={listen:()=>i.listen(),sendRequest:(b,...S)=>i.sendRequest(Mr.string(b)?b:b.method,...S),onRequest:(b,S)=>i.onRequest(b,S),sendNotification:(b,S)=>{let O=Mr.string(b)?b:b.method;return arguments.length===1?i.sendNotification(O):i.sendNotification(O,S)},onNotification:(b,S)=>i.onNotification(b,S),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:b=>(R=b,{dispose:()=>{R=void 0}}),onInitialized:b=>i.onNotification(H.InitializedNotification.type,b),onShutdown:b=>(y=b,{dispose:()=>{y=void 0}}),onExit:b=>(P=b,{dispose:()=>{P=void 0}}),get console(){return n},get telemetry(){return o},get tracer(){return a},get client(){return s},get window(){return u},get workspace(){return l},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:b=>i.onNotification(H.DidChangeConfigurationNotification.type,b),onDidChangeWatchedFiles:b=>i.onNotification(H.DidChangeWatchedFilesNotification.type,b),__textDocumentSync:void 0,onDidOpenTextDocument:b=>i.onNotification(H.DidOpenTextDocumentNotification.type,b),onDidChangeTextDocument:b=>i.onNotification(H.DidChangeTextDocumentNotification.type,b),onDidCloseTextDocument:b=>i.onNotification(H.DidCloseTextDocumentNotification.type,b),onWillSaveTextDocument:b=>i.onNotification(H.WillSaveTextDocumentNotification.type,b),onWillSaveTextDocumentWaitUntil:b=>i.onRequest(H.WillSaveTextDocumentWaitUntilRequest.type,b),onDidSaveTextDocument:b=>i.onNotification(H.DidSaveTextDocumentNotification.type,b),sendDiagnostics:b=>i.sendNotification(H.PublishDiagnosticsNotification.type,b),onHover:b=>i.onRequest(H.HoverRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onCompletion:b=>i.onRequest(H.CompletionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCompletionResolve:b=>i.onRequest(H.CompletionResolveRequest.type,b),onSignatureHelp:b=>i.onRequest(H.SignatureHelpRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDeclaration:b=>i.onRequest(H.DeclarationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDefinition:b=>i.onRequest(H.DefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onTypeDefinition:b=>i.onRequest(H.TypeDefinitionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onImplementation:b=>i.onRequest(H.ImplementationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onReferences:b=>i.onRequest(H.ReferencesRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentHighlight:b=>i.onRequest(H.DocumentHighlightRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentSymbol:b=>i.onRequest(H.DocumentSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbol:b=>i.onRequest(H.WorkspaceSymbolRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onWorkspaceSymbolResolve:b=>i.onRequest(H.WorkspaceSymbolResolveRequest.type,b),onCodeAction:b=>i.onRequest(H.CodeActionRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeActionResolve:b=>i.onRequest(H.CodeActionResolveRequest.type,(S,O)=>b(S,O)),onCodeLens:b=>i.onRequest(H.CodeLensRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onCodeLensResolve:b=>i.onRequest(H.CodeLensResolveRequest.type,(S,O)=>b(S,O)),onDocumentFormatting:b=>i.onRequest(H.DocumentFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentRangeFormatting:b=>i.onRequest(H.DocumentRangeFormattingRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onDocumentOnTypeFormatting:b=>i.onRequest(H.DocumentOnTypeFormattingRequest.type,(S,O)=>b(S,O)),onRenameRequest:b=>i.onRequest(H.RenameRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),onPrepareRename:b=>i.onRequest(H.PrepareRenameRequest.type,(S,O)=>b(S,O)),onDocumentLinks:b=>i.onRequest(H.DocumentLinkRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onDocumentLinkResolve:b=>i.onRequest(H.DocumentLinkResolveRequest.type,(S,O)=>b(S,O)),onDocumentColor:b=>i.onRequest(H.DocumentColorRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onColorPresentation:b=>i.onRequest(H.ColorPresentationRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onFoldingRanges:b=>i.onRequest(H.FoldingRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onSelectionRanges:b=>i.onRequest(H.SelectionRangeRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),(0,ie.attachPartialResult)(i,S))),onExecuteCommand:b=>i.onRequest(H.ExecuteCommandRequest.type,(S,O)=>b(S,O,(0,ie.attachWorkDone)(i,S),void 0)),dispose:()=>i.dispose()};for(let b of m)b.attach(E);return i.onRequest(H.InitializeRequest.type,b=>{e.initialize(b),Mr.string(b.trace)&&(a.trace=H.Trace.fromString(b.trace));for(let S of m)S.initialize(b.capabilities);if(R){let S=R(b,new H.CancellationTokenSource().token,(0,ie.attachWorkDone)(i,b),void 0);return v(S).then(O=>{if(O instanceof H.ResponseError)return O;let F=O;F||(F={capabilities:{}});let W=F.capabilities;W||(W={},F.capabilities=W),W.textDocumentSync===void 0||W.textDocumentSync===null?W.textDocumentSync=Mr.number(E.__textDocumentSync)?E.__textDocumentSync:H.TextDocumentSyncKind.None:!Mr.number(W.textDocumentSync)&&!Mr.number(W.textDocumentSync.change)&&(W.textDocumentSync.change=Mr.number(E.__textDocumentSync)?E.__textDocumentSync:H.TextDocumentSyncKind.None);for(let re of m)re.fillServerCapabilities(W);return F})}else{let S={capabilities:{textDocumentSync:H.TextDocumentSyncKind.None}};for(let O of m)O.fillServerCapabilities(S.capabilities);return S}}),i.onRequest(H.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,y)return y(new H.CancellationTokenSource().token)}),i.onNotification(H.ExitNotification.type,()=>{try{P&&P()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(H.SetTraceNotification.type,b=>{a.trace=H.Trace.fromString(b.value)}),E}ve.createConnection=Jj});var Em=d(Kt=>{"use strict";var Qj=Kt&&Kt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),wA=Kt&&Kt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Qj(e,t,r)};Object.defineProperty(Kt,"__esModule",{value:!0});Kt.ProposedFeatures=Kt.NotebookDocuments=Kt.TextDocuments=Kt.SemanticTokensBuilder=void 0;var Zj=cm();Object.defineProperty(Kt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return Zj.SemanticTokensBuilder}});wA(yt(),Kt);var eG=dm();Object.defineProperty(Kt,"TextDocuments",{enumerable:!0,get:function(){return eG.TextDocuments}});var tG=hm();Object.defineProperty(Kt,"NotebookDocuments",{enumerable:!0,get:function(){return tG.NotebookDocuments}});wA(NA(),Kt);var rG;(function(t){t.all={__brand:"features"}})(rG=Kt.ProposedFeatures||(Kt.ProposedFeatures={}))});var OA=d((lde,$A)=>{"use strict";$A.exports=yt()});var qe=d(Ln=>{"use strict";var nG=Ln&&Ln.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),DA=Ln&&Ln.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&nG(e,t,r)};Object.defineProperty(Ln,"__esModule",{value:!0});Ln.createConnection=void 0;var kc=Em();DA(OA(),Ln);DA(Em(),Ln);var IA=!1,iG={initialize:t=>{},get shutdownReceived(){return IA},set shutdownReceived(t){IA=t},exit:t=>{}};function aG(t,e,r,n){let i,a,o,s;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),kc.ConnectionStrategy.is(t)||kc.ConnectionOptions.is(t)?s=t:(a=t,o=e,s=r);let u=l=>(0,kc.createProtocolConnection)(a,o,l,s);return(0,kc.createConnection)(u,iG,i)}Ln.createConnection=aG});var km=d((wc,Nc)=>{var oG=wc&&wc.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))};(function(t){if(typeof Nc=="object"&&typeof Nc.exports=="object"){var e=t(Gl,wc);e!==void 0&&(Nc.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=void 0;var r=function(){function u(l,c,f,m){this._uri=l,this._languageId=c,this._version=f,this._content=m,this._lineOffsets=void 0}return Object.defineProperty(u.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),u.prototype.getText=function(l){if(l){var c=this.offsetAt(l.start),f=this.offsetAt(l.end);return this._content.substring(c,f)}return this._content},u.prototype.update=function(l,c){for(var f=0,m=l;f<m.length;f++){var v=m[f];if(u.isIncremental(v)){var y=o(v.range),R=this.offsetAt(y.start),P=this.offsetAt(y.end);this._content=this._content.substring(0,R)+v.text+this._content.substring(P,this._content.length);var E=Math.max(y.start.line,0),b=Math.max(y.end.line,0),S=this._lineOffsets,O=a(v.text,!1,R);if(b-E===O.length)for(var F=0,W=O.length;F<W;F++)S[F+E+1]=O[F];else O.length<1e4?S.splice.apply(S,oG([E+1,b-E],O,!1)):this._lineOffsets=S=S.slice(0,E+1).concat(O,S.slice(b+1));var re=v.text.length-(P-R);if(re!==0)for(var F=E+1+O.length,W=S.length;F<W;F++)S[F]=S[F]+re}else if(u.isFull(v))this._content=v.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received")}this._version=c},u.prototype.getLineOffsets=function(){return this._lineOffsets===void 0&&(this._lineOffsets=a(this._content,!0)),this._lineOffsets},u.prototype.positionAt=function(l){l=Math.max(Math.min(l,this._content.length),0);var c=this.getLineOffsets(),f=0,m=c.length;if(m===0)return{line:0,character:l};for(;f<m;){var v=Math.floor((f+m)/2);c[v]>l?m=v:f=v+1}var y=f-1;return{line:y,character:l-c[y]}},u.prototype.offsetAt=function(l){var c=this.getLineOffsets();if(l.line>=c.length)return this._content.length;if(l.line<0)return 0;var f=c[l.line],m=l.line+1<c.length?c[l.line+1]:this._content.length;return Math.max(Math.min(f+l.character,m),f)},Object.defineProperty(u.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),u.isIncremental=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range!==void 0&&(c.rangeLength===void 0||typeof c.rangeLength=="number")},u.isFull=function(l){var c=l;return c!=null&&typeof c.text=="string"&&c.range===void 0&&c.rangeLength===void 0},u}(),n;(function(u){function l(m,v,y,R){return new r(m,v,y,R)}u.create=l;function c(m,v,y){if(m instanceof r)return m.update(v,y),m;throw new Error("TextDocument.update: document must be created by TextDocument.create")}u.update=c;function f(m,v){for(var y=m.getText(),R=i(v.map(s),function(W,re){var Ne=W.range.start.line-re.range.start.line;return Ne===0?W.range.start.character-re.range.start.character:Ne}),P=0,E=[],b=0,S=R;b<S.length;b++){var O=S[b],F=m.offsetAt(O.range.start);if(F<P)throw new Error("Overlapping edit");F>P&&E.push(y.substring(P,F)),O.newText.length&&E.push(O.newText),P=m.offsetAt(O.range.end)}return E.push(y.substr(P)),E.join("")}u.applyEdits=f})(n=e.TextDocument||(e.TextDocument={}));function i(u,l){if(u.length<=1)return u;var c=u.length/2|0,f=u.slice(0,c),m=u.slice(c);i(f,l),i(m,l);for(var v=0,y=0,R=0;v<f.length&&y<m.length;){var P=l(f[v],m[y]);P<=0?u[R++]=f[v++]:u[R++]=m[y++]}for(;v<f.length;)u[R++]=f[v++];for(;y<m.length;)u[R++]=m[y++];return u}function a(u,l,c){c===void 0&&(c=0);for(var f=l?[c]:[],m=0;m<u.length;m++){var v=u.charCodeAt(m);(v===13||v===10)&&(v===13&&m+1<u.length&&u.charCodeAt(m+1)===10&&m++,f.push(c+m+1))}return f}function o(u){var l=u.start,c=u.end;return l.line>c.line||l.line===c.line&&l.character>c.character?{start:c,end:l}:u}function s(u){var l=o(u.range);return l!==u.range?{newText:u.newText,range:l}:u}})});var hr=d(It=>{"use strict";Object.defineProperty(It,"__esModule",{value:!0});It.isRootCstNode=It.isLeafCstNode=It.isCompositeCstNode=It.AbstractAstReflection=It.isLinkingError=It.isAstNodeDescription=It.isReference=It.isAstNode=void 0;function wm(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}It.isAstNode=wm;function xA(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}It.isReference=xA;function sG(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}It.isAstNodeDescription=sG;function uG(t){return typeof t=="object"&&t!==null&&wm(t.container)&&xA(t.reference)&&typeof t.message=="string"}It.isLinkingError=uG;var Nm=class{constructor(){this.subtypes={}}isInstance(e,r){return wm(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let a=this.computeIsSubtype(e,r);return n[r]=a,a}}};It.AbstractAstReflection=Nm;function LA(t){return typeof t=="object"&&t!==null&&"children"in t}It.isCompositeCstNode=LA;function lG(t){return typeof t=="object"&&t!==null&&"tokenType"in t}It.isLeafCstNode=lG;function cG(t){return LA(t)&&"fullText"in t}It.isRootCstNode=cG});var Dt=d(He=>{"use strict";Object.defineProperty(He,"__esModule",{value:!0});He.Reduction=He.TreeStreamImpl=He.stream=He.DONE_RESULT=He.EMPTY_STREAM=He.StreamImpl=void 0;var Wt=class{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){let e=this.iterator();return Boolean(e.next().done)}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new Wt(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return He.DONE_RESULT})}join(e=","){let r=this.iterator(),n="",i,a=!1;do i=r.next(),i.done||(a&&(n+=e),n+=fG(i.value)),a=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,a=n.next();for(;!a.done;){if(i>=r&&a.value===e)return i;a=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new Wt(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?He.DONE_RESULT:{done:!1,value:e(i)}})}filter(e){return new Wt(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return He.DONE_RESULT})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,a=n.next();for(;!a.done;)i===void 0?i=a.value:i=e(i,a.value),a=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let a=this.recursiveReduce(e,r,n);return a===void 0?i.value:r(a,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new Wt(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let a=r.iterator.next();if(a.done)r.iterator=void 0;else return a}let{done:n,value:i}=this.nextFn(r.this);if(!n){let a=e(i);if($c(a))r.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}}while(r.iterator);return He.DONE_RESULT})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new Wt(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let o=n.iterator.next();if(o.done)n.iterator=void 0;else return o}let{done:i,value:a}=r.nextFn(n.this);if(!i)if($c(a))n.iterator=a[Symbol.iterator]();else return{done:!1,value:a}}while(n.iterator);return He.DONE_RESULT})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new Wt(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new Wt(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?He.DONE_RESULT:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let a=r?r(i):i;n.add(a)}return this.filter(i=>{let a=r?r(i):i;return!n.has(a)})}};He.StreamImpl=Wt;function fG(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function $c(t){return!!t&&typeof t[Symbol.iterator]=="function"}He.EMPTY_STREAM=new Wt(()=>{},()=>He.DONE_RESULT);He.DONE_RESULT=Object.freeze({done:!0,value:void 0});function dG(...t){if(t.length===1){let e=t[0];if(e instanceof Wt)return e;if($c(e))return new Wt(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Wt(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:He.DONE_RESULT)}return t.length>1?new Wt(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];$c(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return He.DONE_RESULT}):He.EMPTY_STREAM}He.stream=dG;var $m=class extends Wt{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let o=i.iterators[i.iterators.length-1].next();if(o.done)i.iterators.pop();else return i.iterators.push(r(o.value)[Symbol.iterator]()),o}return He.DONE_RESULT})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}};He.TreeStreamImpl=$m;var pG;(function(t){function e(a){return a.reduce((o,s)=>o+s,0)}t.sum=e;function r(a){return a.reduce((o,s)=>o*s,0)}t.product=r;function n(a){return a.reduce((o,s)=>Math.min(o,s))}t.min=n;function i(a){return a.reduce((o,s)=>Math.max(o,s))}t.max=i})(pG=He.Reduction||(He.Reduction={}))});var Qe=d(Pe=>{"use strict";Object.defineProperty(Pe,"__esModule",{value:!0});Pe.getInteriorNodes=Pe.getStartlineNode=Pe.getNextNode=Pe.getPreviousNode=Pe.findLeafNodeAtOffset=Pe.isCommentNode=Pe.findCommentNode=Pe.findDeclarationNodeAtOffset=Pe.DefaultNameRegexp=Pe.toDocumentSegment=Pe.tokenToRange=Pe.isCstChildNode=Pe.flattenCst=Pe.streamCst=void 0;var No=hr(),hG=Dt();function MA(t){return new hG.TreeStreamImpl(t,e=>(0,No.isCompositeCstNode)(e)?e.children:[],{includeRoot:!0})}Pe.streamCst=MA;function mG(t){return MA(t).filter(No.isLeafCstNode)}Pe.flattenCst=mG;function yG(t,e){for(;t.parent;)if(t=t.parent,t===e)return!0;return!1}Pe.isCstChildNode=yG;function gG(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}Pe.tokenToRange=gG;function vG(t){let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}Pe.toDocumentSegment=vG;Pe.DefaultNameRegexp=/^[\w\p{L}]$/u;function TG(t,e,r=Pe.DefaultNameRegexp){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Im(t,e)}}Pe.findDeclarationNodeAtOffset=TG;function _G(t,e){if(t){let r=FA(t,!0);if(r&&Om(r,e))return r;if((0,No.isRootCstNode)(t)){let n=t.children.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let a=t.children[i];if(Om(a,e))return a}}}}Pe.findCommentNode=_G;function Om(t,e){return(0,No.isLeafCstNode)(t)&&e.includes(t.tokenType.name)}Pe.isCommentNode=Om;function Im(t,e){if((0,No.isLeafCstNode)(t))return t;if((0,No.isCompositeCstNode)(t)){let r=0,n=t.children.length-1;for(;r<=n;){let i=Math.floor((r+n)/2),a=t.children[i];if(a.offset>e)n=i-1;else if(a.end<=e)r=i+1;else return Im(a,e)}}}Pe.findLeafNodeAtOffset=Im;function FA(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(n===0)t=r;else{n--;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getPreviousNode=FA;function RG(t,e=!0){for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);if(r.children.length-1===n)t=r;else{n++;let i=r.children[n];if(e||!i.hidden)return i}}}Pe.getNextNode=RG;function AG(t){if(t.range.start.character===0)return t;let e=t.range.start.line,r=t,n;for(;t.parent;){let i=t.parent,a=n??i.children.indexOf(t);if(a===0?(t=i,n=void 0):(n=a-1,t=i.children[n]),t.range.start.line!==e)break;r=t}return r}Pe.getStartlineNode=AG;function SG(t,e){let r=bG(t,e);return r?r.parent.children.slice(r.a+1,r.b):[]}Pe.getInteriorNodes=SG;function bG(t,e){let r=qA(t),n=qA(e),i;for(let a=0;a<r.length&&a<n.length;a++){let o=r[a],s=n[a];if(o.parent===s.parent)i={parent:o.parent,a:o.index,b:s.index};else break}return i}function qA(t){let e=[];for(;t.parent;){let r=t.parent,n=r.children.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}});var qn=d((ku,Dm)=>{(function(t,e){if(typeof ku=="object"&&typeof Dm=="object")Dm.exports=e();else if(typeof define=="function"&&define.amd)define([],e);else{var r=e();for(var n in r)(typeof ku=="object"?ku:t)[n]=r[n]}})(ku,()=>(()=>{"use strict";var t={470:i=>{function a(u){if(typeof u!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(u))}function o(u,l){for(var c,f="",m=0,v=-1,y=0,R=0;R<=u.length;++R){if(R<u.length)c=u.charCodeAt(R);else{if(c===47)break;c=47}if(c===47){if(!(v===R-1||y===1))if(v!==R-1&&y===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var P=f.lastIndexOf("/");if(P!==f.length-1){P===-1?(f="",m=0):m=(f=f.slice(0,P)).length-1-f.lastIndexOf("/"),v=R,y=0;continue}}else if(f.length===2||f.length===1){f="",m=0,v=R,y=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+u.slice(v+1,R):f=u.slice(v+1,R),m=R-v-1;v=R,y=0}else c===46&&y!==-1?++y:y=-1}return f}var s={resolve:function(){for(var u,l="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(u===void 0&&(u=process.cwd()),m=u),a(m),m.length!==0&&(l=m+"/"+l,c=m.charCodeAt(0)===47)}return l=o(l,!c),c?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(u){if(a(u),u.length===0)return".";var l=u.charCodeAt(0)===47,c=u.charCodeAt(u.length-1)===47;return(u=o(u,!l)).length!==0||l||(u="."),u.length>0&&c&&(u+="/"),l?"/"+u:u},isAbsolute:function(u){return a(u),u.length>0&&u.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var u,l=0;l<arguments.length;++l){var c=arguments[l];a(c),c.length>0&&(u===void 0?u=c:u+="/"+c)}return u===void 0?".":s.normalize(u)},relative:function(u,l){if(a(u),a(l),u===l||(u=s.resolve(u))===(l=s.resolve(l)))return"";for(var c=1;c<u.length&&u.charCodeAt(c)===47;++c);for(var f=u.length,m=f-c,v=1;v<l.length&&l.charCodeAt(v)===47;++v);for(var y=l.length-v,R=m<y?m:y,P=-1,E=0;E<=R;++E){if(E===R){if(y>R){if(l.charCodeAt(v+E)===47)return l.slice(v+E+1);if(E===0)return l.slice(v+E)}else m>R&&(u.charCodeAt(c+E)===47?P=E:E===0&&(P=0));break}var b=u.charCodeAt(c+E);if(b!==l.charCodeAt(v+E))break;b===47&&(P=E)}var S="";for(E=c+P+1;E<=f;++E)E!==f&&u.charCodeAt(E)!==47||(S.length===0?S+="..":S+="/..");return S.length>0?S+l.slice(v+P):(v+=P,l.charCodeAt(v)===47&&++v,l.slice(v))},_makeLong:function(u){return u},dirname:function(u){if(a(u),u.length===0)return".";for(var l=u.charCodeAt(0),c=l===47,f=-1,m=!0,v=u.length-1;v>=1;--v)if((l=u.charCodeAt(v))===47){if(!m){f=v;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":u.slice(0,f)},basename:function(u,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');a(u);var c,f=0,m=-1,v=!0;if(l!==void 0&&l.length>0&&l.length<=u.length){if(l.length===u.length&&l===u)return"";var y=l.length-1,R=-1;for(c=u.length-1;c>=0;--c){var P=u.charCodeAt(c);if(P===47){if(!v){f=c+1;break}}else R===-1&&(v=!1,R=c+1),y>=0&&(P===l.charCodeAt(y)?--y==-1&&(m=c):(y=-1,m=R))}return f===m?m=R:m===-1&&(m=u.length),u.slice(f,m)}for(c=u.length-1;c>=0;--c)if(u.charCodeAt(c)===47){if(!v){f=c+1;break}}else m===-1&&(v=!1,m=c+1);return m===-1?"":u.slice(f,m)},extname:function(u){a(u);for(var l=-1,c=0,f=-1,m=!0,v=0,y=u.length-1;y>=0;--y){var R=u.charCodeAt(y);if(R!==47)f===-1&&(m=!1,f=y+1),R===46?l===-1?l=y:v!==1&&(v=1):l!==-1&&(v=-1);else if(!m){c=y+1;break}}return l===-1||f===-1||v===0||v===1&&l===f-1&&l===c+1?"":u.slice(l,f)},format:function(u){if(u===null||typeof u!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof u);return function(l,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,u)},parse:function(u){a(u);var l={root:"",dir:"",base:"",ext:"",name:""};if(u.length===0)return l;var c,f=u.charCodeAt(0),m=f===47;m?(l.root="/",c=1):c=0;for(var v=-1,y=0,R=-1,P=!0,E=u.length-1,b=0;E>=c;--E)if((f=u.charCodeAt(E))!==47)R===-1&&(P=!1,R=E+1),f===46?v===-1?v=E:b!==1&&(b=1):v!==-1&&(b=-1);else if(!P){y=E+1;break}return v===-1||R===-1||b===0||b===1&&v===R-1&&v===y+1?R!==-1&&(l.base=l.name=y===0&&m?u.slice(1,R):u.slice(y,R)):(y===0&&m?(l.name=u.slice(1,v),l.base=u.slice(1,R)):(l.name=u.slice(y,v),l.base=u.slice(y,R)),l.ext=u.slice(v,R)),y>0?l.dir=u.slice(0,y-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,i.exports=s},674:(i,a)=>{if(Object.defineProperty(a,"__esModule",{value:!0}),a.isWindows=void 0,typeof process=="object")a.isWindows=process.platform==="win32";else if(typeof navigator=="object"){var o=navigator.userAgent;a.isWindows=o.indexOf("Windows")>=0}},796:function(i,a,o){var s,u,l=this&&this.__extends||(s=function(q,L){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(j,B){j.__proto__=B}||function(j,B){for(var oe in B)Object.prototype.hasOwnProperty.call(B,oe)&&(j[oe]=B[oe])},s(q,L)},function(q,L){if(typeof L!="function"&&L!==null)throw new TypeError("Class extends value "+String(L)+" is not a constructor or null");function j(){this.constructor=q}s(q,L),q.prototype=L===null?Object.create(L):(j.prototype=L.prototype,new j)});Object.defineProperty(a,"__esModule",{value:!0}),a.uriToFsPath=a.URI=void 0;var c=o(674),f=/^\w[\w\d+.-]*$/,m=/^\//,v=/^\/\//;function y(q,L){if(!q.scheme&&L)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(q.authority,'", path: "').concat(q.path,'", query: "').concat(q.query,'", fragment: "').concat(q.fragment,'"}'));if(q.scheme&&!f.test(q.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(q.path){if(q.authority){if(!m.test(q.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(v.test(q.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}var R="",P="/",E=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,b=function(){function q(L,j,B,oe,se,ee){ee===void 0&&(ee=!1),typeof L=="object"?(this.scheme=L.scheme||R,this.authority=L.authority||R,this.path=L.path||R,this.query=L.query||R,this.fragment=L.fragment||R):(this.scheme=function(st,Xe){return st||Xe?st:"file"}(L,ee),this.authority=j||R,this.path=function(st,Xe){switch(st){case"https":case"http":case"file":Xe?Xe[0]!==P&&(Xe=P+Xe):Xe=P}return Xe}(this.scheme,B||R),this.query=oe||R,this.fragment=se||R,y(this,ee))}return q.isUri=function(L){return L instanceof q||!!L&&typeof L.authority=="string"&&typeof L.fragment=="string"&&typeof L.path=="string"&&typeof L.query=="string"&&typeof L.scheme=="string"&&typeof L.fsPath=="string"&&typeof L.with=="function"&&typeof L.toString=="function"},Object.defineProperty(q.prototype,"fsPath",{get:function(){return Ne(this,!1)},enumerable:!1,configurable:!0}),q.prototype.with=function(L){if(!L)return this;var j=L.scheme,B=L.authority,oe=L.path,se=L.query,ee=L.fragment;return j===void 0?j=this.scheme:j===null&&(j=R),B===void 0?B=this.authority:B===null&&(B=R),oe===void 0?oe=this.path:oe===null&&(oe=R),se===void 0?se=this.query:se===null&&(se=R),ee===void 0?ee=this.fragment:ee===null&&(ee=R),j===this.scheme&&B===this.authority&&oe===this.path&&se===this.query&&ee===this.fragment?this:new O(j,B,oe,se,ee)},q.parse=function(L,j){j===void 0&&(j=!1);var B=E.exec(L);return B?new O(B[2]||R,We(B[4]||R),We(B[5]||R),We(B[7]||R),We(B[9]||R),j):new O(R,R,R,R,R)},q.file=function(L){var j=R;if(c.isWindows&&(L=L.replace(/\\/g,P)),L[0]===P&&L[1]===P){var B=L.indexOf(P,2);B===-1?(j=L.substring(2),L=P):(j=L.substring(2,B),L=L.substring(B)||P)}return new O("file",j,L,R,R)},q.from=function(L){var j=new O(L.scheme,L.authority,L.path,L.query,L.fragment);return y(j,!0),j},q.prototype.toString=function(L){return L===void 0&&(L=!1),V(this,L)},q.prototype.toJSON=function(){return this},q.revive=function(L){if(L){if(L instanceof q)return L;var j=new O(L);return j._formatted=L.external,j._fsPath=L._sep===S?L.fsPath:null,j}return L},q}();a.URI=b;var S=c.isWindows?1:void 0,O=function(q){function L(){var j=q!==null&&q.apply(this,arguments)||this;return j._formatted=null,j._fsPath=null,j}return l(L,q),Object.defineProperty(L.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=Ne(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),L.prototype.toString=function(j){return j===void 0&&(j=!1),j?V(this,!0):(this._formatted||(this._formatted=V(this,!1)),this._formatted)},L.prototype.toJSON=function(){var j={$mid:1};return this._fsPath&&(j.fsPath=this._fsPath,j._sep=S),this._formatted&&(j.external=this._formatted),this.path&&(j.path=this.path),this.scheme&&(j.scheme=this.scheme),this.authority&&(j.authority=this.authority),this.query&&(j.query=this.query),this.fragment&&(j.fragment=this.fragment),j},L}(b),F=((u={})[58]="%3A",u[47]="%2F",u[63]="%3F",u[35]="%23",u[91]="%5B",u[93]="%5D",u[64]="%40",u[33]="%21",u[36]="%24",u[38]="%26",u[39]="%27",u[40]="%28",u[41]="%29",u[42]="%2A",u[43]="%2B",u[44]="%2C",u[59]="%3B",u[61]="%3D",u[32]="%20",u);function W(q,L,j){for(var B=void 0,oe=-1,se=0;se<q.length;se++){var ee=q.charCodeAt(se);if(ee>=97&&ee<=122||ee>=65&&ee<=90||ee>=48&&ee<=57||ee===45||ee===46||ee===95||ee===126||L&&ee===47||j&&ee===91||j&&ee===93||j&&ee===58)oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B!==void 0&&(B+=q.charAt(se));else{B===void 0&&(B=q.substr(0,se));var st=F[ee];st!==void 0?(oe!==-1&&(B+=encodeURIComponent(q.substring(oe,se)),oe=-1),B+=st):oe===-1&&(oe=se)}}return oe!==-1&&(B+=encodeURIComponent(q.substring(oe))),B!==void 0?B:q}function re(q){for(var L=void 0,j=0;j<q.length;j++){var B=q.charCodeAt(j);B===35||B===63?(L===void 0&&(L=q.substr(0,j)),L+=F[B]):L!==void 0&&(L+=q[j])}return L!==void 0?L:q}function Ne(q,L){var j;return j=q.authority&&q.path.length>1&&q.scheme==="file"?"//".concat(q.authority).concat(q.path):q.path.charCodeAt(0)===47&&(q.path.charCodeAt(1)>=65&&q.path.charCodeAt(1)<=90||q.path.charCodeAt(1)>=97&&q.path.charCodeAt(1)<=122)&&q.path.charCodeAt(2)===58?L?q.path.substr(1):q.path[1].toLowerCase()+q.path.substr(2):q.path,c.isWindows&&(j=j.replace(/\//g,"\\")),j}function V(q,L){var j=L?re:W,B="",oe=q.scheme,se=q.authority,ee=q.path,st=q.query,Xe=q.fragment;if(oe&&(B+=oe,B+=":"),(se||oe==="file")&&(B+=P,B+=P),se){var Ct=se.indexOf("@");if(Ct!==-1){var en=se.substr(0,Ct);se=se.substr(Ct+1),(Ct=en.lastIndexOf(":"))===-1?B+=j(en,!1,!1):(B+=j(en.substr(0,Ct),!1,!1),B+=":",B+=j(en.substr(Ct+1),!1,!0)),B+="@"}(Ct=(se=se.toLowerCase()).lastIndexOf(":"))===-1?B+=j(se,!1,!0):(B+=j(se.substr(0,Ct),!1,!0),B+=se.substr(Ct))}if(ee){if(ee.length>=3&&ee.charCodeAt(0)===47&&ee.charCodeAt(2)===58)(Sr=ee.charCodeAt(1))>=65&&Sr<=90&&(ee="/".concat(String.fromCharCode(Sr+32),":").concat(ee.substr(3)));else if(ee.length>=2&&ee.charCodeAt(1)===58){var Sr;(Sr=ee.charCodeAt(0))>=65&&Sr<=90&&(ee="".concat(String.fromCharCode(Sr+32),":").concat(ee.substr(2)))}B+=j(ee,!0,!1)}return st&&(B+="?",B+=j(st,!1,!1)),Xe&&(B+="#",B+=L?Xe:W(Xe,!1,!1)),B}function Ae(q){try{return decodeURIComponent(q)}catch{return q.length>3?q.substr(0,3)+Ae(q.substr(3)):q}}a.uriToFsPath=Ne;var Ye=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function We(q){return q.match(Ye)?q.replace(Ye,function(L){return Ae(L)}):q}},679:function(i,a,o){var s=this&&this.__spreadArray||function(m,v,y){if(y||arguments.length===2)for(var R,P=0,E=v.length;P<E;P++)!R&&P in v||(R||(R=Array.prototype.slice.call(v,0,P)),R[P]=v[P]);return m.concat(R||Array.prototype.slice.call(v))};Object.defineProperty(a,"__esModule",{value:!0}),a.Utils=void 0;var u,l=o(470),c=l.posix||l,f="/";(u=a.Utils||(a.Utils={})).joinPath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];return m.with({path:c.join.apply(c,s([m.path],v,!1))})},u.resolvePath=function(m){for(var v=[],y=1;y<arguments.length;y++)v[y-1]=arguments[y];var R=m.path,P=!1;R[0]!==f&&(R=f+R,P=!0);var E=c.resolve.apply(c,s([R],v,!1));return P&&E[0]===f&&!m.authority&&(E=E.substring(1)),m.with({path:E})},u.dirname=function(m){if(m.path.length===0||m.path===f)return m;var v=c.dirname(m.path);return v.length===1&&v.charCodeAt(0)===46&&(v=""),m.with({path:v})},u.basename=function(m){return c.basename(m.path)},u.extname=function(m){return c.extname(m.path)}}},e={};function r(i){var a=e[i];if(a!==void 0)return a.exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,r),o.exports}var n={};return(()=>{var i=n;Object.defineProperty(i,"__esModule",{value:!0}),i.Utils=i.URI=void 0;var a=r(796);Object.defineProperty(i,"URI",{enumerable:!0,get:function(){return a.URI}});var o=r(679);Object.defineProperty(i,"Utils",{enumerable:!0,get:function(){return o.Utils}})})(),n})())});var Nu=d(wo=>{"use strict";Object.defineProperty(wo,"__esModule",{value:!0});wo.eagerLoad=wo.inject=void 0;function CG(t,e,r,n){let i=[t,e,r,n].reduce(KA,{});return HA(i)}wo.inject=CG;var xm=Symbol("isProxy");function UA(t){if(t&&t[xm])for(let e of Object.values(t))UA(e);return t}wo.eagerLoad=UA;function HA(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>GA(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(GA(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),xm]});return r[xm]=!0,r}var jA=Symbol();function GA(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===jA)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/di/cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=jA;try{t[e]=typeof i=="function"?i(n):HA(i,n)}catch(a){throw t[e]=a instanceof Error?a:void 0,a}return t[e]}else return}function KA(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=KA(i,n):t[r]=n}}return t}});var Pr=d(Oc=>{"use strict";Object.defineProperty(Oc,"__esModule",{value:!0});Oc.MultiMap=void 0;var $o=Dt(),Lm=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return $o.Reduction.sum((0,$o.stream)(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return(0,$o.stream)(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return(0,$o.stream)(this.map.keys())}values(){return(0,$o.stream)(this.map.values()).flat()}entriesGroupedByKey(){return(0,$o.stream)(this.map.entries())}};Oc.MultiMap=Lm});var $e=d(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.isCharacterRange=A.CharacterRange=A.isAssignment=A.Assignment=A.isAlternatives=A.Alternatives=A.isAction=A.Action=A.isTypeAttribute=A.TypeAttribute=A.isType=A.Type=A.isTerminalRule=A.TerminalRule=A.isReturnType=A.ReturnType=A.isParserRule=A.ParserRule=A.isParameterReference=A.ParameterReference=A.isParameter=A.Parameter=A.isNegation=A.Negation=A.isNamedArgument=A.NamedArgument=A.isLiteralCondition=A.LiteralCondition=A.isInterface=A.Interface=A.isInferredType=A.InferredType=A.isGrammarImport=A.GrammarImport=A.isGrammar=A.Grammar=A.isDisjunction=A.Disjunction=A.isConjunction=A.Conjunction=A.isAtomType=A.AtomType=A.isAbstractElement=A.AbstractElement=A.isCondition=A.Condition=A.isAbstractType=A.AbstractType=A.isAbstractRule=A.AbstractRule=void 0;A.reflection=A.LangiumGrammarAstReflection=A.isWildcard=A.Wildcard=A.isUntilToken=A.UntilToken=A.isUnorderedGroup=A.UnorderedGroup=A.isTerminalRuleCall=A.TerminalRuleCall=A.isTerminalGroup=A.TerminalGroup=A.isTerminalAlternatives=A.TerminalAlternatives=A.isRuleCall=A.RuleCall=A.isRegexToken=A.RegexToken=A.isNegatedToken=A.NegatedToken=A.isKeyword=A.Keyword=A.isGroup=A.Group=A.isCrossReference=A.CrossReference=void 0;var PG=hr();A.AbstractRule="AbstractRule";function EG(t){return A.reflection.isInstance(t,A.AbstractRule)}A.isAbstractRule=EG;A.AbstractType="AbstractType";function kG(t){return A.reflection.isInstance(t,A.AbstractType)}A.isAbstractType=kG;A.Condition="Condition";function NG(t){return A.reflection.isInstance(t,A.Condition)}A.isCondition=NG;A.AbstractElement="AbstractElement";function wG(t){return A.reflection.isInstance(t,A.AbstractElement)}A.isAbstractElement=wG;A.AtomType="AtomType";function $G(t){return A.reflection.isInstance(t,A.AtomType)}A.isAtomType=$G;A.Conjunction="Conjunction";function OG(t){return A.reflection.isInstance(t,A.Conjunction)}A.isConjunction=OG;A.Disjunction="Disjunction";function IG(t){return A.reflection.isInstance(t,A.Disjunction)}A.isDisjunction=IG;A.Grammar="Grammar";function DG(t){return A.reflection.isInstance(t,A.Grammar)}A.isGrammar=DG;A.GrammarImport="GrammarImport";function xG(t){return A.reflection.isInstance(t,A.GrammarImport)}A.isGrammarImport=xG;A.InferredType="InferredType";function LG(t){return A.reflection.isInstance(t,A.InferredType)}A.isInferredType=LG;A.Interface="Interface";function qG(t){return A.reflection.isInstance(t,A.Interface)}A.isInterface=qG;A.LiteralCondition="LiteralCondition";function MG(t){return A.reflection.isInstance(t,A.LiteralCondition)}A.isLiteralCondition=MG;A.NamedArgument="NamedArgument";function FG(t){return A.reflection.isInstance(t,A.NamedArgument)}A.isNamedArgument=FG;A.Negation="Negation";function jG(t){return A.reflection.isInstance(t,A.Negation)}A.isNegation=jG;A.Parameter="Parameter";function GG(t){return A.reflection.isInstance(t,A.Parameter)}A.isParameter=GG;A.ParameterReference="ParameterReference";function UG(t){return A.reflection.isInstance(t,A.ParameterReference)}A.isParameterReference=UG;A.ParserRule="ParserRule";function HG(t){return A.reflection.isInstance(t,A.ParserRule)}A.isParserRule=HG;A.ReturnType="ReturnType";function KG(t){return A.reflection.isInstance(t,A.ReturnType)}A.isReturnType=KG;A.TerminalRule="TerminalRule";function WG(t){return A.reflection.isInstance(t,A.TerminalRule)}A.isTerminalRule=WG;A.Type="Type";function BG(t){return A.reflection.isInstance(t,A.Type)}A.isType=BG;A.TypeAttribute="TypeAttribute";function VG(t){return A.reflection.isInstance(t,A.TypeAttribute)}A.isTypeAttribute=VG;A.Action="Action";function zG(t){return A.reflection.isInstance(t,A.Action)}A.isAction=zG;A.Alternatives="Alternatives";function YG(t){return A.reflection.isInstance(t,A.Alternatives)}A.isAlternatives=YG;A.Assignment="Assignment";function XG(t){return A.reflection.isInstance(t,A.Assignment)}A.isAssignment=XG;A.CharacterRange="CharacterRange";function JG(t){return A.reflection.isInstance(t,A.CharacterRange)}A.isCharacterRange=JG;A.CrossReference="CrossReference";function QG(t){return A.reflection.isInstance(t,A.CrossReference)}A.isCrossReference=QG;A.Group="Group";function ZG(t){return A.reflection.isInstance(t,A.Group)}A.isGroup=ZG;A.Keyword="Keyword";function e2(t){return A.reflection.isInstance(t,A.Keyword)}A.isKeyword=e2;A.NegatedToken="NegatedToken";function t2(t){return A.reflection.isInstance(t,A.NegatedToken)}A.isNegatedToken=t2;A.RegexToken="RegexToken";function r2(t){return A.reflection.isInstance(t,A.RegexToken)}A.isRegexToken=r2;A.RuleCall="RuleCall";function n2(t){return A.reflection.isInstance(t,A.RuleCall)}A.isRuleCall=n2;A.TerminalAlternatives="TerminalAlternatives";function i2(t){return A.reflection.isInstance(t,A.TerminalAlternatives)}A.isTerminalAlternatives=i2;A.TerminalGroup="TerminalGroup";function a2(t){return A.reflection.isInstance(t,A.TerminalGroup)}A.isTerminalGroup=a2;A.TerminalRuleCall="TerminalRuleCall";function o2(t){return A.reflection.isInstance(t,A.TerminalRuleCall)}A.isTerminalRuleCall=o2;A.UnorderedGroup="UnorderedGroup";function s2(t){return A.reflection.isInstance(t,A.UnorderedGroup)}A.isUnorderedGroup=s2;A.UntilToken="UntilToken";function u2(t){return A.reflection.isInstance(t,A.UntilToken)}A.isUntilToken=u2;A.Wildcard="Wildcard";function l2(t){return A.reflection.isInstance(t,A.Wildcard)}A.isWildcard=l2;var Ic=class extends PG.AbstractAstReflection{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","Assignment","AtomType","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","RegexToken","ReturnType","RuleCall","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case A.Conjunction:case A.Disjunction:case A.LiteralCondition:case A.Negation:case A.ParameterReference:return this.isSubtype(A.Condition,r);case A.Interface:case A.Type:return this.isSubtype(A.AbstractType,r);case A.ParserRule:return this.isSubtype(A.AbstractRule,r)||this.isSubtype(A.AbstractType,r);case A.TerminalRule:return this.isSubtype(A.AbstractRule,r);case A.Action:return this.isSubtype(A.AbstractElement,r)||this.isSubtype(A.AbstractType,r);case A.Alternatives:case A.Assignment:case A.CharacterRange:case A.CrossReference:case A.Group:case A.Keyword:case A.NegatedToken:case A.RegexToken:case A.RuleCall:case A.TerminalAlternatives:case A.TerminalGroup:case A.TerminalRuleCall:case A.UnorderedGroup:case A.UntilToken:case A.Wildcard:return this.isSubtype(A.AbstractElement,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"AtomType:refType":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":return A.AbstractType;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return A.AbstractRule;case"Grammar:usedGrammars":return A.Grammar;case"NamedArgument:parameter":case"ParameterReference:parameter":return A.Parameter;case"TerminalRuleCall:rule":return A.TerminalRule;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"AtomType":return{name:"AtomType",mandatory:[{name:"isArray",type:"boolean"},{name:"isRef",type:"boolean"}]};case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"Type":return{name:"Type",mandatory:[{name:"typeAlternatives",type:"array"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"},{name:"typeAlternatives",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}};A.LangiumGrammarAstReflection=Ic;A.reflection=new Ic});var gi=d(vt=>{"use strict";Object.defineProperty(vt,"__esModule",{value:!0});vt.addSubTypes=vt.sortInterfacesTopologically=vt.mergeTypesAndInterfaces=vt.mergeInterfaces=vt.comparePropertyType=vt.collectSuperTypes=vt.collectChildrenTypes=vt.distinctAndSorted=vt.collectAllProperties=void 0;var c2=Pr(),$a=$e();function f2(t){let e=new c2.MultiMap;for(let r of t)e.addAll(r.name,r.properties);for(let r of t)for(let n of r.printingSuperTypes){let i=e.get(n);i&&e.addAll(r.name,i)}return e}vt.collectAllProperties=f2;function qm(t,e){return Array.from(new Set(t)).sort(e)}vt.distinctAndSorted=qm;function WA(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(o=>{let s=r.getOrCreateDocument(o.sourceUri),u=n.getAstNode(s.parseResult.value,o.sourcePath);(0,$a.isInterface)(u)?(i.add(u),WA(u,e,r,n).forEach(c=>i.add(c))):u&&(0,$a.isType)(u.$container)&&i.add(u.$container)}),i}vt.collectChildrenTypes=WA;function Mm(t){let e=new Set;return(0,$a.isInterface)(t)?(e.add(t),t.superTypes.forEach(r=>{if((0,$a.isInterface)(r.ref)){e.add(r.ref);let n=Mm(r.ref);for(let i of n)e.add(i)}})):(0,$a.isType)(t)&&t.typeAlternatives.forEach(r=>{var n;if(!((n=r.refType)===null||n===void 0)&&n.ref&&((0,$a.isInterface)(r.refType.ref)||(0,$a.isType)(r.refType.ref))){let i=Mm(r.refType.ref);for(let a of i)e.add(a)}}),e}vt.collectSuperTypes=Mm;function d2(t,e){return t.array===e.array&&t.reference===e.reference&&p2(t.types,e.types)}vt.comparePropertyType=d2;function p2(t,e,r=(n,i)=>n===i){let n=qm(t),i=qm(e);return n.length!==i.length?!1:i.every((a,o)=>r(a,n[o]))}function h2(t,e){return t.interfaces.concat(e.interfaces)}vt.mergeInterfaces=h2;function m2(t){return t.interfaces.concat(t.unions)}vt.mergeTypesAndInterfaces=m2;function y2(t){let e=t.sort((i,a)=>i.name.localeCompare(a.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(a=>i.value.realSuperTypes.has(a.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(a=>a.nodes.includes(i)).forEach(a=>n.push(a)))}return r.map(i=>i.value)}vt.sortInterfacesTopologically=y2;function g2(t){var e;for(let r of t.values())for(let n of r.realSuperTypes)(e=t.get(n))===null||e===void 0||e.subTypes.add(r.name)}vt.addSubTypes=g2});var jm=d(Dc=>{"use strict";Object.defineProperty(Dc,"__esModule",{value:!0});Dc.processGeneratorNode=void 0;var wu=Oo(),Fm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}append(e){e.length>0&&this.lines[this.currentLineNumber].push(e)}increaseIndent(e){this.currentIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}resetCurrentLine(){this.lines[this.currentLineNumber]=[]}addNewLine(){this.pendingIndent=!0,this.lines.push([])}};function v2(t,e){let r=new Fm(e);return BA(t,r),r.content}Dc.processGeneratorNode=v2;function BA(t,e){typeof t=="string"?T2(t,e):t instanceof wu.IndentNode?_2(t,e):t instanceof wu.CompositeGeneratorNode?YA(t,e):t instanceof wu.NewLineNode&&R2(t,e)}function VA(t,e){return typeof t=="string"?XA(t):t instanceof wu.CompositeGeneratorNode?t.contents.some(r=>VA(r,e)):t instanceof wu.NewLineNode?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function T2(t,e){t&&(e.pendingIndent&&zA(e,!1),e.append(t))}function zA(t,e){var r;let n="";for(let i of t.currentIndents.filter(a=>a.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n),t.pendingIndent=!1}function YA(t,e){for(let r of t.contents)BA(r,e)}function _2(t,e){var r;if(VA(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation);try{e.increaseIndent(t),YA(t,e)}finally{e.decreaseIndent()}}}function R2(t,e){t.ifNotEmpty&&!XA(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&zA(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function XA(t){return t.trimStart()!==""}});var Oo=d(Ze=>{"use strict";Object.defineProperty(Ze,"__esModule",{value:!0});Ze.NLEmpty=Ze.NL=Ze.NewLineNode=Ze.IndentNode=Ze.CompositeGeneratorNode=Ze.toString=Ze.isNewLineNode=Ze.isGeneratorNode=Ze.EOL=void 0;var A2=jm();Ze.EOL=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function JA(t){return t instanceof $u||t instanceof Ou||t instanceof Oa}Ze.isGeneratorNode=JA;function S2(t){return t instanceof Oa}Ze.isNewLineNode=S2;function b2(t,e){return JA(t)?(0,A2.processGeneratorNode)(t,e):String(t)}Ze.toString=b2;var $u=class{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,r){return e?this.append(...r):this}appendNewLine(){return this.append(Ze.NL)}appendNewLineIf(e){return e?this.append(Ze.NL):this}appendNewLineIfNotEmpty(){return this.append(Ze.NLEmpty)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}indent(e,r){let n=new Ou(r,!1);return this.contents.push(n),e&&e(n),this}};Ze.CompositeGeneratorNode=$u;var Ou=class extends $u{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}};Ze.IndentNode=Ou;var Oa=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Ze.EOL,this.ifNotEmpty=r}};Ze.NewLineNode=Oa;Ze.NL=new Oa;Ze.NLEmpty=new Oa(void 0,!0)});var zi=d(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.propertyTypesToString=mr.TypeResolutionError=mr.InterfaceType=mr.UnionType=mr.isInterfaceType=mr.isUnionType=void 0;var Tt=Oo(),xc=jm(),C2=Pr(),Io=gi();function P2(t){return t&&"alternatives"in t}mr.isUnionType=P2;function E2(t){return t&&"properties"in t}mr.isInterfaceType=E2;var Gm=class{constructor(e,r,n){var i;this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.name=e,this.alternatives=r,this.reflection=(i=n?.reflection)!==null&&i!==void 0?i:!1}toAstTypesString(){let e=new Tt.CompositeGeneratorNode;return e.append(`export type ${this.name} = ${Lc(this.alternatives,"AstType")};`,Tt.NL),this.reflection&&(e.append(Tt.NL),ZA(e,this.name)),(0,xc.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode;return r.append(`type ${Km(this.name,e)} = ${Lc(this.alternatives,"DeclaredType")};`,Tt.NL),(0,xc.processGeneratorNode)(r)}};mr.UnionType=Gm;var Um=class{constructor(e,r,n){this.realSuperTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeTypes=new Set,this.printingSuperTypes=[],this.superProperties=new C2.MultiMap,this.name=e,this.realSuperTypes=new Set(r),this.printingSuperTypes=[...r],this.properties=n,n.forEach(i=>this.superProperties.add(i.name,i))}toAstTypesString(){let e=new Tt.CompositeGeneratorNode,r=this.printingSuperTypes.length>0?(0,Io.distinctAndSorted)([...this.printingSuperTypes]):["AstNode"];return e.append(`export interface ${this.name} extends ${r.join(", ")} {`,Tt.NL),e.indent(n=>{this.containerTypes.size>0&&n.append(`readonly $container: ${(0,Io.distinctAndSorted)([...this.containerTypes]).join(" | ")};`,Tt.NL),this.typeTypes.size>0&&n.append(`readonly $type: ${(0,Io.distinctAndSorted)([...this.typeTypes]).map(i=>`'${i}'`).join(" | ")};`,Tt.NL),QA(n,this.properties,"AstType")}),e.append("}",Tt.NL),e.append(Tt.NL),ZA(e,this.name),(0,xc.processGeneratorNode)(e)}toDeclaredTypesString(e){let r=new Tt.CompositeGeneratorNode,n=Km(this.name,e),i=Array.from(this.printingSuperTypes).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,Tt.NL),r.indent(a=>QA(a,this.properties,"DeclaredType",e)),r.append("}",Tt.NL),(0,xc.processGeneratorNode)(r)}};mr.InterfaceType=Um;var Hm=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};mr.TypeResolutionError=Hm;function Lc(t,e="AstType"){function r(n){let i=(0,Io.distinctAndSorted)(n.types).join(" | ");return i=n.reference?e==="AstType"?`Reference<${i}>`:`@${i}`:i,i=n.array?e==="AstType"?`Array<${i}>`:`${i}[]`:i,i}return(0,Io.distinctAndSorted)(t.map(r)).join(" | ")}mr.propertyTypesToString=Lc;function QA(t,e,r,n=new Set){function i(a){let o=r==="AstType"?a.name:Km(a.name,n),s=a.optional&&!a.typeAlternatives.some(l=>l.array)&&!a.typeAlternatives.every(l=>l.types.length===1&&l.types[0]==="boolean"),u=Lc(a.typeAlternatives,r);return`${o}${s?"?":""}: ${u}`}(0,Io.distinctAndSorted)(e,(a,o)=>a.name.localeCompare(o.name)).forEach(a=>t.append(i(a),Tt.NL))}function ZA(t,e){t.append(`export const ${e} = '${e}';`,Tt.NL),t.append(Tt.NL),t.append(`export function is${e}(item: unknown): item is ${e} {`,Tt.NL),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,Tt.NL)),t.append("}",Tt.NL)}function Km(t,e){return e.has(t)?`^${t}`:t}});var xo=d(Do=>{"use strict";Object.defineProperty(Do,"__esModule",{value:!0});Do.DefaultNameProvider=Do.isNamed=void 0;var k2=Et();function eS(t){return typeof t.name=="string"}Do.isNamed=eS;var Wm=class{getName(e){if(eS(e))return e.name}getNameNode(e){return(0,k2.findNodeForProperty)(e.$cstNode,"name")}};Do.DefaultNameProvider=Wm});var Ie=d(et=>{"use strict";Object.defineProperty(et,"__esModule",{value:!0});et.copyAstNode=et.findLocalReferences=et.streamReferences=et.streamAst=et.streamAllContents=et.streamContents=et.findRootNode=et.getDocument=et.hasContainerOfType=et.getContainerOfType=et.linkContentToContainer=void 0;var Mn=hr(),Ia=Dt();function tS(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{(0,Mn.isAstNode)(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):(0,Mn.isAstNode)(r)&&(r.$container=t,r.$containerProperty=e))}et.linkContentToContainer=tS;function N2(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}et.getContainerOfType=N2;function w2(t,e){let r=t;for(;r;){if(e(r))return!0;r=r.$container}return!1}et.hasContainerOfType=w2;function rS(t){let r=nS(t).$document;if(!r)throw new Error("AST node has no document.");return r}et.getDocument=rS;function nS(t){for(;t.$container;)t=t.$container;return t}et.findRootNode=nS;function Vm(t){if(!t)throw new Error("Node must be an AstNode.");return new Ia.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,Mn.isAstNode)(n))return e.keyIndex++,{done:!1,value:n};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,Mn.isAstNode)(a))return{done:!1,value:a}}e.arrayIndex=0}}e.keyIndex++}return Ia.DONE_RESULT})}et.streamContents=Vm;function $2(t){if(!t)throw new Error("Root node must be an AstNode.");return new Ia.TreeStreamImpl(t,e=>Vm(e))}et.streamAllContents=$2;function iS(t){if(!t)throw new Error("Root node must be an AstNode.");return new Ia.TreeStreamImpl(t,e=>Vm(e),{includeRoot:!0})}et.streamAst=iS;function aS(t){return new Ia.StreamImpl(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if((0,Mn.isReference)(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,a=n[i];if((0,Mn.isReference)(a))return{done:!1,value:{reference:a,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return Ia.DONE_RESULT})}et.streamReferences=aS;function O2(t,e=rS(t).parseResult.value){let r=[];return iS(e).forEach(n=>{aS(n).forEach(i=>{i.reference.ref===t&&r.push(i.reference)})}),(0,Ia.stream)(r)}et.findLocalReferences=O2;function Bm(t,e){let r={$type:t.$type};for(let[n,i]of Object.entries(t))if(!n.startsWith("$"))if((0,Mn.isAstNode)(i))r[n]=Bm(i,e);else if((0,Mn.isReference)(i))r[n]=e(r,n,i.$refNode,i.$refText);else if(Array.isArray(i)){let a=[];for(let o of i)(0,Mn.isAstNode)(o)?a.push(Bm(o,e)):(0,Mn.isReference)(o)?a.push(e(r,n,o.$refNode,o.$refText)):a.push(o);r[n]=a}else r[n]=i;return tS(r),r}et.copyAstNode=Bm});var Iu=d((oS,qc)=>{(function(t,e){typeof define=="function"&&define.amd?define([],e):typeof qc=="object"&&qc.exports?qc.exports=e():t.regexpToAst=e()})(typeof self<"u"?self:oS,function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(y){this.idx=y.idx,this.input=y.input,this.groupIdx=y.groupIdx},t.prototype.pattern=function(y){this.idx=0,this.input=y,this.groupIdx=0,this.consumeChar("/");var R=this.disjunction();this.consumeChar("/");for(var P={type:"Flags",loc:{begin:this.idx,end:y.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":o(P,"global");break;case"i":o(P,"ignoreCase");break;case"m":o(P,"multiLine");break;case"u":o(P,"unicode");break;case"y":o(P,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:P,value:R,loc:this.loc(0)}},t.prototype.disjunction=function(){var y=[],R=this.idx;for(y.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),y.push(this.alternative());return{type:"Disjunction",value:y,loc:this.loc(R)}},t.prototype.alternative=function(){for(var y=[],R=this.idx;this.isTerm();)y.push(this.term());return{type:"Alternative",value:y,loc:this.loc(R)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var y=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(y)};case"$":return{type:"EndAnchor",loc:this.loc(y)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(y)};case"B":return{type:"NonWordBoundary",loc:this.loc(y)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");var R;switch(this.popChar()){case"=":R="Lookahead";break;case"!":R="NegativeLookahead";break}s(R);var P=this.disjunction();return this.consumeChar(")"),{type:R,value:P,loc:this.loc(y)}}u()},t.prototype.quantifier=function(y){var R,P=this.idx;switch(this.popChar()){case"*":R={atLeast:0,atMost:1/0};break;case"+":R={atLeast:1,atMost:1/0};break;case"?":R={atLeast:0,atMost:1};break;case"{":var E=this.integerIncludingZero();switch(this.popChar()){case"}":R={atLeast:E,atMost:E};break;case",":var b;this.isDigit()?(b=this.integerIncludingZero(),R={atLeast:E,atMost:b}):R={atLeast:E,atMost:1/0},this.consumeChar("}");break}if(y===!0&&R===void 0)return;s(R);break}if(!(y===!0&&R===void 0))return s(R),this.peekChar(0)==="?"?(this.consumeChar("?"),R.greedy=!1):R.greedy=!0,R.type="Quantifier",R.loc=this.loc(P),R},t.prototype.atom=function(){var y,R=this.idx;switch(this.peekChar()){case".":y=this.dotAll();break;case"\\":y=this.atomEscape();break;case"[":y=this.characterClass();break;case"(":y=this.group();break}return y===void 0&&this.isPatternCharacter()&&(y=this.patternCharacter()),s(y),y.loc=this.loc(R),this.isQuantifier()&&(y.quantifier=this.quantifier()),y},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i(`
`),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){var y=this.positiveInteger();return{type:"GroupBackReference",value:y}},t.prototype.characterClassEscape=function(){var y,R=!1;switch(this.popChar()){case"d":y=c;break;case"D":y=c,R=!0;break;case"s":y=m;break;case"S":y=m,R=!0;break;case"w":y=f;break;case"W":y=f,R=!0;break}return s(y),{type:"Set",value:y,complement:R}},t.prototype.controlEscapeAtom=function(){var y;switch(this.popChar()){case"f":y=i("\f");break;case"n":y=i(`
`);break;case"r":y=i("\r");break;case"t":y=i("	");break;case"v":y=i("\v");break}return s(y),{type:"Character",value:y}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var y=this.popChar();if(/[a-zA-Z]/.test(y)===!1)throw Error("Invalid ");var R=y.toUpperCase().charCodeAt(0)-64;return{type:"Character",value:R}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){var y=this.popChar();return{type:"Character",value:i(y)}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:var y=this.popChar();return{type:"Character",value:i(y)}}},t.prototype.characterClass=function(){var y=[],R=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),R=!0);this.isClassAtom();){var P=this.classAtom(),E=P.type==="Character";if(E&&this.isRangeDash()){this.consumeChar("-");var b=this.classAtom(),S=b.type==="Character";if(S){if(b.value<P.value)throw Error("Range out of order in character class");y.push({from:P.value,to:b.value})}else a(P.value,y),y.push(i("-")),a(b.value,y)}else a(P.value,y)}return this.consumeChar("]"),{type:"Set",complement:R,value:y}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var y=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),y=!1;break;default:this.groupIdx++;break}var R=this.disjunction();this.consumeChar(")");var P={type:"Group",capturing:y,value:R};return y&&(P.idx=this.groupIdx),P},t.prototype.positiveInteger=function(){var y=this.popChar();if(n.test(y)===!1)throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.integerIncludingZero=function(){var y=this.popChar();if(r.test(y)===!1)throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)y+=this.popChar();return parseInt(y,10)},t.prototype.patternCharacter=function(){var y=this.popChar();switch(y){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(y)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return this.peekChar()==="-"&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(y){switch(y===void 0&&(y=0),this.peekChar(y)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}},t.prototype.isQuantifier=function(){var y=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(y)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(y){for(var R="",P=0;P<y;P++){var E=this.popChar();if(e.test(E)===!1)throw Error("Expecting a HexDecimal digits");R+=E}var b=parseInt(R,16);return{type:"Character",value:b}},t.prototype.peekChar=function(y){return y===void 0&&(y=0),this.input[this.idx+y]},t.prototype.popChar=function(){var y=this.peekChar(0);return this.consumeChar(),y},t.prototype.consumeChar=function(y){if(y!==void 0&&this.input[this.idx]!==y)throw Error("Expected: '"+y+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(y){return{begin:y,end:this.idx}};var e=/[0-9a-fA-F]/,r=/[0-9]/,n=/[1-9]/;function i(y){return y.charCodeAt(0)}function a(y,R){y.length!==void 0?y.forEach(function(P){R.push(P)}):R.push(y)}function o(y,R){if(y[R]===!0)throw"duplicate flag "+R;y[R]=!0}function s(y){if(y===void 0)throw Error("Internal Error - Should never get here!")}function u(){throw Error("Internal Error - Should never get here!")}var l,c=[];for(l=i("0");l<=i("9");l++)c.push(l);var f=[i("_")].concat(c);for(l=i("a");l<=i("z");l++)f.push(l);for(l=i("A");l<=i("Z");l++)f.push(l);var m=[i(" "),i("\f"),i(`
`),i("\r"),i("	"),i("\v"),i("	"),i("\xA0"),i("\u1680"),i("\u2000"),i("\u2001"),i("\u2002"),i("\u2003"),i("\u2004"),i("\u2005"),i("\u2006"),i("\u2007"),i("\u2008"),i("\u2009"),i("\u200A"),i("\u2028"),i("\u2029"),i("\u202F"),i("\u205F"),i("\u3000"),i("\uFEFF")];function v(){}return v.prototype.visitChildren=function(y){for(var R in y){var P=y[R];y.hasOwnProperty(R)&&(P.type!==void 0?this.visit(P):Array.isArray(P)&&P.forEach(function(E){this.visit(E)},this))}},v.prototype.visit=function(y){switch(y.type){case"Pattern":this.visitPattern(y);break;case"Flags":this.visitFlags(y);break;case"Disjunction":this.visitDisjunction(y);break;case"Alternative":this.visitAlternative(y);break;case"StartAnchor":this.visitStartAnchor(y);break;case"EndAnchor":this.visitEndAnchor(y);break;case"WordBoundary":this.visitWordBoundary(y);break;case"NonWordBoundary":this.visitNonWordBoundary(y);break;case"Lookahead":this.visitLookahead(y);break;case"NegativeLookahead":this.visitNegativeLookahead(y);break;case"Character":this.visitCharacter(y);break;case"Set":this.visitSet(y);break;case"Group":this.visitGroup(y);break;case"GroupBackReference":this.visitGroupBackReference(y);break;case"Quantifier":this.visitQuantifier(y);break}this.visitChildren(y)},v.prototype.visitPattern=function(y){},v.prototype.visitFlags=function(y){},v.prototype.visitDisjunction=function(y){},v.prototype.visitAlternative=function(y){},v.prototype.visitStartAnchor=function(y){},v.prototype.visitEndAnchor=function(y){},v.prototype.visitWordBoundary=function(y){},v.prototype.visitNonWordBoundary=function(y){},v.prototype.visitLookahead=function(y){},v.prototype.visitNegativeLookahead=function(y){},v.prototype.visitCharacter=function(y){},v.prototype.visitSet=function(y){},v.prototype.visitGroup=function(y){},v.prototype.visitGroupBackReference=function(y){},v.prototype.visitQuantifier=function(y){},{RegExpParser:t,BaseRegExpVisitor:v,VERSION:"0.5.0"}})});var Lo=d(Zt=>{"use strict";Object.defineProperty(Zt,"__esModule",{value:!0});Zt.partialRegex=Zt.partialMatches=Zt.getCaseInsensitivePattern=Zt.escapeRegExp=Zt.isWhitespaceRegExp=Zt.isMultilineComment=Zt.getTerminalParts=void 0;var sS=Iu(),uS=new sS.RegExpParser,zm=class extends sS.BaseRegExpVisitor{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=Ym(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=Boolean(`
`.match(n))}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}},Da=new zm;function I2(t){try{typeof t!="string"&&(t=t.source),t=`/${t}/`;let e=uS.pattern(t),r=[];for(let n of e.value.value)Da.reset(t),Da.visit(n),r.push({start:Da.startRegex,end:Da.endRegex});return r}catch{return[]}}Zt.getTerminalParts=I2;function D2(t){try{return typeof t!="string"&&(t=t.source),t=`/${t}/`,Da.reset(t),Da.visit(uS.pattern(t)),Da.multiline}catch{return!1}}Zt.isMultilineComment=D2;function x2(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}Zt.isWhitespaceRegExp=x2;function Ym(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}Zt.escapeRegExp=Ym;function L2(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:Ym(e)).join("")}Zt.getCaseInsensitivePattern=L2;function q2(t,e){let r=lS(t),n=e.match(r);return!!n&&n[0].length>0}Zt.partialMatches=q2;function lS(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let a="",o;function s(l){a+=r.substr(n,l),n+=l}function u(l){a+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":u(3);break;case"x":u(4);break;case"u":e.unicode?r[n+2]==="{"?u(r.indexOf("}",n)-n+1):u(6):u(2);break;case"p":case"P":e.unicode?u(r.indexOf("}",n)-n+1):u(2);break;case"k":u(r.indexOf(">",n)-n+1);break;default:u(2);break}break;case"[":o=/\[(?:\\.|.)*?\]/g,o.lastIndex=n,o=o.exec(r)||[],u(o[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":s(1);break;case"{":o=/\{\d+,?\d*\}/g,o.lastIndex=n,o=o.exec(r),o?s(o[0].length):u(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":a+="(?:",n+=3,a+=i()+"|$)";break;case"=":a+="(?=",n+=3,a+=i()+")";break;case"!":o=n,n+=3,i(),a+=r.substr(o,n-o);break;case"<":switch(r[n+3]){case"=":case"!":o=n,n+=4,i(),a+=r.substr(o,n-o);break;default:s(r.indexOf(">",n)-n+1),a+=i()+"|$)";break}break}else s(1),a+=i()+"|$)";break;case")":return++n,a;default:u(1);break}return a}return new RegExp(i(),t.flags)}Zt.partialRegex=lS});var kt=d(le=>{"use strict";var M2=le&&le.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),F2=le&&le.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),j2=le&&le.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&M2(e,t,r);return F2(e,t),e};Object.defineProperty(le,"__esModule",{value:!0});le.isPrimitiveType=le.extractAssignments=le.resolveTransitiveImports=le.resolveImport=le.resolveImportUri=le.terminalRegex=le.getRuleType=le.getActionType=le.getExplicitRuleType=le.getTypeNameWithoutError=le.getTypeName=le.getActionAtElement=le.isDataTypeRule=le.isArrayOperator=le.isArrayCardinality=le.isOptionalCardinality=void 0;var be=j2($e()),cS=qn(),Mc=Ie(),G2=zi(),U2=Lo();function H2(t){return t==="?"||t==="*"}le.isOptionalCardinality=H2;function K2(t){return t==="*"||t==="+"}le.isArrayCardinality=K2;function W2(t){return t==="+="}le.isArrayOperator=W2;function Qm(t){return fS(t,new Set)}le.isDataTypeRule=Qm;function fS(t,e){if(e.has(t))return!0;e.add(t);for(let r of(0,Mc.streamAllContents)(t))if(be.isRuleCall(r)){if(!r.rule.ref||be.isParserRule(r.rule.ref)&&!fS(r.rule.ref,e))return!1}else{if(be.isAssignment(r))return!1;if(be.isAction(r))return!1}return Boolean(t.definition)}function dS(t){let e=t.$container;if(be.isGroup(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let a=r[i];if(be.isAction(a))return a;{let o=(0,Mc.streamAllContents)(r[i]).find(be.isAction);if(o)return o}}}if(be.isAbstractElement(e))return dS(e)}le.getActionAtElement=dS;function Zm(t){var e;if(be.isParserRule(t))return Qm(t)?t.name:(e=ey(t))!==null&&e!==void 0?e:t.name;if(be.isInterface(t)||be.isType(t)||be.isReturnType(t))return t.name;if(be.isAction(t)){let r=pS(t);if(r)return r}else if(be.isInferredType(t))return t.name;throw new G2.TypeResolutionError("Cannot get name of Unknown Type",t.$cstNode)}le.getTypeName=Zm;function B2(t){try{return Zm(t)}catch{return"never"}}le.getTypeNameWithoutError=B2;function ey(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(be.isParserRule(e))return e.name;if(be.isInterface(e)||be.isType(e))return e.name}}}le.getExplicitRuleType=ey;function pS(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Zm(t.type.ref)}le.getActionType=pS;function V2(t){var e,r,n;return be.isTerminalRule(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Qm(t)?t.name:(n=ey(t))!==null&&n!==void 0?n:t.name}le.getRuleType=V2;function hS(t){return Du(t.definition)}le.terminalRegex=hS;var ty=/[\s\S]/.source;function Du(t){if(be.isTerminalAlternatives(t))return z2(t);if(be.isTerminalGroup(t))return Y2(t);if(be.isCharacterRange(t))return Q2(t);if(be.isTerminalRuleCall(t)){let e=t.rule.ref;if(!e)throw new Error("Missing rule reference.");return vi(hS(e),t.cardinality)}else{if(be.isNegatedToken(t))return J2(t);if(be.isUntilToken(t))return X2(t);if(be.isRegexToken(t))return vi(t.regex,t.cardinality,!1);if(be.isWildcard(t))return vi(ty,t.cardinality);throw new Error("Invalid terminal element.")}}function z2(t){return vi(t.elements.map(Du).join("|"),t.cardinality)}function Y2(t){return vi(t.elements.map(Du).join(""),t.cardinality)}function X2(t){return vi(`${ty}*?${Du(t.terminal)}`,t.cardinality)}function J2(t){return vi(`(?!${Du(t.terminal)})${ty}*?`,t.cardinality)}function Q2(t){return t.right?vi(`[${Xm(t.left)}-${Xm(t.right)}]`,t.cardinality,!1):vi(Xm(t.left),t.cardinality,!1)}function Xm(t){return(0,U2.escapeRegExp)(t.value)}function vi(t,e,r=!0){return r&&(t=`(${t})`),e?`${t}${e}`:t}function mS(t){if(t.path===void 0||t.path.length===0)return;let e=cS.Utils.dirname((0,Mc.getDocument)(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),cS.Utils.resolvePath(e,r)}le.resolveImportUri=mS;function ry(t,e){let r=mS(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(be.isGrammar(i))return i}}catch{}}le.resolveImport=ry;function Z2(t,e){if(be.isGrammarImport(e)){let r=ry(t,e);if(r){let n=Jm(t,r);return n.push(r),n}return[]}else return Jm(t,e)}le.resolveTransitiveImports=Z2;function Jm(t,e,r=e,n=new Set,i=new Set){let a=(0,Mc.getDocument)(e);if(r!==e&&i.add(e),!n.has(a.uri)){n.add(a.uri);for(let o of e.imports){let s=ry(t,o);s&&Jm(t,s,r,n,i)}}return Array.from(i)}function yS(t){return be.isAssignment(t)?[t]:be.isAlternatives(t)||be.isGroup(t)||be.isUnorderedGroup(t)?t.elements.flatMap(e=>yS(e)):[]}le.extractAssignments=yS;var eU=["string","number","boolean","Date","bigint"];function tU(t){return eU.includes(t)}le.isPrimitiveType=tU});var RS=d(jc=>{"use strict";Object.defineProperty(jc,"__esModule",{value:!0});jc.collectInferredTypes=void 0;var rU=xo(),gS=Pr(),nU=Dt(),Nt=$e(),Ti=kt(),iU=gi(),Fc=zi(),ny=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let a=0;a<r.next.length;a++){let o=n[a],s=r.next[a];s.actionWithAssignment&&i.push({alt:this.copyTypeAlternative(o),next:[]}),s.name!==void 0&&s.name!==o.name&&(s.actionWithAssignment?(o.properties=[],o.ruleCalls=[],o.super=[e.name],o.name=s.name):(o.super=[o.name,...o.ruleCalls],o.properties=[],o.ruleCalls=[],o.name=s.name)),o.properties.push(...s.properties),o.ruleCalls.push(...s.ruleCalls);let u={alt:o,next:s.children};u.next.length===0?(u.alt.super=u.alt.super.filter(l=>l!==u.alt.name),i.push(u)):i.push(...this.applyNext(e,u))}return _S(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(this.copyTypeAlternative(e));return n}copyTypeAlternative(e){function r(n){return{name:n.name,optional:n.optional,typeAlternatives:n.typeAlternatives,astNodes:n.astNodes}}return{name:e.name,super:e.super,ruleCalls:e.ruleCalls,properties:e.properties.map(n=>r(n))}}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=xa();r.parents=e;for(let n of e)n.children.push(r);return r}};function aU(t,e){var r;let n=[],i={fragments:new Map};for(let u of t)n.push(...vS(i,u));let a=cU(n),o=dU(a),s=pU(a,o);for(let u of e){let l=(0,Nt.isAlternatives)(u.definition)&&u.definition.elements.every(c=>(0,Nt.isKeyword)(c))?(0,nU.stream)(u.definition.elements).filter(Nt.isKeyword).map(c=>`'${c.value}'`).toArray():[(r=(0,Ti.getExplicitRuleType)(u))!==null&&r!==void 0?r:"string"];s.unions.push(new Fc.UnionType(u.name,xu(!1,!1,l)))}return s}jc.collectInferredTypes=aU;function vS(t,e){let r=xa(e),n=new ny(t,r);return e.definition&&iy(n,n.root,e.definition),n.getTypes()}function xa(t){return{name:(0,Nt.isParserRule)(t)||(0,Nt.isAction)(t)?(0,Ti.getTypeNameWithoutError)(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function iy(t,e,r){let n=(0,Ti.isOptionalCardinality)(r.cardinality);if((0,Nt.isAlternatives)(r)){let i=[];n&&i.push(t.connect(e,xa()));for(let a of r.elements){let o=t.connect(e,xa());i.push(iy(t,o,a))}return t.merge(...i)}else if((0,Nt.isGroup)(r)||(0,Nt.isUnorderedGroup)(r)){let i=t.connect(e,xa());for(let a of r.elements)i=iy(t,i,a);if(n){let a=t.connect(e,xa());return t.merge(a,i)}else return i}else{if((0,Nt.isAction)(r))return oU(t,e,r);(0,Nt.isAssignment)(r)?sU(e,r):(0,Nt.isRuleCall)(r)&&uU(t,e,r)}return e}function oU(t,e,r){var n;let i=t.connect(e,xa(r));if(r.type){let a=(n=r.type)===null||n===void 0?void 0:n.ref;a&&(0,rU.isNamed)(a)&&(i.name=a.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,typeAlternatives:xu(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function sU(t,e){let r={types:new Set,reference:!1};TS(e.terminal,r);let n=xu(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:(0,Ti.isOptionalCardinality)(e.cardinality),typeAlternatives:n,astNodes:new Set([e])})}function TS(t,e){if((0,Nt.isAlternatives)(t)||(0,Nt.isUnorderedGroup)(t)||(0,Nt.isGroup)(t))for(let r of t.elements)TS(r,e);else(0,Nt.isKeyword)(t)?e.types.add(`'${t.value}'`):(0,Nt.isRuleCall)(t)&&t.rule.ref?e.types.add((0,Ti.getRuleType)(t.rule.ref)):(0,Nt.isCrossReference)(t)&&t.type.ref&&(e.types.add((0,Ti.getTypeNameWithoutError)(t.type.ref)),e.reference=!0)}function uU(t,e,r){let n=r.rule.ref;if((0,Nt.isParserRule)(n)&&n.fragment){let i=lU(n,t.context);(0,Ti.isOptionalCardinality)(r.cardinality)?e.properties.push(...i.map(a=>Object.assign(Object.assign({},a),{optional:!0}))):e.properties.push(...i)}else(0,Nt.isParserRule)(n)&&e.ruleCalls.push((0,Ti.getRuleType)(n))}function lU(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=(0,Ti.getTypeNameWithoutError)(t),a=vS(e,t).filter(o=>o.alt.name===i);return n.push(...a.flatMap(o=>o.alt.properties)),n}function cU(t){let e=new Map,r=[],n=_S(t).map(i=>i.alt);for(let i of n){let a=new Fc.InterfaceType(i.name,i.super,i.properties);e.set(a.name,a),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(o=>{o!==a.name&&a.subTypes.add(o)}))}for(let i of r)for(let a of i.ruleCalls){let o=e.get(a);o&&o.name!==i.name&&o.realSuperTypes.add(i.name)}return Array.from(e.values())}function _S(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new gS.MultiMap),r=[];for(let[n,i]of e.entriesGroupedByKey()){let a=[],o=new Set,s={alt:{name:n,properties:a,ruleCalls:[],super:[]},next:[]};for(let u of i){let l=u.alt;s.alt.super.push(...l.super),s.next.push(...u.next);let c=l.properties;for(let f of c){let m=a.find(v=>v.name===f.name);m?(f.typeAlternatives.filter(fU(m.typeAlternatives)).forEach(v=>m.typeAlternatives.push(v)),f.astNodes.forEach(v=>m.astNodes.add(v))):a.push(Object.assign({},f))}l.ruleCalls.forEach(f=>o.add(f))}for(let u of i){let l=u.alt;if(l.ruleCalls.length===0)for(let c of a)l.properties.find(f=>f.name===c.name)||(c.optional=!0)}s.alt.ruleCalls=Array.from(o),r.push(s)}return r}function fU(t){return e=>!t.some(r=>(0,iU.comparePropertyType)(r,e))}function dU(t){let e=[],r=new gS.MultiMap;for(let n of t)for(let i of n.realSuperTypes)r.add(i,n.name);for(let[n,i]of r.entriesGroupedByKey())t.some(a=>a.name===n)||e.push(new Fc.UnionType(n,xu(!1,!1,i),{reflection:!0}));return e}function pU(t,e){var r;for(let a of t)for(let o of a.realSuperTypes)(r=t.find(s=>s.name===o))===null||r===void 0||r.subTypes.add(a.name);let n={interfaces:[],unions:e},i=new Set(e.map(a=>a.name));for(let a of t)if(a.properties.length===0&&a.subTypes.size>0){let o=xu(!1,!1,Array.from(a.subTypes)),s=e.find(u=>u.name===a.name);if(s)s.alternatives.push(...o);else{let u=new Fc.UnionType(a.name,o,{reflection:!0});u.realSuperTypes=a.realSuperTypes,n.unions.push(u),i.add(a.name)}}else n.interfaces.push(a);for(let a of n.interfaces)a.printingSuperTypes=[...a.realSuperTypes].filter(o=>!i.has(o));return n}function xu(t,e,r){return t||e?[{array:t,reference:e,types:r}]:r.map(n=>({array:t,reference:e,types:[n]}))}});var CS=d(Gc=>{"use strict";Object.defineProperty(Gc,"__esModule",{value:!0});Gc.collectDeclaredTypes=void 0;var bS=kt(),AS=zi();function hU(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=n.superTypes.filter(o=>o.ref).map(o=>(0,bS.getTypeNameWithoutError)(o.ref)),a=n.attributes.map(o=>({name:o.name,optional:o.isOptional===!0,typeAlternatives:o.typeAlternatives.map(SS),astNodes:new Set([o])}));r.interfaces.push(new AS.InterfaceType(n.name,i,a))}for(let n of e){let i=n.typeAlternatives.map(SS),a=n.typeAlternatives.length>1&&n.typeAlternatives.some(o=>{var s;return((s=o.refType)===null||s===void 0?void 0:s.ref)!==void 0});r.unions.push(new AS.UnionType(n.name,i,{reflection:a}))}return r}Gc.collectDeclaredTypes=hU;function SS(t){var e,r;let n=[];return t.refType?n=[t.refType.ref?(0,bS.getTypeNameWithoutError)(t.refType.ref):t.refType.$refText]:n=[(e=t.primitiveType)!==null&&e!==void 0?e:`'${(r=t.keywordType)===null||r===void 0?void 0:r.value}'`],{types:n,reference:t.isRef===!0,array:t.isArray===!0}}});var oy=d(qo=>{"use strict";Object.defineProperty(qo,"__esModule",{value:!0});qo.collectAllAstResources=qo.collectTypeResources=void 0;var mU=RS(),yU=CS(),gU=Ie(),vU=Pr(),TU=$e(),PS=kt(),_U=gi(),RU=zi();function AU(t,e){let r=ay(t,e),n=(0,mU.collectInferredTypes)(r.parserRules,r.datatypeRules),i=(0,yU.collectDeclaredTypes)(r.interfaces,r.types);return bU(n,i),SU((0,_U.mergeInterfaces)(n,i)),{astResources:r,inferred:n,declared:i}}qo.collectTypeResources=AU;function SU(t){function e(r,n=new Set){if(!n.has(r)){n.add(r);for(let i of r.printingSuperTypes){let a=t.find(o=>o.name===i);a&&(0,RU.isInterfaceType)(a)&&(e(a),a.superProperties.entriesGroupedByKey().forEach(o=>r.superProperties.addAll(o[0],o[1])))}}}for(let r of t)e(r)}function bU(t,e){let r=new vU.MultiMap,n=t.unions.concat(e.unions);for(let a of n)if(a.reflection)for(let o of a.alternatives)o.types.forEach(s=>r.add(s,a.name));function i(a,o,s){var u;let l=(u=a.interfaces.find(c=>c.name===o))!==null&&u!==void 0?u:a.unions.find(c=>c.name===o);l&&s.forEach(c=>l.realSuperTypes.add(c))}for(let[a,o]of r.entriesGroupedByKey())i(t,a,o),i(e,a,o)}function ay(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let a=(0,gU.getDocument)(i);if(!r.has(a.uri)){r.add(a.uri);for(let o of i.rules)(0,TU.isParserRule)(o)&&!o.fragment&&((0,PS.isDataTypeRule)(o)?n.datatypeRules.push(o):n.parserRules.push(o));if(i.interfaces.forEach(o=>n.interfaces.push(o)),i.types.forEach(o=>n.types.push(o)),e){let o=i.imports.map(s=>(0,PS.resolveImport)(e,s));ay(o,e,r,n)}}}return n}qo.collectAllAstResources=ay});var wS=d(Mo=>{"use strict";Object.defineProperty(Mo,"__esModule",{value:!0});Mo.specifyAstNodeProperties=Mo.collectAst=void 0;var kS=gi(),sy=zi(),CU=oy(),PU=kt();function EU(t,e){let{inferred:r,declared:n}=(0,CU.collectTypeResources)(t,e),i={interfaces:(0,kS.sortInterfacesTopologically)(ES(r.interfaces,n.interfaces)),unions:ES(r.unions,n.unions)};return NS(i),i}Mo.collectAst=EU;function ES(t,e){return Array.from(t.concat(e).reduce((r,n)=>(r.set(n.name,n),r),new Map).values()).sort((r,n)=>r.name.localeCompare(n.name))}function NS(t){let e=NU(t);(0,kS.addSubTypes)(e),wU(e),kU(e)}Mo.specifyAstNodeProperties=NS;function kU(t){let e=Array.from(t.values()).filter(n=>n.subTypes.size===0),r=new Set;for(let n of e){r.add(n),n.typeTypes.add(n.name);let i=Array.from(n.realSuperTypes).map(a=>t.get(a)).filter(a=>a!==void 0);for(let a of i)n.typeTypes.forEach(o=>a.typeTypes.add(o));e.push(...i.filter(a=>!r.has(a)))}}function NU({interfaces:t,unions:e}){let r=t.concat(e).reduce((a,o)=>(a.set(o.name,o),a),new Map),n=new Map;function i(a,o=new Set){if(n.has(a))return n.get(a);if(o.has(a))return!0;o.add(a);let s=a.alternatives.flatMap(u=>u.types).filter(u=>!(0,PU.isPrimitiveType)(u));if(s.length===0)return!0;for(let u of s){let l=r.get(u);if(l&&((0,sy.isInterfaceType)(l)||(0,sy.isUnionType)(l)&&!i(l,o)))return!1}return!0}for(let a of e){let o=i(a);n.set(a,o)}for(let[a,o]of n)o&&r.delete(a.name);return r}function wU(t){var e;let r=Array.from(t.values()),n=r.filter(a=>(0,sy.isInterfaceType)(a));for(let a of n){let o=a.properties.flatMap(s=>s.typeAlternatives.filter(u=>!u.reference).flatMap(u=>u.types));for(let s of o)(e=t.get(s))===null||e===void 0||e.containerTypes.add(a.name)}let i=$U(r);OU(i)}function $U(t){function e(i){let a=[i];n.add(i.name);let o=[...i.subTypes,...i.realSuperTypes];for(let s of o)if(!n.has(s)){let u=t.find(l=>l.name===s);u&&a.push(...e(u))}return a}let r=[],n=new Set;for(let i of t)n.has(i.name)||r.push(e(i));return r}function OU(t){for(let e of t){let r=new Set;e.forEach(n=>n.containerTypes.forEach(i=>r.add(i))),e.forEach(n=>n.containerTypes=r)}}});var uy=d(Uc=>{"use strict";Object.defineProperty(Uc,"__esModule",{value:!0});Uc.interpretAstReflection=void 0;var IU=hr(),$S=Pr(),DU=$e(),xU=wS(),LU=gi();function qU(t,e){let r;(0,DU.isGrammar)(t)?r=(0,xU.collectAst)(t,e):r=t;let n=r.interfaces.map(s=>s.name).concat(r.unions.map(s=>s.name)),i=MU(r),a=FU(r),o=GU(r);return{getAllTypes(){return n},getReferenceType(s){let u=`${s.container.$type}:${s.property}`,l=i.get(u);if(l)return l;throw new Error("Could not find reference type for "+u)},getTypeMetaData(s){var u;return(u=a.get(s))!==null&&u!==void 0?u:{name:s,mandatory:[]}},isInstance(s,u){return(0,IU.isAstNode)(s)&&this.isSubtype(s.$type,u)},isSubtype(s,u){if(s===u)return!0;let l=o.get(s);for(let c of l)if(this.isSubtype(c,u))return!0;return!1}}}Uc.interpretAstReflection=qU;function MU(t){let e=new $S.MultiMap;for(let n of t.interfaces){for(let i of n.properties)for(let a of i.typeAlternatives)a.reference&&e.add(n.name,[i.name,a.types[0]]);for(let i of n.printingSuperTypes){let a=e.get(i);e.addAll(n.name,a)}}let r=new Map;for(let[n,[i,a]]of e)r.set(`${n}:${i}`,a);return r}function FU(t){let e=new Map,r=(0,LU.collectAllProperties)(t.interfaces);for(let n of t.interfaces){let i=r.get(n.name),a=i.filter(s=>s.typeAlternatives.some(u=>u.array)),o=i.filter(s=>s.typeAlternatives.every(u=>!u.array&&u.types.includes("boolean")));(a.length>0||o.length>0)&&e.set(n.name,{name:n.name,mandatory:jU(a,o)})}return e}function jU(t,e){let r=[],n=t.concat(e).sort((i,a)=>i.name.localeCompare(a.name));for(let i of n){let a=t.includes(i)?"array":"boolean";r.push({name:i.name,type:a})}return r}function GU(t){let e=new $S.MultiMap;for(let r of t.interfaces)e.addAll(r.name,r.realSuperTypes);for(let r of t.unions)e.addAll(r.name,r.realSuperTypes);return e}});var OS=d(Kc=>{"use strict";Object.defineProperty(Kc,"__esModule",{value:!0});Kc.LangiumGrammarGrammar=void 0;var UU=Et(),Hc,HU=()=>Hc??(Hc=(0,UU.loadGrammarFromJson)(`{
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
}`));Kc.LangiumGrammarGrammar=HU});var IS=d(Fr=>{"use strict";Object.defineProperty(Fr,"__esModule",{value:!0});Fr.LangiumGrammarGeneratedModule=Fr.LangiumGrammarGeneratedSharedModule=Fr.LangiumGrammarParserConfig=Fr.LangiumGrammarLanguageMetaData=void 0;var KU=$e(),WU=OS();Fr.LangiumGrammarLanguageMetaData={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1};Fr.LangiumGrammarParserConfig={maxLookahead:3};Fr.LangiumGrammarGeneratedSharedModule={AstReflection:()=>new KU.LangiumGrammarAstReflection};Fr.LangiumGrammarGeneratedModule={Grammar:()=>(0,WU.LangiumGrammarGrammar)(),LanguageMetaData:()=>Fr.LangiumGrammarLanguageMetaData,parser:{ParserConfig:()=>Fr.LangiumGrammarParserConfig}}});var jr=d(_t=>{"use strict";Object.defineProperty(_t,"__esModule",{value:!0});_t.Deferred=_t.MutexLock=_t.interruptAndCheck=_t.isOperationCancelled=_t.OperationCancelled=_t.setInterruptionPeriod=_t.startCancelableOperation=_t.delayNextTick=void 0;var Wc=mi();function DS(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}_t.delayNextTick=DS;var ly=0,xS=10;function BU(){return ly=Date.now(),new Wc.CancellationTokenSource}_t.startCancelableOperation=BU;function VU(t){xS=t}_t.setInterruptionPeriod=VU;_t.OperationCancelled=Symbol("OperationCancelled");function LS(t){return t===_t.OperationCancelled}_t.isOperationCancelled=LS;async function zU(t){if(t===Wc.CancellationToken.None)return;let e=Date.now();if(e-ly>=xS&&(ly=e,await DS()),t.isCancellationRequested)throw _t.OperationCancelled}_t.interruptAndCheck=zU;var cy=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Wc.CancellationTokenSource}lock(e){this.cancel();let r=new Wc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{LS(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};_t.MutexLock=cy;var fy=class{constructor(){this.promise=new Promise((e,r)=>{this.resolve=n=>(e(n),this),this.reject=n=>(r(n),this)})}};_t.Deferred=fy});var Vc=d(Bc=>{"use strict";Object.defineProperty(Bc,"__esModule",{value:!0});Bc.DefaultScopeComputation=void 0;var dy=mi(),qS=Ie(),YU=Pr(),MS=jr(),py=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=dy.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=qS.streamContents,i=dy.CancellationToken.None){let a=[];this.exportNode(e,a,r);for(let o of n(e))await(0,MS.interruptAndCheck)(i),this.exportNode(o,a,r);return a}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=dy.CancellationToken.None){let n=e.parseResult.value,i=new YU.MultiMap;for(let a of(0,qS.streamAllContents)(n))await(0,MS.interruptAndCheck)(r),this.processNode(a,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let a=this.nameProvider.getName(e);a&&n.add(i,this.descriptions.createDescription(e,a,r))}}};Bc.DefaultScopeComputation=py});var Yc=d(Yi=>{"use strict";Object.defineProperty(Yi,"__esModule",{value:!0});Yi.DefaultScopeProvider=Yi.EMPTY_SCOPE=Yi.StreamScope=void 0;var XU=Ie(),zc=Dt(),Fo=class{constructor(e,r,n){this.elements=e,this.outerScope=r,this.caseInsensitive=n?.caseInsensitive}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}};Yi.StreamScope=Fo;Yi.EMPTY_SCOPE={getElement(){},getAllElements(){return zc.EMPTY_STREAM}};var hy=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=(0,XU.getDocument)(e.container).precomputedScopes;if(i){let o=e.container;do{let s=i.get(o);s.length>0&&r.push((0,zc.stream)(s).filter(u=>this.reflection.isSubtype(u.type,n))),o=o.$container}while(o)}let a=this.getGlobalScope(n,e);for(let o=r.length-1;o>=0;o--)a=this.createScope(r[o],a);return a}createScope(e,r,n){return new Fo((0,zc.stream)(e),r,n)}createScopeForNodes(e,r,n){let i=(0,zc.stream)(e).map(a=>{let o=this.nameProvider.getName(a);if(o)return this.descriptions.createDescription(a,o)}).nonNullable();return new Fo(i,r,n)}getGlobalScope(e,r){return new Fo(this.indexManager.allElements(e))}};Yi.DefaultScopeProvider=hy});var _i=d(jo=>{"use strict";Object.defineProperty(jo,"__esModule",{value:!0});jo.relativeURI=jo.equalURI=void 0;function JU(t,e){return t?.toString()===e?.toString()}jo.equalURI=JU;function QU(t,e){let r=t.path,n=e.path,i=r.split("/").filter(l=>l.length>0),a=n.split("/").filter(l=>l.length>0),o=0;for(;o<i.length&&i[o]===a[o];o++);let s="../".repeat(i.length-o),u=a.slice(o).join("/");return s+u}jo.relativeURI=QU});var jS=d(Go=>{"use strict";Object.defineProperty(Go,"__esModule",{value:!0});Go.LangiumGrammarScopeComputation=Go.LangiumGrammarScopeProvider=void 0;var ZU=Vc(),my=Yc(),Lu=Ie(),FS=Dt(),eH=_i(),Gr=$e(),yy=kt(),gy=class extends my.DefaultScopeProvider{constructor(e){super(e)}getScope(e){let r=this.reflection.getReferenceType(e);return r===Gr.AbstractType?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=(0,Lu.getDocument)(r.container).precomputedScopes,a=(0,Lu.findRootNode)(r.container);if(i&&a){let s=i.get(a);s.length>0&&(n=(0,FS.stream)(s).filter(u=>u.type===Gr.Interface||u.type===Gr.Type))}let o=this.getGlobalScope(e,r);return n?this.createScope(n,o):o}getGlobalScope(e,r){let n=(0,Lu.getContainerOfType)(r.container,Gr.isGrammar);if(!n)return my.EMPTY_SCOPE;let i=(0,FS.stream)(n.imports).map(yy.resolveImportUri).nonNullable(),a=this.indexManager.allElements(e).filter(o=>i.some(s=>(0,eH.equalURI)(o.documentUri,s)));return e===Gr.AbstractType&&(a=a.filter(o=>o.type===Gr.Interface||o.type===Gr.Type)),new my.StreamScope(a)}};Go.LangiumGrammarScopeProvider=gy;var vy=class extends ZU.DefaultScopeComputation{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),(0,Gr.isParserRule)(e)){if(!e.returnType&&!e.dataType){let a=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push({node:a,name:a.name,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(a)})}(0,Lu.streamAllContents)(e).forEach(a=>{if((0,Gr.isAction)(a)&&a.inferredType){let o=(0,yy.getActionType)(a);o&&r.push({node:e,name:o,type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)})}})}}processNode(e,r,n){(0,Gr.isReturnType)(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let a=e.$container;if(a&&(0,Gr.isParserRule)(e)&&!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(a,{node:o,name:o.name,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(o)})}}processActionNode(e,r,n){let i=(0,Lu.findRootNode)(e);if(i&&(0,Gr.isAction)(e)&&e.inferredType){let a=(0,yy.getActionType)(e);a&&n.add(i,{node:e,name:a,type:"Interface",documentUri:r.uri,path:this.astNodeLocator.getAstNodePath(e)})}}};Go.LangiumGrammarScopeComputation=vy});var by=d(cr=>{"use strict";var tH=cr&&cr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),rH=cr&&cr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),nH=cr&&cr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&tH(e,t,r);return rH(e,t),e};Object.defineProperty(cr,"__esModule",{value:!0});cr.LangiumGrammarValidator=cr.IssueCodes=cr.registerValidationChecks=void 0;var Ty=_o(),Xi=Ie(),Ji=Pr(),_y=Qe(),Qi=Et(),Ry=Dt(),Ve=nH($e()),Ay=$e(),xt=kt();function iH(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType],AtomType:[r.checkAtomTypeRefType,r.checkFragmentsInTypes]};e.register(n,r)}cr.registerValidationChecks=iH;var lr;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(lr=cr.IssueCodes||(cr.IssueCodes={}));var Sy=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",code:lr.GrammarNameUppercase})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>Ve.isParserRule(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(a=>Ve.isParserRule(a)&&!(0,xt.isDataTypeRule)(a));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",code:lr.EntryRuleTokenSyntax}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&(0,xt.isDataTypeRule)(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>(0,Ry.stream)(i.rules).filter(a=>!qu(a));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>(0,Ry.stream)(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let a=new Ji.MultiMap;n(e).forEach(u=>a.add(u.name,u));for(let[,u]of a.entriesGroupedByKey())u.length>1&&u.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let o=new Set,s=(0,xt.resolveTransitiveImports)(this.documents,e);for(let u of s)n(u).forEach(l=>o.add(l.name));for(let u of a.keys())o.has(u)&&a.get(u).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Ji.MultiMap;for(let i of e.imports){let a=(0,xt.resolveImport)(this.documents,i);a&&n.add(a,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((a,o)=>{o>0&&r("warning","The grammar is already being directly imported.",{node:a,tags:[Ty.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let a of e.imports){let o=(0,xt.resolveTransitiveImports)(this.documents,a);n.set(a,o)}let i=new Ji.MultiMap;for(let a of e.imports){let o=n.get(a);for(let s of e.imports){if(a===s)continue;let u=n.get(s),l=this.getDuplicateExportedRules(o,u);for(let c of l)i.add(a,c)}}for(let a of e.imports){let o=i.get(a);o.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+(0,Ry.stream)(o).distinct().join(", "),{node:a,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(s=>!r.includes(s)).flatMap(s=>s.rules),a=r.flatMap(s=>s.rules),o=new Set;for(let s of i){let u=s.name;for(let l of a){let c=l.name;u===c&&o.add(l.name)}}return o}checkGrammarTypeInfer(e,r){var n,i,a;let o=new Set;for(let u of e.types)o.add(u.name);for(let u of e.interfaces)o.add(u.name);(0,xt.resolveTransitiveImports)(this.documents,e).forEach(u=>{u.types.forEach(l=>o.add(l.name)),u.interfaces.forEach(l=>o.add(l.name))});for(let u of e.rules.filter(Ve.isParserRule)){if(qu(u))continue;let l=(0,xt.isDataTypeRule)(u),c=!u.returnType&&!u.dataType,f=(0,xt.getTypeNameWithoutError)(u);if(!l&&f&&o.has(f)===c){if((c||((n=u.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&u.inferredType===void 0)r("error",s(f,c),{node:u,property:"name",code:lr.MissingReturns});else if(c||((i=u.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=(0,Qi.findNodeForKeyword)(u.inferredType.$cstNode,"infers");r("error",s(f,c),{node:u.inferredType,property:"name",code:lr.InvalidInfers,data:m&&(0,_y.toDocumentSegment)(m)})}}else if(l&&c){let m=(0,Qi.findNodeForKeyword)(u.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:u,property:"inferredType",code:lr.InvalidInfers,data:m&&(0,_y.toDocumentSegment)(m)})}}for(let u of(0,Xi.streamAllContents)(e).filter(Ve.isAction)){let l=this.getActionType(u);if(l){let c=Boolean(u.inferredType),f=(0,xt.getTypeNameWithoutError)(u);if(u.type&&o.has(f)===c){let m=c?(0,Qi.findNodeForKeyword)(u.$cstNode,"infer"):(0,Qi.findNodeForKeyword)(u.$cstNode,"{");r("error",s(f,c),{node:u,property:"type",code:c?lr.SuperfluousInfer:lr.MissingInfer,data:m&&(0,_y.toDocumentSegment)(m)})}else if(l&&o.has(f)&&c&&u.$cstNode){let m=(0,Qi.findNodeForProperty)((a=u.inferredType)===null||a===void 0?void 0:a.$cstNode,"name"),v=(0,Qi.findNodeForKeyword)(u.$cstNode,"{");m&&v&&r("error",`${f} is a declared type and cannot be redefined.`,{node:u,property:"type",code:lr.SuperfluousInfer,data:{start:v.range.end,end:m.range.start}})}}}function s(u,l){return l?`The type '${u}' is already explicitly declared and cannot be inferred.`:`The type '${u}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",code:lr.HiddenGrammarTokens})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=(0,xt.terminalRegex)(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkUsedHiddenTerminalRule(e,r){let n=(0,Xi.getContainerOfType)(e,i=>Ve.isTerminalRule(i)||Ve.isParserRule(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ve.isTerminalRule(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ve.isTerminalRule(n)&&n.fragment&&(0,Xi.getContainerOfType)(e,Ve.isParserRule)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",code:lr.CrossRefTokenSyntax})}checkPackageImport(e,r){(0,xt.resolveImport)(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",code:lr.UnnecessaryFileExtension})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,code:lr.UseRegexTokens})}}checkGrammarForUnusedRules(e,r){let n=(0,Qi.getAllReachableRules)(e,!0);for(let i of e.rules)Ve.isTerminalRule(i)&&i.hidden||qu(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Ty.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Ji.MultiMap,i=new Set;for(let l of e.rules)Ve.isTerminalRule(l)&&l.name&&n.add(l.name,l),Ve.isParserRule(l)&&(0,Xi.streamAllContents)(l).filter(Ve.isKeyword).forEach(f=>i.add(f.value));let a=new Ji.MultiMap,o=new Ji.MultiMap;for(let l of e.imports){let c=(0,xt.resolveTransitiveImports)(this.documents,l);for(let f of c)for(let m of f.rules)Ve.isTerminalRule(m)&&m.name?a.add(m.name,l):Ve.isParserRule(m)&&m.name&&(0,Xi.streamAllContents)(m).filter(Ve.isKeyword).forEach(y=>o.add(y.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(o.has(l.name)){let c=o.get(l.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:l,property:"name"})}let s=new Ji.MultiMap;for(let l of i)for(let c of a.get(l))s.add(c,l);for(let[l,c]of s.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let u=new Ji.MultiMap;for(let[l,c]of a.entriesGroupedByKey()){let f=o.get(l);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>u.add(m,l))}for(let[l,c]of u.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!qu(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",code:lr.RuleNameUppercase})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&aH.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){(0,Xi.getContainerOfType)(e,Ay.isParserRule)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{(0,xt.isOptionalCardinality)(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,code:lr.OptionalUnorderedGroup})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=(0,Xi.streamAllContents)(e).filter(Ve.isParameterReference);for(let a of n)i.some(o=>o.parameter.ref===a)||r("hint",`Parameter '${a.name}' is unused.`,{node:a,tags:[Ty.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(qu(e))return;let n=e.dataType,i=(0,xt.isDataTypeRule)(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:"dataType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&(0,Ay.isRuleCall)(e.terminal)&&(0,Ay.isParserRule)(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;(0,Xi.streamAllContents)(e.terminal).map(a=>Ve.isCrossReference(a)?"ref":"other").find(a=>n?a!==n:(n=a,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){e.attributes.filter(n=>n.typeAlternatives.length>1).forEach(n=>{let i=o=>o.isRef?"ref":"other",a=i(n.typeAlternatives[0]);n.typeAlternatives.slice(1).some(o=>i(o)!==a)&&r("error",this.createMixedTypeError(n.name),{node:n,property:"typeAlternatives"})})}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!(0,xt.isPrimitiveType)(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(Ve.isParserRule(n)){let i=n.parameters.length,a=e.arguments.length;i!==a&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${a}.`,{node:e})}else Ve.isTerminalRule(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!(0,Qi.findNameAssignment)(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){Ve.isRuleCall(e.terminal)&&Ve.isParserRule(e.terminal.rule.ref)&&!(0,xt.isDataTypeRule)(e.terminal.rule.ref)&&r("error","Parser rules cannot be used for cross references.",{node:e.terminal,property:"rule"})}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkAtomTypeRefType(e,r){if(e?.refType){let n=this.checkReferenceToRuleButNotType(e?.refType);n&&r("error",n,{node:e,property:"refType"})}}checkFragmentsInTypes(e,r){var n,i;Ve.isParserRule((n=e.refType)===null||n===void 0?void 0:n.ref)&&(!((i=e.refType)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"refType"})}checkReferenceToRuleButNotType(e){if(e&&Ve.isParserRule(e.ref)&&!(0,xt.isDataTypeRule)(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=(0,xt.getTypeNameWithoutError)(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Ve.isCrossReference(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};cr.LangiumGrammarValidator=Sy;function qu(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var aH=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"])});var Qc=d(mn=>{"use strict";Object.defineProperty(mn,"__esModule",{value:!0});mn.DocumentValidator=mn.toDiagnosticSeverity=mn.getDiagnosticRange=mn.DefaultDocumentValidator=void 0;var Ur=qe(),GS=Et(),oH=Ie(),sH=Qe(),Xc=jr(),Cy=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r=Ur.CancellationToken.None){let n=e.parseResult,i=[];await(0,Xc.interruptAndCheck)(r);for(let a of n.lexerErrors){let o={severity:Ur.DiagnosticSeverity.Error,range:{start:{line:a.line-1,character:a.column-1},end:{line:a.line-1,character:a.column+a.length-1}},message:a.message,code:Jc.LexingError,source:this.getSource()};i.push(o)}for(let a of n.parserErrors){let o;if(isNaN(a.token.startOffset)){if("previousToken"in a){let s=a.previousToken;if(isNaN(s.startOffset))o=Ur.Range.create(0,0,0,0);else{let u=Ur.Position.create(s.endLine-1,s.endColumn);o=Ur.Range.create(u,u)}}}else o=(0,sH.tokenToRange)(a.token);if(o){let s={severity:Ur.DiagnosticSeverity.Error,range:o,message:a.message,code:Jc.ParsingError,source:this.getSource()};i.push(s)}}for(let a of e.references){let o=a.error;if(o){let s={containerType:o.container.$type,property:o.property,refText:o.reference.$refText},u={node:o.container,property:o.property,index:o.index,code:Jc.LinkingError,data:s};i.push(this.toDiagnostic("error",o.message,u))}}try{i.push(...await this.validateAst(n.value,e,r))}catch(a){if((0,Xc.isOperationCancelled)(a))throw a;console.error("An error occurred during validation:",a)}return await(0,Xc.interruptAndCheck)(r),i}async validateAst(e,r,n=Ur.CancellationToken.None){let i=[],a=(o,s,u)=>{i.push(this.toDiagnostic(o,s,u))};return await Promise.all((0,oH.streamAst)(e).map(async o=>{await(0,Xc.interruptAndCheck)(n);let s=this.validationRegistry.getChecks(o.$type);for(let u of s)await u(o,a,n)})),i}toDiagnostic(e,r,n){return{message:r,range:US(n),severity:HS(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};mn.DefaultDocumentValidator=Cy;function US(t){if(Ur.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=(0,GS.findNodeForProperty)(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=(0,GS.findNodeForKeyword)(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}mn.getDiagnosticRange=US;function HS(t){switch(t){case"error":return Ur.DiagnosticSeverity.Error;case"warning":return Ur.DiagnosticSeverity.Warning;case"info":return Ur.DiagnosticSeverity.Information;case"hint":return Ur.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}mn.toDiagnosticSeverity=HS;var Jc;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(Jc=mn.DocumentValidator||(mn.DocumentValidator={}))});var zS=d(Fn=>{"use strict";var uH=Fn&&Fn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),lH=Fn&&Fn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),cH=Fn&&Fn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&uH(e,t,r);return lH(e,t),e};Object.defineProperty(Fn,"__esModule",{value:!0});Fn.LangiumGrammarCodeActionProvider=void 0;var Hr=qe(),fH=qn(),KS=Ie(),WS=Qe(),dH=Et(),BS=Lo(),VS=_i(),pH=Qc(),Py=cH($e()),Kr=by(),Ey=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=a=>a&&n.push(a);for(let a of r.context.diagnostics)this.createCodeActions(a,e,i);return n}createCodeActions(e,r,n){switch(e.code){case Kr.IssueCodes.GrammarNameUppercase:case Kr.IssueCodes.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Kr.IssueCodes.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Kr.IssueCodes.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Kr.IssueCodes.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Kr.IssueCodes.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Kr.IssueCodes.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Kr.IssueCodes.MissingReturns:n(this.fixMissingReturns(e,r));break;case Kr.IssueCodes.InvalidInfers:case Kr.IssueCodes.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Kr.IssueCodes.MissingInfer:n(this.fixMissingInfer(e,r));break;case Kr.IssueCodes.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case pH.DocumentValidator.LinkingError:{let i=e.data;i&&i.containerType==="RuleCall"&&i.property==="rule"&&n(this.addNewRule(e,i,r)),i&&this.lookInGlobalScope(e,i,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n){let i=r.textDocument.getText(n.range);return{title:`Correct ${i} usage`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n)return{title:"Correct 'infer' usage",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.range.end,end:n.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){if(e.data)return{title:"Remove the 'infer' keyword",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.data,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let a=(0,WS.findLeafNodeAtOffset)(i,n),o=(0,KS.getContainerOfType)(a?.element,Py.isCharacterRange);if(o&&o.right&&o.$cstNode){let s=o.left.value,u=o.right.value;return{title:"Refactor into regular expression",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:o.$cstNode.range,newText:`/[${(0,BS.escapeRegExp)(s)}-${(0,BS.escapeRegExp)(u)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,a=[],o=(0,dH.findNodeForProperty)(n.$cstNode,"definesHiddenTokens");if(o){let s=o.range.start,u=o.offset,l=n.$cstNode.text.indexOf(")",u)+1;a.push({newText:"",range:{start:s,end:r.textDocument.positionAt(l)}})}for(let s of i){let u=s.ref;if(u&&Py.isTerminalRule(u)&&!u.hidden&&u.$cstNode){let l=u.$cstNode.range.start;a.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:a}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),a=n.parseResult.value.$cstNode;if(a){let o=(0,WS.findLeafNodeAtOffset)(a,i),s=(0,KS.getContainerOfType)(o?.element,Py.isParserRule);if(s&&s.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:s.$cstNode.range.end,end:s.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,a;let o={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},s=this.reflection.getReferenceType(o),u=this.indexManager.allElements(s).filter(m=>m.name===r.refText),l=[],c=-1,f=-1;for(let m of u){if((0,VS.equalURI)(m.documentUri,n.uri))continue;let v=hH(n.uri,m.documentUri),y,R="",P=n.parseResult.value,E=P.imports.find(b=>b.path&&v<b.path);if(E)y=(i=E.$cstNode)===null||i===void 0?void 0:i.range.start;else if(P.imports.length>0){let b=P.imports[P.imports.length-1].$cstNode.range.end;b&&(y={line:b.line+1,character:0})}else P.rules.length>0&&(y=(a=P.rules[0].$cstNode)===null||a===void 0?void 0:a.range.start,R=`
`);y&&((c<0||v.length<f)&&(c=l.length,f=v.length),l.push({title:`Add import to '${v}'`,kind:Hr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:y,end:y},newText:`import '${v}'
${R}`}]}}}))}return c>=0&&(l[c].isPreferred=!0),l}};Fn.LangiumGrammarCodeActionProvider=Ey;function hH(t,e){let r=fH.Utils.dirname(t),n=(0,VS.relativeURI)(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}});var ef=d(Zc=>{"use strict";Object.defineProperty(Zc,"__esModule",{value:!0});Zc.DefaultFoldingRangeProvider=void 0;var ky=qe(),mH=Ie(),yH=Qe(),Ny=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let a=(0,mH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){let s=o.value;this.shouldProcess(s)&&this.collectObjectFolding(e,s,r),this.shouldProcessContent(s)||a.prune()}while(!o.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let a=this.toFoldingRange(e,i);a&&n(a)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let a of(0,yH.flattenCst)(i))if(this.commentNames.includes(a.tokenType.name)){let o=this.toFoldingRange(e,a,ky.FoldingRangeKind.Comment);o&&n(o)}}}toFoldingRange(e,r,n){let i=r.range,a=i.start,o=i.end;if(!(o.line-a.line<2))return this.includeLastFoldingLine(r,n)||(o=e.textDocument.positionAt(e.textDocument.offsetAt({line:o.line,character:0})-1)),ky.FoldingRange.create(a.line,o.line,a.character,o.character,n)}includeLastFoldingLine(e,r){if(r===ky.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};Zc.DefaultFoldingRangeProvider=Ny});var YS=d(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.LangiumGrammarFoldingRangeProvider=void 0;var gH=ef(),vH=$e(),wy=class extends gH.DefaultFoldingRangeProvider{shouldProcessContent(e){return!(0,vH.isParserRule)(e)}};tf.LangiumGrammarFoldingRangeProvider=wy});var Iy=d(yn=>{"use strict";Object.defineProperty(yn,"__esModule",{value:!0});yn.Formatting=yn.FormattingRegion=yn.DefaultNodeFormatter=yn.AbstractFormatter=void 0;var rf=Et(),$y=hr(),TH=Ie(),XS=Qe(),Mu=Dt(),Oy=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new nf(e,this.collector)}formatDocument(e,r){return this.doDocumentFormat(e,r.options)}formatDocumentRange(e,r){return this.doDocumentFormat(e,r.options,r.range)}formatDocumentOnType(e,r){return this.doDocumentFormat(e,r.options,{start:{character:0,line:r.position.line},end:r.position})}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,a=(s,u,l)=>{var c,f;let m=this.nodeModeToKey(s,u),v=i.get(m),y=(c=l.options.priority)!==null&&c!==void 0?c:0,R=(f=v?.options.priority)!==null&&f!==void 0?f:0;(!v||R<=y)&&i.set(m,l)};this.collector=a,this.iterateAstFormatting(e,n);let o=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,o)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let a=n[n.length-1];if(a){let o=e.offsetAt(i.range.start),s=e.offsetAt(a.range.end);o<s&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=(0,TH.streamAllContents)(n).iterator(),a;do if(a=i.next(),!a.done){let o=a.value;this.insideRange(o.$cstNode.range,r)?this.format(o):i.prune()}while(!a.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let a={indentation:0,options:n,document:e.textDocument},o=[],u=this.iterateCstTree(e,a).iterator(),l,c;do if(c=u.next(),!c.done){let f=c.value,m=(0,$y.isLeafCstNode)(f),v=this.nodeModeToKey(f,"prepend"),y=r.get(v);if(r.delete(v),y){let E=this.createTextEdit(l,f,y,a);for(let b of E)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}let R=this.nodeModeToKey(f,"append"),P=r.get(R);if(r.delete(R),P){let E=(0,XS.getNextNode)(f);if(E){let b=this.createTextEdit(f,E,P,a);for(let S of b)S&&this.insideRange(S.range,i)&&this.isNecessary(S,e.textDocument)&&o.push(S)}}if(!y&&f.hidden){let E=this.createHiddenTextEdits(l,f,void 0,a);for(let b of E)b&&this.insideRange(b.range,i)&&this.isNecessary(b,e.textDocument)&&o.push(b)}m&&(l=f)}while(!c.done);return o}createHiddenTextEdits(e,r,n,i){var a;let o=r.range.start.line;if(e&&e.range.end.line===o)return[];let s=[],u={start:{character:0,line:o},end:r.range.start},l=i.document.getText(u),c=this.findFittingMove(u,(a=n?.moves)!==null&&a!==void 0?a:[],i),f=this.getExistingIndentationCharacterCount(l,i),v=this.getIndentationCharacterCount(i,c)-f;if(v===0)return[];let y="";v>0&&(y=(i.options.insertSpaces?" ":"	").repeat(v));let R=r.text.split(`
`);R[0]=l+R[0];for(let P=0;P<R.length;P++){let E=o+P,b={character:0,line:E};if(v>0)s.push({newText:y,range:{start:b,end:b}});else{let S=R[P],O=0;for(;O<S.length;O++){let F=S.charAt(O);if(F!==" "&&F!=="	")break}s.push({newText:"",range:{start:b,end:{line:E,character:Math.min(O,Math.abs(v))}}})}}return s}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var a;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let o={start:(a=e?.range.end)!==null&&a!==void 0?a:{character:0,line:0},end:r.range.start},s=this.findFittingMove(o,n.moves,i);if(!s)return[];let u=s.characters,l=s.lines,c=s.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return u!==void 0?m.push(this.createSpaceTextEdit(o,u,n.options)):l!==void 0?m.push(this.createLineTextEdit(o,l,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(o,Boolean(e),i)),(0,$y.isLeafCstNode)(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let a=e.end.character-e.start.character;r=this.fitIntoOptions(r,a,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let a=e.end.line-e.start.line;r=this.fitIntoOptions(r,a,i);let s=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${s}`,range:e}}createTabTextEdit(e,r,n){let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),o=r?1:0,s=Math.max(e.end.line-e.start.line,o);return{newText:`${`
`.repeat(s)}${a}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let a of r){if(a.lines!==void 0&&i<=a.lines)return a;if(a.lines===void 0&&i===0)return a}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Mu.TreeStreamImpl(i,a=>this.iterateCst(a,r)):Mu.EMPTY_STREAM}iterateCst(e,r){if(!(0,$y.isCompositeCstNode)(e))return Mu.EMPTY_STREAM;let n=r.indentation;return new Mu.StreamImpl(()=>({index:0}),i=>i.index<e.children.length?{done:!1,value:e.children[i.index++]}:(r.indentation=n,Mu.DONE_RESULT))}};yn.AbstractFormatter=Oy;var nf=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new yr(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new yr(r,this.collector)}property(e,r){let n=(0,rf.findNodeForProperty)(this.astNode.$cstNode,e,r);return new yr(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=(0,rf.findNodesForProperty)(this.astNode.$cstNode,n);r.push(...i)}return new yr(r,this.collector)}keyword(e,r){let n=(0,rf.findNodeForKeyword)(this.astNode.$cstNode,e,r);return new yr(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=(0,rf.findNodesForKeyword)(this.astNode.$cstNode,n);r.push(...i)}return new yr(r,this.collector)}cst(e){return new yr([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new yr([],this.collector);let a=n[0],o=i[0];if(a.offset>o.offset){let s=a;a=o,o=s}return new yr((0,XS.getInteriorNodes)(a,o),this.collector)}};yn.DefaultNodeFormatter=nf;var yr=class{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new yr(this.nodes.slice(e,r),this.collector)}};yn.FormattingRegion=yr;var _H;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function a(c){return o(1,c)}t.newLine=a;function o(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=o;function s(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=s;function u(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=u;function l(c,f){var m,v,y,R,P,E;let b=(m=c.lines)!==null&&m!==void 0?m:0,S=(v=f.lines)!==null&&v!==void 0?v:0,O=(y=c.tabs)!==null&&y!==void 0?y:0,F=(R=f.tabs)!==null&&R!==void 0?R:0,W=(P=c.characters)!==null&&P!==void 0?P:0,re=(E=f.characters)!==null&&E!==void 0?E:0;return b<S?-1:b>S?1:O<F?-1:O>F?1:W<re?-1:W>re?1:0}})(_H=yn.Formatting||(yn.Formatting={}))});var JS=d(jn=>{"use strict";var RH=jn&&jn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),AH=jn&&jn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),SH=jn&&jn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&RH(e,t,r);return AH(e,t),e};Object.defineProperty(jn,"__esModule",{value:!0});jn.LangiumGrammarFormatter=void 0;var Ee=Iy(),Zi=SH($e()),Dy=class extends Ee.AbstractFormatter{format(e){if(Zi.isCrossReference(e))this.getNodeFormatter(e).properties("type","terminal").surround(Ee.Formatting.noSpace());else if(Zi.isParserRule(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(Ee.Formatting.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(Ee.Formatting.oneSpace()):r.property("name").append(Ee.Formatting.noSpace()),r.properties("parameters").append(Ee.Formatting.noSpace()),r.keywords(",").append(Ee.Formatting.oneSpace()),r.keywords("<").append(Ee.Formatting.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(Ee.Formatting.noSpace()),r.interior(i,n).prepend(Ee.Formatting.indent()),n.prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(),Ee.Formatting.newLine())),r.node(e).prepend(Ee.Formatting.noIndent())}else if(Zi.isTerminalRule(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(Ee.Formatting.oneSpace()),r.keyword("returns").append(Ee.Formatting.oneSpace())),r.keywords("hidden","terminal","fragment").append(Ee.Formatting.oneSpace()),r.keyword(":").prepend(Ee.Formatting.noSpace()),r.keyword(";").prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(),Ee.Formatting.newLine())),r.node(e).prepend(Ee.Formatting.noIndent())}else if(Zi.isAction(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(Ee.Formatting.noSpace()),r.keywords(".","+=","=").surround(Ee.Formatting.noSpace()),r.keyword("}").prepend(Ee.Formatting.noSpace())}else if(Zi.isInferredType(e))this.getNodeFormatter(e).keywords("infer","infers").append(Ee.Formatting.oneSpace());else if(Zi.isAssignment(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(Ee.Formatting.noSpace());else if(Zi.isRuleCall(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(Ee.Formatting.noSpace()),r.keyword(",").append(Ee.Formatting.oneSpace()),r.properties("arguments").append(Ee.Formatting.noSpace())}Zi.isAbstractElement(e)&&this.getNodeFormatter(e).property("cardinality").prepend(Ee.Formatting.noSpace())}};jn.LangiumGrammarFormatter=Dy});var sf=d(Rt=>{"use strict";Object.defineProperty(Rt,"__esModule",{value:!0});Rt.SemanticTokensDecoder=Rt.AbstractSemanticTokenProvider=Rt.SemanticTokensBuilder=Rt.DefaultSemanticTokenOptions=Rt.AllSemanticTokenModifiers=Rt.AllSemanticTokenTypes=void 0;var pe=qe(),af=Et(),bH=Ie();Rt.AllSemanticTokenTypes={[pe.SemanticTokenTypes.class]:0,[pe.SemanticTokenTypes.comment]:1,[pe.SemanticTokenTypes.enum]:2,[pe.SemanticTokenTypes.enumMember]:3,[pe.SemanticTokenTypes.event]:4,[pe.SemanticTokenTypes.function]:5,[pe.SemanticTokenTypes.interface]:6,[pe.SemanticTokenTypes.keyword]:7,[pe.SemanticTokenTypes.macro]:8,[pe.SemanticTokenTypes.method]:9,[pe.SemanticTokenTypes.modifier]:10,[pe.SemanticTokenTypes.namespace]:11,[pe.SemanticTokenTypes.number]:12,[pe.SemanticTokenTypes.operator]:13,[pe.SemanticTokenTypes.parameter]:14,[pe.SemanticTokenTypes.property]:15,[pe.SemanticTokenTypes.regexp]:16,[pe.SemanticTokenTypes.string]:17,[pe.SemanticTokenTypes.struct]:18,[pe.SemanticTokenTypes.type]:19,[pe.SemanticTokenTypes.typeParameter]:20,[pe.SemanticTokenTypes.variable]:21};Rt.AllSemanticTokenModifiers={[pe.SemanticTokenModifiers.abstract]:1<<0,[pe.SemanticTokenModifiers.async]:1<<1,[pe.SemanticTokenModifiers.declaration]:1<<2,[pe.SemanticTokenModifiers.defaultLibrary]:1<<3,[pe.SemanticTokenModifiers.definition]:1<<4,[pe.SemanticTokenModifiers.deprecated]:1<<5,[pe.SemanticTokenModifiers.documentation]:1<<6,[pe.SemanticTokenModifiers.modification]:1<<7,[pe.SemanticTokenModifiers.readonly]:1<<8,[pe.SemanticTokenModifiers.static]:1<<9};Rt.DefaultSemanticTokenOptions={legend:{tokenTypes:Object.keys(Rt.AllSemanticTokenTypes),tokenModifiers:Object.keys(Rt.AllSemanticTokenModifiers)},full:{delta:!0},range:!0};var of=class extends pe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,a){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:a})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}};Rt.SemanticTokensBuilder=of;var xy=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}semanticHighlight(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightRange(e,r,n=pe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}semanticHighlightDelta(e,r,n=pe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new of;return this.tokensBuilders.set(e.uri.toString(),n),n}computeHighlighting(e,r,n){let i=e.parseResult.value;if(this.highlightElement(i,r)==="prune")return;let a=(0,bH.streamAllContents)(i).iterator(),o;do if(o=a.next(),!o.done){if(n.isCancellationRequested)break;let s=o.value,u=s.$cstNode.range,l=this.compareRange(u);if(l===1)break;if(l===-1)continue;this.highlightElement(s,r)==="prune"&&a.prune()}while(!o.done)}compareRange(e){if(!this.currentRange)return 0;let r=typeof e=="number"?e:e.start.line;return(typeof e=="number"?e:e.end.line)<this.currentRange.start.line?-1:r>this.currentRange.end.line?1:0}highlightToken(e){var r;let{range:n,type:i}=e,a=e.modifier;if(this.compareRange(n)!==0||!this.currentDocument||!this.currentTokensBuilder)return;let o=Rt.AllSemanticTokenTypes[i],s=0;if(a!==void 0){typeof a=="string"&&(a=[a]);for(let c of a){let f=Rt.AllSemanticTokenModifiers[c];s|=f}}let u=n.start.line,l=n.end.line;if(u===l){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(u,c,f,o,s)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(u,c,m-f,o,s)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:u+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,o,s);for(let m=u+1;m<l;m++){let v=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-v-1,o,s)}this.currentTokensBuilder.push(l,0,n.end.character,o,s)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let a=(0,af.findNodeForProperty)(e.node.$cstNode,e.property,e.index);a&&r.push(a)}else r.push(...(0,af.findNodesForProperty)(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let a of r)this.highlightNode({node:a,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:a,modifier:o}=e,s=[];if(typeof a=="number"){let u=(0,af.findNodeForKeyword)(r.$cstNode,n,a);u&&s.push(u)}else s.push(...(0,af.findNodesForKeyword)(r.$cstNode,n));for(let u of s)this.highlightNode({node:u,type:i,modifier:o})}highlightNode(e){let{node:r,type:n,modifier:i}=e,a=r.range;this.highlightToken({range:a,type:n,modifier:i})}};Rt.AbstractSemanticTokenProvider=xy;var CH;(function(t){function e(n,i){let a=new Map;Object.entries(Rt.AllSemanticTokenTypes).forEach(([u,l])=>a.set(l,u));let o=0,s=0;return r(n.data,5).map(u=>{o+=u[0],u[0]!==0&&(s=0),s+=u[1];let l=u[2];return{offset:i.textDocument.offsetAt({line:o,character:s}),tokenType:a.get(u[3]),tokenModifiers:u[4],text:i.textDocument.getText({start:{line:o,character:s},end:{line:o,character:s+l}})}})}t.decode=e;function r(n,i){let a=[];for(let o=0;o<n.length;o+=i){let s=n.slice(o,o+i);a.push(s)}return a}})(CH=Rt.SemanticTokensDecoder||(Rt.SemanticTokensDecoder={}))});var QS=d(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.LangiumGrammarSemanticTokenProvider=void 0;var ea=qe(),PH=sf(),ta=$e(),Ly=class extends PH.AbstractSemanticTokenProvider{highlightElement(e,r){var n;(0,ta.isAssignment)(e)?r({node:e,property:"feature",type:ea.SemanticTokenTypes.property}):(0,ta.isAction)(e)?e.feature&&r({node:e,property:"feature",type:ea.SemanticTokenTypes.property}):(0,ta.isReturnType)(e)?r({node:e,property:"name",type:ea.SemanticTokenTypes.type}):(0,ta.isAtomType)(e)?(e.primitiveType||e.refType)&&r({node:e,property:e.primitiveType?"primitiveType":"refType",type:ea.SemanticTokenTypes.type}):(0,ta.isParameter)(e)?r({node:e,property:"name",type:ea.SemanticTokenTypes.parameter}):(0,ta.isParameterReference)(e)?r({node:e,property:"parameter",type:ea.SemanticTokenTypes.parameter}):(0,ta.isRuleCall)(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ea.SemanticTokenTypes.type}):(0,ta.isTypeAttribute)(e)&&r({node:e,property:"name",type:ea.SemanticTokenTypes.property})}};uf.LangiumGrammarSemanticTokenProvider=Ly});var e0=d(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.LangiumGrammarNameProvider=void 0;var EH=xo(),kH=Et(),ZS=$e(),qy=class extends EH.DefaultNameProvider{getName(e){return(0,ZS.isAssignment)(e)?e.feature:super.getName(e)}getNameNode(e){return(0,ZS.isAssignment)(e)?(0,kH.findNodeForProperty)(e.$cstNode,"feature"):super.getNameNode(e)}};lf.LangiumGrammarNameProvider=qy});var jy=d(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.DefaultReferences=void 0;var NH=Et(),t0=hr(),ra=Ie(),My=Qe(),r0=Dt(),wH=_i(),Fy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=(0,NH.findAssignment)(e),n=e.element;if(r&&n){let i=n[r.feature];if((0,t0.isReference)(i))return i.ref;if(Array.isArray(i)){for(let a of i)if((0,t0.isReference)(a)&&a.$refNode&&a.$refNode.offset<=e.offset&&a.$refNode.end>=e.end)return a.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||(0,My.isCstChildNode)(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n||r.$cstNode}}findReferences(e,r){return r.onlyLocal?this.findLocalReferences(e,r.includeDeclaration):this.findGlobalReferences(e,r.includeDeclaration)}findGlobalReferences(e,r=!1){let n=[];if(r){let i=this.getReferenceToSelf(e);i&&n.push(i)}return n.push(...this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e))),(0,r0.stream)(n)}findLocalReferences(e,r=!1){let i=(0,ra.getDocument)(e).parseResult.value,a=[];if(r){let o=this.getReferenceToSelf(e);o&&a.push(o)}return(0,ra.streamAst)(i).forEach(o=>{(0,ra.streamReferences)(o).forEach(({reference:s})=>{if(s.ref===e&&s.$refNode){let u=s.$refNode;a.push({sourceUri:(0,ra.getDocument)(u.element).uri,sourcePath:this.nodeLocator.getAstNodePath(u.element),targetUri:(0,ra.getDocument)(e).uri,targetPath:this.nodeLocator.getAstNodePath(e),segment:(0,My.toDocumentSegment)(u),local:(0,wH.equalURI)((0,ra.getDocument)(u.element).uri,(0,ra.getDocument)(e).uri)})}})}),(0,r0.stream)(a)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=(0,ra.getDocument)(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:(0,My.toDocumentSegment)(r),local:!0}}}};cf.DefaultReferences=Fy});var s0=d(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.LangiumGrammarReferences=void 0;var $H=jy(),er=Ie(),n0=Qe(),i0=Et(),a0=Dt(),Gy=_i(),Bt=$e(),o0=kt(),ff=gi(),Uy=class extends $H.DefaultReferences{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.element,n=(0,i0.findAssignment)(e);if(n&&n.feature==="feature"){if((0,Bt.isAssignment)(r))return this.findAssignmentDeclaration(r);if((0,Bt.isAction)(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findLocalReferences(e,r=!1){if((0,Bt.isTypeAttribute)(e)){let i=(0,er.getDocument)(e).parseResult.value;return this.findLocalReferencesToTypeAttribute(e,i,r)}else return super.findLocalReferences(e,r)}findGlobalReferences(e,r=!1){return(0,Bt.isTypeAttribute)(e)?this.findReferencesToTypeAttribute(e,r):super.findGlobalReferences(e,r)}findLocalReferencesToTypeAttribute(e,r,n){let i=[],a=(0,er.getContainerOfType)(e,Bt.isInterface);if(a){let o=(0,ff.collectChildrenTypes)(a,this,this.documents,this.nodeLocator),s=[];if(o.forEach(u=>{let l=this.findLocalRulesWithReturnType(u,r);s.push(...l)}),(0,Gy.equalURI)((0,er.getDocument)(e).uri,(0,er.getDocument)(r).uri)&&n){let u=this.getReferenceToSelf(e);u&&i.push(u)}s.forEach(u=>{let l=this.createReferencesToAttribute(u,e);i.push(...l)})}return(0,a0.stream)(i)}findReferencesToTypeAttribute(e,r){let n=[],i=(0,er.getContainerOfType)(e,Bt.isInterface);if(i){if(r){let s=this.getReferenceToSelf(e);s&&n.push(s)}let a=(0,ff.collectChildrenTypes)(i,this,this.documents,this.nodeLocator),o=[];a.forEach(s=>{let u=this.findRulesWithReturnType(s);o.push(...u)}),o.forEach(s=>{let u=this.createReferencesToAttribute(s,e);n.push(...u)})}return(0,a0.stream)(n)}createReferencesToAttribute(e,r){let n=[];if((0,Bt.isParserRule)(e)){let i=(0,o0.extractAssignments)(e.definition).find(a=>a.feature===r.name);if(i?.$cstNode){let a=this.nameProvider.getNameNode(i);a&&n.push({sourceUri:(0,er.getDocument)(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:(0,er.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,n0.toDocumentSegment)(a),local:(0,Gy.equalURI)((0,er.getDocument)(i).uri,(0,er.getDocument)(r).uri)})}}else{if(e.feature===r.name){let a=(0,i0.findNodeForProperty)(e.$cstNode,"feature");a&&n.push({sourceUri:(0,er.getDocument)(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:(0,er.getDocument)(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:(0,n0.toDocumentSegment)(a),local:(0,Gy.equalURI)((0,er.getDocument)(e).uri,(0,er.getDocument)(r).uri)})}let i=(0,er.getContainerOfType)(e,Bt.isParserRule);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=(0,er.getContainerOfType)(e,Bt.isParserRule),i=(0,o0.getActionAtElement)(e);if(i){let a=this.findActionDeclaration(i,e.feature);if(a)return a}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&((0,Bt.isInterface)(n.returnType.ref)||(0,Bt.isType)(n.returnType.ref))){let a=(0,ff.collectSuperTypes)(n.returnType.ref);for(let o of a){let s=o.attributes.find(u=>u.name===e.feature);if(s)return s}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,a=(0,ff.collectSuperTypes)(e.type.ref);for(let o of a){let s=o.attributes.find(u=>u.name===i);if(s)return s}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let a=this.documents.getOrCreateDocument(i.sourceUri),o=this.nodeLocator.getAstNode(a.parseResult.value,i.sourcePath);((0,Bt.isParserRule)(o)||(0,Bt.isAction)(o))&&r.push(o)}),r}findLocalRulesWithReturnType(e,r){let n=[];return(0,er.streamAst)(r).filter(a=>{var o,s;return(0,Bt.isParserRule)(a)&&((o=a.returnType)===null||o===void 0?void 0:o.ref)===e||(0,Bt.isAction)(a)&&((s=a.type)===null||s===void 0?void 0:s.ref)===e}).forEach(a=>{((0,Bt.isParserRule)(a)||(0,Bt.isAction)(a))&&n.push(a)}),n}};df.LangiumGrammarReferences=Uy});var Wy=d(Wr=>{"use strict";var OH=Wr&&Wr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),IH=Wr&&Wr.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),DH=Wr&&Wr.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&OH(e,t,r);return IH(e,t),e};Object.defineProperty(Wr,"__esModule",{value:!0});Wr.findFirstFeatures=Wr.findNextFeatures=void 0;var tr=DH($e()),Ri=kt(),xH=hr(),LH=Ie(),qH=Et();function MH(t,e){let r={stacks:t,tokens:e};return FH(r),r.stacks.flat().forEach(i=>{i.property=void 0}),c0(r.stacks).map(i=>i[i.length-1])}Wr.findNextFeatures=MH;function Hy(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,a=[],o=e.feature;if(n.has(o))return[];n.add(o);let s,u=o;for(;u.$container;)if(tr.isGroup(u.$container)){s=u.$container;break}else if(tr.isAbstractElement(u.$container))u=u.$container;else break;if((0,Ri.isArrayCardinality)(u.cardinality)){let l=Uo({next:{feature:u,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of l)i.add(c.feature);a.push(...l)}if(s){let l=s.elements.indexOf(u);l!==void 0&&l<s.elements.length-1&&a.push(...l0({feature:s,type:e.type,new:!1},l+1,r,n,i)),a.every(c=>(0,Ri.isOptionalCardinality)(c.feature.cardinality)||(0,Ri.isOptionalCardinality)(r.get(c.feature))||i.has(c.feature))&&a.push(...Hy({next:{feature:s,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return a}function u0(t){return(0,xH.isAstNode)(t)&&(t={feature:t}),Uo({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}Wr.findFirstFeatures=u0;function Uo(t){var e,r,n;let{next:i,cardinalities:a,visited:o,plus:s}=t;if(i===void 0)return[];let{feature:u,type:l}=i;if(tr.isGroup(u)){if(o.has(u))return[];o.add(u)}if(tr.isGroup(u))return l0(i,0,a,o,s).map(c=>pf(c,u.cardinality,a));if(tr.isAlternatives(u)||tr.isUnorderedGroup(u))return u.elements.flatMap(c=>Uo({next:{feature:c,new:!1,type:l},cardinalities:a,visited:o,plus:s})).map(c=>pf(c,u.cardinality,a));if(tr.isAssignment(u)){let c={feature:u.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:u.feature};return Uo({next:c,cardinalities:a,visited:o,plus:s}).map(f=>pf(f,u.cardinality,a))}else{if(tr.isAction(u))return Hy({next:{feature:u,new:!0,type:(0,Ri.getTypeName)(u),property:(r=i.property)!==null&&r!==void 0?r:u.feature},cardinalities:a,visited:o,plus:s});if(tr.isRuleCall(u)&&tr.isParserRule(u.rule.ref)){let c=u.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=(0,Ri.getExplicitRuleType)(c))!==null&&n!==void 0?n:c.name,property:i.property};return Uo({next:f,cardinalities:a,visited:o,plus:s}).map(m=>pf(m,u.cardinality,a))}else return[i]}}function pf(t,e,r){return r.set(t.feature,e),t}function l0(t,e,r,n,i){var a;let o=[],s;for(;e<t.feature.elements.length&&(s={feature:t.feature.elements[e++],new:!1,type:t.type},o.push(...Uo({next:s,cardinalities:r,visited:n,plus:i})),!!(0,Ri.isOptionalCardinality)((a=s.feature.cardinality)!==null&&a!==void 0?a:r.get(s.feature))););return o}function FH(t){for(let e of t.tokens){let r=c0(t.stacks,e);t.stacks=r}}function c0(t,e){let r=[];for(let n of t)r.push(...jH(n,e));return r}function jH(t,e){let r=new Map,n=new Set(t.map(a=>a.feature).filter(GH)),i=[];for(;t.length>0;){let a=t.pop(),o=Hy({next:a,cardinalities:r,plus:n,visited:new Set}).filter(s=>e?Ky(s.feature,e):!0);for(let s of o)i.push([...t,s]);if(!o.every(s=>(0,Ri.isOptionalCardinality)(s.feature.cardinality)||(0,Ri.isOptionalCardinality)(r.get(s.feature))))break}return i}function GH(t){if(t.cardinality==="+")return!0;let e=(0,LH.getContainerOfType)(t,tr.isAssignment);return!!(e&&e.cardinality==="+")}function Ky(t,e){if(tr.isKeyword(t))return t.value===e.image;if(tr.isRuleCall(t))return UH(t.rule.ref,e);if(tr.isCrossReference(t)){let r=(0,qH.getCrossReferenceTerminal)(t);if(r)return Ky(r,e)}return!1}function UH(t,e){return tr.isParserRule(t)?u0(t.definition).some(n=>Ky(n.feature,e)):tr.isTerminalRule(t)?new RegExp((0,Ri.terminalRegex)(t)).test(e.image):!1}});var Vy=d(Gn=>{"use strict";var HH=Gn&&Gn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),KH=Gn&&Gn.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),WH=Gn&&Gn.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&HH(e,t,r);return KH(e,t),e};Object.defineProperty(Gn,"__esModule",{value:!0});Gn.DefaultCompletionProvider=void 0;var Fu=qe(),ju=WH($e()),BH=kt(),VH=Ie(),zH=Qe(),f0=Et(),d0=Dt(),hf=Wy(),By=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let i=e.parseResult.value.$cstNode;if(!i)return;let a=[],o=e.textDocument,s=o.getText(),u=o.offsetAt(r.position),l=E=>{let b=this.fillCompletionItem(o,u,E);b&&a.push(b)},c=(0,zH.findLeafNodeAtOffset)(i,this.backtrackToAnyToken(s,u)),f={document:e,textDocument:o,node:c?.element,offset:u,position:r.position};if(!c){let E=(0,f0.getEntryRule)(this.grammar);return await this.completionForRule(f,E,l),Fu.CompletionList.create(a,!0)}let m=this.backtrackToTokenStart(s,u),v=this.findFeaturesAt(o,m),y=[],R=this.canReparse()&&u!==m;R&&(y=this.findFeaturesAt(o,u));let P=E=>ju.isKeyword(E.feature)?E.feature.value:E.feature;return await Promise.all((0,d0.stream)(v).distinct(P).map(E=>this.completionFor(f,E,l))),R&&await Promise.all((0,d0.stream)(y).exclude(v,P).distinct(P).map(E=>this.completionFor(f,E,l))),Fu.CompletionList.create(a,!0)}canReparse(){return!1}findFeaturesAt(e,r){let n=e.getText({start:Fu.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),a=i.tokens;if(i.tokenIndex===0){let u=(0,f0.getEntryRule)(this.grammar),l=(0,hf.findFirstFeatures)({feature:u.definition,new:!0,type:(0,BH.getExplicitRuleType)(u)});return a.length>0?(a.shift(),(0,hf.findNextFeatures)(l.map(c=>[c]),a)):l}let o=[...a].splice(i.tokenIndex);return(0,hf.findNextFeatures)([i.elementStack.map(u=>({feature:u}))],o)}backtrackToAnyToken(e,r){for(r>=e.length&&(r=e.length-1);r>0&&/\s/.test(e.charAt(r));)r--;return r}backtrackToTokenStart(e,r){if(r<1)return r;let n=this.grammarConfig.nameRegexp,i=e.charAt(r-1);for(;r>0&&n.test(i);)r--,i=e.charAt(r-1);return r}async completionForRule(e,r,n){if(ju.isParserRule(r)){let i=(0,hf.findFirstFeatures)(r.definition);await Promise.all(i.map(a=>this.completionFor(e,a,n)))}}completionFor(e,r,n){if(ju.isKeyword(r.feature))return this.completionForKeyword(e,r.feature,n);if(ju.isCrossReference(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=(0,VH.getContainerOfType)(r.feature,ju.isAssignment),a=e.node;if(i&&a){if(r.type&&(r.new||a.$type!==r.type)&&(a={$type:r.type,$container:a,$containerProperty:r.property}),!e)return;let o={reference:{},container:a,property:i.feature};try{let s=this.scopeProvider.getScope(o),u=new Set;s.getAllElements().forEach(l=>{!u.has(l.name)&&this.filterCrossReference(l)&&(n(this.createReferenceCompletionItem(l)),u.add(l.name))})}catch(s){console.error(s)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:Fu.CompletionItemKind.Reference,detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n({label:r.value,kind:Fu.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r,n){var i,a;let o;if(typeof n.label=="string")o=n.label;else if("node"in n){let c=this.nameProvider.getName(n.node);if(!c)return;o=c}else if("nodeDescription"in n)o=n.nodeDescription.name;else return;let s;typeof((i=n.textEdit)===null||i===void 0?void 0:i.newText)=="string"?s=n.textEdit.newText:typeof n.insertText=="string"?s=n.insertText:s=o;let u=(a=n.textEdit)!==null&&a!==void 0?a:this.buildCompletionTextEdit(e,r,o,s);return u?{additionalTextEdits:n.additionalTextEdits,command:n.command,commitCharacters:n.commitCharacters,data:n.data,detail:n.detail,documentation:n.documentation,filterText:n.filterText,insertText:n.insertText,insertTextFormat:n.insertTextFormat,insertTextMode:n.insertTextMode,kind:n.kind,labelDetails:n.labelDetails,preselect:n.preselect,sortText:n.sortText,tags:n.tags,textEditText:n.textEditText,textEdit:u,label:o}:void 0}buildCompletionTextEdit(e,r,n,i){let a=e.getText(),o=this.backtrackToTokenStart(a,r),s=a.substring(o,r);if(this.charactersFuzzyMatch(s,n)){let u=e.positionAt(o),l=e.positionAt(r);return{newText:i,range:{start:u,end:l}}}else return}isWordCharacterAt(e,r){return this.grammarConfig.nameRegexp.test(e.charAt(r))}charactersFuzzyMatch(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,a=0,o=r.length;for(let s=0;s<o;s++){let u=r.charCodeAt(s),l=e.charCodeAt(a);if((u===l||this.toUpperCharCode(u)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,u)),n&&a++,a===e.length))return!0;i=u}return!1}isWordTransition(e,r){return p0<=e&&e<=h0&&YH<=r&&r<=XH||e===m0&&r!==m0}toUpperCharCode(e){return p0<=e&&e<=h0?e-32:e}};Gn.DefaultCompletionProvider=By;var p0="a".charCodeAt(0),h0="z".charCodeAt(0),YH="A".charCodeAt(0),XH="Z".charCodeAt(0),m0="_".charCodeAt(0)});var g0=d(y0=>{"use strict";Object.defineProperty(y0,"__esModule",{value:!0})});var Yy=d(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.DefaultDocumentHighlightProvider=void 0;var JH=qe(),QH=Ie(),ZH=Qe(),eK=_i(),zy=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=(0,ZH.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclaration(i);if(a){let o=[],u={onlyLocal:!0,includeDeclaration:(0,eK.equalURI)((0,QH.getDocument)(a).uri,e.uri)};return this.references.findReferences(a,u).forEach(l=>{o.push(this.createDocumentHighlight(l))}),o}}createDocumentHighlight(e){return JH.DocumentHighlight.create(e.segment.range)}};mf.DefaultDocumentHighlightProvider=zy});var T0=d(v0=>{"use strict";Object.defineProperty(v0,"__esModule",{value:!0})});var Jy=d(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.DefaultDocumentSymbolProvider=void 0;var tK=qe(),rK=Ie(),Xy=class{constructor(e){this.nameProvider=e.references.NameProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let a=this.nameProvider.getName(r);return[{kind:this.getSymbolKind(r.$type),name:a??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of(0,rK.streamContents)(r)){let a=this.getSymbol(e,i);n.push(...a)}if(n.length>0)return n}getSymbolKind(e){return tK.SymbolKind.Field}};yf.DefaultDocumentSymbolProvider=Xy});var _0=d(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.AbstractExecuteCommandHandler=void 0;var nK=qe(),Qy=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=nK.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};gf.AbstractExecuteCommandHandler=Qy});var eg=d(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.DefaultDefinitionProvider=void 0;var iK=qe(),aK=Ie(),oK=Qe(),Zy=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,a=(0,oK.findDeclarationNodeAtOffset)(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a)return this.collectLocationLinks(a,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[iK.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.element.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.element){let n=(0,aK.getDocument)(r.element);if(r&&n)return{source:e,target:r,targetDocument:n}}}};vf.DefaultDefinitionProvider=Zy});var rg=d(Ho=>{"use strict";Object.defineProperty(Ho,"__esModule",{value:!0});Ho.MultilineCommentHoverProvider=Ho.AstNodeHoverProvider=void 0;var R0=Qe(),Tf=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let a=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(a){let o=e.textDocument.offsetAt(r.position),s=(0,R0.findDeclarationNodeAtOffset)(a,o,this.grammarConfig.nameRegexp);if(s&&s.offset+s.length>o){let u=this.references.findDeclaration(s);if(u)return this.getAstNodeHoverContent(u)}}}};Ho.AstNodeHoverProvider=Tf;var tg=class extends Tf{constructor(){super(...arguments),this.commentContentRegex=/\/\*([\s\S]*?)\*\//}getAstNodeHoverContent(e){let r=(0,R0.findCommentNode)(e.$cstNode,this.grammarConfig.multilineCommentRules),n;if(r){let i=this.commentContentRegex.exec(r.text);i&&i[1]&&(n=this.getCommentContent(i[1]))}if(n)return{contents:{kind:"markdown",value:n}}}getCommentContent(e){return e.split(`
`).map(n=>(n=n.trim(),n.startsWith("*")&&(n=n.substring(1).trim()),n)).join(" ").trim()}};Ho.MultilineCommentHoverProvider=tg});var A0=d(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.AbstractGoToImplementationProvider=void 0;var sK=qe(),uK=Qe(),ng=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getImplementation(e,r,n=sK.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,uK.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToImplementationLocationLinks(o,n)}}}};_f.AbstractGoToImplementationProvider=ng});var na=d(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.DefaultLangiumDocuments=Ai.DefaultLangiumDocumentFactory=Ai.DocumentState=void 0;var lK=km(),cK=qn(),fK=Dt(),Ko;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(Ko=Ai.DocumentState||(Ai.DocumentState={}));var ig=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??cK.URI.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let a;if(n)a={parseResult:e,uri:r,state:Ko.Parsed,references:[],textDocument:n};else{let o=this.createTextDocumentGetter(r,i);a={parseResult:e,uri:r,state:Ko.Parsed,references:[],get textDocument(){return o()}}}return e.value.$document=a,a}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e.state=Ko.Parsed,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=lK.TextDocument.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}};Ai.DefaultLangiumDocumentFactory=ig;var ag=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return(0,fK.stream)(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ko.Changed,n.references=[],n.precomputedScopes=void 0,n.diagnostics=[]),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=Ko.Changed,this.documentMap.delete(r)),n}};Ai.DefaultLangiumDocuments=ag});var sg=d(Wo=>{"use strict";Object.defineProperty(Wo,"__esModule",{value:!0});Wo.mergeSignatureHelpOptions=Wo.AbstractSignatureHelpProvider=void 0;var dK=qe(),pK=Qe(),og=class{provideSignatureHelp(e,r,n=dK.CancellationToken.None){let a=e.parseResult.value.$cstNode;if(a){let o=(0,pK.findLeafNodeAtOffset)(a,e.textDocument.offsetAt(r.position));if(o)return this.getSignatureFromElement(o.element,n)}}get signatureHelpOptions(){return{triggerCharacters:["("],retriggerCharacters:[","]}}};Wo.AbstractSignatureHelpProvider=og;function hK(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}Wo.mergeSignatureHelpOptions=hK});var cg=d(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.createRequestHandler=Q.createServerRequestHandler=Q.createCallHierarchyRequestHandler=Q.addCallHierarchyHandler=Q.addCodeLensHandler=Q.addSignatureHelpHandler=Q.addDocumentLinkHandler=Q.addExecuteCommandHandler=Q.addConfigurationChangeHandler=Q.addSemanticTokenHandler=Q.addRenameHandler=Q.addFormattingHandler=Q.addFoldingRangeHandler=Q.addHoverHandler=Q.addDocumentHighlightsHandler=Q.addGoToDeclarationHandler=Q.addGoToImplementationHandler=Q.addGoToTypeDefinitionHandler=Q.addGotoDefinitionHandler=Q.addDocumentSymbolHandler=Q.addCodeActionHandler=Q.addFindReferencesHandler=Q.addCompletionHandler=Q.addDiagnosticsHandler=Q.addDocumentsHandler=Q.startLanguageServer=Q.DefaultLanguageServer=void 0;var gr=qe(),Bo=qn(),S0=Nu(),mK=jr(),yK=na(),gK=sf(),vK=sg(),ug=class{constructor(e){this.onInitializeEmitter=new gr.Emitter,this.onInitializedEmitter=new gr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){(0,S0.eagerLoad)(this.services),this.services.ServiceRegistry.all.forEach(e=>(0,S0.eagerLoad)(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(V=>V.lsp.Formatter),a=n.map(V=>{var Ae;return(Ae=V.lsp.Formatter)===null||Ae===void 0?void 0:Ae.formatOnTypeOptions}).find(V=>Boolean(V)),o=this.hasService(V=>V.lsp.CodeActionProvider),s=this.hasService(V=>V.lsp.SemanticTokenProvider),u=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.services.lsp.DocumentLinkProvider,c=(0,vK.mergeSignatureHelpOptions)(n.map(V=>{var Ae;return(Ae=V.lsp.SignatureHelp)===null||Ae===void 0?void 0:Ae.signatureHelpOptions})),f=this.hasService(V=>V.lsp.TypeProvider),m=this.hasService(V=>V.lsp.ImplementationProvider),v=this.hasService(V=>V.lsp.CompletionProvider),y=this.hasService(V=>V.lsp.ReferencesProvider),R=this.hasService(V=>V.lsp.DocumentSymbolProvider),P=this.hasService(V=>V.lsp.DefinitionProvider),E=this.hasService(V=>V.lsp.DocumentHighlightProvider),b=this.hasService(V=>V.lsp.FoldingRangeProvider),S=this.hasService(V=>V.lsp.HoverProvider),O=this.hasService(V=>V.lsp.RenameProvider),F=this.hasService(V=>V.lsp.CallHierarchyProvider),W=this.services.lsp.CodeLensProvider,re=this.hasService(V=>V.lsp.DeclarationProvider);return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:u&&{commands:u},textDocumentSync:gr.TextDocumentSyncKind.Incremental,completionProvider:v?{}:void 0,referencesProvider:y,documentSymbolProvider:R,definitionProvider:P,typeDefinitionProvider:f,documentHighlightProvider:E,codeActionProvider:o,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:a,foldingRangeProvider:b,hoverProvider:S,renameProvider:O?{prepareProvider:!0}:void 0,semanticTokensProvider:s?gK.DefaultSemanticTokenOptions:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:F?{}:void 0,documentLinkProvider:l?{resolveProvider:Boolean(l.resolveDocumentLink)}:void 0,codeLensProvider:W?{resolveProvider:Boolean(W.resolveCodeLens)}:void 0,declarationProvider:re}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};Q.DefaultLanguageServer=ug;function TK(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");b0(e,t),C0(e,t),P0(e,t),E0(e,t),N0(e,t),w0(e,t),$0(e,t),O0(e,t),D0(e,t),L0(e,t),q0(e,t),k0(e,t),M0(e,t),x0(e,t),F0(e,t),G0(e,t),H0(e,t),W0(e,t),K0(e,t),U0(e,t),j0(e,t),I0(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}Q.startLanguageServer=TK;function b0(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(o,s){n.lock(u=>r.update(o,s,u))}e.workspace.TextDocuments.onDidChangeContent(o=>{i([Bo.URI.parse(o.document.uri)],[])}),t.onDidChangeWatchedFiles(o=>{let s=o.changes.filter(l=>l.type!==gr.FileChangeType.Deleted).map(l=>Bo.URI.parse(l.uri)),u=o.changes.filter(l=>l.type===gr.FileChangeType.Deleted).map(l=>Bo.URI.parse(l.uri));i(s,u)})}Q.addDocumentsHandler=b0;function C0(t,e){e.workspace.DocumentBuilder.onBuildPhase(yK.DocumentState.Validated,async(n,i)=>{for(let a of n)if(a.diagnostics&&t.sendDiagnostics({uri:a.uri.toString(),diagnostics:a.diagnostics}),i.isCancellationRequested)return})}Q.addDiagnosticsHandler=C0;function P0(t,e){t.onCompletion(Vt((r,n,i,a)=>{var o;return(o=r.lsp.CompletionProvider)===null||o===void 0?void 0:o.getCompletion(n,i,a)},e))}Q.addCompletionHandler=P0;function E0(t,e){t.onReferences(Vt((r,n,i,a)=>{var o;return(o=r.lsp.ReferencesProvider)===null||o===void 0?void 0:o.findReferences(n,i,a)},e))}Q.addFindReferencesHandler=E0;function k0(t,e){t.onCodeAction(Vt((r,n,i,a)=>{var o;return(o=r.lsp.CodeActionProvider)===null||o===void 0?void 0:o.getCodeActions(n,i,a)},e))}Q.addCodeActionHandler=k0;function N0(t,e){t.onDocumentSymbol(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentSymbolProvider)===null||o===void 0?void 0:o.getSymbols(n,i,a)},e))}Q.addDocumentSymbolHandler=N0;function w0(t,e){t.onDefinition(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DefinitionProvider)===null||o===void 0?void 0:o.getDefinition(n,i,a)},e))}Q.addGotoDefinitionHandler=w0;function $0(t,e){t.onTypeDefinition(Vt((r,n,i,a)=>{var o;return(o=r.lsp.TypeProvider)===null||o===void 0?void 0:o.getTypeDefinition(n,i,a)},e))}Q.addGoToTypeDefinitionHandler=$0;function O0(t,e){t.onImplementation(Vt((r,n,i,a)=>{var o;return(o=r.lsp.ImplementationProvider)===null||o===void 0?void 0:o.getImplementation(n,i,a)},e))}Q.addGoToImplementationHandler=O0;function I0(t,e){t.onDeclaration(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DeclarationProvider)===null||o===void 0?void 0:o.getDeclaration(n,i,a)},e))}Q.addGoToDeclarationHandler=I0;function D0(t,e){t.onDocumentHighlight(Vt((r,n,i,a)=>{var o;return(o=r.lsp.DocumentHighlightProvider)===null||o===void 0?void 0:o.getDocumentHighlight(n,i,a)},e))}Q.addDocumentHighlightsHandler=D0;function x0(t,e){t.onHover(Vt((r,n,i,a)=>{var o;return(o=r.lsp.HoverProvider)===null||o===void 0?void 0:o.getHoverContent(n,i,a)},e))}Q.addHoverHandler=x0;function L0(t,e){t.onFoldingRanges(Vt((r,n,i,a)=>{var o;return(o=r.lsp.FoldingRangeProvider)===null||o===void 0?void 0:o.getFoldingRanges(n,i,a)},e))}Q.addFoldingRangeHandler=L0;function q0(t,e){t.onDocumentFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocument(n,i,a)},e)),t.onDocumentRangeFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentRange(n,i,a)},e)),t.onDocumentOnTypeFormatting(Vt((r,n,i,a)=>{var o;return(o=r.lsp.Formatter)===null||o===void 0?void 0:o.formatDocumentOnType(n,i,a)},e))}Q.addFormattingHandler=q0;function M0(t,e){t.onRenameRequest(Vt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.rename(n,i,a)},e)),t.onPrepareRename(Vt((r,n,i,a)=>{var o;return(o=r.lsp.RenameProvider)===null||o===void 0?void 0:o.prepareRename(n,i,a)},e))}Q.addRenameHandler=M0;function F0(t,e){let r="No semantic token provider registered";t.languages.semanticTokens.on(ia((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,a,o):new gr.ResponseError(0,r),e)),t.languages.semanticTokens.onDelta(ia((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,a,o):new gr.ResponseError(0,r),e)),t.languages.semanticTokens.onRange(ia((n,i,a,o)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,a,o):new gr.ResponseError(0,r),e))}Q.addSemanticTokenHandler=F0;function j0(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}Q.addConfigurationChangeHandler=j0;function G0(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var a;try{return await r.executeCommand(n.command,(a=n.arguments)!==null&&a!==void 0?a:[],i)}catch(o){return Vo(o)}})}Q.addExecuteCommandHandler=G0;function U0(t,e){var r;let n=e.lsp.DocumentLinkProvider;if(n){t.onDocumentLinks(ia((a,o,s,u)=>n.getDocumentLinks(o,s,u),e));let i=(r=n.resolveDocumentLink)===null||r===void 0?void 0:r.bind(n);i&&t.onDocumentLinkResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Vo(s)}})}}Q.addDocumentLinkHandler=U0;function H0(t,e){t.onSignatureHelp(ia((r,n,i,a)=>{var o;return(o=r.lsp.SignatureHelp)===null||o===void 0?void 0:o.provideSignatureHelp(n,i,a)},e))}Q.addSignatureHelpHandler=H0;function K0(t,e){var r;let n=e.lsp.CodeLensProvider;if(n){t.onCodeLens(ia((a,o,s,u)=>n.provideCodeLens(o,s,u),e));let i=(r=n.resolveCodeLens)===null||r===void 0?void 0:r.bind(n);i&&t.onCodeLensResolve(async(a,o)=>{try{return await i(a,o)}catch(s){return Vo(s)}})}}Q.addCodeLensHandler=K0;function W0(t,e){let r="No call hierarchy provider registered";t.languages.callHierarchy.onPrepare(ia((n,i,a,o)=>{var s;return n.lsp.CallHierarchyProvider?(s=n.lsp.CallHierarchyProvider.prepareCallHierarchy(i,a,o))!==null&&s!==void 0?s:null:new gr.ResponseError(0,r)},e)),t.languages.callHierarchy.onIncomingCalls(lg((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.incomingCalls(i,a))!==null&&o!==void 0?o:null:new gr.ResponseError(0,r)},e)),t.languages.callHierarchy.onOutgoingCalls(lg((n,i,a)=>{var o;return n.lsp.CallHierarchyProvider?(o=n.lsp.CallHierarchyProvider.outgoingCalls(i,a))!==null&&o!==void 0?o:null:new gr.ResponseError(0,r)},e))}Q.addCallHierarchyHandler=W0;function lg(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let a=Bo.URI.parse(n.item.uri),o=r.getServices(a);if(!o)throw console.error(`Could not find service instance for uri: '${a.toString()}'`),new Error;try{return await t(o,n,i)}catch(s){return Vo(s)}}}Q.createCallHierarchyRequestHandler=lg;function ia(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Bo.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)throw console.error(`Could not find service instance for uri: '${o.toString()}'`),new Error;let u=r.getOrCreateDocument(o);if(!u)throw new Error;try{return await t(s,u,i,a)}catch(l){return Vo(l)}}}Q.createServerRequestHandler=ia;function Vt(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,a)=>{let o=Bo.URI.parse(i.textDocument.uri),s=n.getServices(o);if(!s)return console.error(`Could not find service instance for uri: '${o.toString()}'`),null;let u=r.getOrCreateDocument(o);if(!u)return null;try{return await t(s,u,i,a)}catch(l){return Vo(l)}}}Q.createRequestHandler=Vt;function Vo(t){if((0,mK.isOperationCancelled)(t))return new gr.ResponseError(gr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof gr.ResponseError)return t;throw t}});var dg=d(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.DefaultReferencesProvider=void 0;var _K=qe(),RK=Qe(),fg=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=(0,RK.findDeclarationNodeAtOffset)(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],a=this.references.findDeclaration(e);if(a){let o={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(a,o).forEach(s=>{i.push(_K.Location.create(s.sourceUri.toString(),s.segment.range))})}return i}};Rf.DefaultReferencesProvider=fg});var hg=d(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.DefaultRenameProvider=void 0;var AK=qe(),SK=xo(),B0=Qe(),pg=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let a=e.textDocument.offsetAt(r.position),o=(0,B0.findDeclarationNodeAtOffset)(i,a,this.grammarConfig.nameRegexp);if(!o)return;let s=this.references.findDeclaration(o);if(!s)return;let u={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(s,u).forEach(c=>{let f=AK.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let a=(0,B0.findDeclarationNodeAtOffset)(n,i,this.grammarConfig.nameRegexp);if(!a)return;if(this.references.findDeclaration(a)||this.isNameNode(a))return a.range}}isNameNode(e){return e?.element&&(0,SK.isNamed)(e.element)&&e===this.nameProvider.getNameNode(e.element)}};Af.DefaultRenameProvider=pg});var V0=d(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.AbstractTypeDefinitionProvider=void 0;var bK=qe(),CK=Qe(),mg=class{constructor(e){this.references=e.references.References}getTypeDefinition(e,r,n=bK.CancellationToken.None){let i=e.parseResult.value;if(i.$cstNode){let a=(0,CK.findDeclarationNodeAtOffset)(i.$cstNode,e.textDocument.offsetAt(r.position));if(a){let o=this.references.findDeclaration(a);if(o)return this.collectGoToTypeLocationLinks(o,n)}}}};Sf.AbstractTypeDefinitionProvider=mg});var yg=d(tt=>{"use strict";var PK=tt&&tt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Lt=tt&&tt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&PK(e,t,r)};Object.defineProperty(tt,"__esModule",{value:!0});Lt(Vy(),tt);Lt(Wy(),tt);Lt(g0(),tt);Lt(Yy(),tt);Lt(T0(),tt);Lt(Jy(),tt);Lt(_0(),tt);Lt(ef(),tt);Lt(eg(),tt);Lt(rg(),tt);Lt(Iy(),tt);Lt(A0(),tt);Lt(cg(),tt);Lt(dg(),tt);Lt(hg(),tt);Lt(sf(),tt);Lt(sg(),tt);Lt(V0(),tt)});var z0=d(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.LangiumGrammarDefinitionProvider=void 0;var gg=qe(),EK=yg(),kK=Ie(),NK=Et(),wK=$e(),$K=kt(),vg=class extends EK.DefaultDefinitionProvider{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,a,o,s,u;let l="path";if((0,wK.isGrammarImport)(e.element)&&((n=(0,NK.findAssignment)(e))===null||n===void 0?void 0:n.feature)===l){let c=(0,$K.resolveImport)(this.documents,e.element);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(o=(a=this.nameProvider.getNameNode(f))===null||a===void 0?void 0:a.range)!==null&&o!==void 0?o:gg.Range.create(0,0,0,0),v=(u=(s=f.$cstNode)===null||s===void 0?void 0:s.range)!==null&&u!==void 0?u:gg.Range.create(0,0,0,0);return[gg.LocationLink.create(c.$document.uri.toString(),v,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:(0,kK.streamContents)(e).head()}};bf.LangiumGrammarDefinitionProvider=vg});var X0=d(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.AbstractCallHierarchyProvider=void 0;var OK=qe(),Y0=qn(),Tg=Qe(),_g=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=(0,Tg.findDeclarationNodeAtOffset)(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findDeclarationNode(i);if(a)return this.getCallHierarchyItems(a.element,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:OK.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Y0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,Tg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let a=this.references.findReferences(i.element,{includeDeclaration:!1,onlyLocal:!1});return this.getIncomingCalls(i.element,a)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Y0.URI.parse(e.item.uri)),n=r.parseResult.value,i=(0,Tg.findDeclarationNodeAtOffset)(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.element)}};Cf.AbstractCallHierarchyProvider=_g});var Q0=d(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.LangiumGrammarCallHierarchyProvider=void 0;var J0=qe(),IK=X0(),Rg=Ie(),DK=Qe(),Pf=$e(),Ag=class extends IK.AbstractCallHierarchyProvider{getIncomingCalls(e,r){if(!(0,Pf.isParserRule)(e))return;let n=new Map;if(r.forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!o.$cstNode)return;let s=(0,DK.findLeafNodeAtOffset)(o.$cstNode,i.segment.offset);if(!s)return;let u=(0,Rg.getContainerOfType)(s.element,Pf.isParserRule);if(!u||!u.$cstNode)return;let l=this.nameProvider.getNameNode(u);if(!l)return;let c=i.sourceUri.toString(),f=c+"@"+l.text;n.has(f)?n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,s],docUri:c}):n.set(f,{parserRule:u.$cstNode,nameNode:l,targetNodes:[s],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:J0.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(a=>a.range)}))}getOutgoingCalls(e){if(!(0,Pf.isParserRule)(e))return;let r=(0,Rg.streamAllContents)(e).filter(Pf.isRuleCall).toArray(),n=new Map;if(r.forEach(i=>{var a;let o=i.$cstNode;if(!o)return;let s=(a=i.rule.ref)===null||a===void 0?void 0:a.$cstNode;if(!s)return;let u=this.nameProvider.getNameNode(s.element);if(!u)return;let l=(0,Rg.getDocument)(s.element).uri.toString(),c=l+"@"+u.text;n.has(c)?n.set(c,{refCstNode:s,to:u,from:[...n.get(c).from,o.range],docUri:l}):n.set(c,{refCstNode:s,to:u,from:[o.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:J0.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};Ef.LangiumGrammarCallHierarchyProvider=Ag});var Sg=d(aa=>{"use strict";Object.defineProperty(aa,"__esModule",{value:!0});aa.isInferredAndDeclared=aa.isInferred=aa.isDeclared=void 0;function xK(t){return t&&"declared"in t}aa.isDeclared=xK;function LK(t){return t&&"inferred"in t}aa.isInferred=LK;function qK(t){return t&&"inferred"in t&&"declared"in t}aa.isInferredAndDeclared=qK});var eb=d($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.LangiumGrammarValidationResourcesCollector=void 0;var MK=Pr(),wf=Dt(),kf=$e(),Z0=kt(),FK=oy(),Nf=gi(),jK=zi(),GK=Sg(),bg=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=(0,FK.collectTypeResources)(e,this.documents),n=this.collectValidationInfo(r),i=this.collectSuperProperties(r),a=this.collectSubTypesAndAliases(n);return{typeToValidationInfo:n,typeToSuperProperties:i,typeToAliases:a}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,a=UK(e);for(let s of(0,Nf.mergeTypesAndInterfaces)(r))i.set(s.name,{inferred:s,inferredNodes:a.get(s.name)});let o=(0,wf.stream)(e.interfaces).concat(e.types).reduce((s,u)=>s.set(u.name,u),new Map);for(let s of(0,Nf.mergeTypesAndInterfaces)(n)){let u=o.get(s.name);if(u){let l=i.get(s.name);i.set(s.name,l?Object.assign(Object.assign({},l),{declared:s,declaredNode:u}):{declared:s,declaredNode:u})}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map;for(let i of(0,Nf.mergeInterfaces)(e,r))n.set(i.name,Array.from(i.superProperties.values()));return n}collectSubTypesAndAliases(e){let r=(0,wf.stream)(e.entries()).reduce((s,[u,l])=>(s.set(u,(0,GK.isDeclared)(l)?l.declared:l.inferred),s),new Map);(0,Nf.addSubTypes)(r);let n=new Map;function i(s,u){let l=n.get(s);l?l.add(u):n.set(s,new Set([u]))}let a=Array.from(r.values()).filter(s=>s.subTypes.size===0),o=new Set;for(let s of a){o.add(s),i(s.name,s.name);for(let u of(0,wf.stream)(s.realSuperTypes)){i(u,s.name);let l=r.get(u);l&&!o.has(l)&&a.push(l)}(0,jK.isUnionType)(s)&&s.alternatives.length===1&&s.alternatives.filter(u=>!u.array&&!u.reference).flatMap(u=>u.types).forEach(u=>{i(s.name,u),i(u,u),i(u,s.name)})}return n}};$f.LangiumGrammarValidationResourcesCollector=bg;function UK({parserRules:t,datatypeRules:e}){let r=new MK.MultiMap;(0,wf.stream)(t).concat(e).forEach(i=>r.add((0,Z0.getRuleType)(i),i));function n(i){if((0,kf.isAction)(i)){let a=(0,Z0.getActionType)(i);a&&r.add(a,i)}((0,kf.isAlternatives)(i)||(0,kf.isGroup)(i)||(0,kf.isUnorderedGroup)(i))&&i.elements.forEach(a=>n(a))}return t.forEach(i=>n(i.definition)),r}});var rb=d(Br=>{"use strict";var HK=Br&&Br.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),KK=Br&&Br.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),WK=Br&&Br.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&HK(e,t,r);return KK(e,t),e};Object.defineProperty(Br,"__esModule",{value:!0});Br.LangiumGrammarTypesValidator=Br.registerTypeValidationChecks=void 0;var BK=Pr(),zo=WK($e()),VK=kt(),Un=zi(),Pg=gi(),La=Sg();function zK(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency]};e.register(n,r)}Br.registerTypeValidationChecks=zK;var Cg=class{checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let a of i.typeToValidationInfo.values())if((0,La.isDeclared)(a)&&(0,Un.isInterfaceType)(a.declared)&&zo.isInterface(a.declaredNode)){let o=a;XK(o,i.typeToValidationInfo,r),JK(o,i.typeToSuperProperties,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let a of i.typeToValidationInfo.values())(0,La.isInferred)(a)&&a.inferred instanceof Un.InterfaceType&&YK(a.inferred,r),(0,La.isInferredAndDeclared)(a)&&eW(a,i.typeToAliases,r)}checkActionIsNotUnionType(e,r){zo.isType(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};Br.LangiumGrammarTypesValidator=Cg;function YK(t,e){t.properties.filter(r=>r.typeAlternatives.length>1).forEach(r=>{let n=a=>a.reference?"ref":"other",i=n(r.typeAlternatives[0]);if(r.typeAlternatives.slice(1).some(a=>n(a)!==i)){let a=r.astNodes.values().next().value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}})}function XK({declared:t,declaredNode:e},r,n){t.printingSuperTypes.forEach((i,a)=>{let o=r.get(i);o&&(((0,La.isInferred)(o)&&(0,Un.isUnionType)(o.inferred)||(0,La.isDeclared)(o)&&(0,Un.isUnionType)(o.declared))&&n("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:a}),(0,La.isInferred)(o)&&!(0,La.isDeclared)(o)&&n("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:a}))})}function JK({declared:t,declaredNode:e},r,n){var i,a,o;let s=t.properties.reduce((c,f)=>c.add(f.name,f),new BK.MultiMap);for(let[c,f]of s.entriesGroupedByKey())if(f.length>1)for(let m of f)n("error",`Cannot have two properties with the same name '${c}'.`,{node:Array.from(m.astNodes)[0],property:"name"});let u=t.printingSuperTypes;for(let c=0;c<u.length;c++)for(let f=c+1;f<u.length;f++){let m=u[c],v=u[f],y=(i=r.get(m))!==null&&i!==void 0?i:[],R=(a=r.get(v))!==null&&a!==void 0?a:[],P=QK(y,R);P.length>0&&n("error",`Cannot simultaneously inherit from '${m}' and '${v}'. Their ${P.map(E=>"'"+E+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let l=new Set;for(let c of u){let f=(o=r.get(c))!==null&&o!==void 0?o:[];for(let m of f)l.add(m.name)}for(let c of t.properties)if(l.has(c.name)){let m=e.attributes.find(v=>v.name===c.name);m&&n("error",`Cannot redeclare property '${c.name}'. It is already inherited from another interface.`,{node:m,property:"name"})}}function QK(t,e){let r=[];for(let n of t){let i=e.find(a=>a.name===n.name);i&&!ZK(n,i)&&r.push(n.name)}return r}function ZK(t,e){if(t.optional!==e.optional||t.typeAlternatives.length!==e.typeAlternatives.length)return!1;for(let r of t.typeAlternatives)if(!e.typeAlternatives.some(i=>i.array===r.array&&i.reference===r.reference&&i.types.length===r.types.length&&i.types.every(a=>r.types.includes(a))))return!1;return!0}function eW(t,e,r){let{inferred:n,declared:i,declaredNode:a,inferredNodes:o}=t,s=i.name,u=f=>m=>o.forEach(v=>r("error",`${m[-1]==="."?m.slice(0,-1):m}${f?` ${f}`:""}.`,v?.inferredType?{node:v?.inferredType,property:"name"}:{node:v,property:zo.isAction(v)?"type":"name"})),l=(f,m)=>f.forEach(v=>r("error",m,{node:v,property:zo.isAssignment(v)||zo.isAction(v)?"feature":"name"})),c=f=>{o.forEach(m=>{zo.isParserRule(m)&&(0,VK.extractAssignments)(m.definition).find(y=>y.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${s}'.`,{node:m,property:"parameters"})})};if((0,Un.isUnionType)(n)&&(0,Un.isUnionType)(i))tW(n.alternatives,i.alternatives,e,u(`in a rule that returns type '${s}'`));else if((0,Un.isInterfaceType)(n)&&(0,Un.isInterfaceType)(i))iW(n.superProperties,i.superProperties,e,u(`in a rule that returns type '${s}'`),l,c);else{let f=`Inferred and declared versions of type '${s}' both have to be interfaces or unions.`;u()(f),r("error",f,{node:a,property:"name"})}}function tW(t,e,r,n){let i=tb(t,e,r);for(let a of i)n(`A type '${a.typeAsString}' ${a.errorMessage}`)}function rW(t,e){let r=t.types.map(i=>{var a;return Array.from((a=e.get(i))!==null&&a!==void 0?a:new Set([i]))}),n=[];for(let i of r)if(n.length===0&&n.push([]),i.length===1)n.forEach(a=>a.push(i[0]));else{let a=JSON.parse(JSON.stringify(n));n=[];for(let o of i){let s=JSON.parse(JSON.stringify(a));s.forEach(u=>u.push(o)),n.push(...s)}}return n.map(i=>(0,Pg.distinctAndSorted)(i).join(" | "))}function nW(t){let e=t.types.filter(r=>!r.startsWith("'"));return e.push("string"),(0,Pg.distinctAndSorted)(e).join(" | ")}function tb(t,e,r){var n;let i=(u,l)=>u.array&&!l.array&&u.reference&&!l.reference?"can't be an array and a reference":!u.array&&l.array&&!u.reference&&l.reference?"has to be an array and a reference":u.array&&!l.array?"can't be an array":!u.array&&l.array?"has to be an array":u.reference&&!l.reference?"can't be a reference":!u.reference&&l.reference?"has to be a reference":"",a=t.reduce((u,l)=>u.set((0,Pg.distinctAndSorted)(l.types).join(" | "),l),new Map),o=e.reduce((u,l)=>(rW(l,r).forEach(c=>u.set(c,l)),u),new Map),s=[];for(let[u,l]of a){let c=(n=o.get(u))!==null&&n!==void 0?n:o.get(nW(l));c?(c.array!==l.array||c.reference!==l.reference)&&s.push({typeAsString:u,errorMessage:i(l,c)}):s.push({typeAsString:u,errorMessage:"is not expected"})}return s}function iW(t,e,r,n,i,a){let o=(s,u)=>!(s.typeAlternatives.length===1&&s.typeAlternatives[0].array)&&!(u.typeAlternatives.length===1&&u.typeAlternatives[0].array);for(let[s,u]of t.entriesGroupedByKey()){let l=u[0],c=e.get(s)[0];if(c){let f=(0,Un.propertyTypesToString)(l.typeAlternatives),m=(0,Un.propertyTypesToString)(c.typeAlternatives);if(f!==m){let v=tb(l.typeAlternatives,c.typeAlternatives,r);if(v.length>0){let y=`The assigned type '${f}' is not compatible with the declared property '${s}' of type '${m}'`,R=v.map(P=>` '${P.typeAsString}' ${P.errorMessage}`).join("; ");i(l.astNodes,`${y}: ${R}.`)}}!c.optional&&l.optional&&o(l,c)&&a(s)}else i(l.astNodes,`A property '${s}' is not expected.`)}for(let[s,u]of e.entriesGroupedByKey())t.get(s).length===0&&!u.some(c=>c.optional)&&n(`A property '${s}' is expected.`)}});var Eg=d(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.createLangiumGrammarServices=qa.LangiumGrammarModule=void 0;var nb=Of(),ib=Nu(),ab=IS(),ob=jS(),sb=by(),aW=zS(),oW=YS(),sW=JS(),uW=QS(),lW=e0(),cW=s0(),fW=z0(),dW=Q0(),pW=eb(),ub=rb(),hW=jr(),mW=na();qa.LangiumGrammarModule={validation:{LangiumGrammarValidator:t=>new sb.LangiumGrammarValidator(t),ValidationResourcesCollector:t=>new pW.LangiumGrammarValidationResourcesCollector(t),LangiumGrammarTypesValidator:()=>new ub.LangiumGrammarTypesValidator},lsp:{FoldingRangeProvider:t=>new oW.LangiumGrammarFoldingRangeProvider(t),CodeActionProvider:t=>new aW.LangiumGrammarCodeActionProvider(t),SemanticTokenProvider:t=>new uW.LangiumGrammarSemanticTokenProvider(t),Formatter:()=>new sW.LangiumGrammarFormatter,DefinitionProvider:t=>new fW.LangiumGrammarDefinitionProvider(t),CallHierarchyProvider:t=>new dW.LangiumGrammarCallHierarchyProvider(t)},references:{ScopeComputation:t=>new ob.LangiumGrammarScopeComputation(t),ScopeProvider:t=>new ob.LangiumGrammarScopeProvider(t),References:t=>new cW.LangiumGrammarReferences(t),NameProvider:()=>new lW.LangiumGrammarNameProvider}};function yW(t,e){let r=(0,ib.inject)((0,nb.createDefaultSharedModule)(t),ab.LangiumGrammarGeneratedSharedModule,e),n=(0,ib.inject)((0,nb.createDefaultModule)({shared:r}),ab.LangiumGrammarGeneratedModule,qa.LangiumGrammarModule);return gW(r,n),r.ServiceRegistry.register(n),(0,sb.registerValidationChecks)(n),(0,ub.registerTypeValidationChecks)(n),{shared:r,grammar:n}}qa.createLangiumGrammarServices=yW;function gW(t,e){t.workspace.DocumentBuilder.onBuildPhase(mW.DocumentState.IndexedReferences,async(n,i)=>{for(let a of n){await(0,hW.interruptAndCheck)(i);let o=e.validation.ValidationResourcesCollector,s=a.parseResult.value;a.validationResources=o.collectValidationResources(s)}})}});var kg=d(Yo=>{"use strict";Object.defineProperty(Yo,"__esModule",{value:!0});Yo.EmptyFileSystem=Yo.EmptyFileSystemProvider=void 0;var If=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}};Yo.EmptyFileSystemProvider=If;Yo.EmptyFileSystem={fileSystemProvider:()=>new If}});var Et=d(Te=>{"use strict";var vW=Te&&Te.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),TW=Te&&Te.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),_W=Te&&Te.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&vW(e,t,r);return TW(e,t),e};Object.defineProperty(Te,"__esModule",{value:!0});Te.createServicesForGrammar=Te.loadGrammarFromJson=Te.findNameAssignment=Te.findAssignment=Te.findNodesForKeywordInternal=Te.findNodeForKeyword=Te.findNodesForKeyword=Te.findNodeForProperty=Te.findNodesForProperty=Te.isCommentTerminal=Te.getCrossReferenceTerminal=Te.getAllReachableRules=Te.getEntryRule=void 0;var fb=qn(),lb=Of(),cb=Nu(),RW=uy(),vr=_W($e()),AW=kt(),db=Eg(),SW=hr(),Xo=Ie(),bW=Qe(),Ng=kg();function pb(t){return t.rules.find(e=>vr.isParserRule(e)&&e.entry)}Te.getEntryRule=pb;function CW(t,e){let r=new Set,n=pb(t);if(!n)return new Set(t.rules);hb(n,r,e);let i=new Set;for(let a of t.rules)(r.has(a.name)||vr.isTerminalRule(a)&&a.hidden)&&i.add(a);return i}Te.getAllReachableRules=CW;function hb(t,e,r){e.add(t.name),(0,Xo.streamAllContents)(t).forEach(n=>{if(vr.isRuleCall(n)||r&&vr.isTerminalRuleCall(n)){let i=n.rule.ref;i&&!e.has(i.name)&&hb(i,e,r)}})}function PW(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=mb(t.type.ref);return e?.terminal}}Te.getCrossReferenceTerminal=PW;function EW(t){return t.hidden&&!" ".match((0,AW.terminalRegex)(t))}Te.isCommentTerminal=EW;function kW(t,e){return!t||!e?[]:wg(t,e,t.element,!0)}Te.findNodesForProperty=kW;function NW(t,e,r){if(!t||!e)return;let n=wg(t,e,t.element,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForProperty=NW;function wg(t,e,r,n){if(!n){let i=(0,Xo.getContainerOfType)(t.feature,vr.isAssignment);if(i&&i.feature===e)return[t]}return(0,SW.isCompositeCstNode)(t)&&t.element===r?t.children.flatMap(i=>wg(i,e,r,!1)):[]}function wW(t,e){return t?$g(t,e,t?.element):[]}Te.findNodesForKeyword=wW;function $W(t,e,r){if(!t)return;let n=$g(t,e,t?.element);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}Te.findNodeForKeyword=$W;function $g(t,e,r){if(t.element!==r)return[];if(vr.isKeyword(t.feature)&&t.feature.value===e)return[t];let n=(0,bW.streamCst)(t).iterator(),i,a=[];do if(i=n.next(),!i.done){let o=i.value;o.element===r?vr.isKeyword(o.feature)&&o.feature.value===e&&a.push(o):n.prune()}while(!i.done);return a}Te.findNodesForKeywordInternal=$g;function OW(t){var e;let r=t.element;for(;r===((e=t.parent)===null||e===void 0?void 0:e.element);){let n=(0,Xo.getContainerOfType)(t.feature,vr.isAssignment);if(n)return n;t=t.parent}}Te.findAssignment=OW;function mb(t){return vr.isInferredType(t)&&(t=t.$container),yb(t,new Map)}Te.findNameAssignment=mb;function yb(t,e){var r;function n(i,a){let o;return(0,Xo.getContainerOfType)(i,vr.isAssignment)||(o=yb(a,e)),e.set(t,o),o}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of(0,Xo.streamAllContents)(t)){if(vr.isAssignment(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(vr.isRuleCall(i)&&vr.isParserRule(i.rule.ref))return n(i,i.rule.ref);if(vr.isAtomType(i)&&(!((r=i?.refType)===null||r===void 0)&&r.ref))return n(i,i.refType.ref)}}function IW(t){var e;let r=(0,db.createLangiumGrammarServices)(Ng.EmptyFileSystem).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,fb.URI.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}Te.loadGrammarFromJson=IW;async function DW(t){var e,r,n,i,a,o;let s=(e=t.grammarServices)!==null&&e!==void 0?e:(0,db.createLangiumGrammarServices)(Ng.EmptyFileSystem).grammar,u=fb.URI.parse("memory:///grammar.langium"),l=s.shared.workspace.LangiumDocumentFactory,c=typeof t.grammar=="string"?l.fromString(t.grammar,u):(0,Xo.getDocument)(t.grammar),f=c.parseResult.value;await s.shared.workspace.DocumentBuilder.build([c],{validationChecks:"none"});let v=(r=t.parserConfig)!==null&&r!==void 0?r:{skipValidations:!1},y=(n=t.languageMetaData)!==null&&n!==void 0?n:{caseInsensitive:!1,fileExtensions:[`.${(a=(i=f.name)===null||i===void 0?void 0:i.toLowerCase())!==null&&a!==void 0?a:"unknown"}`],languageId:(o=f.name)!==null&&o!==void 0?o:"UNKNOWN"},R={AstReflection:()=>(0,RW.interpretAstReflection)(f)},P={Grammar:()=>f,LanguageMetaData:()=>y,parser:{ParserConfig:()=>v}},E=(0,cb.inject)((0,lb.createDefaultSharedModule)(Ng.EmptyFileSystem),R,t.sharedModule),b=(0,cb.inject)((0,lb.createDefaultModule)({shared:E}),P,t.module);return E.ServiceRegistry.register(b),b}Te.createServicesForGrammar=DW});var gb=d(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.createGrammarConfig=void 0;var xW=Qe(),LW=Et(),qW=Lo(),MW=$e(),FW=kt();function jW(t){let e=[],r=t.Grammar;for(let n of r.rules)(0,MW.isTerminalRule)(n)&&(0,LW.isCommentTerminal)(n)&&(0,qW.isMultilineComment)((0,FW.terminalRegex)(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:xW.DefaultNameRegexp}}Df.createGrammarConfig=jW});var Og=d(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.VERSION=void 0;xf.VERSION="10.4.2"});var Jo=d((bpe,vb)=>{var GW=Object.prototype;function UW(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||GW;return t===r}vb.exports=UW});var Ig=d((Cpe,Tb)=>{function HW(t,e){return function(r){return t(e(r))}}Tb.exports=HW});var Rb=d((Ppe,_b)=>{var KW=Ig(),WW=KW(Object.keys,Object);_b.exports=WW});var Dg=d((Epe,Ab)=>{var BW=Jo(),VW=Rb(),zW=Object.prototype,YW=zW.hasOwnProperty;function XW(t){if(!BW(t))return VW(t);var e=[];for(var r in Object(t))YW.call(t,r)&&r!="constructor"&&e.push(r);return e}Ab.exports=XW});var xg=d((kpe,Sb)=>{var JW=typeof global=="object"&&global&&global.Object===Object&&global;Sb.exports=JW});var gn=d((Npe,bb)=>{var QW=xg(),ZW=typeof self=="object"&&self&&self.Object===Object&&self,e5=QW||ZW||Function("return this")();bb.exports=e5});var Ma=d((wpe,Cb)=>{var t5=gn(),r5=t5.Symbol;Cb.exports=r5});var Nb=d(($pe,kb)=>{var Pb=Ma(),Eb=Object.prototype,n5=Eb.hasOwnProperty,i5=Eb.toString,Gu=Pb?Pb.toStringTag:void 0;function a5(t){var e=n5.call(t,Gu),r=t[Gu];try{t[Gu]=void 0;var n=!0}catch{}var i=i5.call(t);return n&&(e?t[Gu]=r:delete t[Gu]),i}kb.exports=a5});var $b=d((Ope,wb)=>{var o5=Object.prototype,s5=o5.toString;function u5(t){return s5.call(t)}wb.exports=u5});var oa=d((Ipe,Db)=>{var Ob=Ma(),l5=Nb(),c5=$b(),f5="[object Null]",d5="[object Undefined]",Ib=Ob?Ob.toStringTag:void 0;function p5(t){return t==null?t===void 0?d5:f5:Ib&&Ib in Object(t)?l5(t):c5(t)}Db.exports=p5});var vn=d((Dpe,xb)=>{function h5(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}xb.exports=h5});var Qo=d((xpe,Lb)=>{var m5=oa(),y5=vn(),g5="[object AsyncFunction]",v5="[object Function]",T5="[object GeneratorFunction]",_5="[object Proxy]";function R5(t){if(!y5(t))return!1;var e=m5(t);return e==v5||e==T5||e==g5||e==_5}Lb.exports=R5});var Mb=d((Lpe,qb)=>{var A5=gn(),S5=A5["__core-js_shared__"];qb.exports=S5});var Gb=d((qpe,jb)=>{var Lg=Mb(),Fb=function(){var t=/[^.]+$/.exec(Lg&&Lg.keys&&Lg.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function b5(t){return!!Fb&&Fb in t}jb.exports=b5});var qg=d((Mpe,Ub)=>{var C5=Function.prototype,P5=C5.toString;function E5(t){if(t!=null){try{return P5.call(t)}catch{}try{return t+""}catch{}}return""}Ub.exports=E5});var Kb=d((Fpe,Hb)=>{var k5=Qo(),N5=Gb(),w5=vn(),$5=qg(),O5=/[\\^$.*+?()[\]{}|]/g,I5=/^\[object .+?Constructor\]$/,D5=Function.prototype,x5=Object.prototype,L5=D5.toString,q5=x5.hasOwnProperty,M5=RegExp("^"+L5.call(q5).replace(O5,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function F5(t){if(!w5(t)||N5(t))return!1;var e=k5(t)?M5:I5;return e.test($5(t))}Hb.exports=F5});var Bb=d((jpe,Wb)=>{function j5(t,e){return t?.[e]}Wb.exports=j5});var sa=d((Gpe,Vb)=>{var G5=Kb(),U5=Bb();function H5(t,e){var r=U5(t,e);return G5(r)?r:void 0}Vb.exports=H5});var Yb=d((Upe,zb)=>{var K5=sa(),W5=gn(),B5=K5(W5,"DataView");zb.exports=B5});var Lf=d((Hpe,Xb)=>{var V5=sa(),z5=gn(),Y5=V5(z5,"Map");Xb.exports=Y5});var Qb=d((Kpe,Jb)=>{var X5=sa(),J5=gn(),Q5=X5(J5,"Promise");Jb.exports=Q5});var Mg=d((Wpe,Zb)=>{var Z5=sa(),eB=gn(),tB=Z5(eB,"Set");Zb.exports=tB});var tC=d((Bpe,eC)=>{var rB=sa(),nB=gn(),iB=rB(nB,"WeakMap");eC.exports=iB});var es=d((Vpe,uC)=>{var Fg=Yb(),jg=Lf(),Gg=Qb(),Ug=Mg(),Hg=tC(),sC=oa(),Zo=qg(),rC="[object Map]",aB="[object Object]",nC="[object Promise]",iC="[object Set]",aC="[object WeakMap]",oC="[object DataView]",oB=Zo(Fg),sB=Zo(jg),uB=Zo(Gg),lB=Zo(Ug),cB=Zo(Hg),Fa=sC;(Fg&&Fa(new Fg(new ArrayBuffer(1)))!=oC||jg&&Fa(new jg)!=rC||Gg&&Fa(Gg.resolve())!=nC||Ug&&Fa(new Ug)!=iC||Hg&&Fa(new Hg)!=aC)&&(Fa=function(t){var e=sC(t),r=e==aB?t.constructor:void 0,n=r?Zo(r):"";if(n)switch(n){case oB:return oC;case sB:return rC;case uB:return nC;case lB:return iC;case cB:return aC}return e});uC.exports=Fa});var Tn=d((zpe,lC)=>{function fB(t){return t!=null&&typeof t=="object"}lC.exports=fB});var fC=d((Ype,cC)=>{var dB=oa(),pB=Tn(),hB="[object Arguments]";function mB(t){return pB(t)&&dB(t)==hB}cC.exports=mB});var Uu=d((Xpe,hC)=>{var dC=fC(),yB=Tn(),pC=Object.prototype,gB=pC.hasOwnProperty,vB=pC.propertyIsEnumerable,TB=dC(function(){return arguments}())?dC:function(t){return yB(t)&&gB.call(t,"callee")&&!vB.call(t,"callee")};hC.exports=TB});var Oe=d((Jpe,mC)=>{var _B=Array.isArray;mC.exports=_B});var qf=d((Qpe,yC)=>{var RB=9007199254740991;function AB(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=RB}yC.exports=AB});var _n=d((Zpe,gC)=>{var SB=Qo(),bB=qf();function CB(t){return t!=null&&bB(t.length)&&!SB(t)}gC.exports=CB});var TC=d((ehe,vC)=>{function PB(){return!1}vC.exports=PB});var Ku=d((Hu,ts)=>{var EB=gn(),kB=TC(),AC=typeof Hu=="object"&&Hu&&!Hu.nodeType&&Hu,_C=AC&&typeof ts=="object"&&ts&&!ts.nodeType&&ts,NB=_C&&_C.exports===AC,RC=NB?EB.Buffer:void 0,wB=RC?RC.isBuffer:void 0,$B=wB||kB;ts.exports=$B});var bC=d((the,SC)=>{var OB=oa(),IB=qf(),DB=Tn(),xB="[object Arguments]",LB="[object Array]",qB="[object Boolean]",MB="[object Date]",FB="[object Error]",jB="[object Function]",GB="[object Map]",UB="[object Number]",HB="[object Object]",KB="[object RegExp]",WB="[object Set]",BB="[object String]",VB="[object WeakMap]",zB="[object ArrayBuffer]",YB="[object DataView]",XB="[object Float32Array]",JB="[object Float64Array]",QB="[object Int8Array]",ZB="[object Int16Array]",e3="[object Int32Array]",t3="[object Uint8Array]",r3="[object Uint8ClampedArray]",n3="[object Uint16Array]",i3="[object Uint32Array]",ze={};ze[XB]=ze[JB]=ze[QB]=ze[ZB]=ze[e3]=ze[t3]=ze[r3]=ze[n3]=ze[i3]=!0;ze[xB]=ze[LB]=ze[zB]=ze[qB]=ze[YB]=ze[MB]=ze[FB]=ze[jB]=ze[GB]=ze[UB]=ze[HB]=ze[KB]=ze[WB]=ze[BB]=ze[VB]=!1;function a3(t){return DB(t)&&IB(t.length)&&!!ze[OB(t)]}SC.exports=a3});var rs=d((rhe,CC)=>{function o3(t){return function(e){return t(e)}}CC.exports=o3});var Vu=d((Wu,ns)=>{var s3=xg(),PC=typeof Wu=="object"&&Wu&&!Wu.nodeType&&Wu,Bu=PC&&typeof ns=="object"&&ns&&!ns.nodeType&&ns,u3=Bu&&Bu.exports===PC,Kg=u3&&s3.process,l3=function(){try{var t=Bu&&Bu.require&&Bu.require("util").types;return t||Kg&&Kg.binding&&Kg.binding("util")}catch{}}();ns.exports=l3});var Mf=d((nhe,NC)=>{var c3=bC(),f3=rs(),EC=Vu(),kC=EC&&EC.isTypedArray,d3=kC?f3(kC):c3;NC.exports=d3});var Er=d((ihe,wC)=>{var p3=Dg(),h3=es(),m3=Uu(),y3=Oe(),g3=_n(),v3=Ku(),T3=Jo(),_3=Mf(),R3="[object Map]",A3="[object Set]",S3=Object.prototype,b3=S3.hasOwnProperty;function C3(t){if(t==null)return!0;if(g3(t)&&(y3(t)||typeof t=="string"||typeof t.splice=="function"||v3(t)||_3(t)||m3(t)))return!t.length;var e=h3(t);if(e==R3||e==A3)return!t.size;if(T3(t))return!p3(t).length;for(var r in t)if(b3.call(t,r))return!1;return!0}wC.exports=C3});var is=d((ahe,$C)=>{function P3(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}$C.exports=P3});var IC=d((ohe,OC)=>{function E3(){this.__data__=[],this.size=0}OC.exports=E3});var as=d((she,DC)=>{function k3(t,e){return t===e||t!==t&&e!==e}DC.exports=k3});var zu=d((uhe,xC)=>{var N3=as();function w3(t,e){for(var r=t.length;r--;)if(N3(t[r][0],e))return r;return-1}xC.exports=w3});var qC=d((lhe,LC)=>{var $3=zu(),O3=Array.prototype,I3=O3.splice;function D3(t){var e=this.__data__,r=$3(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():I3.call(e,r,1),--this.size,!0}LC.exports=D3});var FC=d((che,MC)=>{var x3=zu();function L3(t){var e=this.__data__,r=x3(e,t);return r<0?void 0:e[r][1]}MC.exports=L3});var GC=d((fhe,jC)=>{var q3=zu();function M3(t){return q3(this.__data__,t)>-1}jC.exports=M3});var HC=d((dhe,UC)=>{var F3=zu();function j3(t,e){var r=this.__data__,n=F3(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}UC.exports=j3});var Yu=d((phe,KC)=>{var G3=IC(),U3=qC(),H3=FC(),K3=GC(),W3=HC();function os(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}os.prototype.clear=G3;os.prototype.delete=U3;os.prototype.get=H3;os.prototype.has=K3;os.prototype.set=W3;KC.exports=os});var BC=d((hhe,WC)=>{var B3=Yu();function V3(){this.__data__=new B3,this.size=0}WC.exports=V3});var zC=d((mhe,VC)=>{function z3(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}VC.exports=z3});var XC=d((yhe,YC)=>{function Y3(t){return this.__data__.get(t)}YC.exports=Y3});var QC=d((ghe,JC)=>{function X3(t){return this.__data__.has(t)}JC.exports=X3});var Xu=d((vhe,ZC)=>{var J3=sa(),Q3=J3(Object,"create");ZC.exports=Q3});var rP=d((The,tP)=>{var eP=Xu();function Z3(){this.__data__=eP?eP(null):{},this.size=0}tP.exports=Z3});var iP=d((_he,nP)=>{function e4(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}nP.exports=e4});var oP=d((Rhe,aP)=>{var t4=Xu(),r4="__lodash_hash_undefined__",n4=Object.prototype,i4=n4.hasOwnProperty;function a4(t){var e=this.__data__;if(t4){var r=e[t];return r===r4?void 0:r}return i4.call(e,t)?e[t]:void 0}aP.exports=a4});var uP=d((Ahe,sP)=>{var o4=Xu(),s4=Object.prototype,u4=s4.hasOwnProperty;function l4(t){var e=this.__data__;return o4?e[t]!==void 0:u4.call(e,t)}sP.exports=l4});var cP=d((She,lP)=>{var c4=Xu(),f4="__lodash_hash_undefined__";function d4(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=c4&&e===void 0?f4:e,this}lP.exports=d4});var dP=d((bhe,fP)=>{var p4=rP(),h4=iP(),m4=oP(),y4=uP(),g4=cP();function ss(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}ss.prototype.clear=p4;ss.prototype.delete=h4;ss.prototype.get=m4;ss.prototype.has=y4;ss.prototype.set=g4;fP.exports=ss});var mP=d((Che,hP)=>{var pP=dP(),v4=Yu(),T4=Lf();function _4(){this.size=0,this.__data__={hash:new pP,map:new(T4||v4),string:new pP}}hP.exports=_4});var gP=d((Phe,yP)=>{function R4(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}yP.exports=R4});var Ju=d((Ehe,vP)=>{var A4=gP();function S4(t,e){var r=t.__data__;return A4(e)?r[typeof e=="string"?"string":"hash"]:r.map}vP.exports=S4});var _P=d((khe,TP)=>{var b4=Ju();function C4(t){var e=b4(this,t).delete(t);return this.size-=e?1:0,e}TP.exports=C4});var AP=d((Nhe,RP)=>{var P4=Ju();function E4(t){return P4(this,t).get(t)}RP.exports=E4});var bP=d((whe,SP)=>{var k4=Ju();function N4(t){return k4(this,t).has(t)}SP.exports=N4});var PP=d(($he,CP)=>{var w4=Ju();function $4(t,e){var r=w4(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}CP.exports=$4});var Ff=d((Ohe,EP)=>{var O4=mP(),I4=_P(),D4=AP(),x4=bP(),L4=PP();function us(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}us.prototype.clear=O4;us.prototype.delete=I4;us.prototype.get=D4;us.prototype.has=x4;us.prototype.set=L4;EP.exports=us});var NP=d((Ihe,kP)=>{var q4=Yu(),M4=Lf(),F4=Ff(),j4=200;function G4(t,e){var r=this.__data__;if(r instanceof q4){var n=r.__data__;if(!M4||n.length<j4-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new F4(n)}return r.set(t,e),this.size=r.size,this}kP.exports=G4});var jf=d((Dhe,wP)=>{var U4=Yu(),H4=BC(),K4=zC(),W4=XC(),B4=QC(),V4=NP();function ls(t){var e=this.__data__=new U4(t);this.size=e.size}ls.prototype.clear=H4;ls.prototype.delete=K4;ls.prototype.get=W4;ls.prototype.has=B4;ls.prototype.set=V4;wP.exports=ls});var OP=d((xhe,$P)=>{var z4="__lodash_hash_undefined__";function Y4(t){return this.__data__.set(t,z4),this}$P.exports=Y4});var DP=d((Lhe,IP)=>{function X4(t){return this.__data__.has(t)}IP.exports=X4});var Uf=d((qhe,xP)=>{var J4=Ff(),Q4=OP(),Z4=DP();function Gf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new J4;++e<r;)this.add(t[e])}Gf.prototype.add=Gf.prototype.push=Q4;Gf.prototype.has=Z4;xP.exports=Gf});var Wg=d((Mhe,LP)=>{function e6(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}LP.exports=e6});var Hf=d((Fhe,qP)=>{function t6(t,e){return t.has(e)}qP.exports=t6});var Bg=d((jhe,MP)=>{var r6=Uf(),n6=Wg(),i6=Hf(),a6=1,o6=2;function s6(t,e,r,n,i,a){var o=r&a6,s=t.length,u=e.length;if(s!=u&&!(o&&u>s))return!1;var l=a.get(t),c=a.get(e);if(l&&c)return l==e&&c==t;var f=-1,m=!0,v=r&o6?new r6:void 0;for(a.set(t,e),a.set(e,t);++f<s;){var y=t[f],R=e[f];if(n)var P=o?n(R,y,f,e,t,a):n(y,R,f,t,e,a);if(P!==void 0){if(P)continue;m=!1;break}if(v){if(!n6(e,function(E,b){if(!i6(v,b)&&(y===E||i(y,E,r,n,a)))return v.push(b)})){m=!1;break}}else if(!(y===R||i(y,R,r,n,a))){m=!1;break}}return a.delete(t),a.delete(e),m}MP.exports=s6});var Vg=d((Ghe,FP)=>{var u6=gn(),l6=u6.Uint8Array;FP.exports=l6});var GP=d((Uhe,jP)=>{function c6(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}jP.exports=c6});var Kf=d((Hhe,UP)=>{function f6(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}UP.exports=f6});var VP=d((Khe,BP)=>{var HP=Ma(),KP=Vg(),d6=as(),p6=Bg(),h6=GP(),m6=Kf(),y6=1,g6=2,v6="[object Boolean]",T6="[object Date]",_6="[object Error]",R6="[object Map]",A6="[object Number]",S6="[object RegExp]",b6="[object Set]",C6="[object String]",P6="[object Symbol]",E6="[object ArrayBuffer]",k6="[object DataView]",WP=HP?HP.prototype:void 0,zg=WP?WP.valueOf:void 0;function N6(t,e,r,n,i,a,o){switch(r){case k6:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case E6:return!(t.byteLength!=e.byteLength||!a(new KP(t),new KP(e)));case v6:case T6:case A6:return d6(+t,+e);case _6:return t.name==e.name&&t.message==e.message;case S6:case C6:return t==e+"";case R6:var s=h6;case b6:var u=n&y6;if(s||(s=m6),t.size!=e.size&&!u)return!1;var l=o.get(t);if(l)return l==e;n|=g6,o.set(t,e);var c=p6(s(t),s(e),n,i,a,o);return o.delete(t),c;case P6:if(zg)return zg.call(t)==zg.call(e)}return!1}BP.exports=N6});var Wf=d((Whe,zP)=>{function w6(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}zP.exports=w6});var Yg=d((Bhe,YP)=>{var $6=Wf(),O6=Oe();function I6(t,e,r){var n=e(t);return O6(t)?n:$6(n,r(t))}YP.exports=I6});var Bf=d((Vhe,XP)=>{function D6(t,e){for(var r=-1,n=t==null?0:t.length,i=0,a=[];++r<n;){var o=t[r];e(o,r,t)&&(a[i++]=o)}return a}XP.exports=D6});var Xg=d((zhe,JP)=>{function x6(){return[]}JP.exports=x6});var Vf=d((Yhe,ZP)=>{var L6=Bf(),q6=Xg(),M6=Object.prototype,F6=M6.propertyIsEnumerable,QP=Object.getOwnPropertySymbols,j6=QP?function(t){return t==null?[]:(t=Object(t),L6(QP(t),function(e){return F6.call(t,e)}))}:q6;ZP.exports=j6});var tE=d((Xhe,eE)=>{function G6(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}eE.exports=G6});var Qu=d((Jhe,rE)=>{var U6=9007199254740991,H6=/^(?:0|[1-9]\d*)$/;function K6(t,e){var r=typeof t;return e=e??U6,!!e&&(r=="number"||r!="symbol"&&H6.test(t))&&t>-1&&t%1==0&&t<e}rE.exports=K6});var Jg=d((Qhe,nE)=>{var W6=tE(),B6=Uu(),V6=Oe(),z6=Ku(),Y6=Qu(),X6=Mf(),J6=Object.prototype,Q6=J6.hasOwnProperty;function Z6(t,e){var r=V6(t),n=!r&&B6(t),i=!r&&!n&&z6(t),a=!r&&!n&&!i&&X6(t),o=r||n||i||a,s=o?W6(t.length,String):[],u=s.length;for(var l in t)(e||Q6.call(t,l))&&!(o&&(l=="length"||i&&(l=="offset"||l=="parent")||a&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Y6(l,u)))&&s.push(l);return s}nE.exports=Z6});var kr=d((Zhe,iE)=>{var eV=Jg(),tV=Dg(),rV=_n();function nV(t){return rV(t)?eV(t):tV(t)}iE.exports=nV});var Qg=d((eme,aE)=>{var iV=Yg(),aV=Vf(),oV=kr();function sV(t){return iV(t,oV,aV)}aE.exports=sV});var uE=d((tme,sE)=>{var oE=Qg(),uV=1,lV=Object.prototype,cV=lV.hasOwnProperty;function fV(t,e,r,n,i,a){var o=r&uV,s=oE(t),u=s.length,l=oE(e),c=l.length;if(u!=c&&!o)return!1;for(var f=u;f--;){var m=s[f];if(!(o?m in e:cV.call(e,m)))return!1}var v=a.get(t),y=a.get(e);if(v&&y)return v==e&&y==t;var R=!0;a.set(t,e),a.set(e,t);for(var P=o;++f<u;){m=s[f];var E=t[m],b=e[m];if(n)var S=o?n(b,E,m,e,t,a):n(E,b,m,t,e,a);if(!(S===void 0?E===b||i(E,b,r,n,a):S)){R=!1;break}P||(P=m=="constructor")}if(R&&!P){var O=t.constructor,F=e.constructor;O!=F&&"constructor"in t&&"constructor"in e&&!(typeof O=="function"&&O instanceof O&&typeof F=="function"&&F instanceof F)&&(R=!1)}return a.delete(t),a.delete(e),R}sE.exports=fV});var yE=d((rme,mE)=>{var Zg=jf(),dV=Bg(),pV=VP(),hV=uE(),lE=es(),cE=Oe(),fE=Ku(),mV=Mf(),yV=1,dE="[object Arguments]",pE="[object Array]",zf="[object Object]",gV=Object.prototype,hE=gV.hasOwnProperty;function vV(t,e,r,n,i,a){var o=cE(t),s=cE(e),u=o?pE:lE(t),l=s?pE:lE(e);u=u==dE?zf:u,l=l==dE?zf:l;var c=u==zf,f=l==zf,m=u==l;if(m&&fE(t)){if(!fE(e))return!1;o=!0,c=!1}if(m&&!c)return a||(a=new Zg),o||mV(t)?dV(t,e,r,n,i,a):pV(t,e,u,r,n,i,a);if(!(r&yV)){var v=c&&hE.call(t,"__wrapped__"),y=f&&hE.call(e,"__wrapped__");if(v||y){var R=v?t.value():t,P=y?e.value():e;return a||(a=new Zg),i(R,P,r,n,a)}}return m?(a||(a=new Zg),hV(t,e,r,n,i,a)):!1}mE.exports=vV});var ev=d((nme,TE)=>{var TV=yE(),gE=Tn();function vE(t,e,r,n,i){return t===e?!0:t==null||e==null||!gE(t)&&!gE(e)?t!==t&&e!==e:TV(t,e,r,n,vE,i)}TE.exports=vE});var RE=d((ime,_E)=>{var _V=jf(),RV=ev(),AV=1,SV=2;function bV(t,e,r,n){var i=r.length,a=i,o=!n;if(t==null)return!a;for(t=Object(t);i--;){var s=r[i];if(o&&s[2]?s[1]!==t[s[0]]:!(s[0]in t))return!1}for(;++i<a;){s=r[i];var u=s[0],l=t[u],c=s[1];if(o&&s[2]){if(l===void 0&&!(u in t))return!1}else{var f=new _V;if(n)var m=n(l,c,u,t,e,f);if(!(m===void 0?RV(c,l,AV|SV,n,f):m))return!1}}return!0}_E.exports=bV});var tv=d((ame,AE)=>{var CV=vn();function PV(t){return t===t&&!CV(t)}AE.exports=PV});var bE=d((ome,SE)=>{var EV=tv(),kV=kr();function NV(t){for(var e=kV(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,EV(i)]}return e}SE.exports=NV});var rv=d((sme,CE)=>{function wV(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}CE.exports=wV});var EE=d((ume,PE)=>{var $V=RE(),OV=bE(),IV=rv();function DV(t){var e=OV(t);return e.length==1&&e[0][2]?IV(e[0][0],e[0][1]):function(r){return r===t||$V(r,t,e)}}PE.exports=DV});var cs=d((lme,kE)=>{var xV=oa(),LV=Tn(),qV="[object Symbol]";function MV(t){return typeof t=="symbol"||LV(t)&&xV(t)==qV}kE.exports=MV});var Yf=d((cme,NE)=>{var FV=Oe(),jV=cs(),GV=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,UV=/^\w*$/;function HV(t,e){if(FV(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||jV(t)?!0:UV.test(t)||!GV.test(t)||e!=null&&t in Object(e)}NE.exports=HV});var OE=d((fme,$E)=>{var wE=Ff(),KV="Expected a function";function nv(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(KV);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],a=r.cache;if(a.has(i))return a.get(i);var o=t.apply(this,n);return r.cache=a.set(i,o)||a,o};return r.cache=new(nv.Cache||wE),r}nv.Cache=wE;$E.exports=nv});var DE=d((dme,IE)=>{var WV=OE(),BV=500;function VV(t){var e=WV(t,function(n){return r.size===BV&&r.clear(),n}),r=e.cache;return e}IE.exports=VV});var LE=d((pme,xE)=>{var zV=DE(),YV=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,XV=/\\(\\)?/g,JV=zV(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(YV,function(r,n,i,a){e.push(i?a.replace(XV,"$1"):n||r)}),e});xE.exports=JV});var UE=d((hme,GE)=>{var qE=Ma(),QV=is(),ZV=Oe(),ez=cs(),tz=1/0,ME=qE?qE.prototype:void 0,FE=ME?ME.toString:void 0;function jE(t){if(typeof t=="string")return t;if(ZV(t))return QV(t,jE)+"";if(ez(t))return FE?FE.call(t):"";var e=t+"";return e=="0"&&1/t==-tz?"-0":e}GE.exports=jE});var iv=d((mme,HE)=>{var rz=UE();function nz(t){return t==null?"":rz(t)}HE.exports=nz});var Zu=d((yme,KE)=>{var iz=Oe(),az=Yf(),oz=LE(),sz=iv();function uz(t,e){return iz(t)?t:az(t,e)?[t]:oz(sz(t))}KE.exports=uz});var fs=d((gme,WE)=>{var lz=cs(),cz=1/0;function fz(t){if(typeof t=="string"||lz(t))return t;var e=t+"";return e=="0"&&1/t==-cz?"-0":e}WE.exports=fz});var Xf=d((vme,BE)=>{var dz=Zu(),pz=fs();function hz(t,e){e=dz(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[pz(e[r++])];return r&&r==n?t:void 0}BE.exports=hz});var zE=d((Tme,VE)=>{var mz=Xf();function yz(t,e,r){var n=t==null?void 0:mz(t,e);return n===void 0?r:n}VE.exports=yz});var XE=d((_me,YE)=>{function gz(t,e){return t!=null&&e in Object(t)}YE.exports=gz});var av=d((Rme,JE)=>{var vz=Zu(),Tz=Uu(),_z=Oe(),Rz=Qu(),Az=qf(),Sz=fs();function bz(t,e,r){e=vz(e,t);for(var n=-1,i=e.length,a=!1;++n<i;){var o=Sz(e[n]);if(!(a=t!=null&&r(t,o)))break;t=t[o]}return a||++n!=i?a:(i=t==null?0:t.length,!!i&&Az(i)&&Rz(o,i)&&(_z(t)||Tz(t)))}JE.exports=bz});var ZE=d((Ame,QE)=>{var Cz=XE(),Pz=av();function Ez(t,e){return t!=null&&Pz(t,e,Cz)}QE.exports=Ez});var tk=d((Sme,ek)=>{var kz=ev(),Nz=zE(),wz=ZE(),$z=Yf(),Oz=tv(),Iz=rv(),Dz=fs(),xz=1,Lz=2;function qz(t,e){return $z(t)&&Oz(e)?Iz(Dz(t),e):function(r){var n=Nz(r,t);return n===void 0&&n===e?wz(r,t):kz(e,n,xz|Lz)}}ek.exports=qz});var ja=d((bme,rk)=>{function Mz(t){return t}rk.exports=Mz});var ik=d((Cme,nk)=>{function Fz(t){return function(e){return e?.[t]}}nk.exports=Fz});var ok=d((Pme,ak)=>{var jz=Xf();function Gz(t){return function(e){return jz(e,t)}}ak.exports=Gz});var uk=d((Eme,sk)=>{var Uz=ik(),Hz=ok(),Kz=Yf(),Wz=fs();function Bz(t){return Kz(t)?Uz(Wz(t)):Hz(t)}sk.exports=Bz});var Vr=d((kme,lk)=>{var Vz=EE(),zz=tk(),Yz=ja(),Xz=Oe(),Jz=uk();function Qz(t){return typeof t=="function"?t:t==null?Yz:typeof t=="object"?Xz(t)?zz(t[0],t[1]):Vz(t):Jz(t)}lk.exports=Qz});var fk=d((Nme,ck)=>{function Zz(t){return function(e,r,n){for(var i=-1,a=Object(e),o=n(e),s=o.length;s--;){var u=o[t?s:++i];if(r(a[u],u,a)===!1)break}return e}}ck.exports=Zz});var pk=d((wme,dk)=>{var e8=fk(),t8=e8();dk.exports=t8});var mk=d(($me,hk)=>{var r8=pk(),n8=kr();function i8(t,e){return t&&r8(t,e,n8)}hk.exports=i8});var gk=d((Ome,yk)=>{var a8=_n();function o8(t,e){return function(r,n){if(r==null)return r;if(!a8(r))return t(r,n);for(var i=r.length,a=e?i:-1,o=Object(r);(e?a--:++a<i)&&n(o[a],a,o)!==!1;);return r}}yk.exports=o8});var ua=d((Ime,vk)=>{var s8=mk(),u8=gk(),l8=u8(s8);vk.exports=l8});var _k=d((Dme,Tk)=>{var c8=ua(),f8=_n();function d8(t,e){var r=-1,n=f8(t)?Array(t.length):[];return c8(t,function(i,a,o){n[++r]=e(i,a,o)}),n}Tk.exports=d8});var qt=d((xme,Rk)=>{var p8=is(),h8=Vr(),m8=_k(),y8=Oe();function g8(t,e){var r=y8(t)?p8:m8;return r(t,h8(e,3))}Rk.exports=g8});var ov=d((Lme,Ak)=>{function v8(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}Ak.exports=v8});var bk=d((qme,Sk)=>{var T8=ja();function _8(t){return typeof t=="function"?t:T8}Sk.exports=_8});var Mt=d((Mme,Ck)=>{var R8=ov(),A8=ua(),S8=bk(),b8=Oe();function C8(t,e){var r=b8(t)?R8:A8;return r(t,S8(e))}Ck.exports=C8});var Ek=d((Fme,Pk)=>{var P8=is();function E8(t,e){return P8(e,function(r){return t[r]})}Pk.exports=E8});var Hn=d((jme,kk)=>{var k8=Ek(),N8=kr();function w8(t){return t==null?[]:k8(t,N8(t))}kk.exports=w8});var wk=d((Gme,Nk)=>{var $8=Object.prototype,O8=$8.hasOwnProperty;function I8(t,e){return t!=null&&O8.call(t,e)}Nk.exports=I8});var Nr=d((Ume,$k)=>{var D8=wk(),x8=av();function L8(t,e){return t!=null&&x8(t,e,D8)}$k.exports=L8});var sv=d((Hme,Ok)=>{var q8=sa(),M8=function(){try{var t=q8(Object,"defineProperty");return t({},"",{}),t}catch{}}();Ok.exports=M8});var Jf=d((Kme,Dk)=>{var Ik=sv();function F8(t,e,r){e=="__proto__"&&Ik?Ik(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}Dk.exports=F8});var el=d((Wme,xk)=>{var j8=Jf(),G8=as(),U8=Object.prototype,H8=U8.hasOwnProperty;function K8(t,e,r){var n=t[e];(!(H8.call(t,e)&&G8(n,r))||r===void 0&&!(e in t))&&j8(t,e,r)}xk.exports=K8});var ds=d((Bme,Lk)=>{var W8=el(),B8=Jf();function V8(t,e,r,n){var i=!r;r||(r={});for(var a=-1,o=e.length;++a<o;){var s=e[a],u=n?n(r[s],t[s],s,r,t):void 0;u===void 0&&(u=t[s]),i?B8(r,s,u):W8(r,s,u)}return r}Lk.exports=V8});var Mk=d((Vme,qk)=>{var z8=ds(),Y8=kr();function X8(t,e){return t&&z8(e,Y8(e),t)}qk.exports=X8});var jk=d((zme,Fk)=>{function J8(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}Fk.exports=J8});var Uk=d((Yme,Gk)=>{var Q8=vn(),Z8=Jo(),e7=jk(),t7=Object.prototype,r7=t7.hasOwnProperty;function n7(t){if(!Q8(t))return e7(t);var e=Z8(t),r=[];for(var n in t)n=="constructor"&&(e||!r7.call(t,n))||r.push(n);return r}Gk.exports=n7});var tl=d((Xme,Hk)=>{var i7=Jg(),a7=Uk(),o7=_n();function s7(t){return o7(t)?i7(t,!0):a7(t)}Hk.exports=s7});var Wk=d((Jme,Kk)=>{var u7=ds(),l7=tl();function c7(t,e){return t&&u7(e,l7(e),t)}Kk.exports=c7});var Xk=d((rl,ps)=>{var f7=gn(),Yk=typeof rl=="object"&&rl&&!rl.nodeType&&rl,Bk=Yk&&typeof ps=="object"&&ps&&!ps.nodeType&&ps,d7=Bk&&Bk.exports===Yk,Vk=d7?f7.Buffer:void 0,zk=Vk?Vk.allocUnsafe:void 0;function p7(t,e){if(e)return t.slice();var r=t.length,n=zk?zk(r):new t.constructor(r);return t.copy(n),n}ps.exports=p7});var Qk=d((Qme,Jk)=>{function h7(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}Jk.exports=h7});var eN=d((Zme,Zk)=>{var m7=ds(),y7=Vf();function g7(t,e){return m7(t,y7(t),e)}Zk.exports=g7});var uv=d((eye,tN)=>{var v7=Ig(),T7=v7(Object.getPrototypeOf,Object);tN.exports=T7});var lv=d((tye,rN)=>{var _7=Wf(),R7=uv(),A7=Vf(),S7=Xg(),b7=Object.getOwnPropertySymbols,C7=b7?function(t){for(var e=[];t;)_7(e,A7(t)),t=R7(t);return e}:S7;rN.exports=C7});var iN=d((rye,nN)=>{var P7=ds(),E7=lv();function k7(t,e){return P7(t,E7(t),e)}nN.exports=k7});var cv=d((nye,aN)=>{var N7=Yg(),w7=lv(),$7=tl();function O7(t){return N7(t,$7,w7)}aN.exports=O7});var sN=d((iye,oN)=>{var I7=Object.prototype,D7=I7.hasOwnProperty;function x7(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&D7.call(t,"index")&&(r.index=t.index,r.input=t.input),r}oN.exports=x7});var Qf=d((aye,lN)=>{var uN=Vg();function L7(t){var e=new t.constructor(t.byteLength);return new uN(e).set(new uN(t)),e}lN.exports=L7});var fN=d((oye,cN)=>{var q7=Qf();function M7(t,e){var r=e?q7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}cN.exports=M7});var pN=d((sye,dN)=>{var F7=/\w*$/;function j7(t){var e=new t.constructor(t.source,F7.exec(t));return e.lastIndex=t.lastIndex,e}dN.exports=j7});var vN=d((uye,gN)=>{var hN=Ma(),mN=hN?hN.prototype:void 0,yN=mN?mN.valueOf:void 0;function G7(t){return yN?Object(yN.call(t)):{}}gN.exports=G7});var _N=d((lye,TN)=>{var U7=Qf();function H7(t,e){var r=e?U7(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}TN.exports=H7});var AN=d((cye,RN)=>{var K7=Qf(),W7=fN(),B7=pN(),V7=vN(),z7=_N(),Y7="[object Boolean]",X7="[object Date]",J7="[object Map]",Q7="[object Number]",Z7="[object RegExp]",e9="[object Set]",t9="[object String]",r9="[object Symbol]",n9="[object ArrayBuffer]",i9="[object DataView]",a9="[object Float32Array]",o9="[object Float64Array]",s9="[object Int8Array]",u9="[object Int16Array]",l9="[object Int32Array]",c9="[object Uint8Array]",f9="[object Uint8ClampedArray]",d9="[object Uint16Array]",p9="[object Uint32Array]";function h9(t,e,r){var n=t.constructor;switch(e){case n9:return K7(t);case Y7:case X7:return new n(+t);case i9:return W7(t,r);case a9:case o9:case s9:case u9:case l9:case c9:case f9:case d9:case p9:return z7(t,r);case J7:return new n;case Q7:case t9:return new n(t);case Z7:return B7(t);case e9:return new n;case r9:return V7(t)}}RN.exports=h9});var CN=d((fye,bN)=>{var m9=vn(),SN=Object.create,y9=function(){function t(){}return function(e){if(!m9(e))return{};if(SN)return SN(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}();bN.exports=y9});var EN=d((dye,PN)=>{var g9=CN(),v9=uv(),T9=Jo();function _9(t){return typeof t.constructor=="function"&&!T9(t)?g9(v9(t)):{}}PN.exports=_9});var NN=d((pye,kN)=>{var R9=es(),A9=Tn(),S9="[object Map]";function b9(t){return A9(t)&&R9(t)==S9}kN.exports=b9});var IN=d((hye,ON)=>{var C9=NN(),P9=rs(),wN=Vu(),$N=wN&&wN.isMap,E9=$N?P9($N):C9;ON.exports=E9});var xN=d((mye,DN)=>{var k9=es(),N9=Tn(),w9="[object Set]";function $9(t){return N9(t)&&k9(t)==w9}DN.exports=$9});var FN=d((yye,MN)=>{var O9=xN(),I9=rs(),LN=Vu(),qN=LN&&LN.isSet,D9=qN?I9(qN):O9;MN.exports=D9});var KN=d((gye,HN)=>{var x9=jf(),L9=ov(),q9=el(),M9=Mk(),F9=Wk(),j9=Xk(),G9=Qk(),U9=eN(),H9=iN(),K9=Qg(),W9=cv(),B9=es(),V9=sN(),z9=AN(),Y9=EN(),X9=Oe(),J9=Ku(),Q9=IN(),Z9=vn(),eY=FN(),tY=kr(),rY=tl(),nY=1,iY=2,aY=4,jN="[object Arguments]",oY="[object Array]",sY="[object Boolean]",uY="[object Date]",lY="[object Error]",GN="[object Function]",cY="[object GeneratorFunction]",fY="[object Map]",dY="[object Number]",UN="[object Object]",pY="[object RegExp]",hY="[object Set]",mY="[object String]",yY="[object Symbol]",gY="[object WeakMap]",vY="[object ArrayBuffer]",TY="[object DataView]",_Y="[object Float32Array]",RY="[object Float64Array]",AY="[object Int8Array]",SY="[object Int16Array]",bY="[object Int32Array]",CY="[object Uint8Array]",PY="[object Uint8ClampedArray]",EY="[object Uint16Array]",kY="[object Uint32Array]",Ke={};Ke[jN]=Ke[oY]=Ke[vY]=Ke[TY]=Ke[sY]=Ke[uY]=Ke[_Y]=Ke[RY]=Ke[AY]=Ke[SY]=Ke[bY]=Ke[fY]=Ke[dY]=Ke[UN]=Ke[pY]=Ke[hY]=Ke[mY]=Ke[yY]=Ke[CY]=Ke[PY]=Ke[EY]=Ke[kY]=!0;Ke[lY]=Ke[GN]=Ke[gY]=!1;function Zf(t,e,r,n,i,a){var o,s=e&nY,u=e&iY,l=e&aY;if(r&&(o=i?r(t,n,i,a):r(t)),o!==void 0)return o;if(!Z9(t))return t;var c=X9(t);if(c){if(o=V9(t),!s)return G9(t,o)}else{var f=B9(t),m=f==GN||f==cY;if(J9(t))return j9(t,s);if(f==UN||f==jN||m&&!i){if(o=u||m?{}:Y9(t),!s)return u?H9(t,F9(o,t)):U9(t,M9(o,t))}else{if(!Ke[f])return i?t:{};o=z9(t,f,s)}}a||(a=new x9);var v=a.get(t);if(v)return v;a.set(t,o),eY(t)?t.forEach(function(P){o.add(Zf(P,e,r,P,t,a))}):Q9(t)&&t.forEach(function(P,E){o.set(E,Zf(P,e,r,E,t,a))});var y=l?u?W9:K9:u?rY:tY,R=c?void 0:y(t);return L9(R||t,function(P,E){R&&(E=P,P=t[E]),q9(o,E,Zf(P,e,r,E,t,a))}),o}HN.exports=Zf});var Si=d((vye,WN)=>{var NY=KN(),wY=4;function $Y(t){return NY(t,wY)}WN.exports=$Y});var BN=d(hs=>{"use strict";Object.defineProperty(hs,"__esModule",{value:!0});hs.PRINT_WARNING=hs.PRINT_ERROR=void 0;function OY(t){console&&console.error&&console.error("Error: ".concat(t))}hs.PRINT_ERROR=OY;function IY(t){console&&console.warn&&console.warn("Warning: ".concat(t))}hs.PRINT_WARNING=IY});var VN=d(ed=>{"use strict";Object.defineProperty(ed,"__esModule",{value:!0});ed.timer=void 0;function DY(t){var e=new Date().getTime(),r=t(),n=new Date().getTime(),i=n-e;return{time:i,value:r}}ed.timer=DY});var zN=d((exports,module)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.toFastProperties=void 0;function toFastProperties(toBecomeFast){function FakeConstructor(){}FakeConstructor.prototype=toBecomeFast;var fakeInstance=new FakeConstructor;function fakeAccess(){return typeof fakeInstance.bar}return fakeAccess(),fakeAccess(),toBecomeFast;eval(toBecomeFast)}exports.toFastProperties=toFastProperties});var ms=d(Kn=>{"use strict";Object.defineProperty(Kn,"__esModule",{value:!0});Kn.toFastProperties=Kn.timer=Kn.PRINT_ERROR=Kn.PRINT_WARNING=void 0;var YN=BN();Object.defineProperty(Kn,"PRINT_WARNING",{enumerable:!0,get:function(){return YN.PRINT_WARNING}});Object.defineProperty(Kn,"PRINT_ERROR",{enumerable:!0,get:function(){return YN.PRINT_ERROR}});var xY=VN();Object.defineProperty(Kn,"timer",{enumerable:!0,get:function(){return xY.timer}});var LY=zN();Object.defineProperty(Kn,"toFastProperties",{enumerable:!0,get:function(){return LY.toFastProperties}})});var td=d((Aye,XN)=>{function qY(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var a=Array(i);++n<i;)a[n]=t[n+e];return a}XN.exports=qY});var QN=d((Sye,JN)=>{var MY=/\s/;function FY(t){for(var e=t.length;e--&&MY.test(t.charAt(e)););return e}JN.exports=FY});var ew=d((bye,ZN)=>{var jY=QN(),GY=/^\s+/;function UY(t){return t&&t.slice(0,jY(t)+1).replace(GY,"")}ZN.exports=UY});var iw=d((Cye,nw)=>{var HY=ew(),tw=vn(),KY=cs(),rw=0/0,WY=/^[-+]0x[0-9a-f]+$/i,BY=/^0b[01]+$/i,VY=/^0o[0-7]+$/i,zY=parseInt;function YY(t){if(typeof t=="number")return t;if(KY(t))return rw;if(tw(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=tw(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=HY(t);var r=BY.test(t);return r||VY.test(t)?zY(t.slice(2),r?2:8):WY.test(t)?rw:+t}nw.exports=YY});var sw=d((Pye,ow)=>{var XY=iw(),aw=1/0,JY=17976931348623157e292;function QY(t){if(!t)return t===0?t:0;if(t=XY(t),t===aw||t===-aw){var e=t<0?-1:1;return e*JY}return t===t?t:0}ow.exports=QY});var ys=d((Eye,uw)=>{var ZY=sw();function eX(t){var e=ZY(t),r=e%1;return e===e?r?e-r:e:0}uw.exports=eX});var rd=d((kye,lw)=>{var tX=td(),rX=ys();function nX(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:rX(e),tX(t,e<0?0:e,n)):[]}lw.exports=nX});var nl=d((Nye,cw)=>{var iX=oa(),aX=Oe(),oX=Tn(),sX="[object String]";function uX(t){return typeof t=="string"||!aX(t)&&oX(t)&&iX(t)==sX}cw.exports=uX});var dw=d((wye,fw)=>{var lX=oa(),cX=Tn(),fX="[object RegExp]";function dX(t){return cX(t)&&lX(t)==fX}fw.exports=dX});var fv=d(($ye,mw)=>{var pX=dw(),hX=rs(),pw=Vu(),hw=pw&&pw.isRegExp,mX=hw?hX(hw):pX;mw.exports=mX});var vw=d((Oye,gw)=>{var yX=el(),gX=Zu(),vX=Qu(),yw=vn(),TX=fs();function _X(t,e,r,n){if(!yw(t))return t;e=gX(e,t);for(var i=-1,a=e.length,o=a-1,s=t;s!=null&&++i<a;){var u=TX(e[i]),l=r;if(u==="__proto__"||u==="constructor"||u==="prototype")return t;if(i!=o){var c=s[u];l=n?n(c,u,s):void 0,l===void 0&&(l=yw(c)?c:vX(e[i+1])?[]:{})}yX(s,u,l),s=s[u]}return t}gw.exports=_X});var _w=d((Iye,Tw)=>{var RX=Xf(),AX=vw(),SX=Zu();function bX(t,e,r){for(var n=-1,i=e.length,a={};++n<i;){var o=e[n],s=RX(t,o);r(s,o)&&AX(a,SX(o,t),s)}return a}Tw.exports=bX});var dv=d((Dye,Rw)=>{var CX=is(),PX=Vr(),EX=_w(),kX=cv();function NX(t,e){if(t==null)return{};var r=CX(kX(t),function(n){return[n]});return e=PX(e),EX(t,r,function(n,i){return e(n,i[0])})}Rw.exports=NX});var Sw=d((xye,Aw)=>{function wX(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}Aw.exports=wX});var Pw=d((Lye,Cw)=>{var $X=Sw(),bw=Math.max;function OX(t,e,r){return e=bw(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,a=bw(n.length-e,0),o=Array(a);++i<a;)o[i]=n[e+i];i=-1;for(var s=Array(e+1);++i<e;)s[i]=n[i];return s[e]=r(o),$X(t,this,s)}}Cw.exports=OX});var kw=d((qye,Ew)=>{function IX(t){return function(){return t}}Ew.exports=IX});var $w=d((Mye,ww)=>{var DX=kw(),Nw=sv(),xX=ja(),LX=Nw?function(t,e){return Nw(t,"toString",{configurable:!0,enumerable:!1,value:DX(e),writable:!0})}:xX;ww.exports=LX});var Iw=d((Fye,Ow)=>{var qX=800,MX=16,FX=Date.now;function jX(t){var e=0,r=0;return function(){var n=FX(),i=MX-(n-r);if(r=n,i>0){if(++e>=qX)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}Ow.exports=jX});var xw=d((jye,Dw)=>{var GX=$w(),UX=Iw(),HX=UX(GX);Dw.exports=HX});var nd=d((Gye,Lw)=>{var KX=ja(),WX=Pw(),BX=xw();function VX(t,e){return BX(WX(t,e,KX),t+"")}Lw.exports=VX});var il=d((Uye,qw)=>{var zX=as(),YX=_n(),XX=Qu(),JX=vn();function QX(t,e,r){if(!JX(r))return!1;var n=typeof e;return(n=="number"?YX(r)&&XX(e,r.length):n=="string"&&e in r)?zX(r[e],t):!1}qw.exports=QX});var Fw=d((Hye,Mw)=>{var ZX=nd(),eJ=il();function tJ(t){return ZX(function(e,r){var n=-1,i=r.length,a=i>1?r[i-1]:void 0,o=i>2?r[2]:void 0;for(a=t.length>3&&typeof a=="function"?(i--,a):void 0,o&&eJ(r[0],r[1],o)&&(a=i<3?void 0:a,i=1),e=Object(e);++n<i;){var s=r[n];s&&t(e,s,n,a)}return e})}Mw.exports=tJ});var al=d((Kye,jw)=>{var rJ=el(),nJ=ds(),iJ=Fw(),aJ=_n(),oJ=Jo(),sJ=kr(),uJ=Object.prototype,lJ=uJ.hasOwnProperty,cJ=iJ(function(t,e){if(oJ(e)||aJ(e)){nJ(e,sJ(e),t);return}for(var r in e)lJ.call(e,r)&&rJ(t,r,e[r])});jw.exports=cJ});var ad=d(Ce=>{"use strict";var bi=Ce&&Ce.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),gs=Ce&&Ce.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ce,"__esModule",{value:!0});Ce.serializeProduction=Ce.serializeGrammar=Ce.Terminal=Ce.Alternation=Ce.RepetitionWithSeparator=Ce.Repetition=Ce.RepetitionMandatoryWithSeparator=Ce.RepetitionMandatory=Ce.Option=Ce.Alternative=Ce.Rule=Ce.NonTerminal=Ce.AbstractProduction=void 0;var Gw=gs(qt()),fJ=gs(Mt()),pv=gs(nl()),dJ=gs(fv()),Wn=gs(dv()),Bn=gs(al());function pJ(t){return hJ(t)?t.LABEL:t.name}function hJ(t){return(0,pv.default)(t.LABEL)&&t.LABEL!==""}var Vn=function(){function t(e){this._definition=e}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(e){this._definition=e},enumerable:!1,configurable:!0}),t.prototype.accept=function(e){e.visit(this),(0,fJ.default)(this.definition,function(r){r.accept(e)})},t}();Ce.AbstractProduction=Vn;var Uw=function(t){bi(e,t);function e(r){var n=t.call(this,[])||this;return n.idx=1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this.referencedRule!==void 0?this.referencedRule.definition:[]},set:function(r){},enumerable:!1,configurable:!0}),e.prototype.accept=function(r){r.visit(this)},e}(Vn);Ce.NonTerminal=Uw;var Hw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.orgText="",(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.Rule=Hw;var Kw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.ignoreAmbiguities=!1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.Alternative=Kw;var Ww=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.Option=Ww;var Bw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.RepetitionMandatory=Bw;var Vw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.RepetitionMandatoryWithSeparator=Vw;var zw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.Repetition=zw;var Yw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return e}(Vn);Ce.RepetitionWithSeparator=Yw;var Xw=function(t){bi(e,t);function e(r){var n=t.call(this,r.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,Bn.default)(n,(0,Wn.default)(r,function(i){return i!==void 0})),n}return Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(r){this._definition=r},enumerable:!1,configurable:!0}),e}(Vn);Ce.Alternation=Xw;var id=function(){function t(e){this.idx=1,(0,Bn.default)(this,(0,Wn.default)(e,function(r){return r!==void 0}))}return t.prototype.accept=function(e){e.visit(this)},t}();Ce.Terminal=id;function mJ(t){return(0,Gw.default)(t,ol)}Ce.serializeGrammar=mJ;function ol(t){function e(a){return(0,Gw.default)(a,ol)}if(t instanceof Uw){var r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return(0,pv.default)(t.label)&&(r.label=t.label),r}else{if(t instanceof Kw)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Ww)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Bw)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Vw)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:ol(new id({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Yw)return{type:"RepetitionWithSeparator",idx:t.idx,separator:ol(new id({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof zw)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Xw)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof id){var n={type:"Terminal",name:t.terminalType.name,label:pJ(t.terminalType),idx:t.idx};(0,pv.default)(t.label)&&(n.terminalLabel=t.label);var i=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,dJ.default)(i)?i.source:i),n}else{if(t instanceof Hw)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}Ce.serializeProduction=ol});var Jw=d(od=>{"use strict";Object.defineProperty(od,"__esModule",{value:!0});od.GAstVisitor=void 0;var zn=ad(),yJ=function(){function t(){}return t.prototype.visit=function(e){var r=e;switch(r.constructor){case zn.NonTerminal:return this.visitNonTerminal(r);case zn.Alternative:return this.visitAlternative(r);case zn.Option:return this.visitOption(r);case zn.RepetitionMandatory:return this.visitRepetitionMandatory(r);case zn.RepetitionMandatoryWithSeparator:return this.visitRepetitionMandatoryWithSeparator(r);case zn.RepetitionWithSeparator:return this.visitRepetitionWithSeparator(r);case zn.Repetition:return this.visitRepetition(r);case zn.Alternation:return this.visitAlternation(r);case zn.Terminal:return this.visitTerminal(r);case zn.Rule:return this.visitRule(r);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(e){},t.prototype.visitAlternative=function(e){},t.prototype.visitOption=function(e){},t.prototype.visitRepetition=function(e){},t.prototype.visitRepetitionMandatory=function(e){},t.prototype.visitRepetitionMandatoryWithSeparator=function(e){},t.prototype.visitRepetitionWithSeparator=function(e){},t.prototype.visitAlternation=function(e){},t.prototype.visitTerminal=function(e){},t.prototype.visitRule=function(e){},t}();od.GAstVisitor=yJ});var Zw=d((Vye,Qw)=>{var gJ=ua();function vJ(t,e){var r;return gJ(t,function(n,i,a){return r=e(n,i,a),!r}),!!r}Qw.exports=vJ});var sd=d((zye,e$)=>{var TJ=Wg(),_J=Vr(),RJ=Zw(),AJ=Oe(),SJ=il();function bJ(t,e,r){var n=AJ(t)?TJ:RJ;return r&&SJ(t,e,r)&&(e=void 0),n(t,_J(e,3))}e$.exports=bJ});var r$=d((Yye,t$)=>{function CJ(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}t$.exports=CJ});var i$=d((Xye,n$)=>{var PJ=ua();function EJ(t,e){var r=!0;return PJ(t,function(n,i,a){return r=!!e(n,i,a),r}),r}n$.exports=EJ});var sl=d((Jye,a$)=>{var kJ=r$(),NJ=i$(),wJ=Vr(),$J=Oe(),OJ=il();function IJ(t,e,r){var n=$J(t)?kJ:NJ;return r&&OJ(t,e,r)&&(e=void 0),n(t,wJ(e,3))}a$.exports=IJ});var hv=d((Qye,o$)=>{function DJ(t,e,r,n){for(var i=t.length,a=r+(n?1:-1);n?a--:++a<i;)if(e(t[a],a,t))return a;return-1}o$.exports=DJ});var u$=d((Zye,s$)=>{function xJ(t){return t!==t}s$.exports=xJ});var c$=d((ege,l$)=>{function LJ(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}l$.exports=LJ});var ud=d((tge,f$)=>{var qJ=hv(),MJ=u$(),FJ=c$();function jJ(t,e,r){return e===e?FJ(t,e,r):qJ(t,MJ,r)}f$.exports=jJ});var Ci=d((rge,d$)=>{var GJ=ud(),UJ=_n(),HJ=nl(),KJ=ys(),WJ=Hn(),BJ=Math.max;function VJ(t,e,r,n){t=UJ(t)?t:WJ(t),r=r&&!n?KJ(r):0;var i=t.length;return r<0&&(r=BJ(i+r,0)),HJ(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&GJ(t,e,r)>-1}d$.exports=VJ});var p$=d(zr=>{"use strict";var yv=zr&&zr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zr,"__esModule",{value:!0});zr.getProductionDslName=zr.isBranchingProd=zr.isOptionalProd=zr.isSequenceProd=void 0;var zJ=yv(sd()),YJ=yv(sl()),XJ=yv(Ci()),rt=ad();function JJ(t){return t instanceof rt.Alternative||t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionMandatory||t instanceof rt.RepetitionMandatoryWithSeparator||t instanceof rt.RepetitionWithSeparator||t instanceof rt.Terminal||t instanceof rt.Rule}zr.isSequenceProd=JJ;function mv(t,e){e===void 0&&(e=[]);var r=t instanceof rt.Option||t instanceof rt.Repetition||t instanceof rt.RepetitionWithSeparator;return r?!0:t instanceof rt.Alternation?(0,zJ.default)(t.definition,function(n){return mv(n,e)}):t instanceof rt.NonTerminal&&(0,XJ.default)(e,t)?!1:t instanceof rt.AbstractProduction?(t instanceof rt.NonTerminal&&e.push(t),(0,YJ.default)(t.definition,function(n){return mv(n,e)})):!1}zr.isOptionalProd=mv;function QJ(t){return t instanceof rt.Alternation}zr.isBranchingProd=QJ;function ZJ(t){if(t instanceof rt.NonTerminal)return"SUBRULE";if(t instanceof rt.Option)return"OPTION";if(t instanceof rt.Alternation)return"OR";if(t instanceof rt.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof rt.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof rt.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof rt.Repetition)return"MANY";if(t instanceof rt.Terminal)return"CONSUME";throw Error("non exhaustive match")}zr.getProductionDslName=ZJ});var dt=d(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.isSequenceProd=he.isBranchingProd=he.isOptionalProd=he.getProductionDslName=he.GAstVisitor=he.serializeProduction=he.serializeGrammar=he.Alternative=he.Alternation=he.RepetitionWithSeparator=he.RepetitionMandatoryWithSeparator=he.RepetitionMandatory=he.Repetition=he.Option=he.NonTerminal=he.Terminal=he.Rule=void 0;var Yr=ad();Object.defineProperty(he,"Rule",{enumerable:!0,get:function(){return Yr.Rule}});Object.defineProperty(he,"Terminal",{enumerable:!0,get:function(){return Yr.Terminal}});Object.defineProperty(he,"NonTerminal",{enumerable:!0,get:function(){return Yr.NonTerminal}});Object.defineProperty(he,"Option",{enumerable:!0,get:function(){return Yr.Option}});Object.defineProperty(he,"Repetition",{enumerable:!0,get:function(){return Yr.Repetition}});Object.defineProperty(he,"RepetitionMandatory",{enumerable:!0,get:function(){return Yr.RepetitionMandatory}});Object.defineProperty(he,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return Yr.RepetitionMandatoryWithSeparator}});Object.defineProperty(he,"RepetitionWithSeparator",{enumerable:!0,get:function(){return Yr.RepetitionWithSeparator}});Object.defineProperty(he,"Alternation",{enumerable:!0,get:function(){return Yr.Alternation}});Object.defineProperty(he,"Alternative",{enumerable:!0,get:function(){return Yr.Alternative}});Object.defineProperty(he,"serializeGrammar",{enumerable:!0,get:function(){return Yr.serializeGrammar}});Object.defineProperty(he,"serializeProduction",{enumerable:!0,get:function(){return Yr.serializeProduction}});var eQ=Jw();Object.defineProperty(he,"GAstVisitor",{enumerable:!0,get:function(){return eQ.GAstVisitor}});var ld=p$();Object.defineProperty(he,"getProductionDslName",{enumerable:!0,get:function(){return ld.getProductionDslName}});Object.defineProperty(he,"isOptionalProd",{enumerable:!0,get:function(){return ld.isOptionalProd}});Object.defineProperty(he,"isBranchingProd",{enumerable:!0,get:function(){return ld.isBranchingProd}});Object.defineProperty(he,"isSequenceProd",{enumerable:!0,get:function(){return ld.isSequenceProd}})});var cd=d(vs=>{"use strict";var y$=vs&&vs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(vs,"__esModule",{value:!0});vs.RestWalker=void 0;var tQ=y$(rd()),h$=y$(Mt()),Tr=dt(),rQ=function(){function t(){}return t.prototype.walk=function(e,r){var n=this;r===void 0&&(r=[]),(0,h$.default)(e.definition,function(i,a){var o=(0,tQ.default)(e.definition,a+1);if(i instanceof Tr.NonTerminal)n.walkProdRef(i,o,r);else if(i instanceof Tr.Terminal)n.walkTerminal(i,o,r);else if(i instanceof Tr.Alternative)n.walkFlat(i,o,r);else if(i instanceof Tr.Option)n.walkOption(i,o,r);else if(i instanceof Tr.RepetitionMandatory)n.walkAtLeastOne(i,o,r);else if(i instanceof Tr.RepetitionMandatoryWithSeparator)n.walkAtLeastOneSep(i,o,r);else if(i instanceof Tr.RepetitionWithSeparator)n.walkManySep(i,o,r);else if(i instanceof Tr.Repetition)n.walkMany(i,o,r);else if(i instanceof Tr.Alternation)n.walkOr(i,o,r);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(e,r,n){},t.prototype.walkProdRef=function(e,r,n){},t.prototype.walkFlat=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkOption=function(e,r,n){var i=r.concat(n);this.walk(e,i)},t.prototype.walkAtLeastOne=function(e,r,n){var i=[new Tr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkAtLeastOneSep=function(e,r,n){var i=m$(e,r,n);this.walk(e,i)},t.prototype.walkMany=function(e,r,n){var i=[new Tr.Option({definition:e.definition})].concat(r,n);this.walk(e,i)},t.prototype.walkManySep=function(e,r,n){var i=m$(e,r,n);this.walk(e,i)},t.prototype.walkOr=function(e,r,n){var i=this,a=r.concat(n);(0,h$.default)(e.definition,function(o){var s=new Tr.Alternative({definition:[o]});i.walk(s,a)})},t}();vs.RestWalker=rQ;function m$(t,e,r){var n=[new Tr.Option({definition:[new Tr.Terminal({terminalType:t.separator})].concat(t.definition)})],i=n.concat(e,r);return i}});var _$=d((oge,T$)=>{var g$=Ma(),nQ=Uu(),iQ=Oe(),v$=g$?g$.isConcatSpreadable:void 0;function aQ(t){return iQ(t)||nQ(t)||!!(v$&&t&&t[v$])}T$.exports=aQ});var fd=d((sge,A$)=>{var oQ=Wf(),sQ=_$();function R$(t,e,r,n,i){var a=-1,o=t.length;for(r||(r=sQ),i||(i=[]);++a<o;){var s=t[a];e>0&&r(s)?e>1?R$(s,e-1,r,n,i):oQ(i,s):n||(i[i.length]=s)}return i}A$.exports=R$});var Rn=d((uge,S$)=>{var uQ=fd();function lQ(t){var e=t==null?0:t.length;return e?uQ(t,1):[]}S$.exports=lQ});var gv=d((lge,b$)=>{var cQ=ud();function fQ(t,e){var r=t==null?0:t.length;return!!r&&cQ(t,e,0)>-1}b$.exports=fQ});var vv=d((cge,C$)=>{function dQ(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}C$.exports=dQ});var dd=d((fge,P$)=>{function pQ(){}P$.exports=pQ});var k$=d((dge,E$)=>{var Tv=Mg(),hQ=dd(),mQ=Kf(),yQ=1/0,gQ=Tv&&1/mQ(new Tv([,-0]))[1]==yQ?function(t){return new Tv(t)}:hQ;E$.exports=gQ});var _v=d((pge,N$)=>{var vQ=Uf(),TQ=gv(),_Q=vv(),RQ=Hf(),AQ=k$(),SQ=Kf(),bQ=200;function CQ(t,e,r){var n=-1,i=TQ,a=t.length,o=!0,s=[],u=s;if(r)o=!1,i=_Q;else if(a>=bQ){var l=e?null:AQ(t);if(l)return SQ(l);o=!1,i=RQ,u=new vQ}else u=e?[]:s;e:for(;++n<a;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,o&&f===f){for(var m=u.length;m--;)if(u[m]===f)continue e;e&&u.push(f),s.push(c)}else i(u,f,r)||(u!==s&&u.push(f),s.push(c))}return s}N$.exports=CQ});var pd=d((hge,w$)=>{var PQ=_v();function EQ(t){return t&&t.length?PQ(t):[]}w$.exports=EQ});var Sv=d(Xr=>{"use strict";var Av=Xr&&Xr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Xr,"__esModule",{value:!0});Xr.firstForTerminal=Xr.firstForBranching=Xr.firstForSequence=Xr.first=void 0;var kQ=Av(Rn()),O$=Av(pd()),NQ=Av(qt()),$$=dt(),Rv=dt();function hd(t){if(t instanceof $$.NonTerminal)return hd(t.referencedRule);if(t instanceof $$.Terminal)return x$(t);if((0,Rv.isSequenceProd)(t))return I$(t);if((0,Rv.isBranchingProd)(t))return D$(t);throw Error("non exhaustive match")}Xr.first=hd;function I$(t){for(var e=[],r=t.definition,n=0,i=r.length>n,a,o=!0;i&&o;)a=r[n],o=(0,Rv.isOptionalProd)(a),e=e.concat(hd(a)),n=n+1,i=r.length>n;return(0,O$.default)(e)}Xr.firstForSequence=I$;function D$(t){var e=(0,NQ.default)(t.definition,function(r){return hd(r)});return(0,O$.default)((0,kQ.default)(e))}Xr.firstForBranching=D$;function x$(t){return[t.terminalType]}Xr.firstForTerminal=x$});var bv=d(md=>{"use strict";Object.defineProperty(md,"__esModule",{value:!0});md.IN=void 0;md.IN="_~IN~_"});var j$=d(_r=>{"use strict";var wQ=_r&&_r.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),L$=_r&&_r.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(_r,"__esModule",{value:!0});_r.buildInProdFollowPrefix=_r.buildBetweenProdsFollowPrefix=_r.computeAllProdsFollows=_r.ResyncFollowsWalker=void 0;var $Q=cd(),OQ=Sv(),IQ=L$(Mt()),DQ=L$(al()),q$=bv(),xQ=dt(),M$=function(t){wQ(e,t);function e(r){var n=t.call(this)||this;return n.topProd=r,n.follows={},n}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(r,n,i){},e.prototype.walkProdRef=function(r,n,i){var a=F$(r.referencedRule,r.idx)+this.topProd.name,o=n.concat(i),s=new xQ.Alternative({definition:o}),u=(0,OQ.first)(s);this.follows[a]=u},e}($Q.RestWalker);_r.ResyncFollowsWalker=M$;function LQ(t){var e={};return(0,IQ.default)(t,function(r){var n=new M$(r).startWalking();(0,DQ.default)(e,n)}),e}_r.computeAllProdsFollows=LQ;function F$(t,e){return t.name+e+q$.IN}_r.buildBetweenProdsFollowPrefix=F$;function qQ(t){var e=t.terminalType.name;return e+t.idx+q$.IN}_r.buildInProdFollowPrefix=qQ});var Ga=d((vge,G$)=>{function MQ(t){return t===void 0}G$.exports=MQ});var H$=d((Tge,U$)=>{function FQ(t){return t&&t.length?t[0]:void 0}U$.exports=FQ});var Ts=d((_ge,K$)=>{K$.exports=H$()});var ul=d((Rge,W$)=>{function jQ(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var a=t[e];a&&(i[n++]=a)}return i}W$.exports=jQ});var Cv=d((Age,B$)=>{var GQ=ua();function UQ(t,e){var r=[];return GQ(t,function(n,i,a){e(n,i,a)&&r.push(n)}),r}B$.exports=UQ});var z$=d((Sge,V$)=>{var HQ="Expected a function";function KQ(t){if(typeof t!="function")throw new TypeError(HQ);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}V$.exports=KQ});var yd=d((bge,Y$)=>{var WQ=Bf(),BQ=Cv(),VQ=Vr(),zQ=Oe(),YQ=z$();function XQ(t,e){var r=zQ(t)?WQ:BQ;return r(t,YQ(VQ(e,3)))}Y$.exports=XQ});var J$=d((Cge,X$)=>{var JQ=Uf(),QQ=gv(),ZQ=vv(),eZ=is(),tZ=rs(),rZ=Hf(),nZ=200;function iZ(t,e,r,n){var i=-1,a=QQ,o=!0,s=t.length,u=[],l=e.length;if(!s)return u;r&&(e=eZ(e,tZ(r))),n?(a=ZQ,o=!1):e.length>=nZ&&(a=rZ,o=!1,e=new JQ(e));e:for(;++i<s;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,o&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;u.push(c)}else a(e,f,n)||u.push(c)}return u}X$.exports=iZ});var Z$=d((Pge,Q$)=>{var aZ=_n(),oZ=Tn();function sZ(t){return oZ(t)&&aZ(t)}Q$.exports=sZ});var gd=d((Ege,tO)=>{var uZ=J$(),lZ=fd(),cZ=nd(),eO=Z$(),fZ=cZ(function(t,e){return eO(t)?uZ(t,lZ(e,1,eO,!0)):[]});tO.exports=fZ});var nO=d((kge,rO)=>{var dZ=ud(),pZ=ys(),hZ=Math.max;function mZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:pZ(r);return i<0&&(i=hZ(n+i,0)),dZ(t,e,i)}rO.exports=mZ});var aO=d((Nge,iO)=>{var yZ=Vr(),gZ=_n(),vZ=kr();function TZ(t){return function(e,r,n){var i=Object(e);if(!gZ(e)){var a=yZ(r,3);e=vZ(e),r=function(s){return a(i[s],s,i)}}var o=t(e,r,n);return o>-1?i[a?e[o]:o]:void 0}}iO.exports=TZ});var sO=d((wge,oO)=>{var _Z=hv(),RZ=Vr(),AZ=ys(),SZ=Math.max;function bZ(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:AZ(r);return i<0&&(i=SZ(n+i,0)),_Z(t,RZ(e,3),i)}oO.exports=bZ});var vd=d(($ge,uO)=>{var CZ=aO(),PZ=sO(),EZ=CZ(PZ);uO.exports=EZ});var ll=d((Oge,lO)=>{var kZ=Bf(),NZ=Cv(),wZ=Vr(),$Z=Oe();function OZ(t,e){var r=$Z(t)?kZ:NZ;return r(t,wZ(e,3))}lO.exports=OZ});var Pv=d((Ige,fO)=>{var IZ=nd(),DZ=as(),xZ=il(),LZ=tl(),cO=Object.prototype,qZ=cO.hasOwnProperty,MZ=IZ(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&xZ(e[0],e[1],i)&&(n=1);++r<n;)for(var a=e[r],o=LZ(a),s=-1,u=o.length;++s<u;){var l=o[s],c=t[l];(c===void 0||DZ(c,cO[l])&&!qZ.call(t,l))&&(t[l]=a[l])}return t});fO.exports=MZ});var pO=d((Dge,dO)=>{function FZ(t,e,r,n){var i=-1,a=t==null?0:t.length;for(n&&a&&(r=t[++i]);++i<a;)r=e(r,t[i],i,t);return r}dO.exports=FZ});var mO=d((xge,hO)=>{function jZ(t,e,r,n,i){return i(t,function(a,o,s){r=n?(n=!1,a):e(r,a,o,s)}),r}hO.exports=jZ});var Pi=d((Lge,yO)=>{var GZ=pO(),UZ=ua(),HZ=Vr(),KZ=mO(),WZ=Oe();function BZ(t,e,r){var n=WZ(t)?GZ:KZ,i=arguments.length<3;return n(t,HZ(e,4),r,i,UZ)}yO.exports=BZ});var _d=d(_s=>{"use strict";Object.defineProperty(_s,"__esModule",{value:!0});_s.clearRegExpParserCache=_s.getRegExpAst=void 0;var VZ=Iu(),Td={},zZ=new VZ.RegExpParser;function YZ(t){var e=t.toString();if(Td.hasOwnProperty(e))return Td[e];var r=zZ.pattern(e);return Td[e]=r,r}_s.getRegExpAst=YZ;function XZ(){Td={}}_s.clearRegExpParserCache=XZ});var AO=d(rr=>{"use strict";var JZ=rr&&rr.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Rs=rr&&rr.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(rr,"__esModule",{value:!0});rr.canMatchCharCode=rr.firstCharOptimizedIndices=rr.getOptimizedStartCodesIndices=rr.failedOptimizationPrefixMsg=void 0;var TO=Iu(),QZ=Rs(Oe()),ZZ=Rs(sl()),eee=Rs(Mt()),Ev=Rs(vd()),tee=Rs(Hn()),Nv=Rs(Ci()),gO=ms(),_O=_d(),Ei=wv(),RO="Complement Sets are not supported for first char optimization";rr.failedOptimizationPrefixMsg=`Unable to use "first char" lexer optimizations:
`;function ree(t,e){e===void 0&&(e=!1);try{var r=(0,_O.getRegExpAst)(t),n=Ad(r.value,{},r.flags.ignoreCase);return n}catch(a){if(a.message===RO)e&&(0,gO.PRINT_WARNING)("".concat(rr.failedOptimizationPrefixMsg)+"	Unable to optimize: < ".concat(t.toString(),` >
`)+`	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{var i="";e&&(i=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),(0,gO.PRINT_ERROR)("".concat(rr.failedOptimizationPrefixMsg,`
`)+"	Failed parsing: < ".concat(t.toString(),` >
`)+"	Using the regexp-to-ast library version: ".concat(TO.VERSION,`
`)+"	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+i)}}return[]}rr.getOptimizedStartCodesIndices=ree;function Ad(t,e,r){switch(t.type){case"Disjunction":for(var n=0;n<t.value.length;n++)Ad(t.value[n],e,r);break;case"Alternative":for(var i=t.value,n=0;n<i.length;n++){var a=i[n];switch(a.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}var o=a;switch(o.type){case"Character":Rd(o.value,e,r);break;case"Set":if(o.complement===!0)throw Error(RO);(0,eee.default)(o.value,function(l){if(typeof l=="number")Rd(l,e,r);else{var c=l;if(r===!0)for(var f=c.from;f<=c.to;f++)Rd(f,e,r);else{for(var f=c.from;f<=c.to&&f<Ei.minOptimizationVal;f++)Rd(f,e,r);if(c.to>=Ei.minOptimizationVal)for(var m=c.from>=Ei.minOptimizationVal?c.from:Ei.minOptimizationVal,v=c.to,y=(0,Ei.charCodeToOptimizedIndex)(m),R=(0,Ei.charCodeToOptimizedIndex)(v),P=y;P<=R;P++)e[P]=P}}});break;case"Group":Ad(o.value,e,r);break;default:throw Error("Non Exhaustive Match")}var s=o.quantifier!==void 0&&o.quantifier.atLeast===0;if(o.type==="Group"&&kv(o)===!1||o.type!=="Group"&&s===!1)break}break;default:throw Error("non exhaustive match!")}return(0,tee.default)(e)}rr.firstCharOptimizedIndices=Ad;function Rd(t,e,r){var n=(0,Ei.charCodeToOptimizedIndex)(t);e[n]=n,r===!0&&nee(t,e)}function nee(t,e){var r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){var i=(0,Ei.charCodeToOptimizedIndex)(n.charCodeAt(0));e[i]=i}else{var a=r.toLowerCase();if(a!==r){var i=(0,Ei.charCodeToOptimizedIndex)(a.charCodeAt(0));e[i]=i}}}function vO(t,e){return(0,Ev.default)(t.value,function(r){if(typeof r=="number")return(0,Nv.default)(e,r);var n=r;return(0,Ev.default)(e,function(i){return n.from<=i&&i<=n.to})!==void 0})}function kv(t){var e=t.quantifier;return e&&e.atLeast===0?!0:t.value?(0,QZ.default)(t.value)?(0,ZZ.default)(t.value,kv):kv(t.value):!1}var iee=function(t){JZ(e,t);function e(r){var n=t.call(this)||this;return n.targetCharCodes=r,n.found=!1,n}return e.prototype.visitChildren=function(r){if(this.found!==!0){switch(r.type){case"Lookahead":this.visitLookahead(r);return;case"NegativeLookahead":this.visitNegativeLookahead(r);return}t.prototype.visitChildren.call(this,r)}},e.prototype.visitCharacter=function(r){(0,Nv.default)(this.targetCharCodes,r.value)&&(this.found=!0)},e.prototype.visitSet=function(r){r.complement?vO(r,this.targetCharCodes)===void 0&&(this.found=!0):vO(r,this.targetCharCodes)!==void 0&&(this.found=!0)},e}(TO.BaseRegExpVisitor);function aee(t,e){if(e instanceof RegExp){var r=(0,_O.getRegExpAst)(e),n=new iee(t);return n.visit(r),n.found}else return(0,Ev.default)(e,function(i){return(0,Nv.default)(t,i.charCodeAt(0))})!==void 0}rr.canMatchCharCode=aee});var wv=d(K=>{"use strict";var CO=K&&K.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),lt=K&&K.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(K,"__esModule",{value:!0});K.charCodeToOptimizedIndex=K.minOptimizationVal=K.buildLineBreakIssueMessage=K.LineTerminatorOptimizedTester=K.isShortPattern=K.isCustomPattern=K.cloneEmptyGroups=K.performWarningRuntimeChecks=K.performRuntimeChecks=K.addStickyFlag=K.addStartOfInput=K.findUnreachablePatterns=K.findModesThatDoNotExist=K.findInvalidGroupType=K.findDuplicatePatterns=K.findUnsupportedFlags=K.findStartOfInputAnchor=K.findEmptyMatchRegExps=K.findEndOfInputAnchor=K.findInvalidPatterns=K.findMissingPatterns=K.validatePatterns=K.analyzeTokenTypes=K.enableSticky=K.disableSticky=K.SUPPORT_STICKY=K.MODES=K.DEFAULT_MODE=void 0;var PO=Iu(),De=cl(),oee=lt(Ts()),EO=lt(Er()),kO=lt(ul()),bd=lt(Oe()),see=lt(Hn()),uee=lt(Rn()),NO=lt(yd()),wO=lt(gd()),SO=lt(nO()),nt=lt(qt()),ki=lt(Mt()),Ni=lt(nl()),Pd=lt(Qo()),Ov=lt(Ga()),lee=lt(vd()),nr=lt(Nr()),cee=lt(kr()),la=lt(fv()),Yn=lt(ll()),fee=lt(Pv()),Cd=lt(Pi()),Ed=lt(Ci()),bO=ms(),As=AO(),$O=_d(),Ua="PATTERN";K.DEFAULT_MODE="defaultMode";K.MODES="modes";K.SUPPORT_STICKY=typeof new RegExp("(?:)").sticky=="boolean";function dee(){K.SUPPORT_STICKY=!1}K.disableSticky=dee;function pee(){K.SUPPORT_STICKY=!0}K.enableSticky=pee;function hee(t,e){e=(0,fee.default)(e,{useSticky:K.SUPPORT_STICKY,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:function(b,S){return S()}});var r=e.tracer;r("initCharCodeToOptimizedIndexMap",function(){bee()});var n;r("Reject Lexer.NA",function(){n=(0,NO.default)(t,function(b){return b[Ua]===De.Lexer.NA})});var i=!1,a;r("Transform Patterns",function(){i=!1,a=(0,nt.default)(n,function(b){var S=b[Ua];if((0,la.default)(S)){var O=S.source;return O.length===1&&O!=="^"&&O!=="$"&&O!=="."&&!S.ignoreCase?O:O.length===2&&O[0]==="\\"&&!(0,Ed.default)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],O[1])?O[1]:e.useSticky?Dv(S):Iv(S)}else{if((0,Pd.default)(S))return i=!0,{exec:S};if(typeof S=="object")return i=!0,S;if(typeof S=="string"){if(S.length===1)return S;var F=S.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),W=new RegExp(F);return e.useSticky?Dv(W):Iv(W)}else throw Error("non exhaustive match")}})});var o,s,u,l,c;r("misc mapping",function(){o=(0,nt.default)(n,function(b){return b.tokenTypeIdx}),s=(0,nt.default)(n,function(b){var S=b.GROUP;if(S!==De.Lexer.SKIPPED){if((0,Ni.default)(S))return S;if((0,Ov.default)(S))return!1;throw Error("non exhaustive match")}}),u=(0,nt.default)(n,function(b){var S=b.LONGER_ALT;if(S){var O=(0,bd.default)(S)?(0,nt.default)(S,function(F){return(0,SO.default)(n,F)}):[(0,SO.default)(n,S)];return O}}),l=(0,nt.default)(n,function(b){return b.PUSH_MODE}),c=(0,nt.default)(n,function(b){return(0,nr.default)(b,"POP_MODE")})});var f;r("Line Terminator Handling",function(){var b=WO(e.lineTerminatorCharacters);f=(0,nt.default)(n,function(S){return!1}),e.positionTracking!=="onlyOffset"&&(f=(0,nt.default)(n,function(S){return(0,nr.default)(S,"LINE_BREAKS")?!!S.LINE_BREAKS:HO(S,b)===!1&&(0,As.canMatchCharCode)(b,S.PATTERN)}))});var m,v,y,R;r("Misc Mapping #2",function(){m=(0,nt.default)(n,Lv),v=(0,nt.default)(a,UO),y=(0,Cd.default)(n,function(b,S){var O=S.GROUP;return(0,Ni.default)(O)&&O!==De.Lexer.SKIPPED&&(b[O]=[]),b},{}),R=(0,nt.default)(a,function(b,S){return{pattern:a[S],longerAlt:u[S],canLineTerminator:f[S],isCustom:m[S],short:v[S],group:s[S],push:l[S],pop:c[S],tokenTypeIdx:o[S],tokenType:n[S]}})});var P=!0,E=[];return e.safeMode||r("First Char Optimization",function(){E=(0,Cd.default)(n,function(b,S,O){if(typeof S.PATTERN=="string"){var F=S.PATTERN.charCodeAt(0),W=xv(F);$v(b,W,R[O])}else if((0,bd.default)(S.START_CHARS_HINT)){var re;(0,ki.default)(S.START_CHARS_HINT,function(V){var Ae=typeof V=="string"?V.charCodeAt(0):V,Ye=xv(Ae);re!==Ye&&(re=Ye,$v(b,Ye,R[O]))})}else if((0,la.default)(S.PATTERN))if(S.PATTERN.unicode)P=!1,e.ensureOptimizations&&(0,bO.PRINT_ERROR)("".concat(As.failedOptimizationPrefixMsg)+"	Unable to analyze < ".concat(S.PATTERN.toString(),` > pattern.
`)+`	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{var Ne=(0,As.getOptimizedStartCodesIndices)(S.PATTERN,e.ensureOptimizations);(0,EO.default)(Ne)&&(P=!1),(0,ki.default)(Ne,function(V){$v(b,V,R[O])})}else e.ensureOptimizations&&(0,bO.PRINT_ERROR)("".concat(As.failedOptimizationPrefixMsg)+"	TokenType: <".concat(S.name,`> is using a custom token pattern without providing <start_chars_hint> parameter.
`)+`	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),P=!1;return b},[])}),{emptyGroups:y,patternIdxToConfig:R,charCodeToPatternIdxToConfig:E,hasCustom:i,canBeOptimized:P}}K.analyzeTokenTypes=hee;function mee(t,e){var r=[],n=OO(t);r=r.concat(n.errors);var i=IO(n.valid),a=i.valid;return r=r.concat(i.errors),r=r.concat(yee(a)),r=r.concat(FO(a)),r=r.concat(jO(a,e)),r=r.concat(GO(a)),r}K.validatePatterns=mee;function yee(t){var e=[],r=(0,Yn.default)(t,function(n){return(0,la.default)(n[Ua])});return e=e.concat(DO(r)),e=e.concat(LO(r)),e=e.concat(qO(r)),e=e.concat(MO(r)),e=e.concat(xO(r)),e}function OO(t){var e=(0,Yn.default)(t,function(i){return!(0,nr.default)(i,Ua)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:De.LexerDefinitionErrorType.MISSING_PATTERN,tokenTypes:[i]}}),n=(0,wO.default)(t,e);return{errors:r,valid:n}}K.findMissingPatterns=OO;function IO(t){var e=(0,Yn.default)(t,function(i){var a=i[Ua];return!(0,la.default)(a)&&!(0,Pd.default)(a)&&!(0,nr.default)(a,"exec")&&!(0,Ni.default)(a)}),r=(0,nt.default)(e,function(i){return{message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:De.LexerDefinitionErrorType.INVALID_PATTERN,tokenTypes:[i]}}),n=(0,wO.default)(t,e);return{errors:r,valid:n}}K.findInvalidPatterns=IO;var gee=/[^\\][$]/;function DO(t){var e=function(i){CO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitEndAnchor=function(o){this.found=!0},a}(PO.BaseRegExpVisitor),r=(0,Yn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,$O.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return gee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findEndOfInputAnchor=DO;function xO(t){var e=(0,Yn.default)(t,function(n){var i=n.PATTERN;return i.test("")}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:De.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,tokenTypes:[n]}});return r}K.findEmptyMatchRegExps=xO;var vee=/[^\\[][\^]|^\^/;function LO(t){var e=function(i){CO(a,i);function a(){var o=i!==null&&i.apply(this,arguments)||this;return o.found=!1,o}return a.prototype.visitStartAnchor=function(o){this.found=!0},a}(PO.BaseRegExpVisitor),r=(0,Yn.default)(t,function(i){var a=i.PATTERN;try{var o=(0,$O.getRegExpAst)(a),s=new e;return s.visit(o),s.found}catch{return vee.test(a.source)}}),n=(0,nt.default)(r,function(i){return{message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:De.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,tokenTypes:[i]}});return n}K.findStartOfInputAnchor=LO;function qO(t){var e=(0,Yn.default)(t,function(n){var i=n[Ua];return i instanceof RegExp&&(i.multiline||i.global)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:De.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}});return r}K.findUnsupportedFlags=qO;function MO(t){var e=[],r=(0,nt.default)(t,function(a){return(0,Cd.default)(t,function(o,s){return a.PATTERN.source===s.PATTERN.source&&!(0,Ed.default)(e,s)&&s.PATTERN!==De.Lexer.NA&&(e.push(s),o.push(s)),o},[])});r=(0,kO.default)(r);var n=(0,Yn.default)(r,function(a){return a.length>1}),i=(0,nt.default)(n,function(a){var o=(0,nt.default)(a,function(u){return u.name}),s=(0,oee.default)(a).PATTERN;return{message:"The same RegExp pattern ->".concat(s,"<-")+"has been used in all of the following Token Types: ".concat(o.join(", ")," <-"),type:De.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,tokenTypes:a}});return i}K.findDuplicatePatterns=MO;function FO(t){var e=(0,Yn.default)(t,function(n){if(!(0,nr.default)(n,"GROUP"))return!1;var i=n.GROUP;return i!==De.Lexer.SKIPPED&&i!==De.Lexer.NA&&!(0,Ni.default)(i)}),r=(0,nt.default)(e,function(n){return{message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:De.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}});return r}K.findInvalidGroupType=FO;function jO(t,e){var r=(0,Yn.default)(t,function(i){return i.PUSH_MODE!==void 0&&!(0,Ed.default)(e,i.PUSH_MODE)}),n=(0,nt.default)(r,function(i){var a="Token Type: ->".concat(i.name,"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE,"<-")+"which does not exist";return{message:a,type:De.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}});return n}K.findModesThatDoNotExist=jO;function GO(t){var e=[],r=(0,Cd.default)(t,function(n,i,a){var o=i.PATTERN;return o===De.Lexer.NA||((0,Ni.default)(o)?n.push({str:o,idx:a,tokenType:i}):(0,la.default)(o)&&_ee(o)&&n.push({str:o.source,idx:a,tokenType:i})),n},[]);return(0,ki.default)(t,function(n,i){(0,ki.default)(r,function(a){var o=a.str,s=a.idx,u=a.tokenType;if(i<s&&Tee(o,n.PATTERN)){var l="Token: ->".concat(u.name,`<- can never be matched.
`)+"Because it appears AFTER the Token Type ->".concat(n.name,"<-")+`in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:De.LexerDefinitionErrorType.UNREACHABLE_PATTERN,tokenTypes:[n,u]})}})}),e}K.findUnreachablePatterns=GO;function Tee(t,e){if((0,la.default)(e)){var r=e.exec(t);return r!==null&&r.index===0}else{if((0,Pd.default)(e))return e(t,0,[],{});if((0,nr.default)(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function _ee(t){var e=[".","\\","[","]","|","^","$","(",")","?","*","+","{"];return(0,lee.default)(e,function(r){return t.source.indexOf(r)!==-1})===void 0}function Iv(t){var e=t.ignoreCase?"i":"";return new RegExp("^(?:".concat(t.source,")"),e)}K.addStartOfInput=Iv;function Dv(t){var e=t.ignoreCase?"iy":"y";return new RegExp("".concat(t.source),e)}K.addStickyFlag=Dv;function Ree(t,e,r){var n=[];return(0,nr.default)(t,K.DEFAULT_MODE)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.DEFAULT_MODE+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,nr.default)(t,K.MODES)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+K.MODES+`> property in its definition
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,nr.default)(t,K.MODES)&&(0,nr.default)(t,K.DEFAULT_MODE)&&!(0,nr.default)(t.modes,t.defaultMode)&&n.push({message:"A MultiMode Lexer cannot be initialized with a ".concat(K.DEFAULT_MODE,": <").concat(t.defaultMode,">")+`which does not exist
`,type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,nr.default)(t,K.MODES)&&(0,ki.default)(t.modes,function(i,a){(0,ki.default)(i,function(o,s){if((0,Ov.default)(o))n.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:"+"<".concat(a,"> at index: <").concat(s,`>
`),type:De.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if((0,nr.default)(o,"LONGER_ALT")){var u=(0,bd.default)(o.LONGER_ALT)?o.LONGER_ALT:[o.LONGER_ALT];(0,ki.default)(u,function(l){!(0,Ov.default)(l)&&!(0,Ed.default)(i,l)&&n.push({message:"A MultiMode Lexer cannot be initialized with a longer_alt <".concat(l.name,"> on token <").concat(o.name,"> outside of mode <").concat(a,`>
`),type:De.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}K.performRuntimeChecks=Ree;function Aee(t,e,r){var n=[],i=!1,a=(0,kO.default)((0,uee.default)((0,see.default)(t.modes))),o=(0,NO.default)(a,function(u){return u[Ua]===De.Lexer.NA}),s=WO(r);return e&&(0,ki.default)(o,function(u){var l=HO(u,s);if(l!==!1){var c=KO(u,l),f={message:c,type:l.issue,tokenType:u};n.push(f)}else(0,nr.default)(u,"LINE_BREAKS")?u.LINE_BREAKS===!0&&(i=!0):(0,As.canMatchCharCode)(s,u.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:De.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS}),n}K.performWarningRuntimeChecks=Aee;function See(t){var e={},r=(0,cee.default)(t);return(0,ki.default)(r,function(n){var i=t[n];if((0,bd.default)(i))e[n]=[];else throw Error("non exhaustive match")}),e}K.cloneEmptyGroups=See;function Lv(t){var e=t.PATTERN;if((0,la.default)(e))return!1;if((0,Pd.default)(e))return!0;if((0,nr.default)(e,"exec"))return!0;if((0,Ni.default)(e))return!1;throw Error("non exhaustive match")}K.isCustomPattern=Lv;function UO(t){return(0,Ni.default)(t)&&t.length===1?t.charCodeAt(0):!1}K.isShortPattern=UO;K.LineTerminatorOptimizedTester={test:function(t){for(var e=t.length,r=this.lastIndex;r<e;r++){var n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function HO(t,e){if((0,nr.default)(t,"LINE_BREAKS"))return!1;if((0,la.default)(t.PATTERN)){try{(0,As.canMatchCharCode)(e,t.PATTERN)}catch(r){return{issue:De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if((0,Ni.default)(t.PATTERN))return!1;if(Lv(t))return{issue:De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function KO(t,e){if(e.issue===De.LexerDefinitionErrorType.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	 Root cause: ".concat(e.errMsg,`.
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===De.LexerDefinitionErrorType.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+"	The problem is in the <".concat(t.name,`> Token Type
`)+"	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}K.buildLineBreakIssueMessage=KO;function WO(t){var e=(0,nt.default)(t,function(r){return(0,Ni.default)(r)?r.charCodeAt(0):r});return e}function $v(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}K.minOptimizationVal=256;var Sd=[];function xv(t){return t<K.minOptimizationVal?t:Sd[t]}K.charCodeToOptimizedIndex=xv;function bee(){if((0,EO.default)(Sd)){Sd=new Array(65536);for(var t=0;t<65536;t++)Sd[t]=t>255?255+~~(t/255):t}}});var kd=d((jge,BO)=>{function Cee(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}BO.exports=Cee});var Ka=d(fe=>{"use strict";var Xn=fe&&fe.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(fe,"__esModule",{value:!0});fe.isTokenType=fe.hasExtendingTokensTypesMapProperty=fe.hasExtendingTokensTypesProperty=fe.hasCategoriesProperty=fe.hasShortKeyProperty=fe.singleAssignCategoriesToksMap=fe.assignCategoriesMapProp=fe.assignCategoriesTokensProp=fe.assignTokenDefaultProps=fe.expandCategories=fe.augmentTokenTypes=fe.tokenIdxToClass=fe.tokenShortNameIdx=fe.tokenStructuredMatcherNoCategories=fe.tokenStructuredMatcher=void 0;var Pee=Xn(Er()),Eee=Xn(ul()),kee=Xn(Oe()),Nee=Xn(Rn()),wee=Xn(gd()),$ee=Xn(qt()),Ha=Xn(Mt()),fl=Xn(Nr()),Oee=Xn(Ci()),Iee=Xn(Si());function Dee(t,e){var r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}fe.tokenStructuredMatcher=Dee;function xee(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}fe.tokenStructuredMatcherNoCategories=xee;fe.tokenShortNameIdx=1;fe.tokenIdxToClass={};function Lee(t){var e=VO(t);zO(e),XO(e),YO(e),(0,Ha.default)(e,function(r){r.isParent=r.categoryMatches.length>0})}fe.augmentTokenTypes=Lee;function VO(t){for(var e=(0,Iee.default)(t),r=t,n=!0;n;){r=(0,Eee.default)((0,Nee.default)((0,$ee.default)(r,function(a){return a.CATEGORIES})));var i=(0,wee.default)(r,e);e=e.concat(i),(0,Pee.default)(i)?n=!1:r=i}return e}fe.expandCategories=VO;function zO(t){(0,Ha.default)(t,function(e){JO(e)||(fe.tokenIdxToClass[fe.tokenShortNameIdx]=e,e.tokenTypeIdx=fe.tokenShortNameIdx++),qv(e)&&!(0,kee.default)(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),qv(e)||(e.CATEGORIES=[]),QO(e)||(e.categoryMatches=[]),ZO(e)||(e.categoryMatchesMap={})})}fe.assignTokenDefaultProps=zO;function YO(t){(0,Ha.default)(t,function(e){e.categoryMatches=[],(0,Ha.default)(e.categoryMatchesMap,function(r,n){e.categoryMatches.push(fe.tokenIdxToClass[n].tokenTypeIdx)})})}fe.assignCategoriesTokensProp=YO;function XO(t){(0,Ha.default)(t,function(e){Mv([],e)})}fe.assignCategoriesMapProp=XO;function Mv(t,e){(0,Ha.default)(t,function(r){e.categoryMatchesMap[r.tokenTypeIdx]=!0}),(0,Ha.default)(e.CATEGORIES,function(r){var n=t.concat(e);(0,Oee.default)(n,r)||Mv(n,r)})}fe.singleAssignCategoriesToksMap=Mv;function JO(t){return(0,fl.default)(t,"tokenTypeIdx")}fe.hasShortKeyProperty=JO;function qv(t){return(0,fl.default)(t,"CATEGORIES")}fe.hasCategoriesProperty=qv;function QO(t){return(0,fl.default)(t,"categoryMatches")}fe.hasExtendingTokensTypesProperty=QO;function ZO(t){return(0,fl.default)(t,"categoryMatchesMap")}fe.hasExtendingTokensTypesMapProperty=ZO;function qee(t){return(0,fl.default)(t,"tokenTypeIdx")}fe.isTokenType=qee});var Fv=d(Nd=>{"use strict";Object.defineProperty(Nd,"__esModule",{value:!0});Nd.defaultLexerErrorProvider=void 0;Nd.defaultLexerErrorProvider={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->".concat(t.image,"<- The Mode Stack is empty")},buildUnexpectedCharactersMessage:function(t,e,r,n,i){return"unexpected character: ->".concat(t.charAt(e),"<- at offset: ").concat(e,",")+" skipped ".concat(r," characters.")}}});var cl=d($i=>{"use strict";var wr=$i&&$i.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($i,"__esModule",{value:!0});$i.Lexer=$i.LexerDefinitionErrorType=void 0;var wi=wv(),jv=wr(dd()),wd=wr(Er()),Mee=wr(Oe()),Fee=wr(kd()),jee=wr(yd()),e1=wr(qt()),Gv=wr(Mt()),Gee=wr(kr()),Uee=wr(Ga()),t1=wr(ja()),r1=wr(al()),Hee=wr(Pi()),n1=wr(Si()),Uv=ms(),Kee=Ka(),Wee=Fv(),Bee=_d(),Vee;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(Vee=$i.LexerDefinitionErrorType||($i.LexerDefinitionErrorType={}));var dl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Wee.defaultLexerErrorProvider,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(dl);var zee=function(){function t(e,r){r===void 0&&(r=dl);var n=this;if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=function(a,o){if(n.traceInitPerf===!0){n.traceInitIndent++;var s=new Array(n.traceInitIndent+1).join("	");n.traceInitIndent<n.traceInitMaxIdent&&console.log("".concat(s,"--> <").concat(a,">"));var u=(0,Uv.timer)(o),l=u.time,c=u.value,f=l>10?console.warn:console.log;return n.traceInitIndent<n.traceInitMaxIdent&&f("".concat(s,"<-- <").concat(a,"> time: ").concat(l,"ms")),n.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=(0,r1.default)({},dl,r);var i=this.config.traceInitPerf;i===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof i=="number"&&(this.traceInitMaxIdent=i,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var a,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===dl.lineTerminatorsPattern)n.config.lineTerminatorsPattern=wi.LineTerminatorOptimizedTester;else if(n.config.lineTerminatorCharacters===dl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,Mee.default)(e)?a={modes:{defaultMode:(0,n1.default)(e)},defaultMode:wi.DEFAULT_MODE}:(o=!1,a=(0,n1.default)(e))}),n.config.skipValidations===!1&&(n.TRACE_INIT("performRuntimeChecks",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,wi.performRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((0,wi.performWarningRuntimeChecks)(a,n.trackStartLines,n.config.lineTerminatorCharacters))})),a.modes=a.modes?a.modes:{},(0,Gv.default)(a.modes,function(c,f){a.modes[f]=(0,jee.default)(c,function(m){return(0,Uee.default)(m)})});var s=(0,Gee.default)(a.modes);if((0,Gv.default)(a.modes,function(c,f){n.TRACE_INIT("Mode: <".concat(f,"> processing"),function(){if(n.modes.push(f),n.config.skipValidations===!1&&n.TRACE_INIT("validatePatterns",function(){n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((0,wi.validatePatterns)(c,s))}),(0,wd.default)(n.lexerDefinitionErrors)){(0,Kee.augmentTokenTypes)(c);var m;n.TRACE_INIT("analyzeTokenTypes",function(){m=(0,wi.analyzeTokenTypes)(c,{lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:n.TRACE_INIT})}),n.patternIdxToConfig[f]=m.patternIdxToConfig,n.charCodeToPatternIdxToConfig[f]=m.charCodeToPatternIdxToConfig,n.emptyGroups=(0,r1.default)({},n.emptyGroups,m.emptyGroups),n.hasCustom=m.hasCustom||n.hasCustom,n.canModeBeOptimized[f]=m.canBeOptimized}})}),n.defaultMode=a.defaultMode,!(0,wd.default)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling){var u=(0,e1.default)(n.lexerDefinitionErrors,function(c){return c.message}),l=u.join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}(0,Gv.default)(n.lexerDefinitionWarning,function(c){(0,Uv.PRINT_WARNING)(c.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(wi.SUPPORT_STICKY?(n.chopInput=t1.default,n.match=n.matchWithTest):(n.updateLastIndex=jv.default,n.match=n.matchWithExec),o&&(n.handleModes=jv.default),n.trackStartLines===!1&&(n.computeNewColumn=t1.default),n.trackEndLines===!1&&(n.updateTokenEndLineColumnLocation=jv.default),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking,'"'));n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var c=(0,Hee.default)(n.canModeBeOptimized,function(f,m,v){return m===!1&&f.push(v),f},[]);if(r.ensureOptimizations&&!(0,wd.default)(c))throw Error("Lexer Modes: < ".concat(c.join(", "),` > cannot be optimized.
`)+`	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),n.TRACE_INIT("clearRegExpParserCache",function(){(0,Bee.clearRegExpParserCache)()}),n.TRACE_INIT("toFastProperties",function(){(0,Uv.toFastProperties)(n)})})}return t.prototype.tokenize=function(e,r){if(r===void 0&&(r=this.defaultMode),!(0,wd.default)(this.lexerDefinitionErrors)){var n=(0,e1.default)(this.lexerDefinitionErrors,function(a){return a.message}),i=n.join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)},t.prototype.tokenizeInternal=function(e,r){var n=this,i,a,o,s,u,l,c,f,m,v,y,R,P,E,b,S,O=e,F=O.length,W=0,re=0,Ne=this.hasCustom?0:Math.floor(e.length/10),V=new Array(Ne),Ae=[],Ye=this.trackStartLines?1:void 0,We=this.trackStartLines?1:void 0,q=(0,wi.cloneEmptyGroups)(this.emptyGroups),L=this.trackStartLines,j=this.config.lineTerminatorsPattern,B=0,oe=[],se=[],ee=[],st=[];Object.freeze(st);var Xe;function Ct(){return oe}function en($t){var rn=(0,wi.charCodeToOptimizedIndex)($t),nn=se[rn];return nn===void 0?st:nn}var Sr=function($t){if(ee.length===1&&$t.tokenType.PUSH_MODE===void 0){var rn=n.config.errorMessageProvider.buildUnableToPopLexerModeMessage($t);Ae.push({offset:$t.startOffset,line:$t.startLine,column:$t.startColumn,length:$t.image.length,message:rn})}else{ee.pop();var nn=(0,Fee.default)(ee);oe=n.patternIdxToConfig[nn],se=n.charCodeToPatternIdxToConfig[nn],B=oe.length;var wn=n.canModeBeOptimized[nn]&&n.config.safeMode===!1;se&&wn?Xe=en:Xe=Ct}};function oo($t){ee.push($t),se=this.charCodeToPatternIdxToConfig[$t],oe=this.patternIdxToConfig[$t],B=oe.length,B=oe.length;var rn=this.canModeBeOptimized[$t]&&this.config.safeMode===!1;se&&rn?Xe=en:Xe=Ct}oo.call(this,r);for(var ar,so=this.config.recoveryEnabled;W<F;){l=null;var uo=O.charCodeAt(W),lo=Xe(uo),au=lo.length;for(i=0;i<au;i++){ar=lo[i];var ct=ar.pattern;c=null;var ui=ar.short;if(ui!==!1?uo===ui&&(l=ct):ar.isCustom===!0?(S=ct.exec(O,W,V,q),S!==null?(l=S[0],S.payload!==void 0&&(c=S.payload)):l=null):(this.updateLastIndex(ct,W),l=this.match(ct,e,W)),l!==null){if(u=ar.longerAlt,u!==void 0){var ou=u.length;for(o=0;o<ou;o++){var En=oe[u[o]],Sa=En.pattern;if(f=null,En.isCustom===!0?(S=Sa.exec(O,W,V,q),S!==null?(s=S[0],S.payload!==void 0&&(f=S.payload)):s=null):(this.updateLastIndex(Sa,W),s=this.match(Sa,e,W)),s&&s.length>l.length){l=s,c=f,ar=En;break}}}break}}if(l!==null){if(m=l.length,v=ar.group,v!==void 0&&(y=ar.tokenTypeIdx,R=this.createTokenInstance(l,W,y,ar.tokenType,Ye,We,m),this.handlePayload(R,c),v===!1?re=this.addToken(V,re,R):q[v].push(R)),e=this.chopInput(e,m),W=W+m,We=this.computeNewColumn(We,m),L===!0&&ar.canLineTerminator===!0){var kn=0,ba=void 0,Dr=void 0;j.lastIndex=0;do ba=j.test(l),ba===!0&&(Dr=j.lastIndex-1,kn++);while(ba===!0);kn!==0&&(Ye=Ye+kn,We=m-Dr,this.updateTokenEndLineColumnLocation(R,v,Dr,kn,Ye,We,m))}this.handleModes(ar,Sr,oo,R)}else{for(var tn=W,co=Ye,fo=We,br=so===!1;br===!1&&W<F;)for(e=this.chopInput(e,1),W++,a=0;a<B;a++){var Nn=oe[a],ct=Nn.pattern,ui=Nn.short;if(ui!==!1?O.charCodeAt(W)===ui&&(br=!0):Nn.isCustom===!0?br=ct.exec(O,W,V,q)!==null:(this.updateLastIndex(ct,W),br=ct.exec(e)!==null),br===!0)break}if(P=W-tn,b=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O,tn,P,co,fo),Ae.push({offset:tn,line:co,column:fo,length:P,message:b}),so===!1)break}}return this.hasCustom||(V.length=re),{tokens:V,groups:q,errors:Ae}},t.prototype.handleModes=function(e,r,n,i){if(e.pop===!0){var a=e.push;r(i),a!==void 0&&n.call(this,a)}else e.push!==void 0&&n.call(this,e.push)},t.prototype.chopInput=function(e,r){return e.substring(r)},t.prototype.updateLastIndex=function(e,r){e.lastIndex=r},t.prototype.updateTokenEndLineColumnLocation=function(e,r,n,i,a,o,s){var u,l;r!==void 0&&(u=n===s-1,l=u?-1:0,i===1&&u===!0||(e.endLine=a+l,e.endColumn=o-1+-l))},t.prototype.computeNewColumn=function(e,r){return e+r},t.prototype.createOffsetOnlyToken=function(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}},t.prototype.createStartOnlyToken=function(e,r,n,i,a,o){return{image:e,startOffset:r,startLine:a,startColumn:o,tokenTypeIdx:n,tokenType:i}},t.prototype.createFullToken=function(e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:r+s-1,startLine:a,endLine:a,startColumn:o,endColumn:o+s-1,tokenTypeIdx:n,tokenType:i}},t.prototype.addTokenUsingPush=function(e,r,n){return e.push(n),r},t.prototype.addTokenUsingMemberAccess=function(e,r,n){return e[r]=n,r++,r},t.prototype.handlePayloadNoCustom=function(e,r){},t.prototype.handlePayloadWithCustom=function(e,r){r!==null&&(e.payload=r)},t.prototype.matchWithTest=function(e,r,n){var i=e.test(r);return i===!0?r.substring(n,e.lastIndex):null},t.prototype.matchWithExec=function(e,r){var n=e.exec(r);return n!==null?n[0]:null},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();$i.Lexer=zee});var Wa=d(wt=>{"use strict";var Hv=wt&&wt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(wt,"__esModule",{value:!0});wt.tokenMatcher=wt.createTokenInstance=wt.EOF=wt.createToken=wt.hasTokenLabel=wt.tokenName=wt.tokenLabel=void 0;var Yee=Hv(nl()),Oi=Hv(Nr()),Xee=Hv(Ga()),Jee=cl(),Kv=Ka();function Qee(t){return d1(t)?t.LABEL:t.name}wt.tokenLabel=Qee;function Zee(t){return t.name}wt.tokenName=Zee;function d1(t){return(0,Yee.default)(t.LABEL)&&t.LABEL!==""}wt.hasTokenLabel=d1;var ete="parent",i1="categories",a1="label",o1="group",s1="push_mode",u1="pop_mode",l1="longer_alt",c1="line_breaks",f1="start_chars_hint";function p1(t){return tte(t)}wt.createToken=p1;function tte(t){var e=t.pattern,r={};if(r.name=t.name,(0,Xee.default)(e)||(r.PATTERN=e),(0,Oi.default)(t,ete))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return(0,Oi.default)(t,i1)&&(r.CATEGORIES=t[i1]),(0,Kv.augmentTokenTypes)([r]),(0,Oi.default)(t,a1)&&(r.LABEL=t[a1]),(0,Oi.default)(t,o1)&&(r.GROUP=t[o1]),(0,Oi.default)(t,u1)&&(r.POP_MODE=t[u1]),(0,Oi.default)(t,s1)&&(r.PUSH_MODE=t[s1]),(0,Oi.default)(t,l1)&&(r.LONGER_ALT=t[l1]),(0,Oi.default)(t,c1)&&(r.LINE_BREAKS=t[c1]),(0,Oi.default)(t,f1)&&(r.START_CHARS_HINT=t[f1]),r}wt.EOF=p1({name:"EOF",pattern:Jee.Lexer.NA});(0,Kv.augmentTokenTypes)([wt.EOF]);function rte(t,e,r,n,i,a,o,s){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:a,startColumn:o,endColumn:s,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}wt.createTokenInstance=rte;function nte(t,e){return(0,Kv.tokenStructuredMatcher)(t,e)}wt.tokenMatcher=nte});var bs=d(An=>{"use strict";var Vv=An&&An.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(An,"__esModule",{value:!0});An.defaultGrammarValidatorErrorProvider=An.defaultGrammarResolverErrorProvider=An.defaultParserErrorProvider=void 0;var Ss=Wa(),Bv=Vv(Ts()),ca=Vv(qt()),ite=Vv(Pi()),Wv=dt(),h1=dt();An.defaultParserErrorProvider={buildMismatchTokenMessage:function(t){var e=t.expected,r=t.actual,n=t.previous,i=t.ruleName,a=(0,Ss.hasTokenLabel)(e),o=a?"--> ".concat((0,Ss.tokenLabel)(e)," <--"):"token of type --> ".concat(e.name," <--"),s="Expecting ".concat(o," but found --> '").concat(r.image,"' <--");return s},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant,r=t.ruleName;return"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,r=t.actual,n=t.previous,i=t.customUserDescription,a=t.ruleName,o="Expecting: ",s=(0,Bv.default)(r).image,u=`
but found: '`+s+"'";if(i)return o+i+u;var l=(0,ite.default)(e,function(v,y){return v.concat(y)},[]),c=(0,ca.default)(l,function(v){return"[".concat((0,ca.default)(v,function(y){return(0,Ss.tokenLabel)(y)}).join(", "),"]")}),f=(0,ca.default)(c,function(v,y){return"  ".concat(y+1,". ").concat(v)}),m=`one of these possible Token sequences:
`.concat(f.join(`
`));return o+m+u},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,r=t.actual,n=t.customUserDescription,i=t.ruleName,a="Expecting: ",o=(0,Bv.default)(r).image,s=`
but found: '`+o+"'";if(n)return a+n+s;var u=(0,ca.default)(e,function(c){return"[".concat((0,ca.default)(c,function(f){return(0,Ss.tokenLabel)(f)}).join(","),"]")}),l=`expecting at least one iteration which starts with one of these possible Token sequences::
  `+"<".concat(u.join(" ,"),">");return a+l+s}};Object.freeze(An.defaultParserErrorProvider);An.defaultGrammarResolverErrorProvider={buildRuleNotFoundError:function(t,e){var r="Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-";return r}};An.defaultGrammarValidatorErrorProvider={buildDuplicateFoundError:function(t,e){function r(c){return c instanceof Wv.Terminal?c.terminalType.name:c instanceof Wv.NonTerminal?c.nonTerminalName:""}var n=t.name,i=(0,Bv.default)(e),a=i.idx,o=(0,h1.getProductionDslName)(i),s=r(i),u=a>0,l="->".concat(o).concat(u?a:"","<- ").concat(s?"with argument: ->".concat(s,"<-"):"",`
                  appears more than once (`).concat(e.length," times) in the top level rule: ->").concat(n,`<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `);return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError:function(t){var e=`Namespace conflict found in grammar.
`+"The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name,`>.
`)+`To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;return e},buildAlternationPrefixAmbiguityError:function(t){var e=(0,ca.default)(t.prefixPath,function(i){return(0,Ss.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"),`> due to common lookahead prefix
`)+"in <OR".concat(r,"> inside <").concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`)+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;return n},buildAlternationAmbiguityError:function(t){var e=(0,ca.default)(t.prefixPath,function(i){return(0,Ss.tokenLabel)(i)}).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n="Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"),"> in <OR").concat(r,">")+" inside <".concat(t.topLevelRule.name,`> Rule,
`)+"<".concat(e,`> may appears as a prefix path in all these alternatives.
`);return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError:function(t){var e=(0,h1.getProductionDslName)(t.repetition);t.repetition.idx!==0&&(e+=t.repetition.idx);var r="The repetition <".concat(e,"> within Rule <").concat(t.topLevelRule.name,`> can never consume any tokens.
`)+"This could lead to an infinite loop.";return r},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){var e="Ambiguous empty alternative: <".concat(t.emptyChoiceIdx+1,">")+" in <OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
`)+"Only the last alternative may be an empty alternative.";return e},buildTooManyAlternativesError:function(t){var e=`An Alternation cannot have more than 256 alternatives:
`+"<OR".concat(t.alternation.idx,"> inside <").concat(t.topLevelRule.name,`> Rule.
 has `).concat(t.alternation.definition.length+1," alternatives.");return e},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,r=(0,ca.default)(t.leftRecursionPath,function(a){return a.name}),n="".concat(e," --> ").concat(r.concat([e]).join(" --> ")),i=`Left Recursion found in grammar.
`+"rule: <".concat(e,`> can be invoked from itself (directly or indirectly)
`)+`without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n,`
`)+` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;return i},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){var e;t.topLevelRule instanceof Wv.Rule?e=t.topLevelRule.name:e=t.topLevelRule;var r="Duplicate definition, rule: ->".concat(e,"<- is already defined in the grammar: ->").concat(t.grammarName,"<-");return r}}});var g1=d(Jn=>{"use strict";var ate=Jn&&Jn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),m1=Jn&&Jn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Jn,"__esModule",{value:!0});Jn.GastRefResolverVisitor=Jn.resolveGrammar=void 0;var ote=Rr(),ste=m1(Mt()),ute=m1(Hn()),lte=dt();function cte(t,e){var r=new y1(t,e);return r.resolveRefs(),r.errors}Jn.resolveGrammar=cte;var y1=function(t){ate(e,t);function e(r,n){var i=t.call(this)||this;return i.nameToTopRule=r,i.errMsgProvider=n,i.errors=[],i}return e.prototype.resolveRefs=function(){var r=this;(0,ste.default)((0,ute.default)(this.nameToTopRule),function(n){r.currTopLevel=n,n.accept(r)})},e.prototype.visitNonTerminal=function(r){var n=this.nameToTopRule[r.nonTerminalName];if(n)r.referencedRule=n;else{var i=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,r);this.errors.push({message:i,type:ote.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:r.nonTerminalName})}},e}(lte.GAstVisitor);Jn.GastRefResolverVisitor=y1});var T1=d((Vge,v1)=>{function fte(t,e,r,n){for(var i=-1,a=t==null?0:t.length;++i<a;){var o=t[i];e(n,o,r(o),t)}return n}v1.exports=fte});var R1=d((zge,_1)=>{var dte=ua();function pte(t,e,r,n){return dte(t,function(i,a,o){e(n,i,r(i),o)}),n}_1.exports=pte});var S1=d((Yge,A1)=>{var hte=T1(),mte=R1(),yte=Vr(),gte=Oe();function vte(t,e){return function(r,n){var i=gte(r)?hte:mte,a=e?e():{};return i(r,t,yte(n,2),a)}}A1.exports=vte});var zv=d((Xge,b1)=>{var Tte=Jf(),_te=S1(),Rte=Object.prototype,Ate=Rte.hasOwnProperty,Ste=_te(function(t,e,r){Ate.call(t,r)?t[r].push(e):Tte(t,r,[e])});b1.exports=Ste});var $d=d((Jge,C1)=>{var bte=fd(),Cte=qt();function Pte(t,e){return bte(Cte(t,e),1)}C1.exports=Pte});var Od=d((Qge,P1)=>{var Ete=td(),kte=ys();function Nte(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:kte(e),e=n-e,Ete(t,0,e<0?0:e)):[]}P1.exports=Nte});var hl=d(it=>{"use strict";var Va=it&&it.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),za=it&&it.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(it,"__esModule",{value:!0});it.nextPossibleTokensAfter=it.possiblePathsFrom=it.NextTerminalAfterAtLeastOneSepWalker=it.NextTerminalAfterAtLeastOneWalker=it.NextTerminalAfterManySepWalker=it.NextTerminalAfterManyWalker=it.AbstractNextTerminalAfterProductionWalker=it.NextAfterTokenWalker=it.AbstractNextPossibleTokensWalker=void 0;var k1=cd(),Dd=za(Ts()),Id=za(Er()),E1=za(Od()),fr=za(rd()),wte=za(kd()),$te=za(Mt()),Ba=za(Si()),Ote=Sv(),de=dt(),N1=function(t){Va(e,t);function e(r,n){var i=t.call(this)||this;return i.topProd=r,i.path=n,i.possibleTokTypes=[],i.nextProductionName="",i.nextProductionOccurrence=0,i.found=!1,i.isAtEndOfPath=!1,i}return e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,Ba.default)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,Ba.default)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(r,n){n===void 0&&(n=[]),this.found||t.prototype.walk.call(this,r,n)},e.prototype.walkProdRef=function(r,n,i){if(r.referencedRule.name===this.nextProductionName&&r.idx===this.nextProductionOccurrence){var a=n.concat(i);this.updateExpectedNext(),this.walk(r.referencedRule,a)}},e.prototype.updateExpectedNext=function(){(0,Id.default)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(k1.RestWalker);it.AbstractNextPossibleTokensWalker=N1;var Ite=function(t){Va(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.path=n,i.nextTerminalName="",i.nextTerminalOccurrence=0,i.nextTerminalName=i.path.lastTok.name,i.nextTerminalOccurrence=i.path.lastTokOccurrence,i}return e.prototype.walkTerminal=function(r,n,i){if(this.isAtEndOfPath&&r.terminalType.name===this.nextTerminalName&&r.idx===this.nextTerminalOccurrence&&!this.found){var a=n.concat(i),o=new de.Alternative({definition:a});this.possibleTokTypes=(0,Ote.first)(o),this.found=!0}},e}(N1);it.NextAfterTokenWalker=Ite;var pl=function(t){Va(e,t);function e(r,n){var i=t.call(this)||this;return i.topRule=r,i.occurrence=n,i.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},i}return e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(k1.RestWalker);it.AbstractNextTerminalAfterProductionWalker=pl;var Dte=function(t){Va(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkMany=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Dd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkMany.call(this,r,n,i)},e}(pl);it.NextTerminalAfterManyWalker=Dte;var xte=function(t){Va(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkManySep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Dd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkManySep.call(this,r,n,i)},e}(pl);it.NextTerminalAfterManySepWalker=xte;var Lte=function(t){Va(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOne=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Dd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOne.call(this,r,n,i)},e}(pl);it.NextTerminalAfterAtLeastOneWalker=Lte;var qte=function(t){Va(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.walkAtLeastOneSep=function(r,n,i){if(r.idx===this.occurrence){var a=(0,Dd.default)(n.concat(i));this.result.isEndOfRule=a===void 0,a instanceof de.Terminal&&(this.result.token=a.terminalType,this.result.occurrence=a.idx)}else t.prototype.walkAtLeastOneSep.call(this,r,n,i)},e}(pl);it.NextTerminalAfterAtLeastOneSepWalker=qte;function w1(t,e,r){r===void 0&&(r=[]),r=(0,Ba.default)(r);var n=[],i=0;function a(l){return l.concat((0,fr.default)(t,i+1))}function o(l){var c=w1(a(l),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){var s=t[i];if(s instanceof de.Alternative)return o(s.definition);if(s instanceof de.NonTerminal)return o(s.definition);if(s instanceof de.Option)n=o(s.definition);else if(s instanceof de.RepetitionMandatory){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);return o(u)}else if(s instanceof de.RepetitionMandatoryWithSeparator){var u=[new de.Alternative({definition:s.definition}),new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})];return o(u)}else if(s instanceof de.RepetitionWithSeparator){var u=s.definition.concat([new de.Repetition({definition:[new de.Terminal({terminalType:s.separator})].concat(s.definition)})]);n=o(u)}else if(s instanceof de.Repetition){var u=s.definition.concat([new de.Repetition({definition:s.definition})]);n=o(u)}else{if(s instanceof de.Alternation)return(0,$te.default)(s.definition,function(l){(0,Id.default)(l.definition)===!1&&(n=o(l.definition))}),n;if(s instanceof de.Terminal)r.push(s.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:(0,fr.default)(t,i)}),n}it.possiblePathsFrom=w1;function Mte(t,e,r,n){var i="EXIT_NONE_TERMINAL",a=[i],o="EXIT_ALTERNATIVE",s=!1,u=e.length,l=u-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,Id.default)(f);){var m=f.pop();if(m===o){s&&(0,wte.default)(f).idx<=l&&f.pop();continue}var v=m.def,y=m.idx,R=m.ruleStack,P=m.occurrenceStack;if(!(0,Id.default)(v)){var E=v[0];if(E===i){var b={idx:y,def:(0,fr.default)(v),ruleStack:(0,E1.default)(R),occurrenceStack:(0,E1.default)(P)};f.push(b)}else if(E instanceof de.Terminal)if(y<u-1){var S=y+1,O=e[S];if(r(O,E.terminalType)){var b={idx:S,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(b)}}else if(y===u-1)c.push({nextTokenType:E.terminalType,nextTokenOccurrence:E.idx,ruleStack:R,occurrenceStack:P}),s=!0;else throw Error("non exhaustive match");else if(E instanceof de.NonTerminal){var F=(0,Ba.default)(R);F.push(E.nonTerminalName);var W=(0,Ba.default)(P);W.push(E.idx);var b={idx:y,def:E.definition.concat(a,(0,fr.default)(v)),ruleStack:F,occurrenceStack:W};f.push(b)}else if(E instanceof de.Option){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ne={idx:y,def:E.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.RepetitionMandatory){var V=new de.Repetition({definition:E.definition,idx:E.idx}),Ae=E.definition.concat([V],(0,fr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(E instanceof de.RepetitionMandatoryWithSeparator){var Ye=new de.Terminal({terminalType:E.separator}),V=new de.Repetition({definition:[Ye].concat(E.definition),idx:E.idx}),Ae=E.definition.concat([V],(0,fr.default)(v)),b={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(b)}else if(E instanceof de.RepetitionWithSeparator){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var Ye=new de.Terminal({terminalType:E.separator}),We=new de.Repetition({definition:[Ye].concat(E.definition),idx:E.idx}),Ae=E.definition.concat([We],(0,fr.default)(v)),Ne={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.Repetition){var re={idx:y,def:(0,fr.default)(v),ruleStack:R,occurrenceStack:P};f.push(re),f.push(o);var We=new de.Repetition({definition:E.definition,idx:E.idx}),Ae=E.definition.concat([We],(0,fr.default)(v)),Ne={idx:y,def:Ae,ruleStack:R,occurrenceStack:P};f.push(Ne)}else if(E instanceof de.Alternation)for(var q=E.definition.length-1;q>=0;q--){var L=E.definition[q],j={idx:y,def:L.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P};f.push(j),f.push(o)}else if(E instanceof de.Alternative)f.push({idx:y,def:E.definition.concat((0,fr.default)(v)),ruleStack:R,occurrenceStack:P});else if(E instanceof de.Rule)f.push(Fte(E,y,R,P));else throw Error("non exhaustive match")}}return c}it.nextPossibleTokensAfter=Mte;function Fte(t,e,r,n){var i=(0,Ba.default)(r);i.push(t.name);var a=(0,Ba.default)(n);return a.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:a}}});var Cs=d(Re=>{"use strict";var D1=Re&&Re.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Ja=Re&&Re.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Re,"__esModule",{value:!0});Re.areTokenCategoriesNotUsed=Re.isStrictPrefixOfPath=Re.containsPath=Re.getLookaheadPathsForOptionalProd=Re.getLookaheadPathsForOr=Re.lookAheadSequenceFromAlternatives=Re.buildSingleAlternativeLookaheadFunction=Re.buildAlternativesLookAheadFunc=Re.buildLookaheadFuncForOptionalProd=Re.buildLookaheadFuncForOr=Re.getLookaheadPaths=Re.getProdType=Re.PROD_TYPE=void 0;var Xv=Ja(Er()),x1=Ja(Rn()),Xa=Ja(sl()),xd=Ja(qt()),Ya=Ja(Mt()),$1=Ja(Nr()),L1=Ja(Pi()),O1=hl(),jte=cd(),Ld=Ka(),fa=dt(),Gte=dt(),At;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(At=Re.PROD_TYPE||(Re.PROD_TYPE={}));function q1(t){if(t instanceof fa.Option||t==="Option")return At.OPTION;if(t instanceof fa.Repetition||t==="Repetition")return At.REPETITION;if(t instanceof fa.RepetitionMandatory||t==="RepetitionMandatory")return At.REPETITION_MANDATORY;if(t instanceof fa.RepetitionMandatoryWithSeparator||t==="RepetitionMandatoryWithSeparator")return At.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof fa.RepetitionWithSeparator||t==="RepetitionWithSeparator")return At.REPETITION_WITH_SEPARATOR;if(t instanceof fa.Alternation||t==="Alternation")return At.ALTERNATION;throw Error("non exhaustive match")}Re.getProdType=q1;function Ute(t){var e=t.occurrence,r=t.rule,n=t.prodType,i=t.maxLookahead,a=q1(n);return a===At.ALTERNATION?Qv(e,r,i):Zv(e,r,a,i)}Re.getLookaheadPaths=Ute;function Hte(t,e,r,n,i,a){var o=Qv(t,e,r),s=eT(o)?Ld.tokenStructuredMatcherNoCategories:Ld.tokenStructuredMatcher;return a(o,n,s,i)}Re.buildLookaheadFuncForOr=Hte;function Kte(t,e,r,n,i,a){var o=Zv(t,e,i,r),s=eT(o)?Ld.tokenStructuredMatcherNoCategories:Ld.tokenStructuredMatcher;return a(o[0],s,n)}Re.buildLookaheadFuncForOptionalProd=Kte;function Wte(t,e,r,n){var i=t.length,a=(0,Xa.default)(t,function(u){return(0,Xa.default)(u,function(l){return l.length===1})});if(e)return function(u){for(var l=(0,xd.default)(u,function(S){return S.GATE}),c=0;c<i;c++){var f=t[c],m=f.length,v=l[c];if(v!==void 0&&v.call(this)===!1)continue;e:for(var y=0;y<m;y++){for(var R=f[y],P=R.length,E=0;E<P;E++){var b=this.LA(E+1);if(r(b,R[E])===!1)continue e}return c}}};if(a&&!n){var o=(0,xd.default)(t,function(u){return(0,x1.default)(u)}),s=(0,L1.default)(o,function(u,l,c){return(0,Ya.default)(l,function(f){(0,$1.default)(u,f.tokenTypeIdx)||(u[f.tokenTypeIdx]=c),(0,Ya.default)(f.categoryMatches,function(m){(0,$1.default)(u,m)||(u[m]=c)})}),u},{});return function(){var u=this.LA(1);return s[u.tokenTypeIdx]}}else return function(){for(var u=0;u<i;u++){var l=t[u],c=l.length;e:for(var f=0;f<c;f++){for(var m=l[f],v=m.length,y=0;y<v;y++){var R=this.LA(y+1);if(r(R,m[y])===!1)continue e}return u}}}}Re.buildAlternativesLookAheadFunc=Wte;function Bte(t,e,r){var n=(0,Xa.default)(t,function(l){return l.length===1}),i=t.length;if(n&&!r){var a=(0,x1.default)(t);if(a.length===1&&(0,Xv.default)(a[0].categoryMatches)){var o=a[0],s=o.tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===s}}else{var u=(0,L1.default)(a,function(l,c,f){return l[c.tokenTypeIdx]=!0,(0,Ya.default)(c.categoryMatches,function(m){l[m]=!0}),l},[]);return function(){var l=this.LA(1);return u[l.tokenTypeIdx]===!0}}}else return function(){e:for(var l=0;l<i;l++){for(var c=t[l],f=c.length,m=0;m<f;m++){var v=this.LA(m+1);if(e(v,c[m])===!1)continue e}return!0}return!1}}Re.buildSingleAlternativeLookaheadFunction=Bte;var Vte=function(t){D1(e,t);function e(r,n,i){var a=t.call(this)||this;return a.topProd=r,a.targetOccurrence=n,a.targetProdType=i,a}return e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(r,n,i,a){return r.idx===this.targetOccurrence&&this.targetProdType===n?(this.restDef=i.concat(a),!0):!1},e.prototype.walkOption=function(r,n,i){this.checkIsTarget(r,At.OPTION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOne=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkAtLeastOneSep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkMany=function(r,n,i){this.checkIsTarget(r,At.REPETITION,n,i)||t.prototype.walkOption.call(this,r,n,i)},e.prototype.walkManySep=function(r,n,i){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR,n,i)||t.prototype.walkOption.call(this,r,n,i)},e}(jte.RestWalker),M1=function(t){D1(e,t);function e(r,n,i){var a=t.call(this)||this;return a.targetOccurrence=r,a.targetProdType=n,a.targetRef=i,a.result=[],a}return e.prototype.checkIsTarget=function(r,n){r.idx===this.targetOccurrence&&this.targetProdType===n&&(this.targetRef===void 0||r===this.targetRef)&&(this.result=r.definition)},e.prototype.visitOption=function(r){this.checkIsTarget(r,At.OPTION)},e.prototype.visitRepetition=function(r){this.checkIsTarget(r,At.REPETITION)},e.prototype.visitRepetitionMandatory=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(r){this.checkIsTarget(r,At.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(r){this.checkIsTarget(r,At.ALTERNATION)},e}(Gte.GAstVisitor);function I1(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=[];return e}function Yv(t){for(var e=[""],r=0;r<t.length;r++){for(var n=t[r],i=[],a=0;a<e.length;a++){var o=e[a];i.push(o+"_"+n.tokenTypeIdx);for(var s=0;s<n.categoryMatches.length;s++){var u="_"+n.categoryMatches[s];i.push(o+u)}}e=i}return e}function zte(t,e,r){for(var n=0;n<t.length;n++)if(n!==r)for(var i=t[n],a=0;a<e.length;a++){var o=e[a];if(i[o]===!0)return!1}return!0}function Jv(t,e){for(var r=(0,xd.default)(t,function(c){return(0,O1.possiblePathsFrom)([c],1)}),n=I1(r.length),i=(0,xd.default)(r,function(c){var f={};return(0,Ya.default)(c,function(m){var v=Yv(m.partialPath);(0,Ya.default)(v,function(y){f[y]=!0})}),f}),a=r,o=1;o<=e;o++){var s=a;a=I1(s.length);for(var u=function(c){for(var f=s[c],m=0;m<f.length;m++){var v=f[m].partialPath,y=f[m].suffixDef,R=Yv(v),P=zte(i,R,c);if(P||(0,Xv.default)(y)||v.length===e){var E=n[c];if(F1(E,v)===!1){E.push(v);for(var b=0;b<R.length;b++){var S=R[b];i[c][S]=!0}}}else{var O=(0,O1.possiblePathsFrom)(y,o+1,v);a[c]=a[c].concat(O),(0,Ya.default)(O,function(F){var W=Yv(F.partialPath);(0,Ya.default)(W,function(re){i[c][re]=!0})})}}},l=0;l<s.length;l++)u(l)}return n}Re.lookAheadSequenceFromAlternatives=Jv;function Qv(t,e,r,n){var i=new M1(t,At.ALTERNATION,n);return e.accept(i),Jv(i.result,r)}Re.getLookaheadPathsForOr=Qv;function Zv(t,e,r,n){var i=new M1(t,r);e.accept(i);var a=i.result,o=new Vte(e,t,r),s=o.startWalking(),u=new fa.Alternative({definition:a}),l=new fa.Alternative({definition:s});return Jv([u,l],n)}Re.getLookaheadPathsForOptionalProd=Zv;function F1(t,e){e:for(var r=0;r<t.length;r++){var n=t[r];if(n.length===e.length){for(var i=0;i<n.length;i++){var a=e[i],o=n[i],s=a===o||o.categoryMatchesMap[a.tokenTypeIdx]!==void 0;if(s===!1)continue e}return!0}}return!1}Re.containsPath=F1;function Yte(t,e){return t.length<e.length&&(0,Xa.default)(t,function(r,n){var i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}Re.isStrictPrefixOfPath=Yte;function eT(t){return(0,Xa.default)(t,function(e){return(0,Xa.default)(e,function(r){return(0,Xa.default)(r,function(n){return(0,Xv.default)(n.categoryMatches)})})})}Re.areTokenCategoriesNotUsed=eT});var gl=d(me=>{"use strict";var rT=me&&me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),tT=me&&me.__assign||function(){return tT=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},tT.apply(this,arguments)},Ft=me&&me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(me,"__esModule",{value:!0});me.checkPrefixAlternativesAmbiguities=me.validateSomeNonEmptyLookaheadPath=me.validateTooManyAlts=me.RepetitionCollector=me.validateAmbiguousAlternationAlternatives=me.validateEmptyOrAlternative=me.getFirstNoneTerminal=me.validateNoLeftRecursion=me.validateRuleIsOverridden=me.validateRuleDoesNotAlreadyExist=me.OccurrenceValidationCollector=me.identifyProductionForDuplicates=me.validateGrammar=me.validateLookahead=void 0;var j1=Ft(Ts()),qd=Ft(Er()),Xte=Ft(rd()),G1=Ft(Rn()),Jte=Ft(ll()),Qte=Ft(yd()),Zte=Ft(gd()),da=Ft(qt()),yl=Ft(Mt()),ere=Ft(zv()),nT=Ft(Pi()),tre=Ft(dv()),rre=Ft(Hn()),iT=Ft(Ci()),Ii=Ft($d()),nre=Ft(Si()),bn=Rr(),aT=dt(),Ps=Cs(),ire=hl(),Sn=dt(),oT=dt(),are=Ft(Od()),ore=Ft(ul()),sre=Ka();function ure(t){var e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return(0,da.default)(e,function(r){return tT({type:bn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION},r)})}me.validateLookahead=ure;function lre(t,e,r,n){var i=(0,Ii.default)(t,function(u){return cre(u,r)}),a=yre(t,e,r),o=(0,Ii.default)(t,function(u){return z1(u,r)}),s=(0,Ii.default)(t,function(u){return W1(u,t,n,r)});return i.concat(a,o,s)}me.validateGrammar=lre;function cre(t,e){var r=new K1;t.accept(r);var n=r.allProductions,i=(0,ere.default)(n,U1),a=(0,tre.default)(i,function(s){return s.length>1}),o=(0,da.default)((0,rre.default)(a),function(s){var u=(0,j1.default)(s),l=e.buildDuplicateFoundError(t,s),c=(0,aT.getProductionDslName)(u),f={message:l,type:bn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:u.idx},m=H1(u);return m&&(f.parameter=m),f});return o}function U1(t){return"".concat((0,aT.getProductionDslName)(t),"_#_").concat(t.idx,"_#_").concat(H1(t))}me.identifyProductionForDuplicates=U1;function H1(t){return t instanceof Sn.Terminal?t.terminalType.name:t instanceof Sn.NonTerminal?t.nonTerminalName:""}var K1=function(t){rT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitNonTerminal=function(r){this.allProductions.push(r)},e.prototype.visitOption=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e.prototype.visitAlternation=function(r){this.allProductions.push(r)},e.prototype.visitTerminal=function(r){this.allProductions.push(r)},e}(oT.GAstVisitor);me.OccurrenceValidationCollector=K1;function W1(t,e,r,n){var i=[],a=(0,nT.default)(e,function(s,u){return u.name===t.name?s+1:s},0);if(a>1){var o=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:o,type:bn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}me.validateRuleDoesNotAlreadyExist=W1;function fre(t,e,r){var n=[],i;return(0,iT.default)(e,t)||(i="Invalid rule override, rule: ->".concat(t,"<- cannot be overridden in the grammar: ->").concat(r,"<-")+"as it is not defined in any of the super grammars ",n.push({message:i,type:bn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,ruleName:t})),n}me.validateRuleIsOverridden=fre;function B1(t,e,r,n){n===void 0&&(n=[]);var i=[],a=ml(e.definition);if((0,qd.default)(a))return[];var o=t.name,s=(0,iT.default)(a,t);s&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:bn.ParserDefinitionErrorType.LEFT_RECURSION,ruleName:o});var u=(0,Zte.default)(a,n.concat([t])),l=(0,Ii.default)(u,function(c){var f=(0,nre.default)(n);return f.push(c),B1(t,c,r,f)});return i.concat(l)}me.validateNoLeftRecursion=B1;function ml(t){var e=[];if((0,qd.default)(t))return e;var r=(0,j1.default)(t);if(r instanceof Sn.NonTerminal)e.push(r.referencedRule);else if(r instanceof Sn.Alternative||r instanceof Sn.Option||r instanceof Sn.RepetitionMandatory||r instanceof Sn.RepetitionMandatoryWithSeparator||r instanceof Sn.RepetitionWithSeparator||r instanceof Sn.Repetition)e=e.concat(ml(r.definition));else if(r instanceof Sn.Alternation)e=(0,G1.default)((0,da.default)(r.definition,function(o){return ml(o.definition)}));else if(!(r instanceof Sn.Terminal))throw Error("non exhaustive match");var n=(0,aT.isOptionalProd)(r),i=t.length>1;if(n&&i){var a=(0,Xte.default)(t);return e.concat(ml(a))}else return e}me.getFirstNoneTerminal=ml;var sT=function(t){rT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.alternations=[],r}return e.prototype.visitAlternation=function(r){this.alternations.push(r)},e}(oT.GAstVisitor);function dre(t,e){var r=new sT;t.accept(r);var n=r.alternations,i=(0,Ii.default)(n,function(a){var o=(0,are.default)(a.definition);return(0,Ii.default)(o,function(s,u){var l=(0,ire.nextPossibleTokensAfter)([s],[],sre.tokenStructuredMatcher,1);return(0,qd.default)(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:a,emptyChoiceIdx:u}),type:bn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:a.idx,alternative:u+1}]:[]})});return i}me.validateEmptyOrAlternative=dre;function pre(t,e,r){var n=new sT;t.accept(n);var i=n.alternations;i=(0,Qte.default)(i,function(o){return o.ignoreAmbiguities===!0});var a=(0,Ii.default)(i,function(o){var s=o.idx,u=o.maxLookahead||e,l=(0,Ps.getLookaheadPathsForOr)(s,t,u,o),c=mre(l,o,t,r),f=Y1(l,o,t,r);return c.concat(f)});return a}me.validateAmbiguousAlternationAlternatives=pre;var V1=function(t){rT(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.allProductions=[],r}return e.prototype.visitRepetitionWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.allProductions.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.allProductions.push(r)},e.prototype.visitRepetition=function(r){this.allProductions.push(r)},e}(oT.GAstVisitor);me.RepetitionCollector=V1;function z1(t,e){var r=new sT;t.accept(r);var n=r.alternations,i=(0,Ii.default)(n,function(a){return a.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:a}),type:bn.ParserDefinitionErrorType.TOO_MANY_ALTS,ruleName:t.name,occurrence:a.idx}]:[]});return i}me.validateTooManyAlts=z1;function hre(t,e,r){var n=[];return(0,yl.default)(t,function(i){var a=new V1;i.accept(a);var o=a.allProductions;(0,yl.default)(o,function(s){var u=(0,Ps.getProdType)(s),l=s.maxLookahead||e,c=s.idx,f=(0,Ps.getLookaheadPathsForOptionalProd)(c,i,u,l),m=f[0];if((0,qd.default)((0,G1.default)(m))){var v=r.buildEmptyRepetitionError({topLevelRule:i,repetition:s});n.push({message:v,type:bn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}me.validateSomeNonEmptyLookaheadPath=hre;function mre(t,e,r,n){var i=[],a=(0,nT.default)(t,function(s,u,l){return e.definition[l].ignoreAmbiguities===!0||(0,yl.default)(u,function(c){var f=[l];(0,yl.default)(t,function(m,v){l!==v&&(0,Ps.containsPath)(m,c)&&e.definition[v].ignoreAmbiguities!==!0&&f.push(v)}),f.length>1&&!(0,Ps.containsPath)(i,c)&&(i.push(c),s.push({alts:f,path:c}))}),s},[]),o=(0,da.default)(a,function(s){var u=(0,da.default)(s.alts,function(c){return c+1}),l=n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:u,prefixPath:s.path});return{message:l,type:bn.ParserDefinitionErrorType.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:s.alts}});return o}function Y1(t,e,r,n){var i=(0,nT.default)(t,function(o,s,u){var l=(0,da.default)(s,function(c){return{idx:u,path:c}});return o.concat(l)},[]),a=(0,ore.default)((0,Ii.default)(i,function(o){var s=e.definition[o.idx];if(s.ignoreAmbiguities===!0)return[];var u=o.idx,l=o.path,c=(0,Jte.default)(i,function(m){return e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<u&&(0,Ps.isStrictPrefixOfPath)(m.path,l)}),f=(0,da.default)(c,function(m){var v=[m.idx+1,u+1],y=e.idx===0?"":e.idx,R=n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:v,prefixPath:m.path});return{message:R,type:bn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:y,alternatives:v}});return f}));return a}me.checkPrefixAlternativesAmbiguities=Y1;function yre(t,e,r){var n=[],i=(0,da.default)(e,function(a){return a.name});return(0,yl.default)(t,function(a){var o=a.name;if((0,iT.default)(i,o)){var s=r.buildNamespaceConflictError(a);n.push({message:s,type:bn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:o})}}),n}});var Z1=d(pa=>{"use strict";var X1=pa&&pa.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(pa,"__esModule",{value:!0});pa.validateGrammar=pa.resolveGrammar=void 0;var gre=X1(Mt()),J1=X1(Pv()),vre=g1(),Tre=gl(),Q1=bs();function _re(t){var e=(0,J1.default)(t,{errMsgProvider:Q1.defaultGrammarResolverErrorProvider}),r={};return(0,gre.default)(t.rules,function(n){r[n.name]=n}),(0,vre.resolveGrammar)(r,e.errMsgProvider)}pa.resolveGrammar=_re;function Rre(t){return t=(0,J1.default)(t,{errMsgProvider:Q1.defaultGrammarValidatorErrorProvider}),(0,Tre.validateGrammar)(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}pa.validateGrammar=Rre});var Es=d(ir=>{"use strict";var vl=ir&&ir.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Are=ir&&ir.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ir,"__esModule",{value:!0});ir.EarlyExitException=ir.NotAllInputParsedException=ir.NoViableAltException=ir.MismatchedTokenException=ir.isRecognitionException=void 0;var Sre=Are(Ci()),eI="MismatchedTokenException",tI="NoViableAltException",rI="EarlyExitException",nI="NotAllInputParsedException",iI=[eI,tI,rI,nI];Object.freeze(iI);function bre(t){return(0,Sre.default)(iI,t.name)}ir.isRecognitionException=bre;var Md=function(t){vl(e,t);function e(r,n){var i=this.constructor,a=t.call(this,r)||this;return a.token=n,a.resyncedTokens=[],Object.setPrototypeOf(a,i.prototype),Error.captureStackTrace&&Error.captureStackTrace(a,a.constructor),a}return e}(Error),Cre=function(t){vl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=eI,a}return e}(Md);ir.MismatchedTokenException=Cre;var Pre=function(t){vl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=tI,a}return e}(Md);ir.NoViableAltException=Pre;var Ere=function(t){vl(e,t);function e(r,n){var i=t.call(this,r,n)||this;return i.name=nI,i}return e}(Md);ir.NotAllInputParsedException=Ere;var kre=function(t){vl(e,t);function e(r,n,i){var a=t.call(this,r,n)||this;return a.previousToken=i,a.name=rI,a}return e}(Md);ir.EarlyExitException=kre});var lT=d(St=>{"use strict";var Nre=St&&St.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),ha=St&&St.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(St,"__esModule",{value:!0});St.attemptInRepetitionRecovery=St.Recoverable=St.InRuleRecoveryException=St.IN_RULE_RECOVERY_EXCEPTION=St.EOF_FOLLOW_KEY=void 0;var Tl=Wa(),wre=ha(Er()),aI=ha(Od()),$re=ha(Rn()),uT=ha(qt()),oI=ha(vd()),Ore=ha(Nr()),Ire=ha(Ci()),Dre=ha(Si()),xre=Es(),Lre=bv(),qre=Rr();St.EOF_FOLLOW_KEY={};St.IN_RULE_RECOVERY_EXCEPTION="InRuleRecoveryException";var sI=function(t){Nre(e,t);function e(r){var n=t.call(this,r)||this;return n.name=St.IN_RULE_RECOVERY_EXCEPTION,n}return e}(Error);St.InRuleRecoveryException=sI;var Mre=function(){function t(){}return t.prototype.initRecoverable=function(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,Ore.default)(e,"recoveryEnabled")?e.recoveryEnabled:qre.DEFAULT_PARSER_CONFIG.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=uI)},t.prototype.getTokenToInsert=function(e){var r=(0,Tl.createTokenInstance)(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r},t.prototype.canTokenTypeBeInsertedInRecovery=function(e){return!0},t.prototype.canTokenTypeBeDeletedInRecovery=function(e){return!0},t.prototype.tryInRepetitionRecovery=function(e,r,n,i){for(var a=this,o=this.findReSyncTokenType(),s=this.exportLexerState(),u=[],l=!1,c=this.LA(1),f=this.LA(1),m=function(){var v=a.LA(0),y=a.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:c,previous:v,ruleName:a.getCurrRuleFullName()}),R=new xre.MismatchedTokenException(y,c,a.LA(0));R.resyncedTokens=(0,aI.default)(u),a.SAVE_ERROR(R)};!l;)if(this.tokenMatcher(f,i)){m();return}else if(n.call(this)){m(),e.apply(this,r);return}else this.tokenMatcher(f,o)?l=!0:(f=this.SKIP_TOKEN(),this.addToResyncTokens(f,u));this.importLexerState(s)},t.prototype.shouldInRepetitionRecoveryBeTried=function(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))},t.prototype.getFollowsForInRuleRecovery=function(e,r){var n=this.getCurrentGrammarPath(e,r),i=this.getNextPossibleTokenTypes(n);return i},t.prototype.tryInRuleRecovery=function(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r)){var n=this.getTokenToInsert(e);return n}if(this.canRecoverWithSingleTokenDeletion(e)){var i=this.SKIP_TOKEN();return this.consumeToken(),i}throw new sI("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)},t.prototype.canRecoverWithSingleTokenInsertion=function(e,r){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(e)||(0,wre.default)(r))return!1;var i=this.LA(1),a=(0,oI.default)(r,function(o){return n.tokenMatcher(i,o)})!==void 0;return a},t.prototype.canRecoverWithSingleTokenDeletion=function(e){if(!this.canTokenTypeBeDeletedInRecovery(e))return!1;var r=this.tokenMatcher(this.LA(2),e);return r},t.prototype.isInCurrentRuleReSyncSet=function(e){var r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return(0,Ire.default)(n,e)},t.prototype.findReSyncTokenType=function(){for(var e=this.flattenFollowSet(),r=this.LA(1),n=2;;){var i=(0,oI.default)(e,function(a){var o=(0,Tl.tokenMatcher)(r,a);return o});if(i!==void 0)return i;r=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(this.RULE_STACK.length===1)return St.EOF_FOLLOW_KEY;var e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var e=this,r=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,uT.default)(r,function(i,a){return a===0?St.EOF_FOLLOW_KEY:{ruleName:e.shortRuleNameToFullName(i),idxInCallingRule:n[a],inRule:e.shortRuleNameToFullName(r[a-1])}})},t.prototype.flattenFollowSet=function(){var e=this,r=(0,uT.default)(this.buildFullFollowKeyStack(),function(n){return e.getFollowSetFromFollowKey(n)});return(0,$re.default)(r)},t.prototype.getFollowSetFromFollowKey=function(e){if(e===St.EOF_FOLLOW_KEY)return[Tl.EOF];var r=e.ruleName+e.idxInCallingRule+Lre.IN+e.inRule;return this.resyncFollows[r]},t.prototype.addToResyncTokens=function(e,r){return this.tokenMatcher(e,Tl.EOF)||r.push(e),r},t.prototype.reSyncTo=function(e){for(var r=[],n=this.LA(1);this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return(0,aI.default)(r)},t.prototype.attemptInRepetitionRecovery=function(e,r,n,i,a,o,s){},t.prototype.getCurrentGrammarPath=function(e,r){var n=this.getHumanReadableRuleStack(),i=(0,Dre.default)(this.RULE_OCCURRENCE_STACK),a={ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r};return a},t.prototype.getHumanReadableRuleStack=function(){var e=this;return(0,uT.default)(this.RULE_STACK,function(r){return e.shortRuleNameToFullName(r)})},t}();St.Recoverable=Mre;function uI(t,e,r,n,i,a,o){var s=this.getKeyForAutomaticLookahead(n,i),u=this.firstAfterRepMap[s];if(u===void 0){var l=this.getCurrRuleFullName(),c=this.getGAstProductions()[l],f=new a(c,i);u=f.startWalking(),this.firstAfterRepMap[s]=u}var m=u.token,v=u.occurrence,y=u.isEndOfRule;this.RULE_STACK.length===1&&y&&m===void 0&&(m=Tl.EOF,v=1),!(m===void 0||v===void 0)&&this.shouldInRepetitionRecoveryBeTried(m,v,o)&&this.tryInRepetitionRecovery(t,e,r,m)}St.attemptInRepetitionRecovery=uI});var Fd=d(ke=>{"use strict";Object.defineProperty(ke,"__esModule",{value:!0});ke.getKeyForAutomaticLookahead=ke.AT_LEAST_ONE_SEP_IDX=ke.MANY_SEP_IDX=ke.AT_LEAST_ONE_IDX=ke.MANY_IDX=ke.OPTION_IDX=ke.OR_IDX=ke.BITS_FOR_ALT_IDX=ke.BITS_FOR_RULE_IDX=ke.BITS_FOR_OCCURRENCE_IDX=ke.BITS_FOR_METHOD_TYPE=void 0;ke.BITS_FOR_METHOD_TYPE=4;ke.BITS_FOR_OCCURRENCE_IDX=8;ke.BITS_FOR_RULE_IDX=12;ke.BITS_FOR_ALT_IDX=8;ke.OR_IDX=1<<ke.BITS_FOR_OCCURRENCE_IDX;ke.OPTION_IDX=2<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_IDX=3<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_IDX=4<<ke.BITS_FOR_OCCURRENCE_IDX;ke.MANY_SEP_IDX=5<<ke.BITS_FOR_OCCURRENCE_IDX;ke.AT_LEAST_ONE_SEP_IDX=6<<ke.BITS_FOR_OCCURRENCE_IDX;function Fre(t,e,r){return r|e|t}ke.getKeyForAutomaticLookahead=Fre;var ave=32-ke.BITS_FOR_ALT_IDX});var fT=d(ma=>{"use strict";var jd=ma&&ma.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var n=0,i=e.length,a;n<i;n++)(a||!(n in e))&&(a||(a=Array.prototype.slice.call(e,0,n)),a[n]=e[n]);return t.concat(a||Array.prototype.slice.call(e))},lI=ma&&ma.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ma,"__esModule",{value:!0});ma.LLkLookaheadStrategy=void 0;var cT=lI($d()),jre=lI(Er()),Gd=bs(),Gre=Rr(),Ud=gl(),_l=Cs(),Ure=function(){function t(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Gre.DEFAULT_PARSER_CONFIG.maxLookahead}return t.prototype.validate=function(e){var r=this.validateNoLeftRecursion(e.rules);if((0,jre.default)(r)){var n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),a=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead),o=jd(jd(jd(jd([],r,!0),n,!0),i,!0),a,!0);return o}return r},t.prototype.validateNoLeftRecursion=function(e){return(0,cT.default)(e,function(r){return(0,Ud.validateNoLeftRecursion)(r,r,Gd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateEmptyOrAlternatives=function(e){return(0,cT.default)(e,function(r){return(0,Ud.validateEmptyOrAlternative)(r,Gd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateAmbiguousAlternationAlternatives=function(e,r){return(0,cT.default)(e,function(n){return(0,Ud.validateAmbiguousAlternationAlternatives)(n,r,Gd.defaultGrammarValidatorErrorProvider)})},t.prototype.validateSomeNonEmptyLookaheadPath=function(e,r){return(0,Ud.validateSomeNonEmptyLookaheadPath)(e,r,Gd.defaultGrammarValidatorErrorProvider)},t.prototype.buildLookaheadForAlternation=function(e){return(0,_l.buildLookaheadFuncForOr)(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,_l.buildAlternativesLookAheadFunc)},t.prototype.buildLookaheadForOptional=function(e){return(0,_l.buildLookaheadFuncForOptionalProd)(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,(0,_l.getProdType)(e.prodType),_l.buildSingleAlternativeLookaheadFunction)},t}();ma.LLkLookaheadStrategy=Ure});var pI=d(Qn=>{"use strict";var Hre=Qn&&Qn.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),fI=Qn&&Qn.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Qn,"__esModule",{value:!0});Qn.collectMethods=Qn.LooksAhead=void 0;var Qa=fI(Mt()),dT=fI(Nr()),cI=Rr(),Di=Fd(),Kre=dt(),ks=dt(),Wre=fT(),Bre=function(){function t(){}return t.prototype.initLooksAhead=function(e){this.dynamicTokensEnabled=(0,dT.default)(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:cI.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled,this.maxLookahead=(0,dT.default)(e,"maxLookahead")?e.maxLookahead:cI.DEFAULT_PARSER_CONFIG.maxLookahead,this.lookaheadStrategy=(0,dT.default)(e,"lookaheadStrategy")?e.lookaheadStrategy:new Wre.LLkLookaheadStrategy({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map},t.prototype.preComputeLookaheadFunctions=function(e){var r=this;(0,Qa.default)(e,function(n){r.TRACE_INIT("".concat(n.name," Rule Lookahead"),function(){var i=dI(n),a=i.alternation,o=i.repetition,s=i.option,u=i.repetitionMandatory,l=i.repetitionMandatoryWithSeparator,c=i.repetitionWithSeparator;(0,Qa.default)(a,function(f){var m=f.idx===0?"":f.idx;r.TRACE_INIT("".concat((0,ks.getProductionDslName)(f)).concat(m),function(){var v=r.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:f.idx,rule:n,maxLookahead:f.maxLookahead||r.maxLookahead,hasPredicates:f.hasPredicates,dynamicTokensEnabled:r.dynamicTokensEnabled}),y=(0,Di.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name],Di.OR_IDX,f.idx);r.setLaFuncCache(y,v)})}),(0,Qa.default)(o,function(f){r.computeLookaheadFunc(n,f.idx,Di.MANY_IDX,"Repetition",f.maxLookahead,(0,ks.getProductionDslName)(f))}),(0,Qa.default)(s,function(f){r.computeLookaheadFunc(n,f.idx,Di.OPTION_IDX,"Option",f.maxLookahead,(0,ks.getProductionDslName)(f))}),(0,Qa.default)(u,function(f){r.computeLookaheadFunc(n,f.idx,Di.AT_LEAST_ONE_IDX,"RepetitionMandatory",f.maxLookahead,(0,ks.getProductionDslName)(f))}),(0,Qa.default)(l,function(f){r.computeLookaheadFunc(n,f.idx,Di.AT_LEAST_ONE_SEP_IDX,"RepetitionMandatoryWithSeparator",f.maxLookahead,(0,ks.getProductionDslName)(f))}),(0,Qa.default)(c,function(f){r.computeLookaheadFunc(n,f.idx,Di.MANY_SEP_IDX,"RepetitionWithSeparator",f.maxLookahead,(0,ks.getProductionDslName)(f))})})})},t.prototype.computeLookaheadFunc=function(e,r,n,i,a,o){var s=this;this.TRACE_INIT("".concat(o).concat(r===0?"":r),function(){var u=s.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:a||s.maxLookahead,dynamicTokensEnabled:s.dynamicTokensEnabled,prodType:i}),l=(0,Di.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name],n,r);s.setLaFuncCache(l,u)})},t.prototype.getKeyForAutomaticLookahead=function(e,r){var n=this.getLastExplicitRuleShortName();return(0,Di.getKeyForAutomaticLookahead)(n,e,r)},t.prototype.getLaFuncFromCache=function(e){return this.lookAheadFuncsCache.get(e)},t.prototype.setLaFuncCache=function(e,r){this.lookAheadFuncsCache.set(e,r)},t}();Qn.LooksAhead=Bre;var Vre=function(t){Hre(e,t);function e(){var r=t!==null&&t.apply(this,arguments)||this;return r.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},r}return e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitOption=function(r){this.dslMethods.option.push(r)},e.prototype.visitRepetitionWithSeparator=function(r){this.dslMethods.repetitionWithSeparator.push(r)},e.prototype.visitRepetitionMandatory=function(r){this.dslMethods.repetitionMandatory.push(r)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){this.dslMethods.repetitionMandatoryWithSeparator.push(r)},e.prototype.visitRepetition=function(r){this.dslMethods.repetition.push(r)},e.prototype.visitAlternation=function(r){this.dslMethods.alternation.push(r)},e}(Kre.GAstVisitor),Hd=new Vre;function dI(t){Hd.reset(),t.accept(Hd);var e=Hd.dslMethods;return Hd.reset(),e}Qn.collectMethods=dI});var hI=d(Zn=>{"use strict";Object.defineProperty(Zn,"__esModule",{value:!0});Zn.addNoneTerminalToCst=Zn.addTerminalToCst=Zn.setNodeLocationFull=Zn.setNodeLocationOnlyOffset=void 0;function zre(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}Zn.setNodeLocationOnlyOffset=zre;function Yre(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}Zn.setNodeLocationFull=Yre;function Xre(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}Zn.addTerminalToCst=Xre;function Jre(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}Zn.addNoneTerminalToCst=Jre});var mI=d(Kd=>{"use strict";Object.defineProperty(Kd,"__esModule",{value:!0});Kd.defineNameProp=void 0;var Qre="name";function Zre(t,e){Object.defineProperty(t,Qre,{enumerable:!1,configurable:!0,writable:!1,value:e})}Kd.defineNameProp=Zre});var AI=d(zt=>{"use strict";var xi=zt&&zt.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(zt,"__esModule",{value:!0});zt.validateMissingCstMethods=zt.validateVisitor=zt.CstVisitorDefinitionError=zt.createBaseVisitorConstructorWithDefaults=zt.createBaseSemanticVisitorConstructor=zt.defaultVisit=void 0;var ene=xi(Er()),tne=xi(ul()),rne=xi(Oe()),yI=xi(qt()),nne=xi(Mt()),ine=xi(ll()),ane=xi(kr()),one=xi(Qo()),sne=xi(Ga()),gI=mI();function vI(t,e){for(var r=(0,ane.default)(t),n=r.length,i=0;i<n;i++)for(var a=r[i],o=t[a],s=o.length,u=0;u<s;u++){var l=o[u];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}zt.defaultVisit=vI;function une(t,e){var r=function(){};(0,gI.defineNameProp)(r,t+"BaseSemantics");var n={visit:function(i,a){if((0,rne.default)(i)&&(i=i[0]),!(0,sne.default)(i))return this[i.name](i.children,a)},validateVisitor:function(){var i=_I(this,e);if(!(0,ene.default)(i)){var a=(0,yI.default)(i,function(o){return o.msg});throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name,`>:
	`)+"".concat(a.join(`

`).replace(/\n/g,`
	`)))}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}zt.createBaseSemanticVisitorConstructor=une;function lne(t,e,r){var n=function(){};(0,gI.defineNameProp)(n,t+"BaseSemanticsWithDefaults");var i=Object.create(r.prototype);return(0,nne.default)(e,function(a){i[a]=vI}),n.prototype=i,n.prototype.constructor=n,n}zt.createBaseVisitorConstructorWithDefaults=lne;var TI;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(TI=zt.CstVisitorDefinitionError||(zt.CstVisitorDefinitionError={}));function _I(t,e){var r=RI(t,e);return r}zt.validateVisitor=_I;function RI(t,e){var r=(0,ine.default)(e,function(i){return(0,one.default)(t[i])===!1}),n=(0,yI.default)(r,function(i){return{msg:"Missing visitor method: <".concat(i,"> on ").concat(t.constructor.name," CST Visitor."),type:TI.MISSING_METHOD,methodName:i}});return(0,tne.default)(n)}zt.validateMissingCstMethods=RI});var PI=d(ws=>{"use strict";var Wd=ws&&ws.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ws,"__esModule",{value:!0});ws.TreeBuilder=void 0;var Ns=hI(),dr=Wd(dd()),cne=Wd(Nr()),SI=Wd(kr()),bI=Wd(Ga()),CI=AI(),fne=Rr(),dne=function(){function t(){}return t.prototype.initTreeBuilder=function(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=(0,cne.default)(e,"nodeLocationTracking")?e.nodeLocationTracking:fne.DEFAULT_PARSER_CONFIG.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=dr.default,this.cstFinallyStateUpdate=dr.default,this.cstPostTerminal=dr.default,this.cstPostNonTerminal=dr.default,this.cstPostRule=dr.default;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Ns.setNodeLocationFull,this.setNodeLocationFromNode=Ns.setNodeLocationFull,this.cstPostRule=dr.default,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Ns.setNodeLocationOnlyOffset,this.setNodeLocationFromNode=Ns.setNodeLocationOnlyOffset,this.cstPostRule=dr.default,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=dr.default,this.setNodeLocationFromNode=dr.default,this.cstPostRule=dr.default,this.setInitialNodeLocation=dr.default;else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking,'"'))},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(e){e.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(e){var r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(e){var r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(e){var r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Ns.addTerminalToCst)(n,r,e),this.setNodeLocationFromToken(n.location,r)},t.prototype.cstPostNonTerminal=function(e,r){var n=this.CST_STACK[this.CST_STACK.length-1];(0,Ns.addNoneTerminalToCst)(n,r,e),this.setNodeLocationFromNode(n.location,e.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,bI.default)(this.baseCstVisitorConstructor)){var e=(0,CI.createBaseSemanticVisitorConstructor)(this.className,(0,SI.default)(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,bI.default)(this.baseCstVisitorWithDefaultsConstructor)){var e=(0,CI.createBaseVisitorConstructorWithDefaults)(this.className,(0,SI.default)(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var e=this.RULE_STACK;return e[e.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]},t}();ws.TreeBuilder=dne});var kI=d(Bd=>{"use strict";Object.defineProperty(Bd,"__esModule",{value:!0});Bd.LexerAdapter=void 0;var EI=Rr(),pne=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):EI.END_OF_FILE},t.prototype.LA=function(e){var r=this.currIdx+e;return r<0||this.tokVectorLength<=r?EI.END_OF_FILE:this.tokVector[r]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(e){this.currIdx=e},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}();Bd.LexerAdapter=pne});var wI=d($s=>{"use strict";var NI=$s&&$s.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty($s,"__esModule",{value:!0});$s.RecognizerApi=void 0;var hne=NI(Hn()),mne=NI(Ci()),yne=Es(),pT=Rr(),gne=bs(),vne=gl(),Tne=dt(),_ne=function(){function t(){}return t.prototype.ACTION=function(e){return e.call(this)},t.prototype.consume=function(e,r,n){return this.consumeInternal(r,e,n)},t.prototype.subrule=function(e,r,n){return this.subruleInternal(r,e,n)},t.prototype.option=function(e,r){return this.optionInternal(r,e)},t.prototype.or=function(e,r){return this.orInternal(r,e)},t.prototype.many=function(e,r){return this.manyInternal(e,r)},t.prototype.atLeastOne=function(e,r){return this.atLeastOneInternal(e,r)},t.prototype.CONSUME=function(e,r){return this.consumeInternal(e,0,r)},t.prototype.CONSUME1=function(e,r){return this.consumeInternal(e,1,r)},t.prototype.CONSUME2=function(e,r){return this.consumeInternal(e,2,r)},t.prototype.CONSUME3=function(e,r){return this.consumeInternal(e,3,r)},t.prototype.CONSUME4=function(e,r){return this.consumeInternal(e,4,r)},t.prototype.CONSUME5=function(e,r){return this.consumeInternal(e,5,r)},t.prototype.CONSUME6=function(e,r){return this.consumeInternal(e,6,r)},t.prototype.CONSUME7=function(e,r){return this.consumeInternal(e,7,r)},t.prototype.CONSUME8=function(e,r){return this.consumeInternal(e,8,r)},t.prototype.CONSUME9=function(e,r){return this.consumeInternal(e,9,r)},t.prototype.SUBRULE=function(e,r){return this.subruleInternal(e,0,r)},t.prototype.SUBRULE1=function(e,r){return this.subruleInternal(e,1,r)},t.prototype.SUBRULE2=function(e,r){return this.subruleInternal(e,2,r)},t.prototype.SUBRULE3=function(e,r){return this.subruleInternal(e,3,r)},t.prototype.SUBRULE4=function(e,r){return this.subruleInternal(e,4,r)},t.prototype.SUBRULE5=function(e,r){return this.subruleInternal(e,5,r)},t.prototype.SUBRULE6=function(e,r){return this.subruleInternal(e,6,r)},t.prototype.SUBRULE7=function(e,r){return this.subruleInternal(e,7,r)},t.prototype.SUBRULE8=function(e,r){return this.subruleInternal(e,8,r)},t.prototype.SUBRULE9=function(e,r){return this.subruleInternal(e,9,r)},t.prototype.OPTION=function(e){return this.optionInternal(e,0)},t.prototype.OPTION1=function(e){return this.optionInternal(e,1)},t.prototype.OPTION2=function(e){return this.optionInternal(e,2)},t.prototype.OPTION3=function(e){return this.optionInternal(e,3)},t.prototype.OPTION4=function(e){return this.optionInternal(e,4)},t.prototype.OPTION5=function(e){return this.optionInternal(e,5)},t.prototype.OPTION6=function(e){return this.optionInternal(e,6)},t.prototype.OPTION7=function(e){return this.optionInternal(e,7)},t.prototype.OPTION8=function(e){return this.optionInternal(e,8)},t.prototype.OPTION9=function(e){return this.optionInternal(e,9)},t.prototype.OR=function(e){return this.orInternal(e,0)},t.prototype.OR1=function(e){return this.orInternal(e,1)},t.prototype.OR2=function(e){return this.orInternal(e,2)},t.prototype.OR3=function(e){return this.orInternal(e,3)},t.prototype.OR4=function(e){return this.orInternal(e,4)},t.prototype.OR5=function(e){return this.orInternal(e,5)},t.prototype.OR6=function(e){return this.orInternal(e,6)},t.prototype.OR7=function(e){return this.orInternal(e,7)},t.prototype.OR8=function(e){return this.orInternal(e,8)},t.prototype.OR9=function(e){return this.orInternal(e,9)},t.prototype.MANY=function(e){this.manyInternal(0,e)},t.prototype.MANY1=function(e){this.manyInternal(1,e)},t.prototype.MANY2=function(e){this.manyInternal(2,e)},t.prototype.MANY3=function(e){this.manyInternal(3,e)},t.prototype.MANY4=function(e){this.manyInternal(4,e)},t.prototype.MANY5=function(e){this.manyInternal(5,e)},t.prototype.MANY6=function(e){this.manyInternal(6,e)},t.prototype.MANY7=function(e){this.manyInternal(7,e)},t.prototype.MANY8=function(e){this.manyInternal(8,e)},t.prototype.MANY9=function(e){this.manyInternal(9,e)},t.prototype.MANY_SEP=function(e){this.manySepFirstInternal(0,e)},t.prototype.MANY_SEP1=function(e){this.manySepFirstInternal(1,e)},t.prototype.MANY_SEP2=function(e){this.manySepFirstInternal(2,e)},t.prototype.MANY_SEP3=function(e){this.manySepFirstInternal(3,e)},t.prototype.MANY_SEP4=function(e){this.manySepFirstInternal(4,e)},t.prototype.MANY_SEP5=function(e){this.manySepFirstInternal(5,e)},t.prototype.MANY_SEP6=function(e){this.manySepFirstInternal(6,e)},t.prototype.MANY_SEP7=function(e){this.manySepFirstInternal(7,e)},t.prototype.MANY_SEP8=function(e){this.manySepFirstInternal(8,e)},t.prototype.MANY_SEP9=function(e){this.manySepFirstInternal(9,e)},t.prototype.AT_LEAST_ONE=function(e){this.atLeastOneInternal(0,e)},t.prototype.AT_LEAST_ONE1=function(e){return this.atLeastOneInternal(1,e)},t.prototype.AT_LEAST_ONE2=function(e){this.atLeastOneInternal(2,e)},t.prototype.AT_LEAST_ONE3=function(e){this.atLeastOneInternal(3,e)},t.prototype.AT_LEAST_ONE4=function(e){this.atLeastOneInternal(4,e)},t.prototype.AT_LEAST_ONE5=function(e){this.atLeastOneInternal(5,e)},t.prototype.AT_LEAST_ONE6=function(e){this.atLeastOneInternal(6,e)},t.prototype.AT_LEAST_ONE7=function(e){this.atLeastOneInternal(7,e)},t.prototype.AT_LEAST_ONE8=function(e){this.atLeastOneInternal(8,e)},t.prototype.AT_LEAST_ONE9=function(e){this.atLeastOneInternal(9,e)},t.prototype.AT_LEAST_ONE_SEP=function(e){this.atLeastOneSepFirstInternal(0,e)},t.prototype.AT_LEAST_ONE_SEP1=function(e){this.atLeastOneSepFirstInternal(1,e)},t.prototype.AT_LEAST_ONE_SEP2=function(e){this.atLeastOneSepFirstInternal(2,e)},t.prototype.AT_LEAST_ONE_SEP3=function(e){this.atLeastOneSepFirstInternal(3,e)},t.prototype.AT_LEAST_ONE_SEP4=function(e){this.atLeastOneSepFirstInternal(4,e)},t.prototype.AT_LEAST_ONE_SEP5=function(e){this.atLeastOneSepFirstInternal(5,e)},t.prototype.AT_LEAST_ONE_SEP6=function(e){this.atLeastOneSepFirstInternal(6,e)},t.prototype.AT_LEAST_ONE_SEP7=function(e){this.atLeastOneSepFirstInternal(7,e)},t.prototype.AT_LEAST_ONE_SEP8=function(e){this.atLeastOneSepFirstInternal(8,e)},t.prototype.AT_LEAST_ONE_SEP9=function(e){this.atLeastOneSepFirstInternal(9,e)},t.prototype.RULE=function(e,r,n){if(n===void 0&&(n=pT.DEFAULT_RULE_CONFIG),(0,mne.default)(this.definedRulesNames,e)){var i=gne.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),a={message:i,type:pT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(a)}this.definedRulesNames.push(e);var o=this.defineRule(e,r,n);return this[e]=o,o},t.prototype.OVERRIDE_RULE=function(e,r,n){n===void 0&&(n=pT.DEFAULT_RULE_CONFIG);var i=(0,vne.validateRuleIsOverridden)(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);var a=this.defineRule(e,r,n);return this[e]=a,a},t.prototype.BACKTRACK=function(e,r){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if((0,yne.isRecognitionException)(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return(0,Tne.serializeGrammar)((0,hne.default)(this.gastProductionsCache))},t}();$s.RecognizerApi=_ne});var MI=d(Is=>{"use strict";var ei=Is&&Is.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Is,"__esModule",{value:!0});Is.RecognizerEngine=void 0;var $I=ei(Er()),hT=ei(Oe()),mT=ei(Rn()),OI=ei(sl()),Rne=ei(pd()),Ane=ei(vn()),Rl=ei(Nr()),Al=ei(Hn()),II=ei(Pi()),DI=ei(Si()),$r=Fd(),Vd=Es(),xI=Cs(),Os=hl(),LI=Rr(),Sne=lT(),qI=Wa(),Sl=Ka(),bne=function(){function t(){}return t.prototype.initRecognizerEngine=function(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Sl.tokenStructuredMatcherNoCategories,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,Rl.default)(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if((0,hT.default)(e)){if((0,$I.default)(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if((0,hT.default)(e))this.tokensMap=(0,II.default)(e,function(s,u){return s[u.name]=u,s},{});else if((0,Rl.default)(e,"modes")&&(0,OI.default)((0,mT.default)((0,Al.default)(e.modes)),Sl.isTokenType)){var n=(0,mT.default)((0,Al.default)(e.modes)),i=(0,Rne.default)(n);this.tokensMap=(0,II.default)(i,function(s,u){return s[u.name]=u,s},{})}else if((0,Ane.default)(e))this.tokensMap=(0,DI.default)(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=qI.EOF;var a=(0,Rl.default)(e,"modes")?(0,mT.default)((0,Al.default)(e.modes)):(0,Al.default)(e),o=(0,OI.default)(a,function(s){return(0,$I.default)(s.categoryMatches)});this.tokenMatcher=o?Sl.tokenStructuredMatcherNoCategories:Sl.tokenStructuredMatcher,(0,Sl.augmentTokenTypes)((0,Al.default)(this.tokensMap))},t.prototype.defineRule=function(e,r,n){if(this.selfAnalysisDone)throw Error("Grammar rule <".concat(e,`> may not be defined after the 'performSelfAnalysis' method has been called'
`)+"Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var i=(0,Rl.default)(n,"resyncEnabled")?n.resyncEnabled:LI.DEFAULT_RULE_CONFIG.resyncEnabled,a=(0,Rl.default)(n,"recoveryValueFunc")?n.recoveryValueFunc:LI.DEFAULT_RULE_CONFIG.recoveryValueFunc,o=this.ruleShortNameIdx<<$r.BITS_FOR_METHOD_TYPE+$r.BITS_FOR_OCCURRENCE_IDX;this.ruleShortNameIdx++,this.shortRuleNameToFull[o]=e,this.fullRuleNameToShort[e]=o;var s;this.outputCst===!0?s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c);var m=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(m),m}catch(v){return this.invokeRuleCatch(v,i,a)}finally{this.ruleFinallyStateUpdate()}}:s=function(){for(var c=[],f=0;f<arguments.length;f++)c[f]=arguments[f];try{return this.ruleInvocationStateUpdate(o,e,this.subruleIdx),r.apply(this,c)}catch(m){return this.invokeRuleCatch(m,i,a)}finally{this.ruleFinallyStateUpdate()}};var u=Object.assign(s,{ruleName:e,originalGrammarAction:r});return u},t.prototype.invokeRuleCatch=function(e,r,n){var i=this.RULE_STACK.length===1,a=r&&!this.isBackTracking()&&this.recoveryEnabled;if((0,Vd.isRecognitionException)(e)){var o=e;if(a){var s=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(s))if(o.resyncedTokens=this.reSyncTo(s),this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}else return n();else{if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,o.partialCstResult=u}throw o}}else{if(i)return this.moveToTerminatedState(),n();throw o}}else throw e},t.prototype.optionInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OPTION_IDX,r);return this.optionInternalLogic(e,r,n)},t.prototype.optionInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;var s=e.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=e;if(a.call(this)===!0)return o.call(this)},t.prototype.atLeastOneInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_IDX,e);return this.atLeastOneInternalLogic(e,r,n)},t.prototype.atLeastOneInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;if(a.call(this)===!0)for(var l=this.doSingleRepetition(o);a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);else throw this.raiseEarlyExitException(e,xI.PROD_TYPE.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],a,$r.AT_LEAST_ONE_IDX,e,Os.NextTerminalAfterAtLeastOneWalker)},t.prototype.atLeastOneSepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.AT_LEAST_ONE_SEP_IDX,e);this.atLeastOneSepFirstInternalLogic(e,r,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Os.NextTerminalAfterAtLeastOneSepWalker],u,$r.AT_LEAST_ONE_SEP_IDX,e,Os.NextTerminalAfterAtLeastOneSepWalker)}else throw this.raiseEarlyExitException(e,xI.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)},t.prototype.manyInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_IDX,e);return this.manyInternalLogic(e,r,n)},t.prototype.manyInternalLogic=function(e,r,n){var i=this,a=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;var s=r.GATE;if(s!==void 0){var u=a;a=function(){return s.call(i)&&u.call(i)}}}else o=r;for(var l=!0;a.call(this)===!0&&l===!0;)l=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],a,$r.MANY_IDX,e,Os.NextTerminalAfterManyWalker,l)},t.prototype.manySepFirstInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.MANY_SEP_IDX,e);this.manySepFirstInternalLogic(e,r,n)},t.prototype.manySepFirstInternalLogic=function(e,r,n){var i=this,a=r.DEF,o=r.SEP,s=this.getLaFuncFromCache(n);if(s.call(this)===!0){a.call(this);for(var u=function(){return i.tokenMatcher(i.LA(1),o)};this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),a.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,u,a,Os.NextTerminalAfterManySepWalker],u,$r.MANY_SEP_IDX,e,Os.NextTerminalAfterManySepWalker)}},t.prototype.repetitionSepSecondInternal=function(e,r,n,i,a){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,a],n,$r.AT_LEAST_ONE_SEP_IDX,e,a)},t.prototype.doSingleRepetition=function(e){var r=this.getLexerPosition();e.call(this);var n=this.getLexerPosition();return n>r},t.prototype.orInternal=function(e,r){var n=this.getKeyForAutomaticLookahead($r.OR_IDX,r),i=(0,hT.default)(e)?e:e.DEF,a=this.getLaFuncFromCache(n),o=a.call(this,i);if(o!==void 0){var s=i[o];return s.ALT.call(this)}this.raiseNoAltException(r,e.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){var e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Vd.NotAllInputParsedException(r,e))}},t.prototype.subruleInternal=function(e,r,n){var i;try{var a=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,a),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}},t.prototype.subruleInternalError=function(e,r,n){throw(0,Vd.isRecognitionException)(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e},t.prototype.consumeInternal=function(e,r,n){var i;try{var a=this.LA(1);this.tokenMatcher(a,e)===!0?(this.consumeToken(),i=a):this.consumeInternalError(e,a,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i},t.prototype.consumeInternalError=function(e,r,n){var i,a=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:a,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Vd.MismatchedTokenException(i,r,a))},t.prototype.consumeInternalRecovery=function(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){var i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(a){throw a.name===Sne.IN_RULE_RECOVERY_EXCEPTION?n:a}}else throw n},t.prototype.saveRecogState=function(){var e=this.errors,r=(0,DI.default)(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)},t.prototype.isBackTracking=function(){return this.isBackTrackingStack.length!==0},t.prototype.getCurrRuleFullName=function(){var e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]},t.prototype.shortRuleNameToFullName=function(e){return this.shortRuleNameToFull[e]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),qI.EOF)},t.prototype.reset=function(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}();Is.RecognizerEngine=bne});var UI=d(Ds=>{"use strict";var GI=Ds&&Ds.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ds,"__esModule",{value:!0});Ds.ErrorHandler=void 0;var yT=Es(),Cne=GI(Nr()),FI=GI(Si()),jI=Cs(),Pne=Rr(),Ene=function(){function t(){}return t.prototype.initErrorHandler=function(e){this._errors=[],this.errorMessageProvider=(0,Cne.default)(e,"errorMessageProvider")?e.errorMessageProvider:Pne.DEFAULT_PARSER_CONFIG.errorMessageProvider},t.prototype.SAVE_ERROR=function(e){if((0,yT.isRecognitionException)(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,FI.default)(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,FI.default)(this._errors)},set:function(e){this._errors=e},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(e,r,n){for(var i=this.getCurrRuleFullName(),a=this.getGAstProductions()[i],o=(0,jI.getLookaheadPathsForOptionalProd)(e,a,r,this.maxLookahead),s=o[0],u=[],l=1;l<=this.maxLookahead;l++)u.push(this.LA(l));var c=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:s,actual:u,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new yT.EarlyExitException(c,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(e,r){for(var n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],a=(0,jI.getLookaheadPathsForOr)(e,i,this.maxLookahead),o=[],s=1;s<=this.maxLookahead;s++)o.push(this.LA(s));var u=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:a,actual:o,previous:u,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new yT.NoViableAltException(l,this.LA(1),u))},t}();Ds.ErrorHandler=Ene});var WI=d(xs=>{"use strict";var KI=xs&&xs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(xs,"__esModule",{value:!0});xs.ContentAssist=void 0;var HI=hl(),kne=KI(Ts()),Nne=KI(Ga()),wne=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(e,r){var n=this.gastProductionsCache[e];if((0,Nne.default)(n))throw Error("Rule ->".concat(e,"<- does not exist in this grammar."));return(0,HI.nextPossibleTokensAfter)([n],r,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(e){var r=(0,kne.default)(e.ruleStack),n=this.getGAstProductions(),i=n[r],a=new HI.NextAfterTokenWalker(i,e).startWalking();return a},t}();xs.ContentAssist=wne});var eD=d(Ls=>{"use strict";var qs=Ls&&Ls.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ls,"__esModule",{value:!0});Ls.GastRecorder=void 0;var zd=qs(kd()),$ne=qs(Oe()),One=qs(sd()),Ine=qs(Mt()),YI=qs(Qo()),Cl=qs(Nr()),ti=dt(),Dne=cl(),XI=Ka(),JI=Wa(),xne=Rr(),Lne=Fd(),Xd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Xd);var BI=!0,VI=Math.pow(2,Lne.BITS_FOR_OCCURRENCE_IDX)-1,QI=(0,JI.createToken)({name:"RECORDING_PHASE_TOKEN",pattern:Dne.Lexer.NA});(0,XI.augmentTokenTypes)([QI]);var ZI=(0,JI.createTokenInstance)(QI,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(ZI);var qne={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Mne=function(){function t(){}return t.prototype.initGastRecorder=function(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var e=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var r=function(i){var a=i>0?i:"";e["CONSUME".concat(a)]=function(o,s){return this.consumeInternalRecord(o,i,s)},e["SUBRULE".concat(a)]=function(o,s){return this.subruleInternalRecord(o,i,s)},e["OPTION".concat(a)]=function(o){return this.optionInternalRecord(o,i)},e["OR".concat(a)]=function(o){return this.orInternalRecord(o,i)},e["MANY".concat(a)]=function(o){this.manyInternalRecord(i,o)},e["MANY_SEP".concat(a)]=function(o){this.manySepFirstInternalRecord(i,o)},e["AT_LEAST_ONE".concat(a)]=function(o){this.atLeastOneInternalRecord(i,o)},e["AT_LEAST_ONE_SEP".concat(a)]=function(o){this.atLeastOneSepFirstInternalRecord(i,o)}},n=0;n<10;n++)r(n);e.consume=function(i,a,o){return this.consumeInternalRecord(a,i,o)},e.subrule=function(i,a,o){return this.subruleInternalRecord(a,i,o)},e.option=function(i,a){return this.optionInternalRecord(a,i)},e.or=function(i,a){return this.orInternalRecord(a,i)},e.many=function(i,a){this.manyInternalRecord(i,a)},e.atLeastOne=function(i,a){this.atLeastOneInternalRecord(i,a)},e.ACTION=e.ACTION_RECORD,e.BACKTRACK=e.BACKTRACK_RECORD,e.LA=e.LA_RECORD})},t.prototype.disableRecording=function(){var e=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var r=e,n=0;n<10;n++){var i=n>0?n:"";delete r["CONSUME".concat(i)],delete r["SUBRULE".concat(i)],delete r["OPTION".concat(i)],delete r["OR".concat(i)],delete r["MANY".concat(i)],delete r["MANY_SEP".concat(i)],delete r["AT_LEAST_ONE".concat(i)],delete r["AT_LEAST_ONE_SEP".concat(i)]}delete r.consume,delete r.subrule,delete r.option,delete r.or,delete r.many,delete r.atLeastOne,delete r.ACTION,delete r.BACKTRACK,delete r.LA})},t.prototype.ACTION_RECORD=function(e){},t.prototype.BACKTRACK_RECORD=function(e,r){return function(){return!0}},t.prototype.LA_RECORD=function(e){return xne.END_OF_FILE},t.prototype.topLevelRuleRecord=function(e,r){try{var n=new ti.Rule({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(i){if(i.KNOWN_RECORDER_ERROR!==!0)try{i.message=i.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw i}throw i}},t.prototype.optionInternalRecord=function(e,r){return bl.call(this,ti.Option,e,r)},t.prototype.atLeastOneInternalRecord=function(e,r){bl.call(this,ti.RepetitionMandatory,r,e)},t.prototype.atLeastOneSepFirstInternalRecord=function(e,r){bl.call(this,ti.RepetitionMandatoryWithSeparator,r,e,BI)},t.prototype.manyInternalRecord=function(e,r){bl.call(this,ti.Repetition,r,e)},t.prototype.manySepFirstInternalRecord=function(e,r){bl.call(this,ti.RepetitionWithSeparator,r,e,BI)},t.prototype.orInternalRecord=function(e,r){return Fne.call(this,e,r)},t.prototype.subruleInternalRecord=function(e,r,n){if(Yd(r),!e||(0,Cl.default)(e,"ruleName")===!1){var i=new Error("<SUBRULE".concat(zI(r),"> argument is invalid")+" expecting a Parser method reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,zd.default)(this.recordingProdStack),o=e.ruleName,s=new ti.NonTerminal({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return a.definition.push(s),this.outputCst?qne:Xd},t.prototype.consumeInternalRecord=function(e,r,n){if(Yd(r),!(0,XI.hasShortKeyProperty)(e)){var i=new Error("<CONSUME".concat(zI(r),"> argument is invalid")+" expecting a TokenType reference but got: <".concat(JSON.stringify(e),">")+`
 inside top level rule: <`.concat(this.recordingProdStack[0].name,">"));throw i.KNOWN_RECORDER_ERROR=!0,i}var a=(0,zd.default)(this.recordingProdStack),o=new ti.Terminal({idx:r,terminalType:e,label:n?.LABEL});return a.definition.push(o),ZI},t}();Ls.GastRecorder=Mne;function bl(t,e,r,n){n===void 0&&(n=!1),Yd(r);var i=(0,zd.default)(this.recordingProdStack),a=(0,YI.default)(e)?e:e.DEF,o=new t({definition:[],idx:r});return n&&(o.separator=e.SEP),(0,Cl.default)(e,"MAX_LOOKAHEAD")&&(o.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(o),a.call(this),i.definition.push(o),this.recordingProdStack.pop(),Xd}function Fne(t,e){var r=this;Yd(e);var n=(0,zd.default)(this.recordingProdStack),i=(0,$ne.default)(t)===!1,a=i===!1?t:t.DEF,o=new ti.Alternation({definition:[],idx:e,ignoreAmbiguities:i&&t.IGNORE_AMBIGUITIES===!0});(0,Cl.default)(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);var s=(0,One.default)(a,function(u){return(0,YI.default)(u.GATE)});return o.hasPredicates=s,n.definition.push(o),(0,Ine.default)(a,function(u){var l=new ti.Alternative({definition:[]});o.definition.push(l),(0,Cl.default)(u,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=u.IGNORE_AMBIGUITIES:(0,Cl.default)(u,"GATE")&&(l.ignoreAmbiguities=!0),r.recordingProdStack.push(l),u.ALT.call(r),r.recordingProdStack.pop()}),Xd}function zI(t){return t===0?"":"".concat(t)}function Yd(t){if(t<0||t>VI){var e=new Error("Invalid DSL Method idx value: <".concat(t,`>
	`)+"Idx value must be a none negative value smaller than ".concat(VI+1));throw e.KNOWN_RECORDER_ERROR=!0,e}}});var tD=d(Ms=>{"use strict";var jne=Ms&&Ms.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Ms,"__esModule",{value:!0});Ms.PerformanceTracer=void 0;var Gne=jne(Nr()),Une=ms(),Hne=Rr(),Kne=function(){function t(){}return t.prototype.initPerformanceTracer=function(e){if((0,Gne.default)(e,"traceInitPerf")){var r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Hne.DEFAULT_PARSER_CONFIG.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;var n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log("".concat(n,"--> <").concat(e,">"));var i=(0,Une.timer)(r),a=i.time,o=i.value,s=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s("".concat(n,"<-- <").concat(e,"> time: ").concat(a,"ms")),this.traceInitIndent--,o}else return r()},t}();Ms.PerformanceTracer=Kne});var rD=d(Jd=>{"use strict";Object.defineProperty(Jd,"__esModule",{value:!0});Jd.applyMixins=void 0;function Wne(t,e){e.forEach(function(r){var n=r.prototype;Object.getOwnPropertyNames(n).forEach(function(i){if(i!=="constructor"){var a=Object.getOwnPropertyDescriptor(n,i);a&&(a.get||a.set)?Object.defineProperty(t.prototype,i,a):t.prototype[i]=r.prototype[i]}})})}Jd.applyMixins=Wne});var Rr=d(Me=>{"use strict";var oD=Me&&Me.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),Fs=Me&&Me.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Me,"__esModule",{value:!0});Me.EmbeddedActionsParser=Me.CstParser=Me.Parser=Me.EMPTY_ALT=Me.ParserDefinitionErrorType=Me.DEFAULT_RULE_CONFIG=Me.DEFAULT_PARSER_CONFIG=Me.END_OF_FILE=void 0;var gT=Fs(Er()),Bne=Fs(qt()),Vne=Fs(Mt()),ya=Fs(Hn()),nD=Fs(Nr()),sD=Fs(Si()),zne=ms(),Yne=j$(),iD=Wa(),uD=bs(),aD=Z1(),Xne=lT(),Jne=pI(),Qne=PI(),Zne=kI(),eie=wI(),tie=MI(),rie=UI(),nie=WI(),iie=eD(),aie=tD(),oie=rD(),sie=gl();Me.END_OF_FILE=(0,iD.createTokenInstance)(iD.EOF,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Me.END_OF_FILE);Me.DEFAULT_PARSER_CONFIG=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:uD.defaultParserErrorProvider,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1});Me.DEFAULT_RULE_CONFIG=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});var uie;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(uie=Me.ParserDefinitionErrorType||(Me.ParserDefinitionErrorType={}));function lie(t){return t===void 0&&(t=void 0),function(){return t}}Me.EMPTY_ALT=lie;var Qd=function(){function t(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;var n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),(0,nD.default)(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=(0,nD.default)(r,"skipValidations")?r.skipValidations:Me.DEFAULT_PARSER_CONFIG.skipValidations}return t.performSelfAnalysis=function(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){var r;e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,zne.toFastProperties)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,Vne.default)(e.definedRulesNames,function(a){var o=e[a],s=o.originalGrammarAction,u;e.TRACE_INIT("".concat(a," Rule"),function(){u=e.topLevelRuleRecord(a,s)}),e.gastProductionsCache[a]=u})}finally{e.disableRecording()}});var i=[];if(e.TRACE_INIT("Grammar Resolving",function(){i=(0,aD.resolveGrammar)({rules:(0,ya.default)(e.gastProductionsCache)}),e.definitionErrors=e.definitionErrors.concat(i)}),e.TRACE_INIT("Grammar Validations",function(){if((0,gT.default)(i)&&e.skipValidations===!1){var a=(0,aD.validateGrammar)({rules:(0,ya.default)(e.gastProductionsCache),tokenTypes:(0,ya.default)(e.tokensMap),errMsgProvider:uD.defaultGrammarValidatorErrorProvider,grammarName:n}),o=(0,sie.validateLookahead)({lookaheadStrategy:e.lookaheadStrategy,rules:(0,ya.default)(e.gastProductionsCache),tokenTypes:(0,ya.default)(e.tokensMap),grammarName:n});e.definitionErrors=e.definitionErrors.concat(a,o)}}),(0,gT.default)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var a=(0,Yne.computeAllProdsFollows)((0,ya.default)(e.gastProductionsCache));e.resyncFollows=a}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){var a,o;(o=(a=e.lookaheadStrategy).initialize)===null||o===void 0||o.call(a,{rules:(0,ya.default)(e.gastProductionsCache)}),e.preComputeLookaheadFunctions((0,ya.default)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,gT.default)(e.definitionErrors))throw r=(0,Bne.default)(e.definitionErrors,function(a){return a.message}),new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();Me.Parser=Qd;(0,oie.applyMixins)(Qd,[Xne.Recoverable,Jne.LooksAhead,Qne.TreeBuilder,Zne.LexerAdapter,tie.RecognizerEngine,eie.RecognizerApi,rie.ErrorHandler,nie.ContentAssist,iie.GastRecorder,aie.PerformanceTracer]);var cie=function(t){oD(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,sD.default)(n);return i.outputCst=!0,t.call(this,r,i)||this}return e}(Qd);Me.CstParser=cie;var fie=function(t){oD(e,t);function e(r,n){n===void 0&&(n=Me.DEFAULT_PARSER_CONFIG);var i=(0,sD.default)(n);return i.outputCst=!1,t.call(this,r,i)||this}return e}(Qd);Me.EmbeddedActionsParser=fie});var cD=d(ga=>{"use strict";var die=ga&&ga.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,i){n.__proto__=i}||function(n,i){for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])},t(e,r)};return function(e,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}(),js=ga&&ga.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ga,"__esModule",{value:!0});ga.buildModel=void 0;var lD=dt(),Pl=js(qt()),pie=js(Rn()),hie=js(Hn()),mie=js(sd()),yie=js(zv()),gie=js(al());function vie(t){var e=new Tie,r=(0,hie.default)(t);return(0,Pl.default)(r,function(n){return e.visitRule(n)})}ga.buildModel=vie;var Tie=function(t){die(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.visitRule=function(r){var n=this.visitEach(r.definition),i=(0,yie.default)(n,function(o){return o.propertyName}),a=(0,Pl.default)(i,function(o,s){var u=!(0,mie.default)(o,function(c){return!c.canBeNull}),l=o[0].type;return o.length>1&&(l=(0,Pl.default)(o,function(c){return c.type})),{name:s,type:l,optional:u}});return{name:r.name,properties:a}},e.prototype.visitAlternative=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitOption=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetition=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitRepetitionMandatory=function(r){return this.visitEach(r.definition)},e.prototype.visitRepetitionMandatoryWithSeparator=function(r){return this.visitEach(r.definition).concat({propertyName:r.separator.name,canBeNull:!0,type:Zd(r.separator)})},e.prototype.visitRepetitionWithSeparator=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0}).concat({propertyName:r.separator.name,canBeNull:!0,type:Zd(r.separator)})},e.prototype.visitAlternation=function(r){return this.visitEachAndOverrideWith(r.definition,{canBeNull:!0})},e.prototype.visitTerminal=function(r){return[{propertyName:r.label||r.terminalType.name,canBeNull:!1,type:Zd(r)}]},e.prototype.visitNonTerminal=function(r){return[{propertyName:r.label||r.nonTerminalName,canBeNull:!1,type:Zd(r)}]},e.prototype.visitEachAndOverrideWith=function(r,n){return(0,Pl.default)(this.visitEach(r),function(i){return(0,gie.default)({},i,n)})},e.prototype.visitEach=function(r){var n=this;return(0,pie.default)((0,Pl.default)(r,function(i){return n.visit(i)}))},e}(lD.GAstVisitor);function Zd(t){return t instanceof lD.NonTerminal?{kind:"rule",name:t.referencedRule.name}:{kind:"token"}}});var dD=d((Sve,fD)=>{var _ie=td();function Rie(t,e,r){var n=t.length;return r=r===void 0?n:r,!e&&r>=n?t:_ie(t,e,r)}fD.exports=Rie});var vT=d((bve,pD)=>{var Aie="\\ud800-\\udfff",Sie="\\u0300-\\u036f",bie="\\ufe20-\\ufe2f",Cie="\\u20d0-\\u20ff",Pie=Sie+bie+Cie,Eie="\\ufe0e\\ufe0f",kie="\\u200d",Nie=RegExp("["+kie+Aie+Pie+Eie+"]");function wie(t){return Nie.test(t)}pD.exports=wie});var mD=d((Cve,hD)=>{function $ie(t){return t.split("")}hD.exports=$ie});var SD=d((Pve,AD)=>{var yD="\\ud800-\\udfff",Oie="\\u0300-\\u036f",Iie="\\ufe20-\\ufe2f",Die="\\u20d0-\\u20ff",xie=Oie+Iie+Die,Lie="\\ufe0e\\ufe0f",qie="["+yD+"]",TT="["+xie+"]",_T="\\ud83c[\\udffb-\\udfff]",Mie="(?:"+TT+"|"+_T+")",gD="[^"+yD+"]",vD="(?:\\ud83c[\\udde6-\\uddff]){2}",TD="[\\ud800-\\udbff][\\udc00-\\udfff]",Fie="\\u200d",_D=Mie+"?",RD="["+Lie+"]?",jie="(?:"+Fie+"(?:"+[gD,vD,TD].join("|")+")"+RD+_D+")*",Gie=RD+_D+jie,Uie="(?:"+[gD+TT+"?",TT,vD,TD,qie].join("|")+")",Hie=RegExp(_T+"(?="+_T+")|"+Uie+Gie,"g");function Kie(t){return t.match(Hie)||[]}AD.exports=Kie});var CD=d((Eve,bD)=>{var Wie=mD(),Bie=vT(),Vie=SD();function zie(t){return Bie(t)?Vie(t):Wie(t)}bD.exports=zie});var ED=d((kve,PD)=>{var Yie=dD(),Xie=vT(),Jie=CD(),Qie=iv();function Zie(t){return function(e){e=Qie(e);var r=Xie(e)?Jie(e):void 0,n=r?r[0]:e.charAt(0),i=r?Yie(r,1).join(""):e.slice(1);return n[t]()+i}}PD.exports=Zie});var ND=d((Nve,kD)=>{var eae=ED(),tae=eae("toUpperCase");kD.exports=tae});var ID=d(Gs=>{"use strict";var Us=Gs&&Gs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Gs,"__esModule",{value:!0});Gs.genDts=void 0;var rae=Us(Rn()),nae=Us(Oe()),ep=Us(qt()),iae=Us(Pi()),aae=Us(pd()),$D=Us(ND());function oae(t,e){var r=[];return r=r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'),r=r.concat((0,rae.default)((0,ep.default)(t,function(n){return sae(n)}))),e.includeVisitorInterface&&(r=r.concat(fae(e.visitorInterfaceName,t))),r.join(`

`)+`
`}Gs.genDts=oae;function sae(t){var e=uae(t),r=lae(t);return[e,r]}function uae(t){var e=OD(t.name),r=RT(t.name);return"export interface ".concat(e,` extends CstNode {
  name: "`).concat(t.name,`";
  children: `).concat(r,`;
}`)}function lae(t){var e=RT(t.name);return"export type ".concat(e,` = {
  `).concat((0,ep.default)(t.properties,function(r){return cae(r)}).join(`
  `),`
};`)}function cae(t){var e=pae(t.type);return"".concat(t.name).concat(t.optional?"?":"",": ").concat(e,"[];")}function fae(t,e){return"export interface ".concat(t,`<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0,ep.default)(e,function(r){return dae(r)}).join(`
  `),`
}`)}function dae(t){var e=RT(t.name);return"".concat(t.name,"(children: ").concat(e,", param?: IN): OUT;")}function pae(t){if((0,nae.default)(t)){var e=(0,aae.default)((0,ep.default)(t,function(n){return wD(n)})),r=(0,iae.default)(e,function(n,i){return n+" | "+i});return"("+r+")"}else return wD(t)}function wD(t){return t.kind==="token"?"IToken":OD(t.name)}function OD(t){return(0,$D.default)(t)+"CstNode"}function RT(t){return(0,$D.default)(t)+"CstChildren"}});var DD=d(Hs=>{"use strict";var tp=Hs&&Hs.__assign||function(){return tp=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++){e=arguments[r];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t},tp.apply(this,arguments)};Object.defineProperty(Hs,"__esModule",{value:!0});Hs.generateCstDts=void 0;var hae=cD(),mae=ID(),yae={includeVisitorInterface:!0,visitorInterfaceName:"ICstNodeVisitor"};function gae(t,e){var r=tp(tp({},yae),e),n=(0,hae.buildModel)(t);return(0,mae.genDts)(n,r)}Hs.generateCstDts=gae});var LD=d(rp=>{"use strict";Object.defineProperty(rp,"__esModule",{value:!0});rp.createSyntaxDiagramsCode=void 0;var xD=Og();function vae(t,e){var r=e===void 0?{}:e,n=r.resourceBase,i=n===void 0?"https://unpkg.com/chevrotain@".concat(xD.VERSION,"/diagrams/"):n,a=r.css,o=a===void 0?"https://unpkg.com/chevrotain@".concat(xD.VERSION,"/diagrams/diagrams.css"):a,s=`
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
`;return s+u+l+c+f+m}rp.createSyntaxDiagramsCode=vae});var Za=d(U=>{"use strict";Object.defineProperty(U,"__esModule",{value:!0});U.Parser=U.createSyntaxDiagramsCode=U.clearCache=U.generateCstDts=U.GAstVisitor=U.serializeProduction=U.serializeGrammar=U.Terminal=U.Rule=U.RepetitionWithSeparator=U.RepetitionMandatoryWithSeparator=U.RepetitionMandatory=U.Repetition=U.Option=U.NonTerminal=U.Alternative=U.Alternation=U.defaultLexerErrorProvider=U.NoViableAltException=U.NotAllInputParsedException=U.MismatchedTokenException=U.isRecognitionException=U.EarlyExitException=U.defaultParserErrorProvider=U.LLkLookaheadStrategy=U.getLookaheadPaths=U.tokenName=U.tokenMatcher=U.tokenLabel=U.EOF=U.createTokenInstance=U.createToken=U.LexerDefinitionErrorType=U.Lexer=U.EMPTY_ALT=U.ParserDefinitionErrorType=U.EmbeddedActionsParser=U.CstParser=U.VERSION=void 0;var Tae=Og();Object.defineProperty(U,"VERSION",{enumerable:!0,get:function(){return Tae.VERSION}});var np=Rr();Object.defineProperty(U,"CstParser",{enumerable:!0,get:function(){return np.CstParser}});Object.defineProperty(U,"EmbeddedActionsParser",{enumerable:!0,get:function(){return np.EmbeddedActionsParser}});Object.defineProperty(U,"ParserDefinitionErrorType",{enumerable:!0,get:function(){return np.ParserDefinitionErrorType}});Object.defineProperty(U,"EMPTY_ALT",{enumerable:!0,get:function(){return np.EMPTY_ALT}});var qD=cl();Object.defineProperty(U,"Lexer",{enumerable:!0,get:function(){return qD.Lexer}});Object.defineProperty(U,"LexerDefinitionErrorType",{enumerable:!0,get:function(){return qD.LexerDefinitionErrorType}});var Ks=Wa();Object.defineProperty(U,"createToken",{enumerable:!0,get:function(){return Ks.createToken}});Object.defineProperty(U,"createTokenInstance",{enumerable:!0,get:function(){return Ks.createTokenInstance}});Object.defineProperty(U,"EOF",{enumerable:!0,get:function(){return Ks.EOF}});Object.defineProperty(U,"tokenLabel",{enumerable:!0,get:function(){return Ks.tokenLabel}});Object.defineProperty(U,"tokenMatcher",{enumerable:!0,get:function(){return Ks.tokenMatcher}});Object.defineProperty(U,"tokenName",{enumerable:!0,get:function(){return Ks.tokenName}});var _ae=Cs();Object.defineProperty(U,"getLookaheadPaths",{enumerable:!0,get:function(){return _ae.getLookaheadPaths}});var Rae=fT();Object.defineProperty(U,"LLkLookaheadStrategy",{enumerable:!0,get:function(){return Rae.LLkLookaheadStrategy}});var Aae=bs();Object.defineProperty(U,"defaultParserErrorProvider",{enumerable:!0,get:function(){return Aae.defaultParserErrorProvider}});var El=Es();Object.defineProperty(U,"EarlyExitException",{enumerable:!0,get:function(){return El.EarlyExitException}});Object.defineProperty(U,"isRecognitionException",{enumerable:!0,get:function(){return El.isRecognitionException}});Object.defineProperty(U,"MismatchedTokenException",{enumerable:!0,get:function(){return El.MismatchedTokenException}});Object.defineProperty(U,"NotAllInputParsedException",{enumerable:!0,get:function(){return El.NotAllInputParsedException}});Object.defineProperty(U,"NoViableAltException",{enumerable:!0,get:function(){return El.NoViableAltException}});var Sae=Fv();Object.defineProperty(U,"defaultLexerErrorProvider",{enumerable:!0,get:function(){return Sae.defaultLexerErrorProvider}});var ri=dt();Object.defineProperty(U,"Alternation",{enumerable:!0,get:function(){return ri.Alternation}});Object.defineProperty(U,"Alternative",{enumerable:!0,get:function(){return ri.Alternative}});Object.defineProperty(U,"NonTerminal",{enumerable:!0,get:function(){return ri.NonTerminal}});Object.defineProperty(U,"Option",{enumerable:!0,get:function(){return ri.Option}});Object.defineProperty(U,"Repetition",{enumerable:!0,get:function(){return ri.Repetition}});Object.defineProperty(U,"RepetitionMandatory",{enumerable:!0,get:function(){return ri.RepetitionMandatory}});Object.defineProperty(U,"RepetitionMandatoryWithSeparator",{enumerable:!0,get:function(){return ri.RepetitionMandatoryWithSeparator}});Object.defineProperty(U,"RepetitionWithSeparator",{enumerable:!0,get:function(){return ri.RepetitionWithSeparator}});Object.defineProperty(U,"Rule",{enumerable:!0,get:function(){return ri.Rule}});Object.defineProperty(U,"Terminal",{enumerable:!0,get:function(){return ri.Terminal}});var AT=dt();Object.defineProperty(U,"serializeGrammar",{enumerable:!0,get:function(){return AT.serializeGrammar}});Object.defineProperty(U,"serializeProduction",{enumerable:!0,get:function(){return AT.serializeProduction}});Object.defineProperty(U,"GAstVisitor",{enumerable:!0,get:function(){return AT.GAstVisitor}});var bae=DD();Object.defineProperty(U,"generateCstDts",{enumerable:!0,get:function(){return bae.generateCstDts}});function Cae(){console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)}U.clearCache=Cae;var Pae=LD();Object.defineProperty(U,"createSyntaxDiagramsCode",{enumerable:!0,get:function(){return Pae.createSyntaxDiagramsCode}});var Eae=function(){function t(){throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)}return t}();U.Parser=Eae});var HD=d(X=>{"use strict";var MD=X&&X.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(X,"__esModule",{value:!0});X.createATN=X.RuleTransition=X.EpsilonTransition=X.AtomTransition=X.AbstractTransition=X.ATN_LOOP_END=X.ATN_PLUS_LOOP_BACK=X.ATN_STAR_LOOP_ENTRY=X.ATN_STAR_LOOP_BACK=X.ATN_BLOCK_END=X.ATN_RULE_STOP=X.ATN_TOKEN_START=X.ATN_STAR_BLOCK_START=X.ATN_PLUS_BLOCK_START=X.ATN_RULE_START=X.ATN_BASIC=X.ATN_INVALID_TYPE=X.buildATNKey=void 0;var FD=MD(qt()),kae=MD(ll()),Ar=Za();function Nl(t,e,r){return`${t.name}_${e}_${r}`}X.buildATNKey=Nl;X.ATN_INVALID_TYPE=0;X.ATN_BASIC=1;X.ATN_RULE_START=2;X.ATN_PLUS_BLOCK_START=4;X.ATN_STAR_BLOCK_START=5;X.ATN_TOKEN_START=6;X.ATN_RULE_STOP=7;X.ATN_BLOCK_END=8;X.ATN_STAR_LOOP_BACK=9;X.ATN_STAR_LOOP_ENTRY=10;X.ATN_PLUS_LOOP_BACK=11;X.ATN_LOOP_END=12;var Ws=class{constructor(e){this.target=e}isEpsilon(){return!1}};X.AbstractTransition=Ws;var ip=class extends Ws{constructor(e,r){super(e),this.tokenType=r}};X.AtomTransition=ip;var ap=class extends Ws{constructor(e){super(e)}isEpsilon(){return!0}};X.EpsilonTransition=ap;var kl=class extends Ws{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};X.RuleTransition=kl;function Nae(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};wae(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],a=eo(e,i,i);a!==void 0&&Gae(e,i,a)}return e}X.createATN=Nae;function wae(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],a=jt(t,i,void 0,{type:X.ATN_RULE_START}),o=jt(t,i,void 0,{type:X.ATN_RULE_STOP});a.stop=o,t.ruleToStartState.set(i,a),t.ruleToStopState.set(i,o)}}function jD(t,e,r){return r instanceof Ar.Terminal?ST(t,e,r.terminalType,r):r instanceof Ar.NonTerminal?jae(t,e,r):r instanceof Ar.Alternation?xae(t,e,r):r instanceof Ar.Option?Lae(t,e,r):r instanceof Ar.Repetition?$ae(t,e,r):r instanceof Ar.RepetitionWithSeparator?Oae(t,e,r):r instanceof Ar.RepetitionMandatory?Iae(t,e,r):r instanceof Ar.RepetitionMandatoryWithSeparator?Dae(t,e,r):eo(t,e,r)}function $ae(t,e,r){let n=jt(t,e,r,{type:X.ATN_STAR_BLOCK_START});va(t,n);let i=Bs(t,e,n,r,eo(t,e,r));return UD(t,e,r,i)}function Oae(t,e,r){let n=jt(t,e,r,{type:X.ATN_STAR_BLOCK_START});va(t,n);let i=Bs(t,e,n,r,eo(t,e,r)),a=ST(t,e,r.separator,r);return UD(t,e,r,i,a)}function Iae(t,e,r){let n=jt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});va(t,n);let i=Bs(t,e,n,r,eo(t,e,r));return GD(t,e,r,i)}function Dae(t,e,r){let n=jt(t,e,r,{type:X.ATN_PLUS_BLOCK_START});va(t,n);let i=Bs(t,e,n,r,eo(t,e,r)),a=ST(t,e,r.separator,r);return GD(t,e,r,i,a)}function xae(t,e,r){let n=jt(t,e,r,{type:X.ATN_BASIC});va(t,n);let i=(0,FD.default)(r.definition,o=>jD(t,e,o));return Bs(t,e,n,r,...i)}function Lae(t,e,r){let n=jt(t,e,r,{type:X.ATN_BASIC});va(t,n);let i=Bs(t,e,n,r,eo(t,e,r));return qae(t,e,r,i)}function eo(t,e,r){let n=(0,kae.default)((0,FD.default)(r.definition,i=>jD(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:Fae(t,n)}function GD(t,e,r,n,i){let a=n.left,o=n.right,s=jt(t,e,r,{type:X.ATN_PLUS_LOOP_BACK});va(t,s);let u=jt(t,e,r,{type:X.ATN_LOOP_END});return a.loopback=s,u.loopback=s,t.decisionMap[Nl(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=s,bt(o,s),i===void 0?(bt(s,a),bt(s,u)):(bt(s,u),bt(s,i.left),bt(i.right,a)),{left:a,right:u}}function UD(t,e,r,n,i){let a=n.left,o=n.right,s=jt(t,e,r,{type:X.ATN_STAR_LOOP_ENTRY});va(t,s);let u=jt(t,e,r,{type:X.ATN_LOOP_END}),l=jt(t,e,r,{type:X.ATN_STAR_LOOP_BACK});return s.loopback=l,u.loopback=l,bt(s,a),bt(s,u),bt(o,l),i!==void 0?(bt(l,u),bt(l,i.left),bt(i.right,a)):bt(l,s),t.decisionMap[Nl(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=s,{left:s,right:u}}function qae(t,e,r,n){let i=n.left,a=n.right;return bt(i,a),t.decisionMap[Nl(e,"Option",r.idx)]=i,n}function va(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Bs(t,e,r,n,...i){let a=jt(t,e,n,{type:X.ATN_BLOCK_END,start:r});r.end=a;for(let s of i)s!==void 0?(bt(r,s.left),bt(s.right,a)):bt(r,a);let o={left:r,right:a};return t.decisionMap[Nl(e,Mae(n),n.idx)]=r,o}function Mae(t){if(t instanceof Ar.Alternation)return"Alternation";if(t instanceof Ar.Option)return"Option";if(t instanceof Ar.Repetition)return"Repetition";if(t instanceof Ar.RepetitionWithSeparator)return"RepetitionWithSeparator";if(t instanceof Ar.RepetitionMandatory)return"RepetitionMandatory";if(t instanceof Ar.RepetitionMandatoryWithSeparator)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function Fae(t,e){let r=e.length;for(let a=0;a<r-1;a++){let o=e[a],s;o.left.transitions.length===1&&(s=o.left.transitions[0]);let u=s instanceof kl,l=s,c=e[a+1].left;o.left.type===X.ATN_BASIC&&o.right.type===X.ATN_BASIC&&s!==void 0&&(u&&l.followState===o.right||s.target===o.right)?(u?l.followState=c:s.target=c,Uae(t,o.right)):bt(o.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function ST(t,e,r,n){let i=jt(t,e,n,{type:X.ATN_BASIC}),a=jt(t,e,n,{type:X.ATN_BASIC});return bT(i,new ip(a,r)),{left:i,right:a}}function jae(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),a=jt(t,e,r,{type:X.ATN_BASIC}),o=jt(t,e,r,{type:X.ATN_BASIC}),s=new kl(i,n,o);return bT(a,s),{left:a,right:o}}function Gae(t,e,r){let n=t.ruleToStartState.get(e);bt(n,r.left);let i=t.ruleToStopState.get(e);return bt(r.right,i),{left:n,right:i}}function bt(t,e){let r=new ap(e);bT(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function bT(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function Uae(t,e){t.states.splice(t.states.indexOf(e),1)}});var WD=d(ni=>{"use strict";var Hae=ni&&ni.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(ni,"__esModule",{value:!0});ni.getATNConfigKey=ni.ATNConfigSet=ni.DFA_ERROR=void 0;var Kae=Hae(qt());ni.DFA_ERROR={};var CT=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=KD(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return(0,Kae.default)(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};ni.ATNConfigSet=CT;function KD(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}ni.getATNConfigKey=KD});var VD=d((Lve,BD)=>{var Wae=cs();function Bae(t,e,r){for(var n=-1,i=t.length;++n<i;){var a=t[n],o=e(a);if(o!=null&&(s===void 0?o===o&&!Wae(o):r(o,s)))var s=o,u=a}return u}BD.exports=Bae});var YD=d((qve,zD)=>{function Vae(t,e){return t<e}zD.exports=Vae});var JD=d((Mve,XD)=>{var zae=VD(),Yae=YD(),Xae=ja();function Jae(t){return t&&t.length?zae(t,Xae,Yae):void 0}XD.exports=Jae});var ZD=d((Fve,QD)=>{var Qae=Vr(),Zae=_v();function eoe(t,e){return t&&t.length?Zae(t,Qae(e,2)):[]}QD.exports=eoe});var ox=d(Vs=>{"use strict";var _a=Vs&&Vs.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(Vs,"__esModule",{value:!0});Vs.LLStarLookaheadStrategy=void 0;var Or=Za(),Cn=HD(),Ta=WD(),toe=_a(JD()),roe=_a($d()),noe=_a(ZD()),wl=_a(qt()),ioe=_a(Rn()),PT=_a(Mt()),aoe=_a(Er()),ex=_a(Pi());function ooe(t,e){let r={};return n=>{let i=n.toString(),a=r[i];return a!==void 0||(a={atnStartState:t,decision:e,states:{}},r[i]=a),a}}var op=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},tx=new op,kT=class extends Or.LLkLookaheadStrategy{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=(0,Cn.createATN)(e.rules),this.dfas=soe(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Cn.buildATNKey)(n,"Alternation",r),c=this.atn.decisionMap[u].decision,f=(0,wl.default)((0,Or.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>(0,wl.default)(m,v=>v[0]));if(rx(f,!1)&&!a){let m=(0,ex.default)(f,(v,y,R)=>((0,PT.default)(y,P=>{P&&(v[P.tokenTypeIdx]=R,(0,PT.default)(P.categoryMatches,E=>{v[E]=R}))}),v),{});return i?function(v){var y;let R=this.LA(1),P=m[R.tokenTypeIdx];if(v!==void 0&&P!==void 0){let E=(y=v[P])===null||y===void 0?void 0:y.GATE;if(E!==void 0&&E.call(this)===!1)return}return P}:function(){let v=this.LA(1);return m[v.tokenTypeIdx]}}else return i?function(m){let v=new op,y=m===void 0?0:m.length;for(let P=0;P<y;P++){let E=m?.[P].GATE;v.set(P,E===void 0||E.call(this))}let R=ET.call(this,o,c,v,s);return typeof R=="number"?R:void 0}:function(){let m=ET.call(this,o,c,tx,s);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:a}=e,o=this.dfas,s=this.logging,u=(0,Cn.buildATNKey)(n,i,r),c=this.atn.decisionMap[u].decision,f=(0,wl.default)((0,Or.getLookaheadPaths)({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>(0,wl.default)(m,v=>v[0]));if(rx(f)&&f[0][0]&&!a){let m=f[0],v=(0,ioe.default)(m);if(v.length===1&&(0,aoe.default)(v[0].categoryMatches)){let R=v[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===R}}else{let y=(0,ex.default)(v,(R,P)=>(P!==void 0&&(R[P.tokenTypeIdx]=!0,(0,PT.default)(P.categoryMatches,E=>{R[E]=!0})),R),{});return function(){let R=this.LA(1);return y[R.tokenTypeIdx]===!0}}}return function(){let m=ET.call(this,o,c,tx,s);return typeof m=="object"?!1:m===0}}};Vs.LLStarLookaheadStrategy=kT;function rx(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let a of n){if(a===void 0){if(e)break;return!1}let o=[a.tokenTypeIdx].concat(a.categoryMatches);for(let s of o)if(r.has(s)){if(!i.has(s))return!1}else r.add(s),i.add(s)}}return!0}function soe(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=ooe(t.decisionStates[n],n);return r}function ET(t,e,r,n){let i=t[e](r),a=i.start;if(a===void 0){let s=voe(i.atnStartState);a=ax(i,ix(s)),i.start=a}return uoe.apply(this,[i,a,r,n])}function uoe(t,e,r,n){let i=e,a=1,o=[],s=this.LA(a++);for(;;){let u=hoe(i,s);if(u===void 0&&(u=loe.apply(this,[t,i,s,a,r,n])),u===Ta.DFA_ERROR)return poe(o,i,s);if(u.isAcceptState===!0)return u.prediction;i=u,o.push(s),s=this.LA(a++)}}function loe(t,e,r,n,i,a){let o=moe(e.configs,r,i);if(o.size===0)return nx(t,e,r,Ta.DFA_ERROR),Ta.DFA_ERROR;let s=ix(o),u=goe(o,i);if(u!==void 0)s.isAcceptState=!0,s.prediction=u,s.configs.uniqueAlt=u;else if(Aoe(o)){let l=(0,toe.default)(o.alts);s.isAcceptState=!0,s.prediction=l,s.configs.uniqueAlt=l,coe.apply(this,[t,n,o.alts,a])}return s=nx(t,e,r,s),s}function coe(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let a=t.atnStartState,o=a.rule,s=a.production,u=foe({topLevelRule:o,ambiguityIndices:r,production:s,prefixPath:i});n(u)}function foe(t){let e=(0,wl.default)(t.prefixPath,i=>(0,Or.tokenLabel)(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${doe(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function doe(t){if(t instanceof Or.NonTerminal)return"SUBRULE";if(t instanceof Or.Option)return"OPTION";if(t instanceof Or.Alternation)return"OR";if(t instanceof Or.RepetitionMandatory)return"AT_LEAST_ONE";if(t instanceof Or.RepetitionMandatoryWithSeparator)return"AT_LEAST_ONE_SEP";if(t instanceof Or.RepetitionWithSeparator)return"MANY_SEP";if(t instanceof Or.Repetition)return"MANY";if(t instanceof Or.Terminal)return"CONSUME";throw Error("non exhaustive match")}function poe(t,e,r){let n=(0,roe.default)(e.configs.elements,a=>a.state.transitions),i=(0,noe.default)(n.filter(a=>a instanceof Cn.AtomTransition).map(a=>a.tokenType),a=>a.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function hoe(t,e){return t.edges[e.tokenTypeIdx]}function moe(t,e,r){let n=new Ta.ATNConfigSet,i=[];for(let o of t.elements){if(r.is(o.alt)===!1)continue;if(o.state.type===Cn.ATN_RULE_STOP){i.push(o);continue}let s=o.state.transitions.length;for(let u=0;u<s;u++){let l=o.state.transitions[u],c=yoe(l,e);c!==void 0&&n.add({state:c,alt:o.alt,stack:o.stack})}}let a;if(i.length===0&&n.size===1&&(a=n),a===void 0){a=new Ta.ATNConfigSet;for(let o of n.elements)sp(o,a)}if(i.length>0&&!_oe(a))for(let o of i)a.add(o);return a}function yoe(t,e){if(t instanceof Cn.AtomTransition&&(0,Or.tokenMatcher)(e,t.tokenType))return t.target}function goe(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function ix(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function nx(t,e,r,n){return n=ax(t,n),e.edges[r.tokenTypeIdx]=n,n}function ax(t,e){if(e===Ta.DFA_ERROR)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function voe(t){let e=new Ta.ATNConfigSet,r=t.transitions.length;for(let n=0;n<r;n++){let a={state:t.transitions[n].target,alt:n,stack:[]};sp(a,e)}return e}function sp(t,e){let r=t.state;if(r.type===Cn.ATN_RULE_STOP){if(t.stack.length>0){let i=[...t.stack],o={state:i.pop(),alt:t.alt,stack:i};sp(o,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let a=r.transitions[i],o=Toe(t,a);o!==void 0&&sp(o,e)}}function Toe(t,e){if(e instanceof Cn.EpsilonTransition)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Cn.RuleTransition){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function _oe(t){for(let e of t.elements)if(e.state.type===Cn.ATN_RULE_STOP)return!0;return!1}function Roe(t){for(let e of t.elements)if(e.state.type!==Cn.ATN_RULE_STOP)return!1;return!0}function Aoe(t){if(Roe(t))return!0;let e=Soe(t.elements);return boe(e)&&!Coe(e)}function Soe(t){let e=new Map;for(let r of t){let n=(0,Ta.getATNConfigKey)(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function boe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function Coe(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}});var sx=d(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});up.LLStarLookaheadStrategy=void 0;var Poe=ox();Object.defineProperty(up,"LLStarLookaheadStrategy",{enumerable:!0,get:function(){return Poe.LLStarLookaheadStrategy}})});var cx=d(Jr=>{"use strict";Object.defineProperty(Jr,"__esModule",{value:!0});Jr.RootCstNodeImpl=Jr.CompositeCstNodeImpl=Jr.LeafCstNodeImpl=Jr.AbstractCstNode=Jr.CstNodeBuilder=void 0;var ux=_o(),Eoe=hr(),lx=Qe(),NT=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new lp(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new Il;return r.feature=e,r.root=this.rootNode,this.current.children.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Ol(e.startOffset,e.image.length,(0,lx.tokenToRange)(e),e.tokenType,!1);return n.feature=r,n.root=this.rootNode,this.current.children.push(n),n}removeNode(e){let r=e.parent;if(r){let n=r.children.indexOf(e);n>=0&&r.children.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.element=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.children.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Ol(r.startOffset,r.image.length,(0,lx.tokenToRange)(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let a=0;a<e.children.length;a++){let o=e.children[a],{offset:s,end:u}=o;if((0,Eoe.isCompositeCstNode)(o)&&n>s&&i<u){this.addHiddenToken(o,r);return}else if(i<=s){e.children.splice(a,0,r);return}}e.children.push(r)}};Jr.CstNodeBuilder=NT;var $l=class{get hidden(){return!1}get element(){var e,r;let n=typeof((e=this._element)===null||e===void 0?void 0:e.$type)=="string"?this._element:(r=this.parent)===null||r===void 0?void 0:r.element;if(!n)throw new Error("This node has no associated AST element");return n}set element(e){this._element=e}get text(){return this.root.fullText.substring(this.offset,this.end)}};Jr.AbstractCstNode=$l;var Ol=class extends $l{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,a=!1){super(),this._hidden=a,this._offset=e,this._tokenType=i,this._length=r,this._range=n}};Jr.LeafCstNodeImpl=Ol;var Il=class extends $l{constructor(){super(...arguments),this.children=new Dl(this)}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:ux.Position.create(0,0),end:ux.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.children)if(!e.hidden)return e;return this.children[0]}get lastNonHiddenNode(){for(let e=this.children.length-1;e>=0;e--){let r=this.children[e];if(!r.hidden)return r}return this.children[this.children.length-1]}};Jr.CompositeCstNodeImpl=Il;var Dl=class extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,Dl.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.parent=this.parent}},lp=class extends Il{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};Jr.RootCstNodeImpl=lp});var pp=d(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.LangiumCompletionParser=pr.LangiumParserErrorMessageProvider=pr.LangiumParser=pr.AbstractLangiumParser=pr.DatatypeSymbol=void 0;var fp=Za(),koe=sx(),cp=$e(),fx=kt(),dx=Ie(),Noe=cx();pr.DatatypeSymbol=Symbol("Datatype");function wT(t){return t.$type===pr.DatatypeSymbol}var px="\u200B",hx=t=>t.endsWith(px)?t:t+px,xl=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new IT(r,e.parser.ParserConfig)}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}};pr.AbstractLangiumParser=xl;var $T=class extends xl{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Noe.CstNodeBuilder,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:(0,fx.isDataTypeRule)(e)?pr.DatatypeSymbol:(0,fx.getTypeName)(e),i=this.wrapper.DEFINE_RULE(hx(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let a={$type:e};this.stack.push(a),e===pr.DatatypeSymbol&&(a.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let a=this.nodeBuilder.buildLeafNode(i,n),{assignment:o,isCrossRef:s}=this.getAssignment(n),u=this.current;if(o){let l=(0,cp.isKeyword)(n)?i.image:this.converter.convert(i.image,a);this.assign(o.operator,o.feature,l,a,s)}else if(wT(u)){let l=i.image;(0,cp.isKeyword)(n)||(l=this.converter.convert(l,a).toString()),u.value+=l}}}subrule(e,r,n,i){let a;this.isRecording()||(a=this.nodeBuilder.buildCompositeNode(n));let o=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&a&&a.length>0&&this.performSubruleAssignment(o,n,a)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:a}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,a);else if(!i){let o=this.current;if(wT(o))o.value+=e.toString();else{let s=e.$type,u=this.assignWithoutOverride(e,o);s&&(u.$type=s);let l=u;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let a=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(a)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return(0,dx.linkContentToContainer)(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),wT(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=(0,dx.getContainerOfType)(e,cp.isAssignment);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?(0,cp.isCrossReference)(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,a){let o=this.current,s;switch(a&&typeof n=="string"?s=this.linker.buildReference(o,r,i,n):s=n,e){case"=":{o[r]=s;break}case"?=":{o[r]=!0;break}case"+=":Array.isArray(o[r])||(o[r]=[]),o[r].push(s)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r))e[n]===void 0&&(e[n]=i);return e}get definitionErrors(){return this.wrapper.definitionErrors}};pr.LangiumParser=$T;var dp=class{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}buildNoViableAltMessage(e){return fp.defaultParserErrorProvider.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return fp.defaultParserErrorProvider.buildEarlyExitMessage(e)}};pr.LangiumParserErrorMessageProvider=dp;var OT=class extends xl{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(hx(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}};pr.LangiumCompletionParser=OT;var woe={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new dp},IT=class extends fp.EmbeddedActionsParser{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},woe),{lookaheadStrategy:n?new fp.LLkLookaheadStrategy({maxLookahead:r.maxLookahead}):new koe.LLStarLookaheadStrategy}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}}});var mx=d(zs=>{"use strict";Object.defineProperty(zs,"__esModule",{value:!0});zs.assertUnreachable=zs.ErrorWithLocation=void 0;var DT=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};zs.ErrorWithLocation=DT;function $oe(t){throw new Error("Error! The input value was not handled.")}zs.assertUnreachable=$oe});var LT=d(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});mp.createParser=void 0;var yx=Za(),Fe=$e(),Ll=mx(),Ooe=Dt(),gx=kt(),vx=Et();function Ioe(t,e,r){return Doe({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}mp.createParser=Ioe;function Doe(t,e){let r=(0,vx.getAllReachableRules)(e,!1),n=(0,Ooe.stream)(e.rules).filter(Fe.isParserRule).filter(i=>r.has(i));for(let i of n){let a=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});a.rules.set(i.name,t.parser.rule(i,to(a,i.definition)))}}function to(t,e,r=!1){let n;if((0,Fe.isKeyword)(e))n=Goe(t,e);else if((0,Fe.isAction)(e))n=xoe(t,e);else if((0,Fe.isAssignment)(e))n=to(t,e.terminal);else if((0,Fe.isCrossReference)(e))n=Tx(t,e);else if((0,Fe.isRuleCall)(e))n=Loe(t,e);else if((0,Fe.isAlternatives)(e))n=Moe(t,e);else if((0,Fe.isUnorderedGroup)(e))n=Foe(t,e);else if((0,Fe.isGroup)(e))n=joe(t,e);else throw new Ll.ErrorWithLocation(e.$cstNode,`Unexpected element type: ${e.$type}`);return _x(t,r?void 0:hp(e),n,e.cardinality)}function xoe(t,e){let r=(0,gx.getTypeName)(e);return()=>t.parser.action(r,e)}function Loe(t,e){let r=e.rule.ref;if((0,Fe.isParserRule)(r)){let n=t.subrule++,i=e.arguments.length>0?qoe(r,e.arguments):()=>({});return a=>t.parser.subrule(n,Rx(t,r),e,i(a))}else if((0,Fe.isTerminalRule)(r)){let n=t.consume++,i=xT(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)(0,Ll.assertUnreachable)(r);else throw new Ll.ErrorWithLocation(e.$cstNode,`Undefined rule type: ${e.$type}`)}function qoe(t,e){let r=e.map(n=>Li(n.value));return n=>{let i={};for(let a=0;a<r.length;a++){let o=t.parameters[a],s=r[a];i[o.name]=s(n)}return i}}function Li(t){if((0,Fe.isDisjunction)(t)){let e=Li(t.left),r=Li(t.right);return n=>e(n)||r(n)}else if((0,Fe.isConjunction)(t)){let e=Li(t.left),r=Li(t.right);return n=>e(n)&&r(n)}else if((0,Fe.isNegation)(t)){let e=Li(t.value);return r=>!e(r)}else if((0,Fe.isParameterReference)(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if((0,Fe.isLiteralCondition)(t)){let e=Boolean(t.true);return()=>e}(0,Ll.assertUnreachable)(t)}function Moe(t,e){if(e.elements.length===1)return to(t,e.elements[0]);{let r=[];for(let i of e.elements){let a={ALT:to(t,i,!0)},o=hp(i);o&&(a.GATE=Li(o)),r.push(a)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(a=>{let o={ALT:()=>a.ALT(i)},s=a.GATE;return s&&(o.GATE=()=>s(i)),o}))}}function Foe(t,e){if(e.elements.length===1)return to(t,e.elements[0]);let r=[];for(let s of e.elements){let u={ALT:to(t,s,!0)},l=hp(s);l&&(u.GATE=Li(l)),r.push(u)}let n=t.or++,i=(s,u)=>{let l=u.getRuleStack().join("-");return`uGroup_${s}_${l}`},a=s=>t.parser.alternatives(n,r.map((u,l)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(u.ALT(s),!f.isRecording()){let v=i(n,f);f.unorderedGroups.get(v)||f.unorderedGroups.set(v,[]);let y=f.unorderedGroups.get(v);typeof y?.[l]>"u"&&(y[l]=!0)}};let m=u.GATE;return m?c.GATE=()=>m(s):c.GATE=()=>{let v=f.unorderedGroups.get(i(n,f));return!v?.[l]},c})),o=_x(t,hp(e),a,"*");return s=>{o(s),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function joe(t,e){let r=e.elements.map(n=>to(t,n));return n=>r.forEach(i=>i(n))}function hp(t){if((0,Fe.isGroup)(t))return t.guardCondition}function Tx(t,e,r=e.terminal){if(r)if((0,Fe.isRuleCall)(r)&&(0,Fe.isParserRule)(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Rx(t,r.rule.ref),e,i)}else if((0,Fe.isRuleCall)(r)&&(0,Fe.isTerminalRule)(r.rule.ref)){let n=t.consume++,i=xT(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if((0,Fe.isKeyword)(r)){let n=t.consume++,i=xT(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=(0,vx.findNameAssignment)(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+(0,gx.getTypeName)(e.type.ref));return Tx(t,e,i)}}function Goe(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function _x(t,e,r,n){let i=e&&Li(e);if(!n)if(i){let a=t.or++;return o=>t.parser.alternatives(a,[{ALT:()=>r(o),GATE:()=>i(o)},{ALT:(0,yx.EMPTY_ALT)(),GATE:()=>!i(o)}])}else return r;if(n==="*"){let a=t.many++;return o=>t.parser.many(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else if(n==="+"){let a=t.many++;if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>t.parser.atLeastOne(a,{DEF:()=>r(s)}),GATE:()=>i(s)},{ALT:(0,yx.EMPTY_ALT)(),GATE:()=>!i(s)}])}else return o=>t.parser.atLeastOne(a,{DEF:()=>r(o)})}else if(n==="?"){let a=t.optional++;return o=>t.parser.optional(a,{DEF:()=>r(o),GATE:i?()=>i(o):void 0})}else(0,Ll.assertUnreachable)(n)}function Rx(t,e){let r=Uoe(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Uoe(t,e){if((0,Fe.isParserRule)(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!(0,Fe.isParserRule)(n);)((0,Fe.isGroup)(n)||(0,Fe.isAlternatives)(n)||(0,Fe.isUnorderedGroup)(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function xT(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}});var Ax=d(yp=>{"use strict";Object.defineProperty(yp,"__esModule",{value:!0});yp.createCompletionParser=void 0;var Hoe=pp(),Koe=LT();function Woe(t){let e=t.Grammar,r=t.parser.Lexer,n=new Hoe.LangiumCompletionParser(t);return(0,Koe.createParser)(e,n,r.definition),n.finalize(),n}yp.createCompletionParser=Woe});var qT=d(Ys=>{"use strict";Object.defineProperty(Ys,"__esModule",{value:!0});Ys.prepareLangiumParser=Ys.createLangiumParser=void 0;var Boe=pp(),Voe=LT();function zoe(t){let e=Sx(t);return e.finalize(),e}Ys.createLangiumParser=zoe;function Sx(t){let e=t.Grammar,r=t.parser.Lexer,n=new Boe.LangiumParser(t);return(0,Voe.createParser)(e,n,r.definition)}Ys.prepareLangiumParser=Sx});var jT=d(vp=>{"use strict";Object.defineProperty(vp,"__esModule",{value:!0});vp.DefaultTokenBuilder=void 0;var Yoe=Za(),MT=$e(),Xoe=kt(),Joe=Ie(),Qoe=Et(),gp=Lo(),Zoe=Dt(),FT=class{buildTokens(e,r){let n=(0,Zoe.stream)((0,Qoe.getAllReachableRules)(e,!1)),i=this.buildTerminalTokens(n),a=this.buildKeywordTokens(n,i,r);return i.forEach(o=>{let s=o.PATTERN;typeof s=="object"&&s&&"test"in s&&(0,gp.isWhitespaceRegExp)(s)?a.unshift(o):a.push(o)}),a}buildTerminalTokens(e){return e.filter(MT.isTerminalRule).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=(0,Xoe.terminalRegex)(e),n={name:e.name,PATTERN:new RegExp(r)};return e.hidden&&(n.GROUP=(0,gp.isWhitespaceRegExp)(r)?Yoe.Lexer.SKIPPED:"hidden"),n}buildKeywordTokens(e,r,n){return e.filter(MT.isParserRule).flatMap(i=>(0,Joe.streamAllContents)(i).filter(MT.isKeyword)).distinct(i=>i.value).toArray().sort((i,a)=>a.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,Boolean(n?.caseInsensitive)))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp((0,gp.getCaseInsensitivePattern)(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let a=i?.PATTERN;return a?.source&&(0,gp.partialMatches)("^"+a.source+"$",e.value)&&n.push(i),n},[])}};vp.DefaultTokenBuilder=FT});var HT=d(Gt=>{"use strict";Object.defineProperty(Gt,"__esModule",{value:!0});Gt.convertBoolean=Gt.convertNumber=Gt.convertDate=Gt.convertBigint=Gt.convertInt=Gt.convertID=Gt.convertString=Gt.DefaultValueConverter=void 0;var bx=$e(),ese=kt(),tse=Et(),GT=class{convert(e,r){let n=r.feature;if((0,bx.isCrossReference)(n)&&(n=(0,tse.getCrossReferenceTerminal)(n)),(0,bx.isRuleCall)(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Px(r);case"STRING":return UT(r);case"ID":return Cx(r);case"REGEXLITERAL":return UT(r)}switch((i=(0,ese.getRuleType)(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Nx(r);case"boolean":return wx(r);case"bigint":return Ex(r);case"date":return kx(r);default:return r}}};Gt.DefaultValueConverter=GT;function UT(t){return t.substring(1,t.length-1)}Gt.convertString=UT;function Cx(t){return t.charAt(0)==="^"?t.substring(1):t}Gt.convertID=Cx;function Px(t){return parseInt(t)}Gt.convertInt=Px;function Ex(t){return BigInt(t)}Gt.convertBigint=Ex;function kx(t){return new Date(t)}Gt.convertDate=kx;function Nx(t){return Number(t)}Gt.convertNumber=Nx;function wx(t){return t.toLowerCase()==="true"}Gt.convertBoolean=wx});var BT=d(_p=>{"use strict";Object.defineProperty(_p,"__esModule",{value:!0});_p.DefaultLinker=void 0;var rse=qe(),Xs=hr(),Tp=Ie(),nse=jr(),KT=na(),WT=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=rse.CancellationToken.None){for(let n of(0,Tp.streamAst)(e.parseResult.value))await(0,nse.interruptAndCheck)(r),(0,Tp.streamReferences)(n).forEach(i=>this.doLink(i,e));e.state=KT.DocumentState.Linked}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if((0,Xs.isLinkingError)(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let a=this.loadAstNode(i);n._ref=a??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let a=this,o={$refNode:n,$refText:i,get ref(){var s;if((0,Xs.isAstNode)(this._ref))return this._ref;if((0,Xs.isAstNodeDescription)(this._nodeDescription)){let u=a.loadAstNode(this._nodeDescription);this._ref=u??a.createLinkingError({reference:o,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let u=a.getLinkedNode({reference:o,container:e,property:r});if(u.error&&(0,Tp.getDocument)(e).state<KT.DocumentState.ComputedScopes)return;this._ref=(s=u.node)!==null&&s!==void 0?s:u.error,this._nodeDescription=u.descr}return(0,Xs.isAstNode)(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return(0,Xs.isLinkingError)(this._ref)?this._ref:void 0}};return o}getLinkedNode(e){try{let r=this.getCandidate(e);if((0,Xs.isLinkingError)(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=(0,Tp.getDocument)(e.container);n.state<KT.DocumentState.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};_p.DefaultLinker=WT});var YT=d(Rp=>{"use strict";Object.defineProperty(Rp,"__esModule",{value:!0});Rp.DefaultJsonSerializer=void 0;var VT=hr();function $x(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var zT=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}serialize(e,r){return JSON.stringify(e,(n,i)=>this.replacer(n,i,r?.refText),r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,n){var i,a;if(!this.ignoreProperties.has(e)){if((0,VT.isReference)(r)){let o=r.ref,s=n?r.$refText:void 0;return o?{$refText:s,$ref:"#"+(o&&this.astNodeLocator.getAstNodePath(o))}:{$refText:s,$error:(a=(i=r.error)===null||i===void 0?void 0:i.message)!==null&&a!==void 0?a:"Could not resolve reference"}}return r}}linkNode(e,r,n,i,a){for(let[s,u]of Object.entries(e))if(Array.isArray(u))for(let l=0;l<u.length;l++){let c=u[l];$x(c)?u[l]=this.reviveReference(e,s,r,c):(0,VT.isAstNode)(c)&&this.linkNode(c,r,e,s,l)}else $x(u)?e[s]=this.reviveReference(e,s,r,u):(0,VT.isAstNode)(u)&&this.linkNode(u,r,e,s);let o=e;o.$container=n,o.$containerProperty=i,o.$containerIndex=a}reviveReference(e,r,n,i){let a=i.$refText;if(i.$ref){let o=this.getRefNode(n,i.$ref);return a||(a=this.nameProvider.getName(o)),{$refText:a??"",ref:o}}else if(i.$error){let o={$refText:a??""};return o.error={container:e,property:r,message:i.$error,reference:o},o}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};Rp.DefaultJsonSerializer=zT});var JT=d(Ap=>{"use strict";Object.defineProperty(Ap,"__esModule",{value:!0});Ap.DefaultServiceRegistry=void 0;var ise=qn(),XT=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ise.Utils.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};Ap.DefaultServiceRegistry=XT});var ZT=d(Sp=>{"use strict";Object.defineProperty(Sp,"__esModule",{value:!0});Sp.ValidationRegistry=void 0;var ase=Pr(),ose=jr(),QT=class{constructor(e){this.validationChecks=new ase.MultiMap,this.reflection=e.shared.AstReflection}register(e,r=this){for(let[n,i]of Object.entries(e)){let a=i;if(Array.isArray(a))for(let o of a)this.doRegister(n,this.wrapValidationException(o,r));else typeof a=="function"&&this.doRegister(n,this.wrapValidationException(a,r))}}wrapValidationException(e,r){return async(n,i,a)=>{try{await e.call(r,n,i,a)}catch(o){if((0,ose.isOperationCancelled)(o))throw o;console.error("An error occurred during validation:",o);let s=o instanceof Error?o.message:String(o);o instanceof Error&&o.stack&&console.error(o.stack),i("error","An error occurred during validation: "+s,{node:n})}}}doRegister(e,r){for(let n of this.reflection.getAllTypes())this.reflection.isSubtype(n,e)&&this.validationChecks.add(n,r)}getChecks(e){return this.validationChecks.get(e)}};Sp.ValidationRegistry=QT});var r_=d(Js=>{"use strict";Object.defineProperty(Js,"__esModule",{value:!0});Js.DefaultReferenceDescriptionProvider=Js.DefaultAstNodeDescriptionProvider=void 0;var sse=qe(),use=hr(),bp=Ie(),lse=Qe(),cse=jr(),fse=_i(),e_=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator}createDescription(e,r,n=(0,bp.getDocument)(e)){return{node:e,name:r,type:e.$type,documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};Js.DefaultAstNodeDescriptionProvider=e_;var t_=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=sse.CancellationToken.None){let n=[],i=e.parseResult.value;for(let a of(0,bp.streamAst)(i))await(0,cse.interruptAndCheck)(r),(0,bp.streamReferences)(a).filter(o=>!(0,use.isLinkingError)(o)).forEach(o=>{let s=this.createDescription(o);s&&n.push(s)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=(0,bp.getDocument)(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:(0,lse.toDocumentSegment)(n),local:(0,fse.equalURI)(r.documentUri,i)}}};Js.DefaultReferenceDescriptionProvider=t_});var Ox=d(Cp=>{"use strict";Object.defineProperty(Cp,"__esModule",{value:!0});Cp.DefaultAstNodeLocator=void 0;var n_=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,a)=>{if(!i||a.length===0)return i;let o=a.indexOf(this.indexSeparator);if(o>0){let s=a.substring(0,o),u=parseInt(a.substring(o+1)),l=i[s];return l?.[u]}return i[a]},e)}};Cp.DefaultAstNodeLocator=n_});var a_=d(Pp=>{"use strict";Object.defineProperty(Pp,"__esModule",{value:!0});Pp.DefaultConfigurationProvider=void 0;var dse=yt(),i_=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(dse.DidChangeConfigurationNotification.type,{section:i.map(a=>this.toSectionName(a.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,a)=>{this.updateSectionConfiguration(i.section,n[a])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};Pp.DefaultConfigurationProvider=i_});var u_=d(kp=>{"use strict";Object.defineProperty(kp,"__esModule",{value:!0});kp.DefaultDocumentBuilder=void 0;var Ep=qe(),pse=Pr(),o_=jr(),ii=na(),s_=class{constructor(e){this.updateListeners=[],this.buildPhaseListeners=new pse.MultiMap,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Ep.CancellationToken.None){await this.buildDocuments(e,r,n)}async update(e,r,n=Ep.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s);this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s);for(let s of this.updateListeners)s(e,r);await(0,o_.interruptAndCheck)(n);let i=e.map(s=>this.langiumDocuments.getOrCreateDocument(s)),a=this.collectDocuments(i,r),o={validationChecks:"all"};await this.buildDocuments(a,o,n)}onUpdate(e){return this.updateListeners.push(e),Ep.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}collectDocuments(e,r){let n=e.map(o=>o.uri).concat(r),i=this.indexManager.getAffectedDocuments(n).toArray();i.forEach(o=>{this.serviceRegistry.getServices(o.uri).references.Linker.unlink(o),o.state=Math.min(o.state,ii.DocumentState.ComputedScopes)});let a=new Set([...e,...i,...this.langiumDocuments.all.filter(o=>o.state<ii.DocumentState.Validated)]);return Array.from(a)}async buildDocuments(e,r,n){await this.runCancelable(e,ii.DocumentState.Parsed,n,a=>this.langiumDocumentFactory.update(a)),await this.runCancelable(e,ii.DocumentState.IndexedContent,n,a=>this.indexManager.updateContent(a,n)),await this.runCancelable(e,ii.DocumentState.ComputedScopes,n,a=>this.computeScopes(a,n)),await this.runCancelable(e,ii.DocumentState.Linked,n,a=>this.serviceRegistry.getServices(a.uri).references.Linker.link(a,n)),await this.runCancelable(e,ii.DocumentState.IndexedReferences,n,a=>this.indexManager.updateReferences(a,n));let i=e.filter(a=>this.shouldValidate(a,r));await this.runCancelable(i,ii.DocumentState.Validated,n,a=>this.validate(a,n))}async runCancelable(e,r,n,i){let a=e.filter(o=>o.state<r);for(let o of a)await(0,o_.interruptAndCheck)(n),await i(o);await this.notifyBuildPhase(a,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Ep.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let a of i)await(0,o_.interruptAndCheck)(n),await a(e,n)}async computeScopes(e,r){let n=this.serviceRegistry.getServices(e.uri).references.ScopeComputation;e.precomputedScopes=await n.computeLocalScopes(e,r),e.state=ii.DocumentState.ComputedScopes}shouldValidate(e,r){return r.validationChecks==="all"}async validate(e,r){let i=await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e,r);e.diagnostics=i,e.state=ii.DocumentState.Validated}};kp.DefaultDocumentBuilder=s_});var d_=d(Np=>{"use strict";Object.defineProperty(Np,"__esModule",{value:!0});Np.DefaultIndexManager=void 0;var Ix=qe(),hse=Ie(),l_=Dt(),c_=_i(),Dx=na(),f_=class{constructor(e){this.simpleIndex=new Map,this.referenceIndex=new Map,this.globalScopeCache=new Map,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection,this.langiumDocuments=()=>e.workspace.LangiumDocuments}findAllReferences(e,r){let n=(0,hse.getDocument)(e).uri,i=[];return this.referenceIndex.forEach(a=>{a.forEach(o=>{(0,c_.equalURI)(o.targetUri,n)&&o.targetPath===r&&i.push(o)})}),(0,l_.stream)(i)}allElements(e=""){this.globalScopeCache.has("")||this.globalScopeCache.set("",Array.from(this.simpleIndex.values()).flat());let r=this.globalScopeCache.get(e);if(r)return(0,l_.stream)(r);{let n=this.globalScopeCache.get("").filter(i=>this.astReflection.isSubtype(i.type,e));return this.globalScopeCache.set(e,n),(0,l_.stream)(n)}}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.referenceIndex.delete(n),this.globalScopeCache.clear()}}async updateContent(e,r=Ix.CancellationToken.None){this.globalScopeCache.clear();let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let a of i)a.node=void 0;this.simpleIndex.set(e.uri.toString(),i),e.state=Dx.DocumentState.IndexedContent}async updateReferences(e,r=Ix.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i),e.state=Dx.DocumentState.IndexedReferences}getAffectedDocuments(e){return this.langiumDocuments().all.filter(r=>{if(e.some(n=>(0,c_.equalURI)(r.uri,n)))return!1;for(let n of e)if(this.isAffected(r,n))return!0;return!1})}isAffected(e,r){let n=r.toString(),i=e.uri.toString();if(e.references.some(o=>o.error!==void 0))return!0;let a=this.referenceIndex.get(i);return a?a.filter(o=>!o.local).some(o=>(0,c_.equalURI)(o.targetUri,n)):!1}};Np.DefaultIndexManager=f_});var m_=d(wp=>{"use strict";Object.defineProperty(wp,"__esModule",{value:!0});wp.DefaultWorkspaceManager=void 0;var mse=qe(),p_=qn(),yse=jr(),h_=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=mse.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(o=>o.LanguageMetaData.fileExtensions),i=[],a=o=>{i.push(o),this.langiumDocuments.hasDocument(o.uri)||this.langiumDocuments.addDocument(o)};await this.loadAdditionalDocuments(e,a),await Promise.all(e.map(o=>[o,this.getRootFolder(o)]).map(async o=>this.traverseFolder(...o,n,a))),await(0,yse.interruptAndCheck)(r),await this.documentBuilder.build(i,void 0,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return p_.URI.parse(e.uri)}async traverseFolder(e,r,n,i){let a=await this.fileSystemProvider.readDirectory(r);await Promise.all(a.map(async o=>{if(this.includeEntry(e,o,n)){if(o.isDirectory)await this.traverseFolder(e,o.uri,n,i);else if(o.isFile){let s=this.langiumDocuments.getOrCreateDocument(o.uri);i(s)}}}))}includeEntry(e,r,n){let i=p_.Utils.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let a=p_.Utils.extname(r.uri);return n.includes(a)}return!1}};wp.DefaultWorkspaceManager=h_});var T_=d(ai=>{"use strict";Object.defineProperty(ai,"__esModule",{value:!0});ai.isTokenTypeDictionary=ai.isIMultiModeLexerDefinition=ai.isTokenTypeArray=ai.DefaultLexer=void 0;var gse=Za(),y_=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=g_(r)?Object.values(r):r;this.chevrotainLexer=new gse.Lexer(n)}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(g_(e))return e;let r=v_(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};ai.DefaultLexer=y_;function xx(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}ai.isTokenTypeArray=xx;function v_(t){return t&&"modes"in t&&"defaultMode"in t}ai.isIMultiModeLexerDefinition=v_;function g_(t){return!xx(t)&&!v_(t)}ai.isTokenTypeDictionary=g_});var Of=d(Qs=>{"use strict";Object.defineProperty(Qs,"__esModule",{value:!0});Qs.createDefaultSharedModule=Qs.createDefaultModule=void 0;var vse=qe(),Tse=km(),_se=gb(),Rse=Ax(),Ase=Vy(),Sse=Yy(),bse=Jy(),Cse=ef(),Pse=eg(),Ese=rg(),kse=cg(),Nse=dg(),wse=hg(),$se=qT(),Ose=jT(),Ise=HT(),Dse=BT(),xse=xo(),Lse=jy(),qse=Vc(),Mse=Yc(),Fse=YT(),jse=JT(),Gse=jr(),Use=Qc(),Hse=ZT(),Lx=r_(),Kse=Ox(),Wse=a_(),Bse=u_(),qx=na(),Vse=d_(),zse=m_(),Yse=T_();function Xse(t){return{parser:{GrammarConfig:e=>(0,_se.createGrammarConfig)(e),LangiumParser:e=>(0,$se.createLangiumParser)(e),CompletionParser:e=>(0,Rse.createCompletionParser)(e),ValueConverter:()=>new Ise.DefaultValueConverter,TokenBuilder:()=>new Ose.DefaultTokenBuilder,Lexer:e=>new Yse.DefaultLexer(e)},lsp:{CompletionProvider:e=>new Ase.DefaultCompletionProvider(e),DocumentSymbolProvider:e=>new bse.DefaultDocumentSymbolProvider(e),HoverProvider:e=>new Ese.MultilineCommentHoverProvider(e),FoldingRangeProvider:e=>new Cse.DefaultFoldingRangeProvider(e),ReferencesProvider:e=>new Nse.DefaultReferencesProvider(e),DefinitionProvider:e=>new Pse.DefaultDefinitionProvider(e),DocumentHighlightProvider:e=>new Sse.DefaultDocumentHighlightProvider(e),RenameProvider:e=>new wse.DefaultRenameProvider(e)},workspace:{AstNodeLocator:()=>new Kse.DefaultAstNodeLocator,AstNodeDescriptionProvider:e=>new Lx.DefaultAstNodeDescriptionProvider(e),ReferenceDescriptionProvider:e=>new Lx.DefaultReferenceDescriptionProvider(e)},references:{Linker:e=>new Dse.DefaultLinker(e),NameProvider:()=>new xse.DefaultNameProvider,ScopeProvider:e=>new Mse.DefaultScopeProvider(e),ScopeComputation:e=>new qse.DefaultScopeComputation(e),References:e=>new Lse.DefaultReferences(e)},serializer:{JsonSerializer:e=>new Fse.DefaultJsonSerializer(e)},validation:{DocumentValidator:e=>new Use.DefaultDocumentValidator(e),ValidationRegistry:e=>new Hse.ValidationRegistry(e)},shared:()=>t.shared}}Qs.createDefaultModule=Xse;function Jse(t){return{ServiceRegistry:()=>new jse.DefaultServiceRegistry,lsp:{Connection:()=>t.connection,LanguageServer:e=>new kse.DefaultLanguageServer(e)},workspace:{LangiumDocuments:e=>new qx.DefaultLangiumDocuments(e),LangiumDocumentFactory:e=>new qx.DefaultLangiumDocumentFactory(e),DocumentBuilder:e=>new Bse.DefaultDocumentBuilder(e),TextDocuments:()=>new vse.TextDocuments(Tse.TextDocument),IndexManager:e=>new Vse.DefaultIndexManager(e),WorkspaceManager:e=>new zse.DefaultWorkspaceManager(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Gse.MutexLock,ConfigurationProvider:e=>new Wse.DefaultConfigurationProvider(e)}}}Qs.createDefaultSharedModule=Jse});var __=d(Ir=>{"use strict";Object.defineProperty(Ir,"__esModule",{value:!0});Ir.findIndentation=Ir.SNLE=Ir.expandToString=Ir.expandToStringWithNL=void 0;var ql=Oo();function Qse(t,...e){return Mx(t,...e)+ql.EOL}Ir.expandToStringWithNL=Qse;function Mx(t,...e){let r=e.reduce((o,s,u)=>{var l;return o+(s===void 0?Ir.SNLE:tue((0,ql.toString)(s),o))+((l=t[u+1])!==null&&l!==void 0?l:"")},t[0]).split(ql.EOL).filter(o=>o.trim()!==Ir.SNLE).map(o=>o.replace(Ir.SNLE,"").trimRight());r=r.length>1&&r[0].trim().length===0?r.slice(1):r,r=r.length!==0&&r[r.length-1].trimRight().length===0?r.slice(0,r.length-1):r;let a=Fx(r);return r.map(o=>o.slice(a).trimRight()).join(`
`)}Ir.expandToString=Mx;Ir.SNLE=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__");var Zse=new RegExp(ql.EOL,"g"),eue=/\S|$/;function tue(t,e){let r=Math.max(0,e.length-e.lastIndexOf(`
`)-1),n=" ".repeat(r);return t.replace(Zse,ql.EOL+n)}function Fx(t){let e=t.filter(n=>n.length>0).map(n=>n.search(eue)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}Ir.findIndentation=Fx});var Gx=d(Zs=>{"use strict";Object.defineProperty(Zs,"__esModule",{value:!0});Zs.joinToNode=Zs.expandToNode=void 0;var qi=Oo(),rue=__(),$p=Object.freeze(new qi.NewLineNode),jx=Object.freeze(new qi.CompositeGeneratorNode);function nue(t,...e){let r=iue(t),n=aue(t,e,r);return oue(n)}Zs.expandToNode=nue;function iue(t){let e=t.join("_").split(qi.EOL),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(o=>o.length!==0);let a=(0,rue.findIndentation)(i);return{indentation:a,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<a||!e[e.length-1].startsWith(i[0].substring(0,a)))}}}function aue(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:a}){let o=[];t.forEach((l,c)=>{o.push(...l.split(qi.EOL).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,v)=>v===0?n?[]:[m]:v===1&&f.length===0?[m]:f.concat($p,m):(f,m,v)=>v===0?[m]:f.concat($p,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat((0,qi.isGeneratorNode)(e[c])?e[c]:e[c]!==void 0?new qi.CompositeGeneratorNode(String(e[c])):c<e.length?jx:[]))});let s=o.length,u=s!==0?o[s-1]:void 0;return(i||a)&&typeof u=="string"&&u.trim().length===0?n&&s!==1&&o[s-2]===$p?o.slice(0,s-2):o.slice(0,s-1):o}function oue(t){return t.reduce((r,n,i)=>n===jx?r:n===$p?{indent:"",node:i===0||(0,qi.isNewLineNode)(t[i-1])||typeof t[i-1]=="string"?r.node.appendNewLine():r.node.appendNewLineIfNotEmpty()}:(()=>({indent:r.indent===""&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimLeft().length):r.indent,node:r.indent.length===0?r.node.append(n):r.node.indent(o=>o.append(n),r.indent)}))(),{indent:"",node:new qi.CompositeGeneratorNode}).node}function sue(t,e=String,{prefix:r,suffix:n,appendNewLineIfNotEmpty:i}={}){return uue(t,(a,o,s,u)=>(a??(a=new qi.CompositeGeneratorNode),a.append(r&&r(o,s,u)).append(e(o,s,u)).append(n&&n(o,s,u)).appendNewLineIfNotEmptyIf(!a.isEmpty()&&!!i)))}Zs.joinToNode=sue;function uue(t,e,r){let n=t[Symbol.iterator](),i=n.next(),a=0,o=r;for(;!i.done;){let s=n.next();o=e(o,i.value,a,Boolean(s.done)),i=s,a++}return o}});var Hx=d(Ux=>{"use strict";Object.defineProperty(Ux,"__esModule",{value:!0})});var Wx=d(Kx=>{"use strict";Object.defineProperty(Kx,"__esModule",{value:!0})});var Vx=d(Bx=>{"use strict";Object.defineProperty(Bx,"__esModule",{value:!0})});var ro=d(Z=>{"use strict";var zx=Z&&Z.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),lue=Z&&Z.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),ce=Z&&Z.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&zx(e,t,r)},cue=Z&&Z.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var r in t)r!=="default"&&Object.prototype.hasOwnProperty.call(t,r)&&zx(e,t,r);return lue(e,t),e};Object.defineProperty(Z,"__esModule",{value:!0});Z.GrammarAST=Z.expandToStringWithNL=Z.expandToString=void 0;ce(Of(),Z);ce(Nu(),Z);ce(Oo(),Z);ce(Gx(),Z);var Yx=__();Object.defineProperty(Z,"expandToString",{enumerable:!0,get:function(){return Yx.expandToString}});Object.defineProperty(Z,"expandToStringWithNL",{enumerable:!0,get:function(){return Yx.expandToStringWithNL}});ce(uy(),Z);ce(Eg(),Z);ce(Hx(),Z);ce(yg(),Z);ce(pp(),Z);ce(qT(),Z);ce(Wx(),Z);ce(jT(),Z);ce(HT(),Z);ce(T_(),Z);ce(BT(),Z);ce(xo(),Z);ce(Vc(),Z);ce(Yc(),Z);ce(YT(),Z);ce(JT(),Z);ce(Vx(),Z);ce(hr(),Z);ce(Ie(),Z);ce(Pr(),Z);ce(Qe(),Z);ce(Et(),Z);ce(jr(),Z);ce(_i(),Z);ce(Lo(),Z);ce(Dt(),Z);ce(Qc(),Z);ce(ZT(),Z);ce(r_(),Z);ce(u_(),Z);ce(na(),Z);ce(d_(),Z);ce(kg(),Z);ce(m_(),Z);ce(a_(),Z);var fue=cue($e());Z.GrammarAST=fue});var Jx=d((hTe,Xx)=>{"use strict";Xx.exports=qe()});var R_=d(p=>{"use strict";Object.defineProperty(p,"__esModule",{value:!0});p.isASTCut=p.ASTCut=p.isASTCreationParameterType=p.ASTCreationParameterType=p.isASTCreationParameters=p.ASTCreationParameters=p.isASTCreationParameter=p.ASTCreationParameter=p.isASTCreate=p.ASTCreate=p.isASTConstantValue=p.ASTConstantValue=p.isASTAtFor=p.ASTAtFor=p.isASTAt=p.ASTAt=p.isASTAssertions=p.ASTAssertions=p.isASTAssertion=p.ASTAssertion=p.isASTAlterSpeed=p.ASTAlterSpeed=p.isASTAlter=p.ASTAlter=p.isASTAllPlanes=p.ASTAllPlanes=p.isASTAllPlaneFrom=p.ASTAllPlaneFrom=p.isASTValue=p.ASTValue=p.isASTTimeScope=p.ASTTimeScope=p.isASTTarget=p.ASTTarget=p.isASTReplayTarget=p.ASTReplayTarget=p.isASTRange=p.ASTRange=p.isASTParameter=p.ASTParameter=p.isASTNumberOffset=p.ASTNumberOffset=p.isASTNumber=p.ASTNumber=p.isASTList=p.ASTList=p.isASTInstruction=p.ASTInstruction=p.isASTDeclaration=p.ASTDeclaration=void 0;p.isASTRightShift=p.ASTRightShift=p.isASTReplay=p.ASTReplay=p.isASTRecordingValue=p.ASTRecordingValue=p.isASTRecordingParameterType=p.ASTRecordingParameterType=p.isASTRangeDeclaration=p.ASTRangeDeclaration=p.isASTPlaneFrom=p.ASTPlaneFrom=p.isASTPlane=p.ASTPlane=p.isASTParamOffset=p.ASTParamOffset=p.isASTParamNoise=p.ASTParamNoise=p.isASTParameterType=p.ASTParameterType=p.isASTParameters=p.ASTParameters=p.isASTParamEdit=p.ASTParamEdit=p.isASTParamDrift=p.ASTParamDrift=p.isASTOffsetList=p.ASTOffsetList=p.isASTListDeclaration=p.ASTListDeclaration=p.isASTLeftShift=p.ASTLeftShift=p.isASTIntegerValue=p.ASTIntegerValue=p.isASTIntegerRange=p.ASTIntegerRange=p.isASTHideParameter=p.ASTHideParameter=p.isASTHide=p.ASTHide=p.isASTFilters=p.ASTFilters=p.isASTDoubleValue=p.ASTDoubleValue=p.isASTDoubleRange=p.ASTDoubleRange=p.isASTDelayParameter=p.ASTDelayParameter=p.isASTDelay=p.ASTDelay=void 0;p.reflection=p.FditscenarioAstReflection=p.isASTWindow=p.ASTWindow=p.isASTWayPoints=p.ASTWayPoints=p.isASTWayPoint=p.ASTWayPoint=p.isASTVariableValue=p.ASTVariableValue=p.isASTTrigger=p.ASTTrigger=p.isASTTrajectory=p.ASTTrajectory=p.isASTTime=p.ASTTime=p.isASTStringValue=p.ASTStringValue=p.isASTStringList=p.ASTStringList=p.isASTSpeedParameterType=p.ASTSpeedParameterType=p.isASTSpeedParameters=p.ASTSpeedParameters=p.isASTSpeedParameter=p.ASTSpeedParameter=p.isASTScenario=p.ASTScenario=p.isASTSaturationParameterType=p.ASTSaturationParameterType=p.isASTSaturationParameters=p.ASTSaturationParameters=p.isASTSaturationParameter=p.ASTSaturationParameter=p.isASTSaturate=p.ASTSaturate=p.isASTRotateParameter=p.ASTRotateParameter=p.isASTRotate=p.ASTRotate=void 0;var due=ro();p.ASTDeclaration="ASTDeclaration";function pue(t){return p.reflection.isInstance(t,p.ASTDeclaration)}p.isASTDeclaration=pue;p.ASTInstruction="ASTInstruction";function hue(t){return p.reflection.isInstance(t,p.ASTInstruction)}p.isASTInstruction=hue;p.ASTList="ASTList";function mue(t){return p.reflection.isInstance(t,p.ASTList)}p.isASTList=mue;p.ASTNumber="ASTNumber";function yue(t){return p.reflection.isInstance(t,p.ASTNumber)}p.isASTNumber=yue;p.ASTNumberOffset="ASTNumberOffset";function gue(t){return p.reflection.isInstance(t,p.ASTNumberOffset)}p.isASTNumberOffset=gue;p.ASTParameter="ASTParameter";function vue(t){return p.reflection.isInstance(t,p.ASTParameter)}p.isASTParameter=vue;p.ASTRange="ASTRange";function Tue(t){return p.reflection.isInstance(t,p.ASTRange)}p.isASTRange=Tue;p.ASTReplayTarget="ASTReplayTarget";function _ue(t){return p.reflection.isInstance(t,p.ASTReplayTarget)}p.isASTReplayTarget=_ue;p.ASTTarget="ASTTarget";function Rue(t){return p.reflection.isInstance(t,p.ASTTarget)}p.isASTTarget=Rue;p.ASTTimeScope="ASTTimeScope";function Aue(t){return p.reflection.isInstance(t,p.ASTTimeScope)}p.isASTTimeScope=Aue;p.ASTValue="ASTValue";function Sue(t){return p.reflection.isInstance(t,p.ASTValue)}p.isASTValue=Sue;p.ASTAllPlaneFrom="ASTAllPlaneFrom";function bue(t){return p.reflection.isInstance(t,p.ASTAllPlaneFrom)}p.isASTAllPlaneFrom=bue;p.ASTAllPlanes="ASTAllPlanes";function Cue(t){return p.reflection.isInstance(t,p.ASTAllPlanes)}p.isASTAllPlanes=Cue;p.ASTAlter="ASTAlter";function Pue(t){return p.reflection.isInstance(t,p.ASTAlter)}p.isASTAlter=Pue;p.ASTAlterSpeed="ASTAlterSpeed";function Eue(t){return p.reflection.isInstance(t,p.ASTAlterSpeed)}p.isASTAlterSpeed=Eue;p.ASTAssertion="ASTAssertion";function kue(t){return p.reflection.isInstance(t,p.ASTAssertion)}p.isASTAssertion=kue;p.ASTAssertions="ASTAssertions";function Nue(t){return p.reflection.isInstance(t,p.ASTAssertions)}p.isASTAssertions=Nue;p.ASTAt="ASTAt";function wue(t){return p.reflection.isInstance(t,p.ASTAt)}p.isASTAt=wue;p.ASTAtFor="ASTAtFor";function $ue(t){return p.reflection.isInstance(t,p.ASTAtFor)}p.isASTAtFor=$ue;p.ASTConstantValue="ASTConstantValue";function Oue(t){return p.reflection.isInstance(t,p.ASTConstantValue)}p.isASTConstantValue=Oue;p.ASTCreate="ASTCreate";function Iue(t){return p.reflection.isInstance(t,p.ASTCreate)}p.isASTCreate=Iue;p.ASTCreationParameter="ASTCreationParameter";function Due(t){return p.reflection.isInstance(t,p.ASTCreationParameter)}p.isASTCreationParameter=Due;p.ASTCreationParameters="ASTCreationParameters";function xue(t){return p.reflection.isInstance(t,p.ASTCreationParameters)}p.isASTCreationParameters=xue;p.ASTCreationParameterType="ASTCreationParameterType";function Lue(t){return p.reflection.isInstance(t,p.ASTCreationParameterType)}p.isASTCreationParameterType=Lue;p.ASTCut="ASTCut";function que(t){return p.reflection.isInstance(t,p.ASTCut)}p.isASTCut=que;p.ASTDelay="ASTDelay";function Mue(t){return p.reflection.isInstance(t,p.ASTDelay)}p.isASTDelay=Mue;p.ASTDelayParameter="ASTDelayParameter";function Fue(t){return p.reflection.isInstance(t,p.ASTDelayParameter)}p.isASTDelayParameter=Fue;p.ASTDoubleRange="ASTDoubleRange";function jue(t){return p.reflection.isInstance(t,p.ASTDoubleRange)}p.isASTDoubleRange=jue;p.ASTDoubleValue="ASTDoubleValue";function Gue(t){return p.reflection.isInstance(t,p.ASTDoubleValue)}p.isASTDoubleValue=Gue;p.ASTFilters="ASTFilters";function Uue(t){return p.reflection.isInstance(t,p.ASTFilters)}p.isASTFilters=Uue;p.ASTHide="ASTHide";function Hue(t){return p.reflection.isInstance(t,p.ASTHide)}p.isASTHide=Hue;p.ASTHideParameter="ASTHideParameter";function Kue(t){return p.reflection.isInstance(t,p.ASTHideParameter)}p.isASTHideParameter=Kue;p.ASTIntegerRange="ASTIntegerRange";function Wue(t){return p.reflection.isInstance(t,p.ASTIntegerRange)}p.isASTIntegerRange=Wue;p.ASTIntegerValue="ASTIntegerValue";function Bue(t){return p.reflection.isInstance(t,p.ASTIntegerValue)}p.isASTIntegerValue=Bue;p.ASTLeftShift="ASTLeftShift";function Vue(t){return p.reflection.isInstance(t,p.ASTLeftShift)}p.isASTLeftShift=Vue;p.ASTListDeclaration="ASTListDeclaration";function zue(t){return p.reflection.isInstance(t,p.ASTListDeclaration)}p.isASTListDeclaration=zue;p.ASTOffsetList="ASTOffsetList";function Yue(t){return p.reflection.isInstance(t,p.ASTOffsetList)}p.isASTOffsetList=Yue;p.ASTParamDrift="ASTParamDrift";function Xue(t){return p.reflection.isInstance(t,p.ASTParamDrift)}p.isASTParamDrift=Xue;p.ASTParamEdit="ASTParamEdit";function Jue(t){return p.reflection.isInstance(t,p.ASTParamEdit)}p.isASTParamEdit=Jue;p.ASTParameters="ASTParameters";function Que(t){return p.reflection.isInstance(t,p.ASTParameters)}p.isASTParameters=Que;p.ASTParameterType="ASTParameterType";function Zue(t){return p.reflection.isInstance(t,p.ASTParameterType)}p.isASTParameterType=Zue;p.ASTParamNoise="ASTParamNoise";function ele(t){return p.reflection.isInstance(t,p.ASTParamNoise)}p.isASTParamNoise=ele;p.ASTParamOffset="ASTParamOffset";function tle(t){return p.reflection.isInstance(t,p.ASTParamOffset)}p.isASTParamOffset=tle;p.ASTPlane="ASTPlane";function rle(t){return p.reflection.isInstance(t,p.ASTPlane)}p.isASTPlane=rle;p.ASTPlaneFrom="ASTPlaneFrom";function nle(t){return p.reflection.isInstance(t,p.ASTPlaneFrom)}p.isASTPlaneFrom=nle;p.ASTRangeDeclaration="ASTRangeDeclaration";function ile(t){return p.reflection.isInstance(t,p.ASTRangeDeclaration)}p.isASTRangeDeclaration=ile;p.ASTRecordingParameterType="ASTRecordingParameterType";function ale(t){return p.reflection.isInstance(t,p.ASTRecordingParameterType)}p.isASTRecordingParameterType=ale;p.ASTRecordingValue="ASTRecordingValue";function ole(t){return p.reflection.isInstance(t,p.ASTRecordingValue)}p.isASTRecordingValue=ole;p.ASTReplay="ASTReplay";function sle(t){return p.reflection.isInstance(t,p.ASTReplay)}p.isASTReplay=sle;p.ASTRightShift="ASTRightShift";function ule(t){return p.reflection.isInstance(t,p.ASTRightShift)}p.isASTRightShift=ule;p.ASTRotate="ASTRotate";function lle(t){return p.reflection.isInstance(t,p.ASTRotate)}p.isASTRotate=lle;p.ASTRotateParameter="ASTRotateParameter";function cle(t){return p.reflection.isInstance(t,p.ASTRotateParameter)}p.isASTRotateParameter=cle;p.ASTSaturate="ASTSaturate";function fle(t){return p.reflection.isInstance(t,p.ASTSaturate)}p.isASTSaturate=fle;p.ASTSaturationParameter="ASTSaturationParameter";function dle(t){return p.reflection.isInstance(t,p.ASTSaturationParameter)}p.isASTSaturationParameter=dle;p.ASTSaturationParameters="ASTSaturationParameters";function ple(t){return p.reflection.isInstance(t,p.ASTSaturationParameters)}p.isASTSaturationParameters=ple;p.ASTSaturationParameterType="ASTSaturationParameterType";function hle(t){return p.reflection.isInstance(t,p.ASTSaturationParameterType)}p.isASTSaturationParameterType=hle;p.ASTScenario="ASTScenario";function mle(t){return p.reflection.isInstance(t,p.ASTScenario)}p.isASTScenario=mle;p.ASTSpeedParameter="ASTSpeedParameter";function yle(t){return p.reflection.isInstance(t,p.ASTSpeedParameter)}p.isASTSpeedParameter=yle;p.ASTSpeedParameters="ASTSpeedParameters";function gle(t){return p.reflection.isInstance(t,p.ASTSpeedParameters)}p.isASTSpeedParameters=gle;p.ASTSpeedParameterType="ASTSpeedParameterType";function vle(t){return p.reflection.isInstance(t,p.ASTSpeedParameterType)}p.isASTSpeedParameterType=vle;p.ASTStringList="ASTStringList";function Tle(t){return p.reflection.isInstance(t,p.ASTStringList)}p.isASTStringList=Tle;p.ASTStringValue="ASTStringValue";function _le(t){return p.reflection.isInstance(t,p.ASTStringValue)}p.isASTStringValue=_le;p.ASTTime="ASTTime";function Rle(t){return p.reflection.isInstance(t,p.ASTTime)}p.isASTTime=Rle;p.ASTTrajectory="ASTTrajectory";function Ale(t){return p.reflection.isInstance(t,p.ASTTrajectory)}p.isASTTrajectory=Ale;p.ASTTrigger="ASTTrigger";function Sle(t){return p.reflection.isInstance(t,p.ASTTrigger)}p.isASTTrigger=Sle;p.ASTVariableValue="ASTVariableValue";function ble(t){return p.reflection.isInstance(t,p.ASTVariableValue)}p.isASTVariableValue=ble;p.ASTWayPoint="ASTWayPoint";function Cle(t){return p.reflection.isInstance(t,p.ASTWayPoint)}p.isASTWayPoint=Cle;p.ASTWayPoints="ASTWayPoints";function Ple(t){return p.reflection.isInstance(t,p.ASTWayPoints)}p.isASTWayPoints=Ple;p.ASTWindow="ASTWindow";function Ele(t){return p.reflection.isInstance(t,p.ASTWindow)}p.isASTWindow=Ele;var Op=class extends due.AbstractAstReflection{getAllTypes(){return["ASTAllPlaneFrom","ASTAllPlanes","ASTAlter","ASTAlterSpeed","ASTAssertion","ASTAssertions","ASTAt","ASTAtFor","ASTConstantValue","ASTCreate","ASTCreationParameter","ASTCreationParameterType","ASTCreationParameters","ASTCut","ASTDeclaration","ASTDelay","ASTDelayParameter","ASTDoubleRange","ASTDoubleValue","ASTFilters","ASTHide","ASTHideParameter","ASTInstruction","ASTIntegerRange","ASTIntegerValue","ASTLeftShift","ASTList","ASTListDeclaration","ASTNumber","ASTNumberOffset","ASTOffsetList","ASTParamDrift","ASTParamEdit","ASTParamNoise","ASTParamOffset","ASTParameter","ASTParameterType","ASTParameters","ASTPlane","ASTPlaneFrom","ASTRange","ASTRangeDeclaration","ASTRecordingParameterType","ASTRecordingValue","ASTReplay","ASTReplayTarget","ASTRightShift","ASTRotate","ASTRotateParameter","ASTSaturate","ASTSaturationParameter","ASTSaturationParameterType","ASTSaturationParameters","ASTScenario","ASTSpeedParameter","ASTSpeedParameterType","ASTSpeedParameters","ASTStringList","ASTStringValue","ASTTarget","ASTTime","ASTTimeScope","ASTTrajectory","ASTTrigger","ASTValue","ASTVariableValue","ASTWayPoint","ASTWayPoints","ASTWindow"]}computeIsSubtype(e,r){switch(e){case p.ASTAllPlaneFrom:case p.ASTPlaneFrom:return this.isSubtype(p.ASTReplayTarget,r);case p.ASTAllPlanes:case p.ASTPlane:return this.isSubtype(p.ASTTarget,r);case p.ASTAlter:case p.ASTAlterSpeed:case p.ASTCreate:case p.ASTCut:case p.ASTDelay:case p.ASTHide:case p.ASTReplay:case p.ASTRotate:case p.ASTSaturate:case p.ASTTrajectory:return this.isSubtype(p.ASTInstruction,r);case p.ASTAt:case p.ASTAtFor:case p.ASTWindow:return this.isSubtype(p.ASTTimeScope,r);case p.ASTConstantValue:case p.ASTStringValue:case p.ASTVariableValue:case p.ASTNumberOffset:return this.isSubtype(p.ASTValue,r);case p.ASTDoubleRange:case p.ASTIntegerRange:return this.isSubtype(p.ASTRange,r);case p.ASTDoubleValue:case p.ASTIntegerValue:case p.ASTRecordingValue:return this.isSubtype(p.ASTNumber,r);case p.ASTLeftShift:case p.ASTRightShift:case p.ASTNumber:return this.isSubtype(p.ASTNumberOffset,r);case p.ASTListDeclaration:case p.ASTRangeDeclaration:return this.isSubtype(p.ASTDeclaration,r);case p.ASTOffsetList:case p.ASTStringList:return this.isSubtype(p.ASTList,r);case p.ASTParamDrift:case p.ASTParamEdit:case p.ASTParamNoise:case p.ASTParamOffset:return this.isSubtype(p.ASTParameter,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"ASTAssertions":return{name:"ASTAssertions",mandatory:[{name:"items",type:"array"}]};case"ASTCreationParameters":return{name:"ASTCreationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTFilters":return{name:"ASTFilters",mandatory:[{name:"filters",type:"array"}]};case"ASTOffsetList":return{name:"ASTOffsetList",mandatory:[{name:"items",type:"array"}]};case"ASTParameters":return{name:"ASTParameters",mandatory:[{name:"items",type:"array"}]};case"ASTSaturationParameters":return{name:"ASTSaturationParameters",mandatory:[{name:"items",type:"array"}]};case"ASTScenario":return{name:"ASTScenario",mandatory:[{name:"declarations",type:"array"},{name:"instructions",type:"array"}]};case"ASTSpeedParameters":return{name:"ASTSpeedParameters",mandatory:[{name:"items",type:"array"}]};case"ASTStringList":return{name:"ASTStringList",mandatory:[{name:"items",type:"array"}]};case"ASTWayPoints":return{name:"ASTWayPoints",mandatory:[{name:"waypoints",type:"array"}]};default:return{name:e,mandatory:[]}}}};p.FditscenarioAstReflection=Op;p.reflection=new Op});var Qx=d(Dp=>{"use strict";Object.defineProperty(Dp,"__esModule",{value:!0});Dp.AttackScenarioGrammarGrammar=void 0;var kle=ro(),Ip,Nle=()=>Ip!=null?Ip:Ip=(0,kle.loadGrammarFromJson)(`{
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
}`);Dp.AttackScenarioGrammarGrammar=Nle});var Zx=d(Mi=>{"use strict";Object.defineProperty(Mi,"__esModule",{value:!0});Mi.AttackScenarioGrammarGeneratedModule=Mi.FditscenarioGeneratedSharedModule=Mi.AttackScenarioGrammarLanguageMetaData=void 0;var wle=R_(),$le=Qx();Mi.AttackScenarioGrammarLanguageMetaData={languageId:"fditscenario",fileExtensions:[".fditscenario"],caseInsensitive:!1};Mi.FditscenarioGeneratedSharedModule={AstReflection:()=>new wle.FditscenarioAstReflection};Mi.AttackScenarioGrammarGeneratedModule={Grammar:()=>(0,$le.AttackScenarioGrammarGrammar)(),LanguageMetaData:()=>Mi.AttackScenarioGrammarLanguageMetaData,parser:{}}});var eL=d(eu=>{"use strict";Object.defineProperty(eu,"__esModule",{value:!0});eu.FditscenarioValidator=eu.registerValidationChecks=void 0;function Ole(t){let e=t.validation.ValidationRegistry,r=t.validation.FditscenarioValidator,n={ASTScenario:r.checkMinInstr};e.register(n,r)}eu.registerValidationChecks=Ole;var A_=class{checkMinInstr(e,r){e.instructions.length==0&&r("error","Instr no exists.",{node:e})}};eu.FditscenarioValidator=A_});var fL=d(Mp=>{"use strict";Object.defineProperty(Mp,"__esModule",{value:!0});Mp.generateCommands=void 0;var Yt=R_();function Ile(t){return Dle(t)}Mp.generateCommands=Ile;function Dle(t){return xle(t)}function xle(t){return t.declarations.length!=0?[{declarations:Lle(t.declarations),instructions:tL(t.instructions)}]:[{instructions:tL(t.instructions)}]}function Lle(t){return t.flatMap(e=>qle(e)).filter(e=>e!==void 0)}var Qr;(function(t){t.deletion="deletion",t.creation="creation",t.alteration="alteration",t.saturation="saturation",t.duplication="duplication",t.convergence="convergence",t.custom="custom",t.replay="replay",t.timestamp="timestamp",t.reductionDF="reductionDF",t.speedAltaration="speedAltaration",t.trajectory="trajectory"})(Qr||(Qr={}));var Zr;(function(t){t.altitude="ALTITUDE",t.latitude="LATITUDE",t.icao="ICAO",t.track="TRACK",t.callsign="CALLSIGN",t.emergency="EMERGENCY",t.groundspeed="GROUNDSPEED",t.longitude="LONGITUDE",t.spi="SPI",t.squawk="SQUAWK"})(Zr||(Zr={}));var Lp;(function(t){t.east_west_velocity="EAST_WEST_VELOCITY",t.north_south_velocity="NORTH_SOUTH_VELOCITY"})(Lp||(Lp={}));var qp;(function(t){t.icao="ICAO",t.aircraft_number="NUMBER"})(qp||(qp={}));var Aa;(function(t){t.icao="ICAO",t.callsign="CALLSIGN",t.emergency="EMERGENCY",t.spi="SPI",t.squawk="SQUAWK",t.alert="ALERT"})(Aa||(Aa={}));function tL(t){return t.flatMap(e=>jle(e)).filter(e=>e!==void 0)}function qle(t){return(0,Yt.isASTListDeclaration)(t)?[{constant:t.constant,listDeclaration:Mle(t.list)}]:[{constant:t.constant,rangeDeclaration:Fle(t.range)}]}function Mle(t){return[{items:t.items}]}function Fle(t){return[{start:t.start,end:t.end}]}function jle(t){return(0,Yt.isASTHide)(t)?[{action:Qr.deletion,target:Ra(t.target),timescope:Pn(t.timeScope),trigger:no(t.trigger),frequency:ece(t.frequency),assertions:oi(t.assertions)}]:(0,Yt.isASTAlter)(t)?[{ActionType:Qr.alteration,target:Ra(t.target),timescope:Pn(t.timeScope),trigger:no(t.trigger),parameters:aL(t.parameters),assertions:oi(t.assertions)}]:(0,Yt.isASTCreate)(t)?[{ActionType:Qr.creation,timescope:Pn(t.timeScope),trajectory:rL(t.trajectory),parameters:tce(t.parameters),assertions:oi(t.assertions)}]:(0,Yt.isASTTrajectory)(t)?[{ActionType:Qr.trajectory,target:Ra(t.target),timescope:Pn(t.timeScope),trajectory:rL(t.trajectory),trigger:no(t.trigger),assertions:oi(t.assertions)}]:(0,Yt.isASTAlterSpeed)(t)?[{ActionType:Qr.speedAltaration,target:Ra(t.target),timescope:Pn(t.timeScope),parameters:Kle(t.parameters),trigger:no(t.trigger),assertions:oi(t.assertions)}]:(0,Yt.isASTSaturate)(t)?[{ActionType:Qr.saturation,target:Ra(t.target),timescope:Pn(t.timeScope),parameters:Vle(t.parameters),trigger:no(t.trigger),assertions:oi(t.assertions)}]:(0,Yt.isASTReplay)(t)?[{ActionType:Qr.replay,target:Xle(t.target),timescope:Pn(t.timeScope),parameters:aL(t.parameters),assertions:oi(t.assertions)}]:(0,Yt.isASTDelay)(t)?[{ActionType:Qr.timestamp,target:Ra(t.target),timescope:Pn(t.timeScope),delay:Qle(t.delay),assertions:oi(t.assertions)}]:(0,Yt.isASTRotate)(t)?[{ActionType:Qr.convergence,target:Ra(t.target),timescope:Pn(t.timeScope),angle:Zle(t.angle),trigger:no(t.trigger),assertions:oi(t.assertions)}]:[{ActionType:Qr.reductionDF,target:Ra(t.target),timescope:Pn(t.timeScope),trigger:no(t.trigger),assertions:oi(t.assertions)}]}function Pn(t){return(0,Yt.isASTAt)(t)?[{type:"timeAt",time:io(t.time)}]:(0,Yt.isASTWindow)(t)?[{type:"timeWindow",lowerBound:io(t.start),upperBound:io(t.end)}]:[{type:"timeAtFor",time:io(t.time),for:io(t.for)}]}function rL(t){return Gle(t.waypoints)}function Gle(t){let e=nL(t[0]);for(let r=1;r<t.length;r++)e.push(nL(t[r]));return e}function nL(t){return[{latitude:Fi(t.latitude),longitude:Fi(t.longitude),altitude:Fi(t.altitude),time:io(t.time)}]}function Ra(t){return(0,Yt.isASTAllPlanes)(t)?"all_planes":"plane"}function io(t){return Fi(t.realTime)}function Fi(t){return t.content}function no(t){return t!=null?[Fi(t.triggername)]:[]}function oi(t){return t!=null?Ule(t.items):[]}function Ule(t){let e=iL(t[0]);for(let r=1;r<t.length;r++)e.push(iL(t[r]));return e}function iL(t){return[{timescope:Pn(t.timeScope),file:t.file,filter:t.filter}]}function aL(t){return Hle(t.items)}function Hle(t){let e=oL(t[0]);for(let r=1;r<t.length;r++)e.push(oL(t[r]));return e}function oL(t){return(0,Yt.isASTParamEdit)(t)?[{parameter:{name:xp(t.name),value:t.value.content}}]:(0,Yt.isASTParamOffset)(t)?[{parameter:{name:xp(t.name),operation:t.offset_op,value:t.value.content}}]:(0,Yt.isASTParamNoise)(t)?[{parameter:{name:xp(t.name),value:t.value.content}}]:[{parameter:{name:xp(t.name),operation:t.drift_op,value:t.value.content}}]}function xp(t){return t.ALTITUDE!=null?Zr.altitude:t.CALLSIGN!=null?Zr.callsign:t.EMERGENCY!=null?Zr.emergency:t.GROUND_SPEED!=null?Zr.groundspeed:t.ICAO!=null?Zr.icao:t.LATITUDE!=null?Zr.latitude:t.LONGITUDE!=null?Zr.longitude:t.SPI!=null?Zr.spi:t.SQUAWK!=null?Zr.squawk:Zr.track}function Kle(t){return Wle(t.items)}function Wle(t){let e=sL(t[0]);for(let r=1;r<t.length;r++)e.push(sL(t[r]));return e}function sL(t){return[{parameter:{name:Ble(t.name),value:t.value.content}}]}function Ble(t){return t.EAST_WEST_VELOCITY!=null?Lp.east_west_velocity:Lp.north_south_velocity}function Vle(t){return zle(t.items)}function zle(t){let e=uL(t[0]);for(let r=1;r<t.length;r++)e.push(uL(t[r]));return e}function uL(t){return[{parameter:{name:Yle(t.name),value:t.value.content}}]}function Yle(t){return t.ICAO!=null?qp.icao:qp.aircraft_number}function Xle(t){return(0,Yt.isASTPlaneFrom)(t)?[{filters:lL(t.filters),recording:t.recording.content}]:t.filters!=null?[{filters:lL(t.filters),recording:t.recording.content}]:[{recording:t.recording.content}]}function lL(t){return Jle(t.filters)}function Jle(t){let e=[Fi(t[0])];for(let r=1;r<t.length;r++)e.push(Fi(t[r]));return e}function Qle(t){return[{value:io(t.value)}]}function Zle(t){return[{value:Fi(t.value)}]}function ece(t){if(t!=null)return Fi(t.value)}function tce(t){return t!=null?rce(t.items):[]}function rce(t){let e=cL(t[0]);for(let r=1;r<t.length;r++)e.push(cL(t[r]));return e}function cL(t){return[{parameter:{name:nce(t.name),value:t.value.content}}]}function nce(t){return t.ICAO!=null?Aa.icao:t.CALLSIGN!=null?Aa.callsign:t.SQUAWK!=null?Aa.squawk:t.EMERGENCY!=null?Aa.emergency:t.ALERT!=null?Aa.alert:Aa.spi}});var pL=d((_Te,dL)=>{"use strict";dL.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var S_=d((RTe,mL)=>{var Ml=pL(),hL={};for(let t of Object.keys(Ml))hL[Ml[t]]=t;var Y={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};mL.exports=Y;for(let t of Object.keys(Y)){if(!("channels"in Y[t]))throw new Error("missing channels property: "+t);if(!("labels"in Y[t]))throw new Error("missing channel labels property: "+t);if(Y[t].labels.length!==Y[t].channels)throw new Error("channel and label counts mismatch: "+t);let{channels:e,labels:r}=Y[t];delete Y[t].channels,delete Y[t].labels,Object.defineProperty(Y[t],"channels",{value:e}),Object.defineProperty(Y[t],"labels",{value:r})}Y.rgb.hsl=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(e,r,n),a=Math.max(e,r,n),o=a-i,s,u;a===i?s=0:e===a?s=(r-n)/o:r===a?s=2+(n-e)/o:n===a&&(s=4+(e-r)/o),s=Math.min(s*60,360),s<0&&(s+=360);let l=(i+a)/2;return a===i?u=0:l<=.5?u=o/(a+i):u=o/(2-a-i),[s,u*100,l*100]};Y.rgb.hsv=function(t){let e,r,n,i,a,o=t[0]/255,s=t[1]/255,u=t[2]/255,l=Math.max(o,s,u),c=l-Math.min(o,s,u),f=function(m){return(l-m)/6/c+1/2};return c===0?(i=0,a=0):(a=c/l,e=f(o),r=f(s),n=f(u),o===l?i=n-r:s===l?i=1/3+e-n:u===l&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[i*360,a*100,l*100]};Y.rgb.hwb=function(t){let e=t[0],r=t[1],n=t[2],i=Y.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(r,n));return n=1-1/255*Math.max(e,Math.max(r,n)),[i,a*100,n*100]};Y.rgb.cmyk=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.min(1-e,1-r,1-n),a=(1-e-i)/(1-i)||0,o=(1-r-i)/(1-i)||0,s=(1-n-i)/(1-i)||0;return[a*100,o*100,s*100,i*100]};function ice(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}Y.rgb.keyword=function(t){let e=hL[t];if(e)return e;let r=1/0,n;for(let i of Object.keys(Ml)){let a=Ml[i],o=ice(t,a);o<r&&(r=o,n=i)}return n};Y.keyword.rgb=function(t){return Ml[t]};Y.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92;let i=e*.4124+r*.3576+n*.1805,a=e*.2126+r*.7152+n*.0722,o=e*.0193+r*.1192+n*.9505;return[i*100,a*100,o*100]};Y.rgb.lab=function(t){let e=Y.rgb.xyz(t),r=e[0],n=e[1],i=e[2];r/=95.047,n/=100,i/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let a=116*n-16,o=500*(r-n),s=200*(n-i);return[a,o,s]};Y.hsl.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i,a,o;if(r===0)return o=n*255,[o,o,o];n<.5?i=n*(1+r):i=n+r-n*r;let s=2*n-i,u=[0,0,0];for(let l=0;l<3;l++)a=e+1/3*-(l-1),a<0&&a++,a>1&&a--,6*a<1?o=s+(i-s)*6*a:2*a<1?o=i:3*a<2?o=s+(i-s)*(2/3-a)*6:o=s,u[l]=o*255;return u};Y.hsl.hsv=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=r,a=Math.max(n,.01);n*=2,r*=n<=1?n:2-n,i*=a<=1?a:2-a;let o=(n+r)/2,s=n===0?2*i/(a+i):2*r/(n+r);return[e,s*100,o*100]};Y.hsv.rgb=function(t){let e=t[0]/60,r=t[1]/100,n=t[2]/100,i=Math.floor(e)%6,a=e-Math.floor(e),o=255*n*(1-r),s=255*n*(1-r*a),u=255*n*(1-r*(1-a));switch(n*=255,i){case 0:return[n,u,o];case 1:return[s,n,o];case 2:return[o,n,u];case 3:return[o,s,n];case 4:return[u,o,n];case 5:return[n,o,s]}};Y.hsv.hsl=function(t){let e=t[0],r=t[1]/100,n=t[2]/100,i=Math.max(n,.01),a,o;o=(2-r)*n;let s=(2-r)*i;return a=r*i,a/=s<=1?s:2-s,a=a||0,o/=2,[e,a*100,o*100]};Y.hwb.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100,i=r+n,a;i>1&&(r/=i,n/=i);let o=Math.floor(6*e),s=1-n;a=6*e-o,o&1&&(a=1-a);let u=r+a*(s-r),l,c,f;switch(o){default:case 6:case 0:l=s,c=u,f=r;break;case 1:l=u,c=s,f=r;break;case 2:l=r,c=s,f=u;break;case 3:l=r,c=u,f=s;break;case 4:l=u,c=r,f=s;break;case 5:l=s,c=r,f=u;break}return[l*255,c*255,f*255]};Y.cmyk.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i=t[3]/100,a=1-Math.min(1,e*(1-i)+i),o=1-Math.min(1,r*(1-i)+i),s=1-Math.min(1,n*(1-i)+i);return[a*255,o*255,s*255]};Y.xyz.rgb=function(t){let e=t[0]/100,r=t[1]/100,n=t[2]/100,i,a,o;return i=e*3.2406+r*-1.5372+n*-.4986,a=e*-.9689+r*1.8758+n*.0415,o=e*.0557+r*-.204+n*1.057,i=i>.0031308?1.055*i**(1/2.4)-.055:i*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),o=Math.min(Math.max(0,o),1),[i*255,a*255,o*255]};Y.xyz.lab=function(t){let e=t[0],r=t[1],n=t[2];e/=95.047,r/=100,n/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let i=116*r-16,a=500*(e-r),o=200*(r-n);return[i,a,o]};Y.lab.xyz=function(t){let e=t[0],r=t[1],n=t[2],i,a,o;a=(e+16)/116,i=r/500+a,o=a-n/200;let s=a**3,u=i**3,l=o**3;return a=s>.008856?s:(a-16/116)/7.787,i=u>.008856?u:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,i*=95.047,a*=100,o*=108.883,[i,a,o]};Y.lab.lch=function(t){let e=t[0],r=t[1],n=t[2],i;i=Math.atan2(n,r)*360/2/Math.PI,i<0&&(i+=360);let o=Math.sqrt(r*r+n*n);return[e,o,i]};Y.lch.lab=function(t){let e=t[0],r=t[1],i=t[2]/360*2*Math.PI,a=r*Math.cos(i),o=r*Math.sin(i);return[e,a,o]};Y.rgb.ansi16=function(t,e=null){let[r,n,i]=t,a=e===null?Y.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let o=30+(Math.round(i/255)<<2|Math.round(n/255)<<1|Math.round(r/255));return a===2&&(o+=60),o};Y.hsv.ansi16=function(t){return Y.rgb.ansi16(Y.hsv.rgb(t),t[2])};Y.rgb.ansi256=function(t){let e=t[0],r=t[1],n=t[2];return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)};Y.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];let r=(~~(t>50)+1)*.5,n=(e&1)*r*255,i=(e>>1&1)*r*255,a=(e>>2&1)*r*255;return[n,i,a]};Y.ansi256.rgb=function(t){if(t>=232){let a=(t-232)*10+8;return[a,a,a]}t-=16;let e,r=Math.floor(t/36)/5*255,n=Math.floor((e=t%36)/6)/5*255,i=e%6/5*255;return[r,n,i]};Y.rgb.hex=function(t){let r=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};Y.hex.rgb=function(t){let e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];e[0].length===3&&(r=r.split("").map(s=>s+s).join(""));let n=parseInt(r,16),i=n>>16&255,a=n>>8&255,o=n&255;return[i,a,o]};Y.rgb.hcg=function(t){let e=t[0]/255,r=t[1]/255,n=t[2]/255,i=Math.max(Math.max(e,r),n),a=Math.min(Math.min(e,r),n),o=i-a,s,u;return o<1?s=a/(1-o):s=0,o<=0?u=0:i===e?u=(r-n)/o%6:i===r?u=2+(n-e)/o:u=4+(e-r)/o,u/=6,u%=1,[u*360,o*100,s*100]};Y.hsl.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=r<.5?2*e*r:2*e*(1-r),i=0;return n<1&&(i=(r-.5*n)/(1-n)),[t[0],n*100,i*100]};Y.hsv.hcg=function(t){let e=t[1]/100,r=t[2]/100,n=e*r,i=0;return n<1&&(i=(r-n)/(1-n)),[t[0],n*100,i*100]};Y.hcg.rgb=function(t){let e=t[0]/360,r=t[1]/100,n=t[2]/100;if(r===0)return[n*255,n*255,n*255];let i=[0,0,0],a=e%1*6,o=a%1,s=1-o,u=0;switch(Math.floor(a)){case 0:i[0]=1,i[1]=o,i[2]=0;break;case 1:i[0]=s,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=o;break;case 3:i[0]=0,i[1]=s,i[2]=1;break;case 4:i[0]=o,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=s}return u=(1-r)*n,[(r*i[0]+u)*255,(r*i[1]+u)*255,(r*i[2]+u)*255]};Y.hcg.hsv=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e),i=0;return n>0&&(i=e/n),[t[0],i*100,n*100]};Y.hcg.hsl=function(t){let e=t[1]/100,n=t[2]/100*(1-e)+.5*e,i=0;return n>0&&n<.5?i=e/(2*n):n>=.5&&n<1&&(i=e/(2*(1-n))),[t[0],i*100,n*100]};Y.hcg.hwb=function(t){let e=t[1]/100,r=t[2]/100,n=e+r*(1-e);return[t[0],(n-e)*100,(1-n)*100]};Y.hwb.hcg=function(t){let e=t[1]/100,n=1-t[2]/100,i=n-e,a=0;return i<1&&(a=(n-i)/(1-i)),[t[0],i*100,a*100]};Y.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};Y.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};Y.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};Y.gray.hsl=function(t){return[0,0,t[0]]};Y.gray.hsv=Y.gray.hsl;Y.gray.hwb=function(t){return[0,100,t[0]]};Y.gray.cmyk=function(t){return[0,0,0,t[0]]};Y.gray.lab=function(t){return[t[0],0,0]};Y.gray.hex=function(t){let e=Math.round(t[0]/100*255)&255,n=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(n.length)+n};Y.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}});var gL=d((ATe,yL)=>{var Fp=S_();function ace(){let t={},e=Object.keys(Fp);for(let r=e.length,n=0;n<r;n++)t[e[n]]={distance:-1,parent:null};return t}function oce(t){let e=ace(),r=[t];for(e[t].distance=0;r.length;){let n=r.pop(),i=Object.keys(Fp[n]);for(let a=i.length,o=0;o<a;o++){let s=i[o],u=e[s];u.distance===-1&&(u.distance=e[n].distance+1,u.parent=n,r.unshift(s))}}return e}function sce(t,e){return function(r){return e(t(r))}}function uce(t,e){let r=[e[t].parent,t],n=Fp[e[t].parent][t],i=e[t].parent;for(;e[i].parent;)r.unshift(e[i].parent),n=sce(Fp[e[i].parent][i],n),i=e[i].parent;return n.conversion=r,n}yL.exports=function(t){let e=oce(t),r={},n=Object.keys(e);for(let i=n.length,a=0;a<i;a++){let o=n[a];e[o].parent!==null&&(r[o]=uce(o,e))}return r}});var TL=d((STe,vL)=>{var b_=S_(),lce=gL(),tu={},cce=Object.keys(b_);function fce(t){let e=function(...r){let n=r[0];return n==null?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(e.conversion=t.conversion),e}function dce(t){let e=function(...r){let n=r[0];if(n==null)return n;n.length>1&&(r=n);let i=t(r);if(typeof i=="object")for(let a=i.length,o=0;o<a;o++)i[o]=Math.round(i[o]);return i};return"conversion"in t&&(e.conversion=t.conversion),e}cce.forEach(t=>{tu[t]={},Object.defineProperty(tu[t],"channels",{value:b_[t].channels}),Object.defineProperty(tu[t],"labels",{value:b_[t].labels});let e=lce(t);Object.keys(e).forEach(n=>{let i=e[n];tu[t][n]=dce(i),tu[t][n].raw=fce(i)})});vL.exports=tu});var CL=d((bTe,bL)=>{"use strict";var _L=(t,e)=>(...r)=>`\x1B[${t(...r)+e}m`,RL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};5;${n}m`},AL=(t,e)=>(...r)=>{let n=t(...r);return`\x1B[${38+e};2;${n[0]};${n[1]};${n[2]}m`},jp=t=>t,SL=(t,e,r)=>[t,e,r],ru=(t,e,r)=>{Object.defineProperty(t,e,{get:()=>{let n=r();return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0}),n},enumerable:!0,configurable:!0})},C_,nu=(t,e,r,n)=>{C_===void 0&&(C_=TL());let i=n?10:0,a={};for(let[o,s]of Object.entries(C_)){let u=o==="ansi16"?"ansi":o;o===e?a[u]=t(r,i):typeof s=="object"&&(a[u]=t(s[e],i))}return a};function pce(){let t=new Map,e={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};e.color.gray=e.color.blackBright,e.bgColor.bgGray=e.bgColor.bgBlackBright,e.color.grey=e.color.blackBright,e.bgColor.bgGrey=e.bgColor.bgBlackBright;for(let[r,n]of Object.entries(e)){for(let[i,a]of Object.entries(n))e[i]={open:`\x1B[${a[0]}m`,close:`\x1B[${a[1]}m`},n[i]=e[i],t.set(a[0],a[1]);Object.defineProperty(e,r,{value:n,enumerable:!1})}return Object.defineProperty(e,"codes",{value:t,enumerable:!1}),e.color.close="\x1B[39m",e.bgColor.close="\x1B[49m",ru(e.color,"ansi",()=>nu(_L,"ansi16",jp,!1)),ru(e.color,"ansi256",()=>nu(RL,"ansi256",jp,!1)),ru(e.color,"ansi16m",()=>nu(AL,"rgb",SL,!1)),ru(e.bgColor,"ansi",()=>nu(_L,"ansi16",jp,!0)),ru(e.bgColor,"ansi256",()=>nu(RL,"ansi256",jp,!0)),ru(e.bgColor,"ansi16m",()=>nu(AL,"rgb",SL,!0)),e}Object.defineProperty(bL,"exports",{enumerable:!0,get:pce})});var EL=d((CTe,PL)=>{"use strict";PL.exports={stdout:!1,stderr:!1}});var NL=d((PTe,kL)=>{"use strict";var hce=(t,e,r)=>{let n=t.indexOf(e);if(n===-1)return t;let i=e.length,a=0,o="";do o+=t.substr(a,n-a)+e+r,a=n+i,n=t.indexOf(e,a);while(n!==-1);return o+=t.substr(a),o},mce=(t,e,r,n)=>{let i=0,a="";do{let o=t[n-1]==="\r";a+=t.substr(i,(o?n-1:n)-i)+e+(o?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return a+=t.substr(i),a};kL.exports={stringReplaceAll:hce,stringEncaseCRLFWithFirstIndex:mce}});var DL=d((ETe,IL)=>{"use strict";var yce=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,wL=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,gce=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,vce=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,Tce=new Map([["n",`
`],["r","\r"],["t","	"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e","\x1B"],["a","\x07"]]);function OL(t){let e=t[0]==="u",r=t[1]==="{";return e&&!r&&t.length===5||t[0]==="x"&&t.length===3?String.fromCharCode(parseInt(t.slice(1),16)):e&&r?String.fromCodePoint(parseInt(t.slice(2,-1),16)):Tce.get(t)||t}function _ce(t,e){let r=[],n=e.trim().split(/\s*,\s*/g),i;for(let a of n){let o=Number(a);if(!Number.isNaN(o))r.push(o);else if(i=a.match(gce))r.push(i[2].replace(vce,(s,u,l)=>u?OL(u):l));else throw new Error(`Invalid Chalk template style argument: ${a} (in style '${t}')`)}return r}function Rce(t){wL.lastIndex=0;let e=[],r;for(;(r=wL.exec(t))!==null;){let n=r[1];if(r[2]){let i=_ce(n,r[2]);e.push([n].concat(i))}else e.push([n])}return e}function $L(t,e){let r={};for(let i of e)for(let a of i.styles)r[a[0]]=i.inverse?null:a.slice(1);let n=t;for(let[i,a]of Object.entries(r))if(Array.isArray(a)){if(!(i in n))throw new Error(`Unknown Chalk style: ${i}`);n=a.length>0?n[i](...a):n[i]}return n}IL.exports=(t,e)=>{let r=[],n=[],i=[];if(e.replace(yce,(a,o,s,u,l,c)=>{if(o)i.push(OL(o));else if(u){let f=i.join("");i=[],n.push(r.length===0?f:$L(t,r)(f)),r.push({inverse:s,styles:Rce(u)})}else if(l){if(r.length===0)throw new Error("Found extraneous } in Chalk template literal");n.push($L(t,r)(i.join(""))),i=[],r.pop()}else i.push(c)}),n.push(i.join("")),r.length>0){let a=`Chalk template literal is missing ${r.length} closing bracket${r.length===1?"":"s"} (\`}\`)`;throw new Error(a)}return n.join("")}});var GL=d((kTe,jL)=>{"use strict";var Fl=CL(),{stdout:E_,stderr:k_}=EL(),{stringReplaceAll:Ace,stringEncaseCRLFWithFirstIndex:Sce}=NL(),{isArray:Gp}=Array,LL=["ansi","ansi","ansi256","ansi16m"],iu=Object.create(null),bce=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=E_?E_.level:0;t.level=e.level===void 0?r:e.level},N_=class{constructor(e){return qL(e)}},qL=t=>{let e={};return bce(e,t),e.template=(...r)=>FL(e.template,...r),Object.setPrototypeOf(e,Up.prototype),Object.setPrototypeOf(e.template,e),e.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")},e.template.Instance=N_,e.template};function Up(t){return qL(t)}for(let[t,e]of Object.entries(Fl))iu[t]={get(){let r=Hp(this,w_(e.open,e.close,this._styler),this._isEmpty);return Object.defineProperty(this,t,{value:r}),r}};iu.visible={get(){let t=Hp(this,this._styler,!0);return Object.defineProperty(this,"visible",{value:t}),t}};var ML=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(let t of ML)iu[t]={get(){let{level:e}=this;return function(...r){let n=w_(Fl.color[LL[e]][t](...r),Fl.color.close,this._styler);return Hp(this,n,this._isEmpty)}}};for(let t of ML){let e="bg"+t[0].toUpperCase()+t.slice(1);iu[e]={get(){let{level:r}=this;return function(...n){let i=w_(Fl.bgColor[LL[r]][t](...n),Fl.bgColor.close,this._styler);return Hp(this,i,this._isEmpty)}}}}var Cce=Object.defineProperties(()=>{},{...iu,level:{enumerable:!0,get(){return this._generator.level},set(t){this._generator.level=t}}}),w_=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Hp=(t,e,r)=>{let n=(...i)=>Gp(i[0])&&Gp(i[0].raw)?xL(n,FL(n,...i)):xL(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,Cce),n._generator=t,n._styler=e,n._isEmpty=r,n},xL=(t,e)=>{if(t.level<=0||!e)return t._isEmpty?"":e;let r=t._styler;if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.indexOf("\x1B")!==-1)for(;r!==void 0;)e=Ace(e,r.close,r.open),r=r.parent;let a=e.indexOf(`
`);return a!==-1&&(e=Sce(e,i,n,a)),n+e+i},P_,FL=(t,...e)=>{let[r]=e;if(!Gp(r)||!Gp(r.raw))return e.join(" ");let n=e.slice(1),i=[r.raw[0]];for(let a=1;a<r.length;a++)i.push(String(n[a-1]).replace(/[{}\\]/g,"\\$&"),String(r.raw[a]));return P_===void 0&&(P_=DL()),P_(t,i.join(""))};Object.defineProperties(Up.prototype,iu);var Kp=Up();Kp.supportsColor=E_;Kp.stderr=Up({level:k_?k_.level:0});Kp.stderr.supportsColor=k_;jL.exports=Kp});var BL=d(si=>{"use strict";var HL=si&&si.__awaiter||function(t,e,r,n){function i(a){return a instanceof r?a:new r(function(o){o(a)})}return new(r||(r=Promise))(function(a,o){function s(c){try{l(n.next(c))}catch(f){o(f)}}function u(c){try{l(n.throw(c))}catch(f){o(f)}}function l(c){c.done?a(c.value):i(c.value).then(s,u)}l((n=n.apply(t,e||[])).next())})},Pce=si&&si.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(si,"__esModule",{value:!0});si.parseAndGenerate=si.extractAstNodeFromString=void 0;var KL=qn(),Ece=ro(),kce=$_(),Nce=fL(),UL=Pce(GL());function WL(t,e){var r;return HL(this,void 0,void 0,function*(){let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,KL.URI.parse("memory://fditscenario.document"));return yield e.shared.workspace.DocumentBuilder.build([n],{validationChecks:"all"}),(r=n.parseResult)===null||r===void 0?void 0:r.value})}si.extractAstNodeFromString=WL;function wce(t){return HL(this,void 0,void 0,function*(){let e=(0,kce.createFditscenarioServices)(Ece.EmptyFileSystem).Fditscenario,r=yield WL(t,e);console.log("fditscenarioProgram : "+t);let i=e.shared.workspace.LangiumDocumentFactory.fromString(t,KL.URI.parse("memory://fditscenario.document")).parseResult;i.lexerErrors.length===0&&i.parserErrors.length===0?console.log(UL.default.green("Parsed and validated successfully!")):console.log(UL.default.red("Failed to parse and validate !"));let a=(0,Nce.generateCommands)(r);return Promise.resolve(a)})}si.parseAndGenerate=wce});var $_=d(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.createFditscenarioServices=ao.FditscenarioModule=void 0;var Wp=ro(),VL=Zx(),zL=eL(),$ce=ro(),Oce=BL();ao.FditscenarioModule={validation:{FditscenarioValidator:()=>new zL.FditscenarioValidator}};function Ice(t){let e=(0,Wp.inject)((0,Wp.createDefaultSharedModule)(t),VL.FditscenarioGeneratedSharedModule),r=(0,Wp.inject)((0,Wp.createDefaultModule)({shared:e}),VL.AttackScenarioGrammarGeneratedModule,ao.FditscenarioModule);return e.lsp.ExecuteCommandHandler=new O_,e.ServiceRegistry.register(r),(0,zL.registerValidationChecks)(r),{shared:e,Fditscenario:r}}ao.createFditscenarioServices=Ice;var O_=class extends $ce.AbstractExecuteCommandHandler{registerCommands(e){e("parseAndGenerate",r=>(0,Oce.parseAndGenerate)(r[0]))}}});var Fce=d(XL=>{Object.defineProperty(XL,"__esModule",{value:!0});var YL=ro(),I_=Jx(),Dce=$_(),xce=new I_.BrowserMessageReader(self),Lce=new I_.BrowserMessageWriter(self),qce=(0,I_.createConnection)(xce,Lce),{shared:Mce}=(0,Dce.createFditscenarioServices)(Object.assign({connection:qce},YL.EmptyFileSystem));(0,YL.startLanguageServer)(Mce)});Fce();})();
